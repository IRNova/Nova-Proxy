# Nova Proxy 4.8.0

Adds a fix for Gemini and other Google AI services saying "not available in your region", plus two hardening changes in the parts of the panel that decide where traffic goes.

## Gemini says the wrong country

Google refuses AI requests that arrive from a Cloudflare address. A Worker reaches the internet from whichever Cloudflare location is nearest the user, and those are datacentre addresses, so Gemini and AI Studio turn them away even when the user is in a country where Gemini works normally.

Nothing in the panel could see this happening. The refusal arrives inside the encrypted connection after the connection itself has succeeded, so as far as the tunnel is concerned everything worked.

Under **Proxy / CDN** there is now a switch: **Send Google AI traffic through the proxy**. With it on, Gemini, AI Studio, NotebookLM and Google sign-in go out through the proxy you configured, and everything else keeps going out directly. It is off by default.

Two things to know before turning it on:

- **It needs a proxy of your own.** Set a PROXYIP or a proxy chain first. The switch is ignored while a panel is on the shared public fallback, because your users' Google sign-in should not travel through a server nobody chose.
- **Pick a proxy in a country where Gemini is available.** Google sees the proxy's address, so that is the country it decides you are in.

If the proxy stops responding, those addresses fall back to a normal direct connection, so nothing breaks. The region problem comes back until the proxy recovers. A Google sign-in that goes out during that window stays tied to that region for the rest of the session, so sign out and back in once the proxy is working again.

Google sign-in is included on purpose. Google decides your region when you sign in, not when you use Gemini, so a session started from a Cloudflare address keeps failing afterwards no matter where the later requests come from.

## Two fixes in the host matcher

The list that decides which addresses go through your proxy had two faults, both present for a long time.

**A dot matched any character.** An entry like `scholar.google.com` also matched hostnames that merely looked similar. An address you list because you trust it should not quietly pull lookalikes through your proxy with it.

**Patterns were rebuilt on every connection.** They are now built once. As part of that, an entry with a long run of wildcards is refused rather than used, because a single mistyped entry in a pasted list could otherwise let one visitor tie up a panel's processing time and slow it down for everyone else on it.

Existing lists keep working. Only entries that were matching more than intended, or that could not have worked safely, behave differently.

## Fewer ways to deploy a panel that cannot start

A Worker deployed without one particular Cloudflare setting cannot start at all, and answers 1101 on every address including the health check. That is indistinguishable from a panel that has been blocked, and it has cost real time to diagnose.

Nova now refuses to produce a release that could be deployed that way, and checks every deployment configuration in the project rather than only the default one. Panels created by the installer bot were already correct; this closes the manual route.

## Also in this release

- Share links carry an ALPN value when you set one, so more apps negotiate the protocol you intended instead of guessing.
- The Google Apps Script relay has been removed.
- Seven unused functions and three unreferenced bundled files are gone.

## Updating

Panels update themselves. If you would rather not wait, open your panel and use the update button.

Nothing changes for your users, and no configuration is lost. The new switch is off until you turn it on.
