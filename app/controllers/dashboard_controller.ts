import { HttpContext } from '@adonisjs/core/http'
import { mergeWith } from 'es-toolkit'

export default class DashboardController {
  async index_view({ inertia, auth }: HttpContext) {
    const user = auth.getUserOrFail()
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
    return inertia.render('home', {
      configuration,
      mergeErrors,
    })
  }
}
