<script setup lang="ts">
import type SnippetsController from '#controllers/snippets_controller'
import type { InferPageProps } from '@adonisjs/inertia/types'
import { Link, router } from '@inertiajs/vue3'
import Block from '~/components/ui/block.vue'
import Button from '~/components/ui/button.vue'
import { rpc } from '~/rpc'
import { ref, watch } from 'vue'
import Toggle from '~/components/ui/toggle.vue'

const props = defineProps<{
  items: InferPageProps<SnippetsController, 'index_view'>['items']
  subscriptions: InferPageProps<SnippetsController, 'index_view'>['subscriptions']
}>()

watch(
  props,
  () => {
    console.log('props', props.subscriptions)
  },
  { immediate: true }
)

function deleteSnippet(id: string) {
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce snippet ?')) {
    return
  }

  const deleteUrl = rpc.$url('snippets.delete', { params: { id } })
  router.delete(deleteUrl, { only: ['items'] })
}

const disableSubscriptionToggle = ref(false)

function subscribe(snippetId: string) {
  const subscribeUrl = rpc.$url('snippets.subscribe', {
    params: { id: snippetId },
  })
  router.post(subscribeUrl, undefined, {
    only: ['subscriptions'],
    onFinish() {
      disableSubscriptionToggle.value = false
    },
  })
}

function unsubscribe(snippetId: string) {
  const unsubscribeUrl = rpc.$url('snippets.unsubscribe', {
    params: { id: snippetId },
  })
  router.post(unsubscribeUrl, undefined, {
    only: ['subscriptions'],
    onFinish() {
      disableSubscriptionToggle.value = false
    },
  })
}

function toggleSubscription(snippetId: string, currentSubscriptionState?: boolean) {
  disableSubscriptionToggle.value = true
  if (!currentSubscriptionState) {
    return subscribe(snippetId)
  }

  return unsubscribe(snippetId)
}
</script>

<template>
  <Link :href="rpc.$url('home')">
    <Button variant="link"><- Vers la dashboard</Button>
  </Link>

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
          <Toggle
            :disabled="disableSubscriptionToggle"
            :checked="subscriptions[item.id]"
            static
            @update:checked="toggleSubscription(item.id, subscriptions[item.id])"
          />
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
