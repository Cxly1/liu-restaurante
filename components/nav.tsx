"use client";

import { useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";

const links = [
  { label: "Platos", href: "#platos" },
  { label: "Menú", href: "#menu" },
  { label: "Preguntas", href: "#preguntas" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled((prev) => (v > 24 ? true : v <= 24 ? false : prev));
  });

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled
          ? "nav-glass border-b border-porcelain/10"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:px-10">
        <a
          href="#inicio"
          className="font-display text-xl font-bold tracking-tight text-porcelain"
        >
          LIÚ <span className="font-hanzi text-laca">流</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-porcelain-dim transition-colors duration-300 hover:text-porcelain"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#reservar"
          className="rounded-full bg-laca px-5 py-2 text-sm font-semibold text-porcelain-bright transition-colors duration-300 hover:bg-laca-deep active:scale-[0.98]"
        >
          Reservar mesa
        </a>
      </nav>
    </header>
  );
}
