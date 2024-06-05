// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { initializeAuth, getReactNativePersistence, getAuth, createUserWithEmailAndPassword  } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA03Uw6_d7vZfrAP7RgtDt36gAAp5pMrQg",
  authDomain: "gasrt-558de.firebaseapp.com",
  projectId: "gasrt-558de",
  storageBucket: "gasrt-558de.appspot.com",
  messagingSenderId: "38239860606",
  appId: "1:38239860606:web:175219d6b3df8d16bfa52f",
  measurementId: "G-Q0LWXQTG40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Add this line to initialize Firebase Authentication
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});


export { auth };
export const db = getDatabase(app);

