---
name: video-usuario
description: Crea un video de la serie para usuarios de la plataforma (docs/usuarios/) a partir de su guion. Actívala con «/video-usuario» o pidiendo crear o generar el video N de la serie; recopila las especificaciones de render, arma el briefing para la skill de video, respeta la narración y los textos literales del guion y verifica el resultado contra la plantilla.
metadata:
  opencode/slash: "true"
---

# Skill: video-usuario

## Propósito

Produce **un video por invocación** de la serie documentada en `docs/usuarios/` (10 guiones para la familia). El guion ya contiene todo el contenido; esta skill garantiza que nada se pierda ni se invente entre el guion y el render final.

## Activación

- `/video-usuario 3` o «crea el video 3», «genera el video 07 de la serie»...
- Si el usuario no indica número: muestra el índice de `docs/usuarios/README.md` (título, público y guion de los 10) y pregunta cuál quiere. **No** hagas dos videos en una misma invocación; si pide la serie, ofrece empezar por el siguiente pendiente en orden.

## Orden de lectura (obligatorio, y nada más)

1. `docs/usuarios/PLANTILLA.md` — formato de escenas y reglas de estilo de la serie.
2. `docs/usuarios/0N-[nombre].md` — el guion del video elegido (su ruta está en el índice).
3. `DESIGN.md` — paleta M3, tipografías y tokens para identidad visual.
4. **Prohibido**: `AGENTS.md`, `docs/reference/` y `docs/explanation/` son documentación técnica para desarrolladores; la audiencia del video es la familia. No extraigas jerga de ahí.

Si el entorno dispone de una skill o herramienta de generación de video, pásale el briefing compuesto con esta plantilla (no le reenvíes archivos sueltos):

```text
Crea el video [N] de la serie "Contribución Familiar" a partir de este guion.

Lee en este orden:
1. docs/usuarios/PLANTILLA.md — formato y reglas de la serie.
2. docs/usuarios/0N-[nombre].md — guion a producir. Respeta su metadata
   (público, duración estimada, pantalla inicial) y todas sus escenas:
   - "Narración" → voz en off, casi literal (solo ajusta por ritmo).
   - "En pantalla" → lo que debe verse; los textos son LITERALES del guion
     (con sus typos), no los reescribas ni inventes.
   - "Nota" → errores/avisos que deben verse o mencionarse.
   - "Cierre" → logro + el video siguiente.
3. DESIGN.md — paleta M3 y tipografías para títulos y tarjetas.
No uses AGENTS.md ni docs/reference/: son doc técnica, la audiencia es la familia.

Especificaciones: formato [aspecto], [screencast real | ilustraciones],
[voz en off | subtítulos], música [suave / ninguna], subtítulos siempre,
salida en [carpeta]/video-[N]-[nombre].mp4.

Al terminar verifica: las N escenas del guion están, la duración ≈ la metadata,
y todos los textos en pantalla coinciden literalmente con "En pantalla".
```

## Reglas innegociables

1. **Una instrucción = un guion.** El número N mapea directo a `docs/usuarios/0N-*.md`.
2. **"Narración" es voz en off casi literal**: solo se ajusta por ritmo; no se reescribe el contenido ni se añade texto nuevo.
3. **"En pantalla" es literal, typos incluidos** (*"Invetario"*, *"añadir contribucion"*, *"decripcion"*): si el render muestra un botón con otro texto, el video miente. Verifica cada cita contra el guion, nunca contra tu memoria de la app.
4. **"Nota" es obligatoria**: los errores previstos deben verse o mencionarse.
5. **"Cierre" siempre cierra** con el logro y el video siguiente del índice.
6. El guion **no** decide el render: aspecto, voz, música y destino se piden (siguiente sección).

## Especificaciones de render

Si el usuario no las dio en la invocación, pídelas **una sola vez**, agrupadas, antes de producir. Opciones recomendadas por defecto:

| Especificación | Recomendado | Alternativas |
| --- | --- | --- |
| Formato | 16:9 horizontal | 9:16 vertical (redes) |
| Imagen | Screencast real de la app en la ruta de la metadata | Ilustraciones / animación |
| Voz | Voz en off con la "Narración" | Solo subtítulos |
| Subtítulos | Siempre | — |
| Música | Suave, de fondo | Ninguna |
| Salida | `videos/video-[N]-[nombre].mp4` | — |

Con screencast real, arranca la app (`pnpm dev`) y navega a la ruta de la metadata del guion para que las pantallas coincidan con "En pantalla".

## Verificación final (antes de dar por terminado)

- [ ] Están todas las escenas del guion, en orden (incluido el **Cierre**).
- [ ] La duración es ≈ a la de la metadata (±20 %).
- [ ] Cada texto en pantalla coincide **literalmente** con "En pantalla" (typos incluidos).
- [ ] Las "Nota" aparecen mencionadas o en pantalla.
- [ ] El archivo existe en la ruta de salida.
- [ ] Anuncia el video siguiente según el índice (`docs/usuarios/README.md`).

Si el usuario da feedback de render (ritmo, transiciones, música), viértelo como regla nueva en `docs/usuarios/PLANTILLA.md` —con su confirmación— para que los videos siguientes no repitan el fallo.
