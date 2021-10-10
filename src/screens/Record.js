import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Alert,
} from "react-native";
import { Camera } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as Location from "expo-location";
import Context from "../utils/Context.js";
import * as VideoThumbnails from "expo-video-thumbnails";
import { Stopwatch, Timer } from "react-native-stopwatch-timer";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import useState from "react-usestateref";

export default function Record() {
  const { videoCount, setVideoCount } = useContext(Context);
  const [camera, setCamera] = useState(undefined);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [recording, setRecording] = useState(false);
  const [speed, setSpeed] = useState(0.0);
  const [time, setTime] = useState(0);

  // Setting Value
  const [settingSpeed, setSettingSpeed] = useState("mph");
  const [maxRecordingTime, setMaxRecordingTime] = useState(15);
  const [saveVideoToPhotoGallery, setSaveVideoToPhotoGallery] = useState(false);

  //timer
  const [stopwatchStart, setStopwatchStart] = useState(false);
  const [stopwatchReset, setStopwatchReset] = useState(false);
  const [stopwatchTime, setStopwatchTimer, counterRef] = useState("00:00:00");

  function toggleStopWatch() {
    setStopwatchStart(!stopwatchStart);
    setStopwatchReset(false);
  }

  function resetStopWatch() {
    setStopwatchStart(false);
    setStopwatchReset(true);
  }

  // https://stackoverflow.com/questions/9640266/convert-hhmmss-string-to-seconds-only-in-javascript
  function convertTimeToS(timeValue) {
    var a = timeValue.split(":"); // split it at the colons

    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
    return seconds;
  }

  const read = async () => {
    const settings = await AsyncStorage.getItem("@settings");
    if (settings) {
      const parsedSettings = JSON.parse(settings);
      setSettingSpeed(parsedSettings.value);
      setMaxRecordingTime(parsedSettings.maxRecordingTime);
      setSaveVideoToPhotoGallery(parsedSettings.saveVideoToPhotoGallery);
    }
  };

  const save = async (video, thumbnail, size, duration) => {
    await AsyncStorage.setItem("@videoCount", JSON.stringify(videoCount + 1));
    setVideoCount(videoCount + 1);
    const videos = await AsyncStorage.getItem("@videos");
    toggleStopWatch();
    resetStopWatch();
    if (videos) {
      const parsedVideos = JSON.parse(videos);
      await AsyncStorage.setItem(
        "@videos",
        JSON.stringify([
          ...parsedVideos,
          {
            date: new Date(),
            uri: video.uri,
            thumbnail: thumbnail,
            size: size,
            duration: counterRef.current,
          },
        ])
      );
    } else {
      await AsyncStorage.setItem(
        "@videos",
        JSON.stringify([
          {
            date: new Date(),
            uri: video.uri,
            thumbnail: thumbnail,
            size: size,
            duration: counterRef.current,
          },
        ])
      );
    }
  };

  useEffect(() => {
    read();
    Location.installWebGeolocationPolyfill();
    setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (settingSpeed == "mph") {
            setSpeed(Math.round(position.coords.speed * 2.236936));
          } else {
            setSpeed(Math.round(position.coords.speed * 3.6));
          }
        },
        (error) => console.log(error.message),
        { enableHighAccuracy: true, timeout: 0, maximumAge: Number.MAX_VALUE }
      );
      setTime(Date.now());
    }, 1000);
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, [stopwatchTime]);

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
                color="#F86A6A"
                style={styles.cameraIcon}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              if (!recording) {
                setRecording(true);
                toggleStopWatch();
                const video = await camera.recordAsync();
                const { uri } = await VideoThumbnails.getThumbnailAsync(
                  video.uri,
                  {
                    time: convertTimeToS(stopwatchTime) / 2,
                  }
                );
                const { size } = await FileSystem.getInfoAsync(video.uri);
                if (saveVideoToPhotoGallery) {
                  await MediaLibrary.saveToLibraryAsync(video.uri);
                }
                save(video, uri, size, stopwatchTime);
              } else {
                setRecording(false);
                camera.stopRecording();
              }
            }}
            style={{ marginLeft: 10 }}
          >
            <View style={styles.buttonBackground}>
              <MaterialIcons
                name="fiber-smart-record"
                size={Dimensions.get("window").width / 25}
                style={styles.cameraIcon1}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.timerContainer}>
            <MaterialIcons
              name="fiber-manual-record"
              size={Dimensions.get("window").width / 25}
              style={styles.recordIcon}
            />
            <Stopwatch
              options={timerOptions}
              start={stopwatchStart}
              reset={stopwatchReset}
              getTime={(time) => {
                setTimeout(() => {
                  setStopwatchTimer(time);
                }, 0);
              }}
              getMsecs={(time) => {
                if (time > maxRecordingTime * 60000) {
                  setRecording(false);
                  toggleStopWatch();
                  resetStopWatch();
                  camera.stopRecording();
                  Alert.alert(
                    "Warning",
                    "This recording has stopped because it has reached the maximum Time Per Video value. To change this value, please go to the settings page.\n\nYou have set a maximum of " +
                      maxRecordingTime +
                      " min per video."
                  );
                }
              }}
            />
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.speedContainer}>
            <Text style={styles.speedText}>{speed}</Text>
            <Text style={styles.mphText}> {settingSpeed}</Text>
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

  cameraIcon1: {
    color: "#F86A6A",
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

const timerOptions = {
  container: {
    backgroundColor: "white",
    borderRadius: 10,
  },

  text: {
    fontFamily: "Nunito-Bold",
    fontSize: Dimensions.get("window").width / 30,
    margin: 6,
  },
};
