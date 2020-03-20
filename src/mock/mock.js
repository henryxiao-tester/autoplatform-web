import Mock from 'mockjs'
import {
  baseUrl,
  baseInterface
} from './mockconfig'

const Random = Mock.Random

// mock需要给三个参数,url(与axios请求是传的url一致,我这个是本地启动的项目就直接用本地域名了)
// 请求类型: get post...其他看文档
// 数据处理函数,函数需要return数据
Mock.mock(baseUrl.dev + baseInterface.login, 'get', () => {
  return {
    code: 200,
    message: 'success',
    data: [{
      username: 'henry',
      password: '123456',
      age: 18
    }]
  }
})
// post请求,带参数,参数会在data中返回,会返回url,type,body三个参数,可以把data打印出来看看
Mock.mock(baseUrl.dev + baseInterface.login, 'post', data => {
  // 请求传过来的参数在body中,传回的是json字符串,需要转义一下
  const info = JSON.parse(data.body)
  return {
    code: 200,
    message: 'success',
    data: [{
      username: 'henry',
      password: '123456',
      age: 18
    }]
  }
})
