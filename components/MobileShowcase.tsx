"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { QrCode, Camera, BellRing, ArrowUpRight } from "lucide-react";
import { Reveal } from "./ui";
import { IMG } from "@/data/content";

const apps = [
  {
    name: "Sporta",
    line: "Tournament, turf & live scores",
    img: IMG.sporta,
    href: "https://play.google.com/store/apps/details?id=com.sporta.app&hl=en",
    points: ["Turf discovery + booking", "Live scores & brackets", "Teams, stats, Puskas vote"],
  },
  {
    name: "UNIGO",
    line: "Tournament registration + study abroad",
    img: IMG.unigoApp,
    href: "https://play.google.com/store/apps/details?id=com.unigo.app.unigo&hl=en",
    badge: "WIP",
    points: ["QR payments + ID verification", "5-player team rosters", "University browser"],
  },
];

const ticks = [
  { icon: QrCode, t: "QR check-in / checkout", d: "Shifts and attendance recorded on scan — CleanFlow runs payroll on it." },
  { icon: Camera, t: "Photo-proof flows", d: "Workers upload finished work; clients review and confirm in-app." },
  { icon: BellRing, t: "Store releases, handled", d: "Signing, listings, staged rollouts, crash logs — I do the homework." },
];

export default function MobileShowcase() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const yB = useTransform(scrollYProgress, [0, 1], [90, -30]);

  return (
    <section id="apps" ref={ref} className="scroll-mt-24 border-y-2 border-ink bg-moss text-cream">
      <div className="mx-auto max-w-7xl px-5 py-20 md:py-28">
        <Reveal>
          <div className="mb-4 flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] text-sun uppercase">
            <span className="inline-block h-px w-10 bg-sun" />
            Chapter 03 — in your pocket
          </div>
          <h2 className="font-display max-w-3xl text-4xl leading-[1.02] md:text-6xl">
            Two apps, live on the <em className="text-sun">Play Store</em>
          </h2>
          <p className="mt-4 max-w-xl leading-7 text-cream/70">
            Real listings, real downloads — not mockups. Tap through to the store.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {apps.map((a, i) => (
            <motion.a
              key={a.name}
              href={a.href}
              target="_blank"
              rel="noreferrer"
              style={{ y: i === 0 ? yA : yB }}
              className="group overflow-hidden rounded-2xl border-2 border-cream/90 bg-ink shadow-[6px_6px_0_#00000055]"
            >
              <div className="relative h-60 overflow-hidden md:h-72">
                <Image
                  src={a.img}
                  alt={a.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {a.badge && (
                  <span className="absolute top-4 left-4 -rotate-3 rounded-md bg-sun px-3 py-1 font-mono text-xs font-bold text-ink">
                    {a.badge}
                  </span>
                )}
                <span className="absolute right-4 bottom-4 grid size-11 place-items-center rounded-full bg-sun text-ink transition group-hover:rotate-45">
                  <ArrowUpRight className="size-5" />
                </span>
              </div>
              <div className="p-6">
                <div className="font-display text-3xl">{a.name}</div>
                <div className="mt-1 font-mono text-xs tracking-widest text-cream/60 uppercase">{a.line}</div>
                <ul className="mt-4 space-y-2">
                  {a.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2 text-sm text-cream/80">
                      <span className="size-1.5 rounded-full bg-sun" /> {pt}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2 font-mono text-xs font-bold tracking-widest text-ink uppercase">
                  ▶ Google Play
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {ticks.map((f, i) => (
            <Reveal key={f.t} delay={i * 0.07}>
              <div className="h-full rounded-2xl border border-cream/20 bg-cream/[0.04] p-5">
                <f.icon className="mb-3 size-6 text-sun" />
                <div className="font-bold">{f.t}</div>
                <div className="mt-1 text-sm leading-6 text-cream/70">{f.d}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
