# ESDIN Design System

Sistema de diseño para las herramientas web de **ESDIN** (Equipo de Soporte y Desarrollo en Inteligencia de Negocio, Servicio Murciano de Salud), basado en la **Identidad Corporativa de la CARM** (Decreto 30/2008).

Las páginas son HTML servido por **n8n** con datos de **PostgreSQL**.

## Contenido

| Ruta | Qué es |
|---|---|
| `design-system/esdin/MASTER.md` | Reglas: color, tipografía, componentes, accesibilidad, antipatrones y checklist |
| `design-system/esdin/pages/` | Reglas específicas por tipo de página (sobrescriben el MASTER) |
| `assets/esdin.css` | Hoja de estilos única (tokens + componentes), sin dependencias |
| `assets/esdin.js` | Utilidades: toasts, tablas ordenables, pestañas, validación, estados de carga, formato español |
| `assets/logo/` | Logos CARM (color y negativo, SVG) y SMS (PNG) |
| `ejemplos/index.html` | Catálogo con todos los componentes |
| `n8n/servir-recursos.md` | Cómo servir CSS, JS y logo desde n8n (webhooks o PostgreSQL) y plantilla mínima de página |
| `docs/identidad/` | Decreto y Manual de Identidad Corporativa CARM |
| `.claude/skills/` | Skill UI UX Pro Max (MIT) para Claude Code |

## Colores corporativos

| | Hex | Pantone |
|---|---|---|
| Rojo | `#9D2235` | 201 C |
| Amarillo | `#FFB81C` | 1235 |
| Gris | `#707372` | 424 |

## Ver el catálogo

Abre `ejemplos/index.html` en el navegador (usa rutas relativas a `assets/`).

## Versionado

`esdin.css` y `esdin.js` llevan versión en la cabecera. Al publicar una nueva, súbela también en el parámetro `?v=` de las páginas.
