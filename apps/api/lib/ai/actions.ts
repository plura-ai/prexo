'use server';
import { betterFetch } from "@better-fetch/fetch";
import { auth, Session } from "@prexo/auth";
import { ProjectType } from "@prexo/types";
import { headers } from "next/headers";

const BASE_API_URL = process.env.BASE_API_URL!;
console.log('BASE_API_URL:', BASE_API_URL);

async function createProjectAction(name: string, description?: string | null) {
    const headersList = await headers();
    console.log('Creating project with headers:', headersList);
    const ses: Session | null = await auth.api.getSession({
        query: {
            disableCookieCache: true,
        },
        headers: headersList,
    });

    const response = await betterFetch(`${BASE_API_URL}/project/create`, {
        method: 'POST',
        body: JSON.stringify({ name, userId: ses?.user.id, description }),
    });
    
    const project = response.data as ProjectType;
    return project;
}

async function createApiKeyAction(name: string, projectId: string) {
    const headersList = await headers();
    const ses: Session | null = await auth.api.getSession({
        query: {
            disableCookieCache: true,
        },
        headers: headersList,
    });
    const response = await betterFetch(`${BASE_API_URL}/api/create`, {
        method: 'POST',
        body: JSON.stringify({ name, projectId, userId: ses?.user.id }),
    });
   
    const res = response.data as ProjectType;
    return res;
}

export { createProjectAction, createApiKeyAction };