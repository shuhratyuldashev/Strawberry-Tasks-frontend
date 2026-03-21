import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/tasks' },
    { path: '/tasks', component: HomePage },
    {
        path: '/auth',
        name: 'auth',
        component: () => import('@/pages/AuthPage.vue')
    },{
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFoundPage.vue')
  }
  ],
})

export default router