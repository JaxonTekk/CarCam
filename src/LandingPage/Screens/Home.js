import React from "react";
import { View } from "react-native";
import Header from "../Components/Header";
import Statistics from "../Components/Statistics";
import Features from "../Components/Features";

export default function Home() {
  return (
    <View>
      <Header />
      <Statistics />
      <Features />
    </View>
  );
}
