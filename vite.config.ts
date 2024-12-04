import { defineConfig } from 'vite'
import adonisjs from '@adonisjs/vite/client'
import inertia from '@adonisjs/inertia/client'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    inertia({ ssr: { enabled: true, entrypoint: 'inertia/app/ssr.ts' } }),
    vue(),
    adonisjs({ entrypoints: ['inertia/app/app.ts'], reload: ['resources/views/**/*.edge'] }),
  ],
  resolve: {
    alias: {
      '~/': `${import.meta.dirname}/inertia/`,
    },
  },
})
