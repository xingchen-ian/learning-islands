/* ===== 词汇冒险岛 · 交互逻辑 ===== */
'use strict';

/* ---------- 状态 / 本地存储 ---------- */
// 存储键按单元隔离：数据文件可定义 STORE_SUFFIX（如 'u2'），
// U1 不定义则沿用原键 'vocab_island_v1'，保证老进度不丢失。
const STORE_KEY = (typeof STORE_SUFFIX !== 'undefined' && STORE_SUFFIX)
  ? 'vocab_' + STORE_SUFFIX + '_v1'
  : 'vocab_island_v1';
const MAX_WEAK = 3; // 「还不太熟」等级上限：每点一次，红色加深一档
let state = loadState();

/* ---------- 预置校内错题（家长/老师录入，自动进错题本） ----------
   数据来自 preset-wrong.js（未引入该文件时自动跳过）。
   只在词汇岛首页（无 STORE_SUFFIX）注入，避免每个单元页面重复出现。

   state.presetDone 记录「已经答对移出」或「手动删除」的 preset key，
   这两种情况都不再注入。注意：注入本身**不写** presetDone ——
   因为云端同步 pull 会用云端数据覆盖本地 state，若注入时就标记完成，
   一旦被云端旧数据覆盖，题目就永久丢失了。只在用户主动处理（答对/删除）
   时才落标记，这样覆盖丢失后下次打开会自动补回来。 */
function seedPresetWrong() {
  if (typeof PRESET_WRONG === 'undefined' || !Array.isArray(PRESET_WRONG)) return;
  if (STORE_KEY !== 'vocab_island_v1') return;
  if (!Array.isArray(state.presetDone)) state.presetDone = [];
  if (!Array.isArray(state.customWrong)) state.customWrong = [];
  let added = 0;
  PRESET_WRONG.forEach(function (p) {
    if (!p || !p.key) return;
    if (state.presetDone.indexOf(p.key) >= 0) return;                        // 已掌握/已删除
    if (state.customWrong.some(function (c) { return c.key === p.key; })) return; // 已在错题本
    state.customWrong.push(Object.assign({}, p, { at: p.at || Date.now() }));
    added++;
  });
  if (added) saveState();
  return added;
}
// 用户主动处理掉一条预置错题（答对移出 / 手动删除）→ 永久不再注入
function markPresetDone(key) {
  if (!key || String(key).indexOf('preset-') !== 0) return;
  if (!Array.isArray(state.presetDone)) state.presetDone = [];
  if (state.presetDone.indexOf(key) < 0) state.presetDone.push(key);
}
seedPresetWrong();

/* ---------- 云端同步接入 ---------- */
// 初始化 CloudBase（若 config.js 未填 ENV_ID 或未加载 SDK，则自动关闭，不影响本地功能）
CloudSync.init().then(function (ok) {
  if (!ok) { renderCloudBar(null); return; }
  CloudSync.getLoginState().then(function (login) {
    renderCloudBar(login);
    if (login) {
      // 已登录：拉取云端进度覆盖本地，并刷新当前视图
      CloudSync.pull().then(function (cloud) {
        // 云端数据覆盖本地后，重新补一次预置错题（云端旧进度里可能还没有）
        if (cloud) { state = Object.assign(loadState(), cloud); seedPresetWrong(); saveState(); renderMode(currentMode); }
      });
    }
  });
});

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const s = JSON.parse(raw);
      // 兼容旧数据：weak 旧值可能是 true，统一为等级 1
      if (s.weak) Object.keys(s.weak).forEach(k => { if (s.weak[k] === true) s.weak[k] = 1; });
      if (!Array.isArray(s.saved)) s.saved = [];
      if (!Array.isArray(s.customWrong)) s.customWrong = [];
      return s;
    }
  } catch (e) { /* file:// 下可能受限，忽略 */ }
  return { mastery: {}, wrong: {}, known: {}, weak: {}, saved: [], dictWrong: {}, verbWrong: {}, customWrong: [] };
}

const MODE_LABELS = {
  match: '中英匹配', forms: '词性转换', cloze: '选词填空',
  spell: '拼写练习', sentence: '造句练习'
};
const SAVED_MAX = 200;

function questionKey(type, q) {
  if (type === 'match') return `match:${q.id}:${q.word}`;
  if (type === 'forms') return `forms:${q.id}:${q.base}->${q.answer}`;
  if (type === 'cloze') return `cloze:${q.id}:${q.answer}:${q.sentence}`;
  if (type === 'spell') return `spell:${q.id}:${q.answer}`;
  if (type === 'sentence') return `sentence:${q.id}:${q.word}:${q.cn}`;
  return `${type}:${q.id}`;
}

function questionPrompt(type, q) {
  if (type === 'match') return `选出「${q.word}」的中文释义`;
  if (type === 'forms') return `${q.base}（${q.basePos}）→ ${shortPos(q.targetPos)} 形式`;
  if (type === 'cloze') return q.sentence;
  if (type === 'spell') return `拼写：${q.meaning}（${q.pos}）`;
  if (type === 'sentence') return q.cn;
  return '';
}

function recordSaved(type, q, correct, info) {
  if (!Array.isArray(state.saved)) state.saved = [];
  const key = questionKey(type, q);
  const entry = {
    key,
    type,
    id: q.id,
    prompt: questionPrompt(type, q),
    answer: (info && info.correct) || q.answer || q.meaning || '',
    your: (info && info.your) || '',
    ok: !!correct,
    at: Date.now(),
    word: q.word || q.base || q.answer || '',
    meaning: q.meaning || q.targetMeaning || ''
  };
  state.saved = state.saved.filter(x => x.key !== key);
  state.saved.unshift(entry);
  if (state.saved.length > SAVED_MAX) state.saved.length = SAVED_MAX;
  saveState();
}

function removeSaved(key) {
  if (!Array.isArray(state.saved)) return;
  state.saved = state.saved.filter(x => x.key !== key);
  saveState();
}

function clearSaved(filterType) {
  if (!Array.isArray(state.saved)) return;
  state.saved = filterType
    ? state.saved.filter(x => x.type !== filterType)
    : [];
  saveState();
}
function saveState() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
  scheduleCloudPush();
}
// 云端推送（防抖）：仅在已登录云端时执行
let _pushTimer = null;
function scheduleCloudPush() {
  if (!CloudSync.enabled) return;
  if (_pushTimer) clearTimeout(_pushTimer);
  _pushTimer = setTimeout(function () {
    CloudSync.push(state).then(function (ok) { updateSyncStatus(ok ? 'synced' : 'error'); });
  }, 700);
}
function recordCorrect(id) {
  const m = state.mastery[id] || { correct: 0, attempts: 0 };
  m.correct += 1; m.attempts += 1;
  state.mastery[id] = m; saveState(); updateMasteryChip();
}
function recordWrong(id, info) {
  // 校内录入的错题（id 为 null）不进自动错题池，避免产生 'null' 幽灵条目；
  // 它们留在 customWrong 里，答对才会被移出。
  if (id === null || id === undefined) return;
  const m = state.mastery[id] || { correct: 0, attempts: 0 };
  m.attempts += 1; state.mastery[id] = m;
  const w = state.wrong[id] || { count: 0, mode: '', correct: '', your: '' };
  w.count += 1; w.mode = info.mode || w.mode; w.correct = info.correct || w.correct;
  w.your = info.your || w.your;
  // 保存完整题目信息，错题本可完整回显（兼容旧数据：无则不覆盖）
  if (info.prompt !== undefined) w.prompt = info.prompt;
  if (info.word !== undefined) w.word = info.word;
  if (info.meaning !== undefined) w.meaning = info.meaning;
  state.wrong[id] = w; saveState(); updateMasteryChip();
}
// 错题复习模式下答对：从错题本移出（支持自动错题 id 与手动录入的 customKey）
function clearWrong(q) {
  if (!q) return;
  if (q.customKey) {
    state.customWrong = (state.customWrong || []).filter(c => c.key !== q.customKey);
    markPresetDone(q.customKey); // 预置错题答对 → 不再注入
  } else if (q.id !== undefined && q.id !== null) {
    delete state.wrong[q.id];
  }
  saveState();
}
function masteredCount() {
  const ids = new Set([
    ...Object.keys(state.mastery).filter(id => state.mastery[id].correct >= 2),
    ...Object.keys(state.known)
  ]);
  return ids.size;
}
function updateMasteryChip() {
  const el = document.getElementById('masteryText');
  if (el) el.textContent = `已掌握 ${masteredCount()} / ${UNIT_INFO.total}`;
}
function weakLevel(id) {
  const v = state.weak[id];
  return (typeof v === 'number' && v > 0) ? v : 0;
}
// 词性 → 配色 class（用于闪卡边框 / POS 标签）
function posClass(pos) {
  if (!pos) return 'pos-default';
  const p = String(pos);
  if (/短语|词组|句型/.test(p)) return 'pos-phrase';
  if (/adj/i.test(p)) return 'pos-adj';
  if (/adv/i.test(p)) return 'pos-adv';
  if (/prep/i.test(p)) return 'pos-prep';
  if (/conj/i.test(p)) return 'pos-conj';
  if (/\bv\b|\bv\./.test(p)) return 'pos-verb';
  if (/\bn\b|\bn\./.test(p)) return 'pos-noun';
  return 'pos-default';
}

/* ---------- 发音（VoiceKit：自动选好听音色 + 用户可自选）---------- */
let _voices = [];
function loadVoices() {
  if (!('speechSynthesis' in window)) return;
  _voices = window.speechSynthesis.getVoices() || [];
}
if ('speechSynthesis' in window) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}
// 优先走 VoiceKit（黑名单过滤 + 自然音色优先 + 用户自选）；异常时退回本函数
function pickEnglishVoice() {
  if (window.VoiceKit) return window.VoiceKit.pick();
  if (!('speechSynthesis' in window)) return null;
  if (!_voices.length) _voices = window.speechSynthesis.getVoices() || [];
  const en = _voices.filter(v => /^en/i.test(v.lang));
  if (!en.length) return null;
  // 优先选 en-US / en-GB 的自然人声
  return en.find(v => /en-(US|GB)/i.test(v.lang) && /(Google|Samantha|Daniel|Microsoft|Natural|Premium|Female|Male)/i.test(v.name))
    || en.find(v => /en-(US|GB)/i.test(v.lang))
    || en[0];
}
function escapeAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}
function speak(text) {
  if (!('speechSynthesis' in window) || !text) return;
  try {
    if (window.VoiceKit) { window.VoiceKit.speak(text, 0.9); return; }
    window.speechSynthesis.cancel(); // iOS 首次朗读需要 cancel 预热
    const u = new SpeechSynthesisUtterance(text);
    const v = pickEnglishVoice();
    if (v) { u.voice = v; u.lang = v.lang; } else { u.lang = 'en-US'; }
    u.rate = 0.9;   // 稍慢，适合孩子跟读
    u.pitch = 1.0;
    window.speechSynthesis.speak(u);
  } catch (e) { /* 某些浏览器不支持，忽略 */ }
}
function speakBtnHtml(text, title) {
  if (!('speechSynthesis' in window)) return '';
  return `<button class="fc-speak" data-act="speak" data-text="${escapeAttr(text)}" title="${title || '朗读发音'}">🔊</button>`;
}
function weakCount() { return Object.keys(state.weak).filter(k => state.weak[k] > 0).length; }
// 收集「弱项」相关的 base 词条 id（含派生词卡的 d-base-idx）
function weakBaseIds() {
  const s = new Set();
  Object.keys(state.weak).forEach(k => {
    if (state.weak[k] <= 0) return;
    const m = /^d-(\d+)-/.exec(k);
    s.add(m ? m[1] : k);
  });
  return s;
}
// base id → 最高「不熟」等级（用于练习优先排序，等级越高越靠前）
function weakLevelMap() {
  const wl = {};
  Object.keys(state.weak).forEach(k => {
    const lvl = state.weak[k];
    if (!lvl) return;
    const m = /^d-(\d+)-/.exec(k);
    const base = m ? m[1] : k;
    if (!wl[base] || lvl > wl[base]) wl[base] = lvl;
  });
  return wl;
}

/* ---------- 工具 ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function pickDistinct(pool, n, exclude) {
  const cand = shuffle(pool.filter(x => !exclude.includes(x)));
  return cand.slice(0, n);
}
function norm(s) { return (s || '').toString().toLowerCase().replace(/\s+/g, ' ').trim(); }
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('show'), 1400);
}
function celebrate(x, y) {
  const emojis = ['⭐', '🎉', '✨', '💫', '🌟'];
  const e = document.createElement('div');
  e.className = 'float-up'; e.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  e.style.left = (x - 14) + 'px'; e.style.top = (y - 14) + 'px';
  document.body.appendChild(e);
  setTimeout(() => e.remove(), 900);
}

/* ---------- 页面初始化 ---------- */
document.getElementById('unitTitle').textContent = UNIT_INFO.title;
document.getElementById('unitSubtitle').textContent = UNIT_INFO.subtitle;
updateMasteryChip();

