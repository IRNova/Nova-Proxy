// Nova Proxy admin dashboard, bilingual (EN/FA) + light/dark, talks to the worker's /admin APIs.
// PANEL_VERSION = the version of these dashboard files (public/). Bump it whenever you change
// the panel, so after uploading you can confirm in the sidebar (under "Nova Proxy") that the
// new files are live. The Worker has its own version (shown next to it as "w…").
const PANEL_VERSION = '1.0.0';
const $ = (s) => document.getElementById(s);
let cfg = null;
try { const _t = document.querySelector('.brand .tag'); if (_t) { _t.textContent = 'Panel v' + PANEL_VERSION; _t.title = 'Nova dashboard v' + PANEL_VERSION; } console.log('%cNova panel v' + PANEL_VERSION, 'color:#22d3ee;font-weight:700'); } catch (e) {}

const T = {
  en: { dir:'ltr',
    nav_section:'Management', nav_home:'Dashboard', nav_sub:'Subscriptions', nav_ip:'Clean IPs', nav_isp:'Per-ISP pools', nav_net:'Network & DNS', nav_conn:'Network & IPs', tour_next:'Next', tour_prev:'Back', tour_done:'Done', nav_set:'Settings', nav_guide:'Guide', guide_s:'How to use Nova Proxy, step by step.', logout:'Logout', close:'Close',
    net_s:'Routing rules, ad-blocking, and secure DNS. These are baked into every Clash and sing-box config you hand out.',
    net_routing:'Smart routing', net_routing_h:'Decide what goes through the proxy and what stays direct.',
    net_enroute:'Enable routing rules', net_enroute_h:'turn the rule engine on',
    net_domestic:'Iran domestic direct', net_domestic_h:'Iranian sites bypass the proxy (faster, no quota use)',
    net_geoip:'GeoIP routing', net_geoip_h:'route by IP country', net_geosite:'GeoSite routing', net_geosite_h:'route by domain list',
    net_adblock:'Block ads & trackers', net_adblock_h:'drops known ad/tracker domains', net_porn:'Adult-content filter', net_porn_h:'block adult domains',
    net_dns:'Secure DNS', net_dns_h:'Encrypted DNS hides which sites you look up and helps reach sanctioned services.',
    net_doh:'DNS-over-HTTPS (DoH)', net_doh_h:'encrypt DNS lookups', net_dohprov:'DoH provider',
    net_antisanc:'Anti-sanction DNS', net_antisanc_h:'reach Google, GitHub, npm and other geo-blocked services', net_antiprov:'Anti-sanction provider', net_anticustom:'Custom DNS (if "Custom")',
    net_localdns:'Local DNS', net_localdns_h:'resolve some names on the device', net_localip:'Local DNS IP', net_localport:'Local DNS port',
    net_fakedns:'Fake DNS', net_fakedns_h:'faster connections, lower latency', net_fakeip:'Fake DNS range',
    net_dohurl:'Your private DoH endpoint (use in any browser/app)',
    net_adv:'Advanced', net_ipv6:'IPv6', net_ipv6_h:'allow IPv6 connections', net_lan:'Allow LAN', net_lan_h:'let other devices on your network use this', net_log:'Log level',
    preset_h:'Preset rules', preset_s:'Quick country bypass and category blocks, applied to Clash configs (in addition to the toggles above).',
    bp_cn:'Bypass China', bp_cn_h:'route China sites/IPs direct', bp_ru:'Bypass Russia', bp_ru_h:'route Russia sites/IPs direct',
    bk_quic:'Block QUIC', bk_quic_h:'force TCP (fixes some stalls / leaks)', bk_malware:'Block malware', bk_phishing:'Block phishing', bk_crypto:'Block cryptominers', bk_geo_h:'needs client geodata',
    rules_h:'Custom routing rules', rules_add:'Add rule', rules_help:'One rule per line, applied on top of the rule set. Format: TYPE,value,OUTBOUND (e.g. DOMAIN-SUFFIX,arvancloud.ir,DIRECT or DOMAIN-KEYWORD,ads,REJECT). OUTBOUND is DIRECT, REJECT, or PROXY. Needs routing enabled.',
    warp_h:'WARP (Cloudflare WireGuard)', warp_hint:"Route through Cloudflare's WARP network. Unlimited (it bypasses the worker's request limit) and often reaches blocked services. Register once, then turn it on.",
    warp_en:'Enable WARP', warp_en_h:'add a WireGuard outbound to every config', warp_mode:'Mode', warp_mode_warp:'WARP only (all traffic via WARP)', warp_mode_chain:'Chain (proxy, then WARP)',
    warp_acc:'WARP account', warp_register:'Register', warp_registering:'Registering…', warp_reg_ok:'WARP account registered', warp_reg_fail:'Registration failed',
    warp_status_none:'Not registered yet. Click Register.', warp_status_yes:'Registered',
    warp_mode_wow:'WoW (two WARP hops)', warp_amnezia:'AmneziaWG obfuscation', warp_dl_lbl:'Download WARP configs (50 endpoints, ready to import)', warp_dl_wg:'WireGuard', warp_dl_neko:'NekoRay', warp_amnezia_h:"junk packets so DPI can't fingerprint WARP (Clash)",
    warp_ep:'WARP endpoint (optional override)', warp_lic:'WARP+ license (optional)', warp_lic_h:'Free WARP works with no key — just tap Register. For more speed, paste a free WARP+ key (shared in community channels) here and Apply.', warp_apply:'Apply', warp_central:'From central pool', warp_applying:'Applying…',
    warp_lic_ok:'WARP+ applied', warp_lic_fail:'License failed', warp_plus:'WARP+', warp_wow_yes:'WoW ready (2 hops)',
    nav_notif:'Notifications', nav_users:'Users', nav_logs:'Logs', nav_manage:'Management', users_s:'Give each person their own link with a data quota and expiry. Disabling or expiring a user cuts off their connections.', users_h2:'Multi-user', users_en:'Enable multi-user', users_en_h:'off = single shared config (default)', users_note:'Experimental — verify on a device. Quota is approximate and works on WebSocket transport. Disable or expire a user to cut off their connections.', users_add:'+ Add user', users_empty:'No users yet — add one.', users_name:'name', users_copy:'Copy link', users_saved:'Saved ✓', sess_expired:'Session expired — please log out and log in again, then retry.', users_mu_hint:'Per-user links only work while multi-user is ON — saving while users exist turns it on automatically. Each user gets their own sub link (Copy link); quota is in GB (0 = unlimited) and the date is when the link expires.', users_col_name:'Name', users_col_quota:'Quota (GB)', users_col_expiry:'Expiry date', users_col_on:'On',
    manage_s:'Fleet overview and broadcasts. Needs your central server — set Central API in Settings → Advanced.',
    manage_fleet:'Fleet', manage_broadcast:'Broadcast announcement', manage_broadcast_s:'Shows as a banner on every connected panel.',
    manage_title:'Title', manage_text:'Text', manage_url:'Link (optional)', manage_send:'Send broadcast',
    manage_active:'Active instances', manage_total:'Total instances', manage_traffic:'Total traffic',
    manage_noapi:'Set the Central API (Settings → Advanced) and run your Nova control server to see the fleet here.', manage_err:'Could not reach the central server.',
    notif_s:'Worker usage and Telegram alerts.', notif_usage:'Worker requests', notif_usage_h:"Cloudflare's free plan allows 100,000 worker requests per day. Add credentials below to track it here.", notif_used:'Used today',
    notif_cf_id:'Account ID', notif_cf_tok:'API Token (Account Analytics: Read)', notif_tg:'Telegram alerts', notif_tg_h:'Get a message on each subscription fetch, config change, and login.', notif_tg_en:'Enable Telegram alerts', notif_tg_bot:'Bot token', notif_tg_chat:'Chat IDs', notif_tg_chat_h:'One or more — comma or new-line separated. Numeric user IDs and/or channel IDs (the bot must be admin of any channel).',
    logs_s:'Recent activity and errors on your proxy.', logs_recent:'Recent activity', logs_empty:'No activity yet.', log_time:'Time', log_type:'Event', log_ip:'IP', log_loc:'Location', log_asn:'Network',
    hosts_h:'Domains (HOST)', hosts_help:'One domain per line. Configs are built across these, so the app can switch domains if one is blocked. The first is the main host.',
    home_h:'Dashboard', home_s:'Status of your proxy.', health_h:'Domain health', health_s:'Live status of your front domains. The hourly cron also auto-announces changes to Telegram.', health_check:'Check now', iran_h:'🇮🇷 Iran mode (one tap)', iran_s:'Turns on the best resilience combo for Iran at once: all protocols + port-spread + fragment + ECH (and blocks QUIC, disables IPv6).', iran_btn:'Enable Iran mode', iran_btn_off:'Disable Iran mode', backup_h:'Backup & restore', backup_s:'Export all settings (config + network + users) to a file, or restore from one. The file contains secrets (tokens) — keep it safe.', backup_export:'Export', backup_import:'Import', qs_h:'Quick start', qs1:'Open the panel at /login and sign in with your admin password — or open the Nova app icon on your home screen.', qs2:'On the Dashboard, tap Iran mode once, then copy your subscription link (or scan the QR).', qs3:'Tap your app button (Hiddify / Karing / v2rayNG / sing-box) to import in one tap, connect, done.', qs4:'If a network blocks you, try another protocol/port in the app, or switch the Fragment preset in Settings.', status:'Status', st_host:'Host', st_net:'Network', st_kv:'Storage', st_app:'App', st_worker:'Worker usage', st_traffic:'Traffic today', u_chart_h:'Daily traffic (last 14 days)',
    usage_h:'Data usage', usage_s:'Total traffic Nova has served (approximate — free-tier safe).', u_today:'Today', u_month:'This month', u_year:'This year', u_all:'All time',
    fp_random:'random — recommended for Iran now', fp_hint:'"random" works best in Iran right now; if it stops working, try another or scan a different one.',
    hosts_connect:'⚠️ First connect each domain to your Worker (Cloudflare → your Worker → Settings → Domains & Routes → Add Custom Domain). Add it here only after it points to the Worker, otherwise configs won\'t connect.',
    help_lbl:'What is this?',
    help_home:'Your proxy status and your subscription link with a QR code. Copy the link or scan the QR to set up any app. Everything else in the menu is optional tuning.',
    help_sub:'The same subscription, ready in each app format (Auto, Base64, Clash, sing-box, Surge, Quantumult X, Loon). Copy the one your app uses, or scan its QR. They all point to the same proxy.',
    help_ip:'How the configs pick Cloudflare IPs. Smart (per-ISP) gives each user the best IPs for their operator; Custom list lets you paste your own; Random uses random Cloudflare IPs. You can also scan from your browser to find fast ones.',
    help_isp:'A live count of clean Cloudflare IPs known to work on each Iranian operator (MCI, Irancell, Shatel...), gathered by the Nova Radar scanner. The worker automatically serves each user the best IPs for their own network. Turn on Smart (per-ISP) on the Clean IPs page to populate this.',
    help_net:'Controls baked into every Clash and sing-box config: routing, Iran-direct, ad and adult blocking, secure and anti-sanction DNS, WARP, and your own routing rules. Press Save after a change, then reconnect in the app.',
    help_set:'The technical settings: protocol (VLESS/Trojan/SS), transport, TLS, fingerprint, your domains (HOST) and UUID. Defaults are good for most people; change these only if you know what you need.',
    help_notif:'See how many requests your worker is using (Cloudflare gives 100,000 per day free), and get Telegram alerts on subscription fetches, config changes, and logins.',
    help_logs:'Recent activity on your proxy: subscription fetches, setting changes, logins, and any errors, with the time, IP, and network.',
    your_sub:'Your subscription link', copy:'Copy', copied:'Copied!', sub_hint:'Share this link or QR. The app picks the fastest clean IP automatically.', open_in:'Open in app', app_copied:'Link copied. Open your app and import.', app_rec:'recommended', app_get:'Get app', app_import:'Import',
    sub_s2:'One link per app format. Copy or scan a QR.', sub_formats:'Formats', sub_ports:'Per-port single nodes', sub_naming:'Naming & updates',
    notice_lbl:'Free-service notice (always on)', proto_all:'All (VLESS + Trojan + SS)', mt_lbl:'Multi-transport (WS + gRPC + XHTTP)', mt_h:'emit each config over all three transports for more DPI diversity (needs a custom domain bound to the Worker, which you have)', multi_lbl:'Multi-protocol nodes (VLESS + Trojan + SS)', multi_h:'emit all three protocols for each nova node so clients can fail over between them (ws transport only)', ports_lbl:'Port spread (443 / 2053 / 2083 / 2087 / 2096 / 8443)', ports_h:'fan each config across all Cloudflare TLS ports — if one port is throttled the client tries another', notice_h:"a labelled node is baked into every config so people always know it's the free Nova service — it can't be turned off and the message is fixed", notice_txt:'Notice text (fixed)',
    subcfg:'Routing rule set (Clash/sing-box)', px_custom:'Custom',
    sub_name:'Subscription name', sub_int:'Update interval (hours)', sub_api:'Subscription converter API', save:'Save', save_all:'Save all settings on this page', saved:'Saved!', saveerr:'Save failed', qr:'QR',
    ip_s:'How the subscription chooses Cloudflare IPs.', ip_mode:'Mode', m_smart:'Smart (per-ISP)', m_custom:'Custom list', m_random:'Random',
    poolapi:'Smart IP API (per-ISP database)', poolapi_h:'Serves each user IPs tuned to their ISP (MCI/Irancell/…). Leave blank to disable.',
    custom_ips:'Custom clean IPs (ip:port#name)', rand_count:'Random count', rand_port:'Port (-1 = mixed)',
    scan_h:'Online optimization (browser scan)', scan_help:'Tests Cloudflare IPs from your browser and keeps the fastest. Works when the worker is not blocked on your network. This is an approximate latency test, not a port scan.',
    scan_src:'Source', scan_src_random:'Random Cloudflare', scan_loading:'Loading source IPs…', scan_port:'Port', scan_keep:'Keep best', scan_total:'IPs to test', scan_start:'Start scan', scan_use:'Use these in the custom list', scan_lat:'Latency', scan_jit:'Jitter', scan_loss:'Loss', st_h:'🚀 Speed test', st_s:'Find the fastest clean IPs for your current network (MCI / Irancell / …) and apply them automatically.', st_btn:'Speed test & apply best',
    sec_h:'🔒 Security', sec_s:'Change your panel password and turn on two-factor authentication.', sec_cur:'Current password', sec_new:'New password', sec_new2:'Repeat new password', sec_chpw:'Change password', sec_current:'Current password (for sharing)', sec_reveal:'Show', sec_hide:'Hide', sec_curcopy:'Copy', sec_rec_both:'Recovery password active — the ADMIN secret in Cloudflare still works alongside your panel password. To retire it, change/remove the ADMIN secret in Cloudflare.', sec_rec_only:'Your password is the ADMIN secret (recovery). You can set a separate panel password below; the ADMIN secret will keep working as a backup.', sec_pw_h:'Your existing client configs keep working — your proxy ID stays the same.', sec_2fa:'Two-factor authentication', sec_2fa_h:'Use Google Authenticator, Authy, Keeper, etc. A 6-digit code is asked at login.', sec_2fa_on:'Enable 2FA', sec_2fa_off:'Disable 2FA', sec_2fa_scan:'Scan the QR in your authenticator app, or type this key manually:', sec_2fa_code:'Enter the 6-digit code to confirm', sec_2fa_confirm:'Confirm & turn on', sec_2fa_dcode:'Authenticator code to turn it off', sec_on:'On', sec_off:'Off', sec_pw_ok:'Password changed ✓', sec_pw_bad:'Wrong current password', sec_short:'At least 6 characters', sec_mismatch:'Passwords do not match', sec_2fa_okmsg:'2FA enabled ✓', sec_2fa_badcode:'Wrong code', sec_2fa_offmsg:'2FA turned off', sec_err:'Something went wrong', sec_envmanaged:'Your password is set by the ADMIN secret in Cloudflare. Change it there (Workers → Settings → Variables), or remove the ADMIN secret to manage the password here.',
    scan_scanning:'Testing {n}/{t}, found {f}…', scan_done:'Done. Kept the {f} fastest.', scan_none:'No reachable IPs found. Try again or check your connection.', scan_added:'Added to the custom list. Press Save.',
    isp_s:'Live clean-IP counts from the crowd database, by Iranian ISP.', isp_live:'Live pools', isp_hint:'Counts grow as Nova Radar scans on each network.', refresh:'Refresh', isp_noapi:'Set the Smart IP API on the Clean IPs page first.',
    set_s:'Protocol, transport, and security.', set_proto:'Protocol & transport', protocol:'Protocol', transport:'Transport', path_lbl:'Transport path', path_h:'The WebSocket/gRPC path. Keep "/" unless you know you need a custom one.', grpcmode_lbl:'gRPC mode', grpcmode_h:'Only used when Transport is gRPC.', fp:'TLS fingerprint', frag:'TLS fragment (DPI evasion)', frag_hint:'If fragment stops working on your ISP (MCI / Irancell / …), pick Custom and switch the packets between tlshello, 1-1 and 1-3 — different values work on different Iranian ISPs.', proxyip:'PROXYIP (reverse proxy, optional)', chain_lbl:'Chain proxy / fix IP (optional)', chain_h:"Routes every node's exit through your own upstream proxy (socks5/http/https) — reach sites that block Cloudflare IPs, or get a stable exit IP. Empty = normal Cloudflare exit.", chain_test:'Test', uuid_lbl:'UUID (used in your configs)',
    adv_h:'Advanced (Fragment / ECH)', adv_s:'Optional tuning. Leave blank for defaults. Press Save, then re-import the link.', adv_hint:'ECH needs the ECH toggle on (Security above). Central API enables heartbeat + broadcast announcements when you run a Nova control server.',
    frag_custom:'Custom', frag_len:'Fragment length', frag_int:'Fragment interval', frag_pkt:'Fragment packets', ech_sni:'ECH SNI', ech_dns:'ECH DoH',
    frag_presets_lbl:'🇮🇷 Iran fragment presets (tap to fill Custom, then Save):', add_clean_ips:'+ Add sample clean Cloudflare IPs', clean_ips_hint:'starter list — the per-ISP Smart pool finds better ones per network',
    wn_mode:'Noise mode', wn_count:'Noise count', wn_size:'Noise size', wn_delay:'Noise delay', central_api:'Central API (management server, optional)', mirror_h:'GitHub mirror (blocked-domain failover)', mirror_intro:'Publishes your sub to a GitHub repo so users keep a permanent raw.githubusercontent.com link that still works if your domain gets filtered. Use a fine-grained token with Contents: read/write on that repo.', mirror_en:'Enable mirror', mirror_en_h:'also auto-publishes hourly', mirror_repo:'Repo (owner/name)', mirror_branch:'Branch', mirror_path:'Path (optional)', mirror_token:'GitHub token', mirror_publish:'Publish now', hosts_check:'Check health', health_ping:'Ping from my device',
    help_mirror:'Your domain can get filtered, but GitHub usually is not. The mirror publishes your subscription files to a GitHub repo you own, giving users a permanent raw.githubusercontent.com link that keeps working even if your domain is blocked. Set the repo (owner/name) and a fine-grained token with Contents: read/write, turn it on, and it republishes every hour (or press "Publish now").',
    help_health:'Shows whether each of your front domains still answers. "Check now (from Cloudflare)" tests reachability from Cloudflare\'s network — good for catching DNS/Worker breakage, but it cannot see Iran-side filtering. "Ping from my device" runs a quick test from YOUR current connection, so you can tell if a domain is actually reachable where you are.',
    help_usage:'How much traffic Nova has carried (today / month / year / all-time), plus a daily graph. Numbers are approximate and never cost you anything — just for your own tracking.',
    help_yoursub:'Your personal subscription link and its QR. Paste the link into a proxy app (or scan the QR) and it imports all your servers at once; the app buttons import it into a specific app in one tap.',
    help_formats:'The same servers in different file formats — pick the one your app understands: Clash/Mihomo (YAML), sing-box (JSON), or Base64 (v2rayNG/NekoBox). Each card has copy + QR.',
    help_ports:'One single-server link per Cloudflare port (443, 2053, …). Handy if a specific port works better on your network — import just that one.',
    help_speedtest:'One tap finds the fastest clean Cloudflare IPs for YOUR current network (it detects your ISP, e.g. MCI/Irancell) and applies them automatically.',
    help_mode:'How Nova picks the Cloudflare IPs your config uses: Smart (best per-ISP, recommended), Custom (your own list), or Random.',
    help_scan:'An in-browser scanner that tests many Cloudflare IPs from your device and keeps the fastest. Use it if Smart mode is not giving good speeds.',
    help_proto:'The proxy protocol (VLESS/Trojan/Shadowsocks) and transport (WebSocket/gRPC/XHTTP) used in your configs. Defaults are best for most people; gRPC/XHTTP need a custom domain.',
    help_hosts:'The domains your configs are built on. Add several so the app can switch if one is blocked. First connect each domain to your Worker in Cloudflare, then add it here.',
    help_setsec:'TLS options (fingerprint, fragment) that help your traffic blend in and slip past DPI filtering. The Random/Custom fragment is the most useful knob when an ISP starts blocking.',
    help_adv:'Power-user options: TLS fragment, ECH, and the optional Central API. Most people can leave these alone.',
    help_naming:'The name your app shows for this subscription, how often the app refreshes it, and the routing rule-set used to build Clash/sing-box configs.',
    help_backup:'Save all your settings (including users) to a file, or restore them later or on another worker. The file contains secret tokens — keep it private.',
    help_iran:'One button that turns on the strongest anti-filtering combo for Iran at once (all protocols, port spread, fragment, ECH, public nodes; blocks QUIC; disables IPv6). Start here if unsure.',
    help_security2:'Change your panel password and turn on two-factor authentication (2FA) so only you can sign in. Works with Google Authenticator, Authy, Keeper, etc.',
    help_warp:'Cloudflare WARP (WireGuard) configs you can download, plus an option to add a WARP node to every config. WARP often reaches services that block normal proxy IPs.',
    help_routing:'Decides what goes through the proxy and what stays direct (e.g. Iranian sites direct = faster, no quota use). Baked into every Clash/sing-box config.',
    help_rules:'Your own routing rules — force specific domains/apps to go direct or through the proxy. Optional, for advanced setups.',
    help_preset:'Ready-made rule packs: bypass a country, block QUIC, and best-effort block ads/malware/trackers. Toggle what you want.',
    help_dns:'Secure DNS (DoH) and anti-sanction DNS used inside your configs, so name lookups stay private and can reach sanctioned/blocked sites.',
    help_netadv:'Extra network knobs (e.g. WARP noise, AmneziaWG) for clients that support them. Leave default unless you know you need them.',
    help_workerreq:'Cloudflare\'s free plan allows 100,000 worker requests/day (it resets every 24h). Add your Cloudflare Account ID + a read-only token to see today\'s usage here.',
    help_tg:'Get Telegram messages for events (new sub, login, quota/expiry alerts). Add your bot token and one or more chat IDs (the bot must be admin of any channel).',
    help_users:'Give each person their own link with a data quota and expiry. Turn on multi-user, add people, Save. Disabling or expiring someone cuts off their connections.',
    set_sec:'Security', tls_lbl:'TLS', tls_h:'encrypt the tunnel (off = plain WS on HTTP ports)', ech_h:'Encrypted Client Hello', zerortt:'0-RTT', randpath:'Random path', skipcert:'Skip cert verify', skipcert_h:'allow insecure TLS', connected:'connected', notconn:'not connected' },
  fa: { dir:'rtl',
    nav_section:'مدیریت', nav_home:'داشبورد', nav_sub:'اشتراک‌ها', nav_ip:'آی‌پی‌های تمیز', nav_isp:'مخزن هر اپراتور', nav_net:'شبکه و DNS', nav_conn:'شبکه و آی‌پی‌ها', tour_next:'بعدی', tour_prev:'قبلی', tour_done:'پایان', nav_set:'تنظیمات', nav_guide:'راهنما', guide_s:'راهنمای گام‌به‌گام استفاده از Nova Proxy.', logout:'خروج', close:'بستن',
    net_s:'قوانین مسیریابی، مسدودسازی تبلیغات و DNS امن. این‌ها در هر کانفیگ Clash و sing-box که می‌دهید اعمال می‌شوند.',
    net_routing:'مسیریابی هوشمند', net_routing_h:'تعیین کنید چه چیزی از پروکسی عبور کند و چه چیزی مستقیم بماند.',
    net_enroute:'فعال‌سازی قوانین مسیریابی', net_enroute_h:'روشن کردن موتور قوانین',
    net_domestic:'سایت‌های ایرانی مستقیم', net_domestic_h:'سایت‌های ایرانی بدون پروکسی (سریع‌تر، بدون مصرف حجم)',
    net_geoip:'مسیریابی GeoIP', net_geoip_h:'مسیریابی بر اساس کشورِ آی‌پی', net_geosite:'مسیریابی GeoSite', net_geosite_h:'مسیریابی بر اساس لیست دامنه',
    net_adblock:'مسدودسازی تبلیغات و ردیاب‌ها', net_adblock_h:'دامنه‌های تبلیغاتی/ردیاب شناخته‌شده را حذف می‌کند', net_porn:'فیلتر محتوای بزرگسال', net_porn_h:'مسدودسازی دامنه‌های بزرگسال',
    net_dns:'DNS امن', net_dns_h:'DNS رمزگذاری‌شده پنهان می‌کند چه سایت‌هایی را جست‌وجو می‌کنید و به دسترسی به سرویس‌های تحریم‌شده کمک می‌کند.',
    net_doh:'DNS روی HTTPS (DoH)', net_doh_h:'رمزگذاری جست‌وجوهای DNS', net_dohprov:'ارائه‌دهنده‌ی DoH',
    net_antisanc:'DNS ضدتحریم', net_antisanc_h:'دسترسی به گوگل، گیت‌هاب، npm و دیگر سرویس‌های مسدودشده', net_antiprov:'ارائه‌دهنده‌ی ضدتحریم', net_anticustom:'DNS دلخواه (در حالت «دلخواه»)',
    net_localdns:'DNS محلی', net_localdns_h:'برخی نام‌ها روی دستگاه حل شوند', net_localip:'آی‌پی DNS محلی', net_localport:'پورت DNS محلی',
    net_fakedns:'Fake DNS', net_fakedns_h:'اتصال سریع‌تر، تأخیر کمتر', net_fakeip:'محدوده‌ی Fake DNS',
    net_dohurl:'نقطه‌ی DoH خصوصی شما (در هر مرورگر/برنامه)',
    net_adv:'پیشرفته', net_ipv6:'IPv6', net_ipv6_h:'اجازه‌ی اتصال‌های IPv6', net_lan:'اجازه‌ی LAN', net_lan_h:'اجازه به دستگاه‌های دیگر شبکه برای استفاده', net_log:'سطح لاگ',
    preset_h:'قوانین آماده', preset_s:'دور زدن سریع بر اساس کشور و مسدودسازی دسته‌ای، روی کانفیگ‌های Clash اعمال می‌شود (علاوه بر گزینه‌های بالا).',
    bp_cn:'عبور مستقیم چین', bp_cn_h:'سایت‌ها/آی‌پی‌های چین مستقیم', bp_ru:'عبور مستقیم روسیه', bp_ru_h:'سایت‌ها/آی‌پی‌های روسیه مستقیم',
    bk_quic:'مسدودسازی QUIC', bk_quic_h:'اجبار به TCP (رفع برخی قطعی‌ها/نشتی‌ها)', bk_malware:'مسدودسازی بدافزار', bk_phishing:'مسدودسازی فیشینگ', bk_crypto:'مسدودسازی ماینر', bk_geo_h:'نیازمند geodata در برنامه',
    rules_h:'قوانین مسیریابی دلخواه', rules_add:'افزودن قانون', rules_help:'هر خط یک قانون، روی مجموعه قوانین اعمال می‌شود. قالب: TYPE,value,OUTBOUND (مثلاً DOMAIN-SUFFIX,arvancloud.ir,DIRECT یا DOMAIN-KEYWORD,ads,REJECT). خروجی: DIRECT یا REJECT یا PROXY. نیازمند فعال‌بودن مسیریابی.',
    warp_h:'WARP (وایرگارد کلودفلر)', warp_hint:'عبور از شبکه‌ی WARP کلودفلر. نامحدود (از محدودیت درخواست Worker عبور می‌کند) و اغلب به سرویس‌های مسدود می‌رسد. یک بار ثبت کنید، بعد روشن کنید.',
    warp_en:'فعال‌سازی WARP', warp_en_h:'افزودن خروجی وایرگارد به همه‌ی کانفیگ‌ها', warp_mode:'حالت', warp_mode_warp:'فقط WARP (همه‌ی ترافیک از WARP)', warp_mode_chain:'زنجیره (پروکسی، سپس WARP)',
    warp_acc:'حساب WARP', warp_register:'ثبت', warp_registering:'در حال ثبت…', warp_reg_ok:'حساب WARP ثبت شد', warp_reg_fail:'ثبت ناموفق بود',
    warp_status_none:'هنوز ثبت نشده. روی ثبت بزنید.', warp_status_yes:'ثبت‌شده',
    warp_mode_wow:'WoW (دو پرش WARP)', warp_amnezia:'مبهم‌سازی AmneziaWG', warp_dl_lbl:'دانلود کانفیگ‌های WARP (۵۰ اندپوینت، آماده‌ی ایمپورت)', warp_dl_wg:'WireGuard', warp_dl_neko:'NekoRay', warp_amnezia_h:'بسته‌های اضافی تا DPI نتواند WARP را شناسایی کند (Clash)',
    warp_ep:'نقطه‌ی WARP (اختیاری)', warp_lic:'لایسنس WARP+ (اختیاری)', warp_lic_h:'WARP رایگان بدون کلید کار می‌کند — کافی است Register را بزنید. برای سرعت بیشتر، یک کلید رایگان WARP+ (که در کانال‌ها به اشتراک گذاشته می‌شود) را این‌جا وارد و Apply کنید.', warp_apply:'اعمال', warp_central:'از استخر مرکزی', warp_applying:'در حال اعمال…',
    warp_lic_ok:'WARP+ اعمال شد', warp_lic_fail:'لایسنس ناموفق بود', warp_plus:'WARP+', warp_wow_yes:'WoW آماده (۲ پرش)',
    nav_notif:'اعلان‌ها', nav_users:'کاربران', nav_logs:'لاگ‌ها', nav_manage:'مدیریت', users_s:'به هر نفر یک لینک اختصاصی با سهمیه حجم و تاریخ انقضا بدهید. غیرفعال یا منقضی‌کردن کاربر، اتصال‌هایش را قطع می‌کند.', users_h2:'چندکاربره', users_en:'فعال‌سازی چندکاربره', users_en_h:'خاموش = کانفیگ مشترک تکی (پیش‌فرض)', users_note:'آزمایشی — روی گوشی تست کنید. سهمیه تقریبی است و روی ترنسپورت WebSocket کار می‌کند. برای قطع دسترسی، کاربر را غیرفعال یا منقضی کنید.', users_add:'+ افزودن کاربر', users_empty:'هنوز کاربری نیست — یکی اضافه کنید.', users_name:'نام', users_copy:'کپی لینک', users_saved:'ذخیره شد ✓', sess_expired:'نشست منقضی شد — خارج شوید و دوباره وارد شوید، بعد دوباره امتحان کنید.', users_mu_hint:'لینک‌های هر کاربر فقط وقتی «چندکاربره» روشن باشد کار می‌کنند — اگر هنگام ذخیره کاربری وجود داشته باشد، خودکار روشن می‌شود. هر کاربر لینک اشتراک خودش را دارد (کپی لینک)؛ سهمیه برحسب گیگابایت است (۰ = نامحدود) و تاریخ، زمان انقضای لینک است.', users_col_name:'نام', users_col_quota:'سهمیه (GB)', users_col_expiry:'تاریخ انقضا', users_col_on:'روشن',
    manage_s:'نمای کلی ناوگان و ارسال همگانی. نیازمند سرور مرکزی شماست — API مرکزی را در تنظیمات ← پیشرفته بگذارید.',
    manage_fleet:'ناوگان', manage_broadcast:'اعلان همگانی', manage_broadcast_s:'به‌صورت بنر روی همه‌ی پنل‌های متصل نمایش داده می‌شود.',
    manage_title:'عنوان', manage_text:'متن', manage_url:'لینک (اختیاری)', manage_send:'ارسال همگانی',
    manage_active:'نمونه‌های فعال', manage_total:'کل نمونه‌ها', manage_traffic:'مجموع ترافیک',
    manage_noapi:'برای دیدن ناوگان، API مرکزی را (تنظیمات ← پیشرفته) تنظیم و سرور کنترل نوا را اجرا کنید.', manage_err:'دسترسی به سرور مرکزی ممکن نشد.',
    notif_s:'مصرف ورکر و اعلان‌های تلگرام.', notif_usage:'درخواست‌های ورکر', notif_usage_h:'پلن رایگان کلودفلر روزانه ۱۰۰٬۰۰۰ درخواست ورکر می‌دهد. برای نمایش، اطلاعات زیر را وارد کنید.', notif_used:'مصرف امروز',
    notif_cf_id:'Account ID', notif_cf_tok:'API Token (دسترسی Account Analytics)', notif_tg:'اعلان‌های تلگرام', notif_tg_h:'با هر دریافت اشتراک، تغییر تنظیمات و ورود، پیام بگیرید.', notif_tg_en:'فعال‌سازی اعلان تلگرام', notif_tg_bot:'توکن ربات', notif_tg_chat:'شناسه‌های چت', notif_tg_chat_h:'یک یا چند مورد — با کاما یا خط جدید جدا کنید. شناسه‌ی عددیِ کاربر و/یا کانال (ربات باید ادمین کانال باشد).',
    logs_s:'فعالیت‌ها و خطاهای اخیر پروکسی شما.', logs_recent:'فعالیت اخیر', logs_empty:'هنوز فعالیتی نیست.', log_time:'زمان', log_type:'رویداد', log_ip:'IP', log_loc:'موقعیت', log_asn:'شبکه',
    hosts_h:'دامنه‌ها (HOST)', hosts_help:'هر خط یک دامنه. کانفیگ‌ها روی این دامنه‌ها ساخته می‌شوند تا اگر یکی مسدود شد برنامه دامنه را عوض کند. اولی دامنه‌ی اصلی است.',
    home_h:'داشبورد', home_s:'وضعیت پروکسی شما.', health_h:'سلامت دامنه‌ها', health_s:'وضعیت زندهٔ دامنه‌های جلویی. کران ساعتی هم تغییرات را خودکار به تلگرام اعلام می‌کند.', health_check:'بررسی فوری', iran_h:'🇮🇷 حالت ایران (یک‌ضربه)', iran_s:'بهترین ترکیب مقاومت برای ایران را یک‌جا روشن می‌کند: همهٔ پروتکل‌ها + پخش پورت + فرگمنت + ECH (و مسدودکردن QUIC، خاموش‌کردن IPv6).', iran_btn:'فعال‌سازی حالت ایران', iran_btn_off:'غیرفعال‌سازی حالت ایران', backup_h:'پشتیبان‌گیری و بازیابی', backup_s:'همهٔ تنظیمات (کانفیگ + شبکه + کاربران) را در یک فایل ذخیره یا از آن بازیابی کنید. این فایل شامل کلیدهای محرمانه است — جای امن نگه‌دارید.', backup_export:'خروجی', backup_import:'ورودی', qs_h:'شروع سریع', qs1:'پنل را در /login باز کن و با رمز ادمین وارد شو — یا آیکن اپ نوا روی صفحهٔ اصلی را باز کن.', qs2:'در داشبورد یک‌بار «حالت ایران» را بزن، بعد لینک اشتراک را کپی کن (یا QR را اسکن کن).', qs3:'دکمهٔ اپ خودت (هیدیفای/کارینگ/v2rayNG/sing-box) را بزن تا یک‌ضربه ایمپورت شود، وصل شو، تمام.', qs4:'اگر شبکه‌ای بستت، پروتکل/پورت دیگری از لیست اپ را امتحان کن یا فرگمنت را در تنظیمات عوض کن.', status:'وضعیت', st_host:'دامنه', st_net:'شبکه', st_kv:'حافظه', st_app:'برنامه', st_worker:'مصرف ورکر', st_traffic:'مصرف امروز', u_chart_h:'مصرف روزانه (۱۴ روز اخیر)',
    usage_h:'حجم مصرفی', usage_s:'مجموع ترافیکی که نوا روی این ورکر سرو کرده (تقریبی — سازگار با پلن رایگان).', u_today:'امروز', u_month:'این ماه', u_year:'امسال', u_all:'کل',
    fp_random:'random — پیشنهاد فعلی برای ایران', fp_hint:'الان «random» در ایران بهتر کار می‌کند؛ اگر قطع شد یکی دیگر را امتحان یا اسکن کنید.',
    hosts_connect:'⚠️ ابتدا هر دامنه را به Worker وصل کنید (Cloudflare ← Worker شما ← Settings ← Domains & Routes ← Add Custom Domain). فقط بعد از اتصال آن را اینجا اضافه کنید، وگرنه کانفیگ‌ها وصل نمی‌شوند.',
    help_lbl:'این چیست؟',
    help_home:'وضعیت پروکسی شما و لینک اشتراک همراه با کد QR. لینک را کپی کنید یا QR را اسکن کنید تا هر برنامه‌ای را راه بیندازید. بقیه‌ی موارد منو، تنظیمات اختیاری است.',
    help_sub:'همان اشتراک، آماده در هر قالب برنامه (خودکار، Base64، Clash، sing-box، Surge، Quantumult X، Loon). قالبی که برنامه‌تان استفاده می‌کند را کپی یا QR آن را اسکن کنید. همه به یک پروکسی اشاره می‌کنند.',
    help_ip:'نحوه‌ی انتخاب آی‌پی‌های کلودفلر برای کانفیگ‌ها. حالت هوشمند (هر اپراتور) به هر کاربر بهترین آی‌پی‌ها را برای اپراتورش می‌دهد؛ لیست دلخواه اجازه می‌دهد آی‌پی خودتان را وارد کنید؛ تصادفی از آی‌پی‌های تصادفی کلودفلر استفاده می‌کند. از مرورگر هم می‌توانید اسکن کنید.',
    help_isp:'تعداد زنده‌ی آی‌پی‌های تمیز کلودفلر که روی هر اپراتور ایرانی (همراه اول، ایرانسل، شاتل...) کار می‌کنند و توسط اسکنر Nova Radar جمع‌آوری شده‌اند. ورکر به‌طور خودکار به هر کاربر بهترین آی‌پی‌ها را برای شبکه‌ی خودش می‌دهد. برای پر شدن این صفحه، در صفحه‌ی آی‌پی‌های تمیز حالت هوشمند را روشن کنید.',
    help_net:'کنترل‌هایی که در هر کانفیگ Clash و sing-box اعمال می‌شوند: مسیریابی، مستقیم‌بودن سایت‌های ایرانی، مسدودسازی تبلیغات و محتوای بزرگسال، DNS امن و ضدتحریم، WARP و قوانین دلخواه شما. بعد از تغییر، ذخیره را بزنید و در برنامه دوباره وصل شوید.',
    help_set:'تنظیمات فنی: پروتکل (VLESS/Trojan/SS)، حمل‌ونقل، TLS، اثرانگشت، دامنه‌ها (HOST) و UUID. پیش‌فرض‌ها برای بیشتر افراد مناسب است؛ فقط اگر می‌دانید چه می‌خواهید تغییر دهید.',
    help_notif:'ببینید ورکر شما چند درخواست مصرف کرده (کلودفلر روزانه ۱۰۰٬۰۰۰ تای رایگان می‌دهد) و با هر دریافت اشتراک، تغییر تنظیمات و ورود، اعلان تلگرام بگیرید.',
    help_logs:'فعالیت‌های اخیر پروکسی شما: دریافت اشتراک، تغییر تنظیمات، ورود و هر خطا، همراه با زمان، IP و شبکه.',
    your_sub:'لینک اشتراک شما', copy:'کپی', copied:'کپی شد!', sub_hint:'این لینک یا QR را بفرستید. برنامه سریع‌ترین آی‌پی تمیز را خودکار انتخاب می‌کند.', open_in:'باز کردن در برنامه', app_copied:'لینک کپی شد. برنامه را باز کنید و وارد کنید.', app_rec:'پیشنهادی', app_get:'دریافت برنامه', app_import:'افزودن',
    sub_s2:'برای هر برنامه یک لینک. کپی کنید یا QR را اسکن کنید.', sub_formats:'قالب‌ها', sub_ports:'نودهای تکی هر پورت', sub_naming:'نام و به‌روزرسانی',
    notice_lbl:'اعلان سرویس رایگان (همیشه روشن)', proto_all:'همه (VLESS + Trojan + SS)', mt_lbl:'چندحمل‌ونقلی (WS + gRPC + XHTTP)', mt_h:'هر کانفیگ را روی هر سه حمل‌ونقل می‌سازد برای تنوع بیشتر در برابر DPI (نیازمند دامنه اختصاصی متصل به Worker که شما دارید)', multi_lbl:'نودهای چندپروتکلی (VLESS + Trojan + SS)', multi_h:'برای هر نودِ نوا هر سه پروتکل را می‌سازد تا کلاینت بینشان فِیل‌اوور کند (فقط ترنسپورت ws)', ports_lbl:'پخش روی پورت‌ها (۴۴۳ / ۲۰۵۳ / ۲۰۸۳ / ۲۰۸۷ / ۲۰۹۶ / ۸۴۴۳)', ports_h:'هر کانفیگ را روی همه‌ی پورت‌های TLS کلودفلر پخش می‌کند — اگر یک پورت محدود شد کلاینت پورت دیگر را امتحان می‌کند', notice_h:'یک نود برچسب‌دار در هر کانفیگ قرار می‌گیرد تا همه بدانند سرویس رایگان نوا است — قابل خاموش‌کردن نیست و متن آن ثابت است', notice_txt:'متن اعلان (ثابت)',
    subcfg:'مجموعه قوانین مسیریابی (Clash/sing-box)', px_custom:'سفارشی',
    sub_name:'نام اشتراک', sub_int:'فاصله به‌روزرسانی (ساعت)', sub_api:'API تبدیل اشتراک', save:'ذخیره', save_all:'ذخیرهٔ همهٔ تنظیمات این صفحه', saved:'ذخیره شد!', saveerr:'ذخیره ناموفق بود', qr:'کد QR',
    ip_s:'نحوه‌ی انتخاب آی‌پی‌های کلودفلر برای اشتراک.', ip_mode:'حالت', m_smart:'هوشمند (هر اپراتور)', m_custom:'لیست دلخواه', m_random:'تصادفی',
    poolapi:'API آی‌پی هوشمند (پایگاه‌داده هر اپراتور)', poolapi_h:'به هر کاربر بر اساس اپراتورش (همراه اول/ایرانسل/…) بهترین آی‌پی‌ها را می‌دهد. خالی = غیرفعال.',
    custom_ips:'آی‌پی‌های تمیز دلخواه (ip:port#name)', rand_count:'تعداد تصادفی', rand_port:'پورت (۱- = ترکیبی)',
    scan_h:'بهینه‌سازی آنلاین (اسکن از مرورگر)', scan_help:'آی‌پی‌های کلودفلر را از مرورگر شما تست می‌کند و سریع‌ترین‌ها را نگه می‌دارد. زمانی کار می‌کند که ورکر روی شبکه‌ی شما فیلتر نباشد. این یک تست تقریبی تأخیر است، نه اسکن پورت.',
    scan_src:'منبع', scan_src_random:'کلودفلر تصادفی', scan_loading:'در حال دریافت آی‌پی منبع…', scan_port:'پورت', scan_keep:'نگه‌داشتن بهترین', scan_total:'تعداد آی‌پی برای تست', scan_start:'شروع اسکن', scan_use:'استفاده در لیست دلخواه', scan_lat:'تأخیر', scan_jit:'نوسان', scan_loss:'افت', st_h:'🚀 تست سرعت', st_s:'سریع‌ترین آی‌پی‌های تمیز برای شبکهٔ فعلی‌ات (همراه‌اول/ایرانسل/…) را پیدا و خودکار اعمال می‌کند.', st_btn:'تست سرعت و اعمال بهترین',
    sec_h:'🔒 امنیت', sec_s:'رمز پنل را عوض کن و احراز هویت دو مرحله‌ای را روشن کن.', sec_cur:'رمز فعلی', sec_new:'رمز جدید', sec_new2:'تکرار رمز جدید', sec_chpw:'تغییر رمز', sec_current:'رمز فعلی (برای اشتراک‌گذاری)', sec_reveal:'نمایش', sec_hide:'پنهان', sec_curcopy:'کپی', sec_rec_both:'رمز بازیابی فعال است — سکرت ADMIN در کلودفلر هم‌چنان در کنار رمز پنل کار می‌کند. برای حذف آن، سکرت ADMIN را در کلودفلر تغییر/حذف کنید.', sec_rec_only:'رمز شما همان سکرت ADMIN (بازیابی) است. می‌توانید پایین یک رمز جداگانه برای پنل بگذارید؛ سکرت ADMIN به‌عنوان پشتیبان کار می‌کند.', sec_pw_h:'کانفیگ‌های فعلی کاربران کار می‌کنند — شناسه‌ی پروکسی تغییر نمی‌کند.', sec_2fa:'احراز هویت دو مرحله‌ای', sec_2fa_h:'با Google Authenticator، Authy، Keeper و … کار می‌کند. هنگام ورود یک کد ۶ رقمی خواسته می‌شود.', sec_2fa_on:'فعال‌سازی ۲FA', sec_2fa_off:'غیرفعال‌سازی ۲FA', sec_2fa_scan:'QR را در برنامه‌ی احراز هویت اسکن کن، یا این کلید را دستی وارد کن:', sec_2fa_code:'برای تأیید، کد ۶ رقمی را وارد کن', sec_2fa_confirm:'تأیید و روشن‌کردن', sec_2fa_dcode:'کد برنامه برای خاموش‌کردن', sec_on:'روشن', sec_off:'خاموش', sec_pw_ok:'رمز تغییر کرد ✓', sec_pw_bad:'رمز فعلی اشتباه است', sec_short:'حداقل ۶ کاراکتر', sec_mismatch:'رمزها یکسان نیستند', sec_2fa_okmsg:'۲FA فعال شد ✓', sec_2fa_badcode:'کد اشتباه است', sec_2fa_offmsg:'۲FA خاموش شد', sec_err:'خطایی رخ داد', sec_envmanaged:'رمز شما با سکرت ADMIN در کلودفلر تنظیم شده. آن را همان‌جا عوض کنید (Workers → Settings → Variables)، یا سکرت ADMIN را بردارید تا رمز را این‌جا مدیریت کنید.',
    scan_scanning:'در حال تست {n}/{t}، یافته‌شده {f}…', scan_done:'انجام شد. {f} آی‌پی سریع نگه داشته شد.', scan_none:'آی‌پی قابل دسترسی پیدا نشد. دوباره تلاش کنید یا اتصال را بررسی کنید.', scan_added:'به لیست دلخواه اضافه شد. ذخیره را بزنید.',
    isp_s:'تعداد زنده‌ی آی‌پی‌های تمیز از پایگاه‌داده، به تفکیک اپراتور ایرانی.', isp_live:'مخزن‌های زنده', isp_hint:'تعدادها با اسکن Nova Radar روی هر شبکه بیشتر می‌شود.', refresh:'به‌روزرسانی', isp_noapi:'ابتدا API آی‌پی هوشمند را در صفحه‌ی آی‌پی‌های تمیز تنظیم کنید.',
    set_s:'پروتکل، حمل‌ونقل و امنیت.', set_proto:'پروتکل و حمل‌ونقل', protocol:'پروتکل', transport:'حمل‌ونقل', path_lbl:'مسیر حمل‌ونقل', path_h:'مسیر WebSocket/gRPC. اگر مطمئن نیستید روی «/» بگذارید.', grpcmode_lbl:'حالت gRPC', grpcmode_h:'فقط وقتی حمل‌ونقل gRPC باشد استفاده می‌شود.', fp:'اثرانگشت TLS', frag:'تکه‌تکه‌سازی TLS (دور زدن DPI)', frag_hint:'اگر روی اپراتور تو (همراه‌اول / ایرانسل / …) فرگمنت کار نکرد، گزینهٔ Custom را بزن و مقدار packets را بین tlshello و 1-1 و 1-3 عوض کن — روی هر اپراتور ایران مقدار متفاوتی جواب می‌دهد.', proxyip:'PROXYIP (پروکسی معکوس، اختیاری)', chain_lbl:'پراکسی زنجیره‌ای / تثبیت IP (اختیاری)', chain_h:'خروجی همهٔ نودها را از پراکسی بالادست خودت (socks5/http/https) عبور می‌دهد — برای دسترسی به سایت‌هایی که IP کلودفلر را بلاک می‌کنند یا داشتن IP خروجی ثابت. خالی = خروجی عادی کلودفلر.', chain_test:'تست', uuid_lbl:'UUID (در کانفیگ‌های شما)',
    adv_h:'پیشرفته (Fragment / ECH)', adv_s:'تنظیم اختیاری. برای پیش‌فرض خالی بگذارید. ذخیره را بزنید و لینک را دوباره وارد کنید.', adv_hint:'ECH نیازمند روشن‌بودن کلید ECH است (بخش امنیت بالا). API مرکزی هنگام اجرای سرور کنترل نوا، هارت‌بیت و اعلان‌های همگانی را فعال می‌کند.',
    frag_custom:'سفارشی', frag_len:'طول Fragment', frag_int:'فاصله Fragment', frag_pkt:'بسته‌های Fragment', ech_sni:'ECH SNI', ech_dns:'ECH DoH',
    frag_presets_lbl:'🇮🇷 پریست‌های فرگمنت ایران (بزن تا فیلدهای Custom پر شود، سپس ذخیره):', add_clean_ips:'+ افزودن چند آی‌پی تمیز نمونهٔ کلودفلر', clean_ips_hint:'لیست شروع — استخر هوشمند per-ISP آی‌پی بهتری برای هر شبکه پیدا می‌کند',
    wn_mode:'حالت نویز', wn_count:'تعداد نویز', wn_size:'اندازه نویز', wn_delay:'تأخیر نویز', central_api:'API مرکزی (سرور مدیریت، اختیاری)', mirror_h:'آینه گیت‌هاب (پشتیبان دامنه مسدودشده)', mirror_intro:'ساب شما را در یک ریپو گیت‌هاب منتشر می‌کند تا کاربران یک لینک دائمی raw.githubusercontent.com داشته باشند که حتی اگر دامنه‌تان فیلتر شد کار کند. یک توکن fine-grained با دسترسی Contents: read/write روی آن ریپو بسازید.', mirror_en:'فعال‌سازی آینه', mirror_en_h:'هر ساعت هم خودکار منتشر می‌شود', mirror_repo:'ریپو (owner/name)', mirror_branch:'شاخه', mirror_path:'مسیر (اختیاری)', mirror_token:'توکن گیت‌هاب', mirror_publish:'انتشار فوری', hosts_check:'بررسی سلامت', health_ping:'پینگ از دستگاه من',
    help_mirror:'دامنه‌ی شما ممکن است فیلتر شود ولی گیت‌هاب معمولاً نه. آینه، فایل‌های اشتراک شما را در یک ریپو گیت‌هابِ خودتان منتشر می‌کند و به کاربران یک لینک دائمی raw.githubusercontent.com می‌دهد که حتی با فیلترِ دامنه هم کار می‌کند. ریپو (owner/name) و یک توکن fine-grained با دسترسی Contents: read/write را بگذارید، روشن کنید؛ هر ساعت دوباره منتشر می‌شود (یا «انتشار فوری» را بزنید).',
    help_health:'نشان می‌دهد هر دامنه‌ی جلویی شما هنوز پاسخ می‌دهد یا نه. «بررسی از کلودفلر» دسترسی را از شبکه‌ی کلودفلر تست می‌کند — برای تشخیص خرابی DNS/ورکر خوب است ولی فیلترینگ سمت ایران را نمی‌بیند. «پینگ از دستگاه من» یک تست سریع از اتصال فعلی شما اجرا می‌کند تا بفهمید دامنه واقعاً از جایی که هستید در دسترس است یا نه.',
    help_usage:'مقدار ترافیکی که نوا جابه‌جا کرده (امروز/ماه/سال/کل) به‌علاوه نمودار روزانه. اعداد تقریبی‌اند و هیچ هزینه‌ای ندارند — فقط برای پیگیری خودتان.',
    help_yoursub:'لینک اشتراک شخصی شما و QR آن. لینک را در یک اپ پروکسی بچسبانید (یا QR را اسکن کنید) تا همه‌ی سرورها یک‌جا وارد شوند؛ دکمه‌های اپ آن را با یک ضربه وارد همان اپ می‌کنند.',
    help_formats:'همان سرورها در قالب‌های مختلف — قالبی را که اپ شما می‌فهمد انتخاب کنید: Clash/Mihomo (YAML)، sing-box (JSON) یا Base64 (v2rayNG/NekoBox). هر کارت کپی + QR دارد.',
    help_ports:'برای هر پورت کلودفلر (۴۴۳، ۲۰۵۳، …) یک لینک تک‌سروره. اگر پورت خاصی روی شبکه‌تان بهتر کار می‌کند، فقط همان را وارد کنید.',
    help_speedtest:'با یک ضربه سریع‌ترین آی‌پی‌های تمیز کلودفلر را برای شبکه‌ی فعلیِ شما پیدا می‌کند (اپراتورتان مثل همراه‌اول/ایرانسل را تشخیص می‌دهد) و خودکار اعمال می‌کند.',
    help_mode:'نحوه‌ی انتخاب آی‌پی‌های کلودفلر در کانفیگ: هوشمند (بهترین برای هر اپراتور، پیشنهادی)، دلخواه (لیست خودتان)، یا تصادفی.',
    help_scan:'اسکنر داخل مرورگر که آی‌پی‌های کلودفلر را از دستگاه شما تست می‌کند و سریع‌ترین‌ها را نگه می‌دارد. اگر حالت هوشمند سرعت خوبی نداد از این استفاده کنید.',
    help_proto:'پروتکل پروکسی (VLESS/Trojan/Shadowsocks) و ترنسپورت (WebSocket/gRPC/XHTTP) کانفیگ‌ها. پیش‌فرض‌ها برای اکثر کاربران بهترین‌اند؛ gRPC/XHTTP به دامنه‌ی اختصاصی نیاز دارند.',
    help_hosts:'دامنه‌هایی که کانفیگ‌ها روی آن‌ها ساخته می‌شوند. چند دامنه اضافه کنید تا اگر یکی مسدود شد اپ به دیگری سوییچ کند. اول هر دامنه را در کلودفلر به ورکر وصل کنید، بعد این‌جا اضافه کنید.',
    help_setsec:'تنظیمات TLS (اثرانگشت، فرگمنت) که کمک می‌کند ترافیک‌تان عادی به‌نظر برسد و از DPI رد شود. فرگمنت تصادفی/سفارشی مفیدترین گزینه وقتی اپراتور شروع به مسدودسازی می‌کند.',
    help_adv:'گزینه‌های حرفه‌ای: فرگمنت TLS، ECH و API مرکزی اختیاری. اکثر کاربران می‌توانند دست نزنند.',
    help_naming:'نامی که اپ برای این اشتراک نشان می‌دهد، فاصله‌ی به‌روزرسانی اپ، و مجموعه‌قوانین مسیریابی برای ساخت کانفیگ Clash/sing-box.',
    help_backup:'همه‌ی تنظیمات (شامل کاربران) را در یک فایل ذخیره کنید یا بعداً/روی ورکر دیگر بازیابی کنید. فایل شامل توکن‌های محرمانه است — خصوصی نگه دارید.',
    help_iran:'یک دکمه که قوی‌ترین ترکیب ضدفیلتر برای ایران را یک‌جا روشن می‌کند (همه‌ی پروتکل‌ها، پخش پورت، فرگمنت، ECH، نودهای عمومی؛ مسدودسازی QUIC؛ خاموش‌کردن IPv6). اگر مطمئن نیستید از این‌جا شروع کنید.',
    help_security2:'رمز پنل را عوض کنید و احراز هویت دو مرحله‌ای (2FA) را روشن کنید تا فقط خودتان وارد شوید. با Google Authenticator، Authy، Keeper و … کار می‌کند.',
    help_warp:'کانفیگ‌های WARP (وایرگاردِ کلودفلر) برای دانلود، به‌علاوه گزینه‌ی افزودن نود WARP به همه‌ی کانفیگ‌ها. WARP اغلب به سرویس‌هایی می‌رسد که آی‌پی پروکسی معمولی را مسدود می‌کنند.',
    help_routing:'تعیین می‌کند چه چیزی از پروکسی برود و چه چیزی مستقیم بماند (مثلاً سایت‌های ایرانی مستقیم = سریع‌تر و بدون مصرف سهمیه). در هر کانفیگ Clash/sing-box اعمال می‌شود.',
    help_rules:'قوانین مسیریابی خودتان — دامنه/اپ مشخصی را مجبور کنید مستقیم یا از پروکسی برود. اختیاری و برای تنظیمات پیشرفته.',
    help_preset:'بسته‌های قانون آماده: عبور از یک کشور، مسدودسازی QUIC، و تلاش برای مسدودکردن تبلیغات/بدافزار/ردیاب‌ها. هرچه خواستید روشن کنید.',
    help_dns:'تنظیمات DNS امن (DoH) و DNS ضدتحریم که داخل کانفیگ‌ها استفاده می‌شوند تا جست‌وجوی نام خصوصی بماند و به سایت‌های تحریمی/مسدود برسد.',
    help_netadv:'تنظیمات شبکه‌ی اضافی (مثل نویز WARP، AmneziaWG) برای کلاینت‌هایی که پشتیبانی می‌کنند. اگر لازم ندارید دست نزنید.',
    help_workerreq:'پلن رایگان کلودفلر ۱۰۰٬۰۰۰ درخواست ورکر در روز می‌دهد (هر ۲۴ ساعت صفر می‌شود). Account ID و یک توکن فقط‌خواندنی کلودفلر را وارد کنید تا مصرف امروز این‌جا دیده شود.',
    help_tg:'برای رویدادها پیام تلگرام بگیرید (اشتراک جدید، ورود، هشدار سهمیه/انقضا). توکن ربات و یک یا چند Chat ID اضافه کنید (ربات باید ادمین کانال باشد).',
    help_users:'به هر نفر یک لینک با سهمیه حجم و انقضا بدهید. چندکاربره را روشن کنید، افراد را اضافه و ذخیره کنید. غیرفعال/منقضی‌کردن یک نفر اتصال‌هایش را قطع می‌کند.',
    set_sec:'امنیت', tls_lbl:'TLS', tls_h:'رمزگذاری تونل (خاموش = WS ساده روی پورت‌های HTTP)', ech_h:'Encrypted Client Hello', zerortt:'۰-RTT', randpath:'مسیر تصادفی', skipcert:'نادیده‌گرفتن گواهی', skipcert_h:'اجازه‌ی TLS ناامن', connected:'متصل', notconn:'متصل نیست' }
};

