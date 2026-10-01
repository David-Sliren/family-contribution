# AGENTS.md

Next.js 16 App Router app (package `contribution-aleida`) for a family contribution platform. Plain JavaScript/JSX, no TypeScript; Tailwind v4. UI copy and all repo conventions are in Spanish.

## Commands
- Package manager is **pnpm** (`pnpm-lock.yaml`). Use `pnpm dev` / `pnpm build` / `pnpm start`.
- `pnpm lint` (= `eslint`, flat config in `eslint.config.mjs`) and `pnpm lint:fix`. There is **no test suite and no typecheck** — lint is the only automated verification.

## Layout & data flow
- Alias `@/*` → `src/*`.
- Backend: `src/app/api/**/route.js` → static classes in `src/models/*.js` (DB connect + business rules + role checks) → mongoose schemas in `src/database/*.js`. Cached connection via `src/utils/mongoose-helper/db.js` (throws without `MONGODB_URI`).
- Validation is duplicated on purpose: zod backend schema (export `...SchemaBanckend`, e.g. `userBackendSchema`) and a frontend one (export `...Fronted`). Only `contribution.frontend.js` is a separate file; `user/patient/inventory/expense` keep both exports in the same file. Server-controlled fields (`updateBy`, `userId`, `paymentId`) are injected server-side and deliberately omitted from frontend schemas. Keep that split. Auth forms use `src/schemas/login.js` and `userFrontedSchema`.
- Frontend data layer is per feature: `src/services/<feature>/config.js` (axios instances) + `<feature>.js` (methods). Errors are thrown through `getServiceError` (`src/services/error.js`), matching the `.error`/`.message` keys routes return.
- TanStack Query wrappers in `src/hooks/tanstack/{query,mutation}`; query hooks export `queryOptions` usados por las páginas para prefetch en servidor + `HydrationBoundary` (el layout del dashboard solo pre-fetchea `main-patient`).
- UI state via zustand (`src/store/`): only `store/ui/notifications.js` and `store/medicineStore.js` (the old `store/user/userStore.js` was deleted). Dashboard filters/pagination are URL state with `nuqs` (see inventory toolbar).
- Manual API probes live in `src/requests/**/*.rest`; `src/app/api/[...not-found]/route.js` returns a 404 JSON for unmatched API paths.
- Route handlers use async params: `const { id } = await params`.

## Organización de componentes y archivos
- Ruta por feature: `src/app/(home)/<feature>/page.jsx`; dashboard: `src/app/(home)/dashboard/<feature>/page.jsx`.
- **Pages livianas**: importan `Index` de `@/components/<feature>/Index`, definen `titleData` (home) o `metadata` (dashboard) con title/subtitle/description y, en dashboard, pre-fetchean con `...QueryOptions` + `HydrationBoundary`. No llevan JSX de UI.
- **Componentes de la feature aplanados** en `src/components/<feature>/` (sin subcarpetas por pantalla) y con prefijo de la feature en PascalCase:
  - `Index.jsx` → `export const Index = ({ title, subtitle, description })`; compone layout genérico + filtros/toolbar + `Suspense`/`ThreePoints` + lista + dialogs. "Index" es el componente de sección, **NO un barrel**: no existen archivos `index.js` de re-export.
  - `<Feature>List.jsx` o `<Feature>Grid.jsx`: lista cliente con URL state `nuqs` (page + `GlassPaginationBasic`) y query de TanStack.
  - `<Feature>Card.jsx`: tarjeta de item individual.
  - `Add<Feature>Dialog.jsx` / `Update<Feature>Dialog.jsx`: modales CRUD.
- **Layouts genéricos**: `PageLayout` en `src/components/ui/layout/` (home, usa `Title`) y `DashboardShell` en `src/components/dashboard/layout/` (dashboard, header eyebrow+title+description); ambos con firma `({ title, subtitle, description, className, children })`.
- Utilidades del dashboard en `src/components/dashboard/ui/` (bar/Toolbar, chips/Chip).
- Excepciones al aplanado: `auth/login/Login.jsx` y `auth/register/Register.jsx` viven en subcarpeta, igual que los subárboles de `profile/`. El proveedor está en `src/components/provaider/` (typo histórico de "provider").
- Solo `page.jsx` usa default export; el resto usa `export const`. Nombres con prefijo de feature se distinguen por ruta (ej. `InventoryCard` en home y en dashboard).

