
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    allowedHosts: [
      "b744de42-27c0-419f-8a21-623ee4f77427-00-2w8cuiin1fmfd.worf.replit.dev",
    ],
  },
})
