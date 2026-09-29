/* ============================================================
 * 历史岛 · 中国历史七上（人教版 2024 新版课序）
 *   四个模块：时间轴 / 课本 / 练习（闪卡·挖空·因果排序）/ 错题本
 *   进度：localStorage 本机保存 + CloudBase 云端同步（与英语岛隔离）
 * ============================================================ */
var STORE_SUFFIX = 'hist7a';
var KEY = 'history_island_v1';
var H = window.HIST;

var state = { done: {}, card: {}, wrong: [], stat: { r: 0, w: 0 } };
var POOL = { cards: [], fills: [], chains: [], maps: [] };
var filter = { unit: 0, drill: 'card', scope: 0 };
var queue = [], qi = 0, answered = false, nextFn = null;

/* ---------- 工具 ---------- */
function $(s) { return document.querySelector(s); }
function el(t, c, txt) {
  var e = document.createElement(t);
  if (c) e.className = c;
  if (txt != null) e.textContent = txt;
  return e;
}
function shuffle(a) {
  a = a.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}
function fmtYear(y, bp) {
  var a = Math.abs(y);
  if (bp) return a >= 10000 ? '距今约' + (Math.round((a + 2000) / 10000 * 10) / 10) + '万年' : '距今约' + (a + 2000) + '年';
  return y < 0 ? '公元前' + a + '年' : '公元' + a + '年';
}
function lesson(i) { for (var n = 0; n < H.l.length; n++) if (H.l[n].i === i) return H.l[n]; return null; }

/* ---------- 进度存取 ---------- */
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  if (window.CloudSync) CloudSync.push(state);
}
function load() {
  try {
    var s = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (s && typeof s === 'object') {
      state.done = s.done || {}; state.card = s.card || {};
      state.wrong = s.wrong || []; state.stat = s.stat || { r: 0, w: 0 };
    }
  } catch (e) {}
}
function syncBadge() {
  var n = state.wrong.length;
  var b = $('#wrongN'); if (b) b.textContent = n;
  var s = $('#syncState');
  if (s) s.innerHTML = window.CloudSync && CloudSync.loggedIn
    ? '进度：<b>云端已同步</b>' : '进度：本机';
}

/* ---------- 题目池 ---------- */
function buildPool() {
  var cards = [], fills = [], chains = [];
  H.l.forEach(function (l) {
    (l.sec || []).forEach(function (s, si) {
      (s[1] || []).forEach(function (it, ii) {
        var o = { id: 'L' + l.i + '-' + si + '-' + ii, lesson: l.i, lt: l.t, sec: s[0], k: it[0], v: it[1] };
        cards.push(o);
        if (it[1] && it[1].length <= 26) fills.push(o);
      });
    });
    (l.add && l.add.it || []).forEach(function (it, ii) {
      var o = { id: 'L' + l.i + '-a' + ii, lesson: l.i, lt: l.t, sec: '新增', k: it[0], v: it[1] };
      cards.push(o);
      if (it[1] && it[1].length <= 26) fills.push(o);
    });
    (l.chain || []).forEach(function (c, ci) {
      chains.push({ id: 'L' + l.i + '-c' + ci, lesson: l.i, lt: l.t, t: c.t, s: c.s.slice() });
    });
  });
  POOL = { cards: cards, fills: fills, chains: chains };
}
function inScope(o) {
  if (!filter.scope) return true;
  var u = lesson(o.lesson); return u && u.u === filter.scope;
}

/* ---------- 视图切换 ---------- */
document.querySelectorAll('nav button').forEach(function (b) {
  b.onclick = function () {
    document.querySelectorAll('nav button').forEach(function (x) { x.classList.remove('on'); });
    b.classList.add('on');
    document.querySelectorAll('.view').forEach(function (v) { v.classList.remove('on'); });
    $('#v-' + b.dataset.v).classList.add('on');
    if (b.dataset.v === 'wrong') renderWrong();
    if (b.dataset.v === 'drill') newRound();
  };
});

