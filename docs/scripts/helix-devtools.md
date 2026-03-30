# helix_devtools

AI-powered development tooling for FiveM. MCP bridge that lets Claude Code, Cursor, or any MCP-compatible client connect to your running FiveM server for real-time inspection, debugging, and administration.

## Features

- **MCP Bridge** — 41 tools across 9 categories, accessible via Streamable HTTP transport
- **Token Authentication** — Secure API tokens with per-tool ACE permissions
- **Audit Logging** — Every tool call logged with caller, timestamp, and parameters
- **Safety by Default** — Dangerous tools disabled unless explicitly opted in via config
- **Read-Only Filesystem** — Inspect resource files without write risk
- **Real-Time Streams** — Subscribe to events, state bag changes, and log output via SSE
- **NUI Panels** — Built-in entity inspector, event monitor, and performance overlay

## Requirements

- [helix_lib](./helix-lib) (required)
- FiveM server (b2802+)
- MCP-compatible client (Claude Code, Cursor, etc.)

## Installation

1. Download the latest release from [GitHub](https://github.com/Helix-Scripts/helix-devtools/releases)
2. Place `helix_devtools` in your resources folder
3. Add `ensure helix_devtools` to your `server.cfg` (after `helix_lib`)
4. Generate an API token and add it to `config.lua`
5. Restart your server
6. Connect your MCP client to `http://your-server:30120/helix_devtools/mcp`

## Directory Structure

```
helix_devtools/
├── fxmanifest.lua
├── config.lua              # Auth tokens, dangerous tool opt-ins
├── client/
│   └── nui.lua             # NUI panel bootstrapping
├── server/
│   ├── main.lua            # HTTP handler, SSE endpoints
│   ├── events.lua          # Event interception & logging
│   ├── inspector.lua       # Entity inspection utilities
│   ├── logs.lua            # Log buffer management
│   ├── statebags.lua       # State bag tracking
│   └── mcp/
│       ├── server.lua      # MCP protocol handler (Streamable HTTP)
│       ├── tools.lua       # 41 tool definitions & handlers
│       └── auth.lua        # Token validation & ACE checks
├── nui/                    # React + Vite NUI panels
└── README.md
```

## Configuration

```lua
Config = {
    -- API tokens for MCP access
    tokens = {
        ['your-secret-token'] = {
            name = 'Claude Code',
            permissions = { '*' },  -- or specific tool names
        },
    },

    -- Dangerous tool opt-ins (all default to false)
    enableWriteStateBag = false,
    enableTriggerEvent = false,
    enableRestartResource = false,
    enableExecuteCommand = false,

    -- Audit logging
    auditLog = true,
    auditLogMaxEntries = 1000,

    -- Event buffer
    eventBufferSize = 500,
    logBufferSize = 500,
}
```

## Connecting Claude Code

Add to your Claude Code MCP config (`.claude/mcp.json`):

```json
{
  "mcpServers": {
    "fivem": {
      "type": "streamable-http",
      "url": "http://your-server:30120/helix_devtools/mcp",
      "headers": {
        "Authorization": "Bearer your-secret-token"
      }
    }
  }
}
```

## Tool Reference

See the full [MCP Tool Reference](./helix-devtools-tools) for detailed documentation of all 41 tools.

## Security Model

### Authentication
Every request must include a valid `Authorization: Bearer <token>` header. Tokens are defined in `config.lua` with optional per-tool permission scoping.

### ACE Permissions
Server operators can use FiveM's ACE system to further restrict tool access by player/group.

### Dangerous Tools
Tools that modify server state are marked `dangerous` and disabled by default. Each must be individually enabled in `config.lua`. This includes:

- `write_state_bag` — Modify state bag values
- `trigger_event` — Fire arbitrary server events
- `restart_resource` / `start_resource` / `stop_resource` / `ensure_resource` — Resource lifecycle
- `execute_command` — Run console commands
- `write_resource_file` / `delete_resource_file` — Modify resource files on disk
- `query_database` — Execute SQL queries via oxmysql
- `inject_supply` — Modify economy supply levels

### Filesystem Sandboxing
Filesystem tools (`list_resource_files`, `read_resource_file`) are:
- **Read-only** — no write operations exist
- **Scoped** to FiveM resource directories via `GetResourcePath()`
- **Path traversal protected** — `..` sequences rejected
- **Binary-safe** — binary files detected and content withheld

### Blocked Operations
- Server shutdown/quit commands are always blocked
- Cannot restart/stop `helix_devtools` itself (self-protection)