const FORMATS = [
  { name:'Auto', fa:'خودکار', icon:'⚡', q:'' },
  { name:'Base64', fa:'بیس۶۴', icon:'🔒', q:'&b64' },
  { name:'Clash', fa:'کلش', icon:'🛡', q:'&clash' },
  { name:'sing-box', fa:'سینگ‌باکس', icon:'📦', q:'&sb' },
  { name:'Surge', fa:'سورج', icon:'🌊', q:'&surge' },
  { name:'Quantumult X', fa:'کوانتومالت', icon:'🧩', q:'&quanx' },
  { name:'Loon', fa:'لون', icon:'🪁', q:'&loon' },
];
const PORTS = [443, 2053, 2083, 2087, 2096, 8443];
const ISPS = [
  { name:'MCI (Hamrah-e Aval)', fa:'همراه اول', asn:'197207' },
  { name:'Irancell (MTN)', fa:'ایرانسل', asn:'44244' },
  { name:'Shatel', fa:'شاتل', asn:'31549' },
  { name:'RighTel', fa:'رایتل', asn:'57218' },
  { name:'TCI (Mokhaberat)', fa:'مخابرات', asn:'58224' },
  { name:'ParsOnline', fa:'پارس‌آنلاین', asn:'16322' },
  { name:'Asiatech', fa:'آسیاتک', asn:'43754' },
  { name:'MobinNet', fa:'مبین‌نت', asn:'50810' },
];

