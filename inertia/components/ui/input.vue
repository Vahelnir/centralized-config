<script setup lang="ts">
const model = defineModel<unknown>()
</script>

<template>
  <input v-model="model" v-bind="$attrs" class="border border-gray-400 rounded px-4 py-2" />
</template>
