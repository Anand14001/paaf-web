"use client";

import { useCallback, useState } from "react";
import { Icon, Photo, SectionHeading, cx } from "@/components/ui";
import { processStages } from "@/content/process";
import { photo, processImage } from "@/lib/images";

/* ---------------------------------------------------------------
   The six-stage protocol as a ring of cards around the copy.

   The arrangement is a circle, not an arc: the heading, the lede and
   the arrows sit in the middle of the stage and the six cards orbit
   them. That is the shape of the reference, and it only works if the
   geometry is generated rather than hand-placed — six hand-typed
   positions drift out of true the moment one size changes.

   So SLOTS is computed from an ellipse. Slot 0 is the top of the
   circle and holds the active card, upright and portrait; the other
   five are evenly spaced clockwise and identical: same square, same
   45deg tilt, mirrored left and right. Advancing does not re-order
   the DOM — every card reads a different row and animates to it,
   which is what makes the ring turn as one piece.

   Positions are percentages of the stage box and sizes are px at
   `--scatter-scale: 1`. globals.css scales the whole ring down a
   step at a time and, below `md`, unwinds it into a plain column:
   a circle of rotated cards has nowhere to live in 390px.
   --------------------------------------------------------------- */

type Slot = {
  x: number;
  y: number;
  rot: number;
  w: number;
  h: number;
  z: number;
};

const COUNT = processStages.length;

/** Ellipse radii as a percentage of the stage box. */
const RX = 48;
/* RY is solved, not chosen. Two constraints pull against each other
   once the side cards are tilted:

     · the two cards down each side must not collide, which wants the
       33/67 o'clock positions far apart — separation is RY% of the
       stage height;
     · the cards at 12 and 6 o'clock must not run out of the top and
       bottom, which wants them close to the middle — clearance there
       is (50 - RY)% of the height, less half a card.

   A 330x412 card turned 45deg occupies a 525px box (w·cos45 +
   h·sin45), so the side pair needs ~555px of separation and the top
   card needs ~226px of room. Setting those two equal gives RY ≈ 35.5
   at the smallest stage that satisfies both, and a stage ~1560px
   tall — which is where the padding in globals.css comes from.

   RY lands near 35.5 for any card size, because both constraints
   scale with the card; RX does not. Growing the card from 272 to 330
   widened its tilted box by 92px and closed the gap to the copy in
   the middle to 14px, so RX went 44 -> 48 to push the side pair back
   out. Change the card size and re-solve BOTH, not just this one. */
const RY = 35.5;

/** One card. Every position on the ring uses it — same box, same
    copy, same treatment; only where it sits and how it leans. */
const CARD = { w: 330, h: 412 };

/* The four side cards lean into a cross; the cards at 12 and 6
   o'clock stay upright. The copy leans WITH the card rather than
   being counter-rotated, because a 272x340 block turned back inside
   a 272x340 card cannot fit — that is the whole reason the tilted
   version used a smaller inset block before. Same card, same layout,
   leaning: the trade is that the side cards' text reads on the
   diagonal. */
/* Rounded, and that is load-bearing rather than tidiness: the spec
   does not require Math.sin and Math.cos to be bit-identical across
   engines, so Node and V8-in-the-browser can disagree in the last
   digit. Those values go out as inline custom properties, which
   makes the difference a hydration mismatch React reports and
   refuses to patch. Three decimals is 0.001% of the stage — about
   1/60th of a pixel — so nothing moves. */
const round = (n: number) => Number(n.toFixed(3));

const SLOTS: Slot[] = Array.from({ length: COUNT }, (_, slot) => {
  const theta = (slot / COUNT) * 2 * Math.PI; // 0 = top, clockwise
  const x = round(50 + RX * Math.sin(theta));
  const y = round(50 - RY * Math.cos(theta));
  const upright = slot === 0 || slot === COUNT / 2;

  /* Each tilted card leans along its own radius: the long axis
     points out from the middle of the ring, rounded to the nearest
     45deg. Mirroring on the vertical axis alone was not enough —
     it made the lower pair lean back in towards the centre, so the
     four tilted cards read as two parallel pairs instead of as a
     rosette. Quadrant-aware, they all splay outward: the upper pair
     up and away, the lower pair down and away.

     The sign falls out of which quadrant the slot is in. Same side
     of both axes (top-left, bottom-right) leans one way; opposite
     sides (top-right, bottom-left) lean the other. */
  const rot = upright ? 0 : (x < 50) === (y < 50) ? -45 : 45;

  return {
    x,
    y,
    rot,
    ...CARD,
    /* No geometry to re-solve for this: +45 and -45 produce the
       same bounding box, so every clearance worked out for the ring
       still holds. */
    z: slot === 0 ? 60 : 40,
  };
});

