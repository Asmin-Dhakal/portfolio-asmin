import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, MapPin, User, Calendar, Tag } from "lucide-react";
import { projects, getProject } from "@/data/content";
import { site } from "@/data/site";
import HireButton from "@/components/HireButton";
import BackButton from "@/components/BackButton";
import { Reveal, ClipImage } from "@/components/ui";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const p = getProject(slug);
    if (!p) return { title: "Project not found" };
    return {
      title: `${p.title} — ${site.name}`,
      description: p.short,
      openGraph: { title: p.title, description: p.short, images: [p.image] },
    };
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const others = projects.filter((x) => x.slug !== slug).slice(0, 2);

  return (
    <main className="mx-auto max-w-7xl px-5 pt-28 pb-20">
      <BackButton />

      <Reveal y={20}>
        <div className="mb-3 font-mono text-[11px] tracking-[0.25em] text-ember uppercase">
          Case file — {p.category} • {p.year}
        </div>
      </Reveal>
      <Reveal y={28}>
        <h1 className="font-cond max-w-3xl text-5xl leading-[0.98] tracking-wide uppercase md:text-7xl">{p.title}</h1>
      </Reveal>
      <Reveal delay={0.08}>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">{p.short}</p>
      </Reveal>

      <Reveal delay={0.14}>
        <div className="mt-6 flex flex-wrap gap-2.5">
        {p.live && (
          <a
            href={p.live}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-ember px-6 py-3 font-mono text-xs font-bold tracking-widest text-cream uppercase shadow-[4px_4px_0_#0d1b2a] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#0d1b2a]"
          >
            Visit live <ArrowUpRight className="size-4" />
          </a>
        )}
        <HireButton
          label="Build me one like this"
          className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-cream px-6 py-3 font-mono text-xs font-bold tracking-widest uppercase shadow-[4px_4px_0_#0d1b2a] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#0d1b2a]"
        />
        </div>
      </Reveal>

      <div className="tape relative mt-10 rounded-lg border-2 border-ink shadow-[6px_6px_0_#0d1b2a]">
        <ClipImage>
          <Image
            src={p.image}
            alt={p.title}
            width={1600}
            height={900}
            className="h-auto w-full"
            priority
          />
        </ClipImage>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: User, k: "Client", v: p.client },
          { icon: MapPin, k: "Location", v: p.location },
          { icon: Calendar, k: "Year", v: [p.year, p.timeline].filter(Boolean).join(" • ") },
          { icon: Tag, k: "Engagement", v: p.price ?? p.role },
        ].map((m, i) => (
          <Reveal key={m.k} delay={i * 0.07}>
            <div className="h-full rounded-xl border-2 border-ink bg-cream p-4 shadow-[3px_3px_0_#0d1b2a]">
              <m.icon className="mb-2 size-5 text-ember" />
              <div className="font-mono text-[10px] tracking-[0.2em] text-ink-soft uppercase">{m.k}</div>
              <div className="mt-1 text-sm font-bold">{m.v}</div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-4 rounded-xl border-2 border-ink bg-sun/25 p-6">
        <div className="font-mono text-[11px] tracking-[0.2em] uppercase">My role</div>
        <div className="mt-1 font-bold">{p.role}</div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.platform.map((pl) => (
            <span key={pl} className="rounded-full bg-ink px-3 py-1 font-mono text-xs text-cream">
              {pl}
            </span>
          ))}
          {p.tags.map((t) => (
            <span key={t} className="rounded-full border border-ink/30 px-3 py-1 font-mono text-xs">
              {t}
            </span>
          ))}
        </div>
        </div>
      </Reveal>

      <section className="mt-12">
        <Reveal>
          <h2 className="font-display mb-4 text-3xl md:text-4xl">What this project is</h2>
        </Reveal>
        <div className="space-y-4">
          {p.overview.map((para, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <p className="text-lg leading-8 text-ink-soft">{para}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <Reveal>
          <h2 className="font-display mb-5 text-3xl md:text-4xl">Key features</h2>
        </Reveal>
        <div className="grid gap-3 md:grid-cols-2">
          {p.features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 2) * 0.08}>
              <div className={`h-full rounded-xl border-2 border-ink p-5 shadow-[4px_4px_0_#0d1b2a] ${i % 2 ? "bg-ink text-cream" : "bg-cream"}`}>
                <div className="mb-1 flex items-center gap-2 font-bold">
                  <Check className="size-4 text-ember" /> {f.title}
                </div>
                <p className={`text-sm leading-6 ${i % 2 ? "text-cream/75" : "text-ink-soft"}`}>{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {p.flow && (
        <section className="mt-12">
          <Reveal>
            <h2 className="font-display mb-5 text-3xl md:text-4xl">How it works</h2>
          </Reveal>
          <ol className="space-y-3">
            {p.flow.map((step, i) => (
              <Reveal key={i} delay={i * 0.05} y={24}>
                <li className="flex gap-4 rounded-xl border-2 border-ink bg-cream p-4 shadow-[3px_3px_0_#0d1b2a]">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ember font-mono text-sm font-bold text-cream">
                    {i + 1}
                  </span>
                  <span className="leading-7">{step}</span>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>
      )}

      <Reveal>
        <section className="mt-12 rounded-xl border-2 border-ink bg-moss p-6 text-cream shadow-[5px_5px_0_#0d1b2a]">
          <div className="font-mono text-[11px] tracking-[0.25em] text-sun uppercase">Outcome</div>
          <p className="font-display mt-2 text-2xl leading-snug">{p.outcome}</p>
        </section>
      </Reveal>

      <section className="mt-14">
        <Reveal>
          <h2 className="font-display mb-5 text-3xl">More live work</h2>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2">
          {others.map((o, i) => (
            <Reveal key={o.slug} delay={i * 0.08}>
              <Link
                href={`/projects/${o.slug}`}
                className="group block overflow-hidden rounded-xl border-2 border-ink bg-cream shadow-[4px_4px_0_#0d1b2a] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#0d1b2a]"
              >
                <div className="relative h-44 overflow-hidden border-b-2 border-ink">
                  <Image src={o.image} alt={o.title} fill className="object-cover transition group-hover:scale-105" sizes="50vw" />
                </div>
                <div className="p-5">
                  <div className="font-display text-xl">{o.title}</div>
                  <div className="mt-1 font-mono text-xs text-ink-soft">{o.client} — {o.year}</div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
