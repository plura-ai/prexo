import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="sticky z-[300] border-t-2 bg-secondary/30 backdrop-blur-lg px-8 md:px-12 overflow-hidden w-full">
      <div className="absolute bottom-0 left-[-30%] right-0 top-[-30%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(211,211,211,0.15),rgba(255,255,255,0))] opacity-40" />
      <div className="flex flex-col items-start gap-2 sm:px-8 lg:px-20 py-8">
        <Link href="/" className="flex flex-row items-center gap-2">
          <Image
            src="/favicon.ico"
            alt="logo"
            width={30}
            height={30}
            className="rounded-md"
          />
          <p className="font-bold text-xl tracking-tighter">Prexo Ai</p>
          <Badge variant={"outline"} className="px-2">
            Beta
          </Badge>
        </Link>
        <p className="text-muted-foreground text-sm max-w-lg">
          My owner is really the sexiest one, Believe me or not he is. Just never try to mess with him somehow!
        </p>

        <div className="flex flex-col">
          <p className="inline-flex text-secondary-foreground text-sm">
            A product by
            <Link
              href={"https://dub.sh/saidev-twitter"}
              target="_blank"
              rel="noreferrer"
              className="ml-1 text-muted-foreground underline cursor-pointer"
            >
              @SaidevDhal
            </Link>
          </p>
        </div>

        <div className="border-t w-full mt-10">
          <div className="grid grid-cols-3 md:grid-cols-4 my-5 gap-20">
            <div className="flex flex-col gap-3">
              <span className="font-semibold">Product</span>
              <Link
                href={"/about"}
                className="text-muted-foreground hover:text-primary"
              >
                About
              </Link>
              <Link
                href={"/features"}
                className="text-muted-foreground hover:text-primary"
              >
                Features
              </Link>
              <Link
                href={"/integrations"}
                className="text-muted-foreground hover:text-primary"
              >
                Integrations
              </Link>
              <Link
                href={"/pricing"}
                className="text-muted-foreground hover:text-primary"
              >
                Pricing
              </Link>
              <Link
                href={"https://status.plura.pro/"}
                className="text-muted-foreground hover:text-primary"
              >
                Status
              </Link>
              <Link
                href={"/support"}
                className="text-muted-foreground hover:text-primary"
              >
                Support
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <span className="font-semibold">Connect</span>
              <Link
                href={"/features"}
                className="text-muted-foreground hover:text-primary"
              >
                X (Twitter)
              </Link>
              <Link
                href={"/contact"}
                className="text-muted-foreground hover:text-primary"
              >
                Contact
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <span className="font-semibold">Legal</span>
              <Link
                href={"/privacy-policy"}
                className="text-muted-foreground hover:text-primary"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
