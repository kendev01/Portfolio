import type { Variants } from "framer-motion";

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const DURATION = 0.6;
export const STAGGER = 0.1;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION, ease: EASE_OUT },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION, ease: EASE_OUT },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: EASE_OUT },
  },
};

export const staggerContainer = (stagger = STAGGER, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

/**
 * Shared hover treatment for interactive surfaces (skill pills, cards,
 * timeline entries, contact links). Drive it with
 * `initial="rest" animate="rest" whileHover="hover"` — the "hover" state
 * propagates to descendant motion elements using `hoverIcon` / `hoverSheen`.
 */
export const hoverSurface = (lift = -6, scale = 1.02): Variants => ({
  rest: {
    y: 0,
    scale: 1,
    borderColor: "rgb(var(--border))",
    backgroundColor: "rgb(var(--surface))",
    boxShadow: "0 0 0 0 rgb(var(--accent) / 0)",
  },
  hover: {
    y: lift,
    scale,
    borderColor: "rgb(var(--accent))",
    backgroundColor: "rgb(var(--surface-hover))",
    boxShadow: "0 12px 30px -12px rgb(var(--accent) / 0.55)",
  },
});

export const HOVER_TRANSITION = { duration: 0.25, ease: EASE_OUT };

export const hoverIcon: Variants = {
  rest: { scale: 1, rotate: 0, color: "rgb(var(--accent))" },
  hover: { scale: 1.2, rotate: -8, color: "rgb(var(--accent-hover))" },
};

export const hoverSheen: Variants = {
  rest: { x: "-150%", opacity: 0 },
  hover: { x: "150%", opacity: 1 },
};
