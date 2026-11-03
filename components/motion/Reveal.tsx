"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cx } from "@/components/ui";

/* ---------------------------------------------------------------
   Reveal-on-scroll.

   An IntersectionObserver and two CSS custom states, not an
   animation library: the whole behaviour is "fade and rise once,
   then stop caring", and a dependency for that would cost more in
   bundle than it saves in code.

   Three things it gets right that a naive version does not:

   · It disconnects after firing. These never animate out, so an
     observer left attached is a scroll-time cost for nothing.
   · It honours `prefers-reduced-motion` by showing immediately,
     because the hidden state is authored in CSS and would otherwise
     strand the content invisible.
   · Content is visible without JavaScript. The hidden state is set
     in the markup for the animation to be possible at all, so
     layout.tsx carries a <noscript> override — otherwise a crawler
     or a reader with JS off gets a blank page.
   --------------------------------------------------------------- */

export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  /** Stagger, in ms. Use for siblings in a row, not for single blocks. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    /* Already in view on load (above the fold, or a deep link that
       landed mid-page): show it without waiting for a scroll. */
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        io.disconnect();
      },
      /* Fires a little before the element is fully in view, so the
         movement finishes as it settles rather than starting late. */
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={shown ? "in" : "out"}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cx("reveal", className)}
    >
      {children}
    </div>
  );
}
