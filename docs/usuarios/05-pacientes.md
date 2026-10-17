# Video 5 — Pacientes: crear, editar y hacer principal

## Metadata

- **Público**: administradores
- **Orden**: 5 de 10
- **Duración estimada**: 2 min
- **Pantalla inicial**: `http://localhost:3000/dashboard/patients` (sesión de administrador)

---

### Escena 1 — Dónde están los pacientes

- **Pasa**: desde el dashboard, se entra al menú Pacientes.
- **Narración**: "Este video es para quien administra la plataforma. En el menú de la izquierda pulsas **Pacientes**: ahí vive toda la información de la persona que se está cuidando."
- **En pantalla**: menú lateral con **"Inicio"**, **"Contribuciones"**, **"Gastos"**, **"Invetario"**, **"Pacientes"**, **"Usuarios"** → pantalla **"Pacientes"** con subtítulo *"Registro de pacientes"*.
- **Nota**: solo cuentas de administrador llegan aquí; los demás ven un aviso de sin permisos.

### Escena 2 — Leer una ficha de paciente

- **Pasa**: se recorre una tarjeta de paciente.
- **Narración**: "Cada ficha muestra el nombre, la edad, la clínica y un sello que dice **principal** o **secundario**: el principal es el que alimenta las métricas de la plataforma. Abajo están sus datos de contacto: el teléfono Nequi y la clave transacional, cada uno con su botón de copiar."
- **En pantalla**: ficha con el sello **"principal"**/**"secundario"**, filas **"Teléfono (Nequi)"** y **"Clave transacional (Bre-B)"** con los botones de copiar (títulos *"Copiar teléfono"* y *"Copiar clave transacional"*); si no hay datos, un guion **"—"**.
- **Nota**: al copiar aparece *"Copiado al portapapeles"*.

### Escena 3 — Crear un paciente

- **Pasa**: clic en el botón de alta; se llena el formulario completo y se guarda.
- **Narración**: "Pulsas **Añadir paciente** y llenas la ficha: nombre, apellido, edad, quién lo cuida y en qué clínica. Después vienen dos datos que la plataforma necesita sí o sí: el teléfono Nequi y la clave transacional, los que después se comparten en la página de aportes. La meta es lo que se quiere recaudar, y abajo cuentas el motivo y una descripción. Guardas con **Añadir paciente**."
- **En pantalla**: diálogo **"Añadir paciente"** con campos **"Nombre"**, **"Apellido"**, **"Edad"**, **"Enfermera/Persona al cuidado"**, **"Clinica/Hospital a cargo"**, **"Teléfono (Nequi)"**, **"Clave transacional (Bre-B)"**, **"Meta"**, **"Razon"**, **"decripcion"**; botones **"Añadir paciente"** y **"cancelar"**; aviso *"Se creo un paciente"*.
- **Nota**: si dejan los campos de teléfono o clave vacíos, el formulario no deja guardar: los pide obligatorios.

### Escena 4 — Editar y cambiar la foto

- **Pasa**: se abre el lápiz de una ficha, se cambia un dato; después el ícono de imagen.
- **Narración**: "Para corregir algo, abres el lápiz de la ficha, cambias lo que haga falta y confirmas con **Actualizar paciente**. Con el ícono de la cámara cambias la foto desde **Cambiar imagen**."
- **En pantalla**: diálogo **"Actualizar paciente"** con botón **"Actualizar paciente"**; diálogo **"Cambiar imagen"** para la foto.

### Escena 5 — Cambiar el paciente principal

- **Pasa**: se abre el menú de puntos de una ficha secundaria y se pulsa "Hacer principal".
- **Narración**: "Si la familia cambió de paciente, en los tres puntos de la ficha eliges **Hacer principal**. Solo puede haber uno: las métricas y la página de aportes pasan a apuntar a él."
- **En pantalla**: menú de la ficha con la opción **"Hacer principal"** y el aviso *"{nombre} es el paciente principal"*.

### Escena 6 — La lista y la paginación

- **Pasa**: se muestra el buscador, la paginación y, si no hay datos, la pantalla vacía.
- **Narración**: "Arriba buscas por nombre, y abajo pasas de página si hay varias fichas. Si aún no hay nadie registrado, verás la pantalla de **No hay pacientes registrados**."
- **En pantalla**: buscador **"Buscar paciente"**, paginación inferior y la vista vacía **"No hay pacientes registrados"**.

---

### Cierre

- **Pasa**: paciente creado/editado y principal definido.
- **Narración**: "Ya tienes registrada a la persona. En el siguiente video: cómo registrar los aportes que llegan por transferencia."
- **Siguiente**: [06-contribuciones-admin.md](06-contribuciones-admin.md)
