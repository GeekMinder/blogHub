import { defineStore } from 'pinia'

interface UserProps {
  username: string
  role: number
}

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null as UserProps | null,
  }),
  actions: {
    setUserInfo(info: UserProps): void {
      this.userInfo = info
    },

    clearUserInfo(): void {
      this.userInfo = null
    },
  },
})
