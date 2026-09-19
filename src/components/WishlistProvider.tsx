"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type WishlistItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  /** Product detail base path, e.g. /collections/rings */
  collectionPath?: string;
};

type WishlistContextValue = {
  items: WishlistItem[];
  count: number;
  has: (id: string) => boolean;
  toggle: (item: WishlistItem) => void;
  remove: (id: string) => void;
  clear: () => void;
  /** False until localStorage has been read, so the UI can avoid a flash. */
  hydrated: boolean;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);
const STORAGE_KEY = "kundan-wishlist-v1";

/**
 * Wishlist store.
 *
 * The previous ProductCard kept a `liked` flag in local component state, so
 * every heart reset on unmount and nothing was shared with the header. This
 * mirrors CartProvider — same localStorage pattern, same hydration guard —
 * so hearts persist and the header badge has something real to count.
 *
 * TODO(kundan): this is client-only. Wire to an account once auth exists,
 * so a wishlist follows the customer across devices.
 */
export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as WishlistItem[]);
    } catch {
      // Private mode or blocked storage — run with an empty wishlist.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Nothing to do; the in-memory list still works for this session.
    }
  }, [items, hydrated]);

  const toggle = useCallback((item: WishlistItem) => {
    setItems((prev) =>
      prev.some((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item]
    );
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<WishlistContextValue>(
    () => ({
      items,
      count: items.length,
      has: (id: string) => items.some((i) => i.id === id),
      toggle,
      remove,
      clear,
      hydrated,
    }),
    [items, toggle, remove, clear, hydrated]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
