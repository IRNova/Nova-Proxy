# Nova Proxy 4.7.2

A follow-up to 4.7.1.

## Broader client coverage for the boost

- The opt-in connection-enhancement mode now also applies to the **sing-box subscription format**, so sing-box based apps get the same handshake protection that xray apps already had. Still on the user's own worker, and still off by default.

## Upgrade

Deploy the update with the Deploy to Cloudflare button, or merge the daily **Check for Nova updates** pull request. Your users, settings, and data are preserved. See [DEPLOY.md](DEPLOY.md).

---

# Nova Proxy 4.7.1

A small follow-up to 4.7.0.

## Get back in faster after a rebuild

- Recover and update now show your panel's full address, including its unique login path, so you can open it and hand your subscription out again right away.

## Better connectivity on heavily filtered networks

- An opt-in connection-enhancement mode helps subscriptions keep working where common VPN handshakes are blocked. It is off by default and changes nothing for networks that already connect.

## Upgrade

Deploy the update with the Deploy to Cloudflare button, or merge the daily **Check for Nova updates** pull request. Your users, settings, and data are preserved. See [DEPLOY.md](DEPLOY.md).

---

# Nova Proxy 4.7.0

Nova Proxy 4.7.0 is a rebuilt release that is simpler to run and adds several features for users on restrictive networks. The panel now ships inside the Worker, so there is no separate origin to set up. Your users, settings, and data are preserved on update.

## Two front doors: Workers and Pages

- The same panel can now run on a Workers address and a Pages address at the same time, sharing one database. `workers.dev` and `pages.dev` are filtered independently, so if one is blocked the other keeps working, and clients fail over automatically from a single subscription.

## AmneziaWG subscriptions

- Subscriptions can now include AmneziaWG, an obfuscated form of WireGuard, next to WARP and WireGuard. It is harder to detect on networks that block plain WireGuard.

## Block ads and adult sites

- A per-subscription toggle adds reject rules for ad and adult-content categories, applied to both sing-box and Clash outputs. Turn it on and those domains stop resolving for that user.

## Works with the latest sing-box

- Subscriptions use the newer sing-box 1.12 DNS format, so the latest clients import and connect without the "unknown field" error.

## Install the panel as an app

- The panel can be added to the home screen on iOS and Android and opens like a native app.

## Backups and one-click updates

- Export and restore your whole panel from the settings page, check for a new version in one click, and see a country flag on each node.

## First-run setup

- This build does not lock first-time setup behind a claim token: a freshly deployed panel is owned by whoever sets the admin password first. The installer bot claims your panel automatically the moment it deploys, so there is no open window. If you deploy by hand, open the panel and set your admin password immediately after the deploy finishes, before sharing the address.

## Upgrade

Deploy the update with the Deploy to Cloudflare button, or merge the daily **Check for Nova updates** pull request. Your users, settings, and data are preserved. See [DEPLOY.md](DEPLOY.md).

---

# Nova Proxy 4.6.5

Nova Proxy 4.6.5 improves diagnostics and makes the panel easier to monitor.

## A simple health check

- New `/healthz` route (and `/install/ping`) returns only the build and version, with no database, auth, or other work. Because it depends on nothing, a 1101 there means the worker is not running at all (a Cloudflare platform or wedged-slot issue), which cleanly separates a platform problem from an application bug.

## Safer, more useful error logs

- Connection errors recorded for the panel's diagnostics are now stripped of anything that looks like a secret (a UUID, password, token, or a proxy/subscription link) before they are stored or logged, as a safety measure.
- A compact, structured log line is emitted for connection failures (rate limited so it can never flood), which makes real issues easier to find in Cloudflare's logs.

Everything from the 4.6.x line (the 1101 fixes and the 4.6.3/4.6.4 security fixes) is included. Connections and subscriptions are unchanged.

## Upgrade

Deploy the update with the Deploy to Cloudflare button, or merge the daily **Check for Nova updates** pull request. Your users, settings, and data are preserved. See [DEPLOY.md](DEPLOY.md).


---

# Nova Proxy 4.6.4

Nova Proxy 4.6.4 is a small security follow-up to 4.6.3.

## Every first-time setup route respects the claim gate

- A newly deployed panel is claimed once, by its owner, using a one-time token. This release makes sure that check is applied consistently across all of the first-time setup routes, not just the main one, so a fresh, unclaimed panel cannot be set up by anyone else before its owner does.
- This only affects a panel during its very first setup. Panels that are already configured are unaffected, and there is no change for your users.

Includes the 4.6.3 Telegram-login fix and all the 4.6.x stability fixes for the 1101 error.

## Upgrade

Deploy the update with the Deploy to Cloudflare button, or merge the daily **Check for Nova updates** pull request. Your users, settings, and data are preserved. See [DEPLOY.md](DEPLOY.md).

---

# Nova Proxy 4.6.3

