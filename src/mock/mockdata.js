// 创建任务列表mock数据

import {
  Random
} from 'mockjs'

const dataList = []
export const mockTaskList = function () {
  dataList.length = 0
  for (let index = 0; index < 30; index++) {
    dataList.push({
      taskId: '3243243211',
      taskName: '首次测试',
      casesID: '323243211,321321312,235676876',
      isShow: 1,
      createTime: '2020-03-21 10:36:00',
      updateTime: '2020-03-29 10:36:00'
    })

  }
  return dataList
}

// 用例管理添加用例mock数据
var getCaseSuiteInfoList = []
export const getCaseSuiteInfo = function () {
  getCaseSuiteInfoList.length = 0
  for (let index = 0; index < 30; index++) {
    getCaseSuiteInfoList.push({
      packageName: 'com.akalaku.akulakuproject8interfaceautotest.oldGoldFlow.bills.PrepaymentTestCase',
      status: 0
    })

  }
  return getCaseSuiteInfoList
}

// 用例管理用例列表mock数据
const getCaseInfoLists = []
export const getCaseInfoList = function () {
  getCaseInfoLists.length = 0
  for (let index = 0; index < 30; index++) {
    getCaseInfoLists.push({
      id: '322231211',
      caseName: '用户登录模块用例',
      caseSuite: ['com.akalaku.akulakuproject8interfaceautotest.oldGoldFlow.openapy.OpenPayOrderWithoutCouponTestCase', ' com.akalaku.akulakuproject8interfaceautotest.oldGoldFlow.openapy.OpenPayOrderWithoutCouponTestCase'],
      description: '首次录入用户模块',
      author: 'henry',
      createTime: '2020-03-23',
      updateTime: '2020-03-11'
    })

  }
  return getCaseInfoLists
}

// 用户操作日志mock数据
const getUserOperatonInfoList = []
export const getUserOperatonInfoLists = function () {
  getUserOperatonInfoList.length = 0
  for (let index = 0; index < 10; index++) {
    getUserOperatonInfoList.push({
      id: '322231211',
      userNick: '肖龙',
      operationType: 2,
      createTime: '2020-03-23'
    })

  }
  return getUserOperatonInfoList
}

// 用户操作日志mock数据
const getReportInfoList = []
export const getReportInfoLists = function () {
  getReportInfoList.length = 0
  for (let index = 0; index < 50; index++) {
    getReportInfoList.push({
      caseName: '创建订单',
      interfaceName: '/order/createOrder',
      requestBody: 'orderType:1 price:10 createTime:213432432, userName:henry',
      requestHeader: 'Content-Type: text/html;charset=UTF-8-23',
      expectRes: 'code:200,message:success',
      realRes: 'code:200,message:success',
      finallyRes: 'Pass'
    })

  }
  return getReportInfoList
}

// 用户管理mock数据
const getUserCenterInfoList = []
export const getUserCenterInfoLists = function () {
  getUserCenterInfoList.length = 0
  for (let index = 0; index < 20; index++) {
    getUserCenterInfoList.push({
      username: 'henryxiao',
      userNick: '肖龙',
      roleId: 1,
      status: 1,
      createTime: '2020-03-25 13:00:00',
      updateTime: '2020-03-25 13:00:00'
    })

  }
  return getUserCenterInfoList
}
