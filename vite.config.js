import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Relative base keeps the build working both at a domain root and under a
// GitHub Pages project path such as /super-agent/.
export default defineConfig({
  plugins: [vue()],
  base: './',
})
