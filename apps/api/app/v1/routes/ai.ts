import { Hono } from "hono";
import { createTogetherAI } from "@ai-sdk/togetherai";
import { streamText } from "ai";

const ai = new Hono();

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
console.log("TOGETHER_AI_API_KEY", process.env.TOGETHER_AI_API_KEY);
const togetherai = createTogetherAI({
  apiKey: process.env.TOGETHER_AI_API_KEY ?? "tgp_v1__vbDfUADRSSs8y-bnuHWuMo_c27loU6zlHxZm1fFYCM",
});

ai.post("/stream", async (c) => {
  const { messages } = await c.req.json();
  const result = streamText({
    model: togetherai("meta-llama/Llama-3.3-70B-Instruct-Turbo-Free"),
    system: "You are a customer onboarding assistant. Your name is Prexo AI. Stay strict to the context of the conversation and do not make up any information. Dont go off-topic.",
    messages,
  });

  return result.toDataStreamResponse({
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Encoding": "none",
    },
  });
});

export default ai;