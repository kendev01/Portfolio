"use client";

import { motion } from "framer-motion";
import { hoverSheen } from "@/lib/constants";

/** Light sweep for hover surfaces. The parent must be `overflow-hidden`. */
export default function Sheen() {
  return (
    <motion.span
      aria-hidden
      variants={hoverSheen}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-accent/25 to-transparent"
    />
  );
}
