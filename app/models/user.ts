import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, manyToMany } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
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
}
