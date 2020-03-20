<template>
  <div class="login-container">
    <div class="login-form">
      <div v-show="regShow">
        <div class="title-container">
          <h3 class="title">
            <h2 style="letter-spacing: 8px">自动化测试平台</h2>
          </h3>
        </div>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名：" prop="userName">
            <el-input type="userName" v-model="ruleForm.userName" placeholder="请输入6-16位字符，不含中文"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" placeholder="请输入6-16位字符，不含中文"></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名：" prop="userNick">
            <el-input v-model.number="ruleForm.userNick" placeholder="请输入真实姓名"></el-input>
          </el-form-item>
          <el-form-item class="primary">
            <el-button
              class="loginBtn"
              type="primary"
              style="width: 250px;"
              @click="submitForm('ruleForm')"
            >注册</el-button>
            <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
          </el-form-item>
        </el-form>
      </div>
      <div class="regInfo">
        <router-link :to="{'path':'/login'}">使用已有帐户登录</router-link>
      </div>
      <div>
        <el-button type="text" @click="open">点击打开 Message Box</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var checkName = (rule, value, callback) => {
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
    var checkNick = (rule, value, callback) => {
      if (!value || value.match(/^[ ]*$/)) {
        return callback(new Error('姓名不能为空'))
      }
      return callback()

    }
    var validatePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码不能为空'))
      } else if (value.length < 6) {
        callback(new Error('请至少输入 6 个字符。请不要使用容易被猜到的密码'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      regShow: true,
      ruleForm: {
        pass: '',
        checkPass: '',
        userNick: '',
        userName: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        userNick: [
          { validator: checkNick, trigger: 'blur' }
        ],
        userName: [
          { validator: checkName, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    open() {
      this.$alert('您注册的信息提交成功，等待管理员审核', '注册成功', {
        confirmButtonText: '确定',
        callback: action => {
          this.$router.push({ path: '/login' })
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('执行成功')
          this.open()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
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
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.7);
    border-radius: 5px;
    color: #454545;
  }
}
.el-form-item__error {
  color: #fff;
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
  height: 40px;
  line-height: 20px;
  font-size: 20px;
}
.el-form-item {
  margin-bottom: 20px;
}

.regInfo {
  text-align: center;
  color: #fff;
  font-size: 16px;
}
.infoPosin {
  .codeBtn {
    background: #fff;
    color: #43a7fe;
    border: 0 none;
    border-radius: 55px;
    position: absolute;
    right: 10px;
    top: 5px;
  }
}
::-webkit-input-placeholder,
:-moz-placeholder,
::-moz-placeholder,
:-ms-input-placeholder {
  color: #43a7fe;
}
</style>
