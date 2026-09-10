"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Globe } from "lucide-react";
import { site } from "@/data/site";
import { projects, type Project } from "@/data/content";
import { Reveal, SectionHeading } from "./ui";

const filters = [
  { id: "all", label: "Everything" },
  { id: "web", label: "Websites" },
  { id: "mobile", label: "Apps" },
] as const;

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  // as the next card slides over, this one settles back — classic stack feel
  const { scrollYProgress: cover } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(cover, [0, 1], [1, 0.93]);

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      exit={{ opacity: 0, scale: 0.97 }}
      style={{ top: 92 + i * 22, scale }}
      className="group sticky mb-12 overflow-hidden rounded-2xl border-2 border-ink bg-ink text-cream shadow-[8px_8px_0_#0d1b2a33]"
    >
      <div className="grid md:grid-cols-2">
        <Link href={`/projects/${p.slug}`} className="relative block min-h-64 overflow-hidden md:min-h-[26rem]">
          <motion.div style={{ y: yImg }} className="absolute inset-[-10%]">
            <Image
              src={p.image}
              alt={p.title}
              fill
              className="object-cover transition duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
          <span className="absolute top-4 left-4 rounded-full border-2 border-ink bg-sun px-3 py-1 font-mono text-[11px] font-bold tracking-widest text-ink uppercase">
            {p.location.split("(")[0].trim()}
          </span>
          <span className="absolute bottom-4 left-4 font-display text-7xl text-cream/25 md:text-8xl">
            0{i + 1}
          </span>
        </Link>
        <div className="flex flex-col justify-between p-6 md:p-9">
          <div>
            <div className="mb-2 font-mono text-[11px] tracking-[0.25em] text-sun uppercase">
              {p.category} — {p.year}
            </div>
                <Link href={`/projects/${p.slug}`}>
                  <h3 className="font-cond text-3xl leading-[1.02] tracking-wide uppercase transition group-hover:text-sun md:text-4xl">
                    {p.title}
                  </h3>
                </Link>
            <p className="mt-4 leading-7 text-cream/75">{p.short}</p>
            <div className="mt-3 font-mono text-xs text-cream/60">
              Client: <span className="text-cream">{p.client}</span>
            </div>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-cream/25 px-3 py-1 font-mono text-[11px] text-cream/80"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-7 flex flex-wrap gap-2.5 border-t border-cream/15 pt-6">
            <Link
              href={`/projects/${p.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-sun px-5 py-2.5 font-mono text-xs font-bold tracking-widest text-ink uppercase transition hover:bg-cream"
            >
              Read case <ArrowUpRight className="size-4" />
            </Link>
            {p.live && (
              <a
                href={p.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-cream/30 px-5 py-2.5 font-mono text-xs font-bold tracking-widest uppercase transition hover:border-sun hover:text-sun"
              >
                <Globe className="size-4" /> Live
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Work() {
  const [active, setActive] = useState<(typeof filters)[number]["id"]>("all");
  const list: Project[] =
    active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:py-28">
      <SectionHeading
        index="01"
        title={<>Work that lives <span className="text-ember">in the wild</span></>}
        desc="Websites in production, apps on the Play Store. Scroll — each project stacks, opens into a full case study."
      />
      <Reveal>
        <div className="mb-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className={`rounded-full border-2 border-ink px-5 py-2 font-mono text-xs font-bold tracking-widest uppercase transition ${
                active === f.id
                  ? "bg-ink text-cream shadow-[3px_3px_0_#415a77]"
                  : "bg-cream hover:bg-sun/50"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="relative">
        <AnimatePresence mode="popLayout">
          {list.map((p, idx) => (
            <ProjectCard key={p.slug} p={p} i={idx} />
          ))}
        </AnimatePresence>
      </div>

      <p className="mt-8 text-center font-mono text-xs tracking-widest text-ink-soft uppercase">
        More on{" "}
        <a href={site.fiverr} target="_blank" rel="noreferrer" className="font-bold text-ember underline decoration-2 underline-offset-4">
          Fiverr
        </a>{" "}
        •{" "}
        <a href={site.github} target="_blank" rel="noreferrer" className="font-bold text-ember underline decoration-2 underline-offset-4">
          GitHub
        </a>
      </p>
    </section>
  );
}
