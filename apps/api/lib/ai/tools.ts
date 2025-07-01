import { tool as createTool } from 'ai';
import { z } from 'zod';

const askForConfirmation = createTool({
  description: 'Ask the user for onboarding confirmation.',
  parameters: z.object({
    message: z.string().describe('Onboarding message to ask for confirmation.'),
  }),
});

const sendCreateProjectForm = createTool({
  description: 'Send create project form to user. After confirmation.',
  parameters: z.object({
    message: z.string().describe('Message to send to user after confirmation.'),
  }),
});

const sendCreateApiFrom = createTool({
  description: 'Send create API form to user. After confirmation.',
  parameters: z.object({
    message: z.string().describe('Message to send to user after confirmation.'),
  }),
});


export const tools = {
  askForConfirmation,
  sendCreateProjectForm,
  sendCreateApiFrom,
};