<div align="center">

# 🌟 Nova Proxy

**A personal, censorship-resistant proxy + dashboard on a single Cloudflare Worker.**
**یک پروکسی شخصی و ضدسانسور به‌همراه پنل، روی یک Cloudflare Worker.**

VLESS · Trojan · Shadowsocks over WebSocket + TLS — with a self-contained bilingual
(English + فارسی) dashboard, per-user accounts, clean-IP optimization, a Telegram bot,
WARP, and one-click deploy. Runs on Cloudflare's **free** tier.

</div>

---

## 🚀 One-click deploy (no terminal, no API token)

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/IRNova/Nova-Proxy)

1. Click the button above → log in / authorize on your **own** Cloudflare account.
2. Cloudflare automatically **creates the D1 database, binds it, and deploys the Worker**.
3. Open your new Worker URL → the **`/install`** wizard asks for an admin password. Done.
4. Sign in at **`/login`**. The dashboard shows your subscription link + QR.

> **🇮🇷 For Iran:** `*.workers.dev` is filtered. After deploying, add a **Custom Domain**
> (Workers → Settings → Domains & Routes → Add Custom Domain, e.g. `cdn.yourdomain.com`).
> Configs then use that domain's SNI — far more reliable.

---

## ✨ Features

- **Protocols:** VLESS, Trojan, Shadowsocks over WebSocket / gRPC / XHTTP, with ECH + TLS fragment.
- **Per-user accounts:** dedicated links, data quotas, daily limits, expiry, auto-disable, usage stats.
- **Subscriptions:** Clash / Mihomo, sing-box, Xray, Surge — generated automatically.
- **Clean-IP optimization** + per-ISP pools.
- **WARP / WireGuard** (for UDP / voice-video calls).
- **Telegram bot** — full panel management, kill-switch, and one-command Cloudflare install.
- **Routing rules:** block ads / malware / phishing / QUIC; bypass Iran / China / Russia / sanctions.
- **Backend mode (optional):** forward to your own Xray/sing-box VPS to unlock **VMess + working calls**.
- **Bilingual dashboard** (English + فارسی), traffic chart, 2FA, backup/restore.

---

## 🛠 Manual deploy (advanced)

```bash
git clone https://github.com/IRNova/Nova-Proxy.git
cd Nova-Proxy
# create a D1 database, put its id in wrangler.jsonc (database_id), then:
npx wrangler deploy
```

The Worker creates its own D1 tables on first request — no migration step needed.

---

## 🛰 Backend mode (VMess + calls)

Cloudflare Workers can't run VMess or UDP. To enable them, run your own Xray/sing-box VPS
and point Nova at it (Network & IPs → Backend mode). A one-line installer is provided:

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/IRNova/Tools/main/nova-backend.sh)
```

---

## License

MIT
