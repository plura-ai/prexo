import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  IconBrain,
  IconRobot,
  IconCode,
  IconArrowRight,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import {
  SectionHeader,
  SectionHeaderHeading,
  SectionHeaderDescription,
} from "../../text-wrappers";

const agentCards = [
  {
    title: "AI Assistant",
    description:
      "Intelligent coding companion that understands your needs. It helps streamline your coding process and enhances productivity.",
    icon: IconBrain,
    href: "/features/ai-assistant",
    class: "md:col-span-2 md:row-span-2 h-[40rem]",
    image: "/img/ai.code.png",
  },
  {
    title: "Smart Automation",
    description:
      "Automate repetitive tasks with intelligent workflows. This feature allows you to focus on more important aspects of your projects.",
    icon: IconRobot,
    href: "/features/automation",
    class: "",
    image: null,
  },
  {
    title: "Code Generation",
    description:
      "Generate high-quality code snippets instantly. This tool saves time and reduces the likelihood of errors in your code.",
    icon: IconCode,
    href: "/features/code-gen",
    class: "",
    image: "",
  },
];

export default function OssSec() {
  return (
    <div className="relative w-full items-center justify-center py-10">
      <div className="px-8 md:px-14">
        <SectionHeader className="flex flex-col z-50 mb-10">
          <SectionHeaderHeading>We believe in Open Source</SectionHeaderHeading>
          <SectionHeaderDescription>
            Linear is shaped by the practices and principles that distinguish
            world-class product teams from the rest: relentless focus, fast
            execution, and a commitment to the quality of craft.
          </SectionHeaderDescription>
        </SectionHeader>

        <div className="grid grid-cols-1 px-8 md:px-14 max-w-7xl mx-auto md:grid-cols-3 gap-4">
          {agentCards.map((card, index) => (
            <div
              key={index}
              className={cn(
                card.class,
                "relative group overflow-hidden backdrop-blur-xl rounded-3xl p-8 border border-dashed border-border cursor-pointer",
              )}
            >
              {card.image && (
                <div className="w-full absolute bottom-[-10rem] right-[-10rem] h-auto mb-4 rounded-lg">
                  <Image
                    src={card.image}
                    alt={card.title}
                    className="h-[35rem] object-contain mb-4 rounded-lg"
                    width={800}
                    height={800}
                  />
                </div>
              )}
              <h3 className="text-2xl font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-400">{card.description}</p>
              <div className="md:bottom-[-30rem] left-[10%] group-hover:opacity-100 opacity-30 z-[-1] absolute bg-gradient-to-t from-secondary/20 to-primary/50 blur-[8em] rounded-xl transition-all translate-x-[-50%] duration-500 ease-out w-[10rem] md:w-[30rem] h-[20rem] md:h-[30rem] rotate-[0deg]" />
              <Link
                href={card.href}
                className="text-primary group w-fit flex items-center gap-1 bg-accent text-xs border border-accent rounded-full px-3 mt-4 py-1 transition-all duration-300 hover:bg-primary hover:text-background"
              >
                <span className="font-semibold text-xs">Read More</span>{" "}
                <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
