"use client";

import { ReactNode } from "react";
import { CVProvider } from "@/context/CVContext";

export function Providers({ children }: { children: ReactNode }) {
  return <CVProvider>{children}</CVProvider>;
}
