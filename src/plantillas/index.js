/*
 * Plantillas de la página. Cada función exportada corresponde a un marcador
 * <!-- @nombre --> del HTML y devuelve el HTML que lo reemplaza al compilar.
 * Solo leen datos de src/data/: si cambia un precio o un horario, se cambia allá.
 */
import { categorias, platos } from "../data/carta.js";
import { horario, negocio, reservas } from "../data/negocio.js";
import { hora, html, precio } from "../js/lib/formato.js";

/* ---------- Puerta ---------- */

// Tres tableros por hoja, como las puertas del centro histórico.
const hoja = (lado) => `
          <div class="puerta__hoja puerta__hoja--${lado}">
            <span class="puerta__tablero"></span>
            <span class="puerta__tablero"></span>
            <span class="puerta__tablero puerta__tablero--bajo"></span>
          </div>`;

// Sin JavaScript no se sabe la hora: la puerta queda cerrada y el letrero muestra el horario general.
export const puerta = () => `
        <div class="puerta" data-estado="desconocido">
          <div class="puerta__vano">
            <div class="puerta__interior"></div>${hoja("izquierda")}${hoja("derecha")}
          </div>
          <p class="letrero" role="status">
            <span class="letrero__estado">Martes a domingo</span>
            <span class="letrero__detalle">desde las ${hora("12:00")}</span>
          </p>
        </div>`;

/* ---------- Carta ---------- */

const capas = ({ id, capas }) => `
          <details class="capas">
            <summary class="capas__boton">Cómo está armada</summary>
            <ol class="capas__pila" aria-label="Capas de arriba hacia abajo">
              ${capas.map((capa) => `<li class="capas__capa${/^pan/i.test(capa) ? " capas__capa--pan" : ""}">${html(capa)}</li>`).join("\n              ")}
            </ol>
          </details>`;

const plato = (p) => `
        <li class="plato" id="plato-${p.id}">
          <h4 class="plato__linea">
            <span class="plato__nombre">${html(p.nombre)}</span>
            <span class="plato__puntos" aria-hidden="true"></span>
            <span class="plato__precio">${precio(p.precio)}</span>
          </h4>
          <p class="plato__descripcion">${p.etiqueta ? `<strong class="plato__etiqueta">${html(p.etiqueta)}.</strong> ` : ""}${html(p.descripcion)}</p>${p.capas ? capas(p) : ""}
        </li>`;

const grupo = (categoria) => {
  const lista = platos.filter((p) => p.categoria === categoria.id);
  return `
      <section class="grupo grupo--${categoria.id}" data-categoria="${categoria.id}" aria-labelledby="grupo-${categoria.id}">
        <h3 class="grupo__titulo" id="grupo-${categoria.id}">${html(categoria.nombre)} <span class="grupo__cuenta">${lista.length}<span class="solo-lector"> platos</span></span></h3>
        <ul class="grupo__lista" role="list">${lista.map(plato).join("")}
        </ul>
      </section>`;
};

// Los filtros nacen ocultos: sin JavaScript no sirven y la carta se ve completa.
const filtros = () => `
      <div class="filtros" role="group" aria-label="Filtrar la carta" hidden>
        <button class="filtro" type="button" data-filtro="todo" aria-pressed="true">Todo <span class="filtro__cuenta">${platos.length}</span></button>
        ${categorias
          .map(
            (c) =>
              `<button class="filtro" type="button" data-filtro="${c.id}" aria-pressed="false">${html(c.nombre)} <span class="filtro__cuenta">${platos.filter((p) => p.categoria === c.id).length}</span></button>`,
          )
          .join("\n        ")}
      </div>`;

export const carta = () => `${filtros()}
      <p class="solo-lector" role="status" data-filtro-estado></p>
      <div class="carta">${categorias.map(grupo).join("")}
      </div>
      <p class="carta__aviso">Platos y precios de demostración.</p>`;

/* ---------- Dirección y horario ---------- */

export const direccion = () => `
            <address class="placa placa--direccion">
              <span class="placa__calle">${html(negocio.direccion)}</span>
              <span class="placa__ciudad">${html(negocio.ciudad)}</span>
            </address>
            <p class="horario__como">A dos cuadras de la Plaza de Bolívar, subiendo por la calle 19. Dirección de demostración.</p>`;

const franjas = (dia) =>
  dia.franjas.length
    ? dia.franjas.map(([abre, cierra]) => `${hora(abre)} a ${hora(cierra)}`).join(", ")
    : "Cerrado";

// La semana empieza el lunes, como se lee en Colombia.
const semana = [...horario.slice(1), horario[0]];

