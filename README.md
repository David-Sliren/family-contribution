# Contribución Familiar

Plataforma web para organizar los aportes de la familia hacia el tratamiento continuo de un paciente: registra pacientes, recibe aportes por pasarela de Mercado Pago o transferencia manual, controla el fondo disponible con gastos e inventario, y deja un registro de eventos de la cuenta.

## Stack

- **Next.js 16** (App Router, JavaScript/JSX plano, Tailwind v4)
- **MongoDB + mongoose** (conexión cacheada en `src/utils/mongoose-helper/db.js`)
- **Better Auth** (sesiones, verificación de correo obligatoria, recuperación de contraseña y correos con Nodemailer/Gmail SMTP)
- **TanStack Query**, **zustand** y **nuqs** (estado de datos, estado de UI y estado de URL)
- **Mercado Pago** (pasarela de pago en COP con webhook de confirmación)
- **pnpm** como gestor de paquetes

## Requisitos

- Node.js 20.9 o superior y pnpm
- MongoDB local o Atlas (en desarrollo se usa el contenedor Docker `mongo_dev`)
- Credenciales de Gmail de aplicación (`GMAIL_USER` / `GMAIL_APP_PASSWORD`)
- Access token de Mercado Pago (`MP_ACCESS_TOKEN`)

## Puesta en marcha

1. `cp .env.example .env.local` y completa las variables (descripción en [`docs/reference/entorno-y-comandos.md`](docs/reference/entorno-y-comandos.md)).
2. `pnpm install`
3. Levanta MongoDB (por ejemplo `docker start mongo_dev`).
4. `pnpm dev` y abre http://localhost:3000.

El tutorial completo, incluida la verificación del correo en el primer registro, está en [`docs/tutorials/primeros-pasos.md`](docs/tutorials/primeros-pasos.md).

## Comandos

| Comando               | Descripción                                    |
| --------------------- | ---------------------------------------------- |
| `pnpm dev`            | Servidor de desarrollo (Turbopack)             |
| `pnpm build`          | Build de producción                            |
| `pnpm start`          | Sirve el build de producción                   |
| `pnpm lint`           | ESLint (única verificación automatizada)       |
| `pnpm lint:fix`       | ESLint con corrección automática               |

## Documentación

La documentación sigue el esquema [Diátaxis](https://diataxis.fr/) y vive en [`docs/`](docs/README.md):

- [`docs/tutorials/`](docs/tutorials/) — lecciones paso a paso para aprender usando el proyecto.
- [`docs/how-to/`](docs/how-to/) — recetas para tareas concretas.
- [`docs/reference/`](docs/reference/) — descripción técnica exacta (API, modelos, entorno).
- [`docs/explanation/`](docs/explanation/) — contexto y decisiones de diseño.

Otros recursos: convenciones del código en [`AGENTS.md`](AGENTS.md), sistema de diseño en [`DESIGN.md`](DESIGN.md) y skills del proyecto en [`skills/README.md`](skills/README.md).

## Estructura

```text
src/
  app/         rutas (App Router): (home), dashboard, api, auth y proxy
  components/  componentes aplanados por feature + ui/ genéricos
  models/      clases con conexión, reglas de negocio y roles
  database/    schemas de mongoose (colecciones)
  schemas/     validación zod (backend y frontend)
  services/    clientes axios por feature (config + métodos)
  hooks/       tanstack query/mutation, useHookForm, etc.
  store/       zustand (notificaciones, medicine)
  utils/       auth, correos, mongoose helper, configuración tanstack
```

El detalle completo está en [`docs/reference/entorno-y-comandos.md`](docs/reference/entorno-y-comandos.md) y la arquitectura en [`docs/explanation/arquitectura.md`](docs/explanation/arquitectura.md).
