# helix_hud

`helix_hud` is a high-performance FiveM HUD that leverages the [helix_lib](/scripts/helix-lib) framework bridge and NUI design system for a seamless experience across ESX, QBCore, and Qbox.

**Version:** 1.0.0 | **License:** MIT | **Dependency:** [helix_lib](./helix-lib)

---

## Features

- **Sub-0.05ms idle resmon** — Built for performance with zero polling overhead
- **Event-driven updates** — Player data (money, job) synced via framework events, not polling
- **Vehicle HUD** — Speed, fuel, seatbelt, and engine status when in a vehicle
- **Status bars** — Health, armour, hunger, thirst, stress (configurable)
- **Pause menu awareness** — HUD auto-hides in the pause menu
- **Framework agnostic** — Works identically on ESX, QBCore, and Qbox via helix_lib bridge

## Requirements

- [helix_lib](./helix-lib) (required)

## Installation

1. Download the latest release from [GitHub](https://github.com/Helix-Scripts/helix-hud/releases)
2. Place `helix_hud` in your resources folder
3. Add `ensure helix_hud` to your `server.cfg` (after `helix_lib`)
4. Configure `config.lua` to your liking
5. Restart your server

## Directory Structure

```
helix_hud/
├── fxmanifest.lua
├── config.lua              # All configuration
├── client/
│   ├── utils.lua           # Client utility functions
│   ├── status.lua          # Health, armour, hunger, thirst, stress
│   ├── vehicle.lua         # Vehicle speed, fuel, engine, seatbelt
│   └── main.lua            # HUD controller, NUI bridge, exports
├── server/
│   └── main.lua            # Player data provider
└── html/                   # Built NUI output (React + Vite)
```

## Configuration

All configuration lives in `config.lua`. Key options:

### General

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `Config.framework` | `string` | `'auto'` | `'auto'`, `'qbox'`, `'qbcore'`, `'esx'`, or `'standalone'` |
| `Config.theme` | `string` | `'dark'` | Theme: `'dark'` or `'light'` |
| `Config.position` | `string` | `'bottom-right'` | `'bottom-right'`, `'bottom-left'`, or `'bottom-center'` |
| `Config.scale` | `number` | `1.0` | Global scale multiplier |
| `Config.hideInPauseMenu` | `boolean` | `true` | Auto-hide the HUD when the pause menu is open |

### Elements

Toggle individual HUD elements on or off:

| Element | Default | Description |
|---------|---------|-------------|
| `health` | `true` | Health bar |
| `armor` | `true` | Armour bar |
| `hunger` | `true` | Hunger bar |
| `thirst` | `true` | Thirst bar |
| `stress` | `false` | Stress bar (off by default; not all servers use it) |
| `stamina` | `true` | Stamina bar |
| `cash` | `true` | Cash display |
| `bank` | `false` | Bank balance (off by default for privacy) |
| `job` | `true` | Current job label |
| `serverId` | `true` | Player server ID |

### Vehicle HUD

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `Config.vehicle.enabled` | `boolean` | `true` | Enable or disable the vehicle HUD entirely |
| `Config.vehicle.speedUnit` | `string` | `'kmh'` | `'kmh'` or `'mph'` |
| `Config.vehicle.fuelScript` | `string` | `'auto'` | Auto-detect or force: `'LegacyFuel'`, `'ox_fuel'`, `'cdn-fuel'` |
| `Config.vehicle.seatbelt` | `boolean` | `true` | Show seatbelt indicator |

### Update Intervals

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `Config.updateIntervals.health` | `number` | `200` | Milliseconds between status polls (health, armour, hunger, thirst, stress, stamina) |
| `Config.updateIntervals.vehicle` | `number` | `100` | Milliseconds between vehicle polls (speed, fuel, engine, seatbelt) |

## Exports

### Client Exports

| Export | Returns | Description |
|--------|---------|-------------|
| `setVisible(visible)` | `void` | Show or hide the HUD |
| `isVisible()` | `boolean` | Check if the HUD is currently visible |

```lua
-- Hide the HUD (e.g. during a cutscene)
exports.helix_hud:setVisible(false)

-- Check visibility
if exports.helix_hud:isVisible() then
    print('HUD is showing')
end
```

## Commands

| Command | Description |
|---------|-------------|
| `/hud` | Toggle HUD visibility on or off |
