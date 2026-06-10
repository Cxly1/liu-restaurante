"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";

const words = [
  "Pato laqueado",
  "Dumplings",
  "Fuego de wok",
  "Fideos a mano",
  "Dim sum",
  "Té oolong",
];

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

function Strip() {
  return (
    <span className="flex shrink-0 items-baseline">
      {words.map((w) => (
        <span key={w} className="flex items-baseline">
          <span className="px-5 font-display text-5xl font-bold uppercase tracking-tight text-porcelain/25 md:text-7xl">
            {w}
          </span>
          <span className="font-hanzi text-3xl text-laca/70 md:text-5xl">
            流
          </span>
        </span>
      ))}
    </span>
  );
}

export function VelocityMarquee() {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 380 });
  const boost = useTransform(smooth, [-1200, 0, 1200], [-4, 0, 4], {
    clamp: false,
  });
  const direction = useRef(1);
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const b = boost.get();
    if (b < 0) direction.current = -1;
    else if (b > 0) direction.current = 1;
    const move = (direction.current * 1.6 + b) * (delta / 1000);
    baseX.set(baseX.get() + move);
  });

  return (
    <div aria-hidden className="overflow-hidden border-y border-porcelain/10 py-10 md:py-14">
      <motion.div style={{ x }} className="flex w-max whitespace-nowrap">
        <Strip />
        <Strip />
        <Strip />
        <Strip />
      </motion.div>
    </div>
  );
}
