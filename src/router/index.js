import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Create from '../views/Create.vue'
import Edit from '../views/Edit.vue'
import Show from '../views/Show.vue'

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
    {
      path: '/edit/:id',
      name: 'edit',
      component: Edit
    },
    {
      path: '/:id',
      name: 'show',
      component: Show
    },
  ]
})

export default router
