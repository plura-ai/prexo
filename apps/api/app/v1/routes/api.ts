import { prisma } from "@prexo/db";
import { Hono } from "hono";
import { createApi } from "@prexo/keys";

const api = new Hono();

api.post("/create", async (c) => {
    const { name, projectId } = await c.req.json();
    if (!name || !projectId) {
      return c.json({ message: "Name and ProjectId are required" }, 400);
    }

    const apiKey = await createApi(projectId, name, true);
    if (!apiKey.key) {
      return c.json({ message: "Failed to create API key" }, 500);
    }
  
    const newAPI = await prisma.project.update({
        where: { id: projectId },
        data: {
            apiKey: apiKey.key,
            updatedAt: new Date(),
        },
    });
    if (!newAPI) {
      return c.json({ message: "Failed to create ApiKey" }, 500);
    }
    console.log("Created new ApiKey:", newAPI);
    return c.json({ project: newAPI }, 201);
  });

export default api;