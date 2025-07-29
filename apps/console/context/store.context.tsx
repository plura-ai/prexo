"use client";
import { useProjectsStore } from "@prexo/store";
import { ProjectType } from "@prexo/types";
import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { betterFetch } from "@better-fetch/fetch";

interface StoreContextType {
  contentLoading: boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [contentLoading, setContentLoading] = useState(false);

  const { projects, setProjects } = useProjectsStore();

  const PROJECTS_API_ENDPOINT =
    process.env.NODE_ENV == "development"
      ? "http://localhost:3001/v1/project/all"
      : "https://api.prexoai.xyz/v1/project/all";

  useEffect(() => {
    async function fetchProjects() {
      setContentLoading(true);
      const data = await fetch(PROJECTS_API_ENDPOINT, {
        credentials: "include",
      });

      const response = await data.json();
      if (response?.projects) {
        setProjects(
          response.projects.map(
            (project: ProjectType & { apiKey?: string }) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { apiKey, ...rest } = project;
              return rest as ProjectType;
            },
          ),
        );
      }
      setContentLoading(false);
    }

    if (projects.length === 0) {
      fetchProjects();
    }
  }, [projects.length, setProjects, PROJECTS_API_ENDPOINT]);

  const value = {
    contentLoading,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useContent() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
}
