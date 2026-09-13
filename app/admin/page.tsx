"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Copy, Check, Mail, LogOut, Trash2 } from "lucide-react";

type Inquiry = {
  id: string;
  name: string;
  email: string;
  type: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: string;
};

function StatusBadge({ s }: { s: string }) {
  const cls =
    s === "new" ? "bg-ember text-cream" : s === "read" ? "bg-sun text-ink" : "bg-moss text-cream";
  return <span className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-bold uppercase ${cls}`}>{s}</span>;
}

export default function AdminPage() {
  const [items, setItems] = useState<Inquiry[]>([]);
  const [filter, setFilter] = useState<"all" | "new" | "read" | "replied">("all");
  const [copied, setCopied] = useState<string | null>(null);
  const router = useRouter();

  const load = async () => {
    const res = await fetch("/api/admin/inquiries");
    if (res.status === 401) {
      router.push("/admin/login");
      return;
    }
    const data = await res.json();
    setItems(data.inquiries ?? []);
  };

  useEffect(() => {
    load();
  }, []);

  const patch = async (id: string, status: Inquiry["status"]) => {
    await fetch(`/api/admin/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  };

  const del = async (id: string) => {
    if (!confirm("Delete this inquiry?")) return;
    await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
    load();
  };

  const copy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const filtered = filter === "all" ? items : items.filter((x) => x.status === filter);
  const counts = {
    all: items.length,
    new: items.filter((x) => x.status === "new").length,
    read: items.filter((x) => x.status === "read").length,
    replied: items.filter((x) => x.status === "replied").length,
  };

  return (
    <main className="mx-auto max-w-6xl px-5 pt-28 pb-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-cond text-4xl uppercase">Inbox</h1>
          <p className="mt-1 font-mono text-xs text-ink-soft">
            {counts.all} total — {counts.new} new
          </p>
        </div>
        <button
          onClick={logout}
          className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-cream px-4 py-2 font-mono text-xs font-bold uppercase"
        >
          <LogOut className="size-4" /> Logout
        </button>
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
        {(["all", "new", "read", "replied"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 rounded-full border-2 px-4 py-1.5 font-mono text-xs font-bold uppercase ${
              filter === f ? "border-ink bg-ink text-cream" : "border-ink/20 bg-cream"
            }`}
          >
            {f} ({counts[f]})
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {filtered.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-ink/20 bg-cream p-8 text-center font-mono text-sm text-ink-soft">
            No inquiries{filter !== "all" ? ` with status "${filter}"` : ""} yet.
          </div>
        )}
        {filtered.map((inq) => (
          <div key={inq.id} className="rounded-2xl border-2 border-ink bg-cream p-5 shadow-[4px_4px_0_#0d1b2a]">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">{inq.name}</span>
                  <StatusBadge s={inq.status} />
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2 font-mono text-xs text-ink-soft">
                  <span>{inq.email}</span>
                  <span>•</span>
                  <span>{inq.type}</span>
                  <span>•</span>
                  <span>{new Date(inq.createdAt).toLocaleString()}</span>
                </div>
              </div>
              <div className="flex gap-1.5">
                {(["new", "read", "replied"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => patch(inq.id, s)}
                    className={`rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold uppercase ${
                      inq.status === s ? "border-ink bg-ink text-cream" : "border-ink/20 bg-paper"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <p className="mt-3 whitespace-pre-wrap rounded-xl bg-paper p-4 text-sm leading-7">{inq.message}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => copy(inq.email, inq.id)}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 bg-paper px-3 py-1.5 font-mono text-xs"
              >
                {copied === inq.id ? <Check className="size-3.5" /> : <Copy className="size-3.5" />} Copy email
              </button>
              <a
                href={`mailto:${inq.email}?subject=${encodeURIComponent(`Re: ${inq.type} inquiry`)}`}
                className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-ink px-3 py-1.5 font-mono text-xs font-bold text-cream"
              >
                <Mail className="size-3.5" /> Reply
              </a>
              <button
                onClick={() => del(inq.id)}
                className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-ember/30 px-3 py-1.5 font-mono text-xs text-ember"
              >
                <Trash2 className="size-3.5" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
