"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

// Particles are spawned per unit of canvas area so density stays constant
// across viewport sizes and browser zoom levels.
const AREA_PER_PARTICLE = 16000;
const MIN_PARTICLES = 32;
const MAX_PARTICLES = 150;
const LINK_DISTANCE = 130;
const MOUSE_RADIUS = 170;
const MOUSE_FORCE = 2.4;

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    const particles: Particle[] = [];
    let animationId = 0;
    let accentRgb = "109, 94, 248";

    const mouse = { x: -9999, y: -9999, active: false };

    const readAccent = () => {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim();
      if (raw) accentRgb = raw.split(/\s+/).join(", ");
    };
    readAccent();

    const themeObserver = new MutationObserver(readAccent);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const spawnParticle = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
    });

    const syncSize = () => {
      const parent = canvas.parentElement;
      const nextWidth = parent?.clientWidth ?? window.innerWidth;
      const nextHeight = parent?.clientHeight ?? window.innerHeight;
      if (nextWidth === 0 || nextHeight === 0) return;

      // Re-read on every sync: browser zoom changes devicePixelRatio, and a
      // ratio captured once at mount leaves the backing store mis-scaled.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      // Rescale existing particles so the field stretches with the canvas
      // instead of bunching up in the old bounds.
      if (width > 0 && height > 0) {
        const scaleX = nextWidth / width;
        const scaleY = nextHeight / height;
        for (const particle of particles) {
          particle.x *= scaleX;
          particle.y *= scaleY;
        }
      }

      width = nextWidth;
      height = nextHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.round(
        Math.min(Math.max((width * height) / AREA_PER_PARTICLE, MIN_PARTICLES), MAX_PARTICLES),
      );
      while (particles.length < target) particles.push(spawnParticle());
      if (particles.length > target) particles.length = target;

      for (const particle of particles) {
        particle.x = Math.min(Math.max(particle.x, 0), width);
        particle.y = Math.min(Math.max(particle.y, 0), height);
      }
    };

    syncSize();

    const resizeObserver = new ResizeObserver(syncSize);
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);
    // Catches DPI changes that don't alter the element's CSS box.
    window.addEventListener("resize", syncSize);

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      mouse.active = true;
    };

    // `mouseout` bubbles from every element, so only treat a null relatedTarget
    // (pointer genuinely leaving the window) as the cursor going away.
    const handleWindowOut = (event: MouseEvent) => {
      if (!event.relatedTarget) mouse.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseout", handleWindowOut);

    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x <= 0 || particle.x >= width) particle.vx *= -1;
        if (particle.y <= 0 || particle.y >= height) particle.vy *= -1;
        particle.x = Math.min(Math.max(particle.x, 0), width);
        particle.y = Math.min(Math.max(particle.y, 0), height);

        if (mouse.active) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < MOUSE_RADIUS && dist > 0.01) {
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
            particle.x += (dx / dist) * force * MOUSE_FORCE;
            particle.y += (dy / dist) * force * MOUSE_FORCE;
          }
        }
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < LINK_DISTANCE) {
            ctx.strokeStyle = `rgba(${accentRgb}, ${(1 - dist / LINK_DISTANCE) * 0.35})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        if (mouse.active) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < MOUSE_RADIUS) {
            ctx.strokeStyle = `rgba(${accentRgb}, ${(1 - dist / MOUSE_RADIUS) * 0.55})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      ctx.fillStyle = `rgba(${accentRgb}, 0.85)`;
      for (const particle of particles) {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("resize", syncSize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleWindowOut);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
