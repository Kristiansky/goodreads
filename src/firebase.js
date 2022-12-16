// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeqWlGsSUslQd3pvuqxtsTfz4hPuoljm8",
  authDomain: "goodreads-9a68e.firebaseapp.com",
  projectId: "goodreads-9a68e",
  storageBucket: "goodreads-9a68e.appspot.com",
  messagingSenderId: "755971322967",
  appId: "1:755971322967:web:5ae19acb1856e83727df12"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
