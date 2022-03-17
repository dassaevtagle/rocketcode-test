import { useState, createContext } from 'react'

import { Stages } from 'models/userData'
import './Chat.scss'
import ChatHeader from 'components/ChatHeader'

export const ChatContext = createContext()

function Chat() {
  const [currentStage, setCurrentStage] = useState(1)
  const [messages, updateMessages] = useState([])
  const [userData, updateUserData] = useState({})

  const goToNextStage = () => {
    const numberOfStages = Object.keys(Stages).length
    if (currentStage >= numberOfStages) {
      return
    }
    setCurrentStage(1 + currentStage)
    renderNextStage()
  }

  const renderNextStage = () => {
    const NextStageComponent = Stages[currentStage + 1]
    updateMessages([...messages, <NextStageComponent key={currentStage + 1} />])
  }

  const FirstStageComponent = Stages[1]

  return (
    <div className="chat">
      <ChatHeader />
      <div className="chat-messages">
        <ChatContext.Provider value={{ userData, goToNextStage, updateUserData }}>
          <FirstStageComponent key={1} />
          {messages.map((msg) => msg)}
        </ChatContext.Provider>
      </div>
    </div>
  )
}

export default Chat
