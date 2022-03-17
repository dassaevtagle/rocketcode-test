import { Formik, useField, useFormikContext } from 'formik'
import DatePicker from 'react-datepicker'
import PropTypes from 'prop-types'
import { Fragment, useContext, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import 'moment/locale/es'

import Message from 'components/Message'
import { ChatContext } from 'pages/Chat'
import { TIME_BEFORE_NEXT_MESSAGE, Sender } from 'models/message'
import './Stages.scss'

const DatePickerField = ({ ...props }) => {
  const { setFieldValue } = useFormikContext()
  const [field] = useField(props)
  return (
    <DatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setFieldValue(field.name, val)
      }}
      className="input-field"
      maxDate={moment().toDate()}
      placeholderText="Selecciona"
      autoComplete="off"
    />
  )
}

const BirthDateStage = () => {
  const [showUserMessage, setShowUserMessage] = useState(false)
  const [userMessage, updateUserMessage] = useState('')
  const { goToNextStage, userData, updateUserData } = useContext(ChatContext)

  const renderValidatedData = (birthData) => {
    setShowUserMessage(true)
    updateUserMessage(birthData)
  }

  return (
    <Fragment>
      <Message sender={Sender.ROCKETCODE}>
        <Formik
          initialValues={{ birth_date: '' }}
          onSubmit={(data, { setSubmitting }) => {
            renderValidatedData(moment(data.birth_date).locale('es').format('LL'))
            data.birth_date = moment(data.birth_date).format('YYYY-MM-DD')

            setTimeout(() => {
              setSubmitting(false)
              updateUserData({ ...userData, ...data })
              goToNextStage()
            }, TIME_BEFORE_NEXT_MESSAGE)
          }}
        >
          {(props) => {
            const { dirty, isSubmitting, handleSubmit, handleReset } = props
            return (
              <form onSubmit={handleSubmit}>
                <h2 className="text-lg">¿Cuál es tu fecha de nacimiento?</h2>
                <div className="input-container">
                  <DatePickerField name="birth_date" />
                </div>
                <button type="button" onClick={handleReset} disabled={!dirty || isSubmitting}>
                  Borrar
                </button>
                <button type="submit" disabled={isSubmitting}>
                  Continuar
                </button>
              </form>
            )
          }}
        </Formik>
      </Message>
      {showUserMessage && <Message sender={Sender.GUEST}>{userMessage}</Message>}
    </Fragment>
  )
}

BirthDateStage.propTypes = {
  dirty: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  handleSubmit: PropTypes.func,
  handleReset: PropTypes.func
}

export default BirthDateStage
