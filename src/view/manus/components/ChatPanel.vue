<template>
  <div class="chat-panel">
    <template v-if="conversationId">
      <!-- <a-button @click="viewEvents">查看日志</a-button> -->
      <ChatHeader :title="currentChat?.title" @share="handleShare" />
      <ChatMessages :messages="messages" />
      <ChatInput @send="handleSendMessage" />
    </template>
    <Welcome v-else :username="username" />
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import ChatHeader from './ChatHeader.vue'
import ChatMessages from './ChatMessages.vue'
import ChatInput from './ChatInput.vue'
import { useChatStore } from '@/store/modules/chat';
const chatStore = useChatStore();

import { useRoute } from 'vue-router'
const route = useRoute();
import Welcome from './Welcome.vue';

// 发送消息
const handleSendMessage = (value) => {
  const { text, mode } = value
  console.log('发送消息', text);
  chatStore.sendMessage(text);
}

const conversationId = ref(route.params.id);
watchEffect(() => {
  console.log('conversationId', route.params.id);
  conversationId.value = route.params.id;
})

// src/context/ws-client-provider.tsx
const currentChat = computed(() => chatStore.chat)
const username = ref('yi bo')  // 这里可以从用户状态获取
const inputText = ref('')
const messages = computed(() => chatStore.messages)

const viewEvents = () => {
  // 从 store 获取 events 数据
  const events = chatStore.events;
  // 将数据转换为 JSON 字符串，使用缩进格式化
  const json = JSON.stringify(events, null, 2);
  // 创建 Blob 对象
  const blob = new Blob([json], { type: 'application/json' });
  // 创建下载链接
  const url = URL.createObjectURL(blob);
  // 创建一个临时的 a 标签用于下载
  const link = document.createElement('a');
  link.href = url;
  link.download = `chat-events-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
  // 添加到文档中并触发点击
  document.body.appendChild(link);
  link.click();
  // 清理
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

const showConfirm = ref(false)

const handleShare = () => {
  // 处理分享逻辑
}

const handleWelcomeInput = () => {
  showConfirm.value = true;
}

const handleAcceptConfirm = () => {
  showConfirm.value = false
  // 创建新的对话
  currentChat.value = {
    id: Date.now(),
    title: inputText.value
  }

  // 初始化对话消息
  messages.value = [{
    id: Date.now(),
    type: 'user',
    sender: username.value,
    content: inputText.value,
    time: new Date().toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }]

  // 清空输入
  inputText.value = ''
}

const handleRejectConfirm = () => {
  showConfirm.value = false
}

</script>

<style lang="scss" scoped>
.chat-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 1024px;
  margin: 0 auto;
}
</style>