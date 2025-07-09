import type { Message } from "ai";

export interface BaseMessageHistory {
  addMessage(params: {
    message: Message;
    sessionId: string;
    sessionTTL?: number;
  }): Promise<void>;

  deleteMessages(params: { sessionId: string }): Promise<void>;

  getMessages(params: {
    sessionId: string;
    amount?: number;
    startIndex?: number;
  }): Promise<Message[]>;
}
export interface SuggestedActionsT {
    label: string,
    action: string,
  }