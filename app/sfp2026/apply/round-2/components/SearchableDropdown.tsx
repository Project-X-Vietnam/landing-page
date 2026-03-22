"use client";

import { useState } from "react";
import { ChevronsUpDown, Check } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface SearchableDropdownProps {
  value: string;
  onChange: (v: string) => void;
  groups: { label: string; options: string[] }[];
  placeholder: string;
}

export function SearchableDropdown({
  value,
  onChange,
  groups,
  placeholder,
}: SearchableDropdownProps) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm transition-all",
            "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
            value ? "text-slate-900" : "text-slate-400"
          )}
        >
          <span className="truncate">{value || placeholder}</span>
          <ChevronsUpDown className="w-4 h-4 shrink-0 text-slate-400 ml-2" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0 bg-white border border-slate-200 shadow-md [&_input]:outline-none [&_input]:ring-0 [&_input]:shadow-none"
        align="start"
        side="bottom"
        sideOffset={4}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Command
          filter={(itemValue, search) =>
            itemValue === "Others" ? 1 : (itemValue.toLowerCase().includes(search.toLowerCase()) ? 1 : 0)
          }
        >
          <CommandInput
            placeholder="Search university..."
            className="focus:outline-none focus:ring-0 focus:border-0 border-0 outline-none"
          />
          <CommandList className="max-h-60 overflow-y-auto">
            <CommandEmpty>No university found.</CommandEmpty>
            {groups.map((group) => (
              <CommandGroup key={group.label} heading={group.label}>
                {group.options.map((option) => (
                  <CommandItem
                    key={option}
                    value={option}
                    onSelect={() => {
                      onChange(option);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn("mr-2 h-4 w-4", value === option ? "opacity-100" : "opacity-0")}
                    />
                    {option}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
