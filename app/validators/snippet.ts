import vine from '@vinejs/vine'

export const createSnippetValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(4),
    content: vine.string().trim(),
  })
)
