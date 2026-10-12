# 홍보잇다 UI Prototype

React-based mobile and desktop UI prototype. The current app uses sample outputs for UI review; a successful UI build does not establish that all production AI features are connected.

## Current instructions

- [AGENTS.md](AGENTS.md): development environment and task entrypoint.
- [DESIGN_MAINTENANCE.md](DESIGN_MAINTENANCE.md): preserve the validated structure and refine it; additional professor feedback and user requests may change it.
- [Documentation index](docs/README.md): current references, feedback, and archived reports.

## Local preview and checks

Use `start-preview.cmd` on Windows, or follow [local preview instructions](docs/LOCAL_PREVIEW.md). Reuse an existing working server.

```shell
pnpm install --frozen-lockfile
pnpm dev --host 127.0.0.1 --port 5173
```

Relevant checks:

```shell
pnpm build
pnpm exec tsc --noEmit
node scripts/verify-documents.mjs
node scripts/verify-professor-feedback.mjs
```

The last command needs the local preview running. Historical Phase 4-B scripts inspect archival evidence or create checkpoints; they do not replace current UI verification.

Keep the `ad_prototype` directory name: it is the configured Vercel Root Directory.
