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
   Routine Database
   ------------------------------------------------------------ */
const ROUTINE_DATA = {
  A: {
    room: "704",
    days: [
      {
        name: "Sunday",
        classes: [
          { time: "11:40 AM - 12:50 PM", subject: "Calculus", teacher: "MZH", isLab: false },
          { time: "12:50 PM - 02:00 PM", subject: "Structured Programming", teacher: "PB", isLab: false },
          { time: "02:20 PM - 03:30 PM", subject: "Structured Programming Lab", teacher: "PB", isLab: true }
        ]
      },
      {
        name: "Monday",
        classes: [
          { time: "11:40 AM - 12:50 PM", subject: "Calculus", teacher: "MZH", isLab: false },
          { time: "12:50 PM - 02:00 PM", subject: "Electrical & Electronic Circuit", teacher: "RKD", isLab: false },
          { time: "02:20 PM - 03:30 PM", subject: "English", teacher: "SQ", isLab: false }
        ]
      },
      {
        name: "Tuesday",
        classes: [
          { time: "11:40 AM - 12:50 PM", subject: "Electrical & Electronic Circuit", teacher: "RKD", isLab: false },
          { time: "12:50 PM - 02:00 PM", subject: "Physics", teacher: "MFO", isLab: false },
          { time: "02:20 PM - 03:30 PM", subject: "Electrical & Electronic Circuit Lab", teacher: "SR", isLab: true }
        ]
      },
      {
        name: "Wednesday",
        classes: [
          { time: "11:40 AM - 12:50 PM", subject: "English", teacher: "SQ", isLab: false },
          { time: "12:50 PM - 02:00 PM", subject: "Structured Programming", teacher: "PB", isLab: false },
          { time: "02:20 PM - 03:30 PM", subject: "Physics", teacher: "MFO", isLab: false }
        ]
      }
    ]
  },
  B: {
    room: "706",
    days: [
      {
        name: "Sunday",
        classes: [
          { time: "11:40 AM - 12:50 PM", subject: "Physics", teacher: "PRM", isLab: false },
          { time: "12:50 PM - 02:00 PM", subject: "Electrical & Electronic Circuit", teacher: "SR", isLab: false },
          { time: "02:20 PM - 03:30 PM", subject: "Calculus", teacher: "MIH", isLab: false }
        ]
      },
      {
        name: "Monday",
        classes: [
          { time: "11:40 AM - 12:50 PM", subject: "English", teacher: "FP", isLab: false },
          { time: "12:50 PM - 02:00 PM", subject: "Calculus", teacher: "MIH", isLab: false },
          { time: "02:20 PM - 03:30 PM", subject: "Electrical & Electronic Circuit Lab", teacher: "SR", isLab: true }
        ]
      },
      {
        name: "Tuesday",
        classes: [
          { time: "11:40 AM - 12:50 PM", subject: "Electrical & Electronic Circuit", teacher: "SR", isLab: false },
          { time: "12:50 PM - 02:00 PM", subject: "Structured Programming", teacher: "MMR", isLab: false },
          { time: "02:20 PM - 03:30 PM", subject: "Physics", teacher: "PRM", isLab: false }
        ]
      },
      {
        name: "Wednesday",
        classes: [
          { time: "11:40 AM - 12:50 PM", subject: "Structured Programming", teacher: "MMR", isLab: false },
          { time: "12:50 PM - 02:00 PM", subject: "English", teacher: "FP", isLab: false },
          { time: "02:20 PM - 03:30 PM", subject: "Structured Programming Lab", teacher: "MMR", isLab: true }
        ]
      }
    ]
  }
};

let currentRoutineSec = "A";

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
  container.innerHTML = data.days.map(d => `
    <div class="day-card">
      <div class="day-header">
        <span>${d.name}</span>
        <span class="day-room-badge">Room ${data.room}</span>
      </div>
      <div class="period-list">
        ${d.classes.map(c => `
          <div class="period-item ${c.isLab ? 'is-lab' : ''}">
            <div class="period-time">🕒 ${c.time}</div>
            <div class="period-info">
              <span class="period-name">${c.subject}</span>
              <span class="faculty-tag">${c.teacher}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
};

