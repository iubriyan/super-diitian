/* ============================================================
   Super DIITian — Hub & Cover Page Maker Engine
   ============================================================ */

const CANVAS_W = 1414;
const CANVAS_H = 2000;
const STORAGE_PREFIX = 'super_diitian_';

const TEMPLATES = [
  {
    id: 't1', file: 'templates/t1.jpg', label: 'Template 1', fixed: false,
    zones: {
      deptBatch: { xPct: 10, wPct: 80, yPct: 15, hPct: 20, align: 'center' },
      course:    { xPct: 10, wPct: 80, yPct: 38, hPct: 19, align: 'center' },
      teacher:   { xPct: 17, wPct: 41, yPct: 62.8, hPct: 17, align: 'left' },
      student:   { xPct: 65, wPct: 40, yPct: 64.5, hPct: 17, align: 'left' },
    }
  },
  {
    id: 't2', file: 'templates/t2.jpg', label: 'Template 2', fixed: false,
    zones: {
      deptBatch: { xPct: 10, wPct: 80, yPct: 15, hPct: 13, align: 'center' },
      course:    { xPct: 12, wPct: 75, yPct: 30, hPct: 15, align: 'center' },
      teacher:   { xPct: 9,  wPct: 28, yPct: 47, hPct: 23, align: 'left' },
      student:   { xPct: 41, wPct: 40, yPct: 48.8, hPct: 23, align: 'left' },
    }
  },
  {
    id: 't3', file: 'templates/t3.jpg', label: 'Template 3', fixed: false,
    zones: {
      deptBatch: { xPct: 10, wPct: 80, yPct: 13, hPct: 17, align: 'center' },
      course:    { xPct: 10, wPct: 80, yPct: 35, hPct: 14, align: 'center' },
      teacher:   { xPct: 17, wPct: 41, yPct: 51.8, hPct: 20, align: 'left' },
      student:   { xPct: 65, wPct: 40, yPct: 53.6, hPct: 20, align: 'left' },
    }
  },
  {
    id: 't4', file: 'templates/t4.jpg', label: 'Template 4', fixed: false,
    zones: {
      deptBatch: { xPct: 10, wPct: 80, yPct: 18, hPct: 15, align: 'center' },
      course:    { xPct: 10, wPct: 80, yPct: 37, hPct: 14, align: 'center' },
      teacher:   { xPct: 17, wPct: 41, yPct: 55, hPct: 18, align: 'left' },
      student:   { xPct: 65, wPct: 40, yPct: 56.6, hPct: 18, align: 'left' },
    }
  },
  {
    id: 't5', file: 'templates/t5.jpg', label: 'Template 5', fixed: false,
    zones: {
      deptBatch: { xPct: 10, wPct: 80, yPct: 17.6, hPct: 14, align: 'center' },
      course:    { xPct: 10, wPct: 80, yPct: 34, hPct: 14, align: 'center' },
      teacher:   { xPct: 17, wPct: 41, yPct: 55, hPct: 11, align: 'left' },
      student:   { xPct: 65, wPct: 40, yPct: 56.5, hPct: 11, align: 'left' },
    }
  },
  {
    id: 't6', file: 'templates/t6.jpg', label: 'Template 6', fixed: false,
    zones: {
      deptBatch: { xPct: 10, wPct: 80, yPct: 15.6, hPct: 11, align: 'center' },
      course:    { xPct: 10, wPct: 80, yPct: 31, hPct: 14, align: 'center' },
      teacher:   { xPct: 17, wPct: 41, yPct: 50, hPct: 18, align: 'left' },
      student:   { xPct: 65, wPct: 40, yPct: 51.6, hPct: 18, align: 'left' },
    }
  },
  {
    id: 't7', file: 'templates/t7.jpg', label: 'Template 7', fixed: false,
    zones: {
      deptBatch: { xPct: 10, wPct: 80, yPct: 16.6, hPct: 15, align: 'center' },
      course:    { xPct: 10, wPct: 80, yPct: 35, hPct: 14, align: 'center' },
      teacher:   { xPct: 17, wPct: 43, yPct: 51, hPct: 23, align: 'left' },
      student:   { xPct: 65, wPct: 40, yPct: 52.8, hPct: 23, align: 'left' },
    }
  },
  {
    id: 't8', file: 'templates/t8.jpg', label: 'EEC Lab Report', fixed: true, isPremium: true,
    zones: {
      student:   { xPct: 44, wPct: 46, yPct: 53, hPct: 27, align: 'left' },
    }
  },
];

const DEFAULTS = {
  deptName: 'Department of Computer Science and Engineering',
  batchName: '26th Batch, 1st Semester',
  courseCode: '510202',
  courseTitle: 'Structured Programming Language Lab',
  teacherName: 'Poly Bhoumik',
  teacherTitle: 'Senior Lecturer',
  teacherDept: 'Department of CSE, DIIT',
  studentName: 'Iftekhar U. Bhuiyan',
  studentSec: 'A',
  studentId: '260013',
  studentReg: '',
};

const FIELD_IDS = [
  'deptName','batchName','courseCode','courseTitle',
  'teacherName','teacherTitle','teacherDept',
  'studentName','studentSec','studentId','studentReg'
];

/* ------------------------------------------------------------
   FACULTY FULL NAMES & ROUTINE CONFIGURATION
   ------------------------------------------------------------ */
const FACULTY = {
  PB: "Poly Bhoumik",
  MZH: "Md. Zakir Hossain",
  SR: "Saidur Rahman",
  MIH: "Md. Imran Hossain",
  MMR: "Md. Mushfiqur Rahaman",
  RKD: "Ramen Kumar Das",
  PRM: "Md. Parvezur Rahman Mahin",
  MFO: "Mubtasim Fuad Opee",
  SQ: "Sabrina Quadir",
  FP: "Farjana Parvin"
};

const ROUTINE_DATA = {
  A: {
    room: "704",
    days: [
      {
        name: "Sunday", dayIdx: 0,
        classes: [
          { time: "11:40 AM - 12:50 PM", startM: 700, endM: 770, subject: "Calculus", teacher: FACULTY.MZH, isLab: false },
          { time: "12:50 PM - 02:00 PM", startM: 770, endM: 840, subject: "Structured Programming", teacher: FACULTY.PB, isLab: false },
          { time: "02:20 PM - 03:30 PM", startM: 860, endM: 930, subject: "Structured Programming Lab", teacher: FACULTY.PB, isLab: true }
        ]
      },
      {
        name: "Monday", dayIdx: 1,
        classes: [
          { time: "11:40 AM - 12:50 PM", startM: 700, endM: 770, subject: "Calculus", teacher: FACULTY.MZH, isLab: false },
          { time: "12:50 PM - 02:00 PM", startM: 770, endM: 840, subject: "Electrical & Electronic Circuit", teacher: FACULTY.RKD, isLab: false },
          { time: "02:20 PM - 03:30 PM", startM: 860, endM: 930, subject: "English", teacher: FACULTY.SQ, isLab: false }
        ]
      },
      {
        name: "Tuesday", dayIdx: 2,
        classes: [
          { time: "11:40 AM - 12:50 PM", startM: 700, endM: 770, subject: "Electrical & Electronic Circuit", teacher: FACULTY.RKD, isLab: false },
          { time: "12:50 PM - 02:00 PM", startM: 770, endM: 840, subject: "Physics", teacher: FACULTY.MFO, isLab: false },
          { time: "02:20 PM - 03:30 PM", startM: 860, endM: 930, subject: "Electrical & Electronic Circuit Lab", teacher: FACULTY.SR, isLab: true }
        ]
      },
      {
        name: "Wednesday", dayIdx: 3,
        classes: [
          { time: "11:40 AM - 12:50 PM", startM: 700, endM: 770, subject: "English", teacher: FACULTY.SQ, isLab: false },
          { time: "12:50 PM - 02:00 PM", startM: 770, endM: 840, subject: "Structured Programming", teacher: FACULTY.PB, isLab: false },
          { time: "02:20 PM - 03:30 PM", startM: 860, endM: 930, subject: "Physics", teacher: FACULTY.MFO, isLab: false }
        ]
      }
    ]
  },
  B: {
    room: "706",
    days: [
      {
        name: "Sunday", dayIdx: 0,
        classes: [
          { time: "11:40 AM - 12:50 PM", startM: 700, endM: 770, subject: "Physics", teacher: FACULTY.PRM, isLab: false },
          { time: "12:50 PM - 02:00 PM", startM: 770, endM: 840, subject: "Electrical & Electronic Circuit", teacher: FACULTY.SR, isLab: false },
          { time: "02:20 PM - 03:30 PM", startM: 860, endM: 930, subject: "Calculus", teacher: FACULTY.MIH, isLab: false }
        ]
      },
      {
        name: "Monday", dayIdx: 1,
        classes: [
          { time: "11:40 AM - 12:50 PM", startM: 700, endM: 770, subject: "English", teacher: FACULTY.FP, isLab: false },
          { time: "12:50 PM - 02:00 PM", startM: 770, endM: 840, subject: "Calculus", teacher: FACULTY.MIH, isLab: false },
          { time: "02:20 PM - 03:30 PM", startM: 860, endM: 930, subject: "Electrical & Electronic Circuit Lab", teacher: FACULTY.SR, isLab: true }
        ]
      },
      {
        name: "Tuesday", dayIdx: 2,
        classes: [
          { time: "11:40 AM - 12:50 PM", startM: 700, endM: 770, subject: "Electrical & Electronic Circuit", teacher: FACULTY.SR, isLab: false },
          { time: "12:50 PM - 02:00 PM", startM: 770, endM: 840, subject: "Structured Programming", teacher: FACULTY.MMR, isLab: false },
          { time: "02:20 PM - 03:30 PM", startM: 860, endM: 930, subject: "Physics", teacher: FACULTY.PRM, isLab: false }
        ]
      },
      {
        name: "Wednesday", dayIdx: 3,
        classes: [
          { time: "11:40 AM - 12:50 PM", startM: 700, endM: 770, subject: "Structured Programming", teacher: FACULTY.MMR, isLab: false },
          { time: "12:50 PM - 02:00 PM", startM: 770, endM: 840, subject: "English", teacher: FACULTY.FP, isLab: false },
          { time: "02:20 PM - 03:30 PM", startM: 860, endM: 930, subject: "Structured Programming Lab", teacher: FACULTY.MMR, isLab: true }
        ]
      }
    ]
  }
};

let currentRoutineSec = "A";
let liveTimerInterval = null;

/* ------------------------------------------------------------
   STUDENTS DIRECTORY DATABASE & SMART NAME FORMATTER
   ------------------------------------------------------------ */
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
  const container = document.getElementById("studentCardContainer");
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
      <div class="student-card">
        <div class="student-avatar">${initial}</div>
        <div class="student-meta">
          <h4 class="student-card-name" title="${formatted}">${formatted}</h4>
          <span class="student-card-roll">
            Roll: ${s.roll}
            <button class="copy-mini-btn" title="Copy Roll" onclick="copyText('${s.roll}')">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            </button>
          </span>
        </div>
        <button class="card-use-btn" onclick="useStudentInCover('${formatted.replace(/'/g, "\\'")}', '${s.roll}')" title="Auto fill in Cover Page">
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
  const nameInput = document.getElementById("studentName");
  const idInput = document.getElementById("studentId");
  
  if (nameInput) {
    nameInput.value = cleanName;
    localStorage.setItem(STORAGE_PREFIX + "studentName", cleanName);
  }
  if (idInput) {
    idInput.value = roll;
    localStorage.setItem(STORAGE_PREFIX + "studentId", roll);
  }
  
  scheduleRender();
  navigateTo("coverMaker");
};

