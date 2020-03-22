<template>
  <div class="login-container">
    <el-form
      class="login-form"
      auto-complete="on"
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
      label-position="left"
    >
      <div class="title-container">
        <h1 class="title" style="font-size: 40px;letter-spacing: 8px">自动化测试平台</h1>
      </div>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          name="username"
          type="text"
          v-model="loginForm.username"
          auto-complete="on"
          placeholder="请输入用户名"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          name="password"
          :type="passwordType"
          v-model="loginForm.password"
          placeholder="请输入密码"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>

      <el-button
        class="loginBtn"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        :loading="loading"
        @click.native.prevent="handleLogin"
        :disabled="isClick"
      >登录</el-button>

      <div class="regInfo">
        <router-link :to="{ path: '/reg' }">还没有账号？立即注册</router-link>
      </div>
      <div>
        <el-button :plain="false" v-show="false" @click="openError"></el-button>
      </div>
    </el-form>

    <el-dialog :title="$t('login.thirdparty')" :visible.sync="showDialog" append-to-body>
      {{ $t("login.thirdpartyTips") }}
      <br />
      <br />
      <br />
      <login-social-signin />
    </el-dialog>
  </div>
</template>

<script>
import { validateEmail } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
import loginSocialSignin from './../components/loginSocialSignin'
import shajs from 'sha.js'
import router from 'vue-router'
import { Message } from 'element-ui'
import { baseUrl, baseInterface } from '../../mock/mockconfig.js'
import { userLoginData } from '../../utils/common'

export default {

  components: { LangSelect, loginSocialSignin },
  name: 'login',
  data() {

    const validateUsername = (rule, value, callback) => {
      // 正则匹配6-16位不含中文
      var userPattern = /^[a-zA-Z0-9_-]{6,16}$/

      let isPattern = userPattern.test(value)

      if (!value) {
        return callback(new Error('用户名不能为空'))
      } else if (value.length < 6) {
        return callback(new Error('请输入6-16位字符,不含中文'))
      }
      return callback()
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6 && value) {
        callback(new Error('密码不能小于6位'))
        return false
      } else if (!value) {
        callback(new Error('密码不能为空'))
        return false
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      isClick: true
    }
  },
  methods: {
    // 错误消息提示弹框
    openError(message) {
      this.$message.error(message)
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    validateUsername() {
      // 正则匹配6-16位不含中文
      var userPattern = /^[a-zA-Z0-9_-]{6,16}$/

      let isPattern = userPattern.test(value)

      if (!this.loginForm.username) {
        return false
      } else if (this.loginForm.username < 6) {

        return false
      }
      return true
    },
    validatePassword() {
      if (this.loginForm.password < 6 && this.loginForm.password) {
        return false
      } else if (!this.loginForm.password) {
        return false
      } else {

        return true
      }
    },

    handleLogin() {
      this.loading = true
      if (this.validatePassword && this.validateUsername) {
        /**
         * get请求方式
         */
        //   this.$axios.get(baseUrl.domain + baseInterface.login).then(res => {
        //     if (res.data.code === 200) {
        //       this.$router.push({ path: '/dashboard' })
        //     } else {
        //       var errorInfo = res.data.message
        //       this.openError(errorInfo)
        //       this.loading = false
        //     }

        //   })
        // }

        /**
         * post请求方式
         */
        this.$axios.post(baseUrl.domain + baseInterface.login, {
          userName: this.loginForm.username,
          password: this.loginForm.password
        }).then(res => {
          if (res.data.code === 200) {
            this.$router.push({ path: '/dashboard' })
            userLoginData.id = res.data.id
            userLoginData.userName = res.data.userName
            userLoginData.password = res.data.password
            userLoginData.role = res.data.role
            userLoginData.userNick = res.data.userNick
            userLoginData.createTime = res.data.createTime
          } else {
            var errorInfo = res.data.message
            this.openError(errorInfo)
            this.loading = false
          }
        })
      } else {
        Message.close()
        this.loading = false
        this.openError()
      }
    },
    validateUserAndPwd() {
      if (this.loginForm.username >= 6 && this.loginForm.password >= 6) {
        this.isClick = false
      }
    }
  },

  watch: {
    // 监听用户输入的变化，符合规则可点击登录按钮
    'loginForm.username': function (newVal, oldVal) {
      if (newVal.length >= 6) {
        this.isClick = false
      } else {
        this.isClick = true
      }
    }
  },
  updated() {
    this.validateUserAndPwd()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #68b0fe;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        // -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.7);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background: url(./../assets/login.jpg) 50% 50% no-repeat;
  .login-form {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    width: 520px;
    min-height: 400px;
    padding: 35px 35px 15px 35px;
    margin: -260px auto 0;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
.loginBtn {
  background: #407ffe;
  height: 64px;
  line-height: 32px;
  font-size: 24px;
}
.el-form-item {
  margin-bottom: 20px;
}
.regInfo {
  text-align: center;
  color: #fff;
  font-size: 16px;
}

.city_item {
  list-style: none;
  float: left;
  border: 1px solid orange;
  width: auto;
  height: 50px;
  line-height: 50px;
  padding: 0 5px;
  border-right: none;
}
.city_container :last-of-type {
  border-right: 1px solid orange;
}
.city_container .city_item a {
  text-decoration: none;
  border: none;
}
</style>
