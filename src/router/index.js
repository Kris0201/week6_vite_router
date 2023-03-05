import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/front/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      component:()=>import('../views/FrontLayout.vue'),
      children:[
        {
          path: '',
          name: 'home',
          component: HomeView
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/front/AboutView.vue')
        },
        {
          path:'login',
          component:()=>import('../views/front/LoginPage.vue')
        },
        {
          path: 'products',
          component: () => import('../views/front/ProductsView.vue')
        },
    
        {
          path: 'product/:id', // 動態路由
          component: () => import('../views/front/ProductView.vue')
        },
        {
          path: 'cart',
          component: () => import('../views/front/CartView.vue')
        },
      ]
    },

    {
      path: '/admin',
      component: () => import('../views/admin/DashboardView.vue'),
      // 巢狀路由：子路由
      children:[
        {
          path:'products',
          component:()=>import('../views/admin/AdminProducts.vue')

        },
        {
          path:'orders',
          component:()=>import('../views/admin/AdminOrders.vue')

        },
      ]
    }
  ]
})

export default router