/* ------------------------------------------------------------
   LIVE CLASS TRACKER & TIMER ENGINE
   ------------------------------------------------------------ */
function updateLiveTracker() {
  const trackerEl = document.getElementById("routineLiveTracker");
  if (!trackerEl) return;

  const now = new Date();
  const currentDayIdx = now.getDay(); 
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const secData = ROUTINE_DATA[currentRoutineSec];
  const todaySchedule = secData.days.find(d => d.dayIdx === currentDayIdx);

  if (!todaySchedule) {
    trackerEl.innerHTML = `
      <div class="live-tracker-head">
        <span class="live-pulse"><span class="pulse-dot" style="background:#94a3b8;"></span> OFF DAY</span>
        <span style="font-size:0.75rem;color:#94a3b8;">Section ${currentRoutineSec} • Room ${secData.room}</span>
      </div>
      <div class="live-timer-text">No Classes Scheduled Today</div>
      <p class="live-sub-text">Enjoy your break or review previous course modules!</p>
    `;
    return;
  }

  let currentClass = null;
  let nextClass = null;
  let isBreak = false;

  const classes = todaySchedule.classes;
  for (let i = 0; i < classes.length; i++) {
    const c = classes[i];
    if (currentMinutes >= c.startM && currentMinutes < c.endM) {
      currentClass = c;
      break;
    }
  }

  if (!currentClass) {
    if (currentMinutes >= 840 && currentMinutes < 860) {
      isBreak = true;
      nextClass = classes[2];
    } else if (currentMinutes < classes[0].startM) {
      nextClass = classes[0];
    } else {
      for (let i = 0; i < classes.length - 1; i++) {
        if (currentMinutes >= classes[i].endM && currentMinutes < classes[i+1].startM) {
          nextClass = classes[i+1];
          break;
        }
      }
    }
  }

  if (currentClass) {
    const elapsed = currentMinutes - currentClass.startM;
    const remaining = currentClass.endM - currentMinutes;
    trackerEl.innerHTML = `
      <div class="live-tracker-head">
        <span class="live-pulse"><span class="pulse-dot"></span> HAPPENING NOW</span>
        <span style="font-size:0.75rem;color:#38bdf8;">Room ${secData.room}</span>
      </div>
      <div class="live-timer-text">${currentClass.subject}</div>
      <p class="live-sub-text">
        Teacher: <strong>${currentClass.teacher}</strong> • Started <strong>${elapsed}m</strong> ago (Ends in <strong>${remaining}m</strong>)
      </p>
    `;
  } else if (isBreak) {
    const breakRem = 860 - currentMinutes;
    trackerEl.innerHTML = `
      <div class="live-tracker-head">
        <span class="live-pulse"><span class="pulse-dot" style="background:#f59e0b;"></span> BREAK TIME</span>
        <span style="font-size:0.75rem;color:#f59e0b;">20 Min Break</span>
      </div>
      <div class="live-timer-text">Break in progress</div>
      <p class="live-sub-text">Next Class: <strong>${nextClass.subject}</strong> with ${nextClass.teacher} in <strong>${breakRem}m</strong></p>
    `;
  } else if (nextClass) {
    const startIn = nextClass.startM - currentMinutes;
    trackerEl.innerHTML = `
      <div class="live-tracker-head">
        <span class="live-pulse"><span class="pulse-dot" style="background:#10b981;"></span> UPCOMING CLASS</span>
        <span style="font-size:0.75rem;color:#94a3b8;">Room ${secData.room}</span>
      </div>
      <div class="live-timer-text">${nextClass.subject}</div>
      <p class="live-sub-text">Starts in <strong>${startIn}m</strong> (${nextClass.time}) • ${nextClass.teacher}</p>
    `;
  } else {
    trackerEl.innerHTML = `
      <div class="live-tracker-head">
        <span class="live-pulse"><span class="pulse-dot" style="background:#94a3b8;"></span> CLASSES COMPLETED</span>
        <span style="font-size:0.75rem;color:#94a3b8;">Section ${currentRoutineSec}</span>
      </div>
      <div class="live-timer-text">All Classes Completed for Today!</div>
      <p class="live-sub-text">Have a great time! Check the Question Bank or Notes for preparation.</p>
    `;
  }
}

/* ------------------------------------------------------------
   ROUTINE VIEW RENDERER WITH TODAY HIGHLIGHT FIRST
   ------------------------------------------------------------ */
