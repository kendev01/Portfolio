"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { hoverSurface, HOVER_TRANSITION } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Sheen from "./Sheen";

interface CardProps {
  children: ReactNode;
  className?: string;
}

const card = hoverSurface();

export default function Card({ children, className }: CardProps) {
  return (
    <motion.div
      initial="rest"
      animate="rest"
      whileHover="hover"
      variants={card}
      transition={HOVER_TRANSITION}
      className={cn(
        "relative overflow-hidden rounded-2xl border p-6 shadow-sm",
        className,
      )}
    >
      <Sheen />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
