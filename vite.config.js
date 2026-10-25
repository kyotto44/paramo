import { resolve } from "node:path";
import { defineConfig } from "vite";
import { plantillas } from "./build/plugin-plantillas.js";

export default defineConfig({
  plugins: [plantillas({ modulo: "/src/plantillas/index.js" })],

  build: {
    // Navegadores de los últimos años: CSS anidado, :has() y módulos ES sin polyfills.
    target: "es2022",
    cssMinify: true,
    // Imágenes pequeñas (íconos) van dentro del CSS; las grandes quedan como archivo.
    assetsInlineLimit: 2048,
    rollupOptions: {
      input: {
        inicio: resolve(import.meta.dirname, "index.html"),
        gracias: resolve(import.meta.dirname, "gracias.html"),
        noEncontrada: resolve(import.meta.dirname, "404.html"),
      },
    },
  },
});
