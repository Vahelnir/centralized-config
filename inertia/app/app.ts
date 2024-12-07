/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '../css/app.css'
import { createSSRApp, h, type DefineComponent } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import { TuyauPlugin } from '@tuyau/inertia/vue'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { createTuyauClient } from '~/tuyau'

const appName = import.meta.env.VITE_APP_NAME || 'AdonisJS'

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => `${title} - ${appName}`,

  resolve: (name) => {
    return resolvePageComponent(
      `../pages/${name}.vue`,
      import.meta.glob<DefineComponent>('../pages/**/*.vue')
    )
  },

  setup({ el, App, props, plugin }) {
    const baseUrl = props.initialPage?.props?.APP_URL
    if (!baseUrl || typeof baseUrl !== 'string') {
      throw new Error('APP_URL is not a string')
    }

    createSSRApp({ render: () => h(App, props) })
      .use(plugin)
      .use(TuyauPlugin, { client: createTuyauClient(baseUrl) })
      .mount(el)
  },
})
