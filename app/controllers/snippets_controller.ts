import Snippet from '#models/snippet'
import {
  createSnippetPayloadValidator,
  updateSnippetRequestValidator,
  updateSnippetPayloadValidator,
} from '#validators/snippet'
import { HttpContext } from '@adonisjs/core/http'
import { SnippetDto } from '../dtos/snippet_dto.js'

export default class SnippetsController {
  async index_view({ inertia }: HttpContext) {
    const items = await Snippet.query().orderBy('created_at', 'desc')
    return inertia.render('snippets/index', { items })
  }

  create_view({ inertia }: HttpContext) {
    return inertia.render('snippets/create')
  }

  async edit_view({ inertia, params }: HttpContext) {
    const item = await Snippet.findOrFail(params.id)
    return inertia.render('snippets/edit', {
      item: new SnippetDto(item).toJSON(),
    })
  }

  async create({ request, response }: HttpContext) {
    const payload = await createSnippetPayloadValidator.validate(request.all())

    await Snippet.create(payload)

    return response.redirect().toRoute('snippets.index')
  }

  async update({ request, response }: HttpContext) {
    const { params } = await request.validateUsing(updateSnippetRequestValidator)
    const item = await Snippet.findOrFail(params.id)

    const payload = await updateSnippetPayloadValidator.validate(request.all())
    item.merge(payload)
    await item.save()

    return response.redirect().toRoute('snippets.index')
  }
}
