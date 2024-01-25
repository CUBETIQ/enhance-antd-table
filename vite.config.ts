import react from '@vitejs/plugin-react'
import * as path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
// import dts from 'vite-dts'

/** @type {import('vite').UserConfig} */
export default defineConfig(() => {
  return {
    plugins: [
      dts({
        include: ['./src/**/*.{ts,tsx}', './src/index.tsx'],
        exclude: ['./src/stories']
      }),
      react()
    ],
    build: {
      sourcemap: true,
      lib: {
        entry: path.resolve(__dirname, 'src/index.tsx'),
        name: '@cubetiq/enhance-antd-table',
        fileName: 'index',
        sourcemap: true,
        formats: ['es', 'cjs']
      },
      rollupOptions: {
        external: ['react', 'react/jsx-runtime', 'react-dom']
      },
      outDir: 'dist'
    },
    target: 'esnext'
  }
})
