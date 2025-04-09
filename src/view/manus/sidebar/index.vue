<template>
  <div class="sidebar" :class="{ 'collapsed': isCollapsed }">
    <Header @toggleCollapse="toggleCollapse" />

    <div class="sidebar-content">
      <button class="new-task-button" @click="newChat">
        <span class="plus-icon">+</span>
        <span class="button-text">新建任务</span>
        <span class="shortcut">⌘ K</span>
      </button>

      <div class="chat-list">
        <div v-for="chat in chatStore.list" :key="chat.conversation_id" class="chat-item"
          :class="{ 'active': chat.conversation_id === conversationId }" @click="setActiveChat(chat)">
          <div class="chat-icon" :class="chat.iconStyle">
            {{ chat.icon }}
          </div>
          <div class="chat-details">
            <div class="chat-header">
              <div class="chat-title">{{ chat.title }}</div>
              <div class="chat-time">{{ chat.time }}</div>
            </div>
            <div class="chat-preview">{{ chat.preview }}</div>
          </div>
          <div class="delete-button" @click.stop="showDeleteConfirm(chat)">
            <DeleteOutlined />
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>

  <a-modal v-model:visible="deleteModalVisible" title="确认删除" @ok="handleDelete" @cancel="handleCancel">
    <p>确定要删除这个对话吗？</p>
  </a-modal>
</template>

<script setup>
import { ref } from 'vue';
import Header from './Header.vue';
import Footer from './Footer.vue';
import { DeleteOutlined } from '@ant-design/icons-vue';

import { storeToRefs } from 'pinia';
const isCollapsed = ref(false);
import { useChatStore } from '@/store/modules/chat';
const chatStore = useChatStore();

import { useRouter } from 'vue-router';
const router = useRouter();

const { conversationId } = storeToRefs(chatStore);
const props = defineProps({
  chats: {
    type: Array,
    default: () => []
  }
});

const newChat = () => {
  console.log('newChat');
  router.push('/manus');
};

const setActiveChat = (chat) => {
  conversationId.value = chat.conversation_id;
  router.push(`/manus/${chat.conversation_id}`);
};

// 切换侧边栏展开/收起状态
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};

const deleteModalVisible = ref(false);
const chatToDelete = ref(null);

const showDeleteConfirm = (chat) => {
  chatToDelete.value = chat;
  deleteModalVisible.value = true;
};

const handleDelete = async () => {
  if (chatToDelete.value) {
    try {
      await chatStore.removeConversation(chatToDelete.value.conversation_id);
      deleteModalVisible.value = false;
      chatToDelete.value = null;
      router.push('/manus');
    } catch (error) {
      console.error('Failed to delete conversation:', error);
    }
  }
};

const handleCancel = () => {
  deleteModalVisible.value = false;
  chatToDelete.value = null;
};

</script>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  width: 380px;
  height: 100vh;
  background-color: #f5f5f5;
  transition: width 0.3s ease;
  overflow: hidden;

  &.collapsed {
    width: auto;

    .button-text,
    .chat-details,
    .user-name,
    .shortcut {
      display: none;
    }

    .chat-icon {
      margin-right: 0;
    }

    .new-task-button,
    .chat-item {
      justify-content: center;
      padding: 10px;
    }

    .sidebar-footer {
      justify-content: center;
    }

    .footer-actions {
      display: none;
    }
  }
}


.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 5px;
  }
}

.new-task-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 8px;
  background-color: white;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  color: #333;
  font-weight: 500;
  margin-bottom: 8px;

  &:hover {
    background-color: #fafafa;
  }

  .plus-icon {
    font-size: 16px;
    margin-right: 8px;
  }

  .shortcut {
    font-size: 12px;
    color: #999;
    background-color: #f5f5f5;
    padding: 2px 6px;
    border-radius: 4px;
  }
}

.chat-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.chat-item {
  display: flex;
  align-items: flex-start;
  padding: 12px 16px;
  border-radius: 8px;
  background-color: white;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: #f9f9f9;
  }

  &.active {
    background-color: rgba(0, 102, 255, 0.05);
    border: 1px solid rgba(0, 102, 255, 0.2);
  }

  .delete-button {
    display: none;
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
    cursor: pointer;
    padding: 4px;

    &:hover {
      color: #ff4d4f;
    }
  }

  &:hover .delete-button {
    display: block;
  }
}

.chat-icon {
  margin-right: 12px;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;

  &.blue-bg {
    background-color: #0066ff;
    color: white;
  }

  &.gray-bg {
    background-color: #333;
    color: white;
  }
}

.chat-details {
  flex: 1;
  min-width: 0;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.chat-title {
  font-weight: 500;
  font-size: 14px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chat-time {
  font-size: 12px;
  color: #999;
  white-space: nowrap;
  margin-left: 8px;
}

.chat-preview {
  font-size: 12px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sidebar-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-top: 1px solid #e0e0e0;
  background-color: white;
}
</style>