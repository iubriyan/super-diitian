/* ============================================================
   Super DIITian — Cover Page Maker
   All coordinates below were measured directly off the supplied
   template images (percentages of the 1414 x 2000 canvas), so
   dynamic text always lands in the blank space the templates
   already leave for it and never crosses the printed artwork.
   ============================================================ */

const CANVAS_W = 1414;
const CANVAS_H = 2000;

// zone shorthand: xPct/wPct/yPct/hPct are all percentages (0-100)
// of canvas width/height. align: 'center' | 'left'.
const TEMPLATES = [
  {
    id: 't1', file: 'assets/templates/t1.jpg', label: 'Template 1', fixed: false,
    zones: {
      deptBatch: { xPct: 10, wPct: 80, yPct: 15, hPct: 20, align: 'center' },
      course:    { xPct: 10, wPct: 80, yPct: 38, hPct: 19, align: 'center' },
      teacher:   { xPct: 17, wPct: 41, yPct: 62.8, hPct: 17, align: 'left' },
      student:   { xPct: 65, wPct: 40, yPct: 64.5, hPct: 17, align: 'left' },
    }
  },
  {
    id: 't2', file: 'assets/templates/t2.jpg', label: 'Template 2', fixed: false,
    zones: {
      deptBatch: { xPct: 10, wPct: 80, yPct: 15, hPct: 13, align: 'center' },
      course:    { xPct: 12, wPct: 75, yPct: 30, hPct: 15, align: 'center' },
      teacher:   { xPct: 9,  wPct: 28, yPct: 47, hPct: 23, align: 'left' },
      student:   { xPct: 41, wPct: 40, yPct: 48.8, hPct: 23, align: 'left' },
    }
  },
  {
    id: 't3', file: 'assets/templates/t3.jpg', label: 'Template 3', fixed: false,
    zones: {
      deptBatch: { xPct: 10, wPct: 80, yPct: 13, hPct: 17, align: 'center' },
      course:    { xPct: 10, wPct: 80, yPct: 35, hPct: 14, align: 'center' },
      teacher:   { xPct: 17, wPct: 41, yPct: 51.8, hPct: 20, align: 'left' },
      student:   { xPct: 65, wPct: 40, yPct: 53.6, hPct: 20, align: 'left' },
    }
  },
  {
    id: 't4', file: 'assets/templates/t4.jpg', label: 'Template 4', fixed: false,
    zones: {
      deptBatch: { xPct: 10, wPct: 80, yPct: 18, hPct: 15, align: 'center' },
      course:    { xPct: 10, wPct: 80, yPct: 37, hPct: 14, align: 'center' },
      teacher:   { xPct: 17, wPct: 41, yPct: 55, hPct: 18, align: 'left' },
      student:   { xPct: 65, wPct: 40, yPct: 56.6, hPct: 18, align: 'left' },
    }
  },
  {
    id: 't5', file: 'assets/templates/t5.jpg', label: 'Template 5', fixed: false,
    zones: {
      deptBatch: { xPct: 10, wPct: 80, yPct: 17.6, hPct: 14, align: 'center' },
      course:    { xPct: 10, wPct: 80, yPct: 34, hPct: 14, align: 'center' },
      teacher:   { xPct: 17, wPct: 41, yPct: 55, hPct: 11, align: 'left' },
      student:   { xPct: 65, wPct: 40, yPct: 56.5, hPct: 11, align: 'left' },
    }
  },
  {
    id: 't6', file: 'assets/templates/t6.jpg', label: 'Template 6', fixed: false,
    zones: {
      deptBatch: { xPct: 10, wPct: 80, yPct: 15.6, hPct: 11, align: 'center' },
      course:    { xPct: 10, wPct: 80, yPct: 31, hPct: 14, align: 'center' },
      teacher:   { xPct: 17, wPct: 41, yPct: 50, hPct: 18, align: 'left' },
      student:   { xPct: 65, wPct: 40, yPct: 51.6, hPct: 18, align: 'left' },
    }
  },
  {
    id: 't7', file: 'assets/templates/t7.jpg', label: 'Template 7', fixed: false,
    zones: {
      deptBatch: { xPct: 10, wPct: 80, yPct: 16.6, hPct: 15, align: 'center' },
      course:    { xPct: 10, wPct: 80, yPct: 35, hPct: 14, align: 'center' },
      teacher:   { xPct: 17, wPct: 43, yPct: 51, hPct: 23, align: 'left' },
      student:   { xPct: 65, wPct: 40, yPct: 52.8, hPct: 23, align: 'left' },
    }
  },
  {
    id: 't8', file: 'assets/templates/t8.jpg', label: 'EEC Lab Report', fixed: true,
    zones: {
      // Department / LAB REPORT / Course Code / Title / Teacher block are
      // already printed on this template. Only the student block is dynamic.
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
  studentSecVal: 'A',
  studentIdVal: '260013',
  studentRegVal: '',
};

const FIELD_IDS = [
  'deptName','batchName','courseCode','courseTitle',
  'teacherName','teacherTitle','teacherDept',
  'studentName','studentSec','studentId','studentReg'
];

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

// Fits a stack of text "entries" inside a pixel box, shrinking font size
// until every wrapped line fits both the width and the total height.
function fitBlock(ctx, entries, boxPx, opts = {}) {
  const lineHeightMult = opts.lineHeightMult || 1.22;
  const gapPx = opts.gapPx ?? boxPx.height * 0.06;
  const minFont = opts.minFontPx || 13;
  const maxFont = opts.maxFontPx;

  let best = null;
  for (let s = 1.0; s >= 0.22; s -= 0.02) {
    let totalH = 0;
    let ok = true;
    const rendered = [];
    for (const e of entries) {
      if (!e.text) { rendered.push({ lines: [''], fs: 0, fontStr: '', lineH: 0 }); continue; }
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
    totalH += gapPx * (entries.length - 1);
    if (ok && totalH <= boxPx.height) { best = rendered; break; }
  }
  if (!best) {
    // last-resort fallback at minimum size, may slightly overflow on absurd input
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
  rendered.forEach((r, i) => { totalH += r.lines.length * r.lineH; if (i > 0) totalH += gapPx; });

  let cursorY = boxPx.y + (boxPx.height - totalH) / 2; // vertically center the whole stack
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
    img.onerror = reject;
    img.src = src;
  });
  imageCache[src] = p;
  return p;
}

/* ------------------------------------------------------------
   App state
   ------------------------------------------------------------ */
let selectedTemplateId = TEMPLATES[0].id;
let renderQueued = false;

function getTemplate(id) { return TEMPLATES.find(t => t.id === id); }

function collectData() {
  return {
    deptName: document.getElementById('deptName').value.trim(),
    batchName: document.getElementById('batchName').value.trim(),
    courseCode: document.getElementById('courseCode').value.trim(),
    courseTitle: document.getElementById('courseTitle').value.trim(),
    teacherName: document.getElementById('teacherName').value.trim(),
    teacherTitle: document.getElementById('teacherTitle').value.trim(),
    teacherDept: document.getElementById('teacherDept').value.trim(),
    studentName: document.getElementById('studentName').value.trim(),
    studentSecVal: document.getElementById('studentSec').value.trim(),
    studentIdVal: document.getElementById('studentId').value.trim(),
    studentRegVal: document.getElementById('studentReg').value.trim(),
  };
}

async function renderTemplate(ctx, templateId, data) {
  const tpl = getTemplate(templateId);
  const img = await loadImage(tpl.file);

  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
  ctx.drawImage(img, 0, 0, CANVAS_W, CANVAS_H);

  const z = tpl.zones;

  if (!tpl.fixed) {
    // Department + Batch
    drawFittedBlock(ctx, [
      { text: data.deptName, bold: true, weight: 1.12 },
      { text: data.batchName, bold: true, weight: 0.9 },
    ], pctBox(z.deptBatch), { maxFontPx: CANVAS_W * 0.034, minFontPx: 16, align: z.deptBatch.align });

    // Course code + title
    const codeLine = data.courseCode ? `Course Code: ${data.courseCode}` : '';
    const titleLine = data.courseTitle ? `Title: ${data.courseTitle}` : '';
    drawFittedBlock(ctx, [
      { text: codeLine, bold: false, weight: 1 },
      { text: titleLine, bold: false, weight: 1 },
    ], pctBox(z.course), { maxFontPx: CANVAS_W * 0.0285, minFontPx: 15, align: z.course.align });

    // Teacher block
    drawFittedBlock(ctx, [
      { text: data.teacherName, bold: true, weight: 1.05 },
      { text: data.teacherTitle, bold: false, weight: 0.92 },
      { text: data.teacherDept, bold: false, weight: 0.92 },
    ], pctBox(z.teacher), { maxFontPx: CANVAS_W * 0.026, minFontPx: 13, align: z.teacher.align });
  }

  // Student block (always dynamic, including on the fixed template)
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
    const ctx = canvas.getContext('2d');
    const loading = document.getElementById('canvasLoading');
    try {
      await renderTemplate(ctx, selectedTemplateId, collectData());
      loading.hidden = true;
    } catch (err) {
      console.error('Render failed:', err);
    }
  });
}

