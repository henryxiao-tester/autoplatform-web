<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never">
        <el-tabs v-model="activeName">
          <el-tab-pane label="企业信息" name="first">
            <el-form ref="form" :model="formData" label-width="400px">
              <el-form-item label="企业名称">
                <el-input v-model="formData.name" style="width:350px" disabled></el-input>
              </el-form-item>
              <el-form-item label="企业地区">
                <el-input v-model="formData.companyArea" style="width:350px" disabled></el-input>
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="formData.companyAddress" style="width:350px" disabled></el-input>
              </el-form-item>
              <el-form-item label="审核状态">
                <el-input v-model="formData.state" style="width:350px" disabled></el-input>
              </el-form-item>
              <el-form-item label="法人代表">
                <el-input v-model="formData.legalRepresentative" style="width:350px" disabled></el-input>
              </el-form-item>
              <el-form-item label="公司电话">
                <el-input v-model="formData.companyPhone" style="width:350px" disabled></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="formData.mailbox" style="width:350px" disabled></el-input>
              </el-form-item>
              <el-form-item label="公司规模">
                <el-input v-model="formData.companySize" style="width:350px" disabled></el-input>
              </el-form-item>
              <el-form-item label="所属行业">
                <el-input v-model="formData.industry" style="width:350px" disabled></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="formData.remark" style="width:350px"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">审核</el-button>
                <el-button>拒绝</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="账户信息" name="second">账户信息</el-tab-pane>
          <el-tab-pane label="交易记录" name="third">交易记录</el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { detail } from '@/api/base/saasClient'
export default {
  name: 'saas-clients-detail',
  data() {
    return {
      activeName: 'first',
      formData: {}
    }
  },
  methods: {
    detail(id) {
      detail({ id: id }).then(res => {
        this.formData = res.data.data
        console.log(id)
        console.log(this.formData)
      })
    }
  },
  // 创建完毕状态
  created() {
    var id = this.$route.params.id
    this.detail(id)
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
