import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import Context from "./utils/Context.js";
import TabNavigator from "./components/TabNavigator.js";

export default function Render() {
  const [loaded, setLoaded] = useState(false);
  const [videoCount, setVideoCount] = useState(0);
  const [uri, setUri] = useState(undefined);

  const read = async () => {
    const videoCount = await AsyncStorage.getItem("@videoCount");
    if (videoCount) setVideoCount(JSON.parse(videoCount));
  };

  const loadFonts = async () => {
    await Font.loadAsync({
      "Nunito-Regular": require("../assets/fonts/Nunito/Nunito-Regular.ttf"),
      "Nunito-Bold": require("../assets/fonts/Nunito/Nunito-Bold.ttf"),
      "Nunito-Light": require("../assets/fonts/Nunito/Nunito-Light.ttf"),
    });
    setLoaded(true);
  };

  useEffect(() => {
    read();
    loadFonts();
  }, []);

  if (!loaded) {
    return <ActivityIndicator />;
  }

  return (
    <Context.Provider value={{ videoCount, setVideoCount, uri, setUri }}>
      <TabNavigator />
    </Context.Provider>
  );
}
