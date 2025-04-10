<template>
  <div class="default-model">
    <h2>默认模型</h2>
    <div class="model-card">
      <p>当前默认模型: GPT-4</p>
      <a-button type="primary">更换模型</a-button>
    </div>
    <div class="model-card">
      <p>模型参数设置</p>
      <a-slider v-model:value="temperature" :min="0" :max="1" :step="0.1" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const temperature = ref(0.7)
// 可添加更多响应式逻辑
</script>

<style scoped>
.default-model {
  padding: 16px;
}
.model-card {
  margin: 16px 0;
  padding: 16px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}
</style>