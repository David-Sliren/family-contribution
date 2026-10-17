# Cómo agregar un feature CRUD completo

Receta siguiendo el patrón que ya usan pacientes, contribuciones, gastos e inventario. Ejecuta los pasos en orden; al final queda el feature completo por capas.

## 1. Schema de mongoose

Crea `src/database/<feature>.js`: campos con enums y refs, `timestamps: true` y `plugin(cleanIdPlugin)`. Exporta con el patrón de caché:

```js
export const Feature = models.Feature || model("Feature", featureSchema);
```

## 2. Validación zod

En `src/schemas/<feature>.js`, crea el par de schemas:

- `<feature>Schema` (backend): lo completa la ruta inyectando campos de servidor.
- `<feature>Fronted`/`<feature>SchemaFrontend`: la misma, `.omit()` los campos server-controlled (`createBy`, `updateBy`, `patientId`, `paymentId`...).
- `<feature>UpdateSchema = <feature>Schema.partial()` para updates parciales (p.ej. solo `{ image }`).

## 3. Modelo de negocio

En `src/models/<feature>.js`, clase con métodos estáticos: `await conectToData()`, errores personalizados con `.code` (p.ej. `NOT_FOUND_FEATURE`), reglas de negocio (rol, fondos disponibles...) y validación con zod antes de persistir.

## 4. Rutas

- `src/app/api/dashboard/<feature>/route.js`: `GET` (lista paginada `{ data, pagination }`) y `POST` (solo-admin).
- `src/app/api/dashboard/<feature>/[id]/route.js`: `GET`, `PUT` y `DELETE` (solo-admin).

En cada mutación: `getSession()` → `401` sin sesión → `403` si `session.user.role !== "admin"` → `safeParse` (issues → `400`) → inyectar `createBy`/`updateBy`/`patientId` desde la sesión → modelo. Recuerda `await params` (Next 16).

## 5. Proxy

`src/proxy.js` ya protege `/api/dashboard/*` (las mutaciones exigen sesión + admin) y deja pasar los `GET` para el prefetch SSR. Solo necesitas tocarlo si agregas una **ruta de página** nueva fuera del matcher.

## 6. Servicio

- `src/services/<feature>/config.js`: instancia axios con `baseURL` del endpoint.
- `src/services/<feature>/<feature>.js`: métodos (`getAll`, `getById`, `create`, `update`, `remove`...).
- Los errores salen por `getServiceError` (`src/services/error.js`) para casar con las llaves `.error`/`.message` que devuelve el backend.

## 7. Hooks TanStack

- `src/hooks/tanstack/query/useQuery<Feature>.jsx`: `useQuery`/`useSuspenseQuery` + `queryOptions` exportados (la página los usa para prefetch en servidor).
- `src/hooks/tanstack/mutation/useMutation<Feature>.jsx`: en `onSuccess` invalida la lista afectada y, si mueve métricas, también `["main-patient"]`.

## 8. Componentes

En `src/components/<feature>/` (aplanados, prefijo de la feature):

- `Index.jsx`: compone layout (`PageLayout` en home, `DashboardShell` en dashboard) + toolbar + lista + dialogs.
- `<Feature>List.jsx` o `<Feature>Grid.jsx`: lista cliente con URL state `nuqs` (page + `GlassPaginationBasic`).
- `<Feature>Card.jsx`: tarjeta del item.
- `Add<Feature>Dialog.jsx` / `Update<Feature>Dialog.jsx`: `useHookForm` con el schema frontend, `FieldType`/`FieldSelect` y notificaciones del store.

## 9. Página

`src/app/(home)/dashboard/<feature>/page.jsx` liviana: `metadata` + `prefetchQuery(...QueryOptions(params))` + `HydrationBoundary` + `Index`. En home se usa `titleData` en lugar de prefetch.

## 10. Verificación

1. `pnpm lint` (única verificación automatizada del repo).
2. Prueba manual del CRUD completo y de los permisos (usuario no admin → `403`).
3. Sin `console.log` en el código que se commitea.
4. Commits por capa (Backend antes que Frontend) según [`preparar-commits.md`](preparar-commits.md).

Ver también: [`filtros-y-paginacion.md`](filtros-y-paginacion.md) para la parte de listas, y [`../reference/api.md`](../reference/api.md) como referencia del patrón de endpoints.
