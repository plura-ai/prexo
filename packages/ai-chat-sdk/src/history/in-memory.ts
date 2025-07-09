import type { Message } from "ai";
import {
  DEFAULT_CHAT_SESSION_ID,
  DEFAULT_HISTORY_LENGTH,
} from "../lib/constants";
import type { BaseMessageHistory } from "../lib/types";

declare global {
  var store: Record<string, { messages: Message[] }>;
}
export class InMemoryHistory implements BaseMessageHistory {
  constructor() {
    if (!global.store) global.store = {};
  }

  async addMessage(params: {
    message: Message;
    sessionId: string;
    sessionTTL?: number;
  }): Promise<void> {
    const { message, sessionId} = params;
    const sessionID = DEFAULT_CHAT_SESSION_ID(sessionId)

    if (!global.store[sessionID]) {
      global.store[sessionID] = { messages: [] };
    }

    const oldMessages = global.store[sessionID].messages || [];
    const newMessages = [message, ...oldMessages];
    global.store[sessionID].messages = newMessages;
  }

  async deleteMessages({ sessionId }: { sessionId: string }): Promise<void> {
    if (!global.store[sessionId]) {
      return;
    }
    global.store[sessionId].messages = [];
  }

  async getMessages({
    sessionId,
    amount = DEFAULT_HISTORY_LENGTH,
    startIndex = 0,
  }: {
    sessionId?: string;
    amount?: number;
    startIndex?: number;
  }): Promise<Message[]> {
    const sessionID = DEFAULT_CHAT_SESSION_ID(sessionId)

    if (!global.store[sessionID]) {
      global.store[sessionID] = { messages: [] };
    }

    const messages = global.store[sessionID]?.messages ?? [];
    const slicedMessages = messages.slice(startIndex, startIndex + amount);
    return slicedMessages.reverse();
  }
}
