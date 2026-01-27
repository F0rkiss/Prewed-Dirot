// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA76QMB2j3UiwFb5NY_GzMPAUTPoitJpEg",
  authDomain: "dirotsahawedding.firebaseapp.com",
  projectId: "dirotsahawedding",
  storageBucket: "dirotsahawedding.firebasestorage.app",
  messagingSenderId: "276094608223",
  appId: "1:276094608223:web:92121bdb002ad3922bccea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);