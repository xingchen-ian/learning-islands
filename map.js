/* ============================================================
 * 历史岛 · 时空地图
 *   时间模式：分段滑块驱动，地图上按时间累积点亮事件
 *   场景模式：史前遗址 / 秦灭六国 / 丝绸之路 / 都城迁移
 *   依赖 history.js 的 $ el fmtYear openLesson addWrong save syncBadge POOL
 * ============================================================ */
var M = window.MAP;
var MS = {
  on: false, scene: null, seg: 0, idx: 0,
  scale: 1, pan: { x: 0, y: 0 }, sel: null,
  playing: false, timer: null, group: null
};

var SEGS = [
  { n: '史前', y0: -1700000, y1: -2071, d: '距今170万年—前2071年' },
  { n: '夏商周', y0: -2070, y1: -222, d: '前2070—前222年' },
  { n: '秦汉', y0: -221, y1: 219, d: '前221—公元219年' },
  { n: '三国两晋南北朝', y0: 220, y1: 589, d: '220—589年' }
];

var EV = [];        /* 全部事件，按年份升序 */
var BYSEG = [[], [], [], []];

function proj(lon, lat) {
  return { x: (lon - M.view.lon0) * M.view.sx, y: (M.view.lat0 - lat) * M.view.sy };
}
function placeOf(id) {
  for (var i = 0; i < M.places.length; i++) if (M.places[i].id === id) return M.places[i];
  return null;
}
function evKey(e) { return 'map_' + e.p + '_' + e.y; }

function buildEV() {
  EV = M.events.map(function (e) {
    var p = placeOf(e.p) || { n: '?', now: '', lon: 0, lat: 0 };
    var xy = proj(p.lon, p.lat);
    return { e: e, p: p, x: xy.x, y: xy.y, id: evKey(e) };
  }).sort(function (a, b) { return a.e.y - b.e.y; });
  BYSEG = [[], [], [], []];
  EV.forEach(function (v) {
    var y = v.e.y;
    var s = y < SEGS[0].y1 + 1 ? 0 : (y <= SEGS[1].y1 ? 1 : (y <= SEGS[2].y1 ? 2 : 3));
    v.seg = s; BYSEG[s].push(v);
  });
  BYSEG.forEach(function (a) { a.forEach(function (v, i) { v.i = i; }); });
}

/* ---------- 地图 SVG ---------- */
var NS = 'http://www.w3.org/2000/svg';
function sv(t, at) {
  var n = document.createElementNS(NS, t);
  for (var k in at) if (at[k] != null) n.setAttribute(k, at[k]);
  return n;
}

function drawBase(g, year) {
  var G = M.geo;
  /* 海：海岸线以东填充 */
  var sea = sv('path', {
    d: G.coast + ' L600,0 L600,366 L0,366 L0,0 Z',
    fill: 'rgba(133,183,235,.13)', stroke: 'none'
  });
  g.appendChild(sea);
  g.appendChild(sv('path', { d: G.coast, fill: 'none', stroke: '#9CC3E0', 'stroke-width': 1 }));

  [['chang', '#4A88B8'], ['huang', '#C9A227']].forEach(function (r) {
    g.appendChild(sv('path', {
      d: G[r[0]], fill: 'none', stroke: r[1], 'stroke-width': 2,
      'stroke-linecap': 'round', 'stroke-linejoin': 'round', opacity: .85
    }));
  });
  [['qinling', '秦岭'], ['taihang', '太行山'], ['yinshan', '阴山']].forEach(function (m) {
    g.appendChild(sv('path', {
      d: G[m[0]], fill: 'none', stroke: '#B9AE99', 'stroke-width': 3,
      'stroke-linecap': 'round', 'stroke-dasharray': '1 5', opacity: .9
    }));
  });
  /* 秦长城：公元前214年后才出现 */
  if (year >= -214) {
    g.appendChild(sv('path', {
      d: G.wall, fill: 'none', stroke: '#8A6A4F', 'stroke-width': 2.2,
      'stroke-linecap': 'round', 'stroke-linejoin': 'round', opacity: .8
    }));
  }
  /* 静态标注 */
  [['黄河', 300, 118, '#8A6E14'], ['长江', 430, 208, '#2F6384']].forEach(function (t) {
    var x = sv('text', { x: t[1], y: t[2], fill: t[3], 'font-size': 12, 'font-weight': 500 });
    x.textContent = t[0]; g.appendChild(x);
  });
  M.sea.forEach(function (s) {
    var xy = proj(s.lon, s.lat);
    var t = sv('text', {
      x: xy.x, y: xy.y, fill: '#7E94A8', 'font-size': 11, 'text-anchor': 'middle'
    });
    t.textContent = s.n; g.appendChild(t);
  });
}

