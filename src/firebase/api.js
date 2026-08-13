import { db, auth } from './config';
import { 
  collection, getDocs, getDoc, doc, setDoc, 
  addDoc, updateDoc, deleteDoc 
} from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

// --- AUTH ---
export const loginAdmin = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const logoutAdmin = async () => {
  await signOut(auth);
};

// --- WEBSITES ---
export const getWebsites = async () => {
  const snapshot = await getDocs(collection(db, 'websites'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addWebsite = async (siteData) => {
  // Use a string ID based on timestamp
  const newId = Date.now().toString();
  await setDoc(doc(db, 'websites', newId), { ...siteData, id: parseInt(newId) });
  return newId;
};

export const updateWebsite = async (id, siteData) => {
  await updateDoc(doc(db, 'websites', id.toString()), siteData);
};

export const deleteWebsite = async (id) => {
  await deleteDoc(doc(db, 'websites', id.toString()));
};

// --- ORDERS ---
export const getOrders = async () => {
  const snapshot = await getDocs(collection(db, 'orders'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const createOrder = async (orderData) => {
  const newOrder = {
    ...orderData,
    date: new Date().toISOString(),
    status: 'Yeni'
  };
  await addDoc(collection(db, 'orders'), newOrder);
};

export const updateOrderStatus = async (id, status) => {
  await updateDoc(doc(db, 'orders', id.toString()), { status });
};

// --- SETTINGS (Company Info & SEO) ---
export const getCompanyInfo = async () => {
  const docSnap = await getDoc(doc(db, 'settings', 'companyInfo'));
  return docSnap.exists() ? docSnap.data() : null;
};

export const updateCompanyInfo = async (data) => {
  await setDoc(doc(db, 'settings', 'companyInfo'), data, { merge: true });
};

export const getSeo = async () => {
  const docSnap = await getDoc(doc(db, 'settings', 'seo'));
  return docSnap.exists() ? docSnap.data() : null;
};

export const updateSeo = async (data) => {
  await setDoc(doc(db, 'settings', 'seo'), data, { merge: true });
};

// --- PACKAGES ---
export const getPackages = async () => {
  const snapshot = await getDocs(collection(db, 'packages'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addPackage = async (pkgData) => {
  const newId = Date.now().toString();
  await setDoc(doc(db, 'packages', newId), { ...pkgData, id: parseInt(newId) });
  return newId;
};

export const updatePackage = async (id, data) => {
  await updateDoc(doc(db, 'packages', id.toString()), data);
};

export const deletePackage = async (id) => {
  await deleteDoc(doc(db, 'packages', id.toString()));
};

// --- PARTNERS ---
export const getPartners = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'partners'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Partnyorları yükləyərkən xəta (Baza icazələri yoxlanılmalıdır):", error);
    return [];
  }
};

export const addPartner = async (partnerData) => {
  const newId = Date.now().toString();
  await setDoc(doc(db, 'partners', newId), { ...partnerData, id: parseInt(newId) });
  return newId;
};

export const updatePartner = async (id, data) => {
  await updateDoc(doc(db, 'partners', id.toString()), data);
};

export const deletePartner = async (id) => {
  await deleteDoc(doc(db, 'partners', id.toString()));
};

// --- BLOG POSTS ---
export const getBlogPosts = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'blogPosts'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Blog postları yükləyərkən xəta:", error);
    return [];
  }
};

export const addBlogPost = async (postData) => {
  const newId = Date.now().toString();
  await setDoc(doc(db, 'blogPosts', newId), { 
    ...postData, 
    id: newId,
    date: new Date().toISOString().split('T')[0]
  });
  return newId;
};

export const updateBlogPost = async (id, data) => {
  await updateDoc(doc(db, 'blogPosts', id.toString()), data);
};

export const deleteBlogPost = async (id) => {
  await deleteDoc(doc(db, 'blogPosts', id.toString()));
};

