# helix_economy

Dynamic, real-time economy system for FiveM. Supply-and-demand pricing, market dashboards, auction house, and full admin controls.

**Version:** 0.1.0 | **License:** Commercial | **Dependencies:** [helix_lib](./helix-lib), [oxmysql](https://github.com/overextended/oxmysql)

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
│   └── main.lua            # Client entry point, NUI bridge
├── server/
│   ├── database.lua        # Database schema & queries
│   ├── registry.lua        # Item registration & management
│   ├── price_engine.lua    # Supply/demand price calculation
│   ├── tracker.lua         # Transaction tracking
│   ├── auction.lua         # Auction house logic
│   ├── trading.lua         # Player-to-player trading
│   ├── health.lua          # Economy health monitoring
│   ├── security.lua        # Anti-exploit measures
│   └── main.lua            # Server entry point & exports
├── shared/
│   └── types.lua             # EmmyLua type annotations
├── nui/                      # React + Vite dashboard source
└── html/                     # Built NUI output
```

## Exports

### Server Exports

| Export | Returns | Description |
|--------|---------|-------------|
| `GetPrice(itemId)` | `number` | Get current price for an item |
| `GetPriceState(itemId)` | `table` | Get full price state (price, supply, demand, trend) |
| `GetAllPrices()` | `table` | Get prices for all registered items |
| `RegisterItem(definition)` | `boolean` | Register a new item in the economy |
| `ItemExists(itemId)` | `boolean` | Check if an item is registered |
| `IsItemFrozen(itemId)` | `boolean` | Check if an item's price is frozen |
| `RecordSupply(itemId, amount, sourceType, playerId)` | `void` | Record a supply event |
| `RecordDemand(itemId, amount, sourceType, playerId)` | `void` | Record a demand event |
| `GetMarketSummary()` | `table` | Get market overview (total items, volume, trends) |
| `GetTrending(limit, direction)` | `table` | Get trending items by price movement |
| `GetHealthReport()` | `table` | Get economy health metrics |

### Client Exports

| Export | Returns | Description |
|--------|---------|-------------|
| `OpenDashboard()` | `void` | Open the market dashboard NUI |
| `CloseDashboard()` | `void` | Close the market dashboard NUI |
| `ToggleDashboard()` | `void` | Toggle dashboard visibility |

```lua
-- Server: register an item and record transactions
exports.helix_economy:RegisterItem({
    id = 'water',
    name = 'Water Bottle',
    category = 'consumables',
    basePrice = 10,
})

local price = exports.helix_economy:GetPrice('water')
exports.helix_economy:RecordDemand('water', 1, 'shop', source)

-- Client: open the dashboard
exports.helix_economy:OpenDashboard()
```
