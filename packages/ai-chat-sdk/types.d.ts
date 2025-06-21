type PromptParameters = {
	chatHistory?: string;
	question: string;
	context: string;
};

type Prompt = ({ question, chatHistory, context }: PromptParameters) => string;

type Message = {
	role: "user" | "assistant" | "error"
	content: any;
	id: string
}

type StreamMessage = {
	role: 'user' | 'assistant';
	content: string;
  }

interface MessageHistoryActions {
	addMessage(params: {
		message: Message;
		sessionId: string;
		sessionTTL?: number;
	}): Promise<void>;

	deleteMessages(params: {
		sessionId: string
	}): Promise<void>;

	getMessages(params: {
		sessionId: string;
		amount?: number;
		startIndex?: number;
	}): Promise<Message[]>;
}