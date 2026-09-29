/* ===================================================================
   考纲词汇岛 · 上海中考英语考纲词汇打卡
   数据源：exam-vocab-data.js（官方《英语词汇表》解析）
   进度键：localStorage exam_island_v1 / 云端单元 u_exam
=================================================================== */

var STORE_KEY = 'exam_island_v1';
var STORE_SUFFIX = 'exam';
var DAILY_GOAL = 15;
var LEVEL_DAYS = [1, 2, 4, 7, 15, 30, 60];
var MASTER_LEVEL = 3;
var DAY_MS = 86400000;

var main = document.getElementById('main');
var $ = function (s) { return document.querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

/* ---------- 状态 ---------- */
function loadState() {
  try {
    var raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      var s = JSON.parse(raw);
      if (!s.mastery) s.mastery = {};
      if (!s.wrong) s.wrong = {};
      if (!s.days) s.days = {};
      if (typeof s.ptr !== 'number') s.ptr = 0;
      return s;
    }
  } catch (e) {}
  return { mastery: {}, wrong: {}, days: {}, ptr: 0 };
}
var state = loadState();

function saveState() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
}
var pushTimer = null;
function pushCloud() {
  if (!window.CloudSync || !CloudSync.enabled) return;
  clearTimeout(pushTimer);
  pushTimer = setTimeout(function () {
    CloudSync.push(state).then(function (ok) { setSyncDot(ok ? 'ok' : 'err'); });
  }, 900);
}

