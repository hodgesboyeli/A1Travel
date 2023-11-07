// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore'; // Import Firebase Firestore
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC83Zfd10OkqlVy-22abIbx9klIaNCIufk",
    authDomain: "a1-travel-cf7e0.firebaseapp.com",
    projectId: "a1-travel-cf7e0",
    storageBucket: "a1-travel-cf7e0.appspot.com",
    messagingSenderId: "165450091704",
    appId: "1:165450091704:web:6069af042d87738d98b84d",
    measurementId: "G-MNQ9BLDNK7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);