/*
 * Plugin de Vite: plantillas que se resuelven al compilar.
 *
 * En el HTML se escribe un marcador como <!-- @carta --> y el plugin lo reemplaza por
 * el HTML que devuelve la plantilla con ese nombre. Así la carta y el horario viven en
 * src/data/ (una sola fuente de verdad) y aun así llegan al navegador como HTML normal:
 * se ven sin JavaScript, los buscadores los leen y no hay que esperar a que nada se pinte.
 */
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const MARCADOR = /<!--\s*@([a-z-]+)\s*-->/g;

export function plantillas({ modulo }) {
  let raiz = process.cwd();

  return {
    name: "paramo-plantillas",

    configResolved(config) {
      raiz = config.root;
    },

    transformIndexHtml: {
      order: "pre",
      async handler(html, { filename, server }) {
        // En desarrollo se carga a través de Vite para que un cambio en los datos se vea al recargar;
        // al compilar basta con importarlo una vez desde Node.
        const registro = server
          ? await server.ssrLoadModule(modulo)
          : await import(pathToFileURL(resolve(raiz, modulo.replace(/^\//, ""))).href);

        return html.replace(MARCADOR, (_, nombre) => {
          const plantilla = registro[nombre];
          if (typeof plantilla !== "function") {
            throw new Error(`[plantillas] No existe la plantilla "@${nombre}" (usada en ${filename}).`);
          }
          return plantilla();
        });
      },
    },

    // Los datos y las plantillas no son módulos del navegador: si cambian, se recarga la página.
    handleHotUpdate({ file, server }) {
      if (/[\\/]src[\\/](data|plantillas)[\\/]/.test(file)) {
        server.ws.send({ type: "full-reload" });
      }
    },
  };
}
