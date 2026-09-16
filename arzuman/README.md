# Arzuman — Fərdi AI Marketinq Agenti

Arzuman, **Claude Agent SDK** üzərində qurulmuş bir orkestrasiya sistemidir. Sıfırdan yazılmış minlərlə sətr kod deyil — əlində hazır **MCP alətləri** olan, bu alətlərdən nə vaxt necə istifadə edəcəyinə öz məntiqi ilə qərar verən bir "baş agent"dir.

## Fəlsəfə

- **Yazı işləri** (satış mesajları, sayt kodu, bloq) — Claude-un təbii bacarığı ilə həll olunur, ayrı "yazı agenti" yoxdur.
- **Əməliyyat işləri** (axtarış, CRM, deploy, email, mobil təsdiq) — hazır MCP inteqrasiyaları ilə həll olunur.
- **Arzumanın öz kodu** — yalnız: səsli interfeys, dashboard, Telegram körpüsü, orkestrasiya məntiqi.

## Fiziki Arxitektura

```
[Əsas kompüter] ─── səs I/O + agent beyni ─── [Telegram bot (telefon)]
        │
        ├─ MCP: Vibe Prospecting (müştəri tapma)
        ├─ MCP: Notion (CRM database)
        ├─ MCP: Gmail (email)
        └─ MCP: Netlify (sayt deploy)
        │
        ▼
[2-ci kompüter] ─── brauzerdə açıq dashboard (CRM-i canlı göstərir)
```

## Mərhələlər

| # | Ad | Vəziyyət |
|---|----|--------|
| 1 | Təməl (struktur, MCP config, test) | 🟢 hazırlanır |
| 2 | Telegram körpüsü (bildiriş + təsdiq) | ⚪ |
| 3 | Dashboard (canlı yenilənən veb səhifə) | ⚪ |
| 4 | Səsli interfeys (wake-word, STT, TTS) | ⚪ |
| 5 | Uçdan-uca inteqrasiya testi | ⚪ |
| 6 | Sayt/bloq modulu (Netlify deploy) | ⚪ |

## Qurulum

Ətraflı üçün bax: [`docs/setup.md`](docs/setup.md)

Qısa yol:

```bash
cd arzuman
cp .env.example .env
# .env faylını öz açarlarınla doldur
npm install
npm run test:search   # Mərhələ 1 testi
```

## Fayl strukturu

```
arzuman/
├── .env.example             # Lazımi mühit dəyişənləri şablonu
├── .mcp.json                # MCP serverlərin konfiqurasiyası (Claude Agent SDK oxuyur)
├── CLAUDE.md                # Agentin sistem promptu / davranış qaydaları
├── package.json
├── config/
│   └── tools.js             # MCP alətlərinin siyahısı və məqsədləri
├── src/
│   ├── agent/               # Agent orkestrasiya məntiqi
│   ├── telegram/            # Mərhələ 2 — Telegram bot körpüsü
│   ├── dashboard/           # Mərhələ 3 — Dashboard veb səhifəsi
│   ├── voice/               # Mərhələ 4 — Səsli interfeys
│   └── tools/               # Xüsusi (MCP olmayan) alətlər
├── scripts/
│   └── test-search.js       # Mərhələ 1 testi: "Bakıda tikinti şirkətləri tap"
└── docs/
    ├── setup.md
    └── phases.md
```
