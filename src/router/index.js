import { createRouter, createWebHistory } from 'vue-router'

// 导入页面组件（注意大小写和路径）
import Login from '../pages/Login.vue'
import Layout from '../layout/Layout.vue'
import Home from '../views/Home.vue'
import RefPractice from '../views/practice/RefPractice.vue'

import ComponentPractice from '../views/practice/ComponentPractice.vue'
import PropsEmitPractice from '../views/practice/PropsEmitPractice.vue'
import SlotPractice from '../views/practice/SlotPractice.vue'
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }  // 不需要登录
  },
  {
    path: '/dashboard',
    name: 'Layout',
    component: Layout,
    meta: { requiresAuth: true },   // 需要登录
    redirect: '/dashboard/home',    // 默认重定向到首页
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home,
        meta: { title: '首页' }
      },
      {
        path: 'ref-practice',
        name: 'ref-practice',
        component: RefPractice,
        meta: { title: '响应式 API 综合练习' }
      },
      {
        path: 'component-practice',
        name: 'ComponentPractice',
        component: ComponentPractice,
        meta: { title: '组件练习' }
      },
      {
        path: 'props-emit-practice',
        name: 'PropsEmitPractice',
        component: PropsEmitPractice,
        meta: { title: 'Props与Events练习' }
      },
      {
        path: 'slot-practice',
        name: 'SlotPractice',
        component: SlotPractice,
        meta: { title: '插槽练习' }
      }
      // 后续可以在 children 中添加更多练习路由
    ]
  },
  // 可选：404 页面（如果不需要可省略）
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 全局前置守卫：检查登录状态
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !token) {
    // 需要登录但未登录，跳转到登录页
    next('/')
  } else if (to.path === '/' && token) {
    // 已登录状态下访问登录页，自动跳转到后台首页
    next('/dashboard/home')
  } else {
    next()
  }
})

export default router