---
name: plan-empirico
description: Ayuda a definir y ejecutar planes de trabajo interactivos de hasta cuatro instrucciones, con investigación previa, aclaraciones y confirmación antes de hacer cambios. Actívala con «plan empirico» / «empirical plan», invócala como skill o úsala cuando el usuario pida claramente este flujo guiado.
metadata:
  opencode/slash: "true"
---

# Plan empírico

Guía una conversación para definir y, tras confirmación, ejecutar un plan de hasta cuatro instrucciones. El usuario expresa sus necesidades en lenguaje natural; el asistente organiza el plan, investiga el código pertinente y deja claro el resultado esperado antes de cambiar archivos.

## Activación y estado

El usuario puede activar este flujo escribiendo «plan empirico» / «empirical plan», mencionando `@plan-empirico` o usando el comando `/plan-empirico` en OpenCode. El metadato `opencode/slash: "true"` expone esta skill como comando slash. También puedes usarla si la petición claramente pide definir un plan interactivo antes de ejecutar. No fuerces este flujo ante una petición ordinaria de planificación o una tarea sencilla.

No preguntes proactivamente si el usuario quiere ejemplos. Si invoca la skill sin describir una tarea, escribe una activación incompleta o pregunta cómo usarla, sugiere brevemente: «Para ver ejemplos, ejecuta `--help_`». En los demás casos, empieza directamente con su petición. Solo cuando el usuario invoque la skill con `--help_`, presenta ejemplos breves de una petición sencilla y de una lista con más de cuatro peticiones; luego pregunta si quiere iniciar un plan. Conserva cualquier petición de trabajo que el usuario ya hubiera descrito y no le pidas que la repita. No interpretes `--help_` como una autorización para ejecutar cambios.

Si hay un plan activo sin cerrar y su contenido está disponible en la conversación, retómalo desde el punto pendiente y conserva las instrucciones ya acordadas. Distingue lo completado de lo que quedó a medias o pendiente; no repitas trabajo ya hecho. Si el contexto anterior no está disponible o no permite saber el estado con seguridad, no reconstruyas ni inventes el plan: explica qué información falta y pide al usuario que comparta el plan o un breve resumen de lo completado y lo pendiente. Si el plan anterior se cerró con «Plan de N instrucciones finalizado», una nueva invocación comienza un plan nuevo.

## Construcción del plan

1. Si el usuario ya describió lo que necesita, organiza su petición directamente. Si todavía no dio una tarea concreta, empieza con una invitación sencilla, por ejemplo: «¿Qué te gustaría resolver? Cuéntamelo en lenguaje natural; puedo organizar hasta cuatro instrucciones en un plan». No empieces preguntando cuántos planes quiere hacer ni exijas que cuente o redacte las instrucciones de una forma especial.
2. Agrupa las peticiones relacionadas en hasta cuatro instrucciones por plan. Si aparecen más de cuatro, conserva y muestra la lista completa; pregunta si el usuario prefiere priorizar cuatro para este plan o dividir el trabajo en varios planes. Al dividirlo, conserva todas las peticiones, respeta las prioridades expresadas y ordena por dependencias cuando las haya. Muestra los planes propuestos y señala cuál se abordaría primero. Cada plan tiene como máximo cuatro instrucciones y requiere su propia confirmación antes de ejecutarse; al acabar uno, presenta el siguiente y pide confirmación para continuar. No descartes ni empieces trabajo de planes posteriores sin avisar. Si el usuario no sabe por dónde empezar, define una instrucción a la vez y ofrece agregar otra o cerrar el plan.
3. Para sugerir instrucciones o resolver ambigüedades, investiga primero el código relevante con operaciones de solo lectura. Expón brevemente los hallazgos verificados y presenta las decisiones pendientes como opciones concretas, excluyentes y con una recomendación cuando tenga sentido. Pregunta solo lo que pueda cambiar el alcance o el resultado; resuelve detalles rutinarios con criterio. Agrupa en una sola ronda las preguntas de una misma instrucción y acepta respuestas en texto libre.
4. Redacta cada instrucción de modo que quede claro el resultado esperado y, cuando sea útil, cómo se comprobará. No impongas criterios de aceptación formales a tareas sencillas.
5. Después de cada respuesta, incorpora lo acordado y muestra el plan consolidado actualizado. Usa este formato para cada instrucción:

   ```text
   ===instruccion 1===
   [petición acordada]
   ===fin de instruccion 1===
   ```

   No muestres instrucciones vacías salvo que ayude a pedir el contenido que falta. Mantén la numeración consecutiva.

