# Sistema de diseño ESDIN — MASTER

Fuente única de verdad para todas las páginas HTML de ESDIN (Servicio Murciano de Salud) servidas a través de **n8n + PostgreSQL**.

Antes de generar o modificar cualquier página:

1. Lee este fichero entero.
2. Comprueba si existe `design-system/esdin/pages/<nombre-de-pagina>.md`. Si existe, sus reglas **prevalecen** sobre este fichero; si no, aplica solo este.
3. Usa las clases y variables de `assets/esdin.css` (y `assets/esdin.js` si hace falta interacción). No inventes colores, tipografías ni componentes nuevos sin añadirlos aquí primero.

La skill `ui-ux-pro-max` sirve para consultar buenas prácticas (dominios `ux`, `chart`, `stack html-tailwind`), pero **sus paletas y tipografías no se usan**: aquí mandan la identidad CARM y este documento.

---

## 1. Marco normativo

- **Decreto 30/2008, de 14 de marzo** (BORM n.º 67, 22/03/2008): aprueba la Identidad Corporativa del Gobierno y la Administración Pública de la CARM y su Manual. Copia en `docs/identidad/`.
- **Manual de Identidad Corporativa CARM**: símbolo, colores, tipografía y composiciones. Copia en `docs/identidad/`.

Reglas que se derivan y afectan a estas páginas:

- El **símbolo** (versión simplificada del Escudo Regional) y el **logotipo** ("Región de Murcia") se usan **siempre juntos** y **sin alterarlos** (art. 2.2 y 3.2). Nunca se redibujan, recolorean, recortan, deforman ni se les añaden elementos.
- Los organismos y entes de derecho público (como el SMS) pueden tener imagen propia, pero **acompañada** del símbolo y logotipo CARM, y **no pueden usar el escudo ni sus elementos** dentro de su propia imagen (art. 3.3 y 3.4).
- El logo se inserta **solo desde los ficheros de `assets/logo/`**. Nunca se genera con CSS, SVG dibujado a mano ni IA.
- Tamaño mínimo del símbolo: **caja de 10 mm** (≈ 38 px a 96 dpi). En pantalla, el logo CARM nunca por debajo de **48 px de alto** (por debajo, el texto deja de leerse).
- En la cabecera van **los dos logos** (decisión de ESDIN, 22/10/2026): el del **SMS a la izquierda**, el **nombre de la herramienta en el centro** y el de la **CARM con la Consejería de Salud** (`logo-carm-salud.png`) **a la derecha**. El Decreto no fija el lado, pero sí la **prevalencia** de la imagen de la CARM (art. 3.3): por eso el escudo es siempre el más grande (72 px de alto frente a 56 px del SMS; 56 y 44 px en móvil). El del SMS nunca más grande que el de la CARM.

Ficheros disponibles:

| Fichero | Qué es |
|---|---|
| `logo-carm-salud.png` | **Logo de cabecera.** Versión "bandera izquierda" con "Región de Murcia / Consejería de Salud". PNG con transparencia (271×135 px) facilitado por ESDIN, con los colores ajustados a los Pantone oficiales. Se muestra a 72 px de alto (56 px en móvil); no ampliarlo por encima de su tamaño original (135 px). |
| `logo-carm.svg` | Alternativa genérica: versión principal "horizontal con símbolo centrado", en color. Extraída del Manual en SVG sin tocar la geometría; solo se han ajustado los rellenos a los equivalentes en pantalla de los Pantone oficiales. |
| `logo-carm-negativo.svg` | La misma versión en negativo. **Solo** sobre fondo rojo corporativo. |
| `logo-sms.png` | Logotipo del SMS (rasterizado, recortado de márgenes desde el JPG original). Resolución limitada: no usar por encima de ~64 px de alto. |

---

## 2. Color

### 2.1 Colores corporativos (valores oficiales para pantalla)

| Token | Hex | Referencia | Uso |
|---|---|---|---|
| `--esdin-rojo` | `#9D2235` | Pantone 201 C | Color predominante. Cabecera, acciones primarias, enlaces, elementos de marca. |
| `--esdin-amarillo` | `#FFB81C` | Pantone 1235 | Acento. Destacados, indicadores, borde activo, gráficos. **Nunca como color de texto sobre blanco.** |
| `--esdin-gris` | `#707372` | Pantone 424 | Texto secundario, iconos, bordes fuertes, datos de referencia. |

> Estos hex son los definidos por ESDIN. **No uses los valores de cuatricromía del manual** para pantalla.

