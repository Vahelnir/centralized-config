<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
import Block from '~/components/ui/block.vue'
import Input from '~/components/ui/input.vue'
import Textarea from '~/components/ui/textarea.vue'
import { rpc } from '~/rpc'

const form = useForm({
  name: '',
  content: '',
})
</script>

<template>
  <Block>
    <template #title> Créer un snippet </template>

    <form @submit.prevent="form.post(rpc.$url('snippets.create'))" class="flex flex-col">
      <label class="flex flex-col py-2">
        Nom du snippet:
        <Input type="text" v-model="form.name" placeholder="Nom du snippet" />
        <div class="text-red-500" v-if="form.errors.name">{{ form.errors.name?.[0] }}</div>
      </label>
      <label class="flex flex-col py-2">
        Contenu du snippet:
        <Textarea name="content" id="content" v-model="form.content"></Textarea>
        <div class="text-red-500" v-if="form.errors.content">{{ form.errors.content?.[0] }}</div>
      </label>

      <button
        type="submit"
        class="bg-green-500 hover:bg-green-400 rounded py-2 px-4"
        :disabled="form.processing"
      >
        Créer
      </button>
    </form>
  </Block>
</template>
