# Notion CRM qurulumu

Arzuman bütün kontakt və status məlumatlarını Notion database-ində saxlayır. Bu bələdçi Notion CRM-i necə hazırlamağı və Arzumana qoşmağı izah edir.

## 1. Notion hesabı yarat

1. https://www.notion.so → `Sign up` → Gmail ilə giriş et
2. Workspace adı: `Arzuman CRM` (istənilən ad olar)
3. Pulsuz plan kifayətdir

## 2. CRM database-i yarat

1. Notion-da sol menyudan `+ Add a page` → yeni səhifə yarat
2. Səhifə adı: **`Arzuman CRM`**
3. Səhifə boş açılanda ortada `+ Add new` və ya `/database` yaz → **`Database - Full page`** seç
4. Yaranan database-ə **bu xüsusiyyətləri (properties) əlavə et:**

| Xüsusiyyət adı | Tipi | Qeyd |
|---|---|---|
| `Name` | Title | (avtomatik yaranır) — şirkət adı |
| `Email` | Email | müştəri emaili |
| `Sahə` | Text | tikinti, təmizlik, restoran və s. |
| `Şəhər` | Text | Bakı, İstanbul və s. |
| `Sayt` | URL | müştərinin veb saytı |
| `Status` | Select | opsiyalar: `yeni`, `göndərildi`, `cavab_verdi`, `cavab_vermədi`, `potensial`, `bağlandı`, `ləğv_edildi_operator` |
| `Son mesaj tarixi` | Date | son mesajın göndərilmə tarixi |
| `Qeydlər` | Text | Arzumanın müşahidələri |

**Xüsusiyyət əlavə etmək üçün:** database-in başlığında `+` düyməsinə bas → adı və tipi seç.

## 3. Notion API açarı yarat

1. https://www.notion.so/my-integrations səhifəsinə get
2. `+ New integration` düyməsi
3. Ad: `Arzuman Agent`
4. Associated workspace: yuxarıda yaratdığın workspace-i seç
5. Type: `Internal`
6. `Save` → sonra `Configure integration capabilities`:
   - `Read content` ✅
   - `Update content` ✅
   - `Insert content` ✅
   - `No user information` (default olar)
7. `Show` düyməsi ilə **Internal Integration Secret**-i göstər, kopyala
8. `.env`-ə:
   ```
   NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxx
   ```

## 4. Database-i inteqrasiyaya "aç"

**Vacib:** Notion inteqrasiyaları default olaraq HEÇ NƏYƏ giriş etmir. Sən manual olaraq həmin database-i inteqrasiyaya bağlamalısan.

1. Notion-da `Arzuman CRM` database-inə get
2. Sağ yuxarı `···` (üç nöqtə) düyməsi
3. Aşağı doğru sürüş → `Connections` (və ya `Connect to`)
4. `Arzuman Agent` inteqrasiyasını axtar → seç → `Confirm`

Artıq inteqrasiyanın database-ə oxu/yaz icazəsi var.

## 5. Database ID-ni tap

1. Database səhifəsində sağ yuxarı `Share` düyməsi → `Copy link`
2. URL belə olacaq:
   ```
   https://www.notion.so/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx?v=yyyyyy
   ```
3. `?v=` hissəsindən **əvvəlki** 32 simvollu hissə — bu database ID-dir
4. `.env`-ə:
   ```
   NOTION_CRM_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

Alternativ: URL-də `-` işarələri ola bilər (`abc-def-...`). Onları saxlaya bilərsən, Notion MCP hər iki formatı qəbul edir.

## 6. Test

Terminal-da:

```bash
cd arzuman
npm install
npm run test:search
```

Test Vibe Prospecting-dən nəticə gətirməli və (əgər sonrakı test-lərdə yazma istənilsə) Notion database-ində yeni sətir əlavə etməlidir.

## Problem yaşasan

**"NotionAPI/unauthorized"** — inteqrasiya database-ə bağlanmayıb (Addım 4). Yenidən yoxla.

**"Object not found"** — Database ID səhvdir. URL-dən yenidən kopyala.

**"validation_error: property not found"** — Xüsusiyyət adları uyğun deyil. Addım 2-dəki adları eyni yazılışla yaratdığından əmin ol (böyük/kiçik hərf vacibdir: `Sahə` ≠ `sahe`).
