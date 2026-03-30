# helix_missions

Visual mission and quest system for FiveM with an in-game flow editor, branching objectives, rewards, rating tiers, and player progress tracking.

**Version:** 0.1.0 | **License:** Commercial | **Dependencies:** [helix_lib](./helix-lib), [oxmysql](https://github.com/overextended/oxmysql)

## Features

- **In-Game Flow Editor** -- Visual node-based mission editor with place, move, connect, and delete tools
- **12 Objective Types** -- go_to, collect, deliver, eliminate, escort, survive, interact, vehicle, stealth, custom, checkpoint, photograph
- **Branching Objectives** -- Missions with multiple paths, conditions, and outcomes
- **Rating System** -- Gold, silver, and bronze completion ratings based on time taken
- **Reward System** -- Money, items, XP, reputation, and custom rewards with per-rating bonuses
- **Storylines** -- Chain missions into multi-chapter storylines with player choices
- **Player Progress** -- Per-player mission state, cooldowns, completion history, and aggregate stats
- **NPC Integration** -- Works with helix_npc for mission-giving NPCs
- **Group Missions** -- Cooperative multi-player missions with min/max player counts
- **Failure Conditions** -- Death, time limit, distance, detection, NPC death, vehicle destroyed, or custom
- **Blip Management** -- Automatic map blips with per-objective-type sprites and colours
- **Test Mode** -- Test missions in-editor with skip, teleport, invincibility, and force-complete tools

## Requirements

- [helix_lib](./helix-lib) (required)
- [oxmysql](https://github.com/overextended/oxmysql) (required for persistence)
- [helix_npc](./helix-npc) (optional, for NPC-based mission givers)

## Installation

1. Download the latest release from [GitHub](https://github.com/Helix-Scripts/helix-missions/releases)
2. Place `helix_missions` in your resources folder
3. Add `ensure helix_missions` to your `server.cfg` (after `helix_lib` and `oxmysql`)
4. Configure `shared/config.lua` to your liking
5. Restart your server

## Directory Structure

```
helix_missions/
+-- fxmanifest.lua
+-- client/
|   +-- main.lua                # Client bootstrap, NUI callbacks, keybinds
|   +-- ObjectiveRenderer.lua   # Blips, markers, and world rendering
|   +-- MissionHUD.lua          # Mission tracker overlay
|   +-- MissionRuntime.lua      # Client-side mission state machine
|   +-- EditorMode.lua          # In-game visual editor
|   +-- TestMode.lua            # Mission test/debug mode
+-- server/
|   +-- main.lua                # Server bootstrap, net events, admin events
|   +-- MissionManager.lua      # Mission CRUD, start/complete/fail logic
|   +-- ObjectiveManager.lua    # Objective validation and advancement
|   +-- PlayerProgress.lua      # Per-player state, saves, cooldowns, stats
+-- shared/
|   +-- config.lua              # All configuration
|   +-- types.lua               # EmmyLua type annotations
+-- nui/                        # React + Vite editor and HUD UI
+-- nui-dist/                   # Built NUI output
```

## Configuration

All configuration lives in `shared/config.lua`.

### General

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `Config.General.max_active_missions` | `number` | `3` | Max missions a player can have active simultaneously |
| `Config.General.auto_save_interval` | `number` | `60` | Seconds between auto-saving player progress |
| `Config.General.debug` | `boolean` | `false` | Enable debug logging |
| `Config.General.default_locale` | `string` | `'en'` | Default language for mission text |
| `Config.General.allow_replay` | `boolean` | `true` | Whether players can replay completed missions |
| `Config.General.default_replay_cooldown` | `number` | `3600` | Seconds before a mission can be replayed |

### Editor

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `Config.Editor.max_objectives_per_mission` | `number` | `50` | Maximum objectives per mission |
| `Config.Editor.max_npcs` | `number` | `20` | Maximum NPCs per mission |
| `Config.Editor.max_props` | `number` | `30` | Maximum props per mission |
| `Config.Editor.max_triggers` | `number` | `20` | Maximum triggers per mission |
| `Config.Editor.max_rewards` | `number` | `10` | Maximum rewards per mission |
| `Config.Editor.max_failure_conditions` | `number` | `10` | Maximum failure conditions per mission |
| `Config.Editor.auto_save_interval` | `number` | `30` | Editor auto-save interval (seconds) |
| `Config.Editor.version_history` | `boolean` | `true` | Enable mission version history |
| `Config.Editor.max_versions` | `number` | `50` | Maximum versions to keep |

### HUD

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `Config.HUD.position` | `string` | `'top-right'` | Mission tracker position on screen |
| `Config.HUD.default_expanded` | `boolean` | `true` | Whether tracker starts expanded |
| `Config.HUD.max_visible_objectives` | `number` | `5` | Max objectives shown in tracker |
| `Config.HUD.show_distance` | `boolean` | `true` | Show distance to objective |
| `Config.HUD.show_timer` | `boolean` | `true` | Show time remaining for timed objectives |
| `Config.HUD.notification_duration` | `number` | `5000` | Notification duration in ms |

### Performance

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `Config.Performance.objective_check_interval` | `number` | `500` | Milliseconds between objective condition checks |
| `Config.Performance.entity_lod_distance` | `number` | `100.0` | Distance at which entities LOD/despawn |
| `Config.Performance.max_concurrent_missions` | `number` | `20` | Max concurrent missions across all players |
| `Config.Performance.blip_render_distance` | `number` | `500.0` | Distance at which blips become visible |
| `Config.Performance.max_entities_per_mission` | `number` | `50` | Max spawned entities per mission |
| `Config.Performance.server_tick_rate` | `number` | `1000` | Server-side mission processing interval (ms) |

### Integration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `Config.Integration.use_helix_npc` | `boolean` | `true` | Use helix_npc for mission NPCs |
| `Config.Integration.use_helix_economy` | `boolean` | `true` | Use helix_economy for rewards/costs |
| `Config.Integration.use_helix_crafting` | `boolean` | `true` | Use helix_crafting for item requirements |
| `Config.Integration.use_helix_dispatch` | `boolean` | `true` | Use helix_dispatch for dispatch integration |

### Rewards

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `Config.Rewards.default_currency` | `string` | `'cash'` | Default currency type for money rewards |
| `Config.Rewards.max_cash_reward` | `number` | `100000` | Maximum cash reward per mission |
| `Config.Rewards.xp_multiplier` | `number` | `1.0` | XP multiplier for all rewards |
| `Config.Rewards.first_completion_bonus` | `number` | `1.5` | Bonus multiplier for first completion |
| `Config.Rewards.rating_thresholds.gold` | `number` | `0.75` | Complete in under 75% of estimated time for gold |
| `Config.Rewards.rating_thresholds.silver` | `number` | `1.0` | Complete within estimated time for silver |
| `Config.Rewards.rating_thresholds.bronze` | `number` | `1.5` | Complete within 150% of estimated time for bronze |

## Objective Types

| Type | Description |
|------|-------------|
| `go_to` | Navigate to a location |
| `collect` | Collect items from the world |
| `deliver` | Deliver items to a location or NPC |
| `eliminate` | Eliminate targets |
| `escort` | Escort an NPC to a destination |
| `survive` | Survive for a duration |
| `interact` | Interact with an object or NPC |
| `vehicle` | Vehicle-based objective (drive to, deliver vehicle) |
| `stealth` | Complete without being detected |
| `custom` | Custom objective via export/callback |
| `checkpoint` | Pass through checkpoints in order |
| `photograph` | Photograph a target |

## Keybinds

| Action | Default | Description |
|--------|---------|-------------|
| Toggle Tracker | `M` | Show or hide the mission tracker |
| Open Journal | `J` | Open the mission journal |
| Interact | `E` | Interact with mission elements |
| Toggle Editor | `F10` | Open or close the mission editor (requires permission) |

## Permissions

| Permission | Description |
|------------|-------------|
| `helix.missions.editor` | Access to the in-game mission editor |
| `helix.missions.admin` | Access to admin commands (publish, archive, force-complete, server stats) |

## Communication

helix_missions uses network events rather than traditional exports. All client-server communication flows through `RegisterNetEvent` handlers and NUI callbacks.

### Integration Events

Other scripts can listen for mission lifecycle events:

```lua
-- Server-side: listen for mission completion
AddEventHandler('helix_missions:missionCompleted', function(source, missionId, rating)
    print(('Player %d completed mission %s with %s rating'):format(source, missionId, rating))
end)
```
