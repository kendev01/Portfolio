"use client";

import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import TimelineItem from "@/components/ui/TimelineItem";
import { experience } from "@/lib/data";

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.6"],
  });

  return (
    <SectionWrapper id="experience">
      <SectionHeading eyebrow="Experience" title="Where I've worked" />

      <div ref={containerRef} className="relative mt-10">
        <div className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-0.5 bg-border" />
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-0.5 origin-top bg-accent"
        />

        <div className="space-y-0">
          {experience.map((item, index) => (
            <TimelineItem
              key={item.company}
              item={item}
              isLast={index === experience.length - 1}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
