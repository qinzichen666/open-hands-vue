import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: "/",
    name: "app",
    component: () => import(/* webpackChunkName: "manus" */ "@/view/manus/index.vue"),
    meta: { verify: true }
  },
  {
    path: "/manus/:id?",
    name: "manus",
    component: () => import(/* webpackChunkName: "manus" */ "@/view/manus/index.vue"),
    meta: { verify: true }
  },
  {
    path: "/demo",
    name: "demo",
    component: () => import(/* webpackChunkName: "demo" */ "@/view/demo/index.vue"),
    meta: { verify: true }
  },
  {
    path: "/auth",
    name: "login",
    component: () => import(/* webpackChunkName: "auth" */ "@/view/auth/index.vue"),
  },
  {
    path: "/setting",
    component: () => import("@/view/setting/index.vue"),
    meta: { verify: true },
    children: [
      {
        path: "",
        redirect: "basic"
      },
      {
        path: "basic",
        component: () => import("@/view/setting/basic.vue"),
        meta: { verify: true }
      },
      {
        path: "default-model",
        component: () => import("@/view/setting/default-model.vue"),
        meta: { verify: true }
      },
      {
        path: "model",
        component: () => import("@/view/setting/model.vue"),
        meta: { verify: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router