/* ---------- 时间轴 ---------- */
function renderTime() {
  var box = $('#timeFilter'); box.innerHTML = '';
  [['全部', 0]].concat(H.u.map(function (u) { return [u.n.split('：')[0], u.i]; })).forEach(function (f) {
    var c = el('button', 'chip' + (filter.unit === f[1] ? ' on' : ''), f[0]);
    c.onclick = function () { filter.unit = f[1]; renderTime(); };
    box.appendChild(c);
  });

  var list = $('#timeList'); list.innerHTML = '';
  H.u.forEach(function (u) {
    if (filter.unit && u.i !== filter.unit) return;
    var evs = [];
    H.l.forEach(function (l) { if (l.u === u.i) (l.ev || []).forEach(function (e) { evs.push({ y: e[0], t: e[1], bp: e[2], li: l.i }); }); });
    evs.sort(function (a, b) { return a.y - b.y; });
    if (!evs.length) return;

    var hd = el('div', 'uhead');
    hd.appendChild(el('div', 'ubar'));
    hd.appendChild(el('div', 'uname', u.n));
    hd.appendChild(el('div', 'urange', u.r));
    list.appendChild(hd);

    var card = el('div', 'card');
    evs.forEach(function (e) {
      var row = el('div', 'ev');
      row.appendChild(el('div', 'evy', fmtYear(e.y, e.bp)));
      row.appendChild(el('div', 'evt', e.t));
      row.appendChild(el('div', 'evl', '第' + e.li + '课'));
      row.onclick = function () { openLesson(e.li); };
      card.appendChild(row);
    });
    list.appendChild(card);
  });
}

/* ---------- 课本 ---------- */
function renderBook() {
  var box = $('#bookList'); box.innerHTML = '';
  H.u.forEach(function (u) {
    var d = el('div', 'unit');
    var hd = el('div', 'uhead2');
    hd.appendChild(el('div', 't', u.n));
    hd.appendChild(el('div', 'r', u.r));
    var ls = el('div', 'ulist');
    hd.onclick = function () { d.classList.toggle('open'); };
    H.l.forEach(function (l) {
      if (l.u !== u.i) return;
      var r = el('div', 'lsn' + (state.done[l.i] ? ' done' : ''));
      r.appendChild(el('div', 'no', String(l.i)));
      var tw = el('div'); tw.style.flex = '1';
      tw.appendChild(el('div', 'tt', l.t));
      if (l.old && l.old !== l.t) tw.appendChild(el('div', 'old', '旧版：' + l.old));
      r.appendChild(tw);
      r.appendChild(el('div', 'muted', state.done[l.i] ? '✓' : ''));
      r.onclick = function (e) { e.stopPropagation(); openLesson(l.i); };
      ls.appendChild(r);
    });
    d.appendChild(hd); d.appendChild(ls);
    box.appendChild(d);
    if (u.i === 1) d.classList.add('open');
  });
}

