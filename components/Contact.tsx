"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Copy, Check, FileText, ArrowUpRight } from "lucide-react";
import { Reveal } from "./ui";
import { site } from "@/data/site";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden border-t-2 border-ink bg-ink text-cream">
      <div className="mask-fade-x overflow-hidden border-b border-cream/15 py-3">
        <div className="flex w-max animate-marquee-fast gap-8 pr-8 font-mono text-xs font-bold tracking-[0.25em] whitespace-nowrap text-cream/50 uppercase">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i}>Let&apos;s work together ✳ {site.email}</span>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-5 py-20 text-center md:py-28">
        <Reveal>
          <div className="mb-4 font-mono text-[11px] tracking-[0.3em] text-sun uppercase">
            Chapter 06 — your turn
          </div>
          <h2 className="font-punch mx-auto max-w-4xl text-4xl leading-[1.05] uppercase md:text-6xl">
            Have something to <span className="text-ember">launch?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-7 text-cream/70">
            Tell me what “live” looks like — I&apos;ll reply with a plan, a timeline
            and a fixed price. Web, app, deploy: all covered.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <motion.a
              whileHover={{ scale: 1.04, rotate: -1 }}
              whileTap={{ scale: 0.97 }}
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-full border-2 border-cream bg-ember px-7 py-3.5 font-mono text-sm font-bold tracking-widest uppercase shadow-[4px_4px_0_#F2F3F133] transition"
            >
              <Mail className="size-4" /> {site.email}
            </motion.a>
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-full border-2 border-cream/30 px-6 py-3.5 font-mono text-sm font-bold tracking-widest uppercase transition hover:border-sun hover:text-sun"
            >
              {copied ? <Check className="size-4 text-sun" /> : <Copy className="size-4" />}
              {copied ? "Copied!" : "Copy email"}
            </button>
            <a
              href={site.resumeUrl}
              className="inline-flex items-center gap-2 rounded-full border-2 border-cream/30 px-6 py-3.5 font-mono text-sm font-bold tracking-widest uppercase transition hover:border-sun hover:text-sun"
            >
              <FileText className="size-4" /> Resume
            </a>
          </div>
          <div className="mt-9 flex flex-wrap justify-center gap-3 font-mono text-xs tracking-widest uppercase">
            <a href={site.github} target="_blank" rel="noreferrer" className="rounded-full border border-cream/25 px-5 py-2.5 transition hover:border-sun hover:text-sun">
              GitHub ↗
            </a>
            <a href={site.fiverr} target="_blank" rel="noreferrer" className="rounded-full bg-sun px-5 py-2.5 font-bold text-ink transition hover:bg-cream">
              Fiverr — hire me ↗
            </a>
            <a href="#top" className="rounded-full border border-cream/25 px-5 py-2.5 transition hover:border-sun hover:text-sun">
              Top <ArrowUpRight className="inline size-3.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
