import type Snippet from '#models/snippet'

export class SnippetDto {
  constructor(private snippet: Snippet) {}

  toJSON() {
    return {
      id: this.snippet.id,
      name: this.snippet.name,
      content: this.snippet.content,
      // NOTE: toISO() returns string or null for some reason
      createdAt: this.snippet.createdAt.toJSDate().toISOString(),
      updatedAt: this.snippet.updatedAt.toJSDate().toISOString(),
    }
  }
}
