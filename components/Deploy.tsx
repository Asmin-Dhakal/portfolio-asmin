"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Check, Container, Cloud, GitBranch, ShieldCheck } from "lucide-react";
import { Reveal, SectionHeading } from "./ui";

const lines = [
  "$ git push origin main",
  "✓ tests passed (42/42)",
  "→ docker build -t app:latest .",
  "→ pushing to registry...",
  "✓ deployed to prod in 47s",
  "✓ SSL renewed • uptime 99.99%",
];

const steps = [
  { icon: GitBranch, t: "Push", d: "Tests run on every push" },
  { icon: Container, t: "Build", d: "Docker image + scan" },
  { icon: Cloud, t: "Deploy", d: "Zero-downtime release" },
  { icon: ShieldCheck, t: "Watch", d: "Logs, alerts, backups" },
];

export default function Deploy() {
  const [text, setText] = useState("");
  const [lineIdx, setLineIdx] = useState(0);

  useEffect(() => {
    const full = lines[lineIdx % lines.length];
    let i = 0;
    setText("");
    const id = setInterval(() => {
      i++;
      setText(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(id);
        setTimeout(() => setLineIdx((v) => v + 1), 1300);
      }
    }, 30);
    return () => clearInterval(id);
  }, [lineIdx]);

  return (
    <section id="deploy" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:py-28">
      <SectionHeading
        index="04"
        font="punch"
        title={<>You get a live URL, not a zip file</>}
        desc="Docker, CI/CD, SSL, domains, backups — the unglamorous half that keeps you in business."
      />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <div className="tape relative overflow-hidden rounded-xl border-2 border-ink bg-ink text-cream shadow-[6px_6px_0_#0d1b2a]">
            <div className="flex items-center gap-2 border-b border-cream/15 px-4 py-3">
              <span className="size-3 rounded-full bg-ember" />
              <span className="size-3 rounded-full bg-sun" />
              <span className="size-3 rounded-full bg-emerald-400" />
              <span className="ml-2 flex items-center gap-1.5 font-mono text-xs text-cream/60">
                <Terminal className="size-3.5" /> ship-it — zsh
              </span>
            </div>
            <div className="h-60 space-y-2 overflow-hidden p-5 font-mono text-sm">
              {lines.slice(Math.max(0, (lineIdx % lines.length) - 4), lineIdx % lines.length || 6).map((l, i) => (
                <div key={`${lineIdx}-${i}`} className="text-cream/40">
                  {l}
                </div>
              ))}
              <div className="text-sun">
                {text}
                <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-sun align-middle" />
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.06}>
              <motion.div
                whileHover={{ rotate: i % 2 ? 1 : -1, scale: 1.02 }}
                className="h-full rounded-xl border-2 border-ink bg-cream p-5 shadow-[4px_4px_0_#0d1b2a]"
              >
                <s.icon className="mb-3 size-6 text-ember" />
                <div className="font-bold">
                  <span className="mr-2 font-mono text-xs text-ink-soft">0{i + 1}</span>
                  {s.t}
                </div>
                <div className="mt-1 text-sm text-ink-soft">{s.d}</div>
                <div className="mt-3 flex items-center gap-1 font-mono text-[11px] font-bold tracking-widest text-moss uppercase">
                  <Check className="size-3.5" /> automated
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal delay={0.1}>
        <div className="mt-6 flex flex-wrap gap-2">
          {["Docker", "Nginx", "GitHub Actions", "AWS", "Vercel", "VPS", "Cloudflare", "Uptime"].map((t) => (
            <span key={t} className="rounded-full border-2 border-ink bg-cream px-4 py-1.5 font-mono text-xs font-bold">
              {t}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