/* 把当前段的事件点做聚类，避免中原密集区重叠 */
function cluster(list) {
  var groups = [];
  list.forEach(function (v) {
    var hit = null;
    for (var i = 0; i < groups.length; i++) {
      var c = groups[i];
      if (Math.abs(c.x - v.x) < 18 && Math.abs(c.y - v.y) < 14) { hit = c; break; }
    }
    if (hit) { hit.list.push(v); hit.ty += (hit.y - hit.ty) / 2; }
    else groups.push({ x: v.x, y: v.y, list: [v] });
  });
  return groups;
}

function dot(g, x, y, r, fill, stroke, w) {
  return sv('circle', { cx: x, cy: y, r: r, fill: fill, stroke: stroke, 'stroke-width': w || 0 });
}

function drawEvents(g, cur) {
  var passed = EV.filter(function (v) { return v.e.y < cur.e.y || (v.e.y === cur.e.y && v !== cur); });
  var grps = cluster(passed);
  grps.forEach(function (c) {
    var n = c.list.length;
    var wrap = sv('g', { class: 'mdot', style: 'cursor:pointer' });
    if (n > 1) {
      wrap.appendChild(dot(c.x, c.y, 8 + Math.min(n, 4), 'rgba(168,69,43,.13)', 'none'));
      wrap.appendChild(dot(c.x, c.y, 4, '#B08A7E', 'none'));
      var tb = sv('text', {
        x: c.x + 10, y: c.y + 4, fill: '#9C8B7E', 'font-size': 11
      });
      tb.textContent = n + '处'; wrap.appendChild(tb);
    } else {
      wrap.appendChild(dot(c.x, c.y, 4.5, '#C0A99C', 'none'));
    }
    wrap.appendChild(sv('circle', { cx: c.x, cy: c.y, r: 17, fill: 'transparent' }));
    wrap.onclick = function () { if (n > 1) showGroup(c); else showCard(c.list[0]); };
    g.appendChild(wrap);
  });

  /* 当前事件：高亮 + 脉冲 */
  var curG = sv('g', {});
  curG.appendChild(sv('circle', {
    cx: cur.x, cy: cur.y, r: 9, fill: 'rgba(168,69,43,.28)', class: 'pulse'
  }));
  curG.appendChild(dot(cur.x, cur.y, 5.5, '#A8452B', '#FFF', 1.6));
  var right = cur.x < 470;
  var lb = sv('text', {
    x: cur.x + (right ? 13 : -13), y: cur.y - 6,
    'text-anchor': right ? 'start' : 'end',
    fill: '#7E2113', 'font-size': 13, 'font-weight': 500
  });
  lb.textContent = cur.e.t; curG.appendChild(lb);
  var lb2 = sv('text', {
    x: cur.x + (right ? 13 : -13), y: cur.y + 9,
    'text-anchor': right ? 'start' : 'end',
    fill: '#A8452B', 'font-size': 11
  });
  lb2.textContent = fmtYear(cur.e.y, cur.e.bp) + ' · 第' + cur.e.l + '课'; curG.appendChild(lb2);
  g.appendChild(curG);
}

/* 丝绸之路：前138年张骞凿空后通河西走廊；前60年西域都护设置后延伸至乌垒 */
var SILK = ['ca', 'ww', 'zy', 'jq', 'dh', 'ymg', 'wl'];
var SILK_STAGE = { ca: -138, ww: -138, zy: -138, jq: -138, dh: -138, ymg: -60, wl: -60 };

