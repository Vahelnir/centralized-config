<script setup lang="ts">
defineProps<{
  variant: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'link'
  as?: string
}>()
</script>

<template>
  <button
    :data-variant="variant"
    type="submit"
    class="bg-green-500 hover:bg-green-400 rounded py-2 px-4"
  >
    <slot />
  </button>
</template>

<style scoped>
/* Variants */
[data-variant='primary'] {
  @apply bg-blue-500 hover:bg-blue-400 text-white;
}

[data-variant='secondary'] {
  @apply bg-gray-500 hover:bg-gray-400;
}

[data-variant='danger'] {
  @apply bg-red-500 hover:bg-red-400 text-white;
}

[data-variant='success'] {
  @apply bg-green-500 hover:bg-green-400 text-white;
}

[data-variant='warning'] {
  @apply bg-yellow-500 hover:bg-yellow-400;
}

[data-variant='info'] {
  @apply bg-blue-500 hover:bg-blue-400 text-white;
}

[data-variant='link'] {
  @apply text-blue-500 hover:text-blue-700 border-b border-blue-500 hover:border-blue-700 p-0 rounded-none;
  background-color: transparent;
  color: #3490dc;
}
</style>
