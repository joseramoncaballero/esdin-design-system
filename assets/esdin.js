/*!
 * ESDIN Design System — esdin.js v1.0.0
 * Utilidades sin dependencias para páginas servidas por n8n.
 * Uso: <script src="/webhook/esdin/esdin.js" defer></script>
 * API global: window.EsdinUI
 */
(function () {
  'use strict';

  var fmtNumero = new Intl.NumberFormat('es-ES');
  var fmtFecha = new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  var fmtFechaHora = new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  function escapar(texto) {
    return String(texto == null ? '' : texto)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* ---------- Formato ---------- */
  var formato = {
    numero: function (n, decimales) {
      if (n == null || n === '' || isNaN(n)) return '—';
      if (decimales == null) return fmtNumero.format(n);
      return new Intl.NumberFormat('es-ES', { minimumFractionDigits: decimales, maximumFractionDigits: decimales }).format(n);
    },
    porcentaje: function (n, decimales) {
      if (n == null || isNaN(n)) return '—';
      return new Intl.NumberFormat('es-ES', { style: 'percent', maximumFractionDigits: decimales == null ? 1 : decimales }).format(n);
    },
    fecha: function (v) { if (!v) return '—'; var d = new Date(v); return isNaN(d) ? '—' : fmtFecha.format(d); },
    fechaHora: function (v) { if (!v) return '—'; var d = new Date(v); return isNaN(d) ? '—' : fmtFechaHora.format(d); }
  };

  /* ---------- Toasts ---------- */
  function contenedorToasts() {
    var c = document.querySelector('.esdin-toasts');
    if (!c) {
      c = document.createElement('div');
      c.className = 'esdin-toasts';
      c.setAttribute('role', 'status');
      c.setAttribute('aria-live', 'polite');
      document.body.appendChild(c);
    }
    return c;
  }

  /**
   * Muestra una confirmación breve. No usar para errores de validación.
   * @param {string} mensaje
   * @param {{tipo?: 'ok'|'error'|'info', duracion?: number}} [opciones]
   */
  function toast(mensaje, opciones) {
    opciones = opciones || {};
    var t = document.createElement('div');
    t.className = 'esdin-toast' + (opciones.tipo ? ' esdin-toast--' + opciones.tipo : '');
    t.innerHTML = '<span class="esdin-toast__texto"></span>' +
      '<button type="button" class="esdin-toast__cerrar" aria-label="Cerrar aviso">×</button>';
    t.querySelector('.esdin-toast__texto').textContent = mensaje;
    t.querySelector('button').addEventListener('click', function () { t.remove(); });
    contenedorToasts().appendChild(t);
    var duracion = opciones.duracion == null ? 5000 : opciones.duracion;
    if (duracion > 0) setTimeout(function () { if (t.isConnected) t.remove(); }, duracion);
    return t;
  }

  /* ---------- Tablas ordenables ---------- */
  function valorCelda(celda) {
    var v = celda.getAttribute('data-valor');
    if (v == null) v = celda.textContent.trim();
    var num = v.replace(/\./g, '').replace(',', '.').replace(/[%€\s]/g, '');
    if (num !== '' && !isNaN(num)) return parseFloat(num);
    var m = v.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
    if (m) return new Date(m[3] + '-' + m[2] + '-' + m[1]).getTime();
    return v.toLocaleLowerCase('es');
  }

  function ordenarTabla(tabla, indice, direccion) {
    var tbody = tabla.tBodies[0];
    if (!tbody) return;
    var filas = Array.prototype.slice.call(tbody.rows);
    filas.sort(function (a, b) {
      var va = valorCelda(a.cells[indice]);
      var vb = valorCelda(b.cells[indice]);
      if (va < vb) return direccion === 'ascending' ? -1 : 1;
      if (va > vb) return direccion === 'ascending' ? 1 : -1;
      return 0;
    });
    filas.forEach(function (f) { tbody.appendChild(f); });
  }

  /** Activa la ordenación en las <th> que contengan un <button class="esdin-ordenar">. */
  function iniciarTablas(raiz) {
    (raiz || document).querySelectorAll('table.esdin-tabla').forEach(function (tabla) {
      if (tabla.dataset.esdinIniciada) return;
      tabla.dataset.esdinIniciada = '1';
      var cabeceras = tabla.querySelectorAll('thead th');
      cabeceras.forEach(function (th, indice) {
        var boton = th.querySelector('.esdin-ordenar');
        if (!boton) return;
        boton.addEventListener('click', function () {
          var nueva = th.getAttribute('aria-sort') === 'ascending' ? 'descending' : 'ascending';
          cabeceras.forEach(function (otra) { otra.removeAttribute('aria-sort'); });
          th.setAttribute('aria-sort', nueva);
          ordenarTabla(tabla, indice, nueva);
          anunciar('Tabla ordenada por ' + boton.textContent.trim() + ', ' + (nueva === 'ascending' ? 'ascendente' : 'descendente'));
        });
      });
    });
  }

  /* ---------- Pestañas (patrón ARIA) ---------- */
  function iniciarPestanas(raiz) {
    (raiz || document).querySelectorAll('.esdin-pestanas [role="tablist"]').forEach(function (lista) {
      if (lista.dataset.esdinIniciada) return;
      lista.dataset.esdinIniciada = '1';
      var tabs = Array.prototype.slice.call(lista.querySelectorAll('[role="tab"]'));
      function activar(tab, enfocar) {
        tabs.forEach(function (t) {
          var sel = t === tab;
          t.setAttribute('aria-selected', sel ? 'true' : 'false');
          t.tabIndex = sel ? 0 : -1;
          var panel = document.getElementById(t.getAttribute('aria-controls'));
          if (panel) panel.hidden = !sel;
        });
        if (enfocar) tab.focus();
      }
      tabs.forEach(function (tab, i) {
        tab.addEventListener('click', function () { activar(tab, false); });
        tab.addEventListener('keydown', function (e) {
          var destino = null;
          if (e.key === 'ArrowRight') destino = tabs[(i + 1) % tabs.length];
          if (e.key === 'ArrowLeft') destino = tabs[(i - 1 + tabs.length) % tabs.length];
          if (e.key === 'Home') destino = tabs[0];
          if (e.key === 'End') destino = tabs[tabs.length - 1];
          if (destino) { e.preventDefault(); activar(destino, true); }
        });
      });
      activar(tabs.filter(function (t) { return t.getAttribute('aria-selected') === 'true'; })[0] || tabs[0], false);
    });
  }

  /* ---------- Validación de formularios ---------- */
  /**
   * Muestra errores en línea y un resumen enfocable arriba del formulario.
   * @param {HTMLFormElement} form
   * @param {{campo: string, mensaje: string}[]} errores  campo = id del control
   */
  function mostrarErrores(form, errores) {
    limpiarErrores(form);
    if (!errores || !errores.length) return;
    var resumen = document.createElement('div');
    resumen.className = 'esdin-resumen-errores';
    resumen.setAttribute('role', 'alert');
    resumen.tabIndex = -1;
    resumen.innerHTML = '<h2>Revisa ' + (errores.length === 1 ? 'el siguiente dato' : 'los siguientes ' + errores.length + ' datos') + '</h2><ul></ul>';
    var ul = resumen.querySelector('ul');
    errores.forEach(function (err) {
      var control = document.getElementById(err.campo);
      var li = document.createElement('li');
      li.innerHTML = '<a href="#' + escapar(err.campo) + '"></a>';
      li.firstChild.textContent = err.mensaje;
      ul.appendChild(li);
      if (control) {
        control.setAttribute('aria-invalid', 'true');
        var campo = control.closest('.esdin-campo');
        if (campo) {
          campo.classList.add('esdin-campo--error');
          var msg = document.createElement('p');
          msg.className = 'esdin-campo__error';
          msg.id = err.campo + '-error';
          msg.textContent = err.mensaje;
          campo.appendChild(msg);
          var desc = (control.getAttribute('aria-describedby') || '').split(' ').filter(Boolean);
          desc.push(msg.id);
          control.setAttribute('aria-describedby', desc.join(' '));
        }
      }
    });
    form.insertBefore(resumen, form.firstChild);
    resumen.focus();
  }

  function limpiarErrores(form) {
    form.querySelectorAll('.esdin-resumen-errores').forEach(function (n) { n.remove(); });
    form.querySelectorAll('.esdin-campo__error').forEach(function (n) {
      var control = form.querySelector('[aria-describedby~="' + n.id + '"]');
      if (control) {
        var desc = control.getAttribute('aria-describedby').split(' ').filter(function (d) { return d !== n.id; });
        if (desc.length) control.setAttribute('aria-describedby', desc.join(' ')); else control.removeAttribute('aria-describedby');
        control.removeAttribute('aria-invalid');
      }
      n.remove();
    });
    form.querySelectorAll('.esdin-campo--error').forEach(function (n) { n.classList.remove('esdin-campo--error'); });
  }

  /* ---------- Estados de carga / vacío / error ---------- */
  /**
   * Pinta un estado en un contenedor.
   * @param {Element} el
   * @param {'cargando'|'vacio'|'error'} estado
   * @param {{titulo?: string, texto?: string, reintentar?: Function}} [opc]
   */
  function estado(el, tipo, opc) {
    opc = opc || {};
    if (tipo === 'cargando') {
      el.innerHTML = '<div class="esdin-cargando" role="status">' + escapar(opc.texto || 'Cargando datos…') + '</div>';
    } else if (tipo === 'vacio') {
      el.innerHTML = '<div class="esdin-vacio"><p class="esdin-vacio__titulo">' + escapar(opc.titulo || 'No hay resultados') + '</p><p>' +
        escapar(opc.texto || 'Prueba a cambiar o limpiar los filtros.') + '</p></div>';
    } else if (tipo === 'error') {
      el.innerHTML = '<div class="esdin-alerta esdin-alerta--error" role="alert">' + ICONOS.error +
        '<div><p class="esdin-alerta__titulo">' + escapar(opc.titulo || 'No se han podido cargar los datos') + '</p><p>' +
        escapar(opc.texto || 'Inténtalo de nuevo. Si el problema continúa, avisa a ESDIN.') + '</p>' +
        (opc.reintentar ? '<button type="button" class="esdin-btn esdin-btn--secundario esdin-btn--pequeno">Reintentar</button>' : '') +
        '</div></div>';
      if (opc.reintentar) el.querySelector('button').addEventListener('click', opc.reintentar);
    }
  }

  /**
   * fetch() con gestión de estados. Devuelve los datos JSON o null si falla.
   * @param {string} url  webhook de n8n
   * @param {Element} contenedor  donde pintar cargando/vacío/error
   * @param {RequestInit} [init]
   */
  function cargar(url, contenedor, init) {
    if (contenedor) estado(contenedor, 'cargando');
    return fetch(url, Object.assign({ headers: { Accept: 'application/json' }, credentials: 'same-origin' }, init || {}))
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (datos) {
        if (contenedor && (datos == null || (Array.isArray(datos) && !datos.length))) estado(contenedor, 'vacio');
        return datos;
      })
      .catch(function (e) {
        if (contenedor) estado(contenedor, 'error', { reintentar: function () { cargar(url, contenedor, init); } });
        console.error('[EsdinUI] Error al cargar', url, e);
        return null;
      });
  }

  /* ---------- Región viva para lectores de pantalla ---------- */
  function anunciar(texto) {
    var r = document.getElementById('esdin-anuncios');
    if (!r) {
      r = document.createElement('div');
      r.id = 'esdin-anuncios';
      r.className = 'esdin-solo-lectores';
      r.setAttribute('aria-live', 'polite');
      document.body.appendChild(r);
    }
    r.textContent = '';
    setTimeout(function () { r.textContent = texto; }, 50);
  }

  /* ---------- Iconos SVG (decorativos) ---------- */
  var ICONOS = {
    ok: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M8 12.5l3 3 5-6"/></svg>',
    error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 7v6M12 16.5v.5"/></svg>',
    aviso: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3l10 18H2L12 3z"/><path d="M12 10v5M12 18v.5"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 11v6M12 7.5v.5"/></svg>'
  };

  function iniciar(raiz) {
    iniciarTablas(raiz);
    iniciarPestanas(raiz);
  }

  window.EsdinUI = {
    version: '1.0.0',
    iniciar: iniciar,
    toast: toast,
    mostrarErrores: mostrarErrores,
    limpiarErrores: limpiarErrores,
    estado: estado,
    cargar: cargar,
    anunciar: anunciar,
    formato: formato,
    escapar: escapar,
    iconos: ICONOS
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { iniciar(); });
  else iniciar();
})();
