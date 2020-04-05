'use strict'

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  BASE_API: '"http://192.168.1.91:9090"' //测试环境
})
