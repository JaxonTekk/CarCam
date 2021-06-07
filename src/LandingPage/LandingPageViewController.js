import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Header from './Header'
import Footer from '../Footer'

export default function LandingPageViewController() {
  return (
      <SafeAreaView>
          <Header/>
          <Footer/>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rectangle: {
    height: 128,
    width: 128,
    backgroundColor: 'salmon',
    position: 'absolute', 
    zIndex: 99,
    top: '50%',
    left: '40%'
  }
});
