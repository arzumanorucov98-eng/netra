import { motion } from 'framer-motion';
import { servicesList } from '../data/content';
import { CheckCircle2 } from 'lucide-react';

const Services = () => {
  return (
    <div className="py-20 bg-light min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Xidmətlərimiz</h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-gray-600">
            Biznesinizin rəqəmsal dünyada inkişafı üçün tam əhatəli xidmətlər təklif edirik.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {servicesList.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex items-start space-x-4"
            >
              <div className="bg-blue-50 p-3 rounded-full text-blue-600 flex-shrink-0">
                <CheckCircle2 size={24} />
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-lg font-bold text-primary">{service}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
