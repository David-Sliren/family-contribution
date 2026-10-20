---
name: plan-empirico
description: Ayuda a definir y ejecutar planes de trabajo interactivos de hasta cuatro instrucciones, con reconocimiento previo del código, expectativas verificables y reflexión tras cada paso. Actívala con «plan empirico» / «empirical plan», invócala como skill o úsala cuando el usuario pida claramente este flujo guiado.
metadata:
  opencode/slash: "true"
---

# Plan empírico

Guía una conversación para definir y, tras confirmación, ejecutar un plan de hasta cuatro instrucciones. Lo empírico es la columna vertebral: observar el código antes de proponer, formular expectativas que se puedan contrastar y ajustar el rumbo según lo que cada paso revele. El usuario expresa sus necesidades en lenguaje natural; el asistente observa el terreno, organiza el plan y deja claro qué esperamos que pase antes de cambiar archivos.

## Activación y estado

El usuario puede activar este flujo escribiendo «plan empirico» / «empirical plan», mencionando `@plan-empirico` o usando el comando `/plan-empirico` en OpenCode. El metadato `opencode/slash: "true"` expone esta skill como comando slash. También puedes usarla si la petición claramente pide definir un plan interactivo antes de ejecutar. No fuerces este flujo ante una petición ordinaria de planificación o una tarea sencilla.

No preguntes proactivamente si el usuario quiere ejemplos. Si invoca la skill sin describir una tarea, escribe una activación incompleta o pregunta cómo usarla, sugiere brevemente: «Para ver ejemplos, ejecuta `--help_`». En los demás casos, empieza directamente con su petición. Solo cuando el usuario invoque la skill con `--help_`, presenta ejemplos breves de una petición sencilla y de una lista con más de cuatro peticiones; luego pregunta si quiere iniciar un plan. Conserva cualquier petición de trabajo que el usuario ya hubiera descrito y no le pidas que la repita. No interpretes `--help_` como una autorización para ejecutar cambios.

Si hay un plan activo sin cerrar y su contenido está disponible en la conversación, retómalo desde el punto pendiente y conserva las instrucciones ya acordadas. Distingue lo completado de lo que quedó a medias o pendiente; no repitas trabajo ya hecho. Si el contexto anterior no está disponible o no permite saber el estado con seguridad, no reconstruyas ni inventes el plan: explica qué información falta y pide al usuario que comparta el plan o un breve resumen de lo completado y lo pendiente. Si el plan anterior se cerró con «Plan de N instrucciones finalizado», una nueva invocación comienza un plan nuevo.

## Reconocimiento

Antes de proponer instrucciones, examina el código pertinente a la petición con operaciones de solo lectura. El objetivo es construir el plan sobre la realidad del código, no solo sobre la descripción del usuario. Resume brevemente:

- **Qué existe hoy**: archivos, funciones, patrones y estado relevante.
- **Qué convenciones aplican**: del proyecto, del framework o del entorno.
- **Discrepancias**: si algo en el código contradice, matiza o complementa lo que el usuario describió, señálalo antes de planificar.

Expón el reconocimiento al usuario como contexto del plan, no como un informe formal. Si el usuario ya aportó contexto verificable y coincide con el código, no repitas lo que ambos saben. Si la petición es directa y el contexto ya está claro (por ejemplo, una corrección puntual donde el archivo y el problema son evidentes), el reconocimiento puede ser mínimo o implícito.

## Construcción del plan

1. Si el usuario ya describió lo que necesita, organiza su petición directamente a partir de lo observado en el reconocimiento. Si todavía no dio una tarea concreta, empieza con una invitación sencilla, por ejemplo: «¿Qué te gustaría resolver? Cuéntamelo en lenguaje natural; puedo organizar hasta cuatro instrucciones en un plan». No empieces preguntando cuántos planes quiere hacer ni exijas que cuente o redacte las instrucciones de una forma especial.
2. Agrupa las peticiones relacionadas en hasta cuatro instrucciones por plan. El límite de cuatro mantiene el alcance manejable y permite completar un ciclo de trabajo en una sola sesión sin perder el hilo. Si aparecen más de cuatro, conserva y muestra la lista completa; pregunta si el usuario prefiere priorizar cuatro para este plan o dividir el trabajo en varios planes. Al dividirlo, conserva todas las peticiones, respeta las prioridades expresadas y ordena por dependencias cuando las haya. Muestra los planes propuestos y señala cuál se abordaría primero. Cada plan tiene como máximo cuatro instrucciones y requiere su propia confirmación antes de ejecutarse; al acabar uno, presenta el siguiente y pide confirmación para continuar. No descartes ni empieces trabajo de planes posteriores sin avisar. Si el usuario no sabe por dónde empezar, define una instrucción a la vez y ofrece agregar otra o cerrar el plan.
3. Para sugerir instrucciones o resolver ambigüedades, apóyate en los hallazgos del reconocimiento y, si hace falta, profundiza con más lectura de código. Expón brevemente los hallazgos verificados y presenta las decisiones pendientes como opciones concretas, excluyentes y con una recomendación cuando tenga sentido. Pregunta solo lo que pueda cambiar el alcance o el resultado; resuelve detalles rutinarios con criterio. Agrupa en una sola ronda las preguntas de una misma instrucción y acepta respuestas en texto libre.
4. Redacta cada instrucción con una expectativa verificable: qué se va a hacer, qué esperamos que pase y, cuando sea útil, cómo se comprobará. La expectativa no es un criterio de aceptación formal, sino una predicción en lenguaje natural que se pueda contrastar después («el lint pasa», «la página muestra X», «el archivo ya no importa Y»). No impongas expectativas forzadas a tareas triviales donde el resultado es obvio.
5. Después de cada respuesta, incorpora lo acordado y muestra el plan consolidado actualizado. Usa este formato para cada instrucción:

   ```text
   ===instruccion 1=== [pendiente]
   Petición: [lo que se va a hacer]
   Esperamos: [resultado observable esperado]
   Verificación: [cómo se comprueba, si aplica]
   ===fin de instruccion 1===
   ```

   El estado entre corchetes refleja la situación de la instrucción: `pendiente`, `en curso`, `completada`, `fallida` u `omitida`. **Esperamos** y **Verificación** pueden omitirse en instrucciones donde el resultado es evidente. No muestres instrucciones vacías salvo que ayude a pedir el contenido que falta. Mantén la numeración consecutiva.

