import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCcoR5lDGbmP8eGhgETZcbt4jVbFLc0ZBU",
  authDomain: "meme-generator-64c26.firebaseapp.com",
  projectId: "meme-generator-64c26",
  storageBucket: "meme-generator-64c26.appspot.com",
  messagingSenderId: "13050918551",
  appId: "1:13050918551:web:3b6cf0c9f0767bb4309bd2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
setPersistence(auth, browserSessionPersistence)