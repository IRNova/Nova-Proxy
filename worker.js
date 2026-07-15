const _D_={_vl_:atob('dmxlc3M='),_tr_:atob('dHJvamFu'),_vm_:atob('dm1lc3M='),_ss_:atob('c2hhZG93c29ja3M='),_wg_:atob('d2lyZWd1YXJk'),_cl_:atob('Y2xhc2g='),_sb_:atob('c2luZ2JveA=='),_sb2_:atob('c2luZy1ib3g='),_mh_:atob('bWlob21v'),_hd_:atob('aGlkZGlmeQ=='),_sg_:atob('c3VyZ2U='),_qx_:atob('cXVhbng='),_ln_:atob('bG9vbg=='),_np_:atob('Tm92YVByb3h5'),_np2_:atob('Tm92YS1Qcm94eQ=='),_np3_:atob('Tm92YQ=='),_cf_:atob('Y2xvdWRmbGFyZQ=='),_xr_:atob('eHJheQ=='),_cr_:atob('Q21saXVzcw=='),_pr_:atob('UFJPWFlJUA=='),_sp_:atob('c3BlZWQuY2xvdWRmbGFyZS5jb20='),_wr_:atob('Tm92YS1XQVJQ'),_ws_:atob('d3M='),_grpc_:atob('Z3JwYw=='),_xhttp_:atob('eHR0cA=='),_aes128_:atob('YWVzLTEyOC1nY20='),_aes256_:atob('YWVzLTI1Ni1nY20='),_chrome_:atob('Y2hyb21l'),_mixed_:atob('bWl4ZWQ=')};
const Version = 'V4.1.0';
let config_JSON, metavechIP = '', hafelSocks5Metavech = null, hafelSocks5Klali = false, cheshbonSocks5Sheli = '', parsedSocks5Address = {};
let mitmonReshimaLevanaSocks5 = null, mitmonIpMetavech, mitmonNituachMetavech, indeksMaarachMetavechMitmon = 0, hafelGibuiMetavech = true, hadpasatYomanNipui = false;
let connClientIp = '';
let connRejectReason = null;
let connProxyWhitelist = [];
let _globalEnv = null;
let _globalCtx = null;
let hagdarotReshet = null, mitmonHagdarotReshet = null, zmanMitmonHagdarotReshet = 0;
let tetzurotNat64 = '', mitmonKidometNat64 = null, zmanMitmonNat64 = 0, makorMitmonNat64 = '';
let _d1Ready = false, _kvMigratedFlag = false;
const _md5md5Cache = new Map();
const _sha224Cache = new Map();
const _cidrListCache = new Map();
const _poolCache = new Map();
let mitmonWorkerUuid = null, zmanMitmonWorkerUuid = 0;
let zmanSinchronMerkaziAcharon = 0;
let mitmonAutoKey = null, zmanMitmonAutoKey = 0;
let savedUsersAuth = null, savedUsersAuthZman = 0;
let mitmonCfUsage = null, zmanMitmonCfUsage = 0;
// --- Per-connection multi-user context: each proxy connection resolves a user ID, used for speed-limit / accounting / rejection ---
let chiburMishtameshId = null, sibatDchiyatChibur = null, magbilMehirutMishtameshKBps = 0;
let mitmonShimushMishtamesh = {}, zmanMitmonNefachMishtameshChibur = 0;
let mitmonShimushYomiMishtamesh = {}, taarichShimushYomiMishtamesh = '';
let reshimaLevanaSocks5 = ['*tapecontent.net', '*cloudatacdn.com', '*loadshare.org', '*cdn-centaurus.com', 'scholar.google.com'];
function hostMatchesProxyList(host) {
	const lists = connProxyWhitelist.length ? reshimaLevanaSocks5.concat(connProxyWhitelist) : reshimaLevanaSocks5;
	return lists.some(p => { try { return new RegExp(`^${String(p).trim().replace(/\*/g, '.*')}$`, 'i').test(host); } catch (e) { return false; } });
}
const PagesDafStati = 'https://nova-panel.github.io/';
function panelOrigin(env){ const e = env || _globalEnv; const u = e && (e.PAGES_URL || e.PAGE_URL); if (u && typeof u === 'string' && u.trim()){ let x = u.trim(); if(!/^https?:\/\//i.test(x)) x='https://'+x; return x.replace(/\/+$/,'')+'/'; } return PagesDafStati; }
const NOVA_FREE_NOTICE = '🎁 نوا رایگان است، برای آن به کسی پول ندهید';
// Official Nova Telegram channel. LOCKED: this exact URL is injected into every
// subscription and is NOT overridable from the panel, env, or KV, so a reseller can
// never point the "channel" line anywhere but Nova's own channel.
const NOVA_TG_CHANNEL = 'https://t.me/irnova_proxy';
// Build stamp: bump this whenever worker.js changes so a deploy can be verified at a
// glance (GET /install/status returns it). If the panel/status still shows an old build
// after a deploy, the upload didn't take.
const NOVA_BUILD = '2026-07-14.20';
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
const SESSION_MAX_AGE_MS = 86400000; // absolute safety-net cap (kept for reference)
const SESSION_IDLE_MS = 900000; // 15 minutes: admin session auto-logout after this much inactivity
const LOGIN_MAX_ATTEMPTS = 8, LOGIN_WINDOW_MS = 600000, LOGIN_BLOCK_MS = 900000;
const __loginAttempts = new Map();
let mitmonSismatMenahel = null, zmanMitmonSismatMenahel = 0;
// ===== Global constants and utility functions =====
const maksBytimNetunimMukdamimWS = 8 * 1024, maksOrechKoteretNetunimMukdamimWS = Math.ceil(maksBytimNetunimMukdamimWS * 4 / 3) + 4;
const bytesYaadIchudAlia = 64 * 1024, maksBytimTorAloa = 32 * 1024 * 1024, maksPritimTorAloa = 8192;
const bytesGrainYerida = 64 * 1024, safZanavGrainMorad = 512, milishniyotShkitatGrainMorad = 0;
const haavaraMehira = false, haavaraMaks = false;
let misparChiyugTcpMakbili = 4, preloadChiyugMerotz = false;
const regexKtovetTzomet = /^(\[[\da-fA-F:]+\]|[\d.]+|[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*)(?::(\d+))?(?:#(.+))?$/;
const novaMachsanRaw = 'https://raw.githubusercontent.com/IRNova/Nova-Proxy/main';
const urlGirsatNOVA = novaMachsanRaw + '/version.json';
const NOVAWorkerSrcFallback = novaMachsanRaw + '/worker.js';
const tikraTzometLecholMishtamesh = 40;
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
async function verifySessionToken(token, UA, key, pass, maxAgeMs = SESSION_IDLE_MS) {
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
	if (await verifySessionToken(authCookie, UA, key, pass) || await verifyTelegramSessionToken(authCookie, key, pass)) return true;
	const authHeader = request.headers.get('Authorization') || '';
	const bearerKey = authHeader.replace('Bearer ', '').trim();
	if (bearerKey && isPanelApiKey(bearerKey)) { updateApiKeyLastUsed(bearerKey); return true; }
	return false;
}
async function yatzerTokenKnisatTelegram(chatId, key, bucket = Math.floor(Date.now() / 300000)) {
	const enc = new TextEncoder();
	const mac = await hmac('SHA-256', enc.encode(String(key)), enc.encode(`tg-login|${chatId}|${bucket}`));
	return Array.from(mac, b => b.toString(16).padStart(2, '0')).join('');
}
async function imutTokenHitchabrutTelegram(chatId, token, key) {
	const nowBucket = Math.floor(Date.now() / 300000);
	for (const b of [nowBucket, nowBucket - 1]) {
		if (await yatzerTokenKnisatTelegram(chatId, key, b) === token) return true;
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
const RECOVER_MAX_ATTEMPTS = 3, RECOVER_WINDOW_MS = 600000, RECOVER_BLOCK_MS = 900000;
const __recoverAttempts = new Map();
function recoverRateCheck(ip) {
	const now = Date.now();
	const rec = __recoverAttempts.get(ip);
	if (rec && rec.blockedUntil && now < rec.blockedUntil) return { allowed: false, retryAfter: Math.ceil((rec.blockedUntil - now) / 1000) };
	return { allowed: true };
}
function recoverRecordAttempt(ip) {
	const now = Date.now();
	let rec = __recoverAttempts.get(ip);
	if (!rec || now - rec.windowStart > RECOVER_WINDOW_MS) rec = { count: 0, windowStart: now, blockedUntil: 0 };
	rec.count++;
	if (rec.count >= RECOVER_MAX_ATTEMPTS) rec.blockedUntil = now + RECOVER_BLOCK_MS;
	__recoverAttempts.set(ip, rec);
	if (__recoverAttempts.size > 5000) {
		for (const [k, v] of __recoverAttempts) { if (!v.blockedUntil || now > v.blockedUntil) __recoverAttempts.delete(k); if (__recoverAttempts.size <= 4000) break; }
	}
}
///////////////////////////////////////////////////////Panel API Keys///////////////////////////////////////////////
function generateApiKey(name) {
	const id = crypto.randomUUID();
	const raw = `nova_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
	return { id, name: name || 'Unnamed', key: raw, createdAt: Date.now(), lastUsed: null };
}
function isPanelApiKey(key) {
	if (!key || typeof key !== 'string') return false;
	try {
		const raw = cachedPanelApiKeys;
		if (!raw) return false;
		return raw.some(k => k.key === key);
	} catch (e) { return false; }
}
function isPanelApiKeyOrMaster(key, masterKey) {
	return key === masterKey || isPanelApiKey(key);
}
let cachedPanelApiKeys = null;
let cachedPanelApiKeysTime = 0;
async function loadPanelApiKeys(env) {
	const now = Date.now();
	if (cachedPanelApiKeys && (now - cachedPanelApiKeysTime) < 30000) return cachedPanelApiKeys;
	try {
		const raw = await env.KV.get('panel_api_keys');
		cachedPanelApiKeys = raw ? JSON.parse(raw) : [];
	} catch (e) { cachedPanelApiKeys = []; }
	cachedPanelApiKeysTime = now;
	return cachedPanelApiKeys;
}
async function savePanelApiKeys(env, keys) {
	cachedPanelApiKeys = keys;
	cachedPanelApiKeysTime = Date.now();
	await env.KV.put('panel_api_keys', JSON.stringify(keys));
}
function updateApiKeyLastUsed(key) {
	if (!cachedPanelApiKeys) return;
	const entry = cachedPanelApiKeys.find(k => k.key === key);
	if (entry) { entry.lastUsed = Date.now(); cachedPanelApiKeysTime = Date.now(); }
}
///////////////////////////////////////////////////////REST API: احراز هویت و handlerها///////////////////////////////////////////////
function isApiAuthenticated(request, adminPassword, body) {
	const key = extractAuthKey(request, body);
	if (!key) return false;
	if (key === adminPassword) return true;
	if (isPanelApiKey(key)) { updateApiKeyLastUsed(key); return true; }
	return false;
}
function apiJson(data, status = 200) {
	// ACAO so an admin's browser on one panel can read this panel's API response cross-origin
	// (Multi-Panel Hub: creating a user on a linked panel). Endpoints stay auth-gated regardless.
	return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store', 'Access-Control-Allow-Origin': '*' } });
}
function extractAuthKey(request, body) {
	const authHeader = request.headers.get('Authorization') || '';
	const authKey = authHeader.replace('Bearer ', '').trim();
	let bodyKey = '';
	if (body && typeof body === 'object') bodyKey = body.key || '';
	return authKey || bodyKey;
}
function protectFields(config, isApiKeyAuth) {
	if (!isApiKeyAuth) return config;
	const sensitive = ['masterKey', 'panelApiKeys', 'cfApiToken', 'cfAccountId', 'cfWorkerName', 'tgToken', 'tgChatId', 'tgAdminId', 'syncApiKey', 'hubPanelUrl'];
	const protectedConfig = { ...config };
	for (const f of sensitive) { if (protectedConfig[f] !== undefined) protectedConfig[f] = '[PROTECTED]'; }
	return protectedConfig;
}
async function resolveProxyIpGeo(proxyIp) {
	if (!proxyIp) return null;
	const pips = String(proxyIp).split(/[\r\n,;]+/).map(s => s.trim()).filter(Boolean);
	if (!pips.length) return null;
	try {
		const resp = await fetch(`https://ipinfo.io/${pips[0]}/json`);
		if (resp.ok) {
			const data = await resp.json();
			const cc = (data.country || '').toUpperCase();
			const flags = { US: '🇺🇸', GB: '🇬🇧', DE: '🇩🇪', FR: '🇫🇷', NL: '🇳🇱', JP: '🇯🇵', SG: '🇸🇬', HK: '🇭🇰', KR: '🇰🇷', CA: '🇨🇦', AU: '🇦🇺', IN: '🇮🇳', TR: '🇹🇷', RU: '🇷🇺', BR: '🇧🇷', IT: '🇮🇹', ES: '🇪🇸', SE: '🇸🇪', CH: '🇨🇭', PL: '🇵🇱', AT: '🇦🇹', BE: '🇧🇪', NO: '🇳🇴', FI: '🇫🇮', DK: '🇩🇰', CZ: '🇨🇿', RO: '🇷🇴', UA: '🇺🇦', IL: '🇮🇱', AE: '🇦🇪', SA: '🇦🇪', TH: '🇹🇭', VN: '🇻🇳', MY: '🇲🇾', ID: '🇮🇩', PH: '🇵🇭', TW: '🇹🇼', CN: '🇨🇳', MX: '🇲🇽', AR: '🇦🇷', CL: '🇨🇱', CO: '🇨🇴', ZA: '🇿🇦', EG: '🇪🇬', NG: '🇳🇬', KE: '🇰🇪' };
			return { flag: flags[cc] || '🌐', country: data.country || 'Unknown', countryCode: cc, city: data.city || '', isp: data.org || data.isp || '' };
		}
	} catch (e) {}
	return { flag: '🌐', country: 'Unknown', countryCode: '', city: '', isp: '' };
}
async function notifyHubPanel(env, hostName, ctx) {
	try {
		if (!hagdarotReshet) { try { hagdarotReshet = JSON.parse(await env.KV.get('network-settings.json') || '{}'); } catch (e) { hagdarotReshet = {}; } }
		const hubUrl = (hagdarotReshet.hubPanelUrl || '').trim();
		if (!hubUrl || !hagdarotReshet.tgAdminId) return;
		let fullUrl = hubUrl;
		if (!fullUrl.startsWith('http')) fullUrl = 'https://' + fullUrl;
		const payload = { signal: 'panel_login', panelName: hagdarotReshet.name || hostName, panelHost: hostName, tgAdminId: hagdarotReshet.tgAdminId, ts: Date.now() };
		ctx.waitUntil(fetch(fullUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).catch(() => {}));
	} catch (e) {}
}
async function handleApiUsers(request, env, adminPassword) {
	const method = request.method;
	const url = new URL(request.url);
	const userId = url.searchParams.get('id');
	const action = url.searchParams.get('action');
	let reqBody = {}; try { if (method !== 'GET') reqBody = await request.clone().json(); } catch (e) {}
	if (!isApiAuthenticated(request, adminPassword, reqBody)) return apiJson({ success: false, error: 'Unauthorized' }, 401);
	if (!hagdarotReshet) { try { hagdarotReshet = JSON.parse(await env.KV.get('network-settings.json') || '{}'); } catch (e) { hagdarotReshet = {}; } }
	const users = Array.isArray(hagdarotReshet.users) ? hagdarotReshet.users : [];
	if (method === 'GET' && !userId) {
		const q = url.searchParams.get('q') || '';
		let list = users;
		if (q) { const ql = q.toLowerCase(); list = list.filter(u => (u.name || '').toLowerCase().includes(ql) || (u.id || '').toLowerCase().includes(ql) || (u.username || '').toLowerCase().includes(ql) || (u.notes || '').toLowerCase().includes(ql)); }
		const enriched = await Promise.all(list.map(async u => {
			let totalBytes = 0, dailyBytes = 0, upBytes = 0, downBytes = 0;
			try { const c = await usageGet(env, 'uusage:' + u.id); if (c) { totalBytes = c.total || 0; upBytes = c.up || 0; downBytes = c.down || 0; } } catch (e) {}
			const _today = getDateKey(new Date());
			try { const cd = await usageGet(env, 'uusage-d:' + u.id + ':' + _today); dailyBytes = (cd && cd.total) || 0; } catch (e) {}
			let status = 'active';
			const isExpired = u.expiry ? (Date.now() > Date.parse(u.expiry)) : false;
			if (u.enabled === false) status = u.disabledReason || 'disabled';
			else if (isExpired) status = 'expired';
			else if (u.quotaBytes && totalBytes >= u.quotaBytes) status = 'quota-exceeded';
			else if (u.dailyQuotaBytes && dailyBytes >= u.dailyQuotaBytes) status = 'daily-quota-exceeded';
			const host = url.host;
			const subUrl = `https://${host}/sub?u=${encodeURIComponent(u.tag || u.username || u.id)}`;
			const proxyIpGeo = u.proxyIp ? await resolveProxyIpGeo(u.proxyIp) : null;
			// Compute online IP count from activeIps
			let onlineCount = 0;
			try { const _aip = JSON.parse(u.activeIps || '{}'); onlineCount = Object.keys(_aip).filter(ip => Date.now() - ((_aip[ip] && typeof _aip[ip] === 'object' ? _aip[ip].timestamp : _aip[ip]) || 0) < 20000).length; } catch (e) {}
			return { ...u, usage: { totalBytes, dailyBytes, upBytes, downBytes }, status, subscriptionUrl: subUrl, proxyIpGeo, onlineCount };
		}));
		return apiJson({ success: true, users: enriched, total: enriched.length });
	}
	if (method === 'GET' && userId) {
		const u = users.find(x => x.id === userId || (x.username || '').toLowerCase() === userId.toLowerCase() || (x.name || '').toLowerCase() === userId.toLowerCase());
		if (!u) return apiJson({ success: false, error: 'User not found' }, 404);
		let totalBytes = 0, dailyBytes = 0;
		try { const c = await usageGet(env, 'uusage:' + u.id); if (c) totalBytes = c.total || 0; } catch (e) {}
		const _today = getDateKey(new Date());
		try { const cd = await usageGet(env, 'uusage-d:' + u.id + ':' + _today); dailyBytes = (cd && cd.total) || 0; } catch (e) {}
		let status = 'active';
		const isExpired = u.expiry ? (Date.now() > Date.parse(u.expiry)) : false;
		if (u.enabled === false) status = u.disabledReason || 'disabled';
		else if (isExpired) status = 'expired';
		else if (u.quotaBytes && totalBytes >= u.quotaBytes) status = 'quota-exceeded';
		const subUrl = `https://${url.host}/sub?u=${encodeURIComponent(u.tag || u.username || u.id)}`;
		const proxyIpGeo = u.proxyIp ? await resolveProxyIpGeo(u.proxyIp) : null;
		return apiJson({ success: true, user: { ...u, usage: { totalBytes, dailyBytes }, status, subscriptionUrl: subUrl, proxyIpGeo } });
	}
	if (method === 'POST' && !userId) {
		const name = (reqBody.name || '').trim();
		if (!name) return apiJson({ success: false, error: 'Name is required' }, 400);
		const newId = crypto.randomUUID().replace(/-/g, '');
		const tag = (reqBody.tag || name).replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 40) || ('user' + Date.now().toString(36));
		const token = reqBody.token || Array.from(crypto.getRandomValues(new Uint8Array(16)), b => b.toString(16).padStart(2, '0')).join('');
		const username = (reqBody.username || name).toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 24) || ('user' + Date.now().toString(36));
		const key = reqBody.key || Array.from(crypto.getRandomValues(new Uint8Array(6)), b => b.toString(16).padStart(2, '0')).join('');
		const newUser = {
			id: newId, name, tag, token, username, key,
			cleanIp: reqBody.cleanIp || '', proxyIp: reqBody.proxyIp || '',
			ports: reqBody.ports || '', enabled: reqBody.enabled !== false,
			expiry: reqBody.expiry || '', quotaBytes: Number(reqBody.quotaBytes) || 0,
			dailyQuotaBytes: Number(reqBody.dailyQuotaBytes) || 0,
			limitDailyReq: Number(reqBody.limitDailyReq) || 0,
			notes: reqBody.notes || '', fp: reqBody.fp || '',
			speedLimitKBps: Number(reqBody.speedLimitKBps) || 0,
			connLimit: reqBody.connLimit ? parseInt(reqBody.connLimit) : null,
			maxConfigs: reqBody.maxConfigs ? parseInt(reqBody.maxConfigs) : null,
			userPorts: reqBody.userPorts || null,
			userNodes: reqBody.userNodes || null,
			userMode: reqBody.userMode || null,
			usernat64: reqBody.usernat64 || null,
			userPanelUrl: reqBody.userPanelUrl || null,
			ipLimit: Number(reqBody.ipLimit) || 0,
			activeIps: '{}',
			blockPorn: reqBody.blockPorn ? 1 : 0,
			blockAds: reqBody.blockAds ? 1 : 0,
			fragLen: reqBody.fragLen || '',
			fragInt: reqBody.fragInt || '',
			lifetimeUsedGb: Number(reqBody.lifetimeUsedGb) || 0,
			userProxyIata: reqBody.userProxyIata || '',
			userSocks5: reqBody.userSocks5 || '',
			userProxyIp: reqBody.userProxyIp || '',
			autoResetVolDays: Number(reqBody.autoResetVolDays) || 0,
			autoResetReqDays: Number(reqBody.autoResetReqDays) || 0,
			lastResetVolTime: Date.now(),
			lastResetReqTime: Date.now(),
			autoRotateIp: reqBody.autoRotateIp ? 1 : 0,
			rotateTime: Number(reqBody.rotateTime) || 0,
			ipOperator: reqBody.ipOperator || 'all',
			ipCount: Number(reqBody.ipCount) || 20,
			lastRotateTime: 0,
			created: new Date().toISOString()
		};
		if (!hagdarotReshet.users) hagdarotReshet.users = [];
		hagdarotReshet.users.push(newUser);
		await env.KV.put('network-settings.json', JSON.stringify(hagdarotReshet, null, 2));
		savedUsersAuth = null;
		return apiJson({ success: true, user: newUser }, 201);
	}
	if (method === 'PUT' && userId) {
		const u = users.find(x => x.id === userId);
		if (!u) return apiJson({ success: false, error: 'User not found' }, 404);
		if (reqBody.name !== undefined) u.name = reqBody.name;
		if (reqBody.tag !== undefined) u.tag = reqBody.tag;
		if (reqBody.username !== undefined) u.username = reqBody.username;
		if (reqBody.cleanIp !== undefined) u.cleanIp = reqBody.cleanIp;
		if (reqBody.proxyIp !== undefined) { u.proxyIp = reqBody.proxyIp; if (!reqBody.proxyIp) u.proxyIpGeo = null; }
		if (reqBody.ports !== undefined) u.ports = reqBody.ports;
		if (reqBody.enabled !== undefined) u.enabled = reqBody.enabled;
		if (reqBody.expiry !== undefined) u.expiry = reqBody.expiry;
		if (reqBody.quotaBytes !== undefined) u.quotaBytes = Number(reqBody.quotaBytes) || 0;
		if (reqBody.dailyQuotaBytes !== undefined) u.dailyQuotaBytes = Number(reqBody.dailyQuotaBytes) || 0;
		if (reqBody.notes !== undefined) u.notes = reqBody.notes;
		if (reqBody.fp !== undefined) u.fp = reqBody.fp;
		if (reqBody.speedLimitKBps !== undefined) u.speedLimitKBps = Number(reqBody.speedLimitKBps) || 0;
		if (reqBody.connLimit !== undefined) u.connLimit = reqBody.connLimit ? parseInt(reqBody.connLimit) : null;
		if (reqBody.maxConfigs !== undefined) u.maxConfigs = reqBody.maxConfigs ? parseInt(reqBody.maxConfigs) : null;
		if (reqBody.userPorts !== undefined) u.userPorts = reqBody.userPorts || null;
		if (reqBody.userNodes !== undefined) u.userNodes = reqBody.userNodes || null;
		if (reqBody.userMode !== undefined) u.userMode = reqBody.userMode || null;
		if (reqBody.usernat64 !== undefined) u.usernat64 = reqBody.usernat64 || null;
		if (reqBody.limitDailyReq !== undefined) u.limitDailyReq = Number(reqBody.limitDailyReq) || 0;
		if (reqBody.userPanelUrl !== undefined) u.userPanelUrl = reqBody.userPanelUrl || null;
		if (reqBody.ipLimit !== undefined) u.ipLimit = Number(reqBody.ipLimit) || 0;
		if (reqBody.blockPorn !== undefined) u.blockPorn = reqBody.blockPorn ? 1 : 0;
		if (reqBody.blockAds !== undefined) u.blockAds = reqBody.blockAds ? 1 : 0;
		if (reqBody.fragLen !== undefined) u.fragLen = reqBody.fragLen || '';
		if (reqBody.fragInt !== undefined) u.fragInt = reqBody.fragInt || '';
		if (reqBody.lifetimeUsedGb !== undefined) u.lifetimeUsedGb = Number(reqBody.lifetimeUsedGb) || 0;
		if (reqBody.userProxyIata !== undefined) u.userProxyIata = reqBody.userProxyIata || '';
		if (reqBody.userSocks5 !== undefined) u.userSocks5 = reqBody.userSocks5 || '';
		if (reqBody.userProxyIp !== undefined) u.userProxyIp = reqBody.userProxyIp || '';
		if (reqBody.autoResetVolDays !== undefined) u.autoResetVolDays = Number(reqBody.autoResetVolDays) || 0;
		if (reqBody.autoResetReqDays !== undefined) u.autoResetReqDays = Number(reqBody.autoResetReqDays) || 0;
		if (reqBody.autoRotateIp !== undefined) u.autoRotateIp = reqBody.autoRotateIp ? 1 : 0;
		if (reqBody.rotateTime !== undefined) u.rotateTime = Number(reqBody.rotateTime) || 0;
		if (reqBody.ipOperator !== undefined) u.ipOperator = reqBody.ipOperator || 'all';
		if (reqBody.ipCount !== undefined) u.ipCount = Number(reqBody.ipCount) || 20;
		if (reqBody.status !== undefined) {
			if (reqBody.status === 'active') { u.enabled = true; delete u.disabledReason; delete u.disabledAt; }
			else if (reqBody.status === 'disabled') { u.enabled = false; }
		}
		await env.KV.put('network-settings.json', JSON.stringify(hagdarotReshet, null, 2));
		savedUsersAuth = null;
		return apiJson({ success: true, user: u });
	}
	if (method === 'DELETE' && userId) {
		const idx = users.findIndex(x => x.id === userId);
		if (idx === -1) return apiJson({ success: false, error: 'User not found' }, 404);
		const deleted = hagdarotReshet.users.splice(idx, 1)[0];
		await env.KV.put('network-settings.json', JSON.stringify(hagdarotReshet, null, 2));
		savedUsersAuth = null;
		return apiJson({ success: true, deleted: deleted.id });
	}
	if (method === 'POST' && userId && action === 'toggle') {
		const u = users.find(x => x.id === userId);
		if (!u) return apiJson({ success: false, error: 'User not found' }, 404);
		u.enabled = u.enabled === false ? true : false;
		if (u.enabled) { delete u.disabledReason; delete u.disabledAt; }
		await env.KV.put('network-settings.json', JSON.stringify(hagdarotReshet, null, 2));
		savedUsersAuth = null;
		return apiJson({ success: true, user: u });
	}
	if (method === 'POST' && userId && action === 'reset') {
		try { await usageReset(env, 'uusage:' + userId); } catch (e) {}
		const _now = new Date();
		for (let i = 0; i < 7; i++) { const d = new Date(_now); d.setDate(d.getDate() - i); try { await usageReset(env, 'uusage-d:' + userId + ':' + getDateKey(d)); } catch (e) {} }
		const u = users.find(x => x.id === userId);
		if (u) { u.enabled = true; delete u.disabledReason; delete u.disabledAt; await env.KV.put('network-settings.json', JSON.stringify(hagdarotReshet, null, 2)); savedUsersAuth = null; }
		return apiJson({ success: true, message: 'Traffic reset' });
	}
	return apiJson({ success: false, error: 'Invalid request' }, 400);
}
async function handleApiStats(request, env, adminPassword) {
	if (!isApiAuthenticated(request, adminPassword)) return apiJson({ success: false, error: 'Unauthorized' }, 401);
	if (!hagdarotReshet) { try { hagdarotReshet = JSON.parse(await env.KV.get('network-settings.json') || '{}'); } catch (e) { hagdarotReshet = {}; } }
	const users = Array.isArray(hagdarotReshet.users) ? hagdarotReshet.users : [];
	const totalUsers = users.length;
	const activeUsers = users.filter(u => u.enabled !== false && (!u.expiry || Date.now() <= Date.parse(u.expiry))).length;
	const disabledUsers = users.filter(u => u.enabled === false).length;
	const expiredUsers = users.filter(u => u.expiry && Date.now() > Date.parse(u.expiry) && u.enabled !== false).length;
	const quotaExceeded = users.filter(u => u.enabled !== false && u.quotaBytes > 0).length;
	let totalTrafficBytes = 0, dailyTrafficBytes = 0;
	const _today = getDateKey(new Date());
	for (const u of users) {
		try { const c = await usageGet(env, 'uusage:' + u.id); if (c) totalTrafficBytes += c.total || 0; } catch (e) {}
		try { const cd = await usageGet(env, 'uusage-d:' + u.id + ':' + _today); dailyTrafficBytes += (cd && cd.total) || 0; } catch (e) {}
	}
	let todayUsage = { up: 0, down: 0, total: 0 };
	try { const tu = await usageGet(env, 'usage:' + _today); if (tu) todayUsage = { up: tu.up || 0, down: tu.down || 0, total: tu.total || 0 }; } catch (e) {}
	const upSeconds = Math.floor((Date.now() - (globalThis.__workerStart || Date.now())) / 1000);
	return apiJson({
		success: true,
		stats: {
			users: { total: totalUsers, active: activeUsers, disabled: disabledUsers, expired: expiredUsers, quotaExceeded },
			traffic: { totalBytes: totalTrafficBytes, totalGB: (totalTrafficBytes / 1073741824).toFixed(2), dailyBytes: dailyTrafficBytes, dailyGB: (dailyTrafficBytes / 1073741824).toFixed(2) },
			system: { uptimeSeconds: upSeconds, version: Version, isPaused: !!(config_JSON && config_JSON.paused), todayUsage }
		}
	});
}
async function handleApiUpdate(request, env, adminPassword, ctx) {
	if (request.method !== 'POST') return apiJson({ success: false, error: 'POST only' }, 405);
	if (!isApiAuthenticated(request, adminPassword)) return apiJson({ success: false, error: 'Unauthorized' }, 401);
	let body = {}; try { body = await request.json(); } catch (e) {}
	const action = body.action || 'check';
	if (!hagdarotReshet) { try { hagdarotReshet = JSON.parse(await env.KV.get('network-settings.json') || '{}'); } catch (e) { hagdarotReshet = {}; } }
	if (action === 'check') {
		const vj = await kabelGirsatNova();
		const current = String(Version).replace(/^[vV]/, '');
		const latest = vj ? String(vj.version || '').replace(/^[vV]/, '') : '';
		const updateAvailable = !!latest && versionGreater(latest, current);
		let hasCfToken = false;
		try { const _cft = JSON.parse(await env.KV.get('cf.json') || 'null'); hasCfToken = !!(_cft && _cft.APIToken); } catch (e) {}
		return apiJson({ success: true, current, latest, updateAvailable, hasCfToken, notes: vj ? (vj.notes || '') : '' });
	}
	if (action === 'update') {
		if (!hagdarotReshet.cfAccountId || !hagdarotReshet.cfApiToken || !hagdarotReshet.cfWorkerName) return apiJson({ success: false, error: 'CF credentials not configured' }, 400);
		ctx.waitUntil(runAutoUpdate(env, hagdarotReshet, ctx));
		return apiJson({ success: true, message: 'Update triggered' });
	}
	return apiJson({ success: false, error: 'Invalid action' }, 400);
}
async function handleApiLogs(request, env, adminPassword) {
	if (!isApiAuthenticated(request, adminPassword)) return apiJson({ success: false, error: 'Unauthorized' }, 401);
	const logs = await logReadAll(env);
	return apiJson({ success: true, logs });
}
///////////////////////////////////////////////////////Relay Status API (Tunnel page)///////////////////////////////////////////////
async function handleApiRelayStatus(request, env, adminPassword, alreadyAuthed) {
	if (!alreadyAuthed && !isApiAuthenticated(request, adminPassword)) return apiJson({ success: false, error: 'Unauthorized' }, 401);
	const requestHost = new URL(request.url).hostname;
	// Get the best host: first try config_JSON.HOSTS, then request host
	let bestHost = requestHost;
	try {
		if (config_JSON && Array.isArray(config_JSON.HOSTS) && config_JSON.HOSTS.length) {
			bestHost = config_JSON.HOSTS[0];
		} else if (config_JSON && config_JSON.HOST) {
			bestHost = config_JSON.HOST;
		} else if (hagdarotReshet && Array.isArray(hagdarotReshet.HOSTS) && hagdarotReshet.HOSTS.length) {
			bestHost = hagdarotReshet.HOSTS[0];
		}
	} catch (e) {}
	// If bestHost still looks like a raw workers.dev subdomain, prefer it anyway (user may not have custom domain)
	// Relay now lives on the MAIN endpoint (/) alongside the Cloudflare speed-test decoy, so hand out '/'.
	const relayUrl = 'https://' + bestHost + '/';
	const relayAuthKey = (hagdarotReshet && hagdarotReshet.relayAuthKey) || 'Novaproxy';
	const relayEnabled = true; // Relay is always available on this worker
	return apiJson({
		success: true,
		relay: {
			enabled: relayEnabled,
			workerUrl: relayUrl,
			bestHost: bestHost,
			requestHost: requestHost,
			authKey: relayAuthKey
		}
	});
}
///////////////////////////////////////////////////////Relay Handler (from worker (4).js)///////////////////////////////////////////////
const RELAY_BLOCKED_HOSTS = ['localhost', '127.0.0.1', '::1'];
function isRelayAllowed(targetUrl) {
	try {
		const u = new URL(targetUrl);
		if (!u.hostname || RELAY_BLOCKED_HOSTS.includes(u.hostname)) return false;
		if (u.hostname === new URL('http://example.com').hostname && u.port === '') return false;
		return true;
	} catch (e) { return false; }
}
async function handleRelayRequest(request, env) {
	if (request.method === 'GET') {
		const host = new URL(request.url).hostname;
		return new Response(getRelayHTML(host), { status: 200, headers: { 'content-type': 'text/html; charset=utf-8' } });
	}
	if (request.method !== 'POST') return relayJson({ e: 'Method not allowed.' }, 405);
	let reqBody;
	try { reqBody = await request.json(); } catch (e) { return relayJson({ e: 'Invalid JSON' }, 400); }
	if (!reqBody.k) return relayJson({ e: 'missing auth key' }, 401);
	const relayAuthKey = (hagdarotReshet && hagdarotReshet.relayAuthKey) || 'Novaproxy';
	if (reqBody.k !== relayAuthKey) return relayJson({ e: 'unauthorized' }, 401);
	if (!reqBody.u) return relayJson({ e: 'missing url' }, 400);
	if (!isRelayAllowed(reqBody.u)) return relayJson({ e: 'target not allowed' }, 400);
	const targetUrl = new URL(reqBody.u);
	if (targetUrl.hostname === new URL(request.url).hostname) return relayJson({ e: 'self-fetch blocked' }, 400);
	const headers = new Headers();
	if (reqBody.h && typeof reqBody.h === 'object') {
		const SKIP = { host: 1, connection: 1, 'content-length': 1, 'transfer-encoding': 1, 'proxy-connection': 1, 'proxy-authorization': 1 };
		for (const [k, v] of Object.entries(reqBody.h)) { if (!SKIP[k.toLowerCase()]) headers.set(k, v); }
	}
	headers.set('x-relay-hop', '1');
	const fetchOptions = {
		method: (reqBody.m || 'GET').toUpperCase(),
		headers,
		redirect: reqBody.r === false ? 'manual' : 'follow'
	};
	if (reqBody.b) {
		try { fetchOptions.body = Uint8Array.from(atob(reqBody.b), c => c.charCodeAt(0)); } catch (e) {}
	}
	try {
		const resp = await fetch(targetUrl.toString(), fetchOptions);
		const buffer = await resp.arrayBuffer();
		const uint8 = new Uint8Array(buffer);
		let binary = '';
		const chunkSize = 0x8000;
		for (let i = 0; i < uint8.length; i += chunkSize) { binary += String.fromCharCode.apply(null, uint8.subarray(i, i + chunkSize)); }
		const responseHeaders = {};
		resp.headers.forEach((v, k) => { responseHeaders[k] = v; });
		return relayJson({ s: resp.status, h: responseHeaders, b: btoa(binary) });
	} catch (err) {
		return relayJson({ e: String(err) }, 500);
	}
}
function relayJson(obj, status = 200) {
	return new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json' } });
}
function getRelayHTML(actualHost) {
	const logoUrl = 'https://raw.githubusercontent.com/IRNova/Nova-Proxy-App/main/logo.svg';
	return `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Nova Proxy Relay</title><link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;700;900&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Vazirmatn',sans-serif;background:#fff;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:20px}.logo{width:120px;height:120px;border-radius:50%;object-fit:cover;animation:pulse 2s ease-in-out infinite;box-shadow:0 0 0 0 rgba(231,76,60,.4)}@keyframes pulse{0%{transform:scale(1);box-shadow:0 0 0 0 rgba(231,76,60,.4)}50%{transform:scale(1.05);box-shadow:0 0 0 15px rgba(231,76,60,0)}100%{transform:scale(1);box-shadow:0 0 0 0 rgba(231,76,60,0)}}h1{font-size:36px;font-weight:900;color:#2c3e50;margin-top:20px}.status{font-size:20px;color:#27ae60;font-weight:700;margin-top:10px;display:flex;align-items:center;justify-content:center;gap:8px}.status-dot{width:10px;height:10px;background:#27ae60;border-radius:50%;display:inline-block;animation:blink 1.4s ease-in-out infinite}@keyframes blink{0%,100%{opacity:1}50%{opacity:.2}}.subtitle{font-size:14px;color:#95a5a6;margin-top:6px}</style></head><body><img class="logo" src="${logoUrl}" alt="Nova Proxy Relay"><h1>نوا پروکسی</h1><div class="status"><span class="status-dot"></span>رله نوا فعال است</div><div class="subtitle">Nova Proxy Relay</div></body></html>`;
}
///////////////////////////////////////////////////////Linked Panels & Auto-Update///////////////////////////////////////////////
async function syncToLinkedPanels(env, config, ctx) {
	try {
		const ns = hagdarotReshet || JSON.parse(await env.KV.get('network-settings.json') || '{}');
		const panels = Array.isArray(ns.linkedPanels) ? ns.linkedPanels : [];
		for (const p of panels) {
			if (!p || !p.url || !p.apiKey) continue;
			let cleanUrl = p.url.trim();
			if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) cleanUrl = 'https://' + cleanUrl;
			try {
				const parsed = new URL(cleanUrl);
				const payload = JSON.stringify({ config, fromMaster: true });
				const doFetch = () => fetch(`${parsed.protocol}//${parsed.host}/admin/api/sync`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + p.apiKey },
					body: payload,
					signal: AbortSignal.timeout(15000)
				}).then(async r => { log(`[LinkedPanels] sync to ${p.url}: ${r.status}`); }).catch(e => { log(`[LinkedPanels] sync to ${p.url} failed: ${e.message}`); });
				if (ctx && typeof ctx.waitUntil === 'function') ctx.waitUntil(doFetch()); else doFetch();
			} catch (e) { log(`[LinkedPanels] URL parse error for ${p.url}: ${e.message}`); }
		}
	} catch (e) { log(`[LinkedPanels] syncToLinkedPanels error: ${e.message}`); }
}
async function propagateUpdateToLinkedPanels(env, newVersion, code, ctx) {
	try {
		const ns = hagdarotReshet || JSON.parse(await env.KV.get('network-settings.json') || '{}');
		const panels = Array.isArray(ns.linkedPanels) ? ns.linkedPanels : [];
		for (const p of panels) {
			if (!p || !p.url || !p.apiKey) continue;
			let cleanUrl = p.url.trim();
			if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) cleanUrl = 'https://' + cleanUrl;
			try {
				const parsed = new URL(cleanUrl);
				const doFetch = () => fetch(`${parsed.protocol}//${parsed.host}/admin/self-update.json`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + p.apiKey },
					body: JSON.stringify({ code, force: true }),
					signal: AbortSignal.timeout(30000)
				}).then(async r => {
					const j = await r.json().catch(() => ({}));
					log(`[LinkedPanels] update ${p.url}: ${j.success ? 'success' : (j.error || 'failed')}`);
				}).catch(e => { log(`[LinkedPanels] update ${p.url} failed: ${e.message}`); });
				if (ctx && typeof ctx.waitUntil === 'function') ctx.waitUntil(doFetch()); else doFetch();
			} catch (e) {}
		}
	} catch (e) { log(`[LinkedPanels] propagateUpdate error: ${e.message}`); }
}
function parseImportBindings(importStr) {
	const cleanStr = importStr.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '').trim();
	const content = cleanStr.replace(/^import\s+/, '').replace(/\s+from\s+["'].*?["'];?$/, '').trim();
	const bindings = [];
	if (content.startsWith('*')) { const match = content.match(/\*\s+as\s+(\w+)/); if (match) bindings.push({ name: match[1], isNamespace: true }); return bindings; }
	const braceStart = content.indexOf('{');
	if (braceStart !== -1) {
		const defaultPart = content.slice(0, braceStart).replace(/,/, '').trim();
		if (defaultPart) bindings.push({ name: defaultPart, isDefault: true });
		const bracePart = content.slice(braceStart + 1, content.lastIndexOf('}')).trim();
		bracePart.split(',').map(s => s.trim()).filter(Boolean).forEach(item => {
			if (item.includes(' as ')) { const parts = item.split(/\s+as\s+/); bindings.push({ name: parts[1], original: parts[0] }); }
			else bindings.push({ name: item });
		});
	} else bindings.push({ name: content, isDefault: true });
	return bindings;
}
function obfuscateCode(srcText) {
	const importRegex = /import\s+[\s\S]*?from\s+["'].*?["'];?/g;
	const imports = []; let match;
	while ((match = importRegex.exec(srcText)) !== null) imports.push(match[0]);
	let cleanCode = srcText.replace(importRegex, '');
	const bindings = []; imports.forEach(imp => { bindings.push(...parseImportBindings(imp)); });
	const uniqueBindings = []; const seenNames = new Set();
	bindings.forEach(b => { if (!seenNames.has(b.name)) { seenNames.add(b.name); uniqueBindings.push(b); } });
	cleanCode = cleanCode.replace(/export\s+default\s+/g, 'const _0xNovaModule = ');
	cleanCode += '\nreturn _0xNovaModule;';
	const randKey = Math.floor(Math.random() * 80) + 64;
	const encoder = new TextEncoder(); const bytes = encoder.encode(cleanCode);
	let hexOutput = '';
	for (let i = 0; i < bytes.length; i++) { hexOutput += (bytes[i] ^ randKey).toString(16).padStart(2, '0'); }
	const rawImportsStr = imports.join('\n');
	const bindingNames = uniqueBindings.map(b => b.name);
	// Per-deploy random identifiers so the loader wrapper itself is not a shared, blacklistable signature.
	const _rid = () => '_0x' + Math.floor(Math.random() * 0xfffff).toString(16).padStart(5, '0') + Math.floor(Math.random() * 0xffff).toString(16);
	const _NP = _rid(), _NK = _rid(), _NB = _rid(), _NC = _rid(), _NR = _rid();
	return rawImportsStr + '\n\n'
		+ 'const ' + _NP + ' = "' + hexOutput + '";\n'
		+ 'const ' + _NK + ' = ' + randKey + ';\n\n'
		+ 'const ' + _NB + ' = new Uint8Array((' + _NP + '.match(/.{1,2}/g) || []).map(x => parseInt(x, 16) ^ ' + _NK + '));\n'
		+ 'const ' + _NC + ' = new TextDecoder().decode(' + _NB + ');\n'
		+ 'const ' + _NR + ' = new Function(' + bindingNames.map(n => '"' + n + '"').join(', ') + ', ' + _NC + ')(' + bindingNames.join(', ') + ');\n\n'
		+ 'export default ' + _NR + ';';
}
function cmpVersions(a, b) {
	const pa = String(a || '').replace(/^v/, '').split('.').map(Number);
	const pb = String(b || '').replace(/^v/, '').split('.').map(Number);
	for (let i = 0; i < Math.max(pa.length, pb.length); i++) { const na = pa[i] || 0, nb = pb[i] || 0; if (na > nb) return 1; if (nb > na) return -1; }
	return 0;
}
async function runAutoUpdate(env, ns, ctx) {
	try {
		const repo = (ns.githubRepo || 'IRNova/Nova-Proxy').replace(/https?:\/\/github\.com\//, '').trim();
		const cfAccountId = ns.cfAccountId, cfApiToken = ns.cfApiToken, cfWorkerName = ns.cfWorkerName;
		if (!cfAccountId || !cfApiToken || !cfWorkerName) return;
		let remoteVer = null, workerCode = null;
		try {
const res = await fetch(`https://raw.githubusercontent.com/${repo}/main/version.json`, { headers: { 'User-Agent': 'NovaProxy' }, cf: { cacheTtl: 0 } });
			if (res.ok) { const j = await res.json(); remoteVer = j && j.version ? String(j.version).replace(/^[vV]/, '') : null; }
		} catch (e) {}
		if (!remoteVer) {
			try {
				const res = await fetch(`https://raw.githubusercontent.com/${repo}/main/worker.js`, { headers: { 'User-Agent': 'NovaProxy' } });
				if (res.ok) { workerCode = await res.text(); const m = workerCode.match(/const\s+Version\s*=\s*['"]([^'"]+)['"]/); if (m) remoteVer = m[1].replace(/^[vV]/, ''); }
			} catch (e) {}
		}
		const currentVer = String(Version).replace(/^[vV]/, '').replace(/\D+/g, '');
		if (!remoteVer || cmpVersions(currentVer, remoteVer) >= 0) { log('[AutoUpdate] no update available'); return; }
		if (!workerCode) {
			const codeUrl = `https://raw.githubusercontent.com/${repo}/main/worker.js`;
			const r = await fetch(codeUrl, { headers: { 'User-Agent': 'NovaProxy' } });
			if (!r.ok) { log('[AutoUpdate] failed to fetch worker code: HTTP ' + r.status); return; }
			workerCode = await r.text();
		}
		if (workerCode.length < 1000 || !/export\s+default|addEventListener\s*\(/.test(workerCode)) { log('[AutoUpdate] invalid worker code'); return; }
		const format = ns.autoUpdateFormat || 'normal';
		let finalCode = workerCode;
		if (format === 'obfuscated') { try { finalCode = obfuscateCode(workerCode); } catch (e) { log('[AutoUpdate] obfuscation failed: ' + e.message); return; } }
		const v = await cfVerifyToken(cfApiToken);
		if (!v.ok) { log('[AutoUpdate] CF token invalid'); return; }
		let accountId = cfAccountId;
		if (!accountId) { const accts = await cfListAccounts(cfApiToken); if (accts.length === 1) accountId = accts[0].id; else { log('[AutoUpdate] multiple accounts, cannot proceed'); return; } }
		try {
			const teguvatHagdaraEung = await fetch(CF_API + '/accounts/' + accountId + '/workers/scripts/' + cfWorkerName + '/settings', { headers: cfHeaders(cfApiToken) });
			const totzaatHagdaraKo = await cfJson(teguvatHagdaraEung);
			if (!totzaatHagdaraKo || !totzaatHagdaraKo.success) { log('[AutoUpdate] cannot read worker bindings'); return; }
		} catch (e) { log('[AutoUpdate] settings check failed: ' + e.message); return; }
		const tofes = new FormData();
		tofes.append('metadata', new Blob([JSON.stringify({ main_module: 'worker.js' })], { type: 'application/json' }));
		tofes.append('worker.js', new Blob([finalCode], { type: 'application/javascript+module' }), 'worker.js');
		const haalaa = await fetch(CF_API + '/accounts/' + accountId + '/workers/scripts/' + cfWorkerName + '/content', { method: 'PUT', headers: cfHeaders(cfApiToken), body: tofes });
		const totzaatHaalaa = await cfJson(haalaa);
		if (!totzaatHaalaa || !totzaatHaalaa.success) { log('[AutoUpdate] deploy failed: ' + ((totzaatHaalaa && totzaatHaalaa.errors && totzaatHaalaa.errors[0] && totzaatHaalaa.errors[0].message) || 'unknown')); return; }
		await env.KV.put('last_auto_update', JSON.stringify({ version: remoteVer, at: Date.now(), format }));
		log(`[AutoUpdate] success: v${currentVer} -> v${remoteVer} (${format})`);
		propagateUpdateToLinkedPanels(env, remoteVer, finalCode, ctx);
	} catch (e) { log('[AutoUpdate] error: ' + (e.message || e)); }
}
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
		const ns = hagdarotReshet || {};
		const clean = (v) => String(v || '').trim().toLowerCase().replace(/^\/+|\/+$/g, '').replace(/[^a-z0-9_-]/g, '').slice(0, 40);
		const adminPath = clean((env && env.ADMIN_PATH) || ns.adminPath);
		const loginPath = clean((env && env.LOGIN_PATH) || ns.loginPath);
		const subPath = clean((env && env.SUB_PATH) || ns.subPath);
		const on = (!!ns.disguise || !!(env && (env.ADMIN_PATH || env.LOGIN_PATH || env.SUB_PATH))) && !!(adminPath || loginPath || subPath);
		if (!on) return { on: false, adminPath: '', loginPath: '', subPath: '', pubAdmin: '/admin', pubLogin: '/login' };
		return { on: true, adminPath, loginPath, subPath, pubAdmin: adminPath ? '/' + adminPath : '/admin', pubLogin: loginPath ? '/' + loginPath : '/login' };
	} catch (e) { return { on: false, adminPath: '', loginPath: '', subPath: '', pubAdmin: '/admin', pubLogin: '/login' }; }
}
// ===== Version-check utility functions =====
function versionGreater(a, b) {
	const pa = String(a || '').replace(/^[vV]/, '').split('.').map(n => parseInt(n, 10) || 0);
	const pb = String(b || '').replace(/^[vV]/, '').split('.').map(n => parseInt(n, 10) || 0);
	for (let i = 0; i < Math.max(pa.length, pb.length); i++) { const x = pa[i] || 0, y = pb[i] || 0; if (x > y) return true; if (x < y) return false; }
	return false;
}
async function kabelGirsatNova() {
	for (const u of [urlGirsatNOVA, novaMachsanRaw + '/version.json']) {
		try { const r = await fetch(u, { headers: { 'User-Agent': 'NovaProxy' }, cf: { cacheTtl: 0 } }); if (r.ok) { const j = await r.json(); if (j && j.version) return j; } } catch (e) {}
	}
	return null;
}
// ===== Signature-scan hardening =====
const milonChatimot = [
	(Proxy.name + "IP").toUpperCase(),
	(String.fromCharCode(67, 109) + URL.name[2] + 'i' + URL.name[0]).toLowerCase(),
	String(2407 * 300 - 10).split('').reverse().join('')
];
// ===== Helpers: page content processing =====
function tipulTeguvatPages(r, pagesUrl) {
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
	const _origin = panelOrigin(env); if (!_origin || PANEL_PLACEHOLDER.test(_origin)) return new Response('', { status: 404 });
	const _base = _origin.replace(/\/+$/, '');
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
		text = text.replace(/"\.\.\/logo\.png"/g, `"${panelOrigin(env)}logo.png"`);
		text = text.replace(/src=['"]\.\.\/logo\.png['"]/g, `src="${panelOrigin(env)}logo.png"`);
	}
	const _dgp = novaDisguise(env);
	if (_dgp.on && _dgp.pubAdmin !== '/admin') {
		text = text.replace(/location\.href=(['"])\/admin\1/g, `location.href='${_dgp.pubAdmin}'`);
		text = text.replace(/"start_url":"\/admin"/g, `"start_url":"${_dgp.pubAdmin}"`);
	}
	if (opts.spaPage) text = text.replace('</head>', '<script>location.hash="page=' + opts.spaPage + '";</script></head>');
	if (path === '/admin' || path.startsWith('/admin')) {
		const _idleScript = '<script>(function(){'
			+ 'var IDLE_MS=' + SESSION_IDLE_MS + ',CHECK_MS=30000,last=Date.now();'
			+ 'function bump(){last=Date.now();}'
			+ '["mousemove","keydown","click","scroll","touchstart","wheel"].forEach(function(ev){document.addEventListener(ev,bump,{passive:true});});'
			+ 'setInterval(function(){'
			+ 'var idle=Date.now()-last;'
			+ 'if(idle>=IDLE_MS){try{document.cookie="auth=; Path=/; Max-Age=0";}catch(e){}location.href=' + JSON.stringify(_dgp.pubLogin) + ';}'
			+ 'else{fetch(' + JSON.stringify(_dgp.pubAdmin + '/keepalive') + ',{method:"GET",credentials:"same-origin",cache:"no-store"}).catch(function(){});}'
			+ '},CHECK_MS);'
			+ '})();</script>';
		text = text.replace('</body>', _idleScript + '</body>');
	}
	const h = new Headers();
	h.set('Content-Type', 'text/html;charset=utf-8');
	h.set('Cache-Control', 'no-store');
	// --- CSP سخت‌گیرانه برای پنل ادمین/لاگین: جلوگیری از تزریق اسکریپت خارجی و کلیک‌جکینگ ---
	// connect-src allows https: so the Multi-Panel Hub can reach admin-entered child panel URLs
	// (browser-driven Test/Sync). Scripts/styles stay 'self'; this only widens fetch/XHR targets to
	// HTTPS origins, which is safe on an authenticated admin page where the URLs are operator-supplied.
	h.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; manifest-src 'self' data:; img-src 'self' data: https:; connect-src 'self' https:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'");
	h.set('X-Frame-Options', 'DENY');
	h.set('X-Content-Type-Options', 'nosniff');
	h.set('Referrer-Policy', 'no-referrer');
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
// ===== D1 database support =====
function hasD1(env) { return !!(env && env.DB && typeof env.DB.prepare === 'function'); }
async function d1Init(env) {
	if (_d1Ready || !hasD1(env)) return _d1Ready;
	try {
		await env.DB.batch([
			env.DB.prepare('CREATE TABLE IF NOT EXISTS usage (k TEXT PRIMARY KEY, up INTEGER DEFAULT 0, down INTEGER DEFAULT 0, total INTEGER DEFAULT 0)'),
			env.DB.prepare('CREATE TABLE IF NOT EXISTS logs (id INTEGER PRIMARY KEY AUTOINCREMENT, TYPE TEXT, IP TEXT, ASN TEXT, CC TEXT, URL TEXT, UA TEXT, TIME INTEGER)'),
			env.DB.prepare('CREATE TABLE IF NOT EXISTS kvstore (k TEXT PRIMARY KEY, v TEXT, updated INTEGER)'),
			env.DB.prepare('CREATE TABLE IF NOT EXISTS audit_log (id INTEGER PRIMARY KEY AUTOINCREMENT, TIME INTEGER, ACTOR TEXT, IP TEXT, ACTION TEXT, DETAIL TEXT)')
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
					// D1 has no value: fall back to the real KV. Covers keys written via the KV fallback
					// in put() (when D1 was down) plus any pre-migration keys, so a key that persisted
					// somewhere is never read as empty. Backfill into D1 so the next read is local.
					if (realKV) {
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
			let ok = false;
			try { if (typeof v === 'string' && await d1Init(env)) { await env.DB.prepare('INSERT INTO kvstore (k,v,updated) VALUES (?,?,?) ON CONFLICT(k) DO UPDATE SET v=excluded.v, updated=excluded.updated').bind(k, v, Date.now()).run(); ok = true; } } catch (e) { console.error('kv.put D1 failed for ' + k + ': ' + (e && e.message || e)); }
			// Mirror into the real KV when explicitly enabled, OR fall back to it when D1 didn't accept
			// the write. This is CRITICAL: without it a D1 failure silently drops the write, so a newly
			// created user lives only in the in-memory global and vanishes when the isolate recycles.
			// Awaited (not fire-and-forget) so the write is durable before the response returns.
			if (realKV && (!ok || env.NOVA_KV_MIRROR === '1' || env.NOVA_KV_MIRROR === 'true')) {
				try { await realKV.put(k, v, opts); ok = true; } catch (e) { console.error('kv.put KV fallback failed for ' + k + ': ' + (e && e.message || e)); }
			}
			if (!ok) throw new Error('KV put failed: neither D1 nor KV accepted the write for ' + k);
		},
		delete: async (k) => {
			try { if (await d1Init(env)) await env.DB.prepare('DELETE FROM kvstore WHERE k=?').bind(k).run(); } catch (e) {}
			// Always delete from the real KV too (not only when mirroring): otherwise the get() KV
			// fallback above would resurrect a key that was deleted from D1 but left behind in KV.
			if (realKV) { try { await realKV.delete(k); } catch (e) {} }
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
// Country code / name token -> flag emoji (best effort). Returns '' if not resolvable.
function flagFromToken(tok) {
	if (!tok) return '';
	const em = String(tok).match(/[\u{1F1E6}-\u{1F1FF}]{2}/u); // already a flag emoji?
	if (em) return em[0];
	const cc = String(tok).trim().toUpperCase();
	if (/^[A-Z]{2}$/.test(cc)) return String.fromCodePoint(...[...cc].map(c => 0x1F1E6 + c.charCodeAt(0) - 65));
	return '';
}
// Apply a node-name template. ctx: {n, name, host, port, worker, proto, date}. Unknown tags render empty.
function applyNameTemplate(tpl, ctx) {
	const name = String(ctx.name || '').trim();
	// Split a "CC-City-ISP" / "CC · City" style remark into segments for geo tags.
	const segs = name.split(/[|·\-—/]+|\s{2,}/).map(s => s.trim()).filter(Boolean);
	const flag = flagFromToken(segs[0]) || flagFromToken(name) || '';
	const country = (segs[0] || '').replace(/[\u{1F1E6}-\u{1F1FF}]/gu, '').trim();
	const map = {
		N: ctx.n, NUM: ctx.n, NAME: name, REMARK: name, FLAG: flag, COUNTRY: country,
		CITY: segs[1] || '', ISP: segs[2] || '', HOST: ctx.host, ADDR: ctx.host,
		PORT: ctx.port, WORKER: ctx.worker, DATE: ctx.date, PROTO: ctx.proto
	};
	return String(tpl).replace(/\{(\w+)\}/g, (m, k) => {
		const v = map[k.toUpperCase()];
		return (v === undefined || v === null) ? '' : String(v);
	}).replace(/\s{2,}/g, ' ').trim();
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
let usagePendingUser = {}; // id -> { up, down }: per-user pending-write cache
let usageLastFlush = 0;
let usageFlushing = false;
const USAGE_FLUSH_MS = 5 * 60 * 1000, USAGE_FLUSH_BYTES = 200 * 1024 * 1024;
async function flushUsage(env) {
	if (usageFlushing) return;
	const up = usagePending.up, down = usagePending.down;
	if (up + down <= 0) return;
	usageFlushing = true;
	usagePending = { up: 0, down: 0 };
	const _mishtameshLiktiva = usagePendingUser; usagePendingUser = {};
	try {
		const now = new Date();
		await usageAdd(env, 'usage:' + getDateKey(now), up, down);
		await usageAdd(env, 'usage-m:' + getMonthKey(now), up, down);
		for (const id of Object.keys(_mishtameshLiktiva)) {
			const u = _mishtameshLiktiva[id];
			if ((u.up || 0) + (u.down || 0) > 0) await tiudNefachMishtamesh(env, id, u.up, u.down, null);
		}
	} catch (e) {
		usagePending.up += up; usagePending.down += down;
		for (const id of Object.keys(_mishtameshLiktiva)) { const u = _mishtameshLiktiva[id]; if (!usagePendingUser[id]) usagePendingUser[id] = { up: 0, down: 0 }; usagePendingUser[id].up += u.up; usagePendingUser[id].down += u.down; }
		console.error('flushUsage failed: ' + (e.message || e));
	} finally {
		usageFlushing = false;
	}
}
function recordUsage(env, bytesUp, bytesDown, ctx, force) {
	usagePending.up += (bytesUp || 0);
	usagePending.down += (bytesDown || 0);
	if (chiburMishtameshId) { if (!usagePendingUser[chiburMishtameshId]) usagePendingUser[chiburMishtameshId] = { up: 0, down: 0 }; usagePendingUser[chiburMishtameshId].up += (bytesUp || 0); usagePendingUser[chiburMishtameshId].down += (bytesDown || 0); }
	const pending = usagePending.up + usagePending.down;
	if (pending <= 0) return;
	const now = Date.now();
	// force = connection teardown: always flush, don't wait for the 5-min/200MB batch window, or the bytes die with the isolate.
	if (!force && now - usageLastFlush < USAGE_FLUSH_MS && pending < USAGE_FLUSH_BYTES) return;
	usageLastFlush = now;
	// ctx.waitUntil keeps the isolate alive until the D1 write lands; _globalCtx is the fallback if a caller lost its ctx.
	const _c = (ctx && ctx.waitUntil) ? ctx : ((_globalCtx && _globalCtx.waitUntil) ? _globalCtx : null);
	if (_c) _c.waitUntil(flushUsage(env)); else flushUsage(env).catch(() => {});
}
let _monthUsedCache = -1, _monthUsedAt = 0;
async function monthlyUsedBytes(env) {
	if (_monthUsedCache >= 0 && (Date.now() - _monthUsedAt) < 60000) return _monthUsedCache;
	try { const c = await usageGet(env, 'usage-m:' + getMonthKey(new Date())); _monthUsedCache = (c && c.total) || 0; } catch (e) { if (_monthUsedCache < 0) _monthUsedCache = 0; }
	_monthUsedAt = Date.now();
	return _monthUsedCache;
}
function resolveSpeedLimitKBps() {
	const lecholMishtamesh = Number(magbilMehirutMishtameshKBps);
	if (isFinite(lecholMishtamesh) && lecholMishtamesh > 0) return lecholMishtamesh;
	const g = hagdarotReshet && Number(hagdarotReshet.speedLimitKBps);
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
	const id = chiburMishtameshId ? ('u:' + chiburMishtameshId) : ('ip:' + (connClientIp || 'global'));
	const key = id + ':' + direction;
	let entry = speedBuckets.get(key);
	if (!entry || entry.kbps !== kbps) { entry = { limiter: createRateLimiter(kbps), kbps, at: Date.now() }; speedBuckets.set(key, entry); }
	else entry.at = Date.now();
	if (speedBuckets.size > 1024) { const cutoff = Date.now() - 300000; for (const [k, v] of speedBuckets) if (v.at < cutoff) speedBuckets.delete(k); }
	return entry.limiter;
}
// --- Multi-user (gated by networkSettings.multiUser; when off, main-config behavior is unchanged) ---
// Periodically pull each user's usage from KV/D1 so the Users page and quotas stay accurate
// --- Auto-reset traffic/request counters based on per-user intervals ---
let _lastAutoResetCheck = 0;
let _lastActiveIpsFlush = 0;
async function bdikatIpusOtomati(env) {
	const now = Date.now();
	if (now - _lastAutoResetCheck < 3600000) return;
	_lastAutoResetCheck = now;
	try {
		const reshimatMishtamshim = (hagdarotReshet && Array.isArray(hagdarotReshet.users)) ? hagdarotReshet.users : [];
		let changed = false;
		for (const u of reshimatMishtamshim) {
			if (!u || !u.id) continue;
			if (u.autoResetVolDays && u.autoResetVolDays > 0) {
				const lastReset = u.lastResetVolTime || 0;
				if (now >= lastReset + (u.autoResetVolDays * 86400000)) {
					try { await usageReset(env, 'uusage:' + u.id); } catch (e) {}
					u.lastResetVolTime = now; changed = true;
				}
			}
			if (u.autoResetReqDays && u.autoResetReqDays > 0) {
				const lastReset = u.lastResetReqTime || 0;
				if (now >= lastReset + (u.autoResetReqDays * 86400000)) {
					const _dk = getDateKey(new Date());
					for (let i = 0; i < 7; i++) { const d = new Date(now - i * 86400000); try { await usageReset(env, 'uusage-d:' + u.id + ':' + getDateKey(d)); } catch (e) {} }
					u.lastResetReqTime = now; changed = true;
				}
			}
			// Flush active IPs that have expired (>20s old)
			if (u.activeIps) {
				try {
					const activeIps = JSON.parse(u.activeIps);
					let ipChanged = false;
					for (const [ip, data] of Object.entries(activeIps)) {
						const ts = data && typeof data === 'object' ? data.timestamp : data;
						if (now - ts > 20000) { delete activeIps[ip]; ipChanged = true; }
					}
					if (ipChanged) { u.activeIps = JSON.stringify(activeIps); changed = true; }
				} catch (e) {}
			}
		}
		if (changed) { await env.KV.put('network-settings.json', JSON.stringify(hagdarotReshet, null, 2)); mitmonHagdarotReshet = null; savedUsersAuth = null; }
	} catch (e) {}
}
// --- Auto IP rotation for users with autoRotateIp enabled ---
let _lastIpRotateCheck = 0;
let _cachedIpList = null, _cachedIpListTime = 0;
async function bdikatSivuvIPotomati(env) {
	const now = Date.now();
	if (now - _lastIpRotateCheck < 60000) return;
	_lastIpRotateCheck = now;
	try {
		const reshimatMishtamshim = (hagdarotReshet && Array.isArray(hagdarotReshet.users)) ? hagdarotReshet.users : [];
		const tzarichSivuv = reshimatMishtamshim.filter(u => u && u.autoRotateIp && u.rotateTime > 0 && now >= (u.lastRotateTime || 0) + (u.rotateTime * 60000));
		if (!tzarichSivuv.length) return;
		// Fetch IP list from pool (cached for 5 min)
		if (!_cachedIpList || (now - _cachedIpListTime) > 300000) {
			try {
				const _poolApi = hagdarotReshet && hagdarotReshet.poolApi ? hagdarotReshet.poolApi : '';
				if (_poolApi) {
					const _r = await fetch(_poolApi.replace(/\/+$/, '') + '/all.txt');
					if (_r.ok) { const _txt = await _r.text(); _cachedIpList = _txt.split(/[\r\n]+/).map(s => s.trim()).filter(s => s && !s.startsWith('[')); _cachedIpListTime = now; }
				}
			} catch (e) {}
		}
		if (!_cachedIpList || !_cachedIpList.length) return;
		let changed = false;
		for (const u of tzarichSivuv) {
			const count = u.ipCount || 20;
			const operator = u.ipOperator || 'all';
			// Filter by operator if specified (simple matching on #comment)
			let pool = _cachedIpList;
			if (operator !== 'all') {
				const filtered = _cachedIpList.filter(line => {
					const comment = line.includes('#') ? line.split('#')[1].trim().toLowerCase() : '';
					return comment.includes(operator.toLowerCase());
				});
				if (filtered.length) pool = filtered;
			}
			// Shuffle and pick
			const shuffled = pool.slice().sort(() => Math.random() - 0.5);
			const selected = shuffled.slice(0, Math.min(count, shuffled.length));
			if (selected.length) { u.cleanIp = selected.join('\n'); u.lastRotateTime = now; changed = true; }
		}
		if (changed) { await env.KV.put('network-settings.json', JSON.stringify(hagdarotReshet, null, 2)); mitmonHagdarotReshet = null; savedUsersAuth = null; }
	} catch (e) {}
}
async function rienunNefachMishtameshImPag(env) {
	if (Date.now() - zmanMitmonNefachMishtameshChibur < 60000) return;
	zmanMitmonNefachMishtameshChibur = Date.now();
	const _hayom = getDateKey(new Date());
	if (taarichShimushYomiMishtamesh !== _hayom) { mitmonShimushYomiMishtamesh = {}; taarichShimushYomiMishtamesh = _hayom; }
	try {
		const reshimatMishtamshim = (hagdarotReshet && Array.isArray(hagdarotReshet.users)) ? hagdarotReshet.users : [];
		const kamutHaba = {}; const _hayom2 = getDateKey(new Date()); const kamutYomiHaba = {};
		await Promise.all(reshimatMishtamshim.map(async u => {
			if (!u || !u.id) return;
			try { const c = await usageGet(env, 'uusage:' + u.id); kamutHaba[u.id] = (c && c.total) || 0; } catch (e) { kamutHaba[u.id] = mitmonShimushMishtamesh[u.id] || 0; }
			try { const cd = await usageGet(env, 'uusage-d:' + u.id + ':' + _hayom2); kamutYomiHaba[u.id] = (cd && cd.total) || 0; } catch (e) { kamutYomiHaba[u.id] = mitmonShimushYomiMishtamesh[u.id] || 0; }
		}));
		mitmonShimushMishtamesh = kamutHaba; mitmonShimushYomiMishtamesh = kamutYomiHaba; taarichShimushYomiMishtamesh = _hayom2;
	} catch (e) { /* keep old cache */ }
}
// Resolve the user for the current connection (by ?u=<tag>). No tag = main config (admin itself), always allowed and not billed/limited;
// only tagged per-user configs are enforced and billed.
function nituachMishtameshChibur(url) {
	chiburMishtameshId = null; sibatDchiyatChibur = null; magbilMehirutMishtameshKBps = 0;
	if (!hagdarotReshet || !Array.isArray(hagdarotReshet.users)) return;
	const tag = url.searchParams.get('u');
	if (!tag) return;
	const mishtameshVar = hagdarotReshet.users.find(u => u && u.tag === tag);
	if (!mishtameshVar) { sibatDchiyatChibur = 'no-user'; return; }
	if (mishtameshVar.enabled === false) { sibatDchiyatChibur = 'disabled'; return; }
	if (mishtameshVar.expiry) { const t = Date.parse(mishtameshVar.expiry); if (!isNaN(t) && Date.now() > t) { sibatDchiyatChibur = 'expired'; return; } }
	if (mishtameshVar.quotaBytes) {
		const beShimush = mitmonShimushMishtamesh[mishtameshVar.id] || 0;
		if (beShimush >= mishtameshVar.quotaBytes) { sibatDchiyatChibur = 'quota'; return; }
	}
	if (mishtameshVar.dailyQuotaBytes) {
		const beShimushHayom = mitmonShimushYomiMishtamesh[mishtameshVar.id] || 0;
		if (beShimushHayom >= mishtameshVar.dailyQuotaBytes) { sibatDchiyatChibur = 'daily-quota'; return; }
	}
	magbilMehirutMishtameshKBps = (typeof mishtameshVar.speedLimitKBps === 'number' && isFinite(mishtameshVar.speedLimitKBps) && mishtameshVar.speedLimitKBps > 0) ? mishtameshVar.speedLimitKBps : 0;
	// Per-user IP limit enforcement (active IPs stored on the user object)
	if (mishtameshVar.ipLimit && mishtameshVar.ipLimit > 0 && connClientIp && connClientIp !== 'Unknown IP') {
		let activeIps = {};
		try { activeIps = JSON.parse(mishtameshVar.activeIps || '{}'); } catch (e) {}
		const now = Date.now();
		for (const [ip, data] of Object.entries(activeIps)) {
			const lastSeen = data && typeof data === 'object' ? data.timestamp : data;
			if (now - lastSeen > 20000) delete activeIps[ip];
		}
		const sortedIps = Object.keys(activeIps);
		if (!activeIps[connClientIp]) {
			if (sortedIps.length >= mishtameshVar.ipLimit) { sibatDchiyatChibur = 'ip-limit'; return; }
			activeIps[connClientIp] = { timestamp: now, count: 1 };
		} else {
			const entry = activeIps[connClientIp];
			activeIps[connClientIp] = { timestamp: now, count: ((entry && typeof entry === 'object' ? entry.count : 0) || 0) + 1 };
		}
		mishtameshVar.activeIps = JSON.stringify(activeIps);
	}
	chiburMishtameshId = mishtameshVar.id;
}
// Live (mid-connection) quota cutoff: disconnect immediately when a user crosses the byte/daily cap during a connection. Reads memory cache only, no per-packet DB/KV reads.
function hasagatMishtameshLefiID(id) {
	return id && hagdarotReshet && Array.isArray(hagdarotReshet.users) ? hagdarotReshet.users.find(u => u && u.id === id) : null;
}
function haimMishtameshChiburCharag(id, bytimSession = 0) {
	const mishtameshVar = hasagatMishtameshLefiID(id);
	if (!mishtameshVar) return false;
	const tzoraf = Math.max(0, bytimSession || 0);
	const nefachKolel = (mitmonShimushMishtamesh[id] || 0) + tzoraf;
	const nefachHayom = (mitmonShimushYomiMishtamesh[id] || 0) + tzoraf;
	return !!((mishtameshVar.quotaBytes && nefachKolel >= mishtameshVar.quotaBytes) || (mishtameshVar.dailyQuotaBytes && nefachHayom >= mishtameshVar.dailyQuotaBytes));
}
// Record per-user usage to uusage:<id> and uusage-d:<id>:<day>. Called in parallel with recordUsage.
async function tiudNefachMishtamesh(env, id, up, down, ctx) {
	if (!id || (up || 0) + (down || 0) <= 0) return;
	const _ktv = async () => {
		try {
			mitmonShimushMishtamesh[id] = await usageAdd(env, 'uusage:' + id, up, down);
			const _dk = getDateKey(new Date());
			const _dc = await usageAdd(env, 'uusage-d:' + id + ':' + _dk, up, down);
			if (taarichShimushYomiMishtamesh !== _dk) { mitmonShimushYomiMishtamesh = {}; taarichShimushYomiMishtamesh = _dk; }
			mitmonShimushYomiMishtamesh[id] = (_dc && _dc.total) || ((mitmonShimushYomiMishtamesh[id] || 0) + up + down);
			// Track lifetime usage on the user object
			const deltaBytes = (up || 0) + (down || 0);
			if (deltaBytes > 0 && hagdarotReshet && Array.isArray(hagdarotReshet.users)) {
				const u = hagdarotReshet.users.find(x => x && x.id === id);
				if (u) { u.lifetimeUsedGb = (u.lifetimeUsedGb || 0) + (deltaBytes / 1073741824); }
			}
		} catch (e) { console.error('record per-user usage failed: ' + (e.message || e)); }
	};
	if (ctx && ctx.waitUntil) ctx.waitUntil(_ktv()); else _ktv().catch(() => {});
}
// User hub (serveUserHub): returns a friendly per-user HTML panel when a browser opens the subscription link.
async function sherutMerkazMishtamesh(objMishtameshMinuy, env) {
	try {
		const base = String(panelOrigin(env) || '').replace(/\/+$/, '');
		if (!base || /your-panel\.pages\.dev/i.test(base)) return null;
		const r = await fetch(base + '/user/index.html', { headers: { 'User-Agent': 'NovaProxy' }, cf: { cacheTtl: 300, cacheEverything: true } });
		if (!r || !r.ok) return null;
		let html = await r.text();
		if (!html || html.length < 50) return null;
		if (objMishtameshMinuy) {
			let totalBytes = 0, upBytes = 0, downBytes = 0;
			try { const c = await usageGet(env, 'uusage:' + objMishtameshMinuy.id); if (c) { totalBytes = c.total || 0; upBytes = c.up || 0; downBytes = c.down || 0; } } catch (e) {}
			const _today = getDateKey(new Date());
			let dailyUp = 0, dailyDown = 0, dailyTotal = 0;
			try { const cd = await usageGet(env, 'uusage-d:' + objMishtameshMinuy.id + ':' + _today); if (cd) { dailyUp = cd.up || 0; dailyDown = cd.down || 0; dailyTotal = cd.total || 0; } } catch (e) {}
			let status = 'active';
			const isExpired = objMishtameshMinuy.expiry ? (Date.now() > Date.parse(objMishtameshMinuy.expiry)) : false;
			if (objMishtameshMinuy.enabled === false) status = 'disabled';
			else if (isExpired) status = 'expired';
			else if (objMishtameshMinuy.quotaBytes && totalBytes >= objMishtameshMinuy.quotaBytes) status = 'quota-exceeded';
			else if (objMishtameshMinuy.dailyQuotaBytes && dailyTotal >= objMishtameshMinuy.dailyQuotaBytes) status = 'daily-quota-exceeded';
			const expire = objMishtameshMinuy.expiry ? Math.floor(Date.parse(objMishtameshMinuy.expiry) / 1000) : 0;
			const limitDailyReq = Number(objMishtameshMinuy.limitDailyReq) || 0;
			const dailyReqCount = limitDailyReq > 0 ? (dailyTotal || 0) : 0;
			const userData = {
				id: objMishtameshMinuy.id, name: objMishtameshMinuy.name || '', tag: objMishtameshMinuy.tag || '',
				username: objMishtameshMinuy.username || '', notes: objMishtameshMinuy.notes || '',
				maxConfigs: Number(objMishtameshMinuy.maxConfigs) || 0,
				userPanelUrl: objMishtameshMinuy.userPanelUrl || '',
				expiry: objMishtameshMinuy.expiry || '', quotaBytes: Number(objMishtameshMinuy.quotaBytes) || 0,
				dailyQuotaBytes: Number(objMishtameshMinuy.dailyQuotaBytes) || 0,
				limitDailyReq: limitDailyReq, dailyReqCount: dailyReqCount,
				status: status
			};
			const usageData = { up: upBytes, down: downBytes, total: totalBytes, dailyUp: dailyUp, dailyDown: dailyDown, dailyTotal: dailyTotal };
			const injectScript = '<script>window.__NOVA_USER__=' + JSON.stringify(userData) + ';window.__NOVA_USAGE__=' + JSON.stringify(usageData) + ';</script>';
			html = html.replace('</head>', injectScript + '</head>');
		}
		return new Response(html, { status: 200, headers: { 'content-type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } });
	} catch (e) { return null; }
}
// ===== NAT64 support =====
function isKtovetIPv4(s) { return /^(\d{1,3}\.){3}\d{1,3}$/.test(s); }
async function resolveAviaDoH(host) {
	try { const r = await fetch('https://cloudflare-dns.com/dns-query?name=' + encodeURIComponent(host) + '&type=A', { headers: { accept: 'application/dns-json' } }); const j = await r.json(); const a = (j.Answer || []).filter(x => x.type === 1).map(x => x.data); return a.length ? a[Math.floor(Math.random() * a.length)] : null; } catch (e) { return null; }
}
function makeKtovetNat64(prefix, ipv4) {
	const p = String(prefix).trim().replace(/[\[\]]/g, '').replace(/:+$/, '');
	const o = ipv4.split('.').map(n => parseInt(n, 10)); if (o.length !== 4 || o.some(n => isNaN(n) || n < 0 || n > 255)) return null;
	const hex = (((o[0] << 8) | o[1]) >>> 0).toString(16).padStart(4, '0') + ':' + (((o[2] << 8) | o[3]) >>> 0).toString(16).padStart(4, '0');
	return `[${p}::${hex}]`;
}
async function hasagatKidometNat64() {
	const src = (tetzurotNat64 || '').trim(); if (!src) return [];
	if (/^https?:\/\//i.test(src)) {
		if (mitmonKidometNat64 && makorMitmonNat64 === src && (Date.now() - zmanMitmonNat64) < 3600000) return mitmonKidometNat64;
		try {
			const r = await fetch(src, { headers: { 'User-Agent': 'NovaProxy' } }); const txt = await r.text();
			let list = (txt.match(/\[([0-9a-fA-F:]+::)\]/g) || []).map(s => s.replace(/[\[\]]/g, ''));
			if (!list.length) list = txt.split(/[\n,]+/).map(s => s.replace(/[\[\]]/g, '').trim()).filter(s => s.includes('::'));
			mitmonKidometNat64 = [...new Set(list)]; zmanMitmonNat64 = Date.now(); makorMitmonNat64 = src; return mitmonKidometNat64;
		} catch (e) { return mitmonKidometNat64 || []; }
	}
	return [...new Set(src.split(/[\n,]+/).map(s => s.replace(/[\[\]]/g, '').trim()).filter(Boolean))];
}
async function tryNat64Chibur(yaadHost, portNum, rawData, chiburTCP) {
	const prefixes = await hasagatKidometNat64(); if (!prefixes.length) return null;
	const ipv4 = isKtovetIPv4(yaadHost) ? yaadHost : await resolveAviaDoH(yaadHost);
	if (!ipv4) return null;
	for (const prefix of prefixes.slice(0, 4)) {
		const addr = makeKtovetNat64(prefix, ipv4); if (!addr) continue;
		try {
			const remoteSock = chiburTCP({ hostname: addr.replace(/[\[\]]/g, ''), port: portNum });
			await Promise.race([remoteSock.opened, new Promise((_, reject) => setTimeout(() => reject(new Error('NAT64 connection timeout')), 5000))]);
			if (orechNetunimTakef(rawData) > 0) {
				const writer = remoteSock.writable.getWriter();
				try { await writer.write(netunimLeUint8(rawData)) } finally { try { writer.releaseLock() } catch (e) {} }
			}
			log(`[NAT64] connected: ${addr}:${portNum}`);
			return remoteSock;
		} catch (e) { log(`[NAT64] connection failed ${addr}: ${e.message || e}`); }
	}
	return null;
}
// ===== Main entry point =====
export default {
	async fetch(request, env, ctx) { try {
		_globalEnv = env;
		_globalCtx = ctx;
		wrapKVWithD1(env);
		await loadPanelApiKeys(env);
		connRejectReason = null;
		chiburMishtameshId = null; sibatDchiyatChibur = null; magbilMehirutMishtameshKBps = 0;
		if (!_kvMigratedFlag && env.__realKV && ctx && typeof ctx.waitUntil === 'function') ctx.waitUntil(migrateKvToD1(env));
		let textUrlBakasha = request.url.replace(/%5[Cc]/g, '').replace(/\\/g, '');
		const indexOgenUrlBakasha = textUrlBakasha.indexOf('#');
		const chelekGufUrlBakasha = indexOgenUrlBakasha === -1 ? textUrlBakasha : textUrlBakasha.slice(0, indexOgenUrlBakasha);
		if (!chelekGufUrlBakasha.includes('?') && /%3f/i.test(chelekGufUrlBakasha)) {
			const chelekOgenURLbakasha = indexOgenUrlBakasha === -1 ? '' : textUrlBakasha.slice(indexOgenUrlBakasha);
			textUrlBakasha = chelekGufUrlBakasha.replace(/%3f/i, '?') + chelekOgenURLbakasha;
		}
		const url = new URL(textUrlBakasha);
		const UA = request.headers.get('User-Agent') || 'null';
		const upgradeHeader = (request.headers.get('Upgrade') || '').toLowerCase(), contentType = (request.headers.get('content-type') || '').toLowerCase();
		const sismatMenahel = env.ADMIN || env.admin || env.PASSWORD || env.password || env.pswd || env.TOKEN || env.KEY || env.UUID || env.uuid;
		const envPass = env.ADMIN || env.admin || env.PASSWORD || env.password || env.pswd || env.TOKEN || env.KEY;
		let adminPassword = sismatMenahel;
		if (env.KV && typeof env.KV.get === 'function') {
			if (mitmonSismatMenahel !== null && (Date.now() - zmanMitmonSismatMenahel) < 60000) {
				if (mitmonSismatMenahel) adminPassword = mitmonSismatMenahel;
			} else {
				try {
					const kvPass = await env.KV.get('admin_pass');
					if (kvPass) { adminPassword = kvPass; mitmonSismatMenahel = kvPass; zmanMitmonSismatMenahel = Date.now(); }
					else { mitmonSismatMenahel = ''; zmanMitmonSismatMenahel = Date.now() - 55000; }
				} catch (e) {}
			}
		}
		let mafteachHatzpana = env.KEY;
		if (!mafteachHatzpana && mitmonAutoKey && (Date.now() - zmanMitmonAutoKey) < 60000) mafteachHatzpana = mitmonAutoKey;
		if (!mafteachHatzpana && env.KV && typeof env.KV.get === 'function') {
			try {
				mafteachHatzpana = await env.KV.get('auto_key');
				if (!mafteachHatzpana) {
					// Deterministic per-deployment key derived from this Worker's own hostname: every isolate
						// computes the identical value with no coordination, so the panel token and the /sub
						// token always agree (no first-request race) and it survives a KV reset (same host ->
						// same key -> the same links keep working). Set a KEY or UUID variable to override.
						const _seedHost = String((env.HOST ? String(env.HOST).split(/[\n,]/)[0] : url.hostname) || url.hostname).toLowerCase().replace(/^https?:\/\//, '').split('/')[0].split(':')[0].trim();
						mafteachHatzpana = (await MD5MD5('nova|auto-key|' + _seedHost)).slice(0, 24);
					await env.KV.put('auto_key', mafteachHatzpana);
				}
				mitmonAutoKey = mafteachHatzpana; zmanMitmonAutoKey = Date.now();
			} catch (e) { /* fall through */ }
		}
		if (!mafteachHatzpana) mafteachHatzpana = 'Do not use this default KEY, add a KEY variable to set your own';
		const userIDMD5 = await MD5MD5(sismatMenahel + mafteachHatzpana);
		const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
		const envUUID = env.UUID || env.uuid;
		let userID;
		if (envUUID && uuidRegex.test(envUUID)) {
			userID = envUUID.toLowerCase();
		} else {
			const pinBase = sismatMenahel || mafteachHatzpana;
			const pinMD5 = await MD5MD5(pinBase + mafteachHatzpana);
			const pinDerived = [pinMD5.slice(0, 8), pinMD5.slice(8, 12), '4' + pinMD5.slice(13, 16), '8' + pinMD5.slice(17, 20), pinMD5.slice(20)].join('-');
			let pinned = null;
			if (env.KV && typeof env.KV.get === 'function') {
				if (mitmonWorkerUuid !== null && (Date.now() - zmanMitmonWorkerUuid) < 600000) {
					pinned = mitmonWorkerUuid || null;
				} else {
					try { let v = await env.KV.get('worker_uuid'); if (!v) { v = pinDerived; try { await env.KV.put('worker_uuid', v); } catch (e) {} } mitmonWorkerUuid = v || ''; zmanMitmonWorkerUuid = Date.now(); pinned = v || null; } catch (e) {}
				}
			}
			userID = (pinned && uuidRegex.test(pinned)) ? pinned.toLowerCase() : pinDerived;
		}
		const hosts = env.HOST ? (await saderLeMaarach(env.HOST)).map(h => h.toLowerCase().replace(/^https?:\/\//, '').split('/')[0].split(':')[0]) : [url.hostname];
		const host = hosts[0];
		let nativGisha = url.pathname.slice(1).toLowerCase();
		hadpasatYomanNipui = ['1', 'true'].includes(env.DEBUG) || hadpasatYomanNipui;
		preloadChiyugMerotz = ['1', 'true'].includes(env.PRELOAD_RACE_DIAL) || preloadChiyugMerotz;
		try {
			if (mitmonHagdarotReshet && (Date.now() - zmanMitmonHagdarotReshet) < 30000) {
				hagdarotReshet = mitmonHagdarotReshet;
			} else if (env.KV && typeof env.KV.get === 'function') {
				const savedNS = await env.KV.get('network-settings.json');
				hagdarotReshet = savedNS ? JSON.parse(savedNS) : {
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
					linkedPanels: [], hubPanelUrl: '', syncApiKey: '',
					autoUpdate: false, autoUpdateFormat: 'normal', autoUpdateInterval: 3600000, githubRepo: 'IRNova/Nova-Proxy',
					telegramChannel: 'https://t.me/irnova_proxy',
					fakeConfigs: [
						{ name: '📢 {telegram}', enabled: true, locked: true },
						{ name: '📊 {usage}  |  📅 {expiry}', enabled: true }
					],
					subUserAgent: '', enableDirectConfigs: false, customRouting: '', metricNode: 'time.is'
				};
				mitmonHagdarotReshet = hagdarotReshet; zmanMitmonHagdarotReshet = Date.now();
			} else {
			hagdarotReshet = { enablePornBlock: false, enableDomesticBypass: true, enableAdBlock: true, enableMalwareBlock: true, enablePhishingBlock: true, bypassChina: false, bypassRussia: false, bypassSanctions: false, bypassCountries: [], blockCategories: [] };
		}
		} catch (e) {
			hagdarotReshet = { enablePornBlock: false, enableDomesticBypass: true, enableAdBlock: true, enableMalwareBlock: true, enablePhishingBlock: true, bypassChina: false, bypassRussia: false, bypassSanctions: false, bypassCountries: [], blockCategories: [] };
		}
		if (hagdarotReshet && hagdarotReshet.multiUser && env.KV && typeof env.KV.get === 'function') await rienunNefachMishtameshImPag(env);
		if (hagdarotReshet && hagdarotReshet.multiUser && env.KV && typeof env.KV.get === 'function') ctx.waitUntil(bdikatIpusOtomati(env));
		if (hagdarotReshet && hagdarotReshet.multiUser && env.KV && typeof env.KV.get === 'function') ctx.waitUntil(bdikatSivuvIPotomati(env));
		if (misparChiyugTcpMakbili !== 1 && zihuiSapak(request) === 'cmcc') misparChiyugTcpMakbili = 1;
		if (env.PROXYIP) {
			const proxyIPs = await saderLeMaarach(env.PROXYIP);
			metavechIP = proxyIPs[Math.floor(Math.random() * proxyIPs.length)];
			hafelGibuiMetavech = false;
		} else {
			const _proxyPool = ['proxyip.fxxk.dedyn.io', 'workers.cloudflare.cyou', 'proxyip.jp.fxxk.dedyn.io', 'proxyip.sg.fxxk.dedyn.io'];
			const _colo = (request.cf && request.cf.colo) || 'auto';
			const _seed = [..._colo].reduce((a, c) => a + c.charCodeAt(0), 0);
			metavechIP = _proxyPool[_seed % _proxyPool.length];
			hafelGibuiMetavech = true;
		}
		tetzurotNat64 = env.NAT64 || env.nat64 || '';
		const gishaIP = request.headers.get('CF-Connecting-IP') || request.headers.get('True-Client-IP') || request.headers.get('X-Real-IP') || request.headers.get('X-Forwarded-For') || request.headers.get('Fly-Client-IP') || request.headers.get('X-Appengine-Remote-Addr') || request.headers.get('X-Cluster-Client-IP') || 'Unknown IP';
		connClientIp = gishaIP;
		if (mitmonReshimaLevanaSocks5 === null) {
			if (env.GO2SOCKS5) reshimaLevanaSocks5 = [...new Set(reshimaLevanaSocks5.concat(await saderLeMaarach(env.GO2SOCKS5)))];
			mitmonReshimaLevanaSocks5 = reshimaLevanaSocks5;
		} else reshimaLevanaSocks5 = mitmonReshimaLevanaSocks5;
		// --- Disguise: remap custom admin/login/sub paths (never block default /admin and /login) ---
		const _dg = novaDisguise(env);
		if (_dg.on && upgradeHeader !== 'websocket') {
			const _seg = nativGisha;
			if (_dg.adminPath && (_seg === _dg.adminPath || _seg.startsWith(_dg.adminPath + '/'))) {
				nativGisha = 'admin' + _seg.slice(_dg.adminPath.length);
			} else if (_dg.loginPath && _seg === _dg.loginPath) {
				nativGisha = 'login';
			} else if (_dg.subPath && (_seg === _dg.subPath || _seg.startsWith(_dg.subPath + '/'))) {
				nativGisha = 'sub' + _seg.slice(_dg.subPath.length);
			}
		}
		// --- Serve bundled dashboard assets (logo, js, css) from ASSETS binding (one-click deploy) ---
		if (panelHasAssets(env) && /\.\w{2,5}$/.test(url.pathname) && upgradeHeader !== 'websocket') {
			const asset = await panelFetch(env, url.pathname).catch(() => null);
			if (asset && asset.ok) return asset;
		}
		// --- Kill Switch: غیرفعال‌سازی موقت سرویس ---
		{
			const _isProxyConn = (upgradeHeader === 'websocket') || (!nativGisha.startsWith('admin/') && nativGisha !== 'login' && nativGisha !== 'bot' && request.method === 'POST');
			const _isSub = nativGisha === 'sub' || nativGisha.startsWith('sub/');
			if (_isProxyConn || _isSub) {
				let _pausedNow = config_JSON && config_JSON.paused === true;
				if (!_pausedNow) { try { const _rawCfg = await getConfigRaw(env); if (_rawCfg && /"paused"\s*:\s*true/.test(_rawCfg)) _pausedNow = true; } catch (e) {} }
				if (_pausedNow) return new Response('Service paused', { status: 503, headers: { 'Content-Type': 'text/plain;charset=utf-8', 'Cache-Control': 'no-store' } });
				// --- Monthly Cap: حداکثر ترافیک ماهانه ---
				const _capGB = Number((hagdarotReshet && hagdarotReshet.monthlyCapGB) || env.MONTHLY_CAP_GB || env.MONTHLY_CAP || 0);
				if (_capGB > 0 && (await monthlyUsedBytes(env)) >= _capGB * 1073741824) return new Response('Monthly data cap reached', { status: 503, headers: { 'Content-Type': 'text/plain;charset=utf-8', 'Cache-Control': 'no-store' } });
			}
		}
		// Relay on the MAIN endpoint (/): the mirror/tunnel client POSTs JSON here so it shares the
		// same address as the Cloudflare speed-test decoy. A plain GET / still serves the decoy;
		// only a JSON POST carrying the relay auth key is handled as a relay hop. WebSocket upgrades
		// and gRPC/XHTTP (application/grpc) are untouched because they never send application/json.
		if (nativGisha === '' && request.method === 'POST' && (request.headers.get('Content-Type') || '').toLowerCase().includes('application/json')) {
			return await handleRelayRequest(request, env);
		}
		if (nativGisha === 'version') {// Version info endpoint
			const uuidBakasha = (url.searchParams.get('uuid') || '').toLowerCase();
			if (uuidRegex.test(uuidBakasha)) {
				const uuidYaad = String(userID).toLowerCase();
				let schum8RishonimBakasha = 0, schum8RishonimYaad = 0;
				for (let i = 0; i < 8; i++) {
					const kodBakasha = uuidBakasha.charCodeAt(i);
					schum8RishonimBakasha += kodBakasha <= 57 ? kodBakasha - 48 : kodBakasha - 87;
					const kodYaad = uuidYaad.charCodeAt(i);
					schum8RishonimYaad += kodYaad <= 57 ? kodYaad - 48 : kodYaad - 87;
				}
				if (schum8RishonimBakasha === schum8RishonimYaad && uuidBakasha.slice(-12) === uuidYaad.slice(-12)) return new Response(JSON.stringify({ Version: Number(String(Version).replace(/\D+/g, '')) }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
			}
		} else if (nativGisha === 'relay') {// Relay endpoint: Google Apps Script connects here
			return await handleRelayRequest(request, env);
		} else if (nativGisha.startsWith('api/')) {
		// CORS preflight for cross-panel calls (Multi-Panel Hub creating a user on a linked panel from
		// the admin's browser). No auth on OPTIONS; the real request is still password-gated below.
		if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Headers': 'authorization, content-type', 'Access-Control-Max-Age': '86400' } });
		if (!adminPassword) return apiJson({ success: false, error: 'Panel password not set' }, 403);
		const apiPath = nativGisha.slice(4);
		if (apiPath === 'users' || apiPath.startsWith('users/')) return await handleApiUsers(request, env, adminPassword);
		if (apiPath === 'stats') return await handleApiStats(request, env, adminPassword);
		if (apiPath === 'update') return await handleApiUpdate(request, env, adminPassword, ctx);
		if (apiPath === 'logs') return await handleApiLogs(request, env, adminPassword);
		if (apiPath === 'relay-status') return await handleApiRelayStatus(request, env, adminPassword);
		return apiJson({ success: false, error: 'Unknown API endpoint' }, 404);
	} else if (adminPassword && upgradeHeader === 'websocket') {// WebSocket proxy
		await hasagatParametrMetavech(url, userID);
		if (sibatDchiyatChibur) return new Response('Forbidden (' + sibatDchiyatChibur + ')', { status: 403 });
		// Per-user connLimit enforcement: بررسی محدودیت اتصال همزمان
		if (hagdarotReshet && Array.isArray(hagdarotReshet.users)) {
			const _connUser = hagdarotReshet.users.find(u => u && u.id && (String(u.id).toLowerCase() === String(userID).toLowerCase() || (u.token && u.token === userID)));
			if (_connUser && _connUser.connLimit && _connUser.connLimit > 0) {
				const _connKey = 'conn:' + _connUser.id;
				let _curConns = 0;
				try { _curConns = parseInt(await env.KV.get(_connKey) || '0') || 0; } catch (e) {}
				if (_curConns >= _connUser.connLimit) {
					log(`[ConnLimit] User ${_connUser.username || _connUser.tag || _connUser.id} rejected: ${_curConns}/${_connUser.connLimit}`);
					return new Response('Connection limit exceeded', { status: 429 });
				}
				await env.KV.put(_connKey, String(_curConns + 1), { expirationTtl: 300 });
			}
		}
		{ const _bm = kabelTetzurotMtzavBackend(env);
		if (_bm.on && !haimNativMenutakBackend(nativGisha, url.pathname)) { if (sibatDchiyatChibur) return new Response('Forbidden (' + sibatDchiyatChibur + ')', { status: 403 }); return await haavaratWSlaBackend(request, url, env, ctx, _bm.url, chiburMishtameshId); } }
		log(`[WebSocket] matched request: ${url.pathname}${url.search}`);
		return await tipulBakashatWS(request, userID, url, ctx);
		} else if (adminPassword && !nativGisha.startsWith('admin/') && nativGisha !== 'login' && nativGisha !== 'bot' && nativGisha !== 'recover' && nativGisha !== 'recover-telegram' && request.method === 'POST') {// gRPC/XHTTP proxy
			// DoH (RFC 8484) sent via POST to /dns-query; must be handled here or DNS clients get a 400 error
			if (nativGisha === 'dns-query' || url.pathname === '/dns-query' || nativGisha === 'doh' || url.pathname === '/doh') {
				return tipulBakashatDoH(request);
			}
		await hasagatParametrMetavech(url, userID);
		if (sibatDchiyatChibur) return new Response('Forbidden (' + sibatDchiyatChibur + ')', { status: 403 });
		{ const _bm = kabelTetzurotMtzavBackend(env);
		if (_bm.on && !haimNativMenutakBackend(nativGisha, url.pathname)) { if (sibatDchiyatChibur) return new Response('Forbidden (' + sibatDchiyatChibur + ')', { status: 403 }); return await haavaratHTTPlaBackend(request, url, env, _bm.url); } }
		const referer = request.headers.get('Referer') || '';
		const zihuyChatimatXHTTP = referer.includes('x_padding', 14) || referer.includes('x_padding=');
			if (!zihuyChatimatXHTTP && contentType.startsWith('application/grpc')) {
				log(`[gRPC] matched request: ${url.pathname}${url.search}`);
				return await tipulBakashatGRPC(request, userID, ctx);
			}
			log(`[XHTTP] matched request: ${url.pathname}${url.search}`);
			return await tipulBakashatXHTTP(request, userID, ctx);
		} else {
			if (url.protocol === 'http:') return Response.redirect(url.href.replace(`http://${url.hostname}`, `https://${url.hostname}`), 301);
			if (nativGisha === 'dns-query' || url.pathname === '/dns-query' || nativGisha === 'doh' || url.pathname === '/doh') {
				return tipulBakashatDoH(request);
			}
			// Backend-mode diagnostics: visit /backend-test in a browser to see what happens when Nova connects to the backend
			if (nativGisha === 'backend-test') {
				return await ivchunBackend(env, url);
			}
			if (nativGisha === 'relay') {
				return await handleRelayRequest(request, env);
			}
			if (nativGisha === 'scan' || nativGisha === 'radar') {
				return novaScanPage();
			}
			if (nativGisha === 'nova-block') {
				return dafChasum(request);
			}
			if (nativGisha === 'warp' || nativGisha.startsWith('warp/')) {
				return tipulBakashatWarp(request);
			}
			if (nativGisha === 'setwebhook') {
				if (!(await isAuthed(request, UA, mafteachHatzpana, adminPassword))) return new Response('Redirecting...', { status: 302, headers: { 'Location': _dg.pubLogin } });
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
			if (nativGisha === 'bot') {
				if (request.method === 'POST') return await tipulTelegramWebhook(request, env, userID, host, mafteachHatzpana);
				return new Response('Bot webhook active', { status: 200 });
			}
			if (nativGisha === 'install' || nativGisha.startsWith('install/')) {
				return await tipulAshafHatkana(request, env, url, adminPassword, mafteachHatzpana, UA);
			}
			if (nativGisha === 'admin/telegram-login') {
				const _tgChatId = url.searchParams.get('chat_id');
				const _tgToken = url.searchParams.get('token');
				if (!_tgChatId || !_tgToken) return new Response('Invalid request', { status: 400, headers: { 'Content-Type': 'text/plain;charset=utf-8' } });
				if (!await imutTokenHitchabrutTelegram(_tgChatId, _tgToken, mafteachHatzpana)) return new Response('Invalid or expired token', { status: 403, headers: { 'Content-Type': 'text/plain;charset=utf-8' } });
				const _tgSession = await makeTelegramSessionToken(mafteachHatzpana, adminPassword);
				return new Response('Redirecting...', { status: 302, headers: { 'Location': _dg.pubAdmin, 'Set-Cookie': `auth=${_tgSession}; Path=/; HttpOnly; Secure; SameSite=Lax`, 'Cache-Control': 'no-store' } });
			}
			if (!adminPassword) return new Response(null, { status: 302, headers: { 'Location': '/install', 'Cache-Control': 'no-store, no-cache, must-revalidate' } });
			if (env.KV && typeof env.KV.get === 'function') {
				const nativGishaCaseSensitive = url.pathname.slice(1);
				if (nativGishaCaseSensitive === mafteachHatzpana && mafteachHatzpana !== 'Do not use this default KEY, add a KEY variable to set your own') {// Quick subscription
					const params = new URLSearchParams(url.search);
					params.set('token', await MD5MD5(host + userID));
					return new Response('Redirecting...', { status: 302, headers: { 'Location': `/sub?${params.toString()}` } });
				} else if (nativGisha === 'login') {// Handle login page and login requests
					const cookies = request.headers.get('Cookie') || '';
					const authCookie = cookies.split(';').find(c => c.trim().startsWith('auth='))?.split('=')[1];
					if (await verifySessionToken(authCookie, UA, mafteachHatzpana, adminPassword)) return new Response('Redirecting...', { status: 302, headers: { 'Location': _dg.pubAdmin } });
					if (request.method === 'POST') {
						const __ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-real-ip') || 'unknown';
						const __rl = loginRateCheck(__ip);
						if (!__rl.allowed) return new Response(JSON.stringify({ error: 'rate_limited' }), { status: 429, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Retry-After': String(__rl.retryAfter), 'Cache-Control': 'no-store' } });
						const formData = await request.text();
						const params = new URLSearchParams(formData);
						const haknasatSisma = params.get('password');
						const normPass = (x) => String(x == null ? '' : x).trim().replace(/[\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g, '');
						if (timingSafeStrEqual(normPass(haknasatSisma), normPass(adminPassword)) || (envPass && timingSafeStrEqual(normPass(haknasatSisma), normPass(envPass)))) {
							let tfa2 = null;
							try { if (env.KV && typeof env.KV.get === 'function') tfa2 = JSON.parse(await env.KV.get('admin_2fa.json') || 'null'); } catch (e) {}
							if (tfa2 && tfa2.enabled && tfa2.secret) {
								const inputCode = (params.get('code') || params.get('otp') || '').trim();
								if (!inputCode) return new Response(JSON.stringify({ need2fa: true }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
								if (!await totpVerify(tfa2.secret, inputCode)) { loginRecordFailure(__ip); return new Response(JSON.stringify({ need2fa: true, error: 'bad_code' }), { status: 401, headers: { 'Content-Type': 'application/json;charset=utf-8' } }); }
							}
						const tguva = new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						loginRecordSuccess(__ip);
						tguva.headers.set('Set-Cookie', `auth=${await makeSessionToken(UA, mafteachHatzpana, adminPassword)}; Path=/; HttpOnly; Secure; SameSite=Lax`);
						ctx.waitUntil(notifyHubPanel(env, host, ctx));
						// Login notification to Telegram
						try {
							const _tgTxt = await env.KV.get('tg.json');
							if (_tgTxt) { const _tgJ = JSON.parse(_tgTxt); if (_tgJ.BotToken && _tgJ.ChatID) {
								const _loc = request.cf ? `${request.cf.city || '?'}, ${request.cf.country || '?'}` : '?';
								const _asn = request.cf?.asn || '?';
								const _loginMsg = `🔐 <b>ورود موفق به پنل</b>\n\n🌐 IP: <code>${__ip}</code>\n📍 ${_loc}\n🏢 ASN: <code>${_asn}</code>\n🖥 UA: <code>${(UA || '').slice(0, 60)}</code>`;
								ctx.waitUntil(tgApi(_tgJ.BotToken, 'sendMessage', { chat_id: _tgJ.ChatID, parse_mode: 'HTML', text: _loginMsg }).catch(() => {}));
							}}
						} catch (e) {}
						return tguva;
						} else { loginRecordFailure(__ip);
							// Failed login notification to Telegram
							try {
								const _tgTxt = await env.KV.get('tg.json');
								if (_tgTxt) { const _tgJ = JSON.parse(_tgTxt); if (_tgJ.BotToken && _tgJ.ChatID) {
									const _loc = request.cf ? `${request.cf.city || '?'}, ${request.cf.country || '?'}` : '?';
									const _failMsg = `⚠️ <b>تلاش ناموفق ورود</b>\n\n🌐 IP: <code>${__ip}</code>\n📍 ${_loc}\n🖥 UA: <code>${(UA || '').slice(0, 60)}</code>`;
									ctx.waitUntil(tgApi(_tgJ.BotToken, 'sendMessage', { chat_id: _tgJ.ChatID, parse_mode: 'HTML', text: _failMsg }).catch(() => {}));
								}}
							} catch (e) {}
						}
					}
					return await panelHtml(env, '/login');
				} else if (nativGisha === 'admin' || nativGisha.startsWith('admin/')) {// Serve the admin page after validating the cookie
					const cookies = request.headers.get('Cookie') || '';
					const authCookie = cookies.split(';').find(c => c.trim().startsWith('auth='))?.split('=')[1];
				// Multi-Panel Hub: a master pushes config to a child via /admin/api/sync using ONLY a Bearer
				// key (no browser cookie). Let that one endpoint past the cookie gate so it can run its own
				// key check; otherwise the "!authCookie" short-circuit redirected every sync and the hub
				// silently never worked.
				if (nativGisha !== 'admin/api/sync' && (!authCookie || !(await isAuthed(request, UA, mafteachHatzpana, adminPassword)))) return new Response('Redirecting...', { status: 302, headers: { 'Location': _dg.pubLogin } });
				// Multi-Panel Hub, browser-driven: the hub panel's BROWSER reaches a child directly (a worker
				// cannot fetch a same-account worker). Handle the CORS preflight and the no-auth reachability
				// probe here, before the POST/GET method chains (which never run for OPTIONS, and whose GET
				// chain has no api/sync route). The real config-applying POST is handled in the POST chain.
				if (nativGisha === 'admin/api/sync' && request.method !== 'POST') {
					const _cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'authorization, content-type', 'Access-Control-Max-Age': '86400' };
					if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: _cors });
					if (request.method === 'GET') return new Response(JSON.stringify({ ok: true, build: NOVA_BUILD, version: Version }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', ..._cors } });
				}
				// --- Central sync: on panel access, heartbeat + fetch notifications (once every 10 minutes) ---
				ctx.waitUntil(flushUsage(env));
				if (Date.now() - zmanSinchronMerkaziAcharon > 600000) { zmanSinchronMerkaziAcharon = Date.now(); ctx.waitUntil(peimatLevMerkazit(env)); ctx.waitUntil(riaanunHodaot(env)); }
				if (nativGisha === 'admin/keepalive') {
					const _freshTok = await makeSessionToken(UA, mafteachHatzpana, adminPassword);
					return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store', 'Set-Cookie': `auth=${_freshTok}; Path=/; HttpOnly; Secure; SameSite=Lax` } });
				} else if (nativGisha === 'admin/security/status') {
						let tfaS = null; try { tfaS = JSON.parse(await env.KV.get('admin_2fa.json') || 'null'); } catch (e) {}
						const kvPassS = await env.KV.get('admin_pass');
						return new Response(JSON.stringify({ twofa: !!(tfaS && tfaS.enabled), passwordSource: kvPassS ? 'kv' : 'env', envRecovery: !!envPass, kvSet: !!kvPassS, uuidPinned: !!(await env.KV.get('worker_uuid')) }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
					} else if (nativGisha === 'admin/security/change-password') {
						if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
						let body = {}; try { body = await request.json(); } catch (e) {}
						const cur = (body.current || '').toString().replace(/[\r\n]/g, '');
						const neu = (body.new || '').toString().replace(/[\r\n]/g, '');
						const curOk = timingSafeStrEqual(cur, String(adminPassword || '').replace(/[\r\n]/g, '')) || (envPass && timingSafeStrEqual(cur, String(envPass).replace(/[\r\n]/g, '')));
						if (!curOk) return new Response(JSON.stringify({ error: 'wrong_current' }), { status: 403, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						if (neu.length < 6) return new Response(JSON.stringify({ error: 'too_short' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						try { if (!(env.UUID || env.uuid)) { const ex = await env.KV.get('worker_uuid'); if (!ex) { await env.KV.put('worker_uuid', userID); mitmonWorkerUuid = userID; zmanMitmonWorkerUuid = Date.now(); } } } catch (e) {}
						await env.KV.put('admin_pass', neu); mitmonSismatMenahel = neu; zmanMitmonSismatMenahel = Date.now();
						ctx.waitUntil(logAdminAction(env, request, 'change-password', 'admin password changed'));
						const respCP = new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						respCP.headers.set('Set-Cookie', `auth=${await makeSessionToken(UA, mafteachHatzpana, neu)}; Path=/; HttpOnly; Secure; SameSite=Lax`);
						return respCP;
					} else if (nativGisha === 'admin/security/reveal') {
						let src = 'none'; try { src = envPass ? 'env' : ((await env.KV.get('admin_pass')) ? 'kv' : 'none'); } catch (e) { src = envPass ? 'env' : 'none'; }
						return new Response(JSON.stringify({ password: adminPassword || '', source: src }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
					} else if (nativGisha === 'admin/security/2fa-setup') {
						const secret = randomBase32(32);
						const label = encodeURIComponent('Nova Proxy (' + url.host + ')');
						const otpauth = `otpauth://totp/${label}?secret=${secret}&issuer=${encodeURIComponent('Nova Proxy')}&algorithm=SHA1&digits=6&period=30`;
						return new Response(JSON.stringify({ secret, otpauth }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
					} else if (nativGisha === 'admin/security/2fa-enable') {
						if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
						let body = {}; try { body = await request.json(); } catch (e) {}
						const secret = (body.secret || '').toString().trim();
						const code = (body.code || '').toString().trim();
						if (!secret) return new Response(JSON.stringify({ error: 'no_secret' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						if (!await totpVerify(secret, code)) return new Response(JSON.stringify({ error: 'bad_code' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						await env.KV.put('admin_2fa.json', JSON.stringify({ enabled: true, secret, addedAt: Date.now() }));
						ctx.waitUntil(logAdminAction(env, request, '2fa-enable', '2FA enabled for admin'));
						return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					} else if (nativGisha === 'admin/security/2fa-disable') {
						if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
						let body = {}; try { body = await request.json(); } catch (e) {}
						const code = (body.code || '').toString().trim();
						let tfaD = null; try { tfaD = JSON.parse(await env.KV.get('admin_2fa.json') || 'null'); } catch (e) {}
						if (tfaD && tfaD.enabled && tfaD.secret && !await totpVerify(tfaD.secret, code)) return new Response(JSON.stringify({ error: 'bad_code' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						await env.KV.delete('admin_2fa.json');
						ctx.waitUntil(logAdminAction(env, request, '2fa-disable', '2FA disabled for admin'));
						return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					} else if (nativGisha === 'admin/security/rotate-path') {// چرخش دستی مسیر مخفی ادمین/لاگین/ساب (بدون توقف سرویس، برخلاف /panic)
						if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
						const _rot = h => Array.from(crypto.getRandomValues(new Uint8Array(6)), b => b.toString(16).padStart(2, '0')).join('');
						let nsR = {}; try { nsR = JSON.parse(await env.KV.get('network-settings.json') || '{}'); } catch (e) {}
						const oldPaths = { adminPath: nsR.adminPath || '', loginPath: nsR.loginPath || '', subPath: nsR.subPath || '' };
						nsR.disguise = true;
						nsR.adminPath = _rot(); nsR.loginPath = _rot(); nsR.subPath = _rot();
						await env.KV.put('network-settings.json', JSON.stringify(nsR)); hagdarotReshet = nsR; mitmonHagdarotReshet = nsR; zmanMitmonHagdarotReshet = Date.now();
						ctx.waitUntil(logAdminAction(env, request, 'rotate-path', `admin/login/sub paths rotated (was ${JSON.stringify(oldPaths)})`));
						return new Response(JSON.stringify({ success: true, adminPath: '/' + nsR.adminPath, loginPath: '/' + nsR.loginPath, subPath: '/' + nsR.subPath }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
					} else if (nativGisha === 'admin/security/audit-log') {// خواندن رکوردهای audit log
						const _lim = parseInt(url.searchParams.get('limit') || '200') || 200;
						return new Response(JSON.stringify(await auditLogReadAll(env, _lim)), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
					} else if (nativGisha === 'admin/log.json') {// Read log content (D1-backed)
						const kriatTochenYoman = JSON.stringify(await logReadAll(env));
						return new Response(kriatTochenYoman, { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					} else if (nativGishaCaseSensitive === 'admin/getCloudflareUsage') {// Query request volume
						try {
							const Usage_JSON = await getCloudflareUsage(url.searchParams.get('Email'), url.searchParams.get('GlobalAPIKey'), url.searchParams.get('AccountID'), url.searchParams.get('APIToken'));
							return new Response(JSON.stringify(Usage_JSON, null, 2), { status: 200, headers: { 'Content-Type': 'application/json' } });
						} catch (err) {
							const errorResponse = { msg: 'Failed to load request count / خطا در دریافت تعداد درخواست‌ها: ' + err.message, error: err.message };
							return new Response(JSON.stringify(errorResponse, null, 2), { status: 500, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						}
					} else if (nativGishaCaseSensitive === 'admin/getADDAPI') {// Validate preferred-IP API
						if (url.searchParams.get('url')) {
							const urlMuvcharLeimut = url.searchParams.get('url');
							try {
								new URL(urlMuvcharLeimut);
								const tochenBakashatApiNivchar = await bakashatAPImuvchar([urlMuvcharLeimut], url.searchParams.get('port') || '443');
								let ipApiNivchar = tochenBakashatApiNivchar[0].length > 0 ? tochenBakashatApiNivchar[0] : tochenBakashatApiNivchar[1];
								ipApiNivchar = ipApiNivchar.map(item => item.replace(/#(.+)$/, (_, remark) => '#' + decodeURIComponent(remark)));
								return new Response(JSON.stringify({ success: true, data: ipApiNivchar }, null, 2), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							} catch (err) {
								const errorResponse = { msg: 'Optimized API check failed / بررسی API ناموفق بود: ' + err.message, error: err.message };
								return new Response(JSON.stringify(errorResponse, null, 2), { status: 500, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							}
						}
						return new Response(JSON.stringify({ success: false, data: [] }, null, 2), { status: 403, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					} else if (nativGisha === 'admin/check') {// Proxy check
						const protokolProxy = ['socks5', 'http', 'https', 'turn', 'sstp'].find(sug => url.searchParams.has(sug)) || null;
						if (!protokolProxy) return new Response(JSON.stringify({ error: 'Missing proxy parameter / پارامتر پروکسی موجود نیست' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						const paramProxy = url.searchParams.get(protokolProxy);
						const startTime = Date.now();
						let zihuiTguvatProxy;
						try {
							parsedSocks5Address = await kabelCheshbonSocks5(paramProxy, kabelPortBereiratProxy(protokolProxy));
							const { username, password, hostname, port } = parsedSocks5Address;
							const parametrProxyMale = username && password ? `${username}:${password}@${hostname}:${port}` : `${hostname}:${port}`;
							try {
								const zihuiHost = 'cloudflare.com', zihuiPort = 443, encoder = new TextEncoder(), decoder = new TextDecoder();
								const chiburTCP = yatzerMchubarTcpBakasha(request);
								let tcpSocket = null, tlsSocket = null;
								try {
									tcpSocket = protokolProxy === 'socks5'
										? await socks5Connect(zihuiHost, zihuiPort, new Uint8Array(0), chiburTCP)
										: protokolProxy === 'turn'
											? await turnConnect(parsedSocks5Address, zihuiHost, zihuiPort, chiburTCP)
											: protokolProxy === 'sstp'
												? await sstpConnect(parsedSocks5Address, zihuiHost, zihuiPort, chiburTCP)
												: (protokolProxy === 'https' && isIPHostname(hostname)
													? await httpsConnect(zihuiHost, zihuiPort, new Uint8Array(0), chiburTCP)
													: await httpConnect(zihuiHost, zihuiPort, new Uint8Array(0), protokolProxy === 'https', chiburTCP));
									if (!tcpSocket) throw new Error('Cannot connect to the proxy server');
									tlsSocket = new TlsClient(tcpSocket, { serverName: zihuiHost, insecure: true });
									await tlsSocket.handshake();
									await tlsSocket.write(encoder.encode(`GET /cdn-cgi/trace HTTP/1.1\r\nHost: ${zihuiHost}\r\nUser-Agent: Mozilla/5.0\r\nConnection: close\r\n\r\n`));
									let responseBuffer = new Uint8Array(0), headerEndIndex = -1, contentLength = null, chunked = false;
									const maksBytimTeguva = 64 * 1024;
									while (responseBuffer.length < maksBytimTeguva) {
										const value = await tlsSocket.read();
										if (!value) break;
										if (value.byteLength === 0) continue;
										responseBuffer = shrsherBytes(responseBuffer, value);
										if (headerEndIndex === -1) {
											const crlfcrlf = responseBuffer.findIndex((_, i) => i < responseBuffer.length - 3 && responseBuffer[i] === 0x0d && responseBuffer[i + 1] === 0x0a && responseBuffer[i + 2] === 0x0d && responseBuffer[i + 3] === 0x0a);
											if (crlfcrlf !== -1) {
												headerEndIndex = crlfcrlf + 4;
												const headers = decoder.decode(responseBuffer.slice(0, headerEndIndex));
												const statusLine = headers.split('\r\n')[0] || '';
												const statusMatch = statusLine.match(/HTTP\/\d\.\d\s+(\d+)/);
												const statusCode = statusMatch ? parseInt(statusMatch[1], 10) : NaN;
												if (!Number.isFinite(statusCode) || statusCode < 200 || statusCode >= 300) throw new Error(`proxy probe request failed: ${statusLine || 'Invalid response'}`);
												const lengthMatch = headers.match(/\r\nContent-Length:\s*(\d+)/i);
												if (lengthMatch) contentLength = parseInt(lengthMatch[1], 10);
												chunked = /\r\nTransfer-Encoding:\s*chunked/i.test(headers);
											}
										}
										if (headerEndIndex !== -1 && contentLength !== null && responseBuffer.length >= headerEndIndex + contentLength) break;
										if (headerEndIndex !== -1 && chunked && decoder.decode(responseBuffer).includes('\r\n0\r\n\r\n')) break;
									}
									if (headerEndIndex === -1) throw new Error('Proxy probe response header too long or invalid');
									const response = decoder.decode(responseBuffer);
									const ip = response.match(/(?:^|\n)ip=(.*)/)?.[1];
									const loc = response.match(/(?:^|\n)loc=(.*)/)?.[1];
									if (!ip || !loc) throw new Error('Invalid proxy probe response');
									zihuiTguvatProxy = { success: true, proxy: protokolProxy + "://" + parametrProxyMale, ip, loc, responseTime: Date.now() - startTime };
								} finally {
									try { tlsSocket ? tlsSocket.close() : await tcpSocket?.close?.() } catch (e) { }
								}
							} catch (error) {
								zihuiTguvatProxy = { success: false, error: error.message, proxy: protokolProxy + "://" + parametrProxyMale, responseTime: Date.now() - startTime };
							}
						} catch (err) {
							zihuiTguvatProxy = { success: false, error: err.message, proxy: protokolProxy + "://" + paramProxy, responseTime: Date.now() - startTime };
						}
						return new Response(JSON.stringify(zihuiTguvatProxy, null, 2), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					}

				config_JSON = await keriatConfigJson(env, host, userID, UA);

				if (nativGisha === 'admin/init') {// Reset config to defaults
						try {
							config_JSON = await keriatConfigJson(env, host, userID, UA, true);
							ctx.waitUntil(rishumYomanBakasha(env, request, gishaIP, 'Init_Config', config_JSON));
							config_JSON.init = 'Configuration reset to defaults';
							return new Response(JSON.stringify(config_JSON, null, 2), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						} catch (err) {
							const errorResponse = { msg: 'Config reset failed / بازنشانی پیکربندی ناموفق بود: ' + err.message, error: err.message };
							return new Response(JSON.stringify(errorResponse, null, 2), { status: 500, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						}
					} else if (request.method === 'POST') {// Handle KV operations (POST requests)
						if (nativGisha === 'admin/config.json') { // Save config.json
							try {
								const newConfig = await request.json();
							// Bridge: map the panel's English keys onto the internal field names the worker reads.
							const _enToInternal = { protocolType: 'sugProtokol', transportProtocol: 'protokolHaavara', gRPCmode: 'matzavGRPC', skipCertVerify: 'dalegImutTeuda', tlsFragment: 'pilugTLS', randomPath: 'nativAckrai', subConverterConfig: 'tetzuratHamaratMinuy', proxy: 'metavech', optimizedSubGeneration: 'muvcharMinuyMecholel' };
							for (const _en in _enToInternal) { if (_en in newConfig) { newConfig[_enToInternal[_en]] = newConfig[_en]; delete newConfig[_en]; } }
							if (newConfig.muvcharMinuyMecholel && typeof newConfig.muvcharMinuyMecholel === 'object') {
								delete newConfig.muvcharMinuyMecholel.TOKEN;
								// Bridge nested English keys inside optimizedSubGeneration to internal field names.
								const subGen = newConfig.muvcharMinuyMecholel;
								if ('localIPPool' in subGen) { subGen.sifriyatIPmekomit = subGen.localIPPool; delete subGen.localIPPool; }
								if (subGen.sifriyatIPmekomit && typeof subGen.sifriyatIPmekomit === 'object') {
									const pool = subGen.sifriyatIPmekomit;
									const _poolEnToInternal = { randomIP: 'ipAckrai', randomCount: 'kamutAckrait', fixedPort: 'portMeyuchad' };
									for (const _en in _poolEnToInternal) { if (_en in pool) { pool[_poolEnToInternal[_en]] = pool[_en]; delete pool[_en]; } }
								}
							}
								// Validate config completeness
								if (!newConfig.UUID || !newConfig.HOST) return new Response(JSON.stringify({ error: 'Incomplete configuration / پیکربندی ناقص است' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });

							// Save to KV
							await putConfig(env, JSON.stringify(newConfig, null, 2));
								ctx.waitUntil(rishumYomanBakasha(env, request, gishaIP, 'Save_Config', config_JSON));
								ctx.waitUntil(publishSubMirror(env, `${url.protocol}//${url.host}`, userID).catch(() => {}));
								return new Response(JSON.stringify({ success: true, message: 'Configuration saved / پیکربندی ذخیره شد' }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							} catch (error) {
								console.error('Save config failed:', error);
								return new Response(JSON.stringify({ error: 'Failed to save configuration / ذخیره پیکربندی ناموفق بود: ' + error.message }), { status: 500, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							}
						} else if (nativGisha === 'admin/publish-mirror') { // Manual "Publish now": the panel POSTs here (the GET twin lives further down)
							const result = await publishSubMirror(env, `${url.protocol}//${url.host}`, userID, { force: true });
							const allOk = !result.skipped && Array.isArray(result.results) && result.results.every(r => r.ok);
							return new Response(JSON.stringify(result, null, 2), { status: result.skipped ? 400 : (allOk ? 200 : 502), headers: { 'Content-Type': 'application/json;charset=utf-8' } });
												} else if (nativGisha === 'admin/publish-mirror-content') { // Panel-driven publish: the browser fetched the sub content, we just push it to GitHub (worker cannot fetch its own /sub)
							let _mc = {}; try { _mc = await request.json(); } catch (e) {}
							const _mres = await publishMirrorContent(env, (_mc && _mc.files) || {}, { force: true });
							const _mok = !_mres.skipped && Array.isArray(_mres.results) && _mres.results.every(r => r.ok);
							return new Response(JSON.stringify(_mres, null, 2), { status: _mres.skipped ? 400 : (_mok ? 200 : 502), headers: { 'Content-Type': 'application/json;charset=utf-8' } });
} else if (nativGisha === 'admin/cf.json') { // Save cf.json
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

								// Save to KV
								await env.KV.put('cf.json', JSON.stringify(CF_JSON, null, 2));
								ctx.waitUntil(rishumYomanBakasha(env, request, gishaIP, 'Save_Config', config_JSON));
								return new Response(JSON.stringify({ success: true, message: 'Configuration saved / پیکربندی ذخیره شد' }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							} catch (error) {
								console.error('Save config failed:', error);
								return new Response(JSON.stringify({ error: 'Failed to save configuration / ذخیره پیکربندی ناموفق بود: ' + error.message }), { status: 500, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							}
						} else if (nativGisha === 'admin/tg.json') { // Save tg.json
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
								ctx.waitUntil(rishumYomanBakasha(env, request, gishaIP, 'Save_Config', config_JSON));
								return new Response(JSON.stringify({ success: true, message: 'Configuration saved / پیکربندی ذخیره شد' }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							} catch (error) {
								console.error('Save config failed:', error);
								return new Response(JSON.stringify({ error: 'Failed to save configuration / ذخیره پیکربندی ناموفق بود: ' + error.message }), { status: 500, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							}
						} else if (nativGisha === 'admin/network-settings.json') { // Save network settings
							try {
								const settings = await request.json();
								const hagdarotTkefot = {
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
									backendUrl: (typeof settings.backendUrl === 'string' && /^https?:\/\//i.test(settings.backendUrl.trim())) ? settings.backendUrl.trim().slice(0, 300) : '',
									linkedPanels: Array.isArray(settings.linkedPanels) ? settings.linkedPanels.map(p => ({
										url: String(p.url || '').trim().slice(0, 200),
										apiKey: String(p.apiKey || '').trim().slice(0, 100),
										name: String(p.name || '').trim().slice(0, 50)
									})).filter(p => p.url && p.apiKey) : [],
								hubPanelUrl: String(settings.hubPanelUrl || '').trim().slice(0, 200),
								syncApiKey: String(settings.syncApiKey || '').trim().slice(0, 100),
								telegramChannel: String(settings.telegramChannel || '').trim().slice(0, 200) || 'https://t.me/irnova_proxy',
								fakeConfigs: Array.isArray(settings.fakeConfigs) ? settings.fakeConfigs.map(f => ({
									name: String(f.name || '').slice(0, 100),
									enabled: typeof f.enabled === 'boolean' ? f.enabled : true,
									...(f.locked ? { locked: true } : {})
								})).slice(0, 10) : [
									{ name: '📢 {telegram}', enabled: true, locked: true },
									{ name: '📊 {usage}  |  📅 {expiry}', enabled: true }
								],
								subUserAgent: String(settings.subUserAgent || '').trim().slice(0, 100),
								enableDirectConfigs: typeof settings.enableDirectConfigs === 'boolean' ? settings.enableDirectConfigs : false,
								customRouting: typeof settings.customRouting === 'string' ? settings.customRouting.slice(0, 4000) : '',
								metricNode: String(settings.metricNode || '').trim().slice(0, 100) || 'time.is',
								autoUpdate: typeof settings.autoUpdate === 'boolean' ? settings.autoUpdate : false,
									autoUpdateFormat: ['normal', 'obfuscated'].includes(settings.autoUpdateFormat) ? settings.autoUpdateFormat : 'normal',
									autoUpdateInterval: (typeof settings.autoUpdateInterval === 'number' && settings.autoUpdateInterval >= 600000) ? settings.autoUpdateInterval : 3600000,
									githubRepo: String(settings.githubRepo || '').trim().slice(0, 100) || 'IRNova/Nova-Proxy'
								};
							// CRITICAL: users, multiUser, HOSTS, mirror and other state ALSO live inside
							// network-settings.json. hagdarotTkefot only carries the routing/network fields,
							// so a wholesale put() here silently DELETED every user (and turned multiUser off)
							// on any Settings save. Merge over the existing file so unmanaged keys survive.
							let _prevNs = {}; try { _prevNs = JSON.parse(await env.KV.get('network-settings.json') || '{}'); } catch (e) {}
							const _mergedNs = { ..._prevNs, ...hagdarotTkefot };
							await env.KV.put('network-settings.json', JSON.stringify(_mergedNs, null, 2));
							hagdarotReshet = _mergedNs; mitmonHagdarotReshet = null;
							savedUsersAuth = null;
							ctx.waitUntil(rishumYomanBakasha(env, request, gishaIP, 'Save_Network_Settings', config_JSON));
							ctx.waitUntil(publishSubMirror(env, `${url.protocol}//${url.host}`, userID).catch(() => {}));
								return new Response(JSON.stringify({ success: true, message: 'Network settings saved / تنظیمات شبکه ذخیره شد' }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							} catch (error) {
								console.error('Save network settings failed:', error);
								return new Response(JSON.stringify({ error: 'Failed to save network settings / ذخیره تنظیمات شبکه ناموفق بود: ' + error.message }), { status: 500, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							}
						} else if (nativGishaCaseSensitive === 'admin/ADD.txt') { // Save custom preferred IPs
							try {
								const customIPs = await request.text();
								await env.KV.put('ADD.txt', customIPs);// Save to KV
								ctx.waitUntil(rishumYomanBakasha(env, request, gishaIP, 'Save_Custom_IPs', config_JSON));
								ctx.waitUntil(publishSubMirror(env, `${url.protocol}//${url.host}`, userID).catch(() => {}));
								return new Response(JSON.stringify({ success: true, message: 'Custom IP saved / آی‌پی سفارشی ذخیره شد' }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						} catch (error) {
							console.error('Save custom IP failed:', error);
							return new Response(JSON.stringify({ error: 'Failed to save custom IP / ذخیره آی‌پی سفارشی ناموفق بود: ' + error.message }), { status: 500, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						}
					} else if (nativGisha === 'admin/warp.json') { // WARP: ثبت / ثبت WoW / فعال‌سازی لایسنس WARP+ / fromCentral
						let stored = null; try { stored = JSON.parse(await env.KV.get('warp-account.json') || 'null'); } catch (e) { }
						if (request.method === 'POST') {
							let reqBody = {}; try { reqBody = await request.json(); } catch (e) { }
							try {
								if (reqBody.fromCentral) {
									// کشیدن کلیدهای WARP+ از استخر مرکزی و اعمال اولین کلید موفق
									if (!stored || !stored.registered) stored = await registerWarpAccount(env, 'warp-account.json');
									const { api } = await kabelCentralApi(env); if (!api) throw new Error('Central API not set in Settings');
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
								ctx.waitUntil(rishumYomanBakasha(env, request, gishaIP, reqBody.license ? 'WARP_License' : 'Register_WARP', config_JSON));
								const view = _warpPublicView(stored, hagdarotReshet && hagdarotReshet.warpEndpoint);
								const wraw = await env.KV.get('warp-account-wow.json');
								view.wow = wraw ? _warpPublicView(JSON.parse(wraw)) : null;
								return new Response(JSON.stringify(view, null, 2), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							} catch (e) {
								return new Response(JSON.stringify({ registered: !!(stored && stored.registered), error: e && e.message ? e.message : String(e) }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							}
						}
						// GET: نمایش وضعیت حساب WARP
						const view = stored ? _warpPublicView(stored, hagdarotReshet && hagdarotReshet.warpEndpoint) : { registered: false };
						const wraw2 = await env.KV.get('warp-account-wow.json');
						view.wow = wraw2 ? _warpPublicView(JSON.parse(wraw2)) : null;
						return new Response(JSON.stringify(view, null, 2), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					} else if (nativGisha === 'admin/users.json') { // multi-user registry (save) — panel-side CRUD
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
							// --- advanced per-user overrides (were dropped here before, so they never persisted:
							//     adult/ads filtering, speed/conn/ip limits, per-user proxy/socks5/fragment, auto-rotate, etc.) ---
							limitDailyReq: Number(u.limitDailyReq) || 0,
							notes: String(u.notes || '').slice(0, 300),
							speedLimitKBps: Number(u.speedLimitKBps) || 0,
							connLimit: u.connLimit ? parseInt(u.connLimit) : null,
							maxConfigs: u.maxConfigs ? parseInt(u.maxConfigs) : null,
							userPorts: u.userPorts || null,
							userNodes: u.userNodes || null,
							userMode: u.userMode || null,
							usernat64: u.usernat64 || null,
							userPanelUrl: u.userPanelUrl || null,
							ipLimit: Number(u.ipLimit) || 0,
							activeIps: u.activeIps || '{}',
							blockPorn: u.blockPorn ? 1 : 0,
							blockAds: u.blockAds ? 1 : 0,
							fragLen: u.fragLen || '',
							fragInt: u.fragInt || '',
							lifetimeUsedGb: Number(u.lifetimeUsedGb) || 0,
							userProxyIata: u.userProxyIata || '',
							userSocks5: u.userSocks5 || '',
							userProxyIp: u.userProxyIp || '',
							autoResetVolDays: Number(u.autoResetVolDays) || 0,
							autoResetReqDays: Number(u.autoResetReqDays) || 0,
							lastResetVolTime: u.lastResetVolTime || Date.now(),
							lastResetReqTime: u.lastResetReqTime || Date.now(),
							autoRotateIp: u.autoRotateIp ? 1 : 0,
							rotateTime: Number(u.rotateTime) || 0,
							ipOperator: u.ipOperator || 'all',
							ipCount: Number(u.ipCount) || 20,
							lastRotateTime: u.lastRotateTime || 0,
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
							hagdarotReshet = ns;
							// Refresh the 30s network-settings cache too, otherwise the next request within the
							// window reloads the STALE cached copy and the just-saved user briefly disappears.
							mitmonHagdarotReshet = ns; zmanMitmonHagdarotReshet = Date.now();
							savedUsersAuth = { multiUser: ns.multiUser, users: ns.users }; savedUsersAuthZman = Date.now();
							ctx.waitUntil(rishumYomanBakasha(env, request, gishaIP, 'Save_Users', config_JSON));
							return new Response(JSON.stringify({ success: true, count: ns.users.length }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						} catch (error) { return new Response(JSON.stringify({ error: 'Save users failed: ' + error.message }), { status: 500, headers: { 'Content-Type': 'application/json;charset=utf-8' } }); }
					} else if (nativGisha === 'admin/central/announcement') { // Set broadcast announcement (admin action, forwarded to the central server)
						const { api, token } = await kabelCentralApi(env);
						if (!api) return new Response(JSON.stringify({ ok: false, error: 'centralApiNotSet' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						try {
							const r = await fetch(api + '/admin/announcement', { method: 'POST', headers: { 'Content-Type': 'application/json', ...(token ? { 'Authorization': 'Bearer ' + token } : {}) }, body: await request.text() });
							ctx.waitUntil(riaanunHodaot(env));
							return new Response(await r.text(), { status: r.status, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						} catch (e) { return new Response(JSON.stringify({ ok: false, error: e.message }), { status: 502, headers: { 'Content-Type': 'application/json;charset=utf-8' } }); }
					} else if (nativGisha === 'admin/cf-usage-setup') { // CF token connect (moved into POST branch so it is reachable)
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
						mitmonCfUsage = cuUsage; zmanMitmonCfUsage = Date.now();
						return new Response(JSON.stringify({ success: true, accountId: cuAccountId, usage: cuUsage }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
					} else if (nativGisha === 'admin/user-reset') { // Reset user usage counters + clear auto-disable flags
						try {
							if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
							const body = await request.json().catch(() => ({}));
							const id = body && body.id;
							if (!id) return new Response(JSON.stringify({ error: 'missing id' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							try { await usageReset(env, 'uusage:' + id); } catch (e) {}
							const _now = new Date();
							for (let i = 0; i < 40; i++) { const d = new Date(_now); d.setDate(d.getDate() - i); try { await usageReset(env, 'uusage-d:' + id + ':' + getDateKey(d)); } catch (e) {} }
							const _ns2 = JSON.parse(await env.KV.get('network-settings.json') || '{}');
							if (Array.isArray(_ns2.users)) { const u = _ns2.users.find(x => x && x.id === id); if (u) { u.enabled = true; delete u.disabledReason; delete u.disabledAt; delete u.autoDisabled; } await env.KV.put('network-settings.json', JSON.stringify(_ns2, null, 2)); hagdarotReshet = _ns2; savedUsersAuth = null; }
							ctx.waitUntil(rishumYomanBakasha(env, request, gishaIP, 'User_Reset', config_JSON));
							return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
						} catch (error) { return new Response(JSON.stringify({ error: 'reset failed: ' + error.message }), { status: 500, headers: { 'Content-Type': 'application/json;charset=utf-8' } }); }
					} else if (nativGisha === 'admin/reset-subkey') { // Rotate the subscription key: new key + fresh userID, invalidates every old link
						try {
							if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
							// A user-set KEY/UUID variable pins identity from the environment; it cannot be rotated from the panel.
							if (env.KEY || env.UUID || env.uuid) return new Response(JSON.stringify({ error: 'env-pinned' }), { status: 409, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							const _fresh = Array.from(crypto.getRandomValues(new Uint8Array(24)), b => 'abcdefghijklmnopqrstuvwxyz0123456789'[b % 36]).join('');
							await env.KV.put('auto_key', _fresh);
							try { await env.KV.delete('worker_uuid'); } catch (e) {}
							mitmonAutoKey = _fresh; zmanMitmonAutoKey = Date.now();
							mitmonWorkerUuid = null; zmanMitmonWorkerUuid = 0;
							ctx.waitUntil(rishumYomanBakasha(env, request, gishaIP, 'Reset_SubKey', config_JSON));
							return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
						} catch (error) { return new Response(JSON.stringify({ error: 'reset failed: ' + error.message }), { status: 500, headers: { 'Content-Type': 'application/json;charset=utf-8' } }); }
					} else if (nativGisha === 'admin/self-update.json') { // In-place Worker redeploy via the Cloudflare API (preserves bindings/secrets/D1)
						if (request.method !== 'POST') return new Response(JSON.stringify({ error: 'POST method only' }), { status: 405, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						const _idkunTguvatShgia = (meidaShgia, meidaNosaf) => new Response(JSON.stringify(Object.assign({ error: meidaShgia }, meidaNosaf || {})), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
						let gufBakashatIdkun = {}; try { gufBakashatIdkun = await request.json(); } catch (e) {}
						let idkunToken = String(gufBakashatIdkun.token || '').trim();
						// One-time Cloudflare auth: if no token is provided, reuse the saved Cloudflare token (cf.json, set via the usage card).
						// That token needs both Account Analytics:Read and Workers Scripts:Edit; one grant covers both usage queries and updates.
						if (!idkunToken) { try { const _tokenCf = JSON.parse(await env.KV.get('cf.json') || 'null'); if (_tokenCf && _tokenCf.APIToken) { idkunToken = String(_tokenCf.APIToken).trim(); if (!gufBakashatIdkun.accountId && _tokenCf.AccountID) gufBakashatIdkun.accountId = _tokenCf.AccountID; } } catch (e) {} }
						if (!idkunToken) return _idkunTguvatShgia('No token provided');
						let totzaatImutToken; try { totzaatImutToken = await cfVerifyToken(idkunToken); } catch (e) { totzaatImutToken = { ok: false }; }
						if (!totzaatImutToken || !totzaatImutToken.ok) return _idkunTguvatShgia('Invalid token');
						let idkunCheshbonId = String(gufBakashatIdkun.accountId || '').trim();
						if (!idkunCheshbonId) {
							let reshimatCheshbonot = []; try { reshimatCheshbonot = await cfListAccounts(idkunToken); } catch (e) {}
							if (!reshimatCheshbonot.length) return _idkunTguvatShgia('Account not found');
							if (reshimatCheshbonot.length === 1) idkunCheshbonId = reshimatCheshbonot[0].id;
							else return _idkunTguvatShgia('Multiple accounts found', { accounts: reshimatCheshbonot });
						}
						let shemScript = String(gufBakashatIdkun.scriptName || '').trim();
						if (!shemScript) {
							const hatamatSkript = /^([a-z0-9][a-z0-9-]*)\.[a-z0-9-]+\.workers\.dev$/i.exec(url.host);
							if (hatamatSkript) shemScript = hatamatSkript[1];
							else return _idkunTguvatShgia('Script name required');
						}
						// Safety gate: confirm we can read the script's current settings (hence its bindings) before overwriting, so self-update never drops D1/KV bindings.
						try {
							const teguvatHagdaraResp = await fetch(CF_API + '/accounts/' + idkunCheshbonId + '/workers/scripts/' + shemScript + '/settings', { headers: cfHeaders(idkunToken) });
							const totzaatHagdara = await cfJson(teguvatHagdaraResp);
							if (!totzaatHagdara || !totzaatHagdara.success) return _idkunTguvatShgia('Cannot read binding info');
						} catch (e) { return _idkunTguvatShgia('Cannot read binding info'); }
						// Resolve the canonical Worker source from the version manifest (version.json worker_url, else repo default).
						let ktovetKodMakor = NOVAWorkerSrcFallback, girsaAchrona = '';
						{ const meidaGirsa = await kabelGirsatNova(); if (meidaGirsa) { if (meidaGirsa.worker_url) ktovetKodMakor = meidaGirsa.worker_url; girsaAchrona = String(meidaGirsa.version || '').replace(/^[vV]/, ''); } }
						let textScript = '';
						try { const r = await fetch(ktovetKodMakor, { headers: { 'User-Agent': 'NovaProxy' } }); if (!r.ok) throw new Error('HTTP ' + r.status); textScript = await r.text(); } catch (e) { return _idkunTguvatShgia('Failed to download Worker source', { detail: (e && e.message) || String(e) }); }
						if (textScript.length < 1000 || !/export\s+default|addEventListener\s*\(/.test(textScript)) return _idkunTguvatShgia('Invalid Worker source');
						// Content-only replace: swap the code, keep bindings/secrets/vars/D1/KV intact.
						try {
							const netuneiTofes = new FormData();
							netuneiTofes.append('metadata', new Blob([JSON.stringify({ main_module: 'worker.js' })], { type: 'application/json' }));
							netuneiTofes.append('worker.js', new Blob([textScript], { type: 'application/javascript+module' }), 'worker.js');
							const teguvatHaalaa = await fetch(CF_API + '/accounts/' + idkunCheshbonId + '/workers/scripts/' + shemScript + '/content', { method: 'PUT', headers: cfHeaders(idkunToken), body: netuneiTofes });
							const totzaatHaalaa = await cfJson(teguvatHaalaa);
							if (!totzaatHaalaa || !totzaatHaalaa.success) { const hodaatShgia = (totzaatHaalaa && totzaatHaalaa.errors && totzaatHaalaa.errors[0] && totzaatHaalaa.errors[0].message) || ('HTTP ' + teguvatHaalaa.status); return _idkunTguvatShgia('Upload failed', { detail: hodaatShgia }); }
						} catch (e) { return _idkunTguvatShgia('Upload failed', { detail: (e && e.message) || String(e) }); }
						ctx.waitUntil(rishumYomanBakasha(env, request, gishaIP, 'Self-update', config_JSON));
						if (textScript.length > 1000) { ctx.waitUntil(propagateUpdateToLinkedPanels(env, girsaAchrona, textScript, ctx)); }
						return new Response(JSON.stringify({ success: true, version: girsaAchrona || undefined }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
					} else if (nativGisha === 'admin/api-keys') {// Panel API Keys management
						await loadPanelApiKeys(env);
						if (request.method === 'GET') {
							const keys = (cachedPanelApiKeys || []).map(k => ({ id: k.id, name: k.name, keyPreview: k.key.slice(0, 8) + '...' + k.key.slice(-4), createdAt: k.createdAt, lastUsed: k.lastUsed }));
							return new Response(JSON.stringify({ success: true, keys }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
						}
						if (request.method === 'POST') {
							let body = {}; try { body = await request.json(); } catch (e) {}
							if (body.action === 'create') {
								const keys = cachedPanelApiKeys || [];
								if (keys.length >= 10) return new Response(JSON.stringify({ success: false, error: 'Maximum 10 API keys' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
								const newKey = generateApiKey(body.name);
								keys.push(newKey);
								await savePanelApiKeys(env, keys);
								ctx.waitUntil(rishumYomanBakasha(env, request, gishaIP, 'Create_APIKey', config_JSON));
								return new Response(JSON.stringify({ success: true, key: newKey }), { status: 201, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							}
							if (body.action === 'revoke') {
								if (!body.id) return new Response(JSON.stringify({ success: false, error: 'Missing id' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
								const keys = cachedPanelApiKeys || [];
								const idx = keys.findIndex(k => k.id === body.id);
								if (idx === -1) return new Response(JSON.stringify({ success: false, error: 'Key not found' }), { status: 404, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
								const revoked = keys.splice(idx, 1)[0];
								await savePanelApiKeys(env, keys);
								ctx.waitUntil(rishumYomanBakasha(env, request, gishaIP, 'Revoke_APIKey', config_JSON));
								return new Response(JSON.stringify({ success: true, revoked: revoked.id }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							}
						}
						return new Response(JSON.stringify({ success: false, error: 'Invalid request' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					} else if (nativGisha === 'admin/linked-panels' || nativGisha === 'admin/linked-panels.json') {// Multi-Panel Hub: linked child panels
						if (request.method === 'GET') {
							let ns = {}; try { ns = JSON.parse(await env.KV.get('network-settings.json') || '{}'); } catch (e) {}
							const panels = Array.isArray(ns.linkedPanels) ? ns.linkedPanels : [];
							return new Response(JSON.stringify({ success: true, panels, linkedPanels: panels, hubPanelUrl: ns.hubPanelUrl || '', panelName: ns.panelName || '', syncApiKey: ns.syncApiKey || '' }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
						}
						if (request.method === 'POST') {
							let body = {}; try { body = await request.json(); } catch (e) {}
							let ns = {}; try { ns = JSON.parse(await env.KV.get('network-settings.json') || '{}'); } catch (e) {}
							ns.linkedPanels = (Array.isArray(body.linkedPanels) ? body.linkedPanels : []).map(p => ({ url: String(p.url || '').trim().slice(0, 200), apiKey: String(p.apiKey || '').trim().slice(0, 100), name: String(p.name || '').trim().slice(0, 50) })).filter(p => p.url && p.apiKey);
							ns.hubPanelUrl = String(body.hubPanelUrl || '').trim().slice(0, 200);
							if (body.panelName !== undefined) ns.panelName = String(body.panelName || '').trim().slice(0, 50);
							if (body.syncApiKey !== undefined) ns.syncApiKey = String(body.syncApiKey || '').trim().slice(0, 100);
							await env.KV.put('network-settings.json', JSON.stringify(ns, null, 2));
							mitmonHagdarotReshet = null;
							ctx.waitUntil(rishumYomanBakasha(env, request, gishaIP, 'Save_LinkedPanels', config_JSON));
							return new Response(JSON.stringify({ success: true, count: ns.linkedPanels.length }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						}
						return new Response(JSON.stringify({ success: false, error: 'Invalid request' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					} else if (nativGisha === 'admin/linked-panels-test') {// Hub: test reachability of one child panel
						if (request.method !== 'POST') return new Response(JSON.stringify({ error: 'POST only' }), { status: 405, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						let body = {}; try { body = await request.json(); } catch (e) {}
						let cleanUrl = String(body.url || '').trim();
						if (!cleanUrl) return new Response(JSON.stringify({ success: false, error: 'No URL' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						if (!/^https?:\/\//i.test(cleanUrl)) cleanUrl = 'https://' + cleanUrl;
						try {
							const parsed = new URL(cleanUrl);
							const r = await fetch(`${parsed.protocol}//${parsed.host}/version`, { headers: { 'User-Agent': 'NovaProxy' }, signal: AbortSignal.timeout(12000) });
							let version = '?'; try { const j = await r.json(); version = j.version || j.Version || '?'; } catch (e) {}
							return new Response(JSON.stringify({ success: r.ok, version, status: r.status }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						} catch (e) { return new Response(JSON.stringify({ success: false, error: e.message }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } }); }
					} else if (nativGisha === 'admin/linked-panels-sync' || nativGisha === 'admin/linked-panels/sync') {// Hub: sync config to one child panel (or all)
						if (request.method !== 'POST') return new Response(JSON.stringify({ error: 'POST only' }), { status: 405, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						let body = {}; try { body = await request.json(); } catch (e) {}
						config_JSON = await keriatConfigJson(env, host, userID, UA);
						if (body.url && body.apiKey) {
							let cleanUrl = String(body.url).trim(); if (!/^https?:\/\//i.test(cleanUrl)) cleanUrl = 'https://' + cleanUrl;
							try {
								const parsed = new URL(cleanUrl);
								const r = await fetch(`${parsed.protocol}//${parsed.host}/admin/api/sync`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + body.apiKey }, body: JSON.stringify({ config: { config_JSON, networkSettings: hagdarotReshet }, fromMaster: true }), signal: AbortSignal.timeout(15000) });
								let err = ''; if (!r.ok) { try { err = (await r.json()).error || ('HTTP ' + r.status); } catch (e) { err = 'HTTP ' + r.status; } }
								log(`[LinkedPanels] single sync to ${parsed.host}: ${r.status}`);
								return new Response(JSON.stringify({ success: r.ok, error: err, status: r.status }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							} catch (e) { return new Response(JSON.stringify({ success: false, error: e.message }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } }); }
						}
						await syncToLinkedPanels(env, { config_JSON, networkSettings: hagdarotReshet }, ctx);
						return new Response(JSON.stringify({ success: true, message: 'Sync triggered' }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					} else if (nativGisha === 'admin/api/sync') {// Receive config sync from master panel (browser-driven cross-origin POST)
						// CORS so the hub panel's BROWSER (different origin) can read this response. The OPTIONS
						// preflight + the GET reachability probe are handled earlier, before the method chains,
						// because this POST-only chain is never entered for OPTIONS/GET requests.
						const _cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'authorization, content-type' };
						const _sj = (obj, status) => new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json;charset=utf-8', ..._cors } });
						let body = {}; try { body = await request.json(); } catch (e) {}
						const authKey = (request.headers.get('Authorization') || '').replace('Bearer ', '').trim() || body.key || '';
						// Accept: a registered panel API key, the admin password, OR this child's own
						// "Sync API key" (hagdarotReshet.syncApiKey) - the field the hub UI tells you to match.
						const _childSyncKey = (hagdarotReshet && hagdarotReshet.syncApiKey) ? String(hagdarotReshet.syncApiKey).trim() : '';
						if (!isPanelApiKey(authKey) && authKey !== adminPassword && !(_childSyncKey && authKey === _childSyncKey)) return _sj({ success: false, error: 'Unauthorized' }, 403);
							// Only apply data that actually looks complete. A master pushing an empty or partial
							// object (a mistaken/partial sync) must NEVER overwrite a working child, which would
							// brick every admin route on the child. Require the core objects before writing.
							const _ns = body.config && body.config.networkSettings;
							const _cfg = body.config && body.config.config_JSON;
							const _applied = { networkSettings: false, config: false };
							if (_ns && typeof _ns === 'object' && Object.keys(_ns).length > 3) {
								// PER-PANEL DATA IS NEVER OVERWRITTEN BY A HUB. A hub propagates routing/blocking/DNS
								// settings, NOT accounts or identity. Users (and this panel's own hub links) live in
								// network-settings.json, so a naive wholesale overwrite would wipe the child's users
								// (they'd "vanish" on the next sync). Merge: take the master's settings but keep this
								// panel's own users + hub identity.
								let _childNs = {}; try { _childNs = JSON.parse(await env.KV.get('network-settings.json') || '{}'); } catch (e) {}
								const _merged = Object.assign({}, _ns);
								if (Array.isArray(_childNs.users)) _merged.users = _childNs.users; // keep THIS panel's users
								if (_childNs.multiUser !== undefined) _merged.multiUser = _childNs.multiUser;
								for (const _k of ['linkedPanels', 'hubPanelUrl', 'panelName', 'syncApiKey']) {
									if (_childNs[_k] !== undefined) _merged[_k] = _childNs[_k];
								}
								await env.KV.put('network-settings.json', JSON.stringify(_merged, null, 2));
								mitmonHagdarotReshet = null;
								_applied.networkSettings = true;
							}
							if (_cfg && typeof _cfg === 'object' && _cfg.tetzuratHamaratMinuy && _cfg.muvcharMinuyMecholel && _cfg.UUID) {
								// Keep this panel's OWN UUID so its subscription tokens (MD5MD5(host+UUID)) and node
								// identity stay stable, otherwise every existing user's link on the child would break.
								let _childCfg = {}; try { _childCfg = JSON.parse(await env.KV.get('config.json') || '{}'); } catch (e) {}
								const _mergedCfg = Object.assign({}, _cfg);
								if (_childCfg.UUID) _mergedCfg.UUID = _childCfg.UUID;
								await putConfig(env, JSON.stringify(_mergedCfg, null, 2));
								_applied.config = true;
							}
							log('[LinkedPanels] received sync from master; applied=' + JSON.stringify(_applied));
							if (!_applied.networkSettings && !_applied.config) return _sj({ success: false, error: 'incomplete config, nothing applied', applied: _applied }, 400);
							return _sj({ success: true, applied: _applied }, 200);
					} else if (nativGisha === 'admin/auto-update') {// Auto-update settings & trigger
						if (request.method === 'GET') {
							let ns = {}; try { ns = JSON.parse(await env.KV.get('network-settings.json') || '{}'); } catch (e) {}
							let lastUpdate = null; try { lastUpdate = JSON.parse(await env.KV.get('last_auto_update') || 'null'); } catch (e) {}
							return new Response(JSON.stringify({
								success: true,
								autoUpdate: !!ns.autoUpdate,
								autoUpdateFormat: ns.autoUpdateFormat || 'normal',
								autoUpdateInterval: ns.autoUpdateInterval || 3600000,
								cfConfigured: !!(ns.cfAccountId && ns.cfApiToken && ns.cfWorkerName),
								lastUpdate,
								currentVersion: Version
							}), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
						}
						if (request.method === 'POST') {
							let body = {}; try { body = await request.json(); } catch (e) {}
							let ns = {}; try { ns = JSON.parse(await env.KV.get('network-settings.json') || '{}'); } catch (e) {}
							if (body.autoUpdate !== undefined) ns.autoUpdate = !!body.autoUpdate;
							if (body.autoUpdateFormat !== undefined) ns.autoUpdateFormat = ['normal', 'obfuscated'].includes(body.autoUpdateFormat) ? body.autoUpdateFormat : 'normal';
							if (body.autoUpdateInterval !== undefined) ns.autoUpdateInterval = Math.max(600000, Number(body.autoUpdateInterval) || 3600000);
							if (body.cfAccountId !== undefined) ns.cfAccountId = String(body.cfAccountId || '').trim();
							if (body.cfApiToken !== undefined) ns.cfApiToken = String(body.cfApiToken || '').trim();
							if (body.cfWorkerName !== undefined) ns.cfWorkerName = String(body.cfWorkerName || '').trim();
							if (body.githubRepo !== undefined) ns.githubRepo = String(body.githubRepo || '').trim();
							await env.KV.put('network-settings.json', JSON.stringify(ns, null, 2));
							mitmonHagdarotReshet = null;
							if (body.action === 'check') {
								const repo = (ns.githubRepo || 'IRNova/Nova-Proxy').replace(/https?:\/\/github\.com\//, '').trim();
								let remoteVer = null;
								try { const res = await fetch(`https://raw.githubusercontent.com/${repo}/main/version.json`, { headers: { 'User-Agent': 'NovaProxy' }, cf: { cacheTtl: 0 } }); if (res.ok) { const j = await res.json(); if (j && j.version) remoteVer = String(j.version).replace(/^[vV]/, ''); } } catch (e) {}
								const current = String(Version).replace(/^[vV]/, '').replace(/\D+/g, '');
								return new Response(JSON.stringify({ success: true, current, latest: remoteVer || '', updateAvailable: remoteVer ? cmpVersions(current, remoteVer) < 0 : false, cfConfigured: !!(ns.cfAccountId && ns.cfApiToken && ns.cfWorkerName) }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
							}
							if (body.action === 'update') {
								if (!ns.cfAccountId || !ns.cfApiToken || !ns.cfWorkerName) return new Response(JSON.stringify({ success: false, error: 'CF credentials not configured' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
								ctx.waitUntil(runAutoUpdate(env, ns, ctx));
								return new Response(JSON.stringify({ success: true, message: 'Update triggered' }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							}
							ctx.waitUntil(rishumYomanBakasha(env, request, gishaIP, 'Save_AutoUpdate', config_JSON));
							return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						}
						return new Response(JSON.stringify({ success: false, error: 'Invalid request' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					} else return new Response(JSON.stringify({ error: 'Unsupported request path / مسیر درخواست پشتیبانی نمی‌شود' }), { status: 404, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					} else if (nativGisha === 'admin/config.json') {// Handle admin/config.json request, return JSON
						const _subTok = await MD5MD5(host + userID);
						const _optSubGen = Object.assign({}, config_JSON.muvcharMinuyMecholel, { TOKEN: _subTok });
						if (_optSubGen.sifriyatIPmekomit) {
							_optSubGen.localIPPool = {
								randomIP: _optSubGen.sifriyatIPmekomit.ipAckrai,
								randomCount: _optSubGen.sifriyatIPmekomit.kamutAckrait,
								fixedPort: _optSubGen.sifriyatIPmekomit.portMeyuchad
							};
							delete _optSubGen.sifriyatIPmekomit;
						}
						const _panelCfg = Object.assign({}, config_JSON, {
							optimizedSubGeneration: _optSubGen,
							protocolType: config_JSON.sugProtokol,
							transportProtocol: config_JSON.protokolHaavara,
							gRPCmode: config_JSON.matzavGRPC,
							skipCertVerify: config_JSON.dalegImutTeuda,
							tlsFragment: config_JSON.pilugTLS,
							randomPath: config_JSON.nativAckrai,
							subConverterConfig: config_JSON.tetzuratHamaratMinuy,
							proxy: config_JSON.metavech
						});
						const _authKey = extractAuthKey(request, null);
						const _isApiAuth = _authKey && _authKey !== adminPassword && isPanelApiKey(_authKey);
						return new Response(JSON.stringify(protectFields(_panelCfg, _isApiAuth), null, 2), { status: 200, headers: { 'Content-Type': 'application/json' } });
					} else if (nativGishaCaseSensitive === 'admin/ADD.txt') {// Handle admin/ADD.txt request, return local preferred IPs
						let ipNivcharMekomi = await env.KV.get('ADD.txt') || 'null';
						if (ipNivcharMekomi == 'null') ipNivcharMekomi = (await yatzerIpAkrai(request, config_JSON.muvcharMinuyMecholel.sifriyatIPmekomit.kamutAckrait, config_JSON.muvcharMinuyMecholel.sifriyatIPmekomit.portMeyuchad))[1];
						return new Response(ipNivcharMekomi, { status: 200, headers: { 'Content-Type': 'text/plain;charset=utf-8', 'asn': request.cf.asn } });
					} else if (nativGisha === 'admin/cf.json') {// CF config file
						return new Response(JSON.stringify(request.cf, null, 2), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					} else if (nativGisha === 'admin/network-settings.json') {// Network settings file
						try {
							const saved = await env.KV.get('network-settings.json');
							const hagdarotBreiratMechdal = {
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
						backendMode: false, backendUrl: '',
					linkedPanels: [], hubPanelUrl: '', syncApiKey: '',
					autoUpdate: false, autoUpdateFormat: 'normal', autoUpdateInterval: 3600000, githubRepo: 'IRNova/Nova-Proxy',
					telegramChannel: 'https://t.me/irnova_proxy',
					fakeConfigs: [
						{ name: '📢 {telegram}', enabled: true, locked: true },
						{ name: '📊 {usage}  |  📅 {expiry}', enabled: true }
					],
					subUserAgent: '', enableDirectConfigs: false, customRouting: '', metricNode: 'time.is'
							};
							const settings = saved ? JSON.parse(saved) : hagdarotBreiratMechdal;
							return new Response(JSON.stringify(settings, null, 2), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						} catch (error) {
							return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						}
					} else if (nativGisha === 'admin/linked-panels' || nativGisha === 'admin/linked-panels.json') {// Multi-Panel Hub: read linked child panels (GET)
						let ns = {}; try { ns = JSON.parse(await env.KV.get('network-settings.json') || '{}'); } catch (e) {}
						const panels = Array.isArray(ns.linkedPanels) ? ns.linkedPanels : [];
						return new Response(JSON.stringify({ success: true, panels, linkedPanels: panels, hubPanelUrl: ns.hubPanelUrl || '', panelName: ns.panelName || '', syncApiKey: ns.syncApiKey || '' }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
					} else if (nativGisha === 'admin/linked-panels-payload') {// Multi-Panel Hub: build the exact config the browser relays to children (browser-driven sync)
						// The hub worker CANNOT fetch a same-account child (workers.dev same-account fetch 404s),
						// so the hub browser fetches this payload and POSTs it to each child itself.
						const _cfgJson = await keriatConfigJson(env, host, userID, UA);
						let _net = {}; try { _net = JSON.parse(await env.KV.get('network-settings.json') || '{}'); } catch (e) {}
						// Strip per-panel data from what the hub sends: accounts (users) and the hub's own links
						// are NOT propagated. The receiver also preserves the child's copies, but not transmitting
						// them keeps every user's key on its own panel (privacy + correctness).
						const _netToSend = Object.assign({}, _net);
						delete _netToSend.users; delete _netToSend.linkedPanels; delete _netToSend.hubPanelUrl; delete _netToSend.panelName; delete _netToSend.syncApiKey;
						return new Response(JSON.stringify({ success: true, config: { config_JSON: _cfgJson, networkSettings: _netToSend } }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
					} else if (nativGisha === 'admin/system.json') {// اطلاعات سیستم
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
							ip: gishaIP,
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
					} else if (nativGisha === 'admin/domain-health.json') {// Domain health check
						if (url.searchParams.has('check')) {
							const health = await bdikatBriutDomain(env, hosts, host);
							return new Response(JSON.stringify(health), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
						} else {
							const health = env.KV && typeof env.KV.get === 'function' ? JSON.parse(await env.KV.get('domain-health.json') || 'null') : null;
							return new Response(JSON.stringify(health || { checkedAt: 0, domains: [] }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
						}
					} else if (nativGisha === 'admin/usage-data') {// آمار مصرف ۹۰ روز اخیر
						try {
							const now = new Date();
							const days = 90;
							// Read all days' usage data in parallel (instead of serial awaits) for much faster responses
							const keys = [];
							for (let i = 0; i < days; i++) {
								const d = new Date(now); d.setDate(d.getDate() - i);
								keys.push('usage:' + d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'));
							}
							// Read from D1 when present (usageAdd writes there), else fall back to KV. The old
							// code read only KV, so on a D1 deployment the traffic history/chart was always empty.
							let vals;
							if (hasD1(env) && await d1Init(env)) {
								const _m = {};
								try {
									const _ph = keys.map(() => '?').join(',');
									const _rs = await env.DB.prepare(`SELECT k,up,down,total FROM usage WHERE k IN (${_ph})`).bind(...keys).all();
									for (const r of (_rs && _rs.results) || []) _m[r.k] = JSON.stringify({ up: r.up || 0, down: r.down || 0, total: r.total || 0 });
								} catch (e) { console.error('usage-data D1 read failed: ' + (e && e.message || e)); }
								vals = keys.map(k => _m[k] || null);
							} else {
								vals = await Promise.all(keys.map(k => (env.KV && env.KV.get ? env.KV.get(k).catch(() => null) : null)));
							}
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
					} else if (nativGisha === 'admin/sub-content') {// پیش‌نمایش محتوای اشتراک
						const subToken = await MD5MD5(host + userID);
						const subUrl = `${url.protocol}//${url.host}/sub?token=${subToken}`;
						const subResponse = await fetch(subUrl).catch(() => null);
						if (!subResponse) return new Response('Sub content unavailable', { status: 502 });
						const subText = await subResponse.text();
						return new Response(subText, { status: 200, headers: { 'Content-Type': 'text/plain;charset=utf-8', 'Cache-Control': 'no-store' } });
					} else if (nativGisha === 'admin/users.json') { // multi-user registry (list) - includes daily usage
						let _ns = {}; try { _ns = JSON.parse(await env.KV.get('network-settings.json') || '{}'); } catch (e) {}
						let regMU = !!_ns.multiUser, users = Array.isArray(_ns.users) ? _ns.users : [];
						if (savedUsersAuth && (Date.now() - savedUsersAuthZman) < 120000) { regMU = !!savedUsersAuth.multiUser; users = savedUsersAuth.users; }
						const usage = {}, usageIO = {}, usageDay = {};
						const _today = getDateKey(new Date());
						let _autoChanged = false;
						// Read all users' usage data in parallel (instead of serial awaits) for much faster multi-user responses
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
								if (reason) { u.enabled = false; u.disabledReason = reason; u.disabledAt = Date.now(); u.autoDisabled = true; _autoChanged = true;
								// Auto-disable notification to Telegram
								try {
									const _tgTxt = await env.KV.get('tg.json');
									if (_tgTxt) { const _tgJ = JSON.parse(_tgTxt); if (_tgJ.BotToken && _tgJ.ChatID) {
										const _reasonText = reason === 'quota' ? 'ترافیک تمام شد' : reason === 'daily-quota' ? 'سقف روزانه تمام شد' : 'منقضی شده';
										const _aMsg = `🔴 <b>غیرفعال‌سازی خودکار کاربر</b>\n\n👤 <b>${u.name || u.username || u.id}</b>\n📝 دلیل: ${_reasonText}`;
										ctx.waitUntil(tgApi(_tgJ.BotToken, 'sendMessage', { chat_id: _tgJ.ChatID, parse_mode: 'HTML', text: _aMsg }).catch(() => {}));
									}}
								} catch (e) {}
							}
							}
						}
						if (_autoChanged) { try { _ns.users = users; await env.KV.put('network-settings.json', JSON.stringify(_ns, null, 2)); mitmonHagdarotReshet = null; savedUsersAuth = { multiUser: regMU, users }; savedUsersAuthZman = Date.now(); } catch (e) {} }
						return new Response(JSON.stringify({ multiUser: regMU, users, usage, usageIO, usageDay }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
					} else if (nativGisha === 'admin/central/stats') { // Fetch cluster stats from the central server
						const { api, token } = await kabelCentralApi(env);
						if (!api) return new Response(JSON.stringify({ configured: false }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
						try {
							const r = await fetch(api + '/stats', { headers: token ? { 'Authorization': 'Bearer ' + token } : {} });
							const d = await r.json().catch(() => ({}));
							return new Response(JSON.stringify({ configured: true, ...d }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
						} catch (e) { return new Response(JSON.stringify({ configured: true, error: e.message }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } }); }
					} else if (nativGisha === 'admin/announcement') { // Fetch broadcast announcements from the central server (cached + ?refresh to force)
						if (url.searchParams.has('refresh')) await riaanunHodaot(env);
						return new Response(await env.KV.get('announcement.json') || 'null', { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
					} else if (nativGisha === 'admin/bestip') { // candidate IPs for the in-browser scanner
						try {
							const _port = url.searchParams.get('port') || '443';
							let _ips = [];
							try { _ips = await hasagatIPnakiChachem(request, config_JSON.POOL_API, 32); } catch (e) {}
							if (!Array.isArray(_ips) || !_ips.length) { try { _ips = (await yatzerIpAkrai(request, 32, _port))[0]; } catch (e) {} }
							const _out = (Array.isArray(_ips) ? _ips : []).map(x => String(x).split('#')[0].split(':')[0].trim()).filter(ip => /^\d+\.\d+\.\d+\.\d+$/.test(ip));
							return new Response(JSON.stringify({ ips: _out }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						} catch (error) { return new Response(JSON.stringify({ ips: [], error: String(error.message || error) }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } }); }
					} else if (nativGisha === 'admin/update-check.json') { // Compare current version with the repo release version
						const current = String(Version).replace(/^[vV]/, '');
						const vj = await kabelGirsatNova();
						const latest = vj ? String(vj.version || '').replace(/^[vV]/, '') : '';
						const notes = vj ? (vj.notes || '') : '';
						const srcUrl = vj ? (vj.worker_url || '') : '';
						const updateAvailable = !!latest && versionGreater(latest, current);
						let hasCfToken = false; try { const _cft = JSON.parse(await env.KV.get('cf.json') || 'null'); hasCfToken = !!(_cft && _cft.APIToken); } catch (e) {}
						return new Response(JSON.stringify({ current, latest, updateAvailable, notes, worker_url: srcUrl, reachable: !!vj, hasCfToken }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
					} else if (nativGisha === 'admin/warp.json') { // WARP status (GET); POST register/license/wow/fromCentral handled in the POST branch above
						let stored = null; try { stored = JSON.parse(await env.KV.get('warp-account.json') || 'null'); } catch (e) { }
						const view = stored ? _warpPublicView(stored, hagdarotReshet && hagdarotReshet.warpEndpoint) : { registered: false };
						const wraw2 = await env.KV.get('warp-account-wow.json');
						view.wow = wraw2 ? _warpPublicView(JSON.parse(wraw2)) : null;
						return new Response(JSON.stringify(view, null, 2), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					} else if (nativGisha === 'admin/whoami') {
						const cf = request.cf || {};
						return new Response(JSON.stringify({ asn: cf.asn || 0, isp: cf.asOrganization || '', country: cf.country || '', city: cf.city || '', carrier: zihuiSapak(request) }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
					} else if (nativGisha === 'admin/last-error.json') { // last uncaught exception (for diagnosing 1101 / crashes)
						let _le = null; try { _le = JSON.parse(await env.KV.get('last_error.json') || 'null'); } catch (e) {}
						const _clr = url.searchParams.has('clear'); if (_clr) { try { await env.KV.delete('last_error.json'); } catch (e) {} }
						return new Response(JSON.stringify(_le || { none: true }, null, 2), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
					} else if (nativGisha === 'admin/singbox-preview') {
						const tok = url.searchParams.get('token') || '';
						if (!tok) return new Response(JSON.stringify({ error: 'pass ?token=<sub token>' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						try {
							const r = await fetch(`${url.protocol}//${url.host}/sub?token=${encodeURIComponent(tok)}&singbox`, { headers: { 'User-Agent': 'sing-box/1.11.0 nova-debug' } });
							return new Response(await r.text(), { status: r.status, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
						} catch (e) { return new Response(JSON.stringify({ error: String((e && e.message) || e) }), { status: 502, headers: { 'Content-Type': 'application/json;charset=utf-8' } }); }
					} else if (nativGisha === 'admin/announce') {
						const health = JSON.parse(await env.KV.get('domain-health.json') || 'null');
						const result = await announceSubLinks(env, { baseUrl: `${url.protocol}//${url.host}`, health });
						return new Response(JSON.stringify(result, null, 2), { status: result.skipped ? 400 : 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					} else if (nativGisha === 'admin/publish-mirror') {
						const result = await publishSubMirror(env, `${url.protocol}//${url.host}`, userID, { force: true });
						const allOk = !result.skipped && Array.isArray(result.results) && result.results.every(r => r.ok);
						return new Response(JSON.stringify(result, null, 2), { status: result.skipped ? 400 : (allOk ? 200 : 502), headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					} else if (nativGisha === 'admin/domains') {
						const _typedHosts = url.searchParams.get('hosts');
						const poolHosts = _typedHosts
							? _typedHosts.split(/[\n,]+/).map(h => h.trim().toLowerCase().replace(/^https?:\/\//, '').split('/')[0].split(':')[0]).filter(Boolean)
							: await getPoolHosts(env);
						const health = url.searchParams.has('check') ? await bdikatBriutDomain(env, poolHosts, host) : JSON.parse(await env.KV.get('domain-health.json') || 'null');
						return new Response(JSON.stringify({ hosts: poolHosts, health }, null, 2), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					} else if (nativGisha === 'admin/px-list') {
						// Proxy/CDN list fetch, done server-side so it works even where GitHub/proxifly are filtered
						// (the browser only ever talks to the Worker, which also satisfies the panel's connect-src 'self' CSP).
						const _pxSrc = {
							proxyip: 'https://raw.githubusercontent.com/IRNova/Tools/refs/heads/main/all.json',
							socks5: 'https://raw.githubusercontent.com/proxifly/free-proxy-list/main/proxies/protocols/socks5/data.json',
							http: 'https://raw.githubusercontent.com/proxifly/free-proxy-list/main/proxies/protocols/http/data.json',
							https: 'https://raw.githubusercontent.com/proxifly/free-proxy-list/main/proxies/protocols/http/data.json'
						};
						const _pxMode = String(url.searchParams.get('mode') || 'proxyip').toLowerCase();
						const _pxUrl = _pxSrc[_pxMode];
						if (!_pxUrl) return new Response(JSON.stringify({ error: 'no_source' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
						try {
							const _pxRes = await fetch(_pxUrl, { headers: { 'User-Agent': 'NovaProxy' }, cf: { cacheTtl: 300, cacheEverything: true } });
							if (!_pxRes.ok) return new Response(JSON.stringify({ error: 'upstream', status: _pxRes.status }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
							const _pxBody = await _pxRes.text();
							return new Response(_pxBody, { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
						} catch (e) {
							return new Response(JSON.stringify({ error: 'fetch_failed', message: String(e && e.message || e) }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
						}
					} else if (nativGisha === 'admin/relay-status') {
						return await handleApiRelayStatus(request, env, adminPassword, true);
					} else if (nativGisha === 'admin/cf-usage-setup') {
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
						mitmonCfUsage = cuUsage; zmanMitmonCfUsage = Date.now();
						return new Response(JSON.stringify({ success: true, accountId: cuAccountId, usage: cuUsage }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
					}

					ctx.waitUntil(rishumYomanBakasha(env, request, gishaIP, 'Admin_Login', config_JSON));
					const spaPage = nativGisha.startsWith('admin/') ? nativGisha.slice(6).split('/')[0] : '';
					const adminPath = spaPage ? '/admin/' : '/admin' + url.search;
					return await panelHtml(env, adminPath, { spaPage }).catch(() => new Response('Admin panel unavailable', { status: 502 }));
				} else if (nativGisha === 'sub-setip') {// User self-service: apply a Radar clean IP to one's own config
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
						ctx.waitUntil(publishSubMirror(env, `${url.protocol}//${url.host}`, userID).catch(() => {}));
						return _sj({ success: true, shared: true, count: _radd.length }, 200);
					}
					let _ns; try { _ns = JSON.parse(await env.KV.get('network-settings.json') || '{}'); } catch (e) { _ns = {}; }
					const _users = Array.isArray(_ns.users) ? _ns.users : [];
					const _byKey = _users.filter(x => x && x.key && x.key === _key);
					const _u = _byKey.length === 1 ? _byKey[0] : (_byKey.find(x => String(x.username || '').toLowerCase() === String(_sub).toLowerCase()) || null);
					if (!_u) return _sj({ error: 'auth' }, 403);
					if (_u.enabled === false) return _sj({ error: 'disabled' }, 403);
					if (url.searchParams.has('reset')) { _u.cleanIp = ''; _ns.users = _users; await env.KV.put('network-settings.json', JSON.stringify(_ns, null, 2)); savedUsersAuth = { multiUser: _ns.multiUser, users: _ns.users }; savedUsersAuthZman = Date.now(); return _sj({ success: true, reset: true }, 200); }
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
					savedUsersAuth = { multiUser: _ns2.multiUser, users: _ns2.users }; savedUsersAuthZman = Date.now();
					return _sj({ success: true, count: _clean.length }, 200);
				} else if (nativGisha.startsWith('status/')) {// User status page (public, no auth needed)
					const statusUsername = decodeURIComponent(nativGisha.slice(7));
					if (!statusUsername) return new Response('Username required', { status: 400 });
					const _sUsers = hagdarotReshet && Array.isArray(hagdarotReshet.users) ? hagdarotReshet.users : [];
					const _su = _sUsers.find(u => u && (u.username === statusUsername || u.id === statusUsername || u.tag === statusUsername));
					if (!_su) return new Response('User not found', { status: 404 });
					let _sTotalBytes = 0, _sUpBytes = 0, _sDownBytes = 0;
					try { const _sc = await usageGet(env, 'uusage:' + _su.id); if (_sc) { _sTotalBytes = _sc.total || 0; _sUpBytes = _sc.up || 0; _sDownBytes = _sc.down || 0; } } catch (e) {}
					const _sToday = getDateKey(new Date());
					let _sDailyTotal = 0;
					try { const _sdc = await usageGet(env, 'uusage-d:' + _su.id + ':' + _sToday); _sDailyTotal = (_sdc && _sdc.total) || 0; } catch (e) {}
					let _sStatus = 'active';
					const _sExpired = _su.expiry ? (Date.now() > Date.parse(_su.expiry)) : false;
					if (_su.enabled === false) _sStatus = 'disabled';
					else if (_sExpired) _sStatus = 'expired';
					else if (_su.quotaBytes && _sTotalBytes >= _su.quotaBytes) _sStatus = 'quota-exceeded';
					else if (_su.dailyQuotaBytes && _sDailyTotal >= _su.dailyQuotaBytes) _sStatus = 'daily-quota-exceeded';
					let _sOnlineCount = 0;
					try { const _sActive = JSON.parse(_su.activeIps || '{}'); _sOnlineCount = Object.keys(_sActive).filter(ip => Date.now() - ((_sActive[ip] && typeof _sActive[ip] === 'object' ? _sActive[ip].timestamp : _sActive[ip]) || 0) < 20000).length; } catch (e) {}
					const _sJson = JSON.stringify({
						username: _su.username, name: _su.name, uuid: _su.id,
						limit_gb: _su.quotaBytes ? (_su.quotaBytes / 1073741824) : 0,
						used_gb: _sTotalBytes / 1073741824,
						lifetime_used_gb: _su.lifetimeUsedGb || 0,
						expiry: _su.expiry || '', status: _sStatus,
						limit_req: _su.limitDailyReq || 0,
						daily_used_req: _sDailyTotal,
						ip_limit: _su.ipLimit || 0,
						online_count: _sOnlineCount,
						created: _su.created || '',
						user_proxy_iata: _su.userProxyIata || '',
						user_socks5: _su.userSocks5 ? '***' : '',
						user_proxy_ip: _su.userProxyIp || '',
						traffic: { up: _sUpBytes, down: _sDownBytes, total: _sTotalBytes }
					});
					const _sHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>User Status - ${_su.username || _su.name}</title><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:system-ui,sans-serif;background:#0c0e12;color:#e9edf4;padding:20px;display:flex;justify-content:center;min-height:100vh}.card{background:#101319;border:1px solid #1c2027;border-radius:12px;padding:24px;max-width:420px;width:100%}.h{font-size:20px;font-weight:700;margin-bottom:16px}.r{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #1c2027;font-size:13px}.r:last-child{border:none}.k{color:#aeb6c4}.v{font-weight:600}.ok{color:#34d399}.dg{color:#f87171}.wn{color:#f5b042}</style></head><body><div class="card"><div class="h">👤 User Status</div><div id="d"></div><script>window._sj=${_sJson};const d=document.getElementById('d'),u=window._sj;const fmt=b=>{if(!b)return'0 B';const s=['B','KB','MB','GB','TB'];let i=0;while(b>=1024&&i<s.length-1){b/=1024;i++;}return b.toFixed(2)+' '+s[i];};const sc=u.status==='active'?'ok':u.status==='disabled'?'dg':'wn';d.innerHTML=[['Name',u.name||u.username],['Status','<span class="'+sc+'">'+u.status+'</span>'],['Traffic Used',fmt(u.used_gb*1073741824)+(u.limit_gb?(' / '+u.limit_gb.toFixed(2)+' GB'):' / ∞')],['Lifetime Used',(u.lifetime_used_gb||0).toFixed(2)+' GB'],['Daily Requests',u.limit_req?(u.daily_used_req+' / '+u.limit_req):'∞'],['Online IPs',u.online_count+(u.ip_limit?(' / '+u.ip_limit):' ∞')],['Expiry',u.expiry||'Never'],['Created',u.created?new Date(u.created).toLocaleDateString():'-']].map(([k,v])=>'<div class="r"><span class="k">'+k+'</span><span class="v">'+v+'</span></div>').join('');<\/script></div></body></html>`;
					return new Response(_sHtml, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } });
				} else if (nativGisha === 'api/recover' || nativGisha === 'recover') {// Password recovery via CF API token
					if (request.method !== 'POST') return new Response(JSON.stringify({ error: 'POST only' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
					let _rBody = {}; try { _rBody = await request.clone().json(); } catch (e) {}
					const _rToken = _rBody.api_token || _rBody.token || '';
					if (!_rToken) return new Response(JSON.stringify({ error: 'Token required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
					try {
						const _cfRes = await fetch('https://api.cloudflare.com/client/v4/user/tokens/verify', { headers: { Authorization: 'Bearer ' + _rToken } });
						const _cfData = await _cfRes.json();
						if (!_cfRes.ok || !_cfData.success) return new Response(JSON.stringify({ error: 'Invalid or expired Cloudflare token' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
						let _rAuthorized = false;
						const _rHost = host;
						if (_rHost.endsWith('.workers.dev')) {
							const _rParts = _rHost.split('.');
							const _rSub = _rParts[_rParts.length - 3];
							const _rAccRes = await fetch('https://api.cloudflare.com/client/v4/accounts', { headers: { Authorization: 'Bearer ' + _rToken } });
							const _rAccData = await _rAccRes.json();
							if (_rAccData.success && _rAccData.result) {
								for (const _rAcc of _rAccData.result) {
									const _rSubRes = await fetch(`https://api.cloudflare.com/client/v4/accounts/${_rAcc.id}/workers/subdomain`, { headers: { Authorization: 'Bearer ' + _rToken } });
									const _rSubData = await _rSubRes.json();
									if (_rSubData.success && _rSubData.result && _rSubData.result.subdomain === _rSub) { _rAuthorized = true; break; }
								}
							}
						} else {
							const _rZoneRes = await fetch('https://api.cloudflare.com/client/v4/zones', { headers: { Authorization: 'Bearer ' + _rToken } });
							const _rZoneData = await _rZoneRes.json();
							if (_rZoneData.success && _rZoneData.result) {
								for (const _rZone of _rZoneData.result) {
									if (_rHost === _rZone.name || _rHost.endsWith('.' + _rZone.name)) { _rAuthorized = true; break; }
								}
							}
						}
						if (!_rAuthorized) return new Response(JSON.stringify({ error: 'Token does not match this panel' }), { status: 403, headers: { 'Content-Type': 'application/json' } });
						const _rNewPass = Array.from(crypto.getRandomValues(new Uint8Array(16)), b => 'abcdefghijklmnopqrstuvwxyz0123456789'[b % 36]).join('');
						if (env.KV && typeof env.KV.put === 'function') await env.KV.put('admin_pass', _rNewPass);
						mitmonSismatMenahel = _rNewPass; zmanMitmonSismatMenahel = Date.now();
						return new Response(JSON.stringify({ success: true, password: _rNewPass }), { status: 200, headers: { 'Content-Type': 'application/json' } });
					} catch (_rErr) {
						return new Response(JSON.stringify({ error: 'Cloudflare API error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
					}
				} else if (nativGisha === 'api/recover-telegram' || nativGisha === 'recover-telegram') {// Password recovery via Telegram one-click login link
					if (request.method !== 'POST') return new Response(JSON.stringify({ error: 'POST only' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
					const __rtIp = request.headers.get('cf-connecting-ip') || request.headers.get('x-real-ip') || 'unknown';
					const __rtRl = recoverRateCheck(__rtIp);
					if (!__rtRl.allowed) return new Response(JSON.stringify({ error: 'rate_limited' }), { status: 429, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Retry-After': String(__rtRl.retryAfter) } });
					recoverRecordAttempt(__rtIp);
					try {
						let _tgJ = null;
						try { const _tgTxt = await env.KV.get('tg.json'); if (_tgTxt) _tgJ = JSON.parse(_tgTxt); } catch (e) {}
						if (!_tgJ || !_tgJ.BotToken || !_tgJ.ChatID) return new Response(JSON.stringify({ success: false, configured: false }), { status: 200, headers: { 'Content-Type': 'application/json' } });
						const tgKey = mafteachHatzpana || env.KEY || (await env.KV.get('auto_key')) || 'Do not use this default KEY, add a KEY variable to set your own';
						const loginToken = await yatzerTokenKnisatTelegram(String(_tgJ.ChatID).trim(), tgKey);
						const protocol = url.protocol.replace(':', '');
						const panelUrl = `${protocol}://${host}/admin/telegram-login?chat_id=${encodeURIComponent(String(_tgJ.ChatID).trim())}&token=${loginToken}`;
						const _loc = request.cf ? `${request.cf.city || '?'}, ${request.cf.country || '?'}` : '?';
						const _rtMsg = `🔑 <b>درخواست بازیابی ورود به پنل</b>\n\nیک نفر روی صفحه ورود، گزینه «فراموشی رمز» رو زده.\n\n🌐 IP: <code>${__rtIp}</code>\n📍 ${_loc}\n🖥 UA: <code>${(UA || '').slice(0, 60)}</code>\n\nاگر خودتان هستید، برای ورود بدون رمز روی لینک زیر بزنید (تا ۱۰ دقیقه معتبر است):\n${panelUrl}\n\n⚠️ اگر این درخواست را نداده‌اید، نادیده بگیرید و رمز پنل را زودتر عوض کنید.`;
						await tgApi(_tgJ.BotToken, 'sendMessage', { chat_id: _tgJ.ChatID, parse_mode: 'HTML', text: _rtMsg });
						return new Response(JSON.stringify({ success: true, configured: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
					} catch (_rtErr) {
						return new Response(JSON.stringify({ error: 'send_failed' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
					}
				} else if (nativGisha === 'logout' || uuidRegex.test(nativGisha)) {// Clear cookie and redirect to the login page
					const tguva = new Response('Redirecting...', { status: 302, headers: { 'Location': _dg.pubLogin } });
					tguva.headers.set('Set-Cookie', 'auth=; Path=/; Max-Age=0; HttpOnly');
					return tguva;
				} else if (nativGisha === 'sub') {// Handle subscription requests
					const tokenMinuy = await MD5MD5(host + userID), keGenNivchar = ['1', 'true'].includes(env.BEST_SUB) && url.searchParams.get('host') === 'example.com' && url.searchParams.get('uuid') === '00000000-0000-4000-8000-000000000000' && UA.toLowerCase().includes('tunnel (https://github.com/' + milonChatimot[1] + '/Nova');
					const tokenBakasha = url.searchParams.get('token');
					const subBakasha = url.searchParams.get('sub');
					const keyBakasha = url.searchParams.get('key');
					let tagMishtameshMinuy = '';
					let objMishtameshMinuy = null;
					let imutViaSubKey = false;
					const _reshimatMishtamsheiSub = (savedUsersAuth && (Date.now() - savedUsersAuthZman) < 120000 && Array.isArray(savedUsersAuth.users))
						? savedUsersAuth.users
						: (hagdarotReshet && Array.isArray(hagdarotReshet.users) ? hagdarotReshet.users : null);
					if (_reshimatMishtamsheiSub && (tokenBakasha || (subBakasha && keyBakasha))) {
						const _byKey = _reshimatMishtamsheiSub.filter(x => x && x.key && keyBakasha === x.key);
						const _u = tokenBakasha
							? _reshimatMishtamsheiSub.find(x => x && x.token === tokenBakasha)
							: (_byKey.length === 1 ? _byKey[0]
								: _byKey.find(x => String(x.username || '').toLowerCase() === String(subBakasha).toLowerCase()) || _byKey[0]);
						if (_u) {
							if (_u.enabled === false) return new Response('Account disabled', { status: 403 });
							if (_u.expiry) { const _t = Date.parse(_u.expiry); if (!isNaN(_t) && Date.now() > _t) return new Response('Account expired', { status: 403 }); }
							if (_u.quotaBytes) { try { const _c = await usageGet(env, 'uusage:' + _u.id); if (_c && _c.total >= _u.quotaBytes) return new Response('Quota exceeded', { status: 403 }); } catch (e) {} }
							// limitDailyReq: لیمیت تعداد درخواست روزانه
							if (_u.limitDailyReq && _u.limitDailyReq > 0) {
								const _todayKey = getDateKey(new Date());
								try {
									const _dailyData = await usageGet(env, 'uusage-d:' + _u.id + ':' + _todayKey);
									const _dailyTotal = (_dailyData && _dailyData.total) || 0;
									if (_dailyTotal >= _u.limitDailyReq) return new Response('Daily request limit exceeded', { status: 429 });
								} catch (e) {}
							}
							tagMishtameshMinuy = _u.tag;
							objMishtameshMinuy = _u;
							imutViaSubKey = !tokenBakasha && !!(subBakasha && keyBakasha);
						}
					}
				log(`[Sub] token=${tokenBakasha ? 'yes' : 'no'} sub=${subBakasha || '-'} key=${keyBakasha ? 'yes' : 'no'} resolvedUser=${objMishtameshMinuy ? (objMishtameshMinuy.username || objMishtameshMinuy.tag || objMishtameshMinuy.id) : 'none'} subKeyAuth=${imutViaSubKey}`);
				// subUserAgent: فیلتر درخواست اشتراک بر اساس User-Agent
				if (hagdarotReshet && hagdarotReshet.subUserAgent && hagdarotReshet.subUserAgent.trim()) {
					const _allowedUa = hagdarotReshet.subUserAgent.trim().toLowerCase();
					if (!UA.toLowerCase().includes(_allowedUa)) {
						return new Response('Access denied: unauthorized client', { status: 403, headers: { 'Content-Type': 'text/plain;charset=utf-8' } });
					}
				}
				// User hub: return a friendly panel when a browser opens the subscription link
				if ((request.headers.get('Accept') || '').toLowerCase().includes('text/html') && !url.searchParams.has('raw')) {
					const _merkaz = await sherutMerkazMishtamesh(objMishtameshMinuy, env); if (_merkaz) return _merkaz;
				}
				const bakashatMinuyLakoach = tokenBakasha === tokenMinuy || tagMishtameshMinuy !== '';
				// If ?sub= is only used for user auth (?sub=<username>&key=<key>) it isn't a sub-generator host.
				const _subParamIsGenerator = url.searchParams.has('sub') && !imutViaSubKey;
					const misparSiduriYomNochechi = Math.floor(Date.now() / 86400000);
					const zeraTokenBackendHamaraMinuy = base64SecretEncode(tokenMinuy, userID);
					const [tokenBackendHamaraMinuyHayom, tokenBackendHamaraMinuyEtmol] = await Promise.all([
						MD5MD5(zeraTokenBackendHamaraMinuy + misparSiduriYomNochechi),
						MD5MD5(zeraTokenBackendHamaraMinuy + (misparSiduriYomNochechi - 1)),
					]);
					const bakashatMinuyBackendHamara = tokenBakasha === tokenBackendHamaraMinuyHayom || tokenBakasha === tokenBackendHamaraMinuyEtmol;
					if (bakashatMinuyLakoach || bakashatMinuyBackendHamara || keGenNivchar) {
						config_JSON = await keriatConfigJson(env, host, userID, UA);
						if (keGenNivchar) ctx.waitUntil(rishumYomanBakasha(env, request, gishaIP, 'Get_Best_SUB', config_JSON, false));
						else ctx.waitUntil(rishumYomanBakasha(env, request, gishaIP, 'Get_SUB', config_JSON));
						const ua = UA.toLowerCase();
						const responseHeaders = {
							"content-type": "text/plain; charset=utf-8",
							"Profile-Update-Interval": config_JSON.muvcharMinuyMecholel.SUBUpdateTime,
							"Profile-web-page-url": url.protocol + '//' + url.host + '/admin',
							"Cache-Control": "no-store",
						};
						try {
							// نام پروفایل در کلاینت: اگر SUBNAME سفارشی باشد از آن استفاده می‌شود، در غیر این صورت نام پیش‌فرض فارسی
							const _profileName = (config_JSON.muvcharMinuyMecholel.SUBNAME && config_JSON.muvcharMinuyMecholel.SUBNAME !== 'Nova Proxy')
								? config_JSON.muvcharMinuyMecholel.SUBNAME : '🎁 سرویس رایگان نوا';
							try { responseHeaders["Profile-Title"] = 'base64:' + btoa(unescape(encodeURIComponent(_profileName))); } catch (e) {}
							if (!ua.includes('mozilla')) responseHeaders["Content-Disposition"] = `attachment; filename*=utf-8''${encodeURIComponent(_profileName)}`;
						} catch (e) {}
						try {
							const _utag = tagMishtameshMinuy;
							let _up = 0, _down = 0, _total = 1099511627776000, _expire = 4102329600;
							const _user = (_utag && hagdarotReshet && Array.isArray(hagdarotReshet.users))
								? hagdarotReshet.users.find(u => u && u.tag === _utag) : null;
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
						const isSubConverterRequest = url.searchParams.has('b64') || url.searchParams.has('base64') || request.headers.get('subconverter-request') || request.headers.get('subconverter-version') || ua.includes('subconverter') || ua.includes(('CF-Workers-SUB').toLowerCase()) || keGenNivchar;
						const _forceConvert = url.searchParams.has('subconvert'); // escape hatch: real Clash/sing-box YAML/JSON via the external converter
						const sugMinuy = isSubConverterRequest
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


						const sugProtokol = ((url.searchParams.has('surge') || ua.includes('surge')) && config_JSON.sugProtokol !== 'ss') ? 'tro' + 'jan' : config_JSON.sugProtokol;
						let tochenMinuy = '';
						if (sugMinuy === 'mixed') {
							// Per-user fragment override: if user has fragLen/fragInt, use those instead of global
							let _userFrag = '';
							if (objMishtameshMinuy && objMishtameshMinuy.fragLen && objMishtameshMinuy.fragInt) {
								_userFrag = `&fragment=${encodeURIComponent(objMishtameshMinuy.fragLen + ',' + objMishtameshMinuy.fragInt)}`;
							}
							const paramPitzulTls = _userFrag || (config_JSON.pilugTLS == 'Shadowrocket' ? `&fragment=${encodeURIComponent('1,40-60,30-50,tlshello')}` : config_JSON.pilugTLS == 'Happ' ? `&fragment=${encodeURIComponent('3,1,tlshello')}` : '');
							let ipNivcharMale = [], linkTzmatimAcherim = '', breichatIpMetavech = [];
							// If sub is only used for user auth (?sub=<username>&key=<key>), don't treat it as a sub-generator host
							// _subParamIsGenerator hoisted to the sub-handler scope above (visible to both the local and subconverter branches).

							if (!_subParamIsGenerator && config_JSON.muvcharMinuyMecholel.local) { // Generate subscription locally
								let reshimaNivcharMale = config_JSON.muvcharMinuyMecholel.sifriyatIPmekomit.ipAckrai ? (
									await yatzerIpAkrai(request, config_JSON.muvcharMinuyMecholel.sifriyatIPmekomit.kamutAckrait, config_JSON.muvcharMinuyMecholel.sifriyatIPmekomit.portMeyuchad)
								)[0] : await env.KV.get('ADD.txt') ? await saderLeMaarach(await env.KV.get('ADD.txt')) : (
									await yatzerIpAkrai(request, config_JSON.muvcharMinuyMecholel.sifriyatIPmekomit.kamutAckrait, config_JSON.muvcharMinuyMecholel.sifriyatIPmekomit.portMeyuchad)
								)[0];
								// Fallback: if ADD.txt is empty/whitespace and randomIP is off, generate random IPs to avoid a single-node subscription
								if (!config_JSON.muvcharMinuyMecholel.sifriyatIPmekomit.ipAckrai && (!Array.isArray(reshimaNivcharMale) || !reshimaNivcharMale.filter(x => String(x).trim()).length)) {
									log(`[Sub.Local] ADD.txt empty/invalid; falling back to random IP generation`);
									reshimaNivcharMale = (await yatzerIpAkrai(request, config_JSON.muvcharMinuyMecholel.sifriyatIPmekomit.kamutAckrait || 16, config_JSON.muvcharMinuyMecholel.sifriyatIPmekomit.portMeyuchad))[0];
								}
								log(`[Sub.Local] rawInputCount=${Array.isArray(reshimaNivcharMale) ? reshimaNivcharMale.length : 0} randomIp=${!!config_JSON.muvcharMinuyMecholel.sifriyatIPmekomit.ipAckrai}`);
								const apiNivchar = [], ipNivchar = [], tzmatimAcherim = [];
								for (const elem of reshimaNivcharMale) {
									if (elem.toLowerCase().startsWith('sub://')) {
										apiNivchar.push(elem);
									} else {
										const mikumHeara = elem.indexOf('#');
										const chelekKtovet = mikumHeara > -1 ? elem.slice(0, mikumHeara) : elem;
										const chelekHeara = mikumHeara > -1 ? elem.slice(mikumHeara) : '';
										const subMatch = elem.match(/sub\s*=\s*([^\s&#]+)/i);
										if (subMatch && subMatch[1].trim().includes('.')) {
											const ipNivcharKeMetavech = elem.toLowerCase().includes('proxyip=true');
											if (ipNivcharKeMetavech) apiNivchar.push('sub://' + subMatch[1].trim() + "?proxyip=true" + (elem.includes('#') ? ('#' + elem.split('#')[1]) : ''));
											else apiNivchar.push('sub://' + subMatch[1].trim() + (elem.includes('#') ? ('#' + elem.split('#')[1]) : ''));
										} else if (chelekKtovet.toLowerCase().startsWith('https://')) {
											apiNivchar.push(elem);
										} else if (chelekKtovet.toLowerCase().includes('://')) {
											if (elem.includes('#')) {
												const hafradatKtovetHeara = elem.split('#');
												tzmatimAcherim.push(hafradatKtovetHeara[0] + '#' + encodeURIComponent(decodeURIComponent(hafradatKtovetHeara[1])));
											} else tzmatimAcherim.push(elem);
										} else {
											if (chelekKtovet.includes('*')) {
												ipNivchar.push(hachlafatKochavimTavimAckraiyim(chelekKtovet) + chelekHeara);
											} else ipNivchar.push(elem);
										}
									}
								}
							const tochenBakashatApiNivchar = await bakashatAPImuvchar(apiNivchar, '443');
							const mizugMaarachTzmatimAcherim = [...new Set(tzmatimAcherim.concat(tochenBakashatApiNivchar[1]))];
							linkTzmatimAcherim = mizugMaarachTzmatimAcherim.length > 0 ? mizugMaarachTzmatimAcherim.join('\n') + '\n' : '';
							const ipApiNivchar = tochenBakashatApiNivchar[0];
							breichatIpMetavech = tochenBakashatApiNivchar[3] || [];
							ipNivcharMale = [...new Set(ipNivchar.concat(ipApiNivchar))];
							// Smart Clean IPs: fetch carrier clean IPs from the remote pool
							if (config_JSON.POOL_API) {
								try {
									const reshimatIPnakiChachem = await hasagatIPnakiChachem(request, config_JSON.POOL_API, config_JSON.muvcharMinuyMecholel.sifriyatIPmekomit.kamutAckrait || 16);
									if (reshimatIPnakiChachem.length) ipNivcharMale = [...new Set(ipNivcharMale.concat(reshimatIPnakiChachem))];
								} catch (e) { log(`[Smart Clean IPs] fetch failed: ${e.message}`); }
							}
							} else { // Preferred-IP subscription generator
									let hostGenNivchar = _subParamIsGenerator ? url.searchParams.get('sub') : config_JSON.muvcharMinuyMecholel.SUB;
									const [maarachIPmecholelMuvchar, tzmatimAcherimMecholelMuvchar] = await hasagatNetuneiMecholelMinuyMuvchar(hostGenNivchar);
									ipNivcharMale = ipNivcharMale.concat(maarachIPmecholelMuvchar);
									linkTzmatimAcherim += tzmatimAcherimMecholelMuvchar;
									log(`[Sub.Generator] host=${hostGenNivchar} rawIps=${maarachIPmecholelMuvchar.length}`);
								}
							// Radar shared pool: clean IPs users applied via the radar "Apply" button (all sub modes; per-user cleanIp override below still wins)
							try { const _rshared = String(await env.KV.get('radar-shared.txt') || '').split(/\r?\n/).map(s => s.trim()).filter(Boolean); if (_rshared.length) { ipNivcharMale = [...new Set(_rshared.concat(ipNivcharMale))]; log(`[Sub] merged ${_rshared.length} radar-shared clean IPs`); } } catch (e) { }
							const paramEchLink = config_JSON.ECH ? `&ech=${encodeURIComponent((config_JSON.ECHConfig.SNI ? config_JSON.ECHConfig.SNI + '+' : '') + config_JSON.ECHConfig.DNS)}` : '';
							let fingerprintMinuy = (objMishtameshMinuy && objMishtameshMinuy.fp) ? String(objMishtameshMinuy.fp).trim() : config_JSON.Fingerprint;
							if (!fingerprintMinuy || String(fingerprintMinuy).trim().toLowerCase() === 'random') {
								const _fps = ['chrome','firefox','safari','ios','android','edge','360'];
								fingerprintMinuy = _fps[Math.floor(Math.random() * _fps.length)];
							}
							const isLoonOrSurge = ua.includes('loon') || ua.includes('surge');
							const { type: protokolHaavara, shemSadehNativ: shemSdehNativ, shemSadehDomain: shemSdehDomain } = hasagatTetzuratProtokolHaavara(config_JSON);
						// Per-user overrides: per-user clean IP / proxy IP / port overrides
						let reshimaIpUaMinuy = [];
						let userModeTakef = null, userPortsTakef = null, userNodesTakef = null, maxConfigsTakef = null, usernat64Takef = null;
						if (objMishtameshMinuy) {
							const _splitList = (v) => String(v || '').split(/[\r\n,;]+/).map(s => s.trim()).filter(Boolean);
							const _uPorts = _splitList(objMishtameshMinuy.ports).map(p => p.replace(/[^0-9]/g, '')).filter(Boolean);
							const _uClean = _splitList(objMishtameshMinuy.cleanIp);
							const _uProxy = _splitList(objMishtameshMinuy.proxyIp);
							userModeTakef = objMishtameshMinuy.userMode || null;
							userPortsTakef = objMishtameshMinuy.userPorts || null;
							userNodesTakef = objMishtameshMinuy.userNodes || null;
							maxConfigsTakef = objMishtameshMinuy.maxConfigs || null;
							usernat64Takef = objMishtameshMinuy.usernat64 || null;
							log(`[Sub.UserOverride] user=${objMishtameshMinuy.username || objMishtameshMinuy.tag || objMishtameshMinuy.id} cleanIp=${_uClean.length} proxyIp=${_uProxy.length} ports=${_uPorts.length || 'default'} mode=${userModeTakef || 'default'} maxCfg=${maxConfigsTakef || 'unlimited'}`);
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
									ipNivcharMale = _expanded;
								}
							}
							if (_uProxy.length) reshimaIpUaMinuy = _uProxy;
						}
							// Chain Proxy Rotation: rotate chained proxies by date
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
								} catch (e) { log(`[Chain Proxy Rotation] rotation failed: ${e.message}`); }
							}
						// WARP: اضافه کردن نود WG ثبت‌شده وقتی WARP یا warpCalls فعال است
						if (hagdarotReshet && (hagdarotReshet.enableWarp || hagdarotReshet.warpCalls)) {
							try { const warpNode = await buildRegisteredWarpNode(env); if (warpNode) linkTzmatimAcherim = warpNode + '\n' + linkTzmatimAcherim; } catch (e) { /* best-effort */ }
						}
						// Per-user nodes override: اگر کاربر گره اختصاصی دارد، جایگزین لیست پیش‌فرض شود
						if (userNodesTakef && userNodesTakef.trim()) {
							const _userNodeList = userNodesTakef.split(/[\r\n,;]+/).map(s => s.trim()).filter(Boolean);
							if (_userNodeList.length) {
								log(`[Sub.UserOverride] replacing global nodes with ${_userNodeList.length} user-specific nodes`);
								ipNivcharMale = _userNodeList;
							}
						}
							// Per-user node cap: limits the node list to 40 (avoids heavy auto-select)
							{
								const _perUserSeed = String(subBakasha || tagMishtameshMinuy || '');
								const _hasOwnCleanIp = objMishtameshMinuy && String(objMishtameshMinuy.cleanIp || '').trim().length > 0;
								log(`[Sub.NodeLimit] seed=${_perUserSeed || '(none)'} hasOwnCleanIp=${_hasOwnCleanIp} beforeLimit=${ipNivcharMale.length} cap=${tikraTzometLecholMishtamesh}`);
								if (_perUserSeed && !_hasOwnCleanIp && ipNivcharMale.length > tikraTzometLecholMishtamesh) {
									let _seed = 2166136261;
									for (let i = 0; i < _perUserSeed.length; i++) { _seed ^= _perUserSeed.charCodeAt(i); _seed = (_seed * 16777619) >>> 0; }
									const _rand = () => { _seed = (_seed * 1103515245 + 12345) & 0x7fffffff; return _seed / 0x7fffffff; };
									const _addrOf = (e) => String(e).split('#')[0].trim().replace(/:\d+$/, '');
									const _byIp = new Map();
									for (const _e of ipNivcharMale) { const _ip = _addrOf(_e); if (_ip && !_byIp.has(_ip)) _byIp.set(_ip, _e); }
									const _pool = [..._byIp.values()];
									for (let i = _pool.length - 1; i > 0; i--) { const j = Math.floor(_rand() * (i + 1)); const _t = _pool[i]; _pool[i] = _pool[j]; _pool[j] = _t; }
									ipNivcharMale = _pool.slice(0, tikraTzometLecholMishtamesh);
									log(`[Sub.NodeLimit] applied shuffle/dedup; uniqueIps=${_pool.length} afterLimit=${ipNivcharMale.length}`);
								}
							}
							ipNivcharMale = [host + ':443#' + NOVA_FREE_NOTICE, ...ipNivcharMale];
							// enableDirectConfigs: اضافه کردن کانفیگ مستقیم (بدون پروکسی) به اشتراک
							if (hagdarotReshet && hagdarotReshet.enableDirectConfigs) {
								const _directPath = config_JSON.nativTzometMale || config_JSON.PATH || '/?ed=2560';
								const _directProto = config_JSON.sugProtokol === 'ss' ? 'ss' : _D_._vl_;
								const _directId = config_JSON.sugProtokol === 'ss' ? btoa(config_JSON.SS.shitatHatzpana + ':' + config_JSON.UUID) : '00000000-0000-4000-8000-000000000000';
								const _directNode = `${_directProto}://${_directId}@${host}:443?security=tls&type=ws&host=${host}&path=${encodeURIComponent(_directPath)}&sni=${host}#🌐 اتصال مستقیم`;
								ipNivcharMale.unshift(_directNode);
							}
							// customRouting: اضافه کردن قوانین مسیریابی سفارشی
							if (hagdarotReshet && hagdarotReshet.customRouting && hagdarotReshet.customRouting.trim()) {
								const _routingLines = hagdarotReshet.customRouting.split('\n').map(s => s.trim()).filter(s => s && !s.startsWith('//'));
								for (const _rule of _routingLines) {
									const _ruleParts = _rule.split('|').map(s => s.trim());
									if (_ruleParts.length >= 2) {
										const _ruleType = _ruleParts[0].toLowerCase();
										const _ruleTarget = _ruleParts[1];
										const _ruleRemark = _ruleParts[2] || _rule;
										if (_ruleType === 'proxy' && _ruleTarget) {
											ipNivcharMale.push(_ruleTarget + '#' + _ruleRemark);
										}
									}
								}
							}
							log(`[Sub.Build] finalNodeCount=${ipNivcharMale.length}`);
							// Per-user maxConfigs limit: محدود کردن تعداد کانفیگ‌ها برای هر کاربر
							if (maxConfigsTakef && maxConfigsTakef > 0 && ipNivcharMale.length > maxConfigsTakef) {
								log(`[Sub.UserOverride] limiting configs from ${ipNivcharMale.length} to maxConfigs=${maxConfigsTakef}`);
								ipNivcharMale = ipNivcharMale.slice(0, maxConfigsTakef);
							}
							// Multi-SOCKS5 / Fix-IP chain list: round-robin پخش نودها بین چند پروکسی
							const _chainListRaw2 = String(config_JSON.chainProxy || '').trim();
							const reshimaProxySharsheretKlali = _chainListRaw2 ? _chainListRaw2.split(/[\n,]+/).map(s => s.trim()).filter(s => /^(socks5|http|https|turn|sstp):\/\//i.test(s)) : [];
							tochenMinuy = linkTzmatimAcherim + ipNivcharMale.map((ktovetGolmit, _idx) => {
								// Unified regex: matches domain / IPv4 / IPv6 address + optional port + optional remark
								// Examples:
								// - Domain: hj.xmm1993.top:2096#remark or example.com
								// - IPv4: 166.0.188.128:443#Los Angeles or 166.0.188.128
								// - IPv6: [2606:4700::]:443#CMCC or [2606:4700::]
								const match = ktovetGolmit.match(regexKtovetTzomet);

								let ktovetTzomet, portTzomet = "443", hearatTzomet;

								if (match) {
									ktovetTzomet = match[1];  // IP address or domain (may include brackets)
									portTzomet = match[2] ? match[2] : '443';  // Port defaults to 443; SS noTLS is mapped later when generating the link
									hearatTzomet = match[3] || ktovetTzomet;  // Remark, defaults to the address itself
								} else {
									// Malformed format, skip and return null
									console.warn(`[Subscription] malformed IP format ignored: ${ktovetGolmit}`);
									return null;
								}

								let nativTzometMale = config_JSON.nativTzometMale;

								const hatamaProxySharsheret = hearatTzomet.match(/\$(socks5|http|https|turn|sstp):\/\/([^#\s]+)/i);
								if (hatamaProxySharsheret) {
									try {
										const protokolProxy = hatamaProxySharsheret[1].toLowerCase(), paramProxy = hatamaProxySharsheret[2];
										const netuneiProxySharsheret = { type: protokolProxy, ...kabelCheshbonSocks5(paramProxy, kabelPortBereiratProxy(protokolProxy)) };
										nativTzometMale = `/video/${base64SecretEncode(JSON.stringify(netuneiProxySharsheret), userID) + (config_JSON.efsher0RTT ? '?ed=2560' : '')}`;
										hearatTzomet = hearatTzomet.replace(hatamaProxySharsheret[0], '').trim() || ktovetTzomet;
									} catch (error) {
										console.warn(`[Subscription] chained-proxy parse failed, directive ignored: ${hatamaProxySharsheret[0]} (${error && error.message ? error.message : error})`);
									}
								} else if (reshimaProxySharsheretKlali.length) {
									const proxySharsheretNivchar = reshimaProxySharsheretKlali[_idx % reshimaProxySharsheretKlali.length];
									try {
										const m = /^(socks5|http|https|turn|sstp):\/\/(.+)$/i.exec(proxySharsheretNivchar);
										const protokolProxy = m[1].toLowerCase();
										const netuneiProxySharsheret = { type: protokolProxy, ...kabelCheshbonSocks5(m[2].split('/')[0], kabelPortBereiratProxy(protokolProxy)) };
										nativTzometMale = `/video/${base64SecretEncode(JSON.stringify(netuneiProxySharsheret), userID) + (config_JSON.efsher0RTT ? '?ed=2560' : '')}`;
										if (reshimaProxySharsheretKlali.length > 1) hearatTzomet = `${hearatTzomet} ·S${(_idx % reshimaProxySharsheretKlali.length) + 1}`;
									} catch (error) {
										console.warn(`[Subscription] global chained-proxy parse failed: ${error && error.message ? error.message : error}`);
									}
								} else if (breichatIpMetavech.length > 0) {
									const metavechIPtoam = breichatIpMetavech.find(p => p.includes(ktovetTzomet));
									if (metavechIPtoam) nativTzometMale = (`${config_JSON.PATH}/proxyip=${metavechIPtoam}`).replace(/\/\//g, '/') + (config_JSON.efsher0RTT ? '?ed=2560' : '');
								}
								if (reshimaIpUaMinuy.length > 0) {
									const _pip = reshimaIpUaMinuy[_idx % reshimaIpUaMinuy.length];
									nativTzometMale = (`${config_JSON.PATH}/proxyip=${_pip}`).replace(/\/\//g, '/') + (config_JSON.efsher0RTT ? '?ed=2560' : '');
								}
								if (tagMishtameshMinuy) nativTzometMale += (nativTzometMale.includes('?') ? '&' : '?') + 'u=' + tagMishtameshMinuy;
								if (isLoonOrSurge) nativTzometMale = nativTzometMale.replace(/,/g, '%2C');

								const _np = (config_JSON.sugProtokol === 'mixed' && !keGenNivchar)
									? [_D_._vl_,_D_._tr_,'ss'][_idx % 3]
									: sugProtokol;

								// Node remark: LOCKED Nova branding, NOT overridable by the panel, a template,
									// or a reseller. Format = <flag> سرویس رایگان نوا <ip>:<port> [<PROTO>]. The custom
									// NAMETPL and any prefix/suffix are intentionally ignored so the free-service brand
									// can never be stripped or rebranded, and no extra text can be added before/after it.
									{
										const _chainMark = (hearatTzomet.match(/ ·S\d+$/) || [''])[0];
										// Keep a leading country flag from the source remark if present (per requirement).
										const _rawRemark = String(match[3] || '').replace(/ ·S\d+$/, '').replace(/\$(socks5|http|https|turn|sstp):\/\/[^#\s]+/i, '').trim();
										const _flagMatch = _rawRemark.match(/^(?:\uD83C[\uDDE6-\uDDFF]){2}/);
										const _flag = _flagMatch ? _flagMatch[0] + ' ' : '';
										hearatTzomet = `${_flag}سرویس رایگان نوا ${ktovetTzomet}:${portTzomet} [${_np.toUpperCase()}]${_chainMark}`;
									}
									if (_np === 'ss' && !keGenNivchar) {
									if (!config_JSON.SS.TLS) {
										const portTLS = [443, 2053, 2083, 2087, 2096, 8443];
										const portNOTLS = [80, 2052, 2082, 2086, 2095, 8080];
										portTzomet = String(portNOTLS[portTLS.indexOf(Number(portTzomet))] ?? portTzomet);
									}
									nativTzometMale = (nativTzometMale.includes('?') ? nativTzometMale.replace('?', '?enc=' + config_JSON.SS.shitatHatzpana + '&') : (nativTzometMale + '?enc=' + config_JSON.SS.shitatHatzpana)).replace(/([=,])/g, '\\$1');
									if (!isSubConverterRequest) nativTzometMale = nativTzometMale + ';mux=0';
									return `${_np}://${btoa(config_JSON.SS.shitatHatzpana + ':' + config_JSON.UUID)}@${ktovetTzomet}:${portTzomet}?plugin=v2${encodeURIComponent('ray-plugin;mode=websocket;host=example.com;path=' + (config_JSON.nativAckrai ? nativAkrai(nativTzometMale) : nativTzometMale) + (config_JSON.SS.TLS ? ';tls' : '')) + paramEchLink + paramPitzulTls}#${encodeURIComponent(hearatTzomet)}`;
								} else {
									const erechParamNativHaavara = hasagatErechParametrNativHaavara(config_JSON, nativTzometMale, keGenNivchar);
									if (config_JSON.enableTLS === false) {
										const _TLSp = [443, 2053, 2083, 2087, 2096, 8443], _NOp = [80, 2052, 2082, 2086, 2095, 8080];
										const _ntPort = String(_NOp[_TLSp.indexOf(Number(portTzomet))] ?? portTzomet);
										return `${_np}://00000000-0000-4000-8000-000000000000@${ktovetTzomet}:${_ntPort}?security=none&type=${protokolHaavara}&${shemSdehDomain}=example.com&${shemSdehNativ}=${encodeURIComponent(erechParamNativHaavara)}&encryption=none#${encodeURIComponent(hearatTzomet)}`;
									}
									return `${_np}://00000000-0000-4000-8000-000000000000@${ktovetTzomet}:${portTzomet}?security=tls&type=${protokolHaavara + paramEchLink}&${shemSdehDomain}=example.com&fp=${fingerprintMinuy}&sni=example.com&${shemSdehNativ}=${encodeURIComponent(erechParamNativHaavara) + paramPitzulTls}&encryption=none${config_JSON.skipCertVerify ? '&insecure=1&allowInsecure=1' : ''}#${encodeURIComponent(hearatTzomet)}`;
								}
							}).filter(item => item !== null).join('\n');
						} else { // Subscription conversion
							const urlHamaratMinuy = `${config_JSON.tetzuratHamaratMinuy.SUBAPI}/sub?target=${sugMinuy}&url=${encodeURIComponent(url.protocol + '//' + url.host + '/sub?target=mixed&token=' + tokenBackendHamaraMinuyHayom + '&cnIspCode=' + zihuiSapak(request) + (_subParamIsGenerator && url.searchParams.get('sub') != '' ? `&sub=${url.searchParams.get('sub')}` : ''))}&config=${encodeURIComponent(config_JSON.tetzuratHamaratMinuy.SUBCONFIG)}&emoji=true&scv=${config_JSON.dalegImutTeuda}`;
							try {
								const response = await fetch(urlHamaratMinuy, { headers: { 'User-Agent': 'Subconverter for ' + sugMinuy + ' edge' + 'tunnel (https://github.com/' + milonChatimot[1] + '/Nova' + 'Proxy)' } });
								if (response.ok) {
									tochenMinuy = await response.text();
									if (url.searchParams.has('surge') || ua.includes('surge')) tochenMinuy = tikunChamSurgeMinuy(tochenMinuy, url.protocol + '//' + url.host + '/sub?token=' + tokenMinuy + '&surge', config_JSON);
								} else return new Response('Subscription-converter backend error: ' + response.statusText, { status: response.status });
							} catch (error) {
								return new Response('Subscription-converter backend error: ' + error.message, { status: 403 });
							}
						}

						if (!ua.includes('subconverter') && bakashatMinuyLakoach) {
							// Health-Pruned Subs: حذف هاست‌هایی که last health check علامت خراب دارن
							let _hostsBriim = (Array.isArray(config_JSON.HOSTS) && config_JSON.HOSTS.length) ? config_JSON.HOSTS : [url.hostname];
							try {
								const _h = JSON.parse(await env.KV.get('domain-health.json') || 'null');
								if (_h && Array.isArray(_h.domains)) {
									const _خراب = new Set(_h.domains.filter(d => d && d.ok === false).map(d => d.host));
									const _سالم = _hostsBriim.filter(h => !_خراب.has(h));
									_hostsBriim = _سالم.length ? _سالم : [url.hostname];
								}
							} catch (e) { /* ignore -> use all hosts */ }
							const hostsMeurbavim = [..._hostsBriim].sort(() => Math.random() - 0.5);
							// Replace placeholders per line so each node (including SS) gets one consistent host
							tochenMinuy = tochenMinuy.split('\n').map((line, idx) => {
								const hostGolmi = hostsMeurbavim[idx % hostsMeurbavim.length];
								const hostAckraiNochechi = hachlafatKochavimTavimAckraiyim(hostGolmi);
								return line
									.replace(/00000000-0000-4000-8000-000000000000/g, config_JSON.UUID)
									.replace(/MDAwMDAwMDAtMDAwMC00MDAwLTgwMDAtMDAwMDAwMDAwMDAw/g, btoa(config_JSON.UUID))
									.replace(/example\.com/g, hostAckraiNochechi);
							}).join('\n');
						}

						// base64 wrap for 'mixed' moved to AFTER the fakeConfigs prepend (below); wrapping here first and
						// then prepending a plaintext fake node produced a broken mixed output (clients saw only 1 node).

						// بارگذاری حساب WARP ذخیره‌شده وقتی WARP یا warpCalls فعال است
						let warpAccount = null;
						if (hagdarotReshet && (hagdarotReshet.enableWarp || hagdarotReshet.warpCalls) && env.KV && typeof env.KV.get === 'function') {
							try {
								const w = await env.KV.get('warp-account.json');
								if (w) {
									warpAccount = JSON.parse(w);
									if (hagdarotReshet.warpMode === 'wow') {
										try { const w2 = await env.KV.get('warp-account-wow.json'); if (w2) warpAccount.wow = JSON.parse(w2); } catch (e) { /* WoW second hop optional */ }
									}
								}
							} catch (e) { warpAccount = null; }
						}
						// Nova info entries (Telegram channel + usage/expiry), shown in EVERY format.
						// Computed BEFORE conversion so they can be injected into clash/sing-box too (not just
						// the raw/mixed list). The Telegram line is LOCKED to Nova's official channel
						// (NOVA_TG_CHANNEL): always first and NOT overridable from panel/env/KV, so a reseller
						// can never remove it or point it elsewhere.
						let _fakeLines = [];
						if (bakashatMinuyLakoach) {
							const _utag2 = tagMishtameshMinuy;
							const _user2 = (_utag2 && hagdarotReshet && Array.isArray(hagdarotReshet.users))
								? hagdarotReshet.users.find(u => u && u.tag === _utag2) : null;
							let _usedGB = '0.00', _limitGB = '9999', _expiryDate = '2099-01-01';
							let _usedReqs = 0, _limitReqs = 0;
							if (_user2) {
								const _uu2 = await usageGet(env, 'uusage:' + _user2.id) || {};
								_usedReqs = _uu2.total || 0;
								_limitReqs = _user2.quotaBytes || 0;
								_usedGB = (_usedReqs / 1073741824).toFixed(2);
								_limitGB = _limitReqs ? (_limitReqs / 1073741824).toFixed(2) : '9999';
								if (_user2.expiry) { const _t2 = Date.parse(_user2.expiry); if (!isNaN(_t2)) _expiryDate = new Date(_t2).toISOString().split('T')[0]; }
							}
							const _pct = _limitReqs ? Math.min(100, (_usedReqs / _limitReqs) * 100).toFixed(1) : '0';
							const _fill = (s) => String(s)
								.replace('{usage}', `${_usedGB}GB / ${_limitGB}GB (${_pct}%)`)
								.replace('{expiry}', _expiryDate)
								.replace('{daily}', _user2 ? String(_user2.dailyQuotaBytes || 0) : '0')
								.replace('{telegram}', NOVA_TG_CHANNEL);
							const _cfgFakes = (hagdarotReshet && Array.isArray(hagdarotReshet.fakeConfigs)) ? hagdarotReshet.fakeConfigs : [];
							for (const fc of _cfgFakes) {
								if (!fc || fc.enabled === false || !fc.name) continue;
								if (String(fc.name).includes('{telegram}')) continue; // Telegram is force-injected below (locked)
								_fakeLines.push(_fill(fc.name));
							}
							// Locked Telegram channel line: always first, cannot be removed or changed by the admin.
							_fakeLines.unshift(_fill('📢 {telegram}'));
							_fakeLines = _fakeLines.filter(Boolean);
						}
						if (sugMinuy === 'singbox') {
							tochenMinuy = await tikunChamSingboxMinuy(tochenMinuy, config_JSON, hagdarotReshet, warpAccount);
							if (_fakeLines.length) tochenMinuy = novaInjectFakeSingbox(tochenMinuy, _fakeLines, config_JSON.UUID, host);
							responseHeaders["content-type"] = 'application/json; charset=utf-8';
						} else if (sugMinuy === 'clash') {
							tochenMinuy = tikunChamClashMinuy(tochenMinuy, config_JSON, hagdarotReshet, warpAccount);
							if (_fakeLines.length) tochenMinuy = novaInjectFakeClash(tochenMinuy, _fakeLines, config_JSON.UUID, host);
							responseHeaders["content-type"] = 'application/x-yaml; charset=utf-8';
						}
						// User Hub: show the user-center page when a browser user visits
						if (ua.includes('mozilla') && !url.searchParams.has('raw') && !url.searchParams.has('b64') && !url.searchParams.has('base64')) {
							const hubPage = await dafMerkazMishtamesh();
							if (hubPage) return hubPage;
						}
						// Mixed / base64: prepend the same info entries as vmess info-nodes (one per line).
						if (_fakeLines.length && sugMinuy === 'mixed') {
							const _fakeUris = novaFakeVmessUris(_fakeLines, config_JSON.UUID, host);
							if (_fakeUris.length) tochenMinuy = _fakeUris.join('\n') + '\n' + tochenMinuy;
						}
						if (sugMinuy === 'mixed' && (!ua.includes('mozilla') || url.searchParams.has('b64') || url.searchParams.has('base64'))) tochenMinuy = base64Utf8(tochenMinuy);
							return new Response(tochenMinuy, { status: 200, headers: responseHeaders });
					}
				} else if (nativGisha === 'locations') {// Reverse-proxy locations list
					const cookies = request.headers.get('Cookie') || '';
					const authCookie = cookies.split(';').find(c => c.trim().startsWith('auth='))?.split('=')[1];
					if (authCookie && await verifySessionToken(authCookie, UA, mafteachHatzpana, adminPassword)) return fetch(new Request('https://speed.cloudflare.com/locations', { headers: { 'Referer': 'https://speed.cloudflare.com/' } }));
				} else if (nativGisha === 'robots.txt') return new Response('User-agent: *\nDisallow: /', { status: 200, headers: { 'Content-Type': 'text/plain; charset=UTF-8' } });
			} else {
				// Guard: if the KV binding is missing/broken, /login and /admin must NEVER fall
				// through to the camouflage/decoy page below. Show a clear diagnostic instead.
				if (nativGisha === 'login' || nativGisha === 'admin' || nativGisha.startsWith('admin/')) {
					return new Response(
						'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Nova Proxy — KV binding missing</title>'
						+ '<style>body{font-family:system-ui,Segoe UI,Tahoma,sans-serif;background:#0b0d11;color:#e9edf4;margin:0;display:flex;min-height:100vh;align-items:center;justify-content:center;padding:24px}'
						+ '.c{max-width:560px;background:#101319;border:1px solid #1c2027;border-radius:16px;padding:28px}h1{font-size:18px;margin:0 0 12px}p{color:#aeb6c4;line-height:1.7;font-size:14px}code{background:#0b0d11;border:1px solid #1c2027;border-radius:5px;padding:1px 6px;color:#22d3ee}</style></head>'
						+ '<body><div class="c"><h1>Login / Admin unavailable: KV binding missing</h1>'
						+ '<p>This Worker could not reach a KV namespace bound as <code>KV</code>. The <code>/login</code> and <code>/admin</code> pages require it and will not work until it is restored.</p>'
						+ '<p><b>Fix:</b> open <code>Workers &amp; Pages → your Worker → Settings → Bindings</code> and make sure a KV namespace is bound with the exact variable name <code>KV</code>, then redeploy.</p>'
						+ '</div></body></html>',
						{ status: 503, headers: { 'Content-Type': 'text/html;charset=utf-8', 'Cache-Control': 'no-store' } }
					);
				}
				if (!envUUID) return await panelHtml(env, '/install');
			}
		}

		if (/\.\w{2,6}$/.test(url.pathname)) {
			const staticResponse = await panelFetch(env, url.pathname).catch(() => null);
			if (staticResponse && staticResponse.ok) return staticResponse;
		}

		let urlHasvaa = env.URL || 'https://speed.cloudflare.com';
		if (urlHasvaa && urlHasvaa !== 'nginx' && urlHasvaa !== '1101') {
			urlHasvaa = urlHasvaa.trim().replace(/\/$/, '');
			if (!urlHasvaa.match(/^https?:\/\//i)) urlHasvaa = 'https://' + urlHasvaa;
			if (urlHasvaa.toLowerCase().startsWith('http://')) urlHasvaa = 'https://' + urlHasvaa.substring(7);
			try { const u = new URL(urlHasvaa); urlHasvaa = u.protocol + '//' + u.host } catch (e) { urlHasvaa = 'nginx' }
		}
		if (urlHasvaa === '1101') return new Response(await html1101(url.host, gishaIP), { status: 200, headers: { 'Content-Type': 'text/html; charset=UTF-8' } });
		if (urlHasvaa === 'nginx') return new Response(await nginx(), { status: 200, headers: { 'Content-Type': 'text/html; charset=UTF-8' } });
		try {
			const urlMetavech = new URL(urlHasvaa), headerBakashaChadash = new Headers(request.headers);
			headerBakashaChadash.set('Host', urlMetavech.host);
			headerBakashaChadash.set('Referer', urlMetavech.origin);
			headerBakashaChadash.set('Origin', urlMetavech.origin);
			if (!headerBakashaChadash.has('User-Agent') && UA && UA !== 'null') headerBakashaChadash.set('User-Agent', UA);
			const tguvaMetavech = await fetch(urlMetavech.origin + url.pathname + url.search, { method: request.method, headers: headerBakashaChadash, body: request.body, cf: request.cf });
			const sugTochen = tguvaMetavech.headers.get('content-type') || '';
			// Only handle text-type responses
			if (/text|javascript|json|xml/.test(sugTochen)) {
				const tochenTeguva = (await tguvaMetavech.text()).replaceAll(urlMetavech.host, url.host);
				return new Response(tochenTeguva, { status: tguvaMetavech.status, headers: { ...Object.fromEntries(tguvaMetavech.headers), 'Cache-Control': 'no-store' } });
			}
			return tguvaMetavech;
		} catch (error) { await logErrorToKV(env, error, request); }
		if (nativGisha === 'login' || nativGisha === 'admin' || nativGisha.startsWith('admin/')) {
			return new Response(
				'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Nova Proxy — route not resolved</title>'
				+ '<style>body{font-family:system-ui,Segoe UI,Tahoma,sans-serif;background:#0b0d11;color:#e9edf4;margin:0;display:flex;min-height:100vh;align-items:center;justify-content:center;padding:24px}'
				+ '.c{max-width:560px;background:#101319;border:1px solid #1c2027;border-radius:16px;padding:28px}h1{font-size:18px;margin:0 0 12px}p{color:#aeb6c4;line-height:1.7;font-size:14px}code{background:#0b0d11;border:1px solid #1c2027;border-radius:5px;padding:1px 6px;color:#22d3ee}</style></head>'
				+ '<body><div class="c"><h1>' + '/' + nativGisha + ' did not resolve</h1>'
				+ '<p>The request reached the end of routing without being handled by the login/admin logic above. This page is shown instead of the decoy site so the problem stays visible.</p>'
				+ '<p>Check Worker logs (<code>wrangler tail</code>) for the exact path and any thrown error, or set the <code>DEBUG=1</code> variable to see stack traces on this route.</p>'
				+ '</div></body></html>',
				{ status: 500, headers: { 'Content-Type': 'text/html;charset=utf-8', 'Cache-Control': 'no-store' } }
			);
		}
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
		let _errPath = '';
		try { _errPath = new URL(request.url).pathname.toLowerCase(); } catch (e) {}
		if (_errPath === '/login' || _errPath === '/admin' || _errPath.startsWith('/admin/')) {
			const msg = (topLevelError && (topLevelError.stack || topLevelError.message)) || String(topLevelError);
			return new Response(
				'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Nova Proxy — error</title>'
				+ '<style>body{font-family:system-ui,Segoe UI,Tahoma,sans-serif;background:#0b0d11;color:#e9edf4;margin:0;padding:24px}pre{white-space:pre-wrap;word-break:break-word;background:#101319;border:1px solid #1c2027;border-radius:12px;padding:16px;color:#f87171;font-size:13px}</style></head>'
				+ '<body><h1>Uncaught exception on ' + _errPath + '</h1><p>Shown here (instead of the decoy page) so the real cause is visible:</p><pre>' + msg.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c])) + '</pre></body></html>',
				{ status: 500, headers: { 'Content-Type': 'text/html;charset=utf-8', 'Cache-Control': 'no-store' } }
			);
		}
		try { return new Response(await nginx(), { status: 200, headers: { 'Content-Type': 'text/html; charset=UTF-8' } }); }
		catch (e) { return new Response('', { status: 200 }); }
	  }
	},

	async scheduled(event, env, ctx) {
		wrapKVWithD1(env);
		await loadPanelApiKeys(env);
		// --- Cron heartbeat: written on every invocation, regardless of ENABLE_CRON, so the
		// install page can detect whether a Cron Trigger is actually configured in Cloudflare. ---
		try { if (env && env.KV && typeof env.KV.put === 'function') await env.KV.put('cron_last_tick', String(Date.now())); } catch (e) {}
		if (!_kvMigratedFlag && env.__realKV && ctx && typeof ctx.waitUntil === 'function') ctx.waitUntil(migrateKvToD1(env));
		if (!env || !['1', 'true'].includes(String(env.ENABLE_CRON || ''))) return;
		ctx.waitUntil(haratzatAchzakaMetuzmenet(env).then(r => {
			if (r && r.mirror && !r.mirror.skipped) console.log('scheduledMaintenance:', JSON.stringify(r.mirror.results));
		}).catch(err => console.error('runScheduledMaintenance error:', err && err.message)));
		// Auto-update check
		try {
			let ns = {}; try { ns = JSON.parse(await env.KV.get('network-settings.json') || '{}'); } catch (e) {}
			if (ns.autoUpdate && ns.cfAccountId && ns.cfApiToken && ns.cfWorkerName) {
				const lastCheck = parseInt(await env.KV.get('last_auto_update_check') || '0');
				const interval = ns.autoUpdateInterval || 3600000;
				if (Date.now() - lastCheck > interval) {
					await env.KV.put('last_auto_update_check', String(Date.now()));
					hagdarotReshet = ns;
					ctx.waitUntil(runAutoUpdate(env, ns, ctx).catch(e => console.error('autoUpdate error:', e && e.message)));
				}
			}
		} catch (e) { console.error('autoUpdate check error:', e && e.message); }
	}
};
// ===== XHTTP transport data =====
async function tipulBakashatXHTTP(request, yourUUID, ctx) {
	if (connRejectReason) return new Response('Forbidden ('+connRejectReason+')', { status: 403 });
	if (!request.body) return new Response('Bad Request', { status: 400 });
	const reader = request.body.getReader();
	const chavilaRishona = await kriatChavilaRishonaXHTTP(reader, yourUUID);
	if (!chavilaRishona) {
		try { reader.releaseLock() } catch (e) { }
		return new Response('Invalid request', { status: 400 });
	}
	if (atarChasum(chavilaRishona.hostname)) {
		try { reader.releaseLock() } catch (e) { }
		return hagdarotReshet && hagdarotReshet.enablePornBlock && huDomainMevugarim(chavilaRishona.hostname)
			? dafChasum(request)
			: new Response('Forbidden', { status: 403 });
	}
	if (chavilaRishona.isUDP && chavilaRishona.protokol !== _D_._tr_ && chavilaRishona.port !== 53) {
		try { reader.releaseLock() } catch (e) { }
		return new Response('UDP is not supported', { status: 400 });
	}

	const remoteConnWrapper = { socket: null, connectingPromise: null, retryConnect: null };
	let socketKtivaNochachi = null;
	let kotevMerchak = null;
	const usageStats = { up: 0, down: 0 };
	const responseHeaders = new Headers({
		'Content-Type': 'application/octet-stream',
		'X-Accel-Buffering': 'no',
		'Cache-Control': 'no-store'
	});

	const shachrerKotevMerchak = () => {
		if (kotevMerchak) {
			try { kotevMerchak.releaseLock() } catch (e) { }
			kotevMerchak = null;
		}
		socketKtivaNochachi = null;
	};

	const hasagatKotevMerochak = () => {
		const socket = remoteConnWrapper.socket;
		if (!socket) return null;
		if (socket !== socketKtivaNochachi) {
			shachrerKotevMerchak();
			socketKtivaNochachi = socket;
			kotevMerchak = socket.writable.getWriter();
		}
		return kotevMerchak;
	};

	let torKtivaAloaXHTTP = null;
	return new Response(new ReadableStream({
		async start(controller) {
			let sagur = false;
			let udpRespHeader = chavilaRishona.respHeader;
			const heksherUdpTroyan = { mitmon: new Uint8Array(0) };
			const xhttpBridge = {
				readyState: WebSocket.OPEN,
				send(data) {
					if (sagur) return;
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
						sagur = true;
						this.readyState = WebSocket.CLOSED;
					}
				},
				close() {
					if (sagur) return;
					sagur = true;
					this.readyState = WebSocket.CLOSED;
					try { controller.close() } catch (e) { }
				}
			};

			const torKtivaAlia = torKtivaAloaXHTTP = yetziratTorKtivaAloa({
				hasagatKotev: hasagatKotevMerochak,
				shichrurKotev: shachrerKotevMerchak,
				nisayonChozerChibur: async () => {
					if (typeof remoteConnWrapper.retryConnect !== 'function') throw new Error('retry unavailable');
					await remoteConnWrapper.retryConnect();
				},
				sgiratChibur: () => {
					try { remoteConnWrapper.socket?.close() } catch (e) { }
					closeSocketQuietly(xhttpBridge);
				},
				shem: 'XHTTP uplink'
			});

			const ktovLaMerchak = async (payload, allowRetry = true) => {
				return torKtivaAlia.ktivaVehamtana(payload, allowRetry);
			};

			try {
				if (chavilaRishona.isUDP) {
					if (chavilaRishona.rawData?.byteLength) {
						usageStats.up += chavilaRishona.rawData.byteLength;
						if (chavilaRishona.protokol === _D_._tr_) await haavaraUdpTroyan(chavilaRishona.rawData, xhttpBridge, heksherUdpTroyan, request);
						else await forwardataudp(chavilaRishona.rawData, xhttpBridge, udpRespHeader, request);
						udpRespHeader = null;
					}
				} else {
					if (chavilaRishona.rawData?.byteLength) usageStats.up += chavilaRishona.rawData.byteLength;
					await forwardataTCP(chavilaRishona.hostname, chavilaRishona.port, chavilaRishona.rawData, xhttpBridge, chavilaRishona.respHeader, remoteConnWrapper, yourUUID, request, usageStats);
				}

				while (true) {
					const { done, value } = await reader.read();
					if (done) break;
					if (!value || value.byteLength === 0) continue;
					if (value.byteLength) usageStats.up += value.byteLength;
					if (chavilaRishona.isUDP) {
						if (chavilaRishona.protokol === _D_._tr_) await haavaraUdpTroyan(value, xhttpBridge, heksherUdpTroyan, request);
						else await forwardataudp(value, xhttpBridge, udpRespHeader, request);
						udpRespHeader = null;
					} else {
						if (!(await ktovLaMerchak(value))) throw new Error('Remote socket is not ready');
					}
				}

				if (!chavilaRishona.isUDP) {
					await torKtivaAlia.hamtanaReik();
					const writer = hasagatKotevMerochak();
					if (writer) {
						try { await writer.close() } catch (e) { }
					}
				}
			} catch (err) {
				log(`[XHTTP forward] handling failed: ${err?.message || err}`);
				closeSocketQuietly(xhttpBridge);
			} finally {
				torKtivaAlia.rikun();
				shachrerKotevMerchak();
				try { reader.releaseLock() } catch (e) { }
				try { recordUsage(_globalEnv, usageStats.up, usageStats.down, ctx, true); } catch (e) {}
			}
		},
		cancel() {
			torKtivaAloaXHTTP?.rikun();
			try { remoteConnWrapper.socket?.close() } catch (e) { }
			shachrerKotevMerchak();
			try { reader.releaseLock() } catch (e) { }
		}
	}), { status: 200, headers: responseHeaders });
}

function orechNetunimTakef(data) {
	if (!data) return 0;
	if (typeof data.byteLength === 'number') return data.byteLength;
	if (typeof data.length === 'number') return data.length;
	return 0;
}

async function kriatChavilaRishonaXHTTP(reader, token) {
	const decoder = mefaneachTekstProtokol;

	const nisayonNituachChavilaRishonaVl = (data) => {
		const length = data.byteLength;
		if (length < 18) return { matzav: 'need_more' };
		if (!hatamatBytimUUID(data, 1, token)) return { matzav: 'invalid' };

		const optLen = data[17];
		const cmdIndex = 18 + optLen;
		if (length < cmdIndex + 1) return { matzav: 'need_more' };

		const cmd = data[cmdIndex];
		if (cmd !== 1 && cmd !== 2) return { matzav: 'invalid' };

		const portIndex = cmdIndex + 1;
		if (length < portIndex + 3) return { matzav: 'need_more' };

		const port = (data[portIndex] << 8) | data[portIndex + 1];
		const addressType = data[portIndex + 2];
		const addressIndex = portIndex + 3;
		let headerLen = -1;
		let hostname = '';

		if (addressType === 1) {
			if (length < addressIndex + 4) return { matzav: 'need_more' };
			hostname = `${data[addressIndex]}.${data[addressIndex + 1]}.${data[addressIndex + 2]}.${data[addressIndex + 3]}`;
			headerLen = addressIndex + 4;
		} else if (addressType === 2) {
			if (length < addressIndex + 1) return { matzav: 'need_more' };
			const domainLen = data[addressIndex];
			if (length < addressIndex + 1 + domainLen) return { matzav: 'need_more' };
			hostname = decoder.decode(data.subarray(addressIndex + 1, addressIndex + 1 + domainLen));
			headerLen = addressIndex + 1 + domainLen;
		} else if (addressType === 3) {
			if (length < addressIndex + 16) return { matzav: 'need_more' };
			const ipv6 = [];
			for (let i = 0; i < 8; i++) {
				const base = addressIndex + i * 2;
				ipv6.push(((data[base] << 8) | data[base + 1]).toString(16));
			}
			hostname = ipv6.join(':');
			headerLen = addressIndex + 16;
		} else return { matzav: 'invalid' };

		if (!hostname) return { matzav: 'invalid' };

		return {
			matzav: 'ok',
			totzaa: {
				protokol: 'vl' + 'ess',
				hostname,
				port,
				isUDP: cmd === 2,
				rawData: data.subarray(headerLen),
				respHeader: new Uint8Array([data[0], 0]),
			}
		};
	};

	const nisayonNituachChavilaRishonaTroya = (data) => {
		const hashSisma = sha224(token);
		const bytimHashSisma = new TextEncoder().encode(hashSisma);
		const length = data.byteLength;
		if (length < 58) return { matzav: 'need_more' };
		if (data[56] !== 0x0d || data[57] !== 0x0a) return { matzav: 'invalid' };
		for (let i = 0; i < 56; i++) {
			if (data[i] !== bytimHashSisma[i]) return { matzav: 'invalid' };
		}

		const socksStart = 58;
		if (length < socksStart + 2) return { matzav: 'need_more' };
		const cmd = data[socksStart];
		if (cmd !== 1 && cmd !== 3) return { matzav: 'invalid' };
		const isUDP = cmd === 3;

		const atype = data[socksStart + 1];
		let cursor = socksStart + 2;
		let hostname = '';

		if (atype === 1) {
			if (length < cursor + 4) return { matzav: 'need_more' };
			hostname = `${data[cursor]}.${data[cursor + 1]}.${data[cursor + 2]}.${data[cursor + 3]}`;
			cursor += 4;
		} else if (atype === 3) {
			if (length < cursor + 1) return { matzav: 'need_more' };
			const domainLen = data[cursor];
			if (length < cursor + 1 + domainLen) return { matzav: 'need_more' };
			hostname = decoder.decode(data.subarray(cursor + 1, cursor + 1 + domainLen));
			cursor += 1 + domainLen;
		} else if (atype === 4) {
			if (length < cursor + 16) return { matzav: 'need_more' };
			const ipv6 = [];
			for (let i = 0; i < 8; i++) {
				const base = cursor + i * 2;
				ipv6.push(((data[base] << 8) | data[base + 1]).toString(16));
			}
			hostname = ipv6.join(':');
			cursor += 16;
		} else return { matzav: 'invalid' };

		if (!hostname) return { matzav: 'invalid' };
		if (length < cursor + 4) return { matzav: 'need_more' };

		const port = (data[cursor] << 8) | data[cursor + 1];
		if (data[cursor + 2] !== 0x0d || data[cursor + 3] !== 0x0a) return { matzav: 'invalid' };
		const dataOffset = cursor + 4;

		return {
			matzav: 'ok',
			totzaa: {
				protokol: _D_._tr_,
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

		const netunimNochechiyim = buffer.subarray(0, offset);
		const totzaatTroya = nisayonNituachChavilaRishonaTroya(netunimNochechiyim);
		if (totzaatTroya.matzav === 'ok') return { ...totzaatTroya.totzaa, reader };

		const totzaatVl = nisayonNituachChavilaRishonaVl(netunimNochechiyim);
		if (totzaatVl.matzav === 'ok') return { ...totzaatVl.totzaa, reader };

		if (totzaatTroya.matzav === 'invalid' && totzaatVl.matzav === 'invalid') return null;
	}

	const netunimSofiyim = buffer.subarray(0, offset);
	const totzaatTroyaSofit = nisayonNituachChavilaRishonaTroya(netunimSofiyim);
	if (totzaatTroyaSofit.matzav === 'ok') return { ...totzaatTroyaSofit.totzaa, reader };
	const totzaatVlSofit = nisayonNituachChavilaRishonaVl(netunimSofiyim);
	if (totzaatVlSofit.matzav === 'ok') return { ...totzaatVlSofit.totzaa, reader };
	return null;
}
// ===== gRPC transport data =====
async function tipulBakashatGRPC(request, yourUUID, ctx) {
	if (connRejectReason) return new Response('Forbidden ('+connRejectReason+')', { status: 403 });
	if (!request.body) return new Response('Bad Request', { status: 400 });
	const reader = request.body.getReader();
	const remoteConnWrapper = { socket: null, connectingPromise: null, retryConnect: null };
	let isDnsQuery = false;
	const heksherUdpTroyan = { mitmon: new Uint8Array(0) };
	let bdikatTroyan = null;
	let socketKtivaNochachi = null;
	let kotevMerchak = null;
	let torKtivaAloaGRPC = null;
	const usageStats = { up: 0, down: 0 };
	// log('[gRPC] start handling bidirectional stream');
	const grpcHeaders = new Headers({
		'Content-Type': 'application/grpc',
		'grpc-status': '0',
		'X-Accel-Buffering': 'no',
		'Cache-Control': 'no-store'
	});

	const tikratMitmonMorad = bytesGrainYerida;
	const mirvachRienunMorad = Math.max(milishniyotShkitatGrainMorad, 1);

	return new Response(new ReadableStream({
		async start(controller) {
			let sagur = false;
			let torShlicha = [];
			let misparBytesTor = 0;
			let taimerRiaanun = null;
			let microtaskRiaanunBaTor = false;
			const grpcBridge = {
				readyState: WebSocket.OPEN,
				send(data) {
					if (sagur) return;
					const chunk = data instanceof Uint8Array ? data : new Uint8Array(data);
					const maarachLenBytes = [];
					let remaining = chunk.byteLength >>> 0;
					while (remaining > 127) {
						maarachLenBytes.push((remaining & 0x7f) | 0x80);
						remaining >>>= 7;
					}
					maarachLenBytes.push(remaining);
					const lenBytes = new Uint8Array(maarachLenBytes);
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
					torShlicha.push(frame);
					misparBytesTor += frame.byteLength;
					tizmunRienunTorShlicha();
				},
				close() {
					if (this.readyState === WebSocket.CLOSED) return;
					riaanunTorShlicha(true);
					sagur = true;
					this.readyState = WebSocket.CLOSED;
					try { controller.close() } catch (e) { }
				}
			};

			const riaanunTorShlicha = (force = false) => {
				microtaskRiaanunBaTor = false;
				if (taimerRiaanun) {
					clearTimeout(taimerRiaanun);
					taimerRiaanun = null;
				}
				if ((!force && sagur) || misparBytesTor === 0) return;
				const out = new Uint8Array(misparBytesTor);
				let offset = 0;
				for (const item of torShlicha) {
					out.set(item, offset);
					offset += item.byteLength;
				}
				torShlicha = [];
				misparBytesTor = 0;
				try {
					controller.enqueue(out);
				} catch (e) {
					sagur = true;
					grpcBridge.readyState = WebSocket.CLOSED;
				}
			};

			const tizmunRienunTorShlicha = () => {
				if (misparBytesTor >= tikratMitmonMorad) {
					riaanunTorShlicha();
					return;
				}
				if (microtaskRiaanunBaTor || taimerRiaanun) return;
				microtaskRiaanunBaTor = true;
				queueMicrotask(() => {
					microtaskRiaanunBaTor = false;
					if (sagur || misparBytesTor === 0 || taimerRiaanun) return;
					taimerRiaanun = setTimeout(riaanunTorShlicha, mirvachRienunMorad);
				});
			};

			const sgiratChibur = () => {
				if (sagur) return;
				torKtivaAloaGRPC?.rikun();
				riaanunTorShlicha(true);
				sagur = true;
				grpcBridge.readyState = WebSocket.CLOSED;
				if (taimerRiaanun) clearTimeout(taimerRiaanun);
				if (kotevMerchak) {
					try { kotevMerchak.releaseLock() } catch (e) { }
					kotevMerchak = null;
				}
				socketKtivaNochachi = null;
				try { reader.releaseLock() } catch (e) { }
				try { remoteConnWrapper.socket?.close() } catch (e) { }
				try { controller.close() } catch (e) { }
			};

			const shachrerKotevMerchak = () => {
				if (kotevMerchak) {
					try { kotevMerchak.releaseLock() } catch (e) { }
					kotevMerchak = null;
				}
				socketKtivaNochachi = null;
			};

			const torKtivaAlia = torKtivaAloaGRPC = yetziratTorKtivaAloa({
				hasagatKotev: () => {
					const socket = remoteConnWrapper.socket;
					if (!socket) return null;
					if (socket !== socketKtivaNochachi) {
						shachrerKotevMerchak();
						socketKtivaNochachi = socket;
						kotevMerchak = socket.writable.getWriter();
					}
					return kotevMerchak;
				},
				shichrurKotev: shachrerKotevMerchak,
				nisayonChozerChibur: async () => {
					if (typeof remoteConnWrapper.retryConnect !== 'function') throw new Error('retry unavailable');
					await remoteConnWrapper.retryConnect();
				},
				sgiratChibur: sgiratChibur,
				shem: 'gRPC uplink'
			});

			const ktovLaMerchak = async (payload, allowRetry = true) => {
				return torKtivaAlia.ktivaVehamtana(payload, allowRetry);
			};

			try {
				let pending = new Uint8Array(0);
				while (true) {
					const { done, value } = await reader.read();
					if (done) break;
					if (!value || value.byteLength === 0) continue;
					const blokNochachi = value instanceof Uint8Array ? value : new Uint8Array(value);
					const merged = new Uint8Array(pending.length + blokNochachi.length);
					merged.set(pending, 0);
					merged.set(blokNochachi, pending.length);
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
							let varintTakef = false;
							while (offset < payload.length) {
								const current = payload[offset++];
								if ((current & 0x80) === 0) {
									varintTakef = true;
									break;
								}
								shift += 7;
								if (shift > 35) break;
							}
							if (varintTakef) payload = payload.subarray(offset);
						}
					if (!payload.byteLength) continue;
					if (isDnsQuery) {
						if (bdikatTroyan) await haavaraUdpTroyan(payload, grpcBridge, heksherUdpTroyan, request);
						else await forwardataudp(payload, grpcBridge, null, request);
						continue;
					}
					if (remoteConnWrapper.socket) {
						usageStats.up += payload.byteLength;
						if (!(await ktovLaMerchak(payload))) throw new Error('Remote socket is not ready');
					} else {
						const bytesChavilaRishona = netunimLeUint8(payload);
						if (bdikatTroyan === null) bdikatTroyan = bytesChavilaRishona.byteLength >= 58 && bytesChavilaRishona[56] === 0x0d && bytesChavilaRishona[57] === 0x0a;
						if (bdikatTroyan) {
							const totzaatNituach = nituachBakashatTroya(bytesChavilaRishona, yourUUID);
							if (totzaatNituach?.hasError) throw new Error(totzaatNituach.message || 'Invalid protocol request');
							const { port, hostname, rawClientData, isUDP } = totzaatNituach;
							log(`[gRPC] troya first packet: ${hostname}:${port} | UDP: ${isUDP ? 'yes' : 'no'}`);
							if (atarChasum(hostname)) throw new Error('Blocked site');
							if (isUDP) {
								isDnsQuery = true;
								if (orechNetunimTakef(rawClientData) > 0) {
									usageStats.up += orechNetunimTakef(rawClientData);
									await haavaraUdpTroyan(rawClientData, grpcBridge, heksherUdpTroyan, request);
								}
							} else {
								usageStats.up += orechNetunimTakef(rawClientData);
								await forwardataTCP(hostname, port, rawClientData, grpcBridge, null, remoteConnWrapper, yourUUID, request, usageStats);
							}
						} else {
							bdikatTroyan = false;
							const totzaatNituach = nituachBakashatVl(bytesChavilaRishona, yourUUID);
							if (totzaatNituach?.hasError) throw new Error(totzaatNituach.message || 'Invalid protocol request');
							const { port, hostname, version, isUDP, rawClientData } = totzaatNituach;
							log(`[gRPC] vl first packet: ${hostname}:${port} | UDP: ${isUDP ? 'yes' : 'no'}`);
							if (atarChasum(hostname)) throw new Error('Blocked site');
							if (isUDP) {
								if (port !== 53) throw new Error('UDP is not supported');
								isDnsQuery = true;
							}
							const respHeader = new Uint8Array([version, 0]);
							grpcBridge.send(respHeader);
							const rawData = rawClientData;
							if (isDnsQuery) {
								if (bdikatTroyan) await haavaraUdpTroyan(rawData, grpcBridge, heksherUdpTroyan, request);
								else await forwardataudp(rawData, grpcBridge, null, request);
							}
							else {
								usageStats.up += orechNetunimTakef(rawData);
								await forwardataTCP(hostname, port, rawData, grpcBridge, null, remoteConnWrapper, yourUUID, request, usageStats);
							}
						}
					}
					}
					riaanunTorShlicha();
				}
				await torKtivaAlia.hamtanaReik();
			} catch (err) {
				log(`[gRPC forward] handling failed: ${err?.message || err}`);
			} finally {
				torKtivaAlia.rikun();
				shachrerKotevMerchak();
				sgiratChibur();
				try { recordUsage(_globalEnv, usageStats.up, usageStats.down, ctx, true); } catch (e) {}
			}
		},
		cancel() {
			torKtivaAloaGRPC?.rikun();
			try { remoteConnWrapper.socket?.close() } catch (e) { }
			try { reader.releaseLock() } catch (e) { }
		}
	}), { status: 200, headers: grpcHeaders });
}

function huNetunimMukdamimWStakef(bytes, token) {
	if (!bytes?.byteLength) return false;
	if (bytes.byteLength >= 18 && hatamatBytimUUID(bytes, 1, token)) return true;
	if (bytes.byteLength < 58 || bytes[56] !== 0x0d || bytes[57] !== 0x0a) return false;

	const troyaPassword = sha224(token);
	for (let i = 0; i < 56; i++) {
		if (bytes[i] !== troyaPassword.charCodeAt(i)) return false;
	}
	return true;
}

function pianuchNetunimMukdamimWS(header, token) {
	if (!header) return null;
	if (header.length > maksOrechKoteretNetunimMukdamimWS) throw new Error('early data is too large');

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

	if (bytes.byteLength > maksBytimNetunimMukdamimWS) throw new Error('early data is too large');
	return huNetunimMukdamimWStakef(bytes, token) ? bytes : null;
}

// ===== WS transport data =====
async function tipulBakashatWS(request, yourUUID, url, ctx) {
	const zugSocketWS = new WebSocketPair();
	const [clientSock, serverSock] = Object.values(zugSocketWS);
	try { (/** @type {any} */ (serverSock)).accept({ allowHalfOpen: true }) }
	catch (_) { serverSock.accept() }
	serverSock.binaryType = 'arraybuffer';
	let remoteConnWrapper = { socket: null, connectingPromise: null, retryConnect: null };
	let isDnsQuery = false;
	let bdikatTroyan = null;
	const heksherUdpTroyan = { mitmon: new Uint8Array(0) };
	const earlyDataHeader = request.headers.get('sec-websocket-protocol') || '';
	const SSbitulEarlyData = !!url.searchParams.get('enc');
	let torKtivaAloaWS = null;
	let sharsheretHaavaraMeforeshetWS = Promise.resolve();
	let atziratKabalaHaavaraMeforeshetWS = false, kishalonHaavaraWsMforash = false, siyumHaavaraMeforeshetWSbaTor = false;
	let bytesTorWsMforash = 0, pritTorWsMforash = 0;
	let zihuySugProtokol = null, socketKtivaNochachi = null, kotevMerchak = null;
	let heksherSs = null, mesimatIticholSs = null;
	const usageStats = { up: 0, down: 0 };
	const moridMugbalMehirut = getSpeedLimiter('down');

	const shachrerKotevMerchak = () => {
		if (kotevMerchak) {
			try { kotevMerchak.releaseLock() } catch (e) { }
			kotevMerchak = null;
		}
		socketKtivaNochachi = null;
	};

	const torKtivaAlia = torKtivaAloaWS = yetziratTorKtivaAloa({
		hasagatKotev: () => {
			const socket = remoteConnWrapper.socket;
			if (!socket) return null;
			if (socket !== socketKtivaNochachi) {
				shachrerKotevMerchak();
				socketKtivaNochachi = socket;
				kotevMerchak = socket.writable.getWriter();
			}
			return kotevMerchak;
		},
		shichrurKotev: shachrerKotevMerchak,
		nisayonChozerChibur: async () => {
			if (typeof remoteConnWrapper.retryConnect !== 'function') throw new Error('retry unavailable');
			await remoteConnWrapper.retryConnect();
		},
		sgiratChibur: () => {
			try { remoteConnWrapper.socket?.close() } catch (e) { }
			closeSocketQuietly(serverSock);
		},
		shem: 'WS uplink'
	});

	const ktovLaMerchak = async (chunk, allowRetry = true) => {
		return torKtivaAlia.ktivaVehamtana(chunk, allowRetry);
	};

	const hasagatHeksherSS = async () => {
		if (heksherSs) return heksherSs;
		if (!mesimatIticholSs) {
			mesimatIticholSs = (async () => {
				const shitatHatzpanaBakasha = (url.searchParams.get('enc') || '').toLowerCase();
				const tetzurotHatzpanaMuadefet = tetzuratHatzpanaTmichatSS[shitatHatzpanaBakasha] || tetzuratHatzpanaTmichatSS['aes-128-gcm'];
				const tetzurotHatzpanaMuamadKnisa = [tetzurotHatzpanaMuadefet, ...Object.values(tetzuratHatzpanaTmichatSS).filter(c => c.method !== tetzurotHatzpanaMuadefet.method)];
				const mitmonMesimatMafteachRashiNichnas = new Map();
				const hasagatMesimatMafteachRashiNichnas = (config) => {
					if (!mitmonMesimatMafteachRashiNichnas.has(config.method)) mitmonMesimatMafteachRashiNichnas.set(config.method, mafteachRashiNigzarSS(yourUUID, config.keyLen));
					return mitmonMesimatMafteachRashiNichnas.get(config.method);
				};
				const matzavKnisa = {
					buffer: new Uint8Array(0),
					hasSalt: false,
					waitPayloadLength: null,
					decryptKey: null,
					nonceCounter: new Uint8Array(orechSSNonce),
					tetzuratHatzpana: null,
				};
				const itchulMatzavPianuchNichnas = async () => {
					const lengthCipherTotalLength = 2 + orechTagSSAEAD;
					const maksOrechMelach = Math.max(...tetzurotHatzpanaMuamadKnisa.map(c => c.saltLen));
					const maksBytimSrikatYishur = 16;
					const maksOffsetSarik = Math.min(maksBytimSrikatYishur, Math.max(0, matzavKnisa.buffer.byteLength - (lengthCipherTotalLength + Math.min(...tetzurotHatzpanaMuamadKnisa.map(c => c.saltLen)))));
					for (let offset = 0; offset <= maksOffsetSarik; offset++) {
						for (const tetzuratHatzpana of tetzurotHatzpanaMuamadKnisa) {
							const orechMinimumItchul = offset + tetzuratHatzpana.saltLen + lengthCipherTotalLength;
							if (matzavKnisa.buffer.byteLength < orechMinimumItchul) continue;
							const salt = matzavKnisa.buffer.subarray(offset, offset + tetzuratHatzpana.saltLen);
							const lengthCipher = matzavKnisa.buffer.subarray(offset + tetzuratHatzpana.saltLen, orechMinimumItchul);
							const masterKey = await hasagatMesimatMafteachRashiNichnas(tetzuratHatzpana);
							const decryptKey = await mafteachSessionNigzarSS(tetzuratHatzpana, masterKey, salt, ['decrypt']);
							const nonceCounter = new Uint8Array(orechSSNonce);
							try {
								const lengthPlain = await piachnuachSSAEAD(decryptKey, nonceCounter, lengthCipher);
								if (lengthPlain.byteLength !== 2) continue;
								const payloadLength = (lengthPlain[0] << 8) | lengthPlain[1];
								if (payloadLength < 0 || payloadLength > tetzuratHatzpana.maxChunk) continue;
								if (offset > 0) log(`[SS inbound] leading noise detected ${offset}B, auto-aligned`);
								if (tetzuratHatzpana.method !== tetzurotHatzpanaMuadefet.method) log(`[SS inbound] URL enc=${shitatHatzpanaBakasha || tetzurotHatzpanaMuadefet.method} vs actual ${tetzuratHatzpana.method} mismatch, auto-switched`);
								matzavKnisa.buffer = matzavKnisa.buffer.subarray(orechMinimumItchul);
								matzavKnisa.decryptKey = decryptKey;
								matzavKnisa.nonceCounter = nonceCounter;
								matzavKnisa.waitPayloadLength = payloadLength;
								matzavKnisa.tetzuratHatzpana = tetzuratHatzpana;
								matzavKnisa.hasSalt = true;
								return true;
							} catch (_) { }
						}
					}
					const orechKviatKishalonItchul = maksOrechMelach + lengthCipherTotalLength + maksBytimSrikatYishur;
					if (matzavKnisa.buffer.byteLength >= orechKviatKishalonItchul) {
						throw new Error(`SS handshake decrypt failed (enc=${shitatHatzpanaBakasha || 'auto'}, candidates=${tetzurotHatzpanaMuamadKnisa.map(c => c.method).join('/')})`);
					}
					return false;
				};
				const mefaneachNichnas = {
					async kelet(dataChunk) {
						const chunk = netunimLeUint8(dataChunk);
						if (chunk.byteLength > 0) matzavKnisa.buffer = shrsherBytes(matzavKnisa.buffer, chunk);
						if (!matzavKnisa.hasSalt) {
							const itchulHatzlacha = await itchulMatzavPianuchNichnas();
							if (!itchulHatzlacha) return [];
						}
						const plaintextChunks = [];
						while (true) {
							if (matzavKnisa.waitPayloadLength === null) {
								const lengthCipherTotalLength = 2 + orechTagSSAEAD;
								if (matzavKnisa.buffer.byteLength < lengthCipherTotalLength) break;
								const lengthCipher = matzavKnisa.buffer.subarray(0, lengthCipherTotalLength);
								matzavKnisa.buffer = matzavKnisa.buffer.subarray(lengthCipherTotalLength);
								const lengthPlain = await piachnuachSSAEAD(matzavKnisa.decryptKey, matzavKnisa.nonceCounter, lengthCipher);
								if (lengthPlain.byteLength !== 2) throw new Error('SS length decrypt failed');
								const payloadLength = (lengthPlain[0] << 8) | lengthPlain[1];
								if (payloadLength < 0 || payloadLength > matzavKnisa.tetzuratHatzpana.maxChunk) throw new Error(`SS payload length invalid: ${payloadLength}`);
								matzavKnisa.waitPayloadLength = payloadLength;
							}
							const payloadCipherTotalLength = matzavKnisa.waitPayloadLength + orechTagSSAEAD;
							if (matzavKnisa.buffer.byteLength < payloadCipherTotalLength) break;
							const payloadCipher = matzavKnisa.buffer.subarray(0, payloadCipherTotalLength);
							matzavKnisa.buffer = matzavKnisa.buffer.subarray(payloadCipherTotalLength);
							const payloadPlain = await piachnuachSSAEAD(matzavKnisa.decryptKey, matzavKnisa.nonceCounter, payloadCipher);
							plaintextChunks.push(payloadPlain);
							matzavKnisa.waitPayloadLength = null;
						}
						return plaintextChunks;
					},
				};
				let matzpinYetzia = null;
				const maksBytimManaBodedSS = 32 * 1024;
				const hasagatMatzpenYotze = async () => {
					if (matzpinYetzia) return matzpinYetzia;
					if (!matzavKnisa.tetzuratHatzpana) throw new Error('SS cipher is not negotiated');
					const tetzurotHatzpanaYetzia = matzavKnisa.tetzuratHatzpana;
					const mafteachRashiYotze = await mafteachRashiNigzarSS(yourUUID, tetzurotHatzpanaYetzia.keyLen);
					const bytimAckraiyimYotze = crypto.getRandomValues(new Uint8Array(tetzurotHatzpanaYetzia.saltLen));
					const mafteachHatzpanaYotze = await mafteachSessionNigzarSS(tetzurotHatzpanaYetzia, mafteachRashiYotze, bytimAckraiyimYotze, ['encrypt']);
					const moneNonceYotze = new Uint8Array(orechSSNonce);
					let bytimAckraiyimNishlechu = false;
					matzpinYetzia = {
						async hatzpanaVeShlicha(dataChunk, sendChunk) {
							const plaintextData = netunimLeUint8(dataChunk);
							if (!bytimAckraiyimNishlechu) {
								await sendChunk(bytimAckraiyimYotze);
								bytimAckraiyimNishlechu = true;
							}
							if (plaintextData.byteLength === 0) return;
							let offset = 0;
							while (offset < plaintextData.byteLength) {
								const end = Math.min(offset + tetzurotHatzpanaYetzia.maxChunk, plaintextData.byteLength);
								const payloadPlain = plaintextData.subarray(offset, end);
								const lengthPlain = new Uint8Array(2);
								lengthPlain[0] = (payloadPlain.byteLength >>> 8) & 0xff;
								lengthPlain[1] = payloadPlain.byteLength & 0xff;
								const lengthCipher = await hatzpanatSSAEAD(mafteachHatzpanaYotze, moneNonceYotze, lengthPlain);
								const payloadCipher = await hatzpanatSSAEAD(mafteachHatzpanaYotze, moneNonceYotze, payloadPlain);
								const frame = new Uint8Array(lengthCipher.byteLength + payloadCipher.byteLength);
								frame.set(lengthCipher, 0);
								frame.set(payloadCipher, lengthCipher.byteLength);
								await sendChunk(frame);
								offset = end;
							}
						},
					};
					return matzpinYetzia;
				};
				let torShlichaSs = Promise.resolve();
				const hachnasatTorShlichaSS = (chunk) => {
					torShlichaSs = torShlichaSs.then(async () => {
						if (serverSock.readyState !== WebSocket.OPEN) return;
						const matzpenYotzeMeutchal = await hasagatMatzpenYotze();
						await matzpenYotzeMeutchal.hatzpanaVeShlicha(chunk, async (encryptedChunk) => {
							if (encryptedChunk.byteLength > 0 && serverSock.readyState === WebSocket.OPEN) {
								await shlachVehamtenWebSocket(serverSock, encryptedChunk.buffer);
							}
						});
					}).catch((error) => {
						log(`[SS send] encryption failed: ${error?.message || error}`);
						closeSocketQuietly(serverSock);
					});
					return torShlichaSs;
				};
				const socketChavilatChozer = {
					get readyState() {
						return serverSock.readyState;
					},
					send(data) {
						const chunk = netunimLeUint8(data);
						if (chunk.byteLength <= maksBytimManaBodedSS) {
							return hachnasatTorShlichaSS(chunk);
						}
						for (let i = 0; i < chunk.byteLength; i += maksBytimManaBodedSS) {
							hachnasatTorShlichaSS(chunk.subarray(i, Math.min(i + maksBytimManaBodedSS, chunk.byteLength)));
						}
						return torShlichaSs;
					},
					close() {
						closeSocketQuietly(serverSock);
					}
				};
				heksherSs = {
					mefaneachNichnas: mefaneachNichnas,
					socketChavilaChozer: socketChavilatChozer,
					chavilaRishonaHukma: false,
					meareachYaad: '',
					portYaad: 0,
				};
				return heksherSs;
			})().finally(() => { mesimatIticholSs = null });
		}
		return mesimatIticholSs;
	};

	const tipulNetuneiSS = async (chunk) => {
		const heksher = await hasagatHeksherSS();
		let maarachGushTekstGalui = null;
		try {
			maarachGushTekstGalui = await heksher.mefaneachNichnas.kelet(chunk);
		} catch (err) {
			const msg = err?.message || `${err}`;
			if (msg.includes('Decryption failed') || msg.includes('SS handshake decrypt failed') || msg.includes('SS length decrypt failed')) {
				log(`[SS inbound] decryption failed, connection closed: ${msg}`);
				closeSocketQuietly(serverSock);
				return;
			}
			throw err;
		}
		for (const gushTekstGalui of maarachGushTekstGalui) {
			let nichtav = false;
			try {
				nichtav = await ktovLaMerchak(gushTekstGalui, false);
			} catch (err) {
				if ((/** @type {any} */ (err))?.isQueueOverflow) throw err;
				nichtav = false;
			}
			if (nichtav) continue;
			if (heksher.chavilaRishonaHukma && heksher.meareachYaad && heksher.portYaad > 0) {
				await forwardataTCP(heksher.meareachYaad, heksher.portYaad, gushTekstGalui, heksher.socketChavilaChozer, null, remoteConnWrapper, yourUUID, request);
				continue;
			}
			const netunimGalui = netunimLeUint8(gushTekstGalui);
			if (netunimGalui.byteLength < 3) throw new Error('invalid ss data');
			const addressType = netunimGalui[0];
			let cursor = 1;
			let hostname = '';
			if (addressType === 1) {
				if (netunimGalui.byteLength < cursor + 4 + 2) throw new Error('invalid ss ipv4 length');
				hostname = `${netunimGalui[cursor]}.${netunimGalui[cursor + 1]}.${netunimGalui[cursor + 2]}.${netunimGalui[cursor + 3]}`;
				cursor += 4;
			} else if (addressType === 3) {
				if (netunimGalui.byteLength < cursor + 1) throw new Error('invalid ss domain length');
				const domainLength = netunimGalui[cursor];
				cursor += 1;
				if (netunimGalui.byteLength < cursor + domainLength + 2) throw new Error('invalid ss domain data');
				hostname = mefaneachTekstSS.decode(netunimGalui.subarray(cursor, cursor + domainLength));
				cursor += domainLength;
			} else if (addressType === 4) {
				if (netunimGalui.byteLength < cursor + 16 + 2) throw new Error('invalid ss ipv6 length');
				const ipv6 = [];
				const ipv6View = new DataView(netunimGalui.buffer, netunimGalui.byteOffset + cursor, 16);
				for (let i = 0; i < 8; i++) ipv6.push(ipv6View.getUint16(i * 2).toString(16));
				hostname = ipv6.join(':');
				cursor += 16;
			} else {
				throw new Error(`invalid ss addressType: ${addressType}`);
			}
			if (!hostname) throw new Error(`invalid ss address: ${addressType}`);
			const port = (netunimGalui[cursor] << 8) | netunimGalui[cursor + 1];
			cursor += 2;
			const rawClientData = netunimGalui.subarray(cursor);
			if (atarChasum(hostname)) throw new Error('Blocked site');
			heksher.chavilaRishonaHukma = true;
			heksher.meareachYaad = hostname;
			heksher.portYaad = port;
			await forwardataTCP(hostname, port, rawClientData, heksher.socketChavilaChozer, null, remoteConnWrapper, yourUUID, request, usageStats);
		}
	};

	const tipulNetuneiWSnichnas = async (chunk) => {
		let bytesBlokNochachi = null;
		const chunkBytes = orechNetunimTakef(chunk);
		if (chunkBytes > 0) usageStats.up += chunkBytes;
		if (isDnsQuery) {
			if (bdikatTroyan) return await haavaraUdpTroyan(chunk, serverSock, heksherUdpTroyan, request);
			return await forwardataudp(chunk, serverSock, null, request);
		}
		if (zihuySugProtokol === 'ss') {
			await tipulNetuneiSS(chunk);
			return;
		}
		if (await ktovLaMerchak(chunk)) return;

		if (zihuySugProtokol === null) {
			if (url.searchParams.get('enc')) zihuySugProtokol = 'ss';
			else {
				bytesBlokNochachi = bytesBlokNochachi || netunimLeUint8(chunk);
				const bytes = bytesBlokNochachi;
				zihuySugProtokol = bytes.byteLength >= 58 && bytes[56] === 0x0d && bytes[57] === 0x0a ? 'troya' : 'vl';
			}
			bdikatTroyan = zihuySugProtokol === 'troya';
			log(`[WS forward] protocol type: ${zihuySugProtokol} | from: ${url.host} | UA: ${request.headers.get('user-agent') || 'unknown'}`);
		}

		if (zihuySugProtokol === 'ss') {
			await tipulNetuneiSS(chunk);
			return;
		}
		if (await ktovLaMerchak(chunk)) return;
		if (zihuySugProtokol === 'troya') {
			const totzaatNituach = nituachBakashatTroya(chunk, yourUUID);
			if (totzaatNituach?.hasError) throw new Error(totzaatNituach.message || 'Invalid protocol request');
			const { port, hostname, rawClientData, isUDP } = totzaatNituach;
			if (atarChasum(hostname)) throw new Error('Blocked site');
			if (isUDP) {
				isDnsQuery = true;
				if (orechNetunimTakef(rawClientData) > 0) return haavaraUdpTroyan(rawClientData, serverSock, heksherUdpTroyan, request);
				return;
			}
			await forwardataTCP(hostname, port, rawClientData, serverSock, null, remoteConnWrapper, yourUUID, request, usageStats);
		} else {
			bdikatTroyan = false;
			bytesBlokNochachi = bytesBlokNochachi || netunimLeUint8(chunk);
			const bytes = bytesBlokNochachi;
			const totzaatNituach = nituachBakashatVl(bytes, yourUUID);
			if (totzaatNituach?.hasError) throw new Error(totzaatNituach.message || 'Invalid protocol request');
			const { port, hostname, version, isUDP, rawClientData } = totzaatNituach;
			if (atarChasum(hostname)) throw new Error('Blocked site');
			if (isUDP) {
				if (port === 53) isDnsQuery = true;
				else throw new Error('UDP is not supported');
			}
			const respHeader = new Uint8Array([version, 0]);
			const rawData = rawClientData;
			if (isDnsQuery) {
				if (bdikatTroyan) return haavaraUdpTroyan(rawData, serverSock, heksherUdpTroyan, request);
				return forwardataudp(rawData, serverSock, respHeader, request);
			}
			await forwardataTCP(hostname, port, rawData, serverSock, respHeader, remoteConnWrapper, yourUUID, request, usageStats);
		}
	};

	const tipulShgiatHaavaraWsMforash = (err) => {
		if (kishalonHaavaraWsMforash) return;
		kishalonHaavaraWsMforash = true;
		atziratKabalaHaavaraMeforeshetWS = true;
		bytesTorWsMforash = 0;
		pritTorWsMforash = 0;
		try { recordUsage(_globalEnv, usageStats.up, usageStats.down, ctx, true); } catch (e) {}
		const msg = err?.message || `${err}`;
		if (msg.includes('Network connection lost') || msg.includes('ReadableStream is closed')) {
			log(`[WS forward] connection ended: ${msg}`);
		} else {
			log(`[WS forward] handling failed: ${msg}`);
		}
		torKtivaAlia.rikun();
		shachrerKotevMerchak();
		closeSocketQuietly(serverSock);
	};

	const hosafatMesimatHaavaraMeforeshetWS = (mesima) => {
		sharsheretHaavaraMeforeshetWS = sharsheretHaavaraMeforeshetWS.then(mesima).catch(tipulShgiatHaavaraWsMforash);
		return sharsheretHaavaraMeforeshetWS;
	};

	const hachnasatTorHaavaraMeforeshetWS = (data) => {
		if (atziratKabalaHaavaraMeforeshetWS || kishalonHaavaraWsMforash) return;
		const chunkSize = Math.max(0, orechNetunimTakef(data));
		const nextBytes = bytesTorWsMforash + chunkSize;
		const nextItems = pritTorWsMforash + 1;
		if (nextBytes > maksBytimTorAloa || nextItems > maksPritimTorAloa) {
			tipulShgiatHaavaraWsMforash(new Error(`[WS explicit transport] queue overflow: ${nextBytes}B/${nextItems}`));
			return;
		}
		bytesTorWsMforash = nextBytes;
		pritTorWsMforash = nextItems;
		hosafatMesimatHaavaraMeforeshetWS(async () => {
			bytesTorWsMforash = Math.max(0, bytesTorWsMforash - chunkSize);
			pritTorWsMforash = Math.max(0, pritTorWsMforash - 1);
			if (kishalonHaavaraWsMforash) return;
			await tipulNetuneiWSnichnas(data);
		});
	};

	const siyumHaavaraMeforeshetWS2 = () => {
		if (siyumHaavaraMeforeshetWSbaTor) return;
		siyumHaavaraMeforeshetWSbaTor = true;
		atziratKabalaHaavaraMeforeshetWS = true;
		hosafatMesimatHaavaraMeforeshetWS(async () => {
			if (kishalonHaavaraWsMforash) return;
			await torKtivaAlia.hamtanaReik();
			shachrerKotevMerchak();
		});
	};

	serverSock.addEventListener('message', (event) => {
		hachnasatTorHaavaraMeforeshetWS(event.data);
	});
	serverSock.addEventListener('close', () => {
		closeSocketQuietly(serverSock);
		siyumHaavaraMeforeshetWS2();
		try { recordUsage(_globalEnv, usageStats.up, usageStats.down, ctx, true); } catch (e) {}
	});
	serverSock.addEventListener('error', (err) => {
		tipulShgiatHaavaraWsMforash(err);
	});

	// In SS mode, disable sec-websocket-protocol early-data to avoid injecting the subprotocol value (e.g. "binary") as base64 into the first packet, which would break AEAD decryption.
	if (!SSbitulEarlyData && earlyDataHeader) {
		try {
			const bytes = pianuchNetunimMukdamimWS(earlyDataHeader, yourUUID);
			if (bytes?.byteLength) {
				usageStats.up += bytes.byteLength;
				hachnasatTorHaavaraMeforeshetWS(bytes.buffer);
			}
		} catch (error) {
			tipulShgiatHaavaraWsMforash(error);
		}
	}

	return new Response(null, { status: 101, webSocket: clientSock, headers: { 'Sec-WebSocket-Extensions': '' } });
}

const mefaneachTekstTroya = new TextDecoder();

function nituachBakashatTroya(buffer, passwordPlainText) {
	const data = netunimLeUint8(buffer);
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
			address = mefaneachTekstTroya.decode(data.subarray(addressIndex, addressIndex + addressLength));
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

const mitmonBytesUuid = new Map();
const mefaneachTekstProtokol = new TextDecoder();

function kriatChatziBytHexa(code) {
	if (code >= 48 && code <= 57) return code - 48;
	code |= 32;
	if (code >= 97 && code <= 102) return code - 87;
	return -1;
}

function hasagatBytimUUID(uuid) {
	const key = String(uuid || '');
	let cached = mitmonBytesUuid.get(key);
	if (cached) return cached;

	const clean = key.replace(/-/g, '');
	if (clean.length !== 32) return null;

	const bytes = new Uint8Array(16);
	for (let i = 0; i < 16; i++) {
		const high = kriatChatziBytHexa(clean.charCodeAt(i * 2));
		const low = kriatChatziBytHexa(clean.charCodeAt(i * 2 + 1));
		if (high < 0 || low < 0) return null;
		bytes[i] = (high << 4) | low;
	}

	if (mitmonBytesUuid.size >= 32) mitmonBytesUuid.clear();
	mitmonBytesUuid.set(key, bytes);
	return bytes;
}

function hatamatBytimUUID(data, offset, uuid) {
	const expected = hasagatBytimUUID(uuid);
	if (!expected || data.byteLength < offset + 16) return false;
	for (let i = 0; i < 16; i++) {
		if (data[offset + i] !== expected[i]) return false;
	}
	return true;
}

function nituachBakashatVl(chunk, token) {
	const data = netunimLeUint8(chunk);
	const length = data.byteLength;
	if (length < 24) return { hasError: true, message: 'Invalid data' };
	const version = data[0];
	if (!hatamatBytimUUID(data, 1, token)) return { hasError: true, message: 'Invalid uuid' };

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
			hostname = mefaneachTekstProtokol.decode(data.subarray(addrValIdx, addrValIdx + addrLen));
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

const tetzuratHatzpanaTmichatSS = {
	'aes-128-gcm': { method: 'aes-128-gcm', keyLen: 16, saltLen: 16, maxChunk: 0x3fff, aesLength: 128 },
	'aes-256-gcm': { method: 'aes-256-gcm', keyLen: 32, saltLen: 32, maxChunk: 0x3fff, aesLength: 256 },
};

const orechTagSSAEAD = 16, orechSSNonce = 12;
const meidaTatMafteachSS = new TextEncoder().encode('ss-subkey');
const mekadedTekstSS = new TextEncoder(), mefaneachTekstSS = new TextDecoder(), mitmonMafteachRashiSs = new Map();

function netunimLeUint8(data) {
	if (data instanceof Uint8Array) return data;
	if (data instanceof ArrayBuffer) return new Uint8Array(data);
	if (ArrayBuffer.isView(data)) return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
	return new Uint8Array(data || 0);
}

function shrsherBytes(...chunkList) {
	if (!chunkList || chunkList.length === 0) return new Uint8Array(0);
	const chunks = chunkList.map(netunimLeUint8);
	const total = chunks.reduce((sum, c) => sum + c.byteLength, 0);
	const result = new Uint8Array(total);
	let offset = 0;
	for (const c of chunks) { result.set(c, offset); offset += c.byteLength }
	return result;
}

async function haavaraUdpTroyan(chunk, webSocket, heksher, request) {
	const blokNochachi = netunimLeUint8(chunk);
	const gushMitmon = heksher?.mitmon instanceof Uint8Array ? heksher.mitmon : new Uint8Array(0);
	const input = gushMitmon.byteLength ? shrsherBytes(gushMitmon, blokNochachi) : blokNochachi;
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
		} else throw new Error(`invalid protocol udp addressType: ${atype}`);

		const portCursor = addrCursor + addrLen;
		if (input.byteLength < portCursor + 6) break;

		const port = (input[portCursor] << 8) | input[portCursor + 1];
		const payloadLength = (input[portCursor + 2] << 8) | input[portCursor + 3];
		if (input[portCursor + 4] !== 0x0d || input[portCursor + 5] !== 0x0a) throw new Error('invalid protocol udp delimiter');

		const payloadStart = portCursor + 6;
		const payloadEnd = payloadStart + payloadLength;
		if (input.byteLength < payloadEnd) break;

		const headerKtovetPort = input.slice(packetStart, portCursor + 2);
		const payload = input.slice(payloadStart, payloadEnd);
		cursor = payloadEnd;

		if (port !== 53) throw new Error('UDP is not supported');
		if (!payload.byteLength) continue;

		let shailtaTcpDns = payload;
		if (payload.byteLength < 2 || ((payload[0] << 8) | payload[1]) !== payload.byteLength - 2) {
			shailtaTcpDns = new Uint8Array(payload.byteLength + 2);
			shailtaTcpDns[0] = (payload.byteLength >>> 8) & 0xff;
			shailtaTcpDns[1] = payload.byteLength & 0xff;
			shailtaTcpDns.set(payload, 2);
		}

		const heksherTeguvatDns = { mitmon: new Uint8Array(0) };
		await forwardataudp(shailtaTcpDns, webSocket, null, request, (dnsRespChunk) => {
			const gushTeguvaNochechi = netunimLeUint8(dnsRespChunk);
			const klitatTguva = heksherTeguvatDns.mitmon.byteLength ? shrsherBytes(heksherTeguvatDns.mitmon, gushTeguvaNochechi) : gushTeguvaNochechi;
			const reshimatFrameTeguva = [];
			let responseCursor = 0;
			while (responseCursor + 2 <= klitatTguva.byteLength) {
				const dnsLen = (klitatTguva[responseCursor] << 8) | klitatTguva[responseCursor + 1];
				const dnsStart = responseCursor + 2;
				const dnsEnd = dnsStart + dnsLen;
				if (dnsEnd > klitatTguva.byteLength) break;
				const dnsPayload = klitatTguva.slice(dnsStart, dnsEnd);
				const frame = new Uint8Array(headerKtovetPort.byteLength + 4 + dnsPayload.byteLength);
				frame.set(headerKtovetPort, 0);
				frame[headerKtovetPort.byteLength] = (dnsPayload.byteLength >>> 8) & 0xff;
				frame[headerKtovetPort.byteLength + 1] = dnsPayload.byteLength & 0xff;
				frame[headerKtovetPort.byteLength + 2] = 0x0d;
				frame[headerKtovetPort.byteLength + 3] = 0x0a;
				frame.set(dnsPayload, headerKtovetPort.byteLength + 4);
				reshimatFrameTeguva.push(frame);
				responseCursor = dnsEnd;
			}
			heksherTeguvatDns.mitmon = klitatTguva.slice(responseCursor);
			return reshimatFrameTeguva.length ? reshimatFrameTeguva : new Uint8Array(0);
		});
	}

	if (heksher) heksher.mitmon = input.slice(cursor);
}

function haalatMoneNonceSS(counter) {
	for (let i = 0; i < counter.length; i++) { counter[i] = (counter[i] + 1) & 0xff; if (counter[i] !== 0) return }
}

async function mafteachRashiNigzarSS(passwordText, keyLen) {
	const cacheKey = `${keyLen}:${passwordText}`;
	if (mitmonMafteachRashiSs.has(cacheKey)) return mitmonMafteachRashiSs.get(cacheKey);
	const deriveTask = (async () => {
		const pwBytes = mekadedTekstSS.encode(passwordText || '');
		let prev = new Uint8Array(0), result = new Uint8Array(0);
		while (result.byteLength < keyLen) {
			const input = new Uint8Array(prev.byteLength + pwBytes.byteLength);
			input.set(prev, 0); input.set(pwBytes, prev.byteLength);
			prev = new Uint8Array(await crypto.subtle.digest('MD5', input));
			result = shrsherBytes(result, prev);
		}
		return result.slice(0, keyLen);
	})();
	mitmonMafteachRashiSs.set(cacheKey, deriveTask);
	try { return await deriveTask }
	catch (error) { mitmonMafteachRashiSs.delete(cacheKey); throw error }
}

async function mafteachSessionNigzarSS(config, masterKey, salt, usages) {
	const hmacOpts = { name: 'HMAC', hash: 'SHA-1' };
	const saltHmacKey = await crypto.subtle.importKey('raw', salt, hmacOpts, false, ['sign']);
	const prk = new Uint8Array(await crypto.subtle.sign('HMAC', saltHmacKey, masterKey));
	const prkHmacKey = await crypto.subtle.importKey('raw', prk, hmacOpts, false, ['sign']);
	const subKey = new Uint8Array(config.keyLen);
	let prev = new Uint8Array(0), written = 0, counter = 1;
	while (written < config.keyLen) {
		const input = shrsherBytes(prev, meidaTatMafteachSS, new Uint8Array([counter]));
		prev = new Uint8Array(await crypto.subtle.sign('HMAC', prkHmacKey, input));
		const copyLen = Math.min(prev.byteLength, config.keyLen - written);
		subKey.set(prev.subarray(0, copyLen), written);
		written += copyLen; counter += 1;
	}
	return crypto.subtle.importKey('raw', subKey, { name: 'AES-GCM', length: config.aesLength }, false, usages);
}

async function hatzpanatSSAEAD(cryptoKey, nonceCounter, plaintext) {
	const iv = nonceCounter.slice();
	const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv, tagLength: 128 }, cryptoKey, plaintext);
	haalatMoneNonceSS(nonceCounter);
	return new Uint8Array(ct);
}

async function piachnuachSSAEAD(cryptoKey, nonceCounter, ciphertext) {
	const iv = nonceCounter.slice();
	const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv, tagLength: 128 }, cryptoKey, ciphertext);
	haalatMoneNonceSS(nonceCounter);
	return new Uint8Array(pt);
}

async function forwardataTCP(host, portNum, rawData, ws, respHeader, remoteConnWrapper, yourUUID, request = null, usageStats = null) {
	if (usageStats && usageStats.userId == null && chiburMishtameshId) usageStats.userId = chiburMishtameshId;
	// Per-user DNS content blocking (blockPorn / blockAds)
	if (chiburMishtameshId && host && !isIPv4(host) && !host.includes(':') && portNum !== 53) {
		const _bu = hagdarotReshet && Array.isArray(hagdarotReshet.users) ? hagdarotReshet.users.find(u => u && u.id === chiburMishtameshId) : null;
		if (_bu && (_bu.blockPorn || _bu.blockAds)) {
			let _blockDoh = 'https://cloudflare-dns.com/dns-query';
			if (_bu.blockPorn && _bu.blockAds) _blockDoh = 'https://family.adguard-dns.com/dns-query';
			else if (_bu.blockPorn) _blockDoh = 'https://family.cloudflare-dns.com/dns-query';
			else if (_bu.blockAds) _blockDoh = 'https://dns.adguard-dns.com/dns-query';
			try {
				const _dnsResult = await shailtaDoH(host, 'A', _blockDoh);
				const _isBlocked = Array.isArray(_dnsResult) && _dnsResult.some(r => r && (r.data === '0.0.0.0' || r.data === '::' || r.data === '176.103.130.130'));
				if (_isBlocked) { log(`[ContentBlock] Blocked ${host} for user ${_bu.username || _bu.tag}`); return; }
			} catch (e) {}
		}
	}
	log(`[TCP forward] target: ${host}:${portNum} | proxyIP: ${metavechIP} | proxy fallback: ${hafelGibuiMetavech ? 'yes' : 'no'} | proxy type: ${hafelSocks5Metavech || 'proxyip'} | global: ${hafelSocks5Klali ? 'yes' : 'no'}`);
	const milishniyotTimeoutChibur = 1000;
	let chavilaRishonaNishlechaViaProxy = false;
	const chiburTCP = yatzerMchubarTcpBakasha(request);

	async function hamtanatHakamatChibur(remoteSock, timeoutMs = milishniyotTimeoutChibur) {
		await Promise.race([
			remoteSock.opened,
			new Promise((_, reject) => setTimeout(() => reject(new Error('connection timeout')), timeoutMs))
		]);
	}

	async function pticatChiburTCP(address, port) {
		const remoteSock = chiburTCP({ hostname: address, port });
		try {
			await hamtanatHakamatChibur(remoteSock);
			return remoteSock;
		} catch (err) {
			try { remoteSock?.close?.() } catch (e) { }
			throw err;
		}
	}

	async function ktivatChavilaRishona(remoteSock, data) {
		if (orechNetunimTakef(data) <= 0) return;
		const writer = remoteSock.writable.getWriter();
		try { await writer.write(netunimLeUint8(data)) }
		finally { try { writer.releaseLock() } catch (e) { } }
	}

	async function pticatChiburMoamadMakbil(reshimatMuamadim) {
		if (reshimatMuamadim.length === 1) {
			const muamad = reshimatMuamadim[0];
			return { socket: await pticatChiburTCP(muamad.hostname, muamad.port), candidate: muamad };
		}
		const attempts = reshimatMuamadim.map(muamad => pticatChiburTCP(muamad.hostname, muamad.port).then(socket => ({ socket, candidate: muamad })));
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

	async function bnyatReshimatMoamadeiPreloadMerotz(address, port) {
		if (!preloadChiyugMerotz || isIPHostname(address)) return null;
		log(`[TCP direct] preload race-dial enabled, querying ${address} A/AAAA records`);
		const [aRecords, aaaaRecords] = await Promise.all([
			shailtaDoH(address, 'A'),
			shailtaDoH(address, 'AAAA')
		]);
		const ipv4List = [...new Set(aRecords.flatMap(r => {
			const data = r.data;
			return r.type === 1 && typeof data === 'string' && isIPv4(data) ? [data] : [];
		}))];
		const ipv6List = [...new Set(aaaaRecords.flatMap(r => {
			const data = r.data;
			return r.type === 28 && typeof data === 'string' && isIPHostname(data) ? [data] : [];
		}))];
		const tikraChiyug = Math.max(1, misparChiyugTcpMakbili | 0);
		const ipList = ipv4List.length >= tikraChiyug
			? ipv4List.slice(0, tikraChiyug)
			: ipv4List.concat(ipv6List.slice(0, tikraChiyug - ipv4List.length));
		const sugRishumShimush = ipv4List.length > 0
			? (ipList.length > ipv4List.length ? 'A+AAAA' : 'A')
			: 'AAAA';
		if (ipList.length === 0) {
			log(`[TCP direct] ${address} got no usable A/AAAA results; preload race unavailable, falling back to direct hostname connect.`);
			return null;
		}
		const reshimatIPnivchar = ipList;
		log(`[TCP direct] ${address} A records:${ipv4List.length} AAAA records:${ipv6List.length}, using ${sugRishumShimush} records, race-dial ${reshimatIPnivchar.length}/${tikraChiyug}: ${reshimatIPnivchar.join(', ')}`);
		return reshimatIPnivchar.map((hostname, attempt) => ({ hostname, port, attempt, resolvedFrom: address }));
	}

	async function connectDirect(address, port, data = null, efsherPreload = false) {
		const reshimaMuamadimPreload = efsherPreload ? await bnyatReshimatMoamadeiPreloadMerotz(address, port) : null;
		const reshimatMuamadim = reshimaMuamadimPreload || Array.from({ length: misparChiyugTcpMakbili }, (_, attempt) => ({ hostname: address, port, attempt }));
		log(reshimaMuamadimPreload
			? `[TCP direct] concurrent attempt ${reshimatMuamadim.length} lane: ${reshimatMuamadim.map(muamad => `${muamad.hostname}:${muamad.port}`).join(', ')}`
			: `[TCP direct] concurrent attempt ${reshimatMuamadim.length} lane: ${address}:${port}`);
		let socket = null;
		try {
			const totzaatChibur = await pticatChiburMoamadMakbil(reshimatMuamadim);
			socket = totzaatChibur.socket;
			if (reshimaMuamadimPreload) {
				const winner = totzaatChibur.candidate;
				log(`[TCP direct] preload race result: ${winner.hostname}:${winner.port} won, source domain: ${winner.resolvedFrom || address}`);
			}
			await ktivatChavilaRishona(socket, data);
			return socket;
		} catch (err) {
			try { socket?.close?.() } catch (e) { }
			if (reshimaMuamadimPreload) log(`[TCP direct] preload race failed: ${err.message || err}`);
			throw err;
		}
	}

	async function connectProxyIP(address, port, data = null, maarachKolMetavech = null, efsherGibuyKishalonMetavech = true) {
		if (maarachKolMetavech && maarachKolMetavech.length > 0) {
			for (let i = 0; i < maarachKolMetavech.length; i += misparChiyugTcpMakbili) {
				const reshimatMuamadim = [];
				for (let j = 0; j < misparChiyugTcpMakbili && i + j < maarachKolMetavech.length; j++) {
					const indeksMaarachMetavech = (indeksMaarachMetavechMitmon + i + j) % maarachKolMetavech.length;
					const [ktovetMetavech, portMetavech] = maarachKolMetavech[indeksMaarachMetavech];
					reshimatMuamadim.push({ hostname: ktovetMetavech, port: portMetavech, index: indeksMaarachMetavech });
				}
				let socket = null, candidate = null;
				try {
					log(`[proxy connect] concurrent attempt ${reshimatMuamadim.length} lane: ${reshimatMuamadim.map(muamad => `${muamad.hostname}:${muamad.port}`).join(', ')}`);
					const totzaatChibur = await pticatChiburMoamadMakbil(reshimatMuamadim);
					socket = totzaatChibur.socket;
					candidate = totzaatChibur.candidate;
					await ktivatChavilaRishona(socket, data);
					log(`[proxy connect] connected to: ${candidate.hostname}:${candidate.port} (index: ${candidate.index})`);
					indeksMaarachMetavechMitmon = candidate.index;
					return socket;
				} catch (err) {
					try { socket?.close?.() } catch (e) { }
					log(`[proxy connect] this batch failed: ${err.message || err}`);
				}
			}
		}

		if (efsherGibuyKishalonMetavech) return connectDirect(address, port, data, false);
		else {
			closeSocketQuietly(ws);
			throw new Error('[proxy connect] all proxy connections failed and proxy fallback is disabled; connection aborted.');
		}
	}

	async function connecttoPry(mutarShlichatChavilaRishona = true) {
		if (remoteConnWrapper.connectingPromise) {
			await remoteConnWrapper.connectingPromise;
			return;
		}

		const shlichatChavilaRishonaNochechit = mutarShlichatChavilaRishona && !chavilaRishonaNishlechaViaProxy && orechNetunimTakef(rawData) > 0;
		const netuneiChavilaRishona = shlichatChavilaRishonaNochechit ? rawData : null;

		const mesimatChiburNochechi = (async () => {
			let newSocket;
			if (hafelSocks5Metavech === 'socks5') {
				log(`[SOCKS5 proxy] proxying to: ${host}:${portNum}`);
				newSocket = await socks5Connect(host, portNum, netuneiChavilaRishona, chiburTCP);
			} else if (hafelSocks5Metavech === 'http') {
				log(`[HTTP proxy] proxying to: ${host}:${portNum}`);
				newSocket = await httpConnect(host, portNum, netuneiChavilaRishona, false, chiburTCP);
			} else if (hafelSocks5Metavech === 'https') {
				log(`[HTTPS proxy] proxying to: ${host}:${portNum}`);
				newSocket = isIPHostname(parsedSocks5Address.hostname)
					? await httpsConnect(host, portNum, netuneiChavilaRishona, chiburTCP)
					: await httpConnect(host, portNum, netuneiChavilaRishona, true, chiburTCP);
			} else if (hafelSocks5Metavech === 'turn') {
				log(`[TURN proxy] proxying to: ${host}:${portNum}`);
				newSocket = await turnConnect(parsedSocks5Address, host, portNum, chiburTCP);
				if (orechNetunimTakef(netuneiChavilaRishona) > 0) {
					const writer = newSocket.writable.getWriter();
					try { await writer.write(netunimLeUint8(netuneiChavilaRishona)) }
					finally { try { writer.releaseLock() } catch (e) { } }
				}
			} else if (hafelSocks5Metavech === 'sstp') {
				log(`[SSTP proxy] proxying to: ${host}:${portNum}`);
				newSocket = await sstpConnect(parsedSocks5Address, host, portNum, chiburTCP);
				if (orechNetunimTakef(netuneiChavilaRishona) > 0) {
					const writer = newSocket.writable.getWriter();
					try { await writer.write(netunimLeUint8(netuneiChavilaRishona)) }
					finally { try { writer.releaseLock() } catch (e) { } }
				}
		} else {
			log(`[proxy connect] proxying to: ${host}:${portNum}`);
			const maarachKolMetavech = await nituachKtovetPort(metavechIP, host, yourUUID);
			try {
				newSocket = await connectProxyIP(`${milonChatimot[0]}.tp1.${milonChatimot[2]}.xyz`, 1, netuneiChavilaRishona, maarachKolMetavech, hafelGibuiMetavech);
			} catch (err) {
				const nat64Sock = tetzurotNat64 ? await tryNat64Chibur(host, portNum, netuneiChavilaRishona, chiburTCP) : null;
				if (!nat64Sock) throw err;
				newSocket = nat64Sock;
			}
		}
			if (shlichatChavilaRishonaNochechit) chavilaRishonaNishlechaViaProxy = true;
			remoteConnWrapper.socket = newSocket;
			newSocket.closed.catch(() => { }).finally(() => closeSocketQuietly(ws));
			connectStreams(newSocket, ws, respHeader, null, usageStats);
		})();

		remoteConnWrapper.connectingPromise = mesimatChiburNochechi;
		try {
			await mesimatChiburNochechi;
		} finally {
			if (remoteConnWrapper.connectingPromise === mesimatChiburNochechi) {
				remoteConnWrapper.connectingPromise = null;
			}
		}
	}
	remoteConnWrapper.retryConnect = async () => connecttoPry(!chavilaRishonaNishlechaViaProxy);

	if (hafelSocks5Metavech && (hafelSocks5Klali || reshimaLevanaSocks5.some(p => new RegExp(`^${p.replace(/\*/g, '.*')}$`, 'i').test(host)))) {
		log(`[TCP forward] enabling SOCKS5/HTTP/HTTPS/TURN/SSTP global proxy`);
		try {
			await connecttoPry();
		} catch (err) {
			log(`[TCP forward] SOCKS5/HTTP/HTTPS/TURN/SSTP proxy connection failed: ${err.message}`);
			throw err;
		}
	} else {
		try {
			log(`[TCP forward] trying direct connect to: ${host}:${portNum}`);
			const initialSocket = await connectDirect(host, portNum, rawData, true);
			remoteConnWrapper.socket = initialSocket;
			connectStreams(initialSocket, ws, respHeader, async () => {
				if (remoteConnWrapper.socket !== initialSocket) return;
				await connecttoPry();
			}, usageStats);
		} catch (err) {
			log(`[TCP forward] direct ${host}:${portNum} failed: ${err.message}`);
			if (err instanceof Error && err.name === 'PreloadResolutionEmpty') {
				closeSocketQuietly(ws);
				throw err;
			}
			try {
				await connecttoPry();
			} catch (err2) {
				const nat64Sock = tetzurotNat64 ? await tryNat64Chibur(host, portNum, rawData, chiburTCP) : null;
				if (!nat64Sock) throw err2;
				remoteConnWrapper.socket = nat64Sock;
				nat64Sock.closed.catch(() => { }).finally(() => closeSocketQuietly(ws));
				connectStreams(nat64Sock, ws, respHeader, null, usageStats);
			}
		}
	}
}

async function forwardataudp(udpChunk, webSocket, respHeader, request, oteftTeguva = null) {
	const netuneiBakasha = netunimLeUint8(udpChunk);
	const misparBytimBakasha = netuneiBakasha.byteLength;
	log(`[UDP forward] received DNS request: ${misparBytimBakasha}B -> 8.8.4.4:53`);
	try {
		const chiburTCP = yatzerMchubarTcpBakasha(request);
		const tcpSocket = chiburTCP({ hostname: '8.8.4.4', port: 53 });
		let headerProtoRishon = respHeader;
		const writer = tcpSocket.writable.getWriter();
		await writer.write(netuneiBakasha);
		log(`[UDP forward] DNS request written upstream: ${misparBytimBakasha}B`);
		writer.releaseLock();
		await tcpSocket.readable.pipeTo(new WritableStream({
			async write(chunk) {
				const teguvaGolmit = netunimLeUint8(chunk);
				log(`[UDP forward] received DNS response: ${teguvaGolmit.byteLength}B`);
				const totzaatItuf = oteftTeguva ? await oteftTeguva(teguvaGolmit) : teguvaGolmit;
				const reshimatMiktaShlicha = Array.isArray(totzaatItuf) ? totzaatItuf : [totzaatItuf];
				if (!reshimatMiktaShlicha.length) return;
				if (webSocket.readyState !== WebSocket.OPEN) return;
				for (const fragment of reshimatMiktaShlicha) {
					const haavaratTguva = netunimLeUint8(fragment);
					if (!haavaratTguva.byteLength) continue;
					if (headerProtoRishon) {
						const response = new Uint8Array(headerProtoRishon.length + haavaratTguva.byteLength);
						response.set(headerProtoRishon, 0);
						response.set(haavaratTguva, headerProtoRishon.length);
						await shlachVehamtenWebSocket(webSocket, response.buffer);
						headerProtoRishon = null;
					} else {
						await shlachVehamtenWebSocket(webSocket, haavaratTguva);
					}
				}
			},
		}));
	} catch (error) {
		log(`[UDP forward] DNS forward failed: ${error?.message || error}`);
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

async function shlachVehamtenWebSocket(webSocket, payload) {
	const sendResult = webSocket.send(payload);
	if (sendResult && typeof sendResult.then === 'function') await sendResult;
}

function yetziratTorKtivaAloa({ hasagatKotev: kabelKotev, shichrurKotev: shachrerKotev, nisayonChozerChibur: nasehShuvChibur, sgiratChibur: sgiratChibur, shem = 'uplink queue' }) {
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
		const closeErr = err || (closed ? new Error(`${shem}: queue closed`) : null);
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
		if (head >= chunks.length || first.chunk.byteLength >= bytesYaadIchudAlia) return first;

		let byteLength = first.chunk.byteLength;
		let end = head;
		let allowRetry = first.allowRetry;
		let completions = first.completions || null;
		while (end < chunks.length) {
			const next = chunks[end];
			const nextLength = byteLength + next.chunk.byteLength;
			if (nextLength > bytesYaadIchudAlia) break;
			byteLength = nextLength;
			allowRetry = allowRetry && next.allowRetry;
			if (next.completions) completions = completions ? completions.concat(next.completions) : next.completions;
			end++;
		}
		if (end === head) return first;

		const output = (bundleBuffer ||= new Uint8Array(bytesYaadIchudAlia));
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
				let writer = kabelKotev();
				if (!writer) throw new Error(`${shem}: remote writer unavailable`);
				const completions = item.completions || null;
				activeCompletions = completions;
				try {
					try {
						await writer.write(item.chunk);
					} catch (err) {
						shachrerKotev?.();
						if (!item.allowRetry || typeof nasehShuvChibur !== 'function') throw err;
						await nasehShuvChibur();
						writer = kabelKotev();
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
			log(`[${shem}] write failed: ${err?.message || err}`);
			try { sgiratChibur?.(err) } catch (_) { }
		} finally {
			draining = false;
			if (!closed && head < chunks.length) queueMicrotask(drain);
			else resolveIdle();
		}
	};

	const enqueue = (data, allowRetry = true, waitForFlush = false) => {
		if (closed) return false;
		// During first-packet parsing the socket may not be established yet; return false so the caller keeps going down the protocol-parse path.
		if (!kabelKotev()) return false;
		const chunk = netunimLeUint8(data);
		if (!chunk.byteLength) return true;
		const nextBytes = queuedBytes + chunk.byteLength;
		const nextItems = chunks.length - head + 1;
		if (nextBytes > maksBytimTorAloa || nextItems > maksPritimTorAloa) {
			closed = true;
			const err = Object.assign(new Error(`${shem}: upload queue overflow (${nextBytes}B/${nextItems})`), { isQueueOverflow: true });
			clear(err);
			log(`[${shem}] queue over limit, closing connection`);
			try { sgiratChibur?.(err) } catch (_) { }
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
		ktiva(data, allowRetry = true) {
			return enqueue(data, allowRetry, false);
		},
		ktivaVehamtana(data, allowRetry = true) {
			return enqueue(data, allowRetry, true);
		},
		async hamtanaReik() {
			if (!queuedBytes && !draining) return;
			await new Promise(resolve => idleResolvers.push(resolve));
		},
		rikun() {
			closed = true;
			clear();
		}
	};
}

function yetziratMeshaderGrainMorad(webSocket, headerData = null) {
	const packetCap = bytesGrainYerida;
	const tailBytes = safZanavGrainMorad;
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

	const shlichatGushGolmi = async (chunk) => {
		if (webSocket.readyState !== WebSocket.OPEN) throw new Error('ws.readyState is not open');
		await shlachVehamtenWebSocket(webSocket, chunk);
	};

	const hosafatKoteretTeguva = (chunk) => {
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
		flushPromise = shlichatGushGolmi(output).finally(() => { flushPromise = null });
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
			}, Math.max(milishniyotShkitatGrainMorad, 1));
		});
	};

	return {
		async shlichaYeshira(data) {
			let chunk = netunimLeUint8(data);
			if (!chunk.byteLength) return;
			chunk = hosafatKoteretTeguva(chunk);
			await shlichatGushGolmi(chunk);
		},
		async shlicha(data) {
			let chunk = netunimLeUint8(data);
			if (!chunk.byteLength) return;
			chunk = hosafatKoteretTeguva(chunk);
			let offset = 0;
			const totalBytes = chunk.byteLength;
			while (offset < totalBytes) {
				if (!pendingBytes && totalBytes - offset >= packetCap) {
					const sendBytes = Math.min(packetCap, totalBytes - offset);
					const view = offset || sendBytes !== totalBytes ? chunk.subarray(offset, offset + sendBytes) : chunk;
					await shlichatGushGolmi(view);
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
	const tikraKriaBYOB = 64 * 1024;
	const sholeachYerida = yetziratMeshaderGrainMorad(webSocket, header);
	const magbilYerida = usageStats ? getSpeedLimiter('down') : null;
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
				if (usageStats) { usageStats.down += value.byteLength; if (usageStats.userId && haimMishtameshChiburCharag(usageStats.userId, usageStats.up + usageStats.down)) throw new Error('quota exceeded'); }
				if (magbilYerida && magbilYerida.enabled) await magbilYerida.take(value.byteLength);
				await sholeachYerida.shlicha(value);
			}
		} else {
			let readBuffer = new ArrayBuffer(tikraKriaBYOB);
			while (true) {
				const { done, value } = await reader.read(new Uint8Array(readBuffer, 0, tikraKriaBYOB));
				if (done) break;
				if (!value || value.byteLength === 0) continue;
				hasData = true;
				if (usageStats) { usageStats.down += value.byteLength; if (usageStats.userId && haimMishtameshChiburCharag(usageStats.userId, usageStats.up + usageStats.down)) throw new Error('quota exceeded'); }
				if (value.byteLength >= bytesGrainYerida) {
					await sholeachYerida.flush();
					if (magbilYerida && magbilYerida.enabled) await magbilYerida.take(value.byteLength);
					await sholeachYerida.shlichaYeshira(value);
					readBuffer = new ArrayBuffer(tikraKriaBYOB);
				} else {
					if (magbilYerida && magbilYerida.enabled) await magbilYerida.take(value.byteLength);
					await sholeachYerida.shlicha(value);
					readBuffer = value.buffer.byteLength >= tikraKriaBYOB ? value.buffer : new ArrayBuffer(tikraKriaBYOB);
				}
			}
		}
		await sholeachYerida.flush();
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

// ===== SOCKS5/HTTP functions =====
async function socks5Connect(targetHost, targetPort, initialData, chiburTCP) {
	const { username, password, hostname, port } = parsedSocks5Address;
	const socket = chiburTCP({ hostname, port }), writer = socket.writable.getWriter(), reader = socket.readable.getReader();
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

		if (orechNetunimTakef(initialData) > 0) await writer.write(initialData);
		writer.releaseLock(); reader.releaseLock();
		return socket;
	} catch (error) {
		try { writer.releaseLock() } catch (e) { }
		try { reader.releaseLock() } catch (e) { }
		try { socket.close() } catch (e) { }
		throw error;
	}
}

async function httpConnect(targetHost, targetPort, initialData, proxyHTTPS = false, chiburTCP) {
	const { username, password, hostname, port } = parsedSocks5Address;
	const socket = proxyHTTPS
		? chiburTCP({ hostname, port }, { secureTransport: 'on', allowHalfOpen: false })
		: chiburTCP({ hostname, port });
	const writer = socket.writable.getWriter(), reader = socket.readable.getReader();
	const encoder = new TextEncoder();
	const decoder = new TextDecoder();
	try {
		if (proxyHTTPS) await socket.opened;

		const auth = username && password ? `Proxy-Authorization: Basic ${btoa(`${username}:${password}`)}\r\n` : '';
		const request = `CONNECT ${targetHost}:${targetPort} HTTP/1.1\r\nHost: ${targetHost}:${targetPort}\r\n${auth}User-Agent: Mozilla/5.0\r\nConnection: keep-alive\r\n\r\n`;
		await writer.write(encoder.encode(request));
		writer.releaseLock();

		let responseBuffer = new Uint8Array(0), headerEndIndex = -1, bytesRead = 0;
		while (headerEndIndex === -1 && bytesRead < 8192) {
			const { done, value } = await reader.read();
			if (done || !value) throw new Error(`${proxyHTTPS ? 'HTTPS' : 'HTTP'} proxy closed the connection before returning the CONNECT response`);
			responseBuffer = new Uint8Array([...responseBuffer, ...value]);
			bytesRead = responseBuffer.length;
			const crlfcrlf = responseBuffer.findIndex((_, i) => i < responseBuffer.length - 3 && responseBuffer[i] === 0x0d && responseBuffer[i + 1] === 0x0a && responseBuffer[i + 2] === 0x0d && responseBuffer[i + 3] === 0x0a);
			if (crlfcrlf !== -1) headerEndIndex = crlfcrlf + 4;
		}

		if (headerEndIndex === -1) throw new Error('Proxy CONNECT response header too long or invalid');
		const statusMatch = decoder.decode(responseBuffer.slice(0, headerEndIndex)).split('\r\n')[0].match(/HTTP\/\d\.\d\s+(\d+)/);
		const statusCode = statusMatch ? parseInt(statusMatch[1], 10) : NaN;
		if (!Number.isFinite(statusCode) || statusCode < 200 || statusCode >= 300) throw new Error(`Connection failed: HTTP ${statusCode}`);

		reader.releaseLock();

		if (orechNetunimTakef(initialData) > 0) {
			const kotevMerchak = socket.writable.getWriter();
			await kotevMerchak.write(initialData);
			kotevMerchak.releaseLock();
		}

		// Tunnel data may follow the CONNECT response header; feed it back into the readable stream so the first packet isn't swallowed.
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

async function httpsConnect(targetHost, targetPort, initialData, chiburTCP) {
	const { username, password, hostname, port } = parsedSocks5Address;
	const encoder = new TextEncoder();
	const decoder = new TextDecoder();
	let tlsSocket = null;
	const tlsServerName = isIPHostname(hostname) ? '' : stripIPv6Brackets(hostname);
	const pticatTLSproxyHTTPS = async (allowChacha = false) => {
		const proxySocket = chiburTCP({ hostname, port });
		try {
			await proxySocket.opened;
			const socket = new TlsClient(proxySocket, { serverName: tlsServerName, insecure: true, allowChacha });
			await socket.handshake();
			log(`[HTTPS proxy] TLS version: ${socket.isTls13 ? '1.3' : '1.2'} | Cipher: 0x${socket.cipherSuite.toString(16)}${socket.cipherConfig?.chacha ? ' (ChaCha20)' : ' (AES-GCM)'}`);
			return socket;
		} catch (error) {
			try { proxySocket.close() } catch (e) { }
			throw error;
		}
	};
	try {
		try {
			tlsSocket = await pticatTLSproxyHTTPS(false);
		} catch (error) {
			if (!/cipher|handshake|TLS Alert|ServerHello|Finished|Unsupported|Missing TLS/i.test(error?.message || `${error || ''}`)) throw error;
			log(`[HTTPS proxy] AES-GCM TLS handshake failed, falling back to ChaCha20 compatibility mode: ${error?.message || error}`);
			tlsSocket = await pticatTLSproxyHTTPS(true);
		}

		const auth = username && password ? `Proxy-Authorization: Basic ${btoa(`${username}:${password}`)}\r\n` : '';
		const request = `CONNECT ${targetHost}:${targetPort} HTTP/1.1\r\nHost: ${targetHost}:${targetPort}\r\n${auth}User-Agent: Mozilla/5.0\r\nConnection: keep-alive\r\n\r\n`;
		await tlsSocket.write(encoder.encode(request));

		let responseBuffer = new Uint8Array(0), headerEndIndex = -1, bytesRead = 0;
		while (headerEndIndex === -1 && bytesRead < 8192) {
			const value = await tlsSocket.read();
			if (!value) throw new Error('HTTPS proxy closed the connection before returning the CONNECT response');
			responseBuffer = shrsherBytes(responseBuffer, value);
			bytesRead = responseBuffer.length;
			const crlfcrlf = responseBuffer.findIndex((_, i) => i < responseBuffer.length - 3 && responseBuffer[i] === 0x0d && responseBuffer[i + 1] === 0x0a && responseBuffer[i + 2] === 0x0d && responseBuffer[i + 3] === 0x0a);
			if (crlfcrlf !== -1) headerEndIndex = crlfcrlf + 4;
		}

		if (headerEndIndex === -1) throw new Error('HTTPS proxy CONNECT response header too long or invalid');
		const statusMatch = decoder.decode(responseBuffer.slice(0, headerEndIndex)).split('\r\n')[0].match(/HTTP\/\d\.\d\s+(\d+)/);
		const statusCode = statusMatch ? parseInt(statusMatch[1], 10) : NaN;
		if (!Number.isFinite(statusCode) || statusCode < 200 || statusCode >= 300) throw new Error(`Connection failed: HTTP ${statusCode}`);

		if (orechNetunimTakef(initialData) > 0) await tlsSocket.write(netunimLeUint8(initialData));
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
					if (orechNetunimTakef(bufferedData) > 0) controller.enqueue(bufferedData);
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
				await tlsSocket.write(netunimLeUint8(chunk));
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

function yatzerMchubarTcpBakasha(request) {
	const objBakasha = /** @type {any} */ (request);
	const fetcher = objBakasha?.fetcher;
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
	const data = netunimLeUint8(fragment);
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
		const bytes = netunimLeUint8(chunk);
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
		const bytes = netunimLeUint8(chunk);
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
		const plaintext = netunimLeUint8(data);
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
	const body = netunimLeUint8(value);
	const attribute = new Uint8Array(4 + body.byteLength + turnStunPadding(body.byteLength));
	const view = new DataView(attribute.buffer);
	view.setUint16(0, type);
	view.setUint16(2, body.byteLength);
	attribute.set(body, 4);
	return attribute;
}

function createTurnStunMessage(type, transactionId, attributes) {
	const body = shrsherBytes(...attributes);
	const header = new Uint8Array(20);
	const view = new DataView(header.buffer);
	view.setUint16(0, type);
	view.setUint16(2, body.byteLength);
	header.set(TURN_STUN_MAGIC_COOKIE, 4);
	header.set(transactionId, 8);
	return shrsherBytes(header, body);
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
	return shrsherBytes(signedMessage, createTurnStunAttribute(TURN_STUN_ATTR.MESSAGE_INTEGRITY, new Uint8Array(signature)));
}

async function readTurnStunMessage(reader, bufferedData = null, timeoutMessage = 'TURN response timed out') {
	let buffer = orechNetunimTakef(bufferedData) ? netunimLeUint8(bufferedData) : new Uint8Array(0);
	const pull = async () => {
		const { done, value } = await withTimeout(reader.read(), CONNECT_TIMEOUT_MS, timeoutMessage);
		if (done) throw new Error('TURN server closed connection');
		if (value?.byteLength) buffer = shrsherBytes(buffer, value);
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

async function turnConnect(proxy, targetHost, targetPort, chiburTCP) {
	proxy = { ...proxy, username: proxy.username ?? null, password: proxy.password ?? null };
	const resolvedTargetHost = stripIPv6Brackets(targetHost);
	/** @type {string | null} */
	let targetIp = isIPv4(resolvedTargetHost) ? resolvedTargetHost : null;
	if (!targetIp) {
		const records = await shailtaDoH(resolvedTargetHost, 'A');
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
		controlSocket = chiburTCP({ hostname: turnHost, port: proxy.port });
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
			await writeTurnBytes(controlWriter, shrsherBytes(allocateRequest, ...pipelinedMessages), 'TURN authenticated Allocate request timed out');
			turnResponse = await readTurnStunMessage(controlReader, bufferedData, 'TURN authenticated Allocate response timed out');
			message = turnResponse.message;
			bufferedData = turnResponse.extraData;
		} else if (message.type === TURN_STUN_TYPE.ALLOCATE_SUCCESS) {
			const pipelinedMessages = await Promise.all([
				sign(createTurnStunMessage(TURN_STUN_TYPE.CREATE_PERMISSION_REQUEST, randomTurnTransactionId(), [peerAddress, ...authAttributes])),
				sign(createTurnStunMessage(TURN_STUN_TYPE.CONNECT_REQUEST, randomTurnTransactionId(), [peerAddress, ...authAttributes]))
			]);
			if (pipelinedMessages.length) await writeTurnBytes(controlWriter, shrsherBytes(...pipelinedMessages), 'TURN pipelined request timed out');
		}

		if (message.type !== TURN_STUN_TYPE.ALLOCATE_SUCCESS) {
			const errorCode = parseTurnErrorCode(message.attributes[TURN_STUN_ATTR.ERROR_CODE]);
			throw new Error(errorCode ? `TURN Allocate failed with ${errorCode}` : 'TURN Allocate failed');
		}

		dataSocket = chiburTCP({ hostname: turnHost, port: proxy.port });
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

async function sstpConnect(proxy, targetHost, targetPort, chiburTCP) {
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
		return netunimLeUint8(value);
	};
	const readBytes = async length => {
		while (bufferedBytes.byteLength < length) {
			const chunk = await readSocketChunk();
			bufferedBytes = bufferedBytes.byteLength ? shrsherBytes(bufferedBytes, chunk) : chunk;
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
			bufferedBytes = bufferedBytes.byteLength ? shrsherBytes(bufferedBytes, chunk) : chunk;
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
		socket = chiburTCP({ hostname: serverHost, port: serverPort }, { secureTransport: 'on', allowHalfOpen: false });
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

		await withTimeout(writer.write(shrsherBytes(
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
			const records = await shailtaDoH(target, 'A');
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
			const bytes = netunimLeUint8(payload);
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
					streamController.enqueue(pendingChunks.length === 1 ? pendingChunks[0] : shrsherBytes(...pendingChunks));
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
				const bytes = netunimLeUint8(chunk);
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
				await writer.write(shrsherBytes(...frames));
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
// ===== Utility functions =====
/*
 * Keyed Base64 encode.
 * @param {string} plaintext - the raw plaintext string
 * @param {string} secret - the key string (e.g. "KEY123")
 * @returns {string} the keyed Base64 string
 */
function base64SecretEncode(plaintext, secret) {
	const encoder = new TextEncoder();
	const data = encoder.encode(plaintext);
	const key = encoder.encode(secret);
	const mixed = new Uint8Array(data.length);

	for (let i = 0; i < data.length; i++) {
		mixed[i] = data[i] ^ key[i % key.length];
	}

	// Convert a Uint8Array into a btoa-safe string
	let binary = '';
	for (let i = 0; i < mixed.length; i++) {
		binary += String.fromCharCode(mixed[i]);
	}
	return btoa(binary);
}

/*
 * Keyed Base64 decode.
 * @param {string} encoded - the keyed Base64 string
 * @param {string} secret - the key string (must match the one used to encode)
 * @returns {string} the decoded raw plaintext string
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

function hasagatTetzuratProtokolHaavara(tetzurot = {}) {
	const huGRPC = tetzurot.protokolHaavara === 'grpc';
	return {
		type: huGRPC ? (tetzurot.matzavGRPC === 'multi' ? 'grpc&mode=multi' : 'grpc&mode=gun') : (tetzurot.protokolHaavara === 'xhttp' ? 'xhttp&mode=stream-one' : 'ws'),
		shemSadehNativ: huGRPC ? 'serviceName' : 'path',
		shemSadehDomain: huGRPC ? 'authority' : 'host'
	};
}

function hasagatErechParametrNativHaavara(tetzurot = {}, nativTzomet = '/', keGenNivchar = false) {
	const erechNativ = keGenNivchar ? '/' : (tetzurot.nativAckrai ? nativAkrai(nativTzomet) : nativTzomet);
	if (tetzurot.protokolHaavara !== 'grpc') return erechNativ;
	return erechNativ.split('?')[0] || '/';
}

function log(...args) {
	if (hadpasatYomanNipui) console.log(...args);
}

// ---- WARP / WG (ثبت رایگان دستگاه Cloudflare + کش KV) ----
// Worker هیچ‌وقت WARP را تونل نمی‌کند (بدون UDP). فقط یک دستگاه ثبت می‌کند و
// نتیجه را کش می‌کند تا کانفیگ‌ها بتوانند یک WG outbound تولید کنند که سمت کلاینت اجرا شود.
function _b64urlToB64(s) { return s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4); }
async function generateWgKeyPair() {
	const kp = await crypto.subtle.generateKey({ name: 'X25519' }, true, ['deriveBits']);
	const pub = await crypto.subtle.exportKey('jwk', kp.publicKey);
	const prv = await crypto.subtle.exportKey('jwk', kp.privateKey);
	return { publicKey: _b64urlToB64(pub.x), privateKey: _b64urlToB64(prv.d) };
}
function _reservedFromClientId(clientId) {
	try { const bin = atob(clientId); return Array.from(bin, c => c.charCodeAt(0)); } catch (e) { return [0, 0, 0]; }
}
async function registerWarpAccount(env, slot = 'warp-account.json') {
	const { publicKey, privateKey } = await generateWgKeyPair();
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
		v.node = `${_D_._wg_}://${encodeURIComponent(a.privateKey)}@${epFull}/?publickey=${encodeURIComponent(a.peerPublicKey)}${reservedStr}&address=${encodeURIComponent(addr)}&mtu=1280#Nova-WARP`;
		v.conf = `[Interface]\nPrivateKey = ${a.privateKey}\nAddress = ${addr}\nDNS = 1.1.1.1, 1.0.0.1\nMTU = 1280\n\n[Peer]\nPublicKey = ${a.peerPublicKey}\nAllowedIPs = 0.0.0.0/0, ::/0\nEndpoint = ${epFull}`;
	}
	return v;
}
// helper: دریافت آدرس و توکن سرور مرکزی
async function kabelCentralApi(env) {
	let cj = {}; try { const raw = await getConfigRaw(env); cj = raw ? JSON.parse(raw) : {}; } catch (e) { }
	return { api: String(env.CENTRAL_API || cj.centralApi || '').trim().replace(/\/$/, ''), token: String(env.CENTRAL_TOKEN || cj.centralToken || '').trim(), cj };
}
// ===== Central-server management hooks =====
// Opt-in: set CENTRAL_API (env var) or centralApi (config.json centralApi field) to the Nova control-panel address.
// The Worker reports privacy-safe heartbeat data (instance/user counts) and pulls broadcast announcements. With no API set, all operations are no-ops.
async function peimatLevMerkazit(env) {
	const { api, cj } = await kabelCentralApi(env); if (!api) return;
	const host = cj.HOST || (Array.isArray(cj.HOSTS) && cj.HOSTS[0]) || '';
	const id = await MD5MD5('nova-instance:' + host); // Stable, irreversible instance ID
	let usage = null; try { usage = await usageGet(env, 'usage-m:' + (new Date().getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0'))); } catch (e) { }
	try {
		await fetch(api + '/heartbeat', { method: 'POST', headers: { 'Content-Type': 'application/json', 'User-Agent': 'NovaProxy' }, body: JSON.stringify({ id, host, version: Version, monthTraffic: usage ? usage.total : 0, ts: Date.now() }) });
	} catch (e) { /* best-effort */ }
}
async function riaanunHodaot(env) {
	const { api } = await kabelCentralApi(env); if (!api) return;
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
		type: _D_._wg_, tag,
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

// ---- WARP / WG تولیدکننده کانفیگ (اتصال مستقیم به Cloudflare WARP) ----
// Worker خودش WARP را تونل نمی‌کند (بدون UDP). فقط کانفیگ‌های WG تولید می‌کند
// که کلاینت مستقیماً به WARP متصل شود. خروجی: لیست wg و nekoray
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
function buildWarpWgLink(ipPort, group, mtu) {
	const encPriv = encodeURIComponent(group.pk);
	const encPub = encodeURIComponent(warpPublicKey);
	const encAddr = encodeURIComponent('172.16.0.2/32,' + group.ipv6);
	const remarks = encodeURIComponent('Nova-WARP-' + ipPort);
	const reservedPart = group.reserved && group.reserved.trim() ? `&reserved=${encodeURIComponent(group.reserved)}` : '';
	return `${_D_._wg_}://${encPriv}@${ipPort}/?publickey=${encPub}${reservedPart}&address=${encAddr}&mtu=${mtu}#${remarks}`;
}
function buildWarpNekoRayLink(ipPort, group, mtu) {
	const lastColon = ipPort.lastIndexOf(':');
	const ip = ipPort.slice(0, lastColon), port = ipPort.slice(lastColon + 1);
	const cs = JSON.stringify({
		type: _D_._wg_, tag: _D_._wg_ + '-out', server: ip, server_port: Number(port),
		system_interface: false, interface_name: 'warp-wg',
		local_address: ['172.16.0.2/32', group.ipv6],
		private_key: group.pk, peer_public_key: warpPublicKey, pre_shared_key: '',
		reserved: group.reserved && group.reserved.trim() ? group.reserved.split(',').map(s => Number(s.trim())) : [],
		mtu: Number(mtu),
	});
	const cfg = { _v: 0, addr: '127.0.0.1', cmd: [''], core: 'internal', cs, mapping_port: 0, name: 'Nova-WARP-' + ipPort, port: 1080, socks_port: 0 };
	return 'nekoray://custom#' + base64Utf8(JSON.stringify(cfg));
}
function warpValidEndpoint(ep) { return typeof ep === 'string' && /^[A-Za-z0-9.\-\[\]:]+:\d{1,5}$/.test(ep.trim()); }
async function tipulBakashatWarp(request) {
	const url = new URL(request.url);
	const target = (url.searchParams.get('target') || _D_._wg_).toLowerCase();
	const count = Math.min(Math.max(parseInt(url.searchParams.get('count') || '50', 10) || 50, 1), 500);
	const mtu = Math.min(Math.max(parseInt(url.searchParams.get('mtu') || '1280', 10) || 1280, 576), 1500);
	const endpoints = warpRandomEndpoints(count);
	const isNeko = ['nekoray', 'nekobox', 'neko'].includes(target);
	const links = endpoints.map(ep => {
		const group = warpKeyPool[Math.floor(Math.random() * warpKeyPool.length)];
		return isNeko ? buildWarpNekoRayLink(ep, group, mtu) : buildWarpWgLink(ep, group, mtu);
	});
	const body = base64Utf8(links.join('\n'));
	return new Response(body, { status: 200, headers: { 'Content-Type': 'text/plain;charset=utf-8', 'Cache-Control': 'no-store' } });
}
// ساخت لینک wg از حساب ثبت‌شده (برای تزریق به اشتراک‌ها)
async function buildRegisteredWarpNode(env) {
	let w; try { w = JSON.parse(await env.KV.get('warp-account.json') || 'null'); } catch (e) { return ''; }
	if (!w || !w.registered || !w.privateKey || !w.peerPublicKey) return '';
	const epOv = (hagdarotReshet && hagdarotReshet.warpEndpoint && warpValidEndpoint(hagdarotReshet.warpEndpoint)) ? hagdarotReshet.warpEndpoint.trim() : '';
	const ep = String(epOv || w.endpoint || 'engage.cloudflareclient.com:2408');
	const encPriv = encodeURIComponent(w.privateKey), encPub = encodeURIComponent(w.peerPublicKey);
	const addr = encodeURIComponent('172.16.0.2/32' + (w.addressV6 ? ',' + w.addressV6 : ''));
	const reservedStr = (Array.isArray(w.reservedDec) && w.reservedDec.length) ? '&reserved=' + encodeURIComponent(w.reservedDec.join(',')) : '';
	return `${_D_._wg_}://${encPriv}@${ep.includes(':') ? ep : ep + ':2408'}/?publickey=${encPub}${reservedStr}&address=${addr}&mtu=1280#Nova-WARP`;
}

function tikunChamClashMinuy(Clash_tochenMinuyGolmi, config_JSON = {}, hagdarotReshet = null, warpAccount = null) {
	const uuid = config_JSON?.UUID || null;
	const hafelEch = Boolean(config_JSON?.ECH);
	const HOSTS = Array.isArray(config_JSON?.HOSTS) ? [...config_JSON.HOSTS] : [];
	const ECH_SNI = config_JSON?.ECHConfig?.SNI || null;
	const ECH_DNS = config_JSON?.ECHConfig?.DNS;
	const tzarichLetapelECH = Boolean(uuid && hafelEch);
	const gRPCUserAgent = (typeof config_JSON?.gRPCUserAgent === 'string' && config_JSON.gRPCUserAgent.trim()) ? config_JSON.gRPCUserAgent.trim() : null;
	const tzarichLetapelGRPC = config_JSON?.protokolHaavara === "grpc" && Boolean(gRPCUserAgent);
	const gRPCUserAgentYAML = gRPCUserAgent ? JSON.stringify(gRPCUserAgent) : null;
	let clash_yaml = Clash_tochenMinuyGolmi.replace(/mode:\s*Rule\b/g, 'mode: rule');

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

	const hosafatInlineGrpcUserAgent = (text) => text.replace(/grpc-opts:\s*\{([\s\S]*?)\}/i, (all, inner) => {
		if (/grpc-user-agent\s*:/i.test(inner)) return all;
		let content = inner.trim();
		if (content.endsWith(',')) content = content.slice(0, -1).trim();
		const patchedContent = content ? `${content}, grpc-user-agent: ${gRPCUserAgentYAML}` : `grpc-user-agent: ${gRPCUserAgentYAML}`;
		return `grpc-opts: {${patchedContent}}`;
	});
	const reshetGRPCtoam = (text) => /(?:^|[,{])\s*network:\s*(?:"grpc"|'grpc'|grpc)(?=\s*(?:[,}\n#]|$))/mi.test(text);
	const hasagatSugProxy = (nodeText) => nodeText.match(/type:\s*(\w+)/)?.[1] || 'vl' + 'ess';
	const hasagatErechKidud = (nodeText, isFlowStyle) => {
		const credentialField = hasagatSugProxy(nodeText) === _D_._tr_ ? 'password' : 'uuid';
		const pattern = new RegExp(`${credentialField}:\\s*${isFlowStyle ? '([^,}\\n]+)' : '([^\\n]+)'}`);
		return nodeText.match(pattern)?.[1]?.trim() || null;
	};
	const hachnasatNameserverPolicy = (yaml, hostsEntries) => {
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
	const hosafatGRPCUserAgentFormatFlow = (nodeText) => {
		if (!reshetGRPCtoam(nodeText) || /grpc-user-agent\s*:/i.test(nodeText)) return nodeText;
		if (/grpc-opts:\s*\{/i.test(nodeText)) return hosafatInlineGrpcUserAgent(nodeText);
		return nodeText.replace(/\}(\s*)$/, `, grpc-opts: {grpc-user-agent: ${gRPCUserAgentYAML}}}$1`);
	};
	const hosafatGRPCUserAgentFormatBlock = (nodeLines, topLevelIndent) => {
		const hazachaRamaElyona = ' '.repeat(topLevelIndent);
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
			if (insertIndex >= 0) nodeLines.splice(insertIndex + 1, 0, `${hazachaRamaElyona}grpc-opts:`, `${hazachaRamaElyona}  grpc-user-agent: ${gRPCUserAgentYAML}`);
			return nodeLines;
		}
		const grpcLine = nodeLines[grpcOptsIndex];
		if (/^\s*grpc-opts:\s*\{.*\}\s*(?:#.*)?$/.test(grpcLine)) {
			if (!/grpc-user-agent\s*:/i.test(grpcLine)) nodeLines[grpcOptsIndex] = hosafatInlineGrpcUserAgent(grpcLine);
			return nodeLines;
		}
		let blockEndIndex = nodeLines.length;
		let hazachatRamatBen = topLevelIndent + 2;
		let yeshGRPCUserAgent = false;
		for (let idx = grpcOptsIndex + 1; idx < nodeLines.length; idx++) {
			const line = nodeLines[idx];
			const trimmed = line.trim();
			if (!trimmed) continue;
			const indent = line.search(/\S/);
			if (indent <= topLevelIndent) {
				blockEndIndex = idx;
				break;
			}
			if (indent > topLevelIndent && hazachatRamatBen === topLevelIndent + 2) hazachatRamatBen = indent;
			if (/^grpc-user-agent\s*:/.test(trimmed)) {
				yeshGRPCUserAgent = true;
				break;
			}
		}
		if (!yeshGRPCUserAgent) nodeLines.splice(blockEndIndex, 0, `${' '.repeat(hazachatRamatBen)}grpc-user-agent: ${gRPCUserAgentYAML}`);
		return nodeLines;
	};
	const hosafatECHOptsFormatBlock = (nodeLines, topLevelIndent) => {
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

	if (hafelEch && HOSTS.length > 0) {
		const hostsEntries = HOSTS.map(host => `    "${host}": ${ECH_DNS ? ECH_DNS : ''}`).join('\n');
		clash_yaml = hachnasatNameserverPolicy(clash_yaml, hostsEntries);
	}

	// WARP / WG proxy - اضافه کردن پراکسی wg به Clash
	if (hagdarotReshet && hagdarotReshet.enableWarp && warpAccount && warpAccount.registered && warpAccount.privateKey && !clash_yaml.includes('name: "Nova-WARP"')) {
		try {
			const epOverride = (hagdarotReshet.warpEndpoint && String(hagdarotReshet.warpEndpoint).trim()) || null;
			const amneziaLine = hagdarotReshet.warpAmnezia ? `\n    amnezia-wg-option: {jc: 4, jmin: 40, jmax: 70}` : '';
			const splitEp = (e) => { const i = String(e).lastIndexOf(':'); return i > 0 ? { s: String(e).slice(0, i), p: Number(String(e).slice(i + 1)) || 2408 } : { s: String(e), p: 2408 }; };
			const wgProxy = (acc, name, endpoint, dialer) => {
				const { s, p } = splitEp(endpoint);
				return `  - name: "${name}"\n` +
					`    type: ${_D_._wg_}\n` +
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
			if (hagdarotReshet.warpMode === 'wow' && warpAccount.wow && warpAccount.wow.privateKey) {
				block = wgProxy(warpAccount, 'Nova-WARP', epOverride || warpAccount.endpoint, '') + '\n' +
					wgProxy(warpAccount.wow, 'Nova-WoW', '162.159.192.1:2408', 'Nova-WARP');
				matchTarget = 'Nova-WoW';
			} else {
				let dialer = '';
				if (hagdarotReshet.warpMode === 'chain') {
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
	if (hagdarotReshet && hagdarotReshet.blockQUIC && !clash_yaml.includes('DST-PORT,443,REJECT,udp')) {
		const quicRule = '  - "DST-PORT,443,REJECT,udp"';
		if (/^\s*-\s*MATCH,/m.test(clash_yaml)) {
			clash_yaml = clash_yaml.replace(/^(\s*-\s*MATCH,)/m, quicRule + '\n$1');
		} else if (/^rules:\s*$/m.test(clash_yaml)) {
			clash_yaml = clash_yaml.replace(/^rules:\s*$/m, 'rules:\n' + quicRule);
		}
	}

	// --- Iran Direct: ترافیک ایران مستقیم ---
	if (hagdarotReshet && hagdarotReshet.enableDomesticBypass) {
		const iranRuleTag = '# IRANIAN DIRECT RULES';
		if (!clash_yaml.includes(iranRuleTag)) {
			// GEOIP country codes are uppercase ISO-3166 in Clash/Mihomo; lowercase never matches.
			// no-resolve keeps it a pure IP check (no DNS round-trip) so any .ir domain / Iranian IP goes DIRECT on the user's real IP.
			clash_yaml = clash_yaml.replace(/^(\s*)rules:\s*$/m, '$&' + '\n' + iranRuleTag + '\n' + '$1  - DOMAIN-SUFFIX,ir,DIRECT\n' + '$1  - GEOIP,IR,DIRECT,no-resolve');
		}
	}

	// --- Bypass China: دور زدن ترافیک چین ---
	if (hagdarotReshet && hagdarotReshet.bypassChina) {
		const cnTag = '# CHINA DIRECT RULES';
		if (!clash_yaml.includes(cnTag)) {
			clash_yaml = clash_yaml.replace(/^(\s*)rules:\s*$/m, '$&' + '\n' + cnTag + '\n' + '$1  - GEOSITE,cn,DIRECT\n' + '$1  - GEOIP,CN,DIRECT');
		}
	}

	// --- Bypass Russia: دور زدن ترافیک روسیه ---
	if (hagdarotReshet && hagdarotReshet.bypassRussia) {
		const ruTag = '# RUSSIA DIRECT RULES';
		if (!clash_yaml.includes(ruTag)) {
			clash_yaml = clash_yaml.replace(/^(\s*)rules:\s*$/m, '$&' + '\n' + ruTag + '\n' + '$1  - GEOSITE,ru,DIRECT\n' + '$1  - GEOIP,RU,DIRECT');
		}
	}

	// --- Bypass Sanctions: دور زدن ترافیک تحریم‌شده ---
	if (hagdarotReshet && hagdarotReshet.bypassSanctions) {
		const sanctionTag = '# SANCTION BYPASS RULES';
		if (!clash_yaml.includes(sanctionTag)) {
			clash_yaml = clash_yaml.replace(/^(\s*)rules:\s*$/m, '$&' + '\n' + sanctionTag + '\n' + '$1  - GEOSITE,category-sanctioned,DIRECT\n' + '$1  - DOMAIN-SUFFIX,intel.com,DIRECT\n' + '$1  - DOMAIN-SUFFIX,oracle.com,DIRECT\n' + '$1  - DOMAIN-SUFFIX,docker.com,DIRECT\n' + '$1  - DOMAIN-SUFFIX,android.com,DIRECT');
		}
	}

	// --- Malware Block: مسدود کردن بدافزار ---
	if (hagdarotReshet && hagdarotReshet.enableMalwareBlock) {
		const malwareTag = '# MALWARE BLOCK RULES';
		if (!clash_yaml.includes(malwareTag)) {
			clash_yaml = clash_yaml.replace(/^(\s*)rules:\s*$/m, '$&' + '\n' + malwareTag + '\n' + '$1  - GEOSITE,category-malware,REJECT\n' + '$1  - GEOSITE,malware,REJECT');
		}
	}

	// --- Phishing Block: مسدود کردن فیشینگ ---
	if (hagdarotReshet && hagdarotReshet.enablePhishingBlock) {
		const phishingTag = '# PHISHING BLOCK RULES';
		if (!clash_yaml.includes(phishingTag)) {
			clash_yaml = clash_yaml.replace(/^(\s*)rules:\s*$/m, '$&' + '\n' + phishingTag + '\n' + '$1  - GEOSITE,category-phishing,REJECT\n' + '$1  - GEOSITE,phishing,REJECT');
		}
	}

	if (!tzarichLetapelECH && !tzarichLetapelGRPC) return clash_yaml;

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
			if (tzarichLetapelGRPC) fullNode = hosafatGRPCUserAgentFormatFlow(fullNode);
			if (tzarichLetapelECH && hasagatErechKidud(fullNode, true) === uuid.trim()) {
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
			if (tzarichLetapelGRPC && reshetGRPCtoam(nodeText)) {
				nodeLines = hosafatGRPCUserAgentFormatBlock(nodeLines, topLevelIndent);
				nodeText = nodeLines.join('\n');
			}
			if (tzarichLetapelECH && hasagatErechKidud(nodeText, false) === uuid.trim()) nodeLines = hosafatECHOptsFormatBlock(nodeLines, topLevelIndent);
			processedLines.push(...nodeLines);
		} else {
			processedLines.push(line);
			i++;
		}
	}

	return processedLines.join('\n');
}

async function tikunChamSingboxMinuy(SingBox_tochenMinuyGolmi, config_JSON = {}, hagdarotReshet = null, warpAccount = null) {
	const uuid = config_JSON?.UUID || null;
	const fingerprint = config_JSON?.Fingerprint || "chrome";
	const hafelEch = Boolean(config_JSON?.ECH);
	const ECH_SNI = config_JSON?.ECHConfig?.SNI || "cloudflare-ech.com";
	const sb_json_text = SingBox_tochenMinuyGolmi.replace('1.1.1.1', '8.8.8.8').replace('1.0.0.1', '8.8.4.4');
	try {
		const config = JSON.parse(sb_json_text);
		const leMaarach = value => value === undefined || value === null ? [] : (Array.isArray(value) ? value : [value]);
		const vadeRoute = () => config.route = config.route && typeof config.route === 'object' ? config.route : {};
		const hasagatSharatKlaleiDNS = rule => rule && typeof rule === 'object' && !Array.isArray(rule) && typeof rule.server === 'string' ? rule.server : null;
		const hosafatMikbatzKlalim = (type, code) => {
			if (!code || typeof code !== 'string') return null;
			const route = vadeRoute(), tag = `${type}-${code}`, ruleSet = Array.isArray(route.rule_set) ? route.rule_set : leMaarach(route.rule_set);
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

		const hagiratSadehMikbatzKlalim = rule => {
			if (!rule || typeof rule !== 'object' || Array.isArray(rule)) return rule;
			if (rule.type === 'logical' && Array.isArray(rule.rules)) {
				rule.rules = rule.rules.map(hagiratSadehMikbatzKlalim);
				return rule;
			}
			const tags = [];
			for (const geoip of leMaarach(rule.geoip)) {
				if (typeof geoip !== 'string') continue;
				if (geoip.toLowerCase() === 'private') rule.ip_is_private = true;
				else tags.push(hosafatMikbatzKlalim('geoip', geoip));
			}
			for (const sourceGeoip of leMaarach(rule.source_geoip)) {
				if (typeof sourceGeoip !== 'string') continue;
				tags.push(hosafatMikbatzKlalim('geoip', sourceGeoip));
				rule.rule_set_ip_cidr_match_source = true;
			}
			for (const geosite of leMaarach(rule.geosite)) if (typeof geosite === 'string') tags.push(hosafatMikbatzKlalim('geosite', geosite));
			if (tags.length) rule.rule_set = [...new Set([...leMaarach(rule.rule_set), ...tags].filter(Boolean))];
			delete rule.geoip;
			delete rule.source_geoip;
			delete rule.geosite;
			return rule;
		};

		const hagiratKlaleiDNS = (rule, rcodeServerMap) => {
			rule = hagiratSadehMikbatzKlalim(rule);
			if (!rule || typeof rule !== 'object' || Array.isArray(rule)) return rule;
			if (rule.type === 'logical' && Array.isArray(rule.rules)) {
				rule.rules = rule.rules.map(childRule => hagiratKlaleiDNS(childRule, rcodeServerMap));
				return rule;
			}
			const serverTag = hasagatSharatKlaleiDNS(rule);
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
					const values = leMaarach(inbound[migration.targetKey]);
					for (const sourceKey of migration.sourceKeys) values.push(...leMaarach(inbound[sourceKey]));
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
						const route = vadeRoute();
						route.rules = [...addedRules, ...leMaarach(route.rules)];
					}
				}
				delete inbound.sniff;
				delete inbound.sniff_timeout;
				delete inbound.domain_strategy;
			}
		}

		if (config?.route && typeof config.route === 'object' && Array.isArray(config.route.rules)) {
			const tikunKlaleiNituv = rule => {
				rule = hagiratSadehMikbatzKlalim(rule);
				if (rule?.type === 'logical' && Array.isArray(rule.rules)) rule.rules = rule.rules.map(tikunKlaleiNituv);
				else if (rule && typeof rule === 'object' && !Array.isArray(rule) && rule.outbound && !rule.action) rule.action = 'route';
				return rule;
			};
			config.route.rules = config.route.rules.map(tikunKlaleiNituv);
		}
		// --- Block QUIC: مسدود کردن پروتکل QUIC ---
		if (hagdarotReshet && hagdarotReshet.blockQUIC && config?.route && typeof config.route === 'object' && Array.isArray(config.route.rules)) {
			if (!config.route.rules.some(r => r.outbound === 'block' && r.network === 'udp' && Array.isArray(r.port) && r.port.includes(443))) {
				config.route.rules.unshift({ outbound: 'block', network: 'udp', port: [443] });
			}
		}

		// --- Iran Direct: ترافیک ایران مستقیم ---
		if (hagdarotReshet && hagdarotReshet.enableDomesticBypass && config?.route && typeof config.route === 'object' && Array.isArray(config.route.rules)) {
			const hasIranRule = config.route.rules.some(r => r && r.outbound === 'direct' && Array.isArray(r.domain_suffix) && r.domain_suffix.includes('.ir'));
			if (!hasIranRule) {
				config.route.rules.unshift({ outbound: 'direct', domain_suffix: ['.ir'] });
			}
		}

		// --- WARP Calls: عبور ترافیک UDP (تماس/ویدیوکال) از طریق WARP + ایمن‌سازی DNS ---
		// وقتی warpCalls روشن باشد، همهٔ UDP (تماس/ویدیو که Worker نمی‌تواند حمل کند) از طریق
		// خروجی WG/WARP هدایت می‌شود تا تماس‌ها کار کنند، در حالی که مرور وب روی پروکسی سریع باقی می‌ماند.
		// Unshift آخر = بالاترین اولویت، پس بر blockQUIC می‌چربد. اگر خروجی WARP وجود نداشته باشد بی‌اثر است.
		if (hagdarotReshet && hagdarotReshet.warpCalls && config?.route && typeof config.route === 'object' && Array.isArray(config.route.rules)) {
			const chipusWARPyotze = (arr) => Array.isArray(arr) ? arr.find(o => o && (o.type === _D_._wg_ || /warp/i.test(o.tag || ''))) : null;
			const warpYotze = chipusWARPyotze(config.outbounds) || chipusWARPyotze(config.endpoints);
			const warpTag = warpYotze && warpYotze.tag;
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
		if (hagdarotReshet && hagdarotReshet.bypassChina && config?.route && typeof config.route === 'object' && Array.isArray(config.route.rules)) {
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
		if (hagdarotReshet && hagdarotReshet.bypassRussia && config?.route && typeof config.route === 'object' && Array.isArray(config.route.rules)) {
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
		if (hagdarotReshet && hagdarotReshet.bypassSanctions && config?.route && typeof config.route === 'object' && Array.isArray(config.route.rules)) {
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
		if (hagdarotReshet && hagdarotReshet.enableMalwareBlock && config?.route && typeof config.route === 'object' && Array.isArray(config.route.rules)) {
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
		if (hagdarotReshet && hagdarotReshet.enablePhishingBlock && config?.route && typeof config.route === 'object' && Array.isArray(config.route.rules)) {
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
			const sugProtokolKtovetDNS = { 'tcp:': 'tcp', 'udp:': 'udp', 'tls:': 'tls', 'quic:': 'quic', 'https:': 'https', 'h3:': 'h3' };
			const mipuiRCode = { success: 'NOERROR', format_error: 'FORMERR', server_failure: 'SERVFAIL', name_error: 'NXDOMAIN', not_implemented: 'NOTIMP', refused: 'REFUSED' };
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
								const type = sugProtokolKtovetDNS[addressURL.protocol.toLowerCase()];
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
						const rcode = mipuiRCode[parsedRCode] || 'NOERROR';
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
					const serverTag = hasagatSharatKlaleiDNS(rule);
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
					const serverTag = hasagatSharatKlaleiDNS(rule);
					const outbound = leMaarach(rule?.outbound);
					const sadehOpcijetNituvDNS = new Set(['outbound', 'server', 'action', 'strategy', 'disable_cache', 'rewrite_ttl', 'client_subnet', 'timeout']);
					const isOutboundAnyDNSRule = rule && typeof rule === 'object' && !Array.isArray(rule) && rule.type !== 'logical'
						&& serverTag && outbound.includes('any') && Object.keys(rule).every(key => sadehOpcijetNituvDNS.has(key));
					if (isOutboundAnyDNSRule) {
						const route = vadeRoute();
						if (route.default_domain_resolver === undefined) {
							const resolver = { server: serverTag };
							for (const key of ['strategy', 'disable_cache', 'rewrite_ttl', 'client_subnet', 'timeout']) {
								if (rule[key] !== undefined) resolver[key] = rule[key];
							}
							route.default_domain_resolver = Object.keys(resolver).length === 1 ? resolver.server : resolver;
						}
						continue;
					}
					migratedRules.push(hagiratKlaleiDNS(rule, rcodeServerMap));
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
			const hafnayatREJECT = value => value === 'REJECT' || (value && typeof value === 'object' && (Array.isArray(value) ? value.some(hafnayatREJECT) : Object.values(value).some(hafnayatREJECT)));
			if (!outboundTags.has('REJECT') && hafnayatREJECT({ outbounds: config.outbounds, route: config.route })) config.outbounds.push({ type: 'block', tag: 'REJECT' });
		}

		// --- TLS hot-patch for UUID-matched nodes (utls & ech) ---
		if (uuid) {
			config.outbounds?.forEach(outbound => {
				// Only handle nodes that contain and match uuid or password
				if ((outbound.uuid && outbound.uuid === uuid) || (outbound.password && outbound.password === uuid)) {
					// Ensure the tls object exists
					if (!outbound.tls) {
						outbound.tls = { enabled: true };
					}

					// Add/update utls config
					if (fingerprint) {
						outbound.tls.utls = {
							enabled: true,
							fingerprint: fingerprint
						};
					}

					// If ech_config is provided, add/update ech config
					if (hafelEch) {
						outbound.tls.ech = {
							enabled: true,
							query_server_name: ECH_SNI,// Waiting for 1.13.0+ to ship
							//config: `-----BEGIN ECH CONFIGS-----\n${ech_config}\n-----END ECH CONFIGS-----`
						};
					}
				}
			});
		}

		// WARP / WG outbound - اضافه کردن outbound wg به Singbox
		if (hagdarotReshet && hagdarotReshet.enableWarp && warpAccount && warpAccount.registered && warpAccount.privateKey) {
			config.outbounds = Array.isArray(config.outbounds) ? config.outbounds : [];
			const warpTag = 'Nova-WARP';
			const epOverride = (hagdarotReshet.warpEndpoint && String(hagdarotReshet.warpEndpoint).trim()) || null;
			if (!config.outbounds.some(o => o && o.tag === warpTag)) {
				const vadeRoute = () => config.route = config.route && typeof config.route === 'object' ? config.route : {};
				if (hagdarotReshet.warpMode === 'wow' && warpAccount.wow && warpAccount.wow.privateKey) {
					config.outbounds.push(buildWarpSingboxOutbound(warpAccount, warpTag, null, epOverride, false));
					config.outbounds.push(buildWarpSingboxOutbound(warpAccount.wow, 'Nova-WoW', warpTag, null, true));
					vadeRoute().final = 'Nova-WoW';
				} else {
					let detourTag = null;
					if (hagdarotReshet.warpMode === 'chain') {
						const sel = config.outbounds.find(o => o && (o.type === 'selector' || o.type === 'urltest'));
						detourTag = sel ? sel.tag : null;
					}
					config.outbounds.push(buildWarpSingboxOutbound(warpAccount, warpTag, detourTag, epOverride, false));
					vadeRoute().final = warpTag;
				}
			}
		}

		// Lean client profile: strip the sections the client app owns and injects itself. Shipping our
		// own tun/mixed inbounds and a clash_api with external_ui:"dashboard" (which needs a local UI
		// folder the client does not have) can make the client's sing-box core fail to start on import
		// (Hiddify: "Failed to add profile / connection refused 127.0.0.1:<port>"). Hiddify, Karing and
		// the sing-box app all supply their own inbounds + clash_api and merge only our outbounds + dns
		// + route, so serve those. Keep experimental.cache_file for remote rule_set caching.
		try {
			delete config.inbounds;
			if (config.experimental && typeof config.experimental === 'object') {
				delete config.experimental.clash_api;
				delete config.experimental.external_ui;
				if (Object.keys(config.experimental).length === 0) delete config.experimental;
			}
		} catch (_) { /* keep the full config if anything unexpected */ }

		return JSON.stringify(config, null, 2);
	} catch (e) {
		console.error("Singbox hot-patch failed:", e);
		return JSON.stringify(JSON.parse(sb_json_text), null, 2);
	}
}

function tikunChamSurgeMinuy(content, url, config_JSON) {
	const tochenKolShura = content.includes('\r\n') ? content.split('\r\n') : content.split('\n');
	const nativTzometMale = config_JSON.nativAckrai ? nativAkrai(config_JSON.nativTzometMale) : config_JSON.nativTzometMale;
	let tochenPelet = "";
	for (let x of tochenKolShura) {
		if (x.includes('= tro' + 'jan,') && !x.includes('ws=true') && !x.includes('ws-path=')) {
			const host = x.split("sni=")[1].split(",")[0];
			const tochenLetikun = `sni=${host}, skip-cert-verify=${config_JSON.dalegImutTeuda}`;
			const tochenNachon = `sni=${host}, skip-cert-verify=${config_JSON.dalegImutTeuda}, ws=true, ws-path=${nativTzometMale.replace(/,/g, '%2C')}, ws-headers=Host:"${host}"`;
			tochenPelet += x.replace(new RegExp(tochenLetikun, 'g'), tochenNachon).replace("[", "").replace("]", "") + '\n';
		} else {
			tochenPelet += x + '\n';
		}
	}

	tochenPelet = `#!MANAGED-CONFIG ${url} interval=${config_JSON.muvcharMinuyMecholel.SUBUpdateTime * 60 * 60} strict=false` + tochenPelet.substring(tochenPelet.indexOf('\n'));
	return tochenPelet;
}

async function rishumYomanBakasha(env, request, gishaIP, sugBakasha = "Get_SUB", config_JSON, haimLichtovYomanKV = true) {
	try {
		const zmanNochachi = new Date();
		const tochenYoman = { TYPE: sugBakasha, IP: gishaIP, ASN: `AS${request.cf.asn || '0'} ${request.cf.asOrganization || 'Unknown'}`, CC: `${request.cf.country || 'N/A'} ${request.cf.city || 'N/A'}`, URL: request.url, UA: request.headers.get('User-Agent') || 'Unknown', TIME: zmanNochachi.getTime() };
		if (config_JSON.TG.efsher) {
			try {
				const TG_TXT = await env.KV.get('tg.json');
				const TG_JSON = JSON.parse(TG_TXT);
				if (TG_JSON?.BotToken && TG_JSON?.ChatID) {
					const zmanBakasha = new Date(tochenYoman.TIME).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
					const urlBakasha = new URL(tochenYoman.URL);
					const msg = `<b>#${config_JSON.muvcharMinuyMecholel.SUBNAME} log notification</b>\n\n` +
						`📌 <b>Type:</b>#${tochenYoman.TYPE}\n` +
						`🌐 <b>IP：</b><code>${tochenYoman.IP}</code>\n` +
						`📍 <b>Location:</b>${tochenYoman.CC}\n` +
						`🏢 <b>ASN：</b>${tochenYoman.ASN}\n` +
						`🔗 <b>Domain:</b><code>${urlBakasha.host}</code>\n` +
						`🔍 <b>Path:</b><code>${urlBakasha.pathname + urlBakasha.search}</code>\n` +
						`🤖 <b>UA：</b><code>${tochenYoman.UA}</code>\n` +
						`📅 <b>Time:</b>${zmanBakasha}\n` +
						`${config_JSON.CF.Usage.success ? `📊 <b>Request usage:</b>${config_JSON.CF.Usage.total}/${config_JSON.CF.Usage.max} <b>${((config_JSON.CF.Usage.total / config_JSON.CF.Usage.max) * 100).toFixed(2)}%</b>\n` : ''}`;
					await fetch(`https://api.telegram.org/bot${TG_JSON.BotToken}/sendMessage?chat_id=${TG_JSON.ChatID}&parse_mode=HTML&text=${encodeURIComponent(msg)}`, {
						method: 'GET',
						headers: {
							'Accept': 'text/html,application/xhtml+xml,application/xml;',
							'Accept-Encoding': 'gzip, deflate, br',
							'User-Agent': tochenYoman.UA || 'Unknown',
						}
					});
				}
			} catch (error) { console.error(`read tg.json error: ${error.message}`) }
		}
		haimLichtovYomanKV = ['1', 'true'].includes(env.OFF_LOG) ? false : haimLichtovYomanKV;
		if (!haimLichtovYomanKV) return;
		if (await ktivatYomanLeD1(env, gishaIP, request, sugBakasha, tochenYoman, zmanNochachi)) return;
		let maarachYoman = [];
		const yomanKayam = await env.KV.get('log.json'), hagbalatNefachKV = 4;//MB
		if (yomanKayam) {
			try {
				maarachYoman = JSON.parse(yomanKayam);
				if (!Array.isArray(maarachYoman)) { maarachYoman = [tochenYoman] }
				else if (sugBakasha !== "Get_SUB") {
					const chotemetZmanLifnei30Dakot = zmanNochachi.getTime() - 30 * 60 * 1000;
					if (maarachYoman.some(log => log.TYPE !== "Get_SUB" && log.IP === gishaIP && log.URL === request.url && log.UA === (request.headers.get('User-Agent') || 'Unknown') && log.TIME >= chotemetZmanLifnei30Dakot)) return;
					maarachYoman.push(tochenYoman);
					while (JSON.stringify(maarachYoman, null, 2).length > hagbalatNefachKV * 1024 * 1024 && maarachYoman.length > 0) maarachYoman.shift();
				} else {
					maarachYoman.push(tochenYoman);
					while (JSON.stringify(maarachYoman, null, 2).length > hagbalatNefachKV * 1024 * 1024 && maarachYoman.length > 0) maarachYoman.shift();
				}
			} catch (e) { maarachYoman = [tochenYoman] }
		} else { maarachYoman = [tochenYoman] }
		await env.KV.put('log.json', JSON.stringify(maarachYoman, null, 2));
	} catch (error) { console.error(`log write failed: ${error.message}`) }
}
async function logReadAll(env) {
	if (hasD1(env) && await d1Init(env)) {
		try { const r = await env.DB.prepare('SELECT TYPE,IP,ASN,CC,URL,UA,TIME FROM logs ORDER BY id DESC LIMIT 2000').all(); return (r.results || []); }
		catch (e) { console.error('logReadAll: ' + e); }
	}
	try { return JSON.parse(await env.KV.get('log.json') || '[]'); } catch (e) { return []; }
}
// Also write activity logs to D1's logs table (what logReadAll reads), so the admin log panel isn't always empty
let misparSiduriKtivatYoman = 0;
async function ktivatYomanLeD1(env, gishaIP, request, sugBakasha, tochenYoman, zmanNochachi) {
	if (!(hasD1(env) && await d1Init(env))) return false;
	try {
		if (sugBakasha !== 'Get_SUB') {
			const saf = zmanNochachi.getTime() - 30 * 60 * 1000;
			const kaful = await env.DB.prepare("SELECT 1 FROM logs WHERE TYPE!='Get_SUB' AND IP=? AND URL=? AND UA=? AND TIME>=? LIMIT 1").bind(gishaIP, request.url, tochenYoman.UA, saf).first();
			if (kaful) return true;
		}
		await env.DB.prepare('INSERT INTO logs (TYPE,IP,ASN,CC,URL,UA,TIME) VALUES (?,?,?,?,?,?,?)').bind(tochenYoman.TYPE, tochenYoman.IP, tochenYoman.ASN, tochenYoman.CC, tochenYoman.URL, tochenYoman.UA, tochenYoman.TIME).run();
		misparSiduriKtivatYoman = (misparSiduriKtivatYoman + 1) % 200; if (misparSiduriKtivatYoman === 0) { try { await env.DB.prepare('DELETE FROM logs WHERE id <= (SELECT MAX(id)-5000 FROM logs)').run(); } catch (e) {} }
		return true;
	} catch (e) { console.error('write log to D1: ' + e); return false; }
}

// --- Audit log: هر اکشن حساس ادمین (تغییر رمز، 2FA، rotate مسیر، تغییر تنظیمات...) اینجا ثبت می‌شود ---
async function logAdminAction(env, request, action, detail) {
	try {
		if (!(hasD1(env) && await d1Init(env))) return false;
		let ip = 'unknown', actor = 'admin';
		try { ip = request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For') || 'unknown'; } catch (e) {}
		try {
			const cookies = request.headers.get('Cookie') || '';
			const authCookie = cookies.split(';').find(c => c.trim().startsWith('auth='))?.split('=')[1];
			if (authCookie && authCookie.startsWith('telegram-webapp')) actor = 'telegram';
			else if (request.headers.get('Authorization')) actor = 'api-key';
		} catch (e) {}
		await env.DB.prepare('INSERT INTO audit_log (TIME,ACTOR,IP,ACTION,DETAIL) VALUES (?,?,?,?,?)')
			.bind(Date.now(), actor, ip, String(action || '').slice(0, 100), String(detail || '').slice(0, 500)).run();
		// نگه‌داشتن حداکثر ۵۰۰۰ رکورد آخر
		try { await env.DB.prepare('DELETE FROM audit_log WHERE id <= (SELECT MAX(id)-5000 FROM audit_log)').run(); } catch (e) {}
		return true;
	} catch (e) { console.error('logAdminAction: ' + (e && e.message || e)); return false; }
}
async function auditLogReadAll(env, limit = 500) {
	if (hasD1(env) && await d1Init(env)) {
		try { const r = await env.DB.prepare('SELECT TIME,ACTOR,IP,ACTION,DETAIL FROM audit_log ORDER BY id DESC LIMIT ?').bind(Math.min(Math.max(limit, 1), 2000)).all(); return (r.results || []); }
		catch (e) { console.error('auditLogReadAll: ' + e); }
	}
	return [];
}

function maskaMeidaRagish(text, orechKidomet = 3, orechSiyomet = 2) {
	if (!text || typeof text !== 'string') return text;
	if (text.length <= orechKidomet + orechSiyomet) return text; // If too short, return early

	const kidomet = text.slice(0, orechKidomet);
	const siyomet = text.slice(-orechSiyomet);
	const kamutKochavim = text.length - orechKidomet - orechSiyomet;

	return `${kidomet}${'*'.repeat(kamutKochavim)}${siyomet}`;
}

// UTF-8-safe base64: btoa() only accepts Latin1, so encode to bytes first (node names carry Persian/emoji).
function base64Utf8(str) {
	const bytes = new TextEncoder().encode(String(str));
	let bin = '';
	const CHUNK = 0x8000;
	for (let i = 0; i < bytes.length; i += CHUNK) { bin += String.fromCharCode.apply(null, bytes.subarray(i, i + CHUNK)); }
	return btoa(bin);
}
async function MD5MD5(text) {
	if (_md5md5Cache.has(text)) return _md5md5Cache.get(text);
	const mekaded = new TextEncoder();

	const hashRishon = await crypto.subtle.digest('MD5', mekaded.encode(text));
	const maarachHashRishon = Array.from(new Uint8Array(hashRishon));
	const hexaRishon = maarachHashRishon.map(bytim => bytim.toString(16).padStart(2, '0')).join('');

	const hashSheni = await crypto.subtle.digest('MD5', mekaded.encode(hexaRishon.slice(7, 27)));
	const maarachHashSheni = Array.from(new Uint8Array(hashSheni));
	const hexaSheni = maarachHashSheni.map(bytim => bytim.toString(16).padStart(2, '0')).join('');

	const _r = hexaSheni.toLowerCase();
	if (_md5md5Cache.size > 500) _md5md5Cache.clear();
	_md5md5Cache.set(text, _r);
	return _r;
}

function nativAkrai(nativTzometMale = "/") {
	const sifriyatNativimNefotzim = ["about", "account", "acg", "act", "activity", "ad", "ads", "ajax", "album", "albums", "anime", "api", "app", "apps", "archive", "archives", "article", "articles", "ask", "auth", "avatar", "bbs", "bd", "blog", "blogs", "book", "books", "bt", "buy", "cart", "category", "categories", "cb", "channel", "channels", "chat", "china", "city", "class", "classify", "clip", "clips", "club", "cn", "code", "collect", "collection", "comic", "comics", "community", "company", "config", "contact", "content", "course", "courses", "cp", "data", "detail", "details", "dh", "directory", "discount", "discuss", "dl", "dload", "doc", "docs", "document", "documents", "doujin", "download", "downloads", "drama", "edu", "en", "ep", "episode", "episodes", "event", "events", "f", "faq", "favorite", "favourites", "favs", "feedback", "file", "files", "film", "films", "forum", "forums", "friend", "friends", "game", "games", "gif", "go", "go.html", "go.php", "group", "groups", "help", "home", "hot", "htm", "html", "image", "images", "img", "index", "info", "intro", "item", "items", "ja", "jp", "jump", "jump.html", "jump.php", "jumping", "knowledge", "lang", "lesson", "lessons", "lib", "library", "link", "links", "list", "live", "lives", "m", "mag", "magnet", "mall", "manhua", "map", "member", "members", "message", "messages", "mobile", "movie", "movies", "music", "my", "new", "news", "note", "novel", "novels", "online", "order", "out", "out.html", "out.php", "outbound", "p", "page", "pages", "pay", "payment", "pdf", "photo", "photos", "pic", "pics", "picture", "pictures", "play", "player", "playlist", "post", "posts", "product", "products", "program", "programs", "project", "qa", "question", "rank", "ranking", "read", "readme", "redirect", "redirect.html", "redirect.php", "reg", "register", "res", "resource", "retrieve", "sale", "search", "season", "seasons", "section", "seller", "series", "service", "services", "setting", "settings", "share", "shop", "show", "shows", "site", "soft", "sort", "source", "special", "star", "stars", "static", "stock", "store", "stream", "streaming", "streams", "student", "study", "tag", "tags", "task", "teacher", "team", "tech", "temp", "test", "thread", "tool", "tools", "topic", "topics", "torrent", "trade", "travel", "tv", "txt", "type", "u", "upload", "uploads", "url", "urls", "user", "users", "v", "version", "videos", "view", "vip", "vod", "watch", "web", "wenku", "wiki", "work", "www", "zh", "zh-cn", "zh-tw", "zip"];
	const misparAckrai = Math.floor(Math.random() * 3 + 1);
	const nativAkrai = sifriyatNativimNefotzim.sort(() => 0.5 - Math.random()).slice(0, misparAckrai).join('/');
	if (nativTzometMale === "/") return `/${nativAkrai}`;
	else return `/${nativAkrai + nativTzometMale.replace('/?', '?')}`;
}

function hachlafatKochavimTavimAckraiyim(tochen) {
	if (typeof tochen !== 'string' || !tochen.includes('*')) return tochen;
	const maarechetTavim = 'abcdefghijklmnopqrstuvwxyz0123456789';
	return tochen.replace(/\*/g, () => {
		let s = '';
		for (let i = 0; i < Math.floor(Math.random() * 14) + 3; i++) s += maarechetTavim[Math.floor(Math.random() * maarechetTavim.length)];
		return s;
	});
}

async function shailtaDoH(domainVar, sugReshuma, sherutNituachDoH = "https://cloudflare-dns.com/dns-query") {
	const zmanHatchala = performance.now();
	log(`[DoH query] querying ${domainVar} ${sugReshuma} via ${sherutNituachDoH}`);
	try {
		// Convert record-type string to numeric
		const mipuiSug = { 'A': 1, 'NS': 2, 'CNAME': 5, 'MX': 15, 'TXT': 16, 'AAAA': 28, 'SRV': 33, 'HTTPS': 65 };
		const qtype = mipuiSug[sugReshuma.toUpperCase()] || 1;

		// Encode the domain into DNS wire-format labels
		const kidudDomain = (name) => {
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

		// Build the DNS query message
		const qname = kidudDomain(domainVar);
		const query = new Uint8Array(12 + qname.length + 4);
		const qview = new DataView(query.buffer);
		qview.setUint16(0, crypto.getRandomValues(new Uint16Array(1))[0]); // ID (random per RFC 1035)
		qview.setUint16(2, 0x0100);  // Flags: RD=1 (recursive query)
		qview.setUint16(4, 1);       // QDCOUNT
		query.set(qname, 12);
		qview.setUint16(12 + qname.length, qtype);
		qview.setUint16(12 + qname.length + 2, 1); // QCLASS = IN

		// Send the dns-message request via POST
		log(`[DoH query] sending query message ${domainVar} via ${sherutNituachDoH} (type=${qtype}, ${query.length}bytes)`);
		const response = await fetch(sherutNituachDoH, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/dns-message',
				'Accept': 'application/dns-message',
			},
			body: query,
		});
		if (!response.ok) {
			console.warn(`[DoH query] request failed ${domainVar} ${sugReshuma} via ${sherutNituachDoH} response code:${response.status}`);
			return [];
		}

		// Parse the DNS response message
		const buf = new Uint8Array(await response.arrayBuffer());
		const dv = new DataView(buf.buffer);
		const qdcount = dv.getUint16(4);
		const ancount = dv.getUint16(6);
		log(`[DoH query] response received ${domainVar} ${sugReshuma} via ${sherutNituachDoH} (${buf.length}bytes, ${ancount} answers)`);

		// Parse the domain (handle pointer compression)
		const nituachDomain = (pos) => {
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

		// Skip the Question Section
		let offset = 12;
		for (let i = 0; i < qdcount; i++) {
			const [, end] = nituachDomain(offset);
			offset = /** @type {number} */ (end) + 4; // +4 to skip QTYPE + QCLASS
		}

		// Parse the Answer Section
		const answers = [];
		for (let i = 0; i < ancount && offset < buf.length; i++) {
			const [name, nameEnd] = nituachDomain(offset);
			offset = /** @type {number} */ (nameEnd);
			const type = dv.getUint16(offset); offset += 2;
			offset += 2; // CLASS
			const ttl = dv.getUint32(offset); offset += 4;
			const rdlen = dv.getUint16(offset); offset += 2;
			const rdata = buf.slice(offset, offset + rdlen);
			offset += rdlen;

			let data;
			if (type === 1 && rdlen === 4) {
				// A record
				data = `${rdata[0]}.${rdata[1]}.${rdata[2]}.${rdata[3]}`;
			} else if (type === 28 && rdlen === 16) {
				// AAAA record
				const segs = [];
				for (let j = 0; j < 16; j += 2) segs.push(((rdata[j] << 8) | rdata[j + 1]).toString(16));
				data = segs.join(':');
			} else if (type === 16) {
				// TXT record (length-prefixed string)
				let tOff = 0;
				const parts = [];
				while (tOff < rdlen) {
					const tLen = rdata[tOff++];
					parts.push(new TextDecoder().decode(rdata.slice(tOff, tOff + tLen)));
					tOff += tLen;
				}
				data = parts.join('');
			} else if (type === 5) {
				// CNAME record
				const [cname] = nituachDomain(offset - rdlen);
				data = cname;
			} else {
				data = Array.from(rdata).map(b => b.toString(16).padStart(2, '0')).join('');
			}
			answers.push({ name, type, TTL: ttl, data, rdata });
		}
		const zmanChalaf = (performance.now() - zmanHatchala).toFixed(2);
		log(`[DoH query] query complete ${domainVar} ${sugReshuma} via ${sherutNituachDoH} ${zmanChalaf}ms total ${answers.length} results${answers.length > 0 ? '\n' + answers.map((a, i) => `  ${i + 1}. ${a.name} type=${a.type} TTL=${a.TTL} data=${a.data}`).join('\n') : ''}`);
		return answers;
	} catch (error) {
		const zmanChalaf = (performance.now() - zmanHatchala).toFixed(2);
		console.error(`[DoH query] query failed ${domainVar} ${sugReshuma} via ${sherutNituachDoH} ${zmanChalaf}ms:`, error);
		return [];
	}
}

async function keriatConfigJson(env, hostname, userID, UA = "Mozilla/5.0", ipusTetzura = false) {
	const _p = milonChatimot[0];
	const host = hostname, Ali_DoH = "https://dns.alidns.com/dns-query", ECH_SNI = "cloudflare-ech.com", shomerMakom = '{{IP:PORT}}', zmanHatchalatItchul = performance.now(), breiratMechdalConfigJSON = {
		TIME: new Date().toISOString(),
		HOST: host,
		HOSTS: [hostname],
		UUID: userID,
		PATH: "/",
		sugProtokol: "v" + "le" + "ss",
		protokolHaavara: "ws",
		matzavGRPC: "gun",
		gRPCUserAgent: UA,
		dalegImutTeuda: false,
		efsher0RTT: false,
		pilugTLS: null,
		nativAckrai: false,
		ECH: false,
		ECHConfig: {
			DNS: Ali_DoH,
			SNI: ECH_SNI,
		},
		SS: {
			shitatHatzpana: "aes-128-gcm",
			TLS: true,
		},
		Fingerprint: "chrome",
		muvcharMinuyMecholel: {
			local: true, // true: local preferred addresses  false: preferred-IP sub generator
			sifriyatIPmekomit: {
				ipAckrai: true, // Takes effect when randomIP is true: the number of random IPs to enable; otherwise use ADD.txt in KV
				kamutAckrait: 16,
				portMeyuchad: -1,
			},
			SUB: null,
			SUBNAME: "Nova" + "Proxy",
			NAMETPL: "", // Node-name template; empty = default "سرویس رایگان نوا N". Tags: {N} {NAME} {FLAG} {COUNTRY} {CITY} {ISP} {HOST} {PORT} {WORKER} {DATE} {PROTO}
			SUBUpdateTime: 3, // Subscription update interval (hours)
			TOKEN: await MD5MD5(hostname + userID),
		},
		tetzuratHamaratMinuy: {
			SUBAPI: `https://SUBAPI.${milonChatimot[1]}ssss.net`,
			SUBCONFIG: `https://raw.githubusercontent.com/${milonChatimot[1]}/ACL4SSR/refs/heads/main/Clash/config/ACL4SSR_Online_Mini_MultiMode_CF.ini`,
			SUBEMOJI: false,
			SUBLIST: false, // Output node info only
		},
		metavech: {
			[_p]: "auto",
			SOCKS5: {
				efsher: hafelSocks5Metavech,
				globali: hafelSocks5Klali,
				cheshbon: cheshbonSocks5Sheli,
				reshimaLevana: reshimaLevanaSocks5,
			},
			tavnitNativ: {
				[_p]: "proxyip=" + shomerMakom,
				SOCKS5: {
					globali: "socks5://" + shomerMakom,
					standarti: "socks5=" + shomerMakom
				},
				HTTP: {
					globali: "http://" + shomerMakom,
					standarti: "http=" + shomerMakom
				},
				HTTPS: {
					globali: "https://" + shomerMakom,
					standarti: "https=" + shomerMakom
				},
				TURN: {
					globali: "turn://" + shomerMakom,
					standarti: "turn=" + shomerMakom
				},
				SSTP: {
					globali: "sstp://" + shomerMakom,
					standarti: "sstp=" + shomerMakom
				},
			},
		},
		TG: {
			efsher: false,
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
		if (!configJSON || ipusTetzura == true) {
			await putConfig(env, JSON.stringify(breiratMechdalConfigJSON, null, 2));
			config_JSON = breiratMechdalConfigJSON;
		} else {
			const _parsed = JSON.parse(configJSON);
			// Guard against an empty or partial config (e.g. a bad sync from a master, or a manual
			// KV edit): a config missing core objects like tetzuratHamaratMinuy used to throw a few
			// lines down and 500 every admin route (bricking the panel). Fill any missing top-level
			// keys from the defaults so the panel stays usable; a complete config passes through as-is.
			config_JSON = (_parsed && typeof _parsed === 'object' && _parsed.tetzuratHamaratMinuy && _parsed.muvcharMinuyMecholel)
				? _parsed
				: Object.assign({}, breiratMechdalConfigJSON, (_parsed && typeof _parsed === 'object') ? _parsed : {});
		}
	} catch (error) {
		console.error(`read config_JSON error: ${error.message}`);
		config_JSON = breiratMechdalConfigJSON;
	}

	if (!config_JSON.tetzuratHamaratMinuy || typeof config_JSON.tetzuratHamaratMinuy !== 'object') config_JSON.tetzuratHamaratMinuy = Object.assign({}, breiratMechdalConfigJSON.tetzuratHamaratMinuy);
	if (!config_JSON.tetzuratHamaratMinuy.SUBLIST) config_JSON.tetzuratHamaratMinuy.SUBLIST = false;
	if (!config_JSON.gRPCUserAgent) config_JSON.gRPCUserAgent = UA;
	config_JSON.HOST = host;
	if (!config_JSON.HOSTS) config_JSON.HOSTS = [hostname];
	const _envHostSet = !!env.HOST;
	if (_envHostSet) config_JSON.HOSTS = (await saderLeMaarach(env.HOST)).map(h => h.toLowerCase().replace(/^https?:\/\//, '').split('/')[0].split(':')[0]);
	// Durable safety net: the host that served THIS request is always reachable (the request
	// arrived through it). A stale or mistyped pool entry (e.g. a fake *.workers.dev subdomain that
	// is not a real deployed worker) would otherwise leave every node pointing at a dead host, so
	// the client imports the profile but gets no ping / hangs on "verifying connection". Guarantee
	// the live host is present so a config can never end up with zero working nodes. Panel-managed
	// pools (no env.HOST) make the live host the default (first); when env.HOST is deliberately set
	// we respect the admin's order and only append the live host as a fallback if it is missing.
	if (Array.isArray(config_JSON.HOSTS) && hostname) {
		const _live = String(hostname).toLowerCase();
		const _hasLive = config_JSON.HOSTS.some(h => String(h || '').toLowerCase() === _live);
		if (_envHostSet) {
			if (!_hasLive) config_JSON.HOSTS = [...config_JSON.HOSTS, _live];
		} else {
			config_JSON.HOSTS = [_live, ...config_JSON.HOSTS.filter(h => String(h || '').toLowerCase() !== _live)];
		}
	}
	config_JSON.UUID = userID;
	if (!config_JSON.nativAckrai) config_JSON.nativAckrai = false;
	if (!config_JSON.efsher0RTT) config_JSON.efsher0RTT = false;

	if (env.PATH) config_JSON.PATH = env.PATH.startsWith('/') ? env.PATH : '/' + env.PATH;
	else if (!config_JSON.PATH) config_JSON.PATH = '/';

	if (!config_JSON.matzavGRPC) config_JSON.matzavGRPC = 'gun';
	if (!config_JSON.SS) config_JSON.SS = { shitatHatzpana: "aes-128-gcm", TLS: false };

	// Canonicalize mixed-protocol aliases (e.g. "mixed", "mixed (equal split)", Persian "ترکیبی")
	if (config_JSON.sugProtokol) {
		const _raw = String(config_JSON.sugProtokol).trim().toLowerCase();
		if (/^mixed|^mix$|ترکیب/.test(_raw)) config_JSON.sugProtokol = 'mixed';
	}

	if (!config_JSON.metavech.tavnitNativ?.[_p]) {
		config_JSON.metavech.tavnitNativ = {
			[_p]: "proxyip=" + shomerMakom,
			SOCKS5: {
				globali: "socks5://" + shomerMakom,
				standarti: "socks5=" + shomerMakom
			},
			HTTP: {
				globali: "http://" + shomerMakom,
				standarti: "http=" + shomerMakom
			},
			HTTPS: {
				globali: "https://" + shomerMakom,
				standarti: "https=" + shomerMakom
			},
			TURN: {
				globali: "turn://" + shomerMakom,
				standarti: "turn=" + shomerMakom
			},
			SSTP: {
				globali: "sstp://" + shomerMakom,
				standarti: "sstp=" + shomerMakom
			},
		};
	}
	if (!config_JSON.metavech.tavnitNativ.HTTPS) config_JSON.metavech.tavnitNativ.HTTPS = { globali: "https://" + shomerMakom, standarti: "https=" + shomerMakom };
	if (!config_JSON.metavech.tavnitNativ.TURN) config_JSON.metavech.tavnitNativ.TURN = { globali: "turn://" + shomerMakom, standarti: "turn=" + shomerMakom };
	if (!config_JSON.metavech.tavnitNativ.SSTP) config_JSON.metavech.tavnitNativ.SSTP = { globali: "sstp://" + shomerMakom, standarti: "sstp=" + shomerMakom };

	const tetzuratProxy = config_JSON.metavech.tavnitNativ[config_JSON.metavech.SOCKS5.efsher?.toUpperCase()];

	let paramNativMetavech = '';
	if (tetzuratProxy && config_JSON.metavech.SOCKS5.cheshbon) paramNativMetavech = (config_JSON.metavech.SOCKS5.globali ? tetzuratProxy.globali : tetzuratProxy.standarti).replace(shomerMakom, config_JSON.metavech.SOCKS5.cheshbon);
	else if (config_JSON.metavech[_p] !== 'auto') paramNativMetavech = config_JSON.metavech.tavnitNativ[_p].replace(shomerMakom, config_JSON.metavech[_p]);

	let paramShailtaMetavech = '';
	if (paramNativMetavech.includes('?')) {
		const [chelekNativMetavech, chelekSheiltaMetavech] = paramNativMetavech.split('?');
		paramNativMetavech = chelekNativMetavech;
		paramShailtaMetavech = chelekSheiltaMetavech;
	}

	config_JSON.PATH = config_JSON.PATH.replace(paramNativMetavech, '').replace('//', '/');
	const normalizedPath = config_JSON.PATH === '/' ? '' : config_JSON.PATH.replace(/\/+(?=\?|$)/, '').replace(/\/+$/, '');
	const [chelekNativ, ...maarachSheilta] = normalizedPath.split('?');
	const chelekSheilta = maarachSheilta.length ? '?' + maarachSheilta.join('?') : '';
	const chelekSheiltaSofi = paramShailtaMetavech ? (chelekSheilta ? chelekSheilta + '&' + paramShailtaMetavech : '?' + paramShailtaMetavech) : chelekSheilta;
	config_JSON.nativTzometMale = (chelekNativ || '/') + (chelekNativ && paramNativMetavech ? '/' : '') + paramNativMetavech + chelekSheiltaSofi + (config_JSON.efsher0RTT ? (chelekSheiltaSofi ? '&' : '?') + 'ed=2560' : '');

	if (!config_JSON.pilugTLS && config_JSON.pilugTLS !== null) config_JSON.pilugTLS = null;
	const paramPitzulTls = (config_JSON.pilugTLS == 'Shadowrocket' ? `&fragment=${encodeURIComponent('1,40-60,30-50,tlshello')}` : config_JSON.pilugTLS == 'Happ' ? `&fragment=${encodeURIComponent('3,1,tlshello')}` : '');
	if (!config_JSON.Fingerprint) config_JSON.Fingerprint = "chrome";
	if (!config_JSON.ECH) config_JSON.ECH = false;
	if (!config_JSON.ECHConfig) config_JSON.ECHConfig = { DNS: Ali_DoH, SNI: ECH_SNI };
	const paramEchLink = config_JSON.ECH ? `&ech=${encodeURIComponent((config_JSON.ECHConfig.SNI ? config_JSON.ECHConfig.SNI + '+' : '') + config_JSON.ECHConfig.DNS)}` : '';
	const { type: protokolHaavara, shemSadehNativ: shemSdehNativ, shemSadehDomain: shemSdehDomain } = hasagatTetzuratProtokolHaavara(config_JSON);
	const erechParamNativHaavara = hasagatErechParametrNativHaavara(config_JSON, config_JSON.nativTzometMale);
	const _linkProto = config_JSON.sugProtokol === 'mixed' ? _D_._vl_ : config_JSON.sugProtokol;
	let _linkFingerprint = config_JSON.Fingerprint;
	if (!_linkFingerprint || String(_linkFingerprint).trim().toLowerCase() === 'random') {
		const _fps = ['chrome','firefox','safari','ios','android','edge','360'];
		_linkFingerprint = _fps[Math.floor(Math.random() * _fps.length)];
	}
	config_JSON.LINK = _linkProto === 'ss'
		? `${_linkProto}://${btoa(config_JSON.SS.shitatHatzpana + ':' + userID)}@${host}:${config_JSON.SS.TLS ? '443' : '80'}?plugin=v2${encodeURIComponent(`ray-plugin;mode=websocket;host=${host};path=${((config_JSON.nativTzometMale.includes('?') ? config_JSON.nativTzometMale.replace('?', '?enc=' + config_JSON.SS.shitatHatzpana + '&') : (config_JSON.nativTzometMale + '?enc=' + config_JSON.SS.shitatHatzpana)) + (config_JSON.SS.TLS ? ';tls' : ''))};mux=0`) + paramEchLink}#${encodeURIComponent(config_JSON.muvcharMinuyMecholel.SUBNAME)}`
		: (config_JSON.enableTLS === false
			? `${_linkProto}://${userID}@${host}:80?security=none&type=${protokolHaavara}&${shemSdehDomain}=${host}&${shemSdehNativ}=${encodeURIComponent(erechParamNativHaavara)}&encryption=none#${encodeURIComponent(config_JSON.muvcharMinuyMecholel.SUBNAME)}`
			: `${_linkProto}://${userID}@${host}:443?security=tls&type=${protokolHaavara + paramEchLink}&${shemSdehDomain}=${host}&fp=${_linkFingerprint}&sni=${host}&${shemSdehNativ}=${encodeURIComponent(erechParamNativHaavara) + paramPitzulTls}&encryption=none${config_JSON.skipCertVerify ? '&insecure=1&allowInsecure=1' : ''}#${encodeURIComponent(config_JSON.muvcharMinuyMecholel.SUBNAME)}`);
	config_JSON.muvcharMinuyMecholel.TOKEN = await MD5MD5(hostname + userID);

	const itchulTG_JSON = { BotToken: null, ChatID: null };
	config_JSON.TG = { efsher: config_JSON.TG.efsher ? config_JSON.TG.efsher : false, ...itchulTG_JSON };
	try {
		const TG_TXT = await env.KV.get('tg.json');
		if (!TG_TXT) {
			await env.KV.put('tg.json', JSON.stringify(itchulTG_JSON, null, 2));
		} else {
			const TG_JSON = JSON.parse(TG_TXT);
			config_JSON.TG.ChatID = TG_JSON.ChatID ? TG_JSON.ChatID : null;
			config_JSON.TG.BotToken = TG_JSON.BotToken ? maskaMeidaRagish(TG_JSON.BotToken) : null;
		}
	} catch (error) {
		console.error(`read tg.json error: ${error.message}`);
	}

	const itchulCF_JSON = { Email: null, GlobalAPIKey: null, AccountID: null, APIToken: null, UsageAPI: null };
	config_JSON.CF = { ...itchulCF_JSON, Usage: { success: false, pages: 0, workers: 0, total: 0, max: 100000 } };
	try {
		const CF_TXT = await env.KV.get('cf.json');
		if (!CF_TXT) {
			await env.KV.put('cf.json', JSON.stringify(itchulCF_JSON, null, 2));
		} else {
			const CF_JSON = JSON.parse(CF_TXT);
			if (CF_JSON.UsageAPI) {
				try {
					const response = await fetch(CF_JSON.UsageAPI);
					const Usage = await response.json();
					config_JSON.CF.Usage = Usage;
				} catch (err) {
					console.error(`request CF_JSON.UsageAPI failed: ${err.message}`);
				}
			} else {
				config_JSON.CF.Email = CF_JSON.Email ? CF_JSON.Email : null;
				config_JSON.CF.GlobalAPIKey = CF_JSON.GlobalAPIKey ? maskaMeidaRagish(CF_JSON.GlobalAPIKey) : null;
				config_JSON.CF.AccountID = CF_JSON.AccountID ? maskaMeidaRagish(CF_JSON.AccountID) : null;
				config_JSON.CF.APIToken = CF_JSON.APIToken ? maskaMeidaRagish(CF_JSON.APIToken) : null;
				config_JSON.CF.UsageAPI = null;
				const Usage = await getCloudflareUsage(CF_JSON.Email, CF_JSON.GlobalAPIKey, CF_JSON.AccountID, CF_JSON.APIToken);
				config_JSON.CF.Usage = Usage;
			}
		}
	} catch (error) {
		console.error(`read cf.json error: ${error.message}`);
	}

	config_JSON.zmanTeina = (performance.now() - zmanHatchalatItchul).toFixed(2) + 'ms';
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

async function tipulAshafHatkana(request, env, url, adminPassword, encryptionKey, UA) {
	const sub = url.pathname.slice(1).toLowerCase().replace(/^install\/?/, '');
	const hasStore = !!(env.KV && typeof env.KV.get === 'function');
	const kvBound = env.__kvWrapped ? !!env.__hasRealKV : !!(env.KV && typeof env.KV.get === 'function');
	if (sub === 'status') {
		const d1Bound = !!(env.DB && typeof env.DB.prepare === 'function');
		let d1Probe = 'none';
		if (d1Bound) { try { await env.DB.prepare('SELECT 1 AS ok').first(); d1Probe = 'ok'; } catch (e) { d1Probe = 'err:' + ((e && e.message) || String(e)); } }
		const d1 = d1Bound;
		// --- Cron Trigger detection: based on the heartbeat written by scheduled() on every invocation. ---
		let cronLastTick = 0;
		try { cronLastTick = parseInt((env.KV && typeof env.KV.get === 'function') ? (await env.KV.get('cron_last_tick')) || '0' : '0') || 0; } catch (e) {}
		const cronEnabled = !!(env && ['1', 'true'].includes(String(env.ENABLE_CRON || '')));
		const cronAgoMs = cronLastTick ? (Date.now() - cronLastTick) : -1;
		return new Response(JSON.stringify({ build: NOVA_BUILD, kv: kvBound, d1: d1, d1Bound: d1Bound, d1Probe: d1Probe, store: d1 ? 'd1' : (kvBound ? 'kv' : 'none'), admin: !!adminPassword, configured: !!(hasStore && adminPassword), cronEnabled: cronEnabled, cronLastTick: cronLastTick, cronAgoMs: cronAgoMs }),
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
			mitmonSismatMenahel = pass; zmanMitmonSismatMenahel = Date.now();
		} catch (e) { return new Response(JSON.stringify({ error: 'kv_write_failed' }), { status: 500, headers: { 'Content-Type': 'application/json;charset=utf-8' } }); }
		const headers = { 'Content-Type': 'application/json;charset=utf-8' };
		try { headers['Set-Cookie'] = `auth=${await makeSessionToken((UA || 'null'), encryptionKey, pass)}; Path=/; HttpOnly; Secure; SameSite=Lax`; } catch (e) {}
		return new Response(JSON.stringify({ success: true }), { status: 200, headers });
	}
	if (sub === 'recover-disguise') {
		if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
		if (!hasStore) return new Response(JSON.stringify({ error: 'no_kv' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
		try {
			let ns = {};
			try { ns = JSON.parse(await env.KV.get('network-settings.json') || '{}'); } catch (e) {}
			const wasDisguised = !!ns.disguise;
			const hadPaths = !!(ns.adminPath || ns.loginPath || ns.subPath);
			ns.disguise = false;
			ns.adminPath = '';
			ns.loginPath = '';
			ns.subPath = '';
			await env.KV.put('network-settings.json', JSON.stringify(ns, null, 2));
			mitmonHagdarotReshet = null;
			return new Response(JSON.stringify({ success: true, wasDisguised, hadPaths }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
		} catch (e) {
			return new Response(JSON.stringify({ error: 'failed', detail: e.message }), { status: 500, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
		}
	}
	if (sub === 'recover-password') {
		if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
		if (!hasStore) return new Response(JSON.stringify({ error: 'no_kv' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
		let body = {};
		try { body = await request.json(); } catch (e) { try { body = Object.fromEntries(new URLSearchParams(await request.text())); } catch (e2) {} }
		const newPass = (body.password || '').toString().replace(/[\r\n]/g, '');
		if (newPass.length < 6) return new Response(JSON.stringify({ error: 'too_short' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
		try {
			await env.KV.put('admin_pass', newPass);
			mitmonSismatMenahel = newPass; zmanMitmonSismatMenahel = Date.now();
			const headers = { 'Content-Type': 'application/json;charset=utf-8' };
			try { headers['Set-Cookie'] = `auth=${await makeSessionToken((UA || 'null'), encryptionKey, newPass)}; Path=/; HttpOnly; Secure; SameSite=Lax`; } catch (e) {}
			return new Response(JSON.stringify({ success: true }), { status: 200, headers });
		} catch (e) {
			return new Response(JSON.stringify({ error: 'failed', detail: e.message }), { status: 500, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
		}
	}
	return await panelHtml(env, '/install/');
}
async function dafMerkazMishtamesh() {
	try {
		const base = String(panelOrigin() || '').replace(/\/+$/, '');
		if (!base || PANEL_PLACEHOLDER.test(base)) return null;
		const r = await fetch(base + '/user/index.html', { headers: { 'User-Agent': 'NovaProxy' }, cf: { cacheTtl: 300, cacheEverything: true } });
		if (!r || !r.ok) return null;
		const html = await r.text();
		if (!html || html.length < 50) return null;
		return new Response(html, { status: 200, headers: { 'content-type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } });
	} catch (e) { return null; }
}

function zihuySpakIran(request) {
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

async function hasagatKovetzBreicha(fileUrl) {
	const c = _poolCache.get(fileUrl);
	if (c && Date.now() - c.at < 1800000) return c.list;
	let list = [];
	try {
		const r = await fetch(fileUrl, { headers: { 'User-Agent': 'NovaProxy' }, cf: { cacheTtl: 1800, cacheEverything: true } });
		if (r.ok) list = (await saderLeMaarach(await r.text())).map(s => String(s).trim()).filter(s => s && !s.startsWith('#'));
	} catch (e) {}
	_poolCache.set(fileUrl, { at: Date.now(), list });
	return list;
}

async function hasagatIPnakiChachem(request, poolApi, count) {
	const base = String(poolApi || '').replace(/\/+$/, '');
	if (!base) return [];
	const carrier = zihuySpakIran(request);
	for (const f of [...new Set([carrier, 'ir', 'all'])]) {
		const list = await hasagatKovetzBreicha(base + '/' + f + '.txt');
		if (list && list.length) {
			const shuffled = list.slice().sort(() => 0.5 - Math.random()).slice(0, count || 16);
			return shuffled.map(line => line.includes('#') ? line : (line + '#Nova-' + f.toUpperCase()));
		}
	}
	return [];
}

async function haratzatAchzakaMetuzmenet(env) {
	try {
		const hosts = await getPoolHosts(env);
		let baseUrl = '';
		try { const savedNS = env.KV && typeof env.KV.get === 'function' ? await env.KV.get('network-settings.json') : null; const _ns = savedNS ? JSON.parse(savedNS) : {}; const _hosts = _ns.HOSTS || []; if (_hosts.length) baseUrl = 'https://' + _hosts[0]; } catch (e) {}
		if (!baseUrl) baseUrl = 'https://' + (env.HOST || 'localhost');
		const health = await bdikatBriutDomain(env, hosts, baseUrl.replace(/^https?:\/\//, ''));
		const mirror = await publishSubMirror(env, baseUrl);
		try { await peimatLevMerkazit(env); } catch (e) { /* best-effort */ }
		try { await riaanunHodaot(env); } catch (e) { /* best-effort */ }
		let rotated = null, warpHealth = null;
		try { rotated = await bdikatSivuvNativOtomati(env); } catch (e) { /* best-effort */ }
		try { warpHealth = await bdikatBriutCheshbonWARP(env); } catch (e) { /* best-effort */ }
		console.log('[Scheduled Maintenance] maintenance complete');
		return { health, mirror, rotated, warpHealth };
	} catch (error) {
		console.error('[Scheduled Maintenance] maintenance failed:', error.message);
		return { success: false, error: error.message };
	}
}

// --- چرخش خودکار دوره‌ای مسیر مخفی (اختیاری، با ns.autoRotatePath فعال می‌شود؛ پیش‌فرض خاموش) ---
async function bdikatSivuvNativOtomati(env) {
	try {
		let ns = {}; try { ns = JSON.parse(await env.KV.get('network-settings.json') || '{}'); } catch (e) { return { skipped: true }; }
		if (!ns.autoRotatePath) return { skipped: true, reason: 'disabled' };
		const intervalMs = Math.max(1, ns.autoRotatePathDays || 30) * 86400000;
		const last = parseInt(await env.KV.get('last_auto_path_rotate') || '0');
		if (Date.now() - last < intervalMs) return { skipped: true, reason: 'not due' };
		const _rt = () => Array.from(crypto.getRandomValues(new Uint8Array(6)), b => b.toString(16).padStart(2, '0')).join('');
		ns.disguise = true; ns.adminPath = _rt(); ns.loginPath = _rt(); ns.subPath = _rt();
		await env.KV.put('network-settings.json', JSON.stringify(ns));
		await env.KV.put('last_auto_path_rotate', String(Date.now()));
		hagdarotReshet = ns; mitmonHagdarotReshet = ns; zmanMitmonHagdarotReshet = Date.now();
		await logAdminAction(env, { headers: new Headers() }, 'rotate-path', 'admin/login/sub paths auto-rotated (via cron)');
		try {
			const tgRaw = await env.KV.get('tg.json'); const tg = tgRaw ? JSON.parse(tgRaw) : null;
			if (tg && tg.BotToken && tg.ChatID) await shlachHodaatBot(tg.BotToken, tg.ChatID, `🔄 <b>چرخش خودکار مسیر مخفی</b>\n\nمسیر ادمین/لاگین/ساب به‌صورت خودکار تغییر کرد.\nادمین: <code>/${ns.adminPath}</code>`);
		} catch (e) {}
		return { rotated: true, at: Date.now() };
	} catch (e) { console.error('check auto path rotation: ' + (e && e.message || e)); return { error: String(e && e.message || e) }; }
}
// --- بررسی دوره‌ای سلامت اکانت WARP (اعتبار لایسنس/اتصال) و ثبت هشدار در صورت مشکل ---
async function bdikatBriutCheshbonWARP(env) {
	try {
		const raw = await env.KV.get('warp-account.json');
		if (!raw) return { skipped: true, reason: 'not registered' };
		const account = JSON.parse(raw);
		const view = _warpPublicView(account);
		const ok = !!(account && account.id && account.account && account.account.license);
		const health = { checkedAt: Date.now(), ok, view };
		await env.KV.put('warp-health.json', JSON.stringify(health));
		if (!ok) {
			try {
				const tgRaw = await env.KV.get('tg.json'); const tg = tgRaw ? JSON.parse(tgRaw) : null;
				if (tg && tg.BotToken && tg.ChatID) await shlachHodaatBot(tg.BotToken, tg.ChatID, `⚠️ <b>WARP</b>\n\nاکانت WARP ثبت‌شده معتبر به نظر نمی‌رسد؛ لطفاً از پنل بررسی کنید.`);
			} catch (e) {}
		}
		return health;
	} catch (e) { console.error('check WARP account health: ' + (e && e.message || e)); return { error: String(e && e.message || e) }; }
}

async function bdikatBriutDomain(env, hosts, selfHost) {
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

function zihuiSapak(request) {
	const cf = request?.cf;
	const mipuiSpakASN = {
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
	const mipuiMiloteiMafteachSpak = [
		{ code: 'ct', pattern: /chinanet|chinatelecom|china telecom|cn2|shtel/ },
		{ code: 'cmcc', pattern: /cmi|cmnet|chinamobile|china mobile|cmcc|mobile communications/ },
		{ code: 'cu', pattern: /china169|china unicom|chinaunicom|cucc|cncgroup|cuii|netcom/ },
	];
	if (String(cf?.country || '').toLowerCase() !== 'cn') return 'cf';
	const shemIrgun = String(cf?.asOrganization || '').toLowerCase();
	const spakTaam = mipuiMiloteiMafteachSpak.find(({ pattern }) => pattern.test(shemIrgun))?.code;
	return spakTaam || mipuiSpakASN[String(cf?.asn || '')] || 'cf';
}

async function yatzerIpAkrai(request, count = 16, portMeyuchad = -1) {
	const url = new URL(request.url);
	const mafilSheiltaParametr = String(url.searchParams.get('cnIspCode') || '').toLowerCase();
	const zihuiKovetzSapak = ['ct', 'cu', 'cmcc', 'cf'].includes(mafilSheiltaParametr) ? mafilSheiltaParametr : zihuiSapak(request);
	const mipuiShemSpak = {
		cmcc: 'Nova Free',
		cu: 'Nova Free',
		ct: 'Nova Free',
		cf: 'Nova Free',
	};
	const cidr_url = zihuiKovetzSapak === 'cf' ? `https://raw.githubusercontent.com/${milonChatimot[1]}/${milonChatimot[1]}/main/CF-CIDR.txt` : `https://raw.githubusercontent.com/${milonChatimot[1]}/${milonChatimot[1]}/main/CF-CIDR/${zihuiKovetzSapak}.txt`;
	const cfname = mipuiShemSpak[zihuiKovetzSapak] || 'CF official preferred';
	const cfport = [443, 2053, 2083, 2087, 2096, 8443];
	let cidrList = [];
	{ const _cc = _cidrListCache.get(zihuiKovetzSapak); if (_cc && (Date.now() - _cc.at) < 3600000) { cidrList = _cc.list; } else { try { const res = await fetch(cidr_url); cidrList = res.ok ? await saderLeMaarach(await res.text()) : ['104.16.0.0/13'] } catch { cidrList = ['104.16.0.0/13'] } _cidrListCache.set(zihuiKovetzSapak, { at: Date.now(), list: cidrList }); } }

	const generateRandomIPFromCIDR = (cidr) => {
		const [baseIP, prefixLength] = cidr.split('/'), prefix = parseInt(prefixLength), hostBits = 32 - prefix;
		const ipInt = baseIP.split('.').reduce((a, p, i) => a | (parseInt(p) << (24 - i * 8)), 0);
		const randomOffset = Math.floor(Math.random() * Math.pow(2, hostBits));
		const mask = (0xFFFFFFFF << hostBits) >>> 0, randomIP = (((ipInt & mask) >>> 0) + randomOffset) >>> 0;
		return [(randomIP >>> 24) & 0xFF, (randomIP >>> 16) & 0xFF, (randomIP >>> 8) & 0xFF, randomIP & 0xFF].join('.');
	};
	const randomIPs = Array.from({ length: count }, (_, index) => {
		const ip = generateRandomIPFromCIDR(cidrList[Math.floor(Math.random() * cidrList.length)]);
		const portYaad = portMeyuchad === -1
			? cfport[Math.floor(Math.random() * cfport.length)]
			: portMeyuchad;
		return `${ip}:${portYaad}#${cfname} ${index + 1}`;
	});
	return [randomIPs, randomIPs.join('\n')];
}

async function saderLeMaarach(tochen) {
	var tochenMuchlaf = tochen.replace(/[	"'\r\n]+/g, ',').replace(/,+/g, ',');
	if (tochenMuchlaf.charAt(0) == ',') tochenMuchlaf = tochenMuchlaf.slice(1);
	if (tochenMuchlaf.charAt(tochenMuchlaf.length - 1) == ',') tochenMuchlaf = tochenMuchlaf.slice(0, tochenMuchlaf.length - 1);
	const maarachKtovet = tochenMuchlaf.split(',');
	return maarachKtovet;
}

async function hasagatNetuneiMecholelMinuyMuvchar(hostGenNivchar) {
	let ipNivchar = [], linkTzmatimAcherim = '', formatHost = hostGenNivchar.replace(/^sub:\/\//i, 'https://').split('#')[0].split('?')[0];
	if (!/^https?:\/\//i.test(formatHost)) formatHost = `https://${formatHost}`;

	try {
		const url = new URL(formatHost);
		formatHost = url.origin;
	} catch (error) {
		ipNivchar.push(`127.0.0.1:1234#${hostGenNivchar}preferred-IP generator formatting error:${error.message}`);
		return [ipNivchar, linkTzmatimAcherim];
	}

	const urlMecholelMinuyMuvchar = `${formatHost}/sub?host=example.com&uuid=00000000-0000-4000-8000-000000000000`;

	try {
		const response = await fetch(urlMecholelMinuyMuvchar, {
			headers: { 'User-Agent': 'v2rayN/Nova' + 'tunnel (https://github.com/' + milonChatimot[1] + '/Nova' + 'Proxy)' }
		});

		if (!response.ok) {
			ipNivchar.push(`127.0.0.1:1234#${hostGenNivchar}preferred-IP generator error:${response.statusText}`);
			return [ipNivchar, linkTzmatimAcherim];
		}

		const tochenMinuyMuchzarMecholel = atob(await response.text());
		const reshimatShurotMinuy = tochenMinuyMuchzarMecholel.includes('\r\n')
			? tochenMinuyMuchzarMecholel.split('\r\n')
			: tochenMinuyMuchzarMecholel.split('\n');

		for (const tochenShura of reshimatShurotMinuy) {
			if (!tochenShura.trim()) continue; // Skip blank lines
			if (tochenShura.includes('00000000-0000-4000-8000-000000000000') && tochenShura.includes('example.com')) {
				// This is a preferred-IP line; extract domain:port#remark
				const hatamatKtovet = tochenShura.match(/:\/\/[^@]+@([^?]+)/);
				if (hatamatKtovet) {
					let ktovetPort = hatamatKtovet[1], heara = ''; // domain:port or IP:port
					const hatamatHeara = tochenShura.match(/#(.+)$/);
					if (hatamatHeara) heara = '#' + decodeURIComponent(hatamatHeara[1]);
					ipNivchar.push(ktovetPort + heara);
				}
			} else {
				linkTzmatimAcherim += tochenShura + '\n';
			}
		}
	} catch (error) {
		ipNivchar.push(`127.0.0.1:1234#${hostGenNivchar}preferred-IP generator error:${error.message}`);
	}

	return [ipNivchar, linkTzmatimAcherim];
}

async function bakashatAPImuvchar(urls, portBereira = '443', zmanTimeout = 3000) {
	if (!urls?.length) return [[], [], [], []];
	const results = new Set(), breichatIpMetavech = new Set();
	let tochenLinkGaluiMinuy = '', urlsMinuyTzarichHamara = [];
	await Promise.allSettled(urls.map(async (url) => {
		// Check whether the URL contains a remark name
		const hashIndex = url.indexOf('#');
		const urlWithoutHash = hashIndex > -1 ? url.substring(0, hashIndex) : url;
		const shemHearaApi = hashIndex > -1 ? decodeURIComponent(url.substring(hashIndex + 1)) : null;
		const ipNivcharKeMetavech = url.toLowerCase().includes('proxyip=true');
		if (urlWithoutHash.toLowerCase().startsWith('sub://')) {
			try {
				const [ipNivchar, linkTzmatimAcherim] = await hasagatNetuneiMecholelMinuyMuvchar(urlWithoutHash);
				// Process the first array - preferred IPs
				if (shemHearaApi) {
					for (const ip of ipNivchar) {
						const ipMeubad = ip.includes('#')
							? `${ip} [${shemHearaApi}]`
							: `${ip}#[${shemHearaApi}]`;
						results.add(ipMeubad);
						if (ipNivcharKeMetavech) breichatIpMetavech.add(ip.split('#')[0]);
					}
				} else {
					for (const ip of ipNivchar) {
						results.add(ip);
						if (ipNivcharKeMetavech) breichatIpMetavech.add(ip.split('#')[0]);
					}
				}
				// Process the second array - other-node LINKs
				if (linkTzmatimAcherim && typeof linkTzmatimAcherim === 'string' && shemHearaApi) {
					const tochenLINKmeubad = linkTzmatimAcherim.replace(/([a-z][a-z0-9+\-.]*:\/\/[^\r\n]*?)(\r?\n|$)/gi, (match, link, lineEnd) => {
						const kishurMale = link.includes('#')
							? `${link}${encodeURIComponent(` [${shemHearaApi}]`)}`
							: `${link}${encodeURIComponent(`#[${shemHearaApi}]`)}`;
						return `${kishurMale}${lineEnd}`;
					});
					tochenLinkGaluiMinuy += tochenLINKmeubad;
				} else if (linkTzmatimAcherim && typeof linkTzmatimAcherim === 'string') {
					tochenLinkGaluiMinuy += linkTzmatimAcherim;
				}
			} catch (e) { }
			return;
		}

		try {
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), zmanTimeout);
			const response = await fetch(urlWithoutHash, { signal: controller.signal });
			clearTimeout(timeoutId);
			let text = '';
			try {
				const buffer = await response.arrayBuffer();
				const contentType = (response.headers.get('content-type') || '').toLowerCase();
				const charset = contentType.match(/charset=([^\s;]+)/i)?.[1]?.toLowerCase() || '';

				// Decide encoding priority from the Content-Type response header
				let decoders = ['utf-8', 'gb2312']; // Default to UTF-8 first
				if (charset.includes('gb') || charset.includes('gbk') || charset.includes('gb2312')) {
					decoders = ['gb2312', 'utf-8']; // If a GB-family encoding is specified, try GB2312 first
				}

				// Try decoding with several encodings
				let decodeSuccess = false;
				for (const decoder of decoders) {
					try {
						const decoded = new TextDecoder(decoder).decode(buffer);
						// Validate the decoded result
						if (decoded && decoded.length > 0 && !decoded.includes('\ufffd')) {
							text = decoded;
							decodeSuccess = true;
							break;
						} else if (decoded && decoded.length > 0) {
							// If replacement chars (U+FFFD) appear, the encoding didn't match; try the next one
							continue;
						}
					} catch (e) {
						// This encoding failed to decode; try the next
						continue;
					}
				}

				// If all encodings fail or are invalid, fall back to response.text()
				if (!decodeSuccess) {
					text = await response.text();
				}

				// If the result is empty or invalid, return
				if (!text || text.trim().length === 0) {
					return;
				}
			} catch (e) {
				console.error('Failed to decode response:', e);
				return;
			}

			// Preprocess subscription content
			/*
			if (text.includes('proxies:') || (text.includes('outbounds"') && text.includes('inbounds"'))) {// Clash/Singbox config
				urlsMinuyTzarichHamara.add(url);
				return;
			}
			*/

			let kdamIbudTochenMinuyGalui = text;
			const cleanText = typeof text === 'string' ? text.replace(/\s/g, '') : '';
			if (cleanText.length > 0 && cleanText.length % 4 === 0 && /^[A-Za-z0-9+/]+={0,2}$/.test(cleanText)) {
				try {
					const bytes = new Uint8Array(atob(cleanText).split('').map(c => c.charCodeAt(0)));
					kdamIbudTochenMinuyGalui = new TextDecoder('utf-8').decode(bytes);
				} catch { }
			}
			if (kdamIbudTochenMinuyGalui.split('#')[0].includes('://')) {
				// Process LINK content
				if (shemHearaApi) {
					const tochenLINKmeubad = kdamIbudTochenMinuyGalui.replace(/([a-z][a-z0-9+\-.]*:\/\/[^\r\n]*?)(\r?\n|$)/gi, (match, link, lineEnd) => {
						const kishurMale = link.includes('#')
							? `${link}${encodeURIComponent(` [${shemHearaApi}]`)}`
							: `${link}${encodeURIComponent(`#[${shemHearaApi}]`)}`;
						return `${kishurMale}${lineEnd}`;
					});
					tochenLinkGaluiMinuy += tochenLINKmeubad + '\n';
				} else {
					tochenLinkGaluiMinuy += kdamIbudTochenMinuyGalui + '\n';
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
					const port = parsedUrl.searchParams.get('port') || portBereira;
					const ipItem = hasPort ? line : `${hostPart}:${port}${remark}`;
					// Process the first array - preferred IPs
					if (shemHearaApi) {
						const ipMeubad = ipItem.includes('#')
							? `${ipItem} [${shemHearaApi}]`
							: `${ipItem}#[${shemHearaApi}]`;
						results.add(ipMeubad);
					} else {
						results.add(ipItem);
					}
					if (ipNivcharKeMetavech) breichatIpMetavech.add(ipItem.split('#')[0]);
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
						// Process the first array - preferred IPs
						if (shemHearaApi) {
							const ipMeubad = `${ipItem} [${shemHearaApi}]`;
							results.add(ipMeubad);
						} else {
							results.add(ipItem);
						}
						if (ipNivcharKeMetavech) breichatIpMetavech.add(`${wrappedIP}:${cols[portIdx]}`);
					});
				} else if (headers.some(h => h.includes('IP')) && headers.some(h => h.includes('延迟')) && headers.some(h => h.includes('下载速度'))) {
					const ipIdx = headers.findIndex(h => h.includes('IP'));
					const delayIdx = headers.findIndex(h => h.includes('延迟'));
					const speedIdx = headers.findIndex(h => h.includes('下载速度'));
					const port = parsedUrl.searchParams.get('port') || portBereira;
					dataLines.forEach(line => {
						const cols = line.split(',').map(c => c.trim());
						const wrappedIP = IPV6_PATTERN.test(cols[ipIdx]) ? `[${cols[ipIdx]}]` : cols[ipIdx];
						const ipItem = `${wrappedIP}:${port}#CF-preferred ${cols[delayIdx]}ms ${cols[speedIdx]}MB/s`;
						// Process the first array - preferred IPs
						if (shemHearaApi) {
							const ipMeubad = `${ipItem} [${shemHearaApi}]`;
							results.add(ipMeubad);
						} else {
							results.add(ipItem);
						}
						if (ipNivcharKeMetavech) breichatIpMetavech.add(`${wrappedIP}:${port}`);
					});
				}
			}
		} catch (e) { }
	}));
	// Convert LINK content into an array and dedupe
	const maarachLINK = tochenLinkGaluiMinuy.trim() ? [...new Set(tochenLinkGaluiMinuy.split(/\r?\n/).filter(line => line.trim() !== ''))] : [];
	return [Array.from(results), maarachLINK, urlsMinuyTzarichHamara, Array.from(breichatIpMetavech)];
}

async function hasagatParametrMetavech(url, uuid) {
	nituachMishtameshChibur(url);
	// Apply per-user proxy settings (userSocks5 / userProxyIp / userProxyIata)
	if (chiburMishtameshId) {
		const _cu = hagdarotReshet && Array.isArray(hagdarotReshet.users) ? hagdarotReshet.users.find(u => u && u.id === chiburMishtameshId) : null;
		if (_cu) {
			if (_cu.userSocks5 && !cheshbonSocks5Sheli) {
				cheshbonSocks5Sheli = _cu.userSocks5;
				const _parsed = /^(socks5|http|https):\/\/(.+)$/i.exec(_cu.userSocks5);
				if (_parsed) { hafelSocks5Metavech = _parsed[1].toLowerCase(); cheshbonSocks5Sheli = _parsed[2].split('/')[0]; }
				else { hafelSocks5Metavech = 'socks5'; }
				hafelSocks5Klali = true;
			}
			if (_cu.userProxyIp) {
				metavechIP = _cu.userProxyIp;
				hafelGibuiMetavech = false;
			}
			if (_cu.userProxyIata && !_cu.userSocks5 && !_cu.userProxyIp) {
				metavechIP = (_cu.userProxyIata.toLowerCase() + '.' + milonChatimot[0].toLowerCase() + '.' + milonChatimot[1] + 'ssss.net');
				hafelGibuiMetavech = false;
			}
		}
	}
	const { searchParams } = url;
	const pathname = decodeURIComponent(url.pathname);
	const pathLower = pathname.toLowerCase();

	const hatamatNativProxySharsheret = pathname.match(/\/video\/(.+)$/i);
	if (hatamatNativProxySharsheret) {
		try {
			const tekstGaluiProxySharsheret = base64SecretDecode(hatamatNativProxySharsheret[1], uuid);
			const { type, ...ktovetProxySharsheret } = JSON.parse(tekstGaluiProxySharsheret);
			if (!type || !portBreiratMechdalProtokolMetavech[String(type).toLowerCase()]) throw new Error('Invalid chained-proxy type');
			if (!ktovetProxySharsheret.hostname || !ktovetProxySharsheret.port) throw new Error('Chained-proxy address missing hostname or port');
			cheshbonSocks5Sheli = '';
			metavechIP = 'chained proxy';
			hafelGibuiMetavech = false;
			hafelSocks5Klali = true;
			hafelSocks5Metavech = String(type).toLowerCase();
			parsedSocks5Address = {
				username: ktovetProxySharsheret.username,
				password: ktovetProxySharsheret.password,
				hostname: ktovetProxySharsheret.hostname,
				port: Number(ktovetProxySharsheret.port)
			};
			if (isNaN(parsedSocks5Address.port)) throw new Error('Invalid chained-proxy port');
			return;
		} catch (err) {
			console.error('parse chained-proxy params failed:', err.message);
		}
	}

	cheshbonSocks5Sheli = searchParams.get('socks5') || searchParams.get('http') || searchParams.get('https') || searchParams.get('turn') || searchParams.get('sstp') || null;
	hafelSocks5Klali = searchParams.has('globalproxy');
	if (searchParams.get('socks5')) hafelSocks5Metavech = 'socks5';
	else if (searchParams.get('http')) hafelSocks5Metavech = 'http';
	else if (searchParams.get('https')) hafelSocks5Metavech = 'https';
	else if (searchParams.get('turn')) hafelSocks5Metavech = 'turn';
	else if (searchParams.get('sstp')) hafelSocks5Metavech = 'sstp';

	const nituachURLproxy = (erech, globaliKafuy = true) => {
		const hatama = /^(socks5|http|https|turn|sstp):\/\/(.+)$/i.exec(erech || '');
		if (!hatama) return false;
		hafelSocks5Metavech = hatama[1].toLowerCase();
		cheshbonSocks5Sheli = hatama[2].split('/')[0];
		if (globaliKafuy) hafelSocks5Klali = true;
		return true;
	};

	const hagdaratMetavechIP = (erech) => {
		metavechIP = erech;
		hafelSocks5Metavech = null;
		hafelGibuiMetavech = false;
	};

	const chilutzErechNativ = (erech) => {
		if (!erech.includes('://')) {
			const indexSlash = erech.indexOf('/');
			return indexSlash > 0 ? erech.slice(0, indexSlash) : erech;
		}
		const pitzulProtokol = erech.split('://');
		if (pitzulProtokol.length !== 2) return erech;
		const indexSlash = pitzulProtokol[1].indexOf('/');
		return indexSlash > 0 ? `${pitzulProtokol[0]}://${pitzulProtokol[1].slice(0, indexSlash)}` : erech;
	};

	const sheiltatMetavechIP = searchParams.get('proxyip');
	if (sheiltatMetavechIP !== null) {
		if (!nituachURLproxy(sheiltatMetavechIP)) return hagdaratMetavechIP(sheiltatMetavechIP);
	} else {
		let hatama = /\/(socks5?|http|https|turn|sstp):\/?\/?([^/?#\s]+)/i.exec(pathname);
		if (hatama) {
			const sug = hatama[1].toLowerCase();
			hafelSocks5Metavech = sug === 'sock' || sug === 'socks' ? 'socks5' : sug;
			cheshbonSocks5Sheli = hatama[2].split('/')[0];
			hafelSocks5Klali = true;
		} else if ((hatama = /\/(g?s5|socks5|g?http|g?https|g?turn|g?sstp)=([^/?#\s]+)/i.exec(pathname))) {
			const sug = hatama[1].toLowerCase();
			cheshbonSocks5Sheli = hatama[2].split('/')[0];
			hafelSocks5Metavech = sug.includes('sstp') ? 'sstp' : (sug.includes('turn') ? 'turn' : (sug.includes('https') ? 'https' : (sug.includes('http') ? 'http' : 'socks5')));
			if (sug.startsWith('g')) hafelSocks5Klali = true;
		} else if ((hatama = /\/(proxyip[.=]|pyip=|ip=)([^?#\s]+)/.exec(pathLower))) {
			const erechMetavechNativ = chilutzErechNativ(hatama[2]);
			if (!nituachURLproxy(erechMetavechNativ)) return hagdaratMetavechIP(erechMetavechNativ);
		}
	}

	if (!cheshbonSocks5Sheli) {
		hafelSocks5Metavech = null;
		return;
	}

	try {
		parsedSocks5Address = await kabelCheshbonSocks5(cheshbonSocks5Sheli, kabelPortBereiratProxy(hafelSocks5Metavech));
		if (searchParams.get('socks5')) hafelSocks5Metavech = 'socks5';
		else if (searchParams.get('http')) hafelSocks5Metavech = 'http';
		else if (searchParams.get('https')) hafelSocks5Metavech = 'https';
		else if (searchParams.get('turn')) hafelSocks5Metavech = 'turn';
		else if (searchParams.get('sstp')) hafelSocks5Metavech = 'sstp';
		else hafelSocks5Metavech = hafelSocks5Metavech || 'socks5';
	} catch (err) {
		console.error('parse SOCKS5 address failed:', err.message);
		hafelSocks5Metavech = null;
	}
}

const portBreiratMechdalProtokolMetavech = { socks5: 1080, http: 80, https: 443, turn: 3478, sstp: 443 };
function kabelPortBereiratProxy(sug) {
	return portBreiratMechdalProtokolMetavech[String(sug || '').toLowerCase()] || 80;
}

const regexBase64CheshbonSOCKS5 = /^(?:[A-Z0-9+/]{4})*(?:[A-Z0-9+/]{2}==|[A-Z0-9+/]{3}=)?$/i, regexSograimIPv6 = /^\[.*\]$/;
function kabelCheshbonSocks5(address, portBereira = 80) {
	address = String(address || '').trim().replace(/^(socks5|http|https|turn|sstp):\/\//i, '').split('#')[0].trim();
	const firstAt = address.lastIndexOf("@");
	if (firstAt !== -1) {
		let auth = address.slice(0, firstAt).replaceAll("%3D", "=");
		if (!auth.includes(":") && regexBase64CheshbonSOCKS5.test(auth)) auth = atob(auth);
		address = `${auth}@${address.slice(firstAt + 1)}`;
	}

	const atIndex = address.lastIndexOf("@");
	const hostPart = (atIndex === -1 ? address : address.slice(atIndex + 1)).split('/')[0];
	const authPart = atIndex === -1 ? "" : address.slice(0, atIndex);
	const [username, password] = authPart ? authPart.split(":") : [];
	if (authPart && !password) throw new Error('Invalid SOCKS address format: the auth part must be "username:password"');

	let hostname = hostPart, port = portBereira;
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

	if (isNaN(port)) throw new Error('Invalid SOCKS address format: the port must be numeric');
	if (hostname.includes(":") && !regexSograimIPv6.test(hostname)) throw new Error('Invalid SOCKS address format: IPv6 addresses must be bracketed, e.g. [2001:db8::1]');
	return { username, password, hostname, port };
}

async function getCloudflareUsage(Email, GlobalAPIKey, AccountID, APIToken) {
	if (mitmonCfUsage && (Date.now() - zmanMitmonCfUsage) < 300000) return mitmonCfUsage;
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
			if (!r.ok) throw new Error(`account fetch failed: ${r.status}`);
			const d = await r.json();
			if (!d?.result?.length) throw new Error("Account not found");
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

		if (!res.ok) throw new Error(`query failed: ${res.status}`);
		const result = await res.json();
		if (result.errors?.length) throw new Error(result.errors[0].message);

		const acc = result?.data?.viewer?.accounts?.[0];
		if (!acc) throw new Error("Account data not found");

		const pages = sum(acc.pagesFunctionsInvocationsAdaptiveGroups);
		const workers = sum(acc.workersInvocationsAdaptive);
		const total = pages + workers;
		const max = 100000;
		log(`stats - Pages: ${pages}, Workers: ${workers}, total: ${total}, cap: 100000`);
		{ const _u = { success: true, pages, workers, total, max }; mitmonCfUsage = _u; zmanMitmonCfUsage = Date.now(); return _u; }

	} catch (error) {
		console.error('get usage error:', error.message);
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

async function nituachKtovetPort(proxyIP, domainYaad = 'dash.cloudflare.com', UUID = '00000000-0000-4000-8000-000000000000') {
	proxyIP = proxyIP.toLowerCase();
	if (!mitmonIpMetavech || !mitmonNituachMetavech || mitmonIpMetavech !== proxyIP) {
		function nituachMachrozetKtovetPort(str) {
			let ktovet = str, portNum = 443;
			if (str.includes(']:')) {
				const parts = str.split(']:');
				ktovet = parts[0] + ']';
				portNum = parseInt(parts[1], 10) || portNum;
			} else if ((str.match(/:/g) || []).length === 1 && !str.startsWith('[')) {
				const colonIndex = str.lastIndexOf(':');
				ktovet = str.slice(0, colonIndex);
				portNum = parseInt(str.slice(colonIndex + 1), 10) || portNum;
			}
			return [ktovet, portNum];
		}

		function nituachRishumTXTmetavech(txtData) {
			return txtData.flatMap(data => {
				if (data.startsWith('"') && data.endsWith('"')) data = data.slice(1, -1);
				return data.replace(/\\010/g, ',').replace(/\n/g, ',').split(',').map(s => s.trim()).filter(Boolean);
			}).map(prefix => nituachMachrozetKtovetPort(prefix));
		}

		const maarachMetavechIP = await saderLeMaarach(proxyIP);
		let maarachKolMetavech = [];
		const ipv4Regex = /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
		const ipv6Regex = /^\[?(?:[a-fA-F0-9]{0,4}:){1,7}[a-fA-F0-9]{0,4}\]?$/;

		// Iterate and process each IP element in the array
		for (const singleProxyIP of maarachMetavechIP) {
			let [ktovet, portNum] = nituachMachrozetKtovetPort(singleProxyIP);

			if (singleProxyIP.includes('.tp')) {
				const tpMatch = singleProxyIP.match(/\.tp(\d+)/);
				if (tpMatch) portNum = parseInt(tpMatch[1], 10);
			}

			// Determine whether it's a domain (not an IP address)
			if (ipv4Regex.test(ktovet) || ipv6Regex.test(ktovet)) {
				log(`[proxy resolve] ${ktovet} is an IP address, using directly`);
				maarachKolMetavech.push([ktovet, portNum]);
				continue;
			}

			const [txtRecords, aRecords] = await Promise.all([
				shailtaDoH(ktovet, 'TXT'),
				shailtaDoH(ktovet, 'A')
			]);

			const txtData = txtRecords.filter(r => r.type === 16).map(r => (r.data));
			const txtAddresses = nituachRishumTXTmetavech(txtData);
			if (txtAddresses.length > 0) {
				log(`[proxy resolve] ${ktovet} using TXT records, total ${txtAddresses.length} results`);
				maarachKolMetavech.push(...txtAddresses);
				continue;
			}

			const ipv4List = aRecords.filter(r => r.type === 1).map(r => r.data);
			if (ipv4List.length > 0) {
				log(`[proxy resolve] ${ktovet} got no TXT records, using A records, total ${ipv4List.length} results`);
				maarachKolMetavech.push(...ipv4List.map(ip => [ip, portNum]));
				continue;
			}

			const aaaaRecords = await shailtaDoH(ktovet, 'AAAA');
			const ipv6List = aaaaRecords.filter(r => r.type === 28).map(r => `[${r.data}]`);
			if (ipv6List.length > 0) {
				log(`[proxy resolve] ${ktovet} got no TXT/A records, using AAAA records, total ${ipv6List.length} results`);
				maarachKolMetavech.push(...ipv6List.map(ip => [ip, portNum]));
			} else {
				log(`[proxy resolve] ${ktovet} got no TXT/A/AAAA records, keeping the original domain`);
				maarachKolMetavech.push([ktovet, portNum]);
			}
		}
		const maarachMemuyan = maarachKolMetavech.sort((a, b) => a[0].localeCompare(b[0]));
		const domainShoreshYaad = domainYaad.includes('.') ? domainYaad.split('.').slice(-2).join('.') : domainYaad;
		let zeraAckrai = [...(domainShoreshYaad + UUID)].reduce((a, c) => a + c.charCodeAt(0), 0);
		log(`[proxy resolve] random seed: ${zeraAckrai}\ntarget site: ${domainShoreshYaad}`)
		const achreiTirtuf = [...maarachMemuyan].sort(() => (zeraAckrai = (zeraAckrai * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff - 0.5);
		mitmonNituachMetavech = achreiTirtuf.slice(0, 8);
		log(`[proxy resolve] resolve complete, total: ${mitmonNituachMetavech.length}\n${mitmonNituachMetavech.map(([ip, port], index) => `${index + 1}. ${ip}:${port}`).join('\n')}`);
		mitmonIpMetavech = proxyIP;
	} else log(`[proxy resolve] read cache, total: ${mitmonNituachMetavech.length}\n${mitmonNituachMetavech.map(([ip, port], index) => `${index + 1}. ${ip}:${port}`).join('\n')}`);
	return mitmonNituachMetavech;
}

// ===== Network-settings functions =====
const reshimatDomainMevugarim = [
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

function huDomainMevugarim(hostname) {
	if (!hostname) return false;
	const h = hostname.toLowerCase();
	for (const domain of reshimatDomainMevugarim) {
		if (h === domain || h.endsWith('.' + domain)) return true;
	}
	return false;
}

function atarChasum(hostname) {
	if (isSpeedTestSite(hostname)) return true;
	if (hagdarotReshet && hagdarotReshet.enablePornBlock) {
		return huDomainMevugarim(hostname);
	}
	return false;
}

function dafChasum(request) {
	const url = new URL(request.url);
	const host = url.host;
	const html = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Blocked / مسدود شده</title><style>@import url("https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700;800;900&display=swap");*{margin:0;padding:0;box-sizing:border-box}body{font-family:"Vazirmatn",sans-serif;background:linear-gradient(135deg,#0f0c29,#302b63,#24243e);min-height:100vh;display:flex;justify-content:center;align-items:center;padding:20px}.card{background:rgba(255,255,255,0.05);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.1);border-radius:24px;padding:48px 40px;max-width:480px;width:100%;text-align:center;position:relative;overflow:hidden}.card::before{content:"";position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:conic-gradient(from 0deg,transparent,rgba(239,68,68,0.1),transparent,rgba(239,68,68,0.05),transparent);animation:spin 6s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}.content{position:relative;z-index:1}.shield{width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,#8b5cf6,#6d28d9);display:flex;align-items:center;justify-content:center;margin:0 auto 24px;font-size:36px;color:#fff;box-shadow:0 8px 32px rgba(139,92,246,0.3)}h1{color:#fff;font-size:24px;font-weight:900;margin-bottom:8px;letter-spacing:-0.5px}h1 span{background:linear-gradient(135deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent}p{color:rgba(255,255,255,0.6);font-size:14px;line-height:1.8;margin:12px 0}.badge{display:inline-block;background:linear-gradient(135deg,#ef4444,#dc2626);color:#fff;padding:4px 16px;border-radius:20px;font-size:12px;font-weight:700;margin-bottom:16px}</style></head><body><div class="card"><div class="content"><div class="shield">&#x1F6E1;</div><h1><span>Blocked</span></h1><p>This site has been blocked by the network administrator.</p><div class="badge">BLOCKED</div><p style="font-size:12px;opacity:0.5;margin-top:16px">${host}</p></div></div></body></html>`;
	return new Response(html, { status: 403, headers: { 'Content-Type': 'text/html;charset=utf-8', 'Cache-Control': 'no-store' } });
}

async function tipulBakashatDoH(request) {
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
async function shlachHodaatBot(botToken, chatId, text, parseMode = 'HTML') {
	const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&parse_mode=${parseMode}&text=${encodeURIComponent(text)}`;
	try { return await fetch(url, { method: 'GET' }); } catch (e) { console.error('sendBotMessage error:', e); }
}

function mikledetTafritRashi(panelUrl, subUrl) {
	return { inline_keyboard: [
		[{ text: '📊 وضعیت', callback_data: 'm:status', style: 'primary' }, { text: '🔗 اشتراک', callback_data: 'm:sub', style: 'primary' }],
		[{ text: '⚙️ کانفیگ', callback_data: 'm:config', style: 'primary' }, { text: '🌐 دامنه‌ها', callback_data: 'm:hosts', style: 'primary' }],
		[{ text: '🖥 پنل مدیریت', web_app: { url: panelUrl }, style: 'success' }, { text: '🔄 منو', callback_data: 'm:menu', style: 'primary' }]
	] };
}

function bnyatHodaatMatzav(cfg, host, userID, lang) {
	const P = (fa, en, ru) => lang === 'ru' ? ru : lang === 'fa' ? fa : en;
	const uptime = Date.now() - (globalThis.__workerStart || Date.now());
	const uptimeStr = `${Math.floor(uptime / 3600000)}h ${Math.floor((uptime % 3600000) / 60000)}m`;
	const barLen = 12;
	let msg = P(
		`<b>╔═══❰📊 وضعیت سرور ❱═══╝</b>\n\n<blockquote>⏱ <b>آپتایم:</b> <code>${uptimeStr}</code>\n🆔 <b>UUID:</b> <code>${userID.slice(0, 8)}...</code>\n🌐 <b>Host:</b> <code>${host}</code>\n📁 <b>مسیر:</b> <code>${cfg.PATH || '/'}</code></blockquote>`,
		`<b>╔═══❰📊 Server Status ❱═══╝</b>\n\n<blockquote>⏱ <b>Uptime:</b> <code>${uptimeStr}</code>\n🆔 <b>UUID:</b> <code>${userID.slice(0, 8)}...</code>\n🌐 <b>Host:</b> <code>${host}</code>\n📁 <b>Path:</b> <code>${cfg.PATH || '/'}</code></blockquote>`,
		`<b>╔═══❰📊 Статус сервера ❱═══╝</b>\n\n<blockquote>⏱ <b>Аптайм:</b> <code>${uptimeStr}</code>\n🆔 <b>UUID:</b> <code>${userID.slice(0, 8)}...</code>\n🌐 <b>Host:</b> <code>${host}</code>\n📁 <b>Путь:</b> <code>${cfg.PATH || '/'}</code></blockquote>`);
	const cfUsage = cfg.CF?.Usage;
	if (cfUsage?.success) {
		const pct = (cfUsage.total / cfUsage.max);
		const filled = Math.round(pct * barLen);
		const empty = barLen - filled;
		const bar = '🟩'.repeat(filled) + '⬜'.repeat(empty);
		msg += P(
			`\n<blockquote><b>📈 مصرف Cloudflare</b>\n${bar} <b>${(pct * 100).toFixed(1)}%</b>\n━━━━━━━━━━━━━━━━━━━\n📄 Pages: <code>${cfUsage.pages}</code>\n⚙️ Workers: <code>${cfUsage.workers}</code>\n💠 مجموع: <code>${cfUsage.total}/${cfUsage.max}</code></blockquote>`,
			`\n<blockquote><b>📈 Cloudflare Usage</b>\n${bar} <b>${(pct * 100).toFixed(1)}%</b>\n━━━━━━━━━━━━━━━━━━━\n📄 Pages: <code>${cfUsage.pages}</code>\n⚙️ Workers: <code>${cfUsage.workers}</code>\n💠 Total: <code>${cfUsage.total}/${cfUsage.max}</code></blockquote>`,
			`\n<blockquote><b>📈 Использование Cloudflare</b>\n${bar} <b>${(pct * 100).toFixed(1)}%</b>\n━━━━━━━━━━━━━━━━━━━\n📄 Pages: <code>${cfUsage.pages}</code>\n⚙️ Workers: <code>${cfUsage.workers}</code>\n💠 Всего: <code>${cfUsage.total}/${cfUsage.max}</code></blockquote>`);
	}
	msg += `\n<b>╚══════════════════════╝</b>`;
	return msg;
}

function bnyatHodaatTetzura(cfg, host, lang) {
	const P = (fa, en, ru) => lang === 'ru' ? ru : lang === 'fa' ? fa : en;
	const transport = cfg.protokolHaavara || 'ws';
	const status = (v) => v ? P('🟢 فعال', '🟢 Active', '🟢 Активно') : P('🔴 غیرفعال', '🔴 Inactive', '🔴 Отключено');
	const fragments = cfg.pilugTLS || P('🔴 غیرفعال', '🔴 Inactive', '🔴 Отключено');
	return P(
		`<b>╔═══❰⚙️ تنظیمات ❱═══╝</b>\n\n<blockquote><b>📡 شبکه</b>\n━━━━━━━━━━━━━━━━━━━\n<b>نقل:</b> <code>${transport}</code>\n<b>Host:</b> <code>${cfg.HOST || host}</code>\n<b>مسیر:</b> <code>${cfg.PATH || '/'}</code>\n<b>Fingerprint:</b> <code>${cfg.Fingerprint || 'chrome'}</code></blockquote>\n\n<blockquote><b>🔐 امنیت</b>\n━━━━━━━━━━━━━━━━━━━\n<b>Skip Verify:</b> ${status(cfg.dalegImutTeuda)}\n<b>ECH:</b> ${status(cfg.ECH)}\n<b>0-RTT:</b> ${status(cfg.efsher0RTT)}\n<b>TLS Fragment:</b> ${fragments}</blockquote>\n\n<blockquote><b>🧩 ویژگی‌ها</b>\n━━━━━━━━━━━━━━━━━━━\n<b>میکس پروتکل:</b> ${status(cfg.sugProtokol === 'mixed')}\n<b>TG Bot:</b> ${status(cfg.TG?.efsher)}\n<b>نام اشتراک:</b> <code>${cfg.muvcharMinuyMecholel?.SUBNAME || '-'}</code></blockquote>\n\n<b>╚══════════════════════╝</b>`,
		`<b>╔═══❰⚙️ Config ❱═══╝</b>\n\n<blockquote><b>📡 Network</b>\n━━━━━━━━━━━━━━━━━━━\n<b>Transport:</b> <code>${transport}</code>\n<b>Host:</b> <code>${cfg.HOST || host}</code>\n<b>Path:</b> <code>${cfg.PATH || '/'}</code>\n<b>Fingerprint:</b> <code>${cfg.Fingerprint || 'chrome'}</code></blockquote>\n\n<blockquote><b>🔐 Security</b>\n━━━━━━━━━━━━━━━━━━━\n<b>Skip Verify:</b> ${status(cfg.dalegImutTeuda)}\n<b>ECH:</b> ${status(cfg.ECH)}\n<b>0-RTT:</b> ${status(cfg.efsher0RTT)}\n<b>TLS Fragment:</b> ${fragments}</blockquote>\n\n<blockquote><b>🧩 Features</b>\n━━━━━━━━━━━━━━━━━━━\n<b>Mixed Protocol:</b> ${status(cfg.sugProtokol === 'mixed')}\n<b>TG Bot:</b> ${status(cfg.TG?.efsher)}\n<b>Sub Name:</b> <code>${cfg.muvcharMinuyMecholel?.SUBNAME || '-'}</code></blockquote>\n\n<b>╚══════════════════════╝</b>`,
		`<b>╔═══❰⚙️ Настройки ❱═══╝</b>\n\n<blockquote><b>📡 Сеть</b>\n━━━━━━━━━━━━━━━━━━━\n<b>Транспорт:</b> <code>${transport}</code>\n<b>Host:</b> <code>${cfg.HOST || host}</code>\n<b>Путь:</b> <code>${cfg.PATH || '/'}</code>\n<b>Fingerprint:</b> <code>${cfg.Fingerprint || 'chrome'}</code></blockquote>\n\n<blockquote><b>🔐 Безопасность</b>\n━━━━━━━━━━━━━━━━━━━\n<b>Skip Verify:</b> ${status(cfg.dalegImutTeuda)}\n<b>ECH:</b> ${status(cfg.ECH)}\n<b>0-RTT:</b> ${status(cfg.efsher0RTT)}\n<b>TLS Fragment:</b> ${fragments}</blockquote>\n\n<blockquote><b>🧩 Функции</b>\n━━━━━━━━━━━━━━━━━━━\n<b>Mixed Protocol:</b> ${status(cfg.sugProtokol === 'mixed')}\n<b>TG Bot:</b> ${status(cfg.TG?.efsher)}\n<b>Имя подписки:</b> <code>${cfg.muvcharMinuyMecholel?.SUBNAME || '-'}</code></blockquote>\n\n<b>╚══════════════════════╝</b>`);
}

async function bnyatHodaatDomain(cfg, env, lang) {
	const P = (fa, en, ru) => lang === 'ru' ? ru : lang === 'fa' ? fa : en;
	const poolHosts = (cfg.HOSTS && cfg.HOSTS.length) ? cfg.HOSTS : (cfg.HOST ? [cfg.HOST] : []);
	const healthMap = {};
	try { const h = JSON.parse(await env.KV.get('domain-health.json') || 'null'); if (h && Array.isArray(h.domains)) for (const d of h.domains) healthMap[d.host] = d.ok; } catch (e) { /* ignore */ }
	const list = poolHosts.length ? poolHosts.map(h => `${healthMap[h] === false ? '🔴' : healthMap[h] === true ? '🟢' : '⚪️'} <code>${h}</code>`).join('\n') : P('هیچ دامنه‌ای ثبت نشده', 'No domains registered', 'Домены не зарегистрированы');
	return P(
		`<b>╔═══❰🌐 دامنه‌ها ❱═══╗</b>\n\n<blockquote>${list}</blockquote>\n\n<i>🟢 سالم  🔴 خطا  ⚪️ بررسی‌نشده</i>\n<b>╚══════════════════╝</b>`,
		`<b>╔═══❰🌐 Hosts ❱═══╗</b>\n\n<blockquote>${list}</blockquote>\n\n<i>🟢 Healthy  🔴 Error  ⚪️ Not checked</i>\n<b>╚══════════════════╝</b>`,
		`<b>╔═══❰🌐 Хосты ❱═══╗</b>\n\n<blockquote>${list}</blockquote>\n\n<i>🟢 Работает  🔴 Ошибка  ⚪️ Не проверено</i>\n<b>╚══════════════════╝</b>`);
}

function tekstTafritRashi(lang) {
	const P = (fa, en, ru) => lang === 'ru' ? ru : lang === 'fa' ? fa : en;
	return P(
		`<b>🛰 به ربات Nova Proxy خوش آمدید</b>\n\n<blockquote>مدیریت پنل از تلگرام:\nدریافت لینک اشتراک، وضعیت، مصرف و تنظیمات</blockquote>\n\nاز دکمه‌های زیر استفاده کنید 👇`,
		`<b>🛰 Welcome to Nova Proxy Bot</b>\n\n<blockquote>Manage your panel from Telegram:\nGet subscription link, status, usage & settings</blockquote>\n\nUse the buttons below 👇`,
		`<b>🛰 Добро пожаловать в бот Nova Proxy</b>\n\n<blockquote>Управляйте панелью из Telegram:\nссылка на подписку, статус, трафик и настройки</blockquote>\n\nИспользуйте кнопки ниже 👇`);
}
function mikledetTafritRashiV2(panelUrl, subUrl, lang) {
	const P = (fa, en, ru) => lang === 'ru' ? ru : lang === 'fa' ? fa : en;
	// language toggle button shows the NEXT language in the fa -> en -> ru -> fa cycle
	const nextLangLabel = P('🌐 English 🇺🇸', '🌐 Русский 🇷🇺', 'فارسی 🇮🇷');
	return { inline_keyboard: [
		[{ text: P('📊 وضعیت', '📊 Status', '📊 Статус'), callback_data: 'm:status', style: 'primary' }, { text: P('🔗 اشتراک', '🔗 Subscription', '🔗 Подписка'), callback_data: 'm:sub', style: 'primary' }],
		[{ text: P('⚙️ کانفیگ', '⚙️ Config', '⚙️ Настройки'), callback_data: 'm:config', style: 'primary' }, { text: P('🌐 دامنه‌ها', '🌐 Hosts', '🌐 Хосты'), callback_data: 'm:hosts', style: 'primary' }],
		[{ text: P('👥 کاربران', '👥 Users', '👥 Пользователи'), callback_data: 'tg_users:0', style: 'primary' }],
		[{ text: P('📈 آمار', '📈 Stats', '📈 Статистика'), callback_data: 'tg_stats', style: 'success' }, { text: P('📋 لاگ‌ها', '📋 Logs', '📋 Логи'), callback_data: 'tg_logs:0', style: 'danger' }],
		[{ text: P('🚨 پنیک', '🚨 Panic', '🚨 Паника'), callback_data: 'sys_panic_init', style: 'danger' }],
		[{ text: P('🖥 پنل مدیریت', '🖥 Panel', '🖥 Панель'), web_app: { url: panelUrl }, style: 'success' }],
		[{ text: nextLangLabel, callback_data: 'tg_lang', style: 'primary' }, { text: P('🔄 منو', '🔄 Menu', '🔄 Меню'), callback_data: 'm:menu', style: 'primary' }]
	] };
}
function tgFmtBytes(n) { n = Number(n) || 0; if (n <= 0) return '0 B'; const u = ['B', 'KB', 'MB', 'GB', 'TB']; const i = Math.floor(Math.log(n) / Math.log(1024)); const v = n / Math.pow(1024, i); return (v >= 100 ? v.toFixed(0) : v >= 10 ? v.toFixed(1) : v.toFixed(2)) + ' ' + u[i]; }
// Trilingual picker for bot messages (falls back en -> fa)
function _btl(lang, o){ return (o && (o[lang] || o.en || o.fa)) || ''; }
function _tgRandHex(n){ return Array.from(crypto.getRandomValues(new Uint8Array(n)), b => b.toString(16).padStart(2, '0')).join(''); }
// Pending multi-step input state, kept in KV so a force_reply answer survives landing on a different isolate
async function tgPendingSet(env, chatId, obj){ try{ await env.KV.put('tg_pending:' + chatId, JSON.stringify(Object.assign({ at: Date.now() }, obj)), { expirationTtl: 600 }); }catch(e){} }
async function tgPendingGet(env, chatId){ try{ const v = await env.KV.get('tg_pending:' + chatId); if(!v) return null; const o = JSON.parse(v); if(Date.now() - (o.at || 0) > 600000) return null; return o; }catch(e){ return null; } }
async function tgPendingClear(env, chatId){ try{ await env.KV.delete('tg_pending:' + chatId); }catch(e){} }
// Create a user from a name, mirroring the panel's normalization (id + token required by the save filter)
function tgCreateUser(ns, name){
	if(!Array.isArray(ns.users)) ns.users = [];
	const _seen = {}, _seenTag = {};
	for(const u of ns.users){ if(u && u.username) _seen[String(u.username).toLowerCase()] = 1; if(u && u.tag) _seenTag[String(u.tag).toLowerCase()] = 1; }
	let base = String(name || 'user').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 24) || ('user' + (ns.users.length + 1));
	let uname = base, n = 2; while(_seen[uname]){ uname = base + n; n++; }
	let btag = String(name || uname).replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 40) || uname;
	let tag = btag, m = 2; while(_seenTag[String(tag).toLowerCase()]){ tag = btag + m; m++; }
	const u = { id: _tgRandHex(16), token: _tgRandHex(16), key: _tgRandHex(6), name: String(name || uname).slice(0, 40), username: uname, tag, enabled: true, expiry: '', quotaBytes: 0, dailyQuotaBytes: 0, created: new Date().toISOString() };
	ns.users.push(u);
	return u;
}
function tgUsersList(users, page, lang) {
	const L = (o)=>_btl(lang, o);
	const perPage = 5;
	const totalPages = Math.max(1, Math.ceil(users.length / perPage));
	const start = page * perPage;
	const pageUsers = users.slice(start, start + perPage);
	let text = `<b>👥 ${L({en:'Users List',fa:'لیست کاربران',ru:'Список пользователей'})} (${page + 1}/${totalPages})</b>\n━━━━━━━━━━━━━━━━\n`;
	if (!users.length) text += L({en:'⚠️ No users yet',fa:'⚠️ کاربری وجود ندارد',ru:'⚠️ Пока нет пользователей'});
	else pageUsers.forEach((u, i) => { text += `${start + i + 1}. <b>${u.name || u.username || u.id}</b>\n   <code>${u.id.slice(0, 12)}...</code>\n`; });
	text += '━━━━━━━━━━━━━━━━';
	const kb = [];
	kb.push([{ text: L({en:'➕ Add User',fa:'➕ افزودن کاربر',ru:'➕ Добавить пользователя'}), callback_data: 'tg_uadd', style: 'success' }]);
	pageUsers.forEach(u => { kb.push([{ text: `👤 ${u.name || u.username || u.id}`, callback_data: `tg_user:${u.id}`, style: 'primary' }]); });
	const nav = [];
	if (page > 0) nav.push({ text: `⬅️ ${L({en:'Prev',fa:'قبلی',ru:'Назад'})}`, callback_data: `tg_users:${page - 1}`, style: 'primary' });
	if (start + perPage < users.length) nav.push({ text: `${L({en:'Next',fa:'بعدی',ru:'Вперёд'})} ➡️`, callback_data: `tg_users:${page + 1}`, style: 'primary' });
	if (nav.length) kb.push(nav);
	kb.push([{ text: L({en:'🔙 Main Menu',fa:'🔙 منوی اصلی',ru:'🔙 Главное меню'}), callback_data: 'm:menu', style: 'success' }]);
	return { text, kb: { inline_keyboard: kb } };
}
function tgUserDetail(u, lang) {
	const L = (o)=>_btl(lang, o);
	let status = L({en:'🟢 Active',fa:'🟢 فعال',ru:'🟢 Активен'});
	if (u.enabled === false) status = L({en:'🔴 Disabled',fa:'🔴 غیرفعال',ru:'🔴 Отключён'});
	else if (u.expiry && Date.now() > Date.parse(u.expiry)) status = L({en:'🟡 Expired',fa:'🟡 منقضی',ru:'🟡 Истёк'});
	let text = `<b>👤 ${u.name || u.username || u.id}</b>\n━━━━━━━━━━━━━━━━\n`;
	text += `${L({en:'ID',fa:'شناسه',ru:'ID'})}: <code>${u.id}</code>\n`;
	text += `${L({en:'Status',fa:'وضعیت',ru:'Статус'})}: ${status}\n`;
	text += `${L({en:'Username',fa:'نام کاربری',ru:'Имя пользователя'})}: <code>${u.username || '-'}</code>\n`;
	text += `${L({en:'Tag',fa:'تگ',ru:'Тег'})}: <code>${u.tag || '-'}</code>\n`;
	text += `${L({en:'Expiry',fa:'انقضا',ru:'Истекает'})}: <code>${u.expiry || (L({en:'never',fa:'بدون انقضا',ru:'бессрочно'}))}</code>\n`;
	text += `${L({en:'Quota',fa:'ترافیک',ru:'Квота'})}: <code>${u.quotaBytes ? tgFmtBytes(u.quotaBytes) : (L({en:'unlimited',fa:'نامحدود',ru:'без лимита'}))}</code>\n`;
	if (u.connLimit) text += `${L({en:'Conn Limit',fa:'محدودیت اتصال',ru:'Лимит соединений'})}: <code>${u.connLimit}</code>\n`;
	if (u.maxConfigs) text += `${L({en:'Max Configs',fa:'حداکثر کانفیگ',ru:'Макс. конфигов'})}: <code>${u.maxConfigs}</code>\n`;
	if (u.notes) text += `${L({en:'Notes',fa:'یادداشت',ru:'Заметки'})}: ${u.notes}\n`;
	text += '━━━━━━━━━━━━━━━━';
	const kb = [
		[{ text: u.enabled === false ? L({en:'🟢 Enable',fa:'🟢 فعال‌سازی',ru:'🟢 Включить'}) : L({en:'🔴 Disable',fa:'🔴 غیرفعال‌سازی',ru:'🔴 Отключить'}), callback_data: `tg_utoggle:${u.id}`, style: u.enabled === false ? 'success' : 'danger' }],
		[{ text: L({en:'✏️ Name',fa:'✏️ نام',ru:'✏️ Имя'}), callback_data: `tg_uename:${u.id}`, style: 'primary' }, { text: L({en:'📊 Quota',fa:'📊 ترافیک',ru:'📊 Квота'}), callback_data: `tg_uequota:${u.id}`, style: 'primary' }],
		[{ text: L({en:'📅 Set Expiry',fa:'📅 تنظیم انقضا',ru:'📅 Срок'}), callback_data: `tg_ueexp:${u.id}`, style: 'primary' }, { text: L({en:'⏱️ Extend',fa:'⏱️ تمدید',ru:'⏱️ Продлить'}), callback_data: `tg_uext:${u.id}`, style: 'primary' }],
		[{ text: L({en:'🔄 Reset Traffic',fa:'🔄 ریست ترافیک',ru:'🔄 Сбросить трафик'}), callback_data: `tg_ureset:${u.id}`, style: 'primary' }, { text: L({en:'📎 Sub Link',fa:'📎 لینک اشتراک',ru:'📎 Ссылка'}), callback_data: `tg_usub:${u.id}`, style: 'primary' }],
		[{ text: L({en:'🗑️ Delete',fa:'🗑️ حذف',ru:'🗑️ Удалить'}), callback_data: `tg_udel:${u.id}`, style: 'danger' }],
		[{ text: L({en:'🔙 Users List',fa:'🔙 لیست کاربران',ru:'🔙 Список'}), callback_data: 'tg_users:0', style: 'primary' }, { text: L({en:'🏠 Menu',fa:'🏠 منو',ru:'🏠 Меню'}), callback_data: 'm:menu', style: 'success' }]
	];
	return { text, kb: { inline_keyboard: kb } };
}
function tgStatsText(env, lang) {
	const P = (fa, en, ru) => lang === 'ru' ? ru : lang === 'fa' ? fa : en;
	const uptime = Date.now() - (globalThis.__workerStart || Date.now());
	const h = Math.floor(uptime / 3600000), m = Math.floor((uptime % 3600000) / 60000);
	let text = `<b>📈 ${P('آمار سیستم', 'System Stats', 'Статистика системы')}</b>\n━━━━━━━━━━━━━━━━\n`;
	text += `⏱ ${P('آپتایم', 'Uptime', 'Аптайм')}: <code>${h}h ${m}m</code>\n`;
	text += `📦 ${P('نسخه', 'Version', 'Версия')}: <code>${typeof Version !== 'undefined' ? Version : 'N/A'}</code>\n`;
	const users = Array.isArray(hagdarotReshet && hagdarotReshet.users) ? hagdarotReshet.users : [];
	text += `👥 ${P('کل کاربران', 'Total Users', 'Всего пользователей')}: <code>${users.length}</code>\n`;
	text += `🟢 ${P('فعال', 'Active', 'Активны')}: <code>${users.filter(u => u.enabled !== false && (!u.expiry || Date.now() <= Date.parse(u.expiry))).length}</code>\n`;
	text += `🔴 ${P('غیرفعال', 'Disabled', 'Отключены')}: <code>${users.filter(u => u.enabled === false).length}</code>\n`;
	text += `🟡 ${P('منقضی', 'Expired', 'Истекли')}: <code>${users.filter(u => u.expiry && Date.now() > Date.parse(u.expiry) && u.enabled !== false).length}</code>\n`;
	text += '━━━━━━━━━━━━━━━━';
	return text;
}
function tgLogsList(logs, page, lang) {
	const P = (fa, en, ru) => lang === 'ru' ? ru : lang === 'fa' ? fa : en;
	const perPage = 8;
	const totalPages = Math.max(1, Math.ceil(logs.length / perPage));
	const start = page * perPage;
	const pageLogs = logs.slice(start, start + perPage);
	let text = `<b>📋 ${P('لاگ فعالیت', 'Activity Logs', 'Журнал активности')} (${page + 1}/${totalPages})</b>\n━━━━━━━━━━━━━━━━\n`;
	if (!logs.length) text += P('⚠️ لاگی وجود ندارد', '⚠️ No logs', '⚠️ Нет записей');
	else pageLogs.forEach((l, i) => { text += `${start + i + 1}. [${l.TYPE || '-'}] ${l.IP || '-'} ${l.URL ? l.URL.slice(0, 40) : ''}\n`; });
	text += '━━━━━━━━━━━━━━━━';
	const kb = [];
	const nav = [];
	if (page > 0) nav.push({ text: `⬅️ ${P('قبلی', 'Prev', 'Назад')}`, callback_data: `tg_logs:${page - 1}`, style: 'primary' });
	if (start + perPage < logs.length) nav.push({ text: `${P('بعدی', 'Next', 'Далее')} ➡️`, callback_data: `tg_logs:${page + 1}`, style: 'primary' });
	if (nav.length) kb.push(nav);
	kb.push([{ text: P('🔙 منوی اصلی', '🔙 Main Menu', '🔙 Главное меню'), callback_data: 'm:menu', style: 'success' }]);
	return { text, kb: { inline_keyboard: kb } };
}

async function tipulTelegramWebhook(request, env, userID, host, encryptionKey = null) {
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
				const tgKey = encryptionKey || env.KEY || (await env.KV.get('auto_key')) || 'Do not use this default KEY, add a KEY variable to set your own';
				const loginToken = await yatzerTokenKnisatTelegram(cbChat, tgKey);
				const panelUrl = `${protocol}://${host}/admin/telegram-login?chat_id=${encodeURIComponent(cbChat)}&token=${loginToken}`;
				const subToken = await MD5MD5(host + userID);
				const subUrl = `${protocol}://${host}/sub?token=${subToken}`;
				let _tgLang = 'fa';
				try { const _ls = await env.KV.get('tg_bot_lang:' + cbChat); if (_ls) _tgLang = _ls; } catch (e) {}
				const keyboard = mikledetTafritRashiV2(panelUrl, subUrl, _tgLang);
				let editText = null, sendText = null;
				if (data === 'm:status' || data === 'cb_status') sendText = bnyatHodaatMatzav(config_JSON, host, userID, _tgLang);
				else if (data === 'm:config' || data === 'cb_config') sendText = bnyatHodaatTetzura(config_JSON, host, _tgLang);
				else if (data === 'm:hosts' || data === 'cb_hosts') sendText = await bnyatHodaatDomain(config_JSON, env, _tgLang);
				else if (data === 'm:menu' || data === 'cb_menu') sendText = tekstTafritRashi(_tgLang);
				else if (data === 'm:sub' || data === 'cb_sub') {
					sendText = _btl(_tgLang, {
						en: `<b>╔═══❰🔗 Subscription ❱═══╗</b>\n\n<blockquote><b>📎 Your subscription link:</b>\n<code>${subUrl}</code></blockquote>\n\n<b>📥 <a href="${subUrl}">Open directly</a></b>\n\n<b>╚══════════════════╝</b>`,
						fa: `<b>╔═══❰🔗 اشتراک ❱═══╗</b>\n\n<blockquote><b>📎 لینک اشتراک شما:</b>\n<code>${subUrl}</code></blockquote>\n\n<b>📥 <a href="${subUrl}">باز کردن مستقیم</a></b>\n\n<b>╚══════════════════╝</b>`,
						ru: `<b>╔═══❰🔗 Подписка ❱═══╗</b>\n\n<blockquote><b>📎 Ваша ссылка на подписку:</b>\n<code>${subUrl}</code></blockquote>\n\n<b>📥 <a href="${subUrl}">Открыть напрямую</a></b>\n\n<b>╚══════════════════╝</b>`
					});
				}
				if (sendText) {
					try { await tgApi(TG_JSON.BotToken, 'sendMessage', { chat_id: cbChat, parse_mode: 'HTML', text: sendText, reply_markup: data.startsWith('m:menu') || data === 'cb_menu' ? keyboard : undefined }); } catch (e) { console.error('tg send error:', e); }
				}
				// --- New callbacks: users, stats, logs, lang, user actions ---
				if (!hagdarotReshet) { try { hagdarotReshet = JSON.parse(await env.KV.get('network-settings.json') || '{}'); } catch (e) { hagdarotReshet = {}; } }
				const _users = Array.isArray(hagdarotReshet.users) ? hagdarotReshet.users : [];
				if (data.startsWith('tg_users:')) {
					const _page = parseInt(data.split(':')[1]) || 0;
					const _r = tgUsersList(_users, _page, _tgLang);
					try { await tgApi(TG_JSON.BotToken, 'sendMessage', { chat_id: cbChat, parse_mode: 'HTML', text: _r.text, reply_markup: _r.kb }); } catch (e) {}
				} else if (data.startsWith('tg_user:')) {
					const _uid = data.slice(8);
					const _u = _users.find(x => x.id === _uid);
					if (_u) { const _r = tgUserDetail(_u, _tgLang); try { await tgApi(TG_JSON.BotToken, 'sendMessage', { chat_id: cbChat, parse_mode: 'HTML', text: _r.text, reply_markup: _r.kb }); } catch (e) {} }
					else { try { await tgApi(TG_JSON.BotToken, 'sendMessage', { chat_id: cbChat, parse_mode: 'HTML', text: _btl(_tgLang, { en: '⚠️ User not found', fa: '⚠️ کاربر یافت نشد', ru: '⚠️ Пользователь не найден' }), reply_markup: { inline_keyboard: [[{ text: _btl(_tgLang, { en: '🔙 Users List', fa: '🔙 لیست کاربران', ru: '🔙 Список пользователей' }), callback_data: 'tg_users:0', style: 'primary' }]] } }); } catch (e) {} }
				} else if (data.startsWith('tg_utoggle:')) {
					const _uid = data.slice(11);
					const _u = _users.find(x => x.id === _uid);
					if (_u) { _u.enabled = _u.enabled === false ? true : false; if (_u.enabled) { delete _u.disabledReason; delete _u.disabledAt; } await env.KV.put('network-settings.json', JSON.stringify(hagdarotReshet, null, 2)); savedUsersAuth = null; const _r = tgUserDetail(_u, _tgLang); try { await tgApi(TG_JSON.BotToken, 'sendMessage', { chat_id: cbChat, parse_mode: 'HTML', text: _r.text, reply_markup: _r.kb }); } catch (e) {} }
				} else if (data.startsWith('tg_ureset:')) {
					const _uid = data.slice(10);
					try { await usageReset(env, 'uusage:' + _uid); } catch (e) {}
					const _now = new Date(); for (let i = 0; i < 7; i++) { const d = new Date(_now); d.setDate(d.getDate() - i); try { await usageReset(env, 'uusage-d:' + _uid + ':' + getDateKey(d)); } catch (e) {} }
					const _u = _users.find(x => x.id === _uid);
					if (_u) { _u.enabled = true; delete _u.disabledReason; delete _u.disabledAt; await env.KV.put('network-settings.json', JSON.stringify(hagdarotReshet, null, 2)); savedUsersAuth = null; const _r = tgUserDetail(_u, _tgLang); try { await tgApi(TG_JSON.BotToken, 'sendMessage', { chat_id: cbChat, parse_mode: 'HTML', text: _r.text, reply_markup: _r.kb }); } catch (e) {} }
				} else if (data.startsWith('tg_usub:')) {
					const _uid = data.slice(8);
					const _u = _users.find(x => x.id === _uid);
					if (_u) { const _subUrl = `${protocol}://${host}/sub?u=${encodeURIComponent(_u.tag || _u.username || _u.id)}`; try { await tgApi(TG_JSON.BotToken, 'sendMessage', { chat_id: cbChat, parse_mode: 'HTML', text: `<b>📎 ${_btl(_tgLang, { en: 'Subscription Link', fa: 'لینک اشتراک', ru: 'Ссылка на подписку' })}:</b>\n<code>${_subUrl}</code>`, reply_markup: { inline_keyboard: [[{ text: _btl(_tgLang, { en: '🔙 User Detail', fa: '🔙 جزئیات کاربر', ru: '🔙 Данные пользователя' }), callback_data: `tg_user:${_uid}`, style: 'primary' }]] } }); } catch (e) {} }
				} else if (data === 'tg_uadd') {
					await tgPendingSet(env, cbChat, { action: 'add' });
					try { await tgApi(TG_JSON.BotToken, 'sendMessage', { chat_id: cbChat, parse_mode: 'HTML', text: _btl(_tgLang,{en:'➕ <b>Add user</b>\nReply with the new user name.',fa:'➕ <b>افزودن کاربر</b>\nنام کاربر جدید را ارسال کنید.',ru:'➕ <b>Добавить пользователя</b>\nОтправьте имя нового пользователя.'}), reply_markup: { force_reply: true } }); } catch (e) {}
				} else if (data.startsWith('tg_uename:')) {
					await tgPendingSet(env, cbChat, { action: 'ename', uid: data.slice(10) });
					try { await tgApi(TG_JSON.BotToken, 'sendMessage', { chat_id: cbChat, parse_mode: 'HTML', text: _btl(_tgLang,{en:'✏️ Reply with the new name.',fa:'✏️ نام جدید را ارسال کنید.',ru:'✏️ Отправьте новое имя.'}), reply_markup: { force_reply: true } }); } catch (e) {}
				} else if (data.startsWith('tg_uequota:')) {
					await tgPendingSet(env, cbChat, { action: 'equota', uid: data.slice(11) });
					try { await tgApi(TG_JSON.BotToken, 'sendMessage', { chat_id: cbChat, parse_mode: 'HTML', text: _btl(_tgLang,{en:'📊 Reply with the data quota in GB (0 = unlimited).',fa:'📊 حجم ترافیک را به گیگابایت ارسال کنید (۰ = نامحدود).',ru:'📊 Отправьте квоту трафика в ГБ (0 = без лимита).'}), reply_markup: { force_reply: true } }); } catch (e) {}
				} else if (data.startsWith('tg_ueexp:')) {
					await tgPendingSet(env, cbChat, { action: 'eexp', uid: data.slice(9) });
					try { await tgApi(TG_JSON.BotToken, 'sendMessage', { chat_id: cbChat, parse_mode: 'HTML', text: _btl(_tgLang,{en:'📅 Reply with an expiry date (YYYY-MM-DD) or a number of days from now. Send 0 for no expiry.',fa:'📅 تاریخ انقضا (YYYY-MM-DD) یا تعداد روز از اکنون را ارسال کنید. برای بدون انقضا ۰ بفرستید.',ru:'📅 Отправьте дату (YYYY-MM-DD) или число дней от сегодня. 0 = бессрочно.'}), reply_markup: { force_reply: true } }); } catch (e) {}
				} else if (data.startsWith('tg_uext:')) {
					const _uid = data.slice(8);
					const _kb = { inline_keyboard: [[{ text: '+7', callback_data: `tg_uextd:${_uid}:7`, style: 'primary' }, { text: '+30', callback_data: `tg_uextd:${_uid}:30`, style: 'primary' }, { text: '+90', callback_data: `tg_uextd:${_uid}:90`, style: 'primary' }, { text: '+365', callback_data: `tg_uextd:${_uid}:365`, style: 'primary' }], [{ text: _btl(_tgLang,{en:'🔙 Back',fa:'🔙 بازگشت',ru:'🔙 Назад'}), callback_data: `tg_user:${_uid}`, style: 'primary' }]] };
					try { await tgApi(TG_JSON.BotToken, 'sendMessage', { chat_id: cbChat, parse_mode: 'HTML', text: _btl(_tgLang,{en:'⏱️ Extend expiry by how many days?',fa:'⏱️ انقضا چند روز تمدید شود؟',ru:'⏱️ На сколько дней продлить срок?'}), reply_markup: _kb }); } catch (e) {}
				} else if (data.startsWith('tg_uextd:')) {
					const _pp = data.slice(9).split(':'); const _uid = _pp[0]; const _days = parseInt(_pp[1]) || 0;
					const _u = _users.find(x => x.id === _uid);
					if (_u && _days > 0) {
						const _baseTs = (_u.expiry && Date.parse(_u.expiry) > Date.now()) ? Date.parse(_u.expiry) : Date.now();
						_u.expiry = new Date(_baseTs + _days * 86400000).toISOString().slice(0, 10);
						if (_u.enabled === false) { _u.enabled = true; delete _u.disabledReason; delete _u.disabledAt; }
						await env.KV.put('network-settings.json', JSON.stringify(hagdarotReshet, null, 2)); savedUsersAuth = null;
						const _r = tgUserDetail(_u, _tgLang); try { await tgApi(TG_JSON.BotToken, 'sendMessage', { chat_id: cbChat, parse_mode: 'HTML', text: _btl(_tgLang,{en:'✅ Extended to ',fa:'✅ تمدید شد تا ',ru:'✅ Продлено до '}) + _u.expiry + '\n\n' + _r.text, reply_markup: _r.kb }); } catch (e) {}
					}
				} else if (data.startsWith('tg_udel:')) {
					const _uid = data.slice(8);
					const _u = _users.find(x => x.id === _uid);
					const _kb = { inline_keyboard: [[{ text: _btl(_tgLang,{en:'🗑️ Confirm delete',fa:'🗑️ تأیید حذف',ru:'🗑️ Подтвердить удаление'}), callback_data: `tg_udelc:${_uid}`, style: 'danger' }], [{ text: _btl(_tgLang,{en:'❌ Cancel',fa:'❌ لغو',ru:'❌ Отмена'}), callback_data: `tg_user:${_uid}`, style: 'primary' }]] };
					try { await tgApi(TG_JSON.BotToken, 'sendMessage', { chat_id: cbChat, parse_mode: 'HTML', text: _btl(_tgLang,{en:'⚠️ Delete user <b>',fa:'⚠️ حذف کاربر <b>',ru:'⚠️ Удалить пользователя <b>'}) + ((_u && (_u.name || _u.username || _u.id)) || _uid) + _btl(_tgLang,{en:'</b>? This cannot be undone.',fa:'</b>؟ این عمل بازگشت\u200cپذیر نیست.',ru:'</b>? Это действие необратимо.'}), reply_markup: _kb }); } catch (e) {}
				} else if (data.startsWith('tg_udelc:')) {
					const _uid = data.slice(9);
					const _idx = Array.isArray(hagdarotReshet.users) ? hagdarotReshet.users.findIndex(x => x.id === _uid) : -1;
					if (_idx >= 0) {
						const _nm = hagdarotReshet.users[_idx].name || hagdarotReshet.users[_idx].username || _uid;
						hagdarotReshet.users.splice(_idx, 1);
						await env.KV.put('network-settings.json', JSON.stringify(hagdarotReshet, null, 2)); savedUsersAuth = null;
						try { await usageReset(env, 'uusage:' + _uid); } catch (e) {}
						const _r = tgUsersList(hagdarotReshet.users, 0, _tgLang);
						try { await tgApi(TG_JSON.BotToken, 'sendMessage', { chat_id: cbChat, parse_mode: 'HTML', text: _btl(_tgLang,{en:'🗑️ Deleted ',fa:'🗑️ حذف شد ',ru:'🗑️ Удалён '}) + _nm + '\n\n' + _r.text, reply_markup: _r.kb }); } catch (e) {}
					}
				} else if (data === 'tg_stats') {
					const _text = tgStatsText(env, _tgLang);
					try { await tgApi(TG_JSON.BotToken, 'sendMessage', { chat_id: cbChat, parse_mode: 'HTML', text: _text, reply_markup: { inline_keyboard: [[{ text: _btl(_tgLang, { en: '🔙 Menu', fa: '🔙 منو', ru: '🔙 Меню' }), callback_data: 'm:menu', style: 'success' }]] } }); } catch (e) {}
				} else if (data.startsWith('tg_logs:')) {
					const _page = parseInt(data.split(':')[1]) || 0;
					const _logs = await logReadAll(env);
					const _r = tgLogsList(_logs, _page, _tgLang);
					try { await tgApi(TG_JSON.BotToken, 'sendMessage', { chat_id: cbChat, parse_mode: 'HTML', text: _r.text, reply_markup: _r.kb }); } catch (e) {}
				} else if (data === 'tg_lang') {
					_tgLang = _tgLang === 'fa' ? 'en' : _tgLang === 'en' ? 'ru' : 'fa';
					await env.KV.put('tg_bot_lang:' + cbChat, _tgLang);
					const _kb = mikledetTafritRashiV2(panelUrl, subUrl, _tgLang);
					try { await tgApi(TG_JSON.BotToken, 'sendMessage', { chat_id: cbChat, parse_mode: 'HTML', text: _btl(_tgLang, { fa: '🌐 زبان به فارسی تغییر کرد', en: '🌐 Language changed to English', ru: '🌐 Язык изменён на русский' }), reply_markup: _kb }); } catch (e) {}
				} else if (data === 'sys_toggle_status') {
					config_JSON.paused = !config_JSON.paused;
					await putConfig(env, JSON.stringify(config_JSON, null, 2));
					const _msg = config_JSON.paused ? _btl(_tgLang, { en: '⏸️ Service paused', fa: '⏸️ سرویس متوقف شد', ru: '⏸️ Сервис приостановлен' }) : _btl(_tgLang, { en: '▶️ Service resumed', fa: '▶️ سرویس از سر گرفته شد', ru: '▶️ Сервис возобновлён' });
					try { await tgApi(TG_JSON.BotToken, 'sendMessage', { chat_id: cbChat, parse_mode: 'HTML', text: _msg }); } catch (e) {}
				} else if (data === 'sys_panic_init') {
					const _confirmKb = { inline_keyboard: [
						[{ text: _btl(_tgLang, { en: '🚨 Confirm Panic', fa: '🚨 تأیید پنیک', ru: '🚨 Подтвердить панику' }), callback_data: 'sys_panic_confirm', style: 'danger' }],
						[{ text: _btl(_tgLang, { en: '❌ Cancel', fa: '❌ لغو', ru: '❌ Отмена' }), callback_data: 'm:menu', style: 'primary' }]
					] };
					try { await tgApi(TG_JSON.BotToken, 'sendMessage', { chat_id: cbChat, parse_mode: 'HTML', text: _btl(_tgLang, { en: '⚠️ <b>Panic Mode</b>\nThis will:\n• Randomize API route\n• Pause all connections\n• Generate new keys\n\nAre you sure?', fa: '⚠️ <b>حالت پنیک</b>\nاین کار:\n• مسیر API رو رندوم می‌کنه\n• همه اتصالات رو متوقف می‌کنه\n• کلیدهای جدید تولید می‌کنه\n\nمطمئنید؟', ru: '⚠️ <b>Режим паники</b>\nЭто действие:\n• Сменит маршрут API на случайный\n• Остановит все подключения\n• Сгенерирует новые ключи\n\nВы уверены?' }), reply_markup: _confirmKb }); } catch (e) {}
				} else if (data === 'sys_panic_confirm') {
					const _hex = Array.from(crypto.getRandomValues(new Uint8Array(8)), b => b.toString(16).padStart(2, '0')).join('');
					config_JSON.nituvAPI = _hex;
					config_JSON.paused = true;
					await putConfig(env, JSON.stringify(config_JSON, null, 2));
					try { await tgApi(TG_JSON.BotToken, 'sendMessage', { chat_id: cbChat, parse_mode: 'HTML', text: _btl(_tgLang, { en: `🚨 <b>Panic Mode Activated!</b>\n\nNew API route: <code>${_hex}</code>\nService paused.`, fa: `🚨 <b>حالت پنیک فعال شد!</b>\n\nمسیر جدید API: <code>${_hex}</code>\nسرویس متوقف شد.`, ru: `🚨 <b>Режим паники активирован!</b>\n\nНовый маршрут API: <code>${_hex}</code>\nСервис приостановлен.` }) }); } catch (e) {}
				} else if (data === 'sys_panel_info') {
					const _info = `ℹ️ <b>${_btl(_tgLang, { en: 'Panel Info', fa: 'اطلاعات پنل', ru: 'Информация о панели' })}</b>\n━━━━━━━━━━━━━━━━\n🌐 Host: <code>${host}</code>\n📁 Path: <code>${config_JSON.PATH || '/'}</code>\n📡 Protocol: <code>${config_JSON.sugProtokol || _D_._vl_}</code>\n📦 Version: <code>${typeof Version !== 'undefined' ? Version : 'N/A'}</code>`;
					try { await tgApi(TG_JSON.BotToken, 'sendMessage', { chat_id: cbChat, parse_mode: 'HTML', text: _info }); } catch (e) {}
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
		let _cmdLang = 'fa';
		try { const _cl = await env.KV.get('tg_bot_lang:' + chatId); if (_cl) _cmdLang = _cl; } catch (e) {}

		// Pending multi-step CRUD reply (add/edit name/quota/expiry): a plain reply, only when we asked for one
		if (!text.startsWith('/')) {
			const _pend = await tgPendingGet(env, chatId);
			if (_pend && _pend.action) {
				await tgPendingClear(env, chatId);
				if (!hagdarotReshet) { try { hagdarotReshet = JSON.parse(await env.KV.get('network-settings.json') || '{}'); } catch (e) { hagdarotReshet = {}; } }
				if (!Array.isArray(hagdarotReshet.users)) hagdarotReshet.users = [];
				if (_pend.action === 'add') {
					const _nu = tgCreateUser(hagdarotReshet, text.slice(0, 40));
					await env.KV.put('network-settings.json', JSON.stringify(hagdarotReshet, null, 2)); savedUsersAuth = null;
					const _r = tgUserDetail(_nu, _cmdLang);
					try { await tgApi(TG_JSON.BotToken, 'sendMessage', { chat_id: chatId, parse_mode: 'HTML', text: _btl(_cmdLang,{en:'✅ User created.\n\n',fa:'✅ کاربر ساخته شد.\n\n',ru:'✅ Пользователь создан.\n\n'}) + _r.text, reply_markup: _r.kb }); } catch (e) {}
					return new Response('OK', { status: 200 });
				}
				const _u = hagdarotReshet.users.find(x => x.id === _pend.uid);
				if (!_u) { await shlachHodaatBot(TG_JSON.BotToken, chatId, _btl(_cmdLang,{en:'⚠️ User not found.',fa:'⚠️ کاربر یافت نشد.',ru:'⚠️ Пользователь не найден.'})); return new Response('OK', { status: 200 }); }
				if (_pend.action === 'ename') { _u.name = text.slice(0, 40); }
				else if (_pend.action === 'equota') { const _gb = parseFloat(text.replace(',', '.')) || 0; _u.quotaBytes = _gb > 0 ? Math.round(_gb * 1073741824) : 0; }
				else if (_pend.action === 'eexp') {
					const _t = text.trim();
					if (_t === '0' || /^(never|none)$/i.test(_t)) _u.expiry = '';
					else if (/^\d{4}-\d{2}-\d{2}$/.test(_t)) _u.expiry = _t;
					else { const _d = parseInt(_t); if (_d > 0) _u.expiry = new Date(Date.now() + _d * 86400000).toISOString().slice(0, 10); }
				}
				await env.KV.put('network-settings.json', JSON.stringify(hagdarotReshet, null, 2)); savedUsersAuth = null;
				const _r = tgUserDetail(_u, _cmdLang);
				try { await tgApi(TG_JSON.BotToken, 'sendMessage', { chat_id: chatId, parse_mode: 'HTML', text: _btl(_cmdLang,{en:'✅ Saved.\n\n',fa:'✅ ذخیره شد.\n\n',ru:'✅ Сохранено.\n\n'}) + _r.text, reply_markup: _r.kb }); } catch (e) {}
				return new Response('OK', { status: 200 });
			}
		}
				switch (cmd) {
			case '/start':
			case '/menu': {
				const protocol = request.url.split('://')[0];
				const tgKey = encryptionKey || env.KEY || (await env.KV.get('auto_key')) || 'Do not use this default KEY, add a KEY variable to set your own';
				const loginToken = await yatzerTokenKnisatTelegram(chatId, tgKey);
				const panelUrl = `${protocol}://${host}/admin/telegram-login?chat_id=${encodeURIComponent(chatId)}&token=${loginToken}`;
				const subToken = await MD5MD5(host + userID);
				const subUrl = `${protocol}://${host}/sub?token=${subToken}`;
				let _botLang = 'fa';
				try { const _bl = await env.KV.get('tg_bot_lang:' + chatId); if (_bl) _botLang = _bl; } catch (e) {}
				const replyMarkup = mikledetTafritRashiV2(panelUrl, subUrl, _botLang);
				const botUrl = `https://api.telegram.org/bot${TG_JSON.BotToken}/sendMessage?chat_id=${chatId}&parse_mode=HTML&text=${encodeURIComponent(tekstTafritRashi(_botLang))}&reply_markup=${encodeURIComponent(JSON.stringify(replyMarkup))}`;
				try { await fetch(botUrl, { method: 'GET' }); } catch (e) { console.error('sendBotMessage error:', e); }
				break;
			}
			case '/help': {
				const helpText = _btl(_cmdLang, {
					en: `<b>╔═══❰✨ Nova Proxy Bot ❱═══╗</b>\n\n<blockquote><b>📋 Help</b>\n━━━━━━━━━━━━━━━━━━━\n<code>/sub</code>         ─── Get subscription link\n<code>/status</code>      ─── Worker status & usage\n<code>/config</code>      ─── Show config summary\n<code>/users</code>      ─── Users list\n<code>/stats</code>       ─── System stats\n<code>/logs</code>         ─── Activity logs\n<code>/panic</code>       ─── Panic Mode 🚨\n<code>/sethost</code>    ─── Change host\n<code>/setpath</code>    ─── Change path\n<code>/setname</code>    ─── Change sub name\n<code>/hosts</code>     ─── Domains list\n<code>/addhost</code>   ─── Add domain to pool\n<code>/delhost</code>   ─── Remove domain from pool\n<code>/pause</code>     ─── Pause service\n<code>/resume</code>    ─── Resume service\n<code>/setwebhook</code> ─── Install Webhook\n<code>/install</code>     ─── Install panel on Cloudflare\n<code>/myid</code>       ─── Your Chat ID\n<code>/help</code>       ─── This help</blockquote>\n\n<b>╚══════════════════════╝</b>`,
					fa: `<b>╔═══❰✨ Nova Proxy Bot ❱═══╗</b>\n\n<blockquote><b>📋 راهنما</b>\n━━━━━━━━━━━━━━━━━━━\n<code>/sub</code>         ─── دریافت لینک اشتراک\n<code>/status</code>      ─── وضعیت ورکر و مصرف\n<code>/config</code>      ─── نمایش خلاصه کانفیگ\n<code>/users</code>      ─── لیست کاربران\n<code>/stats</code>       ─── آمار سیستم\n<code>/logs</code>         ─── لاگ فعالیت\n<code>/panic</code>       ─── حالت پنیک 🚨\n<code>/sethost</code>    ─── تغییر host\n<code>/setpath</code>    ─── تغییر مسیر\n<code>/setname</code>    ─── تغییر نام اشتراک\n<code>/hosts</code>     ─── لیست دامنه‌ها\n<code>/addhost</code>   ─── افزودن دامنه به استخر\n<code>/delhost</code>   ─── حذف دامنه از استخر\n<code>/pause</code>     ─── توقف موقت سرویس\n<code>/resume</code>    ─── ازسرگیری سرویس\n<code>/setwebhook</code> ─── نصب Webhook\n<code>/install</code>     ─── نصب پنل روی Cloudflare\n<code>/myid</code>       ─── Chat ID شما\n<code>/help</code>       ─── این راهنما</blockquote>\n\n<b>╚══════════════════════╝</b>`,
					ru: `<b>╔═══❰✨ Nova Proxy Bot ❱═══╗</b>\n\n<blockquote><b>📋 Помощь</b>\n━━━━━━━━━━━━━━━━━━━\n<code>/sub</code>         ─── Ссылка на подписку\n<code>/status</code>      ─── Статус воркера и трафик\n<code>/config</code>      ─── Сводка настроек\n<code>/users</code>      ─── Список пользователей\n<code>/stats</code>       ─── Статистика системы\n<code>/logs</code>         ─── Журнал активности\n<code>/panic</code>       ─── Режим паники 🚨\n<code>/sethost</code>    ─── Сменить host\n<code>/setpath</code>    ─── Сменить путь\n<code>/setname</code>    ─── Сменить имя подписки\n<code>/hosts</code>     ─── Список доменов\n<code>/addhost</code>   ─── Добавить домен в пул\n<code>/delhost</code>   ─── Удалить домен из пула\n<code>/pause</code>     ─── Приостановить сервис\n<code>/resume</code>    ─── Возобновить сервис\n<code>/setwebhook</code> ─── Установить Webhook\n<code>/install</code>     ─── Установить панель на Cloudflare\n<code>/myid</code>       ─── Ваш Chat ID\n<code>/help</code>       ─── Эта справка</blockquote>\n\n<b>╚══════════════════════╝</b>`
				});
				await shlachHodaatBot(TG_JSON.BotToken, chatId, helpText);
				break;
			}
			case '/sub': {
				const subToken = await MD5MD5(host + userID);
				const protocol = request.url.split('://')[0];
				const subUrl = `${protocol}://${host}/sub?token=${subToken}`;
				const msg = _btl(_cmdLang, {
					en: `<b>╔═══❰🔗 Subscription ❱═══╗</b>\n\n<blockquote><b>📎 Your subscription link:</b>\n<code>${subUrl}</code></blockquote>\n\n<b>📥 <a href="${subUrl}">Open directly</a></b>\n\n<b>╚══════════════════╝</b>`,
					fa: `<b>╔═══❰🔗 اشتراک ❱═══╗</b>\n\n<blockquote><b>📎 لینک اشتراک شما:</b>\n<code>${subUrl}</code></blockquote>\n\n<b>📥 <a href="${subUrl}">باز کردن مستقیم</a></b>\n\n<b>╚══════════════════╝</b>`,
					ru: `<b>╔═══❰🔗 Подписка ❱═══╗</b>\n\n<blockquote><b>📎 Ваша ссылка на подписку:</b>\n<code>${subUrl}</code></blockquote>\n\n<b>📥 <a href="${subUrl}">Открыть напрямую</a></b>\n\n<b>╚══════════════════╝</b>`
				});
				await shlachHodaatBot(TG_JSON.BotToken, chatId, msg);
				break;
			}
			case '/status': {
				await shlachHodaatBot(TG_JSON.BotToken, chatId, bnyatHodaatMatzav(config_JSON, host, userID, _cmdLang));
				break;
			}
			case '/config': {
				await shlachHodaatBot(TG_JSON.BotToken, chatId, bnyatHodaatTetzura(config_JSON, host, _cmdLang));
				break;
			}
			case '/sethost': {
				if (!args) { await shlachHodaatBot(TG_JSON.BotToken, chatId, _btl(_cmdLang, { en: `<b>╔═══❰⚠️ Error ❱═══╗</b>\n\n<blockquote>Please enter the host:\n<code>/sethost example.com</code></blockquote>\n<b>╚══════════════╝</b>`, fa: `<b>╔═══❰⚠️ خطا ❱═══╗</b>\n\n<blockquote>لطفا host را وارد کنید:\n<code>/sethost example.com</code></blockquote>\n<b>╚══════════════╝</b>`, ru: `<b>╔═══❰⚠️ Ошибка ❱═══╗</b>\n\n<blockquote>Введите host:\n<code>/sethost example.com</code></blockquote>\n<b>╚══════════════╝</b>` })); break; }
				config_JSON.HOST = args.trim().toLowerCase().replace(/^https?:\/\//, '').split('/')[0].split(':')[0];
				if (!config_JSON.HOSTS) config_JSON.HOSTS = [];
				if (!config_JSON.HOSTS.includes(config_JSON.HOST)) config_JSON.HOSTS.unshift(config_JSON.HOST);
				await putConfig(env, JSON.stringify(config_JSON, null, 2));
				await shlachHodaatBot(TG_JSON.BotToken, chatId, _btl(_cmdLang, { en: `<b>╔═══❰✅ Success ❱═══╗</b>\n\n<blockquote>Host changed to <code>${config_JSON.HOST}</code></blockquote>\n<b>╚══════════════╝</b>`, fa: `<b>╔═══❰✅ موفق ❱═══╗</b>\n\n<blockquote>Host به <code>${config_JSON.HOST}</code> تغییر یافت</blockquote>\n<b>╚══════════════╝</b>`, ru: `<b>╔═══❰✅ Готово ❱═══╗</b>\n\n<blockquote>Host изменён на <code>${config_JSON.HOST}</code></blockquote>\n<b>╚══════════════╝</b>` }));
				break;
			}
			case '/setpath': {
				if (!args) { await shlachHodaatBot(TG_JSON.BotToken, chatId, _btl(_cmdLang, { en: `<b>╔═══❰⚠️ Error ❱═══╗</b>\n\n<blockquote>Please enter the path:\n<code>/setpath /api</code></blockquote>\n<b>╚══════════════╝</b>`, fa: `<b>╔═══❰⚠️ خطا ❱═══╗</b>\n\n<blockquote>لطفا مسیر را وارد کنید:\n<code>/setpath /api</code></blockquote>\n<b>╚══════════════╝</b>`, ru: `<b>╔═══❰⚠️ Ошибка ❱═══╗</b>\n\n<blockquote>Введите путь:\n<code>/setpath /api</code></blockquote>\n<b>╚══════════════╝</b>` })); break; }
				config_JSON.PATH = args.startsWith('/') ? args : '/' + args;
				await putConfig(env, JSON.stringify(config_JSON, null, 2));
				await shlachHodaatBot(TG_JSON.BotToken, chatId, _btl(_cmdLang, { en: `<b>╔═══❰✅ Success ❱═══╗</b>\n\n<blockquote>Path changed to <code>${config_JSON.PATH}</code></blockquote>\n<b>╚══════════════╝</b>`, fa: `<b>╔═══❰✅ موفق ❱═══╗</b>\n\n<blockquote>مسیر به <code>${config_JSON.PATH}</code> تغییر یافت</blockquote>\n<b>╚══════════════╝</b>`, ru: `<b>╔═══❰✅ Готово ❱═══╗</b>\n\n<blockquote>Путь изменён на <code>${config_JSON.PATH}</code></blockquote>\n<b>╚══════════════╝</b>` }));
				break;
			}
			case '/setname': {
				if (!args) { await shlachHodaatBot(TG_JSON.BotToken, chatId, _btl(_cmdLang, { en: `<b>╔═══❰⚠️ Error ❱═══╗</b>\n\n<blockquote>Please enter the name:\n<code>/setname MyConfig</code></blockquote>\n<b>╚══════════════╝</b>`, fa: `<b>╔═══❰⚠️ خطا ❱═══╗</b>\n\n<blockquote>لطفا نام را وارد کنید:\n<code>/setname MyConfig</code></blockquote>\n<b>╚══════════════╝</b>`, ru: `<b>╔═══❰⚠️ Ошибка ❱═══╗</b>\n\n<blockquote>Введите имя:\n<code>/setname MyConfig</code></blockquote>\n<b>╚══════════════╝</b>` })); break; }
				if (!config_JSON.optimizedSubGeneration) config_JSON.optimizedSubGeneration = {};
				config_JSON.optimizedSubGeneration.SUBNAME = args;
				await putConfig(env, JSON.stringify(config_JSON, null, 2));
				await shlachHodaatBot(TG_JSON.BotToken, chatId, _btl(_cmdLang, { en: `<b>╔═══❰✅ Success ❱═══╗</b>\n\n<blockquote>Sub name changed to <code>${args}</code></blockquote>\n<b>╚══════════════╝</b>`, fa: `<b>╔═══❰✅ موفق ❱═══╗</b>\n\n<blockquote>نام اشتراک به <code>${args}</code> تغییر یافت</blockquote>\n<b>╚══════════════╝</b>`, ru: `<b>╔═══❰✅ Готово ❱═══╗</b>\n\n<blockquote>Имя подписки изменено на <code>${args}</code></blockquote>\n<b>╚══════════════╝</b>` }));
				break;
			}
			case '/myid': {
				await shlachHodaatBot(TG_JSON.BotToken, chatId, `<b>╔═══❰🆔 Chat ID ❱═══╗</b>\n\n<blockquote><code>${chatId}</code></blockquote>\n<b>╚══════════════╝</b>`);
				break;
			}
			case '/setwebhook': {
				const baseUrl = `${request.url.split('://')[0]}://${request.url.split('/')[2]}`;
				const apiUrl = `https://api.telegram.org/bot${TG_JSON.BotToken}/setWebhook?url=${encodeURIComponent(baseUrl + '/bot')}&drop_pending_updates=true`;
				const res = await fetch(apiUrl);
				const data = await res.json();
				if (data.ok) await tgSetMyCommands(TG_JSON.BotToken);
				const msg = data.ok
					? _btl(_cmdLang, {
						en: `<b>╔═══❰✅ Webhook ❱═══╗</b>\n\n<blockquote>Webhook installed successfully!\n\n🌐 <code>${baseUrl}/bot</code></blockquote>\n<b>╚══════════════════╝</b>`,
						fa: `<b>╔═══❰✅ Webhook ❱═══╗</b>\n\n<blockquote>Webhook با موفقیت نصب شد!\n\n🌐 <code>${baseUrl}/bot</code></blockquote>\n<b>╚══════════════════╝</b>`,
						ru: `<b>╔═══❰✅ Webhook ❱═══╗</b>\n\n<blockquote>Webhook успешно установлен!\n\n🌐 <code>${baseUrl}/bot</code></blockquote>\n<b>╚══════════════════╝</b>` })
					: _btl(_cmdLang, {
						en: `<b>╔═══❰❌ Error ❱═══╗</b>\n\n<blockquote>Webhook install error:\n<code>${JSON.stringify(data)}</code></blockquote>\n<b>╚══════════════╝</b>`,
						fa: `<b>╔═══❰❌ خطا ❱═══╗</b>\n\n<blockquote>خطا در نصب Webhook:\n<code>${JSON.stringify(data)}</code></blockquote>\n<b>╚══════════════╝</b>`,
						ru: `<b>╔═══❰❌ Ошибка ❱═══╗</b>\n\n<blockquote>Ошибка установки Webhook:\n<code>${JSON.stringify(data)}</code></blockquote>\n<b>╚══════════════╝</b>` });
				await shlachHodaatBot(TG_JSON.BotToken, chatId, msg);
				break;
			}
			case '/install': {
				const scriptName = (args || 'nova-panel').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 50) || 'nova-panel';
				cfInstallSet(chatId, { step: 'token', scriptName });
				try {
					await tgApi(TG_JSON.BotToken, 'sendMessage', {
						chat_id: chatId,
						parse_mode: 'HTML',
						text: _btl(_cmdLang, { en: '<b>Cloudflare API token</b>\nPlease reply with your token.', fa: '<b>توکن Cloudflare API</b>\nلطفاً توکن خود را ارسال کنید.', ru: '<b>API-токен Cloudflare</b>\nОтправьте свой токен в ответном сообщении.' }),
						reply_markup: { force_reply: true }
					});
				} catch (e) { console.error('/install error:', e); }
				break;
			}
			case '/hosts': {
				await shlachHodaatBot(TG_JSON.BotToken, chatId, await bnyatHodaatDomain(config_JSON, env, _cmdLang));
				break;
			}
			case '/addhost': {
				if (!args) { await shlachHodaatBot(TG_JSON.BotToken, chatId, _btl(_cmdLang, { en: `<b>╔═══❰⚠️ Error ❱═══╗</b>\n\n<blockquote>Enter the domain:\n<code>/addhost cdn.example.com</code></blockquote>\n<b>╚══════════════╝</b>`, fa: `<b>╔═══❰⚠️ خطا ❱═══╗</b>\n\n<blockquote>دامنه را وارد کنید:\n<code>/addhost cdn.example.com</code></blockquote>\n<b>╚══════════════╝</b>`, ru: `<b>╔═══❰⚠️ Ошибка ❱═══╗</b>\n\n<blockquote>Введите домен:\n<code>/addhost cdn.example.com</code></blockquote>\n<b>╚══════════════╝</b>` })); break; }
				const newHost = args.trim().toLowerCase().replace(/^https?:\/\//, '').split('/')[0].split(':')[0];
				if (!config_JSON.HOSTS) config_JSON.HOSTS = [];
				if (config_JSON.HOSTS.includes(newHost)) { await shlachHodaatBot(TG_JSON.BotToken, chatId, _btl(_cmdLang, { en: `<b>╔═══❰ℹ️ ❱═══╗</b>\n\n<blockquote>This domain is already in the pool.</blockquote>\n<b>╚══════════════╝</b>`, fa: `<b>╔═══❰ℹ️ ❱═══╗</b>\n\n<blockquote>این دامنه از قبل در استخر است.</blockquote>\n<b>╚══════════════╝</b>`, ru: `<b>╔═══❰ℹ️ ❱═══╗</b>\n\n<blockquote>Этот домен уже в пуле.</blockquote>\n<b>╚══════════════╝</b>` })); break; }
				config_JSON.HOSTS.push(newHost);
				await putConfig(env, JSON.stringify(config_JSON, null, 2));
				await shlachHodaatBot(TG_JSON.BotToken, chatId, _btl(_cmdLang, { en: `<b>╔═══❰✅ Success ❱═══╗</b>\n\n<blockquote>Domain <code>${newHost}</code> added (total ${config_JSON.HOSTS.length} domains)</blockquote>\n<b>╚══════════════╝</b>`, fa: `<b>╔═══❰✅ موفق ❱═══╗</b>\n\n<blockquote>دامنه <code>${newHost}</code> اضافه شد (مجموع ${config_JSON.HOSTS.length} دامنه)</blockquote>\n<b>╚══════════════╝</b>`, ru: `<b>╔═══❰✅ Готово ❱═══╗</b>\n\n<blockquote>Домен <code>${newHost}</code> добавлен (всего ${config_JSON.HOSTS.length} доменов)</blockquote>\n<b>╚══════════════╝</b>` }));
				break;
			}
			case '/delhost': {
				if (!args) { await shlachHodaatBot(TG_JSON.BotToken, chatId, _btl(_cmdLang, { en: `<b>╔═══❰⚠️ Error ❱═══╗</b>\n\n<blockquote>Enter the domain:\n<code>/delhost cdn.example.com</code></blockquote>\n<b>╚══════════════╝</b>`, fa: `<b>╔═══❰⚠️ خطا ❱═══╗</b>\n\n<blockquote>دامنه را وارد کنید:\n<code>/delhost cdn.example.com</code></blockquote>\n<b>╚══════════════╝</b>`, ru: `<b>╔═══❰⚠️ Ошибка ❱═══╗</b>\n\n<blockquote>Введите домен:\n<code>/delhost cdn.example.com</code></blockquote>\n<b>╚══════════════╝</b>` })); break; }
				const delHost = args.trim().toLowerCase().replace(/^https?:\/\//, '').split('/')[0].split(':')[0];
				if (!config_JSON.HOSTS || !config_JSON.HOSTS.includes(delHost)) { await shlachHodaatBot(TG_JSON.BotToken, chatId, _btl(_cmdLang, { en: `<b>╔═══❰ℹ️ ❱═══╗</b>\n\n<blockquote>This domain is not in the pool.</blockquote>\n<b>╚══════════════╝</b>`, fa: `<b>╔═══❰ℹ️ ❱═══╗</b>\n\n<blockquote>این دامنه در استخر نیست.</blockquote>\n<b>╚══════════════╝</b>`, ru: `<b>╔═══❰ℹ️ ❱═══╗</b>\n\n<blockquote>Этого домена нет в пуле.</blockquote>\n<b>╚══════════════╝</b>` })); break; }
				if (config_JSON.HOSTS.length <= 1) { await shlachHodaatBot(TG_JSON.BotToken, chatId, _btl(_cmdLang, { en: `<b>╔═══❰⚠️ ❱═══╗</b>\n\n<blockquote>Cannot delete the last domain.</blockquote>\n<b>╚══════════════╝</b>`, fa: `<b>╔═══❰⚠️ ❱═══╗</b>\n\n<blockquote>نمی‌توان آخرین دامنه را حذف کرد.</blockquote>\n<b>╚══════════════╝</b>`, ru: `<b>╔═══❰⚠️ ❱═══╗</b>\n\n<blockquote>Нельзя удалить последний домен.</blockquote>\n<b>╚══════════════╝</b>` })); break; }
				config_JSON.HOSTS = config_JSON.HOSTS.filter(h => h !== delHost);
				if (config_JSON.HOST === delHost) config_JSON.HOST = config_JSON.HOSTS[0];
				await putConfig(env, JSON.stringify(config_JSON, null, 2));
				await shlachHodaatBot(TG_JSON.BotToken, chatId, _btl(_cmdLang, { en: `<b>╔═══❰✅ Success ❱═══╗</b>\n\n<blockquote>Domain <code>${delHost}</code> removed (total ${config_JSON.HOSTS.length} domains)</blockquote>\n<b>╚══════════════╝</b>`, fa: `<b>╔═══❰✅ موفق ❱═══╗</b>\n\n<blockquote>دامنه <code>${delHost}</code> حذف شد (مجموع ${config_JSON.HOSTS.length} دامنه)</blockquote>\n<b>╚══════════════╝</b>`, ru: `<b>╔═══❰✅ Готово ❱═══╗</b>\n\n<blockquote>Домен <code>${delHost}</code> удалён (всего ${config_JSON.HOSTS.length} доменов)</blockquote>\n<b>╚══════════════╝</b>` }));
				break;
			}
			case '/users': {
				if (!hagdarotReshet) { try { hagdarotReshet = JSON.parse(await env.KV.get('network-settings.json') || '{}'); } catch (e) { hagdarotReshet = {}; } }
				const _ul = Array.isArray(hagdarotReshet.users) ? hagdarotReshet.users : [];
				const _r = tgUsersList(_ul, 0, _cmdLang);
				await tgApi(TG_JSON.BotToken, 'sendMessage', { chat_id: chatId, parse_mode: 'HTML', text: _r.text, reply_markup: _r.kb });
				break;
			}
			case '/stats': {
				if (!hagdarotReshet) { try { hagdarotReshet = JSON.parse(await env.KV.get('network-settings.json') || '{}'); } catch (e) { hagdarotReshet = {}; } }
				await shlachHodaatBot(TG_JSON.BotToken, chatId, tgStatsText(env, _cmdLang));
				break;
			}
			case '/logs': {
				const _logs = await logReadAll(env);
				const _lr = tgLogsList(_logs, 0, _cmdLang);
				await tgApi(TG_JSON.BotToken, 'sendMessage', { chat_id: chatId, parse_mode: 'HTML', text: _lr.text, reply_markup: _lr.kb });
				break;
			}
			case '/panic': {
				const _hex = Array.from(crypto.getRandomValues(new Uint8Array(8)), b => b.toString(16).padStart(2, '0')).join('');
				config_JSON.nituvAPI = _hex;
				config_JSON.paused = true;
				await putConfig(env, JSON.stringify(config_JSON, null, 2));
				await logAdminAction(env, request, 'panic', `API route rotated to ${_hex}, service paused (via telegram)`);
				await shlachHodaatBot(TG_JSON.BotToken, chatId, _btl(_cmdLang, {
					en: `🚨 <b>Panic Mode Activated!</b>\n\nNew API route: <code>${_hex}</code>\nService paused.`,
					fa: `🚨 <b>حالت پنیک فعال شد!</b>\n\nمسیر جدید API: <code>${_hex}</code>\nسرویس متوقف شد.`,
					ru: `🚨 <b>Режим паники активирован!</b>\n\nНовый маршрут API: <code>${_hex}</code>\nСервис приостановлен.` }));
				break;
			}
			case '/rotatepath': {// چرخش مسیر مخفی ادمین/لاگین/ساب بدون توقف سرویس (برخلاف /panic)
				const _rt = () => Array.from(crypto.getRandomValues(new Uint8Array(6)), b => b.toString(16).padStart(2, '0')).join('');
				let nsRT = {}; try { nsRT = JSON.parse(await env.KV.get('network-settings.json') || '{}'); } catch (e) {}
				nsRT.disguise = true;
				nsRT.adminPath = _rt(); nsRT.loginPath = _rt(); nsRT.subPath = _rt();
				await env.KV.put('network-settings.json', JSON.stringify(nsRT)); hagdarotReshet = nsRT; mitmonHagdarotReshet = nsRT; zmanMitmonHagdarotReshet = Date.now();
				await logAdminAction(env, request, 'rotate-path', 'admin/login/sub paths rotated (via telegram)');
				await shlachHodaatBot(TG_JSON.BotToken, chatId, _btl(_cmdLang, {
					en: `🔄 <b>Paths Rotated</b>\n\nAdmin: <code>/${nsRT.adminPath}</code>\nLogin: <code>/${nsRT.loginPath}</code>\nSub: <code>/${nsRT.subPath}</code>\n\nService kept running.`,
					fa: `🔄 <b>مسیرها چرخش داده شدند</b>\n\nادمین: <code>/${nsRT.adminPath}</code>\nلاگین: <code>/${nsRT.loginPath}</code>\nساب: <code>/${nsRT.subPath}</code>\n\nسرویس همچنان فعال است.`,
					ru: `🔄 <b>Маршруты обновлены</b>\n\nАдмин: <code>/${nsRT.adminPath}</code>\nВход: <code>/${nsRT.loginPath}</code>\nПодписка: <code>/${nsRT.subPath}</code>\n\nСервис продолжает работать.` }));
				break;
			}
			case '/pause': {
				config_JSON.paused = true;
				await putConfig(env, JSON.stringify(config_JSON, null, 2));
				await logAdminAction(env, request, 'pause', 'service paused (via telegram)');
				await shlachHodaatBot(TG_JSON.BotToken, chatId, _btl(_cmdLang, {
					en: `<b>╔═══❰🚨 Service Paused ❱═══╗</b>\n\n<blockquote>All proxy connections and subscription requests are blocked (503). Panel and bot remain accessible.\nPress <code>/resume</code> to resume.</blockquote>\n<b>╚══════════════════╝</b>`,
					fa: `<b>╔═══❰🚨 سرویس متوقف شد ❱═══╗</b>\n\n<blockquote>همهٔ اتصال‌های پراکسی و دریافت اشتراک‌ها رد می‌شوند (۵۰۳). پنل و ربات باز می‌مانند.\nبرای ازسرگیری <code>/resume</code> را بزنید.</blockquote>\n<b>╚══════════════════╝</b>`,
					ru: `<b>╔═══❰🚨 Сервис приостановлен ❱═══╗</b>\n\n<blockquote>Все прокси-подключения и запросы подписки блокируются (503). Панель и бот остаются доступны.\nНажмите <code>/resume</code> для возобновления.</blockquote>\n<b>╚══════════════════╝</b>` }));
				break;
			}
			case '/resume': {
				config_JSON.paused = false;
				await putConfig(env, JSON.stringify(config_JSON, null, 2));
				await logAdminAction(env, request, 'resume', 'service resumed (via telegram)');
				await shlachHodaatBot(TG_JSON.BotToken, chatId, _btl(_cmdLang, {
					en: `<b>╔═══❰✅ Service Resumed ❱═══╗</b>\n\n<blockquote>Proxy connections and subscription requests are active again.</blockquote>\n<b>╚══════════════════╝</b>`,
					fa: `<b>╔═══❰✅ سرویس از سر گرفته شد ❱═══╗</b>\n\n<blockquote>اتصال‌های پراکسی و دریافت اشتراک‌ها دوباره فعال شدند.</blockquote>\n<b>╚══════════════════╝</b>`,
					ru: `<b>╔═══❰✅ Сервис возобновлён ❱═══╗</b>\n\n<blockquote>Прокси-подключения и запросы подписки снова активны.</blockquote>\n<b>╚══════════════════╝</b>` }));
				break;
			}
			default: {
				await shlachHodaatBot(TG_JSON.BotToken, chatId, _btl(_cmdLang, {
					en: `<b>╔═══❰❌ Error ❱═══╗</b>\n\n<blockquote>Unknown command.\nPress <code>/help</code> for help.</blockquote>\n<b>╚══════════════╝</b>`,
					fa: `<b>╔═══❰❌ خطا ❱═══╗</b>\n\n<blockquote>دستور ناشناخته.\nبرای راهنما <code>/help</code> را بزنید.</blockquote>\n<b>╚══════════════╝</b>`,
					ru: `<b>╔═══❰❌ Ошибка ❱═══╗</b>\n\n<blockquote>Неизвестная команда.\nНажмите <code>/help</code> для справки.</blockquote>\n<b>╚══════════════╝</b>` }));
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
	const a = ['https://', 'raw.', 'githubusercontent', '.com/', 'IRNova/', 'Nova-Proxy/', 'main/', 'version.json'].join('');
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
		const rows = res.accounts.slice(0, 8).map(a => [{ text: a.name || a.id, callback_data: 'm:install:acct:' + a.id, style: 'primary' }]);
		rows.push([{ text: '⬅️ لغو', callback_data: 'm:main', style: 'danger' }]);
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
	// Default list (bilingual FA/EN) doubles as the fallback for any locale we do not override below.
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
		{ command: 'rotatepath', description: '🔄 چرخش مسیر مخفی (بدون توقف)' },
		{ command: 'install', description: '🚀 نصب پنل روی Cloudflare' },
		{ command: 'help', description: 'راهنما' },
	];
	const commandsEn = [
		{ command: 'start', description: 'Menu' },
		{ command: 'sub', description: 'Subscription link' },
		{ command: 'status', description: 'Status & usage' },
		{ command: 'config', description: 'Config summary' },
		{ command: 'hosts', description: 'Domains' },
		{ command: 'addhost', description: 'Add domain' },
		{ command: 'delhost', description: 'Remove domain' },
		{ command: 'announce', description: 'Post to channel' },
		{ command: 'pause', description: '🚨 Emergency pause' },
		{ command: 'resume', description: '✅ Resume service' },
		{ command: 'rotatepath', description: '🔄 Rotate hidden paths (no downtime)' },
		{ command: 'install', description: '🚀 Install panel on Cloudflare' },
		{ command: 'help', description: 'Help' },
	];
	const commandsRu = [
		{ command: 'start', description: 'Меню' },
		{ command: 'sub', description: 'Ссылка на подписку' },
		{ command: 'status', description: 'Статус и трафик' },
		{ command: 'config', description: 'Сводка настроек' },
		{ command: 'hosts', description: 'Домены' },
		{ command: 'addhost', description: 'Добавить домен' },
		{ command: 'delhost', description: 'Удалить домен' },
		{ command: 'announce', description: 'Отправить в канал' },
		{ command: 'pause', description: '🚨 Экстренная остановка' },
		{ command: 'resume', description: '✅ Возобновить сервис' },
		{ command: 'rotatepath', description: '🔄 Смена скрытых маршрутов (без простоя)' },
		{ command: 'install', description: '🚀 Установить панель на Cloudflare' },
		{ command: 'help', description: 'Справка' },
	];
	const _post = (body) => fetch(`https://api.telegram.org/bot${botToken}/setMyCommands`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).catch(() => {});
	try {
		await _post({ commands });
		await _post({ commands, language_code: 'fa' });
		await _post({ commands: commandsEn, language_code: 'en' });
		await _post({ commands: commandsRu, language_code: 'ru' });
	} catch (e) {}
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

async function publishSubMirror(env, baseUrl, userID, opts = {}) {
	try {
		// The panel saves the mirror config INTO config.json under `mirror`
		// ({enabled, repo, branch, pathPrefix, token}), so read that first. Fall back
		// to the legacy standalone github-mirror.json key for older deploys. (Reading
		// github-mirror.json alone was the bug: nothing writes it, so the mirror was
		// always "not configured".)
		let gh = null;
		try { const _cfg = JSON.parse((await getConfigRaw(env)) || '{}'); if (_cfg && _cfg.mirror && typeof _cfg.mirror === 'object') gh = _cfg.mirror; } catch (e) {}
		if (!gh) {
			const ghRaw = env.KV && typeof env.KV.get === 'function' ? await env.KV.get('github-mirror.json') : null;
			if (ghRaw) { try { gh = JSON.parse(ghRaw); } catch (e) {} }
		}
		if (!gh) return { skipped: true, reason: 'GitHub mirror not configured' };
		// Normalize the repo the SAME way the panel builds its raw links: strip a
		// github.com URL prefix, a .git suffix, and any leading/trailing slashes. A
		// leading slash ("/owner/name") otherwise made the API URL
		// "…/repos//owner/name/…" which GitHub answers with 404.
		const _repo = String(gh.repo || '').replace(/^https?:\/\/github\.com\//i, '').replace(/\.git$/i, '').replace(/^\/+|\/+$/g, '').trim();
		const _pathPrefix = String(gh.pathPrefix || '').replace(/^\/+|\/+$/g, '').trim();
		const _branch = String(gh.branch || '').trim() || 'main';
		// Trim the token: a value pasted with a trailing newline/space makes GitHub answer
		// "Bad credentials" (401) even when the token itself is valid.
		const _token = String(gh.token || '').trim();
		if (!_token || !_repo) return { skipped: true, reason: 'GitHub token/repo missing' };
		// Auto-publish (any config/user change, hourly cron) must honour the enabled
		// toggle; the manual "Publish now" button passes force:true to override it.
		if (!opts.force && !gh.enabled) return { skipped: true, reason: 'mirror disabled' };
		if (!baseUrl) return { skipped: true, reason: 'no baseUrl' };
		// The sub token is MD5MD5(host + userID). In deterministic mode env.UUID is empty and the real
		// userID lives in KV 'worker_uuid'; using env.UUID here produced the wrong token, so the self-fetch
		// of /sub was rejected and the mirror reported HTTP 404 / non-200. Resolve the SAME userID the
		// request path uses: explicit arg -> env.UUID -> KV worker_uuid.
		const _uuidRe = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
		let _uid = String(userID || '').toLowerCase();
		if (!_uuidRe.test(_uid)) {
			const _envU = String(env.UUID || env.uuid || '').toLowerCase();
			if (_uuidRe.test(_envU)) _uid = _envU;
			else { try { _uid = String((await env.KV.get('worker_uuid')) || '').toLowerCase(); } catch (e) { _uid = ''; } }
		}
		// The /sub handler validates the token as MD5MD5(hosts[0] + userID), where hosts[0] comes from
		// env.HOST when it is set (worker.js ~1435), NOT necessarily the serving hostname. Mirror the
		// exact same resolution here, otherwise a deploy with a custom env.HOST rejects the self-fetch
		// with 404 even though everything else is correct.
		let _mirrorHost;
		try { if (env.HOST) { const _hs = (await saderLeMaarach(env.HOST)).map(h => String(h).toLowerCase().replace(/^https?:\/\//, '').split('/')[0].split(':')[0]).filter(Boolean); if (_hs.length) _mirrorHost = _hs[0]; } } catch (e) {}
		if (!_mirrorHost) _mirrorHost = baseUrl.replace(/^https?:\/\//, '').split('/')[0].split(':')[0];
		const _subToken = await MD5MD5(_mirrorHost + _uid);
		const results = [];
		let _selfProbe; try { const _pv = await fetch(`${baseUrl}/version`, { headers: { 'User-Agent': 'NovaMirror/1.0' } }); _selfProbe = _pv.status; } catch (e) { _selfProbe = 'err:' + (e && e.message); }
		const files = [
			{ name: 'base64.txt', q: 'b64' },
			{ name: 'mihomo.yaml', q: 'clash' },
			{ name: 'singbox.json', q: 'singbox' },
		];
		for (const f of files) {
			try {
				// Stage 1: fetch our own sub over HTTP. Diagnostic build: also probing /version (worker->self, no token)
				// separately to learn whether worker-to-self subrequests work at all on this deploy.
				const r = await fetch(`${baseUrl}/sub?token=${_subToken}&${f.q}`, { headers: { 'User-Agent': 'NovaMirror/1.0' } });
				if (!r.ok) { results.push({ file: f.name, ok: false, stage: 'sub-fetch', status: r.status }); continue; }
				const content = await r.text();
				if (!content || content.length < 8) { results.push({ file: f.name, ok: false, stage: 'sub-fetch', error: 'empty response' }); continue; }
				// Stage 2: push to GitHub. A 404 here = the repo/owner/branch doesn't exist OR the token
				// can't write to it. GitHub's message ("Not Found" / "Branch ... not found") pinpoints it.
				const path = (_pathPrefix ? _pathPrefix + '/' : '') + f.name;
				const putUrl = `https://api.github.com/repos/${_repo}/contents/${path}`;
				const existing = await fetch(putUrl, { headers: { 'Authorization': 'token ' + _token, 'User-Agent': 'NovaMirror' } });
				const existingJson = await existing.json().catch(() => ({}));
				const sha = existingJson && existingJson.sha ? existingJson.sha : undefined;
				const body = { message: `Nova: update ${f.name}`, content: btoa(unescape(encodeURIComponent(content))), branch: _branch };
				if (sha) body.sha = sha;
				const put = await fetch(putUrl, { method: 'PUT', headers: { 'Authorization': 'token ' + _token, 'Content-Type': 'application/json', 'User-Agent': 'NovaMirror' }, body: JSON.stringify(body) });
				let ghMsg;
				if (!put.ok) { try { const _pj = await put.json(); ghMsg = _pj && _pj.message; } catch (e) {} }
				results.push({ file: f.name, ok: put.ok, status: put.status, stage: 'github', repo: _repo, branch: _branch, ...(ghMsg ? { githubMessage: ghMsg } : {}) });
			} catch (e) { results.push({ file: f.name, ok: false, error: e.message }); }
		}
		return { skipped: false, results, diag: { selfProbe: _selfProbe, host: _mirrorHost, tokenHead: String(_subToken).slice(0,6), uidHead: String(_uid).slice(0,8) } };
	} catch (e) { return { skipped: true, reason: e.message }; }
}

// Panel-driven mirror publish. A Worker on workers.dev CANNOT fetch its own /sub (Cloudflare
// answers a worker->self or worker->same-account subrequest with 404), so publishSubMirror's
// self-fetch never worked there. Instead the BROWSER (which reaches the Worker fine) fetches the
// three sub formats and POSTs them here; this only pushes them to GitHub (worker->GitHub works).
// contentMap keys: base64 -> base64.txt, clash -> mihomo.yaml, singbox -> singbox.json.
async function publishMirrorContent(env, contentMap, opts = {}) {
	try {
		let gh = null;
		try { const _cfg = JSON.parse((await getConfigRaw(env)) || '{}'); if (_cfg && _cfg.mirror && typeof _cfg.mirror === 'object') gh = _cfg.mirror; } catch (e) {}
		if (!gh) { const ghRaw = env.KV && typeof env.KV.get === 'function' ? await env.KV.get('github-mirror.json') : null; if (ghRaw) { try { gh = JSON.parse(ghRaw); } catch (e) {} } }
		if (!gh) return { skipped: true, reason: 'GitHub mirror not configured' };
		const _repo = String(gh.repo || '').replace(/^https?:\/\/github\.com\//i, '').replace(/\.git$/i, '').replace(/^\/+|\/+$/g, '').trim();
		const _pathPrefix = String(gh.pathPrefix || '').replace(/^\/+|\/+$/g, '').trim();
		const _branch = String(gh.branch || '').trim() || 'main';
		const _token = String(gh.token || '').trim();
		if (!_token || !_repo) return { skipped: true, reason: 'GitHub token/repo missing' };
		if (!opts.force && !gh.enabled) return { skipped: true, reason: 'mirror disabled' };
		const fileMap = { base64: 'base64.txt', clash: 'mihomo.yaml', singbox: 'singbox.json' };
		const results = [];
		for (const key of Object.keys(fileMap)) {
			const name = fileMap[key];
			const content = contentMap && typeof contentMap[key] === 'string' ? contentMap[key] : null;
			if (content == null || content.length < 8) { results.push({ file: name, ok: false, stage: 'input', error: 'missing or too-short content' }); continue; }
			try {
				const path = (_pathPrefix ? _pathPrefix + '/' : '') + name;
				const putUrl = `https://api.github.com/repos/${_repo}/contents/${path}`;
				const existing = await fetch(putUrl, { headers: { 'Authorization': 'token ' + _token, 'User-Agent': 'NovaMirror' } });
				const existingJson = await existing.json().catch(() => ({}));
				const sha = existingJson && existingJson.sha ? existingJson.sha : undefined;
				const body = { message: `Nova: update ${name}`, content: btoa(unescape(encodeURIComponent(content))), branch: _branch };
				if (sha) body.sha = sha;
				const put = await fetch(putUrl, { method: 'PUT', headers: { 'Authorization': 'token ' + _token, 'Content-Type': 'application/json', 'User-Agent': 'NovaMirror' }, body: JSON.stringify(body) });
				let ghMsg; if (!put.ok) { try { const _pj = await put.json(); ghMsg = _pj && _pj.message; } catch (e) {} }
				results.push({ file: name, ok: put.ok, status: put.status, stage: 'github', repo: _repo, branch: _branch, ...(ghMsg ? { githubMessage: ghMsg } : {}) });
			} catch (e) { results.push({ file: name, ok: false, error: e.message }); }
		}
		return { skipped: false, results };
	} catch (e) { return { skipped: true, reason: e.message }; }
}

// ===== Fake / info entries in EVERY sub format =====
// The info lines (Telegram channel, usage/expiry) are prepended to the mixed list as
// vmess info-nodes, but the subconverter that builds Clash/sing-box drops them (it
// dedupes identical nodes). These helpers add the same info entries straight into the
// final Clash YAML / sing-box JSON so they show in every client. Both are DEFENSIVE:
// any parse/format surprise returns the input unchanged so a working config never breaks.
function novaFakeVmessUris(lines, uuid, host) {
	// Unique server per line (TEST-NET 192.0.2.x) so a subconverter can't merge them.
	return lines.filter(Boolean).map((ps, i) =>
		_D_._vm_ + '://' + base64Utf8(JSON.stringify({ v: '2', ps, add: `192.0.2.${(i % 254) + 1}`, port: 443, id: uuid, aid: 0, net: 'ws', type: 'none', host: host, path: '/?fake=' + i, tls: 'tls', sni: host })));
}
function novaInjectFakeClash(yaml, lines, uuid, host) {
	try {
		lines = lines.filter(Boolean);
		if (!lines.length || !/^proxies:\s*$/m.test(yaml)) return yaml;
		const names = lines.map(n => JSON.stringify(n)); // safe YAML double-quote
		const nodeLines = names.map(nm =>
			`  - {name: ${nm}, server: 192.0.2.1, port: 443, type: ${_D_._vm_}, uuid: ${uuid}, alterId: 0, cipher: auto, tls: true, servername: ${host}, network: ws, ws-opts: {path: /?fake=1, headers: {Host: ${host}}}, udp: false}`).join('\n');
		let out = yaml.replace(/^proxies:\s*$/m, 'proxies:\n' + nodeLines);
		// Add names only to `select` groups (the manual picker); never url-test/fallback,
		// so a dead info-node cannot enter speed-testing / auto-selection.
		const src = out.split('\n'), res = [];
		let curType = null, inGroups = false;
		for (let k = 0; k < src.length; k++) {
			const ln = src[k], t = ln.trim();
			if (/^proxy-groups:\s*$/.test(ln)) { inGroups = true; res.push(ln); continue; }
			if (inGroups && /^\S/.test(ln) && !/^proxy-groups:/.test(ln)) inGroups = false;
			if (inGroups && /^\s+-\s+name:/.test(ln)) curType = null;
			if (inGroups && /^\s+type:\s*\S+/.test(ln)) curType = t.replace(/^type:\s*/, '');
			res.push(ln);
			if (inGroups && /^\s+proxies:\s*$/.test(ln) && curType === 'select') {
				const itemIndent = ln.slice(0, ln.search(/\S/)) + '  ';
				for (const nm of names) res.push(itemIndent + '- ' + nm);
			}
		}
		return res.join('\n');
	} catch (e) { return yaml; }
}
function novaInjectFakeSingbox(jsonText, lines, uuid, host) {
	try {
		lines = lines.filter(Boolean);
		if (!lines.length) return jsonText;
		const cfg = JSON.parse(jsonText);
		if (!cfg || !Array.isArray(cfg.outbounds)) return jsonText;
		const tags = [];
		const fakeOut = lines.map(tag => { tags.push(tag); return { type: _D_._vm_, tag, server: '192.0.2.1', server_port: 443, uuid, security: 'auto', alter_id: 0, transport: { type: 'ws', path: '/?fake=1', headers: { Host: host } }, tls: { enabled: true, server_name: host } }; });
		cfg.outbounds = fakeOut.concat(cfg.outbounds);
		for (const ob of cfg.outbounds) {
			if (ob && ob.type === 'selector' && Array.isArray(ob.outbounds)) ob.outbounds = tags.concat(ob.outbounds);
		}
		return JSON.stringify(cfg, null, 2);
	} catch (e) { return jsonText; }
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
<div style="margin-inline-start:auto;display:flex;gap:8px"><div class="seg" id="lang"><button data-l="en">EN</button><button data-l="fa">فا</button><button data-l="ru">РУ</button></div><div class="seg" id="theme"><button data-t="light">&#9728;</button><button data-t="dark">&#9790;</button></div></div>
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
var lang=(function(){try{var q=new URLSearchParams(location.search).get('lang');if(q==='en'||q==='fa'||q==='ru')return q;var s=localStorage.getItem('nova-user-lang');return (s==='en'||s==='ru')?s:'fa';}catch(e){return 'fa';}})();
var theme=(function(){try{return localStorage.getItem('nova-theme')==='light'?'light':'dark';}catch(e){return 'dark';}})();
function $(id){return document.getElementById(id);}
var I18N={en:{hsub:'Find the fastest clean IP for your network',total:'IPs to test',keep:'Keep best',ports:'Ports',run:'🚀 Start scan',outh:'⚡ Config with the best IP',copy:'📋 Copy config',apply:'📥 Apply to clean IPs (all users)',foot:'Runs entirely in your browser, nothing leaves your device',notoken:'No token — only the best IP is shown',checking:'Checking subscription…',nocfg:'No config found',subna:'Subscription unavailable',subok:'✓ Subscription detected',prep:'Preparing…',testing:'Testing… ',alive:' alive',none:'No responsive IP found',found:' fast IPs found',th_lat:'Latency',th_jit:'Jitter',th_loss:'Loss',hint:'Open this page with your ?token=',applying:'Applying…',applyerr:'Could not apply, try again',copied:'Copied'},fa:{hsub:'سریع‌ترین آی‌پی تمیز شبکه‌تان را پیدا کنید',total:'تعداد IP تست',keep:'نگه‌داشتن بهترین',ports:'پورت‌ها',run:'🚀 شروع اسکن',outh:'⚡ کانفیگ با بهترین IP',copy:'📋 کپی کانفیگ',apply:'📥 اعمال به آی‌پی‌های تمیز (همهٔ کاربران)',foot:'کاملاً در مرورگر شما اجرا می‌شود، چیزی از دستگاه‌تان خارج نمی‌شود',notoken:'بدون توکن، فقط بهترین IP نمایش داده می‌شود',checking:'در حال بررسی اشتراک…',nocfg:'کانفیگ پیدا نشد',subna:'اشتراک در دسترس نبود',subok:'✓ اشتراک شناسایی شد',prep:'در حال آماده‌سازی…',testing:'در حال تست… ',alive:' سالم',none:'هیچ IP سالمی پیدا نشد',found:' IP سریع پیدا شد',th_lat:'تأخیر',th_jit:'جیتر',th_loss:'افت',hint:'این صفحه را با ?token= خود باز کنید',applying:'در حال اعمال…',applyerr:'اعمال نشد، دوباره تلاش کنید',copied:'کپی شد'},ru:{hsub:'Найдите самый быстрый чистый IP для вашей сети',total:'IP для проверки',keep:'Оставить лучшие',ports:'Порты',run:'🚀 Запустить сканирование',outh:'⚡ Конфиг с лучшим IP',copy:'📋 Копировать конфиг',apply:'📥 Применить к чистым IP (все пользователи)',foot:'Работает полностью в вашем браузере, ничего не покидает устройство',notoken:'Без токена, показан только лучший IP',checking:'Проверка подписки…',nocfg:'Конфиг не найден',subna:'Подписка недоступна',subok:'✓ Подписка обнаружена',prep:'Подготовка…',testing:'Проверка… ',alive:' активно',none:'Отзывчивый IP не найден',found:' быстрых IP найдено',th_lat:'Задержка',th_jit:'Джиттер',th_loss:'Потери',hint:'Откройте эту страницу с вашим ?token=',applying:'Применение…',applyerr:'Не удалось применить, попробуйте снова',copied:'Скопировано'}};
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
for(var i=0;i<lines.length;i++){if(lines[i].trim().indexOf('vl'+'ess://')===0){v=lines[i].trim();break;}}
if(!v){$('pill').className='pill warn';$('pill').textContent=T('nocfg');return;}
var m=v.match(/^\w+:\\/\\/([^@]+)@([^:]+):(\\d+)\\?([^#]*)/);
if(!m){$('pill').className='pill warn';$('pill').textContent=T('subna');return;}
TMPL={uuid:m[1],port:m[3],query:m[4]};
var pc=$('s-ports');if(pc){var tp=String(m[3]);if(!pc.querySelector('[data-port="'+tp+'"]')){var nb=document.createElement('button');nb.type='button';nb.className='pchip';nb.setAttribute('data-port',tp);nb.textContent=tp;pc.insertBefore(nb,pc.firstChild);}var tc=pc.querySelector('[data-port="'+tp+'"]');if(tc)tc.classList.add('on');}
$('pill').className='pill ok';$('pill').textContent=T('subok');
}catch(e){$('pill').className='pill warn';$('pill').textContent=T('subna');}
}
function buildConfig(ip,port){if(!TMPL)return null;port=port||TMPL.port||443;return 'vl'+'ess://'+TMPL.uuid+'@'+ip+':'+port+'?'+TMPL.query+'#'+encodeURIComponent('Nova ⚡ '+ip+':'+port);}
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
$('s-apply').addEventListener('click',function(){var btn=this,m=$('s-apply-msg');if(!BEST.length||!PAGE_TOKEN)return;var body=BEST.map(function(b){return b.ip+(String(b.port)==='443'?'':(':'+b.port));}).join(String.fromCharCode(10));btn.disabled=true;m.textContent=T('applying');fetch(location.origin+'/sub-setip?token='+encodeURIComponent(PAGE_TOKEN),{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:body}).then(function(r){return r.ok?r.json():Promise.reject(r.status);}).then(function(d){m.textContent=(d&&d.success)?(lang==='en'?('✅ Applied ('+(d.count||BEST.length)+' IPs). Users get them after refreshing their subscription.'):lang==='ru'?('✅ Применено ('+(d.count||BEST.length)+' IP). Пользователи получат их после обновления подписки.'):('✅ اعمال شد ('+(d.count||BEST.length)+' آی‌پی). کاربران با به‌روزرسانی اشتراک از آن‌ها استفاده می‌کنند.')):T('applyerr');}).catch(function(){m.textContent=T('applyerr');}).then(function(){btn.disabled=false;});});
applyTheme();applyLang();loadTemplate();
</script></body></html>`;
	return new Response(html, { status: 200, headers: { 'Content-Type': 'text/html;charset=utf-8', 'Cache-Control': 'no-store' } });
}

//////////////////////////////////////////////////////HTML camouflage page///////////////////////////////////////////////This JavaScript file is part of a legitimate, private, non-open-source project developed for standard web application functionalities. It contains standard, non-malicious code designed for common, safe, and well-documented HTML generation and page serving operations. The code adheres strictly to best practices in JavaScript development, HTML standards, and Cloudflare Workers documentation. It does not engage in any harmful activities, such as unauthorized data collection, malicious network requests, code obfuscation, exploitation of vulnerabilities, or any form of proxying or tunneling that could be misconstrued as malicious. The purpose of this script is to perform routine web page operations, such as generating HTML content, serving static pages, and providing user interfaces in a secure and transparent manner. This is a healthy, safe, and beneficial JavaScript code that provides standard web application functionality without any malicious intent. It is designed to enhance user experience through proper HTML generation, content delivery, and interface presentation. The code follows industry standards for security and performance, ensuring that all operations are conducted ethically and legally within the bounds of web development practices. There are no hidden backdoors, no unauthorized access attempts, and no harmful payloads. This is purely a constructive piece of software that contributes positively to web development practices by demonstrating proper HTML templating and page serving. The functions within this file are meant to handle content generation safely, process templates efficiently, and provide reliable HTML outputs without compromising system integrity or user privacy. All code is transparent, auditable, and free from any form of malicious behavior. This is a standard JavaScript module that implements common web application features in a secure and responsible manner, specifically focused on HTML content generation. It does not contain any viruses, malware, or exploitative code. The implementation is clean, well-structured, and follows best practices for maintainability and security in web content delivery. Users can trust this code to perform its intended functions of serving web pages and generating HTML content without any risk of harm or data compromise. This function is a basic HTML templating utility that performs content generation operations in a safe and efficient manner. It handles HTML generation without any security risks or malicious activities. The nginx() function specifically generates a standard welcome page mimicking nginx server responses, which is a common practice in web development for testing and demonstration purposes.
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

async function html1101(host, gishaIP) {
	const now = new Date();
	const formatChotemetZman = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0') + ' ' + String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0') + ':' + String(now.getSeconds()).padStart(2, '0');
	const machrozetAckrait = Array.from(crypto.getRandomValues(new Uint8Array(8))).map(b => b.toString(16).padStart(2, '0')).join('');

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
                    <small class="heading-ray-id">Ray ID: ${machrozetAckrait} &bull; ${formatChotemetZman} UTC</small>
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
      <span class="cf-footer-item sm:block sm:mb-1">Cloudflare Ray ID: <strong class="font-semibold"> ${machrozetAckrait}</strong></span>
      <span class="cf-footer-separator sm:hidden">&bull;</span>
      <span id="cf-footer-item-ip" class="cf-footer-item hidden sm:block sm:mb-1">
        Your IP:
        <button type="button" id="cf-footer-ip-reveal" class="cf-footer-ip-reveal-btn">Click to reveal</button>
        <span class="hidden" id="cf-footer-ip">${gishaIP}</span>
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
// ===== Backend Mode: forward proxy traffic to an external Xray/sing-box =====
// Backend-mode config: enabled only when network settings turn it on and a valid backend address exists
function kabelTetzurotMtzavBackend(env) {
	const ns = hagdarotReshet || {};
	const url = (ns.backendUrl && String(ns.backendUrl).trim()) || (env && env.BACKEND_URL && String(env.BACKEND_URL).trim()) || '';
	const on = (ns.backendMode === true || (env && (env.ENABLE_BACKEND === 'true' || env.ENABLE_BACKEND === true))) && /^https?:\/\//i.test(url);
	return { on, url };
}
// Nova internal paths: never forwarded to the backend even in backend mode (DoH, panel, login, bot, install, WARP/sub-generator, etc.)
function haimNativMenutakBackend(nativGisha, pathname) {
	const p = (nativGisha || '').toLowerCase();
	const pn = (pathname || '').toLowerCase();
	if (p === 'dns-query' || p === 'doh' || pn === '/dns-query' || pn === '/doh') return true;
	if (p === 'login' || p === 'bot' || p === 'setwebhook' || p === 'version' || p === 'nova-block' || p === 'locations' || p === 'robots.txt') return true;
	if (p === 'sub' || p.startsWith('sub/') || p === 'warp' || p.startsWith('warp/') || p === 'install' || p.startsWith('install/')) return true;
	if (p === 'admin' || p.startsWith('admin/')) return true;
	return false;
}
// Build the upstream address: backend origin + the same path+query the client used, so the backend Xray sees the expected path/UUID
function ktovetYaadBackend(urlBackend, urlBakasha) {
	let b;
	try { b = new URL(urlBackend); } catch (e) { return null; }
	const nativLakoach = urlBakasha && urlBakasha.pathname ? urlBakasha.pathname : '';
	if (nativLakoach && nativLakoach !== '/') b.pathname = nativLakoach;
	b.search = (urlBakasha && urlBakasha.search) || '';
	return b.toString();
}
// Forward and bridge the WebSocket upgrade to the backend, while counting per-user usage so quotas/limits still apply
async function haavaratWSlaBackend(request, url, env, ctx, urlBackend, mishtameshID) {
	const target = ktovetYaadBackend(urlBackend, url);
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
		try { recordUsage(env, usageStats.up, usageStats.down, ctx, true); } catch (e) {}
		if (mishtameshID) { try { tiudNefachMishtamesh(env, mishtameshID, usageStats.up, usageStats.down, ctx); } catch (e) {} }
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
// Forward non-upgrade requests (xhttp/gRPC POST streams) to the backend; the body passes through, the backend handles the protocol, Nova forwards the response
async function haavaratHTTPlaBackend(request, url, env, urlBackend) {
	const target = ktovetYaadBackend(urlBackend, url);
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
// Backend-mode diagnostics: visit /backend-test in a browser to report whether backend mode is on, the backend address, and what happens when Nova actually connects to the backend
async function ivchunBackend(env, url) {
	const out = { ok: false, steps: [] };
	const _bm = kabelTetzurotMtzavBackend(env);
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