/* ------------------------------------------------------------
   Fixed-template UI toggling
   ------------------------------------------------------------ */
function updateFixedState() {
  const tpl = getTemplate(selectedTemplateId);
  const detailsPanel = document.getElementById('detailsPanel');
  const teacherSection = document.getElementById('teacherSection');
  const fixedNote = document.getElementById('fixedNote');
  const generalFields = document.querySelectorAll('#deptName, #batchName, #courseCode, #courseTitle, #teacherName, #teacherTitle, #teacherDept');

  const isFixed = !!tpl.fixed;
  fixedNote.hidden = !isFixed;
  teacherSection.style.display = isFixed ? 'none' : '';
  generalFields.forEach(el => { el.closest('.field').style.display = isFixed ? 'none' : ''; });
  detailsPanel.classList.toggle('is-fixed', isFixed);
}

/* ------------------------------------------------------------
   Template picker grid
   ------------------------------------------------------------ */
function buildTemplateGrid() {
  const grid = document.getElementById('templateGrid');
  grid.innerHTML = '';
  TEMPLATES.forEach(tpl => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'template-card';
    btn.setAttribute('data-id', tpl.id);
    btn.setAttribute('aria-pressed', tpl.id === selectedTemplateId ? 'true' : 'false');
    if (tpl.id === selectedTemplateId) btn.classList.add('is-selected');

    btn.innerHTML = `
      <span class="template-card__clip" aria-hidden="true"></span>
      <span class="template-card__frame">
        <img src="${tpl.file}" alt="${tpl.label} cover design" loading="lazy">
        ${tpl.fixed ? '<span class="template-card__badge">Fixed</span>' : ''}
      </span>
      <span class="template-card__label">${tpl.label}</span>
    `;

    btn.addEventListener('click', () => {
      selectedTemplateId = tpl.id;
      grid.querySelectorAll('.template-card').forEach(c => {
        c.classList.toggle('is-selected', c === btn);
        c.setAttribute('aria-pressed', c === btn ? 'true' : 'false');
      });
      updateFixedState();
      document.getElementById('canvasLoading').hidden = false;
      scheduleRender();
    });

    grid.appendChild(btn);
  });
}

