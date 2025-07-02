"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import CopyInput from "@/components/copy.input";
import type { UIMessage } from "ai";
import { ProjectDropDownAiUi } from "./project.drop.down";
import { Button } from "@/components/ui/button";
import { createApiKeyAction } from "@/lib/actions";
import { useMyProfileStore, useProjectsStore } from "@prexo/store";

type ApiCardProps = {
  addToolResult: (result: { toolCallId: string; result: string }) => void;
  append: (message: UIMessage) => void;
  callId: string;
};

export default function ApiCardAiUi({
  addToolResult,
  append,
  callId,
}: ApiCardProps) {
  const [projectID, setProjectID] = useState<string | null>(null);
  const { myProfile } = useMyProfileStore();
  const { setProjects, projects, addProject } = useProjectsStore();
  const name = "default-api-key";
  const [apiKey, setApiKey] = useState(projects?.[0]?.apiKey || "");
  const [loading, setLoading] = useState(false);

  if (!name.trim() || !myProfile?.id) {
    console.error("Name and UserId are required");
    return;
  }

  const handleOnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!projectID) {
      console.error("Project ID is required to create an API key");
      return;
    }
    try {
      // Call the API to create the API key
      setLoading(true);
      const response = await createApiKeyAction(name, projectID, myProfile?.id);
      console.log("Response from createApiKeyAction:", response);
      setProjects([]);
      setApiKey(response?.project?.apiKey || "");
      console.log("API key created successfully:", response?.project?.apiKey);
      addProject(response?.project);
      setLoading(false);

      addToolResult({
        toolCallId: callId,
        result: "API key created successfully!",
      });
      await new Promise((resolve) => setTimeout(resolve, 1500));
      append({
        id: myProfile.id,
        role: "user",
        content: "Thanks, Lets complete the onboarding.",
        parts: [
          {
            type: "text",
            text: "Thanks, Lets complete the onboarding.",
          },
        ],
      });
    } catch (error) {
      console.error("Error creating API key:", error);
    }
  };
  return (
    <Card className="w-full max-w-sm">
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            {!apiKey && (
              <div className="grid gap-2">
                <ProjectDropDownAiUi onProjectSelect={setProjectID} />
              </div>
            )}
            {apiKey ? (
              <div className="grid gap-2">
                <CopyInput value={apiKey} />
              </div>
            ) : (
              <div className="grid gap-2">
                <Button
                  className="cursor-pointer"
                  form="api-form"
                  disabled={loading || !projectID}
                  onClick={handleOnClick}
                >
                  {loading ? "Creating API Key..." : "Create API Key"}
                </Button>
              </div>
            )}
          </div>
        </form>
      </CardContent>
      {apiKey && (
        <CardFooter>
          <CardDescription>
            Copy your ApiKey and keep it safe. You will not be able to see it
            again.
          </CardDescription>
        </CardFooter>
      )}
    </Card>
  );
}