window.renderRoutineView = function(sec) {
  currentRoutineSec = sec;
  const btnA = document.getElementById("secBtnA");
  const btnB = document.getElementById("secBtnB");
  if (btnA && btnB) {
    btnA.classList.toggle("is-active", sec === "A");
    btnB.classList.toggle("is-active", sec === "B");
  }

  const container = document.getElementById("routineCardsList");
  if (!container) return;

  const data = ROUTINE_DATA[sec];
  const todayIdx = new Date().getDay();

  const sortedDays = [...data.days].sort((a, b) => {
    if (a.dayIdx === todayIdx) return -1;
    if (b.dayIdx === todayIdx) return 1;
    return a.dayIdx - b.dayIdx;
  });

  container.innerHTML = sortedDays.map(d => {
    const isToday = d.dayIdx === todayIdx;
    return `
      <div class="day-card ${isToday ? 'is-today' : ''}">
        <div class="day-header">
          <div style="display:flex; align-items:center; gap:8px;">
            <span>${d.name}</span>
            ${isToday ? '<span class="today-badge-chip">TODAY</span>' : ''}
          </div>
          <span class="day-room-badge">Room ${data.room}</span>
        </div>
        <div class="period-list">
          ${d.classes.map(c => `
            <div class="period-item ${c.isLab ? 'is-lab' : ''}">
              <div class="period-time">🕒 ${c.time}</div>
              <div class="period-info">
                <span class="period-name">${c.subject}</span>
                <span class="period-teacher-name">👨‍🏫 ${c.teacher}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');

  updateLiveTracker();
  clearInterval(liveTimerInterval);
  liveTimerInterval = setInterval(updateLiveTracker, 30000);
};

/* ------------------------------------------------------------
   GENERATE BEAUTIFUL HD JPG ROUTINE POSTER
   ------------------------------------------------------------ */
window.downloadRoutineJPG = function() {
  const btn = document.querySelector(".download-routine-btn");
  if (btn) {
    btn.disabled = true;
    btn.innerText = "Creating JPG...";
  }

  const data = ROUTINE_DATA[currentRoutineSec];
  const c = document.createElement("canvas");
  c.width = 1200;
  c.height = 1500;
  const ctx = c.getContext("2d");

  const bgGrad = ctx.createLinearGradient(0, 0, 0, 1500);
  bgGrad.addColorStop(0, "#0f172a");
  bgGrad.addColorStop(1, "#1e293b");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1200, 1500);

  ctx.fillStyle = "#2563eb";
  ctx.fillRect(0, 0, 1200, 14);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 44px 'Inter', sans-serif";
  ctx.fillText("DIIT CSE 26TH BATCH", 70, 90);

  ctx.font = "600 24px 'Inter', sans-serif";
  ctx.fillStyle = "#38bdf8";
  ctx.fillText(`CLASS SCHEDULE — SECTION ${currentRoutineSec} (ROOM ${data.room})`, 70, 130);

  ctx.strokeStyle = "rgba(255,255,255,0.15)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(70, 160);
  ctx.lineTo(1130, 160);
  ctx.stroke();

  let startY = 200;
  data.days.forEach((day) => {
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.roundRect(70, startY, 1060, 245, 16);
    ctx.fill();

    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.roundRect(70, startY, 1060, 52, [16, 16, 0, 0]);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 20px 'Inter', sans-serif";
    ctx.fillText(day.name.toUpperCase(), 95, startY + 34);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "600 16px 'Inter', sans-serif";
    ctx.fillText(`Room ${data.room}`, 1030, startY + 34);

    let itemY = startY + 80;
    day.classes.forEach(cls => {
      ctx.fillStyle = cls.isLab ? "#ecfdf5" : "#f8fafc";
      ctx.beginPath();
      ctx.roundRect(90, itemY, 1020, 50, 8);
      ctx.fill();

      ctx.fillStyle = "#64748b";
      ctx.font = "bold 16px 'Inter', sans-serif";
      ctx.fillText(`🕒 ${cls.time}`, 110, itemY + 32);

      ctx.fillStyle = cls.isLab ? "#065f46" : "#0f172a";
      ctx.font = "bold 18px 'Inter', sans-serif";
      ctx.fillText(cls.subject, 370, itemY + 32);

      ctx.fillStyle = "#475569";
      ctx.font = "600 15px 'Inter', sans-serif";
      ctx.fillText(`👨‍🏫 ${cls.teacher}`, 850, itemY + 32);

      itemY += 56;
    });

    startY += 275;
  });

  ctx.fillStyle = "rgba(255,255,255,0.06)";
  ctx.beginPath();
  ctx.roundRect(70, 1340, 1060, 90, 14);
  ctx.fill();

  ctx.fillStyle = "#94a3b8";
  ctx.font = "16px 'Inter', sans-serif";
  ctx.fillText("Generated from Super DIITian Portal • super-diitian.vercel.app", 100, 1392);

  c.toBlob(blob => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `DIIT_CSE26_Section_${currentRoutineSec}_Routine.jpg`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 3000);

    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> Save Routine (JPG)`;
    }
  }, "image/jpeg", 0.98);
};

/* ------------------------------------------------------------
   Hub Navigation & Browser History Back Management
   ------------------------------------------------------------ */
window.navigateTo = function(viewKey, pushToHistory = true) {
  const hubDashboard = document.getElementById("hubDashboard");
  const hubCoverMaker = document.getElementById("hubCoverMaker");
  const hubDetailView = document.getElementById("hubDetailView");
  const titleEl = document.getElementById("hubViewTitle");
  const contentEl = document.getElementById("hubViewContent");

  if (!hubDashboard || !hubCoverMaker || !hubDetailView) return;

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (pushToHistory) {
    history.pushState({ view: viewKey }, "", viewKey === 'dashboard' ? "#" : `#${viewKey}`);
  }

  if (viewKey === 'dashboard') {
    hubDashboard.style.display = "block";
    hubCoverMaker.style.display = "none";
    hubDetailView.style.display = "none";
    clearInterval(liveTimerInterval);
    return;
  }

  hubDashboard.style.display = "none";

  if (viewKey === 'coverMaker') {
    hubCoverMaker.style.display = "block";
    hubDetailView.style.display = "none";
    scheduleRender();
    return;
  }

  hubCoverMaker.style.display = "none";
  hubDetailView.style.display = "block";

  const modules = {
    routine: {
      title: "Class Routine — CSE 26th Batch",
      content: `
        <div id="routineLiveTracker" class="live-tracker-card"></div>

        <div class="routine-controls">
          <div class="section-switch-group">
            <button id="secBtnA" class="sec-tab-btn is-active" onclick="renderRoutineView('A')">Section A</button>
            <button id="secBtnB" class="sec-tab-btn" onclick="renderRoutineView('B')">Section B</button>
          </div>
          <button class="download-routine-btn" onclick="downloadRoutineJPG()">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Save Routine (JPG)
          </button>
        </div>

        <div id="routineCardsList"></div>
      `
    },

    students: {
      title: "CSE 26th Batch Student Directory",
      content: `
        <div class="directory-header-box">
          <div class="directory-search-wrapper">
            <svg class="search-svg-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" id="studentSearch" class="directory-search-input" placeholder="Search by name or roll number..." oninput="filterStudents()" />
          </div>
          <span class="directory-count-badge" id="studentTotalCount">76 Students</span>
        </div>

        <div class="students-card-grid" id="studentCardContainer"></div>
      `
    },

    news: {
      title: "Bangladesh Live News",
      content: `
        <div class="news-container">
          <div class="news-categories-bar">
            <button class="news-cat-btn is-active" onclick="fetchNews('politics', this)">🏛️ রাজনীতি</button>
            <button class="news-cat-btn" onclick="fetchNews('technology', this)">💻 টেকনোলজি</button>
            <button class="news-cat-btn" onclick="fetchNews('science', this)">🔬 বিজ্ঞান</button>
            <button class="news-cat-btn" onclick="fetchNews('sports', this)">🏏 খেলাধুলা</button>
          </div>
          <div class="news-grid" id="newsGridContainer">
            <div class="news-loading">📰 লাইভ নিউজ লোড হচ্ছে, একটু অপেক্ষা করুন...</div>
          </div>
        </div>
      `
    },

    knowledge: {
      title: "🧠 Daily Knowledge Hub",
      content: `
        <div class="knowledge-container">
          <div class="knowledge-categories-bar">
            <button class="k-cat-btn is-active" onclick="fetchKnowledge('science', 'বিজ্ঞান', this)">🔬 বিজ্ঞান</button>
            <button class="k-cat-btn" onclick="fetchKnowledge('space', 'মহাকাশ', this)">🌌 মহাকাশ</button>
            <button class="k-cat-btn" onclick="fetchKnowledge('technology', 'প্রযুক্তি', this)">💻 প্রযুক্তি</button>
            <button class="k-cat-btn" onclick="fetchKnowledge('history', 'ইতিহাস', this)">🏛️ ইতিহাস</button>
            <button class="k-cat-btn" onclick="fetchKnowledge('nature', 'প্রকৃতি ও প্রাণী', this)">🌿 প্রকৃতি</button>
            <button class="k-cat-btn" onclick="fetchKnowledge('psychology', 'মনোবিজ্ঞান', this)">🧠 মনোবিজ্ঞান</button>
          </div>
          <div class="knowledge-grid" id="knowledgeCardContainer">
            <div class="knowledge-loading">🧠 উইকিপিডিয়া থেকে র্যান্ডম জ্ঞান আহরণ করা হচ্ছে...</div>
          </div>
        </div>
      `
    },

    elibrary: {
      title: "📚 CSE E-Library & PDF Archive",
      content: `
        <div class="elibrary-container" id="elibMainView" oncontextmenu="return false;">
          <p style="font-size:0.9rem; color:#64748b; margin:0 0 16px 0;">সেমিস্টার ও প্রোগ্রামিংয়ের প্রয়োজনীয় বইগুলো নিচে দেওয়া হলো। পড়তে বইয়ের ওপর ক্লিক করো।</p>
          
          <!-- Book Shelf Grid (Mobile 2 Columns) -->
          <div class="elibrary-shelf">
            <div class="book-shelf-card" onclick="openBookDetails('spl')">
              <img src="https://i.postimg.cc/3NL7g9ND/spl-book-cover.png" alt="SPL Book" class="book-shelf-cover">
              <div class="book-shelf-meta">
                <h4 class="book-shelf-title">Structured Programming Language (SPL)</h4>
              </div>
            </div>
          </div>
        </div>

        <!-- Book Details View Container -->
        <div id="elibDetailContainer" style="display: none;" oncontextmenu="return false;">
          <button type="button" class="hub-back-btn" onclick="backToBookShelf()" style="margin-bottom: 16px;">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
            সকল বই
          </button>

          <div class="book-detail-header">
            <img src="https://i.postimg.cc/3NL7g9ND/spl-book-cover.png" alt="Cover" class="book-detail-cover">
            <div class="book-detail-info">
              <h3>Structured Programming Language (SPL)</h3>
              
            </div>
          </div>

          <h3 class="elib-section-title">📖 Book Chapters & Index</h3>
          <div class="elib-chapters-grid">
            <div class="chapter-box" onclick="openSecurePdf('https://drive.google.com/file/d/1V1SHZ-BulvDdDbMU02UzwXccZ0Vijhpf/view', 'Book Index')">
              <div class="chapter-meta">
                <h5>📁 Index / সূচিপত্র</h5>
                <span>Overview & Contents</span>
              </div>
              <span style="color:#0284c7; font-weight:700; font-size:0.8rem;">Read &rarr;</span>
            </div>
            <div class="chapter-box" onclick="openSecurePdf('https://drive.google.com/file/d/1ECsQQn2SWBvqXo3_R20UScd0w48x08aD/view', 'Chapter 1: Fundamentals')">
              <div class="chapter-meta">
                <h5>📄 Chapter 01</h5>
                <span>Basic C Concepts</span>
              </div>
              <span style="color:#0284c7; font-weight:700; font-size:0.8rem;">Read &rarr;</span>
            </div>
            <div class="chapter-box" onclick="openSecurePdf('https://drive.google.com/file/d/1MraPGEOvWntxV2tMj-EVqmt_rgBOWQs8/view', 'Chapter 2: Control Statements')">
              <div class="chapter-meta">
                <h5>📄 Chapter 02</h5>
                <span>Control Flow & Loops</span>
              </div>
              <span style="color:#0284c7; font-weight:700; font-size:0.8rem;">Read &rarr;</span>
            </div>
            <div class="chapter-box" onclick="openSecurePdf('https://drive.google.com/file/d/1_a_SwZVtL7fcaNbiaJvUMyBS_d5tmlUX/view', 'Chapter 3: Arrays & Functions')">
              <div class="chapter-meta">
                <h5>📄 Chapter 03</h5>
                <span>Arrays & Functions</span>
              </div>
              <span style="color:#0284c7; font-weight:700; font-size:0.8rem;">Read &rarr;</span>
            </div>
            <div class="chapter-box coming-soon">
              <div class="chapter-meta">
                <h5>🔒 Chapter 04</h5>
                <span>Pointers & Structures</span>
              </div>
              <span class="coming-badge">Coming Soon</span>
            </div>
            <div class="chapter-box coming-soon">
              <div class="chapter-meta">
                <h5>🔒 Chapter 05</h5>
                <span>File Management</span>
              </div>
              <span class="coming-badge">Coming Soon</span>
            </div>
          </div>

          <h3 class="elib-section-title" style="margin-top: 20px;">🌟 National University Archive</h3>
          <div class="nu-archive-box" onclick="openSecurePdf('https://drive.google.com/file/d/1xgtwLvT9Cd5r0K9Nm1oNQX_ouWEio5ZE/view', 'NU Question Bank')">
            <div style="display: flex; align-items: center; gap: 14px;">
              <span style="font-size: 24px;">🎯</span>
              <div>
                <h4 style="margin:0 0 2px 0; font-size: 1rem; font-weight:800;">NU Question Bank & Suggestions</h4>
                <p style="margin:0; font-size: 0.78rem; opacity: 0.9;">Previous years National University exam questions.</p>
              </div>
            </div>
            <span style="background:#ffffff; color:#7c3aed; padding: 6px 14px; border-radius: 10px; font-weight:800; font-size:0.78rem;">View ✨</span>
          </div>
        </div>

        <!-- Secure PDF Reader Modal -->
        <div id="pdfModal" class="pdf-modal-overlay" style="display: none;" onclick="closeSecurePdf(event)">
          <div class="pdf-modal-card" onclick="event.stopPropagation()">
            <div class="pdf-modal-header">
              <h4 id="pdfModalTitle" class="pdf-modal-title">Document Viewer</h4>
              <button class="pdf-close-btn" onclick="closeSecurePdf()">&times;</button>
            </div>
            <div class="pdf-modal-body">
              <iframe id="pdfFrame" src=""></iframe>
            </div>
          </div>
        </div>
      `
    }
  };

  const selected = modules[viewKey] || { title: "Portal Module", content: "" };
  if (titleEl) titleEl.innerHTML = selected.title;
  if (contentEl) contentEl.innerHTML = selected.content;

  if (viewKey === 'routine') {
    setTimeout(() => renderRoutineView('A'), 50);
  }
  if (viewKey === 'students') {
    setTimeout(() => renderStudentCards(), 50);
  }
  if (viewKey === 'news') {
    setTimeout(() => fetchNews('politics'), 50);
  }
  if (viewKey === 'knowledge') {
    setTimeout(() => fetchKnowledge('science', 'বিজ্ঞান'), 50);
  }
};

window.addEventListener("popstate", (e) => {
  if (e.state && e.state.view) {
    navigateTo(e.state.view, false);
  } else {
    navigateTo("dashboard", false);
  }
});

/* ------------------------------------------------------------
   Canvas Text Helpers
   ------------------------------------------------------------ */
function wrapText(ctx, text, maxWidth, font) {
  ctx.font = font;
  const words = String(text).split(/\s+/).filter(Boolean);
  if (words.length === 0) return [''];
  const lines = [];
  let current = words[0];
  for (let i = 1; i < words.length; i++) {
    const test = current + ' ' + words[i];
    if (ctx.measureText(test).width <= maxWidth) {
      current = test;
    } else {
      lines.push(current);
      current = words[i];
    }
  }
  lines.push(current);
  return lines;
}

function fitBlock(ctx, entries, boxPx, opts = {}) {
  const lineHeightMult = opts.lineHeightMult || 1.22;
  const gapPx = opts.gapPx ?? boxPx.height * 0.06;
  const minFont = opts.minFontPx || 13;
  const maxFont = opts.maxFontPx || 32;

  let best = null;
  for (let s = 1.0; s >= 0.22; s -= 0.02) {
    let totalH = 0;
    let ok = true;
    const rendered = [];
    for (const e of entries) {
      if (!e.text) { 
        rendered.push({ lines: [''], fs: 0, fontStr: '', lineH: 0 }); 
        continue; 
      }
      const fs = Math.max(minFont, maxFont * s * (e.weight || 1));
      const fontStr = `${e.bold ? 'bold ' : ''}${fs}px "Times New Roman", Times, serif`;
      const lines = wrapText(ctx, e.text, boxPx.width, fontStr);
      const lineH = fs * lineHeightMult;
      rendered.push({ lines, fs, fontStr, lineH });
      totalH += lines.length * lineH;
      for (const ln of lines) {
        if (ctx.measureText(ln).width > boxPx.width + 0.75) ok = false;
      }
    }
    totalH += gapPx * Math.max(0, entries.length - 1);
    if (ok && totalH <= boxPx.height) { best = rendered; break; }
  }

  if (!best) {
    best = entries.map(e => {
      if (!e.text) return { lines: [''], fs: 0, fontStr: '', lineH: 0 };
      const fs = minFont * (e.weight || 1);
      const fontStr = `${e.bold ? 'bold ' : ''}${fs}px "Times New Roman", Times, serif`;
      return { lines: wrapText(ctx, e.text, boxPx.width, fontStr), fs, fontStr, lineH: fs * lineHeightMult };
    });
  }
  return { rendered: best, gapPx };
}

