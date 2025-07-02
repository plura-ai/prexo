import { tool as createTool } from "ai";
import { z } from "zod";

const askForConfirmation = createTool({
  description: "Ask the user for any confirmation.",
  parameters: z.object({
    message: z.string().describe("Onboarding message to ask for confirmation."),
  }),
});

const sendCreateProjectForm = createTool({
  description: "Send create project form to user. After confirmation.",
  parameters: z.object({
    message: z.string().describe("Message to send to user after confirmation."),
  }),
});

const sendCreateApiFrom = createTool({
  description: "Send create API form to user. After confirmation.",
  parameters: z.object({
    message: z.string().describe("Message to send to user after confirmation."),
  }),
});

const completeOnboarding = createTool({
  description: "Send UI to user to confirm onboarding is complete.",
  parameters: z.object({
    message: z.string().describe("Message to ask if onboarding is complete."),
  }),
});

export const tools = {
  askForConfirmation,
  sendCreateProjectForm,
  sendCreateApiFrom,
  completeOnboarding,
};
