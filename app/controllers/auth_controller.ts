import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  login({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toRoute('home')
  }

  googleRedirect({ ally }: HttpContext) {
    return ally.use('google').redirect()
  }

  async googleCallback({ ally, auth, response }: HttpContext) {
    const google = ally.use('google')
    if (google.accessDenied()) {
      return 'You have cancelled the login process'
    }

    if (google.stateMisMatch()) {
      return 'We are unable to verify the request. Please try again'
    }

    if (google.hasError()) {
      return google.getError()
    }

    const googleUser = await google.user()
    if (googleUser.emailVerificationState === 'unverified') {
      return 'Your email address is not verified'
    }

    const user = await User.firstOrCreate(
      {
        email: googleUser.email,
      },
      {
        fullName: googleUser.name,
      }
    )

    await auth.use('web').login(user)

    return response.redirect().toRoute('home')
  }
}
