"use client";
import type React from "react";
import { useEffect, useRef, useCallback } from "react";
import "../../styles/chat.widget.css";
import { Message } from "./message";
import { TypingIndicator } from "./typing.indicator";
import { ChatInput } from "./chat.input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Maximize,
  Minimize,
  X,
} from "lucide-react";
import { useLocalStorage } from "../../../hooks/use.local.store";
import { useChat } from "ai/react";
import { BASE_API_ENDPOINT } from "../../../lib/utils";


export interface PrexoAiChatBotProps {
  apiKey: string;
  onClose?: () => void;
  theme?: "light" | "dark";
  user?: {
    name: string | "Prexo Ai",
    pfp: string | "https://raw.githubusercontent.com/plura-ai/prexo/refs/heads/main/apps/www/public/logo.png",
    lastSeen: Date;
  };
  placeholder?: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  position?: "bottom-right" | "bottom-left";
}

export const PrexoAiChatBot: React.FC<PrexoAiChatBotProps> = ({
  apiKey,
  onClose,
  user,
  theme,
  placeholder = "Type your message...",
  className = "",
  width = 350,
  height = 500,
  position = "bottom-right",
}) => {
  const [isOpen, setIsOpen] = useLocalStorage("@prexo-chat-bot-#isOpen", false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [isMinimized, setIsMinimized] = useLocalStorage("@prexo-chat-bot-#isMinimized", false);

  if(apiKey.length === 0) {
    throw new Error("API key is required for PrexoAiChatBot to function properly");
  }

  const { messages, input, handleInputChange, handleSubmit, status} = useChat({
    api: `${BASE_API_ENDPOINT}/ai/stream`,
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  const isTyping = status === 'submitted';

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);


  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleClose = () => {
    setIsOpen(false);
    // Only call onClose if it exists
    if (onClose) {
      onClose();
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };

  const getPositionClasses = () => {
    switch (position) {
      case "bottom-left":
        return "bottom-left";
      default:
        return "bottom-right";
    }
  };

  const getWidgetStyle = () => {
    return {
      width: typeof width === "number" ? `${width}px` : width,
      height: isMinimized
        ? "60px"
        : typeof height === "number"
          ? `${height}px`
          : height,
    };
  };
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      {/* Floating Bubble Button */}
      {!isOpen && (
        <div className={`chat-bubble ${theme} ${getPositionClasses()}`}>
          <button type="button" onClick={handleOpen} className="bubble-button">
            <img
              src="https://raw.githubusercontent.com/plura-ai/prexo/refs/heads/main/apps/www/public/logo.png"
              className="w-12 h-12 rounded-lg object-cover"
              alt="Chat bot avatar"
              onError={(e) => {
                console.error("Failed to load image:", e);
                e.currentTarget.style.display = "none";
              }}
            />
          </button>
        </div>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div
          className={`chat-widget ${theme} ${isMinimized ? "minimized" : ""} ${isOpen && position === 'bottom-right' ? "open right" : "open left"} ${!isOpen && "close"} ${getPositionClasses()} ${className}`}
          style={getWidgetStyle()}
        >
          <div className="chat-header">
            {user ? (
              <div className="chat-title">
              <Avatar>
                <AvatarImage src={user.pfp} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span>{user.name}</span>
                <div className="message-time">Last seen {formatTime(user.lastSeen)}</div>
              </div>
            </div>
            ) : (
              <div className="chat-title">
             <img
                        src="https://raw.githubusercontent.com/plura-ai/prexo/refs/heads/main/apps/www/public/logo.png"
                        className="w-9 h-9 rounded-lg object-cover invert"
                        alt="Chat bot avatar"
                        onError={(e) => {
                          console.error("Failed to load image:", e);
                          e.currentTarget.style.display = "none";
                        }}
                      />
              <div className="flex flex-col">
                <span>Prexo Ai</span>
                <div className="message-time">Last seen {formatTime(new Date())}</div>
              </div>
            </div>
            )}
            <div className="chat-controls">
              {/* <button
                className="control-btn minimize-btn"
                onClick={handleMinimize}
                aria-label={isMinimized ? "Expand width" : "Minimize width"}
              >
                {isMinimized ? <PanelRightOpen className="size-4" /> : <PanelLeftOpen className="size-4" />}
              </button> */}
              <button
                className="control-btn minimize-btn"
                onClick={handleMinimize}
                aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
              >
                {isMinimized ? (
                  <Maximize className="size-4" />
                ) : (
                  <Minimize className="size-4" />
                )}
              </button>
              <button
                className="control-btn close-btn"
                onClick={handleClose}
                aria-label="Close chat"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="chat-messages" ref={messagesContainerRef}>
                {messages.length === 0 && (
                  <div className="message bot">
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
                    <div className="message-content">
                      <div className="message-bubble">
                        <p>Hello! I'm Prexo Ai. How can I help you today?</p>
                      </div>
                    </div>
                  </div>
                )}

                {messages.map((message) => (
                  <Message
                    key={message.id}
                    message={message}
                  />
                ))}

                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>

              <ChatInput
              input={input}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              status={status}
              placeholder={placeholder}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};
