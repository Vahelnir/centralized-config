<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import Block from '~/components/ui/block.vue'
import Link from '~/components/ui/link.vue'
import { rpc } from '~/rpc'
</script>

<template>
  <Head title="Connexion" />

  <Block>
    <template #title> Connexion </template>

    <Link :href="rpc.$url('auth.google')" external>S'authentifier avec Google</Link>
  </Block>
</template>
