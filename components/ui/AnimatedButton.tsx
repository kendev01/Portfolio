"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends HTMLMotionProps<"a"> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export default function AnimatedButton({
  children,
  variant = "primary",
  className,
  ...props
}: AnimatedButtonProps) {
  return (
    <motion.a
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200",
        variant === "primary"
          ? "bg-accent text-accent-foreground hover:bg-accent-hover"
          : "border border-border bg-surface text-foreground hover:bg-surface-hover",
        className,
      )}
      {...props}
    >
      {children}
    </motion.a>
  );
}
