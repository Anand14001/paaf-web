import Image, { type StaticImageData } from "next/image";
import logoLockup from "@/public/img/logo-lockup.png";
import logoMark from "@/public/img/logo-mark.png";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/* ---------------------------------------------------------------
   Shared primitives. The button variants map onto the @utility
   classes in globals.css, where the contrast ratios are documented.
   --------------------------------------------------------------- */

export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

/* -- Layout ------------------------------------------------------ */

export function Rail({
  children,
  className,
  wide,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return <div className={cx(wide ? "rail-wide" : "rail", className)}>{children}</div>;
}

export function Section({
  children,
  className,
  id,
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "default" | "bone" | "forest" | "gold" | "white";
}) {
  const tones = {
    default: "bg-ivory",
    bone: "bg-bone",
    white: "bg-white",
    gold: "bg-gold-50",
    forest: "bg-forest-900 text-white",
  } as const;
  return (
    <section id={id} className={cx("section", tones[tone], className)}>
      {children}
    </section>
  );
}

export function SectionHeading({
  title,
  lede,
  onDark,
  align = "left",
  className,
}: {
  title: ReactNode;
  lede?: ReactNode;
  onDark?: boolean;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cx(
        "max-w-[46rem]",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <h2 className={cx("h3", onDark && "text-white")}>{title}</h2>
      {lede && (
        <p className={cx("mt-5 text-[1.0625rem] leading-relaxed", onDark ? "text-sage-200" : "text-muted")}>
          {lede}
        </p>
      )}
    </div>
  );
}

/* -- Curve -------------------------------------------------------
   The curved section transition.

   Drawn as an SVG path, not a CSS mask. A radial-gradient mask is an
   ellipse: beyond its width the strip stays fully opaque, so the arc
   terminates in a vertical step and a hard colour stop aliases into a
   ragged edge. A path with preserveAspectRatio="none" stretches edge
   to edge and stays smooth at any viewport width.

   A curve sits on the edge of a section and is filled with the colour
   of the ADJACENT section, so the arc reads as one band sweeping into
   the next. Get the fill wrong and you get a visible colour seam.

   Put it inside a positioned section (`has-curve`) and give that
   section `curve-pad-b` so content clears the sweep:

     <Section tone="forest" className="has-curve curve-pad-b">
       …
       <Curve edge="bottom-up" fill="light" />   // next section is ivory
     </Section>
*/

export type CurveEdge = "bottom-up" | "bottom-down" | "top-up";
export type CurveFill = "light" | "white" | "bone" | "forest" | "primary" | "gold" | "sage";

const CURVE_FILL: Record<CurveFill, string> = {
  light: "var(--color-ivory)",
  white: "#ffffff",
  bone: "var(--color-bone)",
  forest: "var(--color-forest-900)",
  primary: "var(--color-forest-700)",
  gold: "var(--color-gold-50)",
  sage: "var(--color-sage-100)",
};

/** The arc, as a single cubic spanning the full viewBox width. */
export const CURVE_PATH = "M0 0C420 96 1020 96 1440 0v96H0z";

export function Curve({
  edge = "bottom-up",
  fill = "light",
  tall,
  className,
}: {
  edge?: CurveEdge;
  fill?: CurveFill;
  tall?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cx(
        "pointer-events-none absolute inset-x-0 overflow-hidden",
        edge === "top-up" ? "-top-px" : "-bottom-px",
        tall ? "h-[52px] lg:h-[88px]" : "h-[38px] lg:h-[64px]",
        className,
      )}
    >
      <svg
        viewBox="0 0 1440 96"
        preserveAspectRatio="none"
        className="h-full w-full"
        focusable="false"
      >
        <path d={CURVE_PATH} fill={CURVE_FILL[fill]} />
      </svg>
    </div>
  );
}

/* -- Button ------------------------------------------------------ */

type ButtonVariant = "primary" | "accent" | "ghost" | "light" | "sage";
type ButtonSize = "md" | "sm";

/* Tailwind's scanner matches literal strings in source. Building the
   class as `btn-${variant}` means it never sees "btn-light" or
   "btn-sage", so those @utility rules are never emitted and the button
   renders as bare text. Mapped to literals so every variant ships. */
const VARIANT: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  accent: "btn-accent",
  ghost: "btn-ghost",
  light: "btn-light",
  sage: "btn-sage",
};

