"use client";

import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Story", href: "#story" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b-2 border-ink bg-paper/90 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="grid size-9 -rotate-3 place-items-center rounded-md border-2 border-ink bg-sun font-display text-xl text-ink shadow-[2px_2px_0_#0d1b2a]">
              A
            </span>
            <span className="font-mono text-sm font-bold tracking-tight">
              asmin<span className="text-ember">.dev</span>
              <span className="ml-2 hidden rounded-full border border-ink/20 px-2 py-0.5 text-[10px] font-normal tracking-widest uppercase sm:inline">
                folio ’26
              </span>
            </span>
          </a>
          <div className="hidden items-center gap-6 font-mono text-xs tracking-widest uppercase md:flex">
            {links.map((l, i) => (
              <a key={l.href} href={l.href} className="group flex items-baseline gap-1 text-ink-soft transition hover:text-ink">
                <span className="text-[10px] text-ember">0{i + 1}</span>
                <span className="group-hover:underline group-hover:decoration-ember group-hover:decoration-2 group-hover:underline-offset-4">
                  {l.label}
                </span>
              </a>
            ))}
          </div>
          <a
            href={`mailto:${site.email}`}
            className="group hidden items-center gap-1 rounded-full border-2 border-ink bg-ember px-4 py-2 font-mono text-xs font-bold tracking-widest text-cream uppercase shadow-[3px_3px_0_#0d1b2a] transition hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0d1b2a] md:inline-flex"
          >
            Hire me
            <ArrowUpRight className="size-4 transition group-hover:rotate-45" />
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="grid size-10 place-items-center rounded-md border-2 border-ink bg-cream md:hidden"
            aria-label="Menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
        <motion.div style={{ scaleX: progress }} className="h-[3px] origin-left bg-ember" />
      </div>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b-2 border-ink bg-paper px-5 py-4 md:hidden"
        >
          <div className="flex flex-col gap-1 font-mono text-sm tracking-widest uppercase">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 hover:bg-sun/40"
              >
                {l.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}
