# Arquitectura y flujos

Las decisiones estructurales de la plataforma y sus razones. Lo "cómo" está en [`../reference/`](../reference/) y en [`../how-to/`](../how-to/).

## Capas: route → model → schema

```text
src/app/api/**/route.js   HTTP: sesión, roles, inyección de campos, respuestas
        ↓
src/models/*.js           negocio: conexión, reglas, errores con .code
        ↓
src/database/*.js         mongoose: colección, enums, virtuales
```

- **Routes delgadas**: parsean, chequean sesión/rol, inyectan campos de servidor (`createBy`, `updateBy`, `patientId`) y traducen errores de negocio a HTTP. No contienen reglas.
- **Models con vida propia**: son clases estáticas que conectan la BD (`conectToData()`), aplican reglas (fondos, roles, paciente principal) y lanzan errores con `.code` para que las rutas los traduzcan.
- **Schemas**: mongoose para persistencia y zod para validación. La validación está **duplicada a propósito** (backend `...Schema` + frontend `...Frontend`): el cliente da feedback temprano y el servidor no confía en él. Los campos server-controlled se omiten del schema frontend.

Todo el estado transaccional de la sesión vive en Better Auth (ver [`autenticacion-y-correos.md`](autenticacion-y-correos.md)).

## createBy/updateBy en lugar de userId

Los modelos de contribución/paciente/gasto/inventario usan `createBy` (quién crea/aporta) y `updateBy` (quién actualiza). El viejo `userId` mezclaba "quién es el dueño del registro" con "quién participó"; los datos familiares son colaborativos: varios parientes aportan al mismo paciente y cualquiera administra el mismo espacio. Nombrar los campos por su significado elimina esa ambigüedad y hace legible el `foreignField` de los virtuales.

## Un solo paciente principal y métricas centralizadas

`/api/main-patient` elige el paciente `isMain` y devuelve sus totales poblados. Dashboard (`MetricsGrid`), home (`Stats`), el formulario de contribuciones y el selector de transferencia leen **todos de la misma fuente**: si cada pantalla calculara su propio "fondo disponible", divergirían. `Patients.setMain` garantiza unicidad (`updateMany $ne id`).

Los totales son **virtuales con getters** en el schema (`totalFunds`, `monthFunds`, `totalExpenses`, `monthExpenses`) que leen los arrays poblados; sin populate devuelven `0` en vez de lanzar, lo que hace inocuo el camino no-poblado. `funds`/`expenses` se **eliminan del JSON de salida** (solo se serializan los totales) para no filtrar listas enteras de documentos en cada respuesta.

## Fondo para gastos

El dinero no es un libro de contabilidad: `Expenses.create/update` rechazan gastos que superen `totalFunds − totalExpenses` (`INSUFFICIENT_FUNDS` → 400). La regla vive en el modelo (no en la ruta ni en el formulario), aunque el formulario la anticipe con los totales de `main-patient` para no mandar una petición que va a fallar. Solo cuentan los aportes `confirmado`.

## Paginación en servidor

Las listas usan `{ data, pagination }` con `page`/`limit` (y filtros) en el querystring, estado de URL con **nuqs** y `keepPreviousData` en TanStack: compartir una URL reproduce exactamente la misma vista, el botón atrás funciona y la lista no parpadea. El estado de URL también protege el SSR: las páginas del dashboard pre-fetchean con `queryOptions` + `HydrationBoundary`.

Tres niveles de estado, sin solaparse: **TanStack** (datos del servidor), **nuqs** (estado que vive en la URL) y **zustand** (UI transitoria como notificaciones). Los formularios usan `useHookForm` (react-hook-hook + zod).

## Eventos como auditoría

Crear, actualizar o eliminar una contribución, gasto o inventario dispara `Events.register`, que compone la descripción en el servidor y **nunca rompe la mutación principal** (try/catch + log). Es una bitácora derivada: si el registro del evento falla, el negocio no puede quedarse a medias.

## Defensa en profundidad en el dashboard

`src/proxy.js` (Next 16 renombró middleware→proxy) protege `/dashboard` y `/api/dashboard/*`: sin sesión → `401`/redirect, no-admin en dashboard → `403`. Los `GET` de `/api/dashboard/*` se eximen del chequeo de sesión porque el prefetch SSR hace self-fetch sin cookies; los listados son públicos a nivel de route handler y la protección real de las pantallas la da el proxy. Las mutaciones exigen sesión+admin **en el proxy y en la ruta**.

## Componentes aplanados y páginas livianas

Cada feature vive en `src/components/<feature>/` sin subcarpetas (Card, List/Grid, dialogs...), con prefijo de feature en PascalCase; el desambiguado es por ruta, no por nombre. Las `page.jsx` son casi vacías: metadata + prefetch + composición. Los layouts genéricos (`PageLayout`, `DashboardShell`) evitan duplicar el esqueleto.

## Sin tests automatizados

El repo no tiene suite de tests ni typecheck: **`pnpm lint` es la única verificación automatizada**. La calidad se apoya en la validación zod duplicada, los errores tipados del backend y la verificación manual de los flujos (ver [`../how-to/agregar-un-feature-crud.md`](../how-to/agregar-un-feature-crud.md)). Es una decisión consciente del tamaño del proyecto, no un descuido.

## JavaScript plano

Sin TypeScript: JSX/JS puro con `jsconfig.json` y alias `@/*`. La validación en runtime (zod) y las reglas del negocio en los models cubren el espacio donde TypeScript normalmente aportaría contratos.