const main = $('#main');
let currentMode = 'cards';

$('#modeNav').addEventListener('click', e => {
  const btn = e.target.closest('.mode-btn');
  if (!btn) return;
  $$('.mode-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentMode = btn.dataset.mode;
  renderMode(currentMode);
});

function renderMode(mode) {
  main.innerHTML = '';
  if (mode === 'cards') renderCards();
  else if (mode === 'match') startQuiz('match');
  else if (mode === 'forms') renderFormsMenu();
  else if (mode === 'cloze') startQuiz('cloze');
  else if (mode === 'spell') startQuiz('spell');
  else if (mode === 'sentence') startQuiz('sentence');
  else if (mode === 'dictate') renderDictate();
  else if (mode === 'wrong') renderWrong();
  else if (mode === 'saved') renderSaved();
}

/* ===================================================================
   1) 闪卡模式
=================================================================== */
let cardSection = 'ALL';
let cardShowKnown = false;
let cardGrid = null;
// 真实分组（不含 全部 / 弱项），供「上一组/下一组」导航
const GROUP_SECTIONS = Array.from(new Set(VOCAB.map(v => v.section)));

function emptyStateHtml() {
  if (cardSection === 'PHRASE')
    return '<div class="empty-state"><span class="big">🗣</span>本单元暂时没有短语词条<br><span style="font-size:14px">短语卡来自教材里标注为「短语」的词条（如 U1 / U2）</span></div>';
  if (cardSection === 'WEAK')
    return '<div class="empty-state"><span class="big">🤔</span>还没有标记「不太熟」的词<br><span style="font-size:14px">翻卡时点 🤔 还不太熟 就会出现在这里</span></div>';
  if (cardShowKnown)
    return '<div class="empty-state"><span class="big">🤔</span>没有匹配的单词</div>';
  return '<div class="empty-state"><span class="big">🎉</span>这一组都记住啦！</div>';
}
// 不重画整页，只更新顶部「弱项 (N)」标签文字
function updateWeakTab() {
  const t = document.querySelector('.section-tab.weak-tab');
  if (t) {
    const wc = weakCount();
    t.textContent = `🤔 弱项${wc ? ' (' + wc + ')' : ''}`;
  }
}
function updateKnownToggle() {
  const t = document.querySelector('.known-toggle');
  if (!t) return;
  const knownCount = Object.keys(state.known).length;
  t.textContent = cardShowKnown ? '🙈 隐藏已记住' : `👁 显示已记住 (${knownCount})`;
  if (knownCount === 0 && !cardShowKnown) t.remove();
}

function renderCards() {
  main.innerHTML = '';  // 先清空，避免重复堆叠
  const wc = weakCount();
  const hasPhrase = VOCAB.some(v => (v.pos || '').includes('短语'));
  const sections = ['ALL', 'WEAK', ...(hasPhrase ? ['PHRASE'] : []), ...GROUP_SECTIONS];
  const tabs = document.createElement('div');
  tabs.className = 'section-tabs';
  sections.forEach(sec => {
    const b = document.createElement('button');
    b.className = 'section-tab' + (sec === cardSection ? ' active' : '') + (sec === 'WEAK' ? ' weak-tab' : '');
    b.textContent = sec === 'ALL' ? '全部' : sec === 'WEAK' ? `🤔 弱项${wc ? ' (' + wc + ')' : ''}` : sec === 'PHRASE' ? '🗣 短语' : sec;
    b.onclick = () => { cardSection = sec; renderCards(); };
    tabs.appendChild(b);
  });
  main.appendChild(tabs);

  // 上一组 / 下一组 导航（仅在真实分组内显示）
  if (GROUP_SECTIONS.includes(cardSection)) {
    const gi = GROUP_SECTIONS.indexOf(cardSection);
    const nav = document.createElement('div');
    nav.className = 'group-nav';
    const prev = document.createElement('button');
    prev.className = 'btn small ghost';
    prev.textContent = '← 上一组';
    prev.disabled = gi === 0;
    prev.onclick = () => { cardSection = GROUP_SECTIONS[gi - 1]; renderCards(); };
    const label = document.createElement('span');
    label.className = 'group-label';
    label.textContent = `第 ${gi + 1} / ${GROUP_SECTIONS.length} 组 · ${cardSection}`;
    const next = document.createElement('button');
    next.className = 'btn small ghost';
    next.textContent = '下一组 →';
    next.disabled = gi === GROUP_SECTIONS.length - 1;
    next.onclick = () => { cardSection = GROUP_SECTIONS[gi + 1]; renderCards(); };
    nav.appendChild(prev); nav.appendChild(label); nav.appendChild(next);
    main.appendChild(nav);
  }

  // 显示/隐藏已记住 切换
  const knownCount = Object.keys(state.known).length;
  if (knownCount > 0 || cardShowKnown) {
    const controls = document.createElement('div');
    controls.style.margin = '0 4px 14px';
    const toggle = document.createElement('button');
    toggle.className = 'btn small ghost known-toggle';
    toggle.textContent = cardShowKnown ? '🙈 隐藏已记住' : `👁 显示已记住 (${knownCount})`;
    toggle.onclick = () => { cardShowKnown = !cardShowKnown; renderCards(); };
    controls.appendChild(toggle);
    main.appendChild(controls);
  }

  const search = document.createElement('input');
  search.className = 'search-box';
  search.placeholder = '🔍 搜索单词 / 中文释义…';
  main.appendChild(search);

  // 词性配色图例
  const legend = document.createElement('div');
  legend.className = 'pos-legend';
  legend.innerHTML = [
    ['#3b82f6', '动词'], ['#22c55e', '名词'], ['#f59e0b', '形容词'],
    ['#a855f7', '副词'], ['#06b6d4', '介词'], ['#ec4899', '连词'],
    ['#64748b', '短语/句型'], ['#ef4444', '还不太熟']
  ].map(function (it) {
    return '<span class="pl-item"><i style="background:' + it[0] + '"></i>' + it[1] + '</span>';
  }).join('');
  main.appendChild(legend);

  const grid = document.createElement('div');
  grid.className = 'card-grid';
  main.appendChild(grid);
  cardGrid = grid;

  function matchesSearch(v, q) {
    if (!q) return true;
    return v.word.toLowerCase().includes(q) ||
      v.meaning.toLowerCase().includes(q) ||
      (v.usage || []).join(' ').toLowerCase().includes(q);
  }
  function draw() {
    const q = search.value.trim().toLowerCase();
    const weak = state.weak;
    const isPhrase = (v) => (v.pos || '').includes('短语');
    grid.innerHTML = '';
    let shown = 0;

    if (cardSection === 'PHRASE') {
      // 只显示短语词条，用独立短语卡
      VOCAB.forEach(v => {
        if (!isPhrase(v)) return;
        if (!cardShowKnown && state.known[v.id]) return;
        if (!matchesSearch(v, q)) return;
        grid.appendChild(buildPhraseCard(v, cardShowKnown));
        shown++;
      });
    } else {
      VOCAB.forEach(v => {
        if (cardSection !== 'ALL' && cardSection !== 'WEAK' && v.section !== cardSection) return;
        if (!cardShowKnown && state.known[v.id]) return;
        if (cardSection === 'WEAK' && !weak[v.id]) return;
        if (!matchesSearch(v, q)) return;
        // 短语词条用专用短语卡，普通词用普通卡（视觉统一）
        grid.appendChild(isPhrase(v) ? buildPhraseCard(v, cardShowKnown) : buildCard(v, cardShowKnown));
        shown++;
        (v.derivatives || []).forEach((d, di) => {
          const did = derivId(v.id, di);
          if (!cardShowKnown && state.known[did]) return;
          if (cardSection === 'WEAK' && !weak[did]) return;
          if (q && !(d.word.toLowerCase().includes(q) || d.meaning.toLowerCase().includes(q))) return;
          grid.appendChild(buildDerivCard(v, d, di, cardShowKnown));
          shown++;
        });
      });
    }
    if (!shown) grid.innerHTML = emptyStateHtml();
  }
  search.addEventListener('input', draw);
  draw();
}

/* ---------- 卡片按钮（记住 / 还不太熟）---------- */
// 「还不太熟」为等级按钮：0→1→2→3→0，每点一档红色加深；点满后回到未学（自带撤销）
function cardButtons(id) {
  if (state.known[id]) {
    return `<button class="fc-btn fc-undo" data-act="unmark">↩️ 取消记住</button>`;
  }
  const lv = weakLevel(id);
  const weakLabel = lv > 0 ? `🤔 还不太熟 ×${lv}` : `🤔 还不太熟`;
  return `<div class="fc-action"><div class="fc-btns">
    <button class="fc-btn" data-act="know">✅ 已经记住</button>
    <button class="fc-btn fc-weak" data-act="weak">${weakLabel}</button>
  </div></div>`;
}
// 当前视图下该卡是否还应显示
function cardShouldShow(id) {
  if (cardSection === 'WEAK') return weakLevel(id) > 0;
  if (!cardShowKnown && state.known[id]) return false;
  return true;
}
function updateCardButtons(cardEl, id) {
  const html = cardButtons(id);
  cardEl.querySelectorAll('.fc-action').forEach(w => { w.innerHTML = html; });
  cardEl.querySelectorAll('.fc-action .fc-btn').forEach(btn => {
    btn.addEventListener('click', ev => {
      ev.stopPropagation();
      handleCardAction(cardEl, id, btn.dataset.act);
    });
  });
  // 同步红色等级着色
  for (let i = 1; i <= MAX_WEAK; i++) cardEl.classList.remove('weak-l' + i);
  const lv = weakLevel(id);
  if (lv > 0) cardEl.classList.add('weak-l' + lv);
}
function handleCardAction(cardEl, id, act) {
  if (act === 'know') {
    state.known[id] = true; delete state.weak[id];
    toast('✅ 已记住，这个词不再出现');
  } else if (act === 'weak') {
    delete state.known[id];
    const lv = weakLevel(id);
    if (lv >= MAX_WEAK) {
      delete state.weak[id];
      toast('↩️ 已恢复为「未学」（红色清空）');
    } else {
      state.weak[id] = lv + 1;
      const tips = { 1: '🤔 标为不太熟，红色越深越生疏', 2: '🤔 更不熟了，红色加深', 3: '🔴 非常不熟，练习会优先复习它' };
      toast(tips[lv + 1]);
    }
  } else { // unmark：仅用于「已掌握」态的取消记住
    delete state.known[id]; delete state.weak[id];
    toast('↩️ 已恢复显示');
  }
  saveState();
  updateMasteryChip(); updateWeakTab(); updateKnownToggle();
  // 只更新这一张卡，不重画整页 → 不卡
  if (!cardShouldShow(id)) {
    cardEl.classList.add('card-hide');
    setTimeout(() => {
      cardEl.remove();
      if (cardGrid && !cardGrid.querySelector('.flip-card')) {
        cardGrid.innerHTML = emptyStateHtml();
      }
    }, 280);
  } else {
    updateCardButtons(cardEl, id);
  }
}

function buildCard(v, knownMode) {
  const card = document.createElement('div');
  card.className = 'flip-card';
  card.dataset.id = v.id;
  card.classList.add(posClass(v.pos));
  const lv0 = weakLevel(v.id);
  if (lv0 > 0) card.classList.add('weak-l' + lv0);
  let back = '';
  // 📘 原型：释义 + 用法 + 例句
  let proto = `<div class="fb-meaning">${v.meaning}</div>`;
  if (v.usage && v.usage.length) {
    proto += `<div class="fb-row"><span class="fb-label">用法</span>${v.usage.join('；')}</div>`;
  }
  if (v.example) {
    proto += `<div class="fb-row"><span class="fb-label">例句</span>${v.example.en} ${speakBtnHtml(v.example.en, '朗读例句')}<br><span class="fb-cn">${v.example.cn}</span></div>`;
  }
  back += `<div class="fb-section"><div class="fb-sec-title">📘 原型</div>${proto}</div>`;
  // 🔗 近义 / ⚡ 反义
  if (v.synonyms && v.synonyms.length) {
    back += `<div class="fb-section"><div class="fb-sec-title">🔗 近义</div><div class="fb-row">${v.synonyms.map(s => `${s.word} (${s.pos}) ${s.meaning}`).join('；')}</div></div>`;
  }
  if (v.antonyms && v.antonyms.length) {
    back += `<div class="fb-section"><div class="fb-sec-title">⚡ 反义</div><div class="fb-row">${v.antonyms.map(s => `${s.word} (${s.pos}) ${s.meaning}`).join('；')}</div></div>`;
  }
  const knowBtn = cardButtons(v.id);
  card.innerHTML = `
    <div class="flip-inner">
      <div class="flip-face flip-front">
        <div class="fc-word-row">
          <div class="fc-word">${v.word}</div>
          ${speakBtnHtml(v.word)}
        </div>
        <span class="fc-pos">${v.pos}</span>
        ${knowBtn}
        <span class="fc-tip">点击翻面 👆</span>
      </div>
      <div class="flip-face flip-back">
        ${back}
        ${knowBtn}
      </div>
    </div>`;
  card.addEventListener('click', (e) => {
    if (e.target.closest('.fc-btn, .fc-speak')) return;
    card.classList.toggle('flipped');
  });
  card.querySelectorAll('.fc-btn, .fc-speak').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (btn.dataset.act === 'speak') { speak(btn.dataset.text || v.word); return; }
      handleCardAction(card, v.id, btn.dataset.act);
    });
  });
  return card;
}

