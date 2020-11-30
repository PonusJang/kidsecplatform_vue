<template>

  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.hostname"
        placeholder="主机名"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.ip"
        placeholder="IP"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.system"
        placeholder="系统"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleDeploy"
      >
        部署
      </el-button>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        导出EXCEL
      </el-button>

    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >

      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="IP" align="center">
        <template slot-scope="scope">
          <span class="link-type"> {{ scope.row.ip }}</span>
        </template>
      </el-table-column>
      <el-table-column label="主机名" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.hostname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <span class="link-type" v-html="statusFormat(scope, scope.row.health ) " />
        </template>
      </el-table-column>
      <el-table-column label="类别" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="系统" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.system }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="uptime" label="uptime">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.uptime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="250" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">

          <el-button type="primary" size="mini">
            <router-link :to="{path :'hostInfo/'+ row.ip , query:{ip:row.ip}}">
              信息
            </router-link>
          </el-button>

          <el-button size="mini" type="danger" @click="handleDrawer(row)">
            监控
          </el-button>
          <el-button size="mini" type="danger" @click="handleSendTask(row)">
            推送
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-drawer
      :title="this.title"
      :with-header="true"
      :visible.sync="drawer"
      :direction="direction"
    >
      <ul>
        <li v-for="item in monitor.list" :key="item._source">
          <div v-if="item._type === 'loginlog'">
            <span class="m_title">登录信息</span>
            <span class="m_tag"> 登录IP:</span><span class="m_data">{{ item._source.data.remote }}</span>
            <span class="m_tag"> 状态:</span><span class="m_data">{{ item._source.data.status }}</span>
            <span class="m_tag"> 时间:</span><span class="m_data">{{ item._source.time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </div>
          <div v-if="item._type === 'process'">
            <span class="m_title">进程信息</span>
            <span class="m_tag"> 命令:</span><span class="m_data">{{ item._source.data.command }}</span>
            <span class="m_tag"> 环境信息:</span><span class="m_data">{{ item._source.data.info }}</span>
            <span class="m_tag"> 进程:</span><span class="m_data">{{ item._source.data.name }}</span>
            <span class="m_tag"> 父进程:</span><span class="m_data">{{ item._source.data.parentname }}</span>
            <span class="m_tag"> 时间:</span><span class="m_data">{{ item._source.time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
            <br>
          </div>
          <div v-if="item._type === 'file'">
            <span class="m_title">文件信息</span>
            <span class="m_tag"> 操作:</span><span class="m_data">{{ item._source.data.action }}</span>
            <span class="m_tag"> 文件路径:</span><span class="m_data">{{ item._source.data.path }}</span>
            <span class="m_tag"> 时间:</span><span class="m_data">{{ item._source.time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
            <br>
          </div>
          <div v-if="item._type === 'connection'">
            <span class="m_title">连接信息</span>
            <span class="m_tag"> 协议:</span><span class="m_data">{{ item._source.data.protocol }}</span>
            <span class="m_tag"> 本端:</span><span class="m_data">{{ item._source.data.local }}</span>
            <span class="m_tag"> 远端:</span><span class="m_data">{{ item._source.data.remote }}</span>
            <span class="m_tag"> 方向:</span><span class="m_data">{{ item._source.data.dir }}</span>
            <span class="m_tag"> 时间:</span><span class="m_data">{{ item._source.time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </div>
          <br>
        </li>
      </ul>
    </el-drawer>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-dialog title="推送任务" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="任务名" prop="title">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="Host" prop="title">
          <el-input v-model="temp.host_list" />
        </el-form-item>
        <el-form-item label="操作" prop="title">
          <el-select v-model="temp.type" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="命令" prop="title">
          <el-input v-model="temp.command" :disabled="temp.exec !=='exec'" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="addTask">
          确认
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

import { findClientByHostname, findClientByIp, findClientBySystem, getClientList, monitor, addTask } from '@/api/hids'
import { parseTime } from '@/utils'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination/index' // secondary package based on el-pagination
export default {
  name: 'DomainList',
  components: { Pagination },
  directives: { waves },
  filters: {
    parseTime: parseTime
  },
  data() {
    return {
      dialogFormVisible: false,
      monitor: {
        list: undefined
      },
      drawer: false,
      total: 0,
      title: undefined,
      listQuery: {
        page: 1,
        limit: 10,
        ip: undefined,
        hostname: undefined,
        system: undefined
      },
      list: null,
      listLoading: false,

      downloadLoading: false,
      temp: {
        name: undefined,
        host_list: undefined,
        type: undefined,
        command: undefined
      },
      options: [{
        value: 'kill',
        label: 'kill'
      }, {
        value: 'update',
        label: 'update'
      }, {
        value: 'exec',
        label: 'exec'
      }, {
        value: 'uninstall',
        label: 'uninstall'
      }, {
        value: 'delete',
        label: 'delete'
      }, {
        value: 'reload',
        label: 'reload'
      }],
      value: ''
    }
  },
  created() {
    this.getList()
  },
  inject: ['reload'],
  methods: {
    fresh() {
      this.reload()
    },
    handleDrawer(row) {
      monitor({
        ip: row.ip,
        page: 1,
        limit: 20
      }).then(res => {
        this.title = row.ip
        this.drawer = true
        this.monitor.list = res.data.hits
      })
    },
    statusFormat(scope, value) {
      if (value === 0) {
        return '在线'
      } else if (value === 1) {
        return '离线'
      } else {
        return 'unknown'
      }
    },
    handleSendTask(row) {
      this.dialogFormVisible = true
      this.temp.host_list = row.ip
    },
    getList() {
      this.listLoading = false
      if (this.listQuery.ip !== undefined) {
        findClientByIp(this.listQuery.page, this.listQuery.limit, this.listQuery.ip).then(response => {
          this.total = response.data.count
          this.list = response.data.docs
          setTimeout(() => {
            this.resetTemp()
            this.listLoading = false
          }, 1.5 * 1000)
        })
      } else if (this.listQuery.system !== undefined) {
        findClientBySystem(this.listQuery.page, this.listQuery.limit, this.listQuery.system).then(response => {
          this.total = response.data.count
          this.list = response.data.docs
          setTimeout(() => {
            this.resetTemp()
            this.listLoading = false
          }, 1.5 * 1000)
        })
      } else if (this.listQuery.hostname !== undefined) {
        findClientByHostname(this.listQuery.page, this.listQuery.limit, this.listQuery.hostname).then(response => {
          this.total = response.data.count
          this.list = response.data.docs
          setTimeout(() => {
            this.resetTemp()
            this.listLoading = false
          }, 1.5 * 1000)
        })
      } else {
        getClientList(this.listQuery.page, this.listQuery.limit).then(response => {
          this.total = response.data.count
          this.list = response.data.docs
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      }
    },
    resetTemp() {
      this.temp = {
        name: '',
        host_list: '',
        type: '',
        command: ''
      }
    },
    addTask() {
      addTask({
        name: this.temp.name,
        host_list: this.temp.host_list,
        type: this.temp.type,
        command: this.temp.command
      }).then(res => {
        this.$notify({
          title: 'Success',
          message: 'Created Successfully',
          type: 'success',
          duration: 2000
        })
      })
    },
    handleDeploy() {
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['uptime', 'hostname', 'ip', 'system']
        const filterVal = ['uptime', 'hostname', 'ip', 'system']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'HIDS监控主机列表'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'uptime') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style scoped>
  .el-drawer > header > span:focus {
    outline-color: white;
  }

  .el-drawer > header > button:focus {
    outline-color: white;
  }

  .el-drawer > header > button:hover {
    color: rgb(64, 158, 255);
  }

  .m_title {
    font-family: Verdana, "华文仿宋";
    font-size: 20px;
    font-weight: bold;
    color: #c9615b;
  }

  .m_tag {
    font-family: Verdana, "等线";
    font-size: 16px;
    font-weight: normal;
    color: #060947;
  }

  .m_data {
    font-family: Verdana, "等线";
    font-size: 16px;
    font-weight: normal;
    color: #8b8888;
  }
</style>
