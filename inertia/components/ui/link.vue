<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import { tw } from '~/utils/tw'

defineProps<{ href: string; external?: boolean }>()

const classes = tw`text-blue-500 hover:text-blue-700`
</script>

<template>
  <Link v-if="!external" :href v-bind="$attrs" :class="classes">
    <slot />
  </Link>
  <a v-else :href v-bind="$attrs" :class="classes">
    <slot />
  </a>
</template>
