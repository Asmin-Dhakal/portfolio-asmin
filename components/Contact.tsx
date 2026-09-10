"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Copy, Check, ArrowUpRight, ArrowUp } from "lucide-react";
import { Reveal } from "./ui";
import { site } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

function BigWord({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em]">
      <motion.span
        className="inline-block"
        initial={{ y: "110%", rotate: 4 }}
        whileInView={{ y: 0, rotate: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, delay, ease }}
      >
        {text}
      </motion.span>
    </span>
  );
}

const socials = [
  { label: "GitHub", note: "Code & experiments", href: site.github },
  { label: "Fiverr", note: "Hire me from $100", href: site.fiverr },
  { label: "LinkedIn", note: "Work history", href: site.linkedin },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const yBg = useTransform(scrollYProgress, [0, 1], [80, -40]);
  const rot = useTransform(scrollYProgress, [0, 1], [0, 120]);

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
    <section id="contact" ref={ref} className="relative scroll-mt-24 overflow-hidden border-t-2 border-ink bg-ink text-cream">
      {/* glow + ghost type */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-96 w-[46rem] -translate-x-1/2 rounded-full bg-ember/25 blur-[130px]" />
        <motion.div
          style={{ y: yBg }}
          className="absolute inset-x-0 -bottom-10 text-center font-cond text-[22vw] leading-none tracking-wide whitespace-nowrap text-cream/[0.05] uppercase select-none"
        >
          Let&apos;s talk
        </motion.div>
        <motion.svg
          style={{ rotate: rot }}
          viewBox="0 0 20 20"
          className="absolute top-16 right-[8%] size-10 fill-sun/60 md:size-14"
        >
          <path d="M10 0l2.4 7.6L20 10l-7.6 2.4L10 20l-2.4-7.6L0 10l7.6-2.4z" />
        </motion.svg>
        <motion.svg
          style={{ rotate: rot }}
          viewBox="0 0 20 20"
          className="absolute bottom-24 left-[6%] size-7 fill-sun/40 md:size-10"
        >
          <path d="M10 0l2.4 7.6L20 10l-7.6 2.4L10 20l-2.4-7.6L0 10l7.6-2.4z" />
        </motion.svg>
      </div>

      {/* ticker */}
      <div className="mask-fade-x relative overflow-hidden border-b border-cream/15 py-3">
        <div className="flex w-max animate-marquee-fast gap-8 pr-8 font-mono text-xs font-bold tracking-[0.25em] whitespace-nowrap text-cream/50 uppercase">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="flex items-center gap-8">
              Let&apos;s work together <span className="text-sun">✳</span> {site.email}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-20 text-center md:py-28">
        <Reveal>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cream/25 px-4 py-1.5 font-mono text-[11px] tracking-[0.3em] uppercase">
            <span className="size-2 animate-pulse rounded-full bg-emerald-400" />
            Chapter 06 — booking Q4
          </div>
        </Reveal>

        <h2 className="font-punch mx-auto max-w-5xl text-[11vw] leading-[1.02] uppercase sm:text-5xl md:text-7xl">
          <BigWord text="Have" /> <BigWord text="something" delay={0.06} />
          <br />
          <BigWord text="to" delay={0.12} /> <BigWord text="launch?" delay={0.18} />
        </h2>

        <Reveal delay={0.25}>
          <p className="mx-auto mt-6 max-w-xl leading-7 text-cream/70">
            Tell me what “live” looks like — I&apos;ll reply with a plan, a timeline
            and a fixed price. Web, app, deploy: all covered.
          </p>
        </Reveal>

        <Reveal delay={0.32}>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <motion.a
              whileHover={{ scale: 1.05, rotate: -1 }}
              whileTap={{ scale: 0.96 }}
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2.5 rounded-full bg-sun px-8 py-4 font-mono text-sm font-bold tracking-widest text-ink uppercase shadow-[5px_5px_0_#e0e1dd33] transition"
            >
              <Mail className="size-4" /> {site.email}
            </motion.a>
            <button
              onClick={copyEmail}
              className="inline-flex min-w-[10.5rem] items-center justify-center gap-2 rounded-full border-2 border-cream/30 px-6 py-4 font-mono text-sm font-bold tracking-widest uppercase transition hover:border-sun hover:text-sun"
            >
              {copied ? <Check className="size-4 text-emerald-300" /> : <Copy className="size-4" />}
              {copied ? "Copied!" : "Copy email"}
            </button>
          </div>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-3xl gap-3 text-left sm:grid-cols-3">
          {socials.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease }}
              whileHover={{ y: -5 }}
              className="group rounded-2xl border border-cream/20 bg-cream/[0.04] p-5 transition hover:border-sun/60 hover:bg-cream/[0.07]"
            >
              <div className="flex items-center justify-between">
                <span className="font-cond text-2xl tracking-wide uppercase">{s.label}</span>
                <ArrowUpRight className="size-5 text-cream/40 transition group-hover:rotate-45 group-hover:text-sun" />
              </div>
              <div className="mt-1 font-mono text-[11px] tracking-widest text-cream/50 uppercase">
                {s.note}
              </div>
            </motion.a>
          ))}
        </div>

        <Reveal delay={0.1}>
          <a
            href="#top"
            className="group mx-auto mt-12 inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-cream/50 uppercase transition hover:text-sun"
          >
            <span className="grid size-9 place-items-center rounded-full border border-cream/25 transition group-hover:-translate-y-1 group-hover:border-sun">
              <ArrowUp className="size-4" />
            </span>
            Back to top
          </a>
        </Reveal>
      </div>
    </section>
  );
}
