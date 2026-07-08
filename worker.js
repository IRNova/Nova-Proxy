// Build: 2026-07-08T06:43:04.793Z
// @ts-nocheck
let e=27951,t=65029,r=33509,n=5415,i=49299,o=23473,s=2717,a=13940,c=31928,l=25522,d=33949,w=59448,f=73876,h=97544,p=92478,g=91666,m=55162,y=25224,x=24451,v=23527,b=35509,k=78716,S=82517,C=99490,L=1386,M=97023,_=8025,K=87875,P=25653,R=78976,T=8807,X=91012,Y=42372,Z=69561,N=44490,H=2733,J=37839,B=19828,E=4662,D=99174,F=86568,G=85596,I=55209,O=2521,U=42040,W=18748,Q=56231,A=55193,V=82750,j=96376,q=16960,u=8040,z=58633,ee=95108,et=3873,er=13075,en=45399,ei=45618,eo=15405,es=79245,ea=97689,ec=5950,el=70407,ed=13512,ew=23680,ef=68812,eh=68405,ep=41802,eg=64194,em=91435,ey=59645,ex=23284,ev=86909,eb=77068,ek=18586,e0=31339,e1=90460,e2=76288,e3=28725,e4=65476;function e5(s){return new TextDecoder().decode(Uint8Array.from(atob(s),c=>c.charCodeAt(0)))}const e6 = '2026-06-17 01:41:21';
let e7, e8 = '', e9 = null, te = false, tt = '', tr = {};
let tn = null, ti, to, ts = 0, ta = true, tc = false;
let tl = '';
let td = null;
let tw = null;
let tf = '', th = null, tp = 0, tg = '';
let tm = false, ty = false;
let tx = null, tv = 0;
let tb = ['*tapecontent.net', '*cloudatacdn.com', '*loadshare.org', '*cdn-centaurus.com', 'scholar.google.com'];
const tk = 'https://nova-panel.github.io/';
const t0 = '🎁 نوا رایگان است، برای آن به کسی پول ندهید';
globalThis.__workerStart = Date.now();
const t1 = 'config.json';
let t2 = null, t3 = 0;
async function t4(env) {
  if (t2 !== null && Date.now() - t3 < 30000) return t2;
  try {
    t2 = env.KV && typeof env.KV.get === 'function' ? await env.KV.get(t1) : null;
    t3 = Date.now();
  } catch (t5) {}
  return t2;
}
function t6(env, t7) {
  t2 = t7;
  t3 = Date.now();
  return env.KV.put(t1, t7);
}
const t8 = 86400000;
const t9 = 8, re = 600000, rt = 900000;
const rr = new Map();
let rn = null, ri = 0;
const ro = 8 * 1024, rs = Math.ceil(ro * 4 / 3) + 4;
const ra = 16 * 1024, rc = 16 * 1024 * 1024, rl = 4096;
const rd = 32 * 1024, rw = 512, rf = 0;
let rh = 2, rp = false;
function rg(rm, ry) {
  if (typeof rm !== 'string' || typeof ry !== 'string' || rm.length !== ry.length) return false;
  let rx = 0;
  for (let rv = 0; rv < rm.length; rv++) rx |= rm.charCodeAt(rv) ^ ry.charCodeAt(rv);
  return rx === 0;
}
async function rb(rk, r0, r1, r2 = Date.now()) {
  const r3 = new TextEncoder();
  const r4 = await e8k('SHA-256', r3.encode(String(r0)), r3.encode(`${rk}|${r1}|${r2}`));
  const r5 = Array.from(r4, r6 => r6.toString(16).padStart(2, '0')).join('');
  return `${r2}.${r5}`;
}
async function r7(r8, r9, ne, nt, nr = t8) {
  if (!r8 || typeof r8 !== 'string') return false;
  const nn = r8.indexOf('.');
  if (nn <= 0) return false;
  const ni = Number(r8.slice(0, nn));
  if (!Number.isFinite(ni)) return false;
  const no = Date.now() - ni;
  if (no > nr || no < -60000) return false;
  const ns = await rb(r9, ne, nt, ni);
  return rg(r8, ns);
}
async function na(nc, nl, nd, nw) {
  const nf = nc.headers.get('Cookie') || '';
  const nh = nf.split(';').find(np => np.trim().startsWith('auth='))?.split('=')[1];
  return await r7(nh, nl, nd, nw);
}
function ng(nm) {
  const ny = Date.now();
  const nx = rr.get(nm);
  if (nx && nx.blockedUntil && ny < nx.blockedUntil) return {
    allowed: false,
    retryAfter: Math.ceil((nx.blockedUntil - ny) / 1000)
  };
  return {
    allowed: true
  };
}
function nv(nb) {
  const nk = Date.now();
  let n0 = rr.get(nb);
  if (!n0 || nk - n0.windowStart > re) n0 = {
    count: 0,
    windowStart: nk,
    blockedUntil: 0
  };
  n0.count++;
  if (n0.count >= t9) n0.blockedUntil = nk + rt;
  rr.set(nb, n0);
  if (rr.size > 5000) {
    for (const [n1, n2] of rr) {
      if (!n2.blockedUntil || nk > n2.blockedUntil) rr.delete(n1);
      if (rr.size <= 4000) break;
    }
  }
}
function n3(n4) {
  rr.delete(n4);
}
function n5(n6 = 32) {
  const n7 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  const n8 = crypto.getRandomValues(new Uint8Array(n6));
  let n9 = '';
  for (const ie of n8) n9 += n7[ie % 32];
  return n9;
}
function it(ir) {
  const ii = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let io = '';
  const is = [];
  for (const ia of String(ir).toUpperCase().replace(/=+$/, '').replace(/[^A-Z2-7]/g, '')) io += ii.indexOf(ia).toString(2).padStart(5, '0');
  for (let ic = 0; ic + 8 <= io.length; ic += 8) is.push(parseInt(io.slice(ic, ic + 8), 2));
  return new Uint8Array(is);
}
async function il(id, iw) {
  const ih = it(id);
  const ip = new ArrayBuffer(8);
  const ig = new DataView(ip);
  ig.setUint32(0, Math.floor(iw / 0x100000000));
  ig.setUint32(4, iw >>> 0);
  const im = await crypto.subtle.importKey('raw', ih, {
    name: 'HMAC',
    hash: 'SHA-1'
  }, false, ['sign']);
  const iy = new Uint8Array(await crypto.subtle.sign('HMAC', im, ip));
  const ix = iy[iy.length - 1] & 0xf;
  const iv = (iy[ix] & 0x7f) << 24 | (iy[ix + 1] & 0xff) << 16 | (iy[ix + 2] & 0xff) << 8 | iy[ix + 3] & 0xff;
  return (iv % 1000000).toString().padStart(6, '0');
}
async function ib(ik, i0, window = 1) {
  i0 = String(i0 || '').trim();
  if (!(/^\d{6}$/).test(i0) || !ik) return false;
  const i1 = Math.floor(Date.now() / 30000);
  for (let i2 = -window; i2 <= window; i2++) {
    if (await il(ik, i1 + i2) === i0) return true;
  }
  return false;
}
function i3(env) {
  try {
    if (env && (env.PANEL_RECOVERY === '1' || env.PANEL_RECOVERY === 'true')) return {
      on: false,
      adminPath: '',
      loginPath: '',
      subPath: '',
      pubAdmin: '/admin',
      pubLogin: '/login'
    };
    const i4 = tw || ({});
    const i5 = i6 => String(i6 || '').trim().toLowerCase().replace(/^\/+|\/+$/g, '').replace(/[^a-z0-9_-]/g, '').slice(0, 40);
    const i7 = i5(env && env.ADMIN_PATH || i4.adminPath);
    const i8 = i5(env && env.LOGIN_PATH || i4.loginPath);
    const i9 = i5(env && env.SUB_PATH || i4.subPath);
    const oe = (!!i4.disguise || !!(env && (env.ADMIN_PATH || env.LOGIN_PATH || env.SUB_PATH))) && !!(i7 || i8 || i9);
    if (!oe) return {
      on: false,
      adminPath: '',
      loginPath: '',
      subPath: '',
      pubAdmin: '/admin',
      pubLogin: '/login'
    };
    return {
      on: true,
      adminPath: i7,
      loginPath: i8,
      subPath: i9,
      pubAdmin: i7 ? '/' + i7 : '/admin',
      pubLogin: i8 ? '/' + i8 : '/login'
    };
  } catch (ot) {
    return {
      on: false,
      adminPath: '',
      loginPath: '',
      subPath: '',
      pubAdmin: '/admin',
      pubLogin: '/login'
    };
  }
}
const or = [(Proxy.name + "IP").toUpperCase(), (String.fromCharCode(67, 109) + URL.name[2] + 'i' + URL.name[0]).toLowerCase(), String(2407 * 300 - 10).split('').reverse().join('')];
function on(oi, oo) {
  return oi.text().then(os => {
    os = os.replace(/"\.\.\/logo\.png"/g, `"${oo}logo.png"`);
    os = os.replace(/src=['"]\.\.\/logo\.png['"]/g, `src="${oo}logo.png"`);
    return new Response(os, {
      status: oi.status,
      statusText: oi.statusText,
      headers: oi.headers
    });
  });
}
function oa(env) {
  return !!(env && env.DB && typeof env.DB.prepare === 'function');
}
async function oc(env) {
  if (tm || !oa(env)) return tm;
  try {
    await env.DB.batch([env.DB.prepare('CREATE TABLE IF NOT EXISTS usage (k TEXT PRIMARY KEY, up INTEGER DEFAULT 0, down INTEGER DEFAULT 0, total INTEGER DEFAULT 0)'), env.DB.prepare('CREATE TABLE IF NOT EXISTS logs (id INTEGER PRIMARY KEY AUTOINCREMENT, TYPE TEXT, IP TEXT, ASN TEXT, CC TEXT, URL TEXT, UA TEXT, TIME INTEGER)'), env.DB.prepare('CREATE TABLE IF NOT EXISTS kvstore (k TEXT PRIMARY KEY, v TEXT, updated INTEGER)')]);
    tm = true;
  } catch (ol) {
    console.error('d1Init: ' + (ol && ol.message || ol));
  }
  return tm;
}
function od(env) {
  if (env && !(env.DB && typeof env.DB.prepare === 'function') && env.D1 && typeof env.D1.prepare === 'function') env.DB = env.D1;
  if (!env || env.__kvWrapped || !oa(env)) return;
  const ow = env.KV && typeof env.KV.get === 'function' ? env.KV : null;
  env.__realKV = ow;
  env.__hasRealKV = !!ow;
  env.KV = {
    __real: ow,
    get: async (oh, op) => {
      if (op && ow) return ow.get(oh, op);
      try {
        if (await oc(env)) {
          const og = await env.DB.prepare(e5("U0VMRUNUIHYgRlJPTSBrdnN0b3JlIFdIRVJFIGs9Pw==")).bind(oh).first();
          if (og && og.v != null) return og.v;
          if (ow && !ty) {
            const om = await ow.get(oh);
            if (om != null) {
              try {
                await env.DB.prepare('INSERT INTO kvstore (k,v,updated) VALUES (?,?,?) ON CONFLICT(k) DO UPDATE SET v=excluded.v, updated=excluded.updated').bind(oh, om, Date.now()).run();
              } catch (oy) {}
            }
            return om;
          }
          return null;
        }
      } catch (ox) {}
      return ow ? ow.get(oh, op) : null;
    },
    put: async (ov, ob, ok) => {
      try {
        if (typeof ob === 'string' && await oc(env)) await env.DB.prepare('INSERT INTO kvstore (k,v,updated) VALUES (?,?,?) ON CONFLICT(k) DO UPDATE SET v=excluded.v, updated=excluded.updated').bind(ov, ob, Date.now()).run();
      } catch (o0) {}
      if (ow && (env.NOVA_KV_MIRROR === '1' || env.NOVA_KV_MIRROR === 'true')) {
        try {
          ow.put(ov, ob, ok).catch(() => {});
        } catch (o1) {}
      }
    },
    delete: async o2 => {
      try {
        if (await oc(env)) await env.DB.prepare('DELETE FROM kvstore WHERE k=?').bind(o2).run();
      } catch (o3) {}
      if (ow && (env.NOVA_KV_MIRROR === '1' || env.NOVA_KV_MIRROR === 'true')) {
        try {
          ow.delete(o2).catch(() => {});
        } catch (o4) {}
      }
    },
    list: async o5 => {
      o5 = o5 || ({});
      try {
        if (await oc(env)) {
          const o6 = await env.DB.prepare(e5("U0VMRUNUIGsgRlJPTSBrdnN0b3JlIFdIRVJFIGsgTElLRSA/IE9SREVSIEJZIGs=")).bind((o5.prefix || '') + '%').all();
          return {
            keys: (o6.results || []).map(o7 => ({
              name: o7.k
            })),
            list_complete: true,
            cursor: null
          };
        }
      } catch (o8) {}
      return ow ? ow.list(o5) : {
        keys: [],
        list_complete: true,
        cursor: null
      };
    }
  };
  env.__kvWrapped = true;
}
async function o9(env) {
  try {
    if (!oa(env) || !env.__realKV) return;
    if (!await oc(env)) return;
    const se = await env.DB.prepare('SELECT v FROM kvstore WHERE k=?').bind('__kv_migrated').first();
    if (se && se.v) {
      ty = true;
      return;
    }
    let st, sr = 0;
    do {
      const sn = await env.__realKV.list({
        cursor: st
      });
      for (const si of sn.keys || []) {
        try {
          const so = await env.__realKV.get(si.name);
          if (so != null) {
            await env.DB.prepare('INSERT INTO kvstore (k,v,updated) VALUES (?,?,?) ON CONFLICT(k) DO NOTHING').bind(si.name, so, Date.now()).run();
            sr++;
          }
        } catch (ss) {}
      }
      st = sn.list_complete ? null : sn.cursor;
    } while (st);
    await env.DB.prepare('INSERT INTO kvstore (k,v,updated) VALUES (?,?,?) ON CONFLICT(k) DO UPDATE SET v=excluded.v, updated=excluded.updated').bind('__kv_migrated', String(Date.now()), Date.now()).run();
    ty = true;
    console.log('migrateKvToD1: copied ' + sr + ' keys');
  } catch (sa) {
    console.error('migrateKvToD1: ' + (sa && sa.message || sa));
  }
}
function sc(sl) {
  const sd = sl || new Date();
  return sd.getFullYear() + '-' + String(sd.getMonth() + 1).padStart(2, '0') + '-' + String(sd.getDate()).padStart(2, '0');
}
function sw(sf) {
  const sh = sf || new Date();
  return sh.getFullYear() + '-' + String(sh.getMonth() + 1).padStart(2, '0');
}
async function sp(env, sg) {
  if (oa(env) && await oc(env)) {
    try {
      const sm = await env.DB.prepare(e5("U0VMRUNUIHVwLGRvd24sdG90YWwgRlJPTSB1c2FnZSBXSEVSRSBrPT8=")).bind(sg).first();
      return sm ? {
        up: sm.up || 0,
        down: sm.down || 0,
        total: sm.total || 0
      } : null;
    } catch (sy) {
      console.error('usageGet: ' + sy);
    }
  }
  try {
    return JSON.parse(await env.KV.get(sg) || 'null');
  } catch (sx) {
    return null;
  }
}
async function sv(env, sb, sk, s0) {
  sk = sk || 0;
  s0 = s0 || 0;
  if (oa(env) && await oc(env)) {
    try {
      const s1 = await env.DB.prepare(e5("SU5TRVJUIElOVE8gdXNhZ2UgKGssdXAsZG93bix0b3RhbCkgVkFMVUVTICg/LD8sPyw/KSBPTiBDT05GTElDVChrKSBETyBVUERBVEUgU0VUIHVwPXVwKz8sIGRvd249ZG93bis/LCB0b3RhbD10b3RhbCs/IFJFVFVSTklORyB0b3RhbA==")).bind(sb, sk, s0, sk + s0, sk, s0, sk + s0).first();
      return s1 && s1.total || 0;
    } catch (s2) {
      console.error('usageAdd: ' + s2);
    }
  }
  let s3;
  try {
    s3 = JSON.parse(await env.KV.get(sb) || 'null');
  } catch (s4) {
    s3 = null;
  }
  if (!s3 || typeof s3 !== 'object') s3 = {
    up: 0,
    down: 0,
    total: 0
  };
  s3.up = (s3.up || 0) + sk;
  s3.down = (s3.down || 0) + s0;
  s3.total = (s3.total || 0) + sk + s0;
  await env.KV.put(sb, JSON.stringify(s3));
  return s3.total;
}
let s5 = {
  up: 0,
  down: 0
};
let s6 = 0;
let s7 = false;
const s8 = 5 * 60 * 1000, s9 = 200 * 1024 * 1024;
async function ae(env) {
  if (s7) return;
  const at = s5.up, ar = s5.down;
  if (at + ar <= 0) return;
  s7 = true;
  s5 = {
    up: 0,
    down: 0
  };
  try {
    const an = new Date();
    await sv(env, 'usage:' + sc(an), at, ar);
    await sv(env, 'usage-m:' + sw(an), at, ar);
  } catch (ai) {
    s5.up += at;
    s5.down += ar;
    console.error('flushUsage failed: ' + (ai.message || ai));
  } finally {
    s7 = false;
  }
}
function ao(env, aa, ac, ctx) {
  s5.up += aa || 0;
  s5.down += ac || 0;
  const al = s5.up + s5.down;
  if (al <= 0) return;
  const ad = Date.now();
  if (ad - s6 < s8 && al < s9) return;
  s6 = ad;
  if (ctx && ctx.waitUntil) ctx.waitUntil(ae(env)); else ae(env).catch(() => {});
}
let aw = -1, af = 0;
async function ah(env) {
  if (aw >= 0 && Date.now() - af < 60000) return aw;
  try {
    const ap = await sp(env, 'usage-m:' + sw(new Date()));
    aw = ap && ap.total || 0;
  } catch (ag) {
    if (aw < 0) aw = 0;
  }
  af = Date.now();
  return aw;
}
function am() {
  const ay = tw && Number(tw.speedLimitKBps);
  return isFinite(ay) && ay > 0 ? ay : 0;
}
function ax(av) {
  const ab = typeof av === 'number' && av > 0 ? av * 1024 : 0;
  if (!ab) return {
    enabled: false,
    take() {
      return Promise.resolve();
    }
  };
  const ak = Math.max(ab, 64 * 1024);
  let a0 = ak, a1 = Date.now();
  const a2 = () => {
    const a3 = Date.now();
    a0 = Math.min(ak, a0 + (a3 - a1) / 1000 * ab);
    a1 = a3;
  };
  return {
    enabled: true,
    async take(a4) {
      a4 = Math.max(0, a4 | 0);
      for (; ; ) {
        a2();
        if (a0 >= a4 || a4 >= ak) {
          a0 -= Math.min(a4, a0);
          return;
        }
        const a5 = Math.min(1000, Math.max(1, Math.ceil((a4 - a0) / ab * 1000)));
        await new Promise(a6 => setTimeout(a6, a5));
      }
    }
  };
}
const a7 = new Map();
function a8(a9) {
  const ce = am();
  if (!(ce > 0)) return {
    enabled: false,
    take() {
      return Promise.resolve();
    }
  };
  const ct = 'ip:' + (tl || 'global');
  const cr = ct + ':' + a9;
  let cn = a7.get(cr);
  if (!cn || cn.kbps !== ce) {
    cn = {
      limiter: ax(ce),
      kbps: ce,
      at: Date.now()
    };
    a7.set(cr, cn);
  } else cn.at = Date.now();
  if (a7.size > 1024) {
    const ci = Date.now() - 300000;
    for (const [co, cs] of a7) if (cs.at < ci) a7.delete(co);
  }
  return cn.limiter;
}
function ca(cc) {
  return (/^(\d{1,3}\.){3}\d{1,3}$/).test(cc);
}
async function cl(cd) {
  try {
    const cw = await fetch('https://cloudflare-dns.com/dns-query?name=' + encodeURIComponent(cd) + '&type=A', {
      headers: {
        accept: 'application/dns-json'
      }
    });
    const cf = await cw.json();
    const ch = (cf.Answer || []).filter(cp => cp.type === 1).map(cg => cg.data);
    return ch.length ? ch[Math.floor(Math.random() * ch.length)] : null;
  } catch (cm) {
    return null;
  }
}
function cy(cx, cv) {
  const cb = String(cx).trim().replace(/[\[\]]/g, '').replace(/:+$/, '');
  const ck = cv.split('.').map(c0 => parseInt(c0, 10));
  if (ck.length !== 4 || ck.some(c1 => isNaN(c1) || c1 < 0 || c1 > 255)) return null;
  const c2 = ((ck[0] << 8 | ck[1]) >>> 0).toString(16).padStart(4, '0') + ':' + ((ck[2] << 8 | ck[3]) >>> 0).toString(16).padStart(4, '0');
  return `[${cb}::${c2}]`;
}
async function c3() {
  const c4 = (tf || '').trim();
  if (!c4) return [];
  if ((/^https?:\/\//i).test(c4)) {
    if (th && tg === c4 && Date.now() - tp < 3600000) return th;
    try {
      const c5 = await fetch(c4, {
        headers: {
          'User-Agent': 'NovaProxy'
        }
      });
      const c6 = await c5.text();
      let c7 = (c6.match(/\[([0-9a-fA-F:]+::)\]/g) || []).map(c8 => c8.replace(/[\[\]]/g, ''));
      if (!c7.length) c7 = c6.split(/[\n,]+/).map(c9 => c9.replace(/[\[\]]/g, '').trim()).filter(le => le.includes('::'));
      th = [...new Set(c7)];
      tp = Date.now();
      tg = c4;
      return th;
    } catch (lt) {
      return th || [];
    }
  }
  return [...new Set(c4.split(/[\n,]+/).map(lr => lr.replace(/[\[\]]/g, '').trim()).filter(Boolean))];
}
async function ln(li, lo, ls, la) {
  const lc = await c3();
  if (!lc.length) return null;
  const ll = ca(li) ? li : await cl(li);
  if (!ll) return null;
  for (const ld of lc.slice(0, 4)) {
    const lw = cy(ld, ll);
    if (!lw) continue;
    try {
      const lf = la({
        hostname: lw.replace(/[\[\]]/g, ''),
        port: lo
      });
      await Promise.race([lf.opened, new Promise((lh, lp) => setTimeout(() => lp(new Error('NAT64连接超时')), 5000))]);
      if (validDataLength(ls) > 0) {
        const lg = lf.writable.getWriter();
        try {
          await lg.write(eh5(ls));
        } finally {
          try {
            lg.releaseLock();
          } catch (lm) {}
        }
      }
      tbv(`[NAT64] 连接成功: ${lw}:${lo}`);
      return lf;
    } catch (ly) {
      tbv(`[NAT64] 连接失败 ${lw}: ${ly.message || ly}`);
    }
  }
  return null;
}
export default {
  async fetch(lx, env, ctx) {
    td = env;
    od(env);
    if (!ty && env.__realKV && ctx && typeof ctx.waitUntil === 'function') ctx.waitUntil(o9(env));
    let lv = lx.url.replace(/%5[Cc]/g, '').replace(/\\/g, '');
    const lb = lv.indexOf('#');
    const lk = lb === -1 ? lv : lv.slice(0, lb);
    if (!lk.includes('?') && (/%3f/i).test(lk)) {
      const l0 = lb === -1 ? '' : lv.slice(lb);
      lv = lk.replace(/%3f/i, '?') + l0;
    }
    const l1 = new URL(lv);
    const l2 = lx.headers.get('User-Agent') || 'null';
    const l3 = (lx.headers.get('Upgrade') || '').toLowerCase(), l4 = (lx.headers.get('content-type') || '').toLowerCase();
    const l5 = env.ADMIN || env.admin || env.PASSWORD || env.password || env.pswd || env.TOKEN || env.KEY || env.UUID || env.uuid;
    const l6 = env.ADMIN || env.admin || env.PASSWORD || env.password || env.pswd || env.TOKEN || env.KEY;
    let l7 = l5;
    if (env.KV && typeof env.KV.get === 'function') {
      if (rn !== null && Date.now() - ri < 60000) {
        if (rn) l7 = rn;
      } else {
        try {
          const l8 = await env.KV.get('admin_pass');
          if (l8) {
            l7 = l8;
            rn = l8;
            ri = Date.now();
          } else {
            rn = '';
            ri = Date.now() - 55000;
          }
        } catch (l9) {}
      }
    }
    let de = env.KEY;
    if (!de && env.KV && typeof env.KV.get === 'function') {
      try {
        de = await env.KV.get('auto_key');
        if (!de) {
          de = Array.from(crypto.getRandomValues(new Uint8Array(24)), dt => e5("YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5")[dt % 36]).join('');
          await env.KV.put('auto_key', de);
        }
      } catch (dr) {}
    }
    if (!de) de = '勿动此默认密钥，有需求请自行通过添加变量KEY进行修改';
    const dn = await t7h(l5 + de);
    const di = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    const ds = env.UUID || env.uuid;
    let da;
    if (ds && di.test(ds)) {
      da = ds.toLowerCase();
    } else {
      const dc = l5 || de;
      const dl = await t7h(dc + de);
      const dd = [dl.slice(0, 8), dl.slice(8, 12), '4' + dl.slice(13, 16), '8' + dl.slice(17, 20), dl.slice(20)].join('-');
      let dw = null;
      if (env.KV && typeof env.KV.get === 'function') {
        if (tx !== null && Date.now() - tv < 600000) {
          dw = tx || null;
        } else {
          try {
            let df = await env.KV.get('worker_uuid');
            if (!df) {
              df = dd;
              try {
                await env.KV.put('worker_uuid', df);
              } catch (dh) {}
            }
            tx = df || '';
            tv = Date.now();
            dw = df || null;
          } catch (dp) {}
        }
      }
      da = dw && di.test(dw) ? dw.toLowerCase() : dd;
    }
    const dg = env.HOST ? (await rix(env.HOST)).map(dm => dm.toLowerCase().replace(/^https?:\/\//, '').split('/')[0].split(':')[0]) : [l1.hostname];
    const dy = dg[0];
    let dx = l1.pathname.slice(1).toLowerCase();
    tc = ['1', 'true'].includes(env.DEBUG) || tc;
    rp = ['1', 'true'].includes(env.PRELOAD_RACE_DIAL) || rp;
    try {
      if (env.KV && typeof env.KV.get === 'function') {
        const dv = await env.KV.get('network-settings.json');
        tw = dv ? JSON.parse(dv) : {
          enableRouting: true,
          enableGeoIP: true,
          enableGeoSite: true,
          enableAdBlock: true,
          enablePornBlock: false,
          enableDomesticBypass: true,
          enableDoH: true,
          dohProvider: 'cloudflare',
          enableLocalDNS: false,
          localDNSIP: '8.8.8.8',
          localDNSPort: '53',
          enableAntiSanctionDNS: false,
          antiSanctionDNSProvider: 'cloudflare',
          antiSanctionCustomDNS: '',
          enableFakeDNS: false,
          fakeDNSIP: '198.51.100.1',
          enableIPv6: true,
          allowLAN: false,
          logLevel: 'error',
          enableWarp: false,
          warpMode: 'warp',
          warpEndpoint: '',
          warpAmnezia: false,
          customRules: '',
          monthlyCapGB: 0,
          speedLimitKBps: 0,
          blockQUIC: false,
          warpNoise: {
            mode: '',
            count: '',
            size: '',
            delay: ''
          }
        };
      } else {
        tw = {
          enablePornBlock: false,
          enableDomesticBypass: true,
          enableAdBlock: true
        };
      }
    } catch (db) {
      tw = {
        enablePornBlock: false,
        enableDomesticBypass: true,
        enableAdBlock: true
      };
    }
    if (rh !== 1 && rnw(lx) === 'cmcc') rh = 1;
    if (env.PROXYIP) {
      const dk = await rix(env.PROXYIP);
      e8 = dk[Math.floor(Math.random() * dk.length)];
      ta = false;
    } else e8 = `${lx.cf.colo}.${or[0]}.${or[1]}SsSs.nEt`.toLowerCase();
    tf = env.NAT64 || env.nat64 || '';
    const d0 = lx.headers.get('CF-Connecting-IP') || lx.headers.get('True-Client-IP') || lx.headers.get('X-Real-IP') || lx.headers.get('X-Forwarded-For') || lx.headers.get('Fly-Client-IP') || lx.headers.get('X-Appengine-Remote-Addr') || lx.headers.get('X-Cluster-Client-IP') || '未知IP';
    if (tn === null) {
      if (env.GO2SOCKS5) tb = [...new Set(tb.concat(await rix(env.GO2SOCKS5)))];
      tn = tb;
    } else tb = tn;
    const d1 = i3(env);
    if (d1.on && l3 !== 'websocket') {
      const d2 = dx;
      if (d1.adminPath && (d2 === d1.adminPath || d2.startsWith(d1.adminPath + '/'))) {
        dx = 'admin' + d2.slice(d1.adminPath.length);
      } else if (d1.loginPath && d2 === d1.loginPath) {
        dx = 'login';
      } else if (d1.subPath && (d2 === d1.subPath || d2.startsWith(d1.subPath + '/'))) {
        dx = 'sub' + d2.slice(d1.subPath.length);
      } else if (d1.adminPath && d2 === 'admin' && lx.method === 'GET' || d1.loginPath && d2 === 'login' && lx.method === 'GET') {
        if ((env.URL || '').trim() === '1101') return new Response(await rxy(l1.host, d0), {
          status: 200,
          headers: {
            'Content-Type': 'text/html; charset=UTF-8'
          }
        });
        return new Response(await rxm(), {
          status: 200,
          headers: {
            'Content-Type': e5("dGV4dC9odG1sOyBjaGFyc2V0PVVURi04")
          }
        });
      }
    }
    {
      const d3 = l3 === 'websocket' || !dx.startsWith('admin/') && dx !== 'login' && dx !== 'bot' && lx.method === 'POST';
      const d4 = dx === 'sub' || dx.startsWith('sub/');
      if (d3 || d4) {
        let d5 = e7 && e7.paused === true;
        if (!d5) {
          try {
            const d6 = await t4(env);
            if (d6 && (/"paused"\s*:\s*true/).test(d6)) d5 = true;
          } catch (d7) {}
        }
        if (d5) return new Response('Service paused', {
          status: 503,
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
            'Cache-Control': 'no-store'
          }
        });
        const d8 = Number(tw && tw.monthlyCapGB || env.MONTHLY_CAP_GB || env.MONTHLY_CAP || 0);
        if (d8 > 0 && await ah(env) >= d8 * 1073741824) return new Response(e5("TW9udGhseSBkYXRhIGNhcCByZWFjaGVk"), {
          status: 503,
          headers: {
            'Content-Type': e5("dGV4dC9wbGFpbjtjaGFyc2V0PXV0Zi04"),
            'Cache-Control': 'no-store'
          }
        });
      }
    }
    tl = d0;
    if (dx === 'version') {
      const d9 = (l1.searchParams.get('uuid') || '').toLowerCase();
      if (di.test(d9)) {
        const we = String(da).toLowerCase();
        let wt = 0, wr = 0;
        for (let wn = 0; wn < 8; wn++) {
          const wi = d9.charCodeAt(wn);
          wt += wi <= 57 ? wi - 48 : wi - 87;
          const wo = we.charCodeAt(wn);
          wr += wo <= 57 ? wo - 48 : wo - 87;
        }
        if (wt === wr && d9.slice(-12) === we.slice(-12)) return new Response(JSON.stringify({
          Version: Number(String(e6).replace(/\D+/g, ''))
        }), {
          status: 200,
          headers: {
            'Content-Type': e5("YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04")
          }
        });
      }
    } else if (l7 && l3 === 'websocket') {
      await rci(l1, da);
      tbv(`[WebSocket] 命中请求: ${l1.pathname}${l1.search}`);
      return await es2(lx, da, l1);
    } else if (l7 && !dx.startsWith('admin/') && dx !== 'login' && lx.method === 'POST') {
      await rci(l1, da);
      const ws = lx.headers.get('Referer') || '';
      const wa = ws.includes('x_padding', 14) || ws.includes('x_padding=');
      if (!wa && l4.startsWith('application/grpc')) {
        tbv(`[gRPC] 命中请求: ${l1.pathname}${l1.search}`);
        return await en2(lx, da);
      }
      tbv(`[XHTTP] 命中请求: ${l1.pathname}${l1.search}`);
      return await ee4(lx, da);
    } else {
      if (l1.protocol === 'http:') return Response.redirect(l1.href.replace(`http://${l1.hostname}`, `https://${l1.hostname}`), 301);
      if (dx === 'dns-query' || l1.pathname === '/dns-query' || dx === 'doh' || l1.pathname === '/doh') {
        return rhx(lx);
      }
      if (dx === 'scan' || dx === 'radar') {
        return rxp();
      }
      if (dx === 'nova-block') {
        return rhh(lx);
      }
      if (dx === 'setwebhook') {
        const wc = l1.searchParams.get('key');
        if (wc !== l5) return new Response('Unauthorized', {
          status: 403
        });
        const wl = await env.KV.get('tg.json');
        if (!wl) return new Response('Bot not configured', {
          status: 400
        });
        const wd = JSON.parse(wl);
        if (!wd.BotToken) return new Response('BotToken not found', {
          status: 400
        });
        const ww = `${l1.protocol}//${l1.host}/bot`;
        const wf = `https://api.telegram.org/bot${wd.BotToken}/setWebhook?url=${encodeURIComponent(ww)}&drop_pending_updates=true`;
        const wh = await fetch(wf);
        const wp = await wh.json();
        return new Response(JSON.stringify(wp, null, 2), {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
      if (dx === 'bot') {
        if (lx.method === 'POST') return await rpg(lx, env, da, dy);
        return new Response('Bot webhook active', {
          status: 200
        });
      }
      if (dx === 'install/status') {
        const wg = !!(env.KV && typeof env.KV.get === 'function');
        const wm = !!(env.DB && typeof env.DB.prepare === 'function');
        let wy = false, wx = '';
        if (wm) {
          try {
            wy = await oc(env);
            wx = wy ? 'ok' : 'err:init';
          } catch (wv) {
            wx = 'err:' + (wv && wv.message || wv);
          }
        }
        const wb = {
          admin: !!l7,
          kv: wg,
          d1: wy,
          d1Bound: wm,
          d1Probe: wx,
          uuid: !!ds,
          configured: !!l7 && (wg || wy || !!ds)
        };
        return new Response(JSON.stringify(wb), {
          status: 200,
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Cache-Control': 'no-store'
          }
        });
      }
      if (dx === 'install/set') {
        if (lx.method !== 'POST') return new Response('Method Not Allowed', {
          status: 405
        });
        if (!(env.KV && typeof env.KV.put === 'function')) return new Response(JSON.stringify({
          error: 'no_kv'
        }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }
        });
        if (l7) return new Response(JSON.stringify({
          error: 'already_configured'
        }), {
          status: 409,
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }
        });
        let wk = {};
        try {
          wk = await lx.json();
        } catch (w0) {}
        const w1 = (wk.password || '').toString().replace(/[\r\n]/g, '');
        if (w1.length < 6) return new Response(JSON.stringify({
          error: 'too_short'
        }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }
        });
        try {
          if (!(env.UUID || env.uuid)) {
            const w2 = await env.KV.get('worker_uuid');
            if (!w2) await env.KV.put('worker_uuid', da);
          }
        } catch (w3) {}
        await env.KV.put('admin_pass', w1);
        rn = w1;
        ri = Date.now();
        const w4 = new Response(JSON.stringify({
          success: true
        }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }
        });
        w4.headers.set('Set-Cookie', `auth=${await rb(l2, de, w1)}; Path=/; Max-Age=86400; HttpOnly; Secure; SameSite=Lax`);
        return w4;
      }
      if (!l7) return fetch(tk + '/install').then(async w5 => {
        const w6 = new Headers(w5.headers);
        w6.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        w6.set('Pragma', 'no-cache');
        w6.set('Expires', '0');
        let w7 = await w5.text();
        w7 = w7.replace(/"\.\.\/logo\.png"/g, `"${tk}logo.png"`);
        w7 = w7.replace(/src=['"]\.\.\/logo\.png['"]/g, `src="${tk}logo.png"`);
        return new Response(w7, {
          status: 200,
          statusText: w5.statusText,
          headers: w6
        });
      }).catch(() => new Response('ADMIN not configured', {
        status: 404
      }));
      if (env.KV && typeof env.KV.get === 'function') {
        const w8 = l1.pathname.slice(1);
        if (w8 === de && de !== e5("5Yu/5Yqo5q2k6buY6K6k5a+G6ZKl77yM5pyJ6ZyA5rGC6K+36Ieq6KGM6YCa6L+H5re75Yqg5Y+Y6YePS0VZ6L+b6KGM5L+u5pS5")) {
          const w9 = new URLSearchParams(l1.search);
          w9.set('token', await t7h(dy + da));
          return new Response('重定向中...', {
            status: 302,
            headers: {
              'Location': `/sub?${w9.toString()}`
            }
          });
        } else if (dx === 'login') {
          const fe = lx.headers.get('Cookie') || '';
          const ft = fe.split(';').find(fr => fr.trim().startsWith('auth='))?.split('=')[1];
          if (await r7(ft, l2, de, l7)) return new Response('重定向中...', {
            status: 302,
            headers: {
              'Location': d1.pubAdmin
            }
          });
          if (lx.method === 'POST') {
            const fn = lx.headers.get('cf-connecting-ip') || lx.headers.get('x-real-ip') || 'unknown';
            const fi = ng(fn);
            if (!fi.allowed) return new Response(JSON.stringify({
              error: 'rate_limited'
            }), {
              status: 429,
              headers: {
                'Content-Type': e5("YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04"),
                'Retry-After': String(fi.retryAfter),
                'Cache-Control': 'no-store'
              }
            });
            const fo = await lx.text();
            const fs = new URLSearchParams(fo);
            const fa = fs.get('password');
            const fc = fl => String(fl == null ? '' : fl).trim().replace(/[\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g, '');
            if (rg(fc(fa), fc(l7)) || l6 && rg(fc(fa), fc(l6))) {
              let fd = null;
              try {
                if (env.KV && typeof env.KV.get === 'function') fd = JSON.parse(await env.KV.get('admin_2fa.json') || 'null');
              } catch (fw) {}
              if (fd && fd.enabled && fd.secret) {
                const ff = (fs.get('code') || fs.get('otp') || '').trim();
                if (!ff) return new Response(JSON.stringify({
                  need2fa: true
                }), {
                  status: 200,
                  headers: {
                    'Content-Type': e5("YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04")
                  }
                });
                if (!await ib(fd.secret, ff)) {
                  nv(fn);
                  return new Response(JSON.stringify({
                    need2fa: true,
                    error: 'bad_code'
                  }), {
                    status: 401,
                    headers: {
                      'Content-Type': 'application/json;charset=utf-8'
                    }
                  });
                }
              }
              const fh = new Response(JSON.stringify({
                success: true
              }), {
                status: 200,
                headers: {
                  'Content-Type': e5("YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04")
                }
              });
              n3(fn);
              fh.headers.set('Set-Cookie', `auth=${await rb(l2, de, l7)}; Path=/; Max-Age=86400; HttpOnly; Secure; SameSite=Lax`);
              return fh;
            } else {
              nv(fn);
            }
          }
          return fetch(tk + '/login').then(fp => on(fp, tk));
        } else if (dx === 'admin' || dx.startsWith('admin/')) {
          const fg = lx.headers.get('Cookie') || '';
          const fm = fg.split(';').find(fy => fy.trim().startsWith('auth='))?.split('=')[1];
          if (!fm || !await r7(fm, l2, de, l7)) return new Response('重定向中...', {
            status: 302,
            headers: {
              'Location': d1.pubLogin
            }
          });
          if (dx === 'admin/security/status') {
            let fx = null;
            try {
              fx = JSON.parse(await env.KV.get('admin_2fa.json') || 'null');
            } catch (fv) {}
            const fb = await env.KV.get('admin_pass');
            return new Response(JSON.stringify({
              twofa: !!(fx && fx.enabled),
              passwordSource: fb ? 'kv' : 'env',
              envRecovery: !!l6,
              kvSet: !!fb,
              uuidPinned: !!await env.KV.get('worker_uuid')
            }), {
              status: 200,
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Cache-Control': 'no-store'
              }
            });
          } else if (dx === e5("YWRtaW4vc2VjdXJpdHkvY2hhbmdlLXBhc3N3b3Jk")) {
            if (lx.method !== 'POST') return new Response('Method Not Allowed', {
              status: 405
            });
            let fk = {};
            try {
              fk = await lx.json();
            } catch (f0) {}
            const f1 = (fk.current || '').toString().replace(/[\r\n]/g, '');
            const f2 = (fk.new || '').toString().replace(/[\r\n]/g, '');
            const f3 = rg(f1, String(l7 || '').replace(/[\r\n]/g, '')) || l6 && rg(f1, String(l6).replace(/[\r\n]/g, ''));
            if (!f3) return new Response(JSON.stringify({
              error: 'wrong_current'
            }), {
              status: 403,
              headers: {
                'Content-Type': e5("YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04")
              }
            });
            if (f2.length < 6) return new Response(JSON.stringify({
              error: 'too_short'
            }), {
              status: 400,
              headers: {
                'Content-Type': 'application/json;charset=utf-8'
              }
            });
            try {
              if (!(env.UUID || env.uuid)) {
                const f4 = await env.KV.get('worker_uuid');
                if (!f4) {
                  await env.KV.put('worker_uuid', da);
                  tx = da;
                  tv = Date.now();
                }
              }
            } catch (f5) {}
            await env.KV.put('admin_pass', f2);
            rn = f2;
            ri = Date.now();
            const f6 = new Response(JSON.stringify({
              success: true
            }), {
              status: 200,
              headers: {
                'Content-Type': 'application/json;charset=utf-8'
              }
            });
            f6.headers.set('Set-Cookie', `auth=${await rb(l2, de, f2)}; Path=/; Max-Age=86400; HttpOnly; Secure; SameSite=Lax`);
            return f6;
          } else if (dx === 'admin/security/reveal') {
            let f7 = 'none';
            try {
              f7 = l6 ? 'env' : await env.KV.get('admin_pass') ? 'kv' : 'none';
            } catch (f8) {
              f7 = l6 ? 'env' : 'none';
            }
            return new Response(JSON.stringify({
              password: l7 || '',
              source: f7
            }), {
              status: 200,
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Cache-Control': 'no-store'
              }
            });
          } else if (dx === 'admin/security/2fa-setup') {
            const f9 = n5(32);
            const he = encodeURIComponent('Nova Proxy (' + l1.host + ')');
            const ht = `otpauth://totp/${he}?secret=${f9}&issuer=${encodeURIComponent('Nova Proxy')}&algorithm=SHA1&digits=6&period=30`;
            return new Response(JSON.stringify({
              secret: f9,
              otpauth: ht
            }), {
              status: 200,
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Cache-Control': 'no-store'
              }
            });
          } else if (dx === 'admin/security/2fa-enable') {
            if (lx.method !== 'POST') return new Response('Method Not Allowed', {
              status: 405
            });
            let hr = {};
            try {
              hr = await lx.json();
            } catch (hn) {}
            const hi = (hr.secret || '').toString().trim();
            const ho = (hr.code || '').toString().trim();
            if (!hi) return new Response(JSON.stringify({
              error: 'no_secret'
            }), {
              status: 400,
              headers: {
                'Content-Type': e5("YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04")
              }
            });
            if (!await ib(hi, ho)) return new Response(JSON.stringify({
              error: 'bad_code'
            }), {
              status: 400,
              headers: {
                'Content-Type': 'application/json;charset=utf-8'
              }
            });
            await env.KV.put('admin_2fa.json', JSON.stringify({
              enabled: true,
              secret: hi,
              addedAt: Date.now()
            }));
            return new Response(JSON.stringify({
              success: true
            }), {
              status: 200,
              headers: {
                'Content-Type': 'application/json;charset=utf-8'
              }
            });
          } else if (dx === 'admin/security/2fa-disable') {
            if (lx.method !== 'POST') return new Response('Method Not Allowed', {
              status: 405
            });
            let hs = {};
            try {
              hs = await lx.json();
            } catch (ha) {}
            const hc = (hs.code || '').toString().trim();
            let hl = null;
            try {
              hl = JSON.parse(await env.KV.get('admin_2fa.json') || 'null');
            } catch (hd) {}
            if (hl && hl.enabled && hl.secret && !await ib(hl.secret, hc)) return new Response(JSON.stringify({
              error: 'bad_code'
            }), {
              status: 400,
              headers: {
                'Content-Type': 'application/json;charset=utf-8'
              }
            });
            await env.KV.delete('admin_2fa.json');
            return new Response(JSON.stringify({
              success: true
            }), {
              status: 200,
              headers: {
                'Content-Type': 'application/json;charset=utf-8'
              }
            });
          } else if (dx === 'admin/log.json') {
            const hw = await env.KV.get('log.json') || '[]';
            return new Response(hw, {
              status: 200,
              headers: {
                'Content-Type': 'application/json;charset=utf-8'
              }
            });
          } else if (w8 === 'admin/getCloudflareUsage') {
            try {
              const hf = await rlb(l1.searchParams.get('Email'), l1.searchParams.get('GlobalAPIKey'), l1.searchParams.get('AccountID'), l1.searchParams.get('APIToken'));
              return new Response(JSON.stringify(hf, null, 2), {
                status: 200,
                headers: {
                  'Content-Type': 'application/json'
                }
              });
            } catch (hh) {
              const hp = {
                msg: e5("RmFpbGVkIHRvIGxvYWQgcmVxdWVzdCBjb3VudCAvINiu2LfYpyDYr9ixINiv2LHbjNin2YHYqiDYqti52K/Yp9ivINiv2LHYrtmI2KfYs9iq4oCM2YfYpzog") + hh.message,
                error: hh.message
              };
              return new Response(JSON.stringify(hp, null, 2), {
                status: 500,
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                }
              });
            }
          } else if (w8 === 'admin/getADDAPI') {
            if (l1.searchParams.get('url')) {
              const hg = l1.searchParams.get('url');
              try {
                new URL(hg);
                const hm = await roa([hg], l1.searchParams.get('port') || '443');
                let hy = hm[0].length > 0 ? hm[0] : hm[1];
                hy = hy.map(hx => hx.replace(/#(.+)$/, (hv, hb) => '#' + decodeURIComponent(hb)));
                return new Response(JSON.stringify({
                  success: true,
                  data: hy
                }, null, 2), {
                  status: 200,
                  headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  }
                });
              } catch (hk) {
                const h0 = {
                  msg: 'Optimized API check failed / بررسی API ناموفق بود: ' + hk.message,
                  error: hk.message
                };
                return new Response(JSON.stringify(h0, null, 2), {
                  status: 500,
                  headers: {
                    'Content-Type': e5("YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04")
                  }
                });
              }
            }
            return new Response(JSON.stringify({
              success: false,
              data: []
            }, null, 2), {
              status: 403,
              headers: {
                'Content-Type': e5("YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04")
              }
            });
          } else if (dx === 'admin/check') {
            const h1 = ['socks5', 'http', 'https', 'turn', 'sstp'].find(h2 => l1.searchParams.has(h2)) || null;
            if (!h1) return new Response(JSON.stringify({
              error: 'Missing proxy parameter / پارامتر پروکسی موجود نیست'
            }), {
              status: 400,
              headers: {
                'Content-Type': 'application/json;charset=utf-8'
              }
            });
            const h3 = l1.searchParams.get(h1);
            const h4 = Date.now();
            let h5;
            try {
              tr = await rlo(h3, rlt(h1));
              const {username: h6, password: h7, hostname: h8, port: h9} = tr;
              const pe = h6 && h7 ? `${h6}:${h7}@${h8}:${h9}` : `${h8}:${h9}`;
              try {
                const pt = 'cloudflare.com', pr = 443, pn = new TextEncoder(), pi = new TextDecoder();
                const po = e6l(lx);
                let ps = null, pa = null;
                try {
                  ps = h1 === 'socks5' ? await e22(pt, pr, new Uint8Array(0), po) : h1 === 'turn' ? await tfk(tr, pt, pr, po) : h1 === 'sstp' ? await tp3(tr, pt, pr, po) : h1 === 'https' && tdv(h8) ? await e4v(pt, pr, new Uint8Array(0), po) : await e3m(pt, pr, new Uint8Array(0), h1 === 'https', po);
                  if (!ps) throw new Error('无法连接到代理服务器');
                  pa = new tsc(ps, {
                    serverName: pt,
                    insecure: true
                  });
                  await pa.handshake();
                  await pa.write(pn.encode(`GET /cdn-cgi/trace HTTP/1.1\r\nHost: ${pt}\r\nUser-Agent: Mozilla/5.0\r\nConnection: close\r\n\r\n`));
                  let pc = new Uint8Array(0), pl = -1, pd = null, pw = false;
                  const pf = 64 * 1024;
                  while (pc.length < pf) {
                    const ph = await pa.read();
                    if (!ph) break;
                    if (ph.byteLength === 0) continue;
                    pc = eh7(pc, ph);
                    if (pl === -1) {
                      const pp = pc.findIndex((pg, pm) => pm < pc.length - 3 && pc[pm] === 0x0d && pc[pm + 1] === 0x0a && pc[pm + 2] === 0x0d && pc[pm + 3] === 0x0a);
                      if (pp !== -1) {
                        pl = pp + 4;
                        const py = pi.decode(pc.slice(0, pl));
                        const px = py.split('\r\n')[0] || '';
                        const pv = px.match(/HTTP\/\d\.\d\s+(\d+)/);
                        const pb = pv ? parseInt(pv[1], 10) : NaN;
                        if (!Number.isFinite(pb) || pb < 200 || pb >= 300) throw new Error(`代理检测请求失败: ${px || '无效响应'}`);
                        const pk = py.match(/\r\nContent-Length:\s*(\d+)/i);
                        if (pk) pd = parseInt(pk[1], 10);
                        pw = (/\r\nTransfer-Encoding:\s*chunked/i).test(py);
                      }
                    }
                    if (pl !== -1 && pd !== null && pc.length >= pl + pd) break;
                    if (pl !== -1 && pw && pi.decode(pc).includes('\r\n0\r\n\r\n')) break;
                  }
                  if (pl === -1) throw new Error('代理检测响应头过长或无效');
                  const p0 = pi.decode(pc);
                  const p1 = p0.match(/(?:^|\n)ip=(.*)/)?.[1];
                  const p2 = p0.match(/(?:^|\n)loc=(.*)/)?.[1];
                  if (!p1 || !p2) throw new Error('代理检测响应无效');
                  h5 = {
                    success: true,
                    proxy: h1 + "://" + pe,
                    ip: p1,
                    loc: p2,
                    responseTime: Date.now() - h4
                  };
                } finally {
                  try {
                    pa ? pa.close() : await ps?.close?.();
                  } catch (p3) {}
                }
              } catch (p4) {
                h5 = {
                  success: false,
                  error: p4.message,
                  proxy: h1 + "://" + pe,
                  responseTime: Date.now() - h4
                };
              }
            } catch (p5) {
              h5 = {
                success: false,
                error: p5.message,
                proxy: h1 + "://" + h3,
                responseTime: Date.now() - h4
              };
            }
            return new Response(JSON.stringify(h5, null, 2), {
              status: 200,
              headers: {
                'Content-Type': e5("YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04")
              }
            });
          }
          e7 = await t97(env, dy, da, l2);
          if (dx === 'admin/init') {
            try {
              e7 = await t97(env, dy, da, l2, true);
              ctx.waitUntil(t6y(env, lx, d0, 'Init_Config', e7));
              e7.init = '配置已重置为默认值';
              return new Response(JSON.stringify(e7, null, 2), {
                status: 200,
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                }
              });
            } catch (p6) {
              const p7 = {
                msg: e5("Q29uZmlnIHJlc2V0IGZhaWxlZCAvINio2KfYstmG2LTYp9mG24wg2b7bjNqp2LHYqNmG2K/bjCDZhtin2YXZiNmB2YIg2KjZiNivOiA=") + p6.message,
                error: p6.message
              };
              return new Response(JSON.stringify(p7, null, 2), {
                status: 500,
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                }
              });
            }
          } else if (lx.method === 'POST') {
            if (dx === 'admin/config.json') {
              try {
                const p8 = await lx.json();
                const p9 = {
                  protocolType: '协议类型',
                  transportProtocol: '传输协议',
                  gRPCmode: 'gRPC模式',
                  skipCertVerify: '跳过证书验证',
                  tlsFragment: 'TLS分片',
                  randomPath: '随机路径',
                  subConverterConfig: '订阅转换配置',
                  proxy: '反代',
                  optimizedSubGeneration: '优选订阅生成'
                };
                for (const ge in p9) {
                  if ((ge in p8)) {
                    p8[p9[ge]] = p8[ge];
                    delete p8[ge];
                  }
                }
                if (p8.优选订阅生成 && typeof p8.优选订阅生成 === 'object') delete p8.优选订阅生成.TOKEN;
                if (!p8.UUID || !p8.HOST) return new Response(JSON.stringify({
                  error: 'Incomplete configuration / پیکربندی ناقص است'
                }), {
                  status: 400,
                  headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  }
                });
                await t6(env, JSON.stringify(p8, null, 2));
                ctx.waitUntil(t6y(env, lx, d0, 'Save_Config', e7));
                return new Response(JSON.stringify({
                  success: true,
                  message: 'Configuration saved / پیکربندی ذخیره شد'
                }), {
                  status: 200,
                  headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  }
                });
              } catch (gt) {
                console.error('保存配置失败:', gt);
                return new Response(JSON.stringify({
                  error: e5("RmFpbGVkIHRvIHNhdmUgY29uZmlndXJhdGlvbiAvINiw2K7bjNix2Ycg2b7bjNqp2LHYqNmG2K/bjCDZhtin2YXZiNmB2YIg2KjZiNivOiA=") + gt.message
                }), {
                  status: 500,
                  headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  }
                });
              }
            } else if (dx === 'admin/cf.json') {
              try {
                const gr = await lx.json();
                const gn = {
                  Email: null,
                  GlobalAPIKey: null,
                  AccountID: null,
                  APIToken: null,
                  UsageAPI: null
                };
                if (!gr.init || gr.init !== true) {
                  if (gr.Email && gr.GlobalAPIKey) {
                    gn.Email = gr.Email;
                    gn.GlobalAPIKey = gr.GlobalAPIKey;
                  } else if (gr.AccountID && gr.APIToken) {
                    gn.AccountID = gr.AccountID;
                    gn.APIToken = gr.APIToken;
                  } else if (gr.UsageAPI) {
                    gn.UsageAPI = gr.UsageAPI;
                  } else {
                    return new Response(JSON.stringify({
                      error: 'Incomplete configuration / پیکربندی ناقص است'
                    }), {
                      status: 400,
                      headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                      }
                    });
                  }
                }
                await env.KV.put('cf.json', JSON.stringify(gn, null, 2));
                ctx.waitUntil(t6y(env, lx, d0, 'Save_Config', e7));
                return new Response(JSON.stringify({
                  success: true,
                  message: 'Configuration saved / پیکربندی ذخیره شد'
                }), {
                  status: 200,
                  headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  }
                });
              } catch (gi) {
                console.error('保存配置失败:', gi);
                return new Response(JSON.stringify({
                  error: 'Failed to save configuration / ذخیره پیکربندی ناموفق بود: ' + gi.message
                }), {
                  status: 500,
                  headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  }
                });
              }
            } else if (dx === 'admin/tg.json') {
              try {
                const go = await lx.json();
                if (go.init && go.init === true) {
                  const gs = {
                    BotToken: null,
                    ChatID: null
                  };
                  await env.KV.put('tg.json', JSON.stringify(gs, null, 2));
                } else {
                  if (!go.BotToken || !go.ChatID) return new Response(JSON.stringify({
                    error: e5("SW5jb21wbGV0ZSBjb25maWd1cmF0aW9uIC8g2b7bjNqp2LHYqNmG2K/bjCDZhtin2YLYtSDYp9iz2Ko=")
                  }), {
                    status: 400,
                    headers: {
                      'Content-Type': e5("YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04")
                    }
                  });
                  await env.KV.put('tg.json', JSON.stringify(go, null, 2));
                }
                ctx.waitUntil(t6y(env, lx, d0, 'Save_Config', e7));
                return new Response(JSON.stringify({
                  success: true,
                  message: 'Configuration saved / پیکربندی ذخیره شد'
                }), {
                  status: 200,
                  headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  }
                });
              } catch (ga) {
                console.error('保存配置失败:', ga);
                return new Response(JSON.stringify({
                  error: e5("RmFpbGVkIHRvIHNhdmUgY29uZmlndXJhdGlvbiAvINiw2K7bjNix2Ycg2b7bjNqp2LHYqNmG2K/bjCDZhtin2YXZiNmB2YIg2KjZiNivOiA=") + ga.message
                }), {
                  status: 500,
                  headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  }
                });
              }
            } else if (dx === e5("YWRtaW4vbmV0d29yay1zZXR0aW5ncy5qc29u")) {
              try {
                const gc = await lx.json();
                const gl = {
                  enableRouting: typeof gc.enableRouting === 'boolean' ? gc.enableRouting : true,
                  enableGeoIP: typeof gc.enableGeoIP === 'boolean' ? gc.enableGeoIP : true,
                  enableGeoSite: typeof gc.enableGeoSite === 'boolean' ? gc.enableGeoSite : true,
                  enableAdBlock: typeof gc.enableAdBlock === 'boolean' ? gc.enableAdBlock : true,
                  enablePornBlock: typeof gc.enablePornBlock === 'boolean' ? gc.enablePornBlock : false,
                  enableDomesticBypass: typeof gc.enableDomesticBypass === 'boolean' ? gc.enableDomesticBypass : true,
                  enableDoH: typeof gc.enableDoH === 'boolean' ? gc.enableDoH : true,
                  dohProvider: ['cloudflare', 'google', 'quad9', 'adguard'].includes(gc.dohProvider) ? gc.dohProvider : 'cloudflare',
                  enableLocalDNS: typeof gc.enableLocalDNS === 'boolean' ? gc.enableLocalDNS : false,
                  localDNSIP: gc.localDNSIP || '8.8.8.8',
                  localDNSPort: gc.localDNSPort || '53',
                  enableAntiSanctionDNS: typeof gc.enableAntiSanctionDNS === 'boolean' ? gc.enableAntiSanctionDNS : false,
                  antiSanctionDNSProvider: ['cloudflare', 'google', 'quad9', 'adguard', 'alidns', 'shekan', 'custom'].includes(gc.antiSanctionDNSProvider) ? gc.antiSanctionDNSProvider : 'cloudflare',
                  antiSanctionCustomDNS: gc.antiSanctionCustomDNS || '',
                  enableFakeDNS: typeof gc.enableFakeDNS === 'boolean' ? gc.enableFakeDNS : false,
                  fakeDNSIP: gc.fakeDNSIP || '198.51.100.1',
                  enableIPv6: typeof gc.enableIPv6 === 'boolean' ? gc.enableIPv6 : true,
                  allowLAN: typeof gc.allowLAN === 'boolean' ? gc.allowLAN : false,
                  logLevel: ['debug', 'info', 'warn', 'error'].includes(gc.logLevel) ? gc.logLevel : 'error',
                  enableWarp: typeof gc.enableWarp === 'boolean' ? gc.enableWarp : false,
                  warpMode: ['warp', 'chain', 'wow'].includes(gc.warpMode) ? gc.warpMode : 'warp',
                  warpEndpoint: typeof gc.warpEndpoint === 'string' ? gc.warpEndpoint.slice(0, 80) : '',
                  warpAmnezia: typeof gc.warpAmnezia === 'boolean' ? gc.warpAmnezia : false,
                  customRules: typeof gc.customRules === 'string' ? gc.customRules.slice(0, 4000) : '',
                  warpNoise: gc.warpNoise && typeof gc.warpNoise === 'object' ? {
                    mode: ['', 'quic', 'random'].includes(gc.warpNoise.mode) ? gc.warpNoise.mode : '',
                    count: String(gc.warpNoise.count || '').slice(0, 12),
                    size: String(gc.warpNoise.size || '').slice(0, 12),
                    delay: String(gc.warpNoise.delay || '').slice(0, 12)
                  } : {
                    mode: '',
                    count: '',
                    size: '',
                    delay: ''
                  },
                  monthlyCapGB: typeof gc.monthlyCapGB === 'number' && isFinite(gc.monthlyCapGB) && gc.monthlyCapGB >= 0 ? gc.monthlyCapGB : 0,
                  speedLimitKBps: typeof gc.speedLimitKBps === 'number' && isFinite(gc.speedLimitKBps) && gc.speedLimitKBps >= 0 ? gc.speedLimitKBps : 0,
                  blockQUIC: typeof gc.blockQUIC === 'boolean' ? gc.blockQUIC : false,
                  disguise: typeof gc.disguise === 'boolean' ? gc.disguise : false,
                  adminPath: String(gc.adminPath || '').trim().toLowerCase().replace(/^\/+|\/+$/g, '').replace(/[^a-z0-9_-]/g, '').slice(0, 40),
                  loginPath: String(gc.loginPath || '').trim().toLowerCase().replace(/^\/+|\/+$/g, '').replace(/[^a-z0-9_-]/g, '').slice(0, 40),
                  subPath: String(gc.subPath || '').trim().toLowerCase().replace(/^\/+|\/+$/g, '').replace(/[^a-z0-9_-]/g, '').slice(0, 40)
                };
                await env.KV.put('network-settings.json', JSON.stringify(gl, null, 2));
                tw = gl;
                ctx.waitUntil(t6y(env, lx, d0, 'Save_Network_Settings', e7));
                return new Response(JSON.stringify({
                  success: true,
                  message: 'Network settings saved / تنظیمات شبکه ذخیره شد'
                }), {
                  status: 200,
                  headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  }
                });
              } catch (gd) {
                console.error('保存网络设置失败:', gd);
                return new Response(JSON.stringify({
                  error: 'Failed to save network settings / ذخیره تنظیمات شبکه ناموفق بود: ' + gd.message
                }), {
                  status: 500,
                  headers: {
                    'Content-Type': e5("YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04")
                  }
                });
              }
            } else if (w8 === 'admin/ADD.txt') {
              try {
                const gw = await lx.text();
                await env.KV.put('ADD.txt', gw);
                ctx.waitUntil(t6y(env, lx, d0, 'Save_Custom_IPs', e7));
                return new Response(JSON.stringify({
                  success: true,
                  message: e5("Q3VzdG9tIElQIHNhdmVkIC8g2KLbjOKAjNm+24wg2LPZgdin2LHYtNuMINiw2K7bjNix2Ycg2LTYrw==")
                }), {
                  status: 200,
                  headers: {
                    'Content-Type': e5("YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04")
                  }
                });
              } catch (gf) {
                console.error('保存自定义IP失败:', gf);
                return new Response(JSON.stringify({
                  error: 'Failed to save custom IP / ذخیره آی‌پی سفارشی ناموفق بود: ' + gf.message
                }), {
                  status: 500,
                  headers: {
                    'Content-Type': e5("YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04")
                  }
                });
              }
            } else if (dx === 'admin/warp.json') {
              try {
                let gh = {};
                try {
                  gh = await lx.json();
                } catch (gp) {
                  gh = {};
                }
                if (gh && gh.license) {
                  const gg = await tkl(env, gh.license);
                  ctx.waitUntil(t6y(env, lx, d0, 'WARP_License', e7));
                  return new Response(JSON.stringify(tky(gg), null, 2), {
                    status: 200,
                    headers: {
                      'Content-Type': e5("YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04")
                    }
                  });
                }
                const gm = await tke(env, 'warp-account.json');
                if (gh && gh.wow) await tke(env, 'warp-account-wow.json');
                ctx.waitUntil(t6y(env, lx, d0, 'Register_WARP', e7));
                const gy = tky(gm);
                const gx = await env.KV.get('warp-account-wow.json');
                gy.wow = gx ? tky(JSON.parse(gx)) : null;
                return new Response(JSON.stringify(gy, null, 2), {
                  status: 200,
                  headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  }
                });
              } catch (gv) {
                console.error('warpActionFail:', gv);
                return new Response(JSON.stringify({
                  error: 'warpActionFail: ' + gv.message
                }), {
                  status: 502,
                  headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  }
                });
              }
            } else if (dx === 'admin/users.json') {
              try {
                const gb = await lx.json();
                let gk = {};
                try {
                  gk = JSON.parse(await env.KV.get('network-settings.json') || '{}');
                } catch (g0) {}
                gk.multiUser = !!gb.multiUser;
                gk.users = (Array.isArray(gb.users) ? gb.users : []).map(g1 => ({
                  id: String(g1.id || '').toLowerCase().replace(/[^0-9a-f]/g, ''),
                  name: String(g1.name || g1.username || '').slice(0, 40),
                  tag: String(g1.tag || '').slice(0, 40),
                  token: String(g1.token || '').slice(0, 80),
                  enabled: g1.enabled !== false,
                  expiry: g1.expiry || '',
                  quotaBytes: Number(g1.quotaBytes) || 0,
                  created: g1.created || new Date().toISOString()
                })).filter(g2 => g2.id.length >= 16 && g2.token);
                await env.KV.put('network-settings.json', JSON.stringify(gk, null, 2));
                tw = gk;
                ctx.waitUntil(t6y(env, lx, d0, 'Save_Users', e7));
                return new Response(JSON.stringify({
                  success: true,
                  count: gk.users.length
                }), {
                  status: 200,
                  headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  }
                });
              } catch (g3) {
                return new Response(JSON.stringify({
                  error: 'Save users failed: ' + g3.message
                }), {
                  status: 500,
                  headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  }
                });
              }
            } else if (dx === 'admin/central/announcement') {
              try {
                const g4 = await lx.json();
                const g5 = {
                  title: String(g4.title || '').slice(0, 200),
                  text: String(g4.text || '').slice(0, 2000),
                  url: String(g4.url || '').slice(0, 500),
                  ts: Date.now()
                };
                await env.KV.put('announcement.json', JSON.stringify(g5));
                return new Response(JSON.stringify({
                  success: true
                }), {
                  status: 200,
                  headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  }
                });
              } catch (g6) {
                return new Response(JSON.stringify({
                  error: e5("U2F2ZSBhbm5vdW5jZW1lbnQgZmFpbGVkOiA=") + g6.message
                }), {
                  status: 500,
                  headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  }
                });
              }
            } else if (dx === 'admin/cf-usage-setup') {
              const g7 = (g8, g9) => new Response(JSON.stringify(Object.assign({
                error: g8
              }, g9 || ({}))), {
                status: 200,
                headers: {
                  'Content-Type': 'application/json;charset=utf-8',
                  'Cache-Control': 'no-store'
                }
              });
              let me = {};
              try {
                me = await lx.json();
              } catch (mt) {}
              const mr = String(me.token || '').trim();
              if (!mr) return g7('no_token');
              let mn;
              try {
                mn = await rmb(mr);
              } catch (mi) {
                mn = {
                  ok: false
                };
              }
              if (!mn || !mn.ok) return g7('token_invalid');
              let mo = String(me.accountId || '').trim();
              if (!mo) {
                let ms = [];
                try {
                  ms = await rm2(mr);
                } catch (ma) {}
                if (!ms.length) return g7('no_accounts');
                if (ms.length === 1) mo = ms[0].id; else return g7('multiple_accounts', {
                  accounts: ms
                });
              }
              const mc = await rlb(null, null, mo, mr);
              if (!mc || !mc.success) return g7('usage_failed', {
                detail: mc && mc.error || ''
              });
              try {
                await env.KV.put('cf.json', JSON.stringify({
                  Email: null,
                  GlobalAPIKey: null,
                  AccountID: mo,
                  APIToken: mr,
                  UsageAPI: null
                }, null, 2));
              } catch (ml) {}
              return new Response(JSON.stringify({
                success: true,
                accountId: mo,
                usage: mc
              }), {
                status: 200,
                headers: {
                  'Content-Type': e5("YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04"),
                  'Cache-Control': 'no-store'
                }
              });
            } else if (dx === 'admin/user-reset') {
              try {
                const md = await lx.json();
                const mw = String(md.id || '').toLowerCase().replace(/[^0-9a-f]/g, '');
                if (mw) {
                  try {
                    await env.KV.delete('uusage:' + mw);
                  } catch (mf) {}
                }
                return new Response(JSON.stringify({
                  success: true
                }), {
                  status: 200,
                  headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  }
                });
              } catch (mh) {
                return new Response(JSON.stringify({
                  error: 'reset failed: ' + mh.message
                }), {
                  status: 500,
                  headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  }
                });
              }
            } else if (dx === 'admin/self-update.json') {
              return new Response(JSON.stringify({
                error: 'not_configured',
                detail: 'auto-update is disabled on this build / به‌روزرسانی خودکار برای این نسخه غیرفعال است'
              }), {
                status: 200,
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                }
              });
            } else return new Response(JSON.stringify({
              error: 'Unsupported request path / مسیر درخواست پشتیبانی نمی‌شود'
            }), {
              status: 404,
              headers: {
                'Content-Type': e5("YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04")
              }
            });
          } else if (dx === 'admin/config.json') {
            const mp = await t7h(dy + da);
            const mg = Object.assign({}, e7, {
              optimizedSubGeneration: Object.assign({}, e7.优选订阅生成, {
                TOKEN: mp
              }),
              protocolType: e7.协议类型,
              transportProtocol: e7.传输协议,
              gRPCmode: e7.gRPC模式,
              skipCertVerify: e7.跳过证书验证,
              tlsFragment: e7.TLS分片,
              randomPath: e7.随机路径,
              subConverterConfig: e7.订阅转换配置,
              proxy: e7.反代
            });
            return new Response(JSON.stringify(mg, null, 2), {
              status: 200,
              headers: {
                'Content-Type': 'application/json'
              }
            });
          } else if (w8 === 'admin/ADD.txt') {
            let mm = await env.KV.get('ADD.txt') || 'null';
            if (mm == 'null') mm = (await rnv(lx, e7.优选订阅生成.本地IP库.随机数量, e7.优选订阅生成.本地IP库.指定端口))[1];
            return new Response(mm, {
              status: 200,
              headers: {
                'Content-Type': e5("dGV4dC9wbGFpbjtjaGFyc2V0PXV0Zi04"),
                'asn': lx.cf.asn
              }
            });
          } else if (dx === 'admin/cf.json') {
            return new Response(JSON.stringify(lx.cf, null, 2), {
              status: 200,
              headers: {
                'Content-Type': 'application/json;charset=utf-8'
              }
            });
          } else if (dx === 'admin/network-settings.json') {
            try {
              const my = await env.KV.get('network-settings.json');
              const mx = {
                enableRouting: true,
                enableGeoIP: true,
                enableGeoSite: true,
                enableAdBlock: true,
                enablePornBlock: false,
                enableDomesticBypass: true,
                enableDoH: true,
                dohProvider: 'cloudflare',
                enableLocalDNS: false,
                localDNSIP: '8.8.8.8',
                localDNSPort: '53',
                enableAntiSanctionDNS: false,
                antiSanctionDNSProvider: 'cloudflare',
                antiSanctionCustomDNS: '',
                enableFakeDNS: false,
                fakeDNSIP: '198.51.100.1',
                enableIPv6: true,
                allowLAN: false,
                logLevel: 'error',
                enableWarp: false,
                warpMode: 'warp',
                warpEndpoint: '',
                warpAmnezia: false,
                customRules: '',
                monthlyCapGB: 0,
                speedLimitKBps: 0,
                blockQUIC: false,
                warpNoise: {
                  mode: '',
                  count: '',
                  size: '',
                  delay: ''
                },
                disguise: false,
                adminPath: '',
                loginPath: '',
                subPath: ''
              };
              const mv = my ? JSON.parse(my) : mx;
              return new Response(JSON.stringify(mv, null, 2), {
                status: 200,
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                }
              });
            } catch (mb) {
              return new Response(JSON.stringify({
                error: mb.message
              }), {
                status: 500,
                headers: {
                  'Content-Type': e5("YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04")
                }
              });
            }
          } else if (dx === 'admin/warp.json') {
            try {
              const mk = env.KV && typeof env.KV.get === 'function' ? await env.KV.get('warp-account.json') : null;
              const m0 = mk ? tky(JSON.parse(mk)) : {
                registered: false
              };
              if (env.KV && typeof env.KV.get === 'function') {
                const m1 = await env.KV.get('warp-account-wow.json');
                m0.wow = m1 ? tky(JSON.parse(m1)) : null;
              }
              return new Response(JSON.stringify(m0, null, 2), {
                status: 200,
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                }
              });
            } catch (m2) {
              return new Response(JSON.stringify({
                registered: false,
                error: m2.message
              }), {
                status: 200,
                headers: {
                  'Content-Type': e5("YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04")
                }
              });
            }
          } else if (dx === 'admin/system.json') {
            const m3 = !!(env.KV && typeof env.KV.get === 'function');
            let m4 = false;
            if (m3) try {
              await t4(env);
              m4 = true;
            } catch (m5) {}
            let m6 = {
              up: 0,
              down: 0,
              total: 0
            };
            if (m3) try {
              const m7 = await sp(env, 'usage:' + sc(new Date()));
              if (m7) m6 = {
                up: m7.up || 0,
                down: m7.down || 0,
                total: m7.total || 0
              };
            } catch (m8) {}
            const m9 = lx.cf;
            let ye = null;
            if (env.DB && typeof env.DB.prepare === 'function') {
              try {
                const yt = await env.DB.prepare('SELECT 1').all();
                if (yt && yt.meta && typeof yt.meta.size_after === 'number') ye = yt.meta.size_after;
              } catch (yr) {}
            }
            return new Response(JSON.stringify({
              ip: d0,
              d1SizeBytes: ye,
              colo: m9?.colo,
              country: m9?.country,
              city: m9?.city,
              region: m9?.region,
              regionCode: m9?.regionCode,
              latitude: m9?.latitude,
              longitude: m9?.longitude,
              timezone: m9?.timezone,
              asn: m9?.asn,
              asOrganization: m9?.asOrganization,
              userAgent: l2,
              version: e6,
              instanceId: (await t7h(l1.host)).slice(0, 8),
              kvConnected: m3,
              kvOk: m4,
              host: l1.host,
              protocol: l1.protocol,
              todayUsage: m6,
              workerStartTime: globalThis.__workerStart || null
            }), {
              status: 200,
              headers: {
                'Content-Type': e5("YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04"),
                'Cache-Control': 'no-store'
              }
            });
          } else if (dx === e5("YWRtaW4vZG9tYWluLWhlYWx0aC5qc29u")) {
            if (l1.searchParams.has('check')) {
              const yn = await rr0(env, dg, dy);
              return new Response(JSON.stringify(yn), {
                status: 200,
                headers: {
                  'Content-Type': 'application/json;charset=utf-8',
                  'Cache-Control': 'no-store'
                }
              });
            } else {
              const yi = env.KV && typeof env.KV.get === 'function' ? JSON.parse(await env.KV.get('domain-health.json') || 'null') : null;
              return new Response(JSON.stringify(yi || ({
                checkedAt: 0,
                domains: []
              })), {
                status: 200,
                headers: {
                  'Content-Type': 'application/json;charset=utf-8',
                  'Cache-Control': 'no-store'
                }
              });
            }
          } else if (dx === 'admin/usage-data') {
            try {
              const yo = new Date();
              const ys = 90;
              const ya = [];
              for (let yc = 0; yc < ys; yc++) {
                const yl = new Date(yo);
                yl.setDate(yl.getDate() - yc);
                const yd = 'usage:' + yl.getFullYear() + '-' + String(yl.getMonth() + 1).padStart(2, '0') + '-' + String(yl.getDate()).padStart(2, '0');
                const yw = await env.KV.get(yd);
                if (yw) ya.push({
                  date: yd.slice(6),
                  ...JSON.parse(yw)
                });
              }
              const yf = {};
              for (const yh of ya) {
                const yp = yh.date.slice(0, 7);
                if (!yf[yp]) yf[yp] = {
                  up: 0,
                  down: 0,
                  total: 0
                };
                yf[yp].up += yh.up || 0;
                yf[yp].down += yh.down || 0;
                yf[yp].total += yh.total || 0;
              }
              const yg = Object.entries(yf).map(([ym, yy]) => ({
                month: ym,
                ...yy
              }));
              const yx = {};
              for (const yv of ya) {
                const yb = yv.date.slice(0, 4);
                if (!yx[yb]) yx[yb] = {
                  up: 0,
                  down: 0,
                  total: 0
                };
                yx[yb].up += yv.up || 0;
                yx[yb].down += yv.down || 0;
                yx[yb].total += yv.total || 0;
              }
              const yk = Object.entries(yx).map(([y0, y1]) => ({
                year: y0,
                ...y1
              }));
              return new Response(JSON.stringify({
                daily: ya,
                monthly: yg,
                yearly: yk
              }), {
                status: 200,
                headers: {
                  'Content-Type': 'application/json;charset=utf-8',
                  'Cache-Control': 'no-store'
                }
              });
            } catch (y2) {
              return new Response(JSON.stringify({
                error: y2.message
              }), {
                status: 500,
                headers: {
                  'Content-Type': e5("YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04")
                }
              });
            }
          } else if (dx === 'admin/sub-content') {
            const y3 = await t7h(dy + da);
            const y4 = `${l1.protocol}//${l1.host}/sub?token=${y3}`;
            const y5 = await fetch(y4).catch(() => null);
            if (!y5) return new Response('Sub content unavailable', {
              status: 502
            });
            const y6 = await y5.text();
            return new Response(y6, {
              status: 200,
              headers: {
                'Content-Type': 'text/plain;charset=utf-8',
                'Cache-Control': 'no-store'
              }
            });
          } else if (dx === 'admin/users.json') {
            let y7 = {};
            try {
              y7 = JSON.parse(await env.KV.get('network-settings.json') || '{}');
            } catch (y8) {}
            return new Response(JSON.stringify({
              multiUser: !!y7.multiUser,
              users: Array.isArray(y7.users) ? y7.users : [],
              usage: {}
            }), {
              status: 200,
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Cache-Control': 'no-store'
              }
            });
          } else if (dx === 'admin/central/stats') {
            return new Response(JSON.stringify({
              configured: false
            }), {
              status: 200,
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Cache-Control': 'no-store'
              }
            });
          } else if (dx === 'admin/announcement') {
            let y9 = null;
            try {
              y9 = JSON.parse(await env.KV.get('announcement.json') || 'null');
            } catch (xe) {}
            return new Response(JSON.stringify(y9 || ({})), {
              status: 200,
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Cache-Control': 'no-store'
              }
            });
          } else if (dx === 'admin/bestip') {
            try {
              const xt = l1.searchParams.get('port') || '443';
              let xr = [];
              try {
                xr = await rre(lx, e7.POOL_API, 32);
              } catch (xn) {}
              if (!Array.isArray(xr) || !xr.length) {
                try {
                  xr = (await rnv(lx, 32, xt))[0];
                } catch (xi) {}
              }
              const xo = (Array.isArray(xr) ? xr : []).map(xs => String(xs).split('#')[0].split(':')[0].trim()).filter(xa => (/^\d+\.\d+\.\d+\.\d+$/).test(xa));
              return new Response(JSON.stringify({
                ips: xo
              }), {
                status: 200,
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                }
              });
            } catch (xc) {
              return new Response(JSON.stringify({
                ips: [],
                error: String(xc.message || xc)
              }), {
                status: 200,
                headers: {
                  'Content-Type': e5("YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04")
                }
              });
            }
          } else if (dx === 'admin/update-check.json') {
            let xl = false;
            try {
              const xd = JSON.parse(await env.KV.get('cf.json') || '{}');
              xl = !!(xd && xd.APIToken);
            } catch (xw) {}
            return new Response(JSON.stringify({
              current: e6,
              latest: e6,
              updateAvailable: false,
              hasCfToken: xl
            }), {
              status: 200,
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Cache-Control': 'no-store'
              }
            });
          } else if (dx === 'admin/whoami') {
            const xf = lx.cf || ({});
            return new Response(JSON.stringify({
              asn: xf.asn || 0,
              isp: xf.asOrganization || '',
              country: xf.country || '',
              city: xf.city || '',
              carrier: rnw(lx)
            }), {
              status: 200,
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Cache-Control': 'no-store'
              }
            });
          } else if (dx === 'admin/singbox-preview') {
            const xh = l1.searchParams.get('token') || '';
            if (!xh) return new Response(JSON.stringify({
              error: 'pass ?token=<sub token>'
            }), {
              status: 400,
              headers: {
                'Content-Type': 'application/json;charset=utf-8'
              }
            });
            try {
              const xp = await fetch(`${l1.protocol}//${l1.host}/sub?token=${encodeURIComponent(xh)}&singbox`, {
                headers: {
                  'User-Agent': e5("c2luZy1ib3gvMS4xMS4wIG5vdmEtZGVidWc=")
                }
              });
              return new Response(await xp.text(), {
                status: xp.status,
                headers: {
                  'Content-Type': 'application/json;charset=utf-8',
                  'Cache-Control': 'no-store'
                }
              });
            } catch (xg) {
              return new Response(JSON.stringify({
                error: String(xg && xg.message || xg)
              }), {
                status: 502,
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                }
              });
            }
          } else if (dx === 'admin/announce') {
            const xm = JSON.parse(await env.KV.get('domain-health.json') || 'null');
            const xy = await ryx(env, {
              baseUrl: `${l1.protocol}//${l1.host}`,
              health: xm
            });
            return new Response(JSON.stringify(xy, null, 2), {
              status: xy.skipped ? 400 : 200,
              headers: {
                'Content-Type': 'application/json;charset=utf-8'
              }
            });
          } else if (dx === 'admin/publish-mirror') {
            const xx = await ry6(env, `${l1.protocol}//${l1.host}`);
            const xv = !xx.skipped && Array.isArray(xx.results) && xx.results.every(xb => xb.ok);
            return new Response(JSON.stringify(xx, null, 2), {
              status: xx.skipped ? 400 : xv ? 200 : 502,
              headers: {
                'Content-Type': e5("YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04")
              }
            });
          } else if (dx === 'admin/domains') {
            const xk = await rm7(env);
            const x0 = l1.searchParams.has('check') ? await rr0(env, xk, dy) : JSON.parse(await env.KV.get('domain-health.json') || 'null');
            return new Response(JSON.stringify({
              hosts: xk,
              health: x0
            }, null, 2), {
              status: 200,
              headers: {
                'Content-Type': e5("YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04")
              }
            });
          } else if (dx === 'admin/cf-usage-setup') {
            if (lx.method !== 'POST') return new Response(JSON.stringify({
              error: 'method_not_allowed'
            }), {
              status: 405,
              headers: {
                'Content-Type': e5("YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04")
              }
            });
            const x1 = (x2, x3) => new Response(JSON.stringify(Object.assign({
              error: x2
            }, x3 || ({}))), {
              status: 200,
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Cache-Control': 'no-store'
              }
            });
            let x4 = {};
            try {
              x4 = await lx.json();
            } catch (x5) {}
            const x6 = String(x4.token || '').trim();
            if (!x6) return x1('no_token');
            let x7;
            try {
              x7 = await rmb(x6);
            } catch (x8) {
              x7 = {
                ok: false
              };
            }
            if (!x7 || !x7.ok) return x1('token_invalid');
            let x9 = String(x4.accountId || '').trim();
            if (!x9) {
              let ve = [];
              try {
                ve = await rm2(x6);
              } catch (vt) {}
              if (!ve.length) return x1('no_accounts');
              if (ve.length === 1) x9 = ve[0].id; else return x1('multiple_accounts', {
                accounts: ve
              });
            }
            const vr = await rlb(null, null, x9, x6);
            if (!vr || !vr.success) return x1('usage_failed', {
              detail: vr && vr.error || ''
            });
            try {
              await env.KV.put('cf.json', JSON.stringify({
                Email: null,
                GlobalAPIKey: null,
                AccountID: x9,
                APIToken: x6,
                UsageAPI: null
              }, null, 2));
            } catch (vn) {}
            return new Response(JSON.stringify({
              success: true,
              accountId: x9,
              usage: vr
            }), {
              status: 200,
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Cache-Control': 'no-store'
              }
            });
          }
          ctx.waitUntil(t6y(env, lx, d0, 'Admin_Login', e7));
          const vi = dx.startsWith('admin/') ? dx.slice(6).split('/')[0] : '';
          const vo = vi ? tk + '/admin/' : tk + '/admin' + l1.search;
          return fetch(vo).then(async vs => {
            let va = await vs.text();
            va = va.replace(/"\.\.\/logo\.png"/g, `"${tk}logo.png"`);
            va = va.replace(/src=['"]\.\.\/logo\.png['"]/g, `src="${tk}logo.png"`);
            if (vi && vi !== '') {
              va = va.replace('</head>', '<script>location.hash="page=' + vi + '";</script></head>');
            }
            return new Response(va, {
              status: vs.status,
              statusText: vs.statusText,
              headers: vs.headers
            });
          }).catch(() => new Response('Admin panel unavailable', {
            status: 502
          }));
        } else if (dx === 'logout' || di.test(dx)) {
          const vc = new Response('重定向中...', {
            status: 302,
            headers: {
              'Location': d1.pubLogin
            }
          });
          vc.headers.set('Set-Cookie', e5("YXV0aD07IFBhdGg9LzsgTWF4LUFnZT0wOyBIdHRwT25seQ=="));
          return vc;
        } else if (dx === 'sub') {
          const vl = await t7h(dy + da), vd = ['1', 'true'].includes(env.BEST_SUB) && l1.searchParams.get('host') === 'example.com' && l1.searchParams.get('uuid') === '00000000-0000-4000-8000-000000000000' && l2.toLowerCase().includes('tunnel (https://github.com/' + or[1] + '/edge');
          const vw = l1.searchParams.get('token');
          const vf = vw === vl;
          const vh = Math.floor(Date.now() / 86400000);
          const vp = tv0(vl, da);
          const [vg, vm] = await Promise.all([t7h(vp + vh), t7h(vp + (vh - 1))]);
          const vy = vw === vg || vw === vm;
          if (vf || vy || vd) {
            e7 = await t97(env, dy, da, l2);
            if (vd) ctx.waitUntil(t6y(env, lx, d0, 'Get_Best_SUB', e7, false)); else ctx.waitUntil(t6y(env, lx, d0, 'Get_SUB', e7));
            const vx = l2.toLowerCase();
            const vv = {
              "content-type": "text/plain; charset=utf-8",
              "Profile-Update-Interval": e7.优选订阅生成.SUBUpdateTime,
              "Profile-web-page-url": l1.protocol + '//' + l1.host + '/admin',
              "Profile-Title": encodeURIComponent(e7.优选订阅生成.SUBNAME || 'Nova Proxy'),
              "Cache-Control": "no-store"
            };
            if (e7.CF.Usage.success) {
              const vb = e7.CF.Usage.pages;
              const vk = e7.CF.Usage.workers;
              const v0 = Number.isFinite(e7.CF.Usage.max) ? e7.CF.Usage.max / 1000 * 1024 : 1024 * 100;
              vv["Subscription-Userinfo"] = `upload=${vb}; download=${vk}; total=${v0}; expire=4102329600`;
            }
            const v1 = l1.searchParams.has('b64') || l1.searchParams.has('base64') || lx.headers.get('subconverter-request') || lx.headers.get('subconverter-version') || vx.includes('subconverter') || vx.includes(('CF-Workers-SUB').toLowerCase()) || vd;
            const v2 = v1 ? 'mixed' : l1.searchParams.has('target') ? l1.searchParams.get('target') : l1.searchParams.has('clash') || vx.includes('clash') || vx.includes('meta') || vx.includes('mihomo') ? 'clash' : l1.searchParams.has('sb') || l1.searchParams.has('singbox') || vx.includes('singbox') || vx.includes('sing-box') ? 'singbox' : l1.searchParams.has('surge') || vx.includes('surge') ? 'surge&ver=4' : l1.searchParams.has('quanx') || vx.includes('quantumult') ? 'quanx' : l1.searchParams.has('loon') || vx.includes('loon') ? 'loon' : 'mixed';
            if (!vx.includes('mozilla')) vv["Content-Disposition"] = `attachment; filename*=utf-8''${encodeURIComponent(e7.优选订阅生成.SUBNAME)}`;
            const v3 = (l1.searchParams.has('surge') || vx.includes('surge')) && e7.协议类型 !== 'ss' ? 'tro' + 'jan' : e7.协议类型;
            let v4 = '';
            if (v2 === 'mixed') {
              const v5 = e7.TLS分片 == 'Shadowrocket' ? `&fragment=${encodeURIComponent('1,40-60,30-50,tlshello')}` : e7.TLS分片 == 'Happ' ? `&fragment=${encodeURIComponent('3,1,tlshello')}` : '';
              let v6 = [], v7 = '', v8 = [];
              if (!l1.searchParams.has('sub') && e7.优选订阅生成.local) {
                const v9 = e7.优选订阅生成.本地IP库.随机IP ? (await rnv(lx, e7.优选订阅生成.本地IP库.随机数量, e7.优选订阅生成.本地IP库.指定端口))[0] : await env.KV.get('ADD.txt') ? await rix(await env.KV.get('ADD.txt')) : (await rnv(lx, e7.优选订阅生成.本地IP库.随机数量, e7.优选订阅生成.本地IP库.指定端口))[0];
                const be = [], bt = [], br = [];
                for (const bn of v9) {
                  if (bn.toLowerCase().startsWith('sub://')) {
                    be.push(bn);
                  } else {
                    const bi = bn.indexOf('#');
                    const bo = bi > -1 ? bn.slice(0, bi) : bn;
                    const bs = bi > -1 ? bn.slice(bi) : '';
                    const ba = bn.match(/sub\s*=\s*([^\s&#]+)/i);
                    if (ba && ba[1].trim().includes('.')) {
                      const bc = bn.toLowerCase().includes('proxyip=true');
                      if (bc) be.push('sub://' + ba[1].trim() + "?proxyip=true" + (bn.includes('#') ? '#' + bn.split('#')[1] : '')); else be.push('sub://' + ba[1].trim() + (bn.includes('#') ? '#' + bn.split('#')[1] : ''));
                    } else if (bo.toLowerCase().startsWith('https://')) {
                      be.push(bn);
                    } else if (bo.toLowerCase().includes('://')) {
                      if (bn.includes('#')) {
                        const bl = bn.split('#');
                        br.push(bl[0] + '#' + encodeURIComponent(decodeURIComponent(bl[1])));
                      } else br.push(bn);
                    } else {
                      if (bo.includes('*')) {
                        bt.push(t77(bo) + bs);
                      } else bt.push(bn);
                    }
                  }
                }
                const bd = await roa(be, '443');
                const bw = [...new Set(br.concat(bd[1]))];
                v7 = bw.length > 0 ? bw.join('\n') + '\n' : '';
                const bf = bd[0];
                v8 = bd[3] || [];
                v6 = [...new Set(bt.concat(bf))];
                if (e7.POOL_API) {
                  try {
                    const bh = await rre(lx, e7.POOL_API, e7.优选订阅生成.本地IP库.随机数量 || 16);
                    if (bh.length) v6 = [...new Set(v6.concat(bh))];
                  } catch (bp) {
                    tbv(`[Smart Clean IPs] 获取失败: ${bp.message}`);
                  }
                }
              } else {
                let bg = l1.searchParams.get('sub') || e7.优选订阅生成.SUB;
                const [bm, by] = await ri0(bg);
                v6 = v6.concat(bm);
                v7 += by;
              }
              const bx = e7.ECH ? `&ech=${encodeURIComponent((e7.ECHConfig.SNI ? e7.ECHConfig.SNI + '+' : '') + e7.ECHConfig.DNS)}` : '';
              const bv = vx.includes('loon') || vx.includes('surge');
              const {type: bb, 路径字段名: bk, 域名字段名: b0} = tbw(e7);
              if (e7.socks5RotateEvery && e7.chainProxy) {
                try {
                  const b1 = String(e7.chainProxy).trim();
                  let b2 = b1 ? b1.split(/[\n,]+/).map(b3 => b3.trim()).filter(b4 => (/^(socks5|http|https|turn|sstp):\/\//i).test(b4)) : [];
                  if (b2.length > 1 && (e7.socks5RotateEvery === 'daily' || e7.socks5RotateEvery === 'weekly')) {
                    const b5 = Math.max(1, Math.min(b2.length, Number(e7.socks5RotateCount) || 3));
                    if (b5 < b2.length) {
                      const b6 = e7.socks5RotateEvery === 'weekly' ? 7 : 1;
                      const b7 = Math.floor(Date.now() / 86400000 / b6);
                      const b8 = (b7 % b2.length + b2.length) % b2.length;
                      b2 = Array.from({
                        length: b5
                      }, (b9, ke) => b2[(b8 + ke) % b2.length]);
                    }
                    e7.chainProxy = b2.join('\n');
                  }
                } catch (kt) {
                  tbv(`[Chain Proxy Rotation] 轮换失败: ${kt.message}`);
                }
              }
              v6 = [dy + ':443#' + t0, ...v6];
              v4 = v7 + v6.map((kr, kn) => {
                const ki = /^(\[[\da-fA-F:]+\]|[\d.]+|[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*)(?::(\d+))?(?:#(.+))?$/;
                const ko = kr.match(ki);
                let ks, ka = "443", kc;
                if (ko) {
                  ks = ko[1];
                  ka = ko[2] ? ko[2] : '443';
                  kc = ko[3] || ks;
                } else {
                  console.warn(`[订阅内容] 不规范的IP格式已忽略: ${kr}`);
                  return null;
                }
                let kl = e7.完整节点路径;
                const kd = kc.match(/\$(socks5|http|https|turn|sstp):\/\/([^#\s]+)/i);
                if (kd) {
                  try {
                    const kw = kd[1].toLowerCase(), kf = kd[2];
                    const kh = {
                      type: kw,
                      ...rlo(kf, rlt(kw))
                    };
                    kl = `/video/${tv0(JSON.stringify(kh), da) + (e7.启用0RTT ? '?ed=2560' : '')}`;
                    kc = kc.replace(kd[0], '').trim() || ks;
                  } catch (kp) {
                    console.warn(`[订阅内容] 链式代理解析失败，已忽略该指令: ${kd[0]} (${kp && kp.message ? kp.message : kp})`);
                  }
                } else if (v8.length > 0) {
                  const kg = v8.find(km => km.includes(ks));
                  if (kg) kl = `${e7.PATH}/proxyip=${kg}`.replace(/\/\//g, '/') + (e7.启用0RTT ? '?ed=2560' : '');
                }
                if (bv) kl = kl.replace(/,/g, '%2C');
                {
                  const ky = (kc.match(/ ·S\d+$/) || [''])[0];
                  kc = 'سرویس رایگان نوا ' + (kn + 1) + ky;
                }
                const kx = e7.protocolType === 'mixed' && !vd ? ['vless', 'trojan'][kn % 2] : v3;
                if (kx === 'ss' && !vd) {
                  if (!e7.SS.TLS) {
                    const kv = [443, 2053, 2083, 2087, 2096, 8443];
                    const kb = [80, 2052, 2082, 2086, 2095, 8080];
                    ka = String(kb[kv.indexOf(Number(ka))] ?? ka);
                  }
                  kl = (kl.includes('?') ? kl.replace('?', '?enc=' + e7.SS.加密方式 + '&') : kl + '?enc=' + e7.SS.加密方式).replace(/([=,])/g, '\\$1');
                  if (!v1) kl = kl + ';mux=0';
                  return `${kx}://${btoa(e7.SS.加密方式 + ':00000000-0000-4000-8000-000000000000')}@${ks}:${ka}?plugin=v2${encodeURIComponent('ray-plugin;mode=websocket;host=example.com;path=' + (e7.随机路径 ? t72(kl) : kl) + (e7.SS.TLS ? ';tls' : '')) + bx + v5}#${encodeURIComponent(kc)}`;
                } else {
                  const kk = tbp(e7, kl, vd);
                  if (e7.enableTLS === false) {
                    const k0 = [443, 2053, 2083, 2087, 2096, 8443], k1 = [80, 2052, 2082, 2086, 2095, 8080];
                    const k2 = String(k1[k0.indexOf(Number(ka))] ?? ka);
                    return `${kx}://00000000-0000-4000-8000-000000000000@${ks}:${k2}?security=none&type=${bb}&${b0}=example.com&${bk}=${encodeURIComponent(kk)}&encryption=none#${encodeURIComponent(kc)}`;
                  }
                  return `${kx}://00000000-0000-4000-8000-000000000000@${ks}:${ka}?security=tls&type=${bb + bx}&${b0}=example.com&fp=${e7.Fingerprint}&sni=example.com&${bk}=${encodeURIComponent(kk) + v5}&encryption=none${e7.skipCertVerify ? '&insecure=1&allowInsecure=1' : ''}#${encodeURIComponent(kc)}`;
                }
              }).filter(k3 => k3 !== null).join('\n');
            } else {
              const k4 = `${e7.订阅转换配置.SUBAPI}/sub?target=${v2}&url=${encodeURIComponent(l1.protocol + '//' + l1.host + '/sub?target=mixed&token=' + vg + '&cnIspCode=' + rnw(lx) + (l1.searchParams.has('sub') && l1.searchParams.get('sub') != '' ? `&sub=${l1.searchParams.get('sub')}` : ''))}&config=${encodeURIComponent(e7.订阅转换配置.SUBCONFIG)}&emoji=${e7.订阅转换配置.SUBEMOJI}&list=${e7.订阅转换配置.SUBLIST}&scv=${e7.跳过证书验证}`;
              try {
                const k5 = await fetch(k4, {
                  headers: {
                    'User-Agent': 'Subconverter for ' + v2 + ' edge' + e5("dHVubmVsIChodHRwczovL2dpdGh1Yi5jb20v") + or[1] + '/edge' + 'tunnel)'
                  }
                });
                if (k5.ok) {
                  v4 = await k5.text();
                  if (l1.searchParams.has('surge') || vx.includes('surge')) v4 = t6s(v4, l1.protocol + '//' + l1.host + '/sub?token=' + vl + '&surge', e7);
                } else return new Response('订阅转换后端异常：' + k5.statusText, {
                  status: k5.status
                });
              } catch (k6) {
                return new Response('订阅转换后端异常：' + k6.message, {
                  status: 403
                });
              }
            }
            if (!vx.includes('subconverter') && vf) {
              const k7 = [...e7.HOSTS].sort(() => Math.random() - 0.5);
              let k8 = 0, k9 = null;
              v4 = v4.replace(/00000000-0000-4000-8000-000000000000/g, e7.UUID).replace(/MDAwMDAwMDAtMDAwMC00MDAwLTgwMDAtMDAwMDAwMDAwMDAw/g, btoa(e7.UUID)).replace(/example\.com/g, () => {
                if (k8 % 2 === 0) {
                  const eee = k7[Math.floor(k8 / 2) % k7.length];
                  k9 = t77(eee);
                }
                k8++;
                return k9;
              });
            }
            if (v2 === 'mixed' && (!vx.includes('mozilla') || l1.searchParams.has('b64') || l1.searchParams.has('base64'))) v4 = btoa(v4);
            let eet = null;
            if (tw && tw.enableWarp && env.KV && typeof env.KV.get === 'function') {
              try {
                const eer = await env.KV.get('warp-account.json');
                if (eer) {
                  eet = JSON.parse(eer);
                  if (tw.warpMode === 'wow') {
                    try {
                      const een = await env.KV.get('warp-account-wow.json');
                      if (een) eet.wow = JSON.parse(een);
                    } catch (eei) {}
                  }
                }
              } catch (eeo) {
                eet = null;
              }
            }
            if (v2 === 'singbox') {
              v4 = await t3c(v4, e7, tw, eet);
              vv["content-type"] = e5("YXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOA==");
            } else if (v2 === 'clash') {
              v4 = t0n(v4, e7, tw, eet);
              vv["content-type"] = 'application/x-yaml; charset=utf-8';
            }
            if (vx.includes('mozilla') && !l1.searchParams.has('raw') && !l1.searchParams.has('b64') && !l1.searchParams.has('base64')) {
              const ees = await rtp();
              if (ees) return ees;
            }
            return new Response(v4, {
              status: 200,
              headers: vv
            });
          }
        } else if (dx === 'locations') {
          const eea = lx.headers.get('Cookie') || '';
          const eec = eea.split(';').find(eel => eel.trim().startsWith('auth='))?.split('=')[1];
          if (eec && await r7(eec, l2, de, l7)) return fetch(new Request(e5("aHR0cHM6Ly9zcGVlZC5jbG91ZGZsYXJlLmNvbS9sb2NhdGlvbnM="), {
            headers: {
              'Referer': e5("aHR0cHM6Ly9zcGVlZC5jbG91ZGZsYXJlLmNvbS8=")
            }
          }));
        } else if (dx === 'robots.txt') return new Response(e5("VXNlci1hZ2VudDogKgpEaXNhbGxvdzogLw=="), {
          status: 200,
          headers: {
            'Content-Type': 'text/plain; charset=UTF-8'
          }
        });
      } else if (!ds) return fetch(tk + '/install').then(async eed => {
        const eew = new Headers(eed.headers);
        eew.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        eew.set('Pragma', 'no-cache');
        eew.set('Expires', '0');
        let eef = await eed.text();
        eef = eef.replace(/"\.\.\/logo\.png"/g, `"${tk}logo.png"`);
        eef = eef.replace(/src=['"]\.\.\/logo\.png['"]/g, `src="${tk}logo.png"`);
        return new Response(eef, {
          status: 200,
          statusText: eed.statusText,
          headers: eew
        });
      });
    }
    if ((/\.\w{2,4}$/).test(l1.pathname)) {
      const eeh = await fetch(tk + l1.pathname).catch(() => {});
      if (eeh && eeh.ok) return eeh;
    }
    let eep = env.URL || 'nginx';
    if (eep && eep !== 'nginx' && eep !== '1101') {
      eep = eep.trim().replace(/\/$/, '');
      if (!eep.match(/^https?:\/\//i)) eep = 'https://' + eep;
      if (eep.toLowerCase().startsWith('http://')) eep = 'https://' + eep.substring(7);
      try {
        const eeg = new URL(eep);
        eep = eeg.protocol + '//' + eeg.host;
      } catch (eem) {
        eep = 'nginx';
      }
    }
    if (eep === '1101') return new Response(await rxy(l1.host, d0), {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=UTF-8'
      }
    });
    try {
      const eey = new URL(eep), eex = new Headers(lx.headers);
      eex.set('Host', eey.host);
      eex.set('Referer', eey.origin);
      eex.set('Origin', eey.origin);
      if (!eex.has('User-Agent') && l2 && l2 !== 'null') eex.set('User-Agent', l2);
      const eev = await fetch(eey.origin + l1.pathname + l1.search, {
        method: lx.method,
        headers: eex,
        body: lx.body,
        cf: lx.cf
      });
      const eeb = eev.headers.get('content-type') || '';
      if ((/text|javascript|json|xml/).test(eeb)) {
        const eek = (await eev.text()).replaceAll(eey.host, l1.host);
        return new Response(eek, {
          status: eev.status,
          headers: {
            ...Object.fromEntries(eev.headers),
            'Cache-Control': 'no-store'
          }
        });
      }
      return eev;
    } catch (ee0) {
      await rtl(env, ee0, lx);
    }
    return new Response(await rxm(), {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=UTF-8'
      }
    });
  },
  async scheduled(ee1, env, ctx) {
    od(env);
    if (!ty && env.__realKV && ctx && typeof ctx.waitUntil === 'function') ctx.waitUntil(o9(env));
    if (!env || !['1', 'true'].includes(String(env.ENABLE_CRON || ''))) return;
    ctx.waitUntil(rrd(env).then(ee2 => {
      if (ee2) console.log(e5("c2NoZWR1bGVkTWFpbnRlbmFuY2UgY29tcGxldGVk"));
    }).catch(ee3 => console.error('runScheduledMaintenance error:', ee3 && ee3.message)));
  }
};
async function ee4(ee5, ee6) {
  if (!ee5.body) return new Response('Bad Request', {
    status: 400
  });
  const ee7 = ee5.body.getReader();
  const ee8 = await ero(ee7, ee6);
  if (!ee8) {
    try {
      ee7.releaseLock();
    } catch (ee9) {}
    return new Response('Invalid request', {
      status: 400
    });
  }
  if (rhw(ee8.hostname)) {
    try {
      ee7.releaseLock();
    } catch (ete) {}
    return tw && tw.enablePornBlock && rha(ee8.hostname) ? rhh(ee5) : new Response('Forbidden', {
      status: 403
    });
  }
  if (ee8.isUDP && ee8.协议 !== 'trojan' && ee8.port !== 53) {
    try {
      ee7.releaseLock();
    } catch (ett) {}
    return new Response('UDP is not supported', {
      status: 400
    });
  }
  const etr = {
    socket: null,
    connectingPromise: null,
    retryConnect: null
  };
  let etn = null;
  let eti = null;
  const eto = {
    up: 0,
    down: 0
  };
  const ets = new Headers({
    'Content-Type': 'application/octet-stream',
    'X-Accel-Buffering': 'no',
    'Cache-Control': 'no-store'
  });
  const eta = () => {
    if (eti) {
      try {
        eti.releaseLock();
      } catch (etc) {}
      eti = null;
    }
    etn = null;
  };
  const etl = () => {
    const etd = etr.socket;
    if (!etd) return null;
    if (etd !== etn) {
      eta();
      etn = etd;
      eti = etd.writable.getWriter();
    }
    return eti;
  };
  let etw = null;
  return new Response(new ReadableStream({
    async start(etf) {
      let eth = false;
      let etp = ee8.respHeader;
      const etg = {
        缓存: new Uint8Array(0)
      };
      const etm = {
        readyState: WebSocket.OPEN,
        send(ety) {
          if (eth) return;
          try {
            const etx = ety instanceof Uint8Array ? ety : ety instanceof ArrayBuffer ? new Uint8Array(ety) : ArrayBuffer.isView(ety) ? new Uint8Array(ety.buffer, ety.byteOffset, ety.byteLength) : new Uint8Array(ety);
            etf.enqueue(etx);
          } catch (etv) {
            eth = true;
            this.readyState = WebSocket.CLOSED;
          }
        },
        close() {
          if (eth) return;
          eth = true;
          this.readyState = WebSocket.CLOSED;
          try {
            etf.close();
          } catch (etb) {}
        }
      };
      const etk = etw = eb4({
        获取写入器: etl,
        释放写入器: eta,
        重试连接: async () => {
          if (typeof etr.retryConnect !== 'function') throw new Error('retry unavailable');
          await etr.retryConnect();
        },
        关闭连接: () => {
          try {
            etr.socket?.close();
          } catch (et0) {}
          ebp(etm);
        },
        名称: 'XHTTP上行'
      });
      const et1 = async (et2, et3 = true) => {
        return etk.写入并等待(et2, et3);
      };
      try {
        if (ee8.isUDP) {
          if (ee8.rawData?.byteLength) {
            eto.up += ee8.rawData.byteLength;
            if (ee8.协议 === 'trojan') await eps(ee8.rawData, etm, etg, ee5); else await ev4(ee8.rawData, etm, etp, ee5);
            etp = null;
          }
        } else {
          if (ee8.rawData?.byteLength) eto.up += ee8.rawData.byteLength;
          await emp(ee8.hostname, ee8.port, ee8.rawData, etm, ee8.respHeader, etr, ee6, ee5, eto);
        }
        while (true) {
          const {done: et4, value: et5} = await ee7.read();
          if (et4) break;
          if (!et5 || et5.byteLength === 0) continue;
          if (et5.byteLength) eto.up += et5.byteLength;
          if (ee8.isUDP) {
            if (ee8.协议 === 'trojan') await eps(et5, etm, etg, ee5); else await ev4(et5, etm, etp, ee5);
            etp = null;
          } else {
            if (!await et1(et5)) throw new Error('Remote socket is not ready');
          }
        }
        if (!ee8.isUDP) {
          await etk.等待空();
          const et6 = etl();
          if (et6) {
            try {
              await et6.close();
            } catch (et7) {}
          }
        }
      } catch (et8) {
        tbv(`[XHTTP转发] 处理失败: ${et8?.message || et8}`);
        ebp(etm);
      } finally {
        etk.清空();
        eta();
        try {
          ee7.releaseLock();
        } catch (et9) {}
        try {
          ao(td, eto.up, eto.down, null);
        } catch (ere) {}
      }
    },
    cancel() {
      etw?.清空();
      try {
        etr.socket?.close();
      } catch (ert) {}
      eta();
      try {
        ee7.releaseLock();
      } catch (err) {}
    }
  }), {
    status: 200,
    headers: ets
  });
}
function ern(eri) {
  if (!eri) return 0;
  if (typeof eri.byteLength === 'number') return eri.byteLength;
  if (typeof eri.length === 'number') return eri.length;
  return 0;
}
async function ero(ers, era) {
  const erc = efp;
  const erl = erd => {
    const erw = erd.byteLength;
    if (erw < 18) return {
      状态: 'need_more'
    };
    if (!ef4(erd, 1, era)) return {
      状态: 'invalid'
    };
    const erf = erd[17];
    const erh = 18 + erf;
    if (erw < erh + 1) return {
      状态: 'need_more'
    };
    const erp = erd[erh];
    if (erp !== 1 && erp !== 2) return {
      状态: 'invalid'
    };
    const erg = erh + 1;
    if (erw < erg + 3) return {
      状态: 'need_more'
    };
    const erm = erd[erg] << 8 | erd[erg + 1];
    const ery = erd[erg + 2];
    const erx = erg + 3;
    let erv = -1;
    let erb = '';
    if (ery === 1) {
      if (erw < erx + 4) return {
        状态: 'need_more'
      };
      erb = `${erd[erx]}.${erd[erx + 1]}.${erd[erx + 2]}.${erd[erx + 3]}`;
      erv = erx + 4;
    } else if (ery === 2) {
      if (erw < erx + 1) return {
        状态: 'need_more'
      };
      const erk = erd[erx];
      if (erw < erx + 1 + erk) return {
        状态: 'need_more'
      };
      erb = erc.decode(erd.subarray(erx + 1, erx + 1 + erk));
      erv = erx + 1 + erk;
    } else if (ery === 3) {
      if (erw < erx + 16) return {
        状态: 'need_more'
      };
      const er0 = [];
      for (let er1 = 0; er1 < 8; er1++) {
        const er2 = erx + er1 * 2;
        er0.push((erd[er2] << 8 | erd[er2 + 1]).toString(16));
      }
      erb = er0.join(':');
      erv = erx + 16;
    } else return {
      状态: 'invalid'
    };
    if (!erb) return {
      状态: 'invalid'
    };
    return {
      状态: 'ok',
      结果: {
        协议: 'vl' + 'ess',
        hostname: erb,
        port: erm,
        isUDP: erp === 2,
        rawData: erd.subarray(erv),
        respHeader: new Uint8Array([erd[0], 0])
      }
    };
  };
  const er3 = er4 => {
    const er5 = rdh(era);
    const er6 = new TextEncoder().encode(er5);
    const er7 = er4.byteLength;
    if (er7 < 58) return {
      状态: 'need_more'
    };
    if (er4[56] !== 0x0d || er4[57] !== 0x0a) return {
      状态: 'invalid'
    };
    for (let er8 = 0; er8 < 56; er8++) {
      if (er4[er8] !== er6[er8]) return {
        状态: 'invalid'
      };
    }
    const er9 = 58;
    if (er7 < er9 + 2) return {
      状态: 'need_more'
    };
    const ene = er4[er9];
    if (ene !== 1 && ene !== 3) return {
      状态: 'invalid'
    };
    const ent = ene === 3;
    const enr = er4[er9 + 1];
    let enn = er9 + 2;
    let eni = '';
    if (enr === 1) {
      if (er7 < enn + 4) return {
        状态: 'need_more'
      };
      eni = `${er4[enn]}.${er4[enn + 1]}.${er4[enn + 2]}.${er4[enn + 3]}`;
      enn += 4;
    } else if (enr === 3) {
      if (er7 < enn + 1) return {
        状态: 'need_more'
      };
      const eno = er4[enn];
      if (er7 < enn + 1 + eno) return {
        状态: 'need_more'
      };
      eni = erc.decode(er4.subarray(enn + 1, enn + 1 + eno));
      enn += 1 + eno;
    } else if (enr === 4) {
      if (er7 < enn + 16) return {
        状态: 'need_more'
      };
      const ens = [];
      for (let ena = 0; ena < 8; ena++) {
        const enc = enn + ena * 2;
        ens.push((er4[enc] << 8 | er4[enc + 1]).toString(16));
      }
      eni = ens.join(':');
      enn += 16;
    } else return {
      状态: 'invalid'
    };
    if (!eni) return {
      状态: 'invalid'
    };
    if (er7 < enn + 4) return {
      状态: 'need_more'
    };
    const enl = er4[enn] << 8 | er4[enn + 1];
    if (er4[enn + 2] !== 0x0d || er4[enn + 3] !== 0x0a) return {
      状态: 'invalid'
    };
    const end = enn + 4;
    return {
      状态: 'ok',
      结果: {
        协议: 'trojan',
        hostname: eni,
        port: enl,
        isUDP: ent,
        rawData: er4.subarray(end),
        respHeader: null
      }
    };
  };
  let enw = new Uint8Array(1024);
  let enf = 0;
  while (true) {
    const {value: enh, done: enp} = await ers.read();
    if (enp) {
      if (enf === 0) return null;
      break;
    }
    const eng = enh instanceof Uint8Array ? enh : new Uint8Array(enh);
    if (enf + eng.byteLength > enw.byteLength) {
      const enm = new Uint8Array(Math.max(enw.byteLength * 2, enf + eng.byteLength));
      enm.set(enw.subarray(0, enf));
      enw = enm;
    }
    enw.set(eng, enf);
    enf += eng.byteLength;
    const eny = enw.subarray(0, enf);
    const enx = er3(eny);
    if (enx.状态 === 'ok') return {
      ...enx.结果,
      reader: ers
    };
    const enb = erl(eny);
    if (enb.状态 === 'ok') return {
      ...enb.结果,
      reader: ers
    };
    if (enx.状态 === 'invalid' && enb.状态 === 'invalid') return null;
  }
  const enk = enw.subarray(0, enf);
  const en0 = er3(enk);
  if (en0.状态 === 'ok') return {
    ...en0.结果,
    reader: ers
  };
  const en1 = erl(enk);
  if (en1.状态 === 'ok') return {
    ...en1.结果,
    reader: ers
  };
  return null;
}
async function en2(en3, en4) {
  if (!en3.body) return new Response('Bad Request', {
    status: 400
  });
  const en5 = en3.body.getReader();
  const en6 = {
    socket: null,
    connectingPromise: null,
    retryConnect: null
  };
  let en7 = false;
  const en8 = {
    缓存: new Uint8Array(0)
  };
  let en9 = null;
  let eie = null;
  let eit = null;
  let eir = null;
  const ein = {
    up: 0,
    down: 0
  };
  const eii = new Headers({
    'Content-Type': 'application/grpc',
    'grpc-status': '0',
    'X-Accel-Buffering': 'no',
    'Cache-Control': 'no-store'
  });
  const eio = rd;
  const eis = Math.max(rf, 1);
  return new Response(new ReadableStream({
    async start(eia) {
      let eic = false;
      let eil = [];
      let eid = 0;
      let eiw = null;
      let eif = false;
      const eih = {
        readyState: WebSocket.OPEN,
        send(eip) {
          if (eic) return;
          const eig = eip instanceof Uint8Array ? eip : new Uint8Array(eip);
          const eim = [];
          let eiy = eig.byteLength >>> 0;
          while (eiy > 127) {
            eim.push(eiy & 0x7f | 0x80);
            eiy >>>= 7;
          }
          eim.push(eiy);
          const eix = new Uint8Array(eim);
          const eiv = 1 + eix.length + eig.byteLength;
          const eib = new Uint8Array(5 + eiv);
          eib[0] = 0;
          eib[1] = eiv >>> 24 & 0xff;
          eib[2] = eiv >>> 16 & 0xff;
          eib[3] = eiv >>> 8 & 0xff;
          eib[4] = eiv & 0xff;
          eib[5] = 0x0a;
          eib.set(eix, 6);
          eib.set(eig, 6 + eix.length);
          eil.push(eib);
          eid += eib.byteLength;
          ei6();
        },
        close() {
          if (this.readyState === WebSocket.CLOSED) return;
          ei0(true);
          eic = true;
          this.readyState = WebSocket.CLOSED;
          try {
            eia.close();
          } catch (eik) {}
        }
      };
      const ei0 = (ei1 = false) => {
        eif = false;
        if (eiw) {
          clearTimeout(eiw);
          eiw = null;
        }
        if (!ei1 && eic || eid === 0) return;
        const ei2 = new Uint8Array(eid);
        let ei3 = 0;
        for (const ei4 of eil) {
          ei2.set(ei4, ei3);
          ei3 += ei4.byteLength;
        }
        eil = [];
        eid = 0;
        try {
          eia.enqueue(ei2);
        } catch (ei5) {
          eic = true;
          eih.readyState = WebSocket.CLOSED;
        }
      };
      const ei6 = () => {
        if (eid >= eio) {
          ei0();
          return;
        }
        if (eif || eiw) return;
        eif = true;
        queueMicrotask(() => {
          eif = false;
          if (eic || eid === 0 || eiw) return;
          eiw = setTimeout(ei0, eis);
        });
      };
      const ei7 = () => {
        if (eic) return;
        eir?.清空();
        ei0(true);
        eic = true;
        eih.readyState = WebSocket.CLOSED;
        if (eiw) clearTimeout(eiw);
        if (eit) {
          try {
            eit.releaseLock();
          } catch (ei8) {}
          eit = null;
        }
        eie = null;
        try {
          en5.releaseLock();
        } catch (ei9) {}
        try {
          en6.socket?.close();
        } catch (eoe) {}
        try {
          eia.close();
        } catch (eot) {}
      };
      const eor = () => {
        if (eit) {
          try {
            eit.releaseLock();
          } catch (eon) {}
          eit = null;
        }
        eie = null;
      };
      const eoi = eir = eb4({
        获取写入器: () => {
          const eoo = en6.socket;
          if (!eoo) return null;
          if (eoo !== eie) {
            eor();
            eie = eoo;
            eit = eoo.writable.getWriter();
          }
          return eit;
        },
        释放写入器: eor,
        重试连接: async () => {
          if (typeof en6.retryConnect !== 'function') throw new Error('retry unavailable');
          await en6.retryConnect();
        },
        关闭连接: ei7,
        名称: 'gRPC上行'
      });
      const eos = async (eoa, eoc = true) => {
        return eoi.写入并等待(eoa, eoc);
      };
      try {
        let eol = new Uint8Array(0);
        while (true) {
          const {done: eod, value: eow} = await en5.read();
          if (eod) break;
          if (!eow || eow.byteLength === 0) continue;
          const eof = eow instanceof Uint8Array ? eow : new Uint8Array(eow);
          const eoh = new Uint8Array(eol.length + eof.length);
          eoh.set(eol, 0);
          eoh.set(eof, eol.length);
          eol = eoh;
          while (eol.byteLength >= 5) {
            const eop = eol[1] << 24 >>> 0 | eol[2] << 16 | eol[3] << 8 | eol[4];
            const eog = 5 + eop;
            if (eol.byteLength < eog) break;
            const eom = eol.subarray(5, eog);
            eol = eol.slice(eog);
            if (!eom.byteLength) continue;
            let eoy = eom;
            if (eoy.byteLength >= 2 && eoy[0] === 0x0a) {
              let eox = 0;
              let eov = 1;
              let eob = false;
              while (eov < eoy.length) {
                const eok = eoy[eov++];
                if ((eok & 0x80) === 0) {
                  eob = true;
                  break;
                }
                eox += 7;
                if (eox > 35) break;
              }
              if (eob) eoy = eoy.subarray(eov);
            }
            if (!eoy.byteLength) continue;
            if (en7) {
              if (en9) await eps(eoy, eih, en8, en3); else await ev4(eoy, eih, null, en3);
              continue;
            }
            if (en6.socket) {
              ein.up += eoy.byteLength;
              if (!await eos(eoy)) throw new Error('Remote socket is not ready');
            } else {
              const eo0 = eh5(eoy);
              if (en9 === null) en9 = eo0.byteLength >= 58 && eo0[56] === 0x0d && eo0[57] === 0x0a;
              if (en9) {
                const eo1 = ew4(eo0, en4);
                if (eo1?.hasError) throw new Error(eo1.message || 'Invalid trojan request');
                const {port: eo2, hostname: eo3, rawClientData: eo4, isUDP: eo5} = eo1;
                tbv(`[gRPC] 木马首包: ${eo3}:${eo2} | UDP: ${eo5 ? '是' : '否'}`);
                if (rhw(eo3)) throw new Error('Blocked site');
                if (eo5) {
                  en7 = true;
                  if (ern(eo4) > 0) {
                    ein.up += ern(eo4);
                    await eps(eo4, eih, en8, en3);
                  }
                } else {
                  ein.up += ern(eo4);
                  await emp(eo3, eo2, eo4, eih, null, en6, en4, en3, ein);
                }
              } else {
                en9 = false;
                const eo6 = ehe(eo0, en4);
                if (eo6?.hasError) throw new Error(eo6.message || 'Invalid 魏烈思 request');
                const {port: eo7, hostname: eo8, version: eo9, isUDP: ese, rawClientData: est} = eo6;
                tbv(`[gRPC] 魏烈思首包: ${eo8}:${eo7} | UDP: ${ese ? '是' : '否'}`);
                if (rhw(eo8)) throw new Error('Blocked site');
                if (ese) {
                  if (eo7 !== 53) throw new Error('UDP is not supported');
                  en7 = true;
                }
                const esr = new Uint8Array([eo9, 0]);
                eih.send(esr);
                const esn = est;
                if (en7) {
                  if (en9) await eps(esn, eih, en8, en3); else await ev4(esn, eih, null, en3);
                } else {
                  ein.up += ern(esn);
                  await emp(eo8, eo7, esn, eih, null, en6, en4, en3, ein);
                }
              }
            }
          }
          ei0();
        }
        await eoi.等待空();
      } catch (esi) {
        tbv(`[gRPC转发] 处理失败: ${esi?.message || esi}`);
      } finally {
        eoi.清空();
        eor();
        ei7();
        try {
          ao(td, ein.up, ein.down, null);
        } catch (eso) {}
      }
    },
    cancel() {
      eir?.清空();
      try {
        en6.socket?.close();
      } catch (ess) {}
      try {
        en5.releaseLock();
      } catch (esa) {}
    }
  }), {
    status: 200,
    headers: eii
  });
}
function esc(esl, esd) {
  if (!esl?.byteLength) return false;
  if (esl.byteLength >= 18 && ef4(esl, 1, esd)) return true;
  if (esl.byteLength < 58 || esl[56] !== 0x0d || esl[57] !== 0x0a) return false;
  const esw = rdh(esd);
  for (let esf = 0; esf < 56; esf++) {
    if (esl[esf] !== esw.charCodeAt(esf)) return false;
  }
  return true;
}
function esh(esp, esg) {
  if (!esp) return null;
  if (esp.length > rs) throw new Error('early data is too large');
  let esm;
  const esy = Uint8Array;
  if (typeof esy.fromBase64 === 'function') {
    try {
      esm = esy.fromBase64(esp, {
        alphabet: 'base64url'
      });
    } catch (esx) {}
  }
  if (!esm) {
    let esv = esp.replace(/-/g, '+').replace(/_/g, '/');
    const esb = esv.length % 4;
    if (esb) esv += ('=').repeat(4 - esb);
    let esk;
    try {
      esk = atob(esv);
    } catch (es0) {
      return null;
    }
    esm = new Uint8Array(esk.length);
    for (let es1 = 0; es1 < esk.length; es1++) esm[es1] = esk.charCodeAt(es1);
  }
  if (esm.byteLength > ro) throw new Error('early data is too large');
  return esc(esm, esg) ? esm : null;
}
async function es2(es3, es4, es5) {
  const es6 = new WebSocketPair();
  const [es7, es8] = Object.values(es6);
  try {
    es8.accept({
      allowHalfOpen: true
    });
  } catch (es9) {
    es8.accept();
  }
  es8.binaryType = 'arraybuffer';
  let eae = {
    socket: null,
    connectingPromise: null,
    retryConnect: null
  };
  let eat = false;
  let ear = null;
  const ean = {
    缓存: new Uint8Array(0)
  };
  const eai = es3.headers.get('sec-websocket-protocol') || '';
  const eao = !!es5.searchParams.get('enc');
  let eas = null;
  let eaa = Promise.resolve();
  let eac = false, eal = false, ead = false;
  let eaw = 0, eaf = 0;
  let eah = null, eap = null, eag = null;
  let eam = null, eay = null;
  const eax = {
    up: 0,
    down: 0
  };
  const eav = a8('down');
  const eab = () => {
    if (eag) {
      try {
        eag.releaseLock();
      } catch (eak) {}
      eag = null;
    }
    eap = null;
  };
  const ea0 = eas = eb4({
    获取写入器: () => {
      const ea1 = eae.socket;
      if (!ea1) return null;
      if (ea1 !== eap) {
        eab();
        eap = ea1;
        eag = ea1.writable.getWriter();
      }
      return eag;
    },
    释放写入器: eab,
    重试连接: async () => {
      if (typeof eae.retryConnect !== 'function') throw new Error('retry unavailable');
      await eae.retryConnect();
    },
    关闭连接: () => {
      try {
        eae.socket?.close();
      } catch (ea2) {}
      ebp(es8);
    },
    名称: 'WS上行'
  });
  const ea3 = async (ea4, ea5 = true) => {
    return ea0.写入并等待(ea4, ea5);
  };
  const ea6 = async () => {
    if (eam) return eam;
    if (!eay) {
      eay = (async () => {
        const ea7 = (es5.searchParams.get('enc') || '').toLowerCase();
        const ea8 = ehb[ea7] || ehb['aes-128-gcm'];
        const ea9 = [ea8, ...Object.values(ehb).filter(ece => ece.method !== ea8.method)];
        const ect = new Map();
        const ecr = ecn => {
          if (!ect.has(ecn.method)) ect.set(ecn.method, egl(es4, ecn.keyLen));
          return ect.get(ecn.method);
        };
        const eci = {
          buffer: new Uint8Array(0),
          hasSalt: false,
          waitPayloadLength: null,
          decryptKey: null,
          nonceCounter: new Uint8Array(eh0),
          加密配置: null
        };
        const eco = async () => {
          const ecs = 2 + ehk;
          const eca = Math.max(...ea9.map(ecc => ecc.saltLen));
          const ecl = 16;
          const ecd = Math.min(ecl, Math.max(0, eci.buffer.byteLength - (ecs + Math.min(...ea9.map(ecw => ecw.saltLen)))));
          for (let ecf = 0; ecf <= ecd; ecf++) {
            for (const ech of ea9) {
              const ecp = ecf + ech.saltLen + ecs;
              if (eci.buffer.byteLength < ecp) continue;
              const ecg = eci.buffer.subarray(ecf, ecf + ech.saltLen);
              const ecm = eci.buffer.subarray(ecf + ech.saltLen, ecp);
              const ecy = await ecr(ech);
              const ecx = await egv(ech, ecy, ecg, ['decrypt']);
              const ecv = new Uint8Array(eh0);
              try {
                const ecb = await emc(ecx, ecv, ecm);
                if (ecb.byteLength !== 2) continue;
                const eck = ecb[0] << 8 | ecb[1];
                if (eck < 0 || eck > ech.maxChunk) continue;
                if (ecf > 0) tbv(`[SS入站] 检测到前导噪声 ${ecf}B，已自动对齐`);
                if (ech.method !== ea8.method) tbv(`[SS入站] URL enc=${ea7 || ea8.method} 与实际 ${ech.method} 不一致，已自动切换`);
                eci.buffer = eci.buffer.subarray(ecp);
                eci.decryptKey = ecx;
                eci.nonceCounter = ecv;
                eci.waitPayloadLength = eck;
                eci.加密配置 = ech;
                eci.hasSalt = true;
                return true;
              } catch (ec0) {}
            }
          }
          const ec1 = eca + ecs + ecl;
          if (eci.buffer.byteLength >= ec1) {
            throw new Error(`SS handshake decrypt failed (enc=${ea7 || 'auto'}, candidates=${ea9.map(ec2 => ec2.method).join('/')})`);
          }
          return false;
        };
        const ec3 = {
          async 输入(ec4) {
            const ec5 = eh5(ec4);
            if (ec5.byteLength > 0) eci.buffer = eh7(eci.buffer, ec5);
            if (!eci.hasSalt) {
              const ec6 = await eco();
              if (!ec6) return [];
            }
            const ec7 = [];
            while (true) {
              if (eci.waitPayloadLength === null) {
                const ec8 = 2 + ehk;
                if (eci.buffer.byteLength < ec8) break;
                const ec9 = eci.buffer.subarray(0, ec8);
                eci.buffer = eci.buffer.subarray(ec8);
                const ele = await emc(eci.decryptKey, eci.nonceCounter, ec9);
                if (ele.byteLength !== 2) throw new Error('SS length decrypt failed');
                const elt = ele[0] << 8 | ele[1];
                if (elt < 0 || elt > eci.加密配置.maxChunk) throw new Error(`SS payload length invalid: ${elt}`);
                eci.waitPayloadLength = elt;
              }
              const elr = eci.waitPayloadLength + ehk;
              if (eci.buffer.byteLength < elr) break;
              const eln = eci.buffer.subarray(0, elr);
              eci.buffer = eci.buffer.subarray(elr);
              const eli = await emc(eci.decryptKey, eci.nonceCounter, eln);
              ec7.push(eli);
              eci.waitPayloadLength = null;
            }
            return ec7;
          }
        };
        let elo = null;
        const els = 32 * 1024;
        const ela = async () => {
          if (elo) return elo;
          if (!eci.加密配置) throw new Error('SS cipher is not negotiated');
          const elc = eci.加密配置;
          const ell = await egl(es4, elc.keyLen);
          const eld = crypto.getRandomValues(new Uint8Array(elc.saltLen));
          const elw = await egv(elc, ell, eld, ['encrypt']);
          const elf = new Uint8Array(eh0);
          let elh = false;
          elo = {
            async 加密并发送(elp, elg) {
              const elm = eh5(elp);
              if (!elh) {
                await elg(eld);
                elh = true;
              }
              if (elm.byteLength === 0) return;
              let ely = 0;
              while (ely < elm.byteLength) {
                const elx = Math.min(ely + elc.maxChunk, elm.byteLength);
                const elv = elm.subarray(ely, elx);
                const elb = new Uint8Array(2);
                elb[0] = elv.byteLength >>> 8 & 0xff;
                elb[1] = elv.byteLength & 0xff;
                const elk = await emr(elw, elf, elb);
                const el0 = await emr(elw, elf, elv);
                const el1 = new Uint8Array(elk.byteLength + el0.byteLength);
                el1.set(elk, 0);
                el1.set(el0, elk.byteLength);
                await elg(el1);
                ely = elx;
              }
            }
          };
          return elo;
        };
        let el2 = Promise.resolve();
        const el3 = el4 => {
          el2 = el2.then(async () => {
            if (es8.readyState !== WebSocket.OPEN) return;
            const el5 = await ela();
            await el5.加密并发送(el4, async el6 => {
              if (el6.byteLength > 0 && es8.readyState === WebSocket.OPEN) {
                await eb0(es8, el6.buffer);
              }
            });
          }).catch(el7 => {
            tbv(`[SS发送] 加密失败: ${el7?.message || el7}`);
            ebp(es8);
          });
          return el2;
        };
        const el8 = {
          get readyState() {
            return es8.readyState;
          },
          send(el9) {
            const ede = eh5(el9);
            if (ede.byteLength <= els) {
              return el3(ede);
            }
            for (let edt = 0; edt < ede.byteLength; edt += els) {
              el3(ede.subarray(edt, Math.min(edt + els, ede.byteLength)));
            }
            return el2;
          },
          close() {
            ebp(es8);
          }
        };
        eam = {
          入站解密器: ec3,
          回包Socket: el8,
          首包已建立: false,
          目标主机: '',
          目标端口: 0
        };
        return eam;
      })().finally(() => {
        eay = null;
      });
    }
    return eay;
  };
  const edr = async edn => {
    const edi = await ea6();
    let edo = null;
    try {
      edo = await edi.入站解密器.输入(edn);
    } catch (eds) {
      const eda = eds?.message || `${eds}`;
      if (eda.includes('Decryption failed') || eda.includes('SS handshake decrypt failed') || eda.includes('SS length decrypt failed')) {
        tbv(`[SS入站] 解密失败，连接关闭: ${eda}`);
        ebp(es8);
        return;
      }
      throw eds;
    }
    for (const edc of edo) {
      let edl = false;
      try {
        edl = await ea3(edc, false);
      } catch (edd) {
        if (edd?.isQueueOverflow) throw edd;
        edl = false;
      }
      if (edl) continue;
      if (edi.首包已建立 && edi.目标主机 && edi.目标端口 > 0) {
        await emp(edi.目标主机, edi.目标端口, edc, edi.回包Socket, null, eae, es4, es3);
        continue;
      }
      const edw = eh5(edc);
      if (edw.byteLength < 3) throw new Error('invalid ss data');
      const edf = edw[0];
      let edh = 1;
      let edp = '';
      if (edf === 1) {
        if (edw.byteLength < edh + 4 + 2) throw new Error('invalid ss ipv4 length');
        edp = `${edw[edh]}.${edw[edh + 1]}.${edw[edh + 2]}.${edw[edh + 3]}`;
        edh += 4;
      } else if (edf === 3) {
        if (edw.byteLength < edh + 1) throw new Error(e5("aW52YWxpZCBzcyBkb21haW4gbGVuZ3Ro"));
        const edg = edw[edh];
        edh += 1;
        if (edw.byteLength < edh + edg + 2) throw new Error('invalid ss domain data');
        edp = eh3.decode(edw.subarray(edh, edh + edg));
        edh += edg;
      } else if (edf === 4) {
        if (edw.byteLength < edh + 16 + 2) throw new Error('invalid ss ipv6 length');
        const edm = [];
        const edy = new DataView(edw.buffer, edw.byteOffset + edh, 16);
        for (let edx = 0; edx < 8; edx++) edm.push(edy.getUint16(edx * 2).toString(16));
        edp = edm.join(':');
        edh += 16;
      } else {
        throw new Error(`invalid ss addressType: ${edf}`);
      }
      if (!edp) throw new Error(`invalid ss address: ${edf}`);
      const edv = edw[edh] << 8 | edw[edh + 1];
      edh += 2;
      const edb = edw.subarray(edh);
      if (rhw(edp)) throw new Error('Blocked site');
      edi.首包已建立 = true;
      edi.目标主机 = edp;
      edi.目标端口 = edv;
      await emp(edp, edv, edb, edi.回包Socket, null, eae, es4, es3, eax);
    }
  };
  const edk = async ed0 => {
    let ed1 = null;
    const ed2 = ern(ed0);
    if (ed2 > 0) eax.up += ed2;
    if (eat) {
      if (ear) return await eps(ed0, es8, ean, es3);
      return await ev4(ed0, es8, null, es3);
    }
    if (eah === 'ss') {
      await edr(ed0);
      return;
    }
    if (await ea3(ed0)) return;
    if (eah === null) {
      if (es5.searchParams.get('enc')) eah = 'ss'; else {
        ed1 = ed1 || eh5(ed0);
        const ed3 = ed1;
        eah = ed3.byteLength >= 58 && ed3[56] === 0x0d && ed3[57] === 0x0a ? '木马' : '魏烈思';
      }
      ear = eah === '木马';
      tbv(`[WS转发] 协议类型: ${eah} | 来自: ${es5.host} | UA: ${es3.headers.get('user-agent') || '未知'}`);
    }
    if (eah === 'ss') {
      await edr(ed0);
      return;
    }
    if (await ea3(ed0)) return;
    if (eah === '木马') {
      const ed4 = ew4(ed0, es4);
      if (ed4?.hasError) throw new Error(ed4.message || 'Invalid trojan request');
      const {port: ed5, hostname: ed6, rawClientData: ed7, isUDP: ed8} = ed4;
      if (rhw(ed6)) throw new Error('Blocked site');
      if (ed8) {
        eat = true;
        if (ern(ed7) > 0) return eps(ed7, es8, ean, es3);
        return;
      }
      await emp(ed6, ed5, ed7, es8, null, eae, es4, es3, eax);
    } else {
      ear = false;
      ed1 = ed1 || eh5(ed0);
      const ed9 = ed1;
      const ewe = ehe(ed9, es4);
      if (ewe?.hasError) throw new Error(ewe.message || 'Invalid 魏烈思 request');
      const {port: ewt, hostname: ewr, version: ewn, isUDP: ewi, rawClientData: ewo} = ewe;
      if (rhw(ewr)) throw new Error('Blocked site');
      if (ewi) {
        if (ewt === 53) eat = true; else throw new Error('UDP is not supported');
      }
      const ews = new Uint8Array([ewn, 0]);
      const ewa = ewo;
      if (eat) {
        if (ear) return eps(ewa, es8, ean, es3);
        return ev4(ewa, es8, ews, es3);
      }
      await emp(ewr, ewt, ewa, es8, ews, eae, es4, es3, eax);
    }
  };
  const ewc = ewl => {
    if (eal) return;
    eal = true;
    eac = true;
    eaw = 0;
    eaf = 0;
    try {
      ao(td, eax.up, eax.down, null);
    } catch (ewd) {}
    const eww = ewl?.message || `${ewl}`;
    if (eww.includes('Network connection lost') || eww.includes('ReadableStream is closed')) {
      tbv(`[WS转发] 连接结束: ${eww}`);
    } else {
      tbv(`[WS转发] 处理失败: ${eww}`);
    }
    ea0.清空();
    eab();
    ebp(es8);
  };
  const ewf = ewh => {
    eaa = eaa.then(ewh).catch(ewc);
    return eaa;
  };
  const ewp = ewg => {
    if (eac || eal) return;
    const ewm = Math.max(0, ern(ewg));
    const ewy = eaw + ewm;
    const ewx = eaf + 1;
    if (ewy > rc || ewx > rl) {
      ewc(new Error(`[WS显式传输] 队列溢出: ${ewy}B/${ewx}`));
      return;
    }
    eaw = ewy;
    eaf = ewx;
    ewf(async () => {
      eaw = Math.max(0, eaw - ewm);
      eaf = Math.max(0, eaf - 1);
      if (eal) return;
      await edk(ewg);
    });
  };
  const ewv = () => {
    if (ead) return;
    ead = true;
    eac = true;
    ewf(async () => {
      if (eal) return;
      await ea0.等待空();
      eab();
    });
  };
  es8.addEventListener('message', ewb => {
    ewp(ewb.data);
  });
  es8.addEventListener('close', () => {
    ebp(es8);
    ewv();
    try {
      ao(td, eax.up, eax.down, null);
    } catch (ewk) {}
  });
  es8.addEventListener('error', ew0 => {
    ewc(ew0);
  });
  if (!eao && eai) {
    try {
      const ew1 = esh(eai, es4);
      if (ew1?.byteLength) {
        eax.up += ew1.byteLength;
        ewp(ew1.buffer);
      }
    } catch (ew2) {
      ewc(ew2);
    }
  }
  return new Response(null, {
    status: 101,
    webSocket: es7,
    headers: {
      'Sec-WebSocket-Extensions': ''
    }
  });
}
const ew3 = new TextDecoder();
function ew4(ew5, ew6) {
  const ew7 = eh5(ew5);
  const ew8 = rdh(ew6);
  if (ew7.byteLength < 58) return {
    hasError: true,
    message: "invalid data"
  };
  let ew9 = 56;
  if (ew7[ew9] !== 0x0d || ew7[ew9 + 1] !== 0x0a) return {
    hasError: true,
    message: "invalid header format"
  };
  for (let efe = 0; efe < ew9; efe++) {
    if (ew7[efe] !== ew8.charCodeAt(efe)) return {
      hasError: true,
      message: "invalid password"
    };
  }
  const eft = ew9 + 2;
  if (ew7.byteLength < eft + 6) return {
    hasError: true,
    message: "invalid S5 request data"
  };
  const efr = ew7[eft];
  if (efr !== 1 && efr !== 3) return {
    hasError: true,
    message: "unsupported command, only TCP/UDP is allowed"
  };
  const efn = efr === 3;
  const efi = ew7[eft + 1];
  let efo = 0;
  let efs = eft + 2;
  let efa = "";
  switch (efi) {
    case 1:
      efo = 4;
      if (ew7.byteLength < efs + efo + 4) return {
        hasError: true,
        message: "invalid S5 request data"
      };
      efa = `${ew7[efs]}.${ew7[efs + 1]}.${ew7[efs + 2]}.${ew7[efs + 3]}`;
      break;
    case 3:
      if (ew7.byteLength < efs + 1) return {
        hasError: true,
        message: "invalid S5 request data"
      };
      efo = ew7[efs];
      efs += 1;
      if (ew7.byteLength < efs + efo + 4) return {
        hasError: true,
        message: "invalid S5 request data"
      };
      efa = ew3.decode(ew7.subarray(efs, efs + efo));
      break;
    case 4:
      efo = 16;
      if (ew7.byteLength < efs + efo + 4) return {
        hasError: true,
        message: "invalid S5 request data"
      };
      const efc = [];
      for (let efl = 0; efl < 8; efl++) {
        const efd = efs + efl * 2;
        efc.push((ew7[efd] << 8 | ew7[efd + 1]).toString(16));
      }
      efa = efc.join(":");
      break;
    default:
      return {
        hasError: true,
        message: `invalid addressType is ${efi}`
      };
  }
  if (!efa) {
    return {
      hasError: true,
      message: `address is empty, addressType is ${efi}`
    };
  }
  const efw = efs + efo;
  if (ew7.byteLength < efw + 4) return {
    hasError: true,
    message: "invalid S5 request data"
  };
  const eff = ew7[efw] << 8 | ew7[efw + 1];
  return {
    hasError: false,
    addressType: efi,
    port: eff,
    hostname: efa,
    isUDP: efn,
    rawClientData: ew7.subarray(efw + 4)
  };
}
const efh = new Map();
const efp = new TextDecoder();
function efg(efm) {
  if (efm >= 48 && efm <= 57) return efm - 48;
  efm |= 32;
  if (efm >= 97 && efm <= 102) return efm - 87;
  return -1;
}
function efy(efx) {
  const efv = String(efx || '');
  let efb = efh.get(efv);
  if (efb) return efb;
  const efk = efv.replace(/-/g, '');
  if (efk.length !== 32) return null;
  const ef0 = new Uint8Array(16);
  for (let ef1 = 0; ef1 < 16; ef1++) {
    const ef2 = efg(efk.charCodeAt(ef1 * 2));
    const ef3 = efg(efk.charCodeAt(ef1 * 2 + 1));
    if (ef2 < 0 || ef3 < 0) return null;
    ef0[ef1] = ef2 << 4 | ef3;
  }
  if (efh.size >= 32) efh.clear();
  efh.set(efv, ef0);
  return ef0;
}
function ef4(ef5, ef6, ef7) {
  const ef8 = efy(ef7);
  if (!ef8 || ef5.byteLength < ef6 + 16) return false;
  for (let ef9 = 0; ef9 < 16; ef9++) {
    if (ef5[ef6 + ef9] !== ef8[ef9]) return false;
  }
  return true;
}
function ehe(eht, ehr) {
  const ehn = eh5(eht);
  const ehi = ehn.byteLength;
  if (ehi < 24) return {
    hasError: true,
    message: 'Invalid data'
  };
  const eho = ehn[0];
  if (!ef4(ehn, 1, ehr)) return {
    hasError: true,
    message: 'Invalid uuid'
  };
  const ehs = ehn[17];
  const eha = 18 + ehs;
  if (ehi < eha + 4) return {
    hasError: true,
    message: 'Invalid data'
  };
  const ehc = ehn[eha];
  let ehl = false;
  if (ehc === 1) {} else if (ehc === 2) {
    ehl = true;
  } else {
    return {
      hasError: true,
      message: 'Invalid command'
    };
  }
  const ehd = eha + 1;
  const ehw = ehn[ehd] << 8 | ehn[ehd + 1];
  let ehf = ehd + 3, ehh = 0, ehp = '';
  const ehg = ehn[ehd + 2];
  switch (ehg) {
    case 1:
      ehh = 4;
      if (ehi < ehf + ehh) return {
        hasError: true,
        message: e5("SW52YWxpZCBJUHY0IGFkZHJlc3MgbGVuZ3Ro")
      };
      ehp = `${ehn[ehf]}.${ehn[ehf + 1]}.${ehn[ehf + 2]}.${ehn[ehf + 3]}`;
      break;
    case 2:
      if (ehi < ehf + 1) return {
        hasError: true,
        message: 'Invalid domain length'
      };
      ehh = ehn[ehf];
      ehf += 1;
      if (ehi < ehf + ehh) return {
        hasError: true,
        message: 'Invalid domain data'
      };
      ehp = efp.decode(ehn.subarray(ehf, ehf + ehh));
      break;
    case 3:
      ehh = 16;
      if (ehi < ehf + ehh) return {
        hasError: true,
        message: 'Invalid IPv6 address length'
      };
      const ehm = [];
      for (let ehy = 0; ehy < 8; ehy++) {
        const ehx = ehf + ehy * 2;
        ehm.push((ehn[ehx] << 8 | ehn[ehx + 1]).toString(16));
      }
      ehp = ehm.join(':');
      break;
    default:
      return {
        hasError: true,
        message: `Invalid address type: ${ehg}`
      };
  }
  if (!ehp) return {
    hasError: true,
    message: `Invalid address: ${ehg}`
  };
  const ehv = ehf + ehh;
  return {
    hasError: false,
    addressType: ehg,
    port: ehw,
    hostname: ehp,
    isUDP: ehl,
    rawClientData: ehn.subarray(ehv),
    version: eho
  };
}
const ehb = {
  'aes-128-gcm': {
    method: 'aes-128-gcm',
    keyLen: 16,
    saltLen: 16,
    maxChunk: 0x3fff,
    aesLength: 128
  },
  'aes-256-gcm': {
    method: 'aes-256-gcm',
    keyLen: 32,
    saltLen: 32,
    maxChunk: 0x3fff,
    aesLength: 256
  }
};
const ehk = 16, eh0 = 12;
const eh1 = new TextEncoder().encode('ss-subkey');
const eh2 = new TextEncoder(), eh3 = new TextDecoder(), eh4 = new Map();
function eh5(eh6) {
  if (eh6 instanceof Uint8Array) return eh6;
  if (eh6 instanceof ArrayBuffer) return new Uint8Array(eh6);
  if (ArrayBuffer.isView(eh6)) return new Uint8Array(eh6.buffer, eh6.byteOffset, eh6.byteLength);
  return new Uint8Array(eh6 || 0);
}
function eh7(...eh8) {
  if (!eh8 || eh8.length === 0) return new Uint8Array(0);
  const eh9 = eh8.map(eh5);
  const epe = eh9.reduce((ept, epr) => ept + epr.byteLength, 0);
  const epn = new Uint8Array(epe);
  let epi = 0;
  for (const epo of eh9) {
    epn.set(epo, epi);
    epi += epo.byteLength;
  }
  return epn;
}
async function eps(epa, epc, epl, epd) {
  const epw = eh5(epa);
  const epf = epl?.缓存 instanceof Uint8Array ? epl.缓存 : new Uint8Array(0);
  const eph = epf.byteLength ? eh7(epf, epw) : epw;
  let epp = 0;
  while (epp < eph.byteLength) {
    const epg = epp;
    const epm = eph[epp];
    let epy = epp + 1;
    let epx = 0;
    if (epm === 1) epx = 4; else if (epm === 4) epx = 16; else if (epm === 3) {
      if (eph.byteLength < epy + 1) break;
      epx = 1 + eph[epy];
    } else throw new Error(`invalid trojan udp addressType: ${epm}`);
    const epv = epy + epx;
    if (eph.byteLength < epv + 6) break;
    const epb = eph[epv] << 8 | eph[epv + 1];
    const epk = eph[epv + 2] << 8 | eph[epv + 3];
    if (eph[epv + 4] !== 0x0d || eph[epv + 5] !== 0x0a) throw new Error(e5("aW52YWxpZCB0cm9qYW4gdWRwIGRlbGltaXRlcg=="));
    const ep0 = epv + 6;
    const ep1 = ep0 + epk;
    if (eph.byteLength < ep1) break;
    const ep2 = eph.slice(epg, epv + 2);
    const ep3 = eph.slice(ep0, ep1);
    epp = ep1;
    if (epb !== 53) throw new Error('UDP is not supported');
    if (!ep3.byteLength) continue;
    let ep4 = ep3;
    if (ep3.byteLength < 2 || (ep3[0] << 8 | ep3[1]) !== ep3.byteLength - 2) {
      ep4 = new Uint8Array(ep3.byteLength + 2);
      ep4[0] = ep3.byteLength >>> 8 & 0xff;
      ep4[1] = ep3.byteLength & 0xff;
      ep4.set(ep3, 2);
    }
    const ep5 = {
      缓存: new Uint8Array(0)
    };
    await ev4(ep4, epc, null, epd, ep6 => {
      const ep7 = eh5(ep6);
      const ep8 = ep5.缓存.byteLength ? eh7(ep5.缓存, ep7) : ep7;
      const ep9 = [];
      let ege = 0;
      while (ege + 2 <= ep8.byteLength) {
        const egt = ep8[ege] << 8 | ep8[ege + 1];
        const egr = ege + 2;
        const egn = egr + egt;
        if (egn > ep8.byteLength) break;
        const egi = ep8.slice(egr, egn);
        const ego = new Uint8Array(ep2.byteLength + 4 + egi.byteLength);
        ego.set(ep2, 0);
        ego[ep2.byteLength] = egi.byteLength >>> 8 & 0xff;
        ego[ep2.byteLength + 1] = egi.byteLength & 0xff;
        ego[ep2.byteLength + 2] = 0x0d;
        ego[ep2.byteLength + 3] = 0x0a;
        ego.set(egi, ep2.byteLength + 4);
        ep9.push(ego);
        ege = egn;
      }
      ep5.缓存 = ep8.slice(ege);
      return ep9.length ? ep9 : new Uint8Array(0);
    });
  }
  if (epl) epl.缓存 = eph.slice(epp);
}
function egs(ega) {
  for (let egc = 0; egc < ega.length; egc++) {
    ega[egc] = ega[egc] + 1 & 0xff;
    if (ega[egc] !== 0) return;
  }
}
async function egl(egd, egw) {
  const egf = `${egw}:${egd}`;
  if (eh4.has(egf)) return eh4.get(egf);
  const egh = (async () => {
    const egp = eh2.encode(egd || '');
    let egg = new Uint8Array(0), egm = new Uint8Array(0);
    while (egm.byteLength < egw) {
      const egy = new Uint8Array(egg.byteLength + egp.byteLength);
      egy.set(egg, 0);
      egy.set(egp, egg.byteLength);
      egg = new Uint8Array(await crypto.subtle.digest('MD5', egy));
      egm = eh7(egm, egg);
    }
    return egm.slice(0, egw);
  })();
  eh4.set(egf, egh);
  try {
    return await egh;
  } catch (egx) {
    eh4.delete(egf);
    throw egx;
  }
}
async function egv(egb, egk, eg0, eg1) {
  const eg2 = {
    name: 'HMAC',
    hash: 'SHA-1'
  };
  const eg3 = await crypto.subtle.importKey('raw', eg0, eg2, false, ['sign']);
  const eg4 = new Uint8Array(await crypto.subtle.sign('HMAC', eg3, egk));
  const eg5 = await crypto.subtle.importKey('raw', eg4, eg2, false, ['sign']);
  const eg6 = new Uint8Array(egb.keyLen);
  let eg7 = new Uint8Array(0), eg8 = 0, eg9 = 1;
  while (eg8 < egb.keyLen) {
    const eme = eh7(eg7, eh1, new Uint8Array([eg9]));
    eg7 = new Uint8Array(await crypto.subtle.sign('HMAC', eg5, eme));
    const emt = Math.min(eg7.byteLength, egb.keyLen - eg8);
    eg6.set(eg7.subarray(0, emt), eg8);
    eg8 += emt;
    eg9 += 1;
  }
  return crypto.subtle.importKey('raw', eg6, {
    name: 'AES-GCM',
    length: egb.aesLength
  }, false, eg1);
}
async function emr(emn, emi, emo) {
  const ems = emi.slice();
  const ema = await crypto.subtle.encrypt({
    name: 'AES-GCM',
    iv: ems,
    tagLength: 128
  }, emn, emo);
  egs(emi);
  return new Uint8Array(ema);
}
async function emc(eml, emd, emw) {
  const emf = emd.slice();
  const emh = await crypto.subtle.decrypt({
    name: 'AES-GCM',
    iv: emf,
    tagLength: 128
  }, eml, emw);
  egs(emd);
  return new Uint8Array(emh);
}
async function emp(emg, emm, emy, emx, emv, emb, emk, em0 = null, em1 = null) {
  tbv(`[TCP转发] 目标: ${emg}:${emm} | 反代IP: ${e8} | 反代兜底: ${ta ? '是' : '否'} | 反代类型: ${e9 || 'proxyip'} | 全局: ${te ? '是' : '否'}`);
  const em2 = 1000;
  let em3 = false;
  const em4 = e6l(em0);
  async function em5(em6, em7 = em2) {
    await Promise.race([em6.opened, new Promise((em8, em9) => setTimeout(() => em9(new Error('连接超时')), em7))]);
  }
  async function eye(eyt, eyr) {
    const eyn = em4({
      hostname: eyt,
      port: eyr
    });
    try {
      await em5(eyn);
      return eyn;
    } catch (eyi) {
      try {
        eyn?.close?.();
      } catch (eyo) {}
      throw eyi;
    }
  }
  async function eys(eya, eyc) {
    if (ern(eyc) <= 0) return;
    const eyl = eya.writable.getWriter();
    try {
      await eyl.write(eh5(eyc));
    } finally {
      try {
        eyl.releaseLock();
      } catch (eyd) {}
    }
  }
  async function eyw(eyf) {
    if (eyf.length === 1) {
      const eyh = eyf[0];
      return {
        socket: await eye(eyh.hostname, eyh.port),
        candidate: eyh
      };
    }
    const eyp = eyf.map(eyg => eye(eyg.hostname, eyg.port).then(eym => ({
      socket: eym,
      candidate: eyg
    })));
    let eyy = null;
    try {
      eyy = await Promise.any(eyp);
      return eyy;
    } finally {
      if (eyy) {
        for (const eyx of eyp) {
          eyx.then(({socket: eyv}) => {
            if (eyv !== eyy.socket) {
              try {
                eyv?.close?.();
              } catch (eyb) {}
            }
          }).catch(() => {});
        }
      }
    }
  }
  async function eyk(ey0, ey1) {
    if (!rp || tdv(ey0)) return null;
    tbv(`[TCP直连] 预加载竞速拨号开启，开始并发查询 ${ey0} 的 A/AAAA 记录`);
    const [ey2, ey3] = await Promise.all([t8r(ey0, 'A'), t8r(ey0, 'AAAA')]);
    const ey4 = [...new Set(ey2.flatMap(ey5 => {
      const ey6 = ey5.data;
      return ey5.type === 1 && typeof ey6 === 'string' && twn(ey6) ? [ey6] : [];
    }))];
    const ey7 = [...new Set(ey3.flatMap(ey8 => {
      const ey9 = ey8.data;
      return ey8.type === 28 && typeof ey9 === 'string' && tdv(ey9) ? [ey9] : [];
    }))];
    const exe = Math.max(1, rh | 0);
    const ext = ey4.length >= exe ? ey4.slice(0, exe) : ey4.concat(ey7.slice(0, exe - ey4.length));
    const exr = ey4.length > 0 ? ext.length > ey4.length ? 'A+AAAA' : 'A' : 'AAAA';
    if (ext.length === 0) {
      tbv(`[TCP直连] ${ey0} 的 A/AAAA 未获得可用解析结果，预加载竞速不可用，回退到原始 hostname 直连。`);
      return null;
    }
    const exn = ext;
    tbv(`[TCP直连] ${ey0} A记录:${ey4.length} AAAA记录:${ey7.length}，使用${exr}记录，竞速拨号 ${exn.length}/${exe}: ${exn.join(', ')}`);
    return exn.map((exi, exo) => ({
      hostname: exi,
      port: ey1,
      attempt: exo,
      resolvedFrom: ey0
    }));
  }
  async function exs(exa, exc, exl = null, exd = false) {
    const exw = exd ? await eyk(exa, exc) : null;
    const exf = exw || Array.from({
      length: rh
    }, (exh, exp) => ({
      hostname: exa,
      port: exc,
      attempt: exp
    }));
    tbv(exw ? `[TCP直连] 并发尝试 ${exf.length} 路: ${exf.map(exg => `${exg.hostname}:${exg.port}`).join(', ')}` : `[TCP直连] 并发尝试 ${exf.length} 路: ${exa}:${exc}`);
    let exm = null;
    try {
      const exy = await eyw(exf);
      exm = exy.socket;
      if (exw) {
        const exx = exy.candidate;
        tbv(`[TCP直连] 预加载竞速结果: ${exx.hostname}:${exx.port} 胜出，源域名: ${exx.resolvedFrom || exa}`);
      }
      await eys(exm, exl);
      return exm;
    } catch (exv) {
      try {
        exm?.close?.();
      } catch (exb) {}
      if (exw) tbv(`[TCP直连] 预加载竞速失败: ${exv.message || exv}`);
      throw exv;
    }
  }
  async function exk(ex0, ex1, ex2 = null, ex3 = null, ex4 = true) {
    if (ex3 && ex3.length > 0) {
      for (let ex5 = 0; ex5 < ex3.length; ex5 += rh) {
        const ex6 = [];
        for (let ex7 = 0; ex7 < rh && ex5 + ex7 < ex3.length; ex7++) {
          const ex8 = (ts + ex5 + ex7) % ex3.length;
          const [ex9, eve] = ex3[ex8];
          ex6.push({
            hostname: ex9,
            port: eve,
            index: ex8
          });
        }
        let evt = null, evr = null;
        try {
          tbv(`[反代连接] 并发尝试 ${ex6.length} 路: ${ex6.map(evn => `${evn.hostname}:${evn.port}`).join(', ')}`);
          const evi = await eyw(ex6);
          evt = evi.socket;
          evr = evi.candidate;
          await eys(evt, ex2);
          tbv(`[反代连接] 成功连接到: ${evr.hostname}:${evr.port} (索引: ${evr.index})`);
          ts = evr.index;
          return evt;
        } catch (evo) {
          try {
            evt?.close?.();
          } catch (evs) {}
          tbv(`[反代连接] 本批连接失败: ${evo.message || evo}`);
        }
      }
    }
    if (ex4) return exs(ex0, ex1, ex2, false); else {
      ebp(emx);
      throw new Error('[反代连接] 所有反代连接失败，且未启用反代兜底，连接终止。');
    }
  }
  async function eva(evc = true) {
    if (emb.connectingPromise) {
      await emb.connectingPromise;
      return;
    }
    const evl = evc && !em3 && ern(emy) > 0;
    const evd = evl ? emy : null;
    const evw = (async () => {
      let evf;
      if (e9 === 'socks5') {
        tbv(`[SOCKS5代理] 代理到: ${emg}:${emm}`);
        evf = await e22(emg, emm, evd, em4);
      } else if (e9 === 'http') {
        tbv(`[HTTP代理] 代理到: ${emg}:${emm}`);
        evf = await e3m(emg, emm, evd, false, em4);
      } else if (e9 === 'https') {
        tbv(`[HTTPS代理] 代理到: ${emg}:${emm}`);
        evf = tdv(tr.hostname) ? await e4v(emg, emm, evd, em4) : await e3m(emg, emm, evd, true, em4);
      } else if (e9 === 'turn') {
        tbv(`[TURN代理] 代理到: ${emg}:${emm}`);
        evf = await tfk(tr, emg, emm, em4);
        if (ern(evd) > 0) {
          const evh = evf.writable.getWriter();
          try {
            await evh.write(eh5(evd));
          } finally {
            try {
              evh.releaseLock();
            } catch (evp) {}
          }
        }
      } else if (e9 === 'sstp') {
        tbv(`[SSTP代理] 代理到: ${emg}:${emm}`);
        evf = await tp3(tr, emg, emm, em4);
        if (ern(evd) > 0) {
          const evg = evf.writable.getWriter();
          try {
            await evg.write(eh5(evd));
          } finally {
            try {
              evg.releaseLock();
            } catch (evm) {}
          }
        }
      } else {
        tbv(`[反代连接] 代理到: ${emg}:${emm}`);
        const evy = await rwx(e8, emg, emk);
        try {
          evf = await exk(`${or[0]}.tp1.${or[2]}.xyz`, 1, evd, evy, ta);
        } catch (evx) {
          const evv = tf ? await ln(emg, emm, evd, em4) : null;
          if (!evv) throw evx;
          evf = evv;
        }
      }
      if (evl) em3 = true;
      emb.socket = evf;
      evf.closed.catch(() => {}).finally(() => ebp(emx));
      e18(evf, emx, emv, null, em1);
    })();
    emb.connectingPromise = evw;
    try {
      await evw;
    } finally {
      if (emb.connectingPromise === evw) {
        emb.connectingPromise = null;
      }
    }
  }
  emb.retryConnect = async () => eva(!em3);
  if (e9 && (te || tb.some(evb => new RegExp(`^${evb.replace(/\*/g, '.*')}$`, 'i').test(emg)))) {
    tbv(`[TCP转发] 启用 SOCKS5/HTTP/HTTPS/TURN/SSTP 全局代理`);
    try {
      await eva();
    } catch (evk) {
      tbv(`[TCP转发] SOCKS5/HTTP/HTTPS/TURN/SSTP 代理连接失败: ${evk.message}`);
      throw evk;
    }
  } else {
    try {
      tbv(`[TCP转发] 尝试直连到: ${emg}:${emm}`);
      const ev0 = await exs(emg, emm, emy, true);
      emb.socket = ev0;
      e18(ev0, emx, emv, async () => {
        if (emb.socket !== ev0) return;
        await eva();
      }, em1);
    } catch (ev1) {
      tbv(`[TCP转发] 直连 ${emg}:${emm} 失败: ${ev1.message}`);
      if (ev1 instanceof Error && ev1.name === '预加载解析为空') {
        ebp(emx);
        throw ev1;
      }
      try {
        await eva();
      } catch (ev2) {
        const ev3 = tf ? await ln(emg, emm, emy, em4) : null;
        if (!ev3) throw ev2;
        emb.socket = ev3;
        ev3.closed.catch(() => {}).finally(() => ebp(emx));
        e18(ev3, emx, emv, null, em1);
      }
    }
  }
}
async function ev4(ev5, ev6, ev7, ev8, ev9 = null) {
  const ebe = eh5(ev5);
  const ebt = ebe.byteLength;
  tbv(`[UDP转发] 收到 DNS 请求: ${ebt}B -> 8.8.4.4:53`);
  try {
    const ebr = e6l(ev8);
    const ebn = ebr({
      hostname: '8.8.4.4',
      port: 53
    });
    let ebi = ev7;
    const ebo = ebn.writable.getWriter();
    await ebo.write(ebe);
    tbv(`[UDP转发] DNS 请求已写入上游: ${ebt}B`);
    ebo.releaseLock();
    await ebn.readable.pipeTo(new WritableStream({
      async write(ebs) {
        const eba = eh5(ebs);
        tbv(`[UDP转发] 收到 DNS 响应: ${eba.byteLength}B`);
        const ebc = ev9 ? await ev9(eba) : eba;
        const ebl = Array.isArray(ebc) ? ebc : [ebc];
        if (!ebl.length) return;
        if (ev6.readyState !== WebSocket.OPEN) return;
        for (const ebd of ebl) {
          const ebw = eh5(ebd);
          if (!ebw.byteLength) continue;
          if (ebi) {
            const ebf = new Uint8Array(ebi.length + ebw.byteLength);
            ebf.set(ebi, 0);
            ebf.set(ebw, ebi.length);
            await eb0(ev6, ebf.buffer);
            ebi = null;
          } else {
            await eb0(ev6, ebw);
          }
        }
      }
    }));
  } catch (ebh) {
    tbv(`[UDP转发] DNS 转发失败: ${ebh?.message || ebh}`);
  }
}
function ebp(ebg) {
  try {
    if (ebg.readyState === WebSocket.OPEN || ebg.readyState === WebSocket.CLOSING) {
      ebg.close();
    }
  } catch (ebm) {}
}
function eby(ebx, ebv = 0) {
  const ebb = [...ebx.slice(ebv, ebv + 16)].map(ebk => ebk.toString(16).padStart(2, '0')).join('');
  return `${ebb.substring(0, 8)}-${ebb.substring(8, 12)}-${ebb.substring(12, 16)}-${ebb.substring(16, 20)}-${ebb.substring(20)}`;
}
async function eb0(eb1, eb2) {
  const eb3 = eb1.send(eb2);
  if (eb3 && typeof eb3.then === 'function') await eb3;
}
function eb4({获取写入器: eb5, 释放写入器: eb6, 重试连接: eb7, 关闭连接: eb8, 名称: eb9 = '上行队列'}) {
  let eke = [];
  let ekt = 0;
  let ekr = 0;
  let ekn = false;
  let eki = false;
  let eko = null;
  let eks = [];
  let eka = null;
  const ekc = (ekl, ekd = null) => {
    if (!ekl) return;
    for (const ekw of ekl) {
      if (ekd) ekw.reject(ekd); else ekw.resolve();
    }
  };
  const ekf = ekh => {
    for (let ekp = ekt; ekp < eke.length; ekp++) {
      const ekg = eke[ekp];
      if (ekg?.completions) ekc(ekg.completions, ekh);
    }
  };
  const ekm = () => {
    if (ekt > 32 && ekt * 2 >= eke.length) {
      eke = eke.slice(ekt);
      ekt = 0;
    }
  };
  const eky = () => {
    if (ekr || ekn || !eks.length) return;
    const ekx = eks;
    eks = [];
    for (const ekv of ekx) ekv();
  };
  const ekb = (ekk = null) => {
    const ek0 = ekk || (eki ? new Error(`${eb9}: queue closed`) : null);
    if (ek0) {
      ekf(ek0);
      ekc(eka, ek0);
      eka = null;
    }
    eke = [];
    ekt = 0;
    ekr = 0;
    eky();
  };
  const ek1 = () => {
    if (ekt >= eke.length) return null;
    const ek2 = eke[ekt];
    eke[ekt++] = undefined;
    ekr -= ek2.chunk.byteLength;
    ekm();
    return ek2;
  };
  const ek3 = () => {
    const ek4 = ek1();
    if (!ek4) return null;
    if (ekt >= eke.length || ek4.chunk.byteLength >= ra) return ek4;
    let ek5 = ek4.chunk.byteLength;
    let ek6 = ekt;
    let ek7 = ek4.allowRetry;
    let ek8 = ek4.completions || null;
    while (ek6 < eke.length) {
      const ek9 = eke[ek6];
      const e0e = ek5 + ek9.chunk.byteLength;
      if (e0e > ra) break;
      ek5 = e0e;
      ek7 = ek7 && ek9.allowRetry;
      if (ek9.completions) ek8 = ek8 ? ek8.concat(ek9.completions) : ek9.completions;
      ek6++;
    }
    if (ek6 === ekt) return ek4;
    const e0t = eko ||= new Uint8Array(ra);
    e0t.set(ek4.chunk);
    let e0r = ek4.chunk.byteLength;
    while (ekt < ek6) {
      const e0n = eke[ekt];
      eke[ekt++] = undefined;
      ekr -= e0n.chunk.byteLength;
      e0t.set(e0n.chunk, e0r);
      e0r += e0n.chunk.byteLength;
    }
    ekm();
    return {
      chunk: e0t.subarray(0, ek5),
      allowRetry: ek7,
      completions: ek8
    };
  };
  const e0i = async () => {
    if (ekn || eki) return;
    ekn = true;
    try {
      for (; ; ) {
        if (eki) break;
        const e0o = ek3();
        if (!e0o) break;
        let e0s = eb5();
        if (!e0s) throw new Error(`${eb9}: remote writer unavailable`);
        const e0a = e0o.completions || null;
        eka = e0a;
        try {
          try {
            await e0s.write(e0o.chunk);
          } catch (e0c) {
            eb6?.();
            if (!e0o.allowRetry || typeof eb7 !== 'function') throw e0c;
            await eb7();
            e0s = eb5();
            if (!e0s) throw e0c;
            await e0s.write(e0o.chunk);
          }
          ekc(e0a);
        } catch (e0l) {
          ekc(e0a, e0l);
          throw e0l;
        } finally {
          if (eka === e0a) eka = null;
        }
      }
    } catch (e0d) {
      eki = true;
      ekb(e0d);
      tbv(`[${eb9}] 写入失败: ${e0d?.message || e0d}`);
      try {
        eb8?.(e0d);
      } catch (e0w) {}
    } finally {
      ekn = false;
      if (!eki && ekt < eke.length) queueMicrotask(e0i); else eky();
    }
  };
  const e0f = (e0h, e0p = true, e0g = false) => {
    if (eki) return false;
    if (!eb5()) return false;
    const e0m = eh5(e0h);
    if (!e0m.byteLength) return true;
    const e0y = ekr + e0m.byteLength;
    const e0x = eke.length - ekt + 1;
    if (e0y > rc || e0x > rl) {
      eki = true;
      const e0v = Object.assign(new Error(`${eb9}: upload queue overflow (${e0y}B/${e0x})`), {
        isQueueOverflow: true
      });
      ekb(e0v);
      tbv(`[${eb9}] 队列超限，关闭连接`);
      try {
        eb8?.(e0v);
      } catch (e0b) {}
      throw e0v;
    }
    let e0k = null;
    let e00 = null;
    if (e0g) {
      e00 = [];
      e0k = new Promise((e01, e02) => e00.push({
        resolve: e01,
        reject: e02
      }));
    }
    eke.push({
      chunk: e0m,
      allowRetry: e0p,
      completions: e00
    });
    ekr = e0y;
    if (!ekn) queueMicrotask(e0i);
    return e0g ? e0k.then(() => true) : true;
  };
  return {
    写入(e03, e04 = true) {
      return e0f(e03, e04, false);
    },
    写入并等待(e05, e06 = true) {
      return e0f(e05, e06, true);
    },
    async 等待空() {
      if (!ekr && !ekn) return;
      await new Promise(e07 => eks.push(e07));
    },
    清空() {
      eki = true;
      ekb();
    }
  };
}
function e08(e09, e1e = null) {
  const e1t = rd;
  const e1r = rw;
  const e1n = Math.max(4096, e1r << 3);
  let e1i = e1e;
  let e1o = new Uint8Array(e1t);
  let e1s = 0;
  let e1a = null;
  let e1c = false;
  let e1l = 0;
  let e1d = 0;
  let e1w = 0;
  let e1f = null;
  const e1h = async e1p => {
    if (e09.readyState !== WebSocket.OPEN) throw new Error(e5("d3MucmVhZHlTdGF0ZSBpcyBub3Qgb3Blbg=="));
    await eb0(e09, e1p);
  };
  const e1g = e1m => {
    if (!e1i) return e1m;
    const e1y = new Uint8Array(e1i.length + e1m.byteLength);
    e1y.set(e1i, 0);
    e1y.set(e1m, e1i.length);
    e1i = null;
    return e1y;
  };
  const e1x = async () => {
    while (e1f) await e1f;
    if (e1a) clearTimeout(e1a);
    e1a = null;
    e1c = false;
    if (!e1s) return;
    const e1v = e1o.subarray(0, e1s).slice();
    e1o = new Uint8Array(e1t);
    e1s = 0;
    e1w = 0;
    e1f = e1h(e1v).finally(() => {
      e1f = null;
    });
    return e1f;
  };
  const e1b = () => {
    if (e1a || e1c) return;
    e1c = true;
    e1d = e1l;
    queueMicrotask(() => {
      e1c = false;
      if (!e1s || e1a) return;
      if (e1t - e1s < e1r) {
        e1x().catch(() => ebp(e09));
        return;
      }
      e1a = setTimeout(() => {
        e1a = null;
        if (!e1s) return;
        if (e1t - e1s < e1r) {
          e1x().catch(() => ebp(e09));
          return;
        }
        if (e1w < 2 && (e1l !== e1d || e1s < e1n)) {
          e1w++;
          e1d = e1l;
          e1b();
          return;
        }
        e1x().catch(() => ebp(e09));
      }, Math.max(rf, 1));
    });
  };
  return {
    async 直接发送(e1k) {
      let e10 = eh5(e1k);
      if (!e10.byteLength) return;
      e10 = e1g(e10);
      await e1h(e10);
    },
    async 发送(e11) {
      let e12 = eh5(e11);
      if (!e12.byteLength) return;
      e12 = e1g(e12);
      let e13 = 0;
      const e14 = e12.byteLength;
      while (e13 < e14) {
        if (!e1s && e14 - e13 >= e1t) {
          const e15 = Math.min(e1t, e14 - e13);
          const e16 = e13 || e15 !== e14 ? e12.subarray(e13, e13 + e15) : e12;
          await e1h(e16);
          e13 += e15;
          continue;
        }
        const e17 = Math.min(e1t - e1s, e14 - e13);
        e1o.set(e12.subarray(e13, e13 + e17), e1s);
        e1s += e17;
        e13 += e17;
        e1l++;
        if (e1s === e1t || e1t - e1s < e1r) await e1x(); else e1b();
      }
    },
    flush: e1x
  };
}
async function e18(e19, e2e, e2t, e2r, e2n = null) {
  let e2i = e2t, e2o = false, e2s, e2a = false;
  const e2c = 64 * 1024;
  const e2l = e08(e2e, e2i);
  const e2d = e2n ? a8('down') : null;
  e2i = null;
  try {
    e2s = e19.readable.getReader({
      mode: 'byob'
    });
    e2a = true;
  } catch (e2w) {
    e2s = e19.readable.getReader();
  }
  try {
    if (!e2a) {
      while (true) {
        const {done: e2f, value: e2h} = await e2s.read();
        if (e2f) break;
        if (!e2h || e2h.byteLength === 0) continue;
        e2o = true;
        if (e2n) e2n.down += e2h.byteLength;
        if (e2d && e2d.enabled) await e2d.take(e2h.byteLength);
        await e2l.发送(e2h);
      }
    } else {
      let e2p = new ArrayBuffer(e2c);
      while (true) {
        const {done: e2g, value: e2m} = await e2s.read(new Uint8Array(e2p, 0, e2c));
        if (e2g) break;
        if (!e2m || e2m.byteLength === 0) continue;
        e2o = true;
        if (e2n) e2n.down += e2m.byteLength;
        if (e2m.byteLength >= rd) {
          await e2l.flush();
          if (e2d && e2d.enabled) await e2d.take(e2m.byteLength);
          await e2l.直接发送(e2m);
          e2p = new ArrayBuffer(e2c);
        } else {
          if (e2d && e2d.enabled) await e2d.take(e2m.byteLength);
          await e2l.发送(e2m);
          e2p = e2m.buffer.byteLength >= e2c ? e2m.buffer : new ArrayBuffer(e2c);
        }
      }
    }
    await e2l.flush();
  } catch (e2y) {
    ebp(e2e);
  } finally {
    try {
      e2s.cancel();
    } catch (e2x) {}
    try {
      e2s.releaseLock();
    } catch (e2v) {}
  }
  if (!e2o && e2r) await e2r();
}
function e2b(e2k) {
  const e20 = [atob('c3BlZWQuY2xvdWRmbGFyZS5jb20=')];
  if (e20.includes(e2k)) {
    return true;
  }
  for (const e21 of e20) {
    if (e2k.endsWith('.' + e21) || e2k === e21) {
      return true;
    }
  }
  return false;
}
async function e22(e23, e24, e25, e26) {
  const {username: e27, password: e28, hostname: e29, port: e3e} = tr;
  const e3t = e26({
    hostname: e29,
    port: e3e
  }), e3r = e3t.writable.getWriter(), e3n = e3t.readable.getReader();
  try {
    const e3i = e27 && e28 ? new Uint8Array([0x05, 0x02, 0x00, 0x02]) : new Uint8Array([0x05, 0x01, 0x00]);
    await e3r.write(e3i);
    let e3o = await e3n.read();
    if (e3o.done || e3o.value.byteLength < 2) throw new Error('S5 method selection failed');
    const e3s = new Uint8Array(e3o.value)[1];
    if (e3s === 0x02) {
      if (!e27 || !e28) throw new Error('S5 requires authentication');
      const e3a = new TextEncoder().encode(e27), e3c = new TextEncoder().encode(e28);
      const e3l = new Uint8Array([0x01, e3a.length, ...e3a, e3c.length, ...e3c]);
      await e3r.write(e3l);
      e3o = await e3n.read();
      if (e3o.done || new Uint8Array(e3o.value)[1] !== 0x00) throw new Error('S5 authentication failed');
    } else if (e3s !== 0x00) throw new Error(`S5 unsupported auth method: ${e3s}`);
    const e3d = new TextEncoder().encode(e23);
    const e3w = new Uint8Array([0x05, 0x01, 0x00, 0x03, e3d.length, ...e3d, e24 >> 8, e24 & 0xff]);
    await e3r.write(e3w);
    e3o = await e3n.read();
    if (e3o.done || new Uint8Array(e3o.value)[1] !== 0x00) throw new Error('S5 connection failed');
    if (ern(e25) > 0) await e3r.write(e25);
    e3r.releaseLock();
    e3n.releaseLock();
    return e3t;
  } catch (e3f) {
    try {
      e3r.releaseLock();
    } catch (e3h) {}
    try {
      e3n.releaseLock();
    } catch (e3p) {}
    try {
      e3t.close();
    } catch (e3g) {}
    throw e3f;
  }
}
async function e3m(e3y, e3x, e3v, e3b = false, e3k) {
  const {username: e30, password: e31, hostname: e32, port: e33} = tr;
  const e34 = e3b ? e3k({
    hostname: e32,
    port: e33
  }, {
    secureTransport: 'on',
    allowHalfOpen: false
  }) : e3k({
    hostname: e32,
    port: e33
  });
  const e35 = e34.writable.getWriter(), e36 = e34.readable.getReader();
  const e37 = new TextEncoder();
  const e38 = new TextDecoder();
  try {
    if (e3b) await e34.opened;
    const e39 = e30 && e31 ? `Proxy-Authorization: Basic ${btoa(`${e30}:${e31}`)}\r\n` : '';
    const e4e = `CONNECT ${e3y}:${e3x} HTTP/1.1\r\nHost: ${e3y}:${e3x}\r\n${e39}User-Agent: Mozilla/5.0\r\nConnection: keep-alive\r\n\r\n`;
    await e35.write(e37.encode(e4e));
    e35.releaseLock();
    let e4t = new Uint8Array(0), e4r = -1, e4n = 0;
    while (e4r === -1 && e4n < 8192) {
      const {done: e4i, value: e4o} = await e36.read();
      if (e4i || !e4o) throw new Error(`${e3b ? 'HTTPS' : 'HTTP'} 代理在返回 CONNECT 响应前关闭连接`);
      e4t = new Uint8Array([...e4t, ...e4o]);
      e4n = e4t.length;
      const e4s = e4t.findIndex((e4a, e4c) => e4c < e4t.length - 3 && e4t[e4c] === 0x0d && e4t[e4c + 1] === 0x0a && e4t[e4c + 2] === 0x0d && e4t[e4c + 3] === 0x0a);
      if (e4s !== -1) e4r = e4s + 4;
    }
    if (e4r === -1) throw new Error('代理 CONNECT 响应头过长或无效');
    const e4l = e38.decode(e4t.slice(0, e4r)).split('\r\n')[0].match(/HTTP\/\d\.\d\s+(\d+)/);
    const e4d = e4l ? parseInt(e4l[1], 10) : NaN;
    if (!Number.isFinite(e4d) || e4d < 200 || e4d >= 300) throw new Error(`Connection failed: HTTP ${e4d}`);
    e36.releaseLock();
    if (ern(e3v) > 0) {
      const e4w = e34.writable.getWriter();
      await e4w.write(e3v);
      e4w.releaseLock();
    }
    if (e4n > e4r) {
      const {readable: e4f, writable: e4h} = new TransformStream();
      const e4p = e4h.getWriter();
      await e4p.write(e4t.subarray(e4r, e4n));
      e4p.releaseLock();
      e34.readable.pipeTo(e4h).catch(() => {});
      return {
        readable: e4f,
        writable: e34.writable,
        closed: e34.closed,
        close: () => e34.close()
      };
    }
    return e34;
  } catch (e4g) {
    try {
      e35.releaseLock();
    } catch (e4m) {}
    try {
      e36.releaseLock();
    } catch (e4y) {}
    try {
      e34.close();
    } catch (e4x) {}
    throw e4g;
  }
}
async function e4v(e4b, e4k, e40, e41) {
  const {username: e42, password: e43, hostname: e44, port: e45} = tr;
  const e46 = new TextEncoder();
  const e47 = new TextDecoder();
  let e48 = null;
  const e49 = tdv(e44) ? '' : tdm(e44);
  const e5e = async (e5t = false) => {
    const e5r = e41({
      hostname: e44,
      port: e45
    });
    try {
      await e5r.opened;
      const e5n = new tsc(e5r, {
        serverName: e49,
        insecure: true,
        allowChacha: e5t
      });
      await e5n.handshake();
      tbv(`[HTTPS代理] TLS版本: ${e5n.isTls13 ? '1.3' : '1.2'} | Cipher: 0x${e5n.cipherSuite.toString(16)}${e5n.cipherConfig?.chacha ? ' (ChaCha20)' : ' (AES-GCM)'}`);
      return e5n;
    } catch (e5i) {
      try {
        e5r.close();
      } catch (e5o) {}
      throw e5i;
    }
  };
  try {
    try {
      e48 = await e5e(false);
    } catch (e5s) {
      if (!(/cipher|handshake|TLS Alert|ServerHello|Finished|Unsupported|Missing TLS/i).test(e5s?.message || `${e5s || ''}`)) throw e5s;
      tbv(`[HTTPS代理] AES-GCM TLS 握手失败，回退 ChaCha20 兼容模式: ${e5s?.message || e5s}`);
      e48 = await e5e(true);
    }
    const e5a = e42 && e43 ? `Proxy-Authorization: Basic ${btoa(`${e42}:${e43}`)}\r\n` : '';
    const e5c = `CONNECT ${e4b}:${e4k} HTTP/1.1\r\nHost: ${e4b}:${e4k}\r\n${e5a}User-Agent: Mozilla/5.0\r\nConnection: keep-alive\r\n\r\n`;
    await e48.write(e46.encode(e5c));
    let e5l = new Uint8Array(0), e5d = -1, e5w = 0;
    while (e5d === -1 && e5w < 8192) {
      const e5f = await e48.read();
      if (!e5f) throw new Error('HTTPS 代理在返回 CONNECT 响应前关闭连接');
      e5l = eh7(e5l, e5f);
      e5w = e5l.length;
      const e5h = e5l.findIndex((e5p, e5g) => e5g < e5l.length - 3 && e5l[e5g] === 0x0d && e5l[e5g + 1] === 0x0a && e5l[e5g + 2] === 0x0d && e5l[e5g + 3] === 0x0a);
      if (e5h !== -1) e5d = e5h + 4;
    }
    if (e5d === -1) throw new Error(e5("SFRUUFMg5Luj55CGIENPTk5FQ1Qg5ZON5bqU5aS06L+H6ZW/5oiW5peg5pWI"));
    const e5m = e47.decode(e5l.slice(0, e5d)).split('\r\n')[0].match(/HTTP\/\d\.\d\s+(\d+)/);
    const e5y = e5m ? parseInt(e5m[1], 10) : NaN;
    if (!Number.isFinite(e5y) || e5y < 200 || e5y >= 300) throw new Error(`Connection failed: HTTP ${e5y}`);
    if (ern(e40) > 0) await e48.write(eh5(e40));
    const e5x = e5w > e5d ? e5l.subarray(e5d, e5w) : null;
    let e5v = false, e5b, e5k;
    const e50 = (e51, e52) => {
      if (!e5v) {
        e5v = true;
        e51(e52);
      }
    };
    const e53 = new Promise((e54, e55) => {
      e5b = e54;
      e5k = e55;
    });
    const e56 = () => {
      try {
        e48.close();
      } catch (e57) {}
      e50(e5b);
    };
    const e58 = new ReadableStream({
      async start(e59) {
        try {
          if (ern(e5x) > 0) e59.enqueue(e5x);
          while (true) {
            const e6e = await e48.read();
            if (!e6e) break;
            if (e6e.byteLength > 0) e59.enqueue(e6e);
          }
          try {
            e59.close();
          } catch (e6t) {}
          e50(e5b);
        } catch (e6r) {
          try {
            e59.error(e6r);
          } catch (e6n) {}
          e50(e5k, e6r);
        }
      },
      cancel() {
        e56();
      }
    });
    const e6i = new WritableStream({
      async write(e6o) {
        await e48.write(eh5(e6o));
      },
      close: e56,
      abort(e6s) {
        e56();
        if (e6s) e50(e5k, e6s);
      }
    });
    return {
      readable: e58,
      writable: e6i,
      closed: e53,
      close: e56
    };
  } catch (e6a) {
    try {
      e48?.close();
    } catch (e6c) {}
    throw e6a;
  }
}
function e6l(e6d) {
  const e6w = e6d;
  const e6f = e6w?.fetcher;
  if (!e6f || typeof e6f.connect !== 'function') throw new Error('request.fetcher.connect unavailable');
  return (e6h, e6p) => e6p === undefined ? e6f.connect(e6h) : e6f.connect(e6h, e6p);
}
const e6g = 769, e6m = 771, e6y = 772;
const e6x = 20, e6v = 21, e6b = 22, e6k = 23;
const e60 = 1, e61 = 2, e62 = 4, e63 = 8, e64 = 11, e65 = 12, e66 = 13, e67 = 14, e68 = 15, e69 = 16, e7e = 20, e7t = 24;
const e7r = 0, e7n = 10, e7i = 11, e7o = 13, e7s = 16, e7a = 43, e7c = 45, e7l = 51;
const e7d = 0, e7w = 1, e7f = 112;
const e7h = e7p => e7p?.[0] === e7w && e7p?.[1] === e7f;
const e7g = new TextEncoder();
const e7m = new TextDecoder();
const e7y = new Uint8Array(0);
const e7x = new Map([[4865, {
  id: 4865,
  keyLen: 16,
  ivLen: 12,
  hash: "SHA-256",
  tls13: !0
}], [4866, {
  id: 4866,
  keyLen: 32,
  ivLen: 12,
  hash: "SHA-384",
  tls13: !0
}], [4867, {
  id: 4867,
  keyLen: 32,
  ivLen: 12,
  hash: "SHA-256",
  tls13: !0,
  chacha: !0
}], [49199, {
  id: 49199,
  keyLen: 16,
  ivLen: 4,
  hash: "SHA-256",
  kex: "ECDHE"
}], [49200, {
  id: 49200,
  keyLen: 32,
  ivLen: 4,
  hash: "SHA-384",
  kex: "ECDHE"
}], [52392, {
  id: 52392,
  keyLen: 32,
  ivLen: 12,
  hash: "SHA-256",
  kex: "ECDHE",
  chacha: !0
}], [49195, {
  id: 49195,
  keyLen: 16,
  ivLen: 4,
  hash: "SHA-256",
  kex: "ECDHE"
}], [49196, {
  id: 49196,
  keyLen: 32,
  ivLen: 4,
  hash: "SHA-384",
  kex: "ECDHE"
}], [52393, {
  id: 52393,
  keyLen: 32,
  ivLen: 12,
  hash: "SHA-256",
  kex: "ECDHE",
  chacha: !0
}]]);
const e7v = new Map([[29, "X25519"], [23, "P-256"]]);
const e7b = [2052, 2053, 2054, 1025, 1281, 1537, 1027, 1283, 1539];
const e7k = (...e70) => {
  const e71 = e72 => e72.flatMap(e73 => e73 instanceof Uint8Array ? [...e73] : Array.isArray(e73) ? e71(e73) : "number" == typeof e73 ? [e73] : []);
  return new Uint8Array(e71(e70));
};
const e74 = e75 => [e75 >> 8 & 255, 255 & e75];
const e76 = (e77, e78) => e77[e78] << 8 | e77[e78 + 1];
const e79 = (e8e, e8t) => e8e[e8t] << 16 | e8e[e8t + 1] << 8 | e8e[e8t + 2];
const e8r = (...e8n) => {
  const e8i = e8n.filter(e8o => e8o && e8o.length > 0), e8s = e8i.reduce((e8a, e8c) => e8a + e8c.length, 0), e8l = new Uint8Array(e8s);
  let e8d = 0;
  for (const e8w of e8i) (e8l.set(e8w, e8d), e8d += e8w.length);
  return e8l;
};
const e8f = e8h => crypto.getRandomValues(new Uint8Array(e8h));
const e8p = (e8g, e8m) => {
  if (!e8g || !e8m || e8g.length !== e8m.length) return !1;
  let e8y = 0;
  for (let e8x = 0; e8x < e8g.length; e8x++) e8y |= e8g[e8x] ^ e8m[e8x];
  return 0 === e8y;
};
const e8v = e8b => "SHA-512" === e8b ? 64 : "SHA-384" === e8b ? 48 : 32;
async function e8k(e80, e81, e82) {
  const e83 = await crypto.subtle.importKey("raw", e81, {
    name: "HMAC",
    hash: e80
  }, !1, ["sign"]);
  return new Uint8Array(await crypto.subtle.sign("HMAC", e83, e82));
}
async function e84(e85, e86) {
  return new Uint8Array(await crypto.subtle.digest(e85, e86));
}
async function e87(e88, e89, e9e, e9t, e9r = "SHA-256") {
  const e9n = e8r(e7g.encode(e89), e9e);
  let e9i = new Uint8Array(0), e9o = e9n;
  for (; e9i.length < e9t; ) {
    e9o = await e8k(e9r, e88, e9o);
    const e9s = await e8k(e9r, e88, e8r(e9o, e9n));
    e9i = e8r(e9i, e9s);
  }
  return e9i.slice(0, e9t);
}
async function e9a(e9c, e9l, e9d) {
  return (e9l && e9l.length || (e9l = new Uint8Array(e8v(e9c))), e8k(e9c, e9l, e9d));
}
async function e9w(e9f, e9h, e9p, context, e9g) {
  const e9m = e7g.encode("tls13 " + e9p);
  return (async function (e9y, e9x, e9v, e9b) {
    const e9k = e8v(e9y), e90 = Math.ceil(e9b / e9k);
    let e91 = new Uint8Array(0), e92 = new Uint8Array(0);
    for (let e93 = 1; e93 <= e90; e93++) (e92 = await e8k(e9y, e9x, e8r(e92, e9v, [e93])), e91 = e8r(e91, e92));
    return e91.slice(0, e9b);
  })(e9f, e9h, e7k(e74(e9g), e9m.length, e9m, context.length, context), e9g);
}
async function e94(e95 = "P-256") {
  const e96 = "X25519" === e95 ? {
    name: "X25519"
  } : {
    name: "ECDH",
    namedCurve: e95
  };
  const e97 = await crypto.subtle.generateKey(e96, !0, ["deriveBits"]);
  const e98 = await crypto.subtle.exportKey("raw", e97.publicKey);
  return {
    keyPair: e97,
    publicKeyRaw: new Uint8Array(e98)
  };
}
async function e99(tee, tet, ter = "P-256") {
  const ten = "X25519" === ter ? {
    name: "X25519"
  } : {
    name: "ECDH",
    namedCurve: ter
  }, tei = await crypto.subtle.importKey("raw", tet, ten, !1, []), teo = "P-384" === ter ? 384 : "P-521" === ter ? 528 : 256;
  return new Uint8Array(await crypto.subtle.deriveBits({
    name: ten.name,
    public: tei
  }, tee, teo));
}
async function tes(tea, tec) {
  return crypto.subtle.importKey("raw", tea, {
    name: "AES-GCM"
  }, !1, tec);
}
async function tel(ted, tew, tef, teh) {
  return new Uint8Array(await crypto.subtle.encrypt({
    name: "AES-GCM",
    iv: tew,
    additionalData: teh,
    tagLength: 128
  }, ted, tef));
}
async function tep(teg, tem, tey, tex) {
  return new Uint8Array(await crypto.subtle.decrypt({
    name: "AES-GCM",
    iv: tem,
    additionalData: tex,
    tagLength: 128
  }, teg, tey));
}
function tev(teb, tek) {
  return (teb << tek | teb >>> 32 - tek) >>> 0;
}
function te0(te1, te2, te3, te4, te5) {
  (te1[te2] = te1[te2] + te1[te3] >>> 0, te1[te5] = tev(te1[te5] ^ te1[te2], 16), te1[te4] = te1[te4] + te1[te5] >>> 0, te1[te3] = tev(te1[te3] ^ te1[te4], 12), te1[te2] = te1[te2] + te1[te3] >>> 0, te1[te5] = tev(te1[te5] ^ te1[te2], 8), te1[te4] = te1[te4] + te1[te5] >>> 0, te1[te3] = tev(te1[te3] ^ te1[te4], 7));
}
function te6(te7, te8, te9) {
  const tte = new Uint32Array(16);
  (tte[0] = 1634760805, tte[1] = 857760878, tte[2] = 2036477234, tte[3] = 1797285236);
  const ttt = new DataView(te7.buffer, te7.byteOffset, te7.byteLength);
  for (let ttr = 0; ttr < 8; ttr++) tte[4 + ttr] = ttt.getUint32(4 * ttr, !0);
  tte[12] = te8;
  const ttn = new DataView(te9.buffer, te9.byteOffset, te9.byteLength);
  (tte[13] = ttn.getUint32(0, !0), tte[14] = ttn.getUint32(4, !0), tte[15] = ttn.getUint32(8, !0));
  const tti = new Uint32Array(tte);
  for (let tto = 0; tto < 10; tto++) (te0(tti, 0, 4, 8, 12), te0(tti, 1, 5, 9, 13), te0(tti, 2, 6, 10, 14), te0(tti, 3, 7, 11, 15), te0(tti, 0, 5, 10, 15), te0(tti, 1, 6, 11, 12), te0(tti, 2, 7, 8, 13), te0(tti, 3, 4, 9, 14));
  for (let tts = 0; tts < 16; tts++) tti[tts] = tti[tts] + tte[tts] >>> 0;
  return new Uint8Array(tti.buffer.slice(0));
}
function tta(ttc, ttl, ttd) {
  const ttw = new Uint8Array(ttd.length);
  let ttf = 1;
  for (let tth = 0; tth < ttd.length; tth += 64) {
    const ttp = te6(ttc, ttf++, ttl), ttg = Math.min(64, ttd.length - tth);
    for (let ttm = 0; ttm < ttg; ttm++) ttw[tth + ttm] = ttd[tth + ttm] ^ ttp[ttm];
  }
  return ttw;
}
function tty(ttx, ttv) {
  const ttb = (function (ttk) {
    const tt0 = new Uint8Array(ttk);
    return (tt0[3] &= 15, tt0[7] &= 15, tt0[11] &= 15, tt0[15] &= 15, tt0[4] &= 252, tt0[8] &= 252, tt0[12] &= 252, tt0);
  })(ttx.slice(0, 16)), tt1 = ttx.slice(16, 32);
  let tt2 = [0n, 0n, 0n, 0n, 0n];
  const tt3 = [0x3ffffffn & BigInt(ttb[0] | ttb[1] << 8 | ttb[2] << 16 | ttb[3] << 24), 0x3ffffffn & BigInt(ttb[3] >> 2 | ttb[4] << 6 | ttb[5] << 14 | ttb[6] << 22), 0x3ffffffn & BigInt(ttb[6] >> 4 | ttb[7] << 4 | ttb[8] << 12 | ttb[9] << 20), 0x3ffffffn & BigInt(ttb[9] >> 6 | ttb[10] << 2 | ttb[11] << 10 | ttb[12] << 18), 0x3ffffffn & BigInt(ttb[13] | ttb[14] << 8 | ttb[15] << 16)];
  for (let tt4 = 0; tt4 < ttv.length; tt4 += 16) {
    const tt5 = ttv.slice(tt4, tt4 + 16), tt6 = new Uint8Array(17);
    (tt6.set(tt5), tt6[tt5.length] = 1, tt2[0] += BigInt(tt6[0] | tt6[1] << 8 | tt6[2] << 16 | (3 & tt6[3]) << 24), tt2[1] += BigInt(tt6[3] >> 2 | tt6[4] << 6 | tt6[5] << 14 | (15 & tt6[6]) << 22), tt2[2] += BigInt(tt6[6] >> 4 | tt6[7] << 4 | tt6[8] << 12 | (63 & tt6[9]) << 20), tt2[3] += BigInt(tt6[9] >> 6 | tt6[10] << 2 | tt6[11] << 10 | tt6[12] << 18), tt2[4] += BigInt(tt6[13] | tt6[14] << 8 | tt6[15] << 16 | tt6[16] << 24));
    const tt7 = [0n, 0n, 0n, 0n, 0n];
    for (let tt8 = 0; tt8 < 5; tt8++) for (let tt9 = 0; tt9 < 5; tt9++) {
      const tre = tt8 + tt9;
      tre < 5 ? tt7[tre] += tt2[tt8] * tt3[tt9] : tt7[tre - 5] += tt2[tt8] * tt3[tt9] * 5n;
    }
    let trt = 0n;
    for (let trr = 0; trr < 5; trr++) (tt7[trr] += trt, tt2[trr] = 0x3ffffffn & tt7[trr], trt = tt7[trr] >> 26n);
    (tt2[0] += 5n * trt, trt = tt2[0] >> 26n, tt2[0] &= 0x3ffffffn, tt2[1] += trt);
  }
  let trn = tt2[0] | tt2[1] << 26n | tt2[2] << 52n | tt2[3] << 78n | tt2[4] << 104n;
  trn = trn + tt1.reduce((tri, tro, trs) => tri + (BigInt(tro) << BigInt(8 * trs)), 0n) & (1n << 128n) - 1n;
  const tra = new Uint8Array(16);
  for (let trc = 0; trc < 16; trc++) tra[trc] = Number(trn >> BigInt(8 * trc) & 0xffn);
  return tra;
}
function trl(trd, trw, trf, trh) {
  const trp = te6(trd, 0, trw).slice(0, 32), trg = tta(trd, trw, trf), trm = (16 - trh.length % 16) % 16, trx = (16 - trg.length % 16) % 16, trv = new Uint8Array(trh.length + trm + trg.length + trx + 16);
  (trv.set(trh, 0), trv.set(trg, trh.length + trm));
  const trb = new DataView(trv.buffer, trh.length + trm + trg.length + trx);
  (trb.setBigUint64(0, BigInt(trh.length), !0), trb.setBigUint64(8, BigInt(trg.length), !0));
  const trk = tty(trp, trv);
  return e8r(trg, trk);
}
function tr0(tr1, tr2, tr3, tr4) {
  if (tr3.length < 16) throw new Error("Ciphertext too short");
  const tr5 = tr3.slice(-16), tr6 = tr3.slice(0, -16), tr7 = te6(tr1, 0, tr2).slice(0, 32), tr8 = (16 - tr4.length % 16) % 16, tr9 = (16 - tr6.length % 16) % 16, tne = new Uint8Array(tr4.length + tr8 + tr6.length + tr9 + 16);
  (tne.set(tr4, 0), tne.set(tr6, tr4.length + tr8));
  const tnt = new DataView(tne.buffer, tr4.length + tr8 + tr6.length + tr9);
  (tnt.setBigUint64(0, BigInt(tr4.length), !0), tnt.setBigUint64(8, BigInt(tr6.length), !0));
  const tnr = tty(tr7, tne);
  let tnn = 0;
  for (let tni = 0; tni < 16; tni++) tnn |= tr5[tni] ^ tnr[tni];
  if (0 !== tnn) throw new Error(e5("Q2hhQ2hhMjAtUG9seTEzMDUgYXV0aGVudGljYXRpb24gZmFpbGVk"));
  return tta(tr1, tr2, tr6);
}
const tno = 16 * 1024;
function tns(tna, tnc, tnl = e6m) {
  const tnd = eh5(tnc);
  const tnw = new Uint8Array(5 + tnd.byteLength);
  tnw[0] = tna;
  tnw[1] = tnl >> 8 & 255;
  tnw[2] = tnl & 255;
  tnw[3] = tnd.byteLength >> 8 & 255;
  tnw[4] = tnd.byteLength & 255;
  tnw.set(tnd, 5);
  return tnw;
}
function tnf(tnh, tnp) {
  return e7k(tnh, (tng => [tng >> 16 & 255, tng >> 8 & 255, 255 & tng])(tnp.length), tnp);
}
class tnm {
  constructor() {
    this.buffer = new Uint8Array(0);
  }
  feed(tny) {
    const tnx = eh5(tny);
    this.buffer = this.buffer.length ? e8r(this.buffer, tnx) : tnx;
  }
  next() {
    if (this.buffer.length < 5) return null;
    const tnv = this.buffer[0], tnb = e76(this.buffer, 1), tnk = e76(this.buffer, 3);
    if (this.buffer.length < 5 + tnk) return null;
    const tn0 = this.buffer.subarray(5, 5 + tnk);
    return (this.buffer = this.buffer.subarray(5 + tnk), {
      type: tnv,
      version: tnb,
      length: tnk,
      fragment: tn0
    });
  }
}
class tn1 {
  constructor() {
    this.buffer = new Uint8Array(0);
  }
  feed(tn2) {
    const tn3 = eh5(tn2);
    this.buffer = this.buffer.length ? e8r(this.buffer, tn3) : tn3;
  }
  next() {
    if (this.buffer.length < 4) return null;
    const tn4 = this.buffer[0], tn5 = e79(this.buffer, 1);
    if (this.buffer.length < 4 + tn5) return null;
    const tn6 = this.buffer.subarray(4, 4 + tn5), tn7 = this.buffer.subarray(0, 4 + tn5);
    return (this.buffer = this.buffer.subarray(4 + tn5), {
      type: tn4,
      length: tn5,
      body: tn6,
      raw: tn7
    });
  }
}
function tn8(tn9) {
  let tie = 0;
  const tit = e76(tn9, tie);
  tie += 2;
  const tir = tn9.slice(tie, tie + 32);
  tie += 32;
  const tin = tn9[tie++], tii = tn9.slice(tie, tie + tin);
  tie += tin;
  const tio = e76(tn9, tie);
  tie += 2;
  const tis = tn9[tie++];
  let tia = tit, tic = null, til = null;
  if (tie < tn9.length) {
    const tid = e76(tn9, tie);
    tie += 2;
    const tiw = tie + tid;
    for (; tie + 4 <= tiw; ) {
      const tif = e76(tn9, tie);
      tie += 2;
      const tih = e76(tn9, tie);
      tie += 2;
      const tip = tn9.slice(tie, tie + tih);
      if ((tie += tih, tif === e7a && tih >= 2)) tia = e76(tip, 0); else if (tif === e7l && tih >= 4) {
        const tig = e76(tip, 0), tim = e76(tip, 2);
        tic = {
          group: tig,
          key: tip.slice(4, 4 + tim)
        };
      } else tif === e7s && tih >= 3 && (til = e7m.decode(tip.slice(3, 3 + tip[2])));
    }
  }
  const tiy = new Uint8Array([207, 33, 173, 116, 229, 154, 97, 17, 190, 29, 140, 2, 30, 101, 184, 145, 194, 162, 17, 22, 122, 187, 140, 94, 7, 158, 9, 226, 200, 168, 51, 156]);
  return {
    version: tit,
    serverRandom: tir,
    sessionId: tii,
    cipherSuite: tio,
    compression: tis,
    selectedVersion: tia,
    keyShare: tic,
    alpn: til,
    isHRR: e8p(tir, tiy),
    isTls13: tia === e6y
  };
}
function tix(tiv) {
  let tib = 1;
  const tik = e76(tiv, tib);
  tib += 2;
  const ti0 = tiv[tib++];
  return {
    namedCurve: tik,
    serverPublicKey: tiv.slice(tib, tib + ti0)
  };
}
function ti1(ti2, ti3 = 0) {
  let ti4 = 0;
  if (ti3) {
    const ti5 = ti2[ti4++];
    ti4 += ti5;
  }
  if (ti4 + 3 > ti2.length) return null;
  const ti6 = e79(ti2, ti4);
  if ((ti4 += 3, !ti6 || ti4 + 3 > ti2.length)) return null;
  const ti7 = e79(ti2, ti4);
  return (ti4 += 3, ti7 ? ti2.slice(ti4, ti4 + ti7) : null);
}
function ti8(ti9) {
  const toe = {
    alpn: null
  };
  let tot = 2;
  const tor = 2 + e76(ti9, 0);
  for (; tot + 4 <= tor; ) {
    const ton = e76(ti9, tot);
    tot += 2;
    const toi = e76(ti9, tot);
    if ((tot += 2, ton === e7s && toi >= 3)) {
      const too = ti9[tot + 2];
      too > 0 && tot + 3 + too <= tot + toi && (toe.alpn = e7m.decode(ti9.slice(tot + 3, tot + 3 + too)));
    }
    tot += toi;
  }
  return toe;
}
function tos(toa, toc, tol, {tls13: tod = !0, tls12: tow = !0, alpn: tof = null, chacha: toh = !0} = {}) {
  const top = [];
  (tod && top.push(4865, 4866, ...toh ? [4867] : []), tow && top.push(49199, 49200, 49195, 49196, ...toh ? [52392, 52393] : []));
  const tog = e7k(...top.flatMap(e74)), tom = [e7k(255, 1, 0, 1, 0)];
  if (toc) {
    const toy = e7g.encode(toc), tox = e7k(0, e74(toy.length), toy);
    tom.push(e7k(e74(e7r), e74(tox.length + 2), e74(tox.length), tox));
  }
  (tom.push(e7k(e74(e7i), 0, 2, 1, 0)), tom.push(e7k(e74(e7n), 0, 6, 0, 4, 0, 29, 0, 23)));
  const tov = e7k(...e7b.flatMap(e74));
  tom.push(e7k(e74(e7o), e74(tov.length + 2), e74(tov.length), tov));
  const tob = Array.isArray(tof) ? tof.filter(Boolean) : tof ? [tof] : [];
  if (tob.length) {
    const tok = e8r(...tob.map(to0 => {
      const to1 = e7g.encode(to0);
      return e7k(to1.length, to1);
    }));
    tom.push(e7k(e74(e7s), e74(tok.length + 2), e74(tok.length), tok));
  }
  if (tod && tol) {
    let to2;
    if ((tom.push(tow ? e7k(e74(e7a), 0, 5, 4, 3, 4, 3, 3) : e7k(e74(e7a), 0, 3, 2, 3, 4)), tom.push(e7k(e74(e7c), 0, 2, 1, 1)), tol?.x25519 && tol?.p256)) to2 = e8r(e7k(0, 29, e74(tol.x25519.length), tol.x25519), e7k(0, 23, e74(tol.p256.length), tol.p256)); else if (tol?.x25519) to2 = e7k(0, 29, e74(tol.x25519.length), tol.x25519); else if (tol?.p256) to2 = e7k(0, 23, e74(tol.p256.length), tol.p256); else {
      if (!(tol instanceof Uint8Array)) throw new Error("Invalid keyShares");
      to2 = e7k(0, 23, e74(tol.length), tol);
    }
    tom.push(e7k(e74(e7l), e74(to2.length + 2), e74(to2.length), to2));
  }
  const to3 = e8r(...tom);
  return tnf(e60, e7k(e74(e6m), toa, 0, e74(tog.length), tog, 1, 0, e74(to3.length), to3));
}
const to4 = to5 => {
  const to6 = new Uint8Array(8);
  return (new DataView(to6.buffer).setBigUint64(0, to5, !1), to6);
}, to7 = (to8, to9) => {
  const tse = to8.slice(), tst = to4(to9);
  for (let tsr = 0; tsr < 8; tsr++) tse[tse.length - 8 + tsr] ^= tst[tsr];
  return tse;
}, tsn = (tsi, tso, tss, tsa) => Promise.all([e9w(tsi, tso, "key", e7y, tss), e9w(tsi, tso, "iv", e7y, tsa)]);
class tsc {
  constructor(tsl, tsd = {}) {
    if ((this.socket = tsl, this.serverName = tsd.serverName || "", this.supportTls13 = !1 !== tsd.tls13, this.supportTls12 = !1 !== tsd.tls12, !this.supportTls13 && !this.supportTls12)) throw new Error(e5("QXQgbGVhc3Qgb25lIFRMUyB2ZXJzaW9uIG11c3QgYmUgZW5hYmxlZA=="));
    (this.alpnProtocols = Array.isArray(tsd.alpn) ? tsd.alpn : tsd.alpn ? [tsd.alpn] : null, this.allowChacha = tsd.allowChacha !== false, this.timeout = tsd.timeout ?? 3e4, this.clientRandom = e8f(32), this.serverRandom = null, this.handshakeChunks = [], this.handshakeComplete = !1, this.negotiatedAlpn = null, this.cipherSuite = null, this.cipherConfig = null, this.isTls13 = !1, this.masterSecret = null, this.handshakeSecret = null, this.clientWriteKey = null, this.serverWriteKey = null, this.clientWriteIv = null, this.serverWriteIv = null, this.clientHandshakeKey = null, this.serverHandshakeKey = null, this.clientHandshakeIv = null, this.serverHandshakeIv = null, this.clientAppKey = null, this.serverAppKey = null, this.clientAppIv = null, this.serverAppIv = null, this.clientWriteCryptoKey = null, this.serverWriteCryptoKey = null, this.clientHandshakeCryptoKey = null, this.serverHandshakeCryptoKey = null, this.clientAppCryptoKey = null, this.serverAppCryptoKey = null, this.clientSeqNum = 0n, this.serverSeqNum = 0n, this.recordParser = new tnm(), this.handshakeParser = new tn1(), this.keyPairs = new Map(), this.ecdhKeyPair = null, this.sawCert = !1);
  }
  recordHandshake(tsw) {
    this.handshakeChunks.push(tsw);
  }
  transcript() {
    return 1 === this.handshakeChunks.length ? this.handshakeChunks[0] : e8r(...this.handshakeChunks);
  }
  getCipherConfig(tsf) {
    return e7x.get(tsf) || null;
  }
  async readChunk(tsh) {
    return this.timeout ? Promise.race([tsh.read(), new Promise((tsp, tsg) => setTimeout(() => tsg(new Error("TLS read timeout")), this.timeout))]) : tsh.read();
  }
  async readRecordsUntil(tsm, tsy, tsx) {
    for (; ; ) {
      let tsv;
      for (; tsv = this.recordParser.next(); ) if (await tsy(tsv)) return;
      const {value: tsb, done: tsk} = await this.readChunk(tsm);
      if (tsk) throw new Error(tsx);
      this.recordParser.feed(tsb);
    }
  }
  async readHandshakeUntil(ts0, ts1, ts2) {
    for (let ts3; ts3 = this.handshakeParser.next(); ) if (await ts1(ts3)) return;
    return this.readRecordsUntil(ts0, async ts4 => {
      if (ts4.type === e6v) {
        if (e7h(ts4.fragment)) return;
        throw new Error(`TLS Alert: ${ts4.fragment[1]}`);
      }
      if (ts4.type === e6b) {
        this.handshakeParser.feed(ts4.fragment);
        for (let ts5; ts5 = this.handshakeParser.next(); ) if (await ts1(ts5)) return 1;
      }
    }, ts2);
  }
  async acceptCertificate(ts6) {
    if (!ts6?.length) throw new Error("Empty certificate");
    this.sawCert = !0;
  }
  async handshake() {
    const [ts7, ts8] = await Promise.all([e94("P-256"), e94("X25519")]);
    (this.keyPairs = new Map([[23, ts7], [29, ts8]]), this.ecdhKeyPair = ts7.keyPair);
    const ts9 = this.socket.readable.getReader(), tae = this.socket.writable.getWriter();
    try {
      const tat = tos(this.clientRandom, this.serverName, {
        x25519: ts8.publicKeyRaw,
        p256: ts7.publicKeyRaw
      }, {
        tls13: this.supportTls13,
        tls12: this.supportTls12,
        alpn: this.alpnProtocols,
        chacha: this.allowChacha
      });
      (this.recordHandshake(tat), await tae.write(tns(e6b, tat, e6g)));
      const tar = await this.receiveServerHello(ts9);
      if (tar.isHRR) throw new Error(e5("SGVsbG9SZXRyeVJlcXVlc3QgaXMgbm90IHN1cHBvcnRlZCBieSBUTFNDbGllbnRNaW5p"));
      if (tar.keyShare?.group && this.keyPairs.has(tar.keyShare.group)) {
        const tan = this.keyPairs.get(tar.keyShare.group);
        this.ecdhKeyPair = tan.keyPair;
      }
      (tar.isTls13 ? await this.handshakeTls13(ts9, tae, tar) : await this.handshakeTls12(ts9, tae), this.handshakeComplete = !0);
    } finally {
      (ts9.releaseLock(), tae.releaseLock());
    }
  }
  async receiveServerHello(tai) {
    for (; ; ) {
      const {value: tao, done: tas} = await this.readChunk(tai);
      if (tas) throw new Error("Connection closed waiting for ServerHello");
      let taa;
      for (this.recordParser.feed(tao); taa = this.recordParser.next(); ) {
        if (taa.type === e6v) {
          if (e7h(taa.fragment)) continue;
          throw new Error(`TLS Alert: level=${taa.fragment[0]}, desc=${taa.fragment[1]}`);
        }
        if (taa.type !== e6b) continue;
        let tac;
        for (this.handshakeParser.feed(taa.fragment); tac = this.handshakeParser.next(); ) {
          if (tac.type !== e61) continue;
          this.recordHandshake(tac.raw);
          const tal = tn8(tac.body);
          if ((this.serverRandom = tal.serverRandom, this.cipherSuite = tal.cipherSuite, this.cipherConfig = this.getCipherConfig(tal.cipherSuite), this.isTls13 = tal.isTls13, this.negotiatedAlpn = tal.alpn || null, !this.cipherConfig)) throw new Error(`Unsupported cipher suite: 0x${tal.cipherSuite.toString(16)}`);
          return tal;
        }
      }
    }
  }
  async handshakeTls12(tad, taw) {
    let taf = null;
    let tah = !1;
    if ((await this.readHandshakeUntil(tad, async tap => {
      switch (tap.type) {
        case e64:
          {
            this.recordHandshake(tap.raw);
            const tag = ti1(tap.body, 1);
            if (!tag) throw new Error("Missing TLS 1.2 certificate");
            await this.acceptCertificate(tag);
            break;
          }
        case e65:
          (this.recordHandshake(tap.raw), taf = tix(tap.body));
          break;
        case e67:
          return (this.recordHandshake(tap.raw), tah = !0, 1);
        case e66:
          throw new Error("Client certificate is not supported");
        default:
          this.recordHandshake(tap.raw);
      }
    }, "Connection closed during TLS 1.2 handshake"), !this.sawCert)) throw new Error(e5("TWlzc2luZyBUTFMgMS4yIGxlYWYgY2VydGlmaWNhdGU="));
    const tam = taf;
    if (!tam) throw new Error("Missing TLS 1.2 ServerKeyExchange");
    const tay = e7v.get(tam.namedCurve);
    if (!tay) throw new Error(`Unsupported named curve: 0x${tam.namedCurve.toString(16)}`);
    const tax = this.keyPairs.get(tam.namedCurve);
    if (!tax) throw new Error(`Missing key pair for curve: 0x${tam.namedCurve.toString(16)}`);
    const tav = await e99(tax.keyPair.privateKey, tam.serverPublicKey, tay), tab = tnf(e69, e7k(tax.publicKeyRaw.length, tax.publicKeyRaw));
    this.recordHandshake(tab);
    const tak = this.cipherConfig.hash;
    this.masterSecret = await e87(tav, "master secret", e8r(this.clientRandom, this.serverRandom), 48, tak);
    const ta0 = this.cipherConfig.keyLen, ta1 = this.cipherConfig.ivLen, ta2 = await e87(this.masterSecret, "key expansion", e8r(this.serverRandom, this.clientRandom), 2 * ta0 + 2 * ta1, tak);
    (this.clientWriteKey = ta2.slice(0, ta0), this.serverWriteKey = ta2.slice(ta0, 2 * ta0), this.clientWriteIv = ta2.slice(2 * ta0, 2 * ta0 + ta1), this.serverWriteIv = ta2.slice(2 * ta0 + ta1, 2 * ta0 + 2 * ta1));
    if (!this.cipherConfig.chacha) [this.clientWriteCryptoKey, this.serverWriteCryptoKey] = await Promise.all([tes(this.clientWriteKey, ["encrypt"]), tes(this.serverWriteKey, ["decrypt"])]);
    (await taw.write(tns(e6b, tab)), await taw.write(tns(e6x, e7k(1))));
    const ta3 = await e87(this.masterSecret, "client finished", await e84(tak, this.transcript()), 12, tak), ta4 = tnf(e7e, ta3);
    (this.recordHandshake(ta4), await taw.write(tns(e6b, await this.encryptTls12(ta4, e6b))));
    let ta5 = !1;
    await this.readRecordsUntil(tad, async ta6 => {
      if (ta6.type === e6v) {
        if (e7h(ta6.fragment)) return;
        throw new Error(`TLS Alert: ${ta6.fragment[1]}`);
      }
      if (ta6.type === e6x) return void (ta5 = !0);
      if (ta6.type !== e6b || !ta5) return;
      const ta7 = await this.decryptTls12(ta6.fragment, e6b);
      if (ta7[0] !== e7e) return;
      const ta8 = e79(ta7, 1), ta9 = ta7.slice(4, 4 + ta8), tce = await e87(this.masterSecret, "server finished", await e84(tak, this.transcript()), 12, tak);
      if (!e8p(ta9, tce)) throw new Error("TLS 1.2 server Finished verify failed");
      return 1;
    }, "Connection closed waiting for TLS 1.2 Finished");
  }
  async handshakeTls13(tct, tcr, tcn) {
    const tci = e7v.get(tcn.keyShare?.group);
    if (!tci || !tcn.keyShare?.key?.length) throw new Error("Missing TLS 1.3 key_share");
    const tco = this.cipherConfig.hash, tcs = e8v(tco), tca = this.cipherConfig.keyLen, tcc = this.cipherConfig.ivLen, tcl = await e99(this.ecdhKeyPair.privateKey, tcn.keyShare.key, tci), tcd = await e9a(tco, null, new Uint8Array(tcs)), tcw = await e9w(tco, tcd, "derived", await e84(tco, e7y), tcs);
    this.handshakeSecret = await e9a(tco, tcw, tcl);
    const tcf = await e84(tco, this.transcript()), tch = await e9w(tco, this.handshakeSecret, "c hs traffic", tcf, tcs), tcp = await e9w(tco, this.handshakeSecret, "s hs traffic", tcf, tcs);
    ([this.clientHandshakeKey, this.clientHandshakeIv] = await tsn(tco, tch, tca, tcc), [this.serverHandshakeKey, this.serverHandshakeIv] = await tsn(tco, tcp, tca, tcc));
    if (!this.cipherConfig.chacha) [this.clientHandshakeCryptoKey, this.serverHandshakeCryptoKey] = await Promise.all([tes(this.clientHandshakeKey, ["encrypt"]), tes(this.serverHandshakeKey, ["decrypt"])]);
    const tcg = await e9w(tco, tcp, "finished", e7y, tcs);
    let tcm = !1;
    const tcy = async tcx => {
      switch (tcx.type) {
        case e63:
          {
            const tcv = ti8(tcx.body);
            (tcv.alpn && (this.negotiatedAlpn = tcv.alpn), this.recordHandshake(tcx.raw));
            break;
          }
        case e64:
          {
            const tcb = ti1(tcx.body);
            if (!tcb) throw new Error("Missing TLS 1.3 certificate");
            (await this.acceptCertificate(tcb), this.recordHandshake(tcx.raw));
            break;
          }
        case e66:
          throw new Error(e5("Q2xpZW50IGNlcnRpZmljYXRlIGlzIG5vdCBzdXBwb3J0ZWQ="));
        case e68:
          this.recordHandshake(tcx.raw);
          break;
        case e7e:
          {
            const tck = await e8k(tco, tcg, await e84(tco, this.transcript()));
            if (!e8p(tck, tcx.body)) throw new Error(e5("VExTIDEuMyBzZXJ2ZXIgRmluaXNoZWQgdmVyaWZ5IGZhaWxlZA=="));
            (this.recordHandshake(tcx.raw), tcm = !0);
            break;
          }
        default:
          this.recordHandshake(tcx.raw);
      }
    };
    await this.readRecordsUntil(tct, async tc0 => {
      if (tc0.type === e6x || tc0.type === e6b) return;
      if (tc0.type === e6v) {
        if (e7h(tc0.fragment)) return;
        throw new Error(`TLS Alert: ${tc0.fragment[1]}`);
      }
      if (tc0.type !== e6k) return;
      const tc1 = await this.decryptTls13Handshake(tc0.fragment), tc2 = tc1[tc1.length - 1], tc3 = tc1.slice(0, -1);
      if (tc2 === e6b) {
        this.handshakeParser.feed(tc3);
        for (let tc4; tc4 = this.handshakeParser.next(); ) if ((await tcy(tc4), tcm)) return 1;
      }
    }, "Connection closed during TLS 1.3 handshake");
    const tc5 = await e84(tco, this.transcript()), tc6 = await e9w(tco, this.handshakeSecret, "derived", await e84(tco, e7y), tcs), tc7 = await e9a(tco, tc6, new Uint8Array(tcs)), tc8 = await e9w(tco, tc7, "c ap traffic", tc5, tcs), tc9 = await e9w(tco, tc7, "s ap traffic", tc5, tcs);
    ([this.clientAppKey, this.clientAppIv] = await tsn(tco, tc8, tca, tcc), [this.serverAppKey, this.serverAppIv] = await tsn(tco, tc9, tca, tcc));
    if (!this.cipherConfig.chacha) [this.clientAppCryptoKey, this.serverAppCryptoKey] = await Promise.all([tes(this.clientAppKey, ["encrypt"]), tes(this.serverAppKey, ["decrypt"])]);
    const tle = await e9w(tco, tch, "finished", e7y, tcs), tlt = await e8k(tco, tle, await e84(tco, this.transcript())), tlr = tnf(e7e, tlt);
    (this.recordHandshake(tlr), await tcr.write(tns(e6k, await this.encryptTls13Handshake(e8r(tlr, [e6b])))), this.clientSeqNum = 0n, this.serverSeqNum = 0n);
  }
  async encryptTls12(tln, tli) {
    const tlo = this.clientSeqNum++, tls = to4(tlo), tla = e8r(tls, [tli], e74(e6m), e74(tln.length));
    if (this.cipherConfig.chacha) {
      const tlc = to7(this.clientWriteIv, tlo);
      return trl(this.clientWriteKey, tlc, tln, tla);
    }
    const tll = e8f(8);
    if (!this.clientWriteCryptoKey) this.clientWriteCryptoKey = await tes(this.clientWriteKey, ["encrypt"]);
    return e8r(tll, await tel(this.clientWriteCryptoKey, e8r(this.clientWriteIv, tll), tln, tla));
  }
  async decryptTls12(tld, tlw) {
    const tlf = this.serverSeqNum++, tlh = to4(tlf);
    if (this.cipherConfig.chacha) {
      const tlp = to7(this.serverWriteIv, tlf);
      return tr0(this.serverWriteKey, tlp, tld, e8r(tlh, [tlw], e74(e6m), e74(tld.length - 16)));
    }
    const tlg = tld.subarray(0, 8), tlm = tld.subarray(8);
    if (!this.serverWriteCryptoKey) this.serverWriteCryptoKey = await tes(this.serverWriteKey, ["decrypt"]);
    return tep(this.serverWriteCryptoKey, e8r(this.serverWriteIv, tlg), tlm, e8r(tlh, [tlw], e74(e6m), e74(tlm.length - 16)));
  }
  async encryptTls13Handshake(tly) {
    const tlx = to7(this.clientHandshakeIv, this.clientSeqNum++), tlv = e7k(e6k, 3, 3, e74(tly.length + 16));
    if (this.cipherConfig.chacha) return trl(this.clientHandshakeKey, tlx, tly, tlv);
    if (!this.clientHandshakeCryptoKey) this.clientHandshakeCryptoKey = await tes(this.clientHandshakeKey, ["encrypt"]);
    return tel(this.clientHandshakeCryptoKey, tlx, tly, tlv);
  }
  async decryptTls13Handshake(tlb) {
    const tlk = to7(this.serverHandshakeIv, this.serverSeqNum++), tl0 = e7k(e6k, 3, 3, e74(tlb.length));
    const tl1 = this.cipherConfig.chacha ? await tr0(this.serverHandshakeKey, tlk, tlb, tl0) : await tep(this.serverHandshakeCryptoKey || (this.serverHandshakeCryptoKey = await tes(this.serverHandshakeKey, ["decrypt"])), tlk, tlb, tl0);
    let tl2 = tl1.length - 1;
    for (; tl2 >= 0 && !tl1[tl2]; ) tl2--;
    return tl2 < 0 ? e7y : tl1.slice(0, tl2 + 1);
  }
  async encryptTls13(tl3) {
    const tl4 = e8r(tl3, [e6k]), tl5 = to7(this.clientAppIv, this.clientSeqNum++), tl6 = e7k(e6k, 3, 3, e74(tl4.length + 16));
    if (this.cipherConfig.chacha) return trl(this.clientAppKey, tl5, tl4, tl6);
    if (!this.clientAppCryptoKey) this.clientAppCryptoKey = await tes(this.clientAppKey, ["encrypt"]);
    return tel(this.clientAppCryptoKey, tl5, tl4, tl6);
  }
  async decryptTls13(tl7) {
    const tl8 = to7(this.serverAppIv, this.serverSeqNum++), tl9 = e7k(e6k, 3, 3, e74(tl7.length)), tde = this.cipherConfig.chacha ? await tr0(this.serverAppKey, tl8, tl7, tl9) : await tep(this.serverAppCryptoKey || (this.serverAppCryptoKey = await tes(this.serverAppKey, ["decrypt"])), tl8, tl7, tl9);
    let tdt = tde.length - 1;
    for (; tdt >= 0 && !tde[tdt]; ) tdt--;
    if (tdt < 0) return {
      data: e7y,
      type: 0
    };
    return {
      data: tde.slice(0, tdt),
      type: tde[tdt]
    };
  }
  async write(tdr) {
    if (!this.handshakeComplete) throw new Error("Handshake not complete");
    const tdn = eh5(tdr);
    if (!tdn.byteLength) return;
    const tdi = this.socket.writable.getWriter();
    try {
      const tdo = [];
      for (let tds = 0; tds < tdn.byteLength; tds += tno) {
        const tda = tdn.subarray(tds, Math.min(tds + tno, tdn.byteLength));
        const tdc = this.isTls13 ? await this.encryptTls13(tda) : await this.encryptTls12(tda, e6k);
        tdo.push(tns(e6k, tdc));
      }
      await tdi.write(tdo.length === 1 ? tdo[0] : e8r(...tdo));
    } finally {
      tdi.releaseLock();
    }
  }
  async read() {
    for (; ; ) {
      let tdl;
      for (; tdl = this.recordParser.next(); ) {
        if (tdl.type === e6v) {
          if (tdl.fragment[1] === e7d) return null;
          throw new Error(`TLS Alert: ${tdl.fragment[1]}`);
        }
        if (tdl.type !== e6k) continue;
        if (!this.isTls13) return this.decryptTls12(tdl.fragment, e6k);
        const {data: tdd, type: tdw} = await this.decryptTls13(tdl.fragment);
        if (tdw === e6k) return tdd;
        if (tdw === e6v) {
          if (tdd[1] === e7d) return null;
          throw new Error(`TLS Alert: ${tdd[1]}`);
        }
        if (tdw !== e6b) continue;
        let tdf;
        for (this.handshakeParser.feed(tdd); tdf = this.handshakeParser.next(); ) if (tdf.type !== e62 && tdf.type === e7t) throw new Error("TLS 1.3 KeyUpdate is not supported by TLSClientMini");
      }
      const tdh = this.socket.readable.getReader();
      try {
        const {value: tdp, done: tdg} = await this.readChunk(tdh);
        if (tdg) return null;
        this.recordParser.feed(tdp);
      } finally {
        tdh.releaseLock();
      }
    }
  }
  close() {
    this.socket.close();
  }
}
function tdm(tdy = '') {
  const tdx = String(tdy || '').trim();
  return tdx.startsWith('[') && tdx.endsWith(']') ? tdx.slice(1, -1) : tdx;
}
function tdv(tdb = '') {
  const tdk = tdm(tdb);
  const td0 = /^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/;
  if (td0.test(tdk)) return true;
  if (!tdk.includes(':')) return false;
  try {
    new URL(`http://[${tdk}]/`);
    return true;
  } catch (td1) {
    return false;
  }
}
const td2 = 9999;
const td3 = new Uint8Array([0x21, 0x12, 0xa4, 0x42]);
const td4 = {
  ALLOCATE_REQUEST: 0x0003,
  ALLOCATE_SUCCESS: 0x0103,
  ALLOCATE_ERROR: 0x0113,
  CREATE_PERMISSION_REQUEST: 0x0008,
  CREATE_PERMISSION_SUCCESS: 0x0108,
  CONNECT_REQUEST: 0x000a,
  CONNECT_SUCCESS: 0x010a,
  CONNECTION_BIND_REQUEST: 0x000b,
  CONNECTION_BIND_SUCCESS: 0x010b
};
const td5 = {
  USERNAME: 0x0006,
  MESSAGE_INTEGRITY: 0x0008,
  ERROR_CODE: 0x0009,
  XOR_PEER_ADDRESS: 0x0012,
  REALM: 0x0014,
  NONCE: 0x0015,
  REQUESTED_TRANSPORT: 0x0019,
  CONNECTION_ID: 0x002a
};
async function td6(td7, td8, td9) {
  let twe;
  try {
    return await Promise.race([td7, new Promise((twt, twr) => {
      twe = setTimeout(() => twr(new Error(td9)), td8);
    })]);
  } finally {
    clearTimeout(twe);
  }
}
function twn(twi) {
  const two = String(twi || '').split('.');
  return two.length === 4 && two.every(tws => (/^\d{1,3}$/).test(tws) && Number(tws) >= 0 && Number(tws) <= 255);
}
function twa(twc) {
  return -twc & 3;
}
function twl(twd, tww) {
  const twf = eh5(tww);
  const twh = new Uint8Array(4 + twf.byteLength + twa(twf.byteLength));
  const twp = new DataView(twh.buffer);
  twp.setUint16(0, twd);
  twp.setUint16(2, twf.byteLength);
  twh.set(twf, 4);
  return twh;
}
function twg(twm, twy, twx) {
  const twv = eh7(...twx);
  const twb = new Uint8Array(20);
  const twk = new DataView(twb.buffer);
  twk.setUint16(0, twm);
  twk.setUint16(2, twv.byteLength);
  twb.set(td3, 4);
  twb.set(twy, 8);
  return eh7(twb, twv);
}
function tw0(tw1) {
  return tw1?.byteLength >= 4 ? (tw1[2] & 7) * 100 + tw1[3] : 0;
}
function tw2() {
  return crypto.getRandomValues(new Uint8Array(12));
}
async function tw3(tw4, tw5) {
  const tw6 = new Uint8Array(tw4);
  const tw7 = new DataView(tw6.buffer);
  tw7.setUint16(2, tw7.getUint16(2) + 24);
  const tw8 = await crypto.subtle.importKey('raw', tw5, {
    name: 'HMAC',
    hash: 'SHA-1'
  }, false, ['sign']);
  const tw9 = await crypto.subtle.sign('HMAC', tw8, tw6);
  return eh7(tw6, twl(td5.MESSAGE_INTEGRITY, new Uint8Array(tw9)));
}
async function tfe(tft, tfr = null, tfn = 'TURN response timed out') {
  let tfi = ern(tfr) ? eh5(tfr) : new Uint8Array(0);
  const tfo = async () => {
    const {done: tfs, value: tfa} = await td6(tft.read(), td2, tfn);
    if (tfs) throw new Error('TURN server closed connection');
    if (tfa?.byteLength) tfi = eh7(tfi, tfa);
  };
  while (tfi.byteLength < 20) await tfo();
  const tfc = 20 + (tfi[2] << 8 | tfi[3]);
  if (tfc > 65555) throw new Error('TURN response is too large');
  while (tfi.byteLength < tfc) await tfo();
  const tfl = tfi.subarray(0, tfc);
  if (td3.some((tfd, tfw) => tfl[4 + tfw] !== tfd)) throw new Error('Invalid TURN/STUN response');
  const tff = new DataView(tfl.buffer, tfl.byteOffset, tfl.byteLength);
  const tfh = {};
  for (let tfp = 20; tfp + 4 <= tfc; ) {
    const tfg = tff.getUint16(tfp);
    const tfm = tff.getUint16(tfp + 2);
    if (tfp + 4 + tfm > tfl.byteLength) break;
    tfh[tfg] = tfl.slice(tfp + 4, tfp + 4 + tfm);
    tfp += 4 + tfm + twa(tfm);
  }
  return {
    message: {
      type: tff.getUint16(0),
      attributes: tfh
    },
    extraData: tfi.byteLength > tfc ? tfi.subarray(tfc) : null
  };
}
async function tfy(tfx, tfv, tfb) {
  await td6(tfx.write(tfv), td2, tfb);
}
async function tfk(tf0, tf1, tf2, tf3) {
  tf0 = {
    ...tf0,
    username: tf0.username ?? null,
    password: tf0.password ?? null
  };
  const tf4 = tdm(tf1);
  let tf5 = twn(tf4) ? tf4 : null;
  if (!tf5) {
    const tf6 = await t8r(tf4, 'A');
    const tf7 = tf6.find(tf8 => tf8.type === 1 && twn(tf8.data))?.data;
    tf5 = typeof tf7 === 'string' ? tf7 : null;
  }
  if (!tf5) throw new Error(`Could not resolve ${tf1} to an IPv4 address for TURN CONNECT`);
  const tf9 = tdm(tf0.hostname);
  let the = null, tht = null, thr = null, thn = null, thi = null, tho = null, ths = false;
  const tha = () => {
    try {
      the?.close?.();
    } catch (thc) {}
    try {
      tht?.close?.();
    } catch (thl) {}
  };
  const thd = () => {
    if (ths) return;
    ths = true;
    try {
      tho?.releaseLock?.();
    } catch (thw) {}
  };
  try {
    the = tf3({
      hostname: tf9,
      port: tf0.port
    });
    await td6(the.opened, td2, e5("VFVSTiBzZXJ2ZXIgY29ubmVjdGlvbiB0aW1lZCBvdXQ="));
    thr = the.writable.getWriter();
    thn = the.readable.getReader();
    const thf = new Uint8Array(8);
    thf[1] = 1;
    new DataView(thf.buffer).setUint16(2, tf2 ^ 0x2112);
    tf5.split('.').forEach((thh, thp) => {
      thf[4 + thp] = Number(thh) ^ td3[thp];
    });
    const thg = twl(td5.XOR_PEER_ADDRESS, thf);
    const thm = new Uint8Array([6, 0, 0, 0]);
    await tfy(thr, twg(td4.ALLOCATE_REQUEST, tw2(), [twl(td5.REQUESTED_TRANSPORT, thm)]), 'TURN Allocate request timed out');
    let thy = await tfe(thn, null, 'TURN Allocate response timed out');
    let thx = thy.message;
    let thv = thy.extraData;
    let thb = null;
    let thk = [];
    const th0 = th1 => thb ? tw3(th1, thb) : Promise.resolve(th1);
    if (thx.type === td4.ALLOCATE_ERROR && tf0.username !== null && tf0.password !== null && tw0(thx.attributes[td5.ERROR_CODE]) === 401) {
      const th2 = thx.attributes[td5.REALM];
      const th3 = thx.attributes[td5.NONCE];
      if (!th2 || !th3?.byteLength) throw new Error(e5("VFVSTiBhdXRoZW50aWNhdGlvbiBjaGFsbGVuZ2UgaXMgbWlzc2luZyByZWFsbSBvciBub25jZQ=="));
      const th4 = e7m.decode(th2);
      thb = new Uint8Array(await crypto.subtle.digest('MD5', e7g.encode(`${tf0.username}:${th4}:${tf0.password}`)));
      thk = [twl(td5.USERNAME, e7g.encode(tf0.username)), twl(td5.REALM, e7g.encode(th4)), twl(td5.NONCE, th3)];
      const th5 = await tw3(twg(td4.ALLOCATE_REQUEST, tw2(), [twl(td5.REQUESTED_TRANSPORT, thm), ...thk]), thb);
      const th6 = await Promise.all([th0(twg(td4.CREATE_PERMISSION_REQUEST, tw2(), [thg, ...thk])), th0(twg(td4.CONNECT_REQUEST, tw2(), [thg, ...thk]))]);
      await tfy(thr, eh7(th5, ...th6), 'TURN authenticated Allocate request timed out');
      thy = await tfe(thn, thv, 'TURN authenticated Allocate response timed out');
      thx = thy.message;
      thv = thy.extraData;
    } else if (thx.type === td4.ALLOCATE_SUCCESS) {
      const th7 = await Promise.all([th0(twg(td4.CREATE_PERMISSION_REQUEST, tw2(), [thg, ...thk])), th0(twg(td4.CONNECT_REQUEST, tw2(), [thg, ...thk]))]);
      if (th7.length) await tfy(thr, eh7(...th7), 'TURN pipelined request timed out');
    }
    if (thx.type !== td4.ALLOCATE_SUCCESS) {
      const th8 = tw0(thx.attributes[td5.ERROR_CODE]);
      throw new Error(th8 ? `TURN Allocate failed with ${th8}` : 'TURN Allocate failed');
    }
    tht = tf3({
      hostname: tf9,
      port: tf0.port
    });
    thy = await tfe(thn, thv, e5("VFVSTiBDcmVhdGVQZXJtaXNzaW9uIHJlc3BvbnNlIHRpbWVkIG91dA=="));
    thx = thy.message;
    thv = thy.extraData;
    if (thx.type !== td4.CREATE_PERMISSION_SUCCESS) throw new Error('TURN CreatePermission failed');
    thy = await tfe(thn, thv, 'TURN CONNECT response timed out');
    thx = thy.message;
    thv = thy.extraData;
    if (thx.type !== td4.CONNECT_SUCCESS || !thx.attributes[td5.CONNECTION_ID]) throw new Error('TURN CONNECT failed');
    await td6(tht.opened, td2, 'TURN data connection timed out');
    thi = tht.writable.getWriter();
    tho = tht.readable.getReader();
    await tfy(thi, await th0(twg(td4.CONNECTION_BIND_REQUEST, tw2(), [twl(td5.CONNECTION_ID, thx.attributes[td5.CONNECTION_ID]), ...thk])), 'TURN ConnectionBind request timed out');
    thy = await tfe(tho, null, 'TURN ConnectionBind response timed out');
    thx = thy.message;
    const th9 = thy.extraData;
    if (thx.type !== td4.CONNECTION_BIND_SUCCESS) throw new Error('TURN ConnectionBind failed');
    thr.releaseLock();
    thr = null;
    thn.releaseLock();
    thn = null;
    thi.releaseLock();
    thi = null;
    const tpe = new ReadableStream({
      start(tpt) {
        if (th9?.byteLength) tpt.enqueue(th9);
      },
      pull(tpr) {
        return tho.read().then(({done: tpn, value: tpi}) => {
          if (tpn) {
            thd();
            tpr.close();
          } else if (tpi?.byteLength) tpr.enqueue(new Uint8Array(tpi));
        });
      },
      cancel() {
        try {
          tho?.cancel?.();
        } catch (tpo) {}
        thd();
        tha();
      }
    });
    return {
      readable: tpe,
      writable: tht.writable,
      closed: tht.closed,
      close: tha
    };
  } catch (tps) {
    try {
      thr?.releaseLock?.();
    } catch (tpa) {}
    try {
      thn?.releaseLock?.();
    } catch (tpc) {}
    try {
      thi?.releaseLock?.();
    } catch (tpl) {}
    thd();
    tha();
    throw tps;
  }
}
const tpd = 1400;
const tpw = new Uint8Array(0);
function tpf(tph, tpp = 0) {
  return tph[tpp] << 8 | tph[tpp + 1];
}
function tpg(tpm, tpy = 0) {
  return (tpm[tpy] << 24 | tpm[tpy + 1] << 16 | tpm[tpy + 2] << 8 | tpm[tpy + 3]) >>> 0;
}
function tpx() {
  return tpf(crypto.getRandomValues(new Uint8Array(2)));
}
function tpv(tpb, tpk, tp0) {
  let tp1 = 0;
  for (let tp2 = tpk; tp2 < tpk + tp0 - 1; tp2 += 2) tp1 += tpf(tpb, tp2);
  if (tp0 & 1) tp1 += tpb[tpk + tp0 - 1] << 8;
  while (tp1 >> 16) tp1 = (tp1 & 0xffff) + (tp1 >> 16);
  return ~tp1 & 0xffff;
}
async function tp3(tp4, tp5, tp6, tp7) {
  tp4 = {
    ...tp4,
    username: tp4.username ?? null,
    password: tp4.password ?? null
  };
  let tp8 = tpw, tp9 = 1, tge = null, tgt = null, tgr = null;
  let tgn = false, tgi, tgo;
  const tgs = new Promise((tga, tgc) => {
    tgi = tga;
    tgo = tgc;
  });
  const tgl = (tgd, tgw) => {
    if (tgn) return;
    tgn = true;
    tgd(tgw);
  };
  const tgf = () => {
    try {
      tgt?.cancel?.().catch?.(() => {});
    } catch (tgh) {}
    try {
      tgt?.releaseLock?.();
    } catch (tgp) {}
    try {
      tgr?.close?.().catch?.(() => {});
    } catch (tgg) {}
    try {
      tgr?.releaseLock?.();
    } catch (tgm) {}
    try {
      tge?.close?.();
    } catch (tgy) {}
    tgl(tgi);
  };
  const tgx = async () => {
    const {value: tgv, done: tgb} = await tgt.read();
    if (tgb || !tgv) throw new Error('SSTP socket closed');
    return eh5(tgv);
  };
  const tgk = async tg0 => {
    while (tp8.byteLength < tg0) {
      const tg1 = await tgx();
      tp8 = tp8.byteLength ? eh7(tp8, tg1) : tg1;
    }
    const tg2 = tp8.subarray(0, tg0);
    tp8 = tp8.subarray(tg0);
    return tg2;
  };
  const tg3 = async () => {
    for (; ; ) {
      const tg4 = tp8.indexOf(10);
      if (tg4 >= 0) {
        const tg5 = e7m.decode(tp8.subarray(0, tg4));
        tp8 = tp8.subarray(tg4 + 1);
        return tg5.replace(/\r$/, '');
      }
      const tg6 = await tgx();
      tp8 = tp8.byteLength ? eh7(tp8, tg6) : tg6;
    }
  };
  const tg7 = async (tg8 = td2) => {
    const tg9 = await td6(tgk(4), tg8, 'SSTP read timeout');
    const tme = tpf(tg9, 2) & 0x0fff;
    if (tme < 4) throw new Error('Invalid SSTP packet length');
    return {
      isControl: (tg9[1] & 1) !== 0,
      body: tme > 4 ? await td6(tgk(tme - 4), tg8, e5("U1NUUCBwYWNrZXQgYm9keSByZWFkIHRpbWVvdXQ=")) : tpw
    };
  };
  const tmt = tmr => {
    const tmn = 6 + tmr.byteLength;
    const tmi = new Uint8Array(tmn);
    tmi.set([0x10, 0x00, tmn >> 8 & 0x0f | 0x80, tmn & 0xff, 0xff, 0x03]);
    tmi.set(tmr, 6);
    return tmi;
  };
  const tmo = (tms, tma, tmc, tml = []) => {
    const tmd = tml.reduce((tmw, tmf) => tmw + 2 + tmf.data.byteLength, 0);
    const tmh = new Uint8Array(6 + tmd);
    const tmp = new DataView(tmh.buffer);
    tmp.setUint16(0, tms);
    tmh[2] = tma;
    tmh[3] = tmc;
    tmp.setUint16(4, 4 + tmd);
    tml.reduce((tmg, tmm) => {
      tmh[tmg] = tmm.type;
      tmh[tmg + 1] = 2 + tmm.data.byteLength;
      tmh.set(tmm.data, tmg + 2);
      return tmg + 2 + tmm.data.byteLength;
    }, 6);
    return tmh;
  };
  const tmy = tmx => {
    const tmv = tmx.byteLength >= 2 && tmx[0] === 0xff && tmx[1] === 0x03 ? 2 : 0;
    if (tmx.byteLength - tmv < 4) return null;
    const tmb = tpf(tmx, tmv);
    if (tmb === 0x0021) return {
      protocol: tmb,
      ipPacket: tmx.subarray(tmv + 2)
    };
    if (tmx.byteLength - tmv < 6) return null;
    return {
      protocol: tmb,
      code: tmx[tmv + 2],
      id: tmx[tmv + 3],
      payload: tmx.subarray(tmv + 6),
      rawPacket: tmx.subarray(tmv)
    };
  };
  const tmk = tm0 => {
    const tm1 = [];
    for (let tm2 = 0; tm2 + 2 <= tm0.byteLength; ) {
      const tm3 = tm0[tm2];
      const tm4 = tm0[tm2 + 1];
      if (tm4 < 2 || tm2 + tm4 > tm0.byteLength) break;
      tm1.push({
        type: tm3,
        data: tm0.subarray(tm2 + 2, tm2 + tm4)
      });
      tm2 += tm4;
    }
    return tm1;
  };
  try {
    const tm5 = tdm(tp4.hostname);
    const tm6 = tp4.port;
    tge = tp7({
      hostname: tm5,
      port: tm6
    }, {
      secureTransport: 'on',
      allowHalfOpen: false
    });
    await td6(tge.opened, td2, 'SSTP server connection timed out');
    tgt = tge.readable.getReader();
    tgr = tge.writable.getWriter();
    const tm7 = tm5.includes(':') ? `[${tm5}]` : tm5;
    const tm8 = e7g.encode(`SSTP_DUPLEX_POST /sra_{BA195980-CD49-458b-9E23-C84EE0ADCD75}/ HTTP/1.1\r\n` + `Host: ${Number(tm6) === 443 ? tm7 : `${tm7}:${tm6}`}\r\n` + 'Content-Length: 18446744073709551615\r\n' + `SSTPCORRELATIONID: {${crypto.randomUUID()}}\r\n\r\n`);
    const tm9 = new Uint8Array(2);
    new DataView(tm9.buffer).setUint16(0, 1);
    const tye = new Uint8Array(2);
    new DataView(tye.buffer).setUint16(0, 1500);
    const tyt = new Uint8Array(12 + tm9.byteLength);
    const tyr = new DataView(tyt.buffer);
    tyt[0] = 0x10;
    tyt[1] = 0x01;
    tyr.setUint16(2, tyt.byteLength | 0x8000);
    tyr.setUint16(4, 0x0001);
    tyr.setUint16(6, 1);
    tyt[9] = 1;
    tyr.setUint16(10, 4 + tm9.byteLength);
    tyt.set(tm9, 12);
    await td6(tgr.write(eh7(tm8, tyt, tmt(tmo(0xc021, 1, tp9++, [{
      type: 1,
      data: tye
    }])))), td2, 'SSTP HTTP handshake request timed out');
    const tyn = await td6(tg3(), td2, 'SSTP HTTP handshake timed out');
    for (; ; ) {
      const tyi = await td6(tg3(), td2, 'SSTP HTTP header read timed out');
      if (tyi === '') break;
    }
    if (!(/HTTP\/\d(?:\.\d)?\s+2\d\d/i).test(tyn)) throw new Error(`SSTP HTTP handshake failed: ${tyn || 'invalid status'}`);
    let tyo = false, tys = false, tya = false, tyc = false, tyl = false, tyd = false, tyw = false, tyf = null;
    const tyh = async () => {
      if (!tyo || !tys || !tya || tyc) return;
      if (tp4.username === null || tp4.password === null) throw new Error('SSTP server requires PAP authentication');
      const typ = e7g.encode(tp4.username);
      const tyg = e7g.encode(tp4.password);
      if (typ.byteLength > 255 || tyg.byteLength > 255) throw new Error('SSTP username/password is too long');
      const tym = 6 + typ.byteLength + tyg.byteLength;
      const tyy = new Uint8Array(2 + tym);
      const tyx = new DataView(tyy.buffer);
      tyx.setUint16(0, 0xc023);
      tyy[2] = 1;
      tyy[3] = tp9++;
      tyx.setUint16(4, tym);
      tyy[6] = typ.byteLength;
      tyy.set(typ, 7);
      tyy[7 + typ.byteLength] = tyg.byteLength;
      tyy.set(tyg, 8 + typ.byteLength);
      await td6(tgr.write(tmt(tyy)), td2, e5("U1NUUCBQQVAgYXV0aGVudGljYXRpb24gcmVxdWVzdCB0aW1lZCBvdXQ="));
      tyc = true;
    };
    const tyv = async () => {
      if (!tyo || !tys || tyd || tya && !tyl) return;
      await td6(tgr.write(tmt(tmo(0x8021, 1, tp9++, [{
        type: 3,
        data: new Uint8Array(4)
      }]))), td2, 'SSTP IPCP request timed out');
      tyd = true;
    };
    for (let tyb = 0; tyb < 50 && !tyw; tyb++) {
      const tyk = await tg7(td2);
      if (tyk.isControl) continue;
      const ty0 = tmy(tyk.body);
      if (!ty0) continue;
      if (ty0.protocol === 0xc021) {
        if (ty0.code === 1) {
          const ty1 = tmk(ty0.payload).find(ty2 => ty2.type === 3);
          if (ty1?.data?.byteLength >= 2) {
            const ty3 = tpf(ty1.data);
            if (ty3 !== 0xc023) throw new Error(`SSTP unsupported PPP authentication protocol: 0x${ty3.toString(16)}`);
            tya = true;
          }
          const ty4 = new Uint8Array(ty0.rawPacket);
          ty4[2] = 2;
          await td6(tgr.write(tmt(ty4)), td2, e5("U1NUUCBMQ1AgQ29uZmlndXJlLUFjayB0aW1lZCBvdXQ="));
          tys = true;
          await tyh();
          await tyv();
        } else if (ty0.code === 2) {
          tyo = true;
          await tyh();
          await tyv();
        }
        continue;
      }
      if (ty0.protocol === 0xc023) {
        if (ty0.code === 2) {
          tyl = true;
          await tyv();
        } else if (ty0.code === 3) throw new Error(e5("U1NUUCBQQVAgYXV0aGVudGljYXRpb24gZmFpbGVk"));
        continue;
      }
      if (ty0.protocol === 0x8021) {
        if (ty0.code === 1) {
          const ty5 = new Uint8Array(ty0.rawPacket);
          ty5[2] = 2;
          await td6(tgr.write(tmt(ty5)), td2, 'SSTP IPCP Configure-Ack timed out');
          await tyv();
        } else if (ty0.code === 3) {
          const ty6 = tmk(ty0.payload).find(ty7 => ty7.type === 3);
          if (ty6?.data?.byteLength === 4) {
            tyf = [...ty6.data].join('.');
            await td6(tgr.write(tmt(tmo(0x8021, 1, tp9++, [{
              type: 3,
              data: ty6.data
            }]))), td2, e5("U1NUUCBJUENQIGFkZHJlc3MgcmVxdWVzdCB0aW1lZCBvdXQ="));
            tyd = true;
          }
        } else if (ty0.code === 2) {
          const ty8 = tmk(ty0.payload).find(ty9 => ty9.type === 3);
          if (ty8?.data?.byteLength === 4) tyf = [...ty8.data].join('.');
          tyw = true;
        }
      }
    }
    if (!tyf) throw new Error('SSTP did not assign an IPv4 address');
    const txe = tdm(tp5);
    let txt = twn(txe) ? txe : null;
    if (!txt) {
      const txr = await t8r(txe, 'A');
      const txn = txr.find(txi => txi.type === 1 && twn(txi.data))?.data;
      txt = typeof txn === 'string' ? txn : null;
    }
    if (!txt) throw new Error(`Could not resolve ${tp5} to an IPv4 address for SSTP`);
    const txo = 10000 + tpx() % 50000;
    const txs = new Uint8Array(String(tyf || '').split('.').map(Number));
    const txa = new Uint8Array(String(txt || '').split('.').map(Number));
    let txc = tpg(crypto.getRandomValues(new Uint8Array(4)));
    let txl = 0;
    const txd = new Uint8Array(20);
    txd.set([0x45, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 64, 6]);
    txd.set(txs, 12);
    txd.set(txa, 16);
    const txw = new Uint8Array(1432);
    txw.set(txs);
    txw.set(txa, 4);
    txw[9] = 6;
    const txf = (txh, txp = tpw) => {
      const txg = eh5(txp);
      const txm = txg.byteLength;
      const txy = 20 + txm;
      const txx = 20 + txy;
      const txv = 8 + txx;
      const txb = new Uint8Array(txv);
      const txk = new DataView(txb.buffer);
      txb.set([0x10, 0x00, txv >> 8 & 0x0f | 0x80, txv & 0xff, 0xff, 0x03, 0x00, 0x21]);
      txb.set(txd, 8);
      txk.setUint16(10, txx);
      txk.setUint16(12, tpx());
      txk.setUint16(18, tpv(txb, 8, 20));
      txk.setUint16(28, txo);
      txk.setUint16(30, tp6);
      txk.setUint32(32, txc);
      txk.setUint32(36, txl);
      txb[40] = 0x50;
      txb[41] = txh;
      txk.setUint16(42, 65535);
      if (txm) txb.set(txg, 48);
      txw[10] = txy >> 8;
      txw[11] = txy & 0xff;
      txw.set(txb.subarray(28, 28 + txy), 12);
      txk.setUint16(44, tpv(txw, 0, 12 + txy));
      return txb;
    };
    const tx0 = tx1 => {
      if (tx1.byteLength < 40 || tx1[9] !== 6) return null;
      const tx2 = (tx1[0] & 0x0f) * 4;
      if (tx1.byteLength < tx2 + 20) return null;
      if (tpf(tx1, tx2) !== tp6) return null;
      if (tpf(tx1, tx2 + 2) !== txo) return null;
      return {
        flags: tx1[tx2 + 13],
        sequence: tpg(tx1, tx2 + 4),
        payloadOffset: tx2 + (tx1[tx2 + 12] >> 4 & 0x0f) * 4
      };
    };
    await td6(tgr.write(txf(0x02)), td2, 'SSTP TCP SYN write timed out');
    txc = txc + 1 >>> 0;
    let tx3 = false;
    for (let tx4 = 0; tx4 < 30; tx4++) {
      const tx5 = await tg7(td2);
      if (tx5.isControl) continue;
      const tx6 = tmy(tx5.body);
      if (!tx6 || tx6.protocol !== 0x0021) continue;
      const tx7 = tx0(tx6.ipPacket);
      if (!tx7 || (tx7.flags & 0x12) !== 0x12) continue;
      txl = tx7.sequence + 1 >>> 0;
      await td6(tgr.write(txf(0x10)), td2, e5("U1NUUCBUQ1AgQUNLIHdyaXRlIHRpbWVkIG91dA=="));
      tx3 = true;
      break;
    }
    if (!tx3) throw new Error('TCP handshake through SSTP timed out');
    let tx8 = null;
    const tx9 = new ReadableStream({
      start(tve) {
        tx8 = tve;
      },
      cancel() {
        tgf();
      }
    });
    (async () => {
      try {
        let tvt = [], tvr = 0;
        const tvn = () => {
          if (!tvr) return;
          if (!tx8) throw new Error('SSTP readable stream is not ready');
          tx8.enqueue(tvt.length === 1 ? tvt[0] : eh7(...tvt));
          tvt = [];
          tvr = 0;
          tgr.write(txf(0x10)).catch(() => {});
        };
        for (; ; ) {
          const tvi = await tg7(60000);
          if (tvi.isControl) continue;
          const tvo = tmy(tvi.body);
          if (!tvo || tvo.protocol !== 0x0021) continue;
          const tvs = tx0(tvo.ipPacket);
          if (!tvs) continue;
          if (tvs.payloadOffset < tvo.ipPacket.byteLength) {
            const tva = tvo.ipPacket.subarray(tvs.payloadOffset);
            if (tva.byteLength) {
              txl = tvs.sequence + tva.byteLength >>> 0;
              tvt.push(new Uint8Array(tva));
              tvr += tva.byteLength;
            }
          }
          if (tvs.flags & 0x01) {
            tvn();
            txl = txl + 1 >>> 0;
            tgr.write(txf(0x11)).catch(() => {});
            const tvc = tx8;
            if (tvc) {
              try {
                tvc.close();
              } catch (tvl) {}
            }
            tgf();
            return;
          }
          if (tp8.byteLength < 4 || tvr >= 32768) tvn();
        }
      } catch (tvd) {
        const tvw = tx8;
        if (tvw) {
          try {
            tvw.error(tvd);
          } catch (tvf) {}
        }
        tgl(tgo, tvd);
        try {
          tge?.close?.();
        } catch (tvh) {}
      }
    })();
    const tvp = new WritableStream({
      async write(tvg) {
        const tvm = eh5(tvg);
        if (!tvm.byteLength) return;
        if (tvm.byteLength <= tpd) {
          await tgr.write(txf(0x18, tvm));
          txc = txc + tvm.byteLength >>> 0;
          return;
        }
        const tvy = [];
        for (let tvx = 0; tvx < tvm.byteLength; tvx += tpd) {
          const tvv = tvm.subarray(tvx, Math.min(tvx + tpd, tvm.byteLength));
          tvy.push(txf(0x18, tvv));
          txc = txc + tvv.byteLength >>> 0;
        }
        await tgr.write(eh7(...tvy));
      },
      close() {
        return tgr.write(txf(0x11)).catch(() => {});
      },
      abort(tvb) {
        tgf();
        if (tvb) tgl(tgo, tvb);
      }
    });
    return {
      readable: tx9,
      writable: tvp,
      closed: tgs,
      close: tgf
    };
  } catch (tvk) {
    tgf();
    throw tvk;
  }
}
function tv0(tv1, tv2) {
  const tv3 = new TextEncoder();
  const tv4 = tv3.encode(tv1);
  const tv5 = tv3.encode(tv2);
  const tv6 = new Uint8Array(tv4.length);
  for (let tv7 = 0; tv7 < tv4.length; tv7++) {
    tv6[tv7] = tv4[tv7] ^ tv5[tv7 % tv5.length];
  }
  let tv8 = '';
  for (let tv9 = 0; tv9 < tv6.length; tv9++) {
    tv8 += String.fromCharCode(tv6[tv9]);
  }
  return btoa(tv8);
}
function tbe(tbt, tbr) {
  const tbn = atob(tbt);
  const tbi = new Uint8Array(tbn.length);
  for (let tbo = 0; tbo < tbn.length; tbo++) {
    tbi[tbo] = tbn.charCodeAt(tbo);
  }
  const tbs = new TextEncoder();
  const tba = tbs.encode(tbr);
  const tbc = new Uint8Array(tbi.length);
  for (let tbl = 0; tbl < tbi.length; tbl++) {
    tbc[tbl] = tbi[tbl] ^ tba[tbl % tba.length];
  }
  const tbd = new TextDecoder();
  return tbd.decode(tbc);
}
function tbw(tbf = {}) {
  const tbh = tbf.传输协议 === 'grpc';
  return {
    type: tbh ? tbf.gRPC模式 === 'multi' ? 'grpc&mode=multi' : 'grpc&mode=gun' : tbf.传输协议 === 'xhttp' ? 'xhttp&mode=stream-one' : 'ws',
    路径字段名: tbh ? 'serviceName' : 'path',
    域名字段名: tbh ? 'authority' : 'host'
  };
}
function tbp(tbg = {}, tbm = '/', tby = false) {
  const tbx = tby ? '/' : tbg.随机路径 ? t72(tbm) : tbm;
  if (tbg.传输协议 !== 'grpc') return tbx;
  return tbx.split('?')[0] || '/';
}
function tbv(...tbb) {
  if (tc) console.log(...tbb);
}
function tbk(tb0) {
  return tb0.replace(/-/g, '+').replace(/_/g, '/') + ('===').slice((tb0.length + 3) % 4);
}
async function tb1() {
  const tb2 = await crypto.subtle.generateKey({
    name: 'X25519'
  }, true, ['deriveBits']);
  const tb3 = await crypto.subtle.exportKey('jwk', tb2.publicKey);
  const tb4 = await crypto.subtle.exportKey('jwk', tb2.privateKey);
  return {
    publicKey: tbk(tb3.x),
    privateKey: tbk(tb4.d)
  };
}
function tb5(tb6) {
  try {
    const tb7 = atob(tb6);
    return Array.from(tb7, tb8 => tb8.charCodeAt(0));
  } catch (tb9) {
    return [0, 0, 0];
  }
}
async function tke(env, tkt = 'warp-account.json') {
  const {publicKey: tkr, privateKey: tkn} = await tb1();
  const tki = {
    key: tkr,
    install_id: '',
    fcm_token: '',
    tos: new Date().toISOString(),
    type: 'Android',
    model: 'PC',
    locale: 'en_US',
    warp_enabled: true
  };
  const tko = await fetch('https://api.cloudflareclient.com/v0a4005/reg', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'okhttp/4.9.0',
      'CF-Client-Version': 'a-6.30-2935'
    },
    body: JSON.stringify(tki)
  });
  if (tko.status !== 200) throw new Error('HTTP ' + tko.status + ' ' + (await tko.text()).slice(0, 200));
  const tks = await tko.json();
  const tka = tks.config && tks.config.peers && tks.config.peers[0] || ({});
  const tkc = {
    registered: true,
    privateKey: tkn,
    publicKey: tkr,
    reserved: tks.config && tks.config.client_id,
    reservedDec: tb5(tks.config && tks.config.client_id),
    addressV4: '172.16.0.2/32',
    addressV6: (tks.config && tks.config.interface && tks.config.interface.addresses && tks.config.interface.addresses.v6 || '') + '/128',
    peerPublicKey: tka.public_key || '',
    endpoint: tka.endpoint && tka.endpoint.host || 'engage.cloudflareclient.com:2408',
    mtu: 1280,
    deviceId: tks.id || '',
    accountId: tks.account && tks.account.id || '',
    license: tks.account && tks.account.license || '',
    warpPlus: false,
    token: tks.token || '',
    createdAt: new Date().toISOString()
  };
  if (env.KV && typeof env.KV.put === 'function') await env.KV.put(tkt, JSON.stringify(tkc, null, 2));
  return tkc;
}
async function tkl(env, tkd, tkw = 'warp-account.json') {
  const tkf = env.KV && typeof env.KV.get === 'function' ? await env.KV.get(tkw) : null;
  if (!tkf) throw new Error('no WARP account registered yet');
  const tkh = JSON.parse(tkf);
  if (!tkh.deviceId || !tkh.token) throw new Error('account missing device id or token');
  const tkp = String(tkd || '').trim();
  if (!tkp) throw new Error('empty license');
  const tkg = await fetch(`https://api.cloudflareclient.com/v0a4005/reg/${tkh.deviceId}/account`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'okhttp/4.9.0',
      'CF-Client-Version': 'a-6.30-2935',
      'Authorization': 'Bearer ' + tkh.token
    },
    body: JSON.stringify({
      license: tkp
    })
  });
  if (tkg.status !== 200) throw new Error('HTTP ' + tkg.status + ' ' + (await tkg.text()).slice(0, 200));
  const tkm = await tkg.json();
  tkh.license = tkm.account && tkm.account.license || tkh.license;
  tkh.warpPlus = !!(tkh.license && tkh.license === tkp);
  if (env.KV && typeof env.KV.put === 'function') await env.KV.put(tkw, JSON.stringify(tkh, null, 2));
  return tkh;
}
function tky(tkx) {
  if (!tkx) return {
    registered: false
  };
  const {token: tkv, ...tkb} = tkx;
  return {
    ...tkb,
    registered: true,
    hasToken: !!tkv
  };
}
function tkk(tk0) {
  const tk1 = String(tk0 || 'engage.cloudflareclient.com:2408');
  const tk2 = tk1.lastIndexOf(':');
  return tk2 > 0 ? {
    server: tk1.slice(0, tk2),
    port: Number(tk1.slice(tk2 + 1)) || 2408
  } : {
    server: tk1,
    port: 2408
  };
}
function tk3(tk4, tk5, tk6, tk7, tk8) {
  const tk9 = tk8 ? '162.159.192.1:2408' : tk7 || tk4.endpoint;
  const {server: t0e, port: t0t} = tkk(tk9);
  const t0r = {
    type: 'wireguard',
    tag: tk5,
    server: t0e,
    server_port: t0t,
    local_address: [tk4.addressV4 || '172.16.0.2/32', tk4.addressV6].filter(Boolean),
    private_key: tk4.privateKey,
    peer_public_key: tk4.peerPublicKey,
    reserved: Array.isArray(tk4.reservedDec) ? tk4.reservedDec : [0, 0, 0],
    mtu: tk4.mtu || 1280
  };
  if (tk6) t0r.detour = tk6;
  return t0r;
}
function t0n(t0i, t0o = {}, t0s = null, t0a = null) {
  const t0c = t0o?.UUID || null;
  const t0l = Boolean(t0o?.ECH);
  const t0d = Array.isArray(t0o?.HOSTS) ? [...t0o.HOSTS] : [];
  const t0w = t0o?.ECHConfig?.SNI || null;
  const t0f = t0o?.ECHConfig?.DNS;
  const t0h = Boolean(t0c && t0l);
  const t0p = typeof t0o?.gRPCUserAgent === 'string' && t0o.gRPCUserAgent.trim() ? t0o.gRPCUserAgent.trim() : null;
  const t0g = t0o?.传输协议 === "grpc" && Boolean(t0p);
  const t0m = t0p ? JSON.stringify(t0p) : null;
  let t0y = t0i.replace(/mode:\s*Rule\b/g, 'mode: rule');
  const t0x = `dns:
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
  const t0v = t0b => t0b.replace(/grpc-opts:\s*\{([\s\S]*?)\}/i, (t0k, t00) => {
    if ((/grpc-user-agent\s*:/i).test(t00)) return t0k;
    let t01 = t00.trim();
    if (t01.endsWith(',')) t01 = t01.slice(0, -1).trim();
    const t02 = t01 ? `${t01}, grpc-user-agent: ${t0m}` : `grpc-user-agent: ${t0m}`;
    return `grpc-opts: {${t02}}`;
  });
  const t03 = t04 => (/(?:^|[,{])\s*network:\s*(?:"grpc"|'grpc'|grpc)(?=\s*(?:[,}\n#]|$))/mi).test(t04);
  const t05 = t06 => t06.match(/type:\s*(\w+)/)?.[1] || 'vl' + 'ess';
  const t07 = (t08, t09) => {
    const t1e = t05(t08) === 'trojan' ? 'password' : 'uuid';
    const t1t = new RegExp(`${t1e}:\\s*${t09 ? '([^,}\\n]+)' : '([^\\n]+)'}`);
    return t08.match(t1t)?.[1]?.trim() || null;
  };
  const t1r = (t1n, t1i) => {
    if ((/^\s{2}nameserver-policy:\s*(?:\n|$)/m).test(t1n)) {
      return t1n.replace(/^(\s{2}nameserver-policy:\s*\n)/m, `$1${t1i}\n`);
    }
    const t1o = t1n.split('\n');
    let t1s = -1;
    let t1a = false;
    for (let t1c = 0; t1c < t1o.length; t1c++) {
      const t1l = t1o[t1c];
      if ((/^dns:\s*$/).test(t1l)) {
        t1a = true;
        continue;
      }
      if (t1a && (/^[a-zA-Z]/).test(t1l)) {
        t1s = t1c;
        break;
      }
    }
    const t1d = `  nameserver-policy:\n${t1i}`;
    if (t1s !== -1) t1o.splice(t1s, 0, t1d); else t1o.push(t1d);
    return t1o.join('\n');
  };
  const t1w = t1f => {
    if (!t03(t1f) || (/grpc-user-agent\s*:/i).test(t1f)) return t1f;
    if ((/grpc-opts:\s*\{/i).test(t1f)) return t0v(t1f);
    return t1f.replace(/\}(\s*)$/, `, grpc-opts: {grpc-user-agent: ${t0m}}}$1`);
  };
  const t1h = (t1p, t1g) => {
    const t1m = (' ').repeat(t1g);
    let t1y = -1;
    for (let t1x = 0; t1x < t1p.length; t1x++) {
      const t1v = t1p[t1x];
      if (!t1v.trim()) continue;
      const t1b = t1v.search(/\S/);
      if (t1b !== t1g) continue;
      if ((/^\s*grpc-opts:\s*(?:#.*)?$/).test(t1v) || (/^\s*grpc-opts:\s*\{.*\}\s*(?:#.*)?$/).test(t1v)) {
        t1y = t1x;
        break;
      }
    }
    if (t1y === -1) {
      let t1k = -1;
      for (let t10 = t1p.length - 1; t10 >= 0; t10--) {
        if (t1p[t10].trim()) {
          t1k = t10;
          break;
        }
      }
      if (t1k >= 0) t1p.splice(t1k + 1, 0, `${t1m}grpc-opts:`, `${t1m}  grpc-user-agent: ${t0m}`);
      return t1p;
    }
    const t11 = t1p[t1y];
    if ((/^\s*grpc-opts:\s*\{.*\}\s*(?:#.*)?$/).test(t11)) {
      if (!(/grpc-user-agent\s*:/i).test(t11)) t1p[t1y] = t0v(t11);
      return t1p;
    }
    let t12 = t1p.length;
    let t13 = t1g + 2;
    let t14 = false;
    for (let t15 = t1y + 1; t15 < t1p.length; t15++) {
      const t16 = t1p[t15];
      const t17 = t16.trim();
      if (!t17) continue;
      const t18 = t16.search(/\S/);
      if (t18 <= t1g) {
        t12 = t15;
        break;
      }
      if (t18 > t1g && t13 === t1g + 2) t13 = t18;
      if ((/^grpc-user-agent\s*:/).test(t17)) {
        t14 = true;
        break;
      }
    }
    if (!t14) t1p.splice(t12, 0, `${(' ').repeat(t13)}grpc-user-agent: ${t0m}`);
    return t1p;
  };
  const t19 = (t2e, t2t) => {
    let t2r = -1;
    for (let t2n = t2e.length - 1; t2n >= 0; t2n--) {
      if (t2e[t2n].trim()) {
        t2r = t2n;
        break;
      }
    }
    if (t2r < 0) return t2e;
    const t2i = (' ').repeat(t2t);
    const t2o = [`${t2i}ech-opts:`, `${t2i}  enable: true`];
    if (t0w) t2o.push(`${t2i}  query-server-name: ${t0w}`);
    t2e.splice(t2r + 1, 0, ...t2o);
    return t2e;
  };
  if (!(/^dns:\s*(?:\n|$)/m).test(t0y)) t0y = t0x + t0y;
  if (t0w && !t0d.includes(t0w)) t0d.push(t0w);
  if (t0l && t0d.length > 0) {
    const t2s = t0d.map(t2a => `    "${t2a}": ${t0f ? t0f : ''}`).join('\n');
    t0y = t1r(t0y, t2s);
  }
  if (t0s && t0s.enableWarp && t0a && t0a.registered && t0a.privateKey && !t0y.includes('name: "Nova-WARP"')) {
    try {
      const t2c = t0s.warpEndpoint && String(t0s.warpEndpoint).trim() || null;
      const t2l = t0s.warpAmnezia ? `\n    amnezia-wg-option: {jc: 4, jmin: 40, jmax: 70}` : '';
      const t2d = t2w => {
        const t2f = String(t2w).lastIndexOf(':');
        return t2f > 0 ? {
          s: String(t2w).slice(0, t2f),
          p: Number(String(t2w).slice(t2f + 1)) || 2408
        } : {
          s: String(t2w),
          p: 2408
        };
      };
      const t2h = (t2p, t2g, t2m, t2y) => {
        const {s: t2x, p: t2v} = t2d(t2m);
        return `  - name: "${t2g}"\n` + `    type: wireguard\n` + `    server: ${t2x}\n` + `    port: ${t2v}\n` + `    ip: ${t2p.addressV4 || '172.16.0.2/32'}\n` + (t2p.addressV6 ? `    ipv6: "${t2p.addressV6}"\n` : '') + `    private-key: "${t2p.privateKey}"\n` + `    public-key: "${t2p.peerPublicKey}"\n` + `    reserved: "${t2p.reserved || ''}"\n` + `    udp: true\n` + `    mtu: ${t2p.mtu || 1280}` + (t2y ? `\n    dialer-proxy: "${t2y}"` : '') + t2l;
      };
      let t2b, t2k;
      if (t0s.warpMode === 'wow' && t0a.wow && t0a.wow.privateKey) {
        t2b = t2h(t0a, 'Nova-WARP', t2c || t0a.endpoint, '') + '\n' + t2h(t0a.wow, 'Nova-WoW', '162.159.192.1:2408', 'Nova-WARP');
        t2k = 'Nova-WoW';
      } else {
        let t20 = '';
        if (t0s.warpMode === 'chain') {
          const t21 = t0y.match(/^proxy-groups:\s*$[\s\S]*?^\s*-\s*name:\s*["']?([^"'\n]+?)["']?\s*$/m);
          if (t21 && t21[1]) t20 = t21[1].trim();
        }
        t2b = t2h(t0a, 'Nova-WARP', t2c || t0a.endpoint, t20);
        t2k = 'Nova-WARP';
      }
      if ((/^proxies:\s*$/m).test(t0y)) t0y = t0y.replace(/^proxies:\s*$/m, 'proxies:\n' + t2b); else t0y = 'proxies:\n' + t2b + '\n' + t0y;
      if ((/^\s*-\s*MATCH,[^\n]+$/m).test(t0y)) t0y = t0y.replace(/^(\s*-\s*MATCH,)[^\n]+$/m, '$1' + t2k); else t0y = t0y.replace(/^(\s*)rules:\s*$/m, '$&\n$1  - MATCH,' + t2k);
    } catch (t22) {}
  }
  if (t0s && t0s.blockQUIC && !t0y.includes('DST-PORT,443,REJECT,udp')) {
    const t23 = '  - "DST-PORT,443,REJECT,udp"';
    if ((/^\s*-\s*MATCH,/m).test(t0y)) {
      t0y = t0y.replace(/^(\s*-\s*MATCH,)/m, t23 + '\n$1');
    } else if ((/^rules:\s*$/m).test(t0y)) {
      t0y = t0y.replace(/^rules:\s*$/m, 'rules:\n' + t23);
    }
  }
  if (!t0h && !t0g) return t0y;
  const t24 = t0y.split('\n');
  const t25 = [];
  let t26 = 0;
  while (t26 < t24.length) {
    const t27 = t24[t26];
    const t28 = t27.trim();
    if (t28.startsWith('- {')) {
      let t29 = t27;
      let t3e = (t27.match(/\{/g) || []).length - (t27.match(/\}/g) || []).length;
      while (t3e > 0 && t26 + 1 < t24.length) {
        t26++;
        t29 += '\n' + t24[t26];
        t3e += (t24[t26].match(/\{/g) || []).length - (t24[t26].match(/\}/g) || []).length;
      }
      if (t0g) t29 = t1w(t29);
      if (t0h && t07(t29, true) === t0c.trim()) {
        t29 = t29.replace(/\}(\s*)$/, `, ech-opts: {enable: true${t0w ? `, query-server-name: ${t0w}` : ''}}}$1`);
      }
      t25.push(t29);
      t26++;
    } else if (t28.startsWith('- name:')) {
      let t3t = [t27];
      let t3r = t27.search(/\S/);
      let t3n = t3r + 2;
      t26++;
      while (t26 < t24.length) {
        const t3i = t24[t26];
        const t3o = t3i.trim();
        if (!t3o) {
          t3t.push(t3i);
          t26++;
          break;
        }
        const t3s = t3i.search(/\S/);
        if (t3s <= t3r && t3o.startsWith('- ')) {
          break;
        }
        if (t3s < t3r && t3o) {
          break;
        }
        t3t.push(t3i);
        t26++;
      }
      let t3a = t3t.join('\n');
      if (t0g && t03(t3a)) {
        t3t = t1h(t3t, t3n);
        t3a = t3t.join('\n');
      }
      if (t0h && t07(t3a, false) === t0c.trim()) t3t = t19(t3t, t3n);
      t25.push(...t3t);
    } else {
      t25.push(t27);
      t26++;
    }
  }
  return t25.join('\n');
}
async function t3c(t3l, t3d = {}, t3w = null, t3f = null) {
  const t3h = t3d?.UUID || null;
  const t3p = t3d?.Fingerprint || "chrome";
  const t3g = Boolean(t3d?.ECH);
  const t3m = t3d?.ECHConfig?.SNI || "cloudflare-ech.com";
  const t3y = t3l.replace('1.1.1.1', '8.8.8.8').replace('1.0.0.1', '8.8.4.4');
  try {
    const t3x = JSON.parse(t3y);
    const t3v = t3b => t3b === undefined || t3b === null ? [] : Array.isArray(t3b) ? t3b : [t3b];
    const t3k = () => t3x.route = t3x.route && typeof t3x.route === 'object' ? t3x.route : {};
    const t30 = t31 => t31 && typeof t31 === 'object' && !Array.isArray(t31) && typeof t31.server === 'string' ? t31.server : null;
    const t32 = (t33, t34) => {
      if (!t34 || typeof t34 !== 'string') return null;
      const t35 = t3k(), t36 = `${t33}-${t34}`, t37 = Array.isArray(t35.rule_set) ? t35.rule_set : t3v(t35.rule_set);
      if (!t37.some(t38 => t38?.tag === t36)) {
        const t39 = t33 === 'geoip' ? t35.geoip : t35.geosite;
        t37.push({
          tag: t36,
          type: 'remote',
          format: 'binary',
          url: `https://raw.githubusercontent.com/SagerNet/sing-${t33}/rule-set/${t36}.srs`,
          ...t39?.download_detour ? {
            download_detour: t39.download_detour
          } : {}
        });
        t3x.experimental = t3x.experimental && typeof t3x.experimental === 'object' ? t3x.experimental : {};
        t3x.experimental.cache_file = t3x.experimental.cache_file && typeof t3x.experimental.cache_file === 'object' ? t3x.experimental.cache_file : {};
        t3x.experimental.cache_file.enabled ??= true;
      }
      t35.rule_set = t37;
      return t36;
    };
    const t4e = t4t => {
      if (!t4t || typeof t4t !== 'object' || Array.isArray(t4t)) return t4t;
      if (t4t.type === 'logical' && Array.isArray(t4t.rules)) {
        t4t.rules = t4t.rules.map(t4e);
        return t4t;
      }
      const t4r = [];
      for (const t4n of t3v(t4t.geoip)) {
        if (typeof t4n !== 'string') continue;
        if (t4n.toLowerCase() === 'private') t4t.ip_is_private = true; else t4r.push(t32('geoip', t4n));
      }
      for (const t4i of t3v(t4t.source_geoip)) {
        if (typeof t4i !== 'string') continue;
        t4r.push(t32('geoip', t4i));
        t4t.rule_set_ip_cidr_match_source = true;
      }
      for (const t4o of t3v(t4t.geosite)) if (typeof t4o === 'string') t4r.push(t32('geosite', t4o));
      if (t4r.length) t4t.rule_set = [...new Set([...t3v(t4t.rule_set), ...t4r].filter(Boolean))];
      delete t4t.geoip;
      delete t4t.source_geoip;
      delete t4t.geosite;
      return t4t;
    };
    const t4s = (t4a, t4c) => {
      t4a = t4e(t4a);
      if (!t4a || typeof t4a !== 'object' || Array.isArray(t4a)) return t4a;
      if (t4a.type === 'logical' && Array.isArray(t4a.rules)) {
        t4a.rules = t4a.rules.map(t4l => t4s(t4l, t4c));
        return t4a;
      }
      const t4d = t30(t4a);
      if (t4d && t4c.has(t4d)) {
        for (const t4w of ['server', 'strategy', 'disable_cache', 'rewrite_ttl', 'client_subnet', 'timeout']) delete t4a[t4w];
        t4a.action = 'predefined';
        t4a.rcode = t4c.get(t4d);
      } else if (t4d && !t4a.action) t4a.action = 'route';
      return t4a;
    };
    if (Array.isArray(t3x.inbounds)) {
      for (const t4f of t3x.inbounds) {
        if (!t4f || typeof t4f !== 'object' || t4f.type !== 'tun') continue;
        for (const t4h of [{
          targetKey: 'address',
          sourceKeys: ['inet4_address', 'inet6_address']
        }, {
          targetKey: 'route_address',
          sourceKeys: ['inet4_route_address', 'inet6_route_address']
        }, {
          targetKey: 'route_exclude_address',
          sourceKeys: ['inet4_route_exclude_address', 'inet6_route_exclude_address']
        }]) {
          const t4p = t3v(t4f[t4h.targetKey]);
          for (const t4g of t4h.sourceKeys) t4p.push(...t3v(t4f[t4g]));
          if (t4p.length) t4f[t4h.targetKey] = [...new Set(t4p)];
          for (const t4m of t4h.sourceKeys) delete t4f[t4m];
        }
        if (t4f.tag) {
          const t4y = [];
          if (t4f.domain_strategy) t4y.push({
            inbound: t4f.tag,
            action: 'resolve',
            strategy: t4f.domain_strategy
          });
          if (t4f.sniff) {
            const t4x = {
              inbound: t4f.tag,
              action: 'sniff'
            };
            if (t4f.sniff_timeout) t4x.timeout = t4f.sniff_timeout;
            t4y.push(t4x);
          }
          if (t4y.length) {
            const t4v = t3k();
            t4v.rules = [...t4y, ...t3v(t4v.rules)];
          }
        }
        delete t4f.sniff;
        delete t4f.sniff_timeout;
        delete t4f.domain_strategy;
      }
    }
    if (t3x?.route && typeof t3x.route === 'object' && Array.isArray(t3x.route.rules)) {
      const t4b = t4k => {
        t4k = t4e(t4k);
        if (t4k?.type === 'logical' && Array.isArray(t4k.rules)) t4k.rules = t4k.rules.map(t4b); else if (t4k && typeof t4k === 'object' && !Array.isArray(t4k) && t4k.outbound && !t4k.action) t4k.action = 'route';
        return t4k;
      };
      t3x.route.rules = t3x.route.rules.map(t4b);
    }
    if (t3w && t3w.blockQUIC && t3x?.route && typeof t3x.route === 'object' && Array.isArray(t3x.route.rules)) {
      if (!t3x.route.rules.some(t40 => t40.outbound === 'block' && t40.network === 'udp' && Array.isArray(t40.port) && t40.port.includes(443))) {
        t3x.route.rules.unshift({
          outbound: 'block',
          network: 'udp',
          port: [443]
        });
      }
    }
    const t41 = t3x?.dns;
    if (t41 && typeof t41 === 'object') {
      const t42 = t41.fakeip && typeof t41.fakeip === 'object' ? t41.fakeip : null;
      const t43 = new Map();
      const t44 = {
        'tcp:': 'tcp',
        'udp:': 'udp',
        'tls:': 'tls',
        'quic:': 'quic',
        'https:': 'https',
        'h3:': 'h3'
      };
      const t45 = {
        success: 'NOERROR',
        format_error: 'FORMERR',
        server_failure: 'SERVFAIL',
        name_error: 'NXDOMAIN',
        not_implemented: 'NOTIMP',
        refused: 'REFUSED'
      };
      let t46 = false;
      if (Array.isArray(t41.servers)) {
        const t47 = [];
        for (const t48 of t41.servers) {
          if (!t48 || typeof t48 !== 'object' || Array.isArray(t48)) {
            t47.push(t48);
            continue;
          }
          const t49 = {
            ...t48
          };
          let t5e = null, t5t = '', t5r = typeof t49.address === 'string' ? t49.address.trim() : '';
          if (t5r) {
            const t5n = t5r.toLowerCase();
            if (t5n === 'fakeip') t5e = {
              type: 'fakeip'
            }; else if (t5n === 'local') t5e = {
              type: 'local'
            }; else if (t5n.startsWith('rcode://')) {
              t5e = {
                type: 'rcode'
              };
              t5t = t5r.slice(('rcode://').length).toLowerCase();
            } else if (t5n.startsWith('dhcp://')) {
              const t5i = t5r.slice(('dhcp://').length);
              t5e = t5i && t5i.toLowerCase() !== 'auto' ? {
                type: 'dhcp',
                interface: t5i
              } : {
                type: 'dhcp'
              };
            } else {
              try {
                const t5o = new URL(t5r);
                const t5s = t44[t5o.protocol.toLowerCase()];
                if (t5s) {
                  const t5a = t5o.hostname?.startsWith('[') && t5o.hostname.endsWith(']') ? t5o.hostname.slice(1, -1) : t5o.hostname;
                  t5e = {
                    type: t5s,
                    server: t5a || t5o.host || t5r,
                    ...t5o.port ? {
                      server_port: Number(t5o.port)
                    } : {},
                    ...(t5s === 'https' || t5s === 'h3') && t5o.pathname && t5o.pathname !== '/dns-query' ? {
                      path: t5o.pathname
                    } : {}
                  };
                }
              } catch (t5c) {}
              if (!t5e) t5e = {
                type: 'udp',
                server: t5r
              };
            }
          }
          if (t5e?.type === 'rcode') {
            const t5l = t45[t5t] || 'NOERROR';
            if (typeof t49.tag === 'string' && t49.tag) {
              t43.set(t49.tag, t5l);
              t43.set(t49.tag.startsWith('dns_') ? t49.tag.slice(4) : `dns_${t49.tag}`, t5l);
            }
            continue;
          }
          if (t5e) {
            delete t49.address;
            Object.assign(t49, t5e);
          }
          if (t49.address_resolver !== undefined && t49.domain_resolver === undefined) t49.domain_resolver = t49.address_resolver;
          if (t49.address_strategy !== undefined && t49.domain_strategy === undefined) t49.domain_strategy = t49.address_strategy;
          delete t49.address_resolver;
          delete t49.address_strategy;
          if (t49.detour === 'DIRECT') delete t49.detour;
          if (t49.type === 'fakeip') {
            t46 = true;
            if (t42) {
              for (const t5d of ['inet4_range', 'inet6_range']) {
                if (t42[t5d] !== undefined && t49[t5d] === undefined) t49[t5d] = t42[t5d];
              }
            }
          }
          t47.push(t49);
        }
        t41.servers = t47;
      }
      if (t42 && !t46 && t42.enabled !== false) {
        const t5w = {
          type: 'fakeip',
          tag: 'fakeip'
        };
        for (const t5f of Array.isArray(t41.rules) ? t41.rules : []) {
          const t5h = t30(t5f);
          if (t5h && t5h.toLowerCase().includes('fakeip')) {
            t5w.tag = t5h;
            break;
          }
        }
        for (const t5p of ['inet4_range', 'inet6_range']) {
          if (t42[t5p] !== undefined) t5w[t5p] = t42[t5p];
        }
        if (Array.isArray(t41.servers)) t41.servers.push(t5w); else t41.servers = [t5w];
      }
      if (Array.isArray(t41.rules)) {
        const t5g = [];
        for (const t5m of t41.rules) {
          const t5y = t30(t5m);
          const t5x = t3v(t5m?.outbound);
          const t5v = new Set(['outbound', 'server', 'action', 'strategy', 'disable_cache', 'rewrite_ttl', 'client_subnet', 'timeout']);
          const t5b = t5m && typeof t5m === 'object' && !Array.isArray(t5m) && t5m.type !== 'logical' && t5y && t5x.includes('any') && Object.keys(t5m).every(t5k => t5v.has(t5k));
          if (t5b) {
            const t50 = t3k();
            if (t50.default_domain_resolver === undefined) {
              const t51 = {
                server: t5y
              };
              for (const t52 of ['strategy', 'disable_cache', 'rewrite_ttl', 'client_subnet', 'timeout']) {
                if (t5m[t52] !== undefined) t51[t52] = t5m[t52];
              }
              t50.default_domain_resolver = Object.keys(t51).length === 1 ? t51.server : t51;
            }
            continue;
          }
          t5g.push(t4s(t5m, t43));
        }
        t41.rules = t5g;
      }
      delete t41.fakeip;
      delete t41.independent_cache;
    }
    if (t3x?.route && typeof t3x.route === 'object') {
      delete t3x.route.geoip;
      delete t3x.route.geosite;
    }
    if (t3x?.ntp?.detour === 'DIRECT') delete t3x.ntp.detour;
    if (Array.isArray(t3x.outbounds)) {
      const t53 = new Set(t3x.outbounds.map(t54 => t54?.tag).filter(Boolean));
      const t55 = t56 => t56 === 'REJECT' || t56 && typeof t56 === 'object' && (Array.isArray(t56) ? t56.some(t55) : Object.values(t56).some(t55));
      if (!t53.has('REJECT') && t55({
        outbounds: t3x.outbounds,
        route: t3x.route
      })) t3x.outbounds.push({
        type: 'block',
        tag: 'REJECT'
      });
    }
    if (t3h) {
      t3x.outbounds?.forEach(t57 => {
        if (t57.uuid && t57.uuid === t3h || t57.password && t57.password === t3h) {
          if (!t57.tls) {
            t57.tls = {
              enabled: true
            };
          }
          if (t3p) {
            t57.tls.utls = {
              enabled: true,
              fingerprint: t3p
            };
          }
          if (t3g) {
            t57.tls.ech = {
              enabled: true,
              query_server_name: t3m
            };
          }
        }
      });
    }
    if (t3w && t3w.enableWarp && t3f && t3f.registered && t3f.privateKey) {
      t3x.outbounds = Array.isArray(t3x.outbounds) ? t3x.outbounds : [];
      const t58 = 'Nova-WARP';
      const t59 = t3w.warpEndpoint && String(t3w.warpEndpoint).trim() || null;
      if (!t3x.outbounds.some(t6e => t6e && t6e.tag === t58)) {
        const t6t = () => t3x.route = t3x.route && typeof t3x.route === 'object' ? t3x.route : {};
        if (t3w.warpMode === 'wow' && t3f.wow && t3f.wow.privateKey) {
          t3x.outbounds.push(tk3(t3f, t58, null, t59, false));
          t3x.outbounds.push(tk3(t3f.wow, 'Nova-WoW', t58, null, true));
          t6t().final = 'Nova-WoW';
        } else {
          let t6r = null;
          if (t3w.warpMode === 'chain') {
            const t6n = t3x.outbounds.find(t6i => t6i && (t6i.type === 'selector' || t6i.type === 'urltest'));
            t6r = t6n ? t6n.tag : null;
          }
          t3x.outbounds.push(tk3(t3f, t58, t6r, t59, false));
          t6t().final = t58;
        }
      }
    }
    return JSON.stringify(t3x, null, 2);
  } catch (t6o) {
    console.error("Singbox热补丁执行失败:", t6o);
    return JSON.stringify(JSON.parse(t3y), null, 2);
  }
}
function t6s(t6a, t6c, t6l) {
  const t6d = t6a.includes('\r\n') ? t6a.split('\r\n') : t6a.split('\n');
  const t6w = t6l.随机路径 ? t72(t6l.完整节点路径) : t6l.完整节点路径;
  let t6f = "";
  for (let t6h of t6d) {
    if (t6h.includes('= tro' + 'jan,') && !t6h.includes('ws=true') && !t6h.includes('ws-path=')) {
      const t6p = t6h.split("sni=")[1].split(",")[0];
      const t6g = `sni=${t6p}, skip-cert-verify=${t6l.跳过证书验证}`;
      const t6m = `sni=${t6p}, skip-cert-verify=${t6l.跳过证书验证}, ws=true, ws-path=${t6w.replace(/,/g, '%2C')}, ws-headers=Host:"${t6p}"`;
      t6f += t6h.replace(new RegExp(t6g, 'g'), t6m).replace("[", "").replace("]", "") + '\n';
    } else {
      t6f += t6h + '\n';
    }
  }
  t6f = `#!MANAGED-CONFIG ${t6c} interval=${t6l.优选订阅生成.SUBUpdateTime * 60 * 60} strict=false` + t6f.substring(t6f.indexOf('\n'));
  return t6f;
}
async function t6y(env, t6x, t6v, t6b = "Get_SUB", t6k, t60 = true) {
  try {
    const t61 = new Date();
    const t62 = {
      TYPE: t6b,
      IP: t6v,
      ASN: `AS${t6x.cf.asn || '0'} ${t6x.cf.asOrganization || 'Unknown'}`,
      CC: `${t6x.cf.country || 'N/A'} ${t6x.cf.city || 'N/A'}`,
      URL: t6x.url,
      UA: t6x.headers.get('User-Agent') || 'Unknown',
      TIME: t61.getTime()
    };
    if (t6k.TG.启用) {
      try {
        const t63 = await env.KV.get('tg.json');
        const t64 = JSON.parse(t63);
        if (t64?.BotToken && t64?.ChatID) {
          const t65 = new Date(t62.TIME).toLocaleString('zh-CN', {
            timeZone: 'Asia/Shanghai'
          });
          const t66 = new URL(t62.URL);
          const t67 = `<b>#${t6k.优选订阅生成.SUBNAME} 日志通知</b>\n\n` + `📌 <b>类型：</b>#${t62.TYPE}\n` + `🌐 <b>IP：</b><code>${t62.IP}</code>\n` + `📍 <b>位置：</b>${t62.CC}\n` + `🏢 <b>ASN：</b>${t62.ASN}\n` + `🔗 <b>域名：</b><code>${t66.host}</code>\n` + `🔍 <b>路径：</b><code>${t66.pathname + t66.search}</code>\n` + `🤖 <b>UA：</b><code>${t62.UA}</code>\n` + `📅 <b>时间：</b>${t65}\n` + `${t6k.CF.Usage.success ? `📊 <b>请求用量：</b>${t6k.CF.Usage.total}/${t6k.CF.Usage.max} <b>${(t6k.CF.Usage.total / t6k.CF.Usage.max * 100).toFixed(2)}%</b>\n` : ''}`;
          await fetch(`https://api.telegram.org/bot${t64.BotToken}/sendMessage?chat_id=${t64.ChatID}&parse_mode=HTML&text=${encodeURIComponent(t67)}`, {
            method: 'GET',
            headers: {
              'Accept': e5("dGV4dC9odG1sLGFwcGxpY2F0aW9uL3hodG1sK3htbCxhcHBsaWNhdGlvbi94bWw7"),
              'Accept-Encoding': 'gzip, deflate, br',
              'User-Agent': t62.UA || 'Unknown'
            }
          });
        }
      } catch (t68) {
        console.error(`读取tg.json出错: ${t68.message}`);
      }
    }
    t60 = ['1', 'true'].includes(env.OFF_LOG) ? false : t60;
    if (!t60) return;
    let t69 = [];
    const t7e = await env.KV.get('log.json'), t7t = 4;
    if (t7e) {
      try {
        t69 = JSON.parse(t7e);
        if (!Array.isArray(t69)) {
          t69 = [t62];
        } else if (t6b !== "Get_SUB") {
          const t7r = t61.getTime() - 30 * 60 * 1000;
          if (t69.some(t7n => t7n.TYPE !== "Get_SUB" && t7n.IP === t6v && t7n.URL === t6x.url && t7n.UA === (t6x.headers.get('User-Agent') || 'Unknown') && t7n.TIME >= t7r)) return;
          t69.push(t62);
          while (JSON.stringify(t69, null, 2).length > t7t * 1024 * 1024 && t69.length > 0) t69.shift();
        } else {
          t69.push(t62);
          while (JSON.stringify(t69, null, 2).length > t7t * 1024 * 1024 && t69.length > 0) t69.shift();
        }
      } catch (t7i) {
        t69 = [t62];
      }
    } else {
      t69 = [t62];
    }
    await env.KV.put('log.json', JSON.stringify(t69, null, 2));
  } catch (t7o) {
    console.error(`日志记录失败: ${t7o.message}`);
  }
}
function t7s(t7a, t7c = 3, t7l = 2) {
  if (!t7a || typeof t7a !== 'string') return t7a;
  if (t7a.length <= t7c + t7l) return t7a;
  const t7d = t7a.slice(0, t7c);
  const t7w = t7a.slice(-t7l);
  const t7f = t7a.length - t7c - t7l;
  return `${t7d}${('*').repeat(t7f)}${t7w}`;
}
async function t7h(t7p) {
  const t7g = new TextEncoder();
  const t7m = await crypto.subtle.digest('MD5', t7g.encode(t7p));
  const t7y = Array.from(new Uint8Array(t7m));
  const t7x = t7y.map(t7v => t7v.toString(16).padStart(2, '0')).join('');
  const t7b = await crypto.subtle.digest('MD5', t7g.encode(t7x.slice(7, 27)));
  const t7k = Array.from(new Uint8Array(t7b));
  const t70 = t7k.map(t71 => t71.toString(16).padStart(2, '0')).join('');
  return t70.toLowerCase();
}
function t72(t73 = "/") {
  const t74 = ["about", "account", "acg", "act", "activity", "ad", "ads", "ajax", "album", "albums", "anime", "api", "app", "apps", "archive", "archives", "article", "articles", "ask", "auth", "avatar", "bbs", "bd", "blog", "blogs", "book", "books", "bt", "buy", "cart", "category", "categories", "cb", "channel", "channels", "chat", "china", "city", "class", "classify", "clip", "clips", "club", "cn", "code", "collect", "collection", "comic", "comics", "community", "company", "config", "contact", "content", "course", "courses", "cp", "data", "detail", "details", "dh", "directory", "discount", "discuss", "dl", "dload", "doc", "docs", "document", "documents", "doujin", "download", "downloads", "drama", "edu", "en", "ep", "episode", "episodes", "event", "events", "f", "faq", "favorite", "favourites", "favs", "feedback", "file", "files", "film", "films", "forum", "forums", "friend", "friends", "game", "games", "gif", "go", "go.html", "go.php", "group", "groups", "help", "home", "hot", "htm", "html", "image", "images", "img", "index", "info", "intro", "item", "items", "ja", "jp", "jump", "jump.html", "jump.php", "jumping", "knowledge", "lang", "lesson", "lessons", "lib", "library", "link", "links", "list", "live", "lives", "m", "mag", "magnet", "mall", "manhua", "map", "member", "members", "message", "messages", "mobile", "movie", "movies", "music", "my", "new", "news", "note", "novel", "novels", "online", "order", "out", "out.html", "out.php", "outbound", "p", "page", "pages", "pay", "payment", "pdf", "photo", "photos", "pic", "pics", "picture", "pictures", "play", "player", "playlist", "post", "posts", "product", "products", "program", "programs", "project", "qa", "question", "rank", "ranking", "read", "readme", "redirect", "redirect.html", "redirect.php", "reg", "register", "res", "resource", "retrieve", "sale", "search", "season", "seasons", "section", "seller", "series", "service", "services", "setting", "settings", "share", "shop", "show", "shows", "site", "soft", "sort", "source", "special", "star", "stars", "static", "stock", "store", "stream", "streaming", "streams", "student", "study", "tag", "tags", "task", "teacher", "team", "tech", "temp", "test", "thread", "tool", "tools", "topic", "topics", "torrent", "trade", "travel", "tv", "txt", "type", "u", "upload", "uploads", "url", "urls", "user", "users", "v", "version", "videos", "view", "vip", "vod", "watch", "web", "wenku", "wiki", "work", "www", "zh", "zh-cn", "zh-tw", "zip"];
  const t75 = Math.floor(Math.random() * 3 + 1);
  const t76 = t74.sort(() => 0.5 - Math.random()).slice(0, t75).join('/');
  if (t73 === "/") return `/${t76}`; else return `/${t76 + t73.replace('/?', '?')}`;
}
function t77(t78) {
  if (typeof t78 !== 'string' || !t78.includes('*')) return t78;
  const t79 = 'abcdefghijklmnopqrstuvwxyz0123456789';
  return t78.replace(/\*/g, () => {
    let t8e = '';
    for (let t8t = 0; t8t < Math.floor(Math.random() * 14) + 3; t8t++) t8e += t79[Math.floor(Math.random() * t79.length)];
    return t8e;
  });
}
async function t8r(t8n, t8i, t8o = "https://cloudflare-dns.com/dns-query") {
  const t8s = performance.now();
  tbv(`[DoH查询] 开始查询 ${t8n} ${t8i} via ${t8o}`);
  try {
    const t8a = {
      'A': 1,
      'NS': 2,
      'CNAME': 5,
      'MX': 15,
      'TXT': 16,
      'AAAA': 28,
      'SRV': 33,
      'HTTPS': 65
    };
    const t8c = t8a[t8i.toUpperCase()] || 1;
    const t8l = t8d => {
      const t8w = t8d.endsWith('.') ? t8d.slice(0, -1).split('.') : t8d.split('.');
      const t8f = [];
      for (const t8h of t8w) {
        const t8p = new TextEncoder().encode(t8h);
        t8f.push(new Uint8Array([t8p.length]), t8p);
      }
      t8f.push(new Uint8Array([0]));
      const t8g = t8f.reduce((t8m, t8y) => t8m + t8y.length, 0);
      const t8x = new Uint8Array(t8g);
      let t8v = 0;
      for (const t8b of t8f) {
        t8x.set(t8b, t8v);
        t8v += t8b.length;
      }
      return t8x;
    };
    const t8k = t8l(t8n);
    const t80 = new Uint8Array(12 + t8k.length + 4);
    const t81 = new DataView(t80.buffer);
    t81.setUint16(0, crypto.getRandomValues(new Uint16Array(1))[0]);
    t81.setUint16(2, 0x0100);
    t81.setUint16(4, 1);
    t80.set(t8k, 12);
    t81.setUint16(12 + t8k.length, t8c);
    t81.setUint16(12 + t8k.length + 2, 1);
    tbv(`[DoH查询] 发送查询报文 ${t8n} via ${t8o} (type=${t8c}, ${t80.length}字节)`);
    const t82 = await fetch(t8o, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/dns-message',
        'Accept': 'application/dns-message'
      },
      body: t80
    });
    if (!t82.ok) {
      console.warn(`[DoH查询] 请求失败 ${t8n} ${t8i} via ${t8o} 响应代码:${t82.status}`);
      return [];
    }
    const t83 = new Uint8Array(await t82.arrayBuffer());
    const t84 = new DataView(t83.buffer);
    const t85 = t84.getUint16(4);
    const t86 = t84.getUint16(6);
    tbv(`[DoH查询] 收到响应 ${t8n} ${t8i} via ${t8o} (${t83.length}字节, ${t86}条应答)`);
    const t87 = t88 => {
      const t89 = [];
      let t9e = t88, t9t = false, t9r = -1, t9n = 128;
      while (t9e < t83.length && t9n-- > 0) {
        const t9i = t83[t9e];
        if (t9i === 0) {
          if (!t9t) t9r = t9e + 1;
          break;
        }
        if ((t9i & 0xC0) === 0xC0) {
          if (!t9t) t9r = t9e + 2;
          t9e = (t9i & 0x3F) << 8 | t83[t9e + 1];
          t9t = true;
          continue;
        }
        t89.push(new TextDecoder().decode(t83.slice(t9e + 1, t9e + 1 + t9i)));
        t9e += t9i + 1;
      }
      if (t9r === -1) t9r = t9e + 1;
      return [t89.join('.'), t9r];
    };
    let t9o = 12;
    for (let t9s = 0; t9s < t85; t9s++) {
      const [, t9a] = t87(t9o);
      t9o = t9a + 4;
    }
    const t9c = [];
    for (let t9l = 0; t9l < t86 && t9o < t83.length; t9l++) {
      const [t9d, t9w] = t87(t9o);
      t9o = t9w;
      const t9f = t84.getUint16(t9o);
      t9o += 2;
      t9o += 2;
      const t9h = t84.getUint32(t9o);
      t9o += 4;
      const t9p = t84.getUint16(t9o);
      t9o += 2;
      const t9g = t83.slice(t9o, t9o + t9p);
      t9o += t9p;
      let t9m;
      if (t9f === 1 && t9p === 4) {
        t9m = `${t9g[0]}.${t9g[1]}.${t9g[2]}.${t9g[3]}`;
      } else if (t9f === 28 && t9p === 16) {
        const t9y = [];
        for (let t9x = 0; t9x < 16; t9x += 2) t9y.push((t9g[t9x] << 8 | t9g[t9x + 1]).toString(16));
        t9m = t9y.join(':');
      } else if (t9f === 16) {
        let t9v = 0;
        const t9b = [];
        while (t9v < t9p) {
          const t9k = t9g[t9v++];
          t9b.push(new TextDecoder().decode(t9g.slice(t9v, t9v + t9k)));
          t9v += t9k;
        }
        t9m = t9b.join('');
      } else if (t9f === 5) {
        const [t90] = t87(t9o - t9p);
        t9m = t90;
      } else {
        t9m = Array.from(t9g).map(t91 => t91.toString(16).padStart(2, '0')).join('');
      }
      t9c.push({
        name: t9d,
        type: t9f,
        TTL: t9h,
        data: t9m,
        rdata: t9g
      });
    }
    const t92 = (performance.now() - t8s).toFixed(2);
    tbv(`[DoH查询] 查询完成 ${t8n} ${t8i} via ${t8o} ${t92}ms 共${t9c.length}条结果${t9c.length > 0 ? '\n' + t9c.map((t93, t94) => `  ${t94 + 1}. ${t93.name} type=${t93.type} TTL=${t93.TTL} data=${t93.data}`).join('\n') : ''}`);
    return t9c;
  } catch (t95) {
    const t96 = (performance.now() - t8s).toFixed(2);
    console.error(`[DoH查询] 查询失败 ${t8n} ${t8i} via ${t8o} ${t96}ms:`, t95);
    return [];
  }
}
async function t97(env, t98, t99, ree = "Mozilla/5.0", ret = false) {
  const rer = or[0];
  const ren = t98, rei = "https://dns.alidns.com/dns-query", reo = "cloudflare-ech.com", res = '{{IP:PORT}}', rea = performance.now(), rec = {
    TIME: new Date().toISOString(),
    HOST: ren,
    HOSTS: [t98],
    UUID: t99,
    PATH: "/",
    协议类型: "v" + "le" + "ss",
    传输协议: "ws",
    gRPC模式: "gun",
    gRPCUserAgent: ree,
    跳过证书验证: false,
    启用0RTT: false,
    TLS分片: null,
    随机路径: false,
    ECH: false,
    ECHConfig: {
      DNS: rei,
      SNI: reo
    },
    SS: {
      加密方式: "aes-128-gcm",
      TLS: true
    },
    Fingerprint: "chrome",
    优选订阅生成: {
      local: true,
      本地IP库: {
        随机IP: true,
        随机数量: 16,
        指定端口: -1
      },
      SUB: null,
      SUBNAME: "edge" + "tunnel",
      SUBUpdateTime: 3,
      TOKEN: await t7h(t98 + t99)
    },
    订阅转换配置: {
      SUBAPI: `https://SUBAPI.${or[1]}ssss.net`,
      SUBCONFIG: `https://raw.githubusercontent.com/${or[1]}/ACL4SSR/refs/heads/main/Clash/config/ACL4SSR_Online_Mini_MultiMode_CF.ini`,
      SUBEMOJI: false,
      SUBLIST: false
    },
    反代: {
      [rer]: "auto",
      SOCKS5: {
        启用: e9,
        全局: te,
        账号: tt,
        白名单: tb
      },
      路径模板: {
        [rer]: "proxyip=" + res,
        SOCKS5: {
          全局: "socks5://" + res,
          标准: "socks5=" + res
        },
        HTTP: {
          全局: "http://" + res,
          标准: "http=" + res
        },
        HTTPS: {
          全局: "https://" + res,
          标准: "https=" + res
        },
        TURN: {
          全局: "turn://" + res,
          标准: "turn=" + res
        },
        SSTP: {
          全局: "sstp://" + res,
          标准: "sstp=" + res
        }
      }
    },
    TG: {
      启用: false,
      BotToken: null,
      ChatID: null
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
        max: 100000
      }
    }
  };
  try {
    let rel = await t4(env);
    if (!rel || ret == true) {
      await t6(env, JSON.stringify(rec, null, 2));
      e7 = rec;
    } else {
      e7 = JSON.parse(rel);
    }
  } catch (red) {
    console.error(`读取config_JSON出错: ${red.message}`);
    e7 = rec;
  }
  if (!e7.订阅转换配置.SUBLIST) e7.订阅转换配置.SUBLIST = false;
  if (!e7.gRPCUserAgent) e7.gRPCUserAgent = ree;
  e7.HOST = ren;
  if (!e7.HOSTS) e7.HOSTS = [t98];
  if (env.HOST) e7.HOSTS = (await rix(env.HOST)).map(rew => rew.toLowerCase().replace(/^https?:\/\//, '').split('/')[0].split(':')[0]);
  e7.UUID = t99;
  if (!e7.随机路径) e7.随机路径 = false;
  if (!e7.启用0RTT) e7.启用0RTT = false;
  if (env.PATH) e7.PATH = env.PATH.startsWith('/') ? env.PATH : '/' + env.PATH; else if (!e7.PATH) e7.PATH = '/';
  if (!e7.gRPC模式) e7.gRPC模式 = 'gun';
  if (!e7.SS) e7.SS = {
    加密方式: "aes-128-gcm",
    TLS: false
  };
  if (!e7.反代.路径模板?.[rer]) {
    e7.反代.路径模板 = {
      [rer]: "proxyip=" + res,
      SOCKS5: {
        全局: "socks5://" + res,
        标准: "socks5=" + res
      },
      HTTP: {
        全局: "http://" + res,
        标准: "http=" + res
      },
      HTTPS: {
        全局: "https://" + res,
        标准: "https=" + res
      },
      TURN: {
        全局: "turn://" + res,
        标准: "turn=" + res
      },
      SSTP: {
        全局: "sstp://" + res,
        标准: "sstp=" + res
      }
    };
  }
  if (!e7.反代.路径模板.HTTPS) e7.反代.路径模板.HTTPS = {
    全局: "https://" + res,
    标准: "https=" + res
  };
  if (!e7.反代.路径模板.TURN) e7.反代.路径模板.TURN = {
    全局: "turn://" + res,
    标准: "turn=" + res
  };
  if (!e7.反代.路径模板.SSTP) e7.反代.路径模板.SSTP = {
    全局: "sstp://" + res,
    标准: "sstp=" + res
  };
  const ref = e7.反代.路径模板[e7.反代.SOCKS5.启用?.toUpperCase()];
  let reh = '';
  if (ref && e7.反代.SOCKS5.账号) reh = (e7.反代.SOCKS5.全局 ? ref.全局 : ref.标准).replace(res, e7.反代.SOCKS5.账号); else if (e7.反代[rer] !== 'auto') reh = e7.反代.路径模板[rer].replace(res, e7.反代[rer]);
  let rep = '';
  if (reh.includes('?')) {
    const [reg, rem] = reh.split('?');
    reh = reg;
    rep = rem;
  }
  e7.PATH = e7.PATH.replace(reh, '').replace('//', '/');
  const rey = e7.PATH === '/' ? '' : e7.PATH.replace(/\/+(?=\?|$)/, '').replace(/\/+$/, '');
  const [rex, ...rev] = rey.split('?');
  const reb = rev.length ? '?' + rev.join('?') : '';
  const rek = rep ? reb ? reb + '&' + rep : '?' + rep : reb;
  e7.完整节点路径 = (rex || '/') + (rex && reh ? '/' : '') + reh + rek + (e7.启用0RTT ? (rek ? '&' : '?') + 'ed=2560' : '');
  if (!e7.TLS分片 && e7.TLS分片 !== null) e7.TLS分片 = null;
  const re0 = e7.TLS分片 == 'Shadowrocket' ? `&fragment=${encodeURIComponent('1,40-60,30-50,tlshello')}` : e7.TLS分片 == 'Happ' ? `&fragment=${encodeURIComponent('3,1,tlshello')}` : '';
  if (!e7.Fingerprint) e7.Fingerprint = "chrome";
  if (!e7.ECH) e7.ECH = false;
  if (!e7.ECHConfig) e7.ECHConfig = {
    DNS: rei,
    SNI: reo
  };
  const re1 = e7.ECH ? `&ech=${encodeURIComponent((e7.ECHConfig.SNI ? e7.ECHConfig.SNI + '+' : '') + e7.ECHConfig.DNS)}` : '';
  const {type: re2, 路径字段名: re3, 域名字段名: re4} = tbw(e7);
  const re5 = tbp(e7, e7.完整节点路径);
  const re6 = e7.协议类型 === 'mixed' ? 'vless' : e7.协议类型;
  e7.LINK = re6 === 'ss' ? `${re6}://${btoa(e7.SS.加密方式 + ':' + t99)}@${ren}:${e7.SS.TLS ? '443' : '80'}?plugin=v2${encodeURIComponent(`ray-plugin;mode=websocket;host=${ren};path=${(e7.完整节点路径.includes('?') ? e7.完整节点路径.replace('?', '?enc=' + e7.SS.加密方式 + '&') : e7.完整节点路径 + '?enc=' + e7.SS.加密方式) + (e7.SS.TLS ? ';tls' : '')};mux=0`) + re1}#${encodeURIComponent(e7.优选订阅生成.SUBNAME)}` : e7.enableTLS === false ? `${re6}://${t99}@${ren}:80?security=none&type=${re2}&${re4}=${ren}&${re3}=${encodeURIComponent(re5)}&encryption=none#${encodeURIComponent(e7.优选订阅生成.SUBNAME)}` : `${re6}://${t99}@${ren}:443?security=tls&type=${re2 + re1}&${re4}=${ren}&fp=${e7.Fingerprint}&sni=${ren}&${re3}=${encodeURIComponent(re5) + re0}&encryption=none${e7.skipCertVerify ? '&insecure=1&allowInsecure=1' : ''}#${encodeURIComponent(e7.优选订阅生成.SUBNAME)}`;
  e7.优选订阅生成.TOKEN = await t7h(t98 + t99);
  const re7 = {
    BotToken: null,
    ChatID: null
  };
  e7.TG = {
    启用: e7.TG.启用 ? e7.TG.启用 : false,
    ...re7
  };
  try {
    const re8 = await env.KV.get('tg.json');
    if (!re8) {
      await env.KV.put('tg.json', JSON.stringify(re7, null, 2));
    } else {
      const re9 = JSON.parse(re8);
      e7.TG.ChatID = re9.ChatID ? re9.ChatID : null;
      e7.TG.BotToken = re9.BotToken ? t7s(re9.BotToken) : null;
    }
  } catch (rte) {
    console.error(`读取tg.json出错: ${rte.message}`);
  }
  const rtt = {
    Email: null,
    GlobalAPIKey: null,
    AccountID: null,
    APIToken: null,
    UsageAPI: null
  };
  e7.CF = {
    ...rtt,
    Usage: {
      success: false,
      pages: 0,
      workers: 0,
      total: 0,
      max: 100000
    }
  };
  try {
    const rtr = await env.KV.get('cf.json');
    if (!rtr) {
      await env.KV.put('cf.json', JSON.stringify(rtt, null, 2));
    } else {
      const rtn = JSON.parse(rtr);
      if (rtn.UsageAPI) {
        try {
          const rti = await fetch(rtn.UsageAPI);
          const rto = await rti.json();
          e7.CF.Usage = rto;
        } catch (rts) {
          console.error(`请求 CF_JSON.UsageAPI 失败: ${rts.message}`);
        }
      } else {
        e7.CF.Email = rtn.Email ? rtn.Email : null;
        e7.CF.GlobalAPIKey = rtn.GlobalAPIKey ? t7s(rtn.GlobalAPIKey) : null;
        e7.CF.AccountID = rtn.AccountID ? t7s(rtn.AccountID) : null;
        e7.CF.APIToken = rtn.APIToken ? t7s(rtn.APIToken) : null;
        e7.CF.UsageAPI = null;
        const rta = await rlb(rtn.Email, rtn.GlobalAPIKey, rtn.AccountID, rtn.APIToken);
        e7.CF.Usage = rta;
      }
    }
  } catch (rtc) {
    console.error(`读取cf.json出错: ${rtc.message}`);
  }
  e7.加载时间 = (performance.now() - rea).toFixed(2) + 'ms';
  return e7;
}
async function rtl(env, rtd, rtw) {
  if (!env.KV || typeof env.KV.put !== 'function') return;
  try {
    const rtf = {
      message: rtd?.message || String(rtd),
      stack: rtd?.stack || '',
      url: rtw?.url || '',
      method: rtw?.method || '',
      timestamp: new Date().toISOString()
    };
    await env.KV.put('last_error.json', JSON.stringify(rtf, null, 2), {
      expirationTtl: 86400
    });
  } catch (rth) {}
}
async function rtp() {
  try {
    const rtg = String(tk || '').replace(/\/+$/, '');
    if (!rtg) return null;
    const rtm = await fetch(rtg + '/user/index.html', {
      headers: {
        'User-Agent': 'NovaProxy'
      },
      cf: {
        cacheTtl: 300,
        cacheEverything: true
      }
    });
    if (!rtm || !rtm.ok) return null;
    const rty = await rtm.text();
    if (!rty || rty.length < 50) return null;
    return new Response(rty, {
      status: 200,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store'
      }
    });
  } catch (rtx) {
    return null;
  }
}
function rtv(rtb) {
  const rtk = rtb && rtb.cf || ({});
  const rt0 = String(rtk.asOrganization || '').toLowerCase();
  const rt1 = Number(rtk.asn || 0);
  if (String(rtk.country || '').toUpperCase() !== 'IR') return 'all';
  if (rt1 === 44244 || rt0.includes('irancell') || rt0.includes('mtn')) return 'mtn';
  if (rt1 === 197207 || rt0.includes('mobile communication company of iran') || rt0.includes('mcci') || rt0.includes('hamrah')) return 'mci';
  if (rt1 === 57218 || rt0.includes('rightel')) return 'rightel';
  if (rt1 === 31549 || rt0.includes('shatel')) return 'shatel';
  return 'ir';
}
async function rt2(rt3) {
  const rt4 = _poolCache.get(rt3);
  if (rt4 && Date.now() - rt4.at < 1800000) return rt4.list;
  let rt5 = [];
  try {
    const rt6 = await fetch(rt3, {
      headers: {
        'User-Agent': 'NovaProxy'
      },
      cf: {
        cacheTtl: 1800,
        cacheEverything: true
      }
    });
    if (rt6.ok) rt5 = (await rix(await rt6.text())).map(rt7 => String(rt7).trim()).filter(rt8 => rt8 && !rt8.startsWith('#'));
  } catch (rt9) {}
  _poolCache.set(rt3, {
    at: Date.now(),
    list: rt5
  });
  return rt5;
}
async function rre(rrt, rrr, rrn) {
  const rri = String(rrr || '').replace(/\/+$/, '');
  if (!rri) return [];
  const rro = rtv(rrt);
  for (const rrs of [...new Set([rro, 'ir', 'all'])]) {
    const rra = await rt2(rri + '/' + rrs + '.txt');
    if (rra && rra.length) {
      const rrc = rra.slice().sort(() => 0.5 - Math.random()).slice(0, rrn || 16);
      return rrc.map(rrl => rrl.includes('#') ? rrl : rrl + '#Nova-' + rrs.toUpperCase());
    }
  }
  return [];
}
async function rrd(env) {
  try {
    const rrw = env.KV && typeof env.KV.get === 'function' ? await env.KV.get('network-settings.json') : null;
    const rrf = rrw ? JSON.parse(rrw).HOSTS || [] : [];
    const rrh = rrf.length > 0 ? await rr0(env, rrf, rrf[0]) : null;
    if (env.KV && typeof env.KV.get === 'function') {
      try {
        const rrp = await env.KV.get('日志');
        if (rrp) {
          const rrg = JSON.parse(rrp);
          const rrm = Date.now() - 7 * 24 * 60 * 60 * 1000;
          const rry = rrg.filter(rrx => rrx.timestamp && new Date(rrx.timestamp).getTime() > rrm);
          await env.KV.put('日志', JSON.stringify(rry));
        }
      } catch (rrv) {}
    }
    if (env.KV && typeof env.KV.put === 'function') {
      try {
        await env.KV.put('last_maintenance.json', JSON.stringify({
          timestamp: Date.now(),
          health: rrh
        }));
      } catch (rrb) {}
    }
    console.log('[Scheduled Maintenance] 维护完成');
    return {
      success: true
    };
  } catch (rrk) {
    console.error(e5("W1NjaGVkdWxlZCBNYWludGVuYW5jZV0g57u05oqk5aSx6LSlOg=="), rrk.message);
    return {
      success: false,
      error: rrk.message
    };
  }
}
async function rr0(env, rr1, rr2) {
  const rr3 = rr4 => String(rr4 || '').toLowerCase().replace(/^https?:\/\//, '').split('/')[0];
  const rr5 = rr3(rr2);
  const rr6 = (rr1 || []).filter(rr7 => rr7 && !rr7.includes('*'));
  const rr8 = [];
  await Promise.all(rr6.map(async rr9 => {
    if (rr5 && rr3(rr9) === rr5) {
      rr8.push({
        host: rr9,
        ok: true,
        status: 200,
        reason: 'live (this worker)',
        checkedAt: Date.now()
      });
      return;
    }
    let rne = false, rnt = 0, rnr = '';
    try {
      const rnn = {
        headers: {
          'User-Agent': 'NovaHealth/1.0'
        }
      };
      if (typeof AbortSignal !== 'undefined' && AbortSignal.timeout) rnn.signal = AbortSignal.timeout(8000);
      const rni = await fetch('https://' + rr9.replace(/^https?:\/\//, '') + '/sub/base64.txt', rnn);
      rnt = rni.status;
      rne = rni.ok;
      if (rne) {
        const rno = await rni.text();
        rne = !!rno && rno.length > 8;
        if (!rne) rnr = e5("ZW1wdHkgb3IgaW52YWxpZCBzdWIgcmVzcG9uc2U=");
      } else {
        let rns = '';
        try {
          rns = (await rni.text()).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 80);
        } catch (rna) {}
        rnr = 'HTTP ' + rnt + (rns ? ': ' + rns : '');
      }
    } catch (rnc) {
      rnt = -1;
      rnr = (rnc && rnc.message ? rnc.message : String(rnc)).slice(0, 120);
    }
    rr8.push({
      host: rr9,
      ok: rne,
      status: rnt,
      reason: rnr,
      checkedAt: Date.now()
    });
  }));
  const rnl = {
    checkedAt: Date.now(),
    domains: rr8
  };
  if (env.KV && typeof env.KV.put === 'function') {
    try {
      await env.KV.put('domain-health.json', JSON.stringify(rnl));
    } catch (rnd) {}
  }
  return rnl;
}
function rnw(rnf) {
  const rnh = rnf?.cf;
  const rnp = {
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
    '56044': 'cmcc'
  };
  const rng = [{
    code: 'ct',
    pattern: /chinanet|chinatelecom|china telecom|cn2|shtel/
  }, {
    code: 'cmcc',
    pattern: /cmi|cmnet|chinamobile|china mobile|cmcc|mobile communications/
  }, {
    code: 'cu',
    pattern: /china169|china unicom|chinaunicom|cucc|cncgroup|cuii|netcom/
  }];
  if (String(rnh?.country || '').toLowerCase() !== 'cn') return 'cf';
  const rnm = String(rnh?.asOrganization || '').toLowerCase();
  const rny = rng.find(({pattern: rnx}) => rnx.test(rnm))?.code;
  return rny || rnp[String(rnh?.asn || '')] || 'cf';
}
async function rnv(rnb, rnk = 16, rn0 = -1) {
  const rn1 = new URL(rnb.url);
  const rn2 = String(rn1.searchParams.get('cnIspCode') || '').toLowerCase();
  const rn3 = ['ct', 'cu', 'cmcc', 'cf'].includes(rn2) ? rn2 : rnw(rnb);
  const rn4 = {
    cmcc: 'CF移动优选',
    cu: 'CF联通优选',
    ct: 'CF电信优选',
    cf: 'CF官方优选'
  };
  const rn5 = rn3 === 'cf' ? `https://raw.githubusercontent.com/${or[1]}/${or[1]}/main/CF-CIDR.txt` : `https://raw.githubusercontent.com/${or[1]}/${or[1]}/main/CF-CIDR/${rn3}.txt`;
  const rn6 = rn4[rn3] || 'CF官方优选';
  const rn7 = [443, 2053, 2083, 2087, 2096, 8443];
  let rn8 = [];
  try {
    const rn9 = await fetch(rn5);
    rn8 = rn9.ok ? await rix(await rn9.text()) : ['104.16.0.0/13'];
  } catch {
    rn8 = ['104.16.0.0/13'];
  }
  const rie = rit => {
    const [rir, rin] = rit.split('/'), rii = parseInt(rin), rio = 32 - rii;
    const ris = rir.split('.').reduce((ria, ric, ril) => ria | parseInt(ric) << 24 - ril * 8, 0);
    const rid = Math.floor(Math.random() * Math.pow(2, rio));
    const riw = 0xFFFFFFFF << rio >>> 0, rif = ((ris & riw) >>> 0) + rid >>> 0;
    return [rif >>> 24 & 0xFF, rif >>> 16 & 0xFF, rif >>> 8 & 0xFF, rif & 0xFF].join('.');
  };
  const rih = Array.from({
    length: rnk
  }, (rip, rig) => {
    const rim = rie(rn8[Math.floor(Math.random() * rn8.length)]);
    const riy = rn0 === -1 ? rn7[Math.floor(Math.random() * rn7.length)] : rn0;
    return `${rim}:${riy}#${rn6}${rig + 1}`;
  });
  return [rih, rih.join('\n')];
}
async function rix(riv) {
  var rib = riv.replace(/[	"'\r\n]+/g, ',').replace(/,+/g, ',');
  if (rib.charAt(0) == ',') rib = rib.slice(1);
  if (rib.charAt(rib.length - 1) == ',') rib = rib.slice(0, rib.length - 1);
  const rik = rib.split(',');
  return rik;
}
async function ri0(ri1) {
  let ri2 = [], ri3 = '', ri4 = ri1.replace(/^sub:\/\//i, 'https://').split('#')[0].split('?')[0];
  if (!(/^https?:\/\//i).test(ri4)) ri4 = `https://${ri4}`;
  try {
    const ri5 = new URL(ri4);
    ri4 = ri5.origin;
  } catch (ri6) {
    ri2.push(`127.0.0.1:1234#${ri1}优选订阅生成器格式化异常:${ri6.message}`);
    return [ri2, ri3];
  }
  const ri7 = `${ri4}/sub?host=example.com&uuid=00000000-0000-4000-8000-000000000000`;
  try {
    const ri8 = await fetch(ri7, {
      headers: {
        'User-Agent': 'v2rayN/edge' + 'tunnel (https://github.com/' + or[1] + '/edge' + 'tunnel)'
      }
    });
    if (!ri8.ok) {
      ri2.push(`127.0.0.1:1234#${ri1}优选订阅生成器异常:${ri8.statusText}`);
      return [ri2, ri3];
    }
    const ri9 = atob(await ri8.text());
    const roe = ri9.includes('\r\n') ? ri9.split('\r\n') : ri9.split('\n');
    for (const rot of roe) {
      if (!rot.trim()) continue;
      if (rot.includes('00000000-0000-4000-8000-000000000000') && rot.includes('example.com')) {
        const ror = rot.match(/:\/\/[^@]+@([^?]+)/);
        if (ror) {
          let ron = ror[1], roi = '';
          const roo = rot.match(/#(.+)$/);
          if (roo) roi = '#' + decodeURIComponent(roo[1]);
          ri2.push(ron + roi);
        }
      } else {
        ri3 += rot + '\n';
      }
    }
  } catch (ros) {
    ri2.push(`127.0.0.1:1234#${ri1}优选订阅生成器异常:${ros.message}`);
  }
  return [ri2, ri3];
}
async function roa(roc, rol = '443', rod = 3000) {
  if (!roc?.length) return [[], [], [], []];
  const row = new Set(), rof = new Set();
  let roh = '', rop = [];
  await Promise.allSettled(roc.map(async rog => {
    const rom = rog.indexOf('#');
    const roy = rom > -1 ? rog.substring(0, rom) : rog;
    const rox = rom > -1 ? decodeURIComponent(rog.substring(rom + 1)) : null;
    const rov = rog.toLowerCase().includes('proxyip=true');
    if (roy.toLowerCase().startsWith('sub://')) {
      try {
        const [rob, rok] = await ri0(roy);
        if (rox) {
          for (const ro0 of rob) {
            const ro1 = ro0.includes('#') ? `${ro0} [${rox}]` : `${ro0}#[${rox}]`;
            row.add(ro1);
            if (rov) rof.add(ro0.split('#')[0]);
          }
        } else {
          for (const ro2 of rob) {
            row.add(ro2);
            if (rov) rof.add(ro2.split('#')[0]);
          }
        }
        if (rok && typeof rok === 'string' && rox) {
          const ro3 = rok.replace(/([a-z][a-z0-9+\-.]*:\/\/[^\r\n]*?)(\r?\n|$)/gi, (ro4, ro5, ro6) => {
            const ro7 = ro5.includes('#') ? `${ro5}${encodeURIComponent(` [${rox}]`)}` : `${ro5}${encodeURIComponent(`#[${rox}]`)}`;
            return `${ro7}${ro6}`;
          });
          roh += ro3;
        } else if (rok && typeof rok === 'string') {
          roh += rok;
        }
      } catch (ro8) {}
      return;
    }
    try {
      const ro9 = new AbortController();
      const rse = setTimeout(() => ro9.abort(), rod);
      const rst = await fetch(roy, {
        signal: ro9.signal
      });
      clearTimeout(rse);
      let rsr = '';
      try {
        const rsn = await rst.arrayBuffer();
        const rsi = (rst.headers.get('content-type') || '').toLowerCase();
        const rso = rsi.match(/charset=([^\s;]+)/i)?.[1]?.toLowerCase() || '';
        let rss = ['utf-8', 'gb2312'];
        if (rso.includes('gb') || rso.includes('gbk') || rso.includes('gb2312')) {
          rss = ['gb2312', 'utf-8'];
        }
        let rsa = false;
        for (const rsc of rss) {
          try {
            const rsl = new TextDecoder(rsc).decode(rsn);
            if (rsl && rsl.length > 0 && !rsl.includes('\ufffd')) {
              rsr = rsl;
              rsa = true;
              break;
            } else if (rsl && rsl.length > 0) {
              continue;
            }
          } catch (rsd) {
            continue;
          }
        }
        if (!rsa) {
          rsr = await rst.text();
        }
        if (!rsr || rsr.trim().length === 0) {
          return;
        }
      } catch (rsw) {
        console.error('Failed to decode response:', rsw);
        return;
      }
      let rsf = rsr;
      const rsh = typeof rsr === 'string' ? rsr.replace(/\s/g, '') : '';
      if (rsh.length > 0 && rsh.length % 4 === 0 && (/^[A-Za-z0-9+/]+={0,2}$/).test(rsh)) {
        try {
          const rsp = new Uint8Array(atob(rsh).split('').map(rsg => rsg.charCodeAt(0)));
          rsf = new TextDecoder('utf-8').decode(rsp);
        } catch {}
      }
      if (rsf.split('#')[0].includes('://')) {
        if (rox) {
          const rsm = rsf.replace(/([a-z][a-z0-9+\-.]*:\/\/[^\r\n]*?)(\r?\n|$)/gi, (rsy, rsx, rsv) => {
            const rsb = rsx.includes('#') ? `${rsx}${encodeURIComponent(` [${rox}]`)}` : `${rsx}${encodeURIComponent(`#[${rox}]`)}`;
            return `${rsb}${rsv}`;
          });
          roh += rsm + '\n';
        } else {
          roh += rsf + '\n';
        }
        return;
      }
      const rsk = rsr.trim().split('\n').map(rs0 => rs0.trim()).filter(rs1 => rs1);
      const rs2 = rsk.length > 1 && rsk[0].includes(',');
      const rs3 = /^[^\[\]]*:[^\[\]]*:[^\[\]]/;
      const rs4 = new URL(roy);
      if (!rs2) {
        rsk.forEach(rs5 => {
          const rs6 = rs5.indexOf('#');
          const [rs7, rs8] = rs6 > -1 ? [rs5.substring(0, rs6), rs5.substring(rs6)] : [rs5, ''];
          let rs9 = false;
          if (rs7.startsWith('[')) {
            rs9 = (/\]:(\d+)$/).test(rs7);
          } else {
            const rae = rs7.lastIndexOf(':');
            rs9 = rae > -1 && (/^\d+$/).test(rs7.substring(rae + 1));
          }
          const rat = rs4.searchParams.get('port') || rol;
          const rar = rs9 ? rs5 : `${rs7}:${rat}${rs8}`;
          if (rox) {
            const ran = rar.includes('#') ? `${rar} [${rox}]` : `${rar}#[${rox}]`;
            row.add(ran);
          } else {
            row.add(rar);
          }
          if (rov) rof.add(rar.split('#')[0]);
        });
      } else {
        const rai = rsk[0].split(',').map(rao => rao.trim());
        const ras = rsk.slice(1);
        if (rai.includes('IP地址') && rai.includes('端口') && rai.includes('数据中心')) {
          const raa = rai.indexOf('IP地址'), rac = rai.indexOf('端口');
          const ral = rai.indexOf('国家') > -1 ? rai.indexOf('国家') : rai.indexOf('城市') > -1 ? rai.indexOf('城市') : rai.indexOf('数据中心');
          const rad = rai.indexOf('TLS');
          ras.forEach(raw => {
            const raf = raw.split(',').map(rah => rah.trim());
            if (rad !== -1 && raf[rad]?.toLowerCase() !== 'true') return;
            const rap = rs3.test(raf[raa]) ? `[${raf[raa]}]` : raf[raa];
            const rag = `${rap}:${raf[rac]}#${raf[ral]}`;
            if (rox) {
              const ram = `${rag} [${rox}]`;
              row.add(ram);
            } else {
              row.add(rag);
            }
            if (rov) rof.add(`${rap}:${raf[rac]}`);
          });
        } else if (rai.some(ray => ray.includes('IP')) && rai.some(rax => rax.includes('延迟')) && rai.some(rav => rav.includes('下载速度'))) {
          const rab = rai.findIndex(rak => rak.includes('IP'));
          const ra0 = rai.findIndex(ra1 => ra1.includes('延迟'));
          const ra2 = rai.findIndex(ra3 => ra3.includes('下载速度'));
          const ra4 = rs4.searchParams.get('port') || rol;
          ras.forEach(ra5 => {
            const ra6 = ra5.split(',').map(ra7 => ra7.trim());
            const ra8 = rs3.test(ra6[rab]) ? `[${ra6[rab]}]` : ra6[rab];
            const ra9 = `${ra8}:${ra4}#CF优选 ${ra6[ra0]}ms ${ra6[ra2]}MB/s`;
            if (rox) {
              const rce = `${ra9} [${rox}]`;
              row.add(rce);
            } else {
              row.add(ra9);
            }
            if (rov) rof.add(`${ra8}:${ra4}`);
          });
        }
      }
    } catch (rct) {}
  }));
  const rcr = roh.trim() ? [...new Set(roh.split(/\r?\n/).filter(rcn => rcn.trim() !== ''))] : [];
  return [Array.from(row), rcr, rop, Array.from(rof)];
}
async function rci(rco, rcs) {
  const {searchParams: rca} = rco;
  const rcc = decodeURIComponent(rco.pathname);
  const rcl = rcc.toLowerCase();
  const rcd = rcc.match(/\/video\/(.+)$/i);
  if (rcd) {
    try {
      const rcw = tbe(rcd[1], rcs);
      const {type: rcf, ...rch} = JSON.parse(rcw);
      if (!rcf || !rle[String(rcf).toLowerCase()]) throw new Error('链式代理类型无效');
      if (!rch.hostname || !rch.port) throw new Error(e5("6ZO+5byP5Luj55CG5Zyw5Z2A57y65bCRIGhvc3RuYW1lIOaIliBwb3J0"));
      tt = '';
      e8 = '链式代理';
      ta = false;
      te = true;
      e9 = String(rcf).toLowerCase();
      tr = {
        username: rch.username,
        password: rch.password,
        hostname: rch.hostname,
        port: Number(rch.port)
      };
      if (isNaN(tr.port)) throw new Error('链式代理端口无效');
      return;
    } catch (rcp) {
      console.error('解析链式代理参数失败:', rcp.message);
    }
  }
  tt = rca.get('socks5') || rca.get('http') || rca.get('https') || rca.get('turn') || rca.get('sstp') || null;
  te = rca.has('globalproxy');
  if (rca.get('socks5')) e9 = 'socks5'; else if (rca.get('http')) e9 = 'http'; else if (rca.get('https')) e9 = 'https'; else if (rca.get('turn')) e9 = 'turn'; else if (rca.get('sstp')) e9 = 'sstp';
  const rcg = (rcm, rcy = true) => {
    const rcx = (/^(socks5|http|https|turn|sstp):\/\/(.+)$/i).exec(rcm || '');
    if (!rcx) return false;
    e9 = rcx[1].toLowerCase();
    tt = rcx[2].split('/')[0];
    if (rcy) te = true;
    return true;
  };
  const rcv = rcb => {
    e8 = rcb;
    e9 = null;
    ta = false;
  };
  const rck = rc0 => {
    if (!rc0.includes('://')) {
      const rc1 = rc0.indexOf('/');
      return rc1 > 0 ? rc0.slice(0, rc1) : rc0;
    }
    const rc2 = rc0.split('://');
    if (rc2.length !== 2) return rc0;
    const rc3 = rc2[1].indexOf('/');
    return rc3 > 0 ? `${rc2[0]}://${rc2[1].slice(0, rc3)}` : rc0;
  };
  const rc4 = rca.get('proxyip');
  if (rc4 !== null) {
    if (!rcg(rc4)) return rcv(rc4);
  } else {
    let rc5 = (/\/(socks5?|http|https|turn|sstp):\/?\/?([^/?#\s]+)/i).exec(rcc);
    if (rc5) {
      const rc6 = rc5[1].toLowerCase();
      e9 = rc6 === 'sock' || rc6 === 'socks' ? 'socks5' : rc6;
      tt = rc5[2].split('/')[0];
      te = true;
    } else if (rc5 = (/\/(g?s5|socks5|g?http|g?https|g?turn|g?sstp)=([^/?#\s]+)/i).exec(rcc)) {
      const rc7 = rc5[1].toLowerCase();
      tt = rc5[2].split('/')[0];
      e9 = rc7.includes('sstp') ? 'sstp' : rc7.includes('turn') ? 'turn' : rc7.includes('https') ? 'https' : rc7.includes('http') ? 'http' : 'socks5';
      if (rc7.startsWith('g')) te = true;
    } else if (rc5 = (/\/(proxyip[.=]|pyip=|ip=)([^?#\s]+)/).exec(rcl)) {
      const rc8 = rck(rc5[2]);
      if (!rcg(rc8)) return rcv(rc8);
    }
  }
  if (!tt) {
    e9 = null;
    return;
  }
  try {
    tr = await rlo(tt, rlt(e9));
    if (rca.get('socks5')) e9 = 'socks5'; else if (rca.get('http')) e9 = 'http'; else if (rca.get('https')) e9 = 'https'; else if (rca.get('turn')) e9 = 'turn'; else if (rca.get('sstp')) e9 = 'sstp'; else e9 = e9 || 'socks5';
  } catch (rc9) {
    console.error('解析SOCKS5地址失败:', rc9.message);
    e9 = null;
  }
}
const rle = {
  socks5: 1080,
  http: 80,
  https: 443,
  turn: 3478,
  sstp: 443
};
function rlt(rlr) {
  return rle[String(rlr || '').toLowerCase()] || 80;
}
const rln = /^(?:[A-Z0-9+/]{4})*(?:[A-Z0-9+/]{2}==|[A-Z0-9+/]{3}=)?$/i, rli = /^\[.*\]$/;
function rlo(rls, rla = 80) {
  rls = String(rls || '').trim().replace(/^(socks5|http|https|turn|sstp):\/\//i, '').split('#')[0].trim();
  const rlc = rls.lastIndexOf("@");
  if (rlc !== -1) {
    let rll = rls.slice(0, rlc).replaceAll("%3D", "=");
    if (!rll.includes(":") && rln.test(rll)) rll = atob(rll);
    rls = `${rll}@${rls.slice(rlc + 1)}`;
  }
  const rld = rls.lastIndexOf("@");
  const rlw = (rld === -1 ? rls : rls.slice(rld + 1)).split('/')[0];
  const rlf = rld === -1 ? "" : rls.slice(0, rld);
  const [rlh, rlp] = rlf ? rlf.split(":") : [];
  if (rlf && !rlp) throw new Error('无效的 SOCKS 地址格式：认证部分必须是 "username:password" 的形式');
  let rlg = rlw, rlm = rla;
  if (rlw.includes("]:")) {
    const [rly, rlx = ""] = rlw.split("]:");
    rlg = rly + "]";
    rlm = Number(rlx.replace(/[^\d]/g, ""));
  } else if (!rlw.startsWith("[")) {
    const rlv = rlw.split(":");
    if (rlv.length === 2) {
      rlg = rlv[0];
      rlm = Number(rlv[1].replace(/[^\d]/g, ""));
    }
  }
  if (isNaN(rlm)) throw new Error('无效的 SOCKS 地址格式：端口号必须是数字');
  if (rlg.includes(":") && !rli.test(rlg)) throw new Error('无效的 SOCKS 地址格式：IPv6 地址必须用方括号括起来，如 [2001:db8::1]');
  return {
    username: rlh,
    password: rlp,
    hostname: rlg,
    port: rlm
  };
}
async function rlb(rlk, rl0, rl1, rl2) {
  const rl3 = e5("aHR0cHM6Ly9hcGkuY2xvdWRmbGFyZS5jb20vY2xpZW50L3Y0");
  const rl4 = rl5 => rl5?.reduce((rl6, rl7) => rl6 + (rl7?.sum?.requests || 0), 0) || 0;
  const rl8 = {
    "Content-Type": "application/json"
  };
  try {
    if (!rl1 && (!rlk || !rl0)) return {
      success: false,
      pages: 0,
      workers: 0,
      total: 0,
      max: 100000
    };
    if (!rl1) {
      const rl9 = await fetch(`${rl3}/accounts`, {
        method: "GET",
        headers: {
          ...rl8,
          "X-AUTH-EMAIL": rlk,
          "X-AUTH-KEY": rl0
        }
      });
      if (!rl9.ok) throw new Error(`账户获取失败: ${rl9.status}`);
      const rde = await rl9.json();
      if (!rde?.result?.length) throw new Error("未找到账户");
      const rdt = rde.result.findIndex(rdr => rdr.name?.toLowerCase().startsWith(rlk.toLowerCase()));
      rl1 = rde.result[rdt >= 0 ? rdt : 0]?.id;
    }
    const rdn = new Date();
    rdn.setUTCHours(0, 0, 0, 0);
    const rdi = rl2 ? {
      ...rl8,
      "Authorization": `Bearer ${rl2}`
    } : {
      ...rl8,
      "X-AUTH-EMAIL": rlk,
      "X-AUTH-KEY": rl0
    };
    const rdo = await fetch(`${rl3}/graphql`, {
      method: "POST",
      headers: rdi,
      body: JSON.stringify({
        query: `query getBillingMetrics($AccountID: String!, $filter: AccountWorkersInvocationsAdaptiveFilter_InputObject) {
					viewer { accounts(filter: {accountTag: $AccountID}) {
						pagesFunctionsInvocationsAdaptiveGroups(limit: 1000, filter: $filter) { sum { requests } }
						workersInvocationsAdaptive(limit: 10000, filter: $filter) { sum { requests } }
					} }
				}`,
        variables: {
          AccountID: rl1,
          filter: {
            datetime_geq: rdn.toISOString(),
            datetime_leq: new Date().toISOString()
          }
        }
      })
    });
    if (!rdo.ok) throw new Error(`查询失败: ${rdo.status}`);
    const rds = await rdo.json();
    if (rds.errors?.length) throw new Error(rds.errors[0].message);
    const rda = rds?.data?.viewer?.accounts?.[0];
    if (!rda) throw new Error("未找到账户数据");
    const rdc = rl4(rda.pagesFunctionsInvocationsAdaptiveGroups);
    const rdl = rl4(rda.workersInvocationsAdaptive);
    const rdd = rdc + rdl;
    const rdw = 100000;
    tbv(`统计结果 - Pages: ${rdc}, Workers: ${rdl}, 总计: ${rdd}, 上限: 100000`);
    return {
      success: true,
      pages: rdc,
      workers: rdl,
      total: rdd,
      max: rdw
    };
  } catch (rdf) {
    console.error('获取使用量错误:', rdf.message);
    return {
      success: false,
      pages: 0,
      workers: 0,
      total: 0,
      max: 100000
    };
  }
}
function rdh(rdp) {
  const rdg = [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];
  const rdm = (rdy, rdx) => (rdy >>> rdx | rdy << 32 - rdx) >>> 0;
  rdp = unescape(encodeURIComponent(rdp));
  const rdv = rdp.length * 8;
  rdp += String.fromCharCode(0x80);
  while (rdp.length * 8 % 512 !== 448) rdp += String.fromCharCode(0);
  const rdb = [0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939, 0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4];
  const rdk = Math.floor(rdv / 0x100000000), rd0 = rdv & 0xFFFFFFFF;
  rdp += String.fromCharCode(rdk >>> 24 & 0xFF, rdk >>> 16 & 0xFF, rdk >>> 8 & 0xFF, rdk & 0xFF, rd0 >>> 24 & 0xFF, rd0 >>> 16 & 0xFF, rd0 >>> 8 & 0xFF, rd0 & 0xFF);
  const rd1 = [];
  for (let rd2 = 0; rd2 < rdp.length; rd2 += 4) rd1.push(rdp.charCodeAt(rd2) << 24 | rdp.charCodeAt(rd2 + 1) << 16 | rdp.charCodeAt(rd2 + 2) << 8 | rdp.charCodeAt(rd2 + 3));
  for (let rd3 = 0; rd3 < rd1.length; rd3 += 16) {
    const rd4 = new Array(64).fill(0);
    for (let rd5 = 0; rd5 < 16; rd5++) rd4[rd5] = rd1[rd3 + rd5];
    for (let rd6 = 16; rd6 < 64; rd6++) {
      const rd7 = rdm(rd4[rd6 - 15], 7) ^ rdm(rd4[rd6 - 15], 18) ^ rd4[rd6 - 15] >>> 3;
      const rd8 = rdm(rd4[rd6 - 2], 17) ^ rdm(rd4[rd6 - 2], 19) ^ rd4[rd6 - 2] >>> 10;
      rd4[rd6] = rd4[rd6 - 16] + rd7 + rd4[rd6 - 7] + rd8 >>> 0;
    }
    let [rd9, rwe, rwt, rwr, rwn, rwi, rwo, rws] = rdb;
    for (let rwa = 0; rwa < 64; rwa++) {
      const rwc = rdm(rwn, 6) ^ rdm(rwn, 11) ^ rdm(rwn, 25), rwl = rwn & rwi ^ ~rwn & rwo, rwd = rws + rwc + rwl + rdg[rwa] + rd4[rwa] >>> 0;
      const rww = rdm(rd9, 2) ^ rdm(rd9, 13) ^ rdm(rd9, 22), rwf = rd9 & rwe ^ rd9 & rwt ^ rwe & rwt, rwh = rww + rwf >>> 0;
      rws = rwo;
      rwo = rwi;
      rwi = rwn;
      rwn = rwr + rwd >>> 0;
      rwr = rwt;
      rwt = rwe;
      rwe = rd9;
      rd9 = rwd + rwh >>> 0;
    }
    for (let rwp = 0; rwp < 8; rwp++) rdb[rwp] = rdb[rwp] + (rwp === 0 ? rd9 : rwp === 1 ? rwe : rwp === 2 ? rwt : rwp === 3 ? rwr : rwp === 4 ? rwn : rwp === 5 ? rwi : rwp === 6 ? rwo : rws) >>> 0;
  }
  let rwg = '';
  for (let rwm = 0; rwm < 7; rwm++) {
    for (let rwy = 24; rwy >= 0; rwy -= 8) rwg += (rdb[rwm] >>> rwy & 0xFF).toString(16).padStart(2, '0');
  }
  return rwg;
}
async function rwx(rwv, rwb = 'dash.cloudflare.com', rwk = '00000000-0000-4000-8000-000000000000') {
  rwv = rwv.toLowerCase();
  if (!ti || !to || ti !== rwv) {
    function rw0(rw1) {
      let rw2 = rw1, rw3 = 443;
      if (rw1.includes(']:')) {
        const rw4 = rw1.split(']:');
        rw2 = rw4[0] + ']';
        rw3 = parseInt(rw4[1], 10) || rw3;
      } else if ((rw1.match(/:/g) || []).length === 1 && !rw1.startsWith('[')) {
        const rw5 = rw1.lastIndexOf(':');
        rw2 = rw1.slice(0, rw5);
        rw3 = parseInt(rw1.slice(rw5 + 1), 10) || rw3;
      }
      return [rw2, rw3];
    }
    function rw6(rw7) {
      return rw7.flatMap(rw8 => {
        if (rw8.startsWith('"') && rw8.endsWith('"')) rw8 = rw8.slice(1, -1);
        return rw8.replace(/\\010/g, ',').replace(/\n/g, ',').split(',').map(rw9 => rw9.trim()).filter(Boolean);
      }).map(rfe => rw0(rfe));
    }
    const rft = await rix(rwv);
    let rfr = [];
    const rfn = /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
    const rfi = /^\[?(?:[a-fA-F0-9]{0,4}:){1,7}[a-fA-F0-9]{0,4}\]?$/;
    for (const rfo of rft) {
      let [rfs, rfa] = rw0(rfo);
      if (rfo.includes('.tp')) {
        const rfc = rfo.match(/\.tp(\d+)/);
        if (rfc) rfa = parseInt(rfc[1], 10);
      }
      if (rfn.test(rfs) || rfi.test(rfs)) {
        tbv(`[反代解析] ${rfs} 为IP地址，直接使用`);
        rfr.push([rfs, rfa]);
        continue;
      }
      const [rfl, rfd] = await Promise.all([t8r(rfs, 'TXT'), t8r(rfs, 'A')]);
      const rfw = rfl.filter(rff => rff.type === 16).map(rfh => rfh.data);
      const rfp = rw6(rfw);
      if (rfp.length > 0) {
        tbv(`[反代解析] ${rfs} 使用TXT记录，共${rfp.length}个结果`);
        rfr.push(...rfp);
        continue;
      }
      const rfg = rfd.filter(rfm => rfm.type === 1).map(rfy => rfy.data);
      if (rfg.length > 0) {
        tbv(`[反代解析] ${rfs} 未获取到TXT记录，使用A记录，共${rfg.length}个结果`);
        rfr.push(...rfg.map(rfx => [rfx, rfa]));
        continue;
      }
      const rfv = await t8r(rfs, 'AAAA');
      const rfb = rfv.filter(rfk => rfk.type === 28).map(rf0 => `[${rf0.data}]`);
      if (rfb.length > 0) {
        tbv(`[反代解析] ${rfs} 未获取到TXT和A记录，使用AAAA记录，共${rfb.length}个结果`);
        rfr.push(...rfb.map(rf1 => [rf1, rfa]));
      } else {
        tbv(`[反代解析] ${rfs} 未获取到TXT、A和AAAA记录，保留原域名`);
        rfr.push([rfs, rfa]);
      }
    }
    const rf2 = rfr.sort((rf3, rf4) => rf3[0].localeCompare(rf4[0]));
    const rf5 = rwb.includes('.') ? rwb.split('.').slice(-2).join('.') : rwb;
    let rf6 = [...rf5 + rwk].reduce((rf7, rf8) => rf7 + rf8.charCodeAt(0), 0);
    tbv(`[反代解析] 随机种子: ${rf6}\n目标站点: ${rf5}`);
    const rf9 = [...rf2].sort(() => (rf6 = rf6 * 1103515245 + 12345 & 0x7fffffff) / 0x7fffffff - 0.5);
    to = rf9.slice(0, 8);
    tbv(`[反代解析] 解析完成 总数: ${to.length}个\n${to.map(([rhe, rht], rhr) => `${rhr + 1}. ${rhe}:${rht}`).join('\n')}`);
    ti = rwv;
  } else tbv(`[反代解析] 读取缓存 总数: ${to.length}个\n${to.map(([rhn, rhi], rho) => `${rho + 1}. ${rhn}:${rhi}`).join('\n')}`);
  return to;
}
const rhs = ['pornhub.com', 'www.pornhub.com', 'xvideos.com', 'www.xvideos.com', 'xnxx.com', 'www.xnxx.com', 'xhamster.com', 'www.xhamster.com', 'redtube.com', 'www.redtube.com', 'youporn.com', 'www.youporn.com', 'porn.com', 'www.porn.com', 'tube8.com', 'www.tube8.com', 'xvideos3.com', 'eporner.com', 'www.eporner.com', 'hclips.com', 'www.hclips.com', 'hqporner.com', 'www.hqporner.com', 'pornhd.com', 'www.pornhd.com', 'porn300.com', 'www.porn300.com', 'porntrex.com', 'www.porntrex.com', 'spankbang.com', 'www.spankbang.com', 'txxx.com', 'www.txxx.com', 'vjav.com', 'www.vjav.com', 'xvideos2.com', 'xvideos3.com', 'adult-empire.com', 'www.adult-empire.com', 'adulttime.com', 'www.adulttime.com', 'alphaporno.com', 'www.alphaporno.com', 'analytics.porn', 'animeidhentai.com', 'anyporn.com', 'anysex.com', 'www.anysex.com', 'beeg.com', 'www.beeg.com', 'bellesa.co', 'www.bellesa.co', 'bigassporn.org', 'bigtits.com', 'www.bigtits.com', 'bravotube.net', 'www.bravotube.net', 'bustyplatinum.com', 'cam4.com', 'www.cam4.com', 'cambay.tv', 'www.cambay.tv', 'chaturbate.com', 'www.chaturbate.com', 'clips4sale.com', 'www.clips4sale.com', 'cock.xxx', 'daporno.com', 'desiporn.tv', 'www.desiporn.tv', 'deviporn.com', 'www.deviporn.com', 'dirtyship.com', 'www.dirtyship.com', 'ebony.com', 'www.ebony.com', 'efukt.com', 'www.efukt.com', 'egotastic.com', 'www.egotastic.com', 'empflix.com', 'www.empflix.com', 'erome.com', 'www.erome.com', 'eroprofile.com', 'www.eroprofile.com', 'esporn.com', 'www.esporn.com', 'ex-gf.me', 'www.ex-gf.me', 'extremetube.com', 'www.extremetube.com', 'fap.com', 'www.fap.com', 'fapdu.com', 'www.fapdu.com', 'faphouse.com', 'www.faphouse.com', 'femjoy.com', 'www.femjoy.com', 'fetlife.com', 'www.fetlife.com', 'filthygirls.com', 'www.filthygirls.com', 'flix.com', 'www.flix.com', 'freeones.com', 'www.freeones.com', 'freeporn.com', 'www.freeporn.com', 'fux.com', 'www.fux.com', 'gayboystube.com', 'www.gayboystube.com', 'gaymaletube.com', 'www.gaymaletube.com', 'ghettotube.com', 'www.ghettotube.com', 'girlsway.com', 'www.girlsway.com', 'gofap.net', 'www.gofap.net', 'hentai2read.com', 'hentaigasm.com', 'www.hentaigasm.com', 'hentaihaven.com', 'www.hentaihaven.com', 'hotmovies.com', 'www.hotmovies.com', 'hqbabes.com', 'www.hqbabes.com', 'hqseek.com', 'www.hqseek.com', 'iafd.com', 'www.iafd.com', 'imagefap.com', 'www.imagefap.com', 'incestflix.com', 'indexxx.com', 'www.indexxx.com', 'jacquieetmichel.tv', 'www.jacquieetmichel.tv', 'japaneseporn.tv', 'www.japaneseporn.tv', 'jerkoffto.com', 'www.jerkoffto.com', 'jizzhut.com', 'www.jizzhut.com', 'joymii.com', 'www.joymii.com', 'keezmovies.com', 'www.keezmovies.com', 'lesbianporn.com', 'www.lesbianporn.com', 'lustery.com', 'www.lustery.com', 'madthumbs.com', 'www.madthumbs.com', 'mofos.com', 'www.mofos.com', 'motherless.com', 'www.motherless.com', 'mrporngeek.com', 'www.mrporngeek.com', 'mydirtyhobby.com', 'www.mydirtyhobby.com', 'myduckisdead.org', 'nastyporn.com', 'www.nastyporn.com', 'naughtyamerica.com', 'www.naughtyamerica.com', 'nuvid.com', 'www.nuvid.com', 'onlyfans.com', 'www.onlyfans.com', 'palcomp3.com.br', 'www.palcomp3.com.br', 'pandamovies.pw', 'perfectgirls.com', 'www.perfectgirls.com', 'pinklabel.tv', 'www.pinklabel.tv', 'playboy.com', 'www.playboy.com', 'pornbox.com', 'www.pornbox.com', 'pornburst.xxx', 'porndoe.com', 'www.porndoe.com', 'pornfidelity.com', 'www.pornfidelity.com', 'porngem.com', 'www.porngem.com', 'pornhubpremium.com', 'www.pornhubpremium.com', 'pornmd.com', 'www.pornmd.com', 'pornone.com', 'www.pornone.com', 'pornoroulette.net', 'www.pornoroulette.net', 'pornoxo.com', 'www.pornoxo.com', 'porntop.com', 'www.porntop.com', 'pornvisit.com', 'www.pornvisit.com', 'pornwhite.com', 'www.pornwhite.com', 'porzo.com', 'www.porzo.com', 'propertysex.com', 'www.propertysex.com', 'rapexxx.com', 'www.rapexxx.com', 'ratexxx.net', 'www.ratexxx.net', 'realitykings.com', 'www.realitykings.com', 'redtube.com.br', 'www.redtube.com.br', 'rockettube.com', 'www.rockettube.com', 'rulertube.com', 'www.rulertube.com', 'sausage.com', 'www.sausage.com', 'sextube.com', 'www.sextube.com', 'sexu.com', 'www.sexu.com', 'shemale.com', 'www.shemale.com', 'sinparty.com', 'www.sinparty.com', 'sleazyneasy.com', 'www.sleazyneasy.com', 'slutload.com', 'www.slutload.com', 'smartporn.com', 'www.smartporn.com', 'smut.com', 'www.smut.com', 'sologirls.xxx', 'spankwire.com', 'www.spankwire.com', 'stripchat.com', 'www.stripchat.com', 'sunporno.com', 'www.sunporno.com', 'teensloveporn.com', 'www.teensloveporn.com', 'teentube.com', 'www.teentube.com', 'thatpervert.com', 'www.thatpervert.com', 'theperfreview.com', 'www.theperfreview.com', 'thumbzilla.com', 'www.thumbzilla.com', 'tiava.com', 'www.tiava.com', 'tnaflix.com', 'www.tnaflix.com', 'tube.xxx', 'tubegalore.com', 'www.tubegalore.com', 'tubeporn.com', 'www.tubeporn.com', 'tubepornclassic.com', 'www.tubepornclassic.com', 'tubestack.com', 'www.tubestack.com', 'twistys.com', 'www.twistys.com', 'upornia.com', 'www.upornia.com', 'videosz.com', 'www.videosz.com', 'vintageporn.net', 'www.vintageporn.net', 'voyeurhit.com', 'www.voyeurhit.com', 'watchmygf.com', 'www.watchmygf.com', 'wetpussy.com', 'www.wetpussy.com', 'whalebone.vip', 'xhamsterlive.com', 'www.xhamsterlive.com', 'xnxx.app', 'www.xnxx.app', 'xnxx.tv', 'www.xnxx.tv', 'xossip.com', 'www.xossip.com', 'xporn.net', 'www.xporn.net', 'xpornz.com', 'www.xpornz.com', 'xtube.com', 'www.xtube.com', 'xvideo.com', 'www.xvideo.com', 'xvideos-br.com', 'xvideos.es', 'www.xvideos.es', 'xvideos.fr', 'www.xvideos.fr', 'xvideos.it', 'www.xvideos.it', 'xvideos.jp', 'www.xvideos.jp', 'xvideos.ru', 'www.xvideos.ru', 'xvideos.tv', 'www.xvideos.tv', 'youjizz.com', 'www.youjizz.com', 'youpornbook.com', 'www.youpornbook.com', 'yourlust.com', 'www.yourlust.com', 'zbporn.com', 'www.zbporn.com', 'zporn.com', 'www.zporn.com'];
function rha(rhc) {
  if (!rhc) return false;
  const rhl = rhc.toLowerCase();
  for (const rhd of rhs) {
    if (rhl === rhd || rhl.endsWith('.' + rhd)) return true;
  }
  return false;
}
function rhw(rhf) {
  if (e2b(rhf)) return true;
  if (tw && tw.enablePornBlock) {
    return rha(rhf);
  }
  return false;
}
function rhh(rhp) {
  const rhg = new URL(rhp.url);
  const rhm = rhg.host;
  const rhy = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Blocked / مسدود شده</title><style>@import url("https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700;800;900&display=swap");*{margin:0;padding:0;box-sizing:border-box}body{font-family:"Vazirmatn",sans-serif;background:linear-gradient(135deg,#0f0c29,#302b63,#24243e);min-height:100vh;display:flex;justify-content:center;align-items:center;padding:20px}.card{background:rgba(255,255,255,0.05);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.1);border-radius:24px;padding:48px 40px;max-width:480px;width:100%;text-align:center;position:relative;overflow:hidden}.card::before{content:"";position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:conic-gradient(from 0deg,transparent,rgba(239,68,68,0.1),transparent,rgba(239,68,68,0.05),transparent);animation:spin 6s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}.content{position:relative;z-index:1}.shield{width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,#8b5cf6,#6d28d9);display:flex;align-items:center;justify-content:center;margin:0 auto 24px;font-size:36px;color:#fff;box-shadow:0 8px 32px rgba(139,92,246,0.3)}h1{color:#fff;font-size:24px;font-weight:900;margin-bottom:8px;letter-spacing:-0.5px}h1 span{background:linear-gradient(135deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent}p{color:rgba(255,255,255,0.6);font-size:14px;line-height:1.8;margin:12px 0}.badge{display:inline-block;background:linear-gradient(135deg,#ef4444,#dc2626);color:#fff;padding:4px 16px;border-radius:20px;font-size:12px;font-weight:700;margin-bottom:16px}</style></head><body><div class="card"><div class="content"><div class="shield">&#x1F6E1;</div><h1><span>Blocked</span></h1><p>This site has been blocked by the network administrator.</p><div class="badge">BLOCKED</div><p style="font-size:12px;opacity:0.5;margin-top:16px">${rhm}</p></div></div></body></html>`;
  return new Response(rhy, {
    status: 403,
    headers: {
      'Content-Type': 'text/html;charset=utf-8',
      'Cache-Control': 'no-store'
    }
  });
}
async function rhx(rhv) {
  const rhb = new URL(rhv.url);
  if (rhv.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Accept',
        'Access-Control-Max-Age': '86400'
      }
    });
  }
  if (!['GET', 'POST'].includes(rhv.method)) {
    return new Response('Method not allowed. Use GET or POST.', {
      status: 405
    });
  }
  if (rhv.method === 'GET' && !rhb.searchParams.has('dns')) {
    const rhk = rhb.protocol + '//' + rhb.host + rhb.pathname;
    const rh0 = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>DoH Proxy</title><style>:root{--primary:#0ea5e9;--bg:#f8fafc;--card:#fff;--text:#1e293b;--border:#e2e8f0}body{font-family:system-ui,sans-serif;background:var(--bg);color:var(--text);margin:0;padding:20px;display:flex;justify-content:center;align-items:center;min-height:100vh}.card{background:var(--card);border-radius:16px;padding:32px;max-width:560px;width:100%;box-shadow:0 4px 24px rgba(0,0,0,.08);border:1px solid var(--border);text-align:center}.badge{display:inline-block;background:linear-gradient(135deg,#0ea5e9,#667eea);color:#fff;padding:6px 16px;border-radius:20px;font-weight:700;font-size:14px;margin-bottom:16px}h2{margin:0 0 8px;font-size:22px;font-weight:800;background:linear-gradient(135deg,#0ea5e9,#667eea);-webkit-background-clip:text;-webkit-text-fill-color:transparent}p{color:#64748b;font-size:14px;line-height:1.7;margin:8px 0}.url-box{background:#f0f9ff;border:2px solid #0ea5e9;border-radius:12px;padding:14px 18px;margin:16px 0;direction:ltr;text-align:left;font-family:monospace;font-size:15px;font-weight:700;color:#0369a1;word-break:break-all;cursor:pointer;transition:all .2s}.url-box:hover{background:#e0f2fe}.btn{display:inline-flex;align-items:center;gap:6px;background:linear-gradient(135deg,#0ea5e9,#667eea);color:#fff;border:none;border-radius:10px;padding:10px 24px;font-size:14px;font-weight:600;font-family:inherit;cursor:pointer;transition:all .2s;margin-top:8px;text-decoration:none}.btn:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(14,165,233,.3)}.features{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:16px;text-align:right}.feature{background:#f8fafc;border:1px solid var(--border);border-radius:8px;padding:10px 12px;font-size:12px;font-weight:500;color:#475569;display:flex;align-items:center;gap:6px}.feature i{color:#10b981}</style></head><body><div class="card"><div class="badge">DoH</div><h2>DNS-over-HTTPS Proxy</h2><p>Copy this URL and use it as your DoH server:</p><div class="url-box" onclick="navigator.clipboard.writeText(this.textContent);this.style.background='#dcfce7';this.style.borderColor='#10b981';this.style.color='#065f46';setTimeout(()=>{this.style.background='#f0f9ff';this.style.borderColor='#0ea5e9';this.style.color='#0369a1'},1500)">${rhk}</div><p style="font-size:12px;opacity:0.6">Click to copy</p><div class="features"><div class="feature">&#x2705; Cloudflare DNS</div><div class="feature">&#x2705; Google DNS</div><div class="feature">&#x2705; Quad9 DNS</div><div class="feature">&#x2705; AdGuard DNS</div></div><a class="btn" href="?dns=test" target="_blank">Test DoH &#x2192;</a></div></body></html>`;
    return new Response(rh0, {
      status: 200,
      headers: {
        'Content-Type': 'text/html;charset=utf-8',
        'Cache-Control': 'no-store'
      }
    });
  }
  const rh1 = [{
    name: 'Cloudflare',
    url: 'https://cloudflare-dns.com/dns-query'
  }, {
    name: 'Google',
    url: 'https://dns.google/dns-query'
  }, {
    name: 'Quad9',
    url: 'https://dns.quad9.net/dns-query'
  }, {
    name: 'OpenDNS',
    url: 'https://doh.opendns.com/dns-query'
  }, {
    name: 'AdGuard',
    url: 'https://dns.adguard.com/dns-query'
  }, {
    name: 'Mullvad',
    url: 'https://adblock.dns.mullvad.net/dns-query'
  }, {
    name: 'NextDNS',
    url: 'https://dns.nextdns.io/dns-query'
  }];
  const rh2 = rh1[Math.floor(Math.random() * rh1.length)];
  const rh3 = rhv.method === 'POST' ? await rhv.arrayBuffer().catch(() => null) : null;
  try {
    const rh4 = new Headers(rhv.headers);
    rh4.set('User-Agent', 'DoH-Proxy/1.0');
    if (rhv.method === 'POST') {
      rh4.set('Content-Type', 'application/dns-message');
    } else {
      rh4.set('Accept', 'application/dns-message');
    }
    const rh5 = new Request(rh2.url + rhb.search, {
      method: rhv.method,
      headers: rh4,
      body: rh3,
      redirect: 'follow'
    });
    const rh6 = await fetch(rh5);
    const rh7 = new Headers(rh6.headers);
    rh7.set('Access-Control-Allow-Origin', '*');
    rh7.set(e5("QWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcw=="), 'GET, POST, OPTIONS');
    rh7.set('Access-Control-Allow-Headers', 'Content-Type, Accept');
    rh7.set('Cache-Control', 'public, max-age=300');
    return new Response(rh6.body, {
      status: rh6.status,
      statusText: rh6.statusText,
      headers: rh7
    });
  } catch (rh8) {
    for (let rh9 = 0; rh9 < rh1.length; rh9++) {
      if (rh1[rh9].url === rh2.url) continue;
      try {
        const rpe = new Headers(rhv.headers);
        rpe.set('User-Agent', 'DoH-Proxy/1.0');
        if (rhv.method === 'POST') rpe.set('Content-Type', 'application/dns-message'); else rpe.set('Accept', 'application/dns-message');
        const rpt = new Request(rh1[rh9].url + rhb.search, {
          method: rhv.method,
          headers: rpe,
          body: rh3,
          redirect: 'follow'
        });
        const rpr = await fetch(rpt);
        const rpn = new Headers(rpr.headers);
        rpn.set('Access-Control-Allow-Origin', '*');
        rpn.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        rpn.set('Access-Control-Allow-Headers', 'Content-Type, Accept');
        return new Response(rpr.body, {
          status: rpr.status,
          statusText: rpr.statusText,
          headers: rpn
        });
      } catch (rpi) {}
    }
    return new Response('DoH proxy error: ' + rh8.message, {
      status: 502,
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}
async function rpo(rps, rpa, rpc, rpl = 'HTML') {
  const rpd = `https://api.telegram.org/bot${rps}/sendMessage?chat_id=${rpa}&parse_mode=${rpl}&text=${encodeURIComponent(rpc)}`;
  try {
    return await fetch(rpd, {
      method: 'GET'
    });
  } catch (rpw) {
    console.error('sendBotMessage error:', rpw);
  }
}
function rpf(rph, rpp) {
  return {
    inline_keyboard: [[{
      text: '📋 اشتراک',
      callback_data: 'cb_sub'
    }, {
      text: '📊 وضعیت',
      callback_data: 'cb_status'
    }], [{
      text: '⚙️ کانفیگ',
      callback_data: 'cb_config'
    }, {
      text: '🔄 منو',
      callback_data: 'cb_menu'
    }], [{
      text: '🖥 پنل مدیریت',
      url: rph
    }, {
      text: '📥 باز کردن لینک',
      url: rpp
    }]]
  };
}
async function rpg(rpm, env, rpy, rpx) {
  try {
    const rpv = await env.KV.get('tg.json');
    if (!rpv) return new Response('Bot not configured', {
      status: 200
    });
    const rpb = JSON.parse(rpv);
    if (!rpb.BotToken || !rpb.ChatID) return new Response('Bot not configured', {
      status: 200
    });
    const rpk = await rpm.json();
    if (rpk.callback_query) {
      const rp0 = rpk.callback_query;
      const rp1 = String(rp0.message && rp0.message.chat ? rp0.message.chat.id : '');
      if (rp1 !== String(rpb.ChatID)) return new Response('Unauthorized', {
        status: 200
      });
      const rp2 = rp0.data || '';
      const rp3 = rpm.url.split('://')[0];
      const rp4 = `${rp3}://${rpx}/sub?token=${await t7h(rpx + rpy)}`;
      const rp5 = `${rp3}://${rpx}/admin`;
      const rp6 = await t4(env);
      const rp7 = rp6 ? JSON.parse(rp6) : {};
      let rp8;
      if (rp2 === 'cb_sub') {
        rp8 = `<b>🔗 لینک اشتراک / Subscription</b>\n\n<code>${rp4}</code>`;
      } else if (rp2 === 'cb_status') {
        const rp9 = rp7.CF && rp7.CF.Usage;
        let rge = '';
        if (rp9 && rp9.success) {
          const rgt = rp9.total / rp9.max, rgr = Math.round(rgt * 12);
          rge = `\n📈 ${('🟩').repeat(rgr)}${('⬜').repeat(12 - rgr)} ${(rgt * 100).toFixed(1)}%\n💠 ${rp9.total}/${rp9.max}`;
        }
        rp8 = `<b>📊 وضعیت / Status</b>\n\n🌐 Host: <code>${rpx}</code>\n🆔 UUID: <code>${rpy.slice(0, 8)}…</code>${rge}`;
      } else if (rp2 === 'cb_config') {
        rp8 = `<b>⚙️ کانفیگ / Config</b>\n\n🔸 protocol: <code>${rp7.protocolType || 'vless'}</code>\n🔸 transport: <code>${rp7.transportProtocol || 'ws'}</code>\n🔐 TLS: <code>${rp7.enableTLS !== false ? 'on' : 'off'}</code>\n🌐 Host: <code>${rpx}</code>`;
      } else {
        rp8 = `<b>✨ Nova Proxy</b>\n\nیک گزینه را انتخاب کنید / Choose an option:`;
      }
      try {
        await fetch(`https://api.telegram.org/bot${rpb.BotToken}/answerCallbackQuery?callback_query_id=${rp0.id}`);
      } catch (rgn) {}
      try {
        await fetch(`https://api.telegram.org/bot${rpb.BotToken}/editMessageText?chat_id=${rp1}&message_id=${rp0.message.message_id}&parse_mode=HTML&text=${encodeURIComponent(rp8)}&reply_markup=${encodeURIComponent(JSON.stringify(rpf(rp5, rp4)))}`);
      } catch (rgi) {
        await rpo(rpb.BotToken, rp1, rp8);
      }
      return new Response('OK', {
        status: 200
      });
    }
    if (!rpk.message || !rpk.message.text) return new Response('OK', {
      status: 200
    });
    const rgo = String(rpk.message.chat.id);
    if (rgo !== String(rpb.ChatID)) return new Response('Unauthorized', {
      status: 200
    });
    const rgs = rpk.message.text.trim();
    const rga = rgs.split(' ')[0].toLowerCase();
    const rgc = rgs.slice(rga.length).trim();
    const rgl = await t4(env);
    const rgd = rgl ? JSON.parse(rgl) : {};
    switch (rga) {
      case '/start':
      case '/menu':
      case '/help':
        {
          const rgw = rpm.url.split('://')[0];
          const rgf = `${rgw}://${rpx}/admin`;
          const rgh = await t7h(rpx + rpy);
          const rgp = `${rgw}://${rpx}/sub?token=${rgh}`;
          const rgg = `<b>╔═══❰✨ Nova Proxy Bot ❱═══╗</b>

<blockquote><b>📋 راهنما</b>
━━━━━━━━━━━━━━━━━━━
<code>/sub</code>         ─── دریافت لینک اشتراک
<code>/status</code>      ─── وضعیت ورکر و مصرف
<code>/config</code>      ─── نمایش خلاصه کانفیگ
<code>/sethost</code>    ─── تغییر host
<code>/setpath</code>    ─── تغییر مسیر
<code>/setname</code>    ─── تغییر نام اشتراک
<code>/setwebhook</code> ─── نصب Webhook
<code>/myid</code>       ─── Chat ID شما
<code>/help</code>       ─── این راهنما</blockquote>

<b>╚══════════════════════╝</b>`;
          const rgm = rpf(rgf, rgp);
          const rgy = `https://api.telegram.org/bot${rpb.BotToken}/sendMessage?chat_id=${rgo}&parse_mode=HTML&text=${encodeURIComponent(rgg)}&reply_markup=${encodeURIComponent(JSON.stringify(rgm))}`;
          try {
            await fetch(rgy, {
              method: 'GET'
            });
          } catch (rgx) {
            console.error('sendBotMessage error:', rgx);
          }
          break;
        }
      case '/sub':
        {
          const rgv = await t7h(rpx + rpy);
          const rgb = rpm.url.split('://')[0];
          const rgk = `${rgb}://${rpx}/sub?token=${rgv}`;
          const rg0 = `<b>╔═══❰🔗 اشتراک ❱═══╗</b>

<blockquote><b>📎 لینک اشتراک شما:</b>
<code>${rgk}</code></blockquote>

<b>📥 <a href="${rgk}">باز کردن مستقیم</a></b>

<b>╚════════════════╝</b>`;
          await rpo(rpb.BotToken, rgo, rg0);
          break;
        }
      case '/status':
        {
          const rg1 = Date.now() - (globalThis.__workerStart || Date.now());
          const rg2 = `${Math.floor(rg1 / 3600000)}h ${Math.floor(rg1 % 3600000 / 60000)}m`;
          const rg3 = 12;
          let rg4 = `<b>╔═══❰📊 وضعیت سرور ❱═══╗</b>

<blockquote>⏱ <b>آپتایم:</b> <code>${rg2}</code>
🆔 <b>UUID:</b> <code>${rpy.slice(0, 8)}...</code>
🌐 <b>Host:</b> <code>${rpx}</code>
📁 <b>مسیر:</b> <code>${rgd.PATH || '/'}</code></blockquote>`;
          const rg5 = rgd.CF?.Usage;
          if (rg5?.success) {
            const rg6 = rg5.total / rg5.max;
            const rg7 = Math.round(rg6 * rg3);
            const rg8 = rg3 - rg7;
            const rg9 = ('🟩').repeat(rg7) + ('⬜').repeat(rg8);
            rg4 += `\n<blockquote><b>📈 مصرف Cloudflare</b>\n${rg9} <b>${(rg6 * 100).toFixed(1)}%</b>\n━━━━━━━━━━━━━━━━━━━\n📄 Pages: <code>${rg5.pages}</code>\n⚙️ Workers: <code>${rg5.workers}</code>\n💠 مجموع: <code>${rg5.total}/${rg5.max}</code></blockquote>`;
          }
          rg4 += `\n<b>╚══════════════════════╝</b>`;
          await rpo(rpb.BotToken, rgo, rg4);
          break;
        }
      case '/config':
        {
          const rme = rgd.protocolType || 'vless';
          const rmt = rgd.transportProtocol || 'ws';
          const rmr = rmn => rmn ? '🟢 فعال' : '🔴 غیرفعال';
          const rmi = rgd.tlsFragment || '🔴 غیرفعال';
          let rmo = `<b>╔═══❰⚙️ تنظیمات ❱═══╗</b>

<blockquote><b>📡 شبکه</b>
━━━━━━━━━━━━━━━━━━━
<b>پروتکل:</b> <code>${rme}</code>  |  <b>نقل:</b> <code>${rmt}</code>
<b>Host:</b> <code>${rgd.HOST || rpx}</code>
<b>مسیر:</b> <code>${rgd.PATH || '/'}</code>
<b>Fingerprint:</b> <code>${rgd.Fingerprint || 'chrome'}</code></blockquote>

<blockquote><b>🔐 امنیت</b>
━━━━━━━━━━━━━━━━━━━
<b>Skip Verify:</b> ${rmr(rgd.skipCertVerify)}
<b>ECH:</b> ${rmr(rgd.ECH)}
<b>0-RTT:</b> ${rmr(rgd.enable0RTT)}
<b>TLS Fragment:</b> ${rmi}</blockquote>

<blockquote><b>🧩 ویژگی‌ها</b>
━━━━━━━━━━━━━━━━━━━
<b>Dual Protocol:</b> ${rmr(rgd.dualProtocol)}
<b>TG Bot:</b> ${rmr(rgd.TG?.enable)}
<b>نام اشتراک:</b> <code>${rgd.optimizedSubGeneration?.SUBNAME || '-'}</code></blockquote>

<b>╚══════════════════════╝</b>`;
          await rpo(rpb.BotToken, rgo, rmo);
          break;
        }
      case '/sethost':
        {
          if (!rgc) {
            await rpo(rpb.BotToken, rgo, `<b>╔═══❰⚠️ خطا ❱═══╗</b>\n\n<blockquote>لطفا host را وارد کنید:\n<code>/sethost example.com</code></blockquote>\n<b>╚══════════════╝</b>`);
            break;
          }
          rgd.HOST = rgc.trim().toLowerCase().replace(/^https?:\/\//, '').split('/')[0].split(':')[0];
          if (!rgd.HOSTS) rgd.HOSTS = [];
          if (!rgd.HOSTS.includes(rgd.HOST)) rgd.HOSTS.unshift(rgd.HOST);
          await t6(env, JSON.stringify(rgd, null, 2));
          await rpo(rpb.BotToken, rgo, `<b>╔═══❰✅ موفق ❱═══╗</b>\n\n<blockquote>Host به <code>${rgd.HOST}</code> تغییر یافت</blockquote>\n<b>╚══════════════╝</b>`);
          break;
        }
      case '/setpath':
        {
          if (!rgc) {
            await rpo(rpb.BotToken, rgo, `<b>╔═══❰⚠️ خطا ❱═══╗</b>\n\n<blockquote>لطفا مسیر را وارد کنید:\n<code>/setpath /api</code></blockquote>\n<b>╚══════════════╝</b>`);
            break;
          }
          rgd.PATH = rgc.startsWith('/') ? rgc : '/' + rgc;
          await t6(env, JSON.stringify(rgd, null, 2));
          await rpo(rpb.BotToken, rgo, `<b>╔═══❰✅ موفق ❱═══╗</b>\n\n<blockquote>مسیر به <code>${rgd.PATH}</code> تغییر یافت</blockquote>\n<b>╚══════════════╝</b>`);
          break;
        }
      case '/setname':
        {
          if (!rgc) {
            await rpo(rpb.BotToken, rgo, `<b>╔═══❰⚠️ خطا ❱═══╗</b>\n\n<blockquote>لطفا نام را وارد کنید:\n<code>/setname MyConfig</code></blockquote>\n<b>╚══════════════╝</b>`);
            break;
          }
          if (!rgd.optimizedSubGeneration) rgd.optimizedSubGeneration = {};
          rgd.optimizedSubGeneration.SUBNAME = rgc;
          await t6(env, JSON.stringify(rgd, null, 2));
          await rpo(rpb.BotToken, rgo, `<b>╔═══❰✅ موفق ❱═══╗</b>\n\n<blockquote>نام اشتراک به <code>${rgc}</code> تغییر یافت</blockquote>\n<b>╚══════════════╝</b>`);
          break;
        }
      case '/myid':
        {
          await rpo(rpb.BotToken, rgo, `<b>╔═══❰🆔 Chat ID ❱═══╗</b>\n\n<blockquote><code>${rgo}</code></blockquote>\n<b>╚══════════════╝</b>`);
          break;
        }
      case '/setwebhook':
        {
          const rms = `${rpm.url.split('://')[0]}://${rpm.url.split('/')[2]}`;
          const rma = `https://api.telegram.org/bot${rpb.BotToken}/setWebhook?url=${encodeURIComponent(rms + '/bot')}&drop_pending_updates=true`;
          const rmc = await fetch(rma);
          const rml = await rmc.json();
          const rmd = rml.ok ? `<b>╔═══❰✅ Webhook ❱═══╗</b>\n\n<blockquote>Webhook با موفقیت نصب شد!\n\n🌐 <code>${rms}/bot</code></blockquote>\n<b>╚══════════════════╝</b>` : `<b>╔═══❰❌ خطا ❱═══╗</b>\n\n<blockquote>خطا در نصب Webhook:\n<code>${JSON.stringify(rml)}</code></blockquote>\n<b>╚══════════════╝</b>`;
          await rpo(rpb.BotToken, rgo, rmd);
          break;
        }
      default:
        {
          await rpo(rpb.BotToken, rgo, `<b>╔═══❰❌ خطا ❱═══╗</b>\n\n<blockquote>دستور ناشناخته.\nبرای راهنما <code>/help</code> را بزنید.</blockquote>\n<b>╚══════════════╝</b>`);
        }
    }
  } catch (rmw) {
    console.error('Telegram webhook error:', rmw);
  }
  return new Response('OK', {
    status: 200
  });
}
const rmf = 'https://api.cloudflare.com/client/v4';
function rmh(rmp, rmg) {
  return Object.assign({
    'Authorization': 'Bearer ' + rmp
  }, rmg || ({}));
}
async function rmm(rmy) {
  let rmx = null;
  try {
    rmx = await rmy.json();
  } catch (rmv) {}
  return rmx;
}
async function rmb(rmk) {
  const rm0 = await fetch(rmf + '/user/tokens/verify', {
    headers: rmh(rmk)
  });
  const rm1 = await rmm(rm0);
  return {
    ok: !!(rm1 && rm1.success && rm1.result && rm1.result.status === 'active'),
    raw: rm1
  };
}
async function rm2(rm3) {
  const rm4 = await fetch(rmf + '/accounts', {
    headers: rmh(rm3)
  });
  const rm5 = await rmm(rm4);
  if (!rm5 || !rm5.success || !Array.isArray(rm5.result)) return [];
  return rm5.result.map(rm6 => ({
    id: rm6.id,
    name: rm6.name
  }));
}
async function rm7(env) {
  try {
    const rm8 = env.KV && typeof env.KV.get === 'function' ? await t4(env) : null;
    const rm9 = rm8 ? JSON.parse(rm8) : null;
    if (rm9 && Array.isArray(rm9.HOSTS) && rm9.HOSTS.length) return [...new Set(rm9.HOSTS.filter(Boolean))];
    if (rm9 && rm9.HOST) return [rm9.HOST];
  } catch (rye) {}
  return [];
}
async function ryt(ryr, ryn, ryi, ryo = 'HTML', rys = null) {
  if (!ryr || !ryn) return null;
  let rya = null;
  const ryc = 4000;
  const ryl = [];
  for (let ryd = 0; ryd < ryi.length; ryd += ryc) ryl.push(ryi.slice(ryd, ryd + ryc));
  for (const ryw of ryl) {
    const ryf = `https://api.telegram.org/bot${ryr}/sendMessage?chat_id=${encodeURIComponent(ryn)}&text=${encodeURIComponent(ryw)}&parse_mode=${ryo}`;
    try {
      rya = await fetch(ryf, {
        method: 'GET'
      });
    } catch (ryh) {
      console.error('sendBotMessage error:', ryh);
    }
  }
  return rya;
}
async function ryp(ryg) {
  const rym = [{
    command: 'start',
    description: 'منو / Menu'
  }, {
    command: 'sub',
    description: 'لینک اشتراک'
  }, {
    command: 'status',
    description: 'وضعیت و مصرف'
  }, {
    command: 'config',
    description: 'خلاصه تنظیمات'
  }, {
    command: 'hosts',
    description: 'دامنه‌ها'
  }, {
    command: 'addhost',
    description: 'افزودن دامنه'
  }, {
    command: 'delhost',
    description: 'حذف دامنه'
  }, {
    command: 'announce',
    description: 'ارسال به کانال'
  }, {
    command: 'pause',
    description: '🚨 توقف اضطراری سرویس'
  }, {
    command: 'resume',
    description: '✅ ازسرگیری سرویس'
  }, {
    command: 'install',
    description: '🚀 نصب پنل روی Cloudflare'
  }, {
    command: 'help',
    description: 'راهنما'
  }];
  try {
    await fetch(`https://api.telegram.org/bot${ryg}/setMyCommands`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        commands: rym
      })
    });
  } catch (ryy) {}
}
async function ryx(env, ryv = {}) {
  try {
    const ryb = env.KV && typeof env.KV.get === 'function' ? await env.KV.get('tg.json') : null;
    if (!ryb) return {
      skipped: true,
      reason: 'Telegram not configured'
    };
    const ryk = JSON.parse(ryb);
    const ry0 = String(env.ANNOUNCE_CHAT || ryk.ChatID || '').trim();
    if (!ryk.BotToken || !ry0) return {
      skipped: true,
      reason: 'BotToken/ChatID missing'
    };
    const ry1 = ryv.baseUrl || '';
    const ry2 = [e5("PGI+8J+UpSDZhNuM2YbaqeKAjNmH2KfbjCDYp9i02KrYsdin2qkgTm92YSAvIE5vdmEgc3Vic2NyaXB0aW9uIGxpbmtzPC9iPg=="), ''];
    if (ry1) {
      ry2.push('<b>⚡️ لینک مستقیم (بهینه per-ISP) / Live (per-ISP optimized)</b>');
      ry2.push(`<code>${ry1}/sub/mihomo.yaml</code>`);
      ry2.push(`<code>${ry1}/sub/base64.txt</code>`);
      ry2.push('');
    }
    if (ryv.health && Array.isArray(ryv.health.domains) && ryv.health.domains.length) {
      const ry3 = ryv.health.domains.filter(ry4 => ry4.ok).length;
      ry2.push(`<b>🌐 دامنه‌ها / Domains:</b> ${ry3}/${ryv.health.domains.length} ✅`);
      ry2.push('');
    }
    ry2.push('<i>محتوای همه لینک‌ها یکی است؛ اگر یکی فیلتر شد، لینک گیت‌هاب همیشه کار می‌کند.</i>');
    await ryt(ryk.BotToken, ry0, ry2.join('\n'));
    return {
      skipped: false,
      chatId: ry0
    };
  } catch (ry5) {
    return {
      skipped: true,
      reason: ry5 && ry5.message ? ry5.message : String(ry5)
    };
  }
}
async function ry6(env, ry7) {
  try {
    const ry8 = env.KV && typeof env.KV.get === 'function' ? await env.KV.get('github-mirror.json') : null;
    if (!ry8) return {
      skipped: true,
      reason: e5("R2l0SHViIG1pcnJvciBub3QgY29uZmlndXJlZA==")
    };
    const ry9 = JSON.parse(ry8);
    if (!ry9.token || !ry9.repo) return {
      skipped: true,
      reason: 'GitHub token/repo missing'
    };
    if (!ry7) return {
      skipped: true,
      reason: 'no baseUrl'
    };
    const rxe = [];
    const rxt = [{
      name: 'base64.txt',
      q: 'b64'
    }, {
      name: 'mihomo.yaml',
      q: 'clash'
    }, {
      name: 'singbox.json',
      q: 'singbox'
    }];
    for (const rxr of rxt) {
      try {
        const rxn = await fetch(`${ry7}/sub?token=${await t7h(ry7.replace(/^https?:\/\//, '') + (env.UUID || ''))}&${rxr.q}`, {
          headers: {
            'User-Agent': 'NovaMirror/1.0'
          }
        });
        if (!rxn.ok) {
          rxe.push({
            file: rxr.name,
            ok: false,
            status: rxn.status
          });
          continue;
        }
        const rxi = await rxn.text();
        if (!rxi || rxi.length < 8) {
          rxe.push({
            file: rxr.name,
            ok: false,
            error: 'empty response'
          });
          continue;
        }
        const rxo = (ry9.pathPrefix ? ry9.pathPrefix + '/' : '') + rxr.name;
        const rxs = `https://api.github.com/repos/${ry9.repo}/contents/${rxo}`;
        const rxa = await fetch(rxs, {
          headers: {
            'Authorization': 'token ' + ry9.token,
            'User-Agent': 'NovaMirror'
          }
        });
        const rxc = await rxa.json().catch(() => ({}));
        const rxl = rxc && rxc.sha ? rxc.sha : undefined;
        const rxd = {
          message: `Nova: update ${rxr.name}`,
          content: btoa(unescape(encodeURIComponent(rxi))),
          branch: ry9.branch || 'main'
        };
        if (rxl) rxd.sha = rxl;
        const rxw = await fetch(rxs, {
          method: 'PUT',
          headers: {
            'Authorization': 'token ' + ry9.token,
            'Content-Type': 'application/json',
            'User-Agent': 'NovaMirror'
          },
          body: JSON.stringify(rxd)
        });
        rxe.push({
          file: rxr.name,
          ok: rxw.ok,
          status: rxw.status
        });
      } catch (rxf) {
        rxe.push({
          file: rxr.name,
          ok: false,
          error: rxf.message
        });
      }
    }
    return {
      skipped: false,
      results: rxe
    };
  } catch (rxh) {
    return {
      skipped: true,
      reason: rxh.message
    };
  }
}
function rxp() {
  const rxg = `<!DOCTYPE html><html lang="fa" dir="rtl" data-theme="dark"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Nova Radar</title><style>
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
<div class="hsub">سریع‌ترین آی‌پی تمیز شبکه‌تان را پیدا کنید</div>
<span id="pill" class="pill warn"></span>
<div class="row">
<div class="fg"><label>تعداد IP تست</label><input id="s-total" type="number" min="20" max="400" value="140"></div>
<div class="fg"><label>نگه‌داشتن بهترین</label><input id="s-keep" type="number" min="1" max="30" value="8"></div>
</div>
<div><label style="display:block;font-size:11px;font-weight:600;color:var(--mu);margin-bottom:8px">پورت‌ها</label><div class="portchips" id="s-ports"><button type="button" class="pchip on" data-port="443">443</button><button type="button" class="pchip" data-port="8443">8443</button><button type="button" class="pchip" data-port="2053">2053</button><button type="button" class="pchip" data-port="2083">2083</button><button type="button" class="pchip" data-port="2087">2087</button><button type="button" class="pchip" data-port="2096">2096</button></div></div>
<button class="btn primary" id="s-run">🚀 شروع اسکن</button>
<div class="bar" id="s-bar"><i></i></div>
<div class="msg" id="s-msg" role="status"></div>
</div>
<div class="card" id="s-rc" style="display:none">
<div id="s-results"></div>
<div class="out" id="s-out">
<div class="out-h">⚡ کانفیگ با بهترین IP</div>
<div class="cfg" id="s-cfg"></div>
<button class="btn primary" id="s-copy">📋 کپی کانفیگ</button>
</div>
<div class="hint" id="s-hint"></div>
</div>
<div class="foot">کاملاً در مرورگر شما اجرا می‌شود، چیزی از دستگاه‌تان خارج نمی‌شود</div>
</div>
<div class="toast" id="toast"></div>
<script>
var lang=(function(){try{return localStorage.getItem('nova-user-lang')==='en'?'en':'fa';}catch(e){return 'fa';}})();
var theme=(function(){try{return localStorage.getItem('nova-theme')==='light'?'light':'dark';}catch(e){return 'dark';}})();
function $(id){return document.getElementById(id);}
function applyLang(){document.documentElement.lang=lang;document.documentElement.dir=lang==='fa'?'rtl':'ltr';
var lb=document.querySelectorAll('#lang button');for(var j=0;j<lb.length;j++)lb[j].classList.toggle('on',lb[j].dataset.l===lang);}
function applyTheme(){document.documentElement.dataset.theme=theme;var tb=document.querySelectorAll('#theme button');for(var i=0;i<tb.length;i++)tb[i].classList.toggle('on',tb[i].dataset.t===theme);}
function toast(t){var e=$('toast');e.textContent=t;e.classList.add('show');setTimeout(function(){e.classList.remove('show');},1800);}
function copy(t){if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(function(){toast('کپی شد');});}else{var a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();try{document.execCommand('copy');toast('کپی شد');}catch(e){}a.remove();}}
var CF_RANGES=[['104.16.',0,255],['104.17.',0,255],['104.18.',0,255],['104.19.',0,255],['104.20.',0,255],['104.21.',0,255],['104.22.',0,255],['104.24.',0,255],['104.25.',0,255],['104.26.',0,255],['104.27.',0,255],['162.159.',0,255],['172.64.',0,255],['172.66.',0,255],['172.67.',0,255],['188.114.',96,111],['141.101.',64,127]];
function randCfIp(){var r=CF_RANGES[Math.floor(Math.random()*CF_RANGES.length)];var c=r[1]+Math.floor(Math.random()*(r[2]-r[1]+1));return r[0]+c+'.'+Math.floor(Math.random()*256);}
function pingIp(ip,port,timeout){return new Promise(function(res){var t0=performance.now();var done=false;var img=new Image();function fin(ok){if(done)return;done=true;img.onerror=img.onload=null;res(ok?Math.round(performance.now()-t0):null);}var timer=setTimeout(function(){fin(false);},timeout);img.onerror=function(){clearTimeout(timer);fin(true);};img.onload=function(){clearTimeout(timer);fin(true);};img.src='https://'+(port==443?ip:ip+':'+port)+'/cdn-cgi/trace?'+Math.random();});}
var TMPL=null,BEST=[];
async function loadTemplate(){
var token=new URLSearchParams(location.search).get('token');
if(!token){$('pill').className='pill warn';$('pill').textContent='بدون توکن، فقط بهترین IP نمایش داده می‌شود';return;}
$('pill').className='pill warn';$('pill').textContent='در حال بررسی اشتراک…';
try{
var r=await fetch(location.origin+'/sub?token='+encodeURIComponent(token)+'&_t='+Date.now());
var txt=await r.text();var data=txt;
try{var dec=atob(txt.replace(/\\s+/g,''));if(dec.indexOf('://')>0)data=dec;}catch(e){}
var lines=data.split(/[\\r\\n]+/);var v=null;
for(var i=0;i<lines.length;i++){if(lines[i].trim().indexOf('vless://')===0){v=lines[i].trim();break;}}
if(!v){$('pill').className='pill warn';$('pill').textContent='کانفیگ پیدا نشد';return;}
var m=v.match(/^vless:\\/\\/([^@]+)@([^:]+):(\\d+)\\?([^#]*)/);
if(!m){$('pill').className='pill warn';$('pill').textContent='اشتراک در دسترس نبود';return;}
TMPL={uuid:m[1],port:m[3],query:m[4]};
var pc=$('s-ports');if(pc){var tp=String(m[3]);if(!pc.querySelector('[data-port="'+tp+'"]')){var nb=document.createElement('button');nb.type='button';nb.className='pchip';nb.setAttribute('data-port',tp);nb.textContent=tp;pc.insertBefore(nb,pc.firstChild);}var tc=pc.querySelector('[data-port="'+tp+'"]');if(tc)tc.classList.add('on');}
$('pill').className='pill ok';$('pill').textContent='✓ اشتراک شناسایی شد';
}catch(e){$('pill').className='pill warn';$('pill').textContent='اشتراک در دسترس نبود';}
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
msg.textContent='در حال آماده‌سازی…';
var maxIps=Math.min(total,Math.max(20,Math.floor(600/ports.length)));
var ips=[],seen={};while(ips.length<maxIps){var ip=randCfIp();if(!seen[ip]){seen[ip]=1;ips.push(ip);}}
var pairs=[];for(var a=0;a<ips.length;a++){for(var pi=0;pi<ports.length;pi++){pairs.push({ip:ips[a],port:ports[pi]});}}
var totalN=pairs.length,tested=0,alive=[];
async function worker(){while(pairs.length){var pr=pairs.pop();var s=[];for(var i=0;i<probes;i++){var ms=await pingIp(pr.ip,pr.port,timeout);if(ms!=null)s.push(ms);}tested++;
if(s.length){var avg=Math.round(s.reduce(function(a,b){return a+b;},0)/s.length);var jit=Math.round(Math.max.apply(null,s)-Math.min.apply(null,s));var loss=Math.round((1-s.length/probes)*100);alive.push({ip:pr.ip,port:pr.port,ms:avg,jit:jit,loss:loss,score:avg+jit*0.5+loss*20});}
pf.style.width=Math.max(3,Math.round(tested/totalN*100))+'%';
msg.textContent='در حال تست… '+tested+'/'+totalN+' ('+alive.length+' سالم)';}}
var pool=[];for(var k=0;k<conc;k++)pool.push(worker());await Promise.all(pool);
alive.sort(function(a,b){return a.score-b.score;});BEST=alive.slice(0,keep);
pf.style.width='100%';setTimeout(function(){bar.style.display='none';},500);btn.disabled=false;
if(!BEST.length){msg.textContent='هیچ IP سالمی پیدا نشد';return;}
msg.textContent='✓ '+BEST.length+' IP سریع پیدا شد';
var rows='';for(var i=0;i<BEST.length;i++){var b=BEST[i];rows+='<tr class="'+(i===0?'best':'')+'"><td class="rank">'+(i+1)+'</td><td><code>'+b.ip+':'+b.port+'</code></td><td>'+b.ms+' ms</td><td>'+b.jit+' ms</td><td>'+b.loss+'%</td></tr>';}
$('s-results').innerHTML='<table><thead><tr><th>#</th><th>IP</th><th>تأخیر</th><th>جیتر</th><th>افت</th></tr></thead><tbody>'+rows+'</tbody></table>';
$('s-rc').style.display='block';
if(TMPL){var cfg=buildConfig(BEST[0].ip,BEST[0].port);$('s-cfg').textContent=cfg;$('s-out').style.display='block';$('s-hint').style.display='none';}
else{$('s-out').style.display='none';$('s-hint').textContent='این صفحه را با ?token= خود باز کنید';$('s-hint').style.display='block';}
}
$('lang').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;lang=b.dataset.l;try{localStorage.setItem('nova-user-lang',lang);}catch(_){}applyLang();});
$('theme').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;theme=b.dataset.t;try{localStorage.setItem('nova-theme',theme);}catch(_){}applyTheme();});
$('s-ports').addEventListener('click',function(e){var b=e.target.closest('.pchip');if(!b)return;b.classList.toggle('on');});
$('s-run').addEventListener('click',run);
$('s-copy').addEventListener('click',function(){if(TMPL&&BEST.length)copy(buildConfig(BEST[0].ip,BEST[0].port));});
applyTheme();applyLang();loadTemplate();
</script></body></html>`;
  return new Response(rxg, {
    status: 200,
    headers: {
      'Content-Type': 'text/html;charset=utf-8',
      'Cache-Control': 'no-store'
    }
  });
}
async function rxm() {
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
	`;
}
async function rxy(rxx, rxv) {
  const rxb = new Date();
  const rxk = rxb.getFullYear() + '-' + String(rxb.getMonth() + 1).padStart(2, '0') + '-' + String(rxb.getDate()).padStart(2, '0') + ' ' + String(rxb.getHours()).padStart(2, '0') + ':' + String(rxb.getMinutes()).padStart(2, '0') + ':' + String(rxb.getSeconds()).padStart(2, '0');
  const rx0 = Array.from(crypto.getRandomValues(new Uint8Array(8))).map(rx1 => rx1.toString(16).padStart(2, '0')).join('');
  return `<!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>
<title>Worker threw exception | ${rxx} | Cloudflare</title>
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
                    <small class="heading-ray-id">Ray ID: ${rx0} &bull; ${rxk} UTC</small>
                </h1>
                <h2 class="cf-subheadline" data-translate="error_desc">Worker threw exception</h2>
            </div><!-- /.header -->

            <section></section><!-- spacer -->

            <div class="cf-section cf-wrapper">
                <div class="cf-columns two">
                    <div class="cf-column">
                        <h2 data-translate="what_happened">What happened?</h2>
                            <p>You've requested a page on a website (${rxx}) that is on the <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=error_100x" target="_blank">Cloudflare</a> network. An unknown error occurred while rendering the page.</p>
                    </div>

                    <div class="cf-column">
                        <h2 data-translate="what_can_i_do">What can I do?</h2>
                            <p><strong>If you are the owner of this website:</strong><br />refer to <a href="https://developers.cloudflare.com/workers/observability/errors/" target="_blank">Workers - Errors and Exceptions</a> and check Workers Logs for ${rxx}.</p>
                    </div>

                </div>
            </div><!-- /.section -->

            <div class="cf-error-footer cf-wrapper w-240 lg:w-full py-10 sm:py-4 sm:px-8 mx-auto text-center sm:text-left border-solid border-0 border-t border-gray-300">
    <p class="text-13">
      <span class="cf-footer-item sm:block sm:mb-1">Cloudflare Ray ID: <strong class="font-semibold"> ${rx0}</strong></span>
      <span class="cf-footer-separator sm:hidden">&bull;</span>
      <span id="cf-footer-item-ip" class="cf-footer-item hidden sm:block sm:mb-1">
        Your IP:
        <button type="button" id="cf-footer-ip-reveal" class="cf-footer-ip-reveal-btn">Click to reveal</button>
        <span class="hidden" id="cf-footer-ip">${rxv}</span>
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
