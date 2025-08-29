import { useState } from "react";

export function useWishlist() {
  const [wishlist, setWishlist] = useState<any[]>([]);

  const addItem = (item: any) => {
    setWishlist((prev) => [...prev, item]);
  };

  return { wishlist, addItem };
}
