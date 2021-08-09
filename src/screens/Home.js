import React from "react";
import { View, Dimensions, Button } from "react-native";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import Header from "../components/Header";
import Statistics from "../components/Statistics";
import Features from "../components/Features";
import ViewRecordings from "./ViewRecordings";
import ViewVideo from "./ViewVideo.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HomeScreen({ navigation }) {
  return (
    <View style={{ backgroundColor: "#F8F8F8" }}>
      <Header />
      <Statistics />
      <Features navigation={navigation} />
      <Button
        title="Clear Data"
        onPress={async () => await AsyncStorage.clear()}
      />
    </View>
  );
}

const Stack = createStackNavigator();

export default function Home() {
  return (
    <Stack.Navigator initialRouteHome="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="View Recordings"
        component={ViewRecordings}
        options={{
          title: "RECORDINGS",
          headerStyle: {
            backgroundColor: "#FFFFFF",
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.5,
            shadowRadius: 3.84,
            elevation: 5,
            height: Dimensions.get("window").height / 9,
          },
          headerTitleStyle: {
            fontSize: 25,
            fontFamily: "Nunito-Bold",
          },
          headerBackTitle: " ",
          headerTintColor: "#000000",
          headerBackTitleStyle: {
            fontSize: 30,
            marginLeft: 10,
          },
        }}
      />
      <Stack.Screen name="View Video" component={ViewVideo} />
    </Stack.Navigator>
  );
}
