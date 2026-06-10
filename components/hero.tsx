"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { MagneticButton } from "./magnetic-button";
import { heroImage } from "@/lib/data";

const letters = ["L", "I", "Ú"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // El plato gira como mesa lazy susan y se aleja; el hanzi flota a otra velocidad
  const plateRotate = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const plateScale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
  const plateY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const hanziY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const still = reduce ? { rotate: 0, scale: 1, y: 0 } : undefined;

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative flex min-h-[100dvh] items-center overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      {/* Hanzi gigante de fondo, capa lenta */}
      <motion.span
        aria-hidden
        style={still ?? { y: hanziY }}
        className="pointer-events-none absolute -right-[8vw] top-1/2 -translate-y-1/2 select-none font-hanzi text-[58vw] leading-none text-laca/10 md:text-[36vw]"
      >
        流
      </motion.span>

      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-12 px-5 pb-16 pt-24 md:grid-cols-[1.1fr_1fr] md:px-10 md:pb-0 md:pt-16">
        <motion.div style={still ?? { y: textY }}>
          <h1 className="font-display text-[clamp(4.5rem,14vw,11rem)] font-bold leading-[0.85] tracking-tighter text-porcelain">
            {letters.map((ch, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom">
                <motion.span
                  className="inline-block"
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.15 + i * 0.09,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {ch}
                </motion.span>
              </span>
            ))}
            <motion.span
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="ml-4 align-top font-hanzi text-[0.32em] font-black text-laca"
            >
              流
            </motion.span>
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-md text-lg leading-relaxed text-porcelain-dim"
          >
            Pato laqueado, dumplings plegados a mano y un wok que nunca
            descansa, en el corazón de la Roma.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="#reservar">Reservar mesa</MagneticButton>
            <MagneticButton href="#menu" variant="outline">
              Ver menú
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Plato hero: crop circular, rotación lazy-susan ligada al scroll */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={still ?? { y: plateY, scale: plateScale }}
          className="relative mx-auto aspect-square w-[78vw] max-w-[330px] md:w-full md:max-w-[520px]"
        >
          <motion.div
            style={still ?? { rotate: plateRotate }}
            className="absolute inset-0 overflow-hidden rounded-full ring-1 ring-porcelain/10"
          >
            <Image
              src={heroImage.img}
              alt={heroImage.alt}
              fill
              priority
              sizes="(max-width: 768px) 78vw, 520px"
              className="scale-[1.18] object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
