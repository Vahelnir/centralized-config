import Snippet from '#models/snippet'
import {
  createSnippetPayloadValidator,
  updateSnippetRequestValidator,
  updateSnippetPayloadValidator,
  deleteSnippetRequestValidator,
} from '#validators/snippet'
import { HttpContext } from '@adonisjs/core/http'
import { SnippetDto } from '../dtos/snippet_dto.js'
import SnippetSubscription from '#models/snippet_subscription'
import { UserRepository } from '../repositories/user_repository.js'
import { inject } from '@adonisjs/core'

@inject()
export default class SnippetsController {
  constructor(private userRepository: UserRepository) {}

  async index_view({ inertia, auth }: HttpContext) {
    const items = await Snippet.query().orderBy('created_at', 'desc')
    const subscriptions = await SnippetSubscription.findAllByUser(auth.getUserOrFail().id)

    return inertia.render('snippets/index', {
      items: items.map((item) => new SnippetDto(item).toJSON()),
      subscriptions: Object.fromEntries(
        subscriptions.map((subscription) => [subscription.snippet_id, true])
      ) as Record<string, boolean | undefined>,
    })
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

  async delete({ request, response }: HttpContext) {
    const { params } = await request.validateUsing(deleteSnippetRequestValidator)

    const snippet = await Snippet.find(params.id)
    if (snippet) {
      await snippet.delete()
    }

    return response.redirect().toRoute('snippets.index')
  }

  async subscribe({ request, response, auth }: HttpContext) {
    const { params } = await request.validateUsing(deleteSnippetRequestValidator)

    const snippet = await Snippet.find(params.id)
    if (snippet) {
      const user = auth.getUserOrFail()
      await this.userRepository.subscribeToSnippet(user, snippet)
    }

    return response.redirect().back()
  }

  async unsubscribe({ request, response, auth }: HttpContext) {
    const { params } = await request.validateUsing(deleteSnippetRequestValidator)

    const snippet = await Snippet.find(params.id)
    if (snippet) {
      const user = auth.getUserOrFail()
      await this.userRepository.unsubscribeFromSnippet(user, snippet)
    }

    return response.redirect().back()
  }
}
