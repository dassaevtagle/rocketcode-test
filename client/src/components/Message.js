import PropTypes from 'prop-types'
import thumbnail from 'assets/images/rocketcode_thumbnail.png'
import { Sender } from 'models/message'
import './Message.scss'

function Message({ sender, children }) {
  return sender === Sender.ROCKETCODE ? (
    <div className="flex">
      <div className='image-container'>
        <img src={thumbnail} alt="Rocket Code" className="image"></img>
      </div>
      <div className="message-container__rocketcode">{children}</div>
    </div>
  ) : (
    <div className="flex justify-end">
      <div className="message-container__guest">{children}</div>
    </div>
  )
}

Message.propTypes = {
  sender: PropTypes.oneOf(Object.values(Sender)),
  children: PropTypes.node.isRequired
}

export default Message
