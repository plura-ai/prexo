"use client";
import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardFooter,
  } from "@/components/ui/card"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createProjectAction } from '@/lib/actions';
import { useMyProfileStore, useProjectsStore } from '@prexo/store';
import type { UIMessage } from 'ai';

type ProjectCardAiUiProps = {
  isDisabled?: boolean;
  addToolResult: (result: { toolCallId: string; result: string }) => void;
  append: (message: UIMessage) => void;
  callId: string;
};
export default function ProjectCardAiUi({isDisabled, addToolResult, append, callId}: ProjectCardAiUiProps) {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const {addProject, setProjects} = useProjectsStore();
  const {myProfile} = useMyProfileStore();

  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!projectName.trim() || !myProfile?.id) {
      console.error('Name and UserId are required');
      return;
    }

    setLoading(true);
    try {
      const res = await createProjectAction(projectName, projectDescription, myProfile.id);
      setProjects([])
      addProject(res);
      console.log('Project created successfully:', res);
      addToolResult({
        toolCallId: callId,
        result: 'Project created successfully! You can now create your own API key.',
      });
      await new Promise(resolve => setTimeout(resolve, 1500));
      append({
        id: myProfile.id,
        role: 'user',
        content: 'Lets create the API key.',
        parts: [
          {
            type: 'text',
            text: 'Lets procced to the next step.',
          },
        ],
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardContent>
        <form id="project-form" onSubmit={handleSubmission}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Prexo"
                value={projectName}
                onChange={e => setProjectName(e.target.value)}
                disabled={isDisabled || loading}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="description">Description</Label>
              </div>
              <Input
                id="description"
                type="text"
                placeholder="Prexo is an Ai support..."
                value={projectDescription}
                onChange={e => setProjectDescription(e.target.value)}
                disabled={isDisabled || loading}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          className="w-full cursor-pointer"
          form="project-form"
          disabled={isDisabled || loading}
        >
          {loading ? 'Creating...' : 'Create Project'}
        </Button>
      </CardFooter>
    </Card>
  )
}
