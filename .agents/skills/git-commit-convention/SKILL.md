---
name: git-commit-convention
description: Use when making, splitting, or proposing git commits in this project (family-contribution). Documents the Conventional-Commits-style format tipo(scope): descripcion in Spanish, the types feat/fix/refactor/style/chore/docs, common scopes by layer/feature (Frontend/dashboard/inventory, Backend, etc.), ordering rules (chore first, feature before refactor), and project rules (no console.log, staging only intended files).
---

# Convencion de commits del proyecto

Convencion real extraida del historial de git (`git log --oneline`) del proyecto **family-contribution** (tambien llamado `contribution-aleida`). Sigue siempre este formato en los mensajes de commit.

## Formato base

```
tipo(scope): descripcion
```

- Todo en **minusculas**, sin titulos ni puntos finales.
- La descripcion es en **espanol** y empieza con un **verbo en infinitivo**: `agregar`, `crear`, `mejorar`, `quitar`, `centralizar`, `proteger`, `cambiar`, `usar`, `dividir`, `configurar`.
- Un commit puede listar varias acciones del mismo scope separadas por comas: ejemplo real `crear componente para añadir contribuciones, crear componentes para listar usuarios, agregar estos componentes a el componente index de la ruta users`.
- No se capitaliza nada. Se aceptan errores ortograficos habituales del autor (ver ejemplos), pero usa el espanol natural del autor.

## Tipos (convencion del proyecto)

| Tipo      | Uso                                              | Conteo en repo |
| --------- | ------------------------------------------------ | -------------- |
| `feat`    | Nueva funcionalidad                               | 34             |
| `fix`     | Correccion de un error                           | 23             |
| `refactor`| Reestructurar sin cambiar comportamiento         | 51             |
| `style`   | Ajustes de estilado/UI puros                     | 7              |
| `chore`   | Mantenimiento: dependencias, config, tooling     | 5              |
| `docs`    | Documentacion (AGENTS.md, skills, documentacion) | Nuevo          |

Se escribe `feat` (el historial lo registro como `feact`, un typo ya corregido). No introduzcas tipos que no existan en el historial, salvo `docs` (adoptado por convenio para documentacion del repo y skills).

## Scopes habituales

El scope apunta a la capa y, si aplica, a la feature:

- **Capa:** `Frontend`, `Backend`, `services`, `schema`, `models`, `eslint`, `package`, `next/config`, `proxy`, `analytics`, `env`
- **Capas compuestas** (prefijo `Frontend/`): `Frontend/UI`, `Frontend/home`, `Frontend/dashboard`, `Frontend/profile`, `Frontend/patients`, `Frontend/utils`, `Frontend/services`, `Frontend/components/form/inputs`
- **Feature dentro de dashboard:** `Frontend/dashboard/inventory`, `Frontend/dashboard/expenses`, `Frontend/dashboard/contributions`
- **Sub-capa Backend:** `Backend/payment`, `Backend/contribution`, `Backend/users`, `Backend/patients`, `Backend/main-patient`, `Backend/dashboard`, `Backend/db`, `Backend/profile`, `Backend/proxy`
- **Servicios:** `services/contribution`, `services/inventory` (etc.)
- **Otros:** `UI/inputs`, `UI/Modal`, `dashboard/toolbar`, `schema/patient`, `components/home/table/UserTable`

Si el cambio toca una capa completa sin feature concreta, basta solo la capa: `refactor(Backend): proteger propiedades controladas por servidor`.

## Ejemplos reales del historial

```
feact(Frontend/dashboard/expenses): agregar gestion de gastos
refactor(Backend): proteger propiedades controladas por servidor
fix(eslint): configurar elint para eliminar imports inecesarios
chore(package): agregar libreria "tailwind-merge"
feact(Frontend/home): usar estado de "main-patient", para rellenar y actualizar el stat "persona al cuidado"
refactor(services/contribution): cambiar atributo "message" en la respuesta de axios por "error"
style(UI/Modal): agregar tamaño maximo y tamaño por defecto
chore(tanstackquery/update dependencies): instalar tanstack/react-query y tanstack/react-query-devtools, actualizar algunas librerias
```

> Nota: los ejemplos conservan `feact` porque asi quedo registrado en el historial. Los commits nuevos se escriben con `feat`.

## Como agrupar los cambios en commits

1. **Instalaciones de dependencias van solas**, en `chore(package): agregar libreria(s) "nombre"`, y SIEMPRE antes que los commits que las usan. Ejemplo real: `d8759f6` instala tanstack en `chore(tanstackquery/update dependencies)` y luego el uso llega en commits `feat`/`refactor` posteriores.
2. **Un commit por unidad logica**: componente nuevo, feature por capa, o refactor por scope.
3. **Backend antes que Frontend** cuando hay contrato de API: primero `feat(Backend/inventory): ...` (rutas + modelo) y luego `feat(Frontend/dashboard/inventory): ...` (hooks, servicios y componentes).
4. Separar un cambio de backend puro (`api/`, `models/`, `database/`) de uno de frontend (`components/`, `app/(home)/`, `hooks/tanstack/query/`).
5. Cuando un scope agrupa front+backend a la vez, indicarlo en el scope (ej. `feat(next/config)` para config de imagenes, `chore(tanstackquery/update dependencies)`).

## Reglas obligatorias del proyecto

- **Sin `console.log()` en lo que se commitea.** Historico: `refactor(Frontend/dashboard): quitar "console.log()" de "components/dashboard/users/AddContributionDialog"`. Revisa el `git diff` antes de commitear y eliminalos.
- **Stage solo los archivos intencionales.** Valida con `git status` y `git diff --stat` antes; no uses `git add -A` a ciegas si hay cambios ajenos.
- **Los archivos eliminados se incluyen** en el commit de su feature (ej. `InventoryToolbar.jsx` se borro dentro de `feat(Frontend/dashboard/inventory)`).
- El autor y branch de trabajo habitual: David Sliren, branch `feat` (renombrada desde el typo historico `feact`).
- Despues de commitear puede cambiar a `fix` para las correcciones de esa feature o quedarse (seguir el historiali). No hacer amend de commits ya hechos; crear commits nuevos.

## Verificacion

- Tras commitear, confirma con `git status` que el working tree queda limpio y `git log --oneline -N` muestra los mensajes con el formato correcto.
- Ejecuta `npm run lint` sobre los archivos tocados si el linter ya tenia errores previos no relacionados, no los arregles salvo que pidan.