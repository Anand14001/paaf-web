"use client";

import { useSyncExternalStore } from "react";

/* ---------------------------------------------------------------
   Does this visitor want motion kept to a minimum?

   `useSyncExternalStore` rather than `useEffect` + state because the
   setting can change mid-session (macOS and Windows both let you
   toggle it without reloading) and because it gives a defined server
   snapshot instead of a hydration mismatch.

   The server snapshot is `false` — motion allowed. It has to assume
   something, and assuming "allowed" means the smooth-scroll options
   are the ones that render on the server; a visitor who has asked for
   reduced motion gets the swap on hydrate, one frame in, before they
   have scrolled anywhere.
   --------------------------------------------------------------- */

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
