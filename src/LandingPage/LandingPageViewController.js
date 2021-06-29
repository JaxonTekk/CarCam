import React, { useState } from "react";
import { BottomNavigation } from "react-native-paper";
import {StyleSheet } from "react-native";
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

  if( index == 1 ) {
    return (
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={styles.bar1}
      />
      );
  }
  else { return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={styles.bar}
    />
    );
  }
}

const styles = StyleSheet.create({
  bar: {
    borderColor: 'transparent',
    overflow: 'hidden',
    borderRadius: 20,
    backgroundColor: '#4C3F77',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  bar1: {
    borderColor: 'transparent',
    overflow: 'hidden',
    borderRadius: 20,
    backgroundColor: '#4C3F77',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    marginBottom: -55
  },
});