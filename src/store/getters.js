// 手动添加需要的 快捷 getters
const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  errorLogs: state => state.errorLog.logs
}

export default getters
