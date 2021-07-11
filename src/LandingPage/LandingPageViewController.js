import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Screens/Home.js";
import Record from "./Screens/Record.js";
import Settings from "./Screens/Settings.js";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeBackgroundColor: "#4c3f77",
          inactiveBackgroundColor: "#4c3f77",
          activeTintColor: "white",
          inactiveTintColor: "white",
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Record" component={Record} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