### 2.2 Contraste (WCAG 2.2) — cálculos reales

| Combinación | Ratio | Veredicto |
|---|---|---|
| Rojo `#9D2235` sobre blanco | 7.74 | AAA. Texto y botones OK. |
| Blanco sobre rojo | 7.74 | AAA. Texto en cabecera y botón primario OK. |
| Gris `#707372` sobre blanco | 4.79 | AA justo. Solo texto secundario sobre **fondo blanco**. |
| Gris `#707372` sobre `--esdin-gris-50` | 4.35 | **No pasa.** Sobre fondos tintados usa `--esdin-gris-700`. |
| Amarillo `#FFB81C` sobre blanco | 1.73 | **Prohibido** para texto, iconos sueltos o bordes de foco. |
| Texto `#1F2124` sobre amarillo | 9.32 | OK. El amarillo como fondo siempre lleva texto oscuro. |
| Rojo sobre amarillo | 4.47 | No pasa para texto normal. Evitar. |

### 2.3 Escala derivada (no corporativa, solo para UI)

Tintes y sombras calculados mezclando los corporativos con blanco/negro. Sirven para fondos, hover y estados; **nunca sustituyen** al color corporativo en elementos de marca.

| Token | Hex | Uso |
|---|---|---|
| `--esdin-rojo-50` | `#F7EDEF` | Fondo de fila seleccionada, fondo de aviso de marca |
| `--esdin-rojo-100` | `#F0DEE1` | Hover suave sobre elementos rojos claros |
| `--esdin-rojo-700` | `#7E1B2A` | Hover de botón primario |
| `--esdin-rojo-800` | `#5E1420` | Pulsado (`:active`) |
| `--esdin-amarillo-50` | `#FFF9ED` | Fondo de destacado |
| `--esdin-amarillo-100` | `#FFF4DD` | Fondo de aviso |
| `--esdin-amarillo-800` | `#996E11` | Único tono de amarillo admisible como texto/icono sobre blanco (4.57) |
| `--esdin-gris-50` | `#F4F4F4` | Fondo de página, cabecera de tabla |
| `--esdin-gris-100` | `#EAEAEA` | Filas alternas, separadores |
| `--esdin-gris-200` | `#D4D5D5` | Bordes de inputs y tarjetas |
| `--esdin-gris-700` | `#5A5C5B` | Texto secundario sobre fondos tintados (6.74) |
| `--esdin-gris-800` | `#434544` | Texto de etiquetas fuertes |
| `--esdin-texto` | `#1F2124` | Texto principal (16.14 sobre blanco) |

### 2.4 Colores de estado

Como el color de marca es **rojo**, un error no puede comunicarse solo con color: se confundiría con la marca. Todo estado lleva **icono + texto + color**.

| Token | Hex | Contraste s/ blanco | Uso |
|---|---|---|---|
| `--esdin-ok` | `#1E6B3A` | 6.52 | Éxito, completado, activo |
| `--esdin-error` | `#B42318` | 6.57 | Error, rechazado, fallo (más anaranjado que la marca, para diferenciarlo) |
| `--esdin-aviso` | `#8A5A00` | 5.93 | Aviso, pendiente (texto). Fondo: `--esdin-amarillo-100` |
| `--esdin-info` | `#1D5A96` | 7.11 | Información neutra |

### 2.5 Gráficos

Orden de series categóricas: rojo `#9D2235` → gris `#707372` → amarillo `#FFB81C` → `#1D5A96` → `#5E1420` → `#C9CCCB`. Máximo 6 series; si hay más, agrupa en "Otros".

- Siempre con leyenda en texto y etiquetas directas cuando quepan. El color nunca es el único canal.
- KPI frente a objetivo: **bullet chart** (rejilla de 3 a 10). Evolución temporal: **línea**. Comparar categorías: **barras horizontales** ordenadas.
- Cada gráfico tiene al lado o debajo su **tabla de datos** (o un enlace a ella) como alternativa accesible.
- Librerías: servidas por n8n o incrustadas. Nunca desde CDN externo.

---

## 3. Tipografía

El manual fija la familia **Frutiger** (Bold 65 para "Región de Murcia", Light 45 para Consejerías y Direcciones Generales). Frutiger es de pago y no está en los equipos por defecto, así que en web se usa una **pila de fuentes del sistema humanistas** de aspecto equivalente, sin descargas externas:

```css
--esdin-fuente: "Frutiger", "Frutiger LT Std", "Segoe UI", "Myriad Pro", Calibri, "Helvetica Neue", Arial, sans-serif;
--esdin-fuente-mono: Consolas, "Cascadia Mono", "SF Mono", Menlo, monospace;
```

