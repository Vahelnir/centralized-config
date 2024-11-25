import vine from '@vinejs/vine'
import { jsonRule } from './rules/json.js'

export const createSnippetValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(4),
    content: vine.string().minLength(2).use(jsonRule()).trim(),
  })
)
