import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Button bileşeni varyant tipleri.
 */
export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    "bg-primary-600 text-white",
    "hover:bg-primary-700 active:bg-primary-800",
    "shadow-sm hover:shadow-md",
    "border border-transparent",
  ].join(" "),
  secondary: [
    "bg-secondary-500 text-white",
    "hover:bg-secondary-600 active:bg-secondary-700",
    "shadow-sm hover:shadow-md",
    "border border-transparent",
  ].join(" "),
  ghost: [
    "bg-transparent text-foreground",
    "hover:bg-neutral-100 active:bg-neutral-200",
    "dark:hover:bg-neutral-800 dark:active:bg-neutral-700",
    "border border-transparent",
  ].join(" "),
  outline: [
    "bg-transparent text-foreground",
    "border border-[var(--border)]",
    "hover:bg-neutral-50 hover:border-[var(--border-hover)]",
    "dark:hover:bg-neutral-900",
  ].join(" "),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs gap-1.5 rounded-lg",
  md: "h-10 px-5 text-sm gap-2 rounded-xl",
  lg: "h-12 px-7 text-base gap-2.5 rounded-xl",
  icon: "h-10 w-10 rounded-xl flex items-center justify-center p-0",
};

/**
 * Reusable Button bileşeni.
 * Varyantlar: primary, secondary, ghost, outline
 * Boyutlar: sm, md, lg, icon
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center font-medium",
          "transition-all duration-200 ease-out",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
          "disabled:opacity-50 disabled:pointer-events-none",
          "cursor-pointer select-none",
          "active:scale-[0.98]",
          // Variant & Size
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {!isLoading && leftIcon && (
          <span className="shrink-0">{leftIcon}</span>
        )}
        {children}
        {!isLoading && rightIcon && (
          <span className="shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
