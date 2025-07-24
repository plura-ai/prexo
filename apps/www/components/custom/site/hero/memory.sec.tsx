import React from "react";
import {
  SectionHeader,
  SectionHeaderHeading,
  SectionHeaderDescription,
} from "../../text-wrappers";
import { AnimatedBeamDB, AnimatedBeamMemoryInput } from "./memory.anim";
import { Card, CardDescription, CardFooter } from "@/components/ui/card";

export default function MemorySec() {

  return (
    <div className="relative w-full items-center justify-center py-10">
      <div className="px-4 md:px-14">
        <SectionHeader className="flex flex-col z-50 mb-10">
          <SectionHeaderHeading>
            Customisable, Persistent Memory
          </SectionHeaderHeading>
          <SectionHeaderDescription>
            Our memory system allows you to create custom memory inputs and
            databases, enabling your agents to learn and adapt over time.
            customer queries and tasks.
          </SectionHeaderDescription>
        </SectionHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto px-4 md:px-14">
          <Card className="flex flex-col justify-between border-dashed bg-transparent p-5 rounded-3xl h-full">
            <CardDescription className="text-lg text-muted-foreground">
              Agent&apos;s memory extracts contexts from your provided 
            documents, allowing it to query the context and
            adapt its responses accordingly.
            </CardDescription>
            <CardFooter className="w-full mt-4 px-3 md:px-auto">
              <AnimatedBeamMemoryInput />
            </CardFooter>
          </Card>

          <Card className="flex flex-col justify-between border-dashed bg-transparent p-5 rounded-3xl">
            <CardDescription className="text-lg text-muted-foreground">
              The memory database stores all the interactions and contexts, allowing your agents to recall past conversations and provide more relevant responses per user.
            </CardDescription>
            <CardFooter className="w-full mt-4 mb-12">
              <AnimatedBeamDB />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}