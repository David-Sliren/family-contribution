---
name: plan-empirico
description: Skill de flujo de trabajo por instrucciones numeradas. Se activa UNICAMENTE cuando el usuario la invoca explicitamente o escribe "plan empirico" / "empirical plan". Pregunta cuantas instrucciones quiere dar el usuario (maximo 4 por plan), las enumera de forma secuencial desde 1, las sigue paso a paso y en cada lista que crea usa como titulo la instruccion que esta ejecutando.
---

# Plan empirico

Flujo de trabajo para procesar varias instrucciones del usuario de forma ordenada. Esta skill **solo se activa cuando el usuario la invoca o escribe "plan empirico" / "empirical plan" en su prompt**. Si no aparece ninguna de esas claves, NO aplica este flujo: se responde al prompt normal.

Convencion de prompts del usuario a la que se ajusta: el usuario escribe las instrucciones dentro de bloques `===instruccion N===` ... `===fin de instruccion N===`.

## Reglas

1. **Pregunta inicial:** antes de empezar, pregunta al usuario cuantas instrucciones quiere darte.
2. **Limite de 4 por plan:** asegurale en la pregunta que solo puedes proceder con **4 instrucciones por plan**.
3. **Si no sabe cuantas:** si el usuario no sabe cuantas instrucciones va a dar, dile que entonces le preguntaras **despues de cada instruccion** si desea agregar otra instruccion o proceder con la hecha.
4. **Enumeracion secuencial:** enumera las instrucciones del usuario de manera secuencial empezando por el numero **1**.
5. **Pasos titulados:** sigue cada instruccion paso a paso y, en las listas que vallas a crear, coloca como **titulo la instruccion actual** (ej. `# Instruccion 1 — Lista de commits`, `# Instruccion 2 — Lista de refactors`).
6. **Preguntas de permiso dentro de las instrucciones:** si una instruccion pide solicitar permiso antes de un commit, hazlo textualmente en el momento indicado y espera la respuesta; tambien puedes usar la herramienta de pregunta para recibirla. No continues con el commit hasta tener el permiso.

## Flujo

1. Detecta la activacion: invocacion explicita de la skill o la frase "plan empirico" / "empirical plan" en el prompt.
2. Pregunta cuantas instrucciones quiere dar (advirtiendo el limite de 4 por plan).
   - Si responde un numero: si es 1-4, procede con ese total. Si es mas de 4, recuerdale el limite.
   - Si responde "no se": procede de a una instruccion y tras cada una pregunta "¿agregas otra instruccion o procedemos?".
3. Enumera las instrucciones recibidas desde 1.
4. Una por una, sigue la instruccion paso a paso. Cualquier lista que crees lleva como titulo el numero y asunto de la instruccion en curso.
5. Al terminar las instrucciones del plan, presenta el resumen de lo hecho. Si quedaron instrucciones sin procesar (por el limite de 4), indica que se retomaran en otro plan.

## Recordatorio

- La skill NO se activa automaticamente ante cualquier prompt multi-instruccion; solo ante "plan empirico" / "empirical plan" o invocacion explicita.
- Mantener el limite estricto de 4 instrucciones por plan y avisarlo en la primera pregunta.