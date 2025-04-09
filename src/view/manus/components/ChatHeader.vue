<template>
  <div class="chat-header">
    <div class="header-left">
      <h1 class="chat-title">{{ title }}</h1>
    </div>

    <div class="header-right">
      <div class="status-indicator">
        {{ agent.status }}
      </div>
      <a-button type="primary" @click="$emit('share')">
        分享
      </a-button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

import { useChatStore } from '@/store/modules/chat'
import { storeToRefs } from 'pinia'
const chatStore = useChatStore()
const { agent } = storeToRefs(chatStore)

const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})

defineEmits(['share'])

</script>

<style lang="scss" scoped>
.chat-header {
  height: 64px;
  padding: 0 24px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
}

.chat-title {
  font-size: 16px;
  font-weight: 500;
  color: #1f2329;
  margin: 0;
}

.header-right {
  display: flex;
  gap: 12px;
}

.action-btn {
  padding: 6px 12px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  background: transparent;
  color: #1f2329;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    background: #f5f5f5;
  }

  i {
    font-size: 16px;
  }
}

.status-indicator {
  padding: 4px 16px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  background-color: #e0e0e0;
  color: #757575;

}
</style>