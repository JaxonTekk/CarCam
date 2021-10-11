import AsyncStorage from "@react-native-async-storage/async-storage";

export const readVideoCount = async (setVideoCount) => {
  const videoCount = await AsyncStorage.getItem("@videoCount");
  if (videoCount) setVideoCount(JSON.parse(videoCount));
};
