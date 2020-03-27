<template>
  <div class="dashboard-container">
    <div class="app-container">
      <div id="iframe-container">
        <iframe
          :src="$store.state.iframeSrc"
          scrolling="auto"
          frameborder="0"
          id="iframe"
          style="width:100%;height:1000px"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  data() {
    return {

    }
  },

  methods: {
    showPage() {
      this.$store.state.iframeSrc = 'http://10.0.137.57:9090/listCases'
    }
  },

  // 创建完毕状态
  created() {
    this.showPage()
  }
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
