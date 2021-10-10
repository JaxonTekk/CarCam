import React, { useContext, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format, parseISO } from "date-fns";
import Context from "../utils/Context.js";

const Item = ({ onPress, date, thumbnail, size, duration }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Image
      style={{
        height: 100,
        width: 150,
        borderRadius: 7,
        marginLeft: 5,
        marginVertical: 5,
      }}
      source={{
        uri: thumbnail,
      }}
    />
    <View style={{ flexDirection: "column", marginLeft: 10 }}>
      <Text style={styles.dateText}>
        {format(parseISO(date), "MM/dd/yyyy p")}
      </Text>
      <Text style={styles.infoText}>{duration}</Text>
      <Text style={styles.infoText}>{getReadableFileSizeString(size)}</Text>
    </View>
  </TouchableOpacity>
);

export default function ViewRecordings({ navigation }) {
  const { setUri, videos, setVideos } = useContext(Context);

  const read = async () => {
    const data = await AsyncStorage.getItem("@videos");
    if (data) {
      setVideos(JSON.parse(data));
      console.log(videos);
    }
  };

  const renderItem = ({ item }) => (
    <Item
      onPress={() => {
        setUri(item.uri);
        navigation.navigate("View Video");
      }}
      date={item.date}
      thumbnail={item.thumbnail}
      size={item.size}
      duration={item.duration}
    />
  );

  useEffect(() => {
    read();
  }, []);

  if (!videos) return <ActivityIndicator />;

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.header}>2021</Text>
        <FlatList
          data={videos}
          renderItem={renderItem}
          keyExtractor={(item, index) => item + index}
          style={{ marginBottom: 83 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: Dimensions.get("window").height / 55,
    marginTop: 20,
    marginRight: Dimensions.get("window").height / 55,
    flexDirection: "column",
  },

  header: {
    fontSize: 23,
    fontFamily: "Nunito-Bold",
    marginBottom: 10,
  },

  item: {
    flexDirection: "row",
    backgroundColor: "#E5E5E5",
    padding: 5,
    marginBottom: 10,
  },

  dateText: {
    fontFamily: "Nunito-Bold",
    fontSize: 18,
  },

  infoText: {
    fontFamily: "Nunito-Light",
    fontSize: 15,
  },
});

// https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string
function getReadableFileSizeString(fileSizeInBytes) {
  var i = -1;
  var byteUnits = [" kB", " MB", " GB", " TB", "PB", "EB", "ZB", "YB"];
  do {
    fileSizeInBytes = fileSizeInBytes / 1024;
    i++;
  } while (fileSizeInBytes > 1024);

  return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
}
