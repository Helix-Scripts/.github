# MCP Tool Reference

Complete reference for all 32 MCP tools provided by helix_devtools. Tools marked with a shield icon require explicit opt-in in `config.lua`.

[[toc]]

## Server

### get_server_info

Get general server information including hostname, player count, game build, and uptime.

**Parameters:** None

**Example Response:**
```json
{
  "hostname": "My FiveM Server",
  "maxPlayers": 64,
  "playerCount": 12,
  "gameBuild": "2802",
  "totalResources": 47,
  "startedResources": 42,
  "serverUptime": 1711540000,
  "txAdmin": true
}
```

---

### list_players

List all currently connected players with their server ID, name, ping, and coordinates.

**Parameters:** None

**Example Response:**
```json
{
  "count": 2,
  "players": [
    {
      "serverId": 1,
      "name": "PlayerOne",
      "ping": 45,
      "coords": { "x": 215.3, "y": -810.5, "z": 30.7 },
      "endpoint": "192.168.1.100:12345"
    }
  ]
}
```

---

## Entity

### inspect_entity

Inspect a game entity by network ID. Returns position, health, model, state bags, and type-specific data.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `netId` | number | Yes | Network ID of the entity |

**Example Request:**
```json
{ "netId": 65535 }
```

**Example Response:**
```json
{
  "netId": 65535,
  "entityType": "vehicle",
  "model": 3462231032,
  "coords": { "x": 100.0, "y": -200.0, "z": 30.0 },
  "heading": 90.5,
  "health": 1000,
  "maxHealth": 1000,
  "networkOwner": 1,
  "bodyHealth": 1000
}
```

---

### list_entities

List all entities of a given type, or all types if omitted.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `entityType` | string | No | Filter: `"ped"`, `"vehicle"`, `"object"`, or `"all"` |
| `limit` | number | No | Max results (default 50) |

**Example Request:**
```json
{ "entityType": "vehicle", "limit": 10 }
```

**Example Response:**
```json
{
  "count": 3,
  "entities": [
    {
      "netId": 65535,
      "entityType": "vehicle",
      "model": 3462231032,
      "coords": { "x": 100.0, "y": -200.0, "z": 30.0 }
    }
  ]
}
```

---

### get_player_data

Get detailed information about a connected player by server ID. Includes identifiers, coordinates, health, and ping.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `serverId` | number | Yes | Server ID of the player |

**Example Request:**
```json
{ "serverId": 1 }
```

**Example Response:**
```json
{
  "serverId": 1,
  "name": "PlayerOne",
  "identifiers": ["license:abc123", "discord:123456"],
  "numTokens": 3,
  "ping": 45,
  "endpoint": "192.168.1.100:12345",
  "coords": { "x": 215.3, "y": -810.5, "z": 30.7 },
  "health": 200,
  "maxHealth": 200
}
```

---

## State Bags

### read_state_bag

Read a value from a state bag.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `scope` | string | Yes | `"global"`, `"player:<id>"`, or `"entity:<netId>"` |
| `key` | string | Yes | State bag key to read |

**Example Request:**
```json
{ "scope": "player:1", "key": "hunger" }
```

**Example Response:**
```json
{
  "scope": "player:1",
  "key": "hunger",
  "value": 85.5,
  "type": "number"
}
```

---

### list_state_bag_keys

List all tracked state bag keys for a given scope, or list all tracked scopes.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `scope` | string | No | Scope to list keys for. Omit to list all tracked scopes. |

**Example Request (list scopes):**
```json
{}
```

**Example Response:**
```json
{
  "count": 3,
  "scopes": [
    { "scope": "global", "keyCount": 5 },
    { "scope": "player:1", "keyCount": 12 },
    { "scope": "entity:65535", "keyCount": 2 }
  ]
}
```

**Example Request (list keys):**
```json
{ "scope": "player:1" }
```

**Example Response:**
```json
{
  "scope": "player:1",
  "count": 2,
  "keys": [
    { "key": "hunger", "value": 85.5, "type": "number" },
    { "key": "job", "value": "police", "type": "string" }
  ]
}
```

---

### write_state_bag

Write a value to a state bag.

**Dangerous** — Requires `enableWriteStateBag = true` in config.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `scope` | string | Yes | State bag scope |
| `key` | string | Yes | State bag key |
| `value` | any | Yes | Value to set |
| `replicated` | boolean | No | Replicate to clients (default `true`) |

**Example Request:**
```json
{ "scope": "player:1", "key": "hunger", "value": 100.0 }
```

**Example Response:**
```json
{
  "success": true,
  "scope": "player:1",
  "key": "hunger",
  "replicated": true
}
```

---

### watch_state_bag

Get the current value and register a state bag key for change notifications in the SSE event stream.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `scope` | string | Yes | State bag scope |
| `key` | string | Yes | Key to watch |

**Example Request:**
```json
{ "scope": "global", "key": "weather" }
```

