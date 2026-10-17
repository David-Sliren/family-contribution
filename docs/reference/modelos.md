# Modelos de datos

Colecciones mongoose definidas en `src/database/*.js`. Todas usan `timestamps` y el plugin `cleanIdPlugin` (`src/utils/mongoose-helper/cleanDatabase.js`), que mapea `_id` → `id`, elimina `__v` y campos privados. La validación zod vive en `src/schemas/*` con pares `...Schema` (backend, importada por las rutas) y `...Frontend` (formularios); `contribution` además tiene `src/schemas/contribution.frontend.js` separado.

## users, accounts, sessions (Better Auth)

`accounts` y `sessions` las gestiona Better Auth (`better-auth-mongoose`) y no se tocan a mano. El modelo `User` (`src/database/user.js`) es el esquema propio que Better Auth extiende vía `additionalFields` (`tel`, `relationship`, `role` con `input: false`, controlado por servidor):

| Campo          | Tipo     | Detalle                                                          |
| -------------- | -------- | ---------------------------------------------------------------- |
| `name`         | String   | requerido                                                         |
| `role`         | enum     | `user` \| `carer` \| `admin`, default `user`                      |
| `relationship` | enum     | `hijo` \| `sobrino` \| `esposo` \| `hermano` \| `externo` \| `nieto` |
| `image`        | String   | default `""`                                                      |
| `tel`          | String   | default `""` (opcional: el login con Google no trae teléfono)     |
| `isDisabled`   | Boolean  | default `false`                                                   |

Virtuales: `contributions` (ref Contribution, `foreignField: "createBy"`), `totalContributed` y `monthMoreActive` (helpers en `src/utils/mongoose-helper/virtualFuntions.js`). El schema usa el plugin `cleanUser`.

## patients

| Campo         | Tipo    | Detalle                                                                    |
| ------------- | ------- | -------------------------------------------------------------------------- |
| `name`, `lastName` | String | requeridos                                                             |
| `image`       | String  | default `""` (nomenclatura Better Auth, campo `image`)                     |
| `age`         | Number  | requerido                                                                  |
| `goal`        | Number  | meta de recaudación                                                        |
| `reason`, `description` | String | requeridos                                                    |
| `carerName`, `clinicName` | String | default `""`                                                 |
| `tel`         | String  | teléfono Nequi; **requerido por zod** (10 dígitos, empieza por 3); mongoose `default: ""` |
| `keyT`        | String  | clave transacional Bre-B; **requerido por zod** (no vacío); mongoose `default: ""` |
| `isDisabled`  | Boolean | default `false`                                                            |
| `isMain`      | Boolean | solo un paciente principal (lo administra `Patients.setMain`)              |
| `createBy`, `updateBy` | ObjectId ref User | inyectados por las rutas desde la sesión           |

Virtuales de colección (eficientes con **un solo populate** en `Patients.getById`):

- `funds` (ref Contribution, `match: { status: "confirmado" }`) y `expenses` (ref Expense); `totalInventories` (ref Inventory, `count: true`).
- Getters: `totalFunds` (suma), `monthFunds` (conteo del mes), `totalExpenses` y `monthExpenses` (sumas). Sin populate devuelven `0`.
- `toJSON` usa `virtuals + getters` y su propio `transform` que **elimina `funds` y `expenses`** antes del de `cleanIdPlugin` (los totales sí se serializan).

## contributions

| Campo       | Tipo     | Detalle                                          |
| ----------- | -------- | ------------------------------------------------ |
| `paymentId` | String   | `unique + sparse`; lo fija Mercado Pago (webhook) |
| `method`    | enum     | `pasarela` \| `efectivo` \| `transferencia`       |
| `amount`    | Number   | requerido; mínimo 6000 COP en los schemas        |
| `status`    | enum     | `confirmado` \| `pendiente`                       |
| `purpose`   | enum     | `medicinas` \| `facturas` \| `cuidador`           |
| `date`      | Date     | default `Date.now`                                |
| `patientId` | ObjectId ref Patient | requerido                             |
| `createBy`  | ObjectId ref User | requerido (quien aporta)                 |
| `updateBy`  | ObjectId ref User | opcional                           |

## expenses

| Campo         | Tipo     | Detalle                                                     |
| ------------- | -------- | ----------------------------------------------------------- |
| `name`, `amount` | String/Number | requeridos                                           |
| `currency`    | enum     | `COP` \| `USD`                                               |
| `category`    | enum     | `transporte` \| `medicina` \| `suplemento` \| `clinico` \| `suministro` \| `cuidador` |
| `description` | String   | default `""`                                                 |
| `patientId`, `createBy`, `updateBy` | ObjectId refs | `createBy` requerido                       |
| `date`        | Date     | default `Date.now`                                           |

Regla de negocio: `amount` no puede superar `totalFunds − totalExpenses` del paciente (`INSUFFICIENT_FUNDS`).

## inventories

| Campo         | Tipo     | Detalle                                                    |
| ------------- | -------- | ---------------------------------------------------------- |
| `name`, `totalUnit` | String/Number | requeridos                                       |
| `price`       | Number   | default `0`                                                |
| `status`      | enum     | `en orden` \| `agotado` \| `bajo`                           |
| `concentration` | String | default `""`                                               |
| `category`    | enum     | `medicina` \| `suplemento` \| `suministro`                  |
| `description` | String   | default `""`                                               |
| `patientId`, `createBy`, `updateBy` | ObjectId refs | `createBy` requerido                      |
| `date`        | Date     | default `Date.now`                                         |

## events

Auditoría de la cuenta registrada por `Events.register` (`src/models/event.js`), que nunca rompe la mutación principal:

| Campo        | Tipo     | Detalle                                          |
| ------------ | -------- | ------------------------------------------------ |
| `type`       | enum     | `contribution` \| `inventory` \| `expense`        |
| `action`     | enum     | `creado` \| `actualizado` \| `eliminado`          |
| `entityId`   | ObjectId | entidad afectada (requerido)                      |
| `patientId`  | ObjectId ref Patient | opcional                              |
| `createBy`   | ObjectId ref User | actor (requerido)                       |
| `description`| String   | compuesta en el servidor con `formatMoney`        |
| `amount`     | Number   | default `0`                                       |

## Relaciones

```text
User ──createBy──▶ Patient / Contribution / Expense / Inventory / Event
Patient ──patientId──▶ Contribution (funds, solo confirmadas) / Expense / Inventory
```
