// app/context/WishContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import { loadItems, saveItems } from "../utils/storage";

export type WishlistItem = {
  id: string;
  title: string;
  image?: string;
  price?: string;
  source?: string;
  createdAt: string;
};

type WishlistContextType = {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  clearWishlist: () => void;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);

  // Load persisted items on mount
  useEffect(() => {
    (async () => {
      try {
        const saved = await loadItems();
        if (saved) setItems(saved);
      } catch (err) {
        console.error("Failed to load wishlist:", err);
      }
    })();
  }, []);

  // Save items whenever they change
  useEffect(() => {
    (async () => {
      try {
        await saveItems(items);
      } catch (err) {
        console.error("Failed to save wishlist:", err);
      }
    })();
  }, [items]);

  const addItem = (item: WishlistItem) => {
    setItems((prev) => {
      // prevent duplicates by id
      if (prev.some((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearWishlist = () => {
    setItems([]);
  };

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }
  return context;
}
