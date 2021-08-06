import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import * as Font from "expo-font";
import TabNavigator from "./components/TabNavigator.js";

export default function Render() {
  const [loaded, setLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      "Nunito-Regular": require("../assets/fonts/Nunito/Nunito-Regular.ttf"),
      "Nunito-Bold": require("../assets/fonts/Nunito/Nunito-Bold.ttf"),
    });
    setLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!loaded) {
    return <ActivityIndicator />;
  }

  return <TabNavigator />;
}
