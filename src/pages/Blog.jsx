import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';
import { getBlogPosts } from '../firebase/api';
import { defaultBlogPosts, blogCategories } from '../data/blogData';

const Blog = () => {
  const { category } = useParams();
  const [posts, setPosts] = useState([]);
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
  const pageTitle = selectedCategory === 'Hamısı'
    ? 'Blog — Rəqəmsal Marketinq Məqalələri | Netra Marketing'
    : `${selectedCategory} Məqalələri — Blog | Netra Marketing`;
  
  const pageDescription = selectedCategory === 'Hamısı'
    ? 'Rəqəmsal marketinq, SMM, sosial media strategiyaları, reklam tövsiyələri və texnoloji yeniliklər haqqında peşəkar məqalələr.'
    : `${selectedCategory} haqqında peşəkar məqalələr. Netra Marketing blog.`;

  const canonicalUrl = category
    ? `https://netramarketing.az/blog/category/${category}`
    : 'https://netramarketing.az/blog';

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:locale" content="az_AZ" />
        <meta property="og:site_name" content="Netra Marketing" />
        <link rel="canonical" href={canonicalUrl} />
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
                itemScope
                itemType="https://schema.org/BlogPosting"
              >
                <Link to={`/blog/${post.slug}`} className="block">
                  {post.image && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        itemProp="image"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium" itemProp="articleSection">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        <time itemProp="datePublished" dateTime={post.date}>{post.date}</time>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-primary mb-2 group-hover:text-blue-600 transition-colors" itemProp="headline">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3" itemProp="description">
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
