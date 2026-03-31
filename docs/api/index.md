# API Reference

Complete reference for all `helix_lib` exports. All exports use the flat per-function pattern to survive FiveM's export proxy.

**Usage pattern:**
```lua
-- Correct (flat export)
exports.helix_lib:bridge_GetPlayer(source)

-- WRONG (old table pattern — does not work)
-- exports.helix_lib:bridge().GetPlayer(source)
```

---

## Bridge Exports

### `bridge_framework`

Returns the name of the detected framework.

**Side:** Client, Server

```lua
local fw = exports.helix_lib:bridge_framework()
-- Returns: 'qbox' | 'qbcore' | 'esx' | 'standalone'
```

### `bridge_getFramework`

Same as `bridge_framework` but as a function call. Useful if you need to re-detect after a resource restart.

**Side:** Client, Server

```lua
local fw = exports.helix_lib:bridge_getFramework()
```

### `bridge_is`

Check if a specific framework is active.

**Side:** Client, Server

```lua
---@param framework string  'qbox' | 'qbcore' | 'esx' | 'standalone'
---@return boolean
local isQbox = exports.helix_lib:bridge_is('qbox')
```

### `bridge_GetPlayer`

Returns a normalised player object. **Server-only.**

**Side:** Server

```lua
---@param source number  Player server ID
---@return HelixPlayer?
local player = exports.helix_lib:bridge_GetPlayer(source)
```

**HelixPlayer shape:**
```lua
{
    source     = 1,
    name       = 'John Doe',
    identifier = 'ABC12345',
    job = {
        name       = 'police',
        label      = 'Police',
        grade      = 3,
        gradeLabel = 'Sergeant',
        onDuty     = true,
    },
    gang = {                  -- nil if no gang system
        name       = 'ballas',
        label      = 'Ballas',
        grade      = 0,
        gradeLabel = 'Recruit',
    },
    money = {
        cash   = 5000,
        bank   = 25000,
        crypto = 0,           -- Qbox/QBCore only
    },
}
```

### `bridge_GetPlayerMoney`

Get a player's money balance.

**Side:** Client, Server

```lua
---@param source number      Player server ID
---@param moneyType? string  'cash' | 'bank' | 'crypto' (default: 'cash')
---@return number?
local cash = exports.helix_lib:bridge_GetPlayerMoney(source, 'cash')
```

### `bridge_GetPlayerJob`

Get a player's job info.

**Side:** Client, Server

```lua
---@param source number
---@return HelixJob?
local job = exports.helix_lib:bridge_GetPlayerJob(source)
-- Returns: { name, label, grade, gradeLabel, onDuty }
```

### `bridge_GetPlayerIdentifier`

Get a player's primary identifier (citizenid for QB/Qbox, identifier for ESX).

**Side:** Client, Server

```lua
---@param source number
---@return string?
local id = exports.helix_lib:bridge_GetPlayerIdentifier(source)
```

### `bridge_AddMoney`

Add money to a player's account.

**Side:** Client, Server

```lua
---@param source number
---@param amount number
---@param moneyType? string  Default: 'cash'
---@return boolean success
local ok = exports.helix_lib:bridge_AddMoney(source, 5000, 'bank')
```

### `bridge_RemoveMoney`

Remove money from a player's account.

**Side:** Client, Server

```lua
---@param source number
---@param amount number
---@param moneyType? string  Default: 'cash'
---@return boolean success
local ok = exports.helix_lib:bridge_RemoveMoney(source, 500, 'cash')
```

### `bridge_HasItem`

Check if a player has an item. Uses `ox_inventory` if available, otherwise falls back to framework native inventory.

**Side:** Client, Server

```lua
---@param source number
---@param item string      Item name
---@param count? number    Minimum count (default: 1)
---@return boolean
local has = exports.helix_lib:bridge_HasItem(source, 'water', 2)
```

### `bridge_Notify`

Send a notification to a player. On server, triggers a client event. On client, uses framework notification system.

**Side:** Client, Server

