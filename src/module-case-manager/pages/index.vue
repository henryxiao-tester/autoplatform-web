<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never">
        <el-input
          placeholder="请输用例集名称"
          v-model="inputData"
          clearable
          style="width:200px;margin-bottom:20px"
        ></el-input>
        <el-button type="primary" @click="selectCaseData">查询</el-button>
        <el-button type="primary" @click="addCaseSuite" style="float:right;margin-right:30px">添加用例集</el-button>
        <el-dialog title="绑定用例" :visible.sync="dialogTableVisible">
          <el-input
            placeholder="请输包类名"
            v-model="packageClassName"
            clearable
            style="width:200px;margin-bottom:20px"
          ></el-input>

          <el-button type="primary" @click="selectCaseSuite">查询</el-button>
          <span
            style="float:right;margin-right:30px;font-size:20px;padding-top:5px"
          >当前用例集ID:&nbsp;&nbsp;&nbsp;&nbsp;{{currentCaseSuiteId}}</span>
          <el-table :data="showCaseSuiteTable">
            <!-- <el-table-column type="selection" width="55"></el-table-column> -->
            <el-table-column type="index" label="序号" width="50px">
              <template slot-scope="scope">
                <span>{{(currentPage - 1) * 10 + scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column property="packageName" label="包类名" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column property="status" label="状态" width="100px">
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
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
          </div>
          <el-pagination
            layout="prev, pager, next"
            :total="this.len"
            :page-size="10"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </el-dialog>
        <el-table :data="showCaseList" border style="width: 100%">
          <el-table-column fixed type="index" label="序号" width="50">
            <template slot-scope="scope">
              <span>{{(caseListPage - 1) * 20 + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed prop="id" label="用例集ID"></el-table-column>
          <el-table-column fixed prop="caseName" label="用例集名称"></el-table-column>
          <el-table-column fixed prop="caseSuite" label="绑定用例" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column fixed prop="description" label="描述信息"></el-table-column>
          <el-table-column fixed prop="author" label="作者"></el-table-column>
          <el-table-column fixed prop="createTime" label="创建时间"></el-table-column>
          <el-table-column fixed prop="updateTime" label="更新时间"></el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="text" @click=" handleUpdate(scope.row)">修改</el-button>
              <el-button @click="handleDelete(scope.row)" type="text">删除</el-button>
              <el-button @click="bindingCaseData(scope.row)" type="text">绑定用例</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button :plain="true" @click="openWarning" v-show="false"></el-button>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="this.dataList.length"
          :page-size="20"
          style="float:right;margin:20px"
          @current-change="handleCaseListPageChange"
        ></el-pagination>
      </el-card>
      <el-dialog title="修改当前用例集" :visible.sync="Visible" width="600px">
        <el-form :model="currentUpdateData">
          <el-form-item label="用例集Id：" :label-width="formLabelWidth">
            <el-input v-model="currentUpdateData.id" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="用例集名称：" :label-width="formLabelWidth">
            <el-input v-model="currentUpdateData.caseName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="绑定用例：" :label-width="formLabelWidth">
            <el-input v-model="currentUpdateData.caseSuite[0]" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述信息：" :label-width="formLabelWidth">
            <el-input v-model="currentUpdateData.description" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="作者：" :label-width="formLabelWidth">
            <el-input v-model="currentUpdateData.author" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="Visible = false">取 消</el-button>
          <el-button type="primary" @click="sureModify">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="添加用例集" :visible.sync="addCaseSuiteVisible" width="600px">
        <el-form :model="addCase">
          <el-form-item label="用例集名称：" :label-width="formLabelWidth">
            <el-input v-model="addCase.caseName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述信息：" :label-width="formLabelWidth">
            <el-input v-model="addCase.description" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="作者：" :label-width="formLabelWidth">
            <el-input v-model="addCase.author" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="Visible = false">取 消</el-button>
          <el-button type="primary" @click="sureCaseSuiteModify">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { baseUrl, baseInterface } from '../../mock/mockconfig.js'
import { inputDataCheck } from '../../utils/common'
export default {
  name: 'saas-clients-index',
  data() {
    return {
      inputData: '', // 输入用例名称
      packageClassName: ' ', // 包类名
      caseSuiteData: [],
      currentCaseSuiteId: '',
      addCaseSuiteVisible: false,
      len: 0,
      currentPage: 1,
      caseListPage: 1,
      dialogTableVisible: false,
      dialogFormVisible: false,
      Visible: false,
      dataList: [],
      formLabelWidth: '120px',
      currentUpdateData: {
        id: '',
        caseName: '',
        caseSuite: [],
        author: '',
        description: ''
      },
      addCase: {
        caseName: '',
        description: '',
        author: ''
      }
    }
  },
  methods: {
    getList() {
      this.$axios.post(baseUrl.domain + baseInterface.getCaseInfo, {
        pageSize: 1
      }).then(res => {
        if (res.data.code === 200) {
          this.dataList = res.data.data
        }
      })
    },
    /**
     * 添加用例
     */
    addCaseSuite() {
      this.addCaseSuiteVisible = true
    },
    sureCaseSuiteModify() {
      if (inputDataCheck(this.addCase.caseName)) {
        this.openWarning('用例集名称不能为空', 'error')
        return null
      }
      this.$axios.post(baseUrl.domain + baseInterface.addCase, {
        caseName: this.addCase.caseName
      }).then(res => {
        if (res.data.code === 200) {
          this.addCaseSuiteVisible = false
          this.openWarning(res.data.message, 'success')
        } else {
          this.openWarning(res.data.message, 'error')
        }
      })
    },
    bindingCaseData(val) {
      this.currentCaseSuiteId = val.id
      this.$axios.post(baseUrl.domain + baseInterface.getCaseSuiteInfo, {
        currentPage: 1
      }).then(res => {
        if (res.data.code === 200) {
          this.caseSuiteData = null
          console.log(res.data.data)
          this.dialogTableVisible = true
          this.caseSuiteData = res.data.data
          this.len = this.caseSuiteData.length

        } else {
          this.openWarning(res.data.message, 'error')
        }
      })

    },
    /**
     * 根据用例名称查询用例
     */
    selectCaseData() {
      if (inputDataCheck(this.inputData)) {
        this.$axios.post(baseUrl.domain + baseInterface.getCaseInfo, {
          pageSize: 1
        }).then(res => {
          this.dataList = res.data.data
        })
      } else {
        this.$axios.post(baseUrl.domain + baseInterface.findCaseInfo, {
          pageSize: 1,
          caseName: this.inputData
        }).then(res => {
          this.dataList = res.data.data
        })
      }
    },
    /**
     * 修改用例
     */
    handleUpdate(data) {
      this.Visible = true
      this.currentUpdateData.id = data.id
      this.currentUpdateData.caseName = data.caseName
      this.currentUpdateData.caseSuite = data.caseSuite
      this.currentUpdateData.author = data.author
      this.currentUpdateData.description = data.description
    },
    sureModify() {
      this.$axios.post(baseUrl.domain + baseInterface.updateCaseInfo, {
        caseId: this.currentUpdateData.id,
        caseName: this.currentUpdateData.caseName,
        caseSuit: this.currentUpdateData.caseSuite,
        author: this.currentUpdateData.author,
        description: this.description
      }).then(res => {
        if (res.data.code === 200) {
          this.Visible = false
          this.openWarning(res.data.message, 'success')
        } else {
          this.openWarning(res.data.message, 'error')
        }
      })
    },
    /**
     * 删除用例
     */
    handleDelete(data) {
      this.$confirm('此操作将删除此用例, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((action) => {
        /**
         * 若拿到提交回调则进行删除操作
         */
        if (action === 'confirm') {
          this.$axios.post(baseUrl.domain + baseInterface.deleteCaseInfo, {
            caseId: this.currentUpdateData.id
          }).then(res => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            } else {
              this.$message({
                type: 'info',
                message: '请求异常'
              })
            }
          })
          /**
         * 删除成功后更新列表
         */
          this.$axios.post(baseUrl.domain + baseInterface.getCaseInfo, {
            pageSize: 1
          }).then(res => {
            this.dataList = res.data.data
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    changeSwitch(val) {
      console.log(val)
    },
    /**
     * 添加用例 =》查询
     */
    selectCaseSuite() {
      if (inputDataCheck(this.packageClassName)) {
        this.$axios.post(baseUrl.domain + baseInterface.getCaseSuiteInfo, {
          pageSize: 1
        }).then(res => {
          this.caseSuiteData = res.data.data
        })
      } else {
        this.$axios.post(baseUrl.domain + baseInterface.findCaseSuiteInfo, {
          packageClassName: this.packageClassName
        }).then(res => {
          console.log(baseInterface.findCaseSuiteInfo)
          console.log(res.data.data[0])
          this.caseSuiteData = res.data.data
        })
      }
    },
    /**
     * 添加用例分页展示
     */
    handleCurrentChange(data) {
      this.currentPage = data
    },
    /**
     * 用例列表分页展示
     */
    handleCaseListPageChange(data) {
      this.caseListPage = data
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
  },
  computed: {
    showCaseSuiteTable() {
      return this.caseSuiteData.slice(
        (this.currentPage - 1) * 10, this.currentPage * 10
      )
    },
    showCaseList() {
      return this.dataList.slice(
        (this.caseListPage - 1) * 20, this.caseListPage * 20
      )
    }
  }
}
</script>
