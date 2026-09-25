# DESIGN.md — Sistema de diseño de la plataforma de aportes familiares "Aleida"

Este documento describe de forma detallada el diseño visual y de interacción de `contribution-aleida`
(Next.js 16 App Router + Tailwind v4). Es la fuente de verdad de los patrones visuales: si un
componente hace referencia a "DESIGN.md" en un comentario, la sección citada vive aquí.

Los copy de UI y los títulos de los apartados están en español, igual que el resto del repositorio.

---

## 1. Visión del sistema

La plataforma gestiona los aportes económicos de una familia para el cuidado de salud de la abuela
Aleida. El diseño combina tres ingredientes:

1. **Paleta tonal Material 3 (Dynamic Color)**: un único seed de color púrpura produce una escala
   tonal completa (`primary`, `secondary`, `tertiary`, superficies y variantes). Toda la UI se
   construye sobre estas superficies; nunca sobre colores arbitrarios.
2. **Glassmorphism líquido**: superficies translúcidas con desenfoque, brillo interior y un filtro
   SVG de distorsión. Ver **Sección 3 — Glass & Gradient Rule**.
3. **Tipografía con carácter**: títulos en Montserrat Alternates, cuerpo en Inter.

Principios rectores:

- **Elegancia sobria**: fondos neutros (`surface-container-lowest`/`surface-container-low`), acentos
  puntuales con la escala tonal y el gradiente primario.
- **Todo es superficie, nada es plano**: los fondos masivos y los CTA primarios usan gradiente o
  glass, no rellenos planos duros.