```lua
---@param source number       Player server ID (nil on client)
---@param message string
---@param type? string        'success' | 'error' | 'warning' | 'info'
---@param duration? number    Duration in ms (default: 5000)
exports.helix_lib:bridge_Notify(source, 'Item added!', 'success', 3000)
```

---

## Config Exports

### `config`

Returns the Config module. Use its methods to load, get, and reload configs.

**Side:** Client, Server

```lua
local Config = exports.helix_lib:config()
```

**Config methods:**

#### `Config.load(resourceName, defaults?)`

Load `config.lua` from a resource and merge with optional defaults.

```lua
---@param resourceName string
---@param defaults? table
---@return table
local cfg = Config.load('helix_hud', { position = 'bottom-center' })
```

#### `Config.get(resourceName)`

Get a previously loaded config (does not re-read from disk).

```lua
---@param resourceName string
---@return table?
local cfg = Config.get('helix_lib')
```

#### `Config.reload(resourceName)`

Re-read config from disk and notify all watchers.

```lua
Config.reload('helix_hud')
```

#### `Config.onReload(resourceName, callback)`

Register a callback for config changes.

```lua
Config.onReload('helix_hud', function(newConfig)
    print('Config updated, new position:', newConfig.position)
end)
```

#### `Config.merge(source, target)`

Deep-merge two tables. Target values override source.

```lua
local merged = Config.merge(defaults, overrides)
```

---

## Locale Exports

### `locale_t`

Translate a key with optional format arguments. Falls back to English if missing in current locale. Returns the key itself if no translation exists.

**Side:** Client, Server

```lua
---@param key string
---@param ... any        Format arguments for string.format
---@return string
local msg = exports.helix_lib:locale_t('greeting', 'Alex')
-- "Hello, Alex!"
```

### `locale_has`

Check if a translation key exists.

**Side:** Client, Server

```lua
---@param key string
---@param lang? string   Language to check (default: current locale)
---@return boolean
local exists = exports.helix_lib:locale_has('greeting')
```

### `locale_current`

Get the active locale code.

**Side:** Client, Server

```lua
---@return string
local lang = exports.helix_lib:locale_current() -- 'en'
```

### `locale_set`

Set the active locale.

**Side:** Client, Server

```lua
---@param lang string
exports.helix_lib:locale_set('nl')
```

### `locale_load`

Register translations for a language from a table.

**Side:** Client, Server

```lua
---@param lang string
---@param translations table<string, string>
exports.helix_lib:locale_load('en', {
    greeting = 'Hello, %s!',
    farewell = 'Goodbye, %s.',
})
```

### `locale_loadFile`

Load translations from `locales/<lang>.lua` in a resource.

**Side:** Client, Server

```lua
---@param lang string
---@param resourceName? string   Defaults to current resource
---@return boolean success
exports.helix_lib:locale_loadFile('en')
exports.helix_lib:locale_loadFile('en', 'helix_hud')
```

---

## Callback Exports

### `callback_register`

Register a server-side callback handler. **Server-only.**

**Side:** Server

```lua
---@param name string         Callback name
---@param cb fun(source: number, ...): any
exports.helix_lib:callback_register('myScript:getData', function(source, category)
    return getItems(source, category)
end)
```

### `callback_trigger`

Trigger a server callback asynchronously. The callback function receives the result. **Client-only.**

**Side:** Client

```lua
---@param name string         Callback name
---@param cb fun(result: any) Callback with result
---@param ... any             Arguments passed to server handler
exports.helix_lib:callback_trigger('myScript:getData', function(result)
    print(result)
end, 'weapons')
```

### `callback_await`

Trigger a server callback and block until the result arrives. **Client-only.**

**Side:** Client

```lua
---@param name string
---@param ... any
---@return any result
local items = exports.helix_lib:callback_await('myScript:getData', 'weapons')
```

::: tip ox_lib Compatibility
When `ox_lib` is present, callbacks route through its system. The API stays identical — your code works the same with or without `ox_lib`.
:::

---

