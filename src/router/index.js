import {
  createRouter,
  createWebHistory,
} from "vue-router";

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
    path: "/mindmap",
    name: "mindmap",
    component: () => import(/* webpackChunkName: "mindmap" */ "@/view/mindmap/index.vue"),
    meta: { verify: true }
  },
  {
    path: "/auth",
    name: "login",
    component: () => import(/* webpackChunkName: "auth" */ "@/view/auth/index.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const { meta = {} } = to;
  
  // If route requires authentication and no token exists, redirect to login
  if (meta.verify && !token) {
    console.log("Authentication failed, redirecting to login");
    next({ name: 'login' });
    return;
  }
  
  // If user is already logged in and tries to access login page, redirect to home
  if (token && to.name === 'login') {
    console.log("Already logged in, redirecting to home");
    next({ name: 'app' });
    return;
  }
  
  next();
})

export default router;
