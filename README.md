<div align="center">

# Nova Proxy

**A free, self-hosted proxy panel built to stay online where the internet is filtered.**

Deploy your own private panel to a free Cloudflare account in minutes. Multi-user, quota and expiry control, per-user links, and routing tuned for high-censorship networks like Iran.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/IRNova/Nova-Proxy)

[Telegram](https://t.me/irnova_proxy) · [Instagram](https://instagram.com/irnova_proxy) · [X](https://x.com/irNovaProxy) · [YouTube](https://youtube.com/@novaproxyir) · [Client app](https://github.com/IRNova/Nova-Client)

English | [فارسی](#فارسی)

</div>

---

## What it is

Nova Proxy is a control panel and edge worker that runs on Cloudflare Workers. You deploy it to **your own** free Cloudflare account, so the bandwidth, the domain, and the data are all yours. There is no shared server and no middleman. It is built to be a free, high-quality tool, not a reseller platform.

The panel gives you a clean dashboard (English, فارسی, and Русский) to create users, hand each person their own subscription link, and keep everyone connected on networks that actively filter traffic.

## Features

- **Multi-user management** with per-user quota, expiry, daily limits, and one private link each.
- **Resistance Policy** presets: routing tuned for Iran and other high-censorship networks (port spread, domestic bypass, ad and tracker blocking, and more), each with a plain-language on/off.
- **Nova Radar**: an in-browser scanner that finds the fastest clean Cloudflare IPs for the current network and applies them in one click, per user.
- **Universal config formats**: every user link works as Auto, Base64, or Clash, so it imports into almost any client.
- **Calls support**: optional WARP node for FaceTime, WhatsApp, and Telegram calls (UDP), plus a backend mode for full-quality routing through your own server.
- **Mixed protocol**: hand out one link that carries both VLESS and Trojan, so if a filter blocks one, the app keeps working on the other.
- **GitHub mirror failover**: publishes your subscription to a GitHub repo so users keep a permanent `raw.githubusercontent.com` link even if your domain gets filtered.
- **Telegram bot control**: manage users (add, edit, quota, expiry, extend, delete) straight from a bot, in EN, FA, or RU.
- **Node name templates**: brand every node name with a template ({FLAG} {COUNTRY} {CITY} {NAME} {DATE} and more).
- **Self-healing links**: if your worker domain changes or a host goes down, configs fall back to a working address on their own.

## Quick start

You need a free [Cloudflare](https://dash.cloudflare.com/sign-up) account.

**Option A, one-click:** use the Deploy to Cloudflare button in the repo and follow the prompts. Cloudflare's supported deployment flow creates the Worker, the KV namespace, and the D1 database, then connects Workers Builds. You do not create or paste a Cloudflare API token into Nova.

### Easy, reviewable updates

Repositories created from this project include a daily **Check for Nova updates** GitHub Action. When a release is available, it opens a pull request containing only `worker.js` and `version.json`. Review the diff and Cloudflare preview, then merge to deploy through Workers Builds. Nontechnical users can optionally enable validated hands-off updates with one repository variable. See [UPDATES.md](UPDATES.md) for review mode, automatic mode, and rollback instructions.

**Option B, Wrangler (CLI):**

```bash
# 1. install the Cloudflare CLI
npm install -g wrangler
wrangler login

# 2. install dependencies and deploy
# Wrangler provisions and binds KV and D1 automatically.
npm ci
npm run deploy
```

After it deploys, open `https://<your-worker>.workers.dev/`, finish the short setup, and set your admin login. That is your panel.

## Using it

1. Open the panel and turn on multi-user.
2. Create a user (name, quota, expiry). The panel generates their private link.
3. Copy that user's link and send it to them.
4. They open it on their phone, pick **Auto**, **Base64**, or **Clash**, and import it into their app.

The recommended client is **[Nova Client](https://github.com/IRNova/Nova-Client)** (iOS, Android, and desktop). Any standard client that reads Base64 or Clash also works.

## Clients

| Format | Works with |
| --- | --- |
| Auto | Most apps, picks the right format automatically |
| Base64 | v2rayNG and classic apps |
| Clash | Clash Meta, FlClash, Karing |

## Links

- Telegram: https://t.me/irnova_proxy
- Instagram: https://instagram.com/irnova_proxy
- X: https://x.com/irNovaProxy
- YouTube: https://youtube.com/@novaproxyir
- Client app: https://github.com/IRNova/Nova-Client
- Organization: https://github.com/IRNova

## Release notes

**Build 2026-07-14**

- Fixed a data-loss bug where saving Network Settings could clear the user list. Users, multi-user state, and the host pool are now preserved on every save.
- Simplified config sharing to three universal formats: Auto, Base64, and Clash. One link now imports into almost any client.
- Added a Quick actions panel to the dashboard and cleaned up the mobile Users screen.
- Hardened the GitHub mirror: the access token is trimmed before use, so a token pasted with extra whitespace no longer fails.

## Notes

- **This is self-hosted.** Each person runs their own panel on their own free Cloudflare account, so it scales without any shared cost.
- **Free Cloudflare limits apply.** Calls use UDP, which a plain free Worker cannot carry. Enable the WARP node or a backend server for voice and video calls.
- **Keep the panel private.** Do not share your admin login. User subscription links are credentials, treat them like passwords.
- Nova Proxy is a free tool for open access to the internet. Use it responsibly and in line with the laws that apply to you.

## License

See the [LICENSE](LICENSE) file in this repository.

---

<a name="فارسی"></a>
<div dir="rtl" align="right">

# نُوا پروکسی (Nova Proxy)

**یک پنل پروکسی رایگان و خودمیزبان که ساخته شده تا جایی که اینترنت فیلتر است، آنلاین بماند.**

پنل خصوصی خودتان را در چند دقیقه روی یک حساب رایگان Cloudflare راه‌اندازی کنید. چندکاربره، با کنترل حجم و انقضا، لینک اختصاصی برای هر کاربر، و مسیریابی تنظیم‌شده برای شبکه‌های پرفیلتر مثل ایران.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/IRNova/Nova-Proxy)

[تلگرام](https://t.me/irnova_proxy) · [اینستاگرام](https://instagram.com/irnova_proxy) · [ایکس](https://x.com/irNovaProxy) · [یوتیوب](https://youtube.com/@novaproxyir) · [اپلیکیشن کلاینت](https://github.com/IRNova/Nova-Client)

[English](#nova-proxy) | فارسی

## این چیست

نُوا پروکسی یک پنل مدیریت و یک ورکر لبه است که روی Cloudflare Workers اجرا می‌شود. آن را روی حساب رایگان **خودتان** در Cloudflare نصب می‌کنید، پس پهنای باند، دامنه و داده‌ها همه مال شماست. نه سرور مشترکی در کار است و نه واسطه‌ای. این ابزار برای رایگان و باکیفیت‌بودن ساخته شده، نه برای فروش اشتراک.

پنل یک داشبورد تمیز (به انگلیسی، فارسی و روسی) در اختیارتان می‌گذارد تا کاربر بسازید، به هر نفر لینک اشتراک اختصاصی بدهید، و همه را روی شبکه‌هایی که ترافیک را فعالانه فیلتر می‌کنند، متصل نگه دارید.

## امکانات

- **مدیریت چندکاربره** با حجم، انقضا و محدودیت روزانهٔ اختصاصی برای هر کاربر و یک لینک خصوصی برای هر نفر.
- **سیاست مقاومت (Resistance Policy)**: تنظیمات آمادهٔ مسیریابی برای ایران و شبکه‌های پرفیلتر (پخش پورت، عبور مستقیم سایت‌های داخلی، مسدودسازی تبلیغ و ردیاب و بیشتر)، هرکدام با یک کلید روشن/خاموش ساده.
- **نُوا رادار**: اسکنری داخل مرورگر که سریع‌ترین آی‌پی‌های تمیز Cloudflare را برای شبکهٔ فعلی پیدا می‌کند و با یک کلیک برای هر کاربر اعمال می‌کند.
- **فرمت‌های همگانی کانفیگ**: لینک هر کاربر به‌صورت Auto، Base64 یا Clash کار می‌کند و تقریباً در هر اپلیکیشنی وارد می‌شود.
- **پشتیبانی از تماس**: نود اختیاری WARP برای تماس‌های فیس‌تایم، واتساپ و تلگرام (UDP)، به‌همراه حالت بک‌اند برای مسیریابی باکیفیت کامل از طریق سرور خودتان.
- **پروتکل ترکیبی**: یک لینک بدهید که هم VLESS و هم Trojan را حمل کند، تا اگر فیلتر یکی را بست، اپ روی دیگری کار کند.
- **پشتیبان گیت‌هاب (Mirror)**: اشتراک شما را در یک ریپازیتوری گیت‌هاب منتشر می‌کند تا کاربران یک لینک دائمی `raw.githubusercontent.com` داشته باشند، حتی اگر دامنهٔ شما فیلتر شود.
- **هاب چندپنلی**: چند پنل را اجرا کنید و تنظیماتتان را از یک جا به همه بفرستید.
- **کنترل با ربات تلگرام**: کاربران را (افزودن، ویرایش، حجم، انقضا، تمدید، حذف) مستقیم از داخل ربات مدیریت کنید، به انگلیسی، فارسی یا روسی.
- **قالب نام نودها**: نام هر نود را با یک قالب برندسازی کنید ({FLAG} {COUNTRY} {CITY} {NAME} {DATE} و بیشتر).
- **لینک‌های خودترمیم**: اگر دامنهٔ ورکر عوض شود یا میزبانی از کار بیفتد، کانفیگ‌ها خودشان به یک آدرس سالم برمی‌گردند.

## شروع سریع

به یک حساب رایگان [Cloudflare](https://dash.cloudflare.com/sign-up) نیاز دارید.

**روش الف، تک‌کلیک:** از دکمهٔ Deploy to Cloudflare در ریپازیتوری استفاده کنید و مراحل را دنبال کنید. مسیر رسمی استقرار Cloudflare خودش ورکر، فضای KV و پایگاه‌دادهٔ D1 را می‌سازد و Workers Builds را وصل می‌کند. لازم نیست توکن API کلادفلر را داخل Nova وارد کنید.

### به‌روزرسانی آسان و قابل بررسی

ریپازیتوری‌های ساخته‌شده از این پروژه شامل GitHub Action روزانهٔ **Check for Nova updates** هستند. وقتی نسخهٔ جدیدی موجود باشد، یک Pull Request فقط برای `worker.js` و `version.json` باز می‌شود. تغییرات و پیش‌نمایش Cloudflare را بررسی کنید و سپس برای استقرار از طریق Workers Builds آن را ادغام کنید. کاربران غیر فنی می‌توانند به‌صورت اختیاری به‌روزرسانی خودکارِ اعتبارسنجی‌شده را با یک متغیر مخزن فعال کنند. راهنمای حالت بررسی، حالت خودکار و بازگشت نسخه در [UPDATES.md](UPDATES.md) است.

**روش ب، Wrangler (خط فرمان):**

```bash
# ۱. نصب ابزار خط فرمان Cloudflare
npm install -g wrangler
wrangler login

# ۲. نصب وابستگی‌ها و انتشار
# Wrangler فضای KV و D1 را خودکار می‌سازد و متصل می‌کند.
npm ci
npm run deploy
```

پس از انتشار، آدرس `https://<your-worker>.workers.dev/` را باز کنید، راه‌اندازی کوتاه را کامل کنید و ورود مدیر را تنظیم کنید. همین، این پنل شماست.

## نحوهٔ استفاده

۱. پنل را باز کنید و حالت چندکاربره را روشن کنید.
۲. یک کاربر بسازید (نام، حجم، انقضا). پنل لینک خصوصی او را می‌سازد.
۳. لینک همان کاربر را کپی کنید و برایش بفرستید.
۴. او روی گوشی‌اش بازش می‌کند، یکی از **Auto**، **Base64** یا **Clash** را انتخاب می‌کند و در اپش وارد می‌کند.

کلاینت پیشنهادی **[نُوا کلاینت](https://github.com/IRNova/Nova-Client)** است (iOS، اندروید و دسکتاپ). هر کلاینت استانداردی که Base64 یا Clash را بخواند هم کار می‌کند.

## کلاینت‌ها

| فرمت | مناسب برای |
| --- | --- |
| Auto | بیشتر اپ‌ها، خودش فرمت درست را انتخاب می‌کند |
| Base64 | v2rayNG و اپ‌های کلاسیک |
| Clash | Clash Meta، FlClash، Karing |

## لینک‌ها

- تلگرام: https://t.me/irnova_proxy
- اینستاگرام: https://instagram.com/irnova_proxy
- ایکس: https://x.com/irNovaProxy
- یوتیوب: https://youtube.com/@novaproxyir
- اپلیکیشن کلاینت: https://github.com/IRNova/Nova-Client
- سازمان: https://github.com/IRNova

## یادداشت‌های نسخه

**نسخهٔ ۲۰۲۶-۰۷-۱۴**

- رفع یک باگ ازدست‌رفتن داده که در آن ذخیرهٔ تنظیمات شبکه می‌توانست فهرست کاربران را پاک کند. حالا کاربران، وضعیت چندکاربره و مجموعهٔ میزبان‌ها در هر ذخیره حفظ می‌شوند.
- ساده‌سازی اشتراک‌گذاری کانفیگ به سه فرمت همگانی: Auto، Base64 و Clash. یک لینک حالا تقریباً در هر کلاینتی وارد می‌شود.
- افزودن پنل «دسترسی سریع» به داشبورد و مرتب‌سازی صفحهٔ کاربران در موبایل.
- مقاوم‌سازی پشتیبان گیت‌هاب: توکن دسترسی پیش از استفاده پیرایش می‌شود، پس توکنی که با فاصلهٔ اضافی چسبانده شده دیگر خطا نمی‌دهد.

## نکات

- **این ابزار خودمیزبان است.** هر نفر پنل خودش را روی حساب رایگان Cloudflare خودش اجرا می‌کند، پس بدون هیچ هزینهٔ مشترکی مقیاس می‌گیرد.
- **محدودیت‌های رایگان Cloudflare اعمال می‌شود.** تماس‌ها از UDP استفاده می‌کنند که یک ورکر رایگان ساده نمی‌تواند حملش کند. برای تماس صوتی و تصویری نود WARP یا یک سرور بک‌اند را فعال کنید.
- **پنل را خصوصی نگه دارید.** ورود مدیر را با کسی به اشتراک نگذارید. لینک اشتراک کاربران یک اعتبارنامه است، مثل رمز عبور با آن رفتار کنید.
- نُوا پروکسی ابزاری رایگان برای دسترسی آزاد به اینترنت است. مسئولانه و مطابق قوانینی که بر شما اعمال می‌شود از آن استفاده کنید.

## مجوز

فایل [LICENSE](LICENSE) در همین ریپازیتوری را ببینید.

</div>
