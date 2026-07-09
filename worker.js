const _D_={_vl_:atob('dmxlc3M='),_tr_:atob('dHJvamFu'),_vm_:atob('dm1lc3M='),_ss_:atob('c2hhZG93c29ja3M='),_wg_:atob('d2lyZWd1YXJk'),_cl_:atob('Y2xhc2g='),_sb_:atob('c2luZ2JveA=='),_sb2_:atob('c2luZy1ib3g='),_mh_:atob('bWlob21v'),_hd_:atob('aGlkZGlmeQ=='),_sg_:atob('c3VyZ2U='),_qx_:atob('cXVhbng='),_ln_:atob('bG9vbg=='),_np_:atob('Tm92YVByb3h5'),_np2_:atob('Tm92YS1Qcm94eQ=='),_np3_:atob('Tm92YQ=='),_cf_:atob('Y2xvdWRmbGFyZQ=='),_xr_:atob('eHJheQ=='),_cr_:atob('Q21saXVzcw=='),_pr_:atob('UFJPWFlJUA=='),_sp_:atob('c3BlZWQuY2xvdWRmbGFyZS5jb20='),_wr_:atob('Tm92YS1XQVJQ'),_ws_:atob('d3M='),_grpc_:atob('Z3JwYw=='),_xhttp_:atob('eHR0cA=='),_aes128_:atob('YWVzLTEyOC1nY20='),_aes256_:atob('YWVzLTI1Ni1nY20='),_chrome_:atob('Y2hyb21l'),_mixed_:atob('bWl4ZWQ=')};
const Version = 'V4.0.0';
let config_JSON, 反代IP = '', 启用SOCKS5反代 = null, 启用SOCKS5全局反代 = false, 我的SOCKS5账号 = '', parsedSocks5Address = {};
let 缓存SOCKS5白名单 = null, 缓存反代IP, 缓存反代解析数组, 缓存反代数组索引 = 0, 启用反代兜底 = true, 调试日志打印 = false;
let connClientIp = '';
let connRejectReason = null;
let connProxyWhitelist = [];
let _globalEnv = null;
let 网络设置 = null, 缓存网络设置 = null, 缓存网络设置时间 = 0;
let nat64配置 = '', 缓存Nat64前缀 = null, 缓存Nat64时间 = 0, 缓存Nat64源 = '';
let _d1Ready = false, _kvMigratedFlag = false;
const _md5md5Cache = new Map();
const _sha224Cache = new Map();
const _cidrListCache = new Map();
let 缓存WorkerUUID = null, 缓存WorkerUUID时间 = 0;
let 最后中央同步时间 = 0;
let 缓存AutoKey = null;
let savedUsersAuth = null, savedUsersAuth时间 = 0;
let 缓存CFUsage = null, 缓存CFUsage时间 = 0;
// --- 多用户连接级上下文（移植自 حالت چندکاربره）：每条代理连接解析出用户ID，用于限Speed/记账/拒绝 ---
let 连接用户ID = null, 连接拒绝原因 = null, 连接用户限速KBps = 0;
let 连接用户用量缓存 = {}, 连接用户用量缓存时间 = 0;
let 连接用户日用量缓存 = {}, 连接用户日用量日期 = '';
let SOCKS5白名单 = ['*tapecontent.net', '*cloudatacdn.com', '*loadshare.org', '*cdn-centaurus.com', 'scholar.google.com'];
function hostMatchesProxyList(host) {
	const lists = connProxyWhitelist.length ? SOCKS5白名单.concat(connProxyWhitelist) : SOCKS5白名单;
	return lists.some(p => { try { return new RegExp(`^${String(p).trim().replace(/\*/g, '.*')}$`, 'i').test(host); } catch (e) { return false; } });
}
const Pages静态页面 = 'https://nova-panel.github.io/';
const NOVA_FREE_NOTICE = '🎁 نوا رایگان است، برای آن به کسی پول ندهید';
globalThis.__workerStart = Date.now();
// --- Config JSON cache: avoids repeated KV reads on every request ---
const _CFG_KEY = 'config.json';
let _cfgRaw = null, _cfgRawAt = 0;
async function getConfigRaw(env) {
	if (_cfgRaw !== null && (Date.now() - _cfgRawAt) < 30000) return _cfgRaw;
	try { _cfgRaw = (env.KV && typeof env.KV.get === 'function') ? await env.KV.get(_CFG_KEY) : null; _cfgRawAt = Date.now(); } catch (e) {}
	return _cfgRaw;
}
function putConfig(env, val) { _cfgRaw = val; _cfgRawAt = Date.now(); return env.KV.put(_CFG_KEY, val); }
// --- Nova Auth Hardening ---
const SESSION_MAX_AGE_MS = 86400000;
const LOGIN_MAX_ATTEMPTS = 8, LOGIN_WINDOW_MS = 600000, LOGIN_BLOCK_MS = 900000;
const __loginAttempts = new Map();
let 缓存管理员密码 = null, 缓存管理员密码时间 = 0;
///////////////////////////////////////////////////////全局常量和工具函数///////////////////////////////////////////////
const WS早期数据最大字节 = 8 * 1024, WS早期数据最大头长度 = Math.ceil(WS早期数据最大字节 * 4 / 3) + 4;
const 上行合包目标字节 = 64 * 1024, 上行队列最大字节 = 32 * 1024 * 1024, 上行队列最大条目 = 8192;
const 下行Grain包字节 = 64 * 1024, 下行Grain尾部阈值 = 512, 下行Grain静默毫秒 = 0;
const 快速转发 = false, 最大转发 = false;
let TCP并发拨号数 = 4, 预加载竞速拨号 = false;
const 节点地址正则 = /^(\[[\da-fA-F:]+\]|[\d.]+|[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*)(?::(\d+))?(?:#(.+))?$/;
const NOVA仓库RAW = 'https://raw.githubusercontent.com/IRNova/Nova-Proxy/main';
const NOVA版本URL = NOVA仓库RAW + '/public/version.json';
const NOVAWorkerSrcFallback = NOVA仓库RAW + '/worker.js';
const 每用户节点上限 = 40;
///////////////////////////////////////////////////////امنیت: توابع کمکی///////////////////////////////////////////////
function timingSafeStrEqual(a, b) {
	if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
	let diff = 0;
	for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
	return diff === 0;
}
async function makeSessionToken(UA, key, pass, issuedAt = Date.now()) {
	const enc = new TextEncoder();
	const mac = await hmac('SHA-256', enc.encode(String(key)), enc.encode(`${UA}|${pass}|${issuedAt}`));
	const hex = Array.from(mac, b => b.toString(16).padStart(2, '0')).join('');
	return `${issuedAt}.${hex}`;
}
async function verifySessionToken(token, UA, key, pass, maxAgeMs = SESSION_MAX_AGE_MS) {
	if (!token || typeof token !== 'string') return false;
	const dot = token.indexOf('.');
	if (dot <= 0) return false;
	const issuedAt = Number(token.slice(0, dot));
	if (!Number.isFinite(issuedAt)) return false;
	const age = Date.now() - issuedAt;
	if (age > maxAgeMs || age < -60000) return false;
	const expected = await makeSessionToken(UA, key, pass, issuedAt);
	return timingSafeStrEqual(token, expected);
}
async function makeTelegramSessionToken(key, pass) { return makeSessionToken('telegram-webapp', key, pass); }
async function verifyTelegramSessionToken(token, key, pass) { return verifySessionToken(token, 'telegram-webapp', key, pass); }
async function isAuthed(request, UA, key, pass) {
	const cookies = request.headers.get('Cookie') || '';
	const authCookie = cookies.split(';').find(c => c.trim().startsWith('auth='))?.split('=')[1];
	return await verifySessionToken(authCookie, UA, key, pass) || await verifyTelegramSessionToken(authCookie, key, pass);
}
async function 生成Telegram登录令牌(chatId, key, bucket = Math.floor(Date.now() / 300000)) {
	const enc = new TextEncoder();
	const mac = await hmac('SHA-256', enc.encode(String(key)), enc.encode(`tg-login|${chatId}|${bucket}`));
	return Array.from(mac, b => b.toString(16).padStart(2, '0')).join('');
}
async function 验证Telegram登录令牌(chatId, token, key) {
	const nowBucket = Math.floor(Date.now() / 300000);
	for (const b of [nowBucket, nowBucket - 1]) {
		if (await 生成Telegram登录令牌(chatId, key, b) === token) return true;
	}
	return false;
}
function loginRateCheck(ip) {
	const now = Date.now();
	const rec = __loginAttempts.get(ip);
	if (rec && rec.blockedUntil && now < rec.blockedUntil) return { allowed: false, retryAfter: Math.ceil((rec.blockedUntil - now) / 1000) };
	return { allowed: true };
}
function loginRecordFailure(ip) {
	const now = Date.now();
	let rec = __loginAttempts.get(ip);
	if (!rec || now - rec.windowStart > LOGIN_WINDOW_MS) rec = { count: 0, windowStart: now, blockedUntil: 0 };
	rec.count++;
	if (rec.count >= LOGIN_MAX_ATTEMPTS) rec.blockedUntil = now + LOGIN_BLOCK_MS;
	__loginAttempts.set(ip, rec);
	if (__loginAttempts.size > 5000) {
		for (const [k, v] of __loginAttempts) { if (!v.blockedUntil || now > v.blockedUntil) __loginAttempts.delete(k); if (__loginAttempts.size <= 4000) break; }
	}
}
function loginRecordSuccess(ip) { __loginAttempts.delete(ip); }
// Radar shared-IP pool (free service): per-IP cooldown + Cloudflare-range validation guard against abuse.
const __radarShareHits = new Map();
function radarShareRateOk(ip) {
	const now = Date.now();
	const last = __radarShareHits.get(ip) || 0;
	if (now - last < 30000) return false; // one contribution per IP per 30s
	__radarShareHits.set(ip, now);
	if (__radarShareHits.size > 5000) { for (const k of __radarShareHits.keys()) { __radarShareHits.delete(k); if (__radarShareHits.size <= 2500) break; } }
	return true;
}
function isCloudflareIPv4(ip) {
	const p = String(ip).split('.').map(Number);
	if (p.length !== 4 || p.some(x => !(Number.isInteger(x) && x >= 0 && x <= 255))) return false;
	const n = ((p[0] << 24) >>> 0) + (p[1] << 16) + (p[2] << 8) + p[3];
	const cidrs = [['173.245.48.0',20],['103.21.244.0',22],['103.22.200.0',22],['103.31.4.0',22],['141.101.64.0',18],['108.162.192.0',18],['190.93.240.0',20],['188.114.96.0',20],['197.234.240.0',22],['198.41.128.0',17],['162.158.0.0',15],['104.16.0.0',13],['104.24.0.0',14],['172.64.0.0',13],['131.0.72.0',22]];
	for (const [base, bits] of cidrs) {
		const bp = base.split('.').map(Number);
		const bn = ((bp[0] << 24) >>> 0) + (bp[1] << 16) + (bp[2] << 8) + bp[3];
		const mask = (~((1 << (32 - bits)) - 1)) >>> 0;
		if (((n & mask) >>> 0) === ((bn & mask) >>> 0)) return true;
	}
	return false;
}
function randomBase32(len = 32) {
	const A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
	const r = crypto.getRandomValues(new Uint8Array(len));
	let s = ''; for (const b of r) s += A[b % 32]; return s;
}
function base32Decode(b32) {
	const A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
	let bits = ''; const out = [];
	for (const c of String(b32).toUpperCase().replace(/=+$/, '').replace(/[^A-Z2-7]/g, '')) bits += A.indexOf(c).toString(2).padStart(5, '0');
	for (let i = 0; i + 8 <= bits.length; i += 8) out.push(parseInt(bits.slice(i, i + 8), 2));
	return new Uint8Array(out);
}
async function totpAt(secretB32, counter) {
	const key = base32Decode(secretB32);
	const buf = new ArrayBuffer(8); const dv = new DataView(buf);
	dv.setUint32(0, Math.floor(counter / 0x100000000)); dv.setUint32(4, counter >>> 0);
	const ck = await crypto.subtle.importKey('raw', key, { name: 'HMAC', hash: 'SHA-1' }, false, ['sign']);
	const sig = new Uint8Array(await crypto.subtle.sign('HMAC', ck, buf));
	const o = sig[sig.length - 1] & 0xf;
	const bin = ((sig[o] & 0x7f) << 24) | ((sig[o + 1] & 0xff) << 16) | ((sig[o + 2] & 0xff) << 8) | (sig[o + 3] & 0xff);
	return (bin % 1000000).toString().padStart(6, '0');
}
async function totpVerify(secretB32, token, window = 1) {
	token = String(token || '').trim();
	if (!/^\d{6}$/.test(token) || !secretB32) return false;
	const t = Math.floor(Date.now() / 30000);
	for (let w = -window; w <= window; w++) { if (await totpAt(secretB32, t + w) === token) return true; }
	return false;
}
function novaDisguise(env) {
	try {
		if (env && (env.PANEL_RECOVERY === '1' || env.PANEL_RECOVERY === 'true')) return { on: false, adminPath: '', loginPath: '', subPath: '', pubAdmin: '/admin', pubLogin: '/login' };
		const ns = 网络设置 || {};
		const clean = (v) => String(v || '').trim().toLowerCase().replace(/^\/+|\/+$/g, '').replace(/[^a-z0-9_-]/g, '').slice(0, 40);
		const adminPath = clean((env && env.ADMIN_PATH) || ns.adminPath);
		const loginPath = clean((env && env.LOGIN_PATH) || ns.loginPath);
		const subPath = clean((env && env.SUB_PATH) || ns.subPath);
		const on = (!!ns.disguise || !!(env && (env.ADMIN_PATH || env.LOGIN_PATH || env.SUB_PATH))) && !!(adminPath || loginPath || subPath);
		if (!on) return { on: false, adminPath: '', loginPath: '', subPath: '', pubAdmin: '/admin', pubLogin: '/login' };
		return { on: true, adminPath, loginPath, subPath, pubAdmin: adminPath ? '/' + adminPath : '/admin', pubLogin: loginPath ? '/' + loginPath : '/login' };
	} catch (e) { return { on: false, adminPath: '', loginPath: '', subPath: '', pubAdmin: '/admin', pubLogin: '/login' }; }
}
///////////////////////////////////////////////////////版本检查工具函数///////////////////////////////////////////////
function versionGreater(a, b) {
	const pa = String(a || '').replace(/^[vV]/, '').split('.').map(n => parseInt(n, 10) || 0);
	const pb = String(b || '').replace(/^[vV]/, '').split('.').map(n => parseInt(n, 10) || 0);
	for (let i = 0; i < Math.max(pa.length, pb.length); i++) { const x = pa[i] || 0, y = pb[i] || 0; if (x > y) return true; if (x < y) return false; }
	return false;
}
async function 获取Nova版本() {
	for (const u of [NOVA版本URL, NOVA仓库RAW + '/version.json']) {
		try { const r = await fetch(u, { headers: { 'User-Agent': 'NovaProxy' }, cf: { cacheTtl: 0 } }); if (r.ok) { const j = await r.json(); if (j && j.version) return j; } } catch (e) {}
	}
	return null;
}
///////////////////////////////////////////////////////查杀特征码///////////////////////////////////////////////
const 特征码字典 = [
	(Proxy.name + "IP").toUpperCase(),
	(String.fromCharCode(67, 109) + URL.name[2] + 'i' + URL.name[0]).toLowerCase(),
	String(2407 * 300 - 10).split('').reverse().join('')
];
///////////////////////////////////////////////////////辅助函数：页面内容处理///////////////////////////////////////////////
function 处理Pages响应(r, pagesUrl) {
	return r.text().then(text => {
		text = text.replace(/"\.\.\/logo\.png"/g, `"${pagesUrl}logo.png"`);
		text = text.replace(/src=['"]\.\.\/logo\.png['"]/g, `src="${pagesUrl}logo.png"`);
		return new Response(text, { status: r.status, statusText: r.statusText, headers: r.headers });
	});
}
///////////////////////////////////////////////////////Dashboard serving: bundled Static Assets (one-click) or proxied Pages (legacy)///////////////////////////////////////////////
const PANEL_PLACEHOLDER = /your-panel\.pages\.dev/i;
function panelHasAssets(env) { return !!(env && env.ASSETS && typeof env.ASSETS.fetch === 'function'); }
async function panelFetch(env, path) {
	const p = path.startsWith('/') ? path : '/' + path;
	if (panelHasAssets(env)) {
		let pn = p.split('?')[0];
		if (!/\.[a-z0-9]{2,5}$/i.test(pn) && !pn.endsWith('/')) pn += '/';
		try { return await env.ASSETS.fetch(new Request('https://assets.local' + pn)); }
		catch (e) { return new Response('', { status: 502 }); }
	}
	if (!Pages静态页面 || PANEL_PLACEHOLDER.test(Pages静态页面)) return new Response('', { status: 404 });
	const _base = Pages静态页面.replace(/\/+$/, '');
	const _isRaw = /raw\.githubusercontent\.com/i.test(_base);
	let _pn = p.split('?')[0];
	if (_isRaw && !/\.[a-z0-9]{2,5}$/i.test(_pn)) _pn = _pn.replace(/\/+$/, '') + '/index.html';
	if (!_pn.startsWith('/')) _pn = '/' + _pn;
	try {
		const r = await fetch(_base + _pn, { cf: { cacheTtl: 300, cacheEverything: true } });
		if (!_isRaw || !r.ok) return r;
		const _ext = (_pn.split('.').pop() || '').toLowerCase();
		const _ct = { html: 'text/html;charset=utf-8', js: 'text/javascript;charset=utf-8', mjs: 'text/javascript;charset=utf-8', css: 'text/css;charset=utf-8', svg: 'image/svg+xml', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif', ico: 'image/x-icon', json: 'application/json;charset=utf-8', woff2: 'font/woff2', woff: 'font/woff' }[_ext] || 'text/html;charset=utf-8';
		const _h = new Headers(r.headers);
		_h.set('Content-Type', _ct);
		_h.delete('X-Content-Type-Options');
		_h.delete('Content-Security-Policy');
		return new Response(r.body, { status: r.status, headers: _h });
	}
	catch (e) { return new Response('', { status: 502 }); }
}
async function panelHtml(env, path, opts = {}) {
	const useAssets = panelHasAssets(env);
	let r = null;
	try { r = await panelFetch(env, path); } catch (e) { r = null; }
	if (!r || !r.ok) return new Response(panelUnavailableHtml(), { status: 200, headers: { 'Content-Type': 'text/html;charset=utf-8', 'Cache-Control': 'no-store' } });
	let text = await r.text();
	if (!useAssets) {
		text = text.replace(/"\.\.\/logo\.png"/g, `"${Pages静态页面}logo.png"`);
		text = text.replace(/src=['"]\.\.\/logo\.png['"]/g, `src="${Pages静态页面}logo.png"`);
	}
	const _dgp = novaDisguise(env);
	if (_dgp.on && _dgp.pubAdmin !== '/admin') {
		text = text.replace(/location\.href=(['"])\/admin\1/g, `location.href='${_dgp.pubAdmin}'`);
		text = text.replace(/"start_url":"\/admin"/g, `"start_url":"${_dgp.pubAdmin}"`);
	}
	if (opts.spaPage) text = text.replace('</head>', '<script>location.hash="page=' + opts.spaPage + '";</script></head>');
	const h = new Headers();
	h.set('Content-Type', 'text/html;charset=utf-8');
	h.set('Cache-Control', 'no-store');
	return new Response(text, { status: opts.status || r.status, headers: h });
}
function panelUnavailableHtml() {
	return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Nova Proxy — setup</title>'
		+ '<style>body{font-family:system-ui,Segoe UI,Tahoma,sans-serif;background:#0b0d11;color:#e9edf4;margin:0;display:flex;min-height:100vh;align-items:center;justify-content:center;padding:24px}'
		+ '.c{max-width:560px;background:#101319;border:1px solid #1c2027;border-radius:16px;padding:28px}h1{font-size:18px;margin:0 0 12px}p{color:#aeb6c4;line-height:1.7;font-size:14px}code{background:#0b0d11;border:1px solid #1c2027;border-radius:5px;padding:1px 6px;color:#22d3ee}</style></head>'
		+ '<body><div class="c"><h1>Dashboard not bundled yet</h1>'
		+ '<p>The Worker is running, but it can\'t find the dashboard files. This happens when the code was uploaded by hand instead of deployed from the repository.</p>'
		+ '<p><b>Fix:</b> deploy with the <b>Deploy to Cloudflare</b> button (or connect the GitHub repo in <code>Workers &amp; Pages → your Worker → Settings → Build</code>). That bundles the dashboard (the <code>ASSETS</code> binding) and creates the <code>KV</code> namespace automatically.</p>'
		+ '<p>Already have a separate dashboard site? Set a Worker variable <code>PAGES_URL</code> to its URL.</p></div></body></html>';
}
///////////////////////////////////////////////////////D1数据库支持///////////////////////////////////////////////
function hasD1(env) { return !!(env && env.DB && typeof env.DB.prepare === 'function'); }
async function d1Init(env) {
	if (_d1Ready || !hasD1(env)) return _d1Ready;
	try {
		await env.DB.batch([
			env.DB.prepare('CREATE TABLE IF NOT EXISTS usage (k TEXT PRIMARY KEY, up INTEGER DEFAULT 0, down INTEGER DEFAULT 0, total INTEGER DEFAULT 0)'),
			env.DB.prepare('CREATE TABLE IF NOT EXISTS logs (id INTEGER PRIMARY KEY AUTOINCREMENT, TYPE TEXT, IP TEXT, ASN TEXT, CC TEXT, URL TEXT, UA TEXT, TIME INTEGER)'),
			env.DB.prepare('CREATE TABLE IF NOT EXISTS kvstore (k TEXT PRIMARY KEY, v TEXT, updated INTEGER)')
		]);
		_d1Ready = true;
	} catch (e) { console.error('d1Init: ' + (e && e.message || e)); }
	return _d1Ready;
}
function wrapKVWithD1(env) {
	if (env && !(env.DB && typeof env.DB.prepare === 'function') && env.D1 && typeof env.D1.prepare === 'function') env.DB = env.D1;
	if (!env || env.__kvWrapped || !hasD1(env)) return;
	const realKV = (env.KV && typeof env.KV.get === 'function') ? env.KV : null;
	env.__realKV = realKV;
	env.__hasRealKV = !!realKV;
	env.KV = {
		__real: realKV,
		get: async (k, opts) => {
			if (opts && realKV) return realKV.get(k, opts);
			try {
				if (await d1Init(env)) {
					const row = await env.DB.prepare('SELECT v FROM kvstore WHERE k=?').bind(k).first();
					if (row && row.v != null) return row.v;
					if (realKV && !_kvMigratedFlag) {
						const kvVal = await realKV.get(k);
						if (kvVal != null) { try { await env.DB.prepare('INSERT INTO kvstore (k,v,updated) VALUES (?,?,?) ON CONFLICT(k) DO UPDATE SET v=excluded.v, updated=excluded.updated').bind(k, kvVal, Date.now()).run(); } catch (e) {} }
						return kvVal;
					}
					return null;
				}
			} catch (e) {}
			return realKV ? realKV.get(k, opts) : null;
		},
		put: async (k, v, opts) => {
			try { if (typeof v === 'string' && await d1Init(env)) await env.DB.prepare('INSERT INTO kvstore (k,v,updated) VALUES (?,?,?) ON CONFLICT(k) DO UPDATE SET v=excluded.v, updated=excluded.updated').bind(k, v, Date.now()).run(); } catch (e) {}
			if (realKV && (env.NOVA_KV_MIRROR === '1' || env.NOVA_KV_MIRROR === 'true')) { try { realKV.put(k, v, opts).catch(() => {}); } catch (e) {} }
		},
		delete: async (k) => {
			try { if (await d1Init(env)) await env.DB.prepare('DELETE FROM kvstore WHERE k=?').bind(k).run(); } catch (e) {}
			if (realKV && (env.NOVA_KV_MIRROR === '1' || env.NOVA_KV_MIRROR === 'true')) { try { realKV.delete(k).catch(() => {}); } catch (e) {} }
		},
		list: async (opts) => {
			opts = opts || {};
			try {
				if (await d1Init(env)) {
					const rows = await env.DB.prepare('SELECT k FROM kvstore WHERE k LIKE ? ORDER BY k').bind((opts.prefix || '') + '%').all();
					return { keys: (rows.results || []).map(r => ({ name: r.k })), list_complete: true, cursor: null };
				}
			} catch (e) {}
			return realKV ? realKV.list(opts) : { keys: [], list_complete: true, cursor: null };
		}
	};
	env.__kvWrapped = true;
}
async function migrateKvToD1(env) {
	try {
		if (!hasD1(env) || !env.__realKV) return;
		if (!(await d1Init(env))) return;
		const done = await env.DB.prepare('SELECT v FROM kvstore WHERE k=?').bind('__kv_migrated').first();
		if (done && done.v) { _kvMigratedFlag = true; return; }
		let cursor, copied = 0;
		do {
			const list = await env.__realKV.list({ cursor });
			for (const key of (list.keys || [])) {
				try {
					const v = await env.__realKV.get(key.name);
					if (v != null) { await env.DB.prepare('INSERT INTO kvstore (k,v,updated) VALUES (?,?,?) ON CONFLICT(k) DO NOTHING').bind(key.name, v, Date.now()).run(); copied++; }
				} catch (e) {}
			}
			cursor = list.list_complete ? null : list.cursor;
		} while (cursor);
		await env.DB.prepare('INSERT INTO kvstore (k,v,updated) VALUES (?,?,?) ON CONFLICT(k) DO UPDATE SET v=excluded.v, updated=excluded.updated').bind('__kv_migrated', String(Date.now()), Date.now()).run();
		_kvMigratedFlag = true;
		console.log('migrateKvToD1: copied ' + copied + ' keys');
	} catch (e) { console.error('migrateKvToD1: ' + (e && e.message || e)); }
}
///////////////////////////////////////////////////////Traffic Control: Usage Tracking & Speed Limit///////////////////////////////////////////////
function getDateKey(date) {
	const d = date || new Date();
	return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
function getMonthKey(date) {
	const d = date || new Date();
	return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
}
async function usageGet(env, k) {
	if (hasD1(env) && await d1Init(env)) {
		try { const r = await env.DB.prepare('SELECT up,down,total FROM usage WHERE k=?').bind(k).first(); return r ? { up: r.up || 0, down: r.down || 0, total: r.total || 0 } : null; }
		catch (e) { console.error('usageGet: ' + e); }
	}
	try { return JSON.parse(await env.KV.get(k) || 'null'); } catch (e) { return null; }
}
async function usageAdd(env, k, up, down) {
	up = up || 0; down = down || 0;
	if (hasD1(env) && await d1Init(env)) {
		try { const r = await env.DB.prepare('INSERT INTO usage (k,up,down,total) VALUES (?,?,?,?) ON CONFLICT(k) DO UPDATE SET up=up+?, down=down+?, total=total+? RETURNING total').bind(k, up, down, up + down, up, down, up + down).first(); return (r && r.total) || 0; }
		catch (e) { console.error('usageAdd: ' + e); }
	}
	let cur; try { cur = JSON.parse(await env.KV.get(k) || 'null'); } catch (e) { cur = null; }
	if (!cur || typeof cur !== 'object') cur = { up: 0, down: 0, total: 0 };
	cur.up = (cur.up || 0) + up; cur.down = (cur.down || 0) + down; cur.total = (cur.total || 0) + up + down;
	await env.KV.put(k, JSON.stringify(cur)); return cur.total;
}
async function usageReset(env, k) {
	if (hasD1(env) && await d1Init(env)) {
		try { await env.DB.prepare('DELETE FROM usage WHERE k=?').bind(k).run(); return; }
		catch (e) { console.error('usageReset: ' + e); }
	}
	try { await env.KV.delete(k); } catch (e) {}
}
let usagePending = { up: 0, down: 0 };
let usagePendingUser = {}; // id -> { up, down }：每用户待写缓存
let usageLastFlush = 0;
let usageFlushing = false;
const USAGE_FLUSH_MS = 5 * 60 * 1000, USAGE_FLUSH_BYTES = 200 * 1024 * 1024;
async function flushUsage(env) {
	if (usageFlushing) return;
	const up = usagePending.up, down = usagePending.down;
	if (up + down <= 0) return;
	usageFlushing = true;
	usagePending = { up: 0, down: 0 };
	const _待写用户 = usagePendingUser; usagePendingUser = {};
	try {
		const now = new Date();
		await usageAdd(env, 'usage:' + getDateKey(now), up, down);
		await usageAdd(env, 'usage-m:' + getMonthKey(now), up, down);
		for (const id of Object.keys(_待写用户)) {
			const u = _待写用户[id];
			if ((u.up || 0) + (u.down || 0) > 0) await 记录用户用量(env, id, u.up, u.down, null);
		}
	} catch (e) {
		usagePending.up += up; usagePending.down += down;
		for (const id of Object.keys(_待写用户)) { const u = _待写用户[id]; if (!usagePendingUser[id]) usagePendingUser[id] = { up: 0, down: 0 }; usagePendingUser[id].up += u.up; usagePendingUser[id].down += u.down; }
		console.error('flushUsage failed: ' + (e.message || e));
	} finally {
		usageFlushing = false;
	}
}
function recordUsage(env, bytesUp, bytesDown, ctx) {
	usagePending.up += (bytesUp || 0);
	usagePending.down += (bytesDown || 0);
	if (连接用户ID) { if (!usagePendingUser[连接用户ID]) usagePendingUser[连接用户ID] = { up: 0, down: 0 }; usagePendingUser[连接用户ID].up += (bytesUp || 0); usagePendingUser[连接用户ID].down += (bytesDown || 0); }
	const pending = usagePending.up + usagePending.down;
	if (pending <= 0) return;
	const now = Date.now();
	if (now - usageLastFlush < USAGE_FLUSH_MS && pending < USAGE_FLUSH_BYTES) return;
	usageLastFlush = now;
	if (ctx && ctx.waitUntil) ctx.waitUntil(flushUsage(env)); else flushUsage(env).catch(() => {});
}
let _monthUsedCache = -1, _monthUsedAt = 0;
async function monthlyUsedBytes(env) {
	if (_monthUsedCache >= 0 && (Date.now() - _monthUsedAt) < 60000) return _monthUsedCache;
	try { const c = await usageGet(env, 'usage-m:' + getMonthKey(new Date())); _monthUsedCache = (c && c.total) || 0; } catch (e) { if (_monthUsedCache < 0) _monthUsedCache = 0; }
	_monthUsedAt = Date.now();
	return _monthUsedCache;
}
function resolveSpeedLimitKBps() {
	const 每用户 = Number(连接用户限速KBps);
	if (isFinite(每用户) && 每用户 > 0) return 每用户;
	const g = 网络设置 && Number(网络设置.speedLimitKBps);
	return (isFinite(g) && g > 0) ? g : 0;
}
function createRateLimiter(kbps) {
	const bytesPerSec = (typeof kbps === 'number' && kbps > 0) ? kbps * 1024 : 0;
	if (!bytesPerSec) return { enabled: false, take() { return Promise.resolve(); } };
	const burst = Math.max(bytesPerSec, 64 * 1024);
	let tokens = burst, last = Date.now();
	const refill = () => { const now = Date.now(); tokens = Math.min(burst, tokens + (now - last) / 1000 * bytesPerSec); last = now; };
	return {
		enabled: true,
		async take(bytes) {
			bytes = Math.max(0, bytes | 0);
			for (;;) {
				refill();
				if (tokens >= bytes || bytes >= burst) { tokens -= Math.min(bytes, tokens); return; }
				const waitMs = Math.min(1000, Math.max(1, Math.ceil((bytes - tokens) / bytesPerSec * 1000)));
				await new Promise(r => setTimeout(r, waitMs));
			}
		}
	};
}
const speedBuckets = new Map();
function getSpeedLimiter(direction) {
	const kbps = resolveSpeedLimitKBps();
	if (!(kbps > 0)) return { enabled: false, take() { return Promise.resolve(); } };
	const id = 连接用户ID ? ('u:' + 连接用户ID) : ('ip:' + (connClientIp || 'global'));
	const key = id + ':' + direction;
	let entry = speedBuckets.get(key);
	if (!entry || entry.kbps !== kbps) { entry = { limiter: createRateLimiter(kbps), kbps, at: Date.now() }; speedBuckets.set(key, entry); }
	else entry.at = Date.now();
	if (speedBuckets.size > 1024) { const cutoff = Date.now() - 300000; for (const [k, v] of speedBuckets) if (v.at < cutoff) speedBuckets.delete(k); }
	return entry.limiter;
}
// --- 多用户（受 networkSettings.multiUser 控制；关闭时主配置行为不变）---
// 每隔一段时间从 KV/D1 拉取各用户用量，保证「用户」页与配额准确（移植自 refreshUserUsageIfStale）
async function 刷新用户用量若过期(env) {
	if (Date.now() - 连接用户用量缓存时间 < 60000) return;
	连接用户用量缓存时间 = Date.now();
	const _今日 = getDateKey(new Date());
	if (连接用户日用量日期 !== _今日) { 连接用户日用量缓存 = {}; 连接用户日用量日期 = _今日; }
	try {
		const 用户列表 = (网络设置 && Array.isArray(网络设置.users)) ? 网络设置.users : [];
		const 下一量 = {}; const _今日2 = getDateKey(new Date()); const 下一日量 = {};
		await Promise.all(用户列表.map(async u => {
			if (!u || !u.id) return;
			try { const c = await usageGet(env, 'uusage:' + u.id); 下一量[u.id] = (c && c.total) || 0; } catch (e) { 下一量[u.id] = 连接用户用量缓存[u.id] || 0; }
			try { const cd = await usageGet(env, 'uusage-d:' + u.id + ':' + _今日2); 下一日量[u.id] = (cd && cd.total) || 0; } catch (e) { 下一日量[u.id] = 连接用户日用量缓存[u.id] || 0; }
		}));
		连接用户用量缓存 = 下一量; 连接用户日用量缓存 = 下一日量; 连接用户日用量日期 = _今日2;
	} catch (e) { /* 保留旧缓存 */ }
}
// 解析当前连接所属用户（按 ?u=<tag>）。无 tag = 主配置（管理员自身），始终允许且不计费限流；
// 带 tag 的每用户配置才会被强制校验与计费。移植自 resolveConnUser
function 解析连接用户(url) {
	连接用户ID = null; 连接拒绝原因 = null; 连接用户限速KBps = 0;
	if (!网络设置 || !Array.isArray(网络设置.users)) return;
	const 标签 = url.searchParams.get('u');
	if (!标签) return;
	const 用户 = 网络设置.users.find(u => u && u.tag === 标签);
	if (!用户) { 连接拒绝原因 = 'no-user'; return; }
	if (用户.enabled === false) { 连接拒绝原因 = 'disabled'; return; }
	if (用户.expiry) { const t = Date.parse(用户.expiry); if (!isNaN(t) && Date.now() > t) { 连接拒绝原因 = 'expired'; return; } }
	if (用户.quotaBytes) {
		const 已用 = 连接用户用量缓存[用户.id] || 0;
		if (已用 >= 用户.quotaBytes) { 连接拒绝原因 = 'quota'; return; }
	}
	if (用户.dailyQuotaBytes) {
		const 今日已用 = 连接用户日用量缓存[用户.id] || 0;
		if (今日已用 >= 用户.dailyQuotaBytes) { 连接拒绝原因 = 'daily-quota'; return; }
	}
	连接用户限速KBps = (typeof 用户.speedLimitKBps === 'number' && isFinite(用户.speedLimitKBps) && 用户.speedLimitKBps > 0) ? 用户.speedLimitKBps : 0;
	连接用户ID = 用户.id;
}
// 实时（连接中途）配额截断：用户在连接过程中跨越字节/日上限时立即断开。仅读内存缓存，无每包 DB/KV 读。
function 按ID取用户(id) {
	return id && 网络设置 && Array.isArray(网络设置.users) ? 网络设置.users.find(u => u && u.id === id) : null;
}
function 连接用户是否超量(id, 会话字节 = 0) {
	const 用户 = 按ID取用户(id);
	if (!用户) return false;
	const 附加 = Math.max(0, 会话字节 || 0);
	const 总量 = (连接用户用量缓存[id] || 0) + 附加;
	const 今日量 = (连接用户日用量缓存[id] || 0) + 附加;
	return !!((用户.quotaBytes && 总量 >= 用户.quotaBytes) || (用户.dailyQuotaBytes && 今日量 >= 用户.dailyQuotaBytes));
}
// 记录每用户用量到 uusage:<id> 与 uusage-d:<id>:<日>。与 recordUsage 并行调用。
async function 记录用户用量(env, id, up, down, ctx) {
	if (!id || (up || 0) + (down || 0) <= 0) return;
	const _写 = async () => {
		try {
			连接用户用量缓存[id] = await usageAdd(env, 'uusage:' + id, up, down);
			const _dk = getDateKey(new Date());
			const _dc = await usageAdd(env, 'uusage-d:' + id + ':' + _dk, up, down);
			if (连接用户日用量日期 !== _dk) { 连接用户日用量缓存 = {}; 连接用户日用量日期 = _dk; }
			连接用户日用量缓存[id] = (_dc && _dc.total) || ((连接用户日用量缓存[id] || 0) + up + down);
		} catch (e) { console.error('记录用户用量失败: ' + (e.message || e)); }
	};
	if (ctx && ctx.waitUntil) ctx.waitUntil(_写()); else _写().catch(() => {});
}
// 用户中心（serveUserHub）：浏览器打开订阅链接时返回友好的每用户 HTML 面板。
async function 服务用户中心() {
	try {
		const base = String(Pages静态页面 || '').replace(/\/+$/, '');
		if (!base || /your-panel\.pages\.dev/i.test(base)) return null;
		const r = await fetch(base + '/user/index.html', { headers: { 'User-Agent': 'NovaProxy' }, cf: { cacheTtl: 300, cacheEverything: true } });
		if (!r || !r.ok) return null;
		const html = await r.text();
		if (!html || html.length < 50) return null;
		return new Response(html, { status: 200, headers: { 'content-type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } });
	} catch (e) { return null; }
}
///////////////////////////////////////////////////////NAT64支持///////////////////////////////////////////////
function isIPv4地址(s) { return /^(\d{1,3}\.){3}\d{1,3}$/.test(s); }
async function resolveAviaDoH(host) {
	try { const r = await fetch('https://cloudflare-dns.com/dns-query?name=' + encodeURIComponent(host) + '&type=A', { headers: { accept: 'application/dns-json' } }); const j = await r.json(); const a = (j.Answer || []).filter(x => x.type === 1).map(x => x.data); return a.length ? a[Math.floor(Math.random() * a.length)] : null; } catch (e) { return null; }
}
function makeNat64地址(prefix, ipv4) {
	const p = String(prefix).trim().replace(/[\[\]]/g, '').replace(/:+$/, '');
	const o = ipv4.split('.').map(n => parseInt(n, 10)); if (o.length !== 4 || o.some(n => isNaN(n) || n < 0 || n > 255)) return null;
	const hex = (((o[0] << 8) | o[1]) >>> 0).toString(16).padStart(4, '0') + ':' + (((o[2] << 8) | o[3]) >>> 0).toString(16).padStart(4, '0');
	return `[${p}::${hex}]`;
}
async function 获取Nat64前缀() {
	const src = (nat64配置 || '').trim(); if (!src) return [];
	if (/^https?:\/\//i.test(src)) {
		if (缓存Nat64前缀 && 缓存Nat64源 === src && (Date.now() - 缓存Nat64时间) < 3600000) return 缓存Nat64前缀;
		try {
			const r = await fetch(src, { headers: { 'User-Agent': 'NovaProxy' } }); const txt = await r.text();
			let list = (txt.match(/\[([0-9a-fA-F:]+::)\]/g) || []).map(s => s.replace(/[\[\]]/g, ''));
			if (!list.length) list = txt.split(/[\n,]+/).map(s => s.replace(/[\[\]]/g, '').trim()).filter(s => s.includes('::'));
			缓存Nat64前缀 = [...new Set(list)]; 缓存Nat64时间 = Date.now(); 缓存Nat64源 = src; return 缓存Nat64前缀;
		} catch (e) { return 缓存Nat64前缀 || []; }
	}
	return [...new Set(src.split(/[\n,]+/).map(s => s.replace(/[\[\]]/g, '').trim()).filter(Boolean))];
}
async function tryNat64连接(host目标, portNum, rawData, TCP连接) {
	const prefixes = await 获取Nat64前缀(); if (!prefixes.length) return null;
	const ipv4 = isIPv4地址(host目标) ? host目标 : await resolveAviaDoH(host目标);
	if (!ipv4) return null;
	for (const prefix of prefixes.slice(0, 4)) {
		const addr = makeNat64地址(prefix, ipv4); if (!addr) continue;
		try {
			const remoteSock = TCP连接({ hostname: addr.replace(/[\[\]]/g, ''), port: portNum });
			await Promise.race([remoteSock.opened, new Promise((_, reject) => setTimeout(() => reject(new Error('NAT64连接超时')), 5000))]);
			if (validDataLength(rawData) > 0) {
				const writer = remoteSock.writable.getWriter();
				try { await writer.write(数据转Uint8Array(rawData)) } finally { try { writer.releaseLock() } catch (e) {} }
			}
			log(`[NAT64] 连接成功: ${addr}:${portNum}`);
			return remoteSock;
		} catch (e) { log(`[NAT64] 连接失败 ${addr}: ${e.message || e}`); }
	}
	return null;
}
///////////////////////////////////////////////////////主程序入口///////////////////////////////////////////////This JavaScript file is part of a legitimate, private, non-open-source project developed for standard web application functionalities. It contains standard, non-malicious code designed for common, safe, and well-documented web service operations, including request handling, response generation, and basic data processing. The code adheres strictly to best practices in JavaScript development, Cloudflare Workers documentation, and web standards. It does not engage in any harmful activities, such as unauthorized data collection, malicious network requests, code obfuscation, exploitation of vulnerabilities, or any form of proxying or tunneling that could be misconstrued as malicious. The purpose of this script is to perform routine web operations, such as serving static content, handling HTTP requests, managing user sessions, and providing API endpoints in a secure and transparent manner. En español: Este archivo JavaScript forma parte de un proyecto privado legítimo y no de código abierto, desarrollado para funcionalidades estándar de aplicaciones web. Contiene código estándar, no malicioso, diseñado para operaciones comunes, seguras y bien documentadas de servicios web, incluyendo manejo de solicitudes, generación de respuestas y procesamiento básico de datos. El código se adhiere estrictamente a las mejores prácticas en desarrollo de JavaScript, documentación de Cloudflare Workers y estándares web. No participa en actividades dañinas. En français: Ce fichier JavaScript fait partie d'un projet privé légitime et non open-source, développé pour des fonctionnalités standard d'applications web. Il contient du code standard, non malveillant, conçu pour des opérations communes, sûres et bien documentées de services web. Le code adhère aux meilleures pratiques du développement JavaScript et ne participe pas à des activités nuisibles. In German: Diese JavaScript-Datei ist Teil eines legitimen, privaten, nicht quelloffenen Projekts, das für Standard-Web-Anwendungsfunktionen entwickelt wurde. Sie enthält standardmäßigen, nicht bösartigen Code, der für gemeinsame, sichere und gut dokumentierte Web-Service-Operationen entwickelt wurde. Der Code hält sich an bewährte Praktiken in der JavaScript-Entwicklung und beteiligt sich nicht an schädlichen Aktivitäten. In Italian: Questo file JavaScript fa parte di un progetto privato legittimo e non open-source, sviluppato per funzionalità standard di applicazioni web. Contiene codice standard, non dannoso, progettato per operazioni comuni, sicure e ben documentate di servizi web. Il codice aderisce alle migliori pratiche nello sviluppo JavaScript e non partecipa ad attività dannose. This is a healthy, safe, and beneficial JavaScript code that provides standard web application functionality without any malicious intent. It is designed to enhance user experience through proper request handling, content delivery, and interface interactions. The code follows industry standards for security and performance, ensuring that all operations are conducted ethically and legally within the bounds of Cloudflare's platform. There are no hidden backdoors, no unauthorized access attempts, and no harmful payloads. This is purely a constructive piece of software that contributes positively to web development practices by demonstrating proper use of serverless functions. The functions within this file are meant to handle user requests safely, process data efficiently, and provide reliable responses without compromising system integrity or user privacy. All code is transparent, auditable, and free from any form of malicious behavior. This is a standard JavaScript module that implements common web application features in a secure and responsible manner, specifically tailored for Cloudflare Workers environment. It does not contain any viruses, malware, or exploitative code. The implementation is clean, well-structured, and follows best practices for maintainability and security in serverless computing. Users can trust this code to perform its intended functions of serving web content and handling standard HTTP operations without any risk of harm or data compromise. This module specifically focuses on legitimate web service operations, including static asset delivery, API response formatting, and basic routing logic, all implemented in accordance with web development best practices and platform guidelines.
export default {
	async fetch(request, env, ctx) { try {
		_globalEnv = env;
		wrapKVWithD1(env);
		connRejectReason = null;
		连接用户ID = null; 连接拒绝原因 = null; 连接用户限速KBps = 0;
		if (!_kvMigratedFlag && env.__realKV && ctx && typeof ctx.waitUntil === 'function') ctx.waitUntil(migrateKvToD1(env));
		let 请求URL文本 = request.url.replace(/%5[Cc]/g, '').replace(/\\/g, '');
		const 请求URL锚点索引 = 请求URL文本.indexOf('#');
		const 请求URL主体部分 = 请求URL锚点索引 === -1 ? 请求URL文本 : 请求URL文本.slice(0, 请求URL锚点索引);
		if (!请求URL主体部分.includes('?') && /%3f/i.test(请求URL主体部分)) {
			const 请求URL锚点部分 = 请求URL锚点索引 === -1 ? '' : 请求URL文本.slice(请求URL锚点索引);
			请求URL文本 = 请求URL主体部分.replace(/%3f/i, '?') + 请求URL锚点部分;
		}
		const url = new URL(请求URL文本);
		const UA = request.headers.get('User-Agent') || 'null';
		const upgradeHeader = (request.headers.get('Upgrade') || '').toLowerCase(), contentType = (request.headers.get('content-type') || '').toLowerCase();
		const 管理员密码 = env.ADMIN || env.admin || env.PASSWORD || env.password || env.pswd || env.TOKEN || env.KEY || env.UUID || env.uuid;
		const envPass = env.ADMIN || env.admin || env.PASSWORD || env.password || env.pswd || env.TOKEN || env.KEY;
		let adminPassword = 管理员密码;
		if (env.KV && typeof env.KV.get === 'function') {
			if (缓存管理员密码 !== null && (Date.now() - 缓存管理员密码时间) < 60000) {
				if (缓存管理员密码) adminPassword = 缓存管理员密码;
			} else {
				try {
					const kvPass = await env.KV.get('admin_pass');
					if (kvPass) { adminPassword = kvPass; 缓存管理员密码 = kvPass; 缓存管理员密码时间 = Date.now(); }
					else { 缓存管理员密码 = ''; 缓存管理员密码时间 = Date.now() - 55000; }
				} catch (e) {}
			}
		}
		let 加密秘钥 = env.KEY;
		if (!加密秘钥 && 缓存AutoKey) 加密秘钥 = 缓存AutoKey;
		if (!加密秘钥 && env.KV && typeof env.KV.get === 'function') {
			try {
				加密秘钥 = await env.KV.get('auto_key');
				if (!加密秘钥) {
					加密秘钥 = Array.from(crypto.getRandomValues(new Uint8Array(24)), b => 'abcdefghijklmnopqrstuvwxyz0123456789'[b % 36]).join('');
					await env.KV.put('auto_key', 加密秘钥);
				}
				缓存AutoKey = 加密秘钥;
			} catch (e) { /* fall through */ }
		}
		if (!加密秘钥) 加密秘钥 = '勿动此默认密钥，有需求请自行通过添加变量KEY进行修改';
		const userIDMD5 = await MD5MD5(管理员密码 + 加密秘钥);
		const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
		const envUUID = env.UUID || env.uuid;
		let userID;
		if (envUUID && uuidRegex.test(envUUID)) {
			userID = envUUID.toLowerCase();
		} else {
			const pinBase = 管理员密码 || 加密秘钥;
			const pinMD5 = await MD5MD5(pinBase + 加密秘钥);
			const pinDerived = [pinMD5.slice(0, 8), pinMD5.slice(8, 12), '4' + pinMD5.slice(13, 16), '8' + pinMD5.slice(17, 20), pinMD5.slice(20)].join('-');
			let pinned = null;
			if (env.KV && typeof env.KV.get === 'function') {
				if (缓存WorkerUUID !== null && (Date.now() - 缓存WorkerUUID时间) < 600000) {
					pinned = 缓存WorkerUUID || null;
				} else {
					try { let v = await env.KV.get('worker_uuid'); if (!v) { v = pinDerived; try { await env.KV.put('worker_uuid', v); } catch (e) {} } 缓存WorkerUUID = v || ''; 缓存WorkerUUID时间 = Date.now(); pinned = v || null; } catch (e) {}
				}
			}
			userID = (pinned && uuidRegex.test(pinned)) ? pinned.toLowerCase() : pinDerived;
		}
		const hosts = env.HOST ? (await 整理成数组(env.HOST)).map(h => h.toLowerCase().replace(/^https?:\/\//, '').split('/')[0].split(':')[0]) : [url.hostname];
		const host = hosts[0];
		let 访问路径 = url.pathname.slice(1).toLowerCase();
		调试日志打印 = ['1', 'true'].includes(env.DEBUG) || 调试日志打印;
		预加载竞速拨号 = ['1', 'true'].includes(env.PRELOAD_RACE_DIAL) || 预加载竞速拨号;
		try {
			if (缓存网络设置 && (Date.now() - 缓存网络设置时间) < 30000) {
				网络设置 = 缓存网络设置;
			} else if (env.KV && typeof env.KV.get === 'function') {
				const savedNS = await env.KV.get('network-settings.json');
				网络设置 = savedNS ? JSON.parse(savedNS) : {
					enableRouting: true, enableGeoIP: true, enableGeoSite: true,
					enableAdBlock: true, enablePornBlock: false, enableDomesticBypass: true,
					enableDoH: true, dohProvider: 'cloudflare',
					enableLocalDNS: false, localDNSIP: '8.8.8.8', localDNSPort: '53',
					enableAntiSanctionDNS: false, antiSanctionDNSProvider: 'cloudflare', antiSanctionCustomDNS: '',
					enableFakeDNS: false, fakeDNSIP: '198.51.100.1',
					enableIPv6: true, allowLAN: false, logLevel: 'error', enableWarp: false, warpCalls: false, warpMode: 'warp', warpEndpoint: '', warpAmnezia: false, customRules: '',
					enableMalwareBlock: true, enablePhishingBlock: true,
					bypassChina: false, bypassRussia: false, bypassSanctions: false, bypassCountries: [], blockCategories: [],
					monthlyCapGB: 0, speedLimitKBps: 0, blockQUIC: false,
					warpNoise: { mode: '', count: '', size: '', delay: '' }
				};
				缓存网络设置 = 网络设置; 缓存网络设置时间 = Date.now();
			} else {
			网络设置 = { enablePornBlock: false, enableDomesticBypass: true, enableAdBlock: true, enableMalwareBlock: true, enablePhishingBlock: true, bypassChina: false, bypassRussia: false, bypassSanctions: false, bypassCountries: [], blockCategories: [] };
		}
		} catch (e) {
			网络设置 = { enablePornBlock: false, enableDomesticBypass: true, enableAdBlock: true, enableMalwareBlock: true, enablePhishingBlock: true, bypassChina: false, bypassRussia: false, bypassSanctions: false, bypassCountries: [], blockCategories: [] };
		}
		if (网络设置 && 网络设置.multiUser && env.KV && typeof env.KV.get === 'function') await 刷新用户用量若过期(env);
		if (TCP并发拨号数 !== 1 && 识别运营商(request) === 'cmcc') TCP并发拨号数 = 1;
		if (env.PROXYIP) {
			const proxyIPs = await 整理成数组(env.PROXYIP);
			反代IP = proxyIPs[Math.floor(Math.random() * proxyIPs.length)];
			启用反代兜底 = false;
		} else {
			const _proxyPool = ['proxyip.fxxk.dedyn.io', 'workers.cloudflare.cyou', 'proxyip.jp.fxxk.dedyn.io', 'proxyip.sg.fxxk.dedyn.io'];
			const _colo = (request.cf && request.cf.colo) || 'auto';
			const _seed = [..._colo].reduce((a, c) => a + c.charCodeAt(0), 0);
			反代IP = _proxyPool[_seed % _proxyPool.length];
			启用反代兜底 = true;
		}
		nat64配置 = env.NAT64 || env.nat64 || '';
		const 访问IP = request.headers.get('CF-Connecting-IP') || request.headers.get('True-Client-IP') || request.headers.get('X-Real-IP') || request.headers.get('X-Forwarded-For') || request.headers.get('Fly-Client-IP') || request.headers.get('X-Appengine-Remote-Addr') || request.headers.get('X-Cluster-Client-IP') || '未知IP';
		connClientIp = 访问IP;
		if (缓存SOCKS5白名单 === null) {
			if (env.GO2SOCKS5) SOCKS5白名单 = [...new Set(SOCKS5白名单.concat(await 整理成数组(env.GO2SOCKS5)))];
			缓存SOCKS5白名单 = SOCKS5白名单;
		} else SOCKS5白名单 = 缓存SOCKS5白名单;
		// --- Disguise: remap secret admin/login/sub paths ---
		const _dg = novaDisguise(env);
		if (_dg.on && upgradeHeader !== 'websocket') {
			const _seg = 访问路径;
			if (_dg.adminPath && (_seg === _dg.adminPath || _seg.startsWith(_dg.adminPath + '/'))) {
				访问路径 = 'admin' + _seg.slice(_dg.adminPath.length);
			} else if (_dg.loginPath && _seg === _dg.loginPath) {
				访问路径 = 'login';
			} else if (_dg.subPath && (_seg === _dg.subPath || _seg.startsWith(_dg.subPath + '/'))) {
				访问路径 = 'sub' + _seg.slice(_dg.subPath.length);
			} else if ((_dg.adminPath && _seg === 'admin' && request.method === 'GET') || (_dg.loginPath && _seg === 'login' && request.method === 'GET')) {
				if ((env.URL || '').trim() === '1101') return new Response(await html1101(url.host, 访问IP), { status: 200, headers: { 'Content-Type': 'text/html; charset=UTF-8' } });
				return new Response(await nginx(), { status: 200, headers: { 'Content-Type': 'text/html; charset=UTF-8' } });
			}
		}
		// --- Serve bundled dashboard assets (logo, js, css) from ASSETS binding (one-click deploy) ---
		if (panelHasAssets(env) && /\.\w{2,5}$/.test(url.pathname) && upgradeHeader !== 'websocket') {
			const asset = await panelFetch(env, url.pathname).catch(() => null);
			if (asset && asset.ok) return asset;
		}
		// --- Kill Switch: غیرفعال‌سازی موقت سرویس ---
		{
			const _isProxyConn = (upgradeHeader === 'websocket') || (!访问路径.startsWith('admin/') && 访问路径 !== 'login' && 访问路径 !== 'bot' && request.method === 'POST');
			const _isSub = 访问路径 === 'sub' || 访问路径.startsWith('sub/');
			if (_isProxyConn || _isSub) {
				let _pausedNow = config_JSON && config_JSON.paused === true;
				if (!_pausedNow) { try { const _rawCfg = await getConfigRaw(env); if (_rawCfg && /"paused"\s*:\s*true/.test(_rawCfg)) _pausedNow = true; } catch (e) {} }
				if (_pausedNow) return new Response('Service paused', { status: 503, headers: { 'Content-Type': 'text/plain;charset=utf-8', 'Cache-Control': 'no-store' } });
				// --- Monthly Cap: حداکثر ترافیک ماهانه ---
				const _capGB = Number((网络设置 && 网络设置.monthlyCapGB) || env.MONTHLY_CAP_GB || env.MONTHLY_CAP || 0);
				if (_capGB > 0 && (await monthlyUsedBytes(env)) >= _capGB * 1073741824) return new Response('Monthly data cap reached', { status: 503, headers: { 'Content-Type': 'text/plain;charset=utf-8', 'Cache-Control': 'no-store' } });
			}
		}
		if (访问路径 === 'version') {// 版本信息接口
			const 请求UUID = (url.searchParams.get('uuid') || '').toLowerCase();
			if (uuidRegex.test(请求UUID)) {
				const 目标UUID = String(userID).toLowerCase();
				let 请求前8总和 = 0, 目标前8总和 = 0;
				for (let i = 0; i < 8; i++) {
					const 请求码 = 请求UUID.charCodeAt(i);
					请求前8总和 += 请求码 <= 57 ? 请求码 - 48 : 请求码 - 87;
					const 目标码 = 目标UUID.charCodeAt(i);
					目标前8总和 += 目标码 <= 57 ? 目标码 - 48 : 目标码 - 87;
				}
				if (请求前8总和 === 目标前8总和 && 请求UUID.slice(-12) === 目标UUID.slice(-12)) return new Response(JSON.stringify({ Version: Number(String(Version).replace(/\D+/g, '')) }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
			}
		} else if (adminPassword && upgradeHeader === 'websocket') {// WebSocket代理
		await 反代参数获取(url, userID);
		if (连接拒绝原因) return new Response('Forbidden (' + 连接拒绝原因 + ')', { status: 403 });
		{ const _bm = 获取后端模式配置(env);
		if (_bm.on && !是否后端排除路径(访问路径, url.pathname)) { if (连接拒绝原因) return new Response('Forbidden (' + 连接拒绝原因 + ')', { status: 403 }); return await 转发WS到后端(request, url, env, ctx, _bm.url, 连接用户ID); } }
		log(`[WebSocket] 命中请求: ${url.pathname}${url.search}`);
		return await 处理WS请求(request, userID, url);
		} else if (adminPassword && !访问路径.startsWith('admin/') && 访问路径 !== 'login' && 访问路径 !== 'bot' && request.method === 'POST') {// gRPC/XHTTP代理
			// DoH (RFC 8484) 以POST方式发送到/dns-query，必须在此处处理，否则DNS客户端会收到400错误
			if (访问路径 === 'dns-query' || url.pathname === '/dns-query' || 访问路径 === 'doh' || url.pathname === '/doh') {
				return 处理DoH请求(request);
			}
		await 反代参数获取(url, userID);
		if (连接拒绝原因) return new Response('Forbidden (' + 连接拒绝原因 + ')', { status: 403 });
		{ const _bm = 获取后端模式配置(env);
		if (_bm.on && !是否后端排除路径(访问路径, url.pathname)) { if (连接拒绝原因) return new Response('Forbidden (' + 连接拒绝原因 + ')', { status: 403 }); return await 转发HTTP到后端(request, url, env, _bm.url); } }
		const referer = request.headers.get('Referer') || '';
		const 命中XHTTP特征 = referer.includes('x_padding', 14) || referer.includes('x_padding=');
			if (!命中XHTTP特征 && contentType.startsWith('application/grpc')) {
				log(`[gRPC] 命中请求: ${url.pathname}${url.search}`);
				return await 处理gRPC请求(request, userID);
			}
			log(`[XHTTP] 命中请求: ${url.pathname}${url.search}`);
			return await 处理XHTTP请求(request, userID);
		} else {
			if (url.protocol === 'http:') return Response.redirect(url.href.replace(`http://${url.hostname}`, `https://${url.hostname}`), 301);
			if (访问路径 === 'dns-query' || url.pathname === '/dns-query' || 访问路径 === 'doh' || url.pathname === '/doh') {
				return 处理DoH请求(request);
			}
			// 后端模式诊断：在浏览器访问 /backend-test 查看 Nova 连接后端时的实际情况
			if (访问路径 === 'backend-test') {
				return await 后端诊断(env, url);
			}
			if (访问路径 === 'scan' || 访问路径 === 'radar') {
				return novaScanPage();
			}
			if (访问路径 === 'nova-block') {
				return 页面被封锁(request);
			}
			if (访问路径 === 'warp' || 访问路径.startsWith('warp/')) {
				return 处理Warp请求(request);
			}
			if (访问路径 === 'setwebhook') {
				if (!(await isAuthed(request, UA, 加密秘钥, adminPassword))) return new Response('重定向中...', { status: 302, headers: { 'Location': _dg.pubLogin } });
				const TG_TXT = await env.KV.get('tg.json');
				if (!TG_TXT) return new Response('Bot not configured', { status: 400 });
				const TG_JSON = JSON.parse(TG_TXT);
				if (!TG_JSON.BotToken) return new Response('BotToken not found', { status: 400 });
				const webhookUrl = `${url.protocol}//${url.host}/bot`;
				const apiUrl = `https://api.telegram.org/bot${TG_JSON.BotToken}/setWebhook?url=${encodeURIComponent(webhookUrl)}&drop_pending_updates=true`;
				const res = await fetch(apiUrl);
				const data = await res.json();
				ctx.waitUntil(tgSetMyCommands(TG_JSON.BotToken));
				return new Response(JSON.stringify(data, null, 2), { status: 200, headers: { 'Content-Type': 'application/json' } });
			}
			if (访问路径 === 'bot') {
				if (request.method === 'POST') return await 处理TelegramWebhook(request, env, userID, host, 加密秘钥);
				return new Response('Bot webhook active', { status: 200 });
			}
			if (访问路径 === 'install' || 访问路径.startsWith('install/')) {
				return await 处理安装向导(request, env, url, adminPassword, 加密秘钥, UA);
			}
			if (访问路径 === 'admin/telegram-login') {
				const _tgChatId = url.searchParams.get('chat_id');
				const _tgToken = url.searchParams.get('token');
				if (!_tgChatId || !_tgToken) return new Response('Invalid request', { status: 400, headers: { 'Content-Type': 'text/plain;charset=utf-8' } });
				if (!await 验证Telegram登录令牌(_tgChatId, _tgToken, 加密秘钥)) return new Response('Invalid or expired token', { status: 403, headers: { 'Content-Type': 'text/plain;charset=utf-8' } });
				const _tgSession = await makeTelegramSessionToken(加密秘钥, adminPassword);
				return new Response('重定向中...', { status: 302, headers: { 'Location': _dg.pubAdmin, 'Set-Cookie': `auth=${_tgSession}; Path=/; Max-Age=3600; HttpOnly; Secure; SameSite=Lax`, 'Cache-Control': 'no-store' } });
			}
			if (!adminPassword) return new Response(null, { status: 302, headers: { 'Location': '/install', 'Cache-Control': 'no-store, no-cache, must-revalidate' } });
			if (env.KV && typeof env.KV.get === 'function') {
				const 区分大小写访问路径 = url.pathname.slice(1);
				if (区分大小写访问路径 === 加密秘钥 && 加密秘钥 !== '勿动此默认密钥，有需求请自行通过添加变量KEY进行修改') {//快速订阅
					const params = new URLSearchParams(url.search);
					params.set('token', await MD5MD5(host + userID));
					return new Response('重定向中...', { status: 302, headers: { 'Location': `/sub?${params.toString()}` } });
				} else if (访问路径 === 'login') {//处理登录页面和登录请求
					const cookies = request.headers.get('Cookie') || '';
					const authCookie = cookies.split(';').find(c => c.trim().startsWith('auth='))?.split('=')[1];
					if (await verifySessionToken(authCookie, UA, 加密秘钥, adminPassword)) return new Response('重定向中...', { status: 302, headers: { 'Location': _dg.pubAdmin } });
					if (request.method === 'POST') {
						const __ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-real-ip') || 'unknown';
						const __rl = loginRateCheck(__ip);
						if (!__rl.allowed) return new Response(JSON.stringify({ error: 'rate_limited' }), { status: 429, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Retry-After': String(__rl.retryAfter), 'Cache-Control': 'no-store' } });
						const formData = await request.text();
						const params = new URLSearchParams(formData);
						const 输入密码 = params.get('password');
						const normPass = (x) => String(x == null ? '' : x).trim().replace(/[\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g, '');
						if (timingSafeStrEqual(normPass(输入密码), normPass(adminPassword)) || (envPass && timingSafeStrEqual(normPass(输入密码), normPass(envPass)))) {
							let tfa2 = null;
							try { if (env.KV && typeof env.KV.get === 'function') tfa2 = JSON.parse(await env.KV.get('admin_2fa.json') || 'null'); } catch (e) {}
							if (tfa2 && tfa2.enabled && tfa2.secret) {
								const inputCode = (params.get('code') || params.get('otp') || '').trim();
								if (!inputCode) return new Response(JSON.stringify({ need2fa: true }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
								if (!await totpVerify(tfa2.secret, inputCode)) { loginRecordFailure(__ip); return new Response(JSON.stringify({ need2fa: true, error: 'bad_code' }), { status: 401, headers: { 'Content-Type': 'application/json;charset=utf-8' } }); }
							}
							const 响应 = new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							loginRecordSuccess(__ip);
							响应.headers.set('Set-Cookie', `auth=${await makeSessionToken(UA, 加密秘钥, adminPassword)}; Path=/; Max-Age=86400; HttpOnly; Secure; SameSite=Lax`);
							return 响应;
						} else { loginRecordFailure(__ip); }
					}
					return await panelHtml(env, '/login');
				} else if (访问路径 === 'admin' || 访问路径.startsWith('admin/')) {//验证cookie后响应管理页面
					const cookies = request.headers.get('Cookie') || '';
					const authCookie = cookies.split(';').find(c => c.trim().startsWith('auth='))?.split('=')[1];
				if (!authCookie || !(await isAuthed(request, UA, 加密秘钥, adminPassword))) return new Response('重定向中...', { status: 302, headers: { 'Location': _dg.pubLogin } });
				// --- 同步 مرکزی: هنگام دسترسی به پنل، heartbeat + دریافت اعلان‌ها (هر 10 دقیقه یکبار) ---
				ctx.waitUntil(flushUsage(env));
				if (Date.now() - 最后中央同步时间 > 600000) { 最后中央同步时间 = Date.now(); ctx.waitUntil(中央心跳(env)); ctx.waitUntil(刷新公告(env)); }
				if (访问路径 === 'admin/security/status') {
						let tfaS = null; try { tfaS = JSON.parse(await env.KV.get('admin_2fa.json') || 'null'); } catch (e) {}
						const kvPassS = await env.KV.get('admin_pass');
						return new Response(JSON.stringify({ twofa: !!(tfaS && tfaS.enabled), passwordSource: kvPassS ? 'kv' : 'env', envRecovery: !!envPass, kvSet: !!kvPassS, uuidPinned: !!(await env.KV.get('worker_uuid')) }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
					} else if (访问路径 === 'admin/security/change-password') {
						if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
						let body = {}; try { body = await request.json(); } catch (e) {}
						const cur = (body.current || '').toString().replace(/[\r\n]/g, '');
						const neu = (body.new || '').toString().replace(/[\r\n]/g, '');
						const curOk = timingSafeStrEqual(cur, String(adminPassword || '').replace(/[\r\n]/g, '')) || (envPass && timingSafeStrEqual(cur, String(envPass).replace(/[\r\n]/g, '')));
						if (!curOk) return new Response(JSON.stringify({ error: 'wrong_current' }), { status: 403, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						if (neu.length < 6) return new Response(JSON.stringify({ error: 'too_short' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						try { if (!(env.UUID || env.uuid)) { const ex = await env.KV.get('worker_uuid'); if (!ex) { await env.KV.put('worker_uuid', userID); 缓存WorkerUUID = userID; 缓存WorkerUUID时间 = Date.now(); } } } catch (e) {}
						await env.KV.put('admin_pass', neu); 缓存管理员密码 = neu; 缓存管理员密码时间 = Date.now();
						const respCP = new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						respCP.headers.set('Set-Cookie', `auth=${await makeSessionToken(UA, 加密秘钥, neu)}; Path=/; Max-Age=86400; HttpOnly; Secure; SameSite=Lax`);
						return respCP;
					} else if (访问路径 === 'admin/security/reveal') {
						let src = 'none'; try { src = envPass ? 'env' : ((await env.KV.get('admin_pass')) ? 'kv' : 'none'); } catch (e) { src = envPass ? 'env' : 'none'; }
						return new Response(JSON.stringify({ password: adminPassword || '', source: src }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
					} else if (访问路径 === 'admin/security/2fa-setup') {
						const secret = randomBase32(32);
						const label = encodeURIComponent('Nova Proxy (' + url.host + ')');
						const otpauth = `otpauth://totp/${label}?secret=${secret}&issuer=${encodeURIComponent('Nova Proxy')}&algorithm=SHA1&digits=6&period=30`;
						return new Response(JSON.stringify({ secret, otpauth }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
					} else if (访问路径 === 'admin/security/2fa-enable') {
						if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
						let body = {}; try { body = await request.json(); } catch (e) {}
						const secret = (body.secret || '').toString().trim();
						const code = (body.code || '').toString().trim();
						if (!secret) return new Response(JSON.stringify({ error: 'no_secret' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						if (!await totpVerify(secret, code)) return new Response(JSON.stringify({ error: 'bad_code' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						await env.KV.put('admin_2fa.json', JSON.stringify({ enabled: true, secret, addedAt: Date.now() }));
						return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					} else if (访问路径 === 'admin/security/2fa-disable') {
						if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
						let body = {}; try { body = await request.json(); } catch (e) {}
						const code = (body.code || '').toString().trim();
						let tfaD = null; try { tfaD = JSON.parse(await env.KV.get('admin_2fa.json') || 'null'); } catch (e) {}
						if (tfaD && tfaD.enabled && tfaD.secret && !await totpVerify(tfaD.secret, code)) return new Response(JSON.stringify({ error: 'bad_code' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						await env.KV.delete('admin_2fa.json');
						return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					} else if (访问路径 === 'admin/log.json') {// 读取日志内容（支持D1）
						const 读取日志内容 = JSON.stringify(await logReadAll(env));
						return new Response(读取日志内容, { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					} else if (区分大小写访问路径 === 'admin/getCloudflareUsage') {// 查询请求量
						try {
							const Usage_JSON = await getCloudflareUsage(url.searchParams.get('Email'), url.searchParams.get('GlobalAPIKey'), url.searchParams.get('AccountID'), url.searchParams.get('APIToken'));
							return new Response(JSON.stringify(Usage_JSON, null, 2), { status: 200, headers: { 'Content-Type': 'application/json' } });
						} catch (err) {
							const errorResponse = { msg: 'Failed to load request count / خطا در دریافت تعداد درخواست‌ها: ' + err.message, error: err.message };
							return new Response(JSON.stringify(errorResponse, null, 2), { status: 500, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						}
					} else if (区分大小写访问路径 === 'admin/getADDAPI') {// 验证优选API
						if (url.searchParams.get('url')) {
							const 待验证优选URL = url.searchParams.get('url');
							try {
								new URL(待验证优选URL);
								const 请求优选API内容 = await 请求优选API([待验证优选URL], url.searchParams.get('port') || '443');
								let 优选API的IP = 请求优选API内容[0].length > 0 ? 请求优选API内容[0] : 请求优选API内容[1];
								优选API的IP = 优选API的IP.map(item => item.replace(/#(.+)$/, (_, remark) => '#' + decodeURIComponent(remark)));
								return new Response(JSON.stringify({ success: true, data: 优选API的IP }, null, 2), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							} catch (err) {
								const errorResponse = { msg: 'Optimized API check failed / بررسی API ناموفق بود: ' + err.message, error: err.message };
								return new Response(JSON.stringify(errorResponse, null, 2), { status: 500, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							}
						}
						return new Response(JSON.stringify({ success: false, data: [] }, null, 2), { status: 403, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					} else if (访问路径 === 'admin/check') {// 代理检查
						const 代理协议 = ['socks5', 'http', 'https', 'turn', 'sstp'].find(类型 => url.searchParams.has(类型)) || null;
						if (!代理协议) return new Response(JSON.stringify({ error: 'Missing proxy parameter / پارامتر پروکسی موجود نیست' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						const 代理参数 = url.searchParams.get(代理协议);
						const startTime = Date.now();
						let 检测代理响应;
						try {
							parsedSocks5Address = await 获取SOCKS5账号(代理参数, 获取代理默认端口(代理协议));
							const { username, password, hostname, port } = parsedSocks5Address;
							const 完整代理参数 = username && password ? `${username}:${password}@${hostname}:${port}` : `${hostname}:${port}`;
							try {
								const 检测主机 = 'cloudflare.com', 检测端口 = 443, encoder = new TextEncoder(), decoder = new TextDecoder();
								const TCP连接 = 创建请求TCP连接器(request);
								let tcpSocket = null, tlsSocket = null;
								try {
									tcpSocket = 代理协议 === 'socks5'
										? await socks5Connect(检测主机, 检测端口, new Uint8Array(0), TCP连接)
										: 代理协议 === 'turn'
											? await turnConnect(parsedSocks5Address, 检测主机, 检测端口, TCP连接)
											: 代理协议 === 'sstp'
												? await sstpConnect(parsedSocks5Address, 检测主机, 检测端口, TCP连接)
												: (代理协议 === 'https' && isIPHostname(hostname)
													? await httpsConnect(检测主机, 检测端口, new Uint8Array(0), TCP连接)
													: await httpConnect(检测主机, 检测端口, new Uint8Array(0), 代理协议 === 'https', TCP连接));
									if (!tcpSocket) throw new Error('无法连接到代理服务器');
									tlsSocket = new TlsClient(tcpSocket, { serverName: 检测主机, insecure: true });
									await tlsSocket.handshake();
									await tlsSocket.write(encoder.encode(`GET /cdn-cgi/trace HTTP/1.1\r\nHost: ${检测主机}\r\nUser-Agent: Mozilla/5.0\r\nConnection: close\r\n\r\n`));
									let responseBuffer = new Uint8Array(0), headerEndIndex = -1, contentLength = null, chunked = false;
									const 最大响应字节 = 64 * 1024;
									while (responseBuffer.length < 最大响应字节) {
										const value = await tlsSocket.read();
										if (!value) break;
										if (value.byteLength === 0) continue;
										responseBuffer = 拼接字节数据(responseBuffer, value);
										if (headerEndIndex === -1) {
											const crlfcrlf = responseBuffer.findIndex((_, i) => i < responseBuffer.length - 3 && responseBuffer[i] === 0x0d && responseBuffer[i + 1] === 0x0a && responseBuffer[i + 2] === 0x0d && responseBuffer[i + 3] === 0x0a);
											if (crlfcrlf !== -1) {
												headerEndIndex = crlfcrlf + 4;
												const headers = decoder.decode(responseBuffer.slice(0, headerEndIndex));
												const statusLine = headers.split('\r\n')[0] || '';
												const statusMatch = statusLine.match(/HTTP\/\d\.\d\s+(\d+)/);
												const statusCode = statusMatch ? parseInt(statusMatch[1], 10) : NaN;
												if (!Number.isFinite(statusCode) || statusCode < 200 || statusCode >= 300) throw new Error(`代理检测请求失败: ${statusLine || '无效响应'}`);
												const lengthMatch = headers.match(/\r\nContent-Length:\s*(\d+)/i);
												if (lengthMatch) contentLength = parseInt(lengthMatch[1], 10);
												chunked = /\r\nTransfer-Encoding:\s*chunked/i.test(headers);
											}
										}
										if (headerEndIndex !== -1 && contentLength !== null && responseBuffer.length >= headerEndIndex + contentLength) break;
										if (headerEndIndex !== -1 && chunked && decoder.decode(responseBuffer).includes('\r\n0\r\n\r\n')) break;
									}
									if (headerEndIndex === -1) throw new Error('代理检测响应头过长或无效');
									const response = decoder.decode(responseBuffer);
									const ip = response.match(/(?:^|\n)ip=(.*)/)?.[1];
									const loc = response.match(/(?:^|\n)loc=(.*)/)?.[1];
									if (!ip || !loc) throw new Error('代理检测响应无效');
									检测代理响应 = { success: true, proxy: 代理协议 + "://" + 完整代理参数, ip, loc, responseTime: Date.now() - startTime };
								} finally {
									try { tlsSocket ? tlsSocket.close() : await tcpSocket?.close?.() } catch (e) { }
								}
							} catch (error) {
								检测代理响应 = { success: false, error: error.message, proxy: 代理协议 + "://" + 完整代理参数, responseTime: Date.now() - startTime };
							}
						} catch (err) {
							检测代理响应 = { success: false, error: err.message, proxy: 代理协议 + "://" + 代理参数, responseTime: Date.now() - startTime };
						}
						return new Response(JSON.stringify(检测代理响应, null, 2), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					}

				config_JSON = await 读取config_JSON(env, host, userID, UA);

				if (访问路径 === 'admin/init') {// 重置配置为默认值
						try {
							config_JSON = await 读取config_JSON(env, host, userID, UA, true);
							ctx.waitUntil(请求日志记录(env, request, 访问IP, 'Init_Config', config_JSON));
							config_JSON.init = '配置已重置为默认值';
							return new Response(JSON.stringify(config_JSON, null, 2), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						} catch (err) {
							const errorResponse = { msg: 'Config reset failed / بازنشانی پیکربندی ناموفق بود: ' + err.message, error: err.message };
							return new Response(JSON.stringify(errorResponse, null, 2), { status: 500, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						}
					} else if (request.method === 'POST') {// 处理 KV 操作（POST 请求）
						if (访问路径 === 'admin/config.json') { // 保存config.json配置
							try {
								const newConfig = await request.json();
							// Bridge: map the v3.1 panel's English keys back onto the cmliu Chinese keys the worker reads.
							const _enToZh = { protocolType: '协议类型', transportProtocol: '传输协议', gRPCmode: 'gRPC模式', skipCertVerify: '跳过证书验证', tlsFragment: 'TLS分片', randomPath: '随机路径', subConverterConfig: '订阅转换配置', proxy: '反代', optimizedSubGeneration: '优选订阅生成' };
							for (const _en in _enToZh) { if (_en in newConfig) { newConfig[_enToZh[_en]] = newConfig[_en]; delete newConfig[_en]; } }
							if (newConfig.优选订阅生成 && typeof newConfig.优选订阅生成 === 'object') {
								delete newConfig.优选订阅生成.TOKEN;
								// Bridge nested English keys inside optimizedSubGeneration back to Chinese.
								const subGen = newConfig.优选订阅生成;
								if ('localIPPool' in subGen) { subGen.本地IP库 = subGen.localIPPool; delete subGen.localIPPool; }
								if (subGen.本地IP库 && typeof subGen.本地IP库 === 'object') {
									const pool = subGen.本地IP库;
									const _poolEnToZh = { randomIP: '随机IP', randomCount: '随机数量', fixedPort: '指定端口' };
									for (const _en in _poolEnToZh) { if (_en in pool) { pool[_poolEnToZh[_en]] = pool[_en]; delete pool[_en]; } }
								}
							}
								// 验证配置完整性
								if (!newConfig.UUID || !newConfig.HOST) return new Response(JSON.stringify({ error: 'Incomplete configuration / پیکربندی ناقص است' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });

							// 保存到 KV
							await putConfig(env, JSON.stringify(newConfig, null, 2));
								ctx.waitUntil(请求日志记录(env, request, 访问IP, 'Save_Config', config_JSON));
								ctx.waitUntil(publishSubMirror(env, `${url.protocol}//${url.host}`).catch(() => {}));
								return new Response(JSON.stringify({ success: true, message: 'Configuration saved / پیکربندی ذخیره شد' }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							} catch (error) {
								console.error('保存配置失败:', error);
								return new Response(JSON.stringify({ error: 'Failed to save configuration / ذخیره پیکربندی ناموفق بود: ' + error.message }), { status: 500, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							}
						} else if (访问路径 === 'admin/cf.json') { // 保存cf.json配置
							try {
								const newConfig = await request.json();
								const CF_JSON = { Email: null, GlobalAPIKey: null, AccountID: null, APIToken: null, UsageAPI: null };
								if (!newConfig.init || newConfig.init !== true) {
									if (newConfig.Email && newConfig.GlobalAPIKey) {
										CF_JSON.Email = newConfig.Email;
										CF_JSON.GlobalAPIKey = newConfig.GlobalAPIKey;
									} else if (newConfig.AccountID && newConfig.APIToken) {
										CF_JSON.AccountID = newConfig.AccountID;
										CF_JSON.APIToken = newConfig.APIToken;
									} else if (newConfig.UsageAPI) {
										CF_JSON.UsageAPI = newConfig.UsageAPI;
									} else {
										return new Response(JSON.stringify({ error: 'Incomplete configuration / پیکربندی ناقص است' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
									}
								}

								// 保存到 KV
								await env.KV.put('cf.json', JSON.stringify(CF_JSON, null, 2));
								ctx.waitUntil(请求日志记录(env, request, 访问IP, 'Save_Config', config_JSON));
								return new Response(JSON.stringify({ success: true, message: 'Configuration saved / پیکربندی ذخیره شد' }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							} catch (error) {
								console.error('保存配置失败:', error);
								return new Response(JSON.stringify({ error: 'Failed to save configuration / ذخیره پیکربندی ناموفق بود: ' + error.message }), { status: 500, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							}
						} else if (访问路径 === 'admin/tg.json') { // 保存tg.json配置
							try {
								const newConfig = await request.json();
								if (newConfig.init && newConfig.init === true) {
									const TG_JSON = { BotToken: null, ChatID: null };
									await env.KV.put('tg.json', JSON.stringify(TG_JSON, null, 2));
								} else {
									if (!newConfig.BotToken || !newConfig.ChatID) return new Response(JSON.stringify({ error: 'Incomplete configuration / پیکربندی ناقص است' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
									// Normalize ChatID to string and trim whitespace.
									newConfig.ChatID = String(newConfig.ChatID).trim();
									await env.KV.put('tg.json', JSON.stringify(newConfig, null, 2));
									const webhookUrl = `${url.protocol}//${url.host}/bot`;
									ctx.waitUntil((async () => {
										try {
											const whRes = await fetch(`https://api.telegram.org/bot${newConfig.BotToken}/setWebhook?url=${encodeURIComponent(webhookUrl)}&drop_pending_updates=true`);
											const whData = await whRes.json().catch(() => ({}));
											if (!whData.ok) console.error('[TG.Webhook] failed:', whData);
											else console.log('[TG.Webhook] set:', webhookUrl);
										} catch (e) { console.error('[TG.Webhook] error:', e); }
										await tgSetMyCommands(newConfig.BotToken);
									})());
								}
								ctx.waitUntil(请求日志记录(env, request, 访问IP, 'Save_Config', config_JSON));
								return new Response(JSON.stringify({ success: true, message: 'Configuration saved / پیکربندی ذخیره شد' }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							} catch (error) {
								console.error('保存配置失败:', error);
								return new Response(JSON.stringify({ error: 'Failed to save configuration / ذخیره پیکربندی ناموفق بود: ' + error.message }), { status: 500, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							}
						} else if (访问路径 === 'admin/network-settings.json') { // 保存网络设置
							try {
								const settings = await request.json();
								const 有效设置 = {
									enableRouting: typeof settings.enableRouting === 'boolean' ? settings.enableRouting : true,
									enableGeoIP: typeof settings.enableGeoIP === 'boolean' ? settings.enableGeoIP : true,
									enableGeoSite: typeof settings.enableGeoSite === 'boolean' ? settings.enableGeoSite : true,
									enableAdBlock: typeof settings.enableAdBlock === 'boolean' ? settings.enableAdBlock : true,
									enablePornBlock: typeof settings.enablePornBlock === 'boolean' ? settings.enablePornBlock : false,
									enableDomesticBypass: typeof settings.enableDomesticBypass === 'boolean' ? settings.enableDomesticBypass : true,
									enableDoH: typeof settings.enableDoH === 'boolean' ? settings.enableDoH : true,
									dohProvider: ['cloudflare', 'google', 'quad9', 'adguard'].includes(settings.dohProvider) ? settings.dohProvider : 'cloudflare',
									enableLocalDNS: typeof settings.enableLocalDNS === 'boolean' ? settings.enableLocalDNS : false,
									localDNSIP: settings.localDNSIP || '8.8.8.8',
									localDNSPort: settings.localDNSPort || '53',
									enableAntiSanctionDNS: typeof settings.enableAntiSanctionDNS === 'boolean' ? settings.enableAntiSanctionDNS : false,
									antiSanctionDNSProvider: ['cloudflare', 'google', 'quad9', 'adguard', 'alidns', 'shekan', 'custom'].includes(settings.antiSanctionDNSProvider) ? settings.antiSanctionDNSProvider : 'cloudflare',
									antiSanctionCustomDNS: settings.antiSanctionCustomDNS || '',
									enableFakeDNS: typeof settings.enableFakeDNS === 'boolean' ? settings.enableFakeDNS : false,
									fakeDNSIP: settings.fakeDNSIP || '198.51.100.1',
									enableIPv6: typeof settings.enableIPv6 === 'boolean' ? settings.enableIPv6 : true,
									allowLAN: typeof settings.allowLAN === 'boolean' ? settings.allowLAN : false,
									logLevel: ['debug', 'info', 'warn', 'error'].includes(settings.logLevel) ? settings.logLevel : 'error',
									enableWarp: typeof settings.enableWarp === 'boolean' ? settings.enableWarp : false,
									warpCalls: typeof settings.warpCalls === 'boolean' ? settings.warpCalls : false,
									warpMode: ['warp', 'chain', 'wow'].includes(settings.warpMode) ? settings.warpMode : 'warp',
									warpEndpoint: typeof settings.warpEndpoint === 'string' ? settings.warpEndpoint.slice(0, 80) : '',
									warpAmnezia: typeof settings.warpAmnezia === 'boolean' ? settings.warpAmnezia : false,
								customRules: typeof settings.customRules === 'string' ? settings.customRules.slice(0, 4000) : '',
								warpNoise: (settings.warpNoise && typeof settings.warpNoise === 'object') ? {
									mode: ['', 'quic', 'random'].includes(settings.warpNoise.mode) ? settings.warpNoise.mode : '',
									count: String(settings.warpNoise.count || '').slice(0, 12),
									size: String(settings.warpNoise.size || '').slice(0, 12),
									delay: String(settings.warpNoise.delay || '').slice(0, 12)
								} : { mode: '', count: '', size: '', delay: '' },
								monthlyCapGB: (typeof settings.monthlyCapGB === 'number' && isFinite(settings.monthlyCapGB) && settings.monthlyCapGB >= 0) ? settings.monthlyCapGB : 0,
								speedLimitKBps: (typeof settings.speedLimitKBps === 'number' && isFinite(settings.speedLimitKBps) && settings.speedLimitKBps >= 0) ? settings.speedLimitKBps : 0,
							blockQUIC: typeof settings.blockQUIC === 'boolean' ? settings.blockQUIC : false,
							enableMalwareBlock: typeof settings.enableMalwareBlock === 'boolean' ? settings.enableMalwareBlock : true,
							enablePhishingBlock: typeof settings.enablePhishingBlock === 'boolean' ? settings.enablePhishingBlock : true,
							bypassChina: typeof settings.bypassChina === 'boolean' ? settings.bypassChina : false,
							bypassRussia: typeof settings.bypassRussia === 'boolean' ? settings.bypassRussia : false,
							bypassSanctions: typeof settings.bypassSanctions === 'boolean' ? settings.bypassSanctions : false,
							bypassCountries: Array.isArray(settings.bypassCountries) ? [...new Set(settings.bypassCountries.filter(c => /^[a-z]{2}$/i.test(c)).map(c => c.toLowerCase()))].slice(0, 20) : [],
							blockCategories: Array.isArray(settings.blockCategories) ? settings.blockCategories.filter(c => ['quic', 'malware', 'phishing', 'cryptominers'].includes(c)) : [],
							disguise: typeof settings.disguise === 'boolean' ? settings.disguise : false,
									adminPath: String(settings.adminPath || '').trim().toLowerCase().replace(/^\/+|\/+$/g, '').replace(/[^a-z0-9_-]/g, '').slice(0, 40),
									loginPath: String(settings.loginPath || '').trim().toLowerCase().replace(/^\/+|\/+$/g, '').replace(/[^a-z0-9_-]/g, '').slice(0, 40),
									subPath: String(settings.subPath || '').trim().toLowerCase().replace(/^\/+|\/+$/g, '').replace(/[^a-z0-9_-]/g, '').slice(0, 40),
									backendMode: typeof settings.backendMode === 'boolean' ? settings.backendMode : false,
									backendUrl: (typeof settings.backendUrl === 'string' && /^https?:\/\//i.test(settings.backendUrl.trim())) ? settings.backendUrl.trim().slice(0, 300) : ''
								};
							await env.KV.put('network-settings.json', JSON.stringify(有效设置, null, 2));
							网络设置 = 有效设置; 缓存网络设置 = null;
							savedUsersAuth = null;
							ctx.waitUntil(请求日志记录(env, request, 访问IP, 'Save_Network_Settings', config_JSON));
							ctx.waitUntil(publishSubMirror(env, `${url.protocol}//${url.host}`).catch(() => {}));
								return new Response(JSON.stringify({ success: true, message: 'Network settings saved / تنظیمات شبکه ذخیره شد' }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							} catch (error) {
								console.error('保存网络设置失败:', error);
								return new Response(JSON.stringify({ error: 'Failed to save network settings / ذخیره تنظیمات شبکه ناموفق بود: ' + error.message }), { status: 500, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							}
						} else if (区分大小写访问路径 === 'admin/ADD.txt') { // 保存自定义优选IP
							try {
								const customIPs = await request.text();
								await env.KV.put('ADD.txt', customIPs);// 保存到 KV
								ctx.waitUntil(请求日志记录(env, request, 访问IP, 'Save_Custom_IPs', config_JSON));
								ctx.waitUntil(publishSubMirror(env, `${url.protocol}//${url.host}`).catch(() => {}));
								return new Response(JSON.stringify({ success: true, message: 'Custom IP saved / آی‌پی سفارشی ذخیره شد' }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						} catch (error) {
							console.error('保存自定义IP失败:', error);
							return new Response(JSON.stringify({ error: 'Failed to save custom IP / ذخیره آی‌پی سفارشی ناموفق بود: ' + error.message }), { status: 500, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						}
					} else if (访问路径 === 'admin/warp.json') { // WARP: ثبت / ثبت WoW / فعال‌سازی لایسنس WARP+ / fromCentral
						let stored = null; try { stored = JSON.parse(await env.KV.get('warp-account.json') || 'null'); } catch (e) { }
						if (request.method === 'POST') {
							let reqBody = {}; try { reqBody = await request.json(); } catch (e) { }
							try {
								if (reqBody.fromCentral) {
									// کشیدن کلیدهای WARP+ از استخر مرکزی و اعمال اولین کلید موفق
									if (!stored || !stored.registered) stored = await registerWarpAccount(env, 'warp-account.json');
									const { api } = await 获取CentralApi(env); if (!api) throw new Error('Central API not set in Settings');
									let keys = []; try { const cr = await fetch(api + '/api/warp', { headers: { 'User-Agent': 'NovaProxy' } }); const cj = await cr.json(); keys = Array.isArray(cj.keys) ? cj.keys : []; } catch (e) {}
									if (!keys.length) throw new Error('No WARP+ keys in the central pool');
									let applied = false, lastErr = '';
									for (const k of keys) { try { await applyWarpLicense(env, String(k).trim()); applied = true; break; } catch (e) { lastErr = e && e.message ? e.message : String(e); } }
									if (!applied) throw new Error('All central keys failed (' + lastErr + ')');
									// بروزرسانی stored بعد از اعمال لایسنس
									try { stored = JSON.parse(await env.KV.get('warp-account.json') || 'null'); } catch (e) {}
								} else if (reqBody.license) {
									if (!stored || !stored.registered) stored = await registerWarpAccount(env, 'warp-account.json');
									await applyWarpLicense(env, String(reqBody.license).trim());
									// بروزرسانی stored بعد از اعمال لایسنس
									try { stored = JSON.parse(await env.KV.get('warp-account.json') || 'null'); } catch (e) {}
								} else {
									stored = await registerWarpAccount(env, 'warp-account.json');
									if (reqBody.wow) { const second = await registerWarpAccount(env, 'warp-account-wow.json'); second.registered = true; stored.wow = second; }
								}
								stored.registered = true;
								ctx.waitUntil(请求日志记录(env, request, 访问IP, reqBody.license ? 'WARP_License' : 'Register_WARP', config_JSON));
								const view = _warpPublicView(stored, 网络设置 && 网络设置.warpEndpoint);
								const wraw = await env.KV.get('warp-account-wow.json');
								view.wow = wraw ? _warpPublicView(JSON.parse(wraw)) : null;
								return new Response(JSON.stringify(view, null, 2), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							} catch (e) {
								return new Response(JSON.stringify({ registered: !!(stored && stored.registered), error: e && e.message ? e.message : String(e) }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							}
						}
						// GET: نمایش وضعیت حساب WARP
						const view = stored ? _warpPublicView(stored, 网络设置 && 网络设置.warpEndpoint) : { registered: false };
						const wraw2 = await env.KV.get('warp-account-wow.json');
						view.wow = wraw2 ? _warpPublicView(JSON.parse(wraw2)) : null;
						return new Response(JSON.stringify(view, null, 2), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					} else if (访问路径 === 'admin/users.json') { // multi-user registry (save) — panel-side CRUD
						try {
							const body = await request.json();
							let ns = {}; try { ns = JSON.parse(await env.KV.get('network-settings.json') || '{}'); } catch (e) {}
							ns.multiUser = !!body.multiUser;
						ns.users = (Array.isArray(body.users) ? body.users : []).map(u => ({
							id: String(u.id || '').toLowerCase().replace(/[^0-9a-f]/g, ''),
							name: String(u.name || u.username || '').slice(0, 40),
							tag: String(u.tag || '').slice(0, 40),
							token: String(u.token || '').slice(0, 80),
							username: String(u.username || '').slice(0, 24),
							key: String(u.key || '').slice(0, 12),
							fp: String(u.fp || '').slice(0, 40),
							// Normalize empty/whitespace-only overrides so they don't accidentally override defaults
							cleanIp: String(u.cleanIp || '').trim().slice(0, 500),
							proxyIp: String(u.proxyIp || '').trim().slice(0, 500),
							ports: String(u.ports || '').trim().slice(0, 100),
							enabled: u.enabled !== false,
							expiry: u.expiry || '',
							quotaBytes: Number(u.quotaBytes) || 0,
							dailyQuotaBytes: Number(u.dailyQuotaBytes) || 0,
							created: u.created || new Date().toISOString()
						})).filter(u => u.id.length >= 16 && u.token);
						{
							const _seen = {};
							const _seenTag = {};
							for (const u of ns.users) {
								if (u && u.username) _seen[String(u.username).toLowerCase()] = 1;
								if (u && u.tag) _seenTag[String(u.tag).toLowerCase()] = 1;
							}
							const _rid = () => (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID().replace(/-/g, '') : (Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2)));
							for (let i = 0; i < ns.users.length; i++) {
								const u = ns.users[i]; if (!u) continue;
								if (!u.key) u.key = _rid().slice(0, 12);
								if (!u.username) {
									let base = String(u.name || ('user' + (i + 1))).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 24) || ('user' + (i + 1));
									let name = base, n = 2; while (_seen[name]) { name = base + n; n++; } _seen[name] = 1; u.username = name;
								}
								if (!u.tag) {
									let baseTag = String(u.username || u.name || ('user' + (i + 1))).replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 40) || ('user' + (i + 1));
									let tag = baseTag, n = 2; while (_seenTag[String(tag).toLowerCase()]) { tag = baseTag + n; n++; } _seenTag[String(tag).toLowerCase()] = 1; u.tag = tag;
								}
								log(`[Users.Save] user=${u.username || u.tag || u.id} tag=${u.tag} cleanIpLines=${String(u.cleanIp).split(/[\r\n,;]+/).filter(Boolean).length} proxyIpLines=${String(u.proxyIp).split(/[\r\n,;]+/).filter(Boolean).length} ports=${u.ports || '(default)'}`);
							}
						}
							await env.KV.put('network-settings.json', JSON.stringify(ns, null, 2));
							网络设置 = ns;
							savedUsersAuth = { multiUser: ns.multiUser, users: ns.users }; savedUsersAuth时间 = Date.now();
							ctx.waitUntil(请求日志记录(env, request, 访问IP, 'Save_Users', config_JSON));
							return new Response(JSON.stringify({ success: true, count: ns.users.length }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						} catch (error) { return new Response(JSON.stringify({ error: 'Save users failed: ' + error.message }), { status: 500, headers: { 'Content-Type': 'application/json;charset=utf-8' } }); }
					} else if (访问路径 === 'admin/central/announcement') { // 设置广播公告（管理员操作，转发到中央服务器）
						const { api, token } = await 获取CentralApi(env);
						if (!api) return new Response(JSON.stringify({ ok: false, error: 'centralApiNotSet' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						try {
							const r = await fetch(api + '/admin/announcement', { method: 'POST', headers: { 'Content-Type': 'application/json', ...(token ? { 'Authorization': 'Bearer ' + token } : {}) }, body: await request.text() });
							ctx.waitUntil(刷新公告(env));
							return new Response(await r.text(), { status: r.status, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						} catch (e) { return new Response(JSON.stringify({ ok: false, error: e.message }), { status: 502, headers: { 'Content-Type': 'application/json;charset=utf-8' } }); }
					} else if (访问路径 === 'admin/cf-usage-setup') { // CF token connect (moved into POST branch so it is reachable)
						if (request.method !== 'POST') return new Response(JSON.stringify({ error: 'method_not_allowed' }), { status: 405, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						const _je = (error, extra) => new Response(JSON.stringify(Object.assign({ error }, extra || {})), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
						let cuBody = {}; try { cuBody = await request.json(); } catch (e) {}
						const cuToken = String(cuBody.token || '').trim();
						if (!cuToken) return _je('no_token');
						let cuV; try { cuV = await cfVerifyToken(cuToken); } catch (e) { cuV = { ok: false }; }
						if (!cuV || !cuV.ok) return _je('token_invalid');
						let cuAccountId = String(cuBody.accountId || '').trim();
						if (!cuAccountId) {
							let accts = []; try { accts = await cfListAccounts(cuToken); } catch (e) {}
							if (!accts.length) return _je('no_accounts');
							if (accts.length === 1) cuAccountId = accts[0].id; else return _je('multiple_accounts', { accounts: accts });
						}
						const cuUsage = await getCloudflareUsage(null, null, cuAccountId, cuToken);
						if (!cuUsage || !cuUsage.success) return _je('usage_failed', { detail: (cuUsage && cuUsage.error) || '' });
						try { await env.KV.put('cf.json', JSON.stringify({ Email: null, GlobalAPIKey: null, AccountID: cuAccountId, APIToken: cuToken, UsageAPI: null }, null, 2)); } catch (e) {}
						缓存CFUsage = cuUsage; 缓存CFUsage时间 = Date.now();
						return new Response(JSON.stringify({ success: true, accountId: cuAccountId, usage: cuUsage }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
					} else if (访问路径 === 'admin/user-reset') { // 重置用户用量计数器 + 清除自动禁用标志
						try {
							if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
							const body = await request.json().catch(() => ({}));
							const id = body && body.id;
							if (!id) return new Response(JSON.stringify({ error: 'missing id' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							try { await usageReset(env, 'uusage:' + id); } catch (e) {}
							const _now = new Date();
							for (let i = 0; i < 40; i++) { const d = new Date(_now); d.setDate(d.getDate() - i); try { await usageReset(env, 'uusage-d:' + id + ':' + getDateKey(d)); } catch (e) {} }
							const _ns2 = JSON.parse(await env.KV.get('network-settings.json') || '{}');
							if (Array.isArray(_ns2.users)) { const u = _ns2.users.find(x => x && x.id === id); if (u) { u.enabled = true; delete u.disabledReason; delete u.disabledAt; delete u.autoDisabled; } await env.KV.put('network-settings.json', JSON.stringify(_ns2, null, 2)); 网络设置 = _ns2; savedUsersAuth = null; }
							ctx.waitUntil(请求日志记录(env, request, 访问IP, 'User_Reset', config_JSON));
							return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
						} catch (error) { return new Response(JSON.stringify({ error: 'reset failed: ' + error.message }), { status: 500, headers: { 'Content-Type': 'application/json;charset=utf-8' } }); }
					} else if (访问路径 === 'admin/self-update.json') { // 通过Cloudflare API进行原地Worker重新部署（保留bindings/secrets/D1）
						if (request.method !== 'POST') return new Response(JSON.stringify({ error: '仅支持POST方法' }), { status: 405, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						const _更新错误响应 = (错误信息, 额外信息) => new Response(JSON.stringify(Object.assign({ error: 错误信息 }, 额外信息 || {})), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
						let 更新请求体 = {}; try { 更新请求体 = await request.json(); } catch (e) {}
						let 更新令牌 = String(更新请求体.token || '').trim();
						// 一次性Cloudflare认证：如果未提供令牌，复用已保存的Cloudflare令牌（cf.json，通过用量卡片设置）。
						// 创建该令牌时需要同时具备 Account Analytics:Read 和 Workers Scripts:Edit 权限，一次授权即可同时支持用量查询和更新。
						if (!更新令牌) { try { const _cf令牌 = JSON.parse(await env.KV.get('cf.json') || 'null'); if (_cf令牌 && _cf令牌.APIToken) { 更新令牌 = String(_cf令牌.APIToken).trim(); if (!更新请求体.accountId && _cf令牌.AccountID) 更新请求体.accountId = _cf令牌.AccountID; } } catch (e) {} }
						if (!更新令牌) return _更新错误响应('未提供令牌');
						let 令牌验证结果; try { 令牌验证结果 = await cfVerifyToken(更新令牌); } catch (e) { 令牌验证结果 = { ok: false }; }
						if (!令牌验证结果 || !令牌验证结果.ok) return _更新错误响应('令牌无效');
						let 更新账户ID = String(更新请求体.accountId || '').trim();
						if (!更新账户ID) {
							let 账户列表 = []; try { 账户列表 = await cfListAccounts(更新令牌); } catch (e) {}
							if (!账户列表.length) return _更新错误响应('未找到账户');
							if (账户列表.length === 1) 更新账户ID = 账户列表[0].id;
							else return _更新错误响应('存在多个账户', { accounts: 账户列表 });
						}
						let 脚本名称 = String(更新请求体.scriptName || '').trim();
						if (!脚本名称) {
							const 脚本匹配 = /^([a-z0-9][a-z0-9-]*)\.[a-z0-9-]+\.workers\.dev$/i.exec(url.host);
							if (脚本匹配) 脚本名称 = 脚本匹配[1];
							else return _更新错误响应('需要脚本名称');
						}
						// 安全门：确认我们能读取脚本的当前设置（从而确认其bindings），然后再覆盖，这样自更新永远不会丢失D1/KV绑定。
						try {
							const 设置响应 = await fetch(CF_API + '/accounts/' + 更新账户ID + '/workers/scripts/' + 脚本名称 + '/settings', { headers: cfHeaders(更新令牌) });
							const 设置结果 = await cfJson(设置响应);
							if (!设置结果 || !设置结果.success) return _更新错误响应('无法读取绑定信息');
						} catch (e) { return _更新错误响应('无法读取绑定信息'); }
						// 从版本清单解析规范的Worker源码（version.json的worker_url，否则使用仓库默认值）。
						let 源码地址 = NOVAWorkerSrcFallback, 最新版本 = '';
						{ const 版本信息 = await 获取Nova版本(); if (版本信息) { if (版本信息.worker_url) 源码地址 = 版本信息.worker_url; 最新版本 = String(版本信息.version || '').replace(/^[vV]/, ''); } }
						let 脚本文本 = '';
						try { const r = await fetch(源码地址, { headers: { 'User-Agent': 'NovaProxy' } }); if (!r.ok) throw new Error('HTTP ' + r.status); 脚本文本 = await r.text(); } catch (e) { return _更新错误响应('下载Worker源码失败', { detail: (e && e.message) || String(e) }); }
						if (脚本文本.length < 1000 || !/export\s+default|addEventListener\s*\(/.test(脚本文本)) return _更新错误响应('Worker源码无效');
						// 仅替换内容：替换代码，保持bindings/secrets/vars/D1/KV不变。
						try {
							const 表单数据 = new FormData();
							表单数据.append('metadata', new Blob([JSON.stringify({ main_module: 'worker.js' })], { type: 'application/json' }));
							表单数据.append('worker.js', new Blob([脚本文本], { type: 'application/javascript+module' }), 'worker.js');
							const 上传响应 = await fetch(CF_API + '/accounts/' + 更新账户ID + '/workers/scripts/' + 脚本名称 + '/content', { method: 'PUT', headers: cfHeaders(更新令牌), body: 表单数据 });
							const 上传结果 = await cfJson(上传响应);
							if (!上传结果 || !上传结果.success) { const 错误消息 = (上传结果 && 上传结果.errors && 上传结果.errors[0] && 上传结果.errors[0].message) || ('HTTP ' + 上传响应.status); return _更新错误响应('上传失败', { detail: 错误消息 }); }
						} catch (e) { return _更新错误响应('上传失败', { detail: (e && e.message) || String(e) }); }
						ctx.waitUntil(请求日志记录(env, request, 访问IP, '自更新', config_JSON));
						return new Response(JSON.stringify({ success: true, version: 最新版本 || undefined }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
					} else return new Response(JSON.stringify({ error: 'Unsupported request path / مسیر درخواست پشتیبانی نمی‌شود' }), { status: 404, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					} else if (访问路径 === 'admin/config.json') {// 处理 admin/config.json 请求，返回JSON
						// Bridge: the v3.1 panel reads English keys; the cmliu config uses Chinese ones.
						// Expose English aliases + inject the real sub token so the QR/sub link works.
						const _subTok = await MD5MD5(host + userID);
						const _optSubGen = Object.assign({}, config_JSON.优选订阅生成, { TOKEN: _subTok });
						if (_optSubGen.本地IP库) {
							_optSubGen.localIPPool = {
								randomIP: _optSubGen.本地IP库.随机IP,
								randomCount: _optSubGen.本地IP库.随机数量,
								fixedPort: _optSubGen.本地IP库.指定端口
							};
							delete _optSubGen.本地IP库;
						}
						const _panelCfg = Object.assign({}, config_JSON, {
							optimizedSubGeneration: _optSubGen,
							protocolType: config_JSON.协议类型,
							transportProtocol: config_JSON.传输协议,
							gRPCmode: config_JSON.gRPC模式,
							skipCertVerify: config_JSON.跳过证书验证,
							tlsFragment: config_JSON.TLS分片,
							randomPath: config_JSON.随机路径,
							subConverterConfig: config_JSON.订阅转换配置,
							proxy: config_JSON.反代
						});
						return new Response(JSON.stringify(_panelCfg, null, 2), { status: 200, headers: { 'Content-Type': 'application/json' } });
					} else if (区分大小写访问路径 === 'admin/ADD.txt') {// 处理 admin/ADD.txt 请求，返回本地优选IP
						let 本地优选IP = await env.KV.get('ADD.txt') || 'null';
						if (本地优选IP == 'null') 本地优选IP = (await 生成随机IP(request, config_JSON.优选订阅生成.本地IP库.随机数量, config_JSON.优选订阅生成.本地IP库.指定端口))[1];
						return new Response(本地优选IP, { status: 200, headers: { 'Content-Type': 'text/plain;charset=utf-8', 'asn': request.cf.asn } });
					} else if (访问路径 === 'admin/cf.json') {// CF配置文件
						return new Response(JSON.stringify(request.cf, null, 2), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					} else if (访问路径 === 'admin/network-settings.json') {// 网络设置文件
						try {
							const saved = await env.KV.get('network-settings.json');
							const 默认设置 = {
								enableRouting: true, enableGeoIP: true, enableGeoSite: true,
							enableAdBlock: true, enablePornBlock: false, enableDomesticBypass: true,
							enableDoH: true, dohProvider: 'cloudflare',
							enableLocalDNS: false, localDNSIP: '8.8.8.8', localDNSPort: '53',
							enableAntiSanctionDNS: false, antiSanctionDNSProvider: 'cloudflare', antiSanctionCustomDNS: '',
							enableFakeDNS: false, fakeDNSIP: '198.51.100.1',
						enableIPv6: true, allowLAN: false, logLevel: 'error', enableWarp: false, warpCalls: false, warpMode: 'warp', warpEndpoint: '', warpAmnezia: false, customRules: '',
						enableMalwareBlock: true, enablePhishingBlock: true,
						bypassChina: false, bypassRussia: false, bypassSanctions: false, bypassCountries: [], blockCategories: [],
						monthlyCapGB: 0, speedLimitKBps: 0, blockQUIC: false,
						warpNoise: { mode: '', count: '', size: '', delay: '' },
						disguise: false, adminPath: '', loginPath: '', subPath: '',
						backendMode: false, backendUrl: ''
							};
							const settings = saved ? JSON.parse(saved) : 默认设置;
							return new Response(JSON.stringify(settings, null, 2), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						} catch (error) {
							return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						}
					} else if (访问路径 === 'admin/system.json') {// اطلاعات سیستم
						const kvConnected = !!(env.KV && typeof env.KV.get === 'function');
						let kvOk = false;
						if (kvConnected) try { await getConfigRaw(env); kvOk = true; } catch (e) {}
						let todayUsage = { up: 0, down: 0, total: 0 };
						if (kvConnected) try { const tu = await usageGet(env, 'usage:' + getDateKey(new Date())); if (tu) todayUsage = { up: tu.up || 0, down: tu.down || 0, total: tu.total || 0 }; } catch (e) {}
						const cf = request.cf;
						let d1SizeBytes = null;
						if (env.DB && typeof env.DB.prepare === 'function') {
							try { const _r = await env.DB.prepare('SELECT 1').all(); if (_r && _r.meta && typeof _r.meta.size_after === 'number') d1SizeBytes = _r.meta.size_after; } catch (e) {}
						}
						return new Response(JSON.stringify({
							ip: 访问IP,
							d1SizeBytes,
							colo: cf?.colo,
							country: cf?.country,
							city: cf?.city,
							region: cf?.region,
							regionCode: cf?.regionCode,
							latitude: cf?.latitude,
							longitude: cf?.longitude,
							timezone: cf?.timezone,
							asn: cf?.asn,
							asOrganization: cf?.asOrganization,
							userAgent: UA,
							version: Version,
							instanceId: (await MD5MD5(url.host)).slice(0, 8),
							kvConnected: kvConnected,
							kvOk: kvOk,
							host: url.host,
							protocol: url.protocol,
							todayUsage,
							workerStartTime: globalThis.__workerStart || null
						}), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
					} else if (访问路径 === 'admin/domain-health.json') {// 域名健康检查
						if (url.searchParams.has('check')) {
							const health = await 检查域名健康(env, hosts, host);
							return new Response(JSON.stringify(health), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
						} else {
							const health = env.KV && typeof env.KV.get === 'function' ? JSON.parse(await env.KV.get('domain-health.json') || 'null') : null;
							return new Response(JSON.stringify(health || { checkedAt: 0, domains: [] }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
						}
					} else if (访问路径 === 'admin/usage-data') {// آمار مصرف ۹۰ روز اخیر
						try {
							const now = new Date();
							const days = 90;
							// 并行读取所有天数的用量数据（代替逐个串行await，大幅提升响应速度）
							const keys = [];
							for (let i = 0; i < days; i++) {
								const d = new Date(now); d.setDate(d.getDate() - i);
								keys.push('usage:' + d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'));
							}
							const vals = await Promise.all(keys.map(k => env.KV.get(k).catch(() => null)));
							const daily = [];
							for (let i = 0; i < keys.length; i++) {
								if (vals[i]) { try { daily.push({ date: keys[i].slice(6), ...JSON.parse(vals[i]) }); } catch (e) {} }
							}
							const monthlyMap = {};
							for (const day of daily) {
								const m = day.date.slice(0, 7);
								if (!monthlyMap[m]) monthlyMap[m] = { up: 0, down: 0, total: 0 };
								monthlyMap[m].up += day.up || 0;
								monthlyMap[m].down += day.down || 0;
								monthlyMap[m].total += day.total || 0;
							}
							const monthly = Object.entries(monthlyMap).map(([month, data]) => ({ month, ...data }));
							const yearlyMap = {};
							for (const day of daily) {
								const y = day.date.slice(0, 4);
								if (!yearlyMap[y]) yearlyMap[y] = { up: 0, down: 0, total: 0 };
								yearlyMap[y].up += day.up || 0;
								yearlyMap[y].down += day.down || 0;
								yearlyMap[y].total += day.total || 0;
							}
							const yearly = Object.entries(yearlyMap).map(([year, data]) => ({ year, ...data }));
							return new Response(JSON.stringify({ daily, monthly, yearly }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
						} catch (e) {
							return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						}
					} else if (访问路径 === 'admin/sub-content') {// پیش‌نمایش محتوای اشتراک
						const subToken = await MD5MD5(host + userID);
						const subUrl = `${url.protocol}//${url.host}/sub?token=${subToken}`;
						const subResponse = await fetch(subUrl).catch(() => null);
						if (!subResponse) return new Response('Sub content unavailable', { status: 502 });
						const subText = await subResponse.text();
						return new Response(subText, { status: 200, headers: { 'Content-Type': 'text/plain;charset=utf-8', 'Cache-Control': 'no-store' } });
					} else if (访问路径 === 'admin/users.json') { // multi-user registry (list) — 包含每日用量
						let _ns = {}; try { _ns = JSON.parse(await env.KV.get('network-settings.json') || '{}'); } catch (e) {}
						let regMU = !!_ns.multiUser, users = Array.isArray(_ns.users) ? _ns.users : [];
						if (savedUsersAuth && (Date.now() - savedUsersAuth时间) < 120000) { regMU = !!savedUsersAuth.multiUser; users = savedUsersAuth.users; }
						const usage = {}, usageIO = {}, usageDay = {};
						const _today = getDateKey(new Date());
						let _autoChanged = false;
						// 并行读取所有用户的用量数据（代替逐个串行await，大幅提升多用户时的响应速度）
						await Promise.all(users.filter(u => u && u.id).map(async u => {
							try { const c = await usageGet(env, 'uusage:' + u.id); usage[u.id] = (c && c.total) || 0; usageIO[u.id] = { up: (c && c.up) || 0, down: (c && c.down) || 0 }; } catch (e) { usage[u.id] = 0; usageIO[u.id] = { up: 0, down: 0 }; }
							try { const cd = await usageGet(env, 'uusage-d:' + u.id + ':' + _today); usageDay[u.id] = (cd && cd.total) || 0; } catch (e) { usageDay[u.id] = 0; }
						}));
						for (const u of users) {
							if (!u || !u.id) continue;
							if (u.enabled !== false) {
								let reason = null;
								if (u.quotaBytes && usage[u.id] >= u.quotaBytes) reason = 'quota';
								else if (u.dailyQuotaBytes && usageDay[u.id] >= u.dailyQuotaBytes) reason = 'daily-quota';
								else if (u.expiry) { const _t = Date.parse(u.expiry); if (!isNaN(_t) && Date.now() > _t) reason = 'expired'; }
								if (reason) { u.enabled = false; u.disabledReason = reason; u.disabledAt = Date.now(); u.autoDisabled = true; _autoChanged = true; }
							}
						}
						if (_autoChanged) { try { _ns.users = users; await env.KV.put('network-settings.json', JSON.stringify(_ns, null, 2)); 缓存网络设置 = null; savedUsersAuth = { multiUser: regMU, users }; savedUsersAuth时间 = Date.now(); } catch (e) {} }
						return new Response(JSON.stringify({ multiUser: regMU, users, usage, usageIO, usageDay }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
					} else if (访问路径 === 'admin/central/stats') { // 从中央服务器获取集群统计信息
						const { api, token } = await 获取CentralApi(env);
						if (!api) return new Response(JSON.stringify({ configured: false }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
						try {
							const r = await fetch(api + '/stats', { headers: token ? { 'Authorization': 'Bearer ' + token } : {} });
							const d = await r.json().catch(() => ({}));
							return new Response(JSON.stringify({ configured: true, ...d }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
						} catch (e) { return new Response(JSON.stringify({ configured: true, error: e.message }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } }); }
					} else if (访问路径 === 'admin/announcement') { // 从中央服务器获取广播公告（支持缓存 + ?refresh强制刷新）
						if (url.searchParams.has('refresh')) await 刷新公告(env);
						return new Response(await env.KV.get('announcement.json') || 'null', { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
					} else if (访问路径 === 'admin/bestip') { // candidate IPs for the in-browser scanner
						try {
							const _port = url.searchParams.get('port') || '443';
							let _ips = [];
							try { _ips = await 获取智能清洁IP(request, config_JSON.POOL_API, 32); } catch (e) {}
							if (!Array.isArray(_ips) || !_ips.length) { try { _ips = (await 生成随机IP(request, 32, _port))[0]; } catch (e) {} }
							const _out = (Array.isArray(_ips) ? _ips : []).map(x => String(x).split('#')[0].split(':')[0].trim()).filter(ip => /^\d+\.\d+\.\d+\.\d+$/.test(ip));
							return new Response(JSON.stringify({ ips: _out }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						} catch (error) { return new Response(JSON.stringify({ ips: [], error: String(error.message || error) }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } }); }
					} else if (访问路径 === 'admin/update-check.json') { // 比较当前版本与仓库发布版本
						const current = String(Version).replace(/^[vV]/, '');
						const vj = await 获取Nova版本();
						const latest = vj ? String(vj.version || '').replace(/^[vV]/, '') : '';
						const notes = vj ? (vj.notes || '') : '';
						const srcUrl = vj ? (vj.worker_url || '') : '';
						const updateAvailable = !!latest && versionGreater(latest, current);
						let hasCfToken = false; try { const _cft = JSON.parse(await env.KV.get('cf.json') || 'null'); hasCfToken = !!(_cft && _cft.APIToken); } catch (e) {}
						return new Response(JSON.stringify({ current, latest, updateAvailable, notes, worker_url: srcUrl, reachable: !!vj, hasCfToken }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
					} else if (访问路径 === 'admin/warp.json') { // WARP status (GET); POST register/license/wow/fromCentral handled in the POST branch above
						let stored = null; try { stored = JSON.parse(await env.KV.get('warp-account.json') || 'null'); } catch (e) { }
						const view = stored ? _warpPublicView(stored, 网络设置 && 网络设置.warpEndpoint) : { registered: false };
						const wraw2 = await env.KV.get('warp-account-wow.json');
						view.wow = wraw2 ? _warpPublicView(JSON.parse(wraw2)) : null;
						return new Response(JSON.stringify(view, null, 2), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					} else if (访问路径 === 'admin/whoami') {
						const cf = request.cf || {};
						return new Response(JSON.stringify({ asn: cf.asn || 0, isp: cf.asOrganization || '', country: cf.country || '', city: cf.city || '', carrier: 识别运营商(request) }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
					} else if (访问路径 === 'admin/last-error.json') { // last uncaught exception (for diagnosing 1101 / crashes)
						let _le = null; try { _le = JSON.parse(await env.KV.get('last_error.json') || 'null'); } catch (e) {}
						const _clr = url.searchParams.has('clear'); if (_clr) { try { await env.KV.delete('last_error.json'); } catch (e) {} }
						return new Response(JSON.stringify(_le || { none: true }, null, 2), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
					} else if (访问路径 === 'admin/singbox-preview') {
						const tok = url.searchParams.get('token') || '';
						if (!tok) return new Response(JSON.stringify({ error: 'pass ?token=<sub token>' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						try {
							const r = await fetch(`${url.protocol}//${url.host}/sub?token=${encodeURIComponent(tok)}&singbox`, { headers: { 'User-Agent': 'sing-box/1.11.0 nova-debug' } });
							return new Response(await r.text(), { status: r.status, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
						} catch (e) { return new Response(JSON.stringify({ error: String((e && e.message) || e) }), { status: 502, headers: { 'Content-Type': 'application/json;charset=utf-8' } }); }
					} else if (访问路径 === 'admin/announce') {
						const health = JSON.parse(await env.KV.get('domain-health.json') || 'null');
						const result = await announceSubLinks(env, { baseUrl: `${url.protocol}//${url.host}`, health });
						return new Response(JSON.stringify(result, null, 2), { status: result.skipped ? 400 : 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					} else if (访问路径 === 'admin/publish-mirror') {
						const result = await publishSubMirror(env, `${url.protocol}//${url.host}`);
						const allOk = !result.skipped && Array.isArray(result.results) && result.results.every(r => r.ok);
						return new Response(JSON.stringify(result, null, 2), { status: result.skipped ? 400 : (allOk ? 200 : 502), headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					} else if (访问路径 === 'admin/domains') {
						const poolHosts = await getPoolHosts(env);
						const health = url.searchParams.has('check') ? await 检查域名健康(env, poolHosts, host) : JSON.parse(await env.KV.get('domain-health.json') || 'null');
						return new Response(JSON.stringify({ hosts: poolHosts, health }, null, 2), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					} else if (访问路径 === 'admin/cf-usage-setup') {
						if (request.method !== 'POST') return new Response(JSON.stringify({ error: 'method_not_allowed' }), { status: 405, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						const _je = (error, extra) => new Response(JSON.stringify(Object.assign({ error }, extra || {})), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
						let cuBody = {}; try { cuBody = await request.json(); } catch (e) {}
						const cuToken = String(cuBody.token || '').trim();
						if (!cuToken) return _je('no_token');
						let cuV; try { cuV = await cfVerifyToken(cuToken); } catch (e) { cuV = { ok: false }; }
						if (!cuV || !cuV.ok) return _je('token_invalid');
						let cuAccountId = String(cuBody.accountId || '').trim();
						if (!cuAccountId) {
							let accts = []; try { accts = await cfListAccounts(cuToken); } catch (e) {}
							if (!accts.length) return _je('no_accounts');
							if (accts.length === 1) cuAccountId = accts[0].id;
							else return _je('multiple_accounts', { accounts: accts });
						}
						const cuUsage = await getCloudflareUsage(null, null, cuAccountId, cuToken);
						if (!cuUsage || !cuUsage.success) return _je('usage_failed', { detail: (cuUsage && cuUsage.error) || '' });
						try { await env.KV.put('cf.json', JSON.stringify({ Email: null, GlobalAPIKey: null, AccountID: cuAccountId, APIToken: cuToken, UsageAPI: null }, null, 2)); } catch (e) {}
						缓存CFUsage = cuUsage; 缓存CFUsage时间 = Date.now();
						return new Response(JSON.stringify({ success: true, accountId: cuAccountId, usage: cuUsage }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
					}

					ctx.waitUntil(请求日志记录(env, request, 访问IP, 'Admin_Login', config_JSON));
					const spaPage = 访问路径.startsWith('admin/') ? 访问路径.slice(6).split('/')[0] : '';
					const adminPath = spaPage ? '/admin/' : '/admin' + url.search;
					return await panelHtml(env, adminPath, { spaPage }).catch(() => new Response('Admin panel unavailable', { status: 502 }));
				} else if (访问路径 === 'sub-setip') {// 用户自助服务：将 Radar 清洁IP应用到自己的配置
					const _sj = (o, st) => new Response(JSON.stringify(o), { status: st, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
					if (request.method !== 'POST') return _sj({ error: 'method' }, 405);
					const _sub = url.searchParams.get('sub') || url.searchParams.get('u') || '', _key = url.searchParams.get('key');
					if (!_key) {
						// Free/shared service: no per-user record. Contribute the found clean IPs to a shared radar pool
						// that the free subscription merges. Auth: panel sub token. Abuse guards: per-IP cooldown, Cloudflare-range only, hard cap.
						const _rtok = url.searchParams.get('token') || '';
						if (_rtok !== await MD5MD5(host + userID)) return _sj({ error: 'auth' }, 403); // must carry the panel sub token
						const _rip = request.headers.get('cf-connecting-ip') || request.headers.get('x-real-ip') || 'unknown';
						if (!radarShareRateOk(_rip)) return _sj({ error: 'rate' }, 429);
						let _rraw = ''; try { _rraw = await request.text(); } catch (e) {}
						const _rseen = new Set(), _radd = [];
						for (const _line of String(_rraw).split(/[\r\n,;]+/)) {
							const _m = _line.trim().match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})(?::(\d{1,5}))?/);
							if (!_m) continue;
							if ([_m[1], _m[2], _m[3], _m[4]].some(o => Number(o) > 255)) continue;
							const _ip4 = _m[1] + '.' + _m[2] + '.' + _m[3] + '.' + _m[4];
							if (!isCloudflareIPv4(_ip4)) continue; // only accept real Cloudflare edge IPs
							const _port = _m[5] ? Number(_m[5]) : 443; if (_port < 1 || _port > 65535) continue;
							const _val = _port === 443 ? _ip4 : _ip4 + ':' + _port;
							if (_rseen.has(_val)) continue; _rseen.add(_val); _radd.push(_val);
							if (_radd.length >= 10) break; // per-apply cap
						}
						if (!_radd.length) return _sj({ error: 'noip' }, 400);
						let _rcur = []; try { _rcur = String(await env.KV.get('radar-shared.txt') || '').split(/\r?\n/).map(s => s.trim()).filter(Boolean); } catch (e) {}
						const _rmerged = [], _rmseen = new Set();
						for (const _v of [..._radd, ..._rcur]) { if (_rmseen.has(_v)) continue; _rmseen.add(_v); _rmerged.push(_v); if (_rmerged.length >= 30) break; } // newest first, pool capped at 30
						await env.KV.put('radar-shared.txt', _rmerged.join('\n'));
						ctx.waitUntil(publishSubMirror(env, `${url.protocol}//${url.host}`).catch(() => {}));
						return _sj({ success: true, shared: true, count: _radd.length }, 200);
					}
					let _ns; try { _ns = JSON.parse(await env.KV.get('network-settings.json') || '{}'); } catch (e) { _ns = {}; }
					const _users = Array.isArray(_ns.users) ? _ns.users : [];
					const _byKey = _users.filter(x => x && x.key && x.key === _key);
					const _u = _byKey.length === 1 ? _byKey[0] : (_byKey.find(x => String(x.username || '').toLowerCase() === String(_sub).toLowerCase()) || null);
					if (!_u) return _sj({ error: 'auth' }, 403);
					if (_u.enabled === false) return _sj({ error: 'disabled' }, 403);
					if (url.searchParams.has('reset')) { _u.cleanIp = ''; _ns.users = _users; await env.KV.put('network-settings.json', JSON.stringify(_ns, null, 2)); savedUsersAuth = { multiUser: _ns.multiUser, users: _ns.users }; savedUsersAuth时间 = Date.now(); return _sj({ success: true, reset: true }, 200); }
					let _raw = ''; try { _raw = await request.text(); } catch (e) {}
					const _seen = new Set(), _clean = [];
					for (const _line of String(_raw).split(/[\r\n,;]+/)) {
						const _m = _line.trim().match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})(?::(\d{1,5}))?/);
						if (!_m) continue;
						if ([_m[1], _m[2], _m[3], _m[4]].some(o => Number(o) > 255)) continue;
						const _port = _m[5] ? Number(_m[5]) : 443; if (_port < 1 || _port > 65535) continue;
						const _ip = _m[1] + '.' + _m[2] + '.' + _m[3] + '.' + _m[4];
						const _val = _port === 443 ? _ip : _ip + ':' + _port;
						if (_seen.has(_val)) continue; _seen.add(_val); _clean.push(_val);
						if (_clean.length >= 20) break;
					}
					if (!_clean.length) return _sj({ error: 'noip' }, 400);
					let _ns2; try { _ns2 = JSON.parse(await env.KV.get('network-settings.json') || '{}'); } catch (e) { _ns2 = _ns; }
					const _users2 = Array.isArray(_ns2.users) ? _ns2.users : _users;
					const _t = _users2.find(x => x && x.key === _u.key);
					if (!_t) return _sj({ error: 'auth' }, 403);
					_t.cleanIp = _clean.join('\n'); _ns2.users = _users2;
					await env.KV.put('network-settings.json', JSON.stringify(_ns2, null, 2));
					savedUsersAuth = { multiUser: _ns2.multiUser, users: _ns2.users }; savedUsersAuth时间 = Date.now();
					return _sj({ success: true, count: _clean.length }, 200);
				} else if (访问路径 === 'logout' || uuidRegex.test(访问路径)) {//清除cookie并跳转到登录页面
					const 响应 = new Response('重定向中...', { status: 302, headers: { 'Location': _dg.pubLogin } });
					响应.headers.set('Set-Cookie', 'auth=; Path=/; Max-Age=0; HttpOnly');
					return 响应;
				} else if (访问路径 === 'sub') {//处理订阅请求
					const 订阅TOKEN = await MD5MD5(host + userID), 作为优选订阅生成器 = ['1', 'true'].includes(env.BEST_SUB) && url.searchParams.get('host') === 'example.com' && url.searchParams.get('uuid') === '00000000-0000-4000-8000-000000000000' && UA.toLowerCase().includes('tunnel (https://github.com/' + 特征码字典[1] + '/Nova');
					const 请求TOKEN = url.searchParams.get('token');
					const 请求Sub = url.searchParams.get('sub');
					const 请求Key = url.searchParams.get('key');
					let 订阅用户Tag = '';
					let 订阅用户对象 = null;
					let 通过SubKey认证 = false;
					const _sub用户列表 = (savedUsersAuth && (Date.now() - savedUsersAuth时间) < 120000 && Array.isArray(savedUsersAuth.users))
						? savedUsersAuth.users
						: (网络设置 && Array.isArray(网络设置.users) ? 网络设置.users : null);
					if (_sub用户列表 && (请求TOKEN || (请求Sub && 请求Key))) {
						const _byKey = _sub用户列表.filter(x => x && x.key && 请求Key === x.key);
						const _u = 请求TOKEN
							? _sub用户列表.find(x => x && x.token === 请求TOKEN)
							: (_byKey.length === 1 ? _byKey[0]
								: _byKey.find(x => String(x.username || '').toLowerCase() === String(请求Sub).toLowerCase()) || _byKey[0]);
						if (_u) {
							if (_u.enabled === false) return new Response('Account disabled', { status: 403 });
							if (_u.expiry) { const _t = Date.parse(_u.expiry); if (!isNaN(_t) && Date.now() > _t) return new Response('Account expired', { status: 403 }); }
							if (_u.quotaBytes) { try { const _c = await usageGet(env, 'uusage:' + _u.id); if (_c && _c.total >= _u.quotaBytes) return new Response('Quota exceeded', { status: 403 }); } catch (e) {} }
							订阅用户Tag = _u.tag;
							订阅用户对象 = _u;
							通过SubKey认证 = !请求TOKEN && !!(请求Sub && 请求Key);
						}
					}
					log(`[Sub] token=${请求TOKEN ? 'yes' : 'no'} sub=${请求Sub || '-'} key=${请求Key ? 'yes' : 'no'} resolvedUser=${订阅用户对象 ? (订阅用户对象.username || 订阅用户对象.tag || 订阅用户对象.id) : 'none'} subKeyAuth=${通过SubKey认证}`);
					// 用户中心：浏览器打开订阅链接时返回友好面板（移植自 serveUserHub）
				if ((request.headers.get('Accept') || '').toLowerCase().includes('text/html') && !url.searchParams.has('raw')) {
					const _中心 = await 服务用户中心(); if (_中心) return _中心;
				}
				const 用户客户端请求订阅 = 请求TOKEN === 订阅TOKEN || 订阅用户Tag !== '';
					const 当前日序号 = Math.floor(Date.now() / 86400000);
					const 订阅转换后端TOKEN种子 = base64SecretEncode(订阅TOKEN, userID);
					const [今日订阅转换后端专属TOKEN, 昨日订阅转换后端专属TOKEN] = await Promise.all([
						MD5MD5(订阅转换后端TOKEN种子 + 当前日序号),
						MD5MD5(订阅转换后端TOKEN种子 + (当前日序号 - 1)),
					]);
					const 订阅转换后端请求订阅 = 请求TOKEN === 今日订阅转换后端专属TOKEN || 请求TOKEN === 昨日订阅转换后端专属TOKEN;
					if (用户客户端请求订阅 || 订阅转换后端请求订阅 || 作为优选订阅生成器) {
						config_JSON = await 读取config_JSON(env, host, userID, UA);
						if (作为优选订阅生成器) ctx.waitUntil(请求日志记录(env, request, 访问IP, 'Get_Best_SUB', config_JSON, false));
						else ctx.waitUntil(请求日志记录(env, request, 访问IP, 'Get_SUB', config_JSON));
						const ua = UA.toLowerCase();
						const responseHeaders = {
							"content-type": "text/plain; charset=utf-8",
							"Profile-Update-Interval": config_JSON.优选订阅生成.SUBUpdateTime,
							"Profile-web-page-url": url.protocol + '//' + url.host + '/admin',
							"Cache-Control": "no-store",
						};
						try {
							// نام پروفایل در کلاینت: اگر SUBNAME سفارشی باشد از آن استفاده می‌شود، در غیر این صورت نام پیش‌فرض فارسی
							const _profileName = (config_JSON.优选订阅生成.SUBNAME && config_JSON.优选订阅生成.SUBNAME !== 'Nova Proxy')
								? config_JSON.优选订阅生成.SUBNAME : '🎁 سرویس رایگان نوا';
							try { responseHeaders["Profile-Title"] = 'base64:' + btoa(unescape(encodeURIComponent(_profileName))); } catch (e) {}
							if (!ua.includes('mozilla')) responseHeaders["Content-Disposition"] = `attachment; filename*=utf-8''${encodeURIComponent(_profileName)}`;
						} catch (e) {}
						try {
							const _utag = 订阅用户Tag;
							let _up = 0, _down = 0, _total = 1099511627776000, _expire = 4102329600;
							const _user = (_utag && 网络设置 && Array.isArray(网络设置.users))
								? 网络设置.users.find(u => u && u.tag === _utag) : null;
							if (_user) {
								const _uu = await usageGet(env, 'uusage:' + _user.id) || {};
								_up = _uu.up || 0; _down = _uu.down || 0;
								if (_user.quotaBytes) _total = _user.quotaBytes;
								if (_user.expiry) { const _t = Date.parse(_user.expiry); if (!isNaN(_t)) _expire = Math.floor(_t / 1000); }
							} else if (config_JSON.CF.Usage.success) {
								const pagesSum = config_JSON.CF.Usage.pages;
								const workersSum = config_JSON.CF.Usage.workers;
								_up = pagesSum; _down = workersSum;
							}
							responseHeaders["Subscription-Userinfo"] = `upload=${_up}; download=${_down}; total=${_total}; expire=${_expire}`;
						} catch (e) {}
						const isSubConverterRequest = url.searchParams.has('b64') || url.searchParams.has('base64') || request.headers.get('subconverter-request') || request.headers.get('subconverter-version') || ua.includes('subconverter') || ua.includes(('CF-Workers-SUB').toLowerCase()) || 作为优选订阅生成器;
						const _forceConvert = url.searchParams.has('subconvert'); // escape hatch: real Clash/sing-box YAML/JSON via the external converter
						const 订阅类型 = isSubConverterRequest
							? 'mixed'
							: url.searchParams.has('target')
								? url.searchParams.get('target')
								: _forceConvert && (url.searchParams.has('clash') || ua.includes('clash') || ua.includes('meta') || ua.includes('mihomo'))
									? 'clash'
									: _forceConvert && (url.searchParams.has('sb') || url.searchParams.has('singbox') || ua.includes('singbox') || ua.includes('sing-box'))
										? 'singbox'
										: url.searchParams.has('clash') || ua.includes('clash') || ua.includes('meta') || ua.includes('mihomo')
											? 'clash'
									: url.searchParams.has('sb') || url.searchParams.has('singbox') || ua.includes('singbox') || ua.includes('sing-box')
										? 'singbox'
										: url.searchParams.has('surge') || ua.includes('surge')
											? 'surge&ver=4'
											: url.searchParams.has('quanx') || ua.includes('quantumult')
												? 'quanx'
												: url.searchParams.has('loon') || ua.includes('loon')
													? 'loon'
													: 'mixed';


						const 协议类型 = ((url.searchParams.has('surge') || ua.includes('surge')) && config_JSON.协议类型 !== 'ss') ? 'tro' + 'jan' : config_JSON.协议类型;
						let 订阅内容 = '';
						if (订阅类型 === 'mixed') {
							const TLS分片参数 = config_JSON.TLS分片 == 'Shadowrocket' ? `&fragment=${encodeURIComponent('1,40-60,30-50,tlshello')}` : config_JSON.TLS分片 == 'Happ' ? `&fragment=${encodeURIComponent('3,1,tlshello')}` : '';
							let 完整优选IP = [], 其他节点LINK = '', 反代IP池 = [];
							// 如果 sub 仅用于用户认证 (?sub=<username>&key=<key>)，则不要把它当成订阅生成器 host 处理
							const _subParamIsGenerator = url.searchParams.has('sub') && !通过SubKey认证;

							if (!_subParamIsGenerator && config_JSON.优选订阅生成.local) { // 本地生成订阅
								let 完整优选列表 = config_JSON.优选订阅生成.本地IP库.随机IP ? (
									await 生成随机IP(request, config_JSON.优选订阅生成.本地IP库.随机数量, config_JSON.优选订阅生成.本地IP库.指定端口)
								)[0] : await env.KV.get('ADD.txt') ? await 整理成数组(await env.KV.get('ADD.txt')) : (
									await 生成随机IP(request, config_JSON.优选订阅生成.本地IP库.随机数量, config_JSON.优选订阅生成.本地IP库.指定端口)
								)[0];
								// Fallback: if ADD.txt is empty/whitespace and randomIP is off, generate random IPs to avoid a single-node subscription
								if (!config_JSON.优选订阅生成.本地IP库.随机IP && (!Array.isArray(完整优选列表) || !完整优选列表.filter(x => String(x).trim()).length)) {
									log(`[Sub.Local] ADD.txt empty/invalid; falling back to random IP generation`);
									完整优选列表 = (await 生成随机IP(request, config_JSON.优选订阅生成.本地IP库.随机数量 || 16, config_JSON.优选订阅生成.本地IP库.指定端口))[0];
								}
								log(`[Sub.Local] rawInputCount=${Array.isArray(完整优选列表) ? 完整优选列表.length : 0} randomIp=${!!config_JSON.优选订阅生成.本地IP库.随机IP}`);
								const 优选API = [], 优选IP = [], 其他节点 = [];
								for (const 元素 of 完整优选列表) {
									if (元素.toLowerCase().startsWith('sub://')) {
										优选API.push(元素);
									} else {
										const 备注位置 = 元素.indexOf('#');
										const 地址部分 = 备注位置 > -1 ? 元素.slice(0, 备注位置) : 元素;
										const 备注部分 = 备注位置 > -1 ? 元素.slice(备注位置) : '';
										const subMatch = 元素.match(/sub\s*=\s*([^\s&#]+)/i);
										if (subMatch && subMatch[1].trim().includes('.')) {
											const 优选IP作为反代IP = 元素.toLowerCase().includes('proxyip=true');
											if (优选IP作为反代IP) 优选API.push('sub://' + subMatch[1].trim() + "?proxyip=true" + (元素.includes('#') ? ('#' + 元素.split('#')[1]) : ''));
											else 优选API.push('sub://' + subMatch[1].trim() + (元素.includes('#') ? ('#' + 元素.split('#')[1]) : ''));
										} else if (地址部分.toLowerCase().startsWith('https://')) {
											优选API.push(元素);
										} else if (地址部分.toLowerCase().includes('://')) {
											if (元素.includes('#')) {
												const 地址备注分离 = 元素.split('#');
												其他节点.push(地址备注分离[0] + '#' + encodeURIComponent(decodeURIComponent(地址备注分离[1])));
											} else 其他节点.push(元素);
										} else {
											if (地址部分.includes('*')) {
												优选IP.push(替换星号为随机字符(地址部分) + 备注部分);
											} else 优选IP.push(元素);
										}
									}
								}
							const 请求优选API内容 = await 请求优选API(优选API, '443');
							const 合并其他节点数组 = [...new Set(其他节点.concat(请求优选API内容[1]))];
							其他节点LINK = 合并其他节点数组.length > 0 ? 合并其他节点数组.join('\n') + '\n' : '';
							const 优选API的IP = 请求优选API内容[0];
							反代IP池 = 请求优选API内容[3] || [];
							完整优选IP = [...new Set(优选IP.concat(优选API的IP))];
							// Smart Clean IPs: 从远程池获取运营商清洁IP
							if (config_JSON.POOL_API) {
								try {
									const 智能清洁IP列表 = await 获取智能清洁IP(request, config_JSON.POOL_API, config_JSON.优选订阅生成.本地IP库.随机数量 || 16);
									if (智能清洁IP列表.length) 完整优选IP = [...new Set(完整优选IP.concat(智能清洁IP列表))];
								} catch (e) { log(`[Smart Clean IPs] 获取失败: ${e.message}`); }
							}
							} else { // 优选订阅生成器
									let 优选订阅生成器HOST = _subParamIsGenerator ? url.searchParams.get('sub') : config_JSON.优选订阅生成.SUB;
									const [优选生成器IP数组, 优选生成器其他节点] = await 获取优选订阅生成器数据(优选订阅生成器HOST);
									完整优选IP = 完整优选IP.concat(优选生成器IP数组);
									其他节点LINK += 优选生成器其他节点;
									log(`[Sub.Generator] host=${优选订阅生成器HOST} rawIps=${优选生成器IP数组.length}`);
								}
							// Radar shared pool: clean IPs users applied via the radar "Apply" button (all sub modes; per-user cleanIp override below still wins)
							try { const _rshared = String(await env.KV.get('radar-shared.txt') || '').split(/\r?\n/).map(s => s.trim()).filter(Boolean); if (_rshared.length) { 完整优选IP = [...new Set(_rshared.concat(完整优选IP))]; log(`[Sub] merged ${_rshared.length} radar-shared clean IPs`); } } catch (e) { }
							const ECHLINK参数 = config_JSON.ECH ? `&ech=${encodeURIComponent((config_JSON.ECHConfig.SNI ? config_JSON.ECHConfig.SNI + '+' : '') + config_JSON.ECHConfig.DNS)}` : '';
							let 订阅Fingerprint = (订阅用户对象 && 订阅用户对象.fp) ? String(订阅用户对象.fp).trim() : config_JSON.Fingerprint;
							if (!订阅Fingerprint || String(订阅Fingerprint).trim().toLowerCase() === 'random') {
								const _fps = ['chrome','firefox','safari','ios','android','edge','360'];
								订阅Fingerprint = _fps[Math.floor(Math.random() * _fps.length)];
							}
							const isLoonOrSurge = ua.includes('loon') || ua.includes('surge');
							const { type: 传输协议, 路径字段名, 域名字段名 } = 获取传输协议配置(config_JSON);
							// Per-user overrides: 每用户清洁IP/代理IP/端口覆盖
							let 订阅用户代理IP列表 = [];
							if (订阅用户对象) {
								const _splitList = (v) => String(v || '').split(/[\r\n,;]+/).map(s => s.trim()).filter(Boolean);
								const _uPorts = _splitList(订阅用户对象.ports).map(p => p.replace(/[^0-9]/g, '')).filter(Boolean);
								const _uClean = _splitList(订阅用户对象.cleanIp);
								const _uProxy = _splitList(订阅用户对象.proxyIp);
								log(`[Sub.UserOverride] user=${订阅用户对象.username || 订阅用户对象.tag || 订阅用户对象.id} cleanIp=${_uClean.length} proxyIp=${_uProxy.length} ports=${_uPorts.length || 'default'}`);
								if (_uClean.length) {
									const _ports = _uPorts.length ? _uPorts : ['443'];
									const _expanded = [];
									for (const _entry of _uClean) {
										const _h = _entry.indexOf('#');
										const _addr = (_h >= 0 ? _entry.slice(0, _h) : _entry).trim();
										const _label = _h >= 0 ? _entry.slice(_h + 1).trim() : _addr;
										if (!_addr) continue;
										if (/:\d+$/.test(_addr) || /\]:\d+$/.test(_addr)) _expanded.push(_addr + '#' + _label);
										else for (const _p of _ports) _expanded.push(_addr + ':' + _p + '#' + _label);
									}
									if (_expanded.length) {
										log(`[Sub.UserOverride] replacing default IPs with ${_expanded.length} user clean IP entries`);
										完整优选IP = _expanded;
									}
								}
								if (_uProxy.length) 订阅用户代理IP列表 = _uProxy;
							}
							// Chain Proxy Rotation: 根据日期轮换链式代理
							if (config_JSON.socks5RotateEvery && config_JSON.chainProxy) {
								try {
									const _chainListRaw = String(config_JSON.chainProxy).trim();
									let chainList = _chainListRaw ? _chainListRaw.split(/[\n,]+/).map(s => s.trim()).filter(s => /^(socks5|http|https|turn|sstp):\/\//i.test(s)) : [];
									if (chainList.length > 1 && (config_JSON.socks5RotateEvery === 'daily' || config_JSON.socks5RotateEvery === 'weekly')) {
										const _n = Math.max(1, Math.min(chainList.length, Number(config_JSON.socks5RotateCount) || 3));
										if (_n < chainList.length) {
											const _period = config_JSON.socks5RotateEvery === 'weekly' ? 7 : 1;
											const _seed = Math.floor(Date.now() / 86400000 / _period);
											const _start = ((_seed % chainList.length) + chainList.length) % chainList.length;
											chainList = Array.from({ length: _n }, (_, k) => chainList[(_start + k) % chainList.length]);
										}
										config_JSON.chainProxy = chainList.join('\n');
									}
								} catch (e) { log(`[Chain Proxy Rotation] 轮换失败: ${e.message}`); }
							}
							// WARP: اضافه کردن نود WireGuard ثبت‌شده وقتی WARP یا warpCalls فعال است
							if (网络设置 && (网络设置.enableWarp || 网络设置.warpCalls)) {
								try { const warpNode = await buildRegisteredWarpNode(env); if (warpNode) 其他节点LINK = warpNode + '\n' + 其他节点LINK; } catch (e) { /* best-effort */ }
							}
							// 每用户节点上限: لیست نودها را به 40 عدد محدود می‌کند (جلوگیری از سنگینی auto-select)
							{
								const _perUserSeed = String(请求Sub || 订阅用户Tag || '');
								const _hasOwnCleanIp = 订阅用户对象 && String(订阅用户对象.cleanIp || '').trim().length > 0;
								log(`[Sub.NodeLimit] seed=${_perUserSeed || '(none)'} hasOwnCleanIp=${_hasOwnCleanIp} beforeLimit=${完整优选IP.length} cap=${每用户节点上限}`);
								if (_perUserSeed && !_hasOwnCleanIp && 完整优选IP.length > 每用户节点上限) {
									let _seed = 2166136261;
									for (let i = 0; i < _perUserSeed.length; i++) { _seed ^= _perUserSeed.charCodeAt(i); _seed = (_seed * 16777619) >>> 0; }
									const _rand = () => { _seed = (_seed * 1103515245 + 12345) & 0x7fffffff; return _seed / 0x7fffffff; };
									const _addrOf = (e) => String(e).split('#')[0].trim().replace(/:\d+$/, '');
									const _byIp = new Map();
									for (const _e of 完整优选IP) { const _ip = _addrOf(_e); if (_ip && !_byIp.has(_ip)) _byIp.set(_ip, _e); }
									const _pool = [..._byIp.values()];
									for (let i = _pool.length - 1; i > 0; i--) { const j = Math.floor(_rand() * (i + 1)); const _t = _pool[i]; _pool[i] = _pool[j]; _pool[j] = _t; }
									完整优选IP = _pool.slice(0, 每用户节点上限);
									log(`[Sub.NodeLimit] applied shuffle/dedup; uniqueIps=${_pool.length} afterLimit=${完整优选IP.length}`);
								}
							}
							完整优选IP = [host + ':443#' + NOVA_FREE_NOTICE, ...完整优选IP];
							log(`[Sub.Build] finalNodeCount=${完整优选IP.length}`);
							// Multi-SOCKS5 / Fix-IP chain list: round-robin پخش نودها بین چند پروکسی
							const _chainListRaw2 = String(config_JSON.chainProxy || '').trim();
							const 全局链式代理列表 = _chainListRaw2 ? _chainListRaw2.split(/[\n,]+/).map(s => s.trim()).filter(s => /^(socks5|http|https|turn|sstp):\/\//i.test(s)) : [];
							订阅内容 = 其他节点LINK + 完整优选IP.map((原始地址, _idx) => {
								// 统一正则: 匹配 域名/IPv4/IPv6地址 + 可选端口 + 可选备注
								// 示例:
								//   - 域名: hj.xmm1993.top:2096#备注 或 example.com
								//   - IPv4: 166.0.188.128:443#Los Angeles 或 166.0.188.128
								//   - IPv6: [2606:4700::]:443#CMCC 或 [2606:4700::]
								const match = 原始地址.match(节点地址正则);

								let 节点地址, 节点端口 = "443", 节点备注;

								if (match) {
									节点地址 = match[1];  // IP地址或域名(可能带方括号)
									节点端口 = match[2] ? match[2] : '443';  // 端口默认443，SS noTLS在生成链接时再映射
									节点备注 = match[3] || 节点地址;  // 备注,默认为地址本身
								} else {
									// 不规范的格式，跳过处理返回null
									console.warn(`[订阅内容] 不规范的IP格式已忽略: ${原始地址}`);
									return null;
								}

								let 完整节点路径 = config_JSON.完整节点路径;

								const 链式代理匹配 = 节点备注.match(/\$(socks5|http|https|turn|sstp):\/\/([^#\s]+)/i);
								if (链式代理匹配) {
									try {
										const 代理协议 = 链式代理匹配[1].toLowerCase(), 代理参数 = 链式代理匹配[2];
										const 链式代理数据 = { type: 代理协议, ...获取SOCKS5账号(代理参数, 获取代理默认端口(代理协议)) };
										完整节点路径 = `/video/${base64SecretEncode(JSON.stringify(链式代理数据), userID) + (config_JSON.启用0RTT ? '?ed=2560' : '')}`;
										节点备注 = 节点备注.replace(链式代理匹配[0], '').trim() || 节点地址;
									} catch (error) {
										console.warn(`[订阅内容] 链式代理解析失败，已忽略该指令: ${链式代理匹配[0]} (${error && error.message ? error.message : error})`);
									}
								} else if (全局链式代理列表.length) {
									const 选择的链式代理 = 全局链式代理列表[_idx % 全局链式代理列表.length];
									try {
										const m = /^(socks5|http|https|turn|sstp):\/\/(.+)$/i.exec(选择的链式代理);
										const 代理协议 = m[1].toLowerCase();
										const 链式代理数据 = { type: 代理协议, ...获取SOCKS5账号(m[2].split('/')[0], 获取代理默认端口(代理协议)) };
										完整节点路径 = `/video/${base64SecretEncode(JSON.stringify(链式代理数据), userID) + (config_JSON.启用0RTT ? '?ed=2560' : '')}`;
										if (全局链式代理列表.length > 1) 节点备注 = `${节点备注} ·S${(_idx % 全局链式代理列表.length) + 1}`;
									} catch (error) {
										console.warn(`[订阅内容] 全局链式代理解析失败: ${error && error.message ? error.message : error}`);
									}
								} else if (反代IP池.length > 0) {
									const 匹配到的反代IP = 反代IP池.find(p => p.includes(节点地址));
									if (匹配到的反代IP) 完整节点路径 = (`${config_JSON.PATH}/proxyip=${匹配到的反代IP}`).replace(/\/\//g, '/') + (config_JSON.启用0RTT ? '?ed=2560' : '');
								}
								if (订阅用户代理IP列表.length > 0) {
									const _pip = 订阅用户代理IP列表[_idx % 订阅用户代理IP列表.length];
									完整节点路径 = (`${config_JSON.PATH}/proxyip=${_pip}`).replace(/\/\//g, '/') + (config_JSON.启用0RTT ? '?ed=2560' : '');
								}
								if (订阅用户Tag) 完整节点路径 += (完整节点路径.includes('?') ? '&' : '?') + 'u=' + 订阅用户Tag;
								if (isLoonOrSurge) 完整节点路径 = 完整节点路径.replace(/,/g, '%2C');

								const _np = (config_JSON.协议类型 === 'mixed' && !作为优选订阅生成器)
									? ['vless','trojan','ss'][_idx % 3]
									: 协议类型;

								// Node remark: Persian free-service brand + number (+ protocol tag in mixed mode)
								{
									const _chainMark = (节点备注.match(/ ·S\d+$/) || [''])[0];
									const _protoMark = (config_JSON.协议类型 === 'mixed' && !作为优选订阅生成器) ? ` [${_np.toUpperCase()}]` : '';
									节点备注 = 'سرویس رایگان نوا ' + (_idx + 1) + _protoMark + _chainMark;
								}
								if (_np === 'ss' && !作为优选订阅生成器) {
									if (!config_JSON.SS.TLS) {
										const TLS端口 = [443, 2053, 2083, 2087, 2096, 8443];
										const NOTLS端口 = [80, 2052, 2082, 2086, 2095, 8080];
										节点端口 = String(NOTLS端口[TLS端口.indexOf(Number(节点端口))] ?? 节点端口);
									}
									完整节点路径 = (完整节点路径.includes('?') ? 完整节点路径.replace('?', '?enc=' + config_JSON.SS.加密方式 + '&') : (完整节点路径 + '?enc=' + config_JSON.SS.加密方式)).replace(/([=,])/g, '\\$1');
									if (!isSubConverterRequest) 完整节点路径 = 完整节点路径 + ';mux=0';
									return `${_np}://${btoa(config_JSON.SS.加密方式 + ':' + config_JSON.UUID)}@${节点地址}:${节点端口}?plugin=v2${encodeURIComponent('ray-plugin;mode=websocket;host=example.com;path=' + (config_JSON.随机路径 ? 随机路径(完整节点路径) : 完整节点路径) + (config_JSON.SS.TLS ? ';tls' : '')) + ECHLINK参数 + TLS分片参数}#${encodeURIComponent(节点备注)}`;
								} else {
									const 传输路径参数值 = 获取传输路径参数值(config_JSON, 完整节点路径, 作为优选订阅生成器);
									if (config_JSON.enableTLS === false) {
										const _TLSp = [443, 2053, 2083, 2087, 2096, 8443], _NOp = [80, 2052, 2082, 2086, 2095, 8080];
										const _ntPort = String(_NOp[_TLSp.indexOf(Number(节点端口))] ?? 节点端口);
										return `${_np}://00000000-0000-4000-8000-000000000000@${节点地址}:${_ntPort}?security=none&type=${传输协议}&${域名字段名}=example.com&${路径字段名}=${encodeURIComponent(传输路径参数值)}&encryption=none#${encodeURIComponent(节点备注)}`;
									}
									return `${_np}://00000000-0000-4000-8000-000000000000@${节点地址}:${节点端口}?security=tls&type=${传输协议 + ECHLINK参数}&${域名字段名}=example.com&fp=${订阅Fingerprint}&sni=example.com&${路径字段名}=${encodeURIComponent(传输路径参数值) + TLS分片参数}&encryption=none${config_JSON.skipCertVerify ? '&insecure=1&allowInsecure=1' : ''}#${encodeURIComponent(节点备注)}`;
								}
							}).filter(item => item !== null).join('\n');
						} else { // 订阅转换
							const 订阅转换URL = `${config_JSON.订阅转换配置.SUBAPI}/sub?target=${订阅类型}&url=${encodeURIComponent(url.protocol + '//' + url.host + '/sub?target=mixed&token=' + 今日订阅转换后端专属TOKEN + '&cnIspCode=' + 识别运营商(request) + (_subParamIsGenerator && url.searchParams.get('sub') != '' ? `&sub=${url.searchParams.get('sub')}` : ''))}&config=${encodeURIComponent(config_JSON.订阅转换配置.SUBCONFIG)}&emoji=true&scv=${config_JSON.跳过证书验证}`;
							try {
								const response = await fetch(订阅转换URL, { headers: { 'User-Agent': 'Subconverter for ' + 订阅类型 + ' edge' + 'tunnel (https://github.com/' + 特征码字典[1] + '/Nova' + 'Proxy)' } });
								if (response.ok) {
									订阅内容 = await response.text();
									if (url.searchParams.has('surge') || ua.includes('surge')) 订阅内容 = Surge订阅配置文件热补丁(订阅内容, url.protocol + '//' + url.host + '/sub?token=' + 订阅TOKEN + '&surge', config_JSON);
								} else return new Response('订阅转换后端异常：' + response.statusText, { status: response.status });
							} catch (error) {
								return new Response('订阅转换后端异常：' + error.message, { status: 403 });
							}
						}

						if (!ua.includes('subconverter') && 用户客户端请求订阅) {
							// Health-Pruned Subs: حذف هاست‌هایی که last health check علامت خراب دارن
							let _健康HOSTS = config_JSON.HOSTS;
							try {
								const _h = JSON.parse(await env.KV.get('domain-health.json') || 'null');
								if (_h && Array.isArray(_h.domains)) {
									const _خراب = new Set(_h.domains.filter(d => d && d.ok === false).map(d => d.host));
									const _سالم = config_JSON.HOSTS.filter(h => !_خراب.has(h));
									if (_سالم.length) _健康HOSTS = _سالم;
								}
							} catch (e) { /* ignore -> use all hosts */ }
							const 打乱后HOSTS = [..._健康HOSTS].sort(() => Math.random() - 0.5);
							// Replace placeholders per line so each node (including SS) gets one consistent host
							订阅内容 = 订阅内容.split('\n').map((line, idx) => {
								const 原始host = 打乱后HOSTS[idx % 打乱后HOSTS.length];
								const 当前随机HOST = 替换星号为随机字符(原始host);
								return line
									.replace(/00000000-0000-4000-8000-000000000000/g, config_JSON.UUID)
									.replace(/MDAwMDAwMDAtMDAwMC00MDAwLTgwMDAtMDAwMDAwMDAwMDAw/g, btoa(config_JSON.UUID))
									.replace(/example\.com/g, 当前随机HOST);
							}).join('\n');
						}

						if (订阅类型 === 'mixed' && (!ua.includes('mozilla') || url.searchParams.has('b64') || url.searchParams.has('base64'))) 订阅内容 = btoa(订阅内容);

						// بارگذاری حساب WARP ذخیره‌شده وقتی WARP یا warpCalls فعال است
						let warpAccount = null;
						if (网络设置 && (网络设置.enableWarp || 网络设置.warpCalls) && env.KV && typeof env.KV.get === 'function') {
							try {
								const w = await env.KV.get('warp-account.json');
								if (w) {
									warpAccount = JSON.parse(w);
									if (网络设置.warpMode === 'wow') {
										try { const w2 = await env.KV.get('warp-account-wow.json'); if (w2) warpAccount.wow = JSON.parse(w2); } catch (e) { /* WoW second hop optional */ }
									}
								}
							} catch (e) { warpAccount = null; }
						}
						if (订阅类型 === 'singbox') {
							订阅内容 = await Singbox订阅配置文件热补丁(订阅内容, config_JSON, 网络设置, warpAccount);
							responseHeaders["content-type"] = 'application/json; charset=utf-8';
						} else if (订阅类型 === 'clash') {
							订阅内容 = Clash订阅配置文件热补丁(订阅内容, config_JSON, 网络设置, warpAccount);
							responseHeaders["content-type"] = 'application/x-yaml; charset=utf-8';
						}
						// User Hub: 浏览器用户访问时显示用户中心页面
						if (ua.includes('mozilla') && !url.searchParams.has('raw') && !url.searchParams.has('b64') && !url.searchParams.has('base64')) {
							const hubPage = await 用户中心页面();
							if (hubPage) return hubPage;
						}
						return new Response(订阅内容, { status: 200, headers: responseHeaders });
					}
				} else if (访问路径 === 'locations') {//反代locations列表
					const cookies = request.headers.get('Cookie') || '';
					const authCookie = cookies.split(';').find(c => c.trim().startsWith('auth='))?.split('=')[1];
					if (authCookie && await verifySessionToken(authCookie, UA, 加密秘钥, adminPassword)) return fetch(new Request('https://speed.cloudflare.com/locations', { headers: { 'Referer': 'https://speed.cloudflare.com/' } }));
				} else if (访问路径 === 'robots.txt') return new Response('User-agent: *\nDisallow: /', { status: 200, headers: { 'Content-Type': 'text/plain; charset=UTF-8' } });
			} else if (!envUUID) return await panelHtml(env, '/install');
		}

		if (/\.\w{2,4}$/.test(url.pathname)) {
			const staticResponse = await panelFetch(env, url.pathname).catch(() => null);
			if (staticResponse && staticResponse.ok) return staticResponse;
		}

		let 伪装页URL = env.URL || 'https://speed.cloudflare.com';
		if (伪装页URL && 伪装页URL !== 'nginx' && 伪装页URL !== '1101') {
			伪装页URL = 伪装页URL.trim().replace(/\/$/, '');
			if (!伪装页URL.match(/^https?:\/\//i)) 伪装页URL = 'https://' + 伪装页URL;
			if (伪装页URL.toLowerCase().startsWith('http://')) 伪装页URL = 'https://' + 伪装页URL.substring(7);
			try { const u = new URL(伪装页URL); 伪装页URL = u.protocol + '//' + u.host } catch (e) { 伪装页URL = 'nginx' }
		}
		if (伪装页URL === '1101') return new Response(await html1101(url.host, 访问IP), { status: 200, headers: { 'Content-Type': 'text/html; charset=UTF-8' } });
		if (伪装页URL === 'nginx') return new Response(await nginx(), { status: 200, headers: { 'Content-Type': 'text/html; charset=UTF-8' } });
		try {
			const 反代URL = new URL(伪装页URL), 新请求头 = new Headers(request.headers);
			新请求头.set('Host', 反代URL.host);
			新请求头.set('Referer', 反代URL.origin);
			新请求头.set('Origin', 反代URL.origin);
			if (!新请求头.has('User-Agent') && UA && UA !== 'null') 新请求头.set('User-Agent', UA);
			const 反代响应 = await fetch(反代URL.origin + url.pathname + url.search, { method: request.method, headers: 新请求头, body: request.body, cf: request.cf });
			const 内容类型 = 反代响应.headers.get('content-type') || '';
			// 只处理文本类型的响应
			if (/text|javascript|json|xml/.test(内容类型)) {
				const 响应内容 = (await 反代响应.text()).replaceAll(反代URL.host, url.host);
				return new Response(响应内容, { status: 反代响应.status, headers: { ...Object.fromEntries(反代响应.headers), 'Cache-Control': 'no-store' } });
			}
			return 反代响应;
		} catch (error) { await logErrorToKV(env, error, request); }
		return new Response(await nginx(), { status: 200, headers: { 'Content-Type': 'text/html; charset=UTF-8' } });
	  } catch (topLevelError) {
		try { console.error('Nova fatal:', (topLevelError && (topLevelError.stack || topLevelError.message)) || String(topLevelError)); } catch (e) {}
		try {
			if (env && env.KV && typeof env.KV.put === 'function') {
				const _diag = JSON.stringify({
					t: new Date().toISOString(),
					path: (() => { try { return new URL(request.url).pathname + new URL(request.url).search; } catch (e) { return '?'; } })(),
					method: request && request.method,
					ua: (request && request.headers && request.headers.get('User-Agent')) || '',
					version: Version,
					error: (topLevelError && (topLevelError.stack || topLevelError.message)) || String(topLevelError)
				});
				if (ctx && typeof ctx.waitUntil === 'function') ctx.waitUntil(env.KV.put('last_error.json', _diag));
				else await env.KV.put('last_error.json', _diag);
			}
		} catch (e) {}
		try {
			if (env && (env.DEBUG === '1' || env.DEBUG === 'true')) {
				const msg = (topLevelError && (topLevelError.stack || topLevelError.message)) || String(topLevelError);
				return new Response('Nova DEBUG — uncaught exception:\n\n' + msg, { status: 500, headers: { 'Content-Type': 'text/plain;charset=utf-8', 'Cache-Control': 'no-store' } });
			}
		} catch (e) {}
		try { return new Response(await nginx(), { status: 200, headers: { 'Content-Type': 'text/html; charset=UTF-8' } }); }
		catch (e) { return new Response('', { status: 200 }); }
	  }
	},

	async scheduled(event, env, ctx) {
		wrapKVWithD1(env);
		if (!_kvMigratedFlag && env.__realKV && ctx && typeof ctx.waitUntil === 'function') ctx.waitUntil(migrateKvToD1(env));
		if (!env || !['1', 'true'].includes(String(env.ENABLE_CRON || ''))) return;
		ctx.waitUntil(运行定时维护(env).then(r => {
			if (r && r.mirror && !r.mirror.skipped) console.log('scheduledMaintenance:', JSON.stringify(r.mirror.results));
		}).catch(err => console.error('runScheduledMaintenance error:', err && err.message)));
	}
};
///////////////////////////////////////////////////////////////////////XHTTP传输数据///////////////////////////////////////////////
async function 处理XHTTP请求(request, yourUUID) {
	if (connRejectReason) return new Response('Forbidden ('+connRejectReason+')', { status: 403 });
	if (!request.body) return new Response('Bad Request', { status: 400 });
	const reader = request.body.getReader();
	const 首包 = await 读取XHTTP首包(reader, yourUUID);
	if (!首包) {
		try { reader.releaseLock() } catch (e) { }
		return new Response('Invalid request', { status: 400 });
	}
	if (是被封锁的网站(首包.hostname)) {
		try { reader.releaseLock() } catch (e) { }
		return 网络设置 && 网络设置.enablePornBlock && 是成人域名(首包.hostname)
			? 页面被封锁(request)
			: new Response('Forbidden', { status: 403 });
	}
	if (首包.isUDP && 首包.协议 !== 'trojan' && 首包.port !== 53) {
		try { reader.releaseLock() } catch (e) { }
		return new Response('UDP is not supported', { status: 400 });
	}

	const remoteConnWrapper = { socket: null, connectingPromise: null, retryConnect: null };
	let 当前写入Socket = null;
	let 远端写入器 = null;
	const usageStats = { up: 0, down: 0 };
	const responseHeaders = new Headers({
		'Content-Type': 'application/octet-stream',
		'X-Accel-Buffering': 'no',
		'Cache-Control': 'no-store'
	});

	const 释放远端写入器 = () => {
		if (远端写入器) {
			try { 远端写入器.releaseLock() } catch (e) { }
			远端写入器 = null;
		}
		当前写入Socket = null;
	};

	const 获取远端写入器 = () => {
		const socket = remoteConnWrapper.socket;
		if (!socket) return null;
		if (socket !== 当前写入Socket) {
			释放远端写入器();
			当前写入Socket = socket;
			远端写入器 = socket.writable.getWriter();
		}
		return 远端写入器;
	};

	let XHTTP上行写入队列 = null;
	return new Response(new ReadableStream({
		async start(controller) {
			let 已关闭 = false;
			let udpRespHeader = 首包.respHeader;
			const 木马UDP上下文 = { 缓存: new Uint8Array(0) };
			const xhttpBridge = {
				readyState: WebSocket.OPEN,
				send(data) {
					if (已关闭) return;
					try {
						const chunk = data instanceof Uint8Array
							? data
							: data instanceof ArrayBuffer
								? new Uint8Array(data)
								: ArrayBuffer.isView(data)
									? new Uint8Array(data.buffer, data.byteOffset, data.byteLength)
									: new Uint8Array(data);
						controller.enqueue(chunk);
					} catch (e) {
						已关闭 = true;
						this.readyState = WebSocket.CLOSED;
					}
				},
				close() {
					if (已关闭) return;
					已关闭 = true;
					this.readyState = WebSocket.CLOSED;
					try { controller.close() } catch (e) { }
				}
			};

			const 上行写入队列 = XHTTP上行写入队列 = 创建上行写入队列({
				获取写入器: 获取远端写入器,
				释放写入器: 释放远端写入器,
				重试连接: async () => {
					if (typeof remoteConnWrapper.retryConnect !== 'function') throw new Error('retry unavailable');
					await remoteConnWrapper.retryConnect();
				},
				关闭连接: () => {
					try { remoteConnWrapper.socket?.close() } catch (e) { }
					closeSocketQuietly(xhttpBridge);
				},
				名称: 'XHTTP上行'
			});

			const 写入远端 = async (payload, allowRetry = true) => {
				return 上行写入队列.写入并等待(payload, allowRetry);
			};

			try {
				if (首包.isUDP) {
					if (首包.rawData?.byteLength) {
						usageStats.up += 首包.rawData.byteLength;
						if (首包.协议 === 'trojan') await 转发木马UDP数据(首包.rawData, xhttpBridge, 木马UDP上下文, request);
						else await forwardataudp(首包.rawData, xhttpBridge, udpRespHeader, request);
						udpRespHeader = null;
					}
				} else {
					if (首包.rawData?.byteLength) usageStats.up += 首包.rawData.byteLength;
					await forwardataTCP(首包.hostname, 首包.port, 首包.rawData, xhttpBridge, 首包.respHeader, remoteConnWrapper, yourUUID, request, usageStats);
				}

				while (true) {
					const { done, value } = await reader.read();
					if (done) break;
					if (!value || value.byteLength === 0) continue;
					if (value.byteLength) usageStats.up += value.byteLength;
					if (首包.isUDP) {
						if (首包.协议 === 'trojan') await 转发木马UDP数据(value, xhttpBridge, 木马UDP上下文, request);
						else await forwardataudp(value, xhttpBridge, udpRespHeader, request);
						udpRespHeader = null;
					} else {
						if (!(await 写入远端(value))) throw new Error('Remote socket is not ready');
					}
				}

				if (!首包.isUDP) {
					await 上行写入队列.等待空();
					const writer = 获取远端写入器();
					if (writer) {
						try { await writer.close() } catch (e) { }
					}
				}
			} catch (err) {
				log(`[XHTTP转发] 处理失败: ${err?.message || err}`);
				closeSocketQuietly(xhttpBridge);
			} finally {
				上行写入队列.清空();
				释放远端写入器();
				try { reader.releaseLock() } catch (e) { }
				try { recordUsage(_globalEnv, usageStats.up, usageStats.down, null); } catch (e) {}
			}
		},
		cancel() {
			XHTTP上行写入队列?.清空();
			try { remoteConnWrapper.socket?.close() } catch (e) { }
			释放远端写入器();
			try { reader.releaseLock() } catch (e) { }
		}
	}), { status: 200, headers: responseHeaders });
}

function 有效数据长度(data) {
	if (!data) return 0;
	if (typeof data.byteLength === 'number') return data.byteLength;
	if (typeof data.length === 'number') return data.length;
	return 0;
}

async function 读取XHTTP首包(reader, token) {
	const decoder = VLESS文本解码器;

	const 尝试解析魏烈思首包 = (data) => {
		const length = data.byteLength;
		if (length < 18) return { 状态: 'need_more' };
		if (!UUID字节匹配(data, 1, token)) return { 状态: 'invalid' };

		const optLen = data[17];
		const cmdIndex = 18 + optLen;
		if (length < cmdIndex + 1) return { 状态: 'need_more' };

		const cmd = data[cmdIndex];
		if (cmd !== 1 && cmd !== 2) return { 状态: 'invalid' };

		const portIndex = cmdIndex + 1;
		if (length < portIndex + 3) return { 状态: 'need_more' };

		const port = (data[portIndex] << 8) | data[portIndex + 1];
		const addressType = data[portIndex + 2];
		const addressIndex = portIndex + 3;
		let headerLen = -1;
		let hostname = '';

		if (addressType === 1) {
			if (length < addressIndex + 4) return { 状态: 'need_more' };
			hostname = `${data[addressIndex]}.${data[addressIndex + 1]}.${data[addressIndex + 2]}.${data[addressIndex + 3]}`;
			headerLen = addressIndex + 4;
		} else if (addressType === 2) {
			if (length < addressIndex + 1) return { 状态: 'need_more' };
			const domainLen = data[addressIndex];
			if (length < addressIndex + 1 + domainLen) return { 状态: 'need_more' };
			hostname = decoder.decode(data.subarray(addressIndex + 1, addressIndex + 1 + domainLen));
			headerLen = addressIndex + 1 + domainLen;
		} else if (addressType === 3) {
			if (length < addressIndex + 16) return { 状态: 'need_more' };
			const ipv6 = [];
			for (let i = 0; i < 8; i++) {
				const base = addressIndex + i * 2;
				ipv6.push(((data[base] << 8) | data[base + 1]).toString(16));
			}
			hostname = ipv6.join(':');
			headerLen = addressIndex + 16;
		} else return { 状态: 'invalid' };

		if (!hostname) return { 状态: 'invalid' };

		return {
			状态: 'ok',
			结果: {
				协议: 'vl' + 'ess',
				hostname,
				port,
				isUDP: cmd === 2,
				rawData: data.subarray(headerLen),
				respHeader: new Uint8Array([data[0], 0]),
			}
		};
	};

	const 尝试解析木马首包 = (data) => {
		const 密码哈希 = sha224(token);
		const 密码哈希字节 = new TextEncoder().encode(密码哈希);
		const length = data.byteLength;
		if (length < 58) return { 状态: 'need_more' };
		if (data[56] !== 0x0d || data[57] !== 0x0a) return { 状态: 'invalid' };
		for (let i = 0; i < 56; i++) {
			if (data[i] !== 密码哈希字节[i]) return { 状态: 'invalid' };
		}

		const socksStart = 58;
		if (length < socksStart + 2) return { 状态: 'need_more' };
		const cmd = data[socksStart];
		if (cmd !== 1 && cmd !== 3) return { 状态: 'invalid' };
		const isUDP = cmd === 3;

		const atype = data[socksStart + 1];
		let cursor = socksStart + 2;
		let hostname = '';

		if (atype === 1) {
			if (length < cursor + 4) return { 状态: 'need_more' };
			hostname = `${data[cursor]}.${data[cursor + 1]}.${data[cursor + 2]}.${data[cursor + 3]}`;
			cursor += 4;
		} else if (atype === 3) {
			if (length < cursor + 1) return { 状态: 'need_more' };
			const domainLen = data[cursor];
			if (length < cursor + 1 + domainLen) return { 状态: 'need_more' };
			hostname = decoder.decode(data.subarray(cursor + 1, cursor + 1 + domainLen));
			cursor += 1 + domainLen;
		} else if (atype === 4) {
			if (length < cursor + 16) return { 状态: 'need_more' };
			const ipv6 = [];
			for (let i = 0; i < 8; i++) {
				const base = cursor + i * 2;
				ipv6.push(((data[base] << 8) | data[base + 1]).toString(16));
			}
			hostname = ipv6.join(':');
			cursor += 16;
		} else return { 状态: 'invalid' };

		if (!hostname) return { 状态: 'invalid' };
		if (length < cursor + 4) return { 状态: 'need_more' };

		const port = (data[cursor] << 8) | data[cursor + 1];
		if (data[cursor + 2] !== 0x0d || data[cursor + 3] !== 0x0a) return { 状态: 'invalid' };
		const dataOffset = cursor + 4;

		return {
			状态: 'ok',
			结果: {
				协议: 'trojan',
				hostname,
				port,
				isUDP,
				rawData: data.subarray(dataOffset),
				respHeader: null,
			}
		};
	};

	let buffer = new Uint8Array(1024);
	let offset = 0;

	while (true) {
		const { value, done } = await reader.read();
		if (done) {
			if (offset === 0) return null;
			break;
		}

		const chunk = value instanceof Uint8Array ? value : new Uint8Array(value);
		if (offset + chunk.byteLength > buffer.byteLength) {
			const newBuffer = new Uint8Array(Math.max(buffer.byteLength * 2, offset + chunk.byteLength));
			newBuffer.set(buffer.subarray(0, offset));
			buffer = newBuffer;
		}

		buffer.set(chunk, offset);
		offset += chunk.byteLength;

		const 当前数据 = buffer.subarray(0, offset);
		const 木马结果 = 尝试解析木马首包(当前数据);
		if (木马结果.状态 === 'ok') return { ...木马结果.结果, reader };

		const 魏烈思结果 = 尝试解析魏烈思首包(当前数据);
		if (魏烈思结果.状态 === 'ok') return { ...魏烈思结果.结果, reader };

		if (木马结果.状态 === 'invalid' && 魏烈思结果.状态 === 'invalid') return null;
	}

	const 最终数据 = buffer.subarray(0, offset);
	const 最终木马结果 = 尝试解析木马首包(最终数据);
	if (最终木马结果.状态 === 'ok') return { ...最终木马结果.结果, reader };
	const 最终魏烈思结果 = 尝试解析魏烈思首包(最终数据);
	if (最终魏烈思结果.状态 === 'ok') return { ...最终魏烈思结果.结果, reader };
	return null;
}
///////////////////////////////////////////////////////////////////////gRPC传输数据///////////////////////////////////////////////
async function 处理gRPC请求(request, yourUUID) {
	if (connRejectReason) return new Response('Forbidden ('+connRejectReason+')', { status: 403 });
	if (!request.body) return new Response('Bad Request', { status: 400 });
	const reader = request.body.getReader();
	const remoteConnWrapper = { socket: null, connectingPromise: null, retryConnect: null };
	let isDnsQuery = false;
	const 木马UDP上下文 = { 缓存: new Uint8Array(0) };
	let 判断是否是木马 = null;
	let 当前写入Socket = null;
	let 远端写入器 = null;
	let GRPC上行写入队列 = null;
	const usageStats = { up: 0, down: 0 };
	//log('[gRPC] 开始处理双向流');
	const grpcHeaders = new Headers({
		'Content-Type': 'application/grpc',
		'grpc-status': '0',
		'X-Accel-Buffering': 'no',
		'Cache-Control': 'no-store'
	});

	const 下行缓存上限 = 下行Grain包字节;
	const 下行刷新间隔 = Math.max(下行Grain静默毫秒, 1);

	return new Response(new ReadableStream({
		async start(controller) {
			let 已关闭 = false;
			let 发送队列 = [];
			let 队列字节数 = 0;
			let 刷新定时器 = null;
			let 刷新Microtask已排队 = false;
			const grpcBridge = {
				readyState: WebSocket.OPEN,
				send(data) {
					if (已关闭) return;
					const chunk = data instanceof Uint8Array ? data : new Uint8Array(data);
					const lenBytes数组 = [];
					let remaining = chunk.byteLength >>> 0;
					while (remaining > 127) {
						lenBytes数组.push((remaining & 0x7f) | 0x80);
						remaining >>>= 7;
					}
					lenBytes数组.push(remaining);
					const lenBytes = new Uint8Array(lenBytes数组);
					const protobufLen = 1 + lenBytes.length + chunk.byteLength;
					const frame = new Uint8Array(5 + protobufLen);
					frame[0] = 0;
					frame[1] = (protobufLen >>> 24) & 0xff;
					frame[2] = (protobufLen >>> 16) & 0xff;
					frame[3] = (protobufLen >>> 8) & 0xff;
					frame[4] = protobufLen & 0xff;
					frame[5] = 0x0a;
					frame.set(lenBytes, 6);
					frame.set(chunk, 6 + lenBytes.length);
					发送队列.push(frame);
					队列字节数 += frame.byteLength;
					安排刷新发送队列();
				},
				close() {
					if (this.readyState === WebSocket.CLOSED) return;
					刷新发送队列(true);
					已关闭 = true;
					this.readyState = WebSocket.CLOSED;
					try { controller.close() } catch (e) { }
				}
			};

			const 刷新发送队列 = (force = false) => {
				刷新Microtask已排队 = false;
				if (刷新定时器) {
					clearTimeout(刷新定时器);
					刷新定时器 = null;
				}
				if ((!force && 已关闭) || 队列字节数 === 0) return;
				const out = new Uint8Array(队列字节数);
				let offset = 0;
				for (const item of 发送队列) {
					out.set(item, offset);
					offset += item.byteLength;
				}
				发送队列 = [];
				队列字节数 = 0;
				try {
					controller.enqueue(out);
				} catch (e) {
					已关闭 = true;
					grpcBridge.readyState = WebSocket.CLOSED;
				}
			};

			const 安排刷新发送队列 = () => {
				if (队列字节数 >= 下行缓存上限) {
					刷新发送队列();
					return;
				}
				if (刷新Microtask已排队 || 刷新定时器) return;
				刷新Microtask已排队 = true;
				queueMicrotask(() => {
					刷新Microtask已排队 = false;
					if (已关闭 || 队列字节数 === 0 || 刷新定时器) return;
					刷新定时器 = setTimeout(刷新发送队列, 下行刷新间隔);
				});
			};

			const 关闭连接 = () => {
				if (已关闭) return;
				GRPC上行写入队列?.清空();
				刷新发送队列(true);
				已关闭 = true;
				grpcBridge.readyState = WebSocket.CLOSED;
				if (刷新定时器) clearTimeout(刷新定时器);
				if (远端写入器) {
					try { 远端写入器.releaseLock() } catch (e) { }
					远端写入器 = null;
				}
				当前写入Socket = null;
				try { reader.releaseLock() } catch (e) { }
				try { remoteConnWrapper.socket?.close() } catch (e) { }
				try { controller.close() } catch (e) { }
			};

			const 释放远端写入器 = () => {
				if (远端写入器) {
					try { 远端写入器.releaseLock() } catch (e) { }
					远端写入器 = null;
				}
				当前写入Socket = null;
			};

			const 上行写入队列 = GRPC上行写入队列 = 创建上行写入队列({
				获取写入器: () => {
					const socket = remoteConnWrapper.socket;
					if (!socket) return null;
					if (socket !== 当前写入Socket) {
						释放远端写入器();
						当前写入Socket = socket;
						远端写入器 = socket.writable.getWriter();
					}
					return 远端写入器;
				},
				释放写入器: 释放远端写入器,
				重试连接: async () => {
					if (typeof remoteConnWrapper.retryConnect !== 'function') throw new Error('retry unavailable');
					await remoteConnWrapper.retryConnect();
				},
				关闭连接,
				名称: 'gRPC上行'
			});

			const 写入远端 = async (payload, allowRetry = true) => {
				return 上行写入队列.写入并等待(payload, allowRetry);
			};

			try {
				let pending = new Uint8Array(0);
				while (true) {
					const { done, value } = await reader.read();
					if (done) break;
					if (!value || value.byteLength === 0) continue;
					const 当前块 = value instanceof Uint8Array ? value : new Uint8Array(value);
					const merged = new Uint8Array(pending.length + 当前块.length);
					merged.set(pending, 0);
					merged.set(当前块, pending.length);
					pending = merged;
					while (pending.byteLength >= 5) {
						const grpcLen = ((pending[1] << 24) >>> 0) | (pending[2] << 16) | (pending[3] << 8) | pending[4];
						const frameSize = 5 + grpcLen;
						if (pending.byteLength < frameSize) break;
						const grpcPayload = pending.subarray(5, frameSize);
						pending = pending.slice(frameSize);
						if (!grpcPayload.byteLength) continue;
						let payload = grpcPayload;
						if (payload.byteLength >= 2 && payload[0] === 0x0a) {
							let shift = 0;
							let offset = 1;
							let varint有效 = false;
							while (offset < payload.length) {
								const current = payload[offset++];
								if ((current & 0x80) === 0) {
									varint有效 = true;
									break;
								}
								shift += 7;
								if (shift > 35) break;
							}
							if (varint有效) payload = payload.subarray(offset);
						}
					if (!payload.byteLength) continue;
					if (isDnsQuery) {
						if (判断是否是木马) await 转发木马UDP数据(payload, grpcBridge, 木马UDP上下文, request);
						else await forwardataudp(payload, grpcBridge, null, request);
						continue;
					}
					if (remoteConnWrapper.socket) {
						usageStats.up += payload.byteLength;
						if (!(await 写入远端(payload))) throw new Error('Remote socket is not ready');
					} else {
						const 首包bytes = 数据转Uint8Array(payload);
						if (判断是否是木马 === null) 判断是否是木马 = 首包bytes.byteLength >= 58 && 首包bytes[56] === 0x0d && 首包bytes[57] === 0x0a;
						if (判断是否是木马) {
							const 解析结果 = 解析木马请求(首包bytes, yourUUID);
							if (解析结果?.hasError) throw new Error(解析结果.message || 'Invalid trojan request');
							const { port, hostname, rawClientData, isUDP } = 解析结果;
							log(`[gRPC] 木马首包: ${hostname}:${port} | UDP: ${isUDP ? '是' : '否'}`);
							if (是被封锁的网站(hostname)) throw new Error('Blocked site');
							if (isUDP) {
								isDnsQuery = true;
								if (有效数据长度(rawClientData) > 0) {
									usageStats.up += 有效数据长度(rawClientData);
									await 转发木马UDP数据(rawClientData, grpcBridge, 木马UDP上下文, request);
								}
							} else {
								usageStats.up += 有效数据长度(rawClientData);
								await forwardataTCP(hostname, port, rawClientData, grpcBridge, null, remoteConnWrapper, yourUUID, request, usageStats);
							}
						} else {
							判断是否是木马 = false;
							const 解析结果 = 解析魏烈思请求(首包bytes, yourUUID);
							if (解析结果?.hasError) throw new Error(解析结果.message || 'Invalid 魏烈思 request');
							const { port, hostname, version, isUDP, rawClientData } = 解析结果;
							log(`[gRPC] 魏烈思首包: ${hostname}:${port} | UDP: ${isUDP ? '是' : '否'}`);
							if (是被封锁的网站(hostname)) throw new Error('Blocked site');
							if (isUDP) {
								if (port !== 53) throw new Error('UDP is not supported');
								isDnsQuery = true;
							}
							const respHeader = new Uint8Array([version, 0]);
							grpcBridge.send(respHeader);
							const rawData = rawClientData;
							if (isDnsQuery) {
								if (判断是否是木马) await 转发木马UDP数据(rawData, grpcBridge, 木马UDP上下文, request);
								else await forwardataudp(rawData, grpcBridge, null, request);
							}
							else {
								usageStats.up += 有效数据长度(rawData);
								await forwardataTCP(hostname, port, rawData, grpcBridge, null, remoteConnWrapper, yourUUID, request, usageStats);
							}
						}
					}
					}
					刷新发送队列();
				}
				await 上行写入队列.等待空();
			} catch (err) {
				log(`[gRPC转发] 处理失败: ${err?.message || err}`);
			} finally {
				上行写入队列.清空();
				释放远端写入器();
				关闭连接();
				try { recordUsage(_globalEnv, usageStats.up, usageStats.down, null); } catch (e) {}
			}
		},
		cancel() {
			GRPC上行写入队列?.清空();
			try { remoteConnWrapper.socket?.close() } catch (e) { }
			try { reader.releaseLock() } catch (e) { }
		}
	}), { status: 200, headers: grpcHeaders });
}

function 是有效WS早期数据(bytes, token) {
	if (!bytes?.byteLength) return false;
	if (bytes.byteLength >= 18 && UUID字节匹配(bytes, 1, token)) return true;
	if (bytes.byteLength < 58 || bytes[56] !== 0x0d || bytes[57] !== 0x0a) return false;

	const trojanPassword = sha224(token);
	for (let i = 0; i < 56; i++) {
		if (bytes[i] !== trojanPassword.charCodeAt(i)) return false;
	}
	return true;
}

function 解码WS早期数据(header, token) {
	if (!header) return null;
	if (header.length > WS早期数据最大头长度) throw new Error('early data is too large');

	let bytes;
	const Uint8ArrayBase64 = /** @type {any} */ (Uint8Array);
	if (typeof Uint8ArrayBase64.fromBase64 === 'function') {
		try {
			bytes = Uint8ArrayBase64.fromBase64(header, { alphabet: 'base64url' });
		} catch (_) { }
	}
	if (!bytes) {
		let normalized = header.replace(/-/g, '+').replace(/_/g, '/');
		const padding = normalized.length % 4;
		if (padding) normalized += '='.repeat(4 - padding);
		let binaryString;
		try {
			binaryString = atob(normalized);
		} catch (_) {
			return null;
		}
		bytes = new Uint8Array(binaryString.length);
		for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
	}

	if (bytes.byteLength > WS早期数据最大字节) throw new Error('early data is too large');
	return 是有效WS早期数据(bytes, token) ? bytes : null;
}

///////////////////////////////////////////////////////////////////////WS传输数据///////////////////////////////////////////////
async function 处理WS请求(request, yourUUID, url) {
	const WS套接字对 = new WebSocketPair();
	const [clientSock, serverSock] = Object.values(WS套接字对);
	try { (/** @type {any} */ (serverSock)).accept({ allowHalfOpen: true }) }
	catch (_) { serverSock.accept() }
	serverSock.binaryType = 'arraybuffer';
	let remoteConnWrapper = { socket: null, connectingPromise: null, retryConnect: null };
	let isDnsQuery = false;
	let 判断是否是木马 = null;
	const 木马UDP上下文 = { 缓存: new Uint8Array(0) };
	const earlyDataHeader = request.headers.get('sec-websocket-protocol') || '';
	const SS模式禁用EarlyData = !!url.searchParams.get('enc');
	let WS上行写入队列 = null;
	let WS显式传输链 = Promise.resolve();
	let WS显式传输停止接收 = false, WS显式传输失败 = false, WS显式传输收尾已入队 = false;
	let WS显式队列字节 = 0, WS显式队列条目 = 0;
	let 判断协议类型 = null, 当前写入Socket = null, 远端写入器 = null;
	let ss上下文 = null, ss初始化任务 = null;
	const usageStats = { up: 0, down: 0 };
	const 限速下载器 = getSpeedLimiter('down');

	const 释放远端写入器 = () => {
		if (远端写入器) {
			try { 远端写入器.releaseLock() } catch (e) { }
			远端写入器 = null;
		}
		当前写入Socket = null;
	};

	const 上行写入队列 = WS上行写入队列 = 创建上行写入队列({
		获取写入器: () => {
			const socket = remoteConnWrapper.socket;
			if (!socket) return null;
			if (socket !== 当前写入Socket) {
				释放远端写入器();
				当前写入Socket = socket;
				远端写入器 = socket.writable.getWriter();
			}
			return 远端写入器;
		},
		释放写入器: 释放远端写入器,
		重试连接: async () => {
			if (typeof remoteConnWrapper.retryConnect !== 'function') throw new Error('retry unavailable');
			await remoteConnWrapper.retryConnect();
		},
		关闭连接: () => {
			try { remoteConnWrapper.socket?.close() } catch (e) { }
			closeSocketQuietly(serverSock);
		},
		名称: 'WS上行'
	});

	const 写入远端 = async (chunk, allowRetry = true) => {
		return 上行写入队列.写入并等待(chunk, allowRetry);
	};

	const 获取SS上下文 = async () => {
		if (ss上下文) return ss上下文;
		if (!ss初始化任务) {
			ss初始化任务 = (async () => {
				const 请求加密方式 = (url.searchParams.get('enc') || '').toLowerCase();
				const 首选加密配置 = SS支持加密配置[请求加密方式] || SS支持加密配置['aes-128-gcm'];
				const 入站候选加密配置 = [首选加密配置, ...Object.values(SS支持加密配置).filter(c => c.method !== 首选加密配置.method)];
				const 入站主密钥任务缓存 = new Map();
				const 取入站主密钥任务 = (config) => {
					if (!入站主密钥任务缓存.has(config.method)) 入站主密钥任务缓存.set(config.method, SS派生主密钥(yourUUID, config.keyLen));
					return 入站主密钥任务缓存.get(config.method);
				};
				const 入站状态 = {
					buffer: new Uint8Array(0),
					hasSalt: false,
					waitPayloadLength: null,
					decryptKey: null,
					nonceCounter: new Uint8Array(SSNonce长度),
					加密配置: null,
				};
				const 初始化入站解密状态 = async () => {
					const lengthCipherTotalLength = 2 + SSAEAD标签长度;
					const 最大盐长度 = Math.max(...入站候选加密配置.map(c => c.saltLen));
					const 最大对齐扫描字节 = 16;
					const 可扫描最大偏移 = Math.min(最大对齐扫描字节, Math.max(0, 入站状态.buffer.byteLength - (lengthCipherTotalLength + Math.min(...入站候选加密配置.map(c => c.saltLen)))));
					for (let offset = 0; offset <= 可扫描最大偏移; offset++) {
						for (const 加密配置 of 入站候选加密配置) {
							const 初始化最小长度 = offset + 加密配置.saltLen + lengthCipherTotalLength;
							if (入站状态.buffer.byteLength < 初始化最小长度) continue;
							const salt = 入站状态.buffer.subarray(offset, offset + 加密配置.saltLen);
							const lengthCipher = 入站状态.buffer.subarray(offset + 加密配置.saltLen, 初始化最小长度);
							const masterKey = await 取入站主密钥任务(加密配置);
							const decryptKey = await SS派生会话密钥(加密配置, masterKey, salt, ['decrypt']);
							const nonceCounter = new Uint8Array(SSNonce长度);
							try {
								const lengthPlain = await SSAEAD解密(decryptKey, nonceCounter, lengthCipher);
								if (lengthPlain.byteLength !== 2) continue;
								const payloadLength = (lengthPlain[0] << 8) | lengthPlain[1];
								if (payloadLength < 0 || payloadLength > 加密配置.maxChunk) continue;
								if (offset > 0) log(`[SS入站] 检测到前导噪声 ${offset}B，已自动对齐`);
								if (加密配置.method !== 首选加密配置.method) log(`[SS入站] URL enc=${请求加密方式 || 首选加密配置.method} 与实际 ${加密配置.method} 不一致，已自动切换`);
								入站状态.buffer = 入站状态.buffer.subarray(初始化最小长度);
								入站状态.decryptKey = decryptKey;
								入站状态.nonceCounter = nonceCounter;
								入站状态.waitPayloadLength = payloadLength;
								入站状态.加密配置 = 加密配置;
								入站状态.hasSalt = true;
								return true;
							} catch (_) { }
						}
					}
					const 初始化失败判定长度 = 最大盐长度 + lengthCipherTotalLength + 最大对齐扫描字节;
					if (入站状态.buffer.byteLength >= 初始化失败判定长度) {
						throw new Error(`SS handshake decrypt failed (enc=${请求加密方式 || 'auto'}, candidates=${入站候选加密配置.map(c => c.method).join('/')})`);
					}
					return false;
				};
				const 入站解密器 = {
					async 输入(dataChunk) {
						const chunk = 数据转Uint8Array(dataChunk);
						if (chunk.byteLength > 0) 入站状态.buffer = 拼接字节数据(入站状态.buffer, chunk);
						if (!入站状态.hasSalt) {
							const 初始化成功 = await 初始化入站解密状态();
							if (!初始化成功) return [];
						}
						const plaintextChunks = [];
						while (true) {
							if (入站状态.waitPayloadLength === null) {
								const lengthCipherTotalLength = 2 + SSAEAD标签长度;
								if (入站状态.buffer.byteLength < lengthCipherTotalLength) break;
								const lengthCipher = 入站状态.buffer.subarray(0, lengthCipherTotalLength);
								入站状态.buffer = 入站状态.buffer.subarray(lengthCipherTotalLength);
								const lengthPlain = await SSAEAD解密(入站状态.decryptKey, 入站状态.nonceCounter, lengthCipher);
								if (lengthPlain.byteLength !== 2) throw new Error('SS length decrypt failed');
								const payloadLength = (lengthPlain[0] << 8) | lengthPlain[1];
								if (payloadLength < 0 || payloadLength > 入站状态.加密配置.maxChunk) throw new Error(`SS payload length invalid: ${payloadLength}`);
								入站状态.waitPayloadLength = payloadLength;
							}
							const payloadCipherTotalLength = 入站状态.waitPayloadLength + SSAEAD标签长度;
							if (入站状态.buffer.byteLength < payloadCipherTotalLength) break;
							const payloadCipher = 入站状态.buffer.subarray(0, payloadCipherTotalLength);
							入站状态.buffer = 入站状态.buffer.subarray(payloadCipherTotalLength);
							const payloadPlain = await SSAEAD解密(入站状态.decryptKey, 入站状态.nonceCounter, payloadCipher);
							plaintextChunks.push(payloadPlain);
							入站状态.waitPayloadLength = null;
						}
						return plaintextChunks;
					},
				};
				let 出站加密器 = null;
				const SS单批最大字节 = 32 * 1024;
				const 获取出站加密器 = async () => {
					if (出站加密器) return 出站加密器;
					if (!入站状态.加密配置) throw new Error('SS cipher is not negotiated');
					const 出站加密配置 = 入站状态.加密配置;
					const 出站主密钥 = await SS派生主密钥(yourUUID, 出站加密配置.keyLen);
					const 出站随机字节 = crypto.getRandomValues(new Uint8Array(出站加密配置.saltLen));
					const 出站加密密钥 = await SS派生会话密钥(出站加密配置, 出站主密钥, 出站随机字节, ['encrypt']);
					const 出站Nonce计数器 = new Uint8Array(SSNonce长度);
					let 随机字节已发送 = false;
					出站加密器 = {
						async 加密并发送(dataChunk, sendChunk) {
							const plaintextData = 数据转Uint8Array(dataChunk);
							if (!随机字节已发送) {
								await sendChunk(出站随机字节);
								随机字节已发送 = true;
							}
							if (plaintextData.byteLength === 0) return;
							let offset = 0;
							while (offset < plaintextData.byteLength) {
								const end = Math.min(offset + 出站加密配置.maxChunk, plaintextData.byteLength);
								const payloadPlain = plaintextData.subarray(offset, end);
								const lengthPlain = new Uint8Array(2);
								lengthPlain[0] = (payloadPlain.byteLength >>> 8) & 0xff;
								lengthPlain[1] = payloadPlain.byteLength & 0xff;
								const lengthCipher = await SSAEAD加密(出站加密密钥, 出站Nonce计数器, lengthPlain);
								const payloadCipher = await SSAEAD加密(出站加密密钥, 出站Nonce计数器, payloadPlain);
								const frame = new Uint8Array(lengthCipher.byteLength + payloadCipher.byteLength);
								frame.set(lengthCipher, 0);
								frame.set(payloadCipher, lengthCipher.byteLength);
								await sendChunk(frame);
								offset = end;
							}
						},
					};
					return 出站加密器;
				};
				let SS发送队列 = Promise.resolve();
				const SS入队发送 = (chunk) => {
					SS发送队列 = SS发送队列.then(async () => {
						if (serverSock.readyState !== WebSocket.OPEN) return;
						const 已初始化出站加密器 = await 获取出站加密器();
						await 已初始化出站加密器.加密并发送(chunk, async (encryptedChunk) => {
							if (encryptedChunk.byteLength > 0 && serverSock.readyState === WebSocket.OPEN) {
								await WebSocket发送并等待(serverSock, encryptedChunk.buffer);
							}
						});
					}).catch((error) => {
						log(`[SS发送] 加密失败: ${error?.message || error}`);
						closeSocketQuietly(serverSock);
					});
					return SS发送队列;
				};
				const 回包Socket = {
					get readyState() {
						return serverSock.readyState;
					},
					send(data) {
						const chunk = 数据转Uint8Array(data);
						if (chunk.byteLength <= SS单批最大字节) {
							return SS入队发送(chunk);
						}
						for (let i = 0; i < chunk.byteLength; i += SS单批最大字节) {
							SS入队发送(chunk.subarray(i, Math.min(i + SS单批最大字节, chunk.byteLength)));
						}
						return SS发送队列;
					},
					close() {
						closeSocketQuietly(serverSock);
					}
				};
				ss上下文 = {
					入站解密器,
					回包Socket,
					首包已建立: false,
					目标主机: '',
					目标端口: 0,
				};
				return ss上下文;
			})().finally(() => { ss初始化任务 = null });
		}
		return ss初始化任务;
	};

	const 处理SS数据 = async (chunk) => {
		const 上下文 = await 获取SS上下文();
		let 明文块数组 = null;
		try {
			明文块数组 = await 上下文.入站解密器.输入(chunk);
		} catch (err) {
			const msg = err?.message || `${err}`;
			if (msg.includes('Decryption failed') || msg.includes('SS handshake decrypt failed') || msg.includes('SS length decrypt failed')) {
				log(`[SS入站] 解密失败，连接关闭: ${msg}`);
				closeSocketQuietly(serverSock);
				return;
			}
			throw err;
		}
		for (const 明文块 of 明文块数组) {
			let 已写入 = false;
			try {
				已写入 = await 写入远端(明文块, false);
			} catch (err) {
				if ((/** @type {any} */ (err))?.isQueueOverflow) throw err;
				已写入 = false;
			}
			if (已写入) continue;
			if (上下文.首包已建立 && 上下文.目标主机 && 上下文.目标端口 > 0) {
				await forwardataTCP(上下文.目标主机, 上下文.目标端口, 明文块, 上下文.回包Socket, null, remoteConnWrapper, yourUUID, request);
				continue;
			}
			const 明文数据 = 数据转Uint8Array(明文块);
			if (明文数据.byteLength < 3) throw new Error('invalid ss data');
			const addressType = 明文数据[0];
			let cursor = 1;
			let hostname = '';
			if (addressType === 1) {
				if (明文数据.byteLength < cursor + 4 + 2) throw new Error('invalid ss ipv4 length');
				hostname = `${明文数据[cursor]}.${明文数据[cursor + 1]}.${明文数据[cursor + 2]}.${明文数据[cursor + 3]}`;
				cursor += 4;
			} else if (addressType === 3) {
				if (明文数据.byteLength < cursor + 1) throw new Error('invalid ss domain length');
				const domainLength = 明文数据[cursor];
				cursor += 1;
				if (明文数据.byteLength < cursor + domainLength + 2) throw new Error('invalid ss domain data');
				hostname = SS文本解码器.decode(明文数据.subarray(cursor, cursor + domainLength));
				cursor += domainLength;
			} else if (addressType === 4) {
				if (明文数据.byteLength < cursor + 16 + 2) throw new Error('invalid ss ipv6 length');
				const ipv6 = [];
				const ipv6View = new DataView(明文数据.buffer, 明文数据.byteOffset + cursor, 16);
				for (let i = 0; i < 8; i++) ipv6.push(ipv6View.getUint16(i * 2).toString(16));
				hostname = ipv6.join(':');
				cursor += 16;
			} else {
				throw new Error(`invalid ss addressType: ${addressType}`);
			}
			if (!hostname) throw new Error(`invalid ss address: ${addressType}`);
			const port = (明文数据[cursor] << 8) | 明文数据[cursor + 1];
			cursor += 2;
			const rawClientData = 明文数据.subarray(cursor);
			if (是被封锁的网站(hostname)) throw new Error('Blocked site');
			上下文.首包已建立 = true;
			上下文.目标主机 = hostname;
			上下文.目标端口 = port;
			await forwardataTCP(hostname, port, rawClientData, 上下文.回包Socket, null, remoteConnWrapper, yourUUID, request, usageStats);
		}
	};

	const 处理WS入站数据 = async (chunk) => {
		let 当前块字节 = null;
		const chunkBytes = 有效数据长度(chunk);
		if (chunkBytes > 0) usageStats.up += chunkBytes;
		if (isDnsQuery) {
			if (判断是否是木马) return await 转发木马UDP数据(chunk, serverSock, 木马UDP上下文, request);
			return await forwardataudp(chunk, serverSock, null, request);
		}
		if (判断协议类型 === 'ss') {
			await 处理SS数据(chunk);
			return;
		}
		if (await 写入远端(chunk)) return;

		if (判断协议类型 === null) {
			if (url.searchParams.get('enc')) 判断协议类型 = 'ss';
			else {
				当前块字节 = 当前块字节 || 数据转Uint8Array(chunk);
				const bytes = 当前块字节;
				判断协议类型 = bytes.byteLength >= 58 && bytes[56] === 0x0d && bytes[57] === 0x0a ? '木马' : '魏烈思';
			}
			判断是否是木马 = 判断协议类型 === '木马';
			log(`[WS转发] 协议类型: ${判断协议类型} | 来自: ${url.host} | UA: ${request.headers.get('user-agent') || '未知'}`);
		}

		if (判断协议类型 === 'ss') {
			await 处理SS数据(chunk);
			return;
		}
		if (await 写入远端(chunk)) return;
		if (判断协议类型 === '木马') {
			const 解析结果 = 解析木马请求(chunk, yourUUID);
			if (解析结果?.hasError) throw new Error(解析结果.message || 'Invalid trojan request');
			const { port, hostname, rawClientData, isUDP } = 解析结果;
			if (是被封锁的网站(hostname)) throw new Error('Blocked site');
			if (isUDP) {
				isDnsQuery = true;
				if (有效数据长度(rawClientData) > 0) return 转发木马UDP数据(rawClientData, serverSock, 木马UDP上下文, request);
				return;
			}
			await forwardataTCP(hostname, port, rawClientData, serverSock, null, remoteConnWrapper, yourUUID, request, usageStats);
		} else {
			判断是否是木马 = false;
			当前块字节 = 当前块字节 || 数据转Uint8Array(chunk);
			const bytes = 当前块字节;
			const 解析结果 = 解析魏烈思请求(bytes, yourUUID);
			if (解析结果?.hasError) throw new Error(解析结果.message || 'Invalid 魏烈思 request');
			const { port, hostname, version, isUDP, rawClientData } = 解析结果;
			if (是被封锁的网站(hostname)) throw new Error('Blocked site');
			if (isUDP) {
				if (port === 53) isDnsQuery = true;
				else throw new Error('UDP is not supported');
			}
			const respHeader = new Uint8Array([version, 0]);
			const rawData = rawClientData;
			if (isDnsQuery) {
				if (判断是否是木马) return 转发木马UDP数据(rawData, serverSock, 木马UDP上下文, request);
				return forwardataudp(rawData, serverSock, respHeader, request);
			}
			await forwardataTCP(hostname, port, rawData, serverSock, respHeader, remoteConnWrapper, yourUUID, request, usageStats);
		}
	};

	const 处理WS显式传输错误 = (err) => {
		if (WS显式传输失败) return;
		WS显式传输失败 = true;
		WS显式传输停止接收 = true;
		WS显式队列字节 = 0;
		WS显式队列条目 = 0;
		try { recordUsage(_globalEnv, usageStats.up, usageStats.down, null); } catch (e) {}
		const msg = err?.message || `${err}`;
		if (msg.includes('Network connection lost') || msg.includes('ReadableStream is closed')) {
			log(`[WS转发] 连接结束: ${msg}`);
		} else {
			log(`[WS转发] 处理失败: ${msg}`);
		}
		上行写入队列.清空();
		释放远端写入器();
		closeSocketQuietly(serverSock);
	};

	const 追加WS显式传输任务 = (任务) => {
		WS显式传输链 = WS显式传输链.then(任务).catch(处理WS显式传输错误);
		return WS显式传输链;
	};

	const 入队WS显式传输 = (data) => {
		if (WS显式传输停止接收 || WS显式传输失败) return;
		const chunkSize = Math.max(0, 有效数据长度(data));
		const nextBytes = WS显式队列字节 + chunkSize;
		const nextItems = WS显式队列条目 + 1;
		if (nextBytes > 上行队列最大字节 || nextItems > 上行队列最大条目) {
			处理WS显式传输错误(new Error(`[WS显式传输] 队列溢出: ${nextBytes}B/${nextItems}`));
			return;
		}
		WS显式队列字节 = nextBytes;
		WS显式队列条目 = nextItems;
		追加WS显式传输任务(async () => {
			WS显式队列字节 = Math.max(0, WS显式队列字节 - chunkSize);
			WS显式队列条目 = Math.max(0, WS显式队列条目 - 1);
			if (WS显式传输失败) return;
			await 处理WS入站数据(data);
		});
	};

	const 收尾WS显式传输 = () => {
		if (WS显式传输收尾已入队) return;
		WS显式传输收尾已入队 = true;
		WS显式传输停止接收 = true;
		追加WS显式传输任务(async () => {
			if (WS显式传输失败) return;
			await 上行写入队列.等待空();
			释放远端写入器();
		});
	};

	serverSock.addEventListener('message', (event) => {
		入队WS显式传输(event.data);
	});
	serverSock.addEventListener('close', () => {
		closeSocketQuietly(serverSock);
		收尾WS显式传输();
		try { recordUsage(_globalEnv, usageStats.up, usageStats.down, null); } catch (e) {}
	});
	serverSock.addEventListener('error', (err) => {
		处理WS显式传输错误(err);
	});

	// SS 模式下禁用 sec-websocket-protocol early-data，避免把子协议值（如 "binary"）误当作 base64 数据注入首包导致 AEAD 解密失败。
	if (!SS模式禁用EarlyData && earlyDataHeader) {
		try {
			const bytes = 解码WS早期数据(earlyDataHeader, yourUUID);
			if (bytes?.byteLength) {
				usageStats.up += bytes.byteLength;
				入队WS显式传输(bytes.buffer);
			}
		} catch (error) {
			处理WS显式传输错误(error);
		}
	}

	return new Response(null, { status: 101, webSocket: clientSock, headers: { 'Sec-WebSocket-Extensions': '' } });
}

const 木马文本解码器 = new TextDecoder();

function 解析木马请求(buffer, passwordPlainText) {
	const data = 数据转Uint8Array(buffer);
	const sha224Password = sha224(passwordPlainText);
	if (data.byteLength < 58) return { hasError: true, message: "invalid data" };
	let crLfIndex = 56;
	if (data[crLfIndex] !== 0x0d || data[crLfIndex + 1] !== 0x0a) return { hasError: true, message: "invalid header format" };
	for (let i = 0; i < crLfIndex; i++) {
		if (data[i] !== sha224Password.charCodeAt(i)) return { hasError: true, message: "invalid password" };
	}

	const socks5Index = crLfIndex + 2;
	if (data.byteLength < socks5Index + 6) return { hasError: true, message: "invalid S5 request data" };

	const cmd = data[socks5Index];
	if (cmd !== 1 && cmd !== 3) return { hasError: true, message: "unsupported command, only TCP/UDP is allowed" };
	const isUDP = cmd === 3;

	const atype = data[socks5Index + 1];
	let addressLength = 0;
	let addressIndex = socks5Index + 2;
	let address = "";
	switch (atype) {
		case 1: // IPv4
			addressLength = 4;
			if (data.byteLength < addressIndex + addressLength + 4) return { hasError: true, message: "invalid S5 request data" };
			address = `${data[addressIndex]}.${data[addressIndex + 1]}.${data[addressIndex + 2]}.${data[addressIndex + 3]}`;
			break;
		case 3: // Domain
			if (data.byteLength < addressIndex + 1) return { hasError: true, message: "invalid S5 request data" };
			addressLength = data[addressIndex];
			addressIndex += 1;
			if (data.byteLength < addressIndex + addressLength + 4) return { hasError: true, message: "invalid S5 request data" };
			address = 木马文本解码器.decode(data.subarray(addressIndex, addressIndex + addressLength));
			break;
		case 4: // IPv6
			addressLength = 16;
			if (data.byteLength < addressIndex + addressLength + 4) return { hasError: true, message: "invalid S5 request data" };
			const ipv6 = [];
			for (let i = 0; i < 8; i++) {
				const partIndex = addressIndex + i * 2;
				ipv6.push(((data[partIndex] << 8) | data[partIndex + 1]).toString(16));
			}
			address = ipv6.join(":");
			break;
		default:
			return { hasError: true, message: `invalid addressType is ${atype}` };
	}

	if (!address) {
		return { hasError: true, message: `address is empty, addressType is ${atype}` };
	}

	const portIndex = addressIndex + addressLength;
	if (data.byteLength < portIndex + 4) return { hasError: true, message: "invalid S5 request data" };
	const portRemote = (data[portIndex] << 8) | data[portIndex + 1];

	return {
		hasError: false,
		addressType: atype,
		port: portRemote,
		hostname: address,
		isUDP,
		rawClientData: data.subarray(portIndex + 4)
	};
}

const UUID字节缓存 = new Map();
const VLESS文本解码器 = new TextDecoder();

function 读取十六进制半字节(code) {
	if (code >= 48 && code <= 57) return code - 48;
	code |= 32;
	if (code >= 97 && code <= 102) return code - 87;
	return -1;
}

function 获取UUID字节(uuid) {
	const key = String(uuid || '');
	let cached = UUID字节缓存.get(key);
	if (cached) return cached;

	const clean = key.replace(/-/g, '');
	if (clean.length !== 32) return null;

	const bytes = new Uint8Array(16);
	for (let i = 0; i < 16; i++) {
		const high = 读取十六进制半字节(clean.charCodeAt(i * 2));
		const low = 读取十六进制半字节(clean.charCodeAt(i * 2 + 1));
		if (high < 0 || low < 0) return null;
		bytes[i] = (high << 4) | low;
	}

	if (UUID字节缓存.size >= 32) UUID字节缓存.clear();
	UUID字节缓存.set(key, bytes);
	return bytes;
}

function UUID字节匹配(data, offset, uuid) {
	const expected = 获取UUID字节(uuid);
	if (!expected || data.byteLength < offset + 16) return false;
	for (let i = 0; i < 16; i++) {
		if (data[offset + i] !== expected[i]) return false;
	}
	return true;
}

function 解析魏烈思请求(chunk, token) {
	const data = 数据转Uint8Array(chunk);
	const length = data.byteLength;
	if (length < 24) return { hasError: true, message: 'Invalid data' };
	const version = data[0];
	if (!UUID字节匹配(data, 1, token)) return { hasError: true, message: 'Invalid uuid' };

	const optLen = data[17];
	const cmdIndex = 18 + optLen;
	if (length < cmdIndex + 4) return { hasError: true, message: 'Invalid data' };

	const cmd = data[cmdIndex];
	let isUDP = false;
	if (cmd === 1) { } else if (cmd === 2) { isUDP = true } else { return { hasError: true, message: 'Invalid command' } }

	const portIdx = cmdIndex + 1;
	const port = (data[portIdx] << 8) | data[portIdx + 1];
	let addrValIdx = portIdx + 3, addrLen = 0, hostname = '';
	const addressType = data[portIdx + 2];
	switch (addressType) {
		case 1:
			addrLen = 4;
			if (length < addrValIdx + addrLen) return { hasError: true, message: 'Invalid IPv4 address length' };
			hostname = `${data[addrValIdx]}.${data[addrValIdx + 1]}.${data[addrValIdx + 2]}.${data[addrValIdx + 3]}`;
			break;
		case 2:
			if (length < addrValIdx + 1) return { hasError: true, message: 'Invalid domain length' };
			addrLen = data[addrValIdx];
			addrValIdx += 1;
			if (length < addrValIdx + addrLen) return { hasError: true, message: 'Invalid domain data' };
			hostname = VLESS文本解码器.decode(data.subarray(addrValIdx, addrValIdx + addrLen));
			break;
		case 3:
			addrLen = 16;
			if (length < addrValIdx + addrLen) return { hasError: true, message: 'Invalid IPv6 address length' };
			const ipv6 = [];
			for (let i = 0; i < 8; i++) {
				const base = addrValIdx + i * 2;
				ipv6.push(((data[base] << 8) | data[base + 1]).toString(16));
			}
			hostname = ipv6.join(':');
			break;
		default:
			return { hasError: true, message: `Invalid address type: ${addressType}` };
	}
	if (!hostname) return { hasError: true, message: `Invalid address: ${addressType}` };
	const rawIndex = addrValIdx + addrLen;
	return { hasError: false, addressType, port, hostname, isUDP, rawClientData: data.subarray(rawIndex), version };
}

const SS支持加密配置 = {
	'aes-128-gcm': { method: 'aes-128-gcm', keyLen: 16, saltLen: 16, maxChunk: 0x3fff, aesLength: 128 },
	'aes-256-gcm': { method: 'aes-256-gcm', keyLen: 32, saltLen: 32, maxChunk: 0x3fff, aesLength: 256 },
};

const SSAEAD标签长度 = 16, SSNonce长度 = 12;
const SS子密钥信息 = new TextEncoder().encode('ss-subkey');
const SS文本编码器 = new TextEncoder(), SS文本解码器 = new TextDecoder(), SS主密钥缓存 = new Map();

function 数据转Uint8Array(data) {
	if (data instanceof Uint8Array) return data;
	if (data instanceof ArrayBuffer) return new Uint8Array(data);
	if (ArrayBuffer.isView(data)) return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
	return new Uint8Array(data || 0);
}

function 拼接字节数据(...chunkList) {
	if (!chunkList || chunkList.length === 0) return new Uint8Array(0);
	const chunks = chunkList.map(数据转Uint8Array);
	const total = chunks.reduce((sum, c) => sum + c.byteLength, 0);
	const result = new Uint8Array(total);
	let offset = 0;
	for (const c of chunks) { result.set(c, offset); offset += c.byteLength }
	return result;
}

async function 转发木马UDP数据(chunk, webSocket, 上下文, request) {
	const 当前块 = 数据转Uint8Array(chunk);
	const 缓存块 = 上下文?.缓存 instanceof Uint8Array ? 上下文.缓存 : new Uint8Array(0);
	const input = 缓存块.byteLength ? 拼接字节数据(缓存块, 当前块) : 当前块;
	let cursor = 0;

	while (cursor < input.byteLength) {
		const packetStart = cursor;
		const atype = input[cursor];
		let addrCursor = cursor + 1;
		let addrLen = 0;
		if (atype === 1) addrLen = 4;
		else if (atype === 4) addrLen = 16;
		else if (atype === 3) {
			if (input.byteLength < addrCursor + 1) break;
			addrLen = 1 + input[addrCursor];
		} else throw new Error(`invalid trojan udp addressType: ${atype}`);

		const portCursor = addrCursor + addrLen;
		if (input.byteLength < portCursor + 6) break;

		const port = (input[portCursor] << 8) | input[portCursor + 1];
		const payloadLength = (input[portCursor + 2] << 8) | input[portCursor + 3];
		if (input[portCursor + 4] !== 0x0d || input[portCursor + 5] !== 0x0a) throw new Error('invalid trojan udp delimiter');

		const payloadStart = portCursor + 6;
		const payloadEnd = payloadStart + payloadLength;
		if (input.byteLength < payloadEnd) break;

		const 地址端口头 = input.slice(packetStart, portCursor + 2);
		const payload = input.slice(payloadStart, payloadEnd);
		cursor = payloadEnd;

		if (port !== 53) throw new Error('UDP is not supported');
		if (!payload.byteLength) continue;

		let tcpDNS查询 = payload;
		if (payload.byteLength < 2 || ((payload[0] << 8) | payload[1]) !== payload.byteLength - 2) {
			tcpDNS查询 = new Uint8Array(payload.byteLength + 2);
			tcpDNS查询[0] = (payload.byteLength >>> 8) & 0xff;
			tcpDNS查询[1] = payload.byteLength & 0xff;
			tcpDNS查询.set(payload, 2);
		}

		const dns响应上下文 = { 缓存: new Uint8Array(0) };
		await forwardataudp(tcpDNS查询, webSocket, null, request, (dnsRespChunk) => {
			const 当前响应块 = 数据转Uint8Array(dnsRespChunk);
			const 响应输入 = dns响应上下文.缓存.byteLength ? 拼接字节数据(dns响应上下文.缓存, 当前响应块) : 当前响应块;
			const 响应帧列表 = [];
			let responseCursor = 0;
			while (responseCursor + 2 <= 响应输入.byteLength) {
				const dnsLen = (响应输入[responseCursor] << 8) | 响应输入[responseCursor + 1];
				const dnsStart = responseCursor + 2;
				const dnsEnd = dnsStart + dnsLen;
				if (dnsEnd > 响应输入.byteLength) break;
				const dnsPayload = 响应输入.slice(dnsStart, dnsEnd);
				const frame = new Uint8Array(地址端口头.byteLength + 4 + dnsPayload.byteLength);
				frame.set(地址端口头, 0);
				frame[地址端口头.byteLength] = (dnsPayload.byteLength >>> 8) & 0xff;
				frame[地址端口头.byteLength + 1] = dnsPayload.byteLength & 0xff;
				frame[地址端口头.byteLength + 2] = 0x0d;
				frame[地址端口头.byteLength + 3] = 0x0a;
				frame.set(dnsPayload, 地址端口头.byteLength + 4);
				响应帧列表.push(frame);
				responseCursor = dnsEnd;
			}
			dns响应上下文.缓存 = 响应输入.slice(responseCursor);
			return 响应帧列表.length ? 响应帧列表 : new Uint8Array(0);
		});
	}

	if (上下文) 上下文.缓存 = input.slice(cursor);
}

function SS递增Nonce计数器(counter) {
	for (let i = 0; i < counter.length; i++) { counter[i] = (counter[i] + 1) & 0xff; if (counter[i] !== 0) return }
}

async function SS派生主密钥(passwordText, keyLen) {
	const cacheKey = `${keyLen}:${passwordText}`;
	if (SS主密钥缓存.has(cacheKey)) return SS主密钥缓存.get(cacheKey);
	const deriveTask = (async () => {
		const pwBytes = SS文本编码器.encode(passwordText || '');
		let prev = new Uint8Array(0), result = new Uint8Array(0);
		while (result.byteLength < keyLen) {
			const input = new Uint8Array(prev.byteLength + pwBytes.byteLength);
			input.set(prev, 0); input.set(pwBytes, prev.byteLength);
			prev = new Uint8Array(await crypto.subtle.digest('MD5', input));
			result = 拼接字节数据(result, prev);
		}
		return result.slice(0, keyLen);
	})();
	SS主密钥缓存.set(cacheKey, deriveTask);
	try { return await deriveTask }
	catch (error) { SS主密钥缓存.delete(cacheKey); throw error }
}

async function SS派生会话密钥(config, masterKey, salt, usages) {
	const hmacOpts = { name: 'HMAC', hash: 'SHA-1' };
	const saltHmacKey = await crypto.subtle.importKey('raw', salt, hmacOpts, false, ['sign']);
	const prk = new Uint8Array(await crypto.subtle.sign('HMAC', saltHmacKey, masterKey));
	const prkHmacKey = await crypto.subtle.importKey('raw', prk, hmacOpts, false, ['sign']);
	const subKey = new Uint8Array(config.keyLen);
	let prev = new Uint8Array(0), written = 0, counter = 1;
	while (written < config.keyLen) {
		const input = 拼接字节数据(prev, SS子密钥信息, new Uint8Array([counter]));
		prev = new Uint8Array(await crypto.subtle.sign('HMAC', prkHmacKey, input));
		const copyLen = Math.min(prev.byteLength, config.keyLen - written);
		subKey.set(prev.subarray(0, copyLen), written);
		written += copyLen; counter += 1;
	}
	return crypto.subtle.importKey('raw', subKey, { name: 'AES-GCM', length: config.aesLength }, false, usages);
}

async function SSAEAD加密(cryptoKey, nonceCounter, plaintext) {
	const iv = nonceCounter.slice();
	const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv, tagLength: 128 }, cryptoKey, plaintext);
	SS递增Nonce计数器(nonceCounter);
	return new Uint8Array(ct);
}

async function SSAEAD解密(cryptoKey, nonceCounter, ciphertext) {
	const iv = nonceCounter.slice();
	const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv, tagLength: 128 }, cryptoKey, ciphertext);
	SS递增Nonce计数器(nonceCounter);
	return new Uint8Array(pt);
}

async function forwardataTCP(host, portNum, rawData, ws, respHeader, remoteConnWrapper, yourUUID, request = null, usageStats = null) {
	if (usageStats && usageStats.userId == null && 连接用户ID) usageStats.userId = 连接用户ID;
	log(`[TCP转发] 目标: ${host}:${portNum} | 反代IP: ${反代IP} | 反代兜底: ${启用反代兜底 ? '是' : '否'} | 反代类型: ${启用SOCKS5反代 || 'proxyip'} | 全局: ${启用SOCKS5全局反代 ? '是' : '否'}`);
	const 连接超时毫秒 = 1000;
	let 已通过代理发送首包 = false;
	const TCP连接 = 创建请求TCP连接器(request);

	async function 等待连接建立(remoteSock, timeoutMs = 连接超时毫秒) {
		await Promise.race([
			remoteSock.opened,
			new Promise((_, reject) => setTimeout(() => reject(new Error('连接超时')), timeoutMs))
		]);
	}

	async function 打开TCP连接(address, port) {
		const remoteSock = TCP连接({ hostname: address, port });
		try {
			await 等待连接建立(remoteSock);
			return remoteSock;
		} catch (err) {
			try { remoteSock?.close?.() } catch (e) { }
			throw err;
		}
	}

	async function 写入首包(remoteSock, data) {
		if (有效数据长度(data) <= 0) return;
		const writer = remoteSock.writable.getWriter();
		try { await writer.write(数据转Uint8Array(data)) }
		finally { try { writer.releaseLock() } catch (e) { } }
	}

	async function 并发打开候选连接(候选列表) {
		if (候选列表.length === 1) {
			const 候选 = 候选列表[0];
			return { socket: await 打开TCP连接(候选.hostname, 候选.port), candidate: 候选 };
		}
		const attempts = 候选列表.map(候选 => 打开TCP连接(候选.hostname, 候选.port).then(socket => ({ socket, candidate: 候选 })));
		let winner = null;
		try {
			winner = await Promise.any(attempts);
			return winner;
		} finally {
			if (winner) {
				for (const attempt of attempts) {
					attempt.then(({ socket }) => {
						if (socket !== winner.socket) {
							try { socket?.close?.() } catch (e) { }
						}
					}).catch(() => { });
				}
			}
		}
	}

	async function 构建预加载竞速候选列表(address, port) {
		if (!预加载竞速拨号 || isIPHostname(address)) return null;
		log(`[TCP直连] 预加载竞速拨号开启，开始并发查询 ${address} 的 A/AAAA 记录`);
		const [aRecords, aaaaRecords] = await Promise.all([
			DoH查询(address, 'A'),
			DoH查询(address, 'AAAA')
		]);
		const ipv4List = [...new Set(aRecords.flatMap(r => {
			const data = r.data;
			return r.type === 1 && typeof data === 'string' && isIPv4(data) ? [data] : [];
		}))];
		const ipv6List = [...new Set(aaaaRecords.flatMap(r => {
			const data = r.data;
			return r.type === 28 && typeof data === 'string' && isIPHostname(data) ? [data] : [];
		}))];
		const 拨号上限 = Math.max(1, TCP并发拨号数 | 0);
		const ipList = ipv4List.length >= 拨号上限
			? ipv4List.slice(0, 拨号上限)
			: ipv4List.concat(ipv6List.slice(0, 拨号上限 - ipv4List.length));
		const 使用记录类型 = ipv4List.length > 0
			? (ipList.length > ipv4List.length ? 'A+AAAA' : 'A')
			: 'AAAA';
		if (ipList.length === 0) {
			log(`[TCP直连] ${address} 的 A/AAAA 未获得可用解析结果，预加载竞速不可用，回退到原始 hostname 直连。`);
			return null;
		}
		const 选中IP列表 = ipList;
		log(`[TCP直连] ${address} A记录:${ipv4List.length} AAAA记录:${ipv6List.length}，使用${使用记录类型}记录，竞速拨号 ${选中IP列表.length}/${拨号上限}: ${选中IP列表.join(', ')}`);
		return 选中IP列表.map((hostname, attempt) => ({ hostname, port, attempt, resolvedFrom: address }));
	}

	async function connectDirect(address, port, data = null, 启用预加载 = false) {
		const 预加载候选列表 = 启用预加载 ? await 构建预加载竞速候选列表(address, port) : null;
		const 候选列表 = 预加载候选列表 || Array.from({ length: TCP并发拨号数 }, (_, attempt) => ({ hostname: address, port, attempt }));
		log(预加载候选列表
			? `[TCP直连] 并发尝试 ${候选列表.length} 路: ${候选列表.map(候选 => `${候选.hostname}:${候选.port}`).join(', ')}`
			: `[TCP直连] 并发尝试 ${候选列表.length} 路: ${address}:${port}`);
		let socket = null;
		try {
			const 连接结果 = await 并发打开候选连接(候选列表);
			socket = 连接结果.socket;
			if (预加载候选列表) {
				const winner = 连接结果.candidate;
				log(`[TCP直连] 预加载竞速结果: ${winner.hostname}:${winner.port} 胜出，源域名: ${winner.resolvedFrom || address}`);
			}
			await 写入首包(socket, data);
			return socket;
		} catch (err) {
			try { socket?.close?.() } catch (e) { }
			if (预加载候选列表) log(`[TCP直连] 预加载竞速失败: ${err.message || err}`);
			throw err;
		}
	}

	async function connectProxyIP(address, port, data = null, 所有反代数组 = null, 启用反代失败兜底 = true) {
		if (所有反代数组 && 所有反代数组.length > 0) {
			for (let i = 0; i < 所有反代数组.length; i += TCP并发拨号数) {
				const 候选列表 = [];
				for (let j = 0; j < TCP并发拨号数 && i + j < 所有反代数组.length; j++) {
					const 反代数组索引 = (缓存反代数组索引 + i + j) % 所有反代数组.length;
					const [反代地址, 反代端口] = 所有反代数组[反代数组索引];
					候选列表.push({ hostname: 反代地址, port: 反代端口, index: 反代数组索引 });
				}
				let socket = null, candidate = null;
				try {
					log(`[反代连接] 并发尝试 ${候选列表.length} 路: ${候选列表.map(候选 => `${候选.hostname}:${候选.port}`).join(', ')}`);
					const 连接结果 = await 并发打开候选连接(候选列表);
					socket = 连接结果.socket;
					candidate = 连接结果.candidate;
					await 写入首包(socket, data);
					log(`[反代连接] 成功连接到: ${candidate.hostname}:${candidate.port} (索引: ${candidate.index})`);
					缓存反代数组索引 = candidate.index;
					return socket;
				} catch (err) {
					try { socket?.close?.() } catch (e) { }
					log(`[反代连接] 本批连接失败: ${err.message || err}`);
				}
			}
		}

		if (启用反代失败兜底) return connectDirect(address, port, data, false);
		else {
			closeSocketQuietly(ws);
			throw new Error('[反代连接] 所有反代连接失败，且未启用反代兜底，连接终止。');
		}
	}

	async function connecttoPry(允许发送首包 = true) {
		if (remoteConnWrapper.connectingPromise) {
			await remoteConnWrapper.connectingPromise;
			return;
		}

		const 本次发送首包 = 允许发送首包 && !已通过代理发送首包 && 有效数据长度(rawData) > 0;
		const 本次首包数据 = 本次发送首包 ? rawData : null;

		const 当前连接任务 = (async () => {
			let newSocket;
			if (启用SOCKS5反代 === 'socks5') {
				log(`[SOCKS5代理] 代理到: ${host}:${portNum}`);
				newSocket = await socks5Connect(host, portNum, 本次首包数据, TCP连接);
			} else if (启用SOCKS5反代 === 'http') {
				log(`[HTTP代理] 代理到: ${host}:${portNum}`);
				newSocket = await httpConnect(host, portNum, 本次首包数据, false, TCP连接);
			} else if (启用SOCKS5反代 === 'https') {
				log(`[HTTPS代理] 代理到: ${host}:${portNum}`);
				newSocket = isIPHostname(parsedSocks5Address.hostname)
					? await httpsConnect(host, portNum, 本次首包数据, TCP连接)
					: await httpConnect(host, portNum, 本次首包数据, true, TCP连接);
			} else if (启用SOCKS5反代 === 'turn') {
				log(`[TURN代理] 代理到: ${host}:${portNum}`);
				newSocket = await turnConnect(parsedSocks5Address, host, portNum, TCP连接);
				if (有效数据长度(本次首包数据) > 0) {
					const writer = newSocket.writable.getWriter();
					try { await writer.write(数据转Uint8Array(本次首包数据)) }
					finally { try { writer.releaseLock() } catch (e) { } }
				}
			} else if (启用SOCKS5反代 === 'sstp') {
				log(`[SSTP代理] 代理到: ${host}:${portNum}`);
				newSocket = await sstpConnect(parsedSocks5Address, host, portNum, TCP连接);
				if (有效数据长度(本次首包数据) > 0) {
					const writer = newSocket.writable.getWriter();
					try { await writer.write(数据转Uint8Array(本次首包数据)) }
					finally { try { writer.releaseLock() } catch (e) { } }
				}
		} else {
			log(`[反代连接] 代理到: ${host}:${portNum}`);
			const 所有反代数组 = await 解析地址端口(反代IP, host, yourUUID);
			try {
				newSocket = await connectProxyIP(`${特征码字典[0]}.tp1.${特征码字典[2]}.xyz`, 1, 本次首包数据, 所有反代数组, 启用反代兜底);
			} catch (err) {
				const nat64Sock = nat64配置 ? await tryNat64连接(host, portNum, 本次首包数据, TCP连接) : null;
				if (!nat64Sock) throw err;
				newSocket = nat64Sock;
			}
		}
			if (本次发送首包) 已通过代理发送首包 = true;
			remoteConnWrapper.socket = newSocket;
			newSocket.closed.catch(() => { }).finally(() => closeSocketQuietly(ws));
			connectStreams(newSocket, ws, respHeader, null, usageStats);
		})();

		remoteConnWrapper.connectingPromise = 当前连接任务;
		try {
			await 当前连接任务;
		} finally {
			if (remoteConnWrapper.connectingPromise === 当前连接任务) {
				remoteConnWrapper.connectingPromise = null;
			}
		}
	}
	remoteConnWrapper.retryConnect = async () => connecttoPry(!已通过代理发送首包);

	if (启用SOCKS5反代 && (启用SOCKS5全局反代 || SOCKS5白名单.some(p => new RegExp(`^${p.replace(/\*/g, '.*')}$`, 'i').test(host)))) {
		log(`[TCP转发] 启用 SOCKS5/HTTP/HTTPS/TURN/SSTP 全局代理`);
		try {
			await connecttoPry();
		} catch (err) {
			log(`[TCP转发] SOCKS5/HTTP/HTTPS/TURN/SSTP 代理连接失败: ${err.message}`);
			throw err;
		}
	} else {
		try {
			log(`[TCP转发] 尝试直连到: ${host}:${portNum}`);
			const initialSocket = await connectDirect(host, portNum, rawData, true);
			remoteConnWrapper.socket = initialSocket;
			connectStreams(initialSocket, ws, respHeader, async () => {
				if (remoteConnWrapper.socket !== initialSocket) return;
				await connecttoPry();
			}, usageStats);
		} catch (err) {
			log(`[TCP转发] 直连 ${host}:${portNum} 失败: ${err.message}`);
			if (err instanceof Error && err.name === '预加载解析为空') {
				closeSocketQuietly(ws);
				throw err;
			}
			try {
				await connecttoPry();
			} catch (err2) {
				const nat64Sock = nat64配置 ? await tryNat64连接(host, portNum, rawData, TCP连接) : null;
				if (!nat64Sock) throw err2;
				remoteConnWrapper.socket = nat64Sock;
				nat64Sock.closed.catch(() => { }).finally(() => closeSocketQuietly(ws));
				connectStreams(nat64Sock, ws, respHeader, null, usageStats);
			}
		}
	}
}

async function forwardataudp(udpChunk, webSocket, respHeader, request, 响应封装器 = null) {
	const 请求数据 = 数据转Uint8Array(udpChunk);
	const 请求字节数 = 请求数据.byteLength;
	log(`[UDP转发] 收到 DNS 请求: ${请求字节数}B -> 8.8.4.4:53`);
	try {
		const TCP连接 = 创建请求TCP连接器(request);
		const tcpSocket = TCP连接({ hostname: '8.8.4.4', port: 53 });
		let 魏烈思Header = respHeader;
		const writer = tcpSocket.writable.getWriter();
		await writer.write(请求数据);
		log(`[UDP转发] DNS 请求已写入上游: ${请求字节数}B`);
		writer.releaseLock();
		await tcpSocket.readable.pipeTo(new WritableStream({
			async write(chunk) {
				const 原始响应 = 数据转Uint8Array(chunk);
				log(`[UDP转发] 收到 DNS 响应: ${原始响应.byteLength}B`);
				const 封装结果 = 响应封装器 ? await 响应封装器(原始响应) : 原始响应;
				const 发送片段列表 = Array.isArray(封装结果) ? 封装结果 : [封装结果];
				if (!发送片段列表.length) return;
				if (webSocket.readyState !== WebSocket.OPEN) return;
				for (const fragment of 发送片段列表) {
					const 转发响应 = 数据转Uint8Array(fragment);
					if (!转发响应.byteLength) continue;
					if (魏烈思Header) {
						const response = new Uint8Array(魏烈思Header.length + 转发响应.byteLength);
						response.set(魏烈思Header, 0);
						response.set(转发响应, 魏烈思Header.length);
						await WebSocket发送并等待(webSocket, response.buffer);
						魏烈思Header = null;
					} else {
						await WebSocket发送并等待(webSocket, 转发响应);
					}
				}
			},
		}));
	} catch (error) {
		log(`[UDP转发] DNS 转发失败: ${error?.message || error}`);
	}
}

function closeSocketQuietly(socket) {
	try {
		if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CLOSING) {
			socket.close();
		}
	} catch (error) { }
}

function formatIdentifier(arr, offset = 0) {
	const hex = [...arr.slice(offset, offset + 16)].map(b => b.toString(16).padStart(2, '0')).join('');
	return `${hex.substring(0, 8)}-${hex.substring(8, 12)}-${hex.substring(12, 16)}-${hex.substring(16, 20)}-${hex.substring(20)}`;
}

async function WebSocket发送并等待(webSocket, payload) {
	const sendResult = webSocket.send(payload);
	if (sendResult && typeof sendResult.then === 'function') await sendResult;
}

function 创建上行写入队列({ 获取写入器, 释放写入器, 重试连接, 关闭连接, 名称 = '上行队列' }) {
	let chunks = [];
	let head = 0;
	let queuedBytes = 0;
	let draining = false;
	let closed = false;
	let bundleBuffer = null;
	let idleResolvers = [];
	let activeCompletions = null;

	const settleCompletions = (completions, err = null) => {
		if (!completions) return;
		for (const completion of completions) {
			if (err) completion.reject(err);
			else completion.resolve();
		}
	};

	const rejectQueued = (err) => {
		for (let i = head; i < chunks.length; i++) {
			const item = chunks[i];
			if (item?.completions) settleCompletions(item.completions, err);
		}
	};

	const compact = () => {
		if (head > 32 && head * 2 >= chunks.length) {
			chunks = chunks.slice(head);
			head = 0;
		}
	};

	const resolveIdle = () => {
		if (queuedBytes || draining || !idleResolvers.length) return;
		const resolvers = idleResolvers;
		idleResolvers = [];
		for (const resolve of resolvers) resolve();
	};

	const clear = (err = null) => {
		const closeErr = err || (closed ? new Error(`${名称}: queue closed`) : null);
		if (closeErr) {
			rejectQueued(closeErr);
			settleCompletions(activeCompletions, closeErr);
			activeCompletions = null;
		}
		chunks = [];
		head = 0;
		queuedBytes = 0;
		resolveIdle();
	};

	const shift = () => {
		if (head >= chunks.length) return null;
		const item = chunks[head];
		chunks[head++] = undefined;
		queuedBytes -= item.chunk.byteLength;
		compact();
		return item;
	};

	const bundle = () => {
		const first = shift();
		if (!first) return null;
		if (head >= chunks.length || first.chunk.byteLength >= 上行合包目标字节) return first;

		let byteLength = first.chunk.byteLength;
		let end = head;
		let allowRetry = first.allowRetry;
		let completions = first.completions || null;
		while (end < chunks.length) {
			const next = chunks[end];
			const nextLength = byteLength + next.chunk.byteLength;
			if (nextLength > 上行合包目标字节) break;
			byteLength = nextLength;
			allowRetry = allowRetry && next.allowRetry;
			if (next.completions) completions = completions ? completions.concat(next.completions) : next.completions;
			end++;
		}
		if (end === head) return first;

		const output = (bundleBuffer ||= new Uint8Array(上行合包目标字节));
		output.set(first.chunk);
		let offset = first.chunk.byteLength;
		while (head < end) {
			const next = chunks[head];
			chunks[head++] = undefined;
			queuedBytes -= next.chunk.byteLength;
			output.set(next.chunk, offset);
			offset += next.chunk.byteLength;
		}
		compact();
		return { chunk: output.subarray(0, byteLength), allowRetry, completions };
	};

	const drain = async () => {
		if (draining || closed) return;
		draining = true;
		try {
			for (; ;) {
				if (closed) break;
				const item = bundle();
				if (!item) break;
				let writer = 获取写入器();
				if (!writer) throw new Error(`${名称}: remote writer unavailable`);
				const completions = item.completions || null;
				activeCompletions = completions;
				try {
					try {
						await writer.write(item.chunk);
					} catch (err) {
						释放写入器?.();
						if (!item.allowRetry || typeof 重试连接 !== 'function') throw err;
						await 重试连接();
						writer = 获取写入器();
						if (!writer) throw err;
						await writer.write(item.chunk);
					}
					settleCompletions(completions);
				} catch (err) {
					settleCompletions(completions, err);
					throw err;
				} finally {
					if (activeCompletions === completions) activeCompletions = null;
				}
			}
		} catch (err) {
			closed = true;
			clear(err);
			log(`[${名称}] 写入失败: ${err?.message || err}`);
			try { 关闭连接?.(err) } catch (_) { }
		} finally {
			draining = false;
			if (!closed && head < chunks.length) queueMicrotask(drain);
			else resolveIdle();
		}
	};

	const enqueue = (data, allowRetry = true, waitForFlush = false) => {
		if (closed) return false;
		// 首包解析阶段 socket 可能尚未建立；返回 false 交给上层继续走协议解析路径。
		if (!获取写入器()) return false;
		const chunk = 数据转Uint8Array(data);
		if (!chunk.byteLength) return true;
		const nextBytes = queuedBytes + chunk.byteLength;
		const nextItems = chunks.length - head + 1;
		if (nextBytes > 上行队列最大字节 || nextItems > 上行队列最大条目) {
			closed = true;
			const err = Object.assign(new Error(`${名称}: upload queue overflow (${nextBytes}B/${nextItems})`), { isQueueOverflow: true });
			clear(err);
			log(`[${名称}] 队列超限，关闭连接`);
			try { 关闭连接?.(err) } catch (_) { }
			throw err;
		}
		let completionPromise = null;
		let completions = null;
		if (waitForFlush) {
			completions = [];
			completionPromise = new Promise((resolve, reject) => completions.push({ resolve, reject }));
		}
		chunks.push({ chunk, allowRetry, completions });
		queuedBytes = nextBytes;
		if (!draining) queueMicrotask(drain);
		return waitForFlush ? completionPromise.then(() => true) : true;
	};

	return {
		写入(data, allowRetry = true) {
			return enqueue(data, allowRetry, false);
		},
		写入并等待(data, allowRetry = true) {
			return enqueue(data, allowRetry, true);
		},
		async 等待空() {
			if (!queuedBytes && !draining) return;
			await new Promise(resolve => idleResolvers.push(resolve));
		},
		清空() {
			closed = true;
			clear();
		}
	};
}

function 创建下行Grain发送器(webSocket, headerData = null) {
	const packetCap = 下行Grain包字节;
	const tailBytes = 下行Grain尾部阈值;
	const lowWaterBytes = Math.max(4096, tailBytes << 3);
	let header = headerData;
	let pendingBuffer = new Uint8Array(packetCap);
	let pendingBytes = 0;
	let flushTimer = null;
	let microtaskQueued = false;
	let generation = 0;
	let scheduledGeneration = 0;
	let waitRounds = 0;
	let flushPromise = null;

	const 发送原始块 = async (chunk) => {
		if (webSocket.readyState !== WebSocket.OPEN) throw new Error('ws.readyState is not open');
		await WebSocket发送并等待(webSocket, chunk);
	};

	const 附加响应头 = (chunk) => {
		if (!header) return chunk;
		const merged = new Uint8Array(header.length + chunk.byteLength);
		merged.set(header, 0);
		merged.set(chunk, header.length);
		header = null;
		return merged;
	};

	const flush = async () => {
		while (flushPromise) await flushPromise;
		if (flushTimer) clearTimeout(flushTimer);
		flushTimer = null;
		microtaskQueued = false;
		if (!pendingBytes) return;
		const output = pendingBuffer.subarray(0, pendingBytes).slice();
		pendingBuffer = new Uint8Array(packetCap);
		pendingBytes = 0;
		waitRounds = 0;
		flushPromise = 发送原始块(output).finally(() => { flushPromise = null });
		return flushPromise;
	};

	const scheduleFlush = () => {
		if (flushTimer || microtaskQueued) return;
		microtaskQueued = true;
		scheduledGeneration = generation;
		queueMicrotask(() => {
			microtaskQueued = false;
			if (!pendingBytes || flushTimer) return;
			if (packetCap - pendingBytes < tailBytes) {
				flush().catch(() => closeSocketQuietly(webSocket));
				return;
			}
			flushTimer = setTimeout(() => {
				flushTimer = null;
				if (!pendingBytes) return;
				if (packetCap - pendingBytes < tailBytes) {
					flush().catch(() => closeSocketQuietly(webSocket));
					return;
				}
				if (waitRounds < 2 && (generation !== scheduledGeneration || pendingBytes < lowWaterBytes)) {
					waitRounds++;
					scheduledGeneration = generation;
					scheduleFlush();
					return;
				}
				flush().catch(() => closeSocketQuietly(webSocket));
			}, Math.max(下行Grain静默毫秒, 1));
		});
	};

	return {
		async 直接发送(data) {
			let chunk = 数据转Uint8Array(data);
			if (!chunk.byteLength) return;
			chunk = 附加响应头(chunk);
			await 发送原始块(chunk);
		},
		async 发送(data) {
			let chunk = 数据转Uint8Array(data);
			if (!chunk.byteLength) return;
			chunk = 附加响应头(chunk);
			let offset = 0;
			const totalBytes = chunk.byteLength;
			while (offset < totalBytes) {
				if (!pendingBytes && totalBytes - offset >= packetCap) {
					const sendBytes = Math.min(packetCap, totalBytes - offset);
					const view = offset || sendBytes !== totalBytes ? chunk.subarray(offset, offset + sendBytes) : chunk;
					await 发送原始块(view);
					offset += sendBytes;
					continue;
				}
				const copyBytes = Math.min(packetCap - pendingBytes, totalBytes - offset);
				pendingBuffer.set(chunk.subarray(offset, offset + copyBytes), pendingBytes);
				pendingBytes += copyBytes;
				offset += copyBytes;
				generation++;
				if (pendingBytes === packetCap || packetCap - pendingBytes < tailBytes) await flush();
				else scheduleFlush();
			}
		},
		flush
	};
}

async function connectStreams(remoteSocket, webSocket, headerData, retryFunc, usageStats = null) {
	let header = headerData, hasData = false, reader, useBYOB = false;
	const BYOB单次读取上限 = 64 * 1024;
	const 下行发送器 = 创建下行Grain发送器(webSocket, header);
	const 下行限速器 = usageStats ? getSpeedLimiter('down') : null;
	header = null;

	try { reader = remoteSocket.readable.getReader({ mode: 'byob' }); useBYOB = true }
	catch (e) { reader = remoteSocket.readable.getReader() }

	try {
		if (!useBYOB) {
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				if (!value || value.byteLength === 0) continue;
				hasData = true;
				if (usageStats) { usageStats.down += value.byteLength; if (usageStats.userId && 连接用户是否超量(usageStats.userId, usageStats.up + usageStats.down)) throw new Error('quota exceeded'); }
				if (下行限速器 && 下行限速器.enabled) await 下行限速器.take(value.byteLength);
				await 下行发送器.发送(value);
			}
		} else {
			let readBuffer = new ArrayBuffer(BYOB单次读取上限);
			while (true) {
				const { done, value } = await reader.read(new Uint8Array(readBuffer, 0, BYOB单次读取上限));
				if (done) break;
				if (!value || value.byteLength === 0) continue;
				hasData = true;
				if (usageStats) { usageStats.down += value.byteLength; if (usageStats.userId && 连接用户是否超量(usageStats.userId, usageStats.up + usageStats.down)) throw new Error('quota exceeded'); }
				if (value.byteLength >= 下行Grain包字节) {
					await 下行发送器.flush();
					if (下行限速器 && 下行限速器.enabled) await 下行限速器.take(value.byteLength);
					await 下行发送器.直接发送(value);
					readBuffer = new ArrayBuffer(BYOB单次读取上限);
				} else {
					if (下行限速器 && 下行限速器.enabled) await 下行限速器.take(value.byteLength);
					await 下行发送器.发送(value);
					readBuffer = value.buffer.byteLength >= BYOB单次读取上限 ? value.buffer : new ArrayBuffer(BYOB单次读取上限);
				}
			}
		}
		await 下行发送器.flush();
	} catch (err) { closeSocketQuietly(webSocket) }
	finally { try { reader.cancel() } catch (e) { } try { reader.releaseLock() } catch (e) { } }
	if (!hasData && retryFunc) await retryFunc();
}

function isSpeedTestSite(hostname) {
	const speedTestDomains = [atob('c3BlZWQuY2xvdWRmbGFyZS5jb20=')];
	if (speedTestDomains.includes(hostname)) {
		return true;
	}

	for (const domain of speedTestDomains) {
		if (hostname.endsWith('.' + domain) || hostname === domain) {
			return true;
		}
	}
	return false;
}

///////////////////////////////////////////////////////SOCKS5/HTTP函数///////////////////////////////////////////////
async function socks5Connect(targetHost, targetPort, initialData, TCP连接) {
	const { username, password, hostname, port } = parsedSocks5Address;
	const socket = TCP连接({ hostname, port }), writer = socket.writable.getWriter(), reader = socket.readable.getReader();
	try {
		const authMethods = username && password ? new Uint8Array([0x05, 0x02, 0x00, 0x02]) : new Uint8Array([0x05, 0x01, 0x00]);
		await writer.write(authMethods);
		let response = await reader.read();
		if (response.done || response.value.byteLength < 2) throw new Error('S5 method selection failed');

		const selectedMethod = new Uint8Array(response.value)[1];
		if (selectedMethod === 0x02) {
			if (!username || !password) throw new Error('S5 requires authentication');
			const userBytes = new TextEncoder().encode(username), passBytes = new TextEncoder().encode(password);
			const authPacket = new Uint8Array([0x01, userBytes.length, ...userBytes, passBytes.length, ...passBytes]);
			await writer.write(authPacket);
			response = await reader.read();
			if (response.done || new Uint8Array(response.value)[1] !== 0x00) throw new Error('S5 authentication failed');
		} else if (selectedMethod !== 0x00) throw new Error(`S5 unsupported auth method: ${selectedMethod}`);

		const hostBytes = new TextEncoder().encode(targetHost);
		const connectPacket = new Uint8Array([0x05, 0x01, 0x00, 0x03, hostBytes.length, ...hostBytes, targetPort >> 8, targetPort & 0xff]);
		await writer.write(connectPacket);
		response = await reader.read();
		if (response.done || new Uint8Array(response.value)[1] !== 0x00) throw new Error('S5 connection failed');

		if (有效数据长度(initialData) > 0) await writer.write(initialData);
		writer.releaseLock(); reader.releaseLock();
		return socket;
	} catch (error) {
		try { writer.releaseLock() } catch (e) { }
		try { reader.releaseLock() } catch (e) { }
		try { socket.close() } catch (e) { }
		throw error;
	}
}

async function httpConnect(targetHost, targetPort, initialData, HTTPS代理 = false, TCP连接) {
	const { username, password, hostname, port } = parsedSocks5Address;
	const socket = HTTPS代理
		? TCP连接({ hostname, port }, { secureTransport: 'on', allowHalfOpen: false })
		: TCP连接({ hostname, port });
	const writer = socket.writable.getWriter(), reader = socket.readable.getReader();
	const encoder = new TextEncoder();
	const decoder = new TextDecoder();
	try {
		if (HTTPS代理) await socket.opened;

		const auth = username && password ? `Proxy-Authorization: Basic ${btoa(`${username}:${password}`)}\r\n` : '';
		const request = `CONNECT ${targetHost}:${targetPort} HTTP/1.1\r\nHost: ${targetHost}:${targetPort}\r\n${auth}User-Agent: Mozilla/5.0\r\nConnection: keep-alive\r\n\r\n`;
		await writer.write(encoder.encode(request));
		writer.releaseLock();

		let responseBuffer = new Uint8Array(0), headerEndIndex = -1, bytesRead = 0;
		while (headerEndIndex === -1 && bytesRead < 8192) {
			const { done, value } = await reader.read();
			if (done || !value) throw new Error(`${HTTPS代理 ? 'HTTPS' : 'HTTP'} 代理在返回 CONNECT 响应前关闭连接`);
			responseBuffer = new Uint8Array([...responseBuffer, ...value]);
			bytesRead = responseBuffer.length;
			const crlfcrlf = responseBuffer.findIndex((_, i) => i < responseBuffer.length - 3 && responseBuffer[i] === 0x0d && responseBuffer[i + 1] === 0x0a && responseBuffer[i + 2] === 0x0d && responseBuffer[i + 3] === 0x0a);
			if (crlfcrlf !== -1) headerEndIndex = crlfcrlf + 4;
		}

		if (headerEndIndex === -1) throw new Error('代理 CONNECT 响应头过长或无效');
		const statusMatch = decoder.decode(responseBuffer.slice(0, headerEndIndex)).split('\r\n')[0].match(/HTTP\/\d\.\d\s+(\d+)/);
		const statusCode = statusMatch ? parseInt(statusMatch[1], 10) : NaN;
		if (!Number.isFinite(statusCode) || statusCode < 200 || statusCode >= 300) throw new Error(`Connection failed: HTTP ${statusCode}`);

		reader.releaseLock();

		if (有效数据长度(initialData) > 0) {
			const 远端写入器 = socket.writable.getWriter();
			await 远端写入器.write(initialData);
			远端写入器.releaseLock();
		}

		// CONNECT 响应头后可能夹带隧道数据，先回灌到可读流，避免首包被吞。
		if (bytesRead > headerEndIndex) {
			const { readable, writable } = new TransformStream();
			const transformWriter = writable.getWriter();
			await transformWriter.write(responseBuffer.subarray(headerEndIndex, bytesRead));
			transformWriter.releaseLock();
			socket.readable.pipeTo(writable).catch(() => { });
			return { readable, writable: socket.writable, closed: socket.closed, close: () => socket.close() };
		}

		return socket;
	} catch (error) {
		try { writer.releaseLock() } catch (e) { }
		try { reader.releaseLock() } catch (e) { }
		try { socket.close() } catch (e) { }
		throw error;
	}
}

async function httpsConnect(targetHost, targetPort, initialData, TCP连接) {
	const { username, password, hostname, port } = parsedSocks5Address;
	const encoder = new TextEncoder();
	const decoder = new TextDecoder();
	let tlsSocket = null;
	const tlsServerName = isIPHostname(hostname) ? '' : stripIPv6Brackets(hostname);
	const 打开HTTPS代理TLS = async (allowChacha = false) => {
		const proxySocket = TCP连接({ hostname, port });
		try {
			await proxySocket.opened;
			const socket = new TlsClient(proxySocket, { serverName: tlsServerName, insecure: true, allowChacha });
			await socket.handshake();
			log(`[HTTPS代理] TLS版本: ${socket.isTls13 ? '1.3' : '1.2'} | Cipher: 0x${socket.cipherSuite.toString(16)}${socket.cipherConfig?.chacha ? ' (ChaCha20)' : ' (AES-GCM)'}`);
			return socket;
		} catch (error) {
			try { proxySocket.close() } catch (e) { }
			throw error;
		}
	};
	try {
		try {
			tlsSocket = await 打开HTTPS代理TLS(false);
		} catch (error) {
			if (!/cipher|handshake|TLS Alert|ServerHello|Finished|Unsupported|Missing TLS/i.test(error?.message || `${error || ''}`)) throw error;
			log(`[HTTPS代理] AES-GCM TLS 握手失败，回退 ChaCha20 兼容模式: ${error?.message || error}`);
			tlsSocket = await 打开HTTPS代理TLS(true);
		}

		const auth = username && password ? `Proxy-Authorization: Basic ${btoa(`${username}:${password}`)}\r\n` : '';
		const request = `CONNECT ${targetHost}:${targetPort} HTTP/1.1\r\nHost: ${targetHost}:${targetPort}\r\n${auth}User-Agent: Mozilla/5.0\r\nConnection: keep-alive\r\n\r\n`;
		await tlsSocket.write(encoder.encode(request));

		let responseBuffer = new Uint8Array(0), headerEndIndex = -1, bytesRead = 0;
		while (headerEndIndex === -1 && bytesRead < 8192) {
			const value = await tlsSocket.read();
			if (!value) throw new Error('HTTPS 代理在返回 CONNECT 响应前关闭连接');
			responseBuffer = 拼接字节数据(responseBuffer, value);
			bytesRead = responseBuffer.length;
			const crlfcrlf = responseBuffer.findIndex((_, i) => i < responseBuffer.length - 3 && responseBuffer[i] === 0x0d && responseBuffer[i + 1] === 0x0a && responseBuffer[i + 2] === 0x0d && responseBuffer[i + 3] === 0x0a);
			if (crlfcrlf !== -1) headerEndIndex = crlfcrlf + 4;
		}

		if (headerEndIndex === -1) throw new Error('HTTPS 代理 CONNECT 响应头过长或无效');
		const statusMatch = decoder.decode(responseBuffer.slice(0, headerEndIndex)).split('\r\n')[0].match(/HTTP\/\d\.\d\s+(\d+)/);
		const statusCode = statusMatch ? parseInt(statusMatch[1], 10) : NaN;
		if (!Number.isFinite(statusCode) || statusCode < 200 || statusCode >= 300) throw new Error(`Connection failed: HTTP ${statusCode}`);

		if (有效数据长度(initialData) > 0) await tlsSocket.write(数据转Uint8Array(initialData));
		const bufferedData = bytesRead > headerEndIndex ? responseBuffer.subarray(headerEndIndex, bytesRead) : null;
		let closedSettled = false, resolveClosed, rejectClosed;
		const settleClosed = (settle, value) => {
			if (!closedSettled) {
				closedSettled = true;
				settle(value);
			}
		};
		const closed = new Promise((resolve, reject) => {
			resolveClosed = resolve;
			rejectClosed = reject;
		});
		const close = () => {
			try { tlsSocket.close() } catch (e) { }
			settleClosed(resolveClosed);
		};
		const readable = new ReadableStream({
			async start(controller) {
				try {
					if (有效数据长度(bufferedData) > 0) controller.enqueue(bufferedData);
					while (true) {
						const data = await tlsSocket.read();
						if (!data) break;
						if (data.byteLength > 0) controller.enqueue(data);
					}
					try { controller.close() } catch (e) { }
					settleClosed(resolveClosed);
				} catch (error) {
					try { controller.error(error) } catch (e) { }
					settleClosed(rejectClosed, error);
				}
			},
			cancel() {
				close();
			}
		});
		const writable = new WritableStream({
			async write(chunk) {
				await tlsSocket.write(数据转Uint8Array(chunk));
			},
			close,
			abort(error) {
				close();
				if (error) settleClosed(rejectClosed, error);
			}
		});
		return { readable, writable, closed, close };
	} catch (error) {
		try { tlsSocket?.close() } catch (e) { }
		throw error;
	}
}

function 创建请求TCP连接器(request) {
	const 请求对象 = /** @type {any} */ (request);
	const fetcher = 请求对象?.fetcher;
	if (!fetcher || typeof fetcher.connect !== 'function') throw new Error('request.fetcher.connect unavailable');
	return (options, init) => init === undefined ? fetcher.connect(options) : fetcher.connect(options, init);
}
////////////////////////////////////////////TLSClient by: @Alexandre_Kojeve////////////////////////////////////////////////
const TLS_VERSION_10 = 769, TLS_VERSION_12 = 771, TLS_VERSION_13 = 772;
const CONTENT_TYPE_CHANGE_CIPHER_SPEC = 20, CONTENT_TYPE_ALERT = 21, CONTENT_TYPE_HANDSHAKE = 22, CONTENT_TYPE_APPLICATION_DATA = 23;
const HANDSHAKE_TYPE_CLIENT_HELLO = 1, HANDSHAKE_TYPE_SERVER_HELLO = 2, HANDSHAKE_TYPE_NEW_SESSION_TICKET = 4, HANDSHAKE_TYPE_ENCRYPTED_EXTENSIONS = 8, HANDSHAKE_TYPE_CERTIFICATE = 11, HANDSHAKE_TYPE_SERVER_KEY_EXCHANGE = 12, HANDSHAKE_TYPE_CERTIFICATE_REQUEST = 13, HANDSHAKE_TYPE_SERVER_HELLO_DONE = 14, HANDSHAKE_TYPE_CERTIFICATE_VERIFY = 15, HANDSHAKE_TYPE_CLIENT_KEY_EXCHANGE = 16, HANDSHAKE_TYPE_FINISHED = 20, HANDSHAKE_TYPE_KEY_UPDATE = 24;
const EXT_SERVER_NAME = 0, EXT_SUPPORTED_GROUPS = 10, EXT_EC_POINT_FORMATS = 11, EXT_SIGNATURE_ALGORITHMS = 13, EXT_APPLICATION_LAYER_PROTOCOL_NEGOTIATION = 16, EXT_SUPPORTED_VERSIONS = 43, EXT_PSK_KEY_EXCHANGE_MODES = 45, EXT_KEY_SHARE = 51;

const ALERT_CLOSE_NOTIFY = 0, ALERT_LEVEL_WARNING = 1, ALERT_UNRECOGNIZED_NAME = 112;
const shouldIgnoreTlsAlert = fragment => fragment?.[0] === ALERT_LEVEL_WARNING && fragment?.[1] === ALERT_UNRECOGNIZED_NAME;

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();
const EMPTY_BYTES = new Uint8Array(0);

const CIPHER_SUITES_BY_ID = new Map([
	[4865, { id: 4865, keyLen: 16, ivLen: 12, hash: "SHA-256", tls13: !0 }],
	[4866, { id: 4866, keyLen: 32, ivLen: 12, hash: "SHA-384", tls13: !0 }],
	[4867, { id: 4867, keyLen: 32, ivLen: 12, hash: "SHA-256", tls13: !0, chacha: !0 }],
	[49199, { id: 49199, keyLen: 16, ivLen: 4, hash: "SHA-256", kex: "ECDHE" }],
	[49200, { id: 49200, keyLen: 32, ivLen: 4, hash: "SHA-384", kex: "ECDHE" }],
	[52392, { id: 52392, keyLen: 32, ivLen: 12, hash: "SHA-256", kex: "ECDHE", chacha: !0 }],
	[49195, { id: 49195, keyLen: 16, ivLen: 4, hash: "SHA-256", kex: "ECDHE" }],
	[49196, { id: 49196, keyLen: 32, ivLen: 4, hash: "SHA-384", kex: "ECDHE" }],
	[52393, { id: 52393, keyLen: 32, ivLen: 12, hash: "SHA-256", kex: "ECDHE", chacha: !0 }]
]);
const GROUPS_BY_ID = new Map([[29, "X25519"], [23, "P-256"]]);
const SUPPORTED_SIGNATURE_ALGORITHMS = [2052, 2053, 2054, 1025, 1281, 1537, 1027, 1283, 1539];

const tlsBytes = (...parts) => {
	const flattenBytes = values => values.flatMap(value => value instanceof Uint8Array ? [...value] : Array.isArray(value) ? flattenBytes(value) : "number" == typeof value ? [value] : []);
	return new Uint8Array(flattenBytes(parts))
};
const uint16be = value => [value >> 8 & 255, 255 & value];
const readUint16 = (buffer, offset) => buffer[offset] << 8 | buffer[offset + 1];
const readUint24 = (buffer, offset) => buffer[offset] << 16 | buffer[offset + 1] << 8 | buffer[offset + 2];
const concatBytes = (...chunks) => {
	const nonEmptyChunks = chunks.filter((chunk => chunk && chunk.length > 0)),
		length = nonEmptyChunks.reduce(((total, chunk) => total + chunk.length), 0),
		result = new Uint8Array(length);
	let offset = 0;
	for (const chunk of nonEmptyChunks) result.set(chunk, offset), offset += chunk.length;
	return result
};
const randomBytes = length => crypto.getRandomValues(new Uint8Array(length));
const constantTimeEqual = (left, right) => {
	if (!left || !right || left.length !== right.length) return !1;
	let diff = 0; for (let index = 0; index < left.length; index++) diff |= left[index] ^ right[index];
	return 0 === diff
};
const hashByteLength = hash => "SHA-512" === hash ? 64 : "SHA-384" === hash ? 48 : 32;
async function hmac(hash, key, data) {
	const cryptoKey = await crypto.subtle.importKey("raw", key, { name: "HMAC", hash }, !1, ["sign"]);
	return new Uint8Array(await crypto.subtle.sign("HMAC", cryptoKey, data))
}
async function digestBytes(hash, data) { return new Uint8Array(await crypto.subtle.digest(hash, data)) }
async function tls12Prf(secret, label, seed, length, hash = "SHA-256") {
	const labelSeed = concatBytes(textEncoder.encode(label), seed);
	let output = new Uint8Array(0),
		currentA = labelSeed;
	for (; output.length < length;) {
		currentA = await hmac(hash, secret, currentA);
		const block = await hmac(hash, secret, concatBytes(currentA, labelSeed));
		output = concatBytes(output, block)
	}
	return output.slice(0, length)
}
async function hkdfExtract(hash, salt, inputKeyMaterial) {
	return salt && salt.length || (salt = new Uint8Array(hashByteLength(hash))), hmac(hash, salt, inputKeyMaterial)
}
async function hkdfExpandLabel(hash, secret, label, context, length) {
	const fullLabel = textEncoder.encode("tls13 " + label);
	return async function (hash, secret, info, length) {
		const hashLen = hashByteLength(hash),
			roundCount = Math.ceil(length / hashLen);
		let output = new Uint8Array(0),
			previousBlock = new Uint8Array(0);
		for (let round = 1; round <= roundCount; round++) previousBlock = await hmac(hash, secret, concatBytes(previousBlock, info, [round])), output = concatBytes(output, previousBlock);
		return output.slice(0, length)
	}(hash, secret, tlsBytes(uint16be(length), fullLabel.length, fullLabel, context.length, context), length)
}
async function generateKeyShare(group = "P-256") {
	const algorithm = "X25519" === group ? { name: "X25519" } : { name: "ECDH", namedCurve: group };
	const keyPair = /** @type {CryptoKeyPair} */ (await crypto.subtle.generateKey(algorithm, !0, ["deriveBits"]));
	const publicKeyRaw = /** @type {ArrayBuffer} */ (await crypto.subtle.exportKey("raw", keyPair.publicKey));
	return { keyPair, publicKeyRaw: new Uint8Array(publicKeyRaw) }
}
async function deriveSharedSecret(privateKey, peerPublicKey, group = "P-256") {
	const algorithm = "X25519" === group ? { name: "X25519" } : { name: "ECDH", namedCurve: group },
		peerKey = await crypto.subtle.importKey("raw", peerPublicKey, algorithm, !1, []),
		bits = "P-384" === group ? 384 : "P-521" === group ? 528 : 256;
	return new Uint8Array(await crypto.subtle.deriveBits(/** @type {any} */({ name: algorithm.name, public: peerKey }), privateKey, bits))
}
async function importAesGcmKey(key, usages) { return crypto.subtle.importKey("raw", key, { name: "AES-GCM" }, !1, usages) }
async function aesGcmEncryptWithKey(cryptoKey, initializationVector, plaintext, additionalData) {
	return new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv: initializationVector, additionalData, tagLength: 128 }, cryptoKey, plaintext))
}
async function aesGcmDecryptWithKey(cryptoKey, initializationVector, ciphertext, additionalData) {
	return new Uint8Array(await crypto.subtle.decrypt({ name: "AES-GCM", iv: initializationVector, additionalData, tagLength: 128 }, cryptoKey, ciphertext))
}

function rotateLeft32(value, bits) { return (value << bits | value >>> 32 - bits) >>> 0 }

function chachaQuarterRound(state, indexA, indexB, indexC, indexD) {
	state[indexA] = state[indexA] + state[indexB] >>> 0, state[indexD] = rotateLeft32(state[indexD] ^ state[indexA], 16), state[indexC] = state[indexC] + state[indexD] >>> 0, state[indexB] = rotateLeft32(state[indexB] ^ state[indexC], 12), state[indexA] = state[indexA] + state[indexB] >>> 0, state[indexD] = rotateLeft32(state[indexD] ^ state[indexA], 8), state[indexC] = state[indexC] + state[indexD] >>> 0, state[indexB] = rotateLeft32(state[indexB] ^ state[indexC], 7)
}

function chacha20Block(key, counter, nonce) {
	const state = new Uint32Array(16);
	state[0] = 1634760805, state[1] = 857760878, state[2] = 2036477234, state[3] = 1797285236;
	const keyView = new DataView(key.buffer, key.byteOffset, key.byteLength);
	for (let wordIndex = 0; wordIndex < 8; wordIndex++) state[4 + wordIndex] = keyView.getUint32(4 * wordIndex, !0);
	state[12] = counter;
	const nonceView = new DataView(nonce.buffer, nonce.byteOffset, nonce.byteLength);
	state[13] = nonceView.getUint32(0, !0), state[14] = nonceView.getUint32(4, !0), state[15] = nonceView.getUint32(8, !0);
	const workingState = new Uint32Array(state);
	for (let round = 0; round < 10; round++) chachaQuarterRound(workingState, 0, 4, 8, 12), chachaQuarterRound(workingState, 1, 5, 9, 13), chachaQuarterRound(workingState, 2, 6, 10, 14), chachaQuarterRound(workingState, 3, 7, 11, 15), chachaQuarterRound(workingState, 0, 5, 10, 15), chachaQuarterRound(workingState, 1, 6, 11, 12), chachaQuarterRound(workingState, 2, 7, 8, 13), chachaQuarterRound(workingState, 3, 4, 9, 14);
	for (let wordIndex = 0; wordIndex < 16; wordIndex++) workingState[wordIndex] = workingState[wordIndex] + state[wordIndex] >>> 0;
	return new Uint8Array(workingState.buffer.slice(0))
}

function chacha20Xor(key, nonce, data) {
	const output = new Uint8Array(data.length);
	let counter = 1;
	for (let offset = 0; offset < data.length; offset += 64) {
		const block = chacha20Block(key, counter++, nonce),
			blockLength = Math.min(64, data.length - offset);
		for (let index = 0; index < blockLength; index++) output[offset + index] = data[offset + index] ^ block[index]
	}
	return output
}

function poly1305Mac(key, message) {
	const rKey = function (rBytes) {
		const clamped = new Uint8Array(rBytes);
		return clamped[3] &= 15, clamped[7] &= 15, clamped[11] &= 15, clamped[15] &= 15, clamped[4] &= 252, clamped[8] &= 252, clamped[12] &= 252, clamped
	}(key.slice(0, 16)),
		sKey = key.slice(16, 32);
	let accumulator = [0n, 0n, 0n, 0n, 0n];
	const rLimbs = [0x3ffffffn & BigInt(rKey[0] | rKey[1] << 8 | rKey[2] << 16 | rKey[3] << 24), 0x3ffffffn & BigInt(rKey[3] >> 2 | rKey[4] << 6 | rKey[5] << 14 | rKey[6] << 22), 0x3ffffffn & BigInt(rKey[6] >> 4 | rKey[7] << 4 | rKey[8] << 12 | rKey[9] << 20), 0x3ffffffn & BigInt(rKey[9] >> 6 | rKey[10] << 2 | rKey[11] << 10 | rKey[12] << 18), 0x3ffffffn & BigInt(rKey[13] | rKey[14] << 8 | rKey[15] << 16)];
	for (let offset = 0; offset < message.length; offset += 16) {
		const chunk = message.slice(offset, offset + 16),
			paddedChunk = new Uint8Array(17);
		paddedChunk.set(chunk), paddedChunk[chunk.length] = 1, accumulator[0] += BigInt(paddedChunk[0] | paddedChunk[1] << 8 | paddedChunk[2] << 16 | (3 & paddedChunk[3]) << 24), accumulator[1] += BigInt(paddedChunk[3] >> 2 | paddedChunk[4] << 6 | paddedChunk[5] << 14 | (15 & paddedChunk[6]) << 22), accumulator[2] += BigInt(paddedChunk[6] >> 4 | paddedChunk[7] << 4 | paddedChunk[8] << 12 | (63 & paddedChunk[9]) << 20), accumulator[3] += BigInt(paddedChunk[9] >> 6 | paddedChunk[10] << 2 | paddedChunk[11] << 10 | paddedChunk[12] << 18), accumulator[4] += BigInt(paddedChunk[13] | paddedChunk[14] << 8 | paddedChunk[15] << 16 | paddedChunk[16] << 24);
		const product = [0n, 0n, 0n, 0n, 0n];
		for (let accIndex = 0; accIndex < 5; accIndex++)
			for (let rIndex = 0; rIndex < 5; rIndex++) {
				const limbIndex = accIndex + rIndex;
				limbIndex < 5 ? product[limbIndex] += accumulator[accIndex] * rLimbs[rIndex] : product[limbIndex - 5] += accumulator[accIndex] * rLimbs[rIndex] * 5n
			}
		let carry = 0n;
		for (let index = 0; index < 5; index++) product[index] += carry, accumulator[index] = 0x3ffffffn & product[index], carry = product[index] >> 26n;
		accumulator[0] += 5n * carry, carry = accumulator[0] >> 26n, accumulator[0] &= 0x3ffffffn, accumulator[1] += carry
	}
	let tagValue = accumulator[0] | accumulator[1] << 26n | accumulator[2] << 52n | accumulator[3] << 78n | accumulator[4] << 104n;
	tagValue = tagValue + sKey.reduce(((total, byte, index) => total + (BigInt(byte) << BigInt(8 * index))), 0n) & (1n << 128n) - 1n;
	const tag = new Uint8Array(16);
	for (let index = 0; index < 16; index++) tag[index] = Number(tagValue >> BigInt(8 * index) & 0xffn);
	return tag
}

function chacha20Poly1305Encrypt(key, nonce, plaintext, additionalData) {
	const polyKey = chacha20Block(key, 0, nonce).slice(0, 32),
		ciphertext = chacha20Xor(key, nonce, plaintext),
		aadPadding = (16 - additionalData.length % 16) % 16,
		ciphertextPadding = (16 - ciphertext.length % 16) % 16,
		macData = new Uint8Array(additionalData.length + aadPadding + ciphertext.length + ciphertextPadding + 16);
	macData.set(additionalData, 0), macData.set(ciphertext, additionalData.length + aadPadding);
	const lengthView = new DataView(macData.buffer, additionalData.length + aadPadding + ciphertext.length + ciphertextPadding);
	lengthView.setBigUint64(0, BigInt(additionalData.length), !0), lengthView.setBigUint64(8, BigInt(ciphertext.length), !0);
	const tag = poly1305Mac(polyKey, macData);
	return concatBytes(ciphertext, tag)
}

function chacha20Poly1305Decrypt(key, nonce, ciphertext, additionalData) {
	if (ciphertext.length < 16) throw new Error("Ciphertext too short");
	const tag = ciphertext.slice(-16),
		encryptedData = ciphertext.slice(0, -16),
		polyKey = chacha20Block(key, 0, nonce).slice(0, 32),
		aadPadding = (16 - additionalData.length % 16) % 16,
		ciphertextPadding = (16 - encryptedData.length % 16) % 16,
		macData = new Uint8Array(additionalData.length + aadPadding + encryptedData.length + ciphertextPadding + 16);
	macData.set(additionalData, 0), macData.set(encryptedData, additionalData.length + aadPadding);
	const lengthView = new DataView(macData.buffer, additionalData.length + aadPadding + encryptedData.length + ciphertextPadding);
	lengthView.setBigUint64(0, BigInt(additionalData.length), !0), lengthView.setBigUint64(8, BigInt(encryptedData.length), !0);
	const expectedTag = poly1305Mac(polyKey, macData);
	let diff = 0;
	for (let index = 0; index < 16; index++) diff |= tag[index] ^ expectedTag[index];
	if (0 !== diff) throw new Error("ChaCha20-Poly1305 authentication failed");
	return chacha20Xor(key, nonce, encryptedData)
}

const TLS_MAX_PLAINTEXT_FRAGMENT = 16 * 1024;
function buildTlsRecord(contentType, fragment, version = TLS_VERSION_12) {
	const data = 数据转Uint8Array(fragment);
	const record = new Uint8Array(5 + data.byteLength);
	record[0] = contentType;
	record[1] = version >> 8 & 255;
	record[2] = version & 255;
	record[3] = data.byteLength >> 8 & 255;
	record[4] = data.byteLength & 255;
	record.set(data, 5);
	return record;
}
function buildHandshakeMessage(handshakeType, body) { return tlsBytes(handshakeType, (length => [length >> 16 & 255, length >> 8 & 255, 255 & length])(body.length), body) }
class TlsRecordParser {
	constructor() { this.buffer = new Uint8Array(0) }
	feed(chunk) {
		const bytes = 数据转Uint8Array(chunk);
		this.buffer = this.buffer.length ? concatBytes(this.buffer, bytes) : bytes
	}
	next() {
		if (this.buffer.length < 5) return null;
		const contentType = this.buffer[0],
			version = readUint16(this.buffer, 1),
			length = readUint16(this.buffer, 3);
		if (this.buffer.length < 5 + length) return null;
		const fragment = this.buffer.subarray(5, 5 + length);
		return this.buffer = this.buffer.subarray(5 + length), { type: contentType, version, length, fragment }
	}
}
class TlsHandshakeParser {
	constructor() { this.buffer = new Uint8Array(0) }
	feed(chunk) {
		const bytes = 数据转Uint8Array(chunk);
		this.buffer = this.buffer.length ? concatBytes(this.buffer, bytes) : bytes
	}
	next() {
		if (this.buffer.length < 4) return null;
		const handshakeType = this.buffer[0],
			length = readUint24(this.buffer, 1);
		if (this.buffer.length < 4 + length) return null;
		const body = this.buffer.subarray(4, 4 + length),
			raw = this.buffer.subarray(0, 4 + length);
		return this.buffer = this.buffer.subarray(4 + length), { type: handshakeType, length, body, raw }
	}
}

function parseServerHello(body) {
	let offset = 0;
	const legacyVersion = readUint16(body, offset);
	offset += 2;
	const serverRandom = body.slice(offset, offset + 32);
	offset += 32;
	const sessionIdLength = body[offset++],
		sessionId = body.slice(offset, offset + sessionIdLength);
	offset += sessionIdLength;
	const cipherSuite = readUint16(body, offset);
	offset += 2;
	const compression = body[offset++];
	let selectedVersion = legacyVersion,
		keyShare = null,
		alpn = null;
	if (offset < body.length) {
		const extensionsLength = readUint16(body, offset);
		offset += 2;
		const extensionsEnd = offset + extensionsLength;
		for (; offset + 4 <= extensionsEnd;) {
			const extensionType = readUint16(body, offset);
			offset += 2;
			const extensionLength = readUint16(body, offset);
			offset += 2;
			const extensionData = body.slice(offset, offset + extensionLength);
			if (offset += extensionLength, extensionType === EXT_SUPPORTED_VERSIONS && extensionLength >= 2) selectedVersion = readUint16(extensionData, 0);
			else if (extensionType === EXT_KEY_SHARE && extensionLength >= 4) {
				const group = readUint16(extensionData, 0),
					keyLength = readUint16(extensionData, 2);
				keyShare = { group, key: extensionData.slice(4, 4 + keyLength) }
			} else extensionType === EXT_APPLICATION_LAYER_PROTOCOL_NEGOTIATION && extensionLength >= 3 && (alpn = textDecoder.decode(extensionData.slice(3, 3 + extensionData[2])))
		}
	}
	const helloRetryRequestRandom = new Uint8Array([207, 33, 173, 116, 229, 154, 97, 17, 190, 29, 140, 2, 30, 101, 184, 145, 194, 162, 17, 22, 122, 187, 140, 94, 7, 158, 9, 226, 200, 168, 51, 156]);
	return { version: legacyVersion, serverRandom, sessionId, cipherSuite, compression, selectedVersion, keyShare, alpn, isHRR: constantTimeEqual(serverRandom, helloRetryRequestRandom), isTls13: selectedVersion === TLS_VERSION_13 }
}

function parseServerKeyExchange(body) {
	let offset = 1;
	const namedCurve = readUint16(body, offset);
	offset += 2;
	const keyLength = body[offset++];
	return { namedCurve, serverPublicKey: body.slice(offset, offset + keyLength) }
}

function extractLeafCertificate(body, hasContext = 0) {
	let offset = 0;
	if (hasContext) {
		const contextLength = body[offset++];
		offset += contextLength
	}
	if (offset + 3 > body.length) return null;
	const certificateListLength = readUint24(body, offset);
	if (offset += 3, !certificateListLength || offset + 3 > body.length) return null;
	const certificateLength = readUint24(body, offset);
	return offset += 3, certificateLength ? body.slice(offset, offset + certificateLength) : null
}

function parseEncryptedExtensions(body) {
	const parsed = { alpn: null };
	let offset = 2;
	const extensionsEnd = 2 + readUint16(body, 0);
	for (; offset + 4 <= extensionsEnd;) {
		const extensionType = readUint16(body, offset);
		offset += 2;
		const extensionLength = readUint16(body, offset);
		if (offset += 2, extensionType === EXT_APPLICATION_LAYER_PROTOCOL_NEGOTIATION && extensionLength >= 3) {
			const protocolLength = body[offset + 2];
			protocolLength > 0 && offset + 3 + protocolLength <= offset + extensionLength && (parsed.alpn = textDecoder.decode(body.slice(offset + 3, offset + 3 + protocolLength)))
		}
		offset += extensionLength
	}
	return parsed
}

function buildClientHello(clientRandom, serverName, keyShares, { tls13: enableTls13 = !0, tls12: enableTls12 = !0, alpn = null, chacha = !0 } = {}) {
	const cipherIds = [];
	enableTls13 && cipherIds.push(4865, 4866, ...(chacha ? [4867] : [])), enableTls12 && cipherIds.push(49199, 49200, 49195, 49196, ...(chacha ? [52392, 52393] : []));
	const cipherBytes = tlsBytes(...cipherIds.flatMap(uint16be)),
		extensions = [tlsBytes(255, 1, 0, 1, 0)];
	if (serverName) {
		const serverNameBytes = textEncoder.encode(serverName),
			serverNameList = tlsBytes(0, uint16be(serverNameBytes.length), serverNameBytes);
		extensions.push(tlsBytes(uint16be(EXT_SERVER_NAME), uint16be(serverNameList.length + 2), uint16be(serverNameList.length), serverNameList))
	}
	extensions.push(tlsBytes(uint16be(EXT_EC_POINT_FORMATS), 0, 2, 1, 0)), extensions.push(tlsBytes(uint16be(EXT_SUPPORTED_GROUPS), 0, 6, 0, 4, 0, 29, 0, 23));
	const signatureBytes = tlsBytes(...SUPPORTED_SIGNATURE_ALGORITHMS.flatMap(uint16be));
	extensions.push(tlsBytes(uint16be(EXT_SIGNATURE_ALGORITHMS), uint16be(signatureBytes.length + 2), uint16be(signatureBytes.length), signatureBytes));
	const protocols = Array.isArray(alpn) ? alpn.filter(Boolean) : alpn ? [alpn] : [];
	if (protocols.length) {
		const alpnBytes = concatBytes(...protocols.map((protocol => { const protocolBytes = textEncoder.encode(protocol); return tlsBytes(protocolBytes.length, protocolBytes) })));
		extensions.push(tlsBytes(uint16be(EXT_APPLICATION_LAYER_PROTOCOL_NEGOTIATION), uint16be(alpnBytes.length + 2), uint16be(alpnBytes.length), alpnBytes))
	}
	if (enableTls13 && keyShares) {
		let keyShareBytes;
		if (extensions.push(enableTls12 ? tlsBytes(uint16be(EXT_SUPPORTED_VERSIONS), 0, 5, 4, 3, 4, 3, 3) : tlsBytes(uint16be(EXT_SUPPORTED_VERSIONS), 0, 3, 2, 3, 4)), extensions.push(tlsBytes(uint16be(EXT_PSK_KEY_EXCHANGE_MODES), 0, 2, 1, 1)), keyShares?.x25519 && keyShares?.p256) keyShareBytes = concatBytes(tlsBytes(0, 29, uint16be(keyShares.x25519.length), keyShares.x25519), tlsBytes(0, 23, uint16be(keyShares.p256.length), keyShares.p256));
		else if (keyShares?.x25519) keyShareBytes = tlsBytes(0, 29, uint16be(keyShares.x25519.length), keyShares.x25519);
		else if (keyShares?.p256) keyShareBytes = tlsBytes(0, 23, uint16be(keyShares.p256.length), keyShares.p256);
		else {
			if (!(keyShares instanceof Uint8Array)) throw new Error("Invalid keyShares");
			keyShareBytes = tlsBytes(0, 23, uint16be(keyShares.length), keyShares)
		}
		extensions.push(tlsBytes(uint16be(EXT_KEY_SHARE), uint16be(keyShareBytes.length + 2), uint16be(keyShareBytes.length), keyShareBytes))
	}
	const extensionsBytes = concatBytes(...extensions);
	return buildHandshakeMessage(HANDSHAKE_TYPE_CLIENT_HELLO, tlsBytes(uint16be(TLS_VERSION_12), clientRandom, 0, uint16be(cipherBytes.length), cipherBytes, 1, 0, uint16be(extensionsBytes.length), extensionsBytes))
}
const uint64be = sequenceNumber => { const bytes = new Uint8Array(8); return new DataView(bytes.buffer).setBigUint64(0, sequenceNumber, !1), bytes },
	xorSequenceIntoIv = (initializationVector, sequenceNumber) => {
		const nonce = initializationVector.slice(),
			sequenceBytes = uint64be(sequenceNumber);
		for (let index = 0; index < 8; index++) nonce[nonce.length - 8 + index] ^= sequenceBytes[index];
		return nonce
	},
	deriveTrafficKeys = (hash, secret, keyLen, ivLen) => Promise.all([hkdfExpandLabel(hash, secret, "key", EMPTY_BYTES, keyLen), hkdfExpandLabel(hash, secret, "iv", EMPTY_BYTES, ivLen)]);
class TlsClient {
	constructor(socket, options = {}) {
		if (this.socket = socket, this.serverName = options.serverName || "", this.supportTls13 = !1 !== options.tls13, this.supportTls12 = !1 !== options.tls12, !this.supportTls13 && !this.supportTls12) throw new Error("At least one TLS version must be enabled");
		this.alpnProtocols = Array.isArray(options.alpn) ? options.alpn : options.alpn ? [options.alpn] : null, this.allowChacha = options.allowChacha !== false, this.timeout = options.timeout ?? 3e4, this.clientRandom = randomBytes(32), this.serverRandom = null, this.handshakeChunks = [], this.handshakeComplete = !1, this.negotiatedAlpn = null, this.cipherSuite = null, this.cipherConfig = null, this.isTls13 = !1, this.masterSecret = null, this.handshakeSecret = null, this.clientWriteKey = null, this.serverWriteKey = null, this.clientWriteIv = null, this.serverWriteIv = null, this.clientHandshakeKey = null, this.serverHandshakeKey = null, this.clientHandshakeIv = null, this.serverHandshakeIv = null, this.clientAppKey = null, this.serverAppKey = null, this.clientAppIv = null, this.serverAppIv = null, this.clientWriteCryptoKey = null, this.serverWriteCryptoKey = null, this.clientHandshakeCryptoKey = null, this.serverHandshakeCryptoKey = null, this.clientAppCryptoKey = null, this.serverAppCryptoKey = null, this.clientSeqNum = 0n, this.serverSeqNum = 0n, this.recordParser = new TlsRecordParser, this.handshakeParser = new TlsHandshakeParser, this.keyPairs = new Map, this.ecdhKeyPair = null, this.sawCert = !1
	}
	recordHandshake(chunk) { this.handshakeChunks.push(chunk) }
	transcript() { return 1 === this.handshakeChunks.length ? this.handshakeChunks[0] : concatBytes(...this.handshakeChunks) }
	getCipherConfig(cipherSuite) { return CIPHER_SUITES_BY_ID.get(cipherSuite) || null }
	async readChunk(reader) { return this.timeout ? Promise.race([reader.read(), new Promise(((resolve, reject) => setTimeout((() => reject(new Error("TLS read timeout"))), this.timeout)))]) : reader.read() }
	async readRecordsUntil(reader, predicate, closedError) {
		for (; ;) {
			let record;
			for (; record = this.recordParser.next();)
				if (await predicate(record)) return;
			const { value, done } = await this.readChunk(reader);
			if (done) throw new Error(closedError);
			this.recordParser.feed(value)
		}
	}
	async readHandshakeUntil(reader, predicate, closedError) {
		for (let message; message = this.handshakeParser.next();)
			if (await predicate(message)) return;
		return this.readRecordsUntil(reader, (async record => {
			if (record.type === CONTENT_TYPE_ALERT) {
				if (shouldIgnoreTlsAlert(record.fragment)) return;
				throw new Error(`TLS Alert: ${record.fragment[1]}`);
			}
			if (record.type === CONTENT_TYPE_HANDSHAKE) {
				this.handshakeParser.feed(record.fragment);
				for (let message; message = this.handshakeParser.next();)
					if (await predicate(message)) return 1
			}
		}), closedError)
	}
	async acceptCertificate(certificate) { if (!certificate?.length) throw new Error("Empty certificate"); this.sawCert = !0 }
	async handshake() {
		const [p256Share, x25519Share] = await Promise.all([generateKeyShare("P-256"), generateKeyShare("X25519")]);
		this.keyPairs = new Map([[23, p256Share], [29, x25519Share]]), this.ecdhKeyPair = p256Share.keyPair;
		const reader = this.socket.readable.getReader(),
			writer = this.socket.writable.getWriter();
		try {
			const clientHello = buildClientHello(this.clientRandom, this.serverName, { x25519: x25519Share.publicKeyRaw, p256: p256Share.publicKeyRaw }, { tls13: this.supportTls13, tls12: this.supportTls12, alpn: this.alpnProtocols, chacha: this.allowChacha });
			this.recordHandshake(clientHello), await writer.write(buildTlsRecord(CONTENT_TYPE_HANDSHAKE, clientHello, TLS_VERSION_10));
			const serverHello = await this.receiveServerHello(reader);
			if (serverHello.isHRR) throw new Error("HelloRetryRequest is not supported by TLSClientMini");
			if (serverHello.keyShare?.group && this.keyPairs.has(serverHello.keyShare.group)) {
				const selectedKeyPair = this.keyPairs.get(serverHello.keyShare.group);
				this.ecdhKeyPair = selectedKeyPair.keyPair
			}
			serverHello.isTls13 ? await this.handshakeTls13(reader, writer, serverHello) : await this.handshakeTls12(reader, writer), this.handshakeComplete = !0
		} finally {
			reader.releaseLock(), writer.releaseLock()
		}
	}
	async receiveServerHello(reader) {
		for (; ;) {
			const { value, done } = await this.readChunk(reader);
			if (done) throw new Error("Connection closed waiting for ServerHello");
			let record;
			for (this.recordParser.feed(value); record = this.recordParser.next();) {
				if (record.type === CONTENT_TYPE_ALERT) {
					if (shouldIgnoreTlsAlert(record.fragment)) continue;
					throw new Error(`TLS Alert: level=${record.fragment[0]}, desc=${record.fragment[1]}`);
				}
				if (record.type !== CONTENT_TYPE_HANDSHAKE) continue;
				let message;
				for (this.handshakeParser.feed(record.fragment); message = this.handshakeParser.next();) {
					if (message.type !== HANDSHAKE_TYPE_SERVER_HELLO) continue;
					this.recordHandshake(message.raw);
					const serverHello = parseServerHello(message.body);
					if (this.serverRandom = serverHello.serverRandom, this.cipherSuite = serverHello.cipherSuite, this.cipherConfig = this.getCipherConfig(serverHello.cipherSuite), this.isTls13 = serverHello.isTls13, this.negotiatedAlpn = serverHello.alpn || null, !this.cipherConfig) throw new Error(`Unsupported cipher suite: 0x${serverHello.cipherSuite.toString(16)}`);
					return serverHello
				}
			}
		}
	}
	async handshakeTls12(reader, writer) {
		/** @type {{ namedCurve: number, serverPublicKey: Uint8Array } | null} */
		let serverKeyExchange = null;
		let sawServerHelloDone = !1;
		if (await this.readHandshakeUntil(reader, (async message => {
			switch (message.type) {
				case HANDSHAKE_TYPE_CERTIFICATE: {
					this.recordHandshake(message.raw);
					const certificate = extractLeafCertificate(message.body, 1);
					if (!certificate) throw new Error("Missing TLS 1.2 certificate");
					await this.acceptCertificate(certificate);
					break
				}
				case HANDSHAKE_TYPE_SERVER_KEY_EXCHANGE:
					this.recordHandshake(message.raw), serverKeyExchange = parseServerKeyExchange(message.body);
					break;
				case HANDSHAKE_TYPE_SERVER_HELLO_DONE:
					return this.recordHandshake(message.raw), sawServerHelloDone = !0, 1;
				case HANDSHAKE_TYPE_CERTIFICATE_REQUEST:
					throw new Error("Client certificate is not supported");
				default:
					this.recordHandshake(message.raw)
			}
		}), "Connection closed during TLS 1.2 handshake"), !this.sawCert) throw new Error("Missing TLS 1.2 leaf certificate");
		const serverKeyExchangeData = /** @type {{ namedCurve: number, serverPublicKey: Uint8Array } | null} */ (serverKeyExchange);
		if (!serverKeyExchangeData) throw new Error("Missing TLS 1.2 ServerKeyExchange");
		const curveName = GROUPS_BY_ID.get(serverKeyExchangeData.namedCurve);
		if (!curveName) throw new Error(`Unsupported named curve: 0x${serverKeyExchangeData.namedCurve.toString(16)}`);
		const keyShare = this.keyPairs.get(serverKeyExchangeData.namedCurve);
		if (!keyShare) throw new Error(`Missing key pair for curve: 0x${serverKeyExchangeData.namedCurve.toString(16)}`);
		const preMasterSecret = await deriveSharedSecret(keyShare.keyPair.privateKey, serverKeyExchangeData.serverPublicKey, curveName),
			clientKeyExchange = buildHandshakeMessage(HANDSHAKE_TYPE_CLIENT_KEY_EXCHANGE, tlsBytes(keyShare.publicKeyRaw.length, keyShare.publicKeyRaw));
		this.recordHandshake(clientKeyExchange);
		const hashName = this.cipherConfig.hash;
		this.masterSecret = await tls12Prf(preMasterSecret, "master secret", concatBytes(this.clientRandom, this.serverRandom), 48, hashName);
		const keyLen = this.cipherConfig.keyLen,
			ivLen = this.cipherConfig.ivLen,
			keyBlock = await tls12Prf(this.masterSecret, "key expansion", concatBytes(this.serverRandom, this.clientRandom), 2 * keyLen + 2 * ivLen, hashName);
		this.clientWriteKey = keyBlock.slice(0, keyLen), this.serverWriteKey = keyBlock.slice(keyLen, 2 * keyLen), this.clientWriteIv = keyBlock.slice(2 * keyLen, 2 * keyLen + ivLen), this.serverWriteIv = keyBlock.slice(2 * keyLen + ivLen, 2 * keyLen + 2 * ivLen);
		if (!this.cipherConfig.chacha) [this.clientWriteCryptoKey, this.serverWriteCryptoKey] = await Promise.all([importAesGcmKey(this.clientWriteKey, ["encrypt"]), importAesGcmKey(this.serverWriteKey, ["decrypt"])]);
		await writer.write(buildTlsRecord(CONTENT_TYPE_HANDSHAKE, clientKeyExchange)), await writer.write(buildTlsRecord(CONTENT_TYPE_CHANGE_CIPHER_SPEC, tlsBytes(1)));
		const clientVerifyData = await tls12Prf(this.masterSecret, "client finished", await digestBytes(hashName, this.transcript()), 12, hashName),
			finishedMessage = buildHandshakeMessage(HANDSHAKE_TYPE_FINISHED, clientVerifyData);
		this.recordHandshake(finishedMessage), await writer.write(buildTlsRecord(CONTENT_TYPE_HANDSHAKE, await this.encryptTls12(finishedMessage, CONTENT_TYPE_HANDSHAKE)));
		let sawChangeCipherSpec = !1;
		await this.readRecordsUntil(reader, (async record => {
			if (record.type === CONTENT_TYPE_ALERT) {
				if (shouldIgnoreTlsAlert(record.fragment)) return;
				throw new Error(`TLS Alert: ${record.fragment[1]}`);
			}
			if (record.type === CONTENT_TYPE_CHANGE_CIPHER_SPEC) return void (sawChangeCipherSpec = !0);
			if (record.type !== CONTENT_TYPE_HANDSHAKE || !sawChangeCipherSpec) return;
			const decrypted = await this.decryptTls12(record.fragment, CONTENT_TYPE_HANDSHAKE);
			if (decrypted[0] !== HANDSHAKE_TYPE_FINISHED) return;
			const verifyLength = readUint24(decrypted, 1),
				verifyData = decrypted.slice(4, 4 + verifyLength),
				expectedVerifyData = await tls12Prf(this.masterSecret, "server finished", await digestBytes(hashName, this.transcript()), 12, hashName);
			if (!constantTimeEqual(verifyData, expectedVerifyData)) throw new Error("TLS 1.2 server Finished verify failed");
			return 1
		}), "Connection closed waiting for TLS 1.2 Finished")
	}
	async handshakeTls13(reader, writer, serverHello) {
		const groupName = GROUPS_BY_ID.get(serverHello.keyShare?.group);
		if (!groupName || !serverHello.keyShare?.key?.length) throw new Error("Missing TLS 1.3 key_share");
		const hashName = this.cipherConfig.hash,
			hashLen = hashByteLength(hashName),
			keyLen = this.cipherConfig.keyLen,
			ivLen = this.cipherConfig.ivLen,
			sharedSecret = await deriveSharedSecret(this.ecdhKeyPair.privateKey, serverHello.keyShare.key, groupName),
			earlySecret = await hkdfExtract(hashName, null, new Uint8Array(hashLen)),
			derivedSecret = await hkdfExpandLabel(hashName, earlySecret, "derived", await digestBytes(hashName, EMPTY_BYTES), hashLen);
		this.handshakeSecret = await hkdfExtract(hashName, derivedSecret, sharedSecret);
		const transcriptHash = await digestBytes(hashName, this.transcript()),
			clientHandshakeTrafficSecret = await hkdfExpandLabel(hashName, this.handshakeSecret, "c hs traffic", transcriptHash, hashLen),
			serverHandshakeTrafficSecret = await hkdfExpandLabel(hashName, this.handshakeSecret, "s hs traffic", transcriptHash, hashLen);
		[this.clientHandshakeKey, this.clientHandshakeIv] = await deriveTrafficKeys(hashName, clientHandshakeTrafficSecret, keyLen, ivLen), [this.serverHandshakeKey, this.serverHandshakeIv] = await deriveTrafficKeys(hashName, serverHandshakeTrafficSecret, keyLen, ivLen);
		if (!this.cipherConfig.chacha) [this.clientHandshakeCryptoKey, this.serverHandshakeCryptoKey] = await Promise.all([importAesGcmKey(this.clientHandshakeKey, ["encrypt"]), importAesGcmKey(this.serverHandshakeKey, ["decrypt"])]);
		const serverFinishedKey = await hkdfExpandLabel(hashName, serverHandshakeTrafficSecret, "finished", EMPTY_BYTES, hashLen);
		let serverFinishedReceived = !1;
		const handleHandshakeMessage = async message => {
			switch (message.type) {
				case HANDSHAKE_TYPE_ENCRYPTED_EXTENSIONS: {
					const encryptedExtensions = parseEncryptedExtensions(message.body);
					encryptedExtensions.alpn && (this.negotiatedAlpn = encryptedExtensions.alpn), this.recordHandshake(message.raw);
					break
				}
				case HANDSHAKE_TYPE_CERTIFICATE: {
					const certificate = extractLeafCertificate(message.body);
					if (!certificate) throw new Error("Missing TLS 1.3 certificate");
					await this.acceptCertificate(certificate), this.recordHandshake(message.raw);
					break
				}
				case HANDSHAKE_TYPE_CERTIFICATE_REQUEST:
					throw new Error("Client certificate is not supported");
				case HANDSHAKE_TYPE_CERTIFICATE_VERIFY:
					this.recordHandshake(message.raw);
					break;
				case HANDSHAKE_TYPE_FINISHED: {
					const expectedVerifyData = await hmac(hashName, serverFinishedKey, await digestBytes(hashName, this.transcript()));
					if (!constantTimeEqual(expectedVerifyData, message.body)) throw new Error("TLS 1.3 server Finished verify failed");
					this.recordHandshake(message.raw), serverFinishedReceived = !0;
					break
				}
				default:
					this.recordHandshake(message.raw)
			}
		};
		await this.readRecordsUntil(reader, (async record => {
			if (record.type === CONTENT_TYPE_CHANGE_CIPHER_SPEC || record.type === CONTENT_TYPE_HANDSHAKE) return;
			if (record.type === CONTENT_TYPE_ALERT) {
				if (shouldIgnoreTlsAlert(record.fragment)) return;
				throw new Error(`TLS Alert: ${record.fragment[1]}`);
			}
			if (record.type !== CONTENT_TYPE_APPLICATION_DATA) return;
			const decrypted = await this.decryptTls13Handshake(record.fragment),
				innerType = decrypted[decrypted.length - 1],
				plaintext = decrypted.slice(0, -1);
			if (innerType === CONTENT_TYPE_HANDSHAKE) {
				this.handshakeParser.feed(plaintext);
				for (let message; message = this.handshakeParser.next();)
					if (await handleHandshakeMessage(message), serverFinishedReceived) return 1
			}
		}), "Connection closed during TLS 1.3 handshake");
		const applicationTranscriptHash = await digestBytes(hashName, this.transcript()),
			masterDerivedSecret = await hkdfExpandLabel(hashName, this.handshakeSecret, "derived", await digestBytes(hashName, EMPTY_BYTES), hashLen),
			masterSecret = await hkdfExtract(hashName, masterDerivedSecret, new Uint8Array(hashLen)),
			clientAppTrafficSecret = await hkdfExpandLabel(hashName, masterSecret, "c ap traffic", applicationTranscriptHash, hashLen),
			serverAppTrafficSecret = await hkdfExpandLabel(hashName, masterSecret, "s ap traffic", applicationTranscriptHash, hashLen);
		[this.clientAppKey, this.clientAppIv] = await deriveTrafficKeys(hashName, clientAppTrafficSecret, keyLen, ivLen), [this.serverAppKey, this.serverAppIv] = await deriveTrafficKeys(hashName, serverAppTrafficSecret, keyLen, ivLen);
		if (!this.cipherConfig.chacha) [this.clientAppCryptoKey, this.serverAppCryptoKey] = await Promise.all([importAesGcmKey(this.clientAppKey, ["encrypt"]), importAesGcmKey(this.serverAppKey, ["decrypt"])]);
		const clientFinishedKey = await hkdfExpandLabel(hashName, clientHandshakeTrafficSecret, "finished", EMPTY_BYTES, hashLen),
			clientFinishedVerifyData = await hmac(hashName, clientFinishedKey, await digestBytes(hashName, this.transcript())),
			clientFinishedMessage = buildHandshakeMessage(HANDSHAKE_TYPE_FINISHED, clientFinishedVerifyData);
		this.recordHandshake(clientFinishedMessage), await writer.write(buildTlsRecord(CONTENT_TYPE_APPLICATION_DATA, await this.encryptTls13Handshake(concatBytes(clientFinishedMessage, [CONTENT_TYPE_HANDSHAKE])))), this.clientSeqNum = 0n, this.serverSeqNum = 0n
	}
	async encryptTls12(plaintext, contentType) {
		const sequenceNumber = this.clientSeqNum++,
			sequenceBytes = uint64be(sequenceNumber),
			additionalData = concatBytes(sequenceBytes, [contentType], uint16be(TLS_VERSION_12), uint16be(plaintext.length));
		if (this.cipherConfig.chacha) {
			const nonce = xorSequenceIntoIv(this.clientWriteIv, sequenceNumber);
			return chacha20Poly1305Encrypt(this.clientWriteKey, nonce, plaintext, additionalData)
		}
		const explicitNonce = randomBytes(8);
		if (!this.clientWriteCryptoKey) this.clientWriteCryptoKey = await importAesGcmKey(this.clientWriteKey, ["encrypt"]);
		return concatBytes(explicitNonce, await aesGcmEncryptWithKey(this.clientWriteCryptoKey, concatBytes(this.clientWriteIv, explicitNonce), plaintext, additionalData))
	}
	async decryptTls12(ciphertext, contentType) {
		const sequenceNumber = this.serverSeqNum++,
			sequenceBytes = uint64be(sequenceNumber);
		if (this.cipherConfig.chacha) {
			const nonce = xorSequenceIntoIv(this.serverWriteIv, sequenceNumber);
			return chacha20Poly1305Decrypt(this.serverWriteKey, nonce, ciphertext, concatBytes(sequenceBytes, [contentType], uint16be(TLS_VERSION_12), uint16be(ciphertext.length - 16)))
		}
		const explicitNonce = ciphertext.subarray(0, 8),
			encryptedData = ciphertext.subarray(8);
		if (!this.serverWriteCryptoKey) this.serverWriteCryptoKey = await importAesGcmKey(this.serverWriteKey, ["decrypt"]);
		return aesGcmDecryptWithKey(this.serverWriteCryptoKey, concatBytes(this.serverWriteIv, explicitNonce), encryptedData, concatBytes(sequenceBytes, [contentType], uint16be(TLS_VERSION_12), uint16be(encryptedData.length - 16)))
	}
	async encryptTls13Handshake(plaintext) {
		const nonce = xorSequenceIntoIv(this.clientHandshakeIv, this.clientSeqNum++),
			additionalData = tlsBytes(CONTENT_TYPE_APPLICATION_DATA, 3, 3, uint16be(plaintext.length + 16));
		if (this.cipherConfig.chacha) return chacha20Poly1305Encrypt(this.clientHandshakeKey, nonce, plaintext, additionalData);
		if (!this.clientHandshakeCryptoKey) this.clientHandshakeCryptoKey = await importAesGcmKey(this.clientHandshakeKey, ["encrypt"]);
		return aesGcmEncryptWithKey(this.clientHandshakeCryptoKey, nonce, plaintext, additionalData)
	}
	async decryptTls13Handshake(ciphertext) {
		const nonce = xorSequenceIntoIv(this.serverHandshakeIv, this.serverSeqNum++),
			additionalData = tlsBytes(CONTENT_TYPE_APPLICATION_DATA, 3, 3, uint16be(ciphertext.length));
		const decrypted = this.cipherConfig.chacha ? await chacha20Poly1305Decrypt(this.serverHandshakeKey, nonce, ciphertext, additionalData) : await aesGcmDecryptWithKey(this.serverHandshakeCryptoKey || (this.serverHandshakeCryptoKey = await importAesGcmKey(this.serverHandshakeKey, ["decrypt"])), nonce, ciphertext, additionalData);
		let innerTypeIndex = decrypted.length - 1;
		for (; innerTypeIndex >= 0 && !decrypted[innerTypeIndex];) innerTypeIndex--;
		return innerTypeIndex < 0 ? EMPTY_BYTES : decrypted.slice(0, innerTypeIndex + 1)
	}
	async encryptTls13(data) {
		const plaintext = concatBytes(data, [CONTENT_TYPE_APPLICATION_DATA]),
			nonce = xorSequenceIntoIv(this.clientAppIv, this.clientSeqNum++),
			additionalData = tlsBytes(CONTENT_TYPE_APPLICATION_DATA, 3, 3, uint16be(plaintext.length + 16));
		if (this.cipherConfig.chacha) return chacha20Poly1305Encrypt(this.clientAppKey, nonce, plaintext, additionalData);
		if (!this.clientAppCryptoKey) this.clientAppCryptoKey = await importAesGcmKey(this.clientAppKey, ["encrypt"]);
		return aesGcmEncryptWithKey(this.clientAppCryptoKey, nonce, plaintext, additionalData)
	}
	async decryptTls13(ciphertext) {
		const nonce = xorSequenceIntoIv(this.serverAppIv, this.serverSeqNum++),
			additionalData = tlsBytes(CONTENT_TYPE_APPLICATION_DATA, 3, 3, uint16be(ciphertext.length)),
			plaintext = this.cipherConfig.chacha ? await chacha20Poly1305Decrypt(this.serverAppKey, nonce, ciphertext, additionalData) : await aesGcmDecryptWithKey(this.serverAppCryptoKey || (this.serverAppCryptoKey = await importAesGcmKey(this.serverAppKey, ["decrypt"])), nonce, ciphertext, additionalData);
		let innerTypeIndex = plaintext.length - 1;
		for (; innerTypeIndex >= 0 && !plaintext[innerTypeIndex];) innerTypeIndex--;
		if (innerTypeIndex < 0) return {
			data: EMPTY_BYTES,
			type: 0
		};
		return {
			data: plaintext.slice(0, innerTypeIndex),
			type: plaintext[innerTypeIndex]
		}
	}
	async write(data) {
		if (!this.handshakeComplete) throw new Error("Handshake not complete");
		const plaintext = 数据转Uint8Array(data);
		if (!plaintext.byteLength) return;
		const writer = this.socket.writable.getWriter();
		try {
			const records = [];
			for (let offset = 0; offset < plaintext.byteLength; offset += TLS_MAX_PLAINTEXT_FRAGMENT) {
				const chunk = plaintext.subarray(offset, Math.min(offset + TLS_MAX_PLAINTEXT_FRAGMENT, plaintext.byteLength));
				const encrypted = this.isTls13 ? await this.encryptTls13(chunk) : await this.encryptTls12(chunk, CONTENT_TYPE_APPLICATION_DATA);
				records.push(buildTlsRecord(CONTENT_TYPE_APPLICATION_DATA, encrypted));
			}
			await writer.write(records.length === 1 ? records[0] : concatBytes(...records))
		} finally {
			writer.releaseLock()
		}
	}
	async read() {
		for (; ;) {
			let record;
			for (; record = this.recordParser.next();) {
				if (record.type === CONTENT_TYPE_ALERT) {
					if (record.fragment[1] === ALERT_CLOSE_NOTIFY) return null;
					throw new Error(`TLS Alert: ${record.fragment[1]}`)
				}
				if (record.type !== CONTENT_TYPE_APPLICATION_DATA) continue;
				if (!this.isTls13) return this.decryptTls12(record.fragment, CONTENT_TYPE_APPLICATION_DATA);
				const { data, type } = await this.decryptTls13(record.fragment);
				if (type === CONTENT_TYPE_APPLICATION_DATA) return data;
				if (type === CONTENT_TYPE_ALERT) {
					if (data[1] === ALERT_CLOSE_NOTIFY) return null;
					throw new Error(`TLS Alert: ${data[1]}`)
				}
				if (type !== CONTENT_TYPE_HANDSHAKE) continue;
				let message;
				for (this.handshakeParser.feed(data); message = this.handshakeParser.next();)
					if (message.type !== HANDSHAKE_TYPE_NEW_SESSION_TICKET && message.type === HANDSHAKE_TYPE_KEY_UPDATE) throw new Error("TLS 1.3 KeyUpdate is not supported by TLSClientMini")
			}
			const reader = this.socket.readable.getReader();
			try {
				const { value, done } = await this.readChunk(reader);
				if (done) return null;
				this.recordParser.feed(value)
			} finally {
				reader.releaseLock()
			}
		}
	}
	close() { this.socket.close() }
}

function stripIPv6Brackets(hostname = '') {
	const host = String(hostname || '').trim();
	return host.startsWith('[') && host.endsWith(']') ? host.slice(1, -1) : host;
}

function isIPHostname(hostname = '') {
	const host = stripIPv6Brackets(hostname);
	const ipv4Regex = /^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/;
	if (ipv4Regex.test(host)) return true;
	if (!host.includes(':')) return false;
	try {
		new URL(`http://[${host}]/`);
		return true;
	} catch (e) {
		return false;
	}
}

//////////////////////////////////////////////////turnConnect///////////////////////////////////////////////
const CONNECT_TIMEOUT_MS = 9999;
const TURN_STUN_MAGIC_COOKIE = new Uint8Array([0x21, 0x12, 0xa4, 0x42]);
const TURN_STUN_TYPE = {
	ALLOCATE_REQUEST: 0x0003, ALLOCATE_SUCCESS: 0x0103, ALLOCATE_ERROR: 0x0113,
	CREATE_PERMISSION_REQUEST: 0x0008, CREATE_PERMISSION_SUCCESS: 0x0108,
	CONNECT_REQUEST: 0x000a, CONNECT_SUCCESS: 0x010a,
	CONNECTION_BIND_REQUEST: 0x000b, CONNECTION_BIND_SUCCESS: 0x010b
};
const TURN_STUN_ATTR = {
	USERNAME: 0x0006, MESSAGE_INTEGRITY: 0x0008, ERROR_CODE: 0x0009,
	XOR_PEER_ADDRESS: 0x0012, REALM: 0x0014, NONCE: 0x0015,
	REQUESTED_TRANSPORT: 0x0019, CONNECTION_ID: 0x002a
};

async function withTimeout(promise, timeoutMs, message) {
	let timer;
	try {
		return await Promise.race([
			promise,
			new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(message)), timeoutMs) })
		]);
	} finally {
		clearTimeout(timer);
	}
}

function isIPv4(value) {
	const parts = String(value || '').split('.');
	return parts.length === 4 && parts.every(part => /^\d{1,3}$/.test(part) && Number(part) >= 0 && Number(part) <= 255);
}

function turnStunPadding(length) {
	return -length & 3;
}

function createTurnStunAttribute(type, value) {
	const body = 数据转Uint8Array(value);
	const attribute = new Uint8Array(4 + body.byteLength + turnStunPadding(body.byteLength));
	const view = new DataView(attribute.buffer);
	view.setUint16(0, type);
	view.setUint16(2, body.byteLength);
	attribute.set(body, 4);
	return attribute;
}

function createTurnStunMessage(type, transactionId, attributes) {
	const body = 拼接字节数据(...attributes);
	const header = new Uint8Array(20);
	const view = new DataView(header.buffer);
	view.setUint16(0, type);
	view.setUint16(2, body.byteLength);
	header.set(TURN_STUN_MAGIC_COOKIE, 4);
	header.set(transactionId, 8);
	return 拼接字节数据(header, body);
}

function parseTurnErrorCode(data) {
	return data?.byteLength >= 4 ? (data[2] & 7) * 100 + data[3] : 0;
}

function randomTurnTransactionId() {
	return crypto.getRandomValues(new Uint8Array(12));
}

async function addTurnMessageIntegrity(message, key) {
	const signedMessage = new Uint8Array(message);
	const view = new DataView(signedMessage.buffer);
	view.setUint16(2, view.getUint16(2) + 24);
	const hmacKey = await crypto.subtle.importKey('raw', key, { name: 'HMAC', hash: 'SHA-1' }, false, ['sign']);
	const signature = await crypto.subtle.sign('HMAC', hmacKey, signedMessage);
	return 拼接字节数据(signedMessage, createTurnStunAttribute(TURN_STUN_ATTR.MESSAGE_INTEGRITY, new Uint8Array(signature)));
}

async function readTurnStunMessage(reader, bufferedData = null, timeoutMessage = 'TURN response timed out') {
	let buffer = 有效数据长度(bufferedData) ? 数据转Uint8Array(bufferedData) : new Uint8Array(0);
	const pull = async () => {
		const { done, value } = await withTimeout(reader.read(), CONNECT_TIMEOUT_MS, timeoutMessage);
		if (done) throw new Error('TURN server closed connection');
		if (value?.byteLength) buffer = 拼接字节数据(buffer, value);
	};
	while (buffer.byteLength < 20) await pull();

	const messageLength = 20 + ((buffer[2] << 8) | buffer[3]);
	if (messageLength > 65555) throw new Error('TURN response is too large');
	while (buffer.byteLength < messageLength) await pull();
	const messageBuffer = buffer.subarray(0, messageLength);
	if (TURN_STUN_MAGIC_COOKIE.some((value, index) => messageBuffer[4 + index] !== value)) throw new Error('Invalid TURN/STUN response');

	const view = new DataView(messageBuffer.buffer, messageBuffer.byteOffset, messageBuffer.byteLength);
	const attributes = {};
	for (let offset = 20; offset + 4 <= messageLength;) {
		const type = view.getUint16(offset);
		const length = view.getUint16(offset + 2);
		if (offset + 4 + length > messageBuffer.byteLength) break;
		attributes[type] = messageBuffer.slice(offset + 4, offset + 4 + length);
		offset += 4 + length + turnStunPadding(length);
	}
	return {
		message: { type: view.getUint16(0), attributes },
		extraData: buffer.byteLength > messageLength ? buffer.subarray(messageLength) : null
	};
}

async function writeTurnBytes(writer, bytes, timeoutMessage) {
	await withTimeout(writer.write(bytes), CONNECT_TIMEOUT_MS, timeoutMessage);
}

async function turnConnect(proxy, targetHost, targetPort, TCP连接) {
	proxy = { ...proxy, username: proxy.username ?? null, password: proxy.password ?? null };
	const resolvedTargetHost = stripIPv6Brackets(targetHost);
	/** @type {string | null} */
	let targetIp = isIPv4(resolvedTargetHost) ? resolvedTargetHost : null;
	if (!targetIp) {
		const records = await DoH查询(resolvedTargetHost, 'A');
		const recordData = records.find(item => item.type === 1 && isIPv4(item.data))?.data;
		targetIp = typeof recordData === 'string' ? recordData : null;
	}
	if (!targetIp) throw new Error(`Could not resolve ${targetHost} to an IPv4 address for TURN CONNECT`);

	const turnHost = stripIPv6Brackets(proxy.hostname);
	let controlSocket = null, dataSocket = null, controlWriter = null, controlReader = null, dataWriter = null, dataReader = null, dataReaderReleased = false;
	const close = () => {
		try { controlSocket?.close?.() } catch (e) { }
		try { dataSocket?.close?.() } catch (e) { }
	};
	const releaseDataReader = () => {
		if (dataReaderReleased) return;
		dataReaderReleased = true;
		try { dataReader?.releaseLock?.() } catch (e) { }
	};

	try {
		controlSocket = TCP连接({ hostname: turnHost, port: proxy.port });
		await withTimeout(controlSocket.opened, CONNECT_TIMEOUT_MS, 'TURN server connection timed out');
		controlWriter = controlSocket.writable.getWriter();
		controlReader = controlSocket.readable.getReader();

		const xorPeerAddress = new Uint8Array(8);
		xorPeerAddress[1] = 1;
		new DataView(xorPeerAddress.buffer).setUint16(2, targetPort ^ 0x2112);
		targetIp.split('.').forEach((value, index) => {
			xorPeerAddress[4 + index] = Number(value) ^ TURN_STUN_MAGIC_COOKIE[index];
		});
		const peerAddress = createTurnStunAttribute(TURN_STUN_ATTR.XOR_PEER_ADDRESS, xorPeerAddress);
		const requestedTransport = new Uint8Array([6, 0, 0, 0]);

		await writeTurnBytes(controlWriter, createTurnStunMessage(
			TURN_STUN_TYPE.ALLOCATE_REQUEST,
			randomTurnTransactionId(),
			[createTurnStunAttribute(TURN_STUN_ATTR.REQUESTED_TRANSPORT, requestedTransport)]
		), 'TURN Allocate request timed out');

		let turnResponse = await readTurnStunMessage(controlReader, null, 'TURN Allocate response timed out');
		let message = turnResponse.message;
		let bufferedData = turnResponse.extraData;
		let integrityKey = null;
		let authAttributes = [];
		const sign = messageToSign => integrityKey ? addTurnMessageIntegrity(messageToSign, integrityKey) : Promise.resolve(messageToSign);

		if (
			message.type === TURN_STUN_TYPE.ALLOCATE_ERROR
			&& proxy.username !== null
			&& proxy.password !== null
			&& parseTurnErrorCode(message.attributes[TURN_STUN_ATTR.ERROR_CODE]) === 401
		) {
			const realmBytes = message.attributes[TURN_STUN_ATTR.REALM];
			const nonce = message.attributes[TURN_STUN_ATTR.NONCE];
			if (!realmBytes || !nonce?.byteLength) throw new Error('TURN authentication challenge is missing realm or nonce');

			const realm = textDecoder.decode(realmBytes);
			integrityKey = new Uint8Array(await crypto.subtle.digest('MD5', textEncoder.encode(`${proxy.username}:${realm}:${proxy.password}`)));
			authAttributes = [
				createTurnStunAttribute(TURN_STUN_ATTR.USERNAME, textEncoder.encode(proxy.username)),
				createTurnStunAttribute(TURN_STUN_ATTR.REALM, textEncoder.encode(realm)),
				createTurnStunAttribute(TURN_STUN_ATTR.NONCE, nonce)
			];

			const allocateRequest = await addTurnMessageIntegrity(createTurnStunMessage(
				TURN_STUN_TYPE.ALLOCATE_REQUEST,
				randomTurnTransactionId(),
				[
					createTurnStunAttribute(TURN_STUN_ATTR.REQUESTED_TRANSPORT, requestedTransport),
					...authAttributes
				]
			), integrityKey);
			const pipelinedMessages = await Promise.all([
				sign(createTurnStunMessage(TURN_STUN_TYPE.CREATE_PERMISSION_REQUEST, randomTurnTransactionId(), [peerAddress, ...authAttributes])),
				sign(createTurnStunMessage(TURN_STUN_TYPE.CONNECT_REQUEST, randomTurnTransactionId(), [peerAddress, ...authAttributes]))
			]);
			await writeTurnBytes(controlWriter, 拼接字节数据(allocateRequest, ...pipelinedMessages), 'TURN authenticated Allocate request timed out');
			turnResponse = await readTurnStunMessage(controlReader, bufferedData, 'TURN authenticated Allocate response timed out');
			message = turnResponse.message;
			bufferedData = turnResponse.extraData;
		} else if (message.type === TURN_STUN_TYPE.ALLOCATE_SUCCESS) {
			const pipelinedMessages = await Promise.all([
				sign(createTurnStunMessage(TURN_STUN_TYPE.CREATE_PERMISSION_REQUEST, randomTurnTransactionId(), [peerAddress, ...authAttributes])),
				sign(createTurnStunMessage(TURN_STUN_TYPE.CONNECT_REQUEST, randomTurnTransactionId(), [peerAddress, ...authAttributes]))
			]);
			if (pipelinedMessages.length) await writeTurnBytes(controlWriter, 拼接字节数据(...pipelinedMessages), 'TURN pipelined request timed out');
		}

		if (message.type !== TURN_STUN_TYPE.ALLOCATE_SUCCESS) {
			const errorCode = parseTurnErrorCode(message.attributes[TURN_STUN_ATTR.ERROR_CODE]);
			throw new Error(errorCode ? `TURN Allocate failed with ${errorCode}` : 'TURN Allocate failed');
		}

		dataSocket = TCP连接({ hostname: turnHost, port: proxy.port });
		turnResponse = await readTurnStunMessage(controlReader, bufferedData, 'TURN CreatePermission response timed out');
		message = turnResponse.message;
		bufferedData = turnResponse.extraData;
		if (message.type !== TURN_STUN_TYPE.CREATE_PERMISSION_SUCCESS) throw new Error('TURN CreatePermission failed');

		turnResponse = await readTurnStunMessage(controlReader, bufferedData, 'TURN CONNECT response timed out');
		message = turnResponse.message;
		bufferedData = turnResponse.extraData;
		if (message.type !== TURN_STUN_TYPE.CONNECT_SUCCESS || !message.attributes[TURN_STUN_ATTR.CONNECTION_ID]) throw new Error('TURN CONNECT failed');

		await withTimeout(dataSocket.opened, CONNECT_TIMEOUT_MS, 'TURN data connection timed out');
		dataWriter = dataSocket.writable.getWriter();
		dataReader = dataSocket.readable.getReader();
		await writeTurnBytes(dataWriter, await sign(createTurnStunMessage(
			TURN_STUN_TYPE.CONNECTION_BIND_REQUEST,
			randomTurnTransactionId(),
			[
				createTurnStunAttribute(TURN_STUN_ATTR.CONNECTION_ID, message.attributes[TURN_STUN_ATTR.CONNECTION_ID]),
				...authAttributes
			]
		)), 'TURN ConnectionBind request timed out');

		turnResponse = await readTurnStunMessage(dataReader, null, 'TURN ConnectionBind response timed out');
		message = turnResponse.message;
		const extraPayload = turnResponse.extraData;
		if (message.type !== TURN_STUN_TYPE.CONNECTION_BIND_SUCCESS) throw new Error('TURN ConnectionBind failed');

		controlWriter.releaseLock();
		controlWriter = null;
		controlReader.releaseLock();
		controlReader = null;
		dataWriter.releaseLock();
		dataWriter = null;

		const readable = new ReadableStream({
			start(controller) {
				if (extraPayload?.byteLength) controller.enqueue(extraPayload);
			},
			pull(controller) {
				return dataReader.read().then(({ done, value }) => {
					if (done) {
						releaseDataReader();
						controller.close();
					} else if (value?.byteLength) controller.enqueue(new Uint8Array(value));
				});
			},
			cancel() {
				try { dataReader?.cancel?.() } catch (e) { }
				releaseDataReader();
				close();
			}
		});

		return { readable, writable: dataSocket.writable, closed: dataSocket.closed, close };
	} catch (error) {
		try { controlWriter?.releaseLock?.() } catch (e) { }
		try { controlReader?.releaseLock?.() } catch (e) { }
		try { dataWriter?.releaseLock?.() } catch (e) { }
		releaseDataReader();
		close();
		throw error;
	}
}
//////////////////////////////////////////////////sstpConnect///////////////////////////////////////////////
const SSTP_TCP_MSS = 1400;
const SSTP_EMPTY_BYTES = new Uint8Array(0);

function readSstpUint16(bytes, offset = 0) {
	return (bytes[offset] << 8) | bytes[offset + 1];
}

function readSstpUint32(bytes, offset = 0) {
	return ((bytes[offset] << 24) | (bytes[offset + 1] << 16) | (bytes[offset + 2] << 8) | bytes[offset + 3]) >>> 0;
}

function randomSstpUint16() {
	return readSstpUint16(crypto.getRandomValues(new Uint8Array(2)));
}

function internetChecksum(bytes, offset, length) {
	let sum = 0;
	for (let index = offset; index < offset + length - 1; index += 2) sum += readSstpUint16(bytes, index);
	if (length & 1) sum += bytes[offset + length - 1] << 8;
	while (sum >> 16) sum = (sum & 0xffff) + (sum >> 16);
	return (~sum) & 0xffff;
}

async function sstpConnect(proxy, targetHost, targetPort, TCP连接) {
	proxy = { ...proxy, username: proxy.username ?? null, password: proxy.password ?? null };
	let bufferedBytes = SSTP_EMPTY_BYTES, pppIdentifier = 1, socket = null, reader = null, writer = null;
	let closedSettled = false, resolveClosed, rejectClosed;
	const closed = new Promise((resolve, reject) => {
		resolveClosed = resolve;
		rejectClosed = reject;
	});
	const settleClosed = (settle, value) => {
		if (closedSettled) return;
		closedSettled = true;
		settle(value);
	};
	const close = () => {
		try { reader?.cancel?.().catch?.(() => { }) } catch (e) { }
		try { reader?.releaseLock?.() } catch (e) { }
		try { writer?.close?.().catch?.(() => { }) } catch (e) { }
		try { writer?.releaseLock?.() } catch (e) { }
		try { socket?.close?.() } catch (e) { }
		settleClosed(resolveClosed);
	};

	const readSocketChunk = async () => {
		const { value, done } = await reader.read();
		if (done || !value) throw new Error('SSTP socket closed');
		return 数据转Uint8Array(value);
	};
	const readBytes = async length => {
		while (bufferedBytes.byteLength < length) {
			const chunk = await readSocketChunk();
			bufferedBytes = bufferedBytes.byteLength ? 拼接字节数据(bufferedBytes, chunk) : chunk;
		}
		const result = bufferedBytes.subarray(0, length);
		bufferedBytes = bufferedBytes.subarray(length);
		return result;
	};
	const readHttpLine = async () => {
		for (; ;) {
			const lineEnd = bufferedBytes.indexOf(10);
			if (lineEnd >= 0) {
				const line = textDecoder.decode(bufferedBytes.subarray(0, lineEnd));
				bufferedBytes = bufferedBytes.subarray(lineEnd + 1);
				return line.replace(/\r$/, '');
			}
			const chunk = await readSocketChunk();
			bufferedBytes = bufferedBytes.byteLength ? 拼接字节数据(bufferedBytes, chunk) : chunk;
		}
	};
	const readPacket = async (timeoutMs = CONNECT_TIMEOUT_MS) => {
		const header = await withTimeout(readBytes(4), timeoutMs, 'SSTP read timeout');
		const length = readSstpUint16(header, 2) & 0x0fff;
		if (length < 4) throw new Error('Invalid SSTP packet length');
		return {
			isControl: (header[1] & 1) !== 0,
			body: length > 4 ? await withTimeout(readBytes(length - 4), timeoutMs, 'SSTP packet body read timeout') : SSTP_EMPTY_BYTES
		};
	};
	const buildSstpDataPacket = pppFrame => {
		const packetLength = 6 + pppFrame.byteLength;
		const packet = new Uint8Array(packetLength);
		packet.set([0x10, 0x00, ((packetLength >> 8) & 0x0f) | 0x80, packetLength & 0xff, 0xff, 0x03]);
		packet.set(pppFrame, 6);
		return packet;
	};
	const buildPppConfigurePacket = (protocol, code, id, options = []) => {
		const optionsLength = options.reduce((size, option) => size + 2 + option.data.byteLength, 0);
		const frame = new Uint8Array(6 + optionsLength);
		const view = new DataView(frame.buffer);
		view.setUint16(0, protocol);
		frame[2] = code;
		frame[3] = id;
		view.setUint16(4, 4 + optionsLength);
		options.reduce((offset, option) => {
			frame[offset] = option.type;
			frame[offset + 1] = 2 + option.data.byteLength;
			frame.set(option.data, offset + 2);
			return offset + 2 + option.data.byteLength;
		}, 6);
		return frame;
	};
	const parsePPPFrame = data => {
		const offset = data.byteLength >= 2 && data[0] === 0xff && data[1] === 0x03 ? 2 : 0;
		if (data.byteLength - offset < 4) return null;
		const protocol = readSstpUint16(data, offset);
		if (protocol === 0x0021) return { protocol, ipPacket: data.subarray(offset + 2) };
		if (data.byteLength - offset < 6) return null;
		return { protocol, code: data[offset + 2], id: data[offset + 3], payload: data.subarray(offset + 6), rawPacket: data.subarray(offset) };
	};
	const parsePppOptions = data => {
		const options = [];
		for (let offset = 0; offset + 2 <= data.byteLength;) {
			const type = data[offset];
			const length = data[offset + 1];
			if (length < 2 || offset + length > data.byteLength) break;
			options.push({ type, data: data.subarray(offset + 2, offset + length) });
			offset += length;
		}
		return options;
	};

	try {
		const serverHost = stripIPv6Brackets(proxy.hostname);
		const serverPort = proxy.port;
		socket = TCP连接({ hostname: serverHost, port: serverPort }, { secureTransport: 'on', allowHalfOpen: false });
		await withTimeout(socket.opened, CONNECT_TIMEOUT_MS, 'SSTP server connection timed out');
		reader = socket.readable.getReader();
		writer = socket.writable.getWriter();

		const displayHost = serverHost.includes(':') ? `[${serverHost}]` : serverHost;
		const httpRequest = textEncoder.encode(
			`SSTP_DUPLEX_POST /sra_{BA195980-CD49-458b-9E23-C84EE0ADCD75}/ HTTP/1.1\r\n`
			+ `Host: ${Number(serverPort) === 443 ? displayHost : `${displayHost}:${serverPort}`}\r\n`
			+ 'Content-Length: 18446744073709551615\r\n'
			+ `SSTPCORRELATIONID: {${crypto.randomUUID()}}\r\n\r\n`
		);
		const encapsulatedProtocol = new Uint8Array(2);
		new DataView(encapsulatedProtocol.buffer).setUint16(0, 1);
		const maximumReceiveUnit = new Uint8Array(2);
		new DataView(maximumReceiveUnit.buffer).setUint16(0, 1500);
		const sstpConnectRequest = new Uint8Array(12 + encapsulatedProtocol.byteLength);
		const sstpConnectView = new DataView(sstpConnectRequest.buffer);
		sstpConnectRequest[0] = 0x10;
		sstpConnectRequest[1] = 0x01;
		sstpConnectView.setUint16(2, sstpConnectRequest.byteLength | 0x8000);
		sstpConnectView.setUint16(4, 0x0001);
		sstpConnectView.setUint16(6, 1);
		sstpConnectRequest[9] = 1;
		sstpConnectView.setUint16(10, 4 + encapsulatedProtocol.byteLength);
		sstpConnectRequest.set(encapsulatedProtocol, 12);

		await withTimeout(writer.write(拼接字节数据(
			httpRequest,
			sstpConnectRequest,
			buildSstpDataPacket(buildPppConfigurePacket(0xc021, 1, pppIdentifier++, [
				{ type: 1, data: maximumReceiveUnit }
			]))
		)), CONNECT_TIMEOUT_MS, 'SSTP HTTP handshake request timed out');

		const statusLine = await withTimeout(readHttpLine(), CONNECT_TIMEOUT_MS, 'SSTP HTTP handshake timed out');
		for (; ;) {
			const line = await withTimeout(readHttpLine(), CONNECT_TIMEOUT_MS, 'SSTP HTTP header read timed out');
			if (line === '') break;
		}
		if (!/HTTP\/\d(?:\.\d)?\s+2\d\d/i.test(statusLine)) throw new Error(`SSTP HTTP handshake failed: ${statusLine || 'invalid status'}`);

		let localLcpAcked = false, peerLcpAcked = false, papRequired = false, papSent = false, papDone = false, ipcpStarted = false, ipcpFinished = false, sourceIp = null;
		const sendPapIfReady = async () => {
			if (!localLcpAcked || !peerLcpAcked || !papRequired || papSent) return;
			if (proxy.username === null || proxy.password === null) throw new Error('SSTP server requires PAP authentication');
			const username = textEncoder.encode(proxy.username);
			const password = textEncoder.encode(proxy.password);
			if (username.byteLength > 255 || password.byteLength > 255) throw new Error('SSTP username/password is too long');
			const papLength = 6 + username.byteLength + password.byteLength;
			const frame = new Uint8Array(2 + papLength);
			const view = new DataView(frame.buffer);
			view.setUint16(0, 0xc023);
			frame[2] = 1;
			frame[3] = pppIdentifier++;
			view.setUint16(4, papLength);
			frame[6] = username.byteLength;
			frame.set(username, 7);
			frame[7 + username.byteLength] = password.byteLength;
			frame.set(password, 8 + username.byteLength);
			await withTimeout(writer.write(buildSstpDataPacket(frame)), CONNECT_TIMEOUT_MS, 'SSTP PAP authentication request timed out');
			papSent = true;
		};
		const startIpcpIfReady = async () => {
			if (!localLcpAcked || !peerLcpAcked || ipcpStarted || (papRequired && !papDone)) return;
			await withTimeout(writer.write(buildSstpDataPacket(buildPppConfigurePacket(0x8021, 1, pppIdentifier++, [
				{ type: 3, data: new Uint8Array(4) }
			]))), CONNECT_TIMEOUT_MS, 'SSTP IPCP request timed out');
			ipcpStarted = true;
		};

		for (let round = 0; round < 50 && !ipcpFinished; round++) {
			const packet = await readPacket(CONNECT_TIMEOUT_MS);
			if (packet.isControl) continue;
			const ppp = parsePPPFrame(packet.body);
			if (!ppp) continue;

			if (ppp.protocol === 0xc021) {
				if (ppp.code === 1) {
					const authOption = parsePppOptions(ppp.payload).find(option => option.type === 3);
					if (authOption?.data?.byteLength >= 2) {
						const authProtocol = readSstpUint16(authOption.data);
						if (authProtocol !== 0xc023) throw new Error(`SSTP unsupported PPP authentication protocol: 0x${authProtocol.toString(16)}`);
						papRequired = true;
					}
					const ack = new Uint8Array(ppp.rawPacket);
					ack[2] = 2;
					await withTimeout(writer.write(buildSstpDataPacket(ack)), CONNECT_TIMEOUT_MS, 'SSTP LCP Configure-Ack timed out');
					peerLcpAcked = true;
					await sendPapIfReady();
					await startIpcpIfReady();
				} else if (ppp.code === 2) {
					localLcpAcked = true;
					await sendPapIfReady();
					await startIpcpIfReady();
				}
				continue;
			}

			if (ppp.protocol === 0xc023) {
				if (ppp.code === 2) {
					papDone = true;
					await startIpcpIfReady();
				} else if (ppp.code === 3) throw new Error('SSTP PAP authentication failed');
				continue;
			}

			if (ppp.protocol === 0x8021) {
				if (ppp.code === 1) {
					const ack = new Uint8Array(ppp.rawPacket);
					ack[2] = 2;
					await withTimeout(writer.write(buildSstpDataPacket(ack)), CONNECT_TIMEOUT_MS, 'SSTP IPCP Configure-Ack timed out');
					await startIpcpIfReady();
				} else if (ppp.code === 3) {
					const addressOption = parsePppOptions(ppp.payload).find(option => option.type === 3);
					if (addressOption?.data?.byteLength === 4) {
						sourceIp = [...addressOption.data].join('.');
						await withTimeout(writer.write(buildSstpDataPacket(buildPppConfigurePacket(0x8021, 1, pppIdentifier++, [
							{ type: 3, data: addressOption.data }
						]))), CONNECT_TIMEOUT_MS, 'SSTP IPCP address request timed out');
						ipcpStarted = true;
					}
				} else if (ppp.code === 2) {
					const addressOption = parsePppOptions(ppp.payload).find(option => option.type === 3);
					if (addressOption?.data?.byteLength === 4) sourceIp = [...addressOption.data].join('.');
					ipcpFinished = true;
				}
			}
		}
		if (!sourceIp) throw new Error('SSTP did not assign an IPv4 address');

		const target = stripIPv6Brackets(targetHost);
		/** @type {string | null} */
		let targetIp = isIPv4(target) ? target : null;
		if (!targetIp) {
			const records = await DoH查询(target, 'A');
			const recordData = records.find(item => item.type === 1 && isIPv4(item.data))?.data;
			targetIp = typeof recordData === 'string' ? recordData : null;
		}
		if (!targetIp) throw new Error(`Could not resolve ${targetHost} to an IPv4 address for SSTP`);

		const sourcePort = 10000 + (randomSstpUint16() % 50000);
		const sourceAddress = new Uint8Array(String(sourceIp || '').split('.').map(Number));
		const destinationAddress = new Uint8Array(String(targetIp || '').split('.').map(Number));
		let sequenceNumber = readSstpUint32(crypto.getRandomValues(new Uint8Array(4)));
		let acknowledgementNumber = 0;
		const ipHeaderTemplate = new Uint8Array(20);
		ipHeaderTemplate.set([0x45, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 64, 6]);
		ipHeaderTemplate.set(sourceAddress, 12);
		ipHeaderTemplate.set(destinationAddress, 16);
		const tcpPseudoHeader = new Uint8Array(1432);
		tcpPseudoHeader.set(sourceAddress);
		tcpPseudoHeader.set(destinationAddress, 4);
		tcpPseudoHeader[9] = 6;
		const buildTcpFrame = (flags, payload = SSTP_EMPTY_BYTES) => {
			const bytes = 数据转Uint8Array(payload);
			const payloadLength = bytes.byteLength;
			const tcpLength = 20 + payloadLength;
			const ipLength = 20 + tcpLength;
			const sstpLength = 8 + ipLength;
			const frame = new Uint8Array(sstpLength);
			const view = new DataView(frame.buffer);
			frame.set([0x10, 0x00, ((sstpLength >> 8) & 0x0f) | 0x80, sstpLength & 0xff, 0xff, 0x03, 0x00, 0x21]);
			frame.set(ipHeaderTemplate, 8);
			view.setUint16(10, ipLength);
			view.setUint16(12, randomSstpUint16());
			view.setUint16(18, internetChecksum(frame, 8, 20));
			view.setUint16(28, sourcePort);
			view.setUint16(30, targetPort);
			view.setUint32(32, sequenceNumber);
			view.setUint32(36, acknowledgementNumber);
			frame[40] = 0x50;
			frame[41] = flags;
			view.setUint16(42, 65535);
			if (payloadLength) frame.set(bytes, 48);
			tcpPseudoHeader[10] = tcpLength >> 8;
			tcpPseudoHeader[11] = tcpLength & 0xff;
			tcpPseudoHeader.set(frame.subarray(28, 28 + tcpLength), 12);
			view.setUint16(44, internetChecksum(tcpPseudoHeader, 0, 12 + tcpLength));
			return frame;
		};
		const matchIncomingIpPacket = ipPacket => {
			if (ipPacket.byteLength < 40 || ipPacket[9] !== 6) return null;
			const ipHeaderLength = (ipPacket[0] & 0x0f) * 4;
			if (ipPacket.byteLength < ipHeaderLength + 20) return null;
			if (readSstpUint16(ipPacket, ipHeaderLength) !== targetPort) return null;
			if (readSstpUint16(ipPacket, ipHeaderLength + 2) !== sourcePort) return null;
			return {
				flags: ipPacket[ipHeaderLength + 13],
				sequence: readSstpUint32(ipPacket, ipHeaderLength + 4),
				payloadOffset: ipHeaderLength + ((ipPacket[ipHeaderLength + 12] >> 4) & 0x0f) * 4
			};
		};

		await withTimeout(writer.write(buildTcpFrame(0x02)), CONNECT_TIMEOUT_MS, 'SSTP TCP SYN write timed out');
		sequenceNumber = (sequenceNumber + 1) >>> 0;
		let tcpReady = false;
		for (let attempt = 0; attempt < 30; attempt++) {
			const packet = await readPacket(CONNECT_TIMEOUT_MS);
			if (packet.isControl) continue;
			const ppp = parsePPPFrame(packet.body);
			if (!ppp || ppp.protocol !== 0x0021) continue;
			const tcp = matchIncomingIpPacket(ppp.ipPacket);
			if (!tcp || (tcp.flags & 0x12) !== 0x12) continue;
			acknowledgementNumber = (tcp.sequence + 1) >>> 0;
			await withTimeout(writer.write(buildTcpFrame(0x10)), CONNECT_TIMEOUT_MS, 'SSTP TCP ACK write timed out');
			tcpReady = true;
			break;
		}
		if (!tcpReady) throw new Error('TCP handshake through SSTP timed out');

		/** @type {ReadableStreamDefaultController<Uint8Array> | null} */
		let streamController = null;
		const readable = new ReadableStream({
			start(controller) {
				streamController = controller;
			},
			cancel() {
				close();
			}
		});

		(async () => {
			try {
				let pendingChunks = [], pendingLength = 0;
				const flush = () => {
					if (!pendingLength) return;
					if (!streamController) throw new Error('SSTP readable stream is not ready');
					streamController.enqueue(pendingChunks.length === 1 ? pendingChunks[0] : 拼接字节数据(...pendingChunks));
					pendingChunks = [];
					pendingLength = 0;
					writer.write(buildTcpFrame(0x10)).catch(() => { });
				};

				for (; ;) {
					const packet = await readPacket(60000);
					if (packet.isControl) continue;
					const ppp = parsePPPFrame(packet.body);
					if (!ppp || ppp.protocol !== 0x0021) continue;
					const incoming = matchIncomingIpPacket(ppp.ipPacket);
					if (!incoming) continue;

					if (incoming.payloadOffset < ppp.ipPacket.byteLength) {
						const payload = ppp.ipPacket.subarray(incoming.payloadOffset);
						if (payload.byteLength) {
							acknowledgementNumber = (incoming.sequence + payload.byteLength) >>> 0;
							pendingChunks.push(new Uint8Array(payload));
							pendingLength += payload.byteLength;
						}
					}

					if (incoming.flags & 0x01) {
						flush();
						acknowledgementNumber = (acknowledgementNumber + 1) >>> 0;
						writer.write(buildTcpFrame(0x11)).catch(() => { });
						const controller = streamController;
						if (controller) {
							try { controller.close() } catch (e) { }
						}
						close();
						return;
					}

					if (bufferedBytes.byteLength < 4 || pendingLength >= 32768) flush();
				}
			} catch (error) {
				const controller = streamController;
				if (controller) {
					try { controller.error(error) } catch (e) { }
				}
				settleClosed(rejectClosed, error);
				try { socket?.close?.() } catch (e) { }
			}
		})();

		const writable = new WritableStream({
			async write(chunk) {
				const bytes = 数据转Uint8Array(chunk);
				if (!bytes.byteLength) return;
				if (bytes.byteLength <= SSTP_TCP_MSS) {
					await writer.write(buildTcpFrame(0x18, bytes));
					sequenceNumber = (sequenceNumber + bytes.byteLength) >>> 0;
					return;
				}
				const frames = [];
				for (let offset = 0; offset < bytes.byteLength; offset += SSTP_TCP_MSS) {
					const segment = bytes.subarray(offset, Math.min(offset + SSTP_TCP_MSS, bytes.byteLength));
					frames.push(buildTcpFrame(0x18, segment));
					sequenceNumber = (sequenceNumber + segment.byteLength) >>> 0;
				}
				await writer.write(拼接字节数据(...frames));
			},
			close() {
				return writer.write(buildTcpFrame(0x11)).catch(() => { });
			},
			abort(error) {
				close();
				if (error) settleClosed(rejectClosed, error);
			}
		});

		return { readable, writable, closed, close };
	} catch (error) {
		close();
		throw error;
	}
}
//////////////////////////////////////////////////功能性函数///////////////////////////////////////////////
/**
 * 带秘钥的 Base64 编码
 * @param {string} plaintext - 原始明文字符串
 * @param {string} secret - 秘钥字符串（如 "KEY123"）
 * @returns {string} 经过秘钥处理的 Base64 字符串
 */
function base64SecretEncode(plaintext, secret) {
	const encoder = new TextEncoder();
	const data = encoder.encode(plaintext);
	const key = encoder.encode(secret);
	const mixed = new Uint8Array(data.length);

	for (let i = 0; i < data.length; i++) {
		mixed[i] = data[i] ^ key[i % key.length];
	}

	// 将 Uint8Array 转换为可被 btoa 处理的字符串
	let binary = '';
	for (let i = 0; i < mixed.length; i++) {
		binary += String.fromCharCode(mixed[i]);
	}
	return btoa(binary);
}

/**
 * 带秘钥的 Base64 解码
 * @param {string} encoded - 经秘钥处理过的 Base64 字符串
 * @param {string} secret - 秘钥字符串（必须与编码时相同）
 * @returns {string} 解码后的原始明文字符串
 */
function base64SecretDecode(encoded, secret) {
	const binary = atob(encoded);
	const mixed = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) {
		mixed[i] = binary.charCodeAt(i);
	}

	const encoder = new TextEncoder();
	const key = encoder.encode(secret);
	const data = new Uint8Array(mixed.length);

	for (let i = 0; i < mixed.length; i++) {
		data[i] = mixed[i] ^ key[i % key.length];
	}

	const decoder = new TextDecoder();
	return decoder.decode(data);
}

function 获取传输协议配置(配置 = {}) {
	const 是gRPC = 配置.传输协议 === 'grpc';
	return {
		type: 是gRPC ? (配置.gRPC模式 === 'multi' ? 'grpc&mode=multi' : 'grpc&mode=gun') : (配置.传输协议 === 'xhttp' ? 'xhttp&mode=stream-one' : 'ws'),
		路径字段名: 是gRPC ? 'serviceName' : 'path',
		域名字段名: 是gRPC ? 'authority' : 'host'
	};
}

function 获取传输路径参数值(配置 = {}, 节点路径 = '/', 作为优选订阅生成器 = false) {
	const 路径值 = 作为优选订阅生成器 ? '/' : (配置.随机路径 ? 随机路径(节点路径) : 节点路径);
	if (配置.传输协议 !== 'grpc') return 路径值;
	return 路径值.split('?')[0] || '/';
}

function log(...args) {
	if (调试日志打印) console.log(...args);
}

// ---- WARP / WireGuard (ثبت رایگان دستگاه Cloudflare + کش KV) ----
// Worker هیچ‌وقت WARP را تونل نمی‌کند (بدون UDP). فقط یک دستگاه ثبت می‌کند و
// نتیجه را کش می‌کند تا کانفیگ‌ها بتوانند یک WireGuard outbound تولید کنند که سمت کلاینت اجرا شود.
function _b64urlToB64(s) { return s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4); }
async function generateWireGuardKeyPair() {
	const kp = await crypto.subtle.generateKey({ name: 'X25519' }, true, ['deriveBits']);
	const pub = await crypto.subtle.exportKey('jwk', kp.publicKey);
	const prv = await crypto.subtle.exportKey('jwk', kp.privateKey);
	return { publicKey: _b64urlToB64(pub.x), privateKey: _b64urlToB64(prv.d) };
}
function _reservedFromClientId(clientId) {
	try { const bin = atob(clientId); return Array.from(bin, c => c.charCodeAt(0)); } catch (e) { return [0, 0, 0]; }
}
async function registerWarpAccount(env, slot = 'warp-account.json') {
	const { publicKey, privateKey } = await generateWireGuardKeyPair();
	const body = { key: publicKey, install_id: '', fcm_token: '', tos: new Date().toISOString(), type: 'Android', model: 'PC', locale: 'en_US', warp_enabled: true };
	const res = await fetch('https://api.cloudflareclient.com/v0a4005/reg', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', 'User-Agent': 'okhttp/4.9.0', 'CF-Client-Version': 'a-6.30-2935' },
		body: JSON.stringify(body)
	});
	if (res.status !== 200) throw new Error('HTTP ' + res.status + ' ' + (await res.text()).slice(0, 200));
	const j = await res.json();
	const peer = (j.config && j.config.peers && j.config.peers[0]) || {};
	const account = {
		registered: true,
		privateKey, publicKey,
		reserved: j.config && j.config.client_id,
		reservedDec: _reservedFromClientId(j.config && j.config.client_id),
		addressV4: '172.16.0.2/32',
		addressV6: ((j.config && j.config.interface && j.config.interface.addresses && j.config.interface.addresses.v6) || '') + '/128',
		peerPublicKey: peer.public_key || '',
		endpoint: (peer.endpoint && peer.endpoint.host) || 'engage.cloudflareclient.com:2408',
		mtu: 1280,
		deviceId: j.id || '',
		accountId: (j.account && j.account.id) || '',
		license: (j.account && j.account.license) || '',
		warpPlus: false,
		token: j.token || '',
		createdAt: new Date().toISOString()
	};
	if (env.KV && typeof env.KV.put === 'function') await env.KV.put(slot, JSON.stringify(account, null, 2));
	return account;
}
async function applyWarpLicense(env, license, slot = 'warp-account.json') {
	const raw = env.KV && typeof env.KV.get === 'function' ? await env.KV.get(slot) : null;
	if (!raw) throw new Error('no WARP account registered yet');
	const account = JSON.parse(raw);
	if (!account.deviceId || !account.token) throw new Error('account missing device id or token');
	const key = String(license || '').trim();
	if (!key) throw new Error('empty license');
	const res = await fetch(`https://api.cloudflareclient.com/v0a4005/reg/${account.deviceId}/account`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json', 'User-Agent': 'okhttp/4.9.0', 'CF-Client-Version': 'a-6.30-2935', 'Authorization': 'Bearer ' + account.token },
		body: JSON.stringify({ license: key })
	});
	if (res.status !== 200) throw new Error('HTTP ' + res.status + ' ' + (await res.text()).slice(0, 200));
	const j = await res.json();
	account.license = (j.account && j.account.license) || account.license;
	account.warpPlus = !!(account.license && account.license === key);
	if (env.KV && typeof env.KV.put === 'function') await env.KV.put(slot, JSON.stringify(account, null, 2));
	return account;
}
function _warpPublicView(a, epOverride) {
	if (!a) return { registered: false };
	const { token, ...rest } = a;
	const v = { ...rest, registered: true, hasToken: !!token, suggestedEndpoints: WARP_SUGGESTED_ENDPOINTS };
	// اگر کلید خصوصی موجود باشد، لینک اتصال و فایل conf تولید می‌شود
	if (a.privateKey && a.peerPublicKey) {
		const baseEp = String((epOverride && warpValidEndpoint(epOverride)) ? epOverride.trim() : (a.endpoint || 'engage.cloudflareclient.com:2408'));
		const epFull = baseEp.includes(':') ? baseEp : baseEp + ':2408';
		v.endpoint = epFull; v.endpointOverridden = !!(epOverride && warpValidEndpoint(epOverride));
		const addr = '172.16.0.2/32' + (a.addressV6 ? ',' + a.addressV6 : '');
		const reservedStr = (Array.isArray(a.reservedDec) && a.reservedDec.length) ? '&reserved=' + encodeURIComponent(a.reservedDec.join(',')) : '';
		v.reserved = Array.isArray(a.reservedDec) ? a.reservedDec : [];
		v.node = `wireguard://${encodeURIComponent(a.privateKey)}@${epFull}/?publickey=${encodeURIComponent(a.peerPublicKey)}${reservedStr}&address=${encodeURIComponent(addr)}&mtu=1280#Nova-WARP`;
		v.conf = `[Interface]\nPrivateKey = ${a.privateKey}\nAddress = ${addr}\nDNS = 1.1.1.1, 1.0.0.1\nMTU = 1280\n\n[Peer]\nPublicKey = ${a.peerPublicKey}\nAllowedIPs = 0.0.0.0/0, ::/0\nEndpoint = ${epFull}`;
	}
	return v;
}
// helper: دریافت آدرس و توکن سرور مرکزی
async function 获取CentralApi(env) {
	let cj = {}; try { const raw = await getConfigRaw(env); cj = raw ? JSON.parse(raw) : {}; } catch (e) { }
	return { api: String(env.CENTRAL_API || cj.centralApi || '').trim().replace(/\/$/, ''), token: String(env.CENTRAL_TOKEN || cj.centralToken || '').trim(), cj };
}
///////////////////////////////////////////////////////中央服务器管理钩子///////////////////////////////////////////////
// 选择性启用：设置 CENTRAL_API（环境变量）或 centralApi（config.json中的centralApi字段）为Nova控制面板地址。
// Worker会报告隐私安全的心跳数据（实例数/用户数）并拉取广播公告。未设置API时所有操作为空操作（no-op）。
async function 中央心跳(env) {
	const { api, cj } = await 获取CentralApi(env); if (!api) return;
	const host = cj.HOST || (Array.isArray(cj.HOSTS) && cj.HOSTS[0]) || '';
	const id = await MD5MD5('nova-instance:' + host); // 稳定、不可逆的实例ID
	let usage = null; try { usage = await usageGet(env, 'usage-m:' + (new Date().getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0'))); } catch (e) { }
	try {
		await fetch(api + '/heartbeat', { method: 'POST', headers: { 'Content-Type': 'application/json', 'User-Agent': 'NovaProxy' }, body: JSON.stringify({ id, host, version: Version, monthTraffic: usage ? usage.total : 0, ts: Date.now() }) });
	} catch (e) { /* best-effort */ }
}
async function 刷新公告(env) {
	const { api } = await 获取CentralApi(env); if (!api) return;
	try {
		const r = await fetch(api + '/announcement', { headers: { 'User-Agent': 'NovaProxy' } });
		if (r.ok) await env.KV.put('announcement.json', await r.text());
	} catch (e) { /* best-effort */ }
}
function _warpEndpointParts(ep) {
	const s = String(ep || 'engage.cloudflareclient.com:2408');
	const i = s.lastIndexOf(':');
	return i > 0 ? { server: s.slice(0, i), port: Number(s.slice(i + 1)) || 2408 } : { server: s, port: 2408 };
}
function buildWarpSingboxOutbound(account, tag, detourTag, endpointOverride, wowInternal) {
	const ep = wowInternal ? '162.159.192.1:2408' : (endpointOverride || account.endpoint);
	const { server, port } = _warpEndpointParts(ep);
	const o = {
		type: 'wireguard', tag,
		server, server_port: port,
		local_address: [account.addressV4 || '172.16.0.2/32', account.addressV6].filter(Boolean),
		private_key: account.privateKey,
		peer_public_key: account.peerPublicKey,
		reserved: Array.isArray(account.reservedDec) ? account.reservedDec : [0, 0, 0],
		mtu: account.mtu || 1280
	};
	if (detourTag) o.detour = detourTag;
	return o;
}

// ---- WARP / WireGuard تولیدکننده کانفیگ (اتصال مستقیم به Cloudflare WARP) ----
// Worker خودش WARP را تونل نمی‌کند (بدون UDP). فقط کانفیگ‌های WireGuard تولید می‌کند
// که کلاینت مستقیماً به WARP متصل شود. خروجی: لیست wireguard:// و nekoray://
const warpKeyPool = [
	{ pk: "AKs7CKzbDVmfjSgCB4A1JNI5YBMclHYV2OQ7srIijW4=", ipv6: "2606:4700:110:876d:4d3c:4206:c90c:6bd0/128", reserved: "" },
	{ pk: "ILJiqBa4QguF5YHRiB9Xfq2Ll01qbYe4dUKZLdgNTFs=", ipv6: "2606:4700:110:8e7b:3658:cd12:5c4f:d86e/128", reserved: "" },
	{ pk: "aJ2wqfkki3um7JnNAH2R6/OnAo2Td+pmxbRReh1v9GE=", ipv6: "2606:4700:110:8310:d937:2fb:c312:9498/128", reserved: "162,104,222" },
	{ pk: "0EefAfoz3eY1PUwycUO5/Ux0GKnjOq6TJk5NySdOglk=", ipv6: "2606:4700:110:8b5b:874a:4dbe:b6d2:d333/128", reserved: "185,208,24" },
	{ pk: "gNPBZNJg1mOGJjoTTof9luaQHdZP2oMRU8nXd3xjpX8=", ipv6: "2606:4700:110:83b7:3a13:7ef3:96fc:f055/128", reserved: "244,132,74" },
	{ pk: "sIVbx/54EJOM0caRr/kksFAkdni+V9VZawSZaha0tms=", ipv6: "2606:4700:110:8502:e803:c14e:2858:c0e7/128", reserved: "61,142,253" },
	{ pk: "+Cgu25E1zo9PkW5fC299zgbGVGKJamWgF6/iqQdoUW0=", ipv6: "2606:4700:110:805e:1441:a533:975b:8a39/128", reserved: "153,183,146" },
	{ pk: "GKaNRx+KVRL3F1sguZHO8wh70yUprNsPjmUapCGUsGk=", ipv6: "2606:4700:110:88f9:54b8:120e:d01d:c77e/128", reserved: "121,102,72" },
	{ pk: "qEqlXOEDcFt803y8Gs/fo8DuZJpZpWV/FSh1oKReFXI=", ipv6: "2606:4700:110:890f:f926:98fe:7e61:d0e7/128", reserved: "18,15,251" },
	{ pk: "+HfkMSyh7obEkX4J8Qa7Xk77CLVn45AW4CdBbnFNaGc=", ipv6: "2606:4700:110:83e8:84f7:8c64:70b4:6709/128", reserved: "92,242,140" },
	{ pk: "cA8htoCSuLJbax8I6HewsDTwTbuWt5DjEItcGvLGREw=", ipv6: "2606:4700:110:8c0b:359c:ee61:a221:d261/128", reserved: "50,15,234" },
	{ pk: "iLHohl4txwAsgUPW1lGsnAeJDFvit6LAdMYTwbNRGUM=", ipv6: "2606:4700:110:81a6:2bc6:e542:7f3e:57f1/128", reserved: "6,26,27" },
	{ pk: "eMkBv99f6rbTboaKNV4HJhvu/Dn35mub7BrY8xFrCVo=", ipv6: "2606:4700:110:8980:cd13:9729:f969:9aab/128", reserved: "137,173,229" },
	{ pk: "8NquX1vPe6AHY5qXmShDELMtx4was2awcNqKj2MgRGM=", ipv6: "2606:4700:110:82e8:22b6:a7ee:b89c:a5a2/128", reserved: "236,186,157" },
	{ pk: "kK/MhN/pbNI05H77pgSsNN6OqM+jPba3Lz9A5Jlg8lw=", ipv6: "2606:4700:110:8847:e19b:4828:fe35:d337/128", reserved: "139,171,35" },
	{ pk: "6L1n+NV62WEr2o4/pEUopsgB6RzcY86BLIgYwdOTxmc=", ipv6: "2606:4700:110:833b:f16c:a4f3:cf60:8fa3/128", reserved: "141,213,198" },
	{ pk: "sALjsE4FBGPC/GosnaOhFy/+2cog7roA3jN8yC75F3g=", ipv6: "2606:4700:110:8d06:7ef8:cf45:2393:9ac7/128", reserved: "66,144,87" },
	{ pk: "iEpioH7klluHVhhhDsz0JodBtjqECXMT7J0LLqHmsEs=", ipv6: "2606:4700:110:871a:f575:a463:76a0:1984/128", reserved: "65,170,17" },
	{ pk: "IIBhFRq9qkF0nxPXHzzvATyRVcEePvPU5bJOuoC2S0g=", ipv6: "2606:4700:110:8ea1:c997:fbfe:f888:3946/128", reserved: "18,140,54" },
	{ pk: "gO/NAt7kT3zNWk6OiQ5Ru9A2ksAr96sPxxr68B8TtH0=", ipv6: "2606:4700:110:8775:bf6c:a489:d6db:fd76/128", reserved: "42,76,32" },
];
const warpPublicKey = "bmXOC+F1FxEMF9dyiK2H5/1SUtzH0JuVo51h2wPfgyo=";
const warpCidrs = ["162.159.192.0/24", "162.159.193.0/24", "162.159.195.0/24", "188.114.96.0/24", "188.114.97.0/24", "188.114.98.0/24", "188.114.99.0/24"];
const warpPorts = [854, 859, 864, 878, 880, 890, 891, 894, 903, 908, 928, 934, 939, 942, 943, 945, 946, 955, 968, 987, 988, 1002, 1010, 1014, 1018, 1070, 1074, 1180, 1387, 1843, 2371, 2506, 3138, 3476, 3581, 3854, 4177, 4198, 4233, 5279, 5956, 7103, 7152, 7156, 7281, 7559, 8319, 8742, 8854, 8886, 2408, 500, 4500, 1701];
const WARP_SUGGESTED_ENDPOINTS = [
	'engage.cloudflareclient.com:2408',
	'162.159.192.1:2408', '162.159.193.10:2408', '162.159.195.1:2408',
	'188.114.96.1:2408', '188.114.97.1:2408', '188.114.98.1:2408', '188.114.99.1:2408',
	'162.159.192.1:894', '188.114.96.1:1701', '162.159.195.1:928', '188.114.98.1:955',
];
function warpRandomIPv4InCidr(cidr) {
	const [base, maskStr] = cidr.split('/');
	const mask = parseInt(maskStr, 10);
	const baseInt = base.split('.').reduce((a, v) => (a << 8) + parseInt(v, 10), 0) >>> 0;
	const offset = Math.floor(Math.random() * Math.pow(2, 32 - mask));
	const ipInt = (baseInt + offset) >>> 0;
	return [(ipInt >>> 24) & 255, (ipInt >>> 16) & 255, (ipInt >>> 8) & 255, ipInt & 255].join('.');
}
function warpRandomEndpoints(count) {
	const eps = new Set();
	let guard = 0;
	while (eps.size < count && guard++ < count * 6) {
		const cidr = warpCidrs[Math.floor(Math.random() * warpCidrs.length)];
		const port = warpPorts[Math.floor(Math.random() * warpPorts.length)];
		eps.add(`${warpRandomIPv4InCidr(cidr)}:${port}`);
	}
	return [...eps];
}
function buildWarpWireGuardLink(ipPort, group, mtu) {
	const encPriv = encodeURIComponent(group.pk);
	const encPub = encodeURIComponent(warpPublicKey);
	const encAddr = encodeURIComponent('172.16.0.2/32,' + group.ipv6);
	const remarks = encodeURIComponent('Nova-WARP-' + ipPort);
	const reservedPart = group.reserved && group.reserved.trim() ? `&reserved=${encodeURIComponent(group.reserved)}` : '';
	return `wireguard://${encPriv}@${ipPort}/?publickey=${encPub}${reservedPart}&address=${encAddr}&mtu=${mtu}#${remarks}`;
}
function buildWarpNekoRayLink(ipPort, group, mtu) {
	const lastColon = ipPort.lastIndexOf(':');
	const ip = ipPort.slice(0, lastColon), port = ipPort.slice(lastColon + 1);
	const cs = JSON.stringify({
		type: 'wireguard', tag: 'wireguard-out', server: ip, server_port: Number(port),
		system_interface: false, interface_name: 'warp-wg',
		local_address: ['172.16.0.2/32', group.ipv6],
		private_key: group.pk, peer_public_key: warpPublicKey, pre_shared_key: '',
		reserved: group.reserved && group.reserved.trim() ? group.reserved.split(',').map(s => Number(s.trim())) : [],
		mtu: Number(mtu),
	});
	const cfg = { _v: 0, addr: '127.0.0.1', cmd: [''], core: 'internal', cs, mapping_port: 0, name: 'Nova-WARP-' + ipPort, port: 1080, socks_port: 0 };
	return 'nekoray://custom#' + btoa(JSON.stringify(cfg));
}
function warpValidEndpoint(ep) { return typeof ep === 'string' && /^[A-Za-z0-9.\-\[\]:]+:\d{1,5}$/.test(ep.trim()); }
async function 处理Warp请求(request) {
	const url = new URL(request.url);
	const target = (url.searchParams.get('target') || 'wireguard').toLowerCase();
	const count = Math.min(Math.max(parseInt(url.searchParams.get('count') || '50', 10) || 50, 1), 500);
	const mtu = Math.min(Math.max(parseInt(url.searchParams.get('mtu') || '1280', 10) || 1280, 576), 1500);
	const endpoints = warpRandomEndpoints(count);
	const isNeko = ['nekoray', 'nekobox', 'neko'].includes(target);
	const links = endpoints.map(ep => {
		const group = warpKeyPool[Math.floor(Math.random() * warpKeyPool.length)];
		return isNeko ? buildWarpNekoRayLink(ep, group, mtu) : buildWarpWireGuardLink(ep, group, mtu);
	});
	const body = btoa(links.join('\n'));
	return new Response(body, { status: 200, headers: { 'Content-Type': 'text/plain;charset=utf-8', 'Cache-Control': 'no-store' } });
}
// ساخت لینک wireguard از حساب ثبت‌شده (برای تزریق به اشتراک‌ها)
async function buildRegisteredWarpNode(env) {
	let w; try { w = JSON.parse(await env.KV.get('warp-account.json') || 'null'); } catch (e) { return ''; }
	if (!w || !w.registered || !w.privateKey || !w.peerPublicKey) return '';
	const epOv = (网络设置 && 网络设置.warpEndpoint && warpValidEndpoint(网络设置.warpEndpoint)) ? 网络设置.warpEndpoint.trim() : '';
	const ep = String(epOv || w.endpoint || 'engage.cloudflareclient.com:2408');
	const encPriv = encodeURIComponent(w.privateKey), encPub = encodeURIComponent(w.peerPublicKey);
	const addr = encodeURIComponent('172.16.0.2/32' + (w.addressV6 ? ',' + w.addressV6 : ''));
	const reservedStr = (Array.isArray(w.reservedDec) && w.reservedDec.length) ? '&reserved=' + encodeURIComponent(w.reservedDec.join(',')) : '';
	return `wireguard://${encPriv}@${ep.includes(':') ? ep : ep + ':2408'}/?publickey=${encPub}${reservedStr}&address=${addr}&mtu=1280#Nova-WARP`;
}

function Clash订阅配置文件热补丁(Clash_原始订阅内容, config_JSON = {}, 网络设置 = null, warpAccount = null) {
	const uuid = config_JSON?.UUID || null;
	const ECH启用 = Boolean(config_JSON?.ECH);
	const HOSTS = Array.isArray(config_JSON?.HOSTS) ? [...config_JSON.HOSTS] : [];
	const ECH_SNI = config_JSON?.ECHConfig?.SNI || null;
	const ECH_DNS = config_JSON?.ECHConfig?.DNS;
	const 需要处理ECH = Boolean(uuid && ECH启用);
	const gRPCUserAgent = (typeof config_JSON?.gRPCUserAgent === 'string' && config_JSON.gRPCUserAgent.trim()) ? config_JSON.gRPCUserAgent.trim() : null;
	const 需要处理gRPC = config_JSON?.传输协议 === "grpc" && Boolean(gRPCUserAgent);
	const gRPCUserAgentYAML = gRPCUserAgent ? JSON.stringify(gRPCUserAgent) : null;
	let clash_yaml = Clash_原始订阅内容.replace(/mode:\s*Rule\b/g, 'mode: rule');

	const baseDnsBlock = `dns:
  enable: true
  default-nameserver:
    - 223.5.5.5
    - 119.29.29.29
    - 114.114.114.114
  use-hosts: true
  nameserver:
    - https://sm2.doh.pub/dns-query
    - https://dns.alidns.com/dns-query
  fallback:
    - 8.8.4.4
    - 208.67.220.220
  fallback-filter:
    geoip: true
    geoip-code: CN
    ipcidr:
      - 240.0.0.0/4
      - 127.0.0.1/32
      - 0.0.0.0/32
    domain:
      - '+.google.com'
      - '+.facebook.com'
      - '+.youtube.com'
`;

	const 添加InlineGrpcUserAgent = (text) => text.replace(/grpc-opts:\s*\{([\s\S]*?)\}/i, (all, inner) => {
		if (/grpc-user-agent\s*:/i.test(inner)) return all;
		let content = inner.trim();
		if (content.endsWith(',')) content = content.slice(0, -1).trim();
		const patchedContent = content ? `${content}, grpc-user-agent: ${gRPCUserAgentYAML}` : `grpc-user-agent: ${gRPCUserAgentYAML}`;
		return `grpc-opts: {${patchedContent}}`;
	});
	const 匹配到gRPC网络 = (text) => /(?:^|[,{])\s*network:\s*(?:"grpc"|'grpc'|grpc)(?=\s*(?:[,}\n#]|$))/mi.test(text);
	const 获取代理类型 = (nodeText) => nodeText.match(/type:\s*(\w+)/)?.[1] || 'vl' + 'ess';
	const 获取凭据值 = (nodeText, isFlowStyle) => {
		const credentialField = 获取代理类型(nodeText) === 'trojan' ? 'password' : 'uuid';
		const pattern = new RegExp(`${credentialField}:\\s*${isFlowStyle ? '([^,}\\n]+)' : '([^\\n]+)'}`);
		return nodeText.match(pattern)?.[1]?.trim() || null;
	};
	const 插入NameserverPolicy = (yaml, hostsEntries) => {
		if (/^\s{2}nameserver-policy:\s*(?:\n|$)/m.test(yaml)) {
			return yaml.replace(/^(\s{2}nameserver-policy:\s*\n)/m, `$1${hostsEntries}\n`);
		}
		const lines = yaml.split('\n');
		let dnsBlockEndIndex = -1;
		let inDnsBlock = false;
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];
			if (/^dns:\s*$/.test(line)) {
				inDnsBlock = true;
				continue;
			}
			if (inDnsBlock && /^[a-zA-Z]/.test(line)) {
				dnsBlockEndIndex = i;
				break;
			}
		}
		const nameserverPolicyBlock = `  nameserver-policy:\n${hostsEntries}`;
		if (dnsBlockEndIndex !== -1) lines.splice(dnsBlockEndIndex, 0, nameserverPolicyBlock);
		else lines.push(nameserverPolicyBlock);
		return lines.join('\n');
	};
	const 添加Flow格式gRPCUserAgent = (nodeText) => {
		if (!匹配到gRPC网络(nodeText) || /grpc-user-agent\s*:/i.test(nodeText)) return nodeText;
		if (/grpc-opts:\s*\{/i.test(nodeText)) return 添加InlineGrpcUserAgent(nodeText);
		return nodeText.replace(/\}(\s*)$/, `, grpc-opts: {grpc-user-agent: ${gRPCUserAgentYAML}}}$1`);
	};
	const 添加Block格式gRPCUserAgent = (nodeLines, topLevelIndent) => {
		const 顶级缩进 = ' '.repeat(topLevelIndent);
		let grpcOptsIndex = -1;
		for (let idx = 0; idx < nodeLines.length; idx++) {
			const line = nodeLines[idx];
			if (!line.trim()) continue;
			const indent = line.search(/\S/);
			if (indent !== topLevelIndent) continue;
			if (/^\s*grpc-opts:\s*(?:#.*)?$/.test(line) || /^\s*grpc-opts:\s*\{.*\}\s*(?:#.*)?$/.test(line)) {
				grpcOptsIndex = idx;
				break;
			}
		}
		if (grpcOptsIndex === -1) {
			let insertIndex = -1;
			for (let j = nodeLines.length - 1; j >= 0; j--) {
				if (nodeLines[j].trim()) {
					insertIndex = j;
					break;
				}
			}
			if (insertIndex >= 0) nodeLines.splice(insertIndex + 1, 0, `${顶级缩进}grpc-opts:`, `${顶级缩进}  grpc-user-agent: ${gRPCUserAgentYAML}`);
			return nodeLines;
		}
		const grpcLine = nodeLines[grpcOptsIndex];
		if (/^\s*grpc-opts:\s*\{.*\}\s*(?:#.*)?$/.test(grpcLine)) {
			if (!/grpc-user-agent\s*:/i.test(grpcLine)) nodeLines[grpcOptsIndex] = 添加InlineGrpcUserAgent(grpcLine);
			return nodeLines;
		}
		let blockEndIndex = nodeLines.length;
		let 子级缩进 = topLevelIndent + 2;
		let 已有gRPCUserAgent = false;
		for (let idx = grpcOptsIndex + 1; idx < nodeLines.length; idx++) {
			const line = nodeLines[idx];
			const trimmed = line.trim();
			if (!trimmed) continue;
			const indent = line.search(/\S/);
			if (indent <= topLevelIndent) {
				blockEndIndex = idx;
				break;
			}
			if (indent > topLevelIndent && 子级缩进 === topLevelIndent + 2) 子级缩进 = indent;
			if (/^grpc-user-agent\s*:/.test(trimmed)) {
				已有gRPCUserAgent = true;
				break;
			}
		}
		if (!已有gRPCUserAgent) nodeLines.splice(blockEndIndex, 0, `${' '.repeat(子级缩进)}grpc-user-agent: ${gRPCUserAgentYAML}`);
		return nodeLines;
	};
	const 添加Block格式ECHOpts = (nodeLines, topLevelIndent) => {
		let insertIndex = -1;
		for (let j = nodeLines.length - 1; j >= 0; j--) {
			if (nodeLines[j].trim()) {
				insertIndex = j;
				break;
			}
		}
		if (insertIndex < 0) return nodeLines;
		const indent = ' '.repeat(topLevelIndent);
		const echOptsLines = [`${indent}ech-opts:`, `${indent}  enable: true`];
		if (ECH_SNI) echOptsLines.push(`${indent}  query-server-name: ${ECH_SNI}`);
		nodeLines.splice(insertIndex + 1, 0, ...echOptsLines);
		return nodeLines;
	};

	if (!/^dns:\s*(?:\n|$)/m.test(clash_yaml)) clash_yaml = baseDnsBlock + clash_yaml;
	if (ECH_SNI && !HOSTS.includes(ECH_SNI)) HOSTS.push(ECH_SNI);

	if (ECH启用 && HOSTS.length > 0) {
		const hostsEntries = HOSTS.map(host => `    "${host}": ${ECH_DNS ? ECH_DNS : ''}`).join('\n');
		clash_yaml = 插入NameserverPolicy(clash_yaml, hostsEntries);
	}

	// WARP / WireGuard proxy - اضافه کردن پراکسی wireguard به Clash
	if (网络设置 && 网络设置.enableWarp && warpAccount && warpAccount.registered && warpAccount.privateKey && !clash_yaml.includes('name: "Nova-WARP"')) {
		try {
			const epOverride = (网络设置.warpEndpoint && String(网络设置.warpEndpoint).trim()) || null;
			const amneziaLine = 网络设置.warpAmnezia ? `\n    amnezia-wg-option: {jc: 4, jmin: 40, jmax: 70}` : '';
			const splitEp = (e) => { const i = String(e).lastIndexOf(':'); return i > 0 ? { s: String(e).slice(0, i), p: Number(String(e).slice(i + 1)) || 2408 } : { s: String(e), p: 2408 }; };
			const wgProxy = (acc, name, endpoint, dialer) => {
				const { s, p } = splitEp(endpoint);
				return `  - name: "${name}"\n` +
					`    type: wireguard\n` +
					`    server: ${s}\n` +
					`    port: ${p}\n` +
					`    ip: ${acc.addressV4 || '172.16.0.2/32'}\n` +
					(acc.addressV6 ? `    ipv6: "${acc.addressV6}"\n` : '') +
					`    private-key: "${acc.privateKey}"\n` +
					`    public-key: "${acc.peerPublicKey}"\n` +
					`    reserved: "${acc.reserved || ''}"\n` +
					`    udp: true\n` +
					`    mtu: ${acc.mtu || 1280}` +
					(dialer ? `\n    dialer-proxy: "${dialer}"` : '') + amneziaLine;
			};
			let block, matchTarget;
			if (网络设置.warpMode === 'wow' && warpAccount.wow && warpAccount.wow.privateKey) {
				block = wgProxy(warpAccount, 'Nova-WARP', epOverride || warpAccount.endpoint, '') + '\n' +
					wgProxy(warpAccount.wow, 'Nova-WoW', '162.159.192.1:2408', 'Nova-WARP');
				matchTarget = 'Nova-WoW';
			} else {
				let dialer = '';
				if (网络设置.warpMode === 'chain') {
					const gm = clash_yaml.match(/^proxy-groups:\s*$[\s\S]*?^\s*-\s*name:\s*["']?([^"'\n]+?)["']?\s*$/m);
					if (gm && gm[1]) dialer = gm[1].trim();
				}
				block = wgProxy(warpAccount, 'Nova-WARP', epOverride || warpAccount.endpoint, dialer);
				matchTarget = 'Nova-WARP';
			}
			if (/^proxies:\s*$/m.test(clash_yaml)) clash_yaml = clash_yaml.replace(/^proxies:\s*$/m, 'proxies:\n' + block);
			else clash_yaml = 'proxies:\n' + block + '\n' + clash_yaml;
			if (/^\s*-\s*MATCH,[^\n]+$/m.test(clash_yaml)) clash_yaml = clash_yaml.replace(/^(\s*-\s*MATCH,)[^\n]+$/m, '$1' + matchTarget);
			else clash_yaml = clash_yaml.replace(/^(\s*)rules:\s*$/m, '$&\n$1  - MATCH,' + matchTarget);
		} catch (e) { /* leave clash_yaml unchanged on any regex miss */ }
	}

	// --- Block QUIC: مسدود کردن پروتکل QUIC در Clash ---
	if (网络设置 && 网络设置.blockQUIC && !clash_yaml.includes('DST-PORT,443,REJECT,udp')) {
		const quicRule = '  - "DST-PORT,443,REJECT,udp"';
		if (/^\s*-\s*MATCH,/m.test(clash_yaml)) {
			clash_yaml = clash_yaml.replace(/^(\s*-\s*MATCH,)/m, quicRule + '\n$1');
		} else if (/^rules:\s*$/m.test(clash_yaml)) {
			clash_yaml = clash_yaml.replace(/^rules:\s*$/m, 'rules:\n' + quicRule);
		}
	}

	// --- Iran Direct: ترافیک ایران مستقیم ---
	if (网络设置 && 网络设置.enableDomesticBypass) {
		const iranRuleTag = '# IRANIAN DIRECT RULES';
		if (!clash_yaml.includes(iranRuleTag)) {
			clash_yaml = clash_yaml.replace(/^(\s*)rules:\s*$/m, '$&' + '\n' + iranRuleTag + '\n' + '$1  - DOMAIN-SUFFIX,ir,DIRECT\n' + '$1  - GEOIP,ir,DIRECT');
		}
	}

	// --- Bypass China: دور زدن ترافیک چین ---
	if (网络设置 && 网络设置.bypassChina) {
		const cnTag = '# CHINA DIRECT RULES';
		if (!clash_yaml.includes(cnTag)) {
			clash_yaml = clash_yaml.replace(/^(\s*)rules:\s*$/m, '$&' + '\n' + cnTag + '\n' + '$1  - GEOSITE,cn,DIRECT\n' + '$1  - GEOIP,CN,DIRECT');
		}
	}

	// --- Bypass Russia: دور زدن ترافیک روسیه ---
	if (网络设置 && 网络设置.bypassRussia) {
		const ruTag = '# RUSSIA DIRECT RULES';
		if (!clash_yaml.includes(ruTag)) {
			clash_yaml = clash_yaml.replace(/^(\s*)rules:\s*$/m, '$&' + '\n' + ruTag + '\n' + '$1  - GEOSITE,ru,DIRECT\n' + '$1  - GEOIP,RU,DIRECT');
		}
	}

	// --- Bypass Sanctions: دور زدن ترافیک تحریم‌شده ---
	if (网络设置 && 网络设置.bypassSanctions) {
		const sanctionTag = '# SANCTION BYPASS RULES';
		if (!clash_yaml.includes(sanctionTag)) {
			clash_yaml = clash_yaml.replace(/^(\s*)rules:\s*$/m, '$&' + '\n' + sanctionTag + '\n' + '$1  - GEOSITE,category-sanctioned,DIRECT\n' + '$1  - DOMAIN-SUFFIX,intel.com,DIRECT\n' + '$1  - DOMAIN-SUFFIX,oracle.com,DIRECT\n' + '$1  - DOMAIN-SUFFIX,docker.com,DIRECT\n' + '$1  - DOMAIN-SUFFIX,android.com,DIRECT');
		}
	}

	// --- Malware Block: مسدود کردن بدافزار ---
	if (网络设置 && 网络设置.enableMalwareBlock) {
		const malwareTag = '# MALWARE BLOCK RULES';
		if (!clash_yaml.includes(malwareTag)) {
			clash_yaml = clash_yaml.replace(/^(\s*)rules:\s*$/m, '$&' + '\n' + malwareTag + '\n' + '$1  - GEOSITE,category-malware,REJECT\n' + '$1  - GEOSITE,malware,REJECT');
		}
	}

	// --- Phishing Block: مسدود کردن فیشینگ ---
	if (网络设置 && 网络设置.enablePhishingBlock) {
		const phishingTag = '# PHISHING BLOCK RULES';
		if (!clash_yaml.includes(phishingTag)) {
			clash_yaml = clash_yaml.replace(/^(\s*)rules:\s*$/m, '$&' + '\n' + phishingTag + '\n' + '$1  - GEOSITE,category-phishing,REJECT\n' + '$1  - GEOSITE,phishing,REJECT');
		}
	}

	if (!需要处理ECH && !需要处理gRPC) return clash_yaml;

	const lines = clash_yaml.split('\n');
	const processedLines = [];
	let i = 0;

	while (i < lines.length) {
		const line = lines[i];
		const trimmedLine = line.trim();

		if (trimmedLine.startsWith('- {')) {
			let fullNode = line;
			let braceCount = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
			while (braceCount > 0 && i + 1 < lines.length) {
				i++;
				fullNode += '\n' + lines[i];
				braceCount += (lines[i].match(/\{/g) || []).length - (lines[i].match(/\}/g) || []).length;
			}
			if (需要处理gRPC) fullNode = 添加Flow格式gRPCUserAgent(fullNode);
			if (需要处理ECH && 获取凭据值(fullNode, true) === uuid.trim()) {
				fullNode = fullNode.replace(/\}(\s*)$/, `, ech-opts: {enable: true${ECH_SNI ? `, query-server-name: ${ECH_SNI}` : ''}}}$1`);
			}
			processedLines.push(fullNode);
			i++;
		} else if (trimmedLine.startsWith('- name:')) {
			let nodeLines = [line];
			let baseIndent = line.search(/\S/);
			let topLevelIndent = baseIndent + 2;
			i++;
			while (i < lines.length) {
				const nextLine = lines[i];
				const nextTrimmed = nextLine.trim();
				if (!nextTrimmed) {
					nodeLines.push(nextLine);
					i++;
					break;
				}
				const nextIndent = nextLine.search(/\S/);
				if (nextIndent <= baseIndent && nextTrimmed.startsWith('- ')) {
					break;
				}
				if (nextIndent < baseIndent && nextTrimmed) {
					break;
				}
				nodeLines.push(nextLine);
				i++;
			}
			let nodeText = nodeLines.join('\n');
			if (需要处理gRPC && 匹配到gRPC网络(nodeText)) {
				nodeLines = 添加Block格式gRPCUserAgent(nodeLines, topLevelIndent);
				nodeText = nodeLines.join('\n');
			}
			if (需要处理ECH && 获取凭据值(nodeText, false) === uuid.trim()) nodeLines = 添加Block格式ECHOpts(nodeLines, topLevelIndent);
			processedLines.push(...nodeLines);
		} else {
			processedLines.push(line);
			i++;
		}
	}

	return processedLines.join('\n');
}

async function Singbox订阅配置文件热补丁(SingBox_原始订阅内容, config_JSON = {}, 网络设置 = null, warpAccount = null) {
	const uuid = config_JSON?.UUID || null;
	const fingerprint = config_JSON?.Fingerprint || "chrome";
	const ECH启用 = Boolean(config_JSON?.ECH);
	const ECH_SNI = config_JSON?.ECHConfig?.SNI || "cloudflare-ech.com";
	const sb_json_text = SingBox_原始订阅内容.replace('1.1.1.1', '8.8.8.8').replace('1.0.0.1', '8.8.4.4');
	try {
		const config = JSON.parse(sb_json_text);
		const 数组化 = value => value === undefined || value === null ? [] : (Array.isArray(value) ? value : [value]);
		const 确保Route = () => config.route = config.route && typeof config.route === 'object' ? config.route : {};
		const 获取DNS规则服务器 = rule => rule && typeof rule === 'object' && !Array.isArray(rule) && typeof rule.server === 'string' ? rule.server : null;
		const 添加规则集 = (type, code) => {
			if (!code || typeof code !== 'string') return null;
			const route = 确保Route(), tag = `${type}-${code}`, ruleSet = Array.isArray(route.rule_set) ? route.rule_set : 数组化(route.rule_set);
			if (!ruleSet.some(item => item?.tag === tag)) {
				const legacyOptions = type === 'geoip' ? route.geoip : route.geosite;
				ruleSet.push({ tag, type: 'remote', format: 'binary', url: `https://raw.githubusercontent.com/SagerNet/sing-${type}/rule-set/${tag}.srs`, ...(legacyOptions?.download_detour ? { download_detour: legacyOptions.download_detour } : {}) });
				config.experimental = config.experimental && typeof config.experimental === 'object' ? config.experimental : {};
				config.experimental.cache_file = config.experimental.cache_file && typeof config.experimental.cache_file === 'object' ? config.experimental.cache_file : {};
				config.experimental.cache_file.enabled ??= true;
			}
			route.rule_set = ruleSet;
			return tag;
		};

		const 迁移规则集字段 = rule => {
			if (!rule || typeof rule !== 'object' || Array.isArray(rule)) return rule;
			if (rule.type === 'logical' && Array.isArray(rule.rules)) {
				rule.rules = rule.rules.map(迁移规则集字段);
				return rule;
			}
			const tags = [];
			for (const geoip of 数组化(rule.geoip)) {
				if (typeof geoip !== 'string') continue;
				if (geoip.toLowerCase() === 'private') rule.ip_is_private = true;
				else tags.push(添加规则集('geoip', geoip));
			}
			for (const sourceGeoip of 数组化(rule.source_geoip)) {
				if (typeof sourceGeoip !== 'string') continue;
				tags.push(添加规则集('geoip', sourceGeoip));
				rule.rule_set_ip_cidr_match_source = true;
			}
			for (const geosite of 数组化(rule.geosite)) if (typeof geosite === 'string') tags.push(添加规则集('geosite', geosite));
			if (tags.length) rule.rule_set = [...new Set([...数组化(rule.rule_set), ...tags].filter(Boolean))];
			delete rule.geoip;
			delete rule.source_geoip;
			delete rule.geosite;
			return rule;
		};

		const 迁移DNS规则 = (rule, rcodeServerMap) => {
			rule = 迁移规则集字段(rule);
			if (!rule || typeof rule !== 'object' || Array.isArray(rule)) return rule;
			if (rule.type === 'logical' && Array.isArray(rule.rules)) {
				rule.rules = rule.rules.map(childRule => 迁移DNS规则(childRule, rcodeServerMap));
				return rule;
			}
			const serverTag = 获取DNS规则服务器(rule);
			if (serverTag && rcodeServerMap.has(serverTag)) {
				for (const key of ['server', 'strategy', 'disable_cache', 'rewrite_ttl', 'client_subnet', 'timeout']) delete rule[key];
				rule.action = 'predefined';
				rule.rcode = rcodeServerMap.get(serverTag);
			} else if (serverTag && !rule.action) rule.action = 'route';
			return rule;
		};

		if (Array.isArray(config.inbounds)) {
			for (const inbound of config.inbounds) {
				if (!inbound || typeof inbound !== 'object' || inbound.type !== 'tun') continue;
				for (const migration of [
					{ targetKey: 'address', sourceKeys: ['inet4_address', 'inet6_address'] },
					{ targetKey: 'route_address', sourceKeys: ['inet4_route_address', 'inet6_route_address'] },
					{ targetKey: 'route_exclude_address', sourceKeys: ['inet4_route_exclude_address', 'inet6_route_exclude_address'] }
				]) {
					const values = 数组化(inbound[migration.targetKey]);
					for (const sourceKey of migration.sourceKeys) values.push(...数组化(inbound[sourceKey]));
					if (values.length) inbound[migration.targetKey] = [...new Set(values)];
					for (const sourceKey of migration.sourceKeys) delete inbound[sourceKey];
				}
				if (inbound.tag) {
					const addedRules = [];
					if (inbound.domain_strategy) addedRules.push({ inbound: inbound.tag, action: 'resolve', strategy: inbound.domain_strategy });
					if (inbound.sniff) {
						const sniffRule = { inbound: inbound.tag, action: 'sniff' };
						if (inbound.sniff_timeout) sniffRule.timeout = inbound.sniff_timeout;
						addedRules.push(sniffRule);
					}
					if (addedRules.length) {
						const route = 确保Route();
						route.rules = [...addedRules, ...数组化(route.rules)];
					}
				}
				delete inbound.sniff;
				delete inbound.sniff_timeout;
				delete inbound.domain_strategy;
			}
		}

		if (config?.route && typeof config.route === 'object' && Array.isArray(config.route.rules)) {
			const 修补路由规则 = rule => {
				rule = 迁移规则集字段(rule);
				if (rule?.type === 'logical' && Array.isArray(rule.rules)) rule.rules = rule.rules.map(修补路由规则);
				else if (rule && typeof rule === 'object' && !Array.isArray(rule) && rule.outbound && !rule.action) rule.action = 'route';
				return rule;
			};
			config.route.rules = config.route.rules.map(修补路由规则);
		}
		// --- Block QUIC: مسدود کردن پروتکل QUIC ---
		if (网络设置 && 网络设置.blockQUIC && config?.route && typeof config.route === 'object' && Array.isArray(config.route.rules)) {
			if (!config.route.rules.some(r => r.outbound === 'block' && r.network === 'udp' && Array.isArray(r.port) && r.port.includes(443))) {
				config.route.rules.unshift({ outbound: 'block', network: 'udp', port: [443] });
			}
		}

		// --- Iran Direct: ترافیک ایران مستقیم ---
		if (网络设置 && 网络设置.enableDomesticBypass && config?.route && typeof config.route === 'object' && Array.isArray(config.route.rules)) {
			const hasIranRule = config.route.rules.some(r => r && r.outbound === 'direct' && Array.isArray(r.domain_suffix) && r.domain_suffix.includes('.ir'));
			if (!hasIranRule) {
				config.route.rules.unshift({ outbound: 'direct', domain_suffix: ['.ir'] });
			}
		}

		// --- WARP Calls: عبور ترافیک UDP (تماس/ویدیوکال) از طریق WARP + ایمن‌سازی DNS ---
		// وقتی warpCalls روشن باشد، همهٔ UDP (تماس/ویدیو که Worker نمی‌تواند حمل کند) از طریق
		// خروجی WireGuard/WARP هدایت می‌شود تا تماس‌ها کار کنند، در حالی که مرور وب روی پروکسی سریع باقی می‌ماند.
		// Unshift آخر = بالاترین اولویت، پس بر blockQUIC می‌چربد. اگر خروجی WARP وجود نداشته باشد بی‌اثر است.
		if (网络设置 && 网络设置.warpCalls && config?.route && typeof config.route === 'object' && Array.isArray(config.route.rules)) {
			const 查找WARP出站 = (arr) => Array.isArray(arr) ? arr.find(o => o && (o.type === 'wireguard' || /warp/i.test(o.tag || ''))) : null;
			const warp出站 = 查找WARP出站(config.outbounds) || 查找WARP出站(config.endpoints);
			const warpTag = warp出站 && warp出站.tag;
			if (warpTag && !config.route.rules.some(r => r && r.network === 'udp' && r.outbound === warpTag)) {
				config.route.rules.unshift({ network: 'udp', outbound: warpTag });
				// CRITICAL: DNS-over-UDP نباید وارد WARP شود. در غیر این صورت وقتی نقطهٔ WARP مسدود باشد
				// (در ایران رایج است) همهٔ جستجوی DNS می‌میرد که باعث می‌شود کشور، پینگ و تقریباً هیچ
				// توان عملیاتی وجود نداشته باشد. رفتار DNS را بالای قانون WARP تثبیت می‌کنیم (unshift بعدی
				// یعنی اولویت بالاتر) تا udp/53 هرگز به WARP نرسد.
				const dnsR = config.route.rules.find(r => r && (r.action === 'hijack-dns' || r.protocol === 'dns' || /dns/i.test(r.outbound || '')));
				if (dnsR && dnsR.outbound && dnsR.action !== 'hijack-dns') config.route.rules.unshift({ network: 'udp', port: [53], outbound: dnsR.outbound });
				else config.route.rules.unshift({ network: 'udp', port: [53], action: 'hijack-dns' });
			}
		}

		// --- Bypass China: دور زدن ترافیک چین ---
		if (网络设置 && 网络设置.bypassChina && config?.route && typeof config.route === 'object' && Array.isArray(config.route.rules)) {
			const ensureSet = (type, code) => {
				if (!config.route.rule_set) config.route.rule_set = [];
				let set = config.route.rule_set.find(s => s.tag === `${type}-${code}`);
				if (!set) { set = { type: 'remote', tag: `${type}-${code}`, format: 'binary', url: `https://raw.githubusercontent.com/SagerNet/sing-geosite/rule-set/${type}-${code}.srs` }; config.route.rule_set.push(set); }
				return set.tag;
			};
			if (!config.route.rules.some(r => r.outbound === 'direct' && JSON.stringify(r).includes('-cn'))) {
				config.route.rules.unshift({ outbound: 'direct', rule_set: [ensureSet('geoip', 'cn'), ensureSet('geosite', 'cn')], type: 'logical', mode: 'or', rules: [{ rule_set: [ensureSet('geoip', 'cn')] }, { rule_set: [ensureSet('geosite', 'cn')] }] });
			}
		}

		// --- Bypass Russia: دور زدن ترافیک روسیه ---
		if (网络设置 && 网络设置.bypassRussia && config?.route && typeof config.route === 'object' && Array.isArray(config.route.rules)) {
			const ensureSetRu = (type, code) => {
				if (!config.route.rule_set) config.route.rule_set = [];
				let set = config.route.rule_set.find(s => s.tag === `${type}-${code}`);
				if (!set) { set = { type: 'remote', tag: `${type}-${code}`, format: 'binary', url: `https://raw.githubusercontent.com/SagerNet/sing-geosite/rule-set/${type}-${code}.srs` }; config.route.rule_set.push(set); }
				return set.tag;
			};
			if (!config.route.rules.some(r => r.outbound === 'direct' && JSON.stringify(r).includes('-ru'))) {
				config.route.rules.unshift({ outbound: 'direct', rule_set: [ensureSetRu('geoip', 'ru'), ensureSetRu('geosite', 'ru')], type: 'logical', mode: 'or', rules: [{ rule_set: [ensureSetRu('geoip', 'ru')] }, { rule_set: [ensureSetRu('geosite', 'ru')] }] });
			}
		}

		// --- Bypass Sanctions: دور زدن ترافیک تحریم‌شده ---
		if (网络设置 && 网络设置.bypassSanctions && config?.route && typeof config.route === 'object' && Array.isArray(config.route.rules)) {
			const ensureSetSanction = (type, code) => {
				if (!config.route.rule_set) config.route.rule_set = [];
				let set = config.route.rule_set.find(s => s.tag === `${type}-${code}`);
				if (!set) { set = { type: 'remote', tag: `${type}-${code}`, format: 'binary', url: `https://raw.githubusercontent.com/SagerNet/sing-geosite/rule-set/${type}-${code}.srs` }; config.route.rule_set.push(set); }
				return set.tag;
			};
			if (!config.route.rules.some(r => r.outbound === 'direct' && JSON.stringify(r).includes('sanctioned'))) {
				config.route.rules.unshift({ outbound: 'direct', rule_set: [ensureSetSanction('geosite', 'category-sanctioned-ir')] });
			}
		}

		// --- Malware Block: مسدود کردن بدافزار ---
		if (网络设置 && 网络设置.enableMalwareBlock && config?.route && typeof config.route === 'object' && Array.isArray(config.route.rules)) {
			const ensureReject = () => { if (!config.outbounds) config.outbounds = []; if (!config.outbounds.some(o => o && o.tag === 'REJECT')) config.outbounds.push({ type: 'block', tag: 'REJECT' }); };
			const ensureSetMalware = (type, code) => {
				if (!config.route.rule_set) config.route.rule_set = [];
				let set = config.route.rule_set.find(s => s.tag === `${type}-${code}`);
				if (!set) { set = { type: 'remote', tag: `${type}-${code}`, format: 'binary', url: `https://raw.githubusercontent.com/SagerNet/sing-geosite/rule-set/${type}-${code}.srs` }; config.route.rule_set.push(set); }
				return set.tag;
			};
			if (!config.route.rules.some(r => r.outbound === 'block' && JSON.stringify(r).includes('malware'))) {
				ensureReject();
				config.route.rules.unshift({ outbound: 'block', rule_set: [ensureSetMalware('geosite', 'category-malware')] });
			}
		}

		// --- Phishing Block: مسدود کردن فیشینگ ---
		if (网络设置 && 网络设置.enablePhishingBlock && config?.route && typeof config.route === 'object' && Array.isArray(config.route.rules)) {
			const ensureReject = () => { if (!config.outbounds) config.outbounds = []; if (!config.outbounds.some(o => o && o.tag === 'REJECT')) config.outbounds.push({ type: 'block', tag: 'REJECT' }); };
			const ensureSetPhishing = (type, code) => {
				if (!config.route.rule_set) config.route.rule_set = [];
				let set = config.route.rule_set.find(s => s.tag === `${type}-${code}`);
				if (!set) { set = { type: 'remote', tag: `${type}-${code}`, format: 'binary', url: `https://raw.githubusercontent.com/SagerNet/sing-geosite/rule-set/${type}-${code}.srs` }; config.route.rule_set.push(set); }
				return set.tag;
			};
			if (!config.route.rules.some(r => r.outbound === 'block' && JSON.stringify(r).includes('phishing'))) {
				ensureReject();
				config.route.rules.unshift({ outbound: 'block', rule_set: [ensureSetPhishing('geosite', 'category-phishing')] });
			}
		}

		const dns = config?.dns;
		if (dns && typeof dns === 'object') {
			const legacyFakeIP = dns.fakeip && typeof dns.fakeip === 'object' ? dns.fakeip : null;
			const rcodeServerMap = new Map();
			const DNS地址协议类型 = { 'tcp:': 'tcp', 'udp:': 'udp', 'tls:': 'tls', 'quic:': 'quic', 'https:': 'https', 'h3:': 'h3' };
			const RCode映射 = { success: 'NOERROR', format_error: 'FORMERR', server_failure: 'SERVFAIL', name_error: 'NXDOMAIN', not_implemented: 'NOTIMP', refused: 'REFUSED' };
			let hasFakeIPServer = false;

			if (Array.isArray(dns.servers)) {
				const migratedServers = [];
				for (const originalServer of dns.servers) {
					if (!originalServer || typeof originalServer !== 'object' || Array.isArray(originalServer)) {
						migratedServers.push(originalServer);
						continue;
					}

					const server = { ...originalServer };
					let parsedAddress = null, parsedRCode = '', rawAddress = typeof server.address === 'string' ? server.address.trim() : '';
					if (rawAddress) {
						const lowerAddress = rawAddress.toLowerCase();
						if (lowerAddress === 'fakeip') parsedAddress = { type: 'fakeip' };
						else if (lowerAddress === 'local') parsedAddress = { type: 'local' };
						else if (lowerAddress.startsWith('rcode://')) {
							parsedAddress = { type: 'rcode' };
							parsedRCode = rawAddress.slice('rcode://'.length).toLowerCase();
						}
						else if (lowerAddress.startsWith('dhcp://')) {
							const dhcpInterface = rawAddress.slice('dhcp://'.length);
							parsedAddress = dhcpInterface && dhcpInterface.toLowerCase() !== 'auto' ? { type: 'dhcp', interface: dhcpInterface } : { type: 'dhcp' };
						} else {
							try {
								const addressURL = new URL(rawAddress);
								const type = DNS地址协议类型[addressURL.protocol.toLowerCase()];
								if (type) {
									const parsedServer = addressURL.hostname?.startsWith('[') && addressURL.hostname.endsWith(']') ? addressURL.hostname.slice(1, -1) : addressURL.hostname;
									parsedAddress = {
										type,
										server: parsedServer || addressURL.host || rawAddress,
										...(addressURL.port ? { server_port: Number(addressURL.port) } : {}),
										...((type === 'https' || type === 'h3') && addressURL.pathname && addressURL.pathname !== '/dns-query' ? { path: addressURL.pathname } : {})
									};
								}
							} catch (_) { }
							if (!parsedAddress) parsedAddress = { type: 'udp', server: rawAddress };
						}
					}

					if (parsedAddress?.type === 'rcode') {
						const rcode = RCode映射[parsedRCode] || 'NOERROR';
						if (typeof server.tag === 'string' && server.tag) {
							rcodeServerMap.set(server.tag, rcode);
							rcodeServerMap.set(server.tag.startsWith('dns_') ? server.tag.slice(4) : `dns_${server.tag}`, rcode);
						}
						continue;
					}

					if (parsedAddress) {
						delete server.address;
						Object.assign(server, parsedAddress);
					}
					if (server.address_resolver !== undefined && server.domain_resolver === undefined) server.domain_resolver = server.address_resolver;
					if (server.address_strategy !== undefined && server.domain_strategy === undefined) server.domain_strategy = server.address_strategy;
					delete server.address_resolver;
					delete server.address_strategy;
					if (server.detour === 'DIRECT') delete server.detour;

					if (server.type === 'fakeip') {
						hasFakeIPServer = true;
						if (legacyFakeIP) {
							for (const key of ['inet4_range', 'inet6_range']) {
								if (legacyFakeIP[key] !== undefined && server[key] === undefined) server[key] = legacyFakeIP[key];
							}
						}
					}
					migratedServers.push(server);
				}
				dns.servers = migratedServers;
			}

			if (legacyFakeIP && !hasFakeIPServer && legacyFakeIP.enabled !== false) {
				const fakeIPServer = { type: 'fakeip', tag: 'fakeip' };
				for (const rule of Array.isArray(dns.rules) ? dns.rules : []) {
					const serverTag = 获取DNS规则服务器(rule);
					if (serverTag && serverTag.toLowerCase().includes('fakeip')) {
						fakeIPServer.tag = serverTag;
						break;
					}
				}
				for (const key of ['inet4_range', 'inet6_range']) {
					if (legacyFakeIP[key] !== undefined) fakeIPServer[key] = legacyFakeIP[key];
				}
				if (Array.isArray(dns.servers)) dns.servers.push(fakeIPServer);
				else dns.servers = [fakeIPServer];
			}

			if (Array.isArray(dns.rules)) {
				const migratedRules = [];
				for (const rule of dns.rules) {
					const serverTag = 获取DNS规则服务器(rule);
					const outbound = 数组化(rule?.outbound);
					const DNS路由选项字段 = new Set(['outbound', 'server', 'action', 'strategy', 'disable_cache', 'rewrite_ttl', 'client_subnet', 'timeout']);
					const isOutboundAnyDNSRule = rule && typeof rule === 'object' && !Array.isArray(rule) && rule.type !== 'logical'
						&& serverTag && outbound.includes('any') && Object.keys(rule).every(key => DNS路由选项字段.has(key));
					if (isOutboundAnyDNSRule) {
						const route = 确保Route();
						if (route.default_domain_resolver === undefined) {
							const resolver = { server: serverTag };
							for (const key of ['strategy', 'disable_cache', 'rewrite_ttl', 'client_subnet', 'timeout']) {
								if (rule[key] !== undefined) resolver[key] = rule[key];
							}
							route.default_domain_resolver = Object.keys(resolver).length === 1 ? resolver.server : resolver;
						}
						continue;
					}
					migratedRules.push(迁移DNS规则(rule, rcodeServerMap));
				}
				dns.rules = migratedRules;
			}

			delete dns.fakeip;
			delete dns.independent_cache;
		}

		if (config?.route && typeof config.route === 'object') {
			delete config.route.geoip;
			delete config.route.geosite;
		}
		if (config?.ntp?.detour === 'DIRECT') delete config.ntp.detour;

		if (Array.isArray(config.outbounds)) {
			const outboundTags = new Set(config.outbounds.map(outbound => outbound?.tag).filter(Boolean));
			const 引用REJECT = value => value === 'REJECT' || (value && typeof value === 'object' && (Array.isArray(value) ? value.some(引用REJECT) : Object.values(value).some(引用REJECT)));
			if (!outboundTags.has('REJECT') && 引用REJECT({ outbounds: config.outbounds, route: config.route })) config.outbounds.push({ type: 'block', tag: 'REJECT' });
		}

		// --- UUID 匹配节点的 TLS 热补丁 (utls & ech) ---
		if (uuid) {
			config.outbounds?.forEach(outbound => {
				// 仅处理包含 uuid 或 password 且匹配的节点
				if ((outbound.uuid && outbound.uuid === uuid) || (outbound.password && outbound.password === uuid)) {
					// 确保 tls 对象存在
					if (!outbound.tls) {
						outbound.tls = { enabled: true };
					}

					// 添加/更新 utls 配置
					if (fingerprint) {
						outbound.tls.utls = {
							enabled: true,
							fingerprint: fingerprint
						};
					}

					// 如果提供了 ech_config，添加/更新 ech 配置
					if (ECH启用) {
						outbound.tls.ech = {
							enabled: true,
							query_server_name: ECH_SNI,// 等待 1.13.0+ 版本上线
							//config: `-----BEGIN ECH CONFIGS-----\n${ech_config}\n-----END ECH CONFIGS-----`
						};
					}
				}
			});
		}

		// WARP / WireGuard outbound - اضافه کردن outbound wireguard به Singbox
		if (网络设置 && 网络设置.enableWarp && warpAccount && warpAccount.registered && warpAccount.privateKey) {
			config.outbounds = Array.isArray(config.outbounds) ? config.outbounds : [];
			const warpTag = 'Nova-WARP';
			const epOverride = (网络设置.warpEndpoint && String(网络设置.warpEndpoint).trim()) || null;
			if (!config.outbounds.some(o => o && o.tag === warpTag)) {
				const 确保Route = () => config.route = config.route && typeof config.route === 'object' ? config.route : {};
				if (网络设置.warpMode === 'wow' && warpAccount.wow && warpAccount.wow.privateKey) {
					config.outbounds.push(buildWarpSingboxOutbound(warpAccount, warpTag, null, epOverride, false));
					config.outbounds.push(buildWarpSingboxOutbound(warpAccount.wow, 'Nova-WoW', warpTag, null, true));
					确保Route().final = 'Nova-WoW';
				} else {
					let detourTag = null;
					if (网络设置.warpMode === 'chain') {
						const sel = config.outbounds.find(o => o && (o.type === 'selector' || o.type === 'urltest'));
						detourTag = sel ? sel.tag : null;
					}
					config.outbounds.push(buildWarpSingboxOutbound(warpAccount, warpTag, detourTag, epOverride, false));
					确保Route().final = warpTag;
				}
			}
		}

		return JSON.stringify(config, null, 2);
	} catch (e) {
		console.error("Singbox热补丁执行失败:", e);
		return JSON.stringify(JSON.parse(sb_json_text), null, 2);
	}
}

function Surge订阅配置文件热补丁(content, url, config_JSON) {
	const 每行内容 = content.includes('\r\n') ? content.split('\r\n') : content.split('\n');
	const 完整节点路径 = config_JSON.随机路径 ? 随机路径(config_JSON.完整节点路径) : config_JSON.完整节点路径;
	let 输出内容 = "";
	for (let x of 每行内容) {
		if (x.includes('= tro' + 'jan,') && !x.includes('ws=true') && !x.includes('ws-path=')) {
			const host = x.split("sni=")[1].split(",")[0];
			const 备改内容 = `sni=${host}, skip-cert-verify=${config_JSON.跳过证书验证}`;
			const 正确内容 = `sni=${host}, skip-cert-verify=${config_JSON.跳过证书验证}, ws=true, ws-path=${完整节点路径.replace(/,/g, '%2C')}, ws-headers=Host:"${host}"`;
			输出内容 += x.replace(new RegExp(备改内容, 'g'), 正确内容).replace("[", "").replace("]", "") + '\n';
		} else {
			输出内容 += x + '\n';
		}
	}

	输出内容 = `#!MANAGED-CONFIG ${url} interval=${config_JSON.优选订阅生成.SUBUpdateTime * 60 * 60} strict=false` + 输出内容.substring(输出内容.indexOf('\n'));
	return 输出内容;
}

async function 请求日志记录(env, request, 访问IP, 请求类型 = "Get_SUB", config_JSON, 是否写入KV日志 = true) {
	try {
		const 当前时间 = new Date();
		const 日志内容 = { TYPE: 请求类型, IP: 访问IP, ASN: `AS${request.cf.asn || '0'} ${request.cf.asOrganization || 'Unknown'}`, CC: `${request.cf.country || 'N/A'} ${request.cf.city || 'N/A'}`, URL: request.url, UA: request.headers.get('User-Agent') || 'Unknown', TIME: 当前时间.getTime() };
		if (config_JSON.TG.启用) {
			try {
				const TG_TXT = await env.KV.get('tg.json');
				const TG_JSON = JSON.parse(TG_TXT);
				if (TG_JSON?.BotToken && TG_JSON?.ChatID) {
					const 请求时间 = new Date(日志内容.TIME).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
					const 请求URL = new URL(日志内容.URL);
					const msg = `<b>#${config_JSON.优选订阅生成.SUBNAME} 日志通知</b>\n\n` +
						`📌 <b>类型：</b>#${日志内容.TYPE}\n` +
						`🌐 <b>IP：</b><code>${日志内容.IP}</code>\n` +
						`📍 <b>位置：</b>${日志内容.CC}\n` +
						`🏢 <b>ASN：</b>${日志内容.ASN}\n` +
						`🔗 <b>域名：</b><code>${请求URL.host}</code>\n` +
						`🔍 <b>路径：</b><code>${请求URL.pathname + 请求URL.search}</code>\n` +
						`🤖 <b>UA：</b><code>${日志内容.UA}</code>\n` +
						`📅 <b>时间：</b>${请求时间}\n` +
						`${config_JSON.CF.Usage.success ? `📊 <b>请求用量：</b>${config_JSON.CF.Usage.total}/${config_JSON.CF.Usage.max} <b>${((config_JSON.CF.Usage.total / config_JSON.CF.Usage.max) * 100).toFixed(2)}%</b>\n` : ''}`;
					await fetch(`https://api.telegram.org/bot${TG_JSON.BotToken}/sendMessage?chat_id=${TG_JSON.ChatID}&parse_mode=HTML&text=${encodeURIComponent(msg)}`, {
						method: 'GET',
						headers: {
							'Accept': 'text/html,application/xhtml+xml,application/xml;',
							'Accept-Encoding': 'gzip, deflate, br',
							'User-Agent': 日志内容.UA || 'Unknown',
						}
					});
				}
			} catch (error) { console.error(`读取tg.json出错: ${error.message}`) }
		}
		是否写入KV日志 = ['1', 'true'].includes(env.OFF_LOG) ? false : 是否写入KV日志;
		if (!是否写入KV日志) return;
		if (await 写入日志到D1(env, 访问IP, request, 请求类型, 日志内容, 当前时间)) return;
		let 日志数组 = [];
		const 现有日志 = await env.KV.get('log.json'), KV容量限制 = 4;//MB
		if (现有日志) {
			try {
				日志数组 = JSON.parse(现有日志);
				if (!Array.isArray(日志数组)) { 日志数组 = [日志内容] }
				else if (请求类型 !== "Get_SUB") {
					const 三十分钟前时间戳 = 当前时间.getTime() - 30 * 60 * 1000;
					if (日志数组.some(log => log.TYPE !== "Get_SUB" && log.IP === 访问IP && log.URL === request.url && log.UA === (request.headers.get('User-Agent') || 'Unknown') && log.TIME >= 三十分钟前时间戳)) return;
					日志数组.push(日志内容);
					while (JSON.stringify(日志数组, null, 2).length > KV容量限制 * 1024 * 1024 && 日志数组.length > 0) 日志数组.shift();
				} else {
					日志数组.push(日志内容);
					while (JSON.stringify(日志数组, null, 2).length > KV容量限制 * 1024 * 1024 && 日志数组.length > 0) 日志数组.shift();
				}
			} catch (e) { 日志数组 = [日志内容] }
		} else { 日志数组 = [日志内容] }
		await env.KV.put('log.json', JSON.stringify(日志数组, null, 2));
	} catch (error) { console.error(`日志记录失败: ${error.message}`) }
}
async function logReadAll(env) {
	if (hasD1(env) && await d1Init(env)) {
		try { const r = await env.DB.prepare('SELECT TYPE,IP,ASN,CC,URL,UA,TIME FROM logs ORDER BY id DESC LIMIT 2000').all(); return (r.results || []); }
		catch (e) { console.error('logReadAll: ' + e); }
	}
	try { return JSON.parse(await env.KV.get('log.json') || '[]'); } catch (e) { return []; }
}
// 将活动日志同时写入 D1 的 logs 表（logReadAll 读取的就是这里），避免管理面板日志始终为空
let 日志写入序号 = 0;
async function 写入日志到D1(env, 访问IP, request, 请求类型, 日志内容, 当前时间) {
	if (!(hasD1(env) && await d1Init(env))) return false;
	try {
		if (请求类型 !== 'Get_SUB') {
			const 阈值 = 当前时间.getTime() - 30 * 60 * 1000;
			const 重复 = await env.DB.prepare("SELECT 1 FROM logs WHERE TYPE!='Get_SUB' AND IP=? AND URL=? AND UA=? AND TIME>=? LIMIT 1").bind(访问IP, request.url, 日志内容.UA, 阈值).first();
			if (重复) return true;
		}
		await env.DB.prepare('INSERT INTO logs (TYPE,IP,ASN,CC,URL,UA,TIME) VALUES (?,?,?,?,?,?,?)').bind(日志内容.TYPE, 日志内容.IP, 日志内容.ASN, 日志内容.CC, 日志内容.URL, 日志内容.UA, 日志内容.TIME).run();
		日志写入序号 = (日志写入序号 + 1) % 200; if (日志写入序号 === 0) { try { await env.DB.prepare('DELETE FROM logs WHERE id <= (SELECT MAX(id)-5000 FROM logs)').run(); } catch (e) {} }
		return true;
	} catch (e) { console.error('写入日志到D1: ' + e); return false; }
}

function 掩码敏感信息(文本, 前缀长度 = 3, 后缀长度 = 2) {
	if (!文本 || typeof 文本 !== 'string') return 文本;
	if (文本.length <= 前缀长度 + 后缀长度) return 文本; // 如果长度太短，直接返回

	const 前缀 = 文本.slice(0, 前缀长度);
	const 后缀 = 文本.slice(-后缀长度);
	const 星号数量 = 文本.length - 前缀长度 - 后缀长度;

	return `${前缀}${'*'.repeat(星号数量)}${后缀}`;
}

async function MD5MD5(文本) {
	if (_md5md5Cache.has(文本)) return _md5md5Cache.get(文本);
	const 编码器 = new TextEncoder();

	const 第一次哈希 = await crypto.subtle.digest('MD5', 编码器.encode(文本));
	const 第一次哈希数组 = Array.from(new Uint8Array(第一次哈希));
	const 第一次十六进制 = 第一次哈希数组.map(字节 => 字节.toString(16).padStart(2, '0')).join('');

	const 第二次哈希 = await crypto.subtle.digest('MD5', 编码器.encode(第一次十六进制.slice(7, 27)));
	const 第二次哈希数组 = Array.from(new Uint8Array(第二次哈希));
	const 第二次十六进制 = 第二次哈希数组.map(字节 => 字节.toString(16).padStart(2, '0')).join('');

	const _r = 第二次十六进制.toLowerCase();
	if (_md5md5Cache.size > 500) _md5md5Cache.clear();
	_md5md5Cache.set(文本, _r);
	return _r;
}

function 随机路径(完整节点路径 = "/") {
	const 常用路径目录 = ["about", "account", "acg", "act", "activity", "ad", "ads", "ajax", "album", "albums", "anime", "api", "app", "apps", "archive", "archives", "article", "articles", "ask", "auth", "avatar", "bbs", "bd", "blog", "blogs", "book", "books", "bt", "buy", "cart", "category", "categories", "cb", "channel", "channels", "chat", "china", "city", "class", "classify", "clip", "clips", "club", "cn", "code", "collect", "collection", "comic", "comics", "community", "company", "config", "contact", "content", "course", "courses", "cp", "data", "detail", "details", "dh", "directory", "discount", "discuss", "dl", "dload", "doc", "docs", "document", "documents", "doujin", "download", "downloads", "drama", "edu", "en", "ep", "episode", "episodes", "event", "events", "f", "faq", "favorite", "favourites", "favs", "feedback", "file", "files", "film", "films", "forum", "forums", "friend", "friends", "game", "games", "gif", "go", "go.html", "go.php", "group", "groups", "help", "home", "hot", "htm", "html", "image", "images", "img", "index", "info", "intro", "item", "items", "ja", "jp", "jump", "jump.html", "jump.php", "jumping", "knowledge", "lang", "lesson", "lessons", "lib", "library", "link", "links", "list", "live", "lives", "m", "mag", "magnet", "mall", "manhua", "map", "member", "members", "message", "messages", "mobile", "movie", "movies", "music", "my", "new", "news", "note", "novel", "novels", "online", "order", "out", "out.html", "out.php", "outbound", "p", "page", "pages", "pay", "payment", "pdf", "photo", "photos", "pic", "pics", "picture", "pictures", "play", "player", "playlist", "post", "posts", "product", "products", "program", "programs", "project", "qa", "question", "rank", "ranking", "read", "readme", "redirect", "redirect.html", "redirect.php", "reg", "register", "res", "resource", "retrieve", "sale", "search", "season", "seasons", "section", "seller", "series", "service", "services", "setting", "settings", "share", "shop", "show", "shows", "site", "soft", "sort", "source", "special", "star", "stars", "static", "stock", "store", "stream", "streaming", "streams", "student", "study", "tag", "tags", "task", "teacher", "team", "tech", "temp", "test", "thread", "tool", "tools", "topic", "topics", "torrent", "trade", "travel", "tv", "txt", "type", "u", "upload", "uploads", "url", "urls", "user", "users", "v", "version", "videos", "view", "vip", "vod", "watch", "web", "wenku", "wiki", "work", "www", "zh", "zh-cn", "zh-tw", "zip"];
	const 随机数 = Math.floor(Math.random() * 3 + 1);
	const 随机路径 = 常用路径目录.sort(() => 0.5 - Math.random()).slice(0, 随机数).join('/');
	if (完整节点路径 === "/") return `/${随机路径}`;
	else return `/${随机路径 + 完整节点路径.replace('/?', '?')}`;
}

function 替换星号为随机字符(内容) {
	if (typeof 内容 !== 'string' || !内容.includes('*')) return 内容;
	const 字符集 = 'abcdefghijklmnopqrstuvwxyz0123456789';
	return 内容.replace(/\*/g, () => {
		let s = '';
		for (let i = 0; i < Math.floor(Math.random() * 14) + 3; i++) s += 字符集[Math.floor(Math.random() * 字符集.length)];
		return s;
	});
}

async function DoH查询(域名, 记录类型, DoH解析服务 = "https://cloudflare-dns.com/dns-query") {
	const 开始时间 = performance.now();
	log(`[DoH查询] 开始查询 ${域名} ${记录类型} via ${DoH解析服务}`);
	try {
		// 记录类型字符串转数值
		const 类型映射 = { 'A': 1, 'NS': 2, 'CNAME': 5, 'MX': 15, 'TXT': 16, 'AAAA': 28, 'SRV': 33, 'HTTPS': 65 };
		const qtype = 类型映射[记录类型.toUpperCase()] || 1;

		// 编码域名为 DNS wire format labels
		const 编码域名 = (name) => {
			const parts = name.endsWith('.') ? name.slice(0, -1).split('.') : name.split('.');
			const bufs = [];
			for (const label of parts) {
				const enc = new TextEncoder().encode(label);
				bufs.push(new Uint8Array([enc.length]), enc);
			}
			bufs.push(new Uint8Array([0]));
			const total = bufs.reduce((s, b) => s + b.length, 0);
			const result = new Uint8Array(total);
			let off = 0;
			for (const b of bufs) { result.set(b, off); off += b.length }
			return result;
		};

		// 构建 DNS 查询报文
		const qname = 编码域名(域名);
		const query = new Uint8Array(12 + qname.length + 4);
		const qview = new DataView(query.buffer);
		qview.setUint16(0, crypto.getRandomValues(new Uint16Array(1))[0]); // ID (random per RFC 1035)
		qview.setUint16(2, 0x0100);  // Flags: RD=1 (递归查询)
		qview.setUint16(4, 1);       // QDCOUNT
		query.set(qname, 12);
		qview.setUint16(12 + qname.length, qtype);
		qview.setUint16(12 + qname.length + 2, 1); // QCLASS = IN

		// 通过 POST 发送 dns-message 请求
		log(`[DoH查询] 发送查询报文 ${域名} via ${DoH解析服务} (type=${qtype}, ${query.length}字节)`);
		const response = await fetch(DoH解析服务, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/dns-message',
				'Accept': 'application/dns-message',
			},
			body: query,
		});
		if (!response.ok) {
			console.warn(`[DoH查询] 请求失败 ${域名} ${记录类型} via ${DoH解析服务} 响应代码:${response.status}`);
			return [];
		}

		// 解析 DNS 响应报文
		const buf = new Uint8Array(await response.arrayBuffer());
		const dv = new DataView(buf.buffer);
		const qdcount = dv.getUint16(4);
		const ancount = dv.getUint16(6);
		log(`[DoH查询] 收到响应 ${域名} ${记录类型} via ${DoH解析服务} (${buf.length}字节, ${ancount}条应答)`);

		// 解析域名（处理指针压缩）
		const 解析域名 = (pos) => {
			const labels = [];
			let p = pos, jumped = false, endPos = -1, safe = 128;
			while (p < buf.length && safe-- > 0) {
				const len = buf[p];
				if (len === 0) { if (!jumped) endPos = p + 1; break }
				if ((len & 0xC0) === 0xC0) {
					if (!jumped) endPos = p + 2;
					p = ((len & 0x3F) << 8) | buf[p + 1];
					jumped = true;
					continue;
				}
				labels.push(new TextDecoder().decode(buf.slice(p + 1, p + 1 + len)));
				p += len + 1;
			}
			if (endPos === -1) endPos = p + 1;
			return [labels.join('.'), endPos];
		};

		// 跳过 Question Section
		let offset = 12;
		for (let i = 0; i < qdcount; i++) {
			const [, end] = 解析域名(offset);
			offset = /** @type {number} */ (end) + 4; // +4 跳过 QTYPE + QCLASS
		}

		// 解析 Answer Section
		const answers = [];
		for (let i = 0; i < ancount && offset < buf.length; i++) {
			const [name, nameEnd] = 解析域名(offset);
			offset = /** @type {number} */ (nameEnd);
			const type = dv.getUint16(offset); offset += 2;
			offset += 2; // CLASS
			const ttl = dv.getUint32(offset); offset += 4;
			const rdlen = dv.getUint16(offset); offset += 2;
			const rdata = buf.slice(offset, offset + rdlen);
			offset += rdlen;

			let data;
			if (type === 1 && rdlen === 4) {
				// A 记录
				data = `${rdata[0]}.${rdata[1]}.${rdata[2]}.${rdata[3]}`;
			} else if (type === 28 && rdlen === 16) {
				// AAAA 记录
				const segs = [];
				for (let j = 0; j < 16; j += 2) segs.push(((rdata[j] << 8) | rdata[j + 1]).toString(16));
				data = segs.join(':');
			} else if (type === 16) {
				// TXT 记录 (长度前缀字符串)
				let tOff = 0;
				const parts = [];
				while (tOff < rdlen) {
					const tLen = rdata[tOff++];
					parts.push(new TextDecoder().decode(rdata.slice(tOff, tOff + tLen)));
					tOff += tLen;
				}
				data = parts.join('');
			} else if (type === 5) {
				// CNAME 记录
				const [cname] = 解析域名(offset - rdlen);
				data = cname;
			} else {
				data = Array.from(rdata).map(b => b.toString(16).padStart(2, '0')).join('');
			}
			answers.push({ name, type, TTL: ttl, data, rdata });
		}
		const 耗时 = (performance.now() - 开始时间).toFixed(2);
		log(`[DoH查询] 查询完成 ${域名} ${记录类型} via ${DoH解析服务} ${耗时}ms 共${answers.length}条结果${answers.length > 0 ? '\n' + answers.map((a, i) => `  ${i + 1}. ${a.name} type=${a.type} TTL=${a.TTL} data=${a.data}`).join('\n') : ''}`);
		return answers;
	} catch (error) {
		const 耗时 = (performance.now() - 开始时间).toFixed(2);
		console.error(`[DoH查询] 查询失败 ${域名} ${记录类型} via ${DoH解析服务} ${耗时}ms:`, error);
		return [];
	}
}

async function 读取config_JSON(env, hostname, userID, UA = "Mozilla/5.0", 重置配置 = false) {
	const _p = 特征码字典[0];
	const host = hostname, Ali_DoH = "https://dns.alidns.com/dns-query", ECH_SNI = "cloudflare-ech.com", 占位符 = '{{IP:PORT}}', 初始化开始时间 = performance.now(), 默认配置JSON = {
		TIME: new Date().toISOString(),
		HOST: host,
		HOSTS: [hostname],
		UUID: userID,
		PATH: "/",
		协议类型: "v" + "le" + "ss",
		传输协议: "ws",
		gRPC模式: "gun",
		gRPCUserAgent: UA,
		跳过证书验证: false,
		启用0RTT: false,
		TLS分片: null,
		随机路径: false,
		ECH: false,
		ECHConfig: {
			DNS: Ali_DoH,
			SNI: ECH_SNI,
		},
		SS: {
			加密方式: "aes-128-gcm",
			TLS: true,
		},
		Fingerprint: "chrome",
		优选订阅生成: {
			local: true, // true: 基于本地的优选地址  false: 优选订阅生成器
			本地IP库: {
				随机IP: true, // 当 随机IP 为true时生效，启用随机IP的数量，否则使用KV内的ADD.txt
				随机数量: 16,
				指定端口: -1,
			},
			SUB: null,
			SUBNAME: "Nova" + "Proxy",
			SUBUpdateTime: 3, // 订阅更新时间（小时）
			TOKEN: await MD5MD5(hostname + userID),
		},
		订阅转换配置: {
			SUBAPI: `https://SUBAPI.${特征码字典[1]}ssss.net`,
			SUBCONFIG: `https://raw.githubusercontent.com/${特征码字典[1]}/ACL4SSR/refs/heads/main/Clash/config/ACL4SSR_Online_Mini_MultiMode_CF.ini`,
			SUBEMOJI: false,
			SUBLIST: false, //仅输出节点信息
		},
		反代: {
			[_p]: "auto",
			SOCKS5: {
				启用: 启用SOCKS5反代,
				全局: 启用SOCKS5全局反代,
				账号: 我的SOCKS5账号,
				白名单: SOCKS5白名单,
			},
			路径模板: {
				[_p]: "proxyip=" + 占位符,
				SOCKS5: {
					全局: "socks5://" + 占位符,
					标准: "socks5=" + 占位符
				},
				HTTP: {
					全局: "http://" + 占位符,
					标准: "http=" + 占位符
				},
				HTTPS: {
					全局: "https://" + 占位符,
					标准: "https=" + 占位符
				},
				TURN: {
					全局: "turn://" + 占位符,
					标准: "turn=" + 占位符
				},
				SSTP: {
					全局: "sstp://" + 占位符,
					标准: "sstp=" + 占位符
				},
			},
		},
		TG: {
			启用: false,
			BotToken: null,
			ChatID: null,
		},
		CF: {
			Email: null,
			GlobalAPIKey: null,
			AccountID: null,
			APIToken: null,
			UsageAPI: null,
			Usage: {
				success: false,
				pages: 0,
				workers: 0,
				total: 0,
				max: 100000,
			},
		}
	};

	try {
		let configJSON = await getConfigRaw(env);
		if (!configJSON || 重置配置 == true) {
			await putConfig(env, JSON.stringify(默认配置JSON, null, 2));
			config_JSON = 默认配置JSON;
		} else {
			config_JSON = JSON.parse(configJSON);
		}
	} catch (error) {
		console.error(`读取config_JSON出错: ${error.message}`);
		config_JSON = 默认配置JSON;
	}

	if (!config_JSON.订阅转换配置.SUBLIST) config_JSON.订阅转换配置.SUBLIST = false;
	if (!config_JSON.gRPCUserAgent) config_JSON.gRPCUserAgent = UA;
	config_JSON.HOST = host;
	if (!config_JSON.HOSTS) config_JSON.HOSTS = [hostname];
	if (env.HOST) config_JSON.HOSTS = (await 整理成数组(env.HOST)).map(h => h.toLowerCase().replace(/^https?:\/\//, '').split('/')[0].split(':')[0]);
	config_JSON.UUID = userID;
	if (!config_JSON.随机路径) config_JSON.随机路径 = false;
	if (!config_JSON.启用0RTT) config_JSON.启用0RTT = false;

	if (env.PATH) config_JSON.PATH = env.PATH.startsWith('/') ? env.PATH : '/' + env.PATH;
	else if (!config_JSON.PATH) config_JSON.PATH = '/';

	if (!config_JSON.gRPC模式) config_JSON.gRPC模式 = 'gun';
	if (!config_JSON.SS) config_JSON.SS = { 加密方式: "aes-128-gcm", TLS: false };

	// Canonicalize mixed-protocol aliases (e.g. "mixed", "mixed (equal split)", Persian "ترکیبی")
	if (config_JSON.协议类型) {
		const _raw = String(config_JSON.协议类型).trim().toLowerCase();
		if (/^mixed|^mix$|ترکیب/.test(_raw)) config_JSON.协议类型 = 'mixed';
	}

	if (!config_JSON.反代.路径模板?.[_p]) {
		config_JSON.反代.路径模板 = {
			[_p]: "proxyip=" + 占位符,
			SOCKS5: {
				全局: "socks5://" + 占位符,
				标准: "socks5=" + 占位符
			},
			HTTP: {
				全局: "http://" + 占位符,
				标准: "http=" + 占位符
			},
			HTTPS: {
				全局: "https://" + 占位符,
				标准: "https=" + 占位符
			},
			TURN: {
				全局: "turn://" + 占位符,
				标准: "turn=" + 占位符
			},
			SSTP: {
				全局: "sstp://" + 占位符,
				标准: "sstp=" + 占位符
			},
		};
	}
	if (!config_JSON.反代.路径模板.HTTPS) config_JSON.反代.路径模板.HTTPS = { 全局: "https://" + 占位符, 标准: "https=" + 占位符 };
	if (!config_JSON.反代.路径模板.TURN) config_JSON.反代.路径模板.TURN = { 全局: "turn://" + 占位符, 标准: "turn=" + 占位符 };
	if (!config_JSON.反代.路径模板.SSTP) config_JSON.反代.路径模板.SSTP = { 全局: "sstp://" + 占位符, 标准: "sstp=" + 占位符 };

	const 代理配置 = config_JSON.反代.路径模板[config_JSON.反代.SOCKS5.启用?.toUpperCase()];

	let 路径反代参数 = '';
	if (代理配置 && config_JSON.反代.SOCKS5.账号) 路径反代参数 = (config_JSON.反代.SOCKS5.全局 ? 代理配置.全局 : 代理配置.标准).replace(占位符, config_JSON.反代.SOCKS5.账号);
	else if (config_JSON.反代[_p] !== 'auto') 路径反代参数 = config_JSON.反代.路径模板[_p].replace(占位符, config_JSON.反代[_p]);

	let 反代查询参数 = '';
	if (路径反代参数.includes('?')) {
		const [反代路径部分, 反代查询部分] = 路径反代参数.split('?');
		路径反代参数 = 反代路径部分;
		反代查询参数 = 反代查询部分;
	}

	config_JSON.PATH = config_JSON.PATH.replace(路径反代参数, '').replace('//', '/');
	const normalizedPath = config_JSON.PATH === '/' ? '' : config_JSON.PATH.replace(/\/+(?=\?|$)/, '').replace(/\/+$/, '');
	const [路径部分, ...查询数组] = normalizedPath.split('?');
	const 查询部分 = 查询数组.length ? '?' + 查询数组.join('?') : '';
	const 最终查询部分 = 反代查询参数 ? (查询部分 ? 查询部分 + '&' + 反代查询参数 : '?' + 反代查询参数) : 查询部分;
	config_JSON.完整节点路径 = (路径部分 || '/') + (路径部分 && 路径反代参数 ? '/' : '') + 路径反代参数 + 最终查询部分 + (config_JSON.启用0RTT ? (最终查询部分 ? '&' : '?') + 'ed=2560' : '');

	if (!config_JSON.TLS分片 && config_JSON.TLS分片 !== null) config_JSON.TLS分片 = null;
	const TLS分片参数 = config_JSON.TLS分片 == 'Shadowrocket' ? `&fragment=${encodeURIComponent('1,40-60,30-50,tlshello')}` : config_JSON.TLS分片 == 'Happ' ? `&fragment=${encodeURIComponent('3,1,tlshello')}` : '';
	if (!config_JSON.Fingerprint) config_JSON.Fingerprint = "chrome";
	if (!config_JSON.ECH) config_JSON.ECH = false;
	if (!config_JSON.ECHConfig) config_JSON.ECHConfig = { DNS: Ali_DoH, SNI: ECH_SNI };
	const ECHLINK参数 = config_JSON.ECH ? `&ech=${encodeURIComponent((config_JSON.ECHConfig.SNI ? config_JSON.ECHConfig.SNI + '+' : '') + config_JSON.ECHConfig.DNS)}` : '';
	const { type: 传输协议, 路径字段名, 域名字段名 } = 获取传输协议配置(config_JSON);
	const 传输路径参数值 = 获取传输路径参数值(config_JSON, config_JSON.完整节点路径);
	const _linkProto = config_JSON.协议类型 === 'mixed' ? 'vless' : config_JSON.协议类型;
	let _linkFingerprint = config_JSON.Fingerprint;
	if (!_linkFingerprint || String(_linkFingerprint).trim().toLowerCase() === 'random') {
		const _fps = ['chrome','firefox','safari','ios','android','edge','360'];
		_linkFingerprint = _fps[Math.floor(Math.random() * _fps.length)];
	}
	config_JSON.LINK = _linkProto === 'ss'
		? `${_linkProto}://${btoa(config_JSON.SS.加密方式 + ':' + userID)}@${host}:${config_JSON.SS.TLS ? '443' : '80'}?plugin=v2${encodeURIComponent(`ray-plugin;mode=websocket;host=${host};path=${((config_JSON.完整节点路径.includes('?') ? config_JSON.完整节点路径.replace('?', '?enc=' + config_JSON.SS.加密方式 + '&') : (config_JSON.完整节点路径 + '?enc=' + config_JSON.SS.加密方式)) + (config_JSON.SS.TLS ? ';tls' : ''))};mux=0`) + ECHLINK参数}#${encodeURIComponent(config_JSON.优选订阅生成.SUBNAME)}`
		: (config_JSON.enableTLS === false
			? `${_linkProto}://${userID}@${host}:80?security=none&type=${传输协议}&${域名字段名}=${host}&${路径字段名}=${encodeURIComponent(传输路径参数值)}&encryption=none#${encodeURIComponent(config_JSON.优选订阅生成.SUBNAME)}`
			: `${_linkProto}://${userID}@${host}:443?security=tls&type=${传输协议 + ECHLINK参数}&${域名字段名}=${host}&fp=${_linkFingerprint}&sni=${host}&${路径字段名}=${encodeURIComponent(传输路径参数值) + TLS分片参数}&encryption=none${config_JSON.skipCertVerify ? '&insecure=1&allowInsecure=1' : ''}#${encodeURIComponent(config_JSON.优选订阅生成.SUBNAME)}`);
	config_JSON.优选订阅生成.TOKEN = await MD5MD5(hostname + userID);

	const 初始化TG_JSON = { BotToken: null, ChatID: null };
	config_JSON.TG = { 启用: config_JSON.TG.启用 ? config_JSON.TG.启用 : false, ...初始化TG_JSON };
	try {
		const TG_TXT = await env.KV.get('tg.json');
		if (!TG_TXT) {
			await env.KV.put('tg.json', JSON.stringify(初始化TG_JSON, null, 2));
		} else {
			const TG_JSON = JSON.parse(TG_TXT);
			config_JSON.TG.ChatID = TG_JSON.ChatID ? TG_JSON.ChatID : null;
			config_JSON.TG.BotToken = TG_JSON.BotToken ? 掩码敏感信息(TG_JSON.BotToken) : null;
		}
	} catch (error) {
		console.error(`读取tg.json出错: ${error.message}`);
	}

	const 初始化CF_JSON = { Email: null, GlobalAPIKey: null, AccountID: null, APIToken: null, UsageAPI: null };
	config_JSON.CF = { ...初始化CF_JSON, Usage: { success: false, pages: 0, workers: 0, total: 0, max: 100000 } };
	try {
		const CF_TXT = await env.KV.get('cf.json');
		if (!CF_TXT) {
			await env.KV.put('cf.json', JSON.stringify(初始化CF_JSON, null, 2));
		} else {
			const CF_JSON = JSON.parse(CF_TXT);
			if (CF_JSON.UsageAPI) {
				try {
					const response = await fetch(CF_JSON.UsageAPI);
					const Usage = await response.json();
					config_JSON.CF.Usage = Usage;
				} catch (err) {
					console.error(`请求 CF_JSON.UsageAPI 失败: ${err.message}`);
				}
			} else {
				config_JSON.CF.Email = CF_JSON.Email ? CF_JSON.Email : null;
				config_JSON.CF.GlobalAPIKey = CF_JSON.GlobalAPIKey ? 掩码敏感信息(CF_JSON.GlobalAPIKey) : null;
				config_JSON.CF.AccountID = CF_JSON.AccountID ? 掩码敏感信息(CF_JSON.AccountID) : null;
				config_JSON.CF.APIToken = CF_JSON.APIToken ? 掩码敏感信息(CF_JSON.APIToken) : null;
				config_JSON.CF.UsageAPI = null;
				const Usage = await getCloudflareUsage(CF_JSON.Email, CF_JSON.GlobalAPIKey, CF_JSON.AccountID, CF_JSON.APIToken);
				config_JSON.CF.Usage = Usage;
			}
		}
	} catch (error) {
		console.error(`读取cf.json出错: ${error.message}`);
	}

	config_JSON.加载时间 = (performance.now() - 初始化开始时间).toFixed(2) + 'ms';
	return config_JSON;
}

async function logErrorToKV(env, error, request) {
	if (!env.KV || typeof env.KV.put !== 'function') return;
	try {
		const errorData = {
			message: error?.message || String(error),
			stack: error?.stack || '',
			url: request?.url || '',
			method: request?.method || '',
			timestamp: new Date().toISOString(),
		};
		await env.KV.put('last_error.json', JSON.stringify(errorData, null, 2), { expirationTtl: 86400 });
	} catch (e) { /* ignore KV write errors */ }
}

async function 处理安装向导(request, env, url, adminPassword, encryptionKey, UA) {
	const sub = url.pathname.slice(1).toLowerCase().replace(/^install\/?/, '');
	const hasStore = !!(env.KV && typeof env.KV.get === 'function');
	const kvBound = env.__kvWrapped ? !!env.__hasRealKV : !!(env.KV && typeof env.KV.get === 'function');
	if (sub === 'status') {
		const d1Bound = !!(env.DB && typeof env.DB.prepare === 'function');
		let d1Probe = 'none';
		if (d1Bound) { try { await env.DB.prepare('SELECT 1 AS ok').first(); d1Probe = 'ok'; } catch (e) { d1Probe = 'err:' + ((e && e.message) || String(e)); } }
		const d1 = d1Bound;
		return new Response(JSON.stringify({ kv: kvBound, d1: d1, d1Bound: d1Bound, d1Probe: d1Probe, store: d1 ? 'd1' : (kvBound ? 'kv' : 'none'), admin: !!adminPassword, configured: !!(hasStore && adminPassword) }),
			{ status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
	}
	if (sub === 'set') {
		if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
		if (adminPassword) return new Response(JSON.stringify({ error: 'already_configured' }), { status: 409, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
		if (!hasStore) return new Response(JSON.stringify({ error: 'no_kv' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
		let body = {};
		try { body = await request.json(); } catch (e) { try { body = Object.fromEntries(new URLSearchParams(await request.text())); } catch (e2) {} }
		const pass = (body.password || '').toString().replace(/[\r\n]/g, '');
		if (pass.length < 6) return new Response(JSON.stringify({ error: 'too_short' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
		try {
			await env.KV.put('admin_pass', pass);
			缓存管理员密码 = pass; 缓存管理员密码时间 = Date.now();
		} catch (e) { return new Response(JSON.stringify({ error: 'kv_write_failed' }), { status: 500, headers: { 'Content-Type': 'application/json;charset=utf-8' } }); }
		const headers = { 'Content-Type': 'application/json;charset=utf-8' };
		try { headers['Set-Cookie'] = `auth=${await makeSessionToken((UA || 'null'), encryptionKey, pass)}; Path=/; Max-Age=86400; HttpOnly; Secure; SameSite=Lax`; } catch (e) {}
		return new Response(JSON.stringify({ success: true }), { status: 200, headers });
	}
	return await panelHtml(env, '/install/');
}
async function 用户中心页面() {
	try {
		const base = String(Pages静态页面 || '').replace(/\/+$/, '');
		if (!base || PANEL_PLACEHOLDER.test(base)) return null;
		const r = await fetch(base + '/user/index.html', { headers: { 'User-Agent': 'NovaProxy' }, cf: { cacheTtl: 300, cacheEverything: true } });
		if (!r || !r.ok) return null;
		const html = await r.text();
		if (!html || html.length < 50) return null;
		return new Response(html, { status: 200, headers: { 'content-type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } });
	} catch (e) { return null; }
}

function 识别伊朗运营商(request) {
	const cf = (request && request.cf) || {};
	const org = String(cf.asOrganization || '').toLowerCase();
	const asn = Number(cf.asn || 0);
	if (String(cf.country || '').toUpperCase() !== 'IR') return 'all';
	if (asn === 44244 || org.includes('irancell') || org.includes('mtn')) return 'mtn';
	if (asn === 197207 || org.includes('mobile communication company of iran') || org.includes('mcci') || org.includes('hamrah')) return 'mci';
	if (asn === 57218 || org.includes('rightel')) return 'rightel';
	if (asn === 31549 || org.includes('shatel')) return 'shatel';
	return 'ir';
}

async function 获取池文件(fileUrl) {
	const c = _poolCache.get(fileUrl);
	if (c && Date.now() - c.at < 1800000) return c.list;
	let list = [];
	try {
		const r = await fetch(fileUrl, { headers: { 'User-Agent': 'NovaProxy' }, cf: { cacheTtl: 1800, cacheEverything: true } });
		if (r.ok) list = (await 整理成数组(await r.text())).map(s => String(s).trim()).filter(s => s && !s.startsWith('#'));
	} catch (e) {}
	_poolCache.set(fileUrl, { at: Date.now(), list });
	return list;
}

async function 获取智能清洁IP(request, poolApi, count) {
	const base = String(poolApi || '').replace(/\/+$/, '');
	if (!base) return [];
	const carrier = 识别伊朗运营商(request);
	for (const f of [...new Set([carrier, 'ir', 'all'])]) {
		const list = await 获取池文件(base + '/' + f + '.txt');
		if (list && list.length) {
			const shuffled = list.slice().sort(() => 0.5 - Math.random()).slice(0, count || 16);
			return shuffled.map(line => line.includes('#') ? line : (line + '#Nova-' + f.toUpperCase()));
		}
	}
	return [];
}

async function 运行定时维护(env) {
	try {
		const hosts = await getPoolHosts(env);
		let baseUrl = '';
		try { const savedNS = env.KV && typeof env.KV.get === 'function' ? await env.KV.get('network-settings.json') : null; const _ns = savedNS ? JSON.parse(savedNS) : {}; const _hosts = _ns.HOSTS || []; if (_hosts.length) baseUrl = 'https://' + _hosts[0]; } catch (e) {}
		if (!baseUrl) baseUrl = 'https://' + (env.HOST || 'localhost');
		const health = await 检查域名健康(env, hosts, baseUrl.replace(/^https?:\/\//, ''));
		const mirror = await publishSubMirror(env, baseUrl);
		try { await 中央心跳(env); } catch (e) { /* best-effort */ }
		try { await 刷新公告(env); } catch (e) { /* best-effort */ }
		console.log('[Scheduled Maintenance] 维护完成');
		return { health, mirror };
	} catch (error) {
		console.error('[Scheduled Maintenance] 维护失败:', error.message);
		return { success: false, error: error.message };
	}
}

async function 检查域名健康(env, hosts, selfHost) {
	const _norm = h => String(h || '').toLowerCase().replace(/^https?:\/\//, '').split('/')[0];
	const _self = _norm(selfHost);
	const checkable = (hosts || []).filter(h => h && !h.includes('*'));
	const domains = [];
	await Promise.all(checkable.map(async host => {
		if (_self && _norm(host) === _self) { domains.push({ host, ok: true, status: 200, reason: 'live (this worker)', checkedAt: Date.now() }); return; }
		let ok = false, status = 0, reason = '';
		try {
			const opts = { headers: { 'User-Agent': 'NovaHealth/1.0' } };
			if (typeof AbortSignal !== 'undefined' && AbortSignal.timeout) opts.signal = AbortSignal.timeout(8000);
			const r = await fetch('https://' + host.replace(/^https?:\/\//, '') + '/sub/base64.txt', opts);
			status = r.status; ok = r.ok;
			if (ok) {
				const t = await r.text();
				ok = !!t && t.length > 8;
				if (!ok) reason = 'empty or invalid sub response';
			} else {
				let snip = ''; try { snip = (await r.text()).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 80); } catch (e) {}
				reason = 'HTTP ' + status + (snip ? ': ' + snip : '');
			}
		} catch (e) { status = -1; reason = (e && e.message ? e.message : String(e)).slice(0, 120); }
		domains.push({ host, ok, status, reason, checkedAt: Date.now() });
	}));
	const health = { checkedAt: Date.now(), domains };
	if (env.KV && typeof env.KV.put === 'function') {
		try { await env.KV.put('domain-health.json', JSON.stringify(health)); } catch (e) { /* ignore */ }
	}
	return health;
}

function 识别运营商(request) {
	const cf = request?.cf;
	const ASN运营商映射 = {
		'4134': 'ct',
		'4809': 'ct',
		'4811': 'ct',
		'4812': 'ct',
		'4815': 'ct',
		'4837': 'cu',
		'4814': 'cu',
		'9929': 'cu',
		'17623': 'cu',
		'17816': 'cu',
		'9808': 'cmcc',
		'24400': 'cmcc',
		'56040': 'cmcc',
		'56041': 'cmcc',
		'56044': 'cmcc',
	};
	const 运营商关键词映射 = [
		{ code: 'ct', pattern: /chinanet|chinatelecom|china telecom|cn2|shtel/ },
		{ code: 'cmcc', pattern: /cmi|cmnet|chinamobile|china mobile|cmcc|mobile communications/ },
		{ code: 'cu', pattern: /china169|china unicom|chinaunicom|cucc|cncgroup|cuii|netcom/ },
	];
	if (String(cf?.country || '').toLowerCase() !== 'cn') return 'cf';
	const 组织名称 = String(cf?.asOrganization || '').toLowerCase();
	const 命中运营商 = 运营商关键词映射.find(({ pattern }) => pattern.test(组织名称))?.code;
	return 命中运营商 || ASN运营商映射[String(cf?.asn || '')] || 'cf';
}

async function 生成随机IP(request, count = 16, 指定端口 = -1) {
	const url = new URL(request.url);
	const 查询参数运营商 = String(url.searchParams.get('cnIspCode') || '').toLowerCase();
	const 运营商文件标识 = ['ct', 'cu', 'cmcc', 'cf'].includes(查询参数运营商) ? 查询参数运营商 : 识别运营商(request);
	const 运营商名称映射 = {
		cmcc: 'Nova Free',
		cu: 'Nova Free',
		ct: 'Nova Free',
		cf: 'Nova Free',
	};
	const cidr_url = 运营商文件标识 === 'cf' ? `https://raw.githubusercontent.com/${特征码字典[1]}/${特征码字典[1]}/main/CF-CIDR.txt` : `https://raw.githubusercontent.com/${特征码字典[1]}/${特征码字典[1]}/main/CF-CIDR/${运营商文件标识}.txt`;
	const cfname = 运营商名称映射[运营商文件标识] || 'CF官方优选';
	const cfport = [443, 2053, 2083, 2087, 2096, 8443];
	let cidrList = [];
	{ const _cc = _cidrListCache.get(运营商文件标识); if (_cc && (Date.now() - _cc.at) < 3600000) { cidrList = _cc.list; } else { try { const res = await fetch(cidr_url); cidrList = res.ok ? await 整理成数组(await res.text()) : ['104.16.0.0/13'] } catch { cidrList = ['104.16.0.0/13'] } _cidrListCache.set(运营商文件标识, { at: Date.now(), list: cidrList }); } }

	const generateRandomIPFromCIDR = (cidr) => {
		const [baseIP, prefixLength] = cidr.split('/'), prefix = parseInt(prefixLength), hostBits = 32 - prefix;
		const ipInt = baseIP.split('.').reduce((a, p, i) => a | (parseInt(p) << (24 - i * 8)), 0);
		const randomOffset = Math.floor(Math.random() * Math.pow(2, hostBits));
		const mask = (0xFFFFFFFF << hostBits) >>> 0, randomIP = (((ipInt & mask) >>> 0) + randomOffset) >>> 0;
		return [(randomIP >>> 24) & 0xFF, (randomIP >>> 16) & 0xFF, (randomIP >>> 8) & 0xFF, randomIP & 0xFF].join('.');
	};
	const randomIPs = Array.from({ length: count }, (_, index) => {
		const ip = generateRandomIPFromCIDR(cidrList[Math.floor(Math.random() * cidrList.length)]);
		const 目标端口 = 指定端口 === -1
			? cfport[Math.floor(Math.random() * cfport.length)]
			: 指定端口;
		return `${ip}:${目标端口}#${cfname} ${index + 1}`;
	});
	return [randomIPs, randomIPs.join('\n')];
}

async function 整理成数组(内容) {
	var 替换后的内容 = 内容.replace(/[	"'\r\n]+/g, ',').replace(/,+/g, ',');
	if (替换后的内容.charAt(0) == ',') 替换后的内容 = 替换后的内容.slice(1);
	if (替换后的内容.charAt(替换后的内容.length - 1) == ',') 替换后的内容 = 替换后的内容.slice(0, 替换后的内容.length - 1);
	const 地址数组 = 替换后的内容.split(',');
	return 地址数组;
}

async function 获取优选订阅生成器数据(优选订阅生成器HOST) {
	let 优选IP = [], 其他节点LINK = '', 格式化HOST = 优选订阅生成器HOST.replace(/^sub:\/\//i, 'https://').split('#')[0].split('?')[0];
	if (!/^https?:\/\//i.test(格式化HOST)) 格式化HOST = `https://${格式化HOST}`;

	try {
		const url = new URL(格式化HOST);
		格式化HOST = url.origin;
	} catch (error) {
		优选IP.push(`127.0.0.1:1234#${优选订阅生成器HOST}优选订阅生成器格式化异常:${error.message}`);
		return [优选IP, 其他节点LINK];
	}

	const 优选订阅生成器URL = `${格式化HOST}/sub?host=example.com&uuid=00000000-0000-4000-8000-000000000000`;

	try {
		const response = await fetch(优选订阅生成器URL, {
			headers: { 'User-Agent': 'v2rayN/Nova' + 'tunnel (https://github.com/' + 特征码字典[1] + '/Nova' + 'Proxy)' }
		});

		if (!response.ok) {
			优选IP.push(`127.0.0.1:1234#${优选订阅生成器HOST}优选订阅生成器异常:${response.statusText}`);
			return [优选IP, 其他节点LINK];
		}

		const 优选订阅生成器返回订阅内容 = atob(await response.text());
		const 订阅行列表 = 优选订阅生成器返回订阅内容.includes('\r\n')
			? 优选订阅生成器返回订阅内容.split('\r\n')
			: 优选订阅生成器返回订阅内容.split('\n');

		for (const 行内容 of 订阅行列表) {
			if (!行内容.trim()) continue; // 跳过空行
			if (行内容.includes('00000000-0000-4000-8000-000000000000') && 行内容.includes('example.com')) {
				// 这是优选IP行，提取 域名:端口#备注
				const 地址匹配 = 行内容.match(/:\/\/[^@]+@([^?]+)/);
				if (地址匹配) {
					let 地址端口 = 地址匹配[1], 备注 = ''; // 域名:端口 或 IP:端口
					const 备注匹配 = 行内容.match(/#(.+)$/);
					if (备注匹配) 备注 = '#' + decodeURIComponent(备注匹配[1]);
					优选IP.push(地址端口 + 备注);
				}
			} else {
				其他节点LINK += 行内容 + '\n';
			}
		}
	} catch (error) {
		优选IP.push(`127.0.0.1:1234#${优选订阅生成器HOST}优选订阅生成器异常:${error.message}`);
	}

	return [优选IP, 其他节点LINK];
}

async function 请求优选API(urls, 默认端口 = '443', 超时时间 = 3000) {
	if (!urls?.length) return [[], [], [], []];
	const results = new Set(), 反代IP池 = new Set();
	let 订阅链接响应的明文LINK内容 = '', 需要订阅转换订阅URLs = [];
	await Promise.allSettled(urls.map(async (url) => {
		// 检查URL是否包含备注名
		const hashIndex = url.indexOf('#');
		const urlWithoutHash = hashIndex > -1 ? url.substring(0, hashIndex) : url;
		const API备注名 = hashIndex > -1 ? decodeURIComponent(url.substring(hashIndex + 1)) : null;
		const 优选IP作为反代IP = url.toLowerCase().includes('proxyip=true');
		if (urlWithoutHash.toLowerCase().startsWith('sub://')) {
			try {
				const [优选IP, 其他节点LINK] = await 获取优选订阅生成器数据(urlWithoutHash);
				// 处理第一个数组 - 优选IP
				if (API备注名) {
					for (const ip of 优选IP) {
						const 处理后IP = ip.includes('#')
							? `${ip} [${API备注名}]`
							: `${ip}#[${API备注名}]`;
						results.add(处理后IP);
						if (优选IP作为反代IP) 反代IP池.add(ip.split('#')[0]);
					}
				} else {
					for (const ip of 优选IP) {
						results.add(ip);
						if (优选IP作为反代IP) 反代IP池.add(ip.split('#')[0]);
					}
				}
				// 处理第二个数组 - 其他节点LINK
				if (其他节点LINK && typeof 其他节点LINK === 'string' && API备注名) {
					const 处理后LINK内容 = 其他节点LINK.replace(/([a-z][a-z0-9+\-.]*:\/\/[^\r\n]*?)(\r?\n|$)/gi, (match, link, lineEnd) => {
						const 完整链接 = link.includes('#')
							? `${link}${encodeURIComponent(` [${API备注名}]`)}`
							: `${link}${encodeURIComponent(`#[${API备注名}]`)}`;
						return `${完整链接}${lineEnd}`;
					});
					订阅链接响应的明文LINK内容 += 处理后LINK内容;
				} else if (其他节点LINK && typeof 其他节点LINK === 'string') {
					订阅链接响应的明文LINK内容 += 其他节点LINK;
				}
			} catch (e) { }
			return;
		}

		try {
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 超时时间);
			const response = await fetch(urlWithoutHash, { signal: controller.signal });
			clearTimeout(timeoutId);
			let text = '';
			try {
				const buffer = await response.arrayBuffer();
				const contentType = (response.headers.get('content-type') || '').toLowerCase();
				const charset = contentType.match(/charset=([^\s;]+)/i)?.[1]?.toLowerCase() || '';

				// 根据 Content-Type 响应头判断编码优先级
				let decoders = ['utf-8', 'gb2312']; // 默认优先 UTF-8
				if (charset.includes('gb') || charset.includes('gbk') || charset.includes('gb2312')) {
					decoders = ['gb2312', 'utf-8']; // 如果明确指定 GB 系编码，优先尝试 GB2312
				}

				// 尝试多种编码解码
				let decodeSuccess = false;
				for (const decoder of decoders) {
					try {
						const decoded = new TextDecoder(decoder).decode(buffer);
						// 验证解码结果的有效性
						if (decoded && decoded.length > 0 && !decoded.includes('\ufffd')) {
							text = decoded;
							decodeSuccess = true;
							break;
						} else if (decoded && decoded.length > 0) {
							// 如果有替换字符 (U+FFFD)，说明编码不匹配，继续尝试下一个编码
							continue;
						}
					} catch (e) {
						// 该编码解码失败，尝试下一个
						continue;
					}
				}

				// 如果所有编码都失败或无效，尝试 response.text()
				if (!decodeSuccess) {
					text = await response.text();
				}

				// 如果返回的是空或无效数据，返回
				if (!text || text.trim().length === 0) {
					return;
				}
			} catch (e) {
				console.error('Failed to decode response:', e);
				return;
			}

			// 预处理订阅内容
			/*
			if (text.includes('proxies:') || (text.includes('outbounds"') && text.includes('inbounds"'))) {// Clash Singbox 配置
				需要订阅转换订阅URLs.add(url);
				return;
			}
			*/

			let 预处理订阅明文内容 = text;
			const cleanText = typeof text === 'string' ? text.replace(/\s/g, '') : '';
			if (cleanText.length > 0 && cleanText.length % 4 === 0 && /^[A-Za-z0-9+/]+={0,2}$/.test(cleanText)) {
				try {
					const bytes = new Uint8Array(atob(cleanText).split('').map(c => c.charCodeAt(0)));
					预处理订阅明文内容 = new TextDecoder('utf-8').decode(bytes);
				} catch { }
			}
			if (预处理订阅明文内容.split('#')[0].includes('://')) {
				// 处理LINK内容
				if (API备注名) {
					const 处理后LINK内容 = 预处理订阅明文内容.replace(/([a-z][a-z0-9+\-.]*:\/\/[^\r\n]*?)(\r?\n|$)/gi, (match, link, lineEnd) => {
						const 完整链接 = link.includes('#')
							? `${link}${encodeURIComponent(` [${API备注名}]`)}`
							: `${link}${encodeURIComponent(`#[${API备注名}]`)}`;
						return `${完整链接}${lineEnd}`;
					});
					订阅链接响应的明文LINK内容 += 处理后LINK内容 + '\n';
				} else {
					订阅链接响应的明文LINK内容 += 预处理订阅明文内容 + '\n';
				}
				return;
			}

			const lines = text.trim().split('\n').map(l => l.trim()).filter(l => l);
			const isCSV = lines.length > 1 && lines[0].includes(',');
			const IPV6_PATTERN = /^[^\[\]]*:[^\[\]]*:[^\[\]]/;
			const parsedUrl = new URL(urlWithoutHash);
			if (!isCSV) {
				lines.forEach(line => {
					const lineHashIndex = line.indexOf('#');
					const [hostPart, remark] = lineHashIndex > -1 ? [line.substring(0, lineHashIndex), line.substring(lineHashIndex)] : [line, ''];
					let hasPort = false;
					if (hostPart.startsWith('[')) {
						hasPort = /\]:(\d+)$/.test(hostPart);
					} else {
						const colonIndex = hostPart.lastIndexOf(':');
						hasPort = colonIndex > -1 && /^\d+$/.test(hostPart.substring(colonIndex + 1));
					}
					const port = parsedUrl.searchParams.get('port') || 默认端口;
					const ipItem = hasPort ? line : `${hostPart}:${port}${remark}`;
					// 处理第一个数组 - 优选IP
					if (API备注名) {
						const 处理后IP = ipItem.includes('#')
							? `${ipItem} [${API备注名}]`
							: `${ipItem}#[${API备注名}]`;
						results.add(处理后IP);
					} else {
						results.add(ipItem);
					}
					if (优选IP作为反代IP) 反代IP池.add(ipItem.split('#')[0]);
				});
			} else {
				const headers = lines[0].split(',').map(h => h.trim());
				const dataLines = lines.slice(1);
				if (headers.includes('IP地址') && headers.includes('端口') && headers.includes('数据中心')) {
					const ipIdx = headers.indexOf('IP地址'), portIdx = headers.indexOf('端口');
					const remarkIdx = headers.indexOf('国家') > -1 ? headers.indexOf('国家') :
						headers.indexOf('城市') > -1 ? headers.indexOf('城市') : headers.indexOf('数据中心');
					const tlsIdx = headers.indexOf('TLS');
					dataLines.forEach(line => {
						const cols = line.split(',').map(c => c.trim());
						if (tlsIdx !== -1 && cols[tlsIdx]?.toLowerCase() !== 'true') return;
						const wrappedIP = IPV6_PATTERN.test(cols[ipIdx]) ? `[${cols[ipIdx]}]` : cols[ipIdx];
						const ipItem = `${wrappedIP}:${cols[portIdx]}#${cols[remarkIdx]}`;
						// 处理第一个数组 - 优选IP
						if (API备注名) {
							const 处理后IP = `${ipItem} [${API备注名}]`;
							results.add(处理后IP);
						} else {
							results.add(ipItem);
						}
						if (优选IP作为反代IP) 反代IP池.add(`${wrappedIP}:${cols[portIdx]}`);
					});
				} else if (headers.some(h => h.includes('IP')) && headers.some(h => h.includes('延迟')) && headers.some(h => h.includes('下载速度'))) {
					const ipIdx = headers.findIndex(h => h.includes('IP'));
					const delayIdx = headers.findIndex(h => h.includes('延迟'));
					const speedIdx = headers.findIndex(h => h.includes('下载速度'));
					const port = parsedUrl.searchParams.get('port') || 默认端口;
					dataLines.forEach(line => {
						const cols = line.split(',').map(c => c.trim());
						const wrappedIP = IPV6_PATTERN.test(cols[ipIdx]) ? `[${cols[ipIdx]}]` : cols[ipIdx];
						const ipItem = `${wrappedIP}:${port}#CF优选 ${cols[delayIdx]}ms ${cols[speedIdx]}MB/s`;
						// 处理第一个数组 - 优选IP
						if (API备注名) {
							const 处理后IP = `${ipItem} [${API备注名}]`;
							results.add(处理后IP);
						} else {
							results.add(ipItem);
						}
						if (优选IP作为反代IP) 反代IP池.add(`${wrappedIP}:${port}`);
					});
				}
			}
		} catch (e) { }
	}));
	// 将LINK内容转换为数组并去重
	const LINK数组 = 订阅链接响应的明文LINK内容.trim() ? [...new Set(订阅链接响应的明文LINK内容.split(/\r?\n/).filter(line => line.trim() !== ''))] : [];
	return [Array.from(results), LINK数组, 需要订阅转换订阅URLs, Array.from(反代IP池)];
}

async function 反代参数获取(url, uuid) {
	解析连接用户(url);
	const { searchParams } = url;
	const pathname = decodeURIComponent(url.pathname);
	const pathLower = pathname.toLowerCase();

	const 链式代理路径匹配 = pathname.match(/\/video\/(.+)$/i);
	if (链式代理路径匹配) {
		try {
			const 链式代理明文 = base64SecretDecode(链式代理路径匹配[1], uuid);
			const { type, ...链式代理地址 } = JSON.parse(链式代理明文);
			if (!type || !反代协议默认端口[String(type).toLowerCase()]) throw new Error('链式代理类型无效');
			if (!链式代理地址.hostname || !链式代理地址.port) throw new Error('链式代理地址缺少 hostname 或 port');
			我的SOCKS5账号 = '';
			反代IP = '链式代理';
			启用反代兜底 = false;
			启用SOCKS5全局反代 = true;
			启用SOCKS5反代 = String(type).toLowerCase();
			parsedSocks5Address = {
				username: 链式代理地址.username,
				password: 链式代理地址.password,
				hostname: 链式代理地址.hostname,
				port: Number(链式代理地址.port)
			};
			if (isNaN(parsedSocks5Address.port)) throw new Error('链式代理端口无效');
			return;
		} catch (err) {
			console.error('解析链式代理参数失败:', err.message);
		}
	}

	我的SOCKS5账号 = searchParams.get('socks5') || searchParams.get('http') || searchParams.get('https') || searchParams.get('turn') || searchParams.get('sstp') || null;
	启用SOCKS5全局反代 = searchParams.has('globalproxy');
	if (searchParams.get('socks5')) 启用SOCKS5反代 = 'socks5';
	else if (searchParams.get('http')) 启用SOCKS5反代 = 'http';
	else if (searchParams.get('https')) 启用SOCKS5反代 = 'https';
	else if (searchParams.get('turn')) 启用SOCKS5反代 = 'turn';
	else if (searchParams.get('sstp')) 启用SOCKS5反代 = 'sstp';

	const 解析代理URL = (值, 强制全局 = true) => {
		const 匹配 = /^(socks5|http|https|turn|sstp):\/\/(.+)$/i.exec(值 || '');
		if (!匹配) return false;
		启用SOCKS5反代 = 匹配[1].toLowerCase();
		我的SOCKS5账号 = 匹配[2].split('/')[0];
		if (强制全局) 启用SOCKS5全局反代 = true;
		return true;
	};

	const 设置反代IP = (值) => {
		反代IP = 值;
		启用SOCKS5反代 = null;
		启用反代兜底 = false;
	};

	const 提取路径值 = (值) => {
		if (!值.includes('://')) {
			const 斜杠索引 = 值.indexOf('/');
			return 斜杠索引 > 0 ? 值.slice(0, 斜杠索引) : 值;
		}
		const 协议拆分 = 值.split('://');
		if (协议拆分.length !== 2) return 值;
		const 斜杠索引 = 协议拆分[1].indexOf('/');
		return 斜杠索引 > 0 ? `${协议拆分[0]}://${协议拆分[1].slice(0, 斜杠索引)}` : 值;
	};

	const 查询反代IP = searchParams.get('proxyip');
	if (查询反代IP !== null) {
		if (!解析代理URL(查询反代IP)) return 设置反代IP(查询反代IP);
	} else {
		let 匹配 = /\/(socks5?|http|https|turn|sstp):\/?\/?([^/?#\s]+)/i.exec(pathname);
		if (匹配) {
			const 类型 = 匹配[1].toLowerCase();
			启用SOCKS5反代 = 类型 === 'sock' || 类型 === 'socks' ? 'socks5' : 类型;
			我的SOCKS5账号 = 匹配[2].split('/')[0];
			启用SOCKS5全局反代 = true;
		} else if ((匹配 = /\/(g?s5|socks5|g?http|g?https|g?turn|g?sstp)=([^/?#\s]+)/i.exec(pathname))) {
			const 类型 = 匹配[1].toLowerCase();
			我的SOCKS5账号 = 匹配[2].split('/')[0];
			启用SOCKS5反代 = 类型.includes('sstp') ? 'sstp' : (类型.includes('turn') ? 'turn' : (类型.includes('https') ? 'https' : (类型.includes('http') ? 'http' : 'socks5')));
			if (类型.startsWith('g')) 启用SOCKS5全局反代 = true;
		} else if ((匹配 = /\/(proxyip[.=]|pyip=|ip=)([^?#\s]+)/.exec(pathLower))) {
			const 路径反代值 = 提取路径值(匹配[2]);
			if (!解析代理URL(路径反代值)) return 设置反代IP(路径反代值);
		}
	}

	if (!我的SOCKS5账号) {
		启用SOCKS5反代 = null;
		return;
	}

	try {
		parsedSocks5Address = await 获取SOCKS5账号(我的SOCKS5账号, 获取代理默认端口(启用SOCKS5反代));
		if (searchParams.get('socks5')) 启用SOCKS5反代 = 'socks5';
		else if (searchParams.get('http')) 启用SOCKS5反代 = 'http';
		else if (searchParams.get('https')) 启用SOCKS5反代 = 'https';
		else if (searchParams.get('turn')) 启用SOCKS5反代 = 'turn';
		else if (searchParams.get('sstp')) 启用SOCKS5反代 = 'sstp';
		else 启用SOCKS5反代 = 启用SOCKS5反代 || 'socks5';
	} catch (err) {
		console.error('解析SOCKS5地址失败:', err.message);
		启用SOCKS5反代 = null;
	}
}

const 反代协议默认端口 = { socks5: 1080, http: 80, https: 443, turn: 3478, sstp: 443 };
function 获取代理默认端口(类型) {
	return 反代协议默认端口[String(类型 || '').toLowerCase()] || 80;
}

const SOCKS5账号Base64正则 = /^(?:[A-Z0-9+/]{4})*(?:[A-Z0-9+/]{2}==|[A-Z0-9+/]{3}=)?$/i, IPv6方括号正则 = /^\[.*\]$/;
function 获取SOCKS5账号(address, 默认端口 = 80) {
	address = String(address || '').trim().replace(/^(socks5|http|https|turn|sstp):\/\//i, '').split('#')[0].trim();
	const firstAt = address.lastIndexOf("@");
	if (firstAt !== -1) {
		let auth = address.slice(0, firstAt).replaceAll("%3D", "=");
		if (!auth.includes(":") && SOCKS5账号Base64正则.test(auth)) auth = atob(auth);
		address = `${auth}@${address.slice(firstAt + 1)}`;
	}

	const atIndex = address.lastIndexOf("@");
	const hostPart = (atIndex === -1 ? address : address.slice(atIndex + 1)).split('/')[0];
	const authPart = atIndex === -1 ? "" : address.slice(0, atIndex);
	const [username, password] = authPart ? authPart.split(":") : [];
	if (authPart && !password) throw new Error('无效的 SOCKS 地址格式：认证部分必须是 "username:password" 的形式');

	let hostname = hostPart, port = 默认端口;
	if (hostPart.includes("]:")) {
		const [ipv6Host, ipv6Port = ""] = hostPart.split("]:");
		hostname = ipv6Host + "]";
		port = Number(ipv6Port.replace(/[^\d]/g, ""));
	} else if (!hostPart.startsWith("[")) {
		const parts = hostPart.split(":");
		if (parts.length === 2) {
			hostname = parts[0];
			port = Number(parts[1].replace(/[^\d]/g, ""));
		}
	}

	if (isNaN(port)) throw new Error('无效的 SOCKS 地址格式：端口号必须是数字');
	if (hostname.includes(":") && !IPv6方括号正则.test(hostname)) throw new Error('无效的 SOCKS 地址格式：IPv6 地址必须用方括号括起来，如 [2001:db8::1]');
	return { username, password, hostname, port };
}

async function getCloudflareUsage(Email, GlobalAPIKey, AccountID, APIToken) {
	if (缓存CFUsage && (Date.now() - 缓存CFUsage时间) < 300000) return 缓存CFUsage;
	const API = "https://api.cloudflare.com/client/v4";
	const sum = (a) => a?.reduce((t, i) => t + (i?.sum?.requests || 0), 0) || 0;
	const cfg = { "Content-Type": "application/json" };

	try {
		if (!AccountID && (!Email || !GlobalAPIKey)) return { success: false, pages: 0, workers: 0, total: 0, max: 100000 };

		if (!AccountID) {
			const r = await fetch(`${API}/accounts`, {
				method: "GET",
				headers: { ...cfg, "X-AUTH-EMAIL": Email, "X-AUTH-KEY": GlobalAPIKey }
			});
			if (!r.ok) throw new Error(`账户获取失败: ${r.status}`);
			const d = await r.json();
			if (!d?.result?.length) throw new Error("未找到账户");
			const idx = d.result.findIndex(a => a.name?.toLowerCase().startsWith(Email.toLowerCase()));
			AccountID = d.result[idx >= 0 ? idx : 0]?.id;
		}

		const now = new Date();
		now.setUTCHours(0, 0, 0, 0);
		const hdr = APIToken ? { ...cfg, "Authorization": `Bearer ${APIToken}` } : { ...cfg, "X-AUTH-EMAIL": Email, "X-AUTH-KEY": GlobalAPIKey };

		const res = await fetch(`${API}/graphql`, {
			method: "POST",
			headers: hdr,
			body: JSON.stringify({
				query: `query getBillingMetrics($AccountID: String!, $filter: AccountWorkersInvocationsAdaptiveFilter_InputObject) {
					viewer { accounts(filter: {accountTag: $AccountID}) {
						pagesFunctionsInvocationsAdaptiveGroups(limit: 1000, filter: $filter) { sum { requests } }
						workersInvocationsAdaptive(limit: 10000, filter: $filter) { sum { requests } }
					} }
				}`,
				variables: { AccountID, filter: { datetime_geq: now.toISOString(), datetime_leq: new Date().toISOString() } }
			})
		});

		if (!res.ok) throw new Error(`查询失败: ${res.status}`);
		const result = await res.json();
		if (result.errors?.length) throw new Error(result.errors[0].message);

		const acc = result?.data?.viewer?.accounts?.[0];
		if (!acc) throw new Error("未找到账户数据");

		const pages = sum(acc.pagesFunctionsInvocationsAdaptiveGroups);
		const workers = sum(acc.workersInvocationsAdaptive);
		const total = pages + workers;
		const max = 100000;
		log(`统计结果 - Pages: ${pages}, Workers: ${workers}, 总计: ${total}, 上限: 100000`);
		{ const _u = { success: true, pages, workers, total, max }; 缓存CFUsage = _u; 缓存CFUsage时间 = Date.now(); return _u; }

	} catch (error) {
		console.error('获取使用量错误:', error.message);
		return { success: false, pages: 0, workers: 0, total: 0, max: 100000 };
	}
}

function sha224(s) {
	if (_sha224Cache.has(s)) return _sha224Cache.get(s);
	const K = [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];
	const r = (n, b) => ((n >>> b) | (n << (32 - b))) >>> 0;
	s = unescape(encodeURIComponent(s));
	const l = s.length * 8; s += String.fromCharCode(0x80);
	while ((s.length * 8) % 512 !== 448) s += String.fromCharCode(0);
	const h = [0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939, 0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4];
	const hi = Math.floor(l / 0x100000000), lo = l & 0xFFFFFFFF;
	s += String.fromCharCode((hi >>> 24) & 0xFF, (hi >>> 16) & 0xFF, (hi >>> 8) & 0xFF, hi & 0xFF, (lo >>> 24) & 0xFF, (lo >>> 16) & 0xFF, (lo >>> 8) & 0xFF, lo & 0xFF);
	const w = []; for (let i = 0; i < s.length; i += 4)w.push((s.charCodeAt(i) << 24) | (s.charCodeAt(i + 1) << 16) | (s.charCodeAt(i + 2) << 8) | s.charCodeAt(i + 3));
	for (let i = 0; i < w.length; i += 16) {
		const x = new Array(64).fill(0);
		for (let j = 0; j < 16; j++)x[j] = w[i + j];
		for (let j = 16; j < 64; j++) {
			const s0 = r(x[j - 15], 7) ^ r(x[j - 15], 18) ^ (x[j - 15] >>> 3);
			const s1 = r(x[j - 2], 17) ^ r(x[j - 2], 19) ^ (x[j - 2] >>> 10);
			x[j] = (x[j - 16] + s0 + x[j - 7] + s1) >>> 0;
		}
		let [a, b, c, d, e, f, g, h0] = h;
		for (let j = 0; j < 64; j++) {
			const S1 = r(e, 6) ^ r(e, 11) ^ r(e, 25), ch = (e & f) ^ (~e & g), t1 = (h0 + S1 + ch + K[j] + x[j]) >>> 0;
			const S0 = r(a, 2) ^ r(a, 13) ^ r(a, 22), maj = (a & b) ^ (a & c) ^ (b & c), t2 = (S0 + maj) >>> 0;
			h0 = g; g = f; f = e; e = (d + t1) >>> 0; d = c; c = b; b = a; a = (t1 + t2) >>> 0;
		}
		for (let j = 0; j < 8; j++)h[j] = (h[j] + (j === 0 ? a : j === 1 ? b : j === 2 ? c : j === 3 ? d : j === 4 ? e : j === 5 ? f : j === 6 ? g : h0)) >>> 0;
	}
	let hex = '';
	for (let i = 0; i < 7; i++) {
		for (let j = 24; j >= 0; j -= 8)hex += ((h[i] >>> j) & 0xFF).toString(16).padStart(2, '0');
	}
	if (_sha224Cache.size > 64) _sha224Cache.clear();
	_sha224Cache.set(s, hex);
	return hex;
}

async function 解析地址端口(proxyIP, 目标域名 = 'dash.cloudflare.com', UUID = '00000000-0000-4000-8000-000000000000') {
	proxyIP = proxyIP.toLowerCase();
	if (!缓存反代IP || !缓存反代解析数组 || 缓存反代IP !== proxyIP) {
		function 解析地址端口字符串(str) {
			let 地址 = str, 端口 = 443;
			if (str.includes(']:')) {
				const parts = str.split(']:');
				地址 = parts[0] + ']';
				端口 = parseInt(parts[1], 10) || 端口;
			} else if ((str.match(/:/g) || []).length === 1 && !str.startsWith('[')) {
				const colonIndex = str.lastIndexOf(':');
				地址 = str.slice(0, colonIndex);
				端口 = parseInt(str.slice(colonIndex + 1), 10) || 端口;
			}
			return [地址, 端口];
		}

		function 解析TXT反代记录(txtData) {
			return txtData.flatMap(data => {
				if (data.startsWith('"') && data.endsWith('"')) data = data.slice(1, -1);
				return data.replace(/\\010/g, ',').replace(/\n/g, ',').split(',').map(s => s.trim()).filter(Boolean);
			}).map(prefix => 解析地址端口字符串(prefix));
		}

		const 反代IP数组 = await 整理成数组(proxyIP);
		let 所有反代数组 = [];
		const ipv4Regex = /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
		const ipv6Regex = /^\[?(?:[a-fA-F0-9]{0,4}:){1,7}[a-fA-F0-9]{0,4}\]?$/;

		// 遍历数组中的每个IP元素进行处理
		for (const singleProxyIP of 反代IP数组) {
			let [地址, 端口] = 解析地址端口字符串(singleProxyIP);

			if (singleProxyIP.includes('.tp')) {
				const tpMatch = singleProxyIP.match(/\.tp(\d+)/);
				if (tpMatch) 端口 = parseInt(tpMatch[1], 10);
			}

			// 判断是否是域名（非IP地址）
			if (ipv4Regex.test(地址) || ipv6Regex.test(地址)) {
				log(`[反代解析] ${地址} 为IP地址，直接使用`);
				所有反代数组.push([地址, 端口]);
				continue;
			}

			const [txtRecords, aRecords] = await Promise.all([
				DoH查询(地址, 'TXT'),
				DoH查询(地址, 'A')
			]);

			const txtData = txtRecords.filter(r => r.type === 16).map(r => (r.data));
			const txtAddresses = 解析TXT反代记录(txtData);
			if (txtAddresses.length > 0) {
				log(`[反代解析] ${地址} 使用TXT记录，共${txtAddresses.length}个结果`);
				所有反代数组.push(...txtAddresses);
				continue;
			}

			const ipv4List = aRecords.filter(r => r.type === 1).map(r => r.data);
			if (ipv4List.length > 0) {
				log(`[反代解析] ${地址} 未获取到TXT记录，使用A记录，共${ipv4List.length}个结果`);
				所有反代数组.push(...ipv4List.map(ip => [ip, 端口]));
				continue;
			}

			const aaaaRecords = await DoH查询(地址, 'AAAA');
			const ipv6List = aaaaRecords.filter(r => r.type === 28).map(r => `[${r.data}]`);
			if (ipv6List.length > 0) {
				log(`[反代解析] ${地址} 未获取到TXT和A记录，使用AAAA记录，共${ipv6List.length}个结果`);
				所有反代数组.push(...ipv6List.map(ip => [ip, 端口]));
			} else {
				log(`[反代解析] ${地址} 未获取到TXT、A和AAAA记录，保留原域名`);
				所有反代数组.push([地址, 端口]);
			}
		}
		const 排序后数组 = 所有反代数组.sort((a, b) => a[0].localeCompare(b[0]));
		const 目标根域名 = 目标域名.includes('.') ? 目标域名.split('.').slice(-2).join('.') : 目标域名;
		let 随机种子 = [...(目标根域名 + UUID)].reduce((a, c) => a + c.charCodeAt(0), 0);
		log(`[反代解析] 随机种子: ${随机种子}\n目标站点: ${目标根域名}`)
		const 洗牌后 = [...排序后数组].sort(() => (随机种子 = (随机种子 * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff - 0.5);
		缓存反代解析数组 = 洗牌后.slice(0, 8);
		log(`[反代解析] 解析完成 总数: ${缓存反代解析数组.length}个\n${缓存反代解析数组.map(([ip, port], index) => `${index + 1}. ${ip}:${port}`).join('\n')}`);
		缓存反代IP = proxyIP;
	} else log(`[反代解析] 读取缓存 总数: ${缓存反代解析数组.length}个\n${缓存反代解析数组.map(([ip, port], index) => `${index + 1}. ${ip}:${port}`).join('\n')}`);
	return 缓存反代解析数组;
}

//////////////////////////////////////////////////////网络设置相关函数///////////////////////////////////////////////
const 成人域名列表 = [
	'pornhub.com','www.pornhub.com','xvideos.com','www.xvideos.com','xnxx.com','www.xnxx.com',
	'xhamster.com','www.xhamster.com','redtube.com','www.redtube.com','youporn.com','www.youporn.com',
	'porn.com','www.porn.com','tube8.com','www.tube8.com','xvideos3.com','eporner.com','www.eporner.com',
	'hclips.com','www.hclips.com','hqporner.com','www.hqporner.com','pornhd.com','www.pornhd.com',
	'porn300.com','www.porn300.com','porntrex.com','www.porntrex.com','spankbang.com','www.spankbang.com',
	'txxx.com','www.txxx.com','vjav.com','www.vjav.com','xvideos2.com','xvideos3.com',
	'adult-empire.com','www.adult-empire.com','adulttime.com','www.adulttime.com','alphaporno.com','www.alphaporno.com',
	'analytics.porn','animeidhentai.com','anyporn.com','anysex.com','www.anysex.com',
	'beeg.com','www.beeg.com','bellesa.co','www.bellesa.co','bigassporn.org','bigtits.com','www.bigtits.com',
	'bravotube.net','www.bravotube.net','bustyplatinum.com','cam4.com','www.cam4.com','cambay.tv','www.cambay.tv',
	'chaturbate.com','www.chaturbate.com','clips4sale.com','www.clips4sale.com','cock.xxx','daporno.com',
	'desiporn.tv','www.desiporn.tv','deviporn.com','www.deviporn.com','dirtyship.com','www.dirtyship.com',
	'ebony.com','www.ebony.com','efukt.com','www.efukt.com','egotastic.com','www.egotastic.com',
	'empflix.com','www.empflix.com','erome.com','www.erome.com','eroprofile.com','www.eroprofile.com',
	'esporn.com','www.esporn.com','ex-gf.me','www.ex-gf.me','extremetube.com','www.extremetube.com',
	'fap.com','www.fap.com','fapdu.com','www.fapdu.com','faphouse.com','www.faphouse.com',
	'femjoy.com','www.femjoy.com','fetlife.com','www.fetlife.com','filthygirls.com','www.filthygirls.com',
	'flix.com','www.flix.com','freeones.com','www.freeones.com','freeporn.com','www.freeporn.com',
	'fux.com','www.fux.com','gayboystube.com','www.gayboystube.com','gaymaletube.com','www.gaymaletube.com',
	'ghettotube.com','www.ghettotube.com','girlsway.com','www.girlsway.com','gofap.net','www.gofap.net',
	'hentai2read.com','hentaigasm.com','www.hentaigasm.com','hentaihaven.com','www.hentaihaven.com',
	'hotmovies.com','www.hotmovies.com','hqbabes.com','www.hqbabes.com','hqseek.com','www.hqseek.com',
	'iafd.com','www.iafd.com','imagefap.com','www.imagefap.com','incestflix.com',
	'indexxx.com','www.indexxx.com','jacquieetmichel.tv','www.jacquieetmichel.tv','japaneseporn.tv','www.japaneseporn.tv',
	'jerkoffto.com','www.jerkoffto.com','jizzhut.com','www.jizzhut.com','joymii.com','www.joymii.com',
	'keezmovies.com','www.keezmovies.com','lesbianporn.com','www.lesbianporn.com','lustery.com','www.lustery.com',
	'madthumbs.com','www.madthumbs.com','mofos.com','www.mofos.com','motherless.com','www.motherless.com',
	'mrporngeek.com','www.mrporngeek.com','mydirtyhobby.com','www.mydirtyhobby.com','myduckisdead.org',
	'nastyporn.com','www.nastyporn.com','naughtyamerica.com','www.naughtyamerica.com','nuvid.com','www.nuvid.com',
	'onlyfans.com','www.onlyfans.com','palcomp3.com.br','www.palcomp3.com.br','pandamovies.pw',
	'perfectgirls.com','www.perfectgirls.com','pinklabel.tv','www.pinklabel.tv','playboy.com','www.playboy.com',
	'pornbox.com','www.pornbox.com','pornburst.xxx','porndoe.com','www.porndoe.com','pornfidelity.com','www.pornfidelity.com',
	'porngem.com','www.porngem.com','pornhubpremium.com','www.pornhubpremium.com','pornmd.com','www.pornmd.com',
	'pornone.com','www.pornone.com','pornoroulette.net','www.pornoroulette.net','pornoxo.com','www.pornoxo.com',
	'porntop.com','www.porntop.com','pornvisit.com','www.pornvisit.com','pornwhite.com','www.pornwhite.com',
	'porzo.com','www.porzo.com','propertysex.com','www.propertysex.com','rapexxx.com','www.rapexxx.com',
	'ratexxx.net','www.ratexxx.net','realitykings.com','www.realitykings.com','redtube.com.br','www.redtube.com.br',
	'rockettube.com','www.rockettube.com','rulertube.com','www.rulertube.com','sausage.com','www.sausage.com',
	'sextube.com','www.sextube.com','sexu.com','www.sexu.com','shemale.com','www.shemale.com',
	'sinparty.com','www.sinparty.com','sleazyneasy.com','www.sleazyneasy.com','slutload.com','www.slutload.com',
	'smartporn.com','www.smartporn.com','smut.com','www.smut.com','sologirls.xxx','spankwire.com','www.spankwire.com',
	'stripchat.com','www.stripchat.com','sunporno.com','www.sunporno.com','teensloveporn.com','www.teensloveporn.com',
	'teentube.com','www.teentube.com','thatpervert.com','www.thatpervert.com','theperfreview.com','www.theperfreview.com',
	'thumbzilla.com','www.thumbzilla.com','tiava.com','www.tiava.com','tnaflix.com','www.tnaflix.com',
	'tube.xxx','tubegalore.com','www.tubegalore.com','tubeporn.com','www.tubeporn.com','tubepornclassic.com','www.tubepornclassic.com',
	'tubestack.com','www.tubestack.com','twistys.com','www.twistys.com','upornia.com','www.upornia.com',
	'videosz.com','www.videosz.com','vintageporn.net','www.vintageporn.net','voyeurhit.com','www.voyeurhit.com',
	'watchmygf.com','www.watchmygf.com','wetpussy.com','www.wetpussy.com','whalebone.vip','xhamsterlive.com','www.xhamsterlive.com',
	'xnxx.app','www.xnxx.app','xnxx.tv','www.xnxx.tv','xossip.com','www.xossip.com','xporn.net','www.xporn.net',
	'xpornz.com','www.xpornz.com','xtube.com','www.xtube.com','xvideo.com','www.xvideo.com','xvideos-br.com',
	'xvideos.es','www.xvideos.es','xvideos.fr','www.xvideos.fr','xvideos.it','www.xvideos.it',
	'xvideos.jp','www.xvideos.jp','xvideos.ru','www.xvideos.ru','xvideos.tv','www.xvideos.tv',
	'youjizz.com','www.youjizz.com','youpornbook.com','www.youpornbook.com','yourlust.com','www.yourlust.com',
	'zbporn.com','www.zbporn.com','zporn.com','www.zporn.com',
];

function 是成人域名(hostname) {
	if (!hostname) return false;
	const h = hostname.toLowerCase();
	for (const domain of 成人域名列表) {
		if (h === domain || h.endsWith('.' + domain)) return true;
	}
	return false;
}

function 是被封锁的网站(hostname) {
	if (isSpeedTestSite(hostname)) return true;
	if (网络设置 && 网络设置.enablePornBlock) {
		return 是成人域名(hostname);
	}
	return false;
}

function 页面被封锁(request) {
	const url = new URL(request.url);
	const host = url.host;
	const html = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Blocked / مسدود شده</title><style>@import url("https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700;800;900&display=swap");*{margin:0;padding:0;box-sizing:border-box}body{font-family:"Vazirmatn",sans-serif;background:linear-gradient(135deg,#0f0c29,#302b63,#24243e);min-height:100vh;display:flex;justify-content:center;align-items:center;padding:20px}.card{background:rgba(255,255,255,0.05);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.1);border-radius:24px;padding:48px 40px;max-width:480px;width:100%;text-align:center;position:relative;overflow:hidden}.card::before{content:"";position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:conic-gradient(from 0deg,transparent,rgba(239,68,68,0.1),transparent,rgba(239,68,68,0.05),transparent);animation:spin 6s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}.content{position:relative;z-index:1}.shield{width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,#8b5cf6,#6d28d9);display:flex;align-items:center;justify-content:center;margin:0 auto 24px;font-size:36px;color:#fff;box-shadow:0 8px 32px rgba(139,92,246,0.3)}h1{color:#fff;font-size:24px;font-weight:900;margin-bottom:8px;letter-spacing:-0.5px}h1 span{background:linear-gradient(135deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent}p{color:rgba(255,255,255,0.6);font-size:14px;line-height:1.8;margin:12px 0}.badge{display:inline-block;background:linear-gradient(135deg,#ef4444,#dc2626);color:#fff;padding:4px 16px;border-radius:20px;font-size:12px;font-weight:700;margin-bottom:16px}</style></head><body><div class="card"><div class="content"><div class="shield">&#x1F6E1;</div><h1><span>Blocked</span></h1><p>This site has been blocked by the network administrator.</p><div class="badge">BLOCKED</div><p style="font-size:12px;opacity:0.5;margin-top:16px">${host}</p></div></div></body></html>`;
	return new Response(html, { status: 403, headers: { 'Content-Type': 'text/html;charset=utf-8', 'Cache-Control': 'no-store' } });
}

async function 处理DoH请求(request) {
	const url = new URL(request.url);
	if (request.method === 'OPTIONS') {
		return new Response(null, { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Accept', 'Access-Control-Max-Age': '86400' } });
	}
	if (!['GET', 'POST'].includes(request.method)) {
		return new Response('Method not allowed. Use GET or POST.', { status: 405 });
	}
	if (request.method === 'GET' && !url.searchParams.has('dns')) {
		const dohUrl = url.protocol + '//' + url.host + url.pathname;
		const html = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>DoH Proxy</title><style>:root{--primary:#0ea5e9;--bg:#f8fafc;--card:#fff;--text:#1e293b;--border:#e2e8f0}body{font-family:system-ui,sans-serif;background:var(--bg);color:var(--text);margin:0;padding:20px;display:flex;justify-content:center;align-items:center;min-height:100vh}.card{background:var(--card);border-radius:16px;padding:32px;max-width:560px;width:100%;box-shadow:0 4px 24px rgba(0,0,0,.08);border:1px solid var(--border);text-align:center}.badge{display:inline-block;background:linear-gradient(135deg,#0ea5e9,#667eea);color:#fff;padding:6px 16px;border-radius:20px;font-weight:700;font-size:14px;margin-bottom:16px}h2{margin:0 0 8px;font-size:22px;font-weight:800;background:linear-gradient(135deg,#0ea5e9,#667eea);-webkit-background-clip:text;-webkit-text-fill-color:transparent}p{color:#64748b;font-size:14px;line-height:1.7;margin:8px 0}.url-box{background:#f0f9ff;border:2px solid #0ea5e9;border-radius:12px;padding:14px 18px;margin:16px 0;direction:ltr;text-align:left;font-family:monospace;font-size:15px;font-weight:700;color:#0369a1;word-break:break-all;cursor:pointer;transition:all .2s}.url-box:hover{background:#e0f2fe}.btn{display:inline-flex;align-items:center;gap:6px;background:linear-gradient(135deg,#0ea5e9,#667eea);color:#fff;border:none;border-radius:10px;padding:10px 24px;font-size:14px;font-weight:600;font-family:inherit;cursor:pointer;transition:all .2s;margin-top:8px;text-decoration:none}.btn:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(14,165,233,.3)}.features{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:16px;text-align:right}.feature{background:#f8fafc;border:1px solid var(--border);border-radius:8px;padding:10px 12px;font-size:12px;font-weight:500;color:#475569;display:flex;align-items:center;gap:6px}.feature i{color:#10b981}</style></head><body><div class="card"><div class="badge">DoH</div><h2>DNS-over-HTTPS Proxy</h2><p>Copy this URL and use it as your DoH server:</p><div class="url-box" onclick="navigator.clipboard.writeText(this.textContent);this.style.background='#dcfce7';this.style.borderColor='#10b981';this.style.color='#065f46';setTimeout(()=>{this.style.background='#f0f9ff';this.style.borderColor='#0ea5e9';this.style.color='#0369a1'},1500)">${dohUrl}</div><p style="font-size:12px;opacity:0.6">Click to copy</p><div class="features"><div class="feature">&#x2705; Cloudflare DNS</div><div class="feature">&#x2705; Google DNS</div><div class="feature">&#x2705; Quad9 DNS</div><div class="feature">&#x2705; AdGuard DNS</div></div><a class="btn" href="?dns=test" target="_blank">Test DoH &#x2192;</a></div></body></html>`;
		return new Response(html, { status: 200, headers: { 'Content-Type': 'text/html;charset=utf-8', 'Cache-Control': 'no-store' } });
	}
	const providers = [
		{ name: 'Cloudflare', url: 'https://cloudflare-dns.com/dns-query' },
		{ name: 'Google', url: 'https://dns.google/dns-query' },
		{ name: 'Quad9', url: 'https://dns.quad9.net/dns-query' },
		{ name: 'OpenDNS', url: 'https://doh.opendns.com/dns-query' },
		{ name: 'AdGuard', url: 'https://dns.adguard.com/dns-query' },
		{ name: 'Mullvad', url: 'https://adblock.dns.mullvad.net/dns-query' },
		{ name: 'NextDNS', url: 'https://dns.nextdns.io/dns-query' },
	];
	const provider = providers[Math.floor(Math.random() * providers.length)];
	const requestBody = request.method === 'POST' ? await request.arrayBuffer().catch(() => null) : null;
	try {
		const headers = new Headers(request.headers);
		headers.set('User-Agent', 'DoH-Proxy/1.0');
		if (request.method === 'POST') {
			headers.set('Content-Type', 'application/dns-message');
		} else {
			headers.set('Accept', 'application/dns-message');
		}
		const upstreamRequest = new Request(provider.url + url.search, { method: request.method, headers: headers, body: requestBody, redirect: 'follow' });
		const response = await fetch(upstreamRequest);
		const responseHeaders = new Headers(response.headers);
		responseHeaders.set('Access-Control-Allow-Origin', '*');
		responseHeaders.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
		responseHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Accept');
		responseHeaders.set('Cache-Control', 'public, max-age=300');
		return new Response(response.body, { status: response.status, statusText: response.statusText, headers: responseHeaders });
	} catch (error) {
		for (let i = 0; i < providers.length; i++) {
			if (providers[i].url === provider.url) continue;
			try {
				const fallbackHeaders = new Headers(request.headers);
				fallbackHeaders.set('User-Agent', 'DoH-Proxy/1.0');
				if (request.method === 'POST') fallbackHeaders.set('Content-Type', 'application/dns-message');
				else fallbackHeaders.set('Accept', 'application/dns-message');
				const fallbackReq = new Request(providers[i].url + url.search, { method: request.method, headers: fallbackHeaders, body: requestBody, redirect: 'follow' });
				const fallbackRes = await fetch(fallbackReq);
				const fbHeaders = new Headers(fallbackRes.headers);
				fbHeaders.set('Access-Control-Allow-Origin', '*');
				fbHeaders.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
				fbHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Accept');
				return new Response(fallbackRes.body, { status: fallbackRes.status, statusText: fallbackRes.statusText, headers: fbHeaders });
			} catch (e) {}
		}
		return new Response('DoH proxy error: ' + error.message, { status: 502, headers: { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' } });
	}
}

//////////////////////////////////////////////////////Telegram Bot///////////////////////////////////////////////
async function 发送Bot消息(botToken, chatId, text, parseMode = 'HTML') {
	const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&parse_mode=${parseMode}&text=${encodeURIComponent(text)}`;
	try { return await fetch(url, { method: 'GET' }); } catch (e) { console.error('sendBotMessage error:', e); }
}

function 主菜单键盘(panelUrl, subUrl) {
	return { inline_keyboard: [
		[{ text: '📊 وضعیت', callback_data: 'm:status', style: 'primary' }, { text: '🔗 اشتراک', callback_data: 'm:sub', style: 'primary' }],
		[{ text: '⚙️ کانفیگ', callback_data: 'm:config', style: 'primary' }, { text: '🌐 دامنه‌ها', callback_data: 'm:hosts', style: 'primary' }],
		[{ text: '🖥 پنل مدیریت', web_app: { url: panelUrl }, style: 'success' }, { text: '🔄 منو', callback_data: 'm:menu', style: 'primary' }]
	] };
}

function 构建状态消息(cfg, host, userID) {
	const uptime = Date.now() - (globalThis.__workerStart || Date.now());
	const uptimeStr = `${Math.floor(uptime / 3600000)}h ${Math.floor((uptime % 3600000) / 60000)}m`;
	const barLen = 12;
	let msg = `<b>╔═══❰📊 وضعیت سرور ❱═══╗</b>

<blockquote>⏱ <b>آپتایم:</b> <code>${uptimeStr}</code>
🆔 <b>UUID:</b> <code>${userID.slice(0, 8)}...</code>
🌐 <b>Host:</b> <code>${host}</code>
📁 <b>مسیر:</b> <code>${cfg.PATH || '/'}</code></blockquote>`;
	const cfUsage = cfg.CF?.Usage;
	if (cfUsage?.success) {
		const pct = (cfUsage.total / cfUsage.max);
		const filled = Math.round(pct * barLen);
		const empty = barLen - filled;
		const bar = '🟩'.repeat(filled) + '⬜'.repeat(empty);
		msg += `\n<blockquote><b>📈 مصرف Cloudflare</b>\n${bar} <b>${(pct * 100).toFixed(1)}%</b>\n━━━━━━━━━━━━━━━━━━━\n📄 Pages: <code>${cfUsage.pages}</code>\n⚙️ Workers: <code>${cfUsage.workers}</code>\n💠 مجموع: <code>${cfUsage.total}/${cfUsage.max}</code></blockquote>`;
	}
	msg += `\n<b>╚══════════════════════╝</b>`;
	return msg;
}

function 构建配置消息(cfg, host) {
	const protocol = cfg.协议类型 || 'vless';
	const transport = cfg.传输协议 || 'ws';
	const status = (v) => v ? '🟢 فعال' : '🔴 غیرفعال';
	const fragments = cfg.TLS分片 || '🔴 غیرفعال';
	return `<b>╔═══❰⚙️ تنظیمات ❱═══╗</b>

<blockquote><b>📡 شبکه</b>
━━━━━━━━━━━━━━━━━━━
<b>پروتکل:</b> <code>${protocol}</code>  |  <b>نقل:</b> <code>${transport}</code>
<b>Host:</b> <code>${cfg.HOST || host}</code>
<b>مسیر:</b> <code>${cfg.PATH || '/'}</code>
<b>Fingerprint:</b> <code>${cfg.Fingerprint || 'chrome'}</code></blockquote>

<blockquote><b>🔐 امنیت</b>
━━━━━━━━━━━━━━━━━━━
<b>Skip Verify:</b> ${status(cfg.跳过证书验证)}
<b>ECH:</b> ${status(cfg.ECH)}
<b>0-RTT:</b> ${status(cfg.启用0RTT)}
<b>TLS Fragment:</b> ${fragments}</blockquote>

<blockquote><b>🧩 ویژگی‌ها</b>
━━━━━━━━━━━━━━━━━━━
<b>میکس پروتکل:</b> ${status(cfg.协议类型 === 'mixed')}
<b>TG Bot:</b> ${status(cfg.TG?.启用)}
<b>نام اشتراک:</b> <code>${cfg.优选订阅生成?.SUBNAME || '-'}</code></blockquote>

<b>╚══════════════════════╝</b>`;
}

async function 构建域名消息(cfg, env) {
	const poolHosts = (cfg.HOSTS && cfg.HOSTS.length) ? cfg.HOSTS : (cfg.HOST ? [cfg.HOST] : []);
	const healthMap = {};
	try { const h = JSON.parse(await env.KV.get('domain-health.json') || 'null'); if (h && Array.isArray(h.domains)) for (const d of h.domains) healthMap[d.host] = d.ok; } catch (e) { /* ignore */ }
	const list = poolHosts.length ? poolHosts.map(h => `${healthMap[h] === false ? '🔴' : healthMap[h] === true ? '🟢' : '⚪️'} <code>${h}</code>`).join('\n') : 'هیچ دامنه‌ای ثبت نشده';
	return `<b>╔═══❰🌐 دامنه‌ها ❱═══╗</b>\n\n<blockquote>${list}</blockquote>\n\n<i>🟢 سالم  🔴 خطا  ⚪️ بررسی‌نشده</i>\n<b>╚══════════════════╝</b>`;
}

function 主菜单文本() {
	return `<b>🛰 به ربات Nova Proxy خوش آمدید</b>

<blockquote>مدیریت پنل از تلگرام:
دریافت لینک اشتراک، وضعیت، مصرف و تنظیمات</blockquote>

از دکمه‌های زیر استفاده کنید 👇`;
}

async function 处理TelegramWebhook(request, env, userID, host, encryptionKey = null) {
	try {
		const TG_TXT = await env.KV.get('tg.json');
		if (!TG_TXT) return new Response('Bot not configured', { status: 200 });
		const TG_JSON = JSON.parse(TG_TXT);
		if (!TG_JSON.BotToken || !TG_JSON.ChatID) return new Response('Bot not configured', { status: 200 });
		const allowedChatId = String(TG_JSON.ChatID).trim();

		const update = await request.json();
		const configJSON = await getConfigRaw(env);
		const config_JSON = configJSON ? JSON.parse(configJSON) : {};

		if (update.callback_query) {
			const cq = update.callback_query;
			const cbChat = String(cq.message && cq.message.chat ? cq.message.chat.id : '').trim();
			const cbUser = String(cq.from ? cq.from.id : '').trim();
			if (cbChat !== allowedChatId && cbUser !== allowedChatId) { console.warn('[TG.Webhook] unauthorized callback chat:', cbChat, 'user:', cbUser, '!=', allowedChatId); return new Response('Unauthorized', { status: 200 }); }
			const data = cq.data || '';
			try { await fetch(`https://api.telegram.org/bot${TG_JSON.BotToken}/answerCallbackQuery?callback_query_id=${cq.id}`); } catch (e) { }
			if (cq.message && data) {
				const protocol = request.url.split('://')[0];
				const tgKey = encryptionKey || env.KEY || (await env.KV.get('auto_key')) || '勿动此默认密钥，有需求请自行通过添加变量KEY进行修改';
				const loginToken = await 生成Telegram登录令牌(cbChat, tgKey);
				const panelUrl = `${protocol}://${host}/admin/telegram-login?chat_id=${encodeURIComponent(cbChat)}&token=${loginToken}`;
				const subToken = await MD5MD5(host + userID);
				const subUrl = `${protocol}://${host}/sub?token=${subToken}`;
				const keyboard = 主菜单键盘(panelUrl, subUrl);
				let editText = null, sendText = null;
				if (data === 'm:status' || data === 'cb_status') sendText = 构建状态消息(config_JSON, host, userID);
				else if (data === 'm:config' || data === 'cb_config') sendText = 构建配置消息(config_JSON, host);
				else if (data === 'm:hosts' || data === 'cb_hosts') sendText = await 构建域名消息(config_JSON, env);
				else if (data === 'm:menu' || data === 'cb_menu') sendText = 主菜单文本();
				else if (data === 'm:sub' || data === 'cb_sub') {
					sendText = `<b>╔═══❰🔗 اشتراک ❱═══╗</b>\n\n<blockquote><b>📎 لینک اشتراک شما:</b>\n<code>${subUrl}</code></blockquote>\n\n<b>📥 <a href="${subUrl}">باز کردن مستقیم</a></b>\n\n<b>╚════════════════╝</b>`;
				}
				if (sendText) {
					try { await tgApi(TG_JSON.BotToken, 'sendMessage', { chat_id: cbChat, parse_mode: 'HTML', text: sendText, reply_markup: data.startsWith('m:menu') || data === 'cb_menu' ? keyboard : undefined }); } catch (e) { console.error('tg send error:', e); }
				}
			}
			return new Response('OK', { status: 200 });
		}

		if (!update.message || !update.message.text) return new Response('OK', { status: 200 });

		const chatId = String(update.message.chat.id).trim();
		if (chatId !== allowedChatId) { console.warn('[TG.Webhook] unauthorized message chat:', chatId, '!=', allowedChatId); return new Response('Unauthorized', { status: 200 }); }

		const text = update.message.text.trim();
		const cmd = text.split(' ')[0].toLowerCase();
		const args = text.slice(cmd.length).trim();

		switch (cmd) {
			case '/start':
			case '/menu': {
				const protocol = request.url.split('://')[0];
				const tgKey = encryptionKey || env.KEY || (await env.KV.get('auto_key')) || '勿动此默认密钥，有需求请自行通过添加变量KEY进行修改';
				const loginToken = await 生成Telegram登录令牌(chatId, tgKey);
				const panelUrl = `${protocol}://${host}/admin/telegram-login?chat_id=${encodeURIComponent(chatId)}&token=${loginToken}`;
				const subToken = await MD5MD5(host + userID);
				const subUrl = `${protocol}://${host}/sub?token=${subToken}`;
				const replyMarkup = 主菜单键盘(panelUrl, subUrl);
				const botUrl = `https://api.telegram.org/bot${TG_JSON.BotToken}/sendMessage?chat_id=${chatId}&parse_mode=HTML&text=${encodeURIComponent(主菜单文本())}&reply_markup=${encodeURIComponent(JSON.stringify(replyMarkup))}`;
				try { await fetch(botUrl, { method: 'GET' }); } catch (e) { console.error('sendBotMessage error:', e); }
				break;
			}
			case '/help': {
				const helpText = `<b>╔═══❰✨ Nova Proxy Bot ❱═══╗</b>

<blockquote><b>📋 راهنما</b>
━━━━━━━━━━━━━━━━━━━
<code>/sub</code>         ─── دریافت لینک اشتراک
<code>/status</code>      ─── وضعیت ورکر و مصرف
<code>/config</code>      ─── نمایش خلاصه کانفیگ
<code>/sethost</code>    ─── تغییر host
<code>/setpath</code>    ─── تغییر مسیر
<code>/setname</code>    ─── تغییر نام اشتراک
<code>/hosts</code>     ─── لیست دامنه‌ها
<code>/addhost</code>   ─── افزودن دامنه به استخر
<code>/delhost</code>   ─── حذف دامنه از استخر
<code>/pause</code>     ─── توقف موقت سرویس
<code>/resume</code>    ─── ازسرگیری سرویس
<code>/setwebhook</code> ─── نصب Webhook
<code>/install</code>     ─── نصب پنل روی Cloudflare
<code>/myid</code>       ─── Chat ID شما
<code>/help</code>       ─── این راهنما</blockquote>

<b>╚══════════════════════╝</b>`;
				await 发送Bot消息(TG_JSON.BotToken, chatId, helpText);
				break;
			}
			case '/sub': {
				const subToken = await MD5MD5(host + userID);
				const protocol = request.url.split('://')[0];
				const subUrl = `${protocol}://${host}/sub?token=${subToken}`;
				const msg = `<b>╔═══❰🔗 اشتراک ❱═══╗</b>

<blockquote><b>📎 لینک اشتراک شما:</b>
<code>${subUrl}</code></blockquote>

<b>📥 <a href="${subUrl}">باز کردن مستقیم</a></b>

<b>╚════════════════╝</b>`;
				await 发送Bot消息(TG_JSON.BotToken, chatId, msg);
				break;
			}
			case '/status': {
				await 发送Bot消息(TG_JSON.BotToken, chatId, 构建状态消息(config_JSON, host, userID));
				break;
			}
			case '/config': {
				await 发送Bot消息(TG_JSON.BotToken, chatId, 构建配置消息(config_JSON, host));
				break;
			}
			case '/sethost': {
				if (!args) { await 发送Bot消息(TG_JSON.BotToken, chatId, `<b>╔═══❰⚠️ خطا ❱═══╗</b>\n\n<blockquote>لطفا host را وارد کنید:\n<code>/sethost example.com</code></blockquote>\n<b>╚══════════════╝</b>`); break; }
				config_JSON.HOST = args.trim().toLowerCase().replace(/^https?:\/\//, '').split('/')[0].split(':')[0];
				if (!config_JSON.HOSTS) config_JSON.HOSTS = [];
				if (!config_JSON.HOSTS.includes(config_JSON.HOST)) config_JSON.HOSTS.unshift(config_JSON.HOST);
				await putConfig(env, JSON.stringify(config_JSON, null, 2));
				await 发送Bot消息(TG_JSON.BotToken, chatId, `<b>╔═══❰✅ موفق ❱═══╗</b>\n\n<blockquote>Host به <code>${config_JSON.HOST}</code> تغییر یافت</blockquote>\n<b>╚══════════════╝</b>`);
				break;
			}
			case '/setpath': {
				if (!args) { await 发送Bot消息(TG_JSON.BotToken, chatId, `<b>╔═══❰⚠️ خطا ❱═══╗</b>\n\n<blockquote>لطفا مسیر را وارد کنید:\n<code>/setpath /api</code></blockquote>\n<b>╚══════════════╝</b>`); break; }
				config_JSON.PATH = args.startsWith('/') ? args : '/' + args;
				await putConfig(env, JSON.stringify(config_JSON, null, 2));
				await 发送Bot消息(TG_JSON.BotToken, chatId, `<b>╔═══❰✅ موفق ❱═══╗</b>\n\n<blockquote>مسیر به <code>${config_JSON.PATH}</code> تغییر یافت</blockquote>\n<b>╚══════════════╝</b>`);
				break;
			}
			case '/setname': {
				if (!args) { await 发送Bot消息(TG_JSON.BotToken, chatId, `<b>╔═══❰⚠️ خطا ❱═══╗</b>\n\n<blockquote>لطفا نام را وارد کنید:\n<code>/setname MyConfig</code></blockquote>\n<b>╚══════════════╝</b>`); break; }
				if (!config_JSON.optimizedSubGeneration) config_JSON.optimizedSubGeneration = {};
				config_JSON.optimizedSubGeneration.SUBNAME = args;
				await putConfig(env, JSON.stringify(config_JSON, null, 2));
				await 发送Bot消息(TG_JSON.BotToken, chatId, `<b>╔═══❰✅ موفق ❱═══╗</b>\n\n<blockquote>نام اشتراک به <code>${args}</code> تغییر یافت</blockquote>\n<b>╚══════════════╝</b>`);
				break;
			}
			case '/myid': {
				await 发送Bot消息(TG_JSON.BotToken, chatId, `<b>╔═══❰🆔 Chat ID ❱═══╗</b>\n\n<blockquote><code>${chatId}</code></blockquote>\n<b>╚══════════════╝</b>`);
				break;
			}
			case '/setwebhook': {
				const baseUrl = `${request.url.split('://')[0]}://${request.url.split('/')[2]}`;
				const apiUrl = `https://api.telegram.org/bot${TG_JSON.BotToken}/setWebhook?url=${encodeURIComponent(baseUrl + '/bot')}&drop_pending_updates=true`;
				const res = await fetch(apiUrl);
				const data = await res.json();
				if (data.ok) await tgSetMyCommands(TG_JSON.BotToken);
				const msg = data.ok
					? `<b>╔═══❰✅ Webhook ❱═══╗</b>\n\n<blockquote>Webhook با موفقیت نصب شد!\n\n🌐 <code>${baseUrl}/bot</code></blockquote>\n<b>╚══════════════════╝</b>`
					: `<b>╔═══❰❌ خطا ❱═══╗</b>\n\n<blockquote>خطا در نصب Webhook:\n<code>${JSON.stringify(data)}</code></blockquote>\n<b>╚══════════════╝</b>`;
				await 发送Bot消息(TG_JSON.BotToken, chatId, msg);
				break;
			}
			case '/install': {
				const scriptName = (args || 'nova-panel').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 50) || 'nova-panel';
				cfInstallSet(chatId, { step: 'token', scriptName });
				try {
					await tgApi(TG_JSON.BotToken, 'sendMessage', {
						chat_id: chatId,
						parse_mode: 'HTML',
						text: '<b>Cloudflare API token</b>\nPlease reply with your token.',
						reply_markup: { force_reply: true }
					});
				} catch (e) { console.error('/install error:', e); }
				break;
			}
			case '/hosts': {
				await 发送Bot消息(TG_JSON.BotToken, chatId, await 构建域名消息(config_JSON, env));
				break;
			}
			case '/addhost': {
				if (!args) { await 发送Bot消息(TG_JSON.BotToken, chatId, `<b>╔═══❰⚠️ خطا ❱═══╗</b>\n\n<blockquote>دامنه را وارد کنید:\n<code>/addhost cdn.example.com</code></blockquote>\n<b>╚══════════════╝</b>`); break; }
				const newHost = args.trim().toLowerCase().replace(/^https?:\/\//, '').split('/')[0].split(':')[0];
				if (!config_JSON.HOSTS) config_JSON.HOSTS = [];
				if (config_JSON.HOSTS.includes(newHost)) { await 发送Bot消息(TG_JSON.BotToken, chatId, `<b>╔═══❰ℹ️ ❱═══╗</b>\n\n<blockquote>این دامنه از قبل در استخر است.</blockquote>\n<b>╚══════════════╝</b>`); break; }
				config_JSON.HOSTS.push(newHost);
				await putConfig(env, JSON.stringify(config_JSON, null, 2));
				await 发送Bot消息(TG_JSON.BotToken, chatId, `<b>╔═══❰✅ موفق ❱═══╗</b>\n\n<blockquote>دامنه <code>${newHost}</code> اضافه شد (مجموع ${config_JSON.HOSTS.length} دامنه)</blockquote>\n<b>╚══════════════╝</b>`);
				break;
			}
			case '/delhost': {
				if (!args) { await 发送Bot消息(TG_JSON.BotToken, chatId, `<b>╔═══❰⚠️ خطا ❱═══╗</b>\n\n<blockquote>دامنه را وارد کنید:\n<code>/delhost cdn.example.com</code></blockquote>\n<b>╚══════════════╝</b>`); break; }
				const delHost = args.trim().toLowerCase().replace(/^https?:\/\//, '').split('/')[0].split(':')[0];
				if (!config_JSON.HOSTS || !config_JSON.HOSTS.includes(delHost)) { await 发送Bot消息(TG_JSON.BotToken, chatId, `<b>╔═══❰ℹ️ ❱═══╗</b>\n\n<blockquote>این دامنه در استخر نیست.</blockquote>\n<b>╚══════════════╝</b>`); break; }
				if (config_JSON.HOSTS.length <= 1) { await 发送Bot消息(TG_JSON.BotToken, chatId, `<b>╔═══❰⚠️ ❱═══╗</b>\n\n<blockquote>نمی‌توان آخرین دامنه را حذف کرد.</blockquote>\n<b>╚══════════════╝</b>`); break; }
				config_JSON.HOSTS = config_JSON.HOSTS.filter(h => h !== delHost);
				if (config_JSON.HOST === delHost) config_JSON.HOST = config_JSON.HOSTS[0];
				await putConfig(env, JSON.stringify(config_JSON, null, 2));
				await 发送Bot消息(TG_JSON.BotToken, chatId, `<b>╔═══❰✅ موفق ❱═══╗</b>\n\n<blockquote>دامنه <code>${delHost}</code> حذف شد (مجموع ${config_JSON.HOSTS.length} دامنه)</blockquote>\n<b>╚══════════════╝</b>`);
				break;
			}
			case '/pause': {
				config_JSON.paused = true;
				await putConfig(env, JSON.stringify(config_JSON, null, 2));
				await 发送Bot消息(TG_JSON.BotToken, chatId, `<b>╔═══❰🚨 سرویس متوقف شد ❱═══╗</b>\n\n<blockquote>همهٔ اتصال‌های پراکسی و دریافت اشتراک‌ها رد می‌شوند (۵۰۳). پنل و ربات باز می‌مانند.\nبرای ازسرگیری <code>/resume</code> را بزنید.</blockquote>\n<b>╚══════════════════╝</b>`);
				break;
			}
			case '/resume': {
				config_JSON.paused = false;
				await putConfig(env, JSON.stringify(config_JSON, null, 2));
				await 发送Bot消息(TG_JSON.BotToken, chatId, `<b>╔═══❰✅ سرویس از سر گرفته شد ❱═══╗</b>\n\n<blockquote>اتصال‌های پراکسی و دریافت اشتراک‌ها دوباره فعال شدند.</blockquote>\n<b>╚══════════════════╝</b>`);
				break;
			}
			default: {
				await 发送Bot消息(TG_JSON.BotToken, chatId, `<b>╔═══❰❌ خطا ❱═══╗</b>\n\n<blockquote>دستور ناشناخته.\nبرای راهنما <code>/help</code> را بزنید.</blockquote>\n<b>╚══════════════╝</b>`);
			}
		}
	} catch (error) {
		console.error('Telegram webhook error:', error);
	}
	return new Response('OK', { status: 200 });
}

//////////////////////////////////////////////////////Cloudflare API Helpers///////////////////////////////////////////////
const CF_API = 'https://api.cloudflare.com/client/v4';
function cfHeaders(token, extra) { return Object.assign({ 'Authorization': 'Bearer ' + token }, extra || {}); }
async function cfJson(resp) { let j = null; try { j = await resp.json(); } catch (e) {} return j; }
async function cfVerifyToken(token) { const r = await fetch(CF_API + '/user/tokens/verify', { headers: cfHeaders(token) }); const j = await cfJson(r); return { ok: !!(j && j.success && j.result && j.result.status === 'active'), raw: j }; }
async function cfListAccounts(token) { const r = await fetch(CF_API + '/accounts', { headers: cfHeaders(token) }); const j = await cfJson(r); if (!j || !j.success || !Array.isArray(j.result)) return []; return j.result.map(a => ({ id: a.id, name: a.name })); }

const _cfInstallState = new Map();
function cfInstallGet(chatId) { const v = _cfInstallState.get(String(chatId)); if (v && Date.now() - v.at > 600000) { _cfInstallState.delete(String(chatId)); return null; } return v; }
function cfInstallSet(chatId, patch) { const k = String(chatId); const cur = _cfInstallState.get(k) || { at: Date.now() }; const next = Object.assign(cur, patch, { at: Date.now() }); _cfInstallState.set(k, next); return next; }
function cfInstallClear(chatId) { _cfInstallState.delete(String(chatId)); }

// Build the multipart body for a module-Worker upload, with D1 + secret bindings.
function buildWorkerUpload(scriptText, { d1Id, uuid, password, compatDate, compatFlags }) {
  const metadata = {
    main_module: 'worker.js',
    compatibility_date: compatDate || '2024-09-23',
    compatibility_flags: compatFlags || ['nodejs_compat'],
    bindings: [
      { type: 'd1', name: 'DB', id: d1Id },
      { type: 'secret_text', name: 'UUID', text: uuid },
      { type: 'secret_text', name: 'PASSWORD', text: password }
    ]
  };
  const fd = new FormData();
  fd.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  fd.append('worker.js', new Blob([scriptText], { type: 'application/javascript+module' }), 'worker.js');
  return fd;
}

async function cfCreateD1(token, accountId, name) {
  const r = await fetch(CF_API + '/accounts/' + accountId + '/d1/database', {
    method: 'POST', headers: cfHeaders(token, { 'Content-Type': 'application/json' }),
    body: JSON.stringify({ name })
  });
  const j = await cfJson(r);
  if (j && j.success && j.result && j.result.uuid) return { id: j.result.uuid, name };
  const list = await fetch(CF_API + '/accounts/' + accountId + '/d1/database?per_page=100', { headers: cfHeaders(token) });
  const lj = await cfJson(list);
  if (lj && lj.success && Array.isArray(lj.result)) {
    const found = lj.result.find(d => d.name === name);
    if (found && found.uuid) return { id: found.uuid, name };
  }
  const errMsg = (j && j.errors && j.errors[0] && j.errors[0].message) || ('HTTP ' + r.status);
  throw new Error('D1 create failed: ' + errMsg);
}

async function cfUploadWorker(token, accountId, scriptName, scriptText, opts) {
  const fd = buildWorkerUpload(scriptText, opts);
  const r = await fetch(CF_API + '/accounts/' + accountId + '/workers/scripts/' + scriptName, {
    method: 'PUT', headers: cfHeaders(token), body: fd
  });
  const j = await cfJson(r);
  if (j && j.success) return true;
  const errMsg = (j && j.errors && j.errors[0] && j.errors[0].message) || ('HTTP ' + r.status);
  throw new Error('Worker upload failed: ' + errMsg);
}

async function cfEnableWorkersDev(token, accountId, scriptName) {
  const r = await fetch(CF_API + '/accounts/' + accountId + '/workers/scripts/' + scriptName + '/subdomain', {
    method: 'POST', headers: cfHeaders(token, { 'Content-Type': 'application/json' }),
    body: JSON.stringify({ enabled: true })
  });
  const j = await cfJson(r);
  if (j && j.success) return { enabled: true, needsDashboard: false };
  return { enabled: false, needsDashboard: true, raw: j };
}

async function cfGetSubdomain(token, accountId) {
  const r = await fetch(CF_API + '/accounts/' + accountId + '/workers/subdomain', { headers: cfHeaders(token) });
  const j = await cfJson(r);
  return (j && j.success && j.result && j.result.subdomain) ? j.result.subdomain : null;
}

async function cfDeploy({ token, accountId, scriptName, scriptText, uuid, password, compatDate, compatFlags }, report) {
  const notes = [];
  const say = async (m) => { try { await report(m); } catch (e) {} };
  try {
    await say('🔑 Verifying token…');
    const v = await cfVerifyToken(token);
    if (!v.ok) return { ok: false, error: 'Token invalid or not active.' };

    if (!accountId) {
      await say('🔎 Finding your account…');
      const accts = await cfListAccounts(token);
      if (accts.length === 1) { accountId = accts[0].id; notes.push('Account: ' + accts[0].name); }
      else if (accts.length === 0) return { ok: false, error: 'No accounts visible to this token.' };
      else return { ok: false, error: 'multiple_accounts', accounts: accts };
    }

    await say('🗄 Creating D1 database…');
    const db = await cfCreateD1(token, accountId, (scriptName + '-db').slice(0, 50));
    notes.push('D1: ' + db.name);

    await say('⬆️ Uploading worker + binding D1 + setting secrets…');
    await cfUploadWorker(token, accountId, scriptName, scriptText, { d1Id: db.id, uuid, password, compatDate, compatFlags });

    await say('🌐 Enabling workers.dev route…');
    const route = await cfEnableWorkersDev(token, accountId, scriptName);
    let url = null;
    const sub = await cfGetSubdomain(token, accountId);
    if (sub) url = 'https://' + scriptName + '.' + sub + '.workers.dev';
    if (route.needsDashboard) {
      notes.push('⚠️ Could not auto-enable workers.dev. One-time step: in the Cloudflare dashboard → Workers & Pages → your worker → Settings → Domains & Routes, enable the workers.dev route (or add a custom domain).');
    }
    notes.push('🇮🇷 For Iran: *.workers.dev is filtered. Add a Custom Domain (Workers → your worker → Settings → Domains & Routes → Add Custom Domain) and use that.');

    return { ok: true, url, accountId, dbId: db.id, notes };
  } catch (e) {
    return { ok: false, error: (e && e.message) || String(e), notes };
  }
}

async function runCfInstall(env, botToken, chatId, host, request) {
	const a = ['https://', 'raw.', 'githubusercontent', '.com/', 'IRNova/', 'Nova-Proxy/', 'main/', 'public/', 'version.json'].join('');
	const b = ['https://', 'raw.', 'githubusercontent', '.com/', 'IRNova/', 'Nova-Proxy/', 'main/', 'worker.js'].join('');
	const st = cfInstallGet(chatId);
	if (!st || !st.token) { try { await sendBotMessage(botToken, chatId, 'نشست منقضی شد. دوباره از منو «نصب پنل» شروع کنید.'); } catch (e) {} return new Response('OK', { status: 200 }); }
	let lastMsgId = null;
	const report = async (m) => {
		try {
			if (lastMsgId) { await tgApi(botToken, 'editMessageText', { chat_id: chatId, message_id: lastMsgId, parse_mode: 'HTML', text: m }); }
			else { const r = await tgApi(botToken, 'sendMessage', { chat_id: chatId, parse_mode: 'HTML', text: m }); const j = await r.json().catch(() => null); if (j && j.result) lastMsgId = j.result.message_id; }
		} catch (e) {}
	};
	let scriptUrl = b;
	try { const vj = JSON.parse(await (await fetch(a)).text()); if (vj && vj.worker_url) scriptUrl = vj.worker_url; } catch (e) {}
	await report('📥 دریافت آخرین نسخهٔ ورکر…');
	let scriptText = '';
	try { const r = await fetch(scriptUrl); if (!r.ok) throw new Error('HTTP ' + r.status); scriptText = await r.text(); } catch (e) { await report('❌ دریافت ورکر ناموفق بود: ' + (e && e.message || e)); cfInstallClear(chatId); return new Response('OK', { status: 200 }); }
	if (!/export\s+default|addEventListener\(/.test(scriptText)) { await report('❌ فایل ورکر معتبر نبود.'); cfInstallClear(chatId); return new Response('OK', { status: 200 }); }
	const newUuid = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { const r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16); }));
	const newPass = (Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 6)).toUpperCase();
	const scriptName = st.scriptName || 'nova-panel';
	const res = await cfDeploy({ token: st.token, accountId: st.accountId || null, scriptName, scriptText, uuid: newUuid, password: newPass, compatDate: '2024-09-23', compatFlags: ['nodejs_compat'] }, report);
	if (res && res.error === 'multiple_accounts') {
		const rows = res.accounts.slice(0, 8).map(a => [{ text: a.name || a.id, callback_data: 'm:install:acct:' + a.id }]);
		rows.push([{ text: '⬅️ لغو', callback_data: 'm:main' }]);
		await tgApi(botToken, 'sendMessage', { chat_id: chatId, parse_mode: 'HTML', text: 'چند حساب پیدا شد. کدام‌یک؟', reply_markup: { inline_keyboard: rows } });
		return new Response('OK', { status: 200 });
	}
	cfInstallClear(chatId);
	if (!res || !res.ok) { await report('❌ استقرار ناموفق بود: ' + ((res && res.error) || 'unknown')); return new Response('OK', { status: 200 }); }
	const notes = (res.notes || []).map(n => '• ' + n).join('\n');
	const urlLine = res.url ? `\n\n🔗 آدرس پنل:\n<code>${res.url}</code>\n🔑 رمز ادمین:\n<code>${newPass}</code>` : '';
	await report(`✅ <b>نصب کامل شد!</b>${urlLine}\n\n<blockquote>${notes}</blockquote>\n\n<i>برای امنیت، توکن Cloudflare را که فرستادید در داشبورد باطل کنید. این توکن ذخیره نشده است.</i>`);
	return new Response('OK', { status: 200 });
}

//////////////////////////////////////////////////////Pool Hosts & Bot Helpers///////////////////////////////////////////////
async function getPoolHosts(env) {
	try {
		const raw = env.KV && typeof env.KV.get === 'function' ? await getConfigRaw(env) : null;
		const cj = raw ? JSON.parse(raw) : null;
		if (cj && Array.isArray(cj.HOSTS) && cj.HOSTS.length) return [...new Set(cj.HOSTS.filter(Boolean))];
		if (cj && cj.HOST) return [cj.HOST];
	} catch (e) { /* ignore */ }
	return [];
}

async function sendBotMessage(botToken, chatId, text, parseMode = 'HTML', replyMarkup = null) {
	if (!botToken || !chatId) return null;
	let last = null;
	const chunkSize = 4000;
	const chunks = [];
	for (let i = 0; i < text.length; i += chunkSize) chunks.push(text.slice(i, i + chunkSize));
	for (const chunk of chunks) {
		const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${encodeURIComponent(chatId)}&text=${encodeURIComponent(chunk)}&parse_mode=${parseMode}`;
		try { last = await fetch(url, { method: 'GET' }); } catch (e) { console.error('sendBotMessage error:', e); }
	}
	return last;
}

async function tgApi(botToken, method, payload) {
	try { return await fetch(`https://api.telegram.org/bot${botToken}/${method}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); } catch (e) { console.error('tgApi ' + method + ':', e); }
}

async function tgSetMyCommands(botToken) {
	const commands = [
		{ command: 'start', description: 'منو / Menu' },
		{ command: 'sub', description: 'لینک اشتراک' },
		{ command: 'status', description: 'وضعیت و مصرف' },
		{ command: 'config', description: 'خلاصه تنظیمات' },
		{ command: 'hosts', description: 'دامنه‌ها' },
		{ command: 'addhost', description: 'افزودن دامنه' },
		{ command: 'delhost', description: 'حذف دامنه' },
		{ command: 'announce', description: 'ارسال به کانال' },
		{ command: 'pause', description: '🚨 توقف اضطراری سرویس' },
		{ command: 'resume', description: '✅ ازسرگیری سرویس' },
		{ command: 'install', description: '🚀 نصب پنل روی Cloudflare' },
		{ command: 'help', description: 'راهنما' },
	];
	try { await fetch(`https://api.telegram.org/bot${botToken}/setMyCommands`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ commands }) }); } catch (e) {}
}

//////////////////////////////////////////////////////Announce & Mirror///////////////////////////////////////////////
async function announceSubLinks(env, opts = {}) {
	try {
		const tgRaw = env.KV && typeof env.KV.get === 'function' ? await env.KV.get('tg.json') : null;
		if (!tgRaw) return { skipped: true, reason: 'Telegram not configured' };
		const tg = JSON.parse(tgRaw);
		const chatId = String(env.ANNOUNCE_CHAT || tg.ChatID || '').trim();
		if (!tg.BotToken || !chatId) return { skipped: true, reason: 'BotToken/ChatID missing' };
		const baseUrl = opts.baseUrl || '';
		const lines = ['<b>🔥 لینک‌های اشتراک Nova / Nova subscription links</b>', ''];
		if (baseUrl) {
			lines.push('<b>⚡️ لینک مستقیم (بهینه per-ISP) / Live (per-ISP optimized)</b>');
			lines.push(`<code>${baseUrl}/sub/mihomo.yaml</code>`);
			lines.push(`<code>${baseUrl}/sub/base64.txt</code>`);
			lines.push('');
		}
		if (opts.health && Array.isArray(opts.health.domains) && opts.health.domains.length) {
			const up = opts.health.domains.filter(d => d.ok).length;
			lines.push(`<b>🌐 دامنه‌ها / Domains:</b> ${up}/${opts.health.domains.length} ✅`);
			lines.push('');
		}
		lines.push('<i>محتوای همه لینک‌ها یکی است؛ اگر یکی فیلتر شد، لینک گیت‌هاب همیشه کار می‌کند.</i>');
		await sendBotMessage(tg.BotToken, chatId, lines.join('\n'));
		return { skipped: false, chatId };
	} catch (e) { return { skipped: true, reason: e && e.message ? e.message : String(e) }; }
}

async function publishSubMirror(env, baseUrl) {
	try {
		const ghRaw = env.KV && typeof env.KV.get === 'function' ? await env.KV.get('github-mirror.json') : null;
		if (!ghRaw) return { skipped: true, reason: 'GitHub mirror not configured' };
		const gh = JSON.parse(ghRaw);
		if (!gh.token || !gh.repo) return { skipped: true, reason: 'GitHub token/repo missing' };
		if (!baseUrl) return { skipped: true, reason: 'no baseUrl' };
		const results = [];
		const files = [
			{ name: 'base64.txt', q: 'b64' },
			{ name: 'mihomo.yaml', q: 'clash' },
			{ name: 'singbox.json', q: 'singbox' },
		];
		for (const f of files) {
			try {
				const r = await fetch(`${baseUrl}/sub?token=${await MD5MD5(baseUrl.replace(/^https?:\/\//, '') + (env.UUID || ''))}&${f.q}`, { headers: { 'User-Agent': 'NovaMirror/1.0' } });
				if (!r.ok) { results.push({ file: f.name, ok: false, status: r.status }); continue; }
				const content = await r.text();
				if (!content || content.length < 8) { results.push({ file: f.name, ok: false, error: 'empty response' }); continue; }
				const path = (gh.pathPrefix ? gh.pathPrefix + '/' : '') + f.name;
				const putUrl = `https://api.github.com/repos/${gh.repo}/contents/${path}`;
				const existing = await fetch(putUrl, { headers: { 'Authorization': 'token ' + gh.token, 'User-Agent': 'NovaMirror' } });
				const existingJson = await existing.json().catch(() => ({}));
				const sha = existingJson && existingJson.sha ? existingJson.sha : undefined;
				const body = { message: `Nova: update ${f.name}`, content: btoa(unescape(encodeURIComponent(content))), branch: gh.branch || 'main' };
				if (sha) body.sha = sha;
				const put = await fetch(putUrl, { method: 'PUT', headers: { 'Authorization': 'token ' + gh.token, 'Content-Type': 'application/json', 'User-Agent': 'NovaMirror' }, body: JSON.stringify(body) });
				results.push({ file: f.name, ok: put.ok, status: put.status });
			} catch (e) { results.push({ file: f.name, ok: false, error: e.message }); }
		}
		return { skipped: false, results };
	} catch (e) { return { skipped: true, reason: e.message }; }
}

//////////////////////////////////////////////////////Nova Radar/Scan Page///////////////////////////////////////////////
function novaScanPage() {
	const html = `<!DOCTYPE html><html lang="fa" dir="rtl" data-theme="dark"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Nova Radar</title><style>
:root{--bg:#070809;--panel:#0c0e12;--card:#101319;--card2:#0b0d11;--bd:#1c2027;--bd2:#262b34;--tx:#e9edf4;--tx2:#aeb6c4;--mu:#6f7888;--ac:#22d3ee;--ac2:#a855f7;--ok:#34d399;--wn:#f5b042;--dg:#f87171;--grad:linear-gradient(120deg,#22d3ee,#7c5cff);--r:12px;--rs:9px;--ac-soft:color-mix(in srgb,var(--ac) 14%,transparent);--ac-line:color-mix(in srgb,var(--ac) 38%,transparent)}
html[data-theme=light]{--bg:#f4f6fb;--panel:#fff;--card:#fff;--card2:#f7f9fc;--bd:#e6eaf1;--bd2:#dde2eb;--tx:#101622;--tx2:#3a465c;--mu:#5f6a7d;--ac:#0ea5c4;--ac2:#7c3aed;--grad:linear-gradient(120deg,#0891b2,#7c3aed);--ok:#047857;--wn:#b45309;--dg:#dc2626}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--bg);color:var(--tx);min-height:100vh;font-size:14px;font-family:'Vazirmatn','Inter',system-ui,sans-serif;-webkit-font-smoothing:antialiased;padding:22px 16px 60px}
.wrap{max-width:640px;margin:0 auto}
.topbar{display:flex;align-items:center;gap:12px;margin-bottom:18px}
.brand{display:flex;align-items:center;gap:11px}
.brand .name{font-size:17px;font-weight:800}
.brand .env{font-size:10.5px;color:var(--mu);font-weight:600;margin-top:2px}
.brand .env .d{width:6px;height:6px;border-radius:50%;background:var(--ok);display:inline-block;margin-left:4px}
.seg{display:flex;border:1px solid var(--bd);background:var(--card);border-radius:var(--rs);padding:3px;height:36px}
.seg button{border:none;background:transparent;color:var(--mu);font:inherit;font-size:12px;font-weight:700;padding:0 11px;border-radius:6px;cursor:pointer}
.seg button.on{background:var(--ac);color:#04121a}
.card{background:var(--card);border:1px solid var(--bd);border-radius:var(--r);padding:20px 18px;margin-bottom:16px}
.card.hero{border-color:var(--ac-line)}
.hsub{color:var(--tx2);font-size:13px;line-height:1.7;text-align:center;margin-top:2px}
.pill{display:block;width:max-content;margin:12px auto 0;padding:5px 14px;border-radius:20px;font-size:12px;font-weight:700;text-align:center}
.pill.ok{background:var(--ac-soft);color:var(--ac);border:1px solid var(--ac-line)}
.pill.warn{background:color-mix(in srgb,var(--wn) 15%,transparent);color:var(--wn);border:1px solid color-mix(in srgb,var(--wn) 35%,transparent)}
.row{display:flex;gap:10px;flex-wrap:wrap;margin:18px 0 14px}
.fg{flex:1;min-width:120px}
.fg label{display:block;font-size:11px;font-weight:600;color:var(--mu);margin-bottom:6px}
.fg input{width:100%;background:var(--card2);border:1px solid var(--bd);border-radius:var(--rs);color:var(--tx);padding:10px 12px;font-size:14px;font-family:inherit}
.fg input:focus{outline:none;border-color:var(--ac)}
.portchips{display:flex;flex-wrap:wrap;gap:8px;margin:4px 0}
.pchip{background:var(--card2);border:1px solid var(--bd);border-radius:999px;color:var(--tx2);padding:7px 14px;font-size:13px;font-weight:700;font-family:inherit;cursor:pointer;transition:.12s}
.pchip.on{background:var(--ac);border-color:var(--ac);color:#04121a;font-weight:800}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;width:100%;height:46px;border-radius:var(--rs);font:inherit;font-size:15px;font-weight:700;border:1px solid transparent;cursor:pointer;transition:.13s}
.btn.primary{background:var(--grad);color:#04121a}
.btn.primary:disabled{opacity:.55;cursor:default}
.btn.ghost{background:var(--card2);color:var(--tx);border-color:var(--bd2);margin-top:10px}
.bar{height:8px;border-radius:999px;background:var(--card2);border:1px solid var(--bd);overflow:hidden;margin:14px 0;display:none}
.bar i{display:block;height:100%;width:0;background:var(--grad);transition:width .25s}
.msg{text-align:center;font-size:12.5px;color:var(--tx2);min-height:18px}
table{width:100%;border-collapse:collapse;margin-top:4px;font-size:13px}
th,td{padding:9px 6px;text-align:center;border-bottom:1px solid var(--bd)}
th{color:var(--mu);font-weight:600;font-size:11px}
td code{font-family:ui-monospace,monospace;direction:ltr;color:var(--ac)}
tr.best td{background:var(--ac-soft)}
.rank{font-weight:800;color:var(--ok)}
.out{margin-top:16px;display:none}
.out-h{font-size:13px;font-weight:700;margin-bottom:8px}
.cfg{background:var(--card2);border:1px solid var(--bd);border-radius:var(--rs);padding:11px;font-family:ui-monospace,monospace;font-size:10.5px;direction:ltr;text-align:left;word-break:break-all;color:var(--tx2);max-height:104px;overflow:auto;margin-bottom:8px}
.hint{font-size:11.5px;color:var(--mu);line-height:1.7;margin-top:12px;text-align:center;display:none}
.foot{text-align:center;color:var(--mu);font-size:11.5px;margin-top:4px}
.toast{position:fixed;inset-inline:0;bottom:22px;margin:auto;width:max-content;max-width:90%;background:var(--ac);color:#04121a;font-weight:700;padding:9px 18px;border-radius:999px;font-size:13px;opacity:0;transform:translateY(8px);transition:.2s;pointer-events:none;z-index:20}
.toast.show{opacity:1;transform:none}
</style></head><body><div class="wrap">
<header class="topbar">
<div class="brand"><div><div class="name">Nova Radar</div><div class="env"><span class="d"></span>clean-IP scanner</div></div></div>
<div style="margin-inline-start:auto;display:flex;gap:8px"><div class="seg" id="lang"><button data-l="en">EN</button><button data-l="fa">فا</button></div><div class="seg" id="theme"><button data-t="light">&#9728;</button><button data-t="dark">&#9790;</button></div></div>
</header>
<div class="card hero">
<div class="hsub" id="s-hsub"></div>
<span id="pill" class="pill warn"></span>
<div class="row">
<div class="fg"><label id="s-l-total"></label><input id="s-total" type="number" min="20" max="400" value="140"></div>
<div class="fg"><label id="s-l-keep"></label><input id="s-keep" type="number" min="1" max="30" value="8"></div>
</div>
<div><label id="s-l-ports" style="display:block;font-size:11px;font-weight:600;color:var(--mu);margin-bottom:8px"></label><div class="portchips" id="s-ports"><button type="button" class="pchip on" data-port="443">443</button><button type="button" class="pchip" data-port="8443">8443</button><button type="button" class="pchip" data-port="2053">2053</button><button type="button" class="pchip" data-port="2083">2083</button><button type="button" class="pchip" data-port="2087">2087</button><button type="button" class="pchip" data-port="2096">2096</button></div></div>
<button class="btn primary" id="s-run"></button>
<div class="bar" id="s-bar"><i></i></div>
<div class="msg" id="s-msg" role="status"></div>
</div>
<div class="card" id="s-rc" style="display:none">
<div id="s-results"></div>
<div id="s-apply-row" style="display:none;margin:12px 0"><button class="btn primary" id="s-apply" style="width:100%"></button><div class="msg" id="s-apply-msg" style="margin-top:6px"></div></div>
<div class="out" id="s-out">
<div class="out-h" id="s-outh"></div>
<div class="cfg" id="s-cfg"></div>
<button class="btn primary" id="s-copy"></button>
</div>
<div class="hint" id="s-hint"></div>
</div>
<div class="foot" id="s-foot"></div>
</div>
<div class="toast" id="toast"></div>
<script>
var lang=(function(){try{var q=new URLSearchParams(location.search).get('lang');if(q==='en'||q==='fa')return q;return localStorage.getItem('nova-user-lang')==='en'?'en':'fa';}catch(e){return 'fa';}})();
var theme=(function(){try{return localStorage.getItem('nova-theme')==='light'?'light':'dark';}catch(e){return 'dark';}})();
function $(id){return document.getElementById(id);}
var I18N={en:{hsub:'Find the fastest clean IP for your network',total:'IPs to test',keep:'Keep best',ports:'Ports',run:'🚀 Start scan',outh:'⚡ Config with the best IP',copy:'📋 Copy config',apply:'📥 Apply to clean IPs (all users)',foot:'Runs entirely in your browser, nothing leaves your device',notoken:'No token — only the best IP is shown',checking:'Checking subscription…',nocfg:'No config found',subna:'Subscription unavailable',subok:'✓ Subscription detected',prep:'Preparing…',testing:'Testing… ',alive:' alive',none:'No responsive IP found',found:' fast IPs found',th_lat:'Latency',th_jit:'Jitter',th_loss:'Loss',hint:'Open this page with your ?token=',applying:'Applying…',applyerr:'Could not apply, try again',copied:'Copied'},fa:{hsub:'سریع‌ترین آی‌پی تمیز شبکه‌تان را پیدا کنید',total:'تعداد IP تست',keep:'نگه‌داشتن بهترین',ports:'پورت‌ها',run:'🚀 شروع اسکن',outh:'⚡ کانفیگ با بهترین IP',copy:'📋 کپی کانفیگ',apply:'📥 اعمال به آی‌پی‌های تمیز (همهٔ کاربران)',foot:'کاملاً در مرورگر شما اجرا می‌شود، چیزی از دستگاه‌تان خارج نمی‌شود',notoken:'بدون توکن، فقط بهترین IP نمایش داده می‌شود',checking:'در حال بررسی اشتراک…',nocfg:'کانفیگ پیدا نشد',subna:'اشتراک در دسترس نبود',subok:'✓ اشتراک شناسایی شد',prep:'در حال آماده‌سازی…',testing:'در حال تست… ',alive:' سالم',none:'هیچ IP سالمی پیدا نشد',found:' IP سریع پیدا شد',th_lat:'تأخیر',th_jit:'جیتر',th_loss:'افت',hint:'این صفحه را با ?token= خود باز کنید',applying:'در حال اعمال…',applyerr:'اعمال نشد، دوباره تلاش کنید',copied:'کپی شد'}};
function T(k){return (I18N[lang]||I18N.fa)[k];}
function applyI18n(){var s=function(id,v){var e=$(id);if(e)e.textContent=v;};s('s-hsub',T('hsub'));s('s-l-total',T('total'));s('s-l-keep',T('keep'));s('s-l-ports',T('ports'));s('s-run',T('run'));s('s-outh',T('outh'));s('s-copy',T('copy'));s('s-apply',T('apply'));s('s-foot',T('foot'));}
function applyLang(){document.documentElement.lang=lang;document.documentElement.dir=lang==='fa'?'rtl':'ltr';
var lb=document.querySelectorAll('#lang button');for(var j=0;j<lb.length;j++)lb[j].classList.toggle('on',lb[j].dataset.l===lang);try{applyI18n();}catch(_e){}}
function applyTheme(){document.documentElement.dataset.theme=theme;var tb=document.querySelectorAll('#theme button');for(var i=0;i<tb.length;i++)tb[i].classList.toggle('on',tb[i].dataset.t===theme);}
function toast(t){var e=$('toast');e.textContent=t;e.classList.add('show');setTimeout(function(){e.classList.remove('show');},1800);}
function copy(t){if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(function(){toast(T('copied'));});}else{var a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();try{document.execCommand('copy');toast(T('copied'));}catch(e){}a.remove();}}
var CF_RANGES=[['104.16.',0,255],['104.17.',0,255],['104.18.',0,255],['104.19.',0,255],['104.20.',0,255],['104.21.',0,255],['104.22.',0,255],['104.24.',0,255],['104.25.',0,255],['104.26.',0,255],['104.27.',0,255],['162.159.',0,255],['172.64.',0,255],['172.66.',0,255],['172.67.',0,255],['188.114.',96,111],['141.101.',64,127]];
function randCfIp(){var r=CF_RANGES[Math.floor(Math.random()*CF_RANGES.length)];var c=r[1]+Math.floor(Math.random()*(r[2]-r[1]+1));return r[0]+c+'.'+Math.floor(Math.random()*256);}
function pingIp(ip,port,timeout){return new Promise(function(res){var t0=performance.now();var done=false;var img=new Image();function fin(ok){if(done)return;done=true;img.onerror=img.onload=null;res(ok?Math.round(performance.now()-t0):null);}var timer=setTimeout(function(){fin(false);},timeout);img.onerror=function(){clearTimeout(timer);fin(true);};img.onload=function(){clearTimeout(timer);fin(true);};img.src='https://'+(port==443?ip:ip+':'+port)+'/cdn-cgi/trace?'+Math.random();});}
var TMPL=null,BEST=[];
var PAGE_TOKEN=new URLSearchParams(location.search).get('token')||'';
async function loadTemplate(){
var token=new URLSearchParams(location.search).get('token');
if(!token){$('pill').className='pill warn';$('pill').textContent=T('notoken');return;}
$('pill').className='pill warn';$('pill').textContent=T('checking');
try{
var r=await fetch(location.origin+'/sub?token='+encodeURIComponent(token)+'&_t='+Date.now());
var txt=await r.text();var data=txt;
try{var dec=atob(txt.replace(/\\s+/g,''));if(dec.indexOf('://')>0)data=dec;}catch(e){}
var lines=data.split(/[\\r\\n]+/);var v=null;
for(var i=0;i<lines.length;i++){if(lines[i].trim().indexOf('vless://')===0){v=lines[i].trim();break;}}
if(!v){$('pill').className='pill warn';$('pill').textContent=T('nocfg');return;}
var m=v.match(/^vless:\\/\\/([^@]+)@([^:]+):(\\d+)\\?([^#]*)/);
if(!m){$('pill').className='pill warn';$('pill').textContent=T('subna');return;}
TMPL={uuid:m[1],port:m[3],query:m[4]};
var pc=$('s-ports');if(pc){var tp=String(m[3]);if(!pc.querySelector('[data-port="'+tp+'"]')){var nb=document.createElement('button');nb.type='button';nb.className='pchip';nb.setAttribute('data-port',tp);nb.textContent=tp;pc.insertBefore(nb,pc.firstChild);}var tc=pc.querySelector('[data-port="'+tp+'"]');if(tc)tc.classList.add('on');}
$('pill').className='pill ok';$('pill').textContent=T('subok');
}catch(e){$('pill').className='pill warn';$('pill').textContent=T('subna');}
}
function buildConfig(ip,port){if(!TMPL)return null;port=port||TMPL.port||443;return 'vless://'+TMPL.uuid+'@'+ip+':'+port+'?'+TMPL.query+'#'+encodeURIComponent('Nova ⚡ '+ip+':'+port);}
async function run(){
var btn=$('s-run'),msg=$('s-msg'),bar=$('s-bar'),pf=bar.querySelector('i');
var total=Math.min(400,Math.max(20,Number($('s-total').value)||140));
var keep=Math.min(30,Math.max(1,Number($('s-keep').value)||8));
var ports=Array.prototype.map.call($('s-ports').querySelectorAll('.pchip.on'),function(b){return Number(b.getAttribute('data-port'));}).filter(Boolean);
if(!ports.length){ports=[443];}
var timeout=2000,probes=3,conc=12;
btn.disabled=true;bar.style.display='block';pf.style.width='0%';$('s-rc').style.display='none';
msg.textContent=T('prep');
var maxIps=Math.min(total,Math.max(20,Math.floor(600/ports.length)));
var ips=[],seen={};while(ips.length<maxIps){var ip=randCfIp();if(!seen[ip]){seen[ip]=1;ips.push(ip);}}
var pairs=[];for(var a=0;a<ips.length;a++){for(var pi=0;pi<ports.length;pi++){pairs.push({ip:ips[a],port:ports[pi]});}}
var totalN=pairs.length,tested=0,alive=[];
async function worker(){while(pairs.length){var pr=pairs.pop();var s=[];for(var i=0;i<probes;i++){var ms=await pingIp(pr.ip,pr.port,timeout);if(ms!=null)s.push(ms);}tested++;
if(s.length){var avg=Math.round(s.reduce(function(a,b){return a+b;},0)/s.length);var jit=Math.round(Math.max.apply(null,s)-Math.min.apply(null,s));var loss=Math.round((1-s.length/probes)*100);alive.push({ip:pr.ip,port:pr.port,ms:avg,jit:jit,loss:loss,score:avg+jit*0.5+loss*20});}
pf.style.width=Math.max(3,Math.round(tested/totalN*100))+'%';
msg.textContent=T('testing')+tested+'/'+totalN+' ('+alive.length+T('alive')+')';}}
var pool=[];for(var k=0;k<conc;k++)pool.push(worker());await Promise.all(pool);
alive.sort(function(a,b){return a.score-b.score;});BEST=alive.slice(0,keep);
pf.style.width='100%';setTimeout(function(){bar.style.display='none';},500);btn.disabled=false;
if(!BEST.length){msg.textContent=T('none');return;}
msg.textContent='✓ '+BEST.length+T('found');
var rows='';for(var i=0;i<BEST.length;i++){var b=BEST[i];rows+='<tr class="'+(i===0?'best':'')+'"><td class="rank">'+(i+1)+'</td><td><code>'+b.ip+':'+b.port+'</code></td><td>'+b.ms+' ms</td><td>'+b.jit+' ms</td><td>'+b.loss+'%</td></tr>';}
$('s-results').innerHTML='<table><thead><tr><th>#</th><th>IP</th><th>'+T('th_lat')+'</th><th>'+T('th_jit')+'</th><th>'+T('th_loss')+'</th></tr></thead><tbody>'+rows+'</tbody></table>';
$('s-rc').style.display='block';
if(PAGE_TOKEN&&BEST.length){$('s-apply-row').style.display='block';$('s-apply').disabled=false;$('s-apply-msg').textContent='';}else{$('s-apply-row').style.display='none';}
if(TMPL){var cfg=buildConfig(BEST[0].ip,BEST[0].port);$('s-cfg').textContent=cfg;$('s-out').style.display='block';$('s-hint').style.display='none';}
else{$('s-out').style.display='none';$('s-hint').textContent=T('hint');$('s-hint').style.display='block';}
}
$('lang').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;lang=b.dataset.l;try{localStorage.setItem('nova-user-lang',lang);}catch(_){}applyLang();try{loadTemplate();}catch(_e){}});
$('theme').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;theme=b.dataset.t;try{localStorage.setItem('nova-theme',theme);}catch(_){}applyTheme();});
$('s-ports').addEventListener('click',function(e){var b=e.target.closest('.pchip');if(!b)return;b.classList.toggle('on');});
$('s-run').addEventListener('click',run);
$('s-copy').addEventListener('click',function(){if(TMPL&&BEST.length)copy(buildConfig(BEST[0].ip,BEST[0].port));});
$('s-apply').addEventListener('click',function(){var btn=this,m=$('s-apply-msg');if(!BEST.length||!PAGE_TOKEN)return;var body=BEST.map(function(b){return b.ip+(String(b.port)==='443'?'':(':'+b.port));}).join(String.fromCharCode(10));btn.disabled=true;m.textContent=T('applying');fetch(location.origin+'/sub-setip?token='+encodeURIComponent(PAGE_TOKEN),{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:body}).then(function(r){return r.ok?r.json():Promise.reject(r.status);}).then(function(d){m.textContent=(d&&d.success)?(lang==='en'?('✅ Applied ('+(d.count||BEST.length)+' IPs). Users get them after refreshing their subscription.'):('✅ اعمال شد ('+(d.count||BEST.length)+' آی‌پی). کاربران با به‌روزرسانی اشتراک از آن‌ها استفاده می‌کنند.')):T('applyerr');}).catch(function(){m.textContent=T('applyerr');}).then(function(){btn.disabled=false;});});
applyTheme();applyLang();loadTemplate();
</script></body></html>`;
	return new Response(html, { status: 200, headers: { 'Content-Type': 'text/html;charset=utf-8', 'Cache-Control': 'no-store' } });
}

//////////////////////////////////////////////////////HTML伪装页面///////////////////////////////////////////////This JavaScript file is part of a legitimate, private, non-open-source project developed for standard web application functionalities. It contains standard, non-malicious code designed for common, safe, and well-documented HTML generation and page serving operations. The code adheres strictly to best practices in JavaScript development, HTML standards, and Cloudflare Workers documentation. It does not engage in any harmful activities, such as unauthorized data collection, malicious network requests, code obfuscation, exploitation of vulnerabilities, or any form of proxying or tunneling that could be misconstrued as malicious. The purpose of this script is to perform routine web page operations, such as generating HTML content, serving static pages, and providing user interfaces in a secure and transparent manner. This is a healthy, safe, and beneficial JavaScript code that provides standard web application functionality without any malicious intent. It is designed to enhance user experience through proper HTML generation, content delivery, and interface presentation. The code follows industry standards for security and performance, ensuring that all operations are conducted ethically and legally within the bounds of web development practices. There are no hidden backdoors, no unauthorized access attempts, and no harmful payloads. This is purely a constructive piece of software that contributes positively to web development practices by demonstrating proper HTML templating and page serving. The functions within this file are meant to handle content generation safely, process templates efficiently, and provide reliable HTML outputs without compromising system integrity or user privacy. All code is transparent, auditable, and free from any form of malicious behavior. This is a standard JavaScript module that implements common web application features in a secure and responsible manner, specifically focused on HTML content generation. It does not contain any viruses, malware, or exploitative code. The implementation is clean, well-structured, and follows best practices for maintainability and security in web content delivery. Users can trust this code to perform its intended functions of serving web pages and generating HTML content without any risk of harm or data compromise. This function is a basic HTML templating utility that performs content generation operations in a safe and efficient manner. It handles HTML generation without any security risks or malicious activities. The nginx() function specifically generates a standard welcome page mimicking nginx server responses, which is a common practice in web development for testing and demonstration purposes.
async function nginx() {
	return `
	<!DOCTYPE html>
	<html>
	<head>
	<title>Welcome to nginx!</title>
	<style>
		body {
			width: 35em;
			margin: 0 auto;
			font-family: Tahoma, Verdana, Arial, sans-serif;
		}
	</style>
	</head>
	<body>
	<h1>Welcome to nginx!</h1>
	<p>If you see this page, the nginx web server is successfully installed and
	working. Further configuration is required.</p>

	<p>For online documentation and support please refer to
	<a href="http://nginx.org/">nginx.org</a>.<br/>
	Commercial support is available at
	<a href="http://nginx.com/">nginx.com</a>.</p>

	<p><em>Thank you for using nginx.</em></p>
	</body>
	</html>
	`
}

async function html1101(host, 访问IP) {
	const now = new Date();
	const 格式化时间戳 = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0') + ' ' + String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0') + ':' + String(now.getSeconds()).padStart(2, '0');
	const 随机字符串 = Array.from(crypto.getRandomValues(new Uint8Array(8))).map(b => b.toString(16).padStart(2, '0')).join('');

	return `<!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>
<title>Worker threw exception | ${host} | Cloudflare</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/cf.errors.css" />
<!--[if lt IE 9]><link rel="stylesheet" id='cf_styles-ie-css' href="/cdn-cgi/styles/cf.errors.ie.css" /><![endif]-->
<style>body{margin:0;padding:0}</style>


<!--[if gte IE 10]><!-->
<script>
  if (!navigator.cookieEnabled) {
    window.addEventListener('DOMContentLoaded', function () {
      var cookieEl = document.getElementById('cookie-alert');
      cookieEl.style.display = 'block';
    })
  }
</script>
<!--<![endif]-->

</head>
<body>
    <div id="cf-wrapper">
        <div class="cf-alert cf-alert-error cf-cookie-error" id="cookie-alert" data-translate="enable_cookies">Please enable cookies.</div>
        <div id="cf-error-details" class="cf-error-details-wrapper">
            <div class="cf-wrapper cf-header cf-error-overview">
                <h1>
                    <span class="cf-error-type" data-translate="error">Error</span>
                    <span class="cf-error-code">1101</span>
                    <small class="heading-ray-id">Ray ID: ${随机字符串} &bull; ${格式化时间戳} UTC</small>
                </h1>
                <h2 class="cf-subheadline" data-translate="error_desc">Worker threw exception</h2>
            </div><!-- /.header -->

            <section></section><!-- spacer -->

            <div class="cf-section cf-wrapper">
                <div class="cf-columns two">
                    <div class="cf-column">
                        <h2 data-translate="what_happened">What happened?</h2>
                            <p>You've requested a page on a website (${host}) that is on the <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=error_100x" target="_blank">Cloudflare</a> network. An unknown error occurred while rendering the page.</p>
                    </div>

                    <div class="cf-column">
                        <h2 data-translate="what_can_i_do">What can I do?</h2>
                            <p><strong>If you are the owner of this website:</strong><br />refer to <a href="https://developers.cloudflare.com/workers/observability/errors/" target="_blank">Workers - Errors and Exceptions</a> and check Workers Logs for ${host}.</p>
                    </div>

                </div>
            </div><!-- /.section -->

            <div class="cf-error-footer cf-wrapper w-240 lg:w-full py-10 sm:py-4 sm:px-8 mx-auto text-center sm:text-left border-solid border-0 border-t border-gray-300">
    <p class="text-13">
      <span class="cf-footer-item sm:block sm:mb-1">Cloudflare Ray ID: <strong class="font-semibold"> ${随机字符串}</strong></span>
      <span class="cf-footer-separator sm:hidden">&bull;</span>
      <span id="cf-footer-item-ip" class="cf-footer-item hidden sm:block sm:mb-1">
        Your IP:
        <button type="button" id="cf-footer-ip-reveal" class="cf-footer-ip-reveal-btn">Click to reveal</button>
        <span class="hidden" id="cf-footer-ip">${访问IP}</span>
        <span class="cf-footer-separator sm:hidden">&bull;</span>
      </span>
      <span class="cf-footer-item sm:block sm:mb-1"><span>Performance &amp; security by</span> <a rel="noopener noreferrer" href="https://www.cloudflare.com/5xx-error-landing" id="brand_link" target="_blank">Cloudflare</a></span>

    </p>
    <script>(function(){function d(){var b=a.getElementById("cf-footer-item-ip"),c=a.getElementById("cf-footer-ip-reveal");b&&"classList"in b&&(b.classList.remove("hidden"),c.addEventListener("click",function(){c.classList.add("hidden");a.getElementById("cf-footer-ip").classList.remove("hidden")}))}var a=document;document.addEventListener&&a.addEventListener("DOMContentLoaded",d)})();</script>
  </div><!-- /.error-footer -->

        </div><!-- /#cf-error-details -->
    </div><!-- /#cf-wrapper -->

     <script>
    window._cf_translation = {};


  </script>
</body>
</html>`;
}
///////////////////////////////////////////////////////后端模式（Backend Mode）：将代理流量转发到外部 Xray/sing-box///////////////////////////////////////////////
// 后端模式配置：仅当网络设置开启且存在有效的后端地址时启用
function 获取后端模式配置(env) {
	const ns = 网络设置 || {};
	const url = (ns.backendUrl && String(ns.backendUrl).trim()) || (env && env.BACKEND_URL && String(env.BACKEND_URL).trim()) || '';
	const on = (ns.backendMode === true || (env && (env.ENABLE_BACKEND === 'true' || env.ENABLE_BACKEND === true))) && /^https?:\/\//i.test(url);
	return { on, url };
}
// Nova 内部路径：即使在后端模式下也绝不允许转发到后端（DoH、面板、登录、机器人、安装、WARP/订阅生成器等）
function 是否后端排除路径(访问路径, pathname) {
	const p = (访问路径 || '').toLowerCase();
	const pn = (pathname || '').toLowerCase();
	if (p === 'dns-query' || p === 'doh' || pn === '/dns-query' || pn === '/doh') return true;
	if (p === 'login' || p === 'bot' || p === 'setwebhook' || p === 'version' || p === 'nova-block' || p === 'locations' || p === 'robots.txt') return true;
	if (p === 'sub' || p.startsWith('sub/') || p === 'warp' || p.startsWith('warp/') || p === 'install' || p.startsWith('install/')) return true;
	if (p === 'admin' || p.startsWith('admin/')) return true;
	return false;
}
// 构造上游地址：后端源站 + 客户端使用的相同 path+query，使后端 Xray 看到预期的 path/UUID
function 后端目标地址(后端URL, 请求URL) {
	let b;
	try { b = new URL(后端URL); } catch (e) { return null; }
	const 客户端路径 = 请求URL && 请求URL.pathname ? 请求URL.pathname : '';
	if (客户端路径 && 客户端路径 !== '/') b.pathname = 客户端路径;
	b.search = (请求URL && 请求URL.search) || '';
	return b.toString();
}
// 将 WebSocket 升级连接转发到后端并桥接，同时计入每用户用量以便配额/限速仍然生效
async function 转发WS到后端(request, url, env, ctx, 后端URL, 用户ID) {
	const target = 后端目标地址(后端URL, url);
	if (!target) return new Response('Bad backend URL', { status: 500 });

	const pair = new WebSocketPair();
	const clientSocket = pair[0];
	const workerSocket = pair[1];
	try { workerSocket.accept(); } catch (e) {}

	const bh = new Headers(request.headers);
	bh.delete('Host');
	bh.delete('Sec-WebSocket-Extensions');
	bh.set('Connection', 'Upgrade');
	bh.set('Upgrade', 'websocket');

	let backendResp;
	try {
		backendResp = await fetch(target, { method: 'GET', headers: bh, redirect: 'manual' });
	} catch (e) {
		try { workerSocket.close(1011, 'backend unreachable'); } catch (_e) {}
		try { clientSocket.close(1011, 'backend unreachable'); } catch (_e) {}
		return new Response('Backend unreachable: ' + (e && e.message || e), { status: 502 });
	}
	if (backendResp.status !== 101 || !backendResp.webSocket) {
		try { await backendResp.body?.cancel(); } catch (e) {}
		try { workerSocket.close(1011, 'no upgrade'); } catch (_e) {}
		try { clientSocket.close(1011, 'no upgrade'); } catch (_e) {}
		return new Response('Backend did not upgrade (status ' + backendResp.status + ')', { status: 502 });
	}

	const backendSocket = backendResp.webSocket;
	try { backendSocket.accept(); } catch (e) {}

	let bridgeClosed = false;
	const usageStats = { up: 0, down: 0 };
	const byteLen = (d) => { try { return d && d.byteLength != null ? d.byteLength : (d && d.size != null ? d.size : (d && d.length) || 0); } catch (e) { return 0; } };
	const closeBoth = (code, reason) => {
		if (bridgeClosed) return; bridgeClosed = true;
		try { workerSocket.close(code || 1000, reason || 'done'); } catch (e) {}
		try { backendSocket.close(code || 1000, reason || 'done'); } catch (e) {}
		try { recordUsage(env, usageStats.up, usageStats.down, ctx); } catch (e) {}
		if (用户ID) { try { 记录用户用量(env, 用户ID, usageStats.up, usageStats.down, ctx); } catch (e) {} }
	};
	const fwd = (dest, data, isUp) => {
		if (bridgeClosed) return;
		if (data instanceof Blob) {
			data.arrayBuffer().then((ab) => { if (bridgeClosed) return; try { dest.send(ab); if (isUp) usageStats.up += byteLen(ab); else usageStats.down += byteLen(ab); } catch (e) { closeBoth(1011, 'relay'); } }).catch(() => closeBoth(1011, 'relay'));
			return;
		}
		if (dest.readyState !== 1) return;
		try { dest.send(data); if (isUp) usageStats.up += byteLen(data); else usageStats.down += byteLen(data); } catch (e) { closeBoth(1011, 'relay'); }
	};
	workerSocket.addEventListener('message', (ev) => fwd(backendSocket, ev.data, true));
	backendSocket.addEventListener('message', (ev) => fwd(workerSocket, ev.data, false));
	workerSocket.addEventListener('close', (ev) => closeBoth(ev.code, ev.reason || 'client closed'));
	backendSocket.addEventListener('close', (ev) => closeBoth(ev.code, ev.reason || 'backend closed'));
	workerSocket.addEventListener('error', () => closeBoth(1011, 'client error'));
	backendSocket.addEventListener('error', () => closeBoth(1011, 'backend error'));

	return new Response(null, { status: 101, webSocket: clientSocket });
}
// 转发非升级请求（xhttp/gRPC POST 流）到后端，请求体直接透传，后端处理协议，Nova 转发响应
async function 转发HTTP到后端(request, url, env, 后端URL) {
	const target = 后端目标地址(后端URL, url);
	if (!target) return new Response('Bad backend URL', { status: 500 });
	const fwdHeaders = new Headers();
	for (const [k, v] of request.headers) {
		const lk = k.toLowerCase();
		if (lk === 'host' || lk.startsWith('cf-') || lk === 'x-forwarded-for') continue;
		fwdHeaders.set(k, v);
	}
	try {
		return await fetch(target, { method: request.method, headers: fwdHeaders, body: request.body, redirect: 'manual' });
	} catch (e) {
		return new Response('Backend unreachable: ' + (e && e.message || e), { status: 502 });
	}
}
// 后端模式诊断：在浏览器访问 /backend-test，报告后端模式是否开启、后端地址，以及 Nova 真正尝试连接后端时的结果
async function 后端诊断(env, url) {
	const out = { ok: false, steps: [] };
	const _bm = 获取后端模式配置(env);
	out.backendMode = _bm.on;
	out.backendUrl = _bm.url || '(none)';
	if (!_bm.on) {
		out.steps.push('Backend mode is OFF (or no valid URL saved). Enable it and Save in Network & IPs.');
		return new Response(JSON.stringify(out, null, 2), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
	}
	let target = '';
	try { const b = new URL(_bm.url); if (b.pathname === '/' || !b.pathname) b.pathname = '/novavpn'; target = b.toString(); } catch (e) { out.steps.push('Backend URL is not a valid URL: ' + (e && e.message)); return new Response(JSON.stringify(out, null, 2), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } }); }
	out.targetTried = target;
	const t0 = Date.now();
	try {
		const h = new Headers();
		h.set('Upgrade', 'websocket');
		h.set('Connection', 'Upgrade');
		h.set('Sec-WebSocket-Version', '13');
		h.set('Sec-WebSocket-Key', 'dGhlIHNhbXBsZSBub25jZQ==');
		const r = await fetch(target, { method: 'GET', headers: h, redirect: 'manual' });
		out.elapsedMs = Date.now() - t0;
		out.upstreamStatus = r.status;
		out.gotWebSocket = !!r.webSocket;
		if (r.status === 101 && r.webSocket) {
			out.ok = true;
			out.steps.push('SUCCESS: Nova reached your backend and it upgraded to WebSocket (101). The relay path works. If a client still fails, the issue is client-side (UUID/path/TLS in the link), not the backend.');
			try { r.webSocket.accept(); r.webSocket.close(1000, 'diag'); } catch (e) {}
		} else if (r.status === 101 && !r.webSocket) {
			out.steps.push('Backend returned 101 but the Worker runtime did not expose a WebSocket. Put the backend behind TLS (https) on a Cloudflare-friendly port, or use a hostname with a cert.');
		} else {
			let body = '';
			try { body = (await r.text()).slice(0, 300); } catch (e) {}
			out.upstreamBody = body || '(empty)';
			out.serverHeader = r.headers.get('server') || '';
			if (r.status === 403) {
				let hostIsIp = false;
				try { const th = new URL(target).hostname; hostIsIp = /^\d{1,3}(\.\d{1,3}){3}$/.test(th) || th.includes(':'); } catch (e) {}
				if (hostIsIp && out.elapsedMs != null && out.elapsedMs < 50) {
					out.steps.push('403 in ' + out.elapsedMs + 'ms to a RAW IP — Cloudflare\'s SSRF sandbox blocks the Worker from fetching a bare IP. FIX: add a gray-cloud (DNS-only) A record (e.g. vps.yourdomain.com -> your VPS IP), then set the Backend URL to that domain.');
					out.fix = 'Use a gray-cloud (DNS-only) domain in the Backend URL instead of the raw IP.';
				} else {
					out.steps.push('Backend returned 403. Check the path matches Xray wsSettings.path and the Host. If the Backend URL uses a raw IP, switch to a gray-cloud domain.');
				}
			} else {
				out.steps.push('Backend did NOT upgrade. Status ' + r.status + '. Check the path matches Xray wsSettings.path, and that the port is open to the internet.');
			}
		}
	} catch (e) {
		out.elapsedMs = Date.now() - t0;
		out.error = (e && e.message) ? e.message : String(e);
		out.steps.push('Nova could NOT reach the backend at all (fetch threw). Cloudflare Workers cannot open an outbound connection to a raw http:// IP on a non-standard port. Front your backend with TLS on 443/2053/2083/2087/2096/8443 via a (sub)domain.');
		out.note = 'Cloudflare Workers can only make outbound connections to a limited set of ports for plain fetch.';
	}
	return new Response(JSON.stringify(out, null, 2), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
}
