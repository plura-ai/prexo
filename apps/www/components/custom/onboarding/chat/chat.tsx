import React from 'react'
import ChatInput from './input'
import { useChat } from '@ai-sdk/react';
import { Messages } from './messages';

export default function OnboardingChat() {
  const url = `http://localhost:3001/v1/ai/stream`;

  const { messages, input, setInput, handleSubmit, status } = useChat({
    api: url,
    onFinish: (message, { usage, finishReason }) => {
      console.log('Finished streaming message:', message);
      console.log('Token usage:', usage);
      console.log('Finish reason:', finishReason);
    },
    onError: error => {
      console.error('An error occurred:', error);
    },
    onResponse: response => {
      console.log('Received HTTP response from server:', response);
    },
    maxSteps: 5,
    async onToolCall({ toolCall }) {
      if (toolCall.toolName === 'getLocation') {
        const cities = [
          'New York',
          'Los Angeles',
          'Chicago',
          'San Francisco',
        ];
        return cities[Math.floor(Math.random() * cities.length)];
      }
    },
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
