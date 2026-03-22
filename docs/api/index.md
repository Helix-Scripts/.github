# API Reference

Complete reference for all `helix_lib` modules and exports.

## Framework Bridge

The bridge auto-detects your framework and provides a unified API. All functions return consistent data shapes regardless of whether you run ESX, QBCore, or Qbox.

### Usage

```lua
local bridge = exports.helix_lib:bridge()
```

### Server Functions

#### `bridge.GetPlayer(source)`

Returns a normalised player object.

```lua
---@param source number Player server ID
---@return HelixPlayer?
```

**HelixPlayer shape:**

```lua
{
  source     = 1,           -- number
  name       = 'John Doe',  -- string (character name)
  identifier = 'ABC12345',  -- string (citizenid / identifier)
  job = {
    name       = 'police',  -- string
    label      = 'Police',  -- string
    grade      = 3,         -- number
    gradeLabel = 'Sergeant',-- string
    onDuty     = true,      -- boolean
  },
  gang = {                  -- HelixGang? (nil if none)
    name       = 'ballas',
    label      = 'Ballas',
    grade      = 0,
    gradeLabel = 'Recruit',
  },
  money = {
    cash   = 5000,          -- number
    bank   = 25000,         -- number
    crypto = 0,             -- number (Qbox/QBCore only)
  },
}
```

#### `bridge.GetPlayerMoney(source, moneyType?)`

```lua
---@param source number
---@param moneyType? string Default: 'cash'
---@return number
```

#### `bridge.GetPlayerJob(source)`

```lua
---@param source number
---@return HelixJob?
```

Returns `{ name, label, grade, gradeLabel, onDuty }`.

#### `bridge.GetPlayerIdentifier(source)`

```lua
---@param source number
---@return string?
```

#### `bridge.AddMoney(source, amount, moneyType?)`

```lua
---@param source number
---@param amount number
---@param moneyType? string Default: 'cash'
---@return boolean success
```

#### `bridge.RemoveMoney(source, amount, moneyType?)`

```lua
---@param source number
---@param amount number
---@param moneyType? string Default: 'cash'
---@return boolean success
```

#### `bridge.HasItem(source, item, count?)`

Checks player inventory. Uses `ox_inventory` if available, otherwise falls back to the framework's native inventory.

```lua
---@param source number
---@param item string Item name
---@param count? number Minimum count (default: 1)
---@return boolean
```

#### `bridge.Notify(source, message, type?, duration?)`

Sends a notification. On server, triggers a client event. On client, uses `ox_lib` if available, otherwise falls back to framework notifications.

```lua
---@param source number
---@param message string
---@param type? string 'success' | 'error' | 'warning' | 'info'
---@param duration? number Duration in milliseconds (default: 5000)
```

### Utility Functions

#### `bridge.getFramework()`

```lua
---@return string -- 'qbox' | 'qbcore' | 'esx' | 'standalone'
```

#### `bridge.is(framework)`

```lua
---@param framework string
---@return boolean
```

---

## Config System

Load, merge, and hot-reload Lua config tables.

### Usage

```lua
local config = exports.helix_lib:config()
```

### Functions

#### `config.load(resourceName, defaults?)`

Loads `config.lua` from the given resource and merges with optional defaults.

```lua
---@param resourceName string
---@param defaults? table
---@return table config
```

#### `config.get(resourceName)`

Returns a previously loaded config (does not re-read from disk).

```lua
---@param resourceName string
---@return table?
```

#### `config.reload(resourceName)`

Re-reads the config from disk and notifies all watchers.

```lua
---@param resourceName string
```

#### `config.onReload(resourceName, callback)`

Registers a function to call when the config is reloaded.

```lua
---@param resourceName string
---@param cb fun(newConfig: table)
```

---

## Callback System

RPC-style server/client callbacks. If `ox_lib` is present, defers to its callback system for compatibility.

### Server — Register

```lua
local callback = exports.helix_lib:callback()

callback.register('myScript:getData', function(source, arg1, arg2)
    -- source is the requesting player's server ID
    return { items = getItems(source) }
end)
```

### Client — Trigger

```lua
local callback = exports.helix_lib:callback()

-- With callback function
callback.trigger('myScript:getData', function(result)
    print(result.items)
end, arg1, arg2)

-- With await (blocking)
local result = callback.await('myScript:getData', arg1, arg2)
print(result.items)
```

::: tip ox_lib Compatibility
When `ox_lib` is present, `helix_lib` wraps its callback system. The API stays identical — your code works the same with or without `ox_lib`.
:::

---

## Locale System

Multi-language translations with `string.format` interpolation.

### Usage

```lua
local locale = exports.helix_lib:locale()
```

### Functions

#### `locale.load(lang, translations)`

Register translations for a language.

```lua
locale.load('en', {
    greeting = 'Hello, %s!',
    money_format = '$%s',
})
```

#### `locale.loadFile(lang, resourceName?)`

Load translations from `locales/<lang>.lua` in the given resource.

```lua
locale.loadFile('en')               -- loads from current resource
locale.loadFile('en', 'helix_hud')  -- loads from another resource
```

#### `locale.set(lang)`

Set the active locale.

```lua
locale.set('nl')
```

#### `locale.current()`

Returns the current locale code.

```lua
local lang = locale.current() -- 'en'
```

#### `locale.t(key, ...)`

