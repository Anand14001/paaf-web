"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandLockup, Icon, cx } from "@/components/ui";
import { megaMenus, site, whatsappLink } from "@/lib/site";

/* ---------------------------------------------------------------
   Floating-card header.

   The bar and its mega panel are ONE rounded surface: opening a menu
   grows the same card downward rather than dropping a detached panel
   beneath it. That is what gives the pattern its continuity, and it
   is the part that is easy to get wrong — if the panel is a separate
   element the rounded corners and the shadow stop lining up.

   The card floats over the hero, inset from the viewport edge, so the
   page imagery runs past it on both sides.

   Interaction model
     · Pointer: hover opens after a short intent delay so sweeping the
       cursor across the bar does not flash panels open.
     · Keyboard: Enter/Space toggles, ArrowDown opens and moves into
       the panel, Escape closes and returns focus to the trigger.
     · Touch: first tap opens, second follows the link.
   --------------------------------------------------------------- */

const OPEN_DELAY = 110;
const CLOSE_DELAY = 180;

export default function Header() {
  const pathname = usePathname();
  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>("products");
  const [scrolled, setScrolled] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = () => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const scheduleOpen = (id: string) => {
    clearTimers();
    openTimer.current = setTimeout(() => setOpenId(id), OPEN_DELAY);
  };
  const scheduleClose = () => {
    clearTimers();
    closeTimer.current = setTimeout(() => setOpenId(null), CLOSE_DELAY);
  };

  useEffect(() => clearTimers, []);

  useEffect(() => {
    setOpenId(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (openId) {
        document.getElementById(`mega-trigger-${openId}`)?.focus();
        setOpenId(null);
      }
      setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openId]);

  useEffect(() => {
    if (!openId) return;
    const onDown = (e: MouseEvent) => {
      if (!cardRef.current?.contains(e.target as Node)) setOpenId(null);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [openId]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const menuActive = (id: string) =>
    id === "products"
      ? pathname.startsWith("/products") || pathname.startsWith("/catalogue")
      : ["/process", "/traceability", "/quality-documents", "/about"].some((p) =>
          pathname.startsWith(p),
        );

  /* Traceability sits at top level rather than inside a panel: it is
     the differentiator this whole site is built on, and burying a
     differentiator one hop deep wastes it. */
  const flatLinks = [
    { label: "Traceability", href: "/traceability" },
    { label: "Catalogue", href: "/catalogue" },
    { label: "Contact", href: "/contact" },
  ];

  const activeMenu = megaMenus.find((m) => m.id === openId) ?? null;

  return (
    <header
      className="pointer-events-none sticky top-0 z-50 px-2.5 pt-2.5 sm:px-[max(1rem,calc(var(--rail-gutter)-0.75rem))] sm:pt-4"
      onMouseLeave={scheduleClose}
    >
      <div
        ref={cardRef}
        className={cx(
          "pointer-events-auto mx-auto w-full max-w-[var(--rail-wide-max)] overflow-hidden rounded-[1.75rem] bg-white transition-shadow duration-300 sm:rounded-[2rem]",
          openId
            ? "shadow-[0_24px_60px_-12px_rgba(18,42,30,0.28)]"
            : scrolled
              ? "shadow-[0_10px_30px_-10px_rgba(18,42,30,0.22)]"
              : "shadow-[0_4px_20px_-8px_rgba(18,42,30,0.16)]",
        )}
      >
        {/* ---------- Bar ---------- */}
        <div className="relative flex h-[68px] items-center justify-between gap-4 pl-2.5 pr-3 sm:pl-3 sm:pr-4 lg:h-[76px]">
          <Link
            href="/"
            aria-label={`${site.brand} — ${site.legalName}, home`}
            className="flex shrink-0 items-center rounded-2xl px-1 py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600"
          >
            {/* The lockup already carries the wordmark, so the typeset
                "PAAF" that used to sit beside the badge is gone — two
                wordmarks in a row read as a mistake. */}
            <BrandLockup priority className="h-8 w-auto sm:h-9 lg:h-10" />
          </Link>

          {/* Centred nav, absolutely positioned so the logo and actions
              cannot shift it off centre as their widths change. */}
          <nav
            aria-label="Main"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 min-[1180px]:flex"
          >
            {megaMenus.map((menu) => {
              const open = openId === menu.id;
              return (
                <button
                  key={menu.id}
                  id={`mega-trigger-${menu.id}`}
                  type="button"
                  aria-expanded={open}
                  aria-controls={`mega-panel-${menu.id}`}
                  aria-haspopup="true"
                  onMouseEnter={() => scheduleOpen(menu.id)}
                  onFocus={() => setOpenId(menu.id)}
                  onClick={() => {
                    clearTimers();
                    setOpenId(open ? null : menu.id);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setOpenId(menu.id);
                      requestAnimationFrame(() => {
                        document
                          .querySelector<HTMLElement>(`#mega-panel-${menu.id} a`)
                          ?.focus();
                      });
                    }
                  }}
                  className={cx(
                    "flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.9375rem] font-medium transition-colors",
                    open || menuActive(menu.id)
                      ? "text-gold-700"
                      : "text-forest-900 hover:text-gold-700",
                  )}
                >
                  {menu.label}
                  <Icon
                    name="chevron-down"
                    size={15}
                    className={cx(
                      "transition-transform duration-300",
                      open && "rotate-180",
                    )}
                  />
                </button>
              );
            })}

            {flatLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onMouseEnter={scheduleClose}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={cx(
                  "rounded-full px-3.5 py-2 text-[0.9375rem] font-medium transition-colors",
                  isActive(l.href)
                    ? "text-gold-700"
                    : "text-forest-900 hover:text-gold-700",
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* ---------- Actions ---------- */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
            <Link
              href="/products"
              aria-label="Search the product catalogue"
              onMouseEnter={scheduleClose}
              className="flex h-10 w-10 items-center justify-center rounded-full text-forest-900 transition-colors hover:bg-bone hover:text-gold-700"
            >
              <Icon name="search" size={20} />
            </Link>

            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message PAAF on WhatsApp"
              className="hidden h-10 w-10 items-center justify-center rounded-full text-forest-900 transition-colors hover:bg-bone hover:text-gold-700 sm:flex"
            >
              <Icon name="whatsapp" size={20} filled />
            </a>

            <Link
              href="/request-quote"
              onMouseEnter={scheduleClose}
              className="arrow-shift-diag hidden items-center gap-2 rounded-full bg-forest-900 px-6 py-3 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-forest-700 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-gold-600 sm:inline-flex"
            >
              Request a quote
              <Icon name="arrow-up-right" size={17} />
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="flex h-11 w-11 items-center justify-center rounded-full text-forest-900 transition-colors hover:bg-bone min-[1180px]:hidden"
            >
              <Icon name="menu" size={23} />
            </button>
          </div>
        </div>

        {/* ---------- Mega panel: same card, grown ---------- */}
        {activeMenu && (
          <div
            id={`mega-panel-${activeMenu.id}`}
            onMouseEnter={clearTimers}
            className="hidden border-t border-border min-[1180px]:block"
            style={{ animation: "mega-in 240ms cubic-bezier(0.16,1,0.3,1)" }}
          >
            <div className="grid grid-cols-2 gap-x-14 gap-y-8 px-10 py-10 lg:px-14 lg:py-12">
              {activeMenu.tiles.map((t) => (
                <Link
                  key={t.href + t.label}
                  href={t.href}
                  onBlur={(e) => {
                    /* Tab out of the last link closes the panel. */
                    if (!cardRef.current?.contains(e.relatedTarget as Node)) {
                      setOpenId(null);
                    }
                  }}
                  className="group flex gap-4"
                >
                  <span className="mt-0.5 shrink-0 text-gold-600 transition-colors group-hover:text-gold-700">
                    <Icon name={t.icon} size={22} />
                  </span>
                  <span>
                    <span className="block font-display text-[1.3125rem] leading-snug tracking-tight text-forest-700 transition-colors group-hover:text-gold-700">
                      {t.label}
                    </span>
                    <span className="mt-1.5 block max-w-[26rem] text-[0.9375rem] leading-relaxed text-muted">
                      {t.description}
                    </span>
                  </span>
                </Link>
              ))}
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-border bg-bone px-10 py-4 lg:px-14">
              <p className="text-[0.875rem] text-muted">{activeMenu.footnote}</p>
              <Link
                href={activeMenu.footLink.href}
                className="arrow-shift inline-flex items-center gap-2 text-[0.875rem] font-semibold text-forest-700 hover:text-gold-700"
              >
                {activeMenu.footLink.label}
                <Icon name="arrow-right" size={16} />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* ---------- Mobile sheet ---------- */}
      {mobileOpen && (
        <div className="pointer-events-auto fixed inset-0 z-[60] min-[1180px]:hidden">
          <div
            className="absolute inset-0 bg-forest-900/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="absolute inset-y-0 right-0 flex w-[min(26rem,100%)] flex-col bg-ivory shadow-2xl"
          >
            <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-border px-4">
              <Link
                href="/"
                aria-label={`${site.brand} — ${site.legalName}, home`}
                className="flex items-center"
              >
                <BrandLockup className="h-8 w-auto" />
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-forest-900"
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-5">
              {megaMenus.map((menu) => {
                const open = mobileSection === menu.id;
                return (
                  <div key={menu.id} className="border-b border-border py-1">
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setMobileSection(open ? null : menu.id)}
                      className="flex w-full items-center justify-between gap-3 py-3.5 text-left"
                    >
                      <span className="font-display text-[1.25rem] leading-snug text-forest-900">
                        {menu.label}
                      </span>
                      <Icon
                        name="chevron-down"
                        size={19}
                        className={cx(
                          "shrink-0 text-muted transition-transform duration-200",
                          open && "rotate-180",
                        )}
                      />
                    </button>

                    {open && (
                      <ul className="space-y-0.5 pb-4">
                        {menu.tiles.map((t) => (
                          <li key={t.href + t.label}>
                            <Link
                              href={t.href}
                              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[1rem] text-forest-900 hover:bg-bone"
                            >
                              <Icon
                                name={t.icon}
                                size={17}
                                className="shrink-0 text-gold-700"
                              />
                              {t.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}

              <div className="py-1">
                {flatLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="block border-b border-border py-3.5 font-display text-[1.25rem] text-forest-900"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </nav>

            <div className="shrink-0 space-y-3 border-t border-border bg-bone px-5 py-5">
              <Link href="/request-quote" className="btn-accent w-full">
                Request a quote
                <Icon name="arrow-up-right" size={17} />
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost w-full"
              >
                <Icon name="whatsapp" size={18} filled />
                WhatsApp us
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
