# Override: paneles de indicadores (dashboards)

Aplica a cualquier página cuyo propósito principal sea consultar indicadores. Solo recoge lo que cambia respecto a `MASTER.md`.

- Estilo de referencia: **Data-Dense Dashboard** (ui-ux-pro-max). Máxima densidad legible, sin decoración.
- Orden fijo: título → filtros (`.esdin-filtros`) → fila de KPIs (`.esdin-rejilla--kpi`, 3 a 6 tarjetas) → gráficos (`.esdin-rejilla--2`) → tabla de detalle.
- Indica siempre la **fecha y hora de la última actualización** de los datos (alerta `--info` o texto bajo el título).
- KPI: etiqueta + cifra + comparación con texto ("vs. mes anterior", "vs. objetivo"). Verde/rojo solo como refuerzo de la flecha y el texto.
- Una tarjeta de KPI con borde amarillo (`.esdin-kpi--acento`) como máximo, para el indicador que requiere atención.
- Tablas en `.esdin-tabla--compacta` cuando haya más de 8 columnas.
- Cada gráfico tiene `role="img"` con `<desc>` que enumera los datos, o una tabla equivalente visible o enlazada.
- Los filtros aplicados se reflejan en la URL (`?area=I&desde=2026-09-01`) para poder compartir la vista.
