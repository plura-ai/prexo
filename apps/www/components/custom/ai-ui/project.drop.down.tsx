"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useProjectsStore } from "@prexo/store"

export function ProjectDropDownAiUi({ onProjectSelect }: { onProjectSelect: (value: string) => void }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const { projects } = useProjectsStore()

  React.useEffect(() => {
    if (value) {
      onProjectSelect(value)
    } else {
      onProjectSelect("")
    }
  }, [value, onProjectSelect])

  const proj = Array.isArray(projects)
    ? projects.map((project) => ({
        value: project.id as string,
        label: project.name as string,
      }))
    : []

  const selectedProject = proj.find((project) => project.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedProject ? selectedProject.label : "Select your project..."}
          <ChevronsUpDown className="opacity-50 ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search project..." className="h-9" />
          <CommandList>
            <CommandEmpty>No project found.</CommandEmpty>
            <CommandGroup>
              {proj.length > 0 &&
                proj.map((project) => (
                  <CommandItem
                    key={project.value}
                    value={project.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                    className="cursor-pointer"
                  >
                    <div className="flex w-full items-center justify-between">
                      <span className="truncate">{project.label}</span>
                      <Check
                        className={cn(
                          "ml-auto",
                          value === project.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </div>
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