- Si algún día ESDIN dispone de la licencia web de Frutiger, se añade con `@font-face` desde n8n y esta pila sigue funcionando.
- **Nunca** Google Fonts ni otra fuente remota.

| Token | Tamaño | Peso | Uso |
|---|---|---|---|
| `--esdin-t-xs` | 12px | 400 | Notas al pie, metadatos |
| `--esdin-t-sm` | 14px | 400 | Tablas, etiquetas, ayuda de campos |
| `--esdin-t-base` | 16px | 400 | Texto general (nunca menos en párrafos) |
| `--esdin-t-lg` | 18px | 600 | Título de tarjeta |
| `--esdin-t-xl` | 22px | 600 | Título de sección |
| `--esdin-t-2xl` | 28px | 700 | Título de página |
| `--esdin-t-kpi` | 32px | 700 | Cifra de KPI (con `font-variant-numeric: tabular-nums`) |

- Interlineado: 1.5 en texto, 1.25 en títulos.
- Cifras en tablas y KPIs: `tabular-nums` y alineadas a la derecha.
- Formato numérico español: `1.234,56`, fechas `dd/mm/aaaa`, horas `HH:mm`. Usa `Intl.NumberFormat('es-ES')` y `Intl.DateTimeFormat('es-ES')`.

---

## 4. Espaciado, forma y elevación

- Escala base 4px: `--esdin-e-1` 4px · `-2` 8px · `-3` 12px · `-4` 16px · `-5` 24px · `-6` 32px · `-7` 48px.
- Radios: `--esdin-radio-sm` 4px (inputs, botones, badges) · `--esdin-radio` 8px (tarjetas, modales). Nada de formas muy redondeadas: es una herramienta institucional.
- Sombras: solo `--esdin-sombra-1` (tarjetas) y `--esdin-sombra-2` (menús, modales, toasts). Sin glassmorphism, neumorfismo ni degradados decorativos.
- Ancho máximo de contenido: 1440px. Formularios: 720px.

### 4.1 Movimiento

Antes de animar algo, la pregunta es: **¿esto debería animarse siquiera?** En una herramienta de trabajo que se usa muchas veces al día, la respuesta casi siempre es no.

- **Solo se anima para dar respuesta a una acción o mostrar un cambio de estado**: hover y pulsación de botones, aparición de un aviso, apertura de un menú, carga de datos. Nunca para decorar.
- **Duración máxima 200 ms**, con `ease-out` (rápido al empezar, frena al final). Token: `--esdin-transicion` (150 ms). Las salidas, más cortas que las entradas.
- **Solo se animan `opacity`, `transform`, colores y bordes.** Nunca `width`, `height`, `top` ni `margin` (provocan saltos y van lentas en equipos antiguos).
- **Sin animaciones en bucle** salvo el indicador de carga (`.esdin-cargando`). Sin animaciones al hacer scroll, ni efectos de "levitar", latir o agrandarse al pasar el ratón.
- **Nada se mueve solo**: ni carruseles automáticos ni contadores que suben al cargar la página. Las cifras aparecen con su valor final.
- **Siempre se desactiva con `prefers-reduced-motion`.** `esdin.css` ya lo hace de forma global; no lo anules en una página.
- La interfaz debe ser **igual de comprensible sin ninguna animación**: el estado final (abierto, guardado, error) se comunica con texto, icono y color, no con el movimiento.

---

## 5. Estructura de página

```
┌──────────────────────────────────────────────────────────────┐
│ .esdin-cabecera  (blanco, borde inferior rojo 4px)           │
│  [logo SMS]       Nombre de la herramienta      [logo CARM]  │
│                                  usuario · sesión · Salir    │
├──────────────────────────────────────────────────────────────┤
│ .esdin-migas  Inicio › Sección › Página                      │
├──────────────────────────────────────────────────────────────┤
│ .esdin-principal                                             │
│   h1.esdin-titulo + descripción breve                        │
│   [barra de filtros]                                         │
│   [fila de KPIs]                                             │
│   [contenido: tabla / gráfico / formulario]                  │
├──────────────────────────────────────────────────────────────┤
│ .esdin-pie  ESDIN · Servicio Murciano de Salud · versión     │
└──────────────────────────────────────────────────────────────┘
```

