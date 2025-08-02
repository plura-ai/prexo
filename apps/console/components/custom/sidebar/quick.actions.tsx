"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type QuickActionButtonProps = {
  collapse: "expanded" | "collapsed";
};

const QuickActionButton: React.FC<QuickActionButtonProps> = ({ collapse }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOverlay = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex w-full items-center justify-center">
      {collapse === "expanded" && (
        <Button
          onClick={toggleOverlay}
          size={"sm"}
          className="w-full flex items-center justify-center cursor-pointer"
        >
          Quick Actions
          <Badge
            className="rounded-md text-xs gap-1 font-semibold hover:bg-secondary"
            variant={"secondary"}
          >
            <span className="text-xs">⌘</span>K
          </Badge>
        </Button>
      )}

      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default QuickActionButton;
