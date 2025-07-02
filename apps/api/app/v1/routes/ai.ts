import { Hono } from "hono";
import { createTogetherAI } from "@ai-sdk/togetherai";
import { createOpenAI } from "@ai-sdk/openai";
import {
  NoSuchToolError,
  InvalidToolArgumentsError,
  streamText,
  ToolExecutionError,
} from "ai";
import { systemPrompt } from "@/lib/configs";
import { tools } from "@/lib/ai/tools";

const ai = new Hono();

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const togetherai = createTogetherAI({
  apiKey: process.env.TOGETHER_API_KEY!,
});

ai.post("/stream", async (c) => {
  const { messages } = await c.req.json();

  // Filter out any tool invocations that are in 'call' state and do not have a result.
  // This prevents the AI_MessageConversionError when the tool call is not yet resolved.
  const filteredMessages = messages.map((msg: any) => {
    if (!msg.parts) return msg;
    return {
      ...msg,
      parts: msg.parts.filter((part: any) => {
        if (part.type !== "tool-invocation") return true;
        // Only include tool-invocation parts that are in 'result' state
        return part.toolInvocation?.state !== "call";
      }),
    };
  });

  const result = streamText({
    model: togetherai("meta-llama/Llama-3.3-70B-Instruct-Turbo-Free"),
    system: systemPrompt(),
    messages: filteredMessages,
    maxSteps: 5,
    tools: tools,
    onStepFinish: (step) => {
      console.log("Step finished:", step);
    },
  });

  return result.toDataStreamResponse({
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Encoding": "none",
    },
    getErrorMessage: (error) => {
      if (NoSuchToolError.isInstance(error)) {
        return "The model tried to call a unknown tool.";
      } else if (InvalidToolArgumentsError.isInstance(error)) {
        return "The model called a tool with invalid arguments.";
      } else if (ToolExecutionError.isInstance(error)) {
        return "An error occurred during tool execution.";
      } else {
        return "An unknown error occurred.";
      }
    },
  });
});

export default ai;