- La cabecera va en **blanco** con el logo oficial a color y una franja roja inferior. Así el logo se ve en su versión positiva principal y no hace falta la versión negativa.
- Si se usa cabecera en fondo rojo (versión negativa), **solo** con el fichero oficial negativo del logo.
- Enlace "Saltar al contenido" como primer elemento enfocable.
- `<html lang="es">`, un único `<h1>` por página, jerarquía de encabezados sin saltos.

---

## 6. Componentes (clases en `assets/esdin.css`)

| Componente | Clase | Reglas clave |
|---|---|---|
| Botón primario | `.esdin-btn .esdin-btn--primario` | Rojo con texto blanco. Un solo primario por vista. |
| Botón secundario | `.esdin-btn .esdin-btn--secundario` | Borde rojo, fondo blanco. |
| Botón discreto | `.esdin-btn .esdin-btn--discreto` | Texto gris, sin borde. Para "Cancelar", "Limpiar". |
| Botón peligro | `.esdin-btn .esdin-btn--peligro` | Para borrar. Siempre con confirmación. |
| Campo | `.esdin-campo` (+ `label`, `input/select/textarea`, `.esdin-ayuda`, `.esdin-campo__error`) | Etiqueta visible siempre (nunca solo placeholder). Error debajo del campo con `aria-describedby`. |
| Resumen de errores | `.esdin-resumen-errores` | Arriba del formulario, `role="alert"`, `tabindex="-1"`, enlaces a cada campo; el foco va aquí tras un envío fallido. |
| Tabla | `.esdin-tabla-contenedor > table.esdin-tabla` | Contenedor con scroll horizontal. Cabecera fija. Números a la derecha. Ordenación con `aria-sort`. |
| Paginación | `.esdin-paginacion` | `nav` con `aria-label`, página actual con `aria-current="page"`. Muestra "1–25 de 312". |
| Tarjeta | `.esdin-tarjeta` | Contenedor genérico. |
| KPI | `.esdin-kpi` | Etiqueta, cifra, variación con icono ▲▼ y texto ("+4,2 % vs. mes anterior"). |
| Badge / estado | `.esdin-badge .esdin-badge--ok|error|aviso|info|neutro` | Siempre con texto; el color es secundario. |
| Alerta | `.esdin-alerta .esdin-alerta--ok|error|aviso|info` | Con icono y título. `role="status"` o `role="alert"` según urgencia. |
| Toast | `.esdin-toasts` + `EsdinUI.toast()` | Solo confirmaciones breves. Nunca para errores que el usuario deba corregir (eso va en el formulario). |
| Filtros | `.esdin-filtros` | Barra horizontal con campos compactos y botones "Aplicar" / "Limpiar". |
| Pestañas | `.esdin-pestanas` | Patrón ARIA tabs (`role="tablist"`, flechas de teclado). |

---

## 7. Accesibilidad (obligatoria)

La normativa de accesibilidad web del sector público (RD 1112/2018, EN 301 549 / WCAG 2.1 AA) aplica a estas herramientas.

- Contraste de texto ≥ 4.5:1, componentes y foco ≥ 3:1.
- Foco visible en todo: `outline: 3px solid var(--esdin-rojo)` con `outline-offset: 2px`. Nunca `outline: none` sin sustituto.
- Todo funciona con teclado. Áreas táctiles ≥ 44×44 px en móvil.
- Respetar `prefers-reduced-motion` (sin animaciones) y zoom al 200 % sin pérdida de contenido.
- Iconos: SVG en línea con `aria-hidden="true"` si son decorativos, o `aria-label` si son el único contenido de un botón. Sin emojis como iconos.
- Mensajes dinámicos (resultados de búsqueda, guardado) en regiones `aria-live="polite"`.

---

## 8. Reglas técnicas para páginas servidas por n8n

- Una página = un HTML que enlaza `esdin.css` y, si hace falta, `esdin.js`, **ambos servidos por n8n** (ver `n8n/servir-recursos.md`).
- **Prohibido** cargar nada de CDNs externos (Tailwind, Google Fonts, jsDelivr, unpkg…). La red corporativa puede bloquearlos y además filtran datos de navegación a terceros.
- Sin `localStorage` para datos de negocio; solo preferencias de interfaz (filtro recordado, columna ordenada).
- Los datos llegan por `fetch()` a webhooks de n8n que consultan PostgreSQL. Nunca incrustar credenciales ni SQL en el HTML.
- Estados obligatorios en toda vista con datos: **cargando** (`.esdin-cargando`), **vacío** (`.esdin-vacio`, con texto que explique qué hacer) y **error** (`.esdin-alerta--error` con opción de reintentar).
- Responsive: 375 · 768 · 1024 · 1440 px. Las tablas anchas hacen scroll horizontal dentro de su contenedor; nunca rompen la página.