/* ---------- 词性转换独立闪卡 ---------- */
function derivId(baseId, idx) { return 'd-' + baseId + '-' + idx; }

function buildDerivCard(baseV, d, di, knownMode) {
  const did = derivId(baseV.id, di);
  const card = document.createElement('div');
  card.className = 'flip-card deriv-card';
  card.dataset.id = did;
  card.classList.add(posClass(d.pos));
  const lv0 = weakLevel(did);
  if (lv0 > 0) card.classList.add('weak-l' + lv0);
  let back = `<div class="fb-meaning">${d.meaning}</div>`;
  if (d.example) {
    back += `<div class="fb-row"><span class="fb-label">例句</span>${d.example.en} ${speakBtnHtml(d.example.en, '朗读例句')}<br><span class="fb-cn">${d.example.cn}</span></div>`;
  }
  back += `<div class="fb-row fb-from"><span class="fb-label">来自</span>${baseV.word} <i>(${baseV.pos})</i> ${baseV.meaning}</div>`;
  const knowBtn = cardButtons(did);
  card.innerHTML = `
    <div class="flip-inner">
      <div class="flip-face flip-front">
        <div class="fc-word-row">
          <div class="fc-word">${d.word}</div>
          ${speakBtnHtml(d.word)}
        </div>
        <span class="fc-pos">${d.pos}</span>
        <span class="fc-deriv-badge">${baseV.word} 的派生词</span>
        ${knowBtn}
        <span class="fc-tip">点击翻面 👆</span>
      </div>
      <div class="flip-face flip-back">
        ${back}
        ${knowBtn}
      </div>
    </div>`;
  card.addEventListener('click', (e) => {
    if (e.target.closest('.fc-btn, .fc-speak')) return;
    card.classList.toggle('flipped');
  });
  card.querySelectorAll('.fc-btn, .fc-speak').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (btn.dataset.act === 'speak') { speak(btn.dataset.text || d.word); return; }
      handleCardAction(card, did, btn.dataset.act);
    });
  });
  return card;
}

/* ---------- 短语独立闪卡 ---------- */
// 教材里标注为「短语」的词条（如 go rock climbing / take up gardening），整块记忆
function buildPhraseCard(v, knownMode) {
  const card = document.createElement('div');
  card.className = 'flip-card phrase-card';
  card.dataset.id = v.id;
  card.classList.add(posClass(v.pos));
  const lv0 = weakLevel(v.id);
  if (lv0 > 0) card.classList.add('weak-l' + lv0);
  let back = `<div class="fb-meaning">${v.meaning}</div>`;
  if (v.usage && v.usage.length) {
    back += `<div class="fb-row"><span class="fb-label">搭配</span>${v.usage.join('；')}</div>`;
  }
  if (v.example) {
    back += `<div class="fb-row"><span class="fb-label">例句</span>${v.example.en} ${speakBtnHtml(v.example.en, '朗读例句')}<br><span class="fb-cn">${v.example.cn}</span></div>`;
  }
  const knowBtn = cardButtons(v.id);
  card.innerHTML = `
    <div class="flip-inner">
      <div class="flip-face flip-front">
        <div class="fc-word-row">
          <div class="fc-word">${v.word}</div>
          ${speakBtnHtml(v.word)}
        </div>
        <span class="fc-pos">${v.pos}</span>
        <span class="fc-phrase-badge">🗣 短语 · 整体记忆</span>
        ${v.section ? `<span class="fc-section-tag">${v.section}</span>` : ''}
        ${knowBtn}
        <span class="fc-tip">点击翻面 👆</span>
      </div>
      <div class="flip-face flip-back">
        ${back}
        ${knowBtn}
      </div>
    </div>`;
  card.addEventListener('click', (e) => {
    if (e.target.closest('.fc-btn, .fc-speak')) return;
    card.classList.toggle('flipped');
  });
  card.querySelectorAll('.fc-btn, .fc-speak').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (btn.dataset.act === 'speak') { speak(btn.dataset.text || v.word); return; }
      handleCardAction(card, v.id, btn.dataset.act);
    });
  });
  return card;
}

/* ===================================================================
   2) 通用答题循环
=================================================================== */
function startQuiz(type, poolOverride, reviewWrong) {
  // 构建题库
  let pool = poolOverride || buildPool(type);
  if (!pool.length) {
    main.innerHTML = '<div class="empty-state"><span class="big">🎈</span>这个模式暂时没有题目，先去闪卡看看吧！</div>';
    return;
  }
  // 弱项优先：把「不太熟」的词按等级排到前面（等级越高越靠前），再随机抽取
  const wl = weakLevelMap();
  pool = shuffle(pool);
  pool.sort((a, b) => (wl[String(b.id)] || 0) - (wl[String(a.id)] || 0));
  pool = pool.slice(0, 14);
  const total = pool.length;
  const weakInPool = pool.some(p => (wl[String(p.id)] || 0) > 0);
  let idx = 0, score = 0, results = [];

  const wrap = document.createElement('div');
  wrap.className = 'quiz-wrap';
  main.appendChild(wrap);

  function showQuestion() {
    if (idx >= total) return showResult();
    wrap.innerHTML = '';
    const head = document.createElement('div');
    head.className = 'quiz-head';
    head.innerHTML = `<span>第 ${idx + 1} / ${total} 题${reviewWrong ? ' <span class="weak-badge">📒 错题复习</span>' : weakInPool ? ' <span class="weak-badge">🤔 弱项优先</span>' : ''}</span><span class="quiz-progress">⭐ ${score}</span>`;
    wrap.appendChild(head);
    renderQuestion(type, pool[idx], wrap, (correct, info) => {
      const noRecord = info && info.record === false;
      if (noRecord) { results.push(true); }
      else if (correct) { score++; results.push(true); celebrate(info.x, info.y); }
      else { results.push(false); }
      if (!noRecord) {
        recordSaved(type, pool[idx], correct, info || {});
        if (correct) {
          if (!pool[idx].customKey) recordCorrect(pool[idx].id);
          // 错题复习模式：答对即从错题本移出（含手动录入的）
          if (reviewWrong) clearWrong(pool[idx]);
        } else {
          const q = pool[idx];
          recordWrong(q.id, {
            mode: type,
            correct: info.correct,
            your: info.your,
            prompt: questionPrompt(type, q),
            word: q.word || q.base || q.answer || '',
            meaning: q.meaning || q.targetMeaning || ''
          });
        }
      }
      const next = document.createElement('button');
      next.className = 'btn purple';
      next.style.width = '100%'; next.style.marginTop = '14px';
      next.textContent = idx + 1 >= total ? '查看结果 🏁' : '下一题 ➡️';
      next.onclick = () => { idx++; showQuestion(); };
      wrap.appendChild(next);
    });
  }

  function showResult() {
    wrap.innerHTML = '';
    const acc = Math.round(score / total * 100);
    const stars = acc >= 90 ? 3 : acc >= 70 ? 2 : acc >= 50 ? 1 : 0;
    const starStr = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
    const face = stars === 3 ? '🏆' : stars === 2 ? '😄' : stars === 1 ? '🙂' : '💪';
    const card = document.createElement('div');
    card.className = 'result-card';
    card.innerHTML = `
      <div class="result-emoji">${face}</div>
      <div class="result-score">${score} / ${total}</div>
      <div class="result-stars">${starStr}</div>
      <div class="result-detail">正确率 ${acc}%${stars === 3 ? ' · 太棒了，全部掌握！' : stars < 2 ? ' · 再练一次会更好！' : ''}</div>`;
    const again = document.createElement('button');
    again.className = 'btn coral'; again.style.width = '100%'; again.textContent = '🔁 再来一组';
    again.onclick = () => startQuiz(type, poolOverride);
    const back = document.createElement('button');
    back.className = 'btn ghost'; back.style.width = '100%'; back.style.marginTop = '10px'; back.textContent = '⬅️ 返回模式选择';
    back.onclick = () => renderMode(currentMode);
    card.appendChild(again); card.appendChild(back);
    wrap.appendChild(card);
  }

  showQuestion();
}

/* 当前页面所属单元（U1-U6 / 暑假List），用于 forms 模式按单元过滤词库 */
const UNIT_KEY = (function () {
  if (typeof STORE_SUFFIX === 'undefined' || !STORE_SUFFIX) return 'U1';
  if (STORE_SUFFIX === 'u2') return 'U2';
  if (STORE_SUFFIX === 'summer1') return 'SUMMER';   // 暑假List：不挂 PDF 词族
  if (STORE_SUFFIX === '7au3') return 'U3';
  if (STORE_SUFFIX === '7au4') return 'U4';
  if (STORE_SUFFIX === '7au5') return 'U5';
  if (STORE_SUFFIX === '7au6') return 'U6';
  return 'U1';
})();

function buildPool(type) {
  if (type === 'match') {
    return VOCAB.map(v => ({ id: v.id, word: v.word, meaning: v.meaning }));
  }
  if (type === 'forms' || type === 'formsMiddle') {
    const middle = type === 'formsMiddle';
    const out = [];
    // 1) 课本派生词：正向 + 反向（仅普通 forms 模式；中考分区只练词库）
    if (!middle && !currentFormsCat) {
      VOCAB.forEach(v => {
        // 同 base + 目标词性 可能存在多个合法派生（如 mean→adj: meaningful/meaningless），
        // 共享 accepts 数组 → 任何合法派生都判对（修复"答 meaningful 被判错"的歧义 bug）
        const byPos = {};
        (v.derivatives || []).forEach(d => {
          if (!d.word) return;
          (byPos[d.pos] = byPos[d.pos] || []).push(d.word);
        });
        (v.derivatives || []).forEach(d => {
          if (!d.word) return;
          const accepts = byPos[d.pos] || [d.word];
          out.push({ id: 'f_' + v.id + '_' + d.word, base: v.word, basePos: v.pos, targetPos: d.pos, targetMeaning: d.meaning, answer: d.word, accepts: accepts, example: d.example, rev: false, customKey: true });
          out.push({ id: 'f_' + v.id + '_rev_' + d.word, base: d.word, basePos: d.pos, targetPos: v.pos, targetMeaning: v.meaning, answer: v.word, accepts: [v.word], example: d.example, rev: true, customKey: true });
        });
      });
    }
    // 2) 词库（卷3 错词 + 中考词族 + 预习卷词族）：按单元 + 分类过滤
    const banks = [...(window.FORMS_BANK || []), ...(window.FORMS_PDF_BANK || [])];
    banks.forEach((it, i) => {
      const matchUnit = middle ? (it.unit === 'MIDDLE') : (it.unit === UNIT_KEY || !it.unit);
      if (!matchUnit) return;
      // 按 cat 过滤（''=不过滤）
      if (currentFormsCat && it.cat !== currentFormsCat) return;
      const uid = (it.unit || 'G') + '_' + i;
      out.push({ id: 'fb_' + uid, base: it.from, basePos: it.fromPos, targetPos: it.toPos, targetMeaning: it.meaning, answer: it.answer, accepts: [it.answer], example: it.example, pair: it.pair || null, cat: it.cat || 'transform', rev: false, customKey: true });
      // homo 类不做反向题（pair 本身就是辨析）
      if (it.cat !== 'homo') {
        out.push({ id: 'fb_' + uid + '_rev', base: it.answer, basePos: it.toPos, targetPos: it.fromPos, targetMeaning: '原词（' + it.fromPos + '）的适当形式', answer: it.from, accepts: [it.from], example: it.example, cat: it.cat || 'transform', rev: true, customKey: true });
      }
    });
    return out;
  }
  if (type === 'cloze') {
    const out = [];
    VOCAB.forEach(v => {
      if (!v.example) return;
      const c = buildCloze(v);
      if (c) out.push(c);
    });
    return out;
  }
  if (type === 'spell') {
    return VOCAB.filter(v => !v.word.includes(' ') && v.word.length <= 14)
                .map(v => {
                  // 句中拼写：若例句里出现原词，则把原词挖空作为语境提示（更贴近考试"根据句意写单词"）
                  let sentence = null;
                  if (v.example && v.example.en && v.example.cn) {
                    const re = new RegExp('\\b' + esc(v.word) + '\\b', 'i');
                    if (re.test(v.example.en)) {
                      sentence = { en: v.example.en.replace(re, '_____'), cn: v.example.cn };
                    }
                  }
                  return { id: v.id, meaning: v.meaning, pos: v.pos, answer: v.word, sentence };
                });
  }
  if (type === 'sentence') {
    const out = [];
    VOCAB.forEach(v => {
      // 原型词：有完整中英例句才出「看中文写英文」题
      if (v.example && v.example.en && v.example.cn) {
        const hint = v.usage && v.usage[0] ? v.usage[0] : '';
        out.push({
          id: v.id, word: v.word, pos: v.pos, meaning: v.meaning,
          hint, cn: v.example.cn, model: v.example.en
        });
      }
      // 词性转换：每个派生词也各出一题（都有完整例句）
      (v.derivatives || []).forEach(d => {
        if (d.example && d.example.en && d.example.cn) {
          out.push({
            id: v.id, word: d.word, pos: d.pos, meaning: d.meaning,
            hint: `${v.word} 的派生词`, cn: d.example.cn, model: d.example.en
          });
        }
      });
    });
    return out;
  }
  return [];
}

