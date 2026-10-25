---
name: Páramo
description: Hamburguesería a la brasa en el centro de Tunja (negocio ficticio). Fachada encalada, madera verde y brasa.
colors:
  cal: "#eceee8"
  cal-sombra: "#d9dcd2"
  piedra: "#bdb9ad"
  piedra-oscura: "#8f8b80"
  verde: "#1e4636"
  verde-luz: "#2b5c48"
  verde-sombra: "#122c22"
  verde-texto: "#c2d3c7"
  hollin: "#1c1916"
  hollin-alto: "#28231f"
  hueso: "#f1e9dd"
  hueso-suave: "#bcae9e"
  tinta: "#1c1916"
  tinta-suave: "#4b5049"
  brasa: "#ec7a2f"
  brasa-viva: "#ffab61"
  aviso: "#ffc4ae"
  esmalte: "#fafaf6"
typography:
  rotulo:
    fontFamily: "Ultra, Rockwell Extra Bold, Rockwell, Georgia, serif"
    fontSize: "clamp(3.5rem, 22cqi, 11.5rem)"
    fontWeight: 400
    lineHeight: 0.82
    letterSpacing: "-0.025em"
  titulo:
    fontFamily: "Ultra, Rockwell Extra Bold, Rockwell, Georgia, serif"
    fontSize: "clamp(2.5rem, 1.6rem + 3.6vw, 4.75rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.01em"
  texto:
    fontFamily: "Atkinson Hyperlegible Next Variable, Segoe UI, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  rotulo-carta:
    fontFamily: "Atkinson Hyperlegible Next Variable, Segoe UI, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 800
    lineHeight: 1.55
    letterSpacing: "0.14em"
  texto-chico:
    fontFamily: "Atkinson Hyperlegible Next Variable, Segoe UI, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
rounded:
  campo: "4px"
  placa: "5px"
spacing:
  e-1: "4px"
  e-2: "8px"
  e-3: "12px"
  e-4: "16px"
  e-5: "24px"
  e-6: "32px"
  e-7: "48px"
  e-8: "72px"
  e-9: "112px"
components:
  boton-primario:
    backgroundColor: "{colors.verde}"
    textColor: "{colors.hueso}"
    rounded: "{rounded.campo}"
    padding: "12px 24px"
    height: "52px"
  boton-primario-hover:
    backgroundColor: "{colors.verde-luz}"
  boton-primario-sobre-verde:
    backgroundColor: "{colors.hueso}"
    textColor: "{colors.verde-sombra}"
  boton-linea:
    backgroundColor: "transparent"
    textColor: "{colors.verde}"
    rounded: "{rounded.campo}"
    padding: "12px 24px"
    height: "52px"
  placa:
    backgroundColor: "{colors.esmalte}"
    textColor: "{colors.verde}"
    rounded: "{rounded.placa}"
    padding: "8px 16px"
  filtro-activo:
    backgroundColor: "{colors.brasa}"
    textColor: "{colors.hollin}"
    rounded: "{rounded.campo}"
    height: "44px"
  campo:
    backgroundColor: "{colors.verde-sombra}"
    textColor: "{colors.hueso}"
    rounded: "{rounded.campo}"
    padding: "12px 16px"
    height: "52px"
---

# Design System: Páramo

## Overview

**Afuera hace frío; adentro está la brasa.** La página es la fachada de un local en el centro histórico de Tunja: muro encalado, madera pintada de verde, vano de piedra, placas de cerámica con la nomenclatura y un zócalo verde al pie del muro. Al cruzar la puerta se entra al interior (la carta): hollín, loza color hueso y la brasa que se enciende solo en lo que miras.

El sitio rechaza la plantilla de hamburguesería (foto de producto sobre negro, titular condensado amarillo y rojo). La identidad está en el lugar y en sus materiales, no en la comida fotografiada. Un solo momento de movimiento por estado: la puerta se abre si el local está abierto y el sello cae al confirmar la reserva.

## Colors

Estrategia comprometida: la cal y el verde ocupan la mayor parte de la superficie, el hollín es el interior y la brasa es un estado.

### Primary
- **Verde de madera pintada** (`verde`): puertas, zócalo, tablero del horario, sección de reservas y botón primario sobre la cal. `verde-luz` y `verde-sombra` son la luz y la sombra de las molduras.

### Secondary
- **Hollín** (`hollin`, `hollin-alto`): el interior y la carta. Sobre él, el texto es `hueso` y el secundario `hueso-suave`.

### Tertiary
- **Brasa** (`brasa`, `brasa-viva`): solo para lo activo.

### Neutral
- **Cal** (`cal`, `cal-sombra`): el muro, que es el fondo de la fachada y del horario. Blanco frío teñido de verde, nunca crema.
- **Piedra** (`piedra`, `piedra-oscura`): el vano de la puerta y el umbral que separa la fachada del interior.
- **Esmalte** (`esmalte`): las placas de cerámica y el letrero.