function drawRoute(g, year) {
  var pts = [];
  SILK.forEach(function (id) {
    var p = placeOf(id); if (!p) return;
    if (year < SILK_STAGE[id]) return;
    var xy = proj(p.lon, p.lat);
    pts.push(xy);
  });
  if (pts.length < 2) return;
  var d = 'M' + pts.map(function (q) { return q.x.toFixed(1) + ',' + q.y.toFixed(1); }).join(' L');
  g.appendChild(sv('path', {
    d: d, fill: 'none', stroke: '#A8452B', 'stroke-width': 2,
    'stroke-dasharray': '5 4', opacity: .7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
  }));
  /* 未开通的西段：虚线示意 */
  if (year >= -138 && year < -60) {
    var tail = ['ymg', 'wl'].map(function (id) {
      var p = placeOf(id), xy = proj(p.lon, p.lat); return xy;
    });
    var d2 = 'M' + pts[pts.length - 1].x.toFixed(1) + ',' + pts[pts.length - 1].y.toFixed(1) +
      ' L' + tail.map(function (q) { return q.x.toFixed(1) + ',' + q.y.toFixed(1); }).join(' L');
    g.appendChild(sv('path', {
      d: d2, fill: 'none', stroke: '#C4A08E', 'stroke-width': 1.5,
      'stroke-dasharray': '3 5', opacity: .55
    }));
  }
}

/* ---------- 时间条 ---------- */
function renderBar() {
  var box = $('#mapBar'); if (!box) return;
  box.innerHTML = '';

  var seg = SEGS[MS.seg], list = BYSEG[MS.seg];
  var cur = list[Math.min(MS.idx, list.length - 1)];

  /* 时段切换 */
  var row = el('div', 'row');
  SEGS.forEach(function (s, i) {
    var c = el('button', 'chip' + (i === MS.seg ? ' on' : ''), s.n);
    c.onclick = function () { MS.seg = i; MS.idx = 0; stopPlay(); renderMap(); };
    row.appendChild(c);
  });
  box.appendChild(row);

  /* 播放 + 年份 */
  var hd = el('div', 'mhead');
  var pb = el('button', 'mplay' + (MS.playing ? ' on' : ''));
  pb.innerHTML = MS.playing ? '<svg width="10" height="12" viewBox="0 0 10 12"><rect x="0" y="0" width="3" height="12" fill="currentColor"/><rect x="7" y="0" width="3" height="12" fill="currentColor"/></svg>'
    : '<svg width="10" height="12" viewBox="0 0 10 12"><path d="M0 0 L10 6 L0 12 Z" fill="currentColor"/></svg>';
  pb.onclick = function () { MS.playing ? stopPlay() : startPlay(); };
  hd.appendChild(pb);
  hd.appendChild(el('span', 'myear', cur ? fmtYear(cur.e.y, cur.e.bp) : seg.d));
  hd.appendChild(el('span', 'mseg', seg.d));
  box.appendChild(hd);

  /* 滑块：段内按事件索引推进 */
  var sl = el('input');
  sl.type = 'range'; sl.min = 0; sl.max = Math.max(list.length - 1, 1);
  sl.value = Math.min(MS.idx, list.length - 1);
  sl.className = 'mslider';
  sl.oninput = function () { stopPlay(); MS.idx = +sl.value; renderMap(); };
  box.appendChild(sl);

  var cnt = el('div', 'mcount');
  cnt.appendChild(el('span', null, '第 ' + (MS.idx + 1) + ' / ' + list.length + ' 个事件'));
  cnt.appendChild(el('span', null, '已点亮 ' + countPassed(cur) + ' 处'));
  box.appendChild(cnt);

  return cur;
}

function countPassed(cur) {
  if (!cur) return 0;
  return EV.filter(function (v) { return v.e.y <= cur.e.y; }).length;
}

