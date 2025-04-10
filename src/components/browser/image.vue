<template>
  <div class="image-container">
    <img :src="content" alt="Base64 image" />
  </div>
</template>

<script setup>
const props = defineProps({
  content: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.image-container {
  width: 100%;
  display: flex;
  justify-content: center;

  img {
    max-width: 100%;
    height: auto;
    object-fit: contain;
  }
}
</style>