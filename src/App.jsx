import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import SEOHead from './components/SEOHead';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Packages from './pages/Packages';
import Catalog from './pages/Catalog';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

import { CartProvider } from './context/CartContext';
import { DataProvider } from './context/DataContext';
import CartSidebar from './components/CartSidebar';

const Layout = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return <main className="flex-grow">{children}</main>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-light">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp />
      <CartSidebar />
    </div>
  );
};

function App() {
  return (
    <HelmetProvider>
      <DataProvider>
        <CartProvider>
          <Router>
            <SEOHead />
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/haqqimizda" element={<About />} />
                <Route path="/xidmetlerimiz" element={<Services />} />
                <Route path="/xidmetlerimiz/:slug" element={<ServiceDetail />} />
                <Route path="/paketler" element={<Packages />} />
                <Route path="/kataloq" element={<Catalog />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/category/:category" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Routes>
            </Layout>
          </Router>
        </CartProvider>
      </DataProvider>
    </HelmetProvider>
  );
}

export default App;
