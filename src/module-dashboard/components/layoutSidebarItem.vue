<template>
  <div class="menu-wrapper">
    <el-col :span="24">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        text-color="#fffffb"
        :router="true"
      >
        <el-menu-item index="/dashboard">
          <template slot="title" :click="updateDashboard">
            <i class="el-icon-location"></i>
            <span>首页</span>
          </template>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>任务管理</span>
          </template>
          <el-menu-item-group style="background-color:#5586FE">
            <el-menu-item index="/taskList">任务列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">报告管理</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
import { generateTitle } from '@/utils/i18n'

export default {
  methods: {
    handleOpen(key, keyPath) {

    },
    handleClose(key, keyPath) {
      console.log(keyPath)
    },
    updateDashboard() {
      console.log('dadsa')
      this.$router.push({ path: '/dashboard' })
    }
  }
}
</script>
