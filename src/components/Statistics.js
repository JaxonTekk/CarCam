import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import * as FileSystem from "expo-file-system";
import Context from "../utils/Context.js";
import { memo } from "react/cjs/react.production.min";

export default function Statistics() {
  const { videoCount } = useContext(Context);
  const [memoryValue, setMemoryValue] = useState(75);
  const [videos, setVideos] = useState(0);

  const [usedStorage, setUsedStorage] = useState(0);
  const [availableStorage, setAvailableStorage] = useState(0);

  const read = async () => {
    await FileSystem.getFreeDiskStorageAsync().then((freeDiskStorage) =>
      setUsedStorage(freeDiskStorage)
    );
    await FileSystem.getTotalDiskCapacityAsync().then((totalDiskCopacity) =>
      setAvailableStorage(totalDiskCopacity)
    );
    setMemoryValue(
      Math.floor(((availableStorage - usedStorage) / availableStorage) * 100)
    );
    console.log(memoryValue);
  };

  useEffect(() => {
    read();
  }, []);

  setTimeout(() => {
    setMemory(memoryValue);
  }, 10000);

  if (!memoryValue) return <Text>Loading</Text>;

  return (
    <View style={{ alignItems: "center", marginTop: 30 }}>
      <AnimatedCircularProgress
        size={Dimensions.get("window").width / 1.6}
        width={13}
        fill={memoryValue}
        backgroundWidth={6}
        rotation={(0, -360)}
        tintColor="#007F97"
        lineCap="round"
        backgroundColor="#D7EAEE"
      >
        {(fill) => (
          <View>
            <Text style={styles.largeText}>{videoCount}</Text>
            <Text style={styles.smallText}>{memoryValue}</Text>
          </View>
        )}
      </AnimatedCircularProgress>
    </View>
  );
}

const styles = StyleSheet.create({
  largeText: {
    fontSize: 100,
    color: "#051126",
    textAlign: "center",
    fontFamily: "Nunito-Regular",
  },
  smallText: {
    fontSize: 20,
    color: "#A4BCBC",
    textAlign: "center",
    fontFamily: "Nunito-Light",
  },
});
