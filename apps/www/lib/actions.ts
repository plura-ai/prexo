"use server";

const BASE_API_URL = process.env.BASE_API_URL!;
console.log("BASE_API_URL:", BASE_API_URL);

async function createProjectAction(
  name: string,
  description?: string | null,
  userId?: string,
) {
  const response = await fetch(`${BASE_API_URL}/project/create`, {
    method: "POST",
    body: JSON.stringify({
      name: name,
      userId: userId,
      description: description,
    }),
  });
  console.log("Response from createProjectAction:", response);
  const project = await response.json();
  return project;
}

async function createApiKeyAction(
  name: string,
  projectId: string,
  userId: string,
) {
  const response = await fetch(`${BASE_API_URL}/api/create`, {
    method: "POST",
    body: JSON.stringify({ name, projectId, userId }),
  });
  console.log("Response from createApiKeyAction:", response);
  const res = await response.json();
  return res;
}

export { createProjectAction, createApiKeyAction };
