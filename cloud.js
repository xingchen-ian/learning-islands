/* ===== CloudBase 云端同步封装（家庭共享账号 · 自动登录，无需邮箱/SMTP） =====
 * 设计：
 *  - 未配置 ENV_ID 或 SDK 未加载时，enabled=false，所有方法安全回退（不抛错）。
 *  - 登录态基于「家庭共享账号」(window.SYNC_ACCOUNT)，页面加载时自动登录，
 *    因此孩子与家长在任意设备上打开同一网址，都会登录到同一个账号 → 进度天然同步。
 *  - 进度按「用户」存一个文档：progress/{uid} = { units:{ u1:{...}, u_xxx:{...} }, updatedAt }
 *    集合权限设为「仅创建者可读写」，只有该共享账号可读写自己的进度。
 *  - 单元键：U1 -> 'u1'，U2 -> 'u_' + STORE_SUFFIX。
 */
window.CloudSync = (function () {
  var cfg = window.CLOUDBASE || {};
  var app = null, auth = null, db = null;
  var enabled = false;
  var loggedIn = false;
  var listeners = [];

  function isConfigured() {
    if (!(cfg.ENV_ID && window.cloudbase)) return false;
    // 若限定了允许的域名，则只在白名单域名下启用同步（体验版无法加自定义安全域名）
    if (cfg.ALLOWED_ORIGIN && location.hostname !== cfg.ALLOWED_ORIGIN) return false;
    return true;
  }

  // 自动登录家庭共享账号（账号由管理员接口预先建好，无需邮箱/SMTP）
  function ensureLogin() {
    var acc = window.SYNC_ACCOUNT;
    if (!enabled || !auth || !acc || !acc.username) {
      loggedIn = false; return Promise.resolve(false);
    }
    return auth.signInWithUsernameAndPassword(acc.username, acc.password)
      .then(function () { loggedIn = true; return true; })
      .catch(function (e) {
        console.warn('[CloudSync] 自动登录失败，退化为本机保存：', e && (e.message || e.errMsg));
        loggedIn = false; return false;
      });
  }

  function init() {
    return new Promise(function (resolve) {
      if (!isConfigured()) { enabled = false; resolve(false); return; }
      try {
        app = window.cloudbase.init({ env: cfg.ENV_ID, region: cfg.REGION || 'ap-shanghai' });
        auth = app.auth();
        db = app.database();
        enabled = true;
      } catch (e) {
        console.warn('[CloudSync] init 失败，回退本地存储：', e);
        enabled = false; resolve(false); return;
      }
      // 初始化后立即尝试自动登录；无论成功与否，站点都可用（失败则退化为本地）
      ensureLogin().then(function () { resolve(true); })
        .catch(function () { resolve(true); });
    });
  }

  function unitKey() {
    return (typeof STORE_SUFFIX !== 'undefined' && STORE_SUFFIX) ? ('u_' + STORE_SUFFIX) : 'u1';
  }

  function getUid() {
    if (!enabled || !auth) return null;
    try {
      var u = auth.currentUser;
      if (u && u.uid) return u.uid;
      if (u && u._id) return u._id;
    } catch (e) {}
    return null;
  }

  function getLoginState() {
    if (!enabled) return Promise.resolve(null);
    return auth.getLoginState()
      .then(function (s) { return (s && !s.isAnonymous) ? s : null; })
      .catch(function () { return null; });
  }

  // 拉取当前单元的云端进度；返回 state 对象或 null
  function pull() {
    if (!enabled || !loggedIn) return Promise.resolve(null);
    var id = getUid();
    if (!id) return Promise.resolve(null);
    return db.collection('progress').doc(id).get()
      .then(function (res) {
        var data = res.data && res.data[0];
        if (data && data.units && data.units[unitKey()]) return data.units[unitKey()];
        return null;
      })
      .catch(function () { return null; });
  }

  // 推送当前单元进度；返回是否成功
  function push(stateObj) {
    if (!enabled || !loggedIn) return Promise.resolve(false);
    var id = getUid();
    if (!id) return Promise.resolve(false);
    var key = unitKey();
    return db.collection('progress').doc(id).get()
      .then(function (res) {
        var exists = res.data && res.data.length;
        if (exists) {
          var cur = (res.data[0].units) || {};
          cur[key] = stateObj;
          return db.collection('progress').doc(id).update({ units: cur, updatedAt: Date.now() });
        }
        var units = {};
        units[key] = stateObj;
        return db.collection('progress').doc(id).set({ units: units, updatedAt: Date.now() });
      })
      .then(function () { return true; })
      .catch(function (e) { console.warn('[CloudSync] push 失败：', e); return false; });
  }

  function getAccountName() {
    var acc = window.SYNC_ACCOUNT || {};
    return acc.username || '';
  }

  function onChange(cb) { if (typeof cb === 'function') listeners.push(cb); }
  function emit(info) { listeners.forEach(function (cb) { try { cb(info); } catch (e) {} }); }

  return {
    init: init,
    isConfigured: isConfigured,
    get enabled() { return enabled; },
    get loggedIn() { return loggedIn; },
    unitKey: unitKey,
    getAccountName: getAccountName,
    getLoginState: getLoginState,
    pull: pull,
    push: push,
    onChange: onChange,
    emit: emit
  };
})();
