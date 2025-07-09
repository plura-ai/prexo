import SiteFooter from "@/components/custom/site/footer/footer";
import { Navbar } from "@/components/custom/site/navbar/navbar";
import { PrexoAiChatBot } from "@prexo/ai-chat-sdk";

interface PublicLayoutProps {
  children: React.ReactNode;
}


const suggestedActions = [
  {
    label: "What is Real Dev Squad?",
    action:
      "I would like to know more about RDS.",
  },
  {
    label: "What RDS even does?",
    action: "Hii, Prexo Ai. Tell me what RDS is.",
  },
];

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex flex-col items-center w-full min-h-screen border-border/40 dark:border-border min-[1800px]:max-w-[1536px] min-[1800px]:border-x">
      <Navbar />
      {children}
      <SiteFooter />
      <PrexoAiChatBot
                width={380}
                height={550}
                apiKey={process.env.PREXO_API_KEY!}
                suggestedActions={suggestedActions}
                position="bottom-right"
                sessionId="1234"
                {...(redisUrl && redisToken
                  && { redis: { url: redisUrl, token: redisToken } }
                )}
              />
    </div>
  );
}
