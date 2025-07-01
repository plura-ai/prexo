'use server';
import { betterFetch } from "@better-fetch/fetch";
import { ProjectType } from "@prexo/types";

const BASE_API_URL = process.env.BASE_API_URL!;
console.log('BASE_API_URL:', BASE_API_URL);

async function createProjectAction(name: string, description?: string | null, userId?: string) {

    const response = await fetch(`${BASE_API_URL}/project/create`, {
        method: 'POST',
        body: JSON.stringify({ name: name, userId: userId, description: description }),
    });

    const project: ProjectType = await response.json();
    return project;
}

async function createApiKeyAction(name: string, projectId: string, userId: string) {

    const response = await betterFetch(`${BASE_API_URL}/api/create`, {
        method: 'POST',
        body: JSON.stringify({ name, projectId, userId }),
    });
   
    const res = response.data as ProjectType;
    return res;
}

export { createProjectAction, createApiKeyAction };