/* ---------- 工具 ---------- */
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}
function shuffle(a) {
  var r = a.slice();
  for (var i = r.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = r[i]; r[i] = r[j]; r[j] = t;
  }
  return r;
}
var toastTimer = null;
function toast(msg) {
  var el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { el.classList.remove('show'); }, 1800);
}
function speak(text, rate) {
  if (window.VoiceKit && VoiceKit.speak) VoiceKit.speak(text, rate || 0.92);
}
function today(offset) {
  var d = new Date(Date.now() - (offset || 0) * DAY_MS);
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

/* ---------- 数据 ---------- */
var ALL = [];
(function buildAll() {
  (window.KAOGANG_WORDS || []).forEach(function (e) {
    ALL.push({ w: e.w, p: e.p || '', m: e.m || '', n: e.n || '', a: e.a || '', p2: e.p2 || [], c: e.c || 0, grp: (e.w[0] || '').toUpperCase() });
  });
  (window.KAOGANG_PHRASES || []).forEach(function (e) {
    ALL.push({ w: e.w, p: e.p || 'phr.', m: e.m || '', n: '', a: '', p2: [], c: e.c || 0, grp: '词组' });
  });
})();
var BY_KEY = {};
ALL.forEach(function (x) { BY_KEY[key(x)] = x; });
function key(x) { return String(x.w).toLowerCase(); }
function fullMean(x) {
  var parts = [x.m];
  (x.p2 || []).forEach(function (o) { parts.push('(' + o.p + ') ' + o.m); });
  return parts.join('　');
}
function isMastered(x) {
  var m = state.mastery[key(x)];
  return !!(m && m.lv >= MASTER_LEVEL);
}
function masteredCount(list) {
  return list.filter(isMastered).length;
}
function dueList() {
  var now = Date.now();
  var out = [];
  ALL.forEach(function (x) {
    var m = state.mastery[key(x)];
    if (m && m.due && m.due <= now) out.push(x);
  });
  return out;
}
function wrongList() {
  return Object.keys(state.wrong).map(function (k) { return BY_KEY[k]; }).filter(Boolean);
}
function dailyPick() {
  var n = ALL.length, i = state.ptr || 0, pool = [], scanned = 0;
  while (pool.length < DAILY_GOAL && scanned < n) {
    var x = ALL[(i + scanned) % n];
    if (!isMastered(x)) pool.push(x);
    scanned++;
  }
  return { pool: pool, nextPtr: (i + scanned) % n };
}

/* ---------- 进度条 ---------- */
function updateChip() {
  var el = document.getElementById('examMastery');
  if (!el) return;
  var done = masteredCount(ALL);
  var due = dueList().length;
  el.textContent = '已掌握 ' + done + ' / ' + ALL.length + (due ? ' · 待复习 ' + due : '');
}
function setSyncDot(kind) {
  var bar = document.getElementById('cloudBar');
  if (!bar) return;
  var dot = bar.querySelector('.sync-dot');
  if (!dot) return;
  dot.textContent = kind === 'ok' ? '☁️ 已同步' : (kind === 'err' ? '⚠️ 同步失败' : '');
}

/* ===================================================================
   模式渲染
=================================================================== */
var currentMode = 'daily';
function renderMode(mode) {
  currentMode = mode || currentMode;
  $$('.mode-btn').forEach(function (b) { b.classList.toggle('active', b.dataset.mode === currentMode); });
  main.innerHTML = '';
  if (currentMode === 'daily') return renderDaily();
  if (currentMode === 'cards') return renderCards();
  if (currentMode === 'match') return startQuiz(mixPool('match'), { title: '选义练习' });
  if (currentMode === 'spell') return startQuiz(mixPool('spell'), { title: '拼写练习' });
  if (currentMode === 'listen') return startQuiz(mixPool('listen'), { title: '听写练习' });
  if (currentMode === 'review') return renderReview();
  if (currentMode === 'browse') return renderBrowse();
  if (currentMode === 'wrong') return renderWrong();
}

/* 从当前分组抽一组题（默认 20 题，优先没掌握的） */
function mixPool(type, count) {
  count = count || 20;
  var pool = ALL.filter(function (x) { return !isMastered(x); });
  if (pool.length < count) pool = pool.concat(ALL);
  return shuffle(pool).slice(0, count).map(function (x) { return { x: x, type: type }; });
}

/* ---------- 今日打卡 ---------- */
function renderDaily() {
  quiz = null;
  state.ptr = state.ptr || 0;
  var pick = dailyPick();
  var doneToday = state.days[today()] || 0;
  var goalLeft = Math.max(0, DAILY_GOAL - doneToday);

  var title = document.createElement('div');
  title.className = 'panel-title';
  title.textContent = '🗓️ 今日打卡';
  var hint = document.createElement('div');
  hint.className = 'panel-hint';
  hint.textContent = doneToday >= DAILY_GOAL
    ? '今天的目标已完成，真棒！可以再练一组，或者去复习待复习的词。'
    : '今天已练 ' + doneToday + ' 个，还差 ' + goalLeft + ' 个达成目标（每天 ' + DAILY_GOAL + ' 个）。';
  main.appendChild(title); main.appendChild(hint);

  var stats = document.createElement('div');
  stats.className = 'exam-stats';
  stats.innerHTML =
    '<div class="exam-stat"><b>' + masteredCount(ALL) + '</b><span>已掌握 / ' + ALL.length + '</span></div>' +
    '<div class="exam-stat"><b>' + dueList().length + '</b><span>待复习</span></div>' +
    '<div class="exam-stat"><b>' + wrongList().length + '</b><span>错题本</span></div>' +
    '<div class="exam-stat"><b>' + Math.round(100 * masteredCount(ALL) / ALL.length) + '%</b><span>考纲覆盖率</span></div>';
  main.appendChild(stats);

  var cal = document.createElement('div');
  cal.className = 'exam-cal';
  for (var i = 6; i >= 0; i--) {
    var d = today(i);
    var n = state.days[d] || 0;
    cal.innerHTML += '<div class="exam-day' + (n > 0 ? ' done' : '') + (i === 0 ? ' today' : '') + '">' +
      '<div class="d">' + d.slice(5) + '</div><div class="n">' + (n || '·') + '</div></div>';
  }
  main.appendChild(cal);

  var startBtn = document.createElement('button');
  startBtn.className = 'btn coral';
  startBtn.style.width = '100%';
  startBtn.textContent = '▶ 开始今天的 ' + pick.pool.length + ' 个词（约 5 分钟）';
  startBtn.onclick = function () {
    var types = ['match', 'spell', 'match', 'listen'];
    var list = pick.pool.map(function (x, i) { return { x: x, type: types[i % types.length] }; });
    startQuiz(list, {
      title: '今日打卡',
      nextPtr: pick.nextPtr,
      dailyCount: pick.pool.length
    });
  };
  main.appendChild(startBtn);

  var row = document.createElement('div');
  row.style.cssText = 'display:flex;gap:10px;margin-top:10px';
  var b1 = document.createElement('button');
  b1.className = 'btn ghost'; b1.style.flex = '1'; b1.textContent = '🔁 复习 ' + dueList().length + ' 个待复习';
  b1.onclick = function () { renderMode('review'); };
  var b2 = document.createElement('button');
  b2.className = 'btn ghost'; b2.style.flex = '1'; b2.textContent = '🃏 随便翻翻闪卡';
  b2.onclick = function () { renderMode('cards'); };
  row.appendChild(b1); row.appendChild(b2);
  main.appendChild(row);

  var note = document.createElement('div');
  note.className = 'panel-hint';
  note.style.marginTop = '18px';
  note.textContent = '打卡从考纲词表顺序推进（A→Z），跳过已掌握的词；中途退出也不会丢进度。';
  main.appendChild(note);
}

/* ---------- 闪卡 ---------- */
var cardIdx = 0;
var cardShown = false;
function renderCards() {
  quiz = null;
  var list = ALL;
  if (!cardIdx && state.ptr) cardIdx = state.ptr;
  if (cardIdx >= list.length) cardIdx = 0;
  var x = list[cardIdx];

  var title = document.createElement('div');
  title.className = 'panel-title'; title.textContent = '🃏 闪卡';
  var hint = document.createElement('div');
  hint.className = 'panel-hint';
  hint.textContent = '第 ' + (cardIdx + 1) + ' / ' + list.length + ' 个 · 点卡片显示释义，♻️ 可以重来';
  main.appendChild(title); main.appendChild(hint);

  var card = document.createElement('div');
  card.className = 'word-card' + (cardShown ? '' : ' blur');
  card.innerHTML =
    '<div class="wc-top"><span class="wc-w">' + esc(x.w) + '</span><span class="wc-p">' + esc(x.p) + '</span>' +
    '<span class="wc-badge' + (x.c ? '' : ' none') + '">' + (x.c ? '📗 课本已学' : '🆕 考纲新增') + '</span>' +
    (x.a ? '<span class="er-mini">也作 ' + esc(x.a) + '</span>' : '') + '</div>' +
    '<div class="wc-m">' + esc(fullMean(x)) + '</div>' +
    (x.n ? '<div class="wc-extra">📝 ' + esc(x.n) + '</div>' : '') +
    '<div class="wc-extra">' + (isMastered(x) ? '✅ 已掌握（复习 ' + nextDueText(x) + '）' : '⏳ 还没掌握') + '</div>';
  card.onclick = function () { cardShown = !cardShown; card.classList.toggle('blur'); };
  main.appendChild(card);

  var row = document.createElement('div');
  row.style.cssText = 'display:flex;gap:10px;flex-wrap:wrap';
  var bSpeak = mkBtn('🔊 读一遍', 'btn purple', function () { speak(x.w); });
  var bPrev = mkBtn('◀ 上一个', 'btn ghost', function () { cardIdx = (cardIdx - 1 + list.length) % list.length; cardShown = false; renderCards(); });
  var bKnow = mkBtn('✅ 认识', 'btn', function () { answer(x, true, 'cards'); cardIdx++; cardShown = false; renderCards(); });
  var bNo = mkBtn('🤔 不熟', 'btn ghost', function () { answer(x, false, 'cards'); cardIdx++; cardShown = false; renderCards(); });
  var bNext = mkBtn('下一个 ▶', 'btn ghost', function () { cardIdx = (cardIdx + 1) % list.length; cardShown = false; renderCards(); });
  [bSpeak, bPrev, bKnow, bNo, bNext].forEach(function (b) { row.appendChild(b); });
  main.appendChild(row);
}
/* 干扰项：优先同首字母/同类型（词 vs 词组），避免混进无关词组 */
function distractors(x, n) {
  var same = [], other = [];
  ALL.forEach(function (y) {
    if (key(y) === key(x)) return;
    if (y.grp === x.grp) same.push(y); else other.push(y);
  });
  var r = shuffle(same).slice(0, n);
  if (r.length < n) r = r.concat(shuffle(other).slice(0, n - r.length));
  return r;
}
function mkBtn(text, cls, fn) {
  var b = document.createElement('button');
  b.className = cls; b.textContent = text; b.onclick = fn;
  return b;
}
function nextDueText(x) {
  var m = state.mastery[key(x)];
  if (!m || !m.due) return '—';
  var days = Math.round((m.due - Date.now()) / DAY_MS);
  if (days <= 0) return '现在';
  return days + ' 天后';
}

/* ---------- 复习 ---------- */
function renderReview() {
  quiz = null;
  var due = dueList();
  var wr = wrongList();
  var pool = [];
  due.forEach(function (x) { pool.push(x); });
  wr.forEach(function (x) { if (pool.indexOf(x) < 0) pool.push(x); });

  var title = document.createElement('div');
  title.className = 'panel-title'; title.textContent = '🔁 复习';
  var hint = document.createElement('div');
  hint.className = 'panel-hint';
  hint.textContent = pool.length
    ? '按遗忘曲线安排：到期 ' + due.length + ' 个，错题 ' + wr.length + ' 个，共 ' + pool.length + ' 个。'
    : '暂时没有需要复习的词，去打卡学新词吧！';
  main.appendChild(title); main.appendChild(hint);

  if (!pool.length) {
    var b = mkBtn('🗓️ 去今日打卡', 'btn coral', function () { renderMode('daily'); });
    b.style.width = '100%'; main.appendChild(b);
    return;
  }
  var types = ['match', 'listen', 'spell'];
  var list = pool.map(function (x, i) { return { x: x, type: types[i % types.length] }; });
  var s = mkBtn('▶ 开始复习（' + list.length + ' 题）', 'btn coral', function () {
    startQuiz(list, { title: '复习' });
  });
  s.style.width = '100%'; s.style.marginBottom = '16px';
  main.appendChild(s);

  var box = document.createElement('div');
  box.className = 'exam-list';
  pool.slice(0, 40).forEach(function (x) {
    box.appendChild(rowOf(x));
  });
  main.appendChild(box);
  if (pool.length > 40) {
    var more = document.createElement('div');
    more.className = 'panel-hint';
    more.textContent = '（下面只显示前 40 个，练习会覆盖全部）';
    main.appendChild(more);
  }
}
function rowOf(x) {
  var r = document.createElement('div');
  r.className = 'exam-row' + (isMastered(x) ? ' done' : '');
  r.innerHTML = '<span class="er-w">' + esc(x.w) + '</span><span class="er-p">' + esc(x.p) + '</span>' +
    '<span class="er-m">' + esc(fullMean(x)) + '</span>' +
    '<button class="btn ghost small" style="min-height:34px;padding:6px 10px">🔊</button>';
  r.querySelector('button').onclick = function (ev) { ev.stopPropagation(); speak(x.w); };
  return r;
}

/* ---------- 词库浏览 ---------- */
var browseGrp = 'A';
function renderBrowse() {
  quiz = null;
  var groups = ['词组'].concat('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''));
  var letters = document.createElement('div');
  letters.className = 'exam-letters';
  groups.forEach(function (g) {
    var list = ALL.filter(function (x) { return x.grp === g; });
    if (!list.length) return;
    var b = document.createElement('button');
    b.className = 'letter-btn' + (g === browseGrp ? ' active' : '');
    b.innerHTML = g + '<span class="ln">' + masteredCount(list) + '/' + list.length + '</span>';
    b.onclick = function () { browseGrp = g; renderBrowse(); };
    letters.appendChild(b);
  });
  var title = document.createElement('div');
  title.className = 'panel-title'; title.textContent = '📖 词库';
  var hint = document.createElement('div');
  hint.className = 'panel-hint';
  hint.textContent = '按考纲原顺序排列 · 点 🔊 可听发音 · 绿色边表示已掌握';
  main.appendChild(title); main.appendChild(hint); main.appendChild(letters);

  var list = ALL.filter(function (x) { return x.grp === browseGrp; });
  var box = document.createElement('div');
  box.className = 'exam-list';
  list.forEach(function (x) { box.appendChild(rowOf(x)); });
  main.appendChild(box);

  var s = mkBtn('▶ 练这一组（' + list.length + ' 个）', 'btn coral', function () {
    var types = ['match', 'spell'];
    startQuiz(shuffle(list).slice(0, 20).map(function (x, i) { return { x: x, type: types[i % 2] }; }), { title: browseGrp + ' 组练习' });
  });
  s.style.width = '100%'; s.style.marginTop = '16px';
  main.appendChild(s);
}

/* ---------- 错题本 ---------- */
function renderWrong() {
  quiz = null;
  var wr = wrongList();
  var title = document.createElement('div');
  title.className = 'panel-title'; title.textContent = '📒 考纲错题本';
  var hint = document.createElement('div');
  hint.className = 'panel-hint';
  hint.textContent = wr.length ? '共 ' + wr.length + ' 个词答错过，答对一次就移出。' : '还没有错题，保持住！';
  main.appendChild(title); main.appendChild(hint);

  if (!wr.length) {
    main.insertAdjacentHTML('beforeend', '<div class="empty-state"><span class="big">🏅</span>暂无错题</div>');
    return;
  }
  var makeBtn2 = function () {
    var b = mkBtn('🔁 重做错题（' + wr.length + ' 个 · 答对自动移出）', 'btn coral', function () {
      var types = ['match', 'spell', 'listen'];
      startQuiz(shuffle(wr).map(function (x, i) { return { x: x, type: types[i % 3] }; }), { title: '错题重练' });
    });
    b.style.width = '100%'; b.style.marginBottom = '14px';
    return b;
  };
  main.appendChild(makeBtn2());
  var box = document.createElement('div');
  box.className = 'wrong-list';
  wr.forEach(function (x) {
    var w = state.wrong[key(x)];
    var item = document.createElement('div');
    item.className = 'wrong-item';
    item.innerHTML =
      '<div class="wi-word">' + esc(x.w) + ' <span style="font-size:13px;color:var(--ink-soft);font-weight:700">' + esc(x.p) + '</span>' +
      '<span class="wi-tag">错 ' + (w ? w.count : 1) + ' 次</span></div>' +
      '<div class="wi-meta">💡 ' + esc(fullMean(x)) + '</div>' +
      '<div class="wi-meta">📗 ' + (x.c ? '课本学过' : '课本未出现') + ' · 下次复习 ' + nextDueText(x) + '</div>';
    var del = mkBtn('移除', 'btn ghost small saved-del', function () {
      delete state.wrong[key(x)];
      saveState(); pushCloud(); toast('已移出错题本'); renderWrong();
    });
    item.appendChild(del);
    box.appendChild(item);
  });
  main.appendChild(box);
  main.appendChild(makeBtn2());
}

/* ===================================================================
   答题引擎
=================================================================== */
var quiz = null;
function startQuiz(list, opts) {
  opts = opts || {};
  if (!list || !list.length) { toast('这一组没有题目'); return; }
  quiz = {
    list: list, idx: 0, score: 0, wrongs: [],
    title: opts.title || '练习',
    nextPtr: typeof opts.nextPtr === 'number' ? opts.nextPtr : null,
    dailyCount: opts.dailyCount || 0
  };
  renderQuizQuestion();
}
function renderQuizQuestion() {
  main.innerHTML = '';
  if (quiz.idx >= quiz.list.length) return renderQuizResult();
  var item = quiz.list[quiz.idx];
  var x = item.x, type = item.type;

  var head = document.createElement('div');
  head.className = 'panel-hint';
  head.style.cssText = 'display:flex;justify-content:space-between;margin-bottom:10px';
  head.innerHTML = '<span>' + esc(quiz.title) + ' · 第 ' + (quiz.idx + 1) + ' / ' + quiz.list.length + ' 题</span>' +
    '<span>✅ ' + quiz.score + '</span>';
  main.appendChild(head);

  var card = document.createElement('div');
  card.className = 'q-card';
  main.appendChild(card);

  var fb = document.createElement('div');
  fb.className = 'feedback';
  var judged = false;

  function judge(correct, your) {
    if (judged) return;
    judged = true;
    answer(x, correct, type);
    fb.className = 'feedback show ' + (correct ? 'ok' : 'no');
    fb.innerHTML = (correct ? '✅ 答对了！' : '❌ 再记一下') +
      '<span class="fb-en">' + esc(x.w) + '　' + esc(x.p) + '　' + esc(fullMean(x)) + '</span>' +
      (x.n ? '<span class="fb-cn">📝 ' + esc(x.n) + '</span>' : '');
    var nx = mkBtn(quiz.idx === quiz.list.length - 1 ? '看结果 🏁' : '下一题 ▶', 'btn coral', function () {
      quiz.idx++; renderQuizQuestion();
    });
    nx.style.marginTop = '10px';
    card.appendChild(nx);
    if (type !== 'match') speak(x.w);
  }

  if (type === 'match') {
    var opts = shuffle([x].concat(distractors(x, 3)));
    card.innerHTML = '<div class="q-prompt">选出正确的中文意思</div>' +
      '<div class="q-big" style="display:flex;align-items:center;gap:12px">' + esc(x.w) +
      '<button class="btn ghost small" style="min-height:38px;padding:8px 12px">🔊</button>' +
      '<span style="font-size:14px;font-weight:700;color:var(--ink-soft)">' + esc(x.p) + '</span></div>';
    card.querySelector('button').onclick = function (ev) { ev.stopPropagation(); speak(x.w); };
    var box = document.createElement('div');
    box.className = 'options';
    opts.forEach(function (o) {
      var b = document.createElement('button');
      b.className = 'opt';
      b.textContent = fullMean(o);
      b.onclick = function () {
        if (judged) return;
        var ok = key(o) === key(x);
        b.classList.add(ok ? 'correct' : 'wrong');
        if (!ok) $$('.opt', box).forEach(function (el) { if (el.textContent === fullMean(x)) el.classList.add('correct'); });
        judge(ok, o.w);
      };
      box.appendChild(b);
    });
    card.appendChild(box);
  } else {
    var isListen = type === 'listen';
    card.innerHTML = '<div class="q-prompt">' + (isListen ? '听发音，写出单词' : '根据中文写出单词') + '</div>' +
      '<div class="q-big" style="font-size:20px;display:flex;align-items:center;gap:12px">' +
      (isListen
        ? '<button class="btn purple small" style="min-height:44px">🔊 再听一次</button>'
        : esc(fullMean(x)) + '<button class="btn ghost small" style="min-height:38px;padding:8px 12px">🔊</button>') +
      '<span style="font-size:14px;font-weight:700;color:var(--ink-soft)">' + esc(x.p) + '</span></div>' +
      '<div style="font-size:14px;font-weight:800;color:var(--ink-soft);margin:6px 0 8px">' +
      '首字母 ' + esc(String(x.w)[0]) + ' · 共 ' + String(x.w).replace(/[^A-Za-z]/g, '').length + ' 个字母' +
      (String(x.w).indexOf(' ') >= 0 ? '（词组）' : '') + '</div>';
    card.querySelector('.btn').onclick = function (ev) { ev.stopPropagation(); speak(x.w, isListen ? 0.85 : 0.92); };
    var input = document.createElement('input');
    input.className = 'text-input';
    input.placeholder = '在这里输入英文…';
    input.autocomplete = 'off';
    input.autocapitalize = 'off';
    input.spellcheck = false;
    var sub = mkBtn('✓ 提交', 'btn purple', check);
    var wrap2 = document.createElement('div');
    wrap2.style.cssText = 'display:flex;gap:10px;margin-top:10px';
    wrap2.appendChild(input); wrap2.appendChild(sub);
    card.appendChild(wrap2);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') check(); });
    if (isListen) setTimeout(function () { speak(x.w, 0.85); }, 350);

    function check() {
      if (judged) return;
      var v = input.value.trim().toLowerCase();
      var ok = v === key(x) || (x.a && v === String(x.a).toLowerCase());
      if (!v) { toast('先写一个答案吧'); return; }
      input.disabled = true;
      sub.disabled = true;
      judge(ok, v);
    }
  }

  card.appendChild(fb);
  window.scrollTo(0, 0);
}
function renderQuizResult() {
  main.innerHTML = '';
  var total = quiz.list.length;
  var acc = Math.round(100 * quiz.score / total);
  var title = document.createElement('div');
  title.className = 'panel-title';
  title.textContent = acc >= 90 ? '🏆 太厉害了！' : (acc >= 70 ? '👍 不错，再巩固一下' : '💪 继续加油');
  var hint = document.createElement('div');
  hint.className = 'panel-hint';
  hint.textContent = quiz.title + '：答对 ' + quiz.score + ' / ' + total + '（' + acc + '%）' +
    (quiz.dailyCount ? ' · 今日打卡 +' + quiz.dailyCount : '');
  main.appendChild(title); main.appendChild(hint);

  if (quiz.nextPtr != null) {
    state.ptr = quiz.nextPtr;
    var d = today();
    state.days[d] = (state.days[d] || 0) + quiz.dailyCount;
    saveState(); pushCloud(); updateChip();
  }
  if (quiz.wrongs.length) {
    var box = document.createElement('div');
    box.className = 'exam-list';
    quiz.wrongs.forEach(function (x) { box.appendChild(rowOf(x)); });
    var t2 = document.createElement('div');
    t2.className = 'panel-hint'; t2.textContent = '这次错的 ' + quiz.wrongs.length + ' 个（已进错题本）：';
    main.appendChild(t2); main.appendChild(box);
  }
  var row = document.createElement('div');
  row.style.cssText = 'display:flex;gap:10px;margin-top:16px;flex-wrap:wrap';
  row.appendChild(mkBtn('🔁 再来一轮', 'btn coral', function () { renderMode(currentMode); }));
  row.appendChild(mkBtn('🗓️ 今日打卡', 'btn ghost', function () { renderMode('daily'); }));
  row.appendChild(mkBtn('📒 错题本', 'btn ghost', function () { renderMode('wrong'); }));
  main.appendChild(row);
}

/* ---------- 记分 ---------- */
function answer(x, correct, mode) {
  var k = key(x);
  var m = state.mastery[k] || { lv: 0, c: 0, a: 0, ts: 0, due: 0 };
  m.a++; m.ts = Date.now();
  if (correct) {
    m.c = (m.c || 0) + 1;
    m.lv = Math.min((m.lv || 0) + 1, LEVEL_DAYS.length - 1);
    m.due = Date.now() + LEVEL_DAYS[m.lv] * DAY_MS;
    if (state.wrong[k]) delete state.wrong[k];
  } else {
    m.lv = Math.max(0, (m.lv || 0) - 2);
    m.due = Date.now() + 600000;
    var w = state.wrong[k] || { count: 0, ts: 0 };
    w.count++; w.ts = Date.now();
    state.wrong[k] = w;
  }
  m.last = mode || '';
  state.mastery[k] = m;
  if (quiz) {
    if (correct) quiz.score++;
    else if (quiz.wrongs.indexOf(x) < 0) quiz.wrongs.push(x);
  }
  saveState(); pushCloud(); updateChip();
}

/* ===================================================================
   云端同步 & 启动
=================================================================== */
CloudSync.init().then(function (ok) {
  var bar = document.getElementById('cloudBar');
  if (!ok) { if (bar) bar.style.display = 'none'; return; }
  bar.style.display = '';
  bar.innerHTML = '<span class="sync-dot"></span>';
  CloudSync.getLoginState().then(function (login) {
    bar.innerHTML = '<span class="sync-dot">' + (login ? '☁️ 已连接家庭账号' : '📴 仅本机保存') + '</span>';
    if (login) {
      CloudSync.pull().then(function (cloud) {
        if (cloud) {
          state = Object.assign(loadState(), cloud);
          saveState(); updateChip();
          if (currentMode === 'daily') renderMode('daily');
        }
      });
    }
  });
});

$$('.mode-btn').forEach(function (b) {
  b.onclick = function () { renderMode(b.dataset.mode); };
});
var vp = document.getElementById('voicePickBtn');
if (vp) vp.onclick = function () { if (window.VoiceKit) VoiceKit.showPicker(); };

updateChip();
renderMode('daily');
