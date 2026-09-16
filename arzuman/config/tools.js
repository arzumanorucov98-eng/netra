// Arzumanın istifadə edə biləcəyi MCP alətlərinin qeydi.
// Faktiki server konfiqurasiyası .mcp.json faylındadır — bu fayl agentə
// hər alətin NƏ ÜÇÜN olduğunu izah edən metadata verir.

export const MCP_TOOLS = {
  'vibe-prospecting': {
    purpose: 'Yeni müştəri tapmaq — 150M+ şirkət bazasında sahə/ölkə/ölçü üzrə axtarış, email/kontakt tapma.',
    typicalUse: [
      'Bakıda tikinti şirkətləri tap',
      'İstanbulda 10-50 nəfərlik restoranların email-lərini çıxar',
    ],
    writesTo: 'attio',
    requiresApproval: false,
  },

  attio: {
    purpose: 'CRM — bütün kontaktlar, statuslar, əməliyyat tarixçəsi burada saxlanılır.',
    typicalUse: [
      'Bu günün göndərilmiş mesajlarını siyahıla',
      "Cavab verməmiş müştərilərin statusunu 'takip_lazımdır'-a dəyiş",
    ],
    writesTo: null,
    requiresApproval: false,
  },

  gmail: {
    purpose: 'Satış email-lərini göndərmək və gələn cavabları oxumaq.',
    typicalUse: [
      'Draft mesajı X şirkətinin email-inə göndər',
      "Son 24 saatın 'inbox' mesajlarını oxu",
    ],
    writesTo: 'attio',
    // Kritik: göndərmə əməliyyatı MÜTLƏQ Telegram təsdiqindən keçməlidir
    requiresApproval: true,
    approvalGate: 'telegram',
  },

  netlify: {
    purpose: 'Sayt/bloq kodunu canlıya deploy etmək və mövcud sayt-ların statusunu yoxlamaq.',
    typicalUse: [
      'Bu qovluğu netramarketing-blog domain-inə deploy et',
      'Son deploy statusunu göstər',
    ],
    writesTo: 'attio',
    requiresApproval: true,
    approvalGate: 'telegram',
  },
};

export function listToolsForAgent() {
  return Object.entries(MCP_TOOLS).map(([name, meta]) => ({
    name,
    purpose: meta.purpose,
    requiresApproval: meta.requiresApproval,
  }));
}