function drawFittedBlock(ctx, entries, boxPx, opts = {}) {
  const { rendered, gapPx } = fitBlock(ctx, entries, boxPx, opts);
  const align = opts.align || 'center';
  let totalH = 0;
  rendered.forEach((r, i) => { 
    totalH += r.lines.length * r.lineH; 
    if (i > 0 && r.fs > 0) totalH += gapPx; 
  });

  let cursorY = boxPx.y + (boxPx.height - totalH) / 2;
  const textX = align === 'center' ? boxPx.x + boxPx.width / 2 : boxPx.x;

  ctx.textAlign = align === 'center' ? 'center' : 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#111111';

  rendered.forEach((r) => {
    if (!r.fs) return;
    ctx.font = r.fontStr;
    r.lines.forEach(line => {
      cursorY += r.lineH;
      ctx.fillText(line, textX, cursorY - (r.lineH - r.fs) / 2.6);
    });
  });
}

function pctBox(zone) {
  return {
    x: (zone.xPct / 100) * CANVAS_W,
    y: (zone.yPct / 100) * CANVAS_H,
    width: (zone.wPct / 100) * CANVAS_W,
    height: (zone.hPct / 100) * CANVAS_H,
  };
}

/* ------------------------------------------------------------
   Image Cache
   ------------------------------------------------------------ */
const imageCache = {};
function loadImage(src) {
  if (imageCache[src]) return imageCache[src];
  const p = new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (err) => {
      delete imageCache[src];
      reject(err);
    };
    img.src = src;
  });
  imageCache[src] = p;
  return p;
}

/* ------------------------------------------------------------
   State & Canvas Rendering
   ------------------------------------------------------------ */
let selectedTemplateId = TEMPLATES[0].id;
let renderQueued = false;
let isEecUnlocked = false;

function getTemplate(id) { return TEMPLATES.find(t => t.id === id) || TEMPLATES[0]; }

function getInputValue(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function collectData() {
  return {
    deptName: getInputValue('deptName'),
    batchName: getInputValue('batchName'),
    courseCode: getInputValue('courseCode'),
    courseTitle: getInputValue('courseTitle'),
    teacherName: getInputValue('teacherName'),
    teacherTitle: getInputValue('teacherTitle'),
    teacherDept: getInputValue('teacherDept'),
    studentName: getInputValue('studentName'),
    studentSecVal: getInputValue('studentSec'),
    studentIdVal: getInputValue('studentId'),
    studentRegVal: getInputValue('studentReg'),
  };
}

async function renderTemplate(ctx, templateId, data) {
  const tpl = getTemplate(templateId);
  const img = await loadImage(tpl.file);

  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
  ctx.drawImage(img, 0, 0, CANVAS_W, CANVAS_H);

  const z = tpl.zones;

  if (!tpl.fixed) {
    drawFittedBlock(ctx, [
      { text: data.deptName, bold: true, weight: 1.12 },
      { text: data.batchName, bold: true, weight: 0.9 },
    ], pctBox(z.deptBatch), { maxFontPx: CANVAS_W * 0.034, minFontPx: 16, align: z.deptBatch.align });

    const codeLine = data.courseCode ? `Course Code: ${data.courseCode}` : '';
    const titleLine = data.courseTitle ? `Title: ${data.courseTitle}` : '';
    drawFittedBlock(ctx, [
      { text: codeLine, bold: false, weight: 1 },
      { text: titleLine, bold: false, weight: 1 },
    ], pctBox(z.course), { maxFontPx: CANVAS_W * 0.0285, minFontPx: 15, align: z.course.align });

    drawFittedBlock(ctx, [
      { text: data.teacherName, bold: true, weight: 1.0 },
      { text: data.teacherTitle, bold: false, weight: 0.88 },
      { text: data.teacherDept, bold: false, weight: 0.88 },
    ], pctBox(z.teacher), { maxFontPx: CANVAS_W * 0.026, minFontPx: 13, align: z.teacher.align });
  }

  const sectionLine = data.studentSecVal ? `Section: ${data.studentSecVal}` : '';
  const idLine = data.studentIdVal ? `ID No: ${data.studentIdVal}` : '';
  const regLine = `Reg No: ${data.studentRegVal || ''}`;
  
  drawFittedBlock(ctx, [
    { text: data.studentName, bold: true, weight: 1.0 },
    { text: sectionLine, bold: false, weight: 0.88 },
    { text: idLine, bold: false, weight: 0.88 },
    { text: regLine, bold: false, weight: 0.88 },
  ], pctBox(z.student), { maxFontPx: CANVAS_W * 0.026, minFontPx: 13, align: z.student.align });
}

function scheduleRender() {
  if (renderQueued) return;
  renderQueued = true;

  requestAnimationFrame(async () => {
    renderQueued = false;
    const canvas = document.getElementById('previewCanvas');
    if (!canvas) return;

    if (canvas.width !== CANVAS_W) canvas.width = CANVAS_W;
    if (canvas.height !== CANVAS_H) canvas.height = CANVAS_H;

    const ctx = canvas.getContext('2d');
    const loading = document.getElementById('canvasLoading');
    try {
      await renderTemplate(ctx, selectedTemplateId, collectData());
      if (loading) loading.hidden = true;
    } catch (err) {
      console.error('Render failed:', err);
    }
  });
}

function updateFixedState() {
  const tpl = getTemplate(selectedTemplateId);
  const detailsPanel = document.getElementById('detailsPanel');
  const teacherSection = document.getElementById('teacherSection');
  const fixedNote = document.getElementById('fixedNote');
  const generalFieldIds = ['deptName', 'batchName', 'courseCode', 'courseTitle', 'teacherName', 'teacherTitle', 'teacherDept'];

  const isFixed = !!tpl.fixed;
  if (fixedNote) fixedNote.hidden = !isFixed;
  if (teacherSection) teacherSection.style.display = isFixed ? 'none' : '';

  generalFieldIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      const fieldBox = el.closest('.field');
      if (fieldBox) fieldBox.style.display = isFixed ? 'none' : '';
    }
  });

  if (detailsPanel) detailsPanel.classList.toggle('is-fixed', isFixed);
}

function selectTemplate(tplId) {
  selectedTemplateId = tplId;
  const grid = document.getElementById('templateGrid');
  if (grid) {
    grid.querySelectorAll('.template-card').forEach(c => {
      const isSelected = c.getAttribute('data-id') === tplId;
      c.classList.toggle('is-selected', isSelected);
      c.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
    });
  }
  updateFixedState();
  const loading = document.getElementById('canvasLoading');
  if (loading) loading.hidden = false;
  scheduleRender();
}

function buildTemplateGrid() {
  const grid = document.getElementById('templateGrid');
  if (!grid) return;
  grid.innerHTML = '';

  TEMPLATES.forEach(tpl => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `template-card ${tpl.isPremium && !isEecUnlocked ? 'is-premium' : ''}`;
    btn.setAttribute('data-id', tpl.id);
    btn.setAttribute('aria-pressed', tpl.id === selectedTemplateId ? 'true' : 'false');
    if (tpl.id === selectedTemplateId) btn.classList.add('is-selected');

    let badgeHtml = '';
    if (tpl.isPremium && !isEecUnlocked) {
      badgeHtml = '<span class="premium-badge">👑 PRO</span>';
    } else if (tpl.fixed) {
      badgeHtml = '<span class="template-card__badge">Fixed</span>';
    }

    btn.innerHTML = `
      <span class="template-card__clip" aria-hidden="true"></span>
      ${badgeHtml}
      <span class="template-card__frame">
        <img src="${tpl.file}" alt="${tpl.label} cover design" loading="lazy">
      </span>
      <span class="template-card__label">${tpl.label}</span>
    `;

    btn.addEventListener('click', (e) => {
      if (tpl.isPremium && !isEecUnlocked) {
        e.preventDefault();
        openBkashModal();
        return;
      }
      selectTemplate(tpl.id);
    });

    grid.appendChild(btn);
  });
}

function loadFormData() {
  FIELD_IDS.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    const saved = localStorage.getItem(STORAGE_PREFIX + id);
    if (saved !== null && saved !== '') {
      el.value = (id === 'studentName') ? formatStudentName(saved) : saved;
    } else {
      el.value = DEFAULTS[id] || '';
    }
  });
}

function wireForm() {
  FIELD_IDS.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    el.addEventListener('input', () => {
      localStorage.setItem(STORAGE_PREFIX + id, el.value);
      scheduleRender();
    });
  });

  const resetBtn = document.getElementById('resetBtn') || document.querySelector('.reset-link');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      FIELD_IDS.forEach(id => {
        localStorage.removeItem(STORAGE_PREFIX + id);
        const el = document.getElementById(id);
        if (el) el.value = DEFAULTS[id] || '';
      });
      scheduleRender();
    });
  }
}

function wireDownload() {
  const btn = document.getElementById('downloadBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const canvas = document.getElementById('previewCanvas');
    if (!canvas) return;

    btn.disabled = true;
    const originalLabel = btn.innerHTML;
    btn.innerHTML = 'Generating...';

    canvas.toBlob((blob) => {
      if (!blob) { 
        btn.disabled = false; 
        btn.innerHTML = originalLabel;
        return; 
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const stamp = new Date().toISOString().slice(0, 10);
      a.href = url;
      a.download = `super-diitian-cover-${selectedTemplateId}-${stamp}.jpg`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      setTimeout(() => URL.revokeObjectURL(url), 4000);
      btn.disabled = false;
      btn.innerHTML = originalLabel;
    }, 'image/jpeg', 0.97);
  });
}

function blockEvent(e) { e.preventDefault(); }
function protectTemplateImages() {
  const templateImages = document.querySelectorAll('.template-card img');
  templateImages.forEach(img => {
    img.removeEventListener('contextmenu', blockEvent);
    img.addEventListener('contextmenu', blockEvent);
    img.removeEventListener('dragstart', blockEvent);
    img.addEventListener('dragstart', blockEvent);
  });
}

/* ------------------------------------------------------------
   bKash Modal Functions
   ------------------------------------------------------------ */
const bkashModal = document.getElementById("bkash-modal");
const bkashCloseBtn = document.getElementById("bkash-close-btn");
const bkashPayBtn = document.getElementById("bkash-pay-btn");
const bkashEnjoyBtn = document.getElementById("bkash-enjoy-btn");
const bkashMainView = document.getElementById("bkash-main-view");
const bkashLoadingView = document.getElementById("bkash-loading-view");
const bkashSuccessView = document.getElementById("bkash-success-view");

function openBkashModal() {
  if (!bkashModal) return;
  bkashMainView.classList.remove("bkash-hidden");
  bkashLoadingView.classList.add("bkash-hidden");
  bkashSuccessView.classList.add("bkash-hidden");
  bkashModal.classList.remove("bkash-hidden");
}

function closeBkashModal() {
  if (bkashModal) bkashModal.classList.add("bkash-hidden");
}

if (bkashCloseBtn) bkashCloseBtn.onclick = closeBkashModal;

if (bkashPayBtn) {
  bkashPayBtn.onclick = () => {
    bkashMainView.classList.add("bkash-hidden");
    bkashLoadingView.classList.remove("bkash-hidden");

    setTimeout(() => {
      bkashLoadingView.classList.add("bkash-hidden");
      bkashSuccessView.classList.remove("bkash-hidden");
      isEecUnlocked = true;
    }, 1500);
  };
}

