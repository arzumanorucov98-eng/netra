// Mərhələ 1 testi:
//
// Arzumana bir sadə axtarış tapşırığı verir və Vibe Prospecting MCP-dən
// canlı nəticə gəldiyini yoxlayır. Bu test:
//   1. .env-in düzgün doldurulduğunu təsdiqləyir
//   2. .mcp.json-dakı Vibe Prospecting serverinin qoşulduğunu göstərir
//   3. Agentin CLAUDE.md qaydalarına uyğun cavab verdiyini göstərir
//
// Faktiki mesaj göndərmə YOXDUR — yalnız axtarış.

import { runAgent } from '../src/agent/main.js';

const TASK = `
Test tapşırığı — Mərhələ 1:

Bakıda fəaliyyət göstərən tikinti (inşaat) şirkətlərindən 5-ini tap.
Hər biri üçün göstər:
  - Şirkət adı
  - Sahə (əgər dəqiqləşdirilibsə: tikinti materialları, dizayn-inşaat, ümumi tikinti və s.)
  - Email (varsa)
  - Veb sayt (varsa)

Nəticəni Attio-ya YAZMA (bu sadəcə test axtarışıdır).
Heç bir müştəriyə mesaj göndərmə.
Yalnız Vibe Prospecting MCP-dən çıxarılan xam nəticəni qısaca xülasə et.
`;

console.log('=== Arzuman Mərhələ 1 testi başlayır ===\n');
console.log('Tapşırıq:', TASK.trim(), '\n---\n');

runAgent(TASK).then(
  () => console.log('\n=== Test bitdi ==='),
  (err) => {
    console.error('\n!!! Test uğursuz oldu !!!');
    console.error(err);
    process.exit(1);
  },
);