## Auth
- **Better Auth** (`better-auth` + adaptador `better-auth-mongoose`), ya no se usa JWT con `jose`.
- Server config en `src/utils/auth.js`: `mongooseAdapter(mongoose.connection, { adoptExistingModels: true })` reutiliza el modelo mongoose `User` (`src/database/user.js`); `additionalFields` agrega `tel`, `relationship` y `role` (`role` con `input: false`, o sea controlado por servidor); `emailAndPassword` habilitado; plugin `username()`; `cookiePrefix: PREFIXTOKEN` (`"family-contribution"` en `src/constants/config.js`).
- Cliente en `src/utils/auth-client.js` (`createAuthClient` con `BASE_URL` + `usernameClient()`). Login llama `authClient.signIn.username` y registro `authClient.signUp.email`; no quedan rutas `api/auth/login|register|logout` escritas a mano.
- Handler catch-all `src/app/api/auth/[...all]/route.js` (`toNextJsHandler(auth)`).
- Sesión en servidor: `getSession` en `src/utils/getUserData.js` = `cache(() => auth.api.getSession({ headers: await headers() }))`. Las rutas leen `session.user.id`/`session.user.role` para inyectar campos y verificar rol (mutaciones de `/dashboard` exigen `role === "admin"`).
- `src/proxy.js` (Next 16 renombró middleware→proxy) usa `getSession()`; matcher: `/inventory`, `/expenses`, `/profile`, `/auth/:path*`, `/dashboard/:path*`. Sin sesión → JSON 401 en `/api/*` y redirect `/` en páginas; con sesión en ruta de auth → redirect `/`; no-admin en dashboard → 403/redirect.
- Sesión en cliente: `AuthProvider` (`src/components/provaider/`, ojo con el typo) recibe la sesión del server; `useUserStore()` **ya no es un store de zustand** y devuelve `{ user, isAuth, isPending, logout }` respaldado por `authClient.useSession()` (su argumento `selector` hoy se ignora).
- Mongoose schema plugin `cleanUser` en `src/utils/mongoose-helper/cleanDatabase.js` mapea `_id`→`id` y elimina campos privados.
- **Legado (no usar)**: `SECRET`/`TOKEN` en `src/constants/`, los imports comentados en `proxy.js`/`AuthProvider.jsx` y `store/user/userStore.js` (borrado) son restos de la auth JWT anterior.

## Env / payments
- Requires `.env.local` (see `.env.example`): `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `BASE_URL`, `MP_ACCESS_TOKEN`, `NEXT_PUBLIC_GA_ID`. `SECRET_JWT` es legado (solo lo lee el export `SECRET`) y está pendiente de eliminar.
- Lee las variables con `src/constants/env.js`, nunca `process.env` en línea. `BASE_URL` cae a `VERCEL_URL` y `MP_ACCESS_TOKEN` se expone como `ACCESSTOKEN_MP` (`src/constants/payment.js`).
- MercadoPago checkout in COP; min amount 6000 is enforced in both schemas. `BASE_URL` feeds the webhook and back URLs, so local payment testing needs a public tunnel (an ngrok origin is in `allowedDevOrigins` of `next.config.mjs`). Approved payments create a Contribution via `src/app/api/payment/webhook/route.js` (duplicate `paymentId` is ignored, error 11000).
- Only `res.cloudinary.com` is allowed in `next.config.mjs` remote images. `pnpm-workspace.yaml` `allowBuilds` gates native deps (bcrypt, sharp, unrs-resolver) — new native deps may need an entry there.
- The `.opencode/` folder is an unrelated npm project (OpenCode plugin dep), not the app; leave its own `package.json`/lockfile alone.

## Commits
- Follow the repo's commit convention: load the `git-commit-convention` skill before making/splitting/proposing commits. Key rules: lowercase Spanish, `tipo(scope): descripcion`, types `feat`/`fix`/`refactor`/`style`/`chore`/`docs` (use `feat`, not the historical `feact` typo), work on branch `feat`, no `console.log` in committed code, stage only intended files.