"use client";

import { useCallback, useEffect, useRef, type MouseEvent, type RefObject } from "react";

/* ---------------------------------------------------------------
   Horizontal drag and trackpad gesture for the process ring.

   Deliberately horizontal-only. Vertical wheel belongs to the page,
   and this section is taller than most viewports — if it rotated
   cards instead of scrolling, a reader could not get past it without
   the ring spinning at them. Lenis defaults `gestureOrientation` to
   vertical, so horizontal deltas arrive here untouched and the two
   never contend for the same event.

   Reduced motion does NOT turn this off. The setting is about
   animation, not input, and globals.css already drops the card
   transition to 1ms — so a step is instant rather than absent.

   The two inputs are rate-limited differently, because they are
   different gestures:

   · DRAG is direct manipulation. Distance decides: every
     DRAG_PER_STEP of travel is one card, and no clock is involved.
     The reader cannot outrun it, because they have to physically
     move the pointer that far.

   · WHEEL is a flick. One flick must be one step, which a time-based
     cooldown cannot deliver: a trackpad emits a decaying momentum
     tail for a second or more after the fingers lift, so any cooldown
     short enough to feel responsive expires mid-tail and fires again.
     Instead the gesture locks after its first step and only re-arms
     once the wheel has been QUIET for GESTURE_END_MS — the tail keeps
     resetting that timer, so it is swallowed as part of the flick.

   NOTE ON POINTER CAPTURE: this does not call setPointerCapture, and
   must not. Capturing on pointerdown retargets the compatibility
   MOUSE events too, so mouseup lands on the stage while mousedown was
   on whatever was under the cursor. The click then fires on their
   common ancestor instead of the button — which silently killed the
   prev/next arrows and the select-a-card buttons. Drag survives
   without capture because the move and release listeners go on the
   window for the duration of the drag.
   --------------------------------------------------------------- */

/** Horizontal travel, in px, that advances one card. */
const DRAG_PER_STEP = 90;
/** Accumulated wheel deltaX before the first (and only) step fires. */
const WHEEL_PER_STEP = 70;
/** Quiet time that marks the end of one wheel gesture. Must comfortably
    exceed the gap between momentum events (~16ms) without being so long
    that a deliberate second flick is eaten. */
const GESTURE_END_MS = 140;
/** Movement past this cancels the click, so a drag that ends on a
    card does not also select it. */
const CLICK_SUPPRESS_PX = 8;

export function useRingGesture(
  ref: RefObject<HTMLElement | null>,
  onStep: (delta: number) => void,
) {
  /* Kept in a ref so the listeners can stay attached for the life of
     the component instead of being torn down and rebuilt every time
     the parent re-renders with a new callback. */
  const stepRef = useRef(onStep);
  useEffect(() => {
    stepRef.current = onStep;
  }, [onStep]);

  const travelled = useRef(0);

  /* -- Wheel ---------------------------------------------------
     Native listener, not onWheel: React attaches wheel passively,
     and preventDefault is needed to stop a sideways trackpad flick
     triggering the browser's back-navigation. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let accum = 0;
    let locked = false;
    let idle: ReturnType<typeof setTimeout> | undefined;

    const onWheel = (e: WheelEvent) => {
      /* Vertical-dominant: hands off, that is the page scrolling. */
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;

      e.preventDefault();

      /* Any horizontal activity — including momentum — pushes the
         end-of-gesture marker back, so the tail never re-arms the
         lock it is still part of. */
      clearTimeout(idle);
      idle = setTimeout(() => {
        locked = false;
        accum = 0;
      }, GESTURE_END_MS);

      if (locked) return;

      accum += e.deltaX;
      if (Math.abs(accum) < WHEEL_PER_STEP) return;

      const direction = accum > 0 ? 1 : -1;
      accum = 0;
      locked = true;
      stepRef.current(direction);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      clearTimeout(idle);
    };
  }, [ref]);

  /* -- Drag ----------------------------------------------------
     pointerdown on the stage; move and release on the window, so the
     drag survives the pointer wandering off the ring without needing
     pointer capture and the button-breaking retarget it brings. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let dragging = false;
    let lastX = 0;
    let accum = 0;

    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      accum += dx;
      travelled.current += Math.abs(dx);

      if (Math.abs(accum) < DRAG_PER_STEP) return;
      /* Dragging left pulls the next card in, as a carousel does. */
      const direction = accum < 0 ? 1 : -1;
      accum = 0;
      stepRef.current(direction);
    };

    const onEnd = () => {
      if (!dragging) return;
      dragging = false;
      el.style.userSelect = "";
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onEnd);
      window.removeEventListener("pointercancel", onEnd);
    };

    const onDown = (e: PointerEvent) => {
      /* Left button only; a right-click drag is not a gesture. */
      if (e.pointerType === "mouse" && e.button !== 0) return;
      dragging = true;
      lastX = e.clientX;
      accum = 0;
      travelled.current = 0;
      /* Suppress the text selection a horizontal drag would otherwise
         paint across the copy in the middle of the ring. Set on the
         node rather than through state so a drag causes no re-render. */
      el.style.userSelect = "none";
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onEnd);
      window.addEventListener("pointercancel", onEnd);
    };

    el.addEventListener("pointerdown", onDown);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      onEnd();
    };
  }, [ref]);

  /* Capture phase: a drag that happens to finish over a card or an
     arrow must not also fire that control, or the ring lands somewhere
     the reader did not aim for. A plain click travels ~0px and passes
     straight through. */
  const onClickCapture = useCallback((e: MouseEvent<HTMLElement>) => {
    if (travelled.current <= CLICK_SUPPRESS_PX) return;
    e.preventDefault();
    e.stopPropagation();
    travelled.current = 0;
  }, []);

  return { onClickCapture };
}
