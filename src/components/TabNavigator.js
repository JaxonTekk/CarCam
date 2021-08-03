import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ocitcons from "react-native-vector-icons/Octicons";
import Home from "../screens/Home.js";
import Record from "../screens/Record.js";
import Settings from "../screens/Settings.js";
import * as ScreenOrientation from "expo-screen-orientation"

const Tab = createBottomTabNavigator();

export default function TabNaivgator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={
          {
            // activeBackgroundColor: "#4c3f77",
            // inactiveBackgroundColor: "#4c3f77",
            // activeTintColor: "white",
            // inactiveTintColor: "white",
          }
        }
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <Ocitcons name="file-directory" color={color} />
            ),
          }}
          listeners={({ navigation }) => ({tabPress: (e) => { ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT) }})}
        />
        <Tab.Screen
          name="Record"
          component={Record}
          options={{
            tabBarLabel: "Record",
            tabBarIcon: ({ color }) => (
              <Ocitcons name="file-directory" color={color} />
            ),
          }}
          listeners={({ navigation }) => ({tabPress: (e) => { ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL) }})}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ color }) => (
              <Ocitcons name="file-directory" color={color} />
            ),
          }}
          listeners={({ navigation }) => ({tabPress: (e) => { ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT) }})}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
