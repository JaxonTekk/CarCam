import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system"

export default function Statistics() {
  const [memoryValue, setMemory] = useState(0);
  const [videos, setVideos] = useState(0);

  const [usedStorage, setUsedStorage] = useState(0);
  const [availableStorage, setAvailableStorage] = useState(0);

  const read = async () => {
    const videos = await AsyncStorage.getItem("@videoCount");
    if (videos) setVideos(JSON.parse(videos));

    FileSystem.getFreeDiskStorageAsync().then(freeDiskStorage => {setUsedStorage(freeDiskStorage)})
    FileSystem.getTotalDiskCapacityAsync().then(totalDiskCopacity => {setAvailableStorage(totalDiskCopacity)})
    console.log("US " + usedStorage)
    console.log("AS " + availableStorage)

    setMemory(((availableStorage-usedStorage)/availableStorage)*100)
    console.log("P " + memoryValue)
  };

  useEffect(() => {
    read();
  }, []);
  return (
    <View>
      <AnimatedCircularProgress
        size={Dimensions.get("window").width / 1.6}
        width={13}
        fill={parseInt(memoryValue)}
        backgroundWidth={6}
        rotation={(0, -360)}
        tintColor="#007F97"
        lineCap="round"
        backgroundColor="#D7EAEE"
        style={styles.circle1}
      />
      <Text style={styles.largeText}>{videos}</Text>
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
