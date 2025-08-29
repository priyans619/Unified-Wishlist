// src/app/_layout.tsx
import "../../global.css";
import { Stack } from "expo-router";
import { WishlistProvider } from "../context/WIshlistContext";

export default function RootLayout() {
  return (
    <WishlistProvider>
      <Stack />
    </WishlistProvider>
  );
}
