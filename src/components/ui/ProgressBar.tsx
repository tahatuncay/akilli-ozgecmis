import { cn } from "@/lib/utils";

export interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
  showLabels?: boolean;
  labels?: string[];
}

export function ProgressBar({
  currentStep,
  totalSteps,
  className,
  showLabels = false,
  labels = [],
}: ProgressBarProps) {
  // Ensure currentStep is within valid bounds
  const safeCurrentStep = Math.max(1, Math.min(currentStep, totalSteps));
  
  // Calculate percentage
  const percentage = ((safeCurrentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className={cn("w-full flex flex-col gap-2", className)}>
      {/* Progress Bar Container */}
      <div className="relative h-2 w-full bg-[var(--background-tertiary)] rounded-full overflow-hidden">
        {/* Progress Fill */}
        <div
          className="absolute top-0 left-0 h-full bg-primary-500 rounded-full transition-all duration-500 ease-spring"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Step Indicators and Labels */}
      {showLabels && (
        <div className="flex justify-between items-center px-1">
          {Array.from({ length: totalSteps }).map((_, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < safeCurrentStep;
            const isActive = stepNumber === safeCurrentStep;

            return (
              <div
                key={stepNumber}
                className="flex flex-col items-center gap-1"
                style={{ width: `${100 / totalSteps}%` }}
              >
                <div
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium transition-colors duration-300",
                    isActive
                      ? "bg-primary-500 text-white shadow-sm"
                      : isCompleted
                      ? "bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300"
                      : "bg-[var(--background-tertiary)] text-[var(--foreground-muted)]"
                  )}
                >
                  {isCompleted ? (
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="3"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  ) : (
                    stepNumber
                  )}
                </div>
                {labels[index] && (
                  <span
                    className={cn(
                      "text-[10px] text-center hidden sm:block",
                      isActive ? "text-primary-600 font-medium" : "text-[var(--foreground-muted)]"
                    )}
                  >
                    {labels[index]}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
