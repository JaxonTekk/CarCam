import React, { useState } from "react";
import { BottomNavigation } from "react-native-paper";
import Home from "./Screens/Home";
import Record from "./Screens/Record";
import Settings from "./Screens/Settings";

export default function LandingPageViewController() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "home", title: "Home", icon: "home" },
    { key: "record", title: "Record", icon: "record" },
    { key: "settings", title: "Settings", icon: "cog" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    record: Record,
    settings: Settings,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
