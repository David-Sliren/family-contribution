# Cómo probar la pasarela de Mercado Pago en local

La pasarela necesita dos cosas que en local no existen: una **URL pública** (Mercado Pago debe poder llamar a tu webhook) y una **sesión iniciada** (la preferencia exige sesión; un usuario anónimo recibe `401`).

## 1. Túnel público

```bash
ngrok http 3000
```

Copia la URL que asigna (p.ej. `https://abc123.ngrok-free.app`). Si el navegador bloquea las peticiones cross-origin en desarrollo, agrega el origen en `allowedDevOrigins` de `next.config.mjs` (ya hay un origen de ngrok de ejemplo).

## 2. Apunta BASE_URL al túnel

En `.env.local`:

```bash
BASE_URL=https://abc123.ngrok-free.app
MP_ACCESS_TOKEN=TEST-...-...
```

Reinicia `pnpm dev`: `BASE_URL` alimenta el webhook y las back URLs de Mercado Pago.

## 3. Genera la preferencia

Con sesión iniciada, entra a `/contribute`, elige **Pasarela de pago**, escribe una cantidad (mínimo **$6000 COP**, validado en los schemas zod) y un propósito, y pulsa **Pagar**. La app llama a `POST /api/payment/preference` y te redirige a `init_point` (Mercado Pago).

## 4. Paga en modo prueba

Usa el panel de Mercado Pago con cuenta de prueba o las tarjetas de prueba del entorno de sandbox.

## 5. El webhook crea la contribución

Mercado Pago notifica a `{BASE_URL}/api/payment/webhook`. En pagos aprobados se crea una contribución con `method: "pasarela"`, `status: "confirmado"` y el `paymentId` de la referencia externa. Repetir la misma notificación **no duplica**: el `paymentId` es único (`sparse`) y el error `11000` se ignora.

## 6. Comprueba el resultado

- `/dashboard/contributions`: la contribución aparece confirmada.
- `/dashboard`: el fondo disponible creció (solo cuenta lo confirmado).
- `ActivityTimeline`: aparece el evento de la contribución (el webhook llama a `Contribute.create`, que la registra).

## Solución de problemas

| Síntoma                        | Causa probable                                                     |
| ------------------------------ | ------------------------------------------------------------------ |
| `401 {"error":"Token invalid"}`| No hay sesión; entra de nuevo.                                     |
| No redirige a Mercado Pago     | `MP_ACCESS_TOKEN` inválido o `amount` menor a 6000.                |
| No llega la contribución       | `BASE_URL` no es la del túnel, o el túnel/ngrok está caído.        |
| La página no carga en ngrok    | Falta el origen en `allowedDevOrigins` de `next.config.mjs`.       |

Ver también: [`../explanation/pagos.md`](../explanation/pagos.md) y [`../reference/api.md`](../reference/api.md).
