// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Firebase configuration - Replace with your actual config from Firebase Console
// Get this from: Firebase Console > Project Settings > Your apps > Web app
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "YOUR_API_KEY_HERE",
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "YOUR_PROJECT_ID.firebaseapp.com",
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "YOUR_PROJECT_ID.appspot.com",
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
//   appId: process.env.REACT_APP_FIREBASE_APP_ID || "YOUR_APP_ID",
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "YOUR_MEASUREMENT_ID" // Optional
// };

const firebaseConfig = {
  apiKey: "AIzaSyD5ZGKzTHfE7ryC4So1mpRj7gfv4P9TOSw",
  authDomain: "taleem-ul-quran-pk.firebaseapp.com",
  projectId: "taleem-ul-quran-pk",
  storageBucket: "taleem-ul-quran-pk.firebasestorage.app",
  messagingSenderId: "144215067477",
  appId: "1:144215067477:web:2db84547975ec445ccbddc",
  measurementId: "G-XFXKBNENMN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;

