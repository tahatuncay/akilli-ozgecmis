import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export type CardVariant = "default" | "elevated" | "glass" | "outlined";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  hoverable?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const variantClasses: Record<CardVariant, string> = {
  default: [
    "bg-[var(--surface)] border border-[var(--border)]",
    "shadow-sm",
  ].join(" "),
  elevated: [
    "bg-[var(--surface-elevated)]",
    "shadow-md border border-transparent",
  ].join(" "),
  glass: [
    "backdrop-blur-xl",
    "bg-[var(--glass-bg)] border border-[var(--glass-border)]",
    "shadow-lg",
  ].join(" "),
  outlined: [
    "bg-transparent border-2 border-[var(--border)]",
  ].join(" "),
};

const paddingClasses: Record<NonNullable<CardProps["padding"]>, string> = {
  none: "p-0",
  sm: "p-5",
  md: "p-8",
  lg: "p-10",
};

/**
 * Reusable Card bileşeni.
 * Varyantlar: default, elevated, glass, outlined
 * Hover efekti opsiyonel olarak eklenebilir.
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "default",
      hoverable = false,
      padding = "md",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base
          "rounded-2xl",
          "transition-all duration-300 ease-out",
          // Variant
          variantClasses[variant],
          // Padding
          paddingClasses[padding],
          // Hover
          hoverable && [
            "hover:shadow-lg hover:-translate-y-0.5",
            "hover:border-[var(--border-hover)]",
            "cursor-pointer",
          ],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

/**
 * Card Header alt bileşeni
 */
const CardHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1.5 pb-4", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

/**
 * Card Title alt bileşeni
 */
const CardTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-tight tracking-tight text-foreground",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

/**
 * Card Description alt bileşeni
 */
const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-[var(--foreground-secondary)]", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

/**
 * Card Content alt bileşeni
 */
const CardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
CardContent.displayName = "CardContent";

/**
 * Card Footer alt bileşeni
 */
const CardFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center gap-3 pt-4 border-t border-[var(--border)]",
      className,
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
