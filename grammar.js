/* ===== 语法冒险岛 · 交互逻辑 ===== */
'use strict';

/* ---------- 状态 / 本地存储 ---------- */
const GRAM_STORE_KEY = 'grammar_island_v1';
let gState = loadGState();

function loadGState() {
  try {
    const raw = localStorage.getItem(GRAM_STORE_KEY);
    if (raw) {
      const s = JSON.parse(raw);
      // 兼容旧数据：补全新字段
      return { mastery: {}, wrong: {}, studied: {}, quizDone: {}, ...s };
    }
  } catch (e) {}
  return { mastery: {}, wrong: {}, studied: {}, quizDone: {} };
}
function saveGState() {
  try { localStorage.setItem(GRAM_STORE_KEY, JSON.stringify(gState)); } catch (e) {}
}

/* ---------- 工具 ---------- */
const $g = (s, r = document) => r.querySelector(s);
const $$g = (s, r = document) => Array.from(r.querySelectorAll(s));
function gShuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function gNorm(s) { return (s || '').toString().toLowerCase().replace(/\s+/g, ' ').trim(); }
function gToast(msg) {
  const t = $g('#toast'); if (!t) return;
  t.textContent = msg; t.classList.add('show');
  clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('show'), 1600);
}
function gEsc(s) {
  return String(s).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}
// 把 prompt 里的 `__文本__` 渲染为 <u>文本</u>，其余 HTML 转义防注入
function gRichPrompt(p) {
  return String(p).split(/__(.+?)__/).map((seg, i) =>
    i % 2 === 1 ? '<u>' + gEsc(seg) + '</u>' : gEsc(seg)
  ).join('');
}

/* ---------- 进度 ---------- */
function gQKey(gid, qi) { return gid + ':q' + qi; }
function gMastered(gid) {
  const g = GRAMMAR.find(x => x.id === gid); if (!g) return 0;
  let n = 0;
  g.questions.forEach((q, qi) => {
    const m = gState.mastery[gQKey(gid, qi)];
    if (m && m.correct >= 1) n++;
  });
  return n;
}
function gUpdateChip() {
  const el = $g('#gramMastery');
  if (!el) return;
  // 按当前分栏统计：已学完讲解 / 已做完练习 / 全部题目答对 ≥1 次视为「已掌握」
  const list = currentGrammars();
  const studied = list.filter(g => !!gState.studied[g.id]).length;
  const quizDone = list.filter(g => !!gState.quizDone[g.id]).length;
  const masteredPoints = list.filter(g => {
    if (!g.questions.length) return false;
    return g.questions.every((q, qi) => {
      const m = gState.mastery[gQKey(g.id, qi)];
      return m && m.correct >= 1;
    });
  }).length;
  el.textContent = `已学 ${studied}/${list.length} · 已练 ${quizDone}/${list.length} · 掌握 ${masteredPoints}`;
}

/* ---------- 页面初始化 ---------- */
const gMain = $g('#gmain');
$g('#gramTitle').textContent = GRAMMAR_INFO.title;
$g('#gramSubtitle').textContent = GRAMMAR_INFO.subtitle;

let gGrade = '6A';                 // 当前分栏：6A（六上）/ 6B（六下）/ 7A（七上）
let gCurrent = '';                 // 当前语法点
let gMode = 'learn';               // learn | quiz

/* 按当前分栏过滤语法点 */
function currentGrammars() {
  return GRAMMAR.filter(g => g.grade === gGrade);
}
function currentFirst() {
  const list = currentGrammars();
  return list.length ? list[0].id : '';
}
function switchGrade(grade) {
  if (grade === gGrade) return;
  gGrade = grade;
  gCurrent = currentFirst();
  gMode = 'learn';
  gLessonIdx = 0;
  renderGram();
}

gUpdateChip();

