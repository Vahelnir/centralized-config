import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

function json(value: unknown, _options: undefined, field: FieldContext) {
  if (typeof value !== 'string') {
    return
  }

  try {
    JSON.parse(value)
  } catch (error) {
    field.report('The {{ field }} field must be a valid JSON string', 'json', field)
  }
}

export const jsonRule = vine.createRule(json)
