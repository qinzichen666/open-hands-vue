<template>
  <div class="message-content" :class="messageType">
    <template v-if="messageType">
      <Observation :message="message" v-if="messageType === 'observation'" />
      <Action :message="message" v-if="messageType === 'action'" />
      <Message :message="message" v-if="messageType === 'message'" />
    </template>

    <template v-else>
      <code class="message-text">{{ JSON.stringify(message, null, 2) }}</code>
      <div class="thought" v-if="message.args?.thought">{{ message.args?.thought }}</div>
      <div class="message-text">{{ message.message }}</div>
    </template>

    <div class="copy-button" @click="copyMessage">
      <CopyOutlined />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Observation from './Observation.vue';
import Action from './Action.vue';
import Message from './Message.vue';
import { message as messageUtil } from 'ant-design-vue';
import { CopyOutlined } from '@ant-design/icons-vue';

const props = defineProps({
  message: {
    type: Object,
    required: true
  }
})

const messageType = computed(() => {
  const message = props.message;
  if (message.action === 'message') {
    return 'message'
  }
  if (message.observation) {
    return 'observation'
  }
  if (message.action) {
    return 'action'
  }
  return ''
});

const copyMessage = () => {
  const messageStr = JSON.stringify(props.message, null, 2);
  navigator.clipboard.writeText(messageStr).then(() => {
    messageUtil.success('复制成功')
  }).catch(err => {
    console.error('Failed to copy:', err);
  });
};
</script>

<style lang="scss" scoped>
.message-content {
  max-width: 600px;
  background: #fff;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  position: relative;
  word-wrap: break-word;
  overflow-wrap: break-word;

  &.action {
    border: none;
    box-shadow: none;
    background: transparent;
    max-width: 100%;
    padding-left: 0;
  }

  &:hover {
    padding-right: 40px;

    .copy-button {
      display: block;
    }
  }
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

.copy-button {
  display: none;
  position: absolute;
  right: 8px;
  bottom: 8px;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #999;
  transition: color 0.2s;

  &:hover {
    color: #666;
  }

  .icon-copy {
    font-size: 16px;
  }
}
</style>