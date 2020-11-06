<template>

  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="success"
        icon="el-icon-sort"
        @click="handleStartAll"
      >
        启动全部
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="danger"
        icon="el-icon-close"
        @click="handleStopAll"
      >
        停止全部
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="warning"
        icon="el-icon-refresh"
        @click="handleRestartAll"
      >
        重启全部
      </el-button>
    </div>
    <br>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >

      <el-table-column type="expand">
        <template slot-scope="scope">
          <div id="app">
            <ve-line :data="scope.row.history" :settings="chartSettings" />
          </div>
        </template>
      </el-table-column>

      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="App" align="center">
        <template slot-scope="scope">
          <span class="link-type"> {{ scope.row.app }}</span>
        </template>
      </el-table-column>
      <el-table-column label="PID" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.pid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="CPU" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.cpu }}%</span>
        </template>
      </el-table-column>
      <el-table-column label="Memory" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.memory }}M</span>
        </template>
      </el-table-column>
      <el-table-column label="StartTime" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.StartTime |parseTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Uptime" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.UptTime| parseTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="RestartTimes" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.RestartTimes }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="250" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-show="scope.row.status !== 'online'" type="primary" size="mini" @click="handleStart(scope.row)">
            启动
          </el-button>
          <el-button v-show="scope.row.status === 'online'" size="mini" type="danger" @click="handleStop(scope.row)">
            停止
          </el-button>
          <el-button
            v-show="scope.row.status === 'online'"
            size="mini"
            type="warning"
            @click="handleRestart(scope.row)"
          >
            重启
          </el-button>
        </template>
      </el-table-column>

    </el-table>

  </div>
</template>

<script>

import { info, start, stop, restart } from '@/api/service'
import { parseTime } from '@/utils'
import waves from '@/directive/waves' // waves directive

export default {

  name: 'ServiceIndex',
  components: { },
  directives: { waves },
  filters: {
    parseTime: parseTime
  },

  data() {
    return {
      total: 0,
      chartSettings: {
        metrics: ['CPU', 'MEM'],
        dimension: ['Time']
      },
      list: [],
      app: null,
      listLoading: true,
      intervalid: undefined
    }
  },
  created() {
    this.getInfo()
    this.intervalid = setInterval(() => {
      setTimeout(this.getInfo(), 0)
    }, 10000)
  },
  methods: {
    getInfo() {
      var list = [
        {
          app: 'Backend',
          status: null,
          pid: null,
          cpu: 0,
          memory: 0,
          UptTime: null,
          StartTime: null,
          RestartTimes: null,
          history: []
        },
        {
          app: 'CronGetSubdomain',
          status: null,
          pid: null,
          cpu: 0,
          memory: 0,
          UptTime: null,
          StartTime: null,
          RestartTimes: null,
          history: []
        },
        {
          app: 'CronGetIntranetPorts',
          status: null,
          pid: null,
          cpu: 0,
          memory: 0,
          UptTime: null,
          StartTime: null,
          RestartTimes: null,
          history: []
        },
        {
          app: 'CronGetInternetPorts',
          status: null,
          pid: null,
          cpu: 0,
          memory: 0,
          UptTime: null,
          StartTime: null,
          RestartTimes: null,
          history: []
        },
        {
          app: 'CronGetWebInfo',
          status: null,
          pid: null,
          cpu: 0,
          memory: 0,
          UptTime: null,
          StartTime: null,
          RestartTimes: null,
          history: []
        },
        {
          app: 'CronCheck',
          status: null,
          pid: null,
          cpu: 0,
          memory: 0,
          UptTime: null,
          StartTime: null,
          RestartTimes: null,
          history: []
        },
        {
          app: 'CronCheck2',
          status: null,
          pid: null,
          cpu: 0,
          memory: 0,
          UptTime: null,
          StartTime: null,
          RestartTimes: null,
          history: []
        },
        {
          app: 'CronPerformance',
          status: null,
          pid: null,
          cpu: 0,
          memory: 0,
          UptTime: null,
          StartTime: null,
          RestartTimes: null,
          history: []
        }
      ]
      info().then(res => {
        if (res.code === 200) {
          const data = res.data
          if (data.length > 0) {
            data.forEach(function(item) {
              for (let i = 0; i < list.length; i++) {
                var name = list[i].app
                if (name === item.name) {
                  list[i].pid = item.pid
                  list[i].cpu = item.monit.cpu
                  list[i].memory = Math.ceil(item.monit.memory / 1024 / 1024)
                  list[i].UptTime = item.pm2_env.pm_uptime
                  list[i].status = item.pm2_env.status
                  list[i].StartTime = item.pm2_env.created_at
                  list[i].RestartTimes = item.pm2_env.restart_time
                  list[i].history = item.history
                }
              }
            })
          }
          this.list = list
        } else {
          this.$notify({
            title: '服务状态',
            message: '信息获取失败',
            type: 'fail',
            duration: 2000
          })
        }
        this.listLoading = false
      })
    },
    handleStart(row) {
      start(row.app).then(res => {
        if (res.code === 200 && res.data === 'failed') {
          this.$notify({
            title: 'Message',
            message: row.app + '启动失败',
            type: 'fail',
            duration: 2000
          })
        } else {
          this.$notify({
            title: 'Success',
            message: row.app + '启动成功',
            type: 'success',
            duration: 2000
          })
          this.getInfo()
        }
      })
    },
    handleStop(row) {
      stop(row.app).then(res => {
        if (res.code === 200 && res.data === 'failed') {
          this.$notify({
            title: 'Message',
            message: row.app + '停止失败',
            type: 'fail',
            duration: 2000
          })
        } else {
          this.$notify({
            title: 'Success',
            message: row.app + '停止成功',
            type: 'success',
            duration: 2000
          })
          this.getInfo()
        }
      })
    },
    handleRestart(row) {
      restart(row.app).then(res => {
        if (res.code === 200 && res.data === 'failed') {
          this.$notify({
            title: 'Message',
            message: row.app + '重启失败',
            type: 'fail',
            duration: 2000
          })
        } else {
          this.$notify({
            title: 'Success',
            message: row.app + '重启成功',
            type: 'success',
            duration: 2000
          })
          this.getInfo()
        }
      })
    },
    handleStartAll() {
      for (let i = 0; i < this.list.length; i++) {
        start(this.list[i].app).then(res => {
          if (res.code === 200 && res.data === 'failed') {
            this.$notify({
              title: 'Message',
              message: this.list[i].app + '启动失败',
              type: 'fail',
              duration: 2000
            })
            this.getInfo()
          }
        })
      }
    },
    handleStopAll() {
      for (let i = 0; i < this.list.length; i++) {
        stop(this.list[i].app).then(res => {
          if (res.code === 200 && res.data === 'failed') {
            this.$notify({
              title: 'Message',
              message: this.list[i].app + '停止失败',
              type: 'fail',
              duration: 2000
            })
            this.getInfo()
          }
        })
      }
    },
    handleRestartAll() {
      for (let i = 0; i < this.list.length; i++) {
        restart(this.list[i].app).then(res => {
          if (res.code === 200 && res.data === 'failed') {
            this.$notify({
              title: 'Message',
              message: this.list[i].app + '重启失败',
              type: 'fail',
              duration: 2000
            })
            this.getInfo()
          }
        })
      }
    },
    end() {
      console.log('clear')
      clearInterval(this.intervalid)
    }
  }
}
</script>

<style scoped>
</style>
