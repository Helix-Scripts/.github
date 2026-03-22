# helix_lib

`helix_lib` is the shared foundation for every Helix script. It provides a unified API layer across frameworks, a config system, NUI design tokens, localisation, and more.

**License:** MIT | **Price:** Free | **Source:** [GitHub](https://github.com/Helix-Scripts/helix_lib)

---

## Modules

### Framework Bridge

Abstracts ESX, QBCore, and Qbox behind a single API so your code works everywhere without framework-specific branches.

```lua
local bridge = exports.helix_lib:bridge()

-- Get the player's job (works on ESX, QBCore, and Qbox)
local job = bridge.getPlayerJob(source)
print(job.name, job.grade)
```

**Key functions:**

| Function | Side | Description |
|----------|------|-------------|
| `bridge.getPlayerJob(src)` | Server | Returns `{ name, label, grade, gradeLabel }` |
| `bridge.getPlayerMoney(src, account?)` | Server | Returns balance for the given account |
| `bridge.getPlayerName(src)` | Server | Returns the character's full name |
| `bridge.getPlayers()` | Server | Returns an array of all connected player sources |
| `bridge.notify(msg, type?, duration?)` | Client | Sends a notification to the player |

---

### Config System

Load and hot-reload Lua config tables at runtime.

```lua
local config = exports.helix_lib:config()

local hud = config.get('helix_hud')
print(hud.position) -- 'bottom-center'
```

See the [Configuration guide](/getting-started/configuration) for details on writing config files.

---

### Callback System

Framework-agnostic server/client callbacks with automatic promise support.

```lua
-- Server: register a callback
exports.helix_lib:callback('helix:getInventory', function(source)
    local items = getPlayerItems(source)
    return items
end)

-- Client: trigger the callback
local items = exports.helix_lib:callback('helix:getInventory')
for _, item in ipairs(items) do
    print(item.name, item.count)
end
```

---

### NUI Design System

A shared set of React components and CSS design tokens so every Helix NUI has a consistent look and feel.

- Colour tokens follow the teal/cyan palette
- Typography, spacing, and border-radius are standardised
- Dark mode by default with optional light mode toggle

```lua
-- Client: send data to the NUI
exports.helix_lib:notify('Inventory updated', 'success')
```

---

### Locale System

Multi-language support with interpolation.

```lua
local locale = exports.helix_lib:locale()

-- locale/en.lua: { greeting = 'Hello, %s!' }
print(locale.t('greeting', 'Alex')) -- "Hello, Alex!"
```

Add translations by creating files in the `locale/` directory of any Helix resource (e.g. `locale/en.lua`, `locale/fr.lua`).

---

### Version Check

Automatic update checking against GitHub releases. Prints a console warning on start-up if a newer version is available. No outbound telemetry — only a single GitHub API call per resource start.

---

## Exports summary

### Client

| Export | Description |
|--------|-------------|
| `bridge()` | Returns the framework bridge table |
| `config()` | Returns the config manager |
| `locale()` | Returns the locale manager |
| `callback(name, ...)` | Triggers a server callback |
| `notify(msg, type?, duration?)` | Shows a notification |

### Server

| Export | Description |
|--------|-------------|
| `bridge()` | Returns the framework bridge table |
| `config()` | Returns the config manager |
| `locale()` | Returns the locale manager |
| `callback(name, handler)` | Registers a callback |
| `getPlayer(src)` | Returns a unified player object |
| `getPlayers()` | Returns all connected player objects |
