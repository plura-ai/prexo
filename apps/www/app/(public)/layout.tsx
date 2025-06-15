import { Navbar } from "@/components/custom/site/navbar/navbar";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex flex-col items-center w-full min-h-screen border-border/40 dark:border-border min-[1800px]:max-w-[1536px] min-[1800px]:border-x">
      <Navbar />
      {children}
      {/* <SiteFooter /> */}
    </div>
  );
}