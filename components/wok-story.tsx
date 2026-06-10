"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { storyImages } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

/*
  Zoom parallax con pin: la seccion se fija y el fuego se acerca como si
  entraras a la cocina; el texto llega cuando el scrim ya da contraste.
  Sin GSAP (reduced motion) la seccion queda estatica y completa.
*/
export function WokStory() {
  const ref = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (reduce || !ref.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      tl.fromTo(
        ".wok-fire",
        { scale: 0.62, borderRadius: 28 },
        { scale: 1, borderRadius: 0, ease: "none", duration: 0.45 },
        0,
      )
        .fromTo(
          ".wok-scrim",
          { opacity: 0.1 },
          { opacity: 0.62, ease: "none", duration: 0.5 },
          0.12,
        )
        .fromTo(
          ".wok-hands",
          { yPercent: 40 },
          { yPercent: -28, ease: "none", duration: 1 },
          0,
        )
        .fromTo(
          ".wok-text",
          { opacity: 0, y: 56, filter: "blur(14px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", ease: "none", duration: 0.32 },
          0.52,
        );
    }, ref);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      ref={ref}
      className="relative flex h-[100dvh] items-center justify-center overflow-hidden"
    >
      <div className="wok-fire absolute inset-0 overflow-hidden">
        <Image
          src={storyImages.fire.img}
          alt={storyImages.fire.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="wok-scrim absolute inset-0 bg-ink"
          style={{ opacity: 0.55 }}
        />
      </div>

      <figure className="wok-hands absolute bottom-[10dvh] left-5 hidden w-56 overflow-hidden rounded-2xl ring-1 ring-porcelain/15 lg:block xl:left-16">
        <Image
          src={storyImages.hands.img}
          alt={storyImages.hands.alt}
          width={448}
          height={560}
          className="object-cover"
        />
      </figure>

      <div className="wok-text relative z-10 mx-auto max-w-2xl px-5 text-center">
        <h2 className="font-display text-4xl font-bold tracking-tighter text-porcelain md:text-6xl">
          Primero fue el fuego
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-porcelain/90">
          El wok se enciende una hora antes de abrir y no descansa hasta que
          cierra la cocina. Cada salteado dura segundos.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-porcelain/90">
          Por eso el <em className="font-semibold">wok hei</em>, el aliento
          del wok, no se puede fingir. Se respira desde la banqueta.
        </p>
      </div>
    </section>
  );
}
