import { stack } from "@/data/content";

export default function Marquee() {
  const row = [...stack, ...stack];
  return (
    <section className="overflow-hidden border-y-2 border-ink bg-ember py-3">
      <div className="mask-fade-x overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-6 pr-6">
          {row.map((s, i) => (
            <span key={i} className="flex items-center gap-6 font-mono text-sm font-bold tracking-[0.15em] whitespace-nowrap text-cream uppercase">
              {s}
              <svg viewBox="0 0 20 20" className="size-4 fill-sun">
                <path d="M10 0l2.4 7.6L20 10l-7.6 2.4L10 20l-2.4-7.6L0 10l7.6-2.4z" />
              </svg>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
