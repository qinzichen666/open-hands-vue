<template>
  <div class="menu-side">
    <div 
      v-for="item in menuItems" 
      :key="item.key"
      class="menu-item"
      :class="{active: $route.path.endsWith(item.key)}"
      @click="$router.push(`/setting/${item.key}`)"
    >
      <component :is="item.icon" class="menu-icon" />
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { SettingOutlined, ApiOutlined, DeploymentUnitOutlined as ModelOutlined } from '@ant-design/icons-vue'

const route = useRoute()
const router = useRouter()
const menuItems = [
  { key: 'basic', name: '基本设置', icon: SettingOutlined },
  { key: 'default-model', name: '默认模型', icon: ModelOutlined },
  { key: 'model', name: '模型服务', icon: ApiOutlined }
]
</script>

<style scoped>
.menu-side {
  width: 200px;
  padding: 16px 0;
  background: white;
}
.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  margin: 4px 8px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
}
.menu-item:hover {
  background: #f5f5f5;
}
.menu-item.active {
  background: #f0f0f0;
}
.menu-icon {
  margin-right: 8px;
  font-size: 16px;
}
</style>