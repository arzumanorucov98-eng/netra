import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { seoConfig, SITE_URL, SITE_NAME, DEFAULT_IMAGE } from '../data/seoConfig';

/**
 * Dinamik SEO Head komponenti
 * Statik səhifələr üçün meta tag-lar, JSON-LD Schema.org məlumatları,
 * Open Graph, Twitter Card və robots meta-sını idarə edir.
 *
 * Blog post və xidmət detail səhifələri öz <Helmet>-lərini istifadə edir.
 */

const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
  name: 'Netra Marketing',
  alternateName: 'Netra Marketinq',
  url: SITE_URL,
  logo: DEFAULT_IMAGE,
  image: DEFAULT_IMAGE,
  description: 'Netra Marketing Azərbaycanda SMM, sosial media idarəçiliyi, rəqəmsal marketinq, reklam, SEO, Google Ads və veb sayt xidmətləri təqdim edir.',
  telephone: '+994519784946',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bakı',
    addressCountry: 'AZ',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Azerbaijan',
  },
  sameAs: [
    'https://www.instagram.com/netra.marketing',
    'https://vt.tiktok.com/ZSQ3TcMd7/',
  ],
  priceRange: '$$',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '18:00',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+994519784946',
    contactType: 'customer service',
    availableLanguage: ['Azerbaijani', 'Russian'],
  },
};

const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

const getBreadcrumbSchema = (path) => {
  const breadcrumbs = [{ name: 'Ana Səhifə', url: SITE_URL }];

  if (path === '/haqqimizda') {
    breadcrumbs.push({ name: 'Haqqımızda', url: `${SITE_URL}/haqqimizda` });
  } else if (path === '/xidmetlerimiz') {
    breadcrumbs.push({ name: 'Xidmətlərimiz', url: `${SITE_URL}/xidmetlerimiz` });
  } else if (path === '/paketler') {
    breadcrumbs.push({ name: 'Paketlər', url: `${SITE_URL}/paketler` });
  } else if (path === '/kataloq') {
    breadcrumbs.push({ name: 'Kataloq', url: `${SITE_URL}/kataloq` });
  } else if (path === '/blog') {
    breadcrumbs.push({ name: 'Blog', url: `${SITE_URL}/blog` });
  }

  if (breadcrumbs.length <= 1) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

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
  const robots = config.robots || 'index, follow';
  const isHome = path === '/';
  const breadcrumbSchema = getBreadcrumbSchema(path);

  return (
    <Helmet>
      {/* Əsas Meta */}
      <html lang="az" />
      <title>{config.title}</title>
      <meta name="description" content={config.description} />
      {config.keywords && <meta name="keywords" content={config.keywords} />}
      <meta name="robots" content={robots} />
      <meta name="author" content={SITE_NAME} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={config.title} />
      <meta property="og:description" content={config.description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={config.ogType || 'website'} />
      <meta property="og:image" content={DEFAULT_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${SITE_NAME} — Rəqəmsal Marketinq`} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="az_AZ" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={config.title} />
      <meta name="twitter:description" content={config.description} />
      <meta name="twitter:image" content={DEFAULT_IMAGE} />
      <meta name="twitter:image:alt" content={`${SITE_NAME} — Rəqəmsal Marketinq`} />

      {/* JSON-LD: WebSite Schema (hər səhifədə) */}
      <script type="application/ld+json">
        {JSON.stringify(WEBSITE_SCHEMA)}
      </script>

      {/* JSON-LD: Organization + LocalBusiness (yalnız ana səhifədə) */}
      {isHome && (
        <script type="application/ld+json">
          {JSON.stringify(ORGANIZATION_SCHEMA)}
        </script>
      )}

      {/* JSON-LD: BreadcrumbList (ana səhifə xaric) */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
