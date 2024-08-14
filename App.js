import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Component } from 'react';
import Navigation from './navigation'
import registerNNPushToken from 'native-notify';
import { registerIndieID, unregisterIndieDevice } from 'native-notify';
import axios from 'axios';

export default function App() {
  registerNNPushToken(23057, 'M2YBwa6PvrlD1eMKESgXS7');
  registerIndieID('jvaldezc', 23057, 'M2YBwa6PvrlD1eMKESgXS7');
  return (
    <Navigation/>
    
  )
}
