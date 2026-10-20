# Cómo agregar filtros y paginación al dashboard

Esta receta resume el patrón de paginación en servidor del proyecto. El detalle paso a paso está en la skill [`.agents/skills/dashboard-filters-pagination/SKILL.md`](../../.agents/skills/dashboard-filters-pagination/SKILL.md); consúltala antes de implementar.

## 1. Modelo: paginación en servidor

`<Model>.getAll(querys, paginate)` devuelve `{ data, pagination }` (patrón server-pagination). `limit: 0` significa "sin límite"; el resto de llamadores que quieren la lista completa deben destructurar `.data`.

## 2. Ruta GET: parámetros de query

La ruta lee los parámetros del querystring y los traduce a filtros mongoose:

```js
const search = req.nextUrl.searchParams.get("search");
const page = req.nextUrl.searchParams.get("page");
const limit = req.nextUrl.searchParams.get("limit");
```

Regex insensible para `search` (`$regex` + `$options: "i"`) sobre los campos de texto relevantes; enums como filtros exactos (`purpose`, `method`, `status`...).

## 3. Frontend: estado de URL con nuqs

Los filtros y la página viven en la URL (`nuqs`), no en estado local: se comparten, se recargan y se navegan con el botón atrás. Ejemplo vivo: los filtros dentro de `InventoryGrid.jsx` (`useQueryState` de nuqs) y la lista de pacientes en `PatientGrid.jsx`.

## 4. Query con keepPreviousData

Las `queryOptions` usan `placeholderData: keepPreviousData` para que al cambiar de página no parpadee la lista mientras llega lo nuevo.

## 5. UI: toolbar + paginación

- Barra y chips genéricos: `src/components/dashboard/ui/bar/Toolbar.jsx` y `src/components/dashboard/ui/chips/Chip.jsx`.
- `GlassPaginationBasic` (`src/components/ui/glass-componenst/GlassPagination.jsx`; la carpeta lleva el typo histórico) abajo, usando `pagination` de la respuesta.

## Ejemplos vivos en el repo

- **Inventario**: filtros por categoría/estado + paginación (`InventoryGrid.jsx` con `useQueryState` de nuqs).
- **Pacientes**: `search` por nombre/apellido (`GET /api/dashboard/patients?page&limit&search`).
- **Contribuciones**: filtros por propósito, método y estado (`feat(Frontend/dashboard/contributions)`).
