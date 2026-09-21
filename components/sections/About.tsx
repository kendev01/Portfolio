"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { personalInfo } from "@/lib/data";
import { staggerContainer, fadeUp } from "@/lib/constants";
import { motion } from "framer-motion";

const stats = [
  { label: "Production Experience", value: "1+ Yr" },
  { label: "Core Systems Delivered", value: "8+" },
  { label: "Databases Optimized", value: "MySQL / MSSQL" },
];

export default function About() {
  return (
    <SectionWrapper id="about">
      <SectionHeading eyebrow="About Me" title="A bit about my journey" />

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.4fr,1fr]">
        <Reveal delay={0.1}>
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            {personalInfo.summary}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {personalInfo.languages.map((lang) => (
              <span
                key={lang}
                className="rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-muted"
              >
                {lang}
              </span>
            ))}
          </div>
        </Reveal>

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="rounded-2xl border border-border bg-surface p-5"
            >
              <p className="font-heading text-2xl font-bold text-accent">{stat.value}</p>
              <p className="mt-1 text-sm text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
