<template>
  <div class="setting-container">
    <div class="menu-side">
      <div class="menu-item" :class="{active: activeMenu === 'basic'}" @click="activeMenu = 'basic'">
        基本设置
      </div>
      <div class="menu-item" :class="{active: activeMenu === 'model'}" @click="activeMenu = 'model'">
        模型服务
      </div>
    </div>
    <div class="content-side">
      <div v-if="activeMenu === 'basic'">
        <h2>基本设置</h2>
        <!-- Basic settings content here -->
      </div>
      <div v-if="activeMenu === 'model'">
        <h2>模型服务</h2>
        <!-- Model service content here -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingPage',
  data() {
    return {
      activeMenu: 'basic'
    }
  }
}
</script>

<style scoped>
.setting-container {
  display: flex;
  height: 100%;
}
.menu-side {
  width: 200px;
  border-right: 1px solid #e8e8e8;
  padding: 20px 0;
}
.menu-item {
  padding: 10px 20px;
  cursor: pointer;
}
.menu-item:hover {
  background: #f5f5f5;
}
.menu-item.active {
  background: #e6f7ff;
  border-right: 2px solid #1890ff;
}
.content-side {
  flex: 1;
  padding: 20px;
}
</style>