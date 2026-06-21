import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Menu, X } from 'lucide-react'; 
import { companyInfo } from '../data/content';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-primary text-white shadow-lg border-b border-secondary">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex flex-col items-center justify-center mr-8 hover:opacity-90 transition-opacity">
          <span className="text-3xl md:text-4xl font-serif font-extrabold tracking-[0.15em] text-white leading-none">NETRA</span>
          <div className="flex items-center w-full mt-1.5 opacity-90">
            <div className="h-[1px] flex-grow bg-white/40"></div>
            <span className="text-[0.5rem] md:text-[0.6rem] tracking-[0.4em] text-white font-medium uppercase px-2">Marketing</span>
            <div className="h-[1px] flex-grow bg-white/40"></div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8 font-medium">
          <Link to="/" className="hover:text-gray-300 transition-colors">Ana Səhifə</Link>
          <Link to="/haqqimizda" className="hover:text-gray-300 transition-colors">Haqqımızda</Link>
          <Link to="/xidmetlerimiz" className="hover:text-gray-300 transition-colors">Xidmətlərimiz</Link>
          <Link to="/paketler" className="hover:text-gray-300 transition-colors">Paketlər</Link>
          <a href="#contact" className="hover:text-gray-300 transition-colors">Əlaqə</a>
        </nav>

        {/* Social Icons (Desktop) & Mobile Toggle */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex space-x-4">
            <a href={companyInfo.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors">
              <Instagram size={24} />
            </a>
            <a href={companyInfo.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.63-.4 3.32-1.35 4.67-1.13 1.58-2.92 2.62-4.88 2.87-1.95.25-4.01-.13-5.59-1.2-1.74-1.18-2.88-3.15-2.98-5.26-.09-2.14.86-4.29 2.52-5.55 1.65-1.25 3.86-1.63 5.86-1.02V13.8a4.414 4.414 0 00-3.32.48c-.96.6-1.57 1.67-1.58 2.8-.02 1.18.6 2.3 1.56 2.92.93.61 2.13.78 3.19.46 1.05-.32 1.88-1.14 2.19-2.2.14-.49.19-1 .18-1.5v-16.74z"/>
              </svg>
            </a>
            <a href={companyInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.031 0C5.385 0 0 5.388 0 12.035c0 2.124.553 4.195 1.603 6.012L.15 23.364l5.44-1.428A11.97 11.97 0 0012.032 24c6.645 0 12.031-5.388 12.031-12.035C24.062 5.388 18.676 0 12.031 0zm3.565 17.202c-.15.426-.874.832-1.222.846-.35.015-.758.117-2.392-.533-1.975-.785-3.238-2.827-3.336-2.956-.098-.13-1.096-1.464-1.096-2.793 0-1.33.687-1.986.932-2.261.246-.275.534-.344.712-.344.178 0 .356.002.518.01.162.008.38-.063.593.456.213.518.728 1.776.793 1.905.064.13.106.282.025.445-.08.163-.122.264-.244.408-.122.144-.258.318-.366.417-.122.115-.25.242-.11.485.14.242.624 1.032 1.34 1.666.924.816 1.7 1.066 1.944 1.181.244.115.386.096.53-.069.144-.165.623-.728.791-.978.168-.25.336-.208.563-.122.227.086 1.442.68 1.686.8.244.12.408.181.468.283.06.102.06.593-.09 1.019z"/>
              </svg>
            </a>
          </div>
          
          <button className="md:hidden text-white hover:text-gray-300 transition-colors" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-primary/95 backdrop-blur-sm border-t border-secondary absolute w-full left-0 py-6 flex flex-col space-y-4 items-center shadow-2xl">
          <Link to="/" onClick={toggleMobileMenu} className="text-xl font-bold hover:text-gray-300 transition-colors">Ana Səhifə</Link>
          <Link to="/haqqimizda" onClick={toggleMobileMenu} className="text-xl font-bold hover:text-gray-300 transition-colors">Haqqımızda</Link>
          <Link to="/xidmetlerimiz" onClick={toggleMobileMenu} className="text-xl font-bold hover:text-gray-300 transition-colors">Xidmətlərimiz</Link>
          <Link to="/paketler" onClick={toggleMobileMenu} className="text-xl font-bold hover:text-gray-300 transition-colors">Paketlər</Link>
          <a href="#contact" onClick={toggleMobileMenu} className="text-xl font-bold hover:text-gray-300 transition-colors">Əlaqə</a>
          
          <div className="flex space-x-6 pt-6 border-t border-secondary w-1/2 justify-center">
            <a href={companyInfo.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors">
              <Instagram size={28} />
            </a>
            <a href={companyInfo.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.63-.4 3.32-1.35 4.67-1.13 1.58-2.92 2.62-4.88 2.87-1.95.25-4.01-.13-5.59-1.2-1.74-1.18-2.88-3.15-2.98-5.26-.09-2.14.86-4.29 2.52-5.55 1.65-1.25 3.86-1.63 5.86-1.02V13.8a4.414 4.414 0 00-3.32.48c-.96.6-1.57 1.67-1.58 2.8-.02 1.18.6 2.3 1.56 2.92.93.61 2.13.78 3.19.46 1.05-.32 1.88-1.14 2.19-2.2.14-.49.19-1 .18-1.5v-16.74z"/>
              </svg>
            </a>
            <a href={companyInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.031 0C5.385 0 0 5.388 0 12.035c0 2.124.553 4.195 1.603 6.012L.15 23.364l5.44-1.428A11.97 11.97 0 0012.032 24c6.645 0 12.031-5.388 12.031-12.035C24.062 5.388 18.676 0 12.031 0zm3.565 17.202c-.15.426-.874.832-1.222.846-.35.015-.758.117-2.392-.533-1.975-.785-3.238-2.827-3.336-2.956-.098-.13-1.096-1.464-1.096-2.793 0-1.33.687-1.986.932-2.261.246-.275.534-.344.712-.344.178 0 .356.002.518.01.162.008.38-.063.593.456.213.518.728 1.776.793 1.905.064.13.106.282.025.445-.08.163-.122.264-.244.408-.122.144-.258.318-.366.417-.122.115-.25.242-.11.485.14.242.624 1.032 1.34 1.666.924.816 1.7 1.066 1.944 1.181.244.115.386.096.53-.069.144-.165.623-.728.791-.978.168-.25.336-.208.563-.122.227.086 1.442.68 1.686.8.244.12.408.181.468.283.06.102.06.593-.09 1.019z"/>
              </svg>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