/* ---------- 分栏 + 语法点切换导航（三行分层）---------- */
function renderGramNav() {
  const nav = $g('#gramNav');
  // 保留第一个「词汇冒险岛」返回链接
  const homeLink = nav.querySelector('a[href="u1.html"], a[href="index.html"]');
  nav.innerHTML = '';
  if (homeLink) nav.appendChild(homeLink);

  // 第二行：分栏切换（6A / 6B / 7A）
  const gradeRow = document.createElement('div');
  gradeRow.className = 'nav-row nav-row-grade';
  const GRADE_META = {
    '6A': { icon: '📕', label: '6A · 六年级上' },
    '6B': { icon: '📗', label: '6B · 六年级下' },
    '7A': { icon: '📘', label: '7A · 七年级上' }
  };
  (GRAMMAR_INFO.grades || ['6A', '6B', '7A']).forEach(grade => {
    const b = document.createElement('a');
    b.className = 'unit-btn gram-grade-btn' + (grade === gGrade ? ' active' : '');
    b.href = 'javascript:void(0)';
    const cnt = (GRAMMAR_INFO.counts && GRAMMAR_INFO.counts[grade]) || 0;
    const meta = GRADE_META[grade] || { icon: '📘', label: grade };
    b.innerHTML = `${meta.icon} ${meta.label} <small style="font-size:10px;opacity:.75">${cnt} 个语法点</small>`;
    b.onclick = () => switchGrade(grade);
    gradeRow.appendChild(b);
  });
  nav.appendChild(gradeRow);

  // 第三行：当前分栏的语法点（用 chip 风格，更小）
  const pointsRow = document.createElement('div');
  pointsRow.className = 'nav-row nav-row-points';
  currentGrammars().forEach(g => {
    const a = document.createElement('a');
    a.className = 'unit-btn gram-btn' + (g.id === gCurrent ? ' active' : '');
    a.href = 'javascript:void(0)';
    // 完成状态徽标：✅已学（讲解学完）/ ⭐已练（练习做完）
    const badge = [];
    if (gState.quizDone[g.id]) badge.push('<span class="gb gb-quiz" title="练习已做完">⭐已练</span>');
    if (gState.studied[g.id]) badge.push('<span class="gb gb-learn" title="讲解已学完">✅已学</span>');
    a.innerHTML = `${g.emoji} ${g.title} ${badge.join(' ')}`;
    a.onclick = () => { gCurrent = g.id; renderGram(); };
    pointsRow.appendChild(a);
  });
  nav.appendChild(pointsRow);
}

/* ---------- 模式切换 ---------- */
function renderModeNav() {
  const nav = $g('#gramModeNav');
  nav.innerHTML = '';
  const wrongCount = Object.keys(gState.wrong).length;
  const modes = [
    ['learn', '📖 先学习', '语法讲解'],
    ['quiz', '✏️ 再练习', '答题闯关'],
    ['wrong', `📒 错题本${wrongCount ? ' (' + wrongCount + ')' : ''}`, '复习错题']
  ];
  modes.forEach(([m, label, hint]) => {
    const b = document.createElement('button');
    b.className = 'mode-btn gram-mode-btn' + (gMode === m ? ' active' : '');
    b.innerHTML = `<span>${label}</span><small>${hint}</small>`;
    b.onclick = () => { gMode = m; renderGram(); };
    nav.appendChild(b);
  });
}

/* ---------- 主渲染 ---------- */
function renderGram() {
  // 保证 gCurrent 属于当前分栏（首次进入 / 切换分栏时兜底）
  const list = currentGrammars();
  if (!list.length) { gMain.innerHTML = '<div class="empty-state"><span class="big">🧭</span>暂无语法点</div>'; return; }
  if (!list.some(g => g.id === gCurrent)) gCurrent = list[0].id;
  renderGramNav();
  renderModeNav();
  gMain.innerHTML = '';
  if (gMode === 'learn') renderLearn();
  else if (gMode === 'quiz') renderQuizIntro();
  else renderGramWrong();
}

