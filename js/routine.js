/* ============================================================
   Routine & Live Class Tracker Engine
   ============================================================ */

let currentRoutineSec = "A";
let liveTimerInterval = null;

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