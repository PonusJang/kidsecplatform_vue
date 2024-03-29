<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  import resize from './mixins/resize'

  export default {
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '350px'
      },
      autoResize: {
        type: Boolean,
        default: true
      },
      chartData: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        chart: null
      }
    },
    watch: {
      chartData: {
        deep: true,
        handler(val) {
          this.setOptions(val)
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initChart()
      })
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')
        this.setOptions(this.chartData)
      },
      setOptions({ expectedData, actualData } = {}) {
        this.chart.setOption({
          xAxis: {
            data: ['20/11/25', '20/11/26', '20/11/27', '20/11/28', '20/11/29', '20/11/30', '20/12/01'],
            boundaryGap: false,
            axisTick: {
              show: false
            }
          },
          grid: {
            left: 10,
            right: 10,
            bottom: 20,
            top: 30,
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            padding: [5, 10]
          },
          yAxis: {
            axisTick: {
              show: false
            }
          },
          legend: {
            data: ['站点数','高危','中危', '低危']
          },
          series: [{
            name: '站点数', itemStyle: {
              normal: {
                color: '#9a7134',
                lineStyle: {
                  color: '#9a7134',
                  width: 2
                }
              }
            },
            smooth: true,
            type: 'line',
            data:[11, 11, 15, 13, 12, 13, 10],
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          },{
            name: '高危', itemStyle: {
              normal: {
                color: '#258b55',
                lineStyle: {
                  color: '#258b55',
                  width: 2
                }
              }
            },
            smooth: true,
            type: 'line',
            data:[121, 121, 135, 143, 125, 136, 102],
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          },{
            name: '中危', itemStyle: {
              normal: {
                color: '#FF005A',
                lineStyle: {
                  color: '#FF005A',
                  width: 2
                }
              }
            },
            smooth: true,
            type: 'line',
            data:[111, 121, 125, 313, 512, 136, 210],
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          },
            {
              name: '低危',
              smooth: true,
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#3888fa',
                  lineStyle: {
                    color: '#3888fa',
                    width: 2
                  },
                  areaStyle: {
                    color: '#f3f8ff'
                  }
                }
              },
              data:[131, 211, 515, 163, 172, 813, 190],
              animationDuration: 2800,
              animationEasing: 'quadraticOut'
            }]
        })
      }
    }
  }
</script>