/* ===================================================================
   1) 学习模式：讲解卡片（一页一个知识点）
=================================================================== */
let gLessonIdx = 0;

function renderLearn() {
  const g = GRAMMAR.find(x => x.id === gCurrent);
  gLessonIdx = 0;
  renderLesson(g);
}

function renderLesson(g) {
  gMain.innerHTML = '';
  const lesson = g.lessons[gLessonIdx];
  if (!lesson) return;

  const wrap = document.createElement('div');
  wrap.className = 'gram-lesson';

  // 顶部：进度 + 语法点标题
  const head = document.createElement('div');
  head.className = 'gram-lesson-head';
  head.innerHTML = `
    <div class="gram-lesson-tag ${g.color}">${g.emoji} ${g.title}</div>
    <div class="gram-lesson-unit">对应教材 ${gEsc(g.unit)}</div>
    <div class="gram-lesson-pager">${gLessonIdx + 1} / ${g.lessons.length}</div>`;
  wrap.appendChild(head);

  // 知识点卡片
  const card = document.createElement('div');
  card.className = 'gram-card';
  card.innerHTML = `
    <div class="gram-card-title">${gEsc(lesson.title)}</div>
    <ul class="gram-points">
      ${(lesson.points || []).map(p => `<li>${gEsc(p)}</li>`).join('')}
    </ul>
    ${lesson.examples && lesson.examples.length ? `
      <div class="gram-examples">
        <div class="gram-sec-label">📘 例句</div>
        ${lesson.examples.map(ex => `
          <div class="gram-example">
            <div class="gram-ex-en">${gEsc(ex.en)} ${speakBtn(ex.en)}</div>
            <div class="gram-ex-cn">${gEsc(ex.cn)}</div>
          </div>`).join('')}
      </div>` : ''}
    ${lesson.tips && lesson.tips.length ? `
      <div class="gram-tips">
        <div class="gram-sec-label">💡 小提醒</div>
        ${lesson.tips.map(t => `<div class="gram-tip">${gEsc(t)}</div>`).join('')}
      </div>` : ''}`;
  wrap.appendChild(card);

  // 底部导航
  const nav = document.createElement('div');
  nav.className = 'gram-lesson-nav';
  const prev = document.createElement('button');
  prev.className = 'btn ghost small';
  prev.textContent = '← 上一条';
  prev.disabled = gLessonIdx === 0;
  prev.onclick = () => { gLessonIdx--; renderLesson(g); };
  const next = document.createElement('button');
  next.className = 'btn purple';
  next.textContent = gLessonIdx + 1 >= g.lessons.length ? '✏️ 去做练习 →' : '下一条 →';
  next.onclick = () => {
    if (gLessonIdx + 1 >= g.lessons.length) { gMode = 'quiz'; renderGram(); }
    else { gLessonIdx++; renderLesson(g); }
  };
  nav.appendChild(prev); nav.appendChild(next);
  wrap.appendChild(nav);

  // 学完所有知识点卡片即标记「已学完」（导航 chip 会打 ✅ 钩）
  if (gLessonIdx + 1 >= g.lessons.length && !gState.studied[g.id]) {
    gState.studied[g.id] = Date.now();
    saveGState(); gUpdateChip();
  }

  gMain.appendChild(wrap);
}

/* 发音按钮（复用 VoiceKit：自动选好听音色 + 用户可自选） */
function speakBtn(text) {
  if (!('speechSynthesis' in window) || !text) return '';
  return `<button class="fc-speak" data-act="speak" data-text="${gEsc(text)}" title="朗读发音">🔊</button>`;
}
// 委托处理发音点击（页面级）
gMain.addEventListener('click', (e) => {
  const btn = e.target.closest('.fc-speak');
  if (!btn) return;
  const t = btn.dataset.text;
  if (t) window.VoiceKit.speak(t, 0.85);
});

