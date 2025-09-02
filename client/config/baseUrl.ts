import { Platform } from "react-native";
import * as Device from "expo-device";
import { LAN_IP, PORT } from "@env";

// Dynamically base URL based on platform and device
const BASE_URL = Platform.select({
  android: Device.isDevice
    ? `http://${LAN_IP}:${PORT}`   // Real Android device
    : `http://10.0.2.2:${PORT}`,  // Android emulator
  ios: Device.isDevice
    ? `http://${LAN_IP}:${PORT}`   // Real iOS device
    : `http://localhost:${PORT}`,  // iOS simulator
  default: `http://localhost:${PORT}` // Web fallback
});

export default BASE_URL;
