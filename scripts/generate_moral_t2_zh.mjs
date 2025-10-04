import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { moralT2 as base } from '../src/questions/moral_t2.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Domain-focused BM -> ZH translator (pattern + dictionary)
function translate(text) {
  if (!text || typeof text !== 'string') return text;
  const dict = new Map([
    // Common stems
    ['Mengapakah', '为什么'],
    ['Apakah', '什么/哪一项'],
    ['Manakah', '以下哪一项'],
    ['Bagaimanakah', '我们应如何/怎样'],
    ['Antara berikut', '以下选项中'],
    ['yang manakah', '哪一个'],
    ['penting', '重要'],
    ['nilai', '价值/品德'],
    ['tanggungjawab', '责任'],
    ['disiplin', '纪律/自律'],
    ['jujur', '诚实'],
    ['kejujuran', '诚实'],
    ['keprihatinan', '关怀'],
    ['hormat', '尊重'],
    ['kasih sayang', '关爱'],
    ['perpaduan', '团结'],
    ['toleransi', '包容'],
    ['integriti', '诚信/廉正'],
    ['rasuah', '贪污/行贿受贿'],
    ['alam sekitar', '环境'],
    ['kitar semula', '回收'],
    ['patriotisme', '爱国精神'],
    ['warga emas', '长者'],
    ['warisan budaya', '文化遗产'],
    ['undang-undang', '法律'],
    // Frequent phrases
    ['Setiap pagi sebelum ke sekolah, Ah Meng memastikan bilik tidurnya kemas dan bersih. Apakah amalan yang ditunjukkan oleh Ah Meng?', '每天上学前，Ah Meng 都会把卧室整理干净。这体现了什么做法？'],
    ['Manakah antara berikut BUKAN merupakan tanggungjawab seorang anak di dalam keluarga?', '以下哪一项并非孩子对家庭应尽的责任？'],
    ['Mengapakah pentingnya untuk kita mempunyai hubungan yang baik dengan jiran?', '为什么与邻居保持良好关系很重要？'],
    ['Sekumpulan remaja menconteng dinding di perhentian bas awam. Apakah kesan daripada perbuatan vandalisme ini?', '一群青少年在公共巴士站墙上涂鸦。此破坏公物行为会带来什么后果？'],
    ['Apakah ciri utama seorang sahabat yang baik?', '好朋友应具备的主要特质是什么？'],
    ['Setiap agama dan kepercayaan menuntut penganutnya untuk berbuat baik. Apakah kepentingan mengamalkan ajaran agama dalam kehidupan seharian?', '各宗教都强调为善。日常实践宗教教义有何重要意义？'],
    ['Mengapakah kita perlu menghargai sumbangan agensi perkhidmatan awam seperti polis dan bomba?', '我们为何应当珍惜警察、消防等公共服务机构的贡献？'],
    ['Tindakan yang manakah menunjukkan individu yang bertanggungjawab terhadap keluarga?', '哪一种行为表现出对家庭负责任？'],
    ['Mengapakah penting untuk sentiasa bersikap jujur dalam setiap perbuatan?', '为什么在一切行为中保持诚实很重要？'],
    ['Antara berikut, yang manakah tindakan yang boleh menjejaskan keharmonian hidup berjiran?', '以下哪项会破坏睦邻和谐？'],
    ['Apakah kepentingan menguruskan masa dengan berkesan?', '高效管理时间有何重要性？'],
    ['Apakah peranan utama seorang anak dalam menjaga nama baik keluarga?', '孩子维护家庭名誉的主要角色是什么？'],
    ['Encik Ali menasihati anak-anaknya agar sentiasa menghormati orang tua dan bertutur dengan sopan. Nilai moral apakah yang diterapkan oleh Encik Ali?', 'Ali 先生劝导孩子尊敬长辈、言语有礼。他所灌输的道德价值是什么？'],
    ['Bagaimanakah kita boleh menunjukkan rasa syukur terhadap ibu bapa kita?', '我们应如何向父母表达感恩？'],
    ['Mengapakah perbuatan berbohong boleh merosakkan hubungan persahabatan?', '为什么说谎会破坏友谊？'],
    ['Berikut adalah ciri-ciri individu yang bertanggungjawab, kecuali...', '以下是负责任者的特征，除了……'],
    ['Antara berikut, manakah contoh amalan integriti dalam diri pelajar?', '以下哪一项是学生实践诚信的例子？'],
    ['Apakah peranan masyarakat dalam memastikan kebersihan alam sekitar terjaga?', '社会在维护环境整洁方面应扮演什么角色？'],
    ['Situasi manakah yang menggambarkan tindakan yang tidak bermoral?', '下列哪种情境体现不道德行为？'],
    ['Mengapakah penting untuk kita mematuhi undang-undang yang ditetapkan oleh pihak berkuasa?', '为什么必须遵守当局制定的法律？'],
    ['Mengapakah penting untuk menghargai warisan budaya dan seni?', '为什么要珍视文化与艺术遗产？'],
    ['Apakah peranan remaja dalam mempromosikan perpaduan kaum di Malaysia?', '青少年在促进我国多元族群团结方面扮演什么角色？'],
    ['Apakah kesan jika masyarakat tidak mempunyai nilai murni dan etika yang tinggi?', '如果社会缺乏高尚价值与道德，会带来什么后果？'],
    ['Manakah antara berikut, cara menunjukkan rasa hormat kepada guru?', '下列哪一项是尊师的做法？'],
    ['Apakah kesan negatif jika kita mengabaikan tanggungjawab untuk menjaga kebersihan diri?', '忽视个人卫生责任会带来哪些负面影响？'],
    ['Sebagai seorang pelajar, apakah tanggungjawab anda terhadap sekolah?', '作为学生，你对学校应尽什么责任？'],
    ['Apakah kepentingan perpaduan dalam sebuah negara yang berbilang kaum seperti Malaysia?', '在多元族群的国家里，团结有何重要性？'],
    ['Mengapakah penting untuk kita sentiasa bersikap toleransi terhadap perbezaan kaum dan agama?', '为什么应对族群与宗教差异保持包容？'],
    ['Apakah peranan kita sebagai warganegara yang bertanggungjawab dalam membanteras gejala rasuah?', '作为负责任的公民，我们在打击贪污方面应做什么？'],
    ['Manakah antara berikut, perbuatan yang menunjukkan rasa sayang terhadap negara?', '下列哪一项体现爱国之情？'],
    ['Mengapakah kita perlu mengamalkan nilai kesederhanaan dalam perbelanjaan harian?', '为何在日常开销中要实践节制/节俭？'],
    ['Apakah ciri-ciri individu yang bersikap adil?', '公正之人的特征是什么？'],
    ['Bagaimanakah kita boleh menunjukkan rasa hormat kepada warga emas?', '我们如何向长者表达尊重？'],
    ['Mengapakah amalan gotong-royong penting dalam masyarakat?', '为什么互助合作（gotong-royong）对社会很重要？'],
    ['Apakah kesan jika seorang pelajar tidak mempunyai nilai bertanggungjawab terhadap pelajaran?', '学生若缺乏对学业的责任感，会有何影响？'],
    ['Antara berikut, manakah perbuatan yang boleh mengancam keselamatan diri?', '以下哪种行为可能威胁自身安全？'],
    ['Mengapakah penting untuk sentiasa bersikap prihatin terhadap kesusahan orang lain?', '为什么应对他人的困难保持关怀？'],
    ['Apakah peranan media massa dalam membentuk masyarakat yang bermoral?', '大众媒体在塑造有道德的社会中扮演什么角色？'],
    ['Manakah amalan yang sesuai untuk menunjukkan rasa cinta akan negara?', '以下哪项做法能体现爱国？'],
    ['Bagaimanakah kita boleh mempraktikkan nilai berdikari dalam kehidupan seharian?', '我们如何在日常生活中实践独立自立？'],
    ['Apakah kepentingan memupuk semangat kerjasama dalam sebuah pasukan sukan?', '在运动队中培养团队合作精神有何重要性？'],
    ['Mengapakah pentingnya untuk sentiasa bersikap rasional dalam membuat keputusan?', '为什么做决定时保持理性很重要？'],
    ['Manakah antara berikut, cara menunjukkan rasa syukur terhadap alam sekitar?', '以下哪一项是对环境表达感恩的做法？'],
    ['Apakah peranan yang boleh dimainkan oleh remaja dalam membendung gejala sosial?', '青少年可如何在遏制社会问题上发挥作用？'],
    ['Mengapakah penting untuk sentiasa bersikap berani mempertahankan kebenaran?', '为什么要勇于维护真理？'],
    ['Apakah peranan anda dalam memastikan keselamatan di kawasan sekolah?', '为确保校园安全，你应扮演什么角色？'],
    ['Mengapakah perbuatan menipu dalam perniagaan adalah salah?', '为什么商业欺诈是错误的？'],
    ['Bagaimanakah kita boleh memupuk semangat patriotisme dalam kalangan remaja?', '如何在青少年中培育爱国精神？'],
    ['Apakah kepentingan mengamalkan nilai berjimat cermat dalam kehidupan?', '在生活中实践节俭有何重要性？'],
    ['Apakah kesan negatif jika kita tidak mempunyai disiplin diri yang tinggi?', '缺乏高度自律会有什么负面影响？'],
  ]);

  // Full-string dictionary first
  if (dict.has(text)) return dict.get(text);

  // Light pattern replacements for common words
  const replacePairs = [
    [/\bMengapakah\b/gi, '为什么'],
    [/\bApakah\b/gi, '什么/哪一项'],
    [/\bManakah\b/gi, '哪一项'],
    [/\bBagaimanakah\b/gi, '如何'],
    [/\bAntara berikut\b/gi, '以下选项中'],
    [/\bhormat\b/gi, '尊重'],
    [/\bkasih sayang\b/gi, '关爱'],
    [/\btanggungjawab\b/gi, '责任'],
    [/\bjujur\b/gi, '诚实'],
    [/\bintegriti\b/gi, '诚信/廉正'],
    [/\bperpaduan\b/gi, '团结'],
    [/\btoleransi\b/gi, '包容'],
    [/\balam sekitar\b/gi, '环境'],
    [/\bwarisan budaya\b/gi, '文化遗产'],
    [/\bundang-undang\b/gi, '法律'],
  ];
  let out = text;
  for (const [re, to] of replacePairs) out = out.replace(re, to);
  return out;
}

const enriched = base.map((q) => ({
  ...q,
  zhQuestion: translate(q.question),
  zhOptions: Array.isArray(q.options) ? q.options.map(translate) : [],
}));

const out = `export const moralT2 = ${JSON.stringify(enriched, null, 2)};\n`;
const target = resolve(__dirname, '../src/questions/moral_t2_zh.js');

await writeFile(target, out, 'utf8');
console.log(`Wrote: ${target}`);