function openLesson(i) {
  var l = lesson(i); if (!l) return;
  $('#detT').textContent = '第' + l.i + '课　' + l.t;
  var b = $('#detB'); b.innerHTML = '';
  var dn = $('#detDone');
  dn.textContent = state.done[l.i] ? '✓ 已学' : '标记已学';
  dn.className = 'btn' + (state.done[l.i] ? '' : ' pri');
  dn.onclick = function () {
    if (state.done[l.i]) delete state.done[l.i]; else state.done[l.i] = 1;
    save(); openLesson(i); renderBook();
  };

  if (l.std) b.appendChild(el('div', 'std', '【课程标准】' + l.std));
  (l.sec || []).forEach(function (s) {
    var d = el('div', 'sec');
    d.appendChild(el('div', 'sec-h', s[0]));
    (s[1] || []).forEach(function (it) {
      var r = el('div', 'it');
      r.appendChild(el('div', 'k', it[0]));
      r.appendChild(el('div', 'v', it[1]));
      d.appendChild(r);
    });
    b.appendChild(d);
  });
  (l.tab || []).forEach(function (t) {
    var d = el('div', 'sec');
    d.appendChild(el('div', 'sec-h', t.t));
    var tb = el('table'), th = el('tr');
    t.h.forEach(function (h) { th.appendChild(el('th', null, h)); });
    tb.appendChild(el('thead')).appendChild(th);
    var tb2 = el('tbody');
    t.r.forEach(function (row) {
      var tr = el('tr');
      row.forEach(function (c) { tr.appendChild(el('td', null, c)); });
      tb2.appendChild(tr);
    });
    tb.appendChild(tb2); d.appendChild(tb); b.appendChild(d);
  });
  (l.chain || []).forEach(function (c) {
    var d = el('div', 'chain');
    d.appendChild(el('div', 'ct', c.t));
    var ol = el('ol');
    c.s.forEach(function (s) { ol.appendChild(el('li', null, s)); });
    d.appendChild(ol); b.appendChild(d);
  });
  (l.star || []).forEach(function (s) { b.appendChild(el('div', 'star', s)); });
  if (l.add && l.add.it && l.add.it.length) {
    var d = el('div', 'add');
    d.appendChild(el('div', 'at', l.add.t));
    l.add.it.forEach(function (it) {
      var r = el('div', 'it');
      r.appendChild(el('div', 'k', it[0]));
      r.appendChild(el('div', 'v', it[1]));
      d.appendChild(r);
    });
    d.appendChild(el('div', 'asrc', '来源：' + l.add.src));
    b.appendChild(d);
  }
  $('#det').classList.add('on');
  $('.sheet').scrollTop = 0;
}
$('#detClose').onclick = function () { $('#det').classList.remove('on'); };
$('#det').onclick = function (e) { if (e.target === $('#det')) $('#det').classList.remove('on'); };

/* ---------- 练习 ---------- */
document.querySelectorAll('#v-drill .chip[data-d]').forEach(function (b) {
  b.onclick = function () {
    document.querySelectorAll('#v-drill .chip[data-d]').forEach(function (x) { x.classList.remove('on'); });
    b.classList.add('on'); filter.drill = b.dataset.d; newRound();
  };
});
function renderScope() {
  var box = $('#drillScope'); box.innerHTML = '';
  if (filter.drill === 'chain') {
    box.appendChild(el('span', 'muted', '范围：'));
    [['全部单元', 0]].concat(H.u.map(function (u) { return [u.n.split('：')[0], u.i]; })).forEach(function (f) {
      var c = el('button', 'chip' + (filter.scope === f[1] ? ' on' : ''), f[0]);
      c.onclick = function () { filter.scope = f[1]; renderScope(); newRound(); };
      box.appendChild(c);
    });
  } else {
    box.appendChild(el('span', 'muted', '范围：'));
    var cur = el('b', null, filter.scope ? (H.u[filter.scope - 1] || {}).n.split('：')[0] : '全部 20 课');
    box.appendChild(cur);
  }
}
function newRound() {
  renderScope();
  var pool = filter.drill === 'chain' ? POOL.chains : (filter.drill === 'fill' ? POOL.fills : POOL.cards);
  queue = shuffle(pool.filter(inScope));
  qi = 0; answered = false;
  if (!queue.length) { $('#drillBody').innerHTML = '<div class="empty">这个范围暂时没有题目</div>'; return; }
  nextQ();
}
function nextQ() {
  nextFn = nextQ;
  if (qi >= queue.length) {
    $('#drillBody').innerHTML =
      '<div class="card"><h2>这一轮完成了</h2><p class="muted">共 ' + queue.length + ' 题。' +
      '正确 ' + state.stat.r + ' 题，错误 ' + state.stat.w + ' 题。</p>' +
      '<div class="row" style="margin-top:14px"><button class="btn pri" id="again">再来一轮</button></div></div>';
    $('#again').onclick = function () { newRound(); };
    return;
  }
  answered = false;
  var q = queue[qi];
  var body = $('#drillBody'); body.innerHTML = '';
  var pg = el('div', 'prog');
  pg.appendChild(el('span', null, '第 ' + (qi + 1) + ' / ' + queue.length + ' 题'));
  pg.appendChild(el('span', null, '✓ ' + state.stat.r + '　✕ ' + state.stat.w));
  body.appendChild(pg);

  var card = el('div', 'qbox');
  if (filter.drill === 'card') renderCard(card, q);
  if (filter.drill === 'fill') renderFill(card, q);
  if (filter.drill === 'chain') renderChain(card, q);
  body.appendChild(card);

  var bar = el('div', 'row'); bar.style.marginTop = '12px';
  if (filter.drill === 'card') {
    var b1 = el('button', 'btn', '再看看'), b2 = el('button', 'btn pri', '记住了');
    b1.onclick = function () { markCard(q, false); };
    b2.onclick = function () { markCard(q, true); };
    bar.appendChild(b1); bar.appendChild(b2);
  } else {
    var nb = el('button', 'btn', '跳过');
    nb.onclick = function () { qi++; nextQ(); };
    bar.appendChild(nb);
  }
  body.appendChild(bar);
}

