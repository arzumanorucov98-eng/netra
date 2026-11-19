import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';
import { getBlogPosts } from '../firebase/api';
import { defaultBlogPosts, blogCategories } from '../data/blogData';

const Blog = () => {
  const { category } = useParams();
  const [posts, setPosts] = useState(defaultBlogPosts);
  const [searchQuery, setSearchQuery] = useState('');

  // URL-dəki kateqoriyaya əsasən seçilmiş kateqoriyanı müəyyənləşdir
  const selectedCategory = category
    ? blogCategories.find(c => c.slug === category)?.name || 'Hamısı'
    : 'Hamısı';

  useEffect(() => {
    getBlogPosts().then(data => {
      if (data && data.length > 0) {
        // Firebase postlarına slug əlavə et (əgər yoxdursa)
        const postsWithSlugs = data.map(p => ({
          ...p,
          slug: p.slug || p.title.toLowerCase()
            .replace(/ə/g, 'e').replace(/ü/g, 'u').replace(/ö/g, 'o')
            .replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ğ/g, 'g')
            .replace(/ı/g, 'i').replace(/İ/g, 'i')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        }));
        setPosts(postsWithSlugs);
      } else {
        setPosts(defaultBlogPosts);
      }
    }).catch(() => {
      setPosts(defaultBlogPosts);
    });
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'Hamısı' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // SEO meta tag-ları kateqoriyaya görə dəyişir
  const categoryMeta = {
    'Hamisi': {
      title: 'Blog | SMM, Reklam və Rəqəmsal Marketinq Məqalələri | Netra',
      description: 'SMM, Instagram reklamları, Google Ads, SEO və rəqəmsal marketinq haqqında peşəkar məqalələr. Azərbaycan biznesləri üçün praktiki marketinq tövsiyələri.',
      keywords: 'marketinq blog Azərbaycan, SMM məqalələr, rəqəmsal marketinq blogu, Instagram reklam bələdçi, SEO öyrən, sosial media tövsiyələri',
    },
    'SMM': {
      title: 'SMM Haqqında Məqalələr | Sosial Media Marketinq Blogu | Netra',
      description: 'SMM strategiyası, sosial media idarəçiliyi, kontent planlasırması və SMM xidmətləri haqqında peşəkar məqalələr. Biznesinizi sosial mediada böyüdün.',
      keywords: 'SMM məqalələri, sosial media marketinq, SMM strategiyası, kontent planlasırma, Instagram idarəçiliyi, SMM ne bələdçi',
    },
    'Reklam': {
      title: 'Reklam Məqalələri | Instagram və Google Ads Bələdçiləri | Netra',
      description: 'Instagram sponsorlu reklam, Meta Ads, Google Ads, TikTok reklamı və performans marketinq haqqında ətraflı bələdçilər. Hədəfli reklam ilə satış artırın.',
      keywords: 'Instagram reklam bələdçi, Meta Ads tövsiyələri, Google Ads Azərbaycan, target reklam məqalə, performans marketinq',
    },
    'Strategiya': {
      title: 'Marketinq Strategiyası Məqalələri | Rəqəmsal Strategiya | Netra',
      description: 'Rəqəmsal marketinq strategiyası, brendinq, satış artırma tünləri və AI marketinq haqqında peşəkar məqalələr. Azərbaycanda bizneslər üçün.',
      keywords: 'marketinq strategiyası Azərbaycan, brendinq məqalə, satış artırmaq yolları, AI marketinq, rəqəmsal strategiya',
    },
    'Veb Sayt': {
      title: 'Veb Sayt Haqqında Məqalələr | SEO və Sayt Məsləhətləri | Netra',
      description: 'Veb sayt hazırlanması, SEO optimizasiyası, sayt növləri və veb saytın vacibləyi haqqında ətraflı məqalələr. Biznesiniz üçün doğru saytı seçin.',
      keywords: 'veb sayt hazırlanması məqalə, SEO Azərbaycan, sayt növ seçimi, landing page, e-ticarət saytı məsləhət',
    },
  };

  const currentMeta = categoryMeta[selectedCategory] || categoryMeta['Hamisi'];
  const pageTitle = currentMeta.title;
  const pageDescription = currentMeta.description;
  const pageKeywords = currentMeta.keywords;

  const canonicalUrl = category
    ? `https://netramarketing.az/blog/category/${category}`
    : 'https://netramarketing.az/blog';

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Netra Marketing" />

        {/* Canonical */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://netramarketing.az/logo.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Netra Marketing Blog" />
        <meta property="og:locale" content="az_AZ" />
        <meta property="og:site_name" content="Netra Marketing" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://netramarketing.az/logo.jpg" />

        {/* JSON-LD: CollectionPage + BreadcrumbList */}
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: pageTitle,
          description: pageDescription,
          url: canonicalUrl,
          inLanguage: 'az',
          publisher: {
            '@type': 'Organization',
            name: 'Netra Marketing',
            url: 'https://netramarketing.az',
          },
        })}</script>

        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Ana Səhifə', item: 'https://netramarketing.az' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://netramarketing.az/blog' },
            ...(category ? [{ '@type': 'ListItem', position: 3, name: selectedCategory, item: canonicalUrl }] : []),
          ],
        })}</script>
      </Helmet>

      <div className="py-20 bg-light min-h-screen">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              {selectedCategory === 'Hamısı' ? 'Blog' : `${selectedCategory} Məqalələri`}
            </h1>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-gray-600">
              Rəqəmsal marketinq, SMM və biznes inkişafı haqqında peşəkar məqalələr
            </p>
          </motion.div>

          {/* Axtarış və Kateqoriya Filtri */}
          <div className="max-w-4xl mx-auto mb-12">
            {/* Axtarış */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Məqalə axtar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            {/* Kateqoriyalar — hər biri ayrıca URL */}
            <div className="flex flex-wrap gap-3 justify-center">
              {blogCategories.map(cat => (
                <Link
                  key={cat.slug}
                  to={cat.slug === 'hamisi' ? '/blog' : `/blog/category/${cat.slug}`}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    (cat.slug === 'hamisi' && selectedCategory === 'Hamısı') || cat.name === selectedCategory
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Məqalə Siyahısı */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                <Link to={`/blog/${post.slug}`} className="block">
                  {post.image && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        <time dateTime={post.date}>{post.date}</time>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-primary mb-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.summary}
                    </p>
                    <span className="text-blue-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Oxumağa davam et <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              <p className="text-xl">Nəticə tapılmadı</p>
              <p className="mt-2">Axtarış sorğunuzu dəyişdirin və ya başqa kateqoriya seçin.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;
