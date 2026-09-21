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

const TILT_SPRING = { stiffness: 160, damping: 18, mass: 0.5 };

export default function TiltPhotoCard() {
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  const smoothX = useSpring(pointerX, TILT_SPRING);
  const smoothY = useSpring(pointerY, TILT_SPRING);

  // Deeper tilt range + a tighter perspective for a more dramatic 3D effect.
  const rotateX = useTransform(smoothY, [0, 1], [18, -18]);
  const rotateY = useTransform(smoothX, [0, 1], [-22, 22]);

  // Near layer: the photo pops toward the viewer (translateZ) and drifts
  // opposite the cursor, separating it from the card plane as it rotates.
  // Kept small since the photo is no longer oversized/cropped, so there's
  // no overscan margin to hide the shift within.
  const photoX = useTransform(smoothX, [0, 1], [5, -5]);
  const photoY = useTransform(smoothY, [0, 1], [5, -5]);

  // Far layer: the smoke haze drifts toward the cursor, so it reads as
  // sitting further back than the photo — the two layers moving at
  // different rates is what sells the depth.
  const smokeX = useTransform(smoothX, [0, 1], [-16, 16]);
  const smokeY = useTransform(smoothY, [0, 1], [-12, 12]);

  const glareLeft = useTransform(smoothX, [0, 1], ["0%", "100%"]);
  const glareTop = useTransform(smoothY, [0, 1], ["0%", "100%"]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareLeft} ${glareTop}, rgba(255,255,255,0.22), transparent 55%)`;

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
    <div className="relative mx-auto w-full max-w-[300px]">
      <motion.div
        aria-hidden
        style={{ x: smokeX, y: smokeY }}
        className="pointer-events-none absolute -inset-20"
      >
        <div className="smoke-wisp animate-smoke-1 left-[2%] top-[8%] h-56 w-56 bg-accent/55" />
        <div className="smoke-wisp animate-smoke-2 right-[0%] top-[28%] h-64 w-64 bg-cyan-400/45" />
        <div className="smoke-wisp animate-smoke-3 bottom-[4%] left-[16%] h-60 w-60 bg-emerald-400/40" />
      </motion.div>

      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformPerspective: 700, transformStyle: "preserve-3d" }}
        className="relative z-10 aspect-square overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-black/40"
      >
        <motion.div
          style={{ x: photoX, y: photoY, translateZ: 24 }}
          className="absolute inset-0"
        >
          <Image
            src="/profile.jpg"
            alt={personalInfo.name}
            fill
            priority
            sizes="(max-width: 640px) 80vw, 300px"
            className="object-contain"
          />
        </motion.div>
        <motion.div
          aria-hidden
          style={{ background: glare }}
          className="absolute inset-0 mix-blend-soft-light"
        />
      </motion.div>
    </div>
  );
}
