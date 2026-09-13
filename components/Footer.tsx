"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { site } from "@/data/site";

function useKathmanduTime() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const tick = () => {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Kathmandu",
        }).format(new Date())
      );
    };
    tick();
    const id = setInterval(tick, 20000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const nav = [
  { label: "Work", href: "#work-head" },
  { label: "Services", href: "#services" },
  { label: "Story", href: "#story" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const time = useKathmanduTime();

  return (
    <footer className="border-t-2 border-ink bg-paper">
      <div className="mx-auto max-w-7xl px-5 pt-12 pb-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="grid size-10 -rotate-3 place-items-center rounded-md border-2 border-ink bg-sun font-display text-2xl text-ink shadow-[2px_2px_0_#0d1b2a]">
                A
              </span>
              <span className="font-mono text-base font-bold tracking-tight">
                asmin<span className="text-ember">.dev</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-6 text-ink-soft">
              Full-stack developer — websites, Flutter apps and the servers they
              live on. Kathmandu, working worldwide.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-cream px-3.5 py-1.5 font-mono text-[11px] font-bold tracking-widest uppercase">
              <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
              KTM {time} — open for work
            </div>
          </div>

          <div>
            <div className="font-mono text-[11px] tracking-[0.25em] text-ink-soft uppercase">Sitemap</div>
            <ul className="mt-3 space-y-2 font-mono text-sm">
              {nav.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition hover:text-ember hover:underline hover:decoration-2 hover:underline-offset-4">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="/projects" className="transition hover:text-ember hover:underline hover:decoration-2 hover:underline-offset-4">
                  All projects
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-mono text-[11px] tracking-[0.25em] text-ink-soft uppercase">Elsewhere</div>
            <ul className="mt-3 space-y-2 font-mono text-sm">
              <li><a href={site.github} target="_blank" rel="noreferrer" className="transition hover:text-ember">GitHub ↗</a></li>
              <li><a href={site.fiverr} target="_blank" rel="noreferrer" className="transition hover:text-ember">Fiverr ↗</a></li>
              <li><a href={site.linkedin} target="_blank" rel="noreferrer" className="transition hover:text-ember">LinkedIn ↗</a></li>
            </ul>
          </div>

          <div>
            <div className="font-mono text-[11px] tracking-[0.25em] text-ink-soft uppercase">Contact</div>
            <a href={`mailto:${site.email}`} className="mt-3 block font-bold break-all transition hover:text-ember">
              {site.email}
            </a>
            <a
              href="#top"
              className="group mt-4 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-cream px-4 py-2 font-mono text-[11px] font-bold tracking-widest uppercase shadow-[3px_3px_0_#0d1b2a] transition hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0d1b2a]"
            >
              Top <ArrowUp className="size-3.5 transition group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t-2 border-ink pt-5 font-mono text-[11px] tracking-widest text-ink-soft uppercase md:flex-row">
          <span>© 2026 Asmin Dhakal — All rights reserved</span>
          <span className="hidden md:inline">Designed, built & deployed by hand</span>
          <span>web • flutter • docker • aws • vercel</span>
        </div>
      </div>
    </footer>
  );
}
