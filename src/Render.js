import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import Context from "./utils/Context.js";
import TabNavigator from "./components/TabNavigator.js";
import { readVideoCount } from "./functions/Data.js";
import { loadFonts } from "./functions/LoadFonts.js";

export default function Render() {
  const [loaded, setLoaded] = useState(false);
  const [videoCount, setVideoCount] = useState(0);
  const [uri, setUri] = useState(undefined);
  const [videos, setVideos] = useState(undefined);
  const [d, setD] = useState(undefined);

  useEffect(() => {
    readVideoCount(setVideoCount);
    loadFonts(setLoaded);
  }, []);

  if (!loaded) {
    return <ActivityIndicator />;
  }

  return (
    <Context.Provider
      value={{
        videoCount,
        setVideoCount,
        uri,
        setUri,
        videos,
        setVideos,
        d,
        setD,
      }}
    >
      <StatusBar style="dark" />
      <TabNavigator />
    </Context.Provider>
  );
}
