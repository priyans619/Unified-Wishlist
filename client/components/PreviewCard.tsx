// src/components/PreviewCard.tsx
import React from "react";
import { View, Text, Image, Linking, Pressable } from "react-native";

export default function PreviewCard({ data }: { data: any }) {
  return (
    <Pressable
      onPress={() => data.url && Linking.openURL(data.url)}
      className="border rounded-lg p-4 bg-gray-50 shadow-sm"
    >
      <Image
        source={{ uri: data.image || "https://via.placeholder.com/150" }}
        className="w-full h-40 rounded mb-3 bg-gray-200"
      />
      <Text className="font-bold text-lg mb-1 text-gray-900">{data.title}</Text>
      <Text className="text-gray-600 mb-1">{data.price || "N/A"}</Text>
      <Text className="text-gray-400 text-sm">{data.domain || "Unknown"}</Text>
    </Pressable>
  );
}
