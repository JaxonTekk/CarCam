import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import * as Font from "expo-font";
import TabNavigator from "./components/TabNavigator.js";

export default function Render() {
  const [loaded] = useFonts({
    NunitoRegular: require("./assets/fonts/Nunito/Nunito-Regular.ttf"),
    NunitoBold: require("./assets/fonts/Nunito/Nunito-Bold.ttf"),
  });

  useEffect(async () => {
    await Font.loadAsync({
      "Nunito-Regular": require("./assets/fonts/Nunito/Nunito-Regular.ttf"),
      "Nunito-Bold": require("./assets/fonts/Nunito/Nunito-Bold.ttf"),
    });
  }, []);

  if (!loaded) {
    return <ActivityIndicator />;
  }

  return <TabNavigator />;
}
