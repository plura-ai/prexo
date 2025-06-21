'use server'

import { HistoryClientInit } from "../../lib/history";

const history = HistoryClientInit();

export async function addHistory(msgs: Message, sessionId: string): Promise<void> {
   try {
    await history.addMessage({
        message: msgs,
        sessionId
      })
   } catch (error) {
    console.error("Failed to add message to chat history:", error);
    throw new Error("Failed to add message to chat history");
   }
}

export async function getHistory(sessionId: string): Promise<{ messages: Message[] }> {
	try {
		const messages = await history.getMessages({ sessionId });
		return { messages };
	} catch (error) {
		console.error("Failed to fetch chat history:", error);
		return { messages: [] };
	}
}

export async function deleteHistory(sessionId: string): Promise<{ success: boolean }> {
	try {
		await history.deleteMessages({ sessionId });
		return { success: true };
	} catch (error) {
		console.error("Failed to delete chat history:", error);
		return { success: false };
	}
}