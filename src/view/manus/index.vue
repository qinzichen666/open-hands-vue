<template>
  <div class="manus-container">
    <!-- <ConversationSidebar :chats="conversations" /> -->
    <Sidebar />
    <ChatPanel />
    <Preview />
    <Terminal />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import Sidebar from './sidebar/index.vue'
import ChatPanel from './components/ChatPanel.vue'
import Preview from '@/components/preview/index.vue'
import Terminal from '@/components/terminal/index.vue'
import { useRoute } from 'vue-router';
const route = useRoute();

import { useChatStore } from '@/store/modules/chat';
const chatStore = useChatStore();

const init = async () => {
  await chatStore.init();
}
init();

watch(() => route.params.id, (newId, oldId) => {
  console.log('connect to conversation', newId);
  if (newId) {
    chatStore.initConversation(newId);
  }
}, { immediate: true });

onMounted(() => {
  init();
});

onUnmounted(() => {

});
</script>

<style lang="scss" scoped>
.manus-container {
  display: flex;
  width: 100%;
  height: 100vh;
  background: #fff;
}
</style>