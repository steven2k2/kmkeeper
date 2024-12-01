import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd())

  // Debugging: Log the current mode and environment variables
  console.log(`Running in mode: ${mode}`)
  console.log('Loaded environment variables:', env)

  // Resolve the alias path
  const aliasPath = path.resolve(__dirname, './src')

  // Debugging: Log the alias path
  console.log('Alias @ resolves to:', aliasPath)

  // Debugging: Confirm default entry point
  console.log('Default entry point assumed as src/index.jsx')

  return {
    plugins: [react()],
    server: {
      port: 3003,
      open: true,
      onListen: ({ port, hostname }) => {
        console.log(`Vite development server running at http://${hostname}:${port}`)
      },
    },
    resolve: {
      alias: {
        '@': aliasPath,
      },
    },
  }
})