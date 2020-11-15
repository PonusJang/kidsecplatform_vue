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
    path: '/notification',
    component: Layout,
    redirect: '/notification/index',
    children: [
      {
        path: 'notification',
        name: 'notification',
        component: () => import('@/views/notification/index'),
        meta: { title: '通知', icon: 'list', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/assets',
    component: Layout,
    redirect: '/assets/internet/domain/domainList',
    name: '资产管理',
    meta: { title: '资产管理', icon: 'menu', roles: ['admin'] },
    children: [
      {
        path: 'internet',
        component: () => import('@/views/assets/internet/index'),
        redirect: '/assets/internet/domain/domainList',
        name: '互联网资产',
        meta: {
          title: '互联网资产',
          icon: 'nested',
          roles: ['admin']
        },
        children: [
          {
            path: 'domain',
            component: () => import('@/views/assets/internet/domain/domainList'),
            name: '域名监控',
            meta: { title: '域名监控', icon: 'menu', roles: ['admin'] }
          },
          {
            path: 'ip',
            component: () => import('@/views/assets/internet/ip/ipList'),
            name: 'IP监控',
            meta: { title: 'IP监控', icon: 'menu', roles: ['admin'] }
          },
          {
            path: 'task',
            component: () => import('@/views/assets/internet/task/taskList'),
            name: '任务管理',
            meta: { title: '任务管理', icon: 'menu', roles: ['admin'] }
          },
          {
            path: 'pluginList',
            name: 'pluginList',
            component: () => import('@/views/plugin/pluginList'),
            meta: { title: '专项插件', icon: 'list', roles: ['admin'] }
          }
        ]
      },
      {
        path: 'intranet',
        component: () => import('@/views/assets/intranet/index'),
        redirect: '/assets/internet/nginx/index',
        name: '内网资产',
        meta: {
          title: '内网资产',
          icon: 'paragraph-center'
        },
        children: [
          {
            path: 'nginx',
            component: () => import('@/views/assets/intranet/nginx/index'),
            name: 'Nginx映射',
            meta: { title: 'Nginx映射', icon: 'menu', roles: ['admin'] }
          },
          {
            path: 'assest',
            component: () => import('@/views/assets/intranet/assest/index'),
            name: '资产管理',
            meta: { title: '资产管理', icon: 'menu', roles: ['admin'] }
          },
          {
            path: 'aliveMonitor',
            component: () => import('@/views/assets/intranet/aliveMonitor/index'),
            name: '可用监控',
            meta: { title: '可用监控', icon: 'menu', roles: ['admin'] }
          },
          {
            path: 'aliveMonitor2',
            component: () => import('@/views/assets/intranet/aliveMonitor2/index'),
            name: '可用监控2',
            meta: { title: '可用监控2', icon: 'menu', roles: ['admin'] }
          }
        ]
      }
    ]
  },
  {
    path: '/activeDefence',
    component: Layout,
    redirect: '/activeDefence/hids/dashboard/index',
    name: '主动防御',
    meta: { title: '主动防御', icon: 'menu', roles: ['admin'] },
    children: [
      {
        path: 'hidsManager',
        component: () => import('@/views/activeDefence/hids/index'),
        redirect: '/activeDefence/hids/dashboard/index',
        name: '入侵检测',
        meta: {
          title: '入侵检测',
          icon: 'nested'
        },
        children: [
          {
            path: 'hidsDashboard',
            name: '监控平台',
            component: () => import('@/views/activeDefence/hids/dashboard/index'),
            meta: { title: '监控平台', icon: 'menu', roles: ['admin'] }
          },
          {
            path: 'analysis',
            name: '数据分析',
            component: () => import('@/views/activeDefence/hids/analysis/index'),
            meta: { title: '数据分析', icon: 'menu', roles: ['admin'] }
          },
          {
            path: 'ai',
            name: '机器学习',
            component: () => import('@/views/activeDefence/hids/ai/index'),
            meta: { title: '机器学习', icon: 'menu', roles: ['admin'] }
          },
          {
            path: 'deploy',
            name: '部署管理',
            component: () => import('@/views/activeDefence/hids/deploy/index'),
            meta: { title: '部署管理', icon: 'menu', roles: ['admin'] }
          },
          {
            path: 'task',
            name: '任务管理',
            component: () => import('@/views/activeDefence/hids/task/index'),
            meta: { title: '任务管理', icon: 'menu', roles: ['admin'] }
          },
          {
            path: 'engine',
            name: '规则引擎',
            component: () => import('@/views/activeDefence/hids/engine/index'),
            meta: { title: '规则引擎', icon: 'menu', roles: ['admin'] }
          },
          {
            path: 'config',
            name: '检测配置',
            component: () => import('@/views/activeDefence/hids/config/index'),
            meta: { title: '检测配置', icon: 'menu', roles: ['admin'] }
          }
        ]
      },
      {
        path: 'honeypotManager',
        component: () => import('@/views/activeDefence/honeypot/index'),
        redirect: '/activeDefence/honeypot/dashboard/index',
        name: '蜜罐管理',
        meta: {
          title: '蜜罐管理',
          icon: 'nested'
        },
        children: [
          {
            path: 'honeyDashboard',
            name: 'Dashboard',
            component: () => import('@/views/activeDefence/honeypot/dashboard/index'),
            meta: { title: '蜜罐监控', icon: 'menu', roles: ['admin'] }
          },
          {
            path: 'deploy',
            name: '蜜罐部署',
            component: () => import('@/views/activeDefence/honeypot/deploy/index'),
            meta: { title: '蜜罐部署', icon: 'menu', roles: ['admin'] }
          }
        ]
      }
    ]
  },
  {
    path: '/trace',
    component: Layout,
    name: '溯源取证',
    redirect: '/trace/index',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/trace/index'),
        meta: { title: '溯源取证', icon: 'list', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/dataSecurity',
    component: Layout,
    name: '数据安全',
    redirect: '/dataSecurity/index',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/dataSecurity/index'),
        meta: { title: '数据安全', icon: 'list', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/scanManager',
    component: Layout,
    redirect: '/scanner/acunetix/index',
    name: '安全检测',
    meta: {
      title: '安全检测',
      icon: 'tree'
    },
    children: [
      {
        path: 'acunetix',
        name: 'Web漏扫',
        component: () => import('@/views/scanner/acunetix/index'),
        meta: { title: 'Web漏扫', icon: 'menu', roles: ['admin'] }
      },
      {
        path: 'webVulnsInfo/:scan_id',
        name: 'Web漏洞详情',
        component: () => import('@/views/scanner/acunetix/vulnsInfo'),
        meta: { title: 'Web漏洞详情', noCache: true, icon: 'menu', roles: ['admin'] },
        hidden: true
      },
      {
        path: 'nessus',
        name: '主机漏扫',
        component: () => import('@/views/scanner/nessus/index'),
        meta: { title: '主机漏扫', icon: 'menu', roles: ['admin'] }
      },
      {
        path: 'hostVulnsInfo/:sid',
        name: '主机漏洞详情',
        component: () => import('@/views/scanner/nessus/vulnsInfo'),
        meta: { title: '主机漏洞详情', noCache: true, icon: 'menu', roles: ['admin'] },
        hidden: true
      },
      {
        path: 'check',
        name: '合规检查',
        component: () => import('@/views/scanner/check/index'),
        meta: { title: '合规检查', icon: 'menu', roles: ['admin'] }
      }
    ]
  },
  // {
  //   path: '/plugin',
  //   component: Layout,
  //   name: '专项插件',
  //   redirect: '/plugin/pluginList',
  //   children: [
  //     {
  //       path: 'pluginList',
  //       name: 'pluginList',
  //       component: () => import('@/views/plugin/pluginList'),
  //       meta: { title: '专项插件', icon: 'list', roles: ['admin'] }
  //     }
  //   ]
  // },

  // {
  //   path: '/tool',
  //   component: Layout,
  //   redirect: '/tool',
  //   children: [{
  //     path: 'Index',
  //     name: 'Index',
  //     component: () => import('@/views/tool/index'),
  //     meta: { title: '在线工具', icon: 'table3' }
  //   }]
  // },
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
    name: '系统管理',
    meta: {
      title: '系统管理',
      icon: 'indent-decrease'
    },
    redirect: '/system/sysConfig/index',
    children: [
      {
        path: 'logger',
        component: () => import('@/views/system/logger/index'),
        name: '系统日志',
        meta: { title: '系统日志', icon: 'menu', roles: ['admin'] }
      },
      {
        path: 'service',
        component: () => import('@/views/system/service/index'),
        name: '服务管理',
        meta: { title: '服务管理', icon: 'menu', roles: ['admin'] }
      },
      {
        path: 'sysConfig',
        component: () => import('@/views/system/sysConfig/index'),
        name: '系统参数',
        meta: { title: '系统参数', icon: 'menu', roles: ['admin'] }
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
