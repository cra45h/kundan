import { ANNOUNCEMENT_TEXT } from "@/config/site";

/**
 * Thin bar above the header. Static text, no marquee — the old ticker
 * overflowed and clipped its last item on narrow screens.
 */
export function AnnouncementBar() {
  return (
    <div className="bg-void text-ivory/90">
      <p className="type-announce mx-auto max-w-[1280px] px-4 py-2.5 text-center">
        {ANNOUNCEMENT_TEXT}
      </p>
    </div>
  );
}
