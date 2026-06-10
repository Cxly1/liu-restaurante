"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CaretDownIcon } from "@phosphor-icons/react";
import { faqs, info } from "@/lib/data";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section id="preguntas" className="border-t border-porcelain/10">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-5 py-28 md:grid-cols-[1fr_1.4fr] md:px-10 md:py-36">
        <div className="md:sticky md:top-28 md:self-start">
          <h2 className="font-display text-4xl font-bold tracking-tighter text-porcelain md:text-5xl">
            Preguntas frecuentes
          </h2>
          <p className="mt-5 max-w-xs leading-relaxed text-porcelain-dim">
            ¿Tienes otra duda? Llámanos al{" "}
            <a
              href={`tel:+52${info.phone.replace(/\s/g, "")}`}
              className="font-semibold text-porcelain underline decoration-laca decoration-2 underline-offset-4 hover:decoration-4"
            >
              {info.phone}
            </a>{" "}
            y te respondemos entre servicio y servicio.
          </p>
        </div>

        <ul>
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="border-b border-porcelain/10">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-laca"
                >
                  <span className="font-display text-lg font-bold tracking-tight text-porcelain md:text-xl">
                    {item.q}
                  </span>
                  <motion.span
                    animate={reduce ? undefined : { rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className={`shrink-0 ${isOpen ? "text-laca" : "text-porcelain-dim"}`}
                  >
                    <CaretDownIcon size={20} weight="bold" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={
                        reduce ? undefined : { height: 0, opacity: 0 }
                      }
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-6 leading-relaxed text-porcelain-dim">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
