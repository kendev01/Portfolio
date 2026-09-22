"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Sheen from "@/components/ui/Sheen";
import { personalInfo } from "@/lib/data";
import { staggerContainer, fadeUp, hoverSurface, HOVER_TRANSITION } from "@/lib/constants";
import { motion } from "framer-motion";

const stats = [
  { label: "Production Experience", value: "3+ Yr" },
  { label: "Core Systems Delivered", value: "8+" },
  { label: "Databases Optimized", value: "MySQL / MSSQL" },
];

const statCard = hoverSurface(-4, 1.03);

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
          viewport={{ once: false, amount: 0.3 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp}>
              <motion.div
                initial="rest"
                animate="rest"
                whileHover="hover"
                variants={statCard}
                transition={HOVER_TRANSITION}
                className="relative overflow-hidden rounded-2xl border p-5"
              >
                <Sheen />
                <p className="relative font-heading text-2xl font-bold text-accent">
                  {stat.value}
                </p>
                <p className="relative mt-1 text-sm text-muted">{stat.label}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
