# API

Descripción técnica de los endpoints de `src/app/api/**/route.js`. Convenciones generales:

- Las respuestas de éxito devuelven JSON con los documentos limpiados por `cleanIdPlugin` (`_id` → `id`, sin `__v`); las listas paginadas devuelven `{ data, pagination }`.
- Los errores siguen la forma `{ "error": "mensaje en inglés" }`. La validación zod fallida responde `400` con los `issues` (path + message).
- Códigos habituales: `401` "Token invalid", `403` "user unauthorized", `404` con códigos como `NOT_FOUND_PATIENT`, `500` "internal server error".
- `src/proxy.js` añade una capa extra: las mutaciones de `/api/dashboard/*` exigen sesión y rol `admin` también en el proxy; los `GET` quedan exentos porque el prefetch SSR hace self-fetch sin cookies.
- Cualquier ruta de API no contemplada responde `404` JSON por `src/app/api/[...not-found]/route.js`.

## Auth (Better Auth)

`/api/auth/[...all]` — catch-all gestionado por Better Auth (GET/POST): registro (`sign-up/email`), inicio y cierre de sesión (`sign-in/email`, `sign-out`), verificación de correo (`verify-email`), recuperación de contraseña (`request-password-reset`, `reset-password`) y login social con Google (`sign-in/social`). Público; la sesión vive en cookie con prefijo `family-contribution`.

## Endpoints públicos (sin sesión)

| Método | Ruta                     | Descripción                                                                                        | Parámetros                                             |
| ------ | ------------------------ | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| GET    | `/api/main-patient`      | Paciente principal (`isMain`, fallback al primero) con totales poblados (`totalFunds`, `monthFunds`, `totalExpenses`, `monthExpenses`, `totalInventories`). No expone `funds`/`expenses`. | —                                                      |
| GET    | `/api/contributions`     | Lista paginada de contribuciones.                                                                  | `purpose`, `method`, `status`, `page`, `limit`         |
| GET    | `/api/contributions/[id]`| Una contribución.                                                                                  | —                                                      |
| GET    | `/api/expenses`          | Lista paginada de gastos.                                                                          | `page`, `limit`                                        |
| GET    | `/api/expenses/[id]`     | Un gasto.                                                                                          | —                                                      |
| GET    | `/api/inventories`       | Lista paginada de inventario.                                                                      | `page`, `limit`                                        |
| GET    | `/api/inventories/[id]`  | Un ítem de inventario.                                                                             | —                                                      |
| GET    | `/api/users`             | Lista paginada de usuarios.                                                                        | `search`, `role`, `relationship`, `page`, `limit`      |
| GET    | `/api/users/[id]`        | Un usuario.                                                                                        | —                                                      |
| GET    | `/api/events`            | Lista paginada de eventos (auditoría).                                                             | `page`, `limit`, `type`                                |
| GET    | `/api/dashboard/patients`| Lista paginada de pacientes (regex insensible sobre `name` y `lastName`).                          | `search`, `page`, `limit`                              |
| GET    | `/api/dashboard/patients/[id]` | Un paciente.                                                                                  | —                                                      |

## Endpoints con sesión (cualquier usuario autenticado)

| Método | Ruta                         | Descripción                                                                                   |
| ------ | ---------------------------- | --------------------------------------------------------------------------------------------- |
| GET    | `/api/profile/me`            | Perfil del usuario de la sesión.                                                               |
| GET    | `/api/profile/[id]`          | Perfil de un usuario con sus contribuciones.                                                   |
| POST   | `/api/payment/preference`    | Crea una preferencia de Mercado Pago y devuelve `init_point`. Body: `amount` (mín. 6000 COP), `purpose`. Sin sesión responde `401`. |
| POST   | `/api/files/upload-images`   | Sube una imagen a Cloudinary (multipart); el folder depende de `FOLDER_IMAGES`.                |

## Callback externo

| Método | Ruta                     | Descripción                                                                                                                                              |
| ------ | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | `/api/payment/webhook`   | Notificación de Mercado Pago (sin sesión). En pagos aprobados crea una contribución (`method: "pasarela"`, `status: "confirmado"`, `paymentId` desde la referencia externa). Un `paymentId` duplicado (error mongoose `11000`) se ignora. |

## Endpoints solo-admin (sesión + `role === "admin"`)

| Método | Ruta                                | Descripción                                                                                                             |
| ------ | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| POST   | `/api/dashboard/patients`           | Crea paciente (`patientSchema`); la ruta inyecta `createBy` y el primer paciente queda `isMain: true`. → `201`            |
| PUT    | `/api/dashboard/patients/[id]`      | Actualiza con `patientUpdateSchema` (`.partial()`); inyecta `updateBy`. → `201`                                           |
| DELETE | `/api/dashboard/patients/[id]`      | Elimina paciente.                                                                                                         |
| PUT    | `/api/dashboard/patients/[id]/main` | Marca el paciente como principal y quita `isMain` de los demás.                                                           |
| POST   | `/api/dashboard/contributions`      | Crea contribución (solo-admin); inyecta `createBy`, `patientId` (paciente principal) y `updateBy`. → `201`                 |
| PUT    | `/api/dashboard/contributions/[id]` | Actualiza contribución (`contributionUpdateSchema`). → `201` — no existe DELETE.                                           |
| POST   | `/api/dashboard/expenses`           | Crea gasto; valida el fondo disponible (`INSUFFICIENT_FUNDS` → `400`) y `PATIENT_NOT_FOUND`.                              |
| PUT    | `/api/dashboard/expenses/[id]`      | Actualiza gasto (vuelve a validar el fondo).                                                                              |
| DELETE | `/api/dashboard/expenses/[id]`      | Elimina gasto.                                                                                                            |
| POST   | `/api/dashboard/inventories`        | Crea ítem de inventario.                                                                                                  |
| PUT    | `/api/dashboard/inventories/[id]`   | Actualiza ítem de inventario.                                                                                             |
| DELETE | `/api/dashboard/inventories/[id]`   | Elimina ítem de inventario.                                                                                               |
| PUT    | `/api/dashboard/users/[id]`         | Cambia el rol de un usuario (`userRoleBackendSchema`); no admite cambiar el propio rol (`403`).                           |

> `GET /api/dashboard` es un health-check de ejemplo ("hello from dashboard").

## Notas de comportamiento

- Los `GET` listados como públicos lo son a nivel de route handler (el prefetch SSR los necesita sin cookies); la protección real de las pantallas del dashboard la da el proxy en `/dashboard/:path*`.
- Los campos controlados por servidor (`createBy`, `updateBy`, `role`, `patientId` de contribution, `paymentId`) se inyectan en la ruta y se omiten deliberadamente de los schemas frontend de zod.
- La pasarela de pago exige sesión: un usuario anónimo recibe `401` en `/api/payment/preference`.