**Example Response:**
```json
{
  "scope": "global",
  "key": "weather",
  "currentValue": "clear",
  "watching": true
}
```

---

### unwatch_state_bag

Stop watching a state bag key for changes.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `scope` | string | Yes | State bag scope |
| `key` | string | Yes | Key to stop watching |

**Example Response:**
```json
{
  "scope": "global",
  "key": "weather",
  "watching": false
}
```

---

## Events

### list_recent_events

List recently intercepted events. Optionally filter by name pattern.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filter` | string | No | Lua pattern to match event names |
| `limit` | number | No | Max results (default 50) |

**Example Request:**
```json
{ "filter": "helix_", "limit": 10 }
```

**Example Response:**
```json
{
  "count": 2,
  "events": [
    {
      "name": "helix_economy:priceUpdate",
      "timestamp": 1711540123,
      "source": "helix_economy"
    }
  ]
}
```

---

### trigger_event

Trigger a server event with the given payload.

**Dangerous** — Requires `enableTriggerEvent = true` in config.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | Event name to trigger |
| `payload` | any | No | Event payload (unpacked as arguments if table) |

**Example Request:**
```json
{ "name": "helix_economy:forceRecalculate", "payload": ["water", "food"] }
```

**Example Response:**
```json
{ "success": true, "event": "helix_economy:forceRecalculate" }
```

---

### subscribe_events

Subscribe to events matching a Lua pattern. Matching events appear in the SSE event stream.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filter` | string | Yes | Lua pattern to match event names |

**Example Request:**
```json
{ "filter": "helix_" }
```

**Example Response:**
```json
{ "success": true, "filter": "helix_", "subscribed": true }
```

---

### unsubscribe_events

Unsubscribe from a previously subscribed event filter.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filter` | string | Yes | The filter pattern to unsubscribe from |

**Example Response:**
```json
{ "success": true, "filter": "helix_", "subscribed": false }
```

---

## Resources

### list_resources

List all resources on the server with their state.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filter` | string | No | Name filter (Lua pattern) |
| `onlyStarted` | boolean | No | Only return started resources |

**Example Request:**
```json
{ "filter": "helix_", "onlyStarted": true }
```

**Example Response:**
```json
{
  "count": 4,
  "resources": [
    {
      "name": "helix_lib",
      "state": "started",
      "author": "Helix Scripts",
      "version": "0.1.0",
      "description": "Core library for Helix Scripts"
    }
  ]
}
```

---

### get_resource_info

Get detailed resource information including metadata and dependencies.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | Resource name |

**Example Request:**
```json
{ "name": "helix_economy" }
```

**Example Response:**
```json
{
  "name": "helix_economy",
  "state": "started",
  "path": "/home/fivem/resources/helix_economy",
  "author": "Helix Scripts",
  "version": "1.0.0",
  "description": "Dynamic economy system",
  "dependencies": ["helix_lib", "oxmysql"]
}
```

---

### restart_resource

Stop and restart a resource.

**Dangerous** — Requires `enableRestartResource = true` in config.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | Resource name to restart |

**Example Request:**
```json
{ "name": "helix_economy" }
```

**Example Response:**
```json
{ "success": true, "resource": "helix_economy", "newState": "started" }
```

::: warning
Cannot restart `helix_devtools` itself — this would kill the MCP server.
:::

---

### start_resource

Start a stopped resource.

**Dangerous** — Requires `enableRestartResource = true` in config.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | Resource name to start |

**Example Response:**
```json
{ "success": true, "resource": "helix_hud", "previousState": "stopped", "newState": "started" }
```

---

### stop_resource

Stop a running resource.

**Dangerous** — Requires `enableRestartResource = true` in config.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | Resource name to stop |

**Example Response:**
```json
{ "success": true, "resource": "helix_hud", "previousState": "started", "newState": "stopped" }
```

::: warning
Cannot stop `helix_devtools` itself — self-protection is enforced.
:::

---

### ensure_resource

Ensure a resource is running: starts it if stopped, restarts it if already started. The idiomatic FiveM hot-reload primitive.

**Dangerous** — Requires `enableRestartResource = true` in config.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | Resource name to ensure |

**Example Response:**
```json
{ "success": true, "resource": "helix_npc", "action": "restarted", "previousState": "started", "newState": "started" }
```

---

### execute_command

Execute a server console command.

**Dangerous** — Requires `enableExecuteCommand = true` in config.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `command` | string | Yes | Console command to execute |

**Example Request:**
```json
{ "command": "status" }
```

**Example Response:**
```json
{
  "success": true,
  "command": "status",
  "note": "FiveM does not support capturing command output. Use get_recent_logs or list_resources to observe the effect."
}
```

::: danger
`quit` and `shutdown` commands are always blocked regardless of config.
:::

---

## Filesystem

All filesystem tools are **read-only** and scoped to FiveM resource directories. Path traversal (`..`) is rejected. Binary files are detected and content is withheld.

### list_resource_files

