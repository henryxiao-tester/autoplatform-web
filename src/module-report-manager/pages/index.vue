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
          <el-table-column fixed prop="caseName" label="用例名称"></el-table-column>
          <el-table-column fixed prop="interfaceName" label="接口名"></el-table-column>
          <el-table-column fixed prop="requestBody" label="请求参数body" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column
            fixed
            prop="requestHeader"
            label="请求header"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column fixed prop="expectRes" label="预期结果" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column fixed prop="realRes" label="实际结果" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column fixed prop="finallyRes" label="最终结果"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click=" detailData(scope.row)">详情</el-button>
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
      <el-dialog title="当前用例详情" :visible.sync="dialogFormVisible" width="600px">
        <el-form :model="form">
          <el-form-item label="用例名称" :label-width="formLabelWidth">
            <el-input v-model="form.caseName" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="接口名" :label-width="formLabelWidth">
            <el-input v-model="form.interfaceName" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="请求参数body" :label-width="formLabelWidth">
            <el-input v-model="form.requestBody" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="请求头header" :label-width="formLabelWidth">
            <el-input v-model="form.requestHeader" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="预期结果" :label-width="formLabelWidth">
            <el-input v-model="form.expectRes" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="实际结果" :label-width="formLabelWidth">
            <el-input v-model="form.realRes" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="最终结果" :label-width="formLabelWidth">
            <el-input v-model="form.finallyRes" auto-complete="off" disabled></el-input>
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
        caseName: '',
        interfaceName: '',
        requestBody: '',
        requestHeader: '',
        expectRes: '',
        realRes: '',
        finallyRes: ''
      },
      formLabelWidth: '120px',
      delCallBack: false
    }
  },
  methods: {
    /**
     * 点击菜单列表初始化显示所有数据
     */
    getList() {
      this.$axios.post(baseUrl.domain + baseInterface.getReportInfo, {
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
        this.$axios.post(baseUrl.domain + baseInterface.getReportInfo, {
          pageSize: 1
        }).then(res => {
          this.dataList = res.data.data
        })
      } else {
        this.$axios.post(baseUrl.domain + baseInterface.getReportInfoByName, {
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
    detailData(data) {
      this.dialogFormVisible = true
      this.form.caseName = data.caseName
      this.form.interfaceName = data.interfaceName
      this.form.requestBody = data.requestBody
      this.form.requestHeader = data.requestHeader
      this.form.expectRes = data.expectRes
      this.form.realRes = data.realRes
      this.form.finallyRes = data.finallyRes
    },
    sureModify() {
      this.dialogFormVisible = false
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
