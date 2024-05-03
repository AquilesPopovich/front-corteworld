// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDT2-DOzaOUp8LELcze8gCOAjynYstWKUM",
  authDomain: "corteworld.firebaseapp.com",
  projectId: "corteworld",
  storageBucket: "corteworld.appspot.com",
  messagingSenderId: "926419657290",
  appId: "1:926419657290:web:198b4a0f5e3d39c5cb3cb3",
  measurementId: "G-D6VCPEKZ2G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);