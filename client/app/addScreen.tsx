import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useWishlist } from "../context/WishContext";
import PreviewCard from "../components/PreviewCard";
import Skeleton from "../components/Skeleton";
import BASE_URL from "../config/baseUrl";

export default function AddScreen() {
  const { addItem } = useWishlist();
  const router = useRouter();
  const { url } = useLocalSearchParams<{ url?: string }>();

  const [preview, setPreview] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch preview from backend
  const fetchPreview = async (urlToFetch: string) => {
    setLoading(true);
    setError(null);
    setPreview(null);

    try {
      const res = await fetch(`${BASE_URL}/api/preview`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlToFetch }),
      });

      if (!res.ok) throw new Error("Failed to fetch preview");

      const data = await res.json();
      setPreview({ ...data, url: urlToFetch, createdAt: new Date().toISOString() });
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch when deep link param is available
  useEffect(() => {
    if (url) {
      fetchPreview(url as string);
    }
  }, [url]);

  // Add item to wishlist
  const handleAdd = () => {
    if (preview) {
      addItem(preview);
      router.push("/wishlistScreen"); // Navigate to wishlist after adding
    }
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-lg font-bold mb-4">Add Product</Text>

      {loading && <Skeleton />}

      {error && (
        <View className="mt-4">
          <Text className="text-red-500">{error}</Text>
          {url && (
            <Button
              title="Retry"
              onPress={() => fetchPreview(url as string)}
            />
          )}
        </View>
      )}

      {preview && !loading && (
        <View className="mt-4">
          <PreviewCard data={preview} />
          <Button title="Add to Wishlist" onPress={handleAdd} />
        </View>
      )}

      {!preview && !loading && !error && (
        <Text className="mt-4 text-gray-500">Waiting for deep link...</Text>
      )}
    </View>
  );
}
