# Nova Proxy 4.9.4

Two changes: a panel now holds at most five users, and a chain proxy over HTTPS connects even when the server asks for a client certificate.

## A panel holds at most 5 users

Nova is a personal or small-circle proxy on a free Cloudflare account, not a reseller platform. From this release a panel accepts up to five users, and the cap applies everywhere a user can be created: the panel, the API and the Telegram bot. The User List shows how many of the five are in use, and the Add button switches off at the limit.

If your panel already has more than five users, nothing is removed and nothing stops working. You can still edit or delete any of them. You cannot add another until the list is under five.

## HTTPS chain proxies that ask for a client certificate

When a chain proxy sits behind a server that asks for a client certificate without requiring one, the TLS client used to treat the request as fatal, so that proxy could never be reached. It now answers with an empty certificate, the way a browser does, and the handshake completes. Ported from cmliu/edgetunnel.

## Updating

Panels do not update themselves. Use the update button in your panel, or the Update option in the Telegram bot. Your users, settings and data are kept. After updating, your panel should report **4.9.4**.