Nova Proxy 4.6.3 is a security fix and is recommended for everyone.

## Fixed: one-click Telegram login could be forged

- The one-click "log in from Telegram" link could be forged by someone who only knew the panel's web address, which could give them admin access to the panel. The login link is now tied to the panel password and to the owner's Telegram account, and the endpoint is rate limited, so it can no longer be forged from the address alone.
- Normal Telegram login is unaffected: your real login button keeps working exactly as before.

If your panel has Telegram login configured, updating is strongly recommended. Setting an admin password (if you have not) and keeping it private also protects you.

Includes all the 4.6.x stability fixes for the main causes of the 1101 error.

## Upgrade

Deploy the update with the Deploy to Cloudflare button, or merge the daily **Check for Nova updates** pull request. Your users, settings, and data are preserved. See [DEPLOY.md](DEPLOY.md).

---

# Nova Proxy 4.6.2

Nova Proxy 4.6.2 adds real diagnostics and stops normal client behaviour from being treated as an error.

## You can now see what is failing

- Connection-level errors are recorded and shown in the panel's diagnostics. Previously these happened in a detached part of the worker and were not visible anywhere, which made problems very hard to trace. A small sample is now kept, rate limited so it can never slow the panel down.

## Expected outcomes no longer run the error path

- A client asking for UDP on a non-DNS port (which clients do constantly, for QUIC) and a request for a blocked host now close cleanly instead of raising an error. Neither was ever a real fault, and treating them as errors did unnecessary work on every occurrence.

Includes all the 4.6.x fixes for the main causes of the 1101 error.

## Upgrade

Deploy the update with the Deploy to Cloudflare button, or merge the daily **Check for Nova updates** pull request. Your users, settings, and data are preserved. See [DEPLOY.md](DEPLOY.md).

---

# Nova Proxy 4.5.7

Nova Proxy 4.5.7 makes a deployed panel harder to fingerprint from the outside and adds a country flag to config names.

## Harder to fingerprint

- An unauthenticated request no longer gets the product name or the source repository back: `/manifest.json` is now generic and the old `/version.json` is gone.
- A request that matches no route (a scanner or censor probing the bare URL) now sees a real, stable website served inline, chosen per host, instead of a redirect that changed on every request.

## A country flag on every config

- Config names now start with the exit country's flag when the config routes through a fixed, non-Cloudflare exit (a proxyIP or backend), and a neutral globe for a direct-Cloudflare connection (which is anycast and has no single country). The flag is geolocated once and cached, so it never slows a subscription.

Connections, subscriptions, and ping behavior are unchanged.

## Upgrade

Deploy the update with the Deploy to Cloudflare button, or merge the daily **Check for Nova updates** pull request after reviewing its diff and Cloudflare preview. Your users, settings, and data are preserved. Full deployment and update instructions are in [DEPLOY.md](DEPLOY.md).

The public repository contains only the obfuscated `worker.js` deployment artifact, its deployment metadata, checksums, and documentation. The maintainable panel source stays private.

---

# Nova Proxy 4.5.6

Nova Proxy 4.5.6 fixes a slow leak that could make a busy panel eventually return a 1101 error.

## Connection cleanup no longer scans the whole table

- The Worker keeps a small table of live connections and periodically deletes expired rows. That cleanup was scanning the entire table, so on a busy panel it got slower as the table grew and could eventually trip the Worker's CPU limit (a 1101), most visibly under the traffic spike that follows turning on a relay.
- The table is now indexed on the expiry column, so the cleanup is a fast indexed delete regardless of size. Behavior is otherwise unchanged; the index is created automatically on the next start, and your users, settings, and data are untouched.

## Upgrade

Deploy the update with the Deploy to Cloudflare button, or merge the daily **Check for Nova updates** pull request after reviewing its diff and Cloudflare preview. Your users, settings, and data are preserved. Full deployment and update instructions are in [DEPLOY.md](DEPLOY.md).

The public repository contains only the obfuscated `worker.js` deployment artifact, its deployment metadata, checksums, and documentation. The maintainable panel source stays private.

---

# Nova Proxy 4.5.5

Nova Proxy 4.5.5 fixes the live Cloudflare usage box so the read-only token connects on the first try.

## Usage stats connect reliably

- The "Create read-only token" button now requests **Account Analytics: Read** and **Account Settings: Read** (both read-only). The analytics-only token it created before could read stats but could not list your account, so the panel could not auto-detect your Account ID and the usage box failed to connect.
- If auto-detection still cannot find your account, the panel now points you to the Account ID field and asks you to paste it (you can copy it from your Cloudflare dashboard URL).
- The token still cannot deploy or change Workers. It is read-only.

## Upgrade

Deploy the update with the Deploy to Cloudflare button, or merge the daily **Check for Nova updates** pull request after reviewing its diff and Cloudflare preview. Your users, settings, and data are preserved. Full deployment and update instructions are in [DEPLOY.md](DEPLOY.md).

