# Servir `esdin.css`, `esdin.js` y el logo desde n8n

Todas las páginas cargan los recursos comunes desde n8n, nunca desde Internet. Así se cambia el diseño de todo el ecosistema tocando un solo sitio.

## En producción: workflow «ESDIN · Recursos» (22/10/2026)

Variante de la opción A con un solo webhook y el nombre en la consulta. Los ficheros van en base64 dentro del nodo de código; para actualizarlos se importa la versión siguiente del workflow y se sube `?v=` en las páginas.

| Recurso | URL |
|---|---|
| `esdin.css` | `/webhook/esdin?r=esdin.css&v=1.1.0` |
| `esdin.js` | `/webhook/esdin?r=esdin.js&v=1.1.0` |
| Logos | `/webhook/esdin?r=logo-sms.png`, `logo-carm-salud.png`, `logo-carm.svg`, `logo-carm-negativo.svg` |

Las herramientas servidas por HER (`/webhook/herramientas?h=…`) llevan además, antes de `esdin.css`, un bloque de respaldo con los tokens, la cabecera y el pie, por si se abren desde un fichero.

## Opción A — Un workflow "Recursos ESDIN" con webhooks GET (recomendada)

Un workflow con un webhook por recurso:

| Método | Ruta del webhook | Devuelve | `Content-Type` |
|---|---|---|---|
| GET | `esdin/esdin.css` | contenido de `assets/esdin.css` | `text/css; charset=utf-8` |
| GET | `esdin/esdin.js` | contenido de `assets/esdin.js` | `application/javascript; charset=utf-8` |
| GET | `esdin/logo-carm-salud.png` | logo CARM con Consejería de Salud (cabecera) | `image/png` |
| GET | `esdin/logo-carm.svg` | logo CARM genérico en color (alternativa) | `image/svg+xml` |
| GET | `esdin/logo-carm-negativo.svg` | logo CARM en negativo (solo sobre fondo rojo) | `image/svg+xml` |
| GET | `esdin/logo-sms.png` | logo SMS | `image/png` |

Para los PNG, en el *Respond to Webhook* elige *Respond With → Binary File* (léelo antes con *Read/Write Files from Disk* o guárdalo como base64 en PostgreSQL y conviértelo con *Convert to File*).

Cada rama:

1. **Webhook** — HTTP Method `GET`, Path `esdin/esdin.css`, Respond `Using 'Respond to Webhook' Node`.
2. **Respond to Webhook** — Respond With `Text`, cuerpo = contenido del fichero, y en *Options → Response Headers*:
   - `Content-Type: text/css; charset=utf-8`
   - `Cache-Control: public, max-age=3600`

En las páginas:

```html
<link rel="stylesheet" href="/webhook/esdin/esdin.css?v=1.0.0">
<script src="/webhook/esdin/esdin.js?v=1.0.0" defer></script>
<img src="/webhook/esdin/logo-carm-salud.png" alt="Región de Murcia, Consejería de Salud">
<img src="/webhook/esdin/logo-sms.png" alt="Servicio Murciano de Salud">
```

> El parámetro `?v=` fuerza la recarga cuando subas una versión nueva. Súbelo cada vez que cambie el fichero.

## Opción B — Guardar los recursos en PostgreSQL (`esdin_util`)

Útil si quieres versionado e historial dentro de la propia base de datos.

```sql
CREATE TABLE IF NOT EXISTS esdin_util.recursos_ui (
  nombre        text        NOT NULL,          -- 'esdin.css', 'esdin.js', 'logo-carm-salud.png'
  version       text        NOT NULL,          -- '1.0.0'
  content_type  text        NOT NULL,
  contenido     text        NOT NULL,          -- texto o base64 para binarios (PNG)
  activo        boolean     NOT NULL DEFAULT false,
  creado_en     timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (nombre, version)
);

-- Solo una versión activa por recurso
CREATE UNIQUE INDEX IF NOT EXISTS recursos_ui_activo
  ON esdin_util.recursos_ui (nombre) WHERE activo;
```

Workflow: **Webhook** `GET esdin/:recurso` → **Postgres** (`SELECT content_type, contenido FROM esdin_util.recursos_ui WHERE nombre = $1 AND activo`) → **Respond to Webhook** con el `Content-Type` de la fila. Si no hay fila, responde 404.

Publicar una versión nueva = insertar la fila y, en la misma transacción, desactivar la anterior y activar la nueva.

## Plantilla mínima de página

```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Nombre de la herramienta · ESDIN</title>
  <link rel="stylesheet" href="/webhook/esdin?r=esdin.css&amp;v=1.1.0">
  <script src="/webhook/esdin?r=esdin.js&amp;v=1.1.0" defer></script>
</head>
<body>
  <a class="esdin-saltar" href="#contenido">Saltar al contenido</a>
  <header class="esdin-cabecera">
    <div class="esdin-cabecera__interior">
      <span class="esdin-cabecera__logo esdin-cabecera__logo--sms"><img src="/webhook/esdin?r=logo-sms.png" alt="Servicio Murciano de Salud"></span>
      <div class="esdin-cabecera__app">
        <span class="esdin-cabecera__nombre">Nombre de la herramienta</span>
        <span class="esdin-cabecera__unidad">ESDIN · Servicio Murciano de Salud</span>
      </div>
      <a class="esdin-cabecera__logo esdin-cabecera__logo--carm" href="/"><img src="/webhook/esdin?r=logo-carm-salud.png" alt="Región de Murcia, Consejería de Salud. Inicio"></a>
      <div class="esdin-cabecera__usuario"></div>
    </div>
  </header>
  <main id="contenido" class="esdin-principal">
    <h1 class="esdin-titulo">Título de la página</h1>
    <p class="esdin-descripcion">Qué permite hacer esta página, en una frase.</p>
    <div id="datos"></div>
  </main>
  <footer class="esdin-pie"><div class="esdin-pie__interior"><span>ESDIN · Servicio Murciano de Salud</span></div></footer>
  <script>
    document.addEventListener('DOMContentLoaded', async function () {
      const datos = await EsdinUI.cargar('/webhook/mi-endpoint', document.getElementById('datos'));
      if (!datos || !datos.length) return; // EsdinUI ya ha pintado vacío o error
      // pintar tabla con EsdinUI.escapar() en cada valor y luego EsdinUI.iniciar()
    });
  </script>
</body>
</html>
```

## Seguridad

- Escapa siempre los datos que vengan de PostgreSQL antes de insertarlos en el HTML (`EsdinUI.escapar()` o `textContent`).
- Los webhooks de datos deben comprobar la autenticación (cabecera o sesión) en n8n; los de recursos estáticos pueden ser públicos.
- Nunca pongas credenciales, cadenas de conexión ni SQL en el HTML.
