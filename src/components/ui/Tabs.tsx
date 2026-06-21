import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
  className?: string;
  onTabChange?: (tabId: string) => void;
}

export function Tabs({ tabs, defaultTabId, className, onTabChange }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTabId || tabs[0]?.id);

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    if (onTabChange) {
      onTabChange(id);
    }
  };

  return (
    <div className={cn("flex flex-col w-full", className)}>
      <div className="flex space-x-1 rounded-xl bg-[var(--background-tertiary)] p-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-1 focus:ring-offset-[var(--background-tertiary)]",
                isActive
                  ? "bg-[var(--surface)] text-foreground shadow-sm"
                  : "text-[var(--foreground-muted)] hover:bg-[var(--surface-overlay)] hover:text-foreground"
              )}
              aria-selected={isActive}
              role="tab"
            >
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="mt-4 ring-offset-[var(--background-tertiary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={cn(
              "transition-opacity duration-300 animate-fade-in",
              activeTab === tab.id ? "block" : "hidden"
            )}
            role="tabpanel"
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
