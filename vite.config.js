import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Prerender from '@prerenderer/rollup-plugin'

// Məlumatları Firebase REST API vasitəsilə asinxron çəkmək üçün funksiya
async function getDynamicRoutes() {
  const staticRoutes = [
    '/',
    '/haqqimizda',
    '/xidmetlerimiz',
    '/paketler',
    '/kataloq',
    '/blog'
  ];

  try {
    // Blog postları çək
    const blogRes = await fetch('https://firestore.googleapis.com/v1/projects/netra-csm/databases/(default)/documents/blogPosts');
    const blogData = await blogRes.json();
    
    const blogRoutes = [];
    const categories = new Set();
    
    if (blogData.documents) {
      blogData.documents.forEach(d => {
        const title = d.fields.title?.stringValue || '';
        const slug = d.fields.slug?.stringValue || title.toLowerCase()
          .replace(/ə/g, 'e').replace(/ü/g, 'u').replace(/ö/g, 'o')
          .replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ğ/g, 'g')
          .replace(/ı/g, 'i').replace(/İ/g, 'i')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        
        if (slug) blogRoutes.push('/blog/' + slug);
        
        const cat = d.fields.category?.stringValue;
        if (cat) categories.add('/blog/category/' + cat.toLowerCase());
      });
    }

    // Xidmətləri çək
    const serviceRoutes = [];
    try {
      const srvRes = await fetch('https://firestore.googleapis.com/v1/projects/netra-csm/databases/(default)/documents/services');
      const srvData = await srvRes.json();
      
      if (srvData.documents) {
        srvData.documents.forEach(d => {
          const title = d.fields.title?.stringValue || '';
          const slug = d.fields.slug?.stringValue || title.toLowerCase()
            .replace(/ə/g, 'e').replace(/ü/g, 'u').replace(/ö/g, 'o')
            .replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ğ/g, 'g')
            .replace(/ı/g, 'i').replace(/İ/g, 'i')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
          
          if (slug) serviceRoutes.push('/xidmetlerimiz/' + slug);
        });
      }
    } catch (e) {
      console.error("Firebase-dən xidmətləri çəkərkən xəta:", e);
    }

    return [...staticRoutes, ...serviceRoutes, ...blogRoutes, ...Array.from(categories)];
  } catch (error) {
    console.error("Route-ları çəkərkən xəta:", error);
    return staticRoutes;
  }
}

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const dynamicRoutes = await getDynamicRoutes();
  
  return {
    plugins: [
      react(),
      Prerender({
        routes: dynamicRoutes,
        renderer: '@prerenderer/renderer-puppeteer',
        rendererOptions: {
          maxConcurrentRoutes: 3,
          renderAfterTime: 5000,
        },
        postProcess(renderedRoute) {
          renderedRoute.route = renderedRoute.originalRoute
        },
      }),
    ],
  }
})
