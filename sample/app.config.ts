import { type ConfigContext, type ExpoConfig } from "expo/config";
import "ts-node/register";

import type { TrackAsiaPluginProps } from "./src/plugin/withTrackAsia";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "TrackAsia Sample",
  slug: "trackasia-sample-react-native",
  version: "1.0.0",
  newArchEnabled: true,
  orientation: "portrait",
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "cover",
    backgroundColor: "#285daa",
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.trackasia.expo.sample",
    infoPlist: {
      NSLocationWhenInUseUsageDescription:
        "Permission is necessary to display user location",
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.trackasia.expo.example",
  },
  androidStatusBar: {
    backgroundColor: "#285daa",
    translucent: false,
  },
  plugins: [
    [
      "./src/plugin/withTrackAsia.ts",
      {
        android: {},
        ios: {},
      } as TrackAsiaPluginProps,
    ],
  ],
});
