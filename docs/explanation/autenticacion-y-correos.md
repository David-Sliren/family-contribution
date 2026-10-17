# Autenticación y correos

Por qué la autenticación de la plataforma funciona como funciona.

## Better Auth en lugar de JWT a mano

Históricamente el proyecto usaba JWT con `jose` y rutas escritas a mano (`/api/auth/login`, `/register`, `/logout`). Se migró a **Better Auth** con el adaptador `better-auth-mongoose` porque aporta registro, sesión en cookie httpOnly, verificación de correo, recuperación de contraseña y login social sin mantener código propio de criptografía. El adaptador **reutiliza el modelo mongoose `User`** existente (`additionalFields` agrega `tel`, `relationship` y `role`), evitando duplicar la colección.

La sesión en servidor se lee con `getSession()` (`src/utils/getUserData.js`), que memoriza con `cache()` la llamada a `auth.api.getSession`. Las rutas leen `session.user.id`/`session.user.role` para inyectar campos y verificar rol.

## Verificación de correo obligatoria

`requireEmailVerification: true` con `sendOnSignUp`/`sendOnSignIn`. La decisión: la plataforma maneja aportes reales y datos familiares; una cuenta sin verificar permite suplantación trivial con el correo de otro. El costo —el registro ya no crea sesión— se asume explícitamente en la UI ("Revisa tu correo") y Better Auth reenvía el enlace con cada intento de login.

**Migración**: usuarios existentes necesitan `emailVerified: true` (un `updateMany` en producción); sin eso no pueden entrar.

## Recuperación de contraseña

Flujo completo por correo: `forgot-password` → `authClient.requestPasswordReset` (siempre responde `status: true`, anti-enumeración: no revela si el correo existe) → Better Auth envía `/api/auth/reset-password/:token?callbackURL` → `reset-password`. Un token inválido o expirado redirige con `?error=INVALID_TOKEN`.

## Los correos no rompen ningún flujo

Los correos son **transaccionales y best-effort**: si el SMTP de Gmail falla, la plataforma no puede impedir que alguien se registre o recupere su contraseña. Better Auth captura los errores de sus callbacks (`runInBackgroundOrAwait` loguea `Failed to run background task`) y la utilidad de envío propia (`src/utils/email.js`) también es server-only y silenciosa en su manejo por parte del caller.

Se usa **Nodemailer con SMTP de Gmail** (puerto 465, `secure: true`) en lugar de APIs tipo Resend: el proyecto ya vive en el ecosistema Google del negocio y no necesita otro proveedor ni otra variable de API. Las credenciales son una **contraseña de aplicación** (no la contraseña real), lo que permite revocarla sin tocar el código.

## Plantilla de correo con estilos inline

`TemplateEmail` usa estilos inline a propósito: Gmail recorta selectores de `<style>` y Outlook los elimina. Es una plantilla reutilizable (verificación, recuperación y futuros avisos) que sigue la paleta M3 de `DESIGN.md` en hex. Ver [`../how-to/enviar-un-correo-transaccional.md`](../how-to/enviar-un-correo-transaccional.md).

## Dos factores de "quién toca qué"

- `role` (`user` \| `carer` \| `admin`) se controla **solo en servidor** (`input: false` en Better Auth): nadie puede autoasignarse admin. Solo un admin cambia roles, y nadie cambia el suyo propio (`PUT /api/dashboard/users/[id]` → `403`).
- El proxy (`src/proxy.js`) repite los chequeos de sesión/rol como defensa en profundidad: las mutaciones del dashboard requieren admin **tanto en el proxy como en la ruta**.
