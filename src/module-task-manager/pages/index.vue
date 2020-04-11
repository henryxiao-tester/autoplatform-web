<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never">
        <el-input
          placeholder="请输任务名称"
          v-model="input"
          clearable
          style="width:200px;margin-bottom:20px"
        ></el-input>
        <el-button type="primary" @click="selectData">查询</el-button>
        <el-button type="primary" @click="addTask" style="float:right;margin-right:20px">添加任务</el-button>
        <el-button type="primary" @click="getCaseInfo" style="float:right;margin-right:20px">绑定用例集</el-button>
        <el-dialog title="当前任务绑定用例集" :visible.sync="Visible">
          <el-input
            placeholder="请输用例集名称"
            v-model="caseSuiteName"
            clearable
            style="width:200px;margin-bottom:20px"
          ></el-input>
          <el-input
            placeholder="请输用任务ID(必填)"
            v-model="inputTaskId"
            clearable
            style="width:200px;margin-bottom:20px;float:right"
          ></el-input>
          <el-button type="primary" @click="selectCaseSuite">查询</el-button>
          <el-table :data="showCaseSuiteTable">
            <el-table-column type="index" label="序号" width="50px">
              <template slot-scope="scope">
                <span>{{(currentPage - 1) * 10 + scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column property="id" label="用例集ID"></el-table-column>
            <el-table-column property="caseName" label="用例集名称"></el-table-column>
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
            <el-button @click="Visible = false">取 消</el-button>
            <el-button type="primary" @click="bindingCaseSuite">确 定</el-button>
          </div>
          <el-pagination
            layout="prev, pager, next"
            :total="this.len"
            :page-size="10"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </el-dialog>

        <el-table :data="showTaskList" border style="width: 100%">
          <el-table-column fixed type="index" label="序号" width="50">
            <template slot-scope="scope">
              <span>{{(caseListPage - 1) * 20 + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed prop="taskId" label="任务ID"></el-table-column>
          <el-table-column fixed prop="taskName" label="任务名称"></el-table-column>
          <el-table-column fixed prop="casesID" label="关联用例集" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column fixed prop="createTime" label="创建时间"></el-table-column>
          <el-table-column fixed prop="updateTime" label="修改时间"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click=" handleUpdate(scope.row)">修改</el-button>
              <el-button @click="handleDelete(scope.row)" type="text">删除</el-button>
              <el-button @click="handleExcute(scope.row)" type="text">执行</el-button>
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
      <el-dialog title="修改当前任务" :visible.sync="dialogFormVisible" width="600px">
        <el-form :model="form">
          <el-form-item label="任务ID" :label-width="formLabelWidth">
            <el-input v-model="form.taskId" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="任务名称" :label-width="formLabelWidth">
            <el-input v-model="form.taskName" auto-complete="off"></el-input>
          </el-form-item>
          <div class="box">
            <div class="top">
              <div class="bottom">
                <el-tooltip class="item" effect="dark" content="填写用例集ID,多个逗号添加" placement="bottom">
                  <el-form-item label="关联用例集" :label-width="formLabelWidth">
                    <el-input v-model="form.casesID" auto-complete="off"></el-input>
                  </el-form-item>
                </el-tooltip>
              </div>
            </div>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureModify">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="添加任务" :visible.sync="taskVisible" width="600px">
        <el-form>
          <el-form-item label="任务名称" :label-width="formLabelWidth">
            <el-input v-model="addTaskName" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="taskVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureAddTask">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { list } from '@/api/base/saasClient'
import { inputDataCheck } from '../../utils/common'
import { baseUrl, baseInterface } from '../../mock/mockconfig.js'

export default {

  data() {
    return {
      dataList: [],
      input: '',
      inputTaskId: '',
      caseSuites: [],
      addTaskName: '',
      len: 0,
      caseSuiteData: [],
      Visible: false,
      currentPage: 1,
      dialogTableVisible: false,
      dialogFormVisible: false,
      taskVisible: false,
      caseListPage: 1,
      form: {
        taskName: '',
        taskId: '',
        casesID: ''
      },
      formLabelWidth: '120px',
      delCallBack: false,
      caseSuiteName: ''
    }
  },
  methods: {
    /**
     * 选中状态切换
     */
    changeSwitch(data) {
      this.caseSuites.push(data.id)
      console.log(this.caseSuites)
    },
    /**
     * 添加任务
     */
    addTask() {
      this.taskVisible = true
    },
    sureAddTask() {
      if (inputDataCheck(this.addTaskName)) {
        this.openWarning('任务名称不能为空', 'error')
        return null
      }
      this.$axios.post(baseUrl.domain + baseInterface.addTaskData, {
        taskName: this.addTaskName
      }).then(res => {
        if (res.data.code === 200) {
          this.taskVisible = false
          this.openWarning(res.data.message, 'success')
        } else {
          this.openWarning(res.data.message, 'error')
        }
      })
    },
    /**
    * 添加任务 =》查询
    */
    selectCaseSuite() {
      if (inputDataCheck(this.caseSuiteName)) {
        this.$axios.post(baseUrl.domain + baseInterface.getCaseInfo, {
          pageSize: 1
        }).then(res => {
          this.caseSuiteData = res.data.data
        })
      } else {
        this.$axios.post(baseUrl.domain + baseInterface.getCaseInfo, {
          caseSuiteName: this.caseSuiteName
        }).then(res => {
          console.log(this.caseSuiteData)
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
     * 点击菜单列表初始化显示所有数据
     */
    getList() {
      this.$axios.post(baseUrl.domain + baseInterface.getTaskList, {
        pageSize: 1
      }).then(res => {
        this.dataList = res.data.data
      })
    },
    /**
     * 任务绑定用例集
     */
    bindingCaseSuite() {
      if (inputDataCheck(this.inputTaskId)) {
        this.openWarning('任务ID不能为空', 'error')
        return null
      }
      this.$axios.post(baseUrl.domain + baseInterface.bindingCaseSuite, {
        taskId: this.inputTaskId,
        caseSuiteId: this.caseSuites
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
  * 获取用例集信息
  */
    getCaseInfo() {
      this.$axios.post(baseUrl.domain + baseInterface.getCaseInfo, {
        pageSize: 1
      }).then(res => {
        if (res.data.code === 200) {
          this.Visible = true

          this.caseSuiteData = res.data.data
          this.len = this.caseSuiteData.length
          console.log(res.data.data)
        } else {
          this.openWarning(res.data.message, 'error')
        }
      })
    },
    /**
     * 根据任务名称搜索框查询，不填查询所有
     */
    selectData() {
      if (inputDataCheck(this.input)) {
        this.$axios.post(baseUrl.domain + baseInterface.getTaskList, {
          pageSize: 1
        }).then(res => {
          this.dataList = res.data.data
        })
      } else {
        this.$axios.post(baseUrl.domain + baseInterface.getTaskDataByName, {
          pageSize: 1,
          taskName: this.input
        }).then(res => {
          this.dataList = res.data.data
        })
      }
    },
    /**
     * 修改任务
     */
    handleUpdate(data) {
      this.dialogFormVisible = true
      this.form.taskName = data.taskName
      this.form.taskId = data.taskId
      this.form.casesID = data.casesID
    },
    sureModify() {
      this.$axios.post(baseUrl.domain + baseInterface.updateTaskDataByName, {
        taskName: this.form.taskName,
        taskId: this.form.taskId,
        casesID: this.form.casesID
      }).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.dialogFormVisible = false
          this.openWarning(res.data.message, 'success')
        } else {
          this.openWarning(res.data.message, 'error')
        }
      })
    },
    /**
     * 删除任务
     */
    handleDelete(data) {
      this.$confirm('此操作将删除此任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((action) => {
        /**
         * 若拿到提交回调则进行删除操作
         */
        if (action === 'confirm') {
          this.$axios.post(baseUrl.domain + baseInterface.deleteTaskData, {
            taskId: data.taskId
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
          this.$axios.post(baseUrl.domain + baseInterface.getTaskList, {
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
    /**
     * 执行任务
     */
    handleExcute(data) {
      this.$confirm('是否执行该条任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((action) => {
        if (action === 'confirm') {
          this.$axios.post(baseUrl.domain + baseInterface.excuteTask, {
            taskId: data.taskId
          }).then(res => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '执行成功!'
              })
            } else {
              this.$message({
                type: 'info',
                message: '请求异常'
              })
            }
          })

        }

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
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
    showTaskList() {
      return this.dataList.slice(
        (this.caseListPage - 1) * 20, this.caseListPage * 20
      )
    },
    showCaseSuiteTable() {
      console.log(this.currentPage)
      console.log(this.caseSuiteData.slice(
        (this.currentPage - 1) * 10, this.currentPage * 10
      ))
      return this.caseSuiteData.slice(
        (this.currentPage - 1) * 10, this.currentPage * 10
      )
    }
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
.box {
  width: 400px;

  .top {
    text-align: center;
  }

  .left {
    float: left;
    width: 60px;
  }

  .right {
    float: right;
    width: 60px;
  }

  .bottom {
    clear: both;
    text-align: center;
  }

  .item {
    margin: 4px;
  }

  .left .el-tooltip__popper,
  .right .el-tooltip__popper {
    padding: 8px 10px;
  }
}
</style>
