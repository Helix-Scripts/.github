# helix_hud

`helix_hud` is a high-performance FiveM HUD that leverages the [helix_lib](/scripts/helix-lib) framework bridge and NUI design system for a seamless experience across ESX, QBCore, and Qbox.

**Version:** 0.2.0 | **License:** Commercial | **Dependency:** [helix_lib](./helix-lib)

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

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `Config.elements` | `table` | — | Toggle individual HUD elements on/off |
| `Config.vehicle` | `table` | — | Vehicle HUD settings (speed unit, fuel display) |
| `Config.theme` | `string` | `'dark'` | Theme: `'dark'` or `'light'` |
| `Config.position` | `string` | `'bottom-right'` | HUD position on screen |
| `Config.scale` | `number` | `1.0` | Global scale multiplier |

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
