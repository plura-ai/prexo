import { prisma } from "@prexo/db";
import { Hono } from "hono";

const project = new Hono();

project.post("/create", async (c) => {
  const { name, userId, description } = await c.req.json();
  if (!name || !userId) {
    return c.json({ message: "Name and UserId are required" }, 400);
  }

  const newProject = await prisma.project.create({
    data: {
      name: name,
      userId: userId,
      description: description || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  if (!newProject) {
    return c.json({ message: "Failed to create project" }, 500);
  }
  console.log("Created new project:", newProject);
  return c.json({ project: newProject }, 201);
});

export default project;