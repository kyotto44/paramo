/*
 * Filtros de la carta. Sin JavaScript la carta se ve completa y los botones no existen;
 * aquí se muestran y cada uno deja visible solo su grupo.
 * El estado vive en aria-pressed: el CSS lo pinta y el lector de pantalla lo anuncia.
 */
const sinMovimiento = matchMedia("(prefers-reduced-motion: reduce)");

export function iniciarFiltrosCarta() {
  const barra = document.querySelector(".filtros");
  if (!barra) return;

  const botones = [...barra.querySelectorAll(".filtro")];
  const grupos = [...document.querySelectorAll(".grupo")];
  const aviso = document.querySelector("[data-filtro-estado]");

  function aplicar(filtro) {
    let visibles = 0;
    for (const grupo of grupos) {
      const mostrar = filtro === "todo" || grupo.dataset.categoria === filtro;
      grupo.hidden = !mostrar;
      if (mostrar) visibles += grupo.querySelectorAll(".plato").length;
    }
    for (const boton of botones) {
      boton.setAttribute("aria-pressed", String(boton.dataset.filtro === filtro));
    }
    if (aviso) aviso.textContent = `${visibles} platos en la carta.`;
  }

  barra.addEventListener("click", (evento) => {
    const boton = evento.target.closest(".filtro");
    if (!boton || boton.getAttribute("aria-pressed") === "true") return;

    const filtro = boton.dataset.filtro;
    // Fundido corto entre listas donde el navegador lo permite.
    if (document.startViewTransition && !sinMovimiento.matches) {
      document.startViewTransition(() => aplicar(filtro));
    } else {
      aplicar(filtro);
    }
  });

  barra.hidden = false;
}
