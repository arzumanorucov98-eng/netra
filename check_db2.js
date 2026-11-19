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

const checkAll = async () => {
  const snapshot = await getDocs(collection(db, 'blogPosts'));
  console.log(`Total blogs: ${snapshot.size}`);
  for (let doc of snapshot.docs) {
    const data = doc.data();
    if (data.title && data.title.includes('E-ticarət')) {
       console.log(`Found E-ticarət blog: ID=${doc.id}, innerId=${data.id}, image=${data.image}`);
    }
  }
  process.exit(0);
};

checkAll();