/* ===================================================================
   2) 练习模式：答题闯关
=================================================================== */
let gQuizIdx = 0, gQuizScore = 0, gQuizResults = [];
let gQuizPool = [];

function renderQuizIntro() {
  const g = GRAMMAR.find(x => x.id === gCurrent);
  const mastered = gMastered(g.id);
  const total = g.questions.length;
  const doneAll = mastered >= total;

  gMain.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.className = 'gram-quiz-intro';

  const tag = document.createElement('div');
  tag.className = 'gram-lesson-tag ' + g.color;
  tag.textContent = `${g.emoji} ${g.title}`;
  wrap.appendChild(tag);

  const card = document.createElement('div');
  card.className = 'gram-card';
  card.innerHTML = `
    <div class="gram-card-title">✏️ ${g.title} · 练习题</div>
    <div class="gram-quiz-meta">
      <div class="quiz-meta-item"><b>${total}</b><span>道题</span></div>
      <div class="quiz-meta-item"><b>${gState.studied[g.id] ? '✅' : '📖'}</b><span>${gState.studied[g.id] ? '已学完' : '先学习'}</span></div>
      <div class="quiz-meta-item"><b>${mastered}/${total}</b><span>已掌握</span></div>
      <div class="quiz-meta-item"><b>${doneAll ? '🏆' : '🎯'}</b><span>${doneAll ? '已通关' : '待挑战'}</span></div>
    </div>
    <div class="gram-quiz-tip">题型覆盖：选择题（语法选择）+ 填空题（写答案）+ 简答题（写完整答句并自评），对标考试语法、词汇与阅读简答部分。</div>`;
  wrap.appendChild(card);

  const start = document.createElement('button');
  start.className = 'btn purple';
  start.style.width = '100%';
  start.textContent = doneAll ? '🔁 再练一遍' : '🚀 开始答题';
  start.onclick = () => {
    gQuizPool = gShuffle(g.questions.map((q, qi) => ({ ...q, qi })));
    gQuizIdx = 0; gQuizScore = 0; gQuizResults = [];
    renderQuizQuestion(g, gQuizPool[0]);
  };
  wrap.appendChild(start);

  const back = document.createElement('button');
  back.className = 'btn ghost';
  back.style.width = '100%'; back.style.marginTop = '10px';
  back.textContent = '⬅️ 返回学习';
  back.onclick = () => { gMode = 'learn'; renderGram(); };
  wrap.appendChild(back);

  gMain.appendChild(wrap);
}

