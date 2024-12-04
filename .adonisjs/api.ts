import type { MakeTuyauRequest, MakeTuyauResponse } from '@tuyau/utils/types'
import type { InferInput } from '@vinejs/vine/types'

type AuthLoginGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/auth_controller.ts').default['login']>
}
type AuthLogoutGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/auth_controller.ts').default['logout']>
}
type AuthGoogleRedirectGetHead = {
  request: unknown
  response: MakeTuyauResponse<
    import('../app/controllers/auth_controller.ts').default['googleRedirect']
  >
}
type AuthGoogleCallbackGetHead = {
  request: unknown
  response: MakeTuyauResponse<
    import('../app/controllers/auth_controller.ts').default['googleCallback']
  >
}
type ConfigurationIdGetHead = {
  request: unknown
  response: MakeTuyauResponse<
    import('../app/controllers/configuration_controller.ts').default['getConfiguration']
  >
}
type SnippetsGetHead = {
  request: unknown
  response: MakeTuyauResponse<
    import('../app/controllers/snippets_controller.ts').default['index_view']
  >
}
type SnippetsCreateGetHead = {
  request: unknown
  response: MakeTuyauResponse<
    import('../app/controllers/snippets_controller.ts').default['create_view']
  >
}
type SnippetsIdEditGetHead = {
  request: unknown
  response: MakeTuyauResponse<
    import('../app/controllers/snippets_controller.ts').default['edit_view']
  >
}
type SnippetsPost = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/snippets_controller.ts').default['create']>
}
type SnippetsIdPut = {
  request: MakeTuyauRequest<
    InferInput<(typeof import('../app/validators/snippet.ts'))['updateSnippetRequestValidator']>
  >
  response: MakeTuyauResponse<import('../app/controllers/snippets_controller.ts').default['update']>
}
type SnippetsIdDelete = {
  request: MakeTuyauRequest<
    InferInput<(typeof import('../app/validators/snippet.ts'))['deleteSnippetRequestValidator']>
  >
  response: MakeTuyauResponse<import('../app/controllers/snippets_controller.ts').default['delete']>
}
type SnippetsIdSubscribePost = {
  request: MakeTuyauRequest<
    InferInput<(typeof import('../app/validators/snippet.ts'))['deleteSnippetRequestValidator']>
  >
  response: MakeTuyauResponse<
    import('../app/controllers/snippets_controller.ts').default['subscribe']
  >
}
type SnippetsIdUnsubscribePost = {
  request: MakeTuyauRequest<
    InferInput<(typeof import('../app/validators/snippet.ts'))['deleteSnippetRequestValidator']>
  >
  response: MakeTuyauResponse<
    import('../app/controllers/snippets_controller.ts').default['unsubscribe']
  >
}
export interface ApiDefinition {
  auth: {
    login: {
      $url: {}
      $get: AuthLoginGetHead
      $head: AuthLoginGetHead
    }
    logout: {
      $url: {}
      $get: AuthLogoutGetHead
      $head: AuthLogoutGetHead
    }
    google: {
      redirect: {
        $url: {}
        $get: AuthGoogleRedirectGetHead
        $head: AuthGoogleRedirectGetHead
      }
      callback: {
        $url: {}
        $get: AuthGoogleCallbackGetHead
        $head: AuthGoogleCallbackGetHead
      }
    }
  }
  configuration: {
    ':token': {
      $url: {}
      $get: ConfigurationIdGetHead
      $head: ConfigurationIdGetHead
    }
  }
  snippets: {
    '$url': {}
    '$get': SnippetsGetHead
    '$head': SnippetsGetHead
    'create': {
      $url: {}
      $get: SnippetsCreateGetHead
      $head: SnippetsCreateGetHead
    }
    ':id': {
      edit: {
        $url: {}
        $get: SnippetsIdEditGetHead
        $head: SnippetsIdEditGetHead
      }
      $url: {}
      $put: SnippetsIdPut
      $delete: SnippetsIdDelete
      subscribe: {
        $url: {}
        $post: SnippetsIdSubscribePost
      }
      unsubscribe: {
        $url: {}
        $post: SnippetsIdUnsubscribePost
      }
    }
    '$post': SnippetsPost
  }
}
const routes = [
  {
    params: [],
    name: 'home',
    path: '/',
    method: ['GET', 'HEAD'],
    types: {} as unknown,
  },
  {
    params: [],
    name: 'auth.login',
    path: '/auth/login',
    method: ['GET', 'HEAD'],
    types: {} as AuthLoginGetHead,
  },
  {
    params: [],
    name: 'auth.logout',
    path: '/auth/logout',
    method: ['GET', 'HEAD'],
    types: {} as AuthLogoutGetHead,
  },
  {
    params: [],
    name: 'auth.google',
    path: '/auth/google/redirect',
    method: ['GET', 'HEAD'],
    types: {} as AuthGoogleRedirectGetHead,
  },
  {
    params: [],
    name: 'auth.google.callback',
    path: '/auth/google/callback',
    method: ['GET', 'HEAD'],
    types: {} as AuthGoogleCallbackGetHead,
  },
  {
    params: ['token'],
    name: 'configuration',
    path: '/configuration/:token',
    method: ['GET', 'HEAD'],
    types: {} as ConfigurationIdGetHead,
  },
  {
    params: [],
    name: 'snippets.index',
    path: '/snippets',
    method: ['GET', 'HEAD'],
    types: {} as SnippetsGetHead,
  },
  {
    params: [],
    name: 'snippets.create',
    path: '/snippets/create',
    method: ['GET', 'HEAD'],
    types: {} as SnippetsCreateGetHead,
  },
  {
    params: ['id'],
    name: 'snippets.edit',
    path: '/snippets/:id/edit',
    method: ['GET', 'HEAD'],
    types: {} as SnippetsIdEditGetHead,
  },
  {
    params: [],
    name: 'snippets.post',
    path: '/snippets',
    method: ['POST'],
    types: {} as SnippetsPost,
  },
  {
    params: ['id'],
    name: 'snippets.put',
    path: '/snippets/:id',
    method: ['PUT'],
    types: {} as SnippetsIdPut,
  },
  {
    params: ['id'],
    name: 'snippets.delete',
    path: '/snippets/:id',
    method: ['DELETE'],
    types: {} as SnippetsIdDelete,
  },
  {
    params: ['id'],
    name: 'snippets.subscribe',
    path: '/snippets/:id/subscribe',
    method: ['POST'],
    types: {} as SnippetsIdSubscribePost,
  },
  {
    params: ['id'],
    name: 'snippets.unsubscribe',
    path: '/snippets/:id/unsubscribe',
    method: ['POST'],
    types: {} as SnippetsIdUnsubscribePost,
  },
] as const
export const api = {
  routes,
  definition: {} as ApiDefinition,
}