function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

function buildCloze(item) {
  const en = item.example.en;
  const candidates = [item.word, ...(item.derivatives || []).map(d => d.word)];
  for (const c of candidates) {
    const token = c.trim();
    if (!token) continue;
    if (token.includes(' ')) {
      // 短语：整体精确匹配（忽略大小写）
      const re = new RegExp(esc(token), 'i');
      if (re.test(en)) {
        const blanked = en.replace(re, '_____');
        return { id: item.id, word: item.word, sentence: blanked, answer: token, meaning: item.meaning };
      }
      continue;
    }
    // 单词：先精确匹配
    const reExact = new RegExp('\\b' + esc(token) + '\\b', 'i');
    if (reExact.test(en)) {
      const blanked = en.replace(reExact, '_____');
      return { id: item.id, word: item.word, sentence: blanked, answer: token, meaning: item.meaning };
    }
    // 屈折形式：找以该词开头、长度差 ≤4 的词（如 use→used, succeed→succeeded）
    if (token.length >= 3) {
      const wordRe = /\b([A-Za-z]+)\b/g; let m;
      while ((m = wordRe.exec(en))) {
        const w = m[1];
        if (w.toLowerCase() !== token.toLowerCase() &&
            w.toLowerCase().startsWith(token.toLowerCase()) &&
            w.length - token.length <= 4) {
          const blanked = en.slice(0, m.index) + '_____' + en.slice(m.index + w.length);
          return { id: item.id, word: item.word, sentence: blanked, answer: w, meaning: item.meaning };
        }
      }
    }
  }
  return null;
}

/* ---------- 渲染各题型 ---------- */
function renderQuestion(type, q, wrap, onAnswer) {
  // 校内录入的选择题错题（preset-wrong.js / 手动录入带 options 的）
  if (type === 'match' && q && q.options && q.options.length) return renderCustomChoice(q, wrap, onAnswer);
  if (type === 'match') return renderMatch(q, wrap, onAnswer);
  if (type === 'forms' || type === 'formsMiddle') return renderForms(q, wrap, onAnswer);
  if (type === 'cloze') return renderCloze(q, wrap, onAnswer);
  if (type === 'spell') return renderSpell(q, wrap, onAnswer);
  if (type === 'sentence') return renderSentence(q, wrap, onAnswer);
}

// 校内错题（语法选择）重练：显示完整题干 + 四个选项 + 规则解析
function renderCustomChoice(q, wrap, onAnswer) {
  const card = document.createElement('div');
  card.className = 'q-card';
  card.innerHTML = `<div class="q-prompt">📒 校内错题重练 · ${escapeHtml(q.pos || '语法')}</div>
    <div class="q-big" style="font-size:19px;line-height:1.6">${escapeHtml(q.prompt)}</div>`;
  const box = document.createElement('div'); box.className = 'options';
  const letter = s => String(s).trim().charAt(0).toUpperCase();
  (q.options || []).forEach(o => {
    const b = document.createElement('button');
    b.className = 'opt';
    b.style.textAlign = 'left';
    b.textContent = o;
    b.onclick = (e) => {
      if (box.dataset.done) return; box.dataset.done = '1';
      const correct = letter(o) === letter(q.answer);
      b.classList.add(correct ? 'correct' : 'wrong');
      if (!correct) $$('.opt', box).forEach(x => { if (letter(x.textContent) === letter(q.answer)) x.classList.add('correct'); });
      // 解析区（内容全部转义，防止题目文本里的 < > 被当成标签）
      const fb = document.createElement('div');
      fb.className = 'feedback show ' + (correct ? 'ok' : 'no');
      fb.innerHTML = (correct ? '✅ 答对啦！' : '❌ 再看看规则：')
        + `<span class="fb-en">${escapeHtml(q.word || '')}</span>`
        + (q.explain ? `<span class="fb-cn" style="line-height:1.65;margin-top:6px">${escapeHtml(q.explain)}</span>` : '')
        + (correct ? '' : `<span class="fb-cn">你选的：${escapeHtml(o)}</span>`);
      card.appendChild(fb);
      onAnswer(correct, { x: e.clientX, y: e.clientY, correct: q.answer, your: o });
    };
    box.appendChild(b);
  });
  card.appendChild(box); wrap.appendChild(card);
}

function renderMatch(q, wrap, onAnswer) {
  const card = document.createElement('div');
  card.className = 'q-card';
  card.innerHTML = `<div class="q-prompt">选出正确的中文释义：</div><div class="q-big">${q.word}</div>`;
  const opts = shuffle([q.meaning, ...pickDistinct(VOCAB.map(v => v.meaning), 3, [q.meaning])]);
  const box = document.createElement('div'); box.className = 'options';
  opts.forEach(o => {
    const b = document.createElement('button'); b.className = 'opt'; b.textContent = o;
    b.onclick = (e) => {
      if (box.dataset.done) return; box.dataset.done = '1';
      const correct = norm(o) === norm(q.meaning);
      b.classList.add(correct ? 'correct' : 'wrong');
      if (!correct) $$('.opt', box).forEach(x => { if (norm(x.textContent) === norm(q.meaning)) x.classList.add('correct'); });
      const fb = makeFeedback(correct, q.word, q.meaning, q.meaning);
      card.appendChild(fb);
      onAnswer(correct, { x: e.clientX, y: e.clientY, correct: q.meaning, your: o });
    };
    box.appendChild(b);
  });
  card.appendChild(box); wrap.appendChild(card);
}

let currentFormsMode = 'choice';
let currentFormsCat = '';     // ''=全部 / 'eding'=-ed/-ing形容词 / 'homo'=同音词辨析
let formsScope = 'unit';   // forms 练习范围：unit 当前单元 / middle 中考专项
function allFormsWords(exclude) {
  const set = [];
  VOCAB.forEach(v => (v.derivatives || []).forEach(d => { if (norm(d.word) !== norm(exclude)) set.push(d.word); }));
  [...(window.FORMS_BANK || []), ...(window.FORMS_PDF_BANK || [])].forEach(it => {
    if (norm(it.answer) !== norm(exclude)) set.push(it.answer);
    if (norm(it.from) !== norm(exclude)) set.push(it.from);
  });
  return set.length ? set : VOCAB.map(v => v.word);
}
function renderFormsMenu() {
  main.innerHTML = '';
  const title = document.createElement('div');
  title.className = 'panel-title'; title.textContent = '🔤 词性转换';
  const hint = document.createElement('div');
  hint.className = 'panel-hint';
  hint.innerHTML = '把单词变成正确形式。四种玩法：<br>'
    + '• <b>选择题</b>：给出选项选（最轻松）<br>'
    + '• <b>拼写题</b>：自己拼写出形式（无选项，考拼写）<br>'
    + '• <b>适当形式填空</b>：句子+括号给词，写适当形式（卷3 原题型）<br>'
    + '• <b>-ed/-ing 形容词</b>：专项训练"人感到…"vs"令人…"（高频考点）<br>'
    + '• <b>同音/近形词辨析</b>：weak/week、alive/lively 等易混词组';
  main.appendChild(title); main.appendChild(hint);

  // 练习范围：当前单元 / 中考专项
  const scope = document.createElement('div');
  scope.className = 'forms-scope';
  const scLabel = document.createElement('div');
  scLabel.className = 'panel-hint';
  scLabel.textContent = '练习范围：';
  scope.appendChild(scLabel);
  const midCount = (window.FORMS_PDF_BANK || []).filter(it => it.unit === 'MIDDLE').length +
                   (window.FORMS_BANK || []).filter(it => it.unit === 'MIDDLE').length;
  const scopes = [
    ['unit', `📘 当前单元（跟着校内走）`],
    ['middle', `🎯 中考专项（${midCount} 词条）`]
  ];
  scopes.forEach(([val, label]) => {
    const b = document.createElement('button');
    b.className = 'mode-btn forms-scope-btn' + ((formsScope || 'unit') === val ? ' active' : '');
    b.textContent = label;
    b.onclick = () => { formsScope = val; renderFormsMenu(); };
    scope.appendChild(b);
  });
  main.appendChild(scope);

  const tabs = document.createElement('div');
  tabs.className = 'forms-tabs';
  [['choice', '选择题'], ['spell', '拼写题'], ['cloze', '适当形式填空']].forEach(([m, label]) => {
    const b = document.createElement('button');
    b.className = 'mode-btn' + (currentFormsMode === m ? ' active' : '');
    b.textContent = label;
    b.onclick = () => { currentFormsMode = m; renderFormsMenu(); };
    tabs.appendChild(b);
  });
  main.appendChild(tabs);

  // ── 分类专项标签（-ed/-ing 形容词 / 同音词辨析）──
  const catTabs = document.createElement('div');
  catTabs.className = 'forms-tabs forms-cat-tabs';
  const catOptions = [
    ['', '📦 全部词性转换'],
    ['eding', '🔴 -ed / -ing 形容词'],
    ['homo', '🔵 同音/近形词辨析'],
  ];
  const edingCount = [...(window.FORMS_BANK || []), ...(window.FORMS_PDF_BANK || [])].filter(it => it.cat === 'eding').length;
  const homoCount = [...(window.FORMS_BANK || []), ...(window.FORMS_PDF_BANK || [])].filter(it => it.cat === 'homo').length;
  catOptions.forEach(([val, label]) => {
    let lbl = label;
    if (val === 'eding') lbl += `（${edingCount} 对）`;
    if (val === 'homo') lbl += `（${homoCount} 组）`;
    const b = document.createElement('button');
    b.className = 'mode-btn' + (currentFormsCat === val ? ' active' : '');
    b.textContent = lbl;
    b.onclick = () => { currentFormsCat = val; renderFormsMenu(); };
    catTabs.appendChild(b);
  });
  main.appendChild(catTabs);
  const start = document.createElement('button');
  start.className = 'btn purple'; start.style.marginTop = '16px'; start.style.width = '100%';
  start.textContent = '▶ 开始练习';
  start.onclick = () => startQuiz(formsScope === 'middle' ? 'formsMiddle' : 'forms');
  main.appendChild(start);
  const back = document.createElement('button');
  back.className = 'btn ghost'; back.style.marginTop = '10px'; back.style.width = '100%';
  back.textContent = '⬅️ 返回模式选择';
  back.onclick = () => renderMode('cards');
  main.appendChild(back);
}
function renderForms(q, wrap, onAnswer) {
  if (currentFormsMode === 'spell') return renderFormsSpell(q, wrap, onAnswer);
  if (currentFormsMode === 'cloze') return renderFormsCloze(q, wrap, onAnswer);
  // 同音/近形词辨析 → 专用渲染器（显示 pair 对比）
  if (q.cat === 'homo') return renderFormsHomo(q, wrap, onAnswer);
  // 选择题（默认）
  const card = document.createElement('div');
  card.className = 'q-card';
  card.innerHTML = `
    <div class="q-prompt">词性转换 · 写出正确形式</div>
    <div class="q-big">${q.base} <span style="font-size:15px;color:var(--ink-soft)">(${q.basePos})</span></div>
    <div class="q-sub">→ 它的 <b>${shortPos(q.targetPos)}</b> 形式（含义：${q.targetMeaning}）是？</div>`;
  const excludes = q.accepts || [q.answer];
  const opts = shuffle([q.answer, ...pickDistinct(allFormsWords(q.answer), 3, excludes)]);
  const box = document.createElement('div'); box.className = 'options';
  opts.forEach(o => {
    const b = document.createElement('button'); b.className = 'opt'; b.textContent = o;
    b.onclick = (e) => {
      if (box.dataset.done) return; box.dataset.done = '1';
      const correct = excludes.some(a => norm(a) === norm(o));
      b.classList.add(correct ? 'correct' : 'wrong');
      if (!correct) $$('.opt', box).forEach(x => { if (excludes.some(a => norm(a) === norm(x.textContent))) x.classList.add('correct'); });
      const fb = makeFeedback(correct, `${q.base} → ${q.answer}`, q.targetMeaning, o);
      card.appendChild(fb);
      onAnswer(correct, { x: e.clientX, y: e.clientY, correct: q.answer, your: o });
    };
    box.appendChild(b);
  });
  card.appendChild(box); wrap.appendChild(card);
}
function renderFormsSpell(q, wrap, onAnswer) {
  const card = document.createElement('div');
  card.className = 'q-card';
  card.innerHTML = `
    <div class="q-prompt">词性转换 · 拼写出正确形式（无选项）</div>
    <div class="q-big">${q.base} <span style="font-size:15px;color:var(--ink-soft)">(${q.basePos})</span></div>
    <div class="q-sub">→ 它的 <b>${shortPos(q.targetPos)}</b> 形式（含义：${q.targetMeaning}）</div>`;
  const input = makeSpellInput();
  const kbd = buildDictKeyboard(input, (ch) => {
    if (ch === '\b') input.value = input.value.slice(0, -1);
    else if (input.value.length < 30) input.value += ch;
  });
  const submit = document.createElement('button'); submit.className = 'btn'; submit.textContent = '✓ 提交批改';
  const fb = document.createElement('div'); fb.className = 'dict-fb';
  submit.onclick = () => {
    if (card.dataset.done) return; card.dataset.done = '1';
    const excludes = q.accepts || [q.answer];
    const correct = excludes.some(a => norm(a) === norm(input.value));
    fb.innerHTML = letterDiffHTML(input.value, q.answer) + (correct ? '<div class="dict-flag ok">✅ 拼写正确！</div>' : '<div class="dict-flag no">❌ 正确答案：<b>' + escapeHtml(q.answer) + '</b></div>');
    onAnswer(correct, { correct: q.answer, your: input.value });
  };
  card.appendChild(input); card.appendChild(kbd); card.appendChild(submit); card.appendChild(fb);
  wrap.appendChild(card);
}
function renderFormsCloze(q, wrap, onAnswer) {
  let sentence, base = q.base;
  // 正向题且无例句可挖空时，把含义附加到模板里消歧
  // （修复 mean→adj: meaningful/meaningless 同方向多答案时题目看不出要哪个）
  const tmplSuffix = (!q.rev && q.targetMeaning) ? '（' + q.targetMeaning + '）' : '';
  if (q.rev) {
    // 反向题（如 changing→change）：例句含的是派生形式而非原形，
    // 挖空后句子语法不通（"The world is ___ fast" 不能填 change），
    // 直接用模板出题，不用句子语境
    sentence = '写出 ' + base + ' 的 <b>' + shortPos(q.targetPos) + '</b> 形式：_____';
  } else if (q.example && q.example.en && q.example.en.toLowerCase().includes(norm(q.answer))) {
    sentence = q.example.en.replace(new RegExp('\\b' + esc(norm(q.answer)) + '\\b', 'i'), '_____');
  } else if (q.example && q.example.en && q.example.en.toLowerCase().includes(norm(base))) {
    // 兜底：答案不在句中时，尝试挖掉原词（提示学生变形）
    sentence = q.example.en.replace(new RegExp('\\b' + esc(norm(base)) + '\\b', 'i'), '_____');
  } else {
    sentence = '写出 ' + base + ' 的 <b>' + shortPos(q.targetPos) + '</b> 形式' + tmplSuffix + '：_____';
  }
  const card = document.createElement('div');
  card.className = 'q-card';
  card.innerHTML = `
    <div class="q-prompt">适当形式填空 · 用括号中所给词的适当形式填空</div>
    <div class="q-big" style="font-size:19px;line-height:1.6">${sentence.replace('_____', '<span style="color:var(--coral)">_____</span>')} <span style="color:var(--ink-soft)">(${base} ${q.basePos})</span></div>`;
  const input = makeSpellInput();
  const kbd = buildDictKeyboard(input, (ch) => {
    if (ch === '\b') input.value = input.value.slice(0, -1);
    else if (input.value.length < 30) input.value += ch;
  });
  const submit = document.createElement('button'); submit.className = 'btn'; submit.textContent = '✓ 提交批改';
  const fb = document.createElement('div'); fb.className = 'dict-fb';
  submit.onclick = () => {
    if (card.dataset.done) return; card.dataset.done = '1';
    // 接受同一方向所有合法派生词（避免 mean→adj 答 meaningful 被判错）
    const excludes = q.accepts || [q.answer];
    const correct = excludes.some(a => norm(a) === norm(input.value));
    fb.innerHTML = letterDiffHTML(input.value, q.answer) + (correct ? '<div class="dict-flag ok">✅ 正确！</div>' : '<div class="dict-flag no">❌ 正确答案：<b>' + escapeHtml(q.answer) + '</b></div>');
    onAnswer(correct, { correct: q.answer, your: input.value });
  };
  card.appendChild(input); card.appendChild(kbd); card.appendChild(submit); card.appendChild(fb);
  wrap.appendChild(card);
}

