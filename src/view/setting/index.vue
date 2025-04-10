<template>
  <div class="setting-container">
    <MenuSide v-model:activeMenu="activeMenu" />
    <ContentSide :active-menu="activeMenu" />
  </div>
</template>

<script>
import { ref } from 'vue'
import MenuSide from './MenuSide.vue'
import ContentSide from './ContentSide.vue'

export default {
  name: 'SettingPage',
  components: { MenuSide, ContentSide },
  setup() {
    const activeMenu = ref('basic')
    return { activeMenu }
  }
}
</script>

<style scoped>
.setting-container {
  display: flex;
  height: 100%;
  background: #f5f5f5;
  padding: 16px;
}
</style>