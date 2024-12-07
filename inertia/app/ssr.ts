import env from '#start/env'
import { createInertiaApp } from '@inertiajs/vue3'
import { TuyauPlugin } from '@tuyau/inertia/vue'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp, h, type DefineComponent } from 'vue'
import { createTuyauClient } from '~/tuyau'

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: renderToString,
    resolve: (name) => {
      const pages = import.meta.glob<DefineComponent>('../pages/**/*.vue', { eager: true })
      return pages[`../pages/${name}.vue`]
    },

    setup({ App, props, plugin }) {
      const baseUrl = env.get('APP_URL')
      if (!baseUrl) {
        throw new Error('APP_URL is not set in the environment variables')
      }

      return createSSRApp({ render: () => h(App, props) })
        .use(plugin)
        .use(TuyauPlugin, { client: createTuyauClient(baseUrl) })
    },
  })
}