function startPlay() {
  MS.playing = true;
  MS.timer = setInterval(function () {
    var list = BYSEG[MS.seg];
    if (MS.idx < list.length - 1) MS.idx++;
    else if (MS.seg < 3) { MS.seg++; MS.idx = 0; }
    else { stopPlay(); return; }
    renderMap();
  }, 1400);
  renderBar();
}
function stopPlay() {
  MS.playing = false;
  if (MS.timer) { clearInterval(MS.timer); MS.timer = null; }
}

/* ---------- 知识卡片 ---------- */
function cardHTML(v, plain) {
  var d = el('div', plain ? '' : 'mcard');
  var h = el('div', 'mcard-h');
  h.appendChild(el('span', 'mcard-t', v.e.t));
  h.appendChild(el('span', 'mtag', v.e.tag));
  d.appendChild(h);
  var sub = el('div', 'mcard-s');
  sub.appendChild(el('span', null, fmtYear(v.e.y, v.e.bp)));
  sub.appendChild(el('span', null, v.p.n + '（今' + v.p.now + '）'));
  sub.appendChild(el('span', null, '第' + v.e.l + '课'));
  d.appendChild(sub);
  var ul = el('div', 'mcard-b');
  (v.e.d || []).forEach(function (kv) {
    var r = el('div', 'mit');
    r.appendChild(el('span', 'k', kv[0]));
    r.appendChild(el('span', 'v', kv[1]));
    ul.appendChild(r);
  });
  d.appendChild(ul);
  return d;
}

function showCard(v) {
  MS.sel = v; MS.group = null;
  var box = $('#mapCard'); box.innerHTML = '';
  box.appendChild(cardHTML(v));
  var bar = el('div', 'row'); bar.style.marginTop = '10px';
  var b1 = el('button', 'btn', '标为已学');
  b1.onclick = function () {
    state.done[v.e.l] = 1; save(); b1.textContent = '✓ 已学';
  };
  if (state.done[v.e.l]) b1.textContent = '✓ 已学';
  var b2 = el('button', 'btn', '加入错题本');
  b2.onclick = function () {
    addWrong({ type: 'map', id: v.id });
    b2.textContent = '✓ 已加入';
  };
  var b3 = el('button', 'btn pri', '看第' + v.e.l + '课全文');
  b3.onclick = function () { openLesson(v.e.l); };
  bar.appendChild(b1); bar.appendChild(b2); bar.appendChild(b3);
  box.appendChild(bar);
}

function showGroup(c) {
  MS.group = c;
  var box = $('#mapCard'); box.innerHTML = '';
  var h = el('div', 'mcard-h');
  h.appendChild(el('span', 'mcard-t', '这一带有 ' + c.list.length + ' 个事件'));
  h.appendChild(el('span', 'mtag', '点选一个'));
  box.appendChild(h);
  c.list.forEach(function (v) {
    var r = el('div', 'mgitem');
    r.appendChild(el('span', 'mgi-y', fmtYear(v.e.y, v.e.bp)));
    r.appendChild(el('span', 'mgi-t', v.e.t));
    r.onclick = function () { showCard(v); };
    box.appendChild(r);
  });
}

/* ---------- 场景 ---------- */
function renderSceneBody(sc) {
  var box = $('#mapCard'); box.innerHTML = '';
  var h = el('div', 'mcard-h');
  h.appendChild(el('span', 'mcard-t', sc.n));
  box.appendChild(h);
  box.appendChild(el('div', 'mcard-s', sc.desc));
  var ins = el('div', 'minsight');
  ins.appendChild(el('span', 'mlabel', '看懂这张图'));
  ins.appendChild(el('div', null, sc.insight));
  box.appendChild(ins);

  var shown = [];
  (sc.pts || sc.ids.map(function (i) { return [i, null]; })).forEach(function (t) {
    var p = placeOf(t[0]); if (!p) return;
    var v = null;
    if (t[1] != null) {
      for (var i = 0; i < EV.length; i++) {
        if (EV[i].p.id === t[0] && EV[i].e.y === t[1]) { v = EV[i]; break; }
      }
    }
    shown.push({ p: p, v: v });
  });
  box.appendChild(sceneListItems(sc, shown));

  if (sc.id === 'silk') {
    var r = M.routes[0];
    var d2 = el('div', 'sec');
    d2.appendChild(el('div', 'sec-h', r.d[0][0]));
    (r.d || []).forEach(function (kv) {
      var row = el('div', 'it');
      row.appendChild(el('div', 'k', kv[0]));
      row.appendChild(el('div', 'v', kv[1]));
      d2.appendChild(row);
    });
    box.appendChild(d2);
  }
  var bar = el('div', 'row'); bar.style.marginTop = '10px';
  var bb = el('button', 'btn pri', '回到时间模式');
  bb.onclick = function () { MS.scene = null; renderMap(); };
  bar.appendChild(bb);
  box.appendChild(bar);
}

