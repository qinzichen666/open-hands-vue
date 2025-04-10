import { createRouter, createWebHistory } from 'vue-router'
import settingRoutes from '@/view/setting/setting.routes'

const routes = [
  settingRoutes,
  // 其他路由...
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router