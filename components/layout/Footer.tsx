"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { personalInfo } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-8 text-center sm:flex-row sm:justify-between sm:px-8 sm:text-left lg:px-12">
        <p className="text-sm text-muted">
          © {year} {personalInfo.name}. All rights reserved.
        </p>
        <motion.a
          href="#home"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
        >
          Back to top
          <ArrowUp size={14} />
        </motion.a>
      </div>
    </footer>
  );
}
