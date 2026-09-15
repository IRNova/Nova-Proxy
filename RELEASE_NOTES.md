# Nova Proxy 4.9.0

Two ways into your panel, and an AI switch that tells you what it needs.

## A second address for your panel

Cloudflare filters `workers.dev` and `pages.dev` separately in Iran, so a panel that can only be reached on one of them sits a single filtering decision away from being unreachable.

A panel can now also serve from a `pages.dev` address. Same build, same database, same login, same users. One panel with two doors, so if one address stops opening, the other still does.

**In 4.9.0 this needs manual setup, and most people should wait.** There is no button for it yet. Turning it on means creating a Pages project yourself, binding it to your panel's own D1 database and KV namespace, and setting a `PAGES_PROJECT` variable on your Worker. A panel setting for all of this is coming in the next release, and that is the point to use it.

What is already working is the safety around it. The second door is published only after the Worker copy is confirmed healthy, and it is refused outright unless it is bound to your panel's own storage, because a copy that cannot read your data would come up unclaimed on a public address and the first visitor could take it. Superseded copies are removed when you update, so an out-of-date build is not left serving on an address of its own.

## The Google AI switch

The AI route needs a SOCKS5 or HTTP proxy of your own. It cannot work through a ProxyIP, and Nova now says so before you turn it on rather than leaving you to work it out.

A ProxyIP is built to reach Cloudflare's edge, and that is the only place it forwards to, so the Google hosts never arrived. The request then fell back to a direct connection, which comes from a Cloudflare address, and Google refuses those. The switch therefore made no difference at all: the same "not available in your region" with it on and with it off.

If you have your own SOCKS5 or HTTP proxy, the route works as intended. A WARP address is refused for the same reason a ProxyIP is, because those are Cloudflare's own addresses.

## Readable text

Two colour problems, measured rather than guessed. The worse one was on the install and login screens in dark mode: white text on bright cyan, on the main button of the first two screens a new owner ever sees, including the one that creates your password. Both are fixed everywhere the design tokens are used, not only where they were first spotted.

## Also in this release

- The second door now runs under the same compatibility date as the panel itself. Without this, two addresses of one panel could behave differently, which is one way a panel comes up fine on one address and fails on the other.
- Releases are now verified mechanically before publishing. The version a panel reports, the version in the release, and the file actually published all have to agree, or the release does not go out.

## Updating

Panels do not update themselves. Use the update button in your panel, or the Update option in the Telegram bot. After updating, your panel should report **4.9.0**.
