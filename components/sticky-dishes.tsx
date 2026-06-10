"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { signatureDishes } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export function StickyDishes() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !ref.current) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".dish-card");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        // La card anterior se hunde en 3D mientras la siguiente la cubre
        gsap.to(card, {
          scale: 0.9,
          opacity: 0.35,
          rotateX: -7,
          transformPerspective: 1000,
          transformOrigin: "center top",
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1].parentElement,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section id="platos" className="relative">
      <div className="mx-auto max-w-[1400px] px-5 pb-8 pt-28 md:px-10">
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl font-display text-4xl font-bold tracking-tighter text-porcelain md:text-6xl"
        >
          Cuatro platos que nos definen
        </motion.h2>
      </div>

      <div ref={ref} className="relative">
        {signatureDishes.map((dish) => (
          <div
            key={dish.name}
            className="sticky top-0 flex min-h-[100dvh] items-center px-5 md:px-10"
          >
            <article className="dish-card mx-auto grid h-[78dvh] w-full max-w-[1400px] grid-cols-1 overflow-hidden rounded-2xl bg-ink-2 ring-1 ring-porcelain/10 md:grid-cols-[1.2fr_1fr]">
              <div className="relative min-h-[42%] md:min-h-full">
                <Image
                  src={dish.img}
                  alt={dish.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink-2/70 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-ink-2/80"
                />
              </div>

              <div className="relative flex flex-col justify-center gap-4 p-7 md:p-12">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-4 -top-8 select-none font-hanzi text-[9rem] leading-none text-laca/10 md:text-[13rem]"
                >
                  {dish.hanzi}
                </span>
                <h3 className="font-display text-3xl font-bold tracking-tight text-porcelain md:text-5xl">
                  {dish.name}
                </h3>
                <p className="max-w-sm leading-relaxed text-porcelain-dim">
                  {dish.desc}
                </p>
                <p className="mt-2 font-display text-2xl font-bold text-laca">
                  {dish.price}
                </p>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
