import React from "react";
import { View } from "react-native";
import Header from "../Components/Header";
import Statistics from "../Components/Statistics";
import Features from "../Components/Features";

export default function Home() {
  return (
    <View style={{backgroundColor: '#F8F8F8'}}>
      <Header />
      <Statistics />
      <Features />
    </View>
  );
}
