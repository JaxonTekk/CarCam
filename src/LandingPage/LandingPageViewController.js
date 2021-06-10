import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions } from 'react-native';
import Header from './Header'
import Footer from '../Footer'
import Statistics from './Components/Statistics';
import Features from './Components/Features';

export default function LandingPageViewController() {
  return (
      <View>
        <View style={styles.container}>
          <Header/>
          <Statistics/>
          <Features/>
        </View>
        <View style={styles.footer}>
          <Footer/>
        </View>
      </View>
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