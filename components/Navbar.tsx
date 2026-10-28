"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { openContactModal } from "./ContactModal";
import { site } from "@/data/site";

const links = [
  { label: "Work", href: "#work-head" },
  { label: "Services", href: "#services" },
  { label: "Deploy", href: "#deploy" },
  { label: "Story", href: "#story" },
  { label: "All projects", href: "/projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const prev = useRef(0);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setHidden(y > prev.current && y > 220);
    prev.current = y;
  });

  useEffect(() => {
    if (!menuOpen) return;

    const root = document.documentElement;
    const body = document.body;
    const rootBefore = root.style.overflow;
    const bodyBefore = body.style.overflow;
    root.style.overflow = "hidden";
    body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const mq = window.matchMedia("(min-width: 768px)");
    const onDesktop = () => mq.matches && setMenuOpen(false);

    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onDesktop);

    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onDesktop);
      root.style.overflow = rootBefore;
      body.style.overflow = bodyBefore;
    };
  }, [menuOpen]);

  const startProject = () => {
    setMenuOpen(false);
    setTimeout(() => openContactModal(), 250);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMenuOpen(false);
    if (!href.startsWith("#")) return;
    e.preventDefault();
    e.stopPropagation();
    setTimeout(() => {
      document
        .querySelector(href)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 260);
  };

  return (
    <>
      <motion.header
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, y: hidden && !menuOpen ? "-130%" : "0%" }}
        transition={{
          scale: { type: "spring", stiffness: 260, damping: 22 },
          opacity: { duration: 0.25 },
          y: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
        }}
        className="fixed inset-x-0 top-[max(0.75rem,env(safe-area-inset-top))] z-50 flex justify-center px-4 md:top-5"
      >
        <nav className="flex w-full max-w-3xl items-center justify-between gap-2 rounded-full border border-cream/15 bg-ink/70 py-2 pr-1.5 pl-4 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:pr-2 sm:pl-5">
          <Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <span className="grid size-8 place-items-center rounded-full bg-sun font-cond text-lg text-ink">
              A
            </span>
            <span className="font-mono text-sm font-bold tracking-tight text-cream">
              asmin<span className="text-sun">.dev</span>
            </span>
          </Link>
          <span className="hidden font-mono text-[11px] tracking-[0.25em] text-cream/50 uppercase sm:inline">
            folio ’26 — KTM
          </span>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => openContactModal()}
              className="group inline-flex items-center gap-1.5 rounded-full bg-cream px-3 py-2.5 font-mono text-xs font-bold tracking-widest text-ink uppercase transition hover:bg-sun sm:px-4 sm:py-2"
            >
              Hire me
              <ArrowUpRight className="size-4 transition group-hover:rotate-45" />
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="grid size-10 place-items-center rounded-full border border-cream/20 text-cream transition hover:bg-cream/10 md:hidden"
            >
              {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </nav>
        {/* scroll progress hairline */}
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="absolute -bottom-2 left-1/2 h-[2px] w-2/3 origin-center rounded-full bg-sun"
        />
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-ink/95 pt-[calc(4.5rem+env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden"
          >
            <motion.nav
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{ show: { transition: { staggerChildren: 0.05 } } }}
              className="mx-auto flex min-h-full w-full max-w-lg flex-col px-6"
            >
              <ul className="flex-1">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    variants={{
                      hidden: { opacity: 0, y: 18 },
                      show: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={l.href}
                      onClick={(e) => handleNavClick(e, l.href)}
                      className="group flex items-baseline justify-between gap-4 border-b border-cream/15 py-4"
                    >
                      <span className="font-cond text-4xl tracking-wide text-cream uppercase transition group-hover:text-sun">
                        {l.label}
                      </span>
                      <span className="font-mono text-[11px] tracking-widest text-sun">
                        0{i + 1}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8"
              >
                <button
                  onClick={startProject}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-sun px-6 py-4 font-mono text-sm font-bold tracking-widest text-ink uppercase"
                >
                  Start a project <ArrowUpRight className="size-4" />
                </button>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-3 block text-center font-mono text-xs tracking-widest break-all text-cream/60 uppercase"
                >
                  {site.email}
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
