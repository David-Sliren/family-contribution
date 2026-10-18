---
name: dashboard-filters-pagination
description: Use when adding search, filters, or pagination to any dashboard list/table (inventory, expenses, and future features like contributions, users, patients) in family-contribution. Documents the project pattern: paginated mongoose model, GET query params, nuqs URL state, tanstack query options with keepPreviousData, and the GlassPaginationBasic component.
---

# Patron de filtros y paginacion del dashboard

Patron del proyecto para que cada lista del dashboard (inventario, gastos, y proximas: contribuciones, usuarios, pacientes) haga **filtros y paginacion en el servidor (MongoDB)**, con el estado filtrado viviendo en la **URL** (nuqs). El filtrado en memoria del cliente queda prohibido para estos listados.

Referencia real: implementaciones de `inventory` y `expenses`. El patron se replica identico cambiando solo el nombre de la coleccion y los campos de filtro.

## Arquitectura del flujo

```
URL (nuqs) -> page.jsx (prefetch server) -> hook tanstack -> service axios -> GET /api/<feature> -> Model.getAll(query, paginate) -> MongoDB
```

## 1. Backend: modelo paginado (`src/models/<feature>.js`)

```js
static async getAll(querys, paginate) {
  await conectToData();

  const [items, totalItems] = await Promise.all([
    Model.find(querys)
      .sort("-createdAt")
      .skip((paginate.page - 1) * paginate.limit)
      .limit(paginate.limit),
    Model.countDocuments(querys),
  ]);

  if (!items) {
    const customError = new Error("not found <feature>");
    customError.code = "NOT_FOUND_<FEATURE>"; // ej. NOT_FOUND_EXPENSES
    throw customError;
  }

  const totalPages = totalItems === 1 ? 1 : Math.ceil(totalItems / paginate.limit);
  const hasNextPage = paginate.page < totalPages;
  const hasPrevPage = paginate.page > 1;

  return {
    data: items,
    pagination: {
      totalItems,
      totalPages,
      currentPage: paginate.page,
      limit: paginate.limit,
      hasNextPage,
      hasPrevPage,
    },
  };
}
```

- Respuesta SIEMPRE `{ data: [...], pagination: {...} }` — el frontend usa `data.data` y `data.pagination`.
- El contrato `getAll()` pasa a recibir `(querys, paginate)`; actualiza la ruta que lo llamaba sin argumentos.

## 2. Backend: ruta GET (`src/app/api/<feature>/route.js`)

```js
export const GET = async (req) => {
  const searchParams = req.nextUrl.searchParams;
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  const paginate = { page: 1, limit: 10 }; // limites por defecto
  const query = {};

  if (page) paginate.page = page;
  if (limit) paginate.limit = limit;

  if (category) query.category = category;               // filtro exacto
  if (search) query.name = { $regex: search, $options: "i" }; // busqueda insensible

  try {
    const items = await Model.getAll(query, paginate);
    return Response.json(items);
  } catch (error) {
    if (error.code === "NOT_FOUND_<FEATURE>") {
      return Response.json({ error: error.message }, { status: 404 });
    }
    return Response.json({ error: "internal server error" }, { status: 500 });
  }
};
```

- Los `searchParams` se leen de `req.nextUrl.searchParams` (ya no `async ()`).
- Filtro por cada campo nuevo = una llave en `query`; enum los define, mimica la convencion de `category` en inventory/expenses.

## 3. Servicio (`src/services/<feature>/<feature>.js`)

```js
export const getAllFeature = async (queryParams) => {
  const queries = {};

  if (queryParams.category) queries.category = queryParams.category;
  if (queryParams.search) queries.search = queryParams.search;
  if (queryParams.page) queries.page = queryParams.page;
  if (queryParams.limit) queries.limit = queryParams.limit;

  const querys = new URLSearchParams(queries).toString();
  const enpoint = querys.length ? `/?${querys}` : "/";

  try {
    const { data } = await baseUrlFeature.get(enpoint);
    return data;
  } catch (error) {
    throw getServiceError(error);
  }
};
```

