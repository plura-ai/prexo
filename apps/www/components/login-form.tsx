"use client";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  IconBrandGoogle,
  IconBrandGithub,
  IconBrandDiscord,
} from "@tabler/icons-react";
import { authClient } from "@prexo/auth";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const handleAuth = async (provider: "github" | "discord" | "google") => {
    switch (provider) {
      case "google":
        await authClient.signIn.social({
          provider: provider,
          callbackURL: "/onboarding",
          fetchOptions: {
            onSuccess() {
              console.log("Successfully signed in with Google");
            },
          },
        });
        break;
      case "github":
        await authClient.signIn.social({
          provider: provider,
          callbackURL: "/onboarding",
          fetchOptions: {
            onSuccess() {
              console.log("Successfully signed in with Github");
            },
          },
        });
        break;
      case "discord":
        await authClient.signIn.social({
          provider: provider,
          callbackURL: "/onboarding",
          fetchOptions: {
            onSuccess() {
              console.log("Successfully signed in with Discord");
            },
          },
        });
        break;
      default:
        break;
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-start">
            <h2 className="text-3xl font-bold">Think it. Make it.</h2>
            <p className="text-white/75">Log in to your prexo account</p>
          </div>
          <div className="flex flex-col gap-3">
            <Button variant="outline" type="button" className="w-full cursor-pointer" onClick={() => handleAuth("google")}>
              <IconBrandGoogle />
              Continue with Google
            </Button>
            <Button variant="outline" type="button" className="w-full cursor-pointer" onClick={() => handleAuth("github")}>
              <IconBrandGithub />
              Continue with Github
            </Button>
            <Button variant="outline" type="button" className="w-full cursor-pointer" onClick={() => handleAuth("discord")}>
              <IconBrandDiscord />
              Continue with Discord
            </Button>
          </div>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"></div>
        </div>
      </form>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
