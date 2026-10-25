# Páramo · Hamburguesas a la brasa en Tunja

Sitio de una hamburguesería **ficticia** del centro de Tunja, hecho para mi portafolio. La página es la fachada del local: un muro encalado, el nombre pintado y una puerta que se abre si el restaurante está abierto en ese momento. La carta es el interior, oscuro y cálido.

**Sitio publicado:** https://paramo-kyotto44.netlify.app

> Páramo no existe: la carta, los precios, la dirección y el horario son de demostración.

## Funcionalidades

- **La puerta dice el horario.** Calcula si el local está abierto con la hora de Colombia (aunque visites desde otro país). Si está abierto, la puerta se entreabre y sale la luz de la brasa. Si no, el letrero dice cuándo abre: hoy, mañana o el día que toque. Se actualiza al cambiar cada minuto y solo con la pestaña visible.
- **Carta con filtros.** Hamburguesas, acompañantes, bebidas y postres, con el conteo de platos por categoría. Cada hamburguesa muestra *cómo está armada*, capa por capa, de pan a pan.
- **Horario con el día de hoy marcado** y la dirección en una placa de cerámica, como la nomenclatura del centro histórico.
- **Reservas con Netlify Forms.** Validación en español al salir de cada campo, fechas limitadas a los próximos 30 días, lunes cerrado y horas de llegada según el día (hasta una hora antes del cierre). Se envía sin recargar y termina con un sello de «Reservado».
- **Funciona sin JavaScript.** La carta completa, el horario y el formulario llegan como HTML. Sin JS, el formulario se envía normal y lleva a `/gracias`.
- **Accesible (WCAG 2.1 AA):** contraste revisado par por par, foco visible en todos los fondos, todo se usa con teclado, errores anunciados al lector de pantalla y respeto por «reducir movimiento».
- **Pensado para el celular:** sin zoom al escribir en los campos, sin destello gris al tocar, respeta el notch y los toques responden al instante.

## Tecnologías

- HTML, CSS y JavaScript sin frameworks (módulos ES).
- [Vite](https://vite.dev) para desarrollo y compilación: minifica, junta el CSS y pone un hash en cada archivo para que el navegador lo guarde en caché un año.
- Fuentes servidas desde el propio sitio (Ultra y Atkinson Hyperlegible Next, vía Fontsource): nada se carga de Google ni de otros dominios.
- Netlify para publicar, con cabeceras de seguridad y Netlify Forms para las reservas.

## Cómo abrirlo

Necesitas Node.js 20.19 o más reciente.

```bash
npm install
npm run dev
```

Abre la dirección que muestra la terminal. Para ver la versión final:

```bash
npm run build
npm run preview
```

> En local, el envío de reservas muestra un error porque Netlify Forms solo existe en el sitio publicado.

## Arquitectura

```
paramo/
├── index.html              Página principal con marcadores <!-- @carta -->, <!-- @horario -->…
├── gracias.html            Destino del formulario cuando no hay JavaScript
├── 404.html                Página no encontrada
├── public/favicon.svg
├── build/
│   └── plugin-plantillas.js  Plugin de Vite: cambia cada marcador por el HTML de su plantilla al compilar
├── src/
│   ├── main.js             Punto de entrada: fuentes, estilos y módulos
│   ├── data/               Única fuente de verdad (la leen la compilación y el navegador)
│   │   ├── negocio.js      Nombre, dirección, horario y límites de reserva
│   │   └── carta.js        Categorías y platos
│   ├── plantillas/
│   │   └── index.js        Funciones que convierten los datos en HTML
│   ├── js/
│   │   ├── lib/            Lógica pura, sin DOM (se puede probar sola)
│   │   │   ├── horario.js  ¿Está abierto? ¿Cuándo abre? ¿Se puede llegar a esa hora?
│   │   │   └── formato.js  Precios en pesos, horas a la colombiana y escape de HTML
│   │   └── modulos/        Un archivo por funcionalidad de la página
│   │       ├── estado-local.js
│   │       ├── filtros-carta.js
│   │       └── reserva.js
│   └── styles/
│       ├── main.css        Importa todo en orden
│       ├── base/           Tokens, reinicio y estilos globales
│       ├── componentes/    Placa, botón, puerta, campo, sello
│       └── secciones/      Fachada, carta, horario, reservas, pie
├── netlify.toml            Compilación, cabeceras de seguridad y caché
├── DESIGN.md               Sistema de diseño: colores, tipografía, componentes y reglas
└── PRODUCT.md              Para quién es el sitio y qué no se puede inventar
```

Decisiones principales:

- **Los datos viven en un solo lugar.** Cambiar un precio o un horario en `src/data/` actualiza a la vez el HTML compilado, el letrero de la puerta y las horas disponibles en el formulario.
- **El HTML se genera al compilar, no en el navegador.** La carta no espera a que cargue JavaScript, los buscadores la leen y el JS que se descarga es mínimo.
- **La lógica no toca la página.** `js/lib/` solo recibe datos y devuelve resultados; `js/modulos/` conecta esa lógica con el DOM.
- **CSS por capas:** tokens, base, componentes y secciones. Los colores, espacios y curvas salen de variables de `tokens.css`.

## Rendimiento

Compilado con gzip: HTML 4,6 KB, CSS 5,6 KB y JS 3,3 KB. Las fuentes pesan unos 50 KB en WOFF2, y el navegador descarga solo el subconjunto que usa la página. No hay imágenes: la puerta, las placas y el sello están hechos con CSS.

## Seguridad

- **Sin claves ni secretos.** El sitio no usa APIs externas. `.env` y `.env.*` están en `.gitignore` por si algún día se agregan. En Vite, toda variable que empiece por `VITE_` termina en el JavaScript público, así que una clave secreta nunca debe llevar ese prefijo.
- **CSP estricta:** solo se cargan recursos del propio sitio. No hay scripts en línea, CDN ni fuentes externas.
- **Cabeceras:** `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy` y HSTS (ver `netlify.toml`).
- **Formulario:** campo trampa (honeypot) contra bots, longitudes máximas en cada campo y datos personales solo para confirmar la reserva.
- **Dependencias:** versiones exactas (`save-exact`) y `ignore-scripts` en `.npmrc`, para que ningún paquete ejecute código al instalarse. `npm audit`: 0 vulnerabilidades.

## Publicar en Netlify

El sitio se publica con la [CLI de Netlify](https://docs.netlify.com/cli/get-started/), que lee `netlify.toml` (compila con `npm run build` y sube `dist/` con sus cabeceras):

```bash
netlify login
netlify link
netlify deploy --build --prod
```

Las reservas llegan a *Project → Forms → reserva*. En proyectos nuevos hay que activar antes *Enable form detection* en esa misma página; luego Netlify encuentra el formulario solo, por el atributo `data-netlify`.
