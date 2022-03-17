import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Fragment, useContext, useState } from 'react'

import Message from 'components/Message'
import { TIME_BEFORE_NEXT_MESSAGE, Sender } from 'models/message'
import { ChatContext } from 'pages/Chat'
import './Stages.scss'

const REQUIRED_ERROR_MESSAGE = 'Este campo es obligatorio'

const NameSchema = Yup.object().shape({
  name: Yup.string().required(REQUIRED_ERROR_MESSAGE),

  first_lastname: Yup.string().required(REQUIRED_ERROR_MESSAGE),

  second_lastname: Yup.string().required(REQUIRED_ERROR_MESSAGE)
})

let initialValues = {
  name: '',
  second_name: '',
  first_lastname: '',
  second_lastname: ''
}

const NameStage = () => {
  const [showUserMessage, setShowUserMessage] = useState(false)
  const [userMessage, updateUserMessage] = useState('')
  const { goToNextStage, userData, updateUserData } = useContext(ChatContext)

  const renderValidatedData = (nameData) => {
    setShowUserMessage(true)
    updateUserMessage(Object.values(nameData).join(' '))
  }

  return (
    <Fragment>
      <Message sender={Sender.ROCKETCODE}>
        <Formik
          initialValues={initialValues}
          validationSchema={NameSchema}
          onSubmit={(nameData) => {
            renderValidatedData(nameData)
            setTimeout(() => {
              updateUserData({ ...userData, ...nameData })
              goToNextStage()
            }, TIME_BEFORE_NEXT_MESSAGE)
          }}
        >
          {(formik) => {
            const { errors, touched, isValid, dirty } = formik
            return (
              <Fragment>
                <h2 className="text-lg">¿Cuál es tu nombre?</h2>
                <div className="mb-6">
                  <Form>
                    <div className="input-container">
                      <Field
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        id="name"
                        className={`
                          ${errors.name && touched.name ? 'input-error' : null}
                            input-field`}
                      />
                      <ErrorMessage name="name" component="span" className="input-error__message" />
                    </div>

                    <div className="input-container">
                      <Field
                        type="text"
                        name="second_name"
                        placeholder="Segundo nombre"
                        id="second_name"
                        className="input-field"
                      />
                    </div>

                    <div className="input-container">
                      <Field
                        type="text"
                        name="first_lastname"
                        placeholder="Apellido paterno"
                        id="first_lastname"
                        className={`
                          ${errors.first_lastname && touched.first_lastname ? 'input-error' : null}
                            input-field`}
                      />
                      <ErrorMessage
                        name="first_lastname"
                        component="span"
                        className="input-error__message"
                      />
                    </div>

                    <div className="input-container">
                      <Field
                        type="text"
                        name="second_lastname"
                        placeholder="Apellido materno"
                        id="second_lastname"
                        className={`
                          ${
                            errors.second_lastname && touched.second_lastname ? 'input-error' : null
                          }
                            input-field`}
                      />
                      <ErrorMessage
                        name="second_lastname"
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

export default NameStage
