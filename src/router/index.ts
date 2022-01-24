import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/add',
    name: 'Add',
    component: () => import(/* webpackChunkName: "about" */ '../views/Add.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/editcrumbtemplate/:id',
    name: 'EditCrumbTemplate',
    component: () => import(/* webpackChunkName: "about" */ '../views/CrumbTemplateEdit.vue')
  },
  {
    path: '/crumb/category/:categoryID',
    name: 'DetailCrumbTemplate',
    component: () => import(/* webpackChunkName: "about" */ '../views/CrumbTemplateDetail.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach(async (to, from) => {
  console.log('---------------------------')
  const canAccess = store.getters['userStore/getUser']
  console.log(to, from)
  console.log(store.getters['userStore/getUser'])
  if (!canAccess && to.name !== 'Login') return '/login'
  console.log('---------------------------')
})

export default router
