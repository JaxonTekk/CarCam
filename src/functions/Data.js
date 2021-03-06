import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const saveSettings = async (settings) => {
  await AsyncStorage.setItem("@settings", JSON.stringify(settings));
};

export const clear = async (
  setMaxRecordingTime,
  setSaveVideoToPhotoGallery,
  setVideoCount,
  setVideos,
  setMph
) => {
  Alert.alert(
    "Delete all Data",
    "Are you sure that you want to delete ALL data within this app? This action CANNOT be undone.",
    [
      {
        text: "Yes",
        onPress: () => {
          AsyncStorage.clear().then(() => {
            setMaxRecordingTime(15);
            setSaveVideoToPhotoGallery(false);
            setVideoCount(0);
            setVideos(undefined);
            setMph(true);
            Alert.alert(
              "Success",
              "Successfully deleted all data within this app!"
            );
          });
        },
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]
  );
};

export const readSettings = async (
  setMemoryValue,
  setMaxRecordingTime,
  setSaveVideoToPhotoGallery,
  setMph
) => {
  const settings = await AsyncStorage.getItem("@settings");
  if (settings) {
    const parsedSettings = JSON.parse(settings);
    setMemoryValue(parsedSettings.memoryValue);
    setMaxRecordingTime(parsedSettings.maxRecordingTime);
    setSaveVideoToPhotoGallery(parsedSettings.saveVideoToPhotoGallery);
    setMph(parsedSettings.mph);
  }
};

export const readVideoCount = async (setVideoCount) => {
  const videoCount = await AsyncStorage.getItem("@videoCount");
  if (videoCount) setVideoCount(JSON.parse(videoCount));
};

export const deleteVideo = async (
  videos,
  setVideos,
  videoCount,
  setVideoCount,
  uri,
  setUri,
  navigation
) => {
  const cpy = videos.filter((v) => v.uri !== uri);
  setVideos(cpy);
  setVideoCount(videoCount - 1);
  setUri(undefined);
  await AsyncStorage.setItem("@videos", JSON.stringify(cpy));
  await AsyncStorage.setItem("@videoCount", JSON.stringify(videoCount - 1));
  navigation.navigate("View Recordings");
};

export const saveVideo = async (
  videoCount,
  setVideoCount,
  toggleStopWatch,
  resetStopWatch,
  video,
  thumbnail,
  size,
  counterRef,
  startTime
) => {
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
          date: startTime,
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
          date: startTime,
          uri: video.uri,
          thumbnail: thumbnail,
          size: size,
          duration: counterRef.current,
        },
      ])
    );
  }
};