function renderQuizQuestion(g, q) {
  // 错题重练时题目来自不同语法点，按 q.gid 动态定位
  if (q.gid) {
    const g2 = GRAMMAR.find(x => x.id === q.gid);
    if (g2) g = g2;
  }
  gMain.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.className = 'quiz-wrap';

  const head = document.createElement('div');
  head.className = 'quiz-head';
  head.innerHTML = `<span>${g.title} · 第 ${gQuizIdx + 1} / ${gQuizPool.length} 题</span><span class="quiz-progress">⭐ ${gQuizScore}</span>`;
  wrap.appendChild(head);

  const card = document.createElement('div');
  card.className = 'q-card';
  card.innerHTML = `<div class="q-prompt">${q.type === 'choice' ? '选择最恰当的答案' : q.type === 'short' ? '读短文，用英文回答（对照参考答句与要点自评）' : '根据题意填空'}</div>
    <div class="q-big" style="font-size:21px;line-height:1.6">${gRichPrompt(q.prompt)}</div>`;
  wrap.appendChild(card);

  function finish(correct, your) {
    const key = gQKey(g.id, q.qi);
    if (correct) {
      gQuizScore++;
      const m = gState.mastery[key] || { correct: 0, attempts: 0 };
      m.correct += 1; m.attempts += 1;
      gState.mastery[key] = m;
      // 答对即从错题本移除
      if (gState.wrong[key]) { delete gState.wrong[key]; }
    } else {
      const m = gState.mastery[key] || { correct: 0, attempts: 0 };
      m.attempts += 1;
      gState.mastery[key] = m;
      const w = gState.wrong[key] || { count: 0, correct: '', your: '' };
      w.count += 1; w.correct = q.answer; w.your = your;
      gState.wrong[key] = w;
    }
    saveGState(); gUpdateChip();

    // 反馈
    const fb = document.createElement('div');
    fb.className = 'feedback show ' + (correct ? 'ok' : 'no');
    fb.innerHTML = correct
      ? `✅ 答对啦！<span class="fb-en">${gEsc(q.answer)}</span>`
      : `❌ 正确答案：<span class="fb-en">${gEsc(q.answer)}</span><span class="fb-cn">你的答案：${gEsc(your || '（空）')}</span>`;
    if (q.explain) fb.innerHTML += `<div class="gram-explain">📝 ${gEsc(q.explain)}</div>`;
    card.appendChild(fb);

    const next = document.createElement('button');
    next.className = 'btn purple';
    next.style.width = '100%'; next.style.marginTop = '14px';
    next.textContent = gQuizIdx + 1 >= gQuizPool.length ? '查看结果 🏁' : '下一题 ➡️';
    next.onclick = () => {
      gQuizIdx++;
      if (gQuizIdx >= gQuizPool.length) renderQuizResult(g);
      else renderQuizQuestion(g, gQuizPool[gQuizIdx]);
    };
    wrap.appendChild(next);
  }

  if (q.type === 'choice') {
    const opts = gShuffle(q.options.map(o => ({ text: o, correct: gNorm(o) === gNorm(q.answer) })));
    const box = document.createElement('div'); box.className = 'options';
    opts.forEach(o => {
      const b = document.createElement('button'); b.className = 'opt'; b.textContent = o.text;
      b.onclick = () => {
        if (box.dataset.done) return; box.dataset.done = '1';
        b.classList.add(o.correct ? 'correct' : 'wrong');
        if (!o.correct) $$g('.opt', box).forEach(x => { if (gNorm(x.textContent) === gNorm(q.answer)) x.classList.add('correct'); });
        finish(o.correct, o.text);
      };
      box.appendChild(b);
    });
    card.appendChild(box);
  } else if (q.type === 'short') {
    // 简答题：先写答句 → 对照参考答案与要点自检 → 自评（答错进错题本）
    if (q.passage) {
      const ps = document.createElement('div');
      ps.className = 'q-passage';
      ps.textContent = q.passage;
      card.appendChild(ps);
    }
    const ta = document.createElement('textarea');
    ta.className = 'text-input short-input';
    ta.rows = 2;
    ta.placeholder = '用英文写出完整答句…';
    card.appendChild(ta);
    const rowS = document.createElement('div'); rowS.className = 'input-row';
    const show = document.createElement('button'); show.className = 'btn'; show.textContent = '🔍 对照参考答案';
    rowS.appendChild(show);
    card.appendChild(rowS);
    setTimeout(() => ta.focus(), 50);

    show.onclick = () => {
      if (card.dataset.revealed) return; card.dataset.revealed = '1';
      const val = ta.value.trim();
      const box = document.createElement('div'); box.className = 'short-ref';
      box.innerHTML = `<div class="ref-line"><b>参考答案：</b><span class="fb-en">${gEsc(q.answer)}</span></div>`;
      if (q.keys && q.keys.length) {
        const low = val.toLowerCase();
        const items = q.keys.map(k => {
          const hit = low.includes(k.toLowerCase());
          return `<span class="${hit ? 'key-hit' : 'key-miss'}">${hit ? '✓' : '✗'} ${gEsc(k)}</span>`;
        }).join('');
        box.innerHTML += `<div class="key-row"><b>要点自检：</b>${items}</div>`;
      }
      if (q.explain) box.innerHTML += `<div class="gram-explain">📝 ${gEsc(q.explain)}</div>`;
      card.appendChild(box);

      const self = document.createElement('div');
      self.className = 'input-row'; self.style.marginTop = '10px';
      const yes = document.createElement('button'); yes.className = 'btn'; yes.textContent = '✅ 我答对了';
      const no = document.createElement('button'); no.className = 'btn ghost small'; no.textContent = '❌ 我答错了';
      const act = ok => {
        if (card.dataset.done) return; card.dataset.done = '1';
        yes.disabled = no.disabled = show.disabled = true;
        finish(ok, val || '（空）');
      };
      yes.onclick = () => act(true);
      no.onclick = () => act(false);
      self.appendChild(yes); self.appendChild(no);
      card.appendChild(self);
    };
  } else {
    const input = document.createElement('input');
    input.className = 'text-input'; input.placeholder = '输入答案…'; input.autocomplete = 'off';
    const row = document.createElement('div'); row.className = 'input-row';
    const ok = document.createElement('button'); ok.className = 'btn'; ok.textContent = '✓ 确认';
    const hint = document.createElement('button'); hint.className = 'btn ghost small'; hint.textContent = '💡 提示';
    row.appendChild(ok); row.appendChild(hint);
    card.appendChild(input); card.appendChild(row);
    setTimeout(() => input.focus(), 50);

    function judge() {
      if (card.dataset.done) return; card.dataset.done = '1';
      const val = gNorm(input.value);
      const correct = val === gNorm(q.answer);
      if (!correct) input.classList.add('shake');
      finish(correct, input.value);
    }
    ok.onclick = judge;
    input.addEventListener('keydown', e => { if (e.key === 'Enter') judge(); });
    hint.onclick = () => {
      const a = q.answer;
      const half = a.includes(' ') ? a.split(' ').slice(0, Math.ceil(a.split(' ').length / 2)).join(' ') : a.slice(0, Math.ceil(a.length / 2));
      input.value = half; input.focus(); gToast('已给出一半提示');
    };
  }

  gMain.appendChild(wrap);
}

