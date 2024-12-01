import vine from '@vinejs/vine'
import { jsonRule } from './rules/json.js'

const snippetFields = vine.object({
  name: vine.string().trim().minLength(4),
  description: vine.string().trim().minLength(4),
  content: vine.string().minLength(2).use(jsonRule()).trim(),
})

export const createSnippetPayloadValidator = vine.compile(snippetFields)

export const updateSnippetRequestValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.string().uuid(),
    }),
  })
)

export const deleteSnippetRequestValidator = updateSnippetRequestValidator

export const subscribeSnippetRequestValidator = updateSnippetRequestValidator

export const updateSnippetPayloadValidator = vine.compile(snippetFields)
