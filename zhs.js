/* ============================================================
 * 朝花夕拾岛 · 逻辑
 *   四个模块：十篇 / 人物·考点 / 练习（闪卡·选择题·温情批判）/ 错题本
 *   进度：localStorage 本机保存 + CloudBase 云端同步（单元 u_zhs7a）
 * ============================================================ */
var STORE_SUFFIX = 'zhs7a';
var KEY = 'zhs_island_v1';
var Z = window.ZHS;

var state = { done: {}, card: {}, wrong: [], stat: { r: 0, w: 0 } };
var POOL = { cards: [], quiz: [], sense: [] };
var filter = { drill: 'card', kao: 'p', openPian: 0 };
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
  var cards = [];
  Z.facts.forEach(function (f, i) {
    cards.push({ id: 'c-f' + i, kind: 'fact', label: '文学常识', front: f.k, back: f.v });
  });
  Z.people.forEach(function (p, i) {
    cards.push({
      id: 'c-p' + i, kind: 'person', label: '人物',
      front: p.n + '是一位怎样的人？',
      back: '身份：' + p.id + '\n品质：' + p.qu.join('、') + '\n情节：' + p.eps[0] + '等\n鲁迅的情感：' + p.senti,
      raw: p
    });
  });
  Z.pian.forEach(function (p, i) {
    cards.push({
      id: 'c-z' + i, kind: 'pian', label: '十篇',
      front: '《' + p.t + '》· 主旨与考点',
      back: '主旨：' + p.zhu + '\n辨识关键词：' + p.keys.join('、') + '\n' + p.star
    });
  });
  Z.quiz.forEach(function (q, i) { q.id = 'q-' + i; });
  Z.sense.forEach(function (s, i) { s.id = 's-' + i; });
  POOL = { cards: cards, quiz: Z.quiz, sense: Z.sense };
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
function goView(v) {
  document.querySelectorAll('nav button').forEach(function (x) { x.classList.toggle('on', x.dataset.v === v); });
  document.querySelectorAll('.view').forEach(function (s) { s.classList.toggle('on', s.id === 'v-' + v); });
  if (v === 'wrong') renderWrong();
}

/* ---------- 十篇 ---------- */
function zhuTag(z) {
  var cls = z.indexOf('温情') > -1 && z.indexOf('批判') > -1 ? 'sx'
    : (z.indexOf('温情') > -1 ? 'wq' : 'pp');
  return el('span', 'tagzhu ' + cls, z);
}
function renderPian() {
  var box = $('#pianList'); box.innerHTML = '';
  Z.pian.forEach(function (p, i) {
    var d = el('div', 'unit' + (filter.openPian === i ? ' open' : ''));
    var hd = el('div', 'uhead2');
    hd.appendChild(el('div', 't', (i + 1) + '. ' + p.t));
    hd.appendChild(zhuTag(p.zhu));
    var tw = el('div', 'r');
    tw.textContent = (state.done[i] ? '✓ ' : '') + p.scene;
    hd.appendChild(tw);
    hd.onclick = function () {
      filter.openPian = filter.openPian === i ? -1 : i;
      renderPian();
    };
    var body = el('div', 'ulist');

    var kw = el('div', 'keywrap');
    kw.appendChild(el('span', 'muted', '辨识关键词：'));
    p.keys.forEach(function (k) { kw.appendChild(el('span', 'key', k)); });
    body.appendChild(kw);

    [['主要内容', p.sum], ['核心人物', p.char]].forEach(function (kv) {
      var r = el('div', 'kv');
      r.appendChild(el('div', 'k', kv[0]));
      r.appendChild(el('div', 'v', kv[1]));
      body.appendChild(r);
    });

    if (p.eps.length) {
      body.appendChild(el('div', 'kv')).innerHTML = '';
      var r2 = el('div', 'kv');
      r2.appendChild(el('div', 'k', '常考情节'));
      var ul = el('ul', 'epsl');
      p.eps.forEach(function (e) { ul.appendChild(el('li', null, e)); });
      var vv = el('div', 'v'); vv.appendChild(ul);
      r2.appendChild(vv);
      body.appendChild(r2);
    }
    body.appendChild(el('div', 'star', p.star));

    var bar = el('div', 'row'); bar.style.marginTop = '12px';
    var dn = el('button', 'btn' + (state.done[i] ? '' : ' green'), state.done[i] ? '✓ 已读' : '标记已读');
    dn.onclick = function (e) {
      e.stopPropagation();
      if (state.done[i]) delete state.done[i]; else state.done[i] = 1;
      save(); renderPian();
    };
    bar.appendChild(dn);
    body.appendChild(bar);

    d.appendChild(hd); d.appendChild(body);
    box.appendChild(d);
  });
}

