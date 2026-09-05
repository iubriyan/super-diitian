/* ============================================================
   Students Directory & Smart Name Formatter Engine (Multi-Page Fixed)
   ============================================================ */

const STORAGE_PREFIX = 'super_diitian_';

function formatStudentName(rawName) {
  if (!rawName) return '';
  const trimmed = rawName.trim();
  
  if (trimmed.toUpperCase().includes("IFTEKHAR")) {
    return "Iftekhar U. Bhuiyan";
  }

  return trimmed.split(/\s+/).map(word => {
    const upper = word.toUpperCase();
    if (upper === 'MD.' || upper === 'MD') return 'Md.';
    if (upper === 'MST.' || upper === 'MST') return 'Mst.';
    if (upper === 'SK.' || upper === 'SK') return 'Sk.';
    if (upper === 'S.N.') return 'S.N.';
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');
}

const STUDENTS_LIST = [
  { roll: "260001", name: "Faiaz Hossain Farhan" },
  { roll: "260002", name: "Faiyaz Bin Bakar" },
  { roll: "260003", name: "Md. Janon" },
  { roll: "260004", name: "Fahad Bin Nur" },
  { roll: "260005", name: "Tanjilur Rahman" },
  { roll: "260006", name: "Khalid Bin Syam" },
  { roll: "260007", name: "Lamya Akter Emo" },
  { roll: "260009", name: "Md. Sakib Mia" },
  { roll: "260010", name: "Mahenur Rahman" },
  { roll: "260011", name: "Nawrin Hossain Oishi" },
  { roll: "260012", name: "Md. Nahid Hasan" },
  { roll: "260013", name: "Iftekhar U. Bhuiyan" },
  { roll: "260014", name: "Mehedi Hassan Bappi" },
  { roll: "260015", name: "Aysha Akter Mishita" },
  { roll: "260016", name: "Toli" },
  { roll: "260017", name: "Shams Mahmud Walid" },
  { roll: "260018", name: "Noushin Ahmed" },
  { roll: "260019", name: "Saznin Ferdousi Oyshi" },
  { roll: "260020", name: "Tasfim Monjabin" },
  { roll: "260021", name: "Syed Rejoyan Haque" },
  { roll: "260022", name: "Nafisa Khan" },
  { roll: "260023", name: "Mahi Shahriar Apurbo" },
  { roll: "260024", name: "Md. Shahnawaz Kobir" },
  { roll: "260025", name: "Ajim Uddin Akash" },
  { roll: "260026", name: "Md. Hasan Habib" },
  { roll: "260027", name: "Monim Ahmad" },
  { roll: "260028", name: "Tahsinul Haque" },
  { roll: "260029", name: "Tanim Khan" },
  { roll: "260030", name: "Zayed Bin Abdullah" },
  { roll: "260031", name: "Prionty Sarker" },
  { roll: "260032", name: "Maria Sultana Moonmoon" },
  { roll: "260033", name: "Umaiya Rista Urboshi" },
  { roll: "260034", name: "Sajidul Islam" },
  { roll: "260035", name: "Maliha Jaman" },
  { roll: "260036", name: "Anika Tasnim" },
  { roll: "260037", name: "Musidul Islam Sayeb" },
  { roll: "260038", name: "Md. Jobair Uddin" },
  { roll: "260039", name: "Mahmodul Hasan" },
  { roll: "260040", name: "Jannat Tasnin Raka" },
  { roll: "260041", name: "Farhana Sadia" },
  { roll: "260042", name: "Semeka Barman" },
  { roll: "260043", name: "Saila Sajin Rini" },
  { roll: "260044", name: "Tamim Eqbal" },
  { roll: "260045", name: "Nabila Hossain" },
  { roll: "260046", name: "Md. Eyakub Hossin" },
  { roll: "260047", name: "Sk. Md. Sadip" },
  { roll: "260048", name: "Sk. Tazim" },
  { roll: "260049", name: "Samira Tabassum" },
  { roll: "260050", name: "Sohanur Rahaman Nur" },
  { roll: "260051", name: "Arian Abdullah" },
  { roll: "260052", name: "Md. Shefat Ali" },
  { roll: "260053", name: "Rafiul Islam" },
  { roll: "260054", name: "Sk. Sadik Sagar" },
  { roll: "260055", name: "Md. Albir Sami" },
  { roll: "260056", name: "Mohammed Junayed Hossain Fardin" },
  { roll: "260057", name: "Redwan Ahmmed" },
  { roll: "260058", name: "Md. Hridoy Mondol" },
  { roll: "260059", name: "Amrin Akter Alisa" },
  { roll: "260060", name: "Ashraful Hoque Rimon" },
  { roll: "260061", name: "Kazi Md. Arafat Hossain Shanto" },
  { roll: "260062", name: "Md WHIDUN NABI NION" },
  { roll: "260063", name: "IKON SHEIKH" },
  { roll: "260064", name: "SHARMIN HOSSAIN ANUD" },
  { roll: "260065", name: "TASNIM HASNAT" },
  { roll: "260066", name: "MD. ANISUL HAQUE ANIK" },
  { roll: "260067", name: "IREEN AKTER" },
  { roll: "260068", name: "SIFATUL ISLAM SIFAT" },
  { roll: "260069", name: "HAFSA HOSSAIN TOMA" },
  { roll: "260070", name: "SINHA AKTER SEAN" },
  { roll: "260071", name: "MOHAMMAD TANVIR HOSSEN TAMIM" },
  { roll: "260072", name: "TUSTY ISLAM" },
  { roll: "260073", name: "MD. TAHASANUR KHAN" },
  { roll: "260074", name: "S.N. OMI" },
  { roll: "260075", name: "SALSABILA NAHIN AFNAN" },
  { roll: "260076", name: "MD. EFAZ BHUIYAN" },
  { roll: "260077", name: "MST. LOTA MONY" }
];

window.renderStudentCards = function(list = STUDENTS_LIST) {
  const container = document.getElementById("studentCardContainer") || document.getElementById("studentContainer");
  const countBadge = document.getElementById("studentTotalCount");
  if (!container) return;

  if (countBadge) countBadge.innerText = `${list.length} Students`;

  if (list.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 36px 10px; color: #64748b;">
        🔍 কোনো শিক্ষার্থীর তথ্য পাওয়া যায়নি!
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(s => {
    const formatted = formatStudentName(s.name);
    const initial = formatted.charAt(0).toUpperCase();
    return `
      <div class="student-card" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 16px; display: flex; align-items: center; justify-content: space-between; gap: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.02); transition: all 0.2s ease;">
        <div style="display: flex; align-items: center; gap: 12px; overflow: hidden;">
          <div class="student-avatar" style="min-width: 42px; height: 42px; background: #0284c7; color: #fff; display: flex; align-items: center; justify-content: center; border-radius: 12px; font-weight: 700; box-shadow: 0 4px 10px rgba(2,132,199,0.2);">${initial}</div>
          <div style="overflow: hidden;">
            <h4 class="student-card-name" title="${formatted}" style="margin:0; font-size: 0.95rem; font-weight:700; color: #1e293b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${formatted}</h4>
            <span class="student-card-roll" style="font-size: 0.78rem; color: #64748b; display: inline-flex; align-items: center; gap: 6px;">
              Roll: ${s.roll}
              <button class="copy-mini-btn" title="Copy Roll" onclick="copyText('${s.roll}')" style="background:none; border:none; cursor:pointer; color:#64748b; padding:2px;">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              </button>
            </span>
          </div>
        </div>
        <button type="button" class="card-use-btn" onclick="useStudentInCover('${formatted.replace(/'/g, "\\'")}', '${s.roll}')" title="Auto fill in Cover Page" style="white-space: nowrap; background: #eff6ff; color: #0284c7; border: 1.5px solid #bfdbfe; padding: 7px 12px; border-radius: 10px; font-weight: 700; font-size: 0.78rem; cursor: pointer; transition: all 0.2s ease;">
          Use in Cover &rarr;
        </button>
      </div>
    `;
  }).join('');
};

window.filterStudents = function() {
  const input = document.getElementById("studentSearch");
  if (!input) return;
  const q = input.value.trim().toUpperCase();
  const filtered = STUDENTS_LIST.filter(s => s.name.toUpperCase().includes(q) || s.roll.includes(q));
  renderStudentCards(filtered);
};

window.copyText = function(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert(`Copied: ${text}`);
  }).catch(() => {
    prompt("Copy roll manually:", text);
  });
};

window.useStudentInCover = function(name, roll) {
  const cleanName = formatStudentName(name);
  
  // লোকালস্টোরেজে ডেটা সেভ করা যাতে কভার মেকার পেজ ওপেন হওয়ামাত্র ডেটাগুলো ধরে নেয়
  localStorage.setItem(STORAGE_PREFIX + "studentName", cleanName);
  localStorage.setItem(STORAGE_PREFIX + "studentId", roll);
  localStorage.setItem(STORAGE_PREFIX + "studentSec", "A");

  // মাল্টি-পেজ স্ট্রাকচার অনুযায়ী সরাসরি কভার মেকার পেজে রিডাইরেক্ট করা
  window.location.href = "covermaker.html";
};

// পেজ লোড হওয়ার সাথে সাথে ডিরেক্টরি রেন্ডার করার জন্য
document.addEventListener('DOMContentLoaded', () => {
  renderStudentCards(STUDENTS_LIST);
  const searchInput = document.getElementById("studentSearch");
  if (searchInput) {
    searchInput.addEventListener("input", filterStudents);
  }
});