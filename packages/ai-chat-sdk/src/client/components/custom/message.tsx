import type React from "react";
import type { ChatMessage } from "./chat.widget";

interface MessageProps {
  message: ChatMessage;
  botName: string;
}

export const Message: React.FC<MessageProps> = ({ message, botName }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className={`message ${message.sender}`}>
      {message.sender === "bot" && (
        <div className="bot-avatar">
          <img
            src="https://raw.githubusercontent.com/plura-ai/prexo/refs/heads/main/apps/www/public/logo.png"
            className="w-10 h-10 rounded-lg object-cover invert"
            alt="Chat bot avatar"
            onError={(e) => {
              console.error("Failed to load image:", e);
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      )}
      <div className="message-content">
        <div className="message-bubble">
          <p>{message.content}</p>
        </div>
        <div className="message-time">{formatTime(message.timestamp)}</div>
      </div>
      {/* {message.sender === "user" && <div className="user-avatar">You</div>} */}
    </div>
  );
};
