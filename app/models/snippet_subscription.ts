import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class SnippetSubscription extends BaseModel {
  @column({ isPrimary: true })
  declare user_id: string

  @column({ isPrimary: true })
  declare snippet_id: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  static findAllByUser(userId: string) {
    return this.query().where('user_id', userId)
  }

  static findAllBySnippet(snippetId: string) {
    return this.query().where('snippet_id', snippetId)
  }
}
