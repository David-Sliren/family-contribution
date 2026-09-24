---
name: plan-empirico
description: Se activa UNICAMENTE cuando el usuario la invoca explicitamente o escribe "plan empirico" / "empirical plan". Guia al usuario en la definicion de maximo 4 instrucciones por plan. El usuario escribe en lenguaje natural libre y el asistente estructura cada instruccion dentro de delimitadores ===instruccion N=== ... ===fin de instruccion N===. El asistente no comienza a trabajar hasta tener todas las instrucciones definidas y confirmadas por el usuario, titula cada lista con la instruccion actual y ejecuta paso a paso.
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

## Flujo Operativo Paso a Paso

### 1. Definición y Conteo Inicial

- Al activarse la skill, pregunta al usuario cuántas instrucciones desea incluir en este plan, recordando el límite:
  > *"¿Cuántas instrucciones deseas trabajar en este plan? (Máximo 4 instrucciones por plan para garantizar precisión y calidad)."*
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

### 3. Confirmación Previa a la Ejecución

- Cuando las instrucciones acordadas estén listas (hasta 4), **antes de ejecutar cualquier acción o cambio en el proyecto**, pregunta al usuario:
  > *"Tenemos estructurado el plan con [N] instrucción(es). ¿Procedo a trabajar con este plan empírico o prefieres hacer otro plan? (Recomendación: proceder con este plan de hasta 4 instrucciones para ahorrar tokens y mantener la mayor calidad)."*

### 4. Ejecución Guiada

- Una vez confirmada la ejecución:
  - Ejecuta la instrucción 1.
  - Cada lista, plan o conjunto de tareas (`todowrite`) que se cree en esta fase debe llevar como encabezado el título de la instrucción activa (ej. `# Instrucción 1 — [Acción]`).
  - Si una instrucción contiene una regla explícita de solicitar permiso (ej. antes de hacer un commit), haz una pausa y solicita la autorización explícita antes de ejecutar la acción.
  - Al completar cada instrucción, informa el estado y anuncia el paso a la siguiente:
    > *"Instrucción [N] completada. Procedemos a trabajar en la instrucción [N+1]."*
  - Repite hasta concluir las instrucciones del plan.

## Recordatorio

- Sin activación explícita ("plan empirico" / "empirical plan"), este flujo NO se aplica.
- No modificar archivos ni ejecutar cambios antes de la confirmación formal del plan en el paso 3.