function drawScene(g, sc) {
  var shown = [];
  (sc.pts || sc.ids.map(function (i) { return [i, null]; })).forEach(function (t) {
    var p = placeOf(t[0]); if (!p) return;
    var xy = proj(p.lon, p.lat);
    var v = null;
    if (t[1] != null) {
      for (var i = 0; i < EV.length; i++) {
        if (EV[i].p.id === t[0] && EV[i].e.y === t[1]) { v = EV[i]; break; }
      }
    }
    shown.push({ p: p, x: xy.x, y: xy.y, v: v });
  });

  if ((sc.id === 'silk' || sc.id === 'capitals') && shown.length > 1) {
    var d = 'M' + shown.map(function (s) {
      return s.x.toFixed(1) + ',' + s.y.toFixed(1);
    }).join(' L');
    g.appendChild(sv('path', {
      d: d, fill: 'none', stroke: '#A8452B', 'stroke-width': 2,
      'stroke-dasharray': '6 5', opacity: .7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
    }));
  }

  var num = sc.id === 'qin' || sc.id === 'capitals';
  var seen = {};
  shown.forEach(function (s, i) {
    if (seen[s.p.id]) s.y -= 16; else seen[s.p.id] = true;
    var wrap = sv('g', { class: 'mdot pop', style: 'cursor:pointer' });
    wrap.style.animationDelay = (i * 70) + 'ms';
    wrap.appendChild(dot(s.x, s.y, s.v ? 6 : 4.2,
      s.v ? '#A8452B' : '#BBA392', '#FFF', 1.5));
    if (num) {
      var nb = sv('text', {
        x: s.x, y: s.y - 11, 'text-anchor': 'middle',
        fill: s.v ? '#7E2113' : '#9C8B7E', 'font-size': 11, 'font-weight': 500
      });
      nb.textContent = String(i + 1);
      wrap.appendChild(nb);
    }
    wrap.appendChild(sv('circle', { cx: s.x, cy: s.y, r: 16, fill: 'transparent' }));
    wrap.onclick = function () { s.v ? showCard(s.v) : showPlace(s.p); };
    g.appendChild(wrap);
  });
}

function sceneListItems(sc, shown) {
  var ul = el('div', 'scenelist');
  shown.forEach(function (s, i) {
    var r = el('div', 'sitem');
    r.appendChild(el('span', 'snum', String(i + 1)));
    r.appendChild(el('span', 'sname', s.p.n));
    if (s.v) r.appendChild(el('span', 'syear', fmtYear(s.v.e.y, s.v.e.bp)));
    r.onclick = function () { s.v ? showCard(s.v) : showPlace(s.p); };
    ul.appendChild(r);
  });
  return ul;
}

function showPlace(p) {
  var box = $('#mapCard'); box.innerHTML = '';
  var h = el('div', 'mcard-h');
  h.appendChild(el('span', 'mcard-t', p.n));
  h.appendChild(el('span', 'mtag', '丝路节点'));
  box.appendChild(h);
  box.appendChild(el('div', 'mcard-s', '今' + p.now + '　·　路线上的重要节点，教材未单列知识点'));
}

