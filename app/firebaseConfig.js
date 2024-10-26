// app/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDegzlfe9Lm9nkz8z7WVOZcWdQ9ohW-jwE",
    authDomain: "archivos-cs30.firebaseapp.com",
    projectId: "archivos-cs30",
    storageBucket: "archivos-cs30.appspot.com",
    messagingSenderId: "768083575494",
    appId: "1:768083575494:web:5e5829b5cafaf45bc48dc7",
    measurementId: "G-LDWY89S8R2"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db };