## 4. Hook tanstack (`src/hooks/tanstack/query/useQuery<Feature>.jsx`)

```js
export const featureQueryOptions = ({ category, search, page = 1, limit = 10 }) => {
  const normailized = { page, limit, category: category ?? "", search: search ?? "" };

  return queryOptions({
    queryKey: ["<feature>", normailized],        // la clave normalizada dispara refetch por filtro
    queryFn: () => getAllFeature({ ...normailized }),
    placeholderData: keepPreviousData,            // evita flicker entre paginas
  });
};

export const useFeatureQueryAll = (queryParams) =>
  useSuspenseQuery(featureQueryOptions(queryParams));
```

- Si el feature ya tenia `featureQueryOptions()` y se prefetcheaba en el layout del dashboard, se **quita del layout** (no tiene URL) y se pasa a la pagina.

## 5. Pagina (server component) — prefetch con la URL

```js
export default async function FeatureDashboard({ searchParams }) {
  const params = await searchParams;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(featureQueryOptions(params));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Index ... />
    </HydrationBoundary>
  );
}
```

## 6. Componente de lista (client) — estado en la URL con nuqs

```js
const [search] = useQueryState("search", parseAsString.withDefault(""));
const [category] = useQueryState("category", parseAsString.withDefault(""));
const [page, setPage] = useQueryState(
  "page",
  parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true, scroll: true }),
);

const { data } = useFeatureQueryAll({ category, search, page, limit: 10 });
const pagination = data.pagination;

function handleNextPage() { setPage((old) => old + 1); }
function handlePrevPage() { setPage((old) => Math.max(old - 1, 1)); }

if (!data.data.length) return <AnimationEmpy title="..." />;

return (
  <section className="space-y-2.5">
    <GridORListContainer>...data.data.map(...)</GridORListContainer>
    <GlassPaginationBasic
      pageNumber={page}
      totalPages={pagination.totalPages}
      hasNext={pagination.hasNextPage}
      hasPrev={pagination.hasPrevPage}
      handleNext={handleNextPage}
      handlePrev={handlePrevPage}
    />
  </section>
);
```

- Nombre de variable: `const { data: xxx }` y mapear con `xxx.data`, nunca `data` directo.
- Se mantiene el contenedor de scroll propio del feature: grilla (`grid`) para cards, o `ListContainer` (`max-h-125 overflow-y-auto scroll-hiden`) para listas.

## 7. Toolbar con filtros (`Toolbar` + `SelectFilter`)

`Toolbar.jsx` ya maneja la busqueda con nuqs (`search`) + debounce (400ms) y resetea `page` a 1. Los filtros van como `children` usando `SelectFilter`:

```jsx
<Toolbar searchName="Buscar ..." selectFilter="category" optionInitialName="Todos">
  <SelectFilter
    selectFilter="category"
    fieldValues={["-categoria", "transporte", "medicina", "suplemento", "clinico", "suministro", "cuidador"]}
  />
</Toolbar>
```

- El prefijo `-` en `fieldValues` (ej. `"-categoria"`) crea la opcion "Todos" (valor vacio), y se muestra sin el guion (`select` con `capitalize`).
- `SelectFilter` resetea `page` a 1 al cambiar; key del estado en URL = `selectFilter`.
- Envolver la lista/grilla en `<Suspense fallback={<ThreePoints />}>` en el `Index`.

## Reglas del patron

- **Limites por defecto:** `page = 1`, `limit = 10` (tanto en ruta como en hook).
- **Sort:** `-createdAt` salvo que el feature pida otra cosa.
- **Sin `console.log()`** en el codigo guardado (convencion del repo).
- **Commits separados:** `feat(Backend/<feature>): ...` (modelo + ruta) ANTES que `feat(Frontend/dashboard/<feature>): ...` (servicio + hook + pagina + componentes). Ver skill `git-commit-convention`.
- Filtros futuros: buscar por otro campo = agregar llave al `query` de la ruta con el mismo nombre, propagarla por servicio/hook/componente y exponerla con otro `SelectFilter`.