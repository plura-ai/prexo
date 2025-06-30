import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
  } from "@/components/ui/card"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import CopyInput from '@/components/copy.input';

type ApiCardProps = {
    apiKey: string;
    name: string;
};

export default function ApiCardAiUi({apiKey, name}: ApiCardProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Prexo"
                value={name}
                readOnly
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="key">Project ApiKey</Label>
              <CopyInput value={apiKey} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <CardDescription>Copy your ApiKey and keep it safe. You will not be able to see it again.</CardDescription>
      </CardFooter>
    </Card>
  )
}
