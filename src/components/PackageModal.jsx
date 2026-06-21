import { motion } from 'framer-motion';
import { X, CheckCircle2, MessageCircle } from 'lucide-react';
import { companyInfo } from '../data/content';

const PackageModal = ({ pkg, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors z-20"
        >
          <X size={24} />
        </button>

        <div className="p-8 md:p-10">
          <div className="text-center border-b pb-6 mb-6">
            <h2 className="text-3xl font-bold text-primary mb-2">{pkg.name}</h2>
            <div className="text-2xl font-extrabold text-blue-600 mb-4">{pkg.price}</div>
            <p className="text-gray-600">{pkg.description}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-primary mb-4">Paketə daxildir:</h3>
            <ul className="space-y-4">
              {pkg.features.map((feature, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start"
                >
                  <CheckCircle2 className="text-green-500 mr-3 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-700">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {pkg.targetAudience && (
            <div className="bg-blue-50 p-4 rounded-xl mb-8 border border-blue-100 text-blue-800 text-sm">
              <strong>Kimin üçün:</strong> {pkg.targetAudience}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
            <a 
              href={companyInfo.whatsapp} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 bg-green-500 text-white py-4 rounded-xl font-bold flex items-center justify-center hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="mr-2" size={20} />
              Sifariş Et / Məlumat Al
            </a>
            <button 
              onClick={onClose}
              className="px-8 py-4 rounded-xl font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Bağla
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PackageModal;
