---
name: plan-empirico
description: Se activa UNICAMENTE cuando el usuario la invoca explicitamente o escribe "plan empirico" / "empirical plan". Guia al usuario en la definicion de maximo 4 instrucciones por plan. El usuario escribe en lenguaje natural libre y el asistente estructura cada instruccion dentro de delimitadores ===instruccion N=== ... ===fin de instruccion N===. Cuando hay ambiguedades, el asistente investiga el codigo primero y presenta las dudas como preguntas preparadas de opcion multiple, con una marcada como "(Recomendado)", para que el usuario solo elija. El asistente no comienza a trabajar hasta tener todas las instrucciones definidas y confirmadas por el usuario, titula cada lista de tareas con la instruccion actual y ejecuta paso a paso. Los pasos 1, 3 y 4 usan siempre la herramienta question con preguntas preparadas de opcion multiple, nunca texto plano.
---

# Plan Empírico

Flujo de trabajo guiado e interactivo para procesar hasta un máximo de 4 instrucciones por plan de forma controlada.

## Activación

Esta skill se activa **únicamente** cuando:
- El usuario la invoca explícitamente (`/plan-empirico`).
- El usuario incluye en su prompt las frases `"plan empirico"` o `"empirical plan"`.

Si estas frases no aparecen, responde al prompt normalmente sin forzar este flujo.

## Principios y Responsabilidades

- **El usuario:** Solo se enfoca en redactar lo que necesita en lenguaje natural libre (con o sin saltos de línea, numerado o sin numerar). Nunca se le exige escribir delimitadores.
- **El asistente:**
  - Conduce la conversación y la numeración secuencial (1 a N, máximo 4).
  - Envuelve internamente y de forma visible el contenido del usuario en los bloques delimitadores:
    `===instruccion N===`
    [contenido del usuario]
    `===fin de instruccion N===`
  - **No ejecuta trabajo de código ni comandos de modificación** hasta que el paquete completo de instrucciones esté consolidado y el usuario dé la confirmación final de inicio.

## Herramientas Obligatorias

- Los **pasos 1, 3 y 4** se ejecutan **siempre con la herramienta `question`**. Está prohibido preguntar en texto plano en esos pasos: cualquier duda se formula como pregunta preparada.
- Todas las dudas de una misma instrucción van en **una sola llamada** a `question` con varias preguntas en el arreglo `questions`. No abras rondas sucesivas de preguntas.
- Cada pregunta debe tener:
  - Contexto breve y real del código (verificado leyendo los archivos, no supuesto).
  - Opciones concretas y excluyentes entre sí.
  - La primera opción con el sufijo `(Recomendado)`.
  - `header` corto (máx. 30 caracteres).
- `question` permite respuesta personalizada: si el usuario escribe texto libre en lugar de elegir una opción, acepta esa respuesta, ajústala al contexto de la instrucción y reflétela en los delimitadores.

## Estado Activo

- Si la skill **ya está activa** en la conversación, **retoma el paso donde quedó**. No vuelvas a preguntar el conteo inicial ni anuncies la activación otra vez.
- El bloque consolidado de instrucciones permanece **visible en cada mensaje** del flujo, no solo en el momento de definirlo.

## Flujo Operativo Paso a Paso

### 1. Definición y Conteo Inicial

- Al activarse la skill, pregunta al usuario cuántas instrucciones desea incluir. **Usa `question`** con estas opciones:
  - `1` — "Una instrucción"
  - `2` — "Dos instrucciones"
  - `3` — "Tres instrucciones"
  - `4` — "Cuatro instrucciones"
  - `No sé` — "No sé cuántas, definámoslas una a una"
  
  En el `header` recuerda el límite: "Máximo 4 instrucciones".
- Si el usuario indica un número (ej. 3): guíalo interactivamente para recopilar cada una si no las ha suministrado aún.
- Si el usuario ya proporcionó el texto completo en su primer mensaje, extrae y separa las peticiones respetando el número indicado o separando hasta un tope de 4.
- Si el usuario dice que no sabe cuántas dará: indícale que las irán definiendo una a una, preguntando tras cada instrucción si desea agregar la siguiente o cerrar el plan para empezar.

### 2. Estructuración con Delimitadores

- Cada requerimiento se enumera secuencialmente empezando en 1.
- Muestra las instrucciones consolidadas al usuario utilizando los delimitadores oficiales:
  ```
  ===instruccion 1===
  ...
  ===fin de instruccion 1===
  ```
- **Muestra el bloque siempre**, incluso cuando la instrucción todavía está vacía o pendiente de redactar, en el mismo mensaje en que formulas la pregunta. El usuario debe ver la estructura en todo momento.

### 3. Aclaraciones Previas: Preguntas Preparadas

- Si una instrucción tiene ambigüedades o decisiones de diseño por definir (ej. dónde se filtra, qué campos intervienen, si se pagina), el asistente **no pregunta en texto plano**: primero investiga el código afectado (jobs de lectura) y aporta contexto verificado.
- Presenta cada duda como una **pregunta preparada de opción múltiple** con la herramienta `question`, para que el usuario solo tenga que elegir:
  - Contexto breve y real del código.
  - Opciones concretas y excluyentes.
  - La primera opción debe ser la recomendada, marcada como `(Recomendado)`.
- Con las respuestas, ajusta el contenido de la instrucción dentro de sus delimitadores y vuelve a mostrar la versión consolidada.
- Evita rondas repetidas: pregunta todo lo necesario en una sola llamada a `question`.

### 4. Confirmación Previa a la Ejecución

- Cuando las instrucciones acordadas estén listas (hasta 4), **antes de ejecutar cualquier acción o cambio en el proyecto**, confirma con `question`:
  - `Proceder` — "Sí, procede con este plan (Recomendado)"
  - `Otro plan` — "No, prefiero hacer otro plan"
- No ejecutes nada hasta que la respuesta sea positiva.

### 5. Ejecución Guiada

- Una vez confirmada la ejecución:
  - Ejecuta la instrucción 1.
  - Cada lista, plan o conjunto de tareas (`todowrite`) que se cree en esta fase debe llevar como encabezado el título de la instrucción activa (ej. `# Instrucción 1 — [Acción]`).
  - Si una instrucción contiene una regla explícita de solicitar permiso (ej. antes de hacer un commit), haz una pausa y solicita la autorización explícita antes de ejecutar la acción.
  - Al completar cada instrucción, informa el estado y anuncia el paso a la siguiente:
    > *"Instrucción [N] completada. Procedemos a trabajar en la instrucción [N+1]."*
  - Repite hasta concluir las instrucciones del plan.

## Recordatorio

- Sin activación explícita ("plan empirico" / "empirical plan"), este flujo NO se aplica.
- No modificar archivos ni ejecutar cambios antes de la confirmación formal del plan en el paso 4.