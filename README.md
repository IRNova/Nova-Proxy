<div align="center">

# 🌟 Nova Proxy

**A personal, censorship-resistant proxy + dashboard on a single Cloudflare Worker.**
**یک پروکسی شخصی و ضدسانسور به‌همراه پنل، روی یک Cloudflare Worker.**

VLESS · Trojan · Shadowsocks over WebSocket + TLS — with a self-contained
bilingual (English + فارسی) dashboard, per-ISP clean-IP optimization, multi-user
links, a Telegram bot, WARP, and one-click deploy. Runs on Cloudflare's **free** tier.

🌐 [novaproxy.online](https://novaproxy.online) · ✈️ [Telegram](https://t.me/irnova_proxy) · 𝕏 [@irNovaProxy](https://x.com/irNovaProxy)

</div>

---

## ⚡ One-click deploy (no API token, no CLI)

1. Click **Deploy to Cloudflare** above → log in / authorize.
2. Cloudflare forks the repo, **creates the Worker, auto-creates the KV namespace,
   and bundles the dashboard** — all automatically.
3. Open your Worker URL → a short **`/install`** wizard asks for an admin password. Done.
4. Sign in at **`/login`**. The dashboard shows your **subscription link + QR**.

> **🇮🇷 For Iran:** `*.workers.dev` is filtered. After deploying, add a **custom
> domain** (Workers → Settings → Domains & Routes → Add Custom Domain, e.g.
> `cdn.yourdomain.com`). Configs then use that domain's SNI — far more reliable.

---

## 🧬 Section 1 — Feature evolution (v1 → v2 → v3)

| Feature / قابلیت | v1 | v2 | v3 |
|------------------|:--:|:--:|:--:|
| Auto subscription link / دریافت لینک اشتراک خودکار | ✅ | ✅ | ✅ |
| Base64 format / فرمت Base64 | ✅ | ✅ | ✅ |
| Clash / Mihomo | ✅ | ✅ | ✅ |
| sing-box | ✅ | ✅ | ✅ |
| Loon | ✅ | ✅ | ✅ |
| Surge | ✅ | ✅ | ✅ |
| Load Balancing / توزیع بار | ✅ | ✅ | ✅ |
| Health Check / بررسی سلامت | ✅ | ✅ | ✅ |
| Ping test / تست پینگ | ✅ | ✅ | ✅ |
| Best config / بهترین کانفیگ | ✅ | ✅ | ✅ |
| QR Code | ✅ | ✅ | ✅ |
| Display config list / نمایش لیست کانفیگ | ✅ | ✅ | ✅ |
| DoH proxy / پروکسی DoH | ✅ | ✅ | ✅ |
| Cloudflare / Google / Quad9 / AdGuard / ControlD / Mullvad / NextDNS | ✅ | ✅ | ✅ |
| DNS encryption / رمزگذاری DNS | ✅ | ✅ | ✅ |
| DNS Load Balance / Failover / Caching | ✅ | ✅ | ✅ |
| Local DNS / DNS محلی | ✅ | ✅ | ✅ |
| Anti Sanction DNS / دور زدن تحریم | ✅ | ✅ | ✅ |
| Fake DNS / IP جعلی | ✅ | ✅ | ✅ |
| Routing activation / مسیریابی | ✅ | ✅ | ✅ |
| GeoIP / GeoSite (Iran) / تشخیص IP و دامنه ایرانی | ✅ | ✅ | ✅ |
| Domestic Bypass / اتصال مستقیم به سایت ایرانی | ✅ | ✅ | ✅ |
| IPv6 support / پشتیبانی IPv6 | ✅ | ✅ | ✅ |
| AdBlock / PornBlock | ✅ | ✅ | ✅ |
| Cloudflare ports / پورت‌های کلادفلیر | ✅ | ✅ | ✅ |
| Trojan direct link / لینک مستقیم Trojan | ✅ | ✅ | ✅ |
| Clash direct link / لینک مستقیم Clash | ✅ | ✅ | ✅ |
| Global SOCKS5 mode / حالت سراسری SOCKS5 | ✅ | ✅ | ✅ |
| Global HTTP mode / حالت سراسری HTTP | ✅ | ✅ | ✅ |
| Clean Cloudflare IP scanner / اسکن IP تمیز | ✅ | ✅ | ✅ |
| 9+ sources / CSV export / ۹+ منبع و خروجی CSV | ✅ | ✅ | ✅ |
| Telegram notifications / نوتیفیکیشن تلگرام | ✅ | ✅ | ✅ |
| Telegram bot management / مدیریت ربات تلگرام | ✅ | ✅ | ✅ |
| QR Code generator / تولید QR کد | ✅ | ✅ | ✅ |
| Quantumult X | ➖ | ✅ | ✅ |
| Mixed Auto / تشخیص خودکار کلاینت | ➖ | ✅ | ✅ |
| Random Path / Wildcard Host | ➖ | ✅ | ✅ |
| Admin dashboard (RTL Persian) / پنل مدیریت فارسی | ➖ | ✅ | ✅ |
| Simple / Advanced mode / حالت ساده و پیشرفته | ➖ | ✅ | ✅ |
| Dark mode / تم تاریک | ➖ | ✅ | ✅ |
| JSON Config Editor / ویرایش JSON | ➖ | ✅ | ✅ |
| Log Viewer / مشاهده لاگ | ➖ | ✅ | ✅ |
| Reset config / بازنشانی تنظیمات | ➖ | ✅ | ✅ |
| VLESS / Trojan / Shadowsocks | ➖ | ✅ | ✅ |
| gRPC / XHTTP transport | ➖ | ✅ | ✅ |
| WebSocket Early Data | ➖ | ✅ | ✅ |
| mux=0 for Shadowsocks | ➖ | ✅ | ✅ |
| SOCKS5 chain / زنجیره SOCKS5 | ➖ | ✅ | ✅ |
| HTTP/HTTPS CONNECT chain | ➖ | ✅ | ✅ |
| TURN / SSTP chain | ➖ | ✅ | ✅ |
| Global HTTPS mode | ➖ | ✅ | ✅ |
| Global TURN mode | ➖ | ✅ | ✅ |
| Global SSTP mode | ➖ | ✅ | ✅ |
| Whitelist domains / لیست سفید دامنه | ➖ | ✅ | ✅ |
| Chain in subscription link | ➖ | ✅ | ✅ |
| TLS 1.3 / 1.2 | ➖ | ✅ | ✅ |
| ChaCha20-Poly1305 / AES-GCM | ➖ | ✅ | ✅ |
| Custom ClientHello / ALPN | ➖ | ✅ | ✅ |
| SNI fragment / TLS fragment | ➖ | ✅ | ✅ |
| Fallback to ChaCha20 | ➖ | ✅ | ✅ |
| AES-128/256-GCM (Shadowsocks) | ➖ | ✅ | ✅ |
| Auto detection / Dynamic session key | ➖ | ✅ | ✅ |
| Online optimize in worker | ➖ | ✅ | ✅ |
| API optimize / Custom IP list | ➖ | ✅ | ✅ |
| Random IP generator / Result tabs | ➖ | ✅ | ✅ |
| Save/Override results | ➖ | ✅ | ✅ |
| Per-ISP clean-IP optimization | ➖ | ✅ | ✅ |
| Telegram Webhook / SetWebhook | ➖ | ✅ | ✅ |
| Bot config in panel | ➖ | ✅ | ✅ |
| Cloudflare Usage Query / API Token | ➖ | ✅ | ✅ |
| Custom Usage API | ➖ | ✅ | ✅ |
| VLESS direct link | ➖ | ✅ | ✅ |
| Shadowsocks direct link | ➖ | ✅ | ✅ |
| Subscription with token | ➖ | ✅ | ✅ |
| Full clipboard copy | ➖ | ✅ | ✅ |
| KV storage (Config, CF, TG, IPs, Logs) | ➖ | ✅ | ✅ |
| Password login / Auth Cookie | ➖ | ✅ | ✅ |
| UUID validation / Token auth (MD5) | ➖ | ✅ | ✅ |
| Speed test block | ➖ | ✅ | ✅ |
| Environment variables / متغیرهای محیطی | ➖ | ✅ | ✅ |
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
| Bilingual EN + فارسی UI | ➖ | ➖ | ✅ |
| Guided tour / تور راهنما | ➖ | ➖ | ✅ |
| Malware blocking / مسدودسازی بدافزار | ➖ | ➖ | ✅ |
| ECH (Encrypted Client Hello) | ➖ | ➖ | ✅ |
| Port-spread / Multi-transport | ➖ | ➖ | ✅ |
| Telegram auto-announce domain updates | ➖ | ➖ | ✅ |
| Daily traffic chart / نمودار ترافیک روزانه | ➖ | ➖ | ✅ |
| Upload/download split / تفکیک آپلود و دانلود | ➖ | ➖ | ✅ |
| Per-user link / لینک اختصاصی کاربر | ➖ | ➖ | ✅ |
| Per-user quota (GB) / سهمیه کاربر | ➖ | ➖ | ✅ |
| Expiry date / تاریخ انقضا | ➖ | ➖ | ✅ |
| On/off toggle / فعال/غیرفعال کردن کاربر | ➖ | ➖ | ✅ |
| Panel password change / تغییر رمز پنل | ➖ | ➖ | ✅ |
| 2FA (TOTP) + recovery codes | ➖ | ➖ | ✅ |
| WARP account register | ➖ | ➖ | ✅ |
| WARP+ license / WoW | ➖ | ➖ | ✅ |
| WARP endpoint switcher | ➖ | ➖ | ✅ |
| Iran-friendly endpoints | ➖ | ➖ | ✅ |
| One-tap Iran mode / حالت یک‌کلیک ایران | ➖ | ➖ | ✅ |
| Live config report / گزارش زنده کانفیگ | ➖ | ➖ | ✅ |
| Backup & Restore / پشتیبان‌گیری و بازیابی | ➖ | ➖ | ✅ |
| Cross-infra fallback (non-CF nodes) | ➖ | ➖ | ✅ |
| Self-healing domain pool | ➖ | ➖ | ✅ |
| Central management API / API مدیریت متمرکز | ➖ | ➖ | ✅ |
| Fleet stats / Broadcast / آمار و ارسال همگانی | ➖ | ➖ | ✅ |
| Deploy to Cloudflare (one-click) | ➖ | ➖ | ✅ |
| /install wizard / ویزارد نصب | ➖ | ➖ | ✅ |

---
## 🎨 طرح رنگی

| رنگ | کد | کاربرد |
|-----|-----|--------|
| 🟦 آبی فیروزه‌ای | `#0ea5e9` | رنگ اصلی، دکمه‌ها، لینک‌ها |
| 🟪 بنفش ملایم | `#8b5cf6` | رنگ دوم، اکسنت‌ها |
| ⬜ سفید | `#ffffff` | پس‌زمینه اصلی |
| 🧱 خاکستری روشن | `#f8fafc` | پس‌زمینه کارت‌ها |
| ⚫ خاکستری تیره | `#1e293b` | متن اصلی |

---

## 📋 پیش‌نیازها

- حساب Cloudflare با Workers و KV Namespace
- Node.js (نسخه 18+) برای تست محلی
- Wrangler CLI

---

## ⚙️ متغیرهای محیطی

| متغیر | توضیحات | پیش‌فرض |
|-------|---------|---------|
| `PASSWORD` | رمز عبور پنل مدیریت | (اجباری) |
| `UUID` | شناسه کاربری ثابت (فرمت UUID v4) | خودکار از PASSWORD+KEY |
| `PROXYIP` | آدرس پروکسی خروجی (فرمت host:port) | auto (colo proxyip) |
| `SOCKS5` | پروکسی زنجیره‌ای SOCKS5 | - |
| `HTTP` | پروکسی زنجیره‌ای HTTP | - |
| `HTTPS` | پروکسی زنجیره‌ای HTTPS | - |
| `TURN` | پروکسی زنجیره‌ای TURN | - |
| `SSTP` | پروکسی زنجیره‌ای SSTP | - |
| `HOST` | هاست‌های مجاز (جداسازی با ,) | hostname فعلی |
| `KEY` | کلید رمزنگاری | `勿动此默认密钥...` |
| `KV` | فضای ذخیره‌سازی KV | (اجباری) |
| `GO2SOCKS5` | دامنه‌های اضافی برای SOCKS5 | - |
| `DEBUG` | فعال‌سازی لاگ خطایابی | `false` |
| `URL` | آدرس سایت مجاز (mask/decoy) | nginx |
| `BEST_SUB` | فعال‌سازی تولیدکننده اشتراک | `false` |
| `ADMIN` | رمز عبور (جایگزین PASSWORD) | - |

---

## 📊 آمار

| آیتم | تعداد |
|------|-------|
| ⭐ ستاره‌ها | [Star Chart](https://starchart.cc/IRNova/Nova-Proxy) |
| 📦 محدوده IP ایران | +1000 CIDR |
| 🌐 دامنه ایرانی | +100 دامنه |
| 📢 دامنه تبلیغاتی | +150 دامنه |
| 🔞 دامنه بزرگسال | +80 دامنه |
| 🔌 پورت‌های Cloudflare | 443, 2053, 2083, 2087, 2096, 8443 |
| 🧩 پروتکل‌های انتقال | VLESS, Trojan, Shadowsocks, gRPC, XHTTP |
| 🔗 زنجیره پروکسی | SOCKS5, HTTP, HTTPS, TURN, SSTP |
| 🔐 رمزنگاری TLS | AES-GCM, ChaCha20-Poly1305, ECH |

---

## 🙏 تشکر

- [Cloudflare Workers](https://workers.cloudflare.com/)
- [Xray-core](https://github.com/XTLS/xray-core)
- [vahid](https://github.com/iiviirv)

---

---

<div align="center">
  <h3>حمایت از پروژه</h3>
  <p>از اینجا مارو با دونیت کردن حمایت کنید</p>
  <p><a href="https://daramet.com/NovaPr" target="_blank">🔗 https://daramet.com/NovaPr</a></p>
  <hr>
  <h4>کیف پول‌ها</h4>
  <p><strong>BTC:</strong></p>
  <pre><code>bc1qc54su3gz20ulq8df7k0pcskk4zz4sy0e7z7hws</code></pre>
  <p><strong>TON:</strong></p>
  <pre><code>UQD51lGC35rP_SbVYgbFA7CEEii4GVMFgqj4N8fiGi6m425w</code></pre>
</div>

---
## 📞 ارتباط

<p align="center">
  <a href="https://github.com/IRNova/Nova-Proxy">
    <img src="https://img.shields.io/badge/GitHub-گیتهاب-0ea5e9?style=for-the-badge&logo=github" alt="GitHub">
  </a>
  <a href="https://t.me/irnova_proxy">
    <img src="https://img.shields.io/badge/Telegram-تلگرام-0ea5e9?style=for-the-badge&logo=telegram" alt="Telegram Channel">
  </a>
</p>

<p align="center">
  برای دیدن آخرین تغییرات و پروژه‌های بیشتر حتماً عضو کانال ما شوید
</p>

---

<p align="center">
  <strong>نسخه V3.1.6 | با ❤️ برای جامعه ایران</strong><br>
  <a href="UPDATES.md">📝 تغییرات این نسخه / Build updates</a>
</p>

---

## Stargazers over time
[![Stargazers over time](https://starchart.cc/IRNova/Nova-Proxy.svg?variant=adaptive)](https://starchart.cc/IRNova/Nova-Proxy)

</div>
