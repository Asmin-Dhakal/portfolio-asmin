"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowRight, ArrowUpRight, Globe } from "lucide-react";
import { projects } from "@/data/content";
import { Reveal } from "./ui";

function Panel({
  slug,
  index,
  total,
}: {
  slug: string;
  index: number;
  total: number;
}) {
  const p = projects.find((x) => x.slug === slug)!;
  return (
    <article className="group relative w-[84vw] shrink-0 overflow-hidden rounded-2xl border-2 border-ink bg-ink text-cream shadow-[8px_8px_0_#0d1b2a33] md:w-[58vw]">
      <Link href={`/projects/${p.slug}`} className="relative block h-[30vh] overflow-hidden md:h-[34vh]">
        <Image
          src={p.image}
          alt={p.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 84vw, 58vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        <span className="absolute top-4 left-4 rounded-full border-2 border-ink bg-sun px-3 py-1 font-mono text-[11px] font-bold tracking-widest text-ink uppercase">
          {p.location.split("(")[0].trim()}
        </span>
        <span className="absolute right-5 bottom-2 font-display text-[5.5rem] leading-none text-cream/30 md:text-8xl">
          0{index + 1}
        </span>
      </Link>
      <div className="p-6 md:p-7">
        <div className="mb-1.5 font-mono text-[11px] tracking-[0.25em] text-sun uppercase">
          {p.category} — {p.year}
        </div>
        <Link href={`/projects/${p.slug}`}>
          <h3 className="font-cond text-2xl leading-[1.02] tracking-wide uppercase transition group-hover:text-sun md:text-[2rem]">
            {p.title}
          </h3>
        </Link>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-cream/70">{p.short}</p>
        <div className="mt-5 flex flex-wrap gap-2 border-t border-cream/15 pt-5">
          <Link
            href={`/projects/${p.slug}`}
            className="inline-flex items-center gap-1 rounded-full bg-sun px-4 py-2 font-mono text-[11px] font-bold tracking-widest text-ink uppercase transition hover:bg-cream"
          >
            Case study <ArrowUpRight className="size-3.5" />
          </Link>
          {p.live && (
            <a
              href={p.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-cream/30 px-4 py-2 font-mono text-[11px] font-bold tracking-widest uppercase transition hover:border-sun hover:text-sun"
            >
              <Globe className="size-3.5" /> Live
            </a>
          )}
          <span className="ml-auto hidden font-mono text-[11px] text-cream/40 sm:inline">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState(0);
  const [pos, setPos] = useState(0);

  useEffect(() => {
    const measure = () => {
      const el = trackRef.current;
      if (!el) return;
      setRange(Math.max(0, el.scrollWidth - window.innerWidth));
    };
    measure();
    const t = setTimeout(measure, 500);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -range]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  useMotionValueEvent(scrollYProgress, "change", (v) => setPos(v));

  const count = projects.length;
  const active = Math.min(count - 1, Math.floor(pos * count));

  return (
    <section id="work" ref={sectionRef} className="relative scroll-mt-24" style={{ height: "420vh" }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* header row */}
        <div className="mx-auto w-full max-w-7xl px-5 pt-28 md:pt-32">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Reveal>
                <div className="mb-3 flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] text-ember uppercase">
                  <span className="inline-block h-px w-10 bg-ember" />
                  Chapter 01 — keep scrolling
                </div>
              </Reveal>
              <Reveal>
                <h2 className="font-punch max-w-2xl text-3xl leading-[1.05] uppercase md:text-5xl">
                  Work that lives <span className="text-ember">in the wild</span>
                </h2>
              </Reveal>
            </div>
            <div className="flex min-h-[7.5rem] flex-col items-end justify-start gap-3">
              <div className="font-display text-6xl text-ink/15 md:text-7xl">
                0{active + 1}
                <span className="text-3xl md:text-4xl">/{String(count).padStart(2, "0")}</span>
              </div>
              <AnimatePresence>
                {pos > 0.88 && (
                  <motion.div
                    key="view-all"
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  >
                    <Link
                      href="/projects"
                className="group inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-ember px-4 py-2 font-mono text-[11px] font-bold tracking-widest text-cream uppercase shadow-[3px_3px_0_#0d1b2a] transition hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0d1b2a]"
              >
                View all projects
                <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" />
              </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* horizontal track */}
        <motion.div ref={trackRef} style={{ x }} className="mt-6 flex w-max gap-5 px-5 md:gap-7 md:px-[8vw]">
          {projects.map((p, i) => (
            <Panel key={p.slug} slug={p.slug} index={i} total={count} />
          ))}
          {/* end CTA card */}
          <a
            href="#contact"
            className="group flex w-[84vw] shrink-0 flex-col justify-between rounded-2xl border-2 border-dashed border-ink/50 bg-sun/15 p-8 transition hover:border-ink hover:bg-sun/30 md:w-[40vw]"
          >
            <div className="font-display text-5xl md:text-6xl">
              Yours
              <br />
              here?
            </div>
            <div>
              <p className="max-w-xs leading-7 text-ink-soft">
                Panel 0{count + 1} is empty. Tell me what “live” looks like for you.
              </p>
              <span className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-ink px-5 py-2.5 font-mono text-xs font-bold tracking-widest text-cream uppercase">
                Start a project <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </span>
            </div>
          </a>
        </motion.div>

        {/* progress */}
        <div className="mx-auto mt-6 w-full max-w-7xl px-5">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] tracking-widest text-ink-soft uppercase">drag the page</span>
            <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-ink/10">
              <motion.div style={{ width: bar }} className="h-full bg-ember" />
            </div>
            <span className="font-mono text-[11px] text-ink-soft">{Math.round(pos * 100)}%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
