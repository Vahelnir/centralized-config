<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import Block from '~/components/ui/block.vue'
import Button from '~/components/ui/button.vue'
import { rpc } from '~/rpc'
</script>

<template>
  <Head title="Connexion" />

  <Block>
    <template #title> Connexion </template>

    <a :href="rpc.$url('auth.google')">
      <Button variant="primary">Connexion avec Google</Button>
    </a>
  </Block>
</template>
