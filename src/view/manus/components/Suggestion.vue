<template>
  <div class="suggestion-cards">
    <SuggestionCard v-for="card in suggestionCards" :key="card.id" v-bind="card" @click="handleCardClick(card)" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SuggestionCard from './SuggestionCard.vue'

const currentChat = ref(null)

const handleCardClick = (card) => {
  // 点击卡片时创建新对话
  currentChat.value = {
    id: Date.now(),
    title: card.title
  }
}

const suggestionCards = ref([
  {
    id: 1,
    icon: 'icon-japan',
    title: '四月日本之旅',
    description: 'Manus集成全面的旅游信息,制定个性化的行程表,并制作专为您定制的日本旅行计划'
  },
  {
    id: 2,
    icon: 'icon-analysis',
    title: '深度分析特斯拉股票',
    description: 'Manus提供深入的股票分析,通过现代化的引力分析仪表展现特斯拉的技术特点'
  },
  {
    id: 3,
    icon: 'icon-education',
    title: '动量定理互动课程',
    description: 'Manus为中学教育者制作了引人入胜的视频演示,通过演讲增进教育内容'
  },
  {
    id: 4,
    icon: 'icon-report',
    title: '保险资管报告分析',
    description: 'Manus生成清晰、结构化的对比表格,突出关键数据'
  }
])
</script>

<style lang="scss" scoped>
.suggestion-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 16px;
}
</style>