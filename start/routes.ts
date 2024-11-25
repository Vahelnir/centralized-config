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

router.on('/').render('pages/home').use(middleware.auth()).as('home')

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
  .get('/google/callback', [AuthController, 'googleCallback'])
  .use(middleware.guest())
  .as('google.callback')
