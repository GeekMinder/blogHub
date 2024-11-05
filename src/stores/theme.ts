import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: 'light',
  }),
  actions: {
    handleThemeChange() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      document.body.setAttribute('arco-theme', this.theme)
    },
  },
})
