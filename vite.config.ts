import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Base '/' for a custom domain (omnilert.tech) or Vercel.
// For GitHub Pages project hosting, set base to '/omnilert.tech/'.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
})
