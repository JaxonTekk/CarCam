import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ocitcons from "react-native-vector-icons/Octicons";
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
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="home" color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Record"
          component={Record}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="fiber-smart-record" color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <Ocitcons name="file-directory" color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
