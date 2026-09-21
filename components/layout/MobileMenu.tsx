"use client";

import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "@/lib/data";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  activeHref: string;
}

export default function MobileMenu({ open, onClose, activeHref }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm lg:hidden"
        >
          <motion.nav
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-full flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`min-h-[44px] text-2xl font-heading font-semibold transition-colors ${
                  activeHref === link.href ? "text-accent" : "text-foreground"
                }`}
              >
                {link.label}
              </a>
            ))}
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
