// 创建任务列表mock数据

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
