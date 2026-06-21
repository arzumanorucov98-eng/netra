import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { companyInfo } from '../data/content';

const FloatingWhatsApp = () => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Sessiya ərzində bağlanıb-bağlanmadığını yoxlayır
    const hasClosed = sessionStorage.getItem('whatsappMessageClosed');
    
    if (!hasClosed) {
      // 4 saniyə sonra mesajı göstərir
      const timer = setTimeout(() => {
        setShowMessage(true);
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const closeMessage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowMessage(false);
    sessionStorage.setItem('whatsappMessageClosed', 'true');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
            className="mb-4 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-4 max-w-[280px] sm:max-w-[320px] relative border border-gray-100 mr-2"
          >
            {/* Bağla Düyməsi */}
            <button 
              onClick={closeMessage}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors p-1"
              aria-label="Bağla"
            >
              <X size={16} />
            </button>
            
            {/* Mesajın Məzmunu */}
            <a 
              href={companyInfo.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 mt-1 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#22c55e" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.031 0C5.385 0 0 5.388 0 12.035c0 2.124.553 4.195 1.603 6.012L.15 23.364l5.44-1.428A11.97 11.97 0 0012.032 24c6.645 0 12.031-5.388 12.031-12.035C24.062 5.388 18.676 0 12.031 0zm3.565 17.202c-.15.426-.874.832-1.222.846-.35.015-.758.117-2.392-.533-1.975-.785-3.238-2.827-3.336-2.956-.098-.13-1.096-1.464-1.096-2.793 0-1.33.687-1.986.932-2.261.246-.275.534-.344.712-.344.178 0 .356.002.518.01.162.008.38-.063.593.456.213.518.728 1.776.793 1.905.064.13.106.282.025.445-.08.163-.122.264-.244.408-.122.144-.258.318-.366.417-.122.115-.25.242-.11.485.14.242.624 1.032 1.34 1.666.924.816 1.7 1.066 1.944 1.181.244.115.386.096.53-.069.144-.165.623-.728.791-.978.168-.25.336-.208.563-.122.227.086 1.442.68 1.686.8.244.12.408.181.468.283.06.102.06.593-.09 1.019z"/>
                </svg>
              </div>
              <div className="flex-1 pr-4">
                <div className="font-bold text-gray-800 text-sm mb-1">Netra Marketing</div>
                <div className="text-gray-600 text-sm leading-snug">
                  Salam, sizə necə köməklik edə bilərik? 👋
                </div>
              </div>
            </a>
            
            {/* Danışıq balonunun üçbucağı (Pointer) */}
            <div className="absolute -bottom-2 right-5 w-4 h-4 bg-white border-b border-r border-gray-100 transform rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={companyInfo.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-colors flex items-center justify-center relative z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        onClick={() => {
          setShowMessage(false);
          sessionStorage.setItem('whatsappMessageClosed', 'true');
        }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.031 0C5.385 0 0 5.388 0 12.035c0 2.124.553 4.195 1.603 6.012L.15 23.364l5.44-1.428A11.97 11.97 0 0012.032 24c6.645 0 12.031-5.388 12.031-12.035C24.062 5.388 18.676 0 12.031 0zm3.565 17.202c-.15.426-.874.832-1.222.846-.35.015-.758.117-2.392-.533-1.975-.785-3.238-2.827-3.336-2.956-.098-.13-1.096-1.464-1.096-2.793 0-1.33.687-1.986.932-2.261.246-.275.534-.344.712-.344.178 0 .356.002.518.01.162.008.38-.063.593.456.213.518.728 1.776.793 1.905.064.13.106.282.025.445-.08.163-.122.264-.244.408-.122.144-.258.318-.366.417-.122.115-.25.242-.11.485.14.242.624 1.032 1.34 1.666.924.816 1.7 1.066 1.944 1.181.244.115.386.096.53-.069.144-.165.623-.728.791-.978.168-.25.336-.208.563-.122.227.086 1.442.68 1.686.8.244.12.408.181.468.283.06.102.06.593-.09 1.019z"/>
        </svg>
      </motion.a>
    </div>
  );
};

export default FloatingWhatsApp;
