import { cn } from "@/lib/utils";

function PageHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn(
        "flex flex-col items-center justify-start md:items-start gap-8 p-8 md:p-20",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

function PageHeaderHeading({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "text-5xl md:text-6xl font-semibold tracking-tighter drop-shadow-sm max-w-3xl select-none",
        className,
      )}
      {...props}
    />
  );
}

function PageHeaderDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-start text-xl font-semibold text-muted-foreground bg-clip-text max-w-2xl select-none",
        className,
      )}
      {...props}
    />
  );
}

function PageActions({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex w-full items-start gap-6", className)}
      {...props}
    />
  );
}

function PageCommandText({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("font-mono text-sm text-gray-500", className)}
      {...props}
    />
  );
}

function SectionHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn(
        "flex items-center justify-start md:items-start gap-8 p-12 md:p-20 md:mr-auto",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

function SectionHeaderHeading({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "text-5xl font-uxum md:text-6xl font-semibold tracking-tighter drop-shadow-sm max-w-3xl select-none",
        className,
      )}
      {...props}
    />
  );
}

function SectionHeaderDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-start font-uxum text-lg text-muted-foreground max-w-xl font-medium mt-auto z-50 select-none",
        className,
      )}
      {...props}
    />
  );
}

function SectionActions({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex w-full items-start justify-start md:items-start gap-8 px-12 md:px-20",
        className,
      )}
      {...props}
    />
  );
}

export {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
  PageCommandText,
  SectionHeader,
  SectionHeaderHeading,
  SectionHeaderDescription,
  SectionActions,
};
