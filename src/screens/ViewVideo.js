import React, { useContext, useRef, useState, useEffect } from "react";
import { View, Button, StyleSheet } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import Context from "../utils/Context.js";

export default function ViewVideo() {
  const { uri } = useContext(Context);
  const video = useRef(null);
  const [status, setStatus] = useState({});

  useEffect(() => {
    console.log(uri);
  }, []);

  return (
    <View style={styles.container}>
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
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? "Pause" : "Play"}
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  video: {
    height: 500,
    width: 500,
  },
});
