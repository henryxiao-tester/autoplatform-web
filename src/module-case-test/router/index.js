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
  path: '/case-test', // 父路径
  component: Layout,
  redirect: 'noredirect',
  name: 'case-test',
  meta: {
    title: 'xxx业务模块管理',
    icon: 'component'
  },
  children: [{
    path: 'index', // 请求地址   -- /case-manager/index
    component: _import('case-test/pages/index'), // 跳转的vue视图
    name: 'case-test-index',
    meta: {
      title: '人员管理',
      icon: 'component',
      noCache: true
    }
  }]
}]
