// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBP3TZ-UiZ-aWkZq3aPus2ghebeVUqXXjs",
  authDomain: "abcd-c8ff1.firebaseapp.com",
  projectId: "abcd-c8ff1",
  storageBucket: "abcd-c8ff1.appspot.com",
  messagingSenderId: "484672324069",
  appId: "1:484672324069:web:a89561759b885181682f0c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const fireStore = getFirestore(app);
