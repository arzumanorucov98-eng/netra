// Arzuman — baş agent giriş nöqtəsi.
//
// Bu fayl Claude Agent SDK-nı işə salır, .mcp.json-dakı serverləri qoşur,
// CLAUDE.md-dəki davranış qaydalarını sistem promptu kimi verir və
// interaktiv sessiya başladır.
//
// Mərhələ 1-də bu agent yalnız komandaların əl ilə ötürülməsi üçündür.
// Mərhələ 4-də səsli interfeys, Mərhələ 2-də Telegram körpüsü qoşulacaq.

import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { query } from '@anthropic-ai/claude-agent-sdk';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..', '..');

async function loadSystemPrompt() {
  const claudeMd = await readFile(resolve(projectRoot, 'CLAUDE.md'), 'utf8');
  const operator = process.env.OPERATOR_NAME || 'Operator';
  return claudeMd.replace(/\[istifadəçinin adı\]/g, operator);
}

export async function runAgent(userInput, { streamOutput = true } = {}) {
  const systemPrompt = await loadSystemPrompt();

  const result = query({
    prompt: userInput,
    options: {
      systemPrompt,
      // .mcp.json faylı avtomatik oxunur — cwd projectRoot olmalıdır
      cwd: projectRoot,
      // MCP alətlərinin hamısına icazə (təsdiq gate-ləri hook-larda tətbiq olunacaq)
      allowedTools: [
        'mcp__vibe-prospecting',
        'mcp__attio',
        'mcp__gmail',
        'mcp__netlify',
      ],
    },
  });

  let finalText = '';
  for await (const event of result) {
    if (event.type === 'assistant' && event.message?.content) {
      for (const block of event.message.content) {
        if (block.type === 'text') {
          if (streamOutput) process.stdout.write(block.text);
          finalText += block.text;
        }
      }
    }
  }
  if (streamOutput) process.stdout.write('\n');
  return finalText;
}

// CLI kimi çağırılıbsa
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const userInput = process.argv.slice(2).join(' ');
  if (!userInput) {
    console.error('İstifadə: npm run agent -- "sənin əmrin"');
    process.exit(1);
  }
  runAgent(userInput).catch((err) => {
    console.error('Agent xətası:', err);
    process.exit(1);
  });
}
