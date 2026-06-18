<div align="center">

<img src="https://raw.githubusercontent.com/iiviirv/irnova-site/main/brand/nova-logo-gradient.svg" width="70" alt="Nova">

<div align="right">
  <a href="README.fa.md">🇮🇷 فارسی</a>
</div>

# Nova Proxy

**A personal, censorship-resistant proxy + dashboard on a single Cloudflare Worker.**

VLESS · Trojan · Shadowsocks · gRPC · XHTTP over WebSocket + TLS — with a self-contained
bilingual (English + فارسی) dashboard, per-ISP clean-IP optimization, multi-user
accounts, a Telegram bot, WARP, proxy chaining, and backend mode. Runs on Cloudflare's **free** tier.

[![License](https://img.shields.io/badge/license-MIT-purple?style=for-the-badge)](LICENSE)
[![Version](https://img.shields.io/badge/version-3.6.3-blueviolet?style=for-the-badge)](https://github.com/IRNova/Nova-Proxy)
[![Stars](https://img.shields.io/github/stars/IRNova/Nova-Proxy?style=for-the-badge&color=0ea5e9)](https://github.com/IRNova/Nova-Proxy)

</div>

---

## 🌐 Links

<div align="center">

[![Website](https://img.shields.io/badge/🌐%20Website-novaproxy.online-0ea5e9?style=for-the-badge)](https://novaproxy.online/)
[![Telegram Channel](https://img.shields.io/badge/✈️%20Telegram%20Channel-@irnova__proxy-0ea5e9?style=for-the-badge&logo=telegram)](https://t.me/irnova_proxy)
[![Telegram Group](https://img.shields.io/badge/👥%20Telegram%20Group-@irnovaproxy__group-0ea5e9?style=for-the-badge&logo=telegram)](https://t.me/irnovaproxy_group)
[![YouTube](https://img.shields.io/badge/▶️%20YouTube-@novaproxyir-ff0000?style=for-the-badge&logo=youtube)](https://www.youtube.com/@novaproxyir)
[![X (Twitter)](https://img.shields.io/badge/𝕏%20X-@irNovaProxy-000000?style=for-the-badge&logo=x)](https://x.com/irNovaProxy)
[![GitHub](https://img.shields.io/badge/🐙%20GitHub-IRNova/Nova--Proxy-181717?style=for-the-badge&logo=github)](https://github.com/IRNova/Nova-Proxy)

</div>

---

## 📖 What is Nova Proxy?

Nova Proxy is a **personal, all-in-one censorship-circumvention proxy** that runs entirely on Cloudflare Workers — the **free tier**. It combines a powerful proxy (VLESS, Trojan, Shadowsocks over WebSocket/gRPC/XHTTP) with a **full bilingual admin dashboard**, all in a single deployable Worker.

**What makes Nova different:**
- ⚡ **Zero infrastructure** — no VPS, no domain needed to start
- 🌍 **Per-ISP clean-IP** — auto-optimized for each Iranian ISP
- 👥 **Multi-user** — per-user links with quota, expiry, and on/off control
- 🤖 **Telegram bot** — full management from Telegram
- 🔗 **Proxy chaining** — SOCKS5, HTTP, HTTPS, TURN, SSTP
- 🛡️ **Advanced evasion** — ECH, TLS fragment, 0-RTT, fingerprint
- 🧩 **Backend mode** — connect to your own Xray/sing-box VPS for VLESS + UDP calls

---

## ⚡ Quick Install

Choose your preferred method:

### 🖥️ Nova Wizard (Desktop)

The official desktop installer with a graphical interface — no technical knowledge required.

[**→ Download Nova Wizard for Windows & Linux**](https://github.com/IRNova/Nova-Wizard)

### 🌐 Web Installer

Visit the official site and follow the step-by-step guide:

[**→ novaproxy.online/install**](https://novaproxy.online/install)

---

### 📱 Mobile

- **Android:** **Radar** — an Android app with a built-in wizard for one-click Nova Proxy installation on Cloudflare. Coming soon.
- **iOS:** Currently in development.

---

## 🛰 Backend Mode (VLESS + Voice/Video Calls)

Cloudflare Workers cannot run native TCP proxy or handle UDP traffic directly. To enable these features, Nova supports **Backend Mode** — forward traffic to your own Xray or sing-box VPS.

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/IRNova/Tools/main/nova-backend.sh)
```

After running the installer, enable Backend Mode in the Nova panel (Network Settings → Backend Mode) and enter your VPS URL.

---

## 📋 Prerequisites

- A **Cloudflare account** (free) with Workers enabled
- A **KV namespace** (created automatically by the one-click deploy, or manually via Wrangler)
- (Optional) Node.js v18+ and Wrangler CLI for local testing

---

## 🧬 Feature Evolution (v1 → v2 → v3)

| Feature | v1 | v2 | v3 |
|---------|:--:|:--:|:--:|
| Auto subscription link | ✅ | ✅ | ✅ |
| Base64 format | ✅ | ✅ | ✅ |
| Clash / Mihomo | ✅ | ✅ | ✅ |
| sing-box | ✅ | ✅ | ✅ |
| Loon | ✅ | ✅ | ✅ |
| Surge | ✅ | ✅ | ✅ |
| Load Balancing | ✅ | ✅ | ✅ |
| Health Check | ✅ | ✅ | ✅ |
| Ping test | ✅ | ✅ | ✅ |
| Best config selector | ✅ | ✅ | ✅ |
| QR Code | ✅ | ✅ | ✅ |
| Display config list | ✅ | ✅ | ✅ |
| DoH proxy | ✅ | ✅ | ✅ |
| DNS encryption | ✅ | ✅ | ✅ |
| DNS Load Balance / Failover / Caching | ✅ | ✅ | ✅ |
| Local DNS | ✅ | ✅ | ✅ |
| Anti Sanction DNS | ✅ | ✅ | ✅ |
| Fake DNS | ✅ | ✅ | ✅ |
| Routing / GeoIP / GeoSite | ✅ | ✅ | ✅ |
| Domestic Bypass | ✅ | ✅ | ✅ |
| IPv6 support | ✅ | ✅ | ✅ |
| AdBlock / PornBlock | ✅ | ✅ | ✅ |
| Cloudflare ports | ✅ | ✅ | ✅ |
| Trojan direct link | ✅ | ✅ | ✅ |
| Clash direct link | ✅ | ✅ | ✅ |
| Global SOCKS5 mode | ✅ | ✅ | ✅ |
| Global HTTP mode | ✅ | ✅ | ✅ |
| Clean Cloudflare IP scanner | ✅ | ✅ | ✅ |
| Telegram notifications | ✅ | ✅ | ✅ |
| Telegram bot management | ✅ | ✅ | ✅ |
| Quantumult X | ➖ | ✅ | ✅ |
| Mixed Auto (client detection) | ➖ | ✅ | ✅ |
| Random Path / Wildcard Host | ➖ | ✅ | ✅ |
| Admin dashboard (RTL Persian) | ➖ | ✅ | ✅ |
| Simple / Advanced mode | ➖ | ✅ | ✅ |
| Dark mode | ➖ | ✅ | ✅ |
| JSON Config Editor | ➖ | ✅ | ✅ |
| Log Viewer | ➖ | ✅ | ✅ |
| Reset config | ➖ | ✅ | ✅ |
| VLESS / Trojan / Shadowsocks | ➖ | ✅ | ✅ |
| gRPC / XHTTP transport | ➖ | ✅ | ✅ |
| WebSocket Early Data | ➖ | ✅ | ✅ |
| mux=0 for Shadowsocks | ➖ | ✅ | ✅ |
| SOCKS5 chain | ➖ | ✅ | ✅ |
| HTTP/HTTPS CONNECT chain | ➖ | ✅ | ✅ |
| TURN / SSTP chain | ➖ | ✅ | ✅ |
| Global HTTPS / TURN / SSTP mode | ➖ | ✅ | ✅ |
| Whitelist domains | ➖ | ✅ | ✅ |
| Chain in subscription link | ➖ | ✅ | ✅ |
| TLS 1.3 / 1.2 | ➖ | ✅ | ✅ |
| ChaCha20-Poly1305 / AES-GCM | ➖ | ✅ | ✅ |
| Custom ClientHello / ALPN | ➖ | ✅ | ✅ |
| SNI fragment / TLS fragment | ➖ | ✅ | ✅ |
| Fallback to ChaCha20 | ➖ | ✅ | ✅ |
| AES-128/256-GCM (Shadowsocks) | ➖ | ✅ | ✅ |
| Auto detection / Dynamic session key | ➖ | ✅ | ✅ |
| Online / API optimize, Custom IP list | ➖ | ✅ | ✅ |
| Random IP generator / Result tabs | ➖ | ✅ | ✅ |
| Save/Override results | ➖ | ✅ | ✅ |
| Per-ISP clean-IP optimization | ➖ | ✅ | ✅ |
| Telegram Webhook / Bot config in panel | ➖ | ✅ | ✅ |
| Cloudflare Usage Query / API Token | ➖ | ✅ | ✅ |
| Custom Usage API | ➖ | ✅ | ✅ |
| VLESS / Shadowsocks direct link | ➖ | ✅ | ✅ |
| Subscription with token | ➖ | ✅ | ✅ |
| Full clipboard copy | ➖ | ✅ | ✅ |
| KV storage (Config, CF, TG, IPs, Logs) | ➖ | ✅ | ✅ |
| Password login / Auth Cookie | ➖ | ✅ | ✅ |
| UUID validation / Token auth (MD5) | ➖ | ✅ | ✅ |
| Speed test block | ➖ | ✅ | ✅ |
| Environment variables | ➖ | ✅ | ✅ |
| Persian RTL / Responsive panel | ➖ | ✅ | ✅ |
| Leaflet map / Toast / Modal | ➖ | ✅ | ✅ |
| Collapse modules / SVG icons | ➖ | ✅ | ✅ |
| Copy to clipboard | ➖ | ✅ | ✅ |
| Concurrent TCP dial / 0-RTT | ➖ | ✅ | ✅ |
| Uplink coalescing / Downlink grain | ➖ | ✅ | ✅ |
| Upload queue limit | ➖ | ✅ | ✅ |
| IP Load Balance / Proxy Fallback | ➖ | ✅ | ✅ |
| Tokenless format-named sub links | ➖ | ➖ | ✅ |
| Permanent GitHub sub-mirror | ➖ | ➖ | ✅ |
| Bundled dashboard (Static Assets) | ➖ | ➖ | ✅ |
| Bilingual EN + FA UI + guided tour | ➖ | ➖ | ✅ |
| Malware / Phishing / Cryptominers blocking | ➖ | ➖ | ✅ |
| QUIC blocking | ➖ | ➖ | ✅ |
| Backend mode (VLESS + UDP / voice-video calls) | ➖ | ➖ | ✅ |
| ECH (Encrypted Client Hello) | ➖ | ➖ | ✅ |
| Port-spread / Multi-transport | ➖ | ➖ | ✅ |
| Telegram auto-announce domain updates | ➖ | ➖ | ✅ |
| Daily traffic chart + upload/download split | ➖ | ➖ | ✅ |
| Per-user link + total/daily quota + expiry + on/off + auto-disable | ➖ | ➖ | ✅ |
| Per-user sub link with username + secret key authentication | ➖ | ➖ | ✅ |
| Read-after-write KV cache for instant user config propagation | ➖ | ➖ | ✅ |
| NAT64 / IPv6 transition support | ➖ | ➖ | ✅ |
| Panel password change + 2FA (TOTP) + recovery | ➖ | ➖ | ✅ |
| Login rate limiting + session management | ➖ | ➖ | ✅ |
| WARP account register + WARP+ license + WoW | ➖ | ➖ | ✅ |
| WARP endpoint switcher + Iran-friendly endpoints | ➖ | ➖ | ✅ |
| WARP Amnezia mode + WARP Noise | ➖ | ➖ | ✅ |
| One-tap Iran mode + live config report | ➖ | ➖ | ✅ |
| Backup & Restore (export/import all settings) | ➖ | ➖ | ✅ |
| Cross-infra fallback (non-CF nodes) | ➖ | ➖ | ✅ |
| Self-healing domain pool + health checking | ➖ | ➖ | ✅ |
| Bypass countries (China, Russia, sanctions) | ➖ | ➖ | ✅ |
| Custom routing rules | ➖ | ➖ | ✅ |
| Central management API + fleet stats + broadcast | ➖ | ➖ | ✅ |
| Kill switch (global pause/resume) | ➖ | ➖ | ✅ |
| Instance heartbeat + announcement system | ➖ | ➖ | ✅ |
| D1 database support (KV migration) | ➖ | ➖ | ✅ |
| /install wizard + one-click Deploy to Cloudflare | ➖ | ➖ | ✅ |

---

## 💜 Support

If Nova helps you, please **⭐ star the repo** and consider a small donation — it keeps the project alive and free for everyone.

<div align="center">

### ⭐ [Star Nova on GitHub](https://github.com/IRNova/Nova-Proxy) ⭐

[![Star on GitHub](https://img.shields.io/github/stars/IRNova/Nova-Proxy?style=for-the-badge&logo=github&label=Star%20Nova&color=8957e5)](https://github.com/IRNova/Nova-Proxy)

| Coin | Address |
|------|---------|
| **TON** | `UQD51lGC35rP_SbVYgbFA7CEEii4GVMFgqj4N8fiGi6m425w` |

</div>

---

## 🙏 Credits

Built with ❤️ for a free and open internet.

- [@iiviirv](https://github.com/iiviirv) — developer
- [Cloudflare Workers](https://workers.cloudflare.com/)
- [Xray-core](https://github.com/XTLS/xray-core)

---

## License

MIT — see the [LICENSE](LICENSE) file.

---

<div align="center">

Made for Iran 🇮🇷 — and anyone who needs a free, open internet.
**Nothing about your traffic is logged. The proxy is yours.**

📖 [Persian version](README.fa.md)

</div>
