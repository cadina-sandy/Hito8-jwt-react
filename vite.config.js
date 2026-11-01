import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // base: command === "build" ? "/Hito7-router2-react/" : "/",
  // Hito 8: permite indicar la carpeta del nuevo despliegue.
  base: process.env.VITE_BASE_PATH || "/",
}));
