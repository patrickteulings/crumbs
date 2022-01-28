import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Temp',
    component: () => import(/* webpackChunkName: "about" */ '../views/Temp.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/add',
    name: 'Add',
    component: () => import(/* webpackChunkName: "about" */ '../views/Add.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/crumbtemplate/edit/:id',
    name: 'CrumbTemplateEdit',
    component: () => import(/* webpackChunkName: "about" */ '../views/CrumbTemplateEdit.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/crumb/category/:categoryID',
    name: 'DetailCrumbTemplate',
    component: () => import(/* webpackChunkName: "about" */ '../views/CrumbTemplateDetail.vue'),
    meta: { requiresAuth: true }
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
  const canAccess = store.getters['userStore/getUser']
  if (to.meta.requiresAuth && !canAccess) {
    return {
      path: '/home',
      // save the location we were at to come back later
      query: { redirect: to.fullPath }
    }
  }
  // if (!canAccess && (to.name !== 'Home' && to.name !== 'Login')) return '/Home'
})

export default router
