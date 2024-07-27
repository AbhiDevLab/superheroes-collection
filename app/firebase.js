// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWdlP2acIIDvICwbuewvBLmOdR1mP_M94",
  authDomain: "superhero-collection-26005.firebaseapp.com",
  projectId: "superhero-collection-26005",
  storageBucket: "superhero-collection-26005.appspot.com",
  messagingSenderId: "1036735836241",
  appId: "1:1036735836241:web:127fd5da3e41627d570870"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);