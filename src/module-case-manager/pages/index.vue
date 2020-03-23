<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never">
        <el-input
          placeholder="请输用例名称"
          v-model="input"
          clearable
          style="width:200px;margin-bottom:20px"
        ></el-input>
        <el-button type="primary" @click="selectCaseData">查询</el-button>
        <el-button type="primary" @click="addCaseData" style="float:right;margin-right:30px">添加用例</el-button>
        <el-dialog title="添加测试用例" :visible.sync="dialogTableVisible">
          <el-input
            placeholder="请输包类名"
            v-model="packageClassName"
            clearable
            style="width:200px;margin-bottom:20px"
          ></el-input>
          <el-button type="primary" @click="selectCaseSuite">查询</el-button>
          <el-table :data="caseSuiteData">
            <!-- <el-table-column type="selection" width="55"></el-table-column> -->
            <el-table-column type="index" label="序号" width="50px"></el-table-column>
            <el-table-column property="packageName" label="包类名"></el-table-column>
            <el-table-column property="status" label="状态" width="150px">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.status"
                  :inactive-value="0"
                  :active-value="1"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="changeSwitch(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
        <el-table :data="dataList" border style="width: 100%">
          <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
          <el-table-column fixed prop="caseName" label="用例名称"></el-table-column>
          <el-table-column fixed prop="caseSuite" label="用例集"></el-table-column>
          <el-table-column fixed prop="description" label="描述信息"></el-table-column>
          <el-table-column fixed prop="author" label="作者"></el-table-column>
          <el-table-column fixed prop="createTime" label="创建时间"></el-table-column>
          <el-table-column fixed prop="updateTime" label="更新时间"></el-table-column>

          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click=" handleUpdate(scope.row)">修改</el-button>
              <el-button @click="handleDelete(scope.row)" type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-button :plain="true" @click="openWarning" v-show="false"></el-button>
    </div>
  </div>
</template>

<script>
import { baseUrl, baseInterface } from '../../mock/mockconfig.js'
export default {
  name: 'saas-clients-index',
  data() {
    return {
      input: '', // 输入用例名称
      packageClassName: ' ', // 包类名
      caseSuiteData: '',
      dialogTableVisible: false,
      dialogFormVisible: false,
      dataList: [],
      form: {
        id: '',
        caseName: '',
        caseSuite: [],
        description: '',
        author: '',
        createTime: '',
        updateTime: ''
      }
    }
  },
  methods: {
    getList() {
      this.$axios.post(baseUrl.domain + baseInterface.getCaseInfo, {

      }).then(res => {
        if (res.data.code === 200) {
          this.dataList = res.data.data
          // this.form.id = res.data.data.id
          // this.form.caseName = res.data.data.id
          // this.form.caseSuite = res.data.data.id
          // this.form.description = res.data.data.id
          // this.form.author = res.data.data.id
          // this.form.id = res.data.data.id
        }
      })
    },
    /**
     * 添加用例
     */
    addCaseData() {

      this.$axios.post(baseUrl.domain + baseInterface.getCaseSuiteInfo, {
        pageSize: 1
      }).then(res => {
        if (res.data.code === 200) {
          this.dialogTableVisible = true
          this.caseSuiteData = res.data.data
        } else {
          this.openWarning(res.data.message, 'error')
        }
      })

    },
    /**
     * 根据用例名称查询用例
     */
    selectCaseData() {

    },
    /**
     * 修改用例
     */
    handleUpdate(val) {

    },
    /**
     * 删除用例
     */
    handleDelete(val) {

    },
    changeSwitch(val) {
      console.log(val)
    },
    /**
     * 添加用例 =》查询
     */
    selectCaseSuite() {

    },
    openWarning(msg, typeValue) {
      this.$message({
        message: msg,
        type: typeValue
      })
    }

  },
  // 创建完毕状态
  created() {
    this.getList()
  }
}
</script>
