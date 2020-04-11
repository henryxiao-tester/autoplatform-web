// //   在http.js中引入axios
// import axios from 'axios' // 引入 axios
// import QS from 'qs' // 引入qs模块，用来序列化post类型的数据，某些请求会用得到
// import {
//   Message
// } from 'element-ui' // 引入 element-ui 的 Message 模块，用于信息提示
// import store from '@/store' // 引入 vuex 中的数据

// // create an axios instance   创建axios实例
// export const request = axios.create({
//   baseURL: process.env.BASE_API, // api 的 base_url
//   timeout: 5000, // request timeout  设置请求超时时间
//   responseType: 'json',
//   withCredentials: true, // 是否允许带cookie这些
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded'
//   }
// })

// // create an axios instance
// request.interceptors.request.use(
//   config => {
//     // 在发送请求之前做什么
//     if (config.method === 'post') {
//       // 序列化
//       // config.data = qs.stringify(config.data);
//       // config.data = JSON.stringify(config.data);
//     } else {
//       if (store.getters.token) {
//         // 若是有做鉴权token , 就给头部带上token
//         // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
//         // 若是需要跨站点,存放到 cookie 会好一点,限制也没那么多,有些浏览环境限制了 localstorage (隐身模式)的使用
//         // config.headers['X-Token'] = getToken()
//       }
//     }
//     return config
//   },
//   error => {
//     // 对请求错误做些什么，自己定义
//     Message({ // 使用element-ui的message进行信息提示
//       showClose: true,
//       message: error,
//       type: 'warning'
//     })
//     return Promise.reject(error)
//   }
// )

// // response interceptor
// request.interceptors.response.use(
//   response => {
//     // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
//     // 否则的话抛出错误
//     if (response.status === 20000) {
//       return Promise.resolve(response)
//     } else {
//       return Promise.reject(response)
//     }
//   },
//   // 服务器状态码不是2开头的的情况
//   // 这里可以跟你们的后台开发人员协商好统一的错误状态码
//   // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
//   // 下面列举几个常见的操作，其他需求可自行扩展
//   error => {
//     if (error.response.status) {
//       switch (error.response.status) {
//         // 401: 未登录
//         // 未登录则跳转登录页面，并携带当前页面的路径
//         // 在登录成功后返回当前页面，这一步需要在登录页操作。
//         case 40011:
//           router.replace({
//               path: '/login',
//               query: {
//                 redirect: router.currentRoute.fullPath
//               }
//             },
//             Message({
//               message: '登录失效，请重新登录',
//               duration: 1000,
//               forbidClick: true
//             }))
//           break

//           // 403 token过期
//           // 登录过期对用户进行提示
//           // 清除本地token和清空vuex中token对象
//           // 跳转登录页面
//         case 403:
//           Message({
//             message: '登录过期，请重新登录',
//             duration: 1000,
//             forbidClick: true
//           })
//           // 清除token
//           localStorage.removeItem('token')
//           store.commit('loginSuccess', null)
//           // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
//           setTimeout(() => {
//             router.replace({
//               path: '/login',
//               query: {
//                 redirect: router.currentRoute.fullPath
//               }
//             })
//           }, 1000)
//           break

//           // 404请求不存在
//         case 404:
//           Message({
//             message: '网络请求不存在',
//             duration: 1500,
//             forbidClick: true
//           })
//           break
//           // 其他错误，直接抛出错误提示
//         default:
//           Message({
//             message: error.response.data.message,
//             duration: 1500,
//             forbidClick: true
//           })
//       }
//       return Promise.reject(error.response)
//     }
//   }
// )
