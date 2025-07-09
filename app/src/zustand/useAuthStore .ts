import { create } from 'zustand'


type AuthState = {
  isLoggedIn: boolean
  login: () => any
  logoutx: () => any
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,

  login: () => set({ isLoggedIn: true }),
  logoutx: () => set({ isLoggedIn: false }),
}))