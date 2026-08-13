import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Tag, ArrowRight } from 'lucide-react';
import { getBlogPosts } from '../firebase/api';
import { defaultBlogPosts } from '../data/blogData';

/**
 * Markdown məzmunundakı linkləri React Router <Link> komponentinə çevirən parser
 * Misal: [Link Mətni](/xidmetlerimiz/smm) -> <Link to="/xidmetlerimiz/smm">Link Mətni</Link>
 */
const renderContentWithLinks = (text) => {
  // Markdown linklərini tap: [text](url)
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
 * H2, H3, list, bold, link və paraqrafları dəstəkləyir
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

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      try {
        const firebasePosts = await getBlogPosts();
        let posts = firebasePosts && firebasePosts.length > 0 ? firebasePosts : defaultBlogPosts;
        
        // Firebase postlarına slug əlavə et (əgər yoxdursa)
        posts = posts.map(p => ({
          ...p,
          slug: p.slug || p.title.toLowerCase()
            .replace(/ə/g, 'e').replace(/ü/g, 'u').replace(/ö/g, 'o')
            .replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ğ/g, 'g')
            .replace(/ı/g, 'i').replace(/İ/g, 'i')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        }));

        setAllPosts(posts);
        const found = posts.find(p => p.slug === slug);
        setPost(found || null);
      } catch {
        const posts = defaultBlogPosts;
        setAllPosts(posts);
        const found = posts.find(p => p.slug === slug);
        setPost(found || null);
      }
      setLoading(false);
    };
    loadPost();
  }, [slug]);

  // Yüklənmə zamanı
  if (loading) {
    return (
      <div className="py-20 bg-light min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Məqalə tapılmadı
  if (!post) {
    return (
      <div className="py-20 bg-light min-h-screen">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">Məqalə Tapılmadı</h1>
          <p className="text-gray-600 mb-8">Axtardığınız məqalə mövcud deyil.</p>
          <Link to="/blog" className="inline-block bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-secondary transition-colors">
            Bloga Qayıt
          </Link>
        </div>
      </div>
    );
  }

  // Əlaqədar məqalələr (eyni kateqoriyadan, amma cari məqalə deyil)
  const relatedPosts = allPosts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 2);

  return (
    <>
      <Helmet>
        <title>{post.metaTitle || post.title + ' | Netra Marketing'}</title>
        <meta name="description" content={post.metaDescription || post.summary} />
        <meta name="keywords" content={post.tags ? post.tags.join(', ') : ''} />
        <meta property="og:title" content={post.metaTitle || post.title} />
        <meta property="og:description" content={post.metaDescription || post.summary} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://netramarketing.az/blog/${post.slug}`} />
        {post.image && <meta property="og:image" content={post.image} />}
        <meta property="og:locale" content="az_AZ" />
        <meta property="og:site_name" content="Netra Marketing" />
        <link rel="canonical" href={`https://netramarketing.az/blog/${post.slug}`} />
      </Helmet>

      <motion.article 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-20 bg-light min-h-screen" 
        itemScope 
        itemType="https://schema.org/BlogPosting"
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <Link 
            to="/blog"
            className="mb-8 text-blue-600 hover:text-blue-800 font-semibold flex items-center transition-colors inline-flex"
          >
            <ArrowLeft size={18} className="mr-2" /> Bütün məqalələrə qayıt
          </Link>
          
          {post.image && (
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-2xl mb-8 mt-6"
              itemProp="image"
            />
          )}
          
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 flex-wrap">
            <Link 
              to={`/blog/category/${post.category.toLowerCase()}`}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium hover:bg-blue-200 transition-colors"
              itemProp="articleSection"
            >
              {post.category}
            </Link>
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              <time itemProp="datePublished" dateTime={post.date}>{post.date}</time>
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6" itemProp="headline">
            {post.title}
          </h1>

          <div 
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
            itemProp="articleBody"
          >
            {renderMarkdownContent(post.content)}
          </div>

          {post.tags && (
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-200">
              <Tag size={16} className="text-gray-400" />
              {post.tags.map((tag, i) => (
                <span key={i} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Əlaqədar Məqalələr */}
          {relatedPosts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-primary mb-6">Əlaqədar Məqalələr</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map(rp => (
                  <Link 
                    key={rp.slug} 
                    to={`/blog/${rp.slug}`}
                    className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all group"
                  >
                    {rp.image && (
                      <div className="h-40 overflow-hidden">
                        <img src={rp.image} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-bold text-primary group-hover:text-blue-600 transition-colors">{rp.title}</h3>
                      <span className="text-blue-600 text-sm font-semibold flex items-center gap-1 mt-2">
                        Oxu <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 bg-primary text-white p-8 rounded-2xl text-center">
            <h3 className="text-2xl font-bold mb-3">Peşəkar marketinq xidmətinə ehtiyacınız var?</h3>
            <p className="text-gray-300 mb-6">Netra Marketing ilə əlaqə saxlayın və biznesinizi böyüdün!</p>
            <a href="https://wa.me/994519784946" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
              WhatsApp-dan Yazın
            </a>
          </div>

          <meta itemProp="author" content="Netra Marketing" />
          <meta itemProp="publisher" content="Netra Marketing" />
        </div>
      </motion.article>
    </>
  );
};

export default BlogPost;
