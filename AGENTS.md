# AGENTS.md

This file is a quick-start guide for agentic coding tools working in this repo.
Follow these conventions unless the task explicitly says otherwise.

## Repo snapshot

- Runtime: Bun + Nitro (server preset `bun`).
- Language: TypeScript, ESM (`"type": "module"`).
- HTTP layer: Nitro/H3 handlers in `routes/`.
- Validation: Zod schemas, often used with `readValidatedBody`/`getValidatedQuery`.
- Database: Drizzle ORM (Bun SQL), config in `drizzle.config.ts`.

## Important meta rules

- Cursor rules: none found (no `.cursor/rules/` or `.cursorrules`).
- Copilot rules: none found (no `.github/copilot-instructions.md`).
- Do not add secrets. Never commit `.env` files.
- Prefer Bun commands (`bun`, `bunx`) and keep scripts in `package.json` in sync.

## Common commands

Use `bun` for consistency with CI and local tooling.

### Install

- `bun install`

### Dev server

- `bun run dev`

### Build/preview

- `bun run build`
- `bun run preview` (serves `.output/`)
- `bun run start` (runs `.output/server/index.mjs`)

### Lint/format

- `bun run lint` (Oxlint, type-aware)
- `bun run format` (Oxlint format + check)

### Database (Drizzle)

- `bun run db:generate`
- `bun run db:push`
- `bun run db:pull`
- `bun run db:check`
- `bun run db:studio`

### Tests (Vitest)

- `bun run test`
- `bun run test:k6`
- `bun run test:vitest`

Notes:

- `vitest.config.ts` includes `tests/vitest/**.{test,spec}.ts` and excludes `tests/k6/**.test.ts`.

## Formatting & linting rules

Formatting is enforced by Oxfmt and linting by Oxlint.

### Formatting (Oxfmt)

- Single quotes (`'`), not double quotes.
- Import sorting groups (no blank lines between groups):
  1. external-type, internal-type, parent-type, sibling-type, index-type
  2. side-effect
  3. builtin
  4. external
  5. internal
  6. parent
  7. sibling
  8. index
- Do not sort `package.json` keys automatically (`experimentalSortPackageJson: false`).

### Lint (Oxlint)

- `no-console` is an error. Use `consola` instead if logging is required.
- Prefer safe TypeScript: many `typescript/no-unsafe-*` rules are errors.
- `typescript/only-throw-error` and `typescript/prefer-promise-reject-errors` are enforced.
- `typescript/use-unknown-in-catch-callback-variable` is enforced.
- Avoid unnecessary type assertions and template expressions.

## Code style guidelines

Follow existing code style in `routes/`, `middleware/`, and `database/`.

### Imports

- Use absolute path alias `~/` (see `tsconfig.json`) for internal modules.
- Keep import lists small and ordered; avoid unused imports.
- Prefer named imports from `nitro/h3` (e.g., `defineHandler`).

### File/route naming

- Nitro routes live under `routes/`.
- Use file-based routing conventions: `routes/api/users/[id].post.ts`.
- Middleware lives under `middleware/` and uses default exports.

### TypeScript + types

- Prefer `const` and explicit, narrow types where needed.
- Avoid `any`; use `unknown` for catch clauses.
- Use Zod schemas for external inputs (query/body/params).

### Functions & handlers

- Handlers are default exports returning plain objects.
- Use `defineHandler` or `eventHandler` from `nitro/h3`.
- Validate inputs with `readValidatedBody`, `getValidatedQuery`, `getValidatedRouterParams`.

### Error handling

- Throw `Error` instances (not strings or plain objects).
- Prefer early validation with Zod; let validation helpers handle 4xx errors.
- Avoid `console.*`; use `consola` if needed.

### Naming conventions

- Variables/functions: `camelCase`.
- Constants: `camelCase` unless they are top-level immutable config.
- Files: `kebab-case` where relevant (e.g., `db-credentials.ts`).

### Environment variables

- Use `Bun.env` for env access.
- Validate env with Zod (`dbCredentialsSchema` in `types/schemas/`).
- `DB_SSL` is parsed from string to boolean.
- Keep `.env.example` updated if new env vars are added.

### Database

- Drizzle config: `drizzle.config.ts` (Postgres, snake_case).
- Schemas live in `database/schemas/`.
- Migrations output to `database/migrations/`.

## Project structure

- `routes/` Nitro API handlers.
- `middleware/` global or named middleware.
- `plugins/` global or named plugins.
- `database/` Drizzle config + schemas.
- `types/` shared types and schemas.
- `public/` static assets.

## CI expectations

- CI runs `bun run lint` and `bun run build`.
- Keep changes compatible with Bun runtime.

## Working tips for agents

- Read existing handlers for patterns before adding new routes.
- Use `bun run test:vitest` for tests; add a `test` script only if requested.
- Update docs and `.env.example` when introducing new config.

## When in doubt

- Run `bun run lint` and `bun run format`.
- Keep edits minimal and aligned with existing files.
