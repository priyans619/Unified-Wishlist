import { createContext, useContext, useState, useEffect } from "react";
import { loadItems, saveItems } from "../utils/storage";

const WishlistContext = createContext<any>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const saved = await loadItems();
      if (saved) setItems(saved);
    })();
  }, []);

  useEffect(() => {
    saveItems(items);
  }, [items]);

  const addItem = (item: any) => {
    setItems((prev) => [...prev, item]);
  };

  return (
    <WishlistContext.Provider value={{ items, addItem }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
