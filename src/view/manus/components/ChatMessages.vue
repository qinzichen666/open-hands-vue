<template>
  <div class="chat-messages">
    <div class="message-list">
      <div v-for="message in messages" :key="message.id" class="message-item" :class="message.role">
        <div class="message-avatar">
          <img :src="message.avatar" alt="avatar" v-if="message.avatar">
          <div class="avatar-placeholder" v-else>
            {{ message.role === 'user' ? 'U' : 'A' }}
          </div>
        </div>
        <Message :message="message" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Message from '../message/index.vue';

defineProps({
  messages: {
    type: Array,
    default: () => []
  }
})

</script>

<style lang="scss" scoped>
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  background: #f7f8fa;
}

.message-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.message-item {
  display: flex;
  gap: 12px;
  max-width: 80%;

  &.assistant {
    align-self: flex-start;
  }

  &.user {
    align-self: flex-end;
    flex-direction: row-reverse;

    .message-content {
      background: #e6f4ff;
    }
  }
}

.message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .avatar-placeholder {
    width: 100%;
    height: 100%;
    background: #e6e6e6;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    font-weight: 500;
  }
}
</style>