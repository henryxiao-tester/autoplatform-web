<template>
<div class="dashboard-container">
  <div class="app-container">
    <body>
      <header>
        <h1 style="cursor:pointer" @click="startFullScreen">AutoPlatform - Board</h1>
        <div class="btn-fullscreen" @click="startFullScreen">
          <el-tooltip effect="dark" :content="fullscreen ? `取消全屏` : `全屏`" placement="bottom"></el-tooltip>
        </div>
        <div class="showTime">{{ time }}</div>
      </header>
      <!-- 页面主体部分 -->
      <section class="mainbox">
        <div class="column">
          <div class="panel bar">
            <h2>黄金流接口用例分析</h2>
            <div class="chart"></div>
            <div class="panel-footer"></div>
          </div>
          <div id="customAnimation">
            <div class="map-1"></div>
            <div class="map-2"></div>
            <div class="map-3"></div>
            <div class="map-4"></div>
            <div id="container1"></div>
            <div id="container2"></div>
            <div id="container3"></div>
          </div>
          <div class="panel pie">
            <h2>支付接口用例分析</h2>
            <div class="chart">图表</div>
            <div class="panel-footer"></div>
          </div>
        </div>
        <div class="column">
          <!-- no模块制作 -->
          <div class="no">
            <div class="no-hd">
              <ul>
                <li>{{caseNums}}</li>
              </ul>
            </div>
            <div class="no-bd">
              <ul>
                <li>总体用例数</li>
              </ul>
            </div>
          </div>
          <!-- 地图模块 -->
          <div class="map">
            <div class="mapPanel1">
              <div class="mapOne"></div>
              <div class="map-1"></div>
              <div class="map-2"></div>
              <div class="map-3"></div>
              <div class="map-4"></div>
            </div>
            <div id="interval"></div>
            <div class="mapPanel2">
              <div id="week">按周</div>
              <div id="month">按月</div>
              <div class="mapTwo"></div>
              <div class="map-1"></div>
              <div class="map-2"></div>
              <div class="map-3"></div>
              <div class="map-4"></div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="panel bar2">
            <h2>用户接口用例分析</h2>
            <div class="chart">图表</div>
            <div class="panel-footer"></div>
          </div>
          <div id="customAnimation">
            <div class="map-1"></div>
            <div class="map-2"></div>
            <div class="map-3"></div>
            <div class="map-4"></div>
            <div id="container1"></div>
            <div id="container2"></div>
            <div id="container3"></div>
          </div>
          <div class="panel pie2">
            <h2>贷款接口用例分析</h2>
            <div class="chart">图表</div>
            <div class="panel-footer"></div>
          </div>
        </div>
      </section>
    </body>
    <el-button :plain="true" @click="openWarning" v-show="false"></el-button>
  </div>
</div>
</template>

<script>
import { getCountDays } from '../../utils/index.js'
import { MapOne, MapTwo, MapThree, MapFour, MapFive } from '../../utils/board.js'
import { baseUrl, baseInterface } from '../../mock/mockconfig.js'

