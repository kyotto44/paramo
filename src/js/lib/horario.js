/*
 * Lógica del horario, sin DOM: recibe una fecha y responde si el local está abierto.
 * Al no tocar la página se puede probar sola y reutilizar en cualquier sección.
 */
import { horario, negocio } from "../../data/negocio.js";

const DIAS = { dom: 0, lun: 1, mar: 2, mié: 3, jue: 4, vie: 5, sáb: 6 };

const formatoPartes = new Intl.DateTimeFormat("es-CO", {
  timeZone: negocio.zonaHoraria,
  weekday: "short",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export const aMinutos = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

// Día de la semana y minuto del día en Tunja, sin importar la zona horaria de quien visita.
export function momentoEnTunja(fecha = new Date()) {
  const partes = Object.fromEntries(
    formatoPartes.formatToParts(fecha).map(({ type, value }) => [type, value]),
  );
  const dia = DIAS[partes.weekday.replace(".", "").toLowerCase()];
  return {
    dia,
    minuto: Number(partes.hour) * 60 + Number(partes.minute),
    // Fecha de hoy en Tunja como "AAAA-MM-DD", el formato de <input type="date">.
    fecha: `${partes.year}-${partes.month}-${partes.day}`,
  };
}

/*
 * Devuelve el estado del local:
 *   { abierto: true, cierra: "22:00" }
 *   { abierto: false, abre: { dia: "Martes", hora: "12:00", enDias: 1 } }
 */
export function estadoDelLocal(fecha = new Date()) {
  const { dia, minuto } = momentoEnTunja(fecha);

  for (const [inicio, fin] of horario[dia].franjas) {
    if (minuto >= aMinutos(inicio) && minuto < aMinutos(fin)) {
      return { abierto: true, cierra: fin };
    }
  }

  // Cerrado: se busca la próxima franja, empezando por lo que queda de hoy.
  for (let salto = 0; salto < 7; salto++) {
    const d = (dia + salto) % 7;
    const proxima = horario[d].franjas.find(([inicio]) => salto > 0 || aMinutos(inicio) > minuto);
    if (proxima) {
      return { abierto: false, abre: { dia: horario[d].nombre, hora: proxima[0], enDias: salto } };
    }
  }

  return { abierto: false, abre: null };
}

// Horas de llegada válidas para un día: hasta una hora antes de cerrar.
export const MARGEN_CIERRE = 60;

export function llegadaPermitida(dia, hhmm) {
  const minuto = aMinutos(hhmm);
  return horario[dia].franjas.some(
    ([inicio, fin]) => minuto >= aMinutos(inicio) && minuto <= aMinutos(fin) - MARGEN_CIERRE,
  );
}
