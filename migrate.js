import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection, addDoc } from "firebase/firestore";
import fs from 'fs';

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
const db = getFirestore(app);

const migrate = async () => {
  try {
    const raw = fs.readFileSync('./server/db.json');
    const data = JSON.parse(raw);

    console.log("Migrating company info...");
    await setDoc(doc(db, "settings", "companyInfo"), data.companyInfo);

    console.log("Migrating seo...");
    await setDoc(doc(db, "settings", "seo"), data.seo);

    console.log("Migrating websites...");
    for (let site of data.websites) {
      // Adding them with auto-generated IDs, or keep existing IDs? Keep existing is better.
      await setDoc(doc(db, "websites", site.id.toString()), site);
    }
    
    console.log("Migrating packages...");
    for (let pkg of data.packages) {
      await setDoc(doc(db, "packages", pkg.id.toString()), pkg);
    }

    console.log("Migration complete!");
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
};

migrate();
