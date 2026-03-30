# helix_dispatch

Full-featured MDT (Mobile Data Terminal) and dispatch system for FiveM. Dispatch management, unit tracking, BOLO system, and call history.

::: info Coming Soon
Full documentation will be available here once the script is released. Below is a feature overview.
:::

## Features

- **Mobile Data Terminal** — React-based NUI with a professional dispatch interface
- **Dispatch Management** — Create, assign, and track dispatch calls in real time
- **Unit Tracking** — Track on-duty officers/EMS with status codes (10-codes) and location
- **BOLO System** — Create and manage Be-On-The-Lookout alerts for vehicles and persons
- **Call History** — Searchable log of all dispatch calls with timestamps and outcomes
- **Department System** — Multi-department support (LSPD, BCSO, EMS, etc.)
- **Priority Levels** — Calls ranked by severity with visual indicators
- **Keybind Integration** — Quick-access keybinds for common dispatch actions

## Requirements

- [helix_lib](./helix-lib) (required)
- [oxmysql](https://github.com/overextended/oxmysql) (required for persistence)

## Installation

1. Download the latest release from [GitHub](https://github.com/Helix-Scripts/helix-dispatch/releases)
2. Place `helix_dispatch` in your resources folder
3. Add `ensure helix_dispatch` to your `server.cfg` (after `helix_lib` and `oxmysql`)
4. Configure `config.lua` to your liking
5. Restart your server

## Directory Structure

```
helix_dispatch/
├── fxmanifest.lua
├── config.lua
├── client/
├── server/
├── shared/
├── nui/              (React + Vite MDT interface)
└── html/             (Built NUI output)
```
