"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { MapPin, Zap } from "lucide-react";
import { Reveal, SectionHeading } from "./ui";
import { experience, IMG } from "@/data/content";

const stats = [
  { label: "Web", value: 95 },
  { label: "Mobile", value: 90 },
  { label: "DevOps", value: 88 },
];

const langs = ["English", "Chinese", "Hindi", "Nepali"];

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.6"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="story" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 md:py-28">
      <SectionHeading
        index="05"
        title={<>The short <span className="text-ember">story</span></>}
        desc="From side projects to leading a team of four — while staying the person who actually ships."
      />

      <div ref={ref} className="grid gap-10 lg:grid-cols-[340px_1fr]">
        {/* player card */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <motion.div
              whileHover={{ rotate: 0, scale: 1.01 }}
              className="relative -rotate-2 rounded-2xl border-2 border-ink bg-ink p-4 text-cream shadow-[7px_7px_0_#0d1b2a33]"
            >
              <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-cream/60 uppercase">
                <span>Player card</span>
                <span className="flex items-center gap-1 text-sun">
                  <Zap className="size-3" /> lvl 06
                </span>
              </div>
              <div className="mt-3 overflow-hidden rounded-xl border border-cream/20">
                <Image src={IMG.desk} alt="Asmin Dhakal's workspace" width={640} height={480} className="aspect-[4/3] w-full object-cover" />
              </div>
              <div className="mt-4 font-cond text-3xl tracking-wide uppercase">Asmin Dhakal</div>
              <div className="mt-1 flex items-center gap-1.5 font-mono text-[11px] tracking-widest text-cream/60 uppercase">
                <MapPin className="size-3.5" /> Kathmandu — works worldwide
              </div>
              <div className="mt-4 space-y-2.5">
                {stats.map((s, i) => (
                  <div key={s.label}>
                    <div className="mb-1 flex justify-between font-mono text-[11px] tracking-widest uppercase">
                      <span>{s.label}</span>
                      <span className="text-sun">{s.value}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-cream/15">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full bg-sun"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5 border-t border-cream/15 pt-4">
                {langs.map((l, i) => (
                  <motion.span
                    key={l}
                    initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: i % 2 ? 3 : -3 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 300, damping: 15 }}
                    className="rounded-md border-2 border-dashed border-sun/70 px-2.5 py-1 font-mono text-[10px] font-bold tracking-widest text-sun uppercase"
                  >
                    {l}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </Reveal>
        </div>

        {/* timeline */}
        <div className="relative pl-8">
          {/* track */}
          <div className="absolute top-2 bottom-2 left-[7px] w-[3px] rounded-full bg-ink/10" />
          <motion.div
            style={{ scaleY: progress }}
            className="absolute top-2 bottom-2 left-[7px] w-[3px] origin-top rounded-full bg-ember"
          />
          {experience.map((e, i) => (
            <motion.div
              key={e.role}
              initial={{ opacity: 0, x: 48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative pb-8 last:pb-0"
            >
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 350, damping: 16 }}
                className="absolute top-1.5 -left-8 grid size-4 place-items-center"
              >
                <span className="size-4 rounded-full border-[3px] border-ember bg-paper" />
              </motion.span>
              <div className="group rounded-2xl border-2 border-ink bg-cream p-6 shadow-[5px_5px_0_#0d1b2a] transition hover:-translate-y-1 hover:shadow-[5px_9px_0_#0d1b2a]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="font-cond text-2xl tracking-wide uppercase">{e.role}</div>
                  <div className="rounded-full bg-ink px-3 py-1 font-mono text-[11px] font-bold text-cream">
                    {e.time}
                  </div>
                </div>
                <div className="mt-1 font-mono text-[11px] tracking-[0.2em] text-ember uppercase">
                  {e.place}
                </div>
                <p className="mt-3 text-sm leading-7 text-ink-soft">{e.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
