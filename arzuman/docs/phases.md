# İcra Mərhələləri

Arzuman altı mərhələdə qurulur. Hər mərhələ bitdikdən sonra operator təsdiqindən keçir.

## Mərhələ 1 — Təməl 🟢

- [x] Layihə qovluğu strukturu
- [x] `.mcp.json` — Attio, Gmail, Vibe Prospecting, Netlify konfiqurasiyaları
- [x] `CLAUDE.md` — agent sistem promptu / davranış qaydaları
- [x] `src/agent/main.js` — Claude Agent SDK ilə giriş nöqtəsi
- [x] `scripts/test-search.js` — "Bakıda tikinti şirkətləri tap" testi
- [ ] **Operator tərəfi:** hesabları yarat, `.env` doldur, `npm run test:search` işlət

**Bitmə şərti:** Test uğurla 5 şirkət göstərməlidir.

## Mərhələ 2 — Telegram körpüsü ⚪

- [ ] BotFather ilə bot yarat, tokeni `.env`-ə əlavə et
- [ ] `src/telegram/bot.js` — `sendApproval(text, options)` funksiyası
- [ ] `sendApproval` iki inline düymə göndərir: `✅ Göndər` / `❌ Ləğv et`
- [ ] Cavab gələnə qədər `Promise` gözləyir (timeout: 24 saat)
- [ ] Agentin sistem promptunda "Gmail göndərmədən əvvəl `sendApproval`-i çağır" hook-u
- [ ] Test: draft mesaj yarat → Telegram-da bildiriş gəlsin → `✅` kliklə → mesaj göndərilsin

**Bitmə şərti:** Uçdan-uca bir mesajın operator təsdiqi ilə göndərilməsi.

## Mərhələ 3 — Dashboard ⚪

- [ ] `src/dashboard/server.js` — Express + Server-Sent Events ilə kiçik veb server
- [ ] `src/dashboard/index.html` — canlı yenilənən vizual (bugün: X mesaj, Y cavab, Z potensial)
- [ ] Attio-dan hər 30 saniyədə bir sinxron
- [ ] 2-ci kompüterdə brauzerdə tam ekran açılış

**Bitmə şərti:** 2-ci kompüter göstərir, CRM-də dəyişiklik dashboard-a 30 saniyə içində düşür.

## Mərhələ 4 — Səsli interfeys ⚪

- [ ] Wake-word dinləyici (Picovoice Porcupine — "Arzuman" custom kəlmə)
- [ ] STT (OpenAI Whisper local və ya API)
- [ ] TTS (ElevenLabs və ya sistem TTS)
- [ ] `src/voice/loop.js` — dinlə → tut → mətnə çevir → agent → cavabı səslə oxu
- [ ] Əsas kompüterdə systemd / launchctl / Task Scheduler ilə avtomatik başlatma

**Bitmə şərti:** "Arzuman, bugün nə etdin" səsli sualına səsli cavab.

## Mərhələ 5 — Uçdan-uca inteqrasiya testi ⚪

Ssenari: **"Arzuman, 5 təmizlik şirkəti tap və sat"**

1. Səslə əmr → wake-word tutur → STT
2. Agent Vibe Prospecting-dən 5 şirkət tapır
3. Attio-da 5 yeni kontakt yaradılır (status: `yeni`)
4. Hər biri üçün fərdi email draft-ı hazırlanır
5. Hər biri üçün ayrıca Telegram təsdiqi
6. Operator hər birini təsdiqləyir → Gmail göndərir
7. CRM statusları `göndərildi`-yə keçir
8. Dashboard yenilənir
9. Agent səsli hesabat: "5 şirkət tapdım, 5-i də göndərildi, cavab gözlənilir"

**Bitmə şərti:** Bütün ssenari başdan-sona 5 dəqiqədən az müddətdə əl toxunmadan (təsdiqdən başqa) işləyir.

## Mərhələ 6 — Sayt/bloq modulu ⚪

- [ ] Sayt yaratma prompt-u (Claude yazır, `src/sites/<domain>/` altında)
- [ ] Netlify MCP ilə deploy
- [ ] Gündəlik bloq avtomatlaşdırması: cron → Claude bloq yazır → Netlify deploy
- [ ] Test: "Arzuman, kokosyağı satan mağaza üçün landing page hazırla" → 5 dəqiqədə canlı URL

**Bitmə şərti:** Bir tam sayt Claude-un yazdığı kodla canlıya çıxır.
