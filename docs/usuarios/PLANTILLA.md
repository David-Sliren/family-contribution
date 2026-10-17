# Plantilla de guion de video

Copia este archivo para cada video nuevo. El lector final es la familia (no técnica) y el destino es un video: **escribe para leerse en voz alta**.

## Metadata

- **Título**:
- **Público**: familia | administradores
- **Orden**: N de 10
- **Duración estimada**:
- **Pantalla inicial** (ruta): p. ej. `http://localhost:3000/auth/login`

---

### Escena 1 — [título corto de lo que pasa]

- **Pasa**: qué hace el usuario en esta escena (una sola cosa).
- **Narración**: texto sugerido para la voz en off. Frases cortas, tuteo, cero tecnicismos. No hables de rutas ni archivos: habla de lo que se ve ("escribes tu correo y pulsas el botón morado **Registrarse**").
- **En pantalla**: qué se muestra exactamente — la pantalla/ruta, el **texto literal** del botón o campo (cópialo de la app, con sus typos reales incluidos, p. ej. "Proposito"), y dónde hace clic.
- **Nota** (opcional): errores frecuentes, permisos necesarios, alternativas.

---

### Escena 2 — [siguiente...]

_Repítelo con el mismo formato._

---

### Cierre

- **Pasa**: lo que el usuario consiguió.
- **Narración**: resumen de una frase + qué video sigue.

## Reglas de estilo

1. **Un video = una tarea terminada**: al cerrar, el usuario tiene algo hecho ("ya verificaste tu correo", "ya creaste el primer gasto").
2. Segunda persona cercana: "Entras", "Pulsas", "Ves" o imperativo suave: "Escribe tu nombre". Nunca "el sistema permite..." ni voz pasiva.
3. Los textos en pantalla son **siempre literales de la app**: verifica el string en el código (grep) antes de escribirlo; si la app tiene un typo, el guion lo copia tal cual.
4. Sin jerga: nada de "endpoint", "schema", "query", "webhook"; di "pantalla", "formulario", "lista", "correo".
5. Escenas cortas (30-60 s). Si una acción es larga, divídela.
6. Cada video empieza diciendo qué se conseguirá y termina con el cierre (logro + video siguiente).
7. Los errores van como escena prevista, no como drama: "si ves este mensaje, es porque...".
