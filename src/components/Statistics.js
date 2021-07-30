import React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

export default function Statistics() {
  let [memoryValue, setMemory] = useState(0);
  let [videos, setVideos] = useState(0);

  return (
    <View>
      <AnimatedCircularProgress
        size={Dimensions.get("window").width / 1.6}
        width={13}
        fill={75}
        backgroundWidth={6}
        rotation={(0, -360)}
        tintColor="#007F97"
        lineCap="round"
        backgroundColor="#D7EAEE"
        style={styles.circle1}
      />
      <Text style={styles.largeText}>88</Text>
      <Text style={styles.smallText}>Videos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle1: {
    marginTop: 30,
    alignItems: "center",
  },
  largeText: {
    position: "absolute",
    marginTop: Dimensions.get("window").width / 1.6 / 2 - 30,
    marginLeft: Dimensions.get("window").width / 1.6 / 2 + 20,
    fontSize: 100,
    color: "#051126",
  },
  smallText: {
    position: "absolute",
    marginTop: Dimensions.get("window").width / 1.6 / 2 + 75,
    marginLeft: Dimensions.get("window").width / 1.6 / 2 + 45,
    fontSize: 20,
    color: "#A4BCBC",
  },
});
