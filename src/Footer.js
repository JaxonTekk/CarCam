import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, Dimensions } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import siteContext from './utils/SiteContext';

export default function Footer() {
  let {home, setHome, record, setRecord, settings, setSettings, cur, setCur} = useContext(siteContext);

  return (
    <View style={styles.container}>
        <View style={styles.rectangle}>
            <TouchableOpacity>
                <FontAwesomeIcon style={styles.icons} name="home" size={35} color="white" onPress={()=>{
                  if(cur==="record") {
                    setHome(true)
                    setRecord(false)
                    setCur("home")
                  } else if(cur==="settings") {
                    setHome(true)
                    setSettings(false)
                    setCur("home")
                  }
                }}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <MaterialIcon style={styles.icons} name="fiber-smart-record" size={35} color="white" onPress={()=> {
                  if(cur==="home") {
                    setRecord(true)
                    setHome(false)
                    setCur("record")
                  } else if(cur==="settings") {
                    setRecord(true)
                    setSettings(false)
                    setCur("record")
                  } 
                }}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <FeatherIcon style={styles.icons} name="settings" size={35} color="white" onPress={()=>{
                  if(cur==="home") {
                    setSettings(true)
                    setHome(false)
                    setCur("settings")
                  } else if(cur==="record") {
                    setSettings(true)
                    setRecord(false)
                    setCur("settings")
                  }
                }}/>
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