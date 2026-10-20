# Pagos con Mercado Pago

Cómo entra el dinero a la plataforma y por qué el flujo está así.

## Flujo de la pasarela

```text
/contribute (sesión) ──POST /api/payment/preference──▶ Preferencia Mercado Pago
        ◀────────────── init_point (redirección) ─────┘
usuario paga ──▶ Mercado Pago ──notifica──▶ POST /api/payment/webhook
                                              │ pago aprobado
                                              ▼
                              Contribute.create (method: pasarela,
                              status: confirmado, paymentId)
                                              │
                                              ▼
                              Event "creado" + totales del paciente
```

- La preferencia se crea en **COP** con `back_urls` y `notification_url` derivadas de `BASE_URL` (`src/app/api/payment/preference/route.js`).
- El webhook (`src/app/api/payment/webhook/route.js`) es la única entrada de dinero automática: en pagos aprobados crea la contribución. Como llama a `Contribute.create`, el evento queda registrado y las métricas del paciente se mueven solas.

## Decisiones y sus razones

**La pasarela exige sesión.** `POST /api/payment/preference` responde `401` a un anónimo. Sin sesión no hay `createBy` confiable: la contribución se acreditaría al paciente correcto pero "a nombre de nadie", rompiendo `totalContributed` y la auditoría. Es el único requisito que el flujo público de `/contribute` mantiene privado.

**Monto mínimo $6000 COP.** Validado en los schemas zod (no en la ruta): es el costo práctico de la pasarela; por debajo, las comisiones consumen el aporte.

**Idempotencia por `paymentId`.** Mercado Pago puede reenviar la misma notificación varias veces. El campo es `unique + sparse` y el error mongoose `11000` se ignora: repetir la notificación no duplica aportes.

**Los pagos aprobados nacen `confirmado`.** El fondo solo cuenta lo confirmado; la pasarela ya verificó el dinero, no hay estado intermedio que investigar.

## La transferencia es informativa

La opción "Transferencia" del selector de `/contribute` muestra el teléfono Nequi y la clave transacional (Bre-B) del paciente principal con botones de copiar, pero **no registra la contribución**: no hay forma de verificar el dinero en tiempo real desde el navegador. La contribución por transferencia la registra un admin desde el dashboard (`POST /api/dashboard/contributions`, `method: "transferencia"`, `status: "pendiente"` o `"confirmado"` según corresponda), contrastando el comprobante. Mismo criterio para el efectivo.

Por eso **crear contribuciones es solo-admin**: cada aporte queda asociado a un `createBy` real verificado por un administrador del espacio familiar. Los usuarios normales solo pueden aportar por pasarela (automática y verificable) o dejar su comprobante para que un admin lo registre.

## Moneda y totales

Los importes se guardan como número en la moneda del registro (`COP`/`USD` en gastos; las contribuciones de la pasarela son COP). `formatMoney` (`src/config/money.js`) centraliza el formato en todo el frontend para que las cifras no se pinten distinto en cada pantalla.

## Probar en local

Requiere un túnel público (ngrok) para el webhook: ver [`../how-to/probar-pasarela-en-local.md`](../how-to/probar-pasarela-en-local.md).

## Pendiente conocido

El webhook aún construye la contribución con el esquema viejo (`userId`, sin `patientId`/`createBy`) y falla contra el schema actual: la pasarela quedó fuera del último refactor y hay que arreglarla mapeando `external_reference.userId` → `createBy` e inyectando `patientId`. No se tocaron los archivos de `src/app/api/payment/` en ese cambio.