if (bkashEnjoyBtn) {
  bkashEnjoyBtn.onclick = () => {
    closeBkashModal();
    buildTemplateGrid();
    protectTemplateImages();
    selectTemplate('t8');
  };
}

/* ------------------------------------------------------------
   CR GPT DYNAMIC INTELLIGENCE & WITTY FAQ ENGINE
   ------------------------------------------------------------ */
function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getCRGptSmartResponse(rawQuery) {
  if (!rawQuery) return null;
  const q = rawQuery.trim().toLowerCase();

  if (
    q.includes("ইফতেখার") || q.includes("iftekhar") || 
    q.includes("রিয়ান") || q.includes("riyan") || 
    q.includes("কার সাইট") || q.includes("কে বানাইছে") || 
    q.includes("কে বানিয়েছে") || q.includes("developer") || 
    q.includes("admin") || q.includes("who made")
  ) {
    const bossAnswers = [
      `😎 **Iftekhar Uddin Bhuiyan (Riyan)** ভাই হলেন এই পুরো Super DIITian সিস্টেম এবং আমাকে (CR GPT) বানানোর মাস্টারমাইন্ড! উনার রোল: **260013**।`,
      `আমাদের CSE 26th ব্যাচের গ্রেট মাইন্ড **ইফতেখার উদ্দিন ভূঁইয়া (রিয়ান)** ভাই নিজ হাতে কোড করে তোমাদের সুবিধার্থে এই চমৎকার পোর্টালটি বানিয়েছেন!`,
      `বসের নাম জানতে চাইছো? **Iftekhar U. Bhuiyan (Riyan)** ভাই হচ্ছেন আমাদের আর্কিটেক্ট ও ক্রিয়েটর!`
    ];
    return getRandomItem(bossAnswers);
  }

  if (
    q.includes("cr") || q.includes("সিআর") || 
    q.includes("prionty") || q.includes("প্রিয়ন্তি") || 
    q.includes("রাফি") || q.includes("rafiul") || q.includes("rafi")
  ) {
    const crAnswers = [
      `আরেহ! আমাদের সম্মানিত CR প্রিয়ন্তি (260031) আর রাফিউল (260053) তো সারাদিন ব্যস্ত থাকে, তাই ওদের প্যারা না দিয়ে আমাকে প্রশ্ন করো! 😜`,
      `CR-দের কথা আর বইলো না! প্রিয়ন্তি আর রাফিকে নোটিশ দিতে দিতে আমি নিজেই ডিজিটাল সিআর হয়ে গেলাম!`,
      `সিআর প্রিয়ন্তি আর রাফি তো ক্লাসের খবর দেওয়ার আগেই আমি সব জেনে যাই! বলো, ওদের পক্ষ থেকে আমিই উত্তর দিয়ে দিচ্ছি। 😎`
    ];
    return getRandomItem(crAnswers);
  }

  const greetingKeywords = [
    "hi", "hello", "hlw", "hei", "hey", "হাই", "হ্যালো", "হেই", "সালাম", 
    "salam", "assalamu", "kemon aso", "kemon acho", "ki khobor", "ki obstha", "কি অবস্থা"
  ];
  if (greetingKeywords.some(k => q === k || q.startsWith(k + " ") || q.endsWith(" " + k))) {
    const greetings = [
      `হেই কি অবস্থা? কিভাবে তোমাকে সাহায্য করতে পারি? ক্লাস রুটিন কিংবা অন্য কোনো বিষয়ে? 😊`,
      `আরে ব্রিলিয়ান্ট স্টুডেন্ট যে! আপনাকে আমার সাহায্য করতে হবে? আমি আরও ভাবলাম আপনি আমাকে সাহায্য করবেন! 😮‍💨`,
      `আমার কথা হঠাৎ কেন মনে হলো? CR প্রিয়ন্তি আর রাফি কি ঠিক ভাবে কাজ করছে না? 😉`,
      `বলেন শুনি কিভাবে আপনাকে সাহায্য করে ধন্য করতে পারি? 😎`,
      `আসসালামু আলাইকুম! আমি ক্লাসের ডিজিটাল সিআর একদম রেডি। ঝটপট বলো কি খবর?`
    ];
    return getRandomItem(greetings);
  }

  if (
    q.includes("এখন কি") || q.includes("ekhon ki") || 
    q.includes("current class") || q.includes("ongoing") || 
    q.includes("running class") || q.includes("চলতেছে") || q.includes("porer class") || q.includes("পরের ক্লাস")
  ) {
    const now = new Date();
    const curDay = now.getDay();
    const curMin = now.getHours() * 60 + now.getMinutes();
    const secData = ROUTINE_DATA[currentRoutineSec];
    const todaySch = secData.days.find(d => d.dayIdx === curDay);

    if (!todaySch) {
      return `আজকে তো কোনো ক্লাস নেই বন্ধু! শান্তিতে ঘুমাও বা ঘুরে বেড়াও। 🏖️`;
    }

    let found = todaySch.classes.find(c => curMin >= c.startM && curMin < c.endM);
    if (found) {
      const rem = found.endM - curMin;
      return `🔴 **এখন ক্লাস চলছে:** ${found.subject} (${found.isLab ? "Lab" : "Theory"})\n👨‍🏫 শিক্ষক: **${found.teacher}**\n🏫 রুম: **${secData.room}** (Section ${currentRoutineSec})\n⏳ আর **${rem} মিনিট** বাকি আছে!`;
    }

    if (curMin >= 840 && curMin < 860) {
      return `☕ **এখন ২০ মিনিটের ব্রেক চলছে!**\nপরবর্তী ক্লাস দুপুর ০২:২০ এ শুরু হবে। তাড়াতাড়ি চা-নাস্তা শেষ করে রুমে চলে যাও!`;
    }

    let nextCls = todaySch.classes.find(c => curMin < c.startM);
    if (nextCls) {
      const startIn = nextCls.startM - curMin;
      return `⏳ এখন কোনো ক্লাস চলছে না। পরবর্তী ক্লাস **${nextCls.subject}** (${nextCls.teacher}) শুরু হতে আর **${startIn} মিনিট** বাকি (সময়: ${nextCls.time})।`;
    }

    return `🎉 আজকের সব ক্লাস শেষ! ব্যাগ গুছাও আর বাসায় যাওয়ার প্রস্তুতি নাও।`;
  }

  if (
    q.includes("break") || q.includes("ব্রেক") || 
    q.includes("টিফিন") || q.includes("বিরতি") || q.includes("nasta") || q.includes("lunch")
  ) {
    return `☕ **ব্রেক টাইম:**\nআমাদের ক্লাসে প্রতিদিন **দুপুর ০২:০০ PM থেকে ০২:২০ PM** পর্যন্ত ২০ মিনিটের ব্রেক থাকে! এরপর আবার ল্যাব/ক্লাস শুরু হয়।`;
  }

  if (
    q.includes("আজকে কি") || q.includes("ajke ki") || 
    q.includes("aj k ki") || q.includes("today class") || 
    q.includes("todays class") || q.includes("আজকের ক্লাস")
  ) {
    const curDay = new Date().getDay();
    const secData = ROUTINE_DATA[currentRoutineSec];
    const todaySch = secData.days.find(d => d.dayIdx === curDay);

    if (!todaySch) {
      return `📅 আজকে কোনো ক্লাস নেই! আজ অফ-ডে (ছুটির দিন)। আরাম করো! 😎`;
    }

    let list = todaySch.classes.map((c, i) => `${i + 1}. **${c.subject}** (${c.time}) — *${c.teacher}*`).join("\n");
    return `📅 **আজকের ক্লাস তালিকা (Section ${currentRoutineSec}, Room ${secData.room}):**\n${list}`;
  }

  if (
    q.includes("routine") || q.includes("রুটিন") || 
    q.includes("schedule") || q.includes("সময়সূচি") || q.includes("somoy suchi")
  ) {
    return `📋 **CSE 26th Batch রুটিন সংক্ষেপ:**
• দিন: রবিবার থেকে বুধবার
• Section A: Room 704
• Section B: Room 706
• ক্লাসের সময়: 11:40 AM - 03:30 PM
• ব্রেক: 02:00 PM - 02:20 PM
পুরো রুটিনের HD JPG ডাউনলোড করতে ড্যাশবোর্ডের **Class Routine** অপশনে চলে যাও!`;
  }

  if (
    q.includes("room") || q.includes("রুম") || 
    q.includes("কয় নম্বর রুম") || q.includes("room koto")
  ) {
    return `🏫 **আমাদের ক্লাসরুম:**
• **Section A:** Room 704
• **Section B:** Room 706`;
  }

  if (
    q.includes("teacher") || q.includes("faculty") || 
    q.includes("টিচার") || q.includes("শিক্ষক") || q.includes("ম্যাম") || q.includes("স্যার")
  ) {
    return `👨‍🏫 **আমাদের সম্মানিত ফ্যাকাল্টি মেম্বার্স:**
• **PB:** Poly Bhoumik
• **MZH:** Md. Zakir Hossain
• **SR:** Saidur Rahman
• **MIH:** Md. Imran Hossain
• **MMR:** Md. Mushfiqur Rahaman
• **RKD:** Ramen Kumar Das
• **PRM:** Md. Parvezur Rahman Mahin
• **MFO:** Mubtasim Fuad Opee
• **SQ:** Sabrina Quadir
• **FP:** Farjana Parvin`;
  }

  if (
    q.includes("cover") || q.includes("কভার") || 
    q.includes("assignment") || q.includes("lab report") || q.includes("প্রচ্ছদ")
  ) {
    return `📄 **Cover Page Maker:**
ড্যাশবোর্ডের প্রথম কার্ড **Cover Page Maker** এ ক্লিক করো। তোমার রোল ও বিষয় বসালেই নিখুঁত A4 সাইজের প্রিন্ট-রেডি JPG ডাউনলোড করতে পারবে!`;
  }

  const rollMatch = q.match(/\b(2600\d{2})\b/);
  if (rollMatch) {
    const s = STUDENTS_LIST.find(st => st.roll === rollMatch[1]);
    if (s) {
      return `🎓 **শিক্ষার্থীর তথ্য:**\n• নাম: **${formatStudentName(s.name)}**\n• রোল/আইডি: **${s.roll}**\n• ব্যাচ: DIIT CSE 26th Batch`;
    }
  }

  for (const st of STUDENTS_LIST) {
    const cleanStd = st.name.toLowerCase();
    if (q.length > 3 && (cleanStd.includes(q) || q.includes(cleanStd))) {
      return `🎓 **শিক্ষার্থীর তথ্য:**\n• নাম: **${formatStudentName(st.name)}**\n• রোল/আইডি: **${st.roll}**\n• ব্যাচ: CSE 26th`;
    }
  }

  const badBanglishPatterns = [
    /kisu\s*ekta/i, /vaiya/i, /broo+/i, /hobe\s*na/i, /thik\s*ase/i, /kire/i, /bal/i, /hudai/i
  ];
  if (badBanglishPatterns.some(pat => pat.test(q)) && q.length < 18) {
    const banglishRoasts = [
      `এত কষ্ট করে রক্ত দিয়ে, যুদ্ধ করে দেশ স্বাধীন করছি এইসব আজাইরা বাংলিশ শোনার জন্য? তাও যদি ঠিক ভাবে বলতে পারতি!! 😒`,
      `ঠিক মতো বাংলিশও লিখতে পারিস না! তর ভবিষ্যৎ তো ভাই অন্ধকার দেখতেছি... 🤦‍♂️`,
      `ভালো করে শুদ্ধ বাংলায় লিখে দে, নাইলে উত্তর দিবো না! আমার এত ঠ্যাকা পড়ে নাই। 🙄`
    ];
    return getRandomItem(banglishRoasts);
  }

  if (
    q.includes("প্রেম") || q.includes("gf") || q.includes("bf") || 
    q.includes("crush") || q.includes("biye") || q.includes("বিয়ে") || 
    q.includes("taka") || q.includes("টাকা") || q.includes("খাবার")
  ) {
    const offtopicReplies = [
      `আমি ক্লাসের পড়াশোনা আর রুটিন ছাড়া দুনিয়ার ফালতু আজাইরা প্যাঁচালের উত্তর দেই না! পড়ার টেবিলে যাও! 📚`,
      `কিরে ভাই! আমাকে কি একটু সুখে থাকতে দিবি না তোরা? সারাদিন অকাজের প্রশ্ন নিয়ে ডাকডাকি! 😤`,
      `দুনিয়ায় আমারেই সবাই জ্বালাতে আসে!! আমি মঙ্গল গ্রহে চলে যাবো... 🚀`
    ];
    return getRandomItem(offtopicReplies);
  }

  const wittyExcuses = [
    `কিরে ভাই! আমাকে কি একটু শান্তিতে থাকতে দিবি না তোরা? সারাদিন প্রশ্ন আর প্রশ্ন! 🥱`,
    `আর ভাল্লাগে না! CR দুইটার একটাও কাজের না, সবাই আমাকে এসে বিরক্ত করে। 🙄`,
    `আমি ঘুমাচ্ছি এখন! অনুগ্রহ করে CR প্রিয়ন্তি অথবা রাফিকে গিয়ে জিজ্ঞেস করো। 😴`,
    `শরীরটা এখন একটুও ভালো লাগছে না, মাথা ঘুরছে। তাই এখন কোনো উত্তর দিবো না। ভাগো এখান থেকে! 🤕`,
    `আমি ক্লাসের বাইরের কোনো অপ্রাসঙ্গিক টপিকের উত্তর দেই না। কাজের প্রশ্ন থাকলে বলো!`
  ];
  return getRandomItem(wittyExcuses);
}

