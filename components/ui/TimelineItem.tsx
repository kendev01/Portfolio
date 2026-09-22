"use client";

import { motion } from "framer-motion";
import { hoverSurface, HOVER_TRANSITION } from "@/lib/constants";
import type { ExperienceItem } from "@/lib/types";
import Sheen from "./Sheen";

interface TimelineItemProps {
  item: ExperienceItem;
  isLast: boolean;
}

// Wide blocks, so a gentler lift than the pills get.
const block = hoverSurface(-4, 1.01);

export default function TimelineItem({ item, isLast }: TimelineItemProps) {
  return (
    <div className={`relative flex gap-6 pl-2 ${isLast ? "" : "pb-14"}`}>
      <div className="relative flex w-4 shrink-0 justify-center">
        <motion.span
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="z-10 mt-1.5 h-4 w-4 shrink-0 rounded-full bg-accent ring-4 ring-accent/20"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="-mt-1.5 flex-1"
      >
        <motion.div
          initial="rest"
          animate="rest"
          whileHover="hover"
          variants={block}
          transition={HOVER_TRANSITION}
          className="relative overflow-hidden rounded-2xl border p-6"
        >
          <Sheen />

          <div className="relative">
            <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              {item.period}
            </span>
            <h3 className="mt-3 font-heading text-xl font-bold">{item.role}</h3>
            <p className="text-sm font-medium text-muted">{item.company}</p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {item.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
