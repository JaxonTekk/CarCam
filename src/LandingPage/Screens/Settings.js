import React from "react";
import { SafeAreaView, Text, ScrollView, StyleSheet, Dimensions, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function Settings() {
  return (
    <View styles={styles.container}>
      <View style={styles.rectangle}>
        <Text style={styles.largeText}>SETTINGS</Text>
      </View>
      <ScrollView>
        <View>
          <FontAwesome5 name="memory" size={45} style={styles.memory} />
          <Text style={styles.categoryTitle}>MEMORY</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
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
    marginTop: Dimensions.get("window").height / 19,
    marginBottom: 10,
    fontSize: 26,
    fontFamily: "Nunito-Bold",
    textAlign: 'center'
  },
  memory: {
    marginTop: 20,
    textAlign: 'center'
  },
  categoryTitle: {
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'Nunito-Regular',
  }
});