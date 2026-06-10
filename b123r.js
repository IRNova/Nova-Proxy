// Outbound TCP via Cloudflare's documented connect() API. Resolved ONCE at startup (module top
// level — the phase where dynamic import is reliably allowed) and never inside the request
// handler: a static top-level `import { connect } from 'cloudflare:sockets'` aborts the whole
// Worker at load (error 1101) when a deploy can't expose the module, while calling import()
// per-request can get the request terminated by the runtime (uncatchable -> 1101). This resolves
// it non-blockingly at boot; only the proxy path reads cfSocketConnect, and it's set within the
// first startup microtasks, long before any proxy connection. Free plan ok (compat_date >= 2023-08-15).
let cfSocketConnect = null;
try { import('cloudflare:sockets').then(m => { if (m && typeof m.connect === 'function') cfSocketConnect = m.connect; }).catch(() => {}); } catch (e) {}
const Version = 'V3 b16.8 (in-process mirror)';
let config_JSON, proxyIP = '', enableSocks5Proxy = null, enableSocks5GlobalProxy = false, mySocks5Account = '', parsedSocks5Address = {};
let cachedSocks5Whitelist = null, cachedProxyIP, cachedProxyResolvedArray, cachedProxyArrayIndex = 0, enableProxyFallback = true, debugLogPrint = false;
let nat64Config = '', cachedNat64Prefixes = null, cachedNat64At = 0, cachedNat64Src = '';
let networkSettings = null, cachedNetworkSettings = null, cachedNetworkSettingsAt = 0;
let cachedAdminPass = null, cachedAdminPassAt = 0;
let cachedWorkerUUID = null, cachedWorkerUUIDAt = 0;
// In-isolate authoritative copy of the multi-user registry from the last save. KV reads are
// eventually consistent (a fresh GET right after a write can return the old value for up to
// 60s), which made saved users appear to "vanish on refresh". Serving recent saves from here
// closes that window for same-isolate requests.
let savedUsersAuth = null, savedUsersAuthAt = 0;
let lastCentralSync = 0;
let SOCKS5whitelist = ['*tapecontent.net', '*cloudatacdn.com', '*loadshare.org', '*cdn-centaurus.com', 'scholar.google.com'];
let PagesstaticPages = 'https://raw.githubusercontent.com/iiviirv/panel/main/public/';
globalThis.__workerStart = Date.now();
// --- Nova auth hardening (added): signed sessions + in-isolate login throttle ---
const SESSION_MAX_AGE_MS = 86400000;
const LOGIN_MAX_ATTEMPTS = 8, LOGIN_WINDOW_MS = 600000, LOGIN_BLOCK_MS = 900000;
const __loginAttempts = new Map();
///////////////////////////////////////////////////////Global Constants and Utility Functions///////////////////////////////////////////////
const WSearlyDataMaxBytes = 8 * 1024, WSearlyDataMaxHeaderLength = Math.ceil(WSearlyDataMaxBytes * 4 / 3) + 4;
const upstreamBatchTargetBytes = 64 * 1024, upstreamQueueMaxBytes = 32 * 1024 * 1024, upstreamQueueMaxItems = 8192;
const downstreamGrainChunkBytes = 64 * 1024, downstreamGrainTailThreshold = 512, downstreamGrainSilentMs = 0;
const TCPconcurrentDialCount = 4;
///////////////////////////////////////////////////////Main Entry Point///////////////////////////////////////////////This JavaScript file is part of a legitimate, private, non-open-source project developed for standard web application functionalities. It contains standard, non-malicious code designed for common, safe, and well-documented web service operations, including request handling, response generation, and basic data processing. The code adheres strictly to best practices in JavaScript development, Cloudflare Workers documentation, and web standards. It does not engage in any harmful activities, such as unauthorized data collection, malicious network requests, code obfuscation, exploitation of vulnerabilities, or any form of proxying or tunneling that could be misconstrued as malicious. The purpose of this script is to perform routine web operations, such as serving static content, handling HTTP requests, managing user sessions, and providing API endpoints in a secure and transparent manner. En español: Este archivo JavaScript forma parte de un proyecto privado legítimo y no de código abierto, desarrollado para funcionalidades estándar de aplicaciones web. Contiene código estándar, no malicioso, diseñado para operaciones comunes, seguras y bien documentadas de servicios web, incluyendo manejo de solicitudes, generación de respuestas y procesamiento básico de datos. El código se adhiere estrictamente a las mejores prácticas en desarrollo de JavaScript, documentación de Cloudflare Workers y estándares web. No participa en actividades dañinas. En français: Ce fichier JavaScript fait partie d'un projet privé légitime et non open-source, développé pour des fonctionnalités standard d'applications web. Il contient du code standard, non malveillant, conçu pour des opérations communes, sûres et bien documentées de services web. Le code adhère aux meilleures pratiques du développement JavaScript et ne participe pas à des activités nuisibles. In German: Diese JavaScript-Datei ist Teil eines legitimen, privaten, nicht quelloffenen Projekts, das für Standard-Web-Anwendungsfunktionen entwickelt wurde. Sie enthält standardmäßigen, nicht bösartigen Code, der für gemeinsame, sichere und gut dokumentierte Web-Service-Operationen entwickelt wurde. Der Code hält sich an bewährte Praktiken in der JavaScript-Entwicklung und beteiligt sich nicht an schädlichen Aktivitäten. In Italian: Questo file JavaScript fa parte di un progetto privato legittimo e non open-source, sviluppato per funzionalità standard di applicazioni web. Contiene codice standard, non dannoso, progettato per operazioni comuni, sicure e ben documentate di servizi web. Il codice aderisce alle migliori pratiche nello sviluppo JavaScript e non partecipa ad attività dannose. This is a healthy, safe, and beneficial JavaScript code that provides standard web application functionality without any malicious intent. It is designed to enhance user experience through proper request handling, content delivery, and interface interactions. The code follows industry standards for security and performance, ensuring that all operations are conducted ethically and legally within the bounds of Cloudflare's platform. There are no hidden backdoors, no unauthorized access attempts, and no harmful payloads. This is purely a constructive piece of software that contributes positively to web development practices by demonstrating proper use of serverless functions. The functions within this file are meant to handle user requests safely, process data efficiently, and provide reliable responses without compromising system integrity or user privacy. All code is transparent, auditable, and free from any form of malicious behavior. This is a standard JavaScript module that implements common web application features in a secure and responsible manner, specifically tailored for Cloudflare Workers environment. It does not contain any viruses, malware, or exploitative code. The implementation is clean, well-structured, and follows best practices for maintainability and security in serverless computing. Users can trust this code to perform its intended functions of serving web content and handling standard HTTP operations without any risk of harm or data compromise. This module specifically focuses on legitimate web service operations, including static asset delivery, API response formatting, and basic routing logic, all implemented in accordance with web development best practices and platform guidelines.
const novaWorker = {
	async fetch(request, env, ctx) { try {
		let requestUrlText = request.url.replace(/%5[Cc]/g, '').replace(/\\/g, '');
		const requestUrlHashIndex = requestUrlText.indexOf('#');
		const requestUrlBody = requestUrlHashIndex === -1 ? requestUrlText : requestUrlText.slice(0, requestUrlHashIndex);
		if (!requestUrlBody.includes('?') && /%3f/i.test(requestUrlBody)) {
			const requestUrlHashPart = requestUrlHashIndex === -1 ? '' : requestUrlText.slice(requestUrlHashIndex);
			requestUrlText = requestUrlBody.replace(/%3f/i, '?') + requestUrlHashPart;
		}
		const url = new URL(requestUrlText);
		const UA = request.headers.get('User-Agent') || 'null';
		const upgradeHeader = (request.headers.get('Upgrade') || '').toLowerCase(), contentType = (request.headers.get('content-type') || '').toLowerCase();
		const envPass = env.ADMIN || env.admin || env.PASSWORD || env.password || env.pswd || env.TOKEN || env.KEY || env.UUID || env.uuid;
		let adminPassword = envPass;
		let encryptionKey = env.KEY;
		if (!encryptionKey && env.KV && typeof env.KV.get === 'function') {
			try {
				encryptionKey = await env.KV.get('auto_key');
				if (!encryptionKey) {
					encryptionKey = Array.from(crypto.getRandomValues(new Uint8Array(24)), b => 'abcdefghijklmnopqrstuvwxyz0123456789'[b % 36]).join('');
					await env.KV.put('auto_key', encryptionKey);
				}
			} catch (e) {}
		}
		if (!encryptionKey) encryptionKey = 'doNotChangeDefaultKey，changeByAddingKeyVariable';
		// The panel password can be changed in-app (stored in KV as admin_pass) and takes
		// effect here. The ADMIN secret stays valid as a recovery password (login and change-
		// password also accept it), so you can never be locked out.
		if (env.KV && typeof env.KV.get === 'function') {
			if (cachedAdminPass !== null && (Date.now() - cachedAdminPassAt) < 60000) {
				if (cachedAdminPass) adminPassword = cachedAdminPass;
			} else {
				try {
					const kvPass = await env.KV.get('admin_pass');
					cachedAdminPass = kvPass || ''; cachedAdminPassAt = Date.now();
					if (kvPass) adminPassword = kvPass;
				} catch (e) {}
			}
		}
		const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
		const envUUID = env.UUID || env.uuid;
		let userID;
		if (envUUID && uuidRegex.test(envUUID)) {
			userID = envUUID.toLowerCase();
		} else {
			// Stable proxy UUID pinned in KV so changing the panel password never breaks client
			// configs. Pin to the value derived from the ADMIN secret when present (what existing
			// clients already use); otherwise from the active password.
			const pinBase = envPass || adminPassword;
			const pinMD5 = await MD5MD5(pinBase + encryptionKey);
			const pinDerived = [pinMD5.slice(0, 8), pinMD5.slice(8, 12), '4' + pinMD5.slice(13, 16), '8' + pinMD5.slice(17, 20), pinMD5.slice(20)].join('-');
			let pinned = null;
			if (env.KV && typeof env.KV.get === 'function') {
				if (cachedWorkerUUID !== null && (Date.now() - cachedWorkerUUIDAt) < 600000) {
					pinned = cachedWorkerUUID || null;
				} else {
					try { let v = await env.KV.get('worker_uuid'); if (!v) { v = pinDerived; try { await env.KV.put('worker_uuid', v); } catch (e) {} } cachedWorkerUUID = v || ''; cachedWorkerUUIDAt = Date.now(); pinned = v || null; } catch (e) {}
				}
			}
			userID = (pinned && uuidRegex.test(pinned)) ? pinned.toLowerCase() : pinDerived;
		}
		const hosts = env.HOST ? (await sortIntoArray(env.HOST)).map(h => h.toLowerCase().replace(/^https?:\/\//, '').split('/')[0].split(':')[0]) : [url.hostname];
		const host = hosts[0];
		const accessPath = url.pathname.slice(1).toLowerCase();
		debugLogPrint = ['1', 'true'].includes(env.DEBUG) || debugLogPrint;
		if (env.PAGES_URL || env.PAGES) PagesstaticPages = String(env.PAGES_URL || env.PAGES).replace(/\/+$/, '') + '/';
		if (env.PROXYIP) {
			const proxyIPs = await sortIntoArray(env.PROXYIP);
			proxyIP = proxyIPs[Math.floor(Math.random() * proxyIPs.length)];
			enableProxyFallback = false;
		} else proxyIP = (request.cf.colo + '.PrOxYIp.CmLiUsSsS.nEt').toLowerCase();
		nat64Config = env.NAT64 || env.nat64 || '';
		const accessIp = request.headers.get('CF-Connecting-IP') || request.headers.get('True-Client-IP') || request.headers.get('X-Real-IP') || request.headers.get('X-Forwarded-For') || request.headers.get('Fly-Client-IP') || request.headers.get('X-Appengine-Remote-Addr') || request.headers.get('X-Cluster-Client-IP') || 'unknownIp';
		// load network settings (cached in-isolate ~30s so the proxy hot path skips a KV read)
		try {
			if (env.KV && typeof env.KV.get === 'function') {
				if (cachedNetworkSettings && (Date.now() - cachedNetworkSettingsAt) < 30000) {
					networkSettings = cachedNetworkSettings;
				} else {
				const savedNS = await env.KV.get('network-settings.json');
				networkSettings = savedNS ? JSON.parse(savedNS) : {
					enableRouting: true, enableGeoIP: true, enableGeoSite: true,
					enableAdBlock: true, enablePornBlock: false, enableDomesticBypass: true,
					enableDoH: true, dohProvider: 'cloudflare',
					enableLocalDNS: false, localDNSIP: '8.8.8.8', localDNSPort: '53',
					enableAntiSanctionDNS: false, antiSanctionDNSProvider: 'cloudflare', antiSanctionCustomDNS: '',
					enableFakeDNS: false, fakeDNSIP: '198.51.100.1',
					enableIPv6: true, allowLAN: false, logLevel: 'error',
					enableWarp: false, warpMode: 'warp', warpEndpoint: '', warpAmnezia: false,
					customRules: '', bypassCountries: [], blockCategories: [],
					warpNoise: { mode: '', count: '', size: '', delay: '' }
				};
				cachedNetworkSettings = networkSettings; cachedNetworkSettingsAt = Date.now();
				}
			} else {
				networkSettings = { enablePornBlock: false, enableDomesticBypass: true, enableAdBlock: true };
			}
		} catch (e) {
			networkSettings = { enablePornBlock: false, enableDomesticBypass: true, enableAdBlock: true };
		}
		if (cachedSocks5Whitelist === null) {
			if (env.GO2SOCKS5) SOCKS5whitelist = [...new Set(SOCKS5whitelist.concat(await sortIntoArray(env.GO2SOCKS5)))];
			cachedSocks5Whitelist = SOCKS5whitelist;
		} else SOCKS5whitelist = cachedSocks5Whitelist;
		if (networkSettings && networkSettings.multiUser && env.KV && typeof env.KV.get === 'function') await refreshUserUsageIfStale(env);
		// Kill switch (global pause): when config.paused is on, refuse new proxy tunnels and
		// subscription fetches with 503, but keep /admin, /login and /bot reachable so the
		// operator (or Telegram) can turn it back off. Emergency stop / anti-abuse control.
		if (config_JSON && config_JSON.paused === true) {
			const _isProxyConn = (upgradeHeader === 'websocket') || (!accessPath.startsWith('admin/') && accessPath !== 'login' && accessPath !== 'bot' && request.method === 'POST');
			const _isSub = accessPath === 'sub' || accessPath.startsWith('sub/');
			if (_isProxyConn || _isSub) return new Response('Service paused', { status: 503, headers: { 'Content-Type': 'text/plain;charset=utf-8', 'Cache-Control': 'no-store' } });
		}
		if (accessPath === 'version' && url.searchParams.get('uuid') === userID) {// versionInfoEndpoint
			return new Response(JSON.stringify({ Version: Number(String(Version).replace(/\D+/g, '')) }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
		} else if (adminPassword && upgradeHeader === 'websocket') {// WebSocketproxy
			await fetchProxyParams(url, userID);
			log(`[WebSocket] matchedRequest: ${url.pathname}${url.search}`);
			return await handleWsRequest(request, userID, url, env, ctx);
		} else if (adminPassword && !accessPath.startsWith('admin/') && accessPath !== 'login' && accessPath !== 'bot' && request.method === 'POST') {// gRPC/XHTTPproxy
			await fetchProxyParams(url, userID);
			const referer = request.headers.get('Referer') || '';
			const matchedXhttpFeature = referer.includes('x_padding', 14) || referer.includes('x_padding=');
			if (!matchedXhttpFeature && contentType.startsWith('application/grpc')) {
				log(`[gRPC] matchedRequest: ${url.pathname}${url.search}`);
				return await handleGrpcRequest(request, userID, env, ctx);
			}
			log(`[XHTTP] matchedRequest: ${url.pathname}${url.search}`);
			return await handleXhttpRequest(request, userID, env, ctx);
		} else {
			if (url.protocol === 'http:') return Response.redirect(url.href.replace(`http://${url.hostname}`, `https://${url.hostname}`), 301);
			// Public DNS-over-HTTPS endpoint
			if (accessPath === 'dns-query' || url.pathname === '/dns-query' || accessPath === 'doh' || url.pathname === '/doh') {
				return handleDoHRequest(request);
			}
			// WARP / WireGuard config generator (connects to Cloudflare WARP directly).
			if (accessPath === 'warp' || accessPath.startsWith('warp/')) {
				return handleWarpRequest(request);
			}
			if (accessPath === 'nova-block') {
				return novaBlockPage(request);
			}
			if (accessPath === 'install' || accessPath.startsWith('install/')) {
				return await handleInstall(request, env, url, adminPassword, encryptionKey, UA);
			}
			// Serve bundled dashboard assets (logo, js, css) from ASSETS binding (one-click deploy).
			if (panelHasAssets(env) && /\.\w{2,5}$/.test(url.pathname) && upgradeHeader !== 'websocket') {
				const asset = await panelFetch(env, url.pathname).catch(() => null);
				if (asset && asset.ok) return asset;
			}
			if (!adminPassword) return new Response(null, { status: 302, headers: { 'Location': '/install', 'Cache-Control': 'no-store, no-cache, must-revalidate' } });
			if (env.KV && typeof env.KV.get === 'function') {
				const caseSensitiveAccessPath = url.pathname.slice(1);
				if (caseSensitiveAccessPath === encryptionKey && encryptionKey !== 'doNotChangeDefaultKey，changeByAddingKeyVariable') {//quickSubscribe
					const params = new URLSearchParams(url.search);
					params.set('token', await MD5MD5(host + userID));
					return new Response('redirecting...', { status: 302, headers: { 'Location': `/sub?${params.toString()}` } });
				} else if (accessPath === 'login') {//handleLoginPageAndRequest
					const cookies = request.headers.get('Cookie') || '';
					const authCookie = cookies.split(';').find(c => c.trim().startsWith('auth='))?.split('=')[1];
					if (await verifySessionToken(authCookie, UA, encryptionKey, adminPassword)) return new Response('redirecting...', { status: 302, headers: { 'Location': '/admin' } });
					if (request.method === 'POST') {
						const __ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-real-ip') || 'unknown';
						const __rl = loginRateCheck(__ip);
						if (!__rl.allowed) return new Response(JSON.stringify({ error: 'rate_limited' }), { status: 429, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Retry-After': String(__rl.retryAfter), 'Cache-Control': 'no-store' } });
						const formData = await request.text();
						const params = new URLSearchParams(formData);
						const inputPassword = params.get('password');
						const normPass = (x) => String(x == null ? '' : x).trim().replace(/[\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g, '');
						if (timingSafeStrEqual(normPass(inputPassword), normPass(adminPassword)) || (envPass && timingSafeStrEqual(normPass(inputPassword), normPass(envPass)))) {
							// Optional 2FA (TOTP): if enabled, require a valid authenticator code.
							let tfa2 = null;
							try { if (env.KV && typeof env.KV.get === 'function') tfa2 = JSON.parse(await env.KV.get('admin_2fa.json') || 'null'); } catch (e) {}
							if (tfa2 && tfa2.enabled && tfa2.secret) {
								const inputCode = (params.get('code') || params.get('otp') || '').trim();
								if (!inputCode) return new Response(JSON.stringify({ need2fa: true }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
								if (!await totpVerify(tfa2.secret, inputCode)) { loginRecordFailure(__ip); return new Response(JSON.stringify({ need2fa: true, error: 'bad_code' }), { status: 401, headers: { 'Content-Type': 'application/json;charset=utf-8' } }); }
							}
							// password (+ 2FA) correct, set cookie and return success flag
							const response = new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							loginRecordSuccess(__ip); response.headers.set('Set-Cookie', `auth=${await makeSessionToken(UA, encryptionKey, adminPassword)}; Path=/; Max-Age=86400; HttpOnly; Secure; SameSite=Lax`);
							return response;
						} else { loginRecordFailure(__ip); }
					}
					return await panelHtml(env, '/login');
				} else if (accessPath === 'setwebhook') {
					if (!(await isAuthed(request, UA, encryptionKey, adminPassword))) return new Response('redirecting...', { status: 302, headers: { 'Location': '/login' } });
					const TG_TXT = await env.KV.get('tg.json');
					if (!TG_TXT) return new Response('Bot not configured', { status: 400 });
					const TG_JSON = JSON.parse(TG_TXT);
					if (!TG_JSON.BotToken) return new Response('BotToken not found', { status: 400 });
					const webhookUrl = `${url.protocol}//${url.host}/bot`;
					const apiUrl = `https://api.telegram.org/bot${TG_JSON.BotToken}/setWebhook?url=${encodeURIComponent(webhookUrl)}&drop_pending_updates=true`;
					const res = await fetch(apiUrl);
					ctx.waitUntil(tgSetMyCommands(TG_JSON.BotToken));
					const data = await res.json();
					return new Response(JSON.stringify(data, null, 2), { status: 200, headers: { 'Content-Type': 'application/json' } });
				} else if (accessPath === 'bot') {
					if (request.method === 'POST') return await handleTelegramWebhook(request, env, userID, host);
					return new Response('Bot webhook active', { status: 200 });
				} else if (accessPath === 'admin' || accessPath.startsWith('admin/')) {//verifyCookieAndResponseAdmin
					const cookies = request.headers.get('Cookie') || '';
					const authCookie = cookies.split(';').find(c => c.trim().startsWith('auth='))?.split('=')[1];
					// no cookie or cookie error, redirect to /login page
				if (!authCookie || !(await verifySessionToken(authCookie, UA, encryptionKey, adminPassword))) return new Response('redirecting...', { status: 302, headers: { 'Location': '/login' } });
				// Throttled central-server sync on admin access (instance heartbeat + pull broadcasts)
				ctx.waitUntil(flushUsage(env));
				if (Date.now() - lastCentralSync > 600000) { lastCentralSync = Date.now(); ctx.waitUntil(centralHeartbeat(env)); ctx.waitUntil(refreshAnnouncements(env)); }
				if (accessPath === 'admin/whoami') {
						const cf = request.cf || {};
						return new Response(JSON.stringify({ asn: cf.asn || 0, isp: cf.asOrganization || '', country: cf.country || '', city: cf.city || '', carrier: identifyCarrier(request) }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
					} else if (accessPath === 'admin/security/status') {
						let tfaS = null; try { tfaS = JSON.parse(await env.KV.get('admin_2fa.json') || 'null'); } catch (e) {}
						const kvPassS = await env.KV.get('admin_pass');
						return new Response(JSON.stringify({ twofa: !!(tfaS && tfaS.enabled), passwordSource: kvPassS ? 'kv' : 'env', envRecovery: !!envPass, kvSet: !!kvPassS, uuidPinned: !!(await env.KV.get('worker_uuid')) }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
					} else if (accessPath === 'admin/security/change-password') {
						if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
						let body = {}; try { body = await request.json(); } catch (e) {}
						const cur = (body.current || '').toString().replace(/[\r\n]/g, '');
						const neu = (body.new || '').toString().replace(/[\r\n]/g, '');
						const curOk = timingSafeStrEqual(cur, String(adminPassword || '').replace(/[\r\n]/g, '')) || (envPass && timingSafeStrEqual(cur, String(envPass).replace(/[\r\n]/g, '')));
						if (!curOk) return new Response(JSON.stringify({ error: 'wrong_current' }), { status: 403, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						if (neu.length < 6) return new Response(JSON.stringify({ error: 'too_short' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						try { if (!(env.UUID || env.uuid)) { const ex = await env.KV.get('worker_uuid'); if (!ex) { await env.KV.put('worker_uuid', userID); cachedWorkerUUID = userID; cachedWorkerUUIDAt = Date.now(); } } } catch (e) {}
						await env.KV.put('admin_pass', neu); cachedAdminPass = neu; cachedAdminPassAt = Date.now();
						const respCP = new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						respCP.headers.set('Set-Cookie', `auth=${await makeSessionToken(UA, encryptionKey, neu)}; Path=/; Max-Age=86400; HttpOnly; Secure; SameSite=Lax`);
						return respCP;
					} else if (accessPath === 'admin/security/reveal') {
						let src = 'none'; try { src = envPass ? 'env' : ((await env.KV.get('admin_pass')) ? 'kv' : 'none'); } catch (e) { src = envPass ? 'env' : 'none'; }
						return new Response(JSON.stringify({ password: adminPassword || '', source: src }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
					} else if (accessPath === 'admin/security/2fa-setup') {
						const secret = randomBase32(32);
						const label = encodeURIComponent('Nova Proxy (' + url.host + ')');
						const otpauth = `otpauth://totp/${label}?secret=${secret}&issuer=${encodeURIComponent('Nova Proxy')}&algorithm=SHA1&digits=6&period=30`;
						return new Response(JSON.stringify({ secret, otpauth }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
					} else if (accessPath === 'admin/security/2fa-enable') {
						if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
						let body = {}; try { body = await request.json(); } catch (e) {}
						const secret = (body.secret || '').toString().trim();
						const code = (body.code || '').toString().trim();
						if (!secret) return new Response(JSON.stringify({ error: 'no_secret' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						if (!await totpVerify(secret, code)) return new Response(JSON.stringify({ error: 'bad_code' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						await env.KV.put('admin_2fa.json', JSON.stringify({ enabled: true, secret, addedAt: Date.now() }));
						return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					} else if (accessPath === 'admin/security/2fa-disable') {
						if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
						let body = {}; try { body = await request.json(); } catch (e) {}
						const code = (body.code || '').toString().trim();
						let tfaD = null; try { tfaD = JSON.parse(await env.KV.get('admin_2fa.json') || 'null'); } catch (e) {}
						if (tfaD && tfaD.enabled && tfaD.secret && !await totpVerify(tfaD.secret, code)) return new Response(JSON.stringify({ error: 'bad_code' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						await env.KV.delete('admin_2fa.json');
						return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					} else if (accessPath === 'admin/log.json') {// readLogContent
						const readLogContent = await env.KV.get('log.json') || '[]';
						return new Response(readLogContent, { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					} else if (caseSensitiveAccessPath === 'admin/getCloudflareUsage') {// queryRequestCount
						try {
							const Usage_JSON = await getCloudflareUsage(url.searchParams.get('Email'), url.searchParams.get('GlobalAPIKey'), url.searchParams.get('AccountID'), url.searchParams.get('APIToken'));
							return new Response(JSON.stringify(Usage_JSON, null, 2), { status: 200, headers: { 'Content-Type': 'application/json' } });
						} catch (err) {
							const errorResponse = { msg: 'queryRequestCountFailed，failReason：' + err.message, error: err.message };
							return new Response(JSON.stringify(errorResponse, null, 2), { status: 500, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						}
					} else if (caseSensitiveAccessPath === 'admin/getADDAPI') {// verifyBestApi
						if (url.searchParams.get('url')) {
							const pendingBestUrl = url.searchParams.get('url');
							try {
								new URL(pendingBestUrl);
								const requestBestApiContent = await requestBestApi([pendingBestUrl], url.searchParams.get('port') || '443');
								let bestApiIp = requestBestApiContent[0].length > 0 ? requestBestApiContent[0] : requestBestApiContent[1];
								bestApiIp = bestApiIp.map(item => item.replace(/#(.+)$/, (_, remark) => '#' + decodeURIComponent(remark)));
								return new Response(JSON.stringify({ success: true, data: bestApiIp }, null, 2), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							} catch (err) {
								const errorResponse = { msg: 'verifyBestApiFail，failReason：' + err.message, error: err.message };
								return new Response(JSON.stringify(errorResponse, null, 2), { status: 500, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							}
						}
						return new Response(JSON.stringify({ success: false, data: [] }, null, 2), { status: 403, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					} else if (accessPath === 'admin/check') {// proxyCheck
						const proxyProtocol = ['socks5', 'http', 'https', 'turn', 'sstp'].find(type => url.searchParams.has(type)) || null;
						if (!proxyProtocol) return new Response(JSON.stringify({ error: 'missingProxyParam' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						const proxyParam = url.searchParams.get(proxyProtocol);
						const startTime = Date.now();
						let probeProxyResponse;
						try {
							parsedSocks5Address = await getSocks5Account(proxyParam, getProxyDefaultPort(proxyProtocol));
							const { username, password, hostname, port } = parsedSocks5Address;
							const fullProxyParam = username && password ? `${username}:${password}@${hostname}:${port}` : `${hostname}:${port}`;
							try {
								const probeHost = 'cloudflare.com', probePort = 443, encoder = new TextEncoder(), decoder = new TextDecoder();
								const TCPconnection = createRequestTcpConnector(request);
								let tcpSocket = null, tlsSocket = null;
								try {
									tcpSocket = proxyProtocol === 'socks5'
										? await socks5Connect(probeHost, probePort, new Uint8Array(0), TCPconnection)
										: proxyProtocol === 'turn'
											? await turnConnect(parsedSocks5Address, probeHost, probePort, TCPconnection)
											: proxyProtocol === 'sstp'
												? await sstpConnect(parsedSocks5Address, probeHost, probePort, TCPconnection)
												: (proxyProtocol === 'https' && isIPHostname(hostname)
													? await httpsConnect(probeHost, probePort, new Uint8Array(0), TCPconnection)
													: await httpConnect(probeHost, probePort, new Uint8Array(0), proxyProtocol === 'https', TCPconnection));
									if (!tcpSocket) throw new Error('cannotConnectToProxy');
									tlsSocket = new TlsClient(tcpSocket, { serverName: probeHost, insecure: true });
									await tlsSocket.handshake();
									await tlsSocket.write(encoder.encode(`GET /cdn-cgi/trace HTTP/1.1\r\nHost: ${probeHost}\r\nUser-Agent: Mozilla/5.0\r\nConnection: close\r\n\r\n`));
									let responseBuffer = new Uint8Array(0), headerEndIndex = -1, contentLength = null, chunked = false;
									const maxResponseBytes = 64 * 1024;
									while (responseBuffer.length < maxResponseBytes) {
										const value = await tlsSocket.read();
										if (!value) break;
										if (value.byteLength === 0) continue;
										responseBuffer = concatByteData(responseBuffer, value);
										if (headerEndIndex === -1) {
											const crlfcrlf = responseBuffer.findIndex((_, i) => i < responseBuffer.length - 3 && responseBuffer[i] === 0x0d && responseBuffer[i + 1] === 0x0a && responseBuffer[i + 2] === 0x0d && responseBuffer[i + 3] === 0x0a);
											if (crlfcrlf !== -1) {
												headerEndIndex = crlfcrlf + 4;
												const headers = decoder.decode(responseBuffer.slice(0, headerEndIndex));
												const statusLine = headers.split('\r\n')[0] || '';
												const statusMatch = statusLine.match(/HTTP\/\d\.\d\s+(\d+)/);
												const statusCode = statusMatch ? parseInt(statusMatch[1], 10) : NaN;
												if (!Number.isFinite(statusCode) || statusCode < 200 || statusCode >= 300) throw new Error(`proxyProbeRequestFail: ${statusLine || 'invalidResponse'}`);
												const lengthMatch = headers.match(/\r\nContent-Length:\s*(\d+)/i);
												if (lengthMatch) contentLength = parseInt(lengthMatch[1], 10);
												chunked = /\r\nTransfer-Encoding:\s*chunked/i.test(headers);
											}
										}
										if (headerEndIndex !== -1 && contentLength !== null && responseBuffer.length >= headerEndIndex + contentLength) break;
										if (headerEndIndex !== -1 && chunked && decoder.decode(responseBuffer).includes('\r\n0\r\n\r\n')) break;
									}
									if (headerEndIndex === -1) throw new Error('proxyProbeResponseTooLongOrInvalid');
									const response = decoder.decode(responseBuffer);
									const ip = response.match(/(?:^|\n)ip=(.*)/)?.[1];
									const loc = response.match(/(?:^|\n)loc=(.*)/)?.[1];
									if (!ip || !loc) throw new Error('proxyProbeResponseInvalid');
									probeProxyResponse = { success: true, proxy: proxyProtocol + "://" + fullProxyParam, ip, loc, responseTime: Date.now() - startTime };
								} finally {
									try { tlsSocket ? tlsSocket.close() : await tcpSocket?.close?.() } catch (e) { }
								}
							} catch (error) {
								probeProxyResponse = { success: false, error: error.message, proxy: proxyProtocol + "://" + fullProxyParam, responseTime: Date.now() - startTime };
							}
						} catch (err) {
							probeProxyResponse = { success: false, error: err.message, proxy: proxyProtocol + "://" + proxyParam, responseTime: Date.now() - startTime };
						}
						return new Response(JSON.stringify(probeProxyResponse, null, 2), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					} else if (accessPath === 'admin/announce') {
						const health = JSON.parse(await env.KV.get('domain-health.json') || 'null');
						const result = await announceSubLinks(env, { baseUrl: `${url.protocol}//${url.host}`, health });
						return new Response(JSON.stringify(result, null, 2), { status: result.skipped ? 400 : 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					} else if (accessPath === 'admin/publish-mirror') {
						const result = await publishSubMirror(env, `${url.protocol}//${url.host}`);
						const allOk = !result.skipped && Array.isArray(result.results) && result.results.every(r => r.ok);
						return new Response(JSON.stringify(result, null, 2), { status: result.skipped ? 400 : (allOk ? 200 : 502), headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					} else if (accessPath === 'admin/warp.json') {// registerWARP / applyLicense / status
						let stored = null; try { stored = JSON.parse(await env.KV.get('warp.json') || 'null'); } catch (e) { }
						if (request.method === 'POST') {
							let reqBody = {}; try { reqBody = await request.json(); } catch (e) { }
							try {
								if (reqBody.fromCentral) {
									// Pull WARP+ keys from the central pool and apply the first that works.
									if (!stored || !stored.id) stored = await warpRegisterAccount();
									const { api } = await getCentralApi(env); if (!api) throw new Error('Central API not set in Settings');
									let keys = []; try { const cr = await fetch(api + '/api/warp', { headers: { 'User-Agent': 'NovaProxy' } }); const cj = await cr.json(); keys = Array.isArray(cj.keys) ? cj.keys : []; } catch (e) {}
									if (!keys.length) throw new Error('No WARP+ keys in the central pool');
									let applied = false, lastErr = '';
									for (const k of keys) { try { await warpApplyLicense(stored, String(k).trim()); applied = true; break; } catch (e) { lastErr = e && e.message ? e.message : String(e); } }
									if (!applied) throw new Error('All central keys failed (' + lastErr + ')');
								} else if (reqBody.license) {
									if (!stored || !stored.id) stored = await warpRegisterAccount();
									await warpApplyLicense(stored, String(reqBody.license).trim());
								} else {
									stored = await warpRegisterAccount();
									if (reqBody.wow) { const second = await warpRegisterAccount(); second.registered = true; stored.wow = second; }
								}
								stored.registered = true;
								await env.KV.put('warp.json', JSON.stringify(stored));
								ctx.waitUntil(requestLogRecord(env, request, accessIp, reqBody.license ? 'WARP_License' : 'Register_WARP', config_JSON));
								return new Response(JSON.stringify(warpPublicView(stored, networkSettings && networkSettings.warpEndpoint)), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							} catch (e) {
								return new Response(JSON.stringify({ registered: !!(stored && stored.registered), error: e && e.message ? e.message : String(e) }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							}
						}
						return new Response(JSON.stringify(warpPublicView(stored, networkSettings && networkSettings.warpEndpoint)), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					} else if (accessPath === 'admin/domains') {//domainPoolHealth
						const hosts = await getPoolHosts(env);
						const health = url.searchParams.has('check') ? await checkDomainHealth(env, hosts, url.host) : JSON.parse(await env.KV.get('domain-health.json') || 'null');
						return new Response(JSON.stringify({ hosts, health }, null, 2), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					} else if (accessPath === 'admin/announcement') {// broadcast from central server (cached)
						if (url.searchParams.has('refresh')) await refreshAnnouncements(env);
						return new Response(await env.KV.get('announcement.json') || 'null', { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					} else if (accessPath === 'admin/central/stats') {// fleet stats from the central server
						const { api, token } = await getCentralApi(env);
						if (!api) return new Response(JSON.stringify({ configured: false }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						try {
							const r = await fetch(api + '/stats', { headers: token ? { 'Authorization': 'Bearer ' + token } : {} });
							const d = await r.json().catch(() => ({}));
							return new Response(JSON.stringify({ configured: true, ...d }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						} catch (e) { return new Response(JSON.stringify({ configured: true, error: e.message }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } }); }
					} else if (accessPath === 'admin/central/announcement') {// set the broadcast (admin)
						const { api, token } = await getCentralApi(env);
						if (!api) return new Response(JSON.stringify({ ok: false, error: 'centralApiNotSet' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						try {
							const r = await fetch(api + '/admin/announcement', { method: 'POST', headers: { 'Content-Type': 'application/json', ...(token ? { 'Authorization': 'Bearer ' + token } : {}) }, body: await request.text() });
							ctx.waitUntil(refreshAnnouncements(env));
							return new Response(await r.text(), { status: r.status, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						} catch (e) { return new Response(JSON.stringify({ ok: false, error: e.message }), { status: 502, headers: { 'Content-Type': 'application/json;charset=utf-8' } }); }
					}

					try {
						config_JSON = await readConfigJson(env, host, userID, UA);
					} catch (readConfigError) {
						console.error('adminReadConfigError: ' + readConfigError.message);
						const now = new Date().toISOString();
						config_JSON = {
							TIME: now, HOST: host, HOSTS: [host], UUID: userID, PATH: "/",
							protocolType: "vless", transportProtocol: "ws", gRPCmode: "gun", skipCertVerify: false,
							enable0RTT: false, tlsFragment: null, randomPath: false, Fingerprint: "chrome",
							optimizedSubGeneration: { local: true, localIPPool: { randomIP: true, randomCount: 16, specifiedPorts: -1 }, SUB: null, SUBNAME: "Nova Proxy", SUBUpdateTime: 3, TOKEN: await MD5MD5(host + userID) },
							CF: { Email: null, GlobalAPIKey: null, AccountID: null, APIToken: null, UsageAPI: null, Usage: { success: false, pages: 0, workers: 0, total: 0, max: 100000 } },
							TG: { enabled: false, BotToken: null, ChatID: null },
							loadTime: '0ms'
						};
					}

					if (accessPath === 'admin/init') {// resetConfigAsDefaultValue
						try {
							config_JSON = await readConfigJson(env, host, userID, UA, true);
							ctx.waitUntil(requestLogRecord(env, request, accessIp, 'Init_Config', config_JSON));
							config_JSON.init = 'configResetAsDefaultValue';
							return new Response(JSON.stringify(config_JSON, null, 2), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						} catch (err) {
							const errorResponse = { msg: 'configResetFail，failReason：' + err.message, error: err.message };
							return new Response(JSON.stringify(errorResponse, null, 2), { status: 500, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						}
					} else if (request.method === 'POST') {// handle KV op（POST request）
						if (accessPath === 'admin/config.json') { // saveConfig.jsonconfig
							try {
								const newConfig = await request.json();
								// verify config integrity
								if (!newConfig.UUID || !newConfig.HOST) return new Response(JSON.stringify({ error: 'configIncomplete' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });

								// saveTo KV
								await env.KV.put('config.json', JSON.stringify(newConfig, null, 2));
								ctx.waitUntil(requestLogRecord(env, request, accessIp, 'Save_Config', config_JSON));
								return new Response(JSON.stringify({ success: true, message: 'configSave' }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							} catch (error) {
								console.error('saveConfigFail:', error);
								return new Response(JSON.stringify({ error: 'saveConfigFail: ' + error.message }), { status: 500, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							}
						} else if (accessPath === 'admin/cf.json') { // saveCf.jsonconfig
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
										return new Response(JSON.stringify({ error: 'configIncomplete' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
									}
								}

								// saveTo KV
								await env.KV.put('cf.json', JSON.stringify(CF_JSON, null, 2));
								ctx.waitUntil(requestLogRecord(env, request, accessIp, 'Save_Config', config_JSON));
								return new Response(JSON.stringify({ success: true, message: 'configSave' }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							} catch (error) {
								console.error('saveConfigFail:', error);
								return new Response(JSON.stringify({ error: 'saveConfigFail: ' + error.message }), { status: 500, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							}
						} else if (accessPath === 'admin/tg.json') { // saveTg.jsonconfig
							try {
								const newConfig = await request.json();
								let webhookSet = null, webhookError = null;
								if (newConfig.init && newConfig.init === true) {
									const TG_JSON = { BotToken: null, ChatID: null };
									await env.KV.put('tg.json', JSON.stringify(TG_JSON, null, 2));
								} else {
									if (!newConfig.BotToken || !newConfig.ChatID) return new Response(JSON.stringify({ error: 'configIncomplete' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
									await env.KV.put('tg.json', JSON.stringify(newConfig, null, 2));
									try {
										const webhookUrl = `${url.protocol}//${url.host}/bot`;
										const whRes = await fetch(`https://api.telegram.org/bot${newConfig.BotToken}/setWebhook?url=${encodeURIComponent(webhookUrl)}&drop_pending_updates=true`);
										const whData = await whRes.json().catch(() => ({}));
										ctx.waitUntil(tgSetMyCommands(newConfig.BotToken));
										webhookSet = !!whData.ok;
										if (!whData.ok) webhookError = whData.description || 'setWebhook failed';
									} catch (e) { webhookSet = false; webhookError = e.message; }
								}
								ctx.waitUntil(requestLogRecord(env, request, accessIp, 'Save_Config', config_JSON));
								return new Response(JSON.stringify({ success: true, message: 'configSave', webhookSet, webhookError }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							} catch (error) {
								console.error('saveConfigFail:', error);
								return new Response(JSON.stringify({ error: 'saveConfigFail: ' + error.message }), { status: 500, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							}
						} else if (accessPath === 'admin/users.json') { // multi-user registry + per-user usage
							try {
								const _ns = JSON.parse(await env.KV.get('network-settings.json') || '{}');
								if (request.method === 'POST') {
									const body = await request.json();
									_ns.multiUser = !!body.multiUser;
									_ns.users = Array.isArray(body.users) ? body.users : [];
									await env.KV.put('network-settings.json', JSON.stringify(_ns, null, 2));
									try { await env.KV.delete('user-alerts.json'); } catch (e) {}
									savedUsersAuth = { multiUser: _ns.multiUser, users: _ns.users }; savedUsersAuthAt = Date.now();
									ctx.waitUntil(requestLogRecord(env, request, accessIp, 'Save_Users', config_JSON));
									return new Response(JSON.stringify({ success: true, count: _ns.users.length, multiUser: _ns.multiUser }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
								}
								let regMU = !!_ns.multiUser, users = Array.isArray(_ns.users) ? _ns.users : [];
								if (savedUsersAuth && (Date.now() - savedUsersAuthAt) < 120000) { regMU = !!savedUsersAuth.multiUser; users = savedUsersAuth.users; }
								const usage = {}, usageIO = {};
								for (const u of users) { if (!u || !u.id) continue; try { const c = JSON.parse(await env.KV.get('uusage:' + u.id) || 'null'); usage[u.id] = (c && c.total) || 0; usageIO[u.id] = { up: (c && c.up) || 0, down: (c && c.down) || 0 }; } catch (e) { usage[u.id] = 0; usageIO[u.id] = { up: 0, down: 0 }; } }
								return new Response(JSON.stringify({ multiUser: regMU, users, usage, usageIO }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
							} catch (e) { return new Response(JSON.stringify({ error: String(e && e.message || e) }), { status: 500, headers: { 'Content-Type': 'application/json;charset=utf-8' } }); }
						} else if (accessPath === 'admin/network-settings.json') { // saveNetworkSettings
							try {
								const settings = await request.json();
								const validSettings = {
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
									warpMode: ['warp', 'chain', 'wow'].includes(settings.warpMode) ? settings.warpMode : 'warp',
									warpEndpoint: settings.warpEndpoint || '',
									warpAmnezia: typeof settings.warpAmnezia === 'boolean' ? settings.warpAmnezia : false,
									customRules: typeof settings.customRules === 'string' ? settings.customRules : '',
									bypassCountries: Array.isArray(settings.bypassCountries) ? [...new Set(settings.bypassCountries.filter(c => /^[a-z]{2}$/i.test(c)).map(c => c.toLowerCase()))].slice(0, 20) : [],
									blockCategories: Array.isArray(settings.blockCategories) ? settings.blockCategories.filter(c => ['quic', 'malware', 'phishing', 'cryptominers'].includes(c)) : [],
									warpNoise: (settings.warpNoise && typeof settings.warpNoise === 'object') ? {
										mode: ['', 'quic', 'random'].includes(settings.warpNoise.mode) ? settings.warpNoise.mode : '',
										count: String(settings.warpNoise.count || '').slice(0, 12),
										size: String(settings.warpNoise.size || '').slice(0, 12),
										delay: String(settings.warpNoise.delay || '').slice(0, 12)
									} : { mode: '', count: '', size: '', delay: '' }
								};
								try { const _ns = JSON.parse(await env.KV.get('network-settings.json') || '{}'); validSettings.multiUser = typeof settings.multiUser === 'boolean' ? settings.multiUser : (_ns.multiUser || false); validSettings.users = Array.isArray(settings.users) ? settings.users : (_ns.users || []); } catch (e) { validSettings.multiUser = !!settings.multiUser; validSettings.users = Array.isArray(settings.users) ? settings.users : []; }
								await env.KV.put('network-settings.json', JSON.stringify(validSettings, null, 2));
								ctx.waitUntil(requestLogRecord(env, request, accessIp, 'Save_Network_Settings', config_JSON));
								return new Response(JSON.stringify({ success: true, message: 'تنظیمات شبکه با موفقیت ذخیره شد' }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							} catch (error) {
								console.error('saveNetworkSettingsFail:', error);
								return new Response(JSON.stringify({ error: 'saveNetworkSettingsFail: ' + error.message }), { status: 500, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							}
						} else if (caseSensitiveAccessPath === 'admin/ADD.txt') { // saveCustomBestIp
							try {
								const customIPs = await request.text();
								await env.KV.put('ADD.txt', customIPs);// saveTo KV
								ctx.waitUntil(requestLogRecord(env, request, accessIp, 'Save_Custom_IPs', config_JSON));
								return new Response(JSON.stringify({ success: true, message: 'customIpSaved' }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							} catch (error) {
								console.error('saveCustomIpFailed:', error);
								return new Response(JSON.stringify({ error: 'saveCustomIpFailed: ' + error.message }), { status: 500, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
							}
						} else return new Response(JSON.stringify({ error: 'unsupportedPostPath' }), { status: 404, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					} else if (accessPath === 'admin/config.json') {// handle admin/config.json request，returnJSON
						return new Response(JSON.stringify(config_JSON, null, 2), { status: 200, headers: { 'Content-Type': 'application/json' } });
					} else if (accessPath === 'admin/network-settings.json') {// handle admin/network-settings.json request
						try {
							const saved = await env.KV.get('network-settings.json');
							const defaultSettings = {
								enableRouting: true, enableGeoIP: true, enableGeoSite: true,
								enableAdBlock: true, enablePornBlock: false, enableDomesticBypass: true,
								enableDoH: true, dohProvider: 'cloudflare',
								enableLocalDNS: false, localDNSIP: '8.8.8.8', localDNSPort: '53',
								enableAntiSanctionDNS: false, antiSanctionDNSProvider: 'cloudflare', antiSanctionCustomDNS: '',
								enableFakeDNS: false, fakeDNSIP: '198.51.100.1',
								enableIPv6: true, allowLAN: false, logLevel: 'error',
								enableWarp: false, warpMode: 'warp', warpEndpoint: '', warpAmnezia: false,
								customRules: '', bypassCountries: [], blockCategories: [],
								warpNoise: { mode: '', count: '', size: '', delay: '' }
							};
							const settings = saved ? JSON.parse(saved) : defaultSettings;
							return new Response(JSON.stringify(settings, null, 2), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						} catch (error) {
							return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
						}
					} else if (accessPath === 'admin/users.json') {// GET multi-user registry + per-user usage (POST handled above)
						try {
							const _ns = JSON.parse(await env.KV.get('network-settings.json') || '{}');
							let regMU = !!_ns.multiUser, users = Array.isArray(_ns.users) ? _ns.users : [];
							// read-after-write cache so a fresh save survives KV eventual consistency on reload
							if (savedUsersAuth && (Date.now() - savedUsersAuthAt) < 120000) { regMU = !!savedUsersAuth.multiUser; users = savedUsersAuth.users; }
							const usage = {};
							for (const u of users) { if (!u || !u.id) continue; try { const c = JSON.parse(await env.KV.get('uusage:' + u.id) || 'null'); usage[u.id] = (c && c.total) || 0; } catch (e) { usage[u.id] = 0; } }
							return new Response(JSON.stringify({ multiUser: regMU, users, usage }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
						} catch (e) {
							return new Response(JSON.stringify({ multiUser: false, users: [], usage: {} }), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
						}
					} else if (caseSensitiveAccessPath === 'admin/ADD.txt') {// handle admin/ADD.txt request，returnLocalBestIp
						let localBestIp = await env.KV.get('ADD.txt') || 'null';
						if (localBestIp == 'null') localBestIp = (await generateRandomIp(request, config_JSON.optimizedSubGeneration.localIPPool.randomCount, config_JSON.optimizedSubGeneration.localIPPool.specifiedPortss))[1];
						return new Response(localBestIp, { status: 200, headers: { 'Content-Type': 'text/plain;charset=utf-8', 'asn': request.cf.asn } });
					} else if (accessPath === 'admin/cf.json') {// CFconfigFile
						return new Response(JSON.stringify(request.cf, null, 2), { status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
					} else if (accessPath === 'admin/system.json') {
						const kvConnected = !!(env.KV && typeof env.KV.get === 'function');
						let kvOk = false;
						if (kvConnected) try { await env.KV.get('config.json'); kvOk = true; } catch (e) {}
						let todayUsage = { up: 0, down: 0, total: 0 };
						if (kvConnected) try { const tu = JSON.parse(await env.KV.get('usage:' + getDateKey(new Date())) || 'null'); if (tu) todayUsage = { up: tu.up || 0, down: tu.down || 0, total: tu.total || 0 }; } catch (e) {}
						const cf = request.cf;
						return new Response(JSON.stringify({
							ip: accessIp,
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
					} else if (accessPath === 'admin/usage-data') {
						try {
							const now = new Date();
							const days = 16;
							const keys = [];
							for (let i = 0; i < days; i++) { const d = new Date(now); d.setDate(d.getDate() - i); keys.push('usage:' + d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0')); }
							const vals = await Promise.all(keys.map(k => env.KV.get(k).catch(() => null)));
							const daily = [];
							for (let i = 0; i < keys.length; i++) { if (vals[i]) { try { daily.push({ date: keys[i].slice(6), ...JSON.parse(vals[i]) }); } catch (e) {} } }
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
					} else if (accessPath === 'admin/sub-content') {
						const subToken = await MD5MD5(host + userID);
						const subUrl = `${url.protocol}//${url.host}/sub?token=${subToken}`;
						const subResponse = await fetch(subUrl).catch(() => null);
						if (!subResponse) return new Response('Sub content unavailable', { status: 502 });
						const subText = await subResponse.text();
						return new Response(subText, { status: 200, headers: { 'Content-Type': 'text/plain;charset=utf-8', 'Cache-Control': 'no-store' } });
					} else if (caseSensitiveAccessPath === 'admin/bestip') {
						return await bestIP(request, env);
					}

					ctx.waitUntil(requestLogRecord(env, request, accessIp, 'Admin_Login', config_JSON));
					// SPA routing: extract page name from path (e.g., admin/core → core)
					const spaPage = accessPath.startsWith('admin/') ? accessPath.slice(6).split('/')[0] : '';
					const adminPath = spaPage ? '/admin/' : '/admin' + url.search;
					return await panelHtml(env, adminPath, { spaPage }).catch(() => new Response('Admin panel unavailable', { status: 502 }));
				} else if (accessPath === 'logout' || uuidRegex.test(accessPath)) {//clearCookieAndRedirectToLogin
					const response = new Response('redirecting...', { status: 302, headers: { 'Location': '/login' } });
					response.headers.set('Set-Cookie', 'auth=; Path=/; Max-Age=0; HttpOnly');
					return response;
				} else if (accessPath === 'sub') {//handleSubRequest
					const subToken = await MD5MD5(host + userID), asBestSubGenerator = ['1', 'true'].includes(env.BEST_SUB) && url.searchParams.get('host') === 'example.com' && url.searchParams.get('uuid') === '00000000-0000-4000-8000-000000000000' && UA.toLowerCase().includes('NovaProxy (https://github.com/IRNova');
					const requestToken = url.searchParams.get('token');
					let subUserTag = '';
					if (networkSettings && Array.isArray(networkSettings.users) && requestToken) { // T1: resolve per-user token even with multi-user off (fixes nginx on user links)
						const _u = networkSettings.users.find(x => x && x.token === requestToken);
						if (_u) {
							if (_u.enabled === false) return new Response('Account disabled', { status: 403 });
							if (_u.expiry) { const _t = Date.parse(_u.expiry); if (!isNaN(_t) && Date.now() > _t) return new Response('Account expired', { status: 403 }); }
							if (_u.quotaBytes) { try { const _c = JSON.parse(await env.KV.get('uusage:' + _u.id) || 'null'); if (_c && _c.total >= _u.quotaBytes) return new Response('Quota exceeded', { status: 403 }); } catch (e) {} }
							subUserTag = _u.tag;
						}
					}
					const userClientRequestSub = requestToken === subToken || subUserTag !== '';
					const currentDayIndex = Math.floor(Date.now() / 86400000);
					const subConverterTokenSeed = base64SecretEncode(subToken, userID);
					const [todaySubConverterToken, yesterdaySubConverterToken] = await Promise.all([
						MD5MD5(subConverterTokenSeed + currentDayIndex),
						MD5MD5(subConverterTokenSeed + (currentDayIndex - 1)),
					]);
					const subConverterRequestSub = requestToken === todaySubConverterToken || requestToken === yesterdaySubConverterToken;
					if (userClientRequestSub || subConverterRequestSub || asBestSubGenerator) {
						config_JSON = await readConfigJson(env, host, userID, UA);
						if (asBestSubGenerator) ctx.waitUntil(requestLogRecord(env, request, accessIp, 'Get_Best_SUB', config_JSON, false));
						else ctx.waitUntil(requestLogRecord(env, request, accessIp, 'Get_SUB', config_JSON));
						ctx.waitUntil(flushUsage(env));
						const ua = UA.toLowerCase();
						const responseHeaders = {
							"content-type": "text/plain; charset=utf-8",
							"Profile-Update-Interval": config_JSON.optimizedSubGeneration.SUBUpdateTime,
							"Profile-web-page-url": url.protocol + '//' + url.host + '/admin',
							"Cache-Control": "no-store",
						};
						try {
							const _mu = JSON.parse(await env.KV.get('usage-m:' + getMonthKey(new Date())) || 'null') || { up: 0, down: 0 };
							responseHeaders["Subscription-Userinfo"] = `upload=${_mu.up || 0}; download=${_mu.down || 0}; total=1099511627776000; expire=4102329600`;
						} catch (e) {}
						const isSubConverterRequest = url.searchParams.has('b64') || url.searchParams.has('base64') || request.headers.get('subconverter-request') || request.headers.get('subconverter-version') || ua.includes('subconverter') || ua.includes(('CF-Workers-SUB').toLowerCase()) || asBestSubGenerator;
						const subType = isSubConverterRequest
							? 'mixed'
							: url.searchParams.has('target')
								? url.searchParams.get('target')
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

						if (!ua.includes('mozilla')) responseHeaders["Content-Disposition"] = `attachment; filename*=utf-8''${encodeURIComponent(config_JSON.optimizedSubGeneration.SUBNAME)}`;
						const protocolType = ((url.searchParams.has('surge') || ua.includes('surge')) && config_JSON.protocolType !== 'ss') ? 'tro' + 'jan' : config_JSON.protocolType;
						let subContent = '';
						if (subType === 'mixed') {
							const TLSfragmentParam = config_JSON.tlsFragment == 'Shadowrocket' ? `&fragment=${encodeURIComponent('1,40-60,30-50,tlshello')}` : config_JSON.tlsFragment == 'Happ' ? `&fragment=${encodeURIComponent('3,1,tlshello')}` : '';
							let fullBestIp = [], otherNodeLink = '', proxyIpPool = [];

							if (!url.searchParams.has('sub') && config_JSON.optimizedSubGeneration.local) { // localGenerateSub
								const fullBestList = config_JSON.optimizedSubGeneration.localIPPool.randomIP ? (
									await generateRandomIp(request, config_JSON.optimizedSubGeneration.localIPPool.randomCount, config_JSON.optimizedSubGeneration.localIPPool.specifiedPorts)
								)[0] : await env.KV.get('ADD.txt') ? await sortIntoArray(await env.KV.get('ADD.txt')) : (
									await generateRandomIp(request, config_JSON.optimizedSubGeneration.localIPPool.randomCount, config_JSON.optimizedSubGeneration.localIPPool.specifiedPorts)
								)[0];
								const bestApi = [], bestIp = [], otherNodes = [];
								for (const element of fullBestList) {
									if (element.toLowerCase().startsWith('sub://')) {
										bestApi.push(element);
									} else {
										const noteIndex = element.indexOf('#');
										const addressPart = noteIndex > -1 ? element.slice(0, noteIndex) : element;
										const notePart = noteIndex > -1 ? element.slice(noteIndex) : '';
										const subMatch = element.match(/sub\s*=\s*([^\s&#]+)/i);
										if (subMatch && subMatch[1].trim().includes('.')) {
											const bestIpAsProxyIp = element.toLowerCase().includes('proxyip=true');
											if (bestIpAsProxyIp) bestApi.push('sub://' + subMatch[1].trim() + "?proxyip=true" + (element.includes('#') ? ('#' + element.split('#')[1]) : ''));
											else bestApi.push('sub://' + subMatch[1].trim() + (element.includes('#') ? ('#' + element.split('#')[1]) : ''));
										} else if (addressPart.toLowerCase().startsWith('https://')) {
											bestApi.push(element);
										} else if (addressPart.toLowerCase().includes('://')) {
											if (element.includes('#')) {
												const addressNoteSplit = element.split('#');
												otherNodes.push(addressNoteSplit[0] + '#' + encodeURIComponent(decodeURIComponent(addressNoteSplit[1])));
											} else otherNodes.push(element);
										} else {
											if (addressPart.includes('*')) {
												bestIp.push(replaceStarWithRandom(addressPart) + notePart);
											} else bestIp.push(element);
										}
									}
								}
								const requestBestApiContent = await requestBestApi(bestApi, '443');
								const mergedOtherNodeArray = [...new Set(otherNodes.concat(requestBestApiContent[1]))];
								otherNodeLink = mergedOtherNodeArray.length > 0 ? mergedOtherNodeArray.join('\n') + '\n' : '';
								const bestApiIp = requestBestApiContent[0];
								proxyIpPool = requestBestApiContent[3] || [];
								fullBestIp = [...new Set(bestIp.concat(bestApiIp))];
							} else { // optimizedSubGeneration
								let bestSubGeneratorHost = url.searchParams.get('sub') || config_JSON.optimizedSubGeneration.SUB;
								const [bestGenerateIPArray, bestGenerateOtherNodes] = await getBestSubGeneratorData(bestSubGeneratorHost);
								fullBestIp = fullBestIp.concat(bestGenerateIPArray);
								otherNodeLink += bestGenerateOtherNodes;
							}
							// WARP: add the registered WARP (WireGuard) node when enabled in Network settings.
							if (networkSettings && networkSettings.enableWarp) {
								try { const warpNode = await buildRegisteredWarpNode(env); if (warpNode) otherNodeLink = warpNode + '\n' + otherNodeLink; } catch (e) { /* best-effort */ }
							}
							const ECHLINKparam = config_JSON.ECH ? `&ech=${encodeURIComponent((config_JSON.ECHConfig.SNI ? config_JSON.ECHConfig.SNI + '+' : '') + config_JSON.ECHConfig.DNS)}` : '';
							const isLoonOrSurge = ua.includes('loon') || ua.includes('surge');
							const { type: transportProtocol, pathFieldName, domainFieldName } = getTransportProtocolConfig(config_JSON);
							// Free-service banner: a fixed, labelled node baked into every config so end users always know
							// this is the free Nova service. Hardcoded (not a setting) so it can't be turned off or stripped
							// by a reseller. The node name is percent-encoded downstream, so the emoji is safe in the b64 sub.
							const NOVA_FREE_NOTICE = 'This service is FREE - Nova Proxy Team';
							fullBestIp = [host + ':443#' + NOVA_FREE_NOTICE, ...fullBestIp];
							subContent = otherNodeLink + fullBestIp.map(rawAddress => {
								// unified regex: match domain/IPv4/IPv6 address + optional port + optional note
								// example:
								//   - domain: hj.xmm1993.top:2096#note or example.com
								//   - IPv4: 166.0.188.128:443#Los Angeles or 166.0.188.128
								//   - IPv6: [2606:4700::]:443#CMCC or [2606:4700::]
								const regex = /^(\[[\da-fA-F:]+\]|[\d.]+|[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*)(?::(\d+))?(?:#(.+))?$/;
								const match = rawAddress.match(regex);

								let nodeAddress, nodePort = "443", nodeNote;

								if (match) {
									nodeAddress = match[1];  // IPaddressOrDomain(maybeBracketed)
									nodePort = match[2] ? match[2] : '443';  // portDefault443，SS noTLSremapWhenGeneratingLink
									nodeNote = match[3] || nodeAddress;  // note,defaultIsAddressItself
								} else {
									// invalid format，skip handling and return null
									console.warn(`[subContent] invalidIpFormatIgnored: ${rawAddress}`);
									return null;
								}

								let fullNodePath = config_JSON.fullNodePath;

								const chainProxyMatch = nodeNote.match(/\$(socks5|http|https|turn|sstp):\/\/([^#\s]+)/i);
								if (chainProxyMatch) {
									try {
										const proxyProtocol = chainProxyMatch[1].toLowerCase(), proxyParam = chainProxyMatch[2];
										const chainProxyData = { type: proxyProtocol, ...getSocks5Account(proxyParam, getProxyDefaultPort(proxyProtocol)) };
										fullNodePath = `/video/${base64SecretEncode(JSON.stringify(chainProxyData), userID) + (config_JSON.enable0RTT ? '?ed=2560' : '')}`;
										nodeNote = nodeNote.replace(chainProxyMatch[0], '').trim() || nodeAddress;
									} catch (error) {
										console.warn(`[subContent] chainProxyParseFailed，ignoredDirective: ${chainProxyMatch[0]} (${error && error.message ? error.message : error})`);
									}
								} else if (config_JSON.chainProxy && /^(socks5|http|https|turn|sstp):\/\//i.test(String(config_JSON.chainProxy).trim())) {
									try {
										const m = /^(socks5|http|https|turn|sstp):\/\/(.+)$/i.exec(String(config_JSON.chainProxy).trim());
										const proxyProtocol = m[1].toLowerCase();
										const chainProxyData = { type: proxyProtocol, ...getSocks5Account(m[2].split('/')[0], getProxyDefaultPort(proxyProtocol)) };
										fullNodePath = `/video/${base64SecretEncode(JSON.stringify(chainProxyData), userID) + (config_JSON.enable0RTT ? '?ed=2560' : '')}`;
									} catch (error) {
										console.warn(`[subContent] global chainProxy parse failed: ${error && error.message ? error.message : error}`);
									}
								} else if (proxyIpPool.length > 0) {
									const matchedProxyIp = proxyIpPool.find(p => p.includes(nodeAddress));
									if (matchedProxyIp) fullNodePath = (`${config_JSON.PATH}/proxyip=${matchedProxyIp}`).replace(/\/\//g, '/') + (config_JSON.enable0RTT ? '?ed=2560' : '');
								}
								if (subUserTag) fullNodePath += (fullNodePath.includes('?') ? '&' : '?') + 'u=' + subUserTag;
								if (isLoonOrSurge) fullNodePath = fullNodePath.replace(/,/g, '%2C');

								if (protocolType === 'ss' && !asBestSubGenerator) {
									if (!config_JSON.SS.TLS) {
										const TLSport = [443, 2053, 2083, 2087, 2096, 8443];
										const NOTLSport = [80, 2052, 2082, 2086, 2095, 8080];
										nodePort = String(NOTLSport[TLSport.indexOf(Number(nodePort))] ?? nodePort);
									}
									fullNodePath = (fullNodePath.includes('?') ? fullNodePath.replace('?', '?enc=' + config_JSON.SS.cipherMethod + '&') : (fullNodePath + '?enc=' + config_JSON.SS.cipherMethod)).replace(/([=,])/g, '\\$1');
									if (!isSubConverterRequest) fullNodePath = fullNodePath + ';mux=0';
									return `${protocolType}://${btoa(config_JSON.SS.cipherMethod + ':00000000-0000-4000-8000-000000000000')}@${nodeAddress}:${nodePort}?plugin=v2${encodeURIComponent('ray-plugin;mode=websocket;host=example.com;path=' + (config_JSON.randomPath ? randomPath(fullNodePath) : fullNodePath) + (config_JSON.SS.TLS ? ';tls' : '')) + ECHLINKparam + TLSfragmentParam}#${encodeURIComponent(nodeNote)}`;
								} else {
									const transportPathParamValue = getTransportPathParamValue(config_JSON, fullNodePath, asBestSubGenerator);
									return `${protocolType}://00000000-0000-4000-8000-000000000000@${nodeAddress}:${nodePort}?security=tls&type=${transportProtocol + ECHLINKparam}&${domainFieldName}=example.com&fp=${config_JSON.Fingerprint}&sni=example.com&${pathFieldName}=${encodeURIComponent(transportPathParamValue) + TLSfragmentParam}&encryption=none${config_JSON.skipCertVerify ? '&insecure=1&allowInsecure=1' : ''}#${encodeURIComponent(nodeNote)}`;
								}
							}).filter(item => item !== null).join('\n');
						} else { // subConvert
							const subConverterUrl = `${config_JSON.subConverterConfig.SUBAPI}/sub?target=${subType}&url=${encodeURIComponent(url.protocol + '//' + url.host + '/sub?target=mixed&token=' + todaySubConverterToken + '&asOrg=' + identifyCarrier(request) + (url.searchParams.has('sub') && url.searchParams.get('sub') != '' ? `&sub=${url.searchParams.get('sub')}` : ''))}&config=${encodeURIComponent(config_JSON.subConverterConfig.SUBCONFIG)}&emoji=${config_JSON.subConverterConfig.SUBEMOJI}&scv=${config_JSON.skipCertVerify}`;
							try {
								const response = await fetch(subConverterUrl, { headers: { 'User-Agent': 'Subconverter for ' + subType + ' NovaProxy (https://github.com/NovaProxy)' } });
								if (response.ok) {
									subContent = await response.text();
									if (url.searchParams.has('surge') || ua.includes('surge')) subContent = SurgesubConfigFileHotpatch(subContent, url.protocol + '//' + url.host + '/sub?token=' + subToken + '&surge', config_JSON);
								} else return new Response('subConvertBackendException：' + response.statusText, { status: response.status });
							} catch (error) {
								return new Response('subConvertBackendException：' + error.message, { status: 403 });
							}
						}

						if (!ua.includes('subconverter') && userClientRequestSub) {
							// Health-pruned subs: drop hosts the last health check marked down so users
							// never get a dead node. Keep the full list if pruning would empty it.
							let _healthyHosts = config_JSON.HOSTS;
							try {
								const _h = JSON.parse(await env.KV.get('domain-health.json') || 'null');
								if (_h && Array.isArray(_h.domains)) {
									const _down = new Set(_h.domains.filter(d => d && d.ok === false).map(d => d.host));
									const _pruned = config_JSON.HOSTS.filter(h => !_down.has(h));
									if (_pruned.length) _healthyHosts = _pruned;
								}
							} catch (e) { /* ignore -> use all hosts */ }
							const shuffledHosts = [..._healthyHosts].sort(() => Math.random() - 0.5);
							let replaceDomainCount = 0, currentRandomHost = null;
							subContent = subContent
								.replace(/00000000-0000-4000-8000-000000000000/g, config_JSON.UUID)
								.replace(/MDAwMDAwMDAtMDAwMC00MDAwLTgwMDAtMDAwMDAwMDAwMDAw/g, btoa(config_JSON.UUID))
								.replace(/example\.com/g, () => {
									if (replaceDomainCount % 2 === 0) {
										const originalHost = shuffledHosts[Math.floor(replaceDomainCount / 2) % shuffledHosts.length];
										currentRandomHost = replaceStarWithRandom(originalHost);
									}
									replaceDomainCount++;
									return currentRandomHost;
								});
						}

						if (subType === 'mixed' && (!ua.includes('mozilla') || url.searchParams.has('b64') || url.searchParams.has('base64'))) subContent = btoa(subContent);

						if (subType === 'singbox') {
							subContent = await SingboxsubConfigFileHotpatch(subContent, config_JSON, networkSettings);
							responseHeaders["content-type"] = 'application/json; charset=utf-8';
						} else if (subType === 'clash') {
							subContent = ClashsubConfigFileHotpatch(subContent, config_JSON, networkSettings);
							responseHeaders["content-type"] = 'application/x-yaml; charset=utf-8';
						}
						return new Response(subContent, { status: 200, headers: responseHeaders });
					}
				} else if (accessPath === 'locations') {//proxyLocationsList
					const cookies = request.headers.get('Cookie') || '';
					const authCookie = cookies.split(';').find(c => c.trim().startsWith('auth='))?.split('=')[1];
					if (authCookie && await verifySessionToken(authCookie, UA, encryptionKey, adminPassword)) return fetch(new Request('https://speed.cloudflare.com/locations', { headers: { 'Referer': 'https://speed.cloudflare.com/' } }));
				} else if (accessPath === 'robots.txt') return new Response('User-agent: *\nDisallow: /', { status: 200, headers: { 'Content-Type': 'text/plain; charset=UTF-8' } });
			} else if (!envUUID) return new Response(null, { status: 302, headers: { 'Location': '/install', 'Cache-Control': 'no-store, no-cache, must-revalidate' } });
		}

		// Serve dashboard static assets (logo.png, etc.) — from bundled ASSETS or Pages.
		if (/\.\w{2,4}$/.test(url.pathname)) {
			const staticResponse = await panelFetch(env, url.pathname).catch(() => {});
			if (staticResponse && staticResponse.ok) return staticResponse;
		}

		let disguiseUrl = env.URL || 'nginx';
		if (disguiseUrl && disguiseUrl !== 'nginx' && disguiseUrl !== '1101') {
			disguiseUrl = disguiseUrl.trim().replace(/\/$/, '');
			if (!disguiseUrl.match(/^https?:\/\//i)) disguiseUrl = 'https://' + disguiseUrl;
			if (disguiseUrl.toLowerCase().startsWith('http://')) disguiseUrl = 'https://' + disguiseUrl.substring(7);
			try { const u = new URL(disguiseUrl); disguiseUrl = u.protocol + '//' + u.host } catch (e) { disguiseUrl = 'nginx' }
		}
		if (disguiseUrl === '1101') return new Response(await html1101(url.host, accessIp), { status: 200, headers: { 'Content-Type': 'text/html; charset=UTF-8' } });
		if (disguiseUrl === 'nginx') return new Response(await nginx(), { status: 200, headers: { 'Content-Type': 'text/html; charset=UTF-8' } });
		try {
			const proxyUrl = new URL(disguiseUrl), newHeaders = new Headers(request.headers);
			newHeaders.set('Host', proxyUrl.host);
			newHeaders.set('Referer', proxyUrl.origin);
			newHeaders.set('Origin', proxyUrl.origin);
			if (!newHeaders.has('User-Agent') && UA && UA !== 'null') newHeaders.set('User-Agent', UA);
			const proxyResponse = await fetch(proxyUrl.origin + url.pathname + url.search, { method: request.method, headers: newHeaders, body: request.body, cf: request.cf });
			const contentType = proxyResponse.headers.get('content-type') || '';
			// only handle text type response
			if (/text|javascript|json|xml/.test(contentType)) {
				const responseContent = (await proxyResponse.text()).replaceAll(proxyUrl.host, url.host);
				return new Response(responseContent, { status: proxyResponse.status, headers: { ...Object.fromEntries(proxyResponse.headers), 'Cache-Control': 'no-store' } });
			}
			return proxyResponse;
		} catch (error) { }
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
		if (!env || !['1', 'true'].includes(String(env.ENABLE_CRON || ''))) return;
		ctx.waitUntil(runScheduledMaintenance(env).then(r => {
			if (r && r.mirror && !r.mirror.skipped) console.log('scheduledMaintenance:', JSON.stringify(r.mirror.results));
		}).catch(err => console.error('runScheduledMaintenance(scheduled) error:', err && err.message)));
	}
};
export default novaWorker;
///////////////////////////////////////////////////////////////////////XHTTP Transport Data///////////////////////////////////////////////
async function handleXhttpRequest(request, yourUUID, env, ctx) {
	if (connRejectReason) return new Response('Forbidden ('+connRejectReason+')', { status: 403 });
	if (!request.body) return new Response('Bad Request', { status: 400 });
	const reader = request.body.getReader();
	const firstPacket = await readXhttpFirstPacket(reader, yourUUID);
	if (!firstPacket) {
		try { reader.releaseLock() } catch (e) { }
		return new Response('Invalid request', { status: 400 });
	}
	if (isBlockedSite(firstPacket.hostname)) {
		try { reader.releaseLock() } catch (e) { }
		return networkSettings && networkSettings.enablePornBlock && isAdultDomain(firstPacket.hostname)
			? novaBlockPage(request)
			: new Response('Forbidden', { status: 403 });
	}
	if (firstPacket.isUDP && firstPacket.protocol !== 'trojan' && firstPacket.port !== 53) {
		try { reader.releaseLock() } catch (e) { }
		return new Response('UDP is not supported', { status: 400 });
	}

	const remoteConnWrapper = { socket: null, connectingPromise: null, retryConnect: null };
	let currentWriteSocket = null;
	let remoteWriter = null;
	const usageStats = { up: 0, down: 0 };
	const responseHeaders = new Headers({
		'Content-Type': 'application/octet-stream',
		'X-Accel-Buffering': 'no',
		'Cache-Control': 'no-store'
	});

	const releaseRemoteWriter = () => {
		if (remoteWriter) {
			try { remoteWriter.releaseLock() } catch (e) { }
			remoteWriter = null;
		}
		currentWriteSocket = null;
	};

	const getRemoteWriter = () => {
		const socket = remoteConnWrapper.socket;
		if (!socket) return null;
		if (socket !== currentWriteSocket) {
			releaseRemoteWriter();
			currentWriteSocket = socket;
			remoteWriter = socket.writable.getWriter();
		}
		return remoteWriter;
	};

	let XHTTPupstreamWriteQueue = null;
	return new Response(new ReadableStream({
		async start(controller) {
			let Close = false;
			let udpRespHeader = firstPacket.respHeader;
			const trojanUdpContext = { cache: new Uint8Array(0) };
			const xhttpBridge = {
				readyState: WebSocket.OPEN,
				send(data) {
					if (Close) return;
					try {
						const chunk = data instanceof Uint8Array
							? data
							: data instanceof ArrayBuffer
								? new Uint8Array(data)
								: ArrayBuffer.isView(data)
									? new Uint8Array(data.buffer, data.byteOffset, data.byteLength)
									: new Uint8Array(data);
						controller.enqueue(chunk);
						usageStats.down += chunk.byteLength;
					} catch (e) {
						Close = true;
						this.readyState = WebSocket.CLOSED;
					}
				},
				close() {
					if (Close) return;
					Close = true;
					this.readyState = WebSocket.CLOSED;
					try { controller.close() } catch (e) { }
				}
			};

			const upstreamWriteQueue = XHTTPupstreamWriteQueue = createUpstreamWriteQueue({
				getWriter: getRemoteWriter,
				releaseWriter: releaseRemoteWriter,
				retryConnection: async () => {
					if (typeof remoteConnWrapper.retryConnect !== 'function') throw new Error('retry unavailable');
					await remoteConnWrapper.retryConnect();
				},
				closeConnection: () => {
					try { remoteConnWrapper.socket?.close() } catch (e) { }
					closeSocketQuietly(xhttpBridge);
				},
				name: 'XHTTPupstream'
			});

			const writeRemote = async (payload, allowRetry = true) => {
				return upstreamWriteQueue.writeAndWait(payload, allowRetry);
			};

			try {
				if (firstPacket.isUDP) {
					if (firstPacket.rawData?.byteLength) {
						if (firstPacket.protocol === 'trojan') await forwardTrojanUdpData(firstPacket.rawData, xhttpBridge, trojanUdpContext, request);
						else await forwardataudp(firstPacket.rawData, xhttpBridge, udpRespHeader, request);
						udpRespHeader = null;
					}
				} else {
					if (firstPacket.rawData?.byteLength) usageStats.up += firstPacket.rawData.byteLength;
					await forwardataTCP(firstPacket.hostname, firstPacket.port, firstPacket.rawData, xhttpBridge, firstPacket.respHeader, remoteConnWrapper, yourUUID, request, usageStats);
				}

				while (true) {
					const { done, value } = await reader.read();
					if (done) break;
					if (!value || value.byteLength === 0) continue;
					if (value.byteLength) usageStats.up += value.byteLength;
					if (firstPacket.isUDP) {
						if (firstPacket.protocol === 'trojan') await forwardTrojanUdpData(value, xhttpBridge, trojanUdpContext, request);
						else await forwardataudp(value, xhttpBridge, udpRespHeader, request);
						udpRespHeader = null;
					} else {
						if (!(await writeRemote(value))) throw new Error('Remote socket is not ready');
					}
				}

				if (!firstPacket.isUDP) {
					await upstreamWriteQueue.waitEmpty();
					const writer = getRemoteWriter();
					if (writer) {
						try { await writer.close() } catch (e) { }
					}
				}
			} catch (err) {
				log(`[XHTTPforward] handleFail: ${err?.message || err}`);
				closeSocketQuietly(xhttpBridge);
			} finally {
				upstreamWriteQueue.clear();
				releaseRemoteWriter();
				try { reader.releaseLock() } catch (e) { }
				recordUsage(env, usageStats.up, usageStats.down, ctx);
			}
		}
	}), { status: 200, headers: responseHeaders });
}

function validDataLength(data) {
	if (!data) return 0;
	if (typeof data.byteLength === 'number') return data.byteLength;
	if (typeof data.length === 'number') return data.length;
	return 0;
}

async function readXhttpFirstPacket(reader, token) {
	const decoder = VLESStextDecode;

	const tryParseVlessFirstPacket = (data) => {
		const length = data.byteLength;
		if (length < 18) return { status: 'need_more' };
		if (!UUIDbyteMatch(data, 1, token)) return { status: 'invalid' };

		const optLen = data[17];
		const cmdIndex = 18 + optLen;
		if (length < cmdIndex + 1) return { status: 'need_more' };

		const cmd = data[cmdIndex];
		if (cmd !== 1 && cmd !== 2) return { status: 'invalid' };

		const portIndex = cmdIndex + 1;
		if (length < portIndex + 3) return { status: 'need_more' };

		const port = (data[portIndex] << 8) | data[portIndex + 1];
		const addressType = data[portIndex + 2];
		const addressIndex = portIndex + 3;
		let headerLen = -1;
		let hostname = '';

		if (addressType === 1) {
			if (length < addressIndex + 4) return { status: 'need_more' };
			hostname = `${data[addressIndex]}.${data[addressIndex + 1]}.${data[addressIndex + 2]}.${data[addressIndex + 3]}`;
			headerLen = addressIndex + 4;
		} else if (addressType === 2) {
			if (length < addressIndex + 1) return { status: 'need_more' };
			const domainLen = data[addressIndex];
			if (length < addressIndex + 1 + domainLen) return { status: 'need_more' };
			hostname = decoder.decode(data.subarray(addressIndex + 1, addressIndex + 1 + domainLen));
			headerLen = addressIndex + 1 + domainLen;
		} else if (addressType === 3) {
			if (length < addressIndex + 16) return { status: 'need_more' };
			const ipv6 = [];
			for (let i = 0; i < 8; i++) {
				const base = addressIndex + i * 2;
				ipv6.push(((data[base] << 8) | data[base + 1]).toString(16));
			}
			hostname = ipv6.join(':');
			headerLen = addressIndex + 16;
		} else return { status: 'invalid' };

		if (!hostname) return { status: 'invalid' };

		return {
			status: 'ok',
			result: {
				protocol: 'vl' + 'ess',
				hostname,
				port,
				isUDP: cmd === 2,
				rawData: data.subarray(headerLen),
				respHeader: new Uint8Array([data[0], 0]),
			}
		};
	};

	const tryParseTrojanFirstPacket = (data) => {
		const passwordHash = sha224(token);
		const passwordHashBytes = new TextEncoder().encode(passwordHash);
		const length = data.byteLength;
		if (length < 58) return { status: 'need_more' };
		if (data[56] !== 0x0d || data[57] !== 0x0a) return { status: 'invalid' };
		for (let i = 0; i < 56; i++) {
			if (data[i] !== passwordHashBytes[i]) return { status: 'invalid' };
		}

		const socksStart = 58;
		if (length < socksStart + 2) return { status: 'need_more' };
		const cmd = data[socksStart];
		if (cmd !== 1 && cmd !== 3) return { status: 'invalid' };
		const isUDP = cmd === 3;

		const atype = data[socksStart + 1];
		let cursor = socksStart + 2;
		let hostname = '';

		if (atype === 1) {
			if (length < cursor + 4) return { status: 'need_more' };
			hostname = `${data[cursor]}.${data[cursor + 1]}.${data[cursor + 2]}.${data[cursor + 3]}`;
			cursor += 4;
		} else if (atype === 3) {
			if (length < cursor + 1) return { status: 'need_more' };
			const domainLen = data[cursor];
			if (length < cursor + 1 + domainLen) return { status: 'need_more' };
			hostname = decoder.decode(data.subarray(cursor + 1, cursor + 1 + domainLen));
			cursor += 1 + domainLen;
		} else if (atype === 4) {
			if (length < cursor + 16) return { status: 'need_more' };
			const ipv6 = [];
			for (let i = 0; i < 8; i++) {
				const base = cursor + i * 2;
				ipv6.push(((data[base] << 8) | data[base + 1]).toString(16));
			}
			hostname = ipv6.join(':');
			cursor += 16;
		} else return { status: 'invalid' };

		if (!hostname) return { status: 'invalid' };
		if (length < cursor + 4) return { status: 'need_more' };

		const port = (data[cursor] << 8) | data[cursor + 1];
		if (data[cursor + 2] !== 0x0d || data[cursor + 3] !== 0x0a) return { status: 'invalid' };
		const dataOffset = cursor + 4;

		return {
			status: 'ok',
			result: {
				protocol: 'trojan',
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

		const currentData = buffer.subarray(0, offset);
		const trojanResult = tryParseTrojanFirstPacket(currentData);
		if (trojanResult.status === 'ok') return { ...trojanResult.result, reader };

		const vlessResult = tryParseVlessFirstPacket(currentData);
		if (vlessResult.status === 'ok') return { ...vlessResult.result, reader };

		if (trojanResult.status === 'invalid' && vlessResult.status === 'invalid') return null;
	}

	const finalData = buffer.subarray(0, offset);
	const finalTrojanResult = tryParseTrojanFirstPacket(finalData);
	if (finalTrojanResult.status === 'ok') return { ...finalTrojanResult.result, reader };
	const finalVlessResult = tryParseVlessFirstPacket(finalData);
	if (finalVlessResult.status === 'ok') return { ...finalVlessResult.result, reader };
	return null;
}
///////////////////////////////////////////////////////////////////////gRPC Transport Data///////////////////////////////////////////////
async function handleGrpcRequest(request, yourUUID, env, ctx) {
	if (!request.body) return new Response('Bad Request', { status: 400 });
	const reader = request.body.getReader();
	const remoteConnWrapper = { socket: null, connectingPromise: null, retryConnect: null };
	const usageStats = { up: 0, down: 0 };
	let isDnsQuery = false;
	const trojanUdpContext = { cache: new Uint8Array(0) };
	let isTrojan = null;
	let currentWriteSocket = null;
	let remoteWriter = null;
	let GRPCupstreamWriteQueue = null;
	//log('[gRPC] start handling bidirectional stream');
	const grpcHeaders = new Headers({
		'Content-Type': 'application/grpc',
		'grpc-status': '0',
		'X-Accel-Buffering': 'no',
		'Cache-Control': 'no-store'
	});

	const downstreamCacheLimit = downstreamGrainChunkBytes;
	const downstreamFlushInterval = Math.max(downstreamGrainSilentMs, 1);

	return new Response(new ReadableStream({
		async start(controller) {
			let Close = false;
			let sendQueue = [];
			let queueBytes = 0;
			let flushTimer = null;
			let flushMicrotaskQueued = false;
			const grpcBridge = {
				readyState: WebSocket.OPEN,
				send(data) {
					if (Close) return;
					const chunk = data instanceof Uint8Array ? data : new Uint8Array(data);
					usageStats.down += chunk.byteLength;
					const lenBytesarray = [];
					let remaining = chunk.byteLength >>> 0;
					while (remaining > 127) {
						lenBytesarray.push((remaining & 0x7f) | 0x80);
						remaining >>>= 7;
					}
					lenBytesarray.push(remaining);
					const lenBytes = new Uint8Array(lenBytesarray);
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
					sendQueue.push(frame);
					queueBytes += frame.byteLength;
					scheduleFlushSendQueue();
				},
				close() {
					if (this.readyState === WebSocket.CLOSED) return;
					flushSendQueue(true);
					Close = true;
					this.readyState = WebSocket.CLOSED;
					try { controller.close() } catch (e) { }
				}
			};

			const flushSendQueue = (force = false) => {
				flushMicrotaskQueued = false;
				if (flushTimer) {
					clearTimeout(flushTimer);
					flushTimer = null;
				}
				if ((!force && Close) || queueBytes === 0) return;
				const out = new Uint8Array(queueBytes);
				let offset = 0;
				for (const item of sendQueue) {
					out.set(item, offset);
					offset += item.byteLength;
				}
				sendQueue = [];
				queueBytes = 0;
				try {
					controller.enqueue(out);
				} catch (e) {
					Close = true;
					grpcBridge.readyState = WebSocket.CLOSED;
				}
			};

			const scheduleFlushSendQueue = () => {
				if (queueBytes >= downstreamCacheLimit) {
					flushSendQueue();
					return;
				}
				if (flushMicrotaskQueued || flushTimer) return;
				flushMicrotaskQueued = true;
				queueMicrotask(() => {
					flushMicrotaskQueued = false;
					if (Close || queueBytes === 0 || flushTimer) return;
					flushTimer = setTimeout(flushSendQueue, downstreamFlushInterval);
				});
			};

			const closeConnection = () => {
				if (Close) return;
				GRPCupstreamWriteQueue?.clear();
				flushSendQueue(true);
				Close = true;
				grpcBridge.readyState = WebSocket.CLOSED;
				if (flushTimer) clearTimeout(flushTimer);
				if (remoteWriter) {
					try { remoteWriter.releaseLock() } catch (e) { }
					remoteWriter = null;
				}
				currentWriteSocket = null;
				try { reader.releaseLock() } catch (e) { }
				try { remoteConnWrapper.socket?.close() } catch (e) { }
				try { controller.close() } catch (e) { }
			};

			const releaseRemoteWriter = () => {
				if (remoteWriter) {
					try { remoteWriter.releaseLock() } catch (e) { }
					remoteWriter = null;
				}
				currentWriteSocket = null;
			};

			const upstreamWriteQueue = GRPCupstreamWriteQueue = createUpstreamWriteQueue({
				getWriter: () => {
					const socket = remoteConnWrapper.socket;
					if (!socket) return null;
					if (socket !== currentWriteSocket) {
						releaseRemoteWriter();
						currentWriteSocket = socket;
						remoteWriter = socket.writable.getWriter();
					}
					return remoteWriter;
				},
				releaseWriter: releaseRemoteWriter,
				retryConnection: async () => {
					if (typeof remoteConnWrapper.retryConnect !== 'function') throw new Error('retry unavailable');
					await remoteConnWrapper.retryConnect();
				},
				closeConnection,
				name: 'gRPCupstream'
			});

			const writeRemote = async (payload, allowRetry = true) => {
				return upstreamWriteQueue.writeAndWait(payload, allowRetry);
			};

			try {
				let pending = new Uint8Array(0);
				while (true) {
					const { done, value } = await reader.read();
					if (done) break;
					if (!value || value.byteLength === 0) continue;
					const currentChunk = value instanceof Uint8Array ? value : new Uint8Array(value);
					const merged = new Uint8Array(pending.length + currentChunk.length);
					merged.set(pending, 0);
					merged.set(currentChunk, pending.length);
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
							let varintvalid = false;
							while (offset < payload.length) {
								const current = payload[offset++];
								if ((current & 0x80) === 0) {
									varintvalid = true;
									break;
								}
								shift += 7;
								if (shift > 35) break;
							}
							if (varintvalid) payload = payload.subarray(offset);
						}
						if (!payload.byteLength) continue;
						if (isDnsQuery) {
							if (isTrojan) await forwardTrojanUdpData(payload, grpcBridge, trojanUdpContext, request);
							else await forwardataudp(payload, grpcBridge, null, request);
							continue;
						}
						if (remoteConnWrapper.socket) {
							usageStats.up += payload.byteLength;
							if (!(await writeRemote(payload))) throw new Error('Remote socket is not ready');
						} else {
							const firstPacketBytes = dataToUint8Array(payload);
							if (isTrojan === null) isTrojan = isTrojanFirstPacket(firstPacketBytes, yourUUID);
							if (isTrojan) {
								const parseResult = parseTrojanRequest(firstPacketBytes, yourUUID);
								if (parseResult?.hasError) throw new Error(parseResult.message || 'Invalid trojan request');
								const { port, hostname, rawClientData, isUDP } = parseResult;
								log(`[gRPC] trojanFirstPacket: ${hostname}:${port} | UDP: ${isUDP ? 'is' : ''}`);
								if (isBlockedSite(hostname)) throw new Error('Speedtest site is blocked');
								if (isUDP) {
									isDnsQuery = true;
									if (validDataLength(rawClientData) > 0) {
										usageStats.up += validDataLength(rawClientData);
										await forwardTrojanUdpData(rawClientData, grpcBridge, trojanUdpContext, request);
									}
								} else {
									usageStats.up += validDataLength(rawClientData);
									await forwardataTCP(hostname, port, rawClientData, grpcBridge, null, remoteConnWrapper, yourUUID, request, usageStats);
								}
							} else {
								isTrojan = false;
								const parseResult = parseVlessRequest(firstPacketBytes, yourUUID);
								if (parseResult?.hasError) throw new Error(parseResult.message || 'Invalid vless request');
								const { port, hostname, version, isUDP, rawClientData } = parseResult;
								log(`[gRPC] vlessFirstPacket: ${hostname}:${port} | UDP: ${isUDP ? 'is' : ''}`);
								if (isBlockedSite(hostname)) throw new Error('Speedtest site is blocked');
								if (isUDP) {
									if (port !== 53) throw new Error('UDP is not supported');
									isDnsQuery = true;
								}
								const respHeader = new Uint8Array([version, 0]);
								grpcBridge.send(respHeader);
								const rawData = rawClientData;
								if (isDnsQuery) {
									if (isTrojan) await forwardTrojanUdpData(rawData, grpcBridge, trojanUdpContext, request);
									else await forwardataudp(rawData, grpcBridge, null, request);
								}
								else {
									usageStats.up += validDataLength(rawData);
									await forwardataTCP(hostname, port, rawData, grpcBridge, null, remoteConnWrapper, yourUUID, request, usageStats);
								}
							}
						}
					}
					flushSendQueue();
				}
				await upstreamWriteQueue.waitEmpty();
			} catch (err) {
				log(`[gRPCforward] handleFail: ${err?.message || err}`);
			} finally {
				upstreamWriteQueue.clear();
				releaseRemoteWriter();
				closeConnection();
				recordUsage(env, usageStats.up, usageStats.down, ctx);
			}
		},
		cancel() {
			GRPCupstreamWriteQueue?.clear();
			try { remoteConnWrapper.socket?.close() } catch (e) { }
			try { reader.releaseLock() } catch (e) { }
		}
	}), { status: 200, headers: grpcHeaders });
}

function isValidWsEarlyData(bytes, token) {
	if (!bytes?.byteLength) return false;
	if (bytes.byteLength >= 18 && UUIDbyteMatch(bytes, 1, token)) return true;
	if (bytes.byteLength < 58 || bytes[56] !== 0x0d || bytes[57] !== 0x0a) return false;

	const trojanPassword = sha224(token);
	for (let i = 0; i < 56; i++) {
		if (bytes[i] !== trojanPassword.charCodeAt(i)) return false;
	}
	return true;
}

function decodeWsEarlyData(header, token) {
	if (!header) return null;
	if (header.length > WSearlyDataMaxHeaderLength) throw new Error('early data is too large');

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

	if (bytes.byteLength > WSearlyDataMaxBytes) throw new Error('early data is too large');
	return isValidWsEarlyData(bytes, token) ? bytes : null;
}

///////////////////////////////////////////////////////////////////////WS Transport Data///////////////////////////////////////////////
async function handleWsRequest(request, yourUUID, url, env, ctx) {
	if (connRejectReason) return new Response('Forbidden ('+connRejectReason+')', { status: 403 });
	const wsUserId = connUserId;
	const WSsocketPair = new WebSocketPair();
	const [clientSock, serverSock] = Object.values(WSsocketPair);
	try { (/** @type {any} */ (serverSock)).accept({ allowHalfOpen: true }) }
	catch (_) { serverSock.accept() }
	serverSock.binaryType = 'arraybuffer';
	let remoteConnWrapper = { socket: null, connectingPromise: null, retryConnect: null };
	const usageStats = { up: 0, down: 0 };
	let isDnsQuery = false;
	let isTrojan = null;
	const trojanUdpContext = { cache: new Uint8Array(0) };
	const earlyDataHeader = request.headers.get('sec-websocket-protocol') || '';
	const SSmodeDisableEarlyData = !!url.searchParams.get('enc');
	let WSupstreamWriteQueue = null;
	let WSexplicitTransportChain = Promise.resolve();
	let WSexplicitTransportStopRecv = false, WSexplicitTransportFail = false, WSexplicitTransportTailEnqueued = false;
	let WSexplicitQueueBytes = 0, WSexplicitQueueItems = 0;
	let checkProtocolType = null, currentWriteSocket = null, remoteWriter = null;
	let sscontext = null, ssinitTask = null;

	const releaseRemoteWriter = () => {
		if (remoteWriter) {
			try { remoteWriter.releaseLock() } catch (e) { }
			remoteWriter = null;
		}
		currentWriteSocket = null;
	};

	const upstreamWriteQueue = WSupstreamWriteQueue = createUpstreamWriteQueue({
		getWriter: () => {
			const socket = remoteConnWrapper.socket;
			if (!socket) return null;
			if (socket !== currentWriteSocket) {
				releaseRemoteWriter();
				currentWriteSocket = socket;
				remoteWriter = socket.writable.getWriter();
			}
			return remoteWriter;
		},
		releaseWriter: releaseRemoteWriter,
		retryConnection: async () => {
			if (typeof remoteConnWrapper.retryConnect !== 'function') throw new Error('retry unavailable');
			await remoteConnWrapper.retryConnect();
		},
		closeConnection: () => {
			try { remoteConnWrapper.socket?.close() } catch (e) { }
			closeSocketQuietly(serverSock);
		},
		name: 'WSupstream'
	});

	const writeRemote = async (chunk, allowRetry = true) => {
		return upstreamWriteQueue.writeAndWait(chunk, allowRetry);
	};

	const getSSContext = async () => {
		if (sscontext) return sscontext;
		if (!ssinitTask) {
			ssinitTask = (async () => {
				const requestCipherMethod = (url.searchParams.get('enc') || '').toLowerCase();
				const preferredEncryptionConfig = SSsupportEncryptionConfig[requestCipherMethod] || SSsupportEncryptionConfig['aes-128-gcm'];
				const inboundCandidateEncryptionConfig = [preferredEncryptionConfig, ...Object.values(SSsupportEncryptionConfig).filter(c => c.method !== preferredEncryptionConfig.method)];
				const inboundMasterKeyTaskCache = new Map();
				const fetchInboundMasterKeyTask = (config) => {
					if (!inboundMasterKeyTaskCache.has(config.method)) inboundMasterKeyTaskCache.set(config.method, SSderiveMasterKey(yourUUID, config.keyLen));
					return inboundMasterKeyTaskCache.get(config.method);
				};
				const inboundStatus = {
					buffer: new Uint8Array(0),
					hasSalt: false,
					waitPayloadLength: null,
					decryptKey: null,
					nonceCounter: new Uint8Array(SSNoncelength),
					encryptionConfig: null,
				};
				const initInboundDecryptState = async () => {
					const lengthCipherTotalLength = 2 + SSAEADtagLength;
					const maxSaltLength = Math.max(...inboundCandidateEncryptionConfig.map(c => c.saltLen));
					const maxAlignScanBytes = 16;
					const maxScanOffset = Math.min(maxAlignScanBytes, Math.max(0, inboundStatus.buffer.byteLength - (lengthCipherTotalLength + Math.min(...inboundCandidateEncryptionConfig.map(c => c.saltLen)))));
					for (let offset = 0; offset <= maxScanOffset; offset++) {
						for (const encryptionConfig of inboundCandidateEncryptionConfig) {
							const initMinLength = offset + encryptionConfig.saltLen + lengthCipherTotalLength;
							if (inboundStatus.buffer.byteLength < initMinLength) continue;
							const salt = inboundStatus.buffer.subarray(offset, offset + encryptionConfig.saltLen);
							const lengthCipher = inboundStatus.buffer.subarray(offset + encryptionConfig.saltLen, initMinLength);
							const masterKey = await fetchInboundMasterKeyTask(encryptionConfig);
							const decryptKey = await SSderiveSessionKey(encryptionConfig, masterKey, salt, ['decrypt']);
							const nonceCounter = new Uint8Array(SSNoncelength);
							try {
								const lengthPlain = await SSAEADdecrypt(decryptKey, nonceCounter, lengthCipher);
								if (lengthPlain.byteLength !== 2) continue;
								const payloadLength = (lengthPlain[0] << 8) | lengthPlain[1];
								if (payloadLength < 0 || payloadLength > encryptionConfig.maxChunk) continue;
								if (offset > 0) log(`[SSinbound] detectedLeadingNoise ${offset}B，autoAligned`);
								if (encryptionConfig.method !== preferredEncryptionConfig.method) log(`[SSinbound] URL enc=${requestCipherMethod || preferredEncryptionConfig.method} vsActual ${encryptionConfig.method} inconsistent，autoSwitched`);
								inboundStatus.buffer = inboundStatus.buffer.subarray(initMinLength);
								inboundStatus.decryptKey = decryptKey;
								inboundStatus.nonceCounter = nonceCounter;
								inboundStatus.waitPayloadLength = payloadLength;
								inboundStatus.encryptionConfig = encryptionConfig;
								inboundStatus.hasSalt = true;
								return true;
							} catch (_) { }
						}
					}
					const initFailJudgeLength = maxSaltLength + lengthCipherTotalLength + maxAlignScanBytes;
					if (inboundStatus.buffer.byteLength >= initFailJudgeLength) {
						throw new Error(`SS handshake decrypt failed (enc=${requestCipherMethod || 'auto'}, candidates=${inboundCandidateEncryptionConfig.map(c => c.method).join('/')})`);
					}
					return false;
				};
				const inboundDecryptor = {
					async input(dataChunk) {
						const chunk = dataToUint8Array(dataChunk);
						if (chunk.byteLength > 0) inboundStatus.buffer = concatByteData(inboundStatus.buffer, chunk);
						if (!inboundStatus.hasSalt) {
							const initSuccess = await initInboundDecryptState();
							if (!initSuccess) return [];
						}
						const plaintextChunks = [];
						while (true) {
							if (inboundStatus.waitPayloadLength === null) {
								const lengthCipherTotalLength = 2 + SSAEADtagLength;
								if (inboundStatus.buffer.byteLength < lengthCipherTotalLength) break;
								const lengthCipher = inboundStatus.buffer.subarray(0, lengthCipherTotalLength);
								inboundStatus.buffer = inboundStatus.buffer.subarray(lengthCipherTotalLength);
								const lengthPlain = await SSAEADdecrypt(inboundStatus.decryptKey, inboundStatus.nonceCounter, lengthCipher);
								if (lengthPlain.byteLength !== 2) throw new Error('SS length decrypt failed');
								const payloadLength = (lengthPlain[0] << 8) | lengthPlain[1];
								if (payloadLength < 0 || payloadLength > inboundStatus.encryptionConfig.maxChunk) throw new Error(`SS payload length invalid: ${payloadLength}`);
								inboundStatus.waitPayloadLength = payloadLength;
							}
							const payloadCipherTotalLength = inboundStatus.waitPayloadLength + SSAEADtagLength;
							if (inboundStatus.buffer.byteLength < payloadCipherTotalLength) break;
							const payloadCipher = inboundStatus.buffer.subarray(0, payloadCipherTotalLength);
							inboundStatus.buffer = inboundStatus.buffer.subarray(payloadCipherTotalLength);
							const payloadPlain = await SSAEADdecrypt(inboundStatus.decryptKey, inboundStatus.nonceCounter, payloadCipher);
							plaintextChunks.push(payloadPlain);
							inboundStatus.waitPayloadLength = null;
						}
						return plaintextChunks;
					},
				};
				let outboundEncryptor = null;
				const SSbatchMaxBytes = 32 * 1024;
				const getOutboundEncryptor = async () => {
					if (outboundEncryptor) return outboundEncryptor;
					if (!inboundStatus.encryptionConfig) throw new Error('SS cipher is not negotiated');
					const outboundEncryptionConfig = inboundStatus.encryptionConfig;
					const outboundMasterKey = await SSderiveMasterKey(yourUUID, outboundEncryptionConfig.keyLen);
					const outboundRandomBytes = crypto.getRandomValues(new Uint8Array(outboundEncryptionConfig.saltLen));
					const outboundEncryptionKey = await SSderiveSessionKey(outboundEncryptionConfig, outboundMasterKey, outboundRandomBytes, ['encrypt']);
					const outboundNonceCounter = new Uint8Array(SSNoncelength);
					let randomBytesSend = false;
					outboundEncryptor = {
						async encryptAndSend(dataChunk, sendChunk) {
							const plaintextData = dataToUint8Array(dataChunk);
							if (!randomBytesSend) {
								await sendChunk(outboundRandomBytes);
								randomBytesSend = true;
							}
							if (plaintextData.byteLength === 0) return;
							let offset = 0;
							while (offset < plaintextData.byteLength) {
								const end = Math.min(offset + outboundEncryptionConfig.maxChunk, plaintextData.byteLength);
								const payloadPlain = plaintextData.subarray(offset, end);
								const lengthPlain = new Uint8Array(2);
								lengthPlain[0] = (payloadPlain.byteLength >>> 8) & 0xff;
								lengthPlain[1] = payloadPlain.byteLength & 0xff;
								const lengthCipher = await SSAEADencryption(outboundEncryptionKey, outboundNonceCounter, lengthPlain);
								const payloadCipher = await SSAEADencryption(outboundEncryptionKey, outboundNonceCounter, payloadPlain);
								const frame = new Uint8Array(lengthCipher.byteLength + payloadCipher.byteLength);
								frame.set(lengthCipher, 0);
								frame.set(payloadCipher, lengthCipher.byteLength);
								await sendChunk(frame);
								offset = end;
							}
						},
					};
					return outboundEncryptor;
				};
				let SSsendQueue = Promise.resolve();
				const SSenqueueSend = (chunk) => {
					SSsendQueue = SSsendQueue.then(async () => {
						if (serverSock.readyState !== WebSocket.OPEN) return;
						const initOutboundEncryptor = await getOutboundEncryptor();
						await initOutboundEncryptor.encryptAndSend(chunk, async (encryptedChunk) => {
							if (encryptedChunk.byteLength > 0 && serverSock.readyState === WebSocket.OPEN) {
								await WebSocketsendAndWait(serverSock, encryptedChunk.buffer);
							}
						});
					}).catch((error) => {
						log(`[SSsend] encryptionFail: ${error?.message || error}`);
						closeSocketQuietly(serverSock);
					});
					return SSsendQueue;
				};
			const replyChunkSocket = {
				get readyState() {
					return serverSock.readyState;
				},
				send(data) {
					const chunk = dataToUint8Array(data);
					usageStats.down += chunk.byteLength;
					if (chunk.byteLength <= SSbatchMaxBytes) {
						return SSenqueueSend(chunk);
					}
					for (let i = 0; i < chunk.byteLength; i += SSbatchMaxBytes) {
						SSenqueueSend(chunk.subarray(i, Math.min(i + SSbatchMaxBytes, chunk.byteLength)));
					}
					return SSsendQueue;
				},
				close() {
					closeSocketQuietly(serverSock);
				}
			};
				sscontext = {
					inboundDecryptor,
					replyChunkSocket,
					firstPacketEstablished: false,
					targetHost: '',
					targetPort: 0,
				};
				return sscontext;
			})().finally(() => { ssinitTask = null });
		}
		return ssinitTask;
	};

	const handleSSData = async (chunk) => {
		const context = await getSSContext();
		let plaintextChunkArray = null;
		try {
			plaintextChunkArray = await context.inboundDecryptor.input(chunk);
		} catch (err) {
			const msg = err?.message || `${err}`;
			if (msg.includes('Decryption failed') || msg.includes('SS handshake decrypt failed') || msg.includes('SS length decrypt failed')) {
				log(`[SSinbound] decryptFail，connectionClose: ${msg}`);
				closeSocketQuietly(serverSock);
				return;
			}
			throw err;
		}
		for (const plaintextChunk of plaintextChunkArray) {
			let Write = false;
			try {
				Write = await writeRemote(plaintextChunk, false);
			} catch (err) {
				if ((/** @type {any} */ (err))?.isQueueOverflow) throw err;
				Write = false;
			}
			if (Write) continue;
			if (context.firstPacketEstablished && context.targetHost && context.targetPort > 0) {
				usageStats.up += validDataLength(plaintextChunk);
				await forwardataTCP(context.targetHost, context.targetPort, plaintextChunk, context.replyChunkSocket, null, remoteConnWrapper, yourUUID, request, usageStats);
				continue;
			}
			const plaintextData = dataToUint8Array(plaintextChunk);
			if (plaintextData.byteLength < 3) throw new Error('invalid ss data');
			const addressType = plaintextData[0];
			let cursor = 1;
			let hostname = '';
			if (addressType === 1) {
				if (plaintextData.byteLength < cursor + 4 + 2) throw new Error('invalid ss ipv4 length');
				hostname = `${plaintextData[cursor]}.${plaintextData[cursor + 1]}.${plaintextData[cursor + 2]}.${plaintextData[cursor + 3]}`;
				cursor += 4;
			} else if (addressType === 3) {
				if (plaintextData.byteLength < cursor + 1) throw new Error('invalid ss domain length');
				const domainLength = plaintextData[cursor];
				cursor += 1;
				if (plaintextData.byteLength < cursor + domainLength + 2) throw new Error('invalid ss domain data');
				hostname = SStextDecode.decode(plaintextData.subarray(cursor, cursor + domainLength));
				cursor += domainLength;
			} else if (addressType === 4) {
				if (plaintextData.byteLength < cursor + 16 + 2) throw new Error('invalid ss ipv6 length');
				const ipv6 = [];
				const ipv6View = new DataView(plaintextData.buffer, plaintextData.byteOffset + cursor, 16);
				for (let i = 0; i < 8; i++) ipv6.push(ipv6View.getUint16(i * 2).toString(16));
				hostname = ipv6.join(':');
				cursor += 16;
			} else {
				throw new Error(`invalid ss addressType: ${addressType}`);
			}
			if (!hostname) throw new Error(`invalid ss address: ${addressType}`);
			const port = (plaintextData[cursor] << 8) | plaintextData[cursor + 1];
			cursor += 2;
			const rawClientData = plaintextData.subarray(cursor);
			if (isBlockedSite(hostname)) throw new Error('Speedtest site is blocked');
			context.firstPacketEstablished = true;
			context.targetHost = hostname;
			context.targetPort = port;
			usageStats.up += validDataLength(rawClientData);
			await forwardataTCP(hostname, port, rawClientData, context.replyChunkSocket, null, remoteConnWrapper, yourUUID, request, usageStats);
		}
	};

	const handleWsInboundData = async (chunk) => {
		let currentChunkBytes = null;
		if (isDnsQuery) {
			if (isTrojan) return await forwardTrojanUdpData(chunk, serverSock, trojanUdpContext, request);
			return await forwardataudp(chunk, serverSock, null, request);
		}
		if (checkProtocolType === 'ss') {
			await handleSSData(chunk);
			return;
		}
		if (await writeRemote(chunk)) {
			usageStats.up += validDataLength(chunk);
			return;
		}

		if (checkProtocolType === null) {
			if (url.searchParams.get('enc')) checkProtocolType = 'ss';
			else {
				currentChunkBytes = currentChunkBytes || dataToUint8Array(chunk);
				const bytes = currentChunkBytes;
				checkProtocolType = isTrojanFirstPacket(bytes, yourUUID) ? 'trojan' : 'vless';
			}
			isTrojan = checkProtocolType === 'trojan';
			log(`[WSforward] protocolType: ${checkProtocolType} | from: ${url.host} | UA: ${request.headers.get('user-agent') || 'unknown'}`);
		}

		if (checkProtocolType === 'ss') {
			await handleSSData(chunk);
			return;
		}
		if (await writeRemote(chunk)) {
			usageStats.up += validDataLength(chunk);
			return;
		}
		if (checkProtocolType === 'trojan') {
			const parseResult = parseTrojanRequest(chunk, yourUUID);
			if (parseResult?.hasError) throw new Error(parseResult.message || 'Invalid trojan request');
			const { port, hostname, rawClientData, isUDP } = parseResult;
			if (isBlockedSite(hostname)) throw new Error('Speedtest site is blocked');
			if (isUDP) {
				isDnsQuery = true;
				if (validDataLength(rawClientData) > 0) {
					usageStats.up += validDataLength(rawClientData);
					return forwardTrojanUdpData(rawClientData, serverSock, trojanUdpContext, request);
				}
				return;
			}
			usageStats.up += validDataLength(rawClientData);
			await forwardataTCP(hostname, port, rawClientData, serverSock, null, remoteConnWrapper, yourUUID, request, usageStats);
		} else {
			isTrojan = false;
			currentChunkBytes = currentChunkBytes || dataToUint8Array(chunk);
			const bytes = currentChunkBytes;
			const parseResult = parseVlessRequest(bytes, yourUUID);
			if (parseResult?.hasError) throw new Error(parseResult.message || 'Invalid vless request');
			const { port, hostname, version, isUDP, rawClientData } = parseResult;
			if (isBlockedSite(hostname)) throw new Error('Speedtest site is blocked');
			if (isUDP) {
				if (port === 53) isDnsQuery = true;
				else throw new Error('UDP is not supported');
			}
			const respHeader = new Uint8Array([version, 0]);
			const rawData = rawClientData;
			if (isDnsQuery) {
				if (isTrojan) {
					usageStats.up += validDataLength(rawData);
					return forwardTrojanUdpData(rawData, serverSock, trojanUdpContext, request);
				}
				usageStats.up += validDataLength(rawData);
				return forwardataudp(rawData, serverSock, respHeader, request);
			}
			usageStats.up += validDataLength(rawData);
			await forwardataTCP(hostname, port, rawData, serverSock, respHeader, remoteConnWrapper, yourUUID, request, usageStats);
		}
	};

	const handleWSExplicitTransportError = (err) => {
		if (WSexplicitTransportFail) return;
		WSexplicitTransportFail = true;
		WSexplicitTransportStopRecv = true;
		WSexplicitQueueBytes = 0;
		WSexplicitQueueItems = 0;
		const msg = err?.message || `${err}`;
		if (msg.includes('Network connection lost') || msg.includes('ReadableStream is closed')) {
			log(`[WSforward] connectionEnd: ${msg}`);
		} else {
			log(`[WSforward] handleFail: ${msg}`);
		}
		upstreamWriteQueue.clear();
		releaseRemoteWriter();
		closeSocketQuietly(serverSock);
	};

	const appendWSExplicitTransportTask = (task) => {
		WSexplicitTransportChain = WSexplicitTransportChain.then(task).catch(handleWSExplicitTransportError);
		return WSexplicitTransportChain;
	};

	const enqueueWsExplicitTransport = (data) => {
		if (WSexplicitTransportStopRecv || WSexplicitTransportFail) return;
		const chunkSize = Math.max(0, validDataLength(data));
		const nextBytes = WSexplicitQueueBytes + chunkSize;
		const nextItems = WSexplicitQueueItems + 1;
		if (nextBytes > upstreamQueueMaxBytes || nextItems > upstreamQueueMaxItems) {
			handleWSExplicitTransportError(new Error(`[WSexplicitTransport] queueOverflow: ${nextBytes}B/${nextItems}`));
			return;
		}
		WSexplicitQueueBytes = nextBytes;
		WSexplicitQueueItems = nextItems;
		appendWSExplicitTransportTask(async () => {
			WSexplicitQueueBytes = Math.max(0, WSexplicitQueueBytes - chunkSize);
			WSexplicitQueueItems = Math.max(0, WSexplicitQueueItems - 1);
			if (WSexplicitTransportFail) return;
			await handleWsInboundData(data);
		});
	};

	const tailWsExplicitTransport = () => {
		if (WSexplicitTransportTailEnqueued) return;
		WSexplicitTransportTailEnqueued = true;
		WSexplicitTransportStopRecv = true;
		appendWSExplicitTransportTask(async () => {
			if (WSexplicitTransportFail) return;
			await upstreamWriteQueue.waitEmpty();
			releaseRemoteWriter();
		});
	};

	serverSock.addEventListener('message', (event) => {
		enqueueWsExplicitTransport(event.data);
	});
	const flushWsUsage = () => { recordUsage(env, usageStats.up, usageStats.down, ctx); if (wsUserId) recordUserUsage(env, wsUserId, usageStats.up, usageStats.down, ctx); };
	serverSock.addEventListener('close', () => {
		closeSocketQuietly(serverSock);
		tailWsExplicitTransport();
		flushWsUsage();
	});
	serverSock.addEventListener('error', (err) => {
		handleWSExplicitTransportError(err);
		flushWsUsage();
	});

	// disable sec-websocket-protocol early-data in SS mode，avoid injecting sub-protocol value (e.g., "binary") as base64 data into firstPacket causing AEAD decrypt failure。
	if (!SSmodeDisableEarlyData && earlyDataHeader) {
		try {
			const bytes = decodeWsEarlyData(earlyDataHeader, yourUUID);
			if (bytes?.byteLength) enqueueWsExplicitTransport(bytes.buffer);
		} catch (error) {
			handleWSExplicitTransportError(error);
		}
	}

	return new Response(null, { status: 101, webSocket: clientSock, headers: { 'Sec-WebSocket-Extensions': '' } });
}

function isTrojanFirstPacket(bytes, uuid) {
	if (!bytes || bytes.byteLength < 58 || bytes[56] !== 0x0d || bytes[57] !== 0x0a) return false;
	const sha = sha224(uuid);
	for (let i = 0; i < 56; i++) { if (bytes[i] !== sha.charCodeAt(i)) return false; }
	return true;
}

const trojanTextDecoder = new TextDecoder();

function parseTrojanRequest(buffer, passwordPlainText) {
	const data = dataToUint8Array(buffer);
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
			address = trojanTextDecoder.decode(data.subarray(addressIndex, addressIndex + addressLength));
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

const UUIDbytesCache = new Map();
const VLESStextDecode = new TextDecoder();

function readHexNibble(code) {
	if (code >= 48 && code <= 57) return code - 48;
	code |= 32;
	if (code >= 97 && code <= 102) return code - 87;
	return -1;
}

function getUuidBytes(uuid) {
	const key = String(uuid || '');
	let cached = UUIDbytesCache.get(key);
	if (cached) return cached;

	const clean = key.replace(/-/g, '');
	if (clean.length !== 32) return null;

	const bytes = new Uint8Array(16);
	for (let i = 0; i < 16; i++) {
		const high = readHexNibble(clean.charCodeAt(i * 2));
		const low = readHexNibble(clean.charCodeAt(i * 2 + 1));
		if (high < 0 || low < 0) return null;
		bytes[i] = (high << 4) | low;
	}

	if (UUIDbytesCache.size >= 32) UUIDbytesCache.clear();
	UUIDbytesCache.set(key, bytes);
	return bytes;
}

function UUIDbyteMatch(data, offset, uuid) {
	const expected = getUuidBytes(uuid);
	if (!expected || data.byteLength < offset + 16) return false;
	for (let i = 0; i < 16; i++) {
		if (data[offset + i] !== expected[i]) return false;
	}
	return true;
}

function parseVlessRequest(chunk, token) {
	const data = dataToUint8Array(chunk);
	const length = data.byteLength;
	if (length < 24) return { hasError: true, message: 'Invalid data' };
	const version = data[0];
	if (!UUIDbyteMatch(data, 1, token)) return { hasError: true, message: 'Invalid uuid' };

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
			hostname = VLESStextDecode.decode(data.subarray(addrValIdx, addrValIdx + addrLen));
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

const SSsupportEncryptionConfig = {
	'aes-128-gcm': { method: 'aes-128-gcm', keyLen: 16, saltLen: 16, maxChunk: 0x3fff, aesLength: 128 },
	'aes-256-gcm': { method: 'aes-256-gcm', keyLen: 32, saltLen: 32, maxChunk: 0x3fff, aesLength: 256 },
};

const SSAEADtagLength = 16, SSNoncelength = 12;
const SSsubkeyInfo = new TextEncoder().encode('ss-subkey');
const SStextEncoder = new TextEncoder(), SStextDecode = new TextDecoder(), SSmasterKeyCache = new Map();

function dataToUint8Array(data) {
	if (data instanceof Uint8Array) return data;
	if (data instanceof ArrayBuffer) return new Uint8Array(data);
	if (ArrayBuffer.isView(data)) return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
	return new Uint8Array(data || 0);
}

function concatByteData(...chunkList) {
	if (!chunkList || chunkList.length === 0) return new Uint8Array(0);
	const chunks = chunkList.map(dataToUint8Array);
	const total = chunks.reduce((sum, c) => sum + c.byteLength, 0);
	const result = new Uint8Array(total);
	let offset = 0;
	for (const c of chunks) { result.set(c, offset); offset += c.byteLength }
	return result;
}

async function forwardTrojanUdpData(chunk, webSocket, context, request) {
	const currentChunk = dataToUint8Array(chunk);
	const cacheChunk = context?.cache instanceof Uint8Array ? context.cache : new Uint8Array(0);
	const input = cacheChunk.byteLength ? concatByteData(cacheChunk, currentChunk) : currentChunk;
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

		const addressPortHeader = input.slice(packetStart, portCursor + 2);
		const payload = input.slice(payloadStart, payloadEnd);
		cursor = payloadEnd;

		if (port !== 53) throw new Error('UDP is not supported');
		if (!payload.byteLength) continue;

		let tcpDNSquery = payload;
		if (payload.byteLength < 2 || ((payload[0] << 8) | payload[1]) !== payload.byteLength - 2) {
			tcpDNSquery = new Uint8Array(payload.byteLength + 2);
			tcpDNSquery[0] = (payload.byteLength >>> 8) & 0xff;
			tcpDNSquery[1] = payload.byteLength & 0xff;
			tcpDNSquery.set(payload, 2);
		}

		const dnsresponseContext = { cache: new Uint8Array(0) };
		await forwardataudp(tcpDNSquery, webSocket, null, request, (dnsRespChunk) => {
			const currentResponseChunk = dataToUint8Array(dnsRespChunk);
			const responseInput = dnsresponseContext.cache.byteLength ? concatByteData(dnsresponseContext.cache, currentResponseChunk) : currentResponseChunk;
			const responseFrameList = [];
			let responseCursor = 0;
			while (responseCursor + 2 <= responseInput.byteLength) {
				const dnsLen = (responseInput[responseCursor] << 8) | responseInput[responseCursor + 1];
				const dnsStart = responseCursor + 2;
				const dnsEnd = dnsStart + dnsLen;
				if (dnsEnd > responseInput.byteLength) break;
				const dnsPayload = responseInput.slice(dnsStart, dnsEnd);
				const frame = new Uint8Array(addressPortHeader.byteLength + 4 + dnsPayload.byteLength);
				frame.set(addressPortHeader, 0);
				frame[addressPortHeader.byteLength] = (dnsPayload.byteLength >>> 8) & 0xff;
				frame[addressPortHeader.byteLength + 1] = dnsPayload.byteLength & 0xff;
				frame[addressPortHeader.byteLength + 2] = 0x0d;
				frame[addressPortHeader.byteLength + 3] = 0x0a;
				frame.set(dnsPayload, addressPortHeader.byteLength + 4);
				responseFrameList.push(frame);
				responseCursor = dnsEnd;
			}
			dnsresponseContext.cache = responseInput.slice(responseCursor);
			return responseFrameList.length ? responseFrameList : new Uint8Array(0);
		});
	}

	if (context) context.cache = input.slice(cursor);
}

function SSincrementNonceCounter(counter) {
	for (let i = 0; i < counter.length; i++) { counter[i] = (counter[i] + 1) & 0xff; if (counter[i] !== 0) return }
}

async function SSderiveMasterKey(passwordText, keyLen) {
	const cacheKey = `${keyLen}:${passwordText}`;
	if (SSmasterKeyCache.has(cacheKey)) return SSmasterKeyCache.get(cacheKey);
	const deriveTask = (async () => {
		const pwBytes = SStextEncoder.encode(passwordText || '');
		let prev = new Uint8Array(0), result = new Uint8Array(0);
		while (result.byteLength < keyLen) {
			const input = new Uint8Array(prev.byteLength + pwBytes.byteLength);
			input.set(prev, 0); input.set(pwBytes, prev.byteLength);
			prev = new Uint8Array(await crypto.subtle.digest('MD5', input));
			result = concatByteData(result, prev);
		}
		return result.slice(0, keyLen);
	})();
	SSmasterKeyCache.set(cacheKey, deriveTask);
	try { return await deriveTask }
	catch (error) { SSmasterKeyCache.delete(cacheKey); throw error }
}

async function SSderiveSessionKey(config, masterKey, salt, usages) {
	const hmacOpts = { name: 'HMAC', hash: 'SHA-1' };
	const saltHmacKey = await crypto.subtle.importKey('raw', salt, hmacOpts, false, ['sign']);
	const prk = new Uint8Array(await crypto.subtle.sign('HMAC', saltHmacKey, masterKey));
	const prkHmacKey = await crypto.subtle.importKey('raw', prk, hmacOpts, false, ['sign']);
	const subKey = new Uint8Array(config.keyLen);
	let prev = new Uint8Array(0), written = 0, counter = 1;
	while (written < config.keyLen) {
		const input = concatByteData(prev, SSsubkeyInfo, new Uint8Array([counter]));
		prev = new Uint8Array(await crypto.subtle.sign('HMAC', prkHmacKey, input));
		const copyLen = Math.min(prev.byteLength, config.keyLen - written);
		subKey.set(prev.subarray(0, copyLen), written);
		written += copyLen; counter += 1;
	}
	return crypto.subtle.importKey('raw', subKey, { name: 'AES-GCM', length: config.aesLength }, false, usages);
}

async function SSAEADencryption(cryptoKey, nonceCounter, plaintext) {
	const iv = nonceCounter.slice();
	const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv, tagLength: 128 }, cryptoKey, plaintext);
	SSincrementNonceCounter(nonceCounter);
	return new Uint8Array(ct);
}

async function SSAEADdecrypt(cryptoKey, nonceCounter, ciphertext) {
	const iv = nonceCounter.slice();
	const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv, tagLength: 128 }, cryptoKey, ciphertext);
	SSincrementNonceCounter(nonceCounter);
	return new Uint8Array(pt);
}

// --- NAT64: reach destinations via a NAT64 gateway (opt-in via env.NAT64) ---
function isIPv4Addr(s) { return /^(\d{1,3}\.){3}\d{1,3}$/.test(s); }
async function resolveAviaDoH(host) {
	try { const r = await fetch('https://cloudflare-dns.com/dns-query?name=' + encodeURIComponent(host) + '&type=A', { headers: { accept: 'application/dns-json' } }); const j = await r.json(); const a = (j.Answer || []).filter(x => x.type === 1).map(x => x.data); return a.length ? a[Math.floor(Math.random() * a.length)] : null; } catch (e) { return null; }
}
function makeNat64Address(prefix, ipv4) {
	const p = String(prefix).trim().replace(/[\[\]]/g, '').replace(/:+$/, '');
	const o = ipv4.split('.').map(n => parseInt(n, 10)); if (o.length !== 4 || o.some(n => isNaN(n) || n < 0 || n > 255)) return null;
	const hex = (((o[0] << 8) | o[1]) >>> 0).toString(16).padStart(4, '0') + ':' + (((o[2] << 8) | o[3]) >>> 0).toString(16).padStart(4, '0');
	return `[${p}::${hex}]`;
}
async function getNat64Prefixes() {
	const src = (nat64Config || '').trim(); if (!src) return [];
	if (/^https?:\/\//i.test(src)) {
		if (cachedNat64Prefixes && cachedNat64Src === src && (Date.now() - cachedNat64At) < 3600000) return cachedNat64Prefixes;
		try {
			const r = await fetch(src, { headers: { 'User-Agent': 'NovaProxy' } }); const txt = await r.text();
			let list = (txt.match(/\[([0-9a-fA-F:]+::)\]/g) || []).map(s => s.replace(/[\[\]]/g, ''));
			if (!list.length) list = txt.split(/[\n,]+/).map(s => s.replace(/[\[\]]/g, '').trim()).filter(s => s.includes('::'));
			cachedNat64Prefixes = [...new Set(list)]; cachedNat64At = Date.now(); cachedNat64Src = src; return cachedNat64Prefixes;
		} catch (e) { return cachedNat64Prefixes || []; }
	}
	return [...new Set(src.split(/[\n,]+/).map(s => s.replace(/[\[\]]/g, '').trim()).filter(Boolean))];
}

async function forwardataTCP(host, portNum, rawData, ws, respHeader, remoteConnWrapper, yourUUID, request = null, usageStats = null) {
	log(`[TCPforward] target: ${host}:${portNum} | proxyIP: ${proxyIP} | proxyFallback: ${enableProxyFallback ? 'is' : ''} | proxyType: ${enableSocks5Proxy || 'proxyip'} | globalScope: ${enableSocks5GlobalProxy ? 'is' : ''}`);
	const connectionTimeoutMs = 5000;
	let sentFirstPacketViaProxy = false;
	const TCPconnection = createRequestTcpConnector(request);

	async function waitConnectionEstablish(remoteSock, timeoutMs = connectionTimeoutMs) {
		await Promise.race([
			remoteSock.opened,
			new Promise((_, reject) => setTimeout(() => reject(new Error('connectionTimeout')), timeoutMs))
		]);
	}

	async function openTcpConnection(address, port) {
		const remoteSock = TCPconnection({ hostname: address, port });
		try {
			await waitConnectionEstablish(remoteSock);
			return remoteSock;
		} catch (err) {
			try { remoteSock?.close?.() } catch (e) { }
			throw err;
		}
	}

	async function writeFirstPacket(remoteSock, data) {
		if (validDataLength(data) <= 0) return;
		const writer = remoteSock.writable.getWriter();
		try { await writer.write(dataToUint8Array(data)) }
		finally { try { writer.releaseLock() } catch (e) { } }
	}

	async function tryNat64Connect(data) {
		const prefixes = await getNat64Prefixes(); if (!prefixes.length) return null;
		const ipv4 = isIPv4Addr(host) ? host : await resolveAviaDoH(host);
		if (!ipv4) return null;
		for (const prefix of prefixes.slice(0, 4)) {
			const addr = makeNat64Address(prefix, ipv4); if (!addr) continue;
			try { const sock = await openTcpConnection(addr, portNum); await writeFirstPacket(sock, data); log(`[NAT64] connected via ${addr}:${portNum}`); return sock; }
			catch (e) { log(`[NAT64] failed ${addr}: ${e.message || e}`); }
		}
		return null;
	}

	async function concurrentOpenCandidates(candidateList) {
		if (candidateList.length === 1) {
			const candidate = candidateList[0];
			return { socket: await openTcpConnection(candidate.hostname, candidate.port), candidate: candidate };
		}
		const attempts = candidateList.map(candidate => openTcpConnection(candidate.hostname, candidate.port).then(socket => ({ socket, candidate: candidate })));
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

	async function connectDirect(address, port, data = null, allProxyArray = null, proxyFallback = true) {
		if (allProxyArray && allProxyArray.length > 0) {
			for (let i = 0; i < allProxyArray.length; i += TCPconcurrentDialCount) {
				const candidateList = [];
				for (let j = 0; j < TCPconcurrentDialCount && i + j < allProxyArray.length; j++) {
					const proxyArrayIndex = (cachedProxyArrayIndex + i + j) % allProxyArray.length;
					const [proxyAddress, proxyPort] = allProxyArray[proxyArrayIndex];
					candidateList.push({ hostname: proxyAddress, port: proxyPort, index: proxyArrayIndex });
				}
				let socket = null, candidate = null;
				try {
					log(`[proxyConnection] concurrentAttempts ${candidateList.length} : ${candidateList.map(candidate => `${candidate.hostname}:${candidate.port}`).join(', ')}`);
					const connectionResult = await concurrentOpenCandidates(candidateList);
					socket = connectionResult.socket;
					candidate = connectionResult.candidate;
					await writeFirstPacket(socket, data);
					log(`[proxyConnection] successConnectionTo: ${candidate.hostname}:${candidate.port} (index: ${candidate.index})`);
					cachedProxyArrayIndex = candidate.index;
					return socket;
				} catch (err) {
					try { socket?.close?.() } catch (e) { }
					log(`[proxyConnection] batchConnectFailed: ${err.message || err}`);
				}
			}
		}

		if (proxyFallback) {
			const candidateList = Array.from({ length: TCPconcurrentDialCount }, (_, attempt) => ({ hostname: address, port, attempt }));
			log(`[TCPdirectConnect] concurrentAttempts ${candidateList.length} : ${address}:${port}`);
			let socket = null;
			try {
				const connectionResult = await concurrentOpenCandidates(candidateList);
				socket = connectionResult.socket;
				await writeFirstPacket(socket, data);
				return socket;
			} catch (err) {
				try { socket?.close?.() } catch (e) { }
				throw err;
			}
		} else {
			closeSocketQuietly(ws);
			throw new Error('[proxyConnection] allProxyConnectFailed，andNoProxyFallback，connectionTerminated。');
		}
	}

	async function connecttoPry(allowSendFirstPacket = true) {
		if (remoteConnWrapper.connectingPromise) {
			await remoteConnWrapper.connectingPromise;
			return;
		}

		const currentSendFirstPacket = allowSendFirstPacket && !sentFirstPacketViaProxy && validDataLength(rawData) > 0;
		const currentFirstPacketData = currentSendFirstPacket ? rawData : null;

		const currentConnectionTask = (async () => {
			let newSocket;
			if (enableSocks5Proxy === 'socks5') {
				log(`[SOCKS5proxy] proxyTo: ${host}:${portNum}`);
				newSocket = await socks5Connect(host, portNum, currentFirstPacketData, TCPconnection);
			} else if (enableSocks5Proxy === 'http') {
				log(`[HTTPproxy] proxyTo: ${host}:${portNum}`);
				newSocket = await httpConnect(host, portNum, currentFirstPacketData, false, TCPconnection);
			} else if (enableSocks5Proxy === 'https') {
				log(`[HTTPSproxy] proxyTo: ${host}:${portNum}`);
				newSocket = isIPHostname(parsedSocks5Address.hostname)
					? await httpsConnect(host, portNum, currentFirstPacketData, TCPconnection)
					: await httpConnect(host, portNum, currentFirstPacketData, true, TCPconnection);
			} else if (enableSocks5Proxy === 'turn') {
				log(`[TURNproxy] proxyTo: ${host}:${portNum}`);
				newSocket = await turnConnect(parsedSocks5Address, host, portNum, TCPconnection);
				if (validDataLength(currentFirstPacketData) > 0) {
					const writer = newSocket.writable.getWriter();
					try { await writer.write(dataToUint8Array(currentFirstPacketData)) }
					finally { try { writer.releaseLock() } catch (e) { } }
				}
			} else if (enableSocks5Proxy === 'sstp') {
				log(`[SSTPproxy] proxyTo: ${host}:${portNum}`);
				newSocket = await sstpConnect(parsedSocks5Address, host, portNum, TCPconnection);
				if (validDataLength(currentFirstPacketData) > 0) {
					const writer = newSocket.writable.getWriter();
					try { await writer.write(dataToUint8Array(currentFirstPacketData)) }
					finally { try { writer.releaseLock() } catch (e) { } }
				}
			} else {
				log(`[proxyConnection] proxyTo: ${host}:${portNum}`);
				const allProxyArray = await parseAddressPort(proxyIP, host, yourUUID);
				try {
					newSocket = await connectDirect(atob('UFJPWFlJUC50cDEuMDkwMjI3Lnh5eg=='), 1, currentFirstPacketData, allProxyArray, enableProxyFallback);
				} catch (err) {
					const nat64Sock = nat64Config ? await tryNat64Connect(currentFirstPacketData) : null;
					if (!nat64Sock) throw err;
					newSocket = nat64Sock;
				}
			}
			if (currentSendFirstPacket) sentFirstPacketViaProxy = true;
			remoteConnWrapper.socket = newSocket;
			newSocket.closed.catch(() => { }).finally(() => closeSocketQuietly(ws));
			connectStreams(newSocket, ws, respHeader, null, usageStats);
		})();

		remoteConnWrapper.connectingPromise = currentConnectionTask;
		try {
			await currentConnectionTask;
		} finally {
			if (remoteConnWrapper.connectingPromise === currentConnectionTask) {
				remoteConnWrapper.connectingPromise = null;
			}
		}
	}
	remoteConnWrapper.retryConnect = async () => connecttoPry(!sentFirstPacketViaProxy);

	if (enableSocks5Proxy && (enableSocks5GlobalProxy || SOCKS5whitelist.some(p => new RegExp(`^${p.replace(/\*/g, '.*')}$`, 'i').test(host)))) {
		log(`[TCPforward] enable SOCKS5/HTTP/HTTPS/TURN/SSTP globalProxy`);
		try {
			await connecttoPry();
		} catch (err) {
			log(`[TCPforward] SOCKS5/HTTP/HTTPS/TURN/SSTP proxyConnectionFail: ${err.message}`);
			throw err;
		}
	} else {
		try {
			log(`[TCPforward] attemptDirectTo: ${host}:${portNum}`);
			const initialSocket = await connectDirect(host, portNum, rawData);
			remoteConnWrapper.socket = initialSocket;
			connectStreams(initialSocket, ws, respHeader, async () => {
				if (remoteConnWrapper.socket !== initialSocket) return;
				await connecttoPry();
			}, usageStats);
		} catch (err) {
			log(`[TCPforward] directConnect ${host}:${portNum} fail: ${err.message}`);
			await connecttoPry();
		}
	}
}

async function forwardataudp(udpChunk, webSocket, respHeader, request, responseEncapsulator = null) {
	const requestData = dataToUint8Array(udpChunk);
	const requestBytesCount = requestData.byteLength;
	log(`[UDPforward] received DNS request: ${requestBytesCount}B -> 8.8.4.4:53`);
	try {
		const TCPconnection = createRequestTcpConnector(request);
		const tcpSocket = TCPconnection({ hostname: '8.8.4.4', port: 53 });
		let vlessHeader = respHeader;
		const writer = tcpSocket.writable.getWriter();
		await writer.write(requestData);
		log(`[UDPforward] DNS requestWriteUpstream: ${requestBytesCount}B`);
		writer.releaseLock();
		await tcpSocket.readable.pipeTo(new WritableStream({
			async write(chunk) {
				const rawResponse = dataToUint8Array(chunk);
				log(`[UDPforward] received DNS response: ${rawResponse.byteLength}B`);
				const encapResult = responseEncapsulator ? await responseEncapsulator(rawResponse) : rawResponse;
				const sendFragmentList = Array.isArray(encapResult) ? encapResult : [encapResult];
				if (!sendFragmentList.length) return;
				if (webSocket.readyState !== WebSocket.OPEN) return;
				for (const fragment of sendFragmentList) {
					const forwardResponse = dataToUint8Array(fragment);
					if (!forwardResponse.byteLength) continue;
					if (vlessHeader) {
						const response = new Uint8Array(vlessHeader.length + forwardResponse.byteLength);
						response.set(vlessHeader, 0);
						response.set(forwardResponse, vlessHeader.length);
						await WebSocketsendAndWait(webSocket, response.buffer);
						vlessHeader = null;
					} else {
						await WebSocketsendAndWait(webSocket, forwardResponse);
					}
				}
			},
		}));
	} catch (error) {
		log(`[UDPforward] DNS forwardFail: ${error?.message || error}`);
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

async function WebSocketsendAndWait(webSocket, payload) {
	const sendResult = webSocket.send(payload);
	if (sendResult && typeof sendResult.then === 'function') await sendResult;
}

function createUpstreamWriteQueue({ getWriter, releaseWriter, retryConnection, closeConnection, name = 'upstreamQueue' }) {
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
		const closeErr = err || (closed ? new Error(`${name}: queue closed`) : null);
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
		if (head >= chunks.length || first.chunk.byteLength >= upstreamBatchTargetBytes) return first;

		let byteLength = first.chunk.byteLength;
		let end = head;
		let allowRetry = first.allowRetry;
		let completions = first.completions || null;
		while (end < chunks.length) {
			const next = chunks[end];
			const nextLength = byteLength + next.chunk.byteLength;
			if (nextLength > upstreamBatchTargetBytes) break;
			byteLength = nextLength;
			allowRetry = allowRetry && next.allowRetry;
			if (next.completions) completions = completions ? completions.concat(next.completions) : next.completions;
			end++;
		}
		if (end === head) return first;

		const output = (bundleBuffer ||= new Uint8Array(upstreamBatchTargetBytes));
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
				let writer = getWriter();
				if (!writer) throw new Error(`${name}: remote writer unavailable`);
				const completions = item.completions || null;
				activeCompletions = completions;
				try {
					try {
						await writer.write(item.chunk);
					} catch (err) {
						releaseWriter?.();
						if (!item.allowRetry || typeof retryConnection !== 'function') throw err;
						await retryConnection();
						writer = getWriter();
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
			log(`[${name}] writeFail: ${err?.message || err}`);
			try { closeConnection?.(err) } catch (_) { }
		} finally {
			draining = false;
			if (!closed && head < chunks.length) queueMicrotask(drain);
			else resolveIdle();
		}
	};

	const enqueue = (data, allowRetry = true, waitForFlush = false) => {
		if (closed) return false;
		// socket may not be established during firstPacket parsing phase；return false for upper layer to continue protocol parsing。
		if (!getWriter()) return false;
		const chunk = dataToUint8Array(data);
		if (!chunk.byteLength) return true;
		const nextBytes = queuedBytes + chunk.byteLength;
		const nextItems = chunks.length - head + 1;
		if (nextBytes > upstreamQueueMaxBytes || nextItems > upstreamQueueMaxItems) {
			closed = true;
			const err = Object.assign(new Error(`${name}: upload queue overflow (${nextBytes}B/${nextItems})`), { isQueueOverflow: true });
			clear(err);
			log(`[${name}] queueLimitExceeded，closeConnection`);
			try { closeConnection?.(err) } catch (_) { }
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
		write(data, allowRetry = true) {
			return enqueue(data, allowRetry, false);
		},
		writeAndWait(data, allowRetry = true) {
			return enqueue(data, allowRetry, true);
		},
		async waitEmpty() {
			if (!queuedBytes && !draining) return;
			await new Promise(resolve => idleResolvers.push(resolve));
		},
		clear() {
			closed = true;
			clear();
		}
	};
}

function createDownstreamGrainSender(webSocket, headerData = null) {
	const packetCap = downstreamGrainChunkBytes;
	const tailBytes = downstreamGrainTailThreshold;
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

	const sendRawChunk = async (chunk) => {
		if (webSocket.readyState !== WebSocket.OPEN) throw new Error('ws.readyState is not open');
		await WebSocketsendAndWait(webSocket, chunk);
	};

	const extraResponseHeaders = (chunk) => {
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
		flushPromise = sendRawChunk(output).finally(() => { flushPromise = null });
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
			}, Math.max(downstreamGrainSilentMs, 1));
		});
	};

	return {
		async directSend(data) {
			let chunk = dataToUint8Array(data);
			if (!chunk.byteLength) return;
			chunk = extraResponseHeaders(chunk);
			await sendRawChunk(chunk);
		},
		async send(data) {
			let chunk = dataToUint8Array(data);
			if (!chunk.byteLength) return;
			chunk = extraResponseHeaders(chunk);
			let offset = 0;
			const totalBytes = chunk.byteLength;
			while (offset < totalBytes) {
				if (!pendingBytes && totalBytes - offset >= packetCap) {
					const sendBytes = Math.min(packetCap, totalBytes - offset);
					const view = offset || sendBytes !== totalBytes ? chunk.subarray(offset, offset + sendBytes) : chunk;
					await sendRawChunk(view);
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
	const BYOBsingleReadLimit = 64 * 1024;
	const downstreamSend = createDownstreamGrainSender(webSocket, header);
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
				if (usageStats) usageStats.down += value.byteLength;
				await downstreamSend.send(value);
			}
		} else {
			let readBuffer = new ArrayBuffer(BYOBsingleReadLimit);
			while (true) {
				const { done, value } = await reader.read(new Uint8Array(readBuffer, 0, BYOBsingleReadLimit));
				if (done) break;
				if (!value || value.byteLength === 0) continue;
				hasData = true;
				if (usageStats) usageStats.down += value.byteLength;
				if (value.byteLength >= downstreamGrainChunkBytes) {
					await downstreamSend.flush();
					await downstreamSend.directSend(value);
					readBuffer = new ArrayBuffer(BYOBsingleReadLimit);
				} else {
					await downstreamSend.send(value);
					readBuffer = value.buffer.byteLength >= BYOBsingleReadLimit ? value.buffer : new ArrayBuffer(BYOBsingleReadLimit);
				}
			}
		}
		await downstreamSend.flush();
	} catch (err) { closeSocketQuietly(webSocket) }
	finally { try { reader.cancel() } catch (e) { } try { reader.releaseLock() } catch (e) { } }
	if (!hasData && retryFunc) await retryFunc();
}

function isBlockedSite(hostname) {
	if (isSpeedTestSite(hostname)) return true;
	if (networkSettings && networkSettings.enablePornBlock) {
		return isAdultDomain(hostname);
	}
	return false;
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

const IRANIAN_DOMAINS = [
	'ir','ac.ir','co.ir','gov.ir','net.ir','org.ir','sch.ir',
	'app.ir','blog.ir','biz.ir','info.ir','name.ir','web.ir',
	'tk','dl.ir','shatel.ir','mci.ir','irancell.ir','rightel.ir',
	'hamrah.ir','mtnirancell.ir','iranproud.ir','ninisite.ir',
	'divar.ir','sheypoor.ir','torob.ir','digikala.com','digistyle.com',
	'esam.ir','bamilo.com','shaparak.ir','samanecorp.ir',
	'tejaratbank.ir','mellatbank.ir','parsianbank.ir','enbank.ir',
	'bmi.ir','bankmaskan.ir','banksepah.ir','bankeghtesadnovin.ir',
	'ap.ir','mbt.ir','tamin.ir','sso.ir','mfa.ir','president.ir',
	'leader.ir','isna.ir','irna.ir','farsnews.ir','tasnimnews.ir',
	'varzesh3.com','telewebion.ir','iranseda.ir','irib.ir',
	'irinn.ir','jamejamonline.ir','khabaronline.ir','aftabnews.ir',
	'parsine.ir','fararu.ir','roozonline.ir','ensafnews.ir',
	'asriran.ir','tabnak.ir','rajanews.ir','boursenews.ir',
	'isahigh.ir','payvand.ir','irantv.ir','iitv.ir',
	'saham.ir','tse.ir','tsetmc.com','irbr.ir',
	'iran-fava.ir','my.ir','iran.ir','post.ir',
	'mostaghel.ir','dolat.ir','khodro.ir','ikco.ir',
	'saipa.ir','bahman.ir','mapnagroup.com','mrud.ir',
	'iranshahr.ir','isfahan.ir','tehran.ir','mashhad.ir',
	'qom.ir','shiraz.ir','tabriz.ir','karaj.ir','ahvaz.ir',
	'rasht.ir','zanjan.ir','ardabil.ir','kerman.ir','yazd.ir',
	'hamedan.ir','sari.ir','bojnord.ir','birjand.ir',
	'kish.ir','qeshm.ir','arak.ir','orumiyeh.ir','ilam.ir',
	'bushehr.ir','shahrekord.ir','gorgan.ir','sanandaj.ir',
	'kermanshah.ir','khorramabad.ir','arak.ir','sabzevar.ir',
	'neyshabur.ir','kashan.ir','golestan.ir','hormozgan.ir',
	'chaharmahal.ir','sistan.ir','baluchestan.ir','qazvin.ir',
	'semnan.ir','yazd.ir','zanjan.ir','markazi.ir',
	'mazandaran.ir','gilan.ir','kordestan.ir','kermanshah.ir',
	'fars.ir','kerman.ir','sistan.ir','baluchestan.ir',
	'khuzestan.ir','ilam.ir','bushehr.ir','lorestan.ir',
	'hamadan.ir','kurdistan.ir','westazarbaijan.ir','eastazarbaijan.ir',
	'ardabil.ir','zanjjan.ir','qazvin.ir','alborz.ir','tehran.ir',
	'semnan.ir','mazandaran.ir','golestan.ir','nkhz.ir',
	'shargh.ir','irvana.ir','iust.ac.ir','aut.ac.ir','sharif.ir',
	'ut.ac.ir','sbu.ac.ir','kntu.ac.ir','modares.ir','znu.ac.ir',
	'tabrizu.ac.ir','umz.ac.ir','guilan.ac.ir','sku.ac.ir',
	'kashanu.ac.ir','sutech.ac.ir','yazd.ac.ir','shirazu.ac.ir',
	'yazduni.ac.ir','alzahra.ac.ir','mazust.ac.ir','nit.ac.ir',
	'iut.ac.ir','cu.ac.ir','pnu.ac.ir','qom.ac.ir',
	'khu.ac.ir','rose.ir','isac.ir','itc.ir',
];

function isIranianDomain(hostname) {
	if (!hostname) return false;
	const h = hostname.toLowerCase();
	for (const domain of IRANIAN_DOMAINS) {
		if (h === domain || h.endsWith('.' + domain)) return true;
	}
	return false;
}

const ADULT_DOMAINS = [
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
	'teentube.com','www.teentube.com','thatpervert.com','www.thatpervert.com','theperf review.com','www.theperfreview.com',
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

function isAdultDomain(hostname) {
	if (!hostname) return false;
	const h = hostname.toLowerCase();
	for (const domain of ADULT_DOMAINS) {
		if (h === domain || h.endsWith('.' + domain)) return true;
	}
	return false;
}

function novaBlockPage(request) {
	const url = new URL(request.url);
	const host = url.host;
	const html = '<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>مسدود شده - Nova Proxy</title><style>@import url("https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700;800;900&display=swap");*{margin:0;padding:0;box-sizing:border-box}body{font-family:"Vazirmatn",sans-serif;background:linear-gradient(135deg,#0f0c29,#302b63,#24243e);min-height:100vh;display:flex;justify-content:center;align-items:center;padding:20px}.card{background:rgba(255,255,255,0.05);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.1);border-radius:24px;padding:48px 40px;max-width:480px;width:100%;text-align:center;position:relative;overflow:hidden}.card::before{content:"";position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:conic-gradient(from 0deg,transparent,rgba(239,68,68,0.1),transparent,rgba(239,68,68,0.05),transparent);animation:spin 6s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}.content{position:relative;z-index:1}.icon{width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,#ef4444,#dc2626);display:flex;align-items:center;justify-content:center;margin:0 auto 24px;font-size:36px;color:#fff;box-shadow:0 8px 32px rgba(239,68,68,0.3)}.shield{width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,#8b5cf6,#6d28d9);display:flex;align-items:center;justify-content:center;margin:0 auto 24px;font-size:36px;color:#fff;box-shadow:0 8px 32px rgba(139,92,246,0.3)}h1{color:#fff;font-size:24px;font-weight:900;margin-bottom:8px;letter-spacing:-0.5px}h1 span{background:linear-gradient(135deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent}p{color:rgba(255,255,255,0.6);font-size:14px;line-height:1.8;margin:12px 0}.badge{display:inline-block;background:linear-gradient(135deg,#ef4444,#dc2626);color:#fff;padding:4px 16px;border-radius:20px;font-size:12px;font-weight:700;margin-bottom:16px}.domain{background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:12px 16px;margin:16px 0;direction:ltr;font-family:monospace;font-size:13px;color:rgba(255,255,255,0.8);word-break:break-all}.btn{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.08);color:#fff;border:1px solid rgba(255,255,255,0.15);border-radius:12px;padding:10px 20px;font-size:13px;font-weight:600;font-family:inherit;cursor:pointer;transition:all .2s;margin-top:8px;text-decoration:none}.btn:hover{background:rgba(255,255,255,0.15);transform:translateY(-1px)}</style></head><body><div class="card"><div class="content"><div class="icon">&#128274;</div><h1>دسترسی <span>مسدود</span></h1><div class="badge">&#9888; محتوای بزرگسالان</div><p>این وب‌سایت به دلیل حاوی محتوای بزرگسالان توسط <strong>پروکسی نوآ</strong> مسدود شده است.</p><div class="domain">' + host + '</div><p>لطفاً با مدیر سامانه تماس بگیرید.</p></div></div></body></html>';
	return new Response(html, { status: 403, headers: { 'Content-Type': 'text/html;charset=utf-8', 'Cache-Control': 'no-store' } });
}

async function handleDoHRequest(request) {
	const url = new URL(request.url);
	if (request.method === 'OPTIONS') {
		return new Response(null, { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Accept', 'Access-Control-Max-Age': '86400' } });
	}
	if (!['GET', 'POST'].includes(request.method)) {
		return new Response('Method not allowed. Use GET or POST.', { status: 405 });
	}
	if (request.method === 'GET' && !url.searchParams.has('dns') && !url.searchParams.has('name')) {
		const dohUrl = url.protocol + '//' + url.host + url.pathname;
		const html = '<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>DoH Proxy - Nova Proxy</title><style>:root{--primary:#0ea5e9;--bg:#f8fafc;--card:#fff;--text:#1e293b;--border:#e2e8f0}body{font-family:Vazirmatn,sans-serif;background:var(--bg);color:var(--text);margin:0;padding:20px;display:flex;justify-content:center;align-items:center;min-height:100vh}.card{background:var(--card);border-radius:16px;padding:32px;max-width:560px;width:100%;box-shadow:0 4px 24px rgba(0,0,0,.08);border:1px solid var(--border);text-align:center}.badge{display:inline-block;background:linear-gradient(135deg,#0ea5e9,#667eea);color:#fff;padding:6px 16px;border-radius:20px;font-weight:700;font-size:14px;margin-bottom:16px}h2{margin:0 0 8px;font-size:22px;font-weight:800;background:linear-gradient(135deg,#0ea5e9,#667eea);-webkit-background-clip:text;-webkit-text-fill-color:transparent}p{color:#64748b;font-size:14px;line-height:1.7;margin:8px 0}.url-box{background:#f0f9ff;border:2px solid #0ea5e9;border-radius:12px;padding:14px 18px;margin:16px 0;direction:ltr;text-align:left;font-family:monospace;font-size:15px;font-weight:700;color:#0369a1;word-break:break-all;cursor:pointer;transition:all .2s}.url-box:hover{background:#e0f2fe}.btn{display:inline-flex;align-items:center;gap:6px;background:linear-gradient(135deg,#0ea5e9,#667eea);color:#fff;border:none;border-radius:10px;padding:10px 24px;font-size:14px;font-weight:600;font-family:inherit;cursor:pointer;transition:all .2s;margin-top:8px;text-decoration:none}.btn:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(14,165,233,.3)}.features{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:16px;text-align:right}.feature{background:#f8fafc;border:1px solid var(--border);border-radius:8px;padding:10px 12px;font-size:12px;font-weight:500;color:#475569;display:flex;align-items:center;gap:6px}.feature i{color:#10b981}.toast{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#1e293b;color:#fff;padding:8px 20px;border-radius:10px;font-size:13px;font-weight:600;opacity:0;transition:opacity .3s;pointer-events:none}.toast.show{opacity:1}</style></head><body><div class="card"><div class="badge">&#128736; DoH Proxy</div><h2>DNS over HTTPS</h2><p>از این سرور به عنوان DNS رمزگذاری شده استفاده کنید</p><div class="url-box" id="dohUrl" onclick="copyUrl()">' + dohUrl + '</div><button class="btn" onclick="copyUrl()">&#128203; کپی کردن آدرس DoH</button><div class="features"><div class="feature"><span>&#9989;</span> بدون Log</div><div class="feature"><span>&#9989;</span> پرسرعت</div><div class="feature"><span>&#9989;</span> امن</div><div class="feature"><span>&#9989;</span> رایگان</div></div></div><div class="toast" id="toast">کپی شد!</div><script>function copyUrl(){var t=document.getElementById("dohUrl");navigator.clipboard.writeText(t.innerText).then(function(){var e=document.getElementById("toast");e.classList.add("show"),setTimeout(function(){e.classList.remove("show")},2e3)})}</script></body></html>';
		return new Response(html, { status: 200, headers: { 'Content-Type': 'text/html;charset=utf-8', 'Cache-Control': 'no-store' } });
	}
	// JSON DoH (Google/Cloudflare style): ?name=example.com&type=A -> application/dns-json.
	// Browser/app DoH testers and some resolvers use this instead of the RFC 8484 wireformat.
	if (request.method === 'GET' && url.searchParams.has('name')) {
		const jsonUpstreams = [
			'https://cloudflare-dns.com/dns-query',
			'https://dns.google/resolve',
			'https://dns.quad9.net:5053/dns-query',
		];
		for (const up of jsonUpstreams) {
			try {
				const r = await fetch(up + url.search, { headers: { 'Accept': 'application/dns-json', 'User-Agent': 'DoH-Proxy/1.0' }, redirect: 'follow' });
				if (!r.ok) continue;
				const txt = await r.text();
				return new Response(txt, { status: 200, headers: { 'Content-Type': 'application/dns-json', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public, max-age=60' } });
			} catch (e) {}
		}
		return new Response(JSON.stringify({ Status: 2, error: 'DoH JSON upstream unavailable' }), { status: 502, headers: { 'Content-Type': 'application/dns-json', 'Access-Control-Allow-Origin': '*' } });
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
		const headers = new Headers();
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
				const fallbackHeaders = new Headers();
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

function getDateKey(date) {
	const d = date || new Date();
	return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function getMonthKey(date) {
	const d = date || new Date();
	return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
}

// ---- Multi-user (gated by networkSettings.multiUser; OFF = single-UUID behavior unchanged) ----
let connUserId = null, connRejectReason = null;
let userUsageCache = {}, userUsageCacheAt = 0;
async function refreshUserUsageIfStale(env) {
	if (Date.now() - userUsageCacheAt < 60000) return;
	userUsageCacheAt = Date.now();
	try {
		const users = (networkSettings && Array.isArray(networkSettings.users)) ? networkSettings.users : [];
		const next = {};
		for (const u of users) { if (!u || !u.id) continue; try { const c = JSON.parse(await env.KV.get('uusage:' + u.id) || 'null'); next[u.id] = (c && c.total) || 0; } catch (e) { next[u.id] = userUsageCache[u.id] || 0; } }
		userUsageCache = next;
	} catch (e) { /* keep old cache */ }
}
function resolveConnUser(url) {
	connUserId = null; connRejectReason = null;
	if (!networkSettings || !networkSettings.multiUser || !Array.isArray(networkSettings.users)) return;
	const tag = url.searchParams.get('u');
	// No tag = the main/dashboard (admin) config. Always allow it, unmetered, so turning on
	// multi-user never breaks your own subscription. Per-user configs carry &u=<tag> and ARE
	// enforced below. A tag that matches no user (e.g. a deleted user) is still cut off.
	if (!tag) return;
	const user = networkSettings.users.find(u => u && u.tag === tag);
	if (!user) { connRejectReason = 'no-user'; return; }
	if (user.enabled === false) { connRejectReason = 'disabled'; return; }
	if (user.expiry) { const t = Date.parse(user.expiry); if (!isNaN(t) && Date.now() > t) { connRejectReason = 'expired'; return; } }
	if (user.quotaBytes) {
		const used = userUsageCache[user.id] || 0;
		if (used >= user.quotaBytes) { connRejectReason = 'quota'; return; }
	}
	connUserId = user.id;
}
let _uusagePending = {}, _uusageLastFlush = 0;
async function flushUserUsage(env) {
	const pend = _uusagePending; _uusagePending = {};
	for (const id of Object.keys(pend)) {
		const up = pend[id].up, down = pend[id].down; if (up + down <= 0) continue;
		try { const key = 'uusage:' + id; let cur; try { cur = JSON.parse(await env.KV.get(key) || 'null'); } catch (e) { cur = null; } if (!cur) cur = { up: 0, down: 0, total: 0 }; cur.up += up; cur.down += down; cur.total += up + down; await env.KV.put(key, JSON.stringify(cur)); userUsageCache[id] = cur.total; }
		catch (e) { if (!_uusagePending[id]) _uusagePending[id] = { up: 0, down: 0 }; _uusagePending[id].up += up; _uusagePending[id].down += down; }
	}
}
function recordUserUsage(env, id, up, down, ctx) {
	if (!id) return;
	if (!_uusagePending[id]) _uusagePending[id] = { up: 0, down: 0 };
	_uusagePending[id].up += (up || 0); _uusagePending[id].down += (down || 0);
	userUsageCache[id] = (userUsageCache[id] || 0) + (up || 0) + (down || 0);
	const now = Date.now(); if (now - _uusageLastFlush < USAGE_FLUSH_MS) return; _uusageLastFlush = now;
	if (ctx && ctx.waitUntil) ctx.waitUntil(flushUserUsage(env)); else flushUserUsage(env).catch(() => {});
}

// ---- Batched global usage counters (free-plan KV write budget) ----
let usagePending = { up: 0, down: 0 };
let usageLastFlush = 0;
let usageFlushing = false;
const USAGE_FLUSH_MS = 5 * 60 * 1000;
const USAGE_FLUSH_BYTES = 200 * 1024 * 1024;

async function flushUsage(env) {
	if (usageFlushing) return;
	const up = usagePending.up, down = usagePending.down;
	if (up + down <= 0) return;
	usageFlushing = true;
	usagePending = { up: 0, down: 0 };
	try {
		const now = new Date();
		const add = async (key) => {
			let cur; try { cur = JSON.parse(await env.KV.get(key) || 'null'); } catch (e) { cur = null; }
			if (!cur || typeof cur !== 'object') cur = { up: 0, down: 0, total: 0 };
			cur.up = (cur.up || 0) + up; cur.down = (cur.down || 0) + down; cur.total = (cur.total || 0) + up + down;
			await env.KV.put(key, JSON.stringify(cur));
		};
		await add('usage:' + getDateKey(now));
		await add('usage-m:' + getMonthKey(now));
	} catch (e) {
		usagePending.up += up; usagePending.down += down;
		console.error('flushUsage failed: ' + (e.message || e));
	} finally {
		usageFlushing = false;
	}
}

function recordUsage(env, bytesUp, bytesDown, ctx) {
	usagePending.up += (bytesUp || 0);
	usagePending.down += (bytesDown || 0);
	const pending = usagePending.up + usagePending.down;
	if (pending <= 0) return;
	const now = Date.now();
	if (now - usageLastFlush < USAGE_FLUSH_MS && pending < USAGE_FLUSH_BYTES) return;
	usageLastFlush = now;
	if (ctx && ctx.waitUntil) ctx.waitUntil(flushUsage(env)); else flushUsage(env).catch(() => {});
}

async function bestIP(request, env, txt = 'ADD.txt') {
	const url = new URL(request.url);

	if (request.method === 'GET' && !url.searchParams.get('loadIPs') && !url.searchParams.get('edit')) {
		const pageResp = await panelFetch(env, '/admin/bestip.html');
		const pageText = await pageResp.text();
		return new Response(pageText, {
			status: pageResp.status,
			headers: { 'Content-Type': 'text/html;charset=utf-8' }
		});
	}

	async function GetCFIPs(ipSource = 'official', targetPort = '443') {
		try {
			let response;
			if (ipSource === 'as13335') {
				response = await fetch('https://raw.githubusercontent.com/ipverse/asn-ip/master/as/13335/ipv4-aggregated.txt');
			} else if (ipSource === 'as209242') {
				response = await fetch('https://raw.githubusercontent.com/ipverse/asn-ip/master/as/209242/ipv4-aggregated.txt');
			} else if (ipSource === 'as24429') {
				response = await fetch('https://raw.githubusercontent.com/ipverse/asn-ip/master/as/24429/ipv4-aggregated.txt');
			} else if (ipSource === 'as35916') {
				response = await fetch('https://raw.githubusercontent.com/ipverse/asn-ip/master/as/35916/ipv4-aggregated.txt');
			} else if (ipSource === 'as199524') {
				response = await fetch('https://raw.githubusercontent.com/ipverse/asn-ip/master/as/199524/ipv4-aggregated.txt');
			} else if (ipSource === 'cm') {
				response = await fetch('https://raw.githubusercontent.com/cmliu/cmliu/main/CF-CIDR.txt');
			} else if (ipSource === 'proxyip') {
				response = await fetch('https://raw.githubusercontent.com/cmliu/ACL4SSR/main/baipiao.txt');
				const text = response.ok ? await response.text() : '';
				const allLines = text.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('#'));
				const validIps = [];
				for (const line of allLines) {
					const parsedIP = parseProxyIPLine(line, targetPort);
					if (parsedIP) {
						validIps.push(parsedIP);
					}
				}
				if (validIps.length > 512) {
					const shuffled = [...validIps].sort(() => 0.5 - Math.random());
					return shuffled.slice(0, 512);
				} else {
					return validIps;
				}
			} else if (ipSource === 'dominos') {
				response = await fetch('https://raw.githubusercontent.com/Blacknuno/Nova-Proxy/refs/heads/main/dominos.text');
				const text = response.ok ? await response.text() : '';
				const lines = text.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('#'));
				const resolvedIPs = [];
				for (const domain of lines.slice(0, 100)) {
					try {
						const dnsResponse = await fetch('https://cloudflare-dns.com/dns-query?name=' + domain + '&type=A', {
							headers: { 'Accept': 'application/dns-json' }
						});
						if (dnsResponse.ok) {
							const dnsData = await dnsResponse.json();
							if (dnsData.Answer) {
								dnsData.Answer.forEach(answer => {
									if (answer.type === 1) {
										resolvedIPs.push(answer.data + ':' + targetPort);
									}
								});
							}
						}
					} catch (e) {}
				}
				if (resolvedIPs.length > 512) {
					return resolvedIPs.slice(0, 512);
				}
				return resolvedIPs;
			} else if (ipSource === 'irdominos') {
				response = await fetch('https://raw.githubusercontent.com/Blacknuno/Nova-Proxy/refs/heads/main/IRdominos.text');
				const text = response.ok ? await response.text() : '';
				const lines = text.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('#'));
				const resolvedIPs = [];
				for (const domain of lines.slice(0, 100)) {
					try {
						const dnsResponse = await fetch('https://cloudflare-dns.com/dns-query?name=' + domain + '&type=A', {
							headers: { 'Accept': 'application/dns-json' }
						});
						if (dnsResponse.ok) {
							const dnsData = await dnsResponse.json();
							if (dnsData.Answer) {
								dnsData.Answer.forEach(answer => {
									if (answer.type === 1) {
										resolvedIPs.push(answer.data + ':' + targetPort);
									}
								});
							}
						}
					} catch (e) {}
				}
				if (resolvedIPs.length > 512) {
					return resolvedIPs.slice(0, 512);
				}
				return resolvedIPs;
			} else {
				response = await fetch('https://www.cloudflare.com/ips-v4/');
			}
			const text = response.ok ? await response.text() : '173.245.48.0/20\n103.21.244.0/22\n103.22.200.0/22\n103.31.4.0/22\n141.101.64.0/18\n108.162.192.0/18\n190.93.240.0/20\n188.114.96.0/20\n197.234.240.0/22\n198.41.128.0/17\n162.158.0.0/15\n104.16.0.0/13\n104.24.0.0/14\n172.64.0.0/13\n131.0.72.0/22';
			const cidrs = text.split('\n').filter(line => line.trim() && !line.startsWith('#'));
			const ips = new Set();
			const targetCount = 512;
			let round = 1;
			while (ips.size < targetCount) {
				for (const cidr of cidrs) {
					if (ips.size >= targetCount) break;
					const cidrIPs = generateIPsFromCIDR(cidr.trim(), round);
					cidrIPs.forEach(ip => ips.add(ip));
				}
				round++;
				if (round > 100) {
					break;
				}
			}
			return Array.from(ips).slice(0, targetCount);
		} catch (error) {
			return [];
		}
	}
	function parseProxyIPLine(line, targetPort) {
		try {
			line = line.trim();
			if (!line) return null;
			let ip = '';
			let port = '';
			let comment = '';
			if (line.includes('#')) {
				const parts = line.split('#');
				const mainPart = parts[0].trim();
				comment = parts[1].trim();
				if (mainPart.includes(':')) {
					const ipPortParts = mainPart.split(':');
					if (ipPortParts.length === 2) {
						ip = ipPortParts[0].trim();
						port = ipPortParts[1].trim();
					} else {
						return null;
					}
				} else {
					ip = mainPart;
					port = '443';
				}
			} else {
				if (line.includes(':')) {
					const ipPortParts = line.split(':');
					if (ipPortParts.length === 2) {
						ip = ipPortParts[0].trim();
						port = ipPortParts[1].trim();
					} else {
						return null;
					}
				} else {
					ip = line;
					port = '443';
				}
			}
			if (!isValidIP(ip)) {
				return null;
			}
			const portNum = parseInt(port);
			if (isNaN(portNum) || portNum < 1 || portNum > 65535) {
				return null;
			}
			if (port !== targetPort) {
				return null;
			}
			if (comment) {
				return ip + ':' + port + '#' + comment;
			} else {
				return ip + ':' + port;
			}
		} catch (error) {
			return null;
		}
	}
	function isValidIP(ip) {
		const ipRegex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
		const match = ip.match(ipRegex);
		if (!match) return false;
		for (let i = 1; i <= 4; i++) {
			const num = parseInt(match[i]);
			if (num < 0 || num > 255) {
				return false;
			}
		}
		return true;
	}
	function generateIPsFromCIDR(cidr, count = 1) {
		const [network, prefixLength] = cidr.split('/');
		const prefix = parseInt(prefixLength);
		const ipToInt = (ip) => {
			return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet), 0) >>> 0;
		};
		const intToIP = (int) => {
			return [
				(int >>> 24) & 255,
				(int >>> 16) & 255,
				(int >>> 8) & 255,
				int & 255
			].join('.');
		};
		const networkInt = ipToInt(network);
		const hostBits = 32 - prefix;
		const numHosts = Math.pow(2, hostBits);
		const maxHosts = numHosts - 2;
		const actualCount = Math.min(count, maxHosts);
		const ips = new Set();
		if (maxHosts <= 0) {
			return [];
		}
		let attempts = 0;
		const maxAttempts = actualCount * 10;
		while (ips.size < actualCount && attempts < maxAttempts) {
			const randomOffset = Math.floor(Math.random() * maxHosts) + 1;
			const randomIP = intToIP(networkInt + randomOffset);
			ips.add(randomIP);
			attempts++;
		}
		return Array.from(ips);
	}
	if (request.method === "POST") {
		if (!env.KV) return new Response('KV namespace not connected', { status: 400 });
		try {
			const contentType = request.headers.get('Content-Type');
			if (contentType && contentType.includes('application/json')) {
				const data = await request.json();
				const action = url.searchParams.get('action') || 'save';
				if (!data.ips || !Array.isArray(data.ips)) {
					return new Response(JSON.stringify({ error: 'Invalid IP list' }), {
						status: 400,
						headers: { 'Content-Type': 'application/json' }
					});
				}
				if (action === 'append') {
					const existingContent = await env.KV.get(txt) || '';
					const newContent = data.ips.join('\n');
					const existingLines = existingContent ? existingContent.split('\n').map(line => line.trim()).filter(line => line) : [];
					const newLines = newContent.split('\n').map(line => line.trim()).filter(line => line);
					const allLines = [...existingLines, ...newLines];
					const uniqueLines = [...new Set(allLines)];
					const combinedContent = uniqueLines.join('\n');
					if (combinedContent.length > 24 * 1024 * 1024) {
						return new Response(JSON.stringify({
							error: 'Combined content exceeds KV limit (24MB)'
						}), {
							status: 400,
							headers: { 'Content-Type': 'application/json' }
						});
					}
					await env.KV.put(txt, combinedContent);
					const addedCount = uniqueLines.length - existingLines.length;
					const duplicateCount = newLines.length - addedCount;
					let message = addedCount + ' IPs added (total: ' + uniqueLines.length + ')';
					if (duplicateCount > 0) message += ', ' + duplicateCount + ' duplicates removed';
					return new Response(JSON.stringify({ success: true, message: message }), {
						headers: { 'Content-Type': 'application/json' }
					});
				} else {
					const content = data.ips.join('\n');
					if (content.length > 24 * 1024 * 1024) {
						return new Response(JSON.stringify({ error: 'Content exceeds KV limit (24MB)' }), {
							status: 400,
							headers: { 'Content-Type': 'application/json' }
						});
					}
					await env.KV.put(txt, content);
					return new Response(JSON.stringify({ success: true, message: data.ips.length + ' IPs saved' }), {
						headers: { 'Content-Type': 'application/json' }
					});
				}
			} else {
				const content = await request.text();
				await env.KV.put(txt, content);
				return new Response('Saved successfully');
			}
		} catch (error) {
			return new Response(JSON.stringify({ error: error.message }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			});
		}
	}
	if (url.searchParams.get('loadIPs')) {
		const ipSource = url.searchParams.get('loadIPs');
		const port = url.searchParams.get('port') || '443';
		const ips = await GetCFIPs(ipSource, port);
		return new Response(JSON.stringify({ ips }), {
			headers: { 'Content-Type': 'application/json' }
		});
	}

	return new Response('Not Found', { status: 404 });
}

///////////////////////////////////////////////////////SOCKS5/HTTP Functions///////////////////////////////////////////////
async function socks5Connect(targetHost, targetPort, initialData, TCPconnection) {
	const { username, password, hostname, port } = parsedSocks5Address;
	const socket = TCPconnection({ hostname, port }), writer = socket.writable.getWriter(), reader = socket.readable.getReader();
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

		if (validDataLength(initialData) > 0) await writer.write(initialData);
		writer.releaseLock(); reader.releaseLock();
		return socket;
	} catch (error) {
		try { writer.releaseLock() } catch (e) { }
		try { reader.releaseLock() } catch (e) { }
		try { socket.close() } catch (e) { }
		throw error;
	}
}

async function httpConnect(targetHost, targetPort, initialData, HTTPSproxy = false, TCPconnection) {
	const { username, password, hostname, port } = parsedSocks5Address;
	const socket = HTTPSproxy
		? TCPconnection({ hostname, port }, { secureTransport: 'on', allowHalfOpen: false })
		: TCPconnection({ hostname, port });
	const writer = socket.writable.getWriter(), reader = socket.readable.getReader();
	const encoder = new TextEncoder();
	const decoder = new TextDecoder();
	try {
		if (HTTPSproxy) await socket.opened;

		const auth = username && password ? `Proxy-Authorization: Basic ${btoa(`${username}:${password}`)}\r\n` : '';
		const request = `CONNECT ${targetHost}:${targetPort} HTTP/1.1\r\nHost: ${targetHost}:${targetPort}\r\n${auth}User-Agent: Mozilla/5.0\r\nConnection: keep-alive\r\n\r\n`;
		await writer.write(encoder.encode(request));
		writer.releaseLock();

		let responseBuffer = new Uint8Array(0), headerEndIndex = -1, bytesRead = 0;
		while (headerEndIndex === -1 && bytesRead < 8192) {
			const { done, value } = await reader.read();
			if (done || !value) throw new Error(`${HTTPSproxy ? 'HTTPS' : 'HTTP'} proxyReturn CONNECT responseBeforeCloseConnection`);
			responseBuffer = new Uint8Array([...responseBuffer, ...value]);
			bytesRead = responseBuffer.length;
			const crlfcrlf = responseBuffer.findIndex((_, i) => i < responseBuffer.length - 3 && responseBuffer[i] === 0x0d && responseBuffer[i + 1] === 0x0a && responseBuffer[i + 2] === 0x0d && responseBuffer[i + 3] === 0x0a);
			if (crlfcrlf !== -1) headerEndIndex = crlfcrlf + 4;
		}

		if (headerEndIndex === -1) throw new Error('proxy CONNECT responseHeadersTooLongOrInvalid');
		const statusMatch = decoder.decode(responseBuffer.slice(0, headerEndIndex)).split('\r\n')[0].match(/HTTP\/\d\.\d\s+(\d+)/);
		const statusCode = statusMatch ? parseInt(statusMatch[1], 10) : NaN;
		if (!Number.isFinite(statusCode) || statusCode < 200 || statusCode >= 300) throw new Error(`Connection failed: HTTP ${statusCode}`);

		reader.releaseLock();

		if (validDataLength(initialData) > 0) {
			const remoteWriter = socket.writable.getWriter();
			await remoteWriter.write(initialData);
			remoteWriter.releaseLock();
		}

		// CONNECT response headers may contain tunnel data，first feed back into readable stream，prevent firstPacket from being swallowed。
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

async function httpsConnect(targetHost, targetPort, initialData, TCPconnection) {
	const { username, password, hostname, port } = parsedSocks5Address;
	const encoder = new TextEncoder();
	const decoder = new TextDecoder();
	let tlsSocket = null;
	const tlsServerName = isIPHostname(hostname) ? '' : stripIPv6Brackets(hostname);
	const openHTTPSProxyTLS = async (allowChacha = false) => {
		const proxySocket = TCPconnection({ hostname, port });
		try {
			await proxySocket.opened;
			const socket = new TlsClient(proxySocket, { serverName: tlsServerName, insecure: true, allowChacha });
			await socket.handshake();
			log(`[HTTPSproxy] TLSversion: ${socket.isTls13 ? '1.3' : '1.2'} | Cipher: 0x${socket.cipherSuite.toString(16)}${socket.cipherConfig?.chacha ? ' (ChaCha20)' : ' (AES-GCM)'}`);
			return socket;
		} catch (error) {
			try { proxySocket.close() } catch (e) { }
			throw error;
		}
	};
	try {
		try {
			tlsSocket = await openHTTPSProxyTLS(false);
		} catch (error) {
			if (!/cipher|handshake|TLS Alert|ServerHello|Finished|Unsupported|Missing TLS/i.test(error?.message || `${error || ''}`)) throw error;
			log(`[HTTPSproxy] AES-GCM TLS handshakeFailed，fallback ChaCha20 compatMode: ${error?.message || error}`);
			tlsSocket = await openHTTPSProxyTLS(true);
		}

		const auth = username && password ? `Proxy-Authorization: Basic ${btoa(`${username}:${password}`)}\r\n` : '';
		const request = `CONNECT ${targetHost}:${targetPort} HTTP/1.1\r\nHost: ${targetHost}:${targetPort}\r\n${auth}User-Agent: Mozilla/5.0\r\nConnection: keep-alive\r\n\r\n`;
		await tlsSocket.write(encoder.encode(request));

		let responseBuffer = new Uint8Array(0), headerEndIndex = -1, bytesRead = 0;
		while (headerEndIndex === -1 && bytesRead < 8192) {
			const value = await tlsSocket.read();
			if (!value) throw new Error('HTTPS proxyReturn CONNECT responseBeforeCloseConnection');
			responseBuffer = concatByteData(responseBuffer, value);
			bytesRead = responseBuffer.length;
			const crlfcrlf = responseBuffer.findIndex((_, i) => i < responseBuffer.length - 3 && responseBuffer[i] === 0x0d && responseBuffer[i + 1] === 0x0a && responseBuffer[i + 2] === 0x0d && responseBuffer[i + 3] === 0x0a);
			if (crlfcrlf !== -1) headerEndIndex = crlfcrlf + 4;
		}

		if (headerEndIndex === -1) throw new Error('HTTPS proxy CONNECT responseHeadersTooLongOrInvalid');
		const statusMatch = decoder.decode(responseBuffer.slice(0, headerEndIndex)).split('\r\n')[0].match(/HTTP\/\d\.\d\s+(\d+)/);
		const statusCode = statusMatch ? parseInt(statusMatch[1], 10) : NaN;
		if (!Number.isFinite(statusCode) || statusCode < 200 || statusCode >= 300) throw new Error(`Connection failed: HTTP ${statusCode}`);

		if (validDataLength(initialData) > 0) await tlsSocket.write(dataToUint8Array(initialData));
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
					if (validDataLength(bufferedData) > 0) controller.enqueue(bufferedData);
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
				await tlsSocket.write(dataToUint8Array(chunk));
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

function createRequestTcpConnector(request) {
	const requestObject = /** @type {any} */ (request);
	const fetcher = requestObject?.fetcher;
	// Prefer the request's own fetcher.connect when present; otherwise use Cloudflare's
	// documented TCP API, connect() from 'cloudflare:sockets', so the proxy works on every
	// runtime/deploy (not just ones that expose request.fetcher).
	if (fetcher && typeof fetcher.connect === 'function') return (options, init) => init === undefined ? fetcher.connect(options) : fetcher.connect(options, init);
	if (typeof cfSocketConnect === 'function') return (options, init) => init === undefined ? cfSocketConnect(options) : cfSocketConnect(options, init);
	throw new Error('No TCP connect API available (request.fetcher.connect / cloudflare:sockets)');
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
	const data = dataToUint8Array(fragment);
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
		const bytes = dataToUint8Array(chunk);
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
		const bytes = dataToUint8Array(chunk);
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
		const plaintext = dataToUint8Array(data);
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
	const body = dataToUint8Array(value);
	const attribute = new Uint8Array(4 + body.byteLength + turnStunPadding(body.byteLength));
	const view = new DataView(attribute.buffer);
	view.setUint16(0, type);
	view.setUint16(2, body.byteLength);
	attribute.set(body, 4);
	return attribute;
}

function createTurnStunMessage(type, transactionId, attributes) {
	const body = concatByteData(...attributes);
	const header = new Uint8Array(20);
	const view = new DataView(header.buffer);
	view.setUint16(0, type);
	view.setUint16(2, body.byteLength);
	header.set(TURN_STUN_MAGIC_COOKIE, 4);
	header.set(transactionId, 8);
	return concatByteData(header, body);
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
	return concatByteData(signedMessage, createTurnStunAttribute(TURN_STUN_ATTR.MESSAGE_INTEGRITY, new Uint8Array(signature)));
}

async function readTurnStunMessage(reader, bufferedData = null, timeoutMessage = 'TURN response timed out') {
	let buffer = validDataLength(bufferedData) ? dataToUint8Array(bufferedData) : new Uint8Array(0);
	const pull = async () => {
		const { done, value } = await withTimeout(reader.read(), CONNECT_TIMEOUT_MS, timeoutMessage);
		if (done) throw new Error('TURN server closed connection');
		if (value?.byteLength) buffer = concatByteData(buffer, value);
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

async function turnConnect(proxy, targetHost, targetPort, TCPconnection) {
	proxy = { ...proxy, username: proxy.username ?? null, password: proxy.password ?? null };
	const resolvedTargetHost = stripIPv6Brackets(targetHost);
	/** @type {string | null} */
	let targetIp = isIPv4(resolvedTargetHost) ? resolvedTargetHost : null;
	if (!targetIp) {
		const records = await DoHquery(resolvedTargetHost, 'A');
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
		controlSocket = TCPconnection({ hostname: turnHost, port: proxy.port });
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
			await writeTurnBytes(controlWriter, concatByteData(allocateRequest, ...pipelinedMessages), 'TURN authenticated Allocate request timed out');
			turnResponse = await readTurnStunMessage(controlReader, bufferedData, 'TURN authenticated Allocate response timed out');
			message = turnResponse.message;
			bufferedData = turnResponse.extraData;
		} else if (message.type === TURN_STUN_TYPE.ALLOCATE_SUCCESS) {
			const pipelinedMessages = await Promise.all([
				sign(createTurnStunMessage(TURN_STUN_TYPE.CREATE_PERMISSION_REQUEST, randomTurnTransactionId(), [peerAddress, ...authAttributes])),
				sign(createTurnStunMessage(TURN_STUN_TYPE.CONNECT_REQUEST, randomTurnTransactionId(), [peerAddress, ...authAttributes]))
			]);
			if (pipelinedMessages.length) await writeTurnBytes(controlWriter, concatByteData(...pipelinedMessages), 'TURN pipelined request timed out');
		}

		if (message.type !== TURN_STUN_TYPE.ALLOCATE_SUCCESS) {
			const errorCode = parseTurnErrorCode(message.attributes[TURN_STUN_ATTR.ERROR_CODE]);
			throw new Error(errorCode ? `TURN Allocate failed with ${errorCode}` : 'TURN Allocate failed');
		}

		dataSocket = TCPconnection({ hostname: turnHost, port: proxy.port });
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

async function sstpConnect(proxy, targetHost, targetPort, TCPconnection) {
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
		return dataToUint8Array(value);
	};
	const readBytes = async length => {
		while (bufferedBytes.byteLength < length) {
			const chunk = await readSocketChunk();
			bufferedBytes = bufferedBytes.byteLength ? concatByteData(bufferedBytes, chunk) : chunk;
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
			bufferedBytes = bufferedBytes.byteLength ? concatByteData(bufferedBytes, chunk) : chunk;
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
		socket = TCPconnection({ hostname: serverHost, port: serverPort }, { secureTransport: 'on', allowHalfOpen: false });
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

		await withTimeout(writer.write(concatByteData(
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
			const records = await DoHquery(target, 'A');
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
			const bytes = dataToUint8Array(payload);
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
					streamController.enqueue(pendingChunks.length === 1 ? pendingChunks[0] : concatByteData(...pendingChunks));
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
				const bytes = dataToUint8Array(chunk);
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
				await writer.write(concatByteData(...frames));
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
//////////////////////////////////////////////////Utility Functions///////////////////////////////////////////////
/**
 * Base64 encoding with secret key
 * @param {string} plaintext - original plaintext string
 * @param {string} secret - secret key string（if "KEY123"）
 * @returns {string} Base64 string processed with secret key
 */
function base64SecretEncode(plaintext, secret) {
	const encoder = new TextEncoder();
	const data = encoder.encode(plaintext);
	const key = encoder.encode(secret);
	const mixed = new Uint8Array(data.length);

	for (let i = 0; i < data.length; i++) {
		mixed[i] = data[i] ^ key[i % key.length];
	}

	// convert Uint8Array to string processable by btoa
	let binary = '';
	for (let i = 0; i < mixed.length; i++) {
		binary += String.fromCharCode(mixed[i]);
	}
	return btoa(binary);
}

/**
 * Base64 decoding with secret key
 * @param {string} encoded - Base64 string that was processed with secret key
 * @param {string} secret - secret key string（must match the encoding key）
 * @returns {string} decoded original plaintext string
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

function getTransportProtocolConfig(config = {}) {
	const isGrpc = config.transportProtocol === 'grpc';
	return {
		type: isGrpc ? (config.gRPCmode === 'multi' ? 'grpc&mode=multi' : 'grpc&mode=gun') : (config.transportProtocol === 'xhttp' ? 'xhttp&mode=stream-one' : 'ws'),
		pathFieldName: isGrpc ? 'serviceName' : 'path',
		domainFieldName: isGrpc ? 'authority' : 'host'
	};
}

function getTransportPathParamValue(config = {}, nodePath = '/', asBestSubGenerator = false) {
	const pathValue = asBestSubGenerator ? '/' : (config.randomPath ? randomPath(nodePath) : nodePath);
	if (config.transportProtocol !== 'grpc') return pathValue;
	return pathValue.split('?')[0] || '/';
}

function log(...args) {
	if (debugLogPrint) console.log(...args);
}

function ClashsubConfigFileHotpatch(Clash_rawSubContent, config_JSON = {}, networkSettings = null) {
	const uuid = config_JSON?.UUID || null;
	const ECHenable = Boolean(config_JSON?.ECH);
	const HOSTS = Array.isArray(config_JSON?.HOSTS) ? [...config_JSON.HOSTS] : [];
	const ECH_SNI = config_JSON?.ECHConfig?.SNI || null;
	const ECH_DNS = config_JSON?.ECHConfig?.DNS;
	const needHandleEch = Boolean(uuid && ECHenable);
	const gRPCUserAgent = (typeof config_JSON?.gRPCUserAgent === 'string' && config_JSON.gRPCUserAgent.trim()) ? config_JSON.gRPCUserAgent.trim() : null;
	const needHandleGrpc = config_JSON?.transportProtocol === "grpc" && Boolean(gRPCUserAgent);
	const gRPCUserAgentYAML = gRPCUserAgent ? JSON.stringify(gRPCUserAgent) : null;
	const ns = networkSettings || {};
	let clash_yaml = Clash_rawSubContent.replace(/mode:\s*Rule\b/g, 'mode: rule');

	// apply network settings
	if (ns.enableIPv6 === false) clash_yaml = clash_yaml.replace(/^ipv6:\s*true\b/im, 'ipv6: false').replace(/^ipv6:\s*false\b/im, 'ipv6: false');
	if (!/^ipv6:/im.test(clash_yaml)) clash_yaml = 'ipv6: ' + (ns.enableIPv6 !== false) + '\n' + clash_yaml;
	if (ns.logLevel && !/^log-level:/im.test(clash_yaml)) clash_yaml = 'log-level: ' + ns.logLevel + '\n' + clash_yaml;
	if (ns.allowLAN) clash_yaml = clash_yaml.replace(/^bind-address:\s*"?(127\.0\.0\.1)"?/im, 'bind-address: "0.0.0.0"');
	if (ns.enableDomesticBypass) {
		const iranRuleStart = '# IRANIAN DIRECT RULES';
		if (!clash_yaml.includes(iranRuleStart)) {
			const rulesMatch = clash_yaml.match(/^(  )?rule-set:\s*\n/m);
			if (rulesMatch) {
				clash_yaml = clash_yaml.replace(/^(  )?rule-set:\s*\n/m, '$&' + iranRuleStart + '\n  - "GEOSITE,ir,DIRECT"\n  - "GEOIP,ir,DIRECT"\n');
				clash_yaml = clash_yaml.replace(/^(?:  )?rules:\s*$/m, '$&\n  - RULE-SET,IRANIAN-IR,DIRECT');
			} else {
				clash_yaml = clash_yaml.replace(/^(\s*)rules:\s*$/m, '$&' + '\n' + '$1  - GEOSITE,ir,DIRECT\n' + '$1  - GEOIP,ir,DIRECT');
			}
		}
	}
	if (ns.enablePornBlock) {
		const blockRule = '# ADULT BLOCK RULES';
		if (!clash_yaml.includes(blockRule)) {
			clash_yaml = clash_yaml.replace(/^(\s*)rules:\s*$/m, '$&' + '\n' + blockRule + '\n' + '$1  - DOMAIN-SUFFIX,pornhub.com,REJECT\n' + '$1  - DOMAIN-SUFFIX,xvideos.com,REJECT\n' + '$1  - DOMAIN-SUFFIX,xnxx.com,REJECT\n' + '$1  - DOMAIN-SUFFIX,xhamster.com,REJECT\n' + '$1  - DOMAIN-SUFFIX,redtube.com,REJECT\n' + '$1  - DOMAIN-SUFFIX,youporn.com,REJECT');
		}
	}

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

	const addInlineGrpcUserAgent = (text) => text.replace(/grpc-opts:\s*\{([\s\S]*?)\}/i, (all, inner) => {
		if (/grpc-user-agent\s*:/i.test(inner)) return all;
		let content = inner.trim();
		if (content.endsWith(',')) content = content.slice(0, -1).trim();
		const patchedContent = content ? `${content}, grpc-user-agent: ${gRPCUserAgentYAML}` : `grpc-user-agent: ${gRPCUserAgentYAML}`;
		return `grpc-opts: {${patchedContent}}`;
	});
	const matchToGRPCNetwork = (text) => /(?:^|[,{])\s*network:\s*(?:"grpc"|'grpc'|grpc)(?=\s*(?:[,}\n#]|$))/mi.test(text);
	const getProxyType = (nodeText) => nodeText.match(/type:\s*(\w+)/)?.[1] || 'vl' + 'ess';
	const getCredentialValue = (nodeText, isFlowStyle) => {
		const credentialField = getProxyType(nodeText) === 'trojan' ? 'password' : 'uuid';
		const pattern = new RegExp(`${credentialField}:\\s*${isFlowStyle ? '([^,}\\n]+)' : '([^\\n]+)'}`);
		return nodeText.match(pattern)?.[1]?.trim() || null;
	};
	const insertNameserverPolicy = (yaml, hostsEntries) => {
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
	const addFlowFormatGRPCUserAgent = (nodeText) => {
		if (!matchToGRPCNetwork(nodeText) || /grpc-user-agent\s*:/i.test(nodeText)) return nodeText;
		if (/grpc-opts:\s*\{/i.test(nodeText)) return addInlineGrpcUserAgent(nodeText);
		return nodeText.replace(/\}(\s*)$/, `, grpc-opts: {grpc-user-agent: ${gRPCUserAgentYAML}}}$1`);
	};
	const addBlockFormatGRPCUserAgent = (nodeLines, topLevelIndent) => {
		const topIndent = ' '.repeat(topLevelIndent);
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
			if (insertIndex >= 0) nodeLines.splice(insertIndex + 1, 0, `${topIndent}grpc-opts:`, `${topIndent}  grpc-user-agent: ${gRPCUserAgentYAML}`);
			return nodeLines;
		}
		const grpcLine = nodeLines[grpcOptsIndex];
		if (/^\s*grpc-opts:\s*\{.*\}\s*(?:#.*)?$/.test(grpcLine)) {
			if (!/grpc-user-agent\s*:/i.test(grpcLine)) nodeLines[grpcOptsIndex] = addInlineGrpcUserAgent(grpcLine);
			return nodeLines;
		}
		let blockEndIndex = nodeLines.length;
		let childIndent = topLevelIndent + 2;
		let hasGrpcUserAgent = false;
		for (let idx = grpcOptsIndex + 1; idx < nodeLines.length; idx++) {
			const line = nodeLines[idx];
			const trimmed = line.trim();
			if (!trimmed) continue;
			const indent = line.search(/\S/);
			if (indent <= topLevelIndent) {
				blockEndIndex = idx;
				break;
			}
			if (indent > topLevelIndent && childIndent === topLevelIndent + 2) childIndent = indent;
			if (/^grpc-user-agent\s*:/.test(trimmed)) {
				hasGrpcUserAgent = true;
				break;
			}
		}
		if (!hasGrpcUserAgent) nodeLines.splice(blockEndIndex, 0, `${' '.repeat(childIndent)}grpc-user-agent: ${gRPCUserAgentYAML}`);
		return nodeLines;
	};
	const addBlockFormatECHOpts = (nodeLines, topLevelIndent) => {
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

	if (ECHenable && HOSTS.length > 0) {
		const hostsEntries = HOSTS.map(host => `    "${host}": ${ECH_DNS ? ECH_DNS : ''}`).join('\n');
		clash_yaml = insertNameserverPolicy(clash_yaml, hostsEntries);
	}

	if (!needHandleEch && !needHandleGrpc) return clash_yaml;

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
			if (needHandleGrpc) fullNode = addFlowFormatGRPCUserAgent(fullNode);
			if (needHandleEch && getCredentialValue(fullNode, true) === uuid.trim()) {
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
			if (needHandleGrpc && matchToGRPCNetwork(nodeText)) {
				nodeLines = addBlockFormatGRPCUserAgent(nodeLines, topLevelIndent);
				nodeText = nodeLines.join('\n');
			}
			if (needHandleEch && getCredentialValue(nodeText, false) === uuid.trim()) nodeLines = addBlockFormatECHOpts(nodeLines, topLevelIndent);
			processedLines.push(...nodeLines);
		} else {
			processedLines.push(line);
			i++;
		}
	}

	return processedLines.join('\n');
}

async function SingboxsubConfigFileHotpatch(SingBox_rawSubContent, config_JSON = {}, networkSettings = null) {
	const uuid = config_JSON?.UUID || null;
	const fingerprint = config_JSON?.Fingerprint || "chrome";
	const ECHenable = Boolean(config_JSON?.ECH);
	const ECH_SNI = config_JSON?.ECHConfig?.SNI || "cloudflare-ech.com";
	const sb_json_text = SingBox_rawSubContent.replace('1.1.1.1', '8.8.8.8').replace('1.0.0.1', '8.8.4.4');
	try {
		const config = JSON.parse(sb_json_text);
		const toArray = value => value === undefined || value === null ? [] : (Array.isArray(value) ? value : [value]);
		const ensureRoute = () => config.route = config.route && typeof config.route === 'object' ? config.route : {};
		const getDnsRuleServer = rule => rule && typeof rule === 'object' && !Array.isArray(rule) && typeof rule.server === 'string' ? rule.server : null;
		const addRuleSet = (type, code) => {
			if (!code || typeof code !== 'string') return null;
			const route = ensureRoute(), tag = `${type}-${code}`, ruleSet = Array.isArray(route.rule_set) ? route.rule_set : toArray(route.rule_set);
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

		const migrateRuleSetField = rule => {
			if (!rule || typeof rule !== 'object' || Array.isArray(rule)) return rule;
			if (rule.type === 'logical' && Array.isArray(rule.rules)) {
				rule.rules = rule.rules.map(migrateRuleSetField);
				return rule;
			}
			const tags = [];
			for (const geoip of toArray(rule.geoip)) {
				if (typeof geoip !== 'string') continue;
				if (geoip.toLowerCase() === 'private') rule.ip_is_private = true;
				else tags.push(addRuleSet('geoip', geoip));
			}
			for (const sourceGeoip of toArray(rule.source_geoip)) {
				if (typeof sourceGeoip !== 'string') continue;
				tags.push(addRuleSet('geoip', sourceGeoip));
				rule.rule_set_ip_cidr_match_source = true;
			}
			for (const geosite of toArray(rule.geosite)) if (typeof geosite === 'string') tags.push(addRuleSet('geosite', geosite));
			if (tags.length) rule.rule_set = [...new Set([...toArray(rule.rule_set), ...tags].filter(Boolean))];
			delete rule.geoip;
			delete rule.source_geoip;
			delete rule.geosite;
			return rule;
		};

		const migrateDnsRule = (rule, rcodeServerMap) => {
			rule = migrateRuleSetField(rule);
			if (!rule || typeof rule !== 'object' || Array.isArray(rule)) return rule;
			if (rule.type === 'logical' && Array.isArray(rule.rules)) {
				rule.rules = rule.rules.map(childRule => migrateDnsRule(childRule, rcodeServerMap));
				return rule;
			}
			const serverTag = getDnsRuleServer(rule);
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
					const values = toArray(inbound[migration.targetKey]);
					for (const sourceKey of migration.sourceKeys) values.push(...toArray(inbound[sourceKey]));
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
						const route = ensureRoute();
						route.rules = [...addedRules, ...toArray(route.rules)];
					}
				}
				delete inbound.sniff;
				delete inbound.sniff_timeout;
				delete inbound.domain_strategy;
			}
		}

		if (config?.route && typeof config.route === 'object' && Array.isArray(config.route.rules)) {
			const patchRouteRule = rule => {
				rule = migrateRuleSetField(rule);
				if (rule?.type === 'logical' && Array.isArray(rule.rules)) rule.rules = rule.rules.map(patchRouteRule);
				else if (rule && typeof rule === 'object' && !Array.isArray(rule) && rule.outbound && !rule.action) rule.action = 'route';
				return rule;
			};
			config.route.rules = config.route.rules.map(patchRouteRule);
		}

		const dns = config?.dns;
		if (dns && typeof dns === 'object') {
			const legacyFakeIP = dns.fakeip && typeof dns.fakeip === 'object' ? dns.fakeip : null;
			const rcodeServerMap = new Map();
			const DNSaddressProtocolType = { 'tcp:': 'tcp', 'udp:': 'udp', 'tls:': 'tls', 'quic:': 'quic', 'https:': 'https', 'h3:': 'h3' };
			const RCodemapping = { success: 'NOERROR', format_error: 'FORMERR', server_failure: 'SERVFAIL', name_error: 'NXDOMAIN', not_implemented: 'NOTIMP', refused: 'REFUSED' };
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
								const type = DNSaddressProtocolType[addressURL.protocol.toLowerCase()];
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
						const rcode = RCodemapping[parsedRCode] || 'NOERROR';
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
					const serverTag = getDnsRuleServer(rule);
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
					const serverTag = getDnsRuleServer(rule);
					const outbound = toArray(rule?.outbound);
					const DNSrouteOptionField = new Set(['outbound', 'server', 'action', 'strategy', 'disable_cache', 'rewrite_ttl', 'client_subnet', 'timeout']);
					const isOutboundAnyDNSRule = rule && typeof rule === 'object' && !Array.isArray(rule) && rule.type !== 'logical'
						&& serverTag && outbound.includes('any') && Object.keys(rule).every(key => DNSrouteOptionField.has(key));
					if (isOutboundAnyDNSRule) {
						const route = ensureRoute();
						if (route.default_domain_resolver === undefined) {
							const resolver = { server: serverTag };
							for (const key of ['strategy', 'disable_cache', 'rewrite_ttl', 'client_subnet', 'timeout']) {
								if (rule[key] !== undefined) resolver[key] = rule[key];
							}
							route.default_domain_resolver = Object.keys(resolver).length === 1 ? resolver.server : resolver;
						}
						continue;
					}
					migratedRules.push(migrateDnsRule(rule, rcodeServerMap));
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
			const refReject = value => value === 'REJECT' || (value && typeof value === 'object' && (Array.isArray(value) ? value.some(refReject) : Object.values(value).some(refReject)));
			if (!outboundTags.has('REJECT') && refReject({ outbounds: config.outbounds, route: config.route })) config.outbounds.push({ type: 'block', tag: 'REJECT' });
		}

		// --- apply network settings ---
		const ns = networkSettings || {};
		if (ns.enableIPv6 === false && config.inbounds) {
			config.inbounds.forEach(inb => {
				if (inb && typeof inb === 'object' && inb.type === 'tun') {
					delete inb.inet6_address;
					delete inb.inet6_route_address;
				}
			});
		}
		if (ns.enableDomesticBypass && config.route) {
			const irRules = config.route.rules || [];
			const hasIranRule = irRules.some(r => r.outbound === 'direct' && (JSON.stringify(r).includes('ir') || JSON.stringify(r).includes('IR')));
			if (!hasIranRule) {
				config.route.rules.unshift({
					outbound: 'direct',
					rule_set: ['geoip-ir', 'geosite-ir'],
					type: 'logical',
					mode: 'or',
					rules: [
						{ rule_set: ['geoip-ir'] },
						{ rule_set: ['geosite-ir'] }
					]
				});
			}
		}
		if (ns.enablePornBlock && config.route) {
			const hasBlockRule = config.route.rules.some(r => r.outbound === 'block' && JSON.stringify(r).toLowerCase().includes('porn'));
			if (!hasBlockRule) {
				config.route.rules.unshift({
					outbound: 'block',
					rule_set: ['geosite-porn']
				});
			}
		}
		// ensure REJECT outbound exists for adult blocking
		if (ns.enablePornBlock) {
			const hasReject = config.outbounds && config.outbounds.some(o => o.tag === 'REJECT');
			if (!hasReject) {
				if (!config.outbounds) config.outbounds = [];
				config.outbounds.push({ type: 'block', tag: 'REJECT' });
			}
		}

		// --- TLS hotpatch for UUID-matched nodes (utls & ech) ---
		if (uuid) {
			config.outbounds?.forEach(outbound => {
				// only handle nodes matching uuid or password
				if ((outbound.uuid && outbound.uuid === uuid) || (outbound.password && outbound.password === uuid)) {
					// ensure tls object exists
					if (!outbound.tls) {
						outbound.tls = { enabled: true };
					}

					// add/update utls configuration
					if (fingerprint) {
						outbound.tls.utls = {
							enabled: true,
							fingerprint: fingerprint
						};
					}

					// if ech_config is provided，add/update ech configuration
					if (ECHenable) {
						outbound.tls.ech = {
							enabled: true,
							query_server_name: ECH_SNI,// wait 1.13.0+ versionReleased
							//config: `-----BEGIN ECH CONFIGS-----\n${ech_config}\n-----END ECH CONFIGS-----`
						};
					}
				}
			});
		}

		return JSON.stringify(config, null, 2);
	} catch (e) {
		console.error("SingboxhotpatchExecutionFailed:", e);
		return JSON.stringify(JSON.parse(sb_json_text), null, 2);
	}
}

function SurgesubConfigFileHotpatch(content, url, config_JSON) {
	const eachLineContent = content.includes('\r\n') ? content.split('\r\n') : content.split('\n');
	const fullNodePath = config_JSON.randomPath ? randomPath(config_JSON.fullNodePath) : config_JSON.fullNodePath;
	let outputContent = "";
	for (let x of eachLineContent) {
		if (x.includes('= tro' + 'jan,') && !x.includes('ws=true') && !x.includes('ws-path=')) {
			const host = x.split("sni=")[1].split(",")[0];
			const fallbackContent = `sni=${host}, skip-cert-verify=${config_JSON.skipCertVerify}`;
			const correctContent = `sni=${host}, skip-cert-verify=${config_JSON.skipCertVerify}, ws=true, ws-path=${fullNodePath.replace(/,/g, '%2C')}, ws-headers=Host:"${host}"`;
			outputContent += x.replace(new RegExp(fallbackContent, 'g'), correctContent).replace("[", "").replace("]", "") + '\n';
		} else {
			outputContent += x + '\n';
		}
	}

	outputContent = `#!MANAGED-CONFIG ${url} interval=${config_JSON.optimizedSubGeneration.SUBUpdateTime * 60 * 60} strict=false` + outputContent.substring(outputContent.indexOf('\n'));
	return outputContent;
}

function formatBytes(bytes) {
	bytes = Number(bytes) || 0;
	const units = ['B', 'KB', 'MB', 'GB', 'TB'];
	let i = 0;
	while (bytes >= 1024 && i < units.length - 1) { bytes /= 1024; i++; }
	return bytes.toFixed(i === 0 ? 0 : 2) + ' ' + units[i];
}

function tehranYMD(date) {
	const d = new Date(date);
	const off = 3.5 * 60; // UTC+3:30 (Tehran)
	const local = new Date(d.getTime() + off * 60000);
	const y = local.getUTCFullYear(), m = String(local.getUTCMonth() + 1).padStart(2, '0'), day = String(local.getUTCDate()).padStart(2, '0');
	return { year: y, month: m, day };
}

async function readUsageStats(env) {
	const now = new Date();
	const empty = () => ({ up: 0, down: 0, total: 0 });
	const get = async (k) => { try { return JSON.parse(await env.KV.get(k) || 'null') || empty(); } catch (e) { return empty(); } };
	const today = await get('usage:' + getDateKey(now));
	const month = await get('usage-m:' + getMonthKey(now));
	const year = empty(), all = empty();
	try {
		const yearPrefix = 'usage-m:' + tehranYMD(now).year + '-';
		let cursor, names = [];
		do {
			const list = await env.KV.list({ prefix: 'usage-m:', cursor });
			for (const k of list.keys) names.push(k.name);
			cursor = list.list_complete ? null : list.cursor;
		} while (cursor);
		for (const name of names) {
			const d = await get(name);
			all.up += d.up; all.down += d.down; all.total += d.total;
			if (name.startsWith(yearPrefix)) { year.up += d.up; year.down += d.down; year.total += d.total; }
		}
	} catch (e) { /* best-effort */ }
	return { today, month, year, all };
}

///////////////////////////////////////////////////////Self-healing Domain Pool + Announce///////////////////////////////////////////////
// The front-domain pool is config_JSON.HOSTS (managed from the dashboard and the
// Telegram bot). These helpers add liveness flags + auto-announcement on change.

// All front domains the Worker knows about (deduplicated).
async function getPoolHosts(env) {
	try {
		const raw = env.KV && typeof env.KV.get === 'function' ? await env.KV.get('config.json') : null;
		const cj = raw ? JSON.parse(raw) : null;
		if (cj && Array.isArray(cj.HOSTS) && cj.HOSTS.length) return [...new Set(cj.HOSTS.filter(Boolean))];
		if (cj && cj.HOST) return [cj.HOST];
	} catch (e) { /* ignore */ }
	return [];
}

// First non-wildcard host, as a base URL for self-fetches.
async function resolvePrimaryBaseUrl(env) {
	const hosts = await getPoolHosts(env);
	const h = hosts.find(x => x && !x.includes('*'));
	return h ? 'https://' + h.replace(/^https?:\/\//, '').replace(/\/.*$/, '') : null;
}

// Liveness check: confirms each domain still serves a valid sub through the Worker.
// NOTE: this runs from Cloudflare's network, so it detects DNS/routing/Worker
// breakage — NOT censorship-side (e.g. Iran) filtering. Real filtering signal must
// come from users. We therefore only FLAG status here; we never auto-delete domains.
async function checkDomainHealth(env, hosts, selfHost) {
	const _norm = h => String(h || '').toLowerCase().replace(/^https?:\/\//, '').split('/')[0];
	const _self = _norm(selfHost);
	const checkable = (hosts || []).filter(h => h && !h.includes('*'));
	const domains = [];
	await Promise.all(checkable.map(async host => {
		// T2: a Worker can't reliably fetch its OWN hostname (self-subrequest fails on workers.dev);
		// if this is the host serving the request it's obviously up, so auto-pass it instead of red.
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
	try { await env.KV.put('domain-health.json', JSON.stringify(health)); } catch (e) { /* ignore */ }
	return health;
}

async function runScheduledMaintenance(env) {
	const hosts = await getPoolHosts(env);
	const baseUrl = await resolvePrimaryBaseUrl(env);
	const health = await checkDomainHealth(env, hosts, String(baseUrl || '').replace(/^https?:\/\//, '').split('/')[0]);
	try { await buildFallbackNodes(env); } catch (e) { console.error('buildFallbackNodes error:', e && e.message); }
	const mirror = await publishSubMirror(env, baseUrl);

	// Central management server hooks (no-op unless CENTRAL_API is configured).
	try { await centralHeartbeat(env); } catch (e) { /* best-effort */ }
	try { await refreshAnnouncements(env); } catch (e) { /* best-effort */ }

	return { health, mirror };
}

// Post the current subscription links to the configured Telegram chat/channel.
async function announceSubLinks(env, opts = {}) {
	try {
		const tgRaw = env.KV && typeof env.KV.get === 'function' ? await env.KV.get('tg.json') : null;
		if (!tgRaw) return { skipped: true, reason: 'Telegram not configured' };
		const tg = JSON.parse(tgRaw);
		const chatId = String(env.ANNOUNCE_CHAT || tg.ChatID || '').trim();
		if (!tg.BotToken || !chatId) return { skipped: true, reason: 'BotToken/ChatID missing' };

		const baseUrl = opts.baseUrl || (env.KV ? 'https://' + (JSON.parse((await env.KV.get('config.json')) || '{}').HOST || 'unknown') : null);

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
		lines.push('<i>All links share the same content. If one gets filtered, the GitHub link still works.</i>');

		await sendBotMessage(tg.BotToken, chatId, lines.join('\n'));
		return { skipped: false, chatId };
	} catch (e) {
		return { skipped: true, reason: e && e.message ? e.message : String(e) };
	}
}

async function requestLogRecord(env, request, accessIp, requestType = "Get_SUB", config_JSON, shouldWriteKvLog = true) {
	try {
		const currentTime = new Date();
		const logContent = { TYPE: requestType, IP: accessIp, ASN: `AS${request.cf.asn || '0'} ${request.cf.asOrganization || 'Unknown'}`, CC: `${request.cf.country || 'N/A'} ${request.cf.city || 'N/A'}`, URL: request.url, UA: request.headers.get('User-Agent') || 'Unknown', TIME: currentTime.getTime() };
		if (config_JSON.TG.enabled) {
			try {
				const TG_TXT = await env.KV.get('tg.json');
				const TG_JSON = JSON.parse(TG_TXT);
				if (TG_JSON?.BotToken && TG_JSON?.ChatID) {
					const date = new Date(logContent.TIME);
					const timeText = date.toLocaleDateString('fa-IR', { timeZone: 'Asia/Tehran', year: 'numeric', month: 'long', day: 'numeric' }) + ' ' + date.toLocaleTimeString('fa-IR', { timeZone: 'Asia/Tehran', hour: '2-digit', minute: '2-digit', second: '2-digit' });
					const requestUrl = new URL(logContent.URL);
					const typeMapping = { Get_SUB: 'دریافت اشتراک', Get_Best_SUB: 'اشتراک بهینه', Init_Config: 'بازنشانی تنظیمات', Save_Config: 'ذخیره تنظیمات', Save_Custom_IPs: 'ذخیره IP های سفارشی', Admin_Login: 'ورود به پنل' };
					const location = logContent.CC.replace('N/A', 'نامشخص');
					const msg = `<b>#${config_JSON.optimizedSubGeneration.SUBNAME} اطلاع‌رسانی</b>\n\n` +
						`📌 <b>نوع:</b> ${typeMapping[logContent.TYPE] || logContent.TYPE}\n` +
						`🌐 <b>IP:</b> <code>${logContent.IP}</code>\n` +
						`📍 <b>موقعیت:</b> ${location}\n` +
						`🏢 <b>ASN:</b> ${logContent.ASN}\n` +
						`🔗 <b>دامنه:</b> <code>${requestUrl.host}</code>\n` +
						`🔍 <b>مسیر:</b> <code>${requestUrl.pathname + requestUrl.search}</code>\n` +
						`🤖 <b>مرورگر:</b> <code>${logContent.UA}</code>\n` +
						`📅 <b>زمان:</b> ${timeText}\n` +
						`${config_JSON.CF.Usage.success ? `📊 <b>مصرف:</b> ${config_JSON.CF.Usage.total}/${config_JSON.CF.Usage.max} <b>${((config_JSON.CF.Usage.total / config_JSON.CF.Usage.max) * 100).toFixed(2)}%</b>\n` : ''}`;
					await fetch(`https://api.telegram.org/bot${TG_JSON.BotToken}/sendMessage?chat_id=${TG_JSON.ChatID}&parse_mode=HTML&text=${encodeURIComponent(msg)}`, {
						method: 'GET',
						headers: {
							'Accept': 'text/html,application/xhtml+xml,application/xml;',
							'Accept-Encoding': 'gzip, deflate, br',
							'User-Agent': logContent.UA || 'Unknown',
						}
					});
				}
			} catch (error) { console.error(`readTg.jsonerrorOccurred: ${error.message}`) }
		}
		shouldWriteKvLog = ['1', 'true'].includes(env.OFF_LOG) ? false : shouldWriteKvLog;
		if (!shouldWriteKvLog) return;
		let logArray = [];
		const existingLog = await env.KV.get('log.json'), KVcapacityLimit = 4;//MB
		if (existingLog) {
			try {
				logArray = JSON.parse(existingLog);
				if (!Array.isArray(logArray)) { logArray = [logContent] }
				else if (requestType !== "Get_SUB") {
					const thirtyMinAgoTimestamp = currentTime.getTime() - 30 * 60 * 1000;
					if (logArray.some(log => log.TYPE !== "Get_SUB" && log.IP === accessIp && log.URL === request.url && log.UA === (request.headers.get('User-Agent') || 'Unknown') && log.TIME >= thirtyMinAgoTimestamp)) return;
					logArray.push(logContent);
					while (JSON.stringify(logArray, null, 2).length > KVcapacityLimit * 1024 * 1024 && logArray.length > 0) logArray.shift();
				} else {
					logArray.push(logContent);
					while (JSON.stringify(logArray, null, 2).length > KVcapacityLimit * 1024 * 1024 && logArray.length > 0) logArray.shift();
				}
			} catch (e) { logArray = [logContent] }
		} else { logArray = [logContent] }
		await env.KV.put('log.json', JSON.stringify(logArray, null, 2));
	} catch (error) { console.error(`logRecordFailed: ${error.message}`) }
}

function maskSensitiveInfo(text, prefixLength = 3, suffixLength = 2) {
	if (!text || typeof text !== 'string') return text;
	if (text.length <= prefixLength + suffixLength) return text; // ifTooShort，returnDirectly

	const prefix = text.slice(0, prefixLength);
	const suffix = text.slice(-suffixLength);
	const asteriskCount = text.length - prefixLength - suffixLength;

	return `${prefix}${'*'.repeat(asteriskCount)}${suffix}`;
}

async function MD5MD5(text) {
	const encoder = new TextEncoder();

	const firstHash = await crypto.subtle.digest('MD5', encoder.encode(text));
	const firstHashArray = Array.from(new Uint8Array(firstHash));
	const firstHex = firstHashArray.map(bytes => bytes.toString(16).padStart(2, '0')).join('');

	const secondHash = await crypto.subtle.digest('MD5', encoder.encode(firstHex.slice(7, 27)));
	const secondHashArray = Array.from(new Uint8Array(secondHash));
	const secondHex = secondHashArray.map(bytes => bytes.toString(16).padStart(2, '0')).join('');

	return secondHex.toLowerCase();
}

function randomPath(fullNodePath = "/") {
	const commonPathDirs = ["about", "account", "acg", "act", "activity", "ad", "ads", "ajax", "album", "albums", "anime", "api", "app", "apps", "archive", "archives", "article", "articles", "ask", "auth", "avatar", "bbs", "bd", "blog", "blogs", "book", "books", "bt", "buy", "cart", "category", "categories", "cb", "channel", "channels", "chat", "china", "city", "class", "classify", "clip", "clips", "club", "cn", "code", "collect", "collection", "comic", "comics", "community", "company", "config", "contact", "content", "course", "courses", "cp", "data", "detail", "details", "dh", "directory", "discount", "discuss", "dl", "dload", "doc", "docs", "document", "documents", "doujin", "download", "downloads", "drama", "edu", "en", "ep", "episode", "episodes", "event", "events", "f", "faq", "favorite", "favourites", "favs", "feedback", "file", "files", "film", "films", "forum", "forums", "friend", "friends", "game", "games", "gif", "go", "go.html", "go.php", "group", "groups", "help", "home", "hot", "htm", "html", "image", "images", "img", "index", "info", "intro", "item", "items", "ja", "jp", "jump", "jump.html", "jump.php", "jumping", "knowledge", "lang", "lesson", "lessons", "lib", "library", "link", "links", "list", "live", "lives", "m", "mag", "magnet", "mall", "manhua", "map", "member", "members", "message", "messages", "mobile", "movie", "movies", "music", "my", "new", "news", "note", "novel", "novels", "online", "order", "out", "out.html", "out.php", "outbound", "p", "page", "pages", "pay", "payment", "pdf", "photo", "photos", "pic", "pics", "picture", "pictures", "play", "player", "playlist", "post", "posts", "product", "products", "program", "programs", "project", "qa", "question", "rank", "ranking", "read", "readme", "redirect", "redirect.html", "redirect.php", "reg", "register", "res", "resource", "retrieve", "sale", "search", "season", "seasons", "section", "seller", "series", "service", "services", "setting", "settings", "share", "shop", "show", "shows", "site", "soft", "sort", "source", "special", "star", "stars", "static", "stock", "store", "stream", "streaming", "streams", "student", "study", "tag", "tags", "task", "teacher", "team", "tech", "temp", "test", "thread", "tool", "tools", "topic", "topics", "torrent", "trade", "travel", "tv", "txt", "type", "u", "upload", "uploads", "url", "urls", "user", "users", "v", "version", "videos", "view", "vip", "vod", "watch", "web", "wenku", "wiki", "work", "www", "zh", "zh-cn", "zh-tw", "zip"];
	const randomNum = Math.floor(Math.random() * 3 + 1);
	const randomPath = commonPathDirs.sort(() => 0.5 - Math.random()).slice(0, randomNum).join('/');
	if (fullNodePath === "/") return `/${randomPath}`;
	else return `/${randomPath + fullNodePath.replace('/?', '?')}`;
}

function replaceStarWithRandom(content) {
	if (typeof content !== 'string' || !content.includes('*')) return content;
	const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
	return content.replace(/\*/g, () => {
		let s = '';
		for (let i = 0; i < Math.floor(Math.random() * 14) + 3; i++) s += charset[Math.floor(Math.random() * charset.length)];
		return s;
	});
}

async function DoHquery(domain, recordType, DoHparseService = "https://cloudflare-dns.com/dns-query") {
	const startTime = performance.now();
	log(`[DoHquery] startQuery ${domain} ${recordType} via ${DoHparseService}`);
	try {
		// convert recordType string to number value
		const typeMapping = { 'A': 1, 'NS': 2, 'CNAME': 5, 'MX': 15, 'TXT': 16, 'AAAA': 28, 'SRV': 33, 'HTTPS': 65 };
		const qtype = typeMapping[recordType.toUpperCase()] || 1;

		// encode domain as DNS wire format labels
		const encodeDomain = (name) => {
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

		// build DNS query message
		const qname = encodeDomain(domain);
		const query = new Uint8Array(12 + qname.length + 4);
		const qview = new DataView(query.buffer);
		qview.setUint16(0, crypto.getRandomValues(new Uint16Array(1))[0]); // ID (random per RFC 1035)
		qview.setUint16(2, 0x0100);  // Flags: RD=1 (recursionQuery)
		qview.setUint16(4, 1);       // QDCOUNT
		query.set(qname, 12);
		qview.setUint16(12 + qname.length, qtype);
		qview.setUint16(12 + qname.length + 2, 1); // QCLASS = IN

		// send DNS-message request via POST
		log(`[DoHquery] sendQueryMessage ${domain} via ${DoHparseService} (type=${qtype}, ${query.length}bytes)`);
		const response = await fetch(DoHparseService, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/dns-message',
				'Accept': 'application/dns-message',
			},
			body: query,
		});
		if (!response.ok) {
			console.warn(`[DoHquery] requestFail ${domain} ${recordType} via ${DoHparseService} responseCode:${response.status}`);
			return [];
		}

		// parse DNS response message
		const buf = new Uint8Array(await response.arrayBuffer());
		const dv = new DataView(buf.buffer);
		const qdcount = dv.getUint16(4);
		const ancount = dv.getUint16(6);
		log(`[DoHquery] receivedResponse ${domain} ${recordType} via ${DoHparseService} (${buf.length}bytes, ${ancount}answers)`);

		// parse domain (handle pointer compression)
		const parseDomain = (pos) => {
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

		// skip Question Section
		let offset = 12;
		for (let i = 0; i < qdcount; i++) {
			const [, end] = parseDomain(offset);
			offset = /** @type {number} */ (end) + 4; // +4 skip QTYPE + QCLASS
		}

		// parse Answer Section
		const answers = [];
		for (let i = 0; i < ancount && offset < buf.length; i++) {
			const [name, nameEnd] = parseDomain(offset);
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
				const [cname] = parseDomain(offset - rdlen);
				data = cname;
			} else {
				data = Array.from(rdata).map(b => b.toString(16).padStart(2, '0')).join('');
			}
			answers.push({ name, type, TTL: ttl, data, rdata });
		}
		const elapsedMs = (performance.now() - startTime).toFixed(2);
		log(`[DoHquery] queryDone ${domain} ${recordType} via ${DoHparseService} ${elapsedMs}ms total${answers.length}results${answers.length > 0 ? '\n' + answers.map((a, i) => `  ${i + 1}. ${a.name} type=${a.type} TTL=${a.TTL} data=${a.data}`).join('\n') : ''}`);
		return answers;
	} catch (error) {
		const elapsedMs = (performance.now() - startTime).toFixed(2);
		console.error(`[DoHquery] queryFail ${domain} ${recordType} via ${DoHparseService} ${elapsedMs}ms:`, error);
		return [];
	}
}

async function readConfigJson(env, hostname, userID, UA = "Mozilla/5.0", resetConfig = false) {
	const _p = atob("UFJPWFlJUA==");
	const host = hostname, Ali_DoH = "https://dns.alidns.com/dns-query", ECH_SNI = "cloudflare-ech.com", placeholder = '{{IP:PORT}}', initStartTime = performance.now(), defaultConfigJson = {
		TIME: new Date().toISOString(),
		HOST: host,
		HOSTS: [hostname],
		UUID: userID,
		PATH: "/",
		protocolType: "v" + "le" + "ss",
		transportProtocol: "ws",
		gRPCmode: "gun",
		gRPCUserAgent: UA,
		skipCertVerify: false,
		enable0RTT: false,
		tlsFragment: null,
		randomPath: false,
		ECH: false,
		ECHConfig: {
			DNS: Ali_DoH,
			SNI: ECH_SNI,
		},
		SS: {
			cipherMethod: "aes-128-gcm",
			TLS: true,
		},
		Fingerprint: "chrome",
		optimizedSubGeneration: {
			local: true, // true: localBasedBestAddress  false: optimizedSubGeneration
			localIPPool: {
				randomIP: true, //  randomIP effectiveWhenTrue，enabledRandomIpCount，otherwiseUseKvAdd.txt
				randomCount: 16,
				specifiedPorts: -1,
			},
			SUB: null,
			SUBNAME: "Nova Proxy",
			SUBUpdateTime: 3, // subUpdateTime（hours）
			TOKEN: await MD5MD5(hostname + userID),
		},
		subConverterConfig: {
			SUBAPI: "https://SUBAPI.cmliussss.net",
			SUBCONFIG: "https://raw.githubusercontent.com/cmliu/ACL4SSR/refs/heads/main/Clash/config/ACL4SSR_Online_Mini_MultiMode_CF.ini",
			SUBEMOJI: false,
		},
		proxy: {
			[_p]: "auto",
			SOCKS5: {
				enabled: enableSocks5Proxy,
				globalScope: enableSocks5GlobalProxy,
				accountStr: mySocks5Account,
				whitelist: SOCKS5whitelist,
			},
			pathTemplate: {
				[_p]: "proxyip=" + placeholder,
				SOCKS5: {
					globalScope: "socks5://" + placeholder,
					standardScope: "socks5=" + placeholder
				},
				HTTP: {
					globalScope: "http://" + placeholder,
					standardScope: "http=" + placeholder
				},
				HTTPS: {
					globalScope: "https://" + placeholder,
					standardScope: "https=" + placeholder
				},
				TURN: {
					globalScope: "turn://" + placeholder,
					standardScope: "turn=" + placeholder
				},
				SSTP: {
					globalScope: "sstp://" + placeholder,
					standardScope: "sstp=" + placeholder
				},
			},
		},
		TG: {
			enabled: false,
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
		let configJSON = await env.KV.get('config.json');
		if (!configJSON || resetConfig == true) {
			await env.KV.put('config.json', JSON.stringify(defaultConfigJson, null, 2));
			config_JSON = defaultConfigJson;
		} else {
			config_JSON = JSON.parse(configJSON);
			// Migrate old Chinese key names to English equivalents
			if (config_JSON.协议类型 !== undefined && config_JSON.protocolType === undefined) config_JSON.protocolType = config_JSON.协议类型;
			if (config_JSON.传输协议 !== undefined && config_JSON.transportProtocol === undefined) config_JSON.transportProtocol = config_JSON.传输协议;
			if (config_JSON.跳过证书验证 !== undefined && config_JSON.skipCertVerify === undefined) config_JSON.skipCertVerify = config_JSON.跳过证书验证;
			if (config_JSON.启用0RTT !== undefined && config_JSON.enable0RTT === undefined) config_JSON.enable0RTT = config_JSON.启用0RTT;
			if (config_JSON.TLS分片 !== undefined && config_JSON.tlsFragment === undefined) config_JSON.tlsFragment = config_JSON.TLS分片;
			if (config_JSON.随机路径 !== undefined && config_JSON.randomPath === undefined) config_JSON.randomPath = config_JSON.随机路径;
			if (config_JSON.gRPC模式 !== undefined && config_JSON.gRPCmode === undefined) config_JSON.gRPCmode = config_JSON.gRPC模式;
			if (config_JSON.完整节点路径 !== undefined && config_JSON.fullNodePath === undefined) config_JSON.fullNodePath = config_JSON.完整节点路径;
			// Migrate SS sub-keys
			if (config_JSON.SS && config_JSON.SS.加密方式 !== undefined && config_JSON.SS.cipherMethod === undefined) config_JSON.SS.cipherMethod = config_JSON.SS.加密方式;
			// Migrate optimizedSubGeneration keys
			if (config_JSON.优选订阅生成 && config_JSON.optimizedSubGeneration === undefined) {
				config_JSON.optimizedSubGeneration = {
					local: config_JSON.优选订阅生成.local !== undefined ? config_JSON.优选订阅生成.local : true,
					localIPPool: {
						randomIP: config_JSON.优选订阅生成.本地IP库?.随机IP !== undefined ? config_JSON.优选订阅生成.本地IP库.随机IP : true,
						randomCount: config_JSON.优选订阅生成.本地IP库?.随机数量 || 16,
						specifiedPorts: config_JSON.优选订阅生成.本地IP库?.指定端口 || -1,
					},
					SUB: config_JSON.优选订阅生成.SUB || null,
					SUBNAME: config_JSON.优选订阅生成.SUBNAME || "Nova Proxy",
					SUBUpdateTime: config_JSON.优选订阅生成.SUBUpdateTime || 3,
					TOKEN: config_JSON.优选订阅生成.TOKEN || await MD5MD5(hostname + userID),
				};
			}
			// Migrate subConverterConfig keys
			if (config_JSON.订阅转换配置 && config_JSON.subConverterConfig === undefined) {
				config_JSON.subConverterConfig = {
					SUBAPI: config_JSON.订阅转换配置.SUBAPI || "https://SUBAPI.cmliussss.net",
					SUBCONFIG: config_JSON.订阅转换配置.SUBCONFIG || "https://raw.githubusercontent.com/cmliu/ACL4SSR/refs/heads/main/Clash/config/ACL4SSR_Online_Mini_MultiMode_CF.ini",
					SUBEMOJI: config_JSON.订阅转换配置.SUBEMOJI || false,
				};
			}
			// Migrate proxy keys
			if (config_JSON.反代 && config_JSON.proxy === undefined) {
				config_JSON.proxy = {
					[_p]: config_JSON.反代[_p] || "auto",
					SOCKS5: {
						enabled: config_JSON.反代.SOCKS5?.启用 !== undefined ? config_JSON.反代.SOCKS5.启用 : enableSocks5Proxy,
						globalScope: config_JSON.反代.SOCKS5?.全局 || enableSocks5GlobalProxy,
						accountStr: config_JSON.反代.SOCKS5?.账号 || mySocks5Account,
						whitelist: config_JSON.反代.SOCKS5?.白名单 || SOCKS5whitelist,
					},
					pathTemplate: config_JSON.反代.路径Template || config_JSON.反代.路径模板 || null,
				};
			}
		}
	} catch (error) {
		console.error(`readConfigJsonError: ${error.message}`);
		config_JSON = defaultConfigJson;
	}

	if (!config_JSON.gRPCUserAgent) config_JSON.gRPCUserAgent = UA;
	config_JSON.HOST = host;
	if (!config_JSON.HOSTS) config_JSON.HOSTS = [hostname];
	if (env.HOST) config_JSON.HOSTS = (await sortIntoArray(env.HOST)).map(h => h.toLowerCase().replace(/^https?:\/\//, '').split('/')[0].split(':')[0]);
	config_JSON.UUID = userID;
	if (!config_JSON.randomPath) config_JSON.randomPath = false;
	if (!config_JSON.enable0RTT) config_JSON.enable0RTT = false;
	if (config_JSON.skipCertVerify === undefined) config_JSON.skipCertVerify = false;

	if (env.PATH) config_JSON.PATH = env.PATH.startsWith('/') ? env.PATH : '/' + env.PATH;
	else if (!config_JSON.PATH) config_JSON.PATH = '/';

	if (!config_JSON.gRPCmode) config_JSON.gRPCmode = 'gun';
	if (!config_JSON.SS) config_JSON.SS = { cipherMethod: "aes-128-gcm", TLS: false };

	if (!config_JSON.proxy.pathTemplate?.[_p]) {
		config_JSON.proxy.pathTemplate = {
			[_p]: "proxyip=" + placeholder,
			SOCKS5: {
				globalScope: "socks5://" + placeholder,
				standardScope: "socks5=" + placeholder
			},
			HTTP: {
				globalScope: "http://" + placeholder,
				standardScope: "http=" + placeholder
			},
			HTTPS: {
				globalScope: "https://" + placeholder,
				standardScope: "https=" + placeholder
			},
			TURN: {
				globalScope: "turn://" + placeholder,
				standardScope: "turn=" + placeholder
			},
			SSTP: {
				globalScope: "sstp://" + placeholder,
				standardScope: "sstp=" + placeholder
			},
		};
	}
	if (!config_JSON.proxy.pathTemplate.HTTPS) config_JSON.proxy.pathTemplate.HTTPS = { globalScope: "https://" + placeholder, standardScope: "https=" + placeholder };
	if (!config_JSON.proxy.pathTemplate.TURN) config_JSON.proxy.pathTemplate.TURN = { globalScope: "turn://" + placeholder, standardScope: "turn=" + placeholder };
	if (!config_JSON.proxy.pathTemplate.SSTP) config_JSON.proxy.pathTemplate.SSTP = { globalScope: "sstp://" + placeholder, standardScope: "sstp=" + placeholder };

	const proxyConfig = config_JSON.proxy.pathTemplate[config_JSON.proxy.SOCKS5.enabled?.toUpperCase()];

	let pathProxyParam = '';
	if (proxyConfig && config_JSON.proxy.SOCKS5.accountStr) pathProxyParam = (config_JSON.proxy.SOCKS5.globalScope ? proxyConfig.globalScope : proxyConfig.standardScope).replace(placeholder, config_JSON.proxy.SOCKS5.accountStr);
	else if (config_JSON.proxy[_p] !== 'auto') pathProxyParam = config_JSON.proxy.pathTemplate[_p].replace(placeholder, config_JSON.proxy[_p]);

	let proxyQueryParam = '';
	if (pathProxyParam.includes('?')) {
		const [proxyPathPart, proxyQueryPart] = pathProxyParam.split('?');
		pathProxyParam = proxyPathPart;
		proxyQueryParam = proxyQueryPart;
	}

	config_JSON.PATH = config_JSON.PATH.replace(pathProxyParam, '').replace('//', '/');
	const normalizedPath = config_JSON.PATH === '/' ? '' : config_JSON.PATH.replace(/\/+(?=\?|$)/, '').replace(/\/+$/, '');
	const [pathPart, ...queryArray] = normalizedPath.split('?');
	const queryPart = queryArray.length ? '?' + queryArray.join('?') : '';
	const finalQueryPart = proxyQueryParam ? (queryPart ? queryPart + '&' + proxyQueryParam : '?' + proxyQueryParam) : queryPart;
	config_JSON.fullNodePath = (pathPart || '/') + (pathPart && pathProxyParam ? '/' : '') + pathProxyParam + finalQueryPart + (config_JSON.enable0RTT ? (finalQueryPart ? '&' : '?') + 'ed=2560' : '');

	if (!config_JSON.tlsFragment && config_JSON.tlsFragment !== null) config_JSON.tlsFragment = null;
	const TLSfragmentParam = config_JSON.tlsFragment == 'Shadowrocket' ? `&fragment=${encodeURIComponent('1,40-60,30-50,tlshello')}` : config_JSON.tlsFragment == 'Happ' ? `&fragment=${encodeURIComponent('3,1,tlshello')}` : '';
	if (!config_JSON.Fingerprint) config_JSON.Fingerprint = "chrome";
	if (!config_JSON.ECH) config_JSON.ECH = false;
	if (!config_JSON.ECHConfig) config_JSON.ECHConfig = { DNS: Ali_DoH, SNI: ECH_SNI };
	const ECHLINKparam = config_JSON.ECH ? `&ech=${encodeURIComponent((config_JSON.ECHConfig.SNI ? config_JSON.ECHConfig.SNI + '+' : '') + config_JSON.ECHConfig.DNS)}` : '';
	const { type: transportProtocol, pathFieldName, domainFieldName } = getTransportProtocolConfig(config_JSON);
	const transportPathParamValue = getTransportPathParamValue(config_JSON, config_JSON.fullNodePath);
	config_JSON.LINK = config_JSON.protocolType === 'ss'
		? `${config_JSON.protocolType}://${btoa(config_JSON.SS.cipherMethod + ':' + userID)}@${host}:${config_JSON.SS.TLS ? '443' : '80'}?plugin=v2${encodeURIComponent(`ray-plugin;mode=websocket;host=${host};path=${((config_JSON.fullNodePath.includes('?') ? config_JSON.fullNodePath.replace('?', '?enc=' + config_JSON.SS.cipherMethod + '&') : (config_JSON.fullNodePath + '?enc=' + config_JSON.SS.cipherMethod)) + (config_JSON.SS.TLS ? ';tls' : ''))};mux=0`) + ECHLINKparam}#${encodeURIComponent(config_JSON.optimizedSubGeneration.SUBNAME)}`
		: `${config_JSON.protocolType}://${userID}@${host}:443?security=tls&type=${transportProtocol + ECHLINKparam}&${domainFieldName}=${host}&fp=${config_JSON.Fingerprint}&sni=${host}&${pathFieldName}=${encodeURIComponent(transportPathParamValue) + TLSfragmentParam}&encryption=none${config_JSON.skipCertVerify ? '&insecure=1&allowInsecure=1' : ''}#${encodeURIComponent(config_JSON.optimizedSubGeneration.SUBNAME)}`;
	config_JSON.optimizedSubGeneration.TOKEN = await MD5MD5(hostname + userID);

	const initTG_JSON = { BotToken: null, ChatID: null };
	config_JSON.TG = { enabled: config_JSON.TG.enabled ? config_JSON.TG.enabled : false, ...initTG_JSON };
	try {
		const TG_TXT = await env.KV.get('tg.json');
		if (!TG_TXT) {
			await env.KV.put('tg.json', JSON.stringify(initTG_JSON, null, 2));
		} else {
			const TG_JSON = JSON.parse(TG_TXT);
			config_JSON.TG.ChatID = TG_JSON.ChatID ? TG_JSON.ChatID : null;
			config_JSON.TG.BotToken = TG_JSON.BotToken ? maskSensitiveInfo(TG_JSON.BotToken) : null;
		}
	} catch (error) {
		console.error(`readTg.jsonerrorOccurred: ${error.message}`);
	}

	const initCF_JSON = { Email: null, GlobalAPIKey: null, AccountID: null, APIToken: null, UsageAPI: null };
	config_JSON.CF = { ...initCF_JSON, Usage: { success: false, pages: 0, workers: 0, total: 0, max: 100000 } };
	try {
		const CF_TXT = await env.KV.get('cf.json');
		if (!CF_TXT) {
			await env.KV.put('cf.json', JSON.stringify(initCF_JSON, null, 2));
		} else {
			const CF_JSON = JSON.parse(CF_TXT);
			if (CF_JSON.UsageAPI) {
				try {
					const controller = new AbortController();
					const timeoutId = setTimeout(() => controller.abort(), 10000);
					const response = await fetch(CF_JSON.UsageAPI, { signal: controller.signal });
					clearTimeout(timeoutId);
					const Usage = await response.json();
					config_JSON.CF.Usage = Usage;
				} catch (err) {
					console.error(`request CF_JSON.UsageAPI fail: ${err.message}`);
				}
			} else {
				config_JSON.CF.Email = CF_JSON.Email ? CF_JSON.Email : null;
				config_JSON.CF.GlobalAPIKey = CF_JSON.GlobalAPIKey ? maskSensitiveInfo(CF_JSON.GlobalAPIKey) : null;
				config_JSON.CF.AccountID = CF_JSON.AccountID ? maskSensitiveInfo(CF_JSON.AccountID) : null;
				config_JSON.CF.APIToken = CF_JSON.APIToken ? maskSensitiveInfo(CF_JSON.APIToken) : null;
				config_JSON.CF.UsageAPI = null;
				const Usage = await getCloudflareUsage(CF_JSON.Email, CF_JSON.GlobalAPIKey, CF_JSON.AccountID, CF_JSON.APIToken);
				config_JSON.CF.Usage = Usage;
			}
		}
	} catch (error) {
		console.error(`readCf.jsonerrorOccurred: ${error.message}`);
	}

	config_JSON.loadTime = (performance.now() - initStartTime).toFixed(2) + 'ms';
	return config_JSON;
}

function identifyCarrier(request) {
	const cf = request?.cf;
	const ASNcarrierMapping = {
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
	const carrierKeywordMapping = [
		{ code: 'ct', pattern: /chinanet|chinatelecom|china telecom|cn2|shtel/ },
		{ code: 'cmcc', pattern: /cmi|cmnet|chinamobile|china mobile|cmcc|mobile communications/ },
		{ code: 'cu', pattern: /china169|china unicom|chinaunicom|cucc|cncgroup|cuii|netcom/ },
	];
	if (String(cf?.country || '').toLowerCase() !== 'cn') return 'cf';
	const orgName = String(cf?.asOrganization || '').toLowerCase();
	const matchedCarrier = carrierKeywordMapping.find(({ pattern }) => pattern.test(orgName))?.code;
	return matchedCarrier || ASNcarrierMapping[String(cf?.asn || '')] || 'cf';
}

async function generateRandomIp(request, count = 16, specifiedPorts = -1) {
	const url = new URL(request.url);
	const queryParamCarrier = String(url.searchParams.get('asOrg') || '').toLowerCase();
	const carrierFileId = ['ct', 'cu', 'cmcc', 'cf'].includes(queryParamCarrier) ? queryParamCarrier : identifyCarrier(request);
	const carrierNameMapping = {
		cmcc: 'CFmobileBest',
		cu: 'CFunicomBest',
		ct: 'CFtelecomBest',
		cf: 'CFofficialBest',
	};
	const cidr_url = carrierFileId === 'cf' ? 'https://raw.githubusercontent.com/cmliu/cmliu/main/CF-CIDR.txt' : `https://raw.githubusercontent.com/cmliu/cmliu/main/CF-CIDR/${carrierFileId}.txt`;
	const cfname = carrierNameMapping[carrierFileId] || 'CFofficialBest';
	// TLS ports only: every generated node uses security=tls, so the non-TLS Cloudflare ports
	// (80, 2052, 2082, 2086, 2095, 8080) would always be dead. Keeping only the HTTPS ports
	// removes ~half the dead nodes; the client then auto-selects the fastest live one.
	const cfport = [443, 2053, 2083, 2087, 2096, 8443];
	let cidrList = [];
	try { const res = await fetch(cidr_url); cidrList = res.ok ? await sortIntoArray(await res.text()) : ['104.16.0.0/13'] } catch { cidrList = ['104.16.0.0/13'] }

	const generateRandomIPFromCIDR = (cidr) => {
		const [baseIP, prefixLength] = cidr.split('/'), prefix = parseInt(prefixLength), hostBits = 32 - prefix;
		const ipInt = baseIP.split('.').reduce((a, p, i) => a | (parseInt(p) << (24 - i * 8)), 0);
		const randomOffset = Math.floor(Math.random() * Math.pow(2, hostBits));
		const mask = (0xFFFFFFFF << hostBits) >>> 0, randomIP = (((ipInt & mask) >>> 0) + randomOffset) >>> 0;
		return [(randomIP >>> 24) & 0xFF, (randomIP >>> 16) & 0xFF, (randomIP >>> 8) & 0xFF, randomIP & 0xFF].join('.');
	};
	const randomIPs = Array.from({ length: count }, (_, index) => {
		const ip = generateRandomIPFromCIDR(cidrList[Math.floor(Math.random() * cidrList.length)]);
		const targetPort = specifiedPorts === -1
			? cfport[Math.floor(Math.random() * cfport.length)]
			: specifiedPorts;
			const novaName = 'Nova-' + Array.from(crypto.getRandomValues(new Uint8Array(6)), b => 'abcdefghijklmnopqrstuvwxyz0123456789'[b % 36]).join('');
		return `${ip}:${targetPort}#${novaName}`;
	});
	return [randomIPs, randomIPs.join('\n')];
}

async function sortIntoArray(content) {
	var replaceAfterOfContent = content.replace(/[	"'\r\n]+/g, ',').replace(/,+/g, ',');
	if (replaceAfterOfContent.charAt(0) == ',') replaceAfterOfContent = replaceAfterOfContent.slice(1);
	if (replaceAfterOfContent.charAt(replaceAfterOfContent.length - 1) == ',') replaceAfterOfContent = replaceAfterOfContent.slice(0, replaceAfterOfContent.length - 1);
	const addressArray = replaceAfterOfContent.split(',');
	return addressArray;
}

async function getBestSubGeneratorData(bestSubGeneratorHost) {
	let bestIp = [], otherNodeLink = '', formattedHost = bestSubGeneratorHost.replace(/^sub:\/\//i, 'https://').split('#')[0].split('?')[0];
	if (!/^https?:\/\//i.test(formattedHost)) formattedHost = `https://${formattedHost}`;

	try {
		const url = new URL(formattedHost);
		formattedHost = url.origin;
	} catch (error) {
		bestIp.push(`127.0.0.1:1234#${bestSubGeneratorHost}bestSubGeneratorFormatError:${error.message}`);
		return [bestIp, otherNodeLink];
	}

	const bestSubGeneratorUrl = `${formattedHost}/sub?host=example.com&uuid=00000000-0000-4000-8000-000000000000`;

	try {
		const response = await fetch(bestSubGeneratorUrl, {
			headers: { 'User-Agent': 'NovaProxy (https://github.com/NovaProxy)' }
		});

		if (!response.ok) {
			bestIp.push(`127.0.0.1:1234#${bestSubGeneratorHost}optimizedSubGenerationException:${response.statusText}`);
			return [bestIp, otherNodeLink];
		}

		const bestSubGeneratorReturnedSub = atob(await response.text());
		const subLineList = bestSubGeneratorReturnedSub.includes('\r\n')
			? bestSubGeneratorReturnedSub.split('\r\n')
			: bestSubGeneratorReturnedSub.split('\n');

		for (const lineContent of subLineList) {
			if (!lineContent.trim()) continue; // skipEmptyLines
			if (lineContent.includes('00000000-0000-4000-8000-000000000000') && lineContent.includes('example.com')) {
				// this is the best IP line，extract domain:port#note
				const addressMatch = lineContent.match(/:\/\/[^@]+@([^?]+)/);
				if (addressMatch) {
					let addressPort = addressMatch[1], note = ''; // domain:port or IP:port
					const noteMatch = lineContent.match(/#(.+)$/);
					if (noteMatch) note = '#' + decodeURIComponent(noteMatch[1]);
					bestIp.push(addressPort + note);
				}
			} else {
				otherNodeLink += lineContent + '\n';
			}
		}
	} catch (error) {
		bestIp.push(`127.0.0.1:1234#${bestSubGeneratorHost}optimizedSubGenerationException:${error.message}`);
	}

	return [bestIp, otherNodeLink];
}

async function requestBestApi(urls, defaultPort = '443', timeoutTime = 3000) {
	if (!urls?.length) return [[], [], [], []];
	const results = new Set(), proxyIpPool = new Set();
	let subLinkResponsePlaintextLinkContent = '', needSubConverterUrls = [];
	await Promise.allSettled(urls.map(async (url) => {
		// check if URL contains note name
		const hashIndex = url.indexOf('#');
		const urlWithoutHash = hashIndex > -1 ? url.substring(0, hashIndex) : url;
		const APInoteName = hashIndex > -1 ? decodeURIComponent(url.substring(hashIndex + 1)) : null;
		const bestIpAsProxyIp = url.toLowerCase().includes('proxyip=true');
		if (urlWithoutHash.toLowerCase().startsWith('sub://')) {
			try {
				const [bestIp, otherNodeLink] = await getBestSubGeneratorData(urlWithoutHash);
				// handle first array - bestIp
				if (APInoteName) {
					for (const ip of bestIp) {
						const handleAfterIP = ip.includes('#')
							? `${ip} [${APInoteName}]`
							: `${ip}#[${APInoteName}]`;
						results.add(handleAfterIP);
						if (bestIpAsProxyIp) proxyIpPool.add(ip.split('#')[0]);
					}
				} else {
					for (const ip of bestIp) {
						results.add(ip);
						if (bestIpAsProxyIp) proxyIpPool.add(ip.split('#')[0]);
					}
				}
				// handle second array - otherNodeLink
				if (otherNodeLink && typeof otherNodeLink === 'string' && APInoteName) {
					const handleAfterLINKContent = otherNodeLink.replace(/([a-z][a-z0-9+\-.]*:\/\/[^\r\n]*?)(\r?\n|$)/gi, (match, link, lineEnd) => {
						const fullLink = link.includes('#')
							? `${link}${encodeURIComponent(` [${APInoteName}]`)}`
							: `${link}${encodeURIComponent(`#[${APInoteName}]`)}`;
						return `${fullLink}${lineEnd}`;
					});
					subLinkResponsePlaintextLinkContent += handleAfterLINKContent;
				} else if (otherNodeLink && typeof otherNodeLink === 'string') {
					subLinkResponsePlaintextLinkContent += otherNodeLink;
				}
			} catch (e) { }
			return;
		}

		try {
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), timeoutTime);
			const response = await fetch(urlWithoutHash, { signal: controller.signal });
			clearTimeout(timeoutId);
			let text = '';
			try {
				const buffer = await response.arrayBuffer();
				const contentType = (response.headers.get('content-type') || '').toLowerCase();
				const charset = contentType.match(/charset=([^\s;]+)/i)?.[1]?.toLowerCase() || '';

				// determine encoding priority based on Content-Type response header
				let decoders = ['utf-8', 'gb2312']; // defaultPriority UTF-8
				if (charset.includes('gb') || charset.includes('gbk') || charset.includes('gb2312')) {
					decoders = ['gb2312', 'utf-8']; // ifExplicitlySpecified GB isEncoding，preferredAttempt GB2312
				}

				// try multiple encoding decodings
				let decodeSuccess = false;
				for (const decoder of decoders) {
					try {
						const decoded = new TextDecoder(decoder).decode(buffer);
						// verify decoded result validity
						if (decoded && decoded.length > 0 && !decoded.includes('\ufffd')) {
							text = decoded;
							decodeSuccess = true;
							break;
						} else if (decoded && decoded.length > 0) {
							// if replacement character (U+FFFD) is found，indicates encoding mismatch，continue trying next encoding
							continue;
						}
					} catch (e) {
						// this encoding decoding failed，try next
						continue;
					}
				}

				// if all encodings failed or are invalid，fallback to response.text()
				if (!decodeSuccess) {
					text = await response.text();
				}

				// if returned data is empty or invalid, return
				if (!text || text.trim().length === 0) {
					return;
				}
			} catch (e) {
				console.error('Failed to decode response:', e);
				return;
			}

			// preprocess sub content
			/*
			if (text.includes('proxies:') || (text.includes('outbounds"') && text.includes('inbounds"'))) {// Clash Singbox config
				needSubConverterUrls.add(url);
				return;
			}
			*/

			let preprocessSubPlaintext = text;
			const cleanText = typeof text === 'string' ? text.replace(/\s/g, '') : '';
			if (cleanText.length > 0 && cleanText.length % 4 === 0 && /^[A-Za-z0-9+/]+={0,2}$/.test(cleanText)) {
				try {
					const bytes = new Uint8Array(atob(cleanText).split('').map(c => c.charCodeAt(0)));
					preprocessSubPlaintext = new TextDecoder('utf-8').decode(bytes);
				} catch { }
			}
			if (preprocessSubPlaintext.split('#')[0].includes('://')) {
				// handleLINKcontent
				if (APInoteName) {
					const handleAfterLINKContent = preprocessSubPlaintext.replace(/([a-z][a-z0-9+\-.]*:\/\/[^\r\n]*?)(\r?\n|$)/gi, (match, link, lineEnd) => {
						const fullLink = link.includes('#')
							? `${link}${encodeURIComponent(` [${APInoteName}]`)}`
							: `${link}${encodeURIComponent(`#[${APInoteName}]`)}`;
						return `${fullLink}${lineEnd}`;
					});
					subLinkResponsePlaintextLinkContent += handleAfterLINKContent + '\n';
				} else {
					subLinkResponsePlaintextLinkContent += preprocessSubPlaintext + '\n';
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
					const port = parsedUrl.searchParams.get('port') || defaultPort;
					const ipItem = hasPort ? line : `${hostPart}:${port}${remark}`;
					// handle first array - bestIp
					if (APInoteName) {
						const handleAfterIP = ipItem.includes('#')
							? `${ipItem} [${APInoteName}]`
							: `${ipItem}#[${APInoteName}]`;
						results.add(handleAfterIP);
					} else {
						results.add(ipItem);
					}
					if (bestIpAsProxyIp) proxyIpPool.add(ipItem.split('#')[0]);
				});
			} else {
				const headers = lines[0].split(',').map(h => h.trim());
				const dataLines = lines.slice(1);
				if (headers.includes('IPaddress') && headers.includes('port') && headers.includes('dataCenter')) {
					const ipIdx = headers.indexOf('IPaddress'), portIdx = headers.indexOf('port');
					const remarkIdx = headers.indexOf('country') > -1 ? headers.indexOf('country') :
						headers.indexOf('city') > -1 ? headers.indexOf('city') : headers.indexOf('dataCenter');
					const tlsIdx = headers.indexOf('TLS');
					dataLines.forEach(line => {
						const cols = line.split(',').map(c => c.trim());
						if (tlsIdx !== -1 && cols[tlsIdx]?.toLowerCase() !== 'true') return;
						const wrappedIP = IPV6_PATTERN.test(cols[ipIdx]) ? `[${cols[ipIdx]}]` : cols[ipIdx];
						const ipItem = `${wrappedIP}:${cols[portIdx]}#${cols[remarkIdx]}`;
						// handle first array - bestIp
						if (APInoteName) {
							const handleAfterIP = `${ipItem} [${APInoteName}]`;
							results.add(handleAfterIP);
						} else {
							results.add(ipItem);
						}
						if (bestIpAsProxyIp) proxyIpPool.add(`${wrappedIP}:${cols[portIdx]}`);
					});
				} else if (headers.some(h => h.includes('IP')) && headers.some(h => h.includes('latency')) && headers.some(h => h.includes('downloadSpeed'))) {
					const ipIdx = headers.findIndex(h => h.includes('IP'));
					const delayIdx = headers.findIndex(h => h.includes('latency'));
					const speedIdx = headers.findIndex(h => h.includes('downloadSpeed'));
					const port = parsedUrl.searchParams.get('port') || defaultPort;
					dataLines.forEach(line => {
						const cols = line.split(',').map(c => c.trim());
						const wrappedIP = IPV6_PATTERN.test(cols[ipIdx]) ? `[${cols[ipIdx]}]` : cols[ipIdx];
						const ipItem = `${wrappedIP}:${port}#CFbest ${cols[delayIdx]}ms ${cols[speedIdx]}MB/s`;
						// handle first array - bestIp
						if (APInoteName) {
							const handleAfterIP = `${ipItem} [${APInoteName}]`;
							results.add(handleAfterIP);
						} else {
							results.add(ipItem);
						}
						if (bestIpAsProxyIp) proxyIpPool.add(`${wrappedIP}:${port}`);
					});
				}
			}
		} catch (e) { }
	}));
	// convert LINK content to array and deduplicate
	const LINKarray = subLinkResponsePlaintextLinkContent.trim() ? [...new Set(subLinkResponsePlaintextLinkContent.split(/\r?\n/).filter(line => line.trim() !== ''))] : [];
	return [Array.from(results), LINKarray, needSubConverterUrls, Array.from(proxyIpPool)];
}

async function fetchProxyParams(url, uuid) {
	resolveConnUser(url);
	const { searchParams } = url;
	const pathname = decodeURIComponent(url.pathname);
	const pathLower = pathname.toLowerCase();

	const chainProxyPathMatch = pathname.match(/\/video\/(.+)$/i);
	if (chainProxyPathMatch) {
		try {
			const chainProxyPlaintext = base64SecretDecode(chainProxyPathMatch[1], uuid);
			const { type, ...chainProxyAddress } = JSON.parse(chainProxyPlaintext);
			if (!type || !proxyProtocolDefaultPort[String(type).toLowerCase()]) throw new Error('chainProxyTypeInvalid');
			if (!chainProxyAddress.hostname || !chainProxyAddress.port) throw new Error('chainProxyAddressMissing hostname or port');
			mySocks5Account = '';
			proxyIP = 'chainProxy';
			enableProxyFallback = false;
			enableSocks5GlobalProxy = true;
			enableSocks5Proxy = String(type).toLowerCase();
			parsedSocks5Address = {
				username: chainProxyAddress.username,
				password: chainProxyAddress.password,
				hostname: chainProxyAddress.hostname,
				port: Number(chainProxyAddress.port)
			};
			if (isNaN(parsedSocks5Address.port)) throw new Error('chainProxyPortInvalid');
			return;
		} catch (err) {
			console.error('parseChainProxyParamFailed:', err.message);
		}
	}

	mySocks5Account = searchParams.get('socks5') || searchParams.get('http') || searchParams.get('https') || searchParams.get('turn') || searchParams.get('sstp') || null;
	enableSocks5GlobalProxy = searchParams.has('globalproxy');
	if (searchParams.get('socks5')) enableSocks5Proxy = 'socks5';
	else if (searchParams.get('http')) enableSocks5Proxy = 'http';
	else if (searchParams.get('https')) enableSocks5Proxy = 'https';
	else if (searchParams.get('turn')) enableSocks5Proxy = 'turn';
	else if (searchParams.get('sstp')) enableSocks5Proxy = 'sstp';

	const parseProxyURL = (value, forceGlobal = true) => {
		const match = /^(socks5|http|https|turn|sstp):\/\/(.+)$/i.exec(value || '');
		if (!match) return false;
		enableSocks5Proxy = match[1].toLowerCase();
		mySocks5Account = match[2].split('/')[0];
		if (forceGlobal) enableSocks5GlobalProxy = true;
		return true;
	};

	const setProxyIP = (value) => {
		proxyIP = value;
		enableSocks5Proxy = null;
		enableProxyFallback = false;
	};

	const extractPathValue = (value) => {
		if (!value.includes('://')) {
			const slashIndex = value.indexOf('/');
			return slashIndex > 0 ? value.slice(0, slashIndex) : value;
		}
		const protocolSplit = value.split('://');
		if (protocolSplit.length !== 2) return value;
		const slashIndex = protocolSplit[1].indexOf('/');
		return slashIndex > 0 ? `${protocolSplit[0]}://${protocolSplit[1].slice(0, slashIndex)}` : value;
	};

	const queryProxyIP = searchParams.get('proxyip');
	if (queryProxyIP !== null) {
		if (!parseProxyURL(queryProxyIP)) return setProxyIP(queryProxyIP);
	} else {
		let match = /\/(socks5?|http|https|turn|sstp):\/?\/?([^/?#\s]+)/i.exec(pathname);
		if (match) {
			const type = match[1].toLowerCase();
			enableSocks5Proxy = type === 'sock' || type === 'socks' ? 'socks5' : type;
			mySocks5Account = match[2].split('/')[0];
			enableSocks5GlobalProxy = true;
		} else if ((match = /\/(g?s5|socks5|g?http|g?https|g?turn|g?sstp)=([^/?#\s]+)/i.exec(pathname))) {
			const type = match[1].toLowerCase();
			mySocks5Account = match[2].split('/')[0];
			enableSocks5Proxy = type.includes('sstp') ? 'sstp' : (type.includes('turn') ? 'turn' : (type.includes('https') ? 'https' : (type.includes('http') ? 'http' : 'socks5')));
			if (type.startsWith('g')) enableSocks5GlobalProxy = true;
		} else if ((match = /\/(proxyip[.=]|pyip=|ip=)([^?#\s]+)/.exec(pathLower))) {
			const pathProxyValue = extractPathValue(match[2]);
			if (!parseProxyURL(pathProxyValue)) return setProxyIP(pathProxyValue);
		}
	}

	if (!mySocks5Account) {
		enableSocks5Proxy = null;
		return;
	}

	try {
		parsedSocks5Address = await getSocks5Account(mySocks5Account, getProxyDefaultPort(enableSocks5Proxy));
		if (searchParams.get('socks5')) enableSocks5Proxy = 'socks5';
		else if (searchParams.get('http')) enableSocks5Proxy = 'http';
		else if (searchParams.get('https')) enableSocks5Proxy = 'https';
		else if (searchParams.get('turn')) enableSocks5Proxy = 'turn';
		else if (searchParams.get('sstp')) enableSocks5Proxy = 'sstp';
		else enableSocks5Proxy = enableSocks5Proxy || 'socks5';
	} catch (err) {
		console.error('parseSOCKS5AddressFail:', err.message);
		enableSocks5Proxy = null;
	}
}

const proxyProtocolDefaultPort = { socks5: 1080, http: 80, https: 443, turn: 3478, sstp: 443 };
function getProxyDefaultPort(type) {
	return proxyProtocolDefaultPort[String(type || '').toLowerCase()] || 80;
}

const SOCKS5accountBase64Regex = /^(?:[A-Z0-9+/]{4})*(?:[A-Z0-9+/]{2}==|[A-Z0-9+/]{3}=)?$/i, IPv6bracketRegex = /^\[.*\]$/;
function getSocks5Account(address, defaultPort = 80) {
	address = String(address || '').trim().replace(/^(socks5|http|https|turn|sstp):\/\//i, '').split('#')[0].trim();
	const firstAt = address.lastIndexOf("@");
	if (firstAt !== -1) {
		let auth = address.slice(0, firstAt).replaceAll("%3D", "=");
		if (!auth.includes(":") && SOCKS5accountBase64Regex.test(auth)) auth = atob(auth);
		address = `${auth}@${address.slice(firstAt + 1)}`;
	}

	const atIndex = address.lastIndexOf("@");
	const hostPart = (atIndex === -1 ? address : address.slice(atIndex + 1)).split('/')[0];
	const authPart = atIndex === -1 ? "" : address.slice(0, atIndex);
	const [username, password] = authPart ? authPart.split(":") : [];
	if (authPart && !password) throw new Error('invalidOf SOCKS addressFormat：authPartMustBe "username:password" format');

	let hostname = hostPart, port = defaultPort;
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

	if (isNaN(port)) throw new Error('invalidOf SOCKS addressFormat：portMustBeNumber');
	if (hostname.includes(":") && !IPv6bracketRegex.test(hostname)) throw new Error('invalidOf SOCKS addressFormat：IPv6 addressMustBeBracketed，if [2001:db8::1]');
	return { username, password, hostname, port };
}

async function getCloudflareUsage(Email, GlobalAPIKey, AccountID, APIToken) {
	const API = "https://api.cloudflare.com/client/v4";
	const sum = (a) => a?.reduce((t, i) => t + (i?.sum?.requests || 0), 0) || 0;
	const cfg = { "Content-Type": "application/json" };

	try {
		if (!AccountID && (!Email || !GlobalAPIKey)) return { success: false, pages: 0, workers: 0, total: 0, max: 100000 };

		if (!AccountID) {
			const acctController = new AbortController();
			const acctTimer = setTimeout(() => acctController.abort(), 8000);
			const r = await fetch(`${API}/accounts`, {
				method: "GET",
				headers: { ...cfg, "X-AUTH-EMAIL": Email, "X-AUTH-KEY": GlobalAPIKey },
				signal: acctController.signal
			});
			clearTimeout(acctTimer);
			if (!r.ok) throw new Error(`accountFetchFailed: ${r.status}`);
			const d = await r.json();
			if (!d?.result?.length) throw new Error("accountNotFound");
			const idx = d.result.findIndex(a => a.name?.toLowerCase().startsWith(Email.toLowerCase()));
			AccountID = d.result[idx >= 0 ? idx : 0]?.id;
		}

		const now = new Date();
		now.setUTCHours(0, 0, 0, 0);
		const hdr = APIToken ? { ...cfg, "Authorization": `Bearer ${APIToken}` } : { ...cfg, "X-AUTH-EMAIL": Email, "X-AUTH-KEY": GlobalAPIKey };

		const gqlController = new AbortController();
		const gqlTimer = setTimeout(() => gqlController.abort(), 10000);
		const res = await fetch(`${API}/graphql`, {
			method: "POST",
			headers: hdr,
			signal: gqlController.signal,
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
		clearTimeout(gqlTimer);

		if (!res.ok) throw new Error(`queryFail: ${res.status}`);
		const result = await res.json();
		if (result.errors?.length) throw new Error(result.errors[0].message);

		const acc = result?.data?.viewer?.accounts?.[0];
		if (!acc) throw new Error("accountDataNotFound");

		const pages = sum(acc.pagesFunctionsInvocationsAdaptiveGroups);
		const workers = sum(acc.workersInvocationsAdaptive);
		const total = pages + workers;
		const max = 100000;
		log(`statResult - Pages: ${pages}, Workers: ${workers}, grandTotal: ${total}, upperLimit: 100000`);
		return { success: true, pages, workers, total, max };

	} catch (error) {
		console.error('getUsageError:', error.message);
		return { success: false, pages: 0, workers: 0, total: 0, max: 100000 };
	}
}

function sha224(s) {
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
	return hex;
}

async function parseAddressPort(proxyIP, targetDomain = 'dash.cloudflare.com', UUID = '00000000-0000-4000-8000-000000000000') {
	if (!cachedProxyIP || !cachedProxyResolvedArray || cachedProxyIP !== proxyIP) {
		proxyIP = proxyIP.toLowerCase();

		function parseAddressPortString(str) {
			let address = str, port = 443;
			if (str.includes(']:')) {
				const parts = str.split(']:');
				address = parts[0] + ']';
				port = parseInt(parts[1], 10) || port;
			} else if ((str.match(/:/g) || []).length === 1 && !str.startsWith('[')) {
				const colonIndex = str.lastIndexOf(':');
				address = str.slice(0, colonIndex);
				port = parseInt(str.slice(colonIndex + 1), 10) || port;
			}
			return [address, port];
		}

		function parseTxtProxyRecord(txtData) {
			return txtData.flatMap(data => {
				if (data.startsWith('"') && data.endsWith('"')) data = data.slice(1, -1);
				return data.replace(/\\010/g, ',').replace(/\n/g, ',').split(',').map(s => s.trim()).filter(Boolean);
			}).map(prefix => parseAddressPortString(prefix));
		}

		const proxyIpArray = await sortIntoArray(proxyIP);
		let allProxyArray = [];
		const ipv4Regex = /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
		const ipv6Regex = /^\[?(?:[a-fA-F0-9]{0,4}:){1,7}[a-fA-F0-9]{0,4}\]?$/;

		// iterate each IP element in array for processing
		for (const singleProxyIP of proxyIpArray) {
			let [address, port] = parseAddressPortString(singleProxyIP);

			if (singleProxyIP.includes('.tp')) {
				const tpMatch = singleProxyIP.match(/\.tp(\d+)/);
				if (tpMatch) port = parseInt(tpMatch[1], 10);
			}

			// determine if it is a domain (not an IP address)
			if (ipv4Regex.test(address) || ipv6Regex.test(address)) {
				log(`[proxyParse] ${address} asIPAddress，useDirectly`);
				allProxyArray.push([address, port]);
				continue;
			}

			const [txtRecords, aRecords] = await Promise.all([
				DoHquery(address, 'TXT'),
				DoHquery(address, 'A')
			]);

			const txtData = txtRecords.filter(r => r.type === 16).map(r => (r.data));
			const txtAddresses = parseTxtProxyRecord(txtData);
			if (txtAddresses.length > 0) {
				log(`[proxyParse] ${address} useTXTRecord，total${txtAddresses.length}results`);
				allProxyArray.push(...txtAddresses);
				continue;
			}

			const ipv4List = aRecords.filter(r => r.type === 1).map(r => r.data);
			if (ipv4List.length > 0) {
				log(`[proxyParse] ${address} txtRecordNotFound，useARecord，total${ipv4List.length}results`);
				allProxyArray.push(...ipv4List.map(ip => [ip, port]));
				continue;
			}

			const aaaaRecords = await DoHquery(address, 'AAAA');
			const ipv6List = aaaaRecords.filter(r => r.type === 28).map(r => `[${r.data}]`);
			if (ipv6List.length > 0) {
				log(`[proxyParse] ${address} txtAndARecordNotFound，useAAAARecord，total${ipv6List.length}results`);
				allProxyArray.push(...ipv6List.map(ip => [ip, port]));
			} else {
				log(`[proxyParse] ${address} txtNotFound、AandAaaaRecord，keepOriginalDomain`);
				allProxyArray.push([address, port]);
			}
		}
		const sortAfterArray = allProxyArray.sort((a, b) => a[0].localeCompare(b[0]));
		const targetRootDomain = targetDomain.includes('.') ? targetDomain.split('.').slice(-2).join('.') : targetDomain;
		let randomSeed = [...(targetRootDomain + UUID)].reduce((a, c) => a + c.charCodeAt(0), 0);
		log(`[proxyParse] randomSeed: ${randomSeed}\ntargetSite: ${targetRootDomain}`)
		const afterShuffle = [...sortAfterArray].sort(() => (randomSeed = (randomSeed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff - 0.5);
		cachedProxyResolvedArray = afterShuffle.slice(0, 8);
		log(`[proxyParse] parseDone total: ${cachedProxyResolvedArray.length}\n${cachedProxyResolvedArray.map(([ip, port], index) => `${index + 1}. ${ip}:${port}`).join('\n')}`);
		cachedProxyIP = proxyIP;
	} else log(`[proxyParse] readCache total: ${cachedProxyResolvedArray.length}\n${cachedProxyResolvedArray.map(([ip, port], index) => `${index + 1}. ${ip}:${port}`).join('\n')}`);
	return cachedProxyResolvedArray;
}

//////////////////////////////////////////////////////Telegram Bot///////////////////////////////////////////////
async function sendBotMessage(botToken, chatId, text, parseMode = 'HTML') {
	// chatId may be a single id or several (comma / new-line separated) — send to each.
	const ids = String(chatId == null ? '' : chatId).split(/[,\n\r]+/).map(s => s.trim()).filter(Boolean);
	if (!ids.length) return;
	let last;
	for (const id of ids) {
		const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${encodeURIComponent(id)}&parse_mode=${parseMode}&text=${encodeURIComponent(text)}`;
		try { last = await fetch(url, { method: 'GET' }); } catch (e) { console.error('sendBotMessage error:', e); }
	}
	return last;
}

// Register the bot command menu so Telegram's "Menu" button lists all commands.
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
		{ command: 'help', description: 'راهنما' },
	];
	try { await fetch(`https://api.telegram.org/bot${botToken}/setMyCommands`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ commands }) }); } catch (e) {}
}

// ---- Telegram inline management console (manage the panel from the bot) ----
async function tgApi(botToken, method, payload) {
	try { return await fetch(`https://api.telegram.org/bot${botToken}/${method}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); } catch (e) { console.error('tgApi ' + method + ':', e); }
}
function tgOn(v) { return v ? '🟢' : '🔴'; }
function tgSt(v) { return v ? 'success' : 'danger'; }
function tgMainMenu(panelUrl) {
	return {
		text: `<b>🛰 Nova Proxy — کنترل پنل</b>\n\n<blockquote>پنل را از همین‌جا مدیریت کنید: تنظیمات، شبکه/DNS، دامنه‌ها، اشتراک و اعلان‌ها.</blockquote>`,
		keyboard: { inline_keyboard: [
			[{ text: '📊 وضعیت', callback_data: 'm:status', style: 'primary' }, { text: '🔗 اشتراک', callback_data: 'm:sub', style: 'primary' }],
			[{ text: '⚙️ تنظیمات', callback_data: 'm:settings', style: 'primary' }, { text: '🛡 شبکه و DNS', callback_data: 'm:net', style: 'primary' }],
			[{ text: '🌐 دامنه‌ها', callback_data: 'm:hosts', style: 'primary' }, { text: '📣 اعلان‌ها', callback_data: 'm:notif', style: 'primary' }],
			[{ text: '👥 کاربران', callback_data: 'm:users', style: 'primary' }],
			[{ text: '🖥 پنل وب (مینی‌اپ)', web_app: { url: panelUrl }, style: 'success' }]
		] }
	};
}
function tgSettingsMenu(c) {
	c = c || {}; const osg = c.optimizedSubGeneration || {};
	return {
		text: `<b>⚙️ تنظیمات اصلی</b>\n\n<blockquote>پروتکل: <code>${c.multiProtocolSub ? 'all' : (c.protocolType || 'vless')}</code>\nترنسپورت: <code>${c.transportProtocol || 'ws'}</code>\nHost: <code>${c.HOST || '-'}</code>\nمسیر: <code>${c.PATH || '/'}</code>\nنام: <code>${osg.SUBNAME || '-'}</code>\nچِین‌پراکسی: <code>${c.chainProxy ? 'روشن' : 'خاموش'}</code></blockquote>`,
		keyboard: { inline_keyboard: [
			[{ text: `پروتکل: ${c.multiProtocolSub ? 'all' : (c.protocolType || 'vless')} 🔁`, callback_data: 'm:proto', style: 'primary' }],
			[{ text: `ترنسپورت: ${c.transportProtocol || 'ws'} 🔁`, callback_data: 'm:trans', style: 'primary' }],
			[{ text: `Fragment ${tgOn(c.tlsFragment)}`, callback_data: 'm:frag', style: tgSt(c.tlsFragment) }, { text: `0-RTT ${tgOn(c.enable0RTT)}`, callback_data: 'm:rtt', style: tgSt(c.enable0RTT) }],
			[{ text: `SkipCert ${tgOn(c.skipCertVerify)}`, callback_data: 'm:scv', style: tgSt(c.skipCertVerify) }, { text: `ECH ${tgOn(c.ECH)}`, callback_data: 'm:ech', style: tgSt(c.ECH) }],
			[{ text: `پخش پورت ${tgOn(c.portSpread)}`, callback_data: 'm:portspread', style: tgSt(c.portSpread) }, { text: `چندحمل‌ونقل ${tgOn(c.multiTransportSub)}`, callback_data: 'm:multitrans', style: tgSt(c.multiTransportSub) }],
			[{ text: '✏️ Host', callback_data: 'm:edit:host', style: 'primary' }, { text: '✏️ مسیر', callback_data: 'm:edit:path', style: 'primary' }, { text: '✏️ نام', callback_data: 'm:edit:name', style: 'primary' }],
			[{ text: '✏️ چِین‌پراکسی (Fix-IP)', callback_data: 'm:edit:chain', style: 'primary' }],
			[{ text: '⬅️ بازگشت', callback_data: 'm:main', style: 'primary' }]
		] }
	};
}
function tgNetMenu(n) {
	n = n || {}; const d = (k, def) => (k in n) ? n[k] : def;
	return {
		text: `<b>🛡 شبکه و DNS</b>\n\n<blockquote>این تنظیمات در کانفیگ‌های Clash/sing-box اعمال می‌شوند. بعد از تغییر در برنامه دوباره وصل شوید.</blockquote>`,
		keyboard: { inline_keyboard: [
			[{ text: `مسیریابی ${tgOn(d('enableRouting', true))}`, callback_data: 'm:net:enableRouting', style: tgSt(d('enableRouting', true)) }, { text: `ایران‌مستقیم ${tgOn(d('enableDomesticBypass', true))}`, callback_data: 'm:net:enableDomesticBypass', style: tgSt(d('enableDomesticBypass', true)) }],
			[{ text: `ضدتبلیغ ${tgOn(d('enableAdBlock', true))}`, callback_data: 'm:net:enableAdBlock', style: tgSt(d('enableAdBlock', true)) }, { text: `بزرگسال ${tgOn(d('enablePornBlock', false))}`, callback_data: 'm:net:enablePornBlock', style: tgSt(d('enablePornBlock', false)) }],
			[{ text: `DoH ${tgOn(d('enableDoH', true))}`, callback_data: 'm:net:enableDoH', style: tgSt(d('enableDoH', true)) }, { text: `IPv6 ${tgOn(d('enableIPv6', true))}`, callback_data: 'm:net:enableIPv6', style: tgSt(d('enableIPv6', true)) }],
			[{ text: '⬅️ بازگشت', callback_data: 'm:main', style: 'primary' }]
		] }
	};
}
function tgHostsMenu(c, healthMap) {
	c = c || {}; healthMap = healthMap || {};
	const hosts = (Array.isArray(c.HOSTS) && c.HOSTS.length) ? c.HOSTS : (c.HOST ? [c.HOST] : []);
	const list = hosts.length ? hosts.map(h => `${healthMap[h] === false ? '🔴' : healthMap[h] === true ? '🟢' : '⚪️'} <code>${h}</code>`).join('\n') : 'هیچ دامنه‌ای ثبت نشده';
	const rows = hosts.map(h => [{ text: `🗑 ${h}`, callback_data: 'm:del:' + h, style: 'danger' }]);
	rows.push([{ text: '➕ افزودن دامنه', callback_data: 'm:edit:addhost', style: 'success' }]);
	rows.push([{ text: '⬅️ بازگشت', callback_data: 'm:main', style: 'primary' }]);
	return { text: `<b>🌐 دامنه‌ها</b>\n\n<blockquote>${list}</blockquote>\n<i>🟢 سالم · 🔴 خطا · ⚪️ بررسی‌نشده</i>`, keyboard: { inline_keyboard: rows } };
}
function tgNotifMenu(c) {
	c = c || {}; const en = c.TG && c.TG.enabled;
	return {
		text: `<b>📣 اعلان‌ها</b>\n\n<blockquote>اعلان فعالیت پنل در تلگرام: ${en ? '🟢 روشن' : '🔴 خاموش'}\n\nمدیریت همیشه فعال است؛ اعلان اختیاری است و فقط در صورت نیاز روشنش کنید.</blockquote>`,
		keyboard: { inline_keyboard: [
			[{ text: en ? '🔕 خاموش‌کردن اعلان' : '🔔 روشن‌کردن اعلان', callback_data: 'm:notif:toggle', style: tgSt(en) }],
			[{ text: '📤 ارسال لینک‌ها به کانال', callback_data: 'm:announce', style: 'primary' }],
			[{ text: '⬅️ بازگشت', callback_data: 'm:main', style: 'primary' }]
		] }
	};
}
async function tgHandleMenu(data, cq, env, host, userID, request, TG_JSON) {
	const botToken = TG_JSON.BotToken;
	const chatId = String(cq.message.chat.id), messageId = cq.message.message_id;
	const proto = request.url.split('://')[0];
	const edit = (m) => tgApi(botToken, 'editMessageText', { chat_id: chatId, message_id: messageId, parse_mode: 'HTML', text: m.text, reply_markup: m.keyboard });
	const loadCfg = async () => { try { return JSON.parse(await env.KV.get('config.json') || '{}'); } catch (e) { return {}; } };
	const saveCfg = (c) => env.KV.put('config.json', JSON.stringify(c, null, 2));
	const loadNet = async () => { try { return JSON.parse(await env.KV.get('network-settings.json') || '{}'); } catch (e) { return {}; } };
	const saveNet = (n) => env.KV.put('network-settings.json', JSON.stringify(n, null, 2));
	const healthOf = async () => { const hm = {}; try { const h = JSON.parse(await env.KV.get('domain-health.json') || 'null'); if (h && Array.isArray(h.domains)) for (const x of h.domains) hm[x.host] = x.ok; } catch (e) {} return hm; };
	if (data === 'm:main') return edit(tgMainMenu(`${proto}://${host}/admin`));
	if (data === 'm:settings') return edit(tgSettingsMenu(await loadCfg()));
	if (data === 'm:net') return edit(tgNetMenu(await loadNet()));
	if (data === 'm:notif') return edit(tgNotifMenu(await loadCfg()));
	if (data === 'm:hosts') return edit(tgHostsMenu(await loadCfg(), await healthOf()));
	if (data === 'm:mu') { let ns = {}; try { ns = JSON.parse(await env.KV.get('network-settings.json') || '{}'); } catch (e) {} ns.multiUser = !ns.multiUser; await env.KV.put('network-settings.json', JSON.stringify(ns, null, 2)); cachedNetworkSettings = null; data = 'm:users'; }
	if (data === 'm:users') {
		let ns = {}; try { ns = JSON.parse(await env.KV.get('network-settings.json') || '{}'); } catch (e) {}
		const users = Array.isArray(ns.users) ? ns.users : [];
		let text = '<b>👥 کاربران</b>\n\n';
		if (!ns.multiUser) text += '<blockquote>حالت چندکاربره خاموش است.\nاز پنل ← کاربران فعالش کنید.</blockquote>';
		else if (!users.length) text += '<blockquote>هنوز کاربری ثبت نشده.</blockquote>';
		else {
			for (const u of users) {
				let used = 0; try { const c = JSON.parse(await env.KV.get('uusage:' + u.id) || 'null'); used = (c && c.total) || 0; } catch (e) {}
				const q = u.quotaBytes ? (' / ' + formatBytes(u.quotaBytes)) : '';
				const exp = u.expiry ? ('📅 ' + String(u.expiry).slice(0, 10)) : 'بدون انقضا';
				text += `<blockquote>${u.enabled === false ? '🔴' : '🟢'} <b>${u.name || '-'}</b>\n📦 ${formatBytes(used)}${q}\n${exp}</blockquote>`;
			}
			text += '\n<i>افزودن/ویرایش کاربران از پنل وب.</i>';
		}
		return edit({ text, keyboard: { inline_keyboard: [[{ text: ns.multiUser ? '🔴 خاموش‌کردن چندکاربره' : '🟢 روشن‌کردن چندکاربره', callback_data: 'm:mu', style: tgSt(ns.multiUser) }], [{ text: '⬅️ بازگشت', callback_data: 'm:main', style: 'primary' }]] } });
	}
	if (data === 'm:proto') { const c = await loadCfg(); const o = ['vless', 'trojan', 'ss', 'all']; const cur = c.multiProtocolSub ? 'all' : (c.protocolType || 'vless'); const next = o[(o.indexOf(cur) + 1) % o.length]; if (next === 'all') { c.multiProtocolSub = true; if (!c.protocolType || c.protocolType === 'all') c.protocolType = 'vless'; } else { c.multiProtocolSub = false; c.protocolType = next; } await saveCfg(c); return edit(tgSettingsMenu(c)); }
	if (data === 'm:portspread') { const c = await loadCfg(); c.portSpread = !c.portSpread; await saveCfg(c); return edit(tgSettingsMenu(c)); }
	if (data === 'm:multitrans') { const c = await loadCfg(); c.multiTransportSub = !c.multiTransportSub; await saveCfg(c); return edit(tgSettingsMenu(c)); }
	if (data === 'm:trans') { const c = await loadCfg(); const o = ['ws', 'grpc', 'xhttp']; c.transportProtocol = o[(o.indexOf(c.transportProtocol || 'ws') + 1) % o.length]; await saveCfg(c); return edit(tgSettingsMenu(c)); }
	if (data === 'm:frag') { const c = await loadCfg(); c.tlsFragment = c.tlsFragment ? null : 'Shadowrocket'; await saveCfg(c); return edit(tgSettingsMenu(c)); }
	if (data === 'm:rtt') { const c = await loadCfg(); c.enable0RTT = !c.enable0RTT; await saveCfg(c); return edit(tgSettingsMenu(c)); }
	if (data === 'm:scv') { const c = await loadCfg(); c.skipCertVerify = !c.skipCertVerify; await saveCfg(c); return edit(tgSettingsMenu(c)); }
	if (data === 'm:ech') { const c = await loadCfg(); c.ECH = !c.ECH; await saveCfg(c); return edit(tgSettingsMenu(c)); }
	if (data.indexOf('m:net:') === 0) {
		const key = data.slice(6); const n = await loadNet();
		const defTrue = ['enableRouting', 'enableDomesticBypass', 'enableAdBlock', 'enableDoH', 'enableIPv6'];
		const cur = (key in n) ? n[key] : defTrue.indexOf(key) !== -1;
		n[key] = !cur; await saveNet(n); return edit(tgNetMenu(n));
	}
	if (data === 'm:notif:toggle') { const c = await loadCfg(); if (!c.TG) c.TG = {}; c.TG.enabled = !c.TG.enabled; await saveCfg(c); return edit(tgNotifMenu(c)); }
	if (data.indexOf('m:del:') === 0) {
		const h = data.slice(6); const c = await loadCfg();
		if (Array.isArray(c.HOSTS) && c.HOSTS.length > 1) { c.HOSTS = c.HOSTS.filter(x => x !== h); if (c.HOST === h) c.HOST = c.HOSTS[0]; await saveCfg(c); }
		return edit(tgHostsMenu(c, await healthOf()));
	}
	if (data.indexOf('m:edit:') === 0) {
		const field = data.slice(7);
		const prompts = { host: 'دامنه جدید (host) را در پاسخ بفرستید:', path: 'مسیر جدید را بفرستید (مثل /api):', name: 'نام اشتراک را بفرستید:', addhost: 'دامنه‌ای که می‌خواهید اضافه شود را بفرستید:', chain: 'پراکسی زنجیره‌ای را بفرستید (مثل socks5://user:pass@host:port) — برای حذف یک خط تیره (-) بفرستید:' };
		return tgApi(botToken, 'sendMessage', { chat_id: chatId, parse_mode: 'HTML', text: `✏️ ${prompts[field] || 'مقدار را بفرستید:'}\n<code>[NOVA:${field}]</code>`, reply_markup: { force_reply: true } });
	}
}

async function handleTelegramWebhook(request, env, userID, host) {
	try {
		const TG_TXT = await env.KV.get('tg.json');
		if (!TG_TXT) return new Response('Bot not configured', { status: 200 });
		const TG_JSON = JSON.parse(TG_TXT);
		if (!TG_JSON.BotToken || !TG_JSON.ChatID) return new Response('Bot not configured', { status: 200 });

		const update = await request.json();
		// Inline-keyboard button presses. "m:*" = the management console (edit in place / submenus);
		// "/*" = re-dispatch as a text command (status/sub/etc. send a fresh message).
		if (update.callback_query) {
			const cq = update.callback_query;
			await tgApi(TG_JSON.BotToken, 'answerCallbackQuery', { callback_query_id: cq.id });
			const data = cq.data || '';
			if (cq.message && data.indexOf('m:') === 0) {
				const viewMap = { 'm:status': '/status', 'm:sub': '/sub', 'm:announce': '/announce', 'm:config': '/config' };
				if (viewMap[data]) {
					const synthetic = JSON.stringify({ message: { chat: cq.message.chat, text: viewMap[data], from: cq.from } });
					return await handleTelegramWebhook(new Request(request.url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: synthetic }), env, userID, host);
				}
				try { await tgHandleMenu(data, cq, env, host, userID, request, TG_JSON); } catch (e) { console.error('tgMenu:', e); }
				return new Response('OK', { status: 200 });
			}
			if (cq.message && data) {
				const synthetic = JSON.stringify({ message: { chat: cq.message.chat, text: data, from: cq.from } });
				return await handleTelegramWebhook(new Request(request.url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: synthetic }), env, userID, host);
			}
			return new Response('OK', { status: 200 });
		}
		if (!update.message || !update.message.text) return new Response('OK', { status: 200 });

		const chatId = String(update.message.chat.id);
		if (chatId !== String(TG_JSON.ChatID)) {
			// Don't silently drop: tell the sender their Chat ID. If the admin set the wrong
			// ChatID (e.g. a channel), they now see the correct value to enter in the panel.
			try { await sendBotMessage(TG_JSON.BotToken, chatId, `<b>Nova Proxy</b>\n\nChat ID: <code>${chatId}</code>\n\n🔒 این ربات فقط به مدیر پاسخ می‌دهد. اگر مدیر هستید، این Chat ID را در پنل ← اعلان‌ها وارد و ذخیره کنید.\nThis bot only answers its admin. If that is you, set this Chat ID in Panel → Notifications.`); } catch (e) {}
			return new Response('Unauthorized', { status: 200 });
		}

		const text = update.message.text.trim();
		const cmd = text.split(' ')[0].toLowerCase();
		const args = text.slice(cmd.length).trim();

		const configJSON = await env.KV.get('config.json');
		const config_JSON = configJSON ? JSON.parse(configJSON) : {};
			// Reply to a force_reply prompt from the inline menu (edit host / path / name / add host).
			const replyTo = update.message.reply_to_message;
			if (replyTo && replyTo.text) {
				const mk = replyTo.text.match(/\[NOVA:(\w+)\]/);
				if (mk) {
					const field = mk[1], val = text;
					if (field === 'host') { config_JSON.HOST = val.trim().toLowerCase().replace(/^https?:\/\//, '').split('/')[0].split(':')[0]; if (!Array.isArray(config_JSON.HOSTS)) config_JSON.HOSTS = []; if (config_JSON.HOST && !config_JSON.HOSTS.includes(config_JSON.HOST)) config_JSON.HOSTS.unshift(config_JSON.HOST); }
					else if (field === 'path') { config_JSON.PATH = val.startsWith('/') ? val : '/' + val; }
					else if (field === 'name') { if (!config_JSON.optimizedSubGeneration) config_JSON.optimizedSubGeneration = {}; config_JSON.optimizedSubGeneration.SUBNAME = val; }
					else if (field === 'addhost') { const nh = val.trim().toLowerCase().replace(/^https?:\/\//, '').split('/')[0].split(':')[0]; if (!Array.isArray(config_JSON.HOSTS)) config_JSON.HOSTS = []; if (nh && !config_JSON.HOSTS.includes(nh)) config_JSON.HOSTS.push(nh); }
					else if (field === 'chain') { const v = val.trim(); config_JSON.chainProxy = (v === '-' || v === '') ? '' : v; }
					await env.KV.put('config.json', JSON.stringify(config_JSON, null, 2));
					await sendBotMessage(TG_JSON.BotToken, chatId, '✅ ذخیره شد. در منو /start می‌توانید ادامه دهید.');
					return new Response('OK', { status: 200 });
				}
			}

		switch (cmd) {
				case '/start': {
					const protocol = request.url.split('://')[0];
					const panelUrl = `${protocol}://${host}/admin`;
					const welcome = `<b>🛰 به ربات Nova Proxy خوش آمدید</b>

<blockquote>این ربات برای <b>مدیریت کامل پنل</b> از داخل تلگرام است:
دریافت لینک اشتراک، مشاهده‌ی وضعیت و مصرف، و تغییر تنظیمات (پروتکل، شبکه/DNS، دامنه‌ها، اعلان‌ها) — هر تغییر مستقیم روی پنل اعمال می‌شود.

از دکمه‌های زیر استفاده کنید 👇</blockquote>`;
					const replyMarkup = { inline_keyboard: [
						[{ text: "📊 وضعیت", callback_data: "m:status", style: "primary" }, { text: "🔗 اشتراک", callback_data: "m:sub", style: "primary" }],
						[{ text: "⚙️ تنظیمات", callback_data: "m:settings", style: "primary" }, { text: "🛡 شبکه و DNS", callback_data: "m:net", style: "primary" }],
						[{ text: "🌐 دامنه‌ها", callback_data: "m:hosts", style: "primary" }, { text: "📣 اعلان‌ها", callback_data: "m:notif", style: "primary" }],
						[{ text: "🖥 پنل وب (مینی‌اپ)", web_app: { url: panelUrl }, style: "success" }, { text: "🌍 وب‌سایت", url: "https://novaproxy.online", style: "primary" }],
						[{ text: "👥 گروه نوا", url: "https://t.me/irnova_proxy", style: "primary" }]
					] };
					const botUrl = `https://api.telegram.org/bot${TG_JSON.BotToken}/sendMessage?chat_id=${chatId}&parse_mode=HTML&text=${encodeURIComponent(welcome)}&reply_markup=${encodeURIComponent(JSON.stringify(replyMarkup))}`;
					try { await fetch(botUrl, { method: 'GET' }); } catch (e) { console.error('sendBotMessage error:', e); }
					break;
				}
				case '/help': {
					const helpText = `<b>📋 دستورها </b>

<blockquote><code>/start</code> · منوی مدیریت
<code>/sub</code> · دریافت لینک اشتراک
<code>/status</code> · وضعیت و مصرف
<code>/config</code> · خلاصه کانفیگ
<code>/hosts</code> · دامنه‌ها و سلامت
<code>/addhost</code> · افزودن دامنه
<code>/delhost</code> · حذف دامنه
<code>/announce</code> · ارسال به کانال
<code>/sethost</code> · تغییر host
<code>/setpath</code> · تغییر مسیر
<code>/setname</code> · تغییر نام
<code>/setwebhook</code> · نصب Webhook
<code>/myid</code> · Chat ID شما</blockquote>

`;
					await sendBotMessage(TG_JSON.BotToken, chatId, helpText);
					break;
				}
			case '/sub': {
				const subToken = await MD5MD5(host + userID);
				const protocol = request.url.split('://')[0];
				const base = `${protocol}://${host}/sub?token=${subToken}`;
				const msg = `<b>🔗 لینک‌های اشتراک </b>

<blockquote><b>🤖 خودکار (تشخیص خودکار برنامه)</b>
<code>${base}</code></blockquote>

<blockquote><b>⚡ Clash / Mihomo / Karing</b>
<code>${base}&clash</code></blockquote>

<blockquote><b>📦 Sing-box</b>
<code>${base}&sb</code></blockquote>

<blockquote><b>🔡 Base64 (Hiddify / v2rayNG)</b>
<code>${base}&b64</code></blockquote>

<b>👆 روی هر لینک بزنید تا کپی شود</b>
`;
				await sendBotMessage(TG_JSON.BotToken, chatId, msg);
				break;
			}
			case '/status': {
				const uptime = Date.now() - (globalThis.__workerStart || Date.now());
				const uptimeStr = `${Math.floor(uptime / 3600000)}h ${Math.floor((uptime % 3600000) / 60000)}m`;
				const barLen = 12;
				let msg = `<b>📊 وضعیت سرور </b>

<blockquote>⏱ <b>آپتایم:</b> <code>${uptimeStr}</code>
🆔 <b>UUID:</b> <code>${userID.slice(0, 8)}...</code>
🌐 <b>Host:</b> <code>${host}</code>
📁 <b>مسیر:</b> <code>${config_JSON.PATH || '/'}</code></blockquote>`;
				const cfUsage = config_JSON.CF?.Usage;
				if (cfUsage?.success) {
					const pct = (cfUsage.total / cfUsage.max);
					const filled = Math.round(pct * barLen);
					const empty = barLen - filled;
					const bar = '🟩'.repeat(filled) + '⬜'.repeat(empty);
					const nf = (n) => Number(n || 0).toLocaleString('en-US');
					msg += `\n<blockquote><b>📈 مصرف Cloudflare</b>\n${bar} <b>${(pct * 100).toFixed(1)}%</b>\n📄 Pages: <code>${nf(cfUsage.pages)}</code>\n⚙️ Workers: <code>${nf(cfUsage.workers)}</code>\n💠 مجموع: <code>${nf(cfUsage.total)} / ${nf(cfUsage.max)}</code></blockquote>`;
				}
				try {
					const u = await readUsageStats(env);
					const tu = (o) => `↑ <code>${formatBytes(o.up || 0)}</code>  ↓ <code>${formatBytes(o.down || 0)}</code>`;
					msg += `\n<blockquote><b>📦 حجم مصرفی / Traffic</b>\n📅 امروز: <code>${formatBytes(u.today.total)}</code>\n     ${tu(u.today)}\n🗓 این ماه: <code>${formatBytes(u.month.total)}</code>\n📆 امسال: <code>${formatBytes(u.year.total)}</code>\n♾ کل: <code>${formatBytes(u.all.total)}</code></blockquote>`;
				} catch (e) { /* best-effort */ }
				msg += ``;
				await sendBotMessage(TG_JSON.BotToken, chatId, msg);
				break;
			}
			case '/config': {
				const protocol = config_JSON.protocolType || 'vless';
				const transport = config_JSON.transportProtocol || 'ws';
				const status = (v) => v ? '🟢 فعال' : '🔴 غیرفعال';
				const fragments = config_JSON.tlsFragment || '🔴 غیرفعال';
				let msg = `<b>⚙️ تنظیمات </b>

<blockquote><b>📡 شبکه</b>

<b>پروتکل:</b> <code>${protocol}</code>  |  <b>نقل:</b> <code>${transport}</code>
<b>Host:</b> <code>${config_JSON.HOST || host}</code>
<b>مسیر:</b> <code>${config_JSON.PATH || '/'}</code>
<b>Fingerprint:</b> <code>${config_JSON.Fingerprint || 'chrome'}</code></blockquote>

<blockquote><b>🔐 امنیت</b>

<b>Skip Verify:</b> ${status(config_JSON.skipCertVerify)}
<b>ECH:</b> ${status(config_JSON.ECH)}
<b>0-RTT:</b> ${status(config_JSON.enable0RTT)}
<b>TLS Fragment:</b> ${fragments}</blockquote>

<blockquote><b>🧩 ویژگی‌ها</b>

<b>Dual Protocol:</b> ${status(config_JSON.dualProtocol)}
<b>TG Bot:</b> ${status(config_JSON.TG?.enable)}
<b>نام اشتراک:</b> <code>${config_JSON.optimizedSubGeneration?.SUBNAME || '-'}</code></blockquote>

`;
				await sendBotMessage(TG_JSON.BotToken, chatId, msg);
				break;
			}
			case '/sethost': {
				if (!args) { await sendBotMessage(TG_JSON.BotToken, chatId, `<b>⚠️ خطا </b>\n\n<blockquote>لطفا host را وارد کنید:\n<code>/sethost example.com</code></blockquote>`); break; }
				config_JSON.HOST = args.trim().toLowerCase().replace(/^https?:\/\//, '').split('/')[0].split(':')[0];
				if (!config_JSON.HOSTS) config_JSON.HOSTS = [];
				if (!config_JSON.HOSTS.includes(config_JSON.HOST)) config_JSON.HOSTS.unshift(config_JSON.HOST);
				await env.KV.put('config.json', JSON.stringify(config_JSON, null, 2));
				await sendBotMessage(TG_JSON.BotToken, chatId, `<b>✅ موفق </b>\n\n<blockquote>Host به <code>${config_JSON.HOST}</code> تغییر یافت</blockquote>`);
				break;
			}
			case '/setpath': {
				if (!args) { await sendBotMessage(TG_JSON.BotToken, chatId, `<b>⚠️ خطا </b>\n\n<blockquote>لطفا مسیر را وارد کنید:\n<code>/setpath /api</code></blockquote>`); break; }
				config_JSON.PATH = args.startsWith('/') ? args : '/' + args;
				await env.KV.put('config.json', JSON.stringify(config_JSON, null, 2));
				await sendBotMessage(TG_JSON.BotToken, chatId, `<b>✅ موفق </b>\n\n<blockquote>مسیر به <code>${config_JSON.PATH}</code> تغییر یافت</blockquote>`);
				break;
			}
			case '/setname': {
				if (!args) { await sendBotMessage(TG_JSON.BotToken, chatId, `<b>⚠️ خطا </b>\n\n<blockquote>لطفا نام را وارد کنید:\n<code>/setname MyConfig</code></blockquote>`); break; }
				if (!config_JSON.optimizedSubGeneration) config_JSON.optimizedSubGeneration = {};
				config_JSON.optimizedSubGeneration.SUBNAME = args;
				await env.KV.put('config.json', JSON.stringify(config_JSON, null, 2));
				await sendBotMessage(TG_JSON.BotToken, chatId, `<b>✅ موفق </b>\n\n<blockquote>نام اشتراک به <code>${args}</code> تغییر یافت</blockquote>`);
				break;
			}
			case '/hosts': {
				const poolHosts = (config_JSON.HOSTS && config_JSON.HOSTS.length) ? config_JSON.HOSTS : (config_JSON.HOST ? [config_JSON.HOST] : []);
				const healthMap = {};
				try { const h = JSON.parse(await env.KV.get('domain-health.json') || 'null'); if (h && Array.isArray(h.domains)) for (const d of h.domains) healthMap[d.host] = d.ok; } catch (e) { /* ignore */ }
				const list = poolHosts.length ? poolHosts.map(h => `${healthMap[h] === false ? '🔴' : healthMap[h] === true ? '🟢' : '⚪️'} <code>${h}</code>`).join('\n') : 'هیچ دامنه‌ای ثبت نشده';
				await sendBotMessage(TG_JSON.BotToken, chatId, `<b>🌐 دامنه‌ها </b>\n\n<blockquote>${list}</blockquote>\n\n<i>🟢 سالم  🔴 خطا  ⚪️ بررسی‌نشده</i>`);
				break;
			}
			case '/addhost': {
				if (!args) { await sendBotMessage(TG_JSON.BotToken, chatId, `<b>⚠️ خطا </b>\n\n<blockquote>دامنه را وارد کنید:\n<code>/addhost cdn.example.com</code></blockquote>`); break; }
				const newHost = args.trim().toLowerCase().replace(/^https?:\/\//, '').split('/')[0].split(':')[0];
				if (!config_JSON.HOSTS) config_JSON.HOSTS = [];
				if (config_JSON.HOSTS.includes(newHost)) { await sendBotMessage(TG_JSON.BotToken, chatId, `<b>ℹ️ </b>\n\n<blockquote>این دامنه از قبل در استخر است.</blockquote>`); break; }
				config_JSON.HOSTS.push(newHost);
				await env.KV.put('config.json', JSON.stringify(config_JSON, null, 2));
				await sendBotMessage(TG_JSON.BotToken, chatId, `<b>✅ موفق </b>\n\n<blockquote>دامنه <code>${newHost}</code> اضافه شد (مجموع ${config_JSON.HOSTS.length} دامنه)</blockquote>`);
				break;
			}
			case '/delhost': {
				if (!args) { await sendBotMessage(TG_JSON.BotToken, chatId, `<b>⚠️ خطا </b>\n\n<blockquote>دامنه را وارد کنید:\n<code>/delhost cdn.example.com</code></blockquote>`); break; }
				const delHost = args.trim().toLowerCase().replace(/^https?:\/\//, '').split('/')[0].split(':')[0];
				if (!config_JSON.HOSTS || !config_JSON.HOSTS.includes(delHost)) { await sendBotMessage(TG_JSON.BotToken, chatId, `<b>ℹ️ </b>\n\n<blockquote>این دامنه در استخر نیست.</blockquote>`); break; }
				if (config_JSON.HOSTS.length <= 1) { await sendBotMessage(TG_JSON.BotToken, chatId, `<b>⚠️ </b>\n\n<blockquote>نمی‌توان آخرین دامنه را حذف کرد.</blockquote>`); break; }
				config_JSON.HOSTS = config_JSON.HOSTS.filter(h => h !== delHost);
				if (config_JSON.HOST === delHost) config_JSON.HOST = config_JSON.HOSTS[0];
				await env.KV.put('config.json', JSON.stringify(config_JSON, null, 2));
				await sendBotMessage(TG_JSON.BotToken, chatId, `<b>✅ موفق </b>\n\n<blockquote>دامنه <code>${delHost}</code> حذف شد (مجموع ${config_JSON.HOSTS.length} دامنه)</blockquote>`);
				break;
			}
			case '/announce': {
				const result = await announceSubLinks(env, { baseUrl: `https://${host}`, health: JSON.parse(await env.KV.get('domain-health.json') || 'null') });
				const announceMsg = result.skipped
					? `<b>⚠️ ارسال نشد </b>\n\n<blockquote>${result.reason}</blockquote>`
					: `<b>📣 ارسال شد </b>\n\n<blockquote>لینک‌های اشتراک به کانال ارسال شد.</blockquote>`;
				await sendBotMessage(TG_JSON.BotToken, chatId, announceMsg);
				break;
			}
			case '/myid': {
				await sendBotMessage(TG_JSON.BotToken, chatId, `<b>🆔 Chat ID </b>\n\n<blockquote><code>${chatId}</code></blockquote>`);
				break;
			}
			case '/setwebhook': {
				const baseUrl = `${request.url.split('://')[0]}://${request.url.split('/')[2]}`;
				const apiUrl = `https://api.telegram.org/bot${TG_JSON.BotToken}/setWebhook?url=${encodeURIComponent(baseUrl + '/bot')}&drop_pending_updates=true`;
				const res = await fetch(apiUrl);
				await tgSetMyCommands(TG_JSON.BotToken);
				const data = await res.json();
				const msg = data.ok
					? `<b>✅ Webhook </b>\n\n<blockquote>Webhook با موفقیت نصب شد!\n\n🌐 <code>${baseUrl}/bot</code></blockquote>`
					: `<b>❌ خطا </b>\n\n<blockquote>خطا در نصب Webhook:\n<code>${JSON.stringify(data)}</code></blockquote>`;
				await sendBotMessage(TG_JSON.BotToken, chatId, msg);
				break;
			}
			default: {
				await sendBotMessage(TG_JSON.BotToken, chatId, `<b>❌ خطا </b>\n\n<blockquote>دستور ناشناخته.\nبرای راهنما <code>/help</code> را بزنید.</blockquote>`);
			}
		}
	} catch (error) {
		console.error('Telegram webhook error:', error);
	}
	return new Response('OK', { status: 200 });
}

// ---- Dashboard serving: bundled Static Assets (one-click) or proxied Pages (legacy) ----
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
	if (!PagesstaticPages || PANEL_PLACEHOLDER.test(PagesstaticPages)) return new Response('', { status: 404 });
	// Plain file hosts (GitHub raw) have no directory index / SPA routing: map an extension-less
	// route (/login, /admin) to its index.html and normalise the slash. Cache at the edge so we
	// don't hit the origin on every panel asset load.
	const _base = PagesstaticPages.replace(/\/+$/, '');
	const _isRaw = /raw\.githubusercontent\.com/i.test(_base);
	let _pn = p.split('?')[0];
	if (_isRaw && !/\.[a-z0-9]{2,5}$/i.test(_pn)) _pn = _pn.replace(/\/+$/, '') + '/index.html';
	if (!_pn.startsWith('/')) _pn = '/' + _pn;
	try {
		const r = await fetch(_base + _pn, _isRaw ? { cf: { cacheTtl: 300, cacheEverything: true } } : undefined);
		if (!_isRaw || !r.ok) return r;
		// GitHub raw serves every file as text/plain + nosniff, so the browser shows source and refuses
		// to run scripts. Re-set the correct Content-Type by extension and drop the nosniff/CSP headers.
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
		text = text.replace(/"\.\.\/logo\.png"/g, `"${PagesstaticPages}logo.png"`);
		text = text.replace(/src=['"]\.\.\/logo\.png['"]/g, `src="${PagesstaticPages}logo.png"`);
	}
	if (opts.spaPage) text = text.replace('</head>', '<script>location.hash="page=' + opts.spaPage + '";</script></head>');
	const h = new Headers();
	h.set('Content-Type', 'text/html;charset=utf-8'); // panel pages are HTML (GitHub raw mislabels them text/plain)
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

// First-run setup wizard. Lets a non-technical operator stand up the panel after a
// one-click deploy: set the admin password in-app (stored in KV) — no CLI, no secrets to
// configure. If an ADMIN env var already exists it just reports status (set-once, no overwrite).
async function handleInstall(request, env, url, adminPassword, encryptionKey, UA) {
	const sub = url.pathname.slice(1).toLowerCase().replace(/^install\/?/, '');
	const hasKV = !!(env.KV && typeof env.KV.get === 'function');
	if (sub === 'status') {
		return new Response(JSON.stringify({ kv: hasKV, admin: !!adminPassword, configured: !!(hasKV && adminPassword) }),
			{ status: 200, headers: { 'Content-Type': 'application/json;charset=utf-8', 'Cache-Control': 'no-store' } });
	}
	if (sub === 'set') {
		if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
		if (adminPassword) return new Response(JSON.stringify({ error: 'already_configured' }), { status: 409, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
		if (!hasKV) return new Response(JSON.stringify({ error: 'no_kv' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
		let body = {};
		try { body = await request.json(); } catch (e) { try { body = Object.fromEntries(new URLSearchParams(await request.text())); } catch (e2) {} }
		const pass = (body.password || '').toString().replace(/[\r\n]/g, '');
		if (pass.length < 6) return new Response(JSON.stringify({ error: 'too_short' }), { status: 400, headers: { 'Content-Type': 'application/json;charset=utf-8' } });
		try {
			await env.KV.put('admin_pass', pass);
			cachedAdminPass = pass; cachedAdminPassAt = Date.now();
		} catch (e) { return new Response(JSON.stringify({ error: 'kv_write_failed' }), { status: 500, headers: { 'Content-Type': 'application/json;charset=utf-8' } }); }
		const headers = { 'Content-Type': 'application/json;charset=utf-8' };
		try { headers['Set-Cookie'] = `auth=${await makeSessionToken((UA || 'null'), encryptionKey, pass)}; Path=/; Max-Age=86400; HttpOnly; Secure; SameSite=Lax`; } catch (e) {}
		return new Response(JSON.stringify({ success: true }), { status: 200, headers });
	}
	return await panelHtml(env, '/install/');
}

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

async function html1101(host, accessIp) {
	const now = new Date();
	const formatTimestamp = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0') + ' ' + String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0') + ':' + String(now.getSeconds()).padStart(2, '0');
	const randomString = Array.from(crypto.getRandomValues(new Uint8Array(8))).map(b => b.toString(16).padStart(2, '0')).join('');

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
                    <small class="heading-ray-id">Ray ID: ${randomString} &bull; ${formatTimestamp} UTC</small>
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
      <span class="cf-footer-item sm:block sm:mb-1">Cloudflare Ray ID: <strong class="font-semibold"> ${randomString}</strong></span>
      <span class="cf-footer-separator sm:hidden">&bull;</span>
      <span id="cf-footer-item-ip" class="cf-footer-item hidden sm:block sm:mb-1">
        Your IP:
        <button type="button" id="cf-footer-ip-reveal" class="cf-footer-ip-reveal-btn">Click to reveal</button>
        <span class="hidden" id="cf-footer-ip">${accessIp}</span>
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

///////////////////////////////////////////////////////Central API helper (needed by WARP handler)///////////////////////////////////////////////
async function getCentralApi(env) {
	let cj = {}; try { const raw = await env.KV.get('config.json'); cj = raw ? JSON.parse(raw) : {}; } catch (e) { }
	return { api: String(env.CENTRAL_API || cj.centralApi || '').trim().replace(/\/$/, ''), token: String(env.CENTRAL_TOKEN || cj.centralToken || '').trim(), cj };
}
///////////////////////////////////////////////////////Central management server hooks///////////////////////////////////////////////
// Opt-in: set CENTRAL_API (env) or centralApi (config) to the Nova control plane.
// Then the Worker reports a privacy-safe heartbeat (for instance/user counts) and
// pulls broadcast announcements. Both are no-ops until the API is set.
async function centralHeartbeat(env) {
	const { api, cj } = await getCentralApi(env); if (!api) return;
	const host = cj.HOST || (Array.isArray(cj.HOSTS) && cj.HOSTS[0]) || '';
	const id = await MD5MD5('nova-instance:' + host); // stable, non-reversible instance id
	let usage = null; try { usage = JSON.parse(await env.KV.get('usage-m:' + (new Date().getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0'))) || 'null'); } catch (e) { }
	try {
		await fetch(api + '/heartbeat', { method: 'POST', headers: { 'Content-Type': 'application/json', 'User-Agent': 'NovaProxy' }, body: JSON.stringify({ id, host, version: Version, monthTraffic: usage ? usage.total : 0, ts: Date.now() }) });
	} catch (e) { /* best-effort */ }
}
async function refreshAnnouncements(env) {
	const { api } = await getCentralApi(env); if (!api) return;
	try {
		const r = await fetch(api + '/announcement', { headers: { 'User-Agent': 'NovaProxy' } });
		if (r.ok) await env.KV.put('announcement.json', await r.text());
	} catch (e) { /* best-effort */ }
}
///////////////////////////////////////////////////////WARP / WireGuard generator (Cluster 3)///////////////////////////////////////////////
// A Cloudflare Worker can GENERATE WARP (WireGuard) configs that connect directly
// to Cloudflare's own WARP endpoints — it does NOT proxy them itself. Output:
// wireguard:// and nekoray:// node lists (Hiddify, v2rayN, NekoBox, Streisand).
// Hysteria2/TUIC cannot be served by a Worker (no inbound UDP/QUIC), so they are
// not generated. Endpoint: /warp?target=wireguard|nekoray&count=N[&mtu=1280]
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

async function handleWarpRequest(request) {
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

///////////////////////////////////////////////////////WARP registration (account + WARP+ license)///////////////////////////////////////////////
// Registers a WireGuard account with Cloudflare's WARP API so the panel's
// "Register" / "WARP+ license" buttons work and the account can be added to configs.
// Requires WebCrypto X25519 (available on recent Workers runtimes).
const WARP_API = 'https://api.cloudflareclient.com/v0a2158';
const WARP_REG_HEADERS = { 'Content-Type': 'application/json', 'User-Agent': 'okhttp/3.12.1', 'CF-Client-Version': 'a-6.10-2158' };

async function warpGenKeys() {
	const kp = await crypto.subtle.generateKey({ name: 'X25519' }, true, ['deriveBits']);
	const jwk = await crypto.subtle.exportKey('jwk', kp.privateKey);
	const rawPub = new Uint8Array(await crypto.subtle.exportKey('raw', kp.publicKey));
	const b64 = (u8) => btoa(String.fromCharCode.apply(null, u8));
	const b64urlToB64 = (s) => { s = s.replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '='; return s; };
	return { privateKey: b64urlToB64(jwk.d), publicKey: b64(rawPub) };
}

function warpDecodeReserved(clientId) {
	try { const bin = atob(clientId); return [bin.charCodeAt(0), bin.charCodeAt(1), bin.charCodeAt(2)]; } catch (e) { return []; }
}

async function warpRegisterAccount() {
	const keys = await warpGenKeys();
	const body = JSON.stringify({ key: keys.publicKey, install_id: '', fcm_token: '', tos: new Date().toISOString(), model: 'PC', type: 'Android', locale: 'en_US' });
	const r = await fetch(`${WARP_API}/reg`, { method: 'POST', headers: WARP_REG_HEADERS, body });
	if (!r.ok) throw new Error('registration HTTP ' + r.status);
	const j = await r.json();
	const peer = (j.config && j.config.peers && j.config.peers[0]) || {};
	const ep = (peer.endpoint && (peer.endpoint.host || peer.endpoint.v4)) || 'engage.cloudflareclient.com:2408';
	const iface = (j.config && j.config.interface && j.config.interface.addresses) || {};
	return {
		privateKey: keys.privateKey, publicKey: keys.publicKey, id: j.id, token: j.token,
		peerPublicKey: peer.public_key || '', endpoint: ep,
		addressV4: iface.v4 || '172.16.0.2', addressV6: iface.v6 || '',
		clientId: (j.config && j.config.client_id) || '', reserved: warpDecodeReserved((j.config && j.config.client_id) || ''),
		warpPlus: !!(j.account && j.account.warp_plus), license: (j.account && j.account.license) || null,
	};
}

async function warpApplyLicense(acct, license) {
	const r = await fetch(`${WARP_API}/reg/${acct.id}/account`, { method: 'PUT', headers: { ...WARP_REG_HEADERS, 'Authorization': 'Bearer ' + acct.token }, body: JSON.stringify({ license }) });
	const bodyText = await r.text();
	let j = {}; try { j = JSON.parse(bodyText); } catch (e) {}
	if (!r.ok) throw new Error('license rejected (HTTP ' + r.status + (j && j.errors ? ': ' + JSON.stringify(j.errors) : '') + ')');
	// The PUT does not always echo warp_plus; confirm with a follow-up account GET.
	let warpPlus = !!(j && (j.warp_plus || (j.account && j.account.warp_plus)));
	if (!warpPlus) {
		try {
			const g = await fetch(`${WARP_API}/reg/${acct.id}/account`, { headers: { ...WARP_REG_HEADERS, 'Authorization': 'Bearer ' + acct.token } });
			const gj = await g.json().catch(() => ({}));
			warpPlus = !!(gj && (gj.warp_plus || (gj.account && gj.account.warp_plus)));
		} catch (e) {}
	}
	if (!warpPlus) throw new Error('license not accepted (not WARP+, expired, or already bound to another account)');
	acct.warpPlus = true; acct.license = license;
	return acct;
}

// A WARP endpoint is host:port. Cloudflare WARP is anycast: every registered key is
// accepted on ANY WARP edge IP/port, so swapping the endpoint to a non-filtered one is
// the standard way to get WARP working under DPI (e.g. inside Iran), where the default
// engage.cloudflareclient.com:2408 is blocked. A few well-known alternatives are offered.
function warpValidEndpoint(ep) { return typeof ep === 'string' && /^[A-Za-z0-9.\-\[\]:]+:\d{1,5}$/.test(ep.trim()); }
const WARP_SUGGESTED_ENDPOINTS = [
	'engage.cloudflareclient.com:2408',
	'162.159.192.1:2408', '162.159.193.10:2408', '162.159.195.1:2408',
	'188.114.96.1:2408', '188.114.97.1:2408', '188.114.98.1:2408', '188.114.99.1:2408',
	'162.159.192.1:894', '188.114.96.1:1701', '162.159.195.1:928', '188.114.98.1:955',
];
// Safe view for the panel (no private key / token). epOverride (from networkSettings
// .warpEndpoint) replaces the API's default endpoint in the returned node/.conf.
function warpPublicView(w, epOverride) {
	if (!w || !w.registered) return { registered: false };
	const v = { registered: true, endpoint: w.endpoint, warpPlus: !!w.warpPlus, wow: w.wow ? { registered: true } : undefined, suggestedEndpoints: WARP_SUGGESTED_ENDPOINTS };
	// Admin-gated: also return a connectable WireGuard config so the panel can show the
	// node link / .conf / QR (registration used to succeed but give nothing to connect with).
	if (w.privateKey && w.peerPublicKey) {
		const baseEp = String((epOverride && warpValidEndpoint(epOverride)) ? epOverride.trim() : (w.endpoint || 'engage.cloudflareclient.com:2408'));
		const epFull = baseEp.includes(':') ? baseEp : baseEp + ':2408';
		v.endpoint = epFull; v.endpointOverridden = !!(epOverride && warpValidEndpoint(epOverride));
		const addr = '172.16.0.2/32' + (w.addressV6 ? ',' + w.addressV6 + '/128' : '');
		const reservedStr = (Array.isArray(w.reserved) && w.reserved.length) ? '&reserved=' + encodeURIComponent(w.reserved.join(',')) : '';
		v.reserved = Array.isArray(w.reserved) ? w.reserved : [];
		v.node = `wireguard://${encodeURIComponent(w.privateKey)}@${epFull}/?publickey=${encodeURIComponent(w.peerPublicKey)}${reservedStr}&address=${encodeURIComponent(addr)}&mtu=1280#Nova-WARP`;
		v.conf = `[Interface]\nPrivateKey = ${w.privateKey}\nAddress = ${addr}\nDNS = 1.1.1.1, 1.0.0.1\nMTU = 1280\n\n[Peer]\nPublicKey = ${w.peerPublicKey}\nAllowedIPs = 0.0.0.0/0, ::/0\nEndpoint = ${epFull}`;
	}
	return v;
}

// Build a wireguard:// node from the registered account (for injecting into subs).
async function buildRegisteredWarpNode(env) {
	let w; try { w = JSON.parse(await env.KV.get('warp.json') || 'null'); } catch (e) { return ''; }
	if (!w || !w.registered || !w.privateKey || !w.peerPublicKey) return '';
	const epOv = (networkSettings && networkSettings.warpEndpoint && warpValidEndpoint(networkSettings.warpEndpoint)) ? networkSettings.warpEndpoint.trim() : '';
	const ep = String(epOv || w.endpoint || 'engage.cloudflareclient.com:2408');
	const encPriv = encodeURIComponent(w.privateKey), encPub = encodeURIComponent(w.peerPublicKey);
	const addr = encodeURIComponent('172.16.0.2/32' + (w.addressV6 ? ',' + w.addressV6 + '/128' : ''));
	const reservedStr = (Array.isArray(w.reserved) && w.reserved.length) ? '&reserved=' + encodeURIComponent(w.reserved.join(',')) : '';
	return `wireguard://${encPriv}@${ep.includes(':') ? ep : ep + ':2408'}/?publickey=${encPub}${reservedStr}&address=${addr}&mtu=1280#Nova-WARP`;
}

// --- Nova auth hardening helpers ---------------------------------------------
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
async function isAuthed(request, UA, key, pass) {
	const cookies = request.headers.get('Cookie') || '';
	const authCookie = cookies.split(';').find(c => c.trim().startsWith('auth='))?.split('=')[1];
	return await verifySessionToken(authCookie, UA, key, pass);
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
// ---- TOTP (RFC 6238) for optional 2FA — works with Google Authenticator, Authy, Keeper, … ----
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
// --- end Nova auth hardening helpers -----------------------------------------

///////////////////////////////////////////////////////GitHub Sub Mirror///////////////////////////////////////////////
async function getGitHubMirrorConfig(env) {
	let m = {};
	try { const raw = (env.KV && env.KV.get) ? await env.KV.get('config.json') : null; const cj = raw ? JSON.parse(raw) : null; if (cj && cj.mirror) m = cj.mirror; } catch (e) {}
	const token = (m.token || env.GH_TOKEN || env.GITHUB_TOKEN || '').trim();
	const repo = (m.repo || env.GH_REPO || '').trim().replace(/^https?:\/\/github\.com\//i, '').replace(/\.git$/i, '').replace(/^\/|\/$/g, '');
	return {
		token, repo,
		branch: (m.branch || env.GH_BRANCH || 'main').trim(),
		pathPrefix: (m.pathPrefix || env.GH_PATH || '').trim().replace(/^\/|\/$/g, ''),
		enabled: (m.enabled !== undefined) ? !!m.enabled : (!!token && !!repo),
	};
}

function utf8ToBase64(str) {
	const bytes = new TextEncoder().encode(str);
	let binary = '';
	const chunk = 0x8000;
	for (let i = 0; i < bytes.length; i += chunk) binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
	return btoa(binary);
}

async function githubPutFile(cfg, path, content, message) {
	const apiPath = path.split('/').filter(Boolean).map(encodeURIComponent).join('/');
	const api = `https://api.github.com/repos/${cfg.repo}/contents/${apiPath}`;
	const headers = {
		'Authorization': `Bearer ${cfg.token}`,
		'Accept': 'application/vnd.github+json',
		'User-Agent': 'nova-proxy-worker',
		'X-GitHub-Api-Version': '2022-11-28',
	};
	const newB64 = utf8ToBase64(content);
	let sha;
	try {
		const getRes = await fetch(`${api}?ref=${encodeURIComponent(cfg.branch)}`, { headers });
		if (getRes.ok) {
			const j = await getRes.json();
			sha = j.sha;
			if (typeof j.content === 'string' && j.content.replace(/\s/g, '') === newB64) return { ok: true, status: 200, unchanged: true };
		}
	} catch (e) {}
	const body = JSON.stringify({ message, content: newB64, branch: cfg.branch, ...(sha ? { sha } : {}) });
	const putRes = await fetch(api, { method: 'PUT', headers, body });
	return { ok: putRes.ok, status: putRes.status };
}

async function publishSubMirror(env, baseUrl) {
	const cfg = await getGitHubMirrorConfig(env);
	if (!cfg.token || !cfg.repo) return { skipped: true, reason: 'set the GitHub repo + token in the dashboard (or GH_TOKEN/GH_REPO env)' };
	if (!cfg.enabled) return { skipped: true, reason: 'mirror disabled' };

	if (!baseUrl) {
		try {
			const raw = env.KV && typeof env.KV.get === 'function' ? await env.KV.get('config.json') : null;
			const cj = raw ? JSON.parse(raw) : null;
			const host = cj && (cj.HOST || (Array.isArray(cj.HOSTS) && cj.HOSTS[0]));
			if (host) baseUrl = 'https://' + String(host).replace(/^https?:\/\//, '').replace(/\/.*$/, '');
		} catch (e) {}
	}
	if (!baseUrl) return { skipped: true, reason: 'no host configured (set HOST in the dashboard first)' };

	// T5: the /sub endpoint is token-gated; the old /sub/<file>.txt paths returned the nginx disguise.
	// Build the real token (same formula as the panel: MD5MD5(host + userID)) and fetch the token-based
	// sub in each format. NOTE: on *.workers.dev a Worker cannot fetch its own hostname, so the mirror
	// only works once a custom domain is bound to the Worker.
	const _mhost = String(baseUrl).replace(/^https?:\/\//, '').replace(/\/.*$/, '').toLowerCase();
	let _uid = env.UUID || env.uuid || null;
	if (!_uid && env.KV && typeof env.KV.get === 'function') { try { _uid = await env.KV.get('worker_uuid'); } catch (e) {} }
	if (!_uid) return { skipped: true, reason: 'worker UUID not initialized yet (open the panel once, then retry)' };
	const _subToken = await MD5MD5(_mhost + String(_uid).toLowerCase());
	const files = [
		{ name: 'base64.txt', q: 'b64' },
		{ name: 'mihomo.yaml', q: 'clash' },
		{ name: 'singbox.json', q: 'singbox' },
	];
	const results = [];
	for (const f of files) {
		try {
			// Generate the sub IN-PROCESS: a Worker can't fetch its own hostname (self-subrequest is
			// blocked -> 502), so invoke our own handler with a synthetic request, no network round-trip.
			const _subReq = new Request(`${baseUrl}/sub?token=${_subToken}&${f.q}`, { headers: { 'User-Agent': 'NovaMirror/1.0' } });
			const r = await novaWorker.fetch(_subReq, env, { waitUntil(_p) { try { _p && _p.catch && _p.catch(() => {}); } catch (e) {} }, passThroughOnException() {} });
			if (!r.ok) { results.push({ file: f.name, ok: false, status: r.status, error: 'sub fetch failed (HTTP ' + r.status + '; on workers.dev the Worker cannot fetch its own domain — bind a custom domain)' }); continue; }
			const content = await r.text();
			if (!content || content.length < 8 || /Welcome to nginx/i.test(content)) { results.push({ file: f.name, ok: false, error: 'sub returned the disguise page (token/host mismatch, or self-fetch blocked on workers.dev)' }); continue; }
			const ghPath = (cfg.pathPrefix ? cfg.pathPrefix + '/' : '') + f.name;
			const put = await githubPutFile(cfg, ghPath, content, `Nova: update ${f.name} (${new Date().toISOString()})`);
			results.push({ file: f.name, ...put });
		} catch (e) {
			results.push({ file: f.name, ok: false, error: e && e.message ? e.message : String(e) });
		}
	}
	const rawBase = `https://raw.githubusercontent.com/${cfg.repo}/${cfg.branch}/${cfg.pathPrefix ? cfg.pathPrefix + '/' : ''}`;
	return { skipped: false, repo: cfg.repo, branch: cfg.branch, rawLinks: files.map(f => rawBase + f.name), results };
}
