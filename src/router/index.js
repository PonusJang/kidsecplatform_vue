import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

import Login from '../views/login/'
const dashboard = resolve => require(['../views/dashboard/index'], resolve)
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes intranet mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: Login
  },

  // {
  //   path: '/404',
  //   component: () => import('@/views/404'),
  //   hidden: true
  // },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://ponusjang.github.io/',
        meta: { title: '关于', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

export const asyncRoutes = [
  {
    path: '/internet',
    component: Layout,
    redirect: '/internet/domain/domainList',
    name: '互联网资产',
    meta: {
      title: '互联网资产',
      icon: 'nested',
      roles: ['admin']
    },
    children: [
      {
        path: 'domain',
        component: () => import('@/views/internet/domain/domainList'),
        name: '域名监控',
        meta: { title: '域名监控', roles: ['admin'] }
      },
      {
        path: 'ip',
        component: () => import('@/views/internet/ip/ipList'),
        name: 'IP监控',
        meta: { title: 'IP监控', roles: ['admin'] }
      },
      {
        path: 'task',
        component: () => import('@/views/internet/task/taskList'),
        name: '任务管理',
        meta: { title: '任务管理', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/intranet',
    component: Layout,
    redirect: '/intranet/nginx',
    name: '内网资产',
    meta: {
      title: '内网资产',
      icon: 'nested'
    },
    children: [
      {
        path: 'nginx',
        component: () => import('@/views/intranet/nginx/index'),
        name: 'Nginx映射',
        meta: { title: 'Nginx映射', roles: ['admin'] }
      },
      {
        path: 'assest',
        component: () => import('@/views/intranet/assest/index'),
        name: '资产管理',
        meta: { title: '资产管理', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/sysConfigList',
    children: [
      {
        path: 'sysConfigList',
        name: 'sysConfigList',
        component: () => import('@/views/system/index'),
        meta: { title: '系统配置', icon: 'table', roles: ['admin'] }
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
