import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, manyToMany } from '@adonisjs/lucid/orm'
import logger from '@adonisjs/core/services/logger'
import { randomUUID } from 'node:crypto'
import SnippetSubscription from './snippet_subscription.js'
import Snippet from './snippet.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class User extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  // @column({ serializeAs: null })
  // declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @manyToMany(() => Snippet, { pivotTable: 'snippet_subscriptions' })
  declare subscribedSnippets: ManyToMany<typeof Snippet>

  @beforeCreate()
  static assignUuid(user: User) {
    user.id = randomUUID()
  }

  async subscribeToSnippet(snippet: Snippet) {
    const newSubscription = new SnippetSubscription()
    newSubscription.user_id = this.id
    newSubscription.snippet_id = snippet.id
    try {
      return await newSubscription.save()
    } catch (error) {
      logger.error({ err: error }, `User ${this.id} failed to subscribe to snippet ${snippet.id} `)
    }
  }

  async unsubscribeFromSnippet(snippet: Snippet) {
    return await SnippetSubscription.query()
      .where('user_id', this.id)
      .where('snippet_id', snippet.id)
      .delete()
  }
}
