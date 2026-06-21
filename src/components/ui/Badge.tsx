import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "outline";

export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  removable?: boolean;
  onRemove?: () => void;
}

const variantClasses: Record<BadgeVariant, string> = {
  default:
    "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
  primary:
    "bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300",
  secondary:
    "bg-secondary-100 text-secondary-700 dark:bg-secondary-900/50 dark:text-secondary-300",
  accent:
    "bg-accent-100 text-accent-700 dark:bg-accent-900/50 dark:text-accent-300",
  success:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
  warning:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
  error:
    "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
  outline:
    "bg-transparent border border-[var(--border)] text-[var(--foreground-secondary)]",
};

const dotColors: Record<BadgeVariant, string> = {
  default: "bg-neutral-500",
  primary: "bg-primary-500",
  secondary: "bg-secondary-500",
  accent: "bg-accent-500",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  error: "bg-red-500",
  outline: "bg-[var(--foreground-muted)]",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-2.5 py-1 text-xs",
  lg: "px-3 py-1.5 text-sm",
};

/**
 * Reusable Badge bileşeni.
 * Varyantlar: default, primary, secondary, accent, success, warning, error, outline
 * Boyutlar: sm, md, lg
 * Opsiyonel: dot göstergesi, kaldırma butonu
 */
const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      dot = false,
      removable = false,
      onRemove,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          // Base
          "inline-flex items-center gap-1.5 font-medium rounded-full",
          "transition-colors duration-150",
          "whitespace-nowrap select-none",
          // Variant & Size
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full shrink-0",
              dotColors[variant],
            )}
            aria-hidden="true"
          />
        )}
        {children}
        {removable && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.();
            }}
            className={cn(
              "ml-0.5 -mr-1 h-4 w-4 rounded-full shrink-0",
              "inline-flex items-center justify-center",
              "hover:bg-black/10 dark:hover:bg-white/10",
              "transition-colors duration-150",
              "cursor-pointer",
            )}
            aria-label="Kaldır"
          >
            <svg
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </span>
    );
  },
);

Badge.displayName = "Badge";

export { Badge };
