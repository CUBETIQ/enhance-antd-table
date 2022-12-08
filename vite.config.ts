import * as path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
// import dts from 'vite-dts'

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
        // rollupOptions: {
        //   output: {
        //     chunkFileNames: '[name].js',
        //     entryFileNames: '[name].js'
        //   }
        // },
        sourcemap: true
      },
      rollupOptions: {
        external: ['react', 'react/jsx-runtime', 'react-dom']
      },

      outDir: 'build'
    },
    target: 'esnext',
    server: {
      port: 3000
    }
  }
})
