<script setup lang="ts">
import type SnippetsController from '#controllers/snippets_controller'
import type { InferPageProps } from '@adonisjs/inertia/types'
import { Link, router } from '@inertiajs/vue3'
import Block from '~/components/ui/block.vue'
import Button from '~/components/ui/button.vue'
import { rpc } from '~/rpc'

defineProps<{
  items: InferPageProps<SnippetsController, 'index_view'>['items']
}>()

function deleteSnippet(id: string) {
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce snippet ?')) {
    return
  }

  router.delete(rpc.$url('snippets.delete', { params: { id } }), { only: ['items'] })
}
</script>

<template>
  <Block>
    <template #title> Bibliothèque de snippet </template>

    <Link :href="rpc.$url('snippets.create')">
      <Button variant="success">Ajouter un snippet</Button>
    </Link>

    <div class="flex flex-col">
      <div
        v-if="items.length > 0"
        v-for="item of items"
        class="flex border border-gray-400 rounded px-4 py-2 my-2"
      >
        <div class="flex p-2">
          <input type="checkbox" />
        </div>
        <div class="flex flex-col flex-1 p-2 justify-between">
          <h3 class="text-lg font-semibold">
            {{ item.name }}
          </h3>
          <p>
            {{ item.description }}
          </p>
        </div>
        <div class="pt-2">
          <Link
            :href="
              rpc.$url('snippets.edit', {
                params: { id: item.id },
              })
            "
          >
            <Button variant="info" as="span">Modifier</Button>
          </Link>
          <Button variant="danger" @click="deleteSnippet(item.id)">Supprimer</Button>
        </div>
      </div>
      <div v-else>Il n'y a pas de snippet à selectionner :(</div>
    </div>
  </Block>
</template>
