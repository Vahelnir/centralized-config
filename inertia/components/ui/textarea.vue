<script setup lang="ts">
const model = defineModel<string | number | readonly string[] | null | undefined>()
</script>

<template>
  <textarea v-model="model" v-bind="$attrs" class="border border-gray-400 rounded px-4 py-2" />
</template>
