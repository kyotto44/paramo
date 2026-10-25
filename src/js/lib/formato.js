/*
 * Formatos compartidos entre la compilación (plantillas) y el navegador.
 * Los Intl.* se crean una sola vez: crearlos en cada llamada es lo costoso.
 */

const pesos = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

const hora12 = new Intl.DateTimeFormat("es-CO", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: "UTC",
});

// 29900 → "$ 29.900"
export const precio = (valor) => pesos.format(valor).replace(/\s/g, " ");

// "22:00" → "10:00 p. m."; "12:00" → "12:00 m." (así se dice en Colombia)
export function hora(hhmm) {
  if (hhmm === "12:00") return "12:00 m.";
  const [h, m] = hhmm.split(":").map(Number);
  return hora12.format(Date.UTC(2000, 0, 1, h, m)).replace(/\s/g, " ");
}

// Escapa texto antes de meterlo en HTML. Los datos son propios, pero la costumbre evita sorpresas.
const ENTIDADES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
export const html = (texto) => String(texto).replace(/[&<>"']/g, (c) => ENTIDADES[c]);
