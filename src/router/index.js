import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/show-all',
    name: 'ShowAll',
    component: () => import('../views/ShowAll.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/test-cpt',
    component: () => import(/* webpackChunkName: "about" */ '../views/TestCpt.vue')
  },
  {
    path: '/test-cpt2',
    component: () => import(/* webpackChunkName: "about" */ '../views/TestOrderMapCpt.vue')
  },
  {
    path: '/show-loading',
    name: 'ShowLoading',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/ShowLoading.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
