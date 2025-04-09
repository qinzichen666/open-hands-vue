import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {}
  }),
  actions: {
    setUser(user) {
      this.count = count;
    }
  },
  persist: true,
})
