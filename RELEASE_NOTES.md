# Nova Proxy 4.9.1

The second address can now be switched on from the panel.

## What changed

4.9.0 added the ability to serve your panel from a `pages.dev` address as well as a `workers.dev` one, so that one filtering decision cannot take it offline. It shipped with no way to reach it. The setting was read from a Worker variable that was not in the panel, not documented, and not set by the Telegram installer, so in practice nobody could turn it on. The release notes said otherwise, and that was wrong.

It is now a field in **Settings → System extras**, called **Second address: Pages project**, in English, Russian and Farsi, and it comes up in the panel search.

## One step is still yours

Before it will deploy, create the Pages project yourself and bind it to **this panel's own** D1 database and KV namespace. The panel says this next to the field.

Nova refuses to deploy to a project bound to anything else, and that refusal is deliberate. A copy that cannot read your data would come up unclaimed on a public address, and because `pages.dev` hostnames can be enumerated, the first visitor to find it could claim it and take your panel with it through the shared database. Refusing is recoverable. Publishing is not.

Once it is set, every update goes to the Worker first and reaches the Pages copy only after the Worker copy is confirmed healthy, so a build that cannot start never reaches both doors at once.

## Everything else

Unchanged from 4.9.0. If you already updated to 4.9.0 and were not using the second address, nothing here affects you.

## Updating

Panels do not update themselves. Use the update button in your panel, or the Update option in the Telegram bot. After updating, your panel should report **4.9.1**.
