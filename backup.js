/* ===== 进度备份：导出 / 导入本机学习进度 =====
 * 设计要点：
 *  - 只管 localStorage，不碰云端。所以在「云端同步被关掉」的 GitHub 镜像上同样可用。
 *  - 只认白名单里的岛，导入时未知键一律忽略（防止把垃圾键写进 localStorage）。
 *  - 导出格式带 app / version / exportedAt，便于以后兼容旧版备份文件。
 */
(function () {
  'use strict';

  var FORMAT = 'progress-backup';
  var VERSION = 1;

  /* 各岛的存储键（与 app.js / grammar.js / exam.js / zhs.js / history.js 保持一致） */
  var ISLANDS = [
    { key: 'vocab_island_v1',   label: '词汇冒险岛 · U1' },
    { key: 'vocab_u2_v1',       label: '词汇冒险岛 · U2' },
    { key: 'vocab_summer1_v1',  label: '词汇冒险岛 · List' },
    { key: 'vocab_7au3_v1',     label: '词汇冒险岛 · U3' },
    { key: 'vocab_7au4_v1',     label: '词汇冒险岛 · U4' },
    { key: 'vocab_7au5_v1',     label: '词汇冒险岛 · U5' },
    { key: 'vocab_7au6_v1',     label: '词汇冒险岛 · U6' },
    { key: 'grammar_island_v1', label: '语法冒险岛' },
    { key: 'exam_island_v1',    label: '考纲词汇岛' },
    { key: 'zhs_island_v1',     label: '朝花岛' },
    { key: 'history_island_v1', label: '历史岛' }
  ];

  var KNOWN = {};
  ISLANDS.forEach(function (i) { KNOWN[i.key] = i.label; });

  var $ = function (id) { return document.getElementById(id); };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function showMsg(el, kind, html) {
    el.className = 'bk-msg show ' + kind;
    el.innerHTML = html;
  }
  function hideMsg(el) { el.className = 'bk-msg'; el.innerHTML = ''; }

  /* ---------- 读取本机进度 ---------- */
  function readKey(k) {
    try {
      var raw = localStorage.getItem(k);
      if (raw == null || raw === '') return null;
      return JSON.parse(raw);
    } catch (e) { return null; }
  }

  function collect() {
    var out = {};
    ISLANDS.forEach(function (i) {
      var v = readKey(i.key);
      if (v !== null) out[i.key] = v;
    });
    return out;
  }

  /* 把状态对象压成一行可读摘要：mastery 42 · wrong 7 · known 30 */
  function fieldSummary(v) {
    if (Array.isArray(v)) return v.length + ' 条';
    if (!v || typeof v !== 'object') return '';
    var parts = [];
    Object.keys(v).forEach(function (k) {
      var x = v[k], n = null;
      if (Array.isArray(x)) n = x.length;
      else if (x && typeof x === 'object') n = Object.keys(x).length;
      else if (typeof x === 'number') return;          // ptr 这类游标不展示
      else if (typeof x === 'string') n = x ? 1 : 0;
      if (n === null) return;
      parts.push(esc(k) + ' ' + n);
    });
    return parts.join(' · ');
  }

  function totalRecords(data) {
    var n = 0;
    Object.keys(data).forEach(function (k) {
      var v = data[k];
      if (Array.isArray(v)) { n += v.length; return; }
      if (v && typeof v === 'object') {
        Object.keys(v).forEach(function (f) {
          var x = v[f];
          if (Array.isArray(x)) n += x.length;
          else if (x && typeof x === 'object') n += Object.keys(x).length;
        });
      }
    });
    return n;
  }

  function renderCurrent() {
    var data = collect();
    var keys = Object.keys(data);
    var ul = $('bkCur');
    var ts = 0;

    if (!keys.length) {
      ul.innerHTML = '<li class="bk-empty-row">这台设备上还没有任何学习记录 —— 去某个岛上练几题就会有了。</li>';
    } else {
      var html = '';
      ISLANDS.forEach(function (i) {
        if (!(i.key in data)) return;
        ts++;
        var detail = fieldSummary(data[i.key]);
        html += '<li>' +
          '<span class="bk-dot"></span>' +
          '<span class="bk-name">' + esc(i.label) + '</span>' +
          '<span class="bk-detail">' + (detail || '已保存') + '</span>' +
          '</li>';
      });
      ul.innerHTML = html;
    }

    $('bkChip').textContent = '本机 ' + keys.length + ' 项';

    /* 来源域提示：这是理解「主站 / 镜像互不相通」的关键 */
    var host = location.hostname;
    var where;
    if (/github\.io$/i.test(host)) {
      where = '你正打开 <strong>GitHub 海外镜像</strong>。这里的进度只存在本机浏览器，' +
              '和 CloudBase 主站<strong>不互通</strong> —— 想把主站进度搬过来，用下面的导出 / 导入。';
    } else if (/tcloudbaseapp\.com$/i.test(host)) {
      where = '你正打开 <strong>CloudBase 主站</strong>。这里的进度会走上云端同步，换设备自动接上；' +
              '导出一份可以留作备份，或搬到镜像上。';
    } else {
      where = '当前地址是 <code>' + esc(host) + '</code>。进度只存在本机浏览器，' +
              '换设备需要靠下面的导出 / 导入。';
    }
    $('bkWhere').innerHTML = where;

    var has = keys.length > 0;
    $('bkCopy').disabled = !has;
    $('bkDownload').disabled = !has;
  }

  /* ---------- 导出 ---------- */
  function buildPayload() {
    return {
      app: 'Nao学习群岛',
      format: FORMAT,
      version: VERSION,
      exportedAt: new Date().toISOString(),
      origin: location.origin,
      data: collect()
    };
  }

  function doExport() {
    var payload = buildPayload();
    if (!Object.keys(payload.data).length) {
      showMsg($('bkOutMsg'), 'warn', '这台设备上还没有可导出的进度。');
      return null;
    }
    var text = JSON.stringify(payload, null, 2);
    $('bkOut').value = text;
    showMsg($('bkOutMsg'), 'ok',
      '已生成备份，共 <strong>' + Object.keys(payload.data).length + '</strong> 个岛 / 约 ' +
      totalRecords(payload.data) + ' 条记录。');
    return { text: text, payload: payload };
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      try {
        var ta = $('bkOut');
        ta.removeAttribute('readonly');
        ta.select();
        ta.setSelectionRange(0, ta.value.length);
        var ok = document.execCommand('copy');
        ta.setAttribute('readonly', 'readonly');
        ok ? resolve() : reject(new Error('execCommand 复制失败'));
      } catch (e) { reject(e); }
    });
  }

  $('bkCopy').addEventListener('click', function () {
    var r = doExport();
    if (!r) return;
    copyText(r.text).then(function () {
      showMsg($('bkOutMsg'), 'ok',
        '✅ 已复制到剪贴板（' + Object.keys(r.payload.data).length + ' 个岛）。' +
        '把它发到另一台设备，粘进下面的「导入」框即可。');
    }).catch(function () {
      showMsg($('bkOutMsg'), 'warn',
        '内容已生成在下面的框里，但自动复制被浏览器挡了 —— 请手动全选复制。');
    });
  });

  function stamp() {
    var d = new Date(), p = function (n) { return (n < 10 ? '0' : '') + n; };
    return d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) +
           '-' + p(d.getHours()) + p(d.getMinutes());
  }

  $('bkDownload').addEventListener('click', function () {
    var r = doExport();
    if (!r) return;
    try {
      var blob = new Blob([r.text], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = '学习进度备份-' + stamp() + '.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
      showMsg($('bkOutMsg'), 'ok', '✅ 文件已开始下载。');
    } catch (e) {
      showMsg($('bkOutMsg'), 'err', '下载失败：' + esc(e.message || e) + '　可以把框里的内容手动复制走。');
    }
  });

  /* ---------- 导入 ---------- */
  function parseInput(text) {
    var obj;
    try { obj = JSON.parse(text); }
    catch (e) { return { err: '这不是有效的备份内容（JSON 解析失败）。请确认整段都复制全了。' }; }

    var data = null;
    if (obj && typeof obj === 'object' && obj.data && typeof obj.data === 'object') {
      data = obj.data;                                  // 标准备份文件
    } else if (obj && typeof obj === 'object') {
      data = obj;                                       // 直接粘贴了纯数据
    }
    if (!data) return { err: '备份内容格式不对，没找到进度数据。' };

    var accepted = [], unknown = [], empty = [];
    Object.keys(data).forEach(function (k) {
      if (!(k in KNOWN)) { unknown.push(k); return; }
      var v = data[k];
      if (v == null || typeof v !== 'object') { empty.push(k); return; }
      accepted.push(k);
    });

    return { data: data, accepted: accepted, unknown: unknown, bad: empty,
             header: (obj && obj.exportedAt) ? obj.exportedAt : null };
  }

  function refreshApplyBtn() {
    var text = $('bkIn').value.trim();
    $('bkApply').disabled = !text;
    if (!text) hideMsg($('bkInMsg'));
  }

  $('bkIn').addEventListener('input', refreshApplyBtn);

  $('bkFile').addEventListener('change', function (ev) {
    var f = ev.target.files && ev.target.files[0];
    if (!f) return;
    var fr = new FileReader();
    fr.onload = function () {
      $('bkIn').value = String(fr.result || '');
      refreshApplyBtn();
      var p = parseInput($('bkIn').value);
      if (p.err) { showMsg($('bkInMsg'), 'err', esc(p.err)); return; }
      showMsg($('bkInMsg'), 'warn',
        '已读入文件，识别到 <strong>' + p.accepted.length + '</strong> 个岛。确认无误后点「写入本机」。');
    };
    fr.onerror = function () { showMsg($('bkInMsg'), 'err', '文件读取失败。'); };
    fr.readAsText(f);
  });

  $('bkClearIn').addEventListener('click', function () {
    $('bkIn').value = '';
    $('bkFile').value = '';
    refreshApplyBtn();
    $('bkApply').disabled = true;
  });

  $('bkApply').addEventListener('click', function () {
    var text = $('bkIn').value.trim();
    if (!text) return;
    var p = parseInput(text);
    if (p.err) { showMsg($('bkInMsg'), 'err', esc(p.err)); return; }
    if (!p.accepted.length) {
      showMsg($('bkInMsg'), 'err', '没识别到可用的进度数据，请检查是否复制了正确的内容。');
      return;
    }

    /* 先算出会覆盖哪些岛，让用户确认 */
    var willOverwrite = p.accepted.filter(function (k) { return readKey(k) !== null; });
    var detail = p.accepted.map(function (k) {
      var tag = willOverwrite.indexOf(k) >= 0 ? '（覆盖现有）' : '（新增）';
      return '<li>' + esc(KNOWN[k]) + ' ' + tag + '</li>';
    }).join('');

    var extra = '';
    if (p.unknown.length) extra += '<li>忽略 ' + p.unknown.length + ' 项无法识别的数据</li>';
    if (p.bad && p.bad.length) extra += '<li>跳过 ' + p.bad.length + ' 项内容为空的岛</li>';

    if (!window.confirm('将写入 ' + p.accepted.length + ' 个岛的进度，其中 ' +
        willOverwrite.length + ' 个会覆盖本机现有数据。\n\n确定继续吗？')) {
      return;
    }

    var okCount = 0, failList = [];
    p.accepted.forEach(function (k) {
      try {
        localStorage.setItem(k, JSON.stringify(p.data[k]));
        okCount++;
      } catch (e) { failList.push(KNOWN[k]); }
    });

    var html = '<strong>✅ 已写入 ' + okCount + ' 个岛的进度。</strong>' +
      '<ul>' + detail + extra +
      (failList.length ? '<li>失败：' + esc(failList.join('、')) + '</li>' : '') +
      '</ul>';
    if (p.header) {
      html += '<div style="margin-top:6px;font-weight:700">备份导出时间：' + esc(p.header) + '</div>';
    }
    html += '<div style="margin-top:6px;font-weight:700">刷新页面即可看到更新后的进度。</div>';
    showMsg($('bkInMsg'), 'ok', html);

    renderCurrent();

    var btn = document.createElement('button');
    btn.className = 'bk-btn';
    btn.style.marginTop = '10px';
    btn.textContent = '🔄 刷新页面';
    btn.onclick = function () { location.reload(); };
    $('bkInMsg').appendChild(btn);
  });

  /* ---------- 清空 ---------- */
  $('bkWipe').addEventListener('click', function () {
    var keys = Object.keys(collect());
    if (!keys.length) { showMsg($('bkWipeMsg'), 'warn', '本机本来就没有进度。'); return; }
    if (!window.confirm('将清空这台设备上的 ' + keys.length + ' 个岛的进度，且无法找回。\n\n建议先导出留一份。确定继续吗？')) return;

    var n = 0;
    keys.forEach(function (k) { try { localStorage.removeItem(k); n++; } catch (e) {} });
    showMsg($('bkWipeMsg'), 'ok', '🧹 已清空 ' + n + ' 个岛的进度。刷新页面生效。');
    renderCurrent();
  });

  /* ---------- 启动 ---------- */
  renderCurrent();
})();
