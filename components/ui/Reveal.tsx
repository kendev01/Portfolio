"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp } from "@/lib/constants";

interface RevealProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  amount?: number;
  delay?: number;
}

export default function Reveal({
  children,
  variants = fadeUp,
  className,
  amount = 0.25,
  delay = 0,
}: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
