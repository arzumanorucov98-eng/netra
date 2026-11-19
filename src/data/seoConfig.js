/**
 * Hər səhifə üçün SEO konfiqurasiyası — Axtarış niyyətinə uyğun optimallaşdırılmışdır
 * Hər title 50-60, hər description 140-160 simvol həddindədir
 */

const SITE_URL = 'https://netramarketing.az';
const SITE_NAME = 'Netra Marketing';
const DEFAULT_IMAGE = `${SITE_URL}/logo.jpg`;

export const seoConfig = {
  '/': {
    title: 'SMM Xidməti və Rəqəmsal Marketinq | Netra Marketing',
    description: 'Bakıda SMM xidməti və rəqəmsal marketinq. Sosial media idarəçiliyi, kontent, reklam, SMM strategiyası və veb sayt hazırlanması xidmətləri.',
    keywords: 'SMM agentliyi Bakı, sosial media idarəçiliyi, Instagram reklam Azərbaycan, rəqəmsal marketinq agentliyi, veb sayt hazırlanması Bakı, SMM xidməti, marketinq agentliyi Azərbaycan, Netra Marketing',
    ogType: 'website',
    robots: 'index, follow',
    schema: 'home',
  },
  '/haqqimizda': {
    title: 'Haqqımızda | 5 İllik Təcrübəli Marketinq Agentliyi | Netra',
    description: 'Netra Marketing — Azərbaycanda 5 illik təcrübəyə malik rəqəmsal marketinq agentliyidir. SMM, reklam, veb sayt və brend inkişafı ilə bizneslərinizi böyüdürük.',
    keywords: 'Netra Marketing haqqında, marketinq agentliyi Bakı, rəqəmsal marketinq komandası, SMM mütəxəssisləri Azərbaycan, peşəkar marketinq agentliyi',
    ogType: 'website',
    robots: 'index, follow',
    schema: 'about',
  },
  '/xidmetlerimiz': {
    title: 'Xidmətlərimiz | SMM, Reklam, Video, SEO, Veb Sayt | Netra',
    description: 'Sosial media idarəçiliyi, Instagram/Meta reklamları, Google Ads, TikTok marketinqi, video çəkiliş, SEO və veb sayt hazırlanması xidmətləri. Pulsuz konsultasiya alın.',
    keywords: 'SMM xidməti Bakı, Instagram reklam xidməti, Google Ads Azərbaycan, TikTok marketinq, video çəkiliş xidməti, veb sayt hazırlanması, SEO xidməti Bakı',
    ogType: 'website',
    robots: 'index, follow',
    schema: 'services',
  },
  '/paketler': {
    title: 'SMM Paketlər | 200 AZN-dən Başlayan Marketinq Paketləri | Netra',
    description: 'SMM Start Paketi 650 AZN/ay, Standart 850 AZN/ay, Premium 950 AZN/ay, VIP 1350 AZN/ay. Biznesiniz üçün aylıq marketinq paketini seçin. Pulsuz məsləhət.',
    keywords: 'SMM qiymət Azərbaycan, marketinq paketi qiymət, aylıq SMM paketi, sosial media idarəçilik qiyməti, Instagram idarəçilik paket, SMM şirkəti Bakı',
    ogType: 'website',
    robots: 'index, follow',
    schema: 'packages',
  },
  '/kataloq': {
    title: 'Veb Sayt Kataloqu | Professional Sayt Nümunələri | Netra',
    description: 'Netra Marketing tərəfindən hazırlanmış veb sayt nümunələri. Korporativ sayt, e-ticarət, landing page. Saytınızı sifariş etmək üçün kataloqa baxın.',
    keywords: 'veb sayt sifarişi Bakı, sayt hazırlanması nümunə, korporativ sayt dizayn, e-ticarət saytı Azərbaycan, landing page hazırlanması, veb dizayner Bakı',
    ogType: 'website',
    robots: 'index, follow',
    schema: 'catalog',
  },
  '/blog': {
    title: 'Blog | SMM, Reklam və Rəqəmsal Marketinq Məqalələri | Netra',
    description: 'SMM, Instagram reklamları, Google Ads, SEO və rəqəmsal marketinq haqqında peşəkar məqalələr. Azərbaycan biznesləri üçün praktiki marketinq tövsiyələri.',
    keywords: 'marketinq blog Azərbaycan, SMM məqalələr, sosial media tövsiyələri, rəqəmsal marketinq blogu, Instagram reklam bələdçi, SEO öyrən',
    ogType: 'website',
    robots: 'index, follow',
    schema: 'blog',
  },
};

export { SITE_URL, SITE_NAME, DEFAULT_IMAGE };
