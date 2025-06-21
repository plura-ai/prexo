import { Index } from "@upstash/vector"
import { streamText, type StreamTextResult, type ToolSet } from "ai"
import { togetherai } from '@ai-sdk/togetherai';
import { DEFAULT_PROMPT } from "../../lib/configs";
import { HistoryClientInit } from "../../lib/history";

const vectorIndex = new Index()
const history = HistoryClientInit()

const vectorDocs = async (data: string, topK: number) => {
    const results = await vectorIndex.query({
      data,
      topK: topK ? topK : 5,
      includeMetadata: true,
      includeData: true,
    });
    if (!results || !results.length) {
      return [];
    }
    // Map the results to a more usable format 
    return results.map((result) => ({
      content: result.data,
      metadata: result.metadata,
      score: result.score,
    }));
  }

export async function serverChat({
    messages,
    sessionId,
  }: {
    messages: Message[];
    sessionId: string;
  }): Promise<{
    output: StreamTextResult<ToolSet, never>;
    context: {
        content: string | undefined;
        metadata: Dict<any> | undefined;
        score: number;
    }[];
}> {
    const userMsg = messages[messages.length - 1]

    if (!userMsg || userMsg.role !== 'user') {
        throw new Error("No user message found.");
      }

    await history.addMessage({
        message: userMsg,
        sessionId
      })

      const serverMessages = messages
    .filter(msg => msg.role !== 'error')
    .map(msg => ({
      role: msg.role,
      content: msg.content
    })) as StreamMessage[];

    const vectorContext = await vectorDocs(userMsg.content, 50)
    const chatHistory = messages.map(message => message.content).join("\n")
    const context = vectorContext.map(doc => doc.content).join("\n")

    const systemPrompt = DEFAULT_PROMPT({ context, question: userMsg.content, chatHistory })
    const model = togetherai('meta-llama/Llama-3.3-70B-Instruct-Turbo-Free');

    const result = streamText({
        model: model,
        system: systemPrompt,
        messages: serverMessages,
        onError: error => {
            console.error('An error occurred:', error);
          },
        async onFinish({ text, usage, finishReason }) {
            console.log('Token usage:', usage);
            console.log('Finish reason:', finishReason);
          await history.addMessage({
            message: {
              role: "assistant",
              content: text,
              id: Date.now().toString(),
            },
            sessionId,
          });
        }
      });

      return {output: result, context: vectorContext};
}