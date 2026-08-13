import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { seoConfig, SITE_URL, SITE_NAME, DEFAULT_IMAGE } from '../data/seoConfig';

/**
 * Dinamik SEO Head komponenti
 * Statik səhifələr üçün meta tag-ları təyin edir.
 * Blog post və xidmət detail səhifələri öz <Helmet>-lərini istifadə edir.
 */
const SEOHead = () => {
  const location = useLocation();
  const path = location.pathname;

  // Dinamik marşrutlar (blog post, service detail) öz Helmet-lərini istifadə edir
  // Bu komponent yalnız statik marşrutlar üçün default meta tag-ları təyin edir
  if (
    (path.startsWith('/blog/') && path !== '/blog') ||
    (path.startsWith('/xidmetlerimiz/') && path !== '/xidmetlerimiz')
  ) {
    return null;
  }

  const config = seoConfig[path] || seoConfig['/'];
  const canonicalUrl = `${SITE_URL}${path === '/' ? '' : path}`;

  return (
    <Helmet>
      <title>{config.title}</title>
      <meta name="description" content={config.description} />
      <meta name="keywords" content={config.keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={config.title} />
      <meta property="og:description" content={config.description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={config.ogType || 'website'} />
      <meta property="og:image" content={DEFAULT_IMAGE} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="az_AZ" />
      
      {/* Twitter Card */}
      <meta name="twitter:title" content={config.title} />
      <meta name="twitter:description" content={config.description} />
      <meta name="twitter:image" content={DEFAULT_IMAGE} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

export default SEOHead;