/* 闪卡 */
function renderCard(box, q) {
  box.appendChild(el('div', 'qlabel', q.sec));
  box.appendChild(el('div', 'qtext', q.k));
  var a = el('div', 'ans');
  a.appendChild(el('div', 'muted', q.v));
  box.appendChild(a);
  var show = el('button', 'btn pri', '显示答案');
  show.style.marginTop = '14px';
  show.onclick = function () { a.classList.add('on'); show.style.display = 'none'; };
  box.appendChild(show);
  var m = state.card[q.id];
  if (m) box.appendChild(el('div', 'muted', '上次：' + (m.ok ? '记住了' : '再看看') + '（' + (m.n || 1) + '次）'));
}
function markCard(q, ok) {
  var m = state.card[q.id] || { ok: ok, n: 0 };
  m.ok = ok; m.n = (m.n || 0) + 1;
  state.card[q.id] = m;
  if (!ok) addWrong({ type: 'card', id: q.id });
  save(); qi++; nextQ();
}

/* 挖空填空：onRight = 答对时回调（错题重练用它自动移除） */
function renderFill(box, q, onRight) {
  box.appendChild(el('div', 'qlabel', '第' + q.lesson + '课 · ' + q.lt + ' · ' + q.sec));
  var t = el('div', 'qtext');
  t.appendChild(document.createTextNode(q.k + '：'));
  var bl = el('span', 'blank', '＿＿＿');
  t.appendChild(bl);
  box.appendChild(t);

  var pool = POOL.fills;
  var same = pool.filter(function (x) { return x.lesson === q.lesson && x.id !== q.id; });
  var picks = shuffle(same).slice(0, 3);
  if (picks.length < 3) picks = picks.concat(shuffle(pool.filter(function (x) { return x.lesson !== q.lesson; })).slice(0, 3 - picks.length));
  var opts = shuffle(picks.concat([q]));

  var ow = el('div', 'opts');
  opts.forEach(function (o) {
    var b = el('button', 'opt', o.v);
    b.onclick = function () {
      if (answered) return; answered = true;
      var right = o.id === q.id;
      b.classList.add(right ? 'right' : 'wrong');
      if (!right) {
        opts.forEach(function (x, n) { if (x.id === q.id) ow.children[n].classList.add('right'); });
        addWrong({ type: 'fill', id: q.id });
        state.stat.w++;
      } else { state.stat.r++; if (onRight) onRight(q.id); }
      bl.textContent = q.v; bl.style.color = right ? 'var(--bamboo)' : 'var(--zhu)';
      ow.querySelectorAll('.opt').forEach(function (x) { x.disabled = true; });
      save(); syncBadge();
      var nx = el('button', 'btn pri', '下一题');
      nx.style.marginTop = '12px';
      nx.onclick = function () { qi++; (nextFn || nextQ)(); };
      box.appendChild(nx);
    };
    ow.appendChild(b);
  });
  box.appendChild(ow);
}

