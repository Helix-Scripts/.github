# Frequently Asked Questions

## What frameworks are supported?

Helix Scripts support **ESX**, **QBCore**, and **Qbox** out of the box. The framework bridge in `helix_lib` auto-detects which framework is running, so you don't need to configure anything manually. You can also lock to a specific framework in `config.lua` if you prefer.

## Is helix_lib required?

**Yes.** `helix_lib` is the shared library that all Helix scripts depend on. It must be installed and started before any other Helix resource. It is free, open-source, and MIT licensed.

```cfg
# server.cfg — helix_lib must come first
ensure helix_lib
ensure helix_hud
```

## What is the performance impact?

Helix scripts are designed to be as lightweight as possible. Idle resmon usage sits below **0.01 ms** for all Helix resources. NUI bundles are built with Vite for minimal size and fast load times. We actively benchmark every release to prevent regressions.

## Can I customise the NUI?

Yes. The NUI layer is built with **React** and uses a design-token system for colours, spacing, and typography. You can override tokens in the resource's config or fork the NUI source and build your own version with `npm run build`.

## Where do I report bugs?

Open an issue on the relevant GitHub repository under the [Helix-Scripts organisation](https://github.com/Helix-Scripts). Please include your framework, server artifact version, and any relevant console output.

## Is there a Discord?

Yes! Join us at [discord.gg/QcAkQ6ZAE6](https://discord.gg/QcAkQ6ZAE6) for support, development updates, and community discussion.