/* ---------- 主渲染 ---------- */
function renderMap() {
  var svg = $('#mapSvg'); if (!svg) return;
  var vb = svg.getAttribute('viewBox');
  svg.innerHTML = '';
  svg.setAttribute('viewBox', vb);

  var g = sv('g', {});
  svg.appendChild(g);

  var sc = MS.scene ? M.scenes.filter(function (s) { return s.id === MS.scene; })[0] : null;
  var cur = null;

  if (sc) {
    drawBase(g, 99999);
    drawScene(g, sc);
    if (sc.zoom) setZoom(sc.zoom); else { MS.scale = 1; MS.pan = { x: 0, y: 0 }; applyView(); }
    $('#mapBar').style.display = 'none';
    renderSceneBody(sc);
  } else {
    $('#mapBar').style.display = '';
    var list = BYSEG[MS.seg];
    MS.idx = Math.max(0, Math.min(MS.idx, list.length - 1));
    cur = list[MS.idx];
    drawBase(g, cur ? cur.e.y : -9999);
    if (cur) { drawRoute(g, cur.e.y); drawEvents(g, cur); }
    renderBar();
    if (cur) showCard(cur);
  }
  applyView();
}

function setZoom(z) {
  MS.scale = z.s;
  MS.pan.x = z.x - M.view.w / z.s / 2;
  MS.pan.y = z.y - M.view.h / z.s / 2;
  applyView();
}
function applyView() {
  var svg = $('#mapSvg');
  var v = M.view, s = MS.scale;
  var w = v.w / s, h = v.h / s;
  var mx = v.w - w, my = v.h - h;
  MS.pan.x = Math.max(0, Math.min(mx, MS.pan.x));
  MS.pan.y = Math.max(0, Math.min(my, MS.pan.y));
  svg.setAttribute('viewBox', MS.pan.x + ' ' + MS.pan.y + ' ' + w + ' ' + h);
  var z = $('#mZoom'); if (z) z.textContent = s.toFixed(1) + '×';
}

function zoomAt(delta, cx, cy) {
  var v = M.view, old = MS.scale;
  var ns = Math.max(1, Math.min(4, old * (delta > 0 ? 1.35 : 1 / 1.35)));
  if (ns === old) return;
  if (cx == null) { cx = v.w / 2; cy = v.h / 2; }
  else {
    var w0 = v.w / old, h0 = v.h / old;
    cx = MS.pan.x + cx / v.w * w0; cy = MS.pan.y + cy / v.h * h0;
  }
  MS.scale = ns;
  var w1 = v.w / ns, h1 = v.h / ns;
  MS.pan.x = cx - w1 / 2; MS.pan.y = cy - h1 / 2;
  applyView();
}

/* ---------- 场景入口 ---------- */
function renderSceneBar() {
  var box = $('#mapScenes'); if (!box) return;
  box.innerHTML = '';
  M.scenes.forEach(function (s) {
    var b = el('button', 'sbtn' + (MS.scene === s.id ? ' on' : ''));
    b.appendChild(el('span', 'sbtn-n', s.n));
    b.appendChild(el('span', 'sbtn-d', s.desc));
    b.onclick = function () {
      MS.scene = (MS.scene === s.id) ? null : s.id;
      MS.scale = 1; MS.pan = { x: 0, y: 0 };
      stopPlay(); renderMap(); renderSceneBar();
    };
    box.appendChild(b);
  });
}