/* ---------- 人物·考点 ---------- */
document.querySelectorAll('#v-kao .chip[data-k]').forEach(function (b) {
  b.onclick = function () {
    document.querySelectorAll('#v-kao .chip[data-k]').forEach(function (x) { x.classList.remove('on'); });
    b.classList.add('on'); filter.kao = b.dataset.k; renderKao();
  };
});
function renderKao() {
  var box = $('#kaoBody'); box.innerHTML = '';
  if (filter.kao === 'p') {
    Z.people.forEach(function (p) {
      var c = el('div', 'pcard');
      var hd = el('div', 'hd');
      hd.appendChild(el('span', 'nm', p.n));
      hd.appendChild(el('span', 'fm', p.id));
      hd.appendChild(el('span', 'fm', '《' + p.from + '》'));
      c.appendChild(hd);
      var qu = el('div', 'qu');
      p.qu.forEach(function (q) {
        qu.appendChild(el('span', p.good === false ? 'bad' : '', q));
      });
      c.appendChild(qu);
      var ul = el('ul', 'epsl');
      p.eps.forEach(function (e) { ul.appendChild(el('li', null, e)); });
      c.appendChild(ul);
      c.appendChild(el('div', 'senti', '鲁迅的情感：' + p.senti));
      box.appendChild(c);
    });
  } else if (filter.kao === 'c') {
    var t = el('table');
    var th = el('tr');
    ['考点', '要点'].forEach(function (h) { th.appendChild(el('th', null, h)); });
    t.appendChild(el('thead')).appendChild(th);
    var tb = el('tbody');
    Z.facts.forEach(function (f) {
      var tr = el('tr');
      tr.appendChild(el('td', null, f.k));
      tr.appendChild(el('td', null, f.v));
      tb.appendChild(tr);
    });
    t.appendChild(tb);
    var card = el('div', 'card');
    card.appendChild(t);
    box.appendChild(card);
  } else {
    Z.tmpl.forEach(function (m) {
      var c = el('div', 'pcard tmpl');
      c.appendChild(el('div', 'nm', m.t));
      c.appendChild(el('div', 'f', m.f));
      c.appendChild(el('div', 'eg', '示例：' + m.eg));
      box.appendChild(c);
    });
  }
}

