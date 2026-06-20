import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { packagesData } from '../data/content';
import PackageCard from '../components/PackageCard';
import PackageModal from '../components/PackageModal';

const Packages = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  return (
    <div className="py-20 bg-light min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Paketlərimiz</h1>
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
