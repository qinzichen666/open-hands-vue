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

        <div class="message-content">
          <div class="thought" v-if="message.args?.thought">{{ message.args?.thought }}</div>

          <div class="message-text">{{ message.message }}</div>
          <template v-if="message.content">
            <code><pre>{{ message.content }}</pre></code>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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

.message-content {
  background: #fff;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.message-sender {
  font-size: 14px;
  font-weight: 500;
  color: #1f2329;
  margin-bottom: 4px;
}

.message-text {
  font-size: 14px;
  color: #1f2329;
  line-height: 1.5;
  white-space: pre-wrap;
}

.message-time {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}
</style>