const GUIDE = {
  en: `
<div class="card"><h4>👋 What is this?</h4>
<p style="font-size:13px">This is the control panel for your own Nova Proxy. From here you hand out a <b>subscription link</b> that any VPN app can use, and you tune how it works. You don't need to understand the technical parts. The steps below are all most people ever touch. Use the menu on the left to move between pages.</p>
</div>
<div class="card"><h4>🚀 Quick start</h4>
<div class="gstep"><span class="n">1</span><span>Open <b>Dashboard</b> (or <b>Subscriptions</b>) and copy your <b>subscription link</b>, or scan its QR code.</span></div>
<div class="gstep"><span class="n">2</span><span>Open the link in a proxy app. <b>Hiddify</b> is recommended (also v2rayNG, MahsaNG, FlClash, NekoBox, sing-box).</span></div>
<div class="gstep"><span class="n">3</span><span>Press <b>Connect</b>, then run <b>Auto</b> / <b>url-test</b>. The app picks the fastest clean IP for your network automatically.</span></div>
</div>
<div class="card"><h4>🆕 New tools</h4>
<div class="gstep"><span class="n">🇮🇷</span><span><b>Iran mode</b> (Dashboard) — one tap enables the best combo: all protocols + port-spread + fragment + ECH + public nodes, blocks QUIC, disables IPv6.</span></div>
<div class="gstep"><span class="n">🔀</span><span><b>Protocol → All</b>, <b>Port spread</b>, <b>Multi-transport</b> (Settings) — every node as VLESS/Trojan/SS across ports and WS/gRPC/XHTTP, so the app fails over if one is blocked.</span></div>
<div class="gstep"><span class="n">🧩</span><span><b>Chain proxy / fix-IP</b> (Settings) — route the exit through your own socks5/http upstream to reach sites that block Cloudflare (has a Test button).</span></div>
<div class="gstep"><span class="n">📦</span><span><b>GitHub mirror</b> (Settings) — a permanent sub link on GitHub that keeps working if your domain gets filtered.</span></div>
<div class="gstep"><span class="n">👥</span><span><b>Users</b> page — give each person a link with a data quota + expiry; disabling/expiring cuts them off (Telegram alerts at 80% / expiry).</span></div>
<div class="gstep"><span class="n">🛡</span><span><b>WARP / WARP+</b> (Network) — Register a free WARP account (no key needed), or paste a WARP+ key for more speed.</span></div>
<div class="gstep"><span class="n">💾</span><span><b>Backup &amp; restore</b> (Settings) — export all settings to a file and restore later.</span></div>
<div class="gstep"><span class="n">🤖</span><span><b>Telegram bot</b> — <code>/start</code> opens a colored console to manage everything from Telegram.</span></div>
</div>
<div class="card"><h4>🔗 Give it to a friend</h4>
<div class="gstep"><span class="n">1</span><span>Send them the <b>subscription link</b> or a <b>QR image</b> (from the Subscriptions page each format has its own QR).</span></div>
<div class="gstep"><span class="n">2</span><span>They install an app, tap <b>+</b> → scan the QR or paste the link.</span></div>
<div class="gstep"><span class="n">3</span><span>Connect → run Auto/url-test. Done. No settings to change.</span></div>
<div class="gtip">If it connects but pages don't load: turn on <b>Fragment</b> in the app (Hiddify → Settings → Fragment).</div>
</div>
<div class="card"><h4>⚡ Clean IPs (the important page)</h4>
<div class="gstep"><span class="n">•</span><span><b>Smart (per-ISP)</b>: recommended. Each user automatically gets the cleanest IPs for their operator (MCI/Irancell/…). Just set the <b>Smart IP API</b> address.</span></div>
<div class="gstep"><span class="n">•</span><span><b>Custom list</b>: you paste your own list of clean IPs (<code>ip:port#name</code>, one per line).</span></div>
<div class="gstep"><span class="n">•</span><span><b>Random</b>: random Cloudflare IPs; the app's url-test sorts them.</span></div>
</div>
<div class="card"><h4>🛡 Beat SNI filtering (Fragment / ECH / SNI-spoof)</h4>
<p style="font-size:13px">If your ISP blocks by reading the <b>SNI</b> (the server name in the TLS hello), there are three layers — the first two are built into Nova, the third is a device-side app:</p>
<div class="gstep"><span class="n">1</span><span><b>TLS Fragment</b> (Settings → Advanced) — splits the TLS hello so DPI can't read the SNI. Tap an <b>Iran preset</b> (Gentle / Balanced / Aggressive) and Save; try different ones per ISP (MCI / Irancell).</span></div>
<div class="gstep"><span class="n">2</span><span><b>ECH</b> (Settings → Advanced) — encrypts the SNI entirely, so there's nothing for DPI to match.</span></div>
<div class="gstep"><span class="n">3</span><span><b>Packet-level SNI-spoof</b> sends a decoy "clean" SNI to fool the DPI. It needs raw TCP/IP packet control, so it <b>can't run in a Worker or a sub-config</b> — run it as a separate device app alongside Nova: <b>patterniha/SNI-Spoofing</b>, <b>GoodbyeDPI</b> (Windows), or <b>ByeDPI / byedpi-android</b>.</span></div>
<div class="gtip">⚠️ Setting the config SNI to someone else's clean domain (e.g. creativecommons.org → your worker) is cross-domain fronting — <b>Cloudflare blocks it</b>, so it won't connect. Use Fragment/ECH here, or a device-side spoof tool.</div>
</div>
<div class="card"><h4>🚀 Set up your own panel</h4>
<div class="gstep"><span class="n">•</span><span><b>Auto-provision</b> (recommended): at <b>novaproxy.online &rarr; Deploy</b>, paste a Cloudflare API token. The system builds the worker, database, domain and clean IPs and hands you a subscription link + QR.</span></div>
<div class="gstep"><span class="n">•</span><span><b>Deploy to Cloudflare</b> (one-click): installs the worker on your account in one click. You then set a password (ADMIN) and a database (KV), and the install page guides you with Test buttons.</span></div>
</div>
<div class="card"><h4>📡 Per-ISP pools &amp; Nova Radar</h4>
<p style="font-size:13px">This page shows how many clean Cloudflare IPs are known to work on each Iranian operator (MCI, Irancell, Shatel...). The data comes from the <b>Nova Radar</b> scanner. To fill it:</p>
<div class="gstep"><span class="n">1</span><span>On the <b>Clean IPs</b> page choose <b>Smart (per-ISP)</b> and set the API to <code>nova-deploy.pages.dev/api/pool</code>, then Save.</span></div>
<div class="gstep"><span class="n">2</span><span>Run <b>Nova Radar</b> (desktop or Android) <b>on an Iranian network</b>. It scans Cloudflare IPs and uploads the fastest ones for that operator.</span></div>
<div class="gstep"><span class="n">3</span><span>The pools fill up, and each user automatically gets the best IPs for their own network.</span></div>
<div class="gtip">Until Radar runs on Iranian networks the pools stay empty, and the proxy falls back to seed/random Cloudflare IPs (still works, just not ISP-tuned).</div>
</div>
<div class="card"><h4>🌐 Network &amp; DNS</h4>
<p style="font-size:13px">These get baked into every config you share, so there's nothing to set up inside the app:</p>
<div class="gstep"><span class="n">•</span><span><b>Iran domestic direct</b>: Iranian sites skip the proxy, so they load fast and don't use quota. Keep this on.</span></div>
<div class="gstep"><span class="n">•</span><span><b>Block ads &amp; trackers</b> and the <b>adult-content filter</b>: optional clean-up of what gets through.</span></div>
<div class="gstep"><span class="n">•</span><span><b>Secure DNS (DoH)</b> hides which sites you look up. <b>Anti-sanction DNS</b> helps reach Google, GitHub, npm and other blocked services.</span></div>
<div class="gtip">Not sure? Leave the defaults. After any change press <b>Save</b>, then reconnect in the app (or re-import the link) so the new settings apply.</div>
</div>
<div class="card"><h4>🛡 WARP (extra reach)</h4>
<p style="font-size:13px">On the <b>Network &amp; DNS</b> page you can turn on <b>WARP</b>, Cloudflare's own tunnel:</p>
<div class="gstep"><span class="n">1</span><span>Click <b>Register</b> once to create a free WARP account.</span></div>
<div class="gstep"><span class="n">2</span><span>Turn on <b>Enable WARP</b> and pick a mode: <b>WARP only</b> (everything via WARP), <b>Chain</b> (your proxy, then WARP), or <b>WoW</b> (two WARP hops for a second exit IP).</span></div>
<div class="gstep"><span class="n">3</span><span>Press <b>Save</b>, then reconnect in the app. WARP traffic is unlimited and often reaches services that block normal proxy IPs.</span></div>
<div class="gtip">Optional: turn on <b>AmneziaWG</b> if plain WARP gets blocked, paste a <b>WARP+</b> key for the faster tier, or set a custom <b>endpoint</b> if the default is slow. Works in Hiddify, sing-box and Clash Meta.</div>
</div>
<div class="card"><h4>🧭 Routing presets &amp; custom rules</h4>
<p style="font-size:13px">On <b>Network &amp; DNS</b>, below the toggles:</p>
<div class="gstep"><span class="n">•</span><span><b>Preset rules</b>: one-tap <b>bypass</b> for China/Russia (Iran is the "Iran domestic direct" toggle), and <b>block</b> QUIC / malware / phishing / cryptominers. Applied to Clash configs.</span></div>
<div class="gstep"><span class="n">•</span><span><b>Custom routing rules</b>: one per line — <code>TYPE,value,OUTBOUND</code> (e.g. <code>DOMAIN-SUFFIX,digikala.com,DIRECT</code> or <code>DOMAIN-KEYWORD,ads,REJECT</code>). OUTBOUND is DIRECT, REJECT or PROXY. These win over the presets.</span></div>
<div class="gtip">Press <b>Save</b>, then reconnect in the app so the new rules apply.</div>
</div>
<div class="card"><h4>🎁 Free-service notice</h4>
<p style="font-size:13px">On <b>Subscriptions</b>, the <b>Free-service notice</b> is <b>always on</b> and its <b>message is fixed</b> — a labelled node is baked into every config so people always see it's the free Nova service. It can't be turned off or changed by anyone (so resellers can't strip or rebrand it).</p>
</div>
<div class="card"><h4>📊 Dashboard at a glance</h4>
<p style="font-size:13px">The top bar shows the <b>country and datacenter</b> of your current network, and the home tiles show your <b>Network</b>, storage, <b>Worker usage</b>, and <b>Traffic today</b>. The <b>Notifications</b> page shows worker usage and total traffic (today / month / year), and lets you set up Telegram alerts.</p>
</div>
<div class="card"><h4>⚙ Settings</h4>
<p style="font-size:13px">Protocol (VLESS/Trojan/SS), transport (WebSocket/XHTTP/gRPC), TLS fingerprint, fragment, ECH, and reverse-proxy IP. Defaults work for most people, so change these only if you know what you need.</p>
</div>
<div class="card"><h4>🛠 Advanced tuning (optional)</h4>
<p style="font-size:13px">Only if a default doesn't work for you. Press <b>Save</b>, then re-import the link in your app.</p>
<div class="gstep"><span class="n">•</span><span><b>TLS fragment → Custom</b> (Settings → Advanced): set your own <b>length</b> / <b>interval</b> / <b>packets</b> to slip past DPI when the presets don't help.</span></div>
<div class="gstep"><span class="n">•</span><span><b>Custom CDN</b> — fix a specific <b>Host</b> and <b>SNI</b> (use a real CDN domain together with a clean-IP address). Leave blank to rotate across your domains.</span></div>
<div class="gstep"><span class="n">•</span><span><b>ECH</b> — turn on the ECH switch (Security), then set the <b>ECH SNI</b> and <b>DoH</b> source in Advanced.</span></div>
<div class="gstep"><span class="n">•</span><span><b>WARP noise</b> (Network → WARP) — <b>mode/count/size/delay</b> for extra obfuscation on clients that support it.</span></div>
</div>
<div class="card"><h4>🇮🇷 Tips for Iran</h4>
<div class="gtip"><b>Use a custom domain.</b> <code>*.workers.dev</code> is blocked in Iran. Add your own domain to the worker so configs use your domain's SNI.</div>
<div class="gtip">Multiple TLS ports (443/2053/2083/2087/2096/8443) are already included so the app can route around throttling.</div>
</div>
<div class="card"><h4>🎨 Theme &amp; language</h4>
<p style="font-size:13px">Use the <b>☾/☀</b> button (bottom-left) for dark/light, and <b>English/فارسی</b> for language. Your choice is remembered.</p>
</div>`,
  fa: `
<div class="card"><h4>👋 این چیست؟</h4>
<p style="font-size:13px">این پنل کنترل پروکسی Nova شماست. از اینجا یک <b>لینک اشتراک</b> می‌دهید که هر برنامه‌ی VPN می‌تواند از آن استفاده کند، و نحوه‌ی کارکرد آن را تنظیم می‌کنید. لازم نیست بخش‌های فنی را بفهمید؛ مراحل زیر همه‌ی چیزی است که بیشتر افراد به آن نیاز دارند. برای جابه‌جایی بین صفحه‌ها از منوی سمت راست استفاده کنید.</p>
</div>
<div class="card"><h4>🚀 شروع سریع</h4>
<div class="gstep"><span class="n">۱</span><span>وارد <b>داشبورد</b> (یا <b>اشتراک‌ها</b>) شوید و <b>لینک اشتراک</b> را کپی کنید، یا QR آن را اسکن کنید.</span></div>
<div class="gstep"><span class="n">۲</span><span>لینک را در یک برنامه‌ی پروکسی باز کنید. <b>Hiddify</b> پیشنهاد می‌شود (همچنین v2rayNG، MahsaNG، FlClash، NekoBox، sing-box).</span></div>
<div class="gstep"><span class="n">۳</span><span><b>Connect</b> را بزنید و سپس <b>Auto</b> / <b>url-test</b> را اجرا کنید. برنامه به‌طور خودکار سریع‌ترین آی‌پی تمیز را برای شبکه‌ی شما انتخاب می‌کند.</span></div>
</div>
<div class="card"><h4>🆕 ابزارهای جدید</h4>
<div class="gstep"><span class="n">🇮🇷</span><span><b>حالت ایران</b> (داشبورد) — با یک ضربه بهترین ترکیب را روشن می‌کند: همهٔ پروتکل‌ها + پخش پورت + فرگمنت + ECH + نودهای عمومی، مسدودسازی QUIC و خاموش‌کردن IPv6.</span></div>
<div class="gstep"><span class="n">🔀</span><span><b>پروتکل ← همه</b>، <b>پخش پورت</b>، <b>چندحمل‌ونقلی</b> (تنظیمات) — هر نود به‌صورت VLESS/Trojan/SS روی پورت‌ها و WS/gRPC/XHTTP تا اگر یکی بسته شد برنامه روی بعدی برود.</span></div>
<div class="gstep"><span class="n">🧩</span><span><b>چِین‌پراکسی / تثبیت IP</b> (تنظیمات) — خروجی را از پراکسی بالادست خودت (socks5/http) عبور بده تا به سایت‌هایی که کلودفلر را بلاک می‌کنند برسی (دکمهٔ تست دارد).</span></div>
<div class="gstep"><span class="n">📦</span><span><b>آینهٔ گیت‌هاب</b> (تنظیمات) — یک لینک ساب دائمی روی گیت‌هاب که اگر دامنه‌ات فیلتر شد همچنان کار می‌کند.</span></div>
<div class="gstep"><span class="n">👥</span><span>صفحهٔ <b>کاربران</b> — به هر نفر لینک با سهمیهٔ حجم و انقضا بده؛ غیرفعال/منقضی‌کردن دسترسی را قطع می‌کند (هشدار تلگرام در ۸۰٪/انقضا).</span></div>
<div class="gstep"><span class="n">🛡</span><span><b>WARP / WARP+</b> (شبکه) — یک حساب WARP رایگان ثبت کن (بدون کلید)، یا کلید WARP+ را برای سرعت بیشتر وارد کن.</span></div>
<div class="gstep"><span class="n">💾</span><span><b>پشتیبان‌گیری و بازیابی</b> (تنظیمات) — همهٔ تنظیمات را در یک فایل ذخیره و بعداً بازیابی کن.</span></div>
<div class="gstep"><span class="n">🤖</span><span><b>ربات تلگرام</b> — <code>/start</code> یک کنسول رنگی برای مدیریت همه‌چیز از تلگرام باز می‌کند.</span></div>
</div>
<div class="card"><h4>🔗 اشتراک‌گذاری با دوستان</h4>
<div class="gstep"><span class="n">۱</span><span><b>لینک اشتراک</b> یا تصویر <b>QR</b> را بفرستید (در صفحه‌ی اشتراک‌ها هر قالب QR جداگانه دارد).</span></div>
<div class="gstep"><span class="n">۲</span><span>برنامه را نصب کنند، روی <b>+</b> بزنند → QR را اسکن یا لینک را بچسبانند.</span></div>
<div class="gstep"><span class="n">۳</span><span>Connect → سپس Auto/url-test. تمام. نیازی به تغییر تنظیمات نیست.</span></div>
<div class="gtip">اگر وصل شد ولی صفحه باز نشد: گزینه‌ی <b>Fragment</b> را در برنامه روشن کنید (Hiddify ← تنظیمات ← Fragment).</div>
</div>
<div class="card"><h4>⚡ آی‌پی‌های تمیز (صفحه‌ی مهم)</h4>
<div class="gstep"><span class="n">•</span><span><b>هوشمند (هر اپراتور)</b>: پیشنهادی. هر کاربر به‌طور خودکار تمیزترین آی‌پی‌ها را برای اپراتورش (همراه اول/ایرانسل/…) می‌گیرد. کافی است آدرس <b>API آی‌پی هوشمند</b> را تنظیم کنید.</span></div>
<div class="gstep"><span class="n">•</span><span><b>لیست دلخواه</b>: لیست آی‌پی‌های تمیز خودتان را وارد کنید (<code>ip:port#name</code>، هر خط یکی).</span></div>
<div class="gstep"><span class="n">•</span><span><b>تصادفی</b>: آی‌پی‌های تصادفی کلودفلر؛ url-test برنامه آن‌ها را مرتب می‌کند.</span></div>
</div>
<div class="card"><h4>🛡 شکست فیلترینگ SNI (Fragment / ECH / SNI-spoof)</h4>
<p style="font-size:13px">اگر اپراتورت با خواندن <b>SNI</b> (نام سرور در TLS hello) بلاک می‌کند، سه لایه داری — دو تای اول داخل نوا هست، سومی یک اپ روی دستگاه است:</p>
<div class="gstep"><span class="n">۱</span><span><b>TLS Fragment</b> (تنظیمات ← پیشرفته) — TLS hello را تکه‌تکه می‌کند تا DPI نتواند SNI را بخواند. یک <b>پریست ایران</b> (Gentle / Balanced / Aggressive) بزن و ذخیره کن؛ روی هر اپراتور (همراه‌اول/ایرانسل) یکی جواب می‌دهد.</span></div>
<div class="gstep"><span class="n">۲</span><span><b>ECH</b> (تنظیمات ← پیشرفته) — کل SNI را رمز می‌کند، پس چیزی برای تطبیق DPI نمی‌ماند.</span></div>
<div class="gstep"><span class="n">۳</span><span><b>SNI-spoof سطح‌پکت</b> یک SNI «تمیز» تقلبی می‌فرستد تا DPI را گول بزند. به کنترل خام بسته‌های TCP/IP نیاز دارد، پس <b>روی ورکر یا ساب اجرا نمی‌شود</b> — به‌صورت اپ جدا روی دستگاه کنار نوا اجرا کن: <b>patterniha/SNI-Spoofing</b>، <b>GoodbyeDPI</b> (ویندوز)، یا <b>ByeDPI / byedpi-android</b>.</span></div>
<div class="gtip">⚠️ گذاشتن SNI کانفیگ روی دامنهٔ تمیزِ شخص دیگر (مثل creativecommons.org → ورکر شما) فرانتینگ بین‌دامنه‌ای است — <b>کلودفلر مسدودش می‌کند</b> و وصل نمی‌شود. از Fragment/ECH این‌جا یا ابزار روی دستگاه استفاده کن.</div>
</div>
<div class="card"><h4>🚀 راه‌اندازی پنل خودتان</h4>
<div class="gstep"><span class="n">•</span><span><b>راه‌اندازی خودکار</b> (پیشنهادی): در <b>novaproxy.online &larr; استقرار</b> یک توکن Cloudflare بچسبانید. سیستم ورکر، دیتابیس، دامنه و آی‌پی تمیز را می‌سازد و لینک اشتراک + QR به شما می‌دهد.</span></div>
<div class="gstep"><span class="n">•</span><span><b>Deploy to Cloudflare</b> (یک کلیک): با یک کلیک ورکر را روی حساب شما نصب می‌کند. سپس یک رمز (ADMIN) و یک دیتابیس (KV) تنظیم می‌کنید و صفحه‌ی نصب با دکمه‌ی «تست» راهنمایی می‌کند.</span></div>
</div>
<div class="card"><h4>📡 مخزن هر اپراتور و Nova Radar</h4>
<p style="font-size:13px">این صفحه نشان می‌دهد برای هر اپراتور ایرانی (همراه اول، ایرانسل، شاتل...) چند آی‌پی تمیز کلودفلر شناخته‌شده است. داده‌ها از اسکنر <b>Nova Radar</b> می‌آید. برای پر کردن آن:</p>
<div class="gstep"><span class="n">۱</span><span>در صفحه‌ی <b>آی‌پی‌های تمیز</b> حالت <b>هوشمند (هر اپراتور)</b> را انتخاب و API را روی <code>nova-deploy.pages.dev/api/pool</code> بگذارید و ذخیره کنید.</span></div>
<div class="gstep"><span class="n">۲</span><span><b>Nova Radar</b> (دسکتاپ یا اندروید) را <b>روی یک شبکه‌ی ایرانی</b> اجرا کنید. آی‌پی‌های کلودفلر را اسکن و سریع‌ترین‌ها را برای آن اپراتور آپلود می‌کند.</span></div>
<div class="gstep"><span class="n">۳</span><span>مخزن‌ها پر می‌شوند و هر کاربر به‌طور خودکار بهترین آی‌پی‌ها را برای شبکه‌ی خودش می‌گیرد.</span></div>
<div class="gtip">تا وقتی Radar روی شبکه‌های ایرانی اجرا نشود، مخزن‌ها خالی می‌مانند و پروکسی از آی‌پی‌های اولیه/تصادفی استفاده می‌کند (باز هم کار می‌کند، فقط مخصوص اپراتور نیست).</div>
</div>
<div class="card"><h4>🌐 شبکه و DNS</h4>
<p style="font-size:13px">این‌ها در هر کانفیگی که می‌سازید اعمال می‌شوند، پس نیازی به تنظیم داخل برنامه نیست:</p>
<div class="gstep"><span class="n">•</span><span><b>سایت‌های ایرانی مستقیم</b>: سایت‌های ایرانی از پروکسی رد نمی‌شوند؛ سریع باز می‌شوند و حجم مصرف نمی‌کنند. روشن بماند.</span></div>
<div class="gstep"><span class="n">•</span><span><b>مسدودسازی تبلیغات و ردیاب‌ها</b> و <b>فیلتر محتوای بزرگسال</b>: پاکسازی اختیاری.</span></div>
<div class="gstep"><span class="n">•</span><span><b>DNS امن (DoH)</b> پنهان می‌کند چه سایت‌هایی را باز می‌کنید. <b>DNS ضدتحریم</b> به دسترسی به گوگل، گیت‌هاب، npm و سرویس‌های مسدود کمک می‌کند.</span></div>
<div class="gtip">مطمئن نیستید؟ پیش‌فرض‌ها را نگه دارید. بعد از هر تغییر <b>ذخیره</b> را بزنید و سپس در برنامه دوباره وصل شوید (یا لینک را دوباره وارد کنید) تا تنظیمات تازه اعمال شود.</div>
</div>
<div class="card"><h4>🛡 WARP (دسترسی بیشتر)</h4>
<p style="font-size:13px">در صفحه‌ی <b>شبکه و DNS</b> می‌توانید <b>WARP</b>، تونل اختصاصی کلودفلر، را روشن کنید:</p>
<div class="gstep"><span class="n">۱</span><span>یک بار روی <b>ثبت</b> بزنید تا یک حساب رایگان WARP ساخته شود.</span></div>
<div class="gstep"><span class="n">۲</span><span><b>فعال‌سازی WARP</b> را روشن کنید و یک حالت انتخاب کنید: <b>فقط WARP</b> (همه از WARP)، <b>زنجیره</b> (پروکسی شما، سپس WARP)، یا <b>WoW</b> (دو پرش WARP برای آی‌پی خروجی دوم).</span></div>
<div class="gstep"><span class="n">۳</span><span><b>ذخیره</b> را بزنید و در برنامه دوباره وصل شوید. ترافیک WARP نامحدود است و اغلب به سرویس‌هایی می‌رسد که آی‌پی پروکسی معمولی را مسدود می‌کنند.</span></div>
<div class="gtip">اختیاری: اگر WARP ساده مسدود شد <b>AmneziaWG</b> را روشن کنید، برای سرعت بیشتر کلید <b>WARP+</b> وارد کنید، یا اگر نقطه‌ی پیش‌فرض کند بود یک <b>endpoint</b> دلخواه بگذارید. در Hiddify، sing-box و Clash Meta کار می‌کند.</div>
</div>
<div class="card"><h4>🧭 قوانین آماده و دلخواه</h4>
<p style="font-size:13px">در صفحه‌ی <b>شبکه و DNS</b>، زیر کلیدها:</p>
<div class="gstep"><span class="n">•</span><span><b>قوانین آماده</b>: عبور مستقیم چین/روسیه با یک کلیک (ایران با کلید «سایت‌های ایرانی مستقیم»)، و مسدودسازی QUIC / بدافزار / فیشینگ / ماینر. روی کانفیگ‌های Clash اعمال می‌شود.</span></div>
<div class="gstep"><span class="n">•</span><span><b>قوانین مسیریابی دلخواه</b>: هر خط یک قانون — <code>TYPE,value,OUTBOUND</code> (مثلاً <code>DOMAIN-SUFFIX,digikala.com,DIRECT</code> یا <code>DOMAIN-KEYWORD,ads,REJECT</code>). خروجی: DIRECT یا REJECT یا PROXY. این‌ها بر قوانین آماده اولویت دارند.</span></div>
<div class="gtip"><b>ذخیره</b> را بزنید و در برنامه دوباره وصل شوید تا قوانین تازه اعمال شود.</div>
</div>
<div class="card"><h4>🎁 اعلان سرویس رایگان</h4>
<p style="font-size:13px">در صفحه‌ی <b>اشتراک‌ها</b>، <b>اعلان سرویس رایگان</b> <b>همیشه روشن</b> و <b>متن آن ثابت</b> است — یک نود برچسب‌دار در هر کانفیگ قرار می‌گیرد تا همه بدانند سرویس رایگان نوا است. هیچ‌کس نمی‌تواند آن را خاموش یا متنش را تغییر دهد (پس فروشنده‌ها نمی‌توانند حذف یا تغییرش دهند).</p>
</div>
<div class="card"><h4>📊 یک نگاه به داشبورد</h4>
<p style="font-size:13px">کاشی‌های صفحه‌ی اصلی <b>دامنه</b>، <b>شبکه</b>، حافظه، <b>برنامه‌ای</b> که با آن وارد شده‌اید و <b>مصرف امروز</b> را نشان می‌دهند. صفحه‌ی <b>اعلان‌ها</b> مصرف ورکر و حجم کل (امروز/ماه/سال) را نشان می‌دهد و امکان اعلان تلگرام دارد.</p>
</div>
<div class="card"><h4>⚙ تنظیمات</h4>
<p style="font-size:13px">پروتکل (VLESS/Trojan/SS)، حمل‌ونقل (WebSocket/XHTTP/gRPC)، اثرانگشت TLS، Fragment، ECH و آی‌پی پروکسی معکوس. مقادیر پیش‌فرض برای بیشتر افراد مناسب است؛ فقط اگر می‌دانید چه می‌خواهید تغییر دهید.</p>
</div>
<div class="card"><h4>🛠 تنظیم پیشرفته (اختیاری)</h4>
<p style="font-size:13px">فقط اگر یک پیش‌فرض برایتان کار نکرد. <b>ذخیره</b> را بزنید و لینک را دوباره در برنامه وارد کنید.</p>
<div class="gstep"><span class="n">•</span><span><b>TLS fragment → سفارشی</b> (تنظیمات ← پیشرفته): <b>طول</b> / <b>فاصله</b> / <b>بسته‌ها</b> را خودتان تعیین کنید تا وقتی پیش‌فرض‌ها جواب ندادند از DPI رد شوید.</span></div>
<div class="gstep"><span class="n">•</span><span><b>Custom CDN</b> — یک <b>Host</b> و <b>SNI</b> ثابت بگذارید (از دامنه‌ی CDN واقعی همراه آدرس آی‌پی تمیز). خالی = چرخش بین دامنه‌های شما.</span></div>
<div class="gstep"><span class="n">•</span><span><b>ECH</b> — کلید ECH (امنیت) را روشن کنید، سپس <b>ECH SNI</b> و منبع <b>DoH</b> را در پیشرفته تنظیم کنید.</span></div>
<div class="gstep"><span class="n">•</span><span><b>نویز WARP</b> (شبکه ← WARP) — <b>حالت/تعداد/اندازه/تأخیر</b> برای مبهم‌سازی بیشتر در برنامه‌هایی که پشتیبانی می‌کنند.</span></div>
</div>
<div class="card"><h4>🇮🇷 نکته‌های ایران</h4>
<div class="gtip"><b>از دامنه‌ی اختصاصی استفاده کنید.</b> <code>*.workers.dev</code> در ایران فیلتر است. دامنه‌ی خودتان را به Worker اضافه کنید تا کانفیگ‌ها از SNI دامنه‌ی شما استفاده کنند.</div>
<div class="gtip">چند پورت TLS (۴۴۳/۲۰۵۳/۲۰۸۳/۲۰۸۷/۲۰۹۶/۸۴۴۳) از قبل گنجانده شده تا برنامه بتواند کندی را دور بزند.</div>
</div>
<div class="card"><h4>🎨 تم و زبان</h4>
<p style="font-size:13px">از دکمه‌ی <b>☾/☀</b> (پایین-چپ) برای تاریک/روشن و <b>English/فارسی</b> برای زبان استفاده کنید. انتخاب شما ذخیره می‌شود.</p>
</div>`
};

