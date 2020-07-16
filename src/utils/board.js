// 看板图1
export function MapOne(myCharts, datas) {
  // 1实例化对象
  var myChart = myCharts
  // 2. 指定配置项和数据
  var option = {
    color: ['#c487ee', '#deb140', '#49dff0'],
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },

    legend: {
      bottom: '0%',
      // 修改小图标的大小
      itemWidth: 10,
      itemHeight: 10,
      // 修改图例组件的文字为 12px
      textStyle: {
        color: 'rgba(255,255,255,.5)',
        fontSize: '12'
      }
    },
    series: [{
      name: '登录测试结果分布',
      type: 'pie',
      // 这个radius可以修改饼形图的大小
      // radius 第一个值是内圆的半径 第二个值是外圆的半径
      radius: ['45%', '70%'],
      center: ['50%', '60%'],
      avoidLabelOverlap: true,
      // 图形上的文字
      label: {
        show: false,
        position: 'center'
      },
      // 链接文字和图形的线是否显示
      labelLine: {
        show: false
      },
      itemStyle: {
        normal: {
          label: {
            formatter: function (params) {
              if (params.name !== '') {
                return params.name + '：' + params.value + '\n(' + params.percent + '%' + ')'
              } else {
                return ''
              }
            }
          },
          labelLine: {
            length: 20,
            length2: 5
          }
        }

      },
      data: [{
          value: datas.failNums,
          name: '失败'
        },
        {
          value: datas.passNums,
          name: '通过'
        },
        {
          value: datas.blockNums,
          name: '跳过'
        }
      ]
    }]
  }
  // 3. 把配置项给实例对象
  myChart.setOption(option)
  // 4. 让图表跟随屏幕自动的去适应
  window.addEventListener('resize', function () {
    myChart.resize()
  })
}

export function MapTwo(myCharts, datas) {
  var scaleData = [{
      'name': '通过',
      'value': datas.passNums
    },
    {
      'name': '失败',
      'value': datas.failNums
    },
    {
      'name': '跳过',
      'value': datas.blockNums
    }
  ]
  var rich = {
    white: {
      color: '#ddd',
      align: 'center',
      padding: [3, 0]
    }
  }
  var placeHolderStyle = {
    normal: {
      label: {
        show: false
      },
      labelLine: {
        show: false
      },
      color: 'rgba(0, 0, 0, 0)',
      borderColor: 'rgba(0, 0, 0, 0)',
      borderWidth: 0
    }
  }
  var data = []
  var color = ['#ffe000', '#00cfff', '#006ced']
  for (var i = 0; i < scaleData.length; i++) {
    data.push({
      value: scaleData[i].value,
      name: scaleData[i].name,
      itemStyle: {
        normal: {
          borderWidth: 8,
          shadowBlur: 20,
          borderColor: color[i],
          shadowColor: color[i]
        }
      }
    }, {
      value: 2,
      name: '',
      itemStyle: placeHolderStyle
    })
  }
  var seriesObj = [{
    name: '支付接口分析',
    type: 'pie',
    clockWise: false,
    avoidLabelOverlap: true,
    radius: [50, 50],
    hoverAnimation: false,
    itemStyle: {
      normal: {
        label: {
          show: true,
          position: 'outside',
          color: '#ddd',
          formatter: function (params) {
            var percent = 0
            var total = 0
            for (var i = 0; i < scaleData.length; i++) {
              total += scaleData[i].value
            }
            percent = ((params.value / total) * 100).toFixed(0)
            if (params.name !== '') {
              return params.name + '：' + params.value + ' (' + '{white|' + percent + '%}' + ')'
            } else {
              return ''
            }
          },
          rich: rich
        },
        labelLine: {
          length: 20,
          length2: 10,
          show: true,
          color: '#00ffff'
        }
      }
    },
    data: data
  }]
  var option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      show: false
    },
    toolbox: {
      show: false
    },
    series: seriesObj
  }
  myCharts.setOption(option)
  // 监听浏览器缩放，图表对象调用缩放resize函数
  window.addEventListener('resize', function () {
    myCharts.resize()
  })
}

