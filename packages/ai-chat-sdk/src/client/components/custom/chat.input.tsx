"use client";
import type React from "react";
import { useRef, type KeyboardEvent } from "react";
import type { UseChatHelpers } from "@ai-sdk/react";

interface ChatInputProps {
  input: UseChatHelpers["input"];
  status: UseChatHelpers["status"];
  handleSubmit: UseChatHelpers["handleSubmit"];
  handleInputChange: UseChatHelpers["handleInputChange"];
  placeholder: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  input,
  status,
  handleSubmit,
  handleInputChange,
  placeholder,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <div className="input-container">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={status === 'streaming'}
          className="message-input"
        />
        <button
          type="submit"
          disabled={status === 'streaming'}
          className="send-button"
          aria-label="Send message"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
      <a
        href="https://prexo.ai"
        target="_blank"
        rel="noopener noreferrer"
        className="chat-input-watermark"
      >
        Powered by Prexo Ai
      </a>
    </form>
  );
};
