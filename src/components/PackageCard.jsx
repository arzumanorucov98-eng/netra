import { motion } from 'framer-motion';
import { Check, Info } from 'lucide-react';
import { companyInfo } from '../data/content';

const PackageCard = ({ pkg, index, onSelect }) => {
  const isPremium = pkg.highlight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative bg-primary text-white rounded-3xl p-8 flex flex-col h-full border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
        isPremium ? 'border-blue-400 shadow-[0_0_30px_rgba(1,40,159,0.5)] scale-105 md:z-10' : 'border-secondary shadow-lg'
      }`}
    >
      {isPremium && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-primary px-5 py-1.5 rounded-full text-xs md:text-sm font-extrabold uppercase tracking-widest shadow-md border border-gray-100">
          Tövsiyə Edilən
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2 text-white">{pkg.name}</h3>
        <div className="text-3xl font-extrabold text-white mb-4">{pkg.price}</div>
        <p className="text-white opacity-90 text-sm min-h-[2.5rem] leading-relaxed">{pkg.description}</p>
      </div>

      <div className="flex-grow">
        <ul className="space-y-3 mb-8">
          {pkg.features.slice(0, 4).map((feature, i) => (
            <li key={i} className="flex items-start">
              <Check className="text-green-400 mr-2 flex-shrink-0 mt-0.5" size={18} />
              <span className="text-white text-sm leading-relaxed">{feature}</span>
            </li>
          ))}
          {pkg.features.length > 4 && (
            <li className="text-white opacity-90 text-sm font-bold pt-2 flex items-center cursor-pointer hover:opacity-100 transition-opacity" onClick={onSelect}>
              <Info size={16} className="mr-1" /> Və daha {pkg.features.length - 4} xüsusiyyət
            </li>
          )}
        </ul>
      </div>

      <div className="mt-auto flex flex-col gap-3">
        <button 
          onClick={onSelect}
          className="w-full py-3 rounded-xl font-bold transition-colors bg-white text-primary hover:bg-gray-100 shadow-md hover:shadow-lg"
        >
          Ətraflı Bax
        </button>
        <a 
          href={companyInfo.whatsapp} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 bg-white text-primary hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.031 0C5.385 0 0 5.388 0 12.035c0 2.124.553 4.195 1.603 6.012L.15 23.364l5.44-1.428A11.97 11.97 0 0012.032 24c6.645 0 12.031-5.388 12.031-12.035C24.062 5.388 18.676 0 12.031 0zm3.565 17.202c-.15.426-.874.832-1.222.846-.35.015-.758.117-2.392-.533-1.975-.785-3.238-2.827-3.336-2.956-.098-.13-1.096-1.464-1.096-2.793 0-1.33.687-1.986.932-2.261.246-.275.534-.344.712-.344.178 0 .356.002.518.01.162.008.38-.063.593.456.213.518.728 1.776.793 1.905.064.13.106.282.025.445-.08.163-.122.264-.244.408-.122.144-.258.318-.366.417-.122.115-.25.242-.11.485.14.242.624 1.032 1.34 1.666.924.816 1.7 1.066 1.944 1.181.244.115.386.096.53-.069.144-.165.623-.728.791-.978.168-.25.336-.208.563-.122.227.086 1.442.68 1.686.8.244.12.408.181.468.283.06.102.06.593-.09 1.019z"/>
          </svg>
          WhatsApp ilə Əlaqə
        </a>
      </div>
    </motion.div>
  );
};

export default PackageCard;
