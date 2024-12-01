/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const AuthController = () => import('#controllers/auth_controller')
const SnippetsController = () => import('#controllers/snippets_controller')

router.on('/').renderInertia('home').use(middleware.auth()).as('home')

router
  .group(() => {
    router.get('/login', [AuthController, 'login']).use(middleware.guest()).as('login')
    router.get('/logout', [AuthController, 'logout']).use(middleware.auth()).as('logout')
    router
      .get('/google/redirect', [AuthController, 'googleRedirect'])
      .use(middleware.guest())
      .as('google')
    router
      .get('/google/callback', [AuthController, 'googleCallback'])
      .use(middleware.guest())
      .as('google.callback')
  })
  .prefix('/auth')
  .as('auth')

router
  .group(() => {
    router.get('/', [SnippetsController, 'index_view']).as('index')

    /* views */
    router.get('/create', [SnippetsController, 'create_view']).as('create')
    router.get('/:id/edit', [SnippetsController, 'edit_view']).as('edit')

    /* REST actions */
    router.post('/', [SnippetsController, 'create']).as('post')
    router.put('/:id', [SnippetsController, 'update']).as('put')
    router.delete('/:id', [SnippetsController, 'delete']).as('delete')

    /* Specific actions */
    router.post('/:id/subscribe', [SnippetsController, 'subscribe']).as('subscribe')
    router.post('/:id/unsubscribe', [SnippetsController, 'unsubscribe']).as('unsubscribe')
  })
  .prefix('/snippets')
  .use(middleware.auth())
  .as('snippets')
