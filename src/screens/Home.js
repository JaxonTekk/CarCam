import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "../components/Header";
import Statistics from "../components/Statistics";
import Features from "../components/Features";
import ViewRecordings from "./ViewRecordings";

function HomeScreen({ navigation }) {
  return (
    <View style={{ backgroundColor: "#F8F8F8" }}>
      <Header />
      <Statistics />
      <Features navigation={navigation} />
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
      <Stack.Screen name="View Recordings" component={ViewRecordings} />
    </Stack.Navigator>
  );
}