### Named Rules
- **La brasa es un estado.** `brasa` marca solo lo activo: local abierto (letrero y luz de la puerta), filtro elegido, plato bajo el cursor o el foco, el día de hoy en el horario y el sello. Nunca decora ni rellena.
- **Sobre el verde, el texto secundario es verde.** En las superficies verdes el texto secundario es `verde-texto`, nunca gris ni `hueso-suave`.
- **Foco según el fondo.** El anillo de foco es `hollin` sobre la cal (la brasa no llega a 3:1 ahí) y `brasa` en el interior, el verde y el pie.

## Typography

**Ultra** (Clarendon pesada, letra de rótulo pintado) para el nombre y los títulos. **Atkinson Hyperlegible Next** para todo lo demás. Ambas se sirven desde el propio sitio, sin servicios externos.

### Hierarchy
- **Rótulo** (`rotulo`): el nombre pintado en la fachada, al ancho de su columna gracias a `cqi`, sin partirse nunca.
- **Título** (`titulo`): títulos de sección.
- **Texto** (`texto`, 17px): cuerpo y toda la carta.
- **Texto chico** (`texto-chico`): ayudas de formulario, avisos y pie.

### Named Rules
- **Un solo tamaño en la carta.** Grupos, platos, precios, descripciones y capas van todos a 17px. El rango lo dan el peso (800 en nombres y precios, 400 en descripciones), las mayúsculas espaciadas en los grupos y las reglas (2px bajo el grupo, 1px entre platos, puntos guía hacia el precio). El detector marca la escala plana a propósito: es la regla, no un error.
- Números de precios, horario y conteos en `tabular-nums`.

## Layout

Contenedor de 76rem con margen fluido (`clamp(1rem, …, 3rem)`) que también respeta las zonas seguras del notch. Las secciones alternan materiales en un orden fijo: fachada (cal), interior (hollín), horario (cal), reservas (verde), pie (verde sombra). El ritmo vertical de sección es `e-9`. La fachada mide `100svh`, con la puerta en una columna cuyo ancho sale de la altura deseada (proporción 0,56). En pantallas de 52rem o menos todo pasa a una columna: nombre y acciones arriba, puerta debajo.

## Elevation & Depth

La luz cae de arriba: las sombras siempre tienen desplazamiento y desenfoque.

### Shadow Vocabulary
- `sombra-placa`: placas, letrero y sello de cerámica.
- `sombra-puerta`: puerta y tablero, una sombra larga y verde sobre el muro.
- Molduras: sombras internas de 1 a 2px sin desenfoque, solo dentro de la madera (tableros, zócalo, tablero del horario). Son geometría de la moldura, no sombras de elevación.

## Shapes

La cerámica tiene las esquinas apenas suavizadas (5px). La madera y los campos son casi rectos (4px y 2px). Las píldoras redondas no existen en este mundo. La única forma curva es la pila de capas: el pan de arriba lleva una cúpula de 1,25rem y el de abajo, 0,75rem.

## Components

### Buttons
Madera pintada. El primario es verde sólido sobre la cal y hueso sólido sobre el verde. El de línea es solo el filete de 2px. Miden 52px de alto, no parten el texto en dos líneas y se hunden con `scale(0.97)` al presionar.

### Chips
Filtros de la carta: rectángulos con filete hueso al 30%. El activo se pinta de brasa (`aria-pressed="true"`).

### Inputs / Fields
Hundidos en la madera: fondo `verde-sombra`, filete hueso al 35%, borde de brasa al enfocar, borde `aviso` con error. Letra de 16px o más para que iOS no haga zoom. Los errores aparecen al salir del campo y se corrigen en vivo.

### Navigation
Placas de cerámica con doble filete verde. Al pasar el mouse se invierten a verde con texto hueso.

### Puerta (signature)
Vano de piedra, dos hojas con tres tableros cada una e interior de hollín. `data-estado="abierto"` gira la hoja derecha −42° hacia adentro (1100 ms, curva de vaivén) y deja ver la brasa. Lleva un letrero esmaltado: brasa si está abierto, hollín si está cerrado y esmalte sin JavaScript.

### Sello
Doble anillo en brasa con «Reservado» en Ultra. Cae acelerando y se asienta (520 ms): es el único golpe fuerte del sitio.

## Do's and Don'ts

### Do:
- **Do** dejar que el material cuente el lugar: cal, madera verde, piedra, cerámica.
- **Do** usar la brasa solo para lo activo.
- **Do** mantener la carta a un solo tamaño y jerarquizar con peso, caja y reglas.
- **Do** animar con una sola autoría por estado: la puerta y el sello. El carbón de los platos entra en 120 ms y se enfría en 1400 ms.

### Don't:
- **Don't** usar fotos de producto a sangre sobre negro ni titulares condensados amarillo y rojo: es la plantilla de la categoría.
- **Don't** convertir la cal en crema ni dejar que la teja de barro mande: ese es el cliché de restaurante rústico.
- **Don't** usar texturas de ruido (`feTurbulence`), degradados como adorno ni sombras duras sin desenfoque.
- **Don't** inventar reseñas, calificaciones, premios ni clientes.
