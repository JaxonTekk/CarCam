import React, { useContext, useState, useEffect } from "react";
import { Text, StyleSheet, Dimensions, View, Alert } from "react-native";
import { Switch, Button } from "react-native-paper";
import Context from "../utils/Context.js";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Slider from "@react-native-community/slider";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Settings() {
  const { setVideoCount, setUri, setD, setVideos } = useContext(Context);
  const [memoryValue, setMemoryValue] = useState(15);
  const [maxRecordingTime, setMaxRecordingTime] = useState(15);
  const [saveVideoToPhotoGallery, setSaveVideoToPhotoGallery] = useState(false);
  const [mph, setMph] = useState(true);

  const read = async () => {
    const settings = await AsyncStorage.getItem("@settings");
    if (settings) {
      const parsedSettings = JSON.parse(settings);
      setMemoryValue(parsedSettings.memoryValue);
      setMaxRecordingTime(parsedSettings.maxRecordingTime);
      setSaveVideoToPhotoGallery(parsedSettings.saveVideoToPhotoGallery);
      setMph(parsedSettings.mph);
    }
  };

  const save = async (settings) => {
    await AsyncStorage.setItem("@settings", JSON.stringify(settings));
  };

  useEffect(() => {
    read();
  }, []);

  const toggleSaveVideoToPhotoGallery = () => {
    const settings = {
      memoryValue: memoryValue,
      maxRecordingTime: maxRecordingTime,
      saveVideoToPhotoGallery: !saveVideoToPhotoGallery,
      mph: mph,
    };
    setSaveVideoToPhotoGallery(!saveVideoToPhotoGallery);
    save(settings);
  };

  const toggleEnableMPH = () => {
    const settings = {
      memoryValue: memoryValue,
      maxRecordingTime: maxRecordingTime,
      saveVideoToPhotoGallery: saveVideoToPhotoGallery,
      mph: !mph,
    };
    setMph(!mph);
    save(settings);
  };

  return (
    <View styles={styles.container}>
      <View style={styles.rectangle}>
        <Text style={styles.largeText}>SETTINGS</Text>
      </View>
      <View>
        <FontAwesome5 name="memory" size={45} style={styles.memory} />
        <Text style={styles.categoryTitle}>MEMORY</Text>
      </View>
      <View style={styles.selectionContainerRow}>
        <Text style={styles.selectionContainerText}>Delete All Data</Text>
        <Button
          mode="contained"
          color="#DF4F97"
          style={styles.settingsButton}
          onPress={async () => {
            Alert.alert(
              "Delete all Data",
              "Are you sure that you want to delete ALL data within this app? This action CANNOT be undone.",
              [
                {
                  text: "Yes",
                  onPress: () => {
                    AsyncStorage.clear().then(() => {
                      setMaxRecordingTime(15);
                      setSaveVideoToPhotoGallery(false);
                      setVideoCount(0);
                      setUri(undefined);
                      setD(undefined);
                      setVideos(undefined);
                      Alert.alert(
                        "Success",
                        "Successfully deleted all data within this app!"
                      );
                    });
                  },
                },
                {
                  text: "Cancel",
                  style: "cancel",
                },
              ]
            );
          }}
        >
          Delete All Data
        </Button>
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
          value={maxRecordingTime}
          onValueChange={(maxRecordingTime) => {
            setMaxRecordingTime(maxRecordingTime);
            const settings = {
              memoryValue: memoryValue,
              maxRecordingTime: maxRecordingTime,
              saveVideoToPhotoGallery: saveVideoToPhotoGallery,
              mph: mph,
            };
            save(settings);
          }}
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
          value={saveVideoToPhotoGallery}
          onValueChange={toggleSaveVideoToPhotoGallery}
        />
      </View>
      <View
        style={{ ...styles.selectionContainerRow, flexDirection: "column" }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.selectionContainerText}>
            Miles Per Hour (mph)
          </Text>
          <Switch
            value={mph}
            style={styles.switch}
            color="#007F97"
            onValueChange={toggleEnableMPH}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.selectionContainerText}>
            Kilometers Per Hour (kmh)
          </Text>
          <Switch
            value={!mph}
            style={styles.switch}
            color="#007F97"
            onValueChange={toggleEnableMPH}
          />
        </View>
      </View>
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

  dropdownStyle: {
    width: Dimensions.get("window").width / 1.2,
    marginLeft: 10,
    marginBottom: 10,
    borderColor: "#007F97",
  },

  settingsButton: {
    marginLeft: 10,
    marginRight: 30,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "white",
  },

  option: {
    fontFamily: "Nunito-Regular",
    fontSize: 16,
    marginLeft: 13,
    marginBottom: 10,
  },
});
