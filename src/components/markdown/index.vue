<template>
  <div>
    <div v-html="renderMarkdown(content)"></div>
  </div>
</template>

<script setup>
import { renderMarkdown } from '@/utils/markdown'

const props = defineProps({
  content: {
    type: String,
    required: true
  }
})

</script>

<style lang="scss" scoped></style>