let lang = (navigator.language||'en').toLowerCase().indexOf('fa')===0?'fa':'en';
let theme = 'light';
try { const s=localStorage.getItem('nova_lang'); if(s) lang=s; const th=localStorage.getItem('nova_theme'); if(th) theme=th; } catch(e){}

function t(k){ return (T[lang]&&T[lang][k]) || T.en[k] || k; }
function applyTheme(){ document.documentElement.setAttribute('data-theme',theme); $('theme').textContent = theme==='dark'?'☾':'☀'; }
function applyLang(){
  const L=T[lang]; document.documentElement.dir=L.dir; document.documentElement.lang=lang;
  document.querySelectorAll('[data-i]').forEach(el=>{ const v=L[el.dataset.i]; if(v!=null) el.textContent=v; });
  document.querySelectorAll('#lg button').forEach(b=>b.classList.toggle('on', b.dataset.l===lang));
  const gb=$('guide-body'); if(gb){ gb.className='guide-body'; gb.innerHTML=GUIDE[lang]; }
  if(cfg){ renderSubCards(); renderPortCards(); renderISP(); }
}
function toast(m,err){ const e=$('toast'); e.textContent=m; e.className='toast show'+(err?' err':''); setTimeout(()=>e.className='toast',1500); }
function copyText(x){ navigator.clipboard.writeText(x).then(()=>toast(t('copied'))); }
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
// Central broadcasts surface as a bell notification in the topbar (the in-page banner is hidden).
function loadBanner(){ const el=$('nova-banner'); if(el) el.style.display='none';
  const menu=$('bell-menu'), dot=$('bell-dot'), empty='<div class="be">'+(lang==='fa'?'اعلانی نیست':'No notifications')+'</div>';
  fetch('/admin/announcement?_t='+Date.now()).then(r=>r.json()).then(a=>{
    if(a && (a.text||a.title)){
      const title=a.title||'', text=a.text||'', sig=(a.ts||'')+'|'+title+'|'+text;
      if(menu){ menu.innerHTML=(title?'<div class="bt">'+esc(title)+'</div>':'')+'<div class="bx">'+esc(text)+'</div>'+(a.url?'<a class="bl" href="'+esc(a.url)+'" target="_blank" rel="noopener">'+esc(a.url)+'</a>':''); menu.dataset.sig=sig; }
      if(dot) dot.classList.toggle('on', localStorage.getItem('nova_seen_ann')!==sig);
    } else { if(menu){ menu.innerHTML=empty; menu.dataset.sig=''; } if(dot) dot.classList.remove('on'); }
  }).catch(()=>{ if(menu) menu.innerHTML=empty; });
}
if($('bell-btn')) $('bell-btn').onclick=function(e){ e.stopPropagation(); const m=$('bell-menu'); if(!m) return;
  const open=m.classList.toggle('open');
  if(open){ const sig=m.dataset.sig||''; if(sig){ localStorage.setItem('nova_seen_ann',sig); } const d=$('bell-dot'); if(d) d.classList.remove('on'); } };
