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
          <span class="link-type">{{ scope.row.health }}</span>
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
          <el-button type="primary" size="mini" @click="handleInfo(row)">
            信息
          </el-button>
          <el-button size="mini" type="danger" @click="handleMonitor(row,$index)">
            监控
          </el-button>
          <el-button size="mini" type="danger" @click="handleSendTask(row,$index)">
            推送
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { getClientList } from '@/api/hids'
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
      total: 0,
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
        id: undefined,
        ip: undefined,
        hostname: undefined,
        system: undefined
      }
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
    getList() {
      this.listLoading = false

      getClientList(this.listQuery.page, this.listQuery.limit).then(response => {
        this.total = response.data.count
        this.list = response.data.docs
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        owner: '',
        domain: ''
      }
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
          filename: 'HIDS数据分析结果'
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
</style>
