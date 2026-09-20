"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { brand, collections } from "@/lib/data";
import { CATALOGS, catalogMeta } from "@/lib/catalogs";
import { materialMeta } from "@/lib/products";

gsap.registerPlugin(useGSAP);

export type MenuLink = {
  label: string;
  href: string;
};

type SubLink = {
  label: string;
  href: string;
  hint?: string;
  description?: string;
  image?: string;
};

type NavNode = {
  id: string;
  label: string;
  href?: string;
  children?: SubLink[];
};

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  links: MenuLink[];
};

function buildTree(links: MenuLink[]): NavNode[] {
  const catalogChildren: SubLink[] = CATALOGS.map((slug) => ({
    label: catalogMeta[slug].title,
    description: catalogMeta[slug].subtitle,
    href: `/catalogs/${slug}`,
    image: catalogMeta[slug].image,
  }));

  const materialChildren: SubLink[] = (
    ["gold", "diamond", "ruby"] as const
  ).map((slug) => ({
    label: materialMeta[slug].title,
    description: materialMeta[slug].subtitle,
    href: `/materials/${slug}`,
    image: materialMeta[slug].image,
  }));

  const formChildren: SubLink[] = collections.map((c) => ({
    label: c.title,
    description: c.subtitle,
    href: c.href,
    image: c.image,
  }));

  const editChildren: SubLink[] = [
    {
      label: "New Arrivals",
      description: "Just arrived",
      href: "/collections/new-arrivals",
    },
    {
      label: "Best Sellers",
      description: "Most sought",
      href: "/collections/best-sellers",
    },
    {
      label: "Signature",
      description: "Maison edit",
      href: "/collections/signature",
    },
  ];

  const nested: Record<string, SubLink[]> = {
    Catalogs: catalogChildren,
    Materials: materialChildren,
    Forms: formChildren,
    "The Edit": editChildren,
  };

  return links.map((link) => {
    const children = nested[link.label];
    return {
      id: link.label.toLowerCase().replace(/\s+/g, "-"),
      label: link.label,
      href: link.href,
      children,
    };
  });
}

/**
 * Full-screen mobile menu — GSAP open/close + accordion, transform-only motion.
 */
