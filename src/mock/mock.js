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
Mock.XHR.prototype.withCredentials = true

// mock需要给三个参数,url(与axios请求是传的url一致,我这个是本地启动的项目就直接用本地域名了)
// 请求类型: get post...其他看文档
// 数据处理函数,函数需要return数据
Mock.mock(baseUrl.domain + baseInterface.login, 'post', (data) => {
  return {
    code: 20000,
    message: 'success',
    data: {
      id: 2312311123,
      userName: 'henryxiao',
      password: '123456',
      roleId: 0,
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
Mock.mock(baseUrl.domain + baseInterface.getTaskList, 'post', (data) => {
  // const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success',
    data: mockTaskList()
  }
})
// 任务列表获取用例集信息
Mock.mock(baseUrl.domain + baseInterface.getCaseSuiteList, 'post', (data) => {
  // const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success',
    data: getCaseSuiteLists()
  }
})
// mock获取查询任务列表中的数据
Mock.mock(baseUrl.domain + baseInterface.getTaskDataByName, 'post', (data) => {
  // const info = JSON.parse(data.body)
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
Mock.mock(
  baseUrl.domain + baseInterface.updateTaskDataByName,
  'post',
  (data) => {
    // const info = JSON.parse(data.body)
    return {
      code: 200,
      message: 'success'
    }
  }
)

// 删除任务列表中的数据
Mock.mock(baseUrl.domain + baseInterface.deleteTaskData, 'post', (data) => {
  // const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success'
  }
})

// 添加任务
Mock.mock(baseUrl.domain + baseInterface.addTaskData, 'post', (data) => {
  // const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success'
  }
})

// 执行任务列表中的数据
Mock.mock(baseUrl.domain + baseInterface.excuteTask, 'post', (data) => {
  // const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success'
  }
})
// 任务绑定用例集
Mock.mock(baseUrl.domain + baseInterface.bindingCaseSuite, 'post', (data) => {
  // const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success'
  }
})

// 修改个人中心信息
Mock.mock(baseUrl.domain + baseInterface.getUserInfo, 'post', (data) => {
  // const info = JSON.parse(data.body)
  return {
    code: 20000,
    message: 'success',
    data: {
      uid: '3242342311',
      username: 'henry',
      password: 'sadsadsa',
      role: 1,
      userNick: 'henryxiao',
      createTime: '2020-03-22'
    }
  }
})

// 修改个人中心信息
Mock.mock(baseUrl.domain + baseInterface.updateUserInfo, 'post', (data) => {
  // const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success'
  }
})

/**
 * 用例管理
 */
Mock.mock(baseUrl.domain + baseInterface.getCaseSuiteInfo, 'post', (data) => {
  // const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success',
    data: getCaseSuiteInfo()
  }
})
Mock.mock(baseUrl.domain + baseInterface.findCaseSuiteInfo, 'post', (data) => {
  // const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success',
    data: [{
      packageName: 'com.test.interface.LoginTestCase',
      status: 1
    }]
  }
})

Mock.mock(baseUrl.domain + baseInterface.updateCaseInfo, 'post', (data) => {
  // const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success'
  }
})

Mock.mock(baseUrl.domain + baseInterface.getCaseInfo, 'post', (data) => {
  // const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success',
    data: getCaseInfoList()
  }
})
Mock.mock(baseUrl.domain + baseInterface.deleteCaseInfo, 'post', (data) => {
  // const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success'
  }
})

Mock.mock(baseUrl.domain + baseInterface.getCaseInfo, 'post', (data) => {
  // const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success',
    data: getCaseInfoList()
  }
})

Mock.mock(baseUrl.domain + baseInterface.findCaseInfo, 'post', (data) => {
  // const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success',
    data: [{
      id: '2132432432',
      caseName: '测试查询用户登录',
      caseSuite: [
        'com.test.interface.LoginTestCase',
        'com.test.interface.LoginTestCase'
      ],
      description: '查询测试效果',
      author: 'henry',
      createTime: '2020-03-23 12:00:00',
      updateTime: '2020-03-11 12:00:00'
    }]
  }
})

/**
 * 用例
 */
Mock.mock(baseUrl.domain + baseInterface.addCase, 'post', (data) => {
  // const info = JSON.parse(data.body)
  return {
    code: 20000,
    message: 'success'
  }
})

