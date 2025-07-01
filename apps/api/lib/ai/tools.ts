import { ProjectType } from '@prexo/types';
import { tool as createTool } from 'ai';
import { z } from 'zod';
import {useProjectsStore} from "@prexo/store";
import { createApiKeyAction, createProjectAction } from './actions';


const projectTool = createTool({
  description: 'Create a project with a name and description for user.',
  parameters: z.object({
    name: z.string().describe('The name of the project'),
    description: z.string().describe('The description of the project').nullable().optional(),
  }),
  execute: async function ({ name, description }) {
    if (!name) {
      throw new Error('Project name is required');
    }
    if (description && description.length > 500) { 
      throw new Error('Project description should not exceed 500 characters');
    }
    const {addProject} = useProjectsStore();
    const project: ProjectType = await createProjectAction(name, description ?? undefined);

    console.log('Created new project:', project);
    addProject(project);
    return { id: project.id, name: project.name, description: project.description };
  },
});

const apiKeyTool = createTool({
  description: 'Create an API key for a project.',
  parameters: z.object({
    name: z.string().describe('The name of the API key'),
  }),
  execute: async function ({ name }) {
    if (!name) {
      throw new Error('API key name is required');
    }
    if (name.length > 100) {
      throw new Error('API key name should not exceed 100 characters');
    }
    if (!useProjectsStore.getState().projects.length) {
      throw new Error('No projects available. Please create a project first.');
    }
    const {projects} = useProjectsStore();

    const res: ProjectType = await createApiKeyAction(
      name,
      projects[0].id, // Assuming we create API key for the first project
    );

    if (!res.apiKey) {
      throw new Error('Failed to create API key. Please try again.');
    }

    console.log('Created new API key:', res);
    return { apiKey: res.apiKey, projectName: res.name };
  },
});

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


export const tools = {
  // createProject: projectTool,
  // createApiKey: apiKeyTool,
  askForConfirmation,
  sendCreateProjectForm,
};