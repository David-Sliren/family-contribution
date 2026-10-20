# Tutorial: primeros pasos

En este tutorial tendrás la plataforma corriendo en local, tu primer usuario verificado y un paciente creado. Es un tutorial: sigue los pasos en orden y al final tendrás algo que funciona.

**Requisitos**: Node.js 20.9 o superior, pnpm, Docker (o tu propio MongoDB), una cuenta Gmail con contraseña de aplicación (para recibir los correos) y, opcionalmente, una cuenta de Mercado Pago.

## 1. Instala el proyecto

```bash
git clone <url-del-repo>
cd family-contribution
pnpm install
```

## 2. Configura el entorno

```bash
cp .env.example .env.local
```

Edita `.env.local` con lo mínimo para arrancar:

```bash
MONGODB_URI=mongodb://localhost:27017/family-contribution
BETTER_AUTH_SECRET=$(openssl rand -base64 32)
BETTER_AUTH_URL=http://localhost:3000
BASE_URL=http://localhost:3000
```

Agrega también `GMAIL_USER` y `GMAIL_APP_PASSWORD` (contraseña de aplicación de Google, requiere verificación en dos pasos) si quieres recibir los correos de verificación y recuperación. `MP_ACCESS_TOKEN` puede quedar pendiente por ahora.

## 3. Levanta MongoDB

Si ya tienes el contenedor de desarrollo:

```bash
docker start mongo_dev
```

O crea uno nuevo:

```bash
docker run -d --name mongo_dev -p 27017:27017 mongo:7
```

## 4. Arranca el servidor

```bash
pnpm dev
```

Abre http://localhost:3000. Verás la página de inicio de la plataforma.

## 5. Registra tu primer usuario

Entra a `/auth/register` y completa: nombre, username (mínimo 4 caracteres, sin mayúsculas ni espacios), teléfono (10 dígitos que empiecen por 3), relación con el paciente, correo y contraseña.

**Importante**: el registro **no** inicia sesión. La verificación de correo es obligatoria en esta plataforma.

## 6. Verifica el correo

Busca en tu bandeja de entrada un correo de "Aleida | Contribucion" y pulsa el botón **Verificar correo**. Tu cuenta queda activa y **entras directo a la plataforma**: la sesión se crea al verificar, sin volver a escribir usuario ni contraseña.

Si el correo no llega:

- Comprueba que `GMAIL_USER`/`GMAIL_APP_PASSWORD` son correctos (deben ser los de una contraseña de aplicación, no la contraseña normal).
- Al intentar entrar de nuevo, Better Auth **reenvía el enlace** de verificación con cada intento.
- Un fallo de envío nunca rompe el registro: solo se loguea el error en la consola del servidor.

## 7. Inicia sesión

Solo hace falta si más tarde cierras sesión o abriste el enlace de verificación en otro navegador: en `/auth/login`, entra con tu username y contraseña.

## 8. Crea tu primer paciente

Ve a `/dashboard/patients` y crea un paciente. Todos los campos son obligatorios en el formulario, incluidos **Teléfono (Nequi)** (10 dígitos que empiecen por 3) y **Clave transacional (Bre-B)**.

El primer paciente que crees queda automáticamente como **paciente principal**: las métricas del dashboard y la página pública de contribuciones salen de él.

## 9. Comprueba que todo funciona

- `/dashboard` muestra las métricas: fondo disponible (aportes confirmados − gastos), gastos del mes y aportes del mes.
- La card del paciente en `/dashboard/patients` muestra las filas Teléfono (Nequi) y Clave transacional con su botón de copiar.
- `/contribute` (página pública) muestra el selector de método de pago y el nombre del paciente principal en la descripción de transferencia.

## Siguientes pasos

- Aprende a extender la plataforma: [`../how-to/agregar-un-feature-crud.md`](../how-to/agregar-un-feature-crud.md).
- Entiende las decisiones de diseño: [`../explanation/arquitectura.md`](../explanation/arquitectura.md).
- Referencia técnica completa: [`../reference/`](../reference/).
