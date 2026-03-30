# Configuration

Every Helix script ships with a `config.lua` file at its root. This file returns a single Lua table that controls all tuneable behaviour.

## How it works

Config files use plain Lua tables — no special syntax, no external formats. This keeps things simple and gives you the full power of Lua expressions when needed.

## helix_lib config.lua

```lua
return {
    --- Enable debug mode (verbose logging, hot-reload, dev tools)
    debug = false,

    --- Default locale for translations
    locale = 'en',

    --- Framework override (auto-detected if nil)
    --- Options: 'qbox', 'qbcore', 'esx', 'standalone'
    framework = nil,

    --- Version check on startup
    versionCheck = true,

    --- Notification system
    notifications = {
        --- Position on screen
        --- Options: 'top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center'
        position = 'top-right',

        --- Default duration in milliseconds
        duration = 5000,
    },

    --- Logging
    logging = {
        --- Log level: 'error', 'warn', 'info', 'debug'
        level = 'info',
    },
}
```

## Options

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `debug` | `boolean` | `false` | Enables verbose logging and dev features |
| `locale` | `string` | `'en'` | Default language for translations |
| `framework` | `string?` | `nil` | Force a specific framework. `nil` = auto-detect |
| `versionCheck` | `boolean` | `true` | Check GitHub for updates on startup |
| `notifications.position` | `string` | `'top-right'` | Where notifications appear on screen |
| `notifications.duration` | `number` | `5000` | Default notification duration (ms) |
| `logging.level` | `string` | `'info'` | Minimum log level to print |

## Guidelines

| Rule | Detail |
|------|--------|
| **Don't rename the file** | It must remain `config.lua` at the resource root. |
| **Only edit values** | Changing keys or removing entries may break the script. |
| **Use the correct types** | Strings need quotes, booleans are `true`/`false`, numbers are unquoted. |
| **`nil` is valid** | Setting `framework = nil` means auto-detect. |

## Framework auto-detection

When `framework` is `nil` (the default), `helix_lib` detects which framework is running by checking for known resources in this order:

1. **Qbox** — `qbx_core` is started
2. **QBCore** — `qb-core` is started
3. **ESX** — `es_extended` is started
4. **Standalone** — none of the above

To skip detection and lock to a specific framework:

```lua
framework = 'esx',
```

::: tip Start order
For auto-detection to work, your framework resource must start **before** `helix_lib` in `server.cfg`.
:::

## Hot-reload

`helix_lib` supports runtime config reloading. Other scripts can register watchers to respond to changes:

```lua
local Config = exports.helix_lib:config()

Config.onReload('helix_hud', function(newConfig)
    print('HUD config updated:', newConfig.position)
end)

-- Trigger a reload
Config.reload('helix_hud')
```

## Per-script configs

Each Helix script has its own `config.lua`. Values there override any defaults provided by the script itself. Refer to the individual script documentation for available options.

## Loading configs from other resources

```lua
local Config = exports.helix_lib:config()

-- Load another resource's config with defaults
local hudConfig = Config.load('helix_hud', {
    position = 'bottom-center',
    updateInterval = 200,
})

-- Get a previously loaded config (no disk read)
local cached = Config.get('helix_hud')
```
