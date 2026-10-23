# MYUC INDUSTRIAL · Sitio web

Catálogo de productos industriales. No hay venta en línea: cada producto termina en una solicitud de cotización (formulario con Formspree).

## Estructura

```
myuc-industrial/
├── index.html                  Inicio + formulario de cotización
├── tuberia-inoxidable.html     Línea 01
├── conexiones-inoxidable.html  Línea 02
├── torneria.html               Línea 03
├── gases-criogenicos.html      Línea 04
├── fabricacion.html            Línea 05
├── aviso-privacidad.html       Aviso de privacidad
├── terminos-condiciones.html   Términos y condiciones
├── css/styles.css              Estilos de todas las páginas
├── js/main.js                  Menú móvil, filtros y formulario
├── img/                        Logos e imagen de muestra
└── data/productos.json         Catálogo en datos (para un CMS futuro)
```

## Publicación

Netlify publica este repositorio tal cual: no hay comando de build y la carpeta a publicar es la raíz.
Cada cambio que se sube a GitHub se publica solo en unos segundos.
