/*
 * Punto de entrada. Vite empaqueta desde aquí el CSS, las fuentes y los módulos.
 * Cada módulo revisa si su sección existe, así este archivo sirve para todas las páginas.
 */
import "@fontsource/ultra/latin-400.css";
import "@fontsource-variable/atkinson-hyperlegible-next/wght.css";
import "./styles/main.css";

import { iniciarEstadoLocal } from "./js/modulos/estado-local.js";
import { iniciarFiltrosCarta } from "./js/modulos/filtros-carta.js";
import { iniciarReserva } from "./js/modulos/reserva.js";

iniciarEstadoLocal();
iniciarFiltrosCarta();
iniciarReserva();
