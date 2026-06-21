import { type ClassValue, clsx } from "clsx";

/**
 * Utility function to merge Tailwind CSS class names.
 * Uses clsx for conditional class joining.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
