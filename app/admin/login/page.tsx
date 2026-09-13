"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setErr(data.error ?? "Login failed");
      setLoading(false);
      return;
    }
    router.push("/admin");
    router.refresh();
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-5 py-16">
      <div className="rounded-2xl border-2 border-ink bg-cream p-6 shadow-[6px_6px_0_#0d1b2a]">
        <div className="font-mono text-[11px] tracking-[0.25em] text-ember uppercase">Admin — sign in</div>
        <h1 className="font-cond mt-2 text-3xl uppercase">Portfolio inbox</h1>
        <p className="mt-2 text-sm leading-6 text-ink-soft">Enter the admin password set in Vercel env.</p>
        <form onSubmit={submit} className="mt-5 space-y-3">
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Password"
            className="w-full rounded-xl border-2 border-ink bg-paper px-4 py-3 font-mono text-sm outline-none focus:bg-white"
            autoFocus
          />
          {err && <div className="rounded-lg bg-ember/10 px-3 py-2 text-sm text-ember">{err}</div>}
          <button
            disabled={loading || !pw}
            className="w-full rounded-full border-2 border-ink bg-ink px-6 py-3 font-mono text-sm font-bold tracking-widest text-cream uppercase shadow-[4px_4px_0_#415a77] disabled:opacity-40"
          >
            {loading ? "Checking…" : "Enter"}
          </button>
        </form>
      </div>
    </main>
  );
}
