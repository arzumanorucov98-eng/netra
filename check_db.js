import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-IT5ztyxbb8CeZsWOy4j-NIT53NstJTE",
  authDomain: "netra-csm.firebaseapp.com",
  projectId: "netra-csm",
  storageBucket: "netra-csm.firebasestorage.app",
  messagingSenderId: "738749085340",
  appId: "1:738749085340:web:fe9fc2015d4d902e3f9f59"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const checkDB = async () => {
  const snapshot = await getDocs(collection(db, 'blogPosts'));
  for (let document of snapshot.docs) {
    const data = document.data();
    if (['16', '17', '18', '19', '20'].includes(data.id)) {
      console.log(`Doc ID: ${document.id}, Blog ID: ${data.id}, Image: ${data.image}`);
    }
  }
  process.exit(0);
};

checkDB();
