<template>
  <div class="app-container">

    <div class="dashboard-container">
      <componentsPanel @handleSetLineChartData="handleSetLineChartData"/>

      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:2px;">
        <componentsLine :chart-data="lineChartData"/>
      </el-row>

    </div>
  </div>
</template>

<script>

  const lineChartData = {
    intranet_IP: {
      expectedData: [100, 120, 161, 134, 105, 160, 165],
      actualData: [120, 82, 91, 154, 162, 140, 145]
    },
    intranet_port: {
      expectedData: [200, 192, 120, 144, 160, 130, 140],
      actualData: [180, 160, 151, 106, 145, 150, 130]
    },
    internet_site: {
      expectedData: [80, 100, 121, 104, 105, 90, 100],
      actualData: [120, 90, 100, 138, 142, 130, 130]
    },
    internet_IP: {
      expectedData: [130, 140, 141, 142, 145, 150, 160],
      actualData: [120, 82, 91, 154, 162, 140, 130]
    }
  }
  import componentsPanel from './components/panel'
  import componentsLine from './components/line'
  import {mapGetters} from 'vuex'

  import echarts from 'echarts'
  import VCharts from 'v-charts-v2'

  import {getStatics} from '@/api/acunetix'
  import {parseTime} from '@/utils'
  import waves from '@/directive/waves' // waves directive


  export default {
    name: 'Index',
    components: {
      echarts,
      VCharts,
      componentsPanel, componentsLine
    },
    directives: {waves},
    filters: {
      parseTime: parseTime
    },
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    data() {
      return {
        staticsData: undefined,
      }
    },
    created() {
      this.getStatics()

    },
    methods: {
      handleSetLineChartData(type) {
        this.lineChartData = lineChartData[type]
      },
      getStatics() {
        getStatics().then(res => {
          this.staticsData = res.data
          console.log(this.staticsData)
        })
      }
    }
  }
</script>


<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>
