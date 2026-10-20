# Video 6 — Registrar contribuciones (aportes)

## Metadata

- **Público**: administradores
- **Orden**: 6 de 10
- **Duración estimada**: 2 min
- **Pantalla inicial**: `http://localhost:3000/dashboard/contributions` (sesión de administrador)

---

### Escena 1 — Qué ves en Contribuciones

- **Pasa**: entra al menú Contribuciones; se muestra la lista.
- **Narración**: "Aquí están todos los aportes de la familia: los que llegan solos por tarjeta y los que registras a mano por transferencia o efectivo."
- **En pantalla**: menú **"Contribuciones"** → pantalla *"Registro de contribuciones"*; lista con las contribuciones y su estado.
- **Nota**: si aún no hay, verás *"No hay contribuciones"*.

### Escena 2 — Filtrar la lista

- **Pasa**: se aplica un filtro por propósito, método o estado.
- **Narración**: "Arriba tienes tres filtros: para qué fue el aporte, cómo llegó y si está confirmado o pendiente. Combínalos como quieras."
- **En pantalla**: tres menús con las opciones *-proposito* → *inventario, gastos, cuidador*; *-metodo* → *pasarela, efectivo, transferencia*; *-estado* → *confirmado, pendiente*.

### Escena 3 — Registrar un aporte manual

- **Pasa**: se pasa al menú **Usuarios**, se pulsa "añadir contribucion" en la tarjeta de un familiar y se llena el diálogo.
- **Narración**: "Los aportes manuales se registran desde **Usuarios**: buscas a la persona, pulsas **añadir contribucion** en su tarjeta y llenas: la cantidad, el método —efectivo o transferencia—, para qué es y si ya está confirmado o pendiente. Confirmas con **Añadir pago**."
- **En pantalla**: menú **"Usuarios"** → buscador **"Buscar usuario"** → tarjeta con el botón **"añadir contribucion"** → diálogo **"Añadir contribucion"** con campos **"Cantidad"** (ejemplo: *200000*), **"Metodo de pago"**, **"Proposito"** y **"Estado"**; botón **"Añadir pago"** (mientras guarda dice *"Guardando..."*); aviso *"Contribucion añadida"*.

### Escena 4 — Corregir un aporte

- **Pasa**: se abre la edición de una contribución desde la lista.
- **Narración**: "Si algo quedó mal, lo editas desde la misma lista con **Actualizar contribucion**, corriges y listo."
- **En pantalla**: diálogo **"Actualizar contribucion"** con botón **"Actualizar"** y aviso *"Se actualizo la contribución"*.
- **Nota**: los aportes no se borran desde aquí; si entró por la pasarela, ya está confirmado automáticamente.

---

### Cierre

- **Pasa**: aporte registrado y visible en la lista.
- **Narración**: "Los aportes quedaron al día. En el siguiente video: los gastos y el fondo disponible."
- **Siguiente**: [07-gastos.md](07-gastos.md)
