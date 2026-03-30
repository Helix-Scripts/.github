# Installation

Get up and running with Helix Scripts in minutes.

## Prerequisites

- A FiveM server running the latest recommended artifacts
- One of the supported frameworks: **Qbox**, **QBCore**, or **ESX** (or standalone mode)
- Lua 5.4 enabled in your server (`lua54 'yes'` in fxmanifest — helix_lib handles this)
- Node.js 18+ (only if you plan to build NUI from source)

## Step 1 — Download helix_lib

`helix_lib` is the shared library that powers every Helix script. **All other Helix resources depend on it**, so it must be installed first.

1. Download the latest release from the [GitHub releases page](https://github.com/Helix-Scripts/helix-lib/releases).
2. Extract the folder into your server's `resources/` directory.
3. Rename it to `helix_lib` (underscore, not hyphen) if the zip extracts with a different name.

::: warning Resource naming
The folder **must** be named `helix_lib` (with an underscore). FiveM resource names follow folder names, and all Helix scripts reference `helix_lib` in their exports.
:::

## Step 2 — Add to server.cfg

Open your `server.cfg` and ensure `helix_lib` starts **before** any other Helix script:

```cfg
ensure helix_lib

# Then your other Helix scripts (order matters)
ensure helix_hud
ensure helix_npc
ensure helix_economy
# etc.
```

::: danger Start order matters
`helix_lib` **must** start before all other Helix resources. If it is not running, dependent scripts will fail with export-not-found errors.
:::

## Step 3 — Configure

Edit `config.lua` in the `helix_lib` resource folder:

```lua
return {
    -- Enable debug logging (verbose output, dev tools)
    debug = false,

    -- Default locale for translations
    locale = 'en',

    -- Framework override (auto-detected if nil)
    -- Options: 'qbox', 'qbcore', 'esx', 'standalone'
    framework = nil,

    -- Check GitHub for updates on startup
    versionCheck = true,

    -- Notification defaults
    notifications = {
        position = 'top-right',
        duration = 5000,
    },

    -- Log level: 'error', 'warn', 'info', 'debug'
    logging = {
        level = 'info',
    },
}
```

See the [Configuration guide](./configuration) for details on each option.

## Step 4 — Restart

Restart your server (or run `ensure helix_lib` in the live console). You should see:

```
╔═══════════════════════════════════════╗
║         helix_lib v0.1.0              ║
║         Framework: qbox               ║
║         Locale: en                    ║
╚═══════════════════════════════════════╝
```

If the framework shows `standalone` and you expected a framework to be detected, check that your framework resource (`qbx_core`, `qb-core`, or `es_extended`) starts **before** `helix_lib`.

## Next Steps

- [Configuration](./configuration) — understand all config options
- [helix_lib overview](/scripts/helix-lib) — explore the full feature set
- [API Reference](/api/) — complete export documentation
- [Framework Bridge Guide](/guides/framework-bridge) — framework-specific details
