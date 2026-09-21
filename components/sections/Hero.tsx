"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Mail } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { staggerContainer, fadeUp, scaleIn } from "@/lib/constants";
import AnimatedButton from "@/components/ui/AnimatedButton";
import Magnetic from "@/components/ui/Magnetic";
import ParticleNetwork from "@/components/ui/ParticleNetwork";
import TiltPhotoCard from "@/components/ui/TiltPhotoCard";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20"
    >
      <ParticleNetwork />

      <motion.div
        variants={staggerContainer(0.12, 0.1)}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-6 sm:px-8 lg:grid-cols-[1.15fr,0.85fr] lg:px-12"
      >
        <div>
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-1.5 text-sm font-medium text-muted backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Available for new opportunities
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-6 font-heading text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl"
          >
            I&apos;m {personalInfo.firstName}
            <br />
            <span className="text-gradient">{personalInfo.title}</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-base text-muted sm:text-lg">
            I build scalable full-stack web systems and keep production databases fast,
            clean, and reliable.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-4">
            <Magnetic>
              <AnimatedButton href="#contact" variant="primary">
                <Mail size={16} />
                Contact Me
              </AnimatedButton>
            </Magnetic>
            <Magnetic>
              <AnimatedButton href="/resume.pdf" variant="secondary" download>
                <Download size={16} />
                Download CV
              </AnimatedButton>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div variants={scaleIn}>
          <TiltPhotoCard />
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 text-muted transition-colors hover:text-accent sm:block"
      >
        <ArrowDown size={22} />
      </motion.a>
    </section>
  );
}
