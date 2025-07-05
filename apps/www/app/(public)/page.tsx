"use client";
import AgentsSec from "@/components/custom/hero/agents.sec";
import { SectionHeaderHeading } from "@/components/custom/text-wrappers";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-full min-h-screen overflow-hidden">
      <section
        id="hero"
        className="flex flex-col items-center justify-center w-full h-screen p-4 border-b border-dashed"
      >
        <div className="absolute inset-0 mx-auto h-full w-full bg-[radial-gradient(circle,rgba(211,211,211,0.1),rgba(18,20,22,0.05),rgba(18,20,22,0))] opacity-60" />
        <SectionHeaderHeading>Transform Your Business:</SectionHeaderHeading>
        <SectionHeaderHeading>AI-Powered Sales & Support</SectionHeaderHeading>
        <SectionHeaderHeading>Ready in Minutes</SectionHeaderHeading>

        <p className="text-lg font-sans text-muted-foreground text-center mt-4 max-w-2xl">
          Create intelligent agents that handle both sales and support 24/7,
          engage customers, qualify leads, and resolve issues. Deploy instantly
          across your Website, WhatsApp, and Telegram with zero coding required.
        </p>
      </section>
      <section
        id="about"
        className="flex flex-col items-center justify-center w-full h-full p-4 border-b border-dashed"
      >
      </section>
      <AgentsSec />
    </main>
  );
}
