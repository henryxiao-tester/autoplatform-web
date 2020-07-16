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
      packageName: 'com.auto.interface.cases.LoginTestCase',
      status: 0
    })

  }
  return getCaseSuiteInfoList
}

// 用例管理用例列表mock数据
const getAllCaseLists = []
export const getAllCaseList = function () {
  getAllCaseLists.length = 0
  for (let index = 0; index < 30; index++) {
    getAllCaseLists.push({
      id: '322231211',
      caseName: '用户登录模块用例',
      classPath: ['com.auto.interface.cases.LoginTestCase', 'com.auto.interface.cases.LoginTestCase '],
      description: '首次录入用户模块',
      author: 'henry',
      createTime: '2020-03-23',
      updateTime: '2020-03-11'
    })

  }
  return getAllCaseLists
}

const getCaseInfoLists = []
export const getCaseInfoList = function () {
  getCaseInfoLists.length = 0
  for (let index = 0; index < 30; index++) {
    getCaseInfoLists.push({
      id: '322231211',
      caseName: '用户登录模块用例',
      classSuite: ['com.auto.interface.cases.LoginTestCase', 'com.auto.interface.cases.LoginTestCase '],
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
      userNick: 'henryxiao',
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
      userNick: 'henryxiao',
      roleId: 1,
      status: 1,
      createTime: '2020-03-25 13:00:00',
      updateTime: '2020-03-25 13:00:00'
    })

  }
  return getUserCenterInfoList
}

// 邮件列表mock数据
const getEmailListInfoList = []
export const getEmailListInfos = function () {
  getEmailListInfoList.length = 0
  for (let index = 0; index < 30; index++) {
    getEmailListInfoList.push({
      id: 232432432432,
      emailName: '黄金流任务通知',
      taskId: 423432432432,
      noticeObj: ['xiaolong@qq.com', 'henry@qq.com'],
      type: 1,
      createTime: '2020-03-25 13:00:00',
      updateTime: '2020-03-25 13:00:00'
    })

  }
  return getEmailListInfoList
}

// 压测配置列表mock数据
const getPressListInfoList = []
export const getPressListInfos = function () {
  getPressListInfoList.length = 0
  for (let index = 0; index < 30; index++) {
    getPressListInfoList.push({
      id: 232432432432,
      pressName: '埋点压测',
      type: 1,
      status: 1,
      masterIp: '192.168.1.1',
      slaveIp: '192.168.1.2,192.168.1.3',
      scriptStatus: 1,
      author: 'henryxiao',
      createTime: '2020-07-07 13:00:00'
    })

  }
  return getPressListInfoList
}