function renderQuizResult(g) {
  gMain.innerHTML = '';
  const total = gQuizPool.length;
  const acc = Math.round(gQuizScore / total * 100);
  const stars = acc >= 90 ? 3 : acc >= 70 ? 2 : acc >= 50 ? 1 : 0;
  const face = stars === 3 ? '🏆' : stars === 2 ? '😄' : stars === 1 ? '🙂' : '💪';
  const starStr = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);

  // 记录「已做完练习」状态，供导航 chip 标记 ⭐已练
  // 仅当整组题都属于同一语法点时记录（错题混做不算）
  const samePoint = gQuizPool.every(p => (p.gid || g.id) === g.id);
  if (samePoint) {
    const prevQ = gState.quizDone[g.id] || {};
    gState.quizDone[g.id] = {
      best: Math.max(prevQ.best || 0, acc),
      runs: (prevQ.runs || 0) + 1,
      ts: Date.now()
    };
    saveGState(); gUpdateChip();
  }

  const wrap = document.createElement('div');
  wrap.className = 'quiz-wrap';
  const card = document.createElement('div');
  card.className = 'result-card';
  card.innerHTML = `
    <div class="result-emoji">${face}</div>
    <div class="result-score">${gQuizScore} / ${total}</div>
    <div class="result-stars">${starStr}</div>
    <div class="result-detail">正确率 ${acc}%${stars === 3 ? ' · 这个语法点掌握得很好！' : stars < 2 ? ' · 回看讲解再练一次！' : ''}</div>`;

  // 错题回顾
  const wrongCount = Object.keys(gState.wrong).filter(k => k.startsWith(g.id + ':')).length;
  if (wrongCount > 0) {
    const wr = document.createElement('div');
    wr.className = 'gram-wrong-note';
    wr.textContent = `📒 这个语法点有 ${wrongCount} 道错题已记入错题本（可在顶部「📒 错题本」查看）`;
    card.appendChild(wr);
  }

  const again = document.createElement('button');
  again.className = 'btn coral'; again.style.width = '100%';
  again.textContent = '🔁 再来一组';
  again.onclick = () => { renderQuizIntro(); };
  const learn = document.createElement('button');
  learn.className = 'btn ghost'; learn.style.width = '100%'; learn.style.marginTop = '10px';
  learn.textContent = '📖 回看讲解';
  learn.onclick = () => { gMode = 'learn'; renderGram(); };
  const next = document.createElement('button');
  next.className = 'btn purple'; next.style.width = '100%'; next.style.marginTop = '10px';
  next.textContent = '➡️ 下一个语法点';
  next.onclick = () => {
    const list = currentGrammars();
    const gi = list.findIndex(x => x.id === gCurrent);
    gCurrent = list[(gi + 1) % list.length].id;
    gMode = 'learn'; renderGram();
  };
  card.appendChild(again); card.appendChild(learn); card.appendChild(next);
  wrap.appendChild(card);
  gMain.appendChild(wrap);
}

