"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton({
  fallback = "/projects",
  label = "Back",
}: {
  fallback?: string;
  label?: string;
}) {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        if (window.history.length > 1) router.back();
        else router.push(fallback);
      }}
      className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-cream px-4 py-2 font-mono text-xs font-bold tracking-widest uppercase shadow-[3px_3px_0_#0d1b2a] transition hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0d1b2a]"
    >
      <ArrowLeft className="size-4" /> {label}
    </button>
  );
}
