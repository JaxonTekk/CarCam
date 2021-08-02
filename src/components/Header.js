import React from "react";
import { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, Dimensions } from "react-native";

export default function Header() {
  return (
    <SafeAreaView style={styles.rectangle}>
      <Text style={styles.largeText}>HOME</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rectangle: {
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "space-between",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  largeText: {
    marginBottom: 10,
    fontSize: 26,
    fontFamily: "Nunito-Bold",
    textAlign: "center",
  },
});