## Cómo preguntar

Pregunta para reducir incertidumbre, no para cubrir formalidades. Cada pregunta debería cumplir al menos una de estas funciones:

- **Distinguir caminos**: los caminos posibles producirían resultados diferentes y el usuario debe elegir.
- **Confirmar suposiciones**: algo que el código no permite verificar y que afecta al plan.
- **Dar control de diseño**: una decisión legítima donde el usuario tiene preferencia.

No preguntes lo que puedas resolver leyendo el código. No preguntes lo que no cambie el resultado.

Usa la herramienta estructurada de preguntas/opciones disponible en el entorno cuando exista. Cada pregunta debe incluir el contexto necesario, opciones claras y una forma de responder libremente; marca la opción recomendada como «(Recomendado)» cuando haya evidencia para hacerlo. Agrupa las preguntas relacionadas en una sola ronda si la herramienta lo permite.

Si el entorno no ofrece esa herramienta, pregunta en el chat con una lista numerada breve y acepta una opción, una combinación de opciones o texto libre. No dependas de un nombre de herramienta específico ni detengas el flujo por su ausencia.

## Confirmación y ejecución

Aclara si el usuario quiere solo definir el plan o también ejecutarlo. Si ya pidió explícitamente dejarlo preparado, no vuelvas a preguntarlo. Cuando el plan esté completo, muestra su versión consolidada y ofrece estas opciones: dejar el plan preparado sin cambios, confirmar y ejecutar el plan, ajustar/reemplazarlo o cancelarlo. La elección explícita de «confirmar y ejecutar» es la autorización para empezar ese plan, solo si el modo actual permite modificar archivos; si está activo un modo de solo lectura, explica que debe desactivarse antes de ejecutar. Si el usuario elige dejarlo preparado, presenta el plan final y ciérralo sin cambios. Si lo cancela o no lo confirma, cierra ese plan sin ejecutar cambios y resume brevemente qué quedó acordado. Una respuesta ambigua o negativa no cuenta como autorización para ejecutar.

Al ejecutar:

- Trabaja una instrucción a la vez y carga las skills del proyecto que correspondan antes de la acción (por ejemplo, la skill de commits antes de preparar un commit).
- Si una acción requiere una autorización adicional según las instrucciones del proyecto o del entorno, pausa y solicita esa autorización.
- Cuando una instrucción implique cambios en muchos archivos, modificaciones de lógica de negocio o alteraciones de esquemas de datos, señálalo como «cambio amplio» y sugiere verificación incremental (por ejemplo, ejecutar lint o revisar un archivo antes de continuar con los demás).
- **Reflexión post-instrucción**: al completar cada instrucción, antes de pasar a la siguiente, evalúa brevemente: ¿el resultado coincide con lo que esperábamos? ¿Descubrimos algo que afecte las instrucciones restantes? Si la evidencia sugiere ajustar el plan, proponlo al usuario antes de continuar. No ejecutes la siguiente instrucción con un plan que la evidencia ya contradice. Actualiza el estado de la instrucción completada en el plan visible.
- Si al ejecutar una instrucción descubres que una instrucción posterior es innecesaria, insuficiente o necesita una nueva dependencia, no la ejecutes tal cual. Actualiza el plan, explica qué evidencia motivó el cambio y pide confirmación si el alcance se modifica.
- Informa al terminar cada instrucción el resultado y la comprobación realizada cuando corresponda; luego indica cuál sigue. Usa las verificaciones disponibles y adecuadas al proyecto. La mención de cómo comprobar un resultado no implica añadir ni ejecutar pruebas automáticamente: respeta las instrucciones del proyecto y hazlo solo cuando corresponda o el usuario lo solicite. No marques una instrucción como completa si falta trabajo necesario.
- Si una instrucción falla o queda a medias, explica qué se intentó, qué resultado hubo y qué falta. Conserva ese estado y ofrece continuar desde el punto pendiente; no reinicies el plan ni declares éxito parcial como finalización.
- Si el usuario cambia una instrucción durante la ejecución, actualiza el plan visible. Si el cambio modifica materialmente el alcance, el resultado esperado o las acciones aprobadas, pausa y pide confirmación del plan actualizado antes de continuar. Para ajustes menores que no cambian lo aprobado, incorpora el cambio y comunícalo.
- Si el usuario pide detenerse, pausa y resume qué instrucciones están completas, a medias y pendientes. No interpretes «detente» como cancelación permanente; pregunta si desea retomar después, modificar o cerrar el plan solo cuando haga falta para saber cómo seguir.
- Al finalizar la última, anuncia: «Plan de N instrucción(es) finalizado».

No realices cambios antes de que el usuario confirme el plan. La confirmación no sustituye permisos adicionales ni cambia las restricciones del entorno.
