/*
 * Datos del negocio: una sola fuente de verdad.
 * Este módulo lo leen dos lados:
 *   - Vite, al compilar, para escribir el horario y la dirección dentro del HTML.
 *   - El navegador, para calcular si el local está abierto en este momento.
 * Páramo es un negocio ficticio: la dirección y el horario son de demostración.
 */

export const negocio = {
  nombre: "Páramo",
  lema: "Hamburguesas a la brasa",
  ciudad: "Tunja, Boyacá",
  direccion: "Calle 19 # 10-42, Centro",
  // La hora siempre se calcula en Colombia, aunque quien visita esté en otro país.
  zonaHoraria: "America/Bogota",
};

/*
 * Horario por día de la semana (0 = domingo … 6 = sábado), en formato 24 h.
 * Un día sin franjas es un día cerrado. Una franja que cierra después de medianoche
 * no se usa a propósito: así el cálculo de abierto/cerrado se mantiene simple.
 */
export const horario = [
  { dia: 0, nombre: "Domingo", franjas: [["12:00", "20:00"]] },
  { dia: 1, nombre: "Lunes", franjas: [] },
  { dia: 2, nombre: "Martes", franjas: [["12:00", "22:00"]] },
  { dia: 3, nombre: "Miércoles", franjas: [["12:00", "22:00"]] },
  { dia: 4, nombre: "Jueves", franjas: [["12:00", "22:00"]] },
  { dia: 5, nombre: "Viernes", franjas: [["12:00", "23:30"]] },
  { dia: 6, nombre: "Sábado", franjas: [["12:00", "23:30"]] },
];

// Rango de personas por reserva; el formulario y la validación usan los mismos límites.
export const reservas = {
  minPersonas: 1,
  maxPersonas: 12,
  diasAnticipacion: 30,
};
