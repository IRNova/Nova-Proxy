# Security and verification

Nova Proxy carries traffic for people in high-censorship networks, so being able
to trust the code is part of the product. This document explains how to verify
what you run, and how to report a problem.

## Verify that what you deploy is this source

- `worker.js` in this repository is the **complete, unminified source** of the
  Worker. There is no separate build step, bundler, or obfuscation: the file you
  read is the file that runs.
- Nova Proxy is **self-hosted**. When you use "Deploy to Cloudflare" or run
  `wrangler deploy`, Cloudflare deploys exactly the `worker.js` in your fork at
  that commit. You are never asked to trust a binary you cannot read.
- Every push runs the [`Verify worker.js`](.github/workflows/verify.yml) CI,
  which syntax-checks the file and **publishes its SHA-256** in the run summary.
  To confirm a checkout is untampered:

  ```bash
  sha256sum worker.js   # compare with the hash in the matching CI run
  ```

- The organization also keeps a central, credential-free verifier at
  [`IRNova/reproducible-builds`](https://github.com/IRNova/reproducible-builds),
  which cross-checks the hashes of Nova's public artifacts (this Worker and the
  installer site) from source.

## Panel version pinning

The panel reports its version from `version.json`. A self-hosted instance only
runs the code you deployed; it does not fetch or execute remote code at runtime.

## Reporting a vulnerability

Please report security issues privately first, so users are not exposed before a
fix ships:

- Telegram: **[@irnova_proxy](https://t.me/irnova_proxy)** (DM the maintainers)
- Or open a **private security advisory** on this repository (Security tab, "Report a vulnerability").

We aim to acknowledge reports quickly and to credit reporters who want it. We do
not condone harassment of security researchers, and we ask the community not to
pile onto anyone who reports an issue in good faith.
