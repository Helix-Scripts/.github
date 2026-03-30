# helix_crafting

Visual crafting interface for FiveM with recipe discovery, progress tracking, quality tiers, and workstation support.

**Version:** 1.0.0 | **License:** Commercial | **Dependencies:** [helix_lib](./helix-lib), [oxmysql](https://github.com/overextended/oxmysql), [ox_inventory](https://github.com/overextended/ox_inventory)

## Features

- **Visual Crafting UI** — React-based NUI with recipe browsing, ingredient display, and progress animations
- **Recipe System** — Define recipes with ingredients, quantities, crafting time, and skill requirements
- **Quality Tiers** — Items can have quality levels affecting stats and value
- **Workstations** — Location-based crafting with workstation types (forge, workbench, chemistry table, etc.)
- **Skill Progression** — Players improve crafting skill through practice
- **Discovery System** — Recipes can be hidden until players find blueprints or reach skill thresholds
- **Economy Integration** — Works with helix_economy for dynamic ingredient pricing

## Installation

1. Download the latest release from [GitHub](https://github.com/Helix-Scripts/helix-crafting/releases)
2. Place `helix_crafting` in your resources folder
3. Add `ensure helix_crafting` to your `server.cfg` (after `helix_lib` and `oxmysql`)
4. Configure `config.lua` to your liking
5. Restart your server

## Requirements

- [helix_lib](./helix-lib) (required)
- [oxmysql](https://github.com/overextended/oxmysql) (required for persistence)
- [ox_inventory](https://github.com/overextended/ox_inventory) (required for item management)

## Directory Structure

```
helix_crafting/
├── fxmanifest.lua
├── config.lua
├── config/
│   ├── recipes/        # Recipe definitions (one file per category)
│   ├── workstations.lua
│   ├── tools.lua
│   └── blueprints.lua
├── client/
│   ├── workstation.lua # Workstation interaction
│   └── main.lua        # Client entry point
├── server/
│   ├── database.lua    # Persistence layer
│   ├── security.lua    # Anti-exploit
│   ├── skill_manager.lua
│   ├── recipe_manager.lua
│   ├── workstation.lua
│   ├── quality.lua     # Quality tier system
│   ├── queue.lua       # Crafting queue
│   ├── tools.lua       # Tool durability
│   ├── blueprint.lua   # Blueprint discovery
│   ├── npc_integration.lua
│   └── main.lua
├── shared/
├── nui/              (React + Vite crafting UI)
└── nui/dist/         (Built NUI output)
```

## Exports

### Server Exports

| Export | Returns | Description |
|--------|---------|-------------|
| `GetSkillLevel(src, discipline)` | `number` | Get a player's skill level in a discipline |
| `HasBlueprint(src, blueprintId)` | `boolean` | Check if a player has discovered a blueprint |
| `GetRecipe(recipeId)` | `table?` | Get a recipe definition by ID |
| `TrainerGrantXp(playerId, discipline, xpAmount)` | `void` | Grant XP (for NPC trainer integration) |
| `TrainerSetMinLevel(playerId, discipline, level)` | `void` | Set minimum skill level (trainer boost) |
| `QuestGrantBlueprint(playerId, blueprintId)` | `void` | Grant a blueprint as quest reward |
| `QuestGrantBlueprints(playerId, blueprintIds)` | `void` | Grant multiple blueprints |
| `QuestReward(playerId, discipline, xpAmount, blueprintId)` | `void` | Combined quest reward (XP + blueprint) |
| `CheckCraftingReputation(src, npcId, requiredLevel)` | `boolean` | Check if player meets crafting level for NPC |

```lua
-- Check a player's skill level
local level = exports.helix_crafting:GetSkillLevel(source, 'blacksmithing')

-- Grant a blueprint as a quest reward
exports.helix_crafting:QuestGrantBlueprint(source, 'legendary_sword')
```
