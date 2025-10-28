import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
  const isDevBuild = mode === 'development-build'
  const outDir = isDevBuild ? '../assets/js/dev-build' : '../assets/js/build'

  return {
    plugins: [react()],
    build: {
      outDir,
      emptyOutDir: true,
      manifest: true,
      sourcemap: true,
      minify: isDevBuild ? false : 'esbuild',
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
        },
        output: {
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]'
        }
      }
    },
    css: {
      devSourcemap: true,
    },
    server: {
      port: 3000,
      strictPort: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
