import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@qubic/react-ui': path.resolve(__dirname, '../qubic-react-ui/src'), // Point directly to the entry file
    },
  },
  server: {
    watch: {
      ignored: ['!../qubic-react-ui/**'], // Watch changes in the package
    },
  },
})
