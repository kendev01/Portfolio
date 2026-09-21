"use client";

import { motion } from "framer-motion";
import { fadeUp, hoverIcon, hoverSurface, HOVER_TRANSITION } from "@/lib/constants";
import { getIcon } from "./icon-map";
import Sheen from "./Sheen";

interface SkillPillProps {
  name: string;
  icon: string;
}

const pill = hoverSurface(-5, 1.05);

export default function SkillPill({ name, icon }: SkillPillProps) {
  const Icon = getIcon(icon);

  return (
    <motion.div variants={fadeUp}>
      <motion.div
        initial="rest"
        animate="rest"
        whileHover="hover"
        variants={pill}
        transition={HOVER_TRANSITION}
        className="relative flex cursor-default items-center gap-2 overflow-hidden rounded-full border px-4 py-2 text-sm font-medium text-foreground"
      >
        <Sheen />

        {Icon && (
          <motion.span
            variants={hoverIcon}
            transition={{ type: "spring", stiffness: 400, damping: 14 }}
            className="relative"
          >
            <Icon size={16} />
          </motion.span>
        )}
        <span className="relative">{name}</span>
      </motion.div>
    </motion.div>
  );
}
