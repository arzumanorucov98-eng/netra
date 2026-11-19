import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
const auth = getAuth(app);

const updateBlog = async () => {
  try {
    await signInWithEmailAndPassword(auth, "admin@netramarketing.com", "password123");
    
    const docRef = doc(db, "blogPosts", "1785515712415");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const updatedTitle = data.title.replace(/500/g, '650');
      const updatedSummary = data.summary.replace(/500/g, '650');
      const updatedContent = data.content.replace(/500/g, '650');
      
      await updateDoc(docRef, {
        title: updatedTitle,
        summary: updatedSummary,
        content: updatedContent,
        image: "/smm-package-650.jpg"
      });
      console.log("Blog post updated successfully!");
    } else {
      console.log("No such document!");
    }
    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
};

updateBlog();
