// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mern-real-estate-8832e.firebaseapp.com',
  projectId: 'mern-real-estate-8832e',
  storageBucket: 'mern-real-estate-8832e.appspot.com',
  messagingSenderId: '123312462610',
  appId: '1:123312462610:web:cda8146b4c70f8696531cb',
  measurementId: "G-S4M2P351CN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);