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
        <el-button
          type="primary"
          @click="addPressConfig"
          style="margin-right: 20px;float:right"
        >新增配置</el-button>
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
          <el-table-column fixed prop="scriptStatusName" label="脚本状态" width="100"></el-table-column>
          <el-table-column fixed prop="author" label="创建人" width="100"></el-table-column>
          <el-table-column fixed prop="createTime" label="创建时间" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button type="text" @click="updatePressConfig(scope.row)">修改</el-button>
              <el-button type="text" @click="deletePressConfig(scope.row)">删除</el-button>
              <el-button type="text" @click="uploadScriptFile(scope.row)">上传</el-button>
              <el-button type="text" @click="excutePressScript(scope.row)">执行</el-button>
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

      <el-dialog title="压测配置" :visible.sync="pressDialogFormVisible" width="600px">
        <el-form :model="pressConfigData">
          <el-form-item label="压测名称" :label-width="formLabelWidth">
            <el-input v-model="pressConfigData.pressName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="类型" :label-width="formLabelWidth">
            <el-select
              v-model="pressConfigData.typeName"
              clearable
              placeholder="请选择"
              @change="currentChange"
            >
              <el-option
                v-for="item in pressOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="masterIP" :label-width="formLabelWidth">
            <el-input v-model="pressConfigData.masterIp" auto-complete="off"></el-input>
          </el-form-item>
          <div class="box" style="margin-bottom:20px" v-show="slaveIsShow">
            <div class="top">
              <div class="bottom">
                <el-tooltip class="item" effect="dark" content="填写负载机IP,多个逗号添加" placement="bottom">
                  <el-form-item label="slaveIP" :label-width="formLabelWidth">
                    <el-input v-model="pressConfigData.slaveIp" auto-complete="off"></el-input>
                  </el-form-item>
                </el-tooltip>
              </div>
            </div>
          </div>
          <el-form-item label="创建人" :label-width="formLabelWidth">
            <el-input v-model="pressConfigData.author" auto-complete="off" disabled></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="pressDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addPressConfigForSure">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="录制脚本上传" :visible.sync="pressFileDialog" width="600px">
        <el-upload
          ref="clearUpload"
          class="upload-demo"
          accept=".jmx"
          action
          :http-request="uploadPressFile"
          :before-upload="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">上传录制的jmx文件</div>
        </el-upload>
      </el-dialog>

      <el-dialog title="修改压测配置" :visible.sync="dialogFormVisible" width="600px">
        <el-form :model="form">
          <el-form-item label="压测名称" :label-width="formLabelWidth">
            <el-input v-model="form.pressName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="压测类型" :label-width="formLabelWidth">
            <el-select v-model="form.typeName" placeholder="请选择" @change="currentChange1">
              <el-option
                v-for="item in pressOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="masterIp" :label-width="formLabelWidth">
            <el-input v-model="form.masterIp" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="slaveIp" :label-width="formLabelWidth" v-show="slaveIsShow">
            <el-input v-model="form.slaveIp" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="脚本状态" :label-width="formLabelWidth">
            <el-input v-model="form.scriptStatusName" auto-complete="off" disabled></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updatePressConfigForSure">确 定</el-button>
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
      currentId: '',
      slaveIsShow: true,
      slaveIsShow1: true,
      masterIsShow: true,
      pressFileDialog: false,
      input: '',
      total: 0,
      currentPage: 1,
      dialogTableVisible: false,
      dialogFormVisible: false,
      pressDialogFormVisible: false,
      caseListPage: 1,
      status: '',
      roleId: '',
      pressConfigData: {
        id: '',
        pressName: '',
        type: '',
        typeName: '',
        masterIp: '',
        slaveIp: '',
        author: '',
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
      form: {
        id: '',
        pressName: '',
        type: '',
        masterIp: '',
        slaveIp: '',
        scriptStatus: '',
        scriptStatusName: '',
        createTime: '',
        updateTime: ''
      },
      status: 0,
      formLabelWidth: '120px',
      delCallBack: false
    }
  },
  methods: {
    /**
     * 点击菜单列表初始化显示所有数据
     */
    getList() {
      this.$axios
        .post(baseUrl.domain + baseInterface.findPressConfigList, {
          currentPage: this.currentPage
        })
        .then(res => {
          if (res.data.code === 20000) {
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
            }
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
    /**
     * 根据任务名称搜索框查询，不填查询所有
     */
    selectData() {
      this.$axios
        .post(baseUrl.domain + baseInterface.findPressConfigByName, {
          pressName: this.input,
          currentPage: 1
        })
        .then(res => {
          if (res.data.code === 20000) {
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
            }
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
    /**
     * 修改配置信息
     */
    updatePressConfig(data) {
      this.dialogFormVisible = true
      this.form.pressName = data.pressName
      this.form.masterIp = data.masterIp
      this.form.slaveIp = data.slaveIp
      this.form.type = data.type
      this.form.scriptStatus = data.scriptStatus
      this.form.id = data.id
      if (data.type === 0) {
        this.slaveIsShow = false
        this.form.typeName = '单机压测'
      } else {
        this.slaveIsShow = true
        this.form.typeName = '分布式压测'
      }
      if (data.scriptStatus === 0) {
        this.form.scriptStatusName = '未上传'
      } else {
        this.form.scriptStatusName = '已上传'
      }
    },
    updatePressConfigForSure() {
      this.$axios
        .post(baseUrl.domain + baseInterface.updatePressConfigById, {
          pressName: this.form.pressName,
          masterIp: this.form.masterIp,
          slaveIp: this.form.slaveIp,
          type: this.form.type,
          id: this.form.id
        })
        .then(res => {
          if (res.data.code === 20000) {
            this.openWarning(res.data.message, 'success')
            this.dialogFormVisible = false
            this.input = ''
            this.getList()
          } else {
            this.openWarning(res.data.message, 'error')
          }
        })
    },
    uploadScriptFile(data) {
      this.pressFileDialog = true
      this.currentId = data.id
      this.$nextTick(function (params) {
        if (data.scriptStatus === 0) {
          this.$refs.clearUpload.clearFiles()
        }
      })
    },
    deletePressConfig(data) {
      this.$confirm('此操作将删除此配置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(action => {
          /**
           * 若拿到提交回调则进行删除操作
           */
          if (action === 'confirm') {
            this.$axios
              .post(baseUrl.domain + baseInterface.deletePressConfigById, {
                id: data.id
              })
              .then(res => {
                if (res.data.code === 20000) {
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  })
                  this.getList()
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
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    handleCaseListPageChange(data) {
      console.log(data)
      this.currentPage = data
      this.caseListPage = data
      this.$axios
        .post(baseUrl.domain + baseInterface.findPressConfigList, {
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
                this.dataList[index].typeName = '单机压测'
                break
              case 1:
                this.dataList[index].typeName = '分布式压测'
                break
              default:
                break
            }
            switch (this.dataList[index].scriptStatus) {
              case 1:
                this.dataList[index].scriptStatusName = '已上传'
                break
              case 0:
                this.dataList[index].scriptStatusName = '未上传'
                break
              default:
                break
            }
          }
        })
    },
    addPressConfig(data) {
      this.pressDialogFormVisible = true
      this.pressConfigData.author = localStorage.getItem('userNick')
      this.pressConfigData.pressName = ''
      this.pressConfigData.typeName = ''
      this.pressConfigData.masterIp = ''
      this.pressConfigData.slaveIp = ''
    },
    pressDialogCancel() {
      this.pressDialogFormVisible = false
    },
    addPressConfigForSure() {
      let content = this.pressConfigData.pressName
      if (inputDataCheck(content)) {
        this.openWarning('压测名称不能为空', 'error')
        return
      }
      if (inputDataCheck(this.pressConfigData.masterIp)) {
        this.openWarning('masterIp不能为空', 'error')
        return
      }
      console.log(this.pressConfigData.typeName)
      if (inputDataCheck(this.pressConfigData.typeName + '')) {
        this.openWarning('压测类型不能为空', 'error')
        return
      }
      this.$axios
        .post(baseUrl.domain + baseInterface.addPressConfig, {
          pressName: this.pressConfigData.pressName,
          type: this.pressConfigData.type,
          masterIp: this.pressConfigData.masterIp,
          slaveIp: this.pressConfigData.slaveIp,
          author: localStorage.getItem('userNick')
        })
        .then(res => {
          if (res.data.code === 20000) {
            this.pressDialogFormVisible = false
            this.openWarning(res.data.message, 'success')
            this.getList()
          } else {
            this.openWarning(res.data.message, 'error')
          }
        })
    },
    currentChange(data) {
      if (data === 0) {
        this.slaveIsShow = false
        this.pressConfigData.type = data
      } else {
        this.slaveIsShow = true
        this.pressConfigData.type = data
      }
    },
    currentChange1(data) {
      if (data === 0) {
        this.slaveIsShow = false
      } else {
        this.slaveIsShow = true
      }
      this.form.type = data
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file, data) {
      console.log(data)
      let fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
      if (fileType !== 'jmx') {
        this.$message.warning(`上传文件必须为jmx格式`)
        return false
      }
    },
    uploadPressFile(data) {

      let formData = new FormData()
      formData.set('file', data.file)
      formData.set('id', this.currentId)
      this.$axios
        .post(
          baseUrl.domain + baseInterface.addPressScript,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        .then(res => {
          if (res.data.code === 20000) {
            this.openWarning(res.data.message, 'success')
            this.getList()
          } else {
            this.openWarning(res.data.message, 'error')
            this.$refs.clearUpload.clearFiles()
          }
        })
        .catch(err => {
          debugger
        })
    },
    handleExceed(files, fileList) {
      this.$message.warning(`最多只能上传一个文件`)
    },
    beforeRemove(file, fileList) {
      // return this.$confirm(`确定移除 ${file.name}？`)
      this.$refs.clearUpload.clearFiles()
    },
    excutePressScript(data) {
      if (data.scriptStatus === 0) {
        this.$message.warning('压测脚本文件未上传')
        return
      }

      this.$axios
        .post(baseUrl.domain + baseInterface.excutePressScript, {
          id: data.id,
          pressName: data.pressName,
          masterIp: data.masterIp,
          slaveIp: data.slaveIp,
          type: data.type,
          scriptName: data.scriptName,
          executor: localStorage.getItem('userNick')
        })
        .then(res => {
          if (res.data.code === 20000) {
            this.openWarning(res.data.message, 'success')
          } else {
            this.openWarning(res.data.message, 'error')
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
