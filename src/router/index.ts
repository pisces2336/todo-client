import LoginView from '@/views/LoginView.vue'
import MypageView from '@/views/MypageView.vue'
import SignupView from '@/views/SignupView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: LoginView,
    },
    {
      path: '/signup',
      component: SignupView,
    },
    {
      path: '/mypage',
      component: MypageView,
    },
  ],
})

export default router
