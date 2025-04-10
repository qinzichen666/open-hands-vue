import { h } from 'vue'
import MenuSide from './MenuSide.vue'

const SettingLayout = () => h('div', { class: 'setting-container' }, [
  h(MenuSide),
  h('router-view')
])

export default {
  path: '/setting',
  component: SettingLayout,
  children: [
    {
      path: '',
      redirect: 'basic'
    },
    {
      path: 'basic',
      component: () => import('./basic.vue')
    },
    {
      path: 'default-model',
      component: () => import('./default-model.vue')
    },
    {
      path: 'model',
      component: () => import('./model.vue')
    }
  ]
}