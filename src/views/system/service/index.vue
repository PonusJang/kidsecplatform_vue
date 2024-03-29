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
            <ve-line :data="scope.row.history" :settings="chartSettings"/>
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
  import socket from '@/utils/socket'
  import {getList,  start, stop, restart} from '@/api/service'
  import {parseTime} from '@/utils'
  import waves from '@/directive/waves' // waves directive

  export default {

    name: 'ServiceIndex',
    components: {socket},
    directives: {waves},
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
        list: undefined,
        app: null,
        listLoading: true,
        temp:undefined
      }
    },
    created() {
      this.getList()
      this.socketListen()
      setInterval(function () {
        socket.emit('serviceInfo','Get')
      }, 5000)
    },
    methods: {
      getList() {
        getList().then(res => {
          if (res.code === 200 && res.data !== undefined && res.data.length >0) {
            this.list = res.data
          }
          this.listLoading = false
        })
      },
      socketListen(){
        socket.on('serviceInfo',(data)=> {
          let temp = JSON.parse(JSON.stringify(data))
          if (temp.length > 0) {
            temp.forEach( (item) => {
              for (let i = 0; i < this.list.length; i++) {
                let name = this.list[i].app
                if (name === item.name) {
                  this.list[i].pid = item.pid
                  this.list[i].cpu = item.monit.cpu
                  this.list[i].memory = Math.ceil(item.monit.memory / 1024 / 1024)
                  this.list[i].UptTime = item.pm2_env.pm_uptime
                  this.list[i].status = item.pm2_env.status
                  this.list[i].StartTime = item.pm2_env.created_at
                  this.list[i].RestartTimes = item.pm2_env.restart_time
                  this.list[i].history = item.history
                }
              }
            })
          }
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

            }
          })
        }
      }
    }
  }
</script>

<style scoped>
</style>
