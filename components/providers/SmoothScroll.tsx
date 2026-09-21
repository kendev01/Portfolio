"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      touchMultiplier: 1.2,
      // This site deliberately overrides the OS's reduced-motion preference
      // for input-driven effects (see CLAUDE.md) — Lenis's own internal
      // prefersReducedMotion check would otherwise force every scroll to be
      // instant, which defeats the entire point of adding it.
      respectReducedMotion: false,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Route in-page hash links (nav, mobile menu, footer, hero arrow)
    // through Lenis so anchor jumps ease at the same rate as wheel/trackpad
    // scrolling, instead of the browser's native (and inconsistent) smooth
    // scroll. Runs on the bubble phase so existing onClick handlers (e.g.
    // MobileMenu closing itself) still fire first.
    const handleClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;

      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      // No manual offset here: Lenis already reads the target's
      // `scroll-margin-top` (the `scroll-mt-24` on SectionWrapper) and
      // subtracts it internally — adding our own on top double-counts it.
      lenis.scrollTo(target as HTMLElement);
    };
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
