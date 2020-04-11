/**
 * mock域名环境配置
 */
export const baseUrl = {
  domain: 'http://localhost:9090'
  // test: 'http://localhost:8082',
  // online: 'http://localhost:8083'
}

/**
 * 接口配置
 */
export const baseInterface = {
  // 模拟登录、登出
  login: '/user/login',
  logout: '/user/logout',
  register: '/user/register',
  /**
   * 任务列表
   */
  getTaskList: '/task/taskList',
  getTaskDataByName: '/task/getTaskDataByName',
  updateTaskDataByName: '/task/updateTaskDataByName',
  deleteTaskData: '/task/deleteTaskData',
  excuteTask: '/task/deleteTaskData',
  addTaskData: '/task/addTaskData',
  getCaseSuiteList: '/task/getCaseSuiteList',
  bindingCaseSuite: '/task/bindingCaseSuite',
  /**
   * 个人中心
   */
  updateUserInfo: '/user/updateUserPersonalInfo',
  getUserInfo: '/user/getUserInfo',
  /**
   * 用例管理
   */
  // 用例集
  getCaseSuiteInfo: '/caseManager/getCaseSuiteInfo', // 添加用例集获取用例
  addCaseSuite: '/caseManager/addCaseSuite', // 添加用例集
  updateCaseInfo: '/caseManager/updateCaseInfo', // 修改用例集
  getCaseInfo: '/caseManager/getCaseInfo', // 用例列表
  deleteCaseInfo: '/caseManager/deleteCaseInfo',
  findCaseSuiteInfo: '/caseManager/findCaseSuiteInfo',
  // 用例
  addCase: '/caseManager/addCase',
  updateCase: '/caseManager/updateCase',
  deleteCase: '/caseManager/deleteCase',
  getAllCase: '/caseManager/getAllCase',
  findCaseInfoByName: '/caseManager/findCaseInfoByName',
  /**
   * 获取用户操作日志
   */
  getUserOperatonInfo: '/user/getAllOperationRecords',
  /**
   * 报告管理
   */
  getReportInfo: '/report/getReportInfo',

  /**
   * 用户管理
   */
  getUserManagerInfo: '/user/getUserManagerInfo',
  getUserManagerInfoByName: '/user/getUserManagerInfoByName',
  updateUserPermission: '/user/updateUserPermission',

  /**
   * 看板
   */
  getBoardCaseNums: '/board/getBoardCaseNums',
  getBoardDataForTaskOne: '/board/getBoardDataForTaskOne',
  getBoardDataForTaskTwo: '/board/getBoardDataForTaskTwo',
  getBoardDataForTaskThree: '/board/getBoardDataForTaskThree',
  getBoardDataForTaskFour: '/board/getBoardDataForTaskFour',
  getBoardDataForTaskFive: '/board/getBoardDataForTaskFive',
  getBoardDataForTaskSix: '/board/getBoardDataForTaskSix'
}
