"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import SkillPill from "@/components/ui/SkillPill";
import { skills } from "@/lib/data";
import { staggerContainer } from "@/lib/constants";
import type { SkillCategory } from "@/lib/types";

const categories: SkillCategory[] = ["Frontend", "Backend", "Databases", "Tools & DevOps"];

export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <SectionHeading eyebrow="Skills" title="Tools & technologies I work with" />

      <div className="mt-10 space-y-10">
        {categories.map((category) => {
          const items = skills.filter((skill) => skill.category === category);
          if (items.length === 0) return null;

          return (
            <div key={category}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
                {category}
              </h3>
              <motion.div
                variants={staggerContainer(0.05)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                className="flex flex-wrap gap-3"
              >
                {items.map((skill) => (
                  <SkillPill key={skill.name} name={skill.name} icon={skill.icon} />
                ))}
              </motion.div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
