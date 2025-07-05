import type React from "react"
import type { ChatMessage } from "./chat.widget"

interface MessageProps {
  message: ChatMessage
  botName: string
}

export const Message: React.FC<MessageProps> = ({ message, botName }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className={`message ${message.sender}`}>
      {message.sender === "bot" && <div className="bot-avatar">{botName.charAt(0)}</div>}
      <div className="message-content">
        <div className="message-bubble">
          <p>{message.content}</p>
        </div>
        <div className="message-time">{formatTime(message.timestamp)}</div>
      </div>
      {message.sender === "user" && <div className="user-avatar">You</div>}
    </div>
  )
}
