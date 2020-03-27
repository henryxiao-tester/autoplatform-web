<template>
  <div class="menu-wrapper">
    <el-col :span="24">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        text-color="#fffffb"
        background-color="#4B7CFB"
        :router="true"
      >
        <el-menu-item index="/dashboard">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>首页</span>
          </template>
        </el-menu-item>
        <el-submenu index="2" @close="index">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>任务管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/task/taskList">任务列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3" @close="index">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>用例管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/case-manager/caseSuiteList">用例集列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/case-manager/caseList">用例列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/report-manager/reportList">
          <i class="el-icon-document"></i>
          <span slot="title">报告管理</span>
        </el-menu-item>
        <el-menu-item index="/personalCenter">
          <i class="el-icon-setting"></i>
          <span slot="title">个人中心</span>
        </el-menu-item>
        <el-menu-item index="/user/userCenter">
          <i class="el-icon-edit"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    // var getClickEvent = document.querySelector('')
    return {
      index: ''
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      this.index = key
    },
    handleClose(key, keyPath) {
      // console.log(key)
      // console.log(keyPath)
    },
    close(index) {

    }
  }

}
</script>
<style >
</style>