export function MapThree(myCharts, datas) {
  var option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    color: ['#00ccff', '#f35833', '#8fc31f'],
    legend: {
      orient: 'horizontal',
      x: 'right',
      data: ['通过', '失败', '跳过'],
      textStyle: {
        color: '#fff'
      }
    },
    series: [{
      name: '用户接口分析',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      avoidLabelOverlap: true,
      data: [{
          value: datas.passNums,
          name: '通过'
        },
        {
          value: datas.failNums,
          name: '失败'
        },
        {
          value: datas.blockNums,
          name: '跳过'
        }
      ],
      itemStyle: {
        normal: {
          label: {
            show: true,
            formatter: '{b} : {c} ({d}%)'
          }
        },
        labelLine: {
          show: true
        },
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  }
  // 3. 把配置项给实例对象
  myCharts.setOption(option)
  // 4. 让图表跟随屏幕自动的去适应
  window.addEventListener('resize', function () {
    myCharts.resize()
  })
}

export function MapFour(myCharts, datas) {
  var scaleData = [{
      'name': '通过',
      'value': datas.passNums
    },
    {
      'name': '失败',
      'value': datas.failNums
    },
    {
      'name': '跳过',
      'value': datas.blockNums
    }
  ]
  var rich = {
    white: {
      color: '#ddd',
      align: 'center',
      padding: [10, 0]
    }
  }
  var placeHolderStyle = {
    normal: {
      label: {
        show: true
      },
      labelLine: {
        show: true
      },
      color: 'rgba(0, 0, 0, 0)',
      borderColor: 'rgba(0, 0, 0, 0)',
      borderWidth: 0
    }
  }
  var data = []
  var color = ['#00ffff', '#00cfff', '#006ced']
  for (var i = 0; i < scaleData.length; i++) {
    data.push({
      value: scaleData[i].value,
      name: scaleData[i].name,
      itemStyle: {
        normal: {
          borderWidth: 4,
          shadowBlur: 200,
          borderColor: color[i]
        }
      }
    }, {
      value: 2,
      name: '',
      itemStyle: placeHolderStyle
    })
  }
  var seriesObj = [{
    name: '贷款接口分析',
    type: 'pie',
    clockWise: false,
    radius: [30, 60],
    hoverAnimation: false,
    itemStyle: {
      normal: {
        label: {
          show: true,
          position: 'outside',
          color: '#ddd',
          formatter: function (params) {
            var percent = 0
            var total = 0
            for (var i = 0; i < scaleData.length; i++) {
              total += scaleData[i].value
            }
            percent = ((params.value / total) * 100).toFixed(0)
            if (params.name !== '') {
              return params.name + '：' + params.value + ' (' + '{white|' + percent + '%}' + ')'
            } else {
              return ''
            }
          },
          rich: rich
        },
        labelLine: {
          length: 20,
          length2: 10,
          show: true,
          color: '#00ffff'
        }
      }
    },
    data: data
  }]
  var option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      show: false
    },
    toolbox: {
      show: false
    },
    series: seriesObj
  }
  myCharts.setOption(option)
  // 监听浏览器缩放，图表对象调用缩放resize函数
  window.addEventListener('resize', function () {
    myCharts.resize()
  })
}

export function MapFive(myCharts, datas) {
  var img = 'data:image/png;base64,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'

  var trafficWay = [{
    name: '通过',
    value: datas.passNums
  }, {
    name: '失败',
    value: datas.failNums
  }, {
    name: '跳过',
    value: datas.blockNums
  }]

  var data = []
  var color = ['#00ffff', '#00cfff', '#006ced', '#ffe000', '#ffa800', '#ff5b00', '#ff3000']
  for (var i = 0; i < trafficWay.length; i++) {
    data.push({
      value: trafficWay[i].value,
      name: trafficWay[i].name,
      itemStyle: {
        normal: {
          borderWidth: 5,
          shadowBlur: 20,
          borderColor: color[i],
          shadowColor: color[i]
        }
      }
    }, {
      value: 2,
      name: '',
      itemStyle: {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          color: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgba(0, 0, 0, 0)',
          borderWidth: 0
        }
      }
    })
  }
  var seriesOption = [{
    name: '用例总览',
    type: 'pie',
    clockWise: false,
    radius: [105, 109],
    hoverAnimation: false,
    itemStyle: {
      normal: {
        label: {
          show: true,
          position: 'outside',
          color: '#ddd',
          formatter: function (params) {
            var percent = 0
            var total = 0
            for (var i = 0; i < trafficWay.length; i++) {
              total += trafficWay[i].value
            }
            percent = ((params.value / total) * 100).toFixed(0)
            if (params.name !== '') {
              return params.name + '：' + params.value + ' (' + percent + '%' + ')'
            } else {
              return ''
            }
          }
        },
        labelLine: {
          length: 30,
          length2: 20,
          show: true,
          color: '#00ffff'
        }
      }
    },
    data: data
  }]
  var option = {
    color: color,
    title: {
      text: '用例总览',
      top: '50%',
      textAlign: 'center',
      left: '50%',
      textStyle: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '400'
      }
    },
    graphic: {
      elements: [{
        type: 'image',
        z: 3,
        style: {
          image: img,
          width: 200,
          height: 200
        },
        left: 'center',
        top: 'center',
        position: [100, 100]
      }]
    },
    tooltip: {
      show: false
    },
    legend: {
      icon: 'circle',
      orient: 'horizontal',
      // x: 'left',
      data: ['通过', '失败', '跳过'],
      left: 10,
      top: 20,
      align: 'right',
      textStyle: {
        color: '#fff'
      },
      itemGap: 20
    },
    toolbox: {
      show: false
    },
    series: seriesOption
  }
  myCharts.setOption(option)
  // 监听浏览器缩放，图表对象调用缩放resize函数
  window.addEventListener('resize', function () {
    myCharts.resize()
  })
}

