# Deploying Nova Proxy

Nova Proxy runs on a single Cloudflare Worker on the free plan. One deploy creates the Worker, its KV namespace, and its D1 database, and serves the whole panel, the subscription links, and the Telegram bot from your own Cloudflare account. There is no VPS and no origin server to run.

## Install

You need a free [Cloudflare](https://dash.cloudflare.com/sign-up) account. Pick one path.

### Option A: Deploy to Cloudflare (recommended)

Use the **Deploy to Cloudflare** button in the repository and follow the prompts:

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/IRNova/Nova-Proxy)

Cloudflare's supported deployment flow creates a user-owned Git repository, provisions the Worker, the KV namespace, and the D1 database, and connects Workers Builds. You never create or paste a Cloudflare API token into Nova.

### Option B: The Telegram bot (no computer)

The installer bot [@IRNovaProxy_Bot](https://t.me/IRNovaProxy_Bot) walks you through the same deployment from your phone. Check the bot username exactly before you start.

### Option C: Wrangler (CLI)

```bash
# 1. install the Cloudflare CLI
npm install -g wrangler
wrangler login

# 2. install dependencies and deploy
# Wrangler provisions and binds KV and D1 automatically.
npm ci
npm run deploy
```

Then open `https://<your-worker>.workers.dev/admin`, finish the short setup, and set your admin password. That login is your panel. Keep it private; user subscription links are credentials, so treat them like passwords.

## Verify your download

The public repository ships a single obfuscated deployment artifact, `worker.js`, with its checksum published two ways so you can confirm you are running the release that was announced:

- `version.json` carries the expected `worker_sha256` for the current release.
- `SHA256SUMS` lists the same digest next to the file name.

Check a copy by hand:

```bash
curl -fsSLO https://raw.githubusercontent.com/IRNova/Nova-Proxy/main/worker.js
curl -fsSL https://raw.githubusercontent.com/IRNova/Nova-Proxy/main/SHA256SUMS | sha256sum -c
```

You can also confirm the artifact parses as valid JavaScript before deploying:

```bash
npm run check
```

## Update

Nova does not update or redeploy itself at runtime. Updates run through GitHub and Workers Builds, so the source diff, the build result, the deployment history, and the rollback target all stay visible.

### Review mode (default)

1. Repositories created from the Deploy to Cloudflare flow include a daily **Check for Nova updates** GitHub Action. You can also start it from **Actions > Check for Nova updates > Run workflow**.
2. In the new GitHub repository, enable Actions and allow GitHub Actions to create pull requests.
3. In Cloudflare, open **Worker > Settings > Build > Branch control** and enable **Builds for non-production branches**. This gives the update branch a preview version and URL without replacing the live deployment.
4. When a newer release exists, the workflow opens a pull request containing only `worker.js` and `version.json`. Your account-specific Wrangler bindings are left untouched.
5. Review the source diff and the Cloudflare preview URL, then merge to deploy through Workers Builds.

### Automatic mode (opt in)

Users who prefer hands-off updates can opt in once:

1. Open the user-owned Nova repository on GitHub.
2. Go to **Settings > Secrets and variables > Actions > Variables**.
3. Create a repository variable named `NOVA_UPDATE_MODE` with the value `automatic`.

The scheduled workflow then fetches only `worker.js` and `version.json` from `IRNova/Nova-Proxy`, refuses same-version and older releases, checks the Worker JavaScript syntax, runs a Wrangler dry-run, and pushes the validated update to the production branch, where Workers Builds deploys it. Set `NOVA_UPDATE_MODE` back to `review` or delete the variable to stop hands-off updates.

No Cloudflare API token is copied into Nova. Cloudflare's own deployment flow performs the API operations, and Workers Builds deploys repository changes over its managed connection. Your users, settings, and data are preserved across updates.

### Roll back

If a release misbehaves, use **Worker > Deployments > Rollback** in Cloudflare to return to the previous version.

## Backend mode (optional, for calls)

A plain free Worker cannot carry UDP, so voice and video calls (FaceTime, WhatsApp, Telegram) need a backend. Front your Worker with your own Xray or sing-box VPS:

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/IRNova/Tools/main/nova-backend.sh)
```

Then enable **Backend mode** in the panel (Network Settings > Backend mode) and enter your VPS address. The Worker keeps serving the panel and the clean-IP edge while the backend carries full-quality routing and UDP.

## Existing Workers

For a Worker you already run, connect its user-owned GitHub repository under **Worker > Settings > Builds**. The Worker name must match the Wrangler project name used by the connected build.

Official references:

- https://developers.cloudflare.com/workers/platform/deploy-buttons/
- https://developers.cloudflare.com/workers/ci-cd/builds/
- https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/
- https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/
