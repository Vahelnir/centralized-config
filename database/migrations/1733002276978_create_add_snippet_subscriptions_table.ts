import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'snippet_subscriptions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('user_id').notNullable()
      table.uuid('snippet_id').notNullable()

      table.primary(['user_id', 'snippet_id'])

      table.foreign('user_id').references('users.id').onDelete('CASCADE')
      table.foreign('snippet_id').references('snippets.id').onDelete('CASCADE')

      table.timestamp('created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
