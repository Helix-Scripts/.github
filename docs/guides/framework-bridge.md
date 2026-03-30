# Framework Bridge Guide

The framework bridge is the core of `helix_lib`. It abstracts the differences between ESX, QBCore, and Qbox so you can write framework-agnostic scripts.

## How it works

On resource start, `helix_lib` checks which framework is running:

1. Is `qbx_core` started? → **Qbox**
2. Is `qb-core` started? → **QBCore**
3. Is `es_extended` started? → **ESX**
4. None? → **Standalone** (all bridge functions return nil/false/0)

You can override this with `framework = 'esx'` in `config.lua`.

## Supported Frameworks

### Qbox (`qbx_core`)

Full support. Player data comes from QBX exports. Gang data is included.

```lua
local player = exports.helix_lib:bridge_GetPlayer(source)
-- player.gang is populated (Qbox has gang system)
-- player.money includes 'crypto' key
```

### QBCore (`qb-core`)

Full support. Player data comes from `QBCore:GetPlayer()`.

```lua
local player = exports.helix_lib:bridge_GetPlayer(source)
-- player.gang is populated (QBCore has gang system)
-- player.money includes 'crypto' key
```

### ESX (`es_extended`)

Full support. Player data comes from `ESX.GetPlayerFromId()`.

```lua
local player = exports.helix_lib:bridge_GetPlayer(source)
-- player.gang is nil (ESX has no built-in gang system)
-- player.money does NOT include 'crypto' by default
```

### Standalone

Fallback mode. All bridge functions return safe defaults:

| Function | Returns |
|----------|---------|
| `bridge_GetPlayer` | `nil` |
| `bridge_GetPlayerMoney` | `0` |
| `bridge_GetPlayerJob` | `nil` |
| `bridge_GetPlayerIdentifier` | `nil` |
| `bridge_AddMoney` | `false` |
| `bridge_RemoveMoney` | `false` |
| `bridge_HasItem` | `false` |
| `bridge_Notify` | no-op |

## Data Shape Differences

### Player Money

| Framework | Available types |
|-----------|----------------|
| Qbox | `cash`, `bank`, `crypto` |
| QBCore | `cash`, `bank`, `crypto` |
| ESX | `cash`, `bank`, `black_money` |
| Standalone | none (returns `0`) |

### Player Identifier

| Framework | Format |
|-----------|--------|
| Qbox | CitizenID (e.g. `ABC12345`) |
| QBCore | CitizenID (e.g. `ABC12345`) |
| ESX | License identifier |
| Standalone | `nil` |

### Gangs

Qbox and QBCore return gang data on the player object. ESX does not have a built-in gang system — `player.gang` will be `nil`.

## Common Patterns

### Framework-specific branching (when you must)

```lua
if exports.helix_lib:bridge_is('esx') then
    -- ESX-specific logic (rare, but sometimes needed)
elseif exports.helix_lib:bridge_is('qbox') or exports.helix_lib:bridge_is('qbcore') then
    -- QB-family logic
end
```

### Checking job before an action

```lua
-- Server-side
local job = exports.helix_lib:bridge_GetPlayerJob(source)
if job and job.name == 'police' and job.onDuty then
    -- Player is an on-duty police officer
end
```

### Money transaction with validation

```lua
local balance = exports.helix_lib:bridge_GetPlayerMoney(source, 'cash')
if balance >= price then
    local ok = exports.helix_lib:bridge_RemoveMoney(source, price, 'cash')
    if ok then
        exports.helix_lib:bridge_Notify(source, 'Purchase complete!', 'success')
    end
else
    exports.helix_lib:bridge_Notify(source, 'Not enough cash.', 'error')
end
```

### Inventory checks

```lua
if exports.helix_lib:bridge_HasItem(source, 'lockpick') then
    -- Player has a lockpick
end

-- Check for minimum quantity
if exports.helix_lib:bridge_HasItem(source, 'water', 3) then
    -- Player has at least 3 water bottles
end
```

## ox_lib Integration

If `ox_lib` is running on your server, the callback system automatically routes through ox_lib's callback implementation. This means:

- Callbacks registered via `helix_lib` are compatible with `ox_lib` callback consumers
- No code changes needed — the API is identical
- If `ox_lib` is removed later, everything still works (falls back to native implementation)
