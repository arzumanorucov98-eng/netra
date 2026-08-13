import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

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

const packagesData = [
  {
    id: 1,
    name: "Brend Quruculuğu Paketi",
    price: "200 AZN",
    description: "Biznesinizi sosial mediada peşəkar şəkildə təqdim etmək üçün bütün səhifələrinizi sıfırdan qururuq.",
    features: [
      "Instagram və Facebook səhifələrinin yaradılması",
      "Peşəkar bioqrafiyanın hazırlanması",
      "Profil və loqo yerləşdirilməsi",
      "Highlight (Qapaq Hekayə) dizaynlarının hazırlanması",
      "Səhifənin korporativ rənglərinin və vizual üslubunun qurulması",
      "Axtarışlarda daha rahat görünmək üçün açar sözlərin və hashtagların optimizasiyası",
      "Əlaqə məlumatlarının düzgün yerləşdirilməsi",
      "İlk paylaşımlar üçün kontent istiqamətinin müəyyən edilməsi",
      "Müştəri etimadı yaradan peşəkar səhifə görünüşünün formalaşdırılması",
      "Brendinizin sosial mediada düzgün təqdim olunması"
    ],
    targetAudience: "Bu paket yeni fəaliyyətə başlayan və ya sosial media hesablarını peşəkar səviyyədə qurmaq istəyən bizneslər üçün nəzərdə tutulub."
  },
  {
    id: 2,
    name: "Start Paketi",
    price: "500 AZN / Ay",
    description: "Sosial mediada aktivliyə başlamaq üçün ideal paket.",
    features: [
      "Həftədə 1 dəfə video çəkiliş",
      "Aylıq 20 story paylaşımı",
      "Target reklam xidməti",
      "TikTok səhifəsinin idarə olunması",
      "Instagram səhifəsinin idarə olunması",
      "Facebook səhifəsinin idarə olunması"
    ]
  },
  {
    id: 3,
    name: "Standart Paket",
    price: "600 AZN / Ay",
    description: "Daha çox məzmun və dizayn ilə biznesinizi böyüdün.",
    features: [
      "Həftədə 1 dəfə video çəkiliş",
      "Həftədə 2 post dizaynı",
      "Aylıq 20 story paylaşımı",
      "Target reklam xidməti",
      "1 AI video hazırlanması",
      "TikTok, Instagram və Facebook səhifələrinin idarə olunması"
    ]
  },
  {
    id: 4,
    name: "Premium Paket",
    price: "800 AZN / Ay",
    description: "Geniş auditoriyaya çatmaq və yüksək fəallıq üçün.",
    features: [
      "Həftədə 2 dəfə video çəkiliş",
      "Aylıq 20 video paylaşımı",
      "Aylıq 30 story paylaşımı",
      "Həftədə 3 post dizaynı",
      "Target reklam xidməti",
      "2 AI video hazırlanması",
      "TikTok, Instagram və Facebook səhifələrinin idarə olunması"
    ],
    highlight: true
  },
  {
    id: 5,
    name: "VIP Paket",
    price: "900 AZN / Ay",
    description: "Maksimum nəticə və tam marketinq idarəçiliyi.",
    features: [
      "Həftədə 3 dəfə video çəkiliş",
      "Aylıq 30 video paylaşımı",
      "Aylıq 30 story paylaşımı",
      "Həftədə 3 post dizaynı",
      "Target reklam xidməti",
      "4 AI video hazırlanması",
      "TikTok, Instagram və Facebook səhifələrinin idarə olunması"
    ]
  }
];

const restorePackages = async () => {
  try {
    console.log("Restoring packages...");
    for (let pkg of packagesData) {
      await setDoc(doc(db, "packages", pkg.id.toString()), pkg);
    }
    console.log("Restore complete!");
    process.exit(0);
  } catch (err) {
    console.error("Restore failed:", err);
    process.exit(1);
  }
};

restorePackages();