The public repository contains only the obfuscated `worker.js` deployment artifact, its deployment metadata, checksums, and documentation. The maintainable panel source stays private.

---

# Nova Proxy 4.5.4

Nova Proxy 4.5.4 is a hardening release that lowers the deployed worker's static fingerprint. Runtime behavior is unchanged, so existing panels keep working exactly as before.

## A smaller static fingerprint

- A few internal constants that used to sit in the worker as plain text are now stored encoded and decoded at runtime, so a static scan of the deployed `worker.js` no longer surfaces them.
- This is a code-shape change only. Configs, connections, and every panel feature behave exactly as in 4.5.2.

## Upgrade

Deploy the update with the Deploy to Cloudflare button, or merge the daily **Check for Nova updates** pull request after reviewing its diff and Cloudflare preview. Your users, settings, and data are preserved. Full deployment and update instructions are in [DEPLOY.md](DEPLOY.md).

The public repository contains only the obfuscated `worker.js` deployment artifact, its deployment metadata, checksums, and documentation. The maintainable panel source stays private.

---

# Nova Proxy 4.5.2

Nova Proxy 4.5.2 stops a dead or unresponsive proxy IP from hanging the worker.

## A silent proxy IP fails fast instead of hanging

- If a connection is routed through a proxy IP that accepts the connection but then never sends any data, the worker now closes it after a short wait instead of hanging until the runtime cancels the request.
- Only the wait for the first byte is bounded. Active connections, and legitimately idle-but-alive connections, are untouched.

# Nova Proxy 4.5.1

Nova Proxy 4.5.1 hardens the WebSocket handler so a malformed or scanner-probe connection closes cleanly instead of returning an internal error.

## Cleaner handling of bad connections

- A probe or malformed WebSocket connection now closes quietly instead of surfacing an internal error. This also removes a signal a scanner could use to fingerprint the worker as a proxy.
- Real client connections are unaffected.

# Nova Proxy 4.5.0

Nova Proxy 4.5.0 fixes subscription links, gives every user a stable TLS fingerprint, trims the Resistance Policy down to the toggles that actually change behavior, and makes the release build prove the artifact boots before it ships.

## Subscription links that resolve correctly

- Subscription links are now token-based, so each link maps to exactly one user account instead of leaning on the request path.
- The token travels with the link across every format (Auto, Base64, Clash), so a user's config imports the same way in any client.
- Links keep working after a worker rename or a domain change, because the token, not the hostname, identifies the account.

## A stable TLS fingerprint per user

- Each user now keeps one TLS fingerprint instead of drawing a new one on every connection.
- A consistent fingerprint is harder for a network to single out and block, and it stops a client from re-negotiating a different shape mid-session.

## Resistance Policy trimmed to what works

- Only the toggles that measurably change routing behavior remain; the switches that did nothing are gone, so the panel no longer promises more than it delivers.
- QUIC blocking now drives the real block: the panel switch maps to the actual QUIC drop rule, so turning it on blocks UDP 443 and turning it off restores it.
- Exit Location has been removed. It never changed the egress in a free-tier Worker, so it was misleading and is now off the page.

## Lighter connection accounting

- Per-connection limit accounting is lighter, cutting the bookkeeping overhead each connection pays and leaving more headroom on the free plan.

## A verified release build

- The release build now boots the packaged artifact before it is published, so a bundle that fails to start is caught at build time rather than on a user's Worker.

## Upgrade

Deploy the update with the Deploy to Cloudflare button, or merge the daily **Check for Nova updates** pull request after reviewing its diff and Cloudflare preview. Your users, settings, and data are preserved. Full deployment and update instructions are in [DEPLOY.md](DEPLOY.md).

The public repository contains only the obfuscated `worker.js` deployment artifact, its deployment metadata, checksums, and documentation. The maintainable panel source stays private.

---

# Nova Proxy 4.4.x

The 4.4 line hardened multi-user state and simplified how configs are shared.

## Config sharing simplified

- Config sharing collapsed to three universal formats: Auto, Base64, and Clash. One link now imports into almost any client.

## Multi-user state protected

- Fixed a data-loss bug where saving Network Settings could clear the user list. Users, multi-user state, and the host pool are now preserved on every save.

## Panel and mirror polish

- Added a Quick actions panel to the dashboard and cleaned up the mobile Users screen.
- Hardened the GitHub mirror: the access token is trimmed before use, so a token pasted with extra whitespace no longer fails.

## Upgrade

Update through the Deploy to Cloudflare button or the **Check for Nova updates** pull request. See [DEPLOY.md](DEPLOY.md).

The public repository contains only the obfuscated `worker.js` deployment artifact, its deployment metadata, checksums, and documentation. The maintainable panel source stays private.
