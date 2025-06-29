import { ProjectType } from '@prexo/types';
import { tool as createTool } from 'ai';
import { z } from 'zod';

const BASE_API_URL = process.env.BASE_API_URL;

const projectTool = createTool({
  description: 'Create a project with a name, userID and description for user.',
  parameters: z.object({
    name: z.string().describe('The name of the project'),
    userId: z.string().describe('The ID of the user creating the project'),
    description: z.string().describe('The description of the project').nullable().optional(),
  }),
  execute: async function ({ name, description, userId }) {
    const response = await fetch(`${BASE_API_URL}/project/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, userId, description }),
    });
    
    const project: ProjectType = await response.json();
    return { id: project.id, name: project.name, description: project.description };
  },
});


export const tools = {
  createProject: projectTool,
};