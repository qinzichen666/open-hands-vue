<template>
  <MarkMap :markdown="markdown" />
</template>

<script setup>
import { ref } from "vue";
import MarkMap from "@/components/mindmap/MarkMap.vue";

const markdown = ref(`
# Vue3 学习笔记
## 组合式 API
### setup
### ref/reactive
### computed/watch
## 生命周期
### onMounted
### onUpdated
### onUnmounted
`);
</script>