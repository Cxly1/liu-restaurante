"use client";

import { useEffect, useState } from "react";

/*
  El useReducedMotion de Motion devuelve el valor real desde el primer render
  del cliente, pero el servidor no lo conoce: si el usuario tiene reduced
  motion activo, el HTML no coincide y truena la hidratación. Este hook
  devuelve false hasta despues de montar, de modo que servidor y primer
  render del cliente siempre coinciden.
*/
export function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduce(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduce;
}
