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
