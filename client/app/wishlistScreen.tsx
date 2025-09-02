import React from "react";
import { View, Text, FlatList } from "react-native";
import { useWishlist } from "../context/WishContext";
import WishlistItem from "../components/WishlistItem";

export default function WishlistScreen() {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-gray-500 text-lg">No items yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      className="bg-white"
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <WishlistItem item={item} />}
      contentContainerStyle={{ padding: 16 }}
      showsVerticalScrollIndicator={false}
    />
  );
}
