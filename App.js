import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import LandingPageViewController from './src/LandingPage/LandingPageViewController';

export default function App() {
  return (
      <LandingPageViewController/>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});