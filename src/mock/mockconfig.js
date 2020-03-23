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
  getCaseSuiteInfo: '/caseManager/getCaseSuiteInfo',
  addCase: '/caseManager/addCase',
  updateCaseInfo: '/caseManager/updateCaseInfo',
  getCaseInfo: '/caseManager/getCaseInfo'

}
