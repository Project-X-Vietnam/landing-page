"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface DatePickerFieldProps {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}

export function DatePickerField({
  value,
  onChange,
  placeholder,
}: DatePickerFieldProps) {
  const [open, setOpen] = useState(false);
  const dateValue = value ? new Date(value) : undefined;
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
          <span>
            {value ? format(new Date(value), "MMMM d, yyyy") : placeholder}
          </span>
          <CalendarIcon className="w-4 h-4 shrink-0 text-slate-400 ml-2" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 bg-white border border-slate-200 shadow-md"
        align="start"
      >
        <Calendar
          mode="single"
          selected={dateValue}
          onSelect={(date) => {
            if (date) {
              onChange(format(date, "yyyy-MM-dd"));
              setOpen(false);
            }
          }}
          defaultMonth={new Date(2026, 5)}
          fromDate={new Date(2026, 4, 1)}
          toDate={new Date(2027, 0, 31)}
        />
      </PopoverContent>
    </Popover>
  );
}