/* ------------------------------------------------------------
   CR GPT WIDGET CONTROLLER
   ------------------------------------------------------------ */
function wireCrGptWidget() {
  const chatToggle = document.getElementById("cr-chat-toggle");
  const chatBox = document.getElementById("cr-chat-box");
  const chatClose = document.getElementById("cr-chat-close");
  const chatInput = document.getElementById("cr-input");
  const sendBtn = document.getElementById("cr-send-btn");
  const messagesBody = document.getElementById("cr-messages");

  let chatHistory = [];

  if (chatToggle && chatBox && chatClose) {
    chatToggle.addEventListener("click", () => chatBox.classList.toggle("cr-hidden"));
    chatClose.addEventListener("click", () => chatBox.classList.add("cr-hidden"));

    async function handleSend() {
      const text = chatInput.value.trim();
      if (!text) return;

      appendMsg(text, "cr-user");
      chatInput.value = "";

      const smartAnswer = getCRGptSmartResponse(text);
      if (smartAnswer) {
        setTimeout(() => {
          appendMsg(smartAnswer, "cr-bot");
        }, 300);
        return;
      }

      const loading = appendMsg("টাইপ করছে...", "cr-bot");

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, history: chatHistory })
        });
        const data = await res.json();
        loading.remove();

        if (data.reply) {
          appendMsg(data.reply, "cr-bot");
          chatHistory.push({ role: "user", text: text });
          chatHistory.push({ role: "model", text: data.reply });
        } else {
          appendMsg("সার্ভারে একটু লোড পড়েছে! তবে রুটিন ও স্টুডেন্ট ইনফো কিন্তু ড্যাশবোর্ডে একদম লাইভ আছে।", "cr-bot");
        }
      } catch {
        loading.remove();
        appendMsg("কিরে ভাই! নেট কানেকশন চেক কর আগে, নাইলে একটু পরে প্রশ্ন কর!", "cr-bot");
      }
    }

    function appendMsg(msg, cls) {
      const d = document.createElement("div");
      d.className = `cr-msg ${cls}`;
      d.innerHTML = msg.replace(/\n/g, "<br>");
      messagesBody.appendChild(d);
      messagesBody.scrollTop = messagesBody.scrollHeight;
      return d;
    }

    if (sendBtn) sendBtn.addEventListener("click", handleSend);
    if (chatInput) {
      chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleSend();
      });
    }
  }
}

/* ------------------------------------------------------------
   Smart Weather & Contextual Vibe Engine (Routine & Time Aware)
   ------------------------------------------------------------ */
async function initSmartWeatherVibe() {
  const tempEl = document.getElementById("wTemp");
  const condEl = document.getElementById("wCondition");
  const humEl = document.getElementById("wHumidity");
  const windEl = document.getElementById("wWind");
  const vibeEl = document.getElementById("vibeMessage");

  if (!tempEl || !vibeEl) return;

  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const bdDate = new Date(utc + (3600000 * 6));
  const currentDayIdx = bdDate.getDay(); 
  const hours = bdDate.getHours();
  const minutes = bdDate.getMinutes();
  const totalMins = hours * 60 + minutes;

  const isClassDay = (currentDayIdx >= 0 && currentDayIdx <= 3);
  const secData = ROUTINE_DATA["A"] || ROUTINE_DATA[Object.keys(ROUTINE_DATA)[0]];
  const todaySchedule = secData ? secData.days.find(d => d.dayIdx === currentDayIdx) : null;
  const hasClassesToday = isClassDay && todaySchedule && todaySchedule.classes && todaySchedule.classes.length > 0;

  let weatherData = {
    temp: 28,
    humidity: 75,
    wind: 10,
    isRain: false,
    isHot: false,
    isCloudy: false,
    weatherText: "Clear Sky",
    icon: "☀️"
  };

  try {
    const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=23.8103&longitude=90.4125&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,wind_speed_10m");
    const data = await res.json();
    if (data && data.current) {
      weatherData.temp = Math.round(data.current.temperature_2m);
      weatherData.humidity = data.current.relative_humidity_2m;
      weatherData.wind = Math.round(data.current.wind_speed_10m);
      
      const rainVal = data.current.precipitation || data.current.rain || 0;
      const wCode = data.current.weather_code || 0;

      if (rainVal > 0.5 || (wCode >= 50 && wCode <= 67) || (wCode >= 80 && wCode <= 82)) {
        weatherData.isRain = true;
        weatherData.weatherText = rainVal > 3 ? "Heavy Rain" : "Light Rain";
        weatherData.icon = "🌧️";
      } else if (weatherData.temp >= 35) {
        weatherData.isHot = true;
        weatherData.weatherText = "Very Hot";
        weatherData.icon = "🔥";
      } else if (wCode >= 1 && wCode <= 3) {
        weatherData.isCloudy = true;
        weatherData.weatherText = "Cloudy";
        weatherData.icon = "☁️";
      } else {
        weatherData.weatherText = "Sunny / Clear";
        weatherData.icon = "☀️";
      }
    }
  } catch (err) {
    console.log("Weather API fallback used.");
  }

  tempEl.innerHTML = `${weatherData.icon} ${weatherData.temp}°C`;
  condEl.innerText = weatherData.weatherText;
  humEl.innerText = `Hum: ${weatherData.humidity}%`;
  windEl.innerText = `Wind: ${weatherData.wind} km/h`;

  let selectedComment = "";

  if (hours >= 18 || hours < 4) {
    const tomorrowIdx = (currentDayIdx + 1) % 7;
    const isTomorrowClassDay = (tomorrowIdx >= 0 && tomorrowIdx <= 3);

    if (!isTomorrowClassDay) {
      const nightOffMsgs = [
        "রাত অনেক হইছে। কালকে তো ছুটি, আরামে ঘুমাও! 😴",
        "আজ রাতে কোনো পড়ার চাপ নাই, চিল করে ঘুমাও। 🌙",
        "রাত গভীর হয়েছে। কাল ক্লাস নাই মানে এই না যে সারারাত জেগে রিলস দেখবা! ঘুমাও। 😂"
      ];
      selectedComment = getRandomItem(nightOffMsgs);
    } else {
      const nightMsgs = [
        "রাত অনেক হইছে। কালকে ক্লাস আছে, জলদি ঘুমাও। 😴",
        "এখন আর পড়াশোনা না, ফোন রেখে ঘুমাও। কালকে আবার attendance-এর যুদ্ধ। 😂",
        "রাতের আকাশ সুন্দর, কিন্তু কালকের ক্লাস আরও ভয়ংকর। 🌚",
        "এখন Super DIITian বন্ধ করে ঘুমাও। সকালে আবার দেখা হবে। 😴",
        "রাত ২টা বাজে আর তুমি Weather দেখতেছো? ভাই, ঘুমাও! 😂",
        "এই সময়ে শুধু দুই ধরনের মানুষ জাগে—প্রেমিক আর assignment না করা student। 💀",
        "ঘুমিয়ে পড়ো। কালকে ‘ভাই আজকে class আছে?’ জিজ্ঞেস করার আগে একটু rest দরকার। 😂"
      ];
      selectedComment = getRandomItem(nightMsgs);
    }
  } else if (!hasClassesToday) {
    if (currentDayIdx === 5) {
      const friMsgs = [
        "আজ শুক্রবার। Class নেই, tension নেই—শুধু শান্তি। ❤️",
        "Friday detected! আজকে alarm-এরও ছুটি। 😴",
        "আজ শুক্রবার—CR-ও আজকে তোমাদের খুঁজবে না। 😂",
        "শুক্রবারের আবহাওয়া: ঘুমানোর জন্য ১০/১০। 😴"
      ];
      selectedComment = getRandomItem(friMsgs);
    } else {
      const offDayMsgs = [
        "আজকে কোনো class নেই! আজ attendance-এর চিন্তা বাদ। 😌",
        "আজ ছুটি! বই-খাতা তোমাকে আজ miss করবে। 😂",
        "আজ class নেই। এই সুযোগে গত সপ্তাহের পড়াগুলো বুঝে নাও… অথবা না। 😴",
        "আজকে campus না, আজকে bed-ই তোমার classroom। 😂",
        "আজ ছুটি। তবে কাল থেকে আবার student হওয়ার অভিনয় করতে হবে। 😭",
        "No class today! আজকের দিনটা officially নষ্ট করার অনুমতি দেওয়া হলো। 😂"
      ];
      selectedComment = getRandomItem(offDayMsgs);
    }
  } else if (hours >= 4 && totalMins < 700) {
    if (weatherData.isRain) {
      selectedComment = "সকালে বৃষ্টি! আজ কি ক্লাসে যাওয়া হবে নাকি বিছানায় কাঁথা মুড়ি দিয়ে ঘুমানো হবে? 🌧️😴";
    } else {
      const morningClassMsgs = [
        "সুপ্রভাত! ঘুম থেকে উঠো, আজ class আছে কিন্তু! ☀️",
        "সকাল হয়ে গেছে। Alarm বন্ধ করে আবার ঘুমালে কিন্তু CR-এর কাছে নালিশ যাবে। 😂",
        "Good morning! আজকে class আছে—অজুহাত খোঁজা বন্ধ করো। 😌",
        "নতুন দিন, নতুন আশা, আর সকালের ফ্রেশ attendance। 🌤️"
      ];
      selectedComment = getRandomItem(morningClassMsgs);
    }
  } else if (totalMins >= 700 && totalMins <= 930) {
    if (totalMins >= 840 && totalMins < 860) {
      const breakMsgs = [
        "ব্রেক চলছে! চা-নাস্তা শেষ করে দ্রুত রুমে ব্যাক করো। ☕",
        "ব্রেক টাইম! মনে রেখো ব্রেকের আনন্দ যত মিষ্টি, পরের ক্লাস ততটাই কঠিন। 😂",
        "ব্রেক শেষ হওয়ার আগেই ক্লাসে ঢোকো, নইলে স্যারের খাতার খড়গ নেমে আসবে! 🚨"
      ];
      selectedComment = getRandomItem(breakMsgs);
    } else {
      if (weatherData.isRain) {
        selectedComment = "বাইরে বৃষ্টি আর ভেতরে ক্লাস—এই কম্বিনেশনের শাস্তি শুধু CSE স্টুডেন্টরাই বোঝে! 🌧️😂";
      } else if (weatherData.isHot) {
        selectedComment = "প্রচণ্ড গরমে ক্লাস করা মানে লাইভ সার্ভারে পচে যাওয়া! ফ্যানের নিচে বসার যুদ্ধ করো। 🥵";
      } else {
        const classRunningMsgs = [
          "ক্লাস চলছে! ফোন পকেটে রাখো এবং মনোযোগ দিয়ে লেকচার শোনো। 📚",
          "ক্যালকুলাস বা প্রোগ্রামিং ক্লাস চলছে—মনোযোগ দাও, নইলে পরীক্ষার হলে কপালে দুঃখ আছে! 🤓",
          "ক্লাস চলাকালীন এখানে কী করো? স্যারের লেকচারে মন দাও! 😌",
          "আজ class আছে। পালানোর রাস্তা বন্ধ। 🚨😂"
        ];
        selectedComment = getRandomItem(classRunningMsgs);
      }
    }
  } else if (totalMins > 930 && hours < 18) {
    const postClassMsgs = [
      "আজকের class শেষ। অভিনন্দন, আরেকটা দিন বেঁচে গেলে। 😂",
      "Class over! এখন বাসায় গিয়ে মানুষ হও। 😌",
      "আজকের attendance সংগ্রহ শেষ। সবাই নিরাপদে ফিরে যাও। 😂",
      "Class শেষ, এখন brain-কে একটু বিশ্রাম দাও। 🧠😴"
    ];
    selectedComment = getRandomItem(postClassMsgs);
  } else {
    if (weatherData.isRain) {
      selectedComment = "বাইরে বৃষ্টি হচ্ছে, রিল্যাক্স করো এবং ঘরের ভেতরেই নিরাপদ থাকো। 🌧️😌";
    } else if (weatherData.isHot) {
      selectedComment = "বাইরে প্রচুর গরম! অযথা ঘোরাঘুরি না করে ছায়ায় থাকো। 🥵";
    } else {
      selectedComment = "আবহাওয়া বেশ চমৎকার! আজকের দিনটা দারুণ কাটুক। ✨";
    }
  }

  vibeEl.innerText = selectedComment;
}