Translate a key with optional format arguments. Falls back to English if the key is missing in the current locale.

```lua
locale.t('greeting', 'Alex') -- "Hello, Alex!"
locale.t('missing_key')      -- returns 'missing_key' as-is
```

#### `locale.has(key, lang?)`

Check whether a translation key exists.

```lua
locale.has('greeting')       -- true
locale.has('greeting', 'de') -- false (if German not loaded)
```

---

## NUI Hooks (TypeScript)

React hooks for communicating between the NUI layer and Lua.

### `useNuiEvent<T>(action, handler)`

Listen for NUI messages from Lua.

```typescript
useNuiEvent<PlayerData>('updatePlayer', (data) => {
  setPlayer(data);
});
```

### `useNuiCallback<T>(callbackName)`

Send data to Lua and get a response.

```typescript
const { data, loading, error, execute } = useNuiCallback<SaveResponse>('saveConfig');

await execute({ key: 'value' });
```

### `useKeyPress(key, handler)`

Listen for keyboard shortcuts.

```typescript
useKeyPress('Escape', () => setVisible(false));
```

### `useNuiClose(onClose)`

Convenience hook that posts a `close` message to the Lua client.

```typescript
useNuiClose(() => {
  // cleanup before closing
});
```

---

## NUI Components (React)

Shared UI components using the Helix design system.

### `<Button>`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `loading` | `boolean` | `false` | Show spinner, disable interaction |
| `icon` | `ReactNode` | — | Icon before label |

### `<Input>`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'text' \| 'number' \| 'search' \| 'password'` | `'text'` | Input type |
| `label` | `string` | — | Label text |
| `error` | `string` | — | Validation error message |
| `icon` | `ReactNode` | — | Leading icon |

### `<Panel>`

Draggable container with optional title bar and close button.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Panel header text |
| `draggable` | `boolean` | `true` | Allow dragging by header |
| `onClose` | `() => void` | — | Close button handler |
| `width` / `height` | `number \| string` | — | Panel dimensions |
| `initialX` / `initialY` | `number` | — | Initial position |

### `<Select>`

Dropdown with search/filter.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `SelectOption[]` | `[]` | `{ value, label }` pairs |
| `value` | `string` | — | Selected value |
| `onChange` | `(value: string) => void` | — | Change handler |
| `searchable` | `boolean` | `true` | Enable search filter |
| `label` | `string` | — | Label text |
| `placeholder` | `string` | — | Placeholder text |

### `<DataTable>`

Sortable, filterable data table.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `Column[]` | — | `{ key, header, sortable?, render? }` |
| `data` | `Record<string, unknown>[]` | `[]` | Row data |
| `filterable` | `boolean` | `true` | Show search filter |
| `pageSize` | `number` | — | Rows per page |

### `<Modal>`

Overlay dialog with escape/backdrop dismissal.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Visibility |
| `onClose` | `() => void` | — | Close handler |
| `title` | `string` | — | Modal title |
| `variant` | `'confirm' \| 'form' \| 'info'` | `'info'` | Semantic variant |
| `closeOnEscape` | `boolean` | `true` | Close on Escape key |
| `closeOnBackdrop` | `boolean` | `true` | Close on backdrop click |
| `footer` | `ReactNode` | — | Footer content (buttons) |

### `<Toast>` / `<ToastProvider>`

Notification toasts with auto-dismiss.

```tsx
// Wrap your app
<ToastProvider position="top-right">
  <App />
</ToastProvider>

// Inside any component
const { addToast } = useToast();
addToast({ message: 'Saved!', type: 'success', duration: 3000 });
```

| Toast type | Description |
|------------|-------------|
| `'success'` | Green — operation succeeded |
| `'error'` | Red — something went wrong |
| `'warning'` | Amber — caution |
| `'info'` | Blue — informational |

### `<ProgressBar>`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Progress 0–100 |
| `variant` | `'linear' \| 'circular'` | `'linear'` | Display style |
| `showLabel` | `boolean` | `true` | Show percentage text |
| `color` | `string` | accent | Custom CSS color |
| `size` | `number` | — | Diameter (circular only) |

### `<Tabs>`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `TabItem[]` | — | `{ key, label, content }` |
| `defaultTab` | `string` | — | Initially active tab key |
| `onChange` | `(key: string) => void` | — | Tab change handler |

### `<Badge>`

Status indicator label.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'success' \| 'warning' \| 'error' \| 'info' \| 'neutral'` | `'neutral'` | Color variant |
| `children` | `ReactNode` | — | Badge text |

---

## Exports Summary

### Client Exports

| Export | Returns | Description |
|--------|---------|-------------|
| `bridge()` | `HelixBridge` | Framework bridge |
| `config()` | `HelixConfig` | Config manager |
| `locale()` | `HelixLocale` | Locale manager |
| `callback()` | `HelixCallback` | Callback system |
| `notify(msg, type?, duration?)` | `void` | Client-side notification |

### Server Exports

| Export | Returns | Description |
|--------|---------|-------------|
| `bridge()` | `HelixBridge` | Framework bridge |
| `config()` | `HelixConfig` | Config manager |
| `locale()` | `HelixLocale` | Locale manager |
| `callback()` | `HelixServerCallback` | Callback registrar |
| `getPlayer(source)` | `HelixPlayer?` | Unified player object |
| `getPlayers()` | `HelixPlayer[]` | All connected players |