document.addEventListener('click',function(){ const m=$('bell-menu'); if(m) m.classList.remove('open'); });

function setTitle(a){ const tt=$('topTitle'), ts=$('topSub'); const sp=a.querySelector('span');
  if(tt){ const k=sp?sp.getAttribute('data-i'):('nav_'+a.dataset.p); if(k) tt.setAttribute('data-i',k); tt.textContent=sp?sp.textContent:t('nav_'+a.dataset.p); }
  if(ts){ const pg=$('p-'+a.dataset.p); const ss=pg?pg.querySelector(':scope > .sec-s'):null; if(ss){ const dk=ss.getAttribute('data-i'); if(dk) ts.setAttribute('data-i',dk); else ts.removeAttribute('data-i'); ts.textContent=ss.textContent; } else { ts.textContent=''; ts.removeAttribute('data-i'); } } }
$('nav').addEventListener('click',e=>{
  const par=e.target.closest('.navparent'); if(par){ const g=par.closest('.navgrp'); if(g) g.classList.toggle('open'); return; }
  const a=e.target.closest('a[data-p]'); if(!a) return;
  document.querySelectorAll('#nav a').forEach(x=>x.classList.toggle('on',x===a));
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('on'));
  $('p-'+a.dataset.p).classList.add('on'); $('side').classList.remove('open'); setTitle(a);
  const g=a.closest('.navgrp'); if(g) g.classList.add('open'); // keep the submenu open on its pages
  if(a.dataset.p==='isp') renderISP();
  if(a.dataset.p==='net') loadNet();
  if(a.dataset.p==='notif') loadNotif();
  if(a.dataset.p==='users') loadUsersPage();
  if(a.dataset.p==='set') loadHealth(false);
  if(a.dataset.p==='ip') loadWhoami();
  if(a.dataset.p==='set') loadSecurity();
  if(a.dataset.p==='logs') loadLogs();
  if(a.dataset.p==='manage') loadManage();
});
if($('s-guide')) $('s-guide').onclick=(e)=>{ e.preventDefault(); const g=document.querySelector('#nav [data-p="guide"]'); if(g) g.click(); };
// ---- Guided tour: spotlight each section of the current page (reuses the per-card help text) ----
let _tour={els:[],i:0,cur:null};
function tourStop(){ const o=$('tour-ov'); if(o) o.remove(); const pp=$('tour-pop'); if(pp) pp.remove(); if(_tour.cur){ _tour.cur.classList.remove('tour-spot'); _tour.cur=null; } _tour.els=[]; }
function tourShow(){ const el=_tour.els[_tour.i]; if(!el){ tourStop(); return; }
  if(_tour.cur) _tour.cur.classList.remove('tour-spot'); _tour.cur=el; el.classList.add('tour-spot');
  try{ el.scrollIntoView({behavior:'smooth',block:'center'}); }catch(e){}
  const h=el.querySelector('h3'); const title=h?h.textContent.trim():''; const body=t(el.dataset.tour)||'';
  const pp=$('tour-pop'); if(!pp) return;
  pp.innerHTML='<h4>'+title+'</h4><p>'+body+'</p><div class="tr"><span class="sp">'+(_tour.i+1)+' / '+_tour.els.length+'</span>'
    +(_tour.i>0?'<button id="tour-prev">'+t('tour_prev')+'</button>':'')
    +'<button class="p" id="tour-next">'+(_tour.i<_tour.els.length-1?t('tour_next'):t('tour_done'))+'</button></div>';
  const pv=$('tour-prev'); if(pv) pv.onclick=()=>{ _tour.i=Math.max(0,_tour.i-1); tourShow(); };
  $('tour-next').onclick=()=>{ if(_tour.i<_tour.els.length-1){ _tour.i++; tourShow(); } else tourStop(); };
}
function startTour(){ tourStop(); const page=document.querySelector('.page.on'); if(!page) return;
  _tour.els=[...page.querySelectorAll('[data-tour]')]; _tour.i=0;
  if(!_tour.els.length){ toast(lang==='fa'?'برای این صفحه راهنمایی نیست':'No guide for this page'); return; }
  const ov=document.createElement('div'); ov.className='tour-ov'; ov.id='tour-ov'; ov.onclick=tourStop; document.body.appendChild(ov);
  const pp=document.createElement('div'); pp.className='tour-pop'; pp.id='tour-pop'; pp.onclick=(e)=>e.stopPropagation(); document.body.appendChild(pp);
  tourShow();
}
document.addEventListener('keydown',e=>{ if(e.key==='Escape' && $('tour-ov')) tourStop(); });
if($('tour-btn')) $('tour-btn').onclick=startTour;
$('lg').addEventListener('click',e=>{ const b=e.target.closest('button'); if(b){lang=b.dataset.l;try{localStorage.setItem('nova_lang',lang)}catch(e){}applyLang();}});
$('theme').onclick=()=>{ theme=theme==='dark'?'light':'dark'; try{localStorage.setItem('nova_theme',theme)}catch(e){} applyTheme(); };
if($('mob')) $('mob').onclick=()=>$('side').classList.toggle('open');
['t-ech','t-0rtt','t-rp','t-scv','t-portspread','t-multitrans','t-mirror','t-multiuser',
 't-routing','t-domestic','t-geoip','t-geosite','t-adblock','t-porn',
 't-doh','t-antisanc','t-localdns','t-fakedns','t-ipv6','t-lan','t-warp','t-warp-amnezia','t-tls','t-tg',
 't-bp-cn','t-bp-ru','t-bk-quic','t-bk-malware','t-bk-phishing','t-bk-cryptominers'
].forEach(id=>{ const el=$(id); if(el) el.onclick=()=>el.classList.toggle('on'); });

let ipMode='smart';
function applyIpMode(){
  document.querySelectorAll('#ipseg button').forEach(x=>x.classList.toggle('on',x.dataset.m===ipMode));
  $('m-smart-box').style.display=ipMode==='smart'?'block':'none';
  $('m-custom-box').style.display=ipMode==='custom'?'block':'none';
  $('m-random-box').style.display=ipMode==='random'?'block':'none';
  // The browser scanner only makes sense for the custom list (it feeds it).
  const sc=$('scan-card'); if(sc) sc.style.display=ipMode==='custom'?'block':'none';
}
$('ipseg').addEventListener('click',e=>{ const b=e.target.closest('button'); if(!b) return; ipMode=b.dataset.m; applyIpMode(); });
// Transport warning: gRPC/XHTTP need a custom domain bound to the Worker (+ enabled in
// Cloudflare network settings); they don't work on the *.workers.dev host.
if($('f-trans')) $('f-trans').addEventListener('change',function(){
  if(this.value==='grpc'||this.value==='xhttp'){
    toast(lang==='fa'?'gRPC/XHTTP نیازمند اتصال دامنه اختصاصی به Worker است':'gRPC/XHTTP need a custom domain bound to the Worker',1);
  }
});

function token(){ return (cfg&&cfg.optimizedSubGeneration&&cfg.optimizedSubGeneration.TOKEN)||''; }
function subBase(){ return location.protocol+'//'+location.host+'/sub?token='+token(); }

function showQR(url,name){ $('qrm-t').textContent=name; $('qrm-l').textContent=url; const b=$('qrm-box'); b.innerHTML='';
  if(window.QRCode) new QRCode(b,{text:url,width:200,height:200,correctLevel:QRCode.CorrectLevel.M}); $('qrmodal').classList.add('on'); }
$('qrm-x').onclick=()=>$('qrmodal').classList.remove('on');
$('qrmodal').addEventListener('click',e=>{ if(e.target.id==='qrmodal') $('qrmodal').classList.remove('on'); });

function card(name,desc,icon,url){
  const d=document.createElement('div'); d.className='sc';
  const qrIco='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;vertical-align:-2px;margin-inline-end:5px"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><line x1="14" y1="14" x2="14" y2="14"/><line x1="21" y1="14" x2="21" y2="14"/><line x1="14" y1="21" x2="21" y2="21"/></svg>';
  d.innerHTML='<div class="sc-h"><div class="sc-ic">'+icon+'</div><div><div class="sc-t">'+name+'</div><div class="sc-d">'+desc+'</div></div></div>'+
    '<div class="sc-url" title="'+t('copy')+'"></div><div class="sc-act"><button class="sc-cp">'+t('users_copy')+'</button><button class="sc-qr">'+qrIco+t('qr')+'</button></div>';
  d.querySelector('.sc-url').textContent=url;
  d.querySelector('.sc-url').onclick=()=>copyText(url);
  d.querySelector('.sc-cp').onclick=()=>copyText(url);
  d.querySelector('.sc-qr').onclick=()=>showQR(url,name);
  return d;
}
function renderSubCards(){ const c=$('subcards'); if(!c) return; c.innerHTML='';
  FORMATS.forEach(f=> c.appendChild(card(f.name, lang==='fa'?f.fa:f.name, f.icon, subBase()+f.q))); }