export default {
  data() {
    return {
      time: '',
      dt: '',
      fullscreen: '',
      caseNums: '833'
    }
  },
  methods: {
    /**
     * 错误提示方法
     */
    openWarning(msg, typeValue) {
      this.$message({
        message: msg,
        type: typeValue
      })
    },
    /**
     * 看板时间显示
     */
    getCurrentTime() {
      setInterval(() => {
        this.dt = new Date()
        var y = this.dt.getFullYear()
        var mt = this.dt.getMonth() + 1
        var day = this.dt.getDate()
        var h = this.dt.getHours() // 获取时
        var m = this.dt.getMinutes() // 获取分
        var s = this.dt.getSeconds() // 获取秒
        this.time =
          '当前时间：' +
          y +
          '年' +
          mt +
          '月' +
          day +
          '-' +
          h +
          '时' +
          m +
          '分' +
          s +
          '秒'
      }, 1000)
    },
    /**
     * 开启全屏
     */
    startFullScreen() {
      let element = document.documentElement
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      }
      this.fullscreen = !this.fullscreen
    },
    /**
     * 看板图1-6
     */
    initMapOne() {
      var myChart = this.$echarts.init(document.querySelector('.bar .chart'))
      this.$axios.post(baseUrl.domain + baseInterface.getBoardDataForTaskOne, {
        taskId: 111111
      }).then(res => {
        if (res.data.code === 20000) {
          MapOne(myChart, res.data.data)
        } else {
          this.openWarning(res.data.message, 'error')
        }
      })

    },
    initMapTwo() {
      var myChart = this.$echarts.init(document.querySelector('.pie .chart'))
      this.$axios.post(baseUrl.domain + baseInterface.getBoardDataForTaskTwo, {
        taskId: 2222222
      }).then(res => {
        if (res.data.code === 20000) {
          MapTwo(myChart, res.data.data)
        } else {
          this.openWarning(res.data.message, 'error')
        }
      })
    },
    initMapThree() {
      var myChart = this.$echarts.init(document.querySelector('.bar2 .chart'))
      this.$axios.post(baseUrl.domain + baseInterface.getBoardDataForTaskThree, {
        taskId: 33333333
      }).then(res => {
        if (res.data.code === 20000) {
          MapThree(myChart, res.data.data)
        } else {
          this.openWarning(res.data.message, 'error')
        }
      })
    },
    initMapFour() {
      var myChart = this.$echarts.init(document.querySelector('.pie2 .chart'))
      this.$axios.post(baseUrl.domain + baseInterface.getBoardDataForTaskFour, {
        taskId: 412132323232
      }).then(res => {
        if (res.data.code === 20000) {
          MapFour(myChart, res.data.data)
        } else {
          this.openWarning(res.data.message, 'error')
        }
      })
    },
    initMapFive() {
      var myChart = this.$echarts.init(document.querySelector('.map .mapOne'))
      this.$axios.post(baseUrl.domain + baseInterface.getBoardDataForTaskFive, {
        taskId: 512132323232
      }).then(res => {
        if (res.data.code === 20000) {
          MapFive(myChart, res.data.data)
        } else {
          this.openWarning(res.data.message, 'error')
        }
      })
    },
    initMapSix() {
      var myCharts = this.$echarts.init(document.querySelector('.map .mapTwo'))
      var ViewData = [{
        data: [
          // 两个数组是因为有两条线
          [80, 82, 69, 78, 99, 75, 90],
          [10, 4, 20, 20, 1, 10, 6],
          [10, 14, 11, 2, 0, 15, 4]
        ]
      }]
      var Mon = []
      var weekData = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      var monthData = function (params) {
        let nums = getCountDays()
        if (Mon.length !== 0) {
          return Mon
        }
        for (let index = 1; index < nums + 1; index++) {
          if (index < 10) {
            index = '0' + index
          } else {
            index = '' + index
          }
          Mon.push(index)
        }
        return Mon
      }
      var clickWeek = document.querySelector('#week')
      var clickMonth = document.querySelector('#month')
      // 2.指定配置
      var option = {
        // 通过这个color修改两条线的颜色
        color: ['#00f2f1', '#ed3f35', '#4c9bfd'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          // 如果series 对象有name 值，则 legend可以不用写data
          // 修改图例组件 文字颜色
          data: ['通过率', '失败率', '跳过率'],
          textStyle: {
            color: '#fff'
          },
          // 这个10% 必须加引号
          right: '40%'
        },
        grid: {
          top: '15%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          show: true, // 显示边框
          borderColor: '#012f4a', // 边框颜色
          containLabel: true // 包含刻度文字在内
        },

        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [
            '周一',
            '周二',
            '周三',
            '周四',
            '周五',
            '周六',
            '周日'
          ],
          axisTick: {
            show: false // 去除刻度线
          },
          axisLabel: {
            color: '#fff' // 文本颜色
          },
          axisLine: {
            show: false // 去除轴线
          }
        },
        yAxis: {
          type: 'value',
          axisTick: {
            show: false // 去除刻度线
          },
          axisLabel: {
            color: '#fff' // 文本颜色
          },
          axisLine: {
            show: true, // 去除轴线
            lineStyle: {
              color: '4c9bfd'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#fff', // 分割线颜色
              type: 'dashed'
            }
          }
        },
        series: [{
          name: '通过率',
          type: 'line',
          showAllSymbol: 'true',
          // true 可以让我们的折线显示带有弧度
          smooth: true,
          data: ViewData[0].data[0]
        },
        {
          name: '失败率',
          type: 'line',
          smooth: true,
          data: ViewData[0].data[1]
        },
        {
          name: '跳过率',
          type: 'line',
          smooth: true,
          data: ViewData[0].data[2]
        }
        ]
      }
      myCharts.setOption(option)
      // 4. 让图表跟随屏幕自动的去适应
      window.addEventListener('resize', function () {
        myCharts.resize()
      })
      clickWeek.addEventListener('click', function (params) {
        option.xAxis.data = weekData
        myCharts.setOption(option)
      })
      clickMonth.addEventListener('click', function (params) {
        option.xAxis.data = monthData()
        myCharts.setOption(option)
      })
    }
  },
  // 创建完毕状态
  created() {
    this.getCurrentTime()
  },
  mounted() {
    this.initMapOne()
    this.initMapTwo()
    this.initMapThree()
    this.initMapFour()
    this.initMapFive()
    this.initMapSix()
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
