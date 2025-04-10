<template>
  <div class="app-container" v-cloak>
    <Navbar v-if="showNavbar && isRouteReady" />
    <div class="content-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from '@/components/Navbar.vue';

const route = useRoute();
const isRouteReady = ref(false);

// Set route ready state after component is mounted
onMounted(() => {
  // Use setTimeout to ensure route is fully resolved
  setTimeout(() => {
    isRouteReady.value = true;
  }, 10);
});

// Hide navbar on login page
const showNavbar = computed(() => {
  return route.name !== 'login';
});
</script>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

#app {
  height: 100%;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Hide uncompiled template until Vue is ready */
[v-cloak] {
  display: none;
}
</style>
