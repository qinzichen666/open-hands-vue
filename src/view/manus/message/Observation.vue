<template>
  <div class="observation">
    <div class="observation-header" @click="togglePreview">
      <div class="command-preview">{{ command }}</div>
      <!-- <span class="expand-icon">{{ isExpanded ? '▼' : '▶' }}</span> -->
      <EyeOutlined />
    </div>
    <div class="observation-details" v-if="false">
      <div class="command-output">{{ information }}</div>
      <pre class="command-output">{{ props.message.content }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import emitter from '@/utils/emitter'
import { ProfileOutlined, EyeOutlined } from '@ant-design/icons-vue'
const props = defineProps({
  message: {
    type: Object,
    required: true
  }
})

const isExpanded = ref(false)

const actionTypeDescriptions = {
  'run': '执行 bash 命令',
  'read': '读取文件',
  // 'edit': '编辑文件',
  'edit': 'Edited the contents of a file',
  'browse': '浏览网页',
}
const keyHash = {
  'run': 'command',
  'read': 'path',
  'edit': 'diff',
  'browse': 'url',
}

const command = computed(() => {
  const observation = props.message.observation;
  if (observation === 'think') {
    return props.message.content;
  }
  return `${actionTypeDescriptions[observation]}`
})

const information = computed(() => {
  const observation = props.message.observation
  const key = keyHash[observation]
  return props.message.extras[key]
})

const togglePreview = () => {
  let previewType = 'code';
  let content = information.value;
  const extras = props.message.extras;
  if (props.message.observation === 'browse') {
    previewType = 'image'
    content = extras.screenshot
  }
  emitter.emit('preview', { previewType, content })
}
</script>

<style lang="scss" scoped>
.observation {
  max-width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 8px 0;

  .observation-header {
    min-width: 200px;
    padding: 8px 12px;
    background-color: #f5f5f5;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
      background-color: #eee;
    }
  }

  .command-preview {
    font-family: monospace;
    margin-right: 12px;
  }

  .expand-icon {
    font-size: 12px;
    color: #666;
  }

  .observation-details {
    padding: 12px;
    background-color: #fff;

    .command-output {
      margin: 0;
      white-space: pre-wrap;
      font-family: monospace;
      font-size: 14px;
    }
  }
}
</style>