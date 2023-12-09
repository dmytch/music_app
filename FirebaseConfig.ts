// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCu3WNVk0fSId4GE3hOMdar1NuGHPjF0Ko",
    authDomain: "music-app-d8025.firebaseapp.com",
    projectId: "music-app-d8025",
    storageBucket: "music-app-d8025.appspot.com",
    messagingSenderId: "92348182515",
    appId: "1:92348182515:web:ce4ebb6272c01dc345ac86"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})
export const FIREBASE_DB = getFirestore(FIREBASE_APP)