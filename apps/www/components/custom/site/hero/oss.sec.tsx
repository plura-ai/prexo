import React from "react";
import {
  SectionHeader,
  SectionHeaderHeading,
  SectionHeaderDescription,
} from "../../text-wrappers";
import { WarpBackground } from "../../warp-background";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/constants/icons";
import Link from "next/link";
import { socials } from "@prexo/utils/constants";

export default function OssSec() {
  return (
    <div className="relative w-full items-center justify-center py-10">
      <div className="px-8 md:px-14">
        <SectionHeader className="flex flex-col z-50 mb-10">
          <SectionHeaderHeading>We believe in Open Source</SectionHeaderHeading>
          <SectionHeaderDescription>
            Our platform is built on open-source principles, allowing you to
            customize and extend the functionality to suit your needs. Join our
            community and contribute to the future of AI-powered sales and
            support.
          </SectionHeaderDescription>
        </SectionHeader>

        <WarpBackground>
          <div className="grid grid-cols-1 px-8 md:px-14 max-w-7xl mx-auto md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="flex flex-col items-start gap-2">
                <CardTitle>GitHub</CardTitle>
                <CardDescription>
                  It helps us grow and reach more developers like you. Your
                  support means a lot to us and encourages us to keep improving
                  the platform.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link href={socials.github} target="_blank" rel="noreferrer">
                  <Button>
                    <Icons.gitHub className="size-4 mr-2" />
                    Star us on GitHub
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-start gap-2">
                <CardTitle>Discord</CardTitle>
                <CardDescription>
                  Join our Discord community to connect with other developers,
                  share your experiences, and get help with any issues you
                  encounter.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link href={socials.discord} target="_blank" rel="noreferrer">
                  <Button>
                    <Icons.discord className="size-4 mr-2" />
                    Join us on Discord
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-start gap-2">
                <CardTitle>Twitter</CardTitle>
                <CardDescription>
                  Follow us on Twitter for the latest updates, news, and
                  announcements. Stay connected with our community and share
                  your thoughts with us.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link href={socials.x} target="_blank" rel="noreferrer">
                  <Button>
                    <Icons.twitter className="size-4 mr-2" />
                    Follow us on Twitter
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </WarpBackground>
      </div>
    </div>
  );
}
