import { Fragment, useState, useContext } from 'react'

import { UsersService } from 'services/UsersService'
import Message from 'components/Message'
import { Sender } from 'models/message'
import { ChatContext } from 'pages/Chat'
import Spinner from 'components/Spinner'

const LastStage = () => {
  const [showUserMessage, setShowUserMessage] = useState(false)
  const [userMessage, updateUserMessage] = useState('')
  const [dataSent, setDataSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const { userData } = useContext(ChatContext)

  const sendData = async () => {
    try {
      setLoading(true)
      await UsersService.addNewUser(userData)
      setDataSent(true)
      setShowUserMessage(true)
      const fullName = `${userData.name} ${userData.second_name} ${userData.first_lastname} ${userData.second_lastname}`
      updateUserMessage(
        <>
          Fecha de Nacimiento: {userData.birth_date}
          <br />
          Correo electrónico: {userData.mail}
          <br />
          Teléfono celular: {userData.phone}
          <br />
          Nombre: {fullName}
        </>
      )
    } catch (err) {
      console.error(err)
      setShowUserMessage(true)
      updateUserMessage("Ha ocurrido un error. Intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Fragment>
      <Message sender={Sender.ROCKETCODE}>
        Si tus datos son correctos por favor continuemos.
      </Message>
      <button disabled={(dataSent)} className={(dataSent) ? 'finish-button__disabled' : 'finish-button'} onClick={sendData}>
        Iniciar
        { 
          loading &&
          <Spinner />
        }
      </button>
      {showUserMessage && <Message sender={Sender.GUEST}>{userMessage}</Message>}
    </Fragment>
  )
}

export default LastStage
