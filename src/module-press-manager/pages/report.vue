<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never">
        <el-input
          placeholder="请输压测名称"
          v-model="input"
          clearable
          style="width:200px;margin-bottom:20px"
        ></el-input>
        <el-button type="primary" @click="selectData">查询</el-button>
        <el-table :data="dataList" border style="width: 100%">
          <el-table-column fixed type="index" label="序号" width="50">
            <template slot-scope="scope">
              <span>{{ (caseListPage - 1) * 20 + scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed prop="pressName" label="压测名称" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column fixed prop="masterIp" label="masterIP" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column fixed prop="slaveIp" label="slaveIP" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column fixed prop="typeName" label="类型" :show-overflow-tooltip="true"></el-table-column>
          <!-- <el-table-column fixed prop="scriptStatusName" label="脚本状态" width="100"></el-table-column> -->
          <el-table-column fixed prop="statusName" label="压测状态" width="100"></el-table-column>
          <el-table-column fixed prop="executor" label="执行人" width="100"></el-table-column>
          <el-table-column fixed prop="createTime" label="创建时间" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="findPressReportById(scope.row)">查看报告</el-button>
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
      currentId: '',
      input: '',
      total: 0,
      currentPage: 1,
      caseListPage: 1,
      status: '',
      roleId: '',
      pressConfigData: {
        id: '',
        pressName: '',
        type: '',
        typeName: '',
        scriptStatusName: '',
        masterIp: '',
        slaveIp: '',
        status: '',
        executor: '',
        scriptStatus: ''
      },
      pressOptions: [
        {
          value: 0,
          label: '单机压测'
        },
        {
          value: 1,
          label: '分布式压测'
        }
      ],
      formLabelWidth: '120px'
    }
  },
  methods: {
    /**
     * 点击菜单列表初始化显示所有数据
     */
    getList() {
      this.$axios
        .post(baseUrl.domain + baseInterface.findPressRecordList, {
          currentPage: this.currentPage
        })
        .then(res => {
          this.dataList = res.data.data.list
          this.total = res.data.data.total
          for (let index = 0; index < this.dataList.length; index++) {
            let ctime = parseTime(
              this.dataList[index].createTime,
              '{y}-{m}-{d} {h}:{i}:{s}'
            )
            let utime = parseTime(
              this.dataList[index].updateTime,
              '{y}-{m}-{d} {h}:{i}:{s}'
            )
            this.dataList[index].createTime = ctime
            this.dataList[index].updateTime = utime
            switch (this.dataList[index].type) {
              case 0:
                this.dataList[index]['typeName'] = '单机压测'
                break
              case 1:
                this.dataList[index]['typeName'] = '分布式压测'
                break
              default:
                break
            }
            switch (this.dataList[index].scriptStatus) {
              case 0:
                this.dataList[index]['scriptStatusName'] = '未上传'
                break
              case 1:
                this.dataList[index]['scriptStatusName'] = '已上传'
                break
              default:
                break
            }
            switch (this.dataList[index].status) {
              case 0:
                this.dataList[index]['statusName'] = '未完成'
                break
              case 1:
                this.dataList[index]['statusName'] = '已完成'
                break
              default:
                break
            }
          }
        })
    },
    selectData(data) {
      this.$axios
        .post(baseUrl.domain + baseInterface.findPressRecordList, {
          pressName: this.input,
          currentPage: 1
        })
        .then(res => {
          if (res.data.code === 20000) {
            this.dataList = res.data.data.list
            console.log(this.dataList)
            this.total = res.data.data.total
            for (let index = 0; index < this.dataList.length; index++) {
              let ctime = parseTime(
                this.dataList[index].createTime,
                '{y}-{m}-{d} {h}:{i}:{s}'
              )
              let utime = parseTime(
                this.dataList[index].updateTime,
                '{y}-{m}-{d} {h}:{i}:{s}'
              )
              this.dataList[index].createTime = ctime
              this.dataList[index].updateTime = utime
              switch (this.dataList[index].type) {
                case 0:
                  this.dataList[index]['typeName'] = '单机压测'
                  break
                case 1:
                  this.dataList[index]['typeName'] = '分布式压测'
                  break
                default:
                  break
              }
              switch (this.dataList[index].scriptStatus) {
                case 0:
                  this.dataList[index]['scriptStatusName'] = '未上传'
                  break
                case 1:
                  this.dataList[index]['scriptStatusName'] = '已上传'
                  break
                default:
                  break
              }
              switch (this.dataList[index].status) {
                case 0:
                  this.dataList[index]['statusName'] = '未完成'
                  break
                case 1:
                  this.dataList[index]['statusName'] = '已完成'
                  break
                default:
                  break
              }
            }
          }
        })
    },
    findPressReportById(data) {
      console.log(data)
      if (data.statusName === '未完成') {
        this.$message.error('当前压测未完成，正在跑的路上')
        return
      }
      let report = data.scriptName
      report = report.substring(0, report.lastIndexOf('.'))
      location.assign('http://www.baidu.com' + report)
    },
    handleCaseListPageChange(data) {
      console.log(data)
      this.currentPage = data
      this.caseListPage = data
      this.$axios
        .post(baseUrl.domain + baseInterface.findPressRecordList, {
          currentPage: this.currentPage
        })
        .then(res => {
          this.dataList = res.data.data.list
          this.total = res.data.data.total
          for (let index = 0; index < this.dataList.length; index++) {
            let ctime = parseTime(
              this.dataList[index].createTime,
              '{y}-{m}-{d} {h}:{i}:{s}'
            )
            let utime = parseTime(
              this.dataList[index].updateTime,
              '{y}-{m}-{d} {h}:{i}:{s}'
            )
            this.dataList[index].createTime = ctime
            this.dataList[index].updateTime = utime
            switch (this.dataList[index].type) {
              case 0:
                this.dataList[index]['typeName'] = '单机压测'
                break
              case 1:
                this.dataList[index]['typeName'] = '分布式压测'
                break
              default:
                break
            }
            switch (this.dataList[index].scriptStatus) {
              case 0:
                this.dataList[index]['scriptStatusName'] = '未上传'
                break
              case 1:
                this.dataList[index]['scriptStatusName'] = '已上传'
                break
              default:
                break
            }
            switch (this.dataList[index].status) {
              case 0:
                this.dataList[index]['statusName'] = '未完成'
                break
              case 1:
                this.dataList[index]['statusName'] = '已完成'
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
