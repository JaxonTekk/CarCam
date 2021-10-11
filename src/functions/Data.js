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