function renderPortCards(){ const c=$('portcards'); if(!c) return; c.innerHTML='';
  const link=cfg&&cfg.LINK; if(!link){ c.innerHTML='<p class="hint">'+(lang==='fa'?'پس از ذخیرهٔ تنظیمات، لینک تک‌نودی هر پورت این‌جا با کپی و QR ظاهر می‌شود.':'After you save your settings, a single-node link for each port appears here with copy + QR.')+'</p>'; return; }
  PORTS.forEach(p=>{ const url=link.replace(/@([^:/?#]+):\d+/, '@$1:'+p); c.appendChild(card('Port '+p, (lang==='fa'?'پورت ':'TLS ')+p, '🔌', url)); }); }

async function loadAll(){
  try{ const r=await fetch('/admin/config.json?_t='+Date.now()); cfg=await r.json(); }catch(e){ cfg={}; }
  const sl=subBase();
  // Main link + QR use the universal BASE64 format (imports in Hiddify, v2rayNG, Karing, NekoBox).
  // The bare UA-detected link routed sing-box/Clash clients to the external subconverter (blocked
  // in Iran) and broke the main link/QR. The per-app buttons below still derive each app's exact
  // format from `sl` (Clash/sing-box use the worker's native generation).
  const slMain=sl+(sl.includes('?')?'&':'?')+'b64';
  $('sub-link').value=slMain;
  $('qr').innerHTML=''; if(window.QRCode) new QRCode($('qr'),{text:slMain,width:172,height:172,correctLevel:QRCode.CorrectLevel.M});
  // Per Iran tester: Hiddify gets BASE64 (self-contained node list) — the sing-box/Clash
  // formats need the external subconverter, which is blocked/unreliable from inside Iran, so
  // they fail with "unable to determine config format". v2rayNG -> Base64, FlClash -> Clash,
  // sing-box app -> sing-box. (Base64 carries no routing rules; Hiddify applies its own.)
  const sep=sl.includes('?')?'&':'?', slSb=sl+sep+'sb', slClash=sl+sep+'clash', slB64=sl+sep+'b64';
  [['a-h','hiddify://import/'+slB64,slB64],['a-v','v2rayng://install-config?url='+encodeURIComponent(slB64),slB64],['a-c','clash://install-config?url='+encodeURIComponent(slClash),slClash],['a-k','karing://install-config?url='+encodeURIComponent(slClash)+'&name=Nova',slClash],['a-s','sing-box://import-remote-profile?url='+encodeURIComponent(slSb),slSb]]
    .forEach(([id,link,copyUrl])=>{ const el=$(id); if(!el) return; el.href=link;
      el.onclick=()=>{ navigator.clipboard&&navigator.clipboard.writeText(copyUrl); toast(t('app_copied')); }; });
  // Per-app QR (each app's exact-format link) + store links (recommended: Hiddify, Karing).
  const appQR={h:[slB64,'Hiddify'],k:[slClash,'Karing'],v:[slB64,'v2rayNG'],c:[slClash,'FlClash'],s:[slSb,'sing-box']};
  Object.keys(appQR).forEach(k=>{ const el=$('qr-'+k); if(el) el.onclick=()=>showQR(appQR[k][0],appQR[k][1]); });
  // Recommended apps: explicit one-click iOS + Android links (both shown, no guessing).
  const setHref=(id,url)=>{ const el=$(id); if(el) el.href=url; };
  setHref('get-h-ios','https://apps.apple.com/us/app/hiddify-proxy-vpn/id6596777532');
  setHref('get-h-and','https://play.google.com/store/apps/details?id=app.hiddify.com');
  setHref('get-k-ios','https://apps.apple.com/us/app/karing/id6472431552');
  setHref('get-k-and','https://github.com/KaringX/karing/releases');
  setHref('get-v-and','https://github.com/2dust/v2rayNG/releases');
  setHref('get-c-and','https://github.com/chen08209/FlClash/releases');
  setHref('get-s-ios','https://apps.apple.com/us/app/sing-box-vt/id6673731168');
  setHref('get-s-and','https://github.com/SagerNet/sing-box/releases');
  renderSubCards(); renderPortCards();
  const osg=cfg.optimizedSubGeneration||{};
  $('f-subname').value=osg.SUBNAME||''; $('f-subint').value=osg.SUBUpdateTime||3;
  setTg('t-portspread',cfg.portSpread===true); setTg('t-multitrans',cfg.multiTransportSub===true);
  $('f-subapi').value=(cfg.subConverterConfig&&cfg.subConverterConfig.SUBAPI)||'';
  if($('t-notice')){ $('t-notice').classList.add('on'); $('t-notice').style.opacity='.6'; $('t-notice').style.pointerEvents='none'; } // forced always-on
  if($('f-noticetext')) $('f-noticetext').value='🎁 Free service — novaproxy.online | سرویس رایگان نوا'; // fixed
  // Default the Smart IP API to Nova's shared per-ISP database so users get it out of the box.
  $('f-poolapi').value=cfg.POOL_API||'https://nova-deploy.pages.dev/api/pool';
  const pool=osg.localIPPool||{}; $('f-rcount').value=pool.randomCount||16; $('f-rport').value=pool.specifiedPorts!=null?pool.specifiedPorts:-1;
  if(cfg.POOL_API) ipMode='smart'; else if(pool.randomIP===false) ipMode='custom'; else ipMode='random';
  applyIpMode();
  try{ const a=await fetch('/admin/ADD.txt?_t='+Date.now()); const txt=await a.text(); $('f-add').value=(txt==='null'?'':txt); }catch(e){}
  $('f-proto').value=(cfg.multiProtocolSub===true)?'all':(cfg.protocolType||'vless'); $('f-trans').value=cfg.transportProtocol||'ws';
  $('f-fp').value=cfg.Fingerprint||'chrome'; $('f-frag').value=cfg.tlsFragment||'';
  if($('f-path'))$('f-path').value=cfg.PATH||'/'; if($('f-grpcmode'))$('f-grpcmode').value=cfg.gRPCmode||'gun';
  const fpr=cfg.fragmentParams||{}; if($('f-frag-len'))$('f-frag-len').value=fpr.length||''; if($('f-frag-int'))$('f-frag-int').value=fpr.interval||''; if($('f-frag-pkt'))$('f-frag-pkt').value=fpr.packets||'';
  if($('frag-custom-box')) $('frag-custom-box').style.display=cfg.tlsFragment==='custom'?'block':'none';
  const ech=cfg.ECHConfig||{}; if($('f-ech-sni'))$('f-ech-sni').value=ech.SNI||''; if($('f-ech-dns'))$('f-ech-dns').value=ech.DNS||'';
  if($('f-central'))$('f-central').value=cfg.centralApi||'';
  { const mir=cfg.mirror||{}; setTg('t-mirror',mir.enabled===true); if($('f-gh-repo'))$('f-gh-repo').value=mir.repo||''; if($('f-gh-branch'))$('f-gh-branch').value=mir.branch||'main'; if($('f-gh-path'))$('f-gh-path').value=mir.pathPrefix||''; if($('f-gh-token'))$('f-gh-token').placeholder=mir.token?'•••••••• (saved)':'ghp_...'; }
  loadBanner();
  $('f-proxyip').value=(cfg.proxy&&cfg.proxy.PROXYIP)||cfg.PROXYIP||'';
  if($('f-chainproxy'))$('f-chainproxy').value=cfg.chainProxy||'';
  if($('f-subcfg')) $('f-subcfg').value=(cfg.subConverterConfig&&cfg.subConverterConfig.SUBCONFIG)||'';
  if($('f-uuid')) $('f-uuid').value=cfg.UUID||'';
  if($('f-hosts')) $('f-hosts').value=(Array.isArray(cfg.HOSTS)?cfg.HOSTS:[]).join('\n');
  $('t-tls').classList.toggle('on',cfg.enableTLS!==false);
  $('t-ech').classList.toggle('on',!!cfg.ECH); $('t-0rtt').classList.toggle('on',!!cfg.enable0RTT);
  $('t-rp').classList.toggle('on',!!cfg.randomPath); $('t-scv').classList.toggle('on',!!cfg.skipCertVerify);
  loadStatus();
}
function detectApp(ua){ ua=(ua||'').toLowerCase(); if(!ua||ua==='null') return '—';
  if(ua.includes('hiddify')) return 'Hiddify'; if(ua.includes('mahsa')) return 'MahsaNG';
  if(ua.includes('clash')||ua.includes('mihomo')||ua.includes('meta')) return 'Clash/Mihomo';
  if(ua.includes('sing-box')||ua.includes('sfa')||ua.includes('sfi')) return 'sing-box';
  if(ua.includes('v2ray')) return 'v2rayNG'; if(ua.includes('nekobox')||ua.includes('nekoray')) return 'NekoBox';
  if(ua.includes('streisand')) return 'Streisand';
  if(ua.includes('mozilla')||ua.includes('chrome')||ua.includes('safari')||ua.includes('firefox')) return 'Browser';
  return (ua.split('/')[0]||'—').slice(0,16); }
// Turn a 2-letter ISO country code into its flag emoji (e.g. "DE" -> 🇩🇪).
function flagOf(cc){ cc=(cc||'').toUpperCase(); if(!/^[A-Z]{2}$/.test(cc)) return ''; return String.fromCodePoint(...[...cc].map(c=>0x1F1E6+c.charCodeAt(0)-65)); }
function setNetPill(j){
  const ph=$('pill-host'); if(!ph) return;
  if(!j){ ph.textContent=(lang==='fa'?'در حال بررسی…':'Checking…'); return; }
  const cc=(j.country||'').toUpperCase(), flag=flagOf(cc);
  const parts=[]; if(cc) parts.push(cc); if(j.colo) parts.push(j.colo);
  ph.textContent=(flag?flag+' ':'')+(parts.join(' · ')||(lang==='fa'?'نامشخص':'Unknown'));
  const pill=$('pill-net'); if(pill){ const det=[]; if(j.asOrganization) det.push(j.asOrganization); if(j.asn) det.push('AS'+j.asn); if(j.city) det.push(j.city); if(j.colo) det.push((lang==='fa'?'دیتاسنتر ':'datacenter ')+j.colo);
    pill.title=(lang==='fa'?'شبکهٔ شما':'Your network')+(det.length?': '+det.join(' · '):''); }
}
async function loadStatus(){
  setNetPill(null);
  try{ const r=await fetch('/admin/system.json?_t='+Date.now()); const j=await r.json();
    setNetPill(j);
    const netTxt=(j.country||j.colo||'?'); const flag=flagOf(j.country); $('st-net').textContent=(flag?flag+' ':'')+netTxt; $('st-net').title=(j.asOrganization?j.asOrganization+' · ':'')+(j.asn?'AS'+j.asn+' · ':'')+netTxt+(j.colo?' · '+j.colo:'');
    $('st-kv').textContent=j.kvConnected? t('connected') : t('notconn');
    const appEl=$('st-app'); if(appEl){ const u=(cfg&&cfg.CF&&cfg.CF.Usage)||{}; if(u&&u.success&&u.total!=null){ appEl.textContent=nf(u.total)+' / '+nf(u.max||100000); appEl.title='Worker requests today / daily free limit (Cloudflare)'; } else { appEl.innerHTML='<a href="#" id="st-app-setup" style="color:var(--ac);font-weight:600;font-size:13px;text-decoration:none">'+(lang==='fa'?'افزودن توکن ⟵':'Add CF token →')+'</a>'; appEl.title=(lang==='fa'?'برای نمایش مصرف ورکر، در «اعلان‌ها» Account ID و توکن Cloudflare را وارد کنید':'Add your Cloudflare Account ID + token in Notifications to show worker usage'); const su=$('st-app-setup'); if(su) su.onclick=(e)=>{ e.preventDefault(); const n=document.querySelector('#nav [data-p="notif"]'); if(n) n.click(); }; } }
    const tag=document.querySelector('.brand .tag'); if(tag){ tag.textContent='Panel v'+PANEL_VERSION+(j.version?' · w'+j.version:''); tag.title='Nova dashboard v'+PANEL_VERSION+(j.version?' · worker '+j.version:'')+(j.instanceId?' · instance '+j.instanceId:''); }
    // Traffic today only (free plan resets every 24h) — comes from system.json (1 KV read), so
    // no extra request and none of the heavy month/year aggregation.
    const tEl=$('st-traffic'); if(tEl){ const tu=j.todayUsage||{}; tEl.innerHTML='<span class="udl">↓ '+uFmtBytes(tu.down||0)+'</span><span class="uul">↑ '+uFmtBytes(tu.up||0)+'</span>'; }
    const pd=$('pill-dot'); if(pd) pd.className='dot'+(j.kvConnected?' ok':''); }catch(e){ const tEl=$('st-traffic'); if(tEl) tEl.textContent='-'; const ph=$('pill-host'); if(ph) ph.textContent=location.host; const pd=$('pill-dot'); if(pd) pd.className='dot'; const sn=$('st-net'); if(sn&&sn.textContent==='…') sn.textContent='-'; }
  // Only today's traffic is shown (above). The heavy month/year/all-time aggregation and the
  // daily chart were removed — too costly for the free plan. Per-user usage is under Users.
  renderIranReport();
}
// Daily traffic chart removed: it called /admin/usage-data (a KV-heavy endpoint) on every
// dashboard load, which starved the free-plan worker. The Today/Month/Year/All totals remain.
async function saveConfig(){ const r=await fetch('/admin/config.json',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(cfg)});
  if(r.ok) toast(t('saved')); else toast(t('saveerr'),1); return r.ok; }

$('save-sub').onclick=async()=>{ cfg.optimizedSubGeneration=cfg.optimizedSubGeneration||{};
  cfg.optimizedSubGeneration.SUBNAME=$('f-subname').value; cfg.optimizedSubGeneration.SUBUpdateTime=Number($('f-subint').value)||3;
  cfg.portSpread=getTg('t-portspread');
  cfg.multiTransportSub=getTg('t-multitrans');
  delete cfg.paidPlan; // removed: not read by the worker
  cfg.subConverterConfig=cfg.subConverterConfig||{}; cfg.subConverterConfig.SUBAPI=$('f-subapi').value.trim();
  if($('f-subcfg')) cfg.subConverterConfig.SUBCONFIG=$('f-subcfg').value.trim();
  cfg.freeNotice=true; /* free-service notice + its text are fixed (not editable) */ await saveConfig(); };
// preset dropdowns fill their input
if($('f-proxyip-sel')) $('f-proxyip-sel').onchange=function(){ if(this.value) $('f-proxyip').value=this.value; };
if($('f-subcfg-sel')) $('f-subcfg-sel').onchange=function(){ if(this.value) $('f-subcfg').value=this.value; };
$('save-ip').onclick=async()=>{ cfg.optimizedSubGeneration=cfg.optimizedSubGeneration||{}; cfg.optimizedSubGeneration.local=true;
  cfg.optimizedSubGeneration.localIPPool=cfg.optimizedSubGeneration.localIPPool||{}; const p=cfg.optimizedSubGeneration.localIPPool;
  if(ipMode==='smart'){ cfg.POOL_API=$('f-poolapi').value.trim(); p.randomIP=false; }
  else if(ipMode==='custom'){ cfg.POOL_API=''; p.randomIP=false; await fetch('/admin/ADD.txt',{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:$('f-add').value}); }
  else { cfg.POOL_API=''; p.randomIP=true; p.randomCount=Number($('f-rcount').value)||16; p.specifiedPorts=Number($('f-rport').value); }
  await saveConfig(); };
$('save-set').onclick=async()=>{ { const _p=$('f-proto').value; if(_p==='all'){ cfg.multiProtocolSub=true; if(!cfg.protocolType||cfg.protocolType==='all') cfg.protocolType='vless'; } else { cfg.multiProtocolSub=false; cfg.protocolType=_p; } } cfg.transportProtocol=$('f-trans').value;
  cfg.Fingerprint=$('f-fp').value; cfg.tlsFragment=$('f-frag').value||null; cfg.proxy=cfg.proxy||{}; cfg.proxy.PROXYIP=$('f-proxyip').value.trim(); cfg.chainProxy=($('f-chainproxy')?$('f-chainproxy').value.trim():'');
  if($('f-path')){ let _pa=$('f-path').value.trim()||'/'; if(!_pa.startsWith('/'))_pa='/'+_pa; cfg.PATH=_pa; } if($('f-grpcmode'))cfg.gRPCmode=$('f-grpcmode').value;
  cfg.enableTLS=$('t-tls').classList.contains('on');
  cfg.ECH=$('t-ech').classList.contains('on'); cfg.enable0RTT=$('t-0rtt').classList.contains('on');
  cfg.randomPath=$('t-rp').classList.contains('on'); cfg.skipCertVerify=$('t-scv').classList.contains('on');
  if($('f-hosts')){ const hosts=$('f-hosts').value.split('\n').map(s=>s.trim().toLowerCase().replace(/^https?:\/\//,'').split('/')[0].split(':')[0]).filter(Boolean); if(hosts.length) cfg.HOSTS=hosts; }
  // advanced (one Save covers the whole Settings page)
  cfg.fragmentParams={ length:($('f-frag-len')?$('f-frag-len').value.trim():''), interval:($('f-frag-int')?$('f-frag-int').value.trim():''), packets:($('f-frag-pkt')?$('f-frag-pkt').value.trim():'') };
  cfg.centralApi=($('f-central')?$('f-central').value.trim():'');
  // removed UI for these — worker never read them; strip stale values from saved config
  delete cfg.customHost; delete cfg.customSNI; delete cfg.fallbackSub; delete cfg.includePublicNodes;
  cfg.ECHConfig=cfg.ECHConfig||{}; if($('f-ech-sni'))cfg.ECHConfig.SNI=$('f-ech-sni').value.trim()||'cloudflare-ech.com'; if($('f-ech-dns'))cfg.ECHConfig.DNS=$('f-ech-dns').value.trim()||'https://dns.alidns.com/dns-query';
  cfg.mirror=cfg.mirror||{}; cfg.mirror.enabled=$('t-mirror')?$('t-mirror').classList.contains('on'):false; cfg.mirror.repo=($('f-gh-repo')?$('f-gh-repo').value.trim():''); cfg.mirror.branch=($('f-gh-branch')?$('f-gh-branch').value.trim()||'main':'main'); cfg.mirror.pathPrefix=($('f-gh-path')?$('f-gh-path').value.trim():''); if($('f-gh-token')&&$('f-gh-token').value.trim()){ cfg.mirror.token=$('f-gh-token').value.trim(); $('f-gh-token').value=''; }
  await saveConfig(); };
if($('hosts-check')) $('hosts-check').onclick=async()=>{ const st=$('hosts-health'); st.textContent=lang==='fa'?'در حال بررسی…':'Checking…'; try{ const r=await fetch('/admin/domains?check=1'); const j=await r.json().catch(()=>null); const arr=(j&&j.health&&Array.isArray(j.health.domains))?j.health.domains:[]; if(Array.isArray(arr)&&arr.length){ st.innerHTML=arr.map(d=>`${d.ok?'🟢':'🔴'} ${d.host||d}`).join('&nbsp;&nbsp;'); } else { st.textContent=lang==='fa'?'دامنه‌ای برای بررسی نبود':'no domains to check'; } }catch(e){ st.textContent='⚠️ '+e.message; } };
if($('mirror-publish')) $('mirror-publish').onclick=async()=>{ const st=$('mirror-status'); st.textContent=lang==='fa'?'در حال ذخیره و انتشار…':'Saving & publishing…'; try{ await saveConfig(); const r=await fetch('/admin/publish-mirror',{method:'POST'}); const j=await r.json().catch(()=>({})); st.textContent = r.ok ? (lang==='fa'?'✅ منتشر شد':'✅ Published') : ('⚠️ '+(j.reason||('HTTP '+r.status))); }catch(e){ st.textContent='⚠️ '+e.message; } };
if($('chain-test')) $('chain-test').onclick=async()=>{ const st=$('chain-status'); const v=($('f-chainproxy')?$('f-chainproxy').value.trim():''); const m=/^(socks5|http|https|turn|sstp):\/\/(.+)$/i.exec(v); if(!m){ st.textContent=lang==='fa'?'ابتدا یک پراکسی معتبر وارد کنید (مثل socks5://...)':'enter a valid proxy first (e.g. socks5://...)'; return; } st.textContent=lang==='fa'?'در حال تست…':'Testing…'; try{ const r=await fetch('/admin/check?'+m[1].toLowerCase()+'='+encodeURIComponent(m[2].split('/')[0])); const j=await r.json().catch(()=>({})); if(r.ok&&(j.success!==false)){ const ms=j.latency||j.ms||j.time; st.textContent=(lang==='fa'?'✅ سالم':'✅ Works')+(ms?` (${ms}ms)`:''); } else { st.textContent='⚠️ '+(j.error||j.msg||('HTTP '+r.status)); } }catch(e){ st.textContent='⚠️ '+e.message; } };
// show custom fragment fields only when "Custom" is selected
if($('f-frag')) $('f-frag').addEventListener('change',function(){ const b=$('frag-custom-box'); if(b) b.style.display=this.value==='custom'?'block':'none'; });
// Iran fragment presets: switch to Custom and fill the length/interval/packets fields.
document.querySelectorAll('.frag-preset').forEach(b=>b.onclick=()=>{
  if($('f-frag')){ $('f-frag').value='custom'; } const box=$('frag-custom-box'); if(box) box.style.display='block';
  if($('f-frag-pkt')) $('f-frag-pkt').value=b.dataset.pkt||''; if($('f-frag-len')) $('f-frag-len').value=b.dataset.len||''; if($('f-frag-int')) $('f-frag-int').value=b.dataset.int||'';
  toast(lang==='fa'?'مقادیر اعمال شد — ذخیره را بزنید':'Filled — press Save');
});
// Quick-add a starter set of clean Cloudflare IPs into the custom-IP box (the per-ISP Smart
// pool is still better; this is just a manual starting point / scanner seed).
if($('add-clean-ips')) $('add-clean-ips').onclick=()=>{
  const seed=['104.16.132.229:443#clean-1','104.17.147.22:443#clean-2','104.18.39.218:443#clean-3','141.101.120.1:443#clean-4','162.159.152.4:443#clean-5'].join('\n');
  const ta=$('f-add'); if(!ta) return; ta.value=(ta.value.trim()?ta.value.replace(/\n*$/,'\n'):'')+seed+'\n';
  toast(lang==='fa'?'آی‌پی‌های نمونه اضافه شد — ذخیره را بزنید':'Sample IPs added — press Save');
};
$('cp').onclick=()=>copyText($('sub-link').value);
if($('uuid-copy')) $('uuid-copy').onclick=()=>copyText($('f-uuid').value);

// --- Online optimization: browser-side Cloudflare IP scan ---
const CF_RANGES=[['104.16.',0,255],['104.17.',0,255],['104.18.',0,255],['104.19.',0,255],['104.20.',0,255],['104.21.',0,255],['104.22.',0,255],['104.24.',0,255],['104.25.',0,255],['104.26.',0,255],['104.27.',0,255],['162.159.',0,255],['172.64.',0,255],['172.66.',0,255],['172.67.',0,255],['188.114.',96,111],['141.101.',64,127]];
function randCfIp(){ const r=CF_RANGES[Math.floor(Math.random()*CF_RANGES.length)]; const c=r[1]+Math.floor(Math.random()*(r[2]-r[1]+1)); return r[0]+c+'.'+Math.floor(Math.random()*256); }
function nova5(){ const a='abcdefghijklmnopqrstuvwxyz0123456789'; let s=''; for(let i=0;i<5;i++) s+=a[Math.floor(Math.random()*36)]; return s; }
function pingIp(ip,port,timeout){ return new Promise(res=>{ const t0=performance.now(); let done=false; const img=new Image();
  const fin=ok=>{ if(done)return; done=true; img.onerror=img.onload=null; res(ok?Math.round(performance.now()-t0):null); };
  const timer=setTimeout(()=>fin(false),timeout);
  img.onerror=()=>{ clearTimeout(timer); fin(true); }; img.onload=()=>{ clearTimeout(timer); fin(true); };
  img.src='https://'+(port==443?ip:ip+':'+port)+'/cdn-cgi/trace?'+Math.random(); }); }
let scanResults=[];
async function startScan(onProg){
  const port=Number($('sc-port').value)||443, keep=Math.max(1,Number($('sc-keep').value)||10), total=Math.min(400,Math.max(10,Number($('sc-total').value)||120)), timeout=2000;
  const src=($('sc-src')&&$('sc-src').value)||'random';
  const btn=$('sc-start'); btn.disabled=true; $('sc-use').style.display='none'; $('sc-results').innerHTML=''; scanResults=[];
  let ips=[]; const seen=new Set();
  if(src==='random'){ while(ips.length<total){ const ip=randCfIp(); if(!seen.has(ip)){ seen.add(ip); ips.push(ip); } } }
  else {
    // Pull candidate IPs from a Nova radar source, then latency-test them in the browser.
    $('sc-prog').textContent=t('scan_loading'); if(onProg) onProg({phase:'load'});
    try{ const r=await fetch('/admin/bestip?loadIPs='+encodeURIComponent(src)+'&port='+port+'&_t='+Date.now()); const d=await r.json();
      for(const x of ((d&&d.ips)||[])){ const ip=String(x).split('#')[0].split(':')[0].trim(); if(/^\d+\.\d+\.\d+\.\d+$/.test(ip)&&!seen.has(ip)){ seen.add(ip); ips.push(ip); } }
    }catch(e){}
    ips.sort(()=>Math.random()-0.5); if(ips.length>total) ips=ips.slice(0,total);
    if(!ips.length){ $('sc-prog').textContent=t('scan_none'); if(onProg) onProg({phase:'none'}); btn.disabled=false; return; }
  }
  const totalN=ips.length;
  let tested=0, alive=[]; const conc=12, probes=3;
  if(onProg) onProg({phase:'scan',tested:0,total:totalN,found:0});
  async function worker(){ while(ips.length){ const ip=ips.pop(); const samples=[]; for(let i=0;i<probes;i++){ const ms=await pingIp(ip,port,timeout); if(ms!=null) samples.push(ms); } tested++;
    if(samples.length){ const avg=Math.round(samples.reduce((a,b)=>a+b,0)/samples.length); const jitter=Math.round(Math.max(...samples)-Math.min(...samples)); const loss=Math.round((1-samples.length/probes)*100); const score=avg+jitter*0.5+loss*20; alive.push({ip,port,ms:avg,jitter,loss,score}); }
    $('sc-prog').textContent=t('scan_scanning').replace('{n}',tested).replace('{t}',totalN).replace('{f}',alive.length); if(onProg) onProg({phase:'scan',tested,total:totalN,found:alive.length}); } }
  await Promise.all(Array.from({length:conc},worker));
  alive.sort((a,b)=>a.score-b.score); scanResults=alive.slice(0,keep);
  if(!scanResults.length){ $('sc-prog').textContent=t('scan_none'); if(onProg) onProg({phase:'none'}); btn.disabled=false; return; }
  if(onProg) onProg({phase:'done',found:scanResults.length});
  $('sc-prog').textContent=t('scan_done').replace('{f}',scanResults.length);
  $('sc-results').innerHTML='<table class="logt"><tr><th>#</th><th>IP</th><th>'+t('scan_lat')+'</th><th>'+t('scan_jit')+'</th><th>'+t('scan_loss')+'</th></tr>'+scanResults.map((r,i)=>'<tr><td>'+(i+1)+'</td><td><code>'+r.ip+':'+r.port+'</code></td><td>'+r.ms+' ms</td><td>'+(r.jitter||0)+' ms</td><td>'+(r.loss||0)+'%</td></tr>').join('')+'</table>';
  $('sc-use').style.display='inline-flex'; btn.disabled=false;
}
if($('sc-start')) $('sc-start').onclick=startScan;
if($('sc-use')) $('sc-use').onclick=async()=>{
  if(!scanResults.length) return;
  const lines=scanResults.map(r=>r.ip+':'+r.port+'#Nova-'+nova5());
  const cur=$('f-add').value.trim(); $('f-add').value=(cur?cur+'\n':'')+lines.join('\n');
  ipMode='custom'; document.querySelectorAll('#ipseg button').forEach(b=>b.classList.toggle('on',b.dataset.m==='custom'));
  $('m-smart-box').style.display='none'; $('m-custom-box').style.display='block'; $('m-random-box').style.display='none';
  toast(t('scan_added'));
};

// --- Settings: multiple HOSTs ---
if($('save-hosts')) $('save-hosts').onclick=async()=>{
  const hosts=$('f-hosts').value.split('\n').map(s=>s.trim().toLowerCase().replace(/^https?:\/\//,'').split('/')[0].split(':')[0]).filter(Boolean);
  cfg.HOSTS = hosts.length?hosts:cfg.HOSTS; await saveConfig();
};

// --- Notifications: worker usage + CF creds + Telegram ---
const LOGTYPES={ en:{Get_SUB:'Subscription fetch',Get_Best_SUB:'Optimized sub',Init_Config:'Reset settings',Save_Config:'Save settings',Save_Custom_IPs:'Save custom IPs',Save_Network_Settings:'Save network',Admin_Login:'Panel login',Register_WARP:'WARP register',WARP_License:'WARP+ license'},
  fa:{Get_SUB:'دریافت اشتراک',Get_Best_SUB:'اشتراک بهینه',Init_Config:'بازنشانی تنظیمات',Save_Config:'ذخیره تنظیمات',Save_Custom_IPs:'ذخیره IP سفارشی',Save_Network_Settings:'ذخیره شبکه',Admin_Login:'ورود به پنل',Register_WARP:'ثبت WARP',WARP_License:'لایسنس WARP+'} };
function loadNotif(){ const u=(cfg&&cfg.CF&&cfg.CF.Usage)||{}; const total=u.total!=null?u.total:(u.success?0:null); const max=u.max||100000;
  const nf=n=>Number(n||0).toLocaleString(lang==='fa'?'fa-IR':'en-US');
  $('u-total').textContent=total!=null?nf(total):'-'; $('u-max').textContent=nf(max);
  const pct=total!=null?Math.min(100,(total/max)*100):0;
  const bar=$('u-bar'); if(bar){ bar.style.width=pct+'%'; bar.style.background=pct<50?'#16a34a':pct<75?'#eab308':pct<90?'#f59e0b':'#ef4444'; }
  // repopulate saved credentials so they don't look empty after navigating away
  const cf=(cfg&&cfg.CF)||{}; if($('cf-accid')&&cf.AccountID) $('cf-accid').value=cf.AccountID; if($('cf-token')&&cf.APIToken) $('cf-token').value=cf.APIToken;
  const tg=(cfg&&cfg.TG)||{}; if($('tg-bot')&&tg.BotToken) $('tg-bot').value=tg.BotToken; if($('tg-chat')&&tg.ChatID) $('tg-chat').value=tg.ChatID;
  setTg('t-tg', tg.enabled);
}
if($('save-cf')) $('save-cf').onclick=async()=>{ const AccountID=$('cf-accid').value.trim(), APIToken=$('cf-token').value.trim();
  if(!AccountID||!APIToken){ toast(t('saveerr'),1); return; }
  try{ const r=await fetch('/admin/cf.json',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({AccountID,APIToken})});
    if(r.ok){ cfg.CF=cfg.CF||{}; cfg.CF.AccountID=AccountID; cfg.CF.APIToken=APIToken; toast(t('saved')); } else toast(t('saveerr'),1); }catch(e){ toast(t('saveerr'),1); } };
if($('save-tg')) $('save-tg').onclick=async()=>{ const BotToken=$('tg-bot').value.trim(), ChatID=$('tg-chat').value.trim(), en=getTg('t-tg');
  try{
    let wh=null;
    if(BotToken&&ChatID){ const r=await fetch('/admin/tg.json',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({BotToken,ChatID})}); if(!r.ok){ toast(t('saveerr'),1); return; } wh=await r.json().catch(()=>null); }
    cfg.TG=cfg.TG||{}; cfg.TG.enabled=en; cfg.TG.BotToken=BotToken; cfg.TG.ChatID=ChatID; await saveConfig();
    if(wh&&wh.webhookSet===false) toast((lang==='fa'?'ذخیره شد؛ وب‌هوک ناموفق: ':'Saved; webhook failed: ')+(wh.webhookError||''),1);
    else if(wh&&wh.webhookSet) toast(lang==='fa'?'ذخیره و وب‌هوک نصب شد':'Saved & webhook installed');
  }catch(e){ toast(t('saveerr'),1); } };

// --- Logs ---
async function loadManage(){ const box=$('manage-stats'), note=$('manage-note'); if(!box) return; box.innerHTML='<p class="hint">…</p>'; if(note) note.textContent='';
  try{ const r=await fetch('/admin/central/stats?_t='+Date.now()); const d=await r.json();
    if(!d.configured){ box.innerHTML=''; if(note) note.textContent=t('manage_noapi'); return; }
    if(d.error){ box.innerHTML=''; if(note) note.textContent=t('manage_err')+' '+d.error; return; }
    const kv=(k,v)=>'<div class="kv"><div class="k">'+k+'</div><div class="v">'+v+'</div></div>';
    box.innerHTML=kv(t('manage_active'),d.activeInstances!=null?d.activeInstances:'-')+kv(t('manage_total'),d.instances!=null?d.instances:'-')+kv(t('manage_traffic'),d.totalTrafficHuman||'-');
  }catch(e){ box.innerHTML=''; if(note) note.textContent=t('manage_err'); }
}
if($('m-ann-send')) $('m-ann-send').onclick=async()=>{ const body={ title:$('m-ann-title').value.trim(), text:$('m-ann-text').value.trim(), url:$('m-ann-url').value.trim() };
  try{ const r=await fetch('/admin/central/announcement',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
    if(r.ok) toast(t('saved')); else { const d=await r.json().catch(()=>({})); toast(t('saveerr')+(d.error?': '+d.error:''),1); } }catch(e){ toast(t('saveerr'),1); }
};
async function loadLogs(){ const box=$('logs-list'); box.innerHTML='<p class="hint">…</p>';
  try{ const r=await fetch('/admin/log.json?_t='+Date.now()); let rows=await r.json(); if(!Array.isArray(rows)) rows=[];
    if(!rows.length){ box.innerHTML='<p class="hint">'+t('logs_empty')+'</p>'; return; }
    const lt=LOGTYPES[lang]||LOGTYPES.en;
    const head='<tr><th>'+t('log_time')+'</th><th>'+t('log_type')+'</th><th>'+t('log_ip')+'</th><th>'+t('log_loc')+'</th><th>'+t('log_asn')+'</th></tr>';
    const body=rows.slice().reverse().slice(0,200).map(e=>{ const d=new Date(e.TIME||0);
      const ts=isNaN(d)?'-':d.toLocaleString(lang==='fa'?'fa-IR':'en-GB');
      return '<tr><td>'+ts+'</td><td>'+(lt[e.TYPE]||e.TYPE||'-')+'</td><td><code>'+(e.IP||'-')+'</code></td><td>'+((e.CC||'').replace('N/A','')||'-')+'</td><td>'+(e.ASN||'-')+'</td></tr>'; }).join('');
    box.innerHTML='<table class="logt">'+head+body+'</table>';
  }catch(e){ box.innerHTML='<p class="hint">'+t('logs_empty')+'</p>'; }
}
if($('logs-refresh')) $('logs-refresh').onclick=loadLogs;

// --- Network & DNS (worker /admin/network-settings.json) ---
let net=null;
function setTg(id,v){ const el=$(id); if(el) el.classList.toggle('on',!!v); }
function getTg(id){ const el=$(id); return !!(el&&el.classList.contains('on')); }
async function loadNet(){
  try{ const r=await fetch('/admin/network-settings.json?_t='+Date.now()); net=await r.json(); }catch(e){ net={}; }
  setTg('t-routing',net.enableRouting); setTg('t-domestic',net.enableDomesticBypass);
  setTg('t-geoip',net.enableGeoIP); setTg('t-geosite',net.enableGeoSite);
  setTg('t-adblock',net.enableAdBlock); setTg('t-porn',net.enablePornBlock);
  setTg('t-doh',net.enableDoH); setTg('t-antisanc',net.enableAntiSanctionDNS);
  setTg('t-localdns',net.enableLocalDNS); setTg('t-fakedns',net.enableFakeDNS);
  setTg('t-ipv6',net.enableIPv6); setTg('t-lan',net.allowLAN);
  $('n-dohprov').value=net.dohProvider||'cloudflare';
  $('n-antiprov').value=net.antiSanctionDNSProvider||'shekan';
  $('n-anticustom').value=net.antiSanctionCustomDNS||'';
  $('n-localip').value=net.localDNSIP||'8.8.8.8'; $('n-localport').value=net.localDNSPort||'53';
  $('n-fakeip').value=net.fakeDNSIP||'198.51.100.1'; $('n-loglevel').value=net.logLevel||'error';
  $('n-dohurl').value=location.protocol+'//'+location.host+'/dns-query';
  if($('f-customrules')) $('f-customrules').value=net.customRules||'';
  setTg('t-warp',net.enableWarp); $('n-warpmode').value=net.warpMode||'warp';
  setTg('t-warp-amnezia',net.warpAmnezia); if($('n-warpep')) $('n-warpep').value=net.warpEndpoint||'';
  const wn=net.warpNoise||{}; if($('n-warp-nmode'))$('n-warp-nmode').value=wn.mode||''; if($('n-warp-ncount'))$('n-warp-ncount').value=wn.count||''; if($('n-warp-nsize'))$('n-warp-nsize').value=wn.size||''; if($('n-warp-ndelay'))$('n-warp-ndelay').value=wn.delay||'';
  const bc=net.bypassCountries||[]; setTg('t-bp-cn',bc.includes('cn')); setTg('t-bp-ru',bc.includes('ru'));
  const bk=net.blockCategories||[]; setTg('t-bk-quic',bk.includes('quic')); setTg('t-bk-malware',bk.includes('malware')); setTg('t-bk-phishing',bk.includes('phishing')); setTg('t-bk-cryptominers',bk.includes('cryptominers'));
  loadWarpStatus();
}
async function loadWarpStatus(){ const el=$('warp-status'); if(!el) return;
  try{ const r=await fetch('/admin/warp.json?_t='+Date.now()); const w=await r.json();
    if(w&&w.registered){
      let s=t('warp_status_yes')+(w.endpoint?(': '+w.endpoint):'');
      if(w.warpPlus) s+=', '+t('warp_plus');
      if(w.wow&&w.wow.registered) s+=', '+t('warp_wow_yes');
      el.textContent=s; el.style.color='var(--ok)';
      renderWarpConfig(w);
    } else { el.textContent=t('warp_status_none'); el.style.color='var(--mu)'; renderWarpConfig(null); }
  }catch(e){ el.textContent=t('warp_status_none'); el.style.color='var(--mu)'; }
}
// Show a connectable WireGuard config (copy link / copy .conf) so the user actually has a way
// to connect after registering — previously registration succeeded but gave them nothing.
function renderWarpConfig(w){
  let box=$('warp-conf-box');
  if(!box){ const anchor=$('warp-status'); if(!anchor||!anchor.parentNode) return;
    box=document.createElement('div'); box.id='warp-conf-box'; box.style.marginTop='10px';
    anchor.parentNode.parentNode.appendChild(box); }
  if(!w||!w.node){ box.innerHTML=''; return; }
  const fa=lang==='fa';
  const eps=Array.isArray(w.suggestedEndpoints)?w.suggestedEndpoints:[];
  const cur=w.endpoint||'';
  // Endpoint picker — the #1 reason a WARP config "registers fine but never connects" inside
  // Iran is the default engage.cloudflareclient.com:2408 being filtered. Any WARP edge IP/port
  // accepts the same key, so let the user one-tap a different endpoint until one connects.
  const chips=eps.map(ep=>'<button class="b g warp-ep-chip" data-ep="'+ep.replace(/"/g,'&quot;')+'" style="flex:0 0 auto;width:auto;padding:6px 11px;font-size:12px'+(ep===cur?';border-color:var(--ac);color:var(--ac)':'')+'">'+ep+'</button>').join('');
  box.innerHTML='<div class="row" style="gap:8px;flex-wrap:wrap">'
    +'<button class="b" id="warp-copy-node" style="flex:0 0 auto;width:auto;padding:9px 16px">'+(fa?'کپی لینک WireGuard':'Copy WireGuard link')+'</button>'
    +'<button class="b" id="warp-copy-conf" style="flex:0 0 auto;width:auto;padding:9px 16px">'+(fa?'کپی فایل .conf':'Copy .conf')+'</button></div>'
    +'<div class="hint" style="margin-top:6px">'+(fa?'این کانفیگ را در Hiddify / sing-box / WireGuard وارد کنید.':'Import this into Hiddify / sing-box / WireGuard.')+'</div>'
    +'<div class="hint" style="margin-top:10px;font-weight:600">'+(fa?'اندپوینت فعلی: ':'Current endpoint: ')+'<code>'+cur+'</code>'+(w.endpointOverridden?(fa?' (سفارشی)':' (custom)'):'')+'</div>'
    +'<div class="hint" style="margin:4px 0 6px">'+(fa?'اگر وصل نشد، یک اندپوینت دیگر را امتحان کنید (همه با همین حساب کار می‌کنند):':'If it won\'t connect, try another endpoint (all work with the same account):')+'</div>'
    +'<div class="row" id="warp-ep-chips" style="gap:6px;flex-wrap:wrap">'+chips+'</div>'
    +'<div class="hint" style="margin-top:8px">'+(fa?'برای ایران: اگر هیچ‌کدام وصل نشد، با یک «WARP scanner» یک IP:پورت سالم پیدا کنید و در فیلد «اندپوینت WARP» بالا وارد و ذخیره کنید.':'For Iran: if none connect, find a working IP:port with a "WARP scanner" and paste it into the "WARP endpoint" field above, then Save.')+'</div>';
  const cn=$('warp-copy-node'); if(cn) cn.onclick=()=>{ navigator.clipboard&&navigator.clipboard.writeText(w.node); toast(t('copied')); };
  const cc=$('warp-copy-conf'); if(cc) cc.onclick=()=>{ navigator.clipboard&&navigator.clipboard.writeText(w.conf||w.node); toast(t('copied')); };
  box.querySelectorAll('.warp-ep-chip').forEach(b=>b.onclick=async()=>{
    const ep=b.dataset.ep; if($('n-warpep')) $('n-warpep').value=ep;
    box.querySelectorAll('.warp-ep-chip').forEach(x=>x.disabled=true);
    try{ await $('save-net').onclick(); }catch(e){}
    setTimeout(loadWarpStatus,400); // re-fetch so the config rebuilds with the new endpoint
  });
}
if($('warp-reg')) $('warp-reg').onclick=async()=>{ const btn=$('warp-reg'), el=$('warp-status');
  el.textContent=t('warp_registering'); el.style.color='var(--mu)'; btn.disabled=true;
  try{ const wow=$('n-warpmode').value==='wow';
    const r=await fetch('/admin/warp.json',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({wow})}); const w=await r.json();
    if(r.ok&&w&&w.registered){ toast(t('warp_reg_ok')); loadWarpStatus(); }
    else { toast(t('warp_reg_fail'),1); el.textContent=t('warp_status_none'); }
  }catch(e){ toast(t('warp_reg_fail'),1); }
  finally{ btn.disabled=false; }
};
if($('warp-central-btn')) $('warp-central-btn').onclick=async()=>{ const btn=$('warp-central-btn'), el=$('warp-status');
  el.textContent=t('warp_applying'); el.style.color='var(--mu)'; btn.disabled=true;
  try{ const r=await fetch('/admin/warp.json',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({fromCentral:true})}); const w=await r.json();
    if(r.ok&&w&&w.warpPlus){ toast(t('warp_lic_ok')); loadWarpStatus(); }
    else { toast((w&&w.error)?('WARP+: '+w.error):t('warp_lic_fail'),1); loadWarpStatus(); }
  }catch(e){ toast(t('warp_lic_fail'),1); }
  finally{ btn.disabled=false; }
};
if($('warp-lic-btn')) $('warp-lic-btn').onclick=async()=>{ const btn=$('warp-lic-btn'), el=$('warp-status'), lic=$('n-warplic').value.trim();
  if(!lic){ return; } el.textContent=t('warp_applying'); el.style.color='var(--mu)'; btn.disabled=true;
  try{ const r=await fetch('/admin/warp.json',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({license:lic})}); const w=await r.json();
    if(r.ok&&w&&w.warpPlus){ toast(t('warp_lic_ok')); $('n-warplic').value=''; loadWarpStatus(); }
    else { toast((w&&w.error)?('WARP+: '+w.error):t('warp_lic_fail'),1); loadWarpStatus(); }
  }catch(e){ toast(t('warp_lic_fail'),1); }
  finally{ btn.disabled=false; }
};
if($('cr-add')) $('cr-add').onclick=()=>{
  const type=$('cr-type').value, val=$('cr-val').value.trim(), out=$('cr-out').value;
  if(!val){ toast(lang==='fa'?'مقدار را وارد کنید':'Enter a value',1); return; }
  let line=type+','+val+','+out;
  if((type==='IP-CIDR'||type==='IP-CIDR6'||type==='GEOIP')&&out!=='REJECT') line+=',no-resolve';
  const ta=$('f-customrules'); if(!ta) return; const cur=ta.value.trim();
  ta.value=(cur?cur+'\n':'')+line; $('cr-val').value='';
  toast(lang==='fa'?'افزوده شد — ذخیره را بزنید':'Added — press Save');
};
$('save-net').onclick=async()=>{
  const body={
    enableRouting:getTg('t-routing'), enableDomesticBypass:getTg('t-domestic'),
    enableGeoIP:getTg('t-geoip'), enableGeoSite:getTg('t-geosite'),
    enableAdBlock:getTg('t-adblock'), enablePornBlock:getTg('t-porn'),
    enableDoH:getTg('t-doh'), dohProvider:$('n-dohprov').value,
    enableAntiSanctionDNS:getTg('t-antisanc'), antiSanctionDNSProvider:$('n-antiprov').value, antiSanctionCustomDNS:$('n-anticustom').value.trim(),
    enableLocalDNS:getTg('t-localdns'), localDNSIP:$('n-localip').value.trim()||'8.8.8.8', localDNSPort:$('n-localport').value.trim()||'53',
    enableFakeDNS:getTg('t-fakedns'), fakeDNSIP:$('n-fakeip').value.trim()||'198.51.100.1',
    enableIPv6:getTg('t-ipv6'), allowLAN:getTg('t-lan'), logLevel:$('n-loglevel').value,
    enableWarp:getTg('t-warp'), warpMode:$('n-warpmode').value,
    warpEndpoint:($('n-warpep')?$('n-warpep').value.trim():''), warpAmnezia:getTg('t-warp-amnezia'),
    customRules:($('f-customrules')?$('f-customrules').value:''),
    bypassCountries:[['cn','t-bp-cn'],['ru','t-bp-ru']].filter(([,id])=>getTg(id)).map(([c])=>c),
    blockCategories:[['quic','t-bk-quic'],['malware','t-bk-malware'],['phishing','t-bk-phishing'],['cryptominers','t-bk-cryptominers']].filter(([,id])=>getTg(id)).map(([c])=>c),
    warpNoise:{ mode:($('n-warp-nmode')?$('n-warp-nmode').value:''), count:($('n-warp-ncount')?$('n-warp-ncount').value.trim():''), size:($('n-warp-nsize')?$('n-warp-nsize').value.trim():''), delay:($('n-warp-ndelay')?$('n-warp-ndelay').value.trim():'') }
  };
  try{ const r=await fetch('/admin/network-settings.json',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
    if(r.ok){ net=body; toast(t('saved')); } else toast(t('saveerr'),1); }catch(e){ toast(t('saveerr'),1); }
};
$('copy-doh').onclick=()=>copyText($('n-dohurl').value);
if($('save-rules')) $('save-rules').onclick=()=>$('save-net').onclick();
if($('save-preset')) $('save-preset').onclick=()=>$('save-net').onclick();

async function renderISP(){ const box=$('isp-list'); const api=(cfg&&cfg.POOL_API)||$('f-poolapi').value.trim();
  if(!api){ box.innerHTML='<p class="hint">'+t('isp_noapi')+'</p>'; return; }
  box.innerHTML=ISPS.map(s=>'<div class="isp-row"><div><div class="nm">'+(lang==='fa'?s.fa:s.name)+'</div><div class="asn">AS'+s.asn+'</div></div><span class="badge" id="b-'+s.asn+'">…</span></div>').join('');
  ISPS.forEach(async s=>{ try{ const r=await fetch(api+(api.includes('?')?'&':'?')+'asn='+s.asn); const j=await r.json(); const n=j.count||0;
    const b=$('b-'+s.asn); if(b){ b.textContent=n+(lang==='fa'?' آی‌پی':' IPs'); b.className='badge'+(n>0?' has':''); } }catch(e){ const b=$('b-'+s.asn); if(b)b.textContent='-'; } }); }
$('isp-refresh').onclick=renderISP;

applyTheme(); applyLang(); loadAll();

// ---- PWA install hint (iOS: Add to Home Screen; Android: install prompt) ----
(function(){
  try{
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) return;
    if (localStorage.getItem('nova_pwa_dismiss')) return;
    const ua = navigator.userAgent || '';
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
    const isAndroid = /Android/.test(ua);
    if (!isIOS && !isAndroid) return;
    let deferredPrompt = null;
    const fa = () => document.documentElement.dir === 'rtl';
    function show(){
      if (document.getElementById('nova-pwa')) return;
      const b=document.createElement('div'); b.id='nova-pwa';
      b.style.cssText='position:fixed;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom, 0px));z-index:9999;background:#101319;border:1px solid #262b34;border-radius:14px;padding:14px 16px;box-shadow:0 12px 30px rgba(0,0,0,.5);color:#e9edf4;font-size:13px;display:flex;gap:12px;align-items:center';
      const f=fa();
      const txt = isIOS
        ? (f?'نصب نوا روی صفحه اصلی: دکمهٔ اشتراک‌گذاری سافاری (⬆️) ← «Add to Home Screen»':'Install Nova: Safari Share (⬆️) → “Add to Home Screen”')
        : (f?'نصب «نوا پروکسی» روی گوشی':'Install Nova Proxy on your phone');
      b.innerHTML='<img src="/logo.png" style="width:34px;height:34px;border-radius:8px;flex:0 0 auto" onerror="this.style.display=\'none\'"><div style="flex:1;line-height:1.5">'+txt+'</div>';
      if (isAndroid && deferredPrompt){
        const inst=document.createElement('button'); inst.textContent=f?'نصب':'Install';
        inst.style.cssText='background:linear-gradient(120deg,#22d3ee,#7c5cff);color:#fff;border:none;border-radius:9px;padding:9px 16px;font:inherit;font-weight:700;cursor:pointer;flex:0 0 auto';
        inst.onclick=async()=>{ b.remove(); document.body.style.paddingBottom=''; deferredPrompt.prompt(); try{await deferredPrompt.userChoice;}catch(e){} deferredPrompt=null; };
        b.appendChild(inst);
      }
      const close=document.createElement('button'); close.textContent='✕';
      close.style.cssText='background:transparent;border:none;color:#8a93a6;font-size:16px;cursor:pointer;flex:0 0 auto';
      close.onclick=()=>{ b.remove(); document.body.style.paddingBottom=''; try{localStorage.setItem('nova_pwa_dismiss','1');}catch(e){} };
      b.appendChild(close);
      document.body.appendChild(b);
      // Reserve space so the fixed banner never covers the last cards (Data usage).
      try{ document.body.style.paddingBottom = (b.offsetHeight + 24) + 'px'; }catch(e){}
    }
    window.addEventListener('beforeinstallprompt', e=>{ e.preventDefault(); deferredPrompt=e; show(); });
    if (isIOS) setTimeout(show, 1500);
  }catch(e){}
})();

// ---- Users (multi-user management) ----
let usersArr=[], usersUsage={};
function uFmtBytes(b){ b=Number(b)||0; const u=['B','KB','MB','GB','TB']; let i=0; while(b>=1024&&i<u.length-1){b/=1024;i++;} return (i?b.toFixed(2):b)+' '+u[i]; }
function uSubLink(u){ return location.protocol+'//'+location.host+'/sub?token='+(u.token||''); }
function uRid(){ try{ return crypto.randomUUID().replace(/-/g,''); }catch(e){ return Math.random().toString(16).slice(2)+Math.random().toString(16).slice(2); } }
// Cloudflare KV reads are eventually consistent: right after a write, a fresh GET can still
// return the OLD value — which looked like "users vanish on refresh". We mirror the last save
// to localStorage (with a timestamp) and, if the server comes back with fewer users than we
// just saved, trust the cache and silently re-push to heal KV.
function readUsersCache(){ try{ return JSON.parse(localStorage.getItem('nova_users_cache')||'null'); }catch(e){ return null; } }
function writeUsersCache(mu,users){ try{ localStorage.setItem('nova_users_cache',JSON.stringify({t:Date.now(),mu:!!mu,users:users||[]})); }catch(e){} }
async function loadUsersPage(){
  try{ const r=await fetch('/admin/users.json?_t='+Date.now(),{cache:'no-store'});
    if(r.redirected || r.url.indexOf('/login')>-1){ renderUsers(); return; } // stale session — keep list
    const d=await r.json(); let serverUsers=Array.isArray(d.users)?d.users:[]; usersUsage=d.usage||usersUsage||{};
    let mu=d.multiUser===true;
    const c=readUsersCache();
    // KV is eventually consistent: a read right after a write can return the OLD/empty value for
    // up to ~60s ("saves then vanishes on reload"). For 2 min after our last local save, treat the
    // local cache as the source of truth whenever it differs from the server (count OR content),
    // and re-push to heal KV. Covers added, edited and deleted users.
    if(c && Array.isArray(c.users) && (Date.now()-(c.t||0))<120000 && (c.users.length!==serverUsers.length || JSON.stringify(c.users)!==JSON.stringify(serverUsers))){
      serverUsers=c.users; mu=c.mu===true||c.users.length>0;
      fetch('/admin/users.json',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({multiUser:mu,users:c.users})}).catch(()=>{});
    }
    usersArr=serverUsers; setTg('t-multiuser',mu);
  }catch(e){ /* keep current list on transient error (don't wipe) */ }
  renderUsers();
}
function renderUsers(){
  const box=$('users-list'); if(!box) return;
  const cols=$('users-cols'); if(cols) cols.style.display='none'; // per-row labels are used instead
  if(!usersArr.length){ box.innerHTML='<p class="hint">'+t('users_empty')+'</p>'; return; }
  const isfa=lang==='fa';
  box.innerHTML=usersArr.map((u,i)=>{
    const used=usersUsage[u.id]||0, quota=u.quotaBytes||0;
    const usedTxt=uFmtBytes(used)+(quota?(' / '+uFmtBytes(quota)):' / ∞');
    return '<div class="urow"><div class="uflds">'
      +'<div class="uf grow"><label>'+t('users_col_name')+'</label><input data-un="'+i+'" value="'+String(u.name||'').replace(/"/g,'&quot;')+'" placeholder="'+t('users_name')+'"/></div>'
      +'<div class="uf" style="width:96px"><label>'+t('users_col_quota')+'</label><input data-uq="'+i+'" type="number" min="0" value="'+(quota?Math.round(quota/1073741824):0)+'"/></div>'
      +'<div class="uf" style="width:160px"><label>'+t('users_col_expiry')+'</label><input data-ux="'+i+'" type="date" value="'+(u.expiry?String(u.expiry).slice(0,10):'')+'"/></div>'
      +'<div class="uf"><label>'+t('users_col_on')+'</label><div class="tg'+(u.enabled!==false?' on':'')+'" data-ue="'+i+'"><div class="d"></div></div></div>'
      +'<div class="uf" style="margin-inline-start:auto"><label>&nbsp;</label><div class="ubtns"><button class="b g" data-uc="'+i+'" style="width:auto;padding:9px 14px">'+t('users_copy')+'</button><button class="udel" data-ud="'+i+'" title="'+(isfa?'حذف کاربر':'Remove user')+'">✕</button></div></div>'
      +'</div><div class="uused">'+(isfa?'مصرف: ':'used: ')+usedTxt+' · tag <code>'+String(u.tag||'').slice(0,10)+'</code></div></div>';
  }).join('');
  box.querySelectorAll('[data-ue]').forEach(el=>el.onclick=()=>el.classList.toggle('on'));
  box.querySelectorAll('[data-uc]').forEach(el=>el.onclick=()=>{ const u=usersArr[+el.dataset.uc]; if(navigator.clipboard) navigator.clipboard.writeText(uSubLink(u)); toast(t('app_copied')); });
  box.querySelectorAll('[data-ud]').forEach(el=>el.onclick=async()=>{ collectUsers(); usersArr.splice(+el.dataset.ud,1); renderUsers(); await saveUsers(); });
}
function collectUsers(){
  const box=$('users-list'); if(!box) return;
  box.querySelectorAll('[data-un]').forEach(el=>{ const u=usersArr[+el.dataset.un]; if(u) u.name=el.value.trim(); });
  box.querySelectorAll('[data-uq]').forEach(el=>{ const u=usersArr[+el.dataset.uq]; if(u){ const g=Number(el.value)||0; u.quotaBytes=g>0?Math.round(g*1073741824):0; } });
  box.querySelectorAll('[data-ux]').forEach(el=>{ const u=usersArr[+el.dataset.ux]; if(u) u.expiry=el.value||''; });
  box.querySelectorAll('[data-ue]').forEach(el=>{ const u=usersArr[+el.dataset.ue]; if(u) u.enabled=el.classList.contains('on'); });
}
// Persist users to the worker. Used by Save, Add and Delete so changes always stick.
async function saveUsers(){ collectUsers();
  const mu = getTg('t-multiuser') || usersArr.length>0; setTg('t-multiuser',mu);
  const ss=$('users-savestat'); const setss=(txt,col)=>{ if(ss){ ss.textContent=txt; ss.style.color=col||''; } };
  setss(lang==='fa'?'در حال ذخیره…':'Saving…');
  try{ const r=await fetch('/admin/users.json',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({ multiUser:mu, users:usersArr })});
    // A stale session redirects admin POSTs to /login (HTML 200). Detect it instead of
    // falsely reporting success, and tell the operator to sign in again.
    if(r.redirected || r.url.indexOf('/login')>-1){ toast(t('sess_expired'),1); setss('⚠️ '+t('sess_expired'),'#ef4444'); return false; }
    let j={}; try{ j=await r.json(); }catch(e){}
    if(r.ok && j && j.success===true){ writeUsersCache(mu,usersArr); toast(t('users_saved'));
      const n=(typeof j.count==='number')?j.count:usersArr.length; setss('✓ '+(lang==='fa'?('ذخیره و تأیید شد — '+n+' کاربر'):('Saved & verified — '+n+' user'+(n===1?'':'s'))),'#16a34a');
      renderUsers(); return true; }
    toast('⚠️ '+((j&&j.error)||('HTTP '+r.status)),1); setss('⚠️ '+((j&&j.error)||('HTTP '+r.status)),'#ef4444'); return false;
  }catch(e){ toast('⚠️ '+e.message,1); setss('⚠️ '+e.message,'#ef4444'); return false; } }
if($('users-add')) $('users-add').onclick=async()=>{ collectUsers(); usersArr.push({ id:uRid(), name:'user'+(usersArr.length+1), tag:uRid().slice(0,10), token:uRid()+uRid().slice(0,8), quotaBytes:0, expiry:'', enabled:true, created:new Date().toISOString() }); renderUsers(); await saveUsers(); };
if($('users-save')) $('users-save').onclick=()=>saveUsers();

// ---- Dashboard: domain health ----
async function loadHealth(check){
  const el=$('health-list'); if(!el) return;
  if(check) el.textContent=(lang==='fa'?'در حال بررسی…':'Checking…');
  try{ const r=await fetch('/admin/domains'+(check?'?check=1':'')); const j=await r.json(); const arr=(j&&j.health&&Array.isArray(j.health.domains))?j.health.domains:[];
    if(Array.isArray(arr)&&arr.length){ const fa=lang==='fa';
      const legend='<div style="margin-bottom:6px">🟢 '+(fa?'سالم — از کلودفلر در دسترس':'healthy — reachable from Cloudflare')+' &nbsp; 🔴 '+(fa?'خطا / در دسترس نیست':'error / unreachable')+' &nbsp; ⚪️ '+(fa?'هنوز بررسی نشده':'not checked yet')+'</div>';
      const when=(d)=>{ if(!d.checkedAt) return ''; try{ return ' · '+new Date(d.checkedAt).toLocaleString(); }catch(e){ return ''; } };
      const esc=(s)=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      const stat=(d)=> d.ok===true?(fa?'سالم':'healthy'):d.ok===false?(d.reason?esc(d.reason):((fa?'در دسترس نیست':'unreachable')+(d.status?(' (HTTP '+d.status+')'):''))):(fa?'بررسی‌نشده':'unchecked');
      el.innerHTML=legend+arr.map(d=>'<div style="margin:2px 0">'+(d.ok===false?'🔴':d.ok===true?'🟢':'⚪️')+' <code style="font-size:12px">'+(d.host||d)+'</code> <span style="color:var(--mu)">— '+stat(d)+when(d)+'</span></div>').join(''); }
    else if(!check){ el.innerHTML='<span class="hint">'+(lang==='fa'?'هنوز بررسی نشده — «بررسی الان» را بزنید (کرون ساعتی هم بررسی می‌کند).':'Not checked yet — tap “Check now” (the hourly cron also checks).')+'</span>'; } // don't auto-fetch every domain on load (free-plan safe)
    else el.textContent=(lang==='fa'?'دامنه‌ای ثبت نشده':'no domains');
  }catch(e){ el.textContent='⚠️ '+e.message; }
}
if($('health-refresh')) $('health-refresh').onclick=()=>loadHealth(true);
// Ping each front domain from the USER's device (not Cloudflare) using an image load with a timeout.
function pingDomainOnce(host,timeout){ timeout=timeout||6000; return new Promise(res=>{ const t0=(performance&&performance.now)?performance.now():Date.now(); const img=new Image(); let done=false; const fin=ok=>{ if(done)return; done=true; const ms=Math.round(((performance&&performance.now)?performance.now():Date.now())-t0); res({ok,ms}); }; const timer=setTimeout(()=>fin(false),timeout); img.onload=()=>{clearTimeout(timer);fin(true);}; img.onerror=()=>{clearTimeout(timer);fin(false);}; img.src='https://'+String(host).replace(/^https?:\/\//,'').replace(/\/.*$/,'')+'/logo.png?_t='+Date.now(); }); }
if($('health-ping')) $('health-ping').onclick=async()=>{
  const out=$('health-ping-out'), btn=$('health-ping'); if(!out) return;
  let hosts=[]; try{ const j=await fetch('/admin/domains').then(r=>r.json()); hosts=(j&&j.hosts)||[]; }catch(e){}
  if(!hosts.length){ out.style.display='block'; out.textContent=lang==='fa'?'دامنه‌ای ثبت نشده':'No domains configured'; return; }
  btn.disabled=true; out.style.display='block'; out.textContent=lang==='fa'?'در حال پینگ از دستگاه شما…':'Pinging from your device…';
  const rows=[];
  for(const h of hosts){ const r=await pingDomainOnce(h); rows.push((r.ok?'🟢 ':'🔴 ')+h+(r.ok?(' · '+r.ms+' ms'):(' · '+(lang==='fa'?'در دسترس نیست / احتمالاً مسدود':'unreachable / likely blocked')))); }
  out.innerHTML=rows.join('<br>')+'<br><span style="color:var(--mu)">'+(lang==='fa'?'این تست از اینترنت فعلیِ شماست، نه از کلودفلر.':'This test runs from your current internet, not Cloudflare.')+'</span>';
  btn.disabled=false;
};
try{ loadHealth(false); }catch(e){}

// ---- Iran mode (one-tap resilience preset) ----
// Lock both Iran-mode buttons while a toggle is in flight so a double-tap can't race the save.
function iranBusy(on){ ['iran-mode','iran-mode-off'].forEach(id=>{ const b=$(id); if(b) b.disabled=on; }); }
if($('iran-mode')) $('iran-mode').onclick=async()=>{
  const st=$('iran-status'); if(st){ st.className='iran-stat off'; st.textContent=(lang==='fa'?'در حال اعمال…':'Applying…'); }
  iranBusy(true);
  try{
    cfg.multiProtocolSub=true; cfg.portSpread=true; cfg.ECH=true; if(!cfg.tlsFragment) cfg.tlsFragment='Shadowrocket';
    await saveConfig();
    let n={}; try{ const r=await fetch('/admin/network-settings.json?_t='+Date.now()); n=await r.json(); }catch(e){}
    n=n||{}; n.enableIPv6=false; n.enableDomesticBypass=true; n.enableAdBlock=true; n.enableRouting=true;
    n.blockCategories=Array.isArray(n.blockCategories)?n.blockCategories:[]; if(!n.blockCategories.includes('quic')) n.blockCategories.push('quic');
    await fetch('/admin/network-settings.json',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(n)});
    renderIranReport(n);
    toast(lang==='fa'?'حالت ایران فعال شد — در حال بازخوانی…':'Iran mode on — refreshing…');
    setTimeout(()=>location.reload(),700);
  }catch(e){ iranBusy(false); if(st){ st.className='hint'; st.textContent='⚠️ '+e.message; } }
};

// Disable Iran mode — reverts exactly what the Enable button turns on, back to plain defaults.
if($('iran-mode-off')) $('iran-mode-off').onclick=async()=>{
  const st=$('iran-status'); if(st){ st.className='iran-stat off'; st.textContent=(lang==='fa'?'در حال خاموش‌کردن…':'Disabling…'); }
  iranBusy(true);
  try{
    cfg.multiProtocolSub=false; cfg.portSpread=false; cfg.ECH=false; cfg.tlsFragment=null;
    await saveConfig();
    let n={}; try{ const r=await fetch('/admin/network-settings.json?_t='+Date.now()); n=await r.json(); }catch(e){}
    n=n||{}; n.enableIPv6=true;
    n.blockCategories=Array.isArray(n.blockCategories)?n.blockCategories.filter(x=>x!=='quic'):[];
    await fetch('/admin/network-settings.json',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(n)});
    renderIranReport(n);
    toast(lang==='fa'?'حالت ایران خاموش شد — در حال بازخوانی…':'Iran mode off — refreshing…');
    setTimeout(()=>location.reload(),700);
  }catch(e){ iranBusy(false); if(st){ st.className='hint'; st.textContent='⚠️ '+e.message; } }
};

// Report on the dashboard: shows exactly which Iran-mode settings are currently ON/OFF,
// reading the live config + network settings (so it reflects reality, not just a button press).
async function renderIranReport(nOverride){
  const box=$('iran-report'); if(!box) return;
  // Use the just-saved settings when provided so the status updates instantly after a toggle
  // (re-reading KV here can return the pre-save value due to read-after-write delay).
  let n=nOverride; if(!n){ try{ n=await fetch('/admin/network-settings.json?_t='+Date.now()).then(r=>r.json())||{}; }catch(e){ n={}; } }
  const c=cfg||{};
  const yes=(v)=>!!v, no=(v)=>!v;
  const cats=Array.isArray(n.blockCategories)?n.blockCategories:[];
  const items=[
    { ok:yes(c.multiProtocolSub), en:'All protocols (VLESS + Trojan + Shadowsocks)', fa:'همه پروتکل‌ها (VLESS + Trojan + Shadowsocks)' },
    { ok:yes(c.portSpread),       en:'Port spread (multiple ports per node)',        fa:'پخش پورت (چند پورت برای هر نود)' },
    { ok:!!c.tlsFragment,         en:'TLS fragment ('+(c.tlsFragment||'-')+')',      fa:'تکه‌تکه‌سازی TLS ('+(c.tlsFragment||'-')+')' },
    { ok:yes(c.ECH),              en:'ECH (encrypted SNI)',                          fa:'ECH (مخفی‌سازی SNI)' },
    { ok:no(n.enableIPv6),        en:'IPv6 disabled',                                fa:'غیرفعال‌سازی IPv6' },
    { ok:cats.includes('quic'),   en:'QUIC blocked',                                 fa:'مسدودسازی QUIC' },
    { ok:yes(n.enableDomesticBypass), en:'Iran domestic sites go direct',            fa:'دسترسی مستقیم به سایت‌های داخلی ایران' },
    { ok:yes(n.enableAdBlock),    en:'Ad / tracker blocking',                        fa:'مسدودسازی تبلیغات و ردیاب‌ها' },
    { ok:yes(n.enableRouting),    en:'Smart routing rules',                          fa:'قوانین مسیریابی هوشمند' },
  ];
  const onCount=items.filter(x=>x.ok).length;
  const allOn=onCount===items.length;
  const stat=$('iran-status');
  if(stat){ stat.className='iran-stat '+(allOn?'on':'off');
    stat.textContent=allOn?(lang==='fa'?'🟢 روشن است':'🟢 ON')
                          :(lang==='fa'?('⚪ خاموش — '+onCount+'/'+items.length):('⚪ OFF — '+onCount+'/'+items.length)); }
  // Reflect the live state on the two buttons so it's obvious which one is active.
  const bOn=$('iran-mode'), bOff=$('iran-mode-off');
  if(bOn) bOn.classList.toggle('is-active',allOn);
  if(bOff) bOff.classList.toggle('is-active',!allOn);
  const head=(lang==='fa')
    ? ('وضعیت فعلی پیکربندی ('+onCount+' از '+items.length+' فعال):')
    : ('Current configuration ('+onCount+' of '+items.length+' enabled):');
  const rows=items.map(x=>{
    const label=(lang==='fa'?x.fa:x.en);
    const mark=x.ok?'🟢':'⚪️';
    const col=x.ok?'var(--tx)':'var(--mut,#8a94a6)';
    return '<div style="display:flex;gap:8px;align-items:center;padding:4px 0;font-size:13px;color:'+col+'"><span style="flex:0 0 auto">'+mark+'</span><span>'+label+'</span></div>';
  }).join('');
  box.innerHTML='<div class="hint" style="margin-bottom:6px;font-weight:600">'+head+'</div>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:0 16px">'+rows+'</div>';
}

// ---- Backup & restore ----
if($('backup-export')) $('backup-export').onclick=async()=>{
  const st=$('backup-status'); st.textContent=(lang==='fa'?'در حال آماده‌سازی…':'Preparing…');
  try{
    const [c,n]=await Promise.all([fetch('/admin/config.json?_t='+Date.now()).then(r=>r.json()),fetch('/admin/network-settings.json?_t='+Date.now()).then(r=>r.json())]);
    const blob=new Blob([JSON.stringify({nova:1,exportedAt:new Date().toISOString(),config:c,network:n},null,2)],{type:'application/json'});
    const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='nova-backup-'+new Date().toISOString().slice(0,10)+'.json'; a.click(); URL.revokeObjectURL(a.href);
    st.textContent=(lang==='fa'?'✅ خروجی گرفته شد':'✅ Exported');
  }catch(e){ st.textContent='⚠️ '+e.message; }
};
if($('backup-import')) $('backup-import').onclick=()=>$('backup-file')&&$('backup-file').click();
if($('backup-file')) $('backup-file').onchange=async(e)=>{
  const st=$('backup-status'); const f=e.target.files&&e.target.files[0]; if(!f) return;
  st.textContent=(lang==='fa'?'در حال بازیابی…':'Restoring…');
  try{
    const data=JSON.parse(await f.text());
    if(!data||!data.config) throw new Error(lang==='fa'?'فایل نامعتبر':'invalid file');
    await fetch('/admin/config.json',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data.config)});
    if(data.network) await fetch('/admin/network-settings.json',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data.network)});
    st.textContent=(lang==='fa'?'✅ بازیابی شد — صفحه را رفرش کنید':'✅ Restored — refresh the page');
    toast(lang==='fa'?'بازیابی شد':'Restored');
  }catch(err){ st.textContent='⚠️ '+err.message; }
  finally{ e.target.value=''; }
};

// ---- Speed test (ISP-aware, one tap) ----
async function loadWhoami(){ try{ const w=await fetch('/admin/whoami').then(r=>r.json()); const el=$('sc-isp'); if(el) el.innerHTML=(lang==='fa'?'شبکهٔ شما: ':'Your network: ')+'<b>AS'+(w.asn||'?')+'</b> '+(w.isp||'')+(w.country?(' · '+w.country):''); }catch(e){} }
if($('sc-speedtest')) $('sc-speedtest').onclick=async()=>{
  const btn=$('sc-speedtest'), msg=$('sc-stmsg'), pbar=$('sc-pbar'), pfill=pbar&&pbar.querySelector('i');
  btn.disabled=true; if(msg) msg.textContent=(lang==='fa'?'در حال آماده‌سازی…':'Preparing…');
  if(pbar){ pbar.style.display='block'; pbar.classList.add('indet'); } if(pfill) pfill.style.width='0%';
  const sc=$('scan-card'); if(sc) sc.style.display='block';
  const onProg=(p)=>{
    if(p.phase==='load'){ if(pbar) pbar.classList.add('indet'); if(msg) msg.textContent=(lang==='fa'?'در حال دریافت آی‌پی‌ها…':'Fetching candidate IPs…'); return; }
    if(p.phase==='scan'){ if(pbar) pbar.classList.remove('indet'); const pct=p.total?Math.round(p.tested/p.total*100):0; if(pfill) pfill.style.width=Math.max(3,pct)+'%';
      if(msg) msg.textContent=(lang==='fa'?('در حال تست… '+p.tested+'/'+p.total+' ('+p.found+' سالم)'):('Testing… '+p.tested+'/'+p.total+' ('+p.found+' alive)')); return; }
    if(p.phase==='done'){ if(pbar) pbar.classList.remove('indet'); if(pfill) pfill.style.width='100%'; return; }
    if(p.phase==='none'){ if(pbar) pbar.classList.remove('indet'); if(pfill) pfill.style.width='100%'; }
  };
  try{
    await startScan(onProg);
    if(scanResults && scanResults.length){
      const lines=scanResults.map(r=>r.ip+':'+r.port+'#Nova-'+nova5());
      const cur=$('f-add').value.trim(); $('f-add').value=(cur?cur+'\n':'')+lines.join('\n');
      ipMode='custom'; document.querySelectorAll('#ipseg button').forEach(b=>b.classList.toggle('on',b.dataset.m==='custom'));
      $('m-smart-box').style.display='none'; $('m-custom-box').style.display='block'; $('m-random-box').style.display='none';
      await saveConfig();
      if(msg) msg.textContent=(lang==='fa'?('✅ '+scanResults.length+' آی‌پی برتر اعمال و ذخیره شد'):('✅ applied & saved top '+scanResults.length));
      toast(lang==='fa'?'بهترین آی‌پی‌ها اعمال شد':'Best IPs applied');
    } else { if(msg) msg.textContent=(lang==='fa'?'آی‌پی سالمی پیدا نشد':'no responsive IPs found'); }
  }catch(e){ if(msg) msg.textContent='⚠️ '+e.message; }
  finally{ btn.disabled=false; if(pbar) pbar.classList.remove('indet'); }
};
try{ loadWhoami(); }catch(e){}

// ---- Security: change password + 2FA (TOTP) ----
async function loadSecurity(){
  try{ const s=await fetch('/admin/security/status').then(r=>r.json());
    const on=!!s.twofa; if($('sec-2fa-state')){ $('sec-2fa-state').textContent=on?t('sec_on'):t('sec_off'); $('sec-2fa-state').style.color=on?'var(--ok)':'var(--mu)'; }
    if($('sec-2fa-off')) $('sec-2fa-off').style.display=on?'none':'block';
    if($('sec-2fa-on')) $('sec-2fa-on').style.display=on?'block':'none';
    if($('sec-2fa-setup')) $('sec-2fa-setup').style.display='none';
    const rb=$('sec-recovery'); if(rb){ if(s.envRecovery){ rb.style.display='block'; rb.textContent='🔑 '+(s.kvSet?t('sec_rec_both'):t('sec_rec_only')); } else { rb.style.display='none'; } }
  }catch(e){}
  const cp=$('sec-curpass'); if(cp){ cp.textContent='••••••••'; cp.dataset.shown=''; }
}
let _revealedPass='';
async function revealPass(){ try{ const r=await fetch('/admin/security/reveal'); if(r.redirected||r.url.indexOf('/login')>-1){ toast(t('sess_expired'),1); return ''; } const j=await r.json(); _revealedPass=j.password||''; return _revealedPass; }catch(e){ toast(t('sec_err'),1); return ''; } }
if($('sec-reveal')) $('sec-reveal').onclick=async()=>{ const cp=$('sec-curpass'); if(!cp) return; if(cp.dataset.shown){ cp.textContent='••••••••'; cp.dataset.shown=''; $('sec-reveal').textContent=t('sec_reveal'); return; } const p=await revealPass(); if(p!==''){ cp.textContent=p; cp.dataset.shown='1'; $('sec-reveal').textContent=t('sec_hide'); } };
if($('sec-curcopy')) $('sec-curcopy').onclick=async()=>{ const p=_revealedPass||await revealPass(); if(p&&navigator.clipboard){ navigator.clipboard.writeText(p); toast(t('app_copied')); } };
if($('sec-chpw')) $('sec-chpw').onclick=async()=>{
  const m=$('sec-chpw-msg'); m.style.color='var(--mu)';
  const cur=$('sec-cur').value, nw=$('sec-new').value, n2=$('sec-new2').value;
  if(nw.length<6){ m.textContent=t('sec_short'); m.style.color='var(--dg)'; return; }
  if(nw!==n2){ m.textContent=t('sec_mismatch'); m.style.color='var(--dg)'; return; }
  try{ const r=await fetch('/admin/security/change-password',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({current:cur,new:nw})});
    const j=await r.json().catch(()=>({}));
    if(r.ok&&j.success){ m.textContent=t('sec_pw_ok'); m.style.color='var(--ok)'; $('sec-cur').value=$('sec-new').value=$('sec-new2').value=''; toast(t('sec_pw_ok')); }
    else { m.textContent=j.error==='wrong_current'?t('sec_pw_bad'):(j.error==='too_short'?t('sec_short'):(j.error==='env_managed'?t('sec_envmanaged'):t('sec_err'))); m.style.color='var(--dg)'; }
  }catch(e){ m.textContent=t('sec_err'); m.style.color='var(--dg)'; }
};
if($('sec-2fa-start')) $('sec-2fa-start').onclick=async()=>{
  try{ const s=await fetch('/admin/security/2fa-setup').then(r=>r.json());
    $('sec-2fa-secret').value=s.secret; $('sec-2fa-setup').dataset.secret=s.secret;
    const q=$('sec-qr'); q.innerHTML=''; if(window.QRCode) new QRCode(q,{text:s.otpauth,width:180,height:180,correctLevel:QRCode.CorrectLevel.M});
    $('sec-2fa-setup').style.display='block'; $('sec-2fa-off').style.display='none';
  }catch(e){ toast(t('sec_err'),1); }
};
if($('sec-2fa-confirm')) $('sec-2fa-confirm').onclick=async()=>{
  const m=$('sec-2fa-msg'); m.style.color='var(--mu)';
  const secret=$('sec-2fa-setup').dataset.secret||$('sec-2fa-secret').value, code=$('sec-2fa-codein').value.trim();
  try{ const r=await fetch('/admin/security/2fa-enable',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({secret,code})});
    const j=await r.json().catch(()=>({}));
    if(r.ok&&j.success){ m.textContent=t('sec_2fa_okmsg'); m.style.color='var(--ok)'; toast(t('sec_2fa_okmsg')); $('sec-2fa-codein').value=''; loadSecurity(); }
    else { m.textContent=j.error==='bad_code'?t('sec_2fa_badcode'):t('sec_err'); m.style.color='var(--dg)'; }
  }catch(e){ m.textContent=t('sec_err'); m.style.color='var(--dg)'; }
};
if($('sec-2fa-disable')) $('sec-2fa-disable').onclick=async()=>{
  const m=$('sec-2fa-dmsg'); m.style.color='var(--mu)';
  const code=$('sec-2fa-dcodein').value.trim();
  try{ const r=await fetch('/admin/security/2fa-disable',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({code})});
    const j=await r.json().catch(()=>({}));
    if(r.ok&&j.success){ m.textContent=t('sec_2fa_offmsg'); m.style.color='var(--ok)'; toast(t('sec_2fa_offmsg')); $('sec-2fa-dcodein').value=''; loadSecurity(); }
    else { m.textContent=j.error==='bad_code'?t('sec_2fa_badcode'):t('sec_err'); m.style.color='var(--dg)'; }
  }catch(e){ m.textContent=t('sec_err'); m.style.color='var(--dg)'; }
};
try{ loadSecurity(); }catch(e){}
