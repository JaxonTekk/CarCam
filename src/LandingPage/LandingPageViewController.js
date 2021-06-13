import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView, Dimensions } from 'react-native';
import Header from './Header'
import Footer from '../Footer'
import Statistics from './Components/Statistics';
import Features from './Components/Features';
import SiteContext from '../utils/SiteContext'
import Record from "./Record"
import Settings from "./Settings"

export default function LandingPageViewController() {
  let [home, setHome] = useState(true);
  let [record, setRecord] = useState(false);
  let [settings, setSettings] = useState(false);
  let [cur, setCur] = useState("home")

  return (
      <SiteContext.Provider value={{home, setHome, record, setRecord, settings, setSettings, cur, setCur}}>
        <View>
          {home && <View style={styles.container}>
            <Header/>
            <Statistics/>
            <Features/>
          </View>}
          {record && <Record/>}
          {settings && <Settings/>}
          <View style={styles.footer}>
            <Footer/>
          </View>
        </View>
      </SiteContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F8F8',
    flexDirection: 'column',
  },
  rectangle: {
    height: 128,
    width: 128,
    backgroundColor: 'salmon',
    position: 'absolute', 
    zIndex: 99,
    top: '50%',
    left: '40%'
  },

  footer: {
    top: Dimensions.get('window').width/26,
  }
});