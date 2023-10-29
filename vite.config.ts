import react from '@vitejs/plugin-react'
import * as path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

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
      lib: {
        entry: path.resolve(__dirname, 'src/index.tsx'),
        name: '@cubetiq/enhance-antd-table',
        fileName: 'index',
        sourcemap: true,
        formats: ['es', 'cjs'],
      },
      rollupOptions: {
        external: ['react', 'react/jsx-runtime', 'react-dom'],
        output: {
          exports: 'named',
        },
      },
      outDir: 'dist',
    },
    target: 'esnext'
  }
})
