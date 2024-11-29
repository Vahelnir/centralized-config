import type { MakeTuyauRequest, MakeTuyauResponse } from '@tuyau/utils/types'
import type { InferInput } from '@vinejs/vine/types'

type AuthLoginGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/auth_controller.ts').default['login'], false>
}
type AuthLogoutGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/auth_controller.ts').default['logout'], false>
}
type AuthGoogleRedirectGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/auth_controller.ts').default['googleRedirect'], false>
}
type AuthGoogleCallbackGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/auth_controller.ts').default['googleCallback'], false>
}
type SnippetsGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/snippets_controller.ts').default['index_view'], false>
}
type SnippetsCreateGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/snippets_controller.ts').default['create_view'], false>
}
type SnippetsPost = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/snippets_controller.ts').default['create'], false>
}
type SnippetsIdGetHead = {
  request: unknown
  response: MakeTuyauResponse<import('../app/controllers/snippets_controller.ts').default['edit_view'], false>
}
type SnippetsIdPut = {
  request: MakeTuyauRequest<InferInput<typeof import('../app/validators/snippet.ts')['updateSnippetRequestValidator']>>
  response: MakeTuyauResponse<import('../app/controllers/snippets_controller.ts').default['update'], true>
}
export interface ApiDefinition {
  'auth': {
    'login': {
      '$url': {
      };
      '$get': AuthLoginGetHead;
      '$head': AuthLoginGetHead;
    };
    'logout': {
      '$url': {
      };
      '$get': AuthLogoutGetHead;
      '$head': AuthLogoutGetHead;
    };
    'google': {
      'redirect': {
        '$url': {
        };
        '$get': AuthGoogleRedirectGetHead;
        '$head': AuthGoogleRedirectGetHead;
      };
      'callback': {
        '$url': {
        };
        '$get': AuthGoogleCallbackGetHead;
        '$head': AuthGoogleCallbackGetHead;
      };
    };
  };
  'snippets': {
    '$url': {
    };
    '$get': SnippetsGetHead;
    '$head': SnippetsGetHead;
    'create': {
      '$url': {
      };
      '$get': SnippetsCreateGetHead;
      '$head': SnippetsCreateGetHead;
    };
    '$post': SnippetsPost;
    ':id': {
      '$url': {
      };
      '$get': SnippetsIdGetHead;
      '$head': SnippetsIdGetHead;
      '$put': SnippetsIdPut;
    };
  };
}
const routes = [
  {
    params: [],
    name: 'home',
    path: '/',
    method: ["GET","HEAD"],
    types: {} as unknown,
  },
  {
    params: [],
    name: 'auth.login',
    path: '/auth/login',
    method: ["GET","HEAD"],
    types: {} as AuthLoginGetHead,
  },
  {
    params: [],
    name: 'auth.logout',
    path: '/auth/logout',
    method: ["GET","HEAD"],
    types: {} as AuthLogoutGetHead,
  },
  {
    params: [],
    name: 'auth.google',
    path: '/auth/google/redirect',
    method: ["GET","HEAD"],
    types: {} as AuthGoogleRedirectGetHead,
  },
  {
    params: [],
    name: 'auth.google.callback',
    path: '/auth/google/callback',
    method: ["GET","HEAD"],
    types: {} as AuthGoogleCallbackGetHead,
  },
  {
    params: [],
    name: 'snippets.index',
    path: '/snippets',
    method: ["GET","HEAD"],
    types: {} as SnippetsGetHead,
  },
  {
    params: [],
    name: 'snippets.create',
    path: '/snippets/create',
    method: ["GET","HEAD"],
    types: {} as SnippetsCreateGetHead,
  },
  {
    params: [],
    name: 'snippets.post',
    path: '/snippets',
    method: ["POST"],
    types: {} as SnippetsPost,
  },
  {
    params: ["id"],
    name: 'snippets.edit',
    path: '/snippets/:id',
    method: ["GET","HEAD"],
    types: {} as SnippetsIdGetHead,
  },
  {
    params: ["id"],
    name: 'snippets.put',
    path: '/snippets/:id',
    method: ["PUT"],
    types: {} as SnippetsIdPut,
  },
] as const;
export const api = {
  routes,
  definition: {} as ApiDefinition
}
