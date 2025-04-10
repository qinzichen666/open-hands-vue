<template>
  <Markdown :content="content" />
</template>

<script setup>
import { computed } from 'vue'
import Markdown from '@/components/markdown/index.vue'

const props = defineProps({
  message: {
    type: Object,
    required: true
  }
})

const content = computed(() => {
  return props.message.message
})

</script>

<style lang="scss" scoped>
code {
  max-width: 600px;
}
</style>
