import Snippet from '#models/snippet'
import SnippetSubscription from '#models/snippet_subscription'
import logger from '@adonisjs/core/services/logger'
import User from '#models/user'
import { mergeWith } from 'es-toolkit'

export class UserRepository {
  async subscribeToSnippet(user: User, snippet: Snippet) {
    const newSubscription = new SnippetSubscription()
    newSubscription.user_id = user.id
    newSubscription.snippet_id = snippet.id
    try {
      return await newSubscription.save()
    } catch (error) {
      logger.error({ err: error }, `User ${user.id} failed to subscribe to snippet ${snippet.id} `)
    }
  }

  async unsubscribeFromSnippet(user: User, snippet: Snippet) {
    return await SnippetSubscription.query()
      .where('user_id', user.id)
      .where('snippet_id', snippet.id)
      .delete()
  }

  async getConfiguration(user: User) {
    const snippets = await user.related('subscribedSnippets').query()

    let configuration: unknown
    const mergeErrors: string[] = []
    for (const snippet of snippets) {
      try {
        if (!configuration) {
          configuration = JSON.parse(snippet.content)
          continue
        }

        // TODO: implement our own merger function, to handle cases where the json is not an object
        mergeWith(configuration, JSON.parse(snippet.content), (target, source) => {
          if (Array.isArray(target)) {
            return target.concat(source)
          }
        })
      } catch (error) {
        mergeErrors.push(`Failed to merge snippet ${snippet.id}`)
      }
    }

    return { configuration, mergeErrors }
  }
}
