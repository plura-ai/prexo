import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
  } from "@/components/ui/card"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type ProjectCardProps = {
    id: string;
    name: string;
    description?: string;
};
export default function ProjectCardAiUi({id, name, description}: ProjectCardProps) {
  return (
     <Card className="w-full max-w-sm">
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
          <div className="grid gap-2">
              <Label htmlFor="id">Id</Label>
              <Input
                id="id"
                type="text"
                placeholder="3980920djkw3"
                value={id}
                readOnly
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Prexo"
                value={name}
                readOnly
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="description">Description</Label>
              </div>
              <Input id="description" type="text" placeholder='Prexo is an Ai support...' value={description} readOnly />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
      <CardDescription>
          Review your project info before creating. Request for changes if needed.
        </CardDescription>
      </CardFooter>
    </Card>
  )
}
