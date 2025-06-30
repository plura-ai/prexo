import { ProjectType } from '@prexo/types';
import { tool as createTool } from 'ai';
import { z } from 'zod';
import {useProjectsStore, useMyProfileStore} from "@prexo/store";

const BASE_API_URL = process.env.BASE_API_URL;

const projectTool = createTool({
  description: 'Create a project with a name and description for user.',
  parameters: z.object({
    name: z.string().describe('The name of the project'),
    description: z.string().describe('The description of the project').nullable().optional(),
  }),
  execute: async function ({ name, description }) {
    if (!BASE_API_URL) {
      throw new Error('BASE_API_URL is not defined');
    }
    if (!name) {
      throw new Error('Project name is required');
    }
    if (description && description.length > 500) { 
      throw new Error('Project description should not exceed 500 characters');
    }
    const {myProfile} = useMyProfileStore();
    const {addProject} = useProjectsStore();
    const response = await fetch(`${BASE_API_URL}/project/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, userId: myProfile?.id, description }),
    });

    const project: ProjectType = await response.json();
    if (!response.ok) {
      throw new Error(`Failed to create project.`);
    }
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
    if (!BASE_API_URL) {
      throw new Error('BASE_API_URL is not defined');
    }
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
    const response = await fetch(`${BASE_API_URL}/api/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, projectId: projects[0]?.id }),
    });
    const res: ProjectType = await response.json();
    if (!response.ok) {
      throw new Error(`Failed to create API key.`);
    }
    console.log('Created new API key:', res);
    return { apiKey: res.apiKey, projectName: res.name };
  },
});


export const tools = {
  createProject: projectTool,
  createApiKey: apiKeyTool,
};