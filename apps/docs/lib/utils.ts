import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getGithubLastEdit } from "fumadocs-core/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getLastEdit(filePath: string): Promise<Date | null> {
  return getGithubLastEdit({
    owner: "SkidGod4444",
    repo: "prexo",
    path: `apps/docs/content/docs/${filePath}`,
  });
}
