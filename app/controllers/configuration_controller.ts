import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { UserRepository } from '../repositories/user_repository.js'
import vine from '@vinejs/vine'
import User from '#models/user'

export const configurationRequestParamsValidator = vine.compile(
  vine.object({
    token: vine.string().uuid(),
  })
)

@inject()
export default class ConfigurationController {
  constructor(private userRepository: UserRepository) {}

  async getConfiguration({ request, response, params }: HttpContext) {
    const [errors, validatedParams] = await configurationRequestParamsValidator.tryValidate(params)
    if (errors) {
      return response.badRequest(errors)
    }

    const user = await User.find(validatedParams.token)
    if (!user) {
      return response.notFound()
    }
    const { configuration } = await this.userRepository.getConfiguration(user)
    return response.json(configuration)
  }
}