/* ---------- 练习 ---------- */
document.querySelectorAll('#v-drill .chip[data-d]').forEach(function (b) {
  b.onclick = function () {
    document.querySelectorAll('#v-drill .chip[data-d]').forEach(function (x) { x.classList.remove('on'); });
    b.classList.add('on'); filter.drill = b.dataset.d; newRound();
  };
});
function newRound() {
  var pool = filter.drill === 'quiz' ? POOL.quiz
    : (filter.drill === 'sense' ? POOL.sense : POOL.cards);
  queue = shuffle(pool);
  qi = 0; answered = false;
  if (!queue.length) { $('#drillBody').innerHTML = '<div class="empty">这个范围暂时没有题目</div>'; return; }
  nextQ();
}
function nextQ() {
  nextFn = nextQ;
  if (qi >= queue.length) {
    $('#drillBody').innerHTML =
      '<div class="card"><h2>这一轮完成了</h2><p class="muted">共 ' + queue.length + ' 题。' +
      '正确 ' + state.stat.r + ' 题，错误 ' + state.stat.w + ' 题。答错的已收进错题本。</p>' +
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
  if (filter.drill === 'quiz') renderQuiz(card, q, null);
  if (filter.drill === 'sense') renderSense(card, q, null);
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
  box.appendChild(el('div', 'qlabel', q.label + ' · 闪卡'));
  box.appendChild(el('div', 'qtext', q.front));
  var a = el('div', 'ans');
  q.back.split('\n').forEach(function (line) {
    a.appendChild(el('div', null, line));
  });
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
  save(); syncBadge(); qi++; nextQ();
}

/* 选择题 */
function catName(c) {
  return c === 'pian' ? '篇目辨识' : c === 'pp' ? '人物情节' : c === 'cs' ? '文学常识' : '主旨写法';
}
function renderQuiz(box, q, onRight) {
  box.appendChild(el('div', 'qlabel', catName(q.cat) + ' · 选择题'));
  box.appendChild(el('div', 'qtext', q.q));
  var ow = el('div', 'opts');
  q.opts.forEach(function (o, n) {
    var b = el('button', 'opt', o);
    b.onclick = function () {
      if (answered) return; answered = true;
      var right = n === q.a;
      b.classList.add(right ? 'right' : 'wrong');
      if (!right) {
        ow.children[q.a].classList.add('right');
        addWrong({ type: 'quiz', id: q.id });
        state.stat.w++;
      } else { state.stat.r++; if (onRight) onRight(q.id); }
      var ex = el('div', 'ans on' + (right ? '' : ' w'), (right ? '✓ ' : '✕ ') + q.ex);
      box.appendChild(ex);
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

/* 温情·批判 */
function renderSense(box, q, onRight) {
  box.appendChild(el('div', 'qlabel', '温情回忆 · 理性批判（二选一）'));
  box.appendChild(el('div', 'qtext', q.t));
  var w = el('div', 'sense2');
  var bw = el('button', null, '🌸 温情回忆');
  var bp = el('button', null, '🗡️ 理性批判');
  w.appendChild(bw); w.appendChild(bp);
  box.appendChild(w);
  function pick(n, btn) {
    if (answered) return; answered = true;
    var right = n === q.a;
    if (right) { btn.classList.add(q.a === 0 ? 'wq' : 'pp'); state.stat.r++; if (onRight) onRight(q.id); }
    else {
      btn.classList.add(q.a === 0 ? 'pp' : 'wq');
      var other = n === 0 ? bp : bw;
      other.classList.add(q.a === 0 ? 'wq' : 'pp');
      addWrong({ type: 'sense', id: q.id });
      state.stat.w++;
    }
    [bw, bp].forEach(function (x) { x.disabled = true; });
    var ex = el('div', 'ans on' + (right ? '' : ' w'), (right ? '✓ ' : '✕ ') + q.ex);
    box.appendChild(ex);
    save(); syncBadge();
    var nx = el('button', 'btn pri', '下一题');
    nx.style.marginTop = '12px';
    nx.onclick = function () { qi++; (nextFn || nextQ)(); };
    box.appendChild(nx);
  }
  bw.onclick = function () { pick(0, bw); };
  bp.onclick = function () { pick(1, bp); };
}

/* ---------- 错题本 ---------- */
function addWrong(w) {
  if (state.wrong.some(function (x) { return x.id === w.id && x.type === w.type; })) return;
  state.wrong.push(w); syncBadge();
}
function findQ(w) {
  if (w.type === 'quiz') return POOL.quiz.filter(function (q) { return q.id === w.id; })[0] || null;
  if (w.type === 'sense') return POOL.sense.filter(function (q) { return q.id === w.id; })[0] || null;
  return POOL.cards.filter(function (q) { return q.id === w.id; })[0] || null;
}
function typeName(t) {
  return t === 'quiz' ? '选择题' : t === 'sense' ? '温情·批判' : '闪卡';
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
    c.appendChild(el('div', 'qlabel', typeName(w.type)));
    if (w.type === 'quiz') {
      c.appendChild(el('div', 'muted', q.q));
      c.appendChild(el('div', 'muted', '✓ ' + q.opts[q.a] + '　—　' + q.ex));
    } else if (w.type === 'sense') {
      c.appendChild(el('div', 'muted', q.t));
      c.appendChild(el('div', 'muted', '✓ ' + (q.a === 0 ? '温情回忆' : '理性批判') + '　—　' + q.ex));
    } else {
      c.appendChild(el('div', 'muted', q.front));
      c.appendChild(el('div', 'muted', q.back));
    }
    box.appendChild(c);
  });
}
function drillWrong() {
  var items = state.wrong.map(findQ).filter(Boolean);
  if (!items.length) return;
  queue = shuffle(items); qi = 0;
  goView('drill');
  document.querySelectorAll('#v-drill .chip[data-d]').forEach(function (x) { x.classList.remove('on'); });
  nextWrong();
}
function nextWrong() {
  nextFn = nextWrong;
  if (qi >= queue.length) {
    $('#drillBody').innerHTML = '<div class="card"><h2>错题重练完成</h2>' +
      '<p class="muted">剩余错题 ' + state.wrong.length + ' 题</p>' +
      '<div class="row" style="margin-top:14px"><button class="btn pri" id="bk">返回错题本</button></div></div>';
    $('#bk').onclick = function () { nextFn = null; goView('wrong'); };
    return;
  }
  var q = queue[qi];
  var w = state.wrong.filter(function (x) { return x.id === q.id; })[0] || { type: 'quiz', id: q.id };
  answered = false;
  var body = $('#drillBody'); body.innerHTML = '';
  var pg = el('div', 'prog');
  pg.appendChild(el('span', null, '错题 ' + (qi + 1) + ' / ' + queue.length));
  pg.appendChild(el('span', null, typeName(w.type)));
  body.appendChild(pg);
  var card = el('div', 'qbox');
  var onRight = function (id) { markRight(id); };
  if (w.type === 'quiz') renderQuiz(card, q, onRight);
  else if (w.type === 'sense') renderSense(card, q, onRight);
  else renderCardWrong(card, q, onRight);
  body.appendChild(card);
  var bar = el('div', 'row'); bar.style.marginTop = '12px';
  var sk = el('button', 'btn', '跳过');
  sk.onclick = function () { qi++; nextWrong(); };
  bar.appendChild(sk); body.appendChild(bar);
}
/* 错题重练 · 闪卡自评 */
function renderCardWrong(box, q, onRight) {
  box.appendChild(el('div', 'qlabel', q.label + ' · 闪卡重练'));
  box.appendChild(el('div', 'qtext', q.front));
  var a = el('div', 'ans');
  q.back.split('\n').forEach(function (line) { a.appendChild(el('div', null, line)); });
  box.appendChild(a);
  var show = el('button', 'btn pri', '显示答案');
  show.style.marginTop = '14px';
  show.onclick = function () {
    a.classList.add('on'); show.style.display = 'none';
    var bar = el('div', 'row'); bar.style.marginTop = '12px';
    var b1 = el('button', 'btn green', '✓ 我答对了');
    var b2 = el('button', 'btn', '还是不会');
    b1.onclick = function () { onRight(q.id); state.stat.r++; save(); qi++; nextWrong(); };
    b2.onclick = function () { state.stat.w++; save(); qi++; nextWrong(); };
    bar.appendChild(b1); bar.appendChild(b2);
    box.appendChild(bar);
  };
  box.appendChild(show);
}
function markRight(id) {
  state.wrong = state.wrong.filter(function (x) { return x.id !== id; });
  save(); syncBadge();
}

/* ---------- 启动 ---------- */
buildPool();
load();
renderPian();
renderKao();
syncBadge();
$('#subTitle').textContent = Z.meta.book + ' · ' + Z.meta.edition;
$('#srcNote').textContent = Z.src;

if (window.CloudSync) {
  CloudSync.init().then(function () {
    if (CloudSync.loggedIn) return CloudSync.pull();
    return null;
  }).then(function (remote) {
    if (remote && (remote.done || remote.wrong || remote.card)) {
      var empty = JSON.stringify(state) === JSON.stringify({ done: {}, card: {}, wrong: [], stat: { r: 0, w: 0 } });
      if (empty) {
        state.done = remote.done || {}; state.card = remote.card || {};
        state.wrong = remote.wrong || []; state.stat = remote.stat || { r: 0, w: 0 };
        renderPian(); renderKao();
      }
    }
    syncBadge();
  });
}
