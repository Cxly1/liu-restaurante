"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { MapPinIcon, PhoneIcon, ClockIcon } from "@phosphor-icons/react";
import { MagneticButton } from "./magnetic-button";
import { info, reserveImage } from "@/lib/data";

export function ReserveFooter() {
  const reduce = usePrefersReducedMotion();
  const fade = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <>
      <section id="reservar" className="border-t border-porcelain/10">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-5 py-28 md:grid-cols-2 md:gap-16 md:px-10 md:py-36">
          <motion.div
            {...fade()}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-porcelain/10 md:order-2 md:aspect-[4/5]"
          >
            <Image
              src={reserveImage.img}
              alt={reserveImage.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>

          <div className="md:order-1">
            <motion.h2
              {...fade()}
              className="font-display text-4xl font-bold tracking-tighter text-porcelain md:text-6xl"
            >
              La mesa ya está caliente
            </motion.h2>

            <motion.dl {...fade(0.1)} className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <ClockIcon size={22} weight="bold" className="mt-1 shrink-0 text-laca" />
                <div>
                  <dt className="sr-only">Horario</dt>
                  {info.hours.map((h) => (
                    <dd key={h.days} className="text-porcelain">
                      <span className="font-semibold">{h.days}:</span>{" "}
                      <span className="text-porcelain-dim">{h.time}</span>
                    </dd>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPinIcon size={22} weight="bold" className="mt-1 shrink-0 text-laca" />
                <div>
                  <dt className="sr-only">Dirección</dt>
                  <dd className="text-porcelain">{info.address}</dd>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <PhoneIcon size={22} weight="bold" className="mt-1 shrink-0 text-laca" />
                <div>
                  <dt className="sr-only">Teléfono</dt>
                  <dd className="text-porcelain">{info.phone}</dd>
                </div>
              </div>
            </motion.dl>

            <motion.div {...fade(0.2)} className="mt-10">
              <MagneticButton
                href={`tel:+52${info.phone.replace(/\s/g, "")}`}
              >
                Reservar mesa
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="border-t border-porcelain/10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-4 px-5 py-10 md:flex-row md:items-center md:px-10">
          <p className="font-display text-lg font-bold text-porcelain">
            LIÚ <span className="font-hanzi text-laca">流</span>
          </p>
          <p className="text-sm text-porcelain-dim">
            Cocina china de fuego en la Roma. Sitio demo.
          </p>
          <p className="text-sm text-porcelain-dim">© 2026 LIÚ</p>
        </div>
      </footer>
    </>
  );
}
