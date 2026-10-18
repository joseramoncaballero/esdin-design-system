# esdin-design-system

Sistema de diseño de las páginas HTML de ESDIN (Servicio Murciano de Salud), servidas por **n8n + PostgreSQL**. No se usa WordPress.

## Antes de crear o tocar cualquier página

1. Lee `design-system/esdin/MASTER.md` completo.
2. Si existe `design-system/esdin/pages/<tipo-de-pagina>.md`, sus reglas prevalecen sobre el MASTER.
3. Usa las clases y variables de `assets/esdin.css` y la API `window.EsdinUI` de `assets/esdin.js`. Mira `ejemplos/index.html` como referencia de marcado.
4. Sigue el checklist final del MASTER antes de dar una página por terminada.

## Reglas que no se negocian

- Colores corporativos: rojo `#9D2235`, amarillo `#FFB81C`, gris `#707372`. No usar otros valores ni paletas sugeridas por skills.
- El logo CARM se usa solo desde `assets/logo/`, sin modificarlo. Nunca dibujarlo ni generarlo.
- Nada de recursos externos (CDNs, Google Fonts, Tailwind por CDN). Todo se sirve desde n8n (`n8n/servir-recursos.md`).
- Accesibilidad WCAG 2.1 AA obligatoria (sector público).

## Skill ui-ux-pro-max

Está en `.claude/skills/ui-ux-pro-max`. Úsala para consultar buenas prácticas (`--domain ux`, `--domain chart`), **no** para elegir colores ni tipografías. Ejemplo:

```
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "form validation error summary" --domain ux
```

## Documentación de identidad

`docs/identidad/` contiene el Decreto 30/2008 y el Manual de Identidad Corporativa de la CARM.
