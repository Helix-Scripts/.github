# helix_economy

Dynamic, real-time economy system for FiveM. Supply-and-demand pricing, market dashboards, auction house, and full admin controls.

::: info Coming Soon
Full documentation will be available here once the script is released. Below is a feature overview.
:::

## Features

- **Dynamic Pricing** — Item prices fluctuate based on real-time supply and demand
- **Market Dashboard** — NUI-based dashboard showing live prices, trends, and player analytics
- **Auction House** — Player-to-player item auctions with bidding, buyout, and expiry
- **Price History** — Track price movements over time with charting
- **Admin Controls** — Inject supply, set price floors/ceilings, freeze markets
- **Category System** — Organize items into categories with independent market dynamics
- **Transaction Logging** — Full audit trail of all economic activity

## Requirements

- [helix_lib](./helix-lib) (required)
- [oxmysql](https://github.com/overextended/oxmysql) (required for persistence)

## Installation

1. Download the latest release from [GitHub](https://github.com/Helix-Scripts/helix-economy/releases)
2. Place `helix_economy` in your resources folder
3. Add `ensure helix_economy` to your `server.cfg` (after `helix_lib` and `oxmysql`)
4. Configure `config.lua` to your liking
5. Restart your server

## Directory Structure

```
helix_economy/
├── fxmanifest.lua
├── config.lua
├── client/
├── server/
├── shared/
├── nui/              (React + Vite dashboard)
└── html/             (Built NUI output)
```
