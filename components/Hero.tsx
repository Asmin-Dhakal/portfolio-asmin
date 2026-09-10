"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Asterisk } from "lucide-react";
import { site } from "@/data/site";
import { IMG } from "@/data/content";

const ease = [0.22, 1, 0.36, 1] as const;

function Words({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="inline">
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: delay + i * 0.07, ease }}
          >
            {w}
            {i < text.split(" ").length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yHead = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yPhoto = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const rotPhoto = useTransform(scrollYProgress, [0, 1], [3, -2]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative overflow-hidden pt-16">
      {/* nameplate bar */}
      <div className="border-b-2 border-ink">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-2.5 font-mono text-[11px] tracking-[0.2em] uppercase">
          <span className="flex items-center gap-2">
            <Asterisk className="size-4 text-ember" /> The Shipping News
          </span>
          <span className="hidden sm:inline">Kathmandu — Aruba — everywhere</span>
          <span className="flex items-center gap-2">
            <span className="size-2 animate-pulse rounded-full bg-ember" /> Open for work
          </span>
        </div>
      </div>

      <motion.div style={{ opacity: fade }} className="mx-auto max-w-6xl px-5 pt-10 md:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <motion.div style={{ y: yHead }}>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-cream px-4 py-1.5 font-mono text-xs shadow-[3px_3px_0_#0d1b2a]"
            >
              <span className="font-bold">Asmin Dhakal</span>
              <span className="text-ink-soft">— full-stack developer</span>
            </motion.p>
            <h1 className="font-display text-[13.5vw] leading-[0.95] sm:text-7xl md:text-8xl">
              <Words text="Ideas in," />
              <br />
              <span className="inline-flex h-[0.82em] w-[1.9em] translate-y-[0.08em] overflow-hidden rounded-full border-2 border-ink align-baseline">
                <Image src={IMG.vihaani} alt="Selected work" width={220} height={100} className="h-full w-full object-cover" />
              </span>{" "}
              <Words text="products out." delay={0.15} />
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8, ease }}
              className="mt-6 max-w-xl text-lg leading-8 text-ink-soft"
            >
              Next.js on the web, Flutter in your pocket, Docker &amp; cloud underneath.
              I take products from napkin sketch to live URL — and stay for the uptime.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.8, ease }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full border-2 border-ink bg-ink px-6 py-3 font-mono text-sm font-bold tracking-widest text-cream uppercase shadow-[4px_4px_0_#415a77] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#415a77]"
              >
                See live work
                <ArrowDown className="size-4 transition group-hover:translate-y-1" />
              </a>
              <a
                href={`mailto:${site.email}`}
                className="group inline-flex items-center gap-2 rounded-full border-2 border-ink bg-cream px-6 py-3 font-mono text-sm font-bold tracking-widest uppercase shadow-[4px_4px_0_#0d1b2a] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#0d1b2a]"
              >
                {site.email}
                <ArrowUpRight className="size-4 transition group-hover:rotate-45" />
              </a>
            </motion.div>
          </motion.div>

          {/* taped photo card */}
          <motion.div style={{ y: yPhoto }} className="relative mx-auto w-full max-w-sm lg:mx-0">
            <motion.div style={{ rotate: rotPhoto }} className="tape relative rounded-lg border-2 border-ink bg-cream p-3 pb-5 shadow-[6px_6px_0_#0d1b2a]">
              <div className="overflow-hidden rounded-md border border-ink/20">
                <Image src={IMG.desk} alt="Asmin's workspace" width={640} height={760} className="aspect-[4/5] w-full object-cover" priority />
              </div>
              <div className="flex items-center justify-between px-1 pt-3 font-mono text-xs">
                <span className="tracking-widest uppercase">fig. 01 — the desk</span>
                <span className="text-ember">★ ★ ★ ★ ★</span>
              </div>
              {/* rotating badge */}
              <div className="absolute -bottom-8 -left-8 size-28 md:size-32">
                <div className="absolute inset-0 animate-spin-slower">
                  <svg viewBox="0 0 100 100" className="size-full">
                    <defs>
                      <path id="circ" d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
                    </defs>
                    <circle cx="50" cy="50" r="49" fill="#415a77" stroke="#0d1b2a" strokeWidth="2" />
                    <text fontSize="11.5" fontFamily="monospace" fill="#F2F3F1" letterSpacing="2.5">
                      <textPath href="#circ">OPEN FOR WORK • LET'S TALK •</textPath>
                    </text>
                  </svg>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ledger stats */}
        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-14 grid grid-cols-2 border-2 border-ink bg-cream shadow-[5px_5px_0_#0d1b2a] md:grid-cols-4"
        >
          {[
            ["05", "live projects"],
            ["02", "apps on Play Store"],
            ["04", "devs led at UNIGO"],
            ["01 hr", "avg. response"],
          ].map(([v, l], i) => (
            <div key={l} className={`px-5 py-4 ${i > 0 ? "border-l-2 border-ink" : ""} ${i === 2 ? "max-md:border-l-0 max-md:border-t-2 max-md:border-ink" : ""} ${i === 3 ? "max-md:border-t-2 max-md:border-ink" : ""}`}>
              <dt className="font-display text-3xl md:text-4xl">{v}</dt>
              <dd className="mt-1 font-mono text-[11px] tracking-widest text-ink-soft uppercase">{l}</dd>
            </div>
          ))}
        </motion.dl>

        <div className="flex justify-center py-8">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="flex flex-col items-center gap-1 font-mono text-[11px] tracking-[0.3em] text-ink-soft uppercase"
          >
            scroll
            <ArrowDown className="size-4 text-ember" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
