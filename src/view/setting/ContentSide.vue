<template>
  <div class="content-side">
    <component :is="activeComponent" />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  props: {
    activeMenu: {
      type: String,
      required: true
    }
  },
  computed: {
    activeComponent() {
      return defineAsyncComponent(() => 
        import(`./${this.activeMenu}.vue`)
      )
    }
  }
}
</script>

<style scoped>
.content-side {
  flex: 1;
  padding: 24px;
  background: white;
  border-radius: 8px;
  margin-left: 16px;
}
</style>