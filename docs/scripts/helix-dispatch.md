# helix_dispatch

Full-featured MDT (Mobile Data Terminal) and dispatch system for FiveM. Dispatch management, unit tracking, BOLO system, and call history.

**Version:** 1.0.0 | **License:** Commercial | **Dependencies:** [helix_lib](./helix-lib), [oxmysql](https://github.com/overextended/oxmysql)

## Features

- **Mobile Data Terminal** — React-based NUI with a professional dispatch interface
- **Dual-Mode MDT** — Mini MDT for quick glances and full MDT for detailed operations
- **Dispatch Management** — Create, assign, and track dispatch calls in real time
- **Unit Tracking** — Track on-duty officers/EMS with status codes and GPS location
- **Smart Routing** — Automatic unit assignment based on distance, availability, and specialization
- **BOLO System** — Create and manage Be-On-The-Lookout alerts for vehicles and persons
- **Warrant System** — Issue, serve, and track warrants
- **Incident Reports** — Create, edit, and submit incident reports
- **Call History** — Searchable log of all dispatch calls with timestamps and outcomes
- **Department System** — Multi-department support (LSPD, BCSO, EMS, SAFD, etc.)
- **Priority Levels** — Calls ranked by severity (Code 1–4) with visual indicators and auto-escalation
- **Panic Button** — One-press panic alert with GPS flash and auto-dispatch
- **NPC Call Generation** — AI-generated civilian calls to keep dispatch active
- **Plate Check** — Quick vehicle plate lookup with BOLO cross-reference
- **Keybind Integration** — Configurable keybinds for all common actions

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
│   ├── cl_main.lua           # Client entry point, NUI bridge, keybinds
│   └── cl_blips.lua          # Blip management (call blips, GPS routes, panic flash)
├── server/
│   ├── sv_main.lua           # Server entry point and exports
│   ├── sv_calls.lua          # Call management and lifecycle
│   ├── sv_units.lua          # Unit tracking and status
│   ├── sv_routing.lua        # Smart dispatch routing engine
│   ├── sv_bolos.lua          # BOLO system
│   ├── sv_warrants.lua       # Warrant management
│   ├── sv_reports.lua        # Incident report system
│   ├── sv_departments.lua    # Department configuration
│   └── sv_database.lua       # Database schema and queries
├── shared/
│   ├── enums.lua             # Status codes, priority levels, call types
│   └── utils.lua             # Shared utility functions
├── nui/                      # React + Vite MDT interface
└── nui/dist/                 # Built NUI output
```

## Configuration

All configuration lives in `config.lua`. Key sections:

### General

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `Config.Debug` | `boolean` | `false` | Enable debug logging |
| `Config.RoutingMode` | `string` | `'auto'` | `'auto'`, `'suggest'`, or `'manual'` dispatch routing |
| `Config.MaxActiveCalls` | `number` | `100` | Maximum concurrent active calls |
| `Config.PositionSyncInterval` | `number` | `5000` | Unit GPS sync interval (ms) |
| `Config.MaxMDTTabs` | `number` | `8` | Max open tabs in the full MDT |

### Priority System

Calls use a Code 1–4 severity system with configurable auto-escalation:

| Priority | Name | Auto-Escalate After |
|----------|------|---------------------|
| Code 1 | Routine | Never |
| Code 2 | Urgent | 600s |
| Code 3 | Emergency | 300s |
| Code 4 | Life-Threatening | Never (already max) |

### Routing Engine

Smart dispatch weighs multiple factors when assigning units:

| Weight | Default | Description |
|--------|---------|-------------|
| `distanceWeight` | `0.4` | Proximity to call location |
| `availabilityWeight` | `0.3` | Unit's current status |
| `specializationWeight` | `0.2` | Unit's skills match call type |
| `workloadPenalty` | `0.1` | Penalty for units already on calls |

### Departments

Pre-configured departments: LSPD, BCSO, SAEMS, SAFD. Each with custom callsign formats, radio channels, and handled call types.

### Call Types

22 built-in call types including: robbery, assault, traffic stop, pursuit, drugs, suspicious activity, noise complaint, trespassing, theft, vandalism, medical emergency, overdose, fire, hazmat, rescue, and more. Each has a default priority, auto-escalation timer, minimum/recommended unit count, and map blip configuration.

### Panic Button

| Option | Default | Description |
|--------|---------|-------------|
| `enabled` | `true` | Enable panic button |
| `cooldown` | `10000` | Cooldown between presses (ms) |
| `autoDispatch` | `3` | Number of units to auto-dispatch |
| `audioAlert` | `true` | Play audio alert to all on-duty units |
| `mapFlash` | `true` | Flash panic location on map |

### NPC Call Generation

| Option | Default | Description |
|--------|---------|-------------|
| `enabled` | `true` | Enable AI-generated civilian calls |
| `minInterval` | `600` | Minimum seconds between NPC calls |
| `maxInterval` | `1800` | Maximum seconds between NPC calls |
| `maxActive` | `5` | Max concurrent NPC-generated calls |
| `playerScaling` | `true` | Scale frequency with player count |

### Keybinds

| Action | Default | Description |
|--------|---------|-------------|
| Mini MDT | `F5` | Toggle mini MDT overlay |
| Full MDT | `F6` | Toggle full MDT interface |
| Dispatch Center | `F7` | Open dispatch center (dispatchers only) |
| Status Wheel | `F9` | Quick status change wheel |
| Quick Plate | `F10` | Quick plate check input |
| Panic Button | — | Unbound by default |

## Communication

helix_dispatch uses **network events** rather than traditional exports. All client↔server communication flows through `RegisterNetEvent` handlers and NUI callbacks.

### Key Client Commands

| Command | Description |
|---------|-------------|
| `+helix_dispatch_mini` | Toggle mini MDT |
| `+helix_dispatch_full` | Toggle full MDT |
| `+helix_dispatch_center` | Toggle dispatch center |
| `+helix_dispatch_panic` | Trigger panic button |
| `+helix_dispatch_status` | Open status wheel |
| `+helix_dispatch_quickplate` | Quick plate check |

### Integration Events

Other scripts can create dispatch calls programmatically:

```lua
-- Server-side: create a dispatch call from another script
TriggerEvent('helix_dispatch:createCall', {
    callType = 'robbery',
    location = { x = 215.3, y = -810.5, z = 30.7 },
    callerName = 'Anonymous',
    description = 'Armed robbery in progress at the convenience store',
    priority = 3,
})
```
