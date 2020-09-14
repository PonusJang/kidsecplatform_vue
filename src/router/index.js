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
        meta: { title: '域名监控', icon: 'menu', roles: ['admin'] }
      },
      {
        path: 'ip',
        component: () => import('@/views/internet/ip/ipList'),
        name: 'IP监控',
        meta: { title: 'IP监控', icon: 'menu', roles: ['admin'] }
      },
      {
        path: 'task',
        component: () => import('@/views/internet/task/taskList'),
        name: '任务管理',
        meta: { title: '任务管理', icon: 'menu', roles: ['admin'] }
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
      icon: 'paragraph-center'
    },
    children: [
      {
        path: 'nginx',
        component: () => import('@/views/intranet/nginx/index'),
        name: 'Nginx映射',
        meta: { title: 'Nginx映射', icon: 'menu', roles: ['admin'] }
      },
      {
        path: 'assest',
        component: () => import('@/views/intranet/assest/index'),
        name: '资产管理',
        meta: { title: '资产管理', icon: 'menu', roles: ['admin'] }
      },
      {
        path: 'aliveMonitor',
        component: () => import('@/views/intranet/aliveMonitor/index'),
        name: '可用监控',
        meta: { title: '可用监控', icon: 'menu', roles: ['admin'] }
      },
      {
        path: 'aliveMonitor2',
        component: () => import('@/views/intranet/aliveMonitor2/index'),
        name: '可用监控2',
        meta: { title: '可用监控2', icon: 'menu', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/hidsManager',
    component: Layout,
    redirect: '/hids/acunetix/index',
    name: '入侵检测',
    meta: {
      title: '入侵检测',
      icon: 'list2'
    },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/hids/index'),
        meta: { title: '监控平台', icon: 'menu', roles: ['admin'] }
      },
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/hids/index'),
        meta: { title: '规则引擎', icon: 'menu', roles: ['admin'] }
      },
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/hids/index'),
        meta: { title: '机器学习', icon: 'menu', roles: ['admin'] }
      },
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/hids/index'),
        meta: { title: '部署管理', icon: 'menu', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/scanManager',
    component: Layout,
    redirect: '/scanner/acunetix/index',
    name: '漏扫管理',
    meta: {
      title: '漏扫管理',
      icon: 'tree'
    },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/scanner/acunetix/index'),
        meta: { title: 'Web漏扫管理', icon: 'menu', roles: ['admin'] }
      },
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/scanner/nessus/index'),
        meta: { title: '主机漏扫管理', icon: 'menu', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/honeypotManager',
    component: Layout,
    redirect: '/honeypot/index',
    name: '蜜罐管理',
    meta: {
      title: '蜜罐管理',
      icon: 'tree2'
    },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/honeypot/index'),
        meta: { title: '蜜罐监控', icon: 'menu', roles: ['admin'] }
      },
      {
        path: 'deploy',
        name: 'deploy',
        component: () => import('@/views/honeypot/deploy'),
        meta: { title: '蜜罐部署', icon: 'menu', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/plugin',
    component: Layout,
    redirect: '/plugin/pluginList',
    children: [
      {
        path: 'pluginList',
        name: 'pluginList',
        component: () => import('@/views/plugin/pluginList'),
        meta: { title: '插件管理', icon: 'list', roles: ['admin'] }
      }
    ]
  },

  {
    path: '/service',
    component: Layout,
    redirect: '/service',
    children: [{
      path: 'serviceIndex',
      name: 'serviceIndex',
      component: () => import('@/views/service/index'),
      meta: { title: '服务管理', icon: 'paragraph-justify' }
    }]
  },
  {
    path: '/tool',
    component: Layout,
    redirect: '/tool',
    children: [{
      path: 'Index',
      name: 'Index',
      component: () => import('@/views/tool/index'),
      meta: { title: '在线工具', icon: 'table3' }
    }]
  },
  {
    path: '/userManager',
    component: Layout,
    redirect: '/users/userManager/index',
    name: '用户管理',
    meta: {
      title: '用户管理',
      icon: 'indent-decrease'
    },
    children: [
      {
        path: 'userList',
        name: 'userList',
        component: () => import('@/views/users/userManager/index'),
        meta: { title: '用户管理', icon: 'menu', roles: ['admin'] }
      },
      {
        path: 'roleList',
        name: 'roleList',
        component: () => import('@/views/users/roleManager/index'),
        meta: { title: '角色管理', icon: 'menu', roles: ['admin'] }
      },
      {
        path: 'departList',
        name: 'departList',
        component: () => import('@/views/users/departManager/index'),
        meta: { title: '部门管理', icon: 'menu', roles: ['admin'] }
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
        meta: { title: '系统配置', icon: 'menu3', roles: ['admin'] }
      }
    ]
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
