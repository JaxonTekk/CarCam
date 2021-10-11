import * as Font from "expo-font";

export const loadFonts = async (setLoaded) => {
  await Font.loadAsync({
    "Nunito-Regular": require("../assets/fonts/Nunito/Nunito-Regular.ttf"),
    "Nunito-Bold": require("../assets/fonts/Nunito/Nunito-Bold.ttf"),
    "Nunito-Light": require("../assets/fonts/Nunito/Nunito-Light.ttf"),
  });
  setLoaded(true);
};
