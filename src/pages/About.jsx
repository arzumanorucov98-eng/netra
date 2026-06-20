import { motion } from 'framer-motion';
import { aboutText } from '../data/content';

const About = () => {
  return (
    <div className="py-20 bg-light min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Haqqımızda</h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-8"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12 space-y-6 text-lg text-gray-700 leading-relaxed">
            {aboutText.map((paragraph, index) => (
              <motion.p 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
          <div className="bg-primary text-white p-8 md:p-12 text-center">
            <h3 className="text-2xl font-bold mb-4">Biznesinizi böyütməyə hazırsınız?</h3>
            <p className="mb-6 text-gray-300">Peşəkar komandamızla tanış olun və nəticəyönümlü strategiyalarımızdan faydalanın.</p>
            <a href="#contact" className="inline-block bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
              Bizimlə Əlaqə
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
