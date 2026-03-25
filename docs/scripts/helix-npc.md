# helix_npc

AI-Enhanced NPC Interaction System for FiveM. Create living, breathing NPCs with personality, memory, schedules, quests, and optional LLM-powered dynamic dialogue.

## Features

- **Personality System** — Define NPC traits, mood, speech style, and knowledge areas
- **Schedule Engine** — NPCs move between locations based on time of day
- **Dialogue Trees** — Branching conversations with conditions and reputation gates
- **Memory & Reputation** — NPCs remember players across sessions (persisted to database)
- **Quest System** — Templated quests with objectives, rewards, and cooldowns
- **LLM Integration** (Pro) — Claude or OpenAI powered free-text dialogue with automatic fallback
- **CostGuard** — Per-player and server-wide token budgets and rate limiting
- **Content Filter** — Multi-layer output filtering for LLM responses
- **Cinematic NUI** — Letterbox, identity strip, panel mode, quest cards, bark bubbles
- **11 Pre-built Templates** — Ready-to-use NPC archetypes for common server roles

## Requirements

- [helix_lib](./helix-lib) (required)
- [oxmysql](https://github.com/overextended/oxmysql) (required for memory persistence)
- API key for [Anthropic](https://anthropic.com) or [OpenAI](https://openai.com) (optional, for LLM features)

## Installation

1. Download the latest release from [GitHub](https://github.com/Helix-Scripts/helix-npc/releases)
2. Place `helix_npc` in your resources folder
3. Add `ensure helix_npc` to your `server.cfg` (after `helix_lib` and `oxmysql`)
4. Configure `config.lua` to your liking
5. Restart your server

## Directory Structure

```
helix_npc/
├── fxmanifest.lua
├── config.lua              # All configuration
├── client/
│   ├── proximity.lua       # Spatial hashing & LOD tiers
│   ├── entity.lua          # Ped spawning & entity management
│   ├── dialogue.lua        # Client dialogue state & NUI bridge
│   └── main.lua            # Client entry point
├── server/
│   ├── memory.lua          # Player-NPC memory persistence
│   ├── npc_manager.lua     # Server-side NPC registry
│   ├── quest.lua           # Quest engine
│   ├── llm_bridge.lua      # Claude & OpenAI API calls
│   ├── cost_guard.lua      # Token budgeting & rate limiting
│   ├── content_filter.lua  # Output content filtering
│   ├── llm_dialogue.lua    # Hybrid dialogue handler
│   ├── main.lua            # Server entry point
│   ├── admin.lua           # Admin dashboard commands
│   └── benchmark.lua       # Performance benchmarking
├── shared/
│   └── types.lua           # EmmyLua type annotations
├── nui/                    # React + TypeScript + Vite
├── html/                   # Built NUI output
└── npcs/                   # NPC template definitions
    ├── example_mechanic.lua
    ├── doctor_grace.lua
    ├── barkeeper_johnny.lua
    └── ... (11 templates total)
```

## Quick Start: Creating an NPC

Place a Lua file in the `npcs/` directory. Here's a minimal example:

```lua
Entities.registerNpc({
    id = 'my_shopkeeper',
    name = 'Sarah',
    title = 'General Store Owner',
    model = 'a_f_y_business_01',

    personality = {
        traits = { 'friendly', 'helpful' },
        mood_default = 'happy',
        speech_style = 'casual',
        knowledge = { 'shopping', 'local_area' },
    },

    schedule = {
        { time = '08:00', location = vec3(25.0, -1347.0, 29.5),
          anim = 'WORLD_HUMAN_STAND_IMPATIENT', heading = 270.0 },
        { time = '20:00', location = nil }, -- Gone home
    },

    dialogue = {
        greeting = {
            text = {
                'Welcome! Take a look around.',
                'Hey there! Need anything?',
            },
            responses = {
                { label = 'Show me what you have.', next = 'shop' },
                { label = 'Just browsing.', next = 'farewell' },
            },
        },
        shop = {
            text = "Here's what's in stock today.",
            action = function(ctx)
                -- Open your shop UI here
            end,
            next = 'farewell',
        },
        farewell = {
            text = { 'Come back anytime!', 'See you later!' },
        },
    },

    services = {
        { id = 'shop', label = 'Open Store', action = 'my_script:openStore' },
    },

    reputation_track = true,
    spawn_on_start = true,
})
```

## Configuration

All configuration lives in `config.lua`. Key sections:

### General

| Option | Default | Description |
|--------|---------|-------------|
| `Config.Debug` | `false` | Enable debug logging |
| `Config.InteractionType` | `'proximity'` | `'proximity'` or `'target'` (ox_target) |
| `Config.InteractionDistance` | `2.5` | Meters to trigger interaction |
| `Config.MaxSpawnedPeds` | `50` | Hard cap on spawned NPC peds |
| `Config.ProximityTickRate` | `500` | Milliseconds between proximity checks |

### LOD Tiers

| Tier | Default | Description |
|------|---------|-------------|
| `interaction` | `10m` | Full AI + dialogue processing |
| `ambient` | `30m` | Ambient animations only |
| `frozen` | `60m` | Entity exists, no processing |
| `despawn` | `100m` | Entity removed |

### Memory & Reputation

| Option | Default | Description |
|--------|---------|-------------|
| `Config.ReputationDecay.enabled` | `true` | Enable reputation decay |
| `Config.ReputationDecay.rate` | `1` | Points lost per interval |
| `Config.ReputationDecay.interval` | `86400` | Decay interval (seconds) |
| `Config.MaxStoredInteractions` | `50` | Per player-NPC pair |
| `Config.MaxNotableEvents` | `20` | Notable events stored |

### LLM Integration (Pro)

| Option | Default | Description |
|--------|---------|-------------|
| `Config.LLM.Enabled` | `false` | Master toggle |
| `Config.LLM.Provider` | `'claude'` | `'claude'` or `'openai'` |
| `Config.LLM.MaxHistoryMessages` | `10` | Conversation turns in context |
| `Config.LLM.MaxInputLength` | `500` | Max player message length |

### CostGuard

| Option | Default | Description |
|--------|---------|-------------|
| `PlayerMaxTokens` | `10000` | Token budget per player/window |
| `PlayerMaxRequests` | `20` | Requests per player/window |
| `PlayerWindowSeconds` | `3600` | Window duration (1 hour) |
| `PlayerCooldownSeconds` | `3` | Min seconds between requests |
| `ServerMaxTokens` | `500000` | Total server token budget |
| `ServerMaxRequests` | `1000` | Total server requests |

### Content Filter

| Option | Default | Description |
|--------|---------|-------------|
| `enabled` | `true` | Enable output filtering |
| `custom_rules` | `nil` | Extra system prompt rules |
| `blocked_patterns` | `nil` | Lua patterns to block in output |
| `blocked_words` | `nil` | Exact words to block |
| `max_response_length` | `500` | Auto-truncation threshold |

## NPC Definition Reference

### Personality

```lua
personality = {
    traits = { 'friendly', 'gruff', 'nervous', 'mysterious', ... },
    mood_default = 'happy', -- happy|neutral|angry|sad|fearful|excited|suspicious
    speech_style = 'casual', -- casual|formal|slang|regional
    knowledge = { 'area_name', 'topic', ... },
}
```

### Schedule

NPCs move between locations based on game time:

```lua
schedule = {
    { time = '08:00', location = vec3(...), anim = 'WORLD_HUMAN_...', heading = 180.0 },
    { time = '18:00', location = nil }, -- Despawns (gone home)
}
```

### Dialogue Tree

Each node has text (string or random pool), optional responses, conditions, actions, and mood changes:

```lua
dialogue = {
    greeting = {
        text = { 'Hello!', 'Hi there!' },
        responses = {
            { label = 'Option A', next = 'node_a', reputation_change = 2 },
            {
                label = 'Secret option',
                next = 'secret',
                condition = function(ctx) return ctx.reputation >= 50 end,
            },
        },
    },
    node_a = {
        text = 'Response text.',
        mood_change = 'happy',
        action = function(ctx)
            -- Side effects here
        end,
        next = 'farewell', -- Linear flow (no responses needed)
    },
}
```

### Dialogue Context

The `ctx` object available in conditions and actions:

| Field | Type | Description |
|-------|------|-------------|
| `source` | `number` | Player server ID |
| `npcId` | `string` | NPC identifier |
| `reputation` | `number` | Current reputation score |
| `interaction_count` | `number` | Total interactions |
| `last_topic` | `string?` | Previous conversation topic |
| `notable_events` | `string[]` | Key events history |
| `mood` | `string` | Current NPC mood |
| `time_of_day` | `number` | Game hour (0-23) |
| `weather` | `string` | Current weather |

### Quest Templates

```lua
if Quests then
    Quests.registerTemplate({
        id = 'unique_quest_id',
        npc_id = 'npc_id',
        title = 'Quest Title',
        description = 'NPC dialogue introducing the quest.',
        type = 'fetch', -- delivery|fetch|escort|eliminate|custom
        objectives = {
            { type = 'goto', label = 'Go somewhere', target = vec3(...) },
            { type = 'collect', label = 'Pick up item', target = 'item_name', count = 1 },
            { type = 'deliver', label = 'Bring it back', target = 'npc_id' },
        },
        rewards = {
            { type = 'money', amount = 500 },
            { type = 'reputation', npc_id = 'npc_id', amount = 15 },
        },
        cooldown = 3600,
        reputation_required = 20,
    })
end
```

## Pre-built Templates

helix_npc ships with 11 ready-to-use NPC templates in the `npcs/` directory:

| Template | Role | Features |
|----------|------|----------|
| Mike the Mechanic | Vehicle repairs | Repair service, racing dialogue, spare parts quest |
| Dr. Grace | Hospital doctor | Healing service, medical supply quest |
| Johnny | Bartender | Drinks, rumors, delivery quest |
| Earl | Fisherman | Bait shop, fishing stories, tackle box quest |
| Chen | Black market dealer | Night-only, reputation-gated, paranoid |
| Sofia Martinez | Defense lawyer | Warrant clearing, fine disputes |
| Rosa | Street food vendor | Food sales, family stories |
| Vince | Gym trainer | Training sessions, supplements |
| Frank | Taxi dispatcher | Rides, driver jobs, VIP pickup quest |
| Zero | Underground hacker | Tech shop, info services, night-only |
| Diana Wells | Real estate agent | Property browsing, market talk |
| Marcus Cole | Community organizer | Supply runs, night patrol quests |

Each template can be customized by editing the file or used as a starting point for your own NPCs.

## Admin Commands

### Server Console

```
helix_npc_admin status           — System overview
helix_npc_admin npcs             — List all registered NPCs
helix_npc_admin costguard        — CostGuard usage statistics
helix_npc_admin filter           — Content filter statistics
helix_npc_admin memory <id> [npc] — Player memory inspection
helix_npc_admin toggle_llm       — Toggle LLM on/off
helix_npc_admin toggle_debug     — Toggle debug mode
helix_npc_admin reset_costguard [id] — Reset CostGuard limits
```

### In-Game (requires `helix_npc.admin` ace permission)

```
/npc_admin status       — Quick status overview
/npc_admin toggle_llm   — Toggle LLM on/off
/npc_admin toggle_debug — Toggle debug mode
```

### Performance Benchmark

```
helix_npc benchmark     — Run all performance benchmarks
```

## LLM Setup Guide

1. Set `Config.LLM.Enabled = true` in `config.lua`
2. Choose your provider: `Config.LLM.Provider = 'claude'` or `'openai'`
3. Add your API key to the provider config
4. Optionally enable quest generation: `Config.LLM.QuestGeneration.enabled = true`
5. Configure CostGuard budgets to control API costs
6. Add any custom content filter rules

The system automatically falls back to tree-mode dialogue when:
- LLM is disabled
- API key is missing
- Player or server token budgets are exhausted
- Rate limits are hit
- The LLM API returns an error
- The content filter rejects a response

### Per-NPC LLM Configuration

Add an `llm` block to any NPC definition:

```lua
llm = {
    system_prompt_extra = 'You occasionally reference specific car brands.',
    temperature = 0.8,    -- Override default temperature
    max_tokens = 100,     -- Override default max tokens
},
```

## Exports

| Export | Description |
|--------|-------------|
| `registerNpc(definition)` | Register an NPC from external scripts |
| `unregisterNpc(npcId)` | Remove an NPC |
| `getNpcState(npcId)` | Get current NPC state |
| `startDialogue(npcId)` | Open dialogue with an NPC |
| `endDialogue(npcId)` | Close active dialogue |
