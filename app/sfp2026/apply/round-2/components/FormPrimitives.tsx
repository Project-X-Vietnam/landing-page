"use client";

import { cn } from "@/lib/utils";

export function FormField({
  label,
  description,
  required,
  children,
  className,
}: {
  label: string;
  description?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {description && (
        <p className="text-xs text-slate-400 mb-1.5 leading-relaxed">{description}</p>
      )}
      {children}
    </div>
  );
}

export function FormInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-slate-900 text-sm",
        "placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all",
        props.className
      )}
    />
  );
}

export function FormTextarea({
  maxWords,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { maxWords?: number }) {
  const value = typeof props.value === "string" ? props.value : "";
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
  return (
    <div className="relative">
      <textarea
        {...props}
        className={cn(
          "w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-slate-900 text-sm",
          "placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-y",
          props.className
        )}
      />
      {maxWords && (
        <p
          className={cn(
            "text-xs mt-1",
            wordCount > maxWords ? "text-red-500" : "text-slate-400"
          )}
        >
          {wordCount}/{maxWords} words
        </p>
      )}
    </div>
  );
}
