<template>
  <div class="chat-input">
    <div class="input-wrapper">
      <div class="input-area">
        <div class="input-container">
          <a-textarea v-model:value="messageText" :placeholder="placeholder" :auto-size="{ minRows: 2, maxRows: 6 }"
            @keydown="keydown" />
          <div class="input-actions">
            <div class="left-actions">
              <a-upload v-model:file-list="fileList" :before-upload="beforeUpload" :max-count="3"
                :show-upload-list="false">
                <a-button type="text">
                  <template #icon>
                    <PaperClipOutlined />
                  </template>
                </a-button>
              </a-upload>
            </div>
            <a-button type="primary" @click="handleSend">
              <template #icon>
                <SendOutlined />
              </template>
              发送
            </a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { PaperClipOutlined, SendOutlined } from '@ant-design/icons-vue'

const messageText = ref('')
const placeholder = ref('给 Manus 一个任务...')
const currentMode = ref('text')
const fileList = ref([])

const emit = defineEmits(['send'])

const handleSend = () => {
  const text = messageText.value.trim()
  if (text || fileList.value.length > 0) {
    emit('send', {
      text,
      mode: currentMode.value,
      files: fileList.value
    })
    messageText.value = ''
    fileList.value = []
  }
}

const beforeUpload = (file) => {
  fileList.value = [...fileList.value, file]
  return false
}

//输入框键盘事件
const keydown = (e) => {
  if (e.shiftKey && e.key === "Enter") {
    return;
  }
  if (e.isComposing && e.key === 'Enter') {
    e.preventDefault();
    return;
  }
  if (e.key === "Enter") {
    e.preventDefault();
    handleSend();
  }
};
</script>

<style lang="scss" scoped>
.chat-input {
  padding: 30px 0;
  background: #fff;
}

.input-wrapper {
  margin: 0 auto;
  width: 100%;
}

.input-area {
  display: flex;
  gap: 0;
  align-items: flex-end;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  padding: 8px;
  transition: border-color 0.3s;

  &:hover {
    border-color: #40a9ff;
  }

  &:focus-within {
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
}

.input-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

:deep(.ant-input) {
  border: none !important;
  box-shadow: none !important;
  padding: 0 8px;

  &:focus {
    box-shadow: none !important;
  }
}

.input-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-actions {
  display: flex;
  gap: 16px;
}

.mode-switcher {
  margin-right: 0;
  border: none;
  box-shadow: none;
}
</style>