"use client";
import AgentsSec from "@/components/custom/hero/agents.sec";
import { SectionHeaderHeading } from "@/components/custom/text-wrappers";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Home() {
  const isMob = useIsMobile();

  const GradientLen = isMob ? 5 : 20;

  return (
    <main className="flex flex-col items-center justify-center w-full min-h-screen overflow-hidden">

<div
          className="absolute inset-0 z-0 flex [mask-image:radial-gradient(circle_at_center,white_0%,white_30%,transparent_70%)]"
          style={{ opacity: 0.5 }}
        >
          {Array.from({ length: GradientLen }).map((_, i) => (
            <div
              key={i}
              className="h-full w-20 bg-gradient-to-r from-neutral-100 to-white shadow-[2px_0px_0px_0px_var(--color-neutral-400)] dark:from-neutral-900 dark:to-neutral-950 dark:shadow-[2px_0px_0px_0px_var(--color-neutral-800)]"
            />
          ))}
        </div>
      <section
        id="hero"
        className="flex flex-col items-center justify-center w-full h-screen p-4 border-b border-dashed"
      >
        <div className="absolute inset-0 mx-auto h-full w-full bg-[radial-gradient(circle,rgba(211,211,211,0.1),rgba(18,20,22,0.05),rgba(18,20,22,0))] opacity-60" />
        <SectionHeaderHeading>Transform Your Business:</SectionHeaderHeading>
        <SectionHeaderHeading>AI-Powered Sales & Support</SectionHeaderHeading>
        <SectionHeaderHeading>Ready in Minutes</SectionHeaderHeading>

        <p className="text-lg font-sans text-muted-foreground text-center mt-4 max-w-2xl z-50">
          Create intelligent agents that handle both sales and support 24/7,
          engage customers, qualify leads, and resolve issues. Deploy instantly
          across your Website, WhatsApp, and Telegram with zero coding required.
        </p>
      </section>
      <section
        id="about"
        className="flex flex-col items-center justify-center w-full h-full p-4 border-b border-dashed"
      ></section>
      <AgentsSec />
    </main>
  );
}
