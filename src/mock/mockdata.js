// 创建任务列表mock数据

import {
  Random
} from 'mockjs'

const dataList = []
export const mockTaskList = function () {
  for (let index = 0; index < 30; index++) {
    dataList.push({
      taskId: index,
      taskName: '首次测试',
      taskModule: '业务登录注册模块',
      buildApi: 'http://www.baidu.com',
      isShow: 1,
      createTime: '2020-03-21 10:36:00',
      updateTime: '2020-03-29 10:36:00'
    })

  }
  return dataList
}

// 用例管理添加用例mock数据
const getCaseSuiteInfoList = []
export const getCaseSuiteInfo = function () {
  for (let index = 0; index < 30; index++) {
    getCaseSuiteInfoList.push({
      packageName: 'com.akalaku.akulakuproject8interfaceautotest.oldGoldFlow.bills.PrepaymentTestCase',
      status: 1
    })

  }
  return getCaseSuiteInfoList
}

// 用例管理用例列表mock数据
const getCaseInfoLists = []
export const getCaseInfoList = function () {
  for (let index = 0; index < 30; index++) {
    getCaseInfoLists.push({
      id: '322231211',
      caseName: '用户登录模块用例',
      caseSuite: [
        'com.akalaku.akulakuproject8interfaceautotest.oldGoldFlow.openapy.OpenPayOrderWithoutCouponTestCase', 'com.akalaku.akulakuproject8interfaceautotest.oldGoldFlow.openapy.OpenPayOrderWithoutCouponTestCase'
      ],
      description: '首次录入用户模块',
      author: 'henry',
      createTime: '2020-03-23',
      updateTime: '2020-03-11'
    })

  }
  return getCaseInfoLists
}
