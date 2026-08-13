/**
 * Hər səhifə üçün SEO konfiqurasiyası
 * Bu konfiqurasiya SEOHead komponenti tərəfindən istifadə olunur
 */

const SITE_URL = 'https://netramarketing.az';
const SITE_NAME = 'Netra Marketing';
const DEFAULT_IMAGE = `${SITE_URL}/logo.jpg`;

export const seoConfig = {
  '/': {
    title: 'Netra Marketing | SMM və Rəqəmsal Marketinq Agentliyi',
    description: 'Netra Marketing – SMM, sosial media idarəçiliyi, reklam və rəqəmsal marketinq xidmətləri. Biznesinizi onlayn böyüdün və daha çox müştəri qazanın.',
    keywords: 'reklamçı, SMM, sosial media marketinq, rəqəmsal marketinq, digital marketing, Instagram reklam, marketinq agentliyi, Netra Marketing, Bakı, Azərbaycan',
    ogType: 'website',
  },
  '/haqqimizda': {
    title: 'Haqqımızda — Netra Marketing | 5 İllik Təcrübə ilə Rəqəmsal Marketinq',
    description: 'Netra Marketing 5 illik təcrübəyə malik rəqəmsal marketinq agentliyidir. Bizneslər üçün sosial media marketinq sistemləri quraraq onların böyüməsinə kömək edirik.',
    keywords: 'Netra Marketing haqqında, marketinq agentliyi Bakı, rəqəmsal marketinq komandası, SMM mütəxəssisləri, peşəkar marketinq',
    ogType: 'website',
  },
  '/xidmetlerimiz': {
    title: 'Xidmətlərimiz — SMM, Reklam, Video Çəkiliş, Veb Sayt | Netra Marketing',
    description: 'Sosial media idarəçiliyi, Instagram/Facebook reklamları, TikTok marketinqi, professional video çəkiliş, post dizaynları, AI video, brend inkişafı və veb sayt hazırlanması xidmətləri.',
    keywords: 'SMM xidməti, sosial media idarəçiliyi, Instagram reklam xidməti, Facebook reklam, TikTok marketinq, video çəkiliş, post dizayn, AI video, brend inkişafı, veb sayt hazırlanması, reklamçı',
    ogType: 'website',
  },
  '/paketler': {
    title: 'Marketinq Paketləri — 200 AZN-dən başlayan | Netra Marketing',
    description: 'Netra Marketing-in marketinq paketləri: Brend Quruculuğu (200 AZN), Start (500 AZN/ay), Standart (600 AZN/ay), Premium (800 AZN/ay), VIP (900 AZN/ay). Biznesiniz üçün ən uyğun paketi seçin!',
    keywords: 'marketinq paketləri, SMM qiymət, sosial media marketinq qiymətləri, reklam paketi, Netra Marketing paketlər, aylıq marketinq, Instagram idarəçilik qiyməti',
    ogType: 'website',
  },
  '/kataloq': {
    title: 'Veb Sayt Nümunələri — Professional Veb Sayt Hazırlanması | Netra Marketing',
    description: 'Netra Marketing tərəfindən hazırlanmış veb sayt nümunələri. Korporativ saytlar, e-ticarət, portfolio və landing page dizaynları. Müasir və responsive veb saytlar.',
    keywords: 'veb sayt hazırlanması, website dizayn, sayt sifarişi, korporativ sayt, e-ticarət saytı, landing page, veb dizayner Bakı, sayt qiyməti',
    ogType: 'website',
  },
  '/blog': {
    title: 'Blog — Rəqəmsal Marketinq Məqalələri | Netra Marketing',
    description: 'Rəqəmsal marketinq, SMM, sosial media strategiyaları, reklam tövsiyələri və texnoloji yeniliklər haqqında peşəkar məqalələr.',
    keywords: 'marketinq blog, SMM məqalələr, sosial media tövsiyələri, rəqəmsal marketinq blogu, Instagram tövsiyələri, reklam strategiyaları',
    ogType: 'website',
  },
};

export { SITE_URL, SITE_NAME, DEFAULT_IMAGE };
