# Nova updates

Nova does not update or redeploy itself at runtime. Updates are handled by GitHub and Cloudflare Workers Builds so the source, build result, deployment history, and rollback target remain visible.

## Recommended user flow

1. Install Nova with Cloudflare's **Deploy to Cloudflare** flow. Cloudflare creates a user-owned Git repository, provisions the declared bindings, and connects Workers Builds.
2. In the new GitHub repository, enable Actions and allow GitHub Actions to create pull requests.
3. In Cloudflare, open **Worker → Settings → Build → Branch control** and enable **Builds for non-production branches**. This creates a preview version and URL for the update branch without replacing the active deployment.
4. The included **Check for Nova updates** workflow runs daily. It can also be started manually from **Actions → Check for Nova updates → Run workflow**.
5. When a newer upstream version exists, the workflow opens a pull request containing only `worker.js` and `version.json`. Account-specific Wrangler bindings are preserved.
6. Review the source diff and Cloudflare preview URL. Merge the pull request to deploy through Workers Builds.
7. If the release fails, use **Worker → Deployments → Rollback** in Cloudflare.

No Cloudflare API token is copied into Nova. Cloudflare's own deployment flow performs the API operations and Workers Builds deploys repository changes using its managed connection.

## Optional hands-off updates

Review mode is the default. Users who prefer automatic updates can opt in once:

1. Open the user-owned Nova repository on GitHub.
2. Go to **Settings → Secrets and variables → Actions → Variables**.
3. Create a repository variable named `NOVA_UPDATE_MODE` with the value `automatic`.

The scheduled workflow then:

1. Fetches only `worker.js` and `version.json` from `IRNova/Nova-Proxy`.
2. Refuses same-version and older releases.
3. Checks the Worker JavaScript syntax.
4. Runs a Cloudflare Wrangler dry-run.
5. Pushes the validated update to the production branch, where Workers Builds deploys it.

To try automatic mode once without enabling scheduled automatic updates, run **Actions → Check for Nova updates → Run workflow** and choose `automatic`.

Automatic mode trusts future releases published by `IRNova/Nova-Proxy`. Review mode is safer because a person can inspect the diff and preview first. Set `NOVA_UPDATE_MODE` back to `review` or delete the variable to stop hands-off updates.

## Existing Workers

For an existing Worker, connect its user-owned GitHub repository under **Worker → Settings → Builds**. The Worker name must match the Wrangler project name used by the connected build.

Official references:

- https://developers.cloudflare.com/workers/platform/deploy-buttons/
- https://developers.cloudflare.com/workers/ci-cd/builds/
- https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/
- https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/
