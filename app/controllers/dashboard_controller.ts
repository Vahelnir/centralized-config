import { HttpContext } from '@adonisjs/core/http'
import { UserRepository } from '../repositories/user_repository.js'
import { inject } from '@adonisjs/core'

@inject()
export default class DashboardController {
  constructor(private userRepository: UserRepository) {}

  async index_view({ inertia, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const { configuration, mergeErrors } = await this.userRepository.getConfiguration(user)

    return inertia.render('home', {
      configuration,
      mergeErrors,
    })
  }
}
