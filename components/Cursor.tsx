"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(!!t.closest?.("a, button"));
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* trailing ring */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed top-0 left-0 z-[100]"
      >
        <motion.div
          animate={{
            scale: pressed ? 0.8 : hovering ? 2 : 1,
            backgroundColor: hovering ? "rgba(65,90,119,0.12)" : "rgba(65,90,119,0)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="rounded-full border-2 border-ember"
          style={{ width: 34, height: 34, marginLeft: -17, marginTop: -17 }}
        />
      </motion.div>
      {/* dot follows instantly */}
      <motion.div style={{ x, y }} className="pointer-events-none fixed top-0 left-0 z-[100]">
        <div
          className="rounded-full bg-ember"
          style={{ width: 7, height: 7, marginLeft: -3.5, marginTop: -3.5 }}
        />
      </motion.div>
    </>
  );
}
