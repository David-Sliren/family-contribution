# Entorno y comandos

## Variables de entorno

El proyecto lee las variables **siempre** desde `src/constants/env.js`, nunca `process.env` en línea. Se sirve desde `.env.local` (ver `.env.example` como plantilla).

### Privadas

| Variable                  | Obligatoria | Descripción                                                                                                   |
| ------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------- |
| `MONGODB_URI`             | Sí          | URI de conexión a MongoDB, p.ej. `mongodb://localhost:27017/tu-base`. Sin ella `src/utils/mongoose-helper/db.js` lanza error. |
| `BETTER_AUTH_SECRET`      | Sí          | Secreto de Better Auth; generar con `openssl rand -base64 32`.                                                 |
| `BETTER_AUTH_URL`         | Sí          | URL base de la app para Better Auth.                                                                           |
| `BASE_URL`                | Sí          | Alimenta el webhook y las back URLs de Mercado Pago y el cliente de auth; cae a `VERCEL_URL` si falta.          |
| `VERCEL_URL`              | No          | Aportada automáticamente en Vercel (en `env.js` se le antepona `https://`).                                     |
| `MP_ACCESS_TOKEN`         | Sí (pagos)  | Access token de Mercado Pago; se expone internamente como `ACCESSTOKEN_MP`.                                    |
| `CLOUDINARY_CLOUD_NAME`   | Sí (imágenes) | Nombre del cloud de Cloudinary.                                                                               |
| `CLOUDINARY_APY_KEY`      | Sí (imágenes) | API Key de Cloudinary. **El nombre contiene el typo histórico `APY`**, igual que en el código: no "corrijas" solo un lado. |
| `CLOUDINARY_APY_SECRECT`  | Sí (imágenes) | API Secret de Cloudinary; typo histórico `APY/SECRECT` también en el código.                                  |
| `GOOGLE_CLIENT_ID`        | No          | OAuth de Google para Better Auth.                                                                              |
| `GOOGLE_CLIENT_SECRET`    | No          | Secreto OAuth de Google.                                                                                       |
| `GMAIL_USER`              | Sí (correos) | Cuenta Gmail que envía los correos transaccionales.                                                            |
| `GMAIL_APP_PASSWORD`      | Sí (correos) | Contraseña de aplicación (myaccount.google.com/apppasswords; requiere verificación en dos pasos).              |

### Públicas

| Variable           | Descripción                                    |
| ------------------ | ---------------------------------------------- |
| `NEXT_PUBLIC_GA_ID`| ID de Google Analytics (`ANALYTICS` en `env.js`). |

> Los fallos de envío de correo **no rompen ningún flujo**: Better Auth los captura y solo loguea el error.

## Comandos

| Comando         | Qué hace                                          |
| --------------- | -------------------------------------------------- |
| `pnpm dev`      | Servidor de desarrollo (Turbopack, `.env.local`).  |
| `pnpm build`    | Build de producción (genera las 34 páginas).       |
| `pnpm start`    | Sirve el build de producción.                      |
| `pnpm lint`     | ESLint (flat config en `eslint.config.mjs`). **Es la única verificación automatizada: no hay tests ni typecheck.** |
| `pnpm lint:fix` | ESLint con corrección automática.                  |

Gestor de paquetes: **pnpm** (`pnpm-lock.yaml`). Los deps nativas nuevas pueden requerir entrada en `pnpm-workspace.yaml` → `allowBuilds`.

## Estructura de carpetas

```text
src/
  app/
    (home)/            rutas públicas: home, contribute, inventory, expenses, profile, auth
    (home)/dashboard/  rutas protegidas: page (home), contributions, expenses, inventory, patients, users
    api/               route handlers (ver reference/api.md); [...not-found] responde 404 JSON
    api/auth/[...all]  catch-all de Better Auth
  components/
    <feature>/         componentes aplanados por feature (Index, List/Grid, Card, dialogs)
    dashboard/         layout (DashboardShell) + ui/ (Toolbar, Chip) + home/ (MetricsGrid, ActivityTimeline)
    ui/                genéricos: Card, buttons, dialogs, form (FormLayout, FieldType, FieldSelect), loader/ThreePoints, avatar, email/TemplateEmail
    provaider/         AuthProvider y TanstackProvider (typo histórico de "provider")
  constants/           config.js, env.js, payment.js, sizes.js (FOLDER_IMAGES), analytics
  database/            schemas mongoose: user, patient, contribution, expense, inventory, event
  hooks/               useHookForm, tanstack/query (queryOptions) y tanstack/mutation
  models/              clases de negocio: conectan la BD, aplican reglas y roles
  requests/            probes manuales de la API (archivos *.rest)
  schemas/             zod: pares Backend/Frontend (contribution.frontend.js separado)
  services/            axios por feature: <feature>/config.js + <feature>.js + error.js
  store/               zustand: ui/notifications.js, medicineStore.js
  utils/               auth.js, auth-client.js, email.js, getUserData.js, cn.js,
                       mongoose-helper/ (db.js, cleanDatabase.js, virtualFuntions.js),
                       tanstackQuery-config/, payment/
  proxy.js             Next 16 middleware renombrado: protege rutas y mutaciones del dashboard
```

## Despliegue

- Solo `res.cloudinary.com` está permitido en `next.config.mjs` para imágenes remotas.
- En Vercel, `BASE_URL` puede derivar de `VERCEL_URL`; el resto de secretos van en el entorno del proyecto.
- Para probar la pasarela en local hace falta un origen público (tunel ngrok); hay un origen de ngrok en `allowedDevOrigins` de `next.config.mjs`. Ver [`../how-to/probar-pasarela-en-local.md`](../how-to/probar-pasarela-en-local.md).
