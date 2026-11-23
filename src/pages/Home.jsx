import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, BarChart3, TrendingUp, Users, Target } from 'lucide-react';
import { aboutText, servicesList, partners } from '../data/content';
import { getPartners, getServices } from '../firebase/api';


const Home = () => {
  const [firebasePartners, setFirebasePartners] = useState(partners);
  const [firebaseServices, setFirebaseServices] = useState(servicesList);
  const [showText, setShowText] = useState(true);

  const handleTimeUpdate = (e) => {
    const video = e.target;
    // Hide text in the last 4 seconds of the video to show the logo
    const hideDuration = 4.0;
    if (video.duration && video.currentTime >= video.duration - hideDuration) {
      if (showText) setShowText(false);
    } else {
      if (!showText) setShowText(true);
    }
  };

  useEffect(() => {
    getPartners().then(data => {
      if (data && data.length > 0) {
        setFirebasePartners(data);
      }
    }).catch(err => console.error("Partnyorlar yüklənərkən xəta:", err));

    getServices().then(data => {
      if (data && data.length > 0) {
        setFirebaseServices(data.sort((a, b) => (a.order || 0) - (b.order || 0)));
      }
    }).catch(err => console.error("Xidmətlər yüklənərkən xəta:", err));
  }, []);

  const displayPartners = firebasePartners.length > 0 ? firebasePartners : partners;
  return (
    <div className="flex flex-col">
      <section 
        aria-label="Əsas Banner"
        className="relative w-full min-h-[60vh] sm:min-h-[70vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-[#0f172a]"
      >
        {/* Arxa plan videosu */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/video-poster.jpg"
          onTimeUpdate={handleTimeUpdate}
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/websayt-small.mp4" type="video/mp4" />
          Sizin brauzeriniz video tag-ini dəstəkləmir.
        </video>

        {/* Daha tünd və premium overlay - yazıların 100% oxunması üçün */}
        <div className="absolute inset-0 bg-blue-950/60 z-0"></div>

        <div className="container mx-auto px-4 z-10 relative flex flex-col items-center justify-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl relative"
          >
            <h1 className="sr-only">Biznesiniz üçün bütöv marketing sistemi qururuq - SMM və Rəqəmsal Marketinq Agentliyi</h1>
            <div className={`flex flex-col items-center justify-center min-h-[100px] md:min-h-[200px] transition-opacity duration-700 ${showText ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true">
              <TypeAnimation
                sequence={[
                  'SMM və Rəqəmsal Marketinq Agentliyi',
                  2500,
                  '',
                  500,
                  'Sosial Media İdarəçiliyi (SMM)',
                  2000,
                  '',
                  500,
                  'Veb Saytların Hazırlanması',
                  2000,
                  '',
                  500,
                  'SEO Optimizasiyası',
                  2000,
                  '',
                  500,
                  'Targetinq və Reklam',
                  2000,
                  '',
                  500,
                  'Brendinq və Dizayn',
                  2000,
                  '',
                  500
                ]}
                wrapper="div"
                speed={50}
                className="text-xl sm:text-2xl md:text-5xl lg:text-7xl font-bold leading-tight text-white drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)] text-center min-h-[60px] md:min-h-[120px]"
                repeat={Infinity}
              />
            </div>
            
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="pt-6 pb-12 md:py-12 bg-gray-50" aria-label="Xidmətlərimiz">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 md:mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">Xidmətlərimiz</h2>
            <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">Biznesinizi onlayn dünyada zirvəyə daşıyacaq peşəkar həllər.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {firebaseServices.map((service, index) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-primary rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 flex flex-col h-full group"
              >
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight">{service.title}</h3>
                  <p className="text-blue-100 text-sm mb-4 line-clamp-3 leading-relaxed">{service.description}</p>
                </div>
                
                <div className="mt-4 pt-4 border-t border-white/10">
                  <Link 
                    to={`/xidmetlerimiz/${service.slug}`}
                    className="flex items-center justify-between w-full text-white font-medium hover:text-blue-200 transition-colors"
                    aria-label={`${service.title} haqqında ətraflı`}
                  >
                    <span>Ətraflı oxu</span>
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Brief About Section */}
      <section className="py-20 bg-white" aria-label="Haqqımızda">
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
      <section className="py-20 md:py-24 bg-gradient-to-b from-white to-gray-50" aria-label="Partnyorlar">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 rounded-full">
            Partnyorlarımız
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Bizimlə Əməkdaşlıq Edən Şirkətlər</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-14">
            Müxtəlif sahələrdən olan brendlər rəqəmsal inkişafını Netra Marketing-ə etibar edir.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6 max-w-6xl mx-auto">
            {displayPartners.map((partner, index) => {
              const linkUrl = partner.link || partner.instagram;
              const hasLink = linkUrl && linkUrl !== "#";
              return (
              <motion.a
                key={index}
                href={hasLink ? linkUrl : undefined}
                target={hasLink ? "_blank" : undefined}
                rel={hasLink ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/30 hover:-translate-y-1.5 transition-all duration-300 p-6 flex flex-col items-center ${hasLink ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden ring-4 ring-gray-50 group-hover:ring-primary/20 transition-all duration-300 bg-white mb-4">
                  {partner.logo && (
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      width="112"
                      height="112"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                      onError={(e) => e.target.style.opacity = 0}
                    />
                  )}
                </div>
                <h3 className="text-sm md:text-base font-semibold text-gray-800 leading-tight">{partner.name}</h3>
                {partner.category && (
                  <p className="text-xs text-gray-500 mt-1">{partner.category}</p>
                )}
              </motion.a>
              );
            })}
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-20 bg-gray-50" aria-label="Tez-tez Verilən Suallar (FAQ)">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Tez-tez Verilən Suallar</h2>
            <p className="text-lg text-gray-600">SMM, rəqəmsal marketinq və xidmətlərimiz haqqında ən çox verilən suallar və cavabları.</p>
          </div>
          <div className="space-y-4">
            {[
              { q: "Netra Marketing hansı xidmətləri təklif edir?", a: "Netra Marketing sosial media idarəçiliyi (SMM), Instagram və Facebook reklamları, TikTok marketinqi, professional video çəkiliş, post dizaynları, AI video hazırlanması, brend inkişafı, veb sayt hazırlanması və satış strategiyalarının qurulması xidmətlərini təklif edir." },
              { q: "Netra Marketing-in qiymətləri nə qədərdir?", a: "Netra Marketing-in paketləri 200 AZN-dən başlayır. Brend Quruculuğu Paketi 200 AZN, Start Paketi aylıq 500 AZN, Standart Paket aylıq 600 AZN, Premium Paket aylıq 800 AZN, VIP Paket isə aylıq 900 AZN-dir." },
              { q: "SMM xidməti nədir və nə üçün lazımdır?", a: "SMM (Sosial Media Marketinq) — biznesinizin sosial media platformalarında (Instagram, Facebook, TikTok) peşəkar şəkildə idarə olunması, kontent hazırlanması, reklam kampaniyalarının aparılması və hədəf auditoriyaya çatdırılmasıdır. Bu, müştəri bazanızı artırmaq və brend tanınırlığınızı yüksəltmək üçün lazımdır." },
              { q: "Azərbaycanda ən yaxşı marketinq agentliyi hansıdır?", a: "Netra Marketing Azərbaycanda 5 illik təcrübəyə malik peşəkar rəqəmsal marketinq agentliyidir. A-dan Z-yə tam idarəçilik, davamlı satış gətirən strategiyalar və süni intellekt dəstəkli yenilikçi həllər təklif edir." },
              { q: "Netra Marketing ilə necə əlaqə saxlamaq olar?", a: "Netra Marketing ilə +994 51 978 49 46 nömrəsinə zəng edərək, WhatsApp-dan yazaraq və ya Instagram səhifəsi (@netra.marketing) üzərindən əlaqə saxlaya bilərsiniz." }
            ].map((faq, idx) => (
              <details key={idx} className="group bg-white rounded-xl shadow-sm border border-gray-200 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-gray-900 font-semibold hover:text-blue-600 transition-colors">
                  <h3 className="text-lg md:text-xl font-semibold m-0">{faq.q}</h3>
                  <span className="shrink-0 rounded-full bg-blue-50 p-1.5 text-blue-600 sm:p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0 transition duration-300 group-open:-rotate-45" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed text-base md:text-lg">
                  <p>{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
