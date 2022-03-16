import Message from 'components/Message';
import { Sender } from 'models/message';

function App() {
  return (
    <div className="App">
      <div className="w-full m-auto md:w-4/6 flex-col">
        <div className="mt-20 mb-16">
          <Message sender={`${Sender.ROCKETCODE}`}>Hola mundo</Message>
          <Message sender={`${Sender.GUEST}`}>Hola mundo</Message>
        </div>
      </div>
    </div>
  );
}

export default App;
