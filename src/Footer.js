import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, Dimensions } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import siteContext from './utils/SiteContext';

export default function Footer() {
  let {setPage} = useContext(siteContext);

  return (
    <View style={styles.container}>
        <View style={styles.rectangle}>
            <TouchableOpacity>
                <FontAwesomeIcon style={styles.icons} name="home" size={35} color="white" onPress={()=>setPage("home")}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <MaterialIcon style={styles.icons} name="fiber-smart-record" size={35} color="white" onPress={()=> setPage("record")}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <FeatherIcon style={styles.icons} name="settings" size={35} color="white" onPress={()=>setPage("settings")}/>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const seperatorPixel = Dimensions.get('window').width/9;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,

    elevation: 5,
  },
  rectangle: {
    backgroundColor: '#4c3f77',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 13,
  },
  icons: {
    marginLeft: seperatorPixel,
    marginRight: seperatorPixel,
    marginTop: 5,
    marginBottom: 5
  }
});