const SIZE: Record<ButtonSize, string> = {
  md: "",
  sm: "!px-5 !py-3 !text-[0.875rem]",
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: {
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"button">, "ref">) {
  const cls = cx(VARIANT[variant], SIZE[size], className);
  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:");
    if (external) {
      return (
        <a
          href={href}
          className={cls}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}

/* -- Badge ------------------------------------------------------- */

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "gold" | "forest" | "sage";
  className?: string;
}) {
  const tones = {
    neutral: "bg-bone text-muted border-border",
    gold: "bg-gold-100 text-gold-700 border-gold-600/30",
    forest: "bg-forest-900 text-white border-forest-900",
    sage: "bg-sage-100 text-forest-700 border-sage-300",
  } as const;
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.08em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* -- Breadcrumb -------------------------------------------------- */

export function Breadcrumb({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[0.8125rem] text-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {trail.map((t, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={t.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="font-medium text-forest-900">
                  {t.name}
                </span>
              ) : (
                <>
                  <Link href={t.path} className="transition-colors hover:text-gold-700">
                    {t.name}
                  </Link>
                  <span aria-hidden className="text-border-strong">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* -- Icons -------------------------------------------------------
   Inline so there is no icon-library payload. 24px grid,
   currentColor, aria-hidden by default. */

type IconName =
  | "arrow-right"
  | "arrow-up-right"
  | "check"
  | "chevron-down"
  | "close"
  | "download"
  | "lock"
  | "menu"
  | "search"
  | "whatsapp"
  | "linkedin"
  | "mail"
  | "phone"
  | "flask"
  | "leaf"
  | "shield"
  | "alert";

const PATHS: Record<IconName, ReactNode> = {
  "arrow-right": <path d="M5 12h14M13 6l6 6-6 6" />,
  "arrow-up-right": <path d="M7 17 17 7M8 7h9v9" />,
  check: <path d="m4 12 5 5L20 6" />,
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  download: <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />,
  lock: (
    <>
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 1 1 8 0v3" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  whatsapp: (
    <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm5.2 14.1c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.5-2.6-1.1-4.3-3.7-4.4-3.9-.1-.2-1-1.3-1-2.5s.6-1.8.9-2c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .6l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.7 1.2 1.6 2 1.1.9 2 1.2 2.3 1.4.3.1.5.1.6-.1l.9-1c.2-.2.4-.2.6-.1l1.8.9c.2.1.4.2.4.3.1.1.1.6-.1 1.2Z" />
  ),
  linkedin: (
    <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm6.5 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.76-1.95 4.02 0 4.76 2.5 4.76 5.76V21h-4v-5.6c0-1.34-.03-3.06-1.9-3.06-1.9 0-2.19 1.45-2.19 2.96V21h-3.98V9Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  phone: (
    <path d="M5 3h3l2 5-2.5 1.5a12 12 0 0 0 6 6L15 13l5 2v3a2 2 0 0 1-2.2 2A17 17 0 0 1 3 5.2 2 2 0 0 1 5 3Z" />
  ),
  flask: <path d="M9 3v6L4 19a2 2 0 0 0 1.8 3h12.4A2 2 0 0 0 20 19l-5-10V3M8 3h8M7.5 14h9" />,
  leaf: <path d="M4 20c0-8 6-14 16-14 0 10-6 15-13 15H4v-1Zm3-1c3-5 6-7 10-9" />,
  shield: <path d="M12 3 5 6v6c0 4.5 3 7.8 7 9 4-1.2 7-4.5 7-9V6l-7-3Zm-2.5 9 2 2 4-4" />,
  alert: <path d="M12 8v5m0 3h.01M10.3 3.9 2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />,
};

export function Icon({
  name,
  size = 20,
  className,
  filled,
}: {
  name: IconName;
  size?: number;
  className?: string;
  filled?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}

/* -- Brand ------------------------------------------------------
   Both marks are cut from one master, public/img/logo.png, by
   scripts/generate-logo-assets.mjs. Nothing here redraws the logo:
   when the client sends a new file, replace the master, re-run the
   script, and header, footer and favicon all follow.

   Two shapes, because the lockup cannot do both jobs:
     · BrandLockup — flower + wordmark, horizontal. The default.
     · BrandMark   — the flower alone, square. For dark surfaces,
       where the lockup's forest-green wordmark would vanish, and
       for any slot too narrow for a 3.6:1 lockup.

   Neither carries alt text: every current placement wraps them in a
   link that already names the destination, so describing the image
   as well would make a screen reader say the brand twice. A future
   placement that is not inside a labelled link should pass `alt`.
   --------------------------------------------------------------- */

export function BrandLockup({
  className = "h-7 w-auto sm:h-8 lg:h-[2.125rem]",
  alt = "",
  priority = false,
}: {
  className?: string;
  alt?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={logoLockup}
      alt={alt}
      priority={priority}
      /* Rendered at 32–40px tall, so ~115–145px wide. */
      sizes="160px"
      className={cx("select-none", className)}
    />
  );
}

export function BrandMark({
  size = 52,
  onDark = false,
  className,
}: {
  size?: number;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <span
      style={{ width: size, height: size }}
      className={cx(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full",
        /* The artwork is gold and leaf-green on transparent. It needs
           a light disc under it on forest — and keeps one on ivory so
           the badge reads as the same object on both. */
        onDark ? "bg-white" : "bg-bone",
        className,
      )}
    >
      <Image
        src={logoMark}
        alt=""
        sizes="64px"
        style={{ width: "72%", height: "72%" }}
        className="select-none object-contain"
      />
    </span>
  );
}

/* -- Photo -------------------------------------------------------
   Remote imagery through next/image: AVIF/WebP negotiation, srcset
   and lazy loading come free. The botanical gradient sits behind as
   the loading backdrop, so a slow image never flashes white — and it
   is still what shows if the remote host is unreachable.

   Pass `priority` on the one above-the-fold image per page (the LCP
   candidate) and nowhere else. */

export function Photo({
  src,
  alt,
  className,
  imgClassName,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority,
  tone = "forest",
  overlay,
  rounded,
  blur,
  quality,
}: {
  /** A remote URL, or a static import (which also enables `blur`). */
  src: string | StaticImageData;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  tone?: "forest" | "gold" | "sage";
  /** Scrim for text laid over the image. */
  overlay?: "none" | "soft" | "strong" | "hero";
  rounded?: string;
  /** Blur-up placeholder. Requires a static import for `src`. */
  blur?: boolean;
  /** Must be one of next.config.ts `images.qualities`. */
  quality?: number;
}) {
  const positioned = /(?:^|\s)(?:absolute|fixed|sticky|relative)(?:\s|$)/.test(
    className ?? "",
  );

  const tones = {
    forest: "from-forest-900 to-forest-600",
    gold: "from-gold-600 to-gold-500",
    sage: "from-sage-400 to-sage-300",
  } as const;

  return (
    <div
      className={cx(
        /* next/image `fill` needs a positioned ancestor, so this
           normally supplies `relative`. But Tailwind emits `.relative`
           AFTER `.absolute`, so a caller passing `absolute` would lose
           the cascade and the wrapper would stay in flow — which
           silently collapses it to no box at all. Only add `relative`
           when the caller has not positioned it themselves. */
        !positioned && "relative",
        "overflow-hidden bg-gradient-to-br",
        tones[tone],
        rounded,
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={quality}
        placeholder={blur && typeof src !== "string" ? "blur" : undefined}
        className={cx("object-cover", imgClassName)}
      />
      {/* The hero scrim is two layers, not one. A single bottom-up
          gradient leaves copy at the top-left of the frame at the mercy
          of whatever is in the photograph — and this image gets swapped
          for the client's own. The horizontal pass guarantees the text
          column stays legible regardless of what sits behind it. */}
      {overlay === "hero" && (
        <>
          {/* Tuned so the text column clears WCAG AA against white
              while the photograph stays clearly visible on the open
              side. Fully opaque on the left would pass contrast but
              hide the image entirely, which defeats having one. */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-forest-900/85 via-forest-900/45 to-forest-900/10"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-forest-900/55 via-transparent to-forest-900/30"
          />
        </>
      )}
      {overlay && overlay !== "none" && overlay !== "hero" && (
        <div
          aria-hidden
          className={cx(
            "absolute inset-0",
            overlay === "strong"
              ? "bg-gradient-to-t from-forest-900 via-forest-900/70 to-forest-900/35"
              : "bg-gradient-to-t from-forest-900/80 via-forest-900/25 to-transparent",
          )}
        />
      )}
    </div>
  );
}

/* -- Botanical placeholder ---------------------------------------
   The brief forbids cut-out product renders and stock photography
   would read as fake on a traceability claim (#10). Until the real
   farm/lab photography arrives, image slots get a typographic
   placeholder that is honest about being one. */

export function BotanicalPlaceholder({
  label,
  className,
  tone = "forest",
}: {
  label: string;
  className?: string;
  tone?: "forest" | "gold" | "sage";
}) {
  const tones = {
    forest: "from-forest-900 to-forest-600 text-sage-200",
    gold: "from-gold-600 to-gold-500 text-forest-900",
    sage: "from-sage-400 to-sage-300 text-forest-900",
  } as const;
  return (
    <div
      role="img"
      aria-label={`${label} — photography to follow`}
      className={cx(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br",
        tones[tone],
        className,
      )}
    >
      <svg
        viewBox="0 0 200 200"
        aria-hidden
        className="absolute inset-0 h-full w-full opacity-[0.17]"
        preserveAspectRatio="xMidYMid slice"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1.1">
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse
              key={i}
              cx="100"
              cy="100"
              rx="58"
              ry="19"
              transform={`rotate(${i * 22.5} 100 100)`}
            />
          ))}
          <circle cx="100" cy="100" r="7" />
        </g>
      </svg>
      <span className="relative px-6 text-center font-display text-[1.05rem] leading-snug tracking-tight">
        {label}
      </span>
    </div>
  );
}
