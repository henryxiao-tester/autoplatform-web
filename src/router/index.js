import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import {
  Message
} from 'element-ui'
import NProgress from 'nprogress'
import Layout from '@/module-dashboard/pages/layout'
import {
  getToken
} from '@/utils/auth'
import {
  hasPermissionPoint,
  hasPermission
} from '@/utils/permission'

// 定义
const _import = require('./import_' + process.env.NODE_ENV) // 懒加载 导包
const whiteList = ['/login', '/reg', '/authredirect', '/dashboard'] // 白名单 无需跳转

// 配置
Vue.use(Router)
NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

export const constantRouterMap = [{
    path: '/login',
    component: _import('dashboard/pages/login'),
    hidden: true
  },
  {
    path: '/reg',
    component: _import('dashboard/pages/reg'),
    hidden: true
  },
  {
    path: '/404',
    component: _import('dashboard/pages/404'),
    hidden: true
  },
  {
    path: '/401',
    component: _import('dashboard/pages/401'),
    hidden: true
  },
  {
    path: '/taskList',
    component: _import('taskManager/pages/taskList'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'login',
    children: [{
        path: 'dashboard',
        component: _import('dashboard/pages/dashboard'),
        name: 'dashboard',
        meta: {
          title: 'dashboard',
          icon: 'dashboard',
          noCache: true
        }
      },
      {
        path: 'login',
        component: _import('dashboard/pages/login'),
        name: 'login',
        meta: {
          noCache: true
        }
      }
    ]
  }
]

/**
 * 配置路由
 **/
let router = new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

// 路由拦截器
router.beforeEach((to, from, next) => {
  NProgress.start()
  console.log(to.path)
  if (whiteList.indexOf(to.path) !== -1) {
    // 在免登录白名单，直接进入
    next()
  } else {
    // 若路径不在白名单中则跳转到登录页
    next()
    NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
  }
})

/**
 * 导出 基础路由
 **/
export default router

/**
 * 导出 业务路由
 **/
export let asyncRouterMap = [{
  path: '*',
  redirect: '/404',
  hidden: true
}]
