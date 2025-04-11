<template>
  <div class="preview-container" v-show="preview">
    <!-- 头部标题栏 -->
    <div class="preview-header">
      <div class="title">{{ title }}</div>
      <div class="close-btn" @click="handleClose">
        <CloseOutlined />
      </div>
    </div>
    <!-- 内容区域 -->
    <div class="preview-content">
      <Markdown v-if="type === 'markdown'" :content="content" />
      <code v-if="type === 'code'">
        <pre>{{ content }}</pre>
      </code>
      <BrowserImage v-if="type === 'image'" :content="content" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Markdown from '@/components/markdown/index.vue'
import emitter from '@/utils/emitter'
import { CloseOutlined } from '@ant-design/icons-vue'
import BrowserImage from '@/components/browser/image.vue'

const preview = ref(false);
const type = ref('');
const content = ref('');

emitter.on('preview', (event) => {
  const { previewType = 'markdown', content: information } = event;
  preview.value = true;
  type.value = previewType;
  content.value = information;
})

defineProps({
  title: {
    type: String,
    default: '预览'
  }
})

const emit = defineEmits(['close'])

const handleClose = () => {
  preview.value = false;
}
</script>

<style lang="scss" scoped>
.preview-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 20px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

  .preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #eee;

    .title {
      font-size: 16px;
      font-weight: 500;
    }

    .close-btn {
      cursor: pointer;
      padding: 4px;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  .preview-content {
    flex: 1;
    padding: 16px;
    overflow-y: auto;
  }
}
</style>