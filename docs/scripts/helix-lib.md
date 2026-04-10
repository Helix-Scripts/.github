# helix_lib

`helix_lib` is the shared foundation for every Helix script. It provides a unified API layer across frameworks, a config system, localisation, NUI design components, and callback RPC — all through flat per-function exports that survive FiveM's export proxy.

**Version:** 1.0.0 | **License:** MIT | **Price:** Free

---

## Overview

Every Helix script depends on `helix_lib`. It handles:

- **Framework Bridge** — Abstracts ESX, QBCore, and Qbox behind a single API
- **Config System** — Load, merge, and hot-reload Lua config tables
- **Callback System** — RPC-style server/client callbacks with `ox_lib` compatibility
- **Locale System** — Multi-language translations with `string.format` interpolation
- **NUI Design System** — Shared React components and design tokens
- **Version Check** — Automatic update checking against GitHub releases

## Quick Start

```lua
-- Server: register a callback
exports.helix_lib:callback_register('myScript:getData', function(source)
    local money = exports.helix_lib:bridge_GetPlayerMoney(source, 'cash')
    return { balance = money }
end)

-- Client: call it
local result = exports.helix_lib:callback_await('myScript:getData')
print('Balance: $' .. result.balance)

-- Translate a string
local msg = exports.helix_lib:locale_t('money_added', result.balance)
exports.helix_lib:notify(msg, 'success')
```

## Export Architecture

All exports use a **flat per-function** pattern. This is intentional — FiveM's export proxy strips methods from returned tables. Instead of `exports.helix_lib:bridge().GetPlayer(src)`, you call `exports.helix_lib:bridge_GetPlayer(src)` directly.

See the [API Reference](/api/) for the complete export list.

---

## Modules

### Framework Bridge

Automatically detects which framework is running and provides unified access to player data, money, jobs, inventory, and notifications.

**Supported frameworks:**
- **Qbox** (`qbx_core`)
- **QBCore** (`qb-core`)
- **ESX** (`es_extended`)
- **Standalone** (fallback — all functions return nil/false/0)

Detection order: Qbox → QBCore → ESX → Standalone. Override in `config.lua` if needed.

```lua
-- Check which framework is active
local fw = exports.helix_lib:bridge_framework()
print(fw) -- 'qbox', 'qbcore', 'esx', or 'standalone'

-- Check for a specific framework
if exports.helix_lib:bridge_is('qbox') then
    -- Qbox-specific logic
end

-- Get player data (server-side)
local player = exports.helix_lib:bridge_GetPlayer(source)
local job = exports.helix_lib:bridge_GetPlayerJob(source)
local money = exports.helix_lib:bridge_GetPlayerMoney(source, 'bank')
```

See the [Framework Bridge Guide](/guides/framework-bridge) for detailed framework differences.

---

### Config System

Every Helix script ships with a `config.lua` at its root. The config system loads these as Lua tables, merges with defaults, and supports runtime hot-reload.

```lua
-- Get the config table (returns HelixConfig module)
local config = exports.helix_lib:config()

-- Load another resource's config with defaults
local cfg = config.load('helix_hud', { position = 'bottom-center' })
```

See the [Configuration Guide](/getting-started/configuration) for all options.

---

### Callback System

Framework-agnostic RPC between client and server. If `ox_lib` is present, wraps its callback system automatically — your code works identically either way.

```lua
-- Server: register
exports.helix_lib:callback_register('shop:getItems', function(source, category)
    return getShopItems(category)
end)

-- Client: async with callback
exports.helix_lib:callback_trigger('shop:getItems', function(items)
    for _, item in ipairs(items) do
        print(item.name)
    end
end, 'weapons')

-- Client: blocking await
local items = exports.helix_lib:callback_await('shop:getItems', 'weapons')
```

---

### Locale System

Multi-language translations with `string.format` interpolation. Falls back to English when a key is missing in the active locale.

```lua
-- Translate a key
local msg = exports.helix_lib:locale_t('greeting', 'Alex')
-- With en.lua: { greeting = 'Hello, %s!' } → "Hello, Alex!"

-- Check if a key exists
local exists = exports.helix_lib:locale_has('greeting') -- true

-- Get active locale
local lang = exports.helix_lib:locale_current() -- 'en'

-- Load translations from table
exports.helix_lib:locale_load({ greeting = 'Hallo, %s!' })

-- Load translations from file
exports.helix_lib:locale_loadFile('nl')

-- Load translations from another resource
exports.helix_lib:locale_loadFile('en', 'helix_hud')
```

Create locale files at `locales/<lang>.lua` in your resource:

```lua
-- locales/en.lua
return {
    greeting = 'Hello, %s!',
    money_added = '$%s has been added to your account.',
    error_no_permission = 'You do not have permission to do this.',
}
```

---

### Version Check

On resource start, checks the GitHub releases API for newer versions. Prints a console notice if an update is available. No telemetry — one GET request to `api.github.com`, that's it.

Disable in `config.lua`:

```lua
return {
    versionCheck = false,
}
```

---

## Dependencies

`helix_lib` has **zero hard dependencies**. It works standalone out of the box.

**Optional integrations:**
- `ox_lib` — If present, callbacks route through ox_lib's system for compatibility with other ox-based resources
- `ox_inventory` — If present, `bridge_HasItem` uses ox_inventory's item checks

## Resource Weight

- Idle resmon: < 0.01ms
- NUI bundle: < 100KB gzipped
- No persistent threads beyond the version check on startup
