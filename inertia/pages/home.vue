<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import Block from '~/components/ui/block.vue'
import Button from '~/components/ui/button.vue'
import { useUser } from '~/composables/use_user'
import { rpc } from '~/rpc'

const user = useUser()
</script>

<template>
  <Head title="Accueil" />

  <Block>
    Bonjour {{ user.fullName }} !
    <Link :href="rpc.$url('auth.logout')">
      <Button variant="danger">Déconnexion</Button>
    </Link>
  </Block>

  <Block>
    <template #title> Configuration </template>

    <Link :href="rpc.$url('snippets.index')">
      <Button variant="link">Composer ma configuration</Button>
    </Link>
    |
    <Link href="#">
      <Button variant="link">Voir ma configuration</Button>
    </Link>

    <p>Lien vers ma configuration: TBD</p>
  </Block>
</template>
