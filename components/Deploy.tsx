"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { GitBranch, Container, Rocket, Radar, Terminal } from "lucide-react";
import { Reveal, SectionHeading } from "./ui";

const DURATION = 2600;

const steps = [
  {
    icon: GitBranch,
    code: "01",
    title: "Push",
    desc: "Tests run on every push. Nothing broken ever leaves the laptop.",
    log: ["$ git push origin main", "✓ 42/42 tests passed", "→ bundle 212kb, 0 errors"],
  },
  {
    icon: Container,
    code: "02",
    title: "Build",
    desc: "A Docker image is baked, scanned and tagged. Same artifact, everywhere.",
    log: ["→ docker build -t app:1.4.2", "✓ vuln scan clean", "→ pushed to registry"],
  },
  {
    icon: Rocket,
    code: "03",
    title: "Deploy",
    desc: "Zero-downtime release. Users never notice — except things get faster.",
    log: ["→ rolling update: 3/3", "✓ health checks green", "✓ live in 47s"],
  },
  {
    icon: Radar,
    code: "04",
    title: "Watch",
    desc: "Logs, alerts, SSL renewals and nightly backups. Sleep through the night.",
    log: ["✓ uptime 99.99%", "✓ SSL auto-renewed", "✓ backup 02:00 done"],
  },
];

export default function Deploy() {
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);
  const secRef = useRef<HTMLElement>(null);
  const inView = useInView(secRef, { amount: 0.35 });

  // loop runs only while the section is on screen; re-entering restarts at Push
  useEffect(() => {
    if (inView) {
      setActive(0);
      setCycle((c) => c + 1);
    }
  }, [inView]);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % steps.length);
      setCycle((c) => c + 1);
    }, DURATION);
    return () => clearInterval(id);
  }, [inView, cycle]);

  const step = steps[active];
  const pick = (i: number) => {
    setActive(i);
    setCycle((c) => c + 1);
  };

  return (
    <section id="deploy" ref={secRef} className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 md:py-28">
      <SectionHeading
        index="04"
        font="punch"
        title={<>You get a live URL, not a zip file</>}
        desc="Docker, CI/CD, SSL, domains, backups — the unglamorous half that keeps you in business. Watch a release happen:"
      />

      <div className="grid items-start gap-5 lg:grid-cols-[1fr_300px]">
        {/* stage display */}
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border-2 border-ink bg-ink p-6 text-cream shadow-[6px_6px_0_#0d1b2a] md:p-8">
          <div className="pointer-events-none absolute -top-8 right-2 font-display text-[10rem] leading-none text-cream/10 select-none md:text-[13rem]">
            {step.code}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={step.code}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-sun text-ink">
                  <step.icon className="size-6" />
                </span>
                <div>
                  <div className="font-mono text-[11px] tracking-[0.25em] text-sun uppercase">
                    Stage {step.code} / 04
                  </div>
                  <div className="font-cond text-4xl tracking-wide uppercase md:text-5xl">
                    {step.title}
                  </div>
                </div>
                {active === steps.length - 1 && (
                  <motion.span
                    initial={{ scale: 0, rotate: -12 }}
                    animate={{ scale: 1, rotate: -6 }}
                    className="ml-auto hidden rounded-md bg-emerald-400 px-3 py-1.5 font-mono text-xs font-bold tracking-widest text-ink sm:inline"
                  >
                    ● LIVE
                  </motion.span>
                )}
              </div>
              <p className="mt-4 max-w-lg leading-7 text-cream/75">{step.desc}</p>
              <div className="mt-5 min-h-[7.5rem] rounded-xl border border-cream/15 bg-black/40 p-4 font-mono text-[12px] leading-6 md:text-sm">
                <div className="mb-2 flex items-center gap-1.5 text-cream/40">
                  <Terminal className="size-3.5" /> ship-it — live log
                </div>
                {step.log.map((l, i) => (
                  <motion.div
                    key={`${step.code}-${i}-${cycle}`}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.22 }}
                    className={l.startsWith("✓") ? "text-emerald-300" : "text-cream/80"}
                  >
                    {l}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
          {/* loop progress */}
          <div className="mt-4 h-1 overflow-hidden rounded-full bg-cream/10">
            <motion.div
              key={cycle}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: DURATION / 1000, ease: "linear" }}
              className="h-full bg-sun"
            />
          </div>
          </div>
        </Reveal>

        {/* clickable rail */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
          {steps.map((s, i) => {
            const done = i < active;
            const now = i === active;
            return (
              <Reveal key={s.code} delay={i * 0.05}>
                <button
                  onClick={() => pick(i)}
                  className={`flex w-full items-center gap-3 rounded-xl border-2 p-3 text-left transition-all duration-300 lg:p-4 ${
                    now
                      ? "border-ink bg-sun/30 shadow-[4px_4px_0_#0d1b2a]"
                      : done
                        ? "border-ink bg-cream hover:-translate-y-0.5"
                        : "border-ink/20 bg-cream/50 opacity-70 hover:opacity-100"
                  }`}
                >
                  <span
                    className={`grid size-9 shrink-0 place-items-center rounded-lg font-mono text-xs font-bold transition ${
                      now ? "bg-ember text-cream" : done ? "bg-moss text-cream" : "bg-ink/10 text-ink-soft"
                    }`}
                  >
                    {done ? "✓" : s.code}
                  </span>
                  <span>
                    <span className="block text-sm font-bold">{s.title}</span>
                    <span className="font-mono text-[10px] tracking-widest text-ink-soft uppercase">
                      {now ? "running…" : done ? "done" : "tap to view"}
                    </span>
                  </span>
                </button>
              </Reveal>
            );
          })}
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
