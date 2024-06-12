// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBgHpoz5WLtVRU_ZT5iCR6CJq4Xi_9XJUE",
    authDomain: "myfirstproject-ee34f.firebaseapp.com",
    projectId: "myfirstproject-ee34f",
    storageBucket: "myfirstproject-ee34f.appspot.com",
    messagingSenderId: "1021658767072",
    appId: "1:1021658767072:web:8f725266f411597bb13a85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth }