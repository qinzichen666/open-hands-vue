import {
  createRouter,
  createWebHistory,
} from "vue-router";

const routes = [
  {
    path: "/",
    name: "app",
    component: () => import(/* webpackChunkName: "manus" */ "@/view/manus/index.vue"),
  },
  {
    path: "/manus/:id?",
    name: "manus",
    component: () => import(/* webpackChunkName: "manus" */ "@/view/manus/index.vue"),
  },
  {
    path: "/demo",
    name: "demo",
    component: () => import(/* webpackChunkName: "demo" */ "@/view/demo/index.vue"),
  },
  {
    path: "/mindmap",
    name: "mindmap",
    component: () => import(/* webpackChunkName: "mindmap" */ "@/view/mindmap/index.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const { meta = {} } = to;
  if (meta.verify && !token) {
    console.log("verify fail");
    next({ name: 'login' });
  }
  next();
})

export default router;
