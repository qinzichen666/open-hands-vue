<template>
  <div class="menu-side">
    <div 
      v-for="item in menuItems" 
      :key="item.key"
      class="menu-item"
      :class="{active: activeMenu === item.key}"
      @click="activeMenu = item.key"
    >
      <component :is="item.icon" class="menu-icon" />
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { SettingOutlined, ApiOutlined } from '@ant-design/icons-vue'

export default {
  components: { SettingOutlined, ApiOutlined },
  emits: ['menu-change'],
  setup(props, { emit }) {
    const activeMenu = ref('basic')
    const menuItems = [
      { key: 'basic', name: '基本设置', icon: 'SettingOutlined' },
      { key: 'model', name: '模型服务', icon: 'ApiOutlined' }
    ]

    return { activeMenu, menuItems }
  }
}
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
  margin: 0 8px;
  cursor: pointer;
  border-radius: 4px;
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