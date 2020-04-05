<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never">
        <el-input
          placeholder="请输用户姓名"
          v-model="input"
          clearable
          style="width:200px;margin-bottom:20px"
        ></el-input>
        <el-button type="primary" @click="selectData">查询</el-button>
        <el-table :data="dataList" border style="width: 100%">
          <el-table-column fixed type="index" label="序号" width="50">
            <template slot-scope="scope">
              <span>{{(caseListPage - 1) * 20 + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed prop="username" label="用户名"></el-table-column>
          <el-table-column fixed prop="userNick" label="用户姓名"></el-table-column>
          <el-table-column fixed prop="roleId" label="用户角色"></el-table-column>
          <el-table-column fixed prop="status" label="当前状态"></el-table-column>
          <el-table-column fixed prop="createTime" label="创建时间" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column fixed prop="updateTime" label="更新时间" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" @click=" detailPermission(scope.row)">授权</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-button :plain="true" @click="openWarning" v-show="false"></el-button>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="this.total"
          :page-size="20"
          style="float:right;margin:20px"
          @current-change="handleCaseListPageChange"
        ></el-pagination>
      </el-card>
      <el-dialog title="修改用户权限" :visible.sync="dialogFormVisible" width="600px">
        <el-form :model="form">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.username" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户姓名" :label-width="formLabelWidth">
            <el-input v-model="form.userNick" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户角色" :label-width="formLabelWidth">
            <el-select v-model="form.roleId" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="当前状态" :label-width="formLabelWidth">
            <!-- <el-input v-model="form.status" auto-complete="off"> -->
            <el-select v-model="form.status" placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value1"
                :label="item.label"
                :value="item.value1"
              ></el-option>
            </el-select>
            <!-- </el-input> -->
          </el-form-item>
          <el-form-item label="创建时间" :label-width="formLabelWidth">
            <el-input v-model="form.createTime" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="更新时间" :label-width="formLabelWidth">
            <el-input v-model="form.updateTime" auto-complete="off" disabled></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureModify">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { list } from '@/api/base/saasClient'
import { inputDataCheck } from '../../utils/common'
import { baseUrl, baseInterface } from '../../mock/mockconfig.js'
import { formatTime, parseTime } from '../../utils/index.js'

export default {

  data() {
    return {
      dataList: [],
      input: '',
      total: 0,
      currentPage: 1,
      dialogTableVisible: false,
      dialogFormVisible: false,
      caseListPage: 1,
      status: '',
      roleId: '',
      form: {
        uid: '',
        username: '',
        userNick: '',
        roleId: '',
        status: '',
        createTime: '',
        updateTime: ''
      },
      formLabelWidth: '120px',
      delCallBack: false,
      options: [{
        value: '1',
        label: '普通用户'
      }, {
        value: '0',
        label: '管理员'
      }, {
        value: '2',
        label: '高级用户'
      }],
      options1: [{
        value1: '1',
        label: '启用登录'
      }, {
        value1: '0',
        label: '禁用登录'
      }],
      value: '',
      value1: ''
    }
  },
  methods: {
    /**
     * 点击菜单列表初始化显示所有数据
     */
    getList() {
      this.$axios.post(baseUrl.domain + baseInterface.getUserManagerInfo, {
        currentPage: this.currentPage
      }).then(res => {

        this.dataList = res.data.data.list
        this.total = res.data.data.total
        for (let index = 0; index < this.dataList.length; index++) {
          let ctime = parseTime(this.dataList[index].createTime, '{y}-{m}-{d} {h}:{i}:{s}')
          let utime = parseTime(this.dataList[index].updateTime, '{y}-{m}-{d} {h}:{i}:{s}')
          this.dataList[index].createTime = ctime
          this.dataList[index].updateTime = utime
          switch (this.dataList[index].roleId) {
            case 0:
              this.dataList[index].roleId = '管理员'
              break
            case 1:
              this.dataList[index].roleId = '普通用户'
              break
            case 2:
              this.dataList[index].roleId = '高级用户'
              break
            default:
              break
          }
          switch (this.dataList[index].status) {
            case 0:
              this.dataList[index].status = '禁用登录'
              break
            case 1:
              this.dataList[index].status = '启用登录'
              break
            default:
              break
          }
        }
      })
    },
    /**
     * 根据任务名称搜索框查询，不填查询所有
     */
    selectData() {
      this.$axios.post(baseUrl.domain + baseInterface.getUserManagerInfoByName, {
        userNick: this.input,
        currentPage: 1
      }).then(res => {
        if (res.data.code === 20000) {
          this.dataList = res.data.data.list
          this.total = res.data.data.total
          for (let index = 0; index < this.dataList.length; index++) {
            let ctime = parseTime(this.dataList[index].createTime, '{y}-{m}-{d} {h}:{i}:{s}')
            let utime = parseTime(this.dataList[index].updateTime, '{y}-{m}-{d} {h}:{i}:{s}')
            this.dataList[index].createTime = ctime
            this.dataList[index].updateTime = utime
            switch (this.dataList[index].roleId) {
              case 0:
                this.dataList[index].roleId = '管理员'
                break
              case 1:
                this.dataList[index].roleId = '普通用户'
                break
              case 2:
                this.dataList[index].roleId = '高级用户'
                break
              default:
                break
            }
            switch (this.dataList[index].status) {
              case 0:
                this.dataList[index].status = '禁用登录'
                break
              case 1:
                this.dataList[index].status = '启用登录'
                break
              default:
                break
            }
          }
        }
      })
    },
    /**
     * 查看当前用户信息
     */
    detailPermission(data) {
      this.dialogFormVisible = true
      this.form.uid = data.uid
      this.form.username = data.username
      this.form.userNick = data.userNick
      this.form.roleId = data.roleId
      this.form.status = data.status
      this.status = data.status
      this.form.createTime = data.createTime
      this.form.updateTime = data.updateTime
    },
    sureModify() {
      switch (this.form.roleId) {
        case '管理员':
          this.form.roleId = 0
          break
        case '普通用户':
          this.form.roleId = 1
          break
        case '高级用户':
          this.form.roleId = 2
          break
        default:
          break
      }
      switch (this.form.status) {
        case '启用登录':
          this.form.status = 1
          break
        case '禁用登录':
          this.form.status = 0
          break
        default:
          break
      }
      this.dialogFormVisible = false
      this.$axios.post(baseUrl.domain + baseInterface.updateUserPermission, {
        uid: this.form.uid,
        username: this.form.username,
        roleId: this.form.roleId,
        status: this.form.status
      }).then(res => {
        if (res.data.code === 20000) {
          this.dialogFormVisible = false
          this.openWarning(res.data.message, 'success')
          this.getList()
        } else {
          this.openWarning(res.data.message, 'error')
        }
      })
    },
    handleCaseListPageChange(data) {
      console.log(data)
      this.currentPage = data
      this.caseListPage = data
      this.$axios.post(baseUrl.domain + baseInterface.getUserManagerInfo, {
        currentPage: this.currentPage
      }).then(res => {
        this.dataList = res.data.data.list
        this.total = res.data.data.total
        for (let index = 0; index < this.dataList.length; index++) {
          let ctime = parseTime(this.dataList[index].createTime, '{y}-{m}-{d} {h}:{i}:{s}')
          let utime = parseTime(this.dataList[index].updateTime, '{y}-{m}-{d} {h}:{i}:{s}')
          this.dataList[index].createTime = ctime
          this.dataList[index].updateTime = utime
          switch (this.dataList[index].roleId) {
            case 0:
              this.dataList[index].roleId = '管理员'
              break
            case 1:
              this.dataList[index].roleId = '普通用户'
              break
            case 2:
              this.dataList[index].roleId = '高级用户'
              break
            default:
              break
          }
          switch (this.dataList[index].status) {
            case 1:
              this.dataList[index].status = '启用登录'
              break
            case 0:
              this.dataList[index].status = '禁用登录'
              break
            default:
              break
          }
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
  // 创建完毕状态
  created() {
    this.getList()
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
