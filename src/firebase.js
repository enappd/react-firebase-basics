import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBnUyqUnOktAPT9xzrfGZmyl0oQA7uXjcQ",
    authDomain: "react-firebase-ade8c.firebaseapp.com",
    projectId: "react-firebase-ade8c",
    storageBucket: "react-firebase-ade8c.appspot.com",
    messagingSenderId: "236784208464",
    appId: "1:236784208464:web:564444f795674538b55f55",
    measurementId: "G-0G31QY48DR"
};
// app instance
const app = initializeApp(firebaseConfig);

// auth instance
const auth = getAuth(app);

// db instance (firestore)
const db = initializeFirestore(app, {experimentalForceLongPolling: true});

// using app and db in other files
export {
    app,
    db,
    auth
}