# Video 8 — Inventario de medicinas

## Metadata

- **Público**: administradores
- **Orden**: 8 de 10
- **Duración estimada**: 1:30 min
- **Pantalla inicial**: `http://localhost:3000/dashboard/inventory` (sesión de administrador)

---

### Escena 1 — Qué es el inventario

- **Pasa**: entra al menú de inventario.
- **Narración**: "El inventario es la despensa del tratamiento: qué medicinas y suplementos hay, cuántas unidades quedan y en qué estado está cada cosa."
- **En pantalla**: menú **"Invetario"** (así aparece en el menú) → pantalla *"Inventario de tratamiento"* con buscador **"Buscar artículo"** y filtro **"Todos"**.

### Escena 2 — Añadir un artículo

- **Pasa**: se abre el alta y se llenan los campos.
- **Narración**: "Pulsas **Añadir artículo**: nombre, unidades que tienes, precio si lo quieres costear, la concentración —miligramos, por ejemplo—, la categoría y el estado: en orden, bajo o agotado. Abajo puedes dejar notas."
- **En pantalla**: diálogo **"Añadir artículo"** con campos **"Nombre"** (ejemplo: *Losartán*), **"Unidades"** (ejemplo: *20*), **"Precio"** (ejemplo: *20000*), **"Concentración"** (ejemplo: *50 mg*), **"Categoria"** (*medicina, suplemento, suministro*), **"Estado"** (*en orden, bajo, agotado*), **"Descripción"**; botón **"Añadir artículo"**; aviso *"Artículo añadido al inventario"*.

### Escena 3 — Actualizar existencias

- **Pasa**: se edita un artículo (por ejemplo, bajaron las unidades) y se elimina otro.
- **Narración**: "Cuando uses medicinas, vuelve al artículo, baja las unidades y actualiza el estado: así quien más entre sabrá si hay que comprar. Si algo ya no está, puedes eliminarlo."
- **En pantalla**: diálogo **"Actualizar artículo"** con aviso *"Artículo actualizado"*; al eliminar, *"Artículo eliminado"* (o *"No se pudo eliminar el artículo"* si algo falla).

### Escena 4 — Buscar y revisar

- **Pasa**: se busca un artículo por nombre y se muestra la lista vacía.
- **Narración**: "Con el buscador encuentras cualquier medicina al instante; y si no hay nada cargado, verás **No hay artículos en el inventario**."
- **En pantalla**: buscador **"Buscar artículo"** y la vista vacía *"No hay artículos en el inventario"*.

---

### Cierre

- **Pasa**: artículo cargado o actualizado.
- **Narración**: "El inventario queda al día. En el siguiente video: administrar los usuarios de la familia y sus roles."
- **Siguiente**: [09-usuarios-y-roles.md](09-usuarios-y-roles.md)
