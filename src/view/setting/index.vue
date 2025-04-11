<template>
  <div class="setting-container">
    <!-- Top Navigation Bar -->
    <div class="top-bar">
<<<<<<< HEAD
      <a-button type="text" @click="$router.back()">
=======
      <a-button type="text" @click="back">
>>>>>>> main
        <template #icon>
          <arrow-left-outlined />
        </template>
        返回
      </a-button>
    </div>

    <!-- Main Content Area -->
    <div class="main-content">
      <!-- Left Menu Sidebar -->
      <div class="menu-side">
        <setting-menu />
      </div>
      
      <!-- Right Content Area -->
      <div class="content-side">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowLeftOutlined } from '@ant-design/icons-vue'
import SettingMenu from './MenuSide.vue'

import { useRouter } from 'vue-router'
const router = useRouter()

const back = () => {
  router.push('/')
}

</script>

<style scoped>
.setting-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.top-bar {
  height: 60px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
  flex-shrink: 0;
}

.main-content {
  display: flex;
  flex: 1;
  min-height: 0;
}

.menu-side {
  width: 240px;
  border-right: 1px solid #f0f0f0;
  overflow-y: auto;
}

.content-side {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}
</style>