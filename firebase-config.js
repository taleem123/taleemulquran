// firebase-config.js
// This file contains the Firebase configuration for the application.
// It's recommended to use environment variables to keep sensitive information secure.
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyD5ZGKzTHfE7ryC4So1mpRj7gfv4P9TOSw",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "taleem-ul-quran-pk.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "taleem-ul-quran-pk",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "taleem-ul-quran-pk.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "144215067477",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:144215067477:web:2db84547975ec445ccbddc",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-XFXKBNENMN"
};

export default firebaseConfig;
// Note: Ensure that you have a .env file in your project root with the appropriate variables set for production use.