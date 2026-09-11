"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Send, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";

export function openContactModal() {
  window.dispatchEvent(new CustomEvent("open-contact"));
}

const inputCls =
  "w-full rounded-xl border-2 border-ink bg-cream px-4 py-2.5 text-sm font-medium outline-none transition placeholder:text-ink/35 focus:bg-white focus:shadow-[3px_3px_0_#0d1b2a]";

export default function ContactModal() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", type: "Website", message: "" });

  useEffect(() => {
    const show = () => {
      setSent(false);
      setOpen(true);
    };
    window.addEventListener("open-contact", show);
    return () => window.removeEventListener("open-contact", show);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    if (open) {
      window.addEventListener("keydown", onKey);
      document.documentElement.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open ]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Project inquiry — ${form.type} (${form.name})`;
    const body = `Hi Asmin,\n\n${form.message}\n\n— ${form.name} (${form.email})`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const valid =
    form.name.trim().length > 1 &&
    /.+@.+\..+/.test(form.email) &&
    form.message.trim().length > 5;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[120] grid place-items-center overflow-y-auto bg-ink/60 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative my-8 w-full max-w-lg overflow-hidden rounded-2xl border-2 border-ink bg-paper shadow-[8px_8px_0_#0d1b2a]"
          >
            <div className="flex items-center justify-between border-b-2 border-ink bg-sun/30 px-6 py-4">
              <div className="font-mono text-[11px] font-bold tracking-[0.25em] uppercase">
                Start a project
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="grid size-9 place-items-center rounded-full border-2 border-ink bg-cream transition hover:rotate-90 hover:bg-ember hover:text-cream"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="p-6">
              {sent ? (
                <div className="py-6 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 16 }}
                    className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-400 font-mono text-2xl font-bold text-ink"
                  >
                    ✓
                  </motion.div>
                  <div className="font-cond mt-4 text-3xl tracking-wide uppercase">
                    Opening your mail app
                  </div>
                  <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-ink-soft">
                    Your message is composed — just hit send. Prefer Fiverr?{" "}
                    <a href={site.fiverr} target="_blank" rel="noreferrer" className="font-bold text-ember underline">
                      Order there ↗
                    </a>
                  </p>
                  <button
                    onClick={() => setOpen(false)}
                    className="mt-5 rounded-full border-2 border-ink bg-cream px-6 py-2.5 font-mono text-xs font-bold tracking-widest uppercase"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-3.5">
                  <div className="grid gap-3.5 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block font-mono text-[11px] font-bold tracking-widest uppercase">
                        Your name *
                      </span>
                      <input
                        value={form.name}
                        onChange={set("name")}
                        placeholder="Jane Cooper"
                        className={inputCls}
                        autoComplete="name"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block font-mono text-[11px] font-bold tracking-widest uppercase">
                        Email *
                      </span>
                      <input
                        value={form.email}
                        onChange={set("email")}
                        placeholder="jane@company.com"
                        type="email"
                        className={inputCls}
                        autoComplete="email"
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className="mb-1.5 block font-mono text-[11px] font-bold tracking-widest uppercase">
                      I need
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {["Website", "Mobile app", "Deploy", "Other"].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, type: t }))}
                          className={`rounded-full border-2 px-4 py-1.5 font-mono text-xs font-bold tracking-wide uppercase transition ${
                            form.type === t
                              ? "border-ink bg-ink text-cream"
                              : "border-ink/25 bg-cream hover:border-ink"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block font-mono text-[11px] font-bold tracking-widest uppercase">
                      Project details *
                    </span>
                    <textarea
                      value={form.message}
                      onChange={set("message")}
                      placeholder="What should go live? Timeline, must-haves…"
                      rows={4}
                      className={`${inputCls} resize-none`}
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={!valid}
                    className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-ink bg-ink px-6 py-3.5 font-mono text-sm font-bold tracking-widest text-cream uppercase shadow-[4px_4px_0_#415a77] transition enabled:hover:translate-x-[2px] enabled:hover:translate-y-[2px] enabled:hover:shadow-[2px_2px_0_#415a77] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Send className="size-4" /> Send inquiry
                  </button>
                </form>
              )}

              {!sent && (
                <div className="mt-5 flex items-center justify-between border-t-2 border-dashed border-ink/20 pt-4 font-mono text-[11px] tracking-widest uppercase">
                  <button onClick={copy} className="inline-flex items-center gap-1.5 transition hover:text-ember">
                    {copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
                    {copied ? "Copied!" : site.email}
                  </button>
                  <a href={site.fiverr} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 transition hover:text-ember">
                    Fiverr ↗ <ArrowUpRight className="size-3.5" />
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