/* 因果排序 */
function renderChain(box, q, onRight) {
  box.appendChild(el('div', 'qlabel', '第' + q.lesson + '课 · ' + q.lt + ' · 因果链'));
  box.appendChild(el('div', 'qtext', q.t + '　—　按先后顺序点击排列'));
  var cand = shuffle(q.s);
  var picked = [];
  var cw = el('div', 'pick'), ansW = el('div', 'pick');
  ansW.style.marginBottom = '10px';

  function draw() {
    cw.innerHTML = ''; ansW.innerHTML = '';
    if (picked.length) {
      var lb = el('div', 'muted', '你的排列：'); lb.style.marginBottom = '6px';
      ansW.appendChild(lb);
    }
    picked.forEach(function (s, n) {
      var p = el('div', 'p sel');
      p.appendChild(el('span', 'n', String(n + 1)));
      p.appendChild(el('span', null, s));
      if (answered) p.classList.add(s === q.s[n] ? 'ok' : 'bad');
      if (!answered) p.onclick = function () { picked.splice(n, 1); draw(); };
      ansW.appendChild(p);
    });
    cand.forEach(function (s, n) {
      var p = el('div', 'p');
      p.appendChild(el('span', 'n', '↓'));
      p.appendChild(el('span', null, s));
      p.onclick = function () {
        if (answered) return;
        picked.push(cand.splice(n, 1)[0]);
        draw();
        if (picked.length === q.s.length) judge();
      };
      cw.appendChild(p);
    });
  }
  function judge() {
    answered = true;
    var allRight = picked.every(function (s, n) { return s === q.s[n]; });
    if (allRight) { state.stat.r++; if (onRight) onRight(q.id); }
    else { state.stat.w++; addWrong({ type: 'chain', id: q.id }); }
    draw();
    var tip = el('div', 'muted', allRight ? '✓ 顺序完全正确' : '✕ 正确顺序见下方');
    tip.style.color = allRight ? 'var(--bamboo)' : 'var(--zhu)';
    box.appendChild(tip);
    if (!allRight) {
      var ol = el('div', 'chain');
      ol.appendChild(el('div', 'ct', '正确顺序'));
      var o = el('ol');
      q.s.forEach(function (s) { o.appendChild(el('li', null, s)); });
      ol.appendChild(o); box.appendChild(ol);
    }
    save(); syncBadge();
    var nx = el('button', 'btn pri', '下一题');
    nx.style.marginTop = '12px';
    nx.onclick = function () { qi++; (nextFn || nextQ)(); };
    box.appendChild(nx);
  }
  box.appendChild(ansW);
  box.appendChild(el('div', 'muted', '候选项（点击排入上方）：')).style.marginTop = '8px';
  box.appendChild(cw);
  draw();
}

