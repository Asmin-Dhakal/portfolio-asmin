"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, animate, useInView } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

function Line({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden pb-[0.14em] -mb-[0.08em]">
      <motion.span
        className="block"
        initial={{ y: "112%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

const stats: [number, string, string][] = [
  [5, "", "live projects"],
  [2, "", "apps on Play Store"],
  [4, "", "languages spoken"],
  [1, " hr", "avg. response"],
];

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <div ref={ref}>
      <dt className="font-cond text-3xl tracking-wide tabular-nums md:text-4xl">
        {String(n).padStart(2, "0")}
        {suffix}
      </dt>
      <dd className="mt-1 font-mono text-[10px] tracking-[0.2em] text-ink-soft uppercase">{label}</dd>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yHead = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // cursor-following glow
  const gx = useMotionValue(-600);
  const gy = useMotionValue(-600);
  const sx = useSpring(gx, { stiffness: 120, damping: 24 });
  const sy = useSpring(gy, { stiffness: 120, damping: 24 });

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        gx.set(e.clientX - r.left);
        gy.set(e.clientY - r.top);
      }}
      className="relative overflow-hidden bg-paper pt-24 md:pt-28"
    >
      {/* ambient aurora */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <motion.div
          animate={{ x: [0, 60, -20, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 right-[8%] size-[26rem] rounded-full bg-ember/20 blur-[110px]"
        />
        <motion.div
          animate={{ x: [0, -50, 30, 0], y: [0, 40, -20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] left-[4%] size-[22rem] rounded-full bg-sun/30 blur-[100px]"
        />
        <motion.div
          style={{ x: sx, y: sy, marginLeft: -240, marginTop: -240 }}
          className="absolute top-0 left-0 size-[30rem] rounded-full bg-sun/25 blur-[100px]"
        />
      </div>
      <motion.div style={{ opacity: fade }} className="mx-auto max-w-7xl px-5 pt-8 md:pt-12">
        <motion.div style={{ y: yHead }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease }}
            className="mb-5 inline-flex items-center gap-2.5 rounded-full border-2 border-ink bg-cream px-4 py-1.5 font-mono text-xs shadow-[3px_3px_0_#0d1b2a]"
          >
            <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="font-bold">Asmin Dhakal</span>
            <span className="text-ink-soft">— full-stack developer</span>
          </motion.p>

          <h1 className="font-cond text-[19vw] leading-[0.96] tracking-wide uppercase sm:text-[16vw] lg:text-[10.5rem]">
            <Line delay={0.2}>Ideas in,</Line>
            <Line delay={0.32}>
              <span style={{ color: "transparent", WebkitTextStroke: "2.5px #0d1b2a" }}>
                products
              </span>{" "}
              <span className="text-ember">out.</span>
            </Line>
          </h1>

          <div className="mt-7 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.8, ease }}
              className="max-w-xl text-lg leading-8 text-ink-soft"
            >
              Next.js on the web, Flutter in your pocket, Docker &amp; cloud underneath.
              From napkin sketch to live URL — and I stay for the uptime.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease }}
              className="flex flex-wrap items-center gap-3"
            >
              <a
                href="#work-head"
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
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] tracking-[0.22em] text-ink-soft uppercase"
          >
            <span className="text-ember">Trusted by</span>
            {["UNIGO Education", "Vihaani Events", "365 Multi Cleaning", "Sporta"].map((c) => (
              <span key={c} className="flex items-center gap-6">
                <span className="font-bold text-ink">{c}</span>
                <span className="text-ink/25">/</span>
              </span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* stats ledger */}
      <div className="relative mx-auto max-w-7xl px-5 pt-10 pb-12">
        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease }}
          className="grid grid-cols-2 border-2 border-ink bg-cream shadow-[5px_5px_0_#0d1b2a] md:grid-cols-4"
        >
          {stats.map(([v, s, l], i) => (
            <div
              key={l}
              className={`px-5 py-4 ${i > 0 ? "border-l-2 border-ink" : ""} ${i === 2 ? "max-md:border-l-0 max-md:border-t-2 max-md:border-ink" : ""} ${i === 3 ? "max-md:border-t-2 max-md:border-ink" : ""}`}
            >
              <Stat value={v} suffix={s} label={l} />
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
