"use client";

/**
 * Houses chapter — vertical cover (same grammar as hero → boutique).
 * Desktop: scrub + settle + veil + SplitText.
 * Mobile: transform scrub without snap / SplitText (less flicker).
 */

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { CATALOGS, catalogMeta, type Catalog } from "@/lib/catalogs";
import { isLocalPublicSrc } from "@/lib/local-image";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, CustomEase);

CustomEase.create("maison", "M0,0 C0.16,1 0.3,1 1,1");

const NUMS: Record<Catalog, string> = { mehr: "01", noor: "02", rozana: "03" };

const ESSENCE: Record<Catalog, string> = {
  mehr: "Bridal warmth",
  noor: "High jewellery light",
  rozana: "Gold for every hour",
};

type HouseLayer = {
  key: Catalog;
  panel: HTMLElement;
  media: HTMLElement | null;
  veil: HTMLElement | null;
  edge: HTMLElement | null;
  copy: HTMLElement | null;
  hit: HTMLElement | null;
  title: HTMLElement | null;
  mark: HTMLElement | null;
  essence: HTMLElement | null;
  urdu: HTMLElement | null;
  body: HTMLElement | null;
  cta: HTMLElement | null;
  split: SplitText | null;
};

export function CatalogsShowcase() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const track = trackRef.current;
      const stage = stageRef.current;
      if (!root || !track || !stage) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const panels = gsap.utils.toArray<HTMLElement>(
        stage.querySelectorAll("[data-house-panel]")
      );
      if (panels.length < 3) return;

      const layers: HouseLayer[] = CATALOGS.map((key, i) => ({
        key,
        panel: panels[i],
        media: panels[i].querySelector<HTMLElement>("[data-house-media]"),
        veil: panels[i].querySelector<HTMLElement>("[data-house-veil]"),
        edge: panels[i].querySelector<HTMLElement>("[data-house-edge]"),
        copy: stage.querySelector<HTMLElement>(`[data-house-copy="${key}"]`),
        hit: panels[i].querySelector<HTMLElement>("[data-house-hit]"),
        title: stage.querySelector<HTMLElement>(
          `[data-house-copy="${key}"] [data-house-title]`
        ),
        mark: stage.querySelector<HTMLElement>(
          `[data-house-copy="${key}"] [data-house-mark]`
        ),
        essence: stage.querySelector<HTMLElement>(
          `[data-house-copy="${key}"] [data-house-essence]`
        ),
        urdu: stage.querySelector<HTMLElement>(
          `[data-house-copy="${key}"] [data-house-urdu]`
        ),
        body: stage.querySelector<HTMLElement>(
          `[data-house-copy="${key}"] [data-house-body]`
        ),
        cta: stage.querySelector<HTMLElement>(
          `[data-house-copy="${key}"] [data-house-cta]`
        ),
        split: null,
      }));

      const thesis = stage.querySelector<HTMLElement>("[data-house-thesis]");
      const chapter = stage.querySelector<HTMLElement>("[data-house-chapter]");
      const progressFills = gsap.utils.toArray<HTMLElement>(
        stage.querySelectorAll("[data-house-progress]")
      );
      const railItems = CATALOGS.map((key) => ({
        label: stage.querySelector<HTMLElement>(`[data-house-rail="${key}"]`),
        tick: stage.querySelector<HTMLElement>(
          `[data-house-rail-tick="${key}"]`
        ),
      }));

      const setRail = (index: number, immediate = false) => {
        railItems.forEach((rail, i) => {
          const on = i === index;
          const dur = immediate ? 0 : 0.35;
          if (rail.label) {
            gsap.to(rail.label, {
              opacity: on ? 1 : 0.3,
              color: on ? "var(--color-gold)" : "var(--color-ivory)",
              duration: dur,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
          if (rail.tick) {
            gsap.to(rail.tick, {
              scaleY: on ? 1 : 0.35,
              opacity: on ? 1 : 0.25,
              duration: dur,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        });
      };

      const setProgress = (index: number, immediate = false) => {
        progressFills.forEach((fill, i) => {
          gsap.to(fill, {
            scaleX: i <= index ? 1 : 0,
            duration: immediate ? 0 : 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });
        });
      };

      const setLook = (index: number, immediate = false) => {
        layers.forEach((p, i) => {
          const on = i === index;
          p.panel.setAttribute("aria-hidden", on ? "false" : "true");
          if (p.hit) {
            p.hit.style.pointerEvents = on ? "auto" : "none";
            p.hit.tabIndex = on ? 0 : -1;
          }
          if (!p.copy) return;
          p.copy.setAttribute("aria-hidden", on ? "false" : "true");
          p.copy.querySelectorAll("a").forEach((link) => {
            link.tabIndex = on ? 0 : -1;
          });
        });
        root.dataset.house = CATALOGS[index];
        setRail(index, immediate);
        setProgress(index, immediate);
      };

      // Cover grammar: panel slides via top (stable with absolute positioning)
      gsap.set(layers[0].panel, { top: "0%", clearProps: "transform" });
      gsap.set(layers[1].panel, { top: "100%", clearProps: "transform" });
      gsap.set(layers[2].panel, { top: "100%", clearProps: "transform" });

      layers.forEach((p, i) => {
        gsap.set(p.media, {
          scale: i === 0 ? 1 : 1.1,
          yPercent: i === 0 ? 0 : 5,
        });
        gsap.set(p.veil, { autoAlpha: i === 0 ? 0 : 0.5 });
        if (p.edge) gsap.set(p.edge, { autoAlpha: 0, scaleY: 0.4 });
      });

      if (reduce) {
        layers.forEach((p, i) => {
          gsap.set(p.panel, { top: "0%" });
          gsap.set(p.media, { scale: 1, yPercent: 0 });
          gsap.set(p.veil, { autoAlpha: 0 });
          gsap.set(p.copy, { autoAlpha: i === 0 ? 1 : 0 });
        });
        gsap.set([thesis, chapter], { autoAlpha: 1 });
        setLook(0, true);
        return;
      }

      const mm = gsap.matchMedia();

      const hideCopy = (p: HouseLayer, at: number, tl: gsap.core.Timeline) => {
        tl.to(p.copy, { autoAlpha: 0, duration: 0.12, ease: "power2.in" }, at);
      };

      const showCopySimple = (
        p: HouseLayer,
        at: number,
        tl: gsap.core.Timeline
      ) => {
        const bits = [p.mark, p.title, p.essence, p.urdu, p.body, p.cta].filter(
          Boolean
        ) as HTMLElement[];
        tl.set(p.copy, { autoAlpha: 1 }, at)
          .set(bits, { autoAlpha: 0, y: 14 }, at)
          .to(
            bits,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.2,
              stagger: 0.03,
              ease: "power2.out",
            },
            at + 0.02
          );
      };

      const showCopySplit = (
        p: HouseLayer,
        at: number,
        tl: gsap.core.Timeline
      ) => {
        const chars = p.split?.chars ?? [];
        if (!chars.length) {
          showCopySimple(p, at, tl);
          return;
        }
        tl.set(p.copy, { autoAlpha: 1 }, at)
          .set(p.title, { autoAlpha: 1, y: 0, clearProps: "transform" }, at)
          .set(chars, { yPercent: 130, autoAlpha: 0, rotateX: -55 }, at)
          .set(
            [p.mark, p.essence, p.urdu, p.body, p.cta],
            { autoAlpha: 0, y: 20 },
            at
          )
          .to(p.mark, { autoAlpha: 1, y: 0, duration: 0.1 }, at + 0.02)
          .to(
            chars,
            {
              yPercent: 0,
              autoAlpha: 1,
              rotateX: 0,
              duration: 0.24,
              ease: "maison",
              stagger: { each: 0.02, from: "start" },
            },
            at + 0.04
          )
          .to(
            p.essence,
            { autoAlpha: 1, y: 0, duration: 0.12, ease: "power2.out" },
            at + 0.18
          )
          .to(
            p.urdu,
            { autoAlpha: 1, y: 0, duration: 0.1, ease: "power2.out" },
            at + 0.2
          )
          .to(
            p.body,
            { autoAlpha: 1, y: 0, duration: 0.12, ease: "power2.out" },
            at + 0.22
          )
          .to(
            p.cta,
            { autoAlpha: 1, y: 0, duration: 0.1, ease: "power2.out" },
            at + 0.26
          );
      };

      const coverFromBelow = (
        incoming: HouseLayer,
        outgoing: HouseLayer,
        at: number,
        tl: gsap.core.Timeline,
        rich: boolean
      ) => {
        const dur = rich ? 0.42 : 0.36;

        if (rich && incoming.edge) {
          tl.fromTo(
            incoming.edge,
            { autoAlpha: 0, scaleY: 0.3 },
            { autoAlpha: 0.9, scaleY: 1, duration: 0.12, ease: "power1.out" },
            at
          ).to(
            incoming.edge,
            { autoAlpha: 0, duration: 0.2, ease: "power2.out" },
            at + dur * 0.55
          );
        }

        tl.to(incoming.panel, { top: "0%", duration: dur, ease: "none" }, at);

        if (rich && incoming.media) {
          tl.to(
            incoming.media,
            {
              scale: 1,
              yPercent: 0,
              duration: dur + 0.08,
              ease: "maison",
            },
            at
          );
        } else if (incoming.media) {
          tl.set(incoming.media, { scale: 1, yPercent: 0 }, at + dur * 0.4);
        }

        if (incoming.veil) {
          if (rich) {
            tl.to(
              incoming.veil,
              { autoAlpha: 0, duration: dur * 0.7, ease: "power2.out" },
              at + 0.08
            );
          } else {
            tl.set(incoming.veil, { autoAlpha: 0 }, at + dur * 0.5);
          }
        }

        if (rich && outgoing.media) {
          tl.to(
            outgoing.media,
            {
              scale: 1.05,
              yPercent: -3,
              duration: dur,
              ease: "power2.inOut",
            },
            at
          );
        }

        if (outgoing.veil) {
          if (rich) {
            tl.to(
              outgoing.veil,
              { autoAlpha: 0.32, duration: dur * 0.5, ease: "power1.in" },
              at
            );
          } else {
            tl.set(outgoing.veil, { autoAlpha: 0.25 }, at);
          }
        }
      };

      const buildTimeline = (rich: boolean) => {
        const tl = gsap.timeline({ defaults: { ease: "none" } });
        const show = rich ? showCopySplit : showCopySimple;

        layers.forEach((p) => {
          gsap.set(p.copy, { autoAlpha: 0 });
          // Keep title wrapper visible for SplitText; hide only non-title bits
          gsap.set(
            [p.mark, p.essence, p.urdu, p.body, p.cta].filter(Boolean),
            { autoAlpha: 0, y: rich ? 20 : 14 }
          );
          if (p.title) {
            if (rich) gsap.set(p.title, { autoAlpha: 1, y: 0 });
            else gsap.set(p.title, { autoAlpha: 0, y: 14 });
          }
        });

        if (rich) {
          layers.forEach((p) => {
            if (!p.title) return;
            try {
              p.split = SplitText.create(p.title, {
                type: "chars",
                charsClass: "house-char inline-block will-change-transform",
              });
              gsap.set(p.split.chars, {
                yPercent: 130,
                autoAlpha: 0,
                rotateX: -55,
              });
            } catch {
              p.split = null;
              gsap.set(p.title, { autoAlpha: 0, y: 20 });
            }
          });
        }

        if (thesis) gsap.set(thesis, { autoAlpha: 0, y: 16 });
        if (chapter) gsap.set(chapter, { autoAlpha: 0, y: 12 });
        gsap.set(progressFills, { scaleX: 0, transformOrigin: "left center" });

        if (chapter) {
          tl.to(chapter, { autoAlpha: 1, y: 0, duration: 0.1 }, 0);
        }
        if (thesis) {
          tl.to(thesis, { autoAlpha: 1, y: 0, duration: 0.12 }, 0.04);
        }

        if (rich && layers[0].media) {
          tl.fromTo(
            layers[0].media,
            { scale: 1.06, yPercent: 3 },
            { scale: 1, yPercent: 0, duration: 0.2, ease: "maison" },
            0
          );
        } else if (layers[0].media) {
          gsap.set(layers[0].media, { scale: 1, yPercent: 0 });
        }

        show(layers[0], 0.06, tl);
        tl.to(progressFills[0], { scaleX: 1, duration: 0.1 }, 0.08)
          .addLabel("mehr", 0)
          .to({}, { duration: rich ? 0.12 : 0.14 }, 0.1);

        hideCopy(layers[0], rich ? 0.24 : 0.28, tl);
        coverFromBelow(layers[1], layers[0], rich ? 0.26 : 0.3, tl, rich);
        show(layers[1], rich ? 0.52 : 0.55, tl);
        tl.to(progressFills[1], { scaleX: 1, duration: 0.1 }, rich ? 0.54 : 0.56)
          .addLabel("noor", rich ? 0.58 : 0.6)
          .to({}, { duration: rich ? 0.1 : 0.12 }, rich ? 0.58 : 0.6);

        hideCopy(layers[1], rich ? 0.7 : 0.74, tl);
        coverFromBelow(layers[2], layers[1], rich ? 0.72 : 0.76, tl, rich);
        show(layers[2], rich ? 0.96 : 1.0, tl);
        tl.to(progressFills[2], { scaleX: 1, duration: 0.1 }, rich ? 0.98 : 1.02)
          .addLabel("rozana", rich ? 1.02 : 1.06)
          .to({}, { duration: 0.08 });

        return tl;
      };

      let lastIndex = 0;

      const progressToIndex = (p: number) =>
        p < 0.34 ? 0 : p < 0.66 ? 1 : 2;

      mm.add("(min-width: 768px)", () => {
        const tl = buildTimeline(true);
        setLook(0, true);

        const st = ScrollTrigger.create({
          animation: tl,
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.05,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const next = progressToIndex(self.progress);
            if (next !== lastIndex) {
              lastIndex = next;
              setLook(next);
            }
          },
        });

        const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => {
          cancelAnimationFrame(raf);
          st.kill();
          tl.kill();
          layers.forEach((p) => {
            p.split?.revert();
            p.split = null;
          });
        };
      });

      mm.add("(max-width: 767px)", () => {
        const tl = buildTimeline(false);
        setLook(0, true);

        const st = ScrollTrigger.create({
          animation: tl,
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.55,
          onUpdate: (self) => {
            const next = progressToIndex(self.progress);
            if (next !== lastIndex) {
              lastIndex = next;
              setLook(next, true);
            }
          },
        });

        const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => {
          cancelAnimationFrame(raf);
          st.kill();
          tl.kill();
        };
      });

      return () => {
        layers.forEach((p) => p.split?.revert());
        mm.revert();
      };
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      id="catalogs"
      data-house="mehr"
      className="relative z-10 bg-void text-ivory"
      aria-label="The houses — Mehr, Noor, Rozana"
    >
      <div
        ref={trackRef}
        className="relative h-[260vh] bg-void motion-reduce:h-[100svh] md:h-[360vh]"
      >
        <div
          ref={stageRef}
          className="sticky top-0 h-[100svh] min-h-[100svh] overflow-hidden bg-void"
        >
          {CATALOGS.map((key, houseIndex) => {
            const item = catalogMeta[key];
            return (
              <div
                key={key}
                data-house-panel={key}
                className="absolute left-0 h-full w-full bg-void"
                style={{
                  top: houseIndex === 0 ? "0%" : "100%",
                  zIndex: houseIndex + 1,
                }}
                aria-hidden={houseIndex !== 0}
              >
                <div data-house-media className="absolute inset-0">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="100vw"
                    priority={houseIndex === 0}
                    unoptimized={isLocalPublicSrc(item.image)}
                    className="object-cover"
                    style={{ objectPosition: item.objectPosition }}
                  />
                </div>

                <div
                  data-house-veil
                  className="pointer-events-none absolute inset-0 bg-void/50"
                  aria-hidden
                />

                <div
                  data-house-edge
                  className="pointer-events-none absolute inset-x-0 top-0 z-[1] hidden h-24 origin-top opacity-0 md:block"
                  aria-hidden
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(212,188,130,0.35) 0%, transparent 100%)",
                  }}
                />

                <div
                  className="cinematic-grain pointer-events-none absolute inset-0 z-[1] hidden opacity-[0.32] md:block"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-0 z-[1]"
                  aria-hidden
                  style={{
                    background:
                      "linear-gradient(115deg, rgba(7,9,14,0.9) 0%, rgba(7,9,14,0.48) 38%, rgba(7,9,14,0.16) 58%, rgba(7,9,14,0.74) 100%)",
                  }}
                />

                <Link
                  data-house-hit
                  href={`/catalogs/${key}`}
                  aria-label={`Enter ${item.title}`}
                  tabIndex={houseIndex === 0 ? 0 : -1}
                  className="absolute inset-0 z-[2]"
                  style={{
                    pointerEvents: houseIndex === 0 ? "auto" : "none",
                  }}
                />

                <div
                  data-house-copy={key}
                  className="pointer-events-none absolute inset-0 z-[3] flex flex-col justify-end px-5 pb-16 sm:px-8 sm:pb-20 md:px-14 md:pb-24 lg:px-20"
                >
                  <div className="w-full max-w-xl">
                    <p
                      data-house-mark
                      className="text-[8px] font-medium tracking-[0.34em] text-gold uppercase sm:text-[10px] sm:tracking-[0.4em]"
                    >
                      House {NUMS[key]} · {item.subtitle}
                    </p>

                    <h2 className="mt-3 font-display text-[clamp(3rem,10vw,7rem)] font-medium leading-[0.9] tracking-[-0.03em] text-ivory uppercase sm:mt-4">
                      <Link
                        href={`/catalogs/${key}`}
                        className="pointer-events-auto transition-colors hover:text-gold"
                        tabIndex={houseIndex === 0 ? 0 : -1}
                      >
                        <span
                          data-house-title
                          className="inline-block"
                          style={{ perspective: "700px" }}
                        >
                          {item.title}
                        </span>
                      </Link>
                    </h2>

                    <p
                      data-house-essence
                      className="mt-3 font-display text-[clamp(1.15rem,2.8vw,1.85rem)] text-gold/90 sm:mt-4"
                    >
                      {ESSENCE[key]}
                    </p>

                    <p
                      data-house-body
                      className="mt-5 max-w-md text-[13px] leading-[1.75] text-ivory/65 sm:mt-6 sm:text-[14px] md:text-[15px] md:leading-[1.85]"
                    >
                      {item.tagline}. Composed under one atelier hand.
                    </p>

                    <Link
                      data-house-cta
                      href={`/catalogs/${key}`}
                      className="pointer-events-auto mt-7 inline-flex items-center gap-3 text-[10px] font-medium tracking-[0.28em] text-ivory uppercase transition-colors hover:text-gold sm:mt-8"
                      tabIndex={houseIndex === 0 ? 0 : -1}
                    >
                      Enter {item.title}
                      <span className="h-px w-10 bg-current" aria-hidden />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          <div
            data-house-chapter
            className="pointer-events-none absolute top-1/2 left-3 z-20 -translate-y-1/2 sm:left-5 md:left-8"
            aria-hidden
          >
            <p className="origin-left -rotate-90 text-[8px] font-medium tracking-[0.4em] text-gold/75 uppercase sm:text-[9px]">
              Three seals · One atelier
            </p>
          </div>

          <p
            data-house-thesis
            className="pointer-events-none absolute top-6 left-5 z-20 max-w-[12rem] font-display text-[clamp(1.15rem,2.6vw,1.65rem)] leading-[1.15] tracking-[0.02em] text-ivory/85 sm:top-8 sm:left-8 md:left-12"
          >
            Three names,
            <br />
            <span className="text-gold">one hand</span>
          </p>

          <div
            className="absolute bottom-6 left-5 z-20 flex w-[min(42vw,240px)] gap-1.5 sm:bottom-8 sm:left-8 md:left-12"
            aria-hidden
          >
            {CATALOGS.map((key) => (
              <div
                key={key}
                className="h-px flex-1 overflow-hidden bg-ivory/15"
              >
                <div
                  data-house-progress
                  className="h-full w-full origin-left bg-gold"
                />
              </div>
            ))}
          </div>

          <nav
            className="absolute top-1/2 right-4 z-20 flex -translate-y-1/2 flex-col items-end gap-4 sm:right-6 md:right-10 lg:right-14"
            aria-label="House index"
          >
            {CATALOGS.map((key) => (
              <Link
                key={key}
                href={`/catalogs/${key}`}
                className="group flex items-center gap-3"
              >
                <span
                  data-house-rail={key}
                  className="text-[9px] font-medium tracking-[0.3em] text-ivory uppercase transition-colors group-hover:text-gold sm:text-[10px]"
                >
                  {catalogMeta[key].title}
                </span>
                <span
                  data-house-rail-tick={key}
                  className="h-6 w-px origin-bottom bg-gold transition-colors group-hover:bg-gold-bright"
                  aria-hidden
                />
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
