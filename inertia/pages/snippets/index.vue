<script setup lang="ts">
import Block from '~/components/ui/block.vue'
import Link from '~/components/ui/link.vue'
import { rpc } from '~/rpc'

defineProps<{
  items: { id: number; name: string }[]
}>()
</script>

<template>
  <Block>
    <template #title> Bibliothèque de snippet </template>

    <Link :href="rpc.$url('snippets.create')"> Créer un snippet </Link>

    <div class="flex flex-col">
      <div
        v-if="items.length > 0"
        v-for="item of items"
        class="flex border border-gray-400 rounded px-4 py-2 my-2"
      >
        <div class="flex p-2">
          <input type="checkbox" />
        </div>
        <div class="flex flex-1 p-2 justify-between">
          <h3 class="text-lg">
            {{ item.name }}
          </h3>
          <div>
            <Link
              :href="
                rpc.$url('snippets.edit', {
                  params: { id: item.id },
                })
              "
            >
              Modifier
            </Link>
          </div>
        </div>
      </div>
      <div v-else>Il n'y a pas de snippet à selectionner :(</div>
    </div>
  </Block>
</template>
