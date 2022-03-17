import './ChatHeader.scss'
import QuestionMarkSheet from 'assets/svg/notebook-question-mark.svg'
import Clock from 'assets/svg/clock.svg'
import { Fragment } from 'react'

const ChatHeader = () => {
  return (
    <Fragment>
    <div
      className="header"
    >
      <div className="header-subject">Datos del usuario</div>
      <img src={QuestionMarkSheet} alt="Datos del usuario" className='header-question-icon'></ img>
      <div className="header-clock__container">
        <img src={Clock} className="header-clock__logo"></img>
        <p className="header-clock__description">En menos de 5 minutos</p>
      </div>
    </div>
    </Fragment>
  )
}

export default ChatHeader