---

## 9. Antipatrones (no hacer)

- Recolorear, redibujar o "modernizar" el escudo o el logotipo.
- Usar el amarillo como texto, como color de foco o en bordes finos sobre blanco.
- Degradados, glassmorphism, neón, sombras grandes, animaciones decorativas.
- Animaciones de más de 200 ms, en bucle (salvo el indicador de carga), ligadas al scroll o que se disparan solas.
- Morados/rosas "estilo IA", paletas ajenas a la CARM.
- Placeholder como única etiqueta de un campo.
- Errores comunicados solo con borde rojo.
- Toasts para errores de validación.
- Tablas sin contenedor de scroll, cifras alineadas a la izquierda.
- Fuentes o librerías cargadas desde Internet.

---

## 10. Checklist antes de entregar una página

- [ ] Enlaza solo `esdin.css` / `esdin.js` servidos por n8n; sin recursos externos.
- [ ] Logos desde `assets/logo/`, sin modificar: SMS a la izquierda y CARM a la derecha, el de la CARM más grande y ≥ 48 px de alto.
- [ ] `lang="es"`, un `h1`, "Saltar al contenido".
- [ ] Contraste verificado; ningún texto amarillo sobre blanco.
- [ ] Foco visible y navegación completa con teclado.
- [ ] Estados cargando / vacío / error implementados.
- [ ] Números y fechas en formato español.
- [ ] Probado a 375, 768, 1024 y 1440 px y con zoom 200 %.
- [ ] `prefers-reduced-motion` respetado y ninguna animación de más de 200 ms ni en bucle (salvo el indicador de carga).

---

## 11. Guía de peticiones para agentes

Peticiones tipo para pedir una página nueva. Cópialas y rellena lo que va entre `< >`. Cada una indica qué estructura y qué componentes usar, para que el resultado salga coherente desde el primer intento.

### Panel de indicadores

> Crea un panel de indicadores para `<tema>` siguiendo `design-system/esdin/MASTER.md` y `pages/dashboard.md`. Datos desde el webhook `<GET /webhook/...>`, que devuelve `<estructura JSON>`. Filtros: `<área, rango de fechas…>`. KPIs: `<lista, con comparación y objetivo si lo hay>`. Gráficos: `<evolución temporal / reparto por categoría>`, cada uno con su tabla equivalente. Debajo, tabla de detalle ordenable con paginación. Incluye fecha de última actualización y estados de carga, vacío y error.

### Formulario de alta o solicitud

> Crea un formulario para `<qué se solicita>` siguiendo `MASTER.md`. Página con `.esdin-principal--form`. Campos: `<nombre, tipo, obligatorio, validación>`. Validación en cliente con `EsdinUI.mostrarErrores()` (resumen arriba y error en cada campo). Envío por `POST` a `<webhook>`; si va bien, alerta de confirmación en la página (no solo un toast) con el código asignado; si falla, alerta de error con opción de reintentar sin perder lo escrito.

### Listado con búsqueda y acciones

> Crea un listado de `<entidad>` siguiendo `MASTER.md`. Barra de filtros con búsqueda por texto y `<filtros>`, reflejados en la URL. Tabla con columnas `<lista>`, números alineados a la derecha, estado con `.esdin-badge`, ordenación y paginación ("1–25 de N"). Acciones por fila: `<ver, editar…>`; acciones masivas con casilla de selección y barra de acciones. Borrar siempre con confirmación.

### Ficha de detalle

> Crea la ficha de detalle de `<entidad>` siguiendo `MASTER.md`. Migas de pan hasta el listado. Cabecera con identificador, estado (`.esdin-badge`) y acciones principales. Datos agrupados en `.esdin-tarjeta` por bloques `<lista>`, con pestañas si hay más de tres bloques. Historial de cambios en tabla al final.

### Revisión de una página existente

> Revisa `<fichero o URL>` contra `MASTER.md` y su checklist. Enumera los incumplimientos por orden de gravedad (accesibilidad y marca primero) y corrígelos usando solo clases de `esdin.css`. No cambies el comportamiento ni las llamadas a webhooks.

### Reglas para quien redacta la petición

- Indica siempre **de dónde salen los datos** (webhook y forma del JSON). Si aún no existe, pide datos de ejemplo realistas y marcados como ficticios.
- Di **quién la usa** (personal interno, mandos, profesionales sanitarios) y **en qué dispositivo**.
- No pidas colores, fuentes ni estilos: ya están fijados aquí.
