import Snippet from '#models/snippet'
import { createSnippetValidator } from '#validators/snippet'
import { HttpContext } from '@adonisjs/core/http'

export default class SnippetsController {
  async index_view({ inertia }: HttpContext) {
    const items = await Snippet.query().orderBy('created_at', 'desc')
    return inertia.render('snippets/index', { items })
  }

  create_view({ inertia }: HttpContext) {
    return inertia.render('snippets/create')
  }

  public async create({ request, response }: HttpContext) {
    const data = request.only(['name', 'content'])

    const payload = await createSnippetValidator.validate(data)
    await Snippet.create(payload)

    return response.redirect().toRoute('snippets.index')
  }
}
