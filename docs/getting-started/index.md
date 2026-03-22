# Installation

Get up and running with Helix Scripts in minutes.

## Prerequisites

- A FiveM server running the latest recommended artifacts
- One of the supported frameworks: **ESX**, **QBCore**, or **Qbox**
- Node.js 18+ (only if you plan to build NUI from source)

## Step 1 — Download helix_lib

`helix_lib` is the shared library that powers every Helix script. All other Helix resources depend on it, so it must be installed first.

1. Download the latest release from the [GitHub releases page](https://github.com/Helix-Scripts/helix_lib/releases).
2. Extract the folder into your server's `resources/` directory.

## Step 2 — Add to server.cfg

Open your `server.cfg` and ensure `helix_lib` starts **before** any other Helix script:

```cfg
ensure helix_lib

# Then your other Helix scripts
ensure helix_hud
```

::: warning
`helix_lib` **must** start before all other Helix resources. If it is not running, dependent scripts will fail to load.
:::

## Step 3 — Configure

Each Helix script ships with a `config.lua` file you can edit to customise behaviour. See the [Configuration guide](./configuration) for details.

## Step 4 — Restart

Restart your server (or run `ensure helix_lib` in the live console) and you're ready to go.

## Next Steps

- [Configuration](./configuration) — learn how config files work
- [helix_lib modules](/scripts/helix-lib) — explore the full feature set
