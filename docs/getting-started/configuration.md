# Configuration

Every Helix script ships with a `config.lua` file at its root. This file contains a single Lua table that controls all tuneable behaviour.

## How it works

Config files use plain Lua tables — no special syntax, no external formats. This keeps things simple and gives you the full power of Lua expressions when you need them.

```lua
return {
    debug = false,

    framework = 'auto', -- 'esx' | 'qbcore' | 'qbox' | 'auto'

    locale = 'en',

    hud = {
        enabled = true,
        position = 'bottom-center',
        updateInterval = 200, -- ms
    },

    notifications = {
        duration = 5000, -- ms
        position = 'top-right',
    },
}
```

## Guidelines

| Rule | Detail |
|------|--------|
| **Don't rename the file** | It must remain `config.lua` at the resource root. |
| **Only edit values** | Changing keys or removing entries may break the script. |
| **Use the correct types** | Strings need quotes, booleans are `true`/`false`, numbers are unquoted. |

## Hot-reload support

`helix_lib` watches for config changes at runtime. When you save `config.lua`, the new values are picked up automatically — no server restart required.

You can also trigger a manual reload from the server console:

```
helix_lib reload
```

## Framework auto-detection

When `framework` is set to `'auto'` (the default), `helix_lib` detects which framework is running by checking for known exports in the following order:

1. **Qbox** (`qbx_core`)
2. **QBCore** (`qb-core`)
3. **ESX** (`es_extended`)

To skip detection and lock to a specific framework, set the value explicitly:

```lua
framework = 'esx',
```

## Per-script overrides

Each Helix script has its own `config.lua`. Values set there override any defaults provided by the script itself. Refer to the individual script documentation for available options.