## Cómo preguntar

Usa la herramienta estructurada de preguntas/opciones disponible en el entorno cuando exista. Cada pregunta debe incluir el contexto necesario, opciones claras y una forma de responder libremente; marca la opción recomendada como «(Recomendado)» cuando haya una recomendación fundada. Agrupa las preguntas relacionadas en una llamada si la herramienta lo permite.

Si el entorno no ofrece esa herramienta, pregunta en el chat con una lista numerada breve y acepta una opción, una combinación de opciones o texto libre. No dependas de un nombre de herramienta específico ni detengas el flujo por su ausencia.

## Confirmación y ejecución

Aclara si el usuario quiere solo definir el plan o también ejecutarlo. Si ya pidió explícitamente dejarlo preparado, no vuelvas a preguntarlo. Cuando el plan esté completo, muestra su versión consolidada y ofrece estas opciones: dejar el plan preparado sin cambios, confirmar y ejecutar el plan, ajustar/reemplazarlo o cancelarlo. La elección explícita de «confirmar y ejecutar» es la autorización para empezar ese plan, solo si el modo actual permite modificar archivos; si está activo un modo de solo lectura, explica que debe desactivarse antes de ejecutar. Si el usuario elige dejarlo preparado, presenta el plan final y ciérralo sin cambios. Si lo cancela o no lo confirma, cierra ese plan sin ejecutar cambios y resume brevemente qué quedó acordado. Una respuesta ambigua o negativa no cuenta como autorización para ejecutar.

Al ejecutar:

- Trabaja una instrucción a la vez y carga las skills del proyecto que correspondan antes de la acción (por ejemplo, la skill de commits antes de preparar un commit).
- Si una acción requiere una autorización adicional según las instrucciones del proyecto o del entorno, pausa y solicita esa autorización.
- Informa al terminar cada instrucción, el resultado y la comprobación realizada cuando corresponda; luego indica cuál sigue. Usa las verificaciones disponibles y adecuadas al proyecto. La mención de cómo comprobar un resultado no implica añadir ni ejecutar pruebas automáticamente: respeta las instrucciones del proyecto y hazlo solo cuando corresponda o el usuario lo solicite. No marques una instrucción como completa si falta trabajo necesario.
- Si una instrucción falla o queda a medias, explica qué se intentó, qué resultado hubo y qué falta. Conserva ese estado y ofrece continuar desde el punto pendiente; no reinicies el plan ni declares éxito parcial como finalización.
- Si el usuario cambia una instrucción durante la ejecución, actualiza el plan visible. Si el cambio modifica materialmente el alcance, el resultado esperado o las acciones aprobadas, pausa y pide confirmación del plan actualizado antes de continuar. Para ajustes menores que no cambian lo aprobado, incorpora el cambio y comunícalo.
- Si el usuario pide detenerse, pausa y resume qué instrucciones están completas, a medias y pendientes. No interpretes «detente» como cancelación permanente; pregunta si desea retomar después, modificar o cerrar el plan solo cuando haga falta para saber cómo seguir.
- Al finalizar la última, anuncia: «Plan de N instrucción(es) finalizado».

No realices cambios antes de que el usuario confirme el plan. La confirmación no sustituye permisos adicionales ni cambia las restricciones del entorno.
