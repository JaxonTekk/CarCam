import React from "react";
import { useFonts } from "expo-font";
import * as Font from "expo-font";
import TabNavigator from "./src/components/TabNavigator.js";

export default function App() {
  Font.loadAsync({
    "Nunito-Regular": require("./assets/fonts/Nunito/Nunito-Regular.ttf"),
    "Nunito-Bold": require("./assets/fonts/Nunito/Nunito-Bold.ttf"),
  });
  const [loaded] = useFonts({
    NunitoRegular: require("./assets/fonts/Nunito/Nunito-Regular.ttf"),
    NunitoBold: require("./assets/fonts/Nunito/Nunito-Bold.ttf"),
  });
  if (!loaded) {
    return null;
  }

  return <TabNavigator />;
}