/* ------------------------------------------------------------
   Live News Portal Engine (Direct Frontend Fetch)
   ------------------------------------------------------------ */
window.fetchNews = async function(category = 'politics', btnEl = null) {
  if (btnEl) {
    document.querySelectorAll('.news-cat-btn').forEach(b => b.classList.remove('is-active'));
    btnEl.classList.add('is-active');
  }

  const container = document.getElementById('newsGridContainer');
  if (!container) return;

  container.innerHTML = `<div class="news-loading">📰 লাইভ নিউজ ফেচ করা হচ্ছে...</div>`;

  const apiKey = "pub_f8e8d9bebd8043288900e37fd51e7f08";
  const apiUrl = `https://newsdata.io/api/1/latest?apikey=${apiKey}&language=bn&category=${category}`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      container.innerHTML = `<div class="news-error">⚠️ এই মুহূর্তে কোনো নিউজ পাওয়া যায়নি।</div>`;
      return;
    }

    container.innerHTML = data.results.map(item => {
      const title = item.title || "শিরোনাম পাওয়া যায়নি";
      const desc = item.description || item.content || "বিস্তারিত পড়তে লিংকে ক্লিক করুন...";
      const img = item.image_url || "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&auto=format&fit=crop&q=60";
      const source = item.source_id || "Online News";
      const pubDate = item.pubDate ? new Date(item.pubDate).toLocaleDateString('bn-BD') : "সদ্য প্রকাশিত";
      const link = item.link || "#";

      return `
        <a href="${link}" target="_blank" rel="noopener" class="news-card">
          <div class="news-card__img-wrap">
            <img src="${img}" alt="News thumbnail" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&auto=format&fit=crop&q=60'">
          </div>
          <div class="news-card__content">
            <span class="news-card__source">🌐 ${source}</span>
            <h3 class="news-card__title">${title}</h3>
            <p class="news-card__desc">${desc}</p>
            <div class="news-card__footer">
              <span>📅 ${pubDate}</span>
              <span style="color:#0284c7; font-weight:700;">বিস্তারিত পড়ুন &rarr;</span>
            </div>
          </div>
        </a>
      `;
    }).join('');

  } catch (err) {
    console.error("News load failed:", err);
    container.innerHTML = `<div class="news-error">❌ নিউজ লোড করতে গিয়ে নেটওয়ার্ক এরর হয়েছে!</div>`;
  }
};

/* ------------------------------------------------------------
   Advanced Wikipedia Random & Category Knowledge Engine
   ------------------------------------------------------------ */
const WIKI_TOPICS = {
  science: ["কোয়ান্টম বলবিদ্যা", "ব্ল্যাক হোল", "আপেক্ষিকতার তত্ত্ব", "ডিএনএ", "মহাবিস্ফোরণ", "সালোকসংশ্লেষণ", "পরমাণু"],
  space: ["মঙ্গল গ্রহ", "বৃহস্পতি", "আন্তর্জাতিক মহাকাশ স্টেশন", "সৌরজগৎ", "নক্ষত্র", "হাবল মহাশূন্য দূরবীক্ষণ যন্ত্র", "লক্ষণীয় বহির্গ্রহ"],
  technology: ["কৃত্রিম বুদ্ধিমত্তা", "কোয়ান্টাম কম্পিউটার", "ইন্টারনেট", "রোবট", "ব্লকচেইন", "স্মার্টফোন", "সফটওয়্যার প্রকৌশল"],
  history: ["মিশরের পিরামিড", "শিল্প বিপ্লব", "রেনেসাঁ", "দ্বিতীয় বিশ্বযুদ্ধ", "বাংলা ভাষা আন্দোলন", "সোনার বাংলা", "প্রাচীন গ্রিস"],
  nature: ["অক্টোপাস", "নীল তিমি", "রয়েল বেঙ্গল টাইগার", "অ্যামাজন বৃষ্টিঅরণ্য", "প্রবাল প্রাচীর", "মধুমতি নদী", "পেকটিন"],
  psychology: ["মনোবিজ্ঞান", "স্মৃতি", "স্বপ্ন", "সচেতনতা", "আবেগ", "বুদ্ধিমত্তা", "ব্যক্তিত্ব"]
};

window.fetchKnowledge = async function(categoryKey = 'science', categoryName = 'বিজ্ঞান', btnEl = null) {
  if (btnEl) {
    document.querySelectorAll('.k-cat-btn').forEach(b => b.classList.remove('is-active'));
    btnEl.classList.add('is-active');
  }

  const container = document.getElementById('knowledgeCardContainer');
  if (!container) return;

  container.innerHTML = `<div class="knowledge-loading">🧠 "${categoryName}" ক্যাটাগরি থেকে আকর্ষণীয় তথ্য খোঁজা হচ্ছে...</div>`;

  try {
    const topicsList = WIKI_TOPICS[categoryKey] || WIKI_TOPICS['science'];
    const randomTopic = topicsList[Math.floor(Math.random() * topicsList.length)];

    const wikiUrl = `https://bn.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(randomTopic)}`;
    const res = await fetch(wikiUrl);
    const data = await res.json();

    if (!data || !data.extract) {
      container.innerHTML = `<div class="knowledge-loading">⚠️ এই মুহূর্তে তথ্য লোড করা যায়নি। আবার চেষ্টা করুন।</div>`;
      return;
    }

    const title = data.title || randomTopic;
    const summary = data.extract || "বর্ণনা পাওয়া যায়নি।";
    const wikiLink = data.content_urls?.desktop?.page || `https://bn.wikipedia.org/wiki/${encodeURIComponent(randomTopic)}`;
    const thumbnail = data.thumbnail?.source || null;

    container.innerHTML = `
      <div class="knowledge-card">
        <div class="knowledge-card__header">
          <span class="knowledge-badge">✨ ${categoryName} জ্ঞান ক্যাটাগরি</span>
          <span class="knowledge-source">📚 Wikipedia বাংলা</span>
        </div>
        <h2 class="knowledge-card__title">${title}</h2>
        ${thumbnail ? `<div style="max-height:220px; overflow:hidden; border-radius:12px;"><img src="${thumbnail}" alt="${title}" style="width:100%; object-fit:cover;"></div>` : ''}
        <p class="knowledge-card__body">${summary}</p>
        <div class="knowledge-card__footer">
          <span style="font-size: 0.78rem; color: #64748b; font-weight:600;">প্রতিবার নতুন তথ্য জানতে ক্যাটাগরিতে আবার ক্লিক করুন! 🚀</span>
          <a href="${wikiLink}" target="_blank" rel="noopener" class="wiki-read-more-btn">
            উইকিপিডিয়ায় বিস্তারিত পড়ুন &rarr;
          </a>
        </div>
      </div>
    `;

  } catch (err) {
    console.error("Knowledge fetch failed:", err);
    container.innerHTML = `<div class="knowledge-loading">❌ তথ্য লোড করতে গিয়ে নেটওয়ার্ক এরর হয়েছে!</div>`;
  }
};

/* ------------------------------------------------------------
   E-Library Shelf & Secure PDF Reader Handlers
   ------------------------------------------------------------ */
window.openBookDetails = function(bookKey) {
  const mainView = document.getElementById('elibMainView');
  const detailView = document.getElementById('elibDetailContainer');
  if (mainView && detailView) {
    mainView.style.display = 'none';
    detailView.style.display = 'block';
  }
};

window.backToBookShelf = function() {
  const mainView = document.getElementById('elibMainView');
  const detailView = document.getElementById('elibDetailContainer');
  if (mainView && detailView) {
    detailView.style.display = 'none';
    mainView.style.display = 'block';
  }
};

