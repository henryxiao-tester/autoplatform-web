<template>
  <div class="dashboard-container">
    <div class="app-container">{{ massage }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      massage: '欢迎使用自动化测试平台'
    }
  },
  methods: {},
  // 创建完毕状态
  created() { }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.alert {
  margin: 10px 0px 0px 0px;
}
.pagination {
  margin-top: 10px;
  text-align: right;
}
</style>
