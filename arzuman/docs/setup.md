# Qurulum — Mərhələ 1

Bu bələdçi Arzumanın **Mərhələ 1** (təməl) qurulumunu izah edir. Sonrakı mərhələlər (Telegram, dashboard, səs) öz sənədlərində olacaq.

## Əvvəlcədən lazımi hesablar

- [ ] **Anthropic hesabı** — https://console.anthropic.com (API açarı)
- [ ] **Notion hesabı** — https://notion.so (pulsuz plan; Attio biznes domen email tələb etdiyi üçün Notion istifadə edirik)
- [ ] **Gmail hesabı** — ideal olaraq ayrıca biznes email-i
- [ ] **Vibe Prospecting hesabı** — bu söhbətdə qoşulub, API açarı lazım olacaq
- [ ] **Netlify hesabı** — https://netlify.com (Mərhələ 6-ya qədər lazım deyil)
- [ ] **Telegram hesabı** — bot yaratmaq üçün (Mərhələ 2-də lazımdır)

## Addımlar

### 1. Node.js quraşdır

Node.js 20 və ya sonrası lazımdır.

```bash
node --version   # v20+ olmalıdır
```

### 2. Bağımlılıqları yüklə

```bash
cd arzuman
npm install
```

### 3. .env faylını yarat

```bash
cp .env.example .env
```

Sonra `.env` faylını aç və hər sətrə öz açarlarını yaz:

- **ANTHROPIC_API_KEY** — Console-dan yarat: https://console.anthropic.com/settings/keys
- **NOTION_API_KEY** — https://www.notion.so/my-integrations (bax: [notion-crm.md](notion-crm.md))
- **NOTION_CRM_DATABASE_ID** — CRM database-inin URL-indən (bax: [notion-crm.md](notion-crm.md))
- **VIBE_PROSPECTING_API_KEY** — Vibe Prospecting hesabınızın settings səhifəsindən
- **GMAIL_\*** — OAuth üçün ilk dəfə əl ilə axın lazım olacaq (bax: [gmail-oauth.md](gmail-oauth.md), Mərhələ 1-in sonunda yazılacaq)
- **NETLIFY_AUTH_TOKEN** — https://app.netlify.com/user/applications#personal-access-tokens
- **OPERATOR_NAME** — sənin adın (Arzuman sənə bu adla müraciət edəcək)

`.env` faylı git-ə commit edilməyəcək (`.gitignore`-dadır).

### 4. Mərhələ 1 testini işə sal

```bash
npm run test:search
```

Bu test:

1. Claude Agent SDK-nı işə salır
2. `.mcp.json`-dakı Vibe Prospecting serverini qoşur
3. Arzumana "Bakıda 5 tikinti şirkəti tap" tapşırığı verir
4. Nəticəni terminala yazır

**Gözlənilən nəticə:** 5 şirkətin adı, sahəsi, email-i (varsa), sayt-ı (varsa) siyahılanır. Heç bir mesaj GÖNDƏRİLMİR, CRM-ə heç nə yazılmır — bu, sadəcə axtarışın işlədiyini yoxlamaq üçündür.

## Problem yaşasan

**"Cannot find module '@anthropic-ai/claude-agent-sdk'"** — `npm install` işlədilməyib.

**"ANTHROPIC_API_KEY not found"** — `.env` faylı düzgün yerdə deyil və ya doldurulmayıb.

**"MCP server 'vibe-prospecting' failed to start"** — `.env`-dəki `VIBE_PROSPECTING_API_KEY` doğru deyil, və ya paket adı fərqlidir (Vibe Prospecting-in rəsmi MCP paketinin adını yoxla və `.mcp.json`-da yenilə).

**"Agent hangs / no output"** — Şəbəkə problemi ola bilər. `curl https://api.anthropic.com` ilə çıxışı yoxla.

## Növbəti addım

Mərhələ 1 test uğurla işlədikdən sonra **Mərhələ 2 — Telegram körpüsü**nə keç. Bax: [`phases.md`](phases.md).
