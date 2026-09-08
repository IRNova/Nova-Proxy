# Nova Proxy 4.8.1

A correction to 4.8.0. If your panel says it is on **V4.7.4** and keeps offering an update that never seems to apply, this is the release that fixes it.

## What was wrong

4.8.0 changed the version in every place except the one the panel reads to describe itself. So a panel that had updated correctly still reported the older number, compared that against the current release, decided it was behind, and showed **update available** permanently. Pressing update redeployed exactly the same build, so the notice came straight back.

**Nothing was actually wrong with 4.8.0.** Panels running it have the correct code and every 4.8.0 change is working, including the Google AI routing. Only the number on screen, and the update notice that followed from it, were wrong.

## What changed

- The panel now reports the version it is actually running.
- The update notice appears only when there is genuinely something newer.
- Nova now refuses to build a release whose reported version disagrees with the release itself, so this cannot happen again.

## Updating

Panels do not update themselves, so use the update button in your panel or the Update option in the Telegram bot. After updating, the version shown should read **4.8.1** and the update notice should be gone.

If your panel already shows 4.8.0 behaviour you like, nothing is broken by staying where you are. This release only corrects the reporting.