List files in a resource directory.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `resourceName` | string | Yes | Name of the resource |
| `subdirectory` | string | No | Subdirectory within the resource (e.g. `"client"`, `"server/mcp"`) |

**Example Request:**
```json
{ "resourceName": "helix_economy", "subdirectory": "server" }
```

**Example Response:**
```json
{
  "resource": "helix_economy",
  "directory": "server",
  "count": 5,
  "files": [
    { "name": "auctions", "path": "server/auctions", "isDirectory": true },
    { "name": "main.lua", "path": "server/main.lua", "isDirectory": false, "size": 4523 },
    { "name": "registry.lua", "path": "server/registry.lua", "isDirectory": false, "size": 8901 }
  ]
}
```

---

### read_resource_file

Read the contents of a file within a resource directory. Max 64KB.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `resourceName` | string | Yes | Name of the resource |
| `filePath` | string | Yes | Relative path within the resource (e.g. `"config.lua"`, `"shared/config.lua"`) |

**Example Request:**
```json
{ "resourceName": "helix_economy", "filePath": "config.lua" }
```

**Example Response:**
```json
{
  "resource": "helix_economy",
  "filePath": "config.lua",
  "size": 2048,
  "truncated": false,
  "content": "Config = {\n    ..."
}
```

---

## Logs

### get_recent_logs

Get recent server log entries. Optionally filter by severity level or resource name.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `limit` | number | No | Max entries (default 100) |
| `level` | string | No | Filter: `"info"`, `"warn"`, or `"error"` |
| `resource` | string | No | Filter by resource name (Lua pattern) |

**Example Request:**
```json
{ "level": "error", "limit": 10 }
```

**Example Response:**
```json
{
  "count": 1,
  "logs": [
    {
      "level": "error",
      "resource": "helix_economy",
      "message": "Failed to load price history from database",
      "timestamp": 1711540100
    }
  ]
}
```

---

### subscribe_logs

Subscribe to real-time log entries in the SSE event stream.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `level` | string | No | Only stream logs of this severity |
| `resource` | string | No | Only stream logs from this resource (Lua pattern) |

**Example Request:**
```json
{ "level": "error" }
```

**Example Response:**
```json
{
  "success": true,
  "subscriptionId": "1711540123_4567",
  "filters": { "level": "error", "resource": null }
}
```

---

### unsubscribe_logs

Remove a log stream subscription.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `subscriptionId` | string | Yes | The subscription ID from `subscribe_logs` |

**Example Response:**
```json
{ "success": true, "subscriptionId": "1711540123_4567", "subscribed": false }
```

---

## Helix Integration

These tools interact with other Helix Scripts resources. They return errors gracefully if the required resource is not running.

### get_item_price

Get current price for an item from helix_economy.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `item` | string | Yes | Item name/ID |

**Example Request:**
```json
{ "item": "water" }
```

**Example Response:**
```json
{ "item": "water", "price": 15.50 }
```

---

### inject_supply

Inject supply units for an item in helix_economy.

**Dangerous** — Requires helix_economy config opt-in.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `item` | string | Yes | Item name/ID |
| `amount` | number | Yes | Supply units to inject |

**Example Request:**
```json
{ "item": "water", "amount": 500 }
```

**Example Response:**
```json
{ "success": true, "item": "water", "amount": 500 }
```

---

### get_economy_health

Get economy health report from helix_economy.

**Parameters:** None

**Example Response:**
```json
{
  "totalItems": 45,
  "avgPriceDeviation": 0.12,
  "inflationIndex": 1.03,
  "activeTraders": 8,
  "transactionsToday": 234
}
```

---

### list_npcs

List all spawned NPCs from helix_npc.

**Parameters:** None

**Example Response:**
```json
{
  "count": 3,
  "npcs": [
    {
      "id": "shopkeeper_01",
      "name": "Miguel",
      "model": "a_m_y_business_02",
      "coords": { "x": 25.7, "y": -1347.3, "z": 29.5 },
      "currentSchedule": "working"
    }
  ]
}
```

---

### get_npc_memory

Get NPC memory for a specific player interaction.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `npcId` | string | Yes | NPC identifier |
| `playerId` | number | Yes | Server ID of the player |

**Example Request:**
```json
{ "npcId": "shopkeeper_01", "playerId": 1 }
```

**Example Response:**
```json
{
  "npcId": "shopkeeper_01",
  "playerId": 1,
  "reputation": 75,
  "interactionCount": 12,
  "lastSeen": 1711530000,
  "memories": [
    { "type": "trade", "detail": "Bought 5 water bottles", "timestamp": 1711529000 }
  ]
}
```

---

### trigger_dialogue

Trigger a dialogue interaction between an NPC and a player.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `npcId` | string | Yes | NPC identifier |
| `playerId` | number | Yes | Server ID of the player |

**Example Request:**
```json
{ "npcId": "shopkeeper_01", "playerId": 1 }
```

**Example Response:**
```json
{ "success": true, "npcId": "shopkeeper_01", "playerId": 1 }
```
