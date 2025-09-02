import React from "react";
import { View, Text, Image } from "react-native";
import { format } from "date-fns";

type WishlistItemProps = {
  item: {
    id: string;
    title?: string;
    price?: string | number;
    image?: string;
    domain?: string;
    createdAt?: string | number | Date;
  };
};

export default function WishlistItem({ item }: WishlistItemProps) {
  return (
    <View className="flex-row items-center p-4 bg-white rounded-xl mb-3 shadow-sm">
      <Image
        source={{ uri: item.image || "https://via.placeholder.com/80" }}
        className="w-20 h-20 rounded-lg mr-4"
      />
      <View className="flex-1">
        <Text className="text-lg font-semibold text-gray-900 mb-1">
          {item.title || "Untitled"}
        </Text>
        <Text className="text-sm text-gray-500 mb-1">
          {item.price ? `$${item.price}` : "N/A"}
        </Text>
        <Text className="text-xs text-gray-400 mb-1">
          {item.domain || "Unknown source"}
        </Text>
        <Text className="text-xs text-gray-400">
          {item.createdAt ? format(new Date(item.createdAt), "PPpp") : ""}
        </Text>
      </View>
    </View>
  );
}
