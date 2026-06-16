# Nova Proxy - Build Updates

This page tracks what ships in each `worker.js` build. The deployable `worker.js`
in this repo is an **obfuscated production build**. The readable source is kept
private; this file is the public record of what changed and how the build was made.

برای فارسی‌زبان‌ها: این صفحه تغییرات هر نسخه از `worker.js` و روش ساخت (Obfuscate) را
ثبت می‌کند. فایل `worker.js` نسخه‌ی مبهم‌سازی‌شده و آماده‌ی استقرار است.

---

## Latest build - V3.1.6

**Status:** deployable. Drop-in replacement for the previous `worker.js`. No
config or KV/D1 changes needed to upgrade. Just redeploy.

### What's in this version

- **D1 is now the source of truth for storage, KV is optional.** KV's free read
  budget (about 100k/day) was the bottleneck since config, auth, and settings docs
  are read on nearly every cold isolate. When `env.DB` is bound, a D1-backed shim
  stands in for `env.KV`, so every existing `get`/`put`/`delete`/`list` call routes
  to a D1 `kvstore` table with no code changes at the call sites. D1 is strongly
  consistent and has far more read headroom.
- **Automatic, lossless KV to D1 migration.** Lazy backfill on read plus a one-time
  background bulk copy of every KV key into D1. Once you unbind the KV namespace the
  worker runs on pure D1 with no data loss. Idempotent and runs under `waitUntil`.
- **In-memory config cache with a short TTL.** `config.json` is read on almost every
  request (proxy, panel, subscription). It is now cached in the isolate for a short
  window and refreshed on every save, so edits still take effect immediately while KV
  and D1 reads drop sharply.
- **Batched global usage counters** to stay inside the free-plan KV write budget.
- **Per-connection SOCKS5 whitelist routing.** Hosts in `config.proxy.SOCKS5.whitelist`
  route through the active proxy even in standard (non-global) scope, using the same
  wildcard semantics as the built-in CFCDN list. Loaded only on the proxy-active,
  standard-scope path so direct, global, and PROXYIP connections add no extra read.
- **NAT64 gateway egress** (opt-in via `env.NAT64`) to reach destinations through a
  NAT64 prefix.
- **WARP integration:** register a WireGuard account against Cloudflare's WARP API,
  apply a WARP+ license / WoW, and switch endpoints. Endpoint switching is the
  standard way to get WARP working under DPI (for example inside Iran), since WARP is
  anycast and any registered key is accepted on any edge endpoint.
- **Optional 2FA (TOTP, RFC 6238)** compatible with Google Authenticator, Authy, and
  similar apps, with recovery codes.
- **First-run `/install` wizard** so a non-technical operator can set the admin
  password in-app after a one-click deploy. No CLI, no secrets to paste.
- **Safer outbound socket bootstrap.** `cloudflare:sockets` `connect()` is resolved
  once, non-blockingly, at module load instead of via a static top-level import or a
  per-request dynamic import. This avoids the Worker aborting at load with Error 1101.

### Build / obfuscation details

| Item | Value |
|---|---|
| Version | `V3.1.6` |
| Entry point | ES module, `export default { fetch, scheduled }` |
| Obfuscator | [`javascript-obfuscator`](https://github.com/javascript-obfuscator/javascript-obfuscator) v5 |
| Tool | CF Worker Obfuscator (balanced preset) |
| Target | `browser-no-eval` (no `eval`, avoids Cloudflare Error 1101) |
| String protection | String Array, threshold 1.0, **RC4** encoding |
| String array | rotate + shuffle + index shift, chained variable wrappers |
| Identifiers | `mangled` |
| Other | `compact` on, `simplify` on, control-flow flattening off (keeps CPU within limits) |
| Output size | about 584 KB (well under the 10 MB Worker limit) |

The `browser-no-eval` target and disabled control-flow flattening are deliberate:
they keep the worker free of `eval` (which triggers Error 1101 on Cloudflare) and
keep per-request CPU low enough for the free plan.

### How to deploy

`worker.js` is the only file you deploy. Nothing else changes.

**One-click:** use the **Deploy to Cloudflare** button (see the main
[README](README.md)). Cloudflare builds the Worker from `worker.js`, provisions the
KV namespace, and runs the `/install` wizard for the admin password.

**Wrangler:**

```bash
wrangler deploy
```

`wrangler.jsonc` already points `main` at `worker.js` and binds the `KV` namespace.
To run on D1 (recommended), create a D1 database, bind it as `DB`, and redeploy. The
worker creates its own tables on first run and migrates any existing KV data over.

### Upgrading from an earlier build

1. Pull the new `worker.js`.
2. `wrangler deploy` (or merge and let the one-click deploy rebuild).
3. Nothing else. Existing config, users, and stored data are read as-is. If you bind
   D1 for the first time, KV data is migrated automatically in the background.

---

## Notes on the obfuscated build

- The published `worker.js` is minified and string-encrypted. It is functionally
  identical to the readable source; obfuscation only changes identifier names and
  string storage, not behavior.
- Because strings are RC4-encrypted into a rotated string array, you will not find
  plain text like the version number or route paths with a simple `grep`. That is
  expected.
- If a deploy ever fails with Error 1101, confirm you are on the `browser-no-eval`
  build (this one) and that `compatibility_date` is recent enough for
  `cloudflare:sockets` (2023-08-15 or later).
