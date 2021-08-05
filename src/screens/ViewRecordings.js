import React from "react";
import { SafeAreaView, Text, View, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";

export default function ViewRecordings() {
  const RecordingCard = (props) => {
    return (
      <View styles={styles.recordingsContainer}>
          <Image/>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View style={styles.recordingsListContainer}>
        <Text style={styles.yearHeadingText}>2021</Text>
        <TouchableOpacity>
          <RecordingCard/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  recordingsListContainer: {
    marginLeft: Dimensions.get("window").height / 55,
    marginTop: 20,
    marginRight: Dimensions.get("window").height / 55,
    flexDirection: "column",
  },
  yearHeadingText: {
    fontSize: 23,
    fontFamily: "Nunito-Bold"
  },
  recordingsContainer: {
    flexDirection: "row",
  }
});
