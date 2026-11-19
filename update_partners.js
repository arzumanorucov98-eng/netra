import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, deleteDoc, setDoc } from "firebase/firestore";

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

const updatePartnersDB = async () => {
  const snapshot = await getDocs(collection(db, 'partners'));
  if (snapshot.size > 0) {
    console.log(`Found ${snapshot.size} partners in DB. Finding VTB...`);
    for (let document of snapshot.docs) {
      const data = document.data();
      if (data.name && (data.name.includes("VTB") || data.name.includes("Valideyn") || data.name.includes("Valideyin"))) {
        console.log("Replacing VTB in DB...", document.id);
        await setDoc(doc(db, 'partners', document.id), {
          ...data,
          name: "Lux Cleaner",
          logo: "/partners/luxcleaner.jpg",
          instagram: "#"
        });
      }
    }
  } else {
    console.log("No partners in DB, using content.js only.");
  }
  process.exit(0);
};

updatePartnersDB();
