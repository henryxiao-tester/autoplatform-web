<template>
  <div>
    <el-card class="box-card" body-style="height:1000px" shadow="always">
      <div slot="header" class="clearfix">
        <span style="font-weight:bold;font-size:20px;letter-spacing:2px">个人中心</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="getInfo">修改个人信息</el-button>
      </div>
      <div class="personal">
        <div style="margin: 20px;">
          用户ID：
          <span>{{id}}</span>
        </div>
        <div style="margin: 20px;">
          用户名：
          <span>{{userName}}</span>
        </div>
        <div style="margin: 20px;">
          用户密码：
          <span>{{password}}</span>
        </div>
        <div style="margin: 20px;">
          用户姓名：
          <span>{{userNick}}</span>
        </div>
        <div style="margin: 20px;">
          用户角色：
          <span>{{role}}</span>
        </div>
        <div style="margin: 20px;">
          创建时间：
          <span>{{createTime}}</span>
        </div>
      </div>
    </el-card>
    <el-dialog title="修改个人信息" :visible.sync="dialogFormVisible" width="600px">
      <el-form :model="form">
        <el-form-item label="用户ID" :label-width="formLabelWidth">
          <el-input v-model="form.id" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.userName" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" :label-width="formLabelWidth">
          <el-input v-model="form.userNick" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户角色" :label-width="formLabelWidth">
          <el-input v-model="form.role" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="创建时间" :label-width="formLabelWidth">
          <el-input v-model="form.createTime" auto-complete="off" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>

        <el-button type="primary" @click="updateUserInfo">确 定</el-button>
      </div>
    </el-dialog>
    <el-button :plain="true" @click="openWarning" v-show="false"></el-button>
  </div>
</template>

<script>
import { userLoginData } from '../../utils/common.js'
import { baseUrl, baseInterface } from '../../mock/mockconfig'

export default {
  data() {
    return {
      id: '',
      userName: '',
      password: '',
      role: null,
      userNick: '',
      createTime: '',
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        id: '',
        userName: '',
        password: '',
        role: '',
        userNick: '',
        createTime: ''
      },
      flag: false,
      formLabelWidth: '120px'
    }
  },
  methods: {

    getInfo() {
      this.dialogFormVisible = true
      this.form.id = this.id,
        this.form.userName = this.userName,
        this.form.password = this.password,
        this.form.role = this.role,
        this.form.userNick = this.userNick,
        this.form.createTime = this.createTime
    },
    getUserInfo() {
      this.$axios.post(baseUrl.domain + baseInterface.getUserInfo, {

      }).then(res => {
        if (res.data.code === 200) {
          this.flag = true
          this.id = res.data.data.id
          this.userName = res.data.data.userName
          this.password = res.data.data.password
          this.role = res.data.data.role
          this.createTime = res.data.data.createTime
          this.userNick = res.data.data.userNick
        } else {
          this.openWarning(res.data.message, 'error')
        }
      })
    },
    updateUserInfo() {
      this.$axios.post(baseUrl.domain + baseInterface.updateUserInfo, {
        id: '',
        userNick: '',
        password: ''
      }).then(res => {
        if (res.data.code === 200) {
          this.dialogFormVisible = false
          this.openWarning(res.data.message, 'success')
        } else {
          this.openWarning(res.data.message, 'error')
        }
      })
    },
    openWarning(msg, typeValue) {
      this.$message({
        message: msg,
        type: typeValue
      })
    }
  },

  created() {
    this.getUserInfo()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.personal {
  font-size: 18px;
}
</style>
