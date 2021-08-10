import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
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
  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [parsedTimeValue, setParsedTimeValue] = useState("00:00:00");

  //timer
  const [s, setS] = useState(0);
  const [m, setM] = useState(0);
  const [h, setH] = useState(0);

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
    setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setSpeed(Math.round(position.coords.speed * 2.236936));
        },
        (error) => Alert.alert(error.message),
        { enableHighAccuracy: true, timeout: 0, maximumAge: Number.MAX_VALUE }
      );
    }, 1000);
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
            <Text style={styles.timerText}>{parsedTimeValue}</Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.speedContainer}>
            <Text style={styles.speedText}>{speed}</Text>
            <Text style={styles.mphText}> mph</Text>
          </View>
          <View style={styles.timerDateContainer}>
            <Text style={styles.recordingTimeText}>
              {new Date(time).toTimeString().substring(0, 8)}
            </Text>
            <Text style={styles.recordingDateText}>
              {new Date(time).toDateString()}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.recBtn}
          onPress={async () => {
            if (!recording) {
              setRecording(true);
              setStartTime(Date.now());
              const interval = setInterval(() => {
                if (s === 59) {
                  if (m === 59) {
                    setH(h + 1);
                    setM(0);
                  } else {
                    setM(m + 1);
                  }
                  setS(0);
                } else {
                  setS(s + 1);
                }
                setParsedTimeValue(
                  (h.toString().length === 2 ? h : "0" + h) +
                    ":" +
                    (m.toString().length === 2 ? m : "0" + m) +
                    ":" +
                    (s.toString().length === 2 ? s : "0" + s)
                );
              }, 1000);
              const video = await camera.recordAsync();
              clearInterval(interval);
              save(video);
            } else {
              setRecording(false);
              camera.stopRecording();
              setParsedTimeValue("00:00:00");
              setStartTime(0);
            }
          }}
        >
          <Text>Record</Text>
        </TouchableOpacity>
      </Camera>
    </View>
  );
}

function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let formattedHH = hh.toString().padStart(2, "0");
  let formattedMM = mm.toString().padStart(2, "0");
  let formattedSS = ss.toString().padStart(2, "0");

  return `${formattedHH}:${formattedMM}:${formattedSS}`;
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
  recordingTimeText: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 18,
    fontFamily: "Nunito-Bold",
    marginLeft: "auto",
  },
  recordingDateText: {
    paddingTop: 1,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 10,
    fontFamily: "Nunito-Light",
    textAlign: "right",
    marginLeft: "auto",
  },
  timerDateContainer: {
    backgroundColor: "white",
    opacity: 0.75,
    borderRadius: 10,
    flexDirection: "column",
    marginLeft: "auto",
    height: 60,
    marginTop: "auto",
  },
});
