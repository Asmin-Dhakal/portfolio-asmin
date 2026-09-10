"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const firstLoad = useRef(true);

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

    // Smooth same-page anchor clicks via Lenis
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute("href");
      if (!hash || hash.length < 2) return;
      // Only handle anchors on the home page sections
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -70 });
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
          lenisRef.current?.scrollTo(el as HTMLElement, { offset: -70, immediate: true });
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
