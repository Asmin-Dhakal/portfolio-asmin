"use client";

import { openContactModal } from "./ContactModal";

export default function HireButton({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <button onClick={() => openContactModal()} className={className}>
      {label}
    </button>
  );
}
