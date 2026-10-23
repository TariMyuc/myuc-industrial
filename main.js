/* ==================================================================
   MYUC INDUSTRIAL · JavaScript global (vanilla, sin librerías)
   1. Menú móvil (abrir / cerrar)
   2. Sombra del header al bajar
   3. Año actual en el footer
   4. Formulario: rellenar línea y producto desde el enlace
   5. Filtros del catálogo (páginas de categoría)
   ================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. Menú móvil ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('menu-principal');

  function cerrarMenu() {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
  }

  if (toggle && nav) {
    // Abre o cierra el menú al tocar el botón hamburguesa
    toggle.addEventListener('click', function () {
      var abierto = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(abierto));
      toggle.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
    });

    // Cierra el menú al elegir una opción
    nav.querySelectorAll('a').forEach(function (enlace) {
      enlace.addEventListener('click', cerrarMenu);
    });

    // Cierra el menú con la tecla Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') cerrarMenu();
    });
  }

  /* ---------- 2. Sombra del header al hacer scroll ---------- */
  var header = document.querySelector('.site-header');
  function revisarScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', revisarScroll, { passive: true });
  revisarScroll();

  /* ---------- 3. Año actual en el footer ---------- */
  var anio = document.getElementById('anio-actual');
  if (anio) anio.textContent = new Date().getFullYear();

  /* ---------- 4. Formulario: rellenar línea y producto desde el enlace ----------
     Los botones "Solicitar cotización" de las páginas de categoría llevan a
     index.html?linea=...&producto=...#contacto. Aquí se preselecciona la
     línea en el menú y se escribe el producto en el mensaje. */
  var parametros = new URLSearchParams(window.location.search);
  var selectLinea = document.getElementById('f-linea');
  var campoMensaje = document.getElementById('f-mensaje');
  if (selectLinea && parametros.get('linea')) {
    Array.prototype.forEach.call(selectLinea.options, function (opcion) {
      if (opcion.text === parametros.get('linea')) opcion.selected = true;
    });
  }
  if (campoMensaje && parametros.get('producto') && !campoMensaje.value) {
    campoMensaje.value = 'Me interesa cotizar: ' + parametros.get('producto') + '.\n';
  }

  // Formspree exige URL absoluta en _next: se arma con el dominio donde esté publicado el sitio
  var campoNext = document.querySelector('.quote-form input[name="_next"]');
  if (campoNext) campoNext.value = new URL(campoNext.value, window.location.href).href;

  /* ---------- 5. Filtros del catálogo ----------
     Cada botón .filter-chip pertenece a un grupo (data-filtro="tipo", "gas"...).
     Una tarjeta se muestra si cumple TODOS los grupos activos; dentro de un
     mismo grupo basta con que cumpla UNO de los valores elegidos. */
  var chips = document.querySelectorAll('.filter-chip');
  var tarjetas = document.querySelectorAll('#grid-productos .product-card');
  var conteo = document.getElementById('conteo-productos');
  var sinResultados = document.getElementById('sin-resultados');
  var limpiar = document.getElementById('limpiar-filtros');

  function aplicarFiltros() {
    // Junta los valores activos por grupo: { tipo: ['aguja'], gas: [...] }
    var activos = {};
    chips.forEach(function (chip) {
      if (chip.getAttribute('aria-pressed') === 'true') {
        var grupo = chip.closest('.filter-group').dataset.filtro;
        (activos[grupo] = activos[grupo] || []).push(chip.dataset.valor);
      }
    });

    var visibles = 0;
    tarjetas.forEach(function (tarjeta) {
      var coincide = Object.keys(activos).every(function (grupo) {
        var valoresTarjeta = (tarjeta.dataset[grupo] || '').split(' ');
        return activos[grupo].some(function (v) { return valoresTarjeta.indexOf(v) !== -1; });
      });
      tarjeta.hidden = !coincide;
      if (coincide) visibles++;
    });

    if (conteo) conteo.textContent = 'Mostrando ' + visibles + (visibles === 1 ? ' producto' : ' productos');
    if (sinResultados) sinResultados.hidden = visibles !== 0;
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var activo = chip.getAttribute('aria-pressed') === 'true';
      chip.setAttribute('aria-pressed', String(!activo));
      aplicarFiltros();
    });
  });

  if (limpiar) {
    limpiar.addEventListener('click', function () {
      chips.forEach(function (chip) { chip.setAttribute('aria-pressed', 'false'); });
      aplicarFiltros();
    });
  }

  // En celular los filtros empiezan plegados para que se vean los productos
  var cajaFiltros = document.querySelector('.filters-box');
  if (cajaFiltros && window.matchMedia('(max-width: 860px)').matches) {
    cajaFiltros.removeAttribute('open');
  }
});
