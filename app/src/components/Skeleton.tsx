import React from "react";
import { View } from "react-native";

export default function Skeleton() {
  return (
    <View
      style={{
        marginTop: 12,
        width: "100%",
        height: 150,
        borderRadius: 8,
        backgroundColor: "#e0e0e0",
      }}
    />
  );
}
