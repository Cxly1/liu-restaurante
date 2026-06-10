"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { storyImages } from "@/lib/data";

export function WokStory() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // La imagen del fuego se acerca como si entraras a la cocina
  const fireScale = useTransform(scrollYProgress, [0, 0.55], [0.55, 1]);
  const fireRadius = useTransform(scrollYProgress, [0, 0.55], [32, 0]);
  const scrim = useTransform(scrollYProgress, [0.35, 0.7], [0.1, 0.62]);
  const handsY = useTransform(scrollYProgress, [0.3, 1], ["18%", "-26%"]);
  const textOpacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);
  const textBlur = useTransform(
    scrollYProgress,
    [0.55, 0.78],
    ["blur(14px)", "blur(0px)"],
  );
  const textY = useTransform(scrollYProgress, [0.55, 0.8], [48, 0]);

  return (
    <section ref={ref} className="relative h-[260dvh]">
      <div className="sticky top-0 flex h-[100dvh] items-center justify-center overflow-hidden">
        <motion.div
          style={
            reduce
              ? undefined
              : { scale: fireScale, borderRadius: fireRadius }
          }
          className="absolute inset-0 overflow-hidden"
        >
          <Image
            src={storyImages.fire.img}
            alt={storyImages.fire.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <motion.div
            aria-hidden
            style={reduce ? { opacity: 0.55 } : { opacity: scrim }}
            className="absolute inset-0 bg-ink"
          />
        </motion.div>

        <motion.figure
          style={reduce ? undefined : { y: handsY }}
          className="absolute bottom-[8dvh] left-5 hidden w-56 overflow-hidden rounded-2xl ring-1 ring-porcelain/15 lg:block xl:left-16"
        >
          <Image
            src={storyImages.hands.img}
            alt={storyImages.hands.alt}
            width={448}
            height={560}
            className="object-cover"
          />
        </motion.figure>

        <motion.div
          style={
            reduce
              ? undefined
              : { opacity: textOpacity, filter: textBlur, y: textY }
          }
          className="relative z-10 mx-auto max-w-2xl px-5 text-center"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
