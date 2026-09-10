"use client";

import { motion } from "framer-motion";

export function Reveal({
  children,
  delay = 0,
  y = 36,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function ClipImage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ clipPath: "inset(8% 6% 8% 6% round 18px)", opacity: 0.4 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 18px)", opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden"
    >
      {children}
    </motion.div>
  );
}

export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <div className="mb-4 flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] text-ember uppercase">
        <span className="inline-block h-px w-10 bg-ember" />
        {children}
      </div>
    </Reveal>
  );
}

export function SectionHeading({
  index,
  title,
  desc,
  font = "punch",
}: {
  index: string;
  title: React.ReactNode;
  desc?: string;
  font?: "serif" | "punch";
}) {
  return (
    <div className="mb-10 md:mb-14">
      <Kicker>Chapter {index}</Kicker>
      <Reveal>
        <h2
          className={
            font === "punch"
              ? "font-punch max-w-3xl text-3xl leading-[1.05] uppercase md:text-5xl"
              : "font-display max-w-3xl text-4xl leading-[1.02] md:text-6xl"
          }
        >
          {title}
        </h2>
      </Reveal>
      {desc && (
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-xl leading-7 text-ink-soft">{desc}</p>
        </Reveal>
      )}
    </div>
  );
}