window.downloadRoutine = function() {
  const data = ROUTINE_DATA[currentRoutineSec];
  let text = `DIIT CSE 26th Batch — Section ${currentRoutineSec} Class Schedule\nRoom: ${data.room}\n=========================================\n\n`;

  data.days.forEach(d => {
    text += `[ ${d.name} ]\n`;
    d.classes.forEach(c => {
      text += `  • ${c.time}: ${c.subject} (${c.teacher})\n`;
    });
    text += `\n`;
  });

  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `Routine_CSE26_Section_${currentRoutineSec}.txt`;
  document.body.appendChild(a);
  a.click();
  a.remove();
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
        <div class="routine-controls">
          <div class="section-switch-group">
            <button id="secBtnA" class="sec-tab-btn is-active" onclick="renderRoutineView('A')">Section A</button>
            <button id="secBtnB" class="sec-tab-btn" onclick="renderRoutineView('B')">Section B</button>
          </div>
          <button class="download-routine-btn" onclick="downloadRoutine()">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Save Routine
          </button>
        </div>

        <div id="routineCardsList"></div>

        <div style="margin-top: 24px; padding: 16px; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
          <h4 style="margin: 0 0 10px 0; color: #16232F;">Faculty Reference:</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 8px; font-size: 0.8rem; color: #475569;">
            <div><strong>PB:</strong> Poly Bhoumik</div>
            <div><strong>MZH:</strong> Md. Zakir Hossain</div>
            <div><strong>SR:</strong> Saidur Rahman</div>
            <div><strong>MIH:</strong> Md. Imran Hossain</div>
            <div><strong>MMR:</strong> Md. Mushfiqur Rahaman</div>
            <div><strong>RKD:</strong> Ramen Kumar Das</div>
            <div><strong>PRM:</strong> Md. Parvezur Rahman Mahin</div>
            <div><strong>MFO:</strong> Mubtasim Fuad Opee</div>
            <div><strong>SQ:</strong> Sabrina Quadir</div>
            <div><strong>FP:</strong> Farjana Parvin</div>
          </div>
        </div>
      `
    },

    students: {
      title: "CSE 26th Batch Student Directory",
      content: `
        <div>
          <input type="text" id="studentSearch" class="student-search-box" placeholder="Search by name or roll..." onkeyup="filterStudents()" />
          <div style="overflow-x: auto; max-height: 480px;">
            <table class="custom-table" id="studentTable">
              <thead>
                <tr>
                  <th style="width: 100px;">Roll</th>
                  <th style="text-align: left; padding-left: 20px;">Student Name</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>260001</td><td style="text-align: left; padding-left: 20px;">FAIAZ HOSSAIN FARHAN</td></tr>
                <tr><td>260002</td><td style="text-align: left; padding-left: 20px;">FAIYAZ BIN BAKAR</td></tr>
                <tr><td>260003</td><td style="text-align: left; padding-left: 20px;">MD. JANON</td></tr>
                <tr><td>260004</td><td style="text-align: left; padding-left: 20px;">FAHAD BIN NUR</td></tr>
                <tr><td>260005</td><td style="text-align: left; padding-left: 20px;">TANJILUR RAHMAN</td></tr>
                <tr><td>260006</td><td style="text-align: left; padding-left: 20px;">KHALID BIN SYAM</td></tr>
                <tr><td>260007</td><td style="text-align: left; padding-left: 20px;">LAMYA AKTER EMO</td></tr>
                <tr><td>260009</td><td style="text-align: left; padding-left: 20px;">MD. SAKIB MIA</td></tr>
                <tr><td>260010</td><td style="text-align: left; padding-left: 20px;">MAHENUR RAHMAN</td></tr>
                <tr><td>260011</td><td style="text-align: left; padding-left: 20px;">NAWRIN HOSSAIN OISHI</td></tr>
                <tr><td>260012</td><td style="text-align: left; padding-left: 20px;">MD. NAHID HASAN</td></tr>
                <tr><td>260013</td><td style="text-align: left; padding-left: 20px;">IFTEKHAR UDDIN BHUIYAN</td></tr>
                <tr><td>260014</td><td style="text-align: left; padding-left: 20px;">MEHEDI HASSAN BAPPI</td></tr>
                <tr><td>260015</td><td style="text-align: left; padding-left: 20px;">AYSHA AKTER MISHITA</td></tr>
                <tr><td>260016</td><td style="text-align: left; padding-left: 20px;">TOLI</td></tr>
                <tr><td>260017</td><td style="text-align: left; padding-left: 20px;">SHAMS MAHMUD WALID</td></tr>
                <tr><td>260018</td><td style="text-align: left; padding-left: 20px;">NOUSHIN AHMED</td></tr>
                <tr><td>260019</td><td style="text-align: left; padding-left: 20px;">SAZNIN FERDOUSI OYSHI</td></tr>
                <tr><td>260020</td><td style="text-align: left; padding-left: 20px;">TASFIM MONJABIN</td></tr>
                <tr><td>260021</td><td style="text-align: left; padding-left: 20px;">SYED REJOYAN HAQUE</td></tr>
                <tr><td>260022</td><td style="text-align: left; padding-left: 20px;">NAFISA KHAN</td></tr>
                <tr><td>260023</td><td style="text-align: left; padding-left: 20px;">MAHI SHAHRIAR APURBO</td></tr>
                <tr><td>260024</td><td style="text-align: left; padding-left: 20px;">MD. SHAHNAWAZ KOBIR</td></tr>
                <tr><td>260025</td><td style="text-align: left; padding-left: 20px;">AJIM UDDIN AKASH</td></tr>
                <tr><td>260026</td><td style="text-align: left; padding-left: 20px;">MD. HASAN HABIB</td></tr>
                <tr><td>260027</td><td style="text-align: left; padding-left: 20px;">MONIM AHMAD</td></tr>
                <tr><td>260028</td><td style="text-align: left; padding-left: 20px;">TAHSINUL HAQUE</td></tr>
                <tr><td>260029</td><td style="text-align: left; padding-left: 20px;">TANIM KHAN</td></tr>
                <tr><td>260030</td><td style="text-align: left; padding-left: 20px;">ZAYED BIN ABDULLAH</td></tr>
                <tr><td>260031</td><td style="text-align: left; padding-left: 20px;">PRIONTY SARKER</td></tr>
                <tr><td>260032</td><td style="text-align: left; padding-left: 20px;">MARIA SULTANA MOONMOON</td></tr>
                <tr><td>260033</td><td style="text-align: left; padding-left: 20px;">UMAIYA RISTA URBOSHI</td></tr>
                <tr><td>260034</td><td style="text-align: left; padding-left: 20px;">SAJIDUL ISLAM</td></tr>
                <tr><td>260035</td><td style="text-align: left; padding-left: 20px;">MALIHA JAMAN</td></tr>
                <tr><td>260036</td><td style="text-align: left; padding-left: 20px;">ANIKA TASNIM</td></tr>
                <tr><td>260037</td><td style="text-align: left; padding-left: 20px;">MUSIDUL ISLAM SAYEB</td></tr>
                <tr><td>260038</td><td style="text-align: left; padding-left: 20px;">MD. JOBAIR UDDIN</td></tr>
                <tr><td>260039</td><td style="text-align: left; padding-left: 20px;">MAHMODUL HASAN</td></tr>
                <tr><td>260040</td><td style="text-align: left; padding-left: 20px;">JANNAT TASNIN RAKA</td></tr>
                <tr><td>260041</td><td style="text-align: left; padding-left: 20px;">FARHANA SADIA</td></tr>
                <tr><td>260042</td><td style="text-align: left; padding-left: 20px;">SEMEKA BARMAN</td></tr>
                <tr><td>260043</td><td style="text-align: left; padding-left: 20px;">SAILA SAJIN RINI</td></tr>
                <tr><td>260044</td><td style="text-align: left; padding-left: 20px;">TAMIM EQBAL</td></tr>
                <tr><td>260045</td><td style="text-align: left; padding-left: 20px;">NABILA HOSSAIN</td></tr>
                <tr><td>260046</td><td style="text-align: left; padding-left: 20px;">MD. EYAKUB HOSSIN</td></tr>
                <tr><td>260047</td><td style="text-align: left; padding-left: 20px;">SK. MD. SADIP</td></tr>
                <tr><td>260048</td><td style="text-align: left; padding-left: 20px;">SK. TAZIM</td></tr>
                <tr><td>260049</td><td style="text-align: left; padding-left: 20px;">SAMIRA TABASSUM</td></tr>
                <tr><td>260050</td><td style="text-align: left; padding-left: 20px;">SOHANUR RAHAMAN NUR</td></tr>
                <tr><td>260051</td><td style="text-align: left; padding-left: 20px;">ARIAN ABDULLAH</td></tr>
                <tr><td>260052</td><td style="text-align: left; padding-left: 20px;">MD. SHEFAT ALI</td></tr>
                <tr><td>260053</td><td style="text-align: left; padding-left: 20px;">RAFIUL ISLAM</td></tr>
                <tr><td>260054</td><td style="text-align: left; padding-left: 20px;">SK. SADIK SAGAR</td></tr>
                <tr><td>260055</td><td style="text-align: left; padding-left: 20px;">MD. ALBIR SAMI</td></tr>
                <tr><td>260056</td><td style="text-align: left; padding-left: 20px;">MOHAMMED JUNAYED HOSSAINFARDIN</td></tr>
                <tr><td>260057</td><td style="text-align: left; padding-left: 20px;">REDWAN AHMMED</td></tr>
                <tr><td>260058</td><td style="text-align: left; padding-left: 20px;">MD. HRIDOY MONDOL</td></tr>
                <tr><td>260059</td><td style="text-align: left; padding-left: 20px;">AMRIN AKTER ALISA</td></tr>
                <tr><td>260060</td><td style="text-align: left; padding-left: 20px;">ASHRAFUL HOQUE RIMON</td></tr>
                <tr><td>260061</td><td style="text-align: left; padding-left: 20px;">KAZI MD. ARAFAT HOSSAIN SHANTO</td></tr>
                <tr><td>260062</td><td style="text-align: left; padding-left: 20px;">MD WHIDUN NABI NION</td></tr>
                <tr><td>260063</td><td style="text-align: left; padding-left: 20px;">IKON SHEIKH</td></tr>
                <tr><td>260064</td><td style="text-align: left; padding-left: 20px;">SHARMIN HOSSAIN ANUD</td></tr>
                <tr><td>260065</td><td style="text-align: left; padding-left: 20px;">TASNIM HASNAT</td></tr>
                <tr><td>260066</td><td style="text-align: left; padding-left: 20px;">MD. ANISUL HAQUE ANIK</td></tr>
                <tr><td>260067</td><td style="text-align: left; padding-left: 20px;">IREEN AKTER</td></tr>
                <tr><td>260068</td><td style="text-align: left; padding-left: 20px;">SIFATUL ISLAM SIFAT</td></tr>
                <tr><td>260069</td><td style="text-align: left; padding-left: 20px;">HAFSA HOSSAIN TOMA</td></tr>
                <tr><td>260070</td><td style="text-align: left; padding-left: 20px;">SINHA AKTER SEAN</td></tr>
                <tr><td>260071</td><td style="text-align: left; padding-left: 20px;">MOHAMMAD TANVIR HOSSEN TAMIM</td></tr>
                <tr><td>260072</td><td style="text-align: left; padding-left: 20px;">TUSTY ISLAM</td></tr>
                <tr><td>260073</td><td style="text-align: left; padding-left: 20px;">MD. TAHASANUR KHAN</td></tr>
                <tr><td>260074</td><td style="text-align: left; padding-left: 20px;">S.N. OMI</td></tr>
                <tr><td>260075</td><td style="text-align: left; padding-left: 20px;">SALSABILA NAHIN AFNAN</td></tr>
                <tr><td>260076</td><td style="text-align: left; padding-left: 20px;">MD. EFAZ BHUIYAN</td></tr>
                <tr><td>260077</td><td style="text-align: left; padding-left: 20px;">MST. LOTA MONY</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `
    },

    notes: {
      title: "Notes &amp; Course Materials",
      content: `
        <div style="line-height: 2;">
          <p style="color: #64748b;">Course folder links (Access restricted to batch students):</p>
          <ul style="list-style: none; padding-left: 0;">
            <li style="margin-bottom: 8px;">📂 <strong>Structured Programming:</strong> <a href="#" target="_blank">Google Drive Folder ↗</a></li>
            <li style="margin-bottom: 8px;">📂 <strong>Physics II &amp; Calculus:</strong> <a href="#" target="_blank">Handnotes &amp; Formula Sheets ↗</a></li>
            <li style="margin-bottom: 8px;">📂 <strong>Electrical &amp; Electronic Circuit:</strong> <a href="#" target="_blank">Lecture Slides Archive ↗</a></li>
          </ul>
        </div>
      `
    },

    questions: {
      title: "Question Bank Archives",
      content: `
        <div style="line-height: 2;">
          <p style="color: #64748b;">Previous semester question papers for exam preparation:</p>
          <ul style="list-style: none; padding-left: 0;">
            <li style="margin-bottom: 8px;">📄 <strong>Mid-Term Examination:</strong> <a href="#" target="_blank">Download PDF Archive ↗</a></li>
            <li style="margin-bottom: 8px;">📄 <strong>Semester Final Examination:</strong> <a href="#" target="_blank">Download PDF Archive ↗</a></li>
          </ul>
        </div>
      `
    },

    labCodes: {
      title: "Programming Lab Experiments",
      content: `
        <div style="line-height: 2;">
          <p style="color: #64748b;">Structured Programming Language lab code solutions:</p>
          <ul style="list-style: none; padding-left: 0;">
            <li>💻 <strong>Lab 1:</strong> Data types, basic I/O &amp; arithmetic operators</li>
            <li>💻 <strong>Lab 2:</strong> Branching control (if-else, nested condition, switch)</li>
            <li>💻 <strong>Lab 3:</strong> Loop structures (for, while, do-while)</li>
            <li>💻 <strong>Lab 4:</strong> Array operations, searching &amp; matrix multiplication</li>
          </ul>
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
};