- **Asimetría intencional**: las retículas favorecen el ritmo visual sobre la cuadrícula perfecta
  (ver **Sección 10 — Do & Don't**).
- **Familiar y cercano**: imágenes reales de la familia, animación suave y micro-interacciones.

---

## 2. Design Tokens

Los tokens se declaran en `src/app/globals.css` dentro de `@theme` (patrón Tailwind v4) y se exponen
como utilidades (`bg-surface-container-lowest`, `text-on-surface-variant`, etc.). Rutas clave:
`src/config/fonts.js`, `src/constants/bgBase64.js`, `src/utils/cn.js`.

### 2.1 Color — Paleta tonal Material 3

Seed: **`#6e36d2`** (violeta/surface-tint `#713ad5`). Los nombres siguen la nomenclatura M3:
rol (primary/surface/error...) + sufijo tonal (container/fixed/dim).

| Token | Hex | Uso típico |
| --- | --- | --- |
| `primary` | `#6e36d2` | Acciones, enlaces, texto de marca, estados activos |
| `on-primary` | `#ffffff` | Texto/icono sobre `primary` o gradiente primario |
| `primary-container` | `#8854ed` | Tints, avatares de marca, nodos de timeline activos, header del carrito |
| `on-primary-container` | `#fffbff` | Texto sobre `primary-container` / gradiente |
| `primary-fixed` / `primary-fixed-dim` | `#eaddff` / `#d2bcff` | Fondos suaves de marca, anillos de avatar, gradientes secundarios |
| `on-primary-fixed` / `on-primary-fixed-variant` | `#25005a` / `#5815bc` | Texto sobre `primary-fixed` |
| `secondary` | `#6d49b3` | Puntos de lista, texto secundario con carácter, pies de lottie |
| `secondary-container` | `#b48fff` | Badges de fondo de `secondary` |
| `secondary-fixed` / `secondary-fixed-dim` | `#ebddff` / `#d3bbff` | Fondo de chips neutrales/success y de badges de pill |
| `on-secondary-container` / `on-secondary-fixed-variant` | `#471e8b` / `#552f9a` | Texto de chips/`secondary-container` |
| `tertiary` / `tertiary-container` | `#6e4b98` / `#8864b2` | Acentos alternos (textos de empty states) |
| `tertiary-fixed` / `tertiary-fixed-dim` | `#eedbff` / `#dab9ff` | Variantes tone de superficie |
| `error` | `#ba1a1a` | Error, acciones destructivas (eliminar) |
| `error-container` | `#ffdad6` | Fondo de estados de error |
| `on-error` / `on-error-container` | `#ffffff` / `#93000a` | Texto de errores |
| `surface` / `surface-bright` | `#faf8fd` | Fondo global |
| `surface-dim` | `#dbd9de` | Versión oscurecida de la superficie |
| `surface-container-lowest` | `#ffffff` | Tarjetas, popovers, tablas, sidebar, `Card` |
| `surface-container-low` | `#f5f3f7` | Fondos de sección (stats), avatares de ícono, inputs |
| `surface-container` | `#efedf2` | Barras de progreso vacías, botones secundarios de tabla |
| `surface-container-high` / `surface-container-highest` | `#e9e7ec` / `#e3e2e6` | Hover de ítems de navegación |
| `surface-variant` | `#e3e2e6` | Variantes de superficie |
| `on-surface` | `#1b1b1f` | Texto principal (títulos, valores) |
| `on-surface-variant` | `#4a4454` | Texto secundario (subtítulos, descripciones, labels) |
| `outline` / `outline-variant` | `#7b7486` / `#ccc3d7` | Bordes suaves, placeholders |
| `inverse-surface` / `inverse-on-surface` | `#303034` / `#f2f0f4` | Superficies inversas (destacados) |
| `inverse-primary` | `#d2bcff` | Primary en contextos inversos |
| `surface-tint` | `#713ad5` | Tint del seed M3 |

Convenciones de uso:

- `text-on-surface-variant` para texto secundario y descripciones; `text-on-surface` para valores.
- Hover de listas/ítems: `hover:bg-surface-container-low` (y `/30`, `/50` para filas de tabla).
- Fondos de ícono en avatares circulares: `bg-primary/10 text-primary`.
- En `:root` quedan `--background` / `--foreground` para el modo oscuro por `prefers-color-scheme`
  (aún mínimo; el sistema vive en claro).

### 2.2 Tipografía

Fuentes (via `next/font/google`, ver `src/config/fonts.js`):

| Rol | Fuente | Peso | Aplicación |
| --- | --- | --- | --- |
| Display / headlines | **Montserrat Alternates** (`titleFont`) | 500, 700 | `h1`/`h2` de títulos y CTA, envuelve toda la página home (`page.jsx`) |
| Cuerpo | **Inter** (`bodyFont`) | 400+ | Variable `--font-inter` en `<html>`, texto, labels, tablas |

Escala tipográfica habitual en componentes:

- `h1` de sección: `text-4xl`/`text-5xl`/`lg:text-7xl font-extrabold tracking-tight` +
  `font-headline` (Montserrat). A veces `uppercase` (DashboardShell) o `lowercase [&::first-letter]:uppercase`.
- Eyebrow del dashboard: `text-[11px] uppercase tracking-[.12em] font-bold`.
- Títulos de tarjeta: `text-lg`/`text-[17px] font-display tracking-tight`.
- Valores numéricos grandes: `text-2xl`/`text-3xl`/`text-4xl font-display tracking-tight`.
- Texto cuerpo secundario: `text-[10px]`–`text-[13px] text-on-surface-variant font-body`.
- Labels de formulario: `text-xs font-semibold tracking-[0.05em]`.
- Chips: `text-[11px] font-bold uppercase`.

### 2.3 Sombras, radios y superficies

Hay un vocabulario de sombras/radios "tonales" usado como marcador semántico en los componentes:

| Nombre | Intención | Ejemplo de uso |
| --- | --- | --- |
| `tonal-shadow-sm` | Sombra suave tonal para cards/paneles grandes | `Stats`, `ContributionTable`, `PortCard`, `FloatCard`, `FormLayout` |
| `shadow-tonal-sm` | Sombra tonal en hover de botones | hover de `ButtonVariant` |
| `shadow-tonal-lg` | Sombra tonal de diálogos | `Modal` |
| `rounded-card` | Radio base de tarjetas | `Card`, `MetricCard`, `PanelCard` |
| `rounded-2xl` / `rounded-[2rem]` / `rounded-[3rem]` | Radios de paneles y avatares-Card | formularios (`rounded-[2rem]`), foto del paciente (`rounded-[3rem]`), modal |
| `rounded-full` | Píldoras: botones, chips, inputs de búsqueda | `ButtonVariant`, `Chip`, `SearchInput` |

> **Nota de implementación:** varias de estas clases (`tonal-shadow-sm`, `shadow-tonal-*`,
> `rounded-card`, los helpers `font-body`/`font-display`/`font-headline`) se usan como nombres de
> clase semánticos en los componentes; algunas aún no tienen definición de estilo en `globals.css`.
> Son tokens "de intención": mantener el nombre al reutilizar el patrón es más valioso que su
> resolución física actual. No introducir grises/azules planos arbitrarios para sustituirlos.

Deep shadows puntuales ya resueltos: popovers `shadow-[0_12px_32px_rgba(110,54,210,0.06)]`, avatar
de perfil `shadow-xl`, carrito `shadow-2xl`.

### 2.4 Utilidades auxiliares

- `cn()` (`src/utils/cn.js`): `twMerge(clsx(...))`; **obligatorio** para componer clases en
  componentes reutilizables.
- Scrollbars: `not-scrollbar` (oculta), `scroll-hiden` (delgada violeta). Definidas como `@utility`
  en `globals.css`.
- `ghost-border`: borde fantasma `outline-variant` que reacciona a `:focus-within` con `primary`.
- `gradient-primary`: `linear-gradient(120deg, primary → primary-container)`.
- `blurColors` (`src/constants/bgBase64.js`): placeholders de imagen (púrpura, negro, blanco, gris)
  para `next/image` `blurDataURL`. En avatar/paciente usar `blurColors.purple`.

---

## 3. Glass & Gradient Rule

> Referenciada en `src/components/ui/buttons/ButtonVariant.jsx` ("ver Sección 3 de DESIGN.md").

### 3.1 El componente Glass

`GlassDefault` (`src/components/ui/glass/GlassDefault.jsx` + `glass.module.css`) compone una pieza
de **liquid glass** con 4 capas:

1. `liquidGlassWrapper` — contenedor con `overflow:hidden`, sombra proyectada y transición
   `cubic-bezier(0.175, 0.885, 0.32, 2.2)` (overshoot elástico al hacer hover).
2. `liquidGlassEffect` — capa de desenfoque (`backdrop-filter: blur(3px)`) con el filtro SVG
   `#glass-distortion` (`UltraGlass`) que produce la ondulación "líquida".
3. `liquidGlassShine` — brillo interior (`box-shadow` `inset` blanco) que da volumen de cristal.
4. Capa de tinte translúcido vía `classNameTint` (p. ej. `bg-black/8`, `bg-black/10`) + el contenido
   prop en `z-3`.

Plantilla de uso:

```jsx
<GlassDefault
  classNameWrapper="rounded-full p-2"          // estilo del cristal
  classNameTint="bg-black/8"                   // tono translúcido
  className="flex ... w-full"                 // contenido
>
  {children}
</GlassDefault>
```

Dónde vive el glass hoy: barra de navegación inferior móvil (`NavBarBottom`, rounded `2em`/`2.5em`
hover), paginación de listas (`GlassPaginationBasic`), tarjeta flotante "Meta" del hero (`FloatCard`
usa `backdrop-blur-md` sobre superficie translúcida).

### 3.2 La regla de gradiente

**Un botón "primary" o un CTA destacado jamás usa un relleno plano `bg-primary`.** Debe vestirse con
el gradiente de marca:

```jsx
className="bg-gradient-to-r from-primary to-primary-container text-on-primary"
```

Ejemplo canónico: `ActionButtons` del hero (`from-primary to-primary-container`), `Cart`,
`UserMenu`. `ButtonVariant` (variante `primary`) deja el gradiente a cargo del contexto, aplicando
solo `bg-primary` + `hover:shadow-tonal-sm` para botones pequeños; el comentario de cabecera obliga
a revisar esta sección antes de introducir un fill plano.

Casos donde `bg-primary` plano es aceptable: micro-elementos (barra de progreso, punto de línea,
anillos, `FooterButton` de paginación clásica, badge de carrito).

---

## 4. Layouts y navegación

La app tiene dos shells distintos: la **home pública** y el **dashboard** (rol admin/carer). Ambos
envuelven el contenido en un `<main>` con scroll propio.

### 4.1 `PageLayout` (home)

`src/components/ui/layout/PageLayout.jsx` — `min-h-[90dvh] max-h-[90dvh] max-w-7xl mx-auto px-6 py-12
space-y-8`, scroll propio con `not-scrollbar`. Compone `Title` (título + descripción). Firma:
`({ title, subtitle, description, className, children })`.

### 4.2 `DashboardShell` (dashboard)

`src/components/dashboard/layout/DashboardShell.jsx` — cabeza tipográfica: eyebrow en mayúsculas
`tracking-[.12em]`, título con `text-[clamp(30px,4vw,46px)] tracking-[-.03em]` y descripción en
`on-surface-variant`. Contenido con `px-10 pt-7` y scroll propio.

### 4.3 Navegación

| Barra | Ruta | Diseño |
| --- | --- | --- |
| `NavBarTop` | `src/components/ui/nav/navtop/NavBarTop.jsx` | Sticky top, `bg-slate-50 backdrop-blur-xl`, logo "Aleida | Contribucion" en `#6e36d2`, enlaces con underline `border-b-2 border-primary` en la ruta activa, CTA "Iniciar sesión" redondeado con borde `primary/80` |
| `NavBarBottom` | `src/components/ui/nav/navbottom/NavBarBottom.jsx` | Solo móvil (`md:hidden`), barra flotante **glass** centrada arriba del `bottom-5` con 3 rutas + badges |
| `Sidebar` | `src/components/dashboard/layout/Sidebar.jsx` | Dashboard: fija/sticky, `max-w-[252px] gap-8 bg-surface-container-low`; ítem activo `bg-surface-container-lowest text-primary`; colapsable en móvil; abajo tarjeta del "paciente principal" con avatar circular |
| `BottomSheet` / carrito | `src/components/ui/BottomSheet/BottomSheet.jsx` | Panel inferior deslizante (mobile-first) con `backdrop-blur-md`, usado para el carrito |

En el dashboard el `Sidebar` es el patrón de referencia para navegación de escritorio: bordes
`rounded-xl`, hover `bg-surface-container-high/60`, iconos `react-icons/lu` con `strokeWidth={1.8}`.

### 4.4 Títulos de página

- `Title` (`src/components/ui/title/Title.jsx`): `h1` con `font-headline` + descripción. Usado por
  el home (`Index` de cada feature). Entrada animada `animate-fade-in-down`.
- Dashboard: el `h1`/`h2` de `DashboardShell` (ver 4.2) sustituye a `Title`.

Breakpoints clave: `sm` (dos columnas de tarjetas), `md` (grid de 4, columnas de layouts, ocultar
nav bottom), `lg`, `xl` (ancho `max-w-screen-2xl`, carrito lateral). El patrón de página es
**mobile-first**.

---

## 5. Cards & Lists

Componentes en `src/components/ui/cards/Card.jsx` (núcleo del sistema de tarjetas).

### 5.1 Tarjetas

| Componente | Uso |
| --- | --- |
| `Card` | Base: `bg-surface-container-lowest rounded-card p-6`; `as` permite renderizar `article`/`section`/etc. |
| `MetricCard` | Métrica simple: label `text-[12px]`, valor `text-2xl font-display tracking-tight`, hint `text-[11px]` |
| `PanelCard` | Panel con header (`title` + slot derecho) para bloques como actividad reciente |
| `CardDefaultList` | Fila de lista: `flex items-center justify-between p-4 rounded-2xl hover:bg-surface-container-low` |

### 5.2 Timeline Nodes (Cards & Lists)

> Referencia en `src/components/dashboard/home/ActivityTimeline.jsx`.

La línea conceptual que conecta los eventos no es un trazo duro: **es un degradado sutil entre
tonos**. La implementación actual usa nodos circulares:

- Grid de `grid-cols-[12px_1fr_auto]` por evento.
- Nodo: `w-2.5 h-2.5 rounded-full`; el **primer evento usa `bg-primary-container`** (activo) y el
  resto `bg-surface-container-high` (inactivo); entre nodos el fondo queda libre para que el escalón
  tonal de los círculos produzca el degradado sobre la superficie.
- Título en `text-[13px] font-body`, descripción y `time` en `text-[11px] on-surface-variant`.

Al extender la timeline respetar: nodo activo `primary-container`, inactivos `surface-container-high`,
texto en escala `on-surface`/`on-surface-variant`, `time` alineado `whitespace-nowrap`.

### 5.3 Tarjetas de ítem por feature

- **Hero**: `PortCard` (foto cuadrada `aspect-square rounded-[3rem] rotate-3 hover:rotate-0`) +
  `FloatCard` (chip sobresaliente `-bottom-6 -left-6`, barra de progreso de meta con
  `bg-primary` sobre `bg-surface-container`).
- **Inventory** (dashboard): `InventoryCard` con `Card p-5`, cantidad grande `text-[28px]`,
  `Chip` de estado y popover de acciones.
- **Expenses/contributions/users** (dashboard y home): filas `CardDefaultList`/`rounded-2xl` con
  avatar circular `w-12 h-12 rounded-full bg-primary/10 text-primary`, título `text-[10px]/text-xs`,
  cantidad/monto a la derecha en `text-primary` y popover de acciones.

---

## 6. Botones, chips e inputs

### 6.1 Botones — `ButtonVariant`

`src/components/ui/buttons/ButtonVariant.jsx`. Base: `min-h-11 px-5 rounded-full font-body
font-bold text-[13px]`, siempre con icono opcional, `whitespace-nowrap`.

| Variante | Estilo | Hover |
| --- | --- | --- |
| `primary` | `bg-primary text-surface-container-lowest` | `-translate-y-0.5 hover:shadow-tonal-sm` |
| `secundary` | `bg-surface-container-lowest text-primary` | `bg-surface-container-low` |

Regla crítica: no usar fills planos para CTA destacados (→ **Sección 3**). CTA del hero usa el
gradiente + `active:scale-[0.98]` y `tonal-shadow-sm`. Botones de formulario: submit `primary`,
cancelar `secundary` con `command`/`commandfor` para cerrar `dialog`.

Patrones de borde: CTA ghost con `border border-primary/80 rounded-full` (ver "Iniciar sesión").
Botones icono-cuadrados: `p-2/p-3 bg-surface-container rounded-xl hover:bg-surface-container-high`.

### 6.2 Chips — "Collaboration Chips"

> Referencia en `src/components/dashboard/ui/chips/Chip.jsx` ("DESIGN.md: Collaboration Chips").

Píldora de estado compacta: `inline-flex items-center gap-1.5 rounded-full px-2.5 py-1
text-[11px] font-bold`. Tonos actuales:

| Tone | Fondo / texto | Uso semántico |
| --- | --- | --- |
| `neutral` / `success` | `bg-secondary-fixed text-on-secondary-container` | Confirmada, en orden, activo |
| `alert` | `bg-primary-container/20 text-primary` | Pendiente, bajo, agotado, reponer |

Con `dot` muestra un punto `w-1.5 h-1.5 bg-current animate-pulse` (estado "vivo"/pendiente). Se
reutiliza para estados de stock (`en orden`/`bajo`/`agotado`) y de contribuciones
(`Confirmada`/`Pendiente`). Añadir tonos solo dentro de `TONES/`, no con clases sueltas.

Monto/pills ad-hoc aceptados: `px-3 py-1 rounded-full bg-primary/10 text-primary text-xs`.

### 6.3 Inputs y formularios

- `FieldType` (`src/components/ui/form/inputs/FieldType.jsx`): input redondeado
  `rounded-2xl bg-surface-container-low py-4`, `focus:ring-2 focus:ring-primary/20`, label
  `text-xs font-semibold text-on-surface-variant tracking-[0.05em]`, toggle de contraseña con
  `text-primary`. Errores: `text-[12px] text-red-500`.
- `FieldSelect` + `FieldOption`: select `rounded-2xl` mismo fondo, opacity de color `primary`.
- `SearchInput`: píldora `rounded-full bg-surface-container-low border-primary/15 py-3 px-6`,
  `focus:ring-2 focus:ring-primary/60`. Placeholder `on-surface-variant/50`.
- `SelectFilter`: select-píldora (`rounded-full appearance-none`) que escribe estado en URL (nuqs)
  y resetea `page` a 1.
- `FormLayout` (`src/components/ui/form/layout/FormLayout.jsx`): panel `rounded-[2rem] p-8 md:p-12
  tonal-shadow-sm ring-1 ring-outline-variant/15`; header `text-2xl text-primary-container
  font-semibold`; notificación de error `bg-red-500/30 border-red-900/40`.
- `ActionsButtons` (`src/components/ui/form/buttons/ActionsButtons.jsx`) para submit/cancelar de
  formularios.

Convención: los inputs se apoyan en `surface-container-low` (hundidos) mientras que las tarjetas
van en `surface-container-lowest` (elevadas). El foco SIEMPRE usa `ring-primary`.

---

## 7. Modales, diálogos y popovers

### 7.1 `Modal`

`src/components/ui/dialogs/Modal.jsx` — usa el elemento nativo `<dialog>` con `showModal()`.

- Caja: `rounded-2xl bg-surface-container-lowest shadow-tonal-lg`, `animate-fade-in-up`,
  `max-w-[calc(100vw-32px)]`.
- Backdrop: `backdrop:bg-on-surface/10`.
- Cabecera: `text-2xl tracking-tight` + descripción `text-[13px] text-on-surface-variant`.

### 7.2 `DialogAdd` / diálogos CRUD

`DialogAdd` compone `Modal` + `FormLayout` + `ButtonVariant` (submit `primary`/cancelar
`secundary`). Patrón: se abre con `ref.showModal()` desde la lista y se cierra por `command`/`commandfor`
o `onClose`. Los diálogos de feature (`Add*Dialog`/`Update*Dialog`) siguen este molde.

### 7.3 `DeafultPopover`

`src/components/ui/popovers/DeafultPopover.jsx` — menú contextual sobre el botón de tres puntos
(`LuEllipsisVertical`):

- Anclaje con CSS anchor positioning: `[position-anchor:menu] [position-area:top_left]`.
- Caja: `bg-surface-container-lowest rounded-xl border-primary/15
  shadow-[0_12px_32px_rgba(110,54,210,0.06)]`, abierto con `popover="auto"`, entrada
  `animate-zoom-in animate-duration-200`.
- Ítems: `flex items-center gap-3 px-4 py-2 hover:bg-surface-container-low`; accionar editar en
  `text-primary` y destructivas en `text-error`.

---

## 8. Componentes del dashboard

### 8.1 Toolbar de búsqueda/filtros

`src/components/dashboard/ui/bar/Toolbar.jsx` — combina `SearchInput` + `SelectFilter` (hijos) con
estado de URL via **nuqs**: `search` (debounce 400 ms) y `page`. Cualquier cambio de filtro resetea
la página a 1. `slot` `children` para selects adicionales (categoría, estado).

### 8.2 Paginación

- **Dashboard**: `GlassPaginationBasic` (`src/components/ui/glass-componenst/GlassPagination.jsx`)
  — píldora glass (`GlassDefault` con tinte `bg-black/8`) con `Pagina X de Y` en `text-primary` y dos
  `ButtonVariant` (atras/siguiente) deshabilitados con `disabled:opacity-40`. La página es estado de
  URL (`useQueryState("page")`, `clearOnDefault`), y al hacer hover el cristal crece (`hover:p-2.5`).
- **Home/tablas**: `ui/table/FooterButton` — footer clásico `bg-surface-container-low/20`,
  botón "Siguiente" `bg-primary`, "Anterior" `bg-surface-container-lowest`.

### 8.3 Tablas

`src/components/ui/table/Table.jsx`:

- `<Table>`: contenedor `relative overflow-x-auto min-h-114`; maneja `isLoading` (`ThreePoints`) y
  vacío (`AnimationEmpy`).
- `Rowhead`: `bg-surface-container-low/50`; `Th`: `px-8 py-6 font-bold uppercase tracking-widest
  text-on-surface-variant`.
- `TBody`: `divide-y divide-surface-container-low`.
- `RowBody`: `hover:bg-surface-container-low/30 animate-slide-in-left`, celdas `align-text-top pl-8 py-6`.

Versión home: `ContributionTable` con contenedor `rounded-[2.5rem] tonal-shadow-sm` y
`UserRow` con `animate-slide-in-left`. Detalle en perfil: `DetailsRow` con punto `size-2
rounded-full bg-secondary` junto al propósito.

### 8.4 Estados vacíos y carga

- `ThreePoints` (`src/components/ui/loader/ThreePoints.jsx`): tres puntos `animate-bounce` en
  `on-secondary-fixed-variant`/`on-surface-variant`.
- `AnimationEmpy` (`src/lottie-files/components/AnimationEmpy.jsx`): lottie `EmptyState.json` +
  título `text-secondary` (también existe `Medicine.json` para estados de inventario).

### 8.5 Métricas del home del dashboard

`MetricsGrid` (`src/components/dashboard/home/MetricsGrid.jsx`) — **asimetría intencional**: en vez
de 4 columnas iguales, la métrica principal ("Fondo disponible") ocupa `md:col-span-2` y sube de
`text-2xl` a `text-4xl`. Ver principio en **Sección 10**.

---

## 9. Animaciones y motion

La animación es suave, breve y expresiva. Stack: **`tailwind-animations`** (utilidades
`animate-*`), **`motion`** (antes framer-motion) para composición avanzada, y **`lottie-react`**
para empty states.

### 9.1 Utilidades `animate-*` (tailwind-animations)

| Clase | Uso típico |
| --- | --- |
| `animate-fade-in` / `-down` / `-up` / `-left` / `-right` | Entradas de títulos, secciones, CTAs, modales |
| `animate-slide-in-top/bottom/left/right` | Tarjetas, filas y secciones con deslizamiento |
| `animate-jiggle` (+ `animate-duration-2200`) | Foto del paciente (movimiento continuo sutil) |
| `animate-zoom-in` (+ `animate-duration-200`) | Popovers |
| `animate-bounce` / `animate-pulse` / `animate-ping` | Loaders (`ThreePoints`), dot de chips, estados vivos |
| `animate-tada` (+ `animate-delay-800`) | Icono de notificación |

Convención: **entrada** con fade/slide, **estado activo** con pulse/ping y **micro-interacción** con
`hover:`/`active:` (scale, translate), nunca animaciones ruidosas en contenido funcional.

### 9.2 Scroll timeline (CSS)

`globals.css` define dos `@utility` para recortar el rango de la barra de scroll del navegador:

- `animate-range-early-entry` → `animation-range: 10% 60%`
- `animate-range-flash-entry` → `animation-range: 0% 30%`

Usadas junto a `animate-slide-in-right` / `timeline-view` en stats e impacto del perfil para que la
entrada ocurra apenas la sección entra en viewport.

### 9.3 `motion`

`Notification` (`src/components/ui/notifications/Notification.jsx`) usa `AnimatePresence` +
`motion.div`: entra desde `x:110%` con `easeOut` (delay 0.4s) y sale con la misma trayectoria. El
tema del toast depende del tipo:

| Tipo | Estilo |
| --- | --- |
| `error` | `bg-red-500/58 border-red-700/45` |
| `success` | `bg-green-500/65 border-green-700/45` |
| `info` | `bg-amber-500/60 border-amber-700/45` |
| `default` | `bg-primary/58 border-primary/45` |

Fondo: `bg-gradient-to-tr from-transparent to-zinc-600/28`, caja `rounded-2xl h-18`.

### 9.4 Lottie

`src/lottie-files/`: animaciones JSON (`EmptyState.json`, `Medicine.json`) renderizadas con
`lottie-react` (`autoplay loop`). Usar para estados vacíos ilustrativos, no para UI crítica.

---

## 10. Do & Don't

### Do

- **Embrace Asymmetry** — *referencia en `MetricsGrid.jsx`*. Rompe la cuadrícula idéntica: la
  métrica principal ocupa doble espacio y mayor jerarquía tipográfica. Al diseñar grids de tarjetas,
  jerarquiza por importancia, no por simetría.
- Toda acción de marca usa gradiente (`from-primary to-primary-container`); los elementos
  secundarios usan superficies tonales.
- Componentes reutilizables → `cn()`, tokens `@theme` (`bg-*`, `text-*`), nunca hex hardcodeados
  (solo aceptado en marca del nav top `#6e36d2` y la sombra de popover).
- Estados semánticos → `Chip` (TONES) con texto corto en español y `text-[11px] font-bold`.
- Entradas suaves coherentes con la escala de la **Sección 9**: fade/slide en entradas, pulse en
  estados vivos.
- Foco accesible: inputs y búsquedas SIEMPRE con `ring-primary` (ring-2) y bordes 1-2px.
- Avatares: circular `w-12 h-12 rounded-full bg-primary/10 text-primary`, con `blurColors.purple`
  como `blurDataURL`.

### Don't

- No usar `bg-primary` plano en CTA destacados (→ **Sección 3**).
- No introducir colores fuera de la escala tonal (nuevos grises, azules, verdes arbitrarios) salvo
  los estados de error/toast y la paleta de marca del nav.
- No romper el patrón de paginación por feature: listas del dashboard usan
  `GlassPaginationBasic` + estado `page` en URL (nuqs), no hooks locales.
- No añadir nuevas utilidades semánticas (`tonal-shadow-*`, `rounded-card`, `font-*`) *solo* para
  un estilo puntual; mantenerlas como vocabulario del sistema o eliminarlas.
- No poner `console.log` en código de UI (regla del repo) ni emojis para decorar UI funcional.
- No duplicar el glass: si el componente ya envuelve `GlassDefault`, no superponer otros
  backdrops/desenfoques sobre la misma pieza.

---

## Apéndice — Checklist de cobertura (referencias del código a DESIGN.md)

| Referencia en código | Sección de este documento |
| --- | --- |
| `ButtonVariant.jsx` → "Sección 3 de DESIGN.md, Glass & Gradient Rule" | **3. Glass & Gradient Rule** |
| `Chip.jsx` → "Collaboration Chips" | **6.2 Chips** |
| `MetricsGrid.jsx` → "Do: Embrace Asymmetry" | **10. Do & Don't** |
| `ActivityTimeline.jsx` → "Timeline Nodes (Cards & Lists)" | **5.2 Timeline Nodes** |

Convenciones transversales recordadas de `AGENTS.md`: Tailwind v4, alias `@/*`, componentes sin `index.js`
barrel, modalidad `export const` (solo `page.jsx` con default export), copy en español y prefijo de
feature en PascalCase.