"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import type { MouseEvent } from "react";
import { personalInfo } from "@/lib/data";

const SPRING = { stiffness: 150, damping: 20, mass: 0.4 };

export default function PhotoSpotlight() {
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  const smoothX = useSpring(pointerX, SPRING);
  const smoothY = useSpring(pointerY, SPRING);

  // The cutout has no card edges to sell a rotating-plane illusion, so
  // instead of a 3D tilt, the cursor drives a soft light that follows it —
  // it highlights the person rather than distorting them.
  const spotX = useTransform(smoothX, [0, 1], ["15%", "85%"]);
  const spotY = useTransform(smoothY, [0, 1], ["10%", "70%"]);
  const spotlight = useMotionTemplate`radial-gradient(circle at ${spotX} ${spotY}, rgb(var(--accent) / 0.6), transparent 62%)`;

  // A small 2D drift for a touch of depth, not a rotation.
  const photoX = useTransform(smoothX, [0, 1], [-8, 8]);
  const photoY = useTransform(smoothY, [0, 1], [-6, 6]);

  const smokeX = useTransform(smoothX, [0, 1], [-14, 14]);
  const smokeY = useTransform(smoothY, [0, 1], [-10, 10]);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width);
    pointerY.set((event.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative mx-auto flex w-full max-w-sm justify-center py-6"
    >
      <motion.div
        aria-hidden
        style={{ x: smokeX, y: smokeY }}
        className="pointer-events-none absolute -inset-16"
      >
        <div className="smoke-wisp animate-smoke-1 left-[4%] top-[6%] h-56 w-56 bg-accent/45" />
        <div className="smoke-wisp animate-smoke-2 right-[0%] top-[26%] h-64 w-64 bg-violet-400/35" />
        <div className="smoke-wisp animate-smoke-3 bottom-[6%] left-[14%] h-60 w-60 bg-fuchsia-400/25" />
      </motion.div>

      <motion.div
        aria-hidden
        style={{ background: spotlight }}
        className="pointer-events-none absolute -inset-10 blur-2xl"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-2 h-10 w-2/3 rounded-full bg-black/45 blur-2xl"
      />

      <motion.div style={{ x: photoX, y: photoY }} className="relative z-10">
        <Image
          src="/profile-cutout.png"
          alt={personalInfo.name}
          width={797}
          height={1024}
          priority
          sizes="(max-width: 640px) 70vw, 340px"
          className="fade-bottom h-auto max-h-[440px] w-auto drop-shadow-2xl"
        />
      </motion.div>
    </div>
  );
}
