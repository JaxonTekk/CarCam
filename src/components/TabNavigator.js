import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
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
            activeBackgroundColor: "#4c3f77",
            inactiveBackgroundColor: "#FFFFFF",
            activeTintColor: "white",
            inactiveTintColor: "#4c3f77",
          }
        }
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <Feather name="home" color={color} size={25} />
            ),
          }}
          listeners={({ navigation }) => ({tabPress: (e) => { ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP) }})}
        />
        <Tab.Screen
          name="Record"
          component={Record}
          options={{
            tabBarLabel: "Record",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="record-circle-outline" color={color} size={25} />
            ),
          }}
          listeners={({ navigation }) => ({tabPress: (e) => { ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE) }})}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ color }) => (
              <SimpleLineIcons name="settings" color={color} size={25} />
            ),
          }}
          listeners={({ navigation }) => ({tabPress: (e) => { ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP) }})}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
