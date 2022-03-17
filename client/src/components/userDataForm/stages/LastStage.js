import { Fragment, useState, useContext } from 'react'

import Message from 'components/Message'
import { Sender } from 'models/message'
import { ChatContext } from 'pages/Chat'

const LastStage = () => {
  const [showUserMessage, setShowUserMessage] = useState(false)
  const [userMessage, updateUserMessage] = useState('')
  const { userData } = useContext(ChatContext)

  const sendData = () => {
    setShowUserMessage(true)
    const fullName = `${userData.name} ${userData.second_name} ${userData.first_lastname} ${userData.second_lastname}`
    updateUserMessage(
      <>
        Fecha de Nacimiento: {userData.birth_date} <br /> Correo electrónico: {userData.mail} <br />{' '}
        Teléfono celular: {userData.phone} <br /> Nombre: {fullName}{' '}
      </>
    )
    console.log(userData)
  }

  return (
    <Fragment>
      <Message sender={Sender.ROCKETCODE}>
        Si tus datos son correctos por favor continuemos.
      </Message>
      <button className="flex w-3/4 rounded-lg mx-auto p-2" onClick={sendData}>
        Iniciar
      </button>
      {showUserMessage && <Message sender={Sender.GUEST}>{userMessage}</Message>}
    </Fragment>
  )
}

export default LastStage
