# Video 1 — Registro y verificación de correo

## Metadata

- **Público**: familia
- **Orden**: 1 de 10
- **Duración estimada**: 1:30 min
- **Pantalla inicial**: `http://localhost:3000/auth/register`

---

### Escena 1 — Qué vas a conseguir

- **Pasa**: pantalla vacía de registro; nada se toca todavía.
- **Narración**: "En este video vas a crear tu cuenta en la plataforma de la familia y la vas a activar. Solo necesitas tu correo y cinco minutos."
- **En pantalla**: la pantalla de registro con el título **"Registrarse"**.

### Escena 2 — Tu nombre y tu usuario

- **Pasa**: se escriben los dos primeros campos.
- **Narración**: "Escribes tu nombre completo. Luego eliges un nombre de usuario: es como te van a ver adentro, así que ponlo en minúsculas, sin espacios y con números si quieres."
- **En pantalla**: campo **"Nombre"** (ejemplo: *Juan Pérez*) y campo **"Nombre de usuario"** (ejemplo: *juanperez01*).
- **Nota**: si escribes mayúsculas o espacios, el formulario lo avisa antes de enviar.

### Escena 3 — Teléfono y parentesco

- **Pasa**: se completa la fila de teléfono y relación con el paciente.
- **Narración**: "Pones tu celular con el prefijo del país que ya está ahí: solo faltan los diez dígitos y empiezan por tres. Después eliges cómo eres de la familia: hijo, esposo, sobrino, nieto... o externo si no tienes relación de sangre."
- **En pantalla**: campo **"Telefono"** con el prefijo fijo **"+ 57"** (ejemplo: *3044518133*) y el menú **"Parentesco"** con las opciones *externo, hijo, esposo, sobrino, hermano, nieto*.

### Escena 4 — Correo y contraseña

- **Pasa**: se escriben correo y las dos contraseñas.
- **Narración**: "Tu correo: ahí te llegará la activación, así que revísalo bien. La contraseña necesita al menos ocho caracteres, una letra en mayúscula y dos números; la repites en el campo de abajo."
- **En pantalla**: campo **"email"** (ejemplo: *correo@correo.com*), **"Contraseña"** y **"Confirmar contraseña"**.
- **Nota**: errores literales si no cumple: *"La contraseña debe tener minimo 8 caracteres"*, *"La contraseña debe tener mayusculas"*, *"La contraseña debe tener minimo 2 numeros"*.

### Escena 5 — Enviar

- **Pasa**: clic en el botón de envío; el botón muestra "esperando" mientras se registra.
- **Narración**: "Con todo lleno, pulsas **Registrarse** y listo: la cuenta casi está."
- **En pantalla**: botón **"Registrarse"**; abajo, el enlace **"¿Ya tiene una cuenta? Iniciar sesion"**.
- **Nota**: si el usuario o el correo ya existen aparecen *"El nombre de usuario ya existe"* o *"El correo electrónico ya existe"* — entra con tu cuenta existente en lugar de repetir el registro.

### Escena 6 — Revisa tu correo

- **Pasa**: cambia la pantalla a la confirmación.
- **Narración**: "Aparece este mensaje: revisa tu correo. Te enviamos un enlace de verificación; búscalo en la bandeja de entrada y, si no está, en el spam."
- **En pantalla**: título **"Revisa tu correo"** y el texto *"Te enviamos un enlace de verificación a tu correo. Haz clic en él para activar tu cuenta; si no lo ves, revisa la carpeta de spam."*

### Escena 7 — Activar la cuenta

- **Pasa**: se abre el correo y se pulsa el botón de verificación; la plataforma abre ya con la sesión iniciada.
- **Narración**: "Abres el correo de Aleida | Contribucion y pulsas **Verificar correo**. Ya está: cuenta activada y entras directo, sin escribir nada más."
- **En pantalla**: correo con botón **"Verificar correo"** → la plataforma abre en la pantalla de inicio, ya dentro de la cuenta.
- **Nota**: el enlace también funciona desde el celular; si lo abres en otro navegador, ese navegador queda con la sesión.

### Escena 8 — Si algo sale mal

- **Pasa**: se muestran los mensajes de error de la pantalla de verificación.
- **Narración**: "Si el enlace no te deja entrar, no te preocupes: entras normal a iniciar sesión y la plataforma te manda uno nuevo, siempre."
- **En pantalla**: mensajes posibles: *"El enlace de verificación no es válido o ya fue usado. Inicia sesión para recibir uno nuevo."*, *"El enlace de verificación expiró. Inicia sesión para recibir uno nuevo."*

---

### Cierre

- **Pasa**: cuenta creada y activada.
- **Narración**: "Ya tienes tu cuenta lista. En el siguiente video vemos cómo entrar y qué hacer si olvidas tu contraseña."
- **Siguiente**: [02-login-y-recuperar-contrasena.md](02-login-y-recuperar-contrasena.md)
