import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { servicesList } from '../data/content';

/**
 * Markdown məzmunundakı linkləri React Router <Link> komponentinə çevirən parser
 */
const renderContentWithLinks = (text) => {
  const parts = text.split(/(\[.*?\]\(\/.*?\))/g);
  return parts.map((part, i) => {
    const linkMatch = part.match(/\[(.*?)\]\((\/.*?)\)/);
    if (linkMatch) {
      return (
        <Link
          key={i}
          to={linkMatch[2]}
          className="text-blue-600 hover:text-blue-800 underline font-medium transition-colors"
        >
          {linkMatch[1]}
        </Link>
      );
    }
    return part;
  });
};

/**
 * Markdown məzmununu HTML elementlərinə çevirən parser
 */
const renderMarkdownContent = (content) => {
  return content.split('\n').map((line, i) => {
    if (line.startsWith('### ')) {
      return <h3 key={i} className="text-xl font-bold text-primary mt-8 mb-3">{renderContentWithLinks(line.replace('### ', ''))}</h3>;
    }
    if (line.startsWith('## ')) {
      return <h2 key={i} className="text-2xl font-bold text-primary mt-8 mb-4">{renderContentWithLinks(line.replace('## ', ''))}</h2>;
    }
    if (line.startsWith('- ')) {
      const text = line.replace('- ', '');
      const parts = text.split(/(\*\*.*?\*\*)/g);
      return (
        <li key={i} className="ml-6 mb-2 list-disc text-gray-700">
          {parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={j}>{part.replace(/\*\*/g, '')}</strong>;
            }
            return renderContentWithLinks(part);
          })}
        </li>
      );
    }
    if (line.match(/^\d\. /)) {
      const text = line.replace(/^\d\. /, '');
      const parts = text.split(/(\*\*.*?\*\*)/g);
      return (
        <li key={i} className="ml-6 mb-2 list-decimal text-gray-700">
          {parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={j}>{part.replace(/\*\*/g, '')}</strong>;
            }
            return renderContentWithLinks(part);
          })}
        </li>
      );
    }
    if (line.trim() === '') return <br key={i} />;
    return <p key={i} className="mb-3 text-gray-700 leading-relaxed">{renderContentWithLinks(line)}</p>;
  });
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = servicesList.find(s => s.slug === slug);

  // Əlaqədar xidmətlər (cari xidmət xaric ilk 3)
  const relatedServices = servicesList.filter(s => s.slug !== slug).slice(0, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Xidmət tapılmadı
  if (!service) {
    return (
      <div className="py-20 bg-light min-h-screen">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">Xidmət Tapılmadı</h1>
          <p className="text-gray-600 mb-8">Axtardığınız xidmət mövcud deyil.</p>
          <Link to="/xidmetlerimiz" className="inline-block bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-secondary transition-colors">
            Xidmətlərə Qayıt
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{service.metaTitle}</title>
        <meta name="description" content={service.metaDescription} />
        <meta property="og:title" content={service.metaTitle} />
        <meta property="og:description" content={service.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://netramarketing.az/xidmetlerimiz/${service.slug}`} />
        <meta property="og:locale" content="az_AZ" />
        <meta property="og:site_name" content="Netra Marketing" />
        <link rel="canonical" href={`https://netramarketing.az/xidmetlerimiz/${service.slug}`} />
      </Helmet>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-20 bg-light min-h-screen"
      >
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link to="/" className="hover:text-blue-600 transition-colors">Ana Səhifə</Link>
            <span>/</span>
            <Link to="/xidmetlerimiz" className="hover:text-blue-600 transition-colors">Xidmətlərimiz</Link>
            <span>/</span>
            <span className="text-primary font-medium">{service.title}</span>
          </div>

          <Link 
            to="/xidmetlerimiz"
            className="mb-8 text-blue-600 hover:text-blue-800 font-semibold flex items-center transition-colors inline-flex"
          >
            <ArrowLeft size={18} className="mr-2" /> Bütün xidmətlərə qayıt
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 mt-6">
            {service.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8">{service.description}</p>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            {renderMarkdownContent(service.content)}
          </div>

          {/* CTA */}
          <div className="mt-12 bg-primary text-white p-8 rounded-2xl text-center">
            <h3 className="text-2xl font-bold mb-3">{service.title} xidmətindən yararlanmaq istəyirsiniz?</h3>
            <p className="text-gray-300 mb-6">Bizimlə əlaqə saxlayın, pulsuz konsultasiya alın!</p>
            <a href="https://wa.me/994519784946" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
              WhatsApp-dan Yazın
            </a>
          </div>

          {/* Əlaqədar Xidmətlər */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-primary mb-6">Digər Xidmətlərimiz</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedServices.map(rs => (
                <Link
                  key={rs.slug}
                  to={`/xidmetlerimiz/${rs.slug}`}
                  className="bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all group"
                >
                  <div className="bg-blue-50 p-3 rounded-full text-blue-600 w-fit mb-3">
                    <CheckCircle2 size={20} />
                  </div>
                  <h3 className="font-bold text-primary group-hover:text-blue-600 transition-colors">{rs.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{rs.description}</p>
                  <span className="text-blue-600 text-sm font-semibold flex items-center gap-1 mt-3">
                    Ətraflı <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ServiceDetail;
