import React, { useContext, useState, useEffect } from "react";
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

const Item = ({ onPress, date, uri }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Image
      style={{ height: 100, width: 150 }}
      source={{
        uri: "https://media.discordapp.net/attachments/781252457027731506/874327452468518933/unknown.png",
      }}
    />
    <View style={{ flexDirection: "column", marginLeft: 5 }}>
      <Text style={{ fontSize: 15, fontFamily: "Nunito-Bold" }}>
        {format(parseISO(date), "MM/dd/yyyy p")}
      </Text>
      <Text>05:22 min</Text>
      <Text>1.6 GB</Text>
    </View>
  </TouchableOpacity>
);

export default function ViewRecordings({ navigation }) {
  const { setUri } = useContext(Context);
  const [data, setData] = useState(undefined);

  const read = async () => {
    const data = await AsyncStorage.getItem("@videos");
    if (data) setData(JSON.parse(data));
  };

  const renderItem = ({ item }) => (
    <Item
      onPress={() => {
        setUri(item.uri);
        navigation.navigate("View Video");
      }}
      date={item.date}
      uri={item.uri}
    />
  );

  useEffect(() => {
    read();
  }, []);

  if (!data) return <ActivityIndicator />;

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.header}>2021</Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => item + index}
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
    marginHorizontal: 15,
    padding: 5,
    marginBottom: 10,
  },
});
