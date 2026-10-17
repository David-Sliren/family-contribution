# Cómo enviar un correo transaccional

La plataforma envía correos por SMTP de Gmail con Nodemailer. El envío es solo servidor y **nunca debe romper el flujo que lo dispara**.

## 1. Variables necesarias

- `GMAIL_USER`: cuenta Gmail que envía.
- `GMAIL_APP_PASSWORD`: contraseña de aplicación (myaccount.google.com/apppasswords; requiere verificación en dos pasos).

## 2. Elige (o crea) la plantilla

La plantilla reutilizable es `src/components/ui/email/TemplateEmail.jsx`, con props:

| Prop          | Descripción                                        |
| ------------- | -------------------------------------------------- |
| `title`       | Título del correo.                                 |
| `message`     | Cuerpo del mensaje (texto).                        |
| `userName`    | Nombre con el que se saluda.                       |
| `buttonText`  | Texto del botón (CTA).                             |
| `buttonUrl`   | URL del botón.                                     |
| `note`        | Nota pequeña bajo el botón.                        |
| `footerText`  | Pie; tiene texto por defecto.                      |

Está con **estilos inline a propósito**: el HTML de correo no procesa Tailwind ni clases externas (Outlook borra los `<style>`, Gmail recorta selectores). Sigue la paleta M3 de `DESIGN.md` en hex.

## 3. Envía con sendEmail

`src/utils/email.js` exporta `sendEmail({ toEmail, subject, template })`:

```js
import { sendEmail } from "@/utils/email";

await sendEmail({
  toEmail: "familia@example.com",
  subject: "Aviso de la plataforma",
  template: {
    title: "Nuevo aviso",
    userName: "David",
    message: "El fondo del mes ya está cerrado.",
    buttonText: "Ver el dashboard",
    buttonUrl: "https://tu-app.com/dashboard",
    note: "Necesitas iniciar sesión para verlo.",
  },
});
```

Detalles internos (no requieren acción): renderiza con `renderToStaticMarkup` mediante **import dinámico** de `react-dom/server` (Turbopack bloquea el estático) y entrega por nodemailer (puerto 465, `secure: true`).

## 4. No rompas el flujo

Envuelve la llamada en `try/catch` y solo loguea; Better Auth ya hace lo mismo con los suyos (`runInBackgroundOrAwait` loguea `Failed to run background task`). Un SMTP caído no puede impedir registrar un usuario ni recuperar una contraseña.

## 5. Callbacks existentes

Los dos puntos donde hoy se envían correos son los callbacks `sendVerificationEmail` y `sendResetPassword` de `src/utils/auth.js`, llamados por Better Auth (verificación obligatoria y recuperación de contraseña).

Ver también: [`../explanation/autenticacion-y-correos.md`](../explanation/autenticacion-y-correos.md).