// export function MapSix(myCharts, datas) {
//   var ViewData = [{
//     data: [
//       // 两个数组是因为有两条线
//       [80, 82, 69, 78, 99, 75, 90],
//       [10, 4, 20, 20, 1, 10, 6],
//       [10, 14, 11, 2, 0, 15, 4]
//     ]
//   }]
//   var Mon = []
//   var weekData = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
//   var monthData = function (params) {
//     let nums = getCountDays()
//     if (Mon.length !== 0) {
//       return Mon
//     }
//     for (let index = 1; index < nums + 1; index++) {
//       if (index < 10) {
//         index = '0' + index
//       } else {
//         index = '' + index
//       }
//       Mon.push(index)
//     }
//     return Mon
//   }
//   var clickWeek = document.querySelector('#week')
//   var clickMonth = document.querySelector('#month')
//   // 2.指定配置
//   var option = {
//     // 通过这个color修改两条线的颜色
//     color: ['#00f2f1', '#ed3f35', '#4c9bfd'],
//     tooltip: {
//       trigger: 'axis'
//     },
//     legend: {
//       // 如果series 对象有name 值，则 legend可以不用写data
//       // 修改图例组件 文字颜色
//       data: ['通过率', '失败率', '跳过率'],
//       textStyle: {
//         color: '#fff'
//       },
//       // 这个10% 必须加引号
//       right: '40%'
//     },
//     grid: {
//       top: '15%',
//       left: '3%',
//       right: '4%',
//       bottom: '3%',
//       show: true, // 显示边框
//       borderColor: '#012f4a', // 边框颜色
//       containLabel: true // 包含刻度文字在内
//     },

//     xAxis: {
//       type: 'category',
//       boundaryGap: false,
//       data: [
//         '周一',
//         '周二',
//         '周三',
//         '周四',
//         '周五',
//         '周六',
//         '周日'
//       ],
//       axisTick: {
//         show: false // 去除刻度线
//       },
//       axisLabel: {
//         color: '#fff' // 文本颜色
//       },
//       axisLine: {
//         show: false // 去除轴线
//       }
//     },
//     yAxis: {
//       type: 'value',
//       axisTick: {
//         show: false // 去除刻度线
//       },
//       axisLabel: {
//         color: '#fff' // 文本颜色
//       },
//       axisLine: {
//         show: true, // 去除轴线
//         lineStyle: {
//           color: '4c9bfd'
//         }
//       },
//       splitLine: {
//         lineStyle: {
//           color: '#fff', // 分割线颜色
//           type: 'dashed'
//         }
//       }
//     },
//     series: [{
//         name: '通过率',
//         type: 'line',
//         showAllSymbol: 'true',
//         // true 可以让我们的折线显示带有弧度
//         smooth: true,
//         data: ViewData[0].data[0]
//       },
//       {
//         name: '失败率',
//         type: 'line',
//         smooth: true,
//         data: ViewData[0].data[1]
//       },
//       {
//         name: '跳过率',
//         type: 'line',
//         smooth: true,
//         data: ViewData[0].data[2]
//       }
//     ]
//   }
//   myCharts.setOption(option)
//   // 4. 让图表跟随屏幕自动的去适应
//   window.addEventListener('resize', function () {
//     myCharts.resize()
//   })
//   clickWeek.addEventListener('click', function (params) {
//     option.xAxis.data = weekData
//     myCharts.setOption(option)
//   })
//   clickMonth.addEventListener('click', function (params) {
//     option.xAxis.data = monthData()
//     myCharts.setOption(option)
//   })
// }
