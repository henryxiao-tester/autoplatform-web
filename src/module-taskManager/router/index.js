/*
 * @Author: itcast
 * @Description: xxx业务模块
 * @Date: 2018-04-13 16:13:27
 * @Last Modified by: hans.taozhiwei
 * @Last Modified time: 2018-09-03 11:12:47
 */

import Layout from '@/module-dashboard/pages/layout'
const _import = require('@/router/import_' + process.env.NODE_ENV)

export default [{
  root: true,
  path: '/task', // 父路径
  component: Layout,
  redirect: 'noredirect',
  name: 'taskManager',
  meta: {
    title: 'xxx业务模块管理',
    icon: 'component'
  },
  children: [{
    path: 'taskList', // 请求地址   -- /task/taskList
    component: _import('taskManager/pages/taskList'), // 跳转的vue视图
    name: 'case-manager-index',
    meta: {
      title: '任务列表',
      icon: 'component',
      noCache: true
    }
  }]
}]
