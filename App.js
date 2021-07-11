import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import LandingPageViewController from './src/LandingPage/LandingPageViewController';
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

export default function App() {
  Font.loadAsync({
    'Nunito-Regular': require('./assets/fonts/Nunito/Nunito-Regular.ttf'),
    'Nunito-Bold': require('./assets/fonts/Nunito/Nunito-Bold.ttf'),
  });
  const [loaded] = useFonts({
    NunitoRegular: require('./assets/fonts/Nunito/Nunito-Regular.ttf'),
    NunitoBold: require('./assets/fonts/Nunito/Nunito-Bold.ttf'),
  });
  if (!loaded) {
    return null;
  }
  return (
      <LandingPageViewController/>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});