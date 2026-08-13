import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-IT5ztyxbb8CeZsWOy4j-NIT53NstJTE",
  authDomain: "netra-csm.firebaseapp.com",
  projectId: "netra-csm",
  storageBucket: "netra-csm.firebasestorage.app",
  messagingSenderId: "738749085340",
  appId: "1:738749085340:web:fe9fc2015d4d902e3f9f59",
  measurementId: "G-EZW2GDS26G"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
