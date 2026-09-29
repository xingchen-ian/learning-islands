/* ===== VoiceKit 发音引擎 v2（词汇岛 + 语法岛共享）=====
 * 目标 1：解决 Web Speech API 默认音色"诡异/机器人感"的问题
 * 目标 2：接入云端 Edge TTS 神经网络发音（微软同源、免费、有节奏感）
 *
 * 工作模式（自动降级）：
 *   1) 云端优先：config.js 里 TTS_CLOUD_URL 已配置 → 走 Edge TTS Neural 音色
 *   2) 本地回退：云端不可用 / 未配置 → 用系统语音（黑名单过滤 + 自然声优先）
 *
 * 用户可点击顶部 🎤 按钮手动挑选音色（云端专业音色 / 本地系统语音），
 * 选择结果存入 localStorage（key voice_kit_pref）。
 */
(function () {
  'use strict';

  /* 搞笑/机器人音色黑名单（macOS Novelty 分类 + 低质量内置声） */
  var BAD_VOICE = /zarvox|trinoids|bells|albert|bahh|fred|good\s*news|jester|organ|superstar|whisper|wobble|bad\s*news|boing|bubbles|cellos|eddy|grand|hysterical|pipe|reed|rocko|sandy|shelly|hysterical/i;

  /* 优质本地自然语音白名单 */
  var GOOD_VOICE = /google|samantha|daniel|karen|tessa|alex|ava|allison|susan|zoe|mason|aria|jenny|emma|olivia|sophie|natural|enhanced|premium|neural|siri|female|male|new/i;

  /* 云端 Edge TTS 专业音色列表（与云函数 VOICE_MAP 保持一致） */
  var CLOUD_VOICES = [
    { id: 'en-US-AriaNeural', label: 'Aria', desc: '美音 · 女声', rec: true },
    { id: 'en-US-JennyNeural', label: 'Jenny', desc: '美音 · 女声', rec: true },
    { id: 'en-US-GuyNeural', label: 'Guy', desc: '美音 · 男声', rec: true },
    { id: 'en-US-ChristopherNeural', label: 'Christopher', desc: '美音 · 男声', rec: false },
    { id: 'en-GB-SoniaNeural', label: 'Sonia', desc: '英音 · 女声', rec: true },
    { id: 'en-GB-RyanNeural', label: 'Ryan', desc: '英音 · 男声', rec: false },
    { id: 'en-AU-NatashaNeural', label: 'Natasha', desc: '澳音 · 女声', rec: false },
    { id: 'en-AU-WilliamNeural', label: 'William', desc: '澳音 · 男声', rec: false },
    { id: 'en-IN-NeerjaNeural', label: 'Neerja', desc: '印度 · 女声', rec: false },
    { id: 'en-IN-PrabhatNeural', label: 'Prabhat', desc: '印度 · 男声', rec: false }
  ];

  var STORE_KEY = 'voice_kit_pref';
  var cache = [];
  // prefs: { uri: 本地音色 voiceURI, voice: 云端音色 id }
  var prefs = { uri: '', voice: '' };

  /* ---------- 工具 ---------- */
  function cloudUrl() {
    return (typeof window !== 'undefined' && window.TTS_CLOUD_URL) || '';
  }
  function cloudEnabled() { return !!cloudUrl(); }

  /* ---------- 本地语音列表加载 ---------- */
  function load() {
    try { cache = window.speechSynthesis.getVoices() || []; }
    catch (e) { cache = []; }
    return cache;
  }
  function loadPrefs() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) prefs = JSON.parse(raw);
    } catch (e) {}
  }
  function savePrefs() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(prefs)); } catch (e) {}
  }
  function ensureLoaded() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (!cache.length) load();
  }

  /* ---------- 本地可用语音（过滤黑名单，保留英语） ---------- */
  function englishVoices() {
    ensureLoaded();
    return cache.filter(function (v) {
      return /^en/i.test(v.lang || '') && !BAD_VOICE.test(v.name || '');
    });
  }

  /* ---------- 本地自动挑选"好听"的语音 ---------- */
  function autoPickLocal() {
    var en = englishVoices();
    if (!en.length) return null;
    var t1 = en.filter(function (v) { return /en-(US|GB)/i.test(v.lang); });
    var hit = t1.find(function (v) { return GOOD_VOICE.test(v.name); });
    if (hit) return hit;
    if (t1.length) return t1[0];
    return en[0];
  }

  /* ---------- 云端音色：当前选择 ---------- */
  function cloudVoiceId() {
    if (prefs.voice) {
      var hit = CLOUD_VOICES.find(function (v) { return v.id === prefs.voice; });
      if (hit) return hit.id;
    }
    return 'en-US-JennyNeural'; // 云端默认：Jenny（自然清晰女声）
  }

  /* ---------- 朗读主入口（云端优先，失败回退本地） ---------- */
  function speak(text, rate) {
    if (!text) return false;
    // 云端模式
    if (cloudEnabled()) {
      speakCloud(text, rate || 0.9);
      return true;
    }
    // 本地模式
    speakLocal(text, rate || 0.9);
    return true;
  }

  /* ---------- 云端 Edge TTS 朗读 ---------- */
  var _audioEl = null;
  var _audioCache = {};
  var _speaking = false;

  function getAudioEl() {
    if (!_audioEl) {
      _audioEl = new Audio();
      _audioEl.preload = 'auto';
    }
    return _audioEl;
  }
  function cloudRateStr(rate) {
    // rate 0.9 → "-10%"（稍慢，适合跟读）
    var pct = Math.round((rate - 1) * 100);
    return (pct >= 0 ? '+' : '') + pct + '%';
  }
  function speakCloud(text, rate) {
    if (_speaking) { try { getAudioEl().pause(); } catch (e) {} _speaking = false; }
    var voice = cloudVoiceId();
    var cacheKey = voice + '|' + cloudRateStr(rate) + '|' + text;

    function play(blobUrl) {
      _speaking = true;
      var audio = getAudioEl();
      audio.onended = function () { _speaking = false; };
      audio.onerror = function () { _speaking = false; speakLocal(text, rate); };
      audio.src = blobUrl;
      audio.play().catch(function () { _speaking = false; speakLocal(text, rate); });
    }

    if (_audioCache[cacheKey]) { play(_audioCache[cacheKey]); return; }

    var body = JSON.stringify({ text: text, voice: voice, rate: cloudRateStr(rate) });
    fetch(cloudUrl(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body
    }).then(function (res) {
      if (!res.ok) throw new Error('TTS ' + res.status);
      return res.blob();
    }).then(function (blob) {
      var url = URL.createObjectURL(blob);
      _audioCache[cacheKey] = url;
      play(url);
    }).catch(function () {
      speakLocal(text, rate); // 云端失败 → 本地兜底
    });
  }

  /* ---------- 本地 Web Speech 朗读 ---------- */
  function speakLocal(text, rate) {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      var v = pickLocal();
      if (v) { u.voice = v; u.lang = v.lang; } else { u.lang = 'en-US'; }
      u.rate = rate || 0.9;
      u.pitch = 1.0;
      window.speechSynthesis.speak(u);
    } catch (e) {}
  }
  function pickLocal() {
    ensureLoaded();
    if (prefs.uri) {
      var saved = cache.find(function (v) { return v.voiceURI === prefs.uri || v.name === prefs.uri; });
      if (saved) return saved;
    }
    return autoPickLocal();
  }

  /* ---------- 音色选择弹层（云端音色 / 本地音色 二合一） ---------- */
  function showPicker(anchorEl) {
    // 移除旧弹层
    var old = document.getElementById('voicePicker');
    if (old) old.remove();

    var overlay = document.createElement('div');
    overlay.id = 'voicePicker';
    overlay.className = 'vp-overlay';

    var html = '<div class="vp-card">' +
      '<div class="vp-head"><div class="vp-title">🎤 选择朗读音色</div>' +
      '<button class="vp-close">✕</button></div>' +
      '<div class="vp-sub">点击「试听」对比，选中的音色会自动记住</div>';

    // --- 云端专业音色（优先展示） ---
    if (cloudEnabled()) {
      var curVoice = cloudVoiceId();
      html += '<div class="vp-sec">✨ 神经网络音色（推荐，有节奏感）</div><div class="vp-list">';
      html += CLOUD_VOICES.map(function (v) {
        var isCur = v.id === curVoice;
        return '<div class="vp-row' + (isCur ? ' cur' : '') + '" data-cloud="' + v.id + '" data-name="' + v.label + '">' +
          '<div class="vp-info"><div class="vp-name">' + v.label + ' ' +
          (v.rec ? '<span class="vp-rec">推荐</span>' : '') + (isCur ? '<span class="vp-cur">✓ 当前</span>' : '') + '</div>' +
          '<div class="vp-meta">' + v.desc + '</div></div>' +
          '<button class="vp-play" data-text="Hello! Let us learn English together.">试听</button></div>';
      }).join('');
      html += '</div>';
    }

    // --- 本地系统语音（兜底） ---
    ensureLoaded();
    var en = englishVoices();
    if (en.length) {
      var curLocal = pickLocal();
      html += '<div class="vp-sec">📱 本机语音（云端不可用时的备选）</div><div class="vp-list">';
      html += en.map(function (v) {
        var isCur = curLocal && (v.voiceURI === curLocal.voiceURI);
        var rec = GOOD_VOICE.test(v.name) ? '<span class="vp-rec">推荐</span>' : '';
        return '<div class="vp-row' + (isCur ? ' cur' : '') + '" data-uri="' + escapeAttr(v.voiceURI) + '" data-name="' + escapeAttr(v.name) + '">' +
          '<div class="vp-info"><div class="vp-name">' + escapeHtml(v.name) + ' ' + rec + (isCur ? '<span class="vp-cur">✓ 当前</span>' : '') + '</div>' +
          '<div class="vp-meta">' + (v.lang || 'en') + '</div></div>' +
          '<button class="vp-play" data-text="Hello! Let us learn English together.">试听</button></div>';
      }).join('');
      html += '</div>';
    }

    html += '</div>';
    overlay.innerHTML = html;
    document.body.appendChild(overlay);

    function close() { overlay.remove(); }
    overlay.addEventListener('click', function (e) {
      var row = e.target.closest('.vp-row');
      var play = e.target.closest('.vp-play');
      if (e.target.closest('.vp-close')) { close(); return; }
      if (play) {
        e.stopPropagation();
        var demoText = play.dataset.text;
        // 试听用临时音色（不改变已保存偏好）
        if (row && row.dataset.cloud) {
          var oldVoice = prefs.voice;
          prefs.voice = row.dataset.cloud;
          speakCloud(demoText, 0.95);
          prefs.voice = oldVoice;
        } else if (row && row.dataset.uri) {
          var oldUri = prefs.uri;
          prefs.uri = row.dataset.uri;
          speakLocal(demoText, 0.95);
          prefs.uri = oldUri;
        } else {
          speak(demoText, 0.95);
        }
        return;
      }
      if (row) {
        if (row.dataset.cloud) {
          prefs.voice = row.dataset.cloud;
        } else if (row.dataset.uri) {
          prefs.uri = row.dataset.uri;
        }
        savePrefs();
        overlay.querySelectorAll('.vp-row').forEach(function (r) {
          r.classList.toggle('cur', r === row);
          var c = r.querySelector('.vp-cur');
          if (c) c.remove();
          if (r === row) r.insertAdjacentHTML('beforeend', '<span class="vp-cur">✓ 当前</span>');
        });
        speak('Hello! This is my new voice.', 0.95);
      }
    });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function escapeAttr(s) {
    return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  }

  /* ---------- 初始化 ---------- */
  if (typeof window !== 'undefined') {
    loadPrefs();
    if ('speechSynthesis' in window) {
      load();
      window.speechSynthesis.onvoiceschanged = load;
    }
    function bindPickBtn() {
      var btn = document.getElementById('voicePickBtn');
      if (btn && !btn.dataset.vpBound) {
        btn.dataset.vpBound = '1';
        btn.addEventListener('click', function () { showPicker(btn); });
      }
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', bindPickBtn);
    } else {
      bindPickBtn();
    }
  }

  window.VoiceKit = {
    pick: pickLocal, autoPick: autoPickLocal,
    speak: speak, showPicker: showPicker, voices: englishVoices,
    cloudEnabled: cloudEnabled, cloudVoiceId: cloudVoiceId
  };
})();
