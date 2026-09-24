# AGENTS.md

Next.js 16 App Router app (package `contribution-aleida`) for a family contribution platform. Plain JavaScript/JSX, no TypeScript; Tailwind v4. UI copy and all repo conventions are in Spanish.

## Commands
- Package manager is **pnpm** (`pnpm-lock.yaml`). Use `pnpm dev` / `pnpm build` / `pnpm start`.
- `pnpm lint` (= `eslint`, flat config in `eslint.config.mjs`) and `pnpm lint:fix`. There is **no test suite and no typecheck** — lint is the only automated verification.

## Layout & data flow
- Alias `@/*` → `src/*`.
- Backend: `src/app/api/**/route.js` → static classes in `src/models/*.js` (DB connect + business rules + role checks) → mongoose schemas in `src/database/*.js`. Cached connection via `src/utils/mongoose-helper/db.js` (throws without `MONGODB_URI`).
- Validation is duplicated on purpose: zod backend schema in `src/schemas/*.js` (export `...SchemaBanckend`) and a frontend one in `src/schemas/*.frontend.js`. Server-controlled fields (`updateBy`, `userId`, `paymentId`) are injected server-side and deliberately omitted from frontend schemas. Keep that split.
- Frontend data layer is per feature: `src/services/<feature>/config.js` (axios instances) + `<feature>.js` (methods). Errors are thrown through `getServiceError` (`src/services/error.js`), matching the `.error`/`.message` keys routes return.
- TanStack Query wrappers in `src/hooks/tanstack/{query,mutation}`; query hooks export `queryOptions` used by the dashboard layout for server prefetch + hydration.
- UI state via zustand (`src/store/`). Dashboard filters/pagination are URL state with `nuqs` (see inventory toolbar).
- Route handlers use async params: `const { id } = await params`.

## Auth
- Auth proxy (Next 16 renamed middleware→proxy) is `src/proxy.js`; matcher covers `/auth`, `/medicine`, `/additional-costs`, `/profile`, `/dashboard`. Role `user` cannot access `/dashboard`; unauthenticated requests redirect to `/auth/login`.
- JWT via `jose`, httpOnly cookie `access-token` (constant `TOKEN` in `src/constants/config.js`), 2h expiry. Routes verify with `jwtVerify` and take `payload.id` for server-injected fields. Mongoose schema plugin in `src/utils/mongoose-helper/cleanDatabase.js` maps `_id`→`id` and strips private fields.
- Read env vars through `src/constants/env.js`, never `process.env` inline.

## Env / payments
- Requires `.env.local` (see `.env.example`): `MONGODB_URI`, `SECRET_JWT`, `MP_ACCESS_TOKEN`, `BASE_URL`, `NEXT_PUBLIC_GA_ID`.
- MercadoPago checkout in COP; min amount 6000 is enforced in both schemas. `BASE_URL` feeds the webhook and back URLs, so local payment testing needs a public tunnel (an ngrok origin is in `allowedDevOrigins` of `next.config.mjs`). Approved payments create a Contribution via `src/app/api/payment/webhook/route.js` (duplicate `paymentId` is ignored, error 11000).
- Only `res.cloudinary.com` is allowed in `next.config.mjs` remote images. `pnpm-workspace.yaml` `allowBuilds` gates native deps (bcrypt, sharp, unrs-resolver) — new native deps may need an entry there.
- The `.opencode/` folder is an unrelated npm project (OpenCode plugin dep), not the app; leave its own `package.json`/lockfile alone.

## Commits
- Follow the repo's commit convention: load the `git-commit-convention` skill before making/splitting/proposing commits. Key rules: lowercase Spanish, `tipo(scope): descripcion`, types `feact`/`fix`/`refactor`/`style`/`chore` (note the `feact` spelling), work on branch `feact`, no `console.log` in committed code, stage only intended files.