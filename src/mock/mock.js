import Mock from 'mockjs'
import {
  baseUrl,
  baseInterface
} from './mockconfig'
import {
  mockTaskList,
  getCaseSuiteInfo,
  getCaseInfoList,
  getUserOperatonInfoLists,
  getReportInfoLists,
  getUserCenterInfoLists
} from './mockdata'

const Random = Mock.Random

// mock需要给三个参数,url(与axios请求是传的url一致,我这个是本地启动的项目就直接用本地域名了)
// 请求类型: get post...其他看文档
// 数据处理函数,函数需要return数据
Mock.mock(baseUrl.domain + baseInterface.login, 'post', data => {
  const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success',
    data: {
      id: 2312311123,
      userName: 'henryxiao',
      password: '123456',
      role: 1,
      userNick: '你好henry',
      createTime: '2020-03-24 12:11:12'
    }
  }
})
// post请求,带参数,参数会在data中返回,会返回url,type,body三个参数,可以把data打印出来看看
Mock.mock(baseUrl.domain + baseInterface.login, 'get', () => {
  // 请求传过来的参数在body中,传回的是json字符串,需要转义一下
  // const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success',
    data: [{
      id: '23213211121321',
      userName: 'henry',
      password: '123456',
      role: 1,
      userNick: '我是测试',
      createTime: '2020-03-22'
    }]
  }
})

// mock获取任务列表中所有的数据
Mock.mock(baseUrl.domain + baseInterface.getTaskList, 'post', data => {
  const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success',
    data: mockTaskList()
  }
})

// mock获取查询任务列表中的数据
Mock.mock(baseUrl.domain + baseInterface.getTaskDataByName, 'post', data => {
  const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success',
    data: [{
      taskName: '查询获得的任务名称',
      taskId: 213224324,
      casesID: '323243211,321321312,235676876',
      isShow: 1,
      createTime: '2020-03-21 10:36:00',
      updateTime: '2020-03-29 10:36:00'
    }]
  }
})

// 修改任务列表中的数据
Mock.mock(baseUrl.domain + baseInterface.updateTaskDataByName, 'post', data => {
  const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success'
  }
})

// 修改任务列表中的数据
Mock.mock(baseUrl.domain + baseInterface.deleteTaskData, 'post', data => {
  const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success'
  }
})

// 执行任务列表中的数据
Mock.mock(baseUrl.domain + baseInterface.excuteTask, 'post', data => {
  const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success'
  }
})

// 修改个人中心信息
Mock.mock(baseUrl.domain + baseInterface.getUserInfo, 'post', data => {
  const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success',
    data: {
      id: '3242342311',
      userName: 'henry',
      password: 'sadsadsa',
      role: 1,
      userNick: '肖龙',
      createTime: '2020-03-22'
    }
  }
})

// 修改个人中心信息
Mock.mock(baseUrl.domain + baseInterface.updateUserInfo, 'post', data => {
  const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success'
  }
})

/**
 * 用例管理
 */
Mock.mock(baseUrl.domain + baseInterface.getCaseSuiteInfo, 'post', data => {
  const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success',
    data: getCaseSuiteInfo()
  }
})
Mock.mock(baseUrl.domain + baseInterface.findCaseSuiteInfo, 'post', data => {
  const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success',
    data: [{
      packageName: 'com.akalaku.akulakuproject8interfaceautotest.oldGoldFlow.bills.PrepaymentTestCase',
      status: 1
    }]
  }
})

Mock.mock(baseUrl.domain + baseInterface.updateCaseInfo, 'post', data => {
  const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success'
  }
})

Mock.mock(baseUrl.domain + baseInterface.addCase, 'post', data => {
  const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success'
  }
})

Mock.mock(baseUrl.domain + baseInterface.getCaseInfo, 'post', data => {
  const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success',
    data: getCaseInfoList()
  }
})
Mock.mock(baseUrl.domain + baseInterface.deleteCaseInfo, 'post', data => {
  const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success'
  }
})

Mock.mock(baseUrl.domain + baseInterface.getCaseInfo, 'post', data => {
  const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success',
    data: getCaseInfoList()
  }
})

Mock.mock(baseUrl.domain + baseInterface.findCaseInfo, 'post', data => {
  const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success',
    data: [{
      id: '2132432432',
      caseName: '测试查询用户登录',
      caseSuite: [
        'com.akalaku.akulakuproject8interfaceautotest.oldGoldFlow.openapy.OpenPayOrderWithoutCouponTestCase', 'com.akalaku.akulakuproject8interfaceautotest.oldGoldFlow.openapy.OpenPayOrderWithoutCouponTestCase'
      ],
      description: '查询测试效果',
      author: 'henry',
      createTime: '2020-03-23 12:00:00',
      updateTime: '2020-03-11 12:00:00'
    }]
  }
})

/**
 * 获取用户操作日志
 */
Mock.mock(baseUrl.domain + baseInterface.getUserOperatonInfo, 'post', data => {
  const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success',
    data: getUserOperatonInfoLists()
  }
})

/**
 * 获取报告列表数据
 */
Mock.mock(baseUrl.domain + baseInterface.getReportInfo, 'post', data => {
  const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success',
    data: getReportInfoLists()
  }
})

Mock.mock(baseUrl.domain + baseInterface.getReportInfoByName, 'post', data => {
  const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success',
    data: [{
      caseName: '用户登录',
      interfaceName: '/user/login',
      requestBody: 'orderType:1 price:10 createTime:213432432, userName:henry',
      requestHeader: 'Content-Type: text/html;charset=UTF-8-23',
      expectRes: 'code:200,message:success',
      realRes: 'code:200,message:success',
      finallyRes: 'Pass'
    }]
  }
})

/**
 * 用户管理
 */
Mock.mock(baseUrl.domain + baseInterface.getUserCenterInfo, 'post', data => {
  const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success',
    data: getUserCenterInfoLists()
  }
})

Mock.mock(baseUrl.domain + baseInterface.getUserCenterInfoByName, 'post', data => {
  const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success',
    data: [{
      userName: 'henryxiao',
      userNick: '肖龙',
      role: '普通用户',
      status: '开启',
      createTime: '2020-03-25 13:00:00',
      updateTime: '2020-03-25 13:00:00'
    }]
  }
})

Mock.mock(baseUrl.domain + baseInterface.updateUserPermission, 'post', data => {
  const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success'
  }
})