export default function ProcessScatter() {
  const [active, setActive] = useState(0);

  const go = useCallback(
    (delta: number) => setActive((i) => (i + delta + COUNT) % COUNT),
    [],
  );

  const stage = processStages[active];

  return (
    <div
      className="scatter-stage"
      role="group"
      aria-roledescription="carousel"
      aria-label="The Six-Stage Extraction Protocol"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          go(-1);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          go(1);
        }
      }}
    >
      {processStages.map((s, i) => {
        const slot = SLOTS[(i - active + COUNT) % COUNT];
        const isActive = i === active;
        const img = processImage(s.number);

        return (
          <div
            key={s.number}
            data-active={isActive}
            className="scatter-card"
            style={{
              ["--x" as string]: `${slot.x}%`,
              ["--y" as string]: `${slot.y}%`,
              ["--rot" as string]: `${slot.rot}deg`,
              ["--w" as string]: `${slot.w}px`,
              ["--h" as string]: `${slot.h}px`,
              zIndex: slot.z,
            }}
          >
            <Photo
              src={photo(img.id, 700)}
              alt={img.alt}
              sizes="(max-width: 1023px) 85vw, 360px"
              rounded="rounded-24"
              overlay="none"
              className="absolute inset-0 h-full w-full"
            />

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-24 bg-gradient-to-t from-forest-900/92 via-forest-900/55 to-forest-900/10"
            />

            {/* Every card but the current one is the control that
                selects it. The current one is not a button — it is
                already selected. */}
            {!isActive && (
              <button
                type="button"
                onClick={() => setActive(i)}
                className="absolute inset-0 z-10 rounded-24 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-500"
              >
                <span className="sr-only">
                  Stage {s.number} — {s.title}
                </span>
              </button>
            )}

            {/* One treatment for all six: number in the corner, copy
                along the bottom. Nothing here reads `isActive` — the
                cards are identical and position on the ring is what
                says which one is current. */}
            <span
              aria-hidden
              className="absolute right-5 top-5 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-gold-500 font-display text-[1.3125rem] leading-none text-forest-900"
            >
              {s.number}
            </span>

            <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-6">
              <p className="eyebrow text-gold-500">{s.badge}</p>
              <h3 className="mt-2.5 font-display text-[1.4375rem] leading-[1.16] tracking-[-0.01em] text-white">
                {s.title}
              </h3>
              <p className="mt-3 line-clamp-5 text-[0.875rem] leading-[1.5] text-sage-200">
                {s.body}
              </p>
            </div>
          </div>
        );
      })}

      {/* ---------- The middle of the ring ---------- */}
      <div className="scatter-center">
        <div className="flex justify-center gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous stage"
            className="scatter-arrow"
          >
            <Icon name="arrow-right" size={19} className="rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next stage"
            className="scatter-arrow"
          >
            <Icon name="arrow-right" size={19} />
          </button>
        </div>

        <SectionHeading
          onDark
          align="center"
          className="mt-9"
          title="From dawn pluck to laboratory certification"
          lede="Each harvest follows the same closed-loop standard. Nothing is warehoused between the field and the vessel, and nothing ships without an analysis."
        />

        {/* The CTA deliberately sits BELOW the ring, not in here: the
            hole in the middle only clears the cards above and below
            it by about 50px, and a button's worth of extra height is
            what pushes the arrows back onto the card at 12 o'clock. */}

        {/* The one place the change of card is announced. The cards
            themselves are images and would otherwise be silent. */}
        <p aria-live="polite" className="sr-only">
          Stage {stage.number} of 0{COUNT}: {stage.title}
        </p>
      </div>
    </div>
  );
}
