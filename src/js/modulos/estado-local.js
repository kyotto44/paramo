/*
 * Estado del local: abre o cierra la puerta de la fachada, escribe el letrero
 * y marca el día de hoy en el tablero del horario.
 * Se recalcula al cambiar cada minuto y al volver a la pestaña, nunca en segundo plano.
 */
import { estadoDelLocal, momentoEnTunja } from "../lib/horario.js";
import { hora } from "../lib/formato.js";

function textos(estado) {
  if (estado.abierto) {
    return ["Abierto", `cierra a las ${hora(estado.cierra)}`];
  }
  const { abre } = estado;
  if (!abre) return ["Cerrado", "por ahora"];
  const cuando = abre.enDias === 0 ? "hoy" : abre.enDias === 1 ? "mañana" : `el ${abre.dia.toLowerCase()}`;
  return ["Cerrado", `abre ${cuando} a las ${hora(abre.hora)}`];
}

export function iniciarEstadoLocal() {
  const puerta = document.querySelector(".puerta");
  if (!puerta) return;

  const estadoTexto = puerta.querySelector(".letrero__estado");
  const detalleTexto = puerta.querySelector(".letrero__detalle");
  const dias = document.querySelectorAll(".tablero__dia");
  let temporizador;

  function actualizar() {
    const ahora = new Date();
    const estado = estadoDelLocal(ahora);
    const [titulo, detalle] = textos(estado);

    puerta.dataset.estado = estado.abierto ? "abierto" : "cerrado";
    // Solo se escribe si cambió: el letrero es role="status" y no debe repetirse cada minuto.
    if (estadoTexto.textContent !== titulo) estadoTexto.textContent = titulo;
    if (detalleTexto.textContent !== detalle) detalleTexto.textContent = detalle;

    const hoy = String(momentoEnTunja(ahora).dia);
    for (const fila of dias) fila.toggleAttribute("data-hoy", fila.dataset.dia === hoy);

    // Siguiente revisión justo al empezar el próximo minuto.
    clearTimeout(temporizador);
    temporizador = setTimeout(actualizar, 60_000 - (ahora.getTime() % 60_000) + 50);
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) clearTimeout(temporizador);
    else actualizar();
  });

  // Un fotograma de espera: el navegador pinta la puerta cerrada y luego la abre con transición.
  requestAnimationFrame(() => requestAnimationFrame(actualizar));
}
