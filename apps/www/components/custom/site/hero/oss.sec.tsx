import React from "react";
import {
  SectionHeader,
  SectionHeaderHeading,
  SectionHeaderDescription,
} from "../../text-wrappers";


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
      </div>
    </div>
  );
}
