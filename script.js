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
   Hub Navigation & Module Switcher
   ------------------------------------------------------------ */
window.navigateTo = function(viewKey) {
  const hubDashboard = document.getElementById("hubDashboard");
  const hubCoverMaker = document.getElementById("hubCoverMaker");
  const hubDetailView = document.getElementById("hubDetailView");
  const titleEl = document.getElementById("hubViewTitle");
  const contentEl = document.getElementById("hubViewContent");

  if (!hubDashboard || !hubCoverMaker || !hubDetailView) return;

  window.scrollTo({ top: 0, behavior: 'smooth' });

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

  // অন্যান্য ৫টি কার্ডের কনটেন্ট
  const modules = {
    routine: {
      title: "Class Routine — DIIT CSE 26",
      content: `
        <div style="text-align: left; line-height: 1.8;">
          <p><strong>Sunday:</strong> 10:00 AM — Structured Programming Language (Room 402)</p>
          <p><strong>Monday:</strong> 11:30 AM — Mathematics I (Room 305)</p>
          <p><strong>Tuesday:</strong> 09:30 AM — Physics / Electrical Lab (Lab 2)</p>
          <p><strong>Wednesday:</strong> 10:00 AM — English &amp; Professional Communication (Room 402)</p>
          <p><strong>Thursday:</strong> 11:00 AM — Basic Electrical Engineering (Room 401)</p>
          <div style="margin-top: 24px; padding: 14px 18px; background: #f0fdfa; border-radius: 12px; color: #0f766e; border: 1px solid #ccfbf1;">
            💡 <em>Need instant schedule updates? Ask <strong>CR GPT</strong> from the bottom right widget!</em>
          </div>
        </div>
      `
    },
    notes: {
      title: "Academic Notes &amp; Course Materials",
      content: `
        <div style="text-align: left;">
          <p style="color: #64748b;">Direct links to official semester folders and lecture drives:</p>
          <ul style="line-height: 2.2; margin-top: 14px;">
            <li>📘 <strong>Structured Programming Language:</strong> <a href="#" target="_blank">Access Drive Folder &rarr;</a></li>
            <li>📘 <strong>Discrete Mathematics:</strong> <a href="#" target="_blank">Download Handnotes &rarr;</a></li>
            <li>📘 <strong>Electrical Engineering Principles:</strong> <a href="#" target="_blank">Course Slides Archive &rarr;</a></li>
          </ul>
        </div>
      `
    },
    students: {
      title: "CSE 26th Batch Student Directory",
      content: `
        <div style="text-align: left;">
          <p style="color: #64748b;">Contact directory of 26th Batch CSE students.</p>
          <div style="padding: 16px; background: #f8fafc; border-radius: 12px; border: 1px dashed #cbd5e1; margin-top: 16px;">
            <p style="margin: 0; font-size: 0.9rem; color: #475569;">Directory database is currently being populated.</p>
          </div>
        </div>
      `
    },
    questions: {
      title: "Previous Examination Question Bank",
      content: `
        <div style="text-align: left;">
          <p style="color: #64748b;">Mid-term and semester final exam question archive:</p>
          <ul style="line-height: 2.2; margin-top: 14px;">
            <li>📄 <strong>Mid-Semester Question Archives:</strong> <a href="#" target="_blank">Browse Archive &rarr;</a></li>
            <li>📄 <strong>Final Examination Papers:</strong> <a href="#" target="_blank">Browse Archive &rarr;</a></li>
          </ul>
        </div>
      `
    },
    labCodes: {
      title: "Lab Experiments &amp; Code Solutions",
      content: `
        <div style="text-align: left;">
          <p style="color: #64748b;">Standard C programming lab experiments for lab manuals:</p>
          <ul style="line-height: 2.2; margin-top: 14px;">
            <li>💻 <strong>Lab 1:</strong> Variables, Input/Output &amp; Arithmetic Operations</li>
            <li>💻 <strong>Lab 2:</strong> Branching Logic (if-else, nested condition, switch)</li>
            <li>💻 <strong>Lab 3:</strong> Loop Controls (for, while, nested loops)</li>
            <li>💻 <strong>Lab 4:</strong> 1D &amp; 2D Array Traversals &amp; Operations</li>
          </ul>
        </div>
      `
    }
  };

  const selected = modules[viewKey] || { title: "ফিচার", content: "তথ্য লোড হচ্ছে..." };
  if (titleEl) titleEl.innerHTML = selected.title;
  if (contentEl) contentEl.innerHTML = selected.content;
};

/* ------------------------------------------------------------
   Canvas text helpers
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
   Image cache
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

    el.addEventListener('input', (e) => {
      localStorage.setItem(STORAGE_PREFIX + id, e.target.value);
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
   bKash Prank Modal Functions
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