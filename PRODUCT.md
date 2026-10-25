# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

HTML, CSS y JavaScript sin frameworks, empaquetado con Vite (módulos ES, minificación y hashing de archivos al publicar). Despliegue en Netlify con cabeceras de seguridad, como el resto del portafolio. Formularios con Netlify Forms: no hay claves de API ni servicios externos en el código.

## Users

- Visitante con hambre, casi siempre desde el celular, que decide si va hoy: quiere ver la carta con precios, saber dónde queda, si está abierto y reservar mesa.
- Reclutadores y posibles clientes del autor (Santiago Angarita, kyotto44) que revisan el sitio como muestra de trabajo: miran diseño, rendimiento, accesibilidad y el código en GitHub.

## Product Purpose

Sitio de una hamburguesería **ficticia**, creado para el portafolio. Debe demostrar que el autor puede entregar el sitio completo de un restaurante pequeño: identidad propia, carta usable, información práctica y reservas, rápido en cualquier celular.

## Positioning

Un negocio inventado con nombre de trabajo **Páramo** (supuesto del autor del sitio, cambiable): hamburguesas a la brasa en Tunja, Boyacá, una ciudad fría de altura. El sitio se apoya en ese lugar concreto y no en una plantilla genérica de comida rápida.

## Operating Context

- Ubicación ficticia en Tunja. La dirección, el teléfono y el horario son inventados y se marcan así.
- La carta, los nombres de los platos y los precios (en pesos colombianos) son contenido de demostración.

## Capabilities and Constraints

- Carta con filtros por categoría (hamburguesas, acompañantes, bebidas y las que se definan).
- Ubicación y horario, con estado de abierto o cerrado calculado según la hora.
- Formulario de reservas con Netlify Forms, validación en el navegador y protección antispam (honeypot), sin claves.
- Sin pedidos en línea, sin pagos, sin carrito, sin WhatsApp.
- Debe funcionar sin JavaScript en lo esencial (la carta completa y el formulario se ven y se envían).
- Nada sensible en el repositorio: el `.gitignore` excluye `.env` y `.netlify/`.

## Brand Commitments

- Textos en español de Colombia.
- En los repositorios no se nombran herramientas de IA específicas; el uso de IA se describe de forma genérica (regla del portafolio).

## Evidence on Hand

- No hay fotos reales del negocio, porque no existe. Si se usan imágenes, deben ser propias o de stock con licencia libre y su origen queda documentado.
- No se inventan testimonios, reseñas, calificaciones, premios ni cifras de clientes. El pie de página aclara que es un negocio ficticio.

## Product Principles

1. Lo práctico primero: carta con precio, horario y reservas a un toque desde el celular.
2. Un lugar real y concreto (Tunja, el frío, la brasa), no una plantilla de comida rápida.
3. Honestidad: todo lo inventado se presenta como demostración.
4. Rápido y liviano: carga casi inmediata con datos móviles.

## Accessibility & Inclusion

WCAG 2.1 AA: contraste, uso completo con teclado, etiquetas en el formulario y respeto por "reducir movimiento".