Mock.mock(baseUrl.domain + baseInterface.updateCase, 'post', (data) => {
  // const info = JSON.parse(data.body)
  return {
    code: 20000,
    message: 'success'
  }
})

Mock.mock(baseUrl.domain + baseInterface.deleteCase, 'post', (data) => {
  // const info = JSON.parse(data.body)
  return {
    code: 20000,
    message: 'success'
  }
})

Mock.mock(baseUrl.domain + baseInterface.getAllCase, 'post', (data) => {
  // const info = JSON.parse(data.body)
  return {
    code: 20000,
    message: 'success',
    data: getCaseInfoList()
  }
})

Mock.mock(baseUrl.domain + baseInterface.findCaseInfoByName, 'post', (data) => {
  // const info = JSON.parse(data.body)
  return {
    code: 20000,
    message: 'success',
    data: [{
      id: '2132432432',
      caseName: '测试查询用户登录',
      caseSuite: [
        'com.test.interface.LoginTestCase',
        'com.test.interface.LoginTestCase'
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
Mock.mock(
  baseUrl.domain + baseInterface.getUserOperatonInfo,
  'post',
  (data) => {
    // const info = JSON.parse(data.body)
    return {
      code: 200,
      message: 'success',
      data: getUserOperatonInfoLists()
    }
  }
)

/**
 * 获取报告列表数据
 */
Mock.mock(baseUrl.domain + baseInterface.getReportInfo, 'post', (data) => {
  // const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success',
    data: getReportInfoLists()
  }
})

Mock.mock(
  baseUrl.domain + baseInterface.getReportInfoByName,
  'post',
  (data) => {
    // const info = JSON.parse(data.body)
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
  }
)

/**
 * 用户管理
 */
Mock.mock(baseUrl.domain + baseInterface.getUserManagerInfo, 'post', (data) => {
  // const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success',
    data: {
      list: getUserCenterInfoLists(),
      total: 20
    }
  }
})

Mock.mock(
  baseUrl.domain + baseInterface.getUserManagerInfoByName,
  'post',
  (data) => {
    // const info = JSON.parse(data.body)
    return {
      code: 20000,
      message: 'success',
      data: {
        list: [{
          username: 'henryxiao',
          userNick: 'henryxiao',
          roleId: 1,
          status: 1,
          createTime: '2020-03-25 13:00:00',
          updateTime: '2020-03-25 13:00:00'
        }],
        total: 1
      }

    }
  }
)

Mock.mock(
  baseUrl.domain + baseInterface.updateUserPermission,
  'post',
  (data) => {
    // const info = JSON.parse(data.body)
    return {
      code: 200,
      message: 'success'
    }
  }
)

/**
 * 看板管理
 */
Mock.mock(baseUrl.domain + baseInterface.getBoardDataForTaskOne, 'post', (data) => {
  return {
    code: 20000,
    message: 'success',
    data: {
      passNums: 320,
      failNums: 28,
      blockNums: 11
    }
  }
})

Mock.mock(baseUrl.domain + baseInterface.getBoardDataForTaskTwo, 'post', (data) => {
  return {
    code: 20000,
    message: 'success',
    data: {
      passNums: 320,
      failNums: 28,
      blockNums: 11
    }
  }
})

Mock.mock(baseUrl.domain + baseInterface.getBoardDataForTaskThree, 'post', (data) => {
  return {
    code: 20000,
    message: 'success',
    data: {
      passNums: 320,
      failNums: 28,
      blockNums: 11
    }
  }
})

Mock.mock(baseUrl.domain + baseInterface.getBoardDataForTaskFour, 'post', (data) => {
  return {
    code: 20000,
    message: 'success',
    data: {
      passNums: 320,
      failNums: 28,
      blockNums: 11
    }
  }
})

Mock.mock(baseUrl.domain + baseInterface.getBoardDataForTaskFive, 'post', (data) => {
  return {
    code: 20000,
    message: 'success',
    data: {
      passNums: 320,
      failNums: 28,
      blockNums: 11
    }
  }
})

Mock.mock(baseUrl.domain + baseInterface.getBoardDataForTaskSix, 'post', () => {
  return {
    code: 20000,
    message: 'success',
    data: {
      weeks: {
        passNums: [],
        failNums: [],
        blockNums: []
      },
      months: {

      }
    }
  }
})
