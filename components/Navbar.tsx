"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { openContactModal } from "./ContactModal";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const prev = useRef(0);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setHidden(y > prev.current && y > 220);
    prev.current = y;
  });

  return (
    <motion.header
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, y: hidden ? "-130%" : "0%" }}
      transition={{
        scale: { type: "spring", stiffness: 260, damping: 22 },
        opacity: { duration: 0.25 },
        y: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
      }}
      className="fixed inset-x-0 top-3 z-50 flex justify-center px-4 md:top-5"
    >
      <nav className="flex w-full max-w-3xl items-center justify-between gap-2 rounded-full border border-cream/15 bg-ink/70 py-2 pr-2 pl-5 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <a href="#top" className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-full bg-sun font-cond text-lg text-ink">
            A
          </span>
          <span className="font-mono text-sm font-bold tracking-tight text-cream">
            asmin<span className="text-sun">.dev</span>
          </span>
        </a>
        <span className="hidden font-mono text-[11px] tracking-[0.25em] text-cream/50 uppercase sm:inline">
          folio ’26 — KTM
        </span>
        <button
          onClick={() => openContactModal()}
          className="group inline-flex items-center gap-1.5 rounded-full bg-cream px-4 py-2 font-mono text-xs font-bold tracking-widest text-ink uppercase transition hover:bg-sun"
        >
          Hire me
          <ArrowUpRight className="size-4 transition group-hover:rotate-45" />
        </button>
      </nav>
      {/* scroll progress hairline */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="absolute -bottom-2 left-1/2 h-[2px] w-2/3 origin-center rounded-full bg-sun"
      />
    </motion.header>
  );
}