window.addEventListener("popstate", (e) => {
  if (e.state && e.state.view) {
    navigateTo(e.state.view, false);
  } else {
    navigateTo("dashboard", false);
  }
});

window.filterStudents = function() {
  const input = document.getElementById("studentSearch");
  if (!input) return;
  const filter = input.value.toUpperCase();
  const table = document.getElementById("studentTable");
  if (!table) return;
  const tr = table.getElementsByTagName("tr");

  for (let i = 1; i < tr.length; i++) {
    const tdRoll = tr[i].getElementsByTagName("td")[0];
    const tdName = tr[i].getElementsByTagName("td")[1];
    if (tdRoll || tdName) {
      const txtRoll = tdRoll.textContent || tdRoll.innerText;
      const txtName = tdName.textContent || tdName.innerText;
      if (txtRoll.toUpperCase().indexOf(filter) > -1 || txtName.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
};

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
      { text: data.teacherName, bold: true, weight: 1.05 },
      { text: data.teacherTitle, bold: false, weight: 0.92 },
      { text: data.teacherDept, bold: false, weight: 0.92 },
    ], pctBox(z.teacher), { maxFontPx: CANVAS_W * 0.026, minFontPx: 13, align: z.teacher.align });
  }

  const sectionLine = data.studentSecVal ? `Section: ${data.studentSecVal}` : '';
  const idLine = data.studentIdVal ? `ID No: ${data.studentIdVal}` : '';
  const regLine = `Reg No: ${data.studentRegVal || ''}`;
  drawFittedBlock(ctx, [
    { text: data.studentName, bold: true, weight: 1.05 },
    { text: sectionLine, bold: false, weight: 0.92 },
    { text: idLine, bold: false, weight: 0.92 },
    { text: regLine, bold: false, weight: 0.92 },
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
    if (saved !== null) {
      el.value = saved;
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
   CR GPT Widget Logic
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
          appendMsg("সার্ভারে সমস্যা হয়েছে।", "cr-bot");
        }
      } catch {
        loading.remove();
        appendMsg("কানেকশন এরর!", "cr-bot");
      }
    }

    function appendMsg(msg, cls) {
      const d = document.createElement("div");
      d.className = `cr-msg ${cls}`;
      d.innerText = msg;
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
});