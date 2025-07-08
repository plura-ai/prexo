import { Hono } from "hono";
import { unkey, UnkeyContext } from "@unkey/hono";
import { createTogetherAI } from "@ai-sdk/togetherai";
import {
  NoSuchToolError,
  InvalidToolArgumentsError,
  streamText,
  ToolExecutionError,
} from "ai";
import { verifyApiKey } from "@/lib/middleware";

const aiSdk = new Hono<{ Variables: { verifyApiKey: UnkeyContext } }>();

export const maxDuration = 30;

const togetherai = createTogetherAI({
  apiKey: process.env.TOGETHER_API_KEY!,
});

aiSdk.use(
  "*",
  verifyApiKey(
    {
      apiId: process.env.UNKEY_API_ID!,
      tags: ["/sdk/ai"],
      handleInvalidKey: (c, result) => {
        console.log("Invalid API key!", result);
        return c.json(
          {
            error: "unauthorized",
            reason: result?.code,
          },
          401,
        );
      },
      onError: (c, err) => {
        console.log("Unkey Error:", err.message);
        return c.text("unauthorized", 401);
      },
    },
    3,3,60
  ),
);

aiSdk.post("/stream", async (c) => {
  const { messages } = await c.req.json();

  const result = streamText({
    model: togetherai("meta-llama/Llama-3.3-70B-Instruct-Turbo-Free"),
    messages: messages,
    system: "Your name is Prexo Ai. And here is the context about RDS (Real Dev Squad): Real Dev Squad is a rag-tag team of professionals and students, learning and collaborating together. Built by Ankush Dharkar.",
    maxSteps: 5,
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

export default aiSdk;