function initMap() {
  buildEV();
  if (!window.__mapBound) {
    window.__mapBound = 1;
    var svg = $('#mapSvg');
    var zi = $('#mZoomIn'), zo = $('#mZoomOut'), zr = $('#mZoomReset');
    if (zi) zi.onclick = function () { zoomAt(1); };
    if (zo) zo.onclick = function () { zoomAt(-1); };
    if (zr) zr.onclick = function () { MS.scale = 1; MS.pan = { x: 0, y: 0 }; applyView(); };
    if (svg) {
      svg.addEventListener('dblclick', function (ev) {
        var r = svg.getBoundingClientRect();
        zoomAt(1, (ev.clientX - r.left) / r.width * M.view.w, (ev.clientY - r.top) / r.height * M.view.h);
      });
      var pd = 0, lx = 0, ly = 0, panning = false;
      svg.addEventListener('touchstart', function (ev) {
        if (ev.touches.length === 2) {
          var dx = ev.touches[0].clientX - ev.touches[1].clientX;
          var dy = ev.touches[0].clientY - ev.touches[1].clientY;
          pd = Math.sqrt(dx * dx + dy * dy);
        } else if (ev.touches.length === 1) {
          panning = MS.scale > 1; lx = ev.touches[0].clientX; ly = ev.touches[0].clientY;
        }
      }, { passive: true });
      svg.addEventListener('touchmove', function (ev) {
        if (ev.touches.length === 2 && pd) {
          var dx = ev.touches[0].clientX - ev.touches[1].clientX;
          var dy = ev.touches[0].clientY - ev.touches[1].clientY;
          var d2 = Math.sqrt(dx * dx + dy * dy);
          var r = svg.getBoundingClientRect();
          var cx = (ev.touches[0].clientX + ev.touches[1].clientX) / 2 - r.left;
          var cy = (ev.touches[0].clientY + ev.touches[1].clientY) / 2 - r.top;
          if (Math.abs(d2 - pd) > 8) {
            zoomAt(d2 > pd ? 1 : -1, cx / r.width * M.view.w, cy / r.height * M.view.h);
            pd = d2;
          }
          ev.preventDefault();
        } else if (ev.touches.length === 1 && panning) {
          var rr = svg.getBoundingClientRect();
          var k = M.view.w / MS.scale / rr.width;
          MS.pan.x -= (ev.touches[0].clientX - lx) * k * (600 / M.view.w);
          MS.pan.y -= (ev.touches[0].clientY - ly) * k * (M.view.h / M.view.h);
          lx = ev.touches[0].clientX; ly = ev.touches[0].clientY;
          applyView();
        }
      }, { passive: false });
      svg.addEventListener('touchend', function () { pd = 0; panning = false; }, { passive: true });
    }
  }
  renderSceneBar();
  renderMap();
}

/* ---------- 错题池（地图事件可进错题本，复用填空题型重练） ---------- */
function buildMapPool() {
  POOL.maps = EV.map(function (v) {
    var l = lesson(v.e.l);
    return {
      id: v.id, lesson: v.e.l, lt: l ? l.t : '', sec: '时空地图',
      k: fmtYear(v.e.y, v.e.bp) + ' · ' + v.p.n, v: v.e.t
    };
  });
}

/* ---------- 数据来源说明 ---------- */
function fillSrc() {
  var box = document.querySelector('.msrc'); if (!box) return;
  var s = M.src;
  box.appendChild(el('div', null, '河流：' + s.rivers));
  box.appendChild(el('div', null, '长城：' + s.wall));
  box.appendChild(el('div', null, '坐标：' + s.coords));
  box.appendChild(el('div', null, '底图只保留黄河、长江、长城、山脉等自然地物与历史地物，不画现代行政边界。'));
}

/* ---------- 接入：列表 / 地图 切换 ---------- */
function bindMode() {
  var box = $('#timeMode'); if (!box) return;
  box.querySelectorAll('button[data-m]').forEach(function (b) {
    b.onclick = function () {
      box.querySelectorAll('button[data-m]').forEach(function (x) { x.classList.toggle('on', x === b); });
      var isMap = b.dataset.m === 'map';
      $('#timeListView').style.display = isMap ? 'none' : '';
      $('#timeMapView').style.display = isMap ? '' : 'none';
      MS.on = isMap;
      if (isMap) { initMap(); }
    };
  });
}

/* 供 history.js 的视图切换调用 */
window.renderMapIfOn = function (v) {
  if (v === 'time' && MS.on) { initMap(); }
};

/* ---------- 启动 ---------- */
(function () {
  buildEV();
  buildMapPool();
  fillSrc();
  bindMode();
  var _go = window.goView;
  window.goView = function (v) {
    if (_go) _go(v);
    if (v === 'time' && MS.on) renderMap();
  };
})();