/* ---------- 同音/近形词辨析（专用渲染） ---------- */
function renderFormsHomo(q, wrap, onAnswer) {
  const card = document.createElement('div');
  card.className = 'q-card';
  const pair = q.pair || [q.base, q.answer];
  const pairHtml = pair.map(p => `<span class="homo-pair">${escapeHtml(p)}</span>`).join(' <span style="color:var(--ink-soft)">vs</span> ');
  card.innerHTML = `
    <div class="q-prompt">🔵 同音 / 近形词辨析 · 选出正确的词</div>
    <div class="homo-pair-row">${pairHtml}</div>
    <div class="q-sub">${q.meaning}</div>`;
  // 从 pair 中提取选项（取第一个词作为正确答案的位置）
  const correctWord = q.answer;
  const wrongWords = pair.filter(p => !p.toLowerCase().includes(correctWord.toLowerCase()));
  // 保证有4个选项：correct + wrongWords + 额外干扰
  const opts = shuffle([correctWord, ...wrongWords, ...pickDistinct(allSingleWords(correctWord), Math.max(0, 3 - wrongWords.length), [correctWord, ...wrongWords])].slice(0, 4));
  const box = document.createElement('div'); box.className = 'options';
  opts.forEach(o => {
    const b = document.createElement('button'); b.className = 'opt homo-opt'; b.textContent = o;
    b.onclick = (e) => {
      if (box.dataset.done) return; box.dataset.done = '1';
      const correct = norm(o) === norm(correctWord);
      b.classList.add(correct ? 'correct' : 'wrong');
      if (!correct) $$('.opt', box).forEach(x => { if (norm(x.textContent) === norm(correctWord)) x.classList.add('correct'); });
      const fb = makeFeedback(correct, `${pair[0].split(' ')[0]} vs ${correctWord}`, q.meaning, o);
      card.appendChild(fb);
      onAnswer(correct, { x: e.clientX, y: e.clientY, correct: correctWord, your: o });
    };
    box.appendChild(b);
  });
  card.appendChild(box); wrap.appendChild(card);
}

function renderCloze(q, wrap, onAnswer) {
  const card = document.createElement('div');
  card.className = 'q-card';
  card.innerHTML = `<div class="q-prompt">选词填空</div>
    <div class="q-big" style="font-size:20px;line-height:1.6">${q.sentence.replace('_____', '<span style="color:var(--coral)">_____</span>')}</div>`;
  const opts = shuffle([q.answer, ...pickDistinct(allSingleWords(q.answer), 3, [q.answer])]);
  const box = document.createElement('div'); box.className = 'options';
  opts.forEach(o => {
    const b = document.createElement('button'); b.className = 'opt'; b.textContent = o;
    b.onclick = (e) => {
      if (box.dataset.done) return; box.dataset.done = '1';
      const correct = norm(o) === norm(q.answer);
      b.classList.add(correct ? 'correct' : 'wrong');
      if (!correct) $$('.opt', box).forEach(x => { if (norm(x.textContent) === norm(q.answer)) x.classList.add('correct'); });
      const fb = makeFeedback(correct, q.word, q.meaning, o);
      card.appendChild(fb);
      onAnswer(correct, { x: e.clientX, y: e.clientY, correct: q.answer, your: o });
    };
    box.appendChild(b);
  });
  card.appendChild(box); wrap.appendChild(card);
}

function renderSpell(q, wrap, onAnswer) {
  const card = document.createElement('div');
  card.className = 'q-card';
  if (q.sentence) {
    card.innerHTML = `<div class="q-prompt">根据句子语境拼写单词（无输入法提示）</div>
      <div class="q-big" style="font-size:18px;line-height:1.7">${q.sentence.en.replace('_____', '<span style="color:var(--coral);font-weight:900">_____</span>')}</div>
      <div class="q-sub">${escapeHtml(q.sentence.cn)}</div>
      <div class="q-sub" style="margin-top:6px;opacity:.8">词性：${q.pos}　·　要填的词：${q.meaning}</div>`;
  } else {
    card.innerHTML = `<div class="q-prompt">根据中文释义拼写英文单词（无输入法提示）</div>
      <div class="q-big">${q.meaning}</div>
      <div class="q-sub">词性：${q.pos}</div>`;
  }
  const input = makeSpellInput();
  const kbd = buildDictKeyboard(input, (ch) => {
    if (ch === '\b') input.value = input.value.slice(0, -1);
    else if (input.value.length < 30) input.value += ch;
  });
  const row = document.createElement('div'); row.className = 'input-row';
  const ok = document.createElement('button'); ok.className = 'btn'; ok.textContent = '✓ 确认';
  const skip = document.createElement('button'); skip.className = 'btn ghost small'; skip.textContent = '💡 提示';
  row.appendChild(ok); row.appendChild(skip);
  const fb = document.createElement('div'); fb.className = 'dict-fb';
  card.appendChild(input); card.appendChild(kbd); card.appendChild(row); card.appendChild(fb);
  wrap.appendChild(card);
  function judge() {
    if (card.dataset.done) return; card.dataset.done = '1';
    const correct = norm(input.value) === norm(q.answer);
    fb.innerHTML = letterDiffHTML(input.value, q.answer) + (correct ? '<div class="dict-flag ok">✅ 拼写正确！</div>' : '<div class="dict-flag no">❌ 正确答案：<b>' + escapeHtml(q.answer) + '</b></div>');
    onAnswer(correct, { x: window.innerWidth / 2, y: 120, correct: q.answer, your: input.value });
  }
  ok.onclick = judge;
  skip.onclick = () => { input.value = q.answer.slice(0, Math.ceil(q.answer.length / 2)); toast('已给出一半提示'); };
}

