# helix_missions

Visual mission and quest system for FiveM with a flow editor, branching objectives, rewards, and player progress tracking.

::: info Coming Soon
Full documentation will be available here once the script is released. Below is a feature overview.
:::

## Features

- **Flow Editor** — Visual node-based mission editor for creating complex mission chains
- **Branching Objectives** — Missions with multiple paths, conditions, and outcomes
- **Objective Types** — Go-to, collect, deliver, eliminate, escort, interact, and custom objectives
- **Reward System** — Configurable rewards (money, items, reputation, XP) per mission
- **Player Progress** — Track mission completion, cooldowns, and unlock chains per player
- **NPC Integration** — Works with helix_npc for mission-giving NPCs
- **Group Missions** — Support for cooperative multi-player missions
- **Blip Management** — Automatic map blips for active objectives

## Requirements

- [helix_lib](./helix-lib) (required)
- [oxmysql](https://github.com/overextended/oxmysql) (required for persistence)
- [helix_npc](./helix-npc) (optional, for NPC-based mission givers)

## Installation

1. Download the latest release from [GitHub](https://github.com/Helix-Scripts/helix-missions/releases)
2. Place `helix_missions` in your resources folder
3. Add `ensure helix_missions` to your `server.cfg` (after `helix_lib` and `oxmysql`)
4. Configure `config.lua` to your liking
5. Restart your server

## Directory Structure

```
helix_missions/
├── fxmanifest.lua
├── config.lua
├── client/
├── server/
├── shared/
├── nui/              (React + Vite mission UI)
└── html/             (Built NUI output)
```
