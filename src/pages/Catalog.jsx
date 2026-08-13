import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '../data/catalogData';
import WebsiteCard from '../components/WebsiteCard';
import { getWebsites } from '../firebase/api';

const Catalog = () => {
  const [selectedCategory, setSelectedCategory] = useState("Bütün");
  const [websitesData, setWebsitesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWebsites()
      .then(data => {
        const sortedData = (data || []).sort((a, b) => (a.order || 0) - (b.order || 0));
        setWebsitesData(sortedData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching websites:", err);
        setLoading(false);
      });
  }, []);

  const filteredWebsites = selectedCategory === "Bütün" 
    ? websitesData 
    : websitesData.filter(site => site.category === selectedCategory);

  if (loading) {
    return <div className="py-24 text-center text-xl text-primary font-bold">Yüklənir...</div>;
  }

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-secondary mb-6 tracking-tight">
            Veb Saytlar Kataloqu
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Biznesiniz üçün ən uyğun, müasir və sürətli veb sayt şablonunu seçin.
            Bəyəndiyiniz saytı demo olaraq incələyin və bir kliklə sifariş verin.
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-primary text-white shadow-md shadow-primary/20 scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filteredWebsites.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-2xl font-bold text-secondary mb-2">Heç bir sayt tapılmadı</h3>
            <p className="text-gray-500">Bu kateqoriya üçün yaxın zamanda yeni saytlar əlavə ediləcək.</p>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredWebsites.map((website) => (
                <motion.div
                  key={website.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <WebsiteCard website={website} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
