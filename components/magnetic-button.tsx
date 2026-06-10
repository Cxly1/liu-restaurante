"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
  className?: string;
};

export function MagneticButton({
  href,
  children,
  variant = "solid",
  className = "",
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = usePrefersReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduce || !ref.current || e.pointerType !== "mouse") return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };

  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  const skin =
    variant === "solid"
      ? "bg-laca text-porcelain-bright hover:bg-laca-deep"
      : "border border-porcelain/25 text-porcelain hover:border-porcelain/60";

  return (
    <motion.a
      ref={ref}
      href={href}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ x: sx, y: sy }}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 py-3.5 font-body text-sm font-semibold tracking-wide transition-colors duration-300 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-laca ${skin} ${className}`}
    >
      {children}
    </motion.a>
  );
}
