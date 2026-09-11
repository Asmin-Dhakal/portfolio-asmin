import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Globe } from "lucide-react";
import { projects } from "@/data/content";
import { site } from "@/data/site";
import { Reveal } from "@/components/ui";
import BackButton from "@/components/BackButton";

export const metadata = {
  title: `All projects — ${site.name}`,
  description: "Every live project: websites in production, apps on the Play Store.",
};

export default function ProjectsArchive() {
  return (
    <main className="mx-auto max-w-7xl px-5 pt-28 pb-20">
      <BackButton fallback="/" />

      <Reveal y={20}>
        <div className="mb-3 font-mono text-[11px] tracking-[0.25em] text-ember uppercase">
          Archive — {String(projects.length).padStart(2, "0")} projects
        </div>
      </Reveal>
      <Reveal y={28}>
        <h1 className="font-punch max-w-3xl text-4xl leading-[1.05] uppercase md:text-6xl">
          All <span className="text-ember">projects</span>
        </h1>
      </Reveal>
      <Reveal delay={0.08}>
        <p className="mt-4 max-w-xl leading-7 text-ink-soft">
          Everything live: websites in production and apps on the Play Store.
          Open any card for the full case study.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 0.08}>
            <Link
              href={`/projects/${p.slug}`}
              className="group block overflow-hidden rounded-2xl border-2 border-ink bg-ink text-cream shadow-[6px_6px_0_#0d1b2a33] transition hover:-translate-y-1"
            >
              <div className="relative h-56 overflow-hidden md:h-64">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <span className="absolute right-5 bottom-2 font-display text-7xl text-cream/30">
                  0{i + 1}
                </span>
              </div>
              <div className="p-6">
                <div className="mb-1.5 font-mono text-[11px] tracking-[0.25em] text-sun uppercase">
                  {p.category} — {p.year} — {p.client}
                </div>
                <div className="font-cond text-2xl tracking-wide uppercase transition group-hover:text-sun md:text-3xl">
                  {p.title}
                </div>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-cream/70">{p.short}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-sun px-4 py-2 font-mono text-[11px] font-bold tracking-widest text-ink uppercase">
                  Case study <ArrowUpRight className="size-3.5" />
                </span>
                {p.live ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-cream/30 px-4 py-2 font-mono text-[11px] font-bold tracking-widest uppercase">
                    <Globe className="size-3.5" /> Live
                  </span>
                ) : p.status ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-dashed border-sun/70 px-4 py-2 font-mono text-[11px] font-bold tracking-widest text-sun uppercase">
                    {p.status}
                  </span>
                ) : null}
              </div>
              </div>
            </Link>
          </Reveal>
        ))}

        {/* more elsewhere */}
        <Reveal>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="group flex h-full flex-col justify-between rounded-2xl border-2 border-dashed border-ink/50 bg-cream p-8 transition hover:border-ink hover:bg-sun/20"
          >
            <div className="font-cond text-3xl tracking-wide uppercase md:text-4xl">
              Code experiments
            </div>
            <p className="mt-2 max-w-sm leading-7 text-ink-soft">
              Side repos, NestJS sketches and Flutter drills live on GitHub.
            </p>
            <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border-2 border-ink bg-ink px-5 py-2.5 font-mono text-xs font-bold tracking-widest text-cream uppercase">
              GitHub — Asmin-Dhakal <ArrowUpRight className="size-4 transition group-hover:rotate-45" />
            </span>
          </a>
        </Reveal>
        <Reveal delay={0.08}>
          <a
            href={site.fiverr}
            target="_blank"
            rel="noreferrer"
            className="group flex h-full flex-col justify-between rounded-2xl border-2 border-ink bg-sun/25 p-8 transition hover:bg-sun/40"
          >
            <div className="font-cond text-3xl tracking-wide uppercase md:text-4xl">
              Order on Fiverr
            </div>
            <p className="mt-2 max-w-sm leading-7 text-ink-soft">
              Custom Flutter apps and animated websites from $100 — 1-hour avg response.
            </p>
            <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border-2 border-ink bg-ember px-5 py-2.5 font-mono text-xs font-bold tracking-widest text-cream uppercase">
              Fiverr gigs <ArrowUpRight className="size-4 transition group-hover:rotate-45" />
            </span>
          </a>
        </Reveal>
      </div>
    </main>
  );
}