/* ===================================================================
   3) 错题本（语法版）
=================================================================== */
function renderGramWrong() {
  gMain.innerHTML = '';
  const ids = Object.keys(gState.wrong);
  const title = document.createElement('div');
  title.className = 'panel-title'; title.textContent = '📒 语法错题本';
  const hint = document.createElement('div');
  hint.className = 'panel-hint';
  hint.textContent = ids.length ? `共 ${ids.length} 道语法错题，复习时优先重做！` : '还没有错题，太棒了！';
  gMain.appendChild(title); gMain.appendChild(hint);

  if (!ids.length) {
    gMain.innerHTML += '<div class="empty-state"><span class="big">🏅</span>暂无错题，继续加油！</div>';
    return;
  }

  // 错题重练按钮
  const review = document.createElement('button');
  review.className = 'btn coral'; review.style.width = '100%'; review.style.marginBottom = '16px';
  review.textContent = '🔁 重做全部错题';
  review.onclick = () => {
    const pool = ids.map(key => {
      const [gid, qs] = key.split(':');
      const g = GRAMMAR.find(x => x.id === gid);
      if (!g) return null;
      const qi = parseInt(qs.replace('q', ''), 10);
      const q = g.questions[qi];
      return q ? { ...q, qi, gid } : null;
    }).filter(Boolean);
    if (!pool.length) { gToast('暂无错题可重做'); return; }
    gQuizPool = gShuffle(pool);
    gQuizIdx = 0; gQuizScore = 0; gQuizResults = [];
    const first = gQuizPool[0];
    const firstG = GRAMMAR.find(x => x.id === first.gid);
    renderQuizQuestion(firstG || currentGrammars()[0] || GRAMMAR[0], first);
  };
  gMain.appendChild(review);

  // 错题列表
  const list = document.createElement('div'); list.className = 'wrong-list';
  ids.forEach(key => {
    const [gid, qs] = key.split(':');
    const g = GRAMMAR.find(x => x.id === gid); if (!g) return;
    const qi = parseInt(qs.replace('q', ''), 10);
    const q = g.questions[qi]; if (!q) return;
    const w = gState.wrong[key];
    const item = document.createElement('div'); item.className = 'wrong-item';
    item.innerHTML = `
      <div class="wi-word">${gEsc(g.title)} <span class="wi-tag">错 ${w.count} 次</span></div>
      <div class="wi-meta saved-prompt">${gEsc(q.prompt)}</div>
      <div class="wi-meta">✅ 答案：<b>${gEsc(q.answer)}</b></div>
      <div class="wi-meta">✏️ 你的作答：${gEsc(w.your || '—')}</div>
      ${q.explain ? `<div class="wi-meta" style="color:var(--ink-soft)">📝 ${gEsc(q.explain)}</div>` : ''}`;
    list.appendChild(item);
  });
  gMain.appendChild(list);
}

/* ---------- 首次进入 ---------- */
renderGram();
