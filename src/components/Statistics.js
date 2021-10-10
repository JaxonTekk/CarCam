import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import * as FileSystem from "expo-file-system";
import Context from "../utils/Context.js";

export default function Statistics() {
  const { videoCount } = useContext(Context);
  const [memoryValue, setMemoryValue] = useState(75);
  const [videos, setVideos] = useState(0);

  const [usedStorage, setUsedStorage] = useState(0);
  const [availableStorage, setAvailableStorage] = useState(0);

  const [screenWidth, setScreenWidth] = useState(0);

  const read = async () => {
    await FileSystem.getFreeDiskStorageAsync().then((freeDiskStorage) =>
      setUsedStorage(freeDiskStorage)
    );
    await FileSystem.getTotalDiskCapacityAsync().then((totalDiskCopacity) => {
      setAvailableStorage(totalDiskCopacity);
      setMemoryValue(
        Math.floor(((availableStorage - usedStorage) / availableStorage) * 100)
      );
    });
  };

  useEffect(() => {
    read();
    setScreenWidth(Dimensions.get("window").width);
  }, [memoryValue, usedStorage, availableStorage]);

  return (
    <View style={{ alignItems: "center", marginTop: 30 }}>
      <AnimatedCircularProgress
        size={screenWidth / 1.6}
        width={13}
        fill={memoryValue}
        backgroundWidth={6}
        rotation={(0, -360)}
        tintColor="#007F97"
        lineCap="round"
        backgroundColor="#D7EAEE"
        style={styles.progressBar}
      >
        {(fill) => (
          <View>
            <Text style={styles.largeText}>{videoCount}</Text>
            <Text style={styles.smallText}>Videos</Text>
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
    shadowOpacity: 0,
    elevation: 0,
  },

  smallText: {
    fontSize: 20,
    color: "#A4BCBC",
    textAlign: "center",
    fontFamily: "Nunito-Light",
    shadowOpacity: 0,
    elevation: 0,
  },

  progressBar: {
    shadowColor: "#999999",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.8,
    elevation: 10,
  },
});
