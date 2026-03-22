# API Reference

::: info Work in Progress
Full API documentation is coming soon. Below is a summary of the exports provided by `helix_lib`.
:::

## Client exports

| Export | Signature | Description |
|--------|-----------|-------------|
| `bridge` | `exports.helix_lib:bridge()` | Returns the framework bridge table |
| `config` | `exports.helix_lib:config()` | Returns the config manager |
| `locale` | `exports.helix_lib:locale()` | Returns the locale manager |
| `callback` | `exports.helix_lib:callback(name, ...)` | Triggers a registered server callback and returns the result |
| `notify` | `exports.helix_lib:notify(msg, type?, duration?)` | Displays a notification to the player |

## Server exports

| Export | Signature | Description |
|--------|-----------|-------------|
| `bridge` | `exports.helix_lib:bridge()` | Returns the framework bridge table |
| `config` | `exports.helix_lib:config()` | Returns the config manager |
| `locale` | `exports.helix_lib:locale()` | Returns the locale manager |
| `callback` | `exports.helix_lib:callback(name, handler)` | Registers a server callback |
| `getPlayer` | `exports.helix_lib:getPlayer(source)` | Returns a unified player object for the given source |
| `getPlayers` | `exports.helix_lib:getPlayers()` | Returns all connected player objects |
