import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
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

const Item = ({ date, uri }) => (
  <TouchableOpacity style={styles.item}>
    <View style={{ flexDirection: "column" }}>
      <Text>{format(parseISO(date), "MM/dd/yyyy p")}</Text>
      <Text>05:22 min</Text>
      <Text>1.6 GB</Text>
    </View>
  </TouchableOpacity>
);

export default function ViewRecordings() {
  const [data, setData] = useState(undefined);

  const read = async () => {
    const data = await AsyncStorage.getItem("@videos");
    if (data) setData(JSON.parse(data));
  };

  const renderItem = ({ item }) => <Item date={item.date} uri={item.uri} />;

  useEffect(() => {
    read();
  }, []);

  if (!data) return <ActivityIndicator />;

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.header}>2021</Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    </SafeAreaView>
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
  },

  item: {
    backgroundColor: "#D3D3D3",
    marginHorizontal: 15,
    padding: 5,
  },
});