/* ------------------------------------------------------------
   Form wiring
   ------------------------------------------------------------ */
function applyDefaults() {
  document.getElementById('deptName').value = DEFAULTS.deptName;
  document.getElementById('batchName').value = DEFAULTS.batchName;
  document.getElementById('courseCode').value = DEFAULTS.courseCode;
  document.getElementById('courseTitle').value = DEFAULTS.courseTitle;
  document.getElementById('teacherName').value = DEFAULTS.teacherName;
  document.getElementById('teacherTitle').value = DEFAULTS.teacherTitle;
  document.getElementById('teacherDept').value = DEFAULTS.teacherDept;
  document.getElementById('studentName').value = DEFAULTS.studentName;
  document.getElementById('studentSec').value = DEFAULTS.studentSecVal;
  document.getElementById('studentId').value = DEFAULTS.studentIdVal;
  document.getElementById('studentReg').value = DEFAULTS.studentRegVal;
}

function wireForm() {
  FIELD_IDS.forEach(id => {
    document.getElementById(id).addEventListener('input', scheduleRender);
  });
  document.getElementById('resetBtn').addEventListener('click', () => {
    applyDefaults();
    scheduleRender();
  });
}

/* ------------------------------------------------------------
   Download
   ------------------------------------------------------------ */
function wireDownload() {
  const btn = document.getElementById('downloadBtn');
  btn.addEventListener('click', () => {
    const canvas = document.getElementById('previewCanvas');
    btn.disabled = true;
    const originalLabel = btn.innerHTML;
    canvas.toBlob((blob) => {
      if (!blob) { btn.disabled = false; return; }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const stamp = new Date().toISOString().slice(0, 10);
      a.href = url;
      a.download = `super-diitian-cover-img-${selectedTemplateId}-${stamp}.jpg`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
      btn.disabled = false;
      btn.innerHTML = originalLabel;
    }, 'image/jpeg', 0.97);
  });
}

/* ------------------------------------------------------------
   Boot
   ------------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {
  applyDefaults();
  buildTemplateGrid();
  updateFixedState();
  wireForm();
  wireDownload();
  scheduleRender();
});