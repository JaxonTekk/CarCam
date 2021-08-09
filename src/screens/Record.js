import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  Platform,
  Dimensions,
  Alert,
} from "react-native";
import { Camera } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as Location from "expo-location";
import Context from "../utils/Context.js";

export default function Record() {
  const { videoCount, setVideoCount } = useContext(Context);
  const [camera, setCamera] = useState(undefined);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [recording, setRecording] = useState(false);
  const [speed, setSpeed] = useState(0.0);

  const save = async (video) => {
    await AsyncStorage.setItem("@videoCount", JSON.stringify(videoCount + 1));
    setVideoCount(videoCount + 1);
    const videos = await AsyncStorage.getItem("@videos");
    if (videos) {
      const parsedVideos = JSON.parse(videos);
      await AsyncStorage.setItem(
        "@videos",
        JSON.stringify([...parsedVideos, { date: new Date(), uri: video.uri }])
      );
    } else {
      await AsyncStorage.setItem(
        "@videos",
        JSON.stringify([{ date: new Date(), uri: video.uri }])
      );
    }
  };

  useEffect(() => {
    Location.installWebGeolocationPolyfill();
    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setSpeed(Math.ceil(position.coords.speed.toFixed(2)));
        },
        (error) => Alert.alert(error.message),
        { enableHighAccuracy: true, timeout: 0, maximumAge: Number.MAX_VALUE }
      );
    }, 2000);
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={(ref) => setCamera(ref)}>
        <View style={styles.topContainer}>
          <TouchableOpacity
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <View style={styles.buttonBackground}>
              <MaterialIcons
                name="flip-camera-ios"
                size={Dimensions.get("window").width / 25}
                style={styles.cameraIcon}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.timerContainer}>
            <MaterialIcons
              name="fiber-manual-record"
              size={Dimensions.get("window").width / 25}
              style={styles.recordIcon}
            />
            <Text style={styles.timerText}>00:00:00</Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.speedContainer}>
            <Text style={styles.speedText}>{speed}</Text>
            <Text style={styles.mphText}> mph</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.recBtn}
          onPress={async () => {
            if (!recording) {
              setRecording(true);
              const video = await camera.recordAsync();
              save(video);
            } else {
              setRecording(false);
              camera.stopRecording();
            }
          }}
        >
          <Text>Record</Text>
        </TouchableOpacity>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  bottomContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
    marginTop: "auto",
  },
  topContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  cameraIcon: {
    color: "black",
    margin: 8,
  },
  recordIcon: {
    color: "#F86A6A",
    margin: 8,
  },
  buttonBackground: {
    borderRadius: 10000000,
    backgroundColor: "white",
    opacity: 0.75,
  },
  timerContainer: {
    backgroundColor: "white",
    opacity: 0.75,
    borderRadius: 10,
    flexDirection: "row",
    marginLeft: "auto",
  },
  timerText: {
    fontSize: Dimensions.get("window").width / 30,
    margin: 6,
    fontFamily: "Nunito-Bold",
  },
  speedContainer: {
    flexDirection: "row",
  },
  speedText: {
    fontSize: Dimensions.get("window").width / 11,
    fontFamily: "Nunito-Bold",
    color: "white",
    marginTop: "auto",
    marginTop:
      Dimensions.get("window").width / 11 - Dimensions.get("window").width / 13,
  },
  mphText: {
    fontSize: Dimensions.get("window").width / 13,
    fontFamily: "Nunito-Bold",
    color: "white",
    marginTop: "auto",
  },

  recBtn: {
    borderWidth: 5,
    backgroundColor: "white",
    padding: 15,
  },
});
