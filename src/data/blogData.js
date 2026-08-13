/**
 * Blog məqalələri üçün data faylı
 * Hər məqalənin slug, metaTitle, metaDescription və daxili linklər var
 */

export const blogCategories = [
  { name: 'Hamısı', slug: 'hamisi' },
  { name: 'SMM', slug: 'smm' },
  { name: 'Reklam', slug: 'reklam' },
  { name: 'Strategiya', slug: 'strategiya' },
  { name: 'Veb Sayt', slug: 'veb-sayt' },
];

export const defaultBlogPosts = [
  {
    id: '1',
    slug: 'smm-nedir-ve-ne-ucun-vacibdir',
    title: 'SMM nədir və nə üçün vacibdir?',
    metaTitle: 'SMM nədir? Sosial Media Marketinq Bələdçisi | Netra Marketing',
    metaDescription: 'SMM (Sosial Media Marketinq) nədir, niyə vacibdir və biznesinizə necə kömək edir? Peşəkar SMM xidmətinin üstünlükləri haqqında tam bələdçi.',
    summary: 'Sosial Media Marketinq (SMM) — biznesinizin sosial media platformalarında peşəkar şəkildə idarə olunması, kontent hazırlanması və reklam kampaniyalarının aparılmasıdır. Bu məqalədə SMM-in əsaslarını və niyə hər biznesin buna ehtiyacı olduğunu izah edirik.',
    content: `Sosial Media Marketinq (SMM) — müasir biznes dünyasının ən vacib vasitələrindən biridir. İnternetin və sosial media platformalarının sürətlə inkişafı ilə, bizneslər üçün onlayn mövcudluq artıq lüks deyil, zərurətdir.

## SMM nədir?

SMM, yəni Social Media Marketing, biznesinizin sosial media platformalarında (Instagram, Facebook, TikTok, LinkedIn və s.) peşəkar şəkildə idarə olunması, kontent hazırlanması və reklam kampaniyalarının aparılması deməkdir. Bu xidmət haqqında daha ətraflı məlumat üçün [SMM xidmətlərimiz](/xidmetlerimiz/sosial-media-idareciliyi) səhifəmizə baxa bilərsiniz.

## SMM niyə vacibdir?

1. **Müştəri bazanızı artırır**: Sosial media milyardlarla istifadəçiyə çatmağa imkan verir
2. **Brend tanınırlığı yaradır**: Düzgün strategiya ilə brendiniz daha çox insana çatır
3. **Müştəri münasibətlərini gücləndirir**: Birbaşa əlaqə imkanı yaradır
4. **Rəqiblərdən öndə olmağa kömək edir**: Aktiv sosial media mövcudluğu rəqabət üstünlüyü verir
5. **Satışları artırır**: [Hədəfli reklamlar](/xidmetlerimiz/instagram-ve-facebook-reklamlari) vasitəsilə potensial müştərilərə çatmaq mümkündür

## Peşəkar SMM xidmətinin üstünlükləri

Peşəkar SMM agentliyi ilə işləmək, vaxtınıza qənaət etməklə yanaşı, nəticəyönümlü strategiya ilə biznesinizi böyüdür. Netra Marketing olaraq 5 illik təcrübəmizlə yüzlərlə biznesi sosial mediada uğura aparmışıq. [Marketinq paketlərimizə](/paketler) baxaraq sizə ən uyğun planı seçə bilərsiniz.`,
    category: 'SMM',
    tags: ['SMM', 'Sosial Media', 'Marketinq'],
    date: '2026-07-20',
    readTime: '5 dəq',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    slug: 'instagram-reklami-nece-verilir-tam-beledci',
    title: 'Instagram reklamı necə verilir? — Tam Bələdçi',
    metaTitle: 'Instagram Reklamı Necə Verilir? Tam Bələdçi 2026 | Netra Marketing',
    metaDescription: 'Instagram reklamı vermək istəyirsiniz? Reklam növləri, hədəfləmə qaydaları, büdcə planlaması və praktiki tövsiyələr haqqında tam bələdçi.',
    summary: 'Instagram reklamı vermək istəyirsiniz, amma haradan başlayacağınızı bilmirsiniz? Bu tam bələdçidə Instagram reklamlarının növlərini, hədəfləmə qaydalarını və büdcə planlamasını öyrənəcəksiniz.',
    content: `Instagram dünyada ən çox istifadə olunan sosial media platformalarından biridir və reklam vermək üçün əla bir vasitədir. [Instagram və Facebook reklamları](/xidmetlerimiz/instagram-ve-facebook-reklamlari) xidmətimiz haqqında ətraflı məlumat ala bilərsiniz.

## Instagram Reklam Növləri

1. **Feed Reklamları**: İstifadəçilərin ana lentlərində görünən şəkil və ya video reklamlar
2. **Story Reklamları**: Story bölməsində tam ekran göstərilən reklamlar
3. **Reels Reklamları**: Reels bölməsində göstərilən qısa video reklamlar
4. **Carousel Reklamları**: Bir neçə şəkil və ya videonu bir reklamda birləşdirən format

## Hədəfləmə

Instagram reklamlarının ən güclü tərəfi hədəfləmə imkanlarıdır:
- **Yaş və cins**: Spesifik yaş qrupu və cinsə hədəfləmə
- **Coğrafiya**: Müəyyən şəhər və ya ölkəyə hədəfləmə
- **Maraqlar**: İstifadəçilərin maraqlarına görə hədəfləmə
- **Davranışlar**: Online alış-veriş edənlər, mobil istifadəçilər və s.

## Büdcə Planlaması

Instagram reklamları minimum gündəlik $1 büdcə ilə başlaya bilər. Tövsiyə olunan başlanğıc büdcəsi aylıq 100-300 AZN-dir.

Peşəkar reklam kampaniyası üçün Netra Marketing ilə əlaqə saxlayın — hədəf auditoriyanıza ən effektiv şəkildə çatmağınıza kömək edək. Əlaqədar olaraq [SMM nədir?](/blog/smm-nedir-ve-ne-ucun-vacibdir) məqaləmizi də oxuya bilərsiniz.`,
    category: 'Reklam',
    tags: ['Instagram', 'Reklam', 'Target'],
    date: '2026-07-15',
    readTime: '7 dəq',
    image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    slug: 'azerbaycanda-reqemsal-marketinq-trendler-ve-tovsiyeler',
    title: 'Azərbaycanda rəqəmsal marketinq: Trendlər və tövsiyələr',
    metaTitle: 'Azərbaycanda Rəqəmsal Marketinq Trendləri 2026 | Netra Marketing',
    metaDescription: 'Azərbaycanda rəqəmsal marketinqin son trendləri, ən effektiv strategiyalar və bizneslər üçün praktiki tövsiyələr. 2026-da nələrə diqqət etməlisiniz?',
    summary: 'Azərbaycanda rəqəmsal marketinqin son trendləri, ən effektiv strategiyalar və bizneslər üçün praktiki tövsiyələr. 2026-da nələrə diqqət etməlisiniz?',
    content: `Azərbaycanda rəqəmsal marketinq sektoru sürətlə inkişaf edir. Hər il daha çox biznes onlayn marketinqə keçid edir və rəqəmsal kanallardan istifadə edir.

## 2026 Trendləri

### 1. AI-Dəstəkli Kontent
Süni intellekt texnologiyaları kontent yaradılmasında inqilab edir. [AI video hazırlanması](/xidmetlerimiz/ai-suni-intellekt-video-hazirlanmasi) xidmətimiz ilə brendiniz üçün müasir videolar yarada bilərik.

### 2. Qısa Video Kontenti
TikTok və Instagram Reels formatında qısa videolar ən çox izlənilən kontent növünə çevrilib. [Reels və video montaj](/xidmetlerimiz/reels-ve-video-montaj) xidmətimiz ilə brendiniz üçün peşəkar videolar hazırlayırıq.

### 3. Şəxsiləşdirilmiş Marketinq
Hər müştəriyə fərdi yanaşma — personalizasiya 2026-da marketinqin əsas trendi olacaq.

### 4. İnflyuenser Əməkdaşlığı
Mikro-influenserlər ilə əməkdaşlıq kiçik və orta bizneslər üçün effektiv strategiya olaraq qalır.

## Bizneslər üçün Tövsiyələr

- [Sosial media hesablarınızı](/xidmetlerimiz/sosial-media-idareciliyi) peşəkar şəkildə idarə edin
- [Hədəfli reklam kampaniyalarına](/xidmetlerimiz/instagram-ve-facebook-reklamlari) investisiya qoyun
- [Video kontentə](/xidmetlerimiz/professional-video-cekilis) üstünlük verin
- AI alətlərindən faydalanın
- Müştəri rəylərini aktiv şəkildə toplayın

Netra Marketing olaraq bu trendləri yaxından izləyir və müştərilərimizə ən müasir strategiyaları tətbiq edirik.`,
    category: 'Strategiya',
    tags: ['Rəqəmsal Marketinq', 'Trendlər', 'Azərbaycan'],
    date: '2026-07-10',
    readTime: '6 dəq',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '4',
    slug: 'veb-sayt-niye-vacibdir-her-biznesin-bilmeli-oldugu-7-sebeb',
    title: 'Veb sayt niyə vacibdir? — Hər biznesin bilməli olduğu 7 səbəb',
    metaTitle: 'Veb Sayt Niyə Vacibdir? 7 Səbəb | Netra Marketing',
    metaDescription: 'Veb saytın biznesiniz üçün niyə vacib olduğunu və necə rəqəmsal uğura apardığını izah edirik. Hər biznesin bilməli olduğu 7 əsas səbəb.',
    summary: 'Sosial media var amma veb sayt yoxdur? Bu məqalədə veb saytın biznesiniz üçün niyə vacib olduğunu və necə rəqəmsal uğura apardığını izah edirik.',
    content: `Bir çox sahibkar düşünür ki, "Instagram səhifəm var, veb sayta ehtiyacım yoxdur." Lakin bu, böyük bir yanılmadır.

## Veb sayt niyə vacibdir?

### 1. Peşəkarlıq Göstəricisi
Veb sayt biznesinizin peşəkar olduğunu göstərir. Müştərilər veb saytı olan bizneslərə daha çox güvənir.

### 2. 7/24 Açıq Mağaza
Veb saytınız gündüz-gecə işləyir. Müştərilər istənilən vaxt məhsullarınızı görə və sifariş verə bilər.

### 3. Google-da Görünürlük
Veb sayt olmadan Google axtarışında görünmək demək olar ki mümkün deyil. SEO ilə veb saytınız axtarış nəticələrində ön sıralara çıxa bilər.

### 4. Müştəri Bazası Yaratmaq
Veb sayt vasitəsilə e-mail toplamaq, forma doldurmaq və müştəri bazası yaratmaq mümkündür.

### 5. Rəqiblərdən Fərqlənmək
Əgər rəqiblərinizin veb saytı yoxdursa, siz artıq öndəsiniz. Əgər varsa, sizin də olmalıdır.

### 6. Reklam Effektivliyini Artırmaq
[Instagram və Facebook reklamları](/xidmetlerimiz/instagram-ve-facebook-reklamlari) bir veb sayta yönləndirildikdə daha çox nəticə verir.

### 7. Brend Nağılınızı Danışmaq
Veb sayt brendiniz haqqında tam məlumat verməyə imkan yaradır — kim olduğunuz, nə etdiyiniz, niyə fərqli olduğunuz.

[Netra Marketing professional veb sayt hazırlanması](/xidmetlerimiz/veb-saytlarin-hazirlanmasi) xidməti təklif edir. Müasir, responsive və SEO-optimizə edilmiş veb saytınızı bizimlə qurun! [Hazırladığımız sayt nümunələrinə](/kataloq) baxın.`,
    category: 'Veb Sayt',
    tags: ['Veb Sayt', 'SEO', 'Biznes'],
    date: '2026-07-05',
    readTime: '5 dəq',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80'
  }
];
