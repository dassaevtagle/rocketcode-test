import PropTypes from 'prop-types';
import thumbnail from 'assets/images/rocketcode_thumbnail.png';
import { Sender } from 'models/message';

const GUEST_CLASS = 'bg-green-300 float-right';
const ROCKET_CODE_CLASS = 'bg-gray-300';

function Message({ sender, children }) {
  return sender === Sender.ROCKETCODE ? (
    <div className="flex">
      <img src={thumbnail} alt="Rocket Code" className="h-10 rounded-full"></img>
      <div className={`${ROCKET_CODE_CLASS} w-3/4 mx-4 my-2 p-2 rounded-lg`}>{children}</div>
    </div>
  ) : (
    <div className={`${GUEST_CLASS} w-3/4 mx-4 my-2 p-2 rounded-lg`}>{children}</div>
  );
}

Message.propTypes = {
  sender: PropTypes.oneOf(Object.values(Sender))
};

export default Message;
