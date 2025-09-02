import "../../global.css";
import { Stack } from "expo-router";
import { WishlistProvider } from "../context/WishContext";

export default function RootLayout() {
  return (
    <WishlistProvider>
      <Stack screenOptions={{ headerShown: true }}>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen
          name="addScreen"
          options={{ title: "Add Item" }}
          initialParams={{ url: undefined }}
        />
        <Stack.Screen
          name="wishlistScreen"
          options={{ title: "Wishlist" }}
        />
      </Stack>
    </WishlistProvider>
  );
}
