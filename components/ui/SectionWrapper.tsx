import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export default function SectionWrapper({ id, children, className }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn("relative mx-auto max-w-6xl scroll-mt-24 px-6 py-24 sm:px-8 lg:px-12", className)}
    >
      {children}
    </section>
  );
}
