<template>
  <div class="welcome-screen">
    <div class="welcome-content">
      <h1>你好，{{ username }}</h1>
      <p>我能为你做什么？</p>

      <ChatInput @send="handleWelcomeInput" />

      <div class="category-tabs">
        <a href="#" class="tab active">精选</a>
        <a href="#" class="tab">研究</a>
        <a href="#" class="tab">生活</a>
        <a href="#" class="tab">数据分析</a>
        <a href="#" class="tab">教育</a>
        <a href="#" class="tab">生产力</a>
        <a href="#" class="tab">这也行</a>
      </div>
      <Suggestion />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Suggestion from './Suggestion.vue';
import ChatInput from './ChatInput.vue';
import { useChatStore } from '@/store/modules/chat';
const chatStore = useChatStore();

import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps({
  username: String
});

const handleWelcomeInput = async (value) => {
  console.log('handleWelcomeInput', value);
  const { text } = value;
  const result = await chatStore.createConversation(text);
  console.log('createConversation', result);
  const { conversation_id } = result;
  if (conversation_id) {
    router.push(`/manus/${conversation_id}`);
  }
};

</script>

<style lang="scss" scoped>
.welcome-screen {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 40px;
  position: relative;
}

.welcome-content {
  max-width: 800px;
  margin: 0 auto;
  width: 100%;

  h1 {
    font-size: 24px;
    margin-bottom: 8px;
    color: #333;
    font-weight: 500;
  }

  p {
    color: #666;
    margin-bottom: 24px;
    font-size: 16px;
  }
}

.welcome-input-container {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 8px;
  padding: 10px 16px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
}

.welcome-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  color: #333;
  padding: 8px 0;

  &::placeholder {
    color: #999;
  }
}

.input-tools {
  display: flex;
  align-items: center;
  margin-right: 12px;
}

.tool-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #333;
  }
}

.divider {
  width: 1px;
  height: 16px;
  background: #e0e0e0;
  margin: 0 8px;
}

.send-button {
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border: none;
  border-radius: 4px;
  padding: 6px 10px;
  font-size: 14px;
  color: #666;
  cursor: pointer;

  .arrow-icon {
    margin-left: 6px;
  }

  &:hover {
    background: #e9e9e9;
  }
}

.category-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 12px;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.tab {
  padding: 6px 12px;
  border-radius: 16px;
  color: #666;
  text-decoration: none;
  font-size: 14px;
  white-space: nowrap;

  &:hover {
    background: #f5f5f5;
  }

  &.active {
    background: #000;
    color: #fff;
  }
}
</style>