import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  View,
} from "react-native";
import { Switch } from "react-native-paper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Slider from "@react-native-community/slider";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function Settings() {
  const [memoryValue, setMemoryValue] = useState(15);
  const [maxRecordingTime, setMaxRecordingTime] = useState(15);
  const [saveVideoToPhotoGallery, setSaveVideoToPhotoGallery] = useState(false);

  const toggleSaveVideoToPhotoGallery = () =>
    setSaveVideoToPhotoGallery(!saveVideoToPhotoGallery);
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
        <View style={styles.selectionContainer}>
          <Text style={styles.selectionContainerText}>
            Storage Limit: {memoryValue} MB
          </Text>
          <Slider
            style={{ marginLeft: 10, marginRight: 20 }}
            maximumValue={1024}
            step={1}
            onValueChange={(memoryValue) => setMemoryValue(memoryValue)}
            minimumTrackTintColor="#007F97"
          />
        </View>
        <View>
          <MaterialIcons
            name="fiber-smart-record"
            size={45}
            style={styles.recordIcon}
            style={styles.memory}
          />
          <Text style={styles.categoryTitle}>RECORDING</Text>
        </View>
        <View style={styles.selectionContainer}>
          <Text style={styles.selectionContainerText}>
            Time Per Video: {maxRecordingTime} min
          </Text>
          <Slider
            style={{ marginLeft: 10, marginRight: 20 }}
            maximumValue={1000}
            step={1}
            onValueChange={(maxRecordingTime) =>
              setMaxRecordingTime(maxRecordingTime)
            }
            minimumTrackTintColor="#007F97"
          />
        </View>
        <View style={styles.selectionContainerRow}>
          <Text style={styles.selectionContainerText}>
            Save Video to Photo Gallery
          </Text>
          <Switch
            value={saveVideoToPhotoGallery}
            style={styles.switch}
            color="#007F97"
            onValueChange={toggleSaveVideoToPhotoGallery}
          />
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
    textAlign: "center",
  },
  memory: {
    marginTop: 20,
    textAlign: "center",
  },
  categoryTitle: {
    textAlign: "center",
    fontSize: 25,
    fontFamily: "Nunito-Regular",
  },
  selectionContainer: {
    backgroundColor: "#E5E5E5",
    marginLeft: 20,
    marginRight: 20,
    flexDirection: "column",
    marginTop: 10,
  },
  selectionContainerRow: {
    backgroundColor: "#E5E5E5",
    marginLeft: 20,
    marginRight: 20,
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  selectionContainerText: {
    fontFamily: "Nunito-Regular",
    fontSize: 18,
    marginLeft: 13,
    marginTop: 10,
    marginBottom: 10,
  },
  switch: {
    marginTop: 8,
    marginRight: 10,
  },
});