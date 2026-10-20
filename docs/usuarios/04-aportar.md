# Video 4 — Aportar: transferencia o pasarela de pago

## Metadata

- **Público**: familia
- **Orden**: 4 de 10
- **Duración estimada**: 2 min
- **Pantalla inicial**: `http://localhost:3000/` con sesión iniciada

---

### Escena 1 — Entrar a colaborar

- **Pasa**: clic en "Hacer una Colaboración"; abre la pantalla de aportes.
- **Narración**: "Desde el inicio pulsas **Hacer una Colaboración**. Entras a una pantalla con dos formas de ayudar: transferencia o pago con tarjeta."
- **En pantalla**: título **"Formulario de Colaboración"** y el saludo del paciente: *"Tu apoyo asegura el tratamiento continuo de {nombre} {apellido}. Cada contribución es un paso hacia su bienestar."*
- **Nota**: si no has iniciado sesión, la pantalla te lleva a iniciar sesión primero.

### Escena 2 — Elegir el método

- **Pasa**: se muestran las dos tarjetas de opción con sus descripciones.
- **Narración**: "Tienes dos opciones. **Transferencia**: mandas el dinero directo desde tu banco o tu Nequi. **Pasarela de pago**: pagas con tarjeta, PSE u otros medios de forma segura con Mercado Pago. Cada una dice qué hace; elige una."
- **En pantalla**: tarjeta **"Transferencia"** con la descripción *"Transfiere directamente desde tu banco o Nequi a los datos de {nombre} y apoya el tratamiento."* y tarjeta **"Pasarela de pago"** con *"Paga de forma segura con tarjeta, PSE u otros medios mediante Mercado Pago."*

### Escena 3 — Transferencia: los datos para copiar

- **Pasa**: elegida la transferencia, aparecen dos tarjetas de datos con botón de copiar.
- **Narración**: "Si eliges transferencia, aparecen los datos para enviar el dinero. El **Teléfono (Nequi)**: es el número al que mandas por Nequi, con el botón de copiar para no equivocarte. Y la **Clave transacional (Bre-B)**: la clave con la que pagas desde tu banco. Copias cada uno con un clic y listo."
- **En pantalla**: tarjeta **"Teléfono (Nequi)"** con la etiqueta *"Contribuye usando Nequi a este número"* y botón de copiar; tarjeta **"Clave transacional (Bre-B)"** con *"Contribuye usando la clave Bre-B"* y su copiar. Al copiar salta el aviso *"Copiado al portapapeles"*.
- **Nota**: si la familia aún no configuró un dato, verás *"No configurado"*. **Importante**: la transferencia no se registra sola; conserva tu comprobante y pásale a quien administra la plataforma para que quede en el historial.

### Escena 4 — Pasarela: llenar y pagar

- **Pasa**: elegida la pasarela, aparece el formulario; se completa y se paga.
- **Narración**: "Si eliges pasarela, escribes la cantidad —ojo, el mínimo son seis mil pesos—, escoges para qué es: inventario, gastos o cuidador, y pulsas **Pagar**. Te lleva a Mercado Pago, eliges cómo pagar y confirmas."
- **En pantalla**: formulario con **"Cantidad"** (ejemplo: *20000*), **"Proposito"** con opciones *inventario, gastos, cuidador* y botón **"Pagar"** → pantalla de Mercado Pago.
- **Nota**: si pones menos de seis mil aparece *"El Monto minimo es de $6000"*.

### Escena 5 — El pago quedó registrado

- **Pasa**: pago aprobado; se vuelve a la plataforma y se ve el aporte en la lista.
- **Narración**: "Cuando Mercado Pago aprueba el pago, el aporte queda confirmado en el historial y el fondo disponible crece al instante. No hay que avisarle a nadie."
- **En pantalla**: el historial del home con la nueva contribución en estado confirmado.

---

### Cierre

- **Pasa**: un aporte realizado por el método elegido.
- **Narración**: "Ya sabes aportar por transferencia o con tarjeta. En el siguiente video, para quienes administran, vemos cómo registrar pacientes en el dashboard."
- **Siguiente**: [05-pacientes.md](05-pacientes.md)