## Convenience Exports

### `notify`

Client-side shorthand for sending a notification to the local player.

**Side:** Client

```lua
---@param message string
---@param type? string       'success' | 'error' | 'warning' | 'info'
---@param duration? number   Duration in ms (default: 5000)
exports.helix_lib:notify('Inventory updated!', 'success')
```

### `getPlayer`

Server-side convenience wrapper around `bridge_GetPlayer`.

**Side:** Server

```lua
---@param source number
---@return HelixPlayer?
local player = exports.helix_lib:getPlayer(source)
```

### `getPlayers`

Get all online players as HelixPlayer objects.

**Side:** Server

```lua
---@return HelixPlayer[]
local players = exports.helix_lib:getPlayers()
for _, p in ipairs(players) do
    print(p.name, p.source)
end
```

---

## Export Summary

### Client Exports

| Export | Returns | Description |
|--------|---------|-------------|
| `bridge_framework()` | `string` | Detected framework name |
| `bridge_getFramework()` | `string` | Detected framework (function form) |
| `bridge_is(fw)` | `boolean` | Check if framework matches |
| `bridge_GetPlayerMoney(src, type?)` | `number?` | Player money balance (nil on invalid source) |
| `bridge_GetPlayerJob(src)` | `HelixJob?` | Player job info |
| `bridge_GetPlayerIdentifier(src)` | `string?` | Player identifier |
| `bridge_AddMoney(src, amt, type?)` | `boolean` | Add money |
| `bridge_RemoveMoney(src, amt, type?)` | `boolean` | Remove money |
| `bridge_HasItem(src, item, count?)` | `boolean` | Check inventory |
| `bridge_Notify(src, msg, type?, dur?)` | `void` | Send notification |
| `config()` | `HelixConfig` | Config module |
| `locale_t(key, ...)` | `string` | Translate a key |
| `locale_has(key, lang?)` | `boolean` | Check if key exists |
| `locale_current()` | `string` | Active locale code |
| `locale_set(lang)` | `void` | Set active locale |
| `locale_load(lang, tbl)` | `void` | Load translations |
| `locale_loadFile(lang, res?)` | `boolean` | Load from file |
| `callback_trigger(name, cb, ...)` | `void` | Async server callback |
| `callback_await(name, ...)` | `any` | Blocking server callback |
| `notify(msg, type?, dur?)` | `void` | Local notification |

### Server Exports

| Export | Returns | Description |
|--------|---------|-------------|
| `bridge_framework()` | `string` | Detected framework name |
| `bridge_getFramework()` | `string` | Detected framework (function form) |
| `bridge_is(fw)` | `boolean` | Check if framework matches |
| `bridge_GetPlayer(src)` | `HelixPlayer?` | Full player object |
| `bridge_GetPlayerMoney(src, type?)` | `number?` | Player money balance (nil on invalid source) |
| `bridge_GetPlayerJob(src)` | `HelixJob?` | Player job info |
| `bridge_GetPlayerIdentifier(src)` | `string?` | Player identifier |
| `bridge_AddMoney(src, amt, type?)` | `boolean` | Add money |
| `bridge_RemoveMoney(src, amt, type?)` | `boolean` | Remove money |
| `bridge_HasItem(src, item, count?)` | `boolean` | Check inventory |
| `bridge_Notify(src, msg, type?, dur?)` | `void` | Send notification |
| `config()` | `HelixConfig` | Config module |
| `locale_t(key, ...)` | `string` | Translate a key |
| `locale_has(key, lang?)` | `boolean` | Check if key exists |
| `locale_current()` | `string` | Active locale code |
| `locale_set(lang)` | `void` | Set active locale |
| `locale_load(lang, tbl)` | `void` | Load translations |
| `locale_loadFile(lang, res?)` | `boolean` | Load from file |
| `callback_register(name, cb)` | `void` | Register server callback |
| `getPlayer(src)` | `HelixPlayer?` | Convenience player getter |
| `getPlayers()` | `HelixPlayer[]` | All online players |
