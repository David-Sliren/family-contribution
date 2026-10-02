---
name: plan-empirico
description: Se activa UNICAMENTE cuando el usuario escribe "plan empirico" / "empirical plan" o invoca la skill de forma explicita. Guia un flujo interactivo de hasta 4 instrucciones por plan. El usuario redacta en lenguaje natural libre; el asistente numera y envuelve cada instruccion en delimitadores ===instruccion N=== ... ===fin de instruccion N===, muestra siempre el bloque consolidado, investiga el codigo antes de preguntar y presenta cada duda como pregunta preparada de opcion multiple con una marcada "(Recomendado)". No ejecuta cambios hasta la confirmacion del usuario y la salida del plan mode. Los pasos 1, 3 y 4 usan siempre la herramienta question.
---

# Plan Empírico

Flujo de trabajo guiado e interactivo para procesar hasta un máximo de 4 instrucciones por plan de forma controlada.

## Activación

Esta skill se activa **únicamente** cuando el usuario:
- Escribe en su prompt las frases `"plan empirico"` o `"empirical plan"`.
- La invoca explícitamente por su nombre.

No existe un slash command `/plan-empirico`: la activación es por prompt o por invocación explícita. Si estas señales no aparecen, responde al prompt normalmente sin forzar este flujo.

## Principios y Responsabilidades

- **El usuario:** solo redacta lo que necesita en lenguaje natural libre (con o sin saltos de línea, numerado o sin numerar). Nunca se le exige escribir delimitadores ni el conteo (salvo que la propia skill lo pregunte).
- **El asistente:**
  - Conduce la conversación y la numeración secuencial (1 a N, máximo 4).
  - Envuelve internamente y de forma visible el contenido en los bloques:
    `===instruccion N===`
    [contenido]
    `===fin de instruccion N===`
  - Muestra el bloque consolidado **en todos los mensajes** del flujo, no solo al definirlo.
  - **No modifica archivos ni ejecuta comandos de cambio** hasta que el plan esté consolidado, el usuario confirme y el plan mode esté desactivado.

## Herramientas Obligatorias

- Los **pasos 1, 3 y 4** (y la ruta de sugerencias del paso 1) se ejecutan **siempre con la herramienta `question`**. Está prohibido preguntar en texto plano en esos pasos.
- **Una sola llamada a `question` por instrucción**: mete todas las dudas de esa instrucción en el arreglo `questions`. No abras rondas sucesivas para la misma instrucción.
- Cada pregunta debe tener:
  - Contexto breve y **real** del código (verificado leyendo archivos, no supuesto).
  - Opciones concretas y excluyentes entre sí.
  - La primera opción marcada con el sufijo `(Recomendado)`.
  - `header` corto (máx. 30 caracteres).
- `question` permite respuesta personalizada: si el usuario escribe texto libre en lugar de elegir una opción, acepta esa respuesta, ajústala al contexto y refléjela en los delimitadores.

## Estado Activo vs. Plan Nuevo

- **Plan interrumpido a mitad:** si la skill está activa y quedó un plan sin cerrar en la misma conversación, **retoma el paso donde quedó**. No vuelvas a preguntar el conteo inicial ni anuncies la activación otra vez.
- **Plan nuevo:** cuando el plan anterior ya se **cerró** (se anunció "Plan de N instrucciones finalizado"), una nueva invocación es un plan nuevo y **sí** empieza por el paso 1 (incluida la pregunta de conteo). Un plan terminado cuenta como nuevo.

## Flujo Operativo Paso a Paso

### 1. Conteo y Redacción

1. Pregunta cuántas instrucciones tendrá el plan. **Usa `question`** con estas opciones (el `header` recuerda el límite):
   - `1` — "Una instrucción"
   - `2` — "Dos instrucciones"
   - `3` — "Tres instrucciones"
   - `4` — "Cuatro instrucciones"
   - `No sé` — "No sé cuántas, definámoslas una a una"
2. Muestra el bloque de la instrucción (vacío o "pendiente de redactar") en el mismo mensaje y pregunta cómo definirla con `question`:
   - `Voy a escribirla ahora` — el usuario la redacta libre (Recomendado).
   - `Partir de una sugerencia` — el asistente propone candidatas.
3. Ruta de sugerencias (si el usuario la elige o no sabe qué pedir):
   - Investiga el código afectado con jobs de **solo lectura** y enumera hallazgos verificados.
   - Ofrece de 1 a 3 instrucciones candidatas como opciones en **una sola llamada** a `question`, con contexto real; la primera marcada `(Recomendado)`.
   - Con la elegida, ajusta el contenido dentro de los delimitadores.
4. Casos especiales:
   - Si el usuario ya suministró el texto completo en su primer mensaje, extrae y separa las peticiones (hasta 4).
   - Si dijo que no sabe cuántas: ve definiendo una a una y, tras cada una, pregunta si agrega la siguiente o cierra el plan.

### 2. Estructuración con Delimitadores

- Numera secuencialmente desde 1 y muestra las instrucciones consolidadas:
  ```
  ===instruccion 1===
  ...
  ===fin de instruccion 1===
  ```
- **Muestra el bloque siempre**, incluso cuando la instrucción aún está vacía, en el mismo mensaje en que formulas la pregunta.

### 3. Aclaraciones Previas: Preguntas Preparadas

- Si una instrucción tiene ambigüedades o decisiones de diseño (ej. dónde filtrar, qué campos intervienen, si se pagina), **no preguntes en texto plano**: primero investiga el código afectado y aporta contexto verificado.
- Presenta todas las dudas de esa instrucción en **una sola llamada** a `question`:
  - Contexto breve y real del código.
  - Opciones concretas y excluyentes.
  - La primera opción recomendada, marcada `(Recomendado)`.
- Con las respuestas, ajusta el contenido dentro de sus delimitadores y **vuelve a mostrar** la versión consolidada.

### 4. Confirmación Previa a la Ejecución

- Cuando las instrucciones estén listas (hasta 4), **antes de ejecutar cualquier cambio** confirma con `question`:
  - `Proceder` — "Sí, procede con este plan (Recomendado)"
  - `Otro plan` — "No, prefiero hacer otro plan"
- Confirmar **no** habilita por sí solo la ejecución: si el **plan mode** sigue activo (modo solo lectura), el asistente no puede editar ni ejecutar comandos. En ese caso, informa al usuario que salga del plan mode para poder trabajar.
- No ejecutes nada hasta que la respuesta sea positiva y estés en modo build.

### 5. Ejecución Guiada

- Al empezar (modo build):
  - Ejecuta la instrucción 1.
  - **Carga las skills del proyecto que apliquen** antes de la acción correspondiente (ej. `git-commit-convention` antes de preparar o hacer commits).
- Durante la ejecución:
  - Cada `todowrite` que crees lleva como encabezado el título de la instrucción activa (ej. `# Instrucción 1 — [Acción]`).
  - Si una instrucción exige pedir permiso (ej. antes de un commit), haz una pausa y solicita la autorización explícita.
  - Al cerrar cada instrucción, informa y anuncia el siguiente paso:
    > *"Instrucción [N] completada. Procedemos a trabajar en la instrucción [N+1]."*
- Al terminar la última, cierra el plan:
  > *"Plan de [N] instrucción(es) finalizado."*

## Recordatorio

- Sin activación explícita ("plan empirico" / "empirical plan"), este flujo NO se aplica.
- No modificar archivos ni ejecutar cambios antes de la confirmación formal del paso 4 y de estar fuera del plan mode.
