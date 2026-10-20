# Video 7 — Gastos y fondo disponible

## Metadata

- **Público**: administradores
- **Orden**: 7 de 10
- **Duración estimada**: 2 min
- **Pantalla inicial**: `http://localhost:3000/dashboard/expenses` (sesión de administrador)

---

### Escena 1 — Dónde están los gastos

- **Pasa**: entra al menú Gastos.
- **Narración**: "En **Gastos** está todo lo que se ha sacado del fondo: medicinas, transporte, clínica... Cada gasto descuenta del fondo disponible."
- **En pantalla**: menú **"Gastos"** → pantalla *"Registro de gastos"* con la lista y el buscador **"Buscar gasto"** y el filtro **"Todos"**.

### Escena 2 — Crear un gasto

- **Pasa**: se abre el alta y se llenan los campos.
- **Narración**: "Pulsas **Añadir gasto**. Escribes el nombre —por ejemplo, el medicamento y las unidades—, la cantidad, la moneda y la categoría a la que pertenece: medicina, transporte, suplemento, clínico, suministro o cuidador. Abajo dejas una descripción para que la familia entienda qué fue."
- **En pantalla**: diálogo **"Añadir gasto"** con campos **"Nombre"** (ejemplo: *Acetaminofen 500mg x 20*), **"Cantidad"** (ejemplo: *200000*), **"Moneda"** (*COP*/*USD*), **"Categoria"**, **"Descripción"** (ejemplo: *se compro acetaminofen para...*); botón **"Añadir gasto"**; aviso *"Gasto añadido"*.

### Escena 3 — El fondo no deja pasar gastos de más

- **Pasa**: se intenta crear un gasto mayor al fondo disponible; aparece el aviso.
- **Narración**: "Cuidado con esto: la plataforma no te deja gastar más de lo que hay. Arriba del formulario siempre ves cuánto queda —**Fondo disponible**—, y si te pasas, te avisa enseguida."
- **En pantalla**: el aviso del formulario *"Fondo disponible: $…"*; al excederlo, *"Fondo insuficiente, solo quedan $…"*.
- **Nota**: el monto mínimo de un gasto es mil pesos: si es menor, el formulario dice *"No debe ser menor a 1000"*. Si no queda nada, verás *"No hay fondos disponibles"*.

### Escena 4 — Editar un gasto

- **Pasa**: se abre la edición de un gasto existente.
- **Narración**: "Para corregir, abres el gasto, cambias lo que haga falta y guardas; el fondo se recalcula solo."
- **En pantalla**: diálogo **"Actualizar gasto"** y aviso *"Gasto actualizado"*.

---

### Cierre

- **Pasa**: gasto registrado y fondo al día.
- **Narración**: "Ya sabes registrar gastos sin pasarte del fondo. En el siguiente video: el inventario de medicinas."
- **Siguiente**: [08-inventario.md](08-inventario.md)
