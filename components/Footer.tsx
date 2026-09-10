import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-paper">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-5 font-mono text-[11px] tracking-widest text-ink-soft uppercase md:flex-row">
        <span>
          © 2026 {site.name} — set in serif &amp; grotesk
        </span>
        <span className="hidden md:inline">web • flutter • docker • aws • vercel</span>
        <span className="flex gap-4">
          <a href={site.github} target="_blank" rel="noreferrer" className="transition hover:text-ember">
            github
          </a>
          <a href={site.fiverr} target="_blank" rel="noreferrer" className="transition hover:text-ember">
            fiverr
          </a>
          <a href={`mailto:${site.email}`} className="transition hover:text-ember">
            email
          </a>
        </span>
      </div>
    </footer>
  );
}
