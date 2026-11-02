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
const RX = 44;
/* RY is solved, not chosen. Two constraints pull against each other
   once the side cards are tilted:

     · the two cards down each side must not collide, which wants the
       33/67 o'clock positions far apart — separation is RY% of the
       stage height;
     · the cards at 12 and 6 o'clock must not run out of the top and
       bottom, which wants them close to the middle — clearance there
       is (50 - RY)% of the height, less half a card.

   A 272x340 card turned 45deg occupies a 433px box (w·cos45 +
   h·sin45), so the side pair needs ~463px of separation and the top
   card needs ~190px of room. Setting those two equal gives RY ≈ 35.5
   at the smallest stage that satisfies both. Raise the card size and
   this number has to be re-solved. */
const RY = 35.5;

/** One card. Every position on the ring uses it — same box, same
    copy, same treatment; only where it sits and how it leans. */
const CARD = { w: 272, h: 340 };

/* The four side cards lean into a cross; the cards at 12 and 6
   o'clock stay upright. The copy leans WITH the card rather than
   being counter-rotated, because a 272x340 block turned back inside
   a 272x340 card cannot fit — that is the whole reason the tilted
   version used a smaller inset block before. Same card, same layout,
   leaning: the trade is that the side cards' text reads on the
   diagonal. */
const SLOTS: Slot[] = Array.from({ length: COUNT }, (_, slot) => {
  const theta = (slot / COUNT) * 2 * Math.PI; // 0 = top, clockwise
  const x = 50 + RX * Math.sin(theta);
  const upright = slot === 0 || slot === COUNT / 2;

  return {
    x,
    y: 50 - RY * Math.cos(theta),
    /* Mirrored across the vertical axis so the two sides read as a
       pair rather than as a rotation anyone has to decode. */
    rot: upright ? 0 : x < 50 ? -45 : 45,
    ...CARD,
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
              sizes="(max-width: 767px) 80vw, 300px"
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
              className="absolute right-4 top-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-gold-500 font-display text-[1.125rem] leading-none text-forest-900"
            >
              {s.number}
            </span>

            <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-5">
              <p className="eyebrow text-gold-500">{s.badge}</p>
              <h3 className="mt-2 font-display text-[1.25rem] leading-[1.18] tracking-[-0.01em] text-white">
                {s.title}
              </h3>
              <p className="mt-2.5 line-clamp-4 text-[0.8125rem] leading-[1.5] text-sage-200">
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
