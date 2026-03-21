# Contributing to Helix Scripts

Thanks for your interest in contributing. We welcome bug reports, feature requests, and pull requests on our open-source projects (helix_lib, helix_hud).

## Getting Started

1. Fork the repository
2. Create a feature branch from `main`
3. Make your changes
4. Submit a pull request

## Code Style

### Lua
- Lua 5.4 — no deprecated patterns
- Format with [StyLua](https://github.com/JohnnyMorganz/StyLua)
- Type annotations via [EmmyLua](https://emmylua.github.io/) / Lua Language Server
- `snake_case` for variables and functions
- `PascalCase` for classes/modules
- Always validate server-side — never trust client data

### TypeScript (NUI)
- Strict mode enabled
- Format with Prettier
- React functional components with hooks
- Props interfaces for all components

## Commit Messages

Use clear, descriptive commit messages:
```
fix: resolve callback timeout on slow connections
feat: add dark mode toggle to HUD
docs: update bridge API reference
```

## Pull Request Guidelines

- One PR per feature or fix
- Fill out the PR template completely
- Ensure all framework tests pass (Qbox, QBCore, ESX)
- Check resmon — performance regressions are blockers
- Update documentation for any API changes

## Bug Reports

Use the bug report template. Include:
- Script version
- Framework (Qbox/QBCore/ESX)
- Steps to reproduce
- Console output

## Security

If you find a security vulnerability, **do not** open a public issue. Email security@helix-scripts.com or DM us on Discord.

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT for free scripts).
