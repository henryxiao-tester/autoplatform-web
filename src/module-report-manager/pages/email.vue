<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never">
        <el-input
          placeholder="请输入邮件名称"
          v-model="inputData"
          clearable
          style="width:200px;margin-bottom:20px"
        ></el-input>
        <el-button type="primary" @click="selectEmailByName">查询</el-button>
        <el-button type="primary" @click="addEmailInfo" style="float:right;margin-right:30px">新增邮件规则</el-button>

        <el-table :data="dataList" border style="width: 100%">
          <el-table-column fixed type="index" label="序号" width="50">
            <template slot-scope="scope">
              <span>{{(caseListPage - 1) * 20 + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed prop="emailName" label="邮件名称"></el-table-column>
          <el-table-column fixed prop="taskId" label="绑定任务ID"></el-table-column>
          <el-table-column fixed prop="noticeObj" label="通知对象" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column fixed prop="type" label="类型"></el-table-column>
          <el-table-column fixed prop="createTime" label="创建时间"></el-table-column>
          <el-table-column fixed prop="updateTime" label="更新时间"></el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="text" @click=" handleUpdate(scope.row)">修改</el-button>
              <el-button @click="handleDelete(scope.row)" type="text">删除</el-button>
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
      <el-dialog title="修改当前邮件规则" :visible.sync="Visible" width="600px">
        <el-form :model="currentUpdateData">
          <el-form-item label="邮件Id：" :label-width="formLabelWidth">
            <el-input v-model="currentUpdateData.id" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮件名称：" :label-width="formLabelWidth">
            <el-input v-model="currentUpdateData.emailName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="绑定任务ID：" :label-width="formLabelWidth">
            <el-input v-model="currentUpdateData.taskId" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="类型：" :label-width="formLabelWidth">
            <el-select v-model="currentUpdateData.type" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <div class="box">
            <div class="top">
              <div class="bottom">
                <el-tooltip class="item" effect="dark" content="填写通知对象,多个逗号添加" placement="bottom">
                  <el-form-item label="通知对象：" :label-width="formLabelWidth">
                    <el-input v-model="currentUpdateData.noticeObj" auto-complete="off"></el-input>
                  </el-form-item>
                </el-tooltip>
              </div>
            </div>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="Visible = false">取 消</el-button>
          <el-button type="primary" @click="sureModify">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="添加邮件规则" :visible.sync="addCaseSuiteVisible" width="600px">
        <el-form :model="EmailInfo">
          <el-form-item label="邮件名称：" :label-width="formLabelWidth">
            <el-input v-model="EmailInfo.emailName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="绑定任务ID：" :label-width="formLabelWidth">
            <el-input v-model="EmailInfo.taskId" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="类型：" :label-width="formLabelWidth">
            <el-select v-model="EmailInfo.type" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <div class="box">
            <div class="top">
              <div class="bottom">
                <el-tooltip class="item" effect="dark" content="填写通知对象,多个逗号添加" placement="bottom">
                  <el-form-item label="通知对象：" :label-width="formLabelWidth">
                    <el-input v-model="EmailInfo.noticeObj" auto-complete="off"></el-input>
                  </el-form-item>
                </el-tooltip>
              </div>
            </div>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addCaseSuiteVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureAdd">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { baseUrl, baseInterface } from '../../mock/mockconfig.js'
import { inputDataCheck } from '../../utils/common'
import { formatTime, parseTime } from '../../utils/index.js'

export default {
  name: 'saas-clients-index',
  data() {
    return {
      inputData: '', // 输入邮件名称
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
        taskId: '',
        emailName: '',
        type: '',
        noticeObj: ''
      },
      EmailInfo: {
        id: '',
        emailName: '',
        type: '',
        noticeObj: [],
        taskId: ''
      },
      options: [{
        value: '1',
        label: '自定义'
      }, {
        value: '0',
        label: '通用'
      }, {
        value: '2',
        label: '报警'
      }]
    }
  },
  methods: {
    getList() {
      this.$axios.post(baseUrl.domain + baseInterface.getEmailListInfo, {
        currentPage: 1
      }).then(res => {
        if (res.data.code === 20000) {
          this.dataList = res.data.data.list
          let len = this.dataList.length
          for (let index = 0; index < len; index++) {
            let ctime = parseTime(this.dataList[index].createTime, '{y}-{m}-{d} {h}:{i}:{s}')
            let utime = parseTime(this.dataList[index].updateTime, '{y}-{m}-{d} {h}:{i}:{s}')
            this.dataList[index].createTime = ctime
            this.dataList[index].updateTime = utime
            switch (this.dataList[index].type) {
              case 1:
                this.dataList[index].type = '自定义'
                break
              case 0:
                this.dataList[index].type = '通用'
                break
              case 2:
                this.dataList[index].type = '报警'
                break
              default:
                break
            }
          }
        } else {
          this.openWarning(res.data.message, 'error')
        }
      })
    },
    /**
     * 添加邮件规则
     */
    addEmailInfo() {
      this.EmailInfo = {}
      this.addCaseSuiteVisible = true
    },
    sureAdd() {
      if (inputDataCheck(this.EmailInfo.emailName)) {
        this.openWarning('邮件名称不能为空', 'error')
        return null
      }
      this.$axios.post(baseUrl.domain + baseInterface.addEmailInfo, {
        emailName: this.EmailInfo.emailName,
        taskId: this.EmailInfo.taskId,
        type: this.EmailInfo.type,
        noticeObj: this.EmailInfo.noticeObj
      }).then(res => {
        if (res.data.code === 20000) {
          this.addCaseSuiteVisible = false
          this.getList()
          this.openWarning(res.data.message, 'success')
        } else {
          this.openWarning(res.data.message, 'error')
        }
      })
    },
    /**
     * 根据邮件名查询
     */
    selectEmailByName() {
      this.$axios.post(baseUrl.domain + baseInterface.findEmailInfoByName, {
        emailName: this.inputData,
        currentPage: 1
      }).then(res => {
        if (res.data.code === 20000) {
          this.dataList = res.data.data.list
          let len = this.dataList.length
          for (let index = 0; index < len; index++) {
            let ctime = parseTime(this.dataList[index].createTime, '{y}-{m}-{d} {h}:{i}:{s}')
            let utime = parseTime(this.dataList[index].updateTime, '{y}-{m}-{d} {h}:{i}:{s}')
            this.dataList[index].createTime = ctime
            this.dataList[index].updateTime = utime
            switch (this.dataList[index].type) {
              case 1:
                this.dataList[index].type = '自定义'
                break
              case 0:
                this.dataList[index].type = '通用'
                break
              case 2:
                this.dataList[index].type = '报警'
                break
              default:
                break
            }
          }
        } else {
          this.openWarning(res.data.message, 'error')
        }
      })
    },
    /**
     * 修改邮件规则
     */
    handleUpdate(data) {
      this.Visible = true
      this.currentUpdateData.id = data.emailId
      this.currentUpdateData.emailName = data.emailName
      this.currentUpdateData.taskId = data.taskId
      this.currentUpdateData.noticeObj = data.noticeObj.toString()
      this.currentUpdateData.type = data.type
    },
    sureModify() {
      switch (this.currentUpdateData.type) {
        case '自定义':
          this.currentUpdateData.type = 1
          break
        case '通用':
          this.currentUpdateData.type = 0
          break
        case '报警':
          this.currentUpdateData.type = 2
          break
        default:
          break
      }
      this.$axios.post(baseUrl.domain + baseInterface.updateEmailInfo, {
        emailId: this.currentUpdateData.id,
        emailName: this.currentUpdateData.emailName,
        taskId: this.currentUpdateData.taskId,
        type: this.currentUpdateData.type,
        noticeObj: this.currentUpdateData.noticeObj
      }).then(res => {
        if (res.data.code === 20000) {
          this.Visible = false
          this.openWarning(res.data.message, 'success')
          this.getList()
        } else {
          this.openWarning(res.data.message, 'error')
        }
      })
    },
    /**
     * 删除邮件
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
          this.$axios.post(baseUrl.domain + baseInterface.deleteEmailInfo, {
            emailId: data.emailId
          }).then(res => {
            if (res.data.code === 20000) {
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
          this.getList()
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

    showCaseList() {
      return this.dataList.slice(
        (this.caseListPage - 1) * 20, this.caseListPage * 20
      )
    }
  }
}
</script>
