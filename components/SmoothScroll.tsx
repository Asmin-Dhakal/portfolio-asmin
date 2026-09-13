"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const firstLoad = useRef(true);

  // Pinned Work section links (#work and #work-head) share one landing.
  const isWorkHash = (hash: string | null) =>
    hash === "#work" || hash === "#work-head";

  // Snappy easing for anchor jumps so they actually arrive (the free
  // lerp tail feels endless and stops short).
  const JUMP = {
    duration: 1.4,
    easing: (t: number) => 1 - Math.pow(1 - t, 4),
  } as const;

  // With the header decoupled from the track, its position is stable
  // the moment the section pins — one glide is enough.
  const landOnWork = () => {
    const lenis = lenisRef.current;
    const el = document.querySelector("#work-head") ?? document.querySelector("#work");
    if (!lenis || !el) return;
    lenis.scrollTo(el as HTMLElement, { offset: 0, ...JUMP });
  };

  // Init Lenis once
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.075, wheelMultiplier: 0.95 });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Smooth same-page anchor clicks via Lenis.
    // #work is a pinned section: land exactly on it, otherwise clear the navbar.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute("href");
      if (!hash || hash.length < 2) return;
      // Only handle anchors on the home page sections
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      if (isWorkHash(hash)) landOnWork();
      else lenis.scrollTo(el as HTMLElement, { offset: -70, ...JUMP });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // On route change only (never on reload): project pages jump to top
  // instantly, /#work lands on the work section — then the hash is
  // cleared so a later reload starts at the top.
  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      const t = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          if (isWorkHash(hash)) {
            landOnWork();
          } else {
            lenisRef.current?.scrollTo(el as HTMLElement, { offset: -70, immediate: true });
          }
          window.history.replaceState(null, "", pathname);
        } else {
          lenisRef.current?.scrollTo(0, { immediate: true });
        }
      }, 100);
      return () => clearTimeout(t);
    }
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
