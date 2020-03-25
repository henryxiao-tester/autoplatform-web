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
        <el-table :data="showReportList" border style="width: 100%">
          <!--el-table-column : 构造表格中的每一列
              prop： 数组中每个元素对象的属性名
          -->
          <el-table-column fixed type="index" label="序号" width="50">
            <template slot-scope="scope">
              <span>{{(caseListPage - 1) * 20 + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed prop="userName" label="用户名"></el-table-column>
          <el-table-column fixed prop="userNick" label="用户姓名"></el-table-column>
          <el-table-column fixed prop="role" label="用户角色"></el-table-column>
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
          :total="this.dataList.length"
          :page-size="20"
          style="float:right;margin:20px"
          @current-change="handleCaseListPageChange"
        ></el-pagination>
      </el-card>
      <el-dialog title="修改用户权限" :visible.sync="dialogFormVisible" width="600px">
        <el-form :model="form">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.userName" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户姓名" :label-width="formLabelWidth">
            <el-input v-model="form.userNick" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户角色" :label-width="formLabelWidth">
            <el-select v-model="form.role" placeholder="请选择">
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

export default {

  data() {
    return {
      dataList: [],
      input: '',
      dialogTableVisible: false,
      dialogFormVisible: false,
      caseListPage: 1,
      form: {
        userName: '',
        userNick: '',
        role: '',
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
        value: '2',
        label: '管理员'
      }],
      options1: [{
        value1: '1',
        label: '启用'
      }, {
        value1: '0',
        label: '禁用'
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
      this.$axios.post(baseUrl.domain + baseInterface.getUserCenterInfo, {
        pageSize: 1
      }).then(res => {
        console.log(res.data)
        this.dataList = res.data.data
      })
    },
    /**
     * 根据任务名称搜索框查询，不填查询所有
     */
    selectData() {
      if (inputDataCheck(this.input)) {
        this.$axios.post(baseUrl.domain + baseInterface.getUserCenterInfo, {
          pageSize: 1
        }).then(res => {
          this.dataList = res.data.data
        })
      } else {
        this.$axios.post(baseUrl.domain + baseInterface.getUserCenterInfoByName, {
          pageSize: 1,
          taskName: this.input
        }).then(res => {
          this.dataList = res.data.data
        })
      }
    },
    /**
     * 查看用例详情
     */
    detailPermission(data) {
      this.dialogFormVisible = true
      this.form.userName = data.userName
      this.form.userNick = data.userNick
      this.form.role = data.role
      this.form.status = data.status
      this.form.createTime = data.createTime
      this.form.updateTime = data.updateTime

    },
    sureModify() {
      this.dialogFormVisible = false
      this.$axios.post(baseUrl.domain + baseInterface.updateUserPermission, {
        userName: this.form.userName,
        role: this.form.role,
        status: this.form.status
      }).then(res => {
        if (res.data.code === 200) {
          this.dialogFormVisible = false
          this.openWarning(res.data.message, 'success')
        } else {
          this.openWarning(res.data.message, 'error')
        }
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
    showReportList() {
      return this.dataList.slice(
        (this.caseListPage - 1) * 20, this.caseListPage * 20
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