export const horario_ = () => `
          <div class="tablero">
            <table class="tablero__tabla">
              <caption class="solo-lector">Horario de atención</caption>
              <tbody>
                ${semana
                  .map(
                    (d) =>
                      `<tr class="tablero__dia${d.franjas.length ? "" : " tablero__dia--cerrado"}" data-dia="${d.dia}"><th scope="row">${d.nombre}</th><td>${franjas(d)}</td></tr>`,
                  )
                  .join("\n                ")}
              </tbody>
            </table>
          </div>`;

/* ---------- Reserva ---------- */

// Horas de llegada cada 30 minutos, hasta una hora antes del cierre más tarde.
const horasDeLlegada = () => {
  const salidas = [];
  for (let m = 12 * 60; m <= 22 * 60 + 30; m += 30) {
    salidas.push(`${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`);
  }
  return salidas;
};

export const reserva = () => `
          <form class="formulario" name="reserva" method="POST" action="/gracias" data-netlify="true" netlify-honeypot="bot-field" novalidate>
            <input type="hidden" name="form-name" value="reserva" />
            <p class="solo-lector" aria-hidden="true">
              <label>No llenes este campo si eres humano: <input name="bot-field" tabindex="-1" autocomplete="off" /></label>
            </p>

            <div class="campo campo--mitad">
              <label class="campo__etiqueta" for="r-nombre">Nombre</label>
              <input class="campo__control" id="r-nombre" name="nombre" type="text" autocomplete="name" required minlength="2" maxlength="80" aria-describedby="r-nombre-error" />
              <p class="campo__error" id="r-nombre-error" aria-live="polite"></p>
            </div>

            <div class="campo campo--mitad">
              <label class="campo__etiqueta" for="r-correo">Correo</label>
              <input class="campo__control" id="r-correo" name="correo" type="email" autocomplete="email" autocapitalize="none" spellcheck="false" required maxlength="120" aria-describedby="r-correo-ayuda r-correo-error" />
              <p class="campo__ayuda" id="r-correo-ayuda">Te escribimos solo para confirmar la reserva.</p>
              <p class="campo__error" id="r-correo-error" aria-live="polite"></p>
            </div>

            <div class="campo campo--corto">
              <label class="campo__etiqueta" for="r-fecha">Día</label>
              <input class="campo__control" id="r-fecha" name="fecha" type="date" required aria-describedby="r-fecha-error" />
              <p class="campo__error" id="r-fecha-error" aria-live="polite"></p>
            </div>

            <div class="campo campo--corto">
              <label class="campo__etiqueta" for="r-hora">Hora de llegada</label>
              <select class="campo__control" id="r-hora" name="hora" required aria-describedby="r-hora-error">
                <option value="">Elige</option>
                ${horasDeLlegada().map((h) => `<option value="${h}">${hora(h)}</option>`).join("\n                ")}
              </select>
              <p class="campo__error" id="r-hora-error" aria-live="polite"></p>
            </div>

            <div class="campo">
              <label class="campo__etiqueta" for="r-personas">Personas</label>
              <input class="campo__control" id="r-personas" name="personas" type="number" inputmode="numeric" required min="${reservas.minPersonas}" max="${reservas.maxPersonas}" value="2" aria-describedby="r-personas-error" />
              <p class="campo__error" id="r-personas-error" aria-live="polite"></p>
            </div>

            <div class="campo campo--ancho">
              <label class="campo__etiqueta" for="r-comentario">Comentario <span class="campo__opcional">(opcional)</span></label>
              <textarea class="campo__control" id="r-comentario" name="comentario" rows="3" maxlength="400" placeholder="Cumpleaños, silla para bebé, alergias…"></textarea>
            </div>

            <div class="formulario__envio">
              <button class="boton boton--primario" type="submit">Reservar mesa</button>
              <p class="formulario__estado" role="status" aria-live="polite"></p>
            </div>
          </form>

          <div class="confirmacion" hidden tabindex="-1">
            <div class="sello" aria-hidden="true"><span>Reservado</span></div>
            <h3 class="confirmacion__titulo">Te esperamos</h3>
            <p class="confirmacion__resumen"></p>
            <p class="confirmacion__nota">Es un sitio de demostración: la reserva no llega a ningún restaurante.</p>
            <button class="boton boton--linea-clara" type="button" data-accion="otra-reserva">Hacer otra reserva</button>
          </div>`;

// "horario" choca con el import de datos; el marcador del HTML sigue siendo @horario.
export { horario_ as horario };
