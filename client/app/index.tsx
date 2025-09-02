import { View, Button } from "react-native";
import Link from "expo-router/link";


export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: "center", gap: 12, padding: 20 }}>
      <Link href="/addScreen" asChild>
        <Button title="Add to Wishlist" />
      </Link>
      <Link href="/wishlistScreen" asChild> 
        <Button title="View Wishlist" />
      </Link>
    </View>
  );
}
