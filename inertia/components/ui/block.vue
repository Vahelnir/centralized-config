<template>
  <section>
    <h1 class="text-2xl my-2" v-if="$slots.title">
      <slot name="title" />
    </h1>

    <slot />
  </section>
</template>
