"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { testimonials } from "@/lib/data";

function TiltCard({
  quote,
  name,
  role,
  className = "",
}: (typeof testimonials)[number] & { className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 20 });
  const sry = useSpring(ry, { stiffness: 180, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(380px circle at ${mx}px ${my}px, rgb(200 55 45 / 0.12), transparent 70%)`;

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduce || !ref.current || e.pointerType !== "mouse") return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 12);
    rx.set((0.5 - py) * 10);
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  const onPointerLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.figure
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={
        reduce
          ? undefined
          : { rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }
      }
      className={`group/card relative flex flex-col justify-between gap-8 rounded-2xl bg-ink-2 p-8 ring-1 ring-porcelain/10 ${className}`}
    >
      {!reduce && (
        <motion.div
          aria-hidden
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        />
      )}
      <blockquote
        style={reduce ? undefined : { transform: "translateZ(24px)" }}
        className="text-lg leading-relaxed text-porcelain"
      >
        “{quote}”
      </blockquote>
      <figcaption
        style={reduce ? undefined : { transform: "translateZ(16px)" }}
      >
        <p className="font-display font-bold text-porcelain">{name}</p>
        <p className="text-sm text-porcelain-dim">{role}</p>
      </figcaption>
    </motion.figure>
  );
}

export function Testimonials() {
  const reduce = useReducedMotion();
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-28 md:px-10 md:py-40">
      <motion.h2
        initial={reduce ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl font-display text-4xl font-bold tracking-tighter text-porcelain md:text-6xl"
      >
        Lo que se dice en la mesa
      </motion.h2>

      <div
        className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3"
        style={{ perspective: "1100px" }}
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={reduce ? false : { opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.7,
              delay: i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={i === 1 ? "md:mt-14" : i === 2 ? "md:-mt-6" : ""}
          >
            <TiltCard {...t} className="h-full" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
