<script setup lang="ts">
import type DashboardController from '#controllers/dashboard_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Head, Link } from '@inertiajs/vue3'
import { computed } from 'vue'
import Block from '~/components/ui/block.vue'
import Button from '~/components/ui/button.vue'
import { useUser } from '~/composables/use_user'
import { rpc } from '~/rpc'

defineProps<{
  configuration: InferPageProps<DashboardController, 'index_view'>['configuration']
  mergeErrors: InferPageProps<DashboardController, 'index_view'>['mergeErrors']
}>()

const user = useUser()
const configurationLink = computed(() =>
  rpc.$url('configuration', { params: { token: user.value.id } })
)
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

    <p>Lien vers ma configuration: {{ configurationLink }}</p>
    <pre>{{ JSON.stringify(configuration, null, 2) }}</pre>
  </Block>
</template>
