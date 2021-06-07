import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';

export default function Header() {
  return (
      <SafeAreaView />
  );
}

const styles = StyleSheet.create({
  rectangle: {
    height: 128,
    width: 128,
    backgroundColor: 'salmon',
    zIndex: 99,
  }
});
