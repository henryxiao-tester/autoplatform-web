/**
 * mock域名环境配置
 */
export const baseUrl = {
  domain: 'http://localhost:8081'
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
  /**
   * 任务列表
   */
  getTaskList: '/task/taskList',
  getTaskDataByName: '/task/getTaskDataByName',
  updateTaskDataByName: '/task/updateTaskDataByName',
  deleteTaskData: '/task/deleteTaskData',
  excuteTask: '/task/deleteTaskData',
  /**
   * 个人中心
   */
  updateUserInfo: '/personal/updateUserInfo',
  getUserInfo: '/personal/getUserInfo',
  /**
   * 用例管理
   */
  getCaseSuiteInfo: '/caseManager/getCaseSuiteInfo', // 添加用例获取用例集
  addCase: '/caseManager/addCase', // 添加用例
  updateCaseInfo: '/caseManager/updateCaseInfo', // 修改用例
  getCaseInfo: '/caseManager/getCaseInfo', // 用例列表
  deleteCaseInfo: '/caseManager/deleteCaseInfo',
  findCaseSuiteInfo: '/caseManager/findCaseSuiteInfo'
}