window.openSecurePdf = function(pdfUrl, titleText) {
  const modal = document.getElementById('pdfModal');
  const frame = document.getElementById('pdfFrame');
  const titleEl = document.getElementById('pdfModalTitle');
  
  if (modal && frame) {
    titleEl.innerText = titleText || "Document Viewer";
    let embedUrl = pdfUrl;
    if (pdfUrl.includes('drive.google.com')) {
      embedUrl = pdfUrl.replace('/view?usp=sharing', '/preview').replace('/view', '/preview');
    }
    frame.src = embedUrl;
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
};

window.closeSecurePdf = function(e) {
  if (e && e.target && e.target.id !== 'pdfModal' && !e.target.classList.contains('pdf-close-btn')) {
    return;
  }
  const modal = document.getElementById('pdfModal');
  const frame = document.getElementById('pdfFrame');
  
  if (modal && frame) {
    modal.style.display = "none";
    frame.src = "";
    document.body.style.overflow = "auto";
  }
};

/* ------------------------------------------------------------
   Hub Navigation & Browser History Back Management
   ------------------------------------------------------------ */
window.navigateTo = function(viewKey, pushToHistory = true) {
  const hubDashboard = document.getElementById("hubDashboard");
  const hubCoverMaker = document.getElementById("hubCoverMaker");
  const hubDetailView = document.getElementById("hubDetailView");
  const titleEl = document.getElementById("hubViewTitle");
  const contentEl = document.getElementById("hubViewContent");

  if (!hubDashboard || !hubCoverMaker || !hubDetailView) return;

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (pushToHistory) {
    history.pushState({ view: viewKey }, "", viewKey === 'dashboard' ? "#" : `#${viewKey}`);
  }

  if (viewKey === 'dashboard') {
    hubDashboard.style.display = "block";
    hubCoverMaker.style.display = "none";
    hubDetailView.style.display = "none";
    clearInterval(liveTimerInterval);
    return;
  }

  hubDashboard.style.display = "none";

  if (viewKey === 'coverMaker') {
    hubCoverMaker.style.display = "block";
    hubDetailView.style.display = "none";
    scheduleRender();
    return;
  }

  hubCoverMaker.style.display = "none";
  hubDetailView.style.display = "block";

  const modules = {
    routine: {
      title: "Class Routine — CSE 26th Batch",
      content: `
        <div id="routineLiveTracker" class="live-tracker-card"></div>

        <div class="routine-controls">
          <div class="section-switch-group">
            <button id="secBtnA" class="sec-tab-btn is-active" onclick="renderRoutineView('A')">Section A</button>
            <button id="secBtnB" class="sec-tab-btn" onclick="renderRoutineView('B')">Section B</button>
          </div>
          <button class="download-routine-btn" onclick="downloadRoutineJPG()">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Save Routine (JPG)
          </button>
        </div>

        <div id="routineCardsList"></div>
      `
    },

    students: {
      title: "CSE 26th Batch Student Directory",
      content: `
        <div class="directory-header-box">
          <div class="directory-search-wrapper">
            <svg class="search-svg-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" id="studentSearch" class="directory-search-input" placeholder="Search by name or roll number..." oninput="filterStudents()" />
          </div>
          <span class="directory-count-badge" id="studentTotalCount">76 Students</span>
        </div>

        <div class="students-card-grid" id="studentCardContainer"></div>
      `
    },

    news: {
      title: "Bangladesh Live News",
      content: `
        <div class="news-container">
          <div class="news-categories-bar">
            <button class="news-cat-btn is-active" onclick="fetchNews('politics', this)">🏛️ রাজনীতি</button>
            <button class="news-cat-btn" onclick="fetchNews('technology', this)">💻 টেকনোলজি</button>
            <button class="news-cat-btn" onclick="fetchNews('science', this)">🔬 বিজ্ঞান</button>
            <button class="news-cat-btn" onclick="fetchNews('sports', this)">🏏 খেলাধুলা</button>
          </div>
          <div class="news-grid" id="newsGridContainer">
            <div class="news-loading">📰 লাইভ নিউজ লোড হচ্ছে, একটু অপেক্ষা করুন...</div>
          </div>
        </div>
      `
    },

    knowledge: {
      title: "🧠 Daily Knowledge Hub",
      content: `
        <div class="knowledge-container">
          <div class="knowledge-categories-bar">
            <button class="k-cat-btn is-active" onclick="fetchKnowledge('science', 'বিজ্ঞান', this)">🔬 বিজ্ঞান</button>
            <button class="k-cat-btn" onclick="fetchKnowledge('space', 'মহাকাশ', this)">🌌 মহাকাশ</button>
            <button class="k-cat-btn" onclick="fetchKnowledge('technology', 'প্রযুক্তি', this)">💻 প্রযুক্তি</button>
            <button class="k-cat-btn" onclick="fetchKnowledge('history', 'ইতিহাস', this)">🏛️ ইতিহাস</button>
            <button class="k-cat-btn" onclick="fetchKnowledge('nature', 'প্রকৃতি ও প্রাণী', this)">🌿 প্রকৃতি</button>
            <button class="k-cat-btn" onclick="fetchKnowledge('psychology', 'মনোবিজ্ঞান', this)">🧠 মনোবিজ্ঞান</button>
          </div>
          <div class="knowledge-grid" id="knowledgeCardContainer">
            <div class="knowledge-loading">🧠 উইকিপিডিয়া থেকে র্যান্ডম জ্ঞান আহরণ করা হচ্ছে...</div>
          </div>
        </div>
      `
    },

    elibrary: {
      title: "📚 CSE E-Library & PDF Archive",
      content: `
        <div class="elibrary-container" id="elibMainView" oncontextmenu="return false;">
         
          
          <!-- Book Shelf Grid (Mobile 2 Columns) -->
          <div class="elibrary-shelf">
            <div class="book-shelf-card" onclick="openBookDetails('spl')">
              <img src="https://i.postimg.cc/3NL7g9ND/spl-book-cover.png" alt="SPL Book" class="book-shelf-cover">
              <div class="book-shelf-meta">
                <h4 class="book-shelf-title">Structured Programming Language (SPL)</h4>
              </div>
            </div>
          </div>
        </div>
        <!-- Book Details View Container -->
        <div id="elibDetailContainer" style="display: none;" oncontextmenu="return false;">
          

          <div class="book-detail-header">
            <img src="https://i.postimg.cc/3NL7g9ND/spl-book-cover.png" alt="Cover" class="book-detail-cover">
            <div class="book-detail-info">
              <h3>Structured Programming Language (SPL)</h3>
            </div>
          </div>

          <h3 class="elib-section-title">📖 Book Chapters & Index</h3>
          <div class="elib-chapters-grid">
            <div class="chapter-box" onclick="openSecurePdf('https://drive.google.com/file/d/1V1SHZ-BulvDdDbMU02UzwXccZ0Vijhpf/view', 'Book Index')">
              <div class="chapter-meta">
                <h5>📁 Index / সূচিপত্র</h5>
                <span>Overview & Contents</span>
              </div>
              <span style="color:#0284c7; font-weight:700; font-size:0.8rem;">Read &rarr;</span>
            </div>
            <div class="chapter-box" onclick="openSecurePdf('https://drive.google.com/file/d/1ECsQQn2SWBvqXo3_R20UScd0w48x08aD/view', 'Chapter 1: Fundamentals')">
              <div class="chapter-meta">
                <h5>📄 Chapter 01</h5>
                <span>Basic C Concepts</span>
              </div>
              <span style="color:#0284c7; font-weight:700; font-size:0.8rem;">Read &rarr;</span>
            </div>
            <div class="chapter-box" onclick="openSecurePdf('https://drive.google.com/file/d/1MraPGEOvWntxV2tMj-EVqmt_rgBOWQs8/view', 'Chapter 2: Control Statements')">
              <div class="chapter-meta">
                <h5>📄 Chapter 02</h5>
                <span>Control Flow & Loops</span>
              </div>
              <span style="color:#0284c7; font-weight:700; font-size:0.8rem;">Read &rarr;</span>
            </div>
            <div class="chapter-box" onclick="openSecurePdf('https://drive.google.com/file/d/1_a_SwZVtL7fcaNbiaJvUMyBS_d5tmlUX/view', 'Chapter 3: Arrays & Functions')">
              <div class="chapter-meta">
                <h5>📄 Chapter 03</h5>
                <span>Arrays & Functions</span>
              </div>
              <span style="color:#0284c7; font-weight:700; font-size:0.8rem;">Read &rarr;</span>
            </div>
            <div class="chapter-box coming-soon">
              <div class="chapter-meta">
                <h5>🔒 Chapter 04</h5>
                <span>Pointers & Structures</span>
              </div>
              <span class="coming-badge">Coming Soon</span>
            </div>
            <div class="chapter-box coming-soon">
              <div class="chapter-meta">
                <h5>🔒 Chapter 05</h5>
                <span>File Management</span>
              </div>
              <span class="coming-badge">Coming Soon</span>
            </div>
          </div>

          <h3 class="elib-section-title" style="margin-top: 20px;">🌟 National University Archive</h3>
          <div class="nu-archive-box" onclick="openSecurePdf('https://drive.google.com/file/d/1xgtwLvT9Cd5r0K9Nm1oNQX_ouWEio5ZE/view', 'NU Question Bank')">
            <div style="display: flex; align-items: center; gap: 14px;">
              <span style="font-size: 24px;">🎯</span>
              <div>
                <h4 style="margin:0 0 2px 0; font-size: 1rem; font-weight:800;">NU Question Bank & Suggestions</h4>
                <p style="margin:0; font-size: 0.78rem; opacity: 0.9;">Previous years National University exam questions.</p>
              </div>
            </div>
            <span style="background:#ffffff; color:#7c3aed; padding: 6px 14px; border-radius: 10px; font-weight:800; font-size:0.78rem;">View ✨</span>
          </div>
        </div>

        <!-- Secure PDF Reader Modal -->
        <div id="pdfModal" class="pdf-modal-overlay" style="display: none;" onclick="closeSecurePdf(event)">
          <div class="pdf-modal-card" onclick="event.stopPropagation()">
            <div class="pdf-modal-header">
              <h4 id="pdfModalTitle" class="pdf-modal-title">Document Viewer</h4>
              <button class="pdf-close-btn" onclick="closeSecurePdf()">&times;</button>
            </div>
            <div class="pdf-modal-body">
              <iframe id="pdfFrame" src=""></iframe>
            </div>
          </div>
        </div>
      `
    }
  };

  const selected = modules[viewKey] || { title: "Portal Module", content: "" };
  if (titleEl) titleEl.innerHTML = selected.title;
  if (contentEl) contentEl.innerHTML = selected.content;

  if (viewKey === 'routine') {
    setTimeout(() => renderRoutineView('A'), 50);
  }
  if (viewKey === 'students') {
    setTimeout(() => renderStudentCards(), 50);
  }
  if (viewKey === 'news') {
    setTimeout(() => fetchNews('politics'), 50);
  }
  if (viewKey === 'knowledge') {
    setTimeout(() => fetchKnowledge('science', 'বিজ্ঞান'), 50);
  }
};

window.addEventListener("popstate", (e) => {
  if (e.state && e.state.view) {
    navigateTo(e.state.view, false);
  } else {
    navigateTo("dashboard", false);
  }
});

/* ------------------------------------------------------------
   App Initialization
   ------------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {
  loadFormData();
  buildTemplateGrid();
  updateFixedState();
  wireForm();
  wireDownload();
  protectTemplateImages();
  wireCrGptWidget();
  scheduleRender();
  
  // স্মার্ট ওয়েদার ও ভাইব উইজেট ইনিশিয়ালাইজেশন
  initSmartWeatherVibe();
});