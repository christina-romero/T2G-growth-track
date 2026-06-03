import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// base: './' makes all built asset paths relative, so the app works at a GitHub
// Pages project URL (https://<user>.github.io/<repo>/) without hard-coding the
// repo name — and still works if opened from any subpath. The app uses
// HashRouter, so client-side routes never hit the server and need no 404 fallback.
export default defineConfig({
  base: './',
  plugins: [react()],
})
