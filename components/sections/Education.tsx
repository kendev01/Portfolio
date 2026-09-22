"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { education } from "@/lib/data";
import { staggerContainer, fadeUp, hoverIcon } from "@/lib/constants";

export default function Education() {
  return (
    <SectionWrapper id="education">
      <SectionHeading eyebrow="Education" title="Academic background" />

      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {education.map((item) => (
          <motion.div key={item.school} variants={fadeUp}>
            <Card className="h-full">
              <motion.div
                variants={hoverIcon}
                transition={{ type: "spring", stiffness: 400, damping: 14 }}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10"
              >
                <GraduationCap size={20} />
              </motion.div>
              <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-wider text-muted">
                {item.period}
              </span>
              <h3 className="mt-2 font-heading text-lg font-bold">{item.degree}</h3>
              <p className="mt-1 text-sm text-muted">{item.school}</p>
              {item.detail && (
                <p className="mt-3 text-sm font-medium text-accent">{item.detail}</p>
              )}
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
