"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeading } from "./ui";

function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [5, -5]), { stiffness: 180, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-5, 5]), { stiffness: 180, damping: 20 });

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
        ref.current?.style.setProperty("--mx", `${e.clientX - r.left}px`);
        ref.current?.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      onMouseLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      className={`group relative overflow-hidden rounded-2xl border-2 border-ink bg-cream shadow-[5px_5px_0_#0d1b2a] ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(65,90,119,0.16), transparent 65%)",
        }}
      />
      {children}
    </motion.div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 44, filter: "blur(6px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 md:py-28">
      <SectionHeading
        index="02"
        title={<>One dev, <span className="text-ember">the whole loop</span></>}
        desc="Design, code, CMS, release, hosting. You get a partner for idea → launch → year two."
      />

      <div className="grid gap-5 lg:grid-cols-5">
        {/* big card — CMS */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} custom={0} className="lg:col-span-3">
          <TiltCard className="h-full p-7 md:p-9">
            <div className="relative">
              <span className="font-display text-6xl text-ink/10 md:text-7xl">01</span>
              <h3 className="font-cond -mt-4 text-3xl tracking-wide uppercase md:text-4xl">
                Websites with a CMS
              </h3>
              <p className="mt-3 max-w-md leading-7 text-ink-soft">
                Marketing sites and platforms your team can actually edit — destinations,
                events, blogs, galleries, all in an admin panel. No developer needed for
                Tuesday&apos;s update.
              </p>
              {/* mini admin mock */}
              <div className="mt-6 overflow-hidden rounded-xl border-2 border-ink bg-paper">
                <div className="flex items-center gap-1.5 border-b-2 border-ink px-3 py-2">
                  <span className="size-2.5 rounded-full bg-ember" />
                  <span className="size-2.5 rounded-full bg-ink/20" />
                  <span className="size-2.5 rounded-full bg-ink/20" />
                  <span className="ml-2 font-mono text-[10px] tracking-widest text-ink-soft uppercase">
                    admin — pages
                  </span>
                </div>
                {["Homepage hero", "Destinations", "Events calendar", "Blog posts"].map((row, i) => (
                  <div key={row} className="flex items-center justify-between border-b border-ink/10 px-4 py-2.5 text-sm last:border-0">
                    <span className="font-medium">{row}</span>
                    <motion.span
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.18 }}
                      className="rounded-full bg-moss px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-widest text-cream uppercase"
                    >
                      live
                    </motion.span>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Next.js + TypeScript", "Custom CMS / admin", "SEO + analytics"].map((pt) => (
                  <span key={pt} className="rounded-full border border-ink/25 px-3 py-1 font-mono text-[11px] tracking-wide uppercase">
                    {pt}
                  </span>
                ))}
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* right column */}
        <div className="grid gap-5 lg:col-span-2">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} custom={1}>
            <TiltCard className="bg-ink p-7 text-cream">
              <span className="font-display text-6xl text-cream/15">02</span>
              <h3 className="font-cond -mt-4 text-2xl tracking-wide uppercase md:text-3xl">
                Mobile apps that ship
              </h3>
              <p className="mt-3 text-sm leading-7 text-cream/70">
                Flutter apps for Android (and iOS) — published to the Play Store with
                signing, listings, staged rollouts and crash monitoring handled.
              </p>
              {/* mini phone */}
              <div className="mx-auto mt-5 w-32 rounded-[1.4rem] border-2 border-cream/70 bg-ink p-1.5">
                <div className="space-y-1.5 rounded-[1rem] bg-cream/10 p-2.5">
                  {[80, 60, 70].map((w, i) => (
                    <motion.div
                      key={i}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.15, duration: 0.6, ease: "easeOut" }}
                      className="h-2.5 origin-left rounded-full bg-sun"
                      style={{ width: `${w}%` }}
                    />
                  ))}
                  <div className="pt-1 text-center font-mono text-[9px] tracking-widest text-cream/60 uppercase">
                    build passing ✓
                  </div>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Flutter + Dart", "Play Store release", "Push + offline-first"].map((pt) => (
                  <span key={pt} className="rounded-full border border-cream/25 px-3 py-1 font-mono text-[11px] tracking-wide uppercase">
                    {pt}
                  </span>
                ))}
              </div>
            </TiltCard>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} custom={2}>
            <TiltCard className="p-7">
              <span className="font-display text-6xl text-ink/10">03</span>
              <h3 className="font-cond -mt-4 text-2xl tracking-wide uppercase md:text-3xl">
                Backends & the boring magic
              </h3>
              <p className="mt-3 text-sm leading-7 text-ink-soft">
                APIs, databases, QR systems, photo-proof flows — plus hosting, domains,
                DNS, SSL, backups and monitoring.
              </p>
              <div className="mt-4 rounded-lg border border-ink/20 bg-ink p-3 font-mono text-[11px] leading-5 text-cream/85">
                <div><span className="text-sun">$</span> deploy --prod</div>
                <div className="text-emerald-300">✓ live in 47s — uptime 99.99%</div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {["NestJS + Prisma", "Docker + CI/CD", "Uptime + backups"].map((pt) => (
                  <span key={pt} className="rounded-full border border-ink/25 px-3 py-1 font-mono text-[11px] tracking-wide uppercase">
                    {pt}
                  </span>
                ))}
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>

      <Reveal delay={0.1}>
        <a
          href="#contact"
          className="group mt-6 flex items-center justify-between rounded-2xl border-2 border-dashed border-ink/40 px-6 py-5 transition hover:border-ink hover:bg-sun/20"
        >
          <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase">
            Not sure which one you need? Describe it — I&apos;ll scope it free.
          </span>
          <ArrowUpRight className="size-5 shrink-0 transition group-hover:rotate-45 group-hover:text-ember" />
        </a>
      </Reveal>
    </section>
  );
}
