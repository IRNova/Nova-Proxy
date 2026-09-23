# Nova Proxy 4.9.3

Connections to IPv6 destinations now open. Nothing else changed.

## What changed

Every Cloudflare Worker tunnel descended from edgetunnel has carried the same defect since 2023, and Nova inherited it. Cloudflare's `connect()` joins the hostname and port as `host:port`, so a bare IPv6 address such as `2001:db8::1` became `2001:db8::1:443`, which cannot be parsed, and the connection never opened. The original code had the fix commented out with a note saying brackets were not needed, and every project built on it kept that line.

Nova now writes IPv6 literals in brackets at the one place a socket is opened, which covers every protocol and the NAT64 path. IPv4 addresses and domain names are handled exactly as before.

## Who this affects

Most people never hit this, because clients usually hand the panel a domain name rather than an address: SOCKS5 and HTTP inbounds pass the name through, and TUN mode with sniffing does the same. It shows up when a client resolves locally and forwards the IPv6 address, for example xray with `targetStrategy` set to `ForceIPv6`, or on networks that answer with only an IPv6 address for a site. If you have ever seen a site fail through Nova while it worked elsewhere, this may have been why.

The report covering the whole family of tunnels came from patterniha on 2026-09-22.

## Updating

Panels do not update themselves. Use the update button in your panel, or the Update option in the Telegram bot. Your users, settings and data are kept. After updating, your panel should report **4.9.3**.
