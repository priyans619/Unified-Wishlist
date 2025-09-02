// app/utils/storage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WishlistItem } from "../context/WishContext";

const STORAGE_KEY = "wishlist_items";

export async function saveItems(items: WishlistItem[]) {
  try {
    const json = JSON.stringify(items);
    await AsyncStorage.setItem(STORAGE_KEY, json);
  } catch (e) {
    console.error("Error saving wishlist:", e);
  }
}

export async function loadItems(): Promise<WishlistItem[] | null> {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : null;
  } catch (e) {
    console.error("Error loading wishlist:", e);
    return null;
  }
}

export async function clearItems() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error("Error clearing wishlist:", e);
  }
}