/* ---------- 错题本 ---------- */
function addWrong(w) {
  if (state.wrong.some(function (x) { return x.id === w.id && x.type === w.type; })) return;
  state.wrong.push(w); syncBadge();
}
function findQ(w) {
  var pools = [POOL.chains, POOL.cards, POOL.maps, POOL.fills];
  for (var p = 0; p < pools.length; p++)
    for (var i = 0; i < pools[p].length; i++)
      if (pools[p][i].id === w.id) return pools[p][i];
  return null;
}
function kindName(t) {
  return t === 'chain' ? '因果排序' : (t === 'card' ? '闪卡' : (t === 'map' ? '时空地图' : '填空'));
}
function renderWrong() {
  var box = $('#wrongBody'); box.innerHTML = '';
  if (!state.wrong.length) {
    box.innerHTML = '<div class="empty">错题本是空的<br><span class="muted">练习中答错的题会自动收进来，答对后自动移除</span></div>';
    return;
  }
  box.appendChild(el('h2', null, '错题本（' + state.wrong.length + '题）'));
  var bar = el('div', 'row'); bar.style.marginBottom = '12px';
  var go = el('button', 'btn pri', '开始重练');
  go.onclick = function () { drillWrong(); };
  var clr = el('button', 'btn', '清空');
  clr.onclick = function () {
    if (confirm('确定清空错题本？')) { state.wrong = []; save(); syncBadge(); renderWrong(); }
  };
  bar.appendChild(go); bar.appendChild(clr); box.appendChild(bar);

  state.wrong.forEach(function (w) {
    var q = findQ(w); if (!q) return;
    var c = el('div', 'card');
    c.appendChild(el('div', 'qlabel', '第' + q.lesson + '课 · ' + q.lt + ' · ' + kindName(w.type)));
    c.appendChild(el('div', 'muted', w.type === 'chain' ? q.t + '：' + q.s.join(' → ') : q.sec + ' — ' + q.k + '：' + q.v));
    box.appendChild(c);
  });
}
function drillWrong() {
  var items = state.wrong.map(findQ).filter(Boolean);
  if (!items.length) return;
  queue = shuffle(items); qi = 0;
  filter.drill = 'fill';
  goView('drill');
  document.querySelectorAll('#v-drill .chip[data-d]').forEach(function (x) {
    x.classList.toggle('on', x.dataset.d === 'fill');
  });
  nextWrong();
}
function nextWrong() {
  nextFn = nextWrong;
  if (qi >= queue.length) {
    $('#drillBody').innerHTML = '<div class="card"><h2>错题重练完成</h2>' +
      '<p class="muted">剩余错题 ' + state.wrong.length + ' 题</p>' +
      '<div class="row" style="margin-top:14px"><button class="btn pri" id="bk">返回错题本</button></div></div>';
    $('#bk').onclick = function () {
      nextFn = null; goView('wrong');
    };
    return;
  }
  var q = queue[qi];
  var w = state.wrong.filter(function (x) { return x.id === q.id; })[0] || { type: 'fill', id: q.id };
  answered = false;
  var body = $('#drillBody'); body.innerHTML = '';
  var pg = el('div', 'prog');
  pg.appendChild(el('span', null, '错题 ' + (qi + 1) + ' / ' + queue.length));
  pg.appendChild(el('span', null, '第' + q.lesson + '课 · ' + q.lt));
  body.appendChild(pg);
  var card = el('div', 'qbox');
  var onRight = function (id) { markRight(id); };
  if (w.type === 'chain') renderChain(card, q, onRight);
  else renderFill(card, q, onRight);
  body.appendChild(card);
  var bar = el('div', 'row'); bar.style.marginTop = '12px';
  var sk = el('button', 'btn', '跳过');
  sk.onclick = function () { qi++; nextWrong(); };
  bar.appendChild(sk); body.appendChild(bar);
}
function markRight(id) {
  state.wrong = state.wrong.filter(function (x) { return x.id !== id; });
  save(); syncBadge();
}
function goView(v) {
  document.querySelectorAll('nav button').forEach(function (x) { x.classList.toggle('on', x.dataset.v === v); });
  document.querySelectorAll('.view').forEach(function (s) { s.classList.toggle('on', s.id === 'v-' + v); });
  if (v === 'wrong') renderWrong();
}

/* ---------- 启动 ---------- */
buildPool();
load();
renderTime();
renderBook();
renderScope();
syncBadge();
$('#subTitle').textContent = H.meta.book + ' · ' + H.meta.edition;

if (window.CloudSync) {
  CloudSync.init().then(function () {
    if (CloudSync.loggedIn) return CloudSync.pull();
    return null;
  }).then(function (remote) {
    if (remote && (remote.done || remote.wrong || remote.card)) {
      var local = JSON.stringify(state);
      if (local === JSON.stringify({ done: {}, card: {}, wrong: [], stat: { r: 0, w: 0 } })) {
        state.done = remote.done || {}; state.card = remote.card || {};
        state.wrong = remote.wrong || []; state.stat = remote.stat || { r: 0, w: 0 };
        renderBook();
      }
    }
    syncBadge();
  });
}
