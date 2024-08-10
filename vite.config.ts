import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  if (command === 'build') {
    return {
      base: "",
      plugins: [react()],
    }
  } else {
    return {
      plugins: [react()],
    }
  }
})
