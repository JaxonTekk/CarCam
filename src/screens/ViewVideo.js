import React, { useContext, useRef, useState } from "react";
import { View, Button, StyleSheet, Dimensions, Text, TouchableOpacity, Alert } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import Context from "../utils/Context.js";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import * as MediaLibrary from 'expo-media-library';
import { Camera } from "expo-camera";

export default function ViewVideo() {
  const { uri } = useContext(Context);

  const video = useRef(null);
  const [status, setStatus] = useState({});

  return (
    <View style={styles.container}>
      <View style={styles.mainFrame}>
        <Text style={styles.videoDateText}>June 29, 2021 at 5:22 PM</Text>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: uri,
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      </View>
      <View style={styles.bottomFrame}>
        <TouchableOpacity style={styles.buttonBackground} onPress={() => {
          MediaLibrary.saveToLibraryAsync(uri).then(() => {Alert.alert("Success","Successfully saved the video to your Photo Library!")}).catch((error) => {Alert.alert("Error", "Unable to save the video to your photo library! Error: " + error)})
        }}>
          <View style={styles.buttonBackground}>
            <FontAwesome5 name="download" size={30} style={styles.icons} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonBackground}>
          <View style={styles.buttonBackground1}>
            <FontAwesome5 name="trash" size={30} style={styles.icons} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    display: "flex",
    justifyContent: "space-between",
  },
  video: {
    height: Dimensions.get("window").height/2.6,
    width: Dimensions.get("window").width - 40,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  mainFrame: {
    flexDirection: "column",
  },

  videoDateText: {
    fontSize: 25,
    fontFamily: "Nunito-Bold",
    textAlign: "center",
    marginTop: Dimensions.get("window").height/7,
  },
  
  bottomFrame: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    marginTop: 50,
    marginLeft: 100,
    marginRight: 100,
    alignItems: "center"
  },
  
  icons: {
    padding: 13,
    color: "white",
  },

  buttonBackground: {
    borderRadius: 10000000,
    backgroundColor: "#7C587F",
  },

  buttonBackground1: {
    borderRadius: 10000000,
    backgroundColor: "#007F97",
  }
});
