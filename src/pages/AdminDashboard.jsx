import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Globe, Settings, LogOut, Plus, Trash2, Edit, X, ShoppingCart, Search, Package, Users, FileText } from 'lucide-react';
import { 
  getWebsites, addWebsite, updateWebsite, deleteWebsite,
  getPackages, addPackage, updatePackage, deletePackage,
  getPartners, addPartner, updatePartner, deletePartner,
  getOrders, updateOrderStatus,
  getCompanyInfo, updateCompanyInfo,
  getSeo, updateSeo, logoutAdmin,
  getBlogPosts, addBlogPost, updateBlogPost, deleteBlogPost
} from '../firebase/api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('kataloq');
  const [websites, setWebsites] = useState([]);
  const [packages, setPackages] = useState([]);
  const [partners, setPartners] = useState([]);
  const [companyInfo, setCompanyInfo] = useState({ name: '', phone: '', instagram: '' });
  const [orders, setOrders] = useState([]);
  const [seo, setSeo] = useState({ title: '', description: '', analytics: '', pixel: '' });
  const [blogPosts, setBlogPosts] = useState([]);

  // Blog Modal states
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [blogModalMode, setBlogModalMode] = useState('add');
  const [currentBlog, setCurrentBlog] = useState({
    title: '', slug: '', metaTitle: '', metaDescription: '', summary: '', content: '', category: 'SMM', tags: '', image: '', readTime: '5 dəq'
  });
  
  // Website Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentWebsite, setCurrentWebsite] = useState({
    name: '', category: 'Korporativ saytlar', description: '', price: '', image: '', demoUrl: '#', order: 0
  });

  // Package Modal states
  const [isPkgModalOpen, setIsPkgModalOpen] = useState(false);
  const [pkgModalMode, setPkgModalMode] = useState('add');
  const [currentPackage, setCurrentPackage] = useState({
    name: '', price: '', description: '', features: '', targetAudience: '', highlight: false, order: 0
  });

  // Partner Modal states
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [partnerModalMode, setPartnerModalMode] = useState('add');
  const [currentPartner, setCurrentPartner] = useState({
    name: '', logo: '', link: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const [webData, pkgData, partnerData, infoData, ordData, seoData, blogData] = await Promise.all([
        getWebsites(),
        getPackages(),
        getPartners(),
        getCompanyInfo(),
        getOrders(),
        getSeo(),
        getBlogPosts()
      ]);

      // Sort websites by order then by name
      const sortedWebs = (webData || []).sort((a, b) => (a.order || 0) - (b.order || 0));
      setWebsites(sortedWebs);
      
      const sortedPkgs = (pkgData || []).sort((a, b) => (a.order || 0) - (b.order || 0));
      setPackages(sortedPkgs);

      setPartners(partnerData || []);
      
      if(infoData) setCompanyInfo(infoData);
      setOrders(ordData || []);
      if(seoData) setSeo(seoData);
      setBlogPosts(blogData || []);
    } catch (err) {
      console.error("Failed to fetch data", err);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      localStorage.removeItem('adminToken');
      navigate('/admin/login');
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  // --- WEBSITES HANDLERS ---
  const handleDeleteWebsite = async (id) => {
    if(window.confirm('Bu saytı silmək istədiyinizə əminsiniz?')) {
      await deleteWebsite(id);
      fetchData();
    }
  };

  const openAddModal = () => {
    setModalMode('add');
    setCurrentWebsite({
      name: '', category: 'Korporativ saytlar', description: '', price: '', image: '', demoUrl: '#', order: 0
    });
    setIsModalOpen(true);
  };

  const openEditModal = (site) => {
    setModalMode('edit');
    setCurrentWebsite({ ...site, order: site.order || 0 });
    setIsModalOpen(true);
  };

  const handleWebsiteSubmit = async (e) => {
    e.preventDefault();
    if(modalMode === 'add') {
      await addWebsite(currentWebsite);
    } else {
      await updateWebsite(currentWebsite.id, currentWebsite);
    }
    setIsModalOpen(false);
    fetchData();
  };

  // --- PACKAGES HANDLERS ---
  const handleDeletePackage = async (id) => {
    if(window.confirm('Bu paketi silmək istədiyinizə əminsiniz?')) {
      await deletePackage(id);
      fetchData();
    }
  };

  const openAddPkgModal = () => {
    setPkgModalMode('add');
    setCurrentPackage({
      name: '', price: '', description: '', features: '', targetAudience: '', highlight: false, order: 0
    });
    setIsPkgModalOpen(true);
  };

  const openEditPkgModal = (pkg) => {
    setPkgModalMode('edit');
    setCurrentPackage({
      ...pkg,
      features: Array.isArray(pkg.features) ? pkg.features.join('\n') : pkg.features,
      order: pkg.order || 0
    });
    setIsPkgModalOpen(true);
  };

  const handlePackageSubmit = async (e) => {
    e.preventDefault();
    // Convert features text area to array
    const featuresArray = typeof currentPackage.features === 'string' 
      ? currentPackage.features.split('\n').filter(f => f.trim() !== '') 
      : currentPackage.features;
    
    const pkgData = { ...currentPackage, features: featuresArray };
    
    if(pkgModalMode === 'add') {
      await addPackage(pkgData);
    } else {
      await updatePackage(currentPackage.id, pkgData);
    }
    setIsPkgModalOpen(false);
    fetchData();
  };

  // --- PARTNERS HANDLERS ---
  const handleDeletePartner = async (id) => {
    if(window.confirm('Bu şirkəti silmək istədiyinizə əminsiniz?')) {
      await deletePartner(id);
      fetchData();
    }
  };

  const openAddPartnerModal = () => {
    setPartnerModalMode('add');
    setCurrentPartner({ name: '', logo: '', link: '' });
    setIsPartnerModalOpen(true);
  };

  const openEditPartnerModal = (partner) => {
    setPartnerModalMode('edit');
    setCurrentPartner(partner);
    setIsPartnerModalOpen(true);
  };

  const handlePartnerSubmit = async (e) => {
    e.preventDefault();
    if(partnerModalMode === 'add') {
      await addPartner(currentPartner);
    } else {
      await updatePartner(currentPartner.id, currentPartner);
    }
    setIsPartnerModalOpen(false);
    fetchData();
  };

  // --- BLOG HANDLERS ---
  const handleDeleteBlog = async (id) => {
    if(window.confirm('Bu məqaləni silmək istədiyinizə əminsiniz?')) {
      await deleteBlogPost(id);
      fetchData();
    }
  };

  // Başlıqdan avtomatik slug yaradılması
  const generateSlug = (title) => {
    return title.toLowerCase()
      .replace(/ə/g, 'e').replace(/ü/g, 'u').replace(/ö/g, 'o')
      .replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ğ/g, 'g')
      .replace(/ı/g, 'i').replace(/İ/g, 'i')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const openAddBlogModal = () => {
    setBlogModalMode('add');
    setCurrentBlog({
      title: '', slug: '', metaTitle: '', metaDescription: '', summary: '', content: '', category: 'SMM', tags: '', image: '', readTime: '5 dəq'
    });
    setIsBlogModalOpen(true);
  };

  const openEditBlogModal = (post) => {
    setBlogModalMode('edit');
    setCurrentBlog({
      ...post,
      slug: post.slug || '',
      metaTitle: post.metaTitle || '',
      metaDescription: post.metaDescription || '',
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : (post.tags || '')
    });
    setIsBlogModalOpen(true);
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    const tagsArray = typeof currentBlog.tags === 'string'
      ? currentBlog.tags.split(',').map(t => t.trim()).filter(t => t !== '')
      : currentBlog.tags;

    // Əgər slug boşdursa, başlıqdan avtomatik yarat
    const slug = currentBlog.slug || generateSlug(currentBlog.title);
    // Əgər metaTitle boşdursa, başlıqdan yarat
    const metaTitle = currentBlog.metaTitle || `${currentBlog.title} | Netra Marketing`;
    // Əgər metaDescription boşdursa, summary istifadə et
    const metaDescription = currentBlog.metaDescription || currentBlog.summary;

    const blogData = { ...currentBlog, tags: tagsArray, slug, metaTitle, metaDescription };

    if(blogModalMode === 'add') {
      await addBlogPost(blogData);
    } else {
      await updateBlogPost(currentBlog.id, blogData);
    }
    setIsBlogModalOpen(false);
    fetchData();
  };

  const handleMigrateDefaultBlogs = async () => {
    if(!window.confirm('Default blog məqalələrini əlavə etmək istəyirsiniz?')) return;
    
    const defaultPosts = [
      {
        title: 'SMM nədir və nə üçün vacibdir?',
        summary: 'Sosial Media Marketinq (SMM) — biznesinizin sosial media platformalarında peşəkar şəkildə idarə olunması, kontent hazırlanması və reklam kampaniyalarının aparılmasıdır. Bu məqalədə SMM-in əsaslarını və niyə hər biznesin buna ehtiyacı olduğunu izah edirik.',
        content: `Sosial Media Marketinq (SMM) — müasir biznes dünyasının ən vacib vasitələrindən biridir. İnternetin və sosial media platformalarının sürətlə inkişafı ilə, bizneslər üçün onlayn mövcudluq artıq lüks deyil, zərurətdir.\n\n## SMM nədir?\n\nSMM, yəni Social Media Marketing, biznesinizin sosial media platformalarında (Instagram, Facebook, TikTok, LinkedIn və s.) peşəkar şəkildə idarə olunması, kontent hazırlanması və reklam kampaniyalarının aparılması deməkdir.\n\n## SMM niyə vacibdir?\n\n1. **Müştəri bazanızı artırır**: Sosial media milyardlarla istifadəçiyə çatmağa imkan verir\n2. **Brend tanınırlığı yaradır**: Düzgün strategiya ilə brendiniz daha çox insana çatır\n3. **Müştəri münasibətlərini gücləndirir**: Birbaşa əlaqə imkanı yaradır\n4. **Rəqiblərdən öndə olmağa kömək edir**: Aktiv sosial media mövcudluğu rəqabət üstünlüyü verir\n5. **Satışları artırır**: Hədəfli reklamlar vasitəsilə potensial müştərilərə çatmaq mümkündür\n\n## Peşəkar SMM xidmətinin üstünlükləri\n\nPeşəkar SMM agentliyi ilə işləmək, vaxtınıza qənaət etməklə yanaşı, nəticəyönümlü strategiya ilə biznesinizi böyüdür. Netra Marketing olaraq 5 illik təcrübəmizlə yüzlərlə biznesi sosial mediada uğura aparmışıq.`,
        category: 'SMM',
        tags: ['SMM', 'Sosial Media', 'Marketinq'],
        date: '2026-07-20',
        readTime: '5 dəq',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Instagram reklamı necə verilir? — Tam Bələdçi',
        summary: 'Instagram reklamı vermək istəyirsiniz, amma haradan başlayacağınızı bilmirsiniz? Bu tam bələdçidə Instagram reklamlarının növlərini, hədəfləmə qaydalarını və büdcə planlamasını öyrənəcəksiniz.',
        content: `Instagram dünyada ən çox istifadə olunan sosial media platformalarından biridir və reklam vermək üçün əla bir vasitədir.\n\n## Instagram Reklam Növləri\n\n1. **Feed Reklamları**: İstifadəçilərin ana lentlərində görünən şəkil və ya video reklamlar\n2. **Story Reklamları**: Story bölməsində tam ekran göstərilən reklamlar\n3. **Reels Reklamları**: Reels bölməsində göstərilən qısa video reklamlar\n4. **Carousel Reklamları**: Bir neçə şəkil və ya videonu bir reklamda birləşdirən format\n\n## Hədəfləmə\n\nInstagram reklamlarının ən güclü tərəfi hədəfləmə imkanlarıdır:\n- **Yaş və cins**: Spesifik yaş qrupu və cinsə hədəfləmə\n- **Coğrafiya**: Müəyyən şəhər və ya ölkəyə hədəfləmə\n- **Maraqlar**: İstifadəçilərin maraqlarına görə hədəfləmə\n- **Davranışlar**: Online alış-veriş edənlər, mobil istifadəçilər və s.\n\n## Büdcə Planlaması\n\nInstagram reklamları minimum gündəlik $1 büdcə ilə başlaya bilər. Tövsiyə olunan başlanğıc büdcəsi aylıq 100-300 AZN-dir.\n\nPeşəkar reklam kampaniyası üçün Netra Marketing ilə əlaqə saxlayın — hədəf auditoriyanıza ən effektiv şəkildə çatmağınıza kömək edək.`,
        category: 'Reklam',
        tags: ['Instagram', 'Reklam', 'Target'],
        date: '2026-07-15',
        readTime: '7 dəq',
        image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Azərbaycanda rəqəmsal marketinq: Trendlər və tövsiyələr',
        summary: 'Azərbaycanda rəqəmsal marketinqin son trendləri, ən effektiv strategiyalar və bizneslər üçün praktiki tövsiyələr. 2026-da nələrə diqqət etməlisiniz?',
        content: `Azərbaycanda rəqəmsal marketinq sektoru sürətlə inkişaf edir. Hər il daha çox biznes onlayn marketinqə keçid edir və rəqəmsal kanallardan istifadə edir.\n\n## 2026 Trendləri\n\n### 1. AI-Dəstəkli Kontent\nSüni intellekt texnologiyaları kontent yaradılmasında inqilab edir. AI ilə hazırlanan videolar, şəkillər və mətnlər bizneslərin kontent strategiyasını dəyişdirir.\n\n### 2. Qısa Video Kontenti\nTikTok və Instagram Reels formatında qısa videolar ən çox izlənilən kontent növünə çevrilib. Bizneslər bu formata uyğunlaşmalıdır.\n\n### 3. Şəxsiləşdirilmiş Marketinq\nHər müştəriyə fərdi yanaşma — personalizasiya 2026-da marketinqin əsas trendi olacaq.\n\n### 4. İnflyuenser Əməkdaşlığı\nMikro-influenserlər ilə əməkdaşlıq kiçik və orta bizneslər üçün effektiv strategiya olaraq qalır.\n\n## Bizneslər üçün Tövsiyələr\n\n- Sosial media hesablarınızı peşəkar şəkildə idarə edin\n- Hədəfli reklam kampaniyalarına investisiya qoyun\n- Video kontentə üstünlük verin\n- AI alətlərindən faydalanın\n- Müştəri rəylərini aktiv şəkildə toplayın\n\nNetra Marketing olaraq bu trendləri yaxından izləyir və müştərilərimizə ən müasir strategiyaları tətbiq edirik.`,
        category: 'Strategiya',
        tags: ['Rəqəmsal Marketinq', 'Trendlər', 'Azərbaycan'],
        date: '2026-07-10',
        readTime: '6 dəq',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Veb sayt niyə vacibdir? — Hər biznesin bilməli olduğu 7 səbəb',
        summary: 'Sosial media var amma veb sayt yoxdur? Bu məqalədə veb saytın biznesiniz üçün niyə vacib olduğunu və necə rəqəmsal uğura apardığını izah edirik.',
        content: `Bir çox sahibkar düşünür ki, "Instagram səhifəm var, veb sayta ehtiyacım yoxdur." Lakin bu, böyük bir yanılmadır.\n\n## Veb sayt niyə vacibdir?\n\n### 1. Peşəkarlıq Göstəricisi\nVeb sayt biznesinizin peşəkar olduğunu göstərir. Müştərilər veb saytı olan bizneslərə daha çox güvənir.\n\n### 2. 7/24 Açıq Mağaza\nVeb saytınız gündüz-gecə işləyir. Müştərilər istənilən vaxt məhsullarınızı görə və sifariş verə bilər.\n\n### 3. Google-da Görünürlük\nVeb sayt olmadan Google axtarışında görünmək demək olar ki mümkün deyil. SEO ilə veb saytınız axtarış nəticələrində ön sıralara çıxa bilər.\n\n### 4. Müştəri Bazası Yaratmaq\nVeb sayt vasitəsilə e-mail toplamaq, forma doldurmaq və müştəri bazası yaratmaq mümkündür.\n\n### 5. Rəqiblərdən Fərqlənmək\nƏgər rəqiblərinizin veb saytı yoxdursa, siz artıq öndəsiniz. Əgər varsa, sizin də olmalıdır.\n\n### 6. Reklam Effektivliyini Artırmaq\nInstagram və Facebook reklamları bir veb sayta yönləndirildikdə daha çox nəticə verir.\n\n### 7. Brend Nağılınızı Danışmaq\nVeb sayt brendiniz haqqında tam məlumat verməyə imkan yaradır — kim olduğunuz, nə etdiyiniz, niyə fərqli olduğunuz.\n\nNetra Marketing professional veb sayt hazırlanması xidməti təklif edir. Müasir, responsive və SEO-optimizə edilmiş veb saytınızı bizimlə qurun!`,
        category: 'Veb Sayt',
        tags: ['Veb Sayt', 'SEO', 'Biznes'],
        date: '2026-07-05',
        readTime: '5 dəq',
        image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80'
      }
    ];

    try {
      for (const post of defaultPosts) {
        await addBlogPost(post);
      }
      alert('Default məqalələr uğurla əlavə edildi!');
      fetchData();
    } catch(err) {
      alert('Xəta baş verdi: ' + err.message);
    }
  };

  const handleCompanyInfoSubmit = async () => {
    try {
      await updateCompanyInfo(companyInfo);
      alert("Məlumatlar uğurla yeniləndi!");
      fetchData();
    } catch (err) {
      alert("Xəta baş verdi.");
    }
  };

  const handleOrderStatusChange = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      fetchData();
    } catch (err) {
      alert("Xəta baş verdi.");
    }
  };

  const handleSeoSubmit = async () => {
    try {
      await updateSeo(seo);
      alert("SEO məlumatları uğurla yeniləndi!");
    } catch (err) {
      alert("Xəta baş verdi.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-primary text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab('kataloq')} className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${activeTab === 'kataloq' ? 'bg-white/20' : 'hover:bg-white/10'}`}>
            <Globe size={20} /><span>Veb Saytlar</span>
          </button>
          <button onClick={() => setActiveTab('packages')} className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${activeTab === 'packages' ? 'bg-white/20' : 'hover:bg-white/10'}`}>
            <Package size={20} /><span>Paketlər</span>
          </button>
          <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${activeTab === 'orders' ? 'bg-white/20' : 'hover:bg-white/10'}`}>
            <ShoppingCart size={20} /><span>Sifarişlər</span>
          </button>
          <button onClick={() => setActiveTab('partners')} className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${activeTab === 'partners' ? 'bg-white/20' : 'hover:bg-white/10'}`}>
            <Users size={20} /><span>Şirkətlər (Partnyorlar)</span>
          </button>
          <button onClick={() => setActiveTab('blog')} className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${activeTab === 'blog' ? 'bg-white/20' : 'hover:bg-white/10'}`}>
            <FileText size={20} /><span>Blog Məqalələri</span>
          </button>
          <button onClick={() => setActiveTab('seo')} className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${activeTab === 'seo' ? 'bg-white/20' : 'hover:bg-white/10'}`}>
            <Search size={20} /><span>SEO Tənzimləmələri</span>
          </button>
          <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-white/20' : 'hover:bg-white/10'}`}>
            <Settings size={20} /><span>Şirkət Məlumatları</span>
          </button>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-500/80 transition-colors text-red-100">
            <LogOut size={20} /><span>Çıxış</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8 relative">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 min-h-[80vh] p-8">
          
          {activeTab === 'kataloq' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800">Kataloq İdarəetməsi</h3>
                <button onClick={openAddModal} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-secondary transition-colors">
                  <Plus size={20} /> Yeni Sayt Əlavə Et
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="p-4 font-semibold text-gray-600">Sıra</th>
                      <th className="p-4 font-semibold text-gray-600">Şəkil</th>
                      <th className="p-4 font-semibold text-gray-600">Ad</th>
                      <th className="p-4 font-semibold text-gray-600">Kateqoriya</th>
                      <th className="p-4 font-semibold text-gray-600">Qiymət</th>
                      <th className="p-4 font-semibold text-gray-600 text-right">Əməliyyatlar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {websites.map(site => (
                      <tr key={site.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-4 font-bold text-gray-500">{site.order || 0}</td>
                        <td className="p-4"><img src={site.image} alt={site.name} className="w-16 h-12 object-cover rounded" /></td>
                        <td className="p-4 font-medium text-gray-800">{site.name}</td>
                        <td className="p-4 text-gray-500">{site.category}</td>
                        <td className="p-4 font-bold text-primary">{site.price} AZN</td>
                        <td className="p-4 text-right">
                          <button onClick={() => openEditModal(site)} className="text-blue-500 hover:text-blue-700 p-2"><Edit size={18} /></button>
                          <button onClick={() => handleDeleteWebsite(site.id)} className="text-red-500 hover:text-red-700 p-2"><Trash2 size={18} /></button>
                        </td>
                      </tr>
                    ))}
                    {websites.length === 0 && (
                      <tr><td colSpan="6" className="p-8 text-center text-gray-500">Heç bir sayt tapılmadı.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'packages' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800">Paketlər İdarəetməsi</h3>
                <button onClick={openAddPkgModal} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-secondary transition-colors">
                  <Plus size={20} /> Yeni Paket Əlavə Et
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="p-4 font-semibold text-gray-600">Sıra</th>
                      <th className="p-4 font-semibold text-gray-600">Ad</th>
                      <th className="p-4 font-semibold text-gray-600">Qiymət</th>
                      <th className="p-4 font-semibold text-gray-600">Önə Çıxan (Highlight)</th>
                      <th className="p-4 font-semibold text-gray-600 text-right">Əməliyyatlar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {packages.map(pkg => (
                      <tr key={pkg.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-4 font-bold text-gray-500">{pkg.order || 0}</td>
                        <td className="p-4 font-medium text-gray-800">{pkg.name}</td>
                        <td className="p-4 font-bold text-primary">{pkg.price}</td>
                        <td className="p-4">{pkg.highlight ? 'Bəli' : 'Xeyr'}</td>
                        <td className="p-4 text-right">
                          <button onClick={() => openEditPkgModal(pkg)} className="text-blue-500 hover:text-blue-700 p-2"><Edit size={18} /></button>
                          <button onClick={() => handleDeletePackage(pkg.id)} className="text-red-500 hover:text-red-700 p-2"><Trash2 size={18} /></button>
                        </td>
                      </tr>
                    ))}
                    {packages.length === 0 && (
                      <tr><td colSpan="5" className="p-8 text-center text-gray-500">Heç bir paket tapılmadı.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'partners' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800">Əməkdaşlıq Edilən Şirkətlər</h3>
                <button onClick={openAddPartnerModal} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-secondary transition-colors">
                  <Plus size={20} /> Yeni Şirkət Əlavə Et
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="p-4 font-semibold text-gray-600">Loqo</th>
                      <th className="p-4 font-semibold text-gray-600">Şirkət Adı</th>
                      <th className="p-4 font-semibold text-gray-600">Vebsayt (Link)</th>
                      <th className="p-4 font-semibold text-gray-600 text-right">Əməliyyatlar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {partners.map(partner => (
                      <tr key={partner.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-4"><img src={partner.logo} alt={partner.name} className="h-12 w-auto object-contain rounded" /></td>
                        <td className="p-4 font-medium text-gray-800">{partner.name}</td>
                        <td className="p-4 text-blue-500 hover:underline">
                          {partner.link ? <a href={partner.link} target="_blank" rel="noopener noreferrer">{partner.link}</a> : '-'}
                        </td>
                        <td className="p-4 text-right">
                          <button onClick={() => openEditPartnerModal(partner)} className="text-blue-500 hover:text-blue-700 p-2"><Edit size={18} /></button>
                          <button onClick={() => handleDeletePartner(partner.id)} className="text-red-500 hover:text-red-700 p-2"><Trash2 size={18} /></button>
                        </td>
                      </tr>
                    ))}
                    {partners.length === 0 && (
                      <tr><td colSpan="4" className="p-8 text-center text-gray-500">Heç bir şirkət tapılmadı.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-8">Sifarişlər</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="p-4 font-semibold text-gray-600">Tarix</th>
                      <th className="p-4 font-semibold text-gray-600">Müştəri</th>
                      <th className="p-4 font-semibold text-gray-600">Sifariş Detalları</th>
                      <th className="p-4 font-semibold text-gray-600">Ümumi Qiymət</th>
                      <th className="p-4 font-semibold text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-4">
                          <div className="text-xs text-gray-500">{new Date(order.date).toLocaleString()}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-medium text-gray-800">{order.customerName}</div>
                          <div className="text-sm text-gray-500">{order.customerPhone}</div>
                        </td>
                        <td className="p-4 text-sm text-gray-600">
                          {order.items?.map((item, i) => (
                            <div key={i}>{item.name}</div>
                          ))}
                        </td>
                        <td className="p-4 font-bold text-primary">{order.totalPrice} AZN</td>
                        <td className="p-4">
                          <select 
                            value={order.status}
                            onChange={(e) => handleOrderStatusChange(order.id, e.target.value)}
                            className={`p-2 rounded-lg border text-sm font-medium
                              ${order.status === 'Yeni' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                                order.status === 'İcrada' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                                order.status === 'Tamamlandı' ? 'bg-green-50 text-green-700 border-green-200' : 
                                'bg-red-50 text-red-700 border-red-200'}
                            `}
                          >
                            <option value="Yeni">Yeni</option>
                            <option value="İcrada">İcrada</option>
                            <option value="Tamamlandı">Tamamlandı</option>
                            <option value="Ləğv edildi">Ləğv edildi</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                    {orders.length === 0 && (
                      <tr><td colSpan="5" className="p-8 text-center text-gray-500">Heç bir sifariş yoxdur.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-8">SEO Tənzimləmələri</h3>
              <div className="max-w-2xl space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
                  <input type="text" value={seo.title || ''} onChange={e => setSeo({...seo, title: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                  <textarea rows="4" value={seo.description || ''} onChange={e => setSeo({...seo, description: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Google Analytics İD (G-XXXXXXX)</label>
                  <input type="text" value={seo.analytics || ''} onChange={e => setSeo({...seo, analytics: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Facebook Pixel İD</label>
                  <input type="text" value={seo.pixel || ''} onChange={e => setSeo({...seo, pixel: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
                </div>
                <div className="pt-4">
                  <button className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-secondary transition-colors" onClick={handleSeoSubmit}>
                    Yadda Saxla
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-8">Şirkət Məlumatları</h3>
              <div className="max-w-2xl space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Şirkət Adı</label>
                  <input type="text" value={companyInfo.name || ''} onChange={e => setCompanyInfo({...companyInfo, name: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefon / WhatsApp</label>
                  <input type="text" value={companyInfo.phone || ''} onChange={e => setCompanyInfo({...companyInfo, phone: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instagram Linki</label>
                  <input type="text" value={companyInfo.instagram || ''} onChange={e => setCompanyInfo({...companyInfo, instagram: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
                </div>
                <div className="pt-4">
                  <button className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-secondary transition-colors" onClick={handleCompanyInfoSubmit}>
                    Yadda Saxla
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'blog' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                  <h3 className="text-2xl font-bold text-gray-800">Blog Məqalələri</h3>
                  {blogPosts.length === 0 && (
                    <button onClick={handleMigrateDefaultBlogs} className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded text-sm font-medium hover:bg-yellow-200 transition-colors">
                      Hazır Məqalələri Yüklə
                    </button>
                  )}
                </div>
                <button onClick={openAddBlogModal} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-secondary transition-colors">
                  <Plus size={20} /> Yeni Məqalə Əlavə Et
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="p-4 font-semibold text-gray-600">Şəkil</th>
                      <th className="p-4 font-semibold text-gray-600">Başlıq</th>
                      <th className="p-4 font-semibold text-gray-600">SEO URL (Slug)</th>
                      <th className="p-4 font-semibold text-gray-600">Kateqoriya</th>
                      <th className="p-4 font-semibold text-gray-600">Tarix</th>
                      <th className="p-4 font-semibold text-gray-600 text-right">Əməliyyatlar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogPosts.map(post => (
                      <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-4">
                          {post.image ? <img src={post.image} alt={post.title} className="w-20 h-14 object-cover rounded" /> : <span className="text-gray-400">—</span>}
                        </td>
                        <td className="p-4">
                          <div className="font-medium text-gray-800">{post.title}</div>
                          <div className="text-xs text-gray-500 mt-1 line-clamp-1">{post.summary}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-xs text-green-700 bg-green-50 px-2 py-1 rounded font-mono">/blog/{post.slug || '—'}</div>
                        </td>
                        <td className="p-4">
                          <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">{post.category}</span>
                        </td>
                        <td className="p-4 text-sm text-gray-500">{post.date}</td>
                        <td className="p-4 text-right">
                          <button onClick={() => openEditBlogModal(post)} className="text-blue-500 hover:text-blue-700 p-2"><Edit size={18} /></button>
                          <button onClick={() => handleDeleteBlog(post.id)} className="text-red-500 hover:text-red-700 p-2"><Trash2 size={18} /></button>
                        </td>
                      </tr>
                    ))}
                    {blogPosts.length === 0 && (
                      <tr><td colSpan="7" className="p-8 text-center text-gray-500">Heç bir blog məqaləsi tapılmadı. Yeni məqalə əlavə edin.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Website Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">{modalMode === 'add' ? 'Yeni Sayt Əlavə Et' : 'Saytı Redaktə Et'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            <form onSubmit={handleWebsiteSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Saytın Adı</label>
                <input type="text" required value={currentWebsite.name} onChange={e => setCurrentWebsite({...currentWebsite, name: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sıra Nömrəsi</label>
                  <input type="number" required value={currentWebsite.order} onChange={e => setCurrentWebsite({...currentWebsite, order: Number(e.target.value)})} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kateqoriya</label>
                  <select value={currentWebsite.category} onChange={e => setCurrentWebsite({...currentWebsite, category: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
                    <option value="Korporativ saytlar">Korporativ saytlar</option>
                    <option value="Tikinti şirkəti saytları">Tikinti şirkəti saytları</option>
                    <option value="Restoran saytları">Restoran saytları</option>
                    <option value="E-ticarət saytları">E-ticarət saytları</option>
                    <option value="Təmizlik şirkəti saytları">Təmizlik şirkəti saytları</option>
                    <option value="Daşınmaz əmlak saytları">Daşınmaz əmlak saytları</option>
                    <option value="Klinikalar üçün saytlar">Klinikalar üçün saytlar</option>
                    <option value="Təhsil müəssisələri üçün saytlar">Təhsil müəssisələri üçün saytlar</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Qiymət (AZN)</label>
                  <input type="number" required value={currentWebsite.price} onChange={e => setCurrentWebsite({...currentWebsite, price: Number(e.target.value)})} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Təsvir</label>
                <textarea required rows="3" value={currentWebsite.description} onChange={e => setCurrentWebsite({...currentWebsite, description: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Şəkil URL</label>
                <input type="text" required value={currentWebsite.image} onChange={e => setCurrentWebsite({...currentWebsite, image: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Demo Link</label>
                <input type="text" required value={currentWebsite.demoUrl} onChange={e => setCurrentWebsite({...currentWebsite, demoUrl: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
              </div>
              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">Ləğv Et</button>
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors">{modalMode === 'add' ? 'Əlavə Et' : 'Yadda Saxla'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Package Add/Edit Modal */}
      {isPkgModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">{pkgModalMode === 'add' ? 'Yeni Paket Əlavə Et' : 'Paketi Redaktə Et'}</h3>
              <button onClick={() => setIsPkgModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            <form onSubmit={handlePackageSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sıra Nömrəsi</label>
                  <input type="number" required value={currentPackage.order || 0} onChange={e => setCurrentPackage({...currentPackage, order: Number(e.target.value)})} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Paketin Adı</label>
                  <input type="text" required value={currentPackage.name} onChange={e => setCurrentPackage({...currentPackage, name: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Qiymət</label>
                  <input type="text" required value={currentPackage.price} onChange={e => setCurrentPackage({...currentPackage, price: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Qısa Təsvir</label>
                <textarea required rows="2" value={currentPackage.description} onChange={e => setCurrentPackage({...currentPackage, description: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Xüsusiyyətlər (Hər sətrə bir xüsusiyyət yazın)</label>
                <textarea required rows="5" value={currentPackage.features} onChange={e => setCurrentPackage({...currentPackage, features: e.target.value})} placeholder="Xüsusiyyət 1&#10;Xüsusiyyət 2" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hədəf Kütləsi (Əlavə Məlumat - Vacib deyil)</label>
                <input type="text" value={currentPackage.targetAudience || ''} onChange={e => setCurrentPackage({...currentPackage, targetAudience: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <input type="checkbox" id="highlight" checked={currentPackage.highlight || false} onChange={e => setCurrentPackage({...currentPackage, highlight: e.target.checked})} className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary" />
                <label htmlFor="highlight" className="text-sm font-medium text-gray-700">Bu paketi fərqləndir (Highlight)</label>
              </div>
              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button type="button" onClick={() => setIsPkgModalOpen(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">Ləğv Et</button>
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors">{pkgModalMode === 'add' ? 'Əlavə Et' : 'Yadda Saxla'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Partner Add/Edit Modal */}
      {isPartnerModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">{partnerModalMode === 'add' ? 'Yeni Şirkət Əlavə Et' : 'Şirkəti Redaktə Et'}</h3>
              <button onClick={() => setIsPartnerModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            <form onSubmit={handlePartnerSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Şirkətin Adı</label>
                <input type="text" required value={currentPartner.name} onChange={e => setCurrentPartner({...currentPartner, name: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loqo URL-i (Şəkil Linki)</label>
                <input type="text" required value={currentPartner.logo} onChange={e => setCurrentPartner({...currentPartner, logo: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vebsayt / Link (İstəyə bağlı)</label>
                <input type="text" value={currentPartner.link || ''} onChange={e => setCurrentPartner({...currentPartner, link: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
              </div>
              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button type="button" onClick={() => setIsPartnerModalOpen(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">Ləğv Et</button>
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors">{partnerModalMode === 'add' ? 'Əlavə Et' : 'Yadda Saxla'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Blog Add/Edit Modal */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">{blogModalMode === 'add' ? 'Yeni Məqalə Əlavə Et' : 'Məqaləni Redaktə Et'}</h3>
              <button onClick={() => setIsBlogModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            <form onSubmit={handleBlogSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Məqalənin Başlığı (H1)</label>
                <input type="text" required value={currentBlog.title} onChange={e => {
                  const newTitle = e.target.value;
                  const updates = { title: newTitle };
                  // Əgər slug əl ilə dəyişdirilməyibsə, avtomatik yarat
                  if (!currentBlog.slug || currentBlog.slug === generateSlug(currentBlog.title)) {
                    updates.slug = generateSlug(newTitle);
                  }
                  if (!currentBlog.metaTitle || currentBlog.metaTitle === `${currentBlog.title} | Netra Marketing`) {
                    updates.metaTitle = `${newTitle} | Netra Marketing`;
                  }
                  setCurrentBlog({...currentBlog, ...updates});
                }} placeholder="Misal: SMM nədir və nə üçün vacibdir?" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
              </div>

              {/* SEO Sahələri */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-4">
                <h4 className="text-sm font-bold text-green-800 flex items-center gap-2">🔍 SEO Tənzimləmələri</h4>
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-1">SEO URL (Slug)</label>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-l-lg border border-r-0 border-gray-300">/blog/</span>
                    <input type="text" value={currentBlog.slug} onChange={e => setCurrentBlog({...currentBlog, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/(^-|-$)/g, '')})} placeholder="meqale-adi" className="flex-1 p-2 border border-gray-300 rounded-r-lg focus:ring-primary focus:border-primary font-mono text-sm" />
                  </div>
                  <p className="text-xs text-green-600 mt-1">Avtomatik yaradılır, amma dəyişə bilərsiniz</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-1">Meta Title (Axtarışda görünən başlıq)</label>
                  <input type="text" value={currentBlog.metaTitle} onChange={e => setCurrentBlog({...currentBlog, metaTitle: e.target.value})} placeholder="Misal: SMM nədir? Tam Bələdçi | Netra Marketing" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
                  <p className="text-xs text-green-600 mt-1">{(currentBlog.metaTitle || '').length}/60 simvol (tövsiyə: 50-60)</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-1">Meta Description (Axtarışda görünən təsvir)</label>
                  <textarea rows="2" value={currentBlog.metaDescription} onChange={e => setCurrentBlog({...currentBlog, metaDescription: e.target.value})} placeholder="Google axtarış nəticəsində görünəcək qısa təsvir" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"></textarea>
                  <p className="text-xs text-green-600 mt-1">{(currentBlog.metaDescription || '').length}/160 simvol (tövsiyə: 120-160)</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Qısa Xülasə</label>
                <textarea required rows="2" value={currentBlog.summary} onChange={e => setCurrentBlog({...currentBlog, summary: e.target.value})} placeholder="Məqalənin qısa təsviri" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Məqalənin Mətni</label>
                <p className="text-xs text-gray-400 mb-1">Başlıqlar üçün ## istifadə edin. Daxili linklər üçün: [Link Mətni](/xidmetlerimiz/slug)</p>
                <textarea required rows="12" value={currentBlog.content} onChange={e => setCurrentBlog({...currentBlog, content: e.target.value})} placeholder="Məqalənin tam mətni..." className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary font-mono text-sm"></textarea>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kateqoriya</label>
                  <select value={currentBlog.category} onChange={e => setCurrentBlog({...currentBlog, category: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
                    <option value="SMM">SMM</option>
                    <option value="Reklam">Reklam</option>
                    <option value="Strategiya">Strategiya</option>
                    <option value="Veb Sayt">Veb Sayt</option>
                    <option value="Brend">Brend</option>
                    <option value="AI">Süni İntellekt</option>
                    <option value="Digər">Digər</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Oxuma Müddəti</label>
                  <input type="text" value={currentBlog.readTime} onChange={e => setCurrentBlog({...currentBlog, readTime: e.target.value})} placeholder="5 dəq" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Şəkil URL</label>
                  <input type="text" value={currentBlog.image} onChange={e => setCurrentBlog({...currentBlog, image: e.target.value})} placeholder="https://..." className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Etiketlər (vergüllə ayırın)</label>
                <input type="text" value={currentBlog.tags} onChange={e => setCurrentBlog({...currentBlog, tags: e.target.value})} placeholder="SMM, Instagram, Marketinq" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
              </div>
              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button type="button" onClick={() => setIsBlogModalOpen(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">Ləğv Et</button>
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors">{blogModalMode === 'add' ? 'Dərc Et' : 'Yadda Saxla'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
