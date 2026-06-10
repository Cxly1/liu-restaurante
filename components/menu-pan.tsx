"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { menuDishes } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export function MenuPan() {
  const wrap = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const hanzi = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !wrap.current || !track.current) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const distance = () => track.current!.scrollWidth - window.innerWidth;
      gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      // El hanzi de fondo viaja más lento: capa de profundidad
      gsap.to(hanzi.current, {
        x: () => -distance() * 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    });
    return () => mm.revert();
  }, [reduce]);

  return (
    <section id="menu" ref={wrap} className="relative overflow-hidden">
      <span
        ref={hanzi}
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-[55vw] hidden -translate-y-1/2 select-none font-hanzi text-[65dvh] leading-none text-laca/8 md:block"
      >
        香
      </span>

      <div
        ref={track}
        className={`flex snap-x snap-mandatory items-stretch gap-5 overflow-x-auto px-5 py-24 md:px-10 ${
          reduce
            ? ""
            : "md:h-[100dvh] md:snap-none md:items-center md:overflow-visible md:py-0"
        }`}
      >
        <div className="flex w-[78vw] shrink-0 snap-start flex-col justify-center md:w-[420px]">
          <h2 className="font-display text-4xl font-bold tracking-tighter text-porcelain md:text-6xl">
            Menú para compartir
          </h2>
          <p className="mt-5 max-w-sm leading-relaxed text-porcelain-dim">
            Todo llega al centro de la mesa cuando está listo. El menú completo
            cambia con la temporada.
          </p>
        </div>

        {menuDishes.map((dish) => (
          <article
            key={dish.name}
            className="group relative w-[74vw] shrink-0 snap-start overflow-hidden rounded-2xl bg-ink-2 ring-1 ring-porcelain/10 sm:w-[340px] md:w-[360px]"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={dish.img}
                alt={dish.alt}
                fill
                sizes="(max-width: 768px) 74vw, 360px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
            </div>
            <div className="flex flex-col gap-2 p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-xl font-bold tracking-tight text-porcelain">
                  {dish.name}
                </h3>
                <span aria-hidden className="font-hanzi text-2xl text-laca">
                  {dish.hanzi}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-porcelain-dim">
                {dish.desc}
              </p>
              <p className="mt-1 font-display text-lg font-bold text-porcelain">
                {dish.price}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
