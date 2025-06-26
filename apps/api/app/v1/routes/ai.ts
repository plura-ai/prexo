import { Hono } from "hono";
import { createTogetherAI } from "@ai-sdk/togetherai";
import { streamText } from "ai";
import { tools } from '@/lib/ai/tools';
import { systemPrompt } from "@/lib/configs";

const ai = new Hono();

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const togetherai = createTogetherAI({
  apiKey: process.env.TOGETHER_API_KEY!,
});

ai.post("/stream", async (c) => {
  const { messages } = await c.req.json();
  const result = streamText({
    model: togetherai("meta-llama/Llama-3.3-70B-Instruct-Turbo-Free"),
    system: systemPrompt(),
    messages,
    maxSteps: 5,
    tools,
  });

  return result.toDataStreamResponse({
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Encoding": "none",
    },
  });
});

export default ai;