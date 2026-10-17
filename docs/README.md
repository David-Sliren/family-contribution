# Documentación

La documentación del proyecto sigue el esquema [Diátaxis](https://diataxis.fr/): cuatro tipos de documento, cada uno con un propósito y un lector distintos. Elige la carpeta según lo que necesites:

| Tipo         | Carpeta                                | Propósito                                                                  |
| ------------ | -------------------------------------- | -------------------------------------------------------------------------- |
| Tutorial     | [`tutorials/`](tutorials/)             | Aprender haciendo: lecciones guiadas paso a paso desde cero.               |
| Cómo se hace | [`how-to/`](how-to/)                   | Recetas para completar una tarea concreta del proyecto.                    |
| Referencia   | [`reference/`](reference/)             | Descripción técnica exacta: API, modelos, entorno y comandos.              |
| Explicación  | [`explanation/`](explanation/)         | Contexto, razones y decisiones de diseño de la plataforma.                 |

## Documentos

### Tutoriales

- [Primeros pasos: levantar el proyecto en local](tutorials/primeros-pasos.md)

### Cómo se hace

- [Agregar un feature CRUD completo](how-to/agregar-un-feature-crud.md)
- [Agregar filtros y paginación al dashboard](how-to/filtros-y-paginacion.md)
- [Enviar un correo transaccional](how-to/enviar-un-correo-transaccional.md)
- [Probar la pasarela de Mercado Pago en local](how-to/probar-pasarela-en-local.md)
- [Preparar commits según la convención](how-to/preparar-commits.md)

### Referencia

- [API](reference/api.md)
- [Modelos de datos](reference/modelos.md)
- [Entorno y comandos](reference/entorno-y-comandos.md)

### Explicación

- [Autenticación y correos](explanation/autenticacion-y-correos.md)
- [Arquitectura y flujos](explanation/arquitectura.md)
- [Pagos con Mercado Pago](explanation/pagos.md)

## Otros recursos

- [`usuarios/`](usuarios/) — guiones de video para la familia (audiencia no técnica; usa `usuarios/PLANTILLA.md` para crear nuevos).
- [`../AGENTS.md`](../AGENTS.md) — convenciones del código para agentes y colaboradores.
- [`../DESIGN.md`](../DESIGN.md) — sistema de diseño (paleta M3, tokens y componentes).
- [`../skills/README.md`](../skills/README.md) — skills del proyecto (commits, paginación, plan empírico).
