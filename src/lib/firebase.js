import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "awrachat-1ce58.firebaseapp.com",
  projectId: "awrachat-1ce58",
  storageBucket: "awrachat-1ce58.appspot.com",
  messagingSenderId: "1007100705842",
  appId: "1:1007100705842:web:2596d7fec721960b21502b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(); /*to create user info */
export const storage = getStorage();
