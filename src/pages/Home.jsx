import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, BarChart3, TrendingUp, Users, Target } from 'lucide-react';
import { aboutText, servicesList, partners } from '../data/content';
import Packages from './Packages';

const Home = () => {
  return (
    <div className="flex flex-col">
      <section 
        className="relative min-h-[50vh] md:min-h-[75vh] flex items-center overflow-hidden py-16 md:py-20 bg-primary bg-cover bg-center bg-no-repeat lg:bg-fixed"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1920&q=80")'
        }}
      >
        {/* Daha tünd və premium overlay - yazıların 100% oxunması üçün */}
        <div className="absolute inset-0 bg-primary/80 z-0"></div>

        <div className="container mx-auto px-4 z-10 relative flex flex-col items-center justify-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-4 md:mb-6 leading-tight text-white drop-shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
              Sosial Mediada Marketinq Sistemi Qururuq
            </h1>
            <p className="text-base md:text-xl text-gray-100 mb-6 md:mb-10 max-w-2xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] font-medium">
              Biznesiniz üçün işləyən və nəticə gətirən marketinq sistemi qururuq. Sizi rəqəmsal dünyada zirvəyə daşıyırıq.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/paketler" className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center shadow-lg hover:shadow-xl w-full sm:w-auto">
                Paketlərimizə Baxın <ArrowRight className="ml-2" size={20} />
              </Link>
              <a href="#contact" className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-primary transition-colors inline-flex items-center justify-center w-full sm:w-auto">
                Bizimlə Əlaqə
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Packages Section */}
      <Packages />

      {/* Brief About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2"
            >
              <h2 className="text-4xl font-bold text-primary mb-6">Netra Marketing Kimdir?</h2>
              <div className="space-y-4 text-lg text-gray-700">
                <p>{aboutText[0]}</p>
                <p>{aboutText[1]}</p>
              </div>
              <Link to="/haqqimizda" className="inline-flex items-center mt-6 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                Daha ətraflı <ArrowRight className="ml-1" size={16} />
              </Link>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:w-1/2"
            >
              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-bold text-primary mb-6">Niyə Biz?</h3>
                <ul className="space-y-4">
                  {[
                    "5 illik peşəkar təcrübə",
                    "Davamlı satış gətirən strategiyalar",
                    "A-dan Z-yə tam idarəçilik",
                    "Süni intellekt dəstəkli yenilikçi həllər"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <CheckCircle className="text-green-500 mr-3" size={24} />
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary mb-12">Bizimlə Əməkdaşlıq Edən Şirkətlər</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {partners.map((partner, index) => (
              <motion.a
                key={index}
                href={partner.instagram !== "#" ? partner.instagram : undefined}
                target={partner.instagram !== "#" ? "_blank" : undefined}
                rel={partner.instagram !== "#" ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-0 rounded-full shadow-md border border-gray-100 hover:shadow-xl hover:border-blue-300 transition-all hover:-translate-y-2 flex flex-col items-center justify-center w-40 h-40 overflow-hidden relative group cursor-pointer"
              >
                <div className="absolute inset-0 flex items-center justify-center p-4 text-center z-0">
                  <h3 className="text-sm font-bold text-gray-400 group-hover:text-primary transition-colors">{partner.name}</h3>
                </div>
                {partner.logo && (
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="w-full h-full object-contain relative z-10 bg-white"
                    onError={(e) => e.target.style.opacity = 0}
                  />
                )}
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
