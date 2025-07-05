import type React from "react"

interface TypingIndicatorProps {
  botName: string
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ botName }) => {
  return (
    <div className="message bot typing">
      <div className="bot-avatar">{botName.charAt(0)}</div>
      <div className="message-content">
        <div className="message-bubble typing-bubble">
          <div className="typing-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  )
}
