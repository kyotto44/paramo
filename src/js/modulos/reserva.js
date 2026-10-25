/*
 * Formulario de reservas.
 * Sin JavaScript se envía normal a Netlify Forms y se llega a /gracias.
 * Con JavaScript: límites de fecha, horas según el día, mensajes de error en español,
 * envío sin recargar y el sello de confirmación.
 */
import { reservas } from "../../data/negocio.js";
import { llegadaPermitida, momentoEnTunja, aMinutos } from "../lib/horario.js";
import { hora } from "../lib/formato.js";

const formatoFecha = new Intl.DateTimeFormat("es-CO", {
  weekday: "long",
  day: "numeric",
  month: "long",
  timeZone: "UTC",
});

// "2026-10-24" → Date en UTC (solo interesa el día del calendario, no la zona).
const aFecha = (iso) => {
  const [a, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(a, m - 1, d));
};
const aIso = (fecha) => fecha.toISOString().slice(0, 10);
const sumarDias = (iso, dias) => aIso(new Date(aFecha(iso).getTime() + dias * 86_400_000));

// Cada regla devuelve el mensaje de error o "" si el campo está bien.
const reglas = {
  nombre: ({ value }) => {
    const texto = value.trim();
    if (!texto) return "Escribe tu nombre para la reserva.";
    if (texto.length < 2) return "El nombre debe tener al menos 2 letras.";
    return "";
  },
  correo: (campo) => {
    if (!campo.value.trim()) return "Escribe tu correo para confirmarte la reserva.";
    if (campo.validity.typeMismatch) return "Revisa el correo: debe verse como nombre@correo.com.";
    return "";
  },
  fecha: ({ value, min, max }) => {
    if (!value) return "Elige el día de tu visita.";
    if (value < min) return "Esa fecha ya pasó. Elige hoy o un día próximo.";
    if (value > max) return `Recibimos reservas con máximo ${reservas.diasAnticipacion} días de anticipación.`;
    if (aFecha(value).getUTCDay() === 1) return "Los lunes no abrimos. Elige otro día.";
    return "";
  },
  hora: (campo) => {
    if (!campo.value) return "Elige la hora de llegada.";
    if (campo.selectedOptions[0]?.disabled) return "A esa hora no hay mesas. Elige otra hora.";
    return "";
  },
  personas: ({ value }) => {
    const n = Number(value);
    if (!Number.isInteger(n) || n < reservas.minPersonas || n > reservas.maxPersonas) {
      return `Reservamos para ${reservas.minPersonas} a ${reservas.maxPersonas} personas. Si son más, cuéntanos en el comentario.`;
    }
    return "";
  },
};

export function iniciarReserva() {
  const formulario = document.querySelector(".formulario");
  if (!formulario) return;

  const confirmacion = document.querySelector(".confirmacion");
  const resumen = confirmacion.querySelector(".confirmacion__resumen");
  const estado = formulario.querySelector(".formulario__estado");
  const enviar = formulario.querySelector('[type="submit"]');
  const campos = Object.fromEntries(Object.keys(reglas).map((nombre) => [nombre, formulario.elements[nombre]]));
  const tocados = new Set();

  function mostrarError(nombre) {
    const campo = campos[nombre];
    const mensaje = reglas[nombre](campo);
    campo.setAttribute("aria-invalid", String(Boolean(mensaje)));
    document.getElementById(`${campo.id}-error`).textContent = mensaje;
    return !mensaje;
  }

  // Ventana de fechas: desde hoy (en Tunja) hasta los días de anticipación permitidos.
  function ajustarFechas() {
    const { fecha } = momentoEnTunja();
    campos.fecha.min = fecha;
    campos.fecha.max = sumarDias(fecha, reservas.diasAnticipacion);
  }

  // Solo quedan activas las horas en que se puede llegar ese día; hoy, además, las que no han pasado.
  function ajustarHoras() {
    const iso = campos.fecha.value;
    const ahora = momentoEnTunja();
    const dia = iso ? aFecha(iso).getUTCDay() : null;

    for (const opcion of campos.hora.options) {
      if (!opcion.value) continue;
      const libre =
        dia === null ||
        (llegadaPermitida(dia, opcion.value) && (iso !== ahora.fecha || aMinutos(opcion.value) > ahora.minuto + 30));
      opcion.disabled = !libre;
    }
    if (tocados.has("hora")) mostrarError("hora");
  }

  for (const nombre of Object.keys(campos)) {
    const campo = campos[nombre];
    // El error aparece al salir del campo, no mientras se escribe; luego se corrige en vivo.
    campo.addEventListener("blur", () => {
      tocados.add(nombre);
      mostrarError(nombre);
    });
    campo.addEventListener("input", () => {
      if (tocados.has(nombre)) mostrarError(nombre);
    });
  }

  campos.fecha.addEventListener("change", ajustarHoras);

  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    ajustarFechas();

    const invalidos = Object.keys(campos).filter((nombre) => {
      tocados.add(nombre);
      return !mostrarError(nombre);
    });
    if (invalidos.length) {
      campos[invalidos[0]].focus();
      return;
    }

    enviar.setAttribute("aria-busy", "true");
    enviar.disabled = true;
    enviar.textContent = "Enviando…";
    estado.textContent = "";
    delete estado.dataset.tono;

    try {
      // Netlify Forms recibe el formulario en la raíz, codificado como un envío normal.
      const respuesta = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(formulario)).toString(),
      });
      if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
      confirmar();
    } catch {
      estado.dataset.tono = "error";
      estado.textContent = "No pudimos enviar la reserva. Revisa tu conexión e inténtalo otra vez.";
    } finally {
      enviar.removeAttribute("aria-busy");
      enviar.disabled = false;
      enviar.textContent = "Reservar mesa";
    }
  });

  function confirmar() {
    const datos = new FormData(formulario);
    const personas = Number(datos.get("personas"));
    const nombre = String(datos.get("nombre")).trim().split(/\s+/)[0];
    resumen.textContent =
      `Mesa para ${personas} ${personas === 1 ? "persona" : "personas"}, el ` +
      `${formatoFecha.format(aFecha(datos.get("fecha"))).replace(",", "")} a las ${hora(datos.get("hora"))}, ` +
      `a nombre de ${nombre}.`;

    formulario.hidden = true;
    confirmacion.hidden = false;
    confirmacion.focus();
  }

  confirmacion.querySelector('[data-accion="otra-reserva"]').addEventListener("click", () => {
    formulario.reset();
    tocados.clear();
    for (const campo of Object.values(campos)) campo.removeAttribute("aria-invalid");
    for (const error of formulario.querySelectorAll(".campo__error")) error.textContent = "";
    ajustarHoras();
    confirmacion.hidden = true;
    formulario.hidden = false;
    campos.nombre.focus();
  });

  ajustarFechas();
  ajustarHoras();
}
