<script setup lang="ts">
import { useTemplateRef, watch } from 'vue'

const model = defineModel<string>()

const jsonEditor = useTemplateRef('json_editor')

watch(jsonEditor, async (newEl, _, onCleanup) => {
  if (!newEl) return

  // NOTE: done like this to avoid an issue with SSR. Need to investigate performance implications
  // FIX: at least transform this into a memoized function
  const monaco = await import('monaco-editor/esm/vs/editor/editor.api')

  const editorInstance = monaco.editor.create(newEl, {
    value: model.value,
  })

  editorInstance.onDidChangeModelContent(() => {
    model.value = editorInstance.getValue()
  })

  onCleanup(() => {
    editorInstance.dispose()
  })
})
</script>

<template>
  <div class="border border-gray-400 rounded">
    <div ref="json_editor" class="h-[400px]"></div>
  </div>
</template>