/* ---------- 造句评价器（规则式，无需联网/AI） ---------- */
const SENT_STOP = new Set(('a an the this that these those i you he she it we they me him her us them ' +
  'my your his its our their to of in on at for with from by about into over under ' +
  'is am are was were be been being do does did have has had will would shall should ' +
  'can could may might must and or but not so as up out down very just also too then there here').split(' '));

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}
function sentWords(s) { return (String(s).toLowerCase().match(/[a-z']+/g) || []); }
function stemEq(a, b) {
  a = a.toLowerCase(); b = b.toLowerCase();
  if (a === b) return true;
  const [short, long] = a.length <= b.length ? [a, b] : [b, a];
  return short.length >= 3 && long.startsWith(short) && (long.length - short.length) <= 3;
}
function hasWordLike(tokens, target) {
  const t = String(target).toLowerCase().trim();
  if (t.includes(' ')) return tokens.join(' ').includes(t);
  return tokens.some(w => stemEq(w, t));
}

function evaluateSentence(userText, q) {
  const raw = (userText || '').trim();
  const tokens = sentWords(raw);
  const refTokens = sentWords(q.model);
  const refContent = [...new Set(refTokens.filter(w => !SENT_STOP.has(w) && w.length > 1))];
  const matched = refContent.filter(w => tokens.some(u => stemEq(u, w)));
  const missing = refContent.filter(w => !tokens.some(u => stemEq(u, w)));
  const coverage = refContent.length ? matched.length / refContent.length : 1;

  const checks = {
    notEmpty: tokens.length > 0,
    hasTarget: hasWordLike(tokens, q.word),
    capital: /^[A-Z]/.test(raw),
    endPunct: /[.?!]$/.test(raw),
    longEnough: tokens.length >= 3,
  };

  const good = [], tips = [];
  if (checks.hasTarget) good.push(`用上了关键词「${q.word}」`);
  else tips.push(`别忘了在句子里用上「${q.word}」（${q.pos} ${q.meaning}）`);

  if (coverage >= 0.6) good.push(`意思表达比较完整（覆盖 ${matched.length}/${refContent.length} 个关键词）`);
  else if (missing.length) tips.push(`有些意思还没说到，可以想想怎么用英文表达：${missing.slice(0, 4).join('、')}`);

  if (checks.capital) good.push('句首字母大写了');
  else tips.push('英文句子开头第一个字母要大写');

  if (checks.endPunct) good.push('句末有标点');
  else tips.push('句子结尾要加标点（. ? !）');

  if (!checks.longEnough && checks.notEmpty) tips.push('句子有点短，试着写完整一点');

  let stars = 0;
  if (checks.hasTarget) stars++;
  if (coverage >= 0.6) stars++;
  if (checks.capital && checks.endPunct) stars++;
  if (!checks.notEmpty) stars = 0; else stars = Math.max(1, stars);

  const correct = checks.notEmpty && checks.hasTarget && coverage >= 0.5;
  return { checks, good, tips, coverage, matched, missing, refContent, stars, correct };
}

function renderSentence(q, wrap, onAnswer) {
  const card = document.createElement('div');
  card.className = 'q-card';
  card.innerHTML = `<div class="q-prompt">💡 造句练习 · 把中文翻译成英文</div>
    <div class="q-big" style="font-size:21px;line-height:1.6">${q.cn}</div>
    <div class="q-sub">请用上单词：<b style="color:var(--purple)">${q.word}</b>（${q.pos} ${q.meaning}）${q.hint ? '<br>用法提示：' + q.hint : ''}</div>`;
  const input = document.createElement('textarea');
  input.className = 'text-input'; input.style.height = '90px'; input.style.textAlign = 'left';
  input.placeholder = '根据上面的中文，写出英文句子…'; input.autocomplete = 'off';
  const row = document.createElement('div'); row.className = 'input-row';
  const ok = document.createElement('button'); ok.className = 'btn purple'; ok.textContent = '✓ 提交评价';
  const showModel = document.createElement('button'); showModel.className = 'btn ghost small'; showModel.textContent = '👀 看参考';
  row.appendChild(ok); row.appendChild(showModel);
  card.appendChild(input); card.appendChild(row); wrap.appendChild(card);
  setTimeout(() => input.focus(), 50);

  ok.onclick = () => {
    if (card.dataset.done) return;
    if (!input.value.trim()) { toast('先写一句英文再提交哦～'); return; }
    card.dataset.done = '1';
    const ev = evaluateSentence(input.value, q);
    const panel = document.createElement('div');
    panel.className = 'sent-eval ' + (ev.correct ? 'ok' : 'no');
    const starStr = '⭐'.repeat(ev.stars) + '☆'.repeat(3 - ev.stars);
    let html = `<div class="se-head">${starStr}　${ev.correct ? '写得不错！' : '再改进一下就更好啦～'}</div>`;
    html += `<div class="se-yours">你写的：<span class="fb-en" style="color:var(--ink)">${escapeHtml(input.value.trim())}</span></div>`;
    if (ev.good.length) html += `<div class="se-sec se-good"><b>✅ 做得好</b><ul>${ev.good.map(g => `<li>${g}</li>`).join('')}</ul></div>`;
    if (ev.tips.length) html += `<div class="se-sec se-tip"><b>💡 可以改进</b><ul>${ev.tips.map(t => `<li>${t}</li>`).join('')}</ul></div>`;
    html += `<div class="se-ref"><b>📘 参考翻译</b><div class="fb-en">${q.model}</div></div>`;
    html += `<div class="se-note">※ 这是电脑按规则给的评价，可能不够全面，最终以老师 / 家长判断为准。</div>`;
    panel.innerHTML = html;
    card.appendChild(panel);
    onAnswer(ev.correct, { x: window.innerWidth / 2, y: 120, correct: q.model, your: input.value.trim() });
  };
  showModel.onclick = () => {
    if (card.dataset.done) return; card.dataset.done = '1';
    const fb = document.createElement('div');
    fb.className = 'feedback show ok';
    fb.innerHTML = `参考翻译：<span class="fb-en">${q.model}</span><span class="fb-cn">下一题自己试着写写看～</span>`;
    card.appendChild(fb);
    onAnswer(false, { x: window.innerWidth / 2, y: 120, correct: q.model, your: '（看参考）', record: false });
  };
}

/* ---------- 反馈 / 辅助 ---------- */
function makeFeedback(correct, en, cn, your) {
  const fb = document.createElement('div');
  fb.className = 'feedback show ' + (correct ? 'ok' : 'no');
  fb.innerHTML = correct
    ? `✅ 答对啦！<span class="fb-en">${en}</span>`
    : `❌ 正确答案：<span class="fb-en">${en}</span><span class="fb-cn">你的答案：${your}</span>`;
  return fb;
}
function shortPos(p) {
  p = p || '';
  if (p.startsWith('n.')) return '名词';
  if (p.startsWith('v.')) return '动词';
  if (p.startsWith('adj')) return '形容词';
  if (p.startsWith('adv')) return '副词';
  return p;
}
function allDerivativeWords(exclude) {
  const set = [];
  VOCAB.forEach(v => (v.derivatives || []).forEach(d => { if (norm(d.word) !== norm(exclude)) set.push(d.word); }));
  return set.length ? set : VOCAB.map(v => v.word);
}
function allSingleWords(exclude) {
  const set = VOCAB.filter(v => !v.word.includes(' ') && norm(v.word) !== norm(exclude)).map(v => v.word);
  return set.length ? set : ['word', 'thing', 'happy'];
}

/* ===================================================================
   3) 错题本
=================================================================== */
function renderWrong() {
  const ids = Object.keys(state.wrong);
  const customs = state.customWrong || [];
  const dictIds = Object.keys(state.dictWrong || {});
  const verbIds = Object.keys(state.verbWrong || {});
  const totalAll = ids.length + customs.length + dictIds.length + verbIds.length;
  const title = document.createElement('div');
  title.className = 'panel-title'; title.textContent = '📒 我的错题本';
  const hint = document.createElement('div');
  hint.className = 'panel-hint';
  hint.textContent = totalAll
    ? `共 ${totalAll} 个错题需要复习（练习 ${ids.length} · 校内录入 ${customs.length} · 拼写 ${dictIds.length} · 动词 ${verbIds.length}），坚持就是胜利！`
    : '还没有错题，你真厉害！';
  main.appendChild(title); main.appendChild(hint);

  if (!totalAll) {
    main.innerHTML += '<div class="empty-state"><span class="big">🏅</span>暂无错题，继续加油！</div>';
    return;
  }

  // 手动录入校内错题（表单）
  const addWrap = document.createElement('div');
  addWrap.className = 'wrong-add';
  addWrap.innerHTML = `
    <button class="btn ghost wrong-add-toggle" type="button">➕ 录入校内错题</button>
    <div class="wrong-add-form" hidden>
      <input class="text-input wa-word" placeholder="英文单词 / 词组" autocomplete="off">
      <input class="text-input wa-mean" placeholder="中文释义" autocomplete="off">
      <input class="text-input wa-pos" placeholder="词性（可空，如 n. / v.）" autocomplete="off">
      <div class="input-row">
        <button class="btn purple wa-save" type="button">✓ 添加</button>
        <button class="btn ghost small wa-cancel" type="button">取消</button>
      </div>
    </div>`;
  main.appendChild(addWrap);

  const form = addWrap.querySelector('.wrong-add-form');
  addWrap.querySelector('.wrong-add-toggle').onclick = () => { form.hidden = !form.hidden; };
  addWrap.querySelector('.wa-cancel').onclick = () => { form.hidden = true; };
  addWrap.querySelector('.wa-save').onclick = () => {
    const word = addWrap.querySelector('.wa-word').value.trim();
    const meaning = addWrap.querySelector('.wa-mean').value.trim();
    const pos = addWrap.querySelector('.wa-pos').value.trim();
    if (!word || !meaning) { toast('单词和释义都要填哦'); return; }
    state.customWrong = state.customWrong || [];
    state.customWrong.unshift({
      key: 'cw-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
      word: word, meaning: meaning, pos: pos || '自定义',
      source: '手动录入', at: Date.now()
    });
    saveState();
    toast('已加入错题本 ✅');
    renderMode('wrong');
  };

  // 构建练习错题池（自动 + 手动）：所有模式都能进
  const pool = [
    ...ids.map(id => {
      const w = state.wrong[id];
      const v = VOCAB.find(x => x.id == id);
      if (v) return { id: v.id, word: v.word, meaning: v.meaning };
      // 合成 id（词性转换等）：从记录信息还原为匹配题
      if (w && (w.word || w.meaning)) {
        return { id: id, word: w.word || w.prompt || id, meaning: w.meaning || w.correct || '', customKey: true, noVocab: true };
      }
      return null;
    }).filter(Boolean),
    // 校内录入 / 预置错题：整条带入，保留 prompt/options/answer/explain
    // 有 options 的会走 renderCustomChoice 渲染成完整选择题；否则退化为词汇匹配题
    ...customs.map(c => Object.assign({}, c, { id: null, customKey: c.key }))
  ];

  // 🔁 重练按钮（答对自动移出）——顶部 + 底部各一个，长列表滚动到哪都能开始练
  if (pool.length) {
    const makeReviewBtn = () => {
      const review = document.createElement('button');
      review.className = 'btn coral'; review.style.width = '100%'; review.style.marginBottom = '14px';
      review.textContent = `🔁 重做练习错题（${pool.length} 题 · 答对自动移出）`;
      review.onclick = () => startQuiz('match', pool, true);
      return review;
    };
    main.appendChild(makeReviewBtn());
    var reviewBtnBottom = makeReviewBtn();
  }

  // 📒 错题列表（完整显示）
  const list = document.createElement('div'); list.className = 'wrong-list';

  // —— 练习模式错题 ——
  ids.forEach(id => {
    const w = state.wrong[id];
    const v = VOCAB.find(x => x.id == id);
    if (!v && !(w && (w.word || w.prompt))) return;
    const modeTag = MODE_LABELS[w.mode] || w.mode || '';
    const word = v ? v.word : (w.word || w.prompt || id);
    const pos = v ? v.pos : '';
    const meaning = v ? v.meaning : (w.meaning || w.correct || '');
    const item = document.createElement('div'); item.className = 'wrong-item';
    let html = `<div class="wi-word">${escapeHtml(word)} ${pos ? '<span style="font-size:13px;color:var(--ink-soft);font-weight:700">' + escapeHtml(pos) + '</span>' : ''}
      <span class="wi-tag">错 ${w.count} 次</span>${modeTag ? `<span class="wi-tag mode">${escapeHtml(modeTag)}</span>` : ''}</div>`;
    if (w.prompt) {
      html += `<div class="wi-meta saved-prompt">📝 ${escapeHtml(w.prompt)}</div>`;
      html += `<div class="wi-meta">✅ 正确答案：<b>${escapeHtml(String(w.correct || '—'))}</b></div>`;
      html += `<div class="wi-meta">✏️ 你的作答：${escapeHtml(String(w.your || '—'))}</div>`;
      if (meaning) html += `<div class="wi-meta" style="color:var(--ink-soft)">💡 ${escapeHtml(meaning)}</div>`;
    } else {
      html += `<div class="wi-meta"><span class="wi-tag">错 ${w.count} 次</span>${escapeHtml(meaning)}</div>`;
      html += `<div class="wi-meta" style="margin-top:8px">💡 用法：${(v.usage && v.usage[0]) || (v.example ? v.example.en : '—')}</div>`;
    }
    item.innerHTML = html;
    list.appendChild(item);
  });

  // —— 手动录入 ——
  customs.forEach(c => {
    const item = document.createElement('div'); item.className = 'wrong-item custom-item';
    let html = `
      <div class="wi-word">${escapeHtml(c.word)} <span style="font-size:13px;color:var(--ink-soft);font-weight:700">${escapeHtml(c.pos || '自定义')}</span>
        <span class="wi-tag mode">✍️ 校内录入</span></div>`;
    if (c.prompt && c.options && c.options.length) {
      html += `<div class="wi-meta saved-prompt" style="line-height:1.6">📝 ${escapeHtml(c.prompt)}</div>`;
      html += `<div class="wi-meta" style="line-height:1.9">${escapeHtml((c.options || []).join('　'))}</div>`;
      html += `<div class="wi-meta">✅ 正确答案：<b>${escapeHtml(String(c.answer || '—'))}</b></div>`;
    } else {
      html += `<div class="wi-meta">${escapeHtml(c.meaning)}</div>`;
    }
    if (c.explain) html += `<div class="wi-meta" style="margin-top:6px;color:var(--ink-soft);line-height:1.65">💡 ${escapeHtml(c.explain)}</div>`;
    html += c.source ? `<div class="wi-meta" style="margin-top:8px">📌 来源：${escapeHtml(c.source)}</div>` : '';
    item.innerHTML = html;
    const del = document.createElement('button');
    del.className = 'btn ghost small saved-del';
    del.textContent = '删除';
    del.onclick = () => {
      state.customWrong = (state.customWrong || []).filter(x => x.key !== c.key);
      markPresetDone(c.key); // 预置错题被手动删除 → 不再注入
      saveState();
      toast('已删除');
      renderMode('wrong');
    };
    item.appendChild(del);
    list.appendChild(item);
  });

  // —— 听写拼错本 ——
  dictIds.forEach(id => {
    const v = VOCAB.find(x => x.id == id); if (!v) return;
    const w = state.dictWrong[id];
    const item = document.createElement('div'); item.className = 'wrong-item';
    item.innerHTML = `
      <div class="wi-word">${escapeHtml(v.word)} <span style="font-size:13px;color:var(--ink-soft);font-weight:700">${escapeHtml(v.pos)}</span>
        <span class="wi-tag mode">✍️ 听写拼错</span></div>
      <div class="wi-meta"><span class="wi-tag">错 ${w.count} 次</span>${escapeHtml(v.meaning)}</div>`;
    list.appendChild(item);
  });

  // —— 动词变位错本 ——
  verbIds.forEach(base => {
    const v = (window.IRREGULAR_VERBS || []).find(x => x.base === base); if (!v) return;
    const w = state.verbWrong[base];
    const item = document.createElement('div'); item.className = 'wrong-item';
    item.innerHTML = `
      <div class="wi-word">${escapeHtml(v.base)} <span style="font-size:13px;color:var(--ink-soft);font-weight:700">不规则动词</span>
        <span class="wi-tag mode">🔀 动词变位</span></div>
      <div class="wi-meta"><span class="wi-tag">错 ${w.count} 次</span>过去式 ${escapeHtml(v.past)} · 过去分词 ${escapeHtml(v.participle)} · ${escapeHtml(v.meaning)}</div>`;
    list.appendChild(item);
  });

  main.appendChild(list);

  // 底部再来一个重练按钮（长列表滚到底也能直接开始）
  if (pool.length && reviewBtnBottom) main.appendChild(reviewBtnBottom);
}

/* ===================================================================
   4) 已做题收藏
=================================================================== */
let savedFilter = 'all';

function formatSavedTime(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  const pad = n => String(n).padStart(2, '0');
  return `${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function renderSaved() {
  if (!Array.isArray(state.saved)) state.saved = [];
  const all = state.saved;
  const list = savedFilter === 'all' ? all : all.filter(x => x.type === savedFilter);

  const title = document.createElement('div');
  title.className = 'panel-title'; title.textContent = '⭐ 已做题收藏';
  const hint = document.createElement('div');
  hint.className = 'panel-hint';
  hint.textContent = all.length
    ? `练习过的题会自动收进来（最多 ${SAVED_MAX} 题），方便回看。`
    : '去做几道练习题，做完会自动出现在这里。';
  main.appendChild(title); main.appendChild(hint);

  // 筛选 chips
  const filters = document.createElement('div');
  filters.className = 'saved-filters';
  const chips = [['all', '全部'], ...Object.entries(MODE_LABELS)];
  chips.forEach(([value, label]) => {
    const count = value === 'all' ? all.length : all.filter(x => x.type === value).length;
    const b = document.createElement('button');
    b.className = 'chip' + (savedFilter === value ? ' active' : '');
    b.textContent = `${label} ${count}`;
    b.onclick = () => { savedFilter = value; renderMode('saved'); };
    filters.appendChild(b);
  });
  main.appendChild(filters);

  if (!list.length) {
    main.innerHTML += '<div class="empty-state"><span class="big">📭</span>还没有收藏的题目</div>';
    return;
  }

  const actions = document.createElement('div');
  actions.className = 'saved-actions';
  const clearBtn = document.createElement('button');
  clearBtn.className = 'btn ghost small';
  clearBtn.textContent = savedFilter === 'all' ? '🗑️ 清空全部' : `🗑️ 清空「${MODE_LABELS[savedFilter]}」`;
  clearBtn.onclick = () => {
    if (!confirm(savedFilter === 'all' ? '确定清空全部已做题收藏？' : '确定清空当前筛选下的收藏？')) return;
    clearSaved(savedFilter === 'all' ? null : savedFilter);
    toast('已清空');
    renderMode('saved');
  };
  actions.appendChild(clearBtn);
  main.appendChild(actions);

  const wrap = document.createElement('div');
  wrap.className = 'wrong-list';
  list.forEach(entry => {
    const item = document.createElement('div');
    item.className = 'wrong-item saved-item' + (entry.ok ? ' saved-ok' : ' saved-bad');
    const modeTag = MODE_LABELS[entry.type] || entry.type;
    const resultTag = entry.ok ? '答对' : '答错';
    item.innerHTML = `
      <div class="wi-word">${escapeHtml(entry.word || '—')}
        <span class="wi-tag ${entry.ok ? 'ok' : ''}">${resultTag}</span>
        <span class="wi-tag mode">${escapeHtml(modeTag)}</span>
      </div>
      <div class="wi-meta saved-prompt">${escapeHtml(entry.prompt || '')}</div>
      <div class="wi-meta">✅ 答案：${escapeHtml(String(entry.answer || '—'))}</div>
      <div class="wi-meta">✏️ 你的作答：${escapeHtml(String(entry.your || '—'))}</div>
      <div class="wi-meta saved-time">${formatSavedTime(entry.at)}</div>`;
    const del = document.createElement('button');
    del.className = 'btn ghost small saved-del';
    del.textContent = '移除';
    del.onclick = () => { removeSaved(entry.key); toast('已移除'); renderMode('saved'); };
    item.appendChild(del);
    wrap.appendChild(item);
  });
  main.appendChild(wrap);
}

/* ===================================================================
   5) 听写模式（纸笔 + 音频提示 + 无提示自测，对齐考试）
=================================================================== */
function renderDictate() {
  state.dictWrong = state.dictWrong || {};
  state.verbWrong = state.verbWrong || {};
  const bankCount = Object.keys(state.dictWrong).length;
  const verbBankCount = Object.keys(state.verbWrong).length;
  main.innerHTML = '';
  const title = document.createElement('div');
  title.className = 'panel-title'; title.textContent = '✍️ 听写模式';
  const hint = document.createElement('div');
  hint.className = 'panel-hint';
  hint.innerHTML = '网站朗读单词 + 显示中文，孩子在<b>纸上</b>写出英文，再核对。<br>完全无提示，练的就是考试那种「听音 / 看中文写词」。';
  main.appendChild(title); main.appendChild(hint);

  const panel = document.createElement('div');
  panel.className = 'dict-start';
  panel.innerHTML =
    '<button class="dict-scope-btn btn" data-scope="all" type="button">📝 全单元听写<br><small>' + UNIT_INFO.total + ' 个单词</small></button>' +
    '<button class="dict-scope-btn btn purple" data-scope="bank" type="button"' + (bankCount ? '' : ' disabled') + '>📒 只练拼错本<br><small>' + bankCount + ' 个待巩固</small></button>' +
    '<label class="dict-auto"><input type="checkbox" id="dictAuto" checked> 自动朗读每个单词</label>' +
    '<div class="dict-note">💡 想练得更狠：只听读音、不看中文，把「显示答案」留到最后再点。</div>' +
    '<div class="dict-sep">🏃 不规则动词听写（给原形，写过去式 / 过去分词）</div>' +
    '<button class="dict-scope-btn btn green" data-verb="all" type="button">🏃 动词表听写<br><small>' + ((window.IRREGULAR_VERBS || []).length) + ' 个动词</small></button>' +
    '<button class="dict-scope-btn btn green" data-verb="bank" type="button"' + (verbBankCount ? '' : ' disabled') + '>📒 只练动词错本<br><small>' + verbBankCount + ' 个待巩固</small></button>';
  main.appendChild(panel);

  panel.querySelectorAll('.dict-scope-btn').forEach(b => {
    b.onclick = () => {
      if (b.disabled) return;
      const auto = panel.querySelector('#dictAuto').checked;
      if (b.dataset.verb) {
        let list;
        if (b.dataset.verb === 'bank') list = (window.IRREGULAR_VERBS || []).filter(x => state.verbWrong && state.verbWrong[x.base]);
        else list = (window.IRREGULAR_VERBS || []).slice();
        if (!list.length) { toast('没有可听的动词'); return; }
        startVerbDictation(list, auto, b.dataset.verb === 'bank');
        return;
      }
      let list;
      if (b.dataset.scope === 'bank') {
        list = Object.keys(state.dictWrong).map(id => VOCAB.find(x => x.id == id)).filter(Boolean);
      } else {
        list = VOCAB.slice();
      }
      if (!list.length) { toast('没有可听的单词'); return; }
      startDictation(list, auto, b.dataset.scope === 'bank');
    };
  });
}

function startDictation(list, auto, isReview) {
  list = shuffle(list);
  const results = [];
  let idx = 0;
  function show() {
    if (idx >= list.length) return dictSummary(results, isReview);
    const v = list[idx];
    renderDictateWord(v, idx, list.length, auto, isReview, results, () => { idx++; show(); });
  }
  show();
}

// 字母级拼写比对：正确字母绿、错位/缺失红、多余字母删除线
function letterDiffHTML(user, answer) {
  user = (user || '').toLowerCase();
  answer = (answer || '').toLowerCase();
  let uh = '', i = 0;
  for (; i < answer.length; i++) {
    const a = answer[i];
    const u = user[i] || '';
    const ok = u === a;
    uh += '<span class="ld-' + (ok ? 'ok' : 'bad') + '">' + (u ? escapeHtml(u) : '·') + '</span>';
  }
  for (; i < user.length; i++) uh += '<span class="ld-extra">' + escapeHtml(user[i]) + '</span>';
  return '<div class="ld-user">你的拼写：' + uh + '</div>' +
         '<div class="ld-correct">正确答案：<b>' + escapeHtml(answer) + '</b></div>';
}

// 创建一个真正的文本框作为拼写输入区（原生接收设备键盘，点一下即聚焦）
function makeSpellInput() {
  const input = document.createElement('input');
  input.className = 'dict-input';
  input.type = 'text';
  input.placeholder = '_';
  input.autocomplete = 'off'; input.autocorrect = 'off'; input.autocapitalize = 'off';
  input.spellcheck = false;
  input.maxLength = 30;
  return input;
}

// 自定义无提示键盘：完全绕开系统输入法的联想 / 纠错，保证「无提示拼写」
// input 为真实文本框（显示与输入共用），onType 直接操作 input.value
// 物理键盘：input 聚焦时由浏览器原生处理；未聚焦时由 document 监听转发，两端互斥避免重复
function buildDictKeyboard(input, onType) {
  const kbd = document.createElement('div');
  kbd.className = 'dict-kbd';
  const rows = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
  rows.forEach((row, ri) => {
    const r = document.createElement('div');
    r.className = 'dict-kbd-row';
    if (ri === 2) {
      const sp = document.createElement('button');
      sp.className = 'dict-key dict-space'; sp.type = 'button'; sp.textContent = '空格';
      sp.onclick = () => onType(' '); r.appendChild(sp);
    }
    row.split('').forEach(ch => {
      const k = document.createElement('button');
      k.className = 'dict-key'; k.type = 'button'; k.textContent = ch;
      k.onclick = () => onType(ch); r.appendChild(k);
    });
    if (ri === 2) {
      const bs = document.createElement('button');
      bs.className = 'dict-key dict-bs'; bs.type = 'button'; bs.textContent = '⌫';
      bs.onclick = () => onType('\b'); r.appendChild(bs);
    }
    kbd.appendChild(r);
  });
  const hint = document.createElement('div');
  hint.className = 'dict-kbd-hint';
  hint.textContent = '💻 也可直接用设备键盘打字（点一下输入框再敲字母）';
  kbd.appendChild(hint);
  // 💻 物理键盘支持：未聚焦时监听按键转发；input 已聚焦则交给浏览器原生，避免重复输入
  const onKey = (e) => {
    if (!kbd.isConnected) { document.removeEventListener('keydown', onKey); return; }
    if (document.activeElement === input) return;            // 已聚焦 → 原生处理
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const key = e.key;
    if (key === 'Backspace') { e.preventDefault(); onType('\b'); }
    else if (key === ' ') { e.preventDefault(); onType(' '); }
    else if (key.length === 1 && /[a-zA-Z]/.test(key)) { e.preventDefault(); onType(key.toLowerCase()); }
  };
  document.addEventListener('keydown', onKey);
  // 渲染后自动聚焦输入框，PC/平板外接键盘立即可用
  setTimeout(() => { try { input.focus(); } catch (_) {} }, 60);
  return kbd;
}

function renderDictateWord(v, idx, total, auto, isReview, results, done) {
  state.dictWrong = state.dictWrong || {};
  main.innerHTML = '';
  const card = document.createElement('div');
  card.className = 'dict-card';
  const inBank = !!state.dictWrong[v.id];
  card.innerHTML =
    '<div class="dict-head"><span>第 ' + (idx + 1) + ' / ' + total + ' 词</span>' + (inBank ? '<span class="weak-badge">📒 拼错本</span>' : '') + '</div>' +
    '<div class="dict-cuelabel">中文释义（听写提示）</div>' +
    '<div class="dict-cue">' + v.meaning + '</div>' +
    '<button class="btn purple dict-listen" type="button">🔊 听读音</button>' +
    '<div class="dict-paper">✏️ 请在纸上写出这个单词</div>' +
    '<div class="dict-checks">' +
      '<button class="btn dict-reveal-btn" type="button">👀 显示答案（纸面核对）</button>' +
      '<button class="btn ghost dict-type-btn" type="button">⌨️ 打字自测（自动批改）</button>' +
    '</div>' +
    '<div class="dict-reveal" hidden></div>' +
    '<div class="dict-type" hidden></div>' +
    '<button class="btn ghost dict-next" type="button" disabled>下一词 ➡️</button>';
  main.appendChild(card);

  const nextBtn = card.querySelector('.dict-next');
  const listenBtn = card.querySelector('.dict-listen');
  listenBtn.onclick = () => speak(v.word);
  if (auto) setTimeout(() => speak(v.word), 250);

  let recorded = false;
  function grade(correct) {
    if (recorded) return;
    recorded = true;
    state.dictWrong = state.dictWrong || {};
    if (correct) {
      if (isReview) delete state.dictWrong[v.id];
    } else {
      const d = state.dictWrong[v.id] || { count: 0, last: 0 };
      d.count = (d.count || 0) + 1; d.last = Date.now();
      state.dictWrong[v.id] = d;
    }
    saveState();
    results.push({ id: v.id, correct: correct });
    nextBtn.disabled = false;
  }

  // 路径 A：显示答案 → 纸面核对 → 自评
  const revealBox = card.querySelector('.dict-reveal');
  card.querySelector('.dict-reveal-btn').onclick = () => {
    revealBox.hidden = false;
    revealBox.innerHTML =
      '<div class="dict-answer">' + v.word + ' ' + speakBtnHtml(v.word, '朗读') + '</div>' +
      '<div class="dict-grade">' +
        '<button class="btn dict-right" type="button">✅ 我写对了</button>' +
        '<button class="btn coral dict-wrong" type="button">❌ 我写错了</button>' +
      '</div>';
    const sp = revealBox.querySelector('.fc-speak');
    if (sp) sp.onclick = (e) => { e.stopPropagation(); speak(sp.dataset.text || v.word); };
    revealBox.querySelectorAll('.dict-right, .dict-wrong').forEach(b => {
      b.onclick = () => {
        const ok = b.classList.contains('dict-right');
        grade(ok);
        revealBox.querySelector('.dict-grade').style.display = 'none';
        revealBox.insertAdjacentHTML('beforeend',
          '<div class="dict-flag">' + (ok ? '✅ 已记录：写对了' : '📒 已加入拼错本，下次重点练') + '</div>');
      };
    });
  };

  // 路径 B：屏幕打字自测（自定义无提示键盘）
  const typeBox = card.querySelector('.dict-type');
  card.querySelector('.dict-type-btn').onclick = () => {
    typeBox.hidden = false;
    const input = makeSpellInput();
    const kbd = buildDictKeyboard(input, (ch) => {
      if (ch === '\b') input.value = input.value.slice(0, -1);
      else if (input.value.length < 30) input.value += ch;
    });
    const submit = document.createElement('button');
    submit.className = 'btn dict-submit'; submit.type = 'button'; submit.textContent = '✓ 提交批改';
    const fb = document.createElement('div'); fb.className = 'dict-fb';
    submit.onclick = () => {
      if (recorded) return;
      const correct = norm(input.value) === norm(v.word);
      fb.innerHTML = letterDiffHTML(input.value, v.word) +
        (correct ? '<div class="dict-flag ok">✅ 拼写正确！</div>' : '<div class="dict-flag no">📒 已加入拼错本</div>');
      grade(correct);
      submit.disabled = true;
    };
    typeBox.appendChild(input); typeBox.appendChild(kbd); typeBox.appendChild(submit); typeBox.appendChild(fb);
  };

  nextBtn.onclick = () => done();
}

function dictSummary(results, isReview) {
  main.innerHTML = '';
  const total = results.length;
  const correctCnt = results.filter(r => r.correct).length;
  const missedIds = results.filter(r => !r.correct).map(r => r.id);
  const card = document.createElement('div');
  card.className = 'result-card';
  card.innerHTML =
    '<div class="result-emoji">' + (missedIds.length ? '💪' : '🏆') + '</div>' +
    '<div class="result-score">' + correctCnt + ' / ' + total + '</div>' +
    '<div class="result-detail">' + (total
      ? ('已核对 ' + total + ' 个词，其中 ' + missedIds.length + ' 个需巩固' + (missedIds.length ? '（已加入拼错本）' : ''))
      : '这次没有核对任何词，下次试试「显示答案」或「打字自测」吧～') + '</div>';
  if (missedIds.length) {
    const list2 = document.createElement('div');
    list2.className = 'wrong-list';
    missedIds.forEach(id => {
      const v = VOCAB.find(x => x.id == id); if (!v) return;
      const it = document.createElement('div');
      it.className = 'wrong-item';
      it.innerHTML = '<div class="wi-word">' + v.word + ' <span style="font-size:13px;color:var(--ink-soft)">' + v.pos + '</span></div>' +
                     '<div class="wi-meta">' + v.meaning + '</div>';
      list2.appendChild(it);
    });
    card.appendChild(list2);
  }
  const again = document.createElement('button');
  again.className = 'btn coral'; again.type = 'button'; again.style.width = '100%'; again.style.marginTop = '14px';
  again.textContent = '🔁 再听写一次';
  again.onclick = () => renderDictate();
  const review = document.createElement('button');
  review.className = 'btn purple'; review.type = 'button'; review.style.width = '100%'; review.style.marginTop = '10px';
  review.textContent = '📒 只练拼错本';
  review.onclick = () => {
    const bank = Object.keys(state.dictWrong || {}).map(id => VOCAB.find(x => x.id == id)).filter(Boolean);
    if (bank.length) startDictation(bank, true, true); else toast('拼错本空了！');
  };
  const back = document.createElement('button');
  back.className = 'btn ghost'; back.type = 'button'; back.style.width = '100%'; back.style.marginTop = '10px';
  back.textContent = '⬅️ 返回模式选择';
  back.onclick = () => renderMode('cards');
  card.appendChild(again); card.appendChild(review); card.appendChild(back);
  main.appendChild(card);
}

/* ---------- 不规则动词听写 ---------- */
function startVerbDictation(list, auto, isReview) {
  list = shuffle(list);
  const results = [];
  let idx = 0;
  function show() {
    if (idx >= list.length) return verbSummary(results, isReview);
    const v = list[idx];
    renderVerbWord(v, idx, list.length, auto, isReview, results, () => { idx++; show(); });
  }
  show();
}
function renderVerbWord(v, idx, total, auto, isReview, results, done) {
  state.verbWrong = state.verbWrong || {};
  main.innerHTML = '';
  const card = document.createElement('div');
  card.className = 'dict-card';
  card.innerHTML =
    '<div class="dict-head"><span>第 ' + (idx + 1) + ' / ' + total + ' 个动词</span></div>' +
    '<div class="dict-cuelabel">原形 + 中文（听写提示）</div>' +
    '<div class="dict-cue">' + v.base + ' <span style="color:var(--ink-soft)">' + v.meaning + '</span></div>' +
    '<button class="btn purple dict-listen" type="button">🔊 听读音</button>' +
    '<div class="dict-paper">✏️ 请在纸上写出「过去式」与「过去分词」</div>' +
    '<div class="verb-fields">' +
      '<div class="verb-field"><span class="vf-label">过去式</span><div class="dict-typed vf-disp" data-f="past">_</div><button class="btn ghost small vf-type" type="button" data-f="past">⌨️ 打字</button></div>' +
      '<div class="verb-field"><span class="vf-label">过去分词</span><div class="dict-typed vf-disp" data-f="part">_</div><button class="btn ghost small vf-type" type="button" data-f="part">⌨️ 打字</button></div>' +
    '</div>' +
    '<div class="dict-type" hidden></div>' +
    '<button class="btn dict-submit" type="button">✓ 提交批改</button>' +
    '<div class="dict-fb"></div>' +
    '<button class="btn ghost dict-next" type="button" disabled>下一词 ➡️</button>';
  main.appendChild(card);

  const nextBtn = card.querySelector('.dict-next');
  const listenBtn = card.querySelector('.dict-listen');
  listenBtn.onclick = () => speak(v.base);
  if (auto) setTimeout(() => speak(v.base), 250);

  const vals = { past: '', part: '' };
  const typeBox = card.querySelector('.dict-type');
  function openKbd(field) {
    typeBox.hidden = false; typeBox.innerHTML = '';
    const input = makeSpellInput();
    input.value = vals[field] || '';
    const sync = () => {
      vals[field] = input.value;
      const d = card.querySelector('.vf-disp[data-f="' + field + '"]');
      if (d) d.textContent = input.value || '_';
    };
    input.oninput = sync;   // 物理键盘原生输入同步
    const kbd = buildDictKeyboard(input, (ch) => {
      if (ch === '\b') input.value = input.value.slice(0, -1);
      else if (input.value.length < 30) input.value += ch;
      sync();               // 虚拟键盘输入同步
    });
    typeBox.appendChild(input); typeBox.appendChild(kbd);
  }
  card.querySelectorAll('.vf-type').forEach(b => b.onclick = () => openKbd(b.dataset.f));

  let recorded = false;
  card.querySelector('.dict-submit').onclick = () => {
    if (recorded) return; recorded = true;
    const pastOk = matchVerb(norm(vals.past), v.past);
    const partOk = matchVerb(norm(vals.part), v.participle);
    const correct = pastOk && partOk;
    state.verbWrong = state.verbWrong || {};
    if (correct) { if (isReview) delete state.verbWrong[v.base]; }
    else { const d = state.verbWrong[v.base] || { count: 0, last: 0 }; d.count = (d.count || 0) + 1; d.last = Date.now(); state.verbWrong[v.base] = d; }
    saveState();
    results.push({ base: v.base, correct: correct });
    const fb = card.querySelector('.dict-fb');
    fb.innerHTML = letterDiffHTML(vals.past, v.past) + letterDiffHTML(vals.part, v.participle) +
      (correct ? '<div class="dict-flag ok">✅ 全部正确！</div>' : '<div class="dict-flag no">📒 已加入动词错本</div>');
    nextBtn.disabled = false;
  };
  nextBtn.onclick = () => done();
}
function matchVerb(input, answer) {
  input = norm(input); answer = norm(answer);
  if (input === answer) return true;
  if (answer.indexOf('/') >= 0) return answer.split('/').some(x => norm(x) === input);
  return false;
}
function verbSummary(results, isReview) {
  main.innerHTML = '';
  const total = results.length;
  const correctCnt = results.filter(r => r.correct).length;
  const missed = results.filter(r => !r.correct).map(r => r.base);
  const card = document.createElement('div');
  card.className = 'result-card';
  card.innerHTML = '<div class="result-emoji">' + (missed.length ? '💪' : '🏆') + '</div>' +
    '<div class="result-score">' + correctCnt + ' / ' + total + '</div>' +
    '<div class="result-detail">' + (total ? ('已核对 ' + total + ' 个动词，其中 ' + missed.length + ' 个需巩固' + (missed.length ? '（已加入动词错本）' : '')) : '这次没核对，下次试试打字自测吧～') + '</div>';
  if (missed.length) {
    const list2 = document.createElement('div'); list2.className = 'wrong-list';
    missed.forEach(b => {
      const v = (window.IRREGULAR_VERBS || []).find(x => x.base === b);
      if (!v) return;
      const it = document.createElement('div'); it.className = 'wrong-item';
      it.innerHTML = '<div class="wi-word">' + v.base + ' → ' + v.past + ' / ' + v.participle + '</div><div class="wi-meta">' + v.meaning + '</div>';
      list2.appendChild(it);
    });
    card.appendChild(list2);
  }
  const again = document.createElement('button');
  again.className = 'btn coral'; again.type = 'button'; again.style.width = '100%'; again.style.marginTop = '14px';
  again.textContent = '🔁 再听写一次';
  again.onclick = () => renderDictate();
  const review = document.createElement('button');
  review.className = 'btn purple'; review.type = 'button'; review.style.width = '100%'; review.style.marginTop = '10px';
  review.textContent = '📒 只练动词错本';
  review.onclick = () => {
    const bank = (window.IRREGULAR_VERBS || []).filter(x => state.verbWrong && state.verbWrong[x.base]);
    if (bank.length) startVerbDictation(bank, true, true); else toast('动词错本空了！');
  };
  const back = document.createElement('button');
  back.className = 'btn ghost'; back.type = 'button'; back.style.width = '100%'; back.style.marginTop = '10px';
  back.textContent = '⬅️ 返回模式选择';
  back.onclick = () => renderMode('cards');
  card.appendChild(again); card.appendChild(review); card.appendChild(back);
  main.appendChild(card);
}

/* ---------- 云端登录 UI ---------- */
function renderCloudBar(login) {
  const bar = document.getElementById('cloudBar');
  if (!bar) return;
  if (!CloudSync.enabled) { bar.style.display = 'none'; return; }
  bar.style.display = '';
  if (login) {
    bar.innerHTML =
      '<span class="cb-dot" id="cbDot" title="同步状态"></span>' +
      '<span class="cb-sync" id="cbSync">☁️ 进度已同步（手机/平板/电脑共享）</span>';
    updateSyncStatus('synced');
  } else {
    bar.innerHTML =
      '<span class="cb-dot err"></span>' +
      '<span class="cb-sync">☁️ 云端未连接，进度仅保存在本机</span>';
  }
}
function updateSyncStatus(status) {
  const dot = document.getElementById('cbDot');
  const sync = document.getElementById('cbSync');
  if (!dot) return;
  dot.className = 'cb-dot' + (status === 'synced' ? ' ok' : status === 'error' ? ' err' : '');
  if (sync) sync.textContent = status === 'synced' ? '☁️ 已同步' : status === 'error' ? '☁️ 同步失败' : '☁️ 已连接';
}
/* ---------- 首次进入 ---------- */
renderMode('cards');
