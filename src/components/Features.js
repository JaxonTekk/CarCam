import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function Features({ navigation }) {
  return (
    <View styles={{ flexDirection: "column", justifyContent: "space-between" }}>
      <TouchableOpacity onPress={() => navigation.navigate("View Recordings")}>
        <View style={styles.rectangle}>
          <MaterialIcons name="collections" size={60} style={styles.icons} />
          <View style={{ flexDirection: "column", flexShrink: 1 }}>
            <Text style={styles.largeText}>View Recordings</Text>
            <Text style={styles.smallText}>
              Manage all of your previous recordings
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  rectangle: {
    backgroundColor: "white",
    flexDirection: "row",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 10,
    marginBottom: 10,
  },
  icons: {
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 20,
    color: "#DF4F97",
  },
  largeText: {
    marginTop: 15,
    fontFamily: "Nunito-Bold",
    fontSize: 20,
    marginLeft: 20,
  },
  smallText: {
    marginLeft: 20,
    fontFamily: "Nunito-Regular",
    marginTop: 4,
    color: "#8D8D8D",
    fontSize: 15,
  },
});
