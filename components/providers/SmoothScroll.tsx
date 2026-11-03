"use client";

import { ReactLenis } from "lenis/react";
import { useMemo, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

/* ---------------------------------------------------------------
   Smooth scrolling, site-wide.

   `root` mode renders its children straight through — no wrapper
   div, no extra stacking context — so this can wrap the whole app
   without disturbing the sticky header, the curved section edges or
   the ring carousel's own isolation. It is a provider rather than a
   sibling because the header needs `useLenis()` to freeze the page
   behind the mobile sheet, and a sibling would be outside context.

   Three deliberate settings:

   · `syncTouch` stays OFF. Lenis can drive touch too, but emulated
     momentum on iOS is worse than the real thing, and this is a site
     buyers will open on a phone in a warehouse. Pointer devices get
     the smoothing; touch keeps its native physics.

   · `anchors.offset` is 0, and that is measured rather than assumed.
     The floating header's clearance already comes from
     `scroll-padding-top` in globals.css, which is honoured before
     Lenis animates. Setting the offset to -96 to "match" it
     double-counted: a same-page anchor landed 192px down instead of
     96. Zero here means Lenis glides to the same place the native
     behaviour would have jumped to.

   · Reduced motion turns the smoothing off rather than unmounting
     Lenis. Unmounting would swap the tree and remount every client
     component below it; this keeps anchor handling and loses only the
     easing, which is the part that causes the problem.
   --------------------------------------------------------------- */

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();

  const options = useMemo(
    () => ({
      /* Slightly tighter than the 0.1 default: at 0.1 a long page
         keeps gliding after the wheel stops, which reads as lag
         rather than polish on text-heavy sections. */
      lerp: reduced ? 1 : 0.12,
      smoothWheel: !reduced,
      syncTouch: false,
      anchors: { offset: 0, duration: reduced ? 0 : undefined },
      autoRaf: true,
    }),
    [reduced],
  );

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
}