export function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const veilRef = useRef<HTMLButtonElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const wasOpenRef = useRef(false);
  const closingRef = useRef(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const tree = useMemo(() => buildTree(links), [links]);

  const reduceMotion = useCallback(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const playClose = useCallback(
    (then?: () => void) => {
      const root = rootRef.current;
      const panel = panelRef.current;
      const veil = veilRef.current;
      if (!root || !panel || !veil) {
        then?.();
        return;
      }

      tlRef.current?.kill();
      setExpanded(null);

      const bar = panel.querySelector<HTMLElement>("[data-menu-bar]");
      const rule = panel.querySelector<HTMLElement>("[data-menu-rule]");
      const rows = gsap.utils.toArray<HTMLElement>(
        panel.querySelectorAll("[data-menu-row]")
      );
      const head = panel.querySelector<HTMLElement>("[data-menu-head]");
      const foot = panel.querySelector<HTMLElement>("[data-menu-foot]");

      if (reduceMotion()) {
        gsap.set(root, { autoAlpha: 0, pointerEvents: "none" });
        gsap.set(panel, { clearProps: "clipPath", autoAlpha: 0 });
        gsap.set(veil, { autoAlpha: 0 });
        then?.();
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "power2.in", force3D: true },
        onComplete: () => {
          gsap.set(root, { autoAlpha: 0, pointerEvents: "none" });
          gsap.set(panel, { clipPath: "inset(0 0 100% 0)" });
          then?.();
        },
      });
      tlRef.current = tl;

      tl.to(
        [foot, ...[...rows].reverse(), head, bar].filter(Boolean),
        {
          autoAlpha: 0,
          y: -14,
          duration: 0.18,
          stagger: 0.018,
        },
        0
      )
        .to(
          rule,
          { scaleX: 0, duration: 0.2, ease: "power2.in" },
          0
        )
        .to(
          panel,
          {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.42,
            ease: "power3.inOut",
          },
          0.1
        )
        .to(veil, { autoAlpha: 0, duration: 0.28 }, 0.18);
    },
    [reduceMotion]
  );

  const closeWithMotion = useCallback(() => {
    if (closingRef.current || !wasOpenRef.current) {
      onClose();
      return;
    }
    closingRef.current = true;
    playClose(() => {
      wasOpenRef.current = false;
      closingRef.current = false;
      onClose();
    });
  }, [onClose, playClose]);

  useEffect(() => {
    if (!open) setExpanded(null);
  }, [open]);

  useGSAP(
    () => {
      const root = rootRef.current;
      const panel = panelRef.current;
      const veil = veilRef.current;
      if (!root || !panel || !veil) return;

      const bar = panel.querySelector<HTMLElement>("[data-menu-bar]");
      const rule = panel.querySelector<HTMLElement>("[data-menu-rule]");
      const rows = gsap.utils.toArray<HTMLElement>(
        panel.querySelectorAll("[data-menu-row]")
      );
      const head = panel.querySelector<HTMLElement>("[data-menu-head]");
      const foot = panel.querySelector<HTMLElement>("[data-menu-foot]");
      const reduce = reduceMotion();

      if (open) {
        closingRef.current = false;
        wasOpenRef.current = true;
        tlRef.current?.kill();
        gsap.set(root, { autoAlpha: 1, pointerEvents: "auto" });

        if (reduce) {
          gsap.set(veil, { autoAlpha: 1 });
          gsap.set(panel, { autoAlpha: 1, clipPath: "inset(0)" });
          gsap.set([bar, head, ...rows, foot, rule].filter(Boolean), {
            autoAlpha: 1,
            y: 0,
            scaleX: 1,
          });
          return;
        }

        gsap.set(veil, { autoAlpha: 0 });
        gsap.set(panel, {
          autoAlpha: 1,
          clipPath: "inset(0 0 100% 0)",
        });
        gsap.set([bar, head, ...rows, foot].filter(Boolean), {
          autoAlpha: 0,
          y: 28,
        });
        if (rule) gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });

        const tl = gsap.timeline({
          defaults: { ease: "power3.out", force3D: true },
        });
        tlRef.current = tl;

        tl.to(veil, { autoAlpha: 1, duration: 0.38 }, 0)
          .to(
            panel,
            {
              clipPath: "inset(0 0 0% 0)",
              duration: 0.58,
              ease: "power3.inOut",
            },
            0.02
          )
          .to(
            bar,
            { autoAlpha: 1, y: 0, duration: 0.36 },
            0.22
          )
          .to(
            head,
            { autoAlpha: 1, y: 0, duration: 0.42 },
            0.28
          )
          .to(
            rule,
            { scaleX: 1, duration: 0.5, ease: "power2.out" },
            0.34
          )
          .to(
            rows,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.42,
              stagger: 0.05,
            },
            0.36
          )
          .to(
            foot,
            { autoAlpha: 1, y: 0, duration: 0.38 },
            0.52
          );
        return;
      }

      if (closingRef.current) return;

      if (!wasOpenRef.current) {
        gsap.set(root, { autoAlpha: 0, pointerEvents: "none" });
        gsap.set(veil, { autoAlpha: 0 });
        gsap.set(panel, { clipPath: "inset(0 0 100% 0)", autoAlpha: 1 });
        gsap.set([bar, head, ...rows, foot].filter(Boolean), {
          autoAlpha: 0,
          y: 20,
        });
        if (rule) gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });
        return;
      }

      wasOpenRef.current = false;
      playClose();
    },
    { scope: rootRef, dependencies: [open, playClose, reduceMotion] }
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeWithMotion();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, closeWithMotion]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[60] lg:hidden"
      aria-hidden={!open}
    >
      <button
        ref={veilRef}
        type="button"
        className="absolute inset-0 bg-void/55"
        aria-label="Close menu"
        onClick={closeWithMotion}
      />

      <aside
        ref={panelRef}
        className="absolute inset-0 flex flex-col bg-chalk text-ink will-change-[clip-path]"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        <div
          data-menu-bar
          className="flex h-14 shrink-0 items-center justify-between px-5"
        >
          <p className="font-display text-[1.15rem] tracking-[0.14em] uppercase">
            {brand.name}
          </p>
          <button
            type="button"
            onClick={closeWithMotion}
            className="pressable flex h-10 items-center gap-2 px-1 text-[11px] font-medium tracking-[0.2em] text-muted uppercase"
          >
            Close
            <span className="text-gold" aria-hidden>
              ×
            </span>
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-8">
          <div data-menu-head className="pb-5 pt-2">
            <p className="font-display text-[clamp(2rem,8vw,2.75rem)] leading-[1.05] tracking-[0.02em] text-ink">
              Explore the
              <br />
              maison
            </p>
            <p className="mt-3 max-w-[28ch] text-[13px] leading-relaxed text-muted">
              Tap a chapter to open its rooms — every destination is its own
              page.
            </p>
          </div>

          <div
            data-menu-rule
            className="mb-1 h-px origin-left bg-gold/70"
            aria-hidden
          />

          <nav aria-label="Primary">
            {tree.map((node, i) => (
              <MenuRow
                key={node.id}
                node={node}
                index={i}
                expanded={expanded === node.id}
                onToggle={() =>
                  setExpanded((cur) => (cur === node.id ? null : node.id))
                }
                onNavigate={closeWithMotion}
              />
            ))}
          </nav>

          <div
            data-menu-foot
            className="mt-10 border-t border-border pt-6"
          >
            <p className="font-display text-lg tracking-[0.02em] text-ink">
              Visit &amp; notes
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-muted">
              MM Alam Road, Lahore · Tue–Sun · by appointment
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                onClick={closeWithMotion}
                className="btn-solid-luxe inline-flex h-12 items-center justify-center px-7 text-[10px] font-medium tracking-[0.22em] uppercase"
              >
                Book a viewing
              </Link>
              <a
                href="mailto:hello@kundan.atelier"
                className="text-[12px] tracking-[0.08em] text-gold transition-colors hover:text-ink"
              >
                hello@kundan.atelier
              </a>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function MenuRow({
  node,
  index,
  expanded,
  onToggle,
  onNavigate,
}: {
  node: NavNode;
  index: number;
  expanded: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLSpanElement>(null);
  const hasChildren = Boolean(node.children?.length);

  useGSAP(
    () => {
      const body = bodyRef.current;
      const chevron = chevronRef.current;
      if (!body) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const links = gsap.utils.toArray<HTMLElement>(
        body.querySelectorAll("[data-sub-link]")
      );

      if (!hasChildren) return;

      if (chevron) {
        gsap.to(chevron, {
          rotation: expanded ? 45 : 0,
          duration: reduce ? 0 : 0.28,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      if (!expanded) {
        gsap.to(body, {
          height: 0,
          duration: reduce ? 0 : 0.32,
          ease: "power2.inOut",
          overwrite: "auto",
        });
        gsap.to(links, {
          autoAlpha: 0,
          y: -6,
          duration: reduce ? 0 : 0.16,
          stagger: { each: 0.02, from: "end" },
          overwrite: "auto",
        });
        return;
      }

      gsap.set(body, { height: "auto" });
      const h = body.offsetHeight;
      gsap.set(body, { height: 0 });
      gsap.set(links, { autoAlpha: 0, y: 10 });

      gsap
        .timeline({ defaults: { ease: "power3.out", force3D: true } })
        .to(body, {
          height: h,
          duration: reduce ? 0 : 0.38,
          ease: "power2.out",
        })
        .to(
          links,
          {
            autoAlpha: 1,
            y: 0,
            duration: reduce ? 0 : 0.32,
            stagger: 0.04,
          },
          reduce ? 0 : 0.08
        )
        .set(body, { height: "auto" });
    },
    { dependencies: [expanded, hasChildren] }
  );

  return (
    <div data-menu-row className="border-b border-border">
      <div className="flex items-center gap-4 py-4">
        <span className="w-7 shrink-0 font-display text-[13px] tracking-[0.06em] text-gold">
          {String(index + 1).padStart(2, "0")}
        </span>

        {hasChildren ? (
          <button
            type="button"
            className="flex min-w-0 flex-1 items-center justify-between gap-3 text-left pressable"
            aria-expanded={expanded}
            onClick={onToggle}
          >
            <span className="font-display text-[clamp(1.55rem,6.5vw,2rem)] leading-none tracking-[0.01em] text-ink">
              {node.label}
            </span>
            <span
              ref={chevronRef}
              className="flex h-8 w-8 shrink-0 items-center justify-center text-xl leading-none text-gold"
              aria-hidden
            >
              +
            </span>
          </button>
        ) : (
          <Link
            href={node.href ?? "/"}
            onClick={onNavigate}
            className="flex min-w-0 flex-1 items-center justify-between gap-3 pressable"
          >
            <span className="font-display text-[clamp(1.55rem,6.5vw,2rem)] leading-none tracking-[0.01em] text-ink">
              {node.label}
            </span>
            <span className="text-[11px] tracking-[0.16em] text-muted uppercase">
              Open
            </span>
          </Link>
        )}
      </div>

      {hasChildren ? (
        <div ref={bodyRef} className="overflow-hidden" style={{ height: 0 }}>
          <ul className="space-y-1 pb-4 pl-11">
            {node.children!.map((child) => (
              <li key={child.href + child.label}>
                <Link
                  href={child.href}
                  data-sub-link
                  onClick={onNavigate}
                  className="group flex items-center gap-3 rounded-sm py-2.5 pressable"
                >
                  {child.image ? (
                    <span className="relative h-12 w-10 shrink-0 overflow-hidden bg-paper">
                      <Image
                        src={child.image}
                        alt=""
                        fill
                        sizes="40px"
                        className="object-cover transition-transform duration-500 group-active:scale-105"
                      />
                    </span>
                  ) : null}
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="text-[14px] font-medium tracking-[-0.01em] text-ink">
                        {child.label}
                      </span>
                      {child.hint ? (
                        <span className="font-display text-sm text-gold/80">
                          {child.hint}
                        </span>
                      ) : null}
                    </span>
                    {child.description ? (
                      <span className="mt-0.5 block text-[12px] leading-snug text-muted">
                        {child.description}
                      </span>
                    ) : null}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

/** Three-line mark ↔ X — CSS transforms only (stays smooth while the menu timeline runs). */
export function MenuToggle({
  open,
  onClick,
  className = "",
}: {
  open: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      onClick={onClick}
      className={`relative z-[70] flex h-11 w-11 items-center justify-center ${className || "text-ink"}`}
    >
      <span className="relative block h-3.5 w-[22px]" aria-hidden>
        <span
          className={`absolute left-0 block h-[1.5px] w-full origin-center bg-current transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none ${
            open ? "translate-y-[5.5px] rotate-45" : "translate-y-0 rotate-0"
          }`}
          style={{ top: 0 }}
        />
        <span
          className={`absolute top-[5.5px] left-0 block h-[1.5px] w-full origin-center bg-current transition-[opacity,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none ${
            open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
          }`}
        />
        <span
          className={`absolute left-0 block h-[1.5px] w-full origin-center bg-current transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none ${
            open ? "-translate-y-[5.5px] -rotate-45" : "translate-y-0 rotate-0"
          }`}
          style={{ top: 11 }}
        />
      </span>
    </button>
  );
}

