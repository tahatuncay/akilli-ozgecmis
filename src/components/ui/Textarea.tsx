import { type TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  charCount?: boolean;
  maxLength?: number;
}

/**
 * Reusable Textarea bileşeni.
 * Label, error, hint ve karakter sayacı desteği.
 */
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      hint,
      charCount = false,
      maxLength,
      id,
      value,
      ...props
    },
    ref,
  ) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const currentLength =
      typeof value === "string" ? value.length : 0;

    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          value={value}
          maxLength={maxLength}
          className={cn(
            // Base
            "w-full rounded-xl px-4 py-3 text-sm min-h-[120px] resize-y",
            "bg-[var(--surface)] text-foreground",
            "border-2 border-[var(--border)]",
            // Placeholder
            "placeholder:text-[var(--foreground-muted)]",
            // Hover & Focus
            "hover:border-[var(--border-hover)]",
            "focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500",
            // Transition
            "transition-all duration-200 ease-out",
            // Disabled
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--background-tertiary)]",
            // Error
            error &&
              "border-error focus:ring-error/30 focus:border-error",
            className,
          )}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={
            error
              ? `${textareaId}-error`
              : hint
                ? `${textareaId}-hint`
                : undefined
          }
          {...props}
        />
        <div className="flex items-center justify-between">
          <div>
            {error && (
              <p
                id={`${textareaId}-error`}
                className="text-xs text-error flex items-center gap-1"
                role="alert"
              >
                <svg
                  className="h-3.5 w-3.5 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </p>
            )}
            {!error && hint && (
              <p
                id={`${textareaId}-hint`}
                className="text-xs text-[var(--foreground-muted)]"
              >
                {hint}
              </p>
            )}
          </div>
          {charCount && maxLength && (
            <span
              className={cn(
                "text-xs tabular-nums",
                currentLength >= maxLength
                  ? "text-error"
                  : "text-[var(--foreground-muted)]",
              )}
            >
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea };
