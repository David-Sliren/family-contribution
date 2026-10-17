# Cómo preparar commits

Los commits del proyecto siguen una convención propia. Antes de preparar ninguno, **lee la skill [`skills/git-commit-convention/SKILL.md`](../../skills/git-commit-convention/SKILL.md)** (en OpenCode: skill `git-commit-convention`); este how-to es solo su resumen operativo.

## 1. Formato del mensaje

```text
tipo(scope): descripcion
```

- Todo en **minúsculas**, sin títulos ni punto final; descripción en español con **verbo en infinitivo** (`agregar`, `crear`, `mejorar`, `quitar`...).
- Tipos: `feat`, `fix`, `refactor`, `style`, `chore`, `docs` (no inventes tipos nuevos).
- Scopes por capa o feature: `Backend/patients`, `Frontend/dashboard/inventory`, `services/contribution`, `schema/patient`, `env`, `package`...

Ejemplos reales:

```text
feat(Backend/patients): agregar campos "tel" y "keyT" requeridos al paciente
fix(eslint): configurar eslint para eliminar imports innecesarios
docs(AGENTS): documentar verificacion de correo obligatoria
```

## 2. Cómo agrupar

1. Una unidad lógica por commit (una feature por capa, un refactor por scope).
2. **Backend antes que Frontend** cuando hay contrato de API.
3. Las instalaciones van solas en `chore(package): agregar libreria "x"` y **antes** de los commits que la usan.
4. Los archivos borrados se incluyen en el commit de su feature.

## 3. Reglas obligatorias

- **Sin `console.log`** en lo que se commitea (revisa el diff).
- **Stage solo archivos intencionales**: valida con `git status` y `git diff --stat`; nunca `git add -A` a ciegas.
- Sin acentos en los mensajes (el histórico está escrito así).
- No hagas amend de commits ya hechos; crea commits nuevos.

## 4. Verificación final

```bash
git status            # árbol limpio tras commitear
git log --oneline -5  # mensajes con el formato correcto
pnpm lint             # sobre los archivos tocados
```

Rama de trabajo habitual: `feat`.
