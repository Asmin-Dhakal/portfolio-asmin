"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MonitorSmartphone, Smartphone, Database, Rocket } from "lucide-react";
import { Reveal } from "./ui";

type Skill = { name: string; proof: string; level: number };
type Group = { id: string; label: string; icon: typeof MonitorSmartphone; blurb: string; skills: Skill[] };

const groups: Group[] = [
  {
    id: "frontend",
    label: "Frontend",
    icon: MonitorSmartphone,
    blurb: "What visitors see and touch.",
    skills: [
      { name: "Next.js", proof: "UNIGO, Vihaani, CleanFlow", level: 95 },
      { name: "React", proof: "Every web build", level: 95 },
      { name: "TypeScript", proof: "Default, everywhere", level: 90 },
      { name: "Tailwind CSS", proof: "This entire site", level: 95 },
      { name: "Framer Motion", proof: "All site animation", level: 88 },
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    icon: Smartphone,
    blurb: "In pockets, on the Play Store.",
    skills: [
      { name: "Flutter", proof: "Sporta, UNIGO app", level: 90 },
      { name: "Dart", proof: "Both live apps", level: 88 },
      { name: "Firebase", proof: "Push, auth, sync", level: 82 },
    ],
  },
  {
    id: "backend",
    label: "Backend & Data",
    icon: Database,
    blurb: "The part that must never break.",
    skills: [
      { name: "Node.js / NestJS", proof: "APIs, QR + payment flows", level: 88 },
      { name: "PostgreSQL", proof: "UNIGO + CMS data", level: 85 },
      { name: "MongoDB", proof: "Flexible app data", level: 82 },
      { name: "Prisma", proof: "Typesafe data layer", level: 86 },
    ],
  },
  {
    id: "ship",
    label: "Ship & Scale",
    icon: Rocket,
    blurb: "Live URL, not a zip file.",
    skills: [
      { name: "Docker", proof: "One-command deploys", level: 87 },
      { name: "AWS / VPS", proof: "Prod hosting", level: 84 },
      { name: "Vercel", proof: "This site + clients", level: 92 },
      { name: "CI/CD + Nginx", proof: "47-second releases", level: 86 },
    ],
  },
];

export default function Marquee() {
  const [active, setActive] = useState(groups[0].id);
  const group = groups.find((g) => g.id === active)!;

  return (
    <section className="border-b-2 border-ink bg-cream">
      <div className="mx-auto max-w-7xl px-5 py-14 md:py-20">
        <Reveal>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="mb-3 flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] text-ember uppercase">
                <span className="inline-block h-px w-10 bg-ember" />
                The toolbox
              </div>
              <h2 className="font-punch text-2xl uppercase md:text-4xl">
                Pick a drawer<span className="text-ember">.</span>
              </h2>
            </div>
            <p className="max-w-xs font-mono text-xs leading-6 text-ink-soft">
              Every skill below is tied to something live — hover the proof.
            </p>
          </div>
        </Reveal>

        {/* tabs */}
        <Reveal delay={0.05}>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {groups.map((g) => (
              <button
                key={g.id}
                onClick={() => setActive(g.id)}
                className={`flex shrink-0 items-center gap-2 rounded-full border-2 border-ink px-5 py-2.5 font-mono text-xs font-bold tracking-widest uppercase transition ${
                  active === g.id
                    ? "bg-ink text-cream shadow-[3px_3px_0_#415a77]"
                    : "bg-paper hover:bg-sun/40"
                }`}
              >
                <g.icon className="size-4" />
                {g.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* panel */}
        <div className="mt-5 overflow-hidden rounded-2xl border-2 border-ink bg-paper shadow-[6px_6px_0_#0d1b2a]">
          <AnimatePresence mode="wait">
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="grid md:grid-cols-[240px_1fr]"
            >
              <div className="border-b-2 border-ink bg-sun/25 p-6 md:border-r-2 md:border-b-0">
                <group.icon className="size-8 text-ember" />
                <div className="font-cond mt-3 text-3xl tracking-wide uppercase">{group.label}</div>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{group.blurb}</p>
                <div className="mt-3 font-mono text-[11px] tracking-widest text-ink-soft uppercase">
                  {String(group.skills.length).padStart(2, "0")} tools
                </div>
              </div>
              <ul>
                {group.skills.map((s, i) => (
                  <motion.li
                    key={s.name}
                    initial={{ opacity: 0, x: 26 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.4 }}
                    className="group/row flex items-center gap-4 border-b border-ink/10 px-6 py-4 transition last:border-0 hover:bg-cream"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="text-lg font-bold">{s.name}</span>
                        <span className="font-mono text-[11px] text-ink-soft transition group-hover/row:text-ember">
                          ↳ {s.proof}
                        </span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/10">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.level}%` }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{ delay: 0.15 + i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full rounded-full bg-ember"
                        />
                      </div>
                    </div>
                    <span className="shrink-0 font-mono text-xs font-bold text-ink-soft">{s.level}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
