# Logotipos

| Fichero | Origen | Uso |
|---|---|---|
| `logo-carm-salud.png` | PNG facilitado por ESDIN (`original/logo-carm-salud-original.png`): versión bandera izquierda "Región de Murcia / Consejería de Salud". Colores de los píxeles ajustados a los Pantone oficiales, sin otros cambios | **Logo de cabecera** de todas las páginas |
| `logo-carm.svg` | (Alternativa genérica) Manual de Identidad Corporativa CARM en SVG (`docs/identidad/manual-identidad-corporativa-carm.svg`), grupo `g12376`: versión principal horizontal con símbolo centrado, en color | Cabecera blanca de todas las páginas |
| `logo-carm-negativo.svg` | Mismo manual, grupo `g7364`: versión en negativo | Solo sobre fondo rojo corporativo `#9D2235` |
| `logo-sms.png` | JPG facilitado por ESDIN (`original/logo-sms-original.jpg`), recortado de márgenes blancos | Siempre junto al de la CARM, a su derecha y nunca más grande |

## Cómo se han obtenido los SVG de la CARM

Se han copiado los trazados originales del manual **sin modificar la geometría**. El manual en SVG usa rellenos aproximados (`#8B2638`, `#FCB715`, `#6F7170`); se han sustituido por los equivalentes en pantalla de los Pantone oficiales:

- `#8B2638` → `#9D2235` (Pantone 201 C)
- `#FCB715` → `#FFB81C` (Pantone 1235)
- `#6F7170` → `#707372` (Pantone 424)

## Normas (Decreto 30/2008)

- No redibujar, recolorear (salvo lo anterior), recortar, deformar ni añadir elementos (art. 2.2 y 3.2).
- El SMS no puede usar el escudo ni sus elementos dentro de su propia imagen (art. 3.4).
- Altura mínima del logo CARM en pantalla: 48 px.
- Texto alternativo: `alt="Región de Murcia"` y `alt="Servicio Murciano de Salud"`.

## Pendiente

`logo-carm-salud.png` es un mapa de bits pequeño (271×135 px). Si existe una versión vectorial oficial de "Región de Murcia / Consejería de Salud", conviene sustituirlo.

El logo del SMS solo existe en JPG de 300×300 px. Si Comunicación del SMS dispone de una versión vectorial (SVG, EPS, AI o PDF), conviene sustituir `logo-sms.png` por ella.
