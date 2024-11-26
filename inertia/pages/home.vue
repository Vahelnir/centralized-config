<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import Link from '~/components/ui/link.vue'
import Block from '~/components/ui/block.vue'
import { useUser } from '~/composables/use_user'
import { rpc } from '~/rpc'

const user = useUser()
</script>

<template>
  <Head title="Accueil" />

  <Block>
    Bonjour {{ user.fullName }} !
    <Link :href="rpc.$url('auth.logout')">Se déconnecter</Link>
  </Block>

  <Block>
    <template #title> Configuration </template>

    <Link :href="rpc.$url('snippets.index')">Composer ma configuration</Link>
    |
    <Link href="#">Voir ma configuration</Link>

    <p>Lien vers ma configuration: TBD</p>
  </Block>
</template>
