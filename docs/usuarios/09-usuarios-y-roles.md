# Video 9 — Usuarios y roles

## Metadata

- **Público**: administradores
- **Orden**: 9 de 10
- **Duración estimada**: 1:30 min
- **Pantalla inicial**: `http://localhost:3000/dashboard/users` (sesión de administrador)

---

### Escena 1 — La lista de la familia

- **Pasa**: entra al menú Usuarios; se muestra la lista.
- **Narración**: "En **Usuarios** está toda la familia que tiene cuenta: con su nombre, su parentesco y su rol. Si no hay nadie, ves **No hay usuarios**."
- **En pantalla**: menú **"Usuarios"** → pantalla *"Registro de usuarios"* con buscador **"Buscar usuario"** y las tarjetas de usuario.

### Escena 2 — Qué significan los roles

- **Pasa**: se señala el rol de una tarjeta.
- **Narración**: "Cada persona tiene un rol. **User** es un miembro normal: ve todo y aporta. **Carer** es cuidador. **Admin** es quien administra: crea pacientes, registra aportes y gastos y gestiona a los demás."
- **En pantalla**: la tarjeta con el rol visible.

### Escena 3 — Cambiar el rol de alguien

- **Pasa**: clic en "Cambiar rol", selección del nuevo rol y guardado.
- **Narración**: "Para cambiarlo, pulsas **Cambiar rol**, eliges en el menú el nuevo rol y guardas con **Guardar**. Mientras guarda verás **Guardando...**."
- **En pantalla**: diálogo **"Cambiar rol"** con la descripción *"Selecciona el nuevo rol para {nombre}."*, campo **"Rol"** con las opciones *user, carer, admin* y botón **"Guardar"** / *"Guardando..."*.
- **Nota**: por seguridad nadie puede cambiar su propio rol; si lo intentas, aparece *"No se pudo actualizar el rol"*.

### Escena 4 — Registrar un aporte de un familiar

- **Pasa**: se señala el botón de aporte en la tarjeta del usuario.
- **Narración**: "Recuerda: desde la tarjeta de cada familiar también puedes registrarle un aporte con **añadir contribucion**, tal como vimos en el video anterior."
- **En pantalla**: tarjeta con el botón **"añadir contribucion"**.

---

### Cierre

- **Pasa**: rol actualizado.
- **Narración**: "Ya sabes administrar quién puede hacer qué. En el último video vemos tu perfil y tu contraseña."
- **Siguiente**: [10-mi-perfil.md](10-mi-perfil.md)
