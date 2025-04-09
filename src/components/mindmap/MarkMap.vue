<template>
  <svg ref="svgRef" style="width: 100%; height: 100%"></svg>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { Markmap } from 'markmap-view'
import { Transformer } from 'markmap-lib'

const props = defineProps({
  markdown: {
    type: String,
    required: true
  },
  options: {
    type: Object,
    default: () => ({})
  }
})

const svgRef = ref(null)
const markmap = ref(null)
const transformer = new Transformer()

// 初始化 markmap
const initMarkmap = () => {
  if (!svgRef.value) return

  markmap.value = Markmap.create(svgRef.value, {
    // 默认配置
    embedGlobalCSS: true,
    duration: 500,
    nodeMinHeight: 24,
    spacingVertical: 8,
    spacingHorizontal: 80,
    autoFit: true,
    color: (node) => {
      return node.depth % 2 ? '#4B5563' : '#1F2937'
    },
    // 合并用户自定义配置
    ...props.options
  })
}

// 渲染 markdown 内容
const renderMarkdown = () => {
  if (!markmap.value) return

  const { root } = transformer.transform(props.markdown)
  markmap.value.setData(root)
  markmap.value.fit() // 自适应视图
}

// 监听 markdown 内容变化
watch(() => props.markdown, () => {
  renderMarkdown()
})

// 组件挂载后初始化
onMounted(() => {
  initMarkmap()
  renderMarkdown()
})
</script>
