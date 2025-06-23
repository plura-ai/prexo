import React from 'react'
import ChatInput from './input'
import { useChat } from '@ai-sdk/react';
import { Messages } from './messages';

export default function OnboardingChat() {
  const url = `http://localhost:3001/v1/ai/stream`;

  const { messages, input, setInput, handleSubmit, status } = useChat({
    api: url,
    onError: (error) => {
      console.error("Chat API error:", error);
      if (error instanceof Error) {
        console.error("Message:", error.message);
        console.error("Stack:", error.stack);
      }
    },
    onFinish: () => {
      console.log("Chat session finished successfully.");
    }
  });
  return (
    <div className="relative flex flex-col w-screen max-w-2xl mx-auto h-screen">
      <div className="flex-1 overflow-y-auto pt-4">
        <Messages chatId='3893sk' status={status} messages={messages}/>
      </div>
      <div className="sticky bottom-0 bg-background z-10 px-2 pb-2">
        <ChatInput status={status} input={input} setInput={setInput} handleSubmit={handleSubmit} />
      </div>
    </div>
  )
}
