/* ===== GitHub Pages 镜像版配置 =====
 * 本站是 CloudBase 主站的只读镜像，用于海外访问与灾备。
 * 刻意「关闭」云端同步与云端发音：
 *   - ENV_ID 留空        → CloudSync 自动禁用，进度只存本机浏览器
 *   - TTS_CLOUD_URL 留空 → 发音回退到浏览器内置语音
 * 请勿把主站的家庭账号密码 / API Key / 云函数地址复制到这里（本仓库是公开的）。
 */
window.CLOUDBASE = {
  ENV_ID: '',
  REGION: 'ap-shanghai',
  ALLOWED_ORIGIN: ''
};

window.SYNC_ACCOUNT = {
  username: '',
  password: ''
};

window.TTS_CLOUD_URL = '';
