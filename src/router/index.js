import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Create from '../views/Create.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index
    },
    {
      path: '/create',
      name: 'create',
      component: Create
    },
  ]
})

export default router
