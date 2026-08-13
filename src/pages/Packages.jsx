import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PackageCard from '../components/PackageCard';
import PackageModal from '../components/PackageModal';
import { getPackages } from '../firebase/api';

import { packagesData as staticPackages } from '../data/content';

const Packages = ({ asSection = false }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [packagesData, setPackagesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    // Timeout to prevent infinite loading if Firebase hangs (e.g. network issues)
    const timer = setTimeout(() => {
      if (isMounted) {
        setPackagesData(staticPackages);
        setLoading(false);
      }
    }, 3000);

    getPackages().then(data => {
      if (!isMounted) return;
      clearTimeout(timer);
      if (data && data.length > 0) {
        const sorted = data.sort((a, b) => (a.order || 0) - (b.order || 0));
        setPackagesData(sorted);
      } else {
        setPackagesData(staticPackages);
      }
      setLoading(false);
    }).catch(error => {
      if (!isMounted) return;
      clearTimeout(timer);
      console.error("Paketləri yükləyərkən xəta baş verdi:", error);
      setPackagesData(staticPackages);
      setLoading(false);
    });

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return (
      <div className="py-32 min-h-screen bg-light flex flex-col items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mb-6 shadow-lg"
        />
        <motion.h3 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-xl font-bold text-primary"
        >
          Paketlər Yüklənir...
        </motion.h3>
      </div>
    );
  }

  // When embedded inside Home (asSection=true) use h2 to avoid duplicate H1
  const HeadingTag = asSection ? 'h2' : 'h1';

  return (
    <div className="py-20 bg-light min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <HeadingTag className="text-4xl md:text-5xl font-bold text-primary mb-6">Marketinq Paketləri</HeadingTag>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-gray-600">
            Biznesinizin ehtiyaclarına uyğun ən ideal paketi seçin və böyüməyə başlayın.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packagesData.map((pkg, index) => (
            <PackageCard 
              key={pkg.id} 
              pkg={pkg} 
              index={index} 
              onSelect={() => setSelectedPackage(pkg)} 
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedPackage && (
          <PackageModal 
            pkg={selectedPackage} 
            onClose={() => setSelectedPackage(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Packages;
