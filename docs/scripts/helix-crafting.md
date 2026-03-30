# helix_crafting

Visual crafting interface for FiveM with recipe discovery, progress tracking, quality tiers, and workstation support.

::: info Coming Soon
Full documentation will be available here once the script is released. Below is a feature overview.
:::

## Features

- **Visual Crafting UI** — React-based NUI with recipe browsing, ingredient display, and progress animations
- **Recipe System** — Define recipes with ingredients, quantities, crafting time, and skill requirements
- **Quality Tiers** — Items can have quality levels affecting stats and value
- **Workstations** — Location-based crafting with workstation types (forge, workbench, chemistry table, etc.)
- **Skill Progression** — Players improve crafting skill through practice
- **Discovery System** — Recipes can be hidden until players find blueprints or reach skill thresholds
- **Economy Integration** — Works with helix_economy for dynamic ingredient pricing

## Requirements

- [helix_lib](./helix-lib) (required)
- [oxmysql](https://github.com/overextended/oxmysql) (required for persistence)

## Installation

1. Download the latest release from [GitHub](https://github.com/Helix-Scripts/helix-crafting/releases)
2. Place `helix_crafting` in your resources folder
3. Add `ensure helix_crafting` to your `server.cfg` (after `helix_lib` and `oxmysql`)
4. Configure `config.lua` to your liking
5. Restart your server

## Directory Structure

```
helix_crafting/
├── fxmanifest.lua
├── config.lua
├── client/
├── server/
├── shared/
├── nui/              (React + Vite crafting UI)
└── html/             (Built NUI output)
```
