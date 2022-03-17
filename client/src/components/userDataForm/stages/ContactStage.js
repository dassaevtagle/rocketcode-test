import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Fragment, useContext, useState } from 'react'

import Message from 'components/Message'
import { TIME_BEFORE_NEXT_MESSAGE, Sender } from 'models/message'
import { ChatContext } from 'pages/Chat'
import './Stages.scss'

const REQUIRED_ERROR_MESSAGE = 'Este campo es obligatorio'
const INVALID_FORMAT_ERROR_MESSAGE = 'Formato inválido'

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const NameSchema = Yup.object().shape({
  mail: Yup.string().email(INVALID_FORMAT_ERROR_MESSAGE).required(REQUIRED_ERROR_MESSAGE),

  phone: Yup.string()
    .matches(phoneRegExp, INVALID_FORMAT_ERROR_MESSAGE)
    .required(REQUIRED_ERROR_MESSAGE)
})

let initialValues = {
  mail: '',
  phone: ''
}

const ContactStage = () => {
  const [showUserMessage, setShowUserMessage] = useState(false)
  const [userMessage, updateUserMessage] = useState('')
  const { goToNextStage, userData, updateUserData } = useContext(ChatContext)

  const renderValidatedData = (contactData) => {
    setShowUserMessage(true)
    updateUserMessage(
      <>
        Correo electrónico: {contactData.mail} <br /> Teléfono celular: {contactData.phone}
      </>
    )
  }

  return (
    <Fragment>
      <Message sender={Sender.ROCKETCODE}>
        <Formik
          initialValues={initialValues}
          validationSchema={NameSchema}
          onSubmit={(contactData) => {
            renderValidatedData(contactData)
            setTimeout(() => {
              updateUserData({ ...userData, ...contactData })
              goToNextStage()
            }, TIME_BEFORE_NEXT_MESSAGE)
          }}
        >
          {(formik) => {
            const { errors, touched, isValid, dirty } = formik
            return (
              <Fragment>
                <h2 className="text-lg">Datos de contacto</h2>
                <div className="mb-6">
                  <Form>
                    <div className="input-container">
                      <Field
                        type="text"
                        name="mail"
                        placeholder="Correo electrónico"
                        id="mail"
                        className={`
                          ${errors.mail && touched.mail ? 'input-error' : null}
                            input-field `}
                      />
                      <ErrorMessage name="mail" component="span" className="input-error__message" />
                    </div>

                    <div className="input-container">
                      <Field
                        type="text"
                        name="phone"
                        placeholder="Teléfono celular"
                        id="phone"
                        className={`
                          ${errors.phone && touched.phone ? 'input-error' : null}
                            input-field `}
                      />
                      <ErrorMessage
                        name="phone"
                        component="span"
                        className="input-error__message"
                      />
                    </div>

                    <button
                      type="submit"
                      className={!(dirty && isValid) ? 'disabled-btn' : ''}
                      disabled={!(dirty && isValid)}
                    >
                      Continuar
                    </button>
                  </Form>
                </div>
              </Fragment>
            )
          }}
        </Formik>
      </Message>
      {showUserMessage && <Message sender={Sender.GUEST}>{userMessage}</Message>}
    </Fragment>
  )
}

export default